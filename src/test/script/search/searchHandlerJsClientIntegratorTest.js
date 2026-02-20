/*
 * Copyright 2017 Uppsala University Library
 * Copyright 2017, 2023, 2024 Olov McKie
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
QUnit.module("search/searchHandlerJsClientIntegratorTest.js", {
	beforeEach : function() {
		this.dependencies = {
			searchHandlerFactory : CORATEST.standardFactorySpy("searchHandlerSpy"),
			managedGuiItemFactory : CORATEST.standardFactorySpy("managedGuiItemSpy"),
			jsClient : CORATEST.jsClientSpy()
		}
		this.spec = {
			headerText: "someHeaderTextFromSpec",
			metadataId : "someMetadataId",
			presentationId : "somePresentationId",
			searchLink : {
				requestMethod : "GET",
				rel : "search",
				url : "http://epc.ub.uu.se/cora/rest/record/searchResult/coraTextSearch",
				accept : "application/vnd.cora.recordList+json"
			}
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	assert.strictEqual(jsClientIntegrator.type,
			"searchHandlerJsClientIntegrator");
});

QUnit.test("testGetDependencies",
		function(assert) {
			let jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
					this.dependencies, this.spec);
			assert.strictEqual(jsClientIntegrator.getDependencies(),
					this.dependencies);
		});

QUnit.test("testGetSpec", function(assert) {
	let jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	assert.strictEqual(jsClientIntegrator.getSpec(), this.spec);
});

QUnit.test("testInitManagedGuiItemCreatedUsingFactory", function(assert) {
	CORA.searchHandlerJsClientIntegrator(this.dependencies, this.spec);
	let factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.type, "managedGuiItemSpy");
});

QUnit.test("testInitManagedGuiItemCreatedsSpec", function(assert) {
	CORA.searchHandlerJsClientIntegrator(this.dependencies, this.spec);
	let factoredItemSpec = this.dependencies.managedGuiItemFactory.getSpec(0);
	assert.strictEqual(factoredItemSpec.activateMethod,	this.dependencies.jsClient.showView);
	assert.strictEqual(factoredItemSpec.removeMethod, this.dependencies.jsClient.viewRemoved);
});

QUnit.test("testInitMenuViewAddedToManagedGuiItemsMenuView", function(assert) {
	CORA.searchHandlerJsClientIntegrator(this.dependencies, this.spec);
	let factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.getAddedMenuPresentation(0).textContent, "someHeaderTextFromSpec");
	assert.strictEqual(factoredItem.getAddedMenuPresentation(0).className, "searchMenu");
});

QUnit.test("initTestManagedGuiItemAddedToJsClient",	function(assert) {
	CORA.searchHandlerJsClientIntegrator(this.dependencies, this.spec);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(this.dependencies.jsClient.getAddedGuiItem(0), managedGuiItem);
});

QUnit.test("initTestManagedGuiItemShownInJsClientOnLoad", function(assert) {
	CORA.searchHandlerJsClientIntegrator(this.dependencies, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(managedGuiItemSpy, this.dependencies.jsClient
		.getViewShowingInWorkView(0));
	assert.strictEqual(managedGuiItemSpy.getSetFocusCalledNoOfTimes(), 1);
});

QUnit.test("testSearchHandlerCreatedUsingFactory", function(assert) {
	CORA.searchHandlerJsClientIntegrator(this.dependencies, this.spec);
	let factoredSearchHandler = this.dependencies.searchHandlerFactory.getFactored(0);
	assert.strictEqual(factoredSearchHandler.type, "searchHandlerSpy");
});

QUnit.test("testSearchHandlerSpec", function(assert) {
	CORA.searchHandlerJsClientIntegrator(this.dependencies, this.spec);

	let factoredSpec = this.dependencies.searchHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredSpec.setFocus, managedGuiItemSpy.setFocus);
});

QUnit.test("testSearchHandlerViewAddedToManagedGuiItemsWorkView", function(assert) {
	CORA.searchHandlerJsClientIntegrator(this.dependencies, this.spec);
	let factoredView = this.dependencies.searchHandlerFactory.getFactored(0).getView();
	let factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.getAddedWorkPresentation(0), factoredView);
});
