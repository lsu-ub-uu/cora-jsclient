/*
 * Copyright 2023 Olov McKie
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
		let metadataRecord = {};
		
		var fetchedMetadataIds = [];
		var fetchedMetadata = [];
		var callWhenReloadedMethod;
		var noOfReloads = 0;

		function getMetadataById(metadataId) {
			fetchedMetadataIds.push(metadataId);
			let metadata = metadataKeeper[metadataId];
			fetchedMetadata.push(metadata);
			return metadata;
		}
		function reload(callWhenReloadedMethodIn) {
			noOfReloads++;
			callWhenReloadedMethod = callWhenReloadedMethodIn;
		}
		
		const addMetadataById = function(id, metadata){
			metadataKeeper[id] = metadata;
		};
		
		const addMetadataByCompactDefinition = function(def){
			let basic = createBasicMetadataByTypeIdAndNameInData(def.type, def.id, def.nameInData);
			if(def.attributes){
				let attributeReferences = {
			      name: "attributeReferences",
			      children: []};
				basic.children.push(attributeReferences); 
				def.attributes.forEach(function(attributeId){
					let ref = createLinkByNameInDataTypeId("ref", "metadata", attributeId);
					attributeReferences.children.push(ref);
				});
			}
			if(def.children){
				let childReferences = {
			      name: "childReferences",
			      children: []};
				basic.children.push(childReferences); 
				def.children.forEach(function(child){
					childReferences.children.push(createChildReferenceByChild(child));
				});
			}
			if(def.finalValue){
				basic.children.push(createAtomicByNameInDataAndValue("finalValue", def.finalValue));
			}
			if(def.itemCollectionId){
				let refCollection = createLinkByNameInDataTypeId("refCollection", "metadata", def.itemCollectionId);
				basic.children.push(refCollection);
			}
			if(def.refIds){
				let collectionItemReferences = {
			      name: "collectionItemReferences",
			      children: []};
				basic.children.push(collectionItemReferences); 
				def.refIds.forEach(function(refId){
					let ref = createLinkByNameInDataTypeId("ref", "metadata", refId);
					collectionItemReferences.children.push(ref);
				});
			}
			addMetadataById(def.id, basic);
		};
		const createAtomicByNameInDataAndValue = function(nameInData, value){
			return {name: nameInData, value: value};
		};
		const createLinkByNameInDataTypeId = function(nameInData, type, id){
			return	{
	              name: nameInData,
	              children: [
	                {
	                  name: "linkedRecordType",
	                  value: type
	                },
	                {
	                  name: "linkedRecordId",
	                  value: id
	                }
	              ]
	            }
		};
		
		const createChildReferenceByChild = function(child){
	        let childReference= {
	          name: "childReference",
	          repeatId: "0",
	          children: [
	            {
	              name: "repeatMin",
	              value: child.repeatMin
	            },
	            {
	              name: "repeatMax",
	              value: child.repeatMax
	            }
	          ]
	        };
	        let ref = createLinkByNameInDataTypeId("ref", "metadata", child.refId);
			childReference.children.push(ref);
			if(child.recordPartConstraint){
				childReference.children.push(createAtomicByNameInDataAndValue("recordPartConstraint", 
					child.recordPartConstraint));
			}
			if(child.collectIndexTerms){
				for (let indexTerm of child.collectIndexTerms) {
			        let collectTerm = createLinkByNameInDataTypeId("childRefCollectTerm", "collectIndexTerm",
			        indexTerm);
			        collectTerm.attributes = {type: "index"};
					childReference.children.push(collectTerm);
				}
			}
			if(child.collectStorageTerm){
		        let collectTerm = createLinkByNameInDataTypeId("childRefCollectTerm", "collectStorageTerm",
		        child.collectStorageTerm);
		        collectTerm.attributes = {type: "storage"};
				childReference.children.push(collectTerm);
			}
			if(child.collectPermissionTerm){
		        let collectTerm = createLinkByNameInDataTypeId("childRefCollectTerm", "collectPermissionTerm",
		        child.collectPermissionTerm);
		        collectTerm.attributes = {type: "permission"};
				childReference.children.push(collectTerm);
			}
			
			return childReference;
		};
		const createBasicMetadataByTypeIdAndNameInData = function(type, id, nameInData){
			let x= {
				attributes: {type: type},
					children:[
						{name: "recordInfo",
							children: [
								{name: "id",
								value: id},
								{name: "dataDivider",
								value: "someDataDivider"}
							]
						},
						{name : "nameInData",
						value : nameInData}
					]
				};
			let textId = createLinkByNameInDataTypeId("textId", "text", id + "Text");
			x.children.push(textId);
			let defTextId = createLinkByNameInDataTypeId("defTextId", "text", id + "DefText");
			x.children.push(defTextId);
			return x;
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
		
		const addMetadataRecordById = function(id,metadataRecordValue){
					metadataRecord[id] = metadataRecordValue;
		};
		
		const getMetadataRecordById = function(id){
			return metadataRecord[id];
		};
		
		return Object.freeze({
			getMetadataById : getMetadataById,
			getMetadataRecordById: getMetadataRecordById,
			reload : reload,

			addMetadataById : addMetadataById,
			addMetadataByCompactDefinition : addMetadataByCompactDefinition,
			
			addMetadataRecordById:addMetadataRecordById,
			
			getFetchedMetadataId : getFetchedMetadataId,
			getFetchedMetadata : getFetchedMetadata,
			getCallWhenReloadedMethod : getCallWhenReloadedMethod,
			getNoOfReloads : getNoOfReloads,
			callWhenReloadedMethod : callWhenReloadedMethod
		});
	};
	return coraTest;
}(CORATEST || {}));