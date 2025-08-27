/*
 * Copyright 2016, 2017, 2018, 2020 Uppsala University Library
 * Copyright 2016, 2017, 2018, 2023 Olov McKie
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
		const jsBookkeeper = dependencies.jsBookkeeper;
		const containsDataTrackerFactory = dependencies.containsDataTrackerFactory;

		const pChildRefHandler = spec.pChildRefHandler;
		const pChildRefHandlerView = spec.pChildRefHandlerView;
		const path = spec.path;

		const userCanRemove = spec.userCanRemove;
		const userCanMove = spec.userCanMove;
		const userCanAddBefore = spec.userCanAddBefore;
		const clickableHeadlineText = spec.clickableHeadlineText;
		const clickableHeadlineLevel = spec.clickableHeadlineLevel;
		const mode = spec.mode;

		let presentationSize = spec.presentationSize;

		let view;
		let removeButton;
		let dragButton;
		let addBeforeButton;
		let alternativePresentation;
		let defaultPresentation;
		let alternativeButton;
		let defaultButton;

		let buttonView;
		let showDefaultPresentationNext = false;
		let toggleButtonsAreCreated = false;


		//TODO:: defalut hidden för klickbar rubrik
		//TODO: clickable headline
		//TODO: handle correct for view side where there is no data from start when
		//  adding data so it is shown on add  or not depending on initial value


		//TODO: Clickable headline should not be shown in view mode if no data...
		//fixed for pNonRepeating
		//TODO: data state for headline
		//works for pNonRepeating


		//TODO: add new, always initialShown, after startup is completret
		//TODO: firstshow for initial hidden.... as with alternative

		//TODO: look into tabstops

		//TODO:Bug not new.. 
		// needs to handle reload metadata.... currently does not show it again... if no value on reload
		const start = function() {
			view = createBaseView();
			buttonView = createButtonView();
			possiblyAddClickableHeadline();
			createContainsDataTracker();
			updateViewForNoData();
		};
		
		const createContainsDataTracker = function() {
			let containsDataTrackerSpec = {
				methodToCallOnContainsDataChange: methodToCallOnContainsDataChange,
				path: spec.path
			};
			containsDataTrackerFactory.factor(containsDataTrackerSpec);
		};

		const methodToCallOnContainsDataChange = function(state) {
			if (state) {
				updateViewForData();
			} else {
				updateViewForNoData();
			}
		};

		const updateViewForData = function() {
			view.classList.add("containsData");
			view.classList.remove("containsNoData");
			//			if (mode === "output") {
			show(view);
			//			}
		};

		const updateViewForNoData = function() {
			view.classList.remove("containsData");
			view.classList.add("containsNoData");
			if (mode === "output") {
				hide(view);
			}
		};

		const createBaseView = function() {
			let repeatingElement = CORA.createSpanWithClassName("repeatingElement");
			if (userCanMove) {
				repeatingElement.ondragenter = ondragenterHandler;
			}
			return repeatingElement;
		};

		const ondragenterHandler = function() {
			pChildRefHandlerView.setRepeatingElementDragOver(view.modelObject);
		};

		const createButtonView = function() {
			let newButtonView = CORA.createSpanWithClassName("buttonView");
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
					type: "remove",
					path: path
				};
				jsBookkeeper.remove(data);
			};
			let newRemoveButton = CORA.createRemoveButton(removeFunction);
			newRemoveButton.addEventListener("mouseenter", function() {
				view.classList.add("hoverRemove");
			});
			newRemoveButton.addEventListener("mouseleave", function() {
				view.classList.remove("hoverRemove");
			});
			return newRemoveButton;
		};

		const createDragButton = function() {
			let createdDragButton = CORA.createSpanWithClassName("iconButton dragButton");
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
					path: path
				};
				pChildRefHandler.sendAddBefore(data);
			};
			let buttonSpec = {
				className: "iconButton addBeforeButton",
				action: {
					method: addBeforeFunction
				}
			};
			return CORA.button(buttonSpec);
		};

		const possiblyAddClickableHeadline = function() {
			if (clickableHeadlineText) {
				const level = clickableHeadlineLevel || "h2";
				addClickableHeadline(clickableHeadlineText, level);
				presentationSize = presentationSize || "singleInitiallyHidden";
				createDefaultAndAlternativeButtons(presentationSize);
			}
		};

		const addClickableHeadline = function(text, level) {
			let headline = document.createElement(level);
			headline.classList.add("clickableHeadline");
			headline.addEventListener('click', () => {
				toggleDefaultShown();
			});
			view.insertBefore(headline, buttonView);
			headline.appendChild(document.createTextNode(text));
		};

		const getView = function() {
			return view;
		};

		const addPresentation = function(defaultPresentationIn) {
			defaultPresentation = defaultPresentationIn.getView();
			defaultPresentation.classList.add("default");
			view.insertBefore(defaultPresentation, buttonView);
			view.className = "repeatingElement";
			possiblyHideDefaultPresentationIfClickableHeadlineIsInitiallyHidden();
		};

		const possiblyHideDefaultPresentationIfClickableHeadlineIsInitiallyHidden = function() {
			if (presentationSize === "singleInitiallyHidden") {
				showDefaultPresentationNext = false;
				toggleDefaultShown();
			}
			if (presentationSize === "singleInitiallyVisible") {
				showDefaultPresentationNext = true;
				toggleDefaultShown();
			}
		};

		const addAlternativePresentation = function(presentation) {
			alternativePresentation = presentation.getView();
			alternativePresentation.classList.add("alternative");
			view.insertBefore(alternativePresentation, buttonView);
			createDefaultAndAlternativeButtons(presentationSize);
			showDefaultPresentationNext = true;
			toggleDefaultShown();
		};

		const createDefaultAndAlternativeButtons = function(presentationSize) {
			if (!toggleButtonsAreCreated) {
				toggleButtonsAreCreated = true;
				let buttonClasses = getButtonClassName(presentationSize);
				createAndAddAlternativeButton(buttonClasses);
				createAndAddDefaultButton(buttonClasses);
			}
		};

		const getButtonClassName = function(presentationSize) {
			//			nameInData: presentationSize
			//			presentationId: presentationSizePCollVar
			//			itemCollection: presentationSizeCollection(firstSmaller) Första presentationen är mindre - Den första presentationen är mindre
			//			(firstLarger) Första presentationen är större - Första presentationen är större
			//			(bothEqual) Båda är likvärdiga - Båda alternativen är likvärdiga i storlek, d.v.s. det går inte att säga att den ena är större än den andra.
			//			(singleInitiallyHidden) Enstaka är dold initialt - Om det endast finns en presentation ska den vara dold initialt
			//			(singleInitiallyVisible) Enstaka visas initialt - Om det endast finns en presentation ska den vara synlig initialt
			if (presentationSizeIsExpanding(presentationSize)) {
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

		const presentationSizeIsExpanding = function(presentationSize) {
			return ["firstLarger", "singleInitiallyHidden", "singleInitiallyVisible"]
				.includes(presentationSize);
		};

		const createAndAddAlternativeButton = function(buttonClasses) {
			alternativeButton = CORA.createSpanWithClassName("iconButton " + buttonClasses.alternative);
			alternativeButton.onclick = showAlternativePresentation;
			if (userCanMove) {
				buttonView.insertBefore(alternativeButton, dragButton);
			} else {
				buttonView.appendChild(alternativeButton);
			}
		};

		const createAndAddDefaultButton = function(buttonClasses) {
			defaultButton = CORA.createSpanWithClassName("iconButton " + buttonClasses.default);
			defaultButton.onclick = showDefaultPresentation;
			if (userCanMove) {
				buttonView.insertBefore(defaultButton, dragButton);
			} else {
				buttonView.appendChild(defaultButton);
			}
		};

		const showAlternativePresentation = function() {
			showDefaultPresentationNext = false;
			toggleDefaultShown();
		};

		const showDefaultPresentation = function() {
			showDefaultPresentationNext = true;
			toggleDefaultShown();
		};

		const toggleDefaultShown = function() {
			if (showDefaultPresentationNext === true) {
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
			showDefaultPresentationNext = !showDefaultPresentationNext;
		};

		const hideRemoveButton = function() {
			hide(removeButton);
		};

		const showRemoveButton = function() {
			show(removeButton);
		};

		const hideDragButton = function() {
			if (dragButton !== undefined) {
				hide(dragButton);
			}
		};

		const showDragButton = function() {
			if (dragButton !== undefined) {
				show(dragButton);
			}
		};

			console.log("spike bugfix in pRepeatingElement")
//		const hide = function(element) {
//			if (element) {
//				element.styleOriginal = element.style.display;
//				element.style.display = "none";
//			}
//		};
//
//		const show = function(element) {
//			if (element) {
//				if (element.styleOriginal !== undefined) {
//					element.style.display = element.styleOriginal;
//				}
//			}
//		};
const hide = function(element) {
			if (element !== undefined && element.style.display !== "none") {
				element.styleOriginal = element.style.display;
				element.style.display = "none";
			}
		};

		const show = function(element) {
			if (element !== undefined) {
				if (element.styleOriginal !== undefined) {
					element.style.display = element.styleOriginal;
				} else {
					element.style.display = "";
				}
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
			type: "pRepeatingElement",
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
			getPath: getPath,
			onlyForTestMethodToCallOnContainsDataChange: methodToCallOnContainsDataChange
		});
		start();
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));