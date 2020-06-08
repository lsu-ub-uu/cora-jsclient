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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.jsClientSpy = function(dependencies, spec) {
		var viewsShowingInWorkView = [];
		var createdManagedGuiItem = [];
		var fetchedMetadataByRecordTypeId = [];
		var returnedRecordTypeMetadata = [];
		var addedGuiItem = [];
		var openInfos = [];
		var setCurrentLangs = [];

		function getRecordTypesClearedNoOfTimes() {
			return recordTypesClearedNoOfTimes;
		}
		function showView(managedGuiItem) {
			viewsShowingInWorkView.push(managedGuiItem);
		}

		function getViewShowingInWorkView(number) {
			return viewsShowingInWorkView[number];
		}

		function createManagedGuiItem(handledBy) {
			createdManagedGuiItemHandledBy.push(handledBy);
			var managedGuiItem = {
				"handledBy" : handledBy,
				"workView" : CORA.gui.createSpanWithClassName("workView"),
				"menuView" : CORA.gui.createSpanWithClassName("menuView")
			};
			createdManagedGuiItem.push(managedGuiItem);
			return managedGuiItem;
		}
		function getCreatedManagedGuiItem(number) {
			return createdManagedGuiItem[number];
		}
		function getMetadataForRecordTypeId(recordTypeId) {
			// return recordTypeId + "Group";
			fetchedMetadataByRecordTypeId.push(recordTypeId);
			var metadata = {
				"metadataId" : recordTypeId + "Group",
				"presentationViewId" : recordTypeId + "ViewPGroup",
				"presentationFormId" : recordTypeId + "FormPGroup",
				"newMetadataId" : recordTypeId + "NewGroup",
				"newPresentationFormId" : recordTypeId + "FormNewPGroup",
				"menuPresentationViewId" : recordTypeId + "MenuPGroup",
				"listPresentationViewId" : recordTypeId + "ListPGroup",
				"search" : recordTypeId + "Search",
				"userSuppliedId" : "true",
				"abstract" : "false",
				"parentId" : "text",
				"actionLinks" : {
					"search" : {
						"requestMethod" : "GET",
						"rel" : "search",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
						"accept" : "application/vnd.uub.recordList+json"
					},
					"read" : {
						"requestMethod" : "GET",
						"rel" : "read",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
						"accept" : "application/vnd.uub.record+json"
					},
					"update" : {
						"requestMethod" : "POST",
						"rel" : "update",
						"contentType" : "application/vnd.uub.record+json",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
						"accept" : "application/vnd.uub.record+json"
					},
					"create" : {
						"requestMethod" : "POST",
						"rel" : "create",
						"contentType" : "application/vnd.uub.record+json",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
						"accept" : "application/vnd.uub.record+json"
					},
					"list" : {
						"requestMethod" : "GET",
						"rel" : "list",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
						"accept" : "application/vnd.uub.recordList+json"
					},
					"delete" : {
						"requestMethod" : "DELETE",
						"rel" : "delete",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne"
					}
				}
			};
			returnedRecordTypeMetadata.push(metadata);
			return metadata;
		}
		function getFetchedMetadataByRecordTypeId(number) {
			return fetchedMetadataByRecordTypeId[number];
		}
		function getReturnedRecordTypeMetadata(number){
			return returnedRecordTypeMetadata[number];
		}
		function addGuiItem(itemToAdd) {
			addedGuiItem.push(itemToAdd);
		}
		function getAddedGuiItem(number) {
			return addedGuiItem[number];
		}

		function openRecordUsingReadLink(openInfo) {
			openInfos.push(openInfo);
		}
		function getOpenInfo(number) {
			return openInfos[number];
		}

		function setCurrentLang(currentLang) {
			setCurrentLangs.push(currentLang);
		}
		function getSetCurrentLang(no) {
			return setCurrentLangs[no];
		}

		var out = Object.freeze({
			"type" : "jsClientSpy",
			showView : showView,
			getViewShowingInWorkView : getViewShowingInWorkView,
			createManagedGuiItem : createManagedGuiItem,
			getCreatedManagedGuiItem : getCreatedManagedGuiItem,
			getMetadataForRecordTypeId : getMetadataForRecordTypeId,
			getFetchedMetadataByRecordTypeId : getFetchedMetadataByRecordTypeId,
			getReturnedRecordTypeMetadata:getReturnedRecordTypeMetadata,
			addGuiItem : addGuiItem,
			getAddedGuiItem : getAddedGuiItem,
			openRecordUsingReadLink : openRecordUsingReadLink,
			getOpenInfo : getOpenInfo,
			setCurrentLang : setCurrentLang,
			getSetCurrentLang : getSetCurrentLang
		});

		return out;
	};
	return coraTest;
}(CORATEST || {}));
