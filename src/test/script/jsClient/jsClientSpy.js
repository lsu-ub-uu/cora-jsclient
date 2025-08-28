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
		let viewsShowingInWorkView = [];
		let viewsRemoved = [];
		let createdManagedGuiItem = [];
		let fetchedMetadataByRecordTypeId = [];
		let returnedRecordTypeMetadata = [];
		let addedGuiItem = [];
		let openInfos = [];
		let setCurrentLangs = [];
		let openDefinitionIds = [];
		let openRecursiveDeleteIds = [];

		function getRecordTypesClearedNoOfTimes() {
			return recordTypesClearedNoOfTimes;
		}
		function showView(managedGuiItem) {
			viewsShowingInWorkView.push(managedGuiItem);
		}

		function getViewShowingInWorkView(number) {
			return viewsShowingInWorkView[number];
		}
		function viewRemoved(managedGuiItem) {
			viewsRemoved.push(managedGuiItem);
		}

		function getViewRemoved(number) {
			return viewsRemoved[number];
		}

		function createManagedGuiItem(handledBy) {
			createdManagedGuiItemHandledBy.push(handledBy);
			let managedGuiItem = {
				"handledBy" : handledBy,
				"workView" : CORA.createSpanWithClassName("workView"),
				"menuView" : CORA.createSpanWithClassName("menuView")
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
			let metadata = {
				"metadataId" : recordTypeId + "Group",
				"presentationViewId" : recordTypeId + "ViewPGroup",
				"menuPresentationViewId" : recordTypeId + "MenuPGroup",
				"listPresentationViewId" : recordTypeId + "ListPGroup",
				"search" : recordTypeId + "Search",
				"userSuppliedId" : "true",
				"actionLinks" : {
					"search" : {
						"requestMethod" : "GET",
						"rel" : "search",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
						"accept" : "application/vnd.cora.recordList+json"
					},
					"read" : {
						"requestMethod" : "GET",
						"rel" : "read",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
						"accept" : "application/vnd.cora.record+json"
					},
					"update" : {
						"requestMethod" : "POST",
						"rel" : "update",
						"contentType" : "application/vnd.cora.record+json",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
						"accept" : "application/vnd.cora.record+json"
					},
					"create" : {
						"requestMethod" : "POST",
						"rel" : "create",
						"contentType" : "application/vnd.cora.record+json",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
						"accept" : "application/vnd.cora.record+json"
					},
					"list" : {
						"requestMethod" : "GET",
						"rel" : "list",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
						"accept" : "application/vnd.cora.recordList+json"
					},
					"delete" : {
						"requestMethod" : "DELETE",
						"rel" : "delete",
						"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne"
					}
				}
			};
			let validationTypes = {};
			if("text" == recordTypeId){
				validationTypes["coraText"] = {
					id: "coraText",
					textId: "coraTextText",
					defTextId: "coraTextValidationDefText",
					createDefinitionId: "coraTextNewGroup",
					updateDefinitionId: "coraTextGroup",
					createFormId: "coraTextNewPGroup",
					updateFormId: "coraTextPGroup"
				};
				validationTypes["textSystemOne"] = {
					id: "textSystemOne",
					textId: "textSystemOneText",
					defTextId: "textSystemOneValidationDefText",
					createDefinitionId: "textSystemOneNewGroup",
					updateDefinitionId: "textSystemOneGroup",
					createFormId: "textSystemOneNewPGroup",
					updateFormId: "textSystemOnePGroup"
				};
				
			}
			validationTypes[recordTypeId] = {
					id: recordTypeId,
					textId: recordTypeId +"Text",
					defTextId: recordTypeId +"DefText",
					createDefinitionId: recordTypeId +"NewGroup",
					updateDefinitionId: recordTypeId +"Group",
					createFormId: recordTypeId +"NewPGroup",
					updateFormId: recordTypeId +"PGroup"
				};
			metadata.validationTypes = validationTypes;
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

		function openDefinitionViewerForId(id) {
			openDefinitionIds.push(id);
		}
		function getOpenDefinitionIds(number) {
			return openDefinitionIds[number];
		}
		
		function openRecursiveDeleteForId(id) {
			openRecursiveDeleteIds.push(id);
		}
		function getOpenRecursiveDeleteForIds(number) {
			return openRecursiveDeleteIds[number];
		}
		
		let out = Object.freeze({
			"type" : "jsClientSpy",
			showView : showView,
			viewRemoved : viewRemoved,
			getViewRemoved : getViewRemoved,
			
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
			getSetCurrentLang : getSetCurrentLang,
			
			openDefinitionViewerForId : openDefinitionViewerForId,
			getOpenDefinitionIds : getOpenDefinitionIds,

			openRecursiveDeleteForId : openRecursiveDeleteForId,
			getOpenRecursiveDeleteForIds : getOpenRecursiveDeleteForIds
		});

		return out;
	};
	return coraTest;
}(CORATEST || {}));
