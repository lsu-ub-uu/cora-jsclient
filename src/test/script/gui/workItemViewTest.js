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

QUnit.module("gui/workItemViewTest.js", {
	beforeEach : function() {
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

	assert.strictEqual(view.childNodes.length, 0);

	var factoredToolHolderSpec = this.dependencies.holderFactory.getSpec(0);
	assert.strictEqual(factoredToolHolderSpec, undefined);
});

QUnit.test("addToolViewToToolHolderMakeSureTopBarAndToolHolderExists", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	var someToolView = document.createElement("span");
	var view = workItemView.getView();
	workItemView.addToolViewToToolHolder(someToolView);

	var topBar = view.childNodes[0];
	assert.strictEqual(topBar.nodeName, "SPAN");
	assert.strictEqual(topBar.className, "topBar");
	assert.strictEqual(topBar.childNodes.length, 1);

	var factoredToolHolderSpec = this.dependencies.holderFactory.getSpec(0);
	assert.strictEqual(factoredToolHolderSpec.className, "tool");
	assert.strictEqual(factoredToolHolderSpec.appendTo, undefined);
	assert.strictEqual(factoredToolHolderSpec.insertAfter, topBar);

	var toolHolderButton = this.dependencies.holderFactory.getFactored(0).getButton();
	assert.strictEqual(toolHolderButton, topBar.childNodes[0]);
});

QUnit.test("addToolViewToToolHolderMakeSureTopBarAndToolHolderIsAddedFirst", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	var someToolView = document.createElement("span");
	var view = workItemView.getView();
	var someView = document.createElement("span");
	workItemView.addViewToView(someView);

	workItemView.addToolViewToToolHolder(someToolView);

	var topBar = view.childNodes[0];
	assert.strictEqual(topBar.className, "topBar");
});

QUnit.test("addToolViewToToolHolderMakeSureTopBarAndToolHolderIsCreatedOnce", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	var someToolView = document.createElement("span");
	var view = workItemView.getView();
	workItemView.addToolViewToToolHolder(someToolView);

	var someToolView2 = document.createElement("span");
	workItemView.addToolViewToToolHolder(someToolView2);

	assert.strictEqual(view.childNodes.length, 1);

	var toolHolder = this.dependencies.holderFactory.getFactored(1);
	assert.strictEqual(toolHolder, undefined);
});

QUnit.test("addToolViewToToolHolder", function(assert) {
	var workItemView = CORA.workItemView(this.dependencies, this.workItemViewSpec);
	var someToolView = document.createElement("span");
	var view = workItemView.getView();
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
	assert.strictEqual(view.childNodes.length, 1);
	assert.strictEqual(view.childNodes[0], someView);
});
