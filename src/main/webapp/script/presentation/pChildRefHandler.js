/*
 * Copyright 2016, 2017, 2018, 2020, 2023 Uppsala University Library
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
		let out;
		let userCanUploadFile = false;
		let userCanRemove = false;
		let userCanMove = false;
		let userCanAddBefore = false;

		let metadataHelper;
		let presentationId;
		let metadataIdFromPresentation;
		let cParentMetadataChildRefPart;
		let cRef;
		let metadataId;
		let cMetadataElement;

		let text;

		let repeatMin;
		let repeatMax;

		let isRepeating;
		let isStaticNoOfChildren;
		let isZeroToOne;

		let noOfRepeating = 0;
		let metadataHasAttributes;
		let collectedAttributes;

		let pChildRefHandlerView;

		let numberOfFilesToUpload = 0;
		let numberOfRecordsForFilesCreated = 0;
		let newElementsAddedSubscriptionId = "";
		let possiblyFake;

		const start = function() {
			metadataHelper = CORA.metadataHelper({
				"metadataProvider": dependencies.metadataProvider
			});
			presentationId = findPresentationId(spec.cPresentation);
			metadataIdFromPresentation = getMetadataIdFromPresentation();
			cParentMetadataChildRefPart = metadataHelper.getChildRefPartOfMetadata(
				spec.cParentMetadata, metadataIdFromPresentation);

			if (childRefFoundInCurrentlyUsedParentMetadata()) {
				possiblyFake = createFakePChildRefHandlerAsWeDoNotHaveMetadataToWorkWith();
			} else {
				continueWithNormalStartup();
			}
		};

		const continueWithNormalStartup = function() {
			cRef = CORA.coraData(cParentMetadataChildRefPart.getFirstChildByNameInData("ref"));
			metadataId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
			cMetadataElement = getMetadataById(metadataId);

			text = getTextForAddButton(cMetadataElement);

			repeatMin = cParentMetadataChildRefPart.getFirstAtomicValueByNameInData("repeatMin");
			repeatMax = cParentMetadataChildRefPart.getFirstAtomicValueByNameInData("repeatMax");

			isRepeating = calculateIsRepeating();
			isStaticNoOfChildren = calculateIsStaticNoOfChildren();
			isZeroToOne = calculateIsZeroToOne();

			metadataHasAttributes = hasAttributes();
			collectedAttributes = collectAttributesForMetadataId(metadataId);
			pChildRefHandlerView = createPChildRefHandlerView();


			subscribeToMessagesFromForm();

			userCanUploadFile = showFileUpload();
			userCanRemove = calculateUserCanRemove();
			userCanMove = calculateUserCanMove();
			userCanAddBefore = calculateUserCanAddBefore();
		}
		const subscribeToMessagesFromForm = function() {
			dependencies.pubSub.subscribe("add", spec.parentPath, undefined, handleMsg);
			dependencies.pubSub.subscribe("move", spec.parentPath, undefined, handleMsg);
			if (spec.minNumberOfRepeatingToShow !== undefined) {
				newElementsAddedSubscriptionId = dependencies.pubSub.subscribe("newElementsAdded",
					[], undefined, newElementsAdded);
			}
			dependencies.pubSub.subscribe("addUpToMinNumberOfRepeating", [], undefined,
				newElementsAdded);
		};

		const calculateUserCanRemove = function() {
			if (spec.mode !== "input") {
				return false;
			}
			if (isStaticNoOfChildren) {
				return false;
			}
			return spec.hasWritePermissionsForRecordPart;
		};

		const calculateUserCanMove = function() {
			if (spec.mode !== "input") {
				return false;
			}
			if (!isRepeating) {
				return false;
			}
			return spec.hasWritePermissionsForRecordPart;
		};

		const calculateUserCanAddBefore = function() {
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
			return spec.hasWritePermissionsForRecordPart;
		};

		const childRefFoundInCurrentlyUsedParentMetadata = function() {
			return cParentMetadataChildRefPart.getData() === undefined;
		};

		const createFakePChildRefHandlerAsWeDoNotHaveMetadataToWorkWith = function() {
			return {
				getView: function() {
					let spanNew = document.createElement("span");
					spanNew.className = "fakePChildRefHandlerViewAsNoMetadataExistsFor "
						+ metadataIdFromPresentation;
					return spanNew;
				}
			};
		};

		const getTextId = function(cMetadataElementIn) {
			let cTextGroup = CORA.coraData(cMetadataElementIn.getFirstChildByNameInData("textId"));
			return cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const findPresentationId = function(cPresentationToSearch) {
			let recordInfo = cPresentationToSearch.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		};

		const getMetadataIdFromPresentation = function() {
			let presentationGroup = spec.cPresentation.getFirstChildByNameInData("presentationOf");
			let cPresentationGroup = CORA.coraData(presentationGroup);
			return cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		};

		const getMetadataById = function(id) {
			return CORA.coraData(dependencies.metadataProvider.getMetadataById(id));
		};

		const getTextForAddButton = function(cMetadataElement) {
			let textId = spec.addText !== undefined ? spec.addText : getTextId(cMetadataElement);
			return dependencies.textProvider.getTranslation(textId);
		};

		const collectAttributesForMetadataId = function(metadataIdIn) {
			return metadataHelper.collectAttributesAsObjectForMetadataId(metadataIdIn);
		};

		const createPChildRefHandlerView = function() {
			let pChildRefHandlerViewSpec = {
				"presentationId": presentationId,
				"isRepeating": isRepeating,
				"addText": "+ " + text,
				"mode": spec.mode
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
		};

		const hasAttributes = function() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		};

		const calculateIsRepeating = function() {
			return repeatMax > 1 || repeatMax === "X";
		};

		const calculateIsStaticNoOfChildren = function() {
			return repeatMax === repeatMin;
		};

		const showAddButton = function() {
			return spec.hasWritePermissionsForRecordPart
				&& additionalChildrenCanBeAdded();
		};

		const additionalChildrenCanBeAdded = function() {
			return ((isRepeating && !isStaticNoOfChildren) || calculateIsZeroToOne());
		}

		const calculateIsZeroToOne = function() {
			return repeatMin === "0" && repeatMax === "1";
		};

		const showFileUpload = function() {
			if (currentChildRefIsRecordLink() && currentChildRefHasLinkedRecordType()) {
				return calculateIfBinary();
			}
			return false;
		};

		const currentChildRefIsRecordLink = function() {
			return currentChildRefHasAttributes() && isOfTypeRecordLink();
		};

		const currentChildRefHasAttributes = function() {
			return cMetadataElement.getData().attributes !== undefined;
		};

		const isOfTypeRecordLink = function() {
			let attributes = cMetadataElement.getData().attributes;
			return attributes.type !== undefined && attributes.type === "recordLink";
		};

		const currentChildRefHasLinkedRecordType = function() {
			return cMetadataElement.containsChildWithNameInData("linkedRecordType");
		};

		const calculateIfBinary = function() {
			let cRecordTypeGroup = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("linkedRecordType"));
			let recordTypeId = cRecordTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			return "binary" == recordTypeId;
		};
		
		const getView = function() {
			return pChildRefHandlerView.getView();
		};

		const handleMsg = function(dataFromMsg, msg) {
			if (messageIsHandledByThisPChildRefHandler(dataFromMsg)) {
				processMsg(dataFromMsg, msg);
			}
		};

		const messageIsHandledByThisPChildRefHandler = function(dataFromMsg) {
			if (metadataIdSameAsInMessage(dataFromMsg)) {
				return true;
			}
			return shouldPresentData(dataFromMsg.nameInData, dataFromMsg.attributes);
		};

		const metadataIdSameAsInMessage = function(dataFromMsg) {
			return metadataId === dataFromMsg.metadataId;
		};

		const shouldPresentData = function(nameInDataFromMsg, attributesFromMsg) {
			if (nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg)) {
				return false;
			}
			return metadataHelper.firstAttributesExistsInSecond(attributesFromMsg,
				collectedAttributes);
		};

		const nameInDataFromMsgNotHandledByThisPChildRefHandler = function(nameInDataFromMsg) {
			return nameInDataFromMsg !== cMetadataElement
				.getFirstAtomicValueByNameInData("nameInData");
		};

		const processMsg = function(dataFromMsg, msg) {
			if (msg.endsWith("move")) {
				move(dataFromMsg);
			} else {
				add(dataFromMsg.metadataId, dataFromMsg.repeatId);
			}
		};

		const add = function(metadataIdToAdd, repeatId) {
			noOfRepeating++;
			let newPath = calculateNewPath(metadataIdToAdd, repeatId);
			let repeatingElement = createRepeatingElement(newPath);
			pChildRefHandlerView.addChild(repeatingElement.getView());
			addPresentationsToRepeatingElementsView(repeatingElement, metadataIdToAdd);
			subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView(repeatingElement);
			updateView();
		};

		const calculateNewPath = function(metadataIdToAdd, repeatId) {
			return calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(metadataIdToAdd,
				repeatId, spec.parentPath);
		};

		const calculateNewPathForMetadataIdUsingRepeatIdAndParentPath = function(metadataIdToAdd, repeatId,
			parentPath) {
			let pathSpec = {
				"metadataIdToAdd": metadataIdToAdd,
				"repeatId": repeatId,
				"parentPath": parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const createRepeatingElement = function(path) {
			let repeatingElementSpec = {
				"path": path,
				"pChildRefHandlerView": pChildRefHandlerView,
				"pChildRefHandler": out,
				"userCanRemove": userCanRemove,
				"userCanMove": userCanMove,
				"userCanAddBefore": userCanAddBefore
			};
			return dependencies.pRepeatingElementFactory.factor(repeatingElementSpec);
		};

		const addPresentationsToRepeatingElementsView = function(repeatingElement, metadataIdToAdd) {
			let path = repeatingElement.getPath();

			let presentation = factorPresentation(path, spec.cPresentation, metadataIdToAdd);
			repeatingElement.addPresentation(presentation);

			if (hasAlternativePresentation()) {
				let presentationMinimized = factorPresentation(path, spec.cAlternativePresentation,
					metadataIdToAdd);
				repeatingElement.addAlternativePresentation(presentationMinimized, spec.presentationSize);
			}
		};

		const factorPresentation = function(path, cPresentation, metadataIdToAdd) {
			let metadataIdUsedInData = metadataIdToAdd;
			let presentationSpec = {
				path: path,
				metadataIdUsedInData: metadataIdUsedInData,
				cPresentation: cPresentation,
				cParentPresentation: spec.cParentPresentation,
				recordPartPermissionCalculator: spec.recordPartPermissionCalculator
			};
			return dependencies.presentationFactory.factor(presentationSpec);
		};

		const hasAlternativePresentation = function() {
			return spec.cAlternativePresentation !== undefined;
		};

		const subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView = function(repeatingElement) {
			if (showAddButton()) {
				let removeInfo = {
					"repeatingElement": repeatingElement
				};
				let removeFunction = function() {
					childRemoved(removeInfo);
				};
				removeInfo.subscribeId = dependencies.pubSub.subscribe("remove", repeatingElement
					.getPath(), undefined, removeFunction);
			}
		};

		const move = function(dataFromMsg) {
			pChildRefHandlerView.moveChild(dataFromMsg);
		};

		const childRemoved = function(removeInfo) {
			pChildRefHandlerView.removeChild(removeInfo.repeatingElement.getView());
			dependencies.pubSub.unsubscribe(removeInfo.subscribeId);
			noOfRepeating--;
			updateView();
		};

		const updateView = function() {
			if (spec.mode === "input") {
				if (showAddButton()) {
					updateButtonViewAndAddBeforeButtonVisibility();
					updateChildrenRemoveButtonVisibility();
				}
				if (isRepeating) {
					updateChildrenDragButtonVisibility();
				}
			}
		};

		const updateChildrenRemoveButtonVisibility = function() {
			if (minLimitOfChildrenReached()) {
				pChildRefHandlerView.hideChildrensRemoveButton();
			} else {
				pChildRefHandlerView.showChildrensRemoveButton();
			}
		};

		const minLimitOfChildrenReached = function() {
			return noOfRepeating === Number(repeatMin);
		};

		const updateChildrenDragButtonVisibility = function() {
			if (moreThenOneChild()) {
				pChildRefHandlerView.showChildrensDragButton();
			} else {
				pChildRefHandlerView.hideChildrensDragButton();
			}
		};

		const moreThenOneChild = function() {
			return noOfRepeating > 1;
		};

		const updateButtonViewAndAddBeforeButtonVisibility = function() {
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
		};

		const maxLimitOfChildrenReached = function() {
			return noOfRepeating === Number(repeatMax);
		};

		const sendAdd = function() {
			let data = createAddData();
			let createdRepeatId = dependencies.jsBookkeeper.add(data);
			sendNewElementsAdded();
			return createdRepeatId;
		};

		const createAddData = function() {
			let data = {
				"metadataId": metadataId,
				"path": spec.parentPath,
				"childReference": cParentMetadataChildRefPart.getData(),
				"nameInData": cMetadataElement.getFirstAtomicValueByNameInData("nameInData"),
				"recordPartPermissionCalculator": spec.recordPartPermissionCalculator
			};

			if (metadataHasAttributes) {
				data.attributes = collectedAttributes;
			}
			return data;
		};

		const sendNewElementsAdded = function() {
			dependencies.pubSub.publish("newElementsAdded", {
				"data": "",
				"path": []
			});
		};

		const sendAddBefore = function(dataFromPRepeatingElement) {
			let data = createAddData();
			data.addBeforePath = dataFromPRepeatingElement.path;
			dependencies.jsBookkeeper.addBefore(data);
			sendNewElementsAdded();
		};

		const childMoved = function(moveInfo) {
			let data = {
				"path": spec.parentPath,
				"metadataId": metadataId,
				"moveChild": moveInfo.moveChild,
				"basePositionOnChild": moveInfo.basePositionOnChild,
				"newPosition": moveInfo.newPosition
			};
			dependencies.jsBookkeeper.move(data);
		};

		const handleFiles = function(files) {
			numberOfFilesToUpload = files.length;
			changeNumberOfFilesIfMaxNumberExceeded(numberOfFilesToUpload);
			for (let i = 0; i < numberOfFilesToUpload; i++) {
				handleFile(files[i]);
			}
		};

		const changeNumberOfFilesIfMaxNumberExceeded = function(numberOfChosenFiles) {
			if (repeatMaxIsNumber()) {
				calculateNumOfFilesLeftToUploadAndPossiblyChangeNumToUpload(numberOfChosenFiles);
			}
		};

		const repeatMaxIsNumber = function() {
			return !isNaN(repeatMax);
		};

		const calculateNumOfFilesLeftToUploadAndPossiblyChangeNumToUpload = function(numberOfChosenFiles) {
			let numOfFilesLeftToUpLoad = Number(repeatMax) - noOfRepeating;
			if (numOfFilesLeftToUpLoad < numberOfChosenFiles) {
				numberOfFilesToUpload = numOfFilesLeftToUpLoad;
			}
		};

		const handleFile = function(file) {
			let data = createNewBinaryData(file);
			let createLink = getLinkedRecordTypeCreateLink();
			let localFile = file;
			let callSpec = {
				"requestMethod": createLink.requestMethod,
				"url": createLink.url,
				"contentType": createLink.contentType,
				"accept": createLink.accept,
				"loadMethod": processNewBinary,
				"errorMethod": callError,
				"data": JSON.stringify(data),
				"file": localFile
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		};

		const createNewBinaryData = function(file) {
			let dataDividerLinkedRecordId = dependencies.dataDivider;
			let type = "generic";
			return {
				name: "binary",
				children: [{
					name: "recordInfo",
					children: [{
						name: "dataDivider",
						children: [{
							name: "linkedRecordType",
							value: "system"
						}, {
							name: "linkedRecordId",
							value: dataDividerLinkedRecordId
						}]
					},{
						name: "validationType",
						children: [{
							name: "linkedRecordType",
							value: "validationType"
						}, {
							name: "linkedRecordId",
							value: "genericBinary"
						}]
					}]
				},{
					name: "originalFileName",
					value: file.name
				},{
					name: "expectedFileSize",
					value: ""+file.size
				}],
				attributes: {
					type: type
				}
			};
		};

		const getImplementingLinkedRecordType = function() {
			let cRecordTypeGroup = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("linkedRecordType"));
			let recordTypeId = cRecordTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			return dependencies.recordTypeProvider.getRecordTypeById(recordTypeId);
		};

		const getLinkedRecordTypeCreateLink = function() {
			let recordType = getImplementingLinkedRecordType();
			return recordType.actionLinks.create;
		};

		const processNewBinary = function(answer) {
			let calculatedRepeatId = sendAdd();
			let data = getDataPartOfRecordFromAnswer(answer);
			let createdRecordId = getIdFromRecordData(data);
			let newPath1 = calculateNewPath(metadataId, calculatedRepeatId);
			let newPath = calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(
				"linkedRecordIdTextVar", undefined, newPath1);
			let setValueData = {
				"data": createdRecordId,
				"path": newPath
			};
			dependencies.jsBookkeeper.setValue(setValueData);
			let formData = new FormData();
			formData.append("file", answer.spec.file);
			formData.append("userId", "aUserName");

			let uploadLink = JSON.parse(answer.responseText).record.actionLinks.upload;

			let uploadSpec = {
				"uploadLink": uploadLink,
				"file": answer.spec.file
			};
			dependencies.uploadManager.upload(uploadSpec);
			saveMainRecordIfRecordsAreCreatedForAllFiles();
		};

		const getDataPartOfRecordFromAnswer = function(answer) {
			return JSON.parse(answer.responseText).record.data;
		};

		const getIdFromRecordData = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			let cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};

		const saveMainRecordIfRecordsAreCreatedForAllFiles = function() {
			numberOfRecordsForFilesCreated++;
			if (numberOfFilesToUpload === numberOfRecordsForFilesCreated) {
				dependencies.pubSub.publish("updateRecord", {
					"data": "",
					"path": []
				});
				numberOfRecordsForFilesCreated = 0;
			}
		};

		const callError = function(answer) {
			let messageSpec = {
				"message": answer.status,
				"type": CORA.message.ERROR
			};
			let errorChild = document.createElement("span");
			errorChild.innerHTML = messageSpec.message;
			pChildRefHandlerView.addChild(errorChild);
		};

		const newElementsAdded = function() {
			unsubscribeFromNewElementsAdded();
			possiblyAddUpToMinNumberOfRepeatingToShow();
		};

		const unsubscribeFromNewElementsAdded = function() {
			dependencies.pubSub.unsubscribe(newElementsAddedSubscriptionId);
		};

		const possiblyAddUpToMinNumberOfRepeatingToShow = function() {

			let numberLeftToAdd = Number(spec.minNumberOfRepeatingToShow) - noOfRepeating;
			for (let i = 0; i < numberLeftToAdd; i++) {
				if (!maxLimitOfChildrenReached()) {
					sendAdd();
				}
			}
		};

		start();
		if (undefined !== possiblyFake) {
			return possiblyFake;
		}

		out = Object.freeze({
			getView: getView,
			add: add,
			handleMsg: handleMsg,
			isRepeating: isRepeating,
			isStaticNoOfChildren: isStaticNoOfChildren,
			sendAdd: sendAdd,
			sendAddBefore: sendAddBefore,
			childRemoved: childRemoved,
			childMoved: childMoved,
			handleFiles: handleFiles,
			processNewBinary: processNewBinary,
			newElementsAdded: newElementsAdded
		});

		pChildRefHandlerView.getView().modelObject = out;

		return out;
	};

	return cora;
}(CORA));