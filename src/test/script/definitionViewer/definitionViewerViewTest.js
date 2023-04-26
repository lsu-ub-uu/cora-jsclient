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

QUnit.module.only("definitionViewer/definitionViewerViewTest.js", {
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
	assert.strictEqual(view.tagName, "SPAN");
	assert.strictEqual(view.className, "definitionViewer");

	let header = view.childNodes[0];
	assert.strictEqual(header.tagName, "DIV");
	assert.strictEqual(header.className, "header");
	assert.strictEqual(header.innerHTML, "Definition of minimalGroupId!");
});

QUnit.test("testBasicMetadata", function(assert) {
	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	assert.strictEqual(firstLevelMetadata.tagName, "UL");
	assert.strictEqual(firstLevelMetadata.className, "metadata");

	let metadataHeader = firstLevelMetadata.childNodes[0];
	assert.strictEqual(metadataHeader.tagName, "LI");
	assert.strictEqual(metadataHeader.childNodes[0].nodeValue, "minimalGroup (group)");
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
	assert.strictEqual(metadataHeader.childNodes[0].nodeValue, "minimalGroup, collectionVarName:{someFinalValue} (group)");
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
	assert.strictEqual(metadataHeader.childNodes[0].nodeValue,
	 "minimalGroup, collectionVarName:{collectionItemName, collectionItemName2} (group)");
});

QUnit.test("testFirstChild", function(assert) {
	let view = this.definitionViewerView.createViewForViewModel(this.viewModel);

	let firstLevelMetadata = view.childNodes[1];
	let metadataHeader = firstLevelMetadata.childNodes[0];
	let children = metadataHeader.childNodes[1];
	assert.strictEqual(children.tagName, "UL");

	let childReference = children.childNodes[0];
	assert.strictEqual(childReference.tagName, "LI");
	assert.strictEqual(childReference.childNodes[0].nodeValue, "textVar (textVar, 1-10, noConstraint)");
});

