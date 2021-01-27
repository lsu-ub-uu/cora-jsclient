/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2017 Olov McKie
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
	cora.pRecordLink = function(dependencies, spec) {

		let out;
		let readLink;
		let openLinkShowing = false;
		let cPresentation = spec.cPresentation;
		let metadataProvider = dependencies.metadataProvider;
		let textProvider = dependencies.textProvider;
		let recordTypeProvider = dependencies.recordTypeProvider;

		let presentationGroup = cPresentation.getFirstChildByNameInData("presentationOf");
		let cPresentationGroup = CORA.coraData(presentationGroup);
		let metadataId = cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		let cMetadataElement = getMetadataById(metadataId);
		let nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
		let mode = cPresentation.getFirstAtomicValueByNameInData("mode");
		let hasLinkedRepeatId = cMetadataElement.containsChildWithNameInData("linkedPath");

		let recordIdPath = "";
		let recordTypePath = "";

		let cRecordTypeGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData("linkedRecordType"));
		let linkedRecordType = cRecordTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		let view;

		const start = function() {
			dependencies.pubSub.subscribe("linkedData", spec.path, undefined, handleMsg);
			view = createBaseView();
			createValueView();
			possiblyCreateSearchHandler();
			subscribeToSetValueIfLinkedPresentationExists();
		};

		const createBaseView = function() {
			let textId = extractTextId("textId");
			let text = textProvider.getTranslation(textId);

			let defTextId = extractTextId("defTextId");
			let defText = textProvider.getTranslation(defTextId);

			let viewSpec = {
				"mode": "input",
				"info": {
					"text": text,
					"defText": defText,
					"technicalInfo": ["textId: " + textId,
					"defTextId: " + defTextId,
					"metadataId: " + metadataId,
					"nameInData: " + nameInData,
					"linkedRecordType: " + linkedRecordType]
				},
				"pRecordLink": out
			};
			return dependencies.pRecordLinkViewFactory.factor(viewSpec);
		};

		const extractTextId = function(textNameInData) {
			let cTextIdGroup = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData(textNameInData));
			return cTextIdGroup
				.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const createValueView = function() {
			if (isInInputMode()) {
				createAndAddInputs();
			} else {
				createAndAddOutput();
			}
		};

		const isInInputMode = function() {
			return mode === "input";
		};

		const handleMsg = function(payloadFromMsg) {
			if (msgContainsDataWithValueForRecordId(payloadFromMsg)) {
				handleMsgWithData(payloadFromMsg);
			}
		};

		const msgContainsDataWithValueForRecordId = function(payloadFromMsg) {
			if (payloadFromMsg.data === undefined) {
				return false;
			}
			let cData = CORA.coraData(payloadFromMsg.data);
			let linkedRecordId = cData.getFirstAtomicValueByNameInData("linkedRecordId");
			if (linkedRecordId !== "") {
				return true;
			}

			return false;
		};

		const handleMsgWithData = function(payloadFromMsg) {
			closeSearchIfThereIsOne();
			createLinkedRecordPresentationView(payloadFromMsg);
			showOrHideOpenLinkedRecordButton(payloadFromMsg);
		};

		const closeSearchIfThereIsOne = function() {
			view.hideSearchHandlerView();
		};

		const createLinkedRecordPresentationView = function(payloadFromMsg) {
			if (linkedRecordShouldBePresentedCanBeRead(payloadFromMsg)) {
				let data = payloadFromMsg.data;
				readLink = data.actionLinks.read;
				possiblyCreateRecordViewerForLinkedRecord(data);
			}
		};

		const linkedRecordShouldBePresentedCanBeRead = function(payloadFromMsg) {
			return cPresentation
				.containsChildWithNameInData("linkedRecordPresentations")
				&& messageContainsDataWithActionLinks(payloadFromMsg);
		};

		const messageContainsDataWithActionLinks = function(payloadFromMsg) {
			return undefined !== payloadFromMsg.data.actionLinks;
		};

		const possiblyCreateRecordViewerForLinkedRecord = function(data) {
			let linkedRecordPresentation = findPresentationForRecordType(data);
			if (presentationExistsForLinkedRecordType(linkedRecordPresentation)) {
				removeIdPresentations();
				createRecordViewerUsingChosenPresentationForLinkedRecord(linkedRecordPresentation);
			}
		};

		const findPresentationForRecordType = function(data) {
			let filter = createLinkedRecordTypeFilter(data);

			let linkedRecordPresentations = cPresentation
				.getFirstChildByNameInData("linkedRecordPresentations");
			return linkedRecordPresentations.children.find(filter);
		};

		const createLinkedRecordTypeFilter = function(data) {
			let cData = CORA.coraData(data);
			let recordTypeIdInData = cData
				.getFirstAtomicValueByNameInData("linkedRecordType");

			let dataRecordTypeDefinition = recordTypeProvider.getMetadataByRecordTypeId(recordTypeIdInData);
			let parent = dataRecordTypeDefinition.parentId;

			return function(child) {
				let cChild = CORA.coraData(child);
				let cPresentedRecordType = CORA.coraData(cChild.getFirstChildByNameInData("presentedRecordType"));
				return isSameRecordTypeOrImplementing(recordTypeIdInData, parent, cPresentedRecordType);
			};
		};

		const presentationExistsForLinkedRecordType = function(linkedRecordPresentation) {
			return linkedRecordPresentation !== undefined;
		};

		const isSameRecordTypeOrImplementing = function(recordTypeIdInData, parent, cPresentedRecordType) {
			let recordTypeIdInLink = cPresentedRecordType.getFirstAtomicValueByNameInData("linkedRecordId");
			let sameRecordType = recordTypeIdInLink === recordTypeIdInData;
			let isParentToRecordTypeInData = recordTypeIsParent(parent, recordTypeIdInLink);

			return sameRecordType || isParentToRecordTypeInData;
		}

		const recordTypeIsParent = function(parent, recordTypeIdInLink) {
			return parent !== undefined && recordTypeIdInLink === parent;
		}

		const showOrHideOpenLinkedRecordButton = function(payloadFromMsg) {
			if (messageContainsDataWithActionLinks(payloadFromMsg)) {
				readLink = payloadFromMsg.data.actionLinks.read;
				view.showOpenLinkedRecordButton();
				openLinkShowing = true;
			} else {
				if (openLinkShowing) {
					view.hideOpenLinkedRecordButton();
					openLinkShowing = false;
				}
			}
		};

		const removeIdPresentations = function() {
			view.hideChildren();
			if (isInInputMode()) {
				view.showClearLinkedRecordIdButton(clearLinkedRecordId);
			}
		};

		const createRecordViewerUsingChosenPresentationForLinkedRecord = function(
			linkedRecordPresentation) {
			let linkedPresentationId = extractPresentationIdFromPresentation(linkedRecordPresentation);
			let recordViewerSpec = createRecordViewerSpec(readLink, linkedPresentationId);
			let recordViewer = CORA.recordViewer(recordViewerSpec);
			let recordViewerView = recordViewer.getView();

			view.addLinkedPresentation(recordViewerView);
		};

		const createRecordViewerSpec = function(readLinkIn, linkedPresentationId) {
			let cLinkedRecordPresentation = getMetadataById(linkedPresentationId);

			let presentationOfLink = cLinkedRecordPresentation
				.getFirstChildByNameInData("presentationOf");
			let cPresentationOfLink = CORA.coraData(presentationOfLink);
			let linkedMetadataId = cPresentationOfLink.getFirstAtomicValueByNameInData("linkedRecordId");
			return {
				"read": readLinkIn,
				"presentationId": linkedPresentationId,
				"metadataId": linkedMetadataId,
				"recordGuiFactory": dependencies.recordGuiFactory,
				"ajaxCallFactory": dependencies.ajaxCallFactory,
				recordPartPermissionCalculatorFactory: spec.recordPartPermissionCalculatorFactory
			};
		};

		const extractPresentationIdFromPresentation = function(presentation) {
			let cChildPresentation = CORA.coraData(presentation);
			let cLinkedPresentationAsGroup = CORA.coraData(cChildPresentation
				.getFirstChildByNameInData("presentation"));
			return cLinkedPresentationAsGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const createAndAddInputs = function() {
			createInputForLinkedRecordType();
			createInputForLinkedRecordId();

			if (hasLinkedRepeatId) {
				createChildView("linkedRepeatId", "linkedRepeatIdPVar");
			}
		};

		const createInputForLinkedRecordType = function() {
			let recordTypePVarId = "linkedRecordTypePVar";
			let recordTypeDefinition = recordTypeProvider.getMetadataByRecordTypeId(linkedRecordType);
			if (linkedRecordTypeIsImplementing(recordTypeDefinition)) {
				recordTypePVarId = "linkedRecordTypeOutputPVar";
			}
			recordTypePath = calculateNewPath("linkedRecordTypeTextVar");
			createChildView("linkedRecordType", recordTypePVarId);
		};

		const linkedRecordTypeIsImplementing = function(recordTypeDefinition) {
			return recordTypeDefinition.abstract === "false";
		};

		const createInputForLinkedRecordId = function() {
			let recordIdPVarId = "linkedRecordIdPVar";
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				recordIdPVarId = "linkedRecordIdOutputPVar";
			}
			recordIdPath = calculateNewPath("linkedRecordIdTextVar");
			createChildView("linkedRecordId", recordIdPVarId);
		};

		const createChildView = function(id, presentationIdToFactor) {
			let metadataIdUsedInData = id + "TextVar";
			let childViewNew = document.createElement("span");
			childViewNew.className = id + "View";
			childViewNew.appendChild(createText(id + "Text"));

			let childParentPath = calculateNewPath(id + "TextVar");
			let cPresentationChild = CORA.coraData(metadataProvider
				.getMetadataById(presentationIdToFactor));
			let presentationSpec = {
				"path": childParentPath,
				"metadataIdUsedInData": metadataIdUsedInData,
				"cPresentation": cPresentationChild
			};
			let pVar = dependencies.presentationFactory
				.factor(presentationSpec);
			childViewNew.appendChild(pVar.getView());
			view.addChild(childViewNew);
		};

		const createText = function(presRef) {
			let text = document.createElement("span");
			text.appendChild(document.createTextNode(textProvider.getTranslation(presRef)));
			text.className = "text";
			return text;
		};

		const calculateNewPath = function(metadataIdToAdd) {
			let pathSpec = {
				"metadataProvider": dependencies.metadataProvider,
				"metadataIdToAdd": metadataIdToAdd,
				"parentPath": spec.path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const createAndAddOutput = function() {
			createChildView("linkedRecordType", "linkedRecordTypeOutputPVar");
			createChildView("linkedRecordId", "linkedRecordIdOutputPVar");

			if (hasLinkedRepeatId) {
				createChildView("linkedRepeatId", "linkedRepeatIdOutputPVar");
			}
		};

		const possiblyCreateSearchHandler = function() {
			if (pRecordLinkHasLinkedSearch()) {
				possiblyCreateSearchHandlerForPRecordLinkWithLinkedSearch();
			}
		};

		const pRecordLinkHasLinkedSearch = function() {
			return cPresentation.containsChildWithNameInData("search");
		};

		const possiblyCreateSearchHandlerForPRecordLinkWithLinkedSearch = function() {
			let searchRecord = getSearchFromSearchProvider();
			if (userCanPerformSearch(searchRecord)) {
				createSearchHandler(searchRecord);
			}
		};

		const userCanPerformSearch = function(searchRecord) {
			return searchRecord.actionLinks.search !== undefined;
		};

		const getSearchFromSearchProvider = function() {
			let searchLink = cPresentation.getFirstChildByNameInData("search");
			let searchId = getRecordIdFromLink(searchLink);
			return dependencies.providers.searchProvider.getSearchById(searchId);
		};

		const createSearchHandler = function(searchRecord) {
			let cSearch = CORA.coraData(searchRecord.data);
			let metadataLink = cSearch.getFirstChildByNameInData("metadataId");
			let searchMetadataId = getRecordIdFromLink(metadataLink);
			let presentationLink = cSearch.getFirstChildByNameInData("presentationId");
			let searchPresentationId = getRecordIdFromLink(presentationLink);

			let searchSearchLink = searchRecord.actionLinks.search;

			let searchHandlerSpec = {
				"metadataId": searchMetadataId,
				"presentationId": searchPresentationId,
				"searchLink": searchSearchLink,
				"triggerWhenResultIsChoosen": setResultFromSearch
			};
			let searchHandler = dependencies.globalFactories.searchHandlerFactory
				.factor(searchHandlerSpec);
			view.addSearchHandlerView(searchHandler.getView());
		};

		const getRecordIdFromLink = function(metadataLink) {
			let cMetadataLink = CORA.coraData(metadataLink);
			return cMetadataLink.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const subscribeToSetValueIfLinkedPresentationExists = function() {
			dependencies.pubSub.subscribe("setValue",
				calculateNewPath("linkedRecordTypeTextVar"), undefined,
				valueChangedOnInput);
			dependencies.pubSub.subscribe("setValue",
				calculateNewPath("linkedRecordIdTextVar"), undefined,
				valueChangedOnInput);
		};

		const valueChangedOnInput = function() {
			view.removeLinkedPresentation();
			view.hideOpenLinkedRecordButton();
			view.hideClearLinkedRecordIdButton();
		};

		const getView = function() {
			return view.getView();
		};

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		const openLinkedRecord = function(openInfoFromView) {
			let openInfo = {
				"readLink": readLink,
				"loadInBackground": openInfoFromView.loadInBackground
			};
			dependencies.clientInstanceProvider.getJsClient()
				.openRecordUsingReadLink(openInfo);
		};

		const setResultFromSearch = function(openInfo) {
			let cRecordInfo = getRecordInfoFromOpenInfo(openInfo);
			let recordId = cRecordInfo.getFirstAtomicValueByNameInData("id");
			let recordType = extractRecordTypeFromRecordInfo(cRecordInfo);
			publishNewValueForRecordId(recordId);
			publishNewValueForRecordType(recordType);
			publishNewValueForLinkedData(recordId, recordType, openInfo);
		};

		const getRecordInfoFromOpenInfo = function(openInfo) {
			let cGroup = CORA.coraData(openInfo.record.data);
			return CORA.coraData(cGroup.getFirstChildByNameInData("recordInfo"));
		};

		const extractRecordTypeFromRecordInfo = function(cRecordInfo) {
			let cRecordType = CORA.coraData(cRecordInfo
				.getFirstChildByNameInData("type"));
			return cRecordType.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const publishNewValueForRecordId = function(recordId) {
			let data = {
				"data": recordId,
				"path": recordIdPath
			};
			dependencies.pubSub.publish("setValue", data);
		};

		const publishNewValueForRecordType = function(recordType) {
			let data = {
				"data": recordType,
				"path": recordTypePath
			};
			dependencies.pubSub.publish("setValue", data);
		};

		const publishNewValueForLinkedData = function(recordId, recordType, openInfo) {
			let linkedData = {
				"children": [{
					"name": "linkedRecordType",
					"value": recordType
				}, {
					"name": "linkedRecordId",
					"value": recordId
				}],
				"actionLinks": {
					"read": openInfo.record.actionLinks.read
				},
				"name": nameInData
			};
			let message = {
				"data": linkedData,
				"path": spec.path
			};
			dependencies.pubSub.publish("linkedData", message);
		};

		const clearLinkedRecordId = function() {
			publishNewValueForRecordId("");
			showIdPresentations();
		};

		const showIdPresentations = function() {
			view.showChildren();
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		out = Object.freeze({
			"type": "pRecordLink",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			handleMsg: handleMsg,
			openLinkedRecord: openLinkedRecord,
			setResultFromSearch: setResultFromSearch,
			valueChangedOnInput: valueChangedOnInput,
			clearLinkedRecordId: clearLinkedRecordId
		});
		start();
		return out;
	};
	return cora;
}(CORA));