/*
 * Copyright 2016, 2017 Uppsala University Library
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

QUnit.module("loginManagerTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"loginManagerViewFactory" : CORATEST.loginManagerViewFactorySpy(),
			"appTokenLoginFactory" : CORATEST.appTokenLoginFactorySpy(),
			"authTokenHolder" : CORATEST.authTokenHolderSpy(),
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy()
		};
		var afterLoginMethodCalled = false;
		this.afterLoginMethod = function() {
			afterLoginMethodCalled = true;
		};
		this.afterLoginMethodWasCalled = function() {
			return afterLoginMethodCalled;
		}

		var afterLogoutMethodCalled = false;
		this.afterLogoutMethod = function() {
			afterLogoutMethodCalled = true;
		};
		this.afterLogoutMethodWasCalled = function() {
			return afterLogoutMethodCalled;
		}

		var errorMessage;
		this.setErrorMessage = function(errorMessageIn) {
			errorMessage = errorMessageIn;
		}
		this.getErrorMessage = function() {
			return errorMessage;
		}
		this.spec = {
			"afterLoginMethod" : this.afterLoginMethod,
			"afterLogoutMethod" : this.afterLogoutMethod,
			"setErrorMessage" : this.setErrorMessage,
			"appTokenBaseUrl" : "someAppTokenBaseUrl/"
		};
		this.loginManager = CORA.loginManager(this.dependencies, this.spec);

		this.authInfo = {
			"userId" : "141414",
			"token" : "fake authToken from here",
			"validForNoSeconds" : "131",
			"actionLinks" : {
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://localhost:8080/apptokenverifier/rest/apptoken/141414"
				}
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testConstants", function(assert) {
	assert.strictEqual(CORA.loginManager.LOGGEDOUT, 0);
	assert.strictEqual(CORA.loginManager.LOGGEDIN, 1);
});

QUnit.test("init", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.type, "loginManager");
});

QUnit.test("testGetDependencies", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.getDependencies(), this.dependencies);
});
QUnit.test("testGetSpec", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.getSpec(), this.spec);
});

QUnit.test("testInitCreatesALoginManagerView", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.ok(factoredView !== undefined);
});

QUnit.test("testInitCreatesALoginManagerViewsViewIsReturnedForGetHtml", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	var loginManagerHtml = loginManager.getHtml();
	assert.strictEqual(loginManagerHtml, factoredView.getHtml());
});

QUnit.test("testInitLoginManagerViewSpec", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	var factoredSpec = factoredView.getSpec();

	var expectedLoginOptions = [ {
		"text" : "appToken as 141414",
		"call" : loginManager.appTokenLogin
	} ];
	var factoredLoginOptions = factoredSpec.loginOptions;

	assert.strictEqual(factoredLoginOptions.length, 1);
	assert.strictEqual(factoredLoginOptions[0].text, expectedLoginOptions[0].text);
	assert.strictEqual(factoredLoginOptions[0].call, loginManager.appTokenLogin);

	assert.strictEqual(factoredSpec.logoutMethod, loginManager.logout);
});

QUnit.test("testAppTokenLoginFactoryIsCalledOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenLogin(0);
	var factored1 = this.dependencies.appTokenLoginFactory.getFactored(0);
	assert.ok(factored1);
	var spec0 = this.dependencies.appTokenLoginFactory.getSpec(0);
	assert.strictEqual(spec0.requestMethod, "POST");
	assert.strictEqual(spec0.url, "someAppTokenBaseUrl/apptokenverifier/rest/apptoken/");
	assert.strictEqual(spec0.accept, "");
	assert.strictEqual(spec0.authInfoCallback, loginManager.appTokenAuthInfoCallback);
	assert.strictEqual(spec0.errorCallback, loginManager.appTokenErrorCallback);
	assert.strictEqual(spec0.timeoutCallback, loginManager.appTokenTimeoutCallback);
});

QUnit.test("testAppTokenLoginCallsServerOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenLogin(0);
	var factored0 = this.dependencies.appTokenLoginFactory.getFactored(0);
	assert.strictEqual(factored0.getUserId(0), "141414");
	assert.strictEqual(factored0.getAppToken(0), "63e6bd34-02a1-4c82-8001-158c104cae0e");
});

QUnit.test("testAuthTokenIsSetInAuthTokenHolderOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), "fake authToken from here");
});

QUnit.test("testUserIdIsSetInViewOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getUserId(0), "141414");
});

QUnit.test("testLoggedinStateIsSetOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	var stateSetInView = factoredView.getState();

	assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDIN);
});

QUnit.test("testLoggedinSpecAfterLoginMethodIsCalledOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);

	assert.strictEqual(this.afterLoginMethodWasCalled(), true);
});

QUnit.test("testLogoutCallIsMadeOnAppTokenLogout", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);

	loginManager.logout();

	var ajaxCallSpy = this.dependencies.ajaxCallFactory.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://localhost:8080/apptokenverifier/"
			+ "rest/apptoken/141414");
	assert.strictEqual(ajaxCallSpec.requestMethod, "DELETE");
	// assert.strictEqual(ajaxCallSpec.accept, "");
	assert.strictEqual(ajaxCallSpec.loadMethod, loginManager.logoutCallback);
	assert.strictEqual(ajaxCallSpec.data, "fake authToken from here");
});

QUnit.test("testLoggedoutStateIsSetOnAppTokenLogoutCallback", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);

	loginManager.logoutCallback();
	var stateSetInView = factoredView.getState();
	assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDOUT);
});

QUnit.test("testLoggedoutSpecAfterLogoutMethodIsCalledOnAppTokenLogoutCallback", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	loginManager.logoutCallback();

	assert.strictEqual(this.afterLogoutMethodWasCalled(), true);
});

QUnit.test("testAuthTokenIsRemovedOnAppTokenLogoutCallback", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	loginManager.logoutCallback();

	var authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(1), "");
});

QUnit.test("testErrorMessage", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenErrorCallback();
	assert.strictEqual(this.getErrorMessage(), "AppToken login failed!");
});

QUnit.test("testTimeoutMessage", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenTimeoutCallback();
	assert.strictEqual(this.getErrorMessage(), "AppToken login timedout!");
});