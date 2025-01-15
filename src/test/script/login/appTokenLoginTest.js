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

QUnit.module("login/appTokenLoginTest.js", hooks => {
	const test = QUnit.test;
	let ajaxCallFactorySpy;
	let dependencies;
	let spec;
	let appTokenLogin;

	hooks.beforeEach(() => {
		ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();

		dependencies = {
			ajaxCallFactory: ajaxCallFactorySpy
		};

		spec = {
			requestMethod: "POST",
			url: "http://localhost:8080/login/rest/apptoken",
			contentType: "application/vnd.uub.login",
			accept: "",
			loadMethod: function() {
				//empty test method
			},
			errorCallback: function() {
				//empty test method
			},
			timeoutCallback: function() {
				//empty test method
			}
		};

		appTokenLogin = CORA.appTokenLogin(dependencies, spec);
	});

	hooks.afterEach(() => {
		//no after
	});

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

	const assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy) {
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, "http://localhost:8080/login/"
			+ "rest/apptoken");
		assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
		assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.login");
		assert.strictEqual(ajaxCallSpec.accept, "");
		assert.strictEqual(ajaxCallSpec.loadMethod, spec.loadMethod);
		assert.strictEqual(ajaxCallSpec.errorMethod, spec.errorCallback);
		assert.strictEqual(ajaxCallSpec.timeoutMethod, spec.timeoutCallback);
		assert.strictEqual(ajaxCallSpec.data, "someLoginId\nsomeAppToken");
	};
});