/*
 * Copyright 2015, 2016, 2024 Olov McKie
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
			dataChildrenForMetadata = getDataChildrenForMetadata(ref);
			noOfRepeatsForThisChild = calculateMinRepeat();
			validateAndCategorizeChildInstances();
			return result;
		};

		const getDataChildrenForMetadata = function(metadataId) {
			return dataHolder.findContainersUsingPathAndMetadataId(path, metadataId);
		};

		const calculateMinRepeat = function() {
			let repeatMin = childReference.getFirstAtomicValueByNameInData("repeatMin");
			let noOfData = dataChildrenForMetadata.length;
			if (noOfData > repeatMin) {
				repeatMin = noOfData;
			}
			return repeatMin;
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

		const validateRepeatingChildInstanceWithData = function(index) {
			let dataChild = dataChildrenForMetadata[index];
			let repeatId = dataChild.repeatId;
			return validateForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId);
		};

		const validateForMetadataWithIdAndDataAndRepeatId = function(dataChild, repeatId) {
			let nextPath = createNextLevelPath(repeatId);
			return CORA.metadataRepeatValidator(ref, nextPath, dataHolder, dataChild, repeatId, metadataProvider,
				pubSub);
		};

		const createNextLevelPath = function(repeatId) {
			let pathSpec = {
				metadataIdToAdd: ref,
				repeatId: repeatId,
				parentPath: path
			};
			return CORA.calculatePathForNewElement(pathSpec);
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
				console.log(childInstancesCanBeRemoved)
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
			});
			childrenCanBeRemoved.splice(0,childrenCanBeRemoved.length)
		};

		const removeExceedingEmptyChildren = function(childrenCanBeRemoved, noChildrenNeededForRepeatMin) {
			let noToRemove = childrenCanBeRemoved.length - noChildrenNeededForRepeatMin;
			for (let i = 0; i < noToRemove; i++) {
				let popped = childrenCanBeRemoved.pop();
				sendRemoveForEmptyChild(popped);
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