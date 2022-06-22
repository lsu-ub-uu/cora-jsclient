/*
 * Copyright 2017 Olov McKie
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
		var out;
		var view;
		var childrenView;
		var childrenViewInitialDisplay = "";
		var baseClassName = "pRecordLink";
		var info;
		var openLinkedRecordButton;
		var showSearchButton;
		var clearLinkedRecordIdButton;
		var currentLinkedPresentation;
		var addedSearchHandlerView;
		var searchHandlerShown;
		var buttonView;
		function start() {
			view = CORA.gui.createSpanWithClassName(baseClassName);
			buttonView = CORA.gui.createSpanWithClassName("buttonView");
			openLinkedRecordButton = createOpenLinkedRecordButton();
			showSearchButton = createShowSearchButton();
			createChildrenView();
			info = createInfo();
			buttonView.appendChild(info.getButton());
			view.appendChild(buttonView);
		}

		function createOpenLinkedRecordButton() {
			return createButtonWithClassNameAndOnclickMethod("openLinkedRecordButton",
				openLinkedRecord);
		}

		function createButtonWithClassNameAndOnclickMethod(className, onclickMethod) {
			var buttonSpec = {
				"className": "iconButton " + className,
				action: {
					method: onclickMethod
				}
			};
			return CORA.gui.button(buttonSpec);
		}

		function createShowSearchButton() {
			return createButtonWithClassNameAndOnclickMethod("showSearchButton",
				toggleSearchHandlerView);
		}

		function openLinkedRecord(event) {
			var loadInBackground = "false";
			if (event.ctrlKey) {
				loadInBackground = "true";
			}
			spec.pRecordLink.openLinkedRecord({
				"loadInBackground": loadInBackground
			});
		}

		function createChildrenView() {
			childrenView = CORA.gui.createSpanWithClassName("childrenView");
			view.appendChild(childrenView);
		}

		function createInfo() {
			var infoSpec = {
				"afterLevelChange": updateClassName,
				"level1": [{
					"className": "textView",
					"text": spec.info.text
				}, {
					"className": "defTextView",
					"text": spec.info.defText
				}]
			};
			possiblyAddLevel2Info(infoSpec);

			var newInfo = dependencies.infoFactory.factor(infoSpec);
			infoSpec.insertBefore = childrenView;
			return newInfo;
		}

		function possiblyAddLevel2Info(infoSpec) {
			if (specInfoHasTechnicalInfo()) {
				addLevelTechnicalInfoAsLevel2(infoSpec);
			}
		}

		function specInfoHasTechnicalInfo() {
			return spec.info.technicalInfo;
		}

		function addLevelTechnicalInfoAsLevel2(infoSpec) {
			infoSpec.level2 = [];
			spec.info.technicalInfo.forEach(function(text) {
				infoSpec.level2.push({
					"className": "technicalView",
					"text": text
				});
			});
		}

		function updateClassName() {
			var className = baseClassName;
			if (infoIsShown()) {
				className += " infoActive";
			}
			if (searchHandlerShown) {
				className += " searchActive";
			}

			view.className = className;
		}

		function infoIsShown() {
			return info.getInfoLevel() !== 0;
		}
		
		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function addChild(childToAdd) {
			childrenView.appendChild(childToAdd);
		}

		function hideChildren() {
			if (childrenView.style.display !== "none") {
				childrenViewInitialDisplay = childrenView.style.display;
			}
			childrenView.style.display = "none";
		}

		function showChildren() {
			childrenView.style.display = childrenViewInitialDisplay;
		}

		function addLinkedPresentation(linkedPresentationToAdd) {
			removeLinkedPresentation();
			view.appendChild(linkedPresentationToAdd);
			currentLinkedPresentation = linkedPresentationToAdd;
		}

		function removeLinkedPresentation() {
			if (currentLinkedPresentation !== undefined) {
				view.removeChild(currentLinkedPresentation);
				currentLinkedPresentation = undefined;
			}
		}

		function showOpenLinkedRecordButton() {
			info.getButton().insertAdjacentElement("afterend", openLinkedRecordButton);
		}

		function hideOpenLinkedRecordButton() {
			if (buttonView.contains(openLinkedRecordButton)) {
				buttonView.removeChild(openLinkedRecordButton);
			}
		}

		function addSearchHandlerView(searchHandlerViewToAdd) {
			addShowSearchButton();
			addedSearchHandlerView = searchHandlerViewToAdd;
			addSearchHandlerViewToView();
		}

		function addSearchHandlerViewToView() {
			childrenView.insertAdjacentElement("beforebegin", addedSearchHandlerView);
			searchHandlerShown = true;
			updateClassName();
		}

		function hideSearchHandlerView() {
			if (searchIsAdded() && searchHandlerShown) {
				view.removeChild(addedSearchHandlerView);
				searchHandlerShown = false;
				updateClassName();
			}
		}

		function showSearchHandlerView() {
			if (searchIsAdded()) {
				addSearchHandlerViewToView();
			}
		}

		function toggleSearchHandlerView() {
			if (searchHandlerShown) {
				hideSearchHandlerView();
			} else {
				showSearchHandlerView();
			}
		}

		function addShowSearchButton() {
			info.getButton().insertAdjacentElement("afterend", showSearchButton);
		}

		function searchIsAdded() {
			return addedSearchHandlerView !== undefined;
		}

		function showClearLinkedRecordIdButton(onclickMethod) {
			hideClearLinkedRecordIdButton();
			clearLinkedRecordIdButton = createButtonWithClassNameAndOnclickMethod(
				"clearLinkedRecordIdButton", onclickMethod);
			info.getButton().insertAdjacentElement("afterend", clearLinkedRecordIdButton);
		}

		function hideClearLinkedRecordIdButton() {
			if (undefined !== clearLinkedRecordIdButton) {
				clearLinkedRecordIdButton.parentNode.removeChild(clearLinkedRecordIdButton);
				clearLinkedRecordIdButton = undefined;
			}
		}

		const addAttributesView = function(attributesView) {
			view.insertBefore(attributesView, view.firstChild);
		};

		out = Object.freeze({
			"type": "pRecordLinkView",
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
			showSearchHandlerView: showSearchHandlerView
		});
		start();
		return out;
	};
	return cora;
}(CORA));