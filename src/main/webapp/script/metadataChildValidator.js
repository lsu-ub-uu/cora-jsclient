/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2016 Uppsala University Library
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
	cora.metadataChildValidator = function(childReferenceIn, path, dataIn, metadataProvider, pubSub) {
		// var result = true;
		var result = {
			"booleanResult" : true,
			"containsValuableData" : false
		};
		var childReference = CORA.coraData(childReferenceIn);
		var data = CORA.coraData(dataIn);

		var ref = childReference.getFirstAtomicValueByNameInData('ref');
		var nameInData = getNameInDataForMetadataId(ref);
		var attributes = getAttributesForMetadataId(ref);
		var dataChildrenForMetadata = getDataChildrenForMetadata(nameInData, attributes);

		validateChild();

		function getNameInDataForMetadataId(refIn) {
			var metadataElement = getMetadataById(refIn);
			return metadataElement.getFirstAtomicValueByNameInData("nameInData");
		}

		function getAttributesForMetadataId(refIn) {
			var metadataElement = getMetadataById(refIn);
			if (metadataElement.containsChildWithNameInData("attributeReferences")) {
				return getAttributesForMetadataElement(metadataElement);
			}
			return undefined;
		}

		function getAttributesForMetadataElement(metadataElement) {
			var attributesOut = createAttributes();
			var attributeReferences = metadataElement
					.getFirstChildByNameInData("attributeReferences");
			var attributeReference;
			for (var i = 0; i < attributeReferences.children.length; i++) {
				attributeReference = attributeReferences.children[i];
				var attribute = getAttributeForAttributeReference(attributeReference, i);
				attributesOut.children.push(attribute);
			}
			return attributesOut;
		}

		function createAttributes() {
			return {
				"name" : "attributes",
				"children" : []
			};
		}

		function getAttributeForAttributeReference(attributeReference, index) {
			var attributeMetadata = getMetadataById(attributeReference.value);
			var attributeNameInData = attributeMetadata
					.getFirstAtomicValueByNameInData("nameInData");
			var finalValue = attributeMetadata.getFirstAtomicValueByNameInData("finalValue");

			return createAttributeWithNameAndValueAndRepeatId(attributeNameInData, finalValue,
					index);

		}

		function createAttributeWithNameAndValueAndRepeatId(attributeName, attributeValue, repeatId) {
			return {
				"name" : "attribute",
				"repeatId" : repeatId || "1",
				"children" : [ {
					"name" : "attributeName",
					"value" : attributeName
				}, {
					"name" : "attributeValue",
					"value" : attributeValue
				} ]
			};
		}

		function getDataChildrenForMetadata(nameInDataIn, attributesIn) {
			var dataChildrenForMetadataOut = [];
//			if (data.containsChildWithNameInDataAndAttributes(nameInDataIn, attributesIn)) {
				dataChildrenForMetadataOut = data.getChildrenByNameInDataAndAttributes(
						nameInDataIn, attributesIn);
//			}
			return dataChildrenForMetadataOut;
		}

		function validateChild() {
			// if (childCanRepeat()) {
			validateRepeatingChild();
			// } else {
			// validateNonRepeatingChild();
			// }
		}

		function validateRepeatingChild() {
//			var generatedRepeatId = calculateStartRepeatId();
			var noOfChildrenToValidate = calculateMinRepeat();
			var childValidationResults = [];
			var childrenCanNotBeRemoved = [];
			var childrenCanBeRemoved = [];
			var numberOfChildrenOk = 0;
			for (var index = 0; index < noOfChildrenToValidate; index++) {
				var childValidationResult = validateRepeatingChildInstanceWithData(index);
				if (childValidationResult.containsValuableData) {
					result.containsValuableData = true;
				}

				// console.log("here")
				// if (Object.keys(childValidationResult).length > 0) {
				if (childValidationResult.booleanResult) {
					numberOfChildrenOk++;
				} else {
					// data saknas, någonstans under
					if (childValidationResult.containsValuableData) {
						childrenCanNotBeRemoved.push(childValidationResult);
						result.booleanResult = false;
					} else {
						childrenCanBeRemoved.push(childValidationResult);
					}
					// if(undefined !==childValidationResult.validationMessage){
					// //have validation message (empty data)
					// childValidationResults.push(childValidationResult.validationMessage);
					// }else{
					//						
					// result.booleanResult = false;
					// }
				}
			}
			// console.log("numberOfChildrenOk:" + numberOfChildrenOk)
			// console.log("nameInData:" + nameInData)
			// if (childValidationResults.length > 0) {
			// if (childrenCanBeRemoved.length > 0) {
			var childrenNotRemovable = numberOfChildrenOk + childrenCanNotBeRemoved.length;
			var noChildrenNeededForRepeatMin = calculateNeededNoChildrenForRepeatMin(childrenNotRemovable);

			// console.log("childrenCanBeRemoved:"+JSON.stringify(childrenCanBeRemoved))
			sendRemoveForEmptyChildren(childrenCanBeRemoved, noChildrenNeededForRepeatMin);
			// console.log("childrenCanBeRemoved2:"+JSON.stringify(childrenCanBeRemoved))
			if (childrenCanBeRemoved.length > 0) {

				result.booleanResult = false;
			}
			sendValidationErrorToEmptyChildren(childrenCanNotBeRemoved);

			// children that can be removed and are left
			sendValidationErrorToEmptyChildren(childrenCanBeRemoved);

			// TODO: figure out boolean result.....

			// if (atLeastRepeatMin(childrenNotRemovable)) {
			// console.log("atLeastRepeatMin: true")
			// // removeEmptyChildren(childValidationResults);
			// removeEmptyChildren(childrenCanBeRemoved);
			// } else {
			// console.log("atLeastRepeatMin: false")
			// sendValidationErrorToEmptyChildren(childValidationResults);
			// // result = false;
			// result.booleanResult = false;
			// }
			// }
		}
		function calculateNeededNoChildrenForRepeatMin(childrenNotRemovable) {
			var repeatMin = Number(childReference.getFirstAtomicValueByNameInData("repeatMin"));
			return repeatMin - childrenNotRemovable;
		}

		function sendRemoveForEmptyChildren(childrenCanBeRemoved, noChildrenNeededForRepeatMin) {
			if (noChildrenNeededForRepeatMin < 1) {
				// no need to keep any children to reach minREpeat
				childrenCanBeRemoved.forEach(function(errorMessage) {
					sendRemoveForEmptyChild(errorMessage);
					childrenCanBeRemoved.shift();

				});
				// childrenCanBeRemoved = [];
			} else {
				// remove "extra" children (total -noChildrenNeededForRepeatMin)
				// for...
				var noToRemove = childrenCanBeRemoved.length - noChildrenNeededForRepeatMin;
				for (var i = 0; i < noToRemove; i++) {
					sendRemoveForEmptyChild(childrenCanBeRemoved.pop());
				}
			}
		}

		function sendRemoveForEmptyChild(errorMessage) {
			var removeMessage = {
				"type" : "remove",
				"path" : errorMessage.validationMessage.path
			};
			pubSub.publish("remove", removeMessage);
		}

		function sendValidationErrorToEmptyChildren(childValidationResults) {
			childValidationResults.forEach(function(errorMessage) {
				if (errorMessage.sendValidationMessages) {
					sendValidationErrorToEmptyChild(errorMessage.validationMessage);
				}
			});
		}

		function sendValidationErrorToEmptyChild(errorMessage) {
			pubSub.publish("validationError", errorMessage);
		}



		function calculateMinRepeat() {
			var repeatMin = childReference.getFirstAtomicValueByNameInData("repeatMin");
//			if (hasData()) {
				var noOfData = dataChildrenForMetadata.length;
				if (noOfData > repeatMin) {
					repeatMin = noOfData;
				}
//			}
			return repeatMin;
		}

		function validateRepeatingChildInstanceWithData(index) {
			var dataChild = dataChildrenForMetadata[index];
			var repeatId = dataChild.repeatId;
			return validateForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId);
		}


		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}


		function validateForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId) {
			return CORA.metadataRepeatValidator(ref, path, dataChild, repeatId, metadataProvider,
					pubSub);
			// if(!repeatResult){
			// result = false;
			// }
		}

		return result;
	};
	return cora;
}(CORA));