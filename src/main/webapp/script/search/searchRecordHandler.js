/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
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
	cora.searchRecordHandler = function(dependencies, spec) {
		var searchId = getIdFromRecord(spec.searchRecord);

		var viewSpec = {
			"headerText": getHeadlineText(spec.searchRecord),
			"openSearchMethod": openSearch
		};

		var view = dependencies.searchRecordHandlerViewFactory.factor(viewSpec);


		function getHeadlineText(searchRecord) {
			var cData = CORA.coraData(searchRecord.data);
			if (textIdIsMissingInData(cData)) {
				return searchId;
			}
			return getTranslatedText(cData);
		}

		function textIdIsMissingInData(cData) {
			return !cData.containsChildWithNameInData("textId");
		}

		function getTranslatedText(cData) {
			var cTextIdGroup = CORA.coraData(cData.getFirstChildByNameInData("textId"));
			var textId = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			return dependencies.textProvider.getTranslation(textId);
		}


		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function getView() {
			return view.getView();
		}

		function openSearch() {
			var searchHandlerSpec = {
				"metadataId": getLinkValueFromSearchRecord("metadataId"),
				"presentationId": getLinkValueFromSearchRecord("presentationId")
			};
			addSearchLinkToSpec(searchHandlerSpec);
			dependencies.searchHandlerJSClientIntegratorFactory.factor(searchHandlerSpec);
		}

		function getLinkValueFromSearchRecord(id) {
			var cSearchRecordData = CORA.coraData(spec.searchRecord.data);
			var cRecordLink = CORA.coraData(cSearchRecordData.getFirstChildByNameInData(id));
			return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function addSearchLinkToSpec(searchHandlerSpec) {
			searchHandlerSpec.searchLink = spec.searchRecord.actionLinks.search;
		}

		function addManagedGuiItem(managedGuiItem) {
			view.addManagedGuiItem(managedGuiItem);
		}

		function getSpec() {
			return spec;
		}

		function getDependencies() {
			return dependencies;
		}

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