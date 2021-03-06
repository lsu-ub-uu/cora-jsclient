/*
 * Copyright 2016, 2017, 2018 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
		var view = createBaseView();
		var childrenView = createChildrenView();
		var buttonView;

		var nodeBeeingDragged;
		var lastChangedWith;
		var addDragged;
		var beeingDraggedY;
		var childIsCurrentlyBeeingDragged = false;
		var lastRepeatingElementDraggedOver;

		view.appendChild(childrenView);
		if (spec.mode === "input" && (spec.addMethod !== undefined || spec.upload === "true")) {
			createButtonView();
		}

		function createBaseView() {
			var newClassName = "pChildRefHandler";
			if (spec.textStyle !== undefined) {
				newClassName += " " + spec.textStyle;
			}
			if (spec.childStyle !== undefined) {
				newClassName += " " + spec.childStyle;
			}
			newClassName += " " + spec.presentationId;
			return CORA.gui.createSpanWithClassName(newClassName);
		}

		function getView() {
			return view;
		}

		function createButtonView() {
			var buttonViewNew = CORA.gui.createSpanWithClassName("buttonView");
			if (spec.upload !== "true") {
				buttonViewNew.appendChild(createAddButton());
			} else {
				buttonViewNew.appendChild(createBrowseButton());

			}
			buttonView = buttonViewNew;
			view.appendChild(buttonView);
		}

		function createAddButton() {
			var button = document.createElement("input");
			button.type = "button";
			button.value = spec.addText;
			button.onclick = spec.addMethod;
			return button;
		}

		function createBrowseButton() {
			var button = document.createElement("input");
			button.type = "file";
			button.multiple = "true";
			button.onchange = function() {
				spec.handleFilesMethod(this.files);
			};
			return button;
		}

		function hideButtonView() {
			buttonView.styleOriginal = buttonView.style.display;
			buttonView.style.display = "none";
		}

		function showButtonView() {
			if (buttonView.styleOriginal !== undefined) {
				buttonView.style.display = buttonView.styleOriginal;
			}
		}

		function setRepeatingElementDragOver(repeatingElement) {
			lastRepeatingElementDraggedOver = repeatingElement;
		}

		function createChildrenView() {
			var childrenViewNew = CORA.gui.createSpanWithClassName("childrenView");
			if (spec.isRepeating) {
				addDragEventHandlers(childrenViewNew);
			}
			return childrenViewNew;
		}

		function addDragEventHandlers(childrenViewNew) {
			childrenViewNew.ondragstart = dragstartHandler;
		}

		function dragstartHandler(event) {
			if (nodeBeeingDraggedIsRepeatingElementChildOfThisHandler(event)) {
				startDragHandling(event);
			}
		}

		function nodeBeeingDraggedIsRepeatingElementChildOfThisHandler(event) {
			return event.target.parentNode === childrenView;
		}

		function startDragHandling(event) {
			setInformationInEventForDragging(event);
			addOtherDragEventsToChildrenView();
			setStatesForDragging(event);
			setStyleOnNodeBeeingDragged();
		}

		function setInformationInEventForDragging(event) {
			event.stopPropagation();
			event.dataTransfer.setData("text/notInUse", "notUsed");
			event.dataTransfer.effectAllowed = "move";
		}

		function addOtherDragEventsToChildrenView() {
			childrenView.ondragover = dragoverHandler;
			childrenView.ondragenter = dragenterHandler;
			childrenView.ondrop = dropHandler;
			childrenView.ondragend = dragendHandler;
		}

		function setStatesForDragging(event) {
			childIsCurrentlyBeeingDragged = true;
			nodeBeeingDragged = event.target;
			beeingDraggedY = event.screenY;
		}

		function setStyleOnNodeBeeingDragged() {
			nodeBeeingDragged.originalClassname = nodeBeeingDragged.className;
			nodeBeeingDragged.className = nodeBeeingDragged.className + " beeingDragged";
		}

		function dragoverHandler(event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = "move";
		}

		function dragenterHandler(event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = "move";
			if (childIsCurrentlyBeeingDragged && aRepeatingElementHasBeenDraggedOver()) {
				moveNodeBeeingDraggedIfDraggedOverSibblingNode(event);
			}
		}

		function aRepeatingElementHasBeenDraggedOver() {
			return lastRepeatingElementDraggedOver !== undefined;
		}

		function moveNodeBeeingDraggedIfDraggedOverSibblingNode(event) {
			if (isSibblingNodes(nodeBeeingDragged, lastRepeatingElementDraggedOver.getView())) {
				moveNodeBeeingDragged(event);
			}
		}

		function isSibblingNodes(node1, node2) {
			if (node1 === node2) {
				return false;
			}
			return node1.parentNode === node2.parentNode;
		}

		function moveNodeBeeingDragged(event) {
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
		}

		function dragDirectionIsDown(event) {
			var difY = event.screenY - beeingDraggedY;
			return difY > 0;
		}

		function dropHandler(event) {
			event.preventDefault();
			if (childIsCurrentlyBeeingDragged) {
				event.stopPropagation();
				event.dataTransfer.dropEffect = "move";
			}
		}

		function dragendHandler(event) {
			event.preventDefault();
			if (childIsCurrentlyBeeingDragged) {
				handleDraggedElements(event);

				childrenView.ondragover = null;
				childrenView.ondragenter = null;
				childrenView.ondrop = null;
				childrenView.ondragend = null;
			}
		}

		function handleDraggedElements(event) {
			event.stopPropagation();
			resetNodeBeeingDragged();
			possiblySendMoveMessage();
			resetDragSystem();
		}

		function resetNodeBeeingDragged() {
			var indexClassName = nodeBeeingDragged.className.indexOf(" beeingDragged");
			nodeBeeingDragged.className = nodeBeeingDragged.className.substring(0, indexClassName);
			nodeBeeingDragged.draggable = undefined;
		}

		function possiblySendMoveMessage() {
			if (nodesHasChangedPlace()) {
				sendMoveMessage();
			}
		}

		function nodesHasChangedPlace() {
			return lastChangedWith !== undefined;
		}

		function sendMoveMessage() {
			var data = {
				"moveChild" : nodeBeeingDragged.modelObject.getPath(),
				"basePositionOnChild" : lastChangedWith.getPath(),
				"newPosition" : addDragged
			};
			view.modelObject.childMoved(data);
		}

		function resetDragSystem() {
			nodeBeeingDragged = undefined;
			lastChangedWith = undefined;
			addDragged = undefined;
			beeingDraggedY = undefined;
			childIsCurrentlyBeeingDragged = false;
			lastRepeatingElementDraggedOver = undefined;
		}

		function addChild(child) {
			childrenView.appendChild(child);
		}

		function removeChild(child) {
			childrenView.removeChild(child);
		}

		function moveChild(dataFromMsg) {
			var childToMove = findRepeatingElementByPath(dataFromMsg.moveChild);
			var basePositionOnChild = findRepeatingElementByPath(dataFromMsg.basePositionOnChild);

			if (dataFromMsg.newPosition === "after") {
				childrenView.insertBefore(childToMove, basePositionOnChild.nextSibling);
			} else {
				childrenView.insertBefore(childToMove, basePositionOnChild);
			}
		}

		function findRepeatingElementByPath(pathToFind) {
			var repeatingElements = childrenView.childNodes;
			var jsonPathToFind = JSON.stringify(pathToFind);
			var childKeys = Object.keys(childrenView.childNodes);
			var foundKey = childKeys.find(function(repeatingElementKey) {
				var repeatingElement = repeatingElements[repeatingElementKey];
				var jsonPath = JSON.stringify(repeatingElement.modelObject.getPath());
				return jsonPathToFind === jsonPath;
			});
			return repeatingElements[foundKey];
		}

		function hideChildrensRemoveButton() {
			callOnceOnEachRepeatingElement("hideRemoveButton");
		}

		function callOnceOnEachRepeatingElement(functionToRun) {
			var repeatingElements = childrenView.childNodes;
			var repeatingElementsKeys = Object.keys(repeatingElements);
			repeatingElementsKeys.forEach(function(key) {
				repeatingElements[key].modelObject[functionToRun]();
			});
		}

		function showChildrensRemoveButton() {
			callOnceOnEachRepeatingElement("showRemoveButton");
		}

		function hideChildrensDragButton() {
			callOnceOnEachRepeatingElement("hideDragButton");
		}

		function showChildrensDragButton() {
			callOnceOnEachRepeatingElement("showDragButton");
		}

		function hideChildrensAddBeforeButton() {
			callOnceOnEachRepeatingElement("hideAddBeforeButton");
		}

		function showChildrensAddBeforeButton() {
			callOnceOnEachRepeatingElement("showAddBeforeButton");
		}

		var out = Object.freeze({
			"type" : "pChildRefHandlerView",
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
		view.viewObject = out;
		return out;
	};
	return cora;
}(CORA));