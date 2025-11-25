/*
 * Copyright 2016 Olov McKie
 * Copyright 2025 Uppsala University Library
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

QUnit.module("gui/workItemViewTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let workItemViewSpec;
	let workItemView;
	let view;

	hooks.beforeEach(() => {
		dependencies = {
			holderFactory: CORATEST.standardFactorySpy("holderSpy")
		};

		workItemViewSpec = {
			extraClassName: "extraClassName"
		};
		workItemView = CORA.workItemView(dependencies, workItemViewSpec);
		view = workItemView.getView();
	});
	hooks.afterEach(() => {

	});


	test("testInit", function(assert) {
		assert.strictEqual(workItemView.type, "workItemView");
	});

	test("getDependencies", function(assert) {
		assert.strictEqual(workItemView.getDependencies(), dependencies);
	});

	test("getSpec", function(assert) {
		assert.strictEqual(workItemView.getSpec(), workItemViewSpec);
	});

	test("init", function(assert) {
		assert.strictEqual(view.nodeName, "SPAN");
		assert.strictEqual(view.className, "workItem extraClassName");

		assert.strictEqual(view.childNodes.length, 0);

		let factoredToolHolderSpec = dependencies.holderFactory.getSpec(0);
		assert.strictEqual(factoredToolHolderSpec, undefined);
	});

	test("addToolViewToToolHolderMakeSureTopBarAndToolHolderExists", function(assert) {
		let someToolView = document.createElement("span");
		workItemView.addToolViewToToolHolder(someToolView);

		let topBar = view.childNodes[0];
		assert.strictEqual(topBar.nodeName, "SPAN");
		assert.strictEqual(topBar.className, "topBar");
		assert.strictEqual(topBar.childNodes.length, 1);

		let factoredToolHolderSpec = dependencies.holderFactory.getSpec(0);
		assert.strictEqual(factoredToolHolderSpec.className, "tool");
		assert.strictEqual(factoredToolHolderSpec.appendTo, undefined);
		assert.strictEqual(factoredToolHolderSpec.insertAfter, topBar);

		let toolHolderButton = dependencies.holderFactory.getFactored(0).getButton();
		assert.strictEqual(toolHolderButton, topBar.childNodes[0]);
	});

	test("addToolViewToToolHolderMakeSureTopBarAndToolHolderIsAddedFirst", function(assert) {
		let someToolView = document.createElement("span");
		let someView = document.createElement("span");
		workItemView.addViewToView(someView);

		workItemView.addToolViewToToolHolder(someToolView);

		let topBar = view.childNodes[0];
		assert.strictEqual(topBar.className, "topBar");
	});

	test("addToolViewToToolHolderMakeSureTopBarAndToolHolderIsCreatedOnce", function(assert) {
		let someToolView = document.createElement("span");
		workItemView.addToolViewToToolHolder(someToolView);

		let someToolView2 = document.createElement("span");
		workItemView.addToolViewToToolHolder(someToolView2);

		assert.strictEqual(view.childNodes.length, 1);

		let toolHolder = dependencies.holderFactory.getFactored(1);
		assert.strictEqual(toolHolder, undefined);
	});

	test("addToolViewToToolHolder", function(assert) {
		let someToolView = document.createElement("span");
		workItemView.addToolViewToToolHolder(someToolView);

		let toolHolder = dependencies.holderFactory.getFactored(0).getView();
		assert.strictEqual(toolHolder.childNodes.length, 1);
		assert.strictEqual(toolHolder.childNodes[0], someToolView);
	});

	test("addToolViewToToolHolder_thenRemoveIt", function(assert) {
		let someToolView = document.createElement("span");
		workItemView.addToolViewToToolHolder(someToolView);

		let toolHolder = dependencies.holderFactory.getFactored(0).getView();
		assert.strictEqual(toolHolder.childNodes.length, 1);
		assert.strictEqual(toolHolder.childNodes[0], someToolView);
		
		workItemView.removeToolViewFromToolHolder(someToolView);
		assert.strictEqual(toolHolder.childNodes.length, 0);
	});

	test("addViewToView", function(assert) {
		let someView = document.createElement("span");
		workItemView.addViewToView(someView);

		assert.strictEqual(view.childNodes.length, 1);
		assert.strictEqual(view.childNodes[0], someView);
	});
});
