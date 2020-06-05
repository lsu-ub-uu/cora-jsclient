/*
 * Copyright 2015 Olov McKie
 * Copyright 2020 Uppsala University Library
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
	coraTest.recordPartPermissionCalculatorSpy = function() {

		let readRequestedIds = [];
		let writeRequestedIds = [];
		let idsToReturnFalseForRead = [];
		let idsToReturnFalseForWrite = [];


		const hasFulfilledReadPermissionsForRecordPart = function(type, id) {
			readRequestedIds.push(type+"_"+id);
			if(idsToReturnFalseForRead.includes(type+"_"+id)){
				return false;
			}
			return true;
		}

		const hasFulfilledWritePermissionsForRecordPart = function(type, id) {
			writeRequestedIds.push(type+"_"+id);
			if(idsToReturnFalseForWrite.includes(type+"_"+id)){
				return false;
			}
			return true;
		}
		
		const getReadRequestedId = function(index){
			return readRequestedIds[index];
		}
		const getWriteRequestedId = function(index){
			return writeRequestedIds[index];
		}
		
		const addIdToReturnFalseForRead = function(id){
			idsToReturnFalseForRead.push(id);
		}
		const addIdToReturnFalseForWrite = function(id){
			idsToReturnFalseForWrite.push(id);
		}

		return Object.freeze({
			hasFulfilledReadPermissionsForRecordPart : hasFulfilledReadPermissionsForRecordPart,
			hasFulfilledWritePermissionsForRecordPart : hasFulfilledWritePermissionsForRecordPart,
			getReadRequestedId : getReadRequestedId,
			getWriteRequestedId : getWriteRequestedId,
			addIdToReturnFalseForRead : addIdToReturnFalseForRead, 
			addIdToReturnFalseForWrite : addIdToReturnFalseForWrite
		});
	};
	return coraTest;
}(CORATEST || {}));