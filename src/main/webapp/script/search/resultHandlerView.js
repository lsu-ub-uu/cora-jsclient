/*
 * Copyright 2017 Uppsala University Library
 * Copyright 2017, 2021 Olov McKie
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
	cora.resultHandlerView = function(dependencies, spec) {
		let view;
		let resultsHolder;

		const start = function() {
			view = createView();
			createInfo();
			createResultsHolder();
		};

		const createView = function() {
			return CORA.gui.createSpanWithClassName("resultHolder");
		};

		const createResultsHolder = function() {
			resultsHolder = CORA.gui.createSpanWithClassName("resultsHolderPage");
			view.appendChild(resultsHolder);
		};

		const createInfo = function() {
			let infoHolder = CORA.gui.createSpanWithClassName("infoHolder");
			view.appendChild(infoHolder);
			infoHolder.textContent = spec.fromNo + " - " + spec.toNo + " " + spec.ofText + " "
				+ spec.totalNo;
		};

		const addChildPresentation = function(presentationToAdd, record) {
			let childView = createRecordView(record);
			childView.appendChild(presentationToAdd);
			resultsHolder.appendChild(childView);
		};

		const createRecordView = function(record) {
			let newView = CORA.gui.createSpanWithClassName("listItem");
			newView.onclick = function(event) {
				let loadInBackground = "false";
				if (event.ctrlKey) {
					loadInBackground = "true";
				}
				let openInfo = {
					"record": record,
					"loadInBackground": loadInBackground
				};
				spec.resultHandler.openRecord(openInfo);
			};
			return newView;
		};

		function addButton(text, onclickMethod, className) {
			let button = createButton(text, onclickMethod, className);
			view.childNodes[1].appendChild(button);
			return button;
		};

		function createButton(text, onclickMethod, className) {
			let button = document.createElement("input");
			button.type = "button";
			button.value = text;
			button.onclick = onclickMethod;
			button.className = className;
			return button;
		};

		const getView = function() {
			return view;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		start();
		return Object.freeze({
			type: "resultHandlerView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			addChildPresentation: addChildPresentation,
			addButton: addButton
		});
	};
	return cora;
}(CORA));