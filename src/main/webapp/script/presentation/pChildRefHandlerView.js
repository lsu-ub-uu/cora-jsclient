/*
 * Copyright 2016, 2017, 2018 Uppsala University Library
 * Copyright 2016, 2017, 2023 Olov McKie
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
	cora.pChildRefHandlerView = function(dependencies, spec) {
		let view;
		let childrenView;
		let buttonView;

		let nodeBeeingDragged;
		let lastChangedWith;
		let addDragged;
		let beeingDraggedY;
		let childIsCurrentlyBeeingDragged = false;
		let lastRepeatingElementDraggedOver;

		const start = function() {
			view = createBaseView();
			childrenView = createChildrenView();
			view.appendChild(childrenView);
			if (spec.mode === "input" && (spec.addMethod !== undefined || spec.upload === "true")) {
				createButtonView();
			};
		};

		const createBaseView = function() {
			//TODO: if spec.titleText exist add title (clickabel) 
			
			let newClassName = "pChildRefHandler";
			if (spec.textStyle !== undefined) {
				newClassName += " " + spec.textStyle;
			}
			if (spec.childStyle !== undefined) {
				newClassName += " " + spec.childStyle;
			}
			newClassName += " " + spec.presentationId;
			return CORA.gui.createSpanWithClassName(newClassName);
		};

		const getView = function() {
			return view;
		};

		const createButtonView = function() {
			let buttonViewNew = CORA.gui.createSpanWithClassName("buttonView");
			if (spec.upload !== "true") {
				buttonViewNew.appendChild(createAddButton());
			} else {
				buttonViewNew.appendChild(createBrowseButton());
			}
			buttonView = buttonViewNew;
			view.appendChild(buttonView);
		};

		const createAddButton = function() {
			let button = document.createElement("input");
			button.type = "button";
			button.value = spec.addText;
			button.onclick = spec.addMethod;
			return button;
		};

		const createBrowseButton = function() {
			let button = document.createElement("input");
			button.type = "file";
			button.multiple = "true";
			button.onchange = function() {
				spec.handleFilesMethod(this.files);
			};
			return button;
		};

		const hideButtonView = function() {
			buttonView.styleOriginal = buttonView.style.display;
			buttonView.style.display = "none";
		};

		const showButtonView = function() {
			if (buttonView.styleOriginal !== undefined) {
				buttonView.style.display = buttonView.styleOriginal;
			}
		};

		const setRepeatingElementDragOver = function(repeatingElement) {
			lastRepeatingElementDraggedOver = repeatingElement;
		};

		const createChildrenView = function() {
			let childrenViewNew = CORA.gui.createSpanWithClassName("childrenView");
			if (spec.isRepeating) {
				addDragEventHandlers(childrenViewNew);
			}
			return childrenViewNew;
		};

		const addDragEventHandlers = function(childrenViewNew) {
			childrenViewNew.ondragstart = dragstartHandler;
		};

		const dragstartHandler = function(event) {
			if (nodeBeeingDraggedIsRepeatingElementChildOfThisHandler(event)) {
				startDragHandling(event);
			}
		};

		const nodeBeeingDraggedIsRepeatingElementChildOfThisHandler = function(event) {
			return event.target.parentNode === childrenView;
		};

		const startDragHandling = function(event) {
			setInformationInEventForDragging(event);
			addOtherDragEventsToChildrenView();
			setStatesForDragging(event);
			setStyleOnNodeBeeingDragged();
		};

		const setInformationInEventForDragging = function(event) {
			event.stopPropagation();
			event.dataTransfer.setData("text/notInUse", "notUsed");
			event.dataTransfer.effectAllowed = "move";
		};

		const addOtherDragEventsToChildrenView = function() {
			childrenView.ondragover = dragoverHandler;
			childrenView.ondragenter = dragenterHandler;
			childrenView.ondrop = dropHandler;
			childrenView.ondragend = dragendHandler;
		};

		const setStatesForDragging = function(event) {
			childIsCurrentlyBeeingDragged = true;
			nodeBeeingDragged = event.target;
			beeingDraggedY = event.screenY;
		};

		const setStyleOnNodeBeeingDragged = function() {
			nodeBeeingDragged.classList.add("beeingDragged");
		};

		const dragoverHandler = function(event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = "move";
		};

		const dragenterHandler = function(event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = "move";
			if (childIsCurrentlyBeeingDragged && aRepeatingElementHasBeenDraggedOver()) {
				moveNodeBeeingDraggedIfDraggedOverSibblingNode(event);
			}
		};

		const aRepeatingElementHasBeenDraggedOver = function() {
			return lastRepeatingElementDraggedOver !== undefined;
		};

		const moveNodeBeeingDraggedIfDraggedOverSibblingNode = function(event) {
			if (isSibblingNodes(nodeBeeingDragged, lastRepeatingElementDraggedOver.getView())) {
				moveNodeBeeingDragged(event);
			}
		};

		const isSibblingNodes = function(node1, node2) {
			if (node1 === node2) {
				return false;
			}
			return node1.parentNode === node2.parentNode;
		};

		const moveNodeBeeingDragged = function(event) {
			event.stopPropagation();
			event.preventDefault();
			lastChangedWith = lastRepeatingElementDraggedOver;
			if (dragDirectionIsDown(event)) {
				addDragged = "after";
				nodeBeeingDragged.parentElement.insertBefore(nodeBeeingDragged,
						lastRepeatingElementDraggedOver.getView().nextSibling);
			} else {
				addDragged = "before";
				nodeBeeingDragged.parentElement.insertBefore(nodeBeeingDragged,
						lastRepeatingElementDraggedOver.getView());
			}
		};

		const dragDirectionIsDown = function(event) {
			let difY = event.screenY - beeingDraggedY;
			return difY > 0;
		};

		const dropHandler = function(event) {
			event.preventDefault();
			if (childIsCurrentlyBeeingDragged) {
				event.stopPropagation();
				event.dataTransfer.dropEffect = "move";
			}
		};

		const dragendHandler = function(event) {
			event.preventDefault();
			if (childIsCurrentlyBeeingDragged) {
				handleDraggedElements(event);

				childrenView.ondragover = null;
				childrenView.ondragenter = null;
				childrenView.ondrop = null;
				childrenView.ondragend = null;
			}
		};

		const handleDraggedElements = function(event) {
			event.stopPropagation();
			resetNodeBeeingDragged();
			possiblySendMoveMessage();
			resetDragSystem();
		};

		const resetNodeBeeingDragged = function() {
			nodeBeeingDragged.classList.remove("beeingDragged");
			nodeBeeingDragged.draggable = undefined;
		};

		const possiblySendMoveMessage = function() {
			if (nodesHasChangedPlace()) {
				sendMoveMessage();
			}
		};

		const nodesHasChangedPlace = function() {
			return lastChangedWith !== undefined;
		};

		const sendMoveMessage = function() {
			let data = {
				moveChild : nodeBeeingDragged.modelObject.getPath(),
				basePositionOnChild : lastChangedWith.getPath(),
				newPosition : addDragged
			};
			view.modelObject.childMoved(data);
		};

		const resetDragSystem = function() {
			nodeBeeingDragged = undefined;
			lastChangedWith = undefined;
			addDragged = undefined;
			beeingDraggedY = undefined;
			childIsCurrentlyBeeingDragged = false;
			lastRepeatingElementDraggedOver = undefined;
		};

		const addChild = function(child) {
			childrenView.appendChild(child);
		};

		const removeChild = function(child) {
			childrenView.removeChild(child);
		};

		const moveChild = function(dataFromMsg) {
			let childToMove = findRepeatingElementByPath(dataFromMsg.moveChild);
			let basePositionOnChild = findRepeatingElementByPath(dataFromMsg.basePositionOnChild);

			if (dataFromMsg.newPosition === "after") {
				childrenView.insertBefore(childToMove, basePositionOnChild.nextSibling);
			} else {
				childrenView.insertBefore(childToMove, basePositionOnChild);
			}
		};

		const findRepeatingElementByPath = function(pathToFind) {
			let repeatingElements = childrenView.childNodes;
			let jsonPathToFind = JSON.stringify(pathToFind);
			let childKeys = Object.keys(childrenView.childNodes);
			let foundKey = childKeys.find(function(repeatingElementKey) {
				let repeatingElement = repeatingElements[repeatingElementKey];
				let jsonPath = JSON.stringify(repeatingElement.modelObject.getPath());
				return jsonPathToFind === jsonPath;
			});
			return repeatingElements[foundKey];
		};

		const hideChildrensRemoveButton = function() {
			callOnceOnEachRepeatingElement("hideRemoveButton");
		};

		const callOnceOnEachRepeatingElement = function(functionToRun) {
			let repeatingElements = childrenView.childNodes;
			let repeatingElementsKeys = Object.keys(repeatingElements);
			repeatingElementsKeys.forEach(function(key) {
				repeatingElements[key].modelObject[functionToRun]();
			});
		};

		const showChildrensRemoveButton = function() {
			callOnceOnEachRepeatingElement("showRemoveButton");
		};

		const hideChildrensDragButton = function() {
			callOnceOnEachRepeatingElement("hideDragButton");
		};

		const showChildrensDragButton = function() {
			callOnceOnEachRepeatingElement("showDragButton");
		};

		const hideChildrensAddBeforeButton = function() {
			callOnceOnEachRepeatingElement("hideAddBeforeButton");
		};

		const showChildrensAddBeforeButton = function() {
			callOnceOnEachRepeatingElement("showAddBeforeButton");
		};

		let out = Object.freeze({
			type : "pChildRefHandlerView",
			getView : getView,
			setRepeatingElementDragOver : setRepeatingElementDragOver,
			addChild : addChild,
			removeChild : removeChild,
			moveChild : moveChild,
			hideChildrensRemoveButton : hideChildrensRemoveButton,
			showChildrensRemoveButton : showChildrensRemoveButton,
			hideChildrensDragButton : hideChildrensDragButton,
			showChildrensDragButton : showChildrensDragButton,
			hideChildrensAddBeforeButton : hideChildrensAddBeforeButton,
			showChildrensAddBeforeButton : showChildrensAddBeforeButton,
			dragstartHandler : dragstartHandler,
			dragoverHandler : dragoverHandler,
			dragenterHandler : dragenterHandler,
			dropHandler : dropHandler,
			dragendHandler : dragendHandler,
			hideButtonView : hideButtonView,
			showButtonView : showButtonView
		});
		start();
		view.viewObject = out;
		return out;
	};
	return cora;
}(CORA));