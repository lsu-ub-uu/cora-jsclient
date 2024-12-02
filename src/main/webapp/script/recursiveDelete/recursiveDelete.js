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
		let out;
		let metadataProvider = providers.metadataProvider;
		let ajaxCallFactory = dependencies.ajaxCallFactory;
		let jsClient = providers.clientInstanceProvider.getJsClient();
		let recursiveDeleteView = dependencies.view;
		let id;
		let model;
		let ajaxActiveCalls = [];
		let elementId = 0;

		const start = function() {
			id = spec.id;
		};

		const reloadForMetadataChanges = function() {
			let model = getViewModelForMetadataUsingId(id);
			recursiveDeleteView.updateViewForViewModel(model);
		};

		const getView = function() {
			model = getViewModelForMetadataUsingId(id);
			return recursiveDeleteView.getView();
		};

		const onlyForTestGetViewModelForMetadataUsingId = function() {
			//In order to be able to validate the model, since the async ajax calls complicates the testing
			return getViewModelForMetadataUsingId(id);
		}

		const getViewModelForMetadataUsingId = function(metadataId) {
			let cDataRecordGroup = getCMetadataById(metadataId);
			let currentModel = getBasicModelForMetadata(cDataRecordGroup);

			if (cDataRecordGroup.containsChildWithNameInData("attributeReferences")) {
				currentModel.attributes = collectAttributes(cDataRecordGroup);
			}
			if (cDataRecordGroup.containsChildWithNameInData("refCollection")) {
				currentModel.refCollection = collectRefCollection(cDataRecordGroup);
			}
			if (cDataRecordGroup.containsChildWithNameInData("collectionItemReferences")) {
				currentModel.collectionItems = collectCollectionItemReferences(cDataRecordGroup);
			}
			if (cDataRecordGroup.containsChildWithNameInData("childReferences")) {
				currentModel.children = collectChildReferences(cDataRecordGroup, "childReferences");
			}
			let metadataRecord = metadataProvider.getMetadataRecordById(metadataId);
			fetchPresenetationsByUrl(metadataRecord.actionLinks.read_incoming_links.url, currentModel);

			return currentModel;
		};

		const getCMetadataById = function(metadataId) {
			let metadata = metadataProvider.getMetadataById(metadataId);
			//			console.log(JSON.stringify(metadata));
			return CORA.coraData(metadata);
		};

		const getBasicModelForMetadata = function(cDataRecordGroup) {
			let basic = {
				elementId: getNewElementId(),
				id: getId(cDataRecordGroup),
				recordType: getRecordType(cDataRecordGroup),
				type: getType(cDataRecordGroup),
				nameInData: cDataRecordGroup.getFirstAtomicValueByNameInData("nameInData"),
				//				dataDivider: getDataDivider(cDataRecordGroup),
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

		//		const getDataDivider = function(cDataRecordGroup) {
		//			let cRecordInfo = getCRecordInfo(cDataRecordGroup);
		//			let type = cRecordInfo.getFirstChildByNameInData("dataDivider");
		//			let cTtype = CORA.coraData(type);
		//			return cTtype.getFirstAtomicValueByNameInData("linkedRecordId");
		//		};


		const getText = function(cDataRecordGroup, name) {
			let textObject = {
				elementId: getNewElementId(),
				id: cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData(name),
				recordType: "text",
				//				dataDivider: getDataDivider(cDataRecordGroup)
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
		const fetchPresenetationsByUrl = function(url, model) {
			let callSpec = {
				url: url,
				requestMethod: "GET",
				accept: "application/vnd.uub.recordList+json",
				loadMethod: collectPresentations,
				errorMethod: handleErrorOnFetchPresentations,
				model: model
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
			answer.spec.model.presentations = presentations;

			ajaxActiveCalls.pop();
			if (ajaxActiveCalls.length == 0) {
				modelIsReady(model);
			}
		};

		const modelIsReady = function(model) {
			recursiveDeleteView.createViewForViewModel(model);
//			let deleteMetod = function(){dependencies.recursiveDeleteDeleter.deleteElement(viewModel)};
//			recursiveDeleteView.setDeleteMethod(deleteMethod);
		}

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
				currentLevelModel.presentations = presentationChildren.presentations;
				currentLevelModel.texts = presentationChildren.texts;
				currentLevelModel.guiElements = presentationChildren.guiElements;
			}
			return currentLevelModel;
		};

		const collectChildReferencesForPresentations = function(cDataRecordGroup, groupName) {
			let children = { presentations: [], texts: [], guiElements: [] };
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
				childrenArrays.presentations.push(childrenMetadataInfo);
			}
			if (getType(cRef) === "text") {
				childrenArrays.texts.push(childrenMetadataInfo);
			}
			if (getType(cRef) === "guiElement") {
				childrenArrays.guiElements.push(childrenMetadataInfo);
			}
		};

		const handleErrorOnFetchPresentations = function(error) {
			throw new Error("error fetching incoming links from server", error);
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
			reloadForMetadataChanges: reloadForMetadataChanges,
			openDefiningRecordUsingEventAndId: openDefiningRecordUsingEventAndId,
			collectPresentations: collectPresentations,
			handleErrorOnFetchPresentations: handleErrorOnFetchPresentations,
			onlyForTestGetViewModelForMetadataUsingId: onlyForTestGetViewModelForMetadataUsingId,
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