/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2016, 2020 Uppsala University Library
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
	cora.metadataChildValidator = function(dependencies, spec) {
		let metadataProvider = dependencies.metadataProvider;
		let pubSub = dependencies.pubSub;
		let path = spec.path;
		let result = {
			everythingOkBelow: true,
			containsValuableData: false
		};
		let cData = CORA.coraData(spec.data);
		let dataChildrenForMetadata;
		let noOfRepeatsForThisChild;
		let childInstancesCanNotBeRemoved = [];
		let childInstancesCanBeRemoved = [];
		let numberOfChildrenOk = 0;
		let childReference = CORA.coraData(spec.childReference);
		let cRef = CORA.coraData(childReference.getFirstChildByNameInData("ref"));
		let ref = cRef.getFirstAtomicValueByNameInData("linkedRecordId");

		const validate = function() {
			let nameInData = getNameInDataForMetadataId(ref);
			let attributes = getAttributesForMetadataId(ref);
			dataChildrenForMetadata = getDataChildrenForMetadata(nameInData, attributes);
			noOfRepeatsForThisChild = calculateMinRepeat();

			validateAndCategorizeChildInstances();
			return result;
		};

		const getNameInDataForMetadataId = function(refIn) {
			let metadataElement = getMetadataById(refIn);
			return metadataElement.getFirstAtomicValueByNameInData("nameInData");
		};

		const getAttributesForMetadataId = function(refIn) {
			let metadataElement = getMetadataById(refIn);
			if (metadataElement.containsChildWithNameInData("attributeReferences")) {
				return getAttributesForMetadataElement(metadataElement);
			}
			return undefined;
		};

		const getAttributesForMetadataElement = function(metadataElement) {
			let attributesOut = createAttributes();
			let attributeReferences = metadataElement
				.getFirstChildByNameInData("attributeReferences");
			let attributeReference;
			for (let i = 0; i < attributeReferences.children.length; i++) {
				attributeReference = attributeReferences.children[i];
				let attribute = getAttributeForAttributeReference(attributeReference, i);
				attributesOut.children.push(attribute);
			}
			return attributesOut;
		};

		const createAttributes = function() {
			return {
				"name": "attributes",
				"children": []
			};
		};

		const getAttributeForAttributeReference = function(attributeReference, index) {
			let attributeRef = getRefValueFromAttributeRef(attributeReference);
			let attributeMetadata = getMetadataById(attributeRef);
			let attributeNameInData = attributeMetadata
				.getFirstAtomicValueByNameInData("nameInData");
			let finalValue = attributeMetadata.getFirstAtomicValueByNameInData("finalValue");
			return createAttributeWithNameAndValueAndRepeatId(attributeNameInData, finalValue,
				index);
		};

		const getRefValueFromAttributeRef = function(attributeReference) {
			let cAttributeReference = CORA.coraData(attributeReference);
			return cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const createAttributeWithNameAndValueAndRepeatId = function(attributeName, attributeValue, repeatId) {
			return {
				"name": "attribute",
				"repeatId": repeatId || "1",
				"children": [{
					"name": "attributeName",
					"value": attributeName
				}, {
					"name": "attributeValue",
					"value": attributeValue
				}]
			};
		};

		const getDataChildrenForMetadata = function(nameInDataIn, attributesIn) {
			if (!cData.containsChildWithNameInDataAndAttributes(nameInDataIn, attributesIn)) {
				return [];
			}
			return cData.getChildrenByNameInDataAndAttributes(nameInDataIn, attributesIn);
		};

		const validateAndCategorizeChildInstances = function() {
			for (let index = 0; index < noOfRepeatsForThisChild; index++) {
				validateAndCategorizeChildInstance(index);
			}
			removeEmptyChildren();
			setEverythingOkBelowInResult();
			sendValidationErrors();
		};

		const validateAndCategorizeChildInstance = function(index) {
			let childInstanceValidationResult = validateRepeatingChildInstanceWithData(index);
			setValuableDataInResult(childInstanceValidationResult);
			updateNumberOfChildrenOk(childInstanceValidationResult);
			categorizeChildInstance(childInstanceValidationResult);
		};

		const setValuableDataInResult = function(childInstanceValidationResult) {
			if (childInstanceValidationResult.containsValuableData) {
				result.containsValuableData = true;
			}
		};

		const updateNumberOfChildrenOk = function(childInstanceValidationResult) {
			if (childInstanceValidationResult.everythingOkBelow) {
				numberOfChildrenOk++;
			}
		};

		const categorizeChildInstance = function(childInstanceValidationResult) {
			if (!childInstanceValidationResult.everythingOkBelow) {
				categorizeInvalidChildInstance(childInstanceValidationResult);
			}
		};

		const categorizeInvalidChildInstance = function(childInstanceValidationResult) {
			if (childInstanceValidationResult.containsValuableData) {
				childInstancesCanNotBeRemoved.push(childInstanceValidationResult);
				result.everythingOkBelow = false;
			} else {
				childInstancesCanBeRemoved.push(childInstanceValidationResult);
			}
		};

		const calculateNeededNoChildrenForRepeatMin = function(childrenNotRemovable) {
			let repeatMin = Number(childReference.getFirstAtomicValueByNameInData("repeatMin"));
			return repeatMin - childrenNotRemovable;
		};

		const sendRemoveForEmptyChildren = function(childrenCanBeRemoved, noChildrenNeededForRepeatMin) {
			if (allEmptyChildrenCanBeRemoved(noChildrenNeededForRepeatMin)) {
				removeAllEmptyChildren(childrenCanBeRemoved);
			} else {
				removeExceedingEmptyChildren(childrenCanBeRemoved, noChildrenNeededForRepeatMin);
			}
		};

		const removeEmptyChildren = function() {
			let childrenNotRemovable = numberOfChildrenOk + childInstancesCanNotBeRemoved.length;
			let noChildrenNeededForRepeatMin = calculateNeededNoChildrenForRepeatMin(childrenNotRemovable);
			sendRemoveForEmptyChildren(childInstancesCanBeRemoved, noChildrenNeededForRepeatMin);
		};

		const setEverythingOkBelowInResult = function() {
			if (childInstancesCanBeRemoved.length > 0) {
				result.everythingOkBelow = false;
			}
		};

		const sendValidationErrors = function() {
			sendValidationErrorToEmptyChildren(childInstancesCanNotBeRemoved);
			sendValidationErrorToEmptyChildren(childInstancesCanBeRemoved);
		};

		const allEmptyChildrenCanBeRemoved = function(noChildrenNeededForRepeatMin) {
			return noChildrenNeededForRepeatMin < 1;
		};

		const removeAllEmptyChildren = function(childrenCanBeRemoved) {
			childrenCanBeRemoved.forEach(function(errorMessage) {
				sendRemoveForEmptyChild(errorMessage);
				childrenCanBeRemoved.shift();
			});
		};

		const removeExceedingEmptyChildren = function(childrenCanBeRemoved, noChildrenNeededForRepeatMin) {
			let noToRemove = childrenCanBeRemoved.length - noChildrenNeededForRepeatMin;
			for (let i = 0; i < noToRemove; i++) {
				sendRemoveForEmptyChild(childrenCanBeRemoved.pop());
			}
		};

		const sendRemoveForEmptyChild = function(errorMessage) {
			let removeMessage = {
				"type": "remove",
				"path": errorMessage.validationMessage.path
			};
			pubSub.publish("remove", removeMessage);
		};

		const sendValidationErrorToEmptyChildren = function(childValidationResults) {
			childValidationResults.forEach(function(errorMessage) {
				if (errorMessage.sendValidationMessages) {
					sendValidationErrorToEmptyChild(errorMessage.validationMessage);
				}
			});
		};

		const sendValidationErrorToEmptyChild = function(errorMessage) {
			pubSub.publish("validationError", errorMessage);
		};

		const calculateMinRepeat = function() {
			let repeatMin = childReference.getFirstAtomicValueByNameInData("repeatMin");
			let noOfData = dataChildrenForMetadata.length;
			if (noOfData > repeatMin) {
				repeatMin = noOfData;
			}
			return repeatMin;
		};

		const validateRepeatingChildInstanceWithData = function(index) {
			let dataChild = dataChildrenForMetadata[index];
			let repeatId = dataChild.repeatId;
			return validateForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId);
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const validateForMetadataWithIdAndDataAndRepeatId = function(dataChild, repeatId) {
			return CORA.metadataRepeatValidator(ref, path, dataChild, repeatId, metadataProvider,
				pubSub);
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		return Object.freeze({
			type: "metadataChildValidator",
			getDependencies: getDependencies,
			getSpec: getSpec,
			validate: validate
		});
	};
	return cora;
}(CORA));