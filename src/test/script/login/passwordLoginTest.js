/*
 * Copyright 2019, 2024, 2025 Uppsala University Library
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

QUnit.module("login/passwordLoginTest.js", hooks => {
	const test = QUnit.test;
	let ajaxCallFactorySpy;
	let assertAjaxCallSpecIsCorrect;
	let dependencies;
	let spec;
	let errorInfo;
	let timeoutInfo;
	let passwordLogin;
	let loginData;

	hooks.beforeEach(() => {
		ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();

		dependencies = {
			ajaxCallFactory: ajaxCallFactorySpy,
			recordGuiFactory: CORATEST.standardFactorySpy("recordGuiSpy"),
			passwordLoginViewFactory: CORATEST.standardFactorySpy("passwordLoginViewSpy"),
			textProvider: CORATEST.textProviderStub()
		};

		errorInfo = {};
		timeoutInfo = {};

		spec = {
			metadataId: "someMetadataGroup",
			presentationId: "somePGroup",
			requestMethod: "POST",
			url: "someAppTokenBaseUrl/login/rest/password",
			contentType: "application/vnd.uub.login",
			accept: "application/vnd.uub.record+json",
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

		passwordLogin = CORA.passwordLogin(dependencies, spec);

		assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy) {
			let ajaxCallSpec = ajaxCallSpy.getSpec();
			assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
			assert.strictEqual(ajaxCallSpec.url, spec.url);
			assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.login");
			assert.strictEqual(ajaxCallSpec.accept, spec.accept);
			assert.strictEqual(ajaxCallSpec.loadMethod, spec.loadMethod);
			assert.strictEqual(ajaxCallSpec.errorMethod, spec.errorCallback);
			assert.strictEqual(ajaxCallSpec.timeoutMethod, spec.timeoutCallback);
			assert.strictEqual(ajaxCallSpec.timeoutInMS, 15000);
			assert.strictEqual(ajaxCallSpec.data, "someLoginId\nsomePassword");
		};
		loginData = {
			name: "password",
			children: [
				{
					name: "loginId",
					value: "someLoginId"
				},
				{
					name: "password",
					value: "somePassword"
				}
			]
		};
	});

	hooks.afterEach(() => {
		//no after
	});

	test("testInit", function(assert) {
		assert.strictEqual(passwordLogin.type, "passwordLogin");
	});

	test("testGetDependencies", function(assert) {
		assert.strictEqual(passwordLogin.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		assert.strictEqual(passwordLogin.getSpec(), spec);
	});

	test("testInitViewCreatedUsingFactory", function(assert) {
		let factoredView = dependencies.passwordLoginViewFactory.getFactored(0);
		assert.strictEqual(factoredView.type, "passwordLoginViewSpy");

		let spec = dependencies.passwordLoginViewFactory.getSpec(0);
		assert.strictEqual(spec.loginMethod, passwordLogin.login);
	});

	test("testGetView", function(assert) {
		let factoredView = dependencies.passwordLoginViewFactory.getFactored(0);
		assert.strictEqual(passwordLogin.getView(), factoredView.getView());
	});

	test("testInitRecordGuiFactoryCalled", function(assert) {
		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "someMetadataGroup");
		let emptyPermissions = {
			write: [],
			read: []
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("testInitRecordGuiGetPresentationCalled", function(assert) {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(factoredGui.getPresentationIdUsed(0), "somePGroup");
		assert.strictEqual(factoredGui.getMetadataIdsUsedInData(0), "someMetadataGroup");
	});

	test("testInitRecordGuiGetPresentationAddedToFormView", function(assert) {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(dependencies.passwordLoginViewFactory.getFactored(0)
			.getPresentationsAddedToLoginForm(0), factoredGui.getReturnedPresentations(0)
				.getView());
	});

	test("testInitRecordGuiStartedGui", function(assert) {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(factoredGui.getInitCalled(), 1);
	});

	test("testLoginSendsRequest", function(assert) {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		let dataHolderSpy = factoredGui.dataHolder;
		dataHolderSpy.setData(loginData);

		passwordLogin.login();

		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(0);
		assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);
	});
});
