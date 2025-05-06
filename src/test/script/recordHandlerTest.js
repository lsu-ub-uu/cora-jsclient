/*
 * Copyright 2016, 2017, 2020, 2021, 2024 Uppsala University Library
 * Copyright 2016, 2017, 2023, 2024, 2025 Olov McKie
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

QUnit.module("recordHandlerTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let spec;
	let specForNew;
	let specForNewWithData;
	let specForNewWithChoiceValidationType;
	let specForNewList;
	let specForListWithSearchResultPresentationId;

	let textProvider;
	let record;
	let recordWithoutUpdateOrDeleteLink;
	let recordWithoutDeleteLink;
	let recordWithReadIncomingLinks = CORATEST.recordWithReadIncomingLinks;
	let recordWithIndexLink;
	let recordWithoutIndexLink;
	let recordWithMetadata;
	let recordGuiFactorySpy;
	let recordHandlerViewFactorySpy;
	let ajaxCallFactorySpy;

	hooks.beforeEach(() => {
		textProvider = CORATEST.textProviderSpy();
		record = CORATEST.recordWithAllLinks;
		recordWithoutUpdateOrDeleteLink = CORATEST.recordWithoutUpdateOrDeleteLink;
		recordWithoutDeleteLink = CORATEST.recordWithoutDeleteLink;
		recordWithReadIncomingLinks = CORATEST.recordWithReadIncomingLinks;
		recordWithIndexLink = CORATEST.recordWithIndexLink;
		recordWithoutIndexLink = CORATEST.recordWithoutIndexLink;
		recordWithMetadata = CORATEST.recordWithMetadata;

		recordGuiFactorySpy = CORATEST.standardFactorySpy("recordGuiSpy");

		recordHandlerViewFactorySpy = CORATEST.standardFactorySpy("recordHandlerViewSpy");
		ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		setupDependencies();
		setupSpec();
		setupSpecForNew();
		setupSpecForNewWithData();
		setupSpecForNewWithChoiceValidationType();
		setupSpecForNewList();
		setupSpecForListWithSearchResultPresentationId();
	});
	hooks.afterEach(() => {
		//no after
	});

	const setupDependencies = function() {
		dependencies = {
			globalFactories: {
				incomingLinksListHandlerFactory: CORATEST
					.standardFactorySpy("incomingLinksListHandlerSpy")
			},
			textProvider: textProvider,
			recordHandlerFactory: CORATEST.standardFactorySpy("recordHandlerSpy"),
			ajaxCallFactory: ajaxCallFactorySpy,
			recordGuiFactory: recordGuiFactorySpy,
			recordHandlerViewFactory: recordHandlerViewFactorySpy,
			managedGuiItemFactory: CORATEST.standardFactorySpy("managedGuiItemSpy"),
			indexHandlerFactory: CORATEST.standardFactorySpy("indexHandlerSpy"),
			questionFactory: CORATEST.standardFactorySpy("questionSpy"),
			busyFactory: CORATEST.standardFactorySpy("busySpy")
		};
	};

	const setupSpec = function() {
		spec = {
			fetchLatestDataFromServer: "true",
			partOfList: "false",
			createNewRecord: "false",
			record: record,
			jsClient: CORATEST.jsClientSpy()
		};
	};

	const setupSpecForNew = function() {
		specForNew = {
			fetchLatestDataFromServer: "false",
			partOfList: "false",
			createNewRecord: "true",
			recordTypeRecordIdForNew: "recordType",
			jsClient: CORATEST.jsClientSpy()
		};
	};

	const setupSpecForNewWithData = function() {
		specForNewWithData = {
			fetchLatestDataFromServer: "false",
			partOfList: "false",
			createNewRecord: "true",
			recordTypeRecordIdForNew: "recordType",
			record: record.data,
			jsClient: CORATEST.jsClientSpy()
		};
	};

	const setupSpecForNewWithChoiceValidationType = function() {
		specForNewWithChoiceValidationType = {
			fetchLatestDataFromServer: "false",
			partOfList: "false",
			createNewRecord: "true",
			recordTypeRecordIdForNew: "text",
			jsClient: CORATEST.jsClientSpy()
		};

	};
	
	const setupSpecForNewList = function() {
		specForNewList = {
			fetchLatestDataFromServer: "false",
			partOfList: "true",
			createNewRecord: "true",
			recordTypeRecordIdForNew: "recordType",
			record: record.data,
			jsClient: CORATEST.jsClientSpy()
		};
	};
	
	const setupSpecForListWithSearchResultPresentationId = function() {
		specForListWithSearchResultPresentationId = {
			fetchLatestDataFromServer: "false",
			partOfList: "true",
			searchResultPresentationId: "somePresentationId",
			createNewRecord: "true",
			recordTypeRecordIdForNew: "recordType",
			record: record.data,
			jsClient: CORATEST.jsClientSpy()
		};
	};

	const answerCall = function(no) {
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(no);
		let jsonRecord = JSON.stringify({
			record: record
		});
		let answer = {
			spec: ajaxCallSpy0.getSpec(),
			responseText: jsonRecord
		};
		ajaxCallSpy0.getSpec().loadMethod(answer);
	};
	
	const answerCallWithoutUpdateOrDeleteLink = function(no) {
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(no);
		let jsonRecord = JSON.stringify({
			record: recordWithoutUpdateOrDeleteLink
		});
		let answer = {
			spec: ajaxCallSpy0.getSpec(),
			responseText: jsonRecord
		};
		ajaxCallSpy0.getSpec().loadMethod(answer);
	};

	const answerCallWithoutDeleteLink = function(no) {
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(no);
		let jsonRecord = JSON.stringify({
			record: recordWithoutDeleteLink
		});
		let answer = {
			spec: ajaxCallSpy0.getSpec(),
			responseText: jsonRecord
		};
		ajaxCallSpy0.getSpec().loadMethod(answer);
	};

	const answerCallWithIncomingLinks = function(no) {
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(no);
		let jsonRecord = JSON.stringify({
			record: recordWithReadIncomingLinks
		});
		let answer = {
			spec: ajaxCallSpy0.getSpec(),
			responseText: jsonRecord
		};
		ajaxCallSpy0.getSpec().loadMethod(answer);
	};

	test("init", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);

		assert.strictEqual(recordHandler.type, "recordHandler");
		assert.strictEqual(recordHandler.getDataIsChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getChanged(), false);
	});

	test("testGetDependencies", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		assert.strictEqual(recordHandler.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		assert.strictEqual(recordHandler.getSpec(), spec);
	});

	test("initTestManagedGuiItemFactoryCalled", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);

		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);
		let managedGuiItemSpec = managedGuiItemSpy.getSpec(0);
		assert.strictEqual(managedGuiItemSpec.activateMethod, spec.jsClient.showView);
		assert.strictEqual(managedGuiItemSpec.removeMethod, spec.jsClient.viewRemoved);
		assert.strictEqual(managedGuiItemSpec.callOnMetadataReloadMethod,
			recordHandler.reloadForMetadataChanges);

		assert.notStrictEqual(managedGuiItemSpec.callMethodAfterShowWorkView, undefined);
		assert.strictEqual(managedGuiItemSpec.callMethodAfterShowWorkView,
			recordHandler.callMethodAfterShowWorkView);

		assert.ok(managedGuiItemSpy != undefined);
	});

	test("testGetManagedGuiItem", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		assert.strictEqual(recordHandler.getManagedGuiItem(), managedGuiItem);
	});

	test("testInitRecordHandlerViewSpec", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let usedSpec = recordHandlerViewFactorySpy.getSpec(0);
		assert.strictEqual(usedSpec.extraClassName, "recordHandler");
		// TODO: test that buttons are added on init in view...
		assert.strictEqual(usedSpec.showDataMethod, recordHandler.showData);
		assert.strictEqual(usedSpec.copyDataMethod, recordHandler.copyData);
		assert.strictEqual(usedSpec.showIncomingLinksMethod, recordHandler.showIncomingLinks);

		let texts = {
			showDefinitionViewer: "translated_theClient_showDefinitionViewerButtonText",
			showDefinitionViewerValidationType: "translated_theClient_showDefinitionViewerValidationTypeButtonText",
			showDefinitionViewerRecordType: "translated_theClient_showDefinitionViewerRecordTypeButtonText",
			showRecursiveDelete: "translated_theClient_showRecursiveDeleteButtonText"
		};
		assert.deepEqual(usedSpec.texts, texts);

	});

	test("testInitRecordHandlerViewFormFactoredAndAdded", function(assert) {
		CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		let presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
		assert.strictEqual(presentationFormIdUsed, "recordTypePGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let factoredForm = factoredRecordGui.getReturnedPresentations(0);
		assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(0));
	});

	test("testInitRecordHandlerViewNewFormFactoredAndAdded", function(assert) {
		CORA.recordHandler(dependencies, specForNew);

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		let presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
		assert.strictEqual(presentationFormIdUsed, "recordTypeNewPGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let factoredForm = factoredRecordGui.getReturnedPresentations(0);
		assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(0));
	});

	test("testInitRecordHandlerViewViewFactoredAndAdded", function(assert) {
		CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		let presentationViewIdUsed = factoredRecordGui.getPresentationIdUsed(1);
		assert.strictEqual(presentationViewIdUsed, "recordTypeViewPGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let factoredView = factoredRecordGui.getReturnedPresentations(1);
		assert.strictEqual(factoredView.getView(), recordHandlerViewSpy.getAddedShowView(0));
	});

	test("testInitRecordHandlerViewMenuFactoredAndAdded", function(assert) {
		CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		let presentationMenuViewIdUsed = factoredRecordGui.getPresentationIdUsed(2);
		assert.strictEqual(presentationMenuViewIdUsed, "recordTypeMenuPGroup");

		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);
		let factoredView = factoredRecordGui.getReturnedPresentations(2);
		assert.strictEqual(factoredView.getView(), managedGuiItemSpy.getAddedMenuPresentation(0));
	});

	test("testInitRecordHandlerViewButtonCreated", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		answerCall(0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);

		let deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);
		assert.strictEqual(deleteButtonSpec.text, "DELETE");
		assert.strictEqual(deleteButtonSpec.className, "delete");
		assert.strictEqual(deleteButtonSpec.onclickMethod, recordHandler.shouldRecordBeDeleted);

		let updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
		assert.strictEqual(updateButtonSpec.text, "UPDATE");
		assert.strictEqual(updateButtonSpec.className, "update");
		assert.strictEqual(updateButtonSpec.onclickMethod, recordHandler.sendUpdateDataToServer);
		assert.strictEqual(managedGuiItem.getSendDataToServer(), recordHandler.sendUpdateDataToServer);

	});

	test("testShowData", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		let data = {
			data: "<span>A new value</span>",
			path: []
		};
		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);
		factoredRecordGui.dataHolder.setData(data);
		recordHandler.showData();
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		let messageHolder = managedGuiItem.getAddedWorkPresentation(0);

		let busy = dependencies.busyFactory.getFactored(0);
		let busyView = busy.getView();
		let busyAddedView = managedGuiItem.getAddedWorkPresentation(2);
		assert.strictEqual(busyAddedView, busyView);
		assert.strictEqual(busy.getHideWithEffectCalledNoOfTimes(), 1);

		assert.strictEqual(messageHolder.className, "messageHolder");
		// TODO: move messageHolder to view...
		let firstChild = messageHolder.childNodes[0];
		assert.strictEqual(firstChild.className, "message info");
		let message = firstChild.childNodes[1];
		assert.strictEqual(message.innerHTML, '{\"data\":\"&lt;span&gt;A new value&lt;/span&gt;\",\"path\":[]}');
		let messageText = message.childNodes[0];
		assert.strictEqual(messageText.textContent, '{\"data\":\"<span>A new value</span>\",\"path\":[]}');

	});

	test("testCopyAsNew", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		recordHandler.copyData();

		let dataHolderData = dependencies.recordGuiFactory.getFactored(0).dataHolder
			.getDataWithActionLinks();

		let expectedSpec = {
			fetchLatestDataFromServer: "false",
			partOfList: "false",
			createNewRecord: "true",
			record: dataHolderData,
			jsClient: spec.jsClient,
			recordTypeRecordIdForNew: "recordType"
		};

		let createdSpecForCopy = dependencies.recordHandlerFactory.getSpec(0);
		assert.strictEqual(createdSpecForCopy.fetchLatestDataFromServer,
			expectedSpec.fetchLatestDataFromServer);
		assert.strictEqual(createdSpecForCopy.partOfList, expectedSpec.partOfList);
		assert.strictEqual(createdSpecForCopy.createNewRecord, expectedSpec.createNewRecord);
		assert.stringifyEqual(createdSpecForCopy.record, expectedSpec.record);
		assert.strictEqual(createdSpecForCopy.jsClient, expectedSpec.jsClient);
		assert.strictEqual(createdSpecForCopy.recordTypeRecordIdForNew,
			expectedSpec.recordTypeRecordIdForNew);
	});

	test("testCopyAsNewManagedGuiItemAddedToJsClient", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		recordHandler.copyData();
		let factoredRecordHandler = dependencies.recordHandlerFactory.getFactored(0);
		assert.strictEqual(spec.jsClient.getAddedGuiItem(0), factoredRecordHandler
			.getManagedGuiItem());
	});

	test("testCopyAsNewManagedGuiItemShownInJsClient", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		recordHandler.copyData();
		let factoredRecordHandler = dependencies.recordHandlerFactory.getFactored(0);
		assert.strictEqual(spec.jsClient.getViewShowingInWorkView(0), factoredRecordHandler
			.getManagedGuiItem());
	});

	test("initTestDataFetchedFromServer", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);

		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url,
			"https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType");
		assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.record+json");
		assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.processFetchedRecord);


		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);
		assert.strictEqual(managedGuiItemSpy.getSetFocusCalledNoOfTimes(), 0);
		answerCall(0);
		assert.strictEqual(managedGuiItemSpy.getSetFocusCalledNoOfTimes(), 1);
	});

	test("initTestUsePrefetchedData", function(assert) {
		spec.fetchLatestDataFromServer = false;
		CORA.recordHandler(dependencies, spec);
		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);

		assert.strictEqual(ajaxCallSpy, undefined);
	});

	test("testInitSubscriptions",
		function(assert) {
			let recordHandler = CORA.recordHandler(dependencies, spec);
			answerCall(0);

			let subscriptions = dependencies.recordGuiFactory.getFactored(0).pubSub
				.getSubscriptions();
			assert.deepEqual(subscriptions.length, 1);

			let firstSubscription = subscriptions[0];
			assert.strictEqual(firstSubscription.type, "*");
			assert.deepEqual(firstSubscription.path, []);
			assert.ok(firstSubscription.functionToCall === recordHandler.handleMsg);
		});

	test("testHandleMessage", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);

		let data = {
			data: "A new value",
			path: []
		};
		recordHandler.handleMsg(data, "setValue");
		assert.strictEqual(recordHandler.getDataIsChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getChanged(), false);

		let data1 = {
			data: "",
			path: []
		};
		recordHandler.handleMsg(data1, "initComplete");
		assert.strictEqual(recordHandler.getDataIsChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getChanged(), false);

		recordHandler.handleMsg(data, "setValue");
		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getChanged(), true);
	});

	test("testHandleMessageSetValueSetsDataChanged", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);

		let data = {
			data: "A new value",
			path: []
		};
		recordHandler.handleMsg(data, "setValue");
		assert.strictEqual(recordHandler.getDataIsChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getNoOfChangedCalls(), 0);

		let data1 = {
			data: "",
			path: []
		};
		recordHandler.handleMsg(data1, "initComplete");

		assert.strictEqual(recordHandler.getDataIsChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getNoOfChangedCalls(), 0);

		recordHandler.handleMsg(data, "add");
		assert.strictEqual(recordHandler.getDataIsChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getNoOfChangedCalls(), 0);

		recordHandler.handleMsg(data, "setValue");
		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getNoOfChangedCalls(), 1);

		recordHandler.handleMsg(data, "remove");
		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getNoOfChangedCalls(), 2);

		recordHandler.handleMsg(data, "move");
		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getNoOfChangedCalls(), 3);

		recordHandler.handleMsg(data, "initComplete");
		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getNoOfChangedCalls(), 3);

		recordHandler.handleMsg(data, "viewJustMadeVisible");
		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getNoOfChangedCalls(), 3);
	});

	test("testUpdateCall", function(assert) {
		spec.createNewRecord = "false";
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypePGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
		updateButtonSpec.onclickMethod();

		assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(1);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url,
			"https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType");
		assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.record+json");
		assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.cora.record+json");
		assert.strictEqual(ajaxCallSpec.data, "{}");
		assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.resetViewsAndProcessFetchedRecord);

	});

	test("testUpdateThroughPubSubCall", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

		let data = {
			data: "",
			path: []
		};
		recordHandler.handleMsg(data, "updateRecord");

		assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(1);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url,
			"https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType");
		assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.record+json");
		assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.cora.record+json");
		assert.strictEqual(ajaxCallSpec.data, "{}");
		assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.resetViewsAndProcessFetchedRecord);
	});

	test("testUpdateDataIsChanged", function(assert) {
		spec.createNewRecord = "false";
		let recordHandler = CORA.recordHandler(dependencies, spec);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);
		answerCall(0);

		let data1 = {
			data: "",
			path: []
		};
		recordHandler.handleMsg(data1, "initComplete");
		let data = {
			data: "A new value",
			path: []
		};
		recordHandler.handleMsg(data, "setValue");
		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getChanged(), true);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
		updateButtonSpec.onclickMethod();
		answerCall(1);

		assert.strictEqual(recordHandler.getDataIsChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getChanged(), false);

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		assert.strictEqual(managedGuiItem.getMenuViewCleared(), 2);
		let item = managedGuiItem.getAddedMenuPresentation(1);
		assert.strictEqual(item.nodeName, "SPAN");
		assert.strictEqual(managedGuiItem.getAddedMenuPresentation(2), undefined);
	});

	test("testUpdateCallValidationError", function(assert) {
		spec.createNewRecord = "false";
		CORA.recordHandler(dependencies, spec);
		answerCall(0);
		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);
		factoredRecordGui.setValidateAnswer(false);
		assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypePGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
		updateButtonSpec.onclickMethod();

		assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(1);
		assert.strictEqual(ajaxCallSpy, undefined);
	});

	test("testNoUpdateButtonAndEditFormWhenNoUpdateLink", function(assert) {
		spec.createNewRecord = "false";
		spec.record = recordWithoutUpdateOrDeleteLink;

		CORA.recordHandler(dependencies, spec);
		answerCallWithoutUpdateOrDeleteLink(0);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "textViewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "textGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "textMenuPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "textGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), undefined);
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), undefined);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);

		let editViewChild = recordHandlerViewSpy.getAddedEditView(0);
		assert.strictEqual(editViewChild, undefined);

		let showViewChild = recordHandlerViewSpy.getAddedShowView(0);
		assert.strictEqual(showViewChild.className, "presentationStub");

		let updateButtonSpec = recordHandlerViewSpy.getAddedButton(0);
		assert.strictEqual(updateButtonSpec, undefined);
	});

	test("testDeleteQuestion", function(assert) {
		spec.createNewRecord = "false";
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);

		deleteButtonSpec.onclickMethod();

		let questionSpec = dependencies.questionFactory.getSpec(0);
		let questionSpy = dependencies.questionFactory.getFactored(0);


		let expectedQuestionSpec = {
			text: "Är du säker på att du vill ta bort posten?",
			buttons: [{
				text: "Nej"
			}, {
				text: "Ja",
				onclickFunction: recordHandler.sendDeleteDataToServer
			}]
		};
		assert.deepEqual(questionSpec, expectedQuestionSpec);

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		let addedQuestionView = managedGuiItem.getAddedWorkPresentation(3);
		assert.strictEqual(questionSpy.getView(), addedQuestionView);
	});

	test("testDeleteCall", function(assert) {
		spec.createNewRecord = "false";
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(1);
		assert.strictEqual(ajaxCallSpy, undefined, "no delete call should have been made yet");

		recordHandler.sendDeleteDataToServer();

		let ajaxCallSpy4 = ajaxCallFactorySpy.getFactored(1);
		let ajaxCallSpec = ajaxCallSpy4.getSpec();
		assert.strictEqual(ajaxCallSpec.url,
			"https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType");
		assert.strictEqual(ajaxCallSpec.requestMethod, "DELETE");
		assert.strictEqual(ajaxCallSpec.accept, undefined);
		assert.strictEqual(ajaxCallSpec.contentType, undefined);
		assert.strictEqual(ajaxCallSpec.data, undefined);
		assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.afterDelete);

		assert.strictEqual(managedGuiItem.getRemoved(), 0);
		answerCall(1);

		assert.strictEqual(managedGuiItem.getRemoved(), 1);
	});

	test("testDeleteCallNoParentsForViews", function(assert) {
		spec.createNewRecord = "false";
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);
		deleteButtonSpec.onclickMethod();

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		recordHandler.sendDeleteDataToServer();
		assert.strictEqual(managedGuiItem.getRemoved(), 0);
		answerCall(1);

		assert.strictEqual(managedGuiItem.getRemoved(), 1);
	});

	test("testNoDeleteButtonWhenNoDeleteLink", function(assert) {
		spec.createNewRecord = "false";
		spec.record = recordWithoutDeleteLink;

		CORA.recordHandler(dependencies, spec);
		answerCallWithoutDeleteLink(0);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "textSystemOnePGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "textSystemOneGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "textViewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "textGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "textMenuPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "textGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let updateButtonSpec = recordHandlerViewSpy.getAddedButton(0);
		assert.strictEqual(updateButtonSpec.className, "update");
	});

	test("initCheckRightGuiCreatedNewCheckSpec", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, specForNew);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItem.getChanged(), true);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);
		assert.strictEqual(ajaxCallSpy, undefined, "no call to server on new record");

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "recordTypeNewGroup");
		assert.strictEqual(factoredSpec.dataDivider, undefined);

		let emptyPermissions = {
			write: [],
			read: []
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("initCheckRightGuiCreatedNew", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, specForNew);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItem.getChanged(), true);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);
		assert.strictEqual(ajaxCallSpy, undefined, "no call to server on new record");

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeNewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeNewGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(3), undefined);
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(3), undefined);

		let item = managedGuiItem.getAddedMenuPresentation(0);
		assert.strictEqual(item.nodeName, "SPAN");
	});

	test("initCheckRightGuiCreatedNewWithData", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, specForNewWithData);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItem.getChanged(), true);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);
		assert.strictEqual(ajaxCallSpy, undefined, "no call to server on new record");

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeNewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeNewGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(3), undefined);
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(3), undefined);

		let item = managedGuiItem.getAddedMenuPresentation(0);
		assert.strictEqual(item.nodeName, "SPAN");
	});

	test("initCheckRightGuiCreatedNewCheckSpecWithData", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, specForNewWithData);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItem.getChanged(), true);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);
		assert.strictEqual(ajaxCallSpy, undefined, "no call to server on new record");

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "recordTypeNewGroup");
		assert.strictEqual(factoredSpec.dataDivider, undefined);

		let emptyPermissions = {
			write: [],
			read: []
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("initCheckRightGuiCreatedNewWithChoiceValidationType", function(assert) {
		CORA.recordHandler(dependencies, specForNewWithChoiceValidationType);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		let questionSpec = dependencies.questionFactory.getSpec(0);
		let questionSpy = dependencies.questionFactory.getFactored(0);


		assert.strictEqual(questionSpec.text, "Välj validation type för posten!");
		assert.strictEqual(questionSpec.buttons[0].text, "coraText");
		assert.strictEqual(questionSpec.buttons[1].text, "textSystemOne");
		assert.strictEqual(questionSpec.buttons[2].text, "text");

		let addedQuestionView = managedGuiItem.getAddedWorkPresentation(3);
		assert.strictEqual(questionSpy.getView(), addedQuestionView);

		questionSpec.buttons[0].onclickFunction();


		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "coraTextNewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "coraTextNewGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "textViewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "textGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "textMenuPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "textGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(3), undefined);
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(3), undefined);

		let item = managedGuiItem.getAddedMenuPresentation(0);
		assert.strictEqual(item.nodeName, "SPAN");
	});

	test("initCheckRightGuiCreatedNewWithChoiceValidationTypeOtherButton", function(assert) {
		CORA.recordHandler(dependencies, specForNewWithChoiceValidationType);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		let questionSpec = dependencies.questionFactory.getSpec(0);
		let questionSpy = dependencies.questionFactory.getFactored(0);


		assert.strictEqual(questionSpec.text, "Välj validation type för posten!");
		assert.strictEqual(questionSpec.buttons[0].text, "coraText");
		assert.strictEqual(questionSpec.buttons[1].text, "textSystemOne");
		assert.strictEqual(questionSpec.buttons[2].text, "text");

		let addedQuestionView = managedGuiItem.getAddedWorkPresentation(3);
		assert.strictEqual(questionSpy.getView(), addedQuestionView);

		questionSpec.buttons[2].onclickFunction();


		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "textNewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "textNewGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "textViewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "textGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "textMenuPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "textGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(3), undefined);
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(3), undefined);

		let item = managedGuiItem.getAddedMenuPresentation(0);
		assert.strictEqual(item.nodeName, "SPAN");
	});

	test("testValidationTypeQuestion", function(assert) {
		spec.createNewRecord = "false";
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);

		deleteButtonSpec.onclickMethod();

		let questionSpec = dependencies.questionFactory.getSpec(0);
		let questionSpy = dependencies.questionFactory.getFactored(0);


		let expectedQuestionSpec = {
			text: "Är du säker på att du vill ta bort posten?",
			buttons: [{
				text: "Nej"
			}, {
				text: "Ja",
				onclickFunction: recordHandler.sendDeleteDataToServer
			}]
		};
		assert.deepEqual(questionSpec, expectedQuestionSpec);

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		let addedQuestionView = managedGuiItem.getAddedWorkPresentation(3);
		assert.strictEqual(questionSpy.getView(), addedQuestionView);
	});

	test("testValidationCall", function(assert) {
		spec.createNewRecord = "false";
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(1);
		assert.strictEqual(ajaxCallSpy, undefined, "no delete call should have been made yet");

		recordHandler.sendDeleteDataToServer();

		let ajaxCallSpy4 = ajaxCallFactorySpy.getFactored(1);
		let ajaxCallSpec = ajaxCallSpy4.getSpec();
		assert.strictEqual(ajaxCallSpec.url,
			"https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType");
		assert.strictEqual(ajaxCallSpec.requestMethod, "DELETE");
		assert.strictEqual(ajaxCallSpec.accept, undefined);
		assert.strictEqual(ajaxCallSpec.contentType, undefined);
		assert.strictEqual(ajaxCallSpec.data, undefined);
		assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.afterDelete);

		assert.strictEqual(managedGuiItem.getRemoved(), 0);
		answerCall(1);

		assert.strictEqual(managedGuiItem.getRemoved(), 1);
	});

	test("initCheckNoIncomingLinksButtonForNew", function(assert) {
		CORA.recordHandler(dependencies, specForNew);
		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);

		assert.strictEqual(recordHandlerViewSpy.getShowShowIncomingLinksButton(), false);
	});

	test("initCheckIncomingLinksButtonForIncomingLinks", function(assert) {
		spec.createNewRecord = "false";
		spec.record = recordWithReadIncomingLinks;

		CORA.recordHandler(dependencies, spec);
		answerCallWithIncomingLinks(0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		assert.strictEqual(recordHandlerViewSpy.getShowShowIncomingLinksButton(), true);
	});

	test("testIndexCall", function(assert) {
		spec.createNewRecord = "false";
		record = recordWithIndexLink;
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let indexButton = recordHandlerViewSpy.getAddedButton(1);
		indexButton.onclickMethod();

		let factoredIndexHandler = dependencies.indexHandlerFactory.getFactored(0);
		assert.strictEqual(factoredIndexHandler.type, "indexHandlerSpy");
		assert.strictEqual(factoredIndexHandler.getSpec().loadMethod, recordHandler.showIndexMessage);
		assert.strictEqual(factoredIndexHandler.getSpec().timeoutMethod,
			recordHandler.showTimeoutMessage);
		assert.strictEqual(factoredIndexHandler.getNumberOfIndexedRecords(), 1);
		assert.stringifyEqual(factoredIndexHandler.getIndexRecord(0), recordWithIndexLink);
	});

	test("testNoIndexButtonWhenNoIndexLink", function(assert) {
		spec.createNewRecord = "false";
		record = recordWithoutIndexLink;

		CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let indexButton = recordHandlerViewSpy.getAddedButton(1);
		assert.strictEqual(indexButton, undefined);
	});

	test("initCheckIndexButtonWhenIndexLinkExists", function(assert) {
		spec.createNewRecord = "false";
		record = recordWithIndexLink;

		CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let indexButton = recordHandlerViewSpy.getAddedButton(1);
		assert.strictEqual(indexButton.text, "INDEX");
	});

	test("testShowIndexMessage", function(assert) {
		spec.createNewRecord = "false";
		record = recordWithoutIndexLink;

		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		let messageHolder = managedGuiItem.getAddedWorkPresentation(0);

		recordHandler.showIndexMessage();
		assert.strictEqual(messageHolder.className, "messageHolder");
		let firstChild = messageHolder.childNodes[0];
		assert.strictEqual(firstChild.className, "message positive");
		let message = firstChild.childNodes[1];
		assert.strictEqual(message.innerHTML, "Posten är indexerad");

	});

	test("testShowTimeoutMessage", function(assert) {
		spec.createNewRecord = "false";
		record = recordWithoutIndexLink;

		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		let messageHolder = managedGuiItem.getAddedWorkPresentation(0);

		recordHandler.showTimeoutMessage();
		assert.strictEqual(messageHolder.className, "messageHolder");
		let firstChild = messageHolder.childNodes[0];
		assert.strictEqual(firstChild.className, "message error");
		let message = firstChild.childNodes[1];
		assert.strictEqual(message.innerHTML, "TIMEOUT");

	});

	test("initCheckRightGuiCreatedForExisting", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);
		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		assert.notOk(recordHandlerViewSpy.getReloadRecordUsingFunction(0));
		assert.notOk(managedGuiItemSpy.getReloadDataFromServer(0));

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);

		let busy = dependencies.busyFactory.getFactored(0);
		let busyView = busy.getView();
		let busyAddedView = managedGuiItem.getAddedWorkPresentation(2);
		assert.strictEqual(busyAddedView, busyView);
		assert.strictEqual(busy.getHideWithEffectCalledNoOfTimes(), 0);


		assert.notOk(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0));
		assert.notOk(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0));
		answerCall(0);

		assert.strictEqual(recordHandler.getDataIsChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getChanged(), false);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypePGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

		let item = managedGuiItem.getAddedMenuPresentation(0);
		assert.strictEqual(item.nodeName, "SPAN");

		assert.ok(recordHandlerViewSpy.getReloadRecordUsingFunction(0));
		assert.ok(managedGuiItemSpy.getReloadDataFromServer(0));
		assert.strictEqual(managedGuiItemSpy.getReloadDataFromServer(0),
			recordHandlerViewSpy.getReloadRecordUsingFunction(0));
		assert.notOk(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0));
		assert.notOk(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0));

		assert.strictEqual(busy.getHideWithEffectCalledNoOfTimes(), 1);
	});

	test("initCheckAddOpenFunctionNotCalledInViewForMetadataInList", function(assert) {
		spec.partOfList = "true";
		CORA.recordHandler(dependencies, spec);
		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		assert.notOk(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0));
		assert.notOk(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0));

		answerCall(0);

		assert.notOk(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0));
		assert.notOk(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0));
	});

	test("initCheckAddOpenFunctionNotCalledInViewForNonMetadata", function(assert) {
		CORA.recordHandler(dependencies, spec);
		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		assert.notOk(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0));
		assert.notOk(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0));

		answerCall(0);

		assert.notOk(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0));
		assert.notOk(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0));
	});

	test("initCheckAddOpenFunctionCalledInViewForMetadataNotReloaded", function(assert) {
		record = recordWithMetadata;
		spec.record = recordWithMetadata;
		spec.fetchLatestDataFromServer = "false";

		let recordHandler = CORA.recordHandler(dependencies, spec);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		assert.ok(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0));
		assert.equal(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0),
			recordHandler.showDefinitionViewer);

		assert.ok(recordHandlerViewSpy.getAddDefinitionViewerOpenFunctionValidationType(0));
		assert.equal(recordHandlerViewSpy.getAddDefinitionViewerOpenFunctionValidationType(0),
			recordHandler.showDefinitionViewerValidationType);

		assert.ok(recordHandlerViewSpy.getAddDefinitionViewerOpenFunctionRecordType(0));
		assert.equal(recordHandlerViewSpy.getAddDefinitionViewerOpenFunctionRecordType(0),
			recordHandler.showDefinitionViewerRecordType);

		assert.ok(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0));
		assert.equal(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0),
			recordHandler.showRecursiveDelete);
	});

	test("initCheckAddOpenFunctionCalledInViewForMetadata", function(assert) {
		record = recordWithMetadata;
		spec.record = recordWithMetadata;

		let recordHandler = CORA.recordHandler(dependencies, spec);
		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);

		answerCall(0);

		assert.ok(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0));
		assert.equal(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0),
			recordHandler.showDefinitionViewer);

		assert.ok(recordHandlerViewSpy.getAddDefinitionViewerOpenFunction(0));

		assert.ok(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0));
		assert.equal(recordHandlerViewSpy.getAddRecursiveDeleteOpenFunction(0),
			recordHandler.showRecursiveDelete);
	});

	test("testShowDefinitionViewer", function(assert) {
		record = recordWithMetadata;
		spec.record = recordWithMetadata;

		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		recordHandler.showDefinitionViewer();

		assert.ok(spec.jsClient.getOpenDefinitionIds(0));
		assert.equal(spec.jsClient.getOpenDefinitionIds(0), "textPartEnGroup");
	});

	test("testShowDefinitionViewerValidationType_create", function(assert) {
		record = recordWithMetadata;
		spec.record = recordWithMetadata;

		let recordHandler = CORA.recordHandler(dependencies, specForNew);

		recordHandler.showDefinitionViewerValidationType();

		assert.ok(specForNew.jsClient.getOpenDefinitionIds(0));
		assert.equal(specForNew.jsClient.getOpenDefinitionIds(0), "recordTypeNewGroup");
	});

	test("testShowDefinitionViewerValidationType_update", function(assert) {
		record = recordWithMetadata;
		spec.record = recordWithMetadata;

		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		recordHandler.showDefinitionViewerValidationType();

		assert.ok(spec.jsClient.getOpenDefinitionIds(0));
		assert.equal(spec.jsClient.getOpenDefinitionIds(0), "textSystemOneGroup");
	});

	test("testShowDefinitionViewerRecordType", function(assert) {
		record = recordWithMetadata;
		spec.record = recordWithMetadata;

		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		recordHandler.showDefinitionViewerRecordType();

		assert.ok(spec.jsClient.getOpenDefinitionIds(0));
		assert.equal(spec.jsClient.getOpenDefinitionIds(0), "textGroup");
	});

	QUnit.test("testShowRecursiveDelete", function(assert) {
		record = recordWithMetadata;
		spec.record = recordWithMetadata;

		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);

		recordHandler.showRecursiveDelete();

		assert.ok(spec.jsClient.getOpenRecursiveDeleteForIds(0));
		assert.equal(spec.jsClient.getOpenRecursiveDeleteForIds(0), "textPartEnGroup");
	});

	test("initRecordGuiCreatedCorrectlyBasePartOfSpec", function(assert) {
		CORA.recordHandler(dependencies, spec);
		answerCall(0);

		let recordGuiSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(recordGuiSpec.metadataId, "recordTypeGroup");

		let metadataFromRecordHandler = spec.jsClient.getReturnedRecordTypeMetadata(0);
		assert.strictEqual(recordGuiSpec.metadataId, metadataFromRecordHandler.metadataId);

		let recordWeSendAsPartOfAnswer = record;
		assert.stringifyEqual(recordGuiSpec.data, recordWeSendAsPartOfAnswer.data);

		let dataDividerWeSentAsPartOfAnswer = CORATEST
			.getDataDividerFromData(recordWeSendAsPartOfAnswer);
		assert.strictEqual(recordGuiSpec.dataDivider, dataDividerWeSentAsPartOfAnswer);
	});

	CORATEST.getDataDividerFromData = function(recordWeSendAsPartOfAnswer) {
		let cData = CORA.coraData(recordWeSendAsPartOfAnswer.data);
		let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
		let cDataDivider = CORA.coraData(cRecordInfo.getFirstChildByNameInData("dataDivider"));
		return cDataDivider.getFirstAtomicValueByNameInData("linkedRecordId");
	};

	test("initPermissionCalculatorCreatedCorrectlyPermissionsPartNoPermissions", function(assert) {
		CORA.recordHandler(dependencies, spec);
		answerCall(0);
		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		let emptyPermissions = {
			write: [],
			read: []
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("initPermissionCalculatorCreatedCorrectlyPermissionsPartOnlyOneWritePermissions", function(assert) {
		CORA.recordHandler(dependencies, spec);
		record.permissions = {
			write: ["someVariable"]
		};
		answerCall(0);
		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		let emptyPermissions = {
			write: record.permissions.write,
			read: []
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("initPermissionCalculatorCreatedCorrectlyPermissionsPartOnlyTwoWritePermissions", function(assert) {
		CORA.recordHandler(dependencies, spec);
		record.permissions = {
			write: ["someVariable", "someOtherVariable"]
		};
		answerCall(0);
		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		let emptyPermissions = {
			write: record.permissions.write,
			read: []
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("initPermissionCalculatorCreatedCorrectlyPermissionsPartOnlyOneReadPermissions", function(assert) {
		CORA.recordHandler(dependencies, spec);
		record.permissions = {
			read: ["someVariable"]
		};
		answerCall(0);
		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		let emptyPermissions = {
			write: [],
			read: record.permissions.read
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("initPermissionCalculatorCreatedCorrectlyPermissionsPartOnlyTwoReadPermissions", function(assert) {
		CORA.recordHandler(dependencies, spec);
		record.permissions = {
			read: ["someVariable", "someOtherVariable"]
		};
		answerCall(0);
		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		let emptyPermissions = {
			write: [],
			read: record.permissions.read
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("initPermissionCalculatorCreatedCorrectlyPermissionsPartBothReadAndWritePermissions", function(
		assert) {
		CORA.recordHandler(dependencies, spec);
		record.permissions = {
			read: ["someReadVariable", "someOtherReadVariable"],
			write: ["someWriteVariable", "someOtherWriteVariable"]
		};
		answerCall(0);
		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		let emptyPermissions = {
			write: record.permissions.write,
			read: record.permissions.read
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("testReloadRecordDataIsChanged", function(assert) {
		spec.createNewRecord = "false";
		CORA.recordHandler(dependencies, spec);
		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);
		assert.notOk(recordHandlerViewSpy.getReloadRecordUsingFunction(0));
		assert.notOk(managedGuiItemSpy.getReloadDataFromServer(0));
		assert.strictEqual(managedGuiItemSpy.getReloadDataFromServer(0),
			recordHandlerViewSpy.getReloadRecordUsingFunction(0));
		answerCall(0);
		let reloadFunction = recordHandlerViewSpy.getReloadRecordUsingFunction(0);
		assert.ok(reloadFunction);
		assert.ok(managedGuiItemSpy.getReloadDataFromServer(0));
		assert.strictEqual(managedGuiItemSpy.getReloadDataFromServer(0),
			recordHandlerViewSpy.getReloadRecordUsingFunction(0));

		reloadFunction();
		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(1);

		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url,
			"https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType");
		assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.record+json");

		let factoredRecordGuiSpec0 = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(recordHandlerViewSpy.getClearViewsWasCalled(), false);

		answerCall(1);

		assert.strictEqual(recordHandlerViewSpy.getClearViewsWasCalled(), true);

		let factoredRecordGui1 = dependencies.recordGuiFactory.getFactored(1);
		let factoredRecordGuiSpec1 = dependencies.recordGuiFactory.getSpec(1);

		assert.strictEqual(factoredRecordGuiSpec1.metadataId, factoredRecordGuiSpec0.metadataId);
		assert.strictEqual(factoredRecordGuiSpec1.dataDivider, factoredRecordGuiSpec0.dataDivider);

		let presentationFormIdUsed = factoredRecordGui1.getPresentationIdUsed(0);
		assert.strictEqual(presentationFormIdUsed, "recordTypePGroup");

		let factoredForm = factoredRecordGui1.getReturnedPresentations(0);
		assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(1));
	});

	test("initCheckRightGuiCreatedForList", function(assert) {
		spec.fetchLatestDataFromServer = "false";
		spec.partOfList = "true";
		spec.record = recordWithoutUpdateOrDeleteLink;

		spec.record.permissions = {
			write: ["someWriteVariable"],
			read: ["someReadVariable"]
		};
		let recordHandler = CORA.recordHandler(dependencies, spec);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);


		assert.strictEqual(recordHandler.getDataIsChanged(), false);
		assert.strictEqual(managedGuiItemSpy.getChanged(), false);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "textListPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "textGroup");

		let recordGuiSpec = dependencies.recordGuiFactory.getSpec(0);

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		assert.strictEqual(managedGuiItem.getAddedListPresentation(0), factoredRecordGui
			.getReturnedPresentations(0).getView());

		let item = managedGuiItem.getAddedMenuPresentation(0);
		assert.strictEqual(item, undefined);

		let emptyPermissions = {
			write: spec.record.permissions.write,
			read: spec.record.permissions.read
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("initCheckRightGuiCreatedForNewInList", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, specForNewList);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);

		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getChanged(), true);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "recordTypeNewGroup");

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeListPGroup");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		assert.strictEqual(managedGuiItem.getAddedListPresentation(0), factoredRecordGui
			.getReturnedPresentations(0).getView());

		let item = managedGuiItem.getAddedMenuPresentation(0);
		assert.strictEqual(item, undefined);

		let emptyPermissions = {
			write: [],
			read: []
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("initCheckRightGuiCreatedForListWithSearchResultPresentationId", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, specForListWithSearchResultPresentationId);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);

		assert.strictEqual(recordHandler.getDataIsChanged(), true);
		assert.strictEqual(managedGuiItemSpy.getChanged(), true);

		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "recordTypeNewGroup");

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);

		assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "somePresentationId");
		assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		assert.strictEqual(managedGuiItem.getAddedListPresentation(0), factoredRecordGui
			.getReturnedPresentations(0).getView());

		let item = managedGuiItem.getAddedMenuPresentation(0);
		assert.strictEqual(item, undefined);

		let emptyPermissions = {
			write: [],
			read: []
		};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});

	test("testCreateNewCall", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, specForNew);
		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let createButtonSpec = recordHandlerViewSpy.getAddedButton(0);
		assert.strictEqual(createButtonSpec.className, "create");
		createButtonSpec.onclickMethod();
		assert.strictEqual(createButtonSpec.text, "CREATE");
		assert.strictEqual(createButtonSpec.className, "create");
		assert.strictEqual(createButtonSpec.onclickMethod, recordHandler.sendNewDataToServer);
		assert.strictEqual(managedGuiItem.getSendDataToServer(), recordHandler.sendNewDataToServer);

		assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/recordType/");
		assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.record+json");
		assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.cora.record+json");
		assert.strictEqual(ajaxCallSpec.data, "{}");
		assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.resetViewsAndProcessFetchedRecord);
		answerCall(0);

		assert.ok(recordHandlerViewSpy.getClearViewsWasCalled());

		let deleteButtonSpec = recordHandlerViewSpy.getAddedButton(1);
		assert.strictEqual(deleteButtonSpec.className, "delete");
		let updateButtonSpec = recordHandlerViewSpy.getAddedButton(2);
		assert.strictEqual(updateButtonSpec.className, "update");

		let deleteButtonSpe2c = recordHandlerViewSpy.getAddedButton(0);
		assert.strictEqual(deleteButtonSpec.className, "delete");
		let updateButtonS2pec = recordHandlerViewSpy.getAddedButton(3);
		assert.strictEqual(updateButtonSpec.className, "update");
	});

	test("testCreateNewCall2", function(assert) {
		CORA.recordHandler(dependencies, specForNew);
		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let createButtonSpec = recordHandlerViewSpy.getAddedButton(0);
		createButtonSpec.onclickMethod();
		let busy = dependencies.busyFactory.getFactored(0);
		assert.strictEqual(busy.getHideWithEffectCalledNoOfTimes(), 0);

		answerCall(0);
		assert.strictEqual(busy.getHideWithEffectCalledNoOfTimes(), 1);

		let reloadFunction = recordHandlerViewSpy.getReloadRecordUsingFunction(0);
		assert.ok(reloadFunction);
		assert.ok(managedGuiItemSpy.getReloadDataFromServer(0));
		assert.strictEqual(managedGuiItemSpy.getReloadDataFromServer(0),
			recordHandlerViewSpy.getReloadRecordUsingFunction(0));


		reloadFunction();
		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(1);

		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url,
			"https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType");
		assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.record+json");

		assert.strictEqual(busy.getHideWithEffectCalledNoOfTimes(), 1);

		answerCall(1);
		let factoredRecordGui0 = dependencies.recordGuiFactory.getFactored(0);
		let presentationFormIdUsed0 = factoredRecordGui0.getPresentationIdUsed(0);
		assert.strictEqual(presentationFormIdUsed0, "recordTypeNewPGroup");

		let factoredRecordGui1 = dependencies.recordGuiFactory.getFactored(1);
		let presentationFormIdUsed1 = factoredRecordGui1.getPresentationIdUsed(0);
		assert.strictEqual(presentationFormIdUsed1, "recordTypePGroup");

		let factoredRecordGui2 = dependencies.recordGuiFactory.getFactored(2);
		let presentationFormIdUsed2 = factoredRecordGui2.getPresentationIdUsed(0);
		assert.strictEqual(presentationFormIdUsed2, "recordTypePGroup");
	});

	test("testCreateNewCallValidationError", function(assert) {
		CORA.recordHandler(dependencies, specForNew);
		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(0);
		factoredRecordGui.setValidateAnswer(false);
		assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let createButtonSpec = recordHandlerViewSpy.getAddedButton(0);
		createButtonSpec.onclickMethod();

		assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);
		assert.strictEqual(ajaxCallSpy, undefined, "no create call should have been made yet");
	});

	test("fetchListCheckError", function(assert) {
		spec.createNewRecord = "false";
		CORA.recordHandler(dependencies, spec);
		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);
		ajaxCallSpy.getSpec().errorMethod({
			status: 404,
			response: "Some error from spy"

		});

		let managedGuiItem = dependencies.managedGuiItemFactory.getFactored(0);
		let item = managedGuiItem.getAddedWorkPresentation(0);
		assert.strictEqual(item.textContent, "404 Some error from spy");
	});

	test("checkRightGuiCreatedPresentationMetadataIsMissing", function(assert) {
		let recordGuiFactorySpy = {
			factor: function() {
				throw new Error("missing metadata");
			}
		};
		spec.createNewRecord = "false";
		dependencies.recordGuiFactory = recordGuiFactorySpy;

		try {
			CORA.recordHandler(dependencies, spec);
			answerCall(0);
		} catch (error) {
			assert.strictEqual(error.message, "missing metadata");
		}

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);

		assert.strictEqual(recordHandlerViewSpy.getObjectAddedToEditView(0),
			"something went wrong, probably missing metadata, " + "Error: missing metadata");
		assert.stringifyEqual(recordHandlerViewSpy.getObjectAddedToEditView(1), record.data);

		assert.ok(recordHandlerViewSpy.getObjectAddedToEditView(2).length > 20);
	});

	test("rightGuiCreatedPresentationMetadataIsMissingForNew", function(assert) {
		let recordGuiFactorySpy = {
			factor: function() {
				throw new Error("missing metadata");
			}
		};
		dependencies.recordGuiFactory = recordGuiFactorySpy;

		try {
			CORA.recordHandler(dependencies, specForNewWithData);
		} catch (error) {
			assert.strictEqual(error.message, "missing metadata");
		}
		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);

		assert.strictEqual(recordHandlerViewSpy.getObjectAddedToEditView(0),
			"something went wrong, probably missing metadata, " + "Error: missing metadata");
		assert.strictEqual(recordHandlerViewSpy.getObjectAddedToEditView(1), record.data);
		assert.ok(recordHandlerViewSpy.getObjectAddedToEditView(2).length > 20);
	});

	test("testReloadForMetadataChanges", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		let firstRecordGui = dependencies.recordGuiFactory.getFactored(0);
		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		assert.strictEqual(recordHandlerViewSpy.getClearViewsWasCalled(), false);

		recordHandler.reloadForMetadataChanges();

		assert.strictEqual(recordHandlerViewSpy.getClearDataViewsWasCalled(), true);

		let reloadedRecordGui = dependencies.recordGuiFactory.getFactored(1);
		let reloadedRecordGuiSpec = dependencies.recordGuiFactory.getSpec(1);
		let specFromFirstRecordGuiSpy = firstRecordGui.getSpec();
		assert.strictEqual(reloadedRecordGuiSpec.metadataId, specFromFirstRecordGuiSpy.metadataId);
		assert.strictEqual(reloadedRecordGuiSpec.dataDivider, specFromFirstRecordGuiSpy.dataDivider);
		assert.stringifyEqual(reloadedRecordGuiSpec.data, firstRecordGui.dataHolder
			.getDataWithActionLinks());
		assert.strictEqual(reloadedRecordGui.getInitCalled(), 1);
	});

	test("testReloadRecordHandlerViewFormFactoredAndAdded", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		recordHandler.reloadForMetadataChanges();

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(1);

		let presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
		assert.strictEqual(presentationFormIdUsed, "recordTypePGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let factoredForm = factoredRecordGui.getReturnedPresentations(0);
		assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(1));
	});

	test("testReloadRecordHandlerViewNewFormFactoredAndAdded", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, specForNew);
		recordHandler.reloadForMetadataChanges();

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(1);

		let presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
		assert.strictEqual(presentationFormIdUsed, "recordTypeNewPGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let factoredForm = factoredRecordGui.getReturnedPresentations(0);
		assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(1));
	});

	test("testReloadForMetadataChangesRecordHandlerViewIsUpdateIfCreated", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, specForNew);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let createButtonSpec = recordHandlerViewSpy.getAddedButton(0);
		createButtonSpec.onclickMethod();
		answerCall(0);

		recordHandler.reloadForMetadataChanges();

		let emptyPermissions = {
			write: [],
			read: []
		};
		let createGui = dependencies.recordGuiFactory.getFactored(0);
		let createGuiSpec = dependencies.recordGuiFactory.getSpec(0);
		let createFormId = createGui.getPresentationIdUsed(0);
		assert.strictEqual(createFormId, "recordTypeNewPGroup");
		assert.deepEqual(createGuiSpec.permissions, emptyPermissions);

		let permissions ={
			  "read": [
			    "someReadVariable",
			    "someOtherReadVariable"
			  ],
			  "write": [
			    "someWriteVariable",
			    "someOtherWriteVariable"
			  ]
			}
		let updateGui = dependencies.recordGuiFactory.getFactored(1);
		let updateGuiSpec = dependencies.recordGuiFactory.getSpec(1);
		let updateFormId = updateGui.getPresentationIdUsed(0);
		assert.strictEqual(updateFormId, "recordTypePGroup"); 
		assert.deepEqual(updateGuiSpec.permissions, permissions);

		let updateGuiAfterReloadForMetadataChanges = dependencies.recordGuiFactory.getFactored(2);
		let updateFormIdAfterReloadForMetadataChanges = updateGuiAfterReloadForMetadataChanges.getPresentationIdUsed(0);
		assert.strictEqual(updateFormIdAfterReloadForMetadataChanges, "recordTypePGroup");
	});

	test("testReloadRecordHandlerViewViewFactoredAndAdded", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		recordHandler.reloadForMetadataChanges();

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(1);

		let presentationViewIdUsed = factoredRecordGui.getPresentationIdUsed(1);
		assert.strictEqual(presentationViewIdUsed, "recordTypeViewPGroup");

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		let factoredView = factoredRecordGui.getReturnedPresentations(1);
		assert.strictEqual(factoredView.getView(), recordHandlerViewSpy.getAddedShowView(1));
	});

	test("testReloadRecordHandlerViewMenuFactoredAndAdded", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		recordHandler.reloadForMetadataChanges();

		let factoredRecordGui = dependencies.recordGuiFactory.getFactored(1);

		let presentationMenuViewIdUsed = factoredRecordGui.getPresentationIdUsed(2);
		assert.strictEqual(presentationMenuViewIdUsed, "recordTypeMenuPGroup");

		let managedGuiItemSpy = dependencies.managedGuiItemFactory.getFactored(0);
		let factoredView = factoredRecordGui.getReturnedPresentations(2);
		assert.strictEqual(factoredView.getView(), managedGuiItemSpy.getAddedMenuPresentation(1));
	});

	test("testShowIncomingLinks", function(assert) {
		spec.createNewRecord = "false";
		spec.record = recordWithReadIncomingLinks;

		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCallWithIncomingLinks(0);

		let recordHandlerViewSpy = recordHandlerViewFactorySpy.getFactored(0);
		recordHandler.showIncomingLinks();

		let addedToIncomingLinksView = recordHandlerViewSpy
			.getObjectAddedToIncomingLinksView(0);
		let factoredIncomingLinksListHandler = dependencies.globalFactories.incomingLinksListHandlerFactory
			.getFactored(0);
		let incomingLinksListSpyView = factoredIncomingLinksListHandler.getView();
		assert.strictEqual(addedToIncomingLinksView, incomingLinksListSpyView);

		let expectedSpec = {
			read_incoming_links: spec.record.actionLinks.read_incoming_links
		}
		let usedSpec = factoredIncomingLinksListHandler.getSpec();
		assert.stringifyEqual(usedSpec, expectedSpec);
	});

	test("testPublishMessageOnCallMethodAfterShowWorkView", function(assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		answerCall(0);
		let pubSub = dependencies.recordGuiFactory.getFactored(0).pubSub;
		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 0);
		recordHandler.callMethodAfterShowWorkView();
		assert.deepEqual(messages.length, 1);
		let firstMessage = messages[0];
		assert.strictEqual(firstMessage.type, "viewJustMadeVisible");
		assert.stringifyEqual(firstMessage.message.path, []);
		assert.strictEqual(firstMessage.message.data, "");
	});

	test("testNoPublishMessageOnCallMethodAfterShowWorkViewBeforeRecordGuiInitialized", function(
		assert) {
		let recordHandler = CORA.recordHandler(dependencies, spec);
		recordHandler.callMethodAfterShowWorkView();
		assert.equal(true, true);

		answerCall(0);

		let pubSub = dependencies.recordGuiFactory.getFactored(0).pubSub;
		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 0);

		recordHandler.callMethodAfterShowWorkView();

		assert.deepEqual(messages.length, 1);
	});

});