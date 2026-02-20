/*
 * Copyright 2017, 2019, 2021 Uppsala University Library
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
	cora.searchHandlerView = function(dependencies, spec) {
		let view;
		let searchFormHolder;
		let buttonView;
		let resultHolder;
		let busy;

		const start = function() {
			var workItemView = createWorkItemView();
			view = workItemView.getView();
			createSearchFormHolderAndAddTo(workItemView);
			createButtonViewAndAddTo(searchFormHolder);
			createSearchButtonIn(buttonView);
			createResultHolderAndAddTo(workItemView);
			createBusy();
		}

		const createWorkItemView = function() {
			var workItemViewSpec = {
				"extraClassName": "search"
			};
			return dependencies.workItemViewFactory.factor(workItemViewSpec);
		}

		const createSearchFormHolderAndAddTo = function(addTo) {
			searchFormHolder = CORA.createSpanWithClassName("searchFormHolder");
			addTo.addViewToView(searchFormHolder);
		}

		const createButtonViewAndAddTo = function(addTo) {
			buttonView = CORA.createSpanWithClassName("buttonView");
			addTo.appendChild(buttonView);
		}

		const createSearchButtonIn = function(buttonViewToAddTo) {
			var searchButton = createButton();
			buttonViewToAddTo.appendChild(searchButton);
		}

		const createButton = function() {
			var buttonSpec = {
				type: "input",
				className: "searchButton",
				text: dependencies.textProvider.getTranslation("theClient_searchButtonText"),
				action: {
					method: spec.searchMethod
				}
			};
			return CORA.inputButton(buttonSpec);
		}

		const createResultHolderAndAddTo = function(addTo) {
			resultHolder = CORA.createSpanWithClassName("searchResultHolder");
			addTo.addViewToView(resultHolder);
		}

		const createBusy = function() {
			busy = dependencies.busyFactory.factor();
			busy.show();
		}

		const getView = function() {
			return view;
		}

		const addPresentationToSearchFormHolder = function(presentationToAdd) {
			searchFormHolder.insertBefore(presentationToAdd, searchFormHolder.lastChild);
		}

		const addSearchResultToSearchResultHolder = function(resultToAdd) {
			resultHolder.appendChild(resultToAdd);
		}

		const getDependencies = function() {
			return dependencies;
		}

		const getSpec = function() {
			return spec;
		}

		const clearResultHolder = function() {
			resultHolder.innerHTML = "";
		}

		const setSearchRunning = function() {
			resultHolder.insertBefore(busy.getView(), resultHolder.firstChild);
		}

		start();
		return Object.freeze({
			"type": "searchHandlerView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			addPresentationToSearchFormHolder: addPresentationToSearchFormHolder,
			addSearchResultToSearchResultHolder: addSearchResultToSearchResultHolder,
			clearResultHolder: clearResultHolder,
			setSearchRunning: setSearchRunning
		});
	};
	return cora;
}(CORA));