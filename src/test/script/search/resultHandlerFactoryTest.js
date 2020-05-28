/*
 * Copyright 2017, 2018 Uppsala University Library
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

QUnit.module("search/resultHandlerFactoryTest.js", {
	beforeEach : function() {
	this.recordGuiFactory = CORATEST.standardFactorySpy("recordGuiSpy");
	this.recordGuiFactory.setSpyDependencies({"uploadManager": CORATEST.uploadManagerSpy()});

		this.dependencies = {
			"textProvider" : CORATEST.textProviderSpy(),
			"recordGuiFactory" : this.recordGuiFactory,
			"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy"),
			"ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy")
		};
		this.spec = {
			"jsClient" : CORATEST.jsClientSpy(),
			"dataList" : CORATEST.searchRecordList.dataList
		}
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var resultHandlerFactory = CORA.resultHandlerFactory(this.dependencies);
	assert.strictEqual(resultHandlerFactory.type, "resultHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	var resultHandlerFactory = CORA.resultHandlerFactory(this.dependencies);
	assert.strictEqual(resultHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	var resultHandlerFactory = CORA.resultHandlerFactory(this.dependencies);
	var resultHandler = resultHandlerFactory.factor(this.spec);
	assert.strictEqual(resultHandler.type, "resultHandler");
});

QUnit.test("testFactorAddedDependencies", function(assert) {
	var resultHandlerFactory = CORA.resultHandlerFactory(this.dependencies);
	var resultHandler = resultHandlerFactory.factor(this.spec);
	var addedDep = resultHandler.getDependencies();
	assert.strictEqual(addedDep.resultHandlerViewFactory.type, "resultHandlerViewFactory");
	assert.strictEqual(addedDep.textProvider, this.dependencies.textProvider);
	assert.strictEqual(addedDep.recordGuiFactory, this.dependencies.recordGuiFactory);
	assert.strictEqual(addedDep.indexListHandlerFactory.type, "indexListHandlerFactory");
	assert.strictEqual(addedDep.jsClient, this.spec.jsClient);
	assert.strictEqual(addedDep.recordHandlerFactory, this.dependencies.recordHandlerFactory);

});

QUnit.test("testIndexHandlerFactoryDependencies", function(assert) {
	var resultHandlerFactory = CORA.resultHandlerFactory(this.dependencies);
	var resultHandler = resultHandlerFactory.factor(this.spec);
	var addedDep = resultHandler.getDependencies();
	var indexListHandlerDependencies = addedDep.indexListHandlerFactory.getDependencies();
	assert.strictEqual(indexListHandlerDependencies.ajaxCallFactory, this.dependencies.ajaxCallFactory);
	assert.stringifyEqual(indexListHandlerDependencies.uploadManager, this.dependencies.recordGuiFactory.getDependencies().uploadManager)
	assert.stringifyEqual(indexListHandlerDependencies.textProvider, this.dependencies.textProvider)
});

