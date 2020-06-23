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
	cora.metadataChildInitializer = function(dependencies, spec) {

		let childReference = CORA.coraData(spec.childReference);
		let data = CORA.coraData(spec.data);

		let cRef = CORA.coraData(childReference.getFirstChildByNameInData("ref"));
		let ref = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		let dataChildrenForMetadata;
		let attributes;

		const initializeTopLevel = function(hasWritePermission) {
			initialize();
			possiblyPublishDisableMessage(hasWritePermission);
		};

		const initialize = function() {
			let nameInData = getNameInDataForMetadataId(ref);
			attributes = getAttributesForMetadataId(ref);
			dataChildrenForMetadata = getDataChildrenForMetadata(nameInData, attributes);
			initializeChild();
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
				"name" : "attributes",
				"children" : []
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

		const createAttributeWithNameAndValueAndRepeatId = function(attributeName, attributeValue,
				repeatId) {
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
		};

		const getDataChildrenForMetadata = function(nameInDataIn, attributesIn) {
			let dataChildrenForMetadataOut = [];
			if (spec.data !== undefined
					&& data.containsChildWithNameInDataAndAttributes(nameInDataIn, attributesIn)) {
				dataChildrenForMetadataOut = data.getChildrenByNameInDataAndAttributes(
						nameInDataIn, attributesIn);
			}
			return dataChildrenForMetadataOut;
		};

		const initializeChild = function() {
			if (childCanRepeat()) {
				initializeRepeatingChild();
			} else {
				initializeNonRepeatingChild();
			}
		};

		const initializeRepeatingChild = function() {
			let generatedRepeatId = calculateStartRepeatId();
			let repeatMin = calculateMinRepeat();

			for (let index = 0; index < repeatMin; index++) {
				if (hasDataForRepeatingChild(index)) {
					initializeRepeatingChildInstanceWithData(index);
				} else {
					initializeRepeatingChildInstanceWithoutData(generatedRepeatId);
					generatedRepeatId++;
				}
			}
		};

		const hasDataForRepeatingChild = function(index) {
			return dataChildrenForMetadata[index] !== undefined;
		};

		const calculateStartRepeatId = function() {
			let generatedRepeatId = 0;
			if (hasData()) {
				generatedRepeatId = calculateStartRepeatIdFromData();
			}
			return generatedRepeatId;
		};

		const calculateStartRepeatIdFromData = function() {
			let currentMaxRepeatId = 0;
			dataChildrenForMetadata.forEach(function(child) {
				currentMaxRepeatId = calculateMaxRepeatFromChildAndCurrentMaxRepeat(child,
						currentMaxRepeatId);
			});
			return currentMaxRepeatId;
		};

		const calculateMaxRepeatFromChildAndCurrentMaxRepeat = function(child, currentMaxRepeatId) {
			let x = Number(child.repeatId);
			if (!isNaN(x) && x > currentMaxRepeatId) {
				x++;
				return x;
			}
			return currentMaxRepeatId;
		};

		const calculateMinRepeat = function() {
			let repeatMin = childReference.getFirstAtomicValueByNameInData("repeatMin");
			if (hasData()) {
				let noOfData = dataChildrenForMetadata.length;
				if (noOfData > repeatMin) {
					repeatMin = noOfData;
				}
			}
			return repeatMin;
		};

		const initializeRepeatingChildInstanceWithData = function(index) {
			let dataChild = dataChildrenForMetadata[index];
			if (childIsRepeatableButRepeatIdIsMissing(dataChild)) {
				dataChild.repeatId = "0";
			}
			let repeatId = dataChild.repeatId;
			initializeForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId);
		};

		const childIsRepeatableButRepeatIdIsMissing = function(dataChild) {
			return dataChild.repeatId === undefined && moreThanOneChildIsAllowed();
		};

		const moreThanOneChildIsAllowed = function() {
			let repeatMax = childReference.getFirstAtomicValueByNameInData("repeatMax");
			return Number(repeatMax) > 1 || repeatMax === "X";
		};

		const initializeRepeatingChildInstanceWithoutData = function(generatedRepeatId) {
			let repeatIdString = String(generatedRepeatId);
			initializeForMetadataWithIdAndDataAndRepeatId(undefined, repeatIdString);
		};

		const initializeNonRepeatingChild = function() {
			if (hasData()) {
				initializeNonRepeatingChildInstanceWithData();
			} else {
				initializeForMetadataWithIdAndDataAndRepeatId();
			}
		};

		const initializeNonRepeatingChildInstanceWithData = function() {
			let dataChild = dataChildrenForMetadata[0];
			initializeForMetadataWithIdAndDataAndRepeatId(dataChild);
		};

		const getMetadataById = function(id) {
			return CORA.coraData(dependencies.metadataProvider.getMetadataById(id));
		};

		const hasData = function() {
			return data.getData() !== undefined && dataChildrenForMetadata.length > 0;
		};

		const childCanRepeat = function() {
			let repeatMin = childReference.getFirstAtomicValueByNameInData("repeatMin");
			let repeatMax = childReference.getFirstAtomicValueByNameInData("repeatMax");
			return repeatMax === "X" || Number(repeatMax) > 1
					|| (Number(repeatMin) === 0 && Number(repeatMax) === 1);
		};

		const initializeForMetadataWithIdAndDataAndRepeatId = function(dataChild, repeatId) {
			let initializerSpec = {
				"metadataId" : ref,
				"path" : spec.path,
				"data" : dataChild,
				"repeatId" : repeatId
			};
			let repeatInitializer = dependencies.metadataChildAndRepeatInitializerFactory
					.factorRepeatInitializer(initializerSpec);
			repeatInitializer.initialize();
		};

		const possiblyPublishDisableMessage = function(hasWritePermission) {
			if (!hasWritePermission) {
				let pathForTopLevelChild = createPath();
				publishDisableMessage(pathForTopLevelChild);
			}
		};

		const createPath = function() {
			let pathForTopLevelChild = {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : getNameInDataForMetadataId(ref)
				} ]
			};
			possiblyAddAttributesToPath(pathForTopLevelChild);
			console.log("pathForTopLevelChild "+JSON.stringify(pathForTopLevelChild));
			return pathForTopLevelChild;
		};

		const possiblyAddAttributesToPath = function(pathForTopLevelChild) {
			if (attributes !== undefined) {
				pathForTopLevelChild.children.push(attributes);
			}
		}

		const publishDisableMessage = function(pathForTopLevelChild) {
			dependencies.pubSub.publish("disable", {
				data : "",
				path : pathForTopLevelChild
			});
		}
		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		return Object.freeze({
			type : "metadataChildInitializer",
			getDependencies : getDependencies,
			getSpec : getSpec,
			initialize : initialize,
			initializeTopLevel : initializeTopLevel
		});
	};
	return cora;
}(CORA));