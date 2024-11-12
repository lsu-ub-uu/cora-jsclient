/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2016, 2024 Uppsala University Library
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
		let data = dataIn;
		let children = data?.children;

		const getData = function() {
			return data;
		};

		const containsChildWithNameInData = function(nameInData) {
			let filter = createNameInDataFilter(nameInData);
			return children.some(filter);
		};

		const createNameInDataFilter = function(nameInDataIn) {
			return function(child) {
				return child.name === nameInDataIn;
			};
		};

		const getFirstChildByNameInData = function(nameInData) {
			return getFirstChildFromDataByNameInData(data, nameInData);
		};

		const getFirstAtomicValueByNameInData = function(name) {
			return getFirstChildByNameInData(name).value;
		};

		const getNoOfChildrenWithNameInData = function(nameInData) {
			let filter = createNameInDataFilter(nameInData);
			let childrenWithNameInData = children.filter(filter);
			return childrenWithNameInData.length;
		};

		const containsChildWithNameInDataAndAttributes = function(nameInData, attributes) {
			let filter = createNameInDataAndAttributesFilter(nameInData, attributes);
			return children.some(filter);
		};

		const createNameInDataAndAttributesFilter = function(nameInDataIn, attributes) {
			let filter = createNameInDataFilter(nameInDataIn);
			let attributesFilter = createAttributesFilter(attributes);
			return function(child) {
				return (filter(child) && attributesFilter(child));
			};
		};

		const createAttributesFilter = function(attributes) {
			return function(child) {
				return containerIsSpecifiedByAttributes(child, attributes);
			};
		};

		const getChildrenByNameInData = function(nameInData) {
			return getChildrenToContainerByNameInData(children, nameInData);
		}

		let getChildrenToContainerByNameInData = function(container, nameInData) {
			let filter = createNameInDataFilter(nameInData);
			let foundChildren = container.filter(filter);
			if (foundChildren.length > 0) {
				return foundChildren;
			}
			throw new Error("name(" + nameInData + NOT_FOUND_IN_CHILDREN);
		};


		const getChildrenByNameInDataAndAttributes = function(nameInData, attributes) {
			let foundContainers = findContainersSpecifiedByNameInDataAndAttributes(nameInData,
				attributes);
			if (foundContainers.length > 0) {
				return foundContainers;
			}
			throw new Error(`nameInData(${nameInData}) and attributes \
				(${JSON.stringify(attributes)}) not found in coraData`);
		};

		const getFirstChildByNameInDataAndAttributes = function(nameInData, attributes) {
			let filter = createNameInDataAndAttributesFilter(nameInData, attributes);
			let foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error(`nameInData(${nameInData}) and attributes \
				(${JSON.stringify(attributes)}) not found in coraData`);
		};

		const findContainersSpecifiedByNameInDataAndAttributes = function(nameInData, attributes) {
			let filter = createNameInDataAndAttributesFilter(nameInData, attributes);
			return children.filter(filter);
		};

		const containerIsSpecifiedByAttributes = function(container, attributes) {
			if (containerAndPathHasAttributes(container, attributes)) {
				return containerHasSameAttributesAsPath(container, attributes);
			}
			return containerAndPathDoesNotHaveAttributes(container, attributes);
		};

		const containerAndPathHasAttributes = function(container, attributes) {
			return attributesContainsAttributes(attributes) && containerHasAttributes(container);
		};

		const containerAndPathDoesNotHaveAttributes = function(container, attributes) {
			return attributesConatainsNoAttributes(attributes)
				&& containerDoesNotHaveAttributes(container);
		};

		const containerHasSameAttributesAsPath = function(container, attributes) {
			let containerAttributes = container.attributes;
			let pathAttributes = attributes.children;
			return containerHasAllPathAttributes(containerAttributes, pathAttributes)
				&& pathHasAllContainerAttributes(containerAttributes, pathAttributes);
		};

		const containerHasAllPathAttributes = function(containerAttributes, pathAttributes) {
			return pathAttributes.every(function(pathAttribute) {
				return containerAttributesContainsPathAttribute(containerAttributes, pathAttribute);
			});
		};

		const containerAttributesContainsPathAttribute = function(containerAttributes, pathAttribute) {
			let pathAttributeKey = getFirstAtomicValueFromDataByNameInData(pathAttribute,
				"attributeName");
			let pathAttributeValue = getFirstAtomicValueFromDataByNameInData(pathAttribute,
				"attributeValue");
			if (!Array.isArray(pathAttributeValue)) {
				return containerAttributes[pathAttributeKey] === pathAttributeValue;
			} else {
				return pathAttributeValue.some(function(value) {
					return containerAttributes[pathAttributeKey] === value;
				});
			}
		};

		const getFirstAtomicValueFromDataByNameInData = function(dataStructure, name) {
			return getFirstChildFromDataByNameInData(dataStructure, name).value;
		};

		const getFirstChildFromDataByNameInData = function(dataStructure, nameInData) {
			let dataStructureChildren = dataStructure.children;
			let filter = createNameInDataFilter(nameInData);
			let foundChild = dataStructureChildren.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}

			throw new Error("name(" + nameInData + NOT_FOUND_IN_CHILDREN);
		};

		const pathHasAllContainerAttributes = function(containerAttributes, pathAttributes) {
			let containerAttributeKeys = Object.keys(containerAttributes);
			return containerAttributeKeys.every(function(containerAttributeKey) {
				let containerAttributeValue = containerAttributes[containerAttributeKey];
				return pathAttributesHasNameAndValue(pathAttributes, containerAttributeKey,
					containerAttributeValue);
			});
		};

		const pathAttributesHasNameAndValue = function(pathAttributes, name, value) {
			return pathAttributes.some(function(pathAttribute) {
				let pathAttributeKey = getFirstAtomicValueFromDataByNameInData(pathAttribute,
					"attributeName");
				let pathAttributeValue = getFirstAtomicValueFromDataByNameInData(pathAttribute,
					"attributeValue");
				return pathAttributeKey === name && evaluateAttributeValues(pathAttributeValue, value);
			});
		};

		const evaluateAttributeValues = function(pathAttributeValue, value) {
			if (!Array.isArray(pathAttributeValue)) {
				return pathAttributeValue === value;
			} else {
				return pathAttributeValue.some(function(attributeValue) {
					return value === attributeValue;
				});
			}
		};

		const attributesConatainsNoAttributes = function(attributes) {
			return !attributesContainsAttributes(attributes);
		};

		const attributesContainsAttributes = function(attributes) {
			let length = attributes?.children?.length;
			if (length === undefined) {
				return false;
			}
			return length !== 0;
		};

		const containerHasAttributes = function(container) {
			return container.attributes !== undefined;
		};

		const containerDoesNotHaveAttributes = function(container) {
			return !containerHasAttributes(container);
		};

		const containsChildWithNameInDataAndIndex = function(nameInData, index) {
			let filter = createNameInDataAndIndexFilter(nameInData, index);
			return children.some(filter);
		};

		const createNameInDataAndIndexFilter = function(nameInDataIn, index) {
			let found = 0;
			let filter = createNameInDataFilter(nameInDataIn);
			return function(child) {
				if (filter(child)) {
					if (found === index) {
						return true;
					}
					found++;
				}
				return false;
			};
		};

		const getChildByNameInDataAndIndex = function(nameInData, index) {
			let filter = createNameInDataAndIndexFilter(nameInData, index);
			let foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error("name(" + nameInData + ") with index (" + index
				+ NOT_FOUND_IN_CHILDREN);
		};

		const getAtomicValueByNameInDataAndIndex = function(name, index) {
			return getChildByNameInDataAndIndex(name, index).value;
		};

		const containsChildWithNameInDataAndRepeatId = function(nameInData, repeatId) {
			let filter = createNameInDataAndRepeatIdFilter(nameInData, repeatId);
			return children.some(filter);
		};

		const createNameInDataAndRepeatIdFilter = function(nameInDataIn, repeatId) {
			let filter = createNameInDataFilter(nameInDataIn);
			let repeatIdFilter = createRepeatIdFilter(repeatId);
			return function(child) {
				return filter(child) && repeatIdFilter(child);
			};
		};

		const createRepeatIdFilter = function(repeatId) {
			return function(child) {
				return child.repeatId === repeatId;
			};
		};

		const getFirstChildByNameInDataAndRepeatId = function(nameInData, repeatId) {
			let filter = createNameInDataAndRepeatIdFilter(nameInData, repeatId);
			let foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error("name(" + nameInData + ") with repeatId (" + repeatId
				+ NOT_FOUND_IN_CHILDREN);
		};

		const containsChildWithNameInDataAndAttributesAndRepeatId = function(nameInData, attributes,
			repeatId) {
			let filter = createNameInDataAndAttributesAndRepeatIdFilter(nameInData, attributes,
				repeatId);
			return children.some(filter);
		};

		const createNameInDataAndAttributesAndRepeatIdFilter = function(nameInDataIn, attributes, repeatId) {
			let filter = createNameInDataFilter(nameInDataIn);
			let attributesFilter = createAttributesFilter(attributes);
			let repeatIdFilter = createRepeatIdFilter(repeatId);
			return function(child) {
				return filter(child) && attributesFilter(child) && repeatIdFilter(child);
			};
		};

		const getFirstChildByNameInDataAndAttributesAndRepeatId = function(nameInData, attributes, repeatId) {
			let filter = createNameInDataAndAttributesAndRepeatIdFilter(nameInData, attributes,
				repeatId);
			let foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error("name(" + nameInData + ") with attributes ("
				+ JSON.stringify(attributes) + ") and repeatId (" + repeatId
				+ NOT_FOUND_IN_CHILDREN);
		};

		const getLinkedRecordIdFromFirstChildLinkWithNameInData = function(nameInData) {
			let child = getFirstChildByNameInData(nameInData);
			let linkedRecordId = getChildrenToContainerByNameInData(child.children, "linkedRecordId");
			return linkedRecordId[0].value;
		};

		return Object
			.freeze({
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