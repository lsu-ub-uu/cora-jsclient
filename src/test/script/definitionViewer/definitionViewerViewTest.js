/*
 * Copyright 2023 Olov McKie
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

QUnit.module("definitionViewer/definitionViewerViewTest.js", {
	beforeEach: function() {
		this.dependencies = {
			someDep: "someDep"
		}
		this.spec = {
			someKey: "someValue"
		};
		
		this.definitionViewerView = CORA.definitionViewerView(this.dependencies, this.spec);
		let viewModel = {
			id: "minimalGroupId",
			type: "group",
			nameInData: "minimalGroup",
			text: { sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
			defText: { sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
			methodOpenDefiningRecord : this.openDefiningRecordUsingEventAndId,
			children: []
		};
		this.viewModel = viewModel;
		let child = {
			repeatMin: "1", repeatMax: "10", recordPartConstraint: "noConstraint", child: {
				id: "textVarId",
				type: "textVar",
				nameInData: "textVar",
				text: { sv: "translated_sv_textVarIdText", en: "translated_en_textVarIdText" },
				defText: { sv: "translated_sv_textVarIdDefText", en: "translated_en_textVarIdDefText" },
				methodOpenDefiningRecord : this.openDefiningRecordUsingEventAndId
			}
		};
		viewModel.children.push(child);
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.definitionViewerView.type, "definitionViewerView");
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.definitionViewerView.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("testOnlyForTestGetSpec", function(assert) {
	assert.strictEqual(this.definitionViewerView.onlyForTestGetSpec(), this.spec);
});

QUnit.test("testBasicView", function(assert) {
	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);
	CORATEST.assertElementHasTypeClassText(view, "SPAN", "definitionViewer", "", assert);

	let header = view.childNodes[0];
	CORATEST.assertElementHasTypeClassText(header, "DIV", "header", "Definition of minimalGroupId!", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});

let updateViewForViewModelAndAssertSameContent = function(assert, definitionViewerView, viewModel, view){
	let oldChildNodes = Array.from(view.childNodes);
	definitionViewerView.updateViewForViewModel(viewModel);
	let newChildNodes = Array.from(view.childNodes);
	for (let i = 0; i < oldChildNodes.length; i++) {
  		let oldItem = oldChildNodes[i];
  		let newItem = newChildNodes[i];
		assert.propEqual(oldItem, newItem);
		assert.notStrictEqual(oldItem, newItem);
	}
};

QUnit.test("testLegend", function(assert) {
	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let legend = view.childNodes[2];
	CORATEST.assertElementHasTypeClassText(legend, "DIV", "legend", "LegendSStoragePPermissionIIndex", assert);
	assert.strictEqual(legend.childNodes[0].textContent, "Legend", assert);
	
	let storage = legend.childNodes[1];
	CORATEST.assertElementHasTypeClassText(storage, "DIV", "", "", assert);
	CORATEST.assertElementHasTypeClassText(storage.childNodes[0], "SPAN", "storage", "S", assert);
	CORATEST.assertElementHasTypeClassText(storage.childNodes[1], "SPAN", "", "Storage", assert);
	
	let permission = legend.childNodes[2];
	CORATEST.assertElementHasTypeClassText(permission, "DIV", "", "", assert);
	CORATEST.assertElementHasTypeClassText(permission.childNodes[0], "SPAN", "permission", "P", assert);
	CORATEST.assertElementHasTypeClassText(permission.childNodes[1], "SPAN", "", "Permission", assert);
	
	let index = legend.childNodes[3];
	CORATEST.assertElementHasTypeClassText(index, "DIV", "", "", assert);
	CORATEST.assertElementHasTypeClassText(index.childNodes[0], "SPAN", "index", "I", assert);
	CORATEST.assertElementHasTypeClassText(index.childNodes[1], "SPAN", "", "Index", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});

QUnit.test("testBasicMetadata", function(assert) {
	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	CORATEST.assertElementHasTypeClassText(firstLevelMetadata, "UL", "metadata", "", assert);
	
	let metadataHeader = firstLevelMetadata.childNodes[0];
	assert.strictEqual(metadataHeader.tagName, "LI");
	let childNodes = metadataHeader.childNodes;
	CORATEST.assertElementHasTypeClassText(childNodes[0], "SPAN", "nameInData", "minimalGroup", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[1], "SPAN", "details",  "", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});


QUnit.test("testBasicMetadataWithFinalValue", function(assert) {
	this.viewModel.finalValue = "someFinalValue";
	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let childNodes = metadataHeader.childNodes;
	CORATEST.assertElementHasTypeClassText(childNodes[0], "SPAN", "nameInData", "minimalGroup", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[1], "SPAN", "finalValue", "{someFinalValue}", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[2], "SPAN", "details",  "", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});

QUnit.test("testBasicMetadataOnClickOpensDefiningRecord", function(assert) {
	let callsToOpenDefiningRecord = [];
	const openDefiningRecordUsingEventAndId = function(event, id){
		callsToOpenDefiningRecord.push({event:event,id:id});
	}
	this.viewModel.methodOpenDefiningRecord = openDefiningRecordUsingEventAndId;
	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let childNodes = metadataHeader.childNodes;
	CORATESTHELPER.simulateOnclick(childNodes[0], { ctrlKey: true });

	assert.deepEqual(callsToOpenDefiningRecord[0].event.ctrlKey, true);
	assert.deepEqual(callsToOpenDefiningRecord[0].id, "minimalGroupId");
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});

QUnit.test("testBasicWithAttributeFinalValue", function(assert) {
	let attribute = {
		id: "attributeCollectionVarId",
		type: "collectionVariable",
		nameInData: "collectionVarName",
		finalValue: "someFinalValue",
		text: { sv: "translated_sv_attributeCollectionVarIdText", en: "translated_en_attributeCollectionVarIdText" },
		defText: { sv: "translated_sv_attributeCollectionVarIdDefText", en: "translated_en_attributeCollectionVarIdDefText" },
		collectionItems : []
	};
	this.viewModel.attributes = [];
	this.viewModel.attributes.push(attribute);
	let collectionItem = {
		id: "collectionItemId",
		type: "collectionItem",
		nameInData: "collectionItemName",
		text: { sv: "translated_sv_collectionItemIdText", en: "translated_en_collectionItemIdText" },
		defText: { sv: "translated_sv_collectionItemIdDefText", en: "translated_en_collectionItemIdDefText" }
	};
	attribute.collectionItems.push(collectionItem);

	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let childNodes = metadataHeader.childNodes;
	CORATEST.assertElementHasTypeClassText(childNodes[0], "SPAN", "nameInData", "minimalGroup", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[1], "SPAN", "attributes", 
		"collectionVarName:{someFinalValue}", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[2], "SPAN", "details", "(group)", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});

QUnit.test("testBasicWithAttributeChoice", function(assert) {
	let attribute = {
		id: "attributeCollectionVarId",
		type: "collectionVariable",
		nameInData: "collectionVarName",
		text: { sv: "translated_sv_attributeCollectionVarIdText", en: "translated_en_attributeCollectionVarIdText" },
		defText: { sv: "translated_sv_attributeCollectionVarIdDefText", en: "translated_en_attributeCollectionVarIdDefText" },
		collectionItems : []
	};
	this.viewModel.attributes = [];
	this.viewModel.attributes.push(attribute);
	let collectionItem = {
		id: "collectionItemId",
		type: "collectionItem",
		nameInData: "collectionItemName",
		text: { sv: "translated_sv_collectionItemIdText", en: "translated_en_collectionItemIdText" },
		defText: { sv: "translated_sv_collectionItemIdDefText", en: "translated_en_collectionItemIdDefText" }
	};
	attribute.collectionItems.push(collectionItem);
	let collectionItem2 = {
		id: "collectionItemId2",
		type: "collectionItem2",
		nameInData: "collectionItemName2",
		text: { sv: "translated_sv_collectionItemId2Text", en: "translated_en_collectionItem2IdText" },
		defText: { sv: "translated_sv_collectionItemId2DefText", en: "translated_en_collectionItemId2DefText" }
	};
	attribute.collectionItems.push(collectionItem2);

	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let childNodes = metadataHeader.childNodes;
	CORATEST.assertElementHasTypeClassText(childNodes[0], "SPAN", "nameInData", "minimalGroup", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[1], "SPAN", "attributes", 
		"collectionVarName:{collectionItemName, collectionItemName2}", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[2], "SPAN", "details", "(group)", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});
QUnit.test("testBasicWithTwoAttributeChoice", function(assert) {
	let attribute = {
		id: "attributeCollectionVarId",
		type: "collectionVariable",
		nameInData: "collectionVarName",
		text: { sv: "translated_sv_attributeCollectionVarIdText", en: "translated_en_attributeCollectionVarIdText" },
		defText: { sv: "translated_sv_attributeCollectionVarIdDefText", en: "translated_en_attributeCollectionVarIdDefText" },
		collectionItems : []
	};
	this.viewModel.attributes = [];
	this.viewModel.attributes.push(attribute);
	this.viewModel.attributes.push(attribute);
	let collectionItem = {
		id: "collectionItemId",
		type: "collectionItem",
		nameInData: "collectionItemName",
		text: { sv: "translated_sv_collectionItemIdText", en: "translated_en_collectionItemIdText" },
		defText: { sv: "translated_sv_collectionItemIdDefText", en: "translated_en_collectionItemIdDefText" }
	};
	attribute.collectionItems.push(collectionItem);
	let collectionItem2 = {
		id: "collectionItemId2",
		type: "collectionItem2",
		nameInData: "collectionItemName2",
		text: { sv: "translated_sv_collectionItemId2Text", en: "translated_en_collectionItem2IdText" },
		defText: { sv: "translated_sv_collectionItemId2DefText", en: "translated_en_collectionItemId2DefText" }
	};
	attribute.collectionItems.push(collectionItem2);

	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let childNodes = metadataHeader.childNodes;
	CORATEST.assertElementHasTypeClassText(childNodes[0], "SPAN", "nameInData", "minimalGroup", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[1], "SPAN", "attributes", 
		"collectionVarName:{collectionItemName, collectionItemName2}, collectionVarName:{collectionItemName, collectionItemName2}", assert);
	CORATEST.assertElementHasTypeClassText(childNodes[2], "SPAN", "details", "(group)", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});

QUnit.test("testFirstChild", function(assert) {
	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let children = metadataHeader.childNodes[2];
	assert.strictEqual(children.tagName, "UL");

	let childReference = children.childNodes[0];
	assert.strictEqual(childReference.tagName, "LI");
	assert.strictEqual(childReference.className, "");
	let childNodes = childReference.childNodes;
	CORATEST.assertElementHasTypeClassText(childNodes[0], "SPAN", "nameInData", "textVar", assert);
	let details = childNodes[1].childNodes;
	CORATEST.assertElementHasTypeClassText(details[0], "#text", "", "(", assert);
	CORATEST.assertElementHasTypeClassText(details[1], "SPAN", "type", "textVar", assert);
	CORATEST.assertElementHasTypeClassText(details[2], "#text", "", ", ", assert);
	CORATEST.assertElementHasTypeClassText(details[3], "SPAN", "cardinality", "1-10", assert);
	CORATEST.assertElementHasTypeClassText(details[4], "#text", "", ", ", assert);
	CORATEST.assertElementHasTypeClassText(details[5], "SPAN", "constraint", "noConstraint", assert);
	CORATEST.assertElementHasTypeClassText(details[6], "#text", "", ")", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});

QUnit.test("testChildWithStoragePermissionIndex", function(assert) {
	this.viewModel.children[0].collectIndexTerms=["collectIndexTerm1", "collectIndexTerm2"];
	this.viewModel.children[0].collectStorageTerm="collectStorageTerm";
	this.viewModel.children[0].collectPermissionTerm="collectPermissionTerm";
		
	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let children = metadataHeader.childNodes[2];
	let childReference = children.childNodes[0];
	let childNodes = childReference.childNodes;
	let details = childNodes[1].childNodes;
	CORATEST.assertElementHasTypeClassText(details[5], "SPAN", "constraint", "noConstraint", assert);
	CORATEST.assertElementHasTypeClassText(details[6], "#text", "", ", ", assert);
	CORATEST.assertElementHasTypeClassText(details[7], "SPAN", "storage", "S", assert);
	CORATEST.assertElementHasTypeClassText(details[8], "#text", "", ", ", assert);
	CORATEST.assertElementHasTypeClassText(details[9], "SPAN", "permission", "P", assert);
	CORATEST.assertElementHasTypeClassText(details[10], "#text", "", ", ", assert);
	CORATEST.assertElementHasTypeClassText(details[11], "SPAN", "index", "I", assert);
	CORATEST.assertElementHasTypeClassText(details[12], "#text", "", ")", assert);
	
	updateViewForViewModelAndAssertSameContent(assert,this.definitionViewerView, this.viewModel, view);
});
