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

		var view = CORA.gui.createSpanWithClassName("recordViewer");

		var messageHolder = CORA.messageHolder();
		view.appendChild(messageHolder.getView());

		var busy = CORA.busy();
		view.appendChild(busy.getView());

		fetchDataFromServer(processFetchedRecord);
		function fetchDataFromServer(callAfterAnswer) {
			busy.show();
			var readLink = spec.read;
			var callSpec = {
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
			var messageSpec = {
				"message" : answer.status,
				"type" : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		}

		function processFetchedRecord(answer) {
			var data = getDataPartOfRecordFromAnswer(answer);
			try {
				var recordGui = createRecordGui(spec.metadataId, data);
				addToShowView(recordGui, spec.metadataId);
				recordGui.initMetadataControllerStartingGui();
			} catch (error) {
				view.appendChild(document.createTextNode(error));
				view.appendChild(document.createTextNode(error.stack));
				view.appendChild(document.createTextNode(JSON.stringify(data)));
			}
			busy.hideWithEffect();
		}

		function getDataPartOfRecordFromAnswer(answer) {
			return JSON.parse(answer.responseText).record.data;
		}

		function createRecordGui(metadataId, data) {
			//TODO: permissions and permissionCalculator???
			var dataDivider = getDataDividerFromData(data);
			var recordGuiSpec = {
				"metadataId" : metadataId,
				"data" : data,
				"dataDivider" : dataDivider
			};
			return spec.recordGuiFactory.factor(recordGuiSpec);
		}

		function getDataDividerFromData(data) {
			var cData = CORA.coraData(data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			var cDataDivider = CORA.coraData(cRecordInfo.getFirstChildByNameInData("dataDivider"));
			return cDataDivider.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function addToShowView(recordGuiToAdd, metadataIdUsedInData) {
			var showViewId = spec.presentationId;
			var showView = recordGuiToAdd.getPresentationHolder(showViewId, metadataIdUsedInData)
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