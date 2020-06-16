/*
 * Copyright 2015 Olov McKie
 * Copyright 2017, 2019 Uppsala University Library
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
	cora.metadataController = function(dependencies, spec) {
		let topLevelMetadataId = spec.metadataId;
		let topLevelData = spec.data;
		let topLevelPath = {};
		let recordPartPermissionCalculator = spec.recordPartPermissionCalculator;

		const start = function() {
			initializeFirstLevel();
			dependencies.pubSub.publish("newElementsAdded", {
				data: "",
				path: {}
			});
			dependencies.pubSub.publish("initComplete", {
				data: "",
				path: {}
			});
		};

		const initializeFirstLevel = function() {
			let topLevelChildReferences = extractTopLevelChildReferences();
			topLevelChildReferences.children.forEach(function(childReference) {
				possiblyInitializeChild(childReference);
			});
		};

		const extractTopLevelChildReferences = function() {
			let topLevelMetadataElement = getMetadataById(topLevelMetadataId);
			return topLevelMetadataElement
				.getFirstChildByNameInData('childReferences');
		}

		const getMetadataById = function(id) {
			return CORA.coraData(dependencies.metadataProvider.getMetadataById(id));
		};

		const possiblyInitializeChild = function(childReference) {
			let hasReadPermission = userHasRecordPartPermission(childReference);
			if (hasReadPermission) {
				console.log("read permission")
				intitalizeChild(childReference);
			}
		};

		const userHasRecordPartPermission = function(childReference) {
			let cChildReference = CORA.coraData(childReference);
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			let recordType = cRef.getFirstAtomicValueByNameInData("linkedRecordType");
			let recordId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
			return recordPartPermissionCalculator
				.hasFulfilledReadPermissionsForRecordPart(recordType, recordId);
		};

		const intitalizeChild = function(childReference) {
			let initializerSpec = {
				childReference: childReference,
				path: topLevelPath,
				data: topLevelData
			};
			dependencies.metadataChildAndRepeatInitializerFactory
				.factorChildInitializer(initializerSpec);
		};

		const getSpec = function() {
			return spec;
		};
		const getDependencies = function() {
			return dependencies;
		};

		start();

		return Object.freeze({
			type: "metadataController",
			getSpec: getSpec,
			getDependencies: getDependencies
		});
	};
	return cora;
}(CORA));