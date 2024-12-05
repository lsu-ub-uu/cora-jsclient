/*
 * Copyright 2024 Uppsala University Library
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

QUnit.module.only("recursiveDelete/recursiveDeleteDeleterTest.js", hooks => {
	const test = QUnit.test;
	const only = QUnit.only;

	let dependencies;
	let deleteUrl = "http://someRestUrl/rest/record/";
	let ajaxCallFactorySpy;
	let viewModel;
	let childViewModel;
	let deleter;
	let recursiveDeleteView;

	hooks.beforeEach(() => {
		ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		recursiveDeleteView = CORATEST.recursiveDeleteViewSpy();

		setupDependencies();

		deleter = CORA.recursiveDeleteDeleter(dependencies);

		setUpBasicViewModel();

		deleter.setModelAndUrlForDelete(viewModel, deleteUrl);
	});

	hooks.afterEach(() => {
		//no after
	});

	const setupDependencies = function() {
		dependencies = {
			ajaxCallFactory: ajaxCallFactorySpy,
			view: recursiveDeleteView
		};
	};

	const setUpBasicViewModel = function() {
		viewModel = {
			elementId: 1,
			id: "minimalGroupId",
			type: "group",
			recordType: "metadata",
			nameInData: "minimalGroup",
			texts: [{ elementId: 2, id: "minimalGroupIdText", recordType: "text", dataDivider: "someDataDivider" },
			{ elementId: 3, id: "minimalGroupIdDefText", recordType: "text", dataDivider: "someDataDivider" }],
			methodOpenDefiningRecord: openDefiningRecordUsingEventAndId,
			children: []
		};

		childViewModel = {
			elementId: 4,
			id: "textVarId",
			type: "textVariable",
			recordType: "metadata",
			nameInData: "textVar",
			texts: [{ elementId: 5, id: "someTextId", recordType: "text" }, { elementId: 6, id: "someDefTextId", recordType: "text" }],
			methodOpenDefiningRecord: openDefiningRecordUsingEventAndId
		};
		viewModel.children.push(childViewModel);
	};

	const openDefiningRecordUsingEventAndId = function(event, id) {
		callsToOpenDefiningRecord.push({ event: event, id: id });
	};

	test("testDeleteElementSetDeletingAndCallsDeleteUsingAjax", function(assert) {

		deleter.deleteElement();

		assert.strictEqual(recursiveDeleteView.getDeletingElement(0), 1);
		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 1);
		assertAjaxCalls(assert, 0, deleteUrl + "metadata/minimalGroupId", "DELETE", viewModel);
	});

	test("testDeleteElementCallBackSetDeletingAndCallsDeleteForAllChildren", function(assert) {
		deleter.deleteElement();

		sendOkAnswerToAjaxCall(0);

		assert.strictEqual(recursiveDeleteView.getDeletedElement(0), 1);

		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 4);
		let textElement = { elementId: 2, id: "minimalGroupIdText", recordType: "text", dataDivider: "someDataDivider" };
		let defTextElement = { elementId: 3, id: "minimalGroupIdDefText", recordType: "text", dataDivider: "someDataDivider" };
		assertAjaxCalls(assert, 0, deleteUrl + "metadata/minimalGroupId", "DELETE", viewModel);
		assertAjaxCalls(assert, 1, deleteUrl + "text/minimalGroupIdText", "DELETE", textElement);
		assertAjaxCalls(assert, 2, deleteUrl + "text/minimalGroupIdDefText", "DELETE", defTextElement);
		assertAjaxCalls(assert, 3, deleteUrl + "metadata/textVarId", "DELETE", childViewModel);

		assert.strictEqual(recursiveDeleteView.getDeletingElement(1), 2);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(2), 3);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(3), 4);
	});

	const getCallSpecFromAjaxCall = function(callNumber) {
		let factoredAjax = ajaxCallFactorySpy.getFactored(callNumber);
		return factoredAjax.getSpec();
	};


	test("testDeleteElementCallFailsSetFailedDeletingAndCallsDeleteForAllChildren", function(assert) {
		let answer = {
			spec: { model: viewModel },
			status: 404,
			response: "someError"
		};

		deleter.deleteElement();
		let callSpec = getCallSpecFromAjaxCall(0);
		callSpec.errorMethod(answer);

		let expectedFailedMessage = {
			elementId: 1,
			errorMessage: "404 : someError"
		};
		assert.deepEqual(recursiveDeleteView.getDeleteFailedElement(0), expectedFailedMessage);

		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 1);
	});

	const assertAjaxCalls = function(assert, callNumber, url, requestMethod, expectedModel) {
		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(callNumber);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, url);
		assert.strictEqual(ajaxCallSpec.requestMethod, requestMethod);
		assert.strictEqual(ajaxCallSpec.accept, undefined);
		assert.strictEqual(ajaxCallSpec.contentType, undefined);
		assert.strictEqual(ajaxCallSpec.data, undefined);
		assert.deepEqual(ajaxCallSpec.model, expectedModel);
	};

	test("deleteElementsWithAttributes", function(assert) {
		let textElement = { elementId: 2, id: "minimalGroupIdText", recordType: "text", dataDivider: "someDataDivider" };
		let defTextElement = { elementId: 3, id: "minimalGroupIdDefText", recordType: "text", dataDivider: "someDataDivider" };

		let viewModel = {
			elementId: 1,
			id: "minimalGroupId",
			type: "group",
			recordType: "someRecordType",
			nameInData: "minimalGroupName",
			texts: [textElement, defTextElement],
			attributes: []
		};

		let attribute = {
			elementId: 4,
			id: "attributeCollectionVarId",
			recordType: "someRecordType",
			type: "collectionVariable",
			nameInData: "collectionVarName",
			texts: [textElement, defTextElement],
			refCollection: []
		};
		viewModel.attributes.push(attribute);

		deleter.setModelAndUrlForDelete(viewModel, deleteUrl);
		deleter.deleteElement();

		sendOkAnswerToAjaxCall(0);

		assert.strictEqual(recursiveDeleteView.getDeletingElement(0), 1);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(1), 2);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(2), 3);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(3), 4);
		assert.strictEqual(recursiveDeleteView.getDeletedElement(0), 1);

		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 4);
		assertAjaxCalls(assert, 0, deleteUrl + "someRecordType/minimalGroupId", "DELETE", viewModel);
		assertAjaxCalls(assert, 1, deleteUrl + "text/minimalGroupIdText", "DELETE", textElement);
		assertAjaxCalls(assert, 2, deleteUrl + "text/minimalGroupIdDefText", "DELETE", defTextElement);
		assertAjaxCalls(assert, 3, deleteUrl + "someRecordType/attributeCollectionVarId", "DELETE", attribute);
	});

	test("deleteElementsCollections", function(assert) {
		let textElement = { elementId: 2, id: "minimalGroupIdText", recordType: "text", dataDivider: "someDataDivider" };
		let defTextElement = { elementId: 3, id: "minimalGroupIdDefText", recordType: "text", dataDivider: "someDataDivider" };

		let viewModel = {
			elementId: 4,
			id: "attributeCollectionVarId",
			recordType: "someRecordType",
			type: "collectionVariable",
			nameInData: "collectionVarName",
			texts: [textElement, defTextElement],
			refCollection: [],
			collectionItems: []
		};

		let refCollection = {
			elementId: 7,
			id: "itemCollectionId",
			recordType: "someRecordType",
			type: "itemCollection",
			nameInData: "itemCollectionName",
			texts: [textElement, defTextElement]
		};
		viewModel.refCollection.push(refCollection);

		let collectionItem = {
			elementId: 10,
			id: "collectionItemId",
			recordType: "someRecordType",
			type: "collectionItem",
			nameInData: "collectionItemName",
			texts: [textElement, defTextElement]
		};
		viewModel.collectionItems.push(collectionItem);

		deleter.setModelAndUrlForDelete(viewModel, deleteUrl);
		deleter.deleteElement();

		sendOkAnswerToAjaxCall(0);

		assert.strictEqual(recursiveDeleteView.getDeletingElement(0), 4);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(1), 2);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(2), 3);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(3), 7);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(4), 10);
		assert.strictEqual(recursiveDeleteView.getDeletedElement(0), 4);

		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 5);
		assertAjaxCalls(assert, 0, deleteUrl + "someRecordType/attributeCollectionVarId", "DELETE", viewModel);
		assertAjaxCalls(assert, 1, deleteUrl + "text/minimalGroupIdText", "DELETE", textElement);
		assertAjaxCalls(assert, 2, deleteUrl + "text/minimalGroupIdDefText", "DELETE", defTextElement);
		assertAjaxCalls(assert, 3, deleteUrl + "someRecordType/itemCollectionId", "DELETE", refCollection);
		assertAjaxCalls(assert, 4, deleteUrl + "someRecordType/collectionItemId", "DELETE", collectionItem);
	});

	test("testPresentationsFromIncomminLinksMustBeDeletedFirst", function(assert) {
		let viewModel = {
			elementId: 1,
			id: "someGroup",
			recordType: "metadata",
			type: "group",
			presentations: []
		};

		let presentation2 = {
			elementId: 2,
			id: "somePresentation2",
			recordType: "presentation",
			type: "pVar",
			childPresentations: []
		};
		viewModel.presentations.push(presentation2);

		let presentation3 = {
			elementId: 3,
			id: "somePresentation3",
			recordType: "presentation",
			type: "pVar",
			childPresentations: []
		};
		viewModel.presentations.push(presentation3);

		deleter.setModelAndUrlForDelete(viewModel, deleteUrl);
		deleter.deleteElement();

		assertElementIdSetToDeleting(assert, 0, 2);
		assertElementIdSetToDeleting(assert, 1, 3);
		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 2);
		assertAjaxCallsPresentation(assert, 0, deleteUrl + "presentation/somePresentation2",
			"DELETE", presentation2, viewModel);
		assertAjaxCallsPresentation(assert, 1, deleteUrl + "presentation/somePresentation3",
			"DELETE", presentation3, viewModel);

		sendOkAnswerToAjaxPresentationCall(1);

		assertElementIdSetToDeleted(assert, 0, 3);
		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 2);

		sendOkAnswerToAjaxPresentationCall(0);

		assertElementIdSetToDeleted(assert, 1, 2);
		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 3);

		assertElementIdSetToDeleting(assert, 2, 1);
		assertAjaxCalls(assert, 2, deleteUrl + "metadata/someGroup", "DELETE", viewModel);

		sendOkAnswerToAjaxCall(2);

		assertElementIdSetToDeleted(assert, 2, 1);

	});

	const sendOkAnswerToAjaxPresentationCall = function(callNo) {
		let callSpec = getCallSpecFromAjaxCall(callNo);
		let answer = {
			spec: {
				presentationModel: callSpec.presentationModel,
				parentModel: callSpec.parentModel,
				presentationCalls: callSpec.presentationCalls
			}
		};
		callSpec.loadMethod(answer);
	}

	const sendOkAnswerToAjaxCall = function(callNo) {
		let callSpec = getCallSpecFromAjaxCall(callNo);
		let answer = {
			spec: {
				model: callSpec.model
			}
		};
		callSpec.loadMethod(answer);
	}

	const assertElementIdSetToDeleting = function(assert, callNo, elementId) {
		assert.strictEqual(recursiveDeleteView.getDeletingElement(callNo), elementId);
	};
	const assertElementIdSetToDeleted = function(assert, callNo, elementId) {
		assert.strictEqual(recursiveDeleteView.getDeletedElement(callNo), elementId);
	};
	const assertElementIdSetDeleteFailed = function(assert, callNo, elementId) {
		assert.strictEqual(recursiveDeleteView.getDeleteFailedElement(callNo), elementId);
	};

	const assertAjaxCallsPresentation = function(assert, callNumber, url, requestMethod,
		presentationModel, expectedParentModel) {
		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(callNumber);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, url);
		assert.strictEqual(ajaxCallSpec.requestMethod, requestMethod);
		assert.strictEqual(ajaxCallSpec.accept, undefined);
		assert.strictEqual(ajaxCallSpec.contentType, undefined);
		assert.strictEqual(ajaxCallSpec.data, undefined);
		assert.deepEqual(ajaxCallSpec.presentationModel, presentationModel);
		assert.deepEqual(ajaxCallSpec.parentModel, expectedParentModel);
	};


	test("deletePresentations", function(assert) {
		let viewModel = {
			elementId: 1,
			id: "recordTypeFormPGroup",
			recordType: "presentation",
			type: "container",
			childPresentations: [],
			texts: [],
			guiElements: [],
			elementText: []
		};

		let childPresentation = {
			elementId: 2,
			id: "childPresentation",
			recordType: "presentation",
			type: "pVar"
		};
		viewModel.childPresentations.push(childPresentation);

		let text = {
			elementId: 3,
			id: "textsText",
			recordType: "text",
		};
		viewModel.texts.push(text);

		let guiElement = {
			elementId: 4,
			id: "testGuiElement",
			recordType: "guiElement",
			type: "guiElementLink"
		};
		viewModel.guiElements.push(guiElement);

		let elementText = { elementId: 5, id: "elementTextId", recordType: "text" };
		viewModel.elementText.push(elementText);

		deleter.setModelAndUrlForDelete(viewModel, deleteUrl);
		deleter.deleteElement();

		sendOkAnswerToAjaxCall(0);

		assert.strictEqual(recursiveDeleteView.getDeletingElement(0), 1);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(1), 3);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(2), 2);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(3), 4);
		assert.strictEqual(recursiveDeleteView.getDeletingElement(4), 5);
		assert.strictEqual(recursiveDeleteView.getDeletedElement(0), 1);

		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 5);
		assertAjaxCalls(assert, 0, deleteUrl + "presentation/recordTypeFormPGroup", "DELETE", viewModel);
		assertAjaxCalls(assert, 1, deleteUrl + "text/textsText", "DELETE", text);
		assertAjaxCalls(assert, 2, deleteUrl + "presentation/childPresentation", "DELETE", childPresentation);
		assertAjaxCalls(assert, 3, deleteUrl + "guiElement/testGuiElement", "DELETE", guiElement);
		assertAjaxCalls(assert, 4, deleteUrl + "text/elementTextId", "DELETE", elementText);
	});

	test("testViewModelWithoutAnyChildren", function(assert) {
		viewModel = {
			elementId: 1,
			id: "minimalGroupId",
			type: "group",
			recordType: "metadata",
			nameInData: "minimalGroup"
		};
		
		deleter.setModelAndUrlForDelete(viewModel, deleteUrl);
		deleter.deleteElement();
		
		sendOkAnswerToAjaxCall(0);

		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 1);
		assertAjaxCalls(assert, 0, deleteUrl + "metadata/minimalGroupId", "DELETE", viewModel);
	});

	test("testOnlyForTestGetDepencies", function(assert) {
		assert.strictEqual(deleter.onlyForTestGetDependencies(), dependencies);
	});
});