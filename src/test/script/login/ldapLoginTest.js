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

QUnit.module("login/ldapLoginTest.js", {
	beforeEach : function() {
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		var textProvider = CORATEST.textProviderStub();
		var dependencies = {
			"ldapLoginViewFactory" : CORATEST.standardFactorySpy("ldapLoginViewSpy"),
				
			"ajaxCallFactory" : this.ajaxCallFactorySpy,
			"textProvider" : textProvider,
			"recordGuiFactory" : CORATEST.standardFactorySpy("recordGuiSpy")
		};
		this.dependencies = dependencies;

		var jsClient = {
			showView : function() {
			},
			addGlobalView : function() {
			}
		}

		var spec = {
				"metadataId" : "someMetadataGroup",
				"presentationId" :"somePGroup"
		};
		this.spec = spec;

		this.ldapLogin = CORA.ldapLogin(dependencies, spec);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.ldapLogin.type, "ldapLogin");
});

QUnit.test("testGetDependencies", function(assert) {
	assert.strictEqual(this.ldapLogin.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	assert.strictEqual(this.ldapLogin.getSpec(), this.spec);
});

QUnit.test("testInitViewCreatedUsingFactory", function(assert) {
	var factoredView = this.dependencies.ldapLoginViewFactory.getFactored(0);
	assert.strictEqual(factoredView.type, "ldapLoginViewSpy");
});

//QUnit.test("testInitViewSpec", function(assert) {
//	var factoredSpec = this.dependencies.ldapLoginViewFactory.getSpec(0);
//	assert.strictEqual(factoredSpec.textProvider, this.dependencies.textProvider);
//});

QUnit.test("testGetView", function(assert) {
	var factoredView = this.dependencies.ldapLoginViewFactory.getFactored(0);
	assert.strictEqual(this.ldapLogin.getView(), factoredView.getView());
});


QUnit.test("testInitRecordGuiFactoryCalled", function(assert) {
	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "someMetadataGroup");
});

QUnit.test("testInitRecordGuiGetPresentationCalled", function(assert) {
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getPresentationIdUsed(0), "somePGroup");
	assert.strictEqual(factoredGui.getMetadataIdsUsedInData(0), "someMetadataGroup");
});

QUnit.test("testInitRecordGuiGetPresentationAddedToFormView", function(assert) {
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(this.dependencies.ldapLoginViewFactory.getFactored(0)
			.getPresentationsAddedToLoginForm(0), factoredGui.getReturnedPresentations(0)
			.getView());
});


QUnit.test("testInitRecordGuiStartedGui", function(assert) {
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getInitCalled(), 1);
});