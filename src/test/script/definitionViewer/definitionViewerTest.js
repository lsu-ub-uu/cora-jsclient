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

QUnit.module("definitionViewer/definitionViewerTest.js", {
	beforeEach: function() {
		this.metadataProvider = CORATEST.metadataProviderForDefinitionViewerSpy();
		this.textProvider = CORATEST.textProviderSpy();
		this.searchProvider = CORATEST.searchProviderSpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.clientInstanceProvider = CORATEST.clientInstanceProviderSpy();

		this.view = CORATEST.definitionViewerViewSpy()
		this.textView = CORATEST.definitionTextViewSpy()

		this.providers = {
			metadataProvider: this.metadataProvider,
			textProvider: this.textProvider,
			searchProvider: this.searchProvider,
			recordTypeProvider: this.recordTypeProvider,
			clientInstanceProvider: this.clientInstanceProvider
		};

		this.dependencies = {
			view: this.view,
			textView: this.textView
		}
		this.spec = {
			id: "minimalGroupId"
		};
		this.definitionViewer = CORA.definitionViewer(this.providers, this.dependencies, this.spec);
		let toAdd = {
			id: "minimalGroupId",
			type: "group",
			nameInData: "minimalGroupName"
			//			children : [{repeatMin: "1", repeatMax: "10", refId : "textVar"}] 
		};
		this.metadataProvider.addMetadataByCompactDefinition(toAdd);

	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.definitionViewer.type, "definitionViewer");
});

QUnit.test("testOnlyForTestGetProviders", function(assert) {
	assert.strictEqual(this.definitionViewer.onlyForTestGetProviders(), this.providers);
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.definitionViewer.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("testOnlyForTestGetSpec", function(assert) {
	assert.strictEqual(this.definitionViewer.onlyForTestGetSpec(), this.spec);
});

QUnit.test("testTopLevelMetadataGroupFetchedFromProvider", function(assert) {
	this.definitionViewer.getView();

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "minimalGroupId");
});

QUnit.test("testSetTextCopierMethod_setToCopyViewToClipboard", function(assert) {
	assert.ok(this.view.getTextCopierMethods()[0]);
	assert.strictEqual(this.view.getTextCopierMethods()[0], this.definitionViewer.copyViewToClipboard);
	assert.notOk(this.view.getTextCopierMethods()[1]);
});

QUnit.test("testCopyViewToClipboard", function(assert) {
	let viewAsText = this.definitionViewer.copyViewToClipboard();
	assert.strictEqual(viewAsText, "text from definitionTextViewSpy");
});

QUnit.test("testViewerViewIsCalledAndAnswerFromViewReturned", function(assert) {
	let generatedView = this.definitionViewer.getView();

	assert.true(this.view.getViewModelForCallNo(0) != undefined);
	assert.deepEqual(this.view.getCreatedViewForCallNo(0), generatedView);
});

QUnit.test("testViewModel", function(assert) {
	let generatedView = this.definitionViewer.getView();

	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId
	};
	assert.deepEqual(viewModel, expected);
});

QUnit.test("testReloadForMetadataChanges", function(assert) {
	this.definitionViewer.reloadForMetadataChanges();

	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId
	};
	assert.deepEqual(viewModel, expected);
});

QUnit.test("testOpenDefiningRecordUsingEventAndId", function(assert) {
	let event = document.createEvent('Event');
	event.ctrlKey = true;
	let id = "someMetadataId";
	let responseFromMetadataRecord = 	{	actionLinks:{ read:{	fakeLinkFetchedById:id } } };
	this.metadataProvider.addMetadataRecordById(id, responseFromMetadataRecord);
	
	this.definitionViewer.openDefiningRecordUsingEventAndId(event, id);
	
	let jsClient = this.clientInstanceProvider.getJsClient();
	let openInfo = jsClient.getOpenInfo(0);
	let expected = {
		readLink : {
			fakeLinkFetchedById:"someMetadataId"
		},
		loadInBackground : "true"
	};
	assert.deepEqual(openInfo, expected);
});

QUnit.test("testOpenDefiningRecordUsingEventAndIdNoCtrl", function(assert) {
	let event = document.createEvent('Event');
	event.ctrlKey = false;
	let id = "someMetadataId";
	let responseFromMetadataRecord = 	{	actionLinks:{ read:{	fakeLinkFetchedById:id } } };
	this.metadataProvider.addMetadataRecordById(id, responseFromMetadataRecord);
	
	this.definitionViewer.openDefiningRecordUsingEventAndId(event, id);
	
	let jsClient = this.clientInstanceProvider.getJsClient();
	let openInfo = jsClient.getOpenInfo(0);
	let expected = {
		readLink : {
			fakeLinkFetchedById:"someMetadataId"
		},
		loadInBackground : "false"
	};
	assert.deepEqual(openInfo, expected);
});

QUnit.test("testViewModelOneChild", function(assert) {
	let toAdd = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		children: [{ repeatMin: "1", repeatMax: "10", refId: "textVarId"}]
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAdd);
	let toAddTextVar = {
		id: "textVarId",
		type: "textVariable",
		nameInData: "textVarName"
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAddTextVar);

	let generatedView = this.definitionViewer.getView();

	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId,
		children: []
	};
	let childReference = {
		repeatMin: "1", repeatMax: "10", recordPartConstraint: "noConstraint", child: {
			id: "textVarId",
			type: "textVariable",
			nameInData: "textVarName",
			text: { sv: "translated_sv_textVarIdText", en: "translated_en_textVarIdText" },
			defText: { sv: "translated_sv_textVarIdDefText", en: "translated_en_textVarIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId,
		}
	};
	expected.children.push(childReference);

	assert.deepEqual(viewModel, expected);
});

QUnit.test("testViewModelOneChildWithConstraint", function(assert) {
	let toAdd = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		children: [{ repeatMin: "1", repeatMax: "10", recordPartConstraint: "read", refId: "textVarId"}]
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAdd);
	let toAddTextVar = {
		id: "textVarId",
		type: "textVariable",
		nameInData: "textVarName"
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAddTextVar);

	let generatedView = this.definitionViewer.getView();

	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId,
		children: []
	};
	let childReference = {
		repeatMin: "1", repeatMax: "10", recordPartConstraint: "read", child: {
			id: "textVarId",
			type: "textVariable",
			nameInData: "textVarName",
			text: { sv: "translated_sv_textVarIdText", en: "translated_en_textVarIdText" },
			defText: { sv: "translated_sv_textVarIdDefText", en: "translated_en_textVarIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId,
		}
	};
	expected.children.push(childReference);

	assert.deepEqual(viewModel, expected);
});

QUnit.test("testViewModelOneChildWithCollectTerms", function(assert) {
	let toAdd = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		children: [{ repeatMin: "1", repeatMax: "10", recordPartConstraint: "read", 
			collectIndexTerms: ["collectIndexTerm1", "collectIndexTerm2"],
			collectStorageTerm: "collectStorageTerm", collectPermissionTerm:"collectPermissionTerm",
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId,
			refId: "textVarId"}]
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAdd);
	
	let toAddTextVar = {
		id: "textVarId",
		type: "textVariable",
		nameInData: "textVarName"
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAddTextVar);


	let generatedView = this.definitionViewer.getView();

	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId,
		children: []
	};
	let childReference = {
		repeatMin: "1", repeatMax: "10", recordPartConstraint: "read",
			collectIndexTerms: ["collectIndexTerm1", "collectIndexTerm2"],
			collectStorageTerm: "collectStorageTerm", collectPermissionTerm:"collectPermissionTerm",
			child: {
			id: "textVarId",
			type: "textVariable",
			nameInData: "textVarName",
			text: { sv: "translated_sv_textVarIdText", en: "translated_en_textVarIdText" },
			defText: { sv: "translated_sv_textVarIdDefText", en: "translated_en_textVarIdDefText" },
			methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId
		}
	};
	expected.children.push(childReference);

	assert.deepEqual(viewModel, expected);
});

QUnit.test("testViewModelAttributes", function(assert) {
	let toAdd = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		attributes: ["attributeCollectionVarId"],
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAdd);

	let toAddCollectionVar = {
		id: "attributeCollectionVarId",
		type: "collectionVariable",
		nameInData: "collectionVarName",
		finalValue: "someFinalValue",
		itemCollectionId : "itemCollectionId"
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAddCollectionVar);

	let addToItemCollection = {
		id: "itemCollectionId",
		type: "itemCollection",
		nameInData: "itemCollectionName",
		refIds: ["collectionItemId"]
	};
	this.metadataProvider.addMetadataByCompactDefinition(addToItemCollection);
	
	let addToCollectionItem = {
		id: "collectionItemId",
		type: "collectionItem",
		nameInData: "collectionItemName"
	};
	this.metadataProvider.addMetadataByCompactDefinition(addToCollectionItem);

	let generatedView = this.definitionViewer.getView();

	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId,
		attributes: []
	};
	let attribute = {
		id: "attributeCollectionVarId",
		type: "collectionVariable",
		nameInData: "collectionVarName",
		finalValue: "someFinalValue",
		text: { sv: "translated_sv_attributeCollectionVarIdText", en: "translated_en_attributeCollectionVarIdText" },
		defText: { sv: "translated_sv_attributeCollectionVarIdDefText", en: "translated_en_attributeCollectionVarIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId,
		collectionItems : []
	};
	expected.attributes.push(attribute);
	let collectionItem = {
		id: "collectionItemId",
		type: "collectionItem",
		nameInData: "collectionItemName",
		text: { sv: "translated_sv_collectionItemIdText", en: "translated_en_collectionItemIdText" },
		defText: { sv: "translated_sv_collectionItemIdDefText", en: "translated_en_collectionItemIdDefText" },
		methodOpenDefiningRecord : this.definitionViewer.openDefiningRecordUsingEventAndId
	};
	attribute.collectionItems.push(collectionItem);
	
	assert.deepEqual(viewModel, expected);
});
