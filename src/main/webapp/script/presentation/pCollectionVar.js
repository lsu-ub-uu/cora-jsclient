/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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
	cora.pCollectionVar = function(dependencies, spec) {
		const metadataProvider = dependencies.metadataProvider;
		const textProvider = dependencies.textProvider;
		const pParentVarFactory = dependencies.pParentVarFactory;
		
		const cPresentation = spec.cPresentation;
		let pParentVar;
		let cMetadataElement;
		let refCollectionId;
		
		const start = function() {
			cMetadataElement = getMetadataById(spec.metadataIdUsedInData);
			let cRefCollection = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("refCollection"));
			refCollectionId = cRefCollection.getFirstAtomicValueByNameInData("linkedRecordId");
			
			pParentVar = pParentVarFactory.factor(spec, self);
		}; 
		
		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const addTypeSpecificInfoToViewSpec = function(mode, pCollVarViewSpec) {
			pCollVarViewSpec.type = "pCollVar";
			pCollVarViewSpec.info.technicalInfo.push({text: `itemCollection: ${refCollectionId}`,
				onclickMethod: openRefCollectionIdRecord});
			addOptionsToSpecIfInput(mode, pCollVarViewSpec);
		};
		
		const openRefCollectionIdRecord = function(event) {
			let collectionRecord = metadataProvider.getMetadataRecordById(refCollectionId);
			pParentVar.openLinkedRecordForLink(event, collectionRecord.actionLinks.read);
		};
		
		const addOptionsToSpecIfInput = function(mode, pCollVarViewSpec) {
			if(mode==="input"){
				const specOptions = [];
				possiblyAddOptionForEmptyText(specOptions);
				addOptionForCollectionItems(specOptions);
				pCollVarViewSpec.options = specOptions;
			}
		};
			
		const possiblyAddOptionForEmptyText = function(specOptions) {
			if (cPresentation.containsChildWithNameInData("emptyTextId")) {
				const emptyOption = createOptionForEmptyText();
				specOptions.push(emptyOption);
			}
		};
		
		const createOptionForEmptyText = function() {
			let cEmptyTextId = CORA.coraData(cPresentation
				.getFirstChildByNameInData("emptyTextId"));
			let emptyTextId = cEmptyTextId.getFirstAtomicValueByNameInData("linkedRecordId");

			let optionText = textProvider.getTranslation(emptyTextId);
			return [optionText, ""];
		};
		
		const addOptionForCollectionItems = function(specOptions) {
			let collectionItemReferencesChildren = getCollectionItemReferencesChildren();

			collectionItemReferencesChildren.forEach((ref)=> {
				let option = createOptionForRef(ref);
				specOptions.push(option);
			});
		};
		
		const getCollectionItemReferencesChildren = function() {
			let cMetadataCollection = getMetadataById(refCollectionId);
			let collectionItemReferences = cMetadataCollection
				.getFirstChildByNameInData("collectionItemReferences");
			return collectionItemReferences.children;
		};

		const createOptionForRef = function(ref) {
			let cItemRef = CORA.coraData(ref);
			let itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;

			let item = getMetadataById(itemRefId);
			let value = item.getFirstAtomicValueByNameInData("nameInData");

			let cTextIdGroup = CORA.coraData(item.getFirstChildByNameInData("textId"));
			let textIdToTranslate = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");

			let optionText = textProvider.getTranslation(textIdToTranslate);

			return [optionText, value];
		};
		
		const validateTypeSpecificValue = function(valueFromView) {
			return true;
		};
		
		const autoFormatEnteredValue = function(valueFromView){
			return valueFromView;
		};
		
		const transformValueForView = function(mode, valueForView){
			if(mode === "input" || valueForView === ""){
				return valueForView;
			}
			return getTranslatedTextForOptionValue(valueForView);
		};
		
		const getTranslatedTextForOptionValue = function(value) {
			let item = findItemForValue(value);
			let cTextIdGroup = CORA.coraData(item.getFirstChildByNameInData("textId"));
			let textIdToTranslate = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			return textProvider.getTranslation(textIdToTranslate);
		};
		
		const findItemForValue = function(value) {
			let collectionItemReferencesChildren = getCollectionItemReferencesChildren();
			let item;
			collectionItemReferencesChildren.find((ref)=> {
				let cItemRef = CORA.coraData(ref);
				let itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;
				item = getMetadataById(itemRefId);
				let refValue = item.getFirstAtomicValueByNameInData("nameInData");
				return refValue === value;
			});
			return item;
		};
		
		const getSpec = function() {
			return spec;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const self = {
			addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec,
			validateTypeSpecificValue: validateTypeSpecificValue,
			autoFormatEnteredValue: autoFormatEnteredValue,
			transformValueForView: transformValueForView
		};

		start();
		return Object.freeze({
			type: "pCollVar",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: pParentVar.getView,
			openRefCollectionIdRecord: openRefCollectionIdRecord
		});

	};
	return cora;
}(CORA));