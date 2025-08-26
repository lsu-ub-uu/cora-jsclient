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
	cora.containsDataTracker = function(providers, dependencies, spec) {
		//		const metadataProvider = providers.metadataProvider;
		const pubSub = dependencies.pubSub;
		const methodToCallOnContainsDataChange = spec.methodToCallOnContainsDataChange;
		const path = spec.path;
		let currentState;
		let topLevelMetadataIds = spec.topLevelMetadataIds;
		//		let topLevelMetadataIds = [];
		let storedValuePositions = {};
		//		let metadataHelper;

		const start = function() {
			console.log("path", path)
			console.log("topLevelMetadataIds", topLevelMetadataIds)
			//			metadataHelper = CORA.metadataHelper({
			//				metadataProvider: metadataProvider
			//			});
			//						calculateHandledTopLevelMetadataIds(spec.cPresentation);
			subscribeToAddMessagesForParentPath();
		};

		//		const calculateHandledTopLevelMetadataIds = function(cPresentation) {
		//			let cPresentationsOf = CORA.coraData(cPresentation.getFirstChildByNameInData("presentationsOf"));
		//			let listPresentationOf = cPresentationsOf.getChildrenByNameInData("presentationOf");
		//			let cParentMetadata = CORA.coraData(metadataProvider.getMetadataById(spec.parentMetadataId));
		//			listPresentationOf.forEach(function(child) {
		//				let cChild = CORA.coraData(child);
		//				let presentationOfId = cChild.getFirstAtomicValueByNameInData("linkedRecordId");
		//				let cParentMetadataChildRefPart = metadataHelper.getChildRefPartOfMetadata(
		//					cParentMetadata, presentationOfId);
		//				if (cParentMetadataChildRefPart.getData() != undefined) {
		//					let cRef = CORA.coraData(cParentMetadataChildRefPart.getFirstChildByNameInData("ref"));
		//					let metadataId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		//					topLevelMetadataIds.push(metadataId);
		//				}
		//			});
		//						console.log(topLevelMetadataIds)
		//		};

		const subscribeToAddMessagesForParentPath = function() {
			pubSub.subscribe("add", path, undefined, possiblySubscribeOnAddMsg);
			//TODO:this does not work
//			pubSub.subscribe("*", path, undefined, handleMsgToDeterminDataState);
		};

		const possiblySubscribeOnAddMsg = function(dataFromMsg) {
			if (messageIsHandledByThisPNonRepeatingChildRefHandler(dataFromMsg)) {
				console.log("subscribe on add for:",dataFromMsg)
				let newPath = calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(
					dataFromMsg.metadataId, dataFromMsg.repeatId, path);
				console.log("subscribe on add for path:",newPath)
				pubSub.subscribe("*", newPath, undefined, handleMsgToDeterminDataState);
			}
		};

		const messageIsHandledByThisPNonRepeatingChildRefHandler = function(dataFromMsg) {
			return topLevelMetadataIds.includes(dataFromMsg.metadataId);
		};

		const calculateNewPathForMetadataIdUsingRepeatIdAndParentPath = function(metadataIdToAdd,
			repeatId, path) {
			let pathSpec = {
				metadataIdToAdd: metadataIdToAdd,
				repeatId: repeatId,
				parentPath: path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const handleMsgToDeterminDataState = function(dataFromMsg, msg) {
			console.log("handleMsgToDeterminDataState", dataFromMsg, msg)
			console.log("storedValuePositions", JSON.stringify(storedValuePositions))

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
			callMethodToCallOnContainsDataChangeIfCurrentStateIsChanged(true);
		};

		const callMethodToCallOnContainsDataChangeIfCurrentStateIsChanged = function(state) {
			console.log("currentState", currentState);
			console.log("setting state in containsData", state);
			if (currentState != state) {
				currentState = state;
				console.log("calling change", state);
				methodToCallOnContainsDataChange(state);
			}
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
			callMethodToCallOnContainsDataChangeIfCurrentStateIsChanged(false);
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

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		let out = Object.freeze({
			type: "containsDataTracker",
			getDependencies: getDependencies,
			getSpec: getSpec,
			possiblySubscribeOnAddMsg: possiblySubscribeOnAddMsg,
			handleMsgToDeterminDataState: handleMsgToDeterminDataState,
		});

		start();
		return out;
	};

	return cora;
}(CORA));