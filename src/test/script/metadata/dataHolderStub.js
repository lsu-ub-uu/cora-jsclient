/*
 * Copyright 2016 Olov McKie
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
	coraTest.dataHolderStub = function(dataIn, foundContainer) {
		let usedPath = undefined;
		function getData() {
			if (dataIn !== undefined) {
				return dataIn;
			}
			return {
				"name" : "groupIdTwoTextChildRepeat1to5",
				"children" : [ {
					"name" : "textVariableId",
					"value" : "",
					"repeatId" : "0"
				}, {
					"name" : "textVariableId2",
					"value" : "",
					"repeatId" : "0"
				} ]
			};
		}
		
		function findContainer(path){
			usedPath = path;
			if (foundContainer !== undefined) {
				return foundContainer;
			}
			return {
					"name" : "textVariableId",
					"value" : "",
					"repeatId" : "0"
				};
			
		}
		const getUsedPath = function (){
			return usedPath;
		}
		
		return Object.freeze({
			getData : getData,
			findContainer:findContainer,
			getUsedPath : getUsedPath
		});
	};
	return coraTest;
}(CORATEST || {}));