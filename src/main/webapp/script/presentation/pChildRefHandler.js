/*
 * Copyright 2016, 2017, 2018 Uppsala University Library
 * Copyright 2016, 2017, 2018 Olov McKie
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
	cora.pChildRefHandler = function(dependencies, spec) {
		var out;
		var userCanUploadFile = false;
		var userCanRemove = false;
		var userCanMove = false;
		var userCanAddBefore = false;

		var metadataHelper = CORA.metadataHelper({
			"metadataProvider" : dependencies.metadataProvider
		});
		var presentationId = findPresentationId(spec.cPresentation);
		var metadataIdFromPresentation = getMetadataIdFromPresentation();
		var cParentMetadataChildRefPart = metadataHelper.getChildRefPartOfMetadata(
				spec.cParentMetadata, metadataIdFromPresentation);
		if (childRefFoundInCurrentlyUsedParentMetadata()) {
			return createFakePChildRefHandlerAsWeDoNotHaveMetadataToWorkWith();
		}
		var cRef = CORA.coraData(cParentMetadataChildRefPart.getFirstChildByNameInData("ref"));
		var metadataId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		var cMetadataElement = getMetadataById(metadataId);

		var text = getTextForAddButton(cMetadataElement);
		
		var repeatMin = cParentMetadataChildRefPart.getFirstAtomicValueByNameInData("repeatMin");
		var repeatMax = cParentMetadataChildRefPart.getFirstAtomicValueByNameInData("repeatMax");

		var isRepeating = calculateIsRepeating();
		var isStaticNoOfChildren = calculateIsStaticNoOfChildren();
		var isZeroToOne = calculateIsZeroToOne();

		var noOfRepeating = 0;
		var metadataHasAttributes = hasAttributes();
		var collectedAttributes = collectAttributesForMetadataId(metadataId);

		var pChildRefHandlerView = createPChildRefHandlerView();

		var numberOfFilesToUpload = 0;
		var numberOfRecordsForFilesCreated = 0;
		var newElementsAddedSubscriptionId = "";

		function start() {
			subscribeToMessagesFromForm();
			userCanUploadFile = showFileUpload();
			userCanRemove = calculateUserCanRemove();
			userCanMove = calculateUserCanMove();
			userCanAddBefore = calculateUserCanAddBefore();
		}

		function subscribeToMessagesFromForm() {
			dependencies.pubSub.subscribe("add", spec.parentPath, undefined, handleMsg);
			dependencies.pubSub.subscribe("move", spec.parentPath, undefined, handleMsg);
			if (spec.minNumberOfRepeatingToShow !== undefined) {
				newElementsAddedSubscriptionId = dependencies.pubSub.subscribe("newElementsAdded",
						{}, undefined, newElementsAdded);
			}
			dependencies.pubSub.subscribe("addUpToMinNumberOfRepeating", {}, undefined,
					newElementsAdded);
		}

		function calculateUserCanRemove() {
			if (spec.mode !== "input") {
				return false;
			}
			if (isStaticNoOfChildren) {
				return false;
			}
			return true;
		}

		function calculateUserCanMove() {
			if (spec.mode !== "input") {
				return false;
			}
			if (!isRepeating) {
				return false;
			}
			return true;
		}

		function calculateUserCanAddBefore() {
			if (spec.mode !== "input") {
				return false;
			}
			if (isStaticNoOfChildren) {
				return false;
			}
			if (isZeroToOne) {
				return false;
			}
			if (userCanUploadFile) {
				return false;
			}
			return true;
		}

		function childRefFoundInCurrentlyUsedParentMetadata() {
			return cParentMetadataChildRefPart.getData() === undefined;
		}

		function createFakePChildRefHandlerAsWeDoNotHaveMetadataToWorkWith() {
			return {
				getView : function() {
					var spanNew = document.createElement("span");
					spanNew.className = "fakePChildRefHandlerViewAsNoMetadataExistsFor "
							+ metadataIdFromPresentation;
					return spanNew;
				}
			};
		}

		function getTextId(cMetadataElementIn) {
			var cTextGroup = CORA.coraData(cMetadataElementIn.getFirstChildByNameInData("textId"));
			return cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function findPresentationId(cPresentationToSearch) {
			var recordInfo = cPresentationToSearch.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function getMetadataIdFromPresentation() {
			var presentationGroup = spec.cPresentation.getFirstChildByNameInData("presentationOf");
			var cPresentationGroup = CORA.coraData(presentationGroup);
			return cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		}

		function getMetadataById(id) {
			return CORA.coraData(dependencies.metadataProvider.getMetadataById(id));
		}
		
		function getTextForAddButton(cMetadataElement){
			var textId = spec.addText != undefined ? spec.addText : getTextId(cMetadataElement); 
			return dependencies.textProvider.getTranslation(textId);
		}

		function collectAttributesForMetadataId(metadataIdIn) {
			return metadataHelper.collectAttributesAsObjectForMetadataId(metadataIdIn);
		}

		function createPChildRefHandlerView() {
			var pChildRefHandlerViewSpec = {
				"presentationId" : presentationId,
				"isRepeating" : isRepeating,
				"addText" : "+ " + text,
				"mode" : spec.mode
			};
			if (spec.textStyle !== undefined) {
				pChildRefHandlerViewSpec.textStyle = spec.textStyle;
			}
			if (spec.childStyle !== undefined) {
				pChildRefHandlerViewSpec.childStyle = spec.childStyle;
			}
			if (showFileUpload()) {
				pChildRefHandlerViewSpec.upload = "true";
				pChildRefHandlerViewSpec.handleFilesMethod = handleFiles;
			} else if (showAddButton()) {
				pChildRefHandlerViewSpec.addMethod = sendAdd;
			}
			return dependencies.pChildRefHandlerViewFactory.factor(pChildRefHandlerViewSpec);
		}

		function hasAttributes() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		}

		function calculateIsRepeating() {
			return repeatMax > 1 || repeatMax === "X";
		}

		function calculateIsStaticNoOfChildren() {
			return repeatMax === repeatMin;
		}

		function showAddButton() {
			return (isRepeating && !isStaticNoOfChildren) || calculateIsZeroToOne();
		}

		function calculateIsZeroToOne() {
			return repeatMin === "0" && repeatMax === "1";
		}

		function showFileUpload() {
			if (currentChildRefIsRecordLink() && currentChildRefHasLinkedRecordType()) {
				return calculateIfBinaryOrChildOfBinary();
			}
			return false;
		}

		function currentChildRefIsRecordLink() {
			return currentChildRefHasAttributes() && isOfTypeRecordLink();
		}

		function currentChildRefHasAttributes() {
			return cMetadataElement.getData().attributes !== undefined;
		}

		function isOfTypeRecordLink() {
			var attributes = cMetadataElement.getData().attributes;
			return attributes.type !== undefined && attributes.type === "recordLink";
		}

		function currentChildRefHasLinkedRecordType() {
			return cMetadataElement.containsChildWithNameInData("linkedRecordType");
		}

		function calculateIfBinaryOrChildOfBinary() {
			var cRecordType = getLinkedRecordType();
			var cRecordInfo = CORA.coraData(cRecordType.getFirstChildByNameInData("recordInfo"));
			return isBinaryOrChildOfBinary(cRecordInfo, cRecordType);
		}

		function getLinkedRecordType() {
			var cRecordTypeGroup = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData("linkedRecordType"));
			var recordTypeId = cRecordTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			var cRecordType = getRecordTypeById(recordTypeId);
			return cRecordType;
		}

		function getRecordTypeById(id) {
			return CORA.coraData(dependencies.recordTypeProvider.getRecordTypeById(id).data);
		}

		function isBinaryOrChildOfBinary(cRecordInfo, cRecordType) {
			return isBinary(cRecordInfo) || isChildOfBinary(cRecordType);
		}

		function isBinary(cRecordInfo) {
			return cRecordInfo.getFirstAtomicValueByNameInData("id") === "binary";
		}

		function isChildOfBinary(cRecordType) {
			return hasParent(cRecordType) && parentIsBinary(cRecordType);
		}

		function hasParent(cRecordType) {
			return cRecordType.containsChildWithNameInData("parentId");
		}

		function parentIsBinary(cRecordType) {
			var cParentIdGroup = CORA.coraData(cRecordType.getFirstChildByNameInData("parentId"));
			var parentId = cParentIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			return parentId === "binary";
		}

		function getView() {
			return pChildRefHandlerView.getView();
		}

		function handleMsg(dataFromMsg, msg) {
			if (messageIsHandledByThisPChildRefHandler(dataFromMsg)) {
				processMsg(dataFromMsg, msg);
			}
		}

		function messageIsHandledByThisPChildRefHandler(dataFromMsg) {
			if (metadataIdSameAsInMessage(dataFromMsg)) {
				return true;
			}
			return shouldPresentData(dataFromMsg.nameInData, dataFromMsg.attributes);
		}

		function metadataIdSameAsInMessage(dataFromMsg) {
			return metadataId === dataFromMsg.metadataId;
		}

		function shouldPresentData(nameInDataFromMsg, attributesFromMsg) {
			if (nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg)) {
				return false;
			}
			return metadataHelper.firstAttributesExistsInSecond(attributesFromMsg,
					collectedAttributes);
		}

		function nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg) {
			return nameInDataFromMsg !== cMetadataElement
					.getFirstAtomicValueByNameInData("nameInData");
		}

		function processMsg(dataFromMsg, msg) {
			if (msg.endsWith("move")) {
				move(dataFromMsg);
			} else {
				add(dataFromMsg.metadataId, dataFromMsg.repeatId);
			}
		}

		function add(metadataIdToAdd, repeatId) {
			noOfRepeating++;
			var newPath = calculateNewPath(metadataIdToAdd, repeatId);
			var repeatingElement = createRepeatingElement(newPath);
			pChildRefHandlerView.addChild(repeatingElement.getView());
			addPresentationsToRepeatingElementsView(repeatingElement, metadataIdToAdd);
			subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView(repeatingElement);
			updateView();
		}

		function calculateNewPath(metadataIdToAdd, repeatId) {
			return calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(metadataIdToAdd,
					repeatId, spec.parentPath);
		}

		function calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(metadataIdToAdd, repeatId,
				parentPath) {
			var pathSpec = {
				"metadataProvider" : dependencies.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"repeatId" : repeatId,
				"parentPath" : parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
		}

		function createRepeatingElement(path) {
			var repeatingElementSpec = {
				"path" : path,
				"pChildRefHandlerView" : pChildRefHandlerView,
				"pChildRefHandler" : out,
				"userCanRemove" : userCanRemove,
				"userCanMove" : userCanMove,
				"userCanAddBefore" : userCanAddBefore
			};
			return dependencies.pRepeatingElementFactory.factor(repeatingElementSpec);
		}

		function addPresentationsToRepeatingElementsView(repeatingElement, metadataIdToAdd) {
			var path = repeatingElement.getPath();

			var presentation = factorPresentation(path, spec.cPresentation, metadataIdToAdd);
			repeatingElement.addPresentation(presentation);

			if (hasMinimizedPresentation()) {
				var presentationMinimized = factorPresentation(path, spec.cAlternativePresentation,
						metadataIdToAdd);
				repeatingElement.addAlternativePresentation(presentationMinimized);
			}
		}

		function factorPresentation(path, cPresentation, metadataIdToAdd) {
			var metadataIdUsedInData = metadataIdToAdd;
			var presentationSpec = {
				"path" : path,
				"metadataIdUsedInData" : metadataIdUsedInData,
				"cPresentation" : cPresentation,
				"cParentPresentation" : spec.cParentPresentation
			};
			return dependencies.presentationFactory.factor(presentationSpec);
		}

		function hasMinimizedPresentation() {
			return spec.cAlternativePresentation !== undefined;
		}

		function subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView(repeatingElement) {
			if (showAddButton()) {
				var removeInfo = {
					"repeatingElement" : repeatingElement
				};
				var removeFunction = function() {
					childRemoved(removeInfo);
				};
				removeInfo.subscribeId = dependencies.pubSub.subscribe("remove", repeatingElement
						.getPath(), undefined, removeFunction);
			}
		}

		function move(dataFromMsg) {
			pChildRefHandlerView.moveChild(dataFromMsg);
		}

		function childRemoved(removeInfo) {
			pChildRefHandlerView.removeChild(removeInfo.repeatingElement.getView());
			dependencies.pubSub.unsubscribe(removeInfo.subscribeId);
			noOfRepeating--;
			updateView();
		}

		function updateView() {
			if (spec.mode === "input") {
				if (showAddButton()) {
					updateButtonViewAndAddBeforeButtonVisibility();
					updateChildrenRemoveButtonVisibility();
				}
				if (isRepeating) {
					updateChildrenDragButtonVisibility();
				}
			}
		}

		function updateChildrenRemoveButtonVisibility() {
			if (minLimitOfChildrenReached()) {
				pChildRefHandlerView.hideChildrensRemoveButton();
			} else {
				pChildRefHandlerView.showChildrensRemoveButton();
			}
		}

		function minLimitOfChildrenReached() {
			return noOfRepeating === Number(repeatMin);
		}

		function updateChildrenDragButtonVisibility() {
			if (moreThenOneChild()) {
				pChildRefHandlerView.showChildrensDragButton();
			} else {
				pChildRefHandlerView.hideChildrensDragButton();
			}
		}
		function moreThenOneChild() {
			return noOfRepeating > 1;
		}

		function updateButtonViewAndAddBeforeButtonVisibility() {
			if (maxLimitOfChildrenReached()) {
				pChildRefHandlerView.hideButtonView();
				if (userCanAddBefore) {
					pChildRefHandlerView.hideChildrensAddBeforeButton();
				}
			} else {
				pChildRefHandlerView.showButtonView();
				if (userCanAddBefore) {
					pChildRefHandlerView.showChildrensAddBeforeButton();
				}
			}
		}

		function maxLimitOfChildrenReached() {
			return noOfRepeating === Number(repeatMax);
		}

		function sendAdd() {
			var data = createAddData();
			var createdRepeatId = dependencies.jsBookkeeper.add(data);
			sendNewElementsAdded();
			return createdRepeatId;
		}
		function createAddData() {
			var data = {
				"metadataId" : metadataId,
				"path" : spec.parentPath,
				"childReference" : cParentMetadataChildRefPart.getData(),
				"nameInData" : cMetadataElement.getFirstAtomicValueByNameInData("nameInData")
			};
			if (metadataHasAttributes) {
				data.attributes = collectedAttributes;
			}
			return data;
		}

		function sendNewElementsAdded() {
			dependencies.pubSub.publish("newElementsAdded", {
				"data" : "",
				"path" : {}
			});
		}

		function sendAddBefore(dataFromPRepeatingElement) {
			var data = createAddData();
			data.addBeforePath = dataFromPRepeatingElement.path;
			dependencies.jsBookkeeper.addBefore(data);
			sendNewElementsAdded();
		}

		function childMoved(moveInfo) {
			var data = {
				"path" : spec.parentPath,
				"metadataId" : metadataId,
				"moveChild" : moveInfo.moveChild,
				"basePositionOnChild" : moveInfo.basePositionOnChild,
				"newPosition" : moveInfo.newPosition
			};
			dependencies.jsBookkeeper.move(data);
		}

		function handleFiles(files) {
			numberOfFilesToUpload = files.length;
			changeNumberOfFilesIfMaxNumberExceeded(numberOfFilesToUpload);
			for (var i = 0; i < numberOfFilesToUpload; i++) {
				handleFile(files[i]);
			}
		}

		function changeNumberOfFilesIfMaxNumberExceeded(numberOfChosenFiles) {
			if (repeatMaxIsNumber()) {
				calculateNumOfFilesLeftToUploadAndPossiblyChangeNumToUpload(numberOfChosenFiles);
			}
		}

		function repeatMaxIsNumber() {
			return !isNaN(repeatMax);
		}

		function calculateNumOfFilesLeftToUploadAndPossiblyChangeNumToUpload(numberOfChosenFiles) {
			var numOfFilesLeftToUpLoad = Number(repeatMax) - noOfRepeating;
			if (numOfFilesLeftToUpLoad < numberOfChosenFiles) {
				numberOfFilesToUpload = numOfFilesLeftToUpLoad;
			}
		}

		function handleFile(file) {
			var data = createNewBinaryData();
			var createLink = getLinkedRecordTypeCreateLink();
			var localFile = file;
			var callSpec = {
				"requestMethod" : createLink.requestMethod,
				"url" : createLink.url,
				"contentType" : createLink.contentType,
				"accept" : createLink.accept,
				"loadMethod" : processNewBinary,
				"errorMethod" : callError,
				"data" : JSON.stringify(data),
				"file" : localFile
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function createNewBinaryData() {
			var dataDividerLinkedRecordId = dependencies.dataDivider;
			var type = getTypeFromRecordType();
			return {
				"name" : "binary",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : dataDividerLinkedRecordId
						} ]
					} ]
				} ],
				"attributes" : {
					"type" : type
				}
			};
		}

		function getNewMetadataGroupFromRecordType() {
			var recordType = getImplementingLinkedRecordType();
			var cData = CORA.coraData(recordType.data);
			var newMetadataIdGroup = CORA
					.coraData(cData.getFirstChildByNameInData("newMetadataId"));
			var newMetadataId = newMetadataIdGroup
					.getFirstAtomicValueByNameInData("linkedRecordId");
			return getMetadataById(newMetadataId);
		}

		function getImplementingLinkedRecordType() {
			var cRecordTypeGroup = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData("linkedRecordType"));
			var recordTypeId = cRecordTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");

			recordTypeId = changeRecordTypeIdIfBinary(recordTypeId);
			return dependencies.recordTypeProvider.getRecordTypeById(recordTypeId);
		}

		function getLinkedRecordTypeCreateLink() {
			var recordType = getImplementingLinkedRecordType();
			return recordType.actionLinks.create;
		}

		function changeRecordTypeIdIfBinary(recordTypeId) {
			if (recordTypeId === "binary") {
				recordTypeId = "genericBinary";
			}
			return recordTypeId;
		}

		function getTypeFromRecordType() {
			var cMetadataGroup = getNewMetadataGroupFromRecordType();
			var attributeReferences = cMetadataGroup
					.getFirstChildByNameInData("attributeReferences");
			var ref = getRefValueFromAttributeRef(attributeReferences);
			var cItem = getMetadataById(ref);
			return cItem.getFirstAtomicValueByNameInData("finalValue");
		}

		function getRefValueFromAttributeRef(attributeReferences) {
			var cAttributeReferences = CORA.coraData(attributeReferences);
			var cRefGroup = CORA.coraData(cAttributeReferences.getFirstChildByNameInData("ref"));
			return cRefGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function processNewBinary(answer) {
			var calculatedRepeatId = sendAdd();
			var data = getDataPartOfRecordFromAnswer(answer);
			var createdRecordId = getIdFromRecordData(data);
			var newPath1 = calculateNewPath(metadataId, calculatedRepeatId);
			var newPath = calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(
					"linkedRecordIdTextVar", undefined, newPath1);
			var setValueData = {
				"data" : createdRecordId,
				"path" : newPath
			};
			dependencies.jsBookkeeper.setValue(setValueData);
			var formData = new FormData();
			formData.append("file", answer.spec.file);
			formData.append("userId", "aUserName");

			var uploadLink = JSON.parse(answer.responseText).record.actionLinks.upload;

			var uploadSpec = {
				"uploadLink" : uploadLink,
				"file" : answer.spec.file
			};
			dependencies.uploadManager.upload(uploadSpec);
			saveMainRecordIfRecordsAreCreatedForAllFiles();
		}

		function getDataPartOfRecordFromAnswer(answer) {
			return JSON.parse(answer.responseText).record.data;
		}

		function getIdFromRecordData(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			var id = cRecordInfo.getFirstAtomicValueByNameInData("id");
			return id;
		}

		function saveMainRecordIfRecordsAreCreatedForAllFiles() {
			numberOfRecordsForFilesCreated++;
			if (numberOfFilesToUpload === numberOfRecordsForFilesCreated) {
				dependencies.pubSub.publish("updateRecord", {
					"data" : "",
					"path" : {}
				});
				numberOfRecordsForFilesCreated = 0;
			}
		}

		function callError(answer) {
			var messageSpec = {
				"message" : answer.status,
				"type" : CORA.message.ERROR
			};
			var errorChild = document.createElement("span");
			errorChild.innerHTML = messageSpec.message;
			pChildRefHandlerView.addChild(errorChild);
		}

		function newElementsAdded() {
			unsubscribeFromNewElementsAdded();
			possiblyAddUpToMinNumberOfRepeatingToShow();
		}

		function unsubscribeFromNewElementsAdded() {
			dependencies.pubSub.unsubscribe(newElementsAddedSubscriptionId);
		}

		function possiblyAddUpToMinNumberOfRepeatingToShow() {
			var numberLeftToAdd = Number(spec.minNumberOfRepeatingToShow) - noOfRepeating;
			for (var i = 0; i < numberLeftToAdd; i++) {
				if (!maxLimitOfChildrenReached()) {
					sendAdd();
				}
			}
		}

		out = Object.freeze({
			getView : getView,
			add : add,
			handleMsg : handleMsg,
			isRepeating : isRepeating,
			isStaticNoOfChildren : isStaticNoOfChildren,
			sendAdd : sendAdd,
			sendAddBefore : sendAddBefore,
			childRemoved : childRemoved,
			childMoved : childMoved,
			handleFiles : handleFiles,
			processNewBinary : processNewBinary,
			newElementsAdded : newElementsAdded
		});

		start();
		pChildRefHandlerView.getView().modelObject = out;

		return out;
	};

	return cora;
}(CORA));