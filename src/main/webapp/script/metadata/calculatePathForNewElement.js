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
	cora.calculatePathForNewElement = function(spec) {
		var metadataProvider = spec.metadataProvider;
		var cMetadataElementToAdd = getMetadataById(spec.metadataIdToAdd);
		var metadataId = spec.metadataIdToAdd;
		var repeatId = spec.repeatId;
		var nameInData = cMetadataElementToAdd.getFirstAtomicValueByNameInData("nameInData");

		var newPath = calculatePathForNewElement();

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function copyPath(pathToCopy) {
			return JSON.parse(JSON.stringify(pathToCopy));
		}

		function calculatePathForNewElement() {
			if (parentPathPointsToTopLevel()) {
				return createPathForThisLevel();
			}
			return addPathForThisLevelToParentPath();
		}

		function parentPathPointsToTopLevel() {
//			return spec.parentPath.children === undefined;
			return spec.parentPath.length == 0;
		}

		function createPathForThisLevel() {
			var path = createLinkedPath();
			possiblyAddRepeatId(path);
//			possiblyAddAttributes(path);
			return path;
		}

		function createLinkedPath() {
//			return {
//				"name" : "linkedPath",
//				"children" : [ {
//					"name" : "nameInData",
//					"value" : nameInData
//				} ]
//			};
			return [metadataId];
		}

		function possiblyAddRepeatId(path) {
			if (pathShouldHaveRepeatId()) {
//				addRepeatIdToPath(path);
				path.push(path.pop()+"."+repeatId);
			}
		}

		function pathShouldHaveRepeatId() {
			return repeatId !== undefined;
		}

		function addRepeatIdToPath(path) {
			path.children.push({
				name : "repeatId",
				value : repeatId
			});
		}

		function possiblyAddAttributes(path) {
			if (pathShouldHaveAttributes()) {
				addAttributesToPath(path);
			}
		}

		function pathShouldHaveAttributes() {
			return cMetadataElementToAdd.containsChildWithNameInData("attributeReferences");
		}

		function addAttributesToPath(path) {
			path.children.push(getAttributesAsPathPartFromMetadataElement());
		}

		function addPathForThisLevelToParentPath() {
			var parentPathCopy = copyPath(spec.parentPath);
			var childPath = createPathForThisLevel();
//			var x = [];
//			x.push
//			return addChildPathToPath(parentPathCopy, childPath);
			parentPathCopy.push(childPath[0]);
			return parentPathCopy;
		}

		function addChildPathToPath(parentPath, childPath) {
			var lowestPath = getLowestPathPointer(parentPath);
			lowestPath.children.push(childPath);
			return parentPath;
		}

		function getLowestPathPointer(path) {
			var cPath = CORA.coraData(path);
			if (cPath.containsChildWithNameInData("linkedPath")) {
				return getLowestPathPointer(cPath.getFirstChildByNameInData("linkedPath"));
			}
			return path;
		}

		function getAttributesAsPathPartFromMetadataElement() {
			var attributeList = createAttributeListFromMetadata();
			return createAttributesHolder(attributeList);
		}

		function createAttributeListFromMetadata() {
			var attributesObject = getAttributeObjectFromMetadata();

			var attributeList = [];
			var repeatIdCounter = 0;
			var attributeKeys = Object.keys(attributesObject);
			attributeKeys.forEach(function(attributeKey) {
				var attribute = createAttributeWithNameAndValueAndRepeatId(attributeKey,
						attributesObject[attributeKey][0], repeatIdCounter);

				attributeList.push(attribute);
				repeatIdCounter++;
			});
			return attributeList;
		}

		function getAttributeObjectFromMetadata() {
			var metadataHelper = CORA.metadataHelper({
				"metadataProvider" : spec.metadataProvider
			});
			return metadataHelper.collectAttributesAsObjectForMetadataId(spec.metadataIdToAdd);
		}

		function createAttributesHolder(attributesOut) {
			return {
				"name" : "attributes",
				"children" : attributesOut
			};
		}

		function createAttributeWithNameAndValueAndRepeatId(attributeName, attributeValue, repeatIdIn) {
			return {
				"name" : "attribute",
				"repeatId" : repeatIdIn || "1",
				"children" : [ {
					"name" : "attributeName",
					"value" : attributeName
				}, {
					"name" : "attributeValue",
					"value" : attributeValue
				} ]
			};
		}
		return newPath;
	};
	return cora;
}(CORA));