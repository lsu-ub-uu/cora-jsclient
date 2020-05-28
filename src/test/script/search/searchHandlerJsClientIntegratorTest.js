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

QUnit
		.module(
				"search/searchHandlerJsClientIntegratorTest.js",
				{
					beforeEach : function() {
						this.dependencies = {
							"searchHandlerFactory" : CORATEST
									.standardFactorySpy("searchHandlerSpy"),
							"managedGuiItemFactory" : CORATEST
									.standardFactorySpy("managedGuiItemSpy"),
							"jsClient" : CORATEST.jsClientSpy()
						}
						this.spec = {
							"metadataId" : "someMetadataId",
							"presentationId" : "somePresentationId",
							"searchLink" : {
								"requestMethod" : "GET",
								"rel" : "search",
								"url" : "http://epc.ub.uu.se/cora/rest/record/searchResult/coraTextSearch",
								"accept" : "application/vnd.uub.recordList+json"
							}
						}
					},
					afterEach : function() {
					}
				});

QUnit.test("testInit", function(assert) {
	var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	assert.strictEqual(jsClientIntegrator.type,
			"searchHandlerJsClientIntegrator");
});

QUnit.test("testGetDependencies",
		function(assert) {
			var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
					this.dependencies, this.spec);
			assert.strictEqual(jsClientIntegrator.getDependencies(),
					this.dependencies);
		});

QUnit.test("testGetSpec", function(assert) {
	var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	assert.strictEqual(jsClientIntegrator.getSpec(), this.spec);
});

QUnit.test("testInitManagedGuiItemCreatedUsingFactory", function(assert) {
	var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.type, "managedGuiItemSpy");
});

QUnit.test("testInitManagedGuiItemCreatedsSpec", function(assert) {
	var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	var factoredItemSpec = this.dependencies.managedGuiItemFactory.getSpec(0);
	assert.strictEqual(factoredItemSpec.activateMethod,
			this.dependencies.jsClient.showView);
	assert.strictEqual(factoredItemSpec.removeMethod,
			this.dependencies.jsClient.viewRemoved);
});

QUnit.test("testInitMenuViewAddedToManagedGuiItemsMenuView", function(assert) {
	var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.getAddedMenuPresentation(0).textContent,
			"search");
});

QUnit.test("initTestManagedGuiItemAddedToJsClient",
		function(assert) {
			var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
					this.dependencies, this.spec);
			var managedGuiItem = this.dependencies.managedGuiItemFactory
					.getFactored(0);
			assert.strictEqual(this.dependencies.jsClient.getAddedGuiItem(0),
					managedGuiItem);
		});

QUnit.test("initTestManagedGuiItemShownInJsClientOnLoad", function(assert) {
	var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory
			.getFactored(0);
	assert.strictEqual(managedGuiItemSpy, this.dependencies.jsClient
			.getViewShowingInWorkView(0));
});

QUnit.test("testSearchHandlerCreatedUsingFactory", function(assert) {
	var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	var factoredSearchHandler = this.dependencies.searchHandlerFactory
			.getFactored(0);
	assert.strictEqual(factoredSearchHandler.type, "searchHandlerSpy");
});

QUnit.test("testSearchHandlerSpec", function(assert) {
	var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	var factoredSpec = this.dependencies.searchHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec, this.spec);
});

QUnit.test("testSearchHandlerViewAddedToManagedGuiItemsWorkView", function(
		assert) {
	var jsClientIntegrator = CORA.searchHandlerJsClientIntegrator(
			this.dependencies, this.spec);
	var factoredView = this.dependencies.searchHandlerFactory.getFactored(0)
			.getView();
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.getAddedWorkPresentation(0), factoredView);
});
