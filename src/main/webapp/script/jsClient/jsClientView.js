/*
 * Copyright 2017 Uppsala University Library
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
	cora.jsClientView = function(dependencies, spec) {
		var out;
		var mainView;
		var header;
		var sideBar;
		var searchesView;
		var recordTypesView;
		var workArea;
		var messageHolder;
		var reloadProvidersButton;
		var logo;
		var logoImage;

		function start() {
			mainView = createMainView();
			addReloadProvidersButton();
			addSetLanguageChoice();
			addLogoHeader();
			mainView.modelObject = out;
		}

		function createMainView() {
			var view = CORA.gui.createSpanWithClassName("jsClient mainView");
			var serverAddress = CORA.gui.createSpanWithClassName("serverAddress");
			serverAddress.textContent = spec.serverAddress;

			header = CORA.gui.createSpanWithClassName("header");
			header.textContent = spec.name;
			view.appendChild(header);

			sideBar = CORA.gui.createSpanWithClassName("sideBar");
			view.appendChild(sideBar);

			searchesView = CORA.gui.createSpanWithClassName("searchesView");
			sideBar.appendChild(searchesView);

			recordTypesView = CORA.gui.createSpanWithClassName("recordTypesView");
			sideBar.appendChild(recordTypesView);
			sideBar.appendChild(serverAddress);

			workArea = CORA.gui.createSpanWithClassName("workArea");
			view.appendChild(workArea);

			messageHolder = dependencies.messageHolderFactory.factor();
			header.appendChild(messageHolder.getView());

			return view;
		}
		function addReloadProvidersButton() {
			reloadProvidersButton = CORA.gui.createSpanWithClassName("menuView");
			reloadProvidersButton.onclick = spec.reloadProvidersMethod;
			reloadProvidersButton.textContent = "Ladda om";
			header.appendChild(reloadProvidersButton);
		}
		function addLogoHeader() {
			logo = CORA.gui.createDivWithClassName("logoHeader");
			header.appendChild(logo);
			logoImage = CORA.gui.createDivWithClassName("logoHeaderLogo");
			header.appendChild(logoImage);
			var menu = document.createElement("button");
			menu.className = "menu";
			header.appendChild(menu);
		}

		function setReloadingProviders(status) {
			if (status) {
				reloadProvidersButton.className = reloadProvidersButton.className + " uploading";
			} else {
				reloadProvidersButton.className = reloadProvidersButton.className.replace(
						" uploading", "");
			}
		}

		function addOpenGuiItemHandlerView(viewToAdd) {
			sideBar.insertAdjacentElement('afterbegin', viewToAdd);
		}

		function addToSearchesView(searchViewToAdd) {
			searchesView.appendChild(searchViewToAdd);
		}

		function clearSearchesView() {
			searchesView.innerHTML = "";
		}

		function addToRecordTypesView(recordTypeView) {
			recordTypesView.appendChild(recordTypeView);
		}

		function getView() {
			return mainView;
		}

		function clearRecordTypesView() {
			recordTypesView.innerHTML = "";
		}

		function getWorkView() {
			return workArea;
		}

		function addToWorkView(viewToAdd) {
			workArea.appendChild(viewToAdd);
		}

		function addLoginManagerView(viewToAdd) {
			header.appendChild(viewToAdd);
		}

		function addGlobalView(viewToAdd) {
			header.appendChild(viewToAdd);
		}

		function getHeader() {
			return header;
		}

		function getSideBar() {
			return sideBar;
		}

		function getSearchesView() {
			return searchesView;
		}

		function getRecordTypesView() {
			return recordTypesView;
		}

		function addErrorMessage(errorText) {
			var messageSpec = {
				"message" : errorText,
				"type" : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		}

		function removeFromWorkView(viewToRemove) {
			workArea.removeChild(viewToRemove);
		}

		function addSetLanguageChoice() {
			var languageChoice = document.createElement("select");
			languageChoice.onchange = function() {
				spec.setLanguageMethod(languageChoice.value);
			};
			var svOption = new Option("sv", "sv");
			languageChoice.appendChild(svOption);
			var enOption = new Option("en", "en");
			languageChoice.appendChild(enOption);
			var noOption = new Option("no", "no");
			languageChoice.appendChild(noOption);
			header.appendChild(languageChoice);
		}

		function addGroupOfRecordTypesToView(groupIn) {
			recordTypesView.appendChild(groupIn);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}
		out = Object.freeze({
			"type" : "jsClientView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addOpenGuiItemHandlerView : addOpenGuiItemHandlerView,
			addToSearchesView : addToSearchesView,
			clearSearchesView : clearSearchesView,
			addToRecordTypesView : addToRecordTypesView,
			clearRecordTypesView : clearRecordTypesView,
			getWorkView : getWorkView,
			addToWorkView : addToWorkView,
			addLoginManagerView : addLoginManagerView,
			addGlobalView : addGlobalView,
			getHeader : getHeader,
			getSideBar : getSideBar,
			getSearchesView : getSearchesView,
			getRecordTypesView : getRecordTypesView,
			addErrorMessage : addErrorMessage,
			removeFromWorkView : removeFromWorkView,
			setReloadingProviders : setReloadingProviders,
			addGroupOfRecordTypesToView : addGroupOfRecordTypesToView
		});
		start();

		return out;
	};
	return cora;
}(CORA));