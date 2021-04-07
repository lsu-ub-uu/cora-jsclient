/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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

QUnit.module("recordHandlerTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.record = CORATEST.recordTypeList.dataList.data[4].record;
		this.recordWithoutUpdateOrDeleteLink = CORATEST.recordWithoutUpdateOrDeleteLink;
		this.recordWithoutDeleteLink = CORATEST.recordWithoutDeleteLink;
		this.recordWithReadIncomingLinks = CORATEST.recordWithReadIncomingLinks;
		this.recordWithIndexLink = CORATEST.recordWithIndexLink;
		this.recordWithoutIndexLink = CORATEST.recordWithoutIndexLink;

		this.pubSub = CORATEST.pubSubSpy();

		this.recordGuiFactorySpy = CORATEST.standardFactorySpy("recordGuiSpy");

		this.recordHandlerViewFactorySpy = CORATEST.standardFactorySpy("recordHandlerViewSpy");
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		let dependencies = {
			globalFactories: {
				incomingLinksListHandlerFactory: CORATEST
					.standardFactorySpy("incomingLinksListHandlerSpy")
			},
			recordHandlerFactory: CORATEST.standardFactorySpy("recordHandlerSpy"),
			ajaxCallFactory: this.ajaxCallFactorySpy,
			recordGuiFactory: this.recordGuiFactorySpy,
			recordHandlerViewFactory: this.recordHandlerViewFactorySpy,
			managedGuiItemFactory: CORATEST.standardFactorySpy("managedGuiItemSpy"),
			indexHandlerFactory: CORATEST.standardFactorySpy("indexHandlerSpy"),
			recordPartPermissionCalculatorFactory: CORATEST.standardFactorySpy("recordPartPermissionCalculatorSpy")
		};
		this.dependencies = dependencies;

		this.spec = {
			fetchLatestDataFromServer: "true",
			partOfList: "false",
			createNewRecord: "false",
			record: this.record,
			jsClient: CORATEST.jsClientSpy()
		};

		this.specForNew = {
			fetchLatestDataFromServer: "false",
			partOfList: "false",
			createNewRecord: "true",
			recordTypeRecordIdForNew: "recordType",
			jsClient: CORATEST.jsClientSpy()
		};
		this.specForNewWithData = {
			fetchLatestDataFromServer: "false",
			partOfList: "false",
			createNewRecord: "true",
			recordTypeRecordIdForNew: "recordType",
			record: this.record,
			jsClient: CORATEST.jsClientSpy()
		};
		this.specForNewList = {
			fetchLatestDataFromServer: "false",
			partOfList: "true",
			createNewRecord: "true",
			recordTypeRecordIdForNew: "recordType",
			record: this.record,
			jsClient: CORATEST.jsClientSpy()
		};

		this.answerCall = function(no) {
			let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			let jsonRecord = JSON.stringify({
				record: this.record
			});
			let answer = {
				spec: ajaxCallSpy0.getSpec(),
				responseText: jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		};
		this.answerCallWithoutUpdateOrDeleteLink = function(no) {
			let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			let jsonRecord = JSON.stringify({
				record: this.recordWithoutUpdateOrDeleteLink
			});
			let answer = {
				spec: ajaxCallSpy0.getSpec(),
				responseText: jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		};
		this.answerCallWithoutDeleteLink = function(no) {
			let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			let jsonRecord = JSON.stringify({
				record: this.recordWithoutDeleteLink
			});
			let answer = {
				spec: ajaxCallSpy0.getSpec(),
				responseText: jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		};
		this.answerCallWithIncomingLinks = function(no) {
			let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			let jsonRecord = JSON.stringify({
				record: this.recordWithReadIncomingLinks
			});
			let answer = {
				spec: ajaxCallSpy0.getSpec(),
				responseText: jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		};

	},
	afterEach: function() {
	}
});

QUnit.test("init", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);

	assert.strictEqual(recordHandler.type, "recordHandler");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);
});

QUnit.test("testGetDependencies", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	assert.strictEqual(recordHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	assert.strictEqual(recordHandler.getSpec(), this.spec);
});

QUnit.test("initTestManagedGuiItemFactoryCalled", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);

	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	let managedGuiItemSpec = managedGuiItemSpy.getSpec(0);
	assert.strictEqual(managedGuiItemSpec.activateMethod, this.spec.jsClient.showView);
	assert.strictEqual(managedGuiItemSpec.removeMethod, this.spec.jsClient.removeView);
	assert.strictEqual(managedGuiItemSpec.callOnMetadataReloadMethod,
		recordHandler.reloadForMetadataChanges);

	assert.notStrictEqual(managedGuiItemSpec.callMethodAfterShowWorkView, undefined);
	assert.strictEqual(managedGuiItemSpec.callMethodAfterShowWorkView,
		recordHandler.callMethodAfterShowWorkView);

	assert.ok(managedGuiItemSpy != undefined);
});

QUnit.test("testGetManagedGuiItem", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(recordHandler.getManagedGuiItem(), managedGuiItem);
});

QUnit.test("testInitRecordHandlerViewSpec", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let usedSpec = this.recordHandlerViewFactorySpy.getSpec(0);
	assert.strictEqual(usedSpec.extraClassName, "recordHandler");
	// TODO: test that buttons are added on init in view...
	assert.strictEqual(usedSpec.showDataMethod, recordHandler.showData);
	assert.strictEqual(usedSpec.copyDataMethod, recordHandler.copyData);
	assert.strictEqual(usedSpec.showIncomingLinksMethod, recordHandler.showIncomingLinks);
});

QUnit.test("testInitRecordHandlerViewFormFactoredAndAdded", function(assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	let presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
	assert.strictEqual(presentationFormIdUsed, "recordTypeFormPGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let factoredForm = factoredRecordGui.getReturnedPresentations(0);
	assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(0));
});

QUnit.test("testInitRecordHandlerViewNewFormFactoredAndAdded", function(assert) {
	CORA.recordHandler(this.dependencies, this.specForNew);

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	let presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
	assert.strictEqual(presentationFormIdUsed, "recordTypeFormNewPGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let factoredForm = factoredRecordGui.getReturnedPresentations(0);
	assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(0));
});

QUnit.test("testInitRecordHandlerViewViewFactoredAndAdded", function(assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	let presentationViewIdUsed = factoredRecordGui.getPresentationIdUsed(1);
	assert.strictEqual(presentationViewIdUsed, "recordTypeViewPGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let factoredView = factoredRecordGui.getReturnedPresentations(1);
	assert.strictEqual(factoredView.getView(), recordHandlerViewSpy.getAddedShowView(0));
});

QUnit.test("testInitRecordHandlerViewMenuFactoredAndAdded", function(assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	let presentationMenuViewIdUsed = factoredRecordGui.getPresentationIdUsed(2);
	assert.strictEqual(presentationMenuViewIdUsed, "recordTypeMenuPGroup");

	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	let factoredView = factoredRecordGui.getReturnedPresentations(2);
	assert.strictEqual(factoredView.getView(), managedGuiItemSpy.getAddedMenuPresentation(0));
});

QUnit.test("testInitRecordHandlerViewButtonCreated", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	let deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	assert.strictEqual(deleteButtonSpec.text, "DELETE");
	assert.strictEqual(deleteButtonSpec.className, "delete");
	assert.strictEqual(deleteButtonSpec.onclickMethod, recordHandler.shouldRecordBeDeleted);

	let updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	assert.strictEqual(updateButtonSpec.text, "UPDATE");
	assert.strictEqual(updateButtonSpec.className, "update");
	assert.strictEqual(updateButtonSpec.onclickMethod, recordHandler.sendUpdateDataToServer);
});

QUnit.test("testShowData", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	recordHandler.showData();
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	let messageHolder = managedGuiItem.getAddedWorkPresentation(0);

	assert.strictEqual(messageHolder.className, "messageHolder");
	// TODO: move to view...
});

QUnit.test("testCopyAsNew", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	recordHandler.copyData();

	let dataHolderData = this.dependencies.recordGuiFactory.getFactored(0).dataHolder
		.getDataWithActionLinks();

	let expectedSpec = {
		fetchLatestDataFromServer: "false",
		partOfList: "false",
		createNewRecord: "true",
		record: dataHolderData,
		jsClient: this.spec.jsClient,
		recordTypeRecordIdForNew: "recordType"
	};

	let createdSpecForCopy = this.dependencies.recordHandlerFactory.getSpec(0);
	assert.strictEqual(createdSpecForCopy.fetchLatestDataFromServer,
		expectedSpec.fetchLatestDataFromServer);
	assert.strictEqual(createdSpecForCopy.partOfList, expectedSpec.partOfList);
	assert.strictEqual(createdSpecForCopy.createNewRecord, expectedSpec.createNewRecord);
	assert.stringifyEqual(createdSpecForCopy.record, expectedSpec.record);
	assert.strictEqual(createdSpecForCopy.jsClient, expectedSpec.jsClient);
	assert.strictEqual(createdSpecForCopy.recordTypeRecordIdForNew,
		expectedSpec.recordTypeRecordIdForNew);
});

QUnit.test("testCopyAsNewManagedGuiItemAddedToJsClient", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	recordHandler.copyData();
	let factoredRecordHandler = this.dependencies.recordHandlerFactory.getFactored(0);
	assert.strictEqual(this.spec.jsClient.getAddedGuiItem(0), factoredRecordHandler
		.getManagedGuiItem());
});

QUnit.test("testCopyAsNewManagedGuiItemShownInJsClient", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	recordHandler.copyData();
	let factoredRecordHandler = this.dependencies.recordHandlerFactory.getFactored(0);
	assert.strictEqual(this.spec.jsClient.getViewShowingInWorkView(0), factoredRecordHandler
		.getManagedGuiItem());
});

QUnit.test("initTestDataFetchedFromServer", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);

	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
		"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.processFetchedRecord);
});

QUnit.test("initTestUsePrefetchedData", function(assert) {
	this.spec.fetchLatestDataFromServer = false;
	CORA.recordHandler(this.dependencies, this.spec);
	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);

	assert.strictEqual(ajaxCallSpy, undefined);
});

QUnit.test("testInitSubscriptions",
	function(assert) {
		let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
		this.answerCall(0);

		let subscriptions = this.dependencies.recordGuiFactory.getFactored(0).pubSub
			.getSubscriptions();
		assert.deepEqual(subscriptions.length, 1);

		let firstSubscription = subscriptions[0];
		assert.strictEqual(firstSubscription.type, "*");
		assert.deepEqual(firstSubscription.path, {});
		assert.ok(firstSubscription.functionToCall === recordHandler.handleMsg);
	});

QUnit.test("testHandleMessage", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);

	let data = {
		data: "A new value",
		path: {}
	};
	recordHandler.handleMsg(data, "setValue");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	let data1 = {
		data: "",
		path: {}
	};
	recordHandler.handleMsg(data1, "initComplete");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	recordHandler.handleMsg(data, "setValue");
	assert.strictEqual(recordHandler.getDataIsChanged(), true);
	assert.strictEqual(managedGuiItemSpy.getChanged(), true);
	// let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(managedGuiItemSpy.getChanged(), true);
});

QUnit.test("testHandleMessageSetValueSetsDataChanged", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);

	let data = {
		data: "A new value",
		path: {}
	};
	recordHandler.handleMsg(data, "setValue");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getNoOfChangedCalls(), 0);

	let data1 = {
		data: "",
		path: {}
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

QUnit.test("testUpdateCall", function(assert) {
	this.spec.createNewRecord = "false";
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	updateButtonSpec.onclickMethod();

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
		"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.data, "{}");
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.resetViewsAndProcessFetchedRecord);

});

QUnit.test("testUpdateThroughPubSubCall", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	let data = {
		data: "",
		path: {}
	};
	recordHandler.handleMsg(data, "updateRecord");

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
		"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.data, "{}");
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.resetViewsAndProcessFetchedRecord);
});

QUnit.test("testUpdateDataIsChanged", function(assert) {
	this.spec.createNewRecord = "false";
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	this.answerCall(0);

	let data1 = {
		data: "",
		path: {}
	};
	recordHandler.handleMsg(data1, "initComplete");
	let data = {
		data: "A new value",
		path: {}
	};
	recordHandler.handleMsg(data, "setValue");
	assert.strictEqual(recordHandler.getDataIsChanged(), true);
	assert.strictEqual(managedGuiItemSpy.getChanged(), true);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	updateButtonSpec.onclickMethod();
	this.answerCall(1);

	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(managedGuiItem.getMenuViewCleared(), 2);
	let item = managedGuiItem.getAddedMenuPresentation(1);
	assert.strictEqual(item.nodeName, "SPAN");
	assert.strictEqual(managedGuiItem.getAddedMenuPresentation(2), undefined);
});

QUnit.test("testUpdateCallValidationError", function(assert) {
	this.spec.createNewRecord = "false";
	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	factoredRecordGui.setValidateAnswer(false);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	updateButtonSpec.onclickMethod();

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy, undefined);
});

QUnit.test("testNoUpdateButtonAndEditFormWhenNoUpdateLink", function(assert) {
	this.spec.createNewRecord = "false";
	this.spec.record = this.recordWithoutUpdateOrDeleteLink;

	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCallWithoutUpdateOrDeleteLink(0);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "textSystemOneViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "textSystemOneGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "textSystemOneMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "textSystemOneGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), undefined);
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), undefined);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	let editViewChild = recordHandlerViewSpy.getAddedEditView(0);
	assert.strictEqual(editViewChild, undefined);

	let showViewChild = recordHandlerViewSpy.getAddedShowView(0);
	assert.strictEqual(showViewChild.className, "presentationStub");

	let updateButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	assert.strictEqual(updateButtonSpec, undefined);
});

QUnit.test("testDeleteCall", function(assert) {
	this.spec.createNewRecord = "false";
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	deleteButtonSpec.onclickMethod();

	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	let question = managedGuiItem.getAddedWorkPresentation(3);
	assert.strictEqual(question.className, "question");
	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy, undefined, "no delete call should have been made yet");

	let buttonNo = question.firstChild.childNodes[1];
	assert.strictEqual(buttonNo.value, "Nej");
	buttonNo.onclick();
	assert.notVisible(question);
	let ajaxCallSpy2 = this.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy2, undefined, "no delete call should have been made yet");

	deleteButtonSpec.onclickMethod();
	let question2 = managedGuiItem.getAddedWorkPresentation(4);
	assert.strictEqual(question2.className, "question");
	let ajaxCallSpy3 = this.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy3, undefined, "no delete call should have been made yet");
	let buttonYes = question.firstChild.childNodes[2];
	assert.strictEqual(buttonYes.value, "Ja");
	buttonYes.onclick();

	let ajaxCallSpy4 = this.ajaxCallFactorySpy.getFactored(1);
	let ajaxCallSpec = ajaxCallSpy4.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
		"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "DELETE");
	assert.strictEqual(ajaxCallSpec.accept, undefined);
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.afterDelete);

	assert.strictEqual(managedGuiItem.getRemoved(), 0);
	this.answerCall(1);

	assert.strictEqual(managedGuiItem.getRemoved(), 1);
});

QUnit.test("testDeleteCallNoParentsForViews", function(assert) {
	this.spec.createNewRecord = "false";
	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	deleteButtonSpec.onclickMethod();

	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	let question = managedGuiItem.getAddedWorkPresentation(3);

	let buttonYes = question.firstChild.childNodes[2];
	buttonYes.onclick();
	assert.strictEqual(managedGuiItem.getRemoved(), 0);
	this.answerCall(1);

	assert.strictEqual(managedGuiItem.getRemoved(), 1);
});

QUnit.test("testNoDeleteButtonWhenNoDeleteLink", function(assert) {
	this.spec.createNewRecord = "false";
	this.spec.record = this.recordWithoutDeleteLink;

	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCallWithoutDeleteLink(0);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "textSystemOneFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "textSystemOneGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "textSystemOneViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "textSystemOneGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "textSystemOneMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "textSystemOneGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let updateButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	assert.strictEqual(updateButtonSpec.className, "update");
});

QUnit.test("initCheckRightGuiCreatedNewCheckSpec", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.specForNew);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);

	assert.strictEqual(recordHandler.getDataIsChanged(), true);
	assert.strictEqual(managedGuiItem.getChanged(), true);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	assert.strictEqual(ajaxCallSpy, undefined, "no call to server on new record");

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeNewGroup");
	assert.strictEqual(factoredSpec.dataDivider, undefined);

	let permissionCalculatorSpec = this.dependencies.recordPartPermissionCalculatorFactory.getSpec(0);
	assert.strictEqual(permissionCalculatorSpec.metadataId, factoredSpec.metadataId);
	assert.deepEqual(permissionCalculatorSpec.permissions.write, []);
	assert.deepEqual(permissionCalculatorSpec.permissions.read, []);
	let factoredCalculator = this.dependencies.recordPartPermissionCalculatorFactory.getFactored(0);
	assert.strictEqual(factoredSpec.recordPartPermissionCalculator, factoredCalculator);
});

QUnit.test("initCheckRightGuiCreatedNew", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.specForNew);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);

	assert.strictEqual(recordHandler.getDataIsChanged(), true);
	assert.strictEqual(managedGuiItem.getChanged(), true);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	assert.strictEqual(ajaxCallSpy, undefined, "no call to server on new record");

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormNewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeNewGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeNewGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeNewGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(3), undefined);
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(3), undefined);

	let item = managedGuiItem.getAddedMenuPresentation(0);
	assert.strictEqual(item.nodeName, "SPAN");
});

QUnit.test("initCheckNoIncomingLinksButtonForNew", function(assert) {
	CORA.recordHandler(this.dependencies, this.specForNew);
	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	assert.strictEqual(recordHandlerViewSpy.getShowShowIncomingLinksButton(), false);
});

QUnit.test("initCheckIncomingLinksButtonForIncomingLinks", function(assert) {
	this.spec.createNewRecord = "false";
	this.spec.record = this.recordWithReadIncomingLinks;

	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCallWithIncomingLinks(0);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	assert.strictEqual(recordHandlerViewSpy.getShowShowIncomingLinksButton(), true);
});

QUnit.test("testIndexCall", function(assert) {
	this.spec.createNewRecord = "false";
	this.record = this.recordWithIndexLink;
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let indexButton = recordHandlerViewSpy.getAddedButton(1);
	indexButton.onclickMethod();

	let factoredIndexHandler = this.dependencies.indexHandlerFactory.getFactored(0);
	assert.strictEqual(factoredIndexHandler.type, "indexHandlerSpy");
	assert.strictEqual(factoredIndexHandler.getSpec().loadMethod, recordHandler.showIndexMessage);
	assert.strictEqual(factoredIndexHandler.getSpec().timeoutMethod,
		recordHandler.showTimeoutMessage);
	assert.strictEqual(factoredIndexHandler.getNumberOfIndexedRecords(), 1);
	assert.stringifyEqual(factoredIndexHandler.getIndexRecord(0), this.recordWithIndexLink);
});

QUnit.test("testNoIndexButtonWhenNoIndexLink", function(assert) {
	this.spec.createNewRecord = "false";
	this.record = this.recordWithoutIndexLink;

	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let indexButton = recordHandlerViewSpy.getAddedButton(1);
	assert.strictEqual(indexButton, undefined);
});

QUnit.test("initCheckIndexButtonWhenIndexLinkExists", function(assert) {
	this.spec.createNewRecord = "false";
	this.record = this.recordWithIndexLink;

	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let indexButton = recordHandlerViewSpy.getAddedButton(1);
	assert.strictEqual(indexButton.text, "INDEX");
});

QUnit.test("testShowIndexMessage", function(assert) {
	this.spec.createNewRecord = "false";
	this.record = this.recordWithoutIndexLink;

	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	let messageHolder = managedGuiItem.getAddedWorkPresentation(0);

	recordHandler.showIndexMessage();
	assert.strictEqual(messageHolder.className, "messageHolder");
	let firstChild = messageHolder.childNodes[0];
	assert.strictEqual(firstChild.className, "message positive");
	let message = firstChild.childNodes[1];
	assert.strictEqual(message.innerHTML, "Posten är indexerad");

});

QUnit.test("testShowTimeoutMessage", function(assert) {
	this.spec.createNewRecord = "false";
	this.record = this.recordWithoutIndexLink;

	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	let messageHolder = managedGuiItem.getAddedWorkPresentation(0);

	recordHandler.showTimeoutMessage();
	assert.strictEqual(messageHolder.className, "messageHolder");
	let firstChild = messageHolder.childNodes[0];
	assert.strictEqual(firstChild.className, "message error");
	let message = firstChild.childNodes[1];
	assert.strictEqual(message.innerHTML, "TIMEOUT");

});

QUnit.test("initCheckRightGuiCreatedForExisting", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	assert.notOk(recordHandlerViewSpy.getReloadRecordUsingFunction(0));
	this.answerCall(0);

	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	let item = managedGuiItem.getAddedMenuPresentation(0);
	assert.strictEqual(item.nodeName, "SPAN");

	assert.ok(recordHandlerViewSpy.getReloadRecordUsingFunction(0));
});

QUnit.test("initRecordGuiCreatedCorrectlyBasePartOfSpec", function(assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let recordGuiSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(recordGuiSpec.metadataId, "recordTypeGroup");

	let metadataFromRecordHandler = this.spec.jsClient.getReturnedRecordTypeMetadata(0);
	assert.strictEqual(recordGuiSpec.metadataId, metadataFromRecordHandler.metadataId);

	let recordWeSendAsPartOfAnswer = this.record;
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

QUnit.test("initPermissionCalculatorCreatedCorrectlyPermissionsPartNoPermissions", function(assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	let permissionCalculatorSpec = this.dependencies.recordPartPermissionCalculatorFactory.getSpec(0);

	assert.deepEqual(permissionCalculatorSpec.permissions.write, []);
	assert.deepEqual(permissionCalculatorSpec.permissions.read, []);

});

QUnit.test("initPermissionCalculatorCreatedCorrectlyPermissionsPartOnlyOneWritePermissions", function(assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.record.permissions = {
		write: ["someVariable"]
	};
	this.answerCall(0);
	let permissionCalculatorSpec = this.dependencies.recordPartPermissionCalculatorFactory.getSpec(0);

	let expectedRecordPermissions = this.record.permissions;
	assert.deepEqual(permissionCalculatorSpec.permissions.write, expectedRecordPermissions.write);
	assert.deepEqual(permissionCalculatorSpec.permissions.read, []);
});

QUnit.test("initPermissionCalculatorCreatedCorrectlyPermissionsPartOnlyTwoWritePermissions", function(assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.record.permissions = {
		write: ["someVariable", "someOtherVariable"]
	};
	this.answerCall(0);
	let permissionCalculatorSpec = this.dependencies.recordPartPermissionCalculatorFactory.getSpec(0);

	let expectedRecordPermissions = this.record.permissions;
	assert.deepEqual(permissionCalculatorSpec.permissions.write, expectedRecordPermissions.write);
	assert.deepEqual(permissionCalculatorSpec.permissions.read, []);
});

QUnit.test("initPermissionCalculatorCreatedCorrectlyPermissionsPartOnlyOneReadPermissions", function(assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.record.permissions = {
		read: ["someVariable"]
	};
	this.answerCall(0);
	let permissionCalculatorSpec = this.dependencies.recordPartPermissionCalculatorFactory.getSpec(0);

	let expectedRecordPermissions = this.record.permissions;
	assert.deepEqual(permissionCalculatorSpec.permissions.read, expectedRecordPermissions.read);
	assert.deepEqual(permissionCalculatorSpec.permissions.write, []);
});

QUnit.test("initPermissionCalculatorCreatedCorrectlyPermissionsPartOnlyTwoReadPermissions", function(assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.record.permissions = {
		read: ["someVariable", "someOtherVariable"]
	};
	this.answerCall(0);
	let permissionCalculatorSpec = this.dependencies.recordPartPermissionCalculatorFactory.getSpec(0);

	let expectedRecordPermissions = this.record.permissions;
	assert.deepEqual(permissionCalculatorSpec.permissions.read, expectedRecordPermissions.read);
	assert.deepEqual(permissionCalculatorSpec.permissions.write, []);
});

QUnit.test("initPermissionCalculatorCreatedCorrectlyPermissionsPartBothReadAndWritePermissions", function(
	assert) {
	CORA.recordHandler(this.dependencies, this.spec);
	this.record.permissions = {
		read: ["someReadVariable", "someOtherReadVariable"],
		write: ["someWriteVariable", "someOtherWriteVariable"]
	};
	this.answerCall(0);
	let permissionCalculatorSpec = this.dependencies.recordPartPermissionCalculatorFactory.getSpec(0);

	let expectedRecordPermissions = this.record.permissions;
	assert.deepEqual(permissionCalculatorSpec.permissions.read, expectedRecordPermissions.read);
	assert.deepEqual(permissionCalculatorSpec.permissions.write, expectedRecordPermissions.write);
});

QUnit.test("testReloadRecordDataIsChanged", function(assert) {
	this.spec.createNewRecord = "false";
	CORA.recordHandler(this.dependencies, this.spec);
	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	assert.notOk(recordHandlerViewSpy.getReloadRecordUsingFunction(0));
	this.answerCall(0);
	let reloadFunction = recordHandlerViewSpy.getReloadRecordUsingFunction(0);
	assert.ok(reloadFunction);

	reloadFunction();
	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);

	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
		"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");

	let factoredRecordGuiSpec0 = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(recordHandlerViewSpy.getClearViewsWasCalled(), false);

	this.answerCall(1);

	assert.strictEqual(recordHandlerViewSpy.getClearViewsWasCalled(), true);

	let factoredRecordGui1 = this.dependencies.recordGuiFactory.getFactored(1);
	let factoredRecordGuiSpec1 = this.dependencies.recordGuiFactory.getSpec(1);

	assert.strictEqual(factoredRecordGuiSpec1.metadataId, factoredRecordGuiSpec0.metadataId);
	assert.strictEqual(factoredRecordGuiSpec1.dataDivider, factoredRecordGuiSpec0.dataDivider);

	let presentationFormIdUsed = factoredRecordGui1.getPresentationIdUsed(0);
	assert.strictEqual(presentationFormIdUsed, "recordTypeFormPGroup");

	let factoredForm = factoredRecordGui1.getReturnedPresentations(0);
	assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(1));
});

QUnit.test("initCheckRightGuiCreatedForList", function(assert) {
	this.spec.fetchLatestDataFromServer = "false";
	this.spec.partOfList = "true";
	this.record.permissions = {
		write: ["someWriteVariable"],
		read: ["someReadVariable"]
	};
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	

	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeListPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

	let recordGuiSpec = this.dependencies.recordGuiFactory.getSpec(0);

	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(managedGuiItem.getAddedListPresentation(0), factoredRecordGui
		.getReturnedPresentations(0).getView());

	let item = managedGuiItem.getAddedMenuPresentation(0);
	assert.strictEqual(item, undefined);

	let permissionCalculatorSpec = this.dependencies.recordPartPermissionCalculatorFactory.getSpec(0);
	assert.strictEqual(permissionCalculatorSpec.metadataId, factoredSpec.metadataId);
	assert.deepEqual(permissionCalculatorSpec.permissions.write, this.record.permissions.write);
	assert.deepEqual(permissionCalculatorSpec.permissions.read, this.record.permissions.read);
	let factoredCalculator = this.dependencies.recordPartPermissionCalculatorFactory.getFactored(0);
	assert.strictEqual(recordGuiSpec.recordPartPermissionCalculator, factoredCalculator);
});

QUnit.test("initCheckRightGuiCreatedForNewInList", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.specForNewList);
	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);

	assert.strictEqual(recordHandler.getDataIsChanged(), true);
	assert.strictEqual(managedGuiItemSpy.getChanged(), true);

	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeNewGroup");

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeListPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeNewGroup");

	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(managedGuiItem.getAddedListPresentation(0), factoredRecordGui
		.getReturnedPresentations(0).getView());

	let item = managedGuiItem.getAddedMenuPresentation(0);
	assert.strictEqual(item, undefined);

	let permissionCalculatorSpec = this.dependencies.recordPartPermissionCalculatorFactory.getSpec(0);
	assert.strictEqual(permissionCalculatorSpec.metadataId, factoredSpec.metadataId);
	assert.deepEqual(permissionCalculatorSpec.permissions.write, []);
	assert.deepEqual(permissionCalculatorSpec.permissions.read, []);
	let factoredCalculator = this.dependencies.recordPartPermissionCalculatorFactory.getFactored(0);
	assert.strictEqual(factoredSpec.recordPartPermissionCalculator, factoredCalculator);

});

QUnit.test("testCreateNewCall", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.specForNew);
	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let createButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	assert.strictEqual(createButtonSpec.className, "create");
	createButtonSpec.onclickMethod();

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.data, "{}");
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.resetViewsAndProcessFetchedRecord);
	this.answerCall(0);

	assert.ok(recordHandlerViewSpy.getClearViewsWasCalled());

	let deleteButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	assert.strictEqual(deleteButtonSpec.className, "delete");
	let updateButtonSpec = recordHandlerViewSpy.getAddedButton(2);
	assert.strictEqual(updateButtonSpec.className, "update");
});

QUnit.test("testCreateNewCall", function(assert) {
	CORA.recordHandler(this.dependencies, this.specForNew);
	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let createButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	createButtonSpec.onclickMethod();

	this.answerCall(0);

	let reloadFunction = recordHandlerViewSpy.getReloadRecordUsingFunction(0);
	assert.ok(reloadFunction);

	reloadFunction();
	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);

	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
		"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");

});

QUnit.test("testCreateNewCallValidationError", function(assert) {
	CORA.recordHandler(this.dependencies, this.specForNew);
	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	factoredRecordGui.setValidateAnswer(false);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let createButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	createButtonSpec.onclickMethod();

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	assert.strictEqual(ajaxCallSpy, undefined, "no create call should have been made yet");
});

QUnit.test("fetchListCheckError", function(assert) {
	this.spec.createNewRecord = "false";
	CORA.recordHandler(this.dependencies, this.spec);
	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy.getSpec().errorMethod({
		status: 404,
		response: "Some error from spy"
		
	});

	let managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	let item = managedGuiItem.getAddedWorkPresentation(0);
	assert.strictEqual(item.textContent, "404 Some error from spy");
});

QUnit.test("checkRightGuiCreatedPresentationMetadataIsMissing", function(assert) {
	let recordGuiFactorySpy = {
		factor: function() {
			throw new Error("missing metadata");
		}
	};
	this.spec.createNewRecord = "false";
	this.dependencies.recordGuiFactory = recordGuiFactorySpy;

	CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	assert.strictEqual(recordHandlerViewSpy.getObjectAddedToEditView(0),
		"something went wrong, probably missing metadata, " + "Error: missing metadata");
	assert.stringifyEqual(recordHandlerViewSpy.getObjectAddedToEditView(1), this.record.data);

	assert.ok(recordHandlerViewSpy.getObjectAddedToEditView(2).length > 20);
});

QUnit.test("rightGuiCreatedPresentationMetadataIsMissingForNew", function(assert) {
	let recordGuiFactorySpy = {
		// factor : function(metadataId, data) {
		factor: function() {
			throw new Error("missing metadata");
		}
	};
	this.dependencies.recordGuiFactory = recordGuiFactorySpy;

	CORA.recordHandler(this.dependencies, this.specForNewWithData);
	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	assert.strictEqual(recordHandlerViewSpy.getObjectAddedToEditView(0),
		"something went wrong, probably missing metadata, " + "Error: missing metadata");
	assert.strictEqual(recordHandlerViewSpy.getObjectAddedToEditView(1), this.record);
	assert.ok(recordHandlerViewSpy.getObjectAddedToEditView(2).length > 20);
});

QUnit.test("testReloadForMetadataChanges", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	let firstRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	assert.strictEqual(recordHandlerViewSpy.getClearViewsWasCalled(), false);

	recordHandler.reloadForMetadataChanges();

	assert.strictEqual(recordHandlerViewSpy.getClearDataViewsWasCalled(), true);

	let reloadedRecordGui = this.dependencies.recordGuiFactory.getFactored(1);
	let reloadedRecordGuiSpec = this.dependencies.recordGuiFactory.getSpec(1);
	let specFromFirstRecordGuiSpy = firstRecordGui.getSpec();
	assert.strictEqual(reloadedRecordGuiSpec.metadataId, specFromFirstRecordGuiSpy.metadataId);
	assert.strictEqual(reloadedRecordGuiSpec.dataDivider, specFromFirstRecordGuiSpy.dataDivider);
	assert.stringifyEqual(reloadedRecordGuiSpec.data, firstRecordGui.dataHolder
		.getDataWithActionLinks());
	assert.strictEqual(reloadedRecordGui.getInitCalled(), 1);

	assert.strictEqual(reloadedRecordGuiSpec.recordPartPermissionCalculator, specFromFirstRecordGuiSpy.recordPartPermissionCalculator);
	assert.ok(reloadedRecordGuiSpec.recordPartPermissionCalculator);

});

QUnit.test("testReloadRecordHandlerViewFormFactoredAndAdded", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	recordHandler.reloadForMetadataChanges();

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(1);

	let presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
	assert.strictEqual(presentationFormIdUsed, "recordTypeFormPGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let factoredForm = factoredRecordGui.getReturnedPresentations(0);
	assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(1));
});

QUnit.test("testReloadRecordHandlerViewNewFormFactoredAndAdded", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.specForNew);
	recordHandler.reloadForMetadataChanges();

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(1);

	let presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
	assert.strictEqual(presentationFormIdUsed, "recordTypeFormNewPGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let factoredForm = factoredRecordGui.getReturnedPresentations(0);
	assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(1));
});

QUnit.test("testReloadRecordHandlerViewViewFactoredAndAdded", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	recordHandler.reloadForMetadataChanges();

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(1);

	let presentationViewIdUsed = factoredRecordGui.getPresentationIdUsed(1);
	assert.strictEqual(presentationViewIdUsed, "recordTypeViewPGroup");

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	let factoredView = factoredRecordGui.getReturnedPresentations(1);
	assert.strictEqual(factoredView.getView(), recordHandlerViewSpy.getAddedShowView(1));
});

QUnit.test("testReloadRecordHandlerViewMenuFactoredAndAdded", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	recordHandler.reloadForMetadataChanges();

	let factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(1);

	let presentationMenuViewIdUsed = factoredRecordGui.getPresentationIdUsed(2);
	assert.strictEqual(presentationMenuViewIdUsed, "recordTypeMenuPGroup");

	let managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	let factoredView = factoredRecordGui.getReturnedPresentations(2);
	assert.strictEqual(factoredView.getView(), managedGuiItemSpy.getAddedMenuPresentation(1));
});

QUnit.test("testShowIncomingLinks", function(assert) {
	this.spec.createNewRecord = "false";
	this.spec.record = this.recordWithReadIncomingLinks;

	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCallWithIncomingLinks(0);

	let recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	recordHandler.showIncomingLinks();

	let addedToIncomingLinksView = recordHandlerViewSpy
		.getObjectAddedToIncomingLinksView(0);
	let factoredIncomingLinksListHandler = this.dependencies.globalFactories.incomingLinksListHandlerFactory
		.getFactored(0);
	let incomingLinksListSpyView = factoredIncomingLinksListHandler.getView();
	assert.strictEqual(addedToIncomingLinksView, incomingLinksListSpyView);

	let expectedSpec = {
		read_incoming_links: this.spec.record.actionLinks.read_incoming_links
	}
	let usedSpec = factoredIncomingLinksListHandler.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
});

QUnit.test("testPublishMessageOnCallMethodAfterShowWorkView", function(assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	let pubSub = this.dependencies.recordGuiFactory.getFactored(0).pubSub;
	let messages = pubSub.getMessages();
	assert.deepEqual(messages.length, 0);
	recordHandler.callMethodAfterShowWorkView();
	assert.deepEqual(messages.length, 1);
	let firstMessage = messages[0];
	assert.strictEqual(firstMessage.type, "viewJustMadeVisible");
	assert.stringifyEqual(firstMessage.message.path, {});
	assert.strictEqual(firstMessage.message.data, "");
});

QUnit.test("testNoPublishMessageOnCallMethodAfterShowWorkViewBeforeRecordGuiInitialized", function(
	assert) {
	let recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	recordHandler.callMethodAfterShowWorkView();
	assert.equal(true, true);

	this.answerCall(0);

	let pubSub = this.dependencies.recordGuiFactory.getFactored(0).pubSub;
	let messages = pubSub.getMessages();
	assert.deepEqual(messages.length, 0);

	recordHandler.callMethodAfterShowWorkView();

	assert.deepEqual(messages.length, 1);
});