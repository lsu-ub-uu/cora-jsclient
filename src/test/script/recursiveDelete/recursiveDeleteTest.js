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

QUnit.module("recursiveDelete/recursiveDeleteTest.js", hooks =>{
	const test = QUnit.test;
	const only = QUnit.only;
	
//	let textProvider;
//	let searchProvider ;
//	let recordTypeProvider ;
	let metadataProvider;
	let clientInstanceProvider;
	let ajaxCallFactorySpy ;
	let view ;
	
	let dependencies;
	let providers;
	let spec;
	let recursiveDelete;
	
	hooks.beforeEach(()  => {
		metadataProvider =CORATEST.metadataProviderForDefinitionViewerSpy();
		clientInstanceProvider = CORATEST.clientInstanceProviderSpy();
		ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		view = CORATEST.recursiveDeleteViewSpy();

		providers = {
			metadataProvider: metadataProvider,
			textProvider:  CORATEST.textProviderSpy(),
			searchProvider: CORATEST.searchProviderSpy(),
			recordTypeProvider: CORATEST.recordTypeProviderStub(),
			clientInstanceProvider: clientInstanceProvider
		};
		setupDependencies();
		spec = {
			id: "minimalGroupId"
		};
		recursiveDelete = CORA.recursiveDelete(providers, dependencies, spec);
		let toAdd = {
			id: "minimalGroupId",
			type: "group",
			nameInData: "minimalGroupName"
		};
		metadataProvider.addMetadataByCompactDefinition(toAdd);
		
		createIncomingLinksResponse();
	});
	hooks.afterEach(() => {
		//no after
	});

	const setupDependencies = function() {
		dependencies = {
			ajaxCallFactory: ajaxCallFactorySpy,
			view: view
		};
	};
	
	const createIncomingLinksResponse = function(){
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
		metadataProvider.addMetadataRecordById("minimalGroupId", responseFromMetadataRecord);
		metadataProvider.addMetadataRecordById("textVarId", responseFromMetadataRecord);
		metadataProvider.addMetadataRecordById("attributeCollectionVarId", responseFromMetadataRecord);
		metadataProvider.addMetadataRecordById("itemCollectionId", responseFromMetadataRecord);
		metadataProvider.addMetadataRecordById("collectionItemId", responseFromMetadataRecord);	
	};

test("testInit", function(assert) {
	assert.strictEqual(recursiveDelete.type, "recursiveDelete");
});

test("testOnlyForTestGetProviders", function(assert) {
	assert.strictEqual(recursiveDelete.onlyForTestGetProviders(), providers);
});

test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(recursiveDelete.onlyForTestGetDependencies(), dependencies);
});

test("testOnlyForTestGetSpec", function(assert) {
	assert.strictEqual(recursiveDelete.onlyForTestGetSpec(), spec);
});

test("testTopLevelMetadataGroupFetchedFromProvider", function(assert) {
	recursiveDelete.getView();

	assert.strictEqual(metadataProvider.getFetchedMetadataId(0), "minimalGroupId");
});

test("testViewerViewIsCalledAndAnswerFromViewReturned", function(assert) {
	let generatedView = recursiveDelete.getView();

	assert.true(view.getViewModelForCallNo(0) != undefined);
	assert.deepEqual(view.getCreatedViewForCallNo(0), generatedView);
});

test("testViewModel", function(assert) {
	recursiveDelete.getView();

	let viewModel = view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		recordType: "someRecordType",
		type: "group",
		nameInData: "minimalGroupName",
		texts: [{ id: "minimalGroupIdText", recordType: "text" }, { id: "minimalGroupIdDefText", recordType: "text" }],
		methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId
	};
	assert.deepEqual(viewModel, expected);
});

test("testReloadForMetadataChanges", function(assert) {
	recursiveDelete.reloadForMetadataChanges();

	let viewModel = view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		recordType: "someRecordType",
		type: "group",
		nameInData: "minimalGroupName",
		texts: [{ id: "minimalGroupIdText", recordType: "text" }, { id: "minimalGroupIdDefText", recordType: "text" }],
		methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId
	};
	assert.deepEqual(viewModel, expected);
});

test("testOpenDefiningRecordUsingEventAndId", function(assert) {
	let event = document.createEvent('Event');
	event.ctrlKey = true;
	let id = "someMetadataId";
	let responseFromMetadataRecord = { actionLinks: { read: { fakeLinkFetchedById: id } } };
	metadataProvider.addMetadataRecordById(id, responseFromMetadataRecord);

	recursiveDelete.openDefiningRecordUsingEventAndId(event, id);

	let jsClient = clientInstanceProvider.getJsClient();
	let openInfo = jsClient.getOpenInfo(0);
	let expected = {
		readLink: {
			fakeLinkFetchedById: "someMetadataId"
		},
		loadInBackground: "true"
	};
	assert.deepEqual(openInfo, expected);
});

test("testOpenDefiningRecordUsingEventAndIdNoCtrl", function(assert) {
	let event = document.createEvent('Event');
	event.ctrlKey = false;
	let id = "someMetadataId";
	let responseFromMetadataRecord = { actionLinks: { read: { fakeLinkFetchedById: id } } };
	metadataProvider.addMetadataRecordById(id, responseFromMetadataRecord);

	recursiveDelete.openDefiningRecordUsingEventAndId(event, id);

	let jsClient = clientInstanceProvider.getJsClient();
	let openInfo = jsClient.getOpenInfo(0);
	let expected = {
		readLink: {
			fakeLinkFetchedById: "someMetadataId"
		},
		loadInBackground: "false"
	};
	assert.deepEqual(openInfo, expected);
});

test("testViewModelOneChild", function(assert) {
	let toAdd = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		children: [{ repeatMin: "1", repeatMax: "10", refId: "textVarId" }]
	};
	metadataProvider.addMetadataByCompactDefinition(toAdd);
	let toAddTextVar = {
		id: "textVarId",
		type: "textVariable",
		nameInData: "textVarName"
	};
	metadataProvider.addMetadataByCompactDefinition(toAddTextVar);

	recursiveDelete.getView();

	let viewModel = view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		recordType: "someRecordType", 
		type: "group",
		nameInData: "minimalGroupName",
		texts: [{ id: "minimalGroupIdText", recordType: "text" }, { id: "minimalGroupIdDefText", recordType: "text" }],
		methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
		children: []
	};
	let childReference = {
		id: "textVarId",
		recordType: "someRecordType", 
		type: "textVariable",
		nameInData: "textVarName",
		texts: [{ id: "textVarIdText", recordType: "text" }, { id: "textVarIdDefText", recordType: "text" }],
		methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
	};
	expected.children.push(childReference);

	assert.deepEqual(viewModel, expected);
});

test("testViewModelAttributes", function(assert) {
	let toAdd = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroupName",
		attributes: ["attributeCollectionVarId"],
	};
	metadataProvider.addMetadataByCompactDefinition(toAdd);

	let toAddCollectionVar = {
		id: "attributeCollectionVarId",
		type: "collectionVariable",
		nameInData: "collectionVarName",
		finalValue: "someFinalValue",
		itemCollectionId: "itemCollectionId"
	};
	metadataProvider.addMetadataByCompactDefinition(toAddCollectionVar);

	let addToItemCollection = {
		id: "itemCollectionId",
		type: "itemCollection",
		nameInData: "itemCollectionName",
		refIds: ["collectionItemId"]
	};
	metadataProvider.addMetadataByCompactDefinition(addToItemCollection);

	let addToCollectionItem = {
		id: "collectionItemId",
		type: "collectionItem",
		nameInData: "collectionItemName"
	};
	metadataProvider.addMetadataByCompactDefinition(addToCollectionItem);

	recursiveDelete.getView();
	let viewModel = view.getViewModelForCallNo(0);

	let expected = {
		id: "minimalGroupId",
		type: "group",
		recordType: "someRecordType", 
		nameInData: "minimalGroupName",
		texts: [{ id: "minimalGroupIdText", recordType: "text" }, { id: "minimalGroupIdDefText", recordType: "text" }],
		methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
		attributes: []
	};

	let attribute = {
		id: "attributeCollectionVarId",
		recordType: "someRecordType", 
		type: "collectionVariable",
		nameInData: "collectionVarName",
		texts: [{ id: "attributeCollectionVarIdText", recordType: "text" }, { id: "attributeCollectionVarIdDefText", recordType: "text" }],
		methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
		refCollection: []
	};
	expected.attributes.push(attribute);

	let refCollection = {
		id: "itemCollectionId",
		recordType: "someRecordType", 
		type: "itemCollection",
		nameInData: "itemCollectionName",
		texts: [{ id: "itemCollectionIdText", recordType: "text" }, { id: "itemCollectionIdDefText", recordType: "text" }],
		methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
		collectionItems: []
	};
	attribute.refCollection.push(refCollection);

	let collectionItem = {
		id: "collectionItemId",
		recordType: "someRecordType", 
		type: "collectionItem",
		nameInData: "collectionItemName",
		texts: [{ id: "collectionItemIdText", recordType: "text" }, { id: "collectionItemIdDefText", recordType: "text" }],
		methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId
	};
	refCollection.collectionItems.push(collectionItem);

	assert.deepEqual(viewModel, expected);
});

test("testCollectPresentationsCallsIncommingLinks", function(assert) {
	let expectedModel = {
			id: "minimalGroupId",
			recordType: "someRecordType", 
			type: "group",
			nameInData: "minimalGroupName",
			texts: [{ id: "minimalGroupIdText", recordType: "text" }, { id: "minimalGroupIdDefText", recordType: "text" }],
			methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId
		};

	recursiveDelete.getView();

	let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://some/incomingLinks");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, recursiveDelete.collectPresentations);
	assert.strictEqual(ajaxCallSpec.errorMethod, recursiveDelete.handleErrorOnFetchPresentations);
	assert.deepEqual(ajaxCallSpec.model, expectedModel);
});

test("testHandleCallErrorDoesNothing", function(assert) {
	try {
		recursiveDelete.handleErrorOnFetchPresentations();
	} catch (error) {
		assert.strictEqual(error.message, "error fetching incoming links from server");
	}
});

test("testFetchPresentationModel", function(assert) {
	let addPresentation1 = {
			id: "recordTypeFormPGroup",
			type: "group"
		};
		metadataProvider.addMetadataByCompactDefinition(addPresentation1);
	let addPresentation2= {
			id: "recordTypeFormNewPGroup",
			type: "group"
		};
		metadataProvider.addMetadataByCompactDefinition(addPresentation2);
	let addPresentation3 = {
			id: "recordTypeViewPGroup",
			type: "group"
		};
		metadataProvider.addMetadataByCompactDefinition(addPresentation3);
		
	let incomingLinksAnswer = JSON.stringify(CORATEST.incomingLinksAnswer);
	let currentModel = {
				id: "minimalGroupId",
				recordType: "someRecordType", 
				type: "group", 
				nameInData: "minimalGroupName",
				texts: [{ id: "minimalGroupIdText", recordType: "text" }, { id: "minimalGroupIdDefText", recordType: "text" }],
				methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId
			};
	let answer = {
		spec: { model: currentModel },
		responseText: incomingLinksAnswer
	};
	
	recursiveDelete.collectPresentations(answer);
	
	let expectedPresentation= 		[
	  {
	    id: "recordTypeFormPGroup",
	    recordType: "someRecordType",
		type: "group"
	  },
	  {
	    id: "recordTypeFormNewPGroup",
	    recordType: "someRecordType",
		type: "group"
	  },
	  {
	    id: "recordTypeViewPGroup",
	    recordType: "someRecordType",
		type: "group"
	  }
	];
	
	assert.strictEqual(answer.spec.model.presentations.length, 3);
	assert.deepEqual(answer.spec.model.presentations, expectedPresentation);
});

//only("testAllCallsToIncomingLinksAreReady", function(assert) {
//	let addPresentation1 = {
//			id: "recordTypeFormPGroup",
//			type: "group"
//		};
//		metadataProvider.addMetadataByCompactDefinition(addPresentation1);
//	let addPresentation2= {
//			id: "recordTypeFormNewPGroup",
//			type: "group"
//		};
//		metadataProvider.addMetadataByCompactDefinition(addPresentation2);
//	let addPresentation3 = {
//			id: "recordTypeViewPGroup",
//			type: "group"
//		};
//		metadataProvider.addMetadataByCompactDefinition(addPresentation3);
//		
//	let incomingLinksAnswer = JSON.stringify(CORATEST.incomingLinksAnswer);
//	let currentModel = {
//				id: "minimalGroupId",
//				recordType: "someRecordType", 
//				type: "group", 
//				nameInData: "minimalGroupName",
//				texts: [{ id: "minimalGroupIdText", recordType: "text" }, { id: "minimalGroupIdDefText", recordType: "text" }],
//				methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId
//			};
//	let answer = {
//		spec: { model: currentModel },
//		responseText: incomingLinksAnswer
//	};
//	
//	recursiveDelete.getView();
//	
//	setTimeout(function(){
//	    recursiveDelete.collectPresentations(answer);
//	}, 500);
//
//	
//	
//	assert.strictEqual(recursiveDelete.onlyForTestGetActiveAjaxCalls.length, 0);
//});

});