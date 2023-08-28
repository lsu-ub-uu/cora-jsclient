/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
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
	cora.searchRecordHandler = function(dependencies, spec) {
		let searchId;
		let viewSpec;
		let view;
		
		const start = function() {
			searchId = getIdFromRecord(spec.searchRecord);

			viewSpec = {
				headerText: getHeadlineText(spec.searchRecord),
				openSearchMethod: openSearch
			};

			view = dependencies.searchRecordHandlerViewFactory.factor(viewSpec);
		}

		const getHeadlineText = function(searchRecord) {
			let cData = CORA.coraData(searchRecord.data);
			if (textIdIsMissingInData(cData)) {
				return searchId;
			}
			return getTranslatedText(cData);
		};

		const textIdIsMissingInData = function(cData) {
			return !cData.containsChildWithNameInData("textId");
		};

		const getTranslatedText = function(cData) {
			let cTextIdGroup = CORA.coraData(cData.getFirstChildByNameInData("textId"));
			let textId = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			return dependencies.textProvider.getTranslation(textId);
		};


		const getIdFromRecord = function(record) {
			let cData = CORA.coraData(record.data);
			let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};

		const getView = function() {
			return view.getView();
		};

		const openSearch = function() {
			let searchHandlerSpec = {
				headerText: viewSpec.headerText,
				metadataId: getLinkValueFromSearchRecord("metadataId"),
				presentationId: getLinkValueFromSearchRecord("presentationId")
			};
			addSearchLinkToSpec(searchHandlerSpec);
			dependencies.searchHandlerJSClientIntegratorFactory.factor(searchHandlerSpec);
		};

		const getLinkValueFromSearchRecord = function(id) {
			let cSearchRecordData = CORA.coraData(spec.searchRecord.data);
			let cRecordLink = CORA.coraData(cSearchRecordData.getFirstChildByNameInData(id));
			return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const addSearchLinkToSpec = function(searchHandlerSpec) {
			searchHandlerSpec.searchLink = spec.searchRecord.actionLinks.search;
		};

		const addManagedGuiItem = function(managedGuiItem) {
			view.addManagedGuiItem(managedGuiItem);
		};

		const getSpec = function() {
			return spec;
		};

		const getDependencies = function() {
			return dependencies;
		};
		
		start();
		return Object.freeze({
			"type": "searchRecordHandler",
			getSpec: getSpec,
			getDependencies: getDependencies,
			getView: getView,
			openSearch: openSearch,
			addManagedGuiItem: addManagedGuiItem
		});
	};
	return cora;
}(CORA));