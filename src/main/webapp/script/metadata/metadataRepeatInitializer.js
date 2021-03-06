/*
 * Copyright 2015 Olov McKie
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
	cora.metadataRepeatInitializer = function(dependencies, spec) {
		let metadataProvider = dependencies.metadataProvider;
		let pubSub = dependencies.pubSub;
		let metadataId = spec.metadataId;
		let path = spec.path;
		let cMetadataElement;

		const start = function() {
			cMetadataElement = getMetadataById(metadataId);
		};

		const initialize = function() {
			initalizeRepeat();
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const initalizeRepeat = function() {
			createAndPublishAddMessage();
			initializeForMetadata();
		};

		const createAndPublishAddMessage = function() {
			let addMessage = {
				metadataId: metadataId,
				path: path,
				repeatId: spec.repeatId,
				nameInData: cMetadataElement.getFirstAtomicValueByNameInData("nameInData")
			};
			if (hasAttributes()) {
				addMessage.attributes = collectAttributes();
			}
			pubSub.publish("add", addMessage);
		};

		const hasAttributes = function() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		};

		const collectAttributes = function() {
			let collectedAttributes = {};
			let attributeReferences = cMetadataElement.getFirstChildByNameInData("attributeReferences");
			attributeReferences.children.forEach(function(attributeReference) {
				let cAttributeReference = CORA.coraData(attributeReference);
				let refLinkedId = cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
				let cCollectionVariable = getMetadataById(refLinkedId);
				let attributeNameInData = cCollectionVariable.getFirstAtomicValueByNameInData("nameInData");
				let attributeValues = [];
				collectedAttributes[attributeNameInData] = attributeValues;
				attributeValues.push(cCollectionVariable.getFirstAtomicValueByNameInData("finalValue"));
			});
			return collectedAttributes;
		};

		const initializeForMetadata = function() {
			let nextLevelPath = createNextLevelPath();
			let message = {
				data: spec.data,
				path: nextLevelPath
			};
			if (isGroup()) {
				initializeMetadataGroup(nextLevelPath);
			} else if (isRecordLink()) {
				initializeMetadataRecordLink(nextLevelPath);
				pubSub.publish("linkedData", message);
			} else if (isResourceLink()) {
				initializeMetadataResourceLink(nextLevelPath);
				pubSub.publish("linkedResource", message);
			} else {
				possiblyPublishVariableValue(nextLevelPath);
			}
		};

		const createNextLevelPath = function() {
			let pathSpec = {
				"metadataProvider": dependencies.metadataProvider,
				"metadataIdToAdd": metadataId,
				"repeatId": spec.repeatId,
				"parentPath": path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const isGroup = function() {
			let type = cMetadataElement.getData().attributes.type;
			return type === "group";
		};

		const initializeMetadataGroup = function(nextLevelPath) {
			let nextLevelChildReferences = cMetadataElement
				.getFirstChildByNameInData('childReferences');
			nextLevelChildReferences.children.forEach(function(childReference) {
				if (userHasRecordPartPermission(childReference)) {
					createSpecAndInitalizeMetadataChildInitializer(childReference, nextLevelPath,
						spec.data);
				}
			});
		};

		const userHasRecordPartPermission = function(childReference) {
			let cRef = getCRef(childReference);
			return spec.recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart(cRef);
		};

		const getCRef = function(childReference) {
			let cChildReference = CORA.coraData(childReference);
			return CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));

		}

		const createSpecAndInitalizeMetadataChildInitializer = function(childReference, nextLevelPath, data) {
			let initializerSpec = {
				childReference: childReference,
				path: nextLevelPath,
				data: data,
				recordPartPermissionCalculator: spec.recordPartPermissionCalculator
			};
			let metadataChildInitializer = dependencies.metadataChildAndRepeatInitializerFactory.factorChildInitializer(initializerSpec);
			let hasWritePermission = hasWritePermissions(childReference);
			metadataChildInitializer.initializeTopLevel(hasWritePermission);
		};

		const hasWritePermissions = function(childReference) {
			let cRef = getCRef(childReference);
			return spec.recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart(cRef);
		}

		const isRecordLink = function() {
			let type = cMetadataElement.getData().attributes.type;
			return type === "recordLink";
		};

		const initializeMetadataRecordLink = function(nextLevelPath) {
			initializeLinkedRecordType(nextLevelPath);
			initializeLinkedRecordId(nextLevelPath);
			possiblyInitializeLinkedRepeatId(nextLevelPath);
		};

		const initializeLinkedRecordType = function(nextLevelPath) {
			let recordTypeStaticChildReference = createRefWithRef("linkedRecordTypeTextVar");
			let cRecordTypeGroup = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("linkedRecordType"));
			let linkedRecordTypeValue = cRecordTypeGroup
				.getFirstAtomicValueByNameInData("linkedRecordId");

			let implementingRecordType = getImplementingRecordType(linkedRecordTypeValue);
			let recordTypeData = {
				name: cMetadataElement.getFirstAtomicValueByNameInData("nameInData"),
				children: [{
					name: "linkedRecordType",
					value: implementingRecordType
				}]
			};
			createSpecAndInitalizeMetadataChildInitializer(recordTypeStaticChildReference,
				nextLevelPath, recordTypeData);
		};

		const createRefWithRef = function(ref) {
			return {
				name: "childReference",
				repeatId: "1",
				children: [{
					name: "ref",
					children: [{
						name: "linkedRecordType",
						value: "metadataTextVariable"
					}, {
						name: "linkedRecordId",
						value: ref
					}]
				}, {
					name: "repeatMin",
					value: "1"
				}, {
					name: "repeatMax",
					value: "1"
				}]
			};
		};

		const getImplementingRecordType = function(linkedRecordTypeValue) {
			let recordTypeDefinition = dependencies.recordTypeProvider.getMetadataByRecordTypeId(linkedRecordTypeValue);
			return getImplementingRecordTypeFromRecordTypeDefinition(recordTypeDefinition, linkedRecordTypeValue);
		};

		const getImplementingRecordTypeFromRecordTypeDefinition = function(recordTypeDefinition, linkedRecordTypeValue) {
			return recordTypeDefinition.abstract === "false" ? linkedRecordTypeValue : getImplementingRecordTypeFromDataIfExists();
		};

		const getImplementingRecordTypeFromDataIfExists = function() {
			let implementingRecordType = "";
			if (dataContainsLinkedRecordType()) {
				let recordTypeInData = CORA.coraData(spec.data).getFirstChildByNameInData("linkedRecordType");
				if (recordTypeInData.value !== "") {
					implementingRecordType = recordTypeInData.value;
				}
			}
			return implementingRecordType;
		};

		const dataContainsLinkedRecordType = function() {
			return spec.data !== undefined && CORA.coraData(spec.data).containsChildWithNameInData("linkedRecordType");
		};

		const initializeLinkedRecordId = function(nextLevelPath) {
			let recordIdData = spec.data;
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				let finalValue = cMetadataElement.getFirstAtomicValueByNameInData("finalValue");

				recordIdData = {
					name: cMetadataElement.getFirstAtomicValueByNameInData("nameInData"),
					children: [{
						name: "linkedRecordId",
						value: finalValue
					}]
				};
			}

			let recordIdStaticChildReference = createRefWithRef("linkedRecordIdTextVar");

			createSpecAndInitalizeMetadataChildInitializer(recordIdStaticChildReference, nextLevelPath, recordIdData);

		};

		const possiblyInitializeLinkedRepeatId = function(nextLevelPath) {
			if (isLinkToRepeatingPartOfRecord()) {
				let recordTypeStaticChildReference = createRefWithRef("linkedRepeatIdTextVar");
				createSpecAndInitalizeMetadataChildInitializer(recordTypeStaticChildReference, nextLevelPath, spec.data);

			}
		};

		const isLinkToRepeatingPartOfRecord = function() {
			return cMetadataElement.containsChildWithNameInData("linkedPath");
		};

		const isResourceLink = function() {
			let type = cMetadataElement.getData().attributes.type;
			return type === "resourceLink";
		};

		const initializeMetadataResourceLink = function(nextLevelPath) {
			let cMetadataGroupForResourceLinkGroup = getMetadataById("metadataGroupForResourceLinkGroup");
			let nextLevelChildReferences = cMetadataGroupForResourceLinkGroup
				.getFirstChildByNameInData('childReferences');
			nextLevelChildReferences.children.forEach(function(childReference) {
				createSpecAndInitalizeMetadataChildInitializer(childReference, nextLevelPath);
			});
		};

		const possiblyPublishVariableValue = function(nextLevelPath) {
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				setFinalValue(nextLevelPath);
			} else {
				publishIfDataIsPresent(nextLevelPath);
			}
		};

		const setFinalValue = function(nextLevelPath) {
			let finalValue = cMetadataElement.getFirstAtomicValueByNameInData("finalValue");
			publishVariableValue(finalValue, nextLevelPath);
		};

		const publishVariableValue = function(value, nextLevelPath) {
			let message = {
				data: value,
				path: nextLevelPath
			};
			pubSub.publish("setValue", message);
		};

		const publishIfDataIsPresent = function(nextLevelPath) {
			if (spec.data !== undefined) {
				publishVariableValue(spec.data.value, nextLevelPath);
			}
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		start();

		return Object.freeze({
			type: "metadataRepeatInitializer",
			getDependencies: getDependencies,
			getSpec: getSpec,
			initialize: initialize
		});
	};
	return cora;
}(CORA));