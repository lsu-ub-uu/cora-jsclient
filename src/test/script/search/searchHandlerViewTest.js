/*
 * Copyright 2017, 2019, 2021 Uppsala University Library
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

QUnit.module("search/searchHandlerViewTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let spec;
	let searchHandlerView;
	let searchResultHolder;
	let searchFormHolder;
	hooks.beforeEach(() => {
		setupDependencies();
		setupSpec();
		startResultHandler();
	});
	hooks.afterEach(() => {
		//no after
	});

	const setupDependencies = function() {
		dependencies = {
			workItemViewFactory: CORATEST.standardFactorySpy("workItemViewSpy"),
			messageHolderFactory: CORATEST.standardFactorySpy("messageHolderSpy"),
			busyFactory: CORATEST.standardFactorySpy("busySpy"),
			textProvider: CORATEST.textProviderSpy()
		};
	};

	const setupSpec = function() {
		spec = {
			searchMethod: function() {
				//nothing
			}
		}
	};

	const startResultHandler = function() {
		searchHandlerView = CORA.searchHandlerView(dependencies, spec);
		let factoredWorkItemView = dependencies.workItemViewFactory.getFactored(0);
		searchFormHolder = factoredWorkItemView.getViewsAddedToView(0);
		searchResultHolder = factoredWorkItemView.getViewsAddedToView(1);
	};

	test("testInit", function(assert) {
		assert.strictEqual(searchHandlerView.type, "searchHandlerView");
	});

	test("testGetDependencies", function(assert) {
		assert.strictEqual(searchHandlerView.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		assert.strictEqual(searchHandlerView.getSpec(), spec);
	});

	test("testInitFactoredWorkItemViewSpec", function(assert) {
		let factoredSpec = dependencies.workItemViewFactory.getSpec(0);
		assert.strictEqual(factoredSpec.extraClassName, "search");
	});

	test("testInitViewIsFactoredWorkItemView", function(assert) {
		let factoredWorkItemView = dependencies.workItemViewFactory.getFactored(0).getView();
		let view = searchHandlerView.getView();

		assert.strictEqual(view, factoredWorkItemView);
	});

	test("testInitBusyIsFactoredAtInit", function(assert) {
		let factoredBusy = dependencies.busyFactory.getFactored(0);
		assert.notStrictEqual(factoredBusy, undefined);
		assert.strictEqual(factoredBusy.getShowIsCalledNoOfTimes(), 1);
	});

	test("testSetSearchRunning", function(assert) {
		searchHandlerView.setSearchRunning();
		let factoredBusy = dependencies.busyFactory.getFactored(0);
		assert.strictEqual(factoredBusy.getShowIsCalledNoOfTimes(), 1);
		assert.strictEqual(searchResultHolder.childNodes[0], factoredBusy.getView());
	});

	test("testSetSearchRunningWithPreviousResult", function(assert) {
		let aResult = CORA.gui.createSpanWithClassName("aResult");
		searchHandlerView.addSearchResultToSearchResultHolder(aResult);

		assert.strictEqual(searchResultHolder.childNodes.length, 1);
		assert.strictEqual(searchResultHolder.firstChild, aResult);

		searchHandlerView.setSearchRunning();
		let factoredBusy = dependencies.busyFactory.getFactored(0);
		assert.strictEqual(searchResultHolder.childNodes[0], factoredBusy.getView());
	});

	test("testInitSearchFormHolderCreated", function(assert) {
		assert.strictEqual(searchFormHolder.nodeName, "SPAN");
		assert.strictEqual(searchFormHolder.className, "searchFormHolder");
	});

	test("testInitButtonViewCreatedAndAddedToFormHolder", function(assert) {
		let buttonView = searchFormHolder.lastChild;
		assert.strictEqual(buttonView.nodeName, "SPAN");
		assert.strictEqual(buttonView.className, "buttonView");
	});

	test("testInitSearchButtonCreatedAndAddedButtonView", function(assert) {
		let buttonView = searchFormHolder.lastChild;
		let searchButton = buttonView.lastChild;
		assert.strictEqual(searchButton.nodeName, "INPUT");
		assert.strictEqual(searchButton.type, "button");
		assert.strictEqual(searchButton.value, dependencies.textProvider
			.getTranslation("theClient_searchButtonText"));
		assert.strictEqual(searchButton.className, "searchButton");
		assert.strictEqual(searchButton.modelObject.getSpec().action.method, spec.searchMethod);
	});

	test("testInitResultViewCreatedAndAddedToWorkItemView", function(assert) {
		assert.strictEqual(searchResultHolder.nodeName, "SPAN");
		assert.strictEqual(searchResultHolder.className, "searchResultHolder");
		assert.strictEqual(searchResultHolder.children.length, 0);
	});

	test("testAddPresentationToSearchFormHolder", function(assert) {
		assertSearchFormHolderHasLength(assert, 1);
		let aFormPresentation = CORA.gui.createSpanWithClassName("some");

		searchHandlerView.addPresentationToSearchFormHolder(aFormPresentation);

		assertSearchFormHolderHasLength(assert, 2);
		assert.strictEqual(searchFormHolder.firstChild, aFormPresentation);
	});

	const assertSearchFormHolderHasLength = function(assert, length) {
		assert.strictEqual(searchFormHolder.childNodes.length, length);
	};

	test("testAddSearchResultToSearchResultHolder", function(assert) {
		let aResult = CORA.gui.createSpanWithClassName("some");
		assertSearchResultHolderHasLength(assert, 0);

		searchHandlerView.addSearchResultToSearchResultHolder(aResult);

		assertSearchResultHolderHasLength(assert, 1);
		assert.strictEqual(searchResultHolder.firstChild, aResult);
	});

	test("testAddTwoSearchResultToSearchResultHolder", function(assert) {
		let aResult = CORA.gui.createSpanWithClassName("some");
		let aResult2 = CORA.gui.createSpanWithClassName("other");
		assertSearchResultHolderHasLength(assert, 0);

		searchHandlerView.addSearchResultToSearchResultHolder(aResult);

		assertSearchResultHolderHasLength(assert, 1);
		assert.strictEqual(searchResultHolder.firstChild, aResult);

		searchHandlerView.addSearchResultToSearchResultHolder(aResult2);

		assertSearchResultHolderHasLength(assert, 2);
		assert.strictEqual(searchResultHolder.childNodes[1], aResult2);
	});

	const assertSearchResultHolderHasLength = function(assert, length) {
		assert.strictEqual(searchResultHolder.childNodes.length, length);
	};

	test("testClearResultHolder", function(assert) {
		let aResult = CORA.gui.createSpanWithClassName("some");
		searchHandlerView.addSearchResultToSearchResultHolder(aResult);

		searchHandlerView.clearResultHolder();

		assertSearchResultHolderHasLength(assert, 0);
	});

	test("testClearResultHolderTwoResults", function(assert) {
		let aResult = CORA.gui.createSpanWithClassName("some");
		let aResult2 = CORA.gui.createSpanWithClassName("other");
		searchHandlerView.addSearchResultToSearchResultHolder(aResult);
		searchHandlerView.addSearchResultToSearchResultHolder(aResult2);
		assertSearchResultHolderHasLength(assert, 2);

		searchHandlerView.clearResultHolder();

		assertSearchResultHolderHasLength(assert, 0);
	});
});
