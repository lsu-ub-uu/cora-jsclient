/*
 * Copyright 2017, 2020 Uppsala University Library
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
	cora.searchHandler = function(dependencies, spec) {
		let view;
		let recordGui;
		let delaySearchTimer;

		const start = function() {
			view = createView();
			tryToCreateSearchForm();
		};

		const createView = function() {
			let viewSpec = {
				"searchMethod": search
			};
			return dependencies.searchHandlerViewFactory.factor(viewSpec);
		};

		const tryToCreateSearchForm = function() {
			try {
				createSearchForm();
			} catch (error) {
				createRawDataWorkView("something went wrong, probably missing metadata, " + error);
				view.addPresentationToSearchFormHolder(document.createTextNode(error.stack));
			}
		};

		const createSearchForm = function() {
			let metadataId = spec.metadataId;
			recordGui = createRecordGui(metadataId);

			addSearchFormFromRecordGuiToView(recordGui, metadataId);
			recordGui.initMetadataControllerStartingGui();

			subscribeToChangesInForm();
		};

		const subscribeToChangesInForm = function() {
			let path = {};
			let context = undefined;
			let functionToCall = handleMsg;
			recordGui.pubSub.subscribe("*", path, context, functionToCall);
		};

		const handleMsg = function(dataFromMsg, msg) {
			if (msgUpdatesData(msg)) {
				clearOldTimeoutAndStartNewOneForSearch();
			}
		};

		const msgUpdatesData = function(msg) {
			return msg.endsWith("setValue") || msg.endsWith("remove");
		};

		const clearOldTimeoutAndStartNewOneForSearch = function() {
			window.clearTimeout(delaySearchTimer);
			delaySearchTimer = window.setTimeout(function() {
				search();
			}, 400);
		};

		const createRecordGui = function(metadataId) {
			let recordGuiSpec = {
				"metadataId": metadataId,
				permissions: createEmptyPermissions()
			};
			return dependencies.recordGuiFactory.factor(recordGuiSpec);
		};

		const createEmptyPermissions = function() {
			let permissions = {};
			permissions.write = [];
			permissions.read = [];
			return permissions;
		};

		const addSearchFormFromRecordGuiToView = function(recordGuiToAdd, metadataIdUsedInData) {
			let presentationView = recordGuiToAdd.getPresentationHolder(spec.presentationId,
				metadataIdUsedInData).getView();
			view.addPresentationToSearchFormHolder(presentationView);
		};

		const createRawDataWorkView = function(data) {
			view.addPresentationToSearchFormHolder(document.createTextNode(JSON.stringify(data)));
		};

		const search = function() {
			if (recordGui.validateData()) {
				sendSearchQueryToServer();
			}
			window.clearTimeout(delaySearchTimer);
			recordGui.pubSub.publish("addUpToMinNumberOfRepeating", {
				"data": "",
				"path": {}
			});
		};

		const sendSearchQueryToServer = function() {
			let link = spec.searchLink;
			let callSpec = {
				"url": link.url,
				"requestMethod": link.requestMethod,
				"accept": link.accept,
				"parameters": {
					"searchData": JSON.stringify(recordGui.dataHolder.getData())
				},
				"loadMethod": handleSearchResult
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		};

		const handleSearchResult = function(answerIn) {
			let resultHandlerSpec = {
				"dataList": JSON.parse(answerIn.responseText).dataList,
				"jsClient": dependencies.jsClient,
				"triggerWhenResultIsChoosen": spec.triggerWhenResultIsChoosen
			};
			let resultHandler = dependencies.resultHandlerFactory.factor(resultHandlerSpec);
			view.clearResultHolder();
			view.addSearchResultToSearchResultHolder(resultHandler.getView());
		};

		const getView = function() {
			return view.getView();
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		start();
		let out = Object.freeze({
			"type": "searchHandler",
			getDependencies: getDependencies,
			getSpec: getSpec,
			search: search,
			handleSearchResult: handleSearchResult,
			getView: getView,
			handleMsg: handleMsg
		});
		return out;
	};
	return cora;
}(CORA));