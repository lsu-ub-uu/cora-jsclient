/*
 * Copyright 2017 Uppsala University Library
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

QUnit.module("appTokenLoginTest.js", {
	beforeEach : function() {

		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();

		var dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy
		};

		var authInfo = {};
		this.getAuthInfo = function() {
			return authInfo;
		}
		var errorInfo = {};
		this.getErrorInfo = function() {
			return errorInfo;
		}
		var timeoutInfo = {};
		this.getTimeoutInfo = function() {
			return timeoutInfo;
		}

		var spec = {
			"requestMethod" : "POST",
			"url" : "http://localhost:8080/apptokenverifier/rest/apptoken/",
			"accept" : "",
			"authInfoCallback" : function(authInfoIn) {
				authInfo = authInfoIn;
			},
			"errorCallback" : function(error) {
				errorInfo = error;
			},
			"timeoutCallback" : function(timeout) {
				timeoutInfo = timeout;
			}
		}

		this.appTokenLogin = CORA.appTokenLogin(dependencies, spec);

		this.assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy) {
			var ajaxCallSpec = ajaxCallSpy.getSpec();
			assert.strictEqual(ajaxCallSpec.url,
					"http://localhost:8080/apptokenverifier/"
							+ "rest/apptoken/someUserId");
			assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
			assert.strictEqual(ajaxCallSpec.accept, "");
			assert.strictEqual(ajaxCallSpec.loadMethod,
					this.appTokenLogin.handleResponse);
			assert.strictEqual(ajaxCallSpec.data, "someAppToken");
		}
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.appTokenLogin);
	assert.strictEqual(this.appTokenLogin.type, "appTokenLogin");
});

QUnit.test("testUpload", function(assert) {
	var appTokenLogin = this.appTokenLogin;

	appTokenLogin.login("someUserId", "someAppToken");

	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);
});

QUnit.test("testGetAuthTokenForAppToken", function(assert) {
	var appTokenLogin = this.appTokenLogin;

	appTokenLogin.login("someUserId", "someAppToken");

	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	var loadMethod = ajaxCallSpy0.getSpec().loadMethod;
	var tokenAnswer = {
		"children" : [ {
			"name" : "id",
			"value" : "someAuthToken"
		}, {
			"name" : "validForNoSeconds",
			"value" : "278"
		} ],
		"name" : "authToken"
	};
	var answer = {
		"status" : 201,
		"responseText" : JSON.stringify(tokenAnswer)
	};
	loadMethod(answer);
	var authInfo = this.getAuthInfo();
	assert.strictEqual(authInfo.userId, "someUserId");
	assert.strictEqual(authInfo.token, "someAuthToken");
	assert.strictEqual(authInfo.validForNoSeconds, "278");
});

QUnit.test("testGetError", function(assert) {
	var appTokenLogin = this.appTokenLogin;
	appTokenLogin.login("someUserId", "someAppToken");
	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	var errorMethod = ajaxCallSpy0.getSpec().errorMethod;
	
	var answer = {
			"status" : 201,
			"responseText" : "error"
	};
	errorMethod(answer);
	var errorInfo = this.getErrorInfo();
	
	assert.strictEqual(errorInfo, answer);
});

QUnit.test("testGetTimeOut", function(assert) {
	var appTokenLogin = this.appTokenLogin;
	appTokenLogin.login("someUserId", "someAppToken");
	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	var timeoutMethod = ajaxCallSpy0.getSpec().timeoutMethod;

	var answer = {
			"status" : 201,
			"responseText" : "timeout"
	};
	timeoutMethod(answer);
	var timeoutInfo = this.getTimeoutInfo();

	assert.strictEqual(timeoutInfo, answer);
});