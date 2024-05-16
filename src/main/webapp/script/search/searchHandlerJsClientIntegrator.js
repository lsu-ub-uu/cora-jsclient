/*
 * Copyright 2017 Uppsala University Library
 * Copyright 2017, 2023, 2024 Olov McKie
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
	cora.searchHandlerJsClientIntegrator = function(dependencies, spec) {
		let menuView;
		let managedGuiItem;
		let searchHandler;

		function start() {
			menuView = createMenuView();
			managedGuiItem = createManagedGuiItem();
			managedGuiItem.addMenuPresentation(menuView);
			addSearchToJsClient(managedGuiItem);
			showSearchInJsClient(managedGuiItem);

			searchHandler = createSearchHandler();
			managedGuiItem.addWorkPresentation(searchHandler.getView());
			managedGuiItem.setFocus();
		}

		function createMenuView() {
			let createdView = CORA.gui.createSpanWithClassName("searchMenu");
			createdView.textContent = spec.headerText;
			return createdView;
		}

		function createSearchHandler() {
			spec.setFocus = managedGuiItem.setFocus;
			return dependencies.searchHandlerFactory.factor(spec);
		}

		function createManagedGuiItem() {
			let managedGuiItemSpec = {
				"activateMethod" : dependencies.jsClient.showView,
				"removeMethod" : dependencies.jsClient.viewRemoved
			};
			return dependencies.managedGuiItemFactory
					.factor(managedGuiItemSpec);
		}

		function addSearchToJsClient(managedGuiItemToAdd) {
			dependencies.jsClient.addGuiItem(managedGuiItemToAdd);
		}

		function showSearchInJsClient(managedGuiItemToShow) {
			dependencies.jsClient.showView(managedGuiItemToShow);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		start();
		return Object.freeze({
			"type" : "searchHandlerJsClientIntegrator",
			getDependencies : getDependencies,
			getSpec : getSpec
		});
	};
	return cora;
}(CORA));