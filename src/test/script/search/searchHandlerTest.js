/*
 * Copyright 2017, 2019 Uppsala University Library
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

QUnit.module("searchHandlerTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"searchHandlerViewFactory" : CORATEST.standardFactorySpy("searchHandlerViewSpy"),
			"recordGuiFactory" : CORATEST.standardFactorySpy("recordGuiSpy"),
			"ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy"),
			"resultHandlerFactory" : CORATEST.standardFactorySpy("resultHandlerSpy")
		};
		this.spec = {
			"metadataId" : "someMetadataId",
			"presentationId" : "somePresentationId",
			"searchLink" : {
				"requestMethod" : "GET",
				"rel" : "search",
				"url" : "http://epc.ub.uu.se/cora/rest/record/searchResult/coraTextSearch",
				"accept" : "application/vnd.uub.recordList+json"
			}
		};

		this.specTriggerWhenResultIsChoosen = {
			"metadataId" : "someMetadataId",
			"presentationId" : "somePresentationId",
			"searchLink" : {
				"requestMethod" : "GET",
				"rel" : "search",
				"url" : "http://epc.ub.uu.se/cora/rest/record/searchResult/coraTextSearch",
				"accept" : "application/vnd.uub.recordList+json"
			},
			"triggerWhenResultIsChoosen" : {
				"some" : "thing"
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	assert.strictEqual(searchHandler.type, "searchHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	assert.strictEqual(searchHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	assert.strictEqual(searchHandler.getSpec(), this.spec);
});

QUnit.test("testInitViewCreatedUsingFactory", function(assert) {
	CORA.searchHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.searchHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.type, "searchHandlerViewSpy");
});

QUnit.test("testInitViewSpec", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredSpec = this.dependencies.searchHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.searchMethod, searchHandler.search);
});

QUnit.test("testGetView", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.searchHandlerViewFactory.getFactored(0);
	assert.strictEqual(searchHandler.getView(), factoredView.getView());
});

QUnit.test("testInitRecordGuiFactoryCalled", function(assert) {
	CORA.searchHandler(this.dependencies, this.spec);
	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "someMetadataId");
	assert.deepEqual(factoredSpec.permissions.write, []);
	assert.deepEqual(factoredSpec.permissions.read, []);
});

QUnit.test("testInitRecordGuiGetPresentationCalled", function(assert) {
	CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getPresentationIdUsed(0), "somePresentationId");
	assert.strictEqual(factoredGui.getMetadataIdsUsedInData(0), "someMetadataId");
});

QUnit.test("testInitRecordGuiGetPresentationAddedToFormView", function(assert) {
	CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(this.dependencies.searchHandlerViewFactory.getFactored(0)
			.getPresentationsAddedToSearchForm(0), factoredGui.getReturnedPresentations(0)
			.getView());
});

QUnit.test("testInitRecordGuiStartedGui", function(assert) {
	CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getInitCalled(), 1);
});

QUnit.test("testInitSubscribedToDataChanges", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	var pubSub = factoredGui.pubSub;
	var subscribtions = pubSub.getSubscriptions();

	assert.strictEqual(subscribtions.length, 1);

	assert.strictEqual(subscribtions[0].type, "*");
	assert.stringifyEqual(subscribtions[0].path, {});
	assert.strictEqual(subscribtions[0].context, undefined);
	assert.strictEqual(subscribtions[0].functionToCall, searchHandler.handleMsg);
});

QUnit.test("testInitRecordGuiErrorsShownInForm", function(assert) {
	var recordGuiFactoryBroken = {
		"factor" : function(metadataId, data) {
			throw new Error("missing metadata");
		}
	};
	this.dependencies.recordGuiFactory = recordGuiFactoryBroken;
	CORA.searchHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.searchHandlerViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getPresentationsAddedToSearchForm(0).textContent,
			"\"something went wrong, probably missing metadata, " + "Error: missing metadata\"");
	assert.ok(factoredView.getPresentationsAddedToSearchForm(1).textContent.length > 10);
});

QUnit.test("testSearch", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	searchHandler.search();
	assert.strictEqual(factoredGui.getDataValidated(), 1);

	var ajaxCallSpec = this.dependencies.ajaxCallFactory.getSpec(0);
	assert.strictEqual(ajaxCallSpec.url, this.spec.searchLink.url);
	assert.strictEqual(ajaxCallSpec.requestMethod, this.spec.searchLink.requestMethod);
	assert.strictEqual(ajaxCallSpec.accept, this.spec.searchLink.accept);
	assert.strictEqual(ajaxCallSpec.contentType, undefined);

	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.stringifyEqual(ajaxCallSpec.parameters, {
		"searchData" : JSON.stringify(factoredGui.dataHolder.getData())
	});
	assert.strictEqual(ajaxCallSpec.loadMethod, searchHandler.handleSearchResult);
	

	var pubSub = factoredGui.pubSub;
	var messages = pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	var addUpToMinNumberOfRepeatingMessage = messages[0].message;
	assert.strictEqual(addUpToMinNumberOfRepeatingMessage.data, "");
	assert.stringifyEqual(addUpToMinNumberOfRepeatingMessage.path, {});
	
	var addUpToMinNumberOfRepeatingType= messages[0].type;
	assert.strictEqual(addUpToMinNumberOfRepeatingType, "addUpToMinNumberOfRepeating");
});

QUnit.test("testSearchThroughMessageSetValue", function(assert) {
	var done = assert.async();
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	searchHandler.handleMsg("dummyData", "x/y/z/setValue");
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	
	var ajaxCallFactory = this.dependencies.ajaxCallFactory;
	var spec = this.spec;

	window.setTimeout(function() {
		assert.strictEqual(factoredGui.getDataValidated(), 1);

		var ajaxCallSpec = ajaxCallFactory.getSpec(0);
		assert.strictEqual(ajaxCallSpec.url, spec.searchLink.url);
		assert.strictEqual(ajaxCallSpec.requestMethod, spec.searchLink.requestMethod);
		assert.strictEqual(ajaxCallSpec.accept, spec.searchLink.accept);
		assert.strictEqual(ajaxCallSpec.contentType, undefined);

		assert.strictEqual(ajaxCallSpec.data, undefined);
		assert.stringifyEqual(ajaxCallSpec.parameters, {
			"searchData" : JSON.stringify(factoredGui.dataHolder.getData())
		});
		assert.strictEqual(ajaxCallSpec.loadMethod, searchHandler.handleSearchResult);
		done();
	}, 1050);
});

QUnit.test("testSearchThroughMessageRemove", function(assert) {
	var done = assert.async();
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	searchHandler.handleMsg("dummyData", "x/y/z/remove");
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	
	window.setTimeout(function() {
		assert.strictEqual(factoredGui.getDataValidated(), 1);
		
		done();
	}, 600);
});

QUnit.test("testSearchDoesNotSearchAgainForRemoveOnValidate", function(assert) {
	var done = assert.async();
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredGui.getDataValidated(), 0);
	searchHandler.handleMsg("thisMessageWouldHaveBeenCreatedByValidate", "x/y/z/remove");
	searchHandler.search();
	assert.strictEqual(factoredGui.getDataValidated(), 1);
	
	
	window.setTimeout(function() {
		assert.strictEqual(factoredGui.getDataValidated(), 1);
		
		done();
	}, 600);
});

QUnit.test("testSearchThroughMessageNotSetValueOrRemove", function(assert) {
	var done = assert.async();
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	searchHandler.handleMsg("dummyData", "x/y/z/other");
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	
	window.setTimeout(function() {
		assert.strictEqual(factoredGui.getDataValidated(), 0);
		
		done();
	}, 600);
});

QUnit.test("testSearchThroughMessageShouldOnlyCallOnceOnFastMultipleCalls", function(assert) {
	var done = assert.async();
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	searchHandler.handleMsg("dummyData", "x/y/z/setValue");
	searchHandler.handleMsg("dummyData", "x/y/z/setValue");
	searchHandler.handleMsg("dummyData", "x/y/z/setValue");
	searchHandler.handleMsg("dummyData", "x/y/z/setValue");
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	
	window.setTimeout(function() {
		assert.strictEqual(factoredGui.getDataValidated(), 1);
		
		done();
	}, 600);
});

QUnit.test("testSearchNotValidDataNoAjaxCall", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	factoredGui.setValidateAnswer(false);
	assert.strictEqual(factoredGui.getDataValidated(), 0);
	searchHandler.search();
	assert.strictEqual(factoredGui.getDataValidated(), 1);

	var ajaxCallSpec = this.dependencies.ajaxCallFactory.getSpec(0);
	assert.strictEqual(ajaxCallSpec, undefined);
	
	var pubSub = factoredGui.pubSub;
	var messages = pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	var addUpToMinNumberOfRepeatingType= messages[0].type;
	assert.strictEqual(addUpToMinNumberOfRepeatingType, "addUpToMinNumberOfRepeating");
});


QUnit.test("testSearchNotValidDoesNotAddUpToMinNoOfRepeatingForRemoveOnValidate", function(assert) {
	var done = assert.async();
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	factoredGui.setValidateAnswer(false);

	assert.strictEqual(factoredGui.getDataValidated(), 0);
	searchHandler.handleMsg("thisMessageWouldHaveBeenCreatedByValidate", "x/y/z/remove");
	searchHandler.search();
	assert.strictEqual(factoredGui.getDataValidated(), 1);
	
	
	window.setTimeout(function() {
		assert.strictEqual(factoredGui.getDataValidated(), 1);
		
		done();
	}, 600);
});

QUnit.test("testHandleSearchResultCreatesAResultHandler", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var answer = {
		"responseText" : JSON.stringify(CORATEST.searchRecordList)
	};
	searchHandler.handleSearchResult(answer);
	var resultHandler = this.dependencies.resultHandlerFactory.getFactored(0);
	assert.strictEqual(resultHandler.type, "resultHandlerSpy");

	var factoredView = this.dependencies.searchHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedSearchResultToSearchResultHolder(0), resultHandler
			.getView());
});

QUnit.test("testHandleSearchResultDataFromAnswerPassedOnToResultHandler", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var answer = {
		"responseText" : JSON.stringify(CORATEST.searchRecordList)
	};
	searchHandler.handleSearchResult(answer);

	var resultHandlerSpec = this.dependencies.resultHandlerFactory.getSpec(0);
	assert.strictEqual(resultHandlerSpec.jsClient, this.dependencies.jsClient);
	assert.stringifyEqual(resultHandlerSpec.dataList, JSON.parse(answer.responseText).dataList);
});

QUnit.test("testTriggerWhenResultIsChoosenPassedOnToResultHandler", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.specTriggerWhenResultIsChoosen);
	var answer = {
		"responseText" : JSON.stringify(CORATEST.searchRecordList)
	};
	searchHandler.handleSearchResult(answer);

	var resultHandlerSpec = this.dependencies.resultHandlerFactory.getSpec(0);
	assert.strictEqual(resultHandlerSpec.triggerWhenResultIsChoosen,
			this.specTriggerWhenResultIsChoosen.triggerWhenResultIsChoosen);
});

QUnit.test("testHandleSearchResultClearsPreviousResultFromView", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var answer = {
		"responseText" : JSON.stringify(CORATEST.searchRecordList)
	};
	var factoredView = this.dependencies.searchHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getNoOfCallsToClearResultHolder(), 0);

	searchHandler.handleSearchResult(answer);

	assert.strictEqual(factoredView.getNoOfCallsToClearResultHolder(), 1);
});
