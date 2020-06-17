/*
 * Copyright 2016 Uppsala University Library
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

		var out;
		var readLink;
		var openLinkShowing = false;
		var cPresentation = spec.cPresentation;
		var metadataProvider = dependencies.metadataProvider;
		var textProvider = dependencies.textProvider;

		var presentationGroup = cPresentation.getFirstChildByNameInData("presentationOf");
		var cPresentationGroup = CORA.coraData(presentationGroup);
		var metadataId = cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		var cMetadataElement = getMetadataById(metadataId);
		var nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");
		var hasLinkedRepeatId = cMetadataElement.containsChildWithNameInData("linkedPath");

		var recordIdPath = "";
		var recordTypePath = "";

		var cRecordTypeGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData("linkedRecordType"));
		var linkedRecordType = cRecordTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		var view;
		function start() {
			dependencies.pubSub.subscribe("linkedData", spec.path, undefined,handleMsg);
			view = createBaseView();
			createValueView();
			possiblyCreateSearchHandler();
			subscribeToSetValueIfLinkedPresentationExists();
		}

		function createBaseView() {
			var textId = extractTextId("textId");
			var text = textProvider.getTranslation(textId);

			var defTextId = extractTextId("defTextId");
			var defText = textProvider.getTranslation(defTextId);

			var viewSpec = {
				"mode" : "input",
				"info" : {
					"text" : text,
					"defText" : defText,
					"technicalInfo" : [ "textId: " + textId,
							"defTextId: " + defTextId,
							"metadataId: " + metadataId,
							"nameInData: " + nameInData,
							"linkedRecordType: " + linkedRecordType ]
				},
				"pRecordLink" : out
			};
			return dependencies.pRecordLinkViewFactory.factor(viewSpec);
		}

		function extractTextId(textNameInData) {
			var cTextIdGroup = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData(textNameInData));
			return cTextIdGroup
					.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function createValueView() {
			if (isInInputMode()) {
				createAndAddInputs();
			} else {
				createAndAddOutput();
			}
		}

		function isInInputMode() {
			return mode === "input";
		}

		function handleMsg(payloadFromMsg) {
			if (msgContainsDataWithValueForRecordId(payloadFromMsg)) {
				handleMsgWithData(payloadFromMsg);
			}
		}

		function msgContainsDataWithValueForRecordId(payloadFromMsg) {
			if (payloadFromMsg.data === undefined) {
				return false;
			}
			var cData = CORA.coraData(payloadFromMsg.data);
			var linkedRecordId = cData.getFirstAtomicValueByNameInData("linkedRecordId");
			if (linkedRecordId !== "") {
				return true;
			}

			return false;
		}

		function handleMsgWithData(payloadFromMsg) {
			closeSearchIfThereIsOne();
			createLinkedRecordPresentationView(payloadFromMsg);
			showOrHideOpenLinkedRecordButton(payloadFromMsg);
		}

		function closeSearchIfThereIsOne() {
			view.hideSearchHandlerView();
		}

		function createLinkedRecordPresentationView(payloadFromMsg) {
			if (linkedRecordShouldBePresentedCanBeRead(payloadFromMsg)) {
				var data = payloadFromMsg.data;
				readLink = data.actionLinks.read;
				possiblyCreateRecordViewerForLinkedRecord(data);
			}
		}

		function linkedRecordShouldBePresentedCanBeRead(payloadFromMsg) {
			return cPresentation
					.containsChildWithNameInData("linkedRecordPresentations")
					&& messageContainsDataWithActionLinks(payloadFromMsg);
		}

		function messageContainsDataWithActionLinks(payloadFromMsg) {
			return undefined !== payloadFromMsg.data.actionLinks;
		}

		function possiblyCreateRecordViewerForLinkedRecord(data) {
			var linkedRecordPresentation = findPresentationForRecordType(data);
			if (presentationExistsForLinkedRecordType(linkedRecordPresentation)) {
				removeIdPresentations();
				createRecordViewerUsingChosenPresentationForLinkedRecord(linkedRecordPresentation);
			}
		}

		function findPresentationForRecordType(data) {
			var filter = createLinkedRecordTypeFilter(data);

			var linkedRecordPresentations = cPresentation
					.getFirstChildByNameInData("linkedRecordPresentations");
			return linkedRecordPresentations.children.find(filter);
		}

		function createLinkedRecordTypeFilter(data) {
			var cData = CORA.coraData(data);
			var recordTypeId = cData
					.getFirstAtomicValueByNameInData("linkedRecordType");

			return function(child) {
				var cChild = CORA.coraData(child);
				var cPresentedRecordType = CORA.coraData(cChild.getFirstChildByNameInData("presentedRecordType"));
				var filterLinkedRecordType = cPresentedRecordType.getFirstAtomicValueByNameInData("linkedRecordId");
				return filterLinkedRecordType === recordTypeId;
			};
		}

		function presentationExistsForLinkedRecordType(linkedRecordPresentation) {
			return linkedRecordPresentation !== undefined;
		}

		function showOrHideOpenLinkedRecordButton(payloadFromMsg) {
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
		}

		function removeIdPresentations() {
			view.hideChildren();
			if (isInInputMode()) {
				view.showClearLinkedRecordIdButton(clearLinkedRecordId);
			}
		}

		function createRecordViewerUsingChosenPresentationForLinkedRecord(
				linkedRecordPresentation) {
			var linkedPresentationId = extractPresentationIdFromPresentation(linkedRecordPresentation);
			var recordViewerSpec = createRecordViewerSpec(readLink, linkedPresentationId);
			var recordViewer = CORA.recordViewer(recordViewerSpec);
			var recordViewerView = recordViewer.getView();

			view.addLinkedPresentation(recordViewerView);
		}

		function createRecordViewerSpec(readLinkIn, linkedPresentationId) {
			var cLinkedRecordPresentation = getMetadataById(linkedPresentationId);

			var presentationOfLink = cLinkedRecordPresentation
					.getFirstChildByNameInData("presentationOf");
			var cPresentationOfLink = CORA.coraData(presentationOfLink);
			var linkedMetadataId = cPresentationOfLink.getFirstAtomicValueByNameInData("linkedRecordId");
			return {
				"read" : readLinkIn,
				"presentationId" : linkedPresentationId,
				"metadataId" : linkedMetadataId,
				"recordGuiFactory" : dependencies.recordGuiFactory,
				"ajaxCallFactory" : dependencies.ajaxCallFactory,
				recordPartPermissionCalculatorFactory : spec.recordPartPermissionCalculatorFactory
			};
		}

		function extractPresentationIdFromPresentation(presentation) {
			var cChildPresentation = CORA.coraData(presentation);
			var cLinkedPresentationAsGroup = CORA.coraData(cChildPresentation
					.getFirstChildByNameInData("presentation"));
			return cLinkedPresentationAsGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function createAndAddInputs() {
			createInputForLinkedRecordType();
			createInputForLinkedRecordId();

			if (hasLinkedRepeatId) {
				createChildView("linkedRepeatId", "linkedRepeatIdPVar");
			}
		}

		function createInputForLinkedRecordType(){
			var recordTypePVarId = "linkedRecordTypePVar";
			var recordTypeDefinition = dependencies.recordTypeProvider.getMetadataByRecordTypeId(linkedRecordType);
			if(linkedRecordTypeIsImplementing(recordTypeDefinition)){
				recordTypePVarId = "linkedRecordTypeOutputPVar";
			}
			recordTypePath = calculateNewPath("linkedRecordTypeTextVar");
			createChildView("linkedRecordType", recordTypePVarId);
		}

		function linkedRecordTypeIsImplementing(recordTypeDefinition){
			return recordTypeDefinition.abstract === "false";
		}

		function createInputForLinkedRecordId(){
			var recordIdPVarId = "linkedRecordIdPVar";
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				recordIdPVarId = "linkedRecordIdOutputPVar";
			}
			recordIdPath = calculateNewPath("linkedRecordIdTextVar");
			createChildView("linkedRecordId", recordIdPVarId);
		}

		function createChildView(id, presentationIdToFactor) {
			var metadataIdUsedInData = id + "TextVar";
			var childViewNew = document.createElement("span");
			childViewNew.className = id + "View";
			childViewNew.appendChild(createText(id + "Text"));

			var childParentPath = calculateNewPath(id + "TextVar");
			var cPresentationChild = CORA.coraData(metadataProvider
					.getMetadataById(presentationIdToFactor));
			var presentationSpec = {
				"path" : childParentPath,
				"metadataIdUsedInData" : metadataIdUsedInData,
				"cPresentation" : cPresentationChild
			};
			var pVar = dependencies.presentationFactory
					.factor(presentationSpec);
			childViewNew.appendChild(pVar.getView());
			view.addChild(childViewNew);
		}

		function createText(presRef) {
			var text = document.createElement("span");
			text.appendChild(document.createTextNode(textProvider.getTranslation(presRef)));
			text.className = "text";
			return text;
		}

		function calculateNewPath(metadataIdToAdd) {
			var pathSpec = {
				"metadataProvider" : dependencies.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"parentPath" : spec.path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		}

		function createAndAddOutput() {
			createChildView("linkedRecordType", "linkedRecordTypeOutputPVar");
			createChildView("linkedRecordId", "linkedRecordIdOutputPVar");

			if (hasLinkedRepeatId) {
				createChildView("linkedRepeatId", "linkedRepeatIdOutputPVar");
			}
		}

		function possiblyCreateSearchHandler() {
			if (pRecordLinkHasLinkedSearch()) {
				possiblyCreateSearchHandlerForPRecordLinkWithLinkedSearch();
			}
		}

		function pRecordLinkHasLinkedSearch() {
			return cPresentation.containsChildWithNameInData("search");
		}

		function possiblyCreateSearchHandlerForPRecordLinkWithLinkedSearch() {
			var searchRecord = getSearchFromSearchProvider();
			if (userCanPerformSearch(searchRecord)) {
				createSearchHandler(searchRecord);
			}
		}

		function userCanPerformSearch(searchRecord) {
			return searchRecord.actionLinks.search !== undefined;
		}

		function getSearchFromSearchProvider() {
			var searchLink = cPresentation.getFirstChildByNameInData("search");
			var searchId = getRecordIdFromLink(searchLink);
			return dependencies.providers.searchProvider.getSearchById(searchId);
		}

		function createSearchHandler(searchRecord) {
			var cSearch = CORA.coraData(searchRecord.data);
			var metadataLink = cSearch.getFirstChildByNameInData("metadataId");
			var searchMetadataId = getRecordIdFromLink(metadataLink);
			var presentationLink = cSearch.getFirstChildByNameInData("presentationId");
			var searchPresentationId = getRecordIdFromLink(presentationLink);

			var searchSearchLink = searchRecord.actionLinks.search;

			var searchHandlerSpec = {
				"metadataId" : searchMetadataId,
				"presentationId" : searchPresentationId,
				"searchLink" : searchSearchLink,
				"triggerWhenResultIsChoosen" : setResultFromSearch
			};
			var searchHandler = dependencies.globalFactories.searchHandlerFactory
					.factor(searchHandlerSpec);
			view.addSearchHandlerView(searchHandler.getView());
		}

		function getRecordIdFromLink(metadataLink) {
			var cMetadataLink = CORA.coraData(metadataLink);
			return cMetadataLink.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function subscribeToSetValueIfLinkedPresentationExists() {
			dependencies.pubSub.subscribe("setValue",
					calculateNewPath("linkedRecordTypeTextVar"), undefined,
					valueChangedOnInput);
			dependencies.pubSub.subscribe("setValue",
					calculateNewPath("linkedRecordIdTextVar"), undefined,
					valueChangedOnInput);
		}

		function valueChangedOnInput() {
			view.removeLinkedPresentation();
			view.hideOpenLinkedRecordButton();
			view.hideClearLinkedRecordIdButton();
		}

		function getView() {
			return view.getView();
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function openLinkedRecord(openInfoFromView) {
			var openInfo = {
				"readLink" : readLink,
				"loadInBackground" : openInfoFromView.loadInBackground
			};
			dependencies.clientInstanceProvider.getJsClient()
					.openRecordUsingReadLink(openInfo);
		}

		function setResultFromSearch(openInfo) {
			var cRecordInfo = getRecordInfoFromOpenInfo(openInfo);
			var recordId = cRecordInfo.getFirstAtomicValueByNameInData("id");
			var recordType = extractRecordTypeFromRecordInfo(cRecordInfo);
			publishNewValueForRecordId(recordId);
			publishNewValueForRecordType(recordType);
			publishNewValueForLinkedData(recordId, recordType, openInfo);
		}

		function getRecordInfoFromOpenInfo(openInfo)  {
			var cGroup = CORA.coraData(openInfo.record.data);
			return CORA.coraData(cGroup.getFirstChildByNameInData("recordInfo"));
		}

		function extractRecordTypeFromRecordInfo(cRecordInfo){
			var cRecordType = CORA.coraData(cRecordInfo
				.getFirstChildByNameInData("type"));
			return cRecordType.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function publishNewValueForRecordId(recordId) {
			var data = {
				"data" : recordId,
				"path" : recordIdPath
			};
			dependencies.pubSub.publish("setValue", data);
		}

		function publishNewValueForRecordType(recordType) {
			var data = {
				"data" : recordType,
				"path" : recordTypePath
			};
			dependencies.pubSub.publish("setValue", data);
		}

		function publishNewValueForLinkedData(recordId, recordType, openInfo) {
			var linkedData = {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : recordType
				}, {
					"name" : "linkedRecordId",
					"value" : recordId
				} ],
				"actionLinks" : {
					"read" : openInfo.record.actionLinks.read
				},
				"name" : nameInData
			};
			var message = {
				"data" : linkedData,
				"path" : spec.path
			};
			dependencies.pubSub.publish("linkedData", message);
		}

		function clearLinkedRecordId() {
			publishNewValueForRecordId("");
			showIdPresentations();
		}

		function showIdPresentations() {
			view.showChildren();
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}

		out = Object.freeze({
			"type" : "pRecordLink",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			handleMsg : handleMsg,
			openLinkedRecord : openLinkedRecord,
			setResultFromSearch : setResultFromSearch,
			valueChangedOnInput : valueChangedOnInput,
			clearLinkedRecordId : clearLinkedRecordId
		});
		start();
		return out;
	};
	return cora;
}(CORA));