/*
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
	cora.recordTypeSorter = function() {
		var sortedList ={};

		function sortListUsingChildWithNameInData(listToSort, nameInData){
			sortedList ={};
			listToSort.forEach(function(searchRecord) {
				addSearchRecordToList(searchRecord, nameInData);
			});
			return sortedList;
		}

		function addSearchRecordToList(searchRecord, nameInData){
			var cSearchRecord = CORA.coraData(searchRecord.data);
			var sortByValues = cSearchRecord.getChildrenByNameInData(nameInData);
			sortByValues.forEach(function(sortByValueChild) {
				var sortByValue = sortByValueChild.value;
				if(sortedList[sortByValue]  === undefined){
					sortedList[sortByValue] = [];
				}
				sortedList[sortByValue].push(searchRecord);
			});

		}

		return Object.freeze({
			type : "recordTypeSorter",
			sortListUsingChildWithNameInData : sortListUsingChildWithNameInData
		});
	};
	return cora;
}(CORA));