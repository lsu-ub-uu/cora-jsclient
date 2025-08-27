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
	cora.containsDataTracker = function(dependencies, spec) {
		const pubSub = dependencies.pubSub;
		const methodToCallOnContainsDataChange = spec.methodToCallOnContainsDataChange;
		const path = spec.path;
		let currentState;
		let topLevelMetadataIds = spec.topLevelMetadataIds;
		let storedValuePositions = {};

		const start = function() {
			subscribeToMessagesForPath();
		};

		const subscribeToMessagesForPath = function() {
			if (topLevelMetadataIds) {
				pubSub.subscribe("add", path, undefined, possiblySubscribeOnAddMsg);
			} else {
				pubSub.subscribe("*", path, undefined, handleMsgToDeterminDataState);
			}
		};

		const possiblySubscribeOnAddMsg = function(dataFromMsg, msg) {
			if (messageIsHandledByThisPNonRepeatingChildRefHandler(dataFromMsg)) {
				let newPath = calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(
					dataFromMsg.metadataId, dataFromMsg.repeatId, path);
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
			if (currentState != state) {
				currentState = state;
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