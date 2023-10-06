/*
 * Copyright 2017, 2023 Olov McKie
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
	cora.pRecordLinkView = function(dependencies, spec) {
		let out;
		let view;
		let childrenView;
		let childrenViewInitialDisplay = "";
		let baseClassName = "pRecordLink";
		let info;
		let openLinkedRecordButton;
		let showSearchButton;
		let clearLinkedRecordIdButton;
		let currentLinkedPresentation;
		let addedSearchHandlerView;
		let searchHandlerShown;
		let buttonView;
		let label;
			
		const start = function() {
			view = CORA.gui.createSpanWithClassName(baseClassName);
			possiblyAddLableTextToView();
			buttonView = CORA.gui.createSpanWithClassName("buttonView");
			openLinkedRecordButton = createOpenLinkedRecordButton();
			showSearchButton = createShowSearchButton();
			createChildrenView();
			info = createInfo();
			buttonView.appendChild(info.getButton());
			view.appendChild(buttonView);
		};
		
		const possiblyAddLableTextToView = function() {
			if(spec.label){
				addLabel();
			}
		};
		
		const addLabel = function(){
			label = CORA.gui.createSpanWithClassName("label");
			view.appendChild(label);
			label.appendChild(document.createTextNode(spec.label));
		};
		
		const createOpenLinkedRecordButton = function() {
			return createButtonWithClassNameAndOnclickMethod("openLinkedRecordButton",
				openLinkedRecord);
		};

		const createButtonWithClassNameAndOnclickMethod = function(className, onclickMethod) {
			let buttonSpec = {
				"className": "iconButton " + className,
				action: {
					method: onclickMethod
				}
			};
			return CORA.gui.button(buttonSpec);
		};

		const createShowSearchButton = function() {
			return createButtonWithClassNameAndOnclickMethod("showSearchButton",
				toggleSearchHandlerView);
		};

		const openLinkedRecord = function(event) {
			let loadInBackground = "false";
			if (event.ctrlKey) {
				loadInBackground = "true";
			}
			spec.pRecordLink.openLinkedRecord({
				"loadInBackground": loadInBackground
			});
		};

		const createChildrenView = function() {
			childrenView = CORA.gui.createSpanWithClassName("childrenView");
			view.appendChild(childrenView);
		};

		const createInfo = function() {
			let infoSpec = {
				afterLevelChange: updateClassName,
				level1: [{
					className: "textView",
					text: spec.info.text
				}, {
					className: "defTextView",
					text: spec.info.defText
				}]
			};
			possiblyAddLevel2Info(infoSpec);
			infoSpec.insertBefore = childrenView;

			return dependencies.infoFactory.factor(infoSpec);
		};

		const possiblyAddLevel2Info = function(infoSpec) {
			if (specInfoHasTechnicalInfo()) {
				addLevelTechnicalInfoAsLevel2(infoSpec);
			}
		};

		const specInfoHasTechnicalInfo = function() {
			return spec.info.technicalInfo;
		};

		const addLevelTechnicalInfoAsLevel2 = function(infoSpec) {
			infoSpec.level2 = [];
			spec.info.technicalInfo.forEach(function(techInfo) {
				infoSpec.level2.push(createTechInfoPart(techInfo));
			});
		};

		const createTechInfoPart = function(techInfo) {
			let techInfoPart = {
				className: "technicalView",
				text: techInfo.text
			};

			if (techInfo.onclickMethod !== undefined) {
				techInfoPart.onclickMethod = techInfo.onclickMethod;
			}
			return techInfoPart;
		};


		const updateClassName = function() {
			let className = baseClassName;
			if (infoIsShown()) {
				className += " infoActive";
			}
			if (searchHandlerShown) {
				className += " searchActive";
			}

			view.className = className;
		};

		const infoIsShown = function() {
			return info.getInfoLevel() !== 0;
		}
		
		const getView = function() {
			return view;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const addChild = function(childToAdd) {
			childrenView.appendChild(childToAdd);
		};

		const hideChildren = function() {
			if (childrenView.style.display !== "none") {
				childrenViewInitialDisplay = childrenView.style.display;
			}
			childrenView.style.display = "none";
		};

		const showChildren = function() {
			childrenView.style.display = childrenViewInitialDisplay;
		};

		const addLinkedPresentation = function(linkedPresentationToAdd) {
			removeLinkedPresentation();
			view.appendChild(linkedPresentationToAdd);
			currentLinkedPresentation = linkedPresentationToAdd;
		};

		const removeLinkedPresentation = function() {
			if (currentLinkedPresentation !== undefined) {
				view.removeChild(currentLinkedPresentation);
				currentLinkedPresentation = undefined;
			}
		};

		const showOpenLinkedRecordButton = function() {
			info.getButton().insertAdjacentElement("afterend", openLinkedRecordButton);
		};

		const hideOpenLinkedRecordButton = function() {
			if (buttonView.contains(openLinkedRecordButton)) {
				buttonView.removeChild(openLinkedRecordButton);
			}
		};

		const addSearchHandlerView = function(searchHandlerViewToAdd) {
			addShowSearchButton();
			addedSearchHandlerView = searchHandlerViewToAdd;
			addSearchHandlerViewToView();
		};

		const addSearchHandlerViewToView = function() {
			childrenView.insertAdjacentElement("beforebegin", addedSearchHandlerView);
			searchHandlerShown = true;
			updateClassName();
		};

		const hideSearchHandlerView = function() {
			if (searchIsAdded() && searchHandlerShown) {
				view.removeChild(addedSearchHandlerView);
				searchHandlerShown = false;
				updateClassName();
			}
		};

		const showSearchHandlerView = function() {
			if (searchIsAdded()) {
				addSearchHandlerViewToView();
			}
		};

		const toggleSearchHandlerView = function() {
			if (searchHandlerShown) {
				hideSearchHandlerView();
			} else {
				showSearchHandlerView();
			}
		};

		const addShowSearchButton = function() {
			info.getButton().insertAdjacentElement("afterend", showSearchButton);
		};

		const searchIsAdded = function() {
			return addedSearchHandlerView !== undefined;
		};

		const showClearLinkedRecordIdButton = function(onclickMethod) {
			hideClearLinkedRecordIdButton();
			clearLinkedRecordIdButton = createButtonWithClassNameAndOnclickMethod(
				"clearLinkedRecordIdButton", onclickMethod);
			info.getButton().insertAdjacentElement("afterend", clearLinkedRecordIdButton);
		};

		const hideClearLinkedRecordIdButton = function() {
			if (undefined !== clearLinkedRecordIdButton) {
				clearLinkedRecordIdButton.parentNode.removeChild(clearLinkedRecordIdButton);
				clearLinkedRecordIdButton = undefined;
			}
		};

		const addAttributesView = function(attributesView) {
			view.insertBefore(attributesView, info.nextSibling);
		};
		
		const hide = function(element) {
			view.styleOriginal = view.style.display;
			view.style.display = "none";
		};

		const show = function(element) {
			if (view.styleOriginal !== undefined) {
				view.style.display = view.styleOriginal;
			} else {
				view.style.display = "";
			}
		};
		
		out = Object.freeze({
			type: "pRecordLinkView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			updateClassName: updateClassName,
			addChild: addChild,
			hideChildren: hideChildren,
			showChildren: showChildren,
			addLinkedPresentation: addLinkedPresentation,
			removeLinkedPresentation: removeLinkedPresentation,
			showOpenLinkedRecordButton: showOpenLinkedRecordButton,
			hideOpenLinkedRecordButton: hideOpenLinkedRecordButton,
			addAttributesView: addAttributesView,

			showClearLinkedRecordIdButton: showClearLinkedRecordIdButton,
			hideClearLinkedRecordIdButton: hideClearLinkedRecordIdButton,

			addSearchHandlerView: addSearchHandlerView,
			hideSearchHandlerView: hideSearchHandlerView,
			showSearchHandlerView: showSearchHandlerView,
			hide: hide,
			show: show
		});
		start();
		return out;
	};
	return cora;
}(CORA));