/*
 * Copyright 2016, 2017 Olov McKie
 * Copyright 2016, 2017, 2023 Uppsala University Library
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
	cora.recordTypeProvider = function(dependencies, spec) {

		let callWhenReady = spec.callWhenReady;
		let allRecordTypes = [];
		let allRecordTypesById = {};
		let metadataByRecordTypeId = {};
		let recordTypesByGroupId = {};
		let recordTypesAnswer = undefined;
		let validationTypesAnswer = undefined;

		const start = function() {
			fetchRecordTypeListAndThen();
		};

		const fetchRecordTypeListAndThen = function() {
			callThroughAjax(spec.recordTypeListLink, handleAnswerForRecordTypes);
			callThroughAjax(spec.validationTypeListLink, handleAnswerForValidationTypes);
		};
		
		const handleAnswerForRecordTypes = function(answer){
			recordTypesAnswer = answer;
			possiblyProcessAnswers();
		};
		const handleAnswerForValidationTypes = function(answer){
			validationTypesAnswer = answer;
			possiblyProcessAnswers();
		};
		const possiblyProcessAnswers = function(){
			if(recordTypesAnswer && validationTypesAnswer){
				processAnswers(recordTypesAnswer);
			}
		};
		const callThroughAjax = function(linkSpec, callAfterAnswer) {
			let ajaxCallSpec = createIndependentCopy(linkSpec);
			ajaxCallSpec.loadMethod = callAfterAnswer;
			dependencies.ajaxCallFactory.factor(ajaxCallSpec);
		};

		const createIndependentCopy = function(someObject) {
			return JSON.parse(JSON.stringify(someObject));
		};

		const processAnswers = function(answer) {
			populateAllRecordTypesByIdFromAnswer(answer);
			if (callWhenReady) {
				callWhenReady();
			}
		};

		const populateAllRecordTypesByIdFromAnswer = function(answer) {
			resetHolders();
			let listOfAllRecordTypesAsRecords = JSON.parse(answer.responseText).dataList.data;
			listOfAllRecordTypesAsRecords.forEach(function(recordContainer) {
				addRecordToRecordTypeLists(recordContainer);
			});
			addRecordsToTypesByGroup();
		};

		const resetHolders = function() {
			allRecordTypes = [];
			allRecordTypesById = {};
			metadataByRecordTypeId = {};
		};

		const addRecordToRecordTypeLists = function(recordContainer) {
			let record = recordContainer.record;
			addRecordToAllRecordTypes(record);
			addRecordToTypesById(record);
		};

		const addRecordToAllRecordTypes = function(record) {
			allRecordTypes.push(record);
		};

		const addRecordToTypesById = function(record) {
			let recordId = getIdFromRecordData(record.data);
			allRecordTypesById[recordId] = record;
			addToMetadataByRecordTypeId(recordId, record);
		};

		const getIdFromRecordData = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			let cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};

		const addToMetadataByRecordTypeId = function(recordId, record) {
			let cRecord = CORA.coraData(record.data);
			let metadata = {
				"metadataId": getLinkValueFromRecord("metadataId", cRecord),
				"presentationViewId": getLinkValueFromRecord("presentationViewId", cRecord),
				"menuPresentationViewId": getLinkValueFromRecord("menuPresentationViewId", cRecord),
				"listPresentationViewId": getLinkValueFromRecord("listPresentationViewId", cRecord),
				"search": getLinkValueFromRecord("search", cRecord),
				"idSource": cRecord.getFirstAtomicValueByNameInData("idSource"),
				"actionLinks": record.actionLinks
			};
			metadata.validationTypes = getValidationTypesForRecordTypeId(recordId);
			metadataByRecordTypeId[recordId] = metadata;
		};
		
		const getValidationTypesForRecordTypeId = function(recordId){
			let validationTypes = {};
			let listOfAllValidationTypesAsRecords = JSON.parse(validationTypesAnswer.responseText).dataList.data;
			listOfAllValidationTypesAsRecords.forEach(function(recordContainer) {
				let validationType = recordContainer.record;
				let cValidationType = CORA.coraData(validationType.data);
				if(recordId==getLinkValueFromRecord("validatesRecordType", cValidationType)){
					let validationTypeCompact = convertValidationRecordToCompactForm(recordId, cValidationType);
					validationTypes[validationTypeCompact.id]= validationTypeCompact;
				}
			});
			return validationTypes
		};
		
		const convertValidationRecordToCompactForm = function(recordId, cValidationType){
			let validation = {};
			validation.id = getIdFromRecordData(cValidationType.getData());
			validation.textId = getLinkValueFromRecord("textId", cValidationType);
			validation.defTextId = getLinkValueFromRecord("defTextId", cValidationType);
			validation.createDefinitionId = getLinkValueFromRecord("newMetadataId", cValidationType);
			validation.updateDefinitionId = getLinkValueFromRecord("metadataId", cValidationType);
			validation.createFormId = getLinkValueFromRecord("newPresentationFormId", cValidationType);
			validation.updateFormId = getLinkValueFromRecord("presentationFormId", cValidationType);
			return validation;
		};
		
		const getLinkValueFromRecord = function(id, cRecord) {
			if (cRecord.containsChildWithNameInData(id)) {

				let cRecordLink = CORA.coraData(cRecord.getFirstChildByNameInData(id));
				return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
			}
		};

		const getRecordTypeById = function(recordTypeId) {
			if (allRecordTypesById[recordTypeId] !== undefined) {
				return allRecordTypesById[recordTypeId];
			}
			throw new Error("Id(" + recordTypeId + ") not found in recordTypeProvider");
		};

		const addRecordsToTypesByGroup = function() {
			let sortedByGroup = sortListUsingNameInData(allRecordTypes, "groupOfRecordType");
			recordTypesByGroupId = sortedByGroup;
		};

		const sortListUsingNameInData = function(listToSort, nameInData) {
			let sorter = CORA.recordTypeSorter();
			return sorter.sortListUsingChildWithNameInData(listToSort, nameInData);
		};

		const getAllRecordTypes = function() {
			return allRecordTypes;
		};

		const getMetadataByRecordTypeId = function(recordTypeId) {
			if (metadataByRecordTypeId[recordTypeId] !== undefined) {
				return metadataByRecordTypeId[recordTypeId];
			}
			throw new Error("Id(" + recordTypeId + ") not found in recordTypeProvider");
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const getRecordTypesByGroupId = function(groupId) {
			if (recordTypesByGroupId[groupId] === undefined) {
				return [];
			}
			return recordTypesByGroupId[groupId];
		};

		let out = Object.freeze({
			type: "recordTypeProvider",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getRecordTypeById: getRecordTypeById,
			getAllRecordTypes: getAllRecordTypes,
			onlyForTestHandleAnswerForRecordTypes: handleAnswerForRecordTypes,
			onlyForTestHandleAnswerForValidationTypes: handleAnswerForValidationTypes,
			getMetadataByRecordTypeId: getMetadataByRecordTypeId,
			getRecordTypesByGroupId: getRecordTypesByGroupId
		});
		start();
		return out;
	};
	return cora;
}(CORA));