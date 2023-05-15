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
var CORA = (function(cora) {
	"use strict";
	cora.definitionViewer = function(providers, dependencies, spec) {
		let out;
		let metadataProvider = providers.metadataProvider;
		let textProvider = providers.textProvider;
		let jsClient = providers.clientInstanceProvider.getJsClient();
		let view = dependencies.view;
		let id;

		const start = function() {
			id = spec.id;
		};

		const reloadForMetadataChanges = function() {
			//TODO: fix reload :)
		};

		const getView = function() {
			//			let texts = CORA.gui.createDivWithClassName("texts");
			//			view.appendChild(texts);
			//			let textId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("textId");
			//			let defTextId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("defTextId");
			//			texts.innerHTML = textId +":"+textProvider.getTranslation(textId)+"::"+ defTextId;
			//			
			return getViewForMetadataId(id);
		};

		const getViewForMetadataId = function(metadataGroupId) {
			let model = getViewModelForMetadataId(metadataGroupId);
			return view.createViewForViewModel(model);
		};
		const getViewModelForMetadataId = function(metadataId) {
			let cDataRecordGroup = getCMetadataById(metadataId);
			let model = getBasicModelFromCDataRecordGroup(cDataRecordGroup);

			if (cDataRecordGroup.containsChildWithNameInData("attributeReferences")) {
				model.attributes = collectAttributes(cDataRecordGroup);
			}
			if (cDataRecordGroup.containsChildWithNameInData("childReferences")) {
				model.children = collectChildren(cDataRecordGroup);
			}
			return model;
		};
		
		const getBasicModelFromCDataRecordGroup = function(cDataRecordGroup) {
			let id = getIdFromCDataGroup(cDataRecordGroup);
			let type = cDataRecordGroup.getData().attributes["type"];
			let nameInData = cDataRecordGroup.getFirstAtomicValueByNameInData("nameInData");
			let text = getTranslations(cDataRecordGroup, "textId");
			let defText = getTranslations(cDataRecordGroup, "defTextId");
			
			let basic = {
				id: id,
				type: type,
				nameInData: nameInData,
				text: text,
				defText: defText,
				methodOpenDefiningRecord: out.openDefiningRecordUsingEventAndId
			};
			
			if (cDataRecordGroup.containsChildWithNameInData("finalValue")) {
				basic.finalValue = cDataRecordGroup.getFirstAtomicValueByNameInData("finalValue");
			}				
			return basic;
		};

		const collectAttributes = function(cDataRecordGroup) {
			let attributes = [];
			let attributeReferences = cDataRecordGroup.getFirstChildByNameInData("attributeReferences");
			for (let attributeReference of attributeReferences.children) {
				let cAttributeReference = CORA.coraData(attributeReference);
				let attributeId = cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
				let cAttribute = getCMetadataById(attributeId);
				let attribute = getBasicModelFromCDataRecordGroup(cAttribute);
				attributes.push(attribute);
				attribute.collectionItems = collectCollectionItems(cAttribute);
			}
			return attributes;
		};
		
		const collectCollectionItems = function(cAttribute){
			let collectionLink = cAttribute.getFirstChildByNameInData("refCollection");
			let cCollectionLink = CORA.coraData(collectionLink);
			let collectionId = cCollectionLink.getFirstAtomicValueByNameInData("linkedRecordId");
			let cCollection = getCMetadataById(collectionId);
			let collectionItemReferences = cCollection.getFirstChildByNameInData("collectionItemReferences");
			let collectionItems = [];
			for (let itemLink of collectionItemReferences.children) {
				let cItemLink = CORA.coraData(itemLink);
				let collectionItemId = cItemLink.getFirstAtomicValueByNameInData("linkedRecordId");
				let cCollectionItem = getCMetadataById(collectionItemId);
				let collectionItem = getBasicModelFromCDataRecordGroup(cCollectionItem);
				collectionItems.push(collectionItem);
			}
			return collectionItems;
		};
		
		const collectChildren = function(cDataRecordGroup) {
			let children = [];
			let childReferences = cDataRecordGroup.getFirstChildByNameInData("childReferences");
			for (let childReference of childReferences.children) {
				let cChildReference = CORA.coraData(childReference);
				let repeatMin = cChildReference.getFirstAtomicValueByNameInData("repeatMin");
				let repeatMax = cChildReference.getFirstAtomicValueByNameInData("repeatMax");
				//				if(cChildReference.containsChildWithNameInData("recordPartConstraint")){
				//					recordPartConstraint = cChildReference.getFirstAtomicValueByNameInData("recordPartConstraint");
				//				}
				//				childRefCollectTerm, type = storage
				//				childRefCollectTerm, type = permission
				//				childRefCollectTerm, type = index (multiple)
				let refId = cChildReference.getLinkedRecordIdFromFirstChildLinkWithNameInData("ref");
				let childRef = {
					repeatMin: repeatMin,
					repeatMax: repeatMax,
					recordPartConstraint: "noConstraint",
					child: getViewModelForMetadataId(refId)
				};
				if(cChildReference.containsChildWithNameInData("recordPartConstraint")){
					childRef.recordPartConstraint = cChildReference.getFirstAtomicValueByNameInData("recordPartConstraint");
				}
				let indexAttributes=createAttributesWithNameAndValueAndRepeatId("type", "index");
				if(cChildReference.containsChildWithNameInDataAndAttributes("childRefCollectTerm",indexAttributes)){
					let indexs = cChildReference.getChildrenByNameInDataAndAttributes("childRefCollectTerm",indexAttributes);
					let indexTerms = [];
					for (let index of indexs) {
						let cIndex = CORA.coraData(index);
						let collectTermId = cIndex.getFirstAtomicValueByNameInData("linkedRecordId");
						indexTerms.push(collectTermId);
					}
					childRef.collectIndexTerms = indexTerms;
				}
				let storageAttributes=createAttributesWithNameAndValueAndRepeatId("type", "storage");
				if(cChildReference.containsChildWithNameInDataAndAttributes("childRefCollectTerm",storageAttributes)){
					let index = cChildReference.getFirstChildByNameInDataAndAttributes("childRefCollectTerm",storageAttributes);
						let cIndex = CORA.coraData(index);
						let collectTermId = cIndex.getFirstAtomicValueByNameInData("linkedRecordId");
					childRef.collectStorageTerm = collectTermId;
				}
				let permissionAttributes=createAttributesWithNameAndValueAndRepeatId("type", "permission");
				if(cChildReference.containsChildWithNameInDataAndAttributes("childRefCollectTerm",permissionAttributes)){
					let index = cChildReference.getFirstChildByNameInDataAndAttributes("childRefCollectTerm",permissionAttributes);
						let cIndex = CORA.coraData(index);
						let collectTermId = cIndex.getFirstAtomicValueByNameInData("linkedRecordId");
					childRef.collectPermissionTerm = collectTermId;
				}

				children.push(childRef);
			}
			return children;
		};
		
		const createAttributesWithNameAndValueAndRepeatId = function(attributeName, attributeValue, repeatId) {
			let attributes = {
				name: "attributes",
				children: []
			};
			let attribute =  {
				name: "attribute",
				repeatId: repeatId || "1",
				children: [{
					name: "attributeName",
					value: attributeName
				}, {
					name: "attributeValue",
					value: attributeValue
				}]
			};
			attributes.children.push(attribute);
			return attributes;
		};

		const getCMetadataById = function(metadataId) {
			let metadata = metadataProvider.getMetadataById(metadataId);
			return CORA.coraData(metadata);
		};

		const getIdFromCDataGroup = function(cDataRecordGroup) {
			let recordInfo = cDataRecordGroup.getFirstChildByNameInData("recordInfo");
			let cRecordInfo = CORA.coraData(recordInfo);
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};

		const getTranslations = function(cDataRecordGroup, name) {
			let textId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData(name);
			return textProvider.getAllTranslations(textId);
		};
		
		const openDefiningRecordUsingEventAndId = function(event, id) {
			let metadataRecord = metadataProvider.getMetadataRecordById(id); 
			let readLink = metadataRecord.actionLinks.read;
			openLinkedRecordForLink(event, readLink);
		};		
		
		const openLinkedRecordForLink = function(event, link) {
			let loadInBackground = "false";
			if (event.ctrlKey) {
				loadInBackground = "true";
			}
			let openInfo = {
				readLink: link,
				loadInBackground: loadInBackground
			};
			jsClient.openRecordUsingReadLink(openInfo);
		};
		
		const onlyForTestGetProviders = function() {
			return providers;
		};

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		const onlyForTestGetSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "definitionViewer",
			getView: getView,
			reloadForMetadataChanges: reloadForMetadataChanges,
			openDefiningRecordUsingEventAndId: openDefiningRecordUsingEventAndId,
			onlyForTestGetProviders: onlyForTestGetProviders,
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			onlyForTestGetSpec: onlyForTestGetSpec
		});
		start();

		return out;
	};
	return cora;
}(CORA));