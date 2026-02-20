/*
 * Copyright 2016, 2017, 2020, 2025 Uppsala University Library
 * Copyright 2016, 2017, 2020, 2023 Olov McKie
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
	cora.recordHandlerView = function(dependencies, spec) {
		const texts = spec.texts;
		let showIncomingLinksButton;
		let incomingLinksView;
		let view;
		let editView;
		let showView;
		let buttonView;
		let workItemView;
		let incomingLinksHolder;
		let reloadButton;
		let definitionViewerButton;
		let definitionViewerButtonValidationType;
		let definitionViewerButtonRecordType;
		let recursiveDeleteButton;

		const start = function() {
			let workItemViewSpec = {
				"extraClassName": spec.extraClassName
			};

			workItemView = dependencies.workItemViewFactory.factor(workItemViewSpec);
			view = workItemView.getView();

			editView = CORA.createSpanWithClassName("editView");
			workItemView.addViewToView(editView);
			showView = CORA.createSpanWithClassName("showView");
			workItemView.addViewToView(showView);
			buttonView = CORA.createSpanWithClassName("buttonView");
			workItemView.addViewToView(buttonView);

			setShowDataFunction(spec.showDataMethod);
			setCopyAsNewFunction(spec.copyDataMethod);
			showIncomingLinksButton = createButton("INCOMING LINKS",
				showIncomingLinks, "showIncomingLinks");
			createIncomingLinksView();
		};

		const showIncomingLinks = function(event) {
			incomingLinksHolder.toggleHolder(event);
			spec.showIncomingLinksMethod();
		};

		const createIncomingLinksView = function() {
			incomingLinksHolder = dependencies.holderFactory.factor({ className: "incomingLinksView" });
			incomingLinksView = incomingLinksHolder.getView();
			workItemView.addViewToView(incomingLinksView);
		};

		const addToShowView = function(node) {
			showView.appendChild(node);
		};

		const addToEditView = function(node) {
			editView.appendChild(node);
		};

		const addButton = function(text, onclickMethod, className) {
			let button = createButton(text, onclickMethod, className);
			buttonView.appendChild(button);
			return button;
		};

		const createButton = function(text, onclickMethod, className) {
			let button = document.createElement("input");
			button.type = "button";
			button.value = text;
			button.onclick = onclickMethod;
			if (undefined !== className) {
				button.className = className;
			}
			return button;
		};

		const getView = function() {
			return view;
		};

		const clearViews = function() {
			editView.innerHTML = "";
			showView.innerHTML = "";
			buttonView.innerHTML = "";
		};

		const clearDataViews = function() {
			editView.innerHTML = "";
			showView.innerHTML = "";
		};

		const setShowDataFunction = function(functionToCall) {
			let button = createButton("Show data as JSON", functionToCall, "showData");
			workItemView.addToolViewToToolHolder(button);
		};

		const setCopyAsNewFunction = function(functionToCall) {
			let button = createButton("Copy as new", functionToCall, "copyAsNew");
			workItemView.addToolViewToToolHolder(button);
		};

		const addReloadRecordFunction = function(functionToCall) {
			if (undefined === reloadButton) {
				createNewReloadButton(functionToCall);
			} else {
				reloadButton.onclick = functionToCall;
			}
		};

		const createNewReloadButton = function(functionToCall) {
			reloadButton = createButton("Reload record", functionToCall, "reload");
			workItemView.addToolViewToToolHolder(reloadButton);
		};

		const addDefinitionViewerOpenFunction = function(functionToCall) {
			if (undefined === definitionViewerButton) {
				createNewDefinitionViewerButton(functionToCall);
			} else {
				definitionViewerButton.onclick = functionToCall;
			}
		};

		const createNewDefinitionViewerButton = function(functionToCall) {
			definitionViewerButton = createButton(texts.showDefinitionViewer, functionToCall,
				"definitionViewer");
			workItemView.addToolViewToToolHolder(definitionViewerButton);
		};

		const addDefinitionViewerOpenFunctionValidationType = function(functionToCall) {
			if (undefined === definitionViewerButtonValidationType) {
				createNewDefinitionViewerOpenFunctionValidationType(functionToCall);
			} else {
				definitionViewerButtonValidationType.onclick = functionToCall;
			}
		};

		const createNewDefinitionViewerOpenFunctionValidationType = function(functionToCall) {
			definitionViewerButtonValidationType = createButton(texts.showDefinitionViewerValidationType,
				functionToCall, "definitionViewer");
			workItemView.addToolViewToToolHolder(definitionViewerButtonValidationType);
		};

		const addDefinitionViewerOpenFunctionRecordType = function(functionToCall) {
			if (undefined === definitionViewerButtonRecordType) {
				createNewDefinitionViewerOpenFunctionRecordType(functionToCall);
			} else {
				definitionViewerButtonRecordType.onclick = functionToCall;
			}
		};

		const createNewDefinitionViewerOpenFunctionRecordType = function(functionToCall) {
			definitionViewerButtonRecordType = createButton(texts.showDefinitionViewerRecordType,
				functionToCall, "definitionViewer");
			workItemView.addToolViewToToolHolder(definitionViewerButtonRecordType);
		};

		const addRecursiveDeleteOpenFunction = function(functionToCall) {
			if (undefined === recursiveDeleteButton) {
				createNewRecursiveDeleteButton(functionToCall);
			} else {
				recursiveDeleteButton.onclick = functionToCall;
			}
		};

		const createNewRecursiveDeleteButton = function(functionToCall) {
			recursiveDeleteButton = createButton(texts.showRecursiveDelete, functionToCall,
				"recursiveDelete");
			workItemView.addToolViewToToolHolder(recursiveDeleteButton);
		};

		const addObjectToEditView = function(objectToAdd) {
			editView.appendChild(document.createTextNode(JSON.stringify(objectToAdd)));
		};

		const addToIncomingLinksView = function(node) {
			if (!incomingLinksView.hasChildNodes()) {
				incomingLinksView.appendChild(node);
			}
		};

		const showShowIncomingLinksButton = function() {
			buttonView.appendChild(showIncomingLinksButton);
		};

		const hideShowIncomingLinksButton = function() {
			buttonView.removeChild(showIncomingLinksButton);
		};

		const removeReloadButton = function() {
			workItemView.removeToolViewFromToolHolder(reloadButton);
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		start();

		return Object.freeze({
			type: "recordHandlerView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			addToShowView: addToShowView,
			addToEditView: addToEditView,
			addButton: addButton,
			clearViews: clearViews,
			clearDataViews: clearDataViews,
			addObjectToEditView: addObjectToEditView,
			addToIncomingLinksView: addToIncomingLinksView,
			showShowIncomingLinksButton: showShowIncomingLinksButton,
			hideShowIncomingLinksButton: hideShowIncomingLinksButton,
			addReloadRecordUsingFunction: addReloadRecordFunction,
			removeReloadButton: removeReloadButton,
			addDefinitionViewerOpenFunction: addDefinitionViewerOpenFunction,
			addDefinitionViewerOpenFunctionValidationType: addDefinitionViewerOpenFunctionValidationType,
			addDefinitionViewerOpenFunctionRecordType: addDefinitionViewerOpenFunctionRecordType,
			addRecursiveDeleteOpenFunction: addRecursiveDeleteOpenFunction
		});
	};
	return cora;
}(CORA));