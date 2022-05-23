/*
 * Copyright 2015, 2016, 2017 Olov McKie
 * Copyright 2015, 2016, 2020 Uppsala University Library
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
	cora.dataHolder = function(spec) {
		let metadataId = spec.metadataId;
		let metadataProvider = spec.metadataProvider;
		let pubSub = spec.pubSub;
		let dataContainer;
		let containerPath = {};

		const start = function() {
			dataContainer = createDataContainerForElementWithId(metadataId, []);

			subscribeToAddAndSetValueAndRemoveAndMoveMessagesForAllPaths();
		};

		const createDataContainerForElementWithId = function(id, path, repeatIdIn) {
			let cMetadataElement = getMetadataById(id);
			let nameInData = cMetadataElement.getFirstAtomicValueByNameInData('nameInData');
			let dataContainerPart = {
				id: id,
				name: nameInData,
				//				repeatId: repeatIdIn,
				path: path
			};
			if (undefined != repeatIdIn) {
				dataContainerPart.repeatId = repeatIdIn;
			}

			addContainerContentFromElement(dataContainerPart, cMetadataElement);
			return dataContainerPart;
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const addContainerContentFromElement = function(dataContainerPart, cMetadataElement) {
			let type = cMetadataElement.getData().attributes.type;
			if (isTypeThatHasChildren(type)) {
				addGroupParts(dataContainerPart, cMetadataElement);
				//				return dataContainerPart;
			} else {
				dataContainerPart.value = "";

			}
			if (cMetadataElement.containsChildWithNameInData("attributeReferences")) {
				dataContainerPart.attributes = createAttributesContainer(cMetadataElement);
			}
			return dataContainerPart;
		};

		const isTypeThatHasChildren = function(type) {
			return isGroup(type) || isResourceLink(type) || isRecordLink(type);
		};

		const isGroup = function(type) {
			return type === "group";
		};

		const addGroupParts = function(dataContainerPart, cMetadataElement) {
			dataContainerPart.children = [];
		};

		const createAttributesContainer = function(cMetadataElement) {
			let attributeContainer = [];
			let attributeReferences = cMetadataElement
				.getFirstChildByNameInData('attributeReferences');
			attributeReferences.children.forEach(function(attributeReference) {
				let ref = getRefValueFromAttributeRef(attributeReference);
				let attribute = getMetadataById(ref);
				let attributeNameInData = attribute.getFirstAtomicValueByNameInData('nameInData');
				//				let attributeId = attribute.getFirstAtomicValueByNameInData('id');
				let attributeId = ref;
				let finalValue = attribute.getFirstAtomicValueByNameInData('finalValue');

				//				attributeContainer[attributeNameInData] = finalValue;
				//				attributeContainer[attributeId] = {
				attributeContainer.push({
					id: ref,
					nameInData: attributeNameInData,
					value: finalValue
				});

			});
			return attributeContainer;
		};

		const getRefValueFromAttributeRef = function(attributeReference) {
			let cAttributeReference = CORA.coraData(attributeReference);
			return cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const isResourceLink = function(type) {
			return type === "resourceLink";
		};

		const isRecordLink = function(type) {
			return type === "recordLink";
		};

		const subscribeToAddAndSetValueAndRemoveAndMoveMessagesForAllPaths = function() {
			pubSub.subscribe("*", [], undefined, handleMsg);
		};

		const handleMsg = function(dataFromMsg, msg) {
			if (msg.endsWith("add")) {
				addChild(dataFromMsg.path, dataFromMsg.metadataId, dataFromMsg.repeatId);
			} else if (msg.endsWith("setValue")) {
				setValue(dataFromMsg.path, dataFromMsg.data);
			} else if (msg.endsWith("linkedData")) {
				setActionLinks(dataFromMsg.path, dataFromMsg.data);
			} else if (msg.endsWith("remove")) {
				remove(dataFromMsg.path);
			} else if (msg.endsWith("move")) {
				move(dataFromMsg);
			}
		};

		const getData = function() {
			let dataContainerCopy = JSON.parse(JSON.stringify(dataContainer));
			removeAllActionLinks(dataContainerCopy);
			return dataContainerCopy;
		};


		const removeAllActionLinks = function(data) {
			removePath(data);
			removeId(data);
			changeAttributes(data);
			//			if (data.actionLinks !== undefined) {
			//				data.actionLinks = undefined;
			//			}
			if (data.children !== undefined) {
				data.children.forEach(function(child) {
					removeAllActionLinks(child);
				});
			}
		};

		const removePath = function(data) {
			delete data.path;
		}
		const removeId = function(data) {
			delete data.id;
		}

		const changeAttributes = function(data) {
			let oldAttributes = data.attributes;
			if (data.attributes != undefined) {
				let newAttributes = {};
				oldAttributes.forEach(function(attribute) {
					let nameInData = attribute.nameInData;
					let value = attribute.value;
					newAttributes[nameInData] = value;
				});
				data.attributes = newAttributes;
			}
		}

		const getDataWithActionLinks = function() {
			return dataContainer;
		};

		const setValue = function(path, value) {
			try {
				setValueInContainerListUsingPath(path, value);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(path) + ") not found in dataHolder:" + e);
			}
		};

		const setValueInContainerListUsingPath = function(path, value) {
			let foundContainer = findContainer(dataContainer, path);
			foundContainer.value = value;
		};

		const setActionLinks = function(path, data) {
			try {
				setActionLinksInContainerListUsingPath(path, data);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(path) + ") not found in dataHolder:" + e);
			}
		};

		const setActionLinksInContainerListUsingPath = function(path, data) {
			let foundContainer = findContainer(dataContainer, path);
			//			if (messageContainsDataWithActionLinks(data)) {
			//				foundContainer.actionLinks = data.actionLinks;
			//			}
		};

		const messageContainsDataWithActionLinks = function(data) {
			return data !== undefined && undefined !== data.actionLinks;
		};

		const findContainer = function(dataContainers, path) {
			//			return findContainerAndParent(dataContainers, path).container;
			//console.log("findContainer", containerPath)
			let pathToFind = JSON.stringify(path);
			return containerPath[pathToFind];
		};

		const findContainerAndParent = function(dataContainers, path) {
			//			let cpath = CORA.coraData(path);
			//			let container = findContainerByPathInCurrentLevel(dataContainers, path);

			//			if (pathSpecifiesMoreLevels(cpath)) {
			//				let childPath = cpath.getFirstChildByNameInData("linkedPath");
			//				return findContainerAndParent(container, childPath);
			//			}
			let foundContainer = findContainer({}, path);
			console.log(foundContainer)
			if (undefined == foundContainer) {
				throw new Error("Unable to find container with path: " 
					+ JSON.stringify(path) + " in dataHolder");
			}

			let parentPath = JSON.parse(JSON.stringify(path));
			parentPath.pop();
			let containerParent = findContainer({}, parentPath);
			return {
				parent: containerParent,
				container: foundContainer
			};
		};

		const findContainerByPathInCurrentLevel = function(dataContainers, path) {
			//			let nameInData = cPath.getFirstAtomicValueByNameInData("nameInData");
			//			let attributes;
			//			let repeatId;
			//			if (cPath.containsChildWithNameInData("attributes")) {
			//				attributes = cPath.getFirstChildByNameInData("attributes");
			//			}
			//			if (cPath.containsChildWithNameInData("repeatId")) {
			//				repeatId = cPath.getFirstAtomicValueByNameInData("repeatId");
			//			}
			//			
			//			let cdataContainers = CORA.coraData(dataContainers);
			//
			//			return cdataContainers.getFirstChildByNameInDataAndAttributesAndRepeatId(nameInData,
			//				attributes, repeatId);
			//				

			let foundContainer = undefined;
			dataContainers.children.forEach(function(containerPart) {
				//				console.log("findContainerByPathInCurrentLevel", containerPart.path[0])
				//				console.log("findContainerByPathInCurrentLevel", path[0])
				//				if (containerPart.path == path) {
				if (containerPart.path[0] == path[0]) {
					foundContainer = containerPart;
				};
			});
			return foundContainer;
		};

		const pathSpecifiesMoreLevels = function(path) {
			return path.containsChildWithNameInData("linkedPath");
		};

		const addChild = function(parentPath, metadataIdToAdd, repeatId) {
			tryToAddChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId);
		};

		const tryToAddChildInContainerListUsingPath = function(parentPath, metadataIdToAdd,
			repeatId) {
			try {
				addChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(parentPath)
					+ ") not found in dataContainers:" + JSON.stringify(dataContainer)
					+ " Error:" + e);
			}
		};

		const addChildInContainerListUsingPath = function(parentPath, metadataIdToAdd, repeatId) {
			let containerSpecifiedByPath = dataContainer;
			if (parentPath.length > 0) {
				let foundContainer = findContainer(dataContainer, parentPath);
				containerSpecifiedByPath = foundContainer;
			}
			let newPath = createNextLevelPath(parentPath, metadataIdToAdd, repeatId);
			let newChild = createDataContainerForElementWithId(metadataIdToAdd, newPath, repeatId);
			//			if (repeatId !== undefined) {
			//				newChild.repeatId = repeatId;
			//			}
			containerSpecifiedByPath.children.push(newChild);

			let pathString = JSON.stringify(newPath);
			containerPath[pathString] = newChild;
			//			console.log("containerPath", containerPath)
		};
		const createNextLevelPath = function(parentPath, metadataIdToAdd, repeatId) {
			let pathSpec = {
				//				"metadataProvider": dependencies.metadataProvider,
				"metadataIdToAdd": metadataIdToAdd,
				"repeatId": repeatId,
				"parentPath": parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};
		const remove = function(path) {
			try {
				removeContainerWithPath(path);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(path) + ") not found in dataHolder"
					+ " when trying to remove:" + e);
			}
		};

		const removeContainerWithPath = function(path) {
						let containerAndParent = findContainerAndParent(dataContainer, path);
			//			let parentContainer = containerAndParent.parent.children;
			//			let containerIndexInParent = parentContainer.indexOf(containerAndParent.container);
			//			parentContainer.splice(containerIndexInParent, 1);

			//			containerPath.indexOf();

//			let foundContainer = findContainer({}, path);
//			let parentPath = JSON.parse(JSON.stringify(path));
//			parentPath.pop();
//			let containerParent = findContainer({}, parentPath);
//			const index = containerParent.children.indexOf(foundContainer);
//			if (index > -1) {
//				containerParent.children.splice(index, 1);
//			}
//			delete containerPath[JSON.stringify(path)];

			let foundContainer = containerAndParent.container;
			let containerParent = containerAndParent.parent;
			const index = containerParent.children.indexOf(foundContainer);
			if (index > -1) {
				containerParent.children.splice(index, 1);
			}
			delete containerPath[JSON.stringify(path)];
		};

		const move = function(dataFromMessage) {
			let basePositionOnChildPath = dataFromMessage.basePositionOnChild;
			let moveChildPath = dataFromMessage.moveChild;
			let containerAndParent = findContainerAndParent(dataContainer, moveChildPath);
			let parentContainer = containerAndParent.parent.children;
			let moveChild = containerAndParent.container;
			let moveChildIndex = parentContainer.indexOf(moveChild);
			let movingChild = parentContainer.splice(moveChildIndex, 1)[0];
			let basePositionChild = findContainer(dataContainer, basePositionOnChildPath);
			let basePositionOnIndex = parentContainer.indexOf(basePositionChild);

			if (dataFromMessage.newPosition === "before") {
				parentContainer.splice(basePositionOnIndex, 0, movingChild);
			} else {
				parentContainer.splice(basePositionOnIndex + 1, 0, movingChild);
			}
		};

		const getSpec = function() {
			return spec;
		};

		start();

		return Object.freeze({
			type: "dataHolder",
			getSpec: getSpec,
			handleMsg: handleMsg,
			getData: getData,
			getDataWithActionLinks: getDataWithActionLinks,
			setValue: setValue,
			addChild: addChild,
			remove: remove,
			findContainer: findContainer
		});
	};
	return cora;
}(CORA));