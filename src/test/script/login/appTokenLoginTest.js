/*
 * Copyright 2017, 2025 Uppsala University Library
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

QUnit.module.only("login/appTokenLoginTest.js", hooks => {
	const test = QUnit.test;
	let ajaxCallFactorySpy;
	let dependencies;
	let spec;
	let authInfo;
	let errorInfo;
	let timeoutInfo;
	let appTokenLogin;

	hooks.beforeEach(() => {
		ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();

		dependencies = {
			ajaxCallFactory: ajaxCallFactorySpy
		};

		authInfo = {};
		errorInfo = {};
		timeoutInfo = {};

		spec = {
			requestMethod: "POST",
			url: "http://localhost:8080/login/rest/apptoken",
			contentType: "application/vnd.uub.login",
			accept: "",
			authInfoCallback: function(authInfoIn) {
				authInfo = authInfoIn;
			},
			errorCallback: function(error) {
				errorInfo = error;
			},
			timeoutCallback: function(timeout) {
				timeoutInfo = timeout;
			}
		};

		appTokenLogin = CORA.appTokenLogin(dependencies, spec);
	});

	hooks.afterEach(() => {
		//no after
	});

	const assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy) {
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, "http://localhost:8080/login/"
			+ "rest/apptoken");
		assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
		assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.login");
		assert.strictEqual(ajaxCallSpec.accept, "");
		assert.strictEqual(ajaxCallSpec.loadMethod, appTokenLogin.handleResponse);
		assert.strictEqual(ajaxCallSpec.data, "someLoginId\nsomeAppToken");
	};

	test("init", function(assert) {
		assert.ok(appTokenLogin);
		assert.strictEqual(appTokenLogin.type, "appTokenLogin");
	});

	test("getDependencies", function(assert) {
		assert.ok(appTokenLogin);
		assert.strictEqual(appTokenLogin.getDependencies(), dependencies);
	});

	test("getSpec", function(assert) {
		assert.ok(appTokenLogin);
		assert.strictEqual(appTokenLogin.getSpec(), spec);
	});

	test("testUpload", function(assert) {
		appTokenLogin.login("someLoginId", "someAppToken");

		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(0);
		assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);
	});

	test("testGetAuthTokenForAppToken", function(assert) {
		appTokenLogin.login("someLoginId", "someAppToken");

		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(0);
		let loadMethod = ajaxCallSpy0.getSpec().loadMethod;

		let tokenAnswer = {
			data: {
				children: [{
					name: "token",
					value: "someAuthToken"
				}, {
					name: "validUntil",
					value: "1736780585864"
				}, {
					name: "renewUntil",
					value: "1736866385864"
				}, {
					name: "userId",
					value: "someUserId"
				}, {
					name: "loginId",
					value: "someLoginId"
				}, {
					name: "firstName",
					value: "someFirstName"
				}, {
					name: "lastName",
					value: "someLastName"
				}
				],
				name: "authToken"
			},
			actionLinks: {
				renew: {
					requestMethod: "POST",
					rel: "renew",
					url: "http://localhost:38180/login/rest/authToken/someTokenId",
					accept: "application/vnd.uub.authToken+json"
				},
				delete: {
					requestMethod: "DELETE",
					rel: "delete",
					url: "http://localhost:38180/login/rest/authToken/someTokenId"
				}
			}
		};

		let answer = {
			status: 201,
			responseText: JSON.stringify(tokenAnswer)
		};
		loadMethod(answer);
		assert.strictEqual(authInfo.token, "someAuthToken");
		assert.strictEqual(authInfo.validUntil, "1736780585864");
		assert.strictEqual(authInfo.renewUntil, "1736866385864");
		assert.strictEqual(authInfo.userId, "someUserId");
		assert.strictEqual(authInfo.loginId, "someLoginId");
		assert.strictEqual(authInfo.firstName, "someFirstName");
		assert.strictEqual(authInfo.lastName, "someLastName");
		assert.stringifyEqual(authInfo.actionLinks, tokenAnswer.actionLinks);
	});

	test("testGetError", function(assert) {
		appTokenLogin.login("someUserId", "someAppToken");
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(0);
		let errorMethod = ajaxCallSpy0.getSpec().errorMethod;

		let answer = {
			status: 201,
			responseText: "error"
		};
		errorMethod(answer);

		assert.strictEqual(errorInfo, answer);
	});

	test("testGetTimeOut", function(assert) {
		appTokenLogin.login("someUserId", "someAppToken");
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(0);
		let timeoutMethod = ajaxCallSpy0.getSpec().timeoutMethod;

		let answer = {
			status: 201,
			responseText: "timeout"
		};
		timeoutMethod(answer);

		assert.strictEqual(timeoutInfo, answer);
	});
});