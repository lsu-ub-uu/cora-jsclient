/*
 * Copyright 2019 Uppsala University Library
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

QUnit.module("login/passwordLoginTest.js", {
	beforeEach : function() {
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		let textProvider = CORATEST.textProviderStub();
			
		let dependencies = {
			ajaxCallFactory : this.ajaxCallFactorySpy,
			recordGuiFactory : CORATEST.standardFactorySpy("recordGuiSpy"),
			passwordLoginViewFactory : CORATEST.standardFactorySpy("passwordLoginViewSpy"),
			textProvider : textProvider
		};
		this.dependencies = dependencies;
	
		let jsClient = {
			showView : function() {
			},
			addGlobalView : function() {
			}
		}

		let spec = {
				metadataId : "someMetadataGroup",
				presentationId :"somePGroup",
//				jsClient: spec.jsClient,
//				requestMethod: "POST",
//				url: spec.appTokenBaseUrl + "login/rest/password/",
//				accept: "application/vnd.uub.record+json",
//				authInfoCallback: authInfoCallback,
//				errorCallback: passwordErrorCallback,
//				timeoutCallback: passwordTimeoutCallback
		};
		this.spec = spec;

		this.passwordLogin = CORA.passwordLogin(dependencies, spec);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.passwordLogin.type, "passwordLogin");
});

QUnit.test("testGetDependencies", function(assert) {
	assert.strictEqual(this.passwordLogin.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	assert.strictEqual(this.passwordLogin.getSpec(), this.spec);
});

QUnit.test("testInitViewCreatedUsingFactory", function(assert) {
	let factoredView = this.dependencies.passwordLoginViewFactory.getFactored(0);
	assert.strictEqual(factoredView.type, "passwordLoginViewSpy");
	
	let spec = this.dependencies.passwordLoginViewFactory.getSpec(0);
	assert.strictEqual(spec.loginMethod, this.passwordLogin.login);
	
});

QUnit.test("testGetView", function(assert) {
	let factoredView = this.dependencies.passwordLoginViewFactory.getFactored(0);
	assert.strictEqual(this.passwordLogin.getView(), factoredView.getView());
});


QUnit.test("testInitRecordGuiFactoryCalled", function(assert) {
	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "someMetadataGroup");
	let emptyPermissions = {
				write: [],
				read: []
			};
	assert.deepEqual(factoredSpec.permissions, emptyPermissions);
});

QUnit.test("testInitRecordGuiGetPresentationCalled", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getPresentationIdUsed(0), "somePGroup");
	assert.strictEqual(factoredGui.getMetadataIdsUsedInData(0), "someMetadataGroup");
});

QUnit.test("testInitRecordGuiGetPresentationAddedToFormView", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(this.dependencies.passwordLoginViewFactory.getFactored(0)
			.getPresentationsAddedToLoginForm(0), factoredGui.getReturnedPresentations(0)
			.getView());
});

QUnit.test("testInitRecordGuiStartedGui", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getInitCalled(), 1);
});

//QUnit.test("testLoginMethod", function(assert) {
//	assert.strictEqual(this.passwordLogin.login, this.dependencies);
//});