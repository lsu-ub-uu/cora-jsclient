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

QUnit.module("login/passwordLoginJsClientIntegratorTest.js", {
	beforeEach: function() {
		this.dependencies = {
			passwordLoginFactory: CORATEST.standardFactorySpy("passwordLoginSpy"),
			managedGuiItemFactory: CORATEST.standardFactorySpy("managedGuiItemSpy")
		}
		this.spec = {
			metadataId: "someMetadataGroup",
			presentationId: "somePresentationGroup",
			jsClient: CORATEST.jsClientSpy()
		}
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
		this.dependencies, this.spec);
	assert.strictEqual(jsClientIntegrator.type,
		"passwordLoginJsClientIntegrator");
});

QUnit.test("testGetDependencies",
	function(assert) {
		let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
			this.dependencies, this.spec);
		assert.strictEqual(jsClientIntegrator.getDependencies(),
			this.dependencies);
	});

QUnit.test("testGetSpec", function(assert) {
	let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
		this.dependencies, this.spec);
	assert.strictEqual(jsClientIntegrator.getSpec(), this.spec);
});

QUnit.test("testInitManagedGuiItemCreatedUsingFactory", function(assert) {
	let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
		this.dependencies, this.spec);
	let factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.type, "managedGuiItemSpy");
});

QUnit.test("testInitManagedGuiItemCreatedsSpec", function(assert) {
	let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
		this.dependencies, this.spec);
	let factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	let factoredItemSpec = this.dependencies.managedGuiItemFactory.getSpec(0);
	assert.strictEqual(factoredItemSpec.activateMethod,
		this.spec.jsClient.showView);
	assert.strictEqual(factoredItemSpec.removeMethod,
		this.spec.jsClient.viewRemoved);
});

QUnit.test("initTestManagedGuiItemShownInJsClientOnLoad", function(assert) {
	let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
		this.dependencies, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory
		.getFactored(0);
	assert.strictEqual(managedGuiItemSpy, this.spec.jsClient
		.getViewShowingInWorkView(0));
});

QUnit.test("testPasswordLoginCreatedUsingFactory", function(assert) {
	let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
		this.dependencies, this.spec);
	let factoredPasswordLogin = this.dependencies.passwordLoginFactory
		.getFactored(0);
	assert.strictEqual(factoredPasswordLogin.type, "passwordLoginSpy");
});

QUnit.test("testPasswordLoginSpec", function(assert) {
	let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
		this.dependencies, this.spec);
	let factoredSpec = this.dependencies.passwordLoginFactory.getSpec(0);
	assert.strictEqual(factoredSpec, this.spec);
});

QUnit.test("testPasswordLoginViewAddedToManagedGuiItemsWorkView", function(
	assert) {
	let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
		this.dependencies, this.spec);
	let factoredView = this.dependencies.passwordLoginFactory.getFactored(0)
		.getView();
	let factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.getAddedWorkPresentation(0), factoredView);
});

QUnit.test("testShowPasswordLoginInJsClient", function(assert) {
	let jsClientIntegrator = CORA.passwordLoginJsClientIntegrator(
		this.dependencies, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory
		.getFactored(0);
	assert.strictEqual(managedGuiItemSpy, this.spec.jsClient
		.getViewShowingInWorkView(0));
	jsClientIntegrator.showPasswordLoginInJsClient();
	assert.strictEqual(managedGuiItemSpy, this.spec.jsClient
		.getViewShowingInWorkView(1));
});