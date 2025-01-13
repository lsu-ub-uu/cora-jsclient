/*
 * Copyright 2016, 2017, 2018, 2019, 2024, 2025 Uppsala University Library
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
"use strict";

QUnit.module.only("login/loginManagerTest.js", hooks => {
	const test = QUnit.test;
	let addedEvents = [];
	let dependencies;
	let afterLogoutMethodCalled
	let errorMessage;
	let loginOption;
	let spec;
	let loginManager;
	let authInfo;
	let afterLoginMethodCalled;
 
	hooks.beforeEach(() => {
		errorMessage=undefined;
		addStandardAppTokensToLoginMenu = true;
		window.addEventListener = addEvent;
		dependencies = {
			textProvider: CORATEST.textProviderSpy(),
			loginManagerViewFactory: CORATEST.loginManagerViewFactorySpy(),
			appTokenLoginFactory: CORATEST.appTokenLoginFactorySpy(),
			webRedirectLoginFactory: CORATEST.standardFactorySpy("webRedirectLoginSpy"),
			passwordLoginJsClientIntegratorFactory: CORATEST
				.standardFactorySpy("passwordLoginJsClientIntegratorSpy"),
			authTokenHolder: CORATEST.authTokenHolderSpy(),
			ajaxCallFactory: CORATEST.ajaxCallFactorySpy()
		};
		afterLoginMethodCalled = false;
		afterLogoutMethodCalled = false;

		spec = {
			afterLoginMethod: afterLoginMethod,
			afterLogoutMethod: afterLogoutMethod,
			setErrorMessage: setErrorMessage,
			appTokenBaseUrl: "someAppTokenBaseUrl/",
			baseUrl: "http://epc.ub.uu.se/cora/rest/",
			jsClient: CORATEST.jsClientSpy()
		};
		loginManager = CORA.loginManager(dependencies, spec);
		let tenMinInMillis = 600000;
		let twentyFourHoursInMillis = 86400000;
		authInfo = {
			userId: "141414",
			loginId: "someLoginId",
			token: "fakeAuthTokenFromHere",
			validUntil: Date.now()+tenMinInMillis,
			renewUntil: Date.now()+twentyFourHoursInMillis,
			actionLinks: {
				renew: {
					requestMethod: "POST",
					rel: "renew",
					url:"http://localhost:38180/login/rest/authToken/someTokenId"
				},
				delete: {
					requestMethod: "DELETE",
					rel: "delete",
					url: "http://localhost:38180/login/rest/authToken/someTokenId"
				}
			}
		};
	});

	hooks.afterEach(() => {
		//no after
	});

	const addEvent = function(type, listener, useCapture) {
		addedEvents.push({
			type: type,
			listener: listener,
			useCapture: useCapture
		});
	};

	const afterLoginMethod = function() {
		afterLoginMethodCalled = true;
	};

	const afterLogoutMethod = function() {
		afterLogoutMethodCalled = true;
	};

	const setErrorMessage = function(errorMessageIn) {
		errorMessage = errorMessageIn;
	};

	const loginWithWebRedirect = function() {
		loginOption = {
			text: "Uppsala webredirect",
			type: "webRedirectLogin",
			url: "https://epc.ub.uu.se/Shibboleth.sso/Login/uu?target=https://epc.ub.uu.se/systemone/idplogin/login"
		};
		loginManager.login(loginOption);
	};

	const answerListLoginUnitsCall = function(no) {
		let ajaxCallSpy0 = dependencies.ajaxCallFactory.getFactored(no);
		let jsonLoginUnitList = JSON.stringify(CORATEST.loginUnitList);
		let answer = {
			"spec": ajaxCallSpy0.getSpec(),
			"responseText": jsonLoginUnitList
		};
		ajaxCallSpy0.getSpec().loadMethod(answer);
	};
	
	const answerListLoginsCall = function(no) {
		let ajaxCallSpy0 = dependencies.ajaxCallFactory.getFactored(no);
		let jsonLoginList = JSON.stringify(CORATEST.loginList);
		let answer = {
			"spec": ajaxCallSpy0.getSpec(),
			"responseText": jsonLoginList
		};
		ajaxCallSpy0.getSpec().loadMethod(answer);
	};

	test("testConstants", function(assert) {
		assert.strictEqual(CORA.loginManager.LOGGEDOUT, 0);
		assert.strictEqual(CORA.loginManager.LOGGEDIN, 1);
	});

	test("init", function(assert) {
		assert.strictEqual(loginManager.type, "loginManager");
	});

	test("testGetDependencies", function(assert) {
		assert.strictEqual(loginManager.getDependencies(), dependencies);
	});
	test("testGetSpec", function(assert) {
		assert.strictEqual(loginManager.getSpec(), spec);
	});

	test("testCallForLoginUnitsAndLogin", function(assert) {
		let ajaxCallSpy = dependencies.ajaxCallFactory.getFactored(0);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, spec.baseUrl + "record/loginUnit");
		assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.recordList+json");
		assert.strictEqual(ajaxCallSpec.loadMethod, loginManager.fetchLoginUnitCallback);
		assert.strictEqual(ajaxCallSpec.errorMethod, loginManager.fetchLoginUnitErrorCallback);
		assert.strictEqual(ajaxCallSpec.timeoutMethod, loginManager.fetchLoginUnitTimeoutCallback);
		assert.strictEqual(ajaxCallSpec.data, undefined);
		assert.strictEqual(ajaxCallSpec.timeoutInMS, undefined);

		let ajaxCallSpy1 = dependencies.ajaxCallFactory.getFactored(1);
		let ajaxCallSpec1 = ajaxCallSpy1.getSpec();
		assert.strictEqual(ajaxCallSpec1.url, spec.baseUrl + "record/login");
		assert.strictEqual(ajaxCallSpec1.requestMethod, "GET");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.recordList+json");
		assert.strictEqual(ajaxCallSpec1.loadMethod, loginManager.fetchLoginCallback);
		assert.strictEqual(ajaxCallSpec1.errorMethod, loginManager.fetchLoginErrorCallback);
		assert.strictEqual(ajaxCallSpec1.timeoutMethod, loginManager.fetchLoginTimeoutCallback);
		assert.strictEqual(ajaxCallSpec1.data, undefined);
		assert.strictEqual(ajaxCallSpec1.timeoutInMS, undefined);
	});

	test("testAnswerForLoginUnitsOnlySetInViewAfterAnswerForBothLists", function(assert) {
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getLoginOptions(), undefined);
		answerListLoginUnitsCall(0);
		assert.strictEqual(factoredView.getLoginOptions(), undefined);
		answerListLoginsCall(1);
		assert.notEqual(factoredView.getLoginOptions(), undefined);
	});

	test("testAnswerForLoginUnitsOnlySetInViewAfterAnswerForBothListsReOrdered",
		function(assert) {

			let factoredView = dependencies.loginManagerViewFactory.getFactored(0);
			assert.strictEqual(factoredView.getLoginOptions(), undefined);
			answerListLoginsCall(1);
			assert.strictEqual(factoredView.getLoginOptions(), undefined);
			answerListLoginUnitsCall(0);
			assert.notEqual(factoredView.getLoginOptions(), undefined);
		});

	test("testAnswerForLoginUnits", function(assert) {
		addStandardAppTokensToLoginMenu = true;
		appTokenOptions.push({
			text: "someText",
			type: "appTokenLogin",
			userId: "someLoginId",
			appToken: "someAppToken"
		});

		loginManager = CORA.loginManager(dependencies, spec);
		let factoredView = dependencies.loginManagerViewFactory.getFactored(1);
		answerListLoginUnitsCall(2);
		answerListLoginsCall(3);

		let expectedLoginOptions = [
			{
				text: "someText",
				type: "appTokenLogin",
				userId: "someLoginId",
				appToken: "someAppToken"
			},
			{
				text: "translated_uuLoginUnitText",
				type: "webRedirect",
				url: "https://epc.ub.uu.se/Shibboleth.sso/Login/uu?target=https://epc.ub.uu.se/idplogin/login"
			},
			{
				text: "translated_testLoginUnitText",
				type: "webRedirect",
				url: "https://epc.ub.uu.se/Shibboleth.sso/Login/test?target=https://epc.ub.uu.se/idplogin/login"
			}, {
				text: "translated_uuSystemOneLDAPLoginUnitText",
				type: "password",
				"metadataId": "passwordGroup",
				"presentationId": "passwordPGroup",
				"loginUnitId": "uuSystemOneLDAPLoginUnit"
			}];
		assert.stringifyEqual(factoredView.getLoginOptions(), expectedLoginOptions);
	});

	test("testAnswerForLoginUnitsWithoutStandardApptokenLogins", function(assert) {
		addStandardAppTokensToLoginMenu = false;
		loginManager = CORA.loginManager(dependencies, spec);
		let factoredView = dependencies.loginManagerViewFactory.getFactored(1);
		answerListLoginUnitsCall(2);
		answerListLoginsCall(3);
		let expectedLoginOptions = [
			{
				text: "translated_uuLoginUnitText",
				type: "webRedirect",
				url: "https://epc.ub.uu.se/Shibboleth.sso/Login/uu?target=https://epc.ub.uu.se/idplogin/login"
			},
			{
				text: "translated_testLoginUnitText",
				type: "webRedirect",
				url: "https://epc.ub.uu.se/Shibboleth.sso/Login/test?target=https://epc.ub.uu.se/idplogin/login"
			}, {
				text: "translated_uuSystemOneLDAPLoginUnitText",
				type: "password",
				"metadataId": "passwordGroup",
				"presentationId": "passwordPGroup",
				"loginUnitId": "uuSystemOneLDAPLoginUnit"
			}];
		assert.stringifyEqual(factoredView.getLoginOptions(), expectedLoginOptions);
	});

	test("testLoginUnitErrorMessage", function(assert) {
		loginManager.fetchLoginUnitErrorCallback();
		assert.strictEqual(errorMessage, "Fetching of loginUnits failed!");
	});

	test("testLoginUnitTimeoutMessage", function(assert) {
		loginManager.fetchLoginUnitTimeoutCallback();
		assert.strictEqual(errorMessage, "Fetching of loginUnits timedout!");
	});

	test("testLoginErrorMessage", function(assert) {
		loginManager.fetchLoginErrorCallback();
		assert.strictEqual(errorMessage, "Fetching of logins failed!");
	});

	test("testLoginTimeoutMessage", function(assert) {
		loginManager.fetchLoginTimeoutCallback();
		assert.strictEqual(errorMessage, "Fetching of logins timedout!");
	});

	test("testInitCreatesALoginManagerView", function(assert) {
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);
		assert.ok(factoredView !== undefined);
	});

	test("testInitCreatesALoginManagerViewsViewIsReturnedForGetHtml", function(assert) {
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);
		let loginManagerHtml = loginManager.getHtml();
		assert.strictEqual(loginManagerHtml, factoredView.getHtml());
	});

	test("testInitLoginManagerViewSpec", function(assert) {
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);
		let factoredSpec = factoredView.getSpec();

		let factoredLoginOptions = factoredSpec.loginOptions;

		assert.strictEqual(factoredLoginOptions, undefined);
		assert.strictEqual(factoredSpec.loginMethod, loginManager.login);
		assert.strictEqual(factoredSpec.logoutMethod, loginManager.logout);
	});

	test("testAppTokenLoginFactoryIsCalledOnAppTokenLogin", function(assert) {
		loginManager.login({
			text: "someText",
			type: "appTokenLogin"
		});
		let factored1 = dependencies.appTokenLoginFactory.getFactored(0);
		assert.ok(factored1);
		let spec0 = dependencies.appTokenLoginFactory.getSpec(0);
		assert.strictEqual(spec0.requestMethod, "POST");
		assert.strictEqual(spec0.url, "someAppTokenBaseUrl/login/rest/apptoken");
		assert.strictEqual(spec0.contentType, "application/vnd.uub.login");
		assert.strictEqual(spec0.accept, "application/vnd.uub.authToken+json");
		assert.strictEqual(spec0.authInfoCallback, loginManager.authInfoCallback);
		assert.strictEqual(spec0.errorCallback, loginManager.appTokenErrorCallback);
		assert.strictEqual(spec0.timeoutCallback, loginManager.appTokenTimeoutCallback);
	});

	test("testAppTokenLoginCallsServerOnAppTokenLogin", function(assert) {
		loginManager.login({
			text: "someText",
			type: "appTokenLogin",
			loginId: "testLoginId",
			appToken: "testAppToken"
		});
		let factored0 = dependencies.appTokenLoginFactory.getFactored(0);
		assert.strictEqual(factored0.getLoginId(0), "testLoginId");
		assert.strictEqual(factored0.getAppToken(0), "testAppToken");
	});

	test("testWebRedirectLoginListensForMessagesOnWindow", function(assert) {
		loginWithWebRedirect();

		let addedEvent = addedEvents[0];
		assert.strictEqual(addedEvent.type, "message");
		assert.strictEqual(addedEvent.listener, loginManager.receiveMessage);
		assert.strictEqual(addedEvent.useCapture, false);
	});

	test("testWebRedirectLoginFactoryIsCalledOnWebRedirectLogin", function(assert) {
		loginWithWebRedirect();

		let factored = dependencies.webRedirectLoginFactory.getFactored(0);
		assert.strictEqual(factored.type, "webRedirectLoginSpy");
		let spec0 = dependencies.webRedirectLoginFactory.getSpec(0);

		assert.strictEqual(spec0.url, loginOption.url);
	});

	test("testRecieveMessageFromWebRedirectLogin", function(assert) {
		loginWithWebRedirect();

		let factored = dependencies.webRedirectLoginFactory.getFactored(0);
		loginManager.receiveMessage({
			origin: "https://epc.ub.uu.se",
			data: authInfo,
			source: factored.getOpenedWindow()
		});
		let authTokenHolder = dependencies.authTokenHolder;
		assert.strictEqual(authTokenHolder.getToken(0), "fakeAuthTokenFromHere");
	});

	test("testRecieveMessageFromWebRedirectLoginNotHandledIfWrongOrigin", function(assert) {
		loginWithWebRedirect();
		loginManager.receiveMessage({
			origin: "https://epc.ub.uu.se/systemoneNOT/idplogin/login",
			data: authInfo,
			source: {}
		});
		let authTokenHolder = dependencies.authTokenHolder;
		assert.strictEqual(authTokenHolder.getToken(0), undefined);
	});

	test("testRecieveMessageFromWebRedirectLoginOnlyHandledIfFromCorrectWindow",
		function(assert) {

			loginWithWebRedirect();
			loginManager.receiveMessage({
				origin: "https://epc.ub.uu.se/systemone/idplogin/login",
				data: authInfo,
				source: {}
			});
			let authTokenHolder = dependencies.authTokenHolder;
			assert.strictEqual(authTokenHolder.getToken(0), undefined);
		});

	test("testAuthTokenIsSetInAuthTokenHolderOnAppTokenLogin", function(assert) {
		loginManager.authInfoCallback(authInfo);
		let authTokenHolder = dependencies.authTokenHolder;
		assert.strictEqual(authTokenHolder.getToken(0), "fakeAuthTokenFromHere");
	});

	test("testUserIdIsSetInViewOnAppTokenLogin", function(assert) {

		loginManager.authInfoCallback(authInfo);
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getLoginId(0), "someLoginId");
	});

	test("testLoggedinStateIsSetOnAppTokenLogin", function(assert) {

		loginManager.authInfoCallback(authInfo);
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);
		let stateSetInView = factoredView.getState();

		assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDIN);
	});

	test("testLoggedinSpecAfterLoginMethodIsCalledOnAppTokenLogin", function(assert) {
		loginManager.authInfoCallback(authInfo);

		assert.strictEqual(afterLoginMethodCalled, true);
	});

	test("testLogoutCallIsMadeOnAppTokenLogout", function(assert) {
		loginManager.login({
			text: "someText",
			type: "appTokenLogin"
		});
		loginManager.authInfoCallback(authInfo);

		loginManager.logout();

		let ajaxCallSpy = dependencies.ajaxCallFactory.getFactored(2);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, "http://localhost:38180/login/rest/authToken/someTokenId");
		assert.strictEqual(ajaxCallSpec.requestMethod, "DELETE");
		assert.strictEqual(ajaxCallSpec.loadMethod, loginManager.logoutCallback);
	});

	test("testLoggedoutStateIsSetOnAppTokenLogoutCallback", function(assert) {
		loginManager.authInfoCallback(authInfo);
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);

		loginManager.logoutCallback();
		let stateSetInView = factoredView.getState();
		assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDOUT);
	});

	test("testLoggedoutSpecAfterLogoutMethodIsCalledOnAppTokenLogoutCallback", function(assert) {
		loginManager.authInfoCallback(authInfo);
		loginManager.logoutCallback();

		assert.strictEqual(afterLogoutMethodCalled, true);
	});

	test("testAuthTokenIsRemovedOnAppTokenLogoutCallback", function(assert) {
		loginManager.authInfoCallback(authInfo);
		loginManager.logoutCallback();

		let authTokenHolder = dependencies.authTokenHolder;
		assert.strictEqual(authTokenHolder.getToken(1), "");
	});

	test("testErrorMessage", function(assert) {
		let errorObject = {};
		loginManager.appTokenErrorCallback(errorObject);
		assert.strictEqual(errorMessage, "AppToken login failed!");
	});

	test("testErrorForStoppedServerOnLogoutResultsInLogout", function(assert) {
		let errorObject = {
			status: 0, 
			spec: {
				requestMethod: "DELETE"
			}
		}; 

		loginManager.appTokenErrorCallback(errorObject);
		
		assert.strictEqual(errorMessage, undefined);
		assertLogoutPerformed(assert);
	});


	test("testPasswordTimeoutMessage", function(assert) {
		loginManager.passwordTimeoutCallback();
		assert.strictEqual(errorMessage, "Password login timedout!");
	});

	test("testPasswordLoginFactoryIsCalledOnPasswordLogin", function(assert) {
		loginManager.login({
			text: "someText",
			type: "password",
			metadataId: "someMetadataId",
			presentationId: "somePresentationId"
		});
		let factored1 = dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
		assert.ok(factored1);
		assert.strictEqual(factored1.type, "passwordLoginJsClientIntegratorSpy");
		let spec0 = dependencies.passwordLoginJsClientIntegratorFactory.getSpec(0);
		assert.strictEqual(spec0.metadataId, "someMetadataId");
		assert.strictEqual(spec0.presentationId, "somePresentationId");
		assert.strictEqual(spec0.jsClient, spec.jsClient);
		assert.strictEqual(spec0.requestMethod, "POST");
		assert.strictEqual(spec0.url, "someAppTokenBaseUrl/login/rest/password/");
		assert.strictEqual(spec0.accept, "application/vnd.uub.authToken+json");
		assert.strictEqual(spec0.authInfoCallback, loginManager.authInfoCallback);
		assert.strictEqual(spec0.errorCallback, loginManager.passwordErrorCallback);
		assert.strictEqual(spec0.timeoutCallback, loginManager.passwordTimeoutCallback);
	});

	test("testPasswordErrorMessage", function(assert) {
		let errorObject = {};
		loginManager.passwordErrorCallback(errorObject);
		assert.strictEqual(errorMessage, "Password login failed!");
	});

	test("testPasswordErrorForStoppedServerOnLogoutResultsInLogout", function(assert) {
		let errorObject = {
			status: 0,
			spec: {
				requestMethod: "DELETE"
			}
		};
		loginManager.passwordErrorCallback(errorObject);
		assert.strictEqual(errorMessage, undefined);

		assertLogoutPerformed(assert);
	});

	test("testPasswordLoginFactoryIsCalledOnlyOnceForSamePasswordLogin", function(assert) {

		let spec = {
			text: "someText",
			type: "password",
			"metadataId": "someMetadataId",
			"presentationId": "somePresentationId",
			"loginUnitId": "uuSystemOneLDAPLoginUnit"

		};
		loginManager.login(spec);
		let factored = dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
		assert.ok(factored);

		loginManager.login(spec);

		let factored1 = dependencies.passwordLoginJsClientIntegratorFactory.getFactored(1);
		assert.strictEqual(factored1, undefined);
	});

	test("testPasswordLoginFactoryIsCalledOnceForEachDifferentPasswordLogin", function(assert) {
		let spec = {
			text: "someText",
			type: "password",
			"metadataId": "someMetadataId",
			"presentationId": "somePresentationId",
			"loginUnitId": "uuSystemOneLDAPLoginUnit"

		};
		loginManager.login(spec);
		let factored = dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
		assert.ok(factored);
		spec.loginUnitId = "someOtherLDAPLoginUnit";
		loginManager.login(spec);

		let factored1 = dependencies.passwordLoginJsClientIntegratorFactory.getFactored(1);
		assert.ok(factored1);
	});

	test("testRemovePasswordLoginFromJsClientCalledOnIntegrationAfterLogin", function(assert) {
		let spec = {
			text: "someText",
			type: "password",
			metadataId: "someMetadataId",
			presentationId: "somePresentationId",
			loginUnitId: "uuSystemOneLDAPLoginUnit"

		};
		loginManager.login(spec);
		let factored = dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
		assert.ok(factored);

		spec.loginUnitId = "someOtherLDAPLoginUnit";
		loginManager.login(spec);
		let factored1 = dependencies.passwordLoginJsClientIntegratorFactory.getFactored(1);
		assert.ok(factored1);

		loginManager.authInfoCallback(authInfo);

		assert.strictEqual(factored.getNoOfRemovePasswordLoginFromJsClient(), 1);
		assert.strictEqual(factored1.getNoOfRemovePasswordLoginFromJsClient(), 1);
	});

	test("testPasswordLoginShownInJsClientWhenSameLoginCalledAgain", function(assert) {
		let spec = {
			text: "someText",
			type: "password",
			metadataId: "someMetadataId",
			presentationId: "somePresentationId",
			loginUnitId: "uuSystemOneLDAPLoginUnit"
		};

		assert.strictEqual(dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 0);
		loginManager.login(spec);
		let factored = dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
		assert.strictEqual(dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 1);
		assert.strictEqual(factored.getNoOfShowPasswordLoginInJsClient(), 0);

		loginManager.login(spec);
		assert.strictEqual(dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 1);
		assert.strictEqual(factored.getNoOfShowPasswordLoginInJsClient(), 1);
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getNoOfCallsToCloseHolder(), 2);
	});

	test("testPasswordLoginFirstLoginRemovedOnSuccesfullLogin", function(assert) {
		let spec = {
			text: "someText",
			type: "password",
			metadataId: "someMetadataId",
			presentationId: "somePresentationId",
			loginUnitId: "uuSystemOneLDAPLoginUnit"
		};

		assert.strictEqual(dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 0);

		loginManager.login(spec);
		assert.strictEqual(dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 1);

		loginManager.login(spec);
		assert.strictEqual(dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 1);

		loginManager.authInfoCallback(authInfo);

		loginManager.login(spec);
		assert.strictEqual(dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 2);
	});

	test("testCloseHolderIsCalledOnShowPassword", function(assert) {
		loginManager.login({
			text: "someText",
			type: "password",
			metadataId: "someMetadataId",
			presentationId: "somePresentationId"
		});
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);

		assert.strictEqual(factoredView.getNoOfCallsToCloseHolder(), 1);
	});

	function assertLogoutPerformed(assert) {
		let factoredView = dependencies.loginManagerViewFactory.getFactored(0);
		let stateSetInView = factoredView.getState();
		assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDOUT);

		assert.strictEqual(afterLogoutMethodCalled, true);

		let authTokenHolder = dependencies.authTokenHolder;
		assert.strictEqual(authTokenHolder.getToken(0), "");
	}

	test("testErrorRestartedServerOnLogoutResultsInLogout", function(assert) {
		let errorObject = {
			status: 404,
			spec: {
				requestMethod: "DELETE"
			}
		};
		loginManager.appTokenErrorCallback(errorObject);
		assert.strictEqual(errorMessage, undefined);

		assertLogoutPerformed(assert);
	});

	test("testAppTokenTimeoutMessage", function(assert) {
		loginManager.appTokenTimeoutCallback();
		assert.strictEqual(errorMessage, "AppToken login timedout!");
	});
});
