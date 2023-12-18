/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016 Olov McKie
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
	cora.metadataHelper = function(spec) {

		function getMetadataById(id) {
			return CORA.coraData(spec.metadataProvider.getMetadataById(id));
		}

		function collectAttributesAsObjectForMetadataId(metadataId) {
			var cMetadataElement = getMetadataById(metadataId);
			if (hasNoAttributes(cMetadataElement)) {
				return {};
			}
			return collectAttributesFromMetadata(cMetadataElement);

		}

		function hasNoAttributes(cMetadataElement) {
			return !cMetadataElement.containsChildWithNameInData("attributeReferences");
		}

		function collectAttributesFromMetadata(cMetadataElement) {
			var collectedAttributes = {};
			var attributeReferences = cMetadataElement
					.getFirstChildByNameInData("attributeReferences");
			attributeReferences.children.forEach(function(attributeReference) {
				collectAttributesForAttributeReference(attributeReference, collectedAttributes);
			});
			return collectedAttributes;
		}

		function collectAttributesForAttributeReference(attributeReference, collectedAttributes) {
			var ref = getRefValueFromAttributeRef(attributeReference);
			var cCollectionVariable = getMetadataById(ref);
			var attributeNameInData = cCollectionVariable
					.getFirstAtomicValueByNameInData("nameInData");
			var attributeValues = collectAttributeValuesFromVariable(cCollectionVariable);
			collectedAttributes[attributeNameInData] = attributeValues;
		}

		function getRefValueFromAttributeRef(attributeReference){
			var cAttributeReference = CORA.coraData(attributeReference);
			return cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function collectAttributeValuesFromVariable(cCollectionVariable) {
			if (variableHasFinalValue(cCollectionVariable)) {
				return getFinalValueFromVariable(cCollectionVariable);
			}
			return getAllValuesFromVariable(cCollectionVariable);
		}

		function variableHasFinalValue(cCollectionVariable) {
			return cCollectionVariable.containsChildWithNameInData("finalValue");
		}

		function getFinalValueFromVariable(cCollectionVariable) {
			return [ cCollectionVariable.getFirstAtomicValueByNameInData("finalValue") ];
		}

		function getAllValuesFromVariable(cCollectionVariable) {
			var attributeValues = [];
			var collectionItemReferences = getCollectionItemReferencesFor(cCollectionVariable);
			collectionItemReferences.children.forEach(function(collectionItemRef) {
				attributeValues.push(getCollectionItemValue(collectionItemRef));
			});
			return attributeValues;
		}

		function getCollectionItemValue(collectionItemRef) {
			var cItemRef = CORA.coraData(collectionItemRef);
			var itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;
			var cCollectionItem = getMetadataById(itemRefId);
			return cCollectionItem.getFirstAtomicValueByNameInData("nameInData");
		}

		function getCollectionItemReferencesFor(cCollectionVariable) {
			var cAttributeRefCollection = CORA.coraData(cCollectionVariable
					.getFirstChildByNameInData("refCollection"));

			var attributeRefCollectionId = cAttributeRefCollection
					.getFirstAtomicValueByNameInData("linkedRecordId");
			var cAttributeItemCollection = getMetadataById(attributeRefCollectionId);
			return cAttributeItemCollection.getFirstChildByNameInData("collectionItemReferences");
		}

		function getChildRefPartOfMetadata(cMetadata, metadataIdToFind) {
//			console.log("----- start -----")
			var cMetadataToFind = getMetadataById(metadataIdToFind);
			var nameInDataToFind = cMetadataToFind.getFirstAtomicValueByNameInData("nameInData");
			var attributesToFind = collectAttributesAsObjectForMetadataId(metadataIdToFind);

			var findFunction = function(metadataChildRef) {
				var childMetadataId = getMetadataIdFromRef(metadataChildRef);
				var childAttributes = collectAttributesAsObjectForMetadataId(childMetadataId);
				var childNameInData = getNameInDataFromMetadataChildRef(metadataChildRef);
				return childNameInData === nameInDataToFind
						&& firstAttributesExistsInSecond(childAttributes, attributesToFind);
//				console.log("attributesToFind: ", attributesToFind)
//				console.log("childAttributes: ", childAttributes)
//				return childNameInData === nameInDataToFind
//						&& firstAttributesExistsInSecond(attributesToFind, childAttributes);
			}; 

			var children = cMetadata.getFirstChildByNameInData("childReferences").children;
			var parentMetadataChildRef = children.find(findFunction);
//			console.log("----- end -----")
			return CORA.coraData(parentMetadataChildRef);
		}

		function getMetadataIdFromRef(metadataChildRef) {
			var cMetadataChildRef = CORA.coraData(metadataChildRef);
			var cRef = CORA.coraData(cMetadataChildRef.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getNameInDataFromMetadataChildRef(metadataChildRef) {
			var childMetadataId = getMetadataIdFromRef(metadataChildRef);
			var cChildMetadata = getMetadataById(childMetadataId);
			return cChildMetadata.getFirstAtomicValueByNameInData("nameInData");
		}

		function firstAttributesExistsInSecond(attributes1, attributes2) {
			var attributeKeys1 = attributes1 !== undefined ? Object.keys(attributes1) : Object
					.keys({});
			var attributeKeys2 = attributes2 !== undefined ? Object.keys(attributes2) : Object
					.keys({});

			if (notSameNumberOfKeys(attributeKeys1, attributeKeys2)) {
				return false;
			}
			if (noAttributesToCompare(attributeKeys1)) {
				return true;
			}
			return existingFirstAttributesExistsInSecond(attributes1, attributes2);
		}

		function notSameNumberOfKeys(attributeKeys1, attributeKeys2) {
			if (attributeKeys1.length !== attributeKeys2.length) {
				return true;
			}
			return false;
		}

		function noAttributesToCompare(attributeKeys1) {
			if (attributeKeys1.length === 0) {
				return true;
			}
			return false;
		}

		function existingFirstAttributesExistsInSecond(attributes1, attributes2) {
			var attributeKeys1 = Object.keys(attributes1);
			var checkAttributeExistsInAttributes2 = createCheckFunction(attributes1, attributes2);
			return attributeKeys1.every(checkAttributeExistsInAttributes2);
		}

		function createCheckFunction(attributes1, attributes2) {
			return function(attributeKey) {
				var attributeValues1 = attributes1[attributeKey];
				var attributeValues2 = attributes2[attributeKey];
				if (attributeValues2 === undefined) {
					return false;
				}
				var functionAttribute2ContainsValue = createValueCheckFunction(attributeValues2);
				return attributeValues1.every(functionAttribute2ContainsValue);
			};
		}

		function createValueCheckFunction(attributeValues2) {
			return function(attributeValue) {
				return attributeValues2.indexOf(attributeValue) > -1;
			};
		}

		return Object.freeze({
			collectAttributesAsObjectForMetadataId : collectAttributesAsObjectForMetadataId,
			getChildRefPartOfMetadata : getChildRefPartOfMetadata,
			firstAttributesExistsInSecond : firstAttributesExistsInSecond
		});
	};
	return cora;
}(CORA));