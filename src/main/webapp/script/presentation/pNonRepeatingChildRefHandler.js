/*
 * Copyright 2018, 2020 Uppsala University Library
 * Copyright 2018 Olov McKie
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
	cora.pNonRepeatingChildRefHandler = function(dependencies, spec) {
		let view;
		let topLevelMetadataIds = {};
		let storedValuePositions = {};
		let metadataHelper;
		const metadataProvider = dependencies.providers.metadataProvider;
		const start = function() {
			metadataHelper = CORA.metadataHelper({
				metadataProvider: metadataProvider
			});
			createView();
			calculateHandledTopLevelMetadataIds(spec.cPresentation);
			subscribeToAddMessagesForParentPath();
			let factoredPresentation = factorPresentation(spec.cPresentation);
			view.addChild(factoredPresentation.getView());
			possiblyAddAlternativePresentation();
			view.setHasDataStyle(false);
			if (spec.mode === "input") {
				view.showContent();
			} else {
				view.hideContent();
			}
		};

		const createView = function() {
			let viewSpec = {
				presentationId: findPresentationId(spec.cPresentation),
				textStyle: spec.textStyle,
				childStyle: spec.childStyle,
				callOnFirstShowOfAlternativePresentation: publishPresentationShown,
				clickableHeadlineText: spec.clickableHeadlineText,
				clickableHeadlineLevel: spec.clickableHeadlineLevel,
				presentationSize: spec.presentationSize
			};
			view = dependencies.pNonRepeatingChildRefHandlerViewFactory.factor(viewSpec);
		};

		const publishPresentationShown = function() {
			dependencies.pubSub.publish("presentationShown", {
				data: "",
				path: []
			});
		};

		const findPresentationId = function(cPresentation) {
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		};

		const calculateHandledTopLevelMetadataIds = function(cPresentation) {
			let cPresentationsOf = CORA.coraData(cPresentation
				.getFirstChildByNameInData("presentationsOf"));
			let listPresentationOf = cPresentationsOf.getChildrenByNameInData("presentationOf");
			let cParentMetadata = CORA.coraData(metadataProvider.getMetadataById(spec.parentMetadataId))
			listPresentationOf.forEach(function(child) {
				let cChild = CORA.coraData(child);
				let presentationOfId = cChild.getFirstAtomicValueByNameInData("linkedRecordId");
				let cParentMetadataChildRefPart = metadataHelper.getChildRefPartOfMetadata(
					cParentMetadata, presentationOfId);
				if (cParentMetadataChildRefPart.getData() != undefined) {
					let cRef = CORA.coraData(cParentMetadataChildRefPart.getFirstChildByNameInData("ref"));
					let metadataId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
					topLevelMetadataIds[metadataId] = "exists";
				}
			});
		};

		const factorPresentation = function(cPresentation) {
			let presentationSpec = {
				path: spec.parentPath,
				metadataIdUsedInData: spec.parentMetadataId,
				cPresentation: cPresentation,
				cParentPresentation: spec.cParentPresentation,
				recordPartPermissionCalculator: spec.recordPartPermissionCalculator
			};
			return dependencies.presentationFactory.factor(presentationSpec);
		};

		const subscribeToAddMessagesForParentPath = function() {
			dependencies.pubSub.subscribe("add", spec.parentPath, undefined, possiblySubscribeOnAddMsg);
		};

		const possiblySubscribeOnAddMsg = function(dataFromMsg) {
			if (messageIsHandledByThisPNonRepeatingChildRefHandler(dataFromMsg)) {
				let newPath = calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(
					dataFromMsg.metadataId, dataFromMsg.repeatId, spec.parentPath);
				dependencies.pubSub
					.subscribe("*", newPath, undefined, handleMsgToDeterminDataState);
			}
		};

		const messageIsHandledByThisPNonRepeatingChildRefHandler = function(dataFromMsg) {
			return topLevelMetadataIds[dataFromMsg.metadataId] !== undefined;
		};

		const calculateNewPathForMetadataIdUsingRepeatIdAndParentPath = function(metadataIdToAdd, repeatId,
			parentPath) {
			let pathSpec = {
				metadataIdToAdd: metadataIdToAdd,
				repeatId: repeatId,
				parentPath: parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const handleMsgToDeterminDataState = function(dataFromMsg, msg) {
			let msgAsArray = msg.split("/");
			let msgType = msgAsArray.pop();
			if (msgType === "setValue") {
				handleNewValue(dataFromMsg, msgAsArray);
			}
			if (msgType === "remove") {
				removeAndSetState(msgAsArray);
			}
		};

		const handleNewValue = function(dataFromMsg, msgAsArray) {
			if (dataFromMsg.data !== "") {
				updateViewForData();
				findOrAddPathToStored(msgAsArray);
			} else {
				removeAndSetState(msgAsArray);
			}
		};

		const updateViewForData = function() {
			view.setHasDataStyle(true);
			if (isInOutputMode()) {
				view.showContent();
				publishPresentationShown();
			}
		};

		const isInOutputMode = function() {
			return spec.mode === "output";
		};

		const removeAndSetState = function(msgAsArray) {
			removeValuePosition(msgAsArray);
			if (noValuesExistForPresentedData()) {
				updateViewForNoData();
			}
		};

		const removeValuePosition = function(pathAsArray) {
			let currentPartOfStoredValuePositions = findOrAddPathToStored(pathAsArray);
			removeFromBottom(currentPartOfStoredValuePositions);
		};

		const removeFromBottom = function(currentPartOfStoredValuePositions) {
			let parent = currentPartOfStoredValuePositions.getParent();
			delete parent[currentPartOfStoredValuePositions.name];
			if (parentContainsNoValues(parent)) {
				removeFromBottom(parent);
			}
		};

		const parentContainsNoValues = function(parent) {
			return Object.keys(parent).length === 2;
		};

		const noValuesExistForPresentedData = function() {
			return Object.keys(storedValuePositions).length === 0;
		};

		const updateViewForNoData = function() {
			view.setHasDataStyle(false);
			if (isInOutputMode()) {
				view.hideContent();
			}
		};

		const findOrAddPathToStored = function(pathAsArray) {
			let currentPartOfStoredValuePositions = storedValuePositions;
			for (let pathPart of pathAsArray) {
				currentPartOfStoredValuePositions = returnOrCreatePathPart(
					currentPartOfStoredValuePositions, pathPart);
			}
			return currentPartOfStoredValuePositions;
		};

		const returnOrCreatePathPart = function(currentPartOfStoredValuePositions, partPath) {
			if (currentPartOfStoredValuePositions[partPath] !== undefined) {
				return currentPartOfStoredValuePositions[partPath];
			}
			return createAndSetPartPath(currentPartOfStoredValuePositions, partPath);
		};

		const createAndSetPartPath = function(currentPartOfStoredValuePositions, partPath) {
			let newLevel = createPartPath(currentPartOfStoredValuePositions, partPath);
			currentPartOfStoredValuePositions[partPath] = newLevel;
			return newLevel;
		};

		const createPartPath = function(currentPartOfStoredValuePositions, partPath) {
			return {
				name: partPath,
				getParent: function() {
					return currentPartOfStoredValuePositions;
				}
			};
		};

		const possiblyAddAlternativePresentation = function() {
			if (spec.cAlternativePresentation !== undefined) {
				let factoredAlternativePresentation = factorPresentation(spec.cAlternativePresentation);
				view.addAlternativeChild(factoredAlternativePresentation.getView());
			}
		};

		const getView = function() {
			return view.getView();
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		let out = Object.freeze({
			type: "pNonRepeatingChildRefHandler",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			possiblySubscribeOnAddMsg: possiblySubscribeOnAddMsg,
			handleMsgToDeterminDataState: handleMsgToDeterminDataState,
			publishPresentationShown: publishPresentationShown
		});

		start();
		return out;
	};

	return cora;
}(CORA));