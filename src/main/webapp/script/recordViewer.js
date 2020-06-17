/*
 * Copyright 2016, 2017 Uppsala University Library
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
	cora.recordViewer = function(spec) {

		let view = CORA.gui.createSpanWithClassName("recordViewer");

		let messageHolder = CORA.messageHolder();
		view.appendChild(messageHolder.getView());

		let busy = CORA.busy();
		view.appendChild(busy.getView());

		fetchDataFromServer(processFetchedRecord);
		function fetchDataFromServer(callAfterAnswer) {
			busy.show();
			let readLink = spec.read;
			let callSpec = {
				"requestMethod" : readLink.requestMethod,
				"url" : readLink.url,
				"contentType" : readLink.contentType,
				"accept" : readLink.accept,
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError
			};
			spec.ajaxCallFactory.factor(callSpec);
		}
		function callError(answer) {
			busy.hideWithEffect();
			let messageSpec = {
				"message" : answer.status,
				"type" : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		}

		function processFetchedRecord(answer) {
			let record = getRecordPartFromAnswer(answer);
			let data = record.data;
			let permissions = getPermissionsForRecordGuiFromRecord(record);
			try {
				let recordGui = createRecordGui(spec.metadataId, data, permissions);
				addToShowView(recordGui, spec.metadataId);
				recordGui.initMetadataControllerStartingGui();
			} catch (error) {
				view.appendChild(document.createTextNode(error));
				view.appendChild(document.createTextNode(error.stack));
				view.appendChild(document.createTextNode(JSON.stringify(data)));
			}
			busy.hideWithEffect();
		}
		
		function getRecordPartFromAnswer(answer) {
			return JSON.parse(answer.responseText).record;
		}
		
		const getPermissionsForRecordGuiFromRecord = function(record) {
			let fetchedPermissions = record.permissions;
			return getFetchedPermissionsOrEmpty(fetchedPermissions);
		};
		
		const createEmptyPermissions = function() {
			return {
				write: [],
				read: []
			};
		};

		const getFetchedPermissionsOrEmpty = function(fetchedPermissions) {
			if (fetchedPermissions) {
				return getFetchedPermissions(fetchedPermissions);
			}
			return createEmptyPermissions();
		};
		
		const getFetchedPermissions = function(fetchedPermissions){
			let permissionsNew = {};
			permissionsNew.read = getReadPermission(fetchedPermissions);
			permissionsNew.write = getWritePermission(fetchedPermissions);
			return permissionsNew;
		}
		
		const getReadPermission = function(fetchedPermissions){
			return fetchedPermissions.read !== undefined ?  fetchedPermissions.read : [];
		}
		
		const getWritePermission = function(fetchedPermissions){
			return fetchedPermissions.write !== undefined ? fetchedPermissions.write : [];
		}
		
		function createRecordGui(metadataId, data, permissions) {
			let permissionSpec = {
					metadataId : metadataId,
					permissions : permissions
			};
			let recordPartPermissionCalculator = spec.recordPartPermissionCalculatorFactory.factor(permissionSpec);
			
			let dataDivider = getDataDividerFromData(data);
			let recordGuiSpec = {
				"metadataId" : metadataId,
				"data" : data,
				"dataDivider" : dataDivider,
				recordPartPermissionCalculator : recordPartPermissionCalculator
			};
			return spec.recordGuiFactory.factor(recordGuiSpec);
		}

		function getDataDividerFromData(data) {
			let cData = CORA.coraData(data);
			let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			let cDataDivider = CORA.coraData(cRecordInfo.getFirstChildByNameInData("dataDivider"));
			return cDataDivider.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function addToShowView(recordGuiToAdd, metadataIdUsedInData) {
			let showViewId = spec.presentationId;
			let showView = recordGuiToAdd.getPresentationHolder(showViewId, metadataIdUsedInData)
					.getView();
			view.appendChild(showView);
		}

		function getView() {
			return view;
		}

		return Object.freeze({
			getView : getView,
			processFetchedRecord : processFetchedRecord
		});
	};
	return cora;
}(CORA));