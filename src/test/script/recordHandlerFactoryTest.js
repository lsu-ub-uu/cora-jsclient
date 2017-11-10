/*
 * Copyright 2017 Olov McKie
 * Copyright 2017 Uppsala University Library
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

QUnit.module("recordHandlerFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();

		this.recordGuiFactorySpy = {
			"factor" : function(metadataId, data, dataDivider) {
				metadataIdUsed.push(metadataId);
				dataDividerUsed.push(dataDivider);
				return recordGui;
			}
		};

		this.dependencies = {
			"globalFactories" : {
				"dummy" : "dummy"
			},
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
			"recordGuiFactory" : this.recordGuiFactorySpy,
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy")
		};

		this.spec = {
			"fetchLatestDataFromServer" : "true",
			"createNewRecord" : "false",
			"record" : CORATEST.recordTypeList.dataList.data[4].record,
			"jsClient" : CORATEST.jsClientSpy()
		};

	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var recordHandlerFactory = CORA.recordHandlerFactory(this.dependencies);
	assert.ok(recordHandlerFactory);
	assert.strictEqual(recordHandlerFactory.type, "recordHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	var recordHandlerFactory = CORA.recordHandlerFactory(this.dependencies);
	assert.strictEqual(recordHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var recordHandlerFactory = CORA.recordHandlerFactory(this.dependencies);
	var recordHandler = recordHandlerFactory.factor(this.spec);
	var factoredDependencies = recordHandler.getDependencies();
	assert.strictEqual(factoredDependencies.globalFactories, this.dependencies.globalFactories);
	assert.strictEqual(factoredDependencies.recordHandlerFactory, recordHandlerFactory);
	assert.strictEqual(factoredDependencies.ajaxCallFactory, this.dependencies.ajaxCallFactory);
	assert.strictEqual(factoredDependencies.recordGuiFactory, this.dependencies.recordGuiFactory);
	assert.strictEqual(factoredDependencies.managedGuiItemFactory,
			this.dependencies.managedGuiItemFactory);
});

QUnit.test("factorTestType", function(assert) {
	var recordHandlerFactory = CORA.recordHandlerFactory(this.dependencies);
	var recordHandler = recordHandlerFactory.factor(this.spec);
	assert.strictEqual(recordHandler.type, "recordHandler");
});

QUnit.test("factorTestSpec", function(assert) {
	var recordHandlerFactory = CORA.recordHandlerFactory(this.dependencies);
	var recordHandler = recordHandlerFactory.factor(this.spec);
	assert.strictEqual(recordHandler.getSpec(), this.spec);
});
