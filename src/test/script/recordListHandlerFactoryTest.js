/*
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

QUnit.module("recordListHandlerFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = CORATEST.MetadataProviderStub();
		this.dependencies = {
			"factories" : {
				"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
				"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
				"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy"),
				"resultHandlerFactory" : CORATEST.standardFactorySpy("resultHandlerSpy")
			}
		};
		this.spec = {
			"presentationId" : "pVarTextVariableId",
			"recordTypeRecord" : CORATEST.recordTypeList.dataList.data[4].record,
			"jsClient" : CORATEST.jsClientSpy(),
			"addToRecordTypeHandlerMethod" : function(managedGuiItem) {
				// we do not check anything here
			},
			"recordTypeRecordId" : "recordType",
			"listLink" : {
				"requestMethod" : "GET",
				"rel" : "list",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.recordList+json"
			},
			"listPresentationViewId" : "metadataCollectionItemListPGroup"
		};
		this.recordListHandlerFactory = CORA.recordListHandlerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.recordListHandlerFactory);
	assert.strictEqual(this.recordListHandlerFactory.type, "recordListHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.recordListHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var recordListHandler = this.recordListHandlerFactory.factor(this.spec);
	var factoredDep = recordListHandler.getDependencies();
	assert.strictEqual(factoredDep.ajaxCallFactory, this.dependencies.factories.ajaxCallFactory);
	assert.strictEqual(factoredDep.recordGuiFactory, this.dependencies.factories.recordGuiFactory);
	assert.strictEqual(factoredDep.recordHandlerFactory,
			this.dependencies.factories.recordHandlerFactory);
	assert.strictEqual(factoredDep.managedGuiItemFactory,
			this.dependencies.factories.managedGuiItemFactory);
	assert.strictEqual(factoredDep.resultHandlerFactory,
			this.dependencies.factories.resultHandlerFactory);
});

QUnit.test("factorTestType", function(assert) {
	var recordListHandler = this.recordListHandlerFactory.factor(this.spec);
	assert.ok(recordListHandler);
	assert.strictEqual(recordListHandler.type, "recordListHandler");
});

QUnit.test("factorTestSpec", function(assert) {
	var recordListHandler = this.recordListHandlerFactory.factor(this.spec);
	var recordListHandlerSpec = recordListHandler.getSpec();
	assert.strictEqual(recordListHandlerSpec, this.spec);
});
