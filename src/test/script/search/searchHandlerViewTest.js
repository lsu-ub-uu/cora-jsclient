/*
 * Copyright 2017, 2019 Uppsala University Library
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

QUnit.module("search/searchHandlerViewTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"workItemViewFactory" : CORATEST.standardFactorySpy("workItemViewSpy"),
			"messageHolderFactory" : CORATEST.standardFactorySpy("messageHolderSpy"),
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.spec = {
			"searchMethod" : function() {
			}
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	assert.strictEqual(searchHandlerView.type, "searchHandlerView");
});

QUnit.test("testGetDependencies", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	assert.strictEqual(searchHandlerView.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	assert.strictEqual(searchHandlerView.getSpec(), this.spec);
});

QUnit.test("testInitFactoredWorkItemViewSpec", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredSpec = this.dependencies.workItemViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.extraClassName, "search");
});

QUnit.test("testInitViewIsFactoredWorkItemView", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0).getView();
	var view = searchHandlerView.getView();

	assert.strictEqual(view, factoredWorkItemView);
});

QUnit.test("testInitSearchFormHolderCreated", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	assert.strictEqual(searchFormHolder.nodeName, "SPAN");
	assert.strictEqual(searchFormHolder.className, "searchFormHolder");
});

QUnit.test("testInitButtonViewCreatedAndAddedToFormHolder", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	var buttonView = searchFormHolder.lastChild;
	assert.strictEqual(buttonView.nodeName, "SPAN");
	assert.strictEqual(buttonView.className, "buttonView");
});

QUnit.test("testInitSearchButtonCreatedAndAddedButtonView", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	var buttonView = searchFormHolder.lastChild;
	var searchButton = buttonView.lastChild;
	assert.strictEqual(searchButton.nodeName, "INPUT");
	assert.strictEqual(searchButton.type, "button");
	assert.strictEqual(searchButton.value, this.dependencies.textProvider
			.getTranslation("theClient_searchButtonText"));
	assert.strictEqual(searchButton.className, "searchButton");

	assert.strictEqual(searchButton.modelObject.getSpec().action.method, this.spec.searchMethod);

});

QUnit.test("testInitResultViewCreatedAndAddedToWorkItemView", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchResultHolder = factoredWorkItemView.getViewsAddedToView(1);
	assert.strictEqual(searchResultHolder.nodeName, "SPAN");
	assert.strictEqual(searchResultHolder.className, "searchResultHolder");
});

QUnit.test("testAddPresentationToSearchFormHolder", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	assert.strictEqual(searchFormHolder.childNodes.length, 1);

	var aPresentation = CORA.gui.createSpanWithClassName("some");
	searchHandlerView.addPresentationToSearchFormHolder(aPresentation);
	assert.strictEqual(searchFormHolder.childNodes.length, 2);
	assert.strictEqual(searchFormHolder.firstChild, aPresentation);
});

QUnit.test("testAddSearchResultToSearchResultHolder", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchResultHolder = factoredWorkItemView.getViewsAddedToView(1);
	assert.strictEqual(searchResultHolder.childNodes.length, 0);

	var aResult = CORA.gui.createSpanWithClassName("some");
	searchHandlerView.addSearchResultToSearchResultHolder(aResult);
	assert.strictEqual(searchResultHolder.childNodes.length, 1);
	assert.strictEqual(searchResultHolder.firstChild, aResult);
});

QUnit.test("testClearResultHolder", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchResultHolder = factoredWorkItemView.getViewsAddedToView(1);
	assert.strictEqual(searchResultHolder.childNodes.length, 0);
	
	var aResult = CORA.gui.createSpanWithClassName("some");
	searchHandlerView.addSearchResultToSearchResultHolder(aResult);
	assert.strictEqual(searchResultHolder.childNodes.length, 1);
	assert.strictEqual(searchResultHolder.firstChild, aResult);
	
	searchHandlerView.clearResultHolder();
	assert.strictEqual(searchResultHolder.childNodes.length, 0);
});

QUnit.test("testClearResultHolderTwoResults", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies, this.spec);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchResultHolder = factoredWorkItemView.getViewsAddedToView(1);
	assert.strictEqual(searchResultHolder.childNodes.length, 0);
	
	var aResult = CORA.gui.createSpanWithClassName("some");
	searchHandlerView.addSearchResultToSearchResultHolder(aResult);
	assert.strictEqual(searchResultHolder.childNodes.length, 1);
	assert.strictEqual(searchResultHolder.firstChild, aResult);
	
	var aResult2 = CORA.gui.createSpanWithClassName("other");
	searchHandlerView.addSearchResultToSearchResultHolder(aResult2);
	assert.strictEqual(searchResultHolder.childNodes.length, 2);
	assert.strictEqual(searchResultHolder.childNodes[1], aResult2);
	
	searchHandlerView.clearResultHolder();
	assert.strictEqual(searchResultHolder.childNodes.length, 0);
});
