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

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.metadataProviderNewSpy = function() {

		var fetchedMetadataIds = [];
		var fetchedMetadata = [];
		var callWhenReloadedMethod;
		var noOfReloads = 0;
		let childReferences = {
				"name": "childReferences",
				"children": [{
					"name": "childReference",
					"repeatId": "0",
					"children": [
						{
							"name": "ref",
							"children": [{
								"name": "linkedRecordType",
								"value": "metadataTextVariable"
							}, {
								"name": "linkedRecordId",
								"value": "textVariableId"
							}]
						}, {
							"name": "repeatMin",
							"value": "1"
						}, {
							"name": "repeatMax",
							"value": "1"
						}]
				}]
			};
//		let metadataDefault = {
//				"name" : "metadata",
//				"attributes" : {
//					"type" : "group"
//				},
//				"children" : [ childReferences ]
//			};

		function getMetadataById(metadataId) {
			fetchedMetadataIds.push(metadataId);
			let metadata = {
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					},
					"children" : [ childReferences ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(metadataId))
			};
			if(metadataId === "textVariableId"){
				metadata = {
						"name": "metadata",
						"children": [{
							"name": "regEx",
							"value": "^[0-9A-Öa-ö\\s!*.]{2,50}$"
						}]
//							.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(metadataId)),
							.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(metadataId)),
						"attributes": {
							"type": "textVariable"
						}
					}
			}
			fetchedMetadata.push(metadata);
			return metadata;
		}
		
		function createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet) {
			return [ createRecordInfoJson(idToGet) ]
					.concat(createNameInDataTextIdDefTextId2(idToGet));
		}
		function createRecordInfoJson(id) {
			return {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : id
				}, {
					"name" : "type",
					"value" : "metadataGroup"
				}, {
					"name" : "createdBy",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "user"
					}, {
						"name" : "linkedRecordId",
						"value" : "userId"
					} ]
				}, {
					"name" : "updatedBy",
					"value" : "userId"
				} ]
			};
		}

		function createNameInDataTextIdDefTextId2(id) {
			return [ {
				"name" : "nameInData",
				"value" : id+"NameInData"
			}, {
				"name" : "textId",
				"value" : id + "Text"
			}, {
				"name" : "defTextId",
				"value" : id + "DefText"
			} ];
		}


		function getFetchedMetadataId(no) {
			return fetchedMetadataIds[no];
		}
		function getFetchedMetadata(no) {
			return fetchedMetadata[no];
		}
		function reload(callWhenReloadedMethodIn) {
			noOfReloads++;
			callWhenReloadedMethod = callWhenReloadedMethodIn;
		}
		function getCallWhenReloadedMethod() {
			return callWhenReloadedMethod;
		}
		function callWhenReloadedMethod() {
			callWhenReloadedMethod();
		}
		function getNoOfReloads() {
			return noOfReloads;
		}
		function setChildReferences(childReferencesIn){
			childReferences = childReferencesIn;
		}
		return Object.freeze({
			getMetadataById : getMetadataById,
			getFetchedMetadataId : getFetchedMetadataId,
			getFetchedMetadata : getFetchedMetadata,
			reload : reload,
			getCallWhenReloadedMethod : getCallWhenReloadedMethod,
			getNoOfReloads : getNoOfReloads,
			callWhenReloadedMethod : callWhenReloadedMethod,
			setChildReferences : setChildReferences
		});
	};
	return coraTest;
}(CORATEST || {}));