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

QUnit.module("jsClient/openGuiItemHandlerFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			// "openGuiItemHandlerViewFactory" : CORATEST
			// .standardFactorySpy("openGuiItemHandlerViewSpy"),
			"textProvider" : CORATEST.textProviderSpy(),
		// "ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy")
		};
		this.search = CORATEST.searchRecordList.dataList.data[0].record;

		this.spec = {
		// "openGuiItem" : this.search,
		// "jsClient" : CORATEST.jsClientSpy(),
		// "recordGuiFactory" : CORATEST.recordGuiFactorySpy()
		}
		this.openGuiItemHandlerFactory = CORA.openGuiItemHandlerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.openGuiItemHandlerFactory);
	assert.strictEqual(this.openGuiItemHandlerFactory.type, "openGuiItemHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.openGuiItemHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factor", function(assert) {
	var openGuiItemHandler = this.openGuiItemHandlerFactory.factor(this.spec);
	assert.strictEqual(openGuiItemHandler.type, "openGuiItemHandler");
	var openGuiItemHandlerSpec = openGuiItemHandler.getSpec();
	assert.strictEqual(openGuiItemHandlerSpec, this.spec);
});

QUnit.test("testFactorAddedDependencies", function(assert) {
	var openGuiItemHandlerFactory = CORA.openGuiItemHandlerFactory(this.dependencies);
	var openGuiItemHandler = this.openGuiItemHandlerFactory.factor(this.spec);
	var addedDep = openGuiItemHandler.getDependencies();
	assert
			.strictEqual(addedDep.openGuiItemHandlerViewFactory.type,
					"openGuiItemHandlerViewFactory");
	// assert
	// .strictEqual(addedDep.openGuiItemHandlerViewFactory.type,
	// "openGuiItemHandlerViewFactory");
	// assert.strictEqual(addedDep.managedGuiItemFactory.type, "managedGuiItemFactory");
	// assert.strictEqual(addedDep.jsClient, this.spec.jsClient);
	assert.strictEqual(addedDep.textProvider, this.dependencies.textProvider);
});

// QUnit.test("testFactorAddedDependenciesSearchHandlerFactory", function(assert) {
// var openGuiItemHandlerFactory = CORA.openGuiItemHandlerFactory(this.dependencies);
// var openGuiItemHandler = this.openGuiItemHandlerFactory.factor(this.spec);
// var addedDep = openGuiItemHandler.getDependencies();
// assert.strictEqual(addedDep.searchHandlerFactory.type, "searchHandlerFactory");
// // assert.strictEqual(addedDep.searchHandlerFactory.getDependencies().recordGuiFactory,
// // this.spec.recordGuiFactory);
// assert.strictEqual(addedDep.searchHandlerFactory.getDependencies().textProvider,
// this.dependencies.textProvider);
// // assert.strictEqual(addedDep.searchHandlerFactory.getDependencies().ajaxCallFactory,
// // this.dependencies.ajaxCallFactory);
// });
