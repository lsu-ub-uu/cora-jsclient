/*
 * Copyright 2017, 2019, 2020, 2021, 2024 Uppsala University Library
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
QUnit.module("search/searchHandlerTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let spec;
	let specTriggerWhenResultIsChoosen;
	let searchHandler;
	let factoredView;
	let factoredGui;
	let setFocusCalledNoOfTimes = 0;
	hooks.beforeEach(() => {
		setupDependencies();
		setupSpec();
		startResultHandler();
		setFactored();
		setFocusCalledNoOfTimes = 0;
	});
	hooks.afterEach(() => {
		//no after
	});

	const setupDependencies = function() {
		dependencies = {
			searchHandlerViewFactory: CORATEST.standardFactorySpy("searchHandlerViewSpy"),
			recordGuiFactory: CORATEST.standardFactorySpy("recordGuiSpy"),
			ajaxCallFactory: CORATEST.standardFactorySpy("ajaxCallSpy"),
			resultHandlerFactory: CORATEST.standardFactorySpy("resultHandlerSpy")
		};
	};

	const setupSpec = function() {
		spec = {
			metadataId: "someMetadataId",
			presentationId: "somePresentationId",
			searchLink: {
				requestMethod: "GET",
				rel: "search",
				url: "http://epc.ub.uu.se/cora/rest/record/searchResult/coraTextSearch",
				accept: "application/vnd.cora.recordList+json"
			},
			setFocus: function() {
				setFocusCalledNoOfTimes++;
			}
		};
		specTriggerWhenResultIsChoosen = spec;
		specTriggerWhenResultIsChoosen.triggerWhenResultIsChoosen = {
			some: "thing"
		};
		specTriggerWhenResultIsChoosen.searchResultPresentationId = "somePresentationId";
	};

	const startResultHandler = function() {
		searchHandler = CORA.searchHandler(dependencies, spec);
	};

	const setFactored = function() {
		factoredView = dependencies.searchHandlerViewFactory.getFactored(0);
		factoredGui = dependencies.recordGuiFactory.getFactored(0);
	};

	test("testInit", function(assert) {
		assert.strictEqual(searchHandler.type, "searchHandler");
	});

	test("testGetDependencies", function(assert) {
		assert.strictEqual(searchHandler.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		assert.strictEqual(searchHandler.getSpec(), spec);
	});

	test("testInitViewCreatedUsingFactory", function(assert) {
		assert.strictEqual(factoredView.type, "searchHandlerViewSpy");
	});

	test("testInitViewSpec", function(assert) {
		let factoredSpec = dependencies.searchHandlerViewFactory.getSpec(0);
		assert.strictEqual(factoredSpec.searchMethod, searchHandler.search);
	});

	test("testGetView", function(assert) {
		assert.strictEqual(searchHandler.getView(), factoredView.getView());
	});

	test("testInitRecordGuiCorrectSpecToFactory", function(assert) {
		let factoredGuiSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredGuiSpec.metadataId, "someMetadataId");

		let emptyPermissions = {
			write: [],
			read: []
		};
		assert.deepEqual(factoredGuiSpec.permissions, emptyPermissions);
	});

	test("testInitRecordGuiGetPresentationCalled", function(assert) {
		assert.strictEqual(factoredGui.getPresentationIdUsed(0), "somePresentationId");
		assert.strictEqual(factoredGui.getMetadataIdsUsedInData(0), "someMetadataId");
	});

	test("testInitRecordGuiGetPresentationAddedToFormView", function(assert) {
		assert.strictEqual(dependencies.searchHandlerViewFactory.getFactored(0)
			.getPresentationsAddedToSearchForm(0), factoredGui.getReturnedPresentations(0)
				.getView());
	});

	test("testInitRecordGuiStartedGui", function(assert) {
		assert.strictEqual(factoredGui.getInitCalled(), 1);
	});

	test("testInitSubscribedToDataChanges", function(assert) {
		let pubSub = factoredGui.pubSub;
		let subscribtions = pubSub.getSubscriptions();

		assert.strictEqual(subscribtions.length, 1);

		assert.strictEqual(subscribtions[0].type, "*");
		assert.stringifyEqual(subscribtions[0].path, []);
		assert.strictEqual(subscribtions[0].context, undefined);
		assert.strictEqual(subscribtions[0].functionToCall, searchHandler.handleMsg);
	});

	test("testInitRecordGuiErrorsShownInForm", function(assert) {
		setupDependencies();
		let recordGuiFactoryBroken = {
			factor: function(metadataId, data) {
				throw new Error("missing metadata");
			}
		};
		dependencies.recordGuiFactory = recordGuiFactoryBroken;
		startResultHandler();

		factoredView = dependencies.searchHandlerViewFactory.getFactored(0);

		assert.strictEqual(factoredView.getPresentationsAddedToSearchForm(0).textContent,
			"\"something went wrong, probably missing metadata, " + "Error: missing metadata\"");
		assert.ok(factoredView.getPresentationsAddedToSearchForm(1).textContent.length > 10);
	});

	test("testSearch", function(assert) {
		assertNumberOfCallsToGetDataValidated(assert, 0);
		assert.strictEqual(factoredView.getNoOfCallsToSetSearchRunning(), 0);

		searchHandler.search();

		assertNumberOfCallsToGetDataValidated(assert, 1);

		assert.strictEqual(factoredView.getNoOfCallsToSetSearchRunning(), 1);

		let ajaxCallSpec = dependencies.ajaxCallFactory.getSpec(0);
		assert.strictEqual(ajaxCallSpec.url, spec.searchLink.url);
		assert.strictEqual(ajaxCallSpec.requestMethod, spec.searchLink.requestMethod);
		assert.strictEqual(ajaxCallSpec.accept, spec.searchLink.accept);
		assert.strictEqual(ajaxCallSpec.contentType, undefined);

		assert.strictEqual(ajaxCallSpec.data, undefined);
		assert.stringifyEqual(ajaxCallSpec.parameters, {
			searchData: JSON.stringify(factoredGui.dataHolder.getData())
		});
		assert.strictEqual(ajaxCallSpec.loadMethod, searchHandler.handleSearchResult);


		let pubSub = factoredGui.pubSub;
		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);
		let addUpToMinNumberOfRepeatingMessage = messages[0].message;
		assert.strictEqual(addUpToMinNumberOfRepeatingMessage.data, "");
		assert.stringifyEqual(addUpToMinNumberOfRepeatingMessage.path, []);

		let addUpToMinNumberOfRepeatingType = messages[0].type;
		assert.strictEqual(addUpToMinNumberOfRepeatingType, "addUpToMinNumberOfRepeating");
	});

	test("testSearchSetsFocus", function(assert) {
		assert.strictEqual(setFocusCalledNoOfTimes, 0);

		searchHandler.search();

		assert.strictEqual(setFocusCalledNoOfTimes, 1);
	});

	test("testSearchSetsFocusNotSetIfNoMethodInSpec", function(assert) {
		spec.setFocus = undefined;
		startResultHandler();
		assert.strictEqual(setFocusCalledNoOfTimes, 0);

		searchHandler.search();

		assert.strictEqual(setFocusCalledNoOfTimes, 0);
	});

	const assertNumberOfCallsToGetDataValidated = function(assert, numberOfCalls) {
		assert.strictEqual(factoredGui.getDataValidated(), numberOfCalls);
	};

	test("testSearchThroughMessageSetValue", function(assert) {
		let done = assert.async();
		assertNumberOfCallsToGetDataValidated(assert, 0);
		searchHandler.setSearchTimeoutTime(1);
		searchHandler.handleMsg("dummyData", "x/y/z/setValue");
		assertNumberOfCallsToGetDataValidated(assert, 0);

		let ajaxCallFactory = dependencies.ajaxCallFactory;
		window.setTimeout(function() {
			assertNumberOfCallsToGetDataValidated(assert, 1);

			let ajaxCallSpec = ajaxCallFactory.getSpec(0);
			assert.strictEqual(ajaxCallSpec.url, spec.searchLink.url);
			assert.strictEqual(ajaxCallSpec.requestMethod, spec.searchLink.requestMethod);
			assert.strictEqual(ajaxCallSpec.accept, spec.searchLink.accept);
			assert.strictEqual(ajaxCallSpec.contentType, undefined);

			assert.strictEqual(ajaxCallSpec.data, undefined);
			assert.stringifyEqual(ajaxCallSpec.parameters, {
				searchData: JSON.stringify(factoredGui.dataHolder.getData())
			});
			assert.strictEqual(ajaxCallSpec.loadMethod, searchHandler.handleSearchResult);
			done();
		}, 50);
	});

	test("testSearchThroughMessageRemove", function(assert) {
		let done = assert.async();
		assertNumberOfCallsToGetDataValidated(assert, 0);
		searchHandler.setSearchTimeoutTime(1);
		searchHandler.handleMsg("dummyData", "x/y/z/remove");
		assertNumberOfCallsToGetDataValidated(assert, 0);

		window.setTimeout(function() {
			assertNumberOfCallsToGetDataValidated(assert, 1);
			done();
		}, 50);
	});

	test("testSearchDoesNotSearchAgainForRemoveOnValidate", function(assert) {
		let done = assert.async();

		assertNumberOfCallsToGetDataValidated(assert, 0);
		searchHandler.setSearchTimeoutTime(1);
		searchHandler.handleMsg("thisMessageWouldHaveBeenCreatedByValidate", "x/y/z/remove");
		searchHandler.search();
		assertNumberOfCallsToGetDataValidated(assert, 1);

		window.setTimeout(function() {
			assertNumberOfCallsToGetDataValidated(assert, 1);
			done();
		}, 50);
	});

	test("testSearchThroughMessageNotSetValueOrRemove", function(assert) {
		let done = assert.async();
		assertNumberOfCallsToGetDataValidated(assert, 0);
		searchHandler.setSearchTimeoutTime(1);
		searchHandler.handleMsg("dummyData", "x/y/z/other");
		assertNumberOfCallsToGetDataValidated(assert, 0);

		window.setTimeout(function() {
			assertNumberOfCallsToGetDataValidated(assert, 0);
			done();
		}, 50);
	});

	test("testSearchThroughMessageShouldOnlyCallOnceOnFastMultipleCalls", function(assert) {
		let done = assert.async();
		assertNumberOfCallsToGetDataValidated(assert, 0);
		searchHandler.setSearchTimeoutTime(1);
		searchHandler.handleMsg("dummyData", "x/y/z/setValue");
		searchHandler.handleMsg("dummyData", "x/y/z/setValue");
		searchHandler.handleMsg("dummyData", "x/y/z/setValue");
		searchHandler.handleMsg("dummyData", "x/y/z/setValue");
		assertNumberOfCallsToGetDataValidated(assert, 0);

		window.setTimeout(function() {
			assertNumberOfCallsToGetDataValidated(assert, 1);
			done();
		}, 50);
	});

	test("testSearchNotValidDataNoAjaxCall", function(assert) {
		factoredGui.setValidateAnswer(false);
		assertNumberOfCallsToGetDataValidated(assert, 0);
		searchHandler.search();
		assertNumberOfCallsToGetDataValidated(assert, 1);

		let ajaxCallSpec = dependencies.ajaxCallFactory.getSpec(0);
		assert.strictEqual(ajaxCallSpec, undefined);

		let pubSub = factoredGui.pubSub;
		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);
		let addUpToMinNumberOfRepeatingType = messages[0].type;
		assert.strictEqual(addUpToMinNumberOfRepeatingType, "addUpToMinNumberOfRepeating");
	});

	test("testSearchNotValidDoesNotAddUpToMinNoOfRepeatingForRemoveOnValidate", function(assert) {
		let done = assert.async();
		factoredGui.setValidateAnswer(false);

		assertNumberOfCallsToGetDataValidated(assert, 0);
		searchHandler.setSearchTimeoutTime(1);
		searchHandler.handleMsg("thisMessageWouldHaveBeenCreatedByValidate", "x/y/z/remove");
		searchHandler.search();
		assertNumberOfCallsToGetDataValidated(assert, 1);

		window.setTimeout(function() {
			assertNumberOfCallsToGetDataValidated(assert, 1);
			done();
		}, 50);
	});

	test("testHandleSearchResultCreatesAResultHandler", function(assert) {
		let answer = getJsonSearchRecordList();

		searchHandler.handleSearchResult(answer);
		let resultHandler = dependencies.resultHandlerFactory.getFactored(0);
		assert.strictEqual(resultHandler.type, "resultHandlerSpy");

		assert.strictEqual(factoredView.getAddedSearchResultToSearchResultHolder(0), resultHandler
			.getView());
	});

	const getJsonSearchRecordList = function() {
		return {
			responseText: JSON.stringify(CORATEST.searchRecordList)
		};
	}

	test("testHandleSearchResultDataFromAnswerPassedOnToResultHandler", function(assert) {
		let answer = getJsonSearchRecordList();

		searchHandler.handleSearchResult(answer);

		let resultHandlerSpec = dependencies.resultHandlerFactory.getSpec(0);
		assert.strictEqual(resultHandlerSpec.jsClient, dependencies.jsClient);
		assert.stringifyEqual(resultHandlerSpec.dataList, JSON.parse(answer.responseText).dataList);
	});

	test("testTriggerWhenResultIsChoosenPassedOnToResultHandler", function(assert) {
		searchHandler = CORA.searchHandler(dependencies, specTriggerWhenResultIsChoosen);
		let answer = getJsonSearchRecordList();

		searchHandler.handleSearchResult(answer);

		let resultHandlerSpec = dependencies.resultHandlerFactory.getSpec(0);
		assert.strictEqual(resultHandlerSpec.triggerWhenResultIsChoosen,
			specTriggerWhenResultIsChoosen.triggerWhenResultIsChoosen);
		assert.strictEqual(resultHandlerSpec.searchResultPresentationId, "somePresentationId");
	});

	test("testHandleSearchResultClearsPreviousResultFromView", function(assert) {
		let answer = getJsonSearchRecordList();
		assert.strictEqual(factoredView.getNoOfCallsToClearResultHolder(), 0);

		searchHandler.handleSearchResult(answer);

		assert.strictEqual(factoredView.getNoOfCallsToClearResultHolder(), 1);
	});

	test("testInitialSearchTimeoutTime", function(assert) {
		assert.strictEqual(searchHandler.getSearchTimeoutTime(), 800);
	});
});