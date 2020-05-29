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

QUnit
		.module(
				"search/searchHandlerJsClientIntegratorFactoryTest.js",
				{
					beforeEach : function() {
						this.dependencies = {
							"searchHandlerFactory" : CORATEST
									.standardFactorySpy("searchHandlerSpy"),
							"managedGuiItemFactory" : CORATEST
									.standardFactorySpy("managedGuiItemSpy"),
							"jsClient" : CORATEST.jsClientSpy()
						};
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

QUnit.test("init", function(assert) {
	var searchHandlerJsClientIntegratorFactory = CORA
			.searchHandlerJsClientIntegratorFactory(this.dependencies);
	assert.strictEqual(searchHandlerJsClientIntegratorFactory.type,
			"searchHandlerJsClientIntegratorFactory");
});

QUnit.test("getDependencies", function(assert) {
	var searchHandlerJsClientIntegratorFactory = CORA
			.searchHandlerJsClientIntegratorFactory(this.dependencies);
	assert.strictEqual(
			searchHandlerJsClientIntegratorFactory.getDependencies(),
			this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	var searchHandlerJsClientIntegratorFactory = CORA
			.searchHandlerJsClientIntegratorFactory(this.dependencies);
	var searchHandler = searchHandlerJsClientIntegratorFactory
			.factor(this.spec);
	assert.strictEqual(searchHandler.type, "searchHandlerJsClientIntegrator");
});

