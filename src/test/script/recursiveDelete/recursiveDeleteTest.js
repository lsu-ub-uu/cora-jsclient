
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

QUnit.module("recursiveDelete/recursiveDeleteTest.js", hooks => {
	const test = QUnit.test;

	let metadataProvider;
	let clientInstanceProvider;
	let ajaxCallFactorySpy;
	let recursiveDeleteView;
	let recursiveDeleteDeleter;
	let actionLinksWithIncomingLinks;
	let actionLinksWithRead;

	let dependencies;
	let providers;
	let spec;
	let recursiveDelete;

	hooks.beforeEach(() => {
		metadataProvider = CORATEST.metadataProviderForDefinitionViewerSpy();
		clientInstanceProvider = CORATEST.clientInstanceProviderSpy();
		ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		recursiveDeleteView = CORATEST.recursiveDeleteViewSpy();
		recursiveDeleteDeleter = CORATEST.recursiveDeleteDeleterSpy();

		providers = {
			metadataProvider: metadataProvider,
			textProvider: CORATEST.textProviderSpy(),
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
			view: recursiveDeleteView,
			recursiveDeleteDeleter: recursiveDeleteDeleter
		};
	};

	const createIncomingLinksResponse = function() {
		let actionLinkRead = {
			requestMethod: "GET",
			rel: "read",
			url: "https://cora.epc.ub.uu.se/systemone/rest/record/someRecordType/minimalGroupId",
			accept: "application/vnd.cora.record+json"
		};
		actionLinksWithIncomingLinks = {
			actionLinks: {
				read: actionLinkRead,
				read_incoming_links: {
					requestMethod: "GET",
					rel: "read_incoming_links",
					url: "http://some/incomingLinks",
					accept: "application/vnd.cora.recordList+json"
				}
			}
		};
		actionLinksWithRead = {
			actionLinks: {
				read: actionLinkRead
			}
		};

		metadataProvider.addMetadataRecordById("minimalGroupId", actionLinksWithIncomingLinks);
		metadataProvider.addMetadataRecordById("textVarId", actionLinksWithIncomingLinks);
		metadataProvider.addMetadataRecordById("attributeCollectionVarId", actionLinksWithIncomingLinks);
		metadataProvider.addMetadataRecordById("itemCollectionId", actionLinksWithIncomingLinks);
		metadataProvider.addMetadataRecordById("collectionItemId", actionLinksWithIncomingLinks);
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

	test("testCallToGetViewStartsFetchingOfDataButCreatesAMinimalHtmlElement", function(assert) {
		let minimalView = recursiveDelete.getView();

		assert.deepEqual(recursiveDeleteView.getView(), minimalView);
	});

	test("testTopLevelMetadataGroupFetchedFromProvider", function(assert) {
		recursiveDelete.getView();

		assert.strictEqual(metadataProvider.getFetchedMetadataId(0), "minimalGroupId");
	});

	test("testViewModelNoIncomingLinks", function(assert) {
		metadataProvider.addMetadataRecordById("minimalGroupId", actionLinksWithRead);
		recursiveDelete.getView();

		let viewModel = recursiveDeleteView.getCreateViewForViewModel(0);

		let expected = {
			elementId: 1,
			id: "minimalGroupId",
			recordType: "someRecordType",
			type: "group",
			nameInData: "minimalGroupName",
			texts: [{ elementId: 2, id: "minimalGroupIdText", recordType: "text" },
			{ elementId: 3, id: "minimalGroupIdDefText", recordType: "text" }],
			methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId
		};

		assert.deepEqual(viewModel, expected);
	});

	test("testViewModelWithIncommingLinksButNoPresentations", function(assert) {
		metadataProvider.addMetadataRecordById("minimalGroupId", actionLinksWithIncomingLinks);

		recursiveDelete.getView();

		let callSpec = getCallSpecFromAjaxCall(0);
		let answer = {
			spec: { modelPart: callSpec.modelPart },
			responseText: JSON.stringify(CORATEST.incomingLinksWithoutPresentationsAnswer)
		};

		callSpec.loadMethod(answer);

		assert.strictEqual(ajaxCallFactorySpy.getFactoredNoOfAjaxCalls(), 1);
		let viewModel = recursiveDeleteView.getCreateViewForViewModel(0);

		let expected = {
			elementId: 1,
			id: "minimalGroupId",
			recordType: "someRecordType",
			type: "group",
			nameInData: "minimalGroupName",
			texts: [{ elementId: 2, id: "minimalGroupIdText", recordType: "text" },
			{ elementId: 3, id: "minimalGroupIdDefText", recordType: "text" }],
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
		respondToAjaxCallForWhitOutIncomingLinks(0);
		respondToAjaxCallForWhitOutIncomingLinks(1);
		let viewModel = recursiveDeleteView.getCreateViewForViewModel(0);

		let expected = {
			elementId: 1,
			id: "minimalGroupId",
			recordType: "someRecordType",
			type: "group",
			nameInData: "minimalGroupName",
			texts: [{ elementId: 2, id: "minimalGroupIdText", recordType: "text" }, { elementId: 3, id: "minimalGroupIdDefText", recordType: "text" }],
			methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
			children: []
		};
		let childReference = {
			elementId: 4,
			id: "textVarId",
			recordType: "someRecordType",
			type: "textVariable",
			nameInData: "textVarName",
			texts: [{ elementId: 5, id: "textVarIdText", recordType: "text" }, { elementId: 6, id: "textVarIdDefText", recordType: "text" }],
			methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
		};
		expected.children.push(childReference);

		assert.deepEqual(viewModel, expected);
	});

	const respondToAjaxCallForWhitOutIncomingLinks = function(callNumber) {
		let callSpec = getCallSpecFromAjaxCall(callNumber);
		let answer = {
			spec: { modelPart: callSpec.modelPart },
			responseText: JSON.stringify(CORATEST.incomingLinksWithoutPresentationsAnswer)
		};
		callSpec.loadMethod(answer);
	};

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
		assert.strictEqual(ajaxCallFactorySpy.getFactoredNoOfAjaxCalls(), 2)
		respondToAjaxCallForWhitOutIncomingLinks(0);
		respondToAjaxCallForWhitOutIncomingLinks(1);
		
		let viewModel = recursiveDeleteView.getCreateViewForViewModel(0);

		let expected = {
			elementId: 1,
			id: "minimalGroupId",
			type: "group",
			recordType: "someRecordType",
			nameInData: "minimalGroupName",
			texts: [{ elementId: 2, id: "minimalGroupIdText", recordType: "text" }, { elementId: 3, id: "minimalGroupIdDefText", recordType: "text" }],
			methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
			attributes: []
		};

		let attribute = {
			elementId: 4,
			id: "attributeCollectionVarId",
			recordType: "someRecordType",
			type: "collectionVariable",
			nameInData: "collectionVarName",
			texts: [{ elementId: 5, id: "attributeCollectionVarIdText", recordType: "text" }, { elementId: 6, id: "attributeCollectionVarIdDefText", recordType: "text" }],
			methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
			refCollection: []
		};
		expected.attributes.push(attribute);

		let refCollection = {
			elementId: 7,
			id: "itemCollectionId",
			recordType: "someRecordType",
			type: "itemCollection",
			nameInData: "itemCollectionName",
			texts: [{ elementId: 8, id: "itemCollectionIdText", recordType: "text" }, { elementId: 9, id: "itemCollectionIdDefText", recordType: "text" }],
			methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId,
			collectionItems: []
		};
		attribute.refCollection.push(refCollection);

		let collectionItem = {
			elementId: 10,
			id: "collectionItemId",
			recordType: "someRecordType",
			type: "collectionItem",
			nameInData: "collectionItemName",
			texts: [{ elementId: 11, id: "collectionItemIdText", recordType: "text" }, { elementId: 12, id: "collectionItemIdDefText", recordType: "text" }],
			methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId
		};
		refCollection.collectionItems.push(collectionItem);

		assert.deepEqual(viewModel, expected);
	});

	test("testCollectPresentationsCallsIncommingLinks", function(assert) {
		let expectedModelPart = {
			elementId: 1,
			id: "minimalGroupId",
			recordType: "someRecordType",
			type: "group",
			nameInData: "minimalGroupName",
			texts: [{ elementId: 2, id: "minimalGroupIdText", recordType: "text" }, { elementId: 3, id: "minimalGroupIdDefText", recordType: "text" }],
			methodOpenDefiningRecord: recursiveDelete.openDefiningRecordUsingEventAndId
		};

		recursiveDelete.getView();
		assert.strictEqual(ajaxCallFactorySpy.getFactoredNoOfAjaxCalls(), 1)

		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(0);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, "http://some/incomingLinks");
		assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.recordList+json");
		assert.strictEqual(ajaxCallSpec.contentType, undefined);
		assert.strictEqual(ajaxCallSpec.data, undefined);
		assert.deepEqual(ajaxCallSpec.modelPart, expectedModelPart);
	});

	test("testHandleCallErrorDoesNothing", function(assert) {
		let errorFromAjaxCall = {
			status: 404,
			response: "someError"
		};

		try {
			recursiveDelete.getView();
			let callSpec = getCallSpecFromAjaxCall(0);
			callSpec.errorMethod(errorFromAjaxCall);
		} catch (error) {
			assert.strictEqual(error.message, "Error fetching incoming links from server. 404 : someError");
			assert.strictEqual(error.cause, errorFromAjaxCall);
		}
	});

	test("testFetchPresentationModel", function(assert) {
		let addPresentation1 = {
			id: "recordTypeFormPGroup",
			type: "group"
		};
		metadataProvider.addMetadataByCompactDefinition(addPresentation1);
		let addPresentation2 = {
			id: "recordTypeFormNewPGroup",
			type: "group"
		};
		metadataProvider.addMetadataByCompactDefinition(addPresentation2);
		let addPresentation3 = {
			id: "recordTypeViewPGroup",
			type: "group"
		};
		metadataProvider.addMetadataByCompactDefinition(addPresentation3);


		recursiveDelete.getView();

		let callSpec = getCallSpecFromAjaxCall(0);
		let answer = {
			spec: { modelPart: callSpec.modelPart },
			responseText: JSON.stringify(CORATEST.incomingLinksAnswer)
		};
		callSpec.loadMethod(answer);


		let expectedPresentation = [
			{
				elementId: 4,
				id: "recordTypeFormPGroup",
				recordType: "someRecordType",
				type: "group"
			},
			{
				elementId: 5,
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

		assert.strictEqual(answer.spec.modelPart.presentations.length, 3);

		let expectedViewModel = {...callSpec.modelPart};
		expectedViewModel.presentations = expectedPresentation

		assertCreateViewIsCalled(assert, expectedViewModel);
	});

	const getCallSpecFromAjaxCall = function(callNumber) {
		let factoredAjax = ajaxCallFactorySpy.getFactored(callNumber);
		return factoredAjax.getSpec();
	};

	const assertCreateViewIsCalled = async function(assert, expectedViewModel) {
		assert.true(recursiveDeleteView.getCreateViewForViewModel(0) != undefined);
		assert.deepEqual(recursiveDeleteView.getCreateViewForViewModel(0), expectedViewModel);
	};

	test("testPresentationWithThreeChilds_Presentation_Text_GuiElement", function(assert) {
		metadataProvider.addMetadataById("recordTypeFormPGroup", CORATEST.recursiveDeletePresentationWithChildren);
		let childPresentation1 = {
			id: "childPresentation",
			type: "pVar"
		};
		metadataProvider.addMetadataByCompactDefinition(childPresentation1);
		metadataProvider.addMetadataById("textsText", CORATEST.recursiveDeleteTextChildFromPresentation);
		metadataProvider.addMetadataById("testGuiElement", CORATEST.recursiveDeleteGuiElementChildFromPresentation);

		let addPresentation2 = {
			id: "recordTypeFormNewPGroup",
			type: "group"
		};
		metadataProvider.addMetadataByCompactDefinition(addPresentation2);
		let addPresentation3 = {
			id: "recordTypeViewPGroup",
			type: "group"
		};
		metadataProvider.addMetadataByCompactDefinition(addPresentation3);

		recursiveDelete.getView();

		ajaxCallFactorySpy.getFactored(0)
		
		assert.strictEqual(ajaxCallFactorySpy.getFactoredNoOfAjaxCalls(), 1);
		let callSpec = getCallSpecFromAjaxCall(0);
		let answer = {
			spec: { modelPart: callSpec.modelPart },
			responseText: JSON.stringify(CORATEST.incomingLinksAnswer)
		};
		callSpec.loadMethod(answer);

		let expectedPresentation = [
			{
				elementId: 4,
				id: "recordTypeFormPGroup",
				recordType: "presentation",
				type: "container",
				childPresentations: [{
					elementId: 5,
					id: "childPresentation",
					recordType: "someRecordType",
					type: "pVar"
				}],
				texts: [{
					elementId: 6,
					id: "textsText",
					recordType: "text",
				}],
				guiElements: [{
					elementId: 7,
					id: "testGuiElement",
					recordType: "guiElement",
					type: "guiElementLink",
					elementText: [{ elementId: 8, id: "minimalGroupIdText", recordType: "text" }]
				}]
			},
			{
				elementId: 9,
				id: "recordTypeFormNewPGroup",
				recordType: "someRecordType",
				type: "group"
			},
			{
				elementId: 10,
				id: "recordTypeViewPGroup",
				recordType: "someRecordType",
				type: "group"
			}
		];

		assert.strictEqual(answer.spec.modelPart.presentations.length, 3);

		let expectedViewModel = {...callSpec.modelPart};
		expectedViewModel.presentations = expectedPresentation;
		
		assertCreateViewIsCalled(assert, expectedViewModel);
	});

	test("testSetModelAndUrlForDelteInDeleter", function(assert) {
		metadataProvider.addMetadataRecordById("minimalGroupId", actionLinksWithRead);

		recursiveDelete.getView();

		let modelAndUrl = recursiveDeleteDeleter.getModelAndUrlForDelete();
		let expectedModelSameAsView = recursiveDeleteView.getCreateViewForViewModel(0);

		assert.strictEqual(modelAndUrl.model, expectedModelSameAsView);
		assert.strictEqual(modelAndUrl.url, "https://cora.epc.ub.uu.se/systemone/rest/record/");
	});

	test("testSendDeleteMethodToView", function(assert) {
		metadataProvider.addMetadataRecordById("minimalGroupId", actionLinksWithRead);

		recursiveDelete.getView();

		let deleteMethod = recursiveDeleteView.getDeleteMethod(0);
		assert.strictEqual(deleteMethod, recursiveDeleteDeleter.deleteElement);
	});
});