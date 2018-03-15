/*
 * Copyright 2016, 2017 Uppsala University Library
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.assertCorrectFactoredSpec = function(assert, factoredSpec, context) {
		assert.strictEqual(factoredSpec.jsClient, context.dependencies.jsClient);
		assert.strictEqual(factoredSpec.recordTypeRecordIdForNew, "metadataCollectionItem");
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("recordTypeHandlerTest.js", {
	beforeEach : function() {
		this.record = CORATEST.recordTypeList.dataList.data[6].record;
		
		this.recordWithoutListLink = JSON.parse(JSON.stringify(this.record));
		this.recordWithoutListLink.actionLinks.list = undefined;
		
		this.recordWithoutCreateLink = JSON.parse(JSON.stringify(this.record));
		this.recordWithoutCreateLink.actionLinks.create = undefined;
		
		this.recordWithoutListAndCreateLink = JSON.parse(JSON.stringify(this.record));
		this.recordWithoutListAndCreateLink.actionLinks.list = undefined;
		this.recordWithoutListAndCreateLink.actionLinks.create = undefined;

		this.dependencies = {
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
			"recordTypeHandlerViewFactory" : CORATEST
					.standardFactorySpy("recordTypeHandlerViewSpy"),
			"recordListHandlerFactory" : CORATEST.standardFactorySpy("recordListHandlerSpy"),
			"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy"),
			"jsClient" : CORATEST.jsClientSpy(),
			"textProvider" : CORATEST.textProviderSpy()
		};

		this.spec = {
			"recordTypeRecord" : this.record,
			"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandler.type, "recordTypeHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandler.getSpec(), this.spec);
});

QUnit.test("initViewClassName", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);

	var view = recordTypeHandler.getView();
	assert.strictEqual(view.className, "recordTypeFromRecordTypeHandlerSpy");
});

QUnit.test("initViewHeaderText", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.headerText, "metadataCollectionItemText");
});

QUnit.test("initViewWithListMethod", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.fetchListMethod, recordTypeHandler.createRecordTypeList);
});

QUnit.test("initViewWithoutListMethod", function(assert) {
	this.spec.recordTypeRecord = this.recordWithoutListLink;
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.fetchListMethod, undefined);
});

QUnit.test("initViewWithCreateButton", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.createNewMethod, recordTypeHandler.createRecordHandler);
});

QUnit.test("initViewWithoutCreateButton", function(assert) {
	this.spec.recordTypeRecord = this.recordWithoutCreateLink;
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.createNewMethod, undefined);
});

QUnit.test("testHasAnyAction", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandler.hasAnyAction(), true);
});

QUnit.test("testHasAnyActionWithoutListMethod", function(assert) {
	this.spec.recordTypeRecord = this.recordWithoutListLink;
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandler.hasAnyAction(), true);
});

QUnit.test("testHasAnyActionWithoutCreateLink", function(assert) {
	this.spec.recordTypeRecord = this.recordWithoutCreateLink;
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandler.hasAnyAction(), true);
});

QUnit.test("testHasAnyActionWithoutListAndCreateLink", function(assert) {
	this.spec.recordTypeRecord = this.recordWithoutListAndCreateLink;
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandler.hasAnyAction(), false);
});

QUnit.test("fetchListCheckSpec", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);

	recordTypeHandler.createRecordTypeList();
	var factoredSpec = this.dependencies.recordListHandlerFactory.getSpec(0);

	assert.strictEqual(factoredSpec.baseUrl, this.spec.baseUrl);

	assert.strictEqual(factoredSpec.recordTypeRecordId, "metadataCollectionItem");
	var expectedListLink = {
		"requestMethod" : "GET",
		"rel" : "list",
		"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
		"accept" : "application/vnd.uub.recordList+json"
	};
	assert.stringifyEqual(factoredSpec.listLink, expectedListLink);
	assert.strictEqual(factoredSpec.listPresentationViewId, "metadataCollectionItemListPGroup");
	assert.strictEqual(factoredSpec.openRecordMethod, recordTypeHandler.createRecordHandler);
});

QUnit.test("testCreateRecordHandlerForRecord", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	recordTypeHandler.createRecordHandler("false", this.record, "false");

	var factoredSpec = this.dependencies.recordHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.createNewRecord, "false");
	assert.strictEqual(factoredSpec.record, this.record);
	assert.strictEqual(factoredSpec.recordTypeHandler, undefined);

	CORATEST.assertCorrectFactoredSpec(assert, factoredSpec, this);
});

QUnit.test("testCreateRecordHandlerInBackground", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	recordTypeHandler.createRecordHandler("false", this.record, "true");

	var factoredSpec = this.dependencies.recordHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.createNewRecord, "false");
	assert.strictEqual(factoredSpec.record, this.record);

	CORATEST.assertCorrectFactoredSpec(assert, factoredSpec, this);
});

QUnit.test("testCreateRecordHandlerForNew", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	recordTypeHandler.createRecordHandler("true", undefined, "false");

	var factoredSpec = this.dependencies.recordHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.createNewRecord, "true");
	assert.strictEqual(factoredSpec.record, undefined);

	CORATEST.assertCorrectFactoredSpec(assert, factoredSpec, this);
});

QUnit.test("testManagedGuiItemForRecordHandlerAddedToJsClient", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	recordTypeHandler.createRecordHandler("false", this.record, "false");

	var recordHandler = this.dependencies.recordHandlerFactory.getFactored(0);
	var managedGuiItem = recordHandler.getManagedGuiItem();
	assert.strictEqual(this.dependencies.jsClient.getAddedGuiItem(0), managedGuiItem);
});

QUnit.test("testManagedGuiItemForRecordHandlerShownInJsClient", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	recordTypeHandler.createRecordHandler("false", this.record, "false");

	var recordHandler = this.dependencies.recordHandlerFactory.getFactored(0);
	var managedGuiItem = recordHandler.getManagedGuiItem();
	assert.strictEqual(this.dependencies.jsClient.getViewShowingInWorkView(0), managedGuiItem);
});

QUnit.test("testManagedGuiItemForRecordHandlerNotShownInJsClientWhenBackground", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	recordTypeHandler.createRecordHandler("false", this.record, "true");

	var recordHandler = this.dependencies.recordHandlerFactory.getFactored(0);
	var managedGuiItem = recordHandler.getManagedGuiItem();
	assert.strictEqual(this.dependencies.jsClient.getViewShowingInWorkView(0), undefined);
});