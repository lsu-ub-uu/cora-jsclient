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
	coraTest.metadataProviderForDefinitionViewerSpy = function() {
		
		let metadataKeeper = {};
		
		var fetchedMetadataIds = [];
		var fetchedMetadata = [];
		var callWhenReloadedMethod;
		var noOfReloads = 0;

		function getMetadataById(metadataId) {
			fetchedMetadataIds.push(metadataId);
//			var metadata = {
//				"name" : "metadata",
//				"attributes" : {
//					"type" : "group"
//				},
//				"children" : [ {
//					"name" : "childReferences",
//					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
//							"metadataCollectionVariable", "userSuppliedIdCollectionVar", "1") ]
//				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(metadataId))
//			};
			let metadata = metadataKeeper[metadataId];
			fetchedMetadata.push(metadata);
			return metadata;
		}
		function createChildReferenceWithRefAndRepeatId1to1(refRecordType, ref, repeatId) {
			var attribute = "metadataGroup";
			if (refRecordType === "metadataCollectionVariable") {
				attribute = "collectionVariable";
			} else if (refRecordType === "metadataRecordLink") {
				attribute = "recordLink";
			} else if (refRecordType === "metadataResourceLink") {
				attribute = "resourceLink";
			} else if (refRecordType === "metadataTextVariable") {
				attribute = "textVariable";
			}

			return createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(refRecordType,
					ref, attribute, repeatId, "1", "1");
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
				"value" : id
			}, {
				"name" : "textId",
				"value" : id + "Text"
			}, {
				"name" : "defTextId",
				"value" : id + "DefText"
			} ];
		}

		function createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(refRecordType, ref,
				attribute, repeatId, repeatMin, repeatMax) {
			return {
				"name" : "childReference",
				"repeatId" : repeatId,
				"children" : [ {
					"name" : "ref",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadata"
					}, {
						"name" : "linkedRecordId",
						"value" : ref
					} ]
				}, {
					"name" : "repeatMin",
					"value" : repeatMin
				}, {
					"name" : "repeatMax",
					"value" : repeatMax
				} ]
			};
		}
		function reload(callWhenReloadedMethodIn) {
			noOfReloads++;
			callWhenReloadedMethod = callWhenReloadedMethodIn;
		}
		
		const addMetadataById = function(id, metadata){
			metadataKeeper[id] = metadata;
		};
		
		const addMetadataByCompactDefinition = function(def){
//    let toAdd = {
//		id: "minimalGroupId",
//		type: "group",
//		nameInData: "minimalGroup",
//		children : [{repeatMin: "1", repeatMax: "10", refId : "textVar"}] 
//	};
			let basic = createBasicMetadataByTypeIdAndNameInData(def.type, def.id, def.nameInData);
//			console.log(def.children.length)
//			if(def.children.length > 0){
			if(def.children){
				let childReferences = {
			      name: "childReferences",
			      children: []};
				basic.children.push(childReferences); 
				def.children.forEach(function(child){
					childReferences.children.push(createChildReferenceByMinMaxRefId(child.repeatMin, 
						child.repeatMax, child.refId));
				});
			}
			
			addMetadataById(def.id, basic);
	
    
		};
		
		const createChildReferenceByMinMaxRefId = function(min, max, refId){
	        return {
	          name: "childReference",
	          repeatId: "0",
	          children: [
	            {
	              name: "repeatMin",
	              value: min
	            },
	            {
	              name: "repeatMax",
	              value: max
	            },
	            {
	              name: "ref",
	              children: [
	                {
	                  name: "linkedRecordType",
	                  value: "metadata"
	                },
	                {
	                  name: "linkedRecordId",
	                  value: refId
	                }
	              ]
	            }
	          ]
	        };
		};
		const createBasicMetadataByTypeIdAndNameInData = function(type, id, nameInData){
			return {
				attributes: {type: type},
					children:[
						{name: "recordInfo",
							children: [
								{name: "id",
								value: id}
							]
						},
						{name : "nameInData",
						value : nameInData},
						{name: "textId",
					    	children: [
								{name: "linkedRecordType",
					          	value: "text"},
					        {name: "linkedRecordId",
					        value: id + "Text"}
					      ]
					    },
					    {name: "defTextId",
					    	children: [
					        	{name: "linkedRecordType",
					          	value: "text"},
					        	{name: "linkedRecordId",
					          	value: id+"DefText"}
					      ]
					    }
					]
				};
				
		}
		
		function getFetchedMetadataId(no) {
			return fetchedMetadataIds[no];
		}
		function getFetchedMetadata(no) {
			return fetchedMetadata[no];
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
		return Object.freeze({
			getMetadataById : getMetadataById,
			reload : reload,

			addMetadataById : addMetadataById,
			addMetadataByCompactDefinition:addMetadataByCompactDefinition,
			
			getFetchedMetadataId : getFetchedMetadataId,
			getFetchedMetadata : getFetchedMetadata,
			getCallWhenReloadedMethod : getCallWhenReloadedMethod,
			getNoOfReloads : getNoOfReloads,
			callWhenReloadedMethod : callWhenReloadedMethod
		});
	};
	return coraTest;
}(CORATEST || {}));