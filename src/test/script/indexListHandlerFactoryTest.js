/*
 * Copyright 2018 Uppsala University Library
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

import CORA from "../../main/webapp/script/aCoraNameSpace.js";
import CORATEST from "./aCoratestNameSpace.js";
"use strict";

QUnit.module("indexListHandlerFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
			"uploadManager" : CORATEST.uploadManagerSpy(),
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.spec = {
			"dataList" : CORATEST.listWithDataToIndex.dataList
		};
		this.indexListHandlerFactory = CORA.indexListHandlerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.indexListHandlerFactory);
	assert.strictEqual(this.indexListHandlerFactory.type, "indexListHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.indexListHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var indexListHandler = this.indexListHandlerFactory.factor(this.spec);
	assert.ok(indexListHandler);
	assert.strictEqual(indexListHandler.type, "indexListHandler");
});

QUnit.test("testFactoredUsedIncomingDependencies", function(assert) {
	var indexListHandler = this.indexListHandlerFactory.factor(this.spec);
	var createdDependencies = indexListHandler.getDependencies();
	assert.strictEqual(createdDependencies.indexHandlerFactory.type,
			"genericFactory");
	assert.strictEqual(createdDependencies.indexHandlerFactory.getTypeToFactor(),
	"indexHandler");
	assert.strictEqual(createdDependencies.uploadManager,
		this.dependencies.uploadManager);
	assert.strictEqual(createdDependencies.textProvider,
		this.dependencies.textProvider);

});

QUnit.test("factorTestSpec", function(assert) {
	var indexListHandler = this.indexListHandlerFactory.factor(this.spec);
	var indexListHandlerSpec = indexListHandler.getSpec();
	assert.strictEqual(indexListHandlerSpec, this.spec);
});

export {};
