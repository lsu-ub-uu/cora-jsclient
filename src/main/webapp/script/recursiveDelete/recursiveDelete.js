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
var CORA = (function(cora) {
	"use strict";
	cora.recursiveDelete = function(providers, dependencies, spec) {
		const metadataProvider = providers.metadataProvider;
		const jsClient = providers.clientInstanceProvider.getJsClient();
		const ajaxCallFactory = dependencies.ajaxCallFactory;
		const recursiveDeleteDeleter = dependencies.recursiveDeleteDeleter;
		const recursiveDeleteView = dependencies.view;

		const ajaxActiveCalls = [];
		let out;
		let id;
		let model;
		let elementId = 0;

		const start = function() {
			id = spec.id;
		};

		const getView = function() {
			model = getViewModelForMetadataUsingId(id);
			ensureModelIsReady();
			return recursiveDeleteView.getView();
		};

		const getViewModelForMetadataUsingId = function(metadataId) {
			let cDataRecordGroup = getCMetadataById(metadataId);
			let modelPart = getBasicModelForMetadata(cDataRecordGroup);

			if (cDataRecordGroup.containsChildWithNameInData("attributeReferences")) {
				modelPart.attributes = collectAttributes(cDataRecordGroup);
			}
			if (cDataRecordGroup.containsChildWithNameInData("refCollection")) {
				modelPart.refCollection = collectRefCollection(cDataRecordGroup);
			}
			if (cDataRecordGroup.containsChildWithNameInData("collectionItemReferences")) {
				modelPart.collectionItems = collectCollectionItemReferences(cDataRecordGroup);
			}
			if (cDataRecordGroup.containsChildWithNameInData("childReferences")) {
				modelPart.children = collectChildReferences(cDataRecordGroup, "childReferences");
			}
			let metadataRecord = metadataProvider.getMetadataRecordById(metadataId);
			let metadataRecordData = cDataRecordGroup.getData();
			let metadataTypesToCheckForPresentations = ["itemCollection", "collectionItem"];
			if ( !metadataTypesToCheckForPresentations.includes(metadataRecordData.attributes.type) &&
				metadataRecord.actionLinks.read_incoming_links) {
				fetchPresenetationsByUrl(metadataRecord.actionLinks.read_incoming_links.url, modelPart);
			}
			return modelPart;
		};

		const getCMetadataById = function(metadataId) {
			let metadata = metadataProvider.getMetadataById(metadataId);
			return CORA.coraData(metadata);
		};

		const getBasicModelForMetadata = function(cDataRecordGroup) {
			let basic = {
				elementId: getNewElementId(),
				id: getId(cDataRecordGroup),
				recordType: getRecordType(cDataRecordGroup),
				type: getType(cDataRecordGroup),
				nameInData: cDataRecordGroup.getFirstAtomicValueByNameInData("nameInData"),
				texts: [],
				methodOpenDefiningRecord: out.openDefiningRecordUsingEventAndId
			};
			basic.texts.push(getText(cDataRecordGroup, "textId"));
			basic.texts.push(getText(cDataRecordGroup, "defTextId"));

			return basic;
		};

		const getNewElementId = function() {
			elementId++;
			return elementId;
		};

		const getId = function(cDataRecordGroup) {
			let cRecordInfo = getCRecordInfo(cDataRecordGroup);
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};

		const getCRecordInfo = function(cDataRecordGroup) {
			let recordInfo = cDataRecordGroup.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo);
		}

		const getRecordType = function(cDataRecordGroup) {
			let cRecordInfo = getCRecordInfo(cDataRecordGroup);
			let type = cRecordInfo.getFirstChildByNameInData("type");
			let cTtype = CORA.coraData(type);
			return cTtype.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const getType = function(cDataRecordGroup) {
			let recordAsData = cDataRecordGroup.getData();
			if (recordAsData.attributes) {
				return cDataRecordGroup.getData().attributes["type"];
			}
			return "-";
		};

		const getText = function(cDataRecordGroup, name) {
			let textObject = {
				elementId: getNewElementId(),
				id: cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData(name),
				recordType: "text",
			};
			return textObject;
		};

		const collectAttributes = function(cDataRecordGroup) {
			let attributes = [];
			let attributeReferences = cDataRecordGroup.getFirstChildByNameInData("attributeReferences");
			for (let attributeReference of attributeReferences.children) {
				let metadataInfo = readLinkAndCreateMetadataInformation(attributeReference);
				attributes.push(metadataInfo);
			}
			return attributes;
		};

		const readLinkAndCreateMetadataInformation = function(data) {
			let cData = CORA.coraData(data);
			let linkId = cData.getFirstAtomicValueByNameInData("linkedRecordId");
			return getViewModelForMetadataUsingId(linkId);
		};

		const collectRefCollection = function(cDataRecordGroup) {
			let refCollection = [];
			let refCollectionLink = cDataRecordGroup.getFirstChildByNameInData("refCollection");
			let metadataInfo = readLinkAndCreateMetadataInformation(refCollectionLink);
			refCollection.push(metadataInfo);
			return refCollection;
		};

		const collectCollectionItemReferences = function(cDataRecordGroup) {
			let collectionItemReferences = [];
			let collectionItemReferencesGroup = cDataRecordGroup.getFirstChildByNameInData("collectionItemReferences");
			for (let itemLink of collectionItemReferencesGroup.children) {
				let metadataInfo = readLinkAndCreateMetadataInformation(itemLink);
				collectionItemReferences.push(metadataInfo);
			}
			return collectionItemReferences;
		};

		const collectChildReferences = function(cDataRecordGroup, groupName) {
			let children = [];
			let childReferences = cDataRecordGroup.getFirstChildByNameInData(groupName);
			for (let childReference of childReferences.children) {
				let cChildReference = CORA.coraData(childReference);
				let refId = cChildReference.getLinkedRecordIdFromFirstChildLinkWithNameInData("ref");
				let childrenMetadataInfo = getViewModelForMetadataUsingId(refId);
				children.push(childrenMetadataInfo);
			}
			return children;
		};

		const fetchPresenetationsByUrl = function(url, modelPart) {
			let callSpec = {
				url: url,
				requestMethod: "GET",
				accept: "application/vnd.uub.recordList+json",
				loadMethod: collectPresentations,
				errorMethod: handleErrorOnFetchPresentations,
				modelPart: modelPart
			};
			createActiveAjaxCall();
			ajaxCallFactory.factor(callSpec);
		};

		const createActiveAjaxCall = function() {
			ajaxActiveCalls.push("active");
		};

		const collectPresentations = function(answer) {
			let response = JSON.parse(answer.responseText);
			let data = response.dataList.data;
			let presentations = [];
			data.forEach((incomingLink) => filterAndAddIncomingPresentations(incomingLink, presentations));
			if (presentations.length != 0) {
				answer.spec.modelPart.presentations = presentations;
			}

			ajaxActiveCalls.pop();
			ensureModelIsReady();
		};

		const ensureModelIsReady = function() {
			if (ajaxActiveCalls.length == 0) {
				modelIsReady(model);
			}
		};

		const modelIsReady = function(model) {
			let baseUrl = calculateBaseUrlFromTopRecordInModel(model);
			recursiveDeleteDeleter.setModelAndUrlForDelete(model, baseUrl);
			recursiveDeleteView.createViewForViewModel(model);
			recursiveDeleteView.setDeleteMethod(recursiveDeleteDeleter.deleteElement);
		};

		const calculateBaseUrlFromTopRecordInModel = function(model) {
			let baseInModelAsRecord = metadataProvider.getMetadataRecordById(model.id);
			let readUrl = baseInModelAsRecord.actionLinks.read.url;
			return readUrl.replace(`${model.recordType}/${model.id}`, '');
		};

		const filterAndAddIncomingPresentations = function(incomingLinkAsJson, presentations) {
			let incomingLink = getRecordTypeFromIncomingLink(incomingLinkAsJson);
			if (incomingLinksIsAPresentation(incomingLink.type)) {
				let presentationModel = getViewModelForPresentationUsingId(incomingLink.id);
				presentations.push(presentationModel);
			}
		};

		const incomingLinksIsAPresentation = function(incomingLinkType) {
			return incomingLinkType === "presentation"
		};

		const getRecordTypeFromIncomingLink = function(incomingLinkAsJson) {
			let cData = CORA.coraData(incomingLinkAsJson);
			let from = cData.getFirstChildByNameInData("from");
			let cFrom = CORA.coraData(from);
			let incomingLink = {
				type: cFrom.getFirstAtomicValueByNameInData("linkedRecordType"),
				id: cFrom.getFirstAtomicValueByNameInData("linkedRecordId")
			};
			return incomingLink;
		};


		const getBasicModelForPresentation = function(cPresentation) {
			if (isAText(cPresentation)) {
				return createTextElement(cPresentation);
			}
			if (isAGuiElement(cPresentation)) {
				return createGuiElementElement(cPresentation);
			}
			return createPresentationElement(cPresentation);
		};

		const isAText = function(cPresentation) {
			return getRecordType(cPresentation) === "text";
		};

		const isAGuiElement = function(cPresentation) {
			return getRecordType(cPresentation) === "guiElement";
		};

		const createTextElement = function(cPresentation) {
			return {
				elementId: getNewElementId(),
				id: getId(cPresentation),
				recordType: getRecordType(cPresentation)
			};
		};

		const createGuiElementElement = function(cPresentation) {
			let guiElement = {
				elementId: getNewElementId(),
				id: getId(cPresentation),
				recordType: getRecordType(cPresentation),
				type: getType(cPresentation),
				elementText: []
			};
			guiElement.elementText.push(getText(cPresentation, "elementText"));
			return guiElement;
		};

		const createPresentationElement = function(cPresentation) {
			return {
				elementId: getNewElementId(),
				id: getId(cPresentation),
				recordType: getRecordType(cPresentation),
				type: getType(cPresentation)
			};
		};

		const getViewModelForPresentationUsingId = function(id) {
			let cDataRecordGroup = getCMetadataById(id);
			let currentLevelModel = getBasicModelForPresentation(cDataRecordGroup);
			if (cDataRecordGroup.containsChildWithNameInData("childReferences")) {
				let presentationChildren = collectChildReferencesForPresentations(cDataRecordGroup, "childReferences");
				currentLevelModel.childPresentations = presentationChildren.childPresentations;
				currentLevelModel.texts = presentationChildren.texts;
				currentLevelModel.guiElements = presentationChildren.guiElements;
			}
			return currentLevelModel;
		};

		const collectChildReferencesForPresentations = function(cDataRecordGroup, groupName) {
			let children = { childPresentations: [], texts: [], guiElements: [] };
			let childReferences = cDataRecordGroup.getFirstChildByNameInData(groupName);
			for (let childReference of childReferences.children) {
				handleChildReference(children, childReference);
			}
			return children;
		};

		const handleChildReference = function(childrenArrays, childReference) {
			let cChildReference = CORA.coraData(childReference);
			let refGroup = cChildReference.getFirstChildByNameInData("refGroup");
			for (let ref of refGroup.children) {
				handleRefGroupChild(childrenArrays, ref);
			}
		};

		const handleRefGroupChild = function(childrenArrays, ref) {
			let cRef = CORA.coraData(ref);
			let refId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
			let childrenMetadataInfo = getViewModelForPresentationUsingId(refId);
			if (getType(cRef) === "presentation") {
				childrenArrays.childPresentations.push(childrenMetadataInfo);
			}
			if (getType(cRef) === "text") {
				childrenArrays.texts.push(childrenMetadataInfo);
			}
			if (getType(cRef) === "guiElement") {
				childrenArrays.guiElements.push(childrenMetadataInfo);
			}
		};

		const handleErrorOnFetchPresentations = function(error) {
			let errorMessage = `Error fetching incoming links from server. ${error.status} : ${error.response}`
			throw new Error(errorMessage, { cause: error });
		};

		const openDefiningRecordUsingEventAndId = function(event, id) {
			let metadataRecord = metadataProvider.getMetadataRecordById(id);
			let readLink = metadataRecord.actionLinks.read;
			openLinkedRecordForLink(event, readLink);
		};

		const openLinkedRecordForLink = function(event, link) {
			let loadInBackground = "false";
			if (event.ctrlKey) {
				loadInBackground = "true";
			}
			let openInfo = {
				readLink: link,
				loadInBackground: loadInBackground
			};
			jsClient.openRecordUsingReadLink(openInfo);
		};

		const onlyForTestGetProviders = function() {
			return providers;
		};

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		const onlyForTestGetSpec = function() {
			return spec;
		};

		const onlyForTestGetActiveAjaxCalls = function() {
			return ajaxActiveCalls;
		};

		out = Object.freeze({
			type: "recursiveDelete",
			getView: getView,
			openDefiningRecordUsingEventAndId: openDefiningRecordUsingEventAndId,
			onlyForTestGetProviders: onlyForTestGetProviders,
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			onlyForTestGetSpec: onlyForTestGetSpec,
			onlyForTestGetActiveAjaxCalls: onlyForTestGetActiveAjaxCalls
		});
		start();

		return out;
	};
	return cora;
}(CORA));