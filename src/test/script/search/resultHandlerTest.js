/*
 * Copyright 2017, 2018 Uppsala University Library
 * Copyright 2017, 2021 Olov McKie
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

QUnit.module("search/resultHandlerTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let spec;
	let resultHandler;
	hooks.beforeEach(() => {
		setupDependencies();
		setupSpec();
		startResultHandler();
	});
	hooks.afterEach(() => {
		//no after
	});
	
	const setupDependencies = function() {
		dependencies = {
			resultHandlerViewFactory: CORATEST.standardFactorySpy("resultHandlerViewSpy"),
			textProvider: CORATEST.textProviderSpy(),
			recordGuiFactory: CORATEST.standardFactorySpy("recordGuiSpy"),
			jsClient: CORATEST.jsClientSpy(),
			recordHandlerFactory: CORATEST.standardFactorySpy("recordHandlerSpy"),
			indexListHandlerFactory: CORATEST.standardFactorySpy("indexListHandlerSpy")
		};
	};
	
	const setupSpec = function() {
		spec = {
			dataList: CORATEST.searchRecordList.dataList
		};
	};

	const startResultHandler = function() {
		resultHandler = CORA.resultHandler(dependencies, spec);
	};

	test("testInit", function(assert) {
		assert.strictEqual(resultHandler.type, "resultHandler");
	});

	test("testGetDependencies", function(assert) {
		assert.strictEqual(resultHandler.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		assert.strictEqual(resultHandler.getSpec(), spec);
	});

	test("testInitViewCreatedUsingFactory", function(assert) {
		let factoredView = dependencies.resultHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.type, "resultHandlerViewSpy");
	});

	test("testInitViewSpec", function(assert) {
		let factoredViewSpec = dependencies.resultHandlerViewFactory.getSpec(0);
		assert.strictEqual(factoredViewSpec.ofText, dependencies.textProvider
			.getTranslation("theClient_resultListOfText"));
		assert.strictEqual(factoredViewSpec.fromNo, "1");
		assert.strictEqual(factoredViewSpec.toNo, "11");
		assert.strictEqual(factoredViewSpec.totalNo, "11");
		assert.strictEqual(factoredViewSpec.resultHandler, resultHandler);
	});

	test("testInitViewCreatesRecordHandlerForEachResultItem", function(assert) {
		assertCorrectRecordHandlerSpecForResultNo(assert, 0);
		assertCorrectRecordHandlerSpecForResultNo(assert, 10);
		assert.strictEqual(dependencies.recordHandlerFactory.getSpec(11), undefined);
	});

	const assertCorrectRecordHandlerSpecForResultNo = function(assert, resultNo) {
		let recordHandlerSpec = dependencies.recordHandlerFactory.getSpec(resultNo);
		assert.strictEqual(recordHandlerSpec.fetchLatestDataFromServer, "false");
		assert.strictEqual(recordHandlerSpec.partOfList, "true");
		assert.strictEqual(recordHandlerSpec.createNewRecord, "false");
		assert.strictEqual(recordHandlerSpec.record, spec.dataList.data[resultNo].record);
		assert.strictEqual(recordHandlerSpec.jsClient, dependencies.jsClient);
	};

	test("testInitViewAddsRecordHandlersListViewForEachResultItem", function(assert) {
		assertCorrectRecordHandlersListViewForResultItem(assert, 0);
		assertCorrectRecordHandlersListViewForResultItem(assert, 10);
		assert.strictEqual(dependencies.recordHandlerFactory.getSpec(11), undefined);
	});

	const assertCorrectRecordHandlersListViewForResultItem = function(assert, resultNo) {
		let factoredView = dependencies.resultHandlerViewFactory.getFactored(0);
		let recordHandler = dependencies.recordHandlerFactory.getFactored(resultNo);
		assert.strictEqual(factoredView.getAddedPresentation(resultNo).presentation, recordHandler
			.getManagedGuiItem().getListView());
		assert.strictEqual(factoredView.getAddedPresentation(resultNo).record,
			spec.dataList.data[resultNo].record);

	};

	test("testOpenRecord", function(assert) {
		let record = {
			actionLinks: {
				read: "thisIsAFakedRecordLink"
			}
		};
		let openInfo = {
			record: record,
			loadInBackground: "true"
		};
		resultHandler.openRecord(openInfo);
		let jsClient = dependencies.jsClient;
		let expectedOpenInfo = {
			readLink: "thisIsAFakedRecordLink",
			loadInBackground: "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, openInfo.loadInBackground);
	});

	test("testOpenRecordTriggerWhenResultIsChoosen", function(assert) {
		let choosenOpenInfo;
		function choosen(openInfoIn) {
			choosenOpenInfo = openInfoIn;
		}
		spec.triggerWhenResultIsChoosen = choosen;
		let record = {};
		let openInfo = {
			record: record,
			loadInBackground: "false"
		};
		resultHandler.openRecord(openInfo);
		assert.strictEqual(dependencies.recordHandlerFactory.getSpec(38), undefined);
		assert.strictEqual(choosenOpenInfo, openInfo);
	});

	test("testGetViewIsPassedOnToView", function(assert) {
		let factoredView = dependencies.resultHandlerViewFactory.getFactored(0);

		assert.strictEqual(resultHandler.getView(), factoredView.getView());
	});

	test("testIndexListHandlerSpec", function(assert) {
		resultHandler.indexDataList();

		let factoredIndexListHandler = dependencies.indexListHandlerFactory.getFactored(0);
		assert.stringifyEqual(factoredIndexListHandler.getSpec().dataList, spec.dataList);
	});

	test("testIndexListHandlerIndexDataListWasCalled", function(assert) {
		resultHandler.indexDataList();

		let factoredIndexListHandler = dependencies.indexListHandlerFactory.getFactored(0);
		assert.stringifyEqual(factoredIndexListHandler.getIndexDataListWasCalled(), true);
	});


	test("testResultListWasSentToIndexing", function(assert) {
		resultHandler.indexDataList();
		let factoredIndexListHandler = dependencies.indexListHandlerFactory.getFactored(0);

		assert.stringifyEqual(factoredIndexListHandler.getRecordInIndexedList(0), spec.dataList.data[0]);
		assert.stringifyEqual(factoredIndexListHandler.getRecordInIndexedList(37), spec.dataList.data[37]);
	});

	test("testIndexButtonIsAddedToViewWhenIndexLinkExists", function(assert) {
		let factoredView = dependencies.resultHandlerViewFactory.getFactored(0);
		let addedButton = factoredView.getAddedButton();

		assert.strictEqual(addedButton.text, "INDEX");
		assert.strictEqual(addedButton.onclickMethod, resultHandler.indexDataList);
		assert.strictEqual(addedButton.className, "indexButton");
	});

	test("testIndexButtonNotAddedToViewWhenNoIndexLinkExists", function(assert) {
		setupDependencies();
		spec.dataList = CORATEST.searchRecordListOneRecordWithNoIndexAction.dataList;
		startResultHandler();

		let factoredView = dependencies.resultHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedButton(), undefined);
	});
});
