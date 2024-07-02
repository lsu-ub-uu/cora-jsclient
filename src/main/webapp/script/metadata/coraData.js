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
	cora.coraData = function(dataIn) {
		const NOT_FOUND_IN_CHILDREN = ") not found in children to coraData";
		var data = dataIn;
		var children = data && data.children;

		function getData() {
			return data;
		}

		function containsChildWithNameInData(nameInData) {
			var filter = createNameInDataFilter(nameInData);
			return children.some(filter);
		}

		function createNameInDataFilter(nameInDataIn) {
			return function(child) {
				return child.name === nameInDataIn;
			};
		}

		function getFirstChildByNameInData(nameInData) {
			return getFirstChildFromDataByNameInData(data, nameInData);
		}

		function getFirstAtomicValueByNameInData(name) {
			return getFirstChildByNameInData(name).value;
		}

		function getNoOfChildrenWithNameInData(nameInData) {
			var filter = createNameInDataFilter(nameInData);
			var childrenWithNameInData = children.filter(filter);
			return childrenWithNameInData.length;
		}

		function containsChildWithNameInDataAndAttributes(nameInData, attributes) {
			var filter = createNameInDataAndAttributesFilter(nameInData, attributes);
			return children.some(filter);
		}

		function createNameInDataAndAttributesFilter(nameInDataIn, attributes) {
			var filter = createNameInDataFilter(nameInDataIn);
			var attributesFilter = createAttributesFilter(attributes);
			return function(child) {
				return filter(child) && attributesFilter(child);
			};
		}

		function createAttributesFilter(attributes) {
			return function(child) {
				return containerIsSpecifiedByAttributes(child, attributes);
			};
		}

		function getChildrenByNameInData(nameInData) {
			return getChildrenToContainerByNameInData(children, nameInData);
		}

		let getChildrenToContainerByNameInData = function(container, nameInData) {
			let filter = createNameInDataFilter(nameInData);
			let foundChildren = container.filter(filter);
			if (foundChildren.length > 0) {
				return foundChildren;
			}
			throw new Error("name(" + nameInData + NOT_FOUND_IN_CHILDREN);
		}


		function getChildrenByNameInDataAndAttributes(nameInData, attributes) {
			var foundContainers = findContainersSpecifiedByNameInDataAndAttributes(nameInData,
				attributes);
			if (foundContainers.length > 0) {
				return foundContainers;
			}
			throw new Error("nameInData(" + nameInData + ") and attributes ("
				+ JSON.stringify(attributes) + ") not found in coraData");
		}

		function getFirstChildByNameInDataAndAttributes(nameInData, attributes) {
			var filter = createNameInDataAndAttributesFilter(nameInData, attributes);
			var foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error("nameInData(" + nameInData + ") and attributes ("
				+ JSON.stringify(attributes) + ") not found in coraData");
		}

		function findContainersSpecifiedByNameInDataAndAttributes(nameInData, attributes) {
			var filter = createNameInDataAndAttributesFilter(nameInData, attributes);
			return children.filter(filter);
		}

		function containerIsSpecifiedByAttributes(container, attributes) {
			if (containerAndPathHasAttributes(container, attributes)) {
				return containerHasSameAttributesAsPath(container, attributes);
			}
			return containerAndPathDoesNotHaveAttributes(container, attributes);
		}

		function containerAndPathHasAttributes(container, attributes) {
			return attributesContainsAttributes(attributes) && containerHasAttributes(container);
		}

		function containerAndPathDoesNotHaveAttributes(container, attributes) {
			return attributesConatainsNoAttributes(attributes)
				&& containerDoesNotHaveAttributes(container);
		}

		function containerHasSameAttributesAsPath(container, attributes) {
			var containerAttributes = container.attributes;
			var pathAttributes = attributes.children;
			return containerHasAllPathAttributes(containerAttributes, pathAttributes)
				&& pathHasAllContainerAttributes(containerAttributes, pathAttributes);
		}

		function containerHasAllPathAttributes(containerAttributes, pathAttributes) {
			return pathAttributes.every(function(pathAttribute) {
				var pathAttributeKey = getFirstAtomicValueFromDataByNameInData(pathAttribute,
					"attributeName");
				var pathAttributeValue = getFirstAtomicValueFromDataByNameInData(pathAttribute,
					"attributeValue");
				if (!Array.isArray(pathAttributeValue)) {
					return containerAttributes[pathAttributeKey] === pathAttributeValue;
				} else {
					return pathAttributeValue.some(function(value) {
						return containerAttributes[pathAttributeKey] === value;
					});
				}
			});
		}
		function getFirstAtomicValueFromDataByNameInData(dataStructure, name) {
			return getFirstChildFromDataByNameInData(dataStructure, name).value;
		}

		function getFirstChildFromDataByNameInData(dataStructure, nameInData) {
			var dataStructureChildren = dataStructure.children;
			var filter = createNameInDataFilter(nameInData);
			var foundChild = dataStructureChildren.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}

			throw new Error("name(" + nameInData + NOT_FOUND_IN_CHILDREN);
		}
		function pathHasAllContainerAttributes(containerAttributes, pathAttributes) {
			var containerAttributeKeys = Object.keys(containerAttributes);
			return containerAttributeKeys.every(function(containerAttributeKey) {
				var containerAttributeValue = containerAttributes[containerAttributeKey];
				return pathAttributesHasNameAndValue(pathAttributes, containerAttributeKey,
					containerAttributeValue);
			});
		}

		function pathAttributesHasNameAndValue(pathAttributes, name, value) {
			return pathAttributes.some(function(pathAttribute) {
				var pathAttributeKey = getFirstAtomicValueFromDataByNameInData(pathAttribute,
					"attributeName");
				var pathAttributeValue = getFirstAtomicValueFromDataByNameInData(pathAttribute,
					"attributeValue");
				return pathAttributeKey === name && evaluateAttributeValues(pathAttributeValue, value);
			});
		}

		const evaluateAttributeValues = function(pathAttributeValue, value) {
			if (!Array.isArray(pathAttributeValue)) {
				return pathAttributeValue === value;
			} else {
				return pathAttributeValue.some(function(attributeValue) {
					return value === attributeValue;
				});
			}
		};

		function attributesConatainsNoAttributes(attributes) {
			return !attributesContainsAttributes(attributes);
		}

		function attributesContainsAttributes(attributes) {
			if (attributes === undefined) {
				return false;
			}
			if (attributes.children !== undefined && attributes.children.length === 0) {
				return false;
			}
			return true;
		}

		function containerHasAttributes(container) {
			return container.attributes !== undefined;
		}

		function containerDoesNotHaveAttributes(container) {
			return !containerHasAttributes(container);
		}

		function containsChildWithNameInDataAndIndex(nameInData, index) {
			var filter = createNameInDataAndIndexFilter(nameInData, index);
			return children.some(filter);
		}

		function createNameInDataAndIndexFilter(nameInDataIn, index) {
			var found = 0;
			var filter = createNameInDataFilter(nameInDataIn);
			return function(child) {
				if (filter(child)) {
					if (found === index) {
						return true;
					}
					found++;
				}
				return false;
			};
		}

		function getChildByNameInDataAndIndex(nameInData, index) {
			var filter = createNameInDataAndIndexFilter(nameInData, index);
			var foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error("name(" + nameInData + ") with index (" + index
				+ NOT_FOUND_IN_CHILDREN);
		}

		function getAtomicValueByNameInDataAndIndex(name, index) {
			return getChildByNameInDataAndIndex(name, index).value;
		}

		function containsChildWithNameInDataAndRepeatId(nameInData, repeatId) {
			var filter = createNameInDataAndRepeatIdFilter(nameInData, repeatId);
			return children.some(filter);
		}

		function createNameInDataAndRepeatIdFilter(nameInDataIn, repeatId) {
			var filter = createNameInDataFilter(nameInDataIn);
			var repeatIdFilter = createRepeatIdFilter(repeatId);
			return function(child) {
				return (filter(child) && repeatIdFilter(child));
			};
		}

		function createRepeatIdFilter(repeatId) {
			return function(child) {
				return child.repeatId === repeatId;
			};
		}

		function getFirstChildByNameInDataAndRepeatId(nameInData, repeatId) {
			var filter = createNameInDataAndRepeatIdFilter(nameInData, repeatId);
			var foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error("name(" + nameInData + ") with repeatId (" + repeatId
				+ NOT_FOUND_IN_CHILDREN);
		}

		function containsChildWithNameInDataAndAttributesAndRepeatId(nameInData, attributes,
			repeatId) {
			var filter = createNameInDataAndAttributesAndRepeatIdFilter(nameInData, attributes,
				repeatId);
			return children.some(filter);
		}

		function createNameInDataAndAttributesAndRepeatIdFilter(nameInDataIn, attributes, repeatId) {
			var filter = createNameInDataFilter(nameInDataIn);
			var attributesFilter = createAttributesFilter(attributes);
			var repeatIdFilter = createRepeatIdFilter(repeatId);
			return function(child) {
				return filter(child) && attributesFilter(child) && repeatIdFilter(child);
			};
		}

		function getFirstChildByNameInDataAndAttributesAndRepeatId(nameInData, attributes, repeatId) {
			var filter = createNameInDataAndAttributesAndRepeatIdFilter(nameInData, attributes,
				repeatId);
			var foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error("name(" + nameInData + ") with attributes ("
				+ JSON.stringify(attributes) + ") and repeatId (" + repeatId
				+ NOT_FOUND_IN_CHILDREN);
		}

		const getLinkedRecordIdFromFirstChildLinkWithNameInData = function(nameInData) {
			let child = getFirstChildByNameInData(nameInData);
			let linkedRecordId = getChildrenToContainerByNameInData(child.children, "linkedRecordId");
			return linkedRecordId[0].value;
		}

		return Object.freeze({
			getData: getData,
			containsChildWithNameInData: containsChildWithNameInData,
			getFirstChildByNameInData: getFirstChildByNameInData,
			getFirstAtomicValueByNameInData: getFirstAtomicValueByNameInData,
			getNoOfChildrenWithNameInData: getNoOfChildrenWithNameInData,
			containsChildWithNameInDataAndAttributes: containsChildWithNameInDataAndAttributes,
			getChildrenByNameInData: getChildrenByNameInData,
			getChildrenByNameInDataAndAttributes: getChildrenByNameInDataAndAttributes,
			getFirstChildByNameInDataAndAttributes: getFirstChildByNameInDataAndAttributes,
			containsChildWithNameInDataAndIndex: containsChildWithNameInDataAndIndex,
			getChildByNameInDataAndIndex: getChildByNameInDataAndIndex,
			getAtomicValueByNameInDataAndIndex: getAtomicValueByNameInDataAndIndex,
			containsChildWithNameInDataAndRepeatId: containsChildWithNameInDataAndRepeatId,
			getFirstChildByNameInDataAndRepeatId: getFirstChildByNameInDataAndRepeatId,
			containsChildWithNameInDataAndAttributesAndRepeatId: containsChildWithNameInDataAndAttributesAndRepeatId,
			getFirstChildByNameInDataAndAttributesAndRepeatId: getFirstChildByNameInDataAndAttributesAndRepeatId,
			getLinkedRecordIdFromFirstChildLinkWithNameInData: getLinkedRecordIdFromFirstChildLinkWithNameInData
		});
	};

	return cora;
}(CORA));