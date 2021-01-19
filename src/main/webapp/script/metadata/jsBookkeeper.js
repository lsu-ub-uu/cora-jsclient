/*
 * Copyright 2016, 2018 Olov McKie
 * Copyright 2020 Uppsala University Library
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
	cora.jsBookkeeper = function(dependencies, spec) {
		let pubSub = spec.pubSub;

		const setValue = function(data) {
			pubSub.publish("setValue", data);
		};

		const add = function(data) {
			let childReference = data.childReference;
			let path = data.path;
			let currentData = spec.dataHolder.getData();
			if (path.children !== undefined) {
				currentData = spec.dataHolder.findContainer(currentData, path);
			}
			let cChildReference = CORA.coraData(childReference);
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			let ref = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
			let repeatMax = cChildReference.getFirstAtomicValueByNameInData('repeatMax');

			let initializerSpec = {
				"metadataId" : ref,
				"path" : path,
				"data" : undefined,
				"recordPartPermissionCalculator" : data.recordPartPermissionCalculator
			};
			if (repeatMax === "1") {
				initializerSpec.repeatId = undefined;
				let repeatInitializer = dependencies.metadataChildAndRepeatInitializerFactory
						.factorRepeatInitializer(initializerSpec);
				repeatInitializer.initialize();
			} else {
				let startRepeatId = calculateStartRepeatId(currentData.children);
				initializerSpec.repeatId = String(startRepeatId);
				let repeatInitializer = dependencies.metadataChildAndRepeatInitializerFactory
						.factorRepeatInitializer(initializerSpec);
				repeatInitializer.initialize();
				return String(startRepeatId);
			}
		};

		const calculateStartRepeatId = function(dataChildrenForMetadata) {
			return calculateStartRepeatIdFromData(dataChildrenForMetadata);
		};

		const calculateStartRepeatIdFromData = function(dataChildrenForMetadata) {
			let currentMaxRepeatId = 0;
			dataChildrenForMetadata.forEach(function(child) {
				currentMaxRepeatId = calculateMaxRepeatFromChildAndCurrentMaxRepeat(child,
						currentMaxRepeatId);
			});
			return currentMaxRepeatId;
		};

		const calculateMaxRepeatFromChildAndCurrentMaxRepeat = function(child, currentMaxRepeatId) {
			let x = Number(child.repeatId);
			if (!isNaN(x) && x >= currentMaxRepeatId) {
				x++;
				return x;
			}
			return currentMaxRepeatId;
		};

		const remove = function(data) {
			pubSub.publish("remove", data);
			pubSub.unsubscribePathBelow(data.path);
		};

		const move = function(data) {
			pubSub.publish("move", data);
		};

		const addBefore = function(data) {
			let addedRepeatId = add(data);

			let newPath = calculateNewPath(data.metadataId, data.path, addedRepeatId);

			let parentPath = data.path;

			let moveData = {
				"path" : parentPath,
				"metadataId" : data.metadataId,
				"moveChild" : newPath,
				"basePositionOnChild" : data.addBeforePath,
				"newPosition" : "before"
			};
			move(moveData);
		};

		const calculateNewPath = function(metadataIdToAdd, parentPath, repeatId) {
			return calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(metadataIdToAdd,
					repeatId, parentPath);
		};

		const calculateNewPathForMetadataIdUsingRepeatIdAndParentPath = function(metadataIdToAdd,
				repeatId, parentPath) {
			let pathSpec = {
				"metadataProvider" : spec.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"repeatId" : repeatId,
				"parentPath" : parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const getSpec = function() {
			return spec;
		};

		const getDependencies = function() {
			return dependencies;
		};

		return Object.freeze({
			"type" : "jsBookkeeper",
			getDependencies : getDependencies,
			getSpec : getSpec,
			setValue : setValue,
			add : add,
			remove : remove,
			move : move,
			addBefore : addBefore
		});
	};
	return cora;
}(CORA));