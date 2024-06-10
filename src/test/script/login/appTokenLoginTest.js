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

QUnit.module("login/appTokenLoginTest.js", {
	beforeEach : function() {

		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();

		this.dependencies = {
			ajaxCallFactory : this.ajaxCallFactorySpy
		};

		let authInfo = {};
		this.getAuthInfo = function() {
			return authInfo;
		};
		let errorInfo = {};
		this.getErrorInfo = function() {
			return errorInfo;
		};
		let timeoutInfo = {};
		this.getTimeoutInfo = function() {
			return timeoutInfo;
		};

		this.spec = {
			requestMethod : "POST",
			url : "http://localhost:8080/login/rest/apptoken/",
			accept : "",
			authInfoCallback : function(authInfoIn) {
				authInfo = authInfoIn;
			},
			errorCallback : function(error) {
				errorInfo = error;
			},
			timeoutCallback : function(timeout) {
				timeoutInfo = timeout;
			}
		};

		this.appTokenLogin = CORA.appTokenLogin(this.dependencies, this.spec);

		this.assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy) {
			let ajaxCallSpec = ajaxCallSpy.getSpec();
			assert.strictEqual(ajaxCallSpec.url, "http://localhost:8080/login/"
					+ "rest/apptoken/someUserId");
			assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
			assert.strictEqual(ajaxCallSpec.accept, "");
			assert.strictEqual(ajaxCallSpec.loadMethod, this.appTokenLogin.handleResponse);
			assert.strictEqual(ajaxCallSpec.data, "someAppToken");
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.appTokenLogin);
	assert.strictEqual(this.appTokenLogin.type, "appTokenLogin");
});

QUnit.test("getDependencies", function(assert) {
	assert.ok(this.appTokenLogin);
	assert.strictEqual(this.appTokenLogin.getDependencies(), this.dependencies);
});

QUnit.test("getSpec", function(assert) {
	assert.ok(this.appTokenLogin);
	assert.strictEqual(this.appTokenLogin.getSpec(), this.spec);
});

QUnit.test("testUpload", function(assert) {
	let appTokenLogin = this.appTokenLogin;

	appTokenLogin.login("someUserId", "someAppToken");

	let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);
});

QUnit.test("testGetAuthTokenForAppToken", function(assert) {
	let appTokenLogin = this.appTokenLogin;

	appTokenLogin.login("someUserId", "someAppToken");

	let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	let loadMethod = ajaxCallSpy0.getSpec().loadMethod;
	let tokenAnswer = {
		"data" : {
			"children" : [ {
				"name" : "id",
				"value" : "someAuthToken"
			}, {
				"name" : "validForNoSeconds",
				"value" : "278"
			} ],
			"name" : "authToken"
		}, 
		"actionLinks" : {
			"delete" : {
				"requestMethod" : "DELETE",
				"rel" : "delete",
				"url" : "http://epc.ub.uu.se/login/rest/apptoken/131313"
			}
		}
	};
	let answer = {
		status : 201,
		responseText : JSON.stringify(tokenAnswer)
	};
	loadMethod(answer);
	let authInfo = this.getAuthInfo();
	assert.strictEqual(authInfo.userId, "someUserId");
	assert.strictEqual(authInfo.token, "someAuthToken");
	assert.strictEqual(authInfo.validForNoSeconds, "278");
	assert.stringifyEqual(authInfo.actionLinks, tokenAnswer.actionLinks);
});

QUnit.test("testGetError", function(assert) {
	let appTokenLogin = this.appTokenLogin;
	appTokenLogin.login("someUserId", "someAppToken");
	let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	let errorMethod = ajaxCallSpy0.getSpec().errorMethod;

	let answer = {
		status : 201,
		responseText : "error"
	};
	errorMethod(answer);
	let errorInfo = this.getErrorInfo();

	assert.strictEqual(errorInfo, answer);
});

QUnit.test("testGetTimeOut", function(assert) {
	let appTokenLogin = this.appTokenLogin;
	appTokenLogin.login("someUserId", "someAppToken");
	let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	let timeoutMethod = ajaxCallSpy0.getSpec().timeoutMethod;

	let answer = {
		status : 201,
		responseText : "timeout"
	};
	timeoutMethod(answer);
	let timeoutInfo = this.getTimeoutInfo();

	assert.strictEqual(timeoutInfo, answer);
});