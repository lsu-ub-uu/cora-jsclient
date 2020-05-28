/*
 * Copyright 2017 Uppsala University Library
 * Copyright 2017 Olov McKie
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

QUnit.module("search/resultHandlerViewTest.js", {
	beforeEach : function() {
		this.dependencies = {
		};
		this.spec = {
			"ofText" : "av",
			"fromNo" : "1",
			"toNo" : "15",
			"totalNo" : "1520000",
			"resultHandler" : CORATEST.resultHandlerSpy()
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	assert.strictEqual(resultHandlerView.type, "resultHandlerView");
});

QUnit.test("testGetDependencies", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	assert.strictEqual(resultHandlerView.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	assert.strictEqual(resultHandlerView.getSpec(), this.spec);
});

QUnit.test("testGetView", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	var view = resultHandlerView.getView();
	assert.strictEqual(view.nodeName, "SPAN");
	assert.strictEqual(view.className, "resultHolder");
});

QUnit.test("testInfoPartOfView", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	var infoHolder = resultHandlerView.getView().firstChild;
	assert.strictEqual(infoHolder.nodeName, "SPAN");
	assert.strictEqual(infoHolder.className, "infoHolder");
});

QUnit.test("testInfoPartContainsInfo", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	var infoHolder = resultHandlerView.getView().firstChild;
	assert.strictEqual(infoHolder.textContent, "1 - 15 av 1520000");
});

QUnit.test("testResultsPartOfView", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	var resultsHolder = resultHandlerView.getView().childNodes[1];
	assert.strictEqual(resultsHolder.nodeName, "SPAN");
	assert.strictEqual(resultsHolder.className, "resultsHolder");
});

QUnit.test("testAddChildPresentation", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	var resultsHolder = resultHandlerView.getView().childNodes[1];
	var childToAdd = document.createElement("span");
	resultHandlerView.addChildPresentation(childToAdd);
	assert.strictEqual(resultsHolder.firstChild.firstChild, childToAdd);
});

QUnit.test("testAddChildPresentationClickable", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	var resultsHolder = resultHandlerView.getView().childNodes[1];
	var childToAdd = document.createElement("span");
	var record = {};
	resultHandlerView.addChildPresentation(childToAdd, record);

	var firstListItem = resultsHolder.firstChild;
	var event = document.createEvent('Event');
	firstListItem.onclick(event);

	var firstOpenInfo = this.spec.resultHandler.getOpenedRecord(0);
	assert.strictEqual(firstOpenInfo.record, record);
	assert.strictEqual(firstOpenInfo.loadInBackground, "false");
});

QUnit.test("testAddChildPresentationClickableLoadInBackground", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	var resultsHolder = resultHandlerView.getView().childNodes[1];
	var childToAdd = document.createElement("span");
	var record = {};
	resultHandlerView.addChildPresentation(childToAdd, record);

	var firstListItem = resultsHolder.firstChild;
	var event = document.createEvent('Event');
	event.ctrlKey = true;
	firstListItem.onclick(event);

	var firstOpenInfo = this.spec.resultHandler.getOpenedRecord(0);
	assert.strictEqual(firstOpenInfo.record, record);
	assert.strictEqual(firstOpenInfo.loadInBackground, "true");
});

QUnit.test("addButton", function(assert) {
	var resultHandlerView = CORA.resultHandlerView(this.dependencies, this.spec);
	var resultsHolder = resultHandlerView.getView().childNodes[1];
	var clicked = false;
	var onclickMethod = function() {
		clicked = true;
	};
	resultHandlerView.addButton("text", onclickMethod, "indexButton");

	var button = resultsHolder.childNodes[0];
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.value, "text");
	assert.strictEqual(button.onclick, onclickMethod);
	assert.strictEqual(button.className, "indexButton");
});

