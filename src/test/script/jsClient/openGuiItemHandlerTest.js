/*
 * Copyright 2016, 2017 Uppsala University Library
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

QUnit.module("jsClient/openGuiItemHandlerTest.js", {
	beforeEach : function() {
		this.search = CORATEST.searchRecordList.dataList.data[0].record;

		this.dependencies = {
			"openGuiItemHandlerViewFactory" : CORATEST
					.standardFactorySpy("openGuiItemHandlerViewSpy"),
			// "managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
			// "jsClient" : CORATEST.jsClientSpy(),
			// "searchHandlerFactory" : CORATEST.standardFactorySpy("searchHandlerSpy")
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.spec = {
		// "openGuiItem" : this.search,
		// "baseUrl" : "http://epc.ub.uu.se/cora/rest/"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	assert.strictEqual(openGuiItemHandler.type, "openGuiItemHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	assert.strictEqual(openGuiItemHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	assert.strictEqual(openGuiItemHandler.getSpec(), this.spec);
});

QUnit.test("testViewIsCreatedUsingFactory", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	assert.strictEqual(openGuiItemHandler.getView(), factoredView.getView());
});

QUnit.test("testViewSpec", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	var factoredSpec = this.dependencies.openGuiItemHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.headerText, this.dependencies.textProvider
			.getTranslation("theClient_openedText"));
	assert.strictEqual(factoredSpec.openSearchMethod, openGuiItemHandler.openSearch);
});

QUnit.test("testAddManagedGuiItemPassedOnToView", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	var aItem = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.addManagedGuiItem(aItem);
	assert.strictEqual(factoredView.getAddedManagedGuiItem(0), aItem);
});
//
// QUnit.test("testOpenSearchFactorSearchHandler", function(assert) {
// var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
// openGuiItemHandler.openSearch();
// var factoredSpec = this.dependencies.searchHandlerFactory.getSpec(0);
//
// assert.strictEqual(factoredSpec.addToopenGuiItemHandlerMethod,
// openGuiItemHandler.addManagedGuiItem);
// assert.strictEqual(factoredSpec.showViewMethod, this.dependencies.jsClient.showView);
// assert.strictEqual(factoredSpec.removeViewMethod, this.dependencies.jsClient.viewRemoved);
//
// assert.strictEqual(factoredSpec.metadataId, "autocompleteSearchGroup");
// assert.strictEqual(factoredSpec.presentationId, "autocompleteSearchPGroup");
// assert.strictEqual(factoredSpec.searchLink, this.search.actionLinks.search);
// });
