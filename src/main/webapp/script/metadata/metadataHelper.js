/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2023 Olov McKie
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

		const getMetadataById = function(id) {
			return CORA.coraData(spec.metadataProvider.getMetadataById(id));
		};

		const collectAttributesAsObjectForMetadataId = function(metadataId) {
			let cMetadataElement = getMetadataById(metadataId);
			if (hasNoAttributes(cMetadataElement)) {
				return {};
			}
			return collectAttributesFromMetadata(cMetadataElement);

		};

		const hasNoAttributes = function(cMetadataElement) {
			return !cMetadataElement.containsChildWithNameInData("attributeReferences");
		};

		const collectAttributesFromMetadata = function(cMetadataElement) {
			let collectedAttributes = {};
			let attributeReferences = cMetadataElement
					.getFirstChildByNameInData("attributeReferences");
			attributeReferences.children.forEach(function(attributeReference) {
				collectAttributesForAttributeReference(attributeReference, collectedAttributes);
			});
			return collectedAttributes;
		};

		const collectAttributesForAttributeReference = function(attributeReference, collectedAttributes) {
			let ref = getRefValueFromAttributeRef(attributeReference);
			let cCollectionVariable = getMetadataById(ref);
			let attributeNameInData = cCollectionVariable
					.getFirstAtomicValueByNameInData("nameInData");
			let attributeValues = collectAttributeValuesFromVariable(cCollectionVariable);
			collectedAttributes[attributeNameInData] = attributeValues;
		};

		const getRefValueFromAttributeRef = function(attributeReference){
			let cAttributeReference = CORA.coraData(attributeReference);
			return cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const collectAttributeValuesFromVariable = function(cCollectionVariable) {
			if (variableHasFinalValue(cCollectionVariable)) {
				return getFinalValueFromVariable(cCollectionVariable);
			}
			return getAllValuesFromVariable(cCollectionVariable);
		};

		const variableHasFinalValue = function(cCollectionVariable) {
			return cCollectionVariable.containsChildWithNameInData("finalValue");
		};

		const getFinalValueFromVariable = function(cCollectionVariable) {
			return [ cCollectionVariable.getFirstAtomicValueByNameInData("finalValue") ];
		};

		const getAllValuesFromVariable = function(cCollectionVariable) {
			let attributeValues = [];
			let collectionItemReferences = getCollectionItemReferencesFor(cCollectionVariable);
			collectionItemReferences.children.forEach(function(collectionItemRef) {
				attributeValues.push(getCollectionItemValue(collectionItemRef));
			});
			return attributeValues;
		};

		const getCollectionItemValue = function(collectionItemRef) {
			let cItemRef = CORA.coraData(collectionItemRef);
			let itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;
			let cCollectionItem = getMetadataById(itemRefId);
			return cCollectionItem.getFirstAtomicValueByNameInData("nameInData");
		};

		const getCollectionItemReferencesFor = function(cCollectionVariable) {
			let cAttributeRefCollection = CORA.coraData(cCollectionVariable
					.getFirstChildByNameInData("refCollection"));

			let attributeRefCollectionId = cAttributeRefCollection
					.getFirstAtomicValueByNameInData("linkedRecordId");
			let cAttributeItemCollection = getMetadataById(attributeRefCollectionId);
			return cAttributeItemCollection.getFirstChildByNameInData("collectionItemReferences");
		};

		const getChildRefPartOfMetadata = function(cMetadata, metadataIdToFind) {
			let cMetadataToFind = getMetadataById(metadataIdToFind);
			let nameInDataToFind = cMetadataToFind.getFirstAtomicValueByNameInData("nameInData");
			let attributesToFind = collectAttributesAsObjectForMetadataId(metadataIdToFind);

			let findFunction = function(metadataChildRef) {
				let childMetadataId = getMetadataIdFromRef(metadataChildRef);
				let childAttributesToFind = collectAttributesAsObjectForMetadataId(childMetadataId);
				let childNameInData = getNameInDataFromMetadataChildRef(metadataChildRef);
				return childNameInData === nameInDataToFind
						&& firstAttributesExistsInSecond(childAttributesToFind, attributesToFind);
			};

			let children = cMetadata.getFirstChildByNameInData("childReferences").children;
			let parentMetadataChildRef = children.find(findFunction);
			return CORA.coraData(parentMetadataChildRef);
		};

		const getMetadataIdFromRef = function(metadataChildRef) {
			let cMetadataChildRef = CORA.coraData(metadataChildRef);
			let cRef = CORA.coraData(cMetadataChildRef.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const getNameInDataFromMetadataChildRef = function(metadataChildRef) {
			let childMetadataId = getMetadataIdFromRef(metadataChildRef);
			let cChildMetadata = getMetadataById(childMetadataId);
			return cChildMetadata.getFirstAtomicValueByNameInData("nameInData");
		};

		const firstAttributesExistsInSecond = function(attributes1, attributes2) {
			let attributeKeys1 = attributes1 !== undefined ? Object.keys(attributes1) : Object
					.keys({});
			let attributeKeys2 = attributes2 !== undefined ? Object.keys(attributes2) : Object
					.keys({});

			if (notSameNumberOfKeys(attributeKeys1, attributeKeys2)) {
				return false;
			}
			if (noAttributesToCompare(attributeKeys1)) {
				return true;
			}
			return existingFirstAttributesExistsInSecond(attributes1, attributes2);
		};

		const notSameNumberOfKeys = function(attributeKeys1, attributeKeys2) {
			return attributeKeys1.length !== attributeKeys2.length;
		};

		const noAttributesToCompare = function(attributeKeys1) {
			return attributeKeys1.length === 0;
		};

		const existingFirstAttributesExistsInSecond = function(attributes1, attributes2) {
			let attributeKeys1 = Object.keys(attributes1);
			let checkAttributeExistsInAttributes2 = createCheckFunction(attributes1, attributes2);
			return attributeKeys1.every(checkAttributeExistsInAttributes2);
		};

		const createCheckFunction = function(attributes1, attributes2) {
			return function(attributeKey) {
				let attributeValues1 = attributes1[attributeKey];
				let attributeValues2 = attributes2[attributeKey];
				if (attributeValues2 === undefined) {
					return false;
				}
				let functionAttribute2ContainsValue = createValueCheckFunction(attributeValues2);
				return attributeValues1.every(functionAttribute2ContainsValue);
			};
		};

		const createValueCheckFunction = function(attributeValues2) {
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