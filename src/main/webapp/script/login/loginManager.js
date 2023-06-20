/*
 * Copyright 2016, 2018, 2019 Uppsala University Library
 *
 * This file is part of Cora.
 *
 *     Cora is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     Cora is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with Cora.  If not, see <http://www.gnu.org/licenses/>.
 */
var addStandardAppTokensToLoginMenu = false;
var CORA = (function(cora) {
	"use strict";
	cora.loginManager = function(dependencies, spec) {
		var out;
		var loginManagerView;
		var authInfo;
		var createdWebRedirectLogin;
		var startedLdapLogins = {};

		var loginOptions = [];
		if (addStandardAppTokensToLoginMenu) {
			loginOptions.push({
				text: "appToken as 141414",
				type: "appTokenLogin",
				userId: "141414",
				appToken: "63e6bd34-02a1-4c82-8001-158c104cae0e"
			});
			loginOptions.push({
				text: "appToken as 151515 alvin",
				type: "appTokenLogin",
				userId: "151515",
				appToken: "63ef81cd-1d88-4a6a-aff0-f0d809a74d34"
			});
			loginOptions.push({
				text: "alvin user",
				type: "appTokenLogin",
				userId: "coraUser:4412566252284358",
				appToken: "935ae709-4056-4b3d-85d2-469b304acfae"
			});
			loginOptions.push({
				text: "appToken as 161616 diva",
				type: "appTokenLogin",
				userId: "161616",
				appToken: "f7973be9-02e0-4c42-979b-09e42372a02a"
			});
			loginOptions.push({
				text: "diva user",
				type: "appTokenLogin",
				userId: "coraUser:4412982402853626",
				appToken: "b27039e1-593d-4d95-a69a-b33aa8c0924a"
			});
			loginOptions.push({
				text: "divaEverything",
				type: "appTokenLogin",
				userId: "coraUser:490742519075086",
				appToken: "2e57eb36-55b9-4820-8c44-8271baab4e8e"
			});
			loginOptions.push({
				text: "divaSystemAdmin",
				type: "appTokenLogin",
				userId: "coraUser:491055276494310",
				appToken: "0c240296-0315-4e48-a991-4e6350e73413"
			});
			loginOptions.push({
				text: "divaDomainAdminUU",
				type: "appTokenLogin",
				userId: "coraUser:491144693381458",
				appToken: "89ad2b42-785a-4421-a647-f959cdb85f4a"
			});
			loginOptions.push({
				text: "divaDomainAdminKTH",
				type: "appTokenLogin",
				userId: "coraUser:491201365536105",
				appToken: "765b4fcd-43b4-433a-bf7f-8e929f94d3fe"
			});
		}
		var loginOrigin;

		var logins = {};
		var loginUnitDataList;
		var loginDataList;

		function start() {
			fetchAllLoginInfoFromServer();
			var viewSpec = {
				"loginMethod": login,
				"logoutMethod": logout
			};
			loginManagerView = dependencies.loginManagerViewFactory.factor(viewSpec);
		}
		function fetchAllLoginInfoFromServer() {
			fetchLoginUnitFromServer();
			fetchLoginFromServer();
		}

		function fetchLoginUnitFromServer() {
			var callSpec = {
				"requestMethod": "GET",
				"url": spec.baseUrl + "record/loginUnit",
				"loadMethod": fetchLoginUnitCallback,
				"errorMethod": fetchLoginUnitErrorCallback,
				"timeoutMethod": fetchLoginUnitTimeoutCallback
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function fetchLoginFromServer() {
			var callSpec = {
				"requestMethod": "GET",
				"url": spec.baseUrl + "record/login",
				"loadMethod": fetchLoginCallback,
				"errorMethod": fetchLoginErrorCallback,
				"timeoutMethod": fetchLoginTimeoutCallback
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function fetchLoginUnitCallback(answer) {
			loginUnitDataList = JSON.parse(answer.responseText).dataList.data;
			possiblySetLoginOptionsInView();
		}

		function possiblySetLoginOptionsInView() {
			if (bothLoginUnitAndLoginListHasBeenFullyFetched()) {
				parseLoginData();
				parseLoginUnitData();
				loginManagerView.setLoginOptions(loginOptions);
			}
		}

		function bothLoginUnitAndLoginListHasBeenFullyFetched() {
			return loginUnitDataList !== undefined && loginDataList !== undefined;
		}

		function parseLoginData() {
			loginDataList.forEach(function(loginItem) {
				var loginData = loginItem.record.data;
				var recordId = getIdFromRecord(loginData);
				var url = getUrlFromLoginRecord(loginData);
				var type = getTypeFromLoginRecord(loginData);
				logins[recordId] = {
					"url": url,
					type: type
				};
				if ("ldap" === type) {
					logins[recordId].metadataId = getMetadataIdFromLoginRecord(loginData);
					logins[recordId].presentationId = getPresentationIdFromLoginRecord(loginData);
				}
			});
		}

		function getIdFromRecord(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function getUrlFromLoginRecord(recordData) {
			var cRecord = CORA.coraData(recordData);
			return cRecord.getFirstAtomicValueByNameInData("url");
		}

		function getTypeFromLoginRecord(recordData) {
			return recordData.attributes.type;
		}

		function getMetadataIdFromLoginRecord(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cMetadataIdGroup = CORA.coraData(cRecord.getFirstChildByNameInData("ldapMetadata"));

			return cMetadataIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getPresentationIdFromLoginRecord(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cMetadataIdGroup = CORA.coraData(cRecord
				.getFirstChildByNameInData("ldapPresentation"));

			return cMetadataIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function parseLoginUnitData() {
			loginUnitDataList.forEach(function(loginUnit) {
				var loginUnitData = loginUnit.record.data;

				var textId = getTextIdFromRecord(loginUnitData);
				var loginId = getLoginIdFromRecord(loginUnitData);
				var cRecord = CORA.coraData(loginUnitData);
				var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
				var loginUnitId = cRecordInfo.getFirstAtomicValueByNameInData("id");

				var loginOption = {
					text: getTranslatedText(textId),
					type: logins[loginId].type,
					"url": logins[loginId].url
				}
				loginOption = possiblyAddLdapAttributes(loginOption, loginId, loginUnitId);
				loginOptions.push(loginOption);

			});
		}

		function possiblyAddLdapAttributes(loginOptionIn, loginId, loginUnitId) {
			var loginOption = loginOptionIn;
			if ("ldap" === logins[loginId].type) {
				loginOption.metadataId = logins[loginId].metadataId;
				loginOption.presentationId = logins[loginId].presentationId;
				loginOption.loginUnitId = loginUnitId;
			}
			return loginOption;
		}

		function getTextIdFromRecord(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cLoginInfo = CORA.coraData(cRecord.getFirstChildByNameInData("loginInfo"));
			var cLogin = CORA.coraData(cLoginInfo.getFirstChildByNameInData("loginDescription"));
			return cLogin.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getLoginIdFromRecord(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cLoginInfo = CORA.coraData(cRecord.getFirstChildByNameInData("loginInfo"));
			var cLogin = CORA.coraData(cLoginInfo.getFirstChildByNameInData("login"));
			return cLogin.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getTranslatedText(textId) {
			return dependencies.textProvider.getTranslation(textId);
		}

		function fetchLoginUnitErrorCallback() {
			spec.setErrorMessage("Fetching of loginUnits failed!");
		}

		function fetchLoginUnitTimeoutCallback() {
			spec.setErrorMessage("Fetching of loginUnits timedout!");
		}

		function fetchLoginCallback(answer) {
			loginDataList = JSON.parse(answer.responseText).dataList.data;
			possiblySetLoginOptionsInView();
		}

		function fetchLoginErrorCallback() {
			spec.setErrorMessage("Fetching of logins failed!");
		}

		function fetchLoginTimeoutCallback() {
			spec.setErrorMessage("Fetching of logins timedout!");
		}

		function login(loginOption) {
			if ("appTokenLogin" === loginOption.type) {
				appTokenLogin(loginOption.userId, loginOption.appToken);
			} else if ("ldap" === loginOption.type) {
				ldapLogin(loginOption);
			} else {
				webRedirectLogin(loginOption);
			}
		}

		function appTokenLogin(userId, appToken) {
			var loginSpec = {
				"requestMethod": "POST",
				"url": spec.appTokenBaseUrl + "apptokenverifier/rest/apptoken/",
				"accept": "",
				"authInfoCallback": appTokenAuthInfoCallback,
				"errorCallback": appTokenErrorCallback,
				"timeoutCallback": appTokenTimeoutCallback
			};
			var factoredAppTokenLogin = dependencies.appTokenLoginFactory.factor(loginSpec);
			factoredAppTokenLogin.login(userId, appToken);
		}

		function webRedirectLogin(loginOption) {
			window.addEventListener("message", receiveMessage, false);
			var url = loginOption.url;
			var loginSpec = {
				"url": url
			};
			loginOrigin = getIdpLoginServerPartFromUrl(url);
			createdWebRedirectLogin = dependencies.webRedirectLoginFactory.factor(loginSpec);
		}

		function getIdpLoginServerPartFromUrl(urlToWedredirectLogin) {
			var targetPart = urlToWedredirectLogin.substring(urlToWedredirectLogin
				.indexOf("target=") + 7);
			var lengthOfHttps = "https://".length;
			return targetPart.substring(0, targetPart.indexOf("/", lengthOfHttps));
		}

		function ldapLogin(loginOption) {
			if (loginAlreadyStartedForLoginOption(loginOption)) {
				showStartedLoginInJsClientForLoginOption(loginOption);
			} else {
				startLoginForLoginOption(loginOption);
			}
			loginManagerView.closeHolder();
		}

		function loginAlreadyStartedForLoginOption(loginOption) {
			return startedLdapLogins[loginOption.loginUnitId] !== undefined;
		}

		function showStartedLoginInJsClientForLoginOption(loginOption) {
			startedLdapLogins[loginOption.loginUnitId].showLdapLoginInJsClient();
		}

		function startLoginForLoginOption(loginOption) {
			var ldapLoginSpec = {
				"metadataId": loginOption.metadataId,
				"presentationId": loginOption.presentationId,
				"jsClient": spec.jsClient
			};
			var ldapLoginJsClientIntegrator = dependencies.ldapLoginJsClientIntegratorFactory
				.factor(ldapLoginSpec);
			startedLdapLogins[loginOption.loginUnitId] = ldapLoginJsClientIntegrator;
		}

		function getDependencies() {
			return dependencies;
		}

		function getHtml() {
			return loginManagerView.getHtml();
		}

		function appTokenAuthInfoCallback(authInfoIn) {
			authInfo = authInfoIn;
			dependencies.authTokenHolder.setCurrentAuthToken(authInfo.token);
			loginManagerView.setUserId(authInfo.userId);
			loginManagerView.setState(CORA.loginManager.LOGGEDIN);
			spec.afterLoginMethod();
		}

		function appTokenErrorCallback(errorObject) {
			if (failedToLogout(errorObject)) {
				logoutCallback();
			} else {
				spec.setErrorMessage("AppToken login failed!");
			}
		}

		function failedToLogout(errorObject) {
			return (errorObject.status === 0 || errorObject.status === 404)
				&& errorObject.spec.requestMethod === "DELETE";
		}

		function appTokenTimeoutCallback() {
			spec.setErrorMessage("AppToken login timedout!");
		}

		function logout() {
			var deleteLink = authInfo.actionLinks['delete'];
			var callSpec = {
				"requestMethod": deleteLink.requestMethod,
				"url": deleteLink.url,
				"loadMethod": logoutCallback,
				"errorMethod": appTokenErrorCallback,
				"timeoutMethod": appTokenTimeoutCallback,
				"data": authInfo.token,
				"timeoutInMS": 15000
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function logoutCallback() {
			loginManagerView.setState(CORA.loginManager.LOGGEDOUT);
			dependencies.authTokenHolder.setCurrentAuthToken("");
			spec.afterLogoutMethod();
		}

		function getSpec() {
			// needed for test
			return spec;
		}

		function receiveMessage(event) {
			if (messageIsFromWindowOpenedFromHere(event)) {
				handleMessagesFromOkSender(event.data);
			}
		}

		function handleMessagesFromOkSender(data) {
			appTokenAuthInfoCallback(data);
		}

		function messageIsFromWindowOpenedFromHere(event) {
			return loginOrigin === event.origin
				&& createdWebRedirectLogin.getOpenedWindow() === event.source;
		}

		out = Object.freeze({
			type: "loginManager",
			getDependencies: getDependencies,
			getHtml: getHtml,
			login: login,
			logout: logout,
			appTokenAuthInfoCallback: appTokenAuthInfoCallback,
			appTokenErrorCallback: appTokenErrorCallback,
			appTokenTimeoutCallback: appTokenTimeoutCallback,
			logoutCallback: logoutCallback,
			getSpec: getSpec,
			receiveMessage: receiveMessage,
			fetchLoginUnitCallback: fetchLoginUnitCallback,
			fetchLoginUnitErrorCallback: fetchLoginUnitErrorCallback,
			fetchLoginUnitTimeoutCallback: fetchLoginUnitTimeoutCallback,
			fetchLoginCallback: fetchLoginCallback,
			fetchLoginErrorCallback: fetchLoginErrorCallback,
			fetchLoginTimeoutCallback: fetchLoginTimeoutCallback
		});
		start();
		return out;
	};
	cora.loginManager.LOGGEDOUT = 0;
	cora.loginManager.LOGGEDIN = 1;
	return cora;
}(CORA));