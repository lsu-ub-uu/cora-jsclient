/*
 * Copyright 2016, 2017, 2018, 2020 Uppsala University Library
 * Copyright 2016, 2017, 2018 Olov McKie
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
	cora.pRepeatingElement = function(dependencies, spec) {
		let jsBookkeeper = dependencies.jsBookkeeper;

		let pChildRefHandler = spec.pChildRefHandler;
		let pChildRefHandlerView = spec.pChildRefHandlerView;
		let path = spec.path;

		let userCanRemove = spec.userCanRemove;
		let userCanMove = spec.userCanMove;
		let userCanAddBefore = spec.userCanAddBefore;

		let view;
		let removeButton;
		let dragButton;
		let addBeforeButton;
		let alternativePresentation;
		let defaultPresentation;
		let alternativeButton;
		let defaultButton;

		let buttonView;

		const start = function() {
			view = createBaseView();
			buttonView = createButtonView();
		};

		const createBaseView = function() {
			let repeatingElement = CORA.gui.createSpanWithClassName("repeatingElement");
			if (userCanMove) {
				repeatingElement.ondragenter = ondragenterHandler;
			}
			return repeatingElement;
		};

		const ondragenterHandler = function() {
			pChildRefHandlerView.setRepeatingElementDragOver(view.modelObject);
		};

		const createButtonView = function() {
			let newButtonView = CORA.gui.createSpanWithClassName("buttonView");
			view.appendChild(newButtonView);
			if (userCanRemove) {
				removeButton = createRemoveButton();
				newButtonView.appendChild(removeButton);
			}
			if (userCanMove) {
				dragButton = createDragButton();
				newButtonView.appendChild(dragButton);
			}
			if (userCanAddBefore) {
				addBeforeButton = createAddBeforeButton();
				newButtonView.appendChild(addBeforeButton);
			}

			return newButtonView;
		};

		const createRemoveButton = function() {
			let removeFunction = function() {
				let data = {
					"type": "remove",
					"path": path
				};
				jsBookkeeper.remove(data);
			};
			let newRemoveButton = CORA.gui.createRemoveButton(removeFunction);
			newRemoveButton.addEventListener("mouseenter", function() {
				view.className = "repeatingElement hoverRemove";
			});
			newRemoveButton.addEventListener("mouseleave", function() {
				view.className = "repeatingElement";
			});
			return newRemoveButton;
		};

		const createDragButton = function() {
			let createdDragButton = CORA.gui.createSpanWithClassName("iconButton dragButton");
			createdDragButton.onmousedown = function() {
				view.draggable = "true";
			};
			createdDragButton.onmouseup = function() {
				view.draggable = undefined;
			};
			return createdDragButton;
		};

		const createAddBeforeButton = function() {
			let addBeforeFunction = function() {
				let data = {
					"path": path
				};
				pChildRefHandler.sendAddBefore(data);
			};
			let buttonSpec = {
				"className": "iconButton addBeforeButton",
				action: {
					method: addBeforeFunction
				}
			};
			return CORA.gui.button(buttonSpec);
		};

		const getView = function() {
			return view;
		};

		const addPresentation = function(defaultPresentationIn) {
			defaultPresentation = defaultPresentationIn.getView();
			defaultPresentation.className = defaultPresentation.className + " default";
			view.insertBefore(defaultPresentation, buttonView);
			view.className = "repeatingElement";
		};

		const addAlternativePresentation = function(presentation, presentationSize) {
			alternativePresentation = presentation.getView();
			alternativePresentation.className = alternativePresentation.className + " alternative";
			view.insertBefore(alternativePresentation, buttonView);
			createDefaultAndAlternativeButtons(presentationSize);
			toggleDefaultShown("true");
		};

		const createDefaultAndAlternativeButtons = function(presentationSize) {
			let buttonClasses = getButtonClassName(presentationSize);
			createAndAddAlternativeButton(buttonClasses);
			createAndAddDefaultButton(buttonClasses);
		};

		const getButtonClassName = function(presentationSize) {
			if (presentationSize === "firstLarger") {
				return {
					default: "maximizeButton",
					alternative: "minimizeButton"
				};
			}
			if (presentationSize === "firstSmaller") {
				return {
					default: "minimizeButton",
					alternative: "maximizeButton"
				};
			}
			return {
				default: "defaultButton",
				alternative: "alternativeButton"
			};
		};

		const createAndAddAlternativeButton = function(buttonClasses) {
			alternativeButton = CORA.gui.createSpanWithClassName("iconButton " + buttonClasses.alternative);
			alternativeButton.onclick = showAlternativePresentation;
			if (userCanMove) {
				buttonView.insertBefore(alternativeButton, dragButton);
			} else {
				buttonView.appendChild(alternativeButton);
			}
		};

		const createAndAddDefaultButton = function(buttonClasses) {
			defaultButton = CORA.gui.createSpanWithClassName("iconButton " + buttonClasses.default);
			defaultButton.onclick = showDefaultPresentation;
			if (userCanMove) {
				buttonView.insertBefore(defaultButton, dragButton);
			} else {
				buttonView.appendChild(defaultButton);
			}
		};

		const showAlternativePresentation = function() {
			toggleDefaultShown("false");
		};

		const showDefaultPresentation = function() {
			toggleDefaultShown("true");
		};

		const toggleDefaultShown = function(defaultShown) {
			if (defaultShown !== undefined && defaultShown === "true") {
				hide(alternativePresentation);
				show(defaultPresentation);
				show(alternativeButton);
				hide(defaultButton);
			} else {
				show(alternativePresentation);
				hide(defaultPresentation);
				hide(alternativeButton);
				show(defaultButton);
			}
		};

		const hideRemoveButton = function() {
			hide(removeButton);
		};

		const showRemoveButton = function() {
			show(removeButton);
		};

		const hideDragButton = function() {
			if(dragButton !== undefined){
				hide(dragButton);
			}
		};

		const showDragButton = function() {
			if(dragButton !== undefined){
				show(dragButton);
			}
		};

		const hide = function(element) {
			element.styleOriginal = element.style.display;
			element.style.display = "none";
		};

		const show = function(element) {
			if (element.styleOriginal !== undefined) {
				element.style.display = element.styleOriginal;
			}
		};

		const hideAddBeforeButton = function() {
			hide(addBeforeButton);
		};

		const showAddBeforeButton = function() {
			show(addBeforeButton);
		};

		const getPath = function() {
			return path;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		let out = Object.freeze({
			"type": "pRepeatingElement",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			addPresentation: addPresentation,
			addAlternativePresentation: addAlternativePresentation,
			hideRemoveButton: hideRemoveButton,
			showRemoveButton: showRemoveButton,
			hideDragButton: hideDragButton,
			showDragButton: showDragButton,
			hideAddBeforeButton: hideAddBeforeButton,
			showAddBeforeButton: showAddBeforeButton,
			getPath: getPath
		});
		start();
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));