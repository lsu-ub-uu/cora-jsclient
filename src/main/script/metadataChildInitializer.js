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
	cora.MetadataChildInitializer = function(childReferenceIn, path, dataIn, metadataProvider,
			pubSub) {

		var childReference = new CORA.CoraData(childReferenceIn);
		var data = new CORA.CoraData(dataIn);

		var ref = childReference.getFirstAtomicValueByNameInData('ref');
		var nameInData = getNameInDataForMetadataId(ref);
		var attributes = getAttributesForMetadataId(ref);

		initializeChild();

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
			var attributeReferences;
			var attributeReference;
			var attributesOut;
			attributesOut = createAttributes();
			attributeReferences = metadataElement.getFirstChildByNameInData("attributeReferences");
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

			for (var i = 0; i < repeatMin; i++) {
				if (hasDataForRepeatingChild(i)) {
					initializeRepeatingChildInstanceWithData(i);
				} else {
					initializeRepeatingChildInstanceWithoutData(generatedRepeatId);
					generatedRepeatId++;
				}
			}
		}

		function hasDataForRepeatingChild(index) {
			return hasData() && data.containsChildWithNameInDataAndIndex(nameInData, index);
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
			var data2 = data.getData();
			data2.children.forEach(function(child) {
				currentMaxRepeatId = calculateMaxRepeatFromChildAndCurrentMaxRepeat(child,
						currentMaxRepeatId);
			});
			return currentMaxRepeatId;
		}

		function calculateMaxRepeatFromChildAndCurrentMaxRepeat(child, currentMaxRepeatId) {
			if (child.name === nameInData) {
				var x = Number(child.repeatId);
				if (!isNaN(x) && x > currentMaxRepeatId) {
					x++;
					return x;
				}
			}
			return currentMaxRepeatId;
		}

		function calculateMinRepeat() {
			var repeatMin = childReference.getFirstAtomicValueByNameInData("repeatMin");
			if (hasData()) {
				var noOfData = data.getNoOfChildrenWithNameInData(nameInData);
				if (noOfData > repeatMin) {
					repeatMin = noOfData;
				}
			}
			return repeatMin;
		}

		function initializeRepeatingChildInstanceWithData(index) {
			var dataChild = data.getChildByNameInDataAndIndex(nameInData, index);
			var repeatId = dataChild.repeatId;
			initializeForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId);
		}

		function initializeRepeatingChildInstanceWithoutData(generatedRepeatId) {
			var repeatIdString = String(generatedRepeatId);
			initializeForMetadataWithIdAndDataAndRepeatId(undefined, repeatIdString);
		}

		function initializeNonRepeatingChild() {
			if (hasDataForNonRepeatingChild()) {
				initializeNonRepeatingChildInstanceWithData();
			} else {
				initializeForMetadataWithIdAndDataAndRepeatId();
			}
		}
		function hasDataForNonRepeatingChild() {
			return hasData()
					&& data.containsChildWithNameInDataAndAttributes(nameInData, attributes);
		}
		function initializeNonRepeatingChildInstanceWithData() {
			var dataChild = data.getFirstChildByNameInData(nameInData);
			initializeForMetadataWithIdAndDataAndRepeatId(dataChild);
		}

		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		function hasData() {
			return data.getData() !== undefined;
		}

		function childCanRepeat() {
			var repeatMax = childReference.getFirstAtomicValueByNameInData("repeatMax");
			return repeatMax === "X" || repeatMax > 1;
		}

		function initializeForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId) {
			CORA.metadataRepeatInitializer(ref, path, dataChild, repeatId, metadataProvider,
					pubSub);
		}

	};
	return cora;
}(CORA || {}));