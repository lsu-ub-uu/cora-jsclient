/*
 * Copyright 2015 Olov McKie
 * Copyright 2017, 2019, 2020 Uppsala University Library
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
		let topLevelPath = [];
		let recordPartPermissionCalculator = spec.recordPartPermissionCalculator;

		let cMetadataElement;
		let pubSub = dependencies.pubSub;
		const start = function() {
			cMetadataElement = getMetadataById(topLevelMetadataId);
			if (hasAttributes()) {
				addAttributes();
			}
			initializeFirstLevel();
			dependencies.pubSub.publish("newElementsAdded", {
				data: "",
				path: []
			});
			dependencies.pubSub.publish("initComplete", {
				data: "",
				path: []
			});
		};

		const hasAttributes = function() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		};

		const addAttributes = function() {
			let attributeReferences = cMetadataElement.getFirstChildByNameInData("attributeReferences");
			attributeReferences.children.forEach(function(attributeReference) {
				addAttribute(attributeReference);
			});
		};

		const addAttribute = function(attributeReference) {
			let cAttributeReference = CORA.coraData(attributeReference);
			let refLinkedId = cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
			let cCollectionVariable = getMetadataById(refLinkedId);

			let addAttributeMessage = {
				metadataId: refLinkedId,
				path: [],
				nameInData: cCollectionVariable.getFirstAtomicValueByNameInData("nameInData")
			}
			pubSub.publish("addAttribute", addAttributeMessage);

			possiblySetAttributeValue(refLinkedId, cCollectionVariable);
		};

		const possiblySetAttributeValue = function(refLinkedId, cCollectionVariable) {
			if (cCollectionVariable.containsChildWithNameInData("finalValue")) {
				let pathSpec = {
					metadataIdToAdd: refLinkedId,
					parentPath: [],
					type: "attribute"
				};
				let attributePath = CORA.calculatePathForNewElement(pathSpec);
				let setValueMessage = {
					path: attributePath,
					data: cCollectionVariable.getFirstAtomicValueByNameInData("finalValue")
				}

				pubSub.publish("setValue", setValueMessage);
				pubSub.publish("disable", { path: attributePath });
			}
		};

		const initializeFirstLevel = function() {
			let topLevelChildReferences = extractTopLevelChildReferences();
			topLevelChildReferences.children.forEach(function(childReference) {
				possiblyInitializeChild(childReference);
			});
		};

		const extractTopLevelChildReferences = function() {
			let topLevelMetadataElement = getMetadataById(topLevelMetadataId);
			return topLevelMetadataElement.getFirstChildByNameInData('childReferences');
		};

		const getMetadataById = function(id) {
			return CORA.coraData(dependencies.metadataProvider.getMetadataById(id));
		};

		const possiblyInitializeChild = function(childReference) {
			let hasReadPermission = userHasRecordPartPermission(childReference);
			if (hasReadPermission) {
				intitalizeChild(childReference);
			}
		};

		const userHasRecordPartPermission = function(childReference) {
			let cRef = getCRef(childReference);
			return recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart(cRef);
		};

		const getCRef = function(childReference) {
			let cChildReference = CORA.coraData(childReference);
			return CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
		};

		const intitalizeChild = function(childReference) {
			let initializerSpec = {
				childReference: childReference,
				path: topLevelPath,
				data: topLevelData,
				recordPartPermissionCalculator: recordPartPermissionCalculator
			};
			let childInitializer = dependencies.metadataChildAndRepeatInitializerFactory
				.factorChildInitializer(initializerSpec);
			let hasWritePermission = hasWritePermissions(childReference);
			childInitializer.initializeTopLevel(hasWritePermission);
		};

		const hasWritePermissions = function(childReference) {
			let cRef = getCRef(childReference);
			return recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart(cRef);
		}

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