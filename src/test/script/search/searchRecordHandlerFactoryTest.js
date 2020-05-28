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

QUnit.module("search/searchRecordHandlerFactoryTest.js", {
	beforeEach : function() {
		this.globalFactories = {
			"searchHandlerFactory" : CORATEST.standardFactorySpy("searchHandlerSpy")
		};
		this.dependencies = {
			"globalFactories" : this.globalFactories,
			"searchRecordHandlerViewFactory" : CORATEST
					.standardFactorySpy("searchRecordHandlerViewSpy"),
			"textProvider" : CORATEST.textProviderSpy(),
			"ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy"),
			"recordGuiFactory" : CORATEST.recordGuiFactorySpy()
		};
		this.search = CORATEST.searchRecordList.dataList.data[0].record;

		this.spec = {
			"searchRecord" : this.search,
			"jsClient" : CORATEST.jsClientSpy()
		}
		this.searchRecordHandlerFactory = CORA.searchRecordHandlerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.searchRecordHandlerFactory);
	assert.strictEqual(this.searchRecordHandlerFactory.type, "searchRecordHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.searchRecordHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factor", function(assert) {
	var searchRecordHandler = this.searchRecordHandlerFactory.factor(this.spec);
	assert.strictEqual(searchRecordHandler.type, "searchRecordHandler");
	var searchRecordHandlerSpec = searchRecordHandler.getSpec();
	assert.strictEqual(searchRecordHandlerSpec, this.spec);
});

QUnit.test("testFactorAddedDependencies", function(assert) {
	var searchRecordHandlerFactory = CORA.searchRecordHandlerFactory(this.dependencies);
	var searchRecordHandler = this.searchRecordHandlerFactory.factor(this.spec);
	var addedDep = searchRecordHandler.getDependencies();
	assert.strictEqual(addedDep.messageHolderFactory.type, "messageHolderFactory");
	assert.strictEqual(addedDep.searchRecordHandlerViewFactory.type,
			"searchRecordHandlerViewFactory");
	assert.strictEqual(addedDep.managedGuiItemFactory.type, "managedGuiItemFactory");
	assert.strictEqual(addedDep.textProvider,
			this.dependencies.textProvider);
	assert.strictEqual(addedDep.jsClient, this.spec.jsClient);
});

QUnit.test("testFactorAddedDependenciesSearchHandlerJsClientIntegratorFactory", function(assert) {
	var searchRecordHandlerFactory = CORA.searchRecordHandlerFactory(this.dependencies);
	var searchRecordHandler = this.searchRecordHandlerFactory.factor(this.spec);

	var addedDep = searchRecordHandler.getDependencies();
	var shJCIntF = addedDep.searchHandlerJSClientIntegratorFactory;
	assert.strictEqual(shJCIntF.type, "searchHandlerJsClientIntegratorFactory");
	assert.strictEqual(shJCIntF.getDependencies().jsClient, this.spec.jsClient);
	assert.strictEqual(shJCIntF.getDependencies().managedGuiItemFactory.type,
			"managedGuiItemFactory");
	assert.strictEqual(shJCIntF.getDependencies().searchHandlerFactory,
			this.globalFactories.searchHandlerFactory);
});

//QUnit.test("testFactorAddedDependenciesSearchHandlerFactory",
//		function(assert) {
//			var searchRecordHandlerFactory = CORA.searchRecordHandlerFactory(this.dependencies);
//			var searchRecordHandler = this.searchRecordHandlerFactory.factor(this.spec);
//			var addedDep = searchRecordHandler.getDependencies();
//			var searchHandlerFactory = addedDep.searchHandlerJSClientIntegratorFactory
//					.getDependencies().searchHandlerFactory;
//			assert.strictEqual(searchHandlerFactory, this.globalFactories.searchHandlerFactory);
//		});
