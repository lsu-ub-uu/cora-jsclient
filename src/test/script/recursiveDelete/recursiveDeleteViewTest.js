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

QUnit.module.only("recursiveDelete/recursiveDeleteViewTest.js", {
	beforeEach: function() {
		this.dependencies = {
			someDep: "someDep"
		}
		this.spec = {
			someKey: "someValue"
		};
		
		this.recursiveDeleteView = CORA.recursiveDeleteView(this.dependencies, this.spec);
		let viewModel = {
			id: "minimalGroupId",
			type: "group",
			nameInData: "minimalGroup",
			dataDivider: "someDataDivider",
			text: { id:"someTextId", type:"text", dataDivider:"someDataDivider", sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
			defText: { id:"someDefTextId", type:"text", dataDivider:"someDataDivider", sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
			methodOpenDefiningRecord : this.openDefiningRecordUsingEventAndId,
			attributes: [],
			refCollection: [],
			collectionItems: [],
			children: []
		};
		this.viewModel = viewModel;
		
		let child = {
//			 child: {
				id: "textVarId",
				type: "textVariable",
				nameInData: "textVar",
				dataDivider: "someOtherDataDivider",
				text: { id:"someTextId", type:"text", dataDivider:"someDataDivider", sv: "translated_sv_textVarIdText", en: "translated_en_textVarIdText" },
				defText: { id:"someDefTextId", type:"text", dataDivider:"someDataDivider", sv: "translated_sv_textVarIdDefText", en: "translated_en_textVarIdDefText" },
				methodOpenDefiningRecord : this.openDefiningRecordUsingEventAndId
//			}
		};
		viewModel.children.push(child);
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.recursiveDeleteView.type, "recursiveDeleteView");
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.recursiveDeleteView.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("testOnlyForTestGetSpec", function(assert) {
	assert.strictEqual(this.recursiveDeleteView.onlyForTestGetSpec(), this.spec);
});

QUnit.test("testBasicView", function(assert) {
	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);
	CORATEST.assertElementHasTypeClassText(view, "SPAN", "recursiveDelete", "", assert);

	let header = view.childNodes[0];
	CORATEST.assertElementHasTypeClassText(header, "DIV", "header", "Recursive delete of minimalGroupId", assert);
	
	recursiveDeleteUpdateViewForViewModelAndAssertSameContent(assert,this.recursiveDeleteView, this.viewModel, view);
});

let recursiveDeleteUpdateViewForViewModelAndAssertSameContent = function(assert, recursiveDeleteView, viewModel, view){
	let oldChildNodes = Array.from(view.childNodes);
	recursiveDeleteView.updateViewForViewModel(viewModel);
	let newChildNodes = Array.from(view.childNodes);
	for (let i = 0; i < oldChildNodes.length; i++) {
  		let oldItem = oldChildNodes[i];
  		let newItem = newChildNodes[i];
		assert.propEqual(oldItem, newItem);
		assert.notStrictEqual(oldItem, newItem);
	}
};
//
QUnit.test("testLegend", function(assert) {
	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);

	let legend = view.childNodes[2];
	assert.strictEqual(legend.childNodes[0].textContent, "Legend", assert);
	
	let storage = legend.childNodes[1];
	CORATEST.assertElementHasTypeClassText(storage, "DIV", "", "", assert);
	CORATEST.assertElementHasTypeClassText(storage.childNodes[0], "SPAN", "presentation", "P", assert);
	CORATEST.assertElementHasTypeClassText(storage.childNodes[1], "SPAN", "", "Presentation", assert);
		
	recursiveDeleteUpdateViewForViewModelAndAssertSameContent(assert,this.recursiveDeleteView, this.viewModel, view);
});
QUnit.test("testBasicMetadata", function(assert) {
	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	CORATEST.assertElementHasTypeClassText(firstLevelMetadata, "UL", "metadata", "", assert);
	
	let metadataHeader = firstLevelMetadata.childNodes[0];
	assert.strictEqual(metadataHeader.tagName, "LI");
	let childNodes = metadataHeader.childNodes;
	CORATEST.assertElementHasTypeClassText(childNodes[0], "SPAN", "id", "minimalGroupId", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[1], "SPAN", "nameInData", "[minimalGroup]", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[2], "SPAN", "type",  "group", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[3], "SPAN", "dataDivider",  "(someDataDivider)", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.recursiveDeleteView, this.viewModel, view);
});


QUnit.test("testBasicMetadataOnClickOpensDefiningRecord_onId", function(assert) {
	let callsToOpenDefiningRecord = [];
	const openDefiningRecordUsingEventAndId = function(event, id){
		callsToOpenDefiningRecord.push({event:event,id:id});
	}
	this.viewModel.methodOpenDefiningRecord = openDefiningRecordUsingEventAndId;
	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let childNodes = metadataHeader.childNodes;
	CORATESTHELPER.simulateOnclick(childNodes[0], { ctrlKey: true });

	assert.deepEqual(callsToOpenDefiningRecord[0].event.ctrlKey, true);
	assert.deepEqual(callsToOpenDefiningRecord[0].id, "minimalGroupId");
	
	updateViewForViewModelAndAssertSameContent(assert,this.recursiveDeleteView, this.viewModel, view);
});

QUnit.test("testBasicMetadataOnClickOpensDefiningRecord_OnNameInData", function(assert) {
	let callsToOpenDefiningRecord = [];
	const openDefiningRecordUsingEventAndId = function(event, id){
		callsToOpenDefiningRecord.push({event:event,id:id});
	}
	this.viewModel.methodOpenDefiningRecord = openDefiningRecordUsingEventAndId;
	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let childNodes = metadataHeader.childNodes;
	CORATESTHELPER.simulateOnclick(childNodes[1], { ctrlKey: true });

	assert.deepEqual(callsToOpenDefiningRecord[0].event.ctrlKey, true);
	assert.deepEqual(callsToOpenDefiningRecord[0].id, "minimalGroupId");
	
	updateViewForViewModelAndAssertSameContent(assert,this.recursiveDeleteView, this.viewModel, view);
});

QUnit.test("testTextAndDefText", function(assert) {
//	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModelWithOutChildren);
	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let children = metadataHeader.childNodes[4];
	assert.strictEqual(children.tagName, "UL");
	
	let textLink = children.childNodes[0];
	assert.strictEqual(textLink.tagName, "LI");
	assert.strictEqual(textLink.className, "");
	let textNodes = textLink.childNodes;
	CORATEST.assertElementHasTypeClassText(textNodes[0], "SPAN", "labelType", "text", assert);
	CORATEST.assertElementHasTypeClassText(textNodes[1], "SPAN", "id", "someTextId", assert);
	CORATEST.assertElementHasTypeClassText(textNodes[2], "SPAN", "dataDivider", "(someDataDivider)", assert);
	
	let defTextLink = children.childNodes[1];
	assert.strictEqual(defTextLink.tagName, "LI");
	assert.strictEqual(defTextLink.className, "");
	let defTtextNodes = defTextLink.childNodes;
	CORATEST.assertElementHasTypeClassText(textNodes[0], "SPAN", "labelType", "text", assert);
	CORATEST.assertElementHasTypeClassText(defTtextNodes[1], "SPAN", "id", "someDefTextId", assert);
	CORATEST.assertElementHasTypeClassText(textNodes[2], "SPAN", "dataDivider", "(someDataDivider)", assert);
});

QUnit.test("testAttributeReference", function(assert) {
	let attributeReferenceChild = {
			id: "attributeReferenceId",
			type: "group",
			nameInData: "attributeReferences",
			dataDivider: "someDataDivider",
			text: { id:"someTextId", type:"text", dataDivider:"someDataDivider", sv: "translated_sv_textVarIdText", en: "translated_en_textVarIdText" },
			defText: { id:"someDefTextId", type:"text", dataDivider:"someDataDivider", sv: "translated_sv_textVarIdDefText", en: "translated_en_textVarIdDefText" },
			methodOpenDefiningRecord : this.openDefiningRecordUsingEventAndId,
			attributes: []
		};

	let viewWithAttributes = this.viewModel;
	viewWithAttributes.attributes.push(attributeReferenceChild)
	
	let view = this.recursiveDeleteView.createViewForViewModel(viewWithAttributes);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let children = metadataHeader.childNodes[4];
	assert.strictEqual(children.tagName, "UL");
	
	let attributeReferences = children.childNodes[2];
	assert.strictEqual(attributeReferences.tagName, "LI");
	assert.strictEqual(attributeReferences.className, "");
	let attributeReferencesNodes = attributeReferences.childNodes;
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[0], "SPAN", "labelType", "attribute", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[1], "SPAN", "id", "attributeReferenceId", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[2], "SPAN", "nameInData", "[attributeReferences]", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[3], "SPAN", "type",  "group", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[4], "SPAN", "dataDivider",  "(someDataDivider)", assert);
});

QUnit.test("testRefCollection", function(assert) {
	let refCollection = { 
		id: "itemCollectionId",
		type: "itemCollection",
		nameInData: "itemCollectionName",
		dataDivider: "someDataDivider",
		text: { id: "itemCollectionIdText", type: "text", sv: "translated_sv_itemCollectionIdText", en: "translated_en_itemCollectionIdText" },
		defText: { id: "itemCollectionIdDefText", type: "text", sv: "translated_sv_itemCollectionIdDefText", en: "translated_en_itemCollectionIdDefText" },
		methodOpenDefiningRecord : this.openDefiningRecordUsingEventAndId,
		collectionItems: []
	};

	let viewWithAttributes = this.viewModel;
	viewWithAttributes.refCollection.push(refCollection)
	
	let view = this.recursiveDeleteView.createViewForViewModel(viewWithAttributes);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let children = metadataHeader.childNodes[4];
	assert.strictEqual(children.tagName, "UL");
	
	let attributeReferences = children.childNodes[2];
	assert.strictEqual(attributeReferences.tagName, "LI");
	assert.strictEqual(attributeReferences.className, "");
	let attributeReferencesNodes = attributeReferences.childNodes;
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[0], "SPAN", "labelType", "refCollection", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[1], "SPAN", "id", "itemCollectionId", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[2], "SPAN", "nameInData", "[itemCollectionName]", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[3], "SPAN", "type",  "itemCollection", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[4], "SPAN", "dataDivider",  "(someDataDivider)", assert);
});

QUnit.test("testCollectionItemReferences", function(assert) {
	let collectionItem = { 
		id: "collectionItemId",
		type: "collectionItem",
		nameInData: "collectionItemName",
		dataDivider: "someDataDivider",
		text: { id: "collectionItemIdText", type: "text", sv: "translated_sv_collectionItemIdText", en: "translated_en_collectionItemIdText" },
		defText: { id: "collectionItemIdDefText", type: "text", sv: "translated_sv_collectionItemIdDefText", en: "translated_en_collectionItemIdDefText" },
		methodOpenDefiningRecord : this.openDefiningRecordUsingEventAndId
	};

	let viewWithAttributes = this.viewModel;
	viewWithAttributes.collectionItems.push(collectionItem)
	
	let view = this.recursiveDeleteView.createViewForViewModel(viewWithAttributes);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let children = metadataHeader.childNodes[4];
	assert.strictEqual(children.tagName, "UL");
	
	let attributeReferences = children.childNodes[2];
	assert.strictEqual(attributeReferences.tagName, "LI");
	assert.strictEqual(attributeReferences.className, "");
	let attributeReferencesNodes = attributeReferences.childNodes;
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[0], "SPAN", "labelType", "collectionItems", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[1], "SPAN", "id", "collectionItemId", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[2], "SPAN", "nameInData", "[collectionItemName]", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[3], "SPAN", "type",  "collectionItem", assert);
	CORATEST.assertElementHasTypeClassText(attributeReferencesNodes[4], "SPAN", "dataDivider",  "(someDataDivider)", assert);
});

QUnit.test("testFirstChild", function(assert) {
	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let children = metadataHeader.childNodes[4];
	assert.strictEqual(children.tagName, "UL");

	let childReference = children.childNodes[2];
	assert.strictEqual(childReference.tagName, "LI");
	assert.strictEqual(childReference.className, "");
	let childNodes = childReference.childNodes;
	CORATEST.assertElementHasTypeClassText(childNodes[0], "SPAN", "id", "textVarId", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[1], "SPAN", "nameInData", "[textVar]", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[2], "SPAN", "type", "textVariable", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[3], "SPAN", "dataDivider", "(someOtherDataDivider)", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.recursiveDeleteView, this.viewModel, view);
});