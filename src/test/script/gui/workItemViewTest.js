/*
 * Copyright 2016 Olov McKie
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

QUnit.module("workItemViewTest.js", {
	beforeEach : function() {
		// var factoredHolders = [];
		// this.factoredHolders = factoredHolders;
		// this.holderFactory = {
		// "factor" : function(holderSpec) {
		// var factoredHolder = CORA.holder(holderSpec);
		// factoredHolders.push({
		// "holderSpec" : holderSpec,
		// "factoredHolder" : factoredHolder
		// });
		// return factoredHolder;
		// }
		// };

		this.dependencies = {
			"holderFactory" : CORATEST.standardFactorySpy("holderSpy")
		};

		this.workItemViewSpec = {
			"extraClassName" : "extraClassName"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	assert.strictEqual(workItemView.type, "workItemView");
});

QUnit.test("getDependencies", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	assert.strictEqual(workItemView.getDependencies(), this.dependencies);
});

QUnit.test("getSpec", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	assert.strictEqual(workItemView.getSpec(), this.workItemViewSpec);
});

QUnit.test("init", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	var view = workItemView.getView();
	assert.strictEqual(view.nodeName, "SPAN");
	assert.strictEqual(view.className, "workItem extraClassName");

	assert.strictEqual(view.childNodes.length, 1);

	var topBar = view.childNodes[0];
	assert.strictEqual(topBar.nodeName, "SPAN");
	assert.strictEqual(topBar.className, "topBar");
	assert.strictEqual(topBar.childNodes.length, 1);

	var factoredToolHolderSpec = this.dependencies.holderFactory.getSpec(0);
	assert.strictEqual(factoredToolHolderSpec.className, "tool");
	assert.strictEqual(factoredToolHolderSpec.appendTo, view);
});

QUnit.test("addToolViewToToolHolder", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	var someToolView = document.createElement("span");
	workItemView.addToolViewToToolHolder(someToolView);

	var toolHolder = this.dependencies.holderFactory.getFactored(0).getView();
	assert.strictEqual(toolHolder.childNodes.length, 1);
	assert.strictEqual(toolHolder.childNodes[0], someToolView);
});

QUnit.test("addViewToView", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	var someView = document.createElement("span");
	workItemView.addViewToView(someView);

	var view = workItemView.getView();
	assert.strictEqual(view.childNodes.length, 2);
	assert.strictEqual(view.childNodes[1], someView);
});
