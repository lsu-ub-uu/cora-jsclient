/*
 * Copyright 2016, 2020, 2025 Uppsala University Library
 * Copyright 2017, 2023, 2024 Olov McKie
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
		const providers = dependencies.providers;
		const metadataProvider = dependencies.metadataProvider;
		const textProvider = dependencies.textProvider;
		const clientInstanceProvider = dependencies.clientInstanceProvider;

		const globalFactories = dependencies.globalFactories;
		const pRecordLinkViewFactory = dependencies.pRecordLinkViewFactory;
		const recordGuiFactory = dependencies.recordGuiFactory;
		const ajaxCallFactory = dependencies.ajaxCallFactory;
		const presentationFactory = dependencies.presentationFactory;
		const pAttributesFactory = dependencies.pAttributesFactory;

		const pubSub = dependencies.pubSub;

		const path = spec.path;
		const presentationCounter = spec.presentationCounter;

		let out;
		let readLink;
		let openLinkShowing = false;
		let cPresentation = spec.cPresentation;

		let presentationGroup = cPresentation.getFirstChildByNameInData("presentationOf");
		let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		let presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		let cPresentationGroup = CORA.coraData(presentationGroup);
		let metadataId = cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		let cMetadataElement = getMetadataById(metadataId);
		let nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
		let mode = cPresentation.getFirstAtomicValueByNameInData("mode");
		let attributesToShow;
		let hasLinkedRepeatId = cMetadataElement.containsChildWithNameInData("linkedPath");
		let presentAs;

		let recordIdPath = "";
		let recordTypePath = "";

		let cRecordTypeGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData("linkedRecordType"));
		let linkedRecordType = cRecordTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		let view;
		let text;

		const start = function() {
			pubSub.subscribe("linkedData", path, undefined, handleMsg);
			attributesToShow = getValueFromPresentationOrDefaultTo("attributesToShow", "all");
			presentAs = getValueFromPresentationOrDefaultTo("presentAs", "link");
			view = createBaseView();
			if (!presentAsOnlyTranslatedText()) {
				createValueView();
			}
			possiblyCreateSearchHandler();
			subscribeToSetValueIfLinkedPresentationExists();
			subscribeToTextVarSetValue();
			if (mode === "output") {
				view.hide();
			}
			initPAttributes();
		};

		const getValueFromPresentationOrDefaultTo = function(nameInData, defaultValue) {
			if (cPresentation.containsChildWithNameInData(nameInData)) {
				return cPresentation.getFirstAtomicValueByNameInData(nameInData);
			}
			return defaultValue;
		};

		const createBaseView = function() {
			let textId = extractTextId("textId");
			text = textProvider.getTranslation(textId);

			let defTextId = extractTextId("defTextId");
			let defText = textProvider.getTranslation(defTextId);

			let viewSpec = {
				mode: "input",
				info: {
					text: text,
					defText: defText,
					technicalInfo: [{
						text: `textId: ${textId}`,
						onclickMethod: openTextIdRecord
					}, {
						text: `defTextId: ${defTextId}`,
						onclickMethod: openDefTextIdRecord
					}, {
						text: `metadataId: ${metadataId}`,
						onclickMethod: openMetadataIdRecord
					}, {
						text: `nameInData: ${nameInData}`,
					}, {
						text: `linkedRecordType: ${linkedRecordType}`,
					}, {
						text: `presentationId: ${presentationId}`,
						onclickMethod: openPresentationIdRecord
					}
					]
				},
				presentAs: presentAs,
				pRecordLink: out
			};
			possiblyAddLabelToViewSpec(viewSpec);
			return pRecordLinkViewFactory.factor(viewSpec);
		};

		const extractTextId = function(textNameInData) {
			let cTextIdGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData(textNameInData));
			return cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const possiblyAddLabelToViewSpec = function(viewSpec) {
			if (labelShouldBeShown()) {
				addLabelToViewSpec(viewSpec);
			}
		};

		const labelShouldBeShown = function() {
			if (!cPresentation.containsChildWithNameInData("showLabel")) {
				return true;
			}
			return (cPresentation.getFirstAtomicValueByNameInData("showLabel") !== "false");
		};

		const addLabelToViewSpec = function(viewSpec) {
			if (cPresentation.containsChildWithNameInData("specifiedLabelText")) {
				let specifiedLabelTextId = cPresentation.getLinkedRecordIdFromFirstChildLinkWithNameInData("specifiedLabelText");
				let specifiedLabelText = textProvider.getTranslation(specifiedLabelTextId);
				viewSpec.label = specifiedLabelText;
			} else {
				viewSpec.label = text;
			}
		};

		const presentAsOnlyTranslatedText = function() {
			return "onlyTranslatedText" == presentAs;
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

			return linkedRecordId !== "";
		};

		const handleMsgWithData = function(payloadFromMsg) {
			closeSearchIfThereIsOne();
			if (presentAsOnlyTranslatedText()) {
				let cData = CORA.coraData(payloadFromMsg.data);
				let linkedRecordId = cData.getFirstAtomicValueByNameInData("linkedRecordId");
				addTranslatedTextNodeToView(linkedRecordId);
			} else {
				createLinkedRecordPresentationView(payloadFromMsg);
				showOrHideOpenLinkedRecordButton(payloadFromMsg);
			}
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

			return function(child) {
				let cChild = CORA.coraData(child);
				let cPresentedRecordType = CORA.coraData(cChild.getFirstChildByNameInData("presentedRecordType"));
				return isSameRecordType(recordTypeIdInData, cPresentedRecordType);
			};
		};

		const presentationExistsForLinkedRecordType = function(linkedRecordPresentation) {
			return linkedRecordPresentation !== undefined;
		};

		const isSameRecordType = function(recordTypeIdInData, cPresentedRecordType) {
			let recordTypeIdInLink = cPresentedRecordType.getFirstAtomicValueByNameInData("linkedRecordId");
			let sameRecordType = recordTypeIdInLink === recordTypeIdInData;
			return sameRecordType;
		}

		const showOrHideOpenLinkedRecordButton = function(payloadFromMsg) {
			if (messageContainsDataWithActionLinks(payloadFromMsg)) {
				readLink = payloadFromMsg.data.actionLinks.read;
				view.showOpenLinkedRecordButton();
				openLinkShowing = true;
			} else if (openLinkShowing) {
				view.hideOpenLinkedRecordButton();
				openLinkShowing = false;
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
				read: readLinkIn,
				presentationId: linkedPresentationId,
				metadataId: linkedMetadataId,
				recordGuiFactory: recordGuiFactory,
				ajaxCallFactory: ajaxCallFactory,
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
			let recordTypePVarId = "linkedRecordTypeOutputPVar";
			recordTypePath = calculateNewPath("linkedRecordTypeTextVar");
			createChildView("linkedRecordType", recordTypePVarId);
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

			let childParentPath = calculateNewPath(id + "TextVar");
			let cPresentationChild = CORA.coraData(metadataProvider
				.getMetadataById(presentationIdToFactor));
			let presentationSpec = {
				path: childParentPath,
				metadataIdUsedInData: metadataIdUsedInData,
				cPresentation: cPresentationChild
			};
			let pVar = presentationFactory.factor(presentationSpec);
			childViewNew.appendChild(pVar.getView());
			view.addChild(childViewNew);
		};

		const calculateNewPath = function(metadataIdToAdd) {
			let pathSpec = {
				"metadataIdToAdd": metadataIdToAdd,
				"parentPath": path
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
				createSearchHandlerForPRecordLinkWithLinkedSearch();
			}
		};

		const pRecordLinkHasLinkedSearch = function() {
			return cPresentation.containsChildWithNameInData("search");
		};

		const createSearchHandlerForPRecordLinkWithLinkedSearch = function() {
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
			return providers.searchProvider.getSearchById(searchId);
		};

		const createSearchHandler = function(searchRecord) {
			let cSearch = CORA.coraData(searchRecord.data);
			let searchSearchLink = searchRecord.actionLinks.search;

			let searchHandlerSpec = {
				metadataId: getLinkValueFromSearchRecord(cSearch, "metadataId"),
				presentationId: getLinkValueFromSearchRecord(cSearch, "presentationId"),
				searchResultPresentationId: getLinkValueFromSearchRecord(cSearch, "searchResultPresentation"),
				searchLink: searchSearchLink,
				triggerWhenResultIsChoosen: setResultFromSearch
			};

			let searchHandler = globalFactories.searchHandlerFactory
				.factor(searchHandlerSpec);
			view.addSearchHandlerView(searchHandler.getView());
		};

		const getLinkValueFromSearchRecord = function(cSearchRecordData, id) {
			if (!cSearchRecordData.containsChildWithNameInData(id)) {
				return undefined;
			}
			let cRecordLink = CORA.coraData(cSearchRecordData.getFirstChildByNameInData(id));
			return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const getRecordIdFromLink = function(metadataLink) {
			let cMetadataLink = CORA.coraData(metadataLink);
			return cMetadataLink.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const subscribeToSetValueIfLinkedPresentationExists = function() {
			pubSub.subscribe("setValue",
				calculateNewPath("linkedRecordTypeTextVar"), undefined,
				valueChangedOnInput);
			pubSub.subscribe("setValue",
				calculateNewPath("linkedRecordIdTextVar"), undefined,
				valueChangedOnInput);
		};

		const valueChangedOnInput = function(dataFromMsg) {
			view.removeLinkedPresentation();
			view.hideOpenLinkedRecordButton();
			view.hideClearLinkedRecordIdButton();
			if (presentAsOnlyTranslatedText()) {
				addTranslatedTextNodeToView(dataFromMsg.data);
			}
		};

		const addTranslatedTextNodeToView = function(textId) {
			let translatedText = textProvider.getTranslation(textId);
			let textNodeWithTranslatedText = document.createTextNode(translatedText);
			view.addLinkedPresentation(textNodeWithTranslatedText);
		};

		const subscribeToTextVarSetValue = function() {
			pubSub.subscribe("setValue",
				calculateNewPath("linkedRecordIdTextVar"), undefined,
				hideOrShowOutputPresentation);
		};

		const hideOrShowOutputPresentation = function(dataFromMsg) {
			let valueForView = dataFromMsg.data;
			if (mode === "output") {
				if (valueForView !== "") {
					view.show();
				} else {
					view.hide();
				}
			}
		};

		const initPAttributes = function() {
			let pAttributesSpec = {
				addViewToParent: view.addAttributesView,
				path: path,
				mode: mode,
				toShow: attributesToShow
			};
			pAttributesFactory.factor(pAttributesSpec);
		};

		const getView = function() {
			return view.getView();
		};

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		const openLinkedRecord = function(openInfoFromView) {
			let openInfo = {
				readLink: readLink,
				loadInBackground: openInfoFromView.loadInBackground
			};
			clientInstanceProvider.getJsClient()
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
				path: recordIdPath,
				dataOrigin: "user",
				data: recordId
			};
			pubSub.publish("setValue", data);
		};

		const publishNewValueForRecordType = function(recordType) {
			let data = {
				path: recordTypePath,
				dataOrigin: "user",
				data: recordType
			};
			pubSub.publish("setValue", data);
		};

		const publishNewValueForLinkedData = function(recordId, recordType, openInfo) {
			let linkedData = {
				children: [{
					name: "linkedRecordType",
					value: recordType
				}, {
					name: "linkedRecordId",
					value: recordId
				}],
				actionLinks: {
					read: openInfo.record.actionLinks.read
				},
				name: nameInData
			};
			let message = {
				data: linkedData,
				path: path
			};
			pubSub.publish("linkedData", message);
		};

		const clearLinkedRecordId = function() {
			publishNewValueForRecordId("");
			showIdPresentations();
		};

		const showIdPresentations = function() {
			view.showChildren();
		};

		const openLinkedRecordForLink = function(event, link) {
			let loadInBackground = "false";
			if (event.ctrlKey) {
				loadInBackground = "true";
			}
			let openInfo = {
				"readLink": link,
				"loadInBackground": loadInBackground
			};
			clientInstanceProvider.getJsClient().openRecordUsingReadLink(openInfo);
		};

		const openTextIdRecord = function(event) {
			openLinkedRecordForLink(event,
				cMetadataElement.getFirstChildByNameInData("textId").actionLinks.read);
		};

		const openDefTextIdRecord = function(event) {
			openLinkedRecordForLink(event,
				cMetadataElement.getFirstChildByNameInData("defTextId").actionLinks.read);
		};

		const openMetadataIdRecord = function(event) {
			openLinkedRecordForLink(event, cPresentation
				.getFirstChildByNameInData("presentationOf").actionLinks.read);
		};

		const openPresentationIdRecord = function(event) {
			let presentationRecord = metadataProvider.getMetadataRecordById(presentationId);
			openLinkedRecordForLink(event, presentationRecord.actionLinks.read);
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const getPresentationCounter = function() {
			return presentationCounter;
		};

		out = Object.freeze({
			type: "pRecordLink",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			handleMsg: handleMsg,
			openLinkedRecord: openLinkedRecord,
			setResultFromSearch: setResultFromSearch,
			valueChangedOnInput: valueChangedOnInput,
			clearLinkedRecordId: clearLinkedRecordId,
			openTextIdRecord: openTextIdRecord,
			openDefTextIdRecord: openDefTextIdRecord,
			openMetadataIdRecord: openMetadataIdRecord,
			openPresentationIdRecord: openPresentationIdRecord,
			hideOrShowOutputPresentation: hideOrShowOutputPresentation,
			getPresentationCounter: getPresentationCounter
		});
		start();
		return out;
	};
	return cora;
}(CORA));