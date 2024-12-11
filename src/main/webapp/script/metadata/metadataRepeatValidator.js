/*
 * Copyright 2015, 2020, 2024 Olov McKie
 * Copyright 2020, 2024 Uppsala University Library
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
	cora.metadataRepeatValidator = function(metadataId, path, dataHolder, data, repeatId, metadataProvider,
		pubSub) {
		const result = {
			everythingOkBelow: true,
			containsValuableData: false
		};
		let cMetadataElement;
		let attributeValidationResults = [];

		const start = function() {
			cMetadataElement = getMetadataById(metadataId);
			validateRepeat();
			return result;
		}

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const validateRepeat = function() {
			possiblyValidateAttributes();
			validateForMetadata();
			for (let attributeValidationResult of attributeValidationResults) {
				if (!attributeValidationResult.everythingOkBelow) {
					result.everythingOkBelow = false;
					pubSub.publish("validationError", attributeValidationResult.validationMessage);
				}
			}
		};

		const possiblyValidateAttributes = function() {
			if (hasAttributes()) {
				validateAttributes();
			}
		};

		const hasAttributes = function() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		};

		const validateAttributes = function() {
			let attributeReferences = cMetadataElement.getFirstChildByNameInData("attributeReferences");
			for (let attributeReference of attributeReferences.children) {
				let attributeRef = getRefValueFromAttributeRef(attributeReference);
				validateAttribute(attributeRef);
			}
		};

		const getRefValueFromAttributeRef = function(attributeReference) {
			let cAttributeReference = CORA.coraData(attributeReference);
			return cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const validateAttribute = function(attributeRef) {
			let attributePath = createNextLevelPathAttribute(attributeRef);
			let attributeData = dataHolder.findContainer(attributePath);
			let attributeValidationResult =
				CORA.metadataRepeatValidator(attributeRef, attributePath, dataHolder,
					attributeData, undefined, metadataProvider, pubSub);
			attributeValidationResults.push(attributeValidationResult);
		};

		const createNextLevelPathAttribute = function(attributeRef) {
			let pathSpec = {
				metadataIdToAdd: attributeRef,
				parentPath: path,
				type: "attribute"
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const validateForMetadata = function() {
			if (isGroup()) {
				validateMetadataGroup(path);
			} else if (isRecordLink()) {
				validateMetadataRecordLink(path);
			} else if(isResourceLink()){
				validateResourceLink();
			}else {
				validateVariableValue(path);
			}
		};

		const isGroup = function() {
			let type = getTypeFromCMetadataElement();
			return type === "group";
		};

		const isResourceLink = function () {
			let type = getTypeFromCMetadataElement();
			return type === "resourceLink";
		};

		const getTypeFromCMetadataElement = function () {
			return cMetadataElement.getData().attributes.type;
		};

		const validateMetadataGroup = function(nextLevelPath) {
			let nextLevelChildReferences = cMetadataElement
				.getFirstChildByNameInData('childReferences');
			nextLevelChildReferences.children.forEach(function(childReference) {
				validateGroupChild(childReference, nextLevelPath);
				
//			console.log("validateGroup, childs",JSON.stringify(childReference));
//			console.log("validateGroup, childs",JSON.stringify(nextLevelPath));
			});

//			console.log(JSON.stringify(result));
			//Here might be the problem: Add && only one child with finalValue
			
			
			if (!result.containsValuableData) {
				result.everythingOkBelow = false;
			}
		};

		const validateGroupChild = function(childReference, nextLevelPath) {
			validateChild(childReference, nextLevelPath);
		};

		const validateChild = function(childReference, nextLevelPath) {
			let dependencies = {
				metadataProvider: metadataProvider,
				pubSub: pubSub
			};
			let spec = {
				path: nextLevelPath,
				childReference: childReference,
				//				data: childData
				dataHolder: dataHolder
			};
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);
			let childResult = metadataChildValidator.validate();
			if (!childResult.everythingOkBelow) {
				result.everythingOkBelow = false;
			}
			if (childResult.containsValuableData) {
				result.containsValuableData = true;
			}
			result.validationMessage = {
				metadataId: metadataId,
				path: nextLevelPath
			};
			result.sendValidationMessages = false;
		};

		const isRecordLink = function() {
			let type = getTypeFromCMetadataElement();
			return type === "recordLink";
		};

		const validateMetadataRecordLink = function(nextLevelPath) {
			validateLinkedRecordId(nextLevelPath);
			possiblyValidateLinkedRepeatId(nextLevelPath);
		};

		const validateLinkedRecordId = function(nextLevelPath) {
			let recordIdStaticChildReference = createRefWithRef("linkedRecordIdTextVar");
			validateChild(recordIdStaticChildReference, nextLevelPath);
		};

		const createRefWithRef = function(ref) {
			return {
				name: "childReference",
				repeatId: 1,
				children: [{
					name: "ref",
					children: [{
						name: "linkedRecordType",
						value: "metadata"
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

		const possiblyValidateLinkedRepeatId = function(nextLevelPath) {
			if (isLinkToRepeatingPartOfRecord()) {
				let recordTypeStaticChildReference = createRefWithRef("linkedRepeatIdTextVar");
				validateChild(recordTypeStaticChildReference, nextLevelPath);
			}
		};

		const isLinkToRepeatingPartOfRecord = function() {
			return cMetadataElement.containsChildWithNameInData("linkedPath");
		};

		const validateResourceLink = function () {
			result.containsValuableData = true;
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
			let type = getTypeFromCMetadataElement();
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
				metadataId: metadataId,
				path: nextLevelPath
			};
			result.everythingOkBelow = false;
			result.containsValuableData = false;
			result.validationMessage = message;
			result.sendValidationMessages = true;
		};
		return start();
	}
	return cora;
}(CORA));