/*
 * Copyright 2018, 2020 Uppsala University Library
 * Copyright 2018 Olov McKie
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
	cora.pNonRepeatingChildRefHandlerView = function(dependencies, spec) {
		let view;
		let buttonView;
		let alternativePresentation;
		let defaultPresentation;
		let alternativeButton;
		let defaultButton;
		let currentDefaultShown = "true";
		let containsData = false;
		let originalStyle;
		let callOnFirstShowOfAlternativePresentationShouldBeCalled = true;

		const start = function() {
			view = createBaseView();
			setContainsDataStyle();
		};

		const createBaseView = function() {
			let newClassName = "pNonRepeatingChildRefHandler";
			if (spec.textStyle !== undefined) {
				newClassName += " " + spec.textStyle;
			}
			if (spec.childStyle !== undefined) {
				newClassName += " " + spec.childStyle;
			}
			newClassName += " " + spec.presentationId;
			originalStyle = newClassName;
			return CORA.gui.createSpanWithClassName(newClassName);
		};

		const setContainsDataStyle = function() {
			view.className = originalStyle + (containsData ? " containsData" : " containsNoData");
		};

		const getView = function() {
			return view;
		};

		const addChild = function(child) {
			child.className += " default";
			defaultPresentation = child;
			view.insertBefore(child, buttonView);
			hide(defaultPresentation);
		};

		const addAlternativeChild = function(child, presentationSize) {
			child.className += " alternative";
			alternativePresentation = child;
			createButtonView(presentationSize);
			view.insertBefore(child, buttonView);
			hide(alternativePresentation);
		};

		const createButtonView = function(presentationSize) {
			let buttonViewNew = CORA.gui.createSpanWithClassName("buttonView");
			buttonView = buttonViewNew;
			view.appendChild(buttonViewNew);
			createDefaultAndAlternativeButtons(presentationSize);
			hide(buttonView);
		};

		const createDefaultAndAlternativeButtons = function(presentationSize) {
			let buttonClasses = getButtonClassName(presentationSize);

			alternativeButton = createAndAddSwapButton(buttonClasses.alternative, "false");
			defaultButton = createAndAddSwapButton(buttonClasses.default, "true");
		};

		const createAndAddSwapButton = function(buttonClass, toggleDefaultShownValue) {
			let buttonSpec = {
				"className": "iconButton " + buttonClass,
				action: {
					method: function() {
						toggleDefaultShown(toggleDefaultShownValue);
					},
					onkeydown: {
						keys: [" ", "Enter"]
					}
				}
			};
			let button = CORA.gui.button(buttonSpec);
			buttonView.appendChild(button);
			return button;
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

		const toggleDefaultShown = function(defaultShown) {
			currentDefaultShown = defaultShown;
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
				callOnFirstShowOfAlternativePresentation();
			}
		};

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

		const hideContent = function() {
			hide(defaultPresentation);
			hide(buttonView);
			hide(alternativePresentation);
		};

		const showContent = function() {
			show(buttonView);
			toggleDefaultShown(currentDefaultShown);
		};

		const callOnFirstShowOfAlternativePresentation = function() {
			if (callOnFirstShowOfAlternativePresentationShouldBeCalled
				&& spec.callOnFirstShowOfAlternativePresentation !== undefined) {
				callOnFirstShowOfAlternativePresentationShouldBeCalled = false;
				spec.callOnFirstShowOfAlternativePresentation();
			}
		};

		const setHasDataStyle = function(containsDataIn) {
			containsData = containsDataIn;
			setContainsDataStyle();
		};

		let out = Object.freeze({
			"type": "pNonRepeatingChildRefHandlerView",
			getView: getView,
			addChild: addChild,
			addAlternativeChild: addAlternativeChild,
			hideContent: hideContent,
			showContent: showContent,
			setHasDataStyle: setHasDataStyle
		});
		start();
		return out;
	};
	return cora;
}(CORA));