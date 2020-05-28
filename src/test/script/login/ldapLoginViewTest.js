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

QUnit.module("login/ldapLoginViewTest.js", {
	beforeEach : function() {
		var dependencies = {
			"workItemViewFactory" : CORATEST.standardFactorySpy("workItemViewSpy"),
			"messageHolderFactory" : CORATEST.standardFactorySpy("messageHolderSpy"),
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.dependencies = dependencies;
		this.ldapLoginView = CORA.ldapLoginView(dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.ldapLoginView.type, "ldapLoginView");
});

QUnit.test("testGetDependencies", function(assert) {
	assert.strictEqual(this.ldapLoginView.getDependencies(), this.dependencies);
});

QUnit.test("testInitFactoredWorkItemViewSpec", function(assert) {
	var factoredSpec = this.dependencies.workItemViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.extraClassName, "ldapLogin");
});

QUnit.test("testInitViewIsFactoredWorkItemView", function(assert) {
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0).getView();
	var view = this.ldapLoginView.getView();

	assert.strictEqual(view, factoredWorkItemView);
});

QUnit.test("testInitLoginFormHolderCreated", function(assert) {
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var loginFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	assert.strictEqual(loginFormHolder.nodeName, "SPAN");
	assert.strictEqual(loginFormHolder.className, "loginFormHolder");
});

QUnit.test("testAddPresentationToLoginFormHolder", function(assert) {
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var loginFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	assert.strictEqual(loginFormHolder.childNodes.length, 0);

	var aPresentation = CORA.gui.createSpanWithClassName("some");
	this.ldapLoginView.addPresentationToLoginFormHolder(aPresentation);
	assert.strictEqual(loginFormHolder.childNodes.length, 1);
	assert.strictEqual(loginFormHolder.firstChild, aPresentation);
});
