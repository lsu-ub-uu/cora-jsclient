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
"use strict";

QUnit.module("indexListHandlerTest.js",{
					beforeEach : function() {
						this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
						this.uploadManager =  CORATEST.uploadManagerSpy();
						this.dependencies = {
							"uploadManager": this.uploadManager,
							"indexHandlerFactory" : CORATEST.standardFactorySpy("indexHandlerSpy")
						};
						this.spec = {
							"dataList" : CORATEST.searchRecordList.dataList
						};
					},
					afterEach : function() {
					}
				});

QUnit.test("testType", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	assert.strictEqual(indexListHandler.type, "indexListHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	assert.strictEqual(indexListHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	assert.strictEqual(indexListHandler.getSpec(), this.spec);
});

QUnit.test("testFactoredSpec", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	var recordList = CORATEST.searchRecordList.dataList;

	indexListHandler.indexDataList(recordList);
	var factoredIndexHandler = this.dependencies.indexHandlerFactory.getFactored(0);
	var factoredSpec = factoredIndexHandler.getSpec();
	assert.strictEqual(factoredSpec.loadMethod, indexListHandler.indexingFinished);
	assert.strictEqual(factoredSpec.timeoutMethod, indexListHandler.timeoutMethod);
});

QUnit.test("testIndexQue", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	var recordList = CORATEST.searchRecordList.dataList;

	indexListHandler.indexDataList();

	var factoredIndexHandler = this.dependencies.indexHandlerFactory.getFactored(0);
	var firstIndexedRecord = factoredIndexHandler.getIndexRecord(0);
	assert.stringifyEqual(firstIndexedRecord, CORATEST.searchRecordList.dataList.data[0].record);

	assert.strictEqual(indexListHandler.getNumberOfIndexedRecords(), 0);

	indexListHandler.indexingFinished();
	assert.strictEqual(indexListHandler.getNumberOfIndexedRecords(), 1);

	indexListHandler.indexingFinished();
	assert.strictEqual(indexListHandler.getNumberOfIndexedRecords(), 2);
});

QUnit.test("testIndexOneRecord", function(assert) {
	this.spec.dataList = CORATEST.searchRecordListOneRecord.dataList;
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	var recordList = CORATEST.searchRecordList.dataList;

	indexListHandler.indexDataList(recordList);

	var factoredIndexHandler = this.dependencies.indexHandlerFactory.getFactored(0);
	var firstIndexedRecord = factoredIndexHandler.getIndexRecord(0);
	assert.stringifyEqual(firstIndexedRecord, CORATEST.searchRecordListOneRecord.dataList.data[0].record);
	indexListHandler.indexingFinished();

	assert.strictEqual(indexListHandler.getNumberOfIndexedRecords(), 1);
});

QUnit.test("testIndexDataListViewAddedToUploadManager", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	indexListHandler.indexDataList();

	var workView = this.uploadManager.view.getWorkView();
	var indexOrders = workView.firstChild;
	assert.strictEqual(indexOrders.className, "indexOrders");

	var indexOrderView = indexOrders.firstChild;
	assert.strictEqual(indexOrderView.className, "indexOrder");

	indexListHandler.indexingFinished();
	var indexOrder = indexOrders.firstChild;
	assert.strictEqual(indexOrder.firstChild.textContent, "Indexerat");
	assert.strictEqual(indexOrder.childNodes[1].className, "indexItem");
	assert.strictEqual(indexOrder.childNodes[1].textContent, "1");
});

QUnit.test("testIndexTimeoutMethod", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	indexListHandler.indexDataList();

		indexListHandler.timeoutMethod();

		var workView = this.uploadManager.view.getWorkView();
		var indexOrder = workView.firstChild.firstChild;
		assert.strictEqual(indexOrder.lastChild.textContent, "TIMEOUT");
	});

QUnit.test("testIndexDataWasCalledForAllInList", function(assert) {
	this.dependencies.indexHandlerFactory =  CORATEST.standardFactorySpy("indexHandlerCallingLoadMethodSpy");
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	indexListHandler.indexDataList();
	var factoredIndexHandler = this.dependencies.indexHandlerFactory.getFactored(0);

	assert.stringifyEqual(indexListHandler.getNumberOfIndexedRecords(), 38);

});