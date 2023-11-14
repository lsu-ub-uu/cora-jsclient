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
				const collectedAttributes = collectAttributesForMetadataId(metadataId);
				addMessage.attributes = collectedAttributes;
			}
			pubSub.publish("add", addMessage);
			if (hasAttributes()) {
				addAttributes();
			}
		};
		
		const collectAttributesForMetadataId = function(metadataIdIn) {
			const metadataHelper = CORA.metadataHelper({
				metadataProvider: dependencies.metadataProvider
			});
			return metadataHelper.collectAttributesAsObjectForMetadataId(metadataIdIn);
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
				path: createNextLevelPath(),
				nameInData: cCollectionVariable.getFirstAtomicValueByNameInData("nameInData")
			}
			pubSub.publish("addAttribute", addAttributeMessage);
			possiblySetAttributeValue(refLinkedId, cCollectionVariable);
		};

		const possiblySetAttributeValue = function(refLinkedId, cCollectionVariable) {
			let pathSpec = {
				metadataIdToAdd: refLinkedId,
				parentPath: createNextLevelPath(),
				type: "attribute"
			};
			let attributePath = CORA.calculatePathForNewElement(pathSpec);
			if (cCollectionVariable.containsChildWithNameInData("finalValue")) {
				setValueForForAttributeWithFinalValue(attributePath, cCollectionVariable);
			} else {
				possiblySetValueForAttributeWithChoice(attributePath, cCollectionVariable);
			}
		};

		const setValueForForAttributeWithFinalValue = function(attributePath, cCollectionVariable) {
			let value = cCollectionVariable.getFirstAtomicValueByNameInData("finalValue");
			setValueForAttributeWithPathAndValue(attributePath, value);
			pubSub.publish("disable", { path: attributePath });
		};

		const possiblySetValueForAttributeWithChoice = function(attributePath, cCollectionVariable) {
			if (spec.data !== undefined) {
				let collectionVariableNameInData = cCollectionVariable.getFirstAtomicValueByNameInData("nameInData");
				let value = spec.data.attributes[collectionVariableNameInData];
				setValueForAttributeWithPathAndValue(attributePath, value);
			}
		};

		const setValueForAttributeWithPathAndValue = function(attributePath, value) {
			let setValueMessage = {
				path: attributePath,
				data: value
			}
			pubSub.publish("setValue", setValueMessage);
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
//				initializeMetadataResourceLink(nextLevelPath);
				pubSub.publish("linkedResource", message);
				console.log("in metadataRepeatInitializer, cMetadataElement: ",cMetadataElement )
				console.log("in metadataRepeatInitializer, spec: ",spec )
				console.log("in metadataRepeatInitializer, nextLevelPath: ",nextLevelPath )
//				publishIfDataIsPresent(nextLevelPath)
//				const publishIfDataIsPresent = function(nextLevelPath) {
					if (spec.data !== undefined) {
//						publishVariableValue(spec.data.value, nextLevelPath);
						publishVariableValue(spec.data, nextLevelPath);
					}
//				};
			} else {
				possiblyPublishVariableValue(nextLevelPath);
			}
		};

		const createNextLevelPath = function() {
			let pathSpec = {
				metadataIdToAdd: metadataId,
				repeatId: spec.repeatId,
				parentPath: path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const isGroup = function() {
			return "group" === getType();
		};

		const getType = function() {
			return cMetadataElement.getData().attributes.type;
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
		};

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
		};

		const isRecordLink = function() {
			return "recordLink" === getType();
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

			let recordTypeData = {
				name: cMetadataElement.getFirstAtomicValueByNameInData("nameInData"),
				children: [{
					name: "linkedRecordType",
					value: linkedRecordTypeValue
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
			return "resourceLink" === getType();
		};

		const initializeMetadataResourceLink = function(nextLevelPath) {
			let cMetadataGroupForResourceLinkGroup = getMetadataById("metadataGroupForResourceLinkGroup");
			let nextLevelChildReferences = cMetadataGroupForResourceLinkGroup
				.getFirstChildByNameInData('childReferences');
			nextLevelChildReferences.children.forEach(function(childReference) {
				createSpecAndInitalizeMetadataChildInitializer(childReference, nextLevelPath, spec.data);
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