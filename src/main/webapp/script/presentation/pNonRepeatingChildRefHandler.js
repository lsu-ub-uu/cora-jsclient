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
//				metadataProvider: dependencies.metadataProvider
				metadataProvider: metadataProvider
			});
			createView();
			calculateHandledTopLevelMetadataIds(spec.cPresentation);
console.log("topLevelMetadataIds", topLevelMetadataIds)
console.log("spec.parentPath", spec.parentPath)
console.log("spec", spec)
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
				"callOnFirstShowOfAlternativePresentation": publishPresentationShown
			};
			view = dependencies.pNonRepeatingChildRefHandlerViewFactory.factor(viewSpec);
		};

		const publishPresentationShown = function() {
			dependencies.pubSub.publish("presentationShown", {
				"data": "",
				"path": []
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
			listPresentationOf.forEach(function(child) {
				let presentationOfId = CORA.coraData(child).getFirstAtomicValueByNameInData(
					"linkedRecordId");
//				topLevelMetadataIds[presentationOfId] = "exists";
///ADDED HERE				
//			let cParentMetadataChildRefPart = metadataHelper.getChildRefPartOfMetadata(
//				spec.cParentMetadata, metadataIdFromPresentation);
				let cParentMetadata = CORA.coraData(metadataProvider.getMetadataById(spec.parentMetadataId))
				let cParentMetadataChildRefPart = metadataHelper.getChildRefPartOfMetadata(
					cParentMetadata, presentationOfId);
				console.log("cParentMetadataChildRefPart", cParentMetadataChildRefPart)
//				if(cParentMetadataChildRefPart.containsChildWithNameInData("ref")){
				try{
					let cRef = CORA.coraData(cParentMetadataChildRefPart.getFirstChildByNameInData("ref"));
					let metadataId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
	//				cMetadataElement = getMetadataById(metadataId);
					topLevelMetadataIds[metadataId] = "exists";
				}catch(e){
					console.log("MISSING::::: ",presentationOfId);
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
			dependencies.pubSub.subscribe("add", spec.parentPath, undefined, subscribeMsg);
		};

		const subscribeMsg = function(dataFromMsg) {
console.log("dataFromMsg",dataFromMsg)			
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
				"metadataIdToAdd": metadataIdToAdd,
				"repeatId": repeatId,
				"parentPath": parentPath
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
console.log(dataFromMsg)			
console.log(msgAsArray)			
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
console.log(storedValuePositions)
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
				view.addAlternativeChild(factoredAlternativePresentation.getView(), spec.presentationSize);
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
			subscribeMsg: subscribeMsg,
			handleMsgToDeterminDataState: handleMsgToDeterminDataState,
			publishPresentationShown: publishPresentationShown
		});

		start();
		return out;
	};

	return cora;
}(CORA));