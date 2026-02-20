/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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

		let openRecordMethodCalledWithcreateNewRecord;
		let openRecordMethodCalledWithRecord;
		let openRecordMethodCalledWithLoadInBackground;

		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		let dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy,
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
			"recordGuiFactory" : CORATEST.recordGuiFactorySpy(),
			"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy"),
			"resultHandlerFactory" : CORATEST.standardFactorySpy("resultHandlerSpy")
		};
		this.dependencies = dependencies;

		this.spec = {
			headerText: "someHeaderText", 
			openRecordMethod : function(createNewRecord, record, loadInBackground) {
				openRecordMethodCalledWithcreateNewRecord = createNewRecord;
				openRecordMethodCalledWithRecord = record;
				openRecordMethodCalledWithLoadInBackground = loadInBackground;
			},
			jsClient : CORATEST.jsClientSpy(),
			views : CORATEST.managedGuiItemSpy(),
			baseUrl : "http://epc.ub.uu.se/cora/rest/",
			listLink : {
				requestMethod : "GET",
				rel : "list",
				url : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				accept : "application/vnd.cora.recordList+json"
			},
			listPresentationViewId : "recordTypeListPGroup"
		};

		this.answerListCall = function(no) {
			let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			let jsonRecordList = JSON.stringify(CORATEST.recordTypeList);
			let answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.answerListCallBrokenList = function(no) {
			let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			let jsonRecordList = JSON.stringify(CORATEST.recordTypeBrokenList);
			let answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.getopenRecordMethodCalledWithcreateNewRecord = function() {
			return openRecordMethodCalledWithcreateNewRecord;
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
	let recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	assert.strictEqual(recordListHandler.type, "recordListHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	let recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	assert.strictEqual(recordListHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
	assert.strictEqual(recordListHandler.getSpec(), this.spec);
});

QUnit.test("init", function(assert) {
	let recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, recordListHandler.createRecordTypeListFromAnswer);
});

QUnit.test("initTestManagedGuiItemFactoryCalled", function(assert) {
	CORA.recordListHandler(this.dependencies, this.spec);

	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	let managedGuiItemSpec = managedGuiItemSpy.getSpec(0);
	assert.strictEqual(managedGuiItemSpec.activateMethod, this.spec.jsClient.showView);
	assert.strictEqual(managedGuiItemSpec.removeMethod, this.spec.jsClient.viewRemoved);
	assert.ok(managedGuiItemSpy !== undefined);
});

QUnit.test("initTestManagedGuiItemAddGuiItemCalled", function(assert) {
	CORA.recordListHandler(this.dependencies, this.spec);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(this.spec.jsClient.getAddedGuiItem(0), managedGuiItem);
});

QUnit.test("initTestManagedGuiItemShowViewCalled", function(assert) {
	CORA.recordListHandler(this.dependencies, this.spec);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(this.spec.jsClient.getViewShowingInWorkView(0), managedGuiItem);
});

QUnit.test("initCheckRemoveOnMenu", function(assert) {
	CORA.recordListHandler(this.dependencies, this.spec);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(managedGuiItem.getAddedMenuPresentation(0).className, "listMenu");
	assert.strictEqual(managedGuiItem.getAddedMenuPresentation(0).textContent,
		"List (someHeaderText)");
});

QUnit.test("fetchListCheckError", function(assert) {
	CORA.recordListHandler(this.dependencies, this.spec);
	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy.getSpec().errorMethod({
		"status" : 404
	});
	let addedItem = this.dependencies.managedGuiItemFactory.getFactored(0)
			.getAddedWorkPresentation(0);

	assert.strictEqual(addedItem.textContent, "404");
});

QUnit.test("fetchListResultHandlerCreated", function(assert) {
	CORA.recordListHandler(this.dependencies, this.spec);
	this.answerListCall(0);

	let resultHandlerSpec = this.dependencies.resultHandlerFactory.getSpec(0);

	assert.stringifyEqual(resultHandlerSpec.jsClient, this.spec.jsClient);
	assert.stringifyEqual(resultHandlerSpec.dataList, CORATEST.recordTypeList.dataList);
});

QUnit.test("fetchListResultHandlerAddedToView", function(assert) {
	CORA.recordListHandler(this.dependencies, this.spec);
	this.answerListCall(0);

	let resultHandler = this.dependencies.resultHandlerFactory.getFactored(0);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);

	assert.stringifyEqual(managedGuiItem.getAddedWorkPresentation(0), resultHandler.getView());
});