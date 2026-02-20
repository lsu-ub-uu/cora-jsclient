/*
 * Copyright 2018 Uppsala University Library
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
	cora.indexListHandler = function(dependencies, spec) {
		var uploadQue = [];
		var numberOfIndexRecords = 0;
		var indexOrderView;
		var indexHandler;
		var currentRecord;
		var ongoingIndexing = false;
		var cancelButton;

		function indexDataList() {
			ongoingIndexing = true;
			var indexHandlerSpec = {
				"loadMethod": indexingFinished,
				"timeoutMethod": timeoutMethod
			};
			indexHandler = dependencies.indexHandlerFactory
				.factor(indexHandlerSpec);
			addIndexOrderView();
			indexData();
		}

		function addIndexOrderView() {
			createIndexOrderView();
			var buttonText = dependencies.textProvider
				.getTranslation("theClient_cancelIndexingText");
			cancelButton = createButton(buttonText, cancelIndexing,
				"cancelButton");
			indexOrderView.appendChild(cancelButton);
			var indexOrders = dependencies.uploadManager.view.getWorkView().firstChild;
			indexOrders.appendChild(indexOrderView);

		}

		function createIndexOrderView() {
			indexOrderView = CORA.createSpanWithClassName("indexOrder");
			indexOrderView.textContent = dependencies.textProvider
				.getTranslation("theClient_indexedText");
		}

		function indexData() {
			spec.dataList.data.forEach(pushToQue);
			startNextUploadIfThereIsMoreInQueue();
		}

		function pushToQue(dataRecord) {
			uploadQue.push(dataRecord.record);
		}

		function startNextUploadIfThereIsMoreInQueue() {
			var dataRecord = uploadQue.shift();
			if (dataRecord !== undefined) {
				startNextUploadIfStillOngoingIndexing(dataRecord);
			} else {
				indexOrderView.removeChild(cancelButton);
			}
		}

		function startNextUploadIfStillOngoingIndexing(dataRecord) {
			if (ongoingIndexing) {
				startNextUpload(dataRecord);
			}
		}

		function indexingFinished() {
			numberOfIndexRecords++;
			var child = CORA.createSpanWithClassName("indexItem");
			child.textContent = numberOfIndexRecords + ". " + getChildInfo();

			indexOrderView.appendChild(child);
			startNextUploadIfThereIsMoreInQueue();
		}

		function getChildInfo() {
			var cRecordInfo = extractRecordInfoFromCurrentRecord();
			var type = extractAtomicTypeFromRecordInfo(cRecordInfo);
			var id = cRecordInfo.getFirstAtomicValueByNameInData("id");
			var recordTypeText = getTextFromTextProvider("theClient_indexedRecordTypeText");
			var recordIdText = getTextFromTextProvider("theClient_indexedRecordIdText");
			return recordTypeText + ": " + type + ", " + recordIdText + ": "
				+ id;
		}

		function extractRecordInfoFromCurrentRecord() {
			var cRecord = CORA.coraData(currentRecord.data);
			return CORA.coraData(cRecord
				.getFirstChildByNameInData("recordInfo"));
		}

		function extractAtomicTypeFromRecordInfo(cRecordInfo) {
			var cType = CORA.coraData(cRecordInfo
				.getFirstChildByNameInData("type"));
			return cType.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getTextFromTextProvider(textId) {
			return dependencies.textProvider.getTranslation(textId);
		}

		function startNextUpload(dataRecord) {
			currentRecord = dataRecord;
			if (recordHasIndexLink(currentRecord)) {
				indexHandler.indexData(dataRecord);
			} else {
				startNextUploadIfThereIsMoreInQueue();
			}
		}

		function recordHasIndexLink(record) {
			return record.actionLinks.index !== undefined;
		}

		function timeoutMethod() {
			var child = CORA.createSpanWithClassName("indexItem");
			child.textContent = "TIMEOUT";
			indexOrderView.appendChild(child);

		}

		function getNumberOfIndexedRecords() {
			return numberOfIndexRecords;
		}

		function createButton(text, onclickMethod, className) {
			var button = document.createElement("input");
			button.type = "button";
			button.value = text;
			button.onclick = onclickMethod;
			button.className = className;
			return button;
		}

		function cancelIndexing() {
			ongoingIndexing = false;
			cancelButton.value = dependencies.textProvider
				.getTranslation("theClient_resumeIndexingText");
			cancelButton.onclick = resumeIndexing;
		}

		function getOngoingIndexing() {
			return ongoingIndexing;
		}

		function resumeIndexing() {
			ongoingIndexing = true;
			startNextUploadIfThereIsMoreInQueue();
			cancelButton.value = dependencies.textProvider
				.getTranslation("theClient_cancelIndexingText");
			cancelButton.onclick = cancelIndexing;
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		return Object.freeze({
			"type": "indexListHandler",
			getDependencies: getDependencies,
			getSpec: getSpec,
			indexDataList: indexDataList,
			indexingFinished: indexingFinished,
			timeoutMethod: timeoutMethod,
			getNumberOfIndexedRecords: getNumberOfIndexedRecords,
			cancelIndexing: cancelIndexing,
			getOngoingIndexing: getOngoingIndexing,
			resumeIndexing: resumeIndexing

		});
	};
	return cora;
}(CORA));