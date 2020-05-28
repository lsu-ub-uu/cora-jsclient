/*
 * Copyright 2016, 2017 Olov McKie
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
	cora.searchProvider = function(dependencies, spec) {
		var callWhenReady = spec.callWhenReady;

		var recordTypes = {};
		var sortedSearchList;
		fetchRecordTypeListAndThen(processFetchedData);

		function fetchRecordTypeListAndThen(callAfterAnswer) {
			callThroughAjax(spec.searchRecordListLink, callAfterAnswer);
		}

		function callThroughAjax(linkSpec, callAfterAnswer) {
			var ajaxCallSpec = createIndependentCopy(linkSpec);
			ajaxCallSpec.loadMethod = callAfterAnswer;
			dependencies.ajaxCallFactory.factor(ajaxCallSpec);
		}

		function createIndependentCopy(someObject) {
			return JSON.parse(JSON.stringify(someObject));
		}

		function processFetchedData(answer) {
			createRecordTypeObjectFromAnswer(answer);
			if (callWhenReady) {
				callWhenReady();
			}
		}

		function createRecordTypeObjectFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			data.forEach(function(recordContainer) {
				var record = recordContainer.record;
				var recordId = getIdFromRecordData(record.data);
				recordTypes[recordId] = record;
			});
			createSortedRecordList();
		}

		function getIdFromRecordData(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function createSortedRecordList(){
			var searchList = [];
			var sorter = CORA.recordTypeSorter();
			Object.keys(recordTypes).forEach(function(id) {
				searchList.push(recordTypes[id]);
			});
			sortedSearchList = sorter.sortListUsingChildWithNameInData(searchList, "searchGroup");
		}

		function getSearchById(recordTypeId) {
			if (recordTypes[recordTypeId] !== undefined) {
				return recordTypes[recordTypeId];
			}
			throw new Error("Id(" + recordTypeId + ") not found in searchProvider");
		}

		function getAllSearches() {
			var recordTypeList = [];
			Object.keys(recordTypes).forEach(function(id) {
				recordTypeList.push(recordTypes[id]);
			});
			return recordTypeList;

		}

		function getSearchesByGroupId(groupId) {
			if(sortedSearchList[groupId] !== undefined){
				return sortedSearchList[groupId];
			}
			return [];
		}

		function reload(callWhenReloadedMethodIn) {
			callWhenReady = callWhenReloadedMethodIn;
			fetchRecordTypeListAndThen(processFetchedData);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		return Object.freeze({
			type : "searchProvider",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getSearchById : getSearchById,
			getAllSearches : getAllSearches,
			getSearchesByGroupId : getSearchesByGroupId,
			processFetchedData : processFetchedData,
			reload : reload
		});
	};
	return cora;
}(CORA));