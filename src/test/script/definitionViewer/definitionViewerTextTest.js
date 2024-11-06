/*
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

QUnit.module("definitionViewer/definitionViewerTextTest.js", {
	beforeEach: function() {
		this.dependencies = {
			someDep: "someDep"
		}
		this.spec = {
			someKey: "someValue"
		};
		
		this.definitionViewerText = CORA.definitionViewerText(this.dependencies, this.spec);
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
	assert.strictEqual(this.definitionViewerText.type, "definitionViewerText");
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.definitionViewerText.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("testOnlyForTestGetSpec", function(assert) {
	assert.strictEqual(this.definitionViewerText.onlyForTestGetSpec(), this.spec);
});

QUnit.test("testBasicView", function(assert) {
	let text = this.definitionViewerText.createViewAsText(this.viewModel);
	let expectedText = `minimalGroup (group)
	textVar (textVar, 1-10, noConstraint)`;
	assert.deepEqual(text, expectedText);
});

let updateViewForTextModelAndAssertSameContent = function(assert, definitionViewerText, viewModel, view){
	let oldChildNodes = Array.from(view.childNodes);
	definitionViewerText.updateViewForViewModel(viewModel);
	let newChildNodes = Array.from(view.childNodes);
	for (let i = 0; i < oldChildNodes.length; i++) {
  		let oldItem = oldChildNodes[i];
  		let newItem = newChildNodes[i];
		assert.propEqual(oldItem, newItem);
		assert.notStrictEqual(oldItem, newItem);
	}
};


QUnit.test("testBasicMetadataWithFinalValue", function(assert) {
	this.viewModel.finalValue = "someFinalValue";
	let text = this.definitionViewerText.createViewAsText(this.viewModel);
	let expectedText = `minimalGroup {someFinalValue} (group)
	textVar (textVar, 1-10, noConstraint)`;
	assert.deepEqual(text, expectedText);
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

	let text = this.definitionViewerText.createViewAsText(this.viewModel);
	let expectedText = `minimalGroup collectionVarName:{someFinalValue} (group)
	textVar (textVar, 1-10, noConstraint)`;
	assert.deepEqual(text, expectedText);
	
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

	let text = this.definitionViewerText.createViewAsText(this.viewModel);
	let expectedText = `minimalGroup collectionVarName:{collectionItemName, collectionItemName2} (group)
	textVar (textVar, 1-10, noConstraint)`;
	assert.deepEqual(text, expectedText);
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

	let text = this.definitionViewerText.createViewAsText(this.viewModel);
	let expectedText = `minimalGroup collectionVarName:{collectionItemName, collectionItemName2}, collectionVarName:{collectionItemName, collectionItemName2} (group)
	textVar (textVar, 1-10, noConstraint)`;
	assert.deepEqual(text, expectedText);
});

QUnit.test("testChildWithStoragePermissionIndex", function(assert) {
	this.viewModel.children[0].collectIndexTerms=["collectIndexTerm1", "collectIndexTerm2"];
	this.viewModel.children[0].collectStorageTerm="collectStorageTerm";
	this.viewModel.children[0].collectPermissionTerm="collectPermissionTerm";
		
	let text = this.definitionViewerText.createViewAsText(this.viewModel);
	let expectedText = `minimalGroup (group)
	textVar (textVar, 1-10, noConstraint, S, P, I)`;
	assert.deepEqual(text, expectedText);
});
