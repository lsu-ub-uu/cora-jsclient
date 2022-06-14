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

		const createNextLevelPath = function(repeatId) {
			let pathSpec = {
				//				metadataIdToAdd: metadataId,
				metadataIdToAdd: ref,
				repeatId: repeatId,
				parentPath: path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const getDataChildrenForMetadata = function(metadataId) {
			//TODO: new method get all with from path with metadataId 
			let foundContainers = dataHolder.findContainersUsingPathAndMetadataId(path, metadataId);
			console.log("***foundConatiners", foundContainers + ", path: "+path+" metadataId: "+metadataId);
			return foundContainers;
		};

		const validateAndCategorizeChildInstances = function() {
			console.log("!!!XXX!!! noOfRepeatsForThisChild: ", noOfRepeatsForThisChild);
			for (let index = 0; index < noOfRepeatsForThisChild; index++) {
			console.log("!!!XXX!!!---- noOfRepeatsForThisChild: ", index);
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
			
			let validateResult = validateForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId);
			console.log("validateResult object", validateResult);
			
			return validateResult;
		};

//		const getMetadataById = function(id) {
//			return CORA.coraData(metadataProvider.getMetadataById(id));
//		};

		const validateForMetadataWithIdAndDataAndRepeatId = function(dataChild, repeatId) {
			let nextPath = createNextLevelPath(repeatId);
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