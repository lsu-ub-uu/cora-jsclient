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
	cora.metadataRepeatValidator = function(metadataId, path, dataHolder, data, repeatId, metadataProvider,
		pubSub) {
		let result = {
			everythingOkBelow: true,
			containsValuableData: false
		};
		let cMetadataElement;
		let attributeValidationResults = [];

		const start = function() {
//			console.log("metadataRepeatValidator| metadataId: "+ metadataId + " repeatId:"+repeatId);
//			console.log("metadata: ", JSON.stringify( metadataProvider.getMetadataById(metadataId)));
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
//			if (result.everythingOkBelow) {
//pubSub.publish("validationError", "****************************************");
				for (let attributeValidationResult of attributeValidationResults) {
					if (!attributeValidationResult.everythingOkBelow) {
//			if (result.containsValuableData) {
						result.everythingOkBelow = false;
//			}
						//result.validationMessage = attributeValidationResult.validationMessage;
						//result.sendValidationMessages = true;
//						console.log("AAARRRCHHHKLJ", pubSub);
//						console.log("attributeValidationResult2", attributeValidationResult.validationMessage);
						pubSub.publish("validationError", attributeValidationResult.validationMessage);
					}
				}
//			}
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
			//we have attributes
			let attributeReferences = cMetadataElement.getFirstChildByNameInData("attributeReferences");
			for (let attributeReference of attributeReferences.children) {
				let attributeRef = getRefValueFromAttributeRef(attributeReference);
//				console.log("attributeRef",attributeRef);
				validateAttribute(attributeRef);
			}
		};

		const getRefValueFromAttributeRef = function(attributeReference) {
			let cAttributeReference = CORA.coraData(attributeReference);
			return cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const validateAttribute = function(attributeRef) {
			let attributePath = createNextLevelPathAttribute(attributeRef);
//				console.log("attributePath",attributePath);
			let attributeData = dataHolder.findContainer(attributePath);
//				console.log("attributeData",attributeData);
			let attributeValidationResult =
				CORA.metadataRepeatValidator(attributeRef, attributePath, dataHolder,
					attributeData, undefined, metadataProvider, pubSub);
			attributeValidationResults.push(attributeValidationResult);
			//			console.log("attributeRef", attributeRef);
			//			console.log("attributePath: ", attributePath);
			//
			//			let dependencies = {
			//				metadataProvider: metadataProvider,
			//				pubSub: pubSub
			//			};
			//			let spec = {
			//				path: attributePath,
			//				childReference: attributeRef,
			//				dataHolder: dataHolder
			//			};
			//
			//
			//			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);
			//			let attributeValidationResult = metadataChildValidator.validate();
			//			attributeValidationResults.push(attributeValidationResult);
//			console.log("attributeValidationResult", attributeValidationResult);

		};

		const createNextLevelPathAttribute = function(attributeRef) {
			let pathSpec = {
				metadataIdToAdd: attributeRef,
				parentPath: path,
				type: "attribute"
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};
		//		const createNextLevelPath = function() {
		//			let pathSpec = {
		//				metadataIdToAdd: metadataId,
		//				repeatId: repeatId,
		//				parentPath: path,
		//				type: "attribute"
		//			};
		//			return CORA.calculatePathForNewElement(pathSpec);
		//		};

		const validateForMetadata = function() {
			if (isGroup()) {
				validateMetadataGroup(path);
			} else if (isRecordLink()) {
				validateMetadataRecordLink(path);
			} else {
				validateVariableValue(path);
			}
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


		//		const createNextLevelPath = function() {
		//			let pathSpec = {
		//				metadataIdToAdd: metadataId,
		//				//				metadataIdToAdd: meta,
		//				repeatId: repeatId,
		//				parentPath: path
		//			};
		//			return CORA.calculatePathForNewElement(pathSpec);
		//		};

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
			//			console.log("createRefWithRef", JSON.stringify(recordIdStaticChildReference));
			validateChild(recordIdStaticChildReference, nextLevelPath);
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
				validateChild(recordTypeStaticChildReference, nextLevelPath);
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
			//			console.log("HERE", data.value);
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
				//				console.log("validateCollectionVariable data", data.value);
				return finalValue === data.value;
			}

			return collectionItemReferences.children.some(isItemDataValue);
		};

		const getCollectionItemReferences = function() {
			//			console.log("cMetadataElement: ",cMetadataElement.getData());
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
			result = {
				everythingOkBelow: false,
				containsValuableData: false,
				validationMessage: message,
				sendValidationMessages: true
			};
		};
		return start();
		//		return result;

	}
	return cora;
}(CORA));