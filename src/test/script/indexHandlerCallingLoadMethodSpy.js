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
import CORATEST from "./aCoratestNameSpace.js";

const coraTest = CORATEST;

coraTest.indexHandlerCallingLoadMethodSpy = function(dependencies, spec) {
		var indexDataListWasCalled = false;
		var indexedRecords = [];
		var numberOfIndexedRecords = 0;
		var addedIndexOrderViewCalled = false;
		
		function indexDataList(){
			indexDataListWasCalled = true;
		}
		
//		function getIndexDataListWasCalled(){
//			return indexDataListWasCalled;
//		}
		
		function indexData(record){
//			indexedRecords.push(record);
//			numberOfIndexedRecords++;
			spec.loadMethod();
		}
		
		function getIndexRecord(indexNumber){
			return indexedRecords[indexNumber];
		}
		
//		function getNumberOfIndexedRecords(){
//			return numberOfIndexedRecords;
//		}
		
		function getSpec(){
			return spec;
		}
		
		function addIndexOrderView(){
			addedIndexOrderViewCalled = true;
		}
		
		function indexOrderViewAdded(){
			return addedIndexOrderViewCalled;
		}

		return Object.freeze({
			"type" : "indexHandlerSpy",
			getSpec : getSpec,
			indexData : indexData,
//			getIndexDataListWasCalled : getIndexDataListWasCalled,
//			getIndexRecord : getIndexRecord,
//			getNumberOfIndexedRecords : getNumberOfIndexedRecords,
			addIndexOrderView : addIndexOrderView,
			indexOrderViewAdded : indexOrderViewAdded 
		});
	};

export default CORATEST;
