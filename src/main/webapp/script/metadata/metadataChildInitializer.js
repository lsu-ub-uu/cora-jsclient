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
	cora.metadataChildInitializer = function(dependencies, childReferenceIn,
			path, dataIn, metadataProvider, pubSub) {

		var childReference = CORA.coraData(childReferenceIn);
		var data = CORA.coraData(dataIn);

		var cRef = CORA.coraData(childReference
				.getFirstChildByNameInData("ref"));
		var ref = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		var nameInData = getNameInDataForMetadataId(ref);
		var attributes = getAttributesForMetadataId(ref);
		var dataChildrenForMetadata = getDataChildrenForMetadata(nameInData,
				attributes);
		initializeChild();

		function getNameInDataForMetadataId(refIn) {
			var metadataElement = getMetadataById(refIn);
			return metadataElement
					.getFirstAtomicValueByNameInData("nameInData");
		}

		function getAttributesForMetadataId(refIn) {
			var metadataElement = getMetadataById(refIn);
			if (metadataElement
					.containsChildWithNameInData("attributeReferences")) {
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
				var attribute = getAttributeForAttributeReference(
						attributeReference, i);
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
			var attributeRef = getRefValueFromAttributeRef(attributeReference);
			var attributeMetadata = getMetadataById(attributeRef);
			var attributeNameInData = attributeMetadata
					.getFirstAtomicValueByNameInData("nameInData");
			var finalValue = attributeMetadata
					.getFirstAtomicValueByNameInData("finalValue");

			return createAttributeWithNameAndValueAndRepeatId(
					attributeNameInData, finalValue, index);

		}

		function getRefValueFromAttributeRef(attributeReference) {
			var cAttributeReference = CORA.coraData(attributeReference);
			return cAttributeReference
					.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function createAttributeWithNameAndValueAndRepeatId(attributeName,
				attributeValue, repeatId) {
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
			if (dataIn !== undefined
					&& data.containsChildWithNameInDataAndAttributes(
							nameInDataIn, attributesIn)) {
				dataChildrenForMetadataOut = data
						.getChildrenByNameInDataAndAttributes(nameInDataIn,
								attributesIn);
			}
			return dataChildrenForMetadataOut;
		}

		function initializeChild() {
			if (childCanRepeat()) {
				initializeRepeatingChild();
			} else {
				initializeNonRepeatingChild();
			}
		}

		function initializeRepeatingChild() {
			var generatedRepeatId = calculateStartRepeatId();
			var repeatMin = calculateMinRepeat();

			for (var index = 0; index < repeatMin; index++) {
				if (hasDataForRepeatingChild(index)) {
					initializeRepeatingChildInstanceWithData(index);
				} else {
					initializeRepeatingChildInstanceWithoutData(generatedRepeatId);
					generatedRepeatId++;
				}
			}
		}

		function hasDataForRepeatingChild(index) {
			return dataChildrenForMetadata[index] !== undefined;
		}

		function calculateStartRepeatId() {
			var generatedRepeatId = 0;
			if (hasData()) {
				generatedRepeatId = calculateStartRepeatIdFromData();
			}
			return generatedRepeatId;
		}

		function calculateStartRepeatIdFromData() {
			var currentMaxRepeatId = 0;
			dataChildrenForMetadata
					.forEach(function(child) {
						currentMaxRepeatId = calculateMaxRepeatFromChildAndCurrentMaxRepeat(
								child, currentMaxRepeatId);
					});
			return currentMaxRepeatId;
		}

		function calculateMaxRepeatFromChildAndCurrentMaxRepeat(child,
				currentMaxRepeatId) {
			var x = Number(child.repeatId);
			if (!isNaN(x) && x > currentMaxRepeatId) {
				x++;
				return x;
			}
			return currentMaxRepeatId;
		}

		function calculateMinRepeat() {
			var repeatMin = childReference
					.getFirstAtomicValueByNameInData("repeatMin");
			if (hasData()) {
				var noOfData = dataChildrenForMetadata.length;
				if (noOfData > repeatMin) {
					repeatMin = noOfData;
				}
			}
			return repeatMin;
		}

		function initializeRepeatingChildInstanceWithData(index) {
			var dataChild = dataChildrenForMetadata[index];
			if (childIsRepeatableButRepeatIdIsMissing(dataChild)) {
				dataChild.repeatId = "0";
			}
			var repeatId = dataChild.repeatId;
			initializeForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId);
		}

		function childIsRepeatableButRepeatIdIsMissing(dataChild) {
			return dataChild.repeatId === undefined
					&& moreThanOneChildIsAllowed();
		}

		function moreThanOneChildIsAllowed() {
			var repeatMax = childReference
					.getFirstAtomicValueByNameInData("repeatMax");
			return Number(repeatMax) > 1 || repeatMax === "X";
		}

		function initializeRepeatingChildInstanceWithoutData(generatedRepeatId) {
			var repeatIdString = String(generatedRepeatId);
			initializeForMetadataWithIdAndDataAndRepeatId(undefined,
					repeatIdString);
		}

		function initializeNonRepeatingChild() {
			if (hasData()) {
				initializeNonRepeatingChildInstanceWithData();
			} else {
				initializeForMetadataWithIdAndDataAndRepeatId();
			}
		}

		function initializeNonRepeatingChildInstanceWithData() {
			var dataChild = dataChildrenForMetadata[0];
			initializeForMetadataWithIdAndDataAndRepeatId(dataChild);
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function hasData() {
			return data.getData() !== undefined
					&& dataChildrenForMetadata.length > 0;
		}

		function childCanRepeat() {
			var repeatMin = childReference
					.getFirstAtomicValueByNameInData("repeatMin");
			var repeatMax = childReference
					.getFirstAtomicValueByNameInData("repeatMax");
			return repeatMax === "X" || Number(repeatMax) > 1
					|| (Number(repeatMin) === 0 && Number(repeatMax) === 1);
		}

		function initializeForMetadataWithIdAndDataAndRepeatId(dataChild,
				repeatId) {
			CORA.metadataRepeatInitializer(dependencies, ref, path, dataChild,
					repeatId, metadataProvider, pubSub);
		}

	};
	return cora;
}(CORA));