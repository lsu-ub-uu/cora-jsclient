/*
 * Copyright 2015, 2016, 2017, 2024 Olov McKie
 * Copyright 2015, 2016, 2020, 2024 Uppsala University Library
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
		let containerPathNoRepeatId = {};

		const start = function() {
			dataContainer = createDataContainerForElementWithId(metadataId);
			let pathString = JSON.stringify([]);
			containerPath[pathString] = dataContainer;
			subscribeToAddAndSetValueAndRemoveAndMoveMessagesForAllPaths();
		};

		const createDataContainerForElementWithId = function(id, repeatIdIn) {
			let cMetadataElement = getMetadataById(id);
			let nameInData = cMetadataElement.getFirstAtomicValueByNameInData('nameInData');
			let dataContainerPart = {
				name: nameInData,
			};
			if (undefined !== repeatIdIn) {
				dataContainerPart.repeatId = repeatIdIn;
			}

			addContainerContentFromElement(dataContainerPart, cMetadataElement);

			return dataContainerPart;
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const addContainerContentFromElement = function(dataContainerPart, cMetadataElement) {
			addChildrenOrValueOfAtomic(dataContainerPart, cMetadataElement);
			return dataContainerPart;
		};

		const addChildrenOrValueOfAtomic = function(dataContainerPart, cMetadataElement) {
			let type = getDataType(cMetadataElement);
			if(isResourceLink(type)){
				dataContainerPart.mimeType= "";
			}else if (isChild(type)) {
				addGroupParts(dataContainerPart);
			} else {
				dataContainerPart.value = "";
			}
		};

		const getDataType = function(cMetadataElement) {
			return cMetadataElement.getData().attributes.type;
		};

		const isChild = function(type) {
			return isGroup(type) || isRecordLink(type);
		};

		const isGroup = function(type) {
			return type === "group";
		};

		const addGroupParts = function(dataContainerPart) {
			dataContainerPart.children = [];
		};

		const addAttribute = function(path, id, nameInData) {
			let foundContainer = findContainer(path);
			let attributeContainers = [];
			if (foundContainer.attributes === undefined) {
				foundContainer.attributes = attributeContainers;
			} else {
				attributeContainers = foundContainer.attributes;
			}

			let attributeContainer = {
				id: id,
				nameInData: nameInData,
				value: ""
			};

			attributeContainers.push(attributeContainer);

			let pathSpec = {
				metadataIdToAdd: id,
				parentPath: path,
				type: "attribute"
			};
			let pathString = JSON.stringify(CORA.calculatePathForNewElement(pathSpec));
			containerPath[pathString] = attributeContainer;
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
			} else if (msg.endsWith("addAttribute")) {
				addAttribute(dataFromMsg.path, dataFromMsg.metadataId, dataFromMsg.nameInData)
			} else if (msg.endsWith("setValue")) {
				if("resourceLink"===dataFromMsg.special){
					setMimeTypeInfo(dataFromMsg);
				}else{
					setValue(dataFromMsg.path, dataFromMsg.data);
				}
			} else if (msg.endsWith("linkedData")) {
				setActionLinks(dataFromMsg.path, dataFromMsg.data);
			} else if (msg.endsWith("remove")) {
				remove(dataFromMsg.path);
			} else if (msg.endsWith("move")) {
				move(dataFromMsg);
			}
		};

		const getData = function() {
			let dataContainerCopy = makeIndependentCopy(dataContainer);
			removeNonDataInfoFromContainerIncludingActionLinks(dataContainerCopy);
			return dataContainerCopy;
		};

		const makeIndependentCopy = function(obj) {
			return JSON.parse(JSON.stringify(obj));
		};

		const removeNonDataInfoFromContainerIncludingActionLinks = function(data) {
			removeNonDataInfoFromContainer(data, true);
		};

		const removeNonDataInfoFromContainer = function(data, removeLinks) {
			changeAttributes(data);
			if (removeLinks && data.actionLinks !== undefined) {
				delete data.actionLinks;
			}
			if (data.children !== undefined) {
				data.children.forEach(function(child) {
					removeNonDataInfoFromContainer(child, removeLinks);
				});
			}
		};

		const changeAttributes = function(data) {
			let oldAttributes = data.attributes;
			if (data.attributes !== undefined) {
				let newAttributes = {};
				oldAttributes.forEach(function(attribute) {
					let nameInData = attribute.nameInData;
					let value = attribute.value;
					newAttributes[nameInData] = value;
				});
				data.attributes = newAttributes;
			}
		};

		const getDataWithActionLinks = function() {
			let dataContainerCopy = makeIndependentCopy(dataContainer);
			removeNonDataInfoFromContainerLeavingActionLinks(dataContainerCopy);
			return dataContainerCopy;
		};

		const removeNonDataInfoFromContainerLeavingActionLinks = function(data) {
			removeNonDataInfoFromContainer(data, false);
		};

		const setMimeTypeInfo = function(dataFromMsg) {
			let mimeType = dataFromMsg.data.mimeType;
			let foundContainer = findContainer(dataFromMsg.path);
			foundContainer.mimeType = mimeType;
			foundContainer.actionLinks = dataFromMsg.data.actionLinks;
		};

		const setValue = function(path, value) {
			try {
				setValueInContainerListUsingPath(path, value);
			} catch (e) {
				throw new Error("Set value into conatiner failed, with path: " + JSON.stringify(path)
					+ " and value: " + value + ". " + e);
			}
		};

		const setValueInContainerListUsingPath = function(path, value) {
			let foundContainer = findContainer(path);
			foundContainer.value = value;
		};

		const setActionLinks = function(path, data) {
			try {
				setActionLinksInContainerListUsingPath(path, data);
			} catch (e) {
				throw new Error("Set actionLink failed. " + e);
			}
		};

		const setActionLinksInContainerListUsingPath = function(path, data) {
			let foundContainer = findContainer(path);
			if (messageContainsDataWithActionLinks(data)) {
				foundContainer.actionLinks = data.actionLinks;
			}
		};

		const messageContainsDataWithActionLinks = function(data) {
			return data !== undefined && undefined !== data.actionLinks;
		};

		const findContainer = function(path) {
			let pathToFind = JSON.stringify(path);
			let foundContainer = containerPath[pathToFind];
			if (undefined === foundContainer) {
				throw new Error("Unable to find container with path: "
					+ JSON.stringify(path) + " in dataHolder");
			}
			return foundContainer;
		};

		const findContainersUsingPathAndMetadataId = function(path, metadataIdIn) {
			let nextLevelPathNoRepeatId = createNextLevelPath(path, metadataIdIn);
			let pathToFind = JSON.stringify(nextLevelPathNoRepeatId);
//			console.log("pathToFindJson",pathToFind)
//			console.log("pathToFind",nextLevelPathNoRepeatId)
//			console.log("containerPathNoRepeatId",containerPathNoRepeatId)
//			console.log("containerPathNoRepeatIdJSON",JSON.stringify(containerPathNoRepeatId))
			let foundContainer = containerPathNoRepeatId[pathToFind];
			if (undefined === foundContainer) {
				return [];
			}
			return foundContainer;
		};

		const findContainerAndParent = function(path) {
			let foundContainer = findContainer(path);

			let parentPath = makeIndependentCopy(path);
			parentPath.pop();
			let containerParent = findContainer(parentPath);
			return {
				parent: containerParent,
				container: foundContainer
			};
		};


		const addChild = function(parentPath, metadataIdToAdd, repeatId) {
			try {
				tryToAddChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId);
			} catch (e) {
				throw new Error("Add conatiner failed, with path: " + JSON.stringify(parentPath)
					+ ", metadataId: " + JSON.stringify(metadataIdToAdd) + " and repeatId:" + repeatId
					+ ". " + e);
			}
		};

		const tryToAddChildInContainerListUsingPath = function(parentPath, metadataIdToAdd, repeatId) {
			//TODO:new method: add to dataContainer
			let containerSpecifiedByPath = dataContainer;
			if (pathSpecifiesMoreLevels(parentPath)) {
				let foundContainer = findContainer(parentPath);
				containerSpecifiedByPath = foundContainer;
			}
			let newChild = createDataContainerForElementWithId(metadataIdToAdd, repeatId);
			containerSpecifiedByPath.children.push(newChild);

			//TODO:new method: add to containerPath
			let newPath = createNextLevelPath(parentPath, metadataIdToAdd, repeatId);
			let pathString = JSON.stringify(newPath);
			containerPath[pathString] = newChild;

			//TODO:new method: add to containerPathNoRepeatId
			let newPathNoRepeatId = createNextLevelPath(parentPath, metadataIdToAdd);
			let pathStringNoRepeatId = JSON.stringify(newPathNoRepeatId);
			if (undefined === containerPathNoRepeatId[pathStringNoRepeatId]) {
				containerPathNoRepeatId[pathStringNoRepeatId] = [];
			}
			containerPathNoRepeatId[pathStringNoRepeatId].push(newChild);
		};

		const pathSpecifiesMoreLevels = function(path) {
			return path.length > 0;
		};

		const createNextLevelPath = function(parentPath, metadataIdToAdd, repeatId) {
			let pathSpec = {
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
				throw new Error("Remove container failed with path: " + JSON.stringify(path)
					+ ". " + e);
			}
		};

		const removeContainerWithPath = function(path) {
			removeContainerPath(path);
			removeContainerPathNoRepeatId(path);
		};

		const removeContainerPath = function(path) {
			//remove from dataContainer
			let containerAndParent = findContainerAndParent(path);
			let foundContainer = containerAndParent.container;
			let containerParent = containerAndParent.parent;
			const index = containerParent.children.indexOf(foundContainer);
			containerParent.children.splice(index, 1);
			
			//remove from containerPath
//			console.log("before remove path",path)
//			console.log("before remove containerPath",containerPath)
			let pathAsString = JSON.stringify(path);
//			delete containerPath[pathAsString];
	Object.keys(containerPath).filter((key) => {
//				console.log("KEY!",key)
//				console.log("pathAsString!",pathAsString.slice(0,-1))
//				console.log("return!",key.startsWith(pathAsString.slice(0,-1)))
				return key.startsWith(pathAsString.slice(0,-1))})
					.forEach(key => delete containerPath[key]);		
//			console.log("after remove path",path)
//			console.log("after remove containerPath",containerPath)
			
		};

		const removeContainerPathNoRepeatId = function(path) {
			let pathAsString = JSON.stringify(path);
			if (lastElementOfPathHasRepeatId(path)) {
				removeContainerWithRepeatId(pathAsString);
			} else {
//				console.log("before remove path",path)
//				console.log("before remove containerPathNoRepeatId",containerPathNoRepeatId)
//				containerPathNoRepeatId[pathAsString] = [];
				Object.keys(containerPathNoRepeatId).filter((key) => {
//				console.log("KEY!",key)
//				console.log("pathAsString!",pathAsString.slice(0,-1))
//				console.log("return!",key.startsWith(pathAsString.slice(0,-1)))
				return key.startsWith(pathAsString.slice(0,-1))})
					.forEach(key => delete containerPathNoRepeatId[key]);
//					.forEach(key => containerPathNoRepeatId[key]=[]);
//				 console.log("kalle1")
////				 console.log("object2", object2)
//				 console.log("kalle2")
//				console.log("after remove path",path)
//				console.log("after remove containerPathNoRepeatId",containerPathNoRepeatId)
			}
		};

		const lastElementOfPathHasRepeatId = function(path) {
			let lastPathPart = path[path.length - 1];
			return lastPathPart.includes(".");
		};

		const removeContainerWithRepeatId = function(pathAsString) {
			let pathWithoutRepeatIdOnLastPart = pathAsString.substring(0, pathAsString.lastIndexOf(".")) + "\"]";
			let lastPartRepeatId = pathAsString.substring(pathAsString.lastIndexOf(".") + 1, pathAsString.length - 2);
			let noRepeatIdContainers = containerPathNoRepeatId[pathWithoutRepeatIdOnLastPart];
			let containersToKeep = noRepeatIdContainers.filter(container => container.repeatId !== lastPartRepeatId);
//			console.log("before remove path",pathAsString)
//				console.log("before remove containerPathNoRepeatId",containerPathNoRepeatId)
			containerPathNoRepeatId[pathWithoutRepeatIdOnLastPart] = containersToKeep;
			
//			Object.keys(containerPathNoRepeatId).filter((key) => {
//				console.log("KEY!",key)
//				console.log("pathAsString!",pathAsString.slice(0,-1))
//				console.log("return!",key.startsWith(pathAsString.slice(0,-1)))
//				return key.startsWith(pathAsString.slice(0,-1))})
////					.forEach(key => delete containerPathNoRepeatId[key]);
//					.forEach(key =>  containerPathNoRepeatId[key]=containersToKeep);
//				 console.log("anka1")
////				 console.log("object2", object2)
//				 console.log("anka2")
//			console.log("after remove path",pathAsString)
//				console.log("after remove containerPathNoRepeatId",containerPathNoRepeatId)
		};

		const move = function(dataFromMessage) {
			try {
				tryToMove(dataFromMessage);
			} catch (e) {
				throw new Error("Move conatiner failed, with "
					+ "moveChild: " + JSON.stringify(dataFromMessage.moveChild) + ", "
					+ "basePositionOnChild: " + JSON.stringify(dataFromMessage.basePositionOnChild)
					+ " and newPosition: " + dataFromMessage.newPosition
					+ ". " + e);
			}
		};

		const tryToMove = function(dataFromMessage) {
			let basePositionOnChildPath = dataFromMessage.basePositionOnChild;
			let moveChildPath = dataFromMessage.moveChild;
			let containerAndParent = findContainerAndParent(moveChildPath);
			let parentContainerChildren = containerAndParent.parent.children;
			let moveChild = containerAndParent.container;
			let moveChildIndex = parentContainerChildren.indexOf(moveChild);
			let movingChild = parentContainerChildren.splice(moveChildIndex, 1)[0];
			let basePositionChild = findContainer(basePositionOnChildPath);
			let basePositionOnIndex = parentContainerChildren.indexOf(basePositionChild);

			if (dataFromMessage.newPosition === "before") {
				parentContainerChildren.splice(basePositionOnIndex, 0, movingChild);
			} else {
				parentContainerChildren.splice(basePositionOnIndex + 1, 0, movingChild);
			}
		};

		const getSpec = function() {
			return spec;
		};
		const onlyForTestGetContainerPath = function() {
			return containerPath;
		};
		const onlyForTestGetContainerPathNoRepeatId = function() {
			return containerPathNoRepeatId;
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
			findContainer: findContainer,
			findContainersUsingPathAndMetadataId: findContainersUsingPathAndMetadataId,
			onlyForTestGetContainerPath: onlyForTestGetContainerPath,
			onlyForTestGetContainerPathNoRepeatId: onlyForTestGetContainerPathNoRepeatId
		});
	};
	return cora;
}(CORA));