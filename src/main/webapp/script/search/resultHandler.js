/*
 * Copyright 2017, 2018 Uppsala University Library
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
	cora.resultHandler = function(dependencies, spec) {
		let out;
		let view;
		let showIndexButton = false;
		const start = function() {
			view = createView();
			createAndAddPresentationsForEachResultItem();
			possiblyAddIndexButton();
		};

		const createView = function() {
			let viewSpec = {
				ofText: dependencies.textProvider.getTranslation("theClient_resultListOfText"),
				fromNo: spec.dataList.fromNo,
				toNo: spec.dataList.toNo,
				totalNo: spec.dataList.totalNo,
				resultHandler: out
			};
			return dependencies.resultHandlerViewFactory.factor(viewSpec);
		};

		const createAndAddPresentationsForEachResultItem = function() {
			let data = spec.dataList.data;
			data.forEach(tryToAddResultItemToView);
		};

		const tryToAddResultItemToView = function(recordContainer) {
			addResultItemToWorkView(recordContainer.record);
		};

		const addResultItemToWorkView = function(result) {
			if (result.actionLinks.index !== undefined) {
				showIndexButton = true;
			}
			let recordHandlerSpec = {
				fetchLatestDataFromServer: "false",
				partOfList: "true",
				createNewRecord: "false",
				record: result,
				jsClient: dependencies.jsClient
			};
			let recordHandlerNew = dependencies.recordHandlerFactory.factor(recordHandlerSpec);
			view.addChildPresentation(recordHandlerNew.getManagedGuiItem().getListView(), result);
		};

		const openRecord = function(openInfo) {
			if (spec.triggerWhenResultIsChoosen !== undefined) {
				spec.triggerWhenResultIsChoosen(openInfo);
			} else {
				openRecordUsingJsClient(openInfo);
			}
		};

		const openRecordUsingJsClient = function(openInfoIn) {
			let openInfo = {
				readLink: openInfoIn.record.actionLinks.read,
				loadInBackground: openInfoIn.loadInBackground
			};
			dependencies.jsClient.openRecordUsingReadLink(openInfo);
		};

		const possiblyAddIndexButton = function() {
			if (showIndexButton) {
				view.addButton("INDEX", indexDataList, "indexButton");
			}
		};

		const indexDataList = function() {
			let indexListSpec = {
				"dataList": spec.dataList
			};
			let indexListHandler = dependencies.indexListHandlerFactory.factor(indexListSpec);
			indexListHandler.indexDataList();
		};

		const getDependencies = function() {
			return dependencies;
		};
		
		const getView = function() {
			return view.getView();
		};

		const getSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "resultHandler",
			getView: getView,
			getDependencies: getDependencies,
			getSpec: getSpec,
			openRecord: openRecord,
			indexDataList: indexDataList
		});
		start();
		return out;
	};
	return cora;
}(CORA));