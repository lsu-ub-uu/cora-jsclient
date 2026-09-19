/*
 * Copyright 2017 Uppsala University Library
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
import CORATEST from "./aCoratestNameSpace.js";

const coraTest = CORATEST;

coraTest.indexListHandlerSpy = function(dependencies, spec) {
		var indexDataListWasCalled = false;
		var indexedDataList;

		function indexDataList() {
			indexDataListWasCalled = true;
			indexedDataList = spec.dataList;
		}

		function getIndexDataListWasCalled(){
			return indexDataListWasCalled;
		}

		function getRecordInIndexedList(numberInList){
			return indexedDataList.data[numberInList];
		}

		function getSpec(){
			return spec;
		}

		return Object.freeze({
			"type" : "indexListHandlerSpy",
			indexDataList : indexDataList,
			getIndexDataListWasCalled : getIndexDataListWasCalled,
			getRecordInIndexedList : getRecordInIndexedList,
			getSpec : getSpec
		});
	};

export default CORATEST;
