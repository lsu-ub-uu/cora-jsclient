/*
 * Copyright 2024 Uppsala University Library
 * Copyright 2023, 2024 Olov McKie
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

QUnit.module("recursiveDelete/recursiveDeleteViewTest.js", hooks => {
	const test = QUnit.test;

	let dependencies;
	let spec;
	let viewModel;
	let recursiveDeleteView;
	const textProvider = CORATEST.textProviderSpy();

	hooks.beforeEach(() => {
		dependencies = {
			textProvider: textProvider,
			questionFactory: CORATEST.standardFactorySpy("questionSpy")
		};
		spec = {
			someKey: "someValue"
		};

		recursiveDeleteView = CORA.recursiveDeleteView(dependencies, spec);
		setUpBasicViewModel();
	});

	hooks.afterEach(() => {
		//no after
	});

	const setUpBasicViewModel = function() {
		viewModel = {
			elementId: 1,
			id: "minimalGroupId",
			type: "group",
			nameInData: "minimalGroup",
			dataDivider: "someDataDivider",
			texts: [{ elementId: 2, id: "minimalGroupIdText", recordType: "text", dataDivider: "someDataDivider" },
			{ elementId: 3, id: "minimalGroupIdDefText", recordType: "text", dataDivider: "someDataDivider" }],
			methodOpenDefiningRecord: openDefiningRecordUsingEventAndId,
			attributes: [],
			refCollection: [],
			collectionItems: [],
			presentations: [],
			children: []
		};

		let child = {
			elementId: 4,
			id: "textVarId",
			type: "textVariable",
			nameInData: "textVar",
			dataDivider: "someOtherDataDivider",
			texts: [{ elementId: 5, id: "someTextId", recordType: "text" }, { elementId: 6, id: "someDefTextId", recordType: "text" }],
			methodOpenDefiningRecord: openDefiningRecordUsingEventAndId
		};
		viewModel.children.push(child);
	};

	const openDefiningRecordUsingEventAndId = function(event, id) {
		callsToOpenDefiningRecord.push({ event: event, id: id });
	};

	test("testInit", function(assert) {
		assert.strictEqual(recursiveDeleteView.type, "recursiveDeleteView");
	});

	test("testOnlyForTestGetDependencies", function(assert) {
		assert.strictEqual(recursiveDeleteView.onlyForTestGetDependencies(), dependencies);
	});

	test("testGetView", function(assert) {
		let view = recursiveDeleteView.getView();
		CORATEST.assertElementHasTypeClassText(view, "SPAN", "recursiveDelete", "", assert);
	});

	test("testBasicView", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);
		CORATEST.assertElementHasTypeClassText(view, "SPAN", "recursiveDelete", "", assert);

		let header = view.childNodes[0];
		CORATEST.assertElementHasTypeClassText(header, "DIV", "header", "Recursive delete of minimalGroupId", assert);
	});


	test("testLegend", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		let legend = view.childNodes[2];
		assert.strictEqual(legend.childNodes[0].textContent, "Legend", assert);

		let storage = legend.childNodes[1];
		CORATEST.assertElementHasTypeClassText(storage, "DIV", "", "", assert);
		CORATEST.assertElementHasTypeClassText(storage.childNodes[0], "SPAN", "presentation", "P", assert);
		CORATEST.assertElementHasTypeClassText(storage.childNodes[1], "SPAN", "", "Presentation", assert);
	});

	//	test("testConfirmationMessageAndButton", function(assert) {
	//		let view = recursiveDeleteView.createViewForViewModel(viewModel);
	//
	//		let confimationMessage = view.childNodes[3];
	//		assert.strictEqual(confimationMessage.childNodes[0].textContent, "Attention", assert);
	//
	//		CORATEST.assertElementHasTypeClassText(confimationMessage, "DIV", "confirmationMessage", "Attention", assert);
	//	});

	test("testAddDeleteButton", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		let button = view.lastChild;
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, recursiveDeleteView.showDeleteConfirmation);
		assert.strictEqual(button.className, "recursiveDeleteButton");
		let buttonText = textProvider.getTranslation("theClient_recursiveDeleteButtonText");
		assert.strictEqual(button.value, buttonText);
	});

	test("testShowDeleteConfirmation", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);
		let fakeDeleteMethod = function() { };
		recursiveDeleteView.setDeleteMethod(fakeDeleteMethod);

		recursiveDeleteView.showDeleteConfirmation();

		let confirmText = textProvider.getTranslation("theClient_recursiveDeleteConfirmText");
		let confirmButtonNoText = textProvider.getTranslation("theClient_recursiveDeleteConfirmButtonNoText");
		let confirmButtonYesText = textProvider.getTranslation("theClient_recursiveDeleteConfirmButtonYesText");

		let questionSpec = dependencies.questionFactory.getSpec(0);
		let questionSpy = dependencies.questionFactory.getFactored(0);

		let expectedQuestionSpec = {
			text: confirmText,
			buttons: [{
				text: confirmButtonNoText
			}, {
				text: confirmButtonYesText,
				onclickFunction: fakeDeleteMethod
			}]
		};
		assert.deepEqual(questionSpec, expectedQuestionSpec);

		assert.strictEqual(view.lastChild, questionSpy.getView());
	});

	test("testBasicMetadata", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		CORATEST.assertElementHasTypeClassText(getFirstLevelUL(view), "UL", "metadata", "", assert);
		let firstLI = getFirstLevelLI(view);
		CORATEST.assertElementHasTypeClassText(firstLI, "LI", "recursiveDeleteGroup", "", assert);

		let elementNodes = firstLI.childNodes;
		let element = elementNodes[0];
		CORATEST.assertElementHasIdTypeClassText(element, "SPAN", 1, "toBeDeleted", "minimalGroupId[minimalGroup]group(someDataDivider)", assert);

		let elementParts = element.childNodes;
		CORATEST.assertElementHasTypeClassText(elementParts[0], "SPAN", "id", "minimalGroupId", assert);
		CORATEST.assertElementHasTypeClassText(elementParts[1], "SPAN", "nameInData", "[minimalGroup]", assert);
		CORATEST.assertElementHasTypeClassText(elementParts[2], "SPAN", "type", "group", assert);
		CORATEST.assertElementHasTypeClassText(elementParts[3], "SPAN", "dataDivider", "(someDataDivider)", assert);
	});

	const getFirstLevelUL = function(view) {
		return view.childNodes[1];
	};

	const getFirstLevelLI = function(view) {
		let firstLevelUL = getFirstLevelUL(view);
		return firstLevelUL.childNodes[0];
	};

	test("testBasicMetadataOnClickOpensDefiningRecord_onId", function(assert) {
		let callsToOpenDefiningRecord = [];
		let openDefiningRecordUsingEventAndId = function(event, id) {
			callsToOpenDefiningRecord.push({ event: event, id: id });
		}
		viewModel.methodOpenDefiningRecord = openDefiningRecordUsingEventAndId;
		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		let element = getFirstElement(view);
		let elementParts = element.childNodes;
		CORATESTHELPER.simulateOnclick(elementParts[0], { ctrlKey: true });

		assert.deepEqual(callsToOpenDefiningRecord[0].event.ctrlKey, true);
		assert.deepEqual(callsToOpenDefiningRecord[0].id, "minimalGroupId");
	});

	const getFirstElement = function(view) {
		let firstLI = getFirstLevelLI(view);
		let elementNodes = firstLI.childNodes;
		return elementNodes[0];
	};

	test("testBasicMetadataOnClickOpensDefiningRecord_OnNameInData", function(assert) {
		let callsToOpenDefiningRecord = [];
		let openDefiningRecordUsingEventAndId = function(event, id) {
			callsToOpenDefiningRecord.push({ event: event, id: id });
		}
		viewModel.methodOpenDefiningRecord = openDefiningRecordUsingEventAndId;

		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		let element = getFirstElement(view);
		let elementParts = element.childNodes;

		CORATESTHELPER.simulateOnclick(elementParts[1], { ctrlKey: true });
		assert.deepEqual(callsToOpenDefiningRecord[0].event.ctrlKey, true);
		assert.deepEqual(callsToOpenDefiningRecord[0].id, "minimalGroupId");
	});

	test("testTextAndDefText", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		let firstLevelUL = view.childNodes[1];
		let firstLevelLI = firstLevelUL.childNodes[0];
		let secondLevelUL = firstLevelLI.childNodes[1];
		assert.strictEqual(secondLevelUL.tagName, "UL");

		let textLI = secondLevelUL.childNodes[0];
		assert.strictEqual(textLI.tagName, "LI");
		assert.strictEqual(textLI.className, "");
		let textElement = textLI.childNodes[0];
		let textElementParts = textElement.childNodes;
		//assert.strictEqual(textElementParts.length, 3);
		CORATEST.assertElementHasTypeClassText(textElementParts[0], "SPAN", "labelType", "text", assert);
		CORATEST.assertElementHasTypeClassText(textElementParts[1], "SPAN", "id", "minimalGroupIdText", assert);
		CORATEST.assertElementHasTypeClassText(textElementParts[2], "SPAN", "dataDivider", "(someDataDivider)", assert);


		let defTextLI = secondLevelUL.childNodes[1];
		assert.strictEqual(defTextLI.tagName, "LI");
		assert.strictEqual(defTextLI.className, "");
		let defTtextElement = defTextLI.childNodes[0];
		let defTtextElementParts = defTtextElement.childNodes;
		//	assert.strictEqual(defTtextElementParts.length, 3);
		CORATEST.assertElementHasTypeClassText(defTtextElementParts[0], "SPAN", "labelType", "text", assert);
		CORATEST.assertElementHasTypeClassText(defTtextElementParts[1], "SPAN", "id", "minimalGroupIdDefText", assert);
		CORATEST.assertElementHasTypeClassText(defTtextElementParts[2], "SPAN", "dataDivider", "(someDataDivider)", assert);


		let textVarLI = secondLevelUL.childNodes[2];
		CORATEST.assertElementHasTypeClassText(textVarLI, "LI", "recursiveDeleteTextVariable", "", assert);

		let textVarElement = textVarLI.childNodes[0];
		let textVarElementParts = textVarElement.childNodes;
		//			assert.strictEqual(textVarElementParts.length, 3);
		CORATEST.assertElementHasTypeClassText(textVarElementParts[0], "SPAN", "id", "textVarId", assert);
		CORATEST.assertElementHasTypeClassText(textVarElementParts[1], "SPAN", "nameInData", "[textVar]", assert);
		CORATEST.assertElementHasTypeClassText(textVarElementParts[2], "SPAN", "type", "textVariable", assert);
		CORATEST.assertElementHasTypeClassText(textVarElementParts[3], "SPAN", "dataDivider", "(someOtherDataDivider)", assert);

		CORATEST.assertElementHasTypeClassText(textVarLI, "LI", "recursiveDeleteTextVariable", "", assert);
		let thirdLevelUL = textVarLI.childNodes[1];
		let secondLevelTextLI = thirdLevelUL.childNodes[0];
		let secondLevelTextElement = secondLevelTextLI.childNodes[0];
		let secondLevelTextElementParts = secondLevelTextElement.childNodes;
		//	assert.strictEqual(secondLevelTextElementParts.length, 3);
		CORATEST.assertElementHasTypeClassText(secondLevelTextElementParts[0], "SPAN", "labelType", "text", assert);
		CORATEST.assertElementHasTypeClassText(secondLevelTextElementParts[1], "SPAN", "id", "someTextId", assert);
		CORATEST.assertElementHasTypeClassText(secondLevelTextElementParts[2], "SPAN", "dataDivider", "(-)", assert);

		let secondLevelDefTextLI = thirdLevelUL.childNodes[1];
		let secondLevelDefTextElement = secondLevelDefTextLI.childNodes[0];
		let secondLevelDefTextElementParts = secondLevelDefTextElement.childNodes;
		//	assert.strictEqual(secondLevelDefTextElementParts.length, 3);
		CORATEST.assertElementHasTypeClassText(secondLevelDefTextElementParts[0], "SPAN", "labelType", "text", assert);
		CORATEST.assertElementHasTypeClassText(secondLevelDefTextElementParts[1], "SPAN", "id", "someDefTextId", assert);
		CORATEST.assertElementHasTypeClassText(secondLevelDefTextElementParts[2], "SPAN", "dataDivider", "(-)", assert);
	});

	test("testAttributeReference", function(assert) {
		let attributeReferenceChild = {
			elementId: 1,
			id: "attributeReferenceId",
			type: "collectionVariable",
			nameInData: "attributeReferences",
			dataDivider: "someDataDivider",
			methodOpenDefiningRecord: openDefiningRecordUsingEventAndId,
			attributes: []
		};

		let viewWithAttributes = viewModel;
		viewWithAttributes.attributes.push(attributeReferenceChild)

		let view = recursiveDeleteView.createViewForViewModel(viewWithAttributes);

		let firstLevelUL = view.childNodes[1];
		let firstLevelLI = firstLevelUL.childNodes[0];
		let secondLevelUL = firstLevelLI.childNodes[1];
		assert.strictEqual(secondLevelUL.tagName, "UL");

		let attributeLI = secondLevelUL.childNodes[2];
		CORATEST.assertElementHasTypeClassText(attributeLI, "LI", "recursiveDeleteCollectionVariable", "", assert);
		let attributeElement = attributeLI.childNodes[0];
		let attributeElementParts = attributeElement.childNodes;
		CORATEST.assertElementHasTypeClassText(attributeElementParts[0], "SPAN", "labelType", "attribute", assert);
		CORATEST.assertElementHasTypeClassText(attributeElementParts[1], "SPAN", "id", "attributeReferenceId", assert);
		CORATEST.assertElementHasTypeClassText(attributeElementParts[2], "SPAN", "nameInData", "[attributeReferences]", assert);
		CORATEST.assertElementHasTypeClassText(attributeElementParts[3], "SPAN", "type", "collectionVariable", assert);
		CORATEST.assertElementHasTypeClassText(attributeElementParts[4], "SPAN", "dataDivider", "(someDataDivider)", assert);
	});

	test("testRefCollection", function(assert) {
		let refCollection = {
			elementId: 1,
			id: "itemCollectionId",
			type: "collectionVariable",
			nameInData: "itemCollectionName",
			dataDivider: "someDataDivider",
			methodOpenDefiningRecord: this.openDefiningRecordUsingEventAndId,
			collectionItems: []
		};

		let viewWithAttributes = viewModel;
		viewWithAttributes.refCollection.push(refCollection)

		let view = recursiveDeleteView.createViewForViewModel(viewWithAttributes);

		let firstLevelUL = view.childNodes[1];
		let firstLevelLI = firstLevelUL.childNodes[0];
		let secondLevelUL = firstLevelLI.childNodes[1];
		assert.strictEqual(secondLevelUL.tagName, "UL");

		let attributeLI = secondLevelUL.childNodes[2];
		CORATEST.assertElementHasTypeClassText(attributeLI, "LI", "recursiveDeleteCollectionVariable", "", assert);
		let refCollectionElement = attributeLI.childNodes[0];
		let refCollectionElementParts = refCollectionElement.childNodes;
		CORATEST.assertElementHasTypeClassText(refCollectionElementParts[0], "SPAN", "labelType", "refCollection", assert);
		CORATEST.assertElementHasTypeClassText(refCollectionElementParts[1], "SPAN", "id", "itemCollectionId", assert);
		CORATEST.assertElementHasTypeClassText(refCollectionElementParts[2], "SPAN", "nameInData", "[itemCollectionName]", assert);
		CORATEST.assertElementHasTypeClassText(refCollectionElementParts[3], "SPAN", "type", "collectionVariable", assert);
		CORATEST.assertElementHasTypeClassText(refCollectionElementParts[4], "SPAN", "dataDivider", "(someDataDivider)", assert);
	});

	test("testCollectionItemReferences", function(assert) {
		let collectionItem = {
			id: "collectionItemId",
			type: "collectionVariable",
			nameInData: "collectionItemName",
			dataDivider: "someDataDivider",
			methodOpenDefiningRecord: this.openDefiningRecordUsingEventAndId
		};

		let viewWithAttributes = viewModel;
		viewWithAttributes.collectionItems.push(collectionItem)

		let view = recursiveDeleteView.createViewForViewModel(viewWithAttributes);

		let firstLevelUL = view.childNodes[1];
		let firstLevelLI = firstLevelUL.childNodes[0];
		let secondLevelUL = firstLevelLI.childNodes[1];
		assert.strictEqual(secondLevelUL.tagName, "UL");

		let attributeLI = secondLevelUL.childNodes[2];
		CORATEST.assertElementHasTypeClassText(attributeLI, "LI", "recursiveDeleteCollectionVariable", "", assert);
		let collectionItemRefElement = attributeLI.childNodes[0];
		let collectionItemRefElementParts = collectionItemRefElement.childNodes;
		CORATEST.assertElementHasTypeClassText(collectionItemRefElementParts[0], "SPAN", "labelType", "collectionItems", assert);
		CORATEST.assertElementHasTypeClassText(collectionItemRefElementParts[1], "SPAN", "id", "collectionItemId", assert);
		CORATEST.assertElementHasTypeClassText(collectionItemRefElementParts[2], "SPAN", "nameInData", "[collectionItemName]", assert);
		CORATEST.assertElementHasTypeClassText(collectionItemRefElementParts[3], "SPAN", "type", "collectionVariable", assert);
		CORATEST.assertElementHasTypeClassText(collectionItemRefElementParts[4], "SPAN", "dataDivider", "(someDataDivider)", assert);
	});

	test("testChildReference", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		let firstLevelUL = view.childNodes[1];
		let firstLevelLI = firstLevelUL.childNodes[0];
		let secondLevelUL = firstLevelLI.childNodes[1];
		assert.strictEqual(secondLevelUL.tagName, "UL");

		let attributeLI = secondLevelUL.childNodes[2];
		CORATEST.assertElementHasTypeClassText(attributeLI, "LI", "recursiveDeleteTextVariable", "", assert);
		let childReferenceElement = attributeLI.childNodes[0];
		let childReferenceElementParts = childReferenceElement.childNodes;
		CORATEST.assertElementHasTypeClassText(childReferenceElementParts[0], "SPAN", "id", "textVarId", assert);
		CORATEST.assertElementHasTypeClassText(childReferenceElementParts[1], "SPAN", "nameInData", "[textVar]", assert);
		CORATEST.assertElementHasTypeClassText(childReferenceElementParts[2], "SPAN", "type", "textVariable", assert);
		CORATEST.assertElementHasTypeClassText(childReferenceElementParts[3], "SPAN", "dataDivider", "(someOtherDataDivider)", assert);
	});

	test("testPresentations", function(assert) {
		let presentations = [
			{
				elementId: 1,
				id: "recordTypeFormPGroup",
				recordType: "presentation",
				type: "container",
				chilPresentations: [{
					id: "childPresentation",
					recordType: "someRecordType",
					type: "pVar"
				}],
				texts: [{
					elementId: 2,
					id: "textsText",
					recordType: "text",
				}],
				guiElements: [{
					elementId: 3,
					id: "testGuiElement",
					recordType: "guiElement",
					type: "guiElementLink",
					elementText: [{ elementId: 4, id: "minimalGroupIdText", recordType: "text" }]
				}]
			},
			{
				elementId: 15,
				id: "recordTypeFormNewPGroup",
				recordType: "someRecordType",
				type: "group"
			},
			{
				elementId: 6,
				id: "recordTypeViewPGroup",
				recordType: "someRecordType",
				type: "group"
			}
		];

		viewModel.presentations = presentations;

		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		let firstLevelUL = view.childNodes[1];
		let firstLevelLI = firstLevelUL.childNodes[0];
		let secondLevelUL = firstLevelLI.childNodes[1];
		assert.strictEqual(secondLevelUL.tagName, "UL");

		let secondLevelLI = secondLevelUL.childNodes[2];
		CORATEST.assertElementHasTypeClassText(secondLevelLI, "LI", "recursiveDeleteContainer", "", assert);
		let presentationElement = secondLevelLI.childNodes[0];
		let presentationElementParts = presentationElement.childNodes;

		CORATEST.assertElementHasTypeClassText(presentationElementParts[0], "SPAN", "labelType", "presentation", assert);
		CORATEST.assertElementHasTypeClassText(presentationElementParts[1], "SPAN", "id", "recordTypeFormPGroup", assert);
		CORATEST.assertElementHasTypeClassText(presentationElementParts[2], "SPAN", "type", "container", assert);
		CORATEST.assertElementHasTypeClassText(presentationElementParts[3], "SPAN", "dataDivider", "(-)", assert);

		let thirdLevelUL = secondLevelLI.childNodes[1];
		assert.strictEqual(thirdLevelUL.tagName, "UL");

		let textsText = thirdLevelUL.childNodes[0].childNodes[0].childNodes;
		CORATEST.assertElementHasTypeClassText(textsText[0], "SPAN", "labelType", "text", assert);
		CORATEST.assertElementHasTypeClassText(textsText[1], "SPAN", "id", "textsText", assert);
		CORATEST.assertElementHasTypeClassText(textsText[2], "SPAN", "dataDivider", "(-)", assert);

		let childPresentation = thirdLevelUL.childNodes[1].childNodes[0].childNodes;
		CORATEST.assertElementHasTypeClassText(childPresentation[0], "SPAN", "labelType", "childPresentation", assert);
		CORATEST.assertElementHasTypeClassText(childPresentation[1], "SPAN", "id", "childPresentation", assert);
		CORATEST.assertElementHasTypeClassText(childPresentation[2], "SPAN", "type", "pVar", assert);
		CORATEST.assertElementHasTypeClassText(childPresentation[3], "SPAN", "dataDivider", "(-)", assert);

		let guiElement = thirdLevelUL.childNodes[2].childNodes[0].childNodes;
		CORATEST.assertElementHasTypeClassText(guiElement[0], "SPAN", "labelType", "guiElement", assert);
		CORATEST.assertElementHasTypeClassText(guiElement[1], "SPAN", "id", "testGuiElement", assert);
		CORATEST.assertElementHasTypeClassText(guiElement[2], "SPAN", "type", "guiElementLink", assert);
		CORATEST.assertElementHasTypeClassText(guiElement[3], "SPAN", "dataDivider", "(-)", assert);

		let guiElementElementTextUL = thirdLevelUL.childNodes[2].childNodes[1];
		let guiElementElementText = guiElementElementTextUL.childNodes[0].childNodes[0].childNodes;
		CORATEST.assertElementHasTypeClassText(guiElementElementText[0], "SPAN", "labelType", "elementText", assert);
		CORATEST.assertElementHasTypeClassText(guiElementElementText[1], "SPAN", "id", "minimalGroupIdText", assert);
		CORATEST.assertElementHasTypeClassText(guiElementElementText[2], "SPAN", "dataDivider", "(-)", assert);

	});

	test("testChangeClassToDeleting", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		recursiveDeleteView.setDeletingElement("1");

		let metadataNode = view.childNodes[1];
		let elementOne = metadataNode.firstChild.firstChild;
		assert.strictEqual(elementOne.className, "deleting");
	});

	test("testChangeClassToDeleted", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);

		recursiveDeleteView.setDeletedElement("1");

		let metadataNode = view.childNodes[1];
		let elementOne = metadataNode.firstChild.firstChild;
		assert.strictEqual(elementOne.className, "deleted");
	});

	test("testChangeClassToFailed", function(assert) {
		let view = recursiveDeleteView.createViewForViewModel(viewModel);
		let errorMessage = "404 : someError";
		recursiveDeleteView.setDeleteFailedElement("1", errorMessage);

		let metadataNode = view.childNodes[1];
		let elementOne = metadataNode.firstChild.firstChild;
		assert.strictEqual(elementOne.className, "failed");

		let errorElement = elementOne.lastChild;
		assert.strictEqual(errorElement.tagName, "SPAN");
		assert.strictEqual(errorElement.className, "errorMessage");
		assert.strictEqual(errorElement.textContent, errorMessage);

	});
});