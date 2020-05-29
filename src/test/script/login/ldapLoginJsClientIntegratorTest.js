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

QUnit.module("login/ldapLoginJsClientIntegratorTest.js", {
	beforeEach: function() {
		this.dependencies = {
			"ldapLoginFactory": CORATEST
				.standardFactorySpy("ldapLoginSpy"),
			"managedGuiItemFactory": CORATEST
				.standardFactorySpy("managedGuiItemSpy")
		}
		this.spec = {
			"metadataId": "someMetadataGroup",
			"presentationId": "somePresentationGroup",
			"jsClient": CORATEST.jsClientSpy()
		}
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
		this.dependencies, this.spec);
	assert.strictEqual(jsClientIntegrator.type,
		"ldapLoginJsClientIntegrator");
});

QUnit.test("testGetDependencies",
	function(assert) {
		var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
			this.dependencies, this.spec);
		assert.strictEqual(jsClientIntegrator.getDependencies(),
			this.dependencies);
	});

QUnit.test("testGetSpec", function(assert) {
	var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
		this.dependencies, this.spec);
	assert.strictEqual(jsClientIntegrator.getSpec(), this.spec);
});

QUnit.test("testInitManagedGuiItemCreatedUsingFactory", function(assert) {
	var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
		this.dependencies, this.spec);
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.type, "managedGuiItemSpy");
});

QUnit.test("testInitManagedGuiItemCreatedsSpec", function(assert) {
	var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
		this.dependencies, this.spec);
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	var factoredItemSpec = this.dependencies.managedGuiItemFactory.getSpec(0);
	assert.strictEqual(factoredItemSpec.activateMethod,
		this.spec.jsClient.showView);
	assert.strictEqual(factoredItemSpec.removeMethod,
		this.spec.jsClient.viewRemoved);
});

QUnit.test("initTestManagedGuiItemShownInJsClientOnLoad", function(assert) {
	var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
		this.dependencies, this.spec);
	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory
		.getFactored(0);
	assert.strictEqual(managedGuiItemSpy, this.spec.jsClient
		.getViewShowingInWorkView(0));
});

QUnit.test("testLdapLoginCreatedUsingFactory", function(assert) {
	var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
		this.dependencies, this.spec);
	var factoredLdapLogin = this.dependencies.ldapLoginFactory
		.getFactored(0);
	assert.strictEqual(factoredLdapLogin.type, "ldapLoginSpy");
});

QUnit.test("testLdapLoginSpec", function(assert) {
	var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
		this.dependencies, this.spec);
	var factoredSpec = this.dependencies.ldapLoginFactory.getSpec(0);
	assert.strictEqual(factoredSpec, this.spec);
});

QUnit.test("testLdapLoginViewAddedToManagedGuiItemsWorkView", function(
	assert) {
	var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
		this.dependencies, this.spec);
	var factoredView = this.dependencies.ldapLoginFactory.getFactored(0)
		.getView();
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.getAddedWorkPresentation(0), factoredView);
});

QUnit.test("testShowLdapLoginInJsClient", function(assert) {
	var jsClientIntegrator = CORA.ldapLoginJsClientIntegrator(
		this.dependencies, this.spec);
	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory
		.getFactored(0);
	assert.strictEqual(managedGuiItemSpy, this.spec.jsClient
		.getViewShowingInWorkView(0));
	jsClientIntegrator.showLdapLoginInJsClient();
	assert.strictEqual(managedGuiItemSpy, this.spec.jsClient
		.getViewShowingInWorkView(1));
});