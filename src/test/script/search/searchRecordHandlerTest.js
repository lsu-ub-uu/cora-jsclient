/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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

QUnit.module("search/searchRecordHandlerTest.js", {
	beforeEach : function() {
		this.search = CORATEST.searchRecordList.dataList.data[0].record;

		this.dependencies = {
			"searchRecordHandlerViewFactory" : CORATEST
					.standardFactorySpy("searchRecordHandlerViewSpy"),
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
			"jsClient" : CORATEST.jsClientSpy(),
			"searchHandlerJSClientIntegratorFactory" : CORATEST.standardFactorySpy("searchHandlerJsClientIntegratorSpy"),
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.spec = {
			"searchRecord" : this.search,
			"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
		};
	},
	afterEach : function() { 
	}
});

QUnit.test("init", function(assert) {
	let searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	assert.strictEqual(searchRecordHandler.type, "searchRecordHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	let searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	assert.strictEqual(searchRecordHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	assert.strictEqual(searchRecordHandler.getSpec(), this.spec);
});

QUnit.test("testViewIsCreatedUsingFactory", function(assert) {
	let searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	let factoredView = this.dependencies.searchRecordHandlerViewFactory.getFactored(0);
	assert.strictEqual(searchRecordHandler.getView(), factoredView.getView());
});

QUnit.test("testViewSpec", function(assert) {
	let searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	let factoredSpec = this.dependencies.searchRecordHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.headerText, "translated_coraTextSearchText");
	assert.strictEqual(factoredSpec.openSearchMethod, searchRecordHandler.openSearch);
});
QUnit.test("testHeaderWhenNoText", function(assert) {
	this.spec.searchRecord = CORATEST.searchRecordList.dataList.data[1].record;
	let searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	let factoredSpec = this.dependencies.searchRecordHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.headerText, "someSearch");
	assert.strictEqual(factoredSpec.openSearchMethod, searchRecordHandler.openSearch);
});

QUnit.test("testAddManagedGuiItemPassedOnToView", function(assert) {
	let searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	let factoredView = this.dependencies.searchRecordHandlerViewFactory.getFactored(0);
	let aItem = CORATEST.managedGuiItemSpy();
	searchRecordHandler.addManagedGuiItem(aItem);
	assert.strictEqual(factoredView.getAddedManagedGuiItem(0), aItem);
});

QUnit.test("testOpenSearchFactorSearchHandler", function(assert) {
	let searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	searchRecordHandler.openSearch();
	let factoredSpec = this.dependencies.searchHandlerJSClientIntegratorFactory.getSpec(0);

	assert.strictEqual(factoredSpec.headerText, "translated_coraTextSearchText");
	assert.strictEqual(factoredSpec.metadataId, "autocompleteSearchGroup");
	assert.strictEqual(factoredSpec.presentationId, "autocompleteSearchPGroup");
	assert.strictEqual(factoredSpec.searchLink, this.search.actionLinks.search);
});
