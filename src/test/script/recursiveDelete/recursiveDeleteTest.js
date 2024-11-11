/*
 * Copyright 2024 Uppsala University Library
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

QUnit.module.only("recursiveDelete/recursiveDeleteTest.js", {
	beforeEach: function() {
		this.metadataProvider = CORATEST.metadataProviderForDefinitionViewerSpy();
		this.textProvider = CORATEST.textProviderSpy();
		this.searchProvider = CORATEST.searchProviderSpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.clientInstanceProvider = CORATEST.clientInstanceProviderSpy();
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();

		this.view = CORATEST.recursiveDeleteViewSpy()

		this.providers = {
			metadataProvider: this.metadataProvider,
			textProvider: this.textProvider,
			searchProvider: this.searchProvider,
			recordTypeProvider: this.recordTypeProvider,
			clientInstanceProvider: this.clientInstanceProvider
		};

		this.dependencies = {
			"globalFactories": {
				"ajaxCallFactory": this.ajaxCallFactorySpy
			},
			view: this.view
		}
		this.spec = {
			id: "minimalGroupId"
		};
		this.recursiveDelete = CORA.recursiveDelete(this.providers, this.dependencies, this.spec);
		let toAdd = {
			id: "minimalGroupId",
			type: "group",
			nameInData: "minimalGroupName"
			//			dataDivider: "minimalGroupName"
			//			children : [{repeatMin: "1", repeatMax: "10", refId : "textVar"}] 
		};
		this.metadataProvider.addMetadataByCompactDefinition(toAdd);

	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.recursiveDelete.type, "recursiveDelete");
});

QUnit.test("testOnlyForTestGetProviders", function(assert) {
	assert.strictEqual(this.recursiveDelete.onlyForTestGetProviders(), this.providers);
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.recursiveDelete.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("testOnlyForTestGetSpec", function(assert) {
	assert.strictEqual(this.recursiveDelete.onlyForTestGetSpec(), this.spec);
});

QUnit.test("testTopLevelMetadataGroupFetchedFromProvider", function(assert) {
	let responseFromMetadataRecord =
		{
			actionLinks: {
				read_incoming_links: {
					requestMethod: "GET",
					rel: "read_incoming_links",
					url: "http://some/incomingLinks",
					accept: "application/vnd.uub.recordList+json"
				}
			}
		};
	this.metadataProvider.addMetadataRecordById("minimalGroupId", responseFromMetadataRecord);
	
	this.recursiveDelete.getView();

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "minimalGroupId");
});

QUnit.test("testViewerViewIsCalledAndAnswerFromViewReturned", function(assert) {
	let responseFromMetadataRecord =
			{
				actionLinks: {
					read_incoming_links: {
						requestMethod: "GET",
						rel: "read_incoming_links",
						url: "http://some/incomingLinks",
						accept: "application/vnd.uub.recordList+json"
					}
				}
			};
	this.metadataProvider.addMetadataRecordById("minimalGroupId", responseFromMetadataRecord);
	let generatedView = this.recursiveDelete.getView();

	assert.true(this.view.getViewModelForCallNo(0) != undefined);
	assert.deepEqual(this.view.getCreatedViewForCallNo(0), generatedView);
});

QUnit.test("testViewModel", function(assert) {
	let responseFromMetadataRecord =
			{
				actionLinks: {
					read_incoming_links: {
						requestMethod: "GET",
						rel: "read_incoming_links",
						url: "http://some/incomingLinks",
						accept: "application/vnd.uub.recordList+json"
					}
				}
			};
	this.metadataProvider.addMetadataRecordById("minimalGroupId", responseFromMetadataRecord);
	
	this.recursiveDelete.getView();

	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { id: "minimalGroupIdText", type: "text", sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { id: "minimalGroupIdDefText", type: "text", sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId
	};
	assert.deepEqual(viewModel, expected);
});

QUnit.test("testReloadForMetadataChanges", function(assert) {
	let responseFromMetadataRecord =
			{
				actionLinks: {
					read_incoming_links: {
						requestMethod: "GET",
						rel: "read_incoming_links",
						url: "http://some/incomingLinks",
						accept: "application/vnd.uub.recordList+json"
					}
				}
			};
		this.metadataProvider.addMetadataRecordById("minimalGroupId", responseFromMetadataRecord);
	
	
	this.recursiveDelete.reloadForMetadataChanges();

	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { id: "minimalGroupIdText", type: "text", sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { id: "minimalGroupIdDefText", type: "text", sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId
	};
	assert.deepEqual(viewModel, expected);
});

QUnit.test("testOpenDefiningRecordUsingEventAndId", function(assert) {
	let event = document.createEvent('Event');
	event.ctrlKey = true;
	let id = "someMetadataId";
	let responseFromMetadataRecord = { actionLinks: { read: { fakeLinkFetchedById: id } } };
	this.metadataProvider.addMetadataRecordById(id, responseFromMetadataRecord);

	this.recursiveDelete.openDefiningRecordUsingEventAndId(event, id);

	let jsClient = this.clientInstanceProvider.getJsClient();
	let openInfo = jsClient.getOpenInfo(0);
	let expected = {
		readLink: {
			fakeLinkFetchedById: "someMetadataId"
		},
		loadInBackground: "true"
	};
	assert.deepEqual(openInfo, expected);
});

QUnit.test("testOpenDefiningRecordUsingEventAndIdNoCtrl", function(assert) {
	let event = document.createEvent('Event');
	event.ctrlKey = false;
	let id = "someMetadataId";
	let responseFromMetadataRecord = { actionLinks: { read: { fakeLinkFetchedById: id } } };
	this.metadataProvider.addMetadataRecordById(id, responseFromMetadataRecord);

	this.recursiveDelete.openDefiningRecordUsingEventAndId(event, id);

	let jsClient = this.clientInstanceProvider.getJsClient();
	let openInfo = jsClient.getOpenInfo(0);
	let expected = {
		readLink: {
			fakeLinkFetchedById: "someMetadataId"
		},
		loadInBackground: "false"
	};
	assert.deepEqual(openInfo, expected);
});

QUnit.test("testViewModelOneChild", function(assert) {
	let responseFromMetadataRecord =
			{
				actionLinks: {
					read_incoming_links: {
						requestMethod: "GET",
						rel: "read_incoming_links",
						url: "http://some/incomingLinks",
						accept: "application/vnd.uub.recordList+json"
					}
				}
			};
	this.metadataProvider.addMetadataRecordById("minimalGroupId", responseFromMetadataRecord);
	this.metadataProvider.addMetadataRecordById("textVarId", responseFromMetadataRecord);
	
	let toAdd = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		children: [{ repeatMin: "1", repeatMax: "10", refId: "textVarId" }]
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAdd);
	let toAddTextVar = {
		id: "textVarId",
		type: "textVariable",
		nameInData: "textVarName"
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAddTextVar);

	this.recursiveDelete.getView();

	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { id: "minimalGroupIdText", type: "text", sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { id: "minimalGroupIdDefText", type: "text", sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId,
		children: []
	};
	let childReference = {
		id: "textVarId",
		type: "textVariable",
		nameInData: "textVarName",
		text: { id: "textVarIdText", type: "text", sv: "translated_sv_textVarIdText", en: "translated_en_textVarIdText" },
		defText: { id: "textVarIdDefText", type: "text", sv: "translated_sv_textVarIdDefText", en: "translated_en_textVarIdDefText" },
		methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId,
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
		itemCollectionId: "itemCollectionId"
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
	
	let responseFromMetadataRecord =
				{
					actionLinks: {
						read_incoming_links: {
							requestMethod: "GET",
							rel: "read_incoming_links",
							url: "http://some/incomingLinks",
							accept: "application/vnd.uub.recordList+json"
						}
					}
		};
		this.metadataProvider.addMetadataRecordById("minimalGroupId", responseFromMetadataRecord);
		this.metadataProvider.addMetadataRecordById("attributeCollectionVarId", responseFromMetadataRecord);
		this.metadataProvider.addMetadataRecordById("itemCollectionId", responseFromMetadataRecord);
		this.metadataProvider.addMetadataRecordById("collectionItemId", responseFromMetadataRecord);
	

	this.recursiveDelete.getView();
	let viewModel = this.view.getViewModelForCallNo(0);

	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		text: { id: "minimalGroupIdText", type: "text", sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
		defText: { id: "minimalGroupIdDefText", type: "text", sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
		methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId,
		attributes: []
	};

	let attribute = {
		id: "attributeCollectionVarId",
		type: "collectionVariable",
		nameInData: "collectionVarName",
		text: { id: "attributeCollectionVarIdText", type: "text", sv: "translated_sv_attributeCollectionVarIdText", en: "translated_en_attributeCollectionVarIdText" },
		defText: { id: "attributeCollectionVarIdDefText", type: "text", sv: "translated_sv_attributeCollectionVarIdDefText", en: "translated_en_attributeCollectionVarIdDefText" },
		methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId,
		refCollection: []
	};
	expected.attributes.push(attribute);

	let refCollection = {
		id: "itemCollectionId",
		type: "itemCollection",
		nameInData: "itemCollectionName",
		text: { id: "itemCollectionIdText", type: "text", sv: "translated_sv_itemCollectionIdText", en: "translated_en_itemCollectionIdText" },
		defText: { id: "itemCollectionIdDefText", type: "text", sv: "translated_sv_itemCollectionIdDefText", en: "translated_en_itemCollectionIdDefText" },
		methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId,
		collectionItems: []
	};
	attribute.refCollection.push(refCollection);

	let collectionItem = {
		id: "collectionItemId",
		type: "collectionItem",
		nameInData: "collectionItemName",
		text: { id: "collectionItemIdText", type: "text", sv: "translated_sv_collectionItemIdText", en: "translated_en_collectionItemIdText" },
		defText: { id: "collectionItemIdDefText", type: "text", sv: "translated_sv_collectionItemIdDefText", en: "translated_en_collectionItemIdDefText" },
		methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId
	};
	refCollection.collectionItems.push(collectionItem);

	assert.deepEqual(viewModel, expected);
});

QUnit.test("testCollectPresentationsCallsIncommingLinks", function(assert) {
	let responseFromMetadataRecord =
	{
		actionLinks: {
			read_incoming_links: {
				requestMethod: "GET",
				rel: "read_incoming_links",
				url: "http://some/incomingLinks",
				accept: "application/vnd.uub.recordList+json"
			}
		}
	};
	this.metadataProvider.addMetadataRecordById("minimalGroupId", responseFromMetadataRecord);
	
	let expectedModel = {
			id: "minimalGroupId",
			type: "group",
			nameInData: "minimalGroupName",
			text: { id: "minimalGroupIdText", type: "text", sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
			defText: { id: "minimalGroupIdDefText", type: "text", sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
			methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId
		};

	this.recursiveDelete.getView();

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://some/incomingLinks");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.incomingLinksList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, this.recursiveDelete.collectPresentations);
	assert.strictEqual(ajaxCallSpec.errorMethod, this.recursiveDelete.handleErrorOnFetchPresentations);
	assert.deepEqual(ajaxCallSpec.model, expectedModel);
});

QUnit.test("testHandleCallErrorDoesNothing", function(assert) {
	try {
		this.recursiveDelete.handleErrorOnFetchPresentations();
	} catch (error) {
		assert.strictEqual(error.message, "error fetching incoming links from server");
	}
});

QUnit.test("testCollectPresentationsCallsIncommingLinks2", function(assert) {
	let incomingLinksAnswer = JSON.stringify(CORATEST.incomingLinksAnswer);
	let currentModel = {
				id: "minimalGroupId",
				type: "group",
				nameInData: "minimalGroupName",
				text: { id: "minimalGroupIdText", type: "text", sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
				defText: { id: "minimalGroupIdDefText", type: "text", sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
				methodOpenDefiningRecord: this.recursiveDelete.openDefiningRecordUsingEventAndId
			};
	let answer = {
		spec: { model: currentModel },
		responseText: incomingLinksAnswer
	};
	
	this.recursiveDelete.collectPresentations(answer);
	
	let expectedPresentation= 		[
	  {
	    id: "recordTypeFormPGroup",
//		type: "group",
	    recordType: "presentation"
	  },
	  {
	    id: "recordTypeFormNewPGroup",
	    recordType: "presentation"
	  },
	  {
	    id: "recordTypeViewPGroup",
	    recordType: "presentation"
	  }
	];
	
	assert.strictEqual(answer.spec.model.presentations.length, 3);
	assert.deepEqual(answer.spec.model.presentations, expectedPresentation);
});