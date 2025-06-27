/*
 * Copyright 2019, 2024 Uppsala University Library
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

QUnit.module("login/passwordLoginViewTest.js", {
	beforeEach : function() {
		let dependencies = {
			workItemViewFactory : CORATEST.standardFactorySpy("workItemViewSpy"),
			messageHolderFactory : CORATEST.standardFactorySpy("messageHolderSpy"),
			textProvider : CORATEST.textProviderSpy()
		};
		this.dependencies = dependencies;
		this.numberOfCallsToLogin = 0;
		let login = function(){
			this.nuberOfCallsToLogin++;
		};
		let spec = {
			loginMethod: login
		};
		this.spec = spec;
		this.passwordLoginView = CORA.passwordLoginView(dependencies, spec);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.passwordLoginView.type, "passwordLoginView");
});

QUnit.test("testGetDependencies", function(assert) {
	assert.strictEqual(this.passwordLoginView.getDependencies(), this.dependencies);
});

QUnit.test("testInitFactoredWorkItemViewSpec", function(assert) {
	let factoredSpec = this.dependencies.workItemViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.extraClassName, "passwordLogin");
});

QUnit.test("testInitViewIsFactoredWorkItemView", function(assert) {
	let factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0).getView();
	let view = this.passwordLoginView.getView();

	assert.strictEqual(view, factoredWorkItemView);
});

QUnit.test("testInitLoginFormHolderCreated", function(assert) {
	let factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	let loginFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	assert.strictEqual(loginFormHolder.nodeName, "SPAN");
	assert.strictEqual(loginFormHolder.className, "loginFormHolder");
});

QUnit.test("testAddPresentationToLoginFormHolder", function(assert) {
	let factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	let loginFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	assert.strictEqual(loginFormHolder.childNodes.length, 0);

	let aPresentation = CORA.createSpanWithClassName("some");
	this.passwordLoginView.addPresentationToLoginFormHolder(aPresentation);
	assert.strictEqual(loginFormHolder.childNodes.length, 1);
	assert.strictEqual(loginFormHolder.firstChild, aPresentation);
});

QUnit.test("testInitButtonViewCreatedAndAddedToView", function(assert) {
	let factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	let buttonView = factoredWorkItemView.getViewsAddedToView(1);
	
	assert.strictEqual(buttonView.nodeName, "SPAN");
	assert.strictEqual(buttonView.className, "buttonView");
});

QUnit.test("testInitSearchButtonCreatedAndAddedButtonView", function(assert) {
	let factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	let buttonView = factoredWorkItemView.getViewsAddedToView(1);
	let loginButton = buttonView.lastChild;
	assert.strictEqual(loginButton.nodeName, "INPUT");
	assert.strictEqual(loginButton.type, "button");
	assert.strictEqual(loginButton.value, this.dependencies.textProvider
		.getTranslation("theClient_loginButtonText"));
	assert.strictEqual(loginButton.className, "loginButton");
	assert.strictEqual(loginButton.modelObject.getSpec().action.method, this.spec.loginMethod);
});

