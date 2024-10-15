/*
 * Copyright 2016, 2017, 2018, 2019, 2024 Uppsala University Library
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

QUnit.module("login/loginManagerTest.js", {
	beforeEach: function() {
		addStandardAppTokensToLoginMenu = true;
		this.getAddedWindowEvents = function() {
			return addedEvents;
		};
		let addedEvents = [];
		this.addEvent = function(type, listener, useCapture) {
			addedEvents.push({
				type: type,
				listener: listener,
				useCapture: useCapture
			});
		}
		let oldAddEvent = window.addEventListener;
		window.addEventListener = this.addEvent;
		this.dependencies = {
			textProvider: CORATEST.textProviderSpy(),
			loginManagerViewFactory: CORATEST.loginManagerViewFactorySpy(),
			appTokenLoginFactory: CORATEST.appTokenLoginFactorySpy(),
			webRedirectLoginFactory: CORATEST.standardFactorySpy("webRedirectLoginSpy"),
			passwordLoginJsClientIntegratorFactory: CORATEST
				.standardFactorySpy("passwordLoginJsClientIntegratorSpy"),
			authTokenHolder: CORATEST.authTokenHolderSpy(),
			ajaxCallFactory: CORATEST.ajaxCallFactorySpy()
		};
		let afterLoginMethodCalled = false;
		this.afterLoginMethod = function() {
			afterLoginMethodCalled = true;
		};
		this.afterLoginMethodWasCalled = function() {
			return afterLoginMethodCalled;
		}

		let afterLogoutMethodCalled = false;
		this.afterLogoutMethod = function() {
			afterLogoutMethodCalled = true;
		};
		this.afterLogoutMethodWasCalled = function() {
			return afterLogoutMethodCalled;
		}

		let errorMessage;
		this.setErrorMessage = function(errorMessageIn) {
			errorMessage = errorMessageIn;
		}
		this.getErrorMessage = function() {
			return errorMessage;
		}
		this.spec = {
			"afterLoginMethod": this.afterLoginMethod,
			"afterLogoutMethod": this.afterLogoutMethod,
			"setErrorMessage": this.setErrorMessage,
			"appTokenBaseUrl": "someAppTokenBaseUrl/",
			baseUrl: "http://epc.ub.uu.se/cora/rest/",
			"jsClient": CORATEST.jsClientSpy()
		};
		this.loginManager = CORA.loginManager(this.dependencies, this.spec);

		this.authInfo = {
			userId: "141414",
			loginId: "someLoginId",
			token: "fake authToken from here",
			validForNoSeconds: "131",
			actionLinks: {
				delete: {
					requestMethod: "DELETE",
					rel: "delete",
					url: "http://localhost:8080/login/rest/apptoken/141414"
				}
			}
		};
		this.loginWithWebRedirect = function() {
			this.loginOption = {
				text: "Uppsala webredirect",
				type: "webRedirectLogin",
				"url": "https://epc.ub.uu.se/Shibboleth.sso/Login/uu?target=https://epc.ub.uu.se/systemone/idplogin/login"
			};
			this.loginManager.login(this.loginOption);
		}

		this.answerListLoginUnitsCall = function(no) {
			let ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(no);
			let jsonLoginUnitList = JSON.stringify(CORATEST.loginUnitList);
			let answer = {
				"spec": ajaxCallSpy0.getSpec(),
				"responseText": jsonLoginUnitList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.answerListLoginsCall = function(no) {
			let ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(no);
			let jsonLoginList = JSON.stringify(CORATEST.loginList);
			let answer = {
				"spec": ajaxCallSpy0.getSpec(),
				"responseText": jsonLoginList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
	},
	afterEach: function() {
	}
});

QUnit.test("testConstants", function(assert) {
	assert.strictEqual(CORA.loginManager.LOGGEDOUT, 0);
	assert.strictEqual(CORA.loginManager.LOGGEDIN, 1);
});

QUnit.test("init", function(assert) {
	let loginManager = this.loginManager;
	assert.strictEqual(loginManager.type, "loginManager");
});

QUnit.test("testGetDependencies", function(assert) {
	let loginManager = this.loginManager;
	assert.strictEqual(loginManager.getDependencies(), this.dependencies);
});
QUnit.test("testGetSpec", function(assert) {
	let loginManager = this.loginManager;
	assert.strictEqual(loginManager.getSpec(), this.spec);
});

QUnit.test("testCallForLoginUnitsAndLogin", function(assert) {
	let loginManager = this.loginManager;
	let ajaxCallSpy = this.dependencies.ajaxCallFactory.getFactored(0);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, this.spec.baseUrl + "record/loginUnit");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.recordList+json");
	assert.strictEqual(ajaxCallSpec.loadMethod, loginManager.fetchLoginUnitCallback);
	assert.strictEqual(ajaxCallSpec.errorMethod, loginManager.fetchLoginUnitErrorCallback);
	assert.strictEqual(ajaxCallSpec.timeoutMethod, loginManager.fetchLoginUnitTimeoutCallback);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.timeoutInMS, undefined);

	let ajaxCallSpy1 = this.dependencies.ajaxCallFactory.getFactored(1);
	let ajaxCallSpec1 = ajaxCallSpy1.getSpec();
	assert.strictEqual(ajaxCallSpec1.url, this.spec.baseUrl + "record/login");
	assert.strictEqual(ajaxCallSpec1.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.recordList+json");
	assert.strictEqual(ajaxCallSpec1.loadMethod, loginManager.fetchLoginCallback);
	assert.strictEqual(ajaxCallSpec1.errorMethod, loginManager.fetchLoginErrorCallback);
	assert.strictEqual(ajaxCallSpec1.timeoutMethod, loginManager.fetchLoginTimeoutCallback);
	assert.strictEqual(ajaxCallSpec1.data, undefined);
	assert.strictEqual(ajaxCallSpec1.timeoutInMS, undefined);
});

QUnit.test("testAnswerForLoginUnitsOnlySetInViewAfterAnswerForBothLists", function(assert) {
	let loginManager = this.loginManager;
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getLoginOptions(), undefined);
	this.answerListLoginUnitsCall(0);
	assert.strictEqual(factoredView.getLoginOptions(), undefined);
	this.answerListLoginsCall(1);
	assert.notEqual(factoredView.getLoginOptions(), undefined);
});

QUnit.test("testAnswerForLoginUnitsOnlySetInViewAfterAnswerForBothListsReOrdered",
	function(assert) {
		let loginManager = this.loginManager;
		let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getLoginOptions(), undefined);
		this.answerListLoginsCall(1);
		assert.strictEqual(factoredView.getLoginOptions(), undefined);
		this.answerListLoginUnitsCall(0);
		assert.notEqual(factoredView.getLoginOptions(), undefined);
	});

QUnit.test("testAnswerForLoginUnits", function(assert) {
			addStandardAppTokensToLoginMenu = true;
			appTokenOptions.push({
					text: "someText",
					type: "appTokenLogin",
					userId: "someLoginId",
					appToken: "someAppToken"
				});

			this.loginManager = CORA.loginManager(this.dependencies, this.spec);
			let factoredView = this.dependencies.loginManagerViewFactory.getFactored(1);
			this.answerListLoginUnitsCall(2);
			this.answerListLoginsCall(3);

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

QUnit.test("testAnswerForLoginUnitsWithoutStandardApptokenLogins", function(assert) {
			addStandardAppTokensToLoginMenu = false;
			this.loginManager = CORA.loginManager(this.dependencies, this.spec);
			let factoredView = this.dependencies.loginManagerViewFactory.getFactored(1);
			this.answerListLoginUnitsCall(2);
			this.answerListLoginsCall(3);
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

QUnit.test("testLoginUnitErrorMessage", function(assert) {
	let loginManager = this.loginManager;
	loginManager.fetchLoginUnitErrorCallback();
	assert.strictEqual(this.getErrorMessage(), "Fetching of loginUnits failed!");
});

QUnit.test("testLoginUnitTimeoutMessage", function(assert) {
	let loginManager = this.loginManager;
	loginManager.fetchLoginUnitTimeoutCallback();
	assert.strictEqual(this.getErrorMessage(), "Fetching of loginUnits timedout!");
});

QUnit.test("testLoginErrorMessage", function(assert) {
	let loginManager = this.loginManager;
	loginManager.fetchLoginErrorCallback();
	assert.strictEqual(this.getErrorMessage(), "Fetching of logins failed!");
});

QUnit.test("testLoginTimeoutMessage", function(assert) {
	let loginManager = this.loginManager;
	loginManager.fetchLoginTimeoutCallback();
	assert.strictEqual(this.getErrorMessage(), "Fetching of logins timedout!");
});

QUnit.test("testInitCreatesALoginManagerView", function(assert) {
	let loginManager = this.loginManager;
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.ok(factoredView !== undefined);
});

QUnit.test("testInitCreatesALoginManagerViewsViewIsReturnedForGetHtml", function(assert) {
	let loginManager = this.loginManager;
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	let loginManagerHtml = loginManager.getHtml();
	assert.strictEqual(loginManagerHtml, factoredView.getHtml());
});

QUnit.test("testInitLoginManagerViewSpec", function(assert) {
	let loginManager = this.loginManager;
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	let factoredSpec = factoredView.getSpec();

	let factoredLoginOptions = factoredSpec.loginOptions;

	assert.strictEqual(factoredLoginOptions, undefined);
	assert.strictEqual(factoredSpec.loginMethod, loginManager.login);
	assert.strictEqual(factoredSpec.logoutMethod, loginManager.logout);
});

QUnit.test("testAppTokenLoginFactoryIsCalledOnAppTokenLogin", function(assert) {
	let loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "appTokenLogin"
	});
	let factored1 = this.dependencies.appTokenLoginFactory.getFactored(0);
	assert.ok(factored1);
	let spec0 = this.dependencies.appTokenLoginFactory.getSpec(0);
	assert.strictEqual(spec0.requestMethod, "POST");
	assert.strictEqual(spec0.url, "someAppTokenBaseUrl/login/rest/apptoken");
	assert.strictEqual(spec0.contentType,  "application/vnd.uub.login");
	assert.strictEqual(spec0.accept,  "application/vnd.uub.record+json");
	assert.strictEqual(spec0.authInfoCallback, loginManager.authInfoCallback);
	assert.strictEqual(spec0.errorCallback, loginManager.appTokenErrorCallback);
	assert.strictEqual(spec0.timeoutCallback, loginManager.appTokenTimeoutCallback);
});

QUnit.test("testAppTokenLoginCallsServerOnAppTokenLogin", function(assert) {
	let loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "appTokenLogin",
		loginId: "testLoginId",
		appToken: "testAppToken"
	});
	let factored0 = this.dependencies.appTokenLoginFactory.getFactored(0);
	assert.strictEqual(factored0.getLoginId(0), "testLoginId");
	assert.strictEqual(factored0.getAppToken(0), "testAppToken");
});

QUnit.test("testWebRedirectLoginListensForMessagesOnWindow", function(assert) {
	let loginManager = this.loginManager;
	this.loginWithWebRedirect();

	let addedEvent = this.getAddedWindowEvents()[0];
	assert.strictEqual(addedEvent.type, "message");
	assert.strictEqual(addedEvent.listener, loginManager.receiveMessage);
	assert.strictEqual(addedEvent.useCapture, false);
});

QUnit.test("testWebRedirectLoginFactoryIsCalledOnWebRedirectLogin", function(assert) {
	let loginManager = this.loginManager;
	this.loginWithWebRedirect();

	let factored = this.dependencies.webRedirectLoginFactory.getFactored(0);
	assert.strictEqual(factored.type, "webRedirectLoginSpy");
	let spec0 = this.dependencies.webRedirectLoginFactory.getSpec(0);

	assert.strictEqual(spec0.url, this.loginOption.url);
});

QUnit.test("testRecieveMessageFromWebRedirectLogin", function(assert) {
	let loginManager = this.loginManager;
	this.loginWithWebRedirect();

	let factored = this.dependencies.webRedirectLoginFactory.getFactored(0);
	loginManager.receiveMessage({
		origin: "https://epc.ub.uu.se",
		data: this.authInfo,
		source: factored.getOpenedWindow()
	});
	let authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), "fake authToken from here");
});

QUnit.test("testRecieveMessageFromWebRedirectLoginNotHandledIfWrongOrigin", function(assert) {
	let loginManager = this.loginManager;
	this.loginWithWebRedirect();
	loginManager.receiveMessage({
		origin: "https://epc.ub.uu.se/systemoneNOT/idplogin/login",
		data: this.authInfo,
		source: {}
	});
	let authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), undefined);
});

QUnit.test("testRecieveMessageFromWebRedirectLoginOnlyHandledIfFromCorrectWindow",
	function(assert) {
		let loginManager = this.loginManager;
		this.loginWithWebRedirect();
		loginManager.receiveMessage({
			origin: "https://epc.ub.uu.se/systemone/idplogin/login",
			data: this.authInfo,
			source: {}
		});
		let authTokenHolder = this.dependencies.authTokenHolder;
		assert.strictEqual(authTokenHolder.getToken(0), undefined);
	});

QUnit.test("testAuthTokenIsSetInAuthTokenHolderOnAppTokenLogin", function(assert) {
	let loginManager = this.loginManager;
	loginManager.authInfoCallback(this.authInfo);
	let authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), "fake authToken from here");
});

QUnit.test("testUserIdIsSetInViewOnAppTokenLogin", function(assert) {
	let loginManager = this.loginManager;
	loginManager.authInfoCallback(this.authInfo);
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getLoginId(0), "someLoginId");
});

QUnit.test("testLoggedinStateIsSetOnAppTokenLogin", function(assert) {
	let loginManager = this.loginManager;
	loginManager.authInfoCallback(this.authInfo);
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	let stateSetInView = factoredView.getState();

	assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDIN);
});

QUnit.test("testLoggedinSpecAfterLoginMethodIsCalledOnAppTokenLogin", function(assert) {
	let loginManager = this.loginManager;
	loginManager.authInfoCallback(this.authInfo);

	assert.strictEqual(this.afterLoginMethodWasCalled(), true);
});

QUnit.test("testLogoutCallIsMadeOnAppTokenLogout", function(assert) {
	let loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "appTokenLogin"
	});
	loginManager.authInfoCallback(this.authInfo);
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);

	loginManager.logout();

	let ajaxCallSpy = this.dependencies.ajaxCallFactory.getFactored(2);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://localhost:8080/login/"
		+ "rest/apptoken/141414");
	assert.strictEqual(ajaxCallSpec.requestMethod, "DELETE");
	assert.strictEqual(ajaxCallSpec.loadMethod, loginManager.logoutCallback);
});

QUnit.test("testLoggedoutStateIsSetOnAppTokenLogoutCallback", function(assert) {
	let loginManager = this.loginManager;
	loginManager.authInfoCallback(this.authInfo);
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);

	loginManager.logoutCallback();
	let stateSetInView = factoredView.getState();
	assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDOUT);
});

QUnit.test("testLoggedoutSpecAfterLogoutMethodIsCalledOnAppTokenLogoutCallback", function(assert) {
	let loginManager = this.loginManager;
	loginManager.authInfoCallback(this.authInfo);
	loginManager.logoutCallback();

	assert.strictEqual(this.afterLogoutMethodWasCalled(), true);
});

QUnit.test("testAuthTokenIsRemovedOnAppTokenLogoutCallback", function(assert) {
	let loginManager = this.loginManager;
	loginManager.authInfoCallback(this.authInfo);
	loginManager.logoutCallback();

	let authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(1), "");
});

QUnit.test("testErrorMessage", function(assert) {
	let loginManager = this.loginManager;
	let errorObject = {};
	loginManager.appTokenErrorCallback(errorObject);
	assert.strictEqual(this.getErrorMessage(), "AppToken login failed!");
});

QUnit.test("testErrorForStoppedServerOnLogoutResultsInLogout", function(assert) {
	let loginManager = this.loginManager;
	let errorObject = {
		status: 0,
		spec: {
			requestMethod: "DELETE"
		}
	};
	loginManager.appTokenErrorCallback(errorObject);
	assert.strictEqual(this.getErrorMessage(), undefined);

	assertLogoutPerformed(this, assert);
});


QUnit.test("testPasswordTimeoutMessage", function(assert) {
	let loginManager = this.loginManager;
	loginManager.passwordTimeoutCallback();
	assert.strictEqual(this.getErrorMessage(), "Password login timedout!");
});

QUnit.test("testPasswordLoginFactoryIsCalledOnPasswordLogin", function(assert) {
	let loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "password",
		metadataId: "someMetadataId",
		presentationId: "somePresentationId"
	});
	let factored1 = this.dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
	assert.ok(factored1);
	assert.strictEqual(factored1.type, "passwordLoginJsClientIntegratorSpy");
	let spec0 = this.dependencies.passwordLoginJsClientIntegratorFactory.getSpec(0);
	assert.strictEqual(spec0.metadataId, "someMetadataId");
	assert.strictEqual(spec0.presentationId, "somePresentationId");
	assert.strictEqual(spec0.jsClient, this.spec.jsClient);
	assert.strictEqual(spec0.requestMethod, "POST");
	assert.strictEqual(spec0.url, "someAppTokenBaseUrl/login/rest/password/");
	assert.strictEqual(spec0.accept, "application/vnd.uub.record+json");
	assert.strictEqual(spec0.authInfoCallback, loginManager.authInfoCallback);
	assert.strictEqual(spec0.errorCallback, loginManager.passwordErrorCallback);
	assert.strictEqual(spec0.timeoutCallback, loginManager.passwordTimeoutCallback);
});

QUnit.test("testPasswordErrorMessage", function(assert) {
	let loginManager = this.loginManager;
	let errorObject = {};
	loginManager.passwordErrorCallback(errorObject);
	assert.strictEqual(this.getErrorMessage(), "Password login failed!");
});

QUnit.test("testPasswordErrorForStoppedServerOnLogoutResultsInLogout", function(assert) {
	let loginManager = this.loginManager;
	let errorObject = {
		status: 0,
		spec: {
			requestMethod: "DELETE"
		}
	};
	loginManager.passwordErrorCallback(errorObject);
	assert.strictEqual(this.getErrorMessage(), undefined);

	assertLogoutPerformed(this, assert);
});

QUnit.test("testPasswordLoginFactoryIsCalledOnlyOnceForSamePasswordLogin", function(assert) {
	let loginManager = this.loginManager;
	let spec = {
		text: "someText",
		type: "password",
		"metadataId": "someMetadataId",
		"presentationId": "somePresentationId",
		"loginUnitId": "uuSystemOneLDAPLoginUnit"

	};
	loginManager.login(spec);
	let factored = this.dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
	assert.ok(factored);

	loginManager.login(spec);

	let factored1 = this.dependencies.passwordLoginJsClientIntegratorFactory.getFactored(1);
	assert.strictEqual(factored1, undefined);
});

QUnit.test("testPasswordLoginFactoryIsCalledOnceForEachDifferentPasswordLogin", function(assert) {
	let loginManager = this.loginManager;
	let spec = {
		text: "someText",
		type: "password",
		"metadataId": "someMetadataId",
		"presentationId": "somePresentationId",
		"loginUnitId": "uuSystemOneLDAPLoginUnit"

	};
	loginManager.login(spec);
	let factored = this.dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
	assert.ok(factored);
	spec.loginUnitId = "someOtherLDAPLoginUnit";
	loginManager.login(spec);

	let factored1 = this.dependencies.passwordLoginJsClientIntegratorFactory.getFactored(1);
	assert.ok(factored1);
});

QUnit.test("testRemovePasswordLoginFromJsClientCalledOnIntegrationAfterLogin", function(assert) {
	let loginManager = this.loginManager;
	let spec = {
		text: "someText",
		type: "password",
		metadataId: "someMetadataId",
		presentationId: "somePresentationId",
		loginUnitId: "uuSystemOneLDAPLoginUnit"

	};
	loginManager.login(spec);
	let factored = this.dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
	assert.ok(factored);

	spec.loginUnitId = "someOtherLDAPLoginUnit";
	loginManager.login(spec);
	let factored1 = this.dependencies.passwordLoginJsClientIntegratorFactory.getFactored(1);
	assert.ok(factored1);

	loginManager.authInfoCallback(this.authInfo);

	assert.strictEqual(factored.getNoOfRemovePasswordLoginFromJsClient(), 1);
	assert.strictEqual(factored1.getNoOfRemovePasswordLoginFromJsClient(), 1);
});

QUnit.test("testPasswordLoginShownInJsClientWhenSameLoginCalledAgain", function(assert) {
	let loginManager = this.loginManager;
	let spec = {
		text: "someText",
		type: "password",
		metadataId: "someMetadataId",
		presentationId: "somePresentationId",
		loginUnitId: "uuSystemOneLDAPLoginUnit"
	};

	assert.strictEqual(this.dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 0);
	loginManager.login(spec);
	let factored = this.dependencies.passwordLoginJsClientIntegratorFactory.getFactored(0);
	assert.strictEqual(this.dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 1);
	assert.strictEqual(factored.getNoOfShowPasswordLoginInJsClient(), 0);

	loginManager.login(spec);
	assert.strictEqual(this.dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 1);
	assert.strictEqual(factored.getNoOfShowPasswordLoginInJsClient(), 1);
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getNoOfCallsToCloseHolder(), 2);
});

QUnit.test("testPasswordLoginFirstLoginRemovedOnSuccesfullLogin", function(assert) {
	let loginManager = this.loginManager;
	let spec = {
		text: "someText",
		type: "password",
		metadataId: "someMetadataId",
		presentationId: "somePresentationId",
		loginUnitId: "uuSystemOneLDAPLoginUnit"
	};

	assert.strictEqual(this.dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 0);

	loginManager.login(spec);
	assert.strictEqual(this.dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 1);

	loginManager.login(spec);
	assert.strictEqual(this.dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 1);

	loginManager.authInfoCallback(this.authInfo);

	loginManager.login(spec);
	assert.strictEqual(this.dependencies.passwordLoginJsClientIntegratorFactory.getNoOfFactored(), 2);
});

QUnit.test("testCloseHolderIsCalledOnShowPassword", function(assert) {
	let loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "password",
		metadataId: "someMetadataId",
		presentationId: "somePresentationId"
	});
	let factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getNoOfCallsToCloseHolder(), 1);
});

function assertLogoutPerformed(test, assert) {
	let factoredView = test.dependencies.loginManagerViewFactory.getFactored(0);
	let stateSetInView = factoredView.getState();
	assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDOUT);

	assert.strictEqual(test.afterLogoutMethodWasCalled(), true);

	let authTokenHolder = test.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), "");
}

QUnit.test("testErrorRestartedServerOnLogoutResultsInLogout", function(assert) {
	let loginManager = this.loginManager;
	let errorObject = {
		status: 404,
		spec: {
			requestMethod: "DELETE"
		}
	};
	loginManager.appTokenErrorCallback(errorObject);
	assert.strictEqual(this.getErrorMessage(), undefined);

	assertLogoutPerformed(this, assert);
});

QUnit.test("testAppTokenTimeoutMessage", function(assert) {
	let loginManager = this.loginManager;
	loginManager.appTokenTimeoutCallback();
	assert.strictEqual(this.getErrorMessage(), "AppToken login timedout!");
});

