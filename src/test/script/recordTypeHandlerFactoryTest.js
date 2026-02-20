/*
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

QUnit.module("recordTypeHandlerFactoryTest.js", {
	beforeEach : function() {
		this.record = CORATEST.recordTypeList.dataList.data[4].record;
		this.metadataProvider = CORATEST.MetadataProviderStub();
		this.dependencies = {
			"factories" : {
				"recordGuiFactory" : CORATEST.standardFactorySpy("recordGuiSpy"),
				"ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy"),
				"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy"),
				"recordListHandlerFactory" : CORATEST.standardFactorySpy("recordListHandlerSpy"),
				"recordTypeHandlerViewFactory" : CORATEST
						.standardFactorySpy("recordTypeHandlerViewSpy")
			},
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.spec = {
			"jsClient" : {},
			"recordTypeRecord" : this.record,
			"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
		};
		this.recordTypeHandlerFactory = CORA.recordTypeHandlerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.recordTypeHandlerFactory);
	assert.strictEqual(this.recordTypeHandlerFactory.type, "recordTypeHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.recordTypeHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var recordTypeHandler = this.recordTypeHandlerFactory.factor(this.spec);
	assert.ok(recordTypeHandler);
	assert.strictEqual(recordTypeHandler.type, "recordTypeHandler");
});

QUnit.test("factorTestUsedIncomingDependencies", function(assert) {
	var recordTypeHandler = this.recordTypeHandlerFactory.factor(this.spec);
	var createdDependencies = recordTypeHandler.getDependencies();
	assert.strictEqual(createdDependencies.recordGuiFactory,
			this.dependencies.factories.recordGuiFactory);
	assert.strictEqual(createdDependencies.ajaxCallFactory,
			this.dependencies.factories.ajaxCallFactory);
	assert.strictEqual(createdDependencies.recordTypeHandlerViewFactory,
			this.dependencies.factories.recordTypeHandlerViewFactory);
	assert.strictEqual(createdDependencies.managedGuiItemFactory,
			this.dependencies.factories.managedGuiItemFactory);
	assert.strictEqual(createdDependencies.recordHandlerFactory,
			this.dependencies.factories.recordHandlerFactory);
	assert.strictEqual(createdDependencies.recordListHandlerFactory,
			this.dependencies.factories.recordListHandlerFactory);

	assert.strictEqual(createdDependencies.textProvider,
			this.dependencies.textProvider);
	
	assert.strictEqual(createdDependencies.jsClient, this.spec.jsClient);
});

QUnit.test("factorTestSpec", function(assert) {
	var recordTypeHandler = this.recordTypeHandlerFactory.factor(this.spec);
	var recordTypeHandlerSpec = recordTypeHandler.getSpec();
	assert.strictEqual(recordTypeHandlerSpec, this.spec);
});
