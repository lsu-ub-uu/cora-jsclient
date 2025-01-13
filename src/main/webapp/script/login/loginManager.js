/*
 * Copyright 2016, 2018, 2019, 2024, 2025 Uppsala University Library
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
let addStandardAppTokensToLoginMenu = false;
let appTokenOptions = [];
var CORA = (function(cora) {
	"use strict";
	cora.loginManager = function(dependencies, spec) {
		let out;
		let loginManagerView;
		let authInfo;
		let createdWebRedirectLogin;
		let startedPasswordLogins = {};

		let loginOptions = [];
		if (addStandardAppTokensToLoginMenu) {
			loginOptions = loginOptions.concat(appTokenOptions);
		}

		let loginOrigin;
		let logins = {};
		let loginUnitDataList;
		let loginDataList;

		const start = function() {
			fetchAllLoginInfoFromServer();
			let viewSpec = {
				loginMethod: login,
				logoutMethod: logout
			};
			loginManagerView = dependencies.loginManagerViewFactory.factor(viewSpec);
		};

		const fetchAllLoginInfoFromServer = function() {
			fetchLoginUnitFromServer();
			fetchLoginFromServer();
		};

		const fetchLoginUnitFromServer = function() {
			let callSpec = {
				requestMethod: "GET",
				url: spec.baseUrl + "record/loginUnit",
				accept: "application/vnd.uub.recordList+json",
				loadMethod: fetchLoginUnitCallback,
				errorMethod: fetchLoginUnitErrorCallback,
				timeoutMethod: fetchLoginUnitTimeoutCallback
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		};

		const fetchLoginFromServer = function() {
			let callSpec = {
				requestMethod: "GET",
				url: spec.baseUrl + "record/login",
				accept: "application/vnd.uub.recordList+json",
				loadMethod: fetchLoginCallback,
				errorMethod: fetchLoginErrorCallback,
				timeoutMethod: fetchLoginTimeoutCallback
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		};

		const fetchLoginUnitCallback = function(answer) {
			loginUnitDataList = JSON.parse(answer.responseText).dataList.data;
			possiblySetLoginOptionsInView();
		};

		const possiblySetLoginOptionsInView = function() {
			if (bothLoginUnitAndLoginListHasBeenFullyFetched()) {
				parseLoginDataList();
				parseLoginUnitDataList();
				loginManagerView.setLoginOptions(loginOptions);
			}
		};

		const bothLoginUnitAndLoginListHasBeenFullyFetched = function() {
			return loginUnitDataList !== undefined && loginDataList !== undefined;
		};

		const parseLoginDataList = function() {
			loginDataList.forEach(function(loginItem) {
				let loginData = loginItem.record.data;
				let recordId = getIdFromRecord(loginData);
				let login = parseLoginData(loginData);
				logins[recordId] = login;
			});
		};

		const parseLoginData = function(loginData) {
			let type = getTypeFromLoginRecord(loginData);
			let login = {};
			login.type = type;
			if ("webRedirect" === type) {
				login.url = getUrlFromLoginRecord(loginData);
			}
			if ("password" === type) {
				login.metadataId = getMetadataIdFromLoginRecord(loginData);
				login.presentationId = getPresentationIdFromLoginRecord(loginData);
			}
			return login;
		};

		const getIdFromRecord = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			let cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};

		const getUrlFromLoginRecord = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			return cRecord.getFirstAtomicValueByNameInData("url");
		};

		const getTypeFromLoginRecord = function(recordData) {
			return recordData.attributes.type;
		};

		const getMetadataIdFromLoginRecord = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			let cMetadataIdGroup = CORA.coraData(cRecord.getFirstChildByNameInData("viewDefinition"));
			return cMetadataIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const getPresentationIdFromLoginRecord = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			let cMetadataIdGroup = CORA.coraData(cRecord
				.getFirstChildByNameInData("viewPresentation"));
			return cMetadataIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const parseLoginUnitDataList = function() {
			loginUnitDataList.forEach(function(loginUnit) {
				let loginUnitData = loginUnit.record.data;

				let textId = getTextIdFromRecord(loginUnitData);
				let loginId = getLoginIdFromRecord(loginUnitData);
				let loginUnitId = getIdFromRecord(loginUnitData);
				let loginForCurrentLoginUnit = logins[loginId];

				let loginOption = {
					text: getTranslatedText(textId),
					type: loginForCurrentLoginUnit.type,
					url: loginForCurrentLoginUnit.url
				}
				let passwordInfo = possiblyAddPasswordInfo(loginForCurrentLoginUnit, loginUnitId);
				Object.assign(loginOption, passwordInfo);
				loginOptions.push(loginOption);
			});
		};

		const possiblyAddPasswordInfo = function(loginForCurrentLoginUnit, loginUnitId) {
			let passwordInfo = {};
			if ("password" === loginForCurrentLoginUnit.type) {
				passwordInfo.metadataId = loginForCurrentLoginUnit.metadataId;
				passwordInfo.presentationId = loginForCurrentLoginUnit.presentationId;
				passwordInfo.loginUnitId = loginUnitId;
			}
			return passwordInfo;
		};

		const getTextIdFromRecord = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			let cLoginInfo = CORA.coraData(cRecord.getFirstChildByNameInData("loginInfo"));
			let cLogin = CORA.coraData(cLoginInfo.getFirstChildByNameInData("loginDescription"));
			return cLogin.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const getLoginIdFromRecord = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			let cLoginInfo = CORA.coraData(cRecord.getFirstChildByNameInData("loginInfo"));
			let cLogin = CORA.coraData(cLoginInfo.getFirstChildByNameInData("login"));
			return cLogin.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const getTranslatedText = function(textId) {
			return dependencies.textProvider.getTranslation(textId);
		};

		const fetchLoginUnitErrorCallback = function() {
			spec.setErrorMessage("Fetching of loginUnits failed!");
		};

		const fetchLoginUnitTimeoutCallback = function() {
			spec.setErrorMessage("Fetching of loginUnits timedout!");
		};

		const fetchLoginCallback = function(answer) {
			loginDataList = JSON.parse(answer.responseText).dataList.data;
			possiblySetLoginOptionsInView();
		};

		const fetchLoginErrorCallback = function() {
			spec.setErrorMessage("Fetching of logins failed!");
		};

		const fetchLoginTimeoutCallback = function() {
			spec.setErrorMessage("Fetching of logins timedout!");
		};

		const login = function(loginOption) {
			if ("appTokenLogin" === loginOption.type) {
				appTokenLogin(loginOption.loginId, loginOption.appToken);
			} else if ("password" === loginOption.type) {
				passwordLogin(loginOption);
			} else {
				webRedirectLogin(loginOption);
			}
		};

		const appTokenLogin = function(loginId, appToken) {
			let loginSpec = {
				requestMethod: "POST",
				url: spec.appTokenBaseUrl + "login/rest/apptoken",
				contentType: "application/vnd.uub.login",
				accept: "application/vnd.uub.authToken+json",
				authInfoCallback: authInfoCallback,
				errorCallback: appTokenErrorCallback,
				timeoutCallback: appTokenTimeoutCallback
			};
			let factoredAppTokenLogin = dependencies.appTokenLoginFactory.factor(loginSpec);
			factoredAppTokenLogin.login(loginId, appToken);
		};

		const webRedirectLogin = function(loginOption) {
			window.addEventListener("message", receiveMessage, false);
			let url = loginOption.url;
			let loginSpec = {
				"url": url
			};
			loginOrigin = getIdpLoginServerPartFromUrl(url);
			createdWebRedirectLogin = dependencies.webRedirectLoginFactory.factor(loginSpec);
		};

		const getIdpLoginServerPartFromUrl = function(urlToWedredirectLogin) {
			let targetPart = urlToWedredirectLogin.substring(urlToWedredirectLogin
				.indexOf("target=") + 7);
			let lengthOfHttps = "https://".length;
			return targetPart.substring(0, targetPart.indexOf("/", lengthOfHttps));
		};

		const passwordLogin = function(loginOption) {
			if (loginAlreadyStartedForLoginOption(loginOption)) {
				showStartedLoginInJsClientForLoginOption(loginOption);
			} else {
				startPasswordLoginForLoginOption(loginOption);
			}
			loginManagerView.closeHolder();
		};

		const loginAlreadyStartedForLoginOption = function(loginOption) {
			return startedPasswordLogins[loginOption.loginUnitId] !== undefined;
		};

		const showStartedLoginInJsClientForLoginOption = function(loginOption) {
			startedPasswordLogins[loginOption.loginUnitId].showPasswordLoginInJsClient();
		};

		const startPasswordLoginForLoginOption = function(loginOption) {
			let passwordLoginSpec = {
				metadataId: loginOption.metadataId,
				presentationId: loginOption.presentationId,
				jsClient: spec.jsClient,
				requestMethod: "POST",
				url: spec.appTokenBaseUrl + "login/rest/password/",
				contentType: "application/vnd.uub.login",
				accept: "application/vnd.uub.authToken+json",
				authInfoCallback: authInfoCallback,
				errorCallback: passwordErrorCallback,
				timeoutCallback: passwordTimeoutCallback
			};
			let passwordLoginJsClientIntegrator = dependencies.passwordLoginJsClientIntegratorFactory
				.factor(passwordLoginSpec);
			startedPasswordLogins[loginOption.loginUnitId] = passwordLoginJsClientIntegrator;
		};

		const passwordErrorCallback = function(errorObject) {
			if (failedToLogout(errorObject)) {
				logoutCallback();
			} else {
				spec.setErrorMessage("Password login failed!");
			}
		};

		const passwordTimeoutCallback = function() {
			spec.setErrorMessage("Password login timedout!");
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getHtml = function() {
			return loginManagerView.getHtml();
		};

		const authInfoCallback = function(authInfoIn) {
			authInfo = authInfoIn;
			dependencies.authTokenHolder.setCurrentAuthToken(authInfo.token);
			loginManagerView.setLoginId(authInfo.loginId);
			loginManagerView.setState(CORA.loginManager.LOGGEDIN);
			spec.afterLoginMethod();
			for (let key in startedPasswordLogins) {
				startedPasswordLogins[key].removePasswordLoginFromJsClient();
				delete startedPasswordLogins[key];
			}
		};

		const appTokenErrorCallback = function(errorObject) {
			if (failedToLogout(errorObject)) {
				logoutCallback();
			} else {
				spec.setErrorMessage("AppToken login failed!");
			}
		};

		const failedToLogout = function(errorObject) {
			return (errorObject.status === 0 || errorObject.status === 404)
				&& errorObject.spec.requestMethod === "DELETE";
		};

		const appTokenTimeoutCallback = function() {
			spec.setErrorMessage("AppToken login timedout!");
		};

		const logout = function() {
			let deleteLink = authInfo.actionLinks['delete'];
			let callSpec = {
				requestMethod: deleteLink.requestMethod,
				url: deleteLink.url,
				loadMethod: logoutCallback,
				errorMethod: appTokenErrorCallback,
				timeoutMethod: appTokenTimeoutCallback,
				timeoutInMS: 15000
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		};

		const logoutCallback = function() {
			loginManagerView.setState(CORA.loginManager.LOGGEDOUT);
			dependencies.authTokenHolder.setCurrentAuthToken("");
			spec.afterLogoutMethod();
		};

		const getSpec = function() {
			// needed for test
			return spec;
		};

		const receiveMessage = function(event) {
			if (messageIsFromWindowOpenedFromHere(event)) {
				handleMessagesFromOkSender(event.data);
			}
		};

		const handleMessagesFromOkSender = function(data) {
			authInfoCallback(data);
		};

		const messageIsFromWindowOpenedFromHere = function(event) {
			return loginOrigin === event.origin
				&& createdWebRedirectLogin.getOpenedWindow() === event.source;
		};

		out = Object.freeze({
			type: "loginManager",
			getDependencies: getDependencies,
			getHtml: getHtml,
			login: login,
			logout: logout,
			authInfoCallback: authInfoCallback,
			appTokenErrorCallback: appTokenErrorCallback,
			appTokenTimeoutCallback: appTokenTimeoutCallback,
			passwordErrorCallback: passwordErrorCallback,
			passwordTimeoutCallback: passwordTimeoutCallback,
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