/*
 * Copyright 2017 Uppsala University Library
 * Copyright 2017, 2021 Olov McKie
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

QUnit.module("search/resultHandlerViewTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let spec;
	let resultHandlerView;
	hooks.beforeEach(() => {
		dependencies = {
		};
		spec = {
			"ofText": "av",
			"fromNo": "1",
			"toNo": "15",
			"totalNo": "1520000",
			"resultHandler": CORATEST.resultHandlerSpy()
		};
		resultHandlerView = CORA.resultHandlerView(dependencies, spec);
	});
	hooks.afterEach(() => {
		//no after
	});

	test("testInit", function(assert) {
		assert.strictEqual(resultHandlerView.type, "resultHandlerView");
	});

	test("testGetDependencies", function(assert) {
		assert.strictEqual(resultHandlerView.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		assert.strictEqual(resultHandlerView.getSpec(), spec);
	});

	test("testGetView", function(assert) {
		let view = resultHandlerView.getView();
		assert.strictEqual(view.nodeName, "SPAN");
		assert.strictEqual(view.className, "resultHolder");
	});

	test("testInfoPartOfView", function(assert) {
		let infoHolder = resultHandlerView.getView().firstChild;
		assert.strictEqual(infoHolder.nodeName, "SPAN");
		assert.strictEqual(infoHolder.className, "infoHolder");
	});

	test("testInfoPartContainsInfo", function(assert) {
		let infoHolder = resultHandlerView.getView().firstChild;
		assert.strictEqual(infoHolder.textContent, "1 - 15 av 1520000");
	});

	test("testResultsPartOfView", function(assert) {
		let resultsHolder = resultHandlerView.getView().childNodes[1];
		assert.strictEqual(resultsHolder.nodeName, "SPAN");
		assert.strictEqual(resultsHolder.className, "resultsHolderPage");
	});

	test("testAddChildPresentation", function(assert) {
		let resultsHolder = resultHandlerView.getView().childNodes[1];
		let childToAdd = document.createElement("span");
		resultHandlerView.addChildPresentation(childToAdd);
		assert.strictEqual(resultsHolder.firstChild.firstChild, childToAdd);
	});

	test("testAddChildPresentationClickable", function(assert) {
		let resultsHolder = resultHandlerView.getView().childNodes[1];
		let childToAdd = document.createElement("span");
		let record = {};
		resultHandlerView.addChildPresentation(childToAdd, record);

		let firstListItem = resultsHolder.firstChild;
		let event = document.createEvent('Event');
		firstListItem.onclick(event);

		let firstOpenInfo = spec.resultHandler.getOpenedRecord(0);
		assert.strictEqual(firstOpenInfo.record, record);
		assert.strictEqual(firstOpenInfo.loadInBackground, "false");
	});

	test("testAddChildPresentationClickableLoadInBackground", function(assert) {
		let resultsHolder = resultHandlerView.getView().childNodes[1];
		let childToAdd = document.createElement("span");
		let record = {};
		resultHandlerView.addChildPresentation(childToAdd, record);

		let firstListItem = resultsHolder.firstChild;
		let event = document.createEvent('Event');
		event.ctrlKey = true;
		firstListItem.onclick(event);

		let firstOpenInfo = spec.resultHandler.getOpenedRecord(0);
		assert.strictEqual(firstOpenInfo.record, record);
		assert.strictEqual(firstOpenInfo.loadInBackground, "true");
	});

	test("addButton", function(assert) {
		let resultsHolder = resultHandlerView.getView().childNodes[1];
		let clicked = false;
		let onclickMethod = function() {
			clicked = true;
		};
		resultHandlerView.addButton("text", onclickMethod, "indexButton");

		let button = resultsHolder.childNodes[0];
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.value, "text");
		assert.strictEqual(button.onclick, onclickMethod);
		assert.strictEqual(button.className, "indexButton");
	});
});
