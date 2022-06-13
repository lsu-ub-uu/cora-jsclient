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
		//		let cData = CORA.coraData(spec.dataHolder.getData());
		let dataHolder = spec.dataHolder;
		let dataChildrenForMetadata;
		let noOfRepeatsForThisChild;
		let childInstancesCanNotBeRemoved = [];
		let childInstancesCanBeRemoved = [];
		let numberOfChildrenOk = 0;
		let childReference = CORA.coraData(spec.childReference);
		let cRef = CORA.coraData(childReference.getFirstChildByNameInData("ref"));
		let ref = cRef.getFirstAtomicValueByNameInData("linkedRecordId");

		const validate = function() {
			//			let nameInData = getNameInDataForMetadataId(ref);
			//			let attributes = getAttributesForMetadataId(ref);
			//			dataChildrenForMetadata = getDataChildrenForMetadata(nameInData, attributes);
			//			possiblyCheckAttributes(ref);
			dataChildrenForMetadata = getDataChildrenForMetadata(ref);
			noOfRepeatsForThisChild = calculateMinRepeat();

			validateAndCategorizeChildInstances();
			return result;
		};

		const possiblyValidateAttributes = function() {
			let metadataElement = getMetadataById(ref);
			if (metadataElement.containsChildWithNameInData("attributeReferences")) {
				//we have attributes
				//				return getAttributesForMetadataElement(metadataElement);
				let attributeReferences = metadataElement
					.getFirstChildByNameInData("attributeReferences");
				let attributeReference;
				for (let i = 0; i < attributeReferences.children.length; i++) {
					attributeReference = attributeReferences.children[i];
					//					let attribute = getAttributeForAttributeReference(attributeReference, i);
					//					attributesOut.children.push(attribute);
					let attributeRef = getRefValueFromAttributeRef(attributeReference);
					console.log("attributeRef", attributeRef);


					//					let pathSpec = {
					//						metadataIdToAdd: attributeRef,
					//						parentPath: createNextLevelPath(),
					//						type: "attribute"
					//					};
					let attributePath = createNextLevelPathAttribute(attributeRef);
					console.log("attributePath: ", attributePath);

					let dataChild = dataHolder.findContainer(attributePath);
					let childInstanceValidationResult = CORA.metadataRepeatValidator(attributeRef, attributePath, dataHolder, dataChild, undefined,
						metadataProvider, pubSub);

					return childInstanceValidationResult;
					//					setValuableDataInResult(childInstanceValidationResult);
					//					categorizeChildInstance(childInstanceValidationResult);
				}
			}
			return [];
		}

		const createNextLevelPathAttribute = function(attributeRef) {
			let pathSpec = {
				metadataIdToAdd: attributeRef,
				//				repeatId: repeatId,
				parentPath: createNextLevelPath(),
				type: "attribute"
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};


		const getRefValueFromAttributeRef = function(attributeReference) {
			let cAttributeReference = CORA.coraData(attributeReference);
			return cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const createNextLevelPath = function() {
			let pathSpec = {
				//				metadataIdToAdd: metadataId,
				metadataIdToAdd: ref,
				repeatId: spec.repeatId,
				parentPath: path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};
		//		const getNameInDataForMetadataId = function(refIn) {
		//			let metadataElement = getMetadataById(refIn);
		//			return metadataElement.getFirstAtomicValueByNameInData("nameInData");
		//		};
		//
		//		const getAttributesForMetadataId = function(refIn) {
		//			let metadataElement = getMetadataById(refIn);
		//			if (metadataElement.containsChildWithNameInData("attributeReferences")) {
		//				return getAttributesForMetadataElement(metadataElement);
		//			}
		//			return undefined;
		//		};

		//		const getAttributesForMetadataElement = function(metadataElement) {
		//			let attributesOut = createAttributes();
		//			let attributeReferences = metadataElement
		//				.getFirstChildByNameInData("attributeReferences");
		//			let attributeReference;
		//			for (let i = 0; i < attributeReferences.children.length; i++) {
		//				attributeReference = attributeReferences.children[i];
		//				let attribute = getAttributeForAttributeReference(attributeReference, i);
		//				attributesOut.children.push(attribute);
		//			}
		//			return attributesOut;
		//		};

		//		const createAttributes = function() {
		//			return {
		//				"name": "attributes",
		//				"children": []
		//			};
		//		};
		//
		//		const getAttributeForAttributeReference = function(attributeReference, index) {
		//			let attributeRef = getRefValueFromAttributeRef(attributeReference);
		//			let attributeMetadata = getMetadataById(attributeRef);
		//			let attributeNameInData = attributeMetadata
		//				.getFirstAtomicValueByNameInData("nameInData");
		//			//			let finalValue = attributeMetadata.getFirstAtomicValueByNameInData("finalValue");
		//
		//			let finalValue = [];
		//			if (attributeMetadata.containsChildWithNameInData("finalValue")) {
		//				finalValue = attributeMetadata.getFirstAtomicValueByNameInData("finalValue");
		//			} else {
		//
		//				//TODO:Spike, we need to loop attribute choices to find matching data
		//				let possibleAttributeValues = [];
		//				let refCollection = attributeMetadata.getFirstChildByNameInData("refCollection");
		//				let collectionId = CORA.coraData(refCollection).getFirstAtomicValueByNameInData("linkedRecordId");
		//				let cCollection = getMetadataById(collectionId);
		//				let colItemRefs = cCollection.getFirstChildByNameInData("collectionItemReferences");
		//				let allRefs = CORA.coraData(colItemRefs).getChildrenByNameInData("ref");
		//				allRefs.forEach(function(colItemRef) {
		//					let linkedId = CORA.coraData(colItemRef).getFirstAtomicValueByNameInData("linkedRecordId");
		//					let cItem = getMetadataById(linkedId);
		//					let value = cItem.getFirstAtomicValueByNameInData("nameInData");
		//					possibleAttributeValues.push(value);
		//				});
		//				finalValue = possibleAttributeValues;
		//			}
		//			return createAttributeWithNameAndValueAndRepeatId(attributeNameInData, finalValue,
		//				index);
		//		};

		//		const getRefValueFromAttributeRef = function(attributeReference) {
		//			let cAttributeReference = CORA.coraData(attributeReference);
		//			return cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
		//		};
		//
		//		const createAttributeWithNameAndValueAndRepeatId = function(attributeName, attributeValue, repeatId) {
		//			return {
		//				"name": "attribute",
		//				"repeatId": repeatId || "1",
		//				"children": [{
		//					"name": "attributeName",
		//					"value": attributeName
		//				}, {
		//					"name": "attributeValue",
		//					"value": attributeValue
		//				}]
		//			};
		//		};

		//		const getDataChildrenForMetadata = function(nameInDataIn, attributesIn) {
		//			if (!cData.containsChildWithNameInDataAndAttributes(nameInDataIn, attributesIn)) {
		//				return [];
		//			}
		//			return cData.getChildrenByNameInDataAndAttributes(nameInDataIn, attributesIn);
		//		};

		const getDataChildrenForMetadata = function(metadataId) {
			//TODO: new method get all with from path with metadataId 
			let foundContainers = dataHolder.findContainersUsingPathAndMetadataId(path, metadataId);
			console.log("foundConatiners", foundContainers);
			return foundContainers;
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
				type: "remove",
				path: errorMessage.validationMessage.path
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
			console.log("dataChildrenForMetadata", dataChildrenForMetadata)
			let dataChild = dataChildrenForMetadata[index];
			let repeatId = dataChild.repeatId;
			let attributeValidationResult = possiblyValidateAttributes();
			setValuableDataInResult(attributeValidationResult);
			categorizeChildInstance(attributeValidationResult);
			return validateForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId);
			//			return attributeValidationResult.concat(dataValidationResult);
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const validateForMetadataWithIdAndDataAndRepeatId = function(dataChild, repeatId) {
			let nextPath = createNextLevelPath();
			return CORA.metadataRepeatValidator(ref, nextPath, dataHolder, dataChild, repeatId, metadataProvider,
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