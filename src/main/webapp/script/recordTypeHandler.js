/*
 * Copyright 2016, 2017, 2018, 2020 Uppsala University Library
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
	cora.recordTypeHandler = function(dependencies, spec) {

		let recordId;
		let view;
		const start = function() {
			recordId = getIdFromRecord(spec.recordTypeRecord);
			let headerText = getHeadlineText(spec.recordTypeRecord);

			let viewSpec = {
				"headerText": headerText
			};

			if (recordTypeHasListLink()) {
				viewSpec.fetchListMethod = createRecordTypeList;
			}

			if (recordTypeHasCreateLink()) {
				viewSpec.createNewMethod = createRecordHandler;
			}
			view = dependencies.recordTypeHandlerViewFactory.factor(viewSpec);
		}

		const getView = function() {
			return view.getView();
		}

		const getHeadlineText = function(recordTypeRecord) {
			let cData = CORA.coraData(recordTypeRecord.data);
			if (textIdIsMissingInData(cData)) {
				return recordId;
			}
			return getTranslatedText(cData);
		}

		const textIdIsMissingInData = function(cData) {
			return !cData.containsChildWithNameInData("textId");
		}

		const getTranslatedText = function(cData) {
			let cTextIdGroup = CORA.coraData(cData.getFirstChildByNameInData("textId"));
			let textId = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			return dependencies.textProvider.getTranslation(textId);
		}

		const getIdFromRecord = function(record) {
			let cData = CORA.coraData(record.data);
			let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		const recordTypeHasListLink = function() {
			let listLink = spec.recordTypeRecord.actionLinks.list;
			return listLink !== undefined;
		}

		const recordTypeHasCreateLink = function() {
			let createLink = spec.recordTypeRecord.actionLinks.create;
			return createLink !== undefined;
		}

		const createRecordTypeList = function() {
			let listHandlerSpec = {
				"openRecordMethod": createRecordHandler,
				"baseUrl": spec.baseUrl,
				"jsClient": dependencies.jsClient,
				"recordTypeRecordId": recordId,
				"listLink": spec.recordTypeRecord.actionLinks.list
			};
			dependencies.recordListHandlerFactory.factor(listHandlerSpec);
		}

		const createRecordHandler = function(createNewRecord, record, loadInBackground) {
			let recordHandlerSpec = {
				"createNewRecord": createNewRecord,
				"record": record,
				"jsClient": dependencies.jsClient,
				"recordTypeRecordIdForNew": recordId
			};
			let recordHandler = dependencies.recordHandlerFactory.factor(recordHandlerSpec);
			addRecordHandlerToJsClient(recordHandler, loadInBackground);
		}

		const addRecordHandlerToJsClient = function(recordHandler, loadInBackground) {
			let managedGuiItem = recordHandler.getManagedGuiItem();
			dependencies.jsClient.addGuiItem(managedGuiItem);
			if (loadInBackground !== "true") {
				dependencies.jsClient.showView(managedGuiItem);
			}
		}

		const getDependencies = function() {
			return dependencies;
		}

		const getSpec = function() {
			return spec;
		}

		const hasAnyAction = function() {
			return recordTypeHasListLink() || recordTypeHasCreateLink();
		};

		start();
		return Object.freeze({
			"type": "recordTypeHandler",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			createRecordTypeList: createRecordTypeList,
			createRecordHandler: createRecordHandler,
			hasAnyAction: hasAnyAction
		});
	};
	return cora;
}(CORA));