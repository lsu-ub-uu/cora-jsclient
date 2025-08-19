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
		let containsData = false;
		let callOnFirstShowOfAlternativePresentationShouldBeCalled = true;
		//TODO: change to be sent in through dependencies
		let buttonFactory = CORA.genericFactory("button");

		const clickableHeadlineText = spec.clickableHeadlineText;
		const clickableHeadlineLevel = spec.clickableHeadlineLevel;

		let presentationSize = spec.presentationSize;
		let showDefaultPresentationNext = false;
		let toggleButtonsAreCreated = false;


		const start = function() {
			view = createBaseView();
			setContainsDataStyle();
			possiblyAddClickableHeadline();
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
			return CORA.createSpanWithClassName(newClassName);
		};

		const setContainsDataStyle = function() {
			let currentContainsStateClass = containsData ? "containsData" : "containsNoData";
			let notCurrentContainsStateClass = !containsData ? "containsData" : "containsNoData";
			view.classList.remove(notCurrentContainsStateClass);
			view.classList.add(currentContainsStateClass);
		};

		const possiblyAddClickableHeadline = function() {
			if (clickableHeadlineText) {
				const level = clickableHeadlineLevel || "h2";
				addClickableHeadline(clickableHeadlineText, level);
				createButtonView(presentationSize);
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

		const addChild = function(child) {
			child.classList.add("default");
			defaultPresentation = child;
			view.insertBefore(child, buttonView);
			possiblyHideDefaultPresentationIfClickableHeadlineIsInitiallyHidden();
			hide(defaultPresentation);
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

		const addAlternativePresentation = function(child) {
			child.classList.add("alternative");
			alternativePresentation = child;
			createButtonView(presentationSize);
			view.insertBefore(child, buttonView);
			hide(alternativePresentation);
		};

		const createButtonView = function(presentationSize) {
			let buttonViewNew = CORA.createSpanWithClassName("buttonView");
			buttonView = buttonViewNew;
			view.appendChild(buttonViewNew);
			createDefaultAndAlternativeButtons(presentationSize);
		};

		const createDefaultAndAlternativeButtons = function(presentationSize) {
			if (!toggleButtonsAreCreated) {
				toggleButtonsAreCreated = true;
				let buttonClasses = getButtonClassName(presentationSize);
				createAndAddAlternativeButton(buttonClasses);
				createAndAddDefaultButton(buttonClasses);
			}
		};

		const createAndAddAlternativeButton = function(buttonClasses) {
			alternativeButton = createAndAddSwapButton(buttonClasses.alternative, showAlternativePresentation);
		};

		const createAndAddDefaultButton = function(buttonClasses) {
			defaultButton = createAndAddSwapButton(buttonClasses.default, showDefaultPresentation);
		};

		const showAlternativePresentation = function() {
			showDefaultPresentationNext = false;
			toggleDefaultShown();
		};

		const showDefaultPresentation = function() {
			showDefaultPresentationNext = true;
			toggleDefaultShown();
		};

		const createAndAddSwapButton = function(buttonClass, actionMethod) {
			let buttonSpec = {
				className: "iconButton " + buttonClass,
				action: {
					method: actionMethod,
					onkeydown: {
						keys: [" ", "Enter"]
					}
				}
			};
			let button = buttonFactory.factor(buttonSpec);
			buttonView.appendChild(button);
			return button;
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
				callOnFirstShowOfAlternativePresentation();
			}
			showDefaultPresentationNext = !showDefaultPresentationNext;
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
			showDefaultPresentationNext = !showDefaultPresentationNext;
			toggleDefaultShown();
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
			type: "pNonRepeatingChildRefHandlerView",
			getView: getView,
			addChild: addChild,
			addAlternativePresentation: addAlternativePresentation,
			hideContent: hideContent,
			showContent: showContent,
			setHasDataStyle: setHasDataStyle
		});
		start();
		return out;
	};
	return cora;
}(CORA));