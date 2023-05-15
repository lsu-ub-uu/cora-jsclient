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
"use strict";

QUnit.module("recordTypeSorterTest.js", {
	beforeEach: function() {
	},
	afterEach: function() {
	}
});

QUnit.test("init", function(assert) {
	let sorter = CORA.recordTypeSorter();
	assert.strictEqual(sorter.type, "recordTypeSorter");
});

QUnit.test("testSortList", function(assert) {
	let listToSort = createSearchListToSort();

	let sorter = CORA.recordTypeSorter();
	let sortedList = sorter.sortListUsingChildWithNameInData(listToSort, "searchGroup");
	let firstGroup = sortedList["autocomplete"];
	assert.strictEqual(firstGroup.length, 2);
	assert.strictEqual(firstGroup[0], listToSort[0]);
	assert.strictEqual(firstGroup[1], listToSort[2]);

	let secondGroup = sortedList["publicSearch"];
	assert.strictEqual(secondGroup.length, 1);
	assert.strictEqual(secondGroup[0], listToSort[1]);
});

function createSearchListToSort() {
	let listToSort = [];
	listToSort.push(CORATEST.searchRecordList.dataList.data[0].record);
	listToSort.push(CORATEST.searchRecordList.dataList.data[1].record);
	listToSort.push(CORATEST.searchRecordList.dataList.data[2].record);
	return listToSort;
}

QUnit.test("testSortListRepeatableNameInData", function(assert) {
	let listToSort = createRecordTypeListToSort();

	let sorter = CORA.recordTypeSorter();
	let sortedList = sorter.sortListUsingChildWithNameInData(listToSort, "groupOfRecordType");

	let firstGroup = sortedList["presentation"];
	assert.strictEqual(firstGroup.length, 3);
	assert.strictEqual(firstGroup[0], listToSort[8]);

	let secondGroup = sortedList["metadata"];
	assert.strictEqual(secondGroup.length, 5);

	let thirdGroup = sortedList["systemConfiguration"];
	assert.strictEqual(thirdGroup.length, 4);
});

function createRecordTypeListToSort() {
	let listToSort = [];
	CORATEST.recordTypeList.dataList.data.forEach(function(x) {
		listToSort.push(x.record);
	});
	return listToSort;
}

QUnit.test("testSortedListIsReset", function(assert) {
	let listToSort = createSearchListToSort();

	let sorter = CORA.recordTypeSorter();
	let sortedList = sorter.sortListUsingChildWithNameInData(listToSort, "searchGroup");
	let firstGroup = sortedList["autocomplete"];
	assert.strictEqual(firstGroup.length, 2);

	let secondGroup = sortedList["publicSearch"];
	assert.strictEqual(secondGroup.length, 1);
});

