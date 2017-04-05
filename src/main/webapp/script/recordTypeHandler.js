/*
 * Copyright 2016, 2017 Uppsala University Library
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
		var self;
		var recordId = getIdFromRecord(spec.recordTypeRecord);
		var cRecordTypeRecordData = CORA.coraData(spec.recordTypeRecord.data);

		var viewSpec = {
			"headerText" : recordId,
			"fetchListMethod" : createRecordTypeList
		};
		if (recordTypeHasCreateLink()) {
			viewSpec.createNewMethod = createRecordHandler;
		}

		var recordTypeHandlerView = dependencies.recordTypeHandlerViewFactory.factor(viewSpec);

		function getView() {
			return recordTypeHandlerView.getView();
		}

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function recordTypeHasCreateLink() {
			var createLink = spec.recordTypeRecord.actionLinks.create;
			if (createLink !== undefined) {
				return true;
			}
			return false;
		}

		function createRecordTypeList() {
			var listHandlerSpec = {
				// TODO: should be a factory instead, part of the
				// recordListHandlerFactory
				"createRecordHandlerMethod" : createRecordHandler,
				"baseUrl" : spec.baseUrl,
				"jsClient" : dependencies.jsClient,
				"addToRecordTypeHandlerMethod" : addManagedGuiItem,
				"recordTypeRecordId" : recordId,
				"listLink" : spec.recordTypeRecord.actionLinks.list,
				"listPresentationViewId" : getListPresentationFromRecordTypeRecord(),
				//
				"createLink" : spec.recordTypeRecord.actionLinks.create,
				"newMetadataId" : getRecordTypeRecordValueFromRecordLink("newMetadataId"),
				"newPresentationFormId" : getRecordTypeRecordValueFromRecordLink("newPresentationFormId"),
				"presentationViewId" : getRecordTypeRecordValueFromRecordLink("presentationViewId"),
				"presentationFormId" : getRecordTypeRecordValueFromRecordLink("presentationFormId"),
				"menuPresentationViewId" : getRecordTypeRecordValueFromRecordLink("menuPresentationViewId"),
				"abstract" : cRecordTypeRecordData.getFirstAtomicValueByNameInData("abstract")
			};
			dependencies.recordListHandlerFactory.factor(listHandlerSpec);
		}

		function getListPresentationFromRecordTypeRecord() {
			var cData = CORA.coraData(spec.recordTypeRecord.data);
			var cRecordLink = CORA.coraData(cData
					.getFirstChildByNameInData("listPresentationViewId"));
			return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function createRecordHandler(presentationMode, record) {
			var recordHandlerSpec = {
				"presentationMode" : presentationMode,
				"record" : record,
				"jsClient" : dependencies.jsClient,
				"recordTypeHandler" : self,
				"addToRecordTypeHandlerMethod" : addManagedGuiItem,
				"createRecordHandlerMethod": createRecordHandler,
				"recordTypeRecordId" : recordId,
				//
				"createLink" : spec.recordTypeRecord.actionLinks.create,
				"newMetadataId" : getRecordTypeRecordValueFromRecordLink("newMetadataId"),
				"newPresentationFormId" : getRecordTypeRecordValueFromRecordLink("newPresentationFormId"),
				"presentationViewId" : getRecordTypeRecordValueFromRecordLink("presentationViewId"),
				"presentationFormId" : getRecordTypeRecordValueFromRecordLink("presentationFormId"),
				"menuPresentationViewId" : getRecordTypeRecordValueFromRecordLink("menuPresentationViewId"),
				"abstract" : cRecordTypeRecordData.getFirstAtomicValueByNameInData("abstract")
			};
			dependencies.recordHandlerFactory.factor(recordHandlerSpec);
		}

		function getRecordTypeRecordValueFromRecordLink(id) {
			var cRecordLink = CORA.coraData(cRecordTypeRecordData.getFirstChildByNameInData(id));
			return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function addManagedGuiItem(managedGuiItem) {
			recordTypeHandlerView.addManagedGuiItem(managedGuiItem);
		}

		var out = Object.freeze({
			getView : getView,
			createRecordTypeList : createRecordTypeList,
			createRecordHandler : createRecordHandler,
			addManagedGuiItem : addManagedGuiItem
		});
		self = out;
		return out;
	};
	return cora;
}(CORA));