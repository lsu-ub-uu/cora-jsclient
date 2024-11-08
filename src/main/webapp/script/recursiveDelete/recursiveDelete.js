/*
 * Copyright 2024 Uppsala University Library
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
	cora.recursiveDelete = function(providers, dependencies, spec) {
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
			let model = getViewModelForMetadataId(id);
			view.updateViewForViewModel(model);
		};

		const getView = function() {
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
			if (cDataRecordGroup.containsChildWithNameInData("refCollection")) {
				model.refCollection = collectRefCollection(cDataRecordGroup);
			}
			if (cDataRecordGroup.containsChildWithNameInData("collectionItemReferences")) {
				model.collectionItems = collectCollectionItemReferences(cDataRecordGroup);
			}
			if (cDataRecordGroup.containsChildWithNameInData("childReferences")) {
				model.children = collectChildReferences(cDataRecordGroup, "childReferences");
			}
			return model;
		};
		
		const getCMetadataById = function(metadataId) {
			let metadata = metadataProvider.getMetadataById(metadataId);
			return CORA.coraData(metadata);
		};
		
		const getBasicModelFromCDataRecordGroup = function(cDataRecordGroup) {
			let id = getId(cDataRecordGroup);
			let type = getType(cDataRecordGroup);
			let nameInData = cDataRecordGroup.getFirstAtomicValueByNameInData("nameInData");
//			let dataDivider = getDataDividerFromCDataGroup(cDataRecordGroup);
			let text = getText(cDataRecordGroup, "textId");
			let defText = getText(cDataRecordGroup, "defTextId");
			
			let basic = {
				id: id,
				type: type,
				nameInData: nameInData,
				text: text,
				defText: defText,
				methodOpenDefiningRecord: out.openDefiningRecordUsingEventAndId
			};
			
			return basic;
		};
		
		const getId = function(cDataRecordGroup) {
			let recordInfo = cDataRecordGroup.getFirstChildByNameInData("recordInfo");
			let cRecordInfo = CORA.coraData(recordInfo);
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};
		
		const getType = function(cDataRecordGroup) {
			return cDataRecordGroup.getData().attributes["type"];
		};
		
		const getText = function(cDataRecordGroup, name) {
			let textId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData(name);
			let textObject = textProvider.getAllTranslations(textId);
			textObject.id = textId;
			textObject.type = "text";
			return textObject;
		};

		const collectAttributes = function(cDataRecordGroup) {
			let attributes = [];
			let attributeReferences = cDataRecordGroup.getFirstChildByNameInData("attributeReferences");
			for (let attributeReference of attributeReferences.children) {
				let metadataInfo = readLinkAndCreateMetadataInformation(attributeReference);
				attributes.push(metadataInfo);
			}
			return attributes;
		};
		
		const readLinkAndCreateMetadataInformation = function(data){
			let cData = CORA.coraData(data);
			let linkId = cData.getFirstAtomicValueByNameInData("linkedRecordId");
			return getViewModelForMetadataId(linkId);
		};
		
		const collectRefCollection = function(cDataRecordGroup){
			let refCollection = [];
			let refCollectionLink = cDataRecordGroup.getFirstChildByNameInData("refCollection");
			let metadataInfo = readLinkAndCreateMetadataInformation(refCollectionLink);
			refCollection.push(metadataInfo);
			return refCollection;
		};
		
		const collectCollectionItemReferences = function(cDataRecordGroup){
			let collectionItemReferences = [];
			let collectionItemReferencesGroup = cDataRecordGroup.getFirstChildByNameInData("collectionItemReferences");
			for (let itemLink of collectionItemReferencesGroup.children) {
				let metadataInfo = readLinkAndCreateMetadataInformation(itemLink);
				collectionItemReferences.push(metadataInfo);
			}
			return collectionItemReferences;
		};
		
		const collectChildReferences = function(cDataRecordGroup, groupName) {
			let children = [];
			let childReferences = cDataRecordGroup.getFirstChildByNameInData(groupName);
			for (let childReference of childReferences.children) {
				let cChildReference = CORA.coraData(childReference);
				let refId = cChildReference.getLinkedRecordIdFromFirstChildLinkWithNameInData("ref");
				let metadataInfo = getViewModelForMetadataId(refId);
				children.push(metadataInfo);
			}
			return children;
		};
		
//		const getDataDividerFromCDataGroup = function(cDataRecordGroup) {
//			let recordInfo = cDataRecordGroup.getFirstChildByNameInData("recordInfo");
//			let cRecordInfo = CORA.coraData(recordInfo);
//			return cRecordInfo.getFirstAtomicValueByNameInData("dataDivider");
//		};
		
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
			type: "recursiveDelete",
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