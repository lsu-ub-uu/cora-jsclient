/*
 * Copyright 2015, 2020 Olov McKie
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
	cora.metadataRepeatValidator = function(metadataId, path, data, repeatId, metadataProvider,
		pubSub) {
		let result = {
			"everythingOkBelow": true,
			"containsValuableData": false
		};
		let cMetadataElement;
		
		const start = function() {
			cMetadataElement = getMetadataById(metadataId);
			validateRepeat();
		}

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const validateRepeat = function() {
			validateForMetadata();
		};

		const hasAttributes = function() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		};

		const validateForMetadata = function() {
			let nextLevelPath = createNextLevelPath();
			if (isGroup()) {
				validateMetadataGroup(nextLevelPath);
			} else if (isRecordLink()) {
				validateMetadataRecordLink(nextLevelPath);
			} else {
				validateVariableValue(nextLevelPath);
			}
		};

		const createNextLevelPath = function() {
			let nextLevelPathPart = createNextLevelPathPart();

			if (incomingPathIsEmpty()) {
				return nextLevelPathPart;
			}

			let pathCopy = JSON.parse(JSON.stringify(path));
			let lowestPath = findLowestPath(pathCopy);
			lowestPath.children.push(nextLevelPathPart);
			return pathCopy;
		};

		const createNextLevelPathPart = function() {
			let childPathPart = createLinkedPathWithNameInData();

			if (hasRepeatId()) {
				childPathPart.children.push(createRepeatId());
			}

			if (hasAttributes()) {
				childPathPart.children.push(createAttributes());
			}
			return childPathPart;
		};

		const createLinkedPathWithNameInData = function() {
			let nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
			return {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": nameInData
				}]
			};
		};

		const hasRepeatId = function() {
			return repeatId !== undefined;
		};

		const createRepeatId = function() {
			return {
				"name": "repeatId",
				"value": repeatId
			};
		};

		const createAttributes = function() {
			let attributes = {
				"name": "attributes",
				"children": []
			};
			let attributeReferences = cMetadataElement
				.getFirstChildByNameInData('attributeReferences');
			let attributeNo = 1;
			attributeReferences.children.forEach(function(attributeReference) {
				attributes.children.push(createAttributeWithAttributeAndRepeatId(
					attributeReference, String(attributeNo)));
				attributeNo++;
			});
			return attributes;
		};

		const createAttributeWithAttributeAndRepeatId = function(attributeReference, attributeRepeatId) {
			let ref = getRefValueFromAttributeRef(attributeReference);
			let attribute = getMetadataById(ref);
			let attributeName = attribute.getFirstAtomicValueByNameInData('nameInData');
			let attributeValue = attribute.getFirstAtomicValueByNameInData('finalValue');
			return {
				"name": "attribute",
				"repeatId": attributeRepeatId,
				"children": [{
					"name": "attributeName",
					"value": attributeName
				}, {
					"name": "attributeValue",
					"value": attributeValue
				}]
			};
		};

		const getRefValueFromAttributeRef = function(attributeReference) {
			let cAttributeReference = CORA.coraData(attributeReference);
			return cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const incomingPathIsEmpty = function() {
			return path.name === undefined;
		};

		const findLowestPath = function(pathToSearch) {
			let coraPath = CORA.coraData(pathToSearch);
			if (coraPath.containsChildWithNameInData("linkedPath")) {
				return findLowestPath(coraPath.getFirstChildByNameInData("linkedPath"));
			}
			return pathToSearch;
		};

		const isGroup = function() {
			let type = cMetadataElement.getData().attributes.type;
			return type === "group";
		};

		const validateMetadataGroup = function(nextLevelPath) {
			let nextLevelChildReferences = cMetadataElement
				.getFirstChildByNameInData('childReferences');
			nextLevelChildReferences.children.forEach(function(childReference) {
				validateGroupChild(childReference, nextLevelPath);
			});

			if (!result.containsValuableData) {
				result.everythingOkBelow = false;
			}
		};

		const validateGroupChild = function(childReference, nextLevelPath) {
			validateChild(childReference, nextLevelPath, data);
		};
		const validateChild = function(childReference, nextLevelPath, childData) {
			let dependencies = {
				metadataProvider: metadataProvider,
				pubSub: pubSub
			};
			let spec = {
				path: nextLevelPath,
				childReference: childReference,
				data: childData
			};
			//			let childResult = CORA.metadataChildValidator(childReference, nextLevelPath, childData,
			//				metadataProvider, pubSub);
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);
			let childResult = metadataChildValidator.validate();
			if (!childResult.everythingOkBelow) {
				result.everythingOkBelow = false;
			}
			if (childResult.containsValuableData) {
				result.containsValuableData = true;
			}
			result.validationMessage = {
				"metadataId": metadataId,
				"path": nextLevelPath
			};
			result.sendValidationMessages = false;
		};

		const isRecordLink = function() {
			let type = cMetadataElement.getData().attributes.type;
			return type === "recordLink";
		};

		const validateMetadataRecordLink = function(nextLevelPath) {
			validateLinkedRecordId(nextLevelPath);
			possiblyValidateLinkedRepeatId(nextLevelPath);

		};

		const validateLinkedRecordId = function(nextLevelPath) {
			let recordIdStaticChildReference = createRefWithRef("linkedRecordIdTextVar");
			validateChild(recordIdStaticChildReference, nextLevelPath, data);
		};

		const createRefWithRef = function(ref) {
			return {
				"name": "childReference",
				"repeatId": 1,
				"children": [{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadata"
					}, {
						"name": "linkedRecordId",
						"value": ref
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}]
			};
		};

		const possiblyValidateLinkedRepeatId = function(nextLevelPath) {
			if (isLinkToRepeatingPartOfRecord()) {
				let recordTypeStaticChildReference = createRefWithRef("linkedRepeatIdTextVar");
				validateChild(recordTypeStaticChildReference, nextLevelPath, data);
			}
		};

		const isLinkToRepeatingPartOfRecord = function() {
			return cMetadataElement.containsChildWithNameInData("linkedPath");
		};

		const validateVariableValue = function(nextLevelPath) {
			let hasFinalValue = cMetadataElement.containsChildWithNameInData("finalValue");
			if (dataIsValid()) {
				handleValidData(hasFinalValue, result);
			} else {
				handleInvalidData(nextLevelPath);
			}
		};
		const dataIsValid = function() {
			let type = cMetadataElement.getData().attributes.type;
			if (type === "textVariable") {
				return validateTextVariable();
			}
			if (type === "numberVariable") {
				return validateNumberVariable();
			}
			return validateCollectionVariable();
		};

		const validateTextVariable = function() {
			let regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");
			return new RegExp(regEx).test(data.value);
		};

		const validateNumberVariable = function() {
			let validator = CORA.numberVariableValidator({
				"metadataProvider": metadataProvider,
			});
			return validator.validateData(data.value, cMetadataElement);
		};

		const validateCollectionVariable = function() {
			let collectionItemReferences = getCollectionItemReferences();
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				let finalValue = cMetadataElement.getFirstAtomicValueByNameInData("finalValue");
				return finalValue === data.value;
			}

			return collectionItemReferences.children.some(isItemDataValue);
		};

		const getCollectionItemReferences = function() {
			let cRefCollection = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("refCollection"));

			let refCollectionId = cRefCollection.getFirstAtomicValueByNameInData("linkedRecordId");
			let cItemCollection = getMetadataById(refCollectionId);
			return cItemCollection.getFirstChildByNameInData("collectionItemReferences");
		};

		const isItemDataValue = function(collectionItemReference) {
			let cItemRef = CORA.coraData(collectionItemReference);
			let itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;
			let cCollectionItem = getMetadataById(itemRefId);
			let nameInData = cCollectionItem.getFirstAtomicValueByNameInData("nameInData");
			return nameInData === data.value;
		};

		const handleValidData = function(hasFinalValue, result) {
			if (hasFinalValue) {
				result.containsValuableData = false;
			} else {
				result.containsValuableData = true;
			}
		};

		const handleInvalidData = function(nextLevelPath) {
			let message = {
				"metadataId": metadataId,
				"path": nextLevelPath
			};
			result = {
				"everythingOkBelow": false,
				"containsValuableData": false,
				"validationMessage": message,
				"sendValidationMessages": true
			};
		};
		start();
		return result;

	}
	return cora;
}(CORA));