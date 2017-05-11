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

QUnit.module("recordListHandlerTest.js", {
	beforeEach : function() {
		this.record = CORATEST.recordTypeList.dataList.data[4].record;

		var openRecordMethodCalledWithPresentationMode;
		var openRecordMethodCalledWithRecord;
		var openRecordMethodCalledWithLoadInBackground;

		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		var dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy,
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
			"recordGuiFactory" : CORATEST.recordGuiFactorySpy(),
			"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy"),
			"resultHandlerFactory" : CORATEST.standardFactorySpy("resultHandlerSpy")
		};
		this.dependencies = dependencies;

		this.spec = {
			"openRecordMethod" : function(presentationMode, record, loadInBackground) {
				openRecordMethodCalledWithPresentationMode = presentationMode;
				openRecordMethodCalledWithRecord = record;
				openRecordMethodCalledWithLoadInBackground = loadInBackground;
			},
			"jsClient" : CORATEST.jsClientSpy(),
			"views" : CORATEST.managedGuiItemSpy(),
			"baseUrl" : "http://epc.ub.uu.se/cora/rest/",
			"recordTypeRecordId" : "recordType",
			"listLink" : {
				"requestMethod" : "GET",
				"rel" : "list",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.recordList+json"
			},
			"listPresentationViewId" : "recordTypeListPGroup"
		};

		this.answerListCall = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonRecordList = JSON.stringify(CORATEST.recordTypeList);
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.answerListCallBrokenList = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonRecordList = JSON.stringify(CORATEST.recordTypeBrokenList);
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.getopenRecordMethodCalledWithPresentationMode = function() {
			return openRecordMethodCalledWithPresentationMode;
		}
		this.getopenRecordMethodCalledWithRecord = function() {
			return openRecordMethodCalledWithRecord;
		}
		this.getopenRecordMethodCalledWithLoadInBackground = function() {
			return openRecordMethodCalledWithLoadInBackground;
		}
		this.firstRecord = CORATEST.recordTypeList.dataList.data[0].record;

	},
	afterEach : function() {
	}
});

QUnit.test("testType", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	assert.strictEqual(recordListHandler.type, "recordListHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	assert.strictEqual(recordListHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	assert.strictEqual(recordListHandler.getSpec(), this.spec);
});

QUnit.test("init", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, recordListHandler.createRecordTypeListFromAnswer);
});

QUnit.test("initTestManagedGuiItemFactoryCalled", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);

	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	var managedGuiItemSpec = managedGuiItemSpy.getSpec(0);
	assert.strictEqual(managedGuiItemSpec.activateMethod, this.spec.jsClient.showView);
	assert.strictEqual(managedGuiItemSpec.removeMethod, this.spec.jsClient.removeView);
	assert.ok(managedGuiItemSpy !== undefined);
});

QUnit.test("initTestManagedGuiItemAddGuiItemCalled", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(this.spec.jsClient.getAddedGuiItem(0), managedGuiItem);
});

QUnit.test("initTestManagedGuiItemShowViewCalled", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(this.spec.jsClient.getViewShowingInWorkView(0), managedGuiItem);
});

QUnit.test("initCheckRemoveOnMenu", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	assert.strictEqual(this.dependencies.managedGuiItemFactory.getFactored(0)
			.getAddedMenuPresentation(0).textContent, "List (recordType)");
});

// QUnit.test("fetchListCheckGeneratedList", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCall(0);
// var factoredManagedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
// assert.ok(factoredManagedGuiItem.getAddedWorkPresentation(14) !== undefined);
// assert.ok(factoredManagedGuiItem.getAddedWorkPresentation(15) === undefined);
// });

// QUnit.test("fetchListCheckGeneratedListClickable", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCall(0);
//
// var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
// .getAddedWorkPresentation(0);
// assert.strictEqual(firstListItem.className, "listItem recordType");
// assert.notStrictEqual(firstListItem.onclick, undefined);
// });

QUnit.test("fetchListCheckError", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy.getSpec().errorMethod({
		"status" : 404
	});
	var addedItem = this.dependencies.managedGuiItemFactory.getFactored(0)
			.getAddedWorkPresentation(0);

	assert.strictEqual(addedItem.textContent, "404");
});

// QUnit.test("fetchListCheckGeneratedListClickablePresentationMode", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCall(0);
//
// var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
// .getAddedWorkPresentation(0);
// var event = document.createEvent('Event');
// firstListItem.onclick(event);
//
// assert.stringifyEqual(this.getopenRecordMethodCalledWithPresentationMode(), "view");
// assert.stringifyEqual(this.getopenRecordMethodCalledWithRecord(), this.firstRecord);
// assert.stringifyEqual(this.getopenRecordMethodCalledWithLoadInBackground(), "false");
// });
//
// QUnit.test("fetchListCheckGeneratedListClickableLoadInBackground", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCall(0);
//
// var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
// .getAddedWorkPresentation(0);
// var event = document.createEvent('Event');
// event.ctrlKey = true;
// firstListItem.onclick(event);
//
// assert.stringifyEqual(this.getopenRecordMethodCalledWithLoadInBackground(), "true");
// });
//
// QUnit.test("fetchListCheckUsedPresentationId", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCall(0);
//
// var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
// assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");
// assert.strictEqual(factoredSpec.dataDivider, "cora");
//
// var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
// assert.stringifyEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeListPGroup");
// assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");
// });

// QUnit.test("fetchListBroken", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCallBrokenList(0);
//
// var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
// .getAddedWorkPresentation(1);
// assert.strictEqual(firstListItem.textContent.substring(0, 10), "TypeError:");
// });

QUnit.test("fetchListResultHandlerCreated", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	this.answerListCall(0);

	var resultHandlerSpec = this.dependencies.resultHandlerFactory.getSpec(0);

	assert.stringifyEqual(resultHandlerSpec.jsClient, this.spec.jsClient);
	assert.stringifyEqual(resultHandlerSpec.dataList, CORATEST.recordTypeList.dataList);
	// assert.stringifyEqual(resultHandlerSpec.dataList, JSON.parse(answer.responseText).dataList);
});

QUnit.test("fetchListResultHandlerAddedToView", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	this.answerListCall(0);

	var resultHandler = this.dependencies.resultHandlerFactory.getFactored(0);
	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);

	assert.stringifyEqual(managedGuiItem.getAddedWorkPresentation(0), resultHandler.getView());
});