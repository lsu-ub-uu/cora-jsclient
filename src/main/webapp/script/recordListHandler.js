/*
 * Copyright 2016, 2017 Uppsala University Library
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
	cora.recordListHandler = function(dependencies, spec) {
		let managedGuiItem;

		const start = function() {
			managedGuiItem = createManagedGuiItem();
			addToViewToJsClient(managedGuiItem);
			showViewInClient(managedGuiItem);

			addTextToMenuView();
			fetchDataFromServer(createRecordTypeListFromAnswer);
		};

		const createManagedGuiItem = function() {
			let managedGuiItemSpec = {
				activateMethod : spec.jsClient.showView,
				removeMethod : spec.jsClient.viewRemoved
			};
			return dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
		};

		const addToViewToJsClient = function(managedGuiItemToAdd) {
			spec.jsClient.addGuiItem(managedGuiItemToAdd);
		};

		const showViewInClient = function(managedGuiItemToShow) {
			spec.jsClient.showView(managedGuiItemToShow);
		};

		const addTextToMenuView = function() {
			let menuPresentation = CORA.createSpanWithClassName("listMenu");
			menuPresentation.textContent = "List (" + spec.headerText + ")";
			managedGuiItem.addMenuPresentation(menuPresentation);
		};

		const fetchDataFromServer = function(callAfterAnswer) {
			let listLink = spec.listLink;
			let callSpec = {
				requestMethod : listLink.requestMethod,
				url : listLink.url,
				contentType : listLink.contentType,
				accept : listLink.accept,
				loadMethod : callAfterAnswer,
				errorMethod : callError
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		};

		const createRecordTypeListFromAnswer = function(answer) {
			let resultHandlerSpec = {
				dataList : JSON.parse(answer.responseText).dataList,
				jsClient : spec.jsClient
			};
			let resultHandler = dependencies.resultHandlerFactory.factor(resultHandlerSpec);
			managedGuiItem.addWorkPresentation(resultHandler.getView());
		};

		const callError = function(answer) {
			let messageHolder = CORA.messageHolder();
			managedGuiItem.addWorkPresentation(messageHolder.getView());
			let messageSpec = {
				message : answer.status,
				type : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};
		
		let out = Object.freeze({
			type : "recordListHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			open : open,
			createRecordTypeListFromAnswer : createRecordTypeListFromAnswer
		});

		start();

		return out;
	};
	return cora;
}(CORA));