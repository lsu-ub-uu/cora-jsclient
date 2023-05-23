/*
 * Copyright 2016, 2017 Olov McKie
 * Copyright 2016, 2017 Uppsala University Library
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
				"presentationFormId": getLinkValueFromRecord("presentationFormId", cRecord),
				"newMetadataId": getLinkValueFromRecord("newMetadataId", cRecord),
				"newPresentationFormId": getLinkValueFromRecord("newPresentationFormId", cRecord),
				"menuPresentationViewId": getLinkValueFromRecord("menuPresentationViewId", cRecord),
				"listPresentationViewId": getLinkValueFromRecord("listPresentationViewId", cRecord),
				"search": getLinkValueFromRecord("search", cRecord),
				"userSuppliedId": cRecord.getFirstAtomicValueByNameInData("userSuppliedId"),
				"abstract": cRecord.getFirstAtomicValueByNameInData("abstract"),
				"parentId": getLinkValueFromRecord("parentId", cRecord),
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
			let recordTypeGroupIdList = putRecordTypeGroupIdsIntoList(sortedByGroup);
			sortParentsAndChildrenForEachGroupIdInList(sortedByGroup, recordTypeGroupIdList);
		};

		const sortListUsingNameInData = function(listToSort, nameInData) {
			let sorter = CORA.recordTypeSorter();
			return sorter.sortListUsingChildWithNameInData(listToSort, nameInData);
		};

		const putRecordTypeGroupIdsIntoList = function(sortedByGroup) {
			let recordTypeGroupIdList = [];
			Object.keys(sortedByGroup).forEach(function(id) {
				recordTypeGroupIdList.push(id);
			});
			return recordTypeGroupIdList;
		};

		const sortParentsAndChildrenForEachGroupIdInList = function(sortedByGroup, recordTypeGroupIdList) {
			recordTypeGroupIdList.forEach(function(groupId) {
				let groupSortedByAbstract = sortListUsingNameInData(sortedByGroup[groupId], "abstract");
				sortGroupOnParentChildren(groupSortedByAbstract, groupId);
			});
		};

		const sortGroupOnParentChildren = function(groupSortedByAbstract, groupId) {
			recordTypesByGroupId[groupId] = [];
			let splittedImplementing = splitImplementingTypes(groupSortedByAbstract);
			let parentList = groupSortedByAbstract["true"];
			possiblyAddParentsAndSortedChildren(parentList, splittedImplementing["children"], groupId);
			addOrphans(splittedImplementing["orphans"], groupId);
		};

		const splitImplementingTypes = function(groupSortedByAbstract) {
			let implementingTypes = groupSortedByAbstract["false"];
			return splitImplementingIntoChildrenOrOrphans(implementingTypes);
		};

		const splitImplementingIntoChildrenOrOrphans = function(allChildrenList) {
			let splittedImplementing = createHolderForChildrenAndOrphans();
			allChildrenList.forEach(function(child) {
				sortAsOrphanOrNotOrphan(child, splittedImplementing);
			});
			return splittedImplementing;
		};

		const createHolderForChildrenAndOrphans = function() {
			let splittedImplementing = {};
			splittedImplementing["children"] = [];
			splittedImplementing["orphans"] = [];
			return splittedImplementing;
		};

		const sortAsOrphanOrNotOrphan = function(child, splittedImplementing) {
			if (hasParent(child)) {
				splittedImplementing["children"].push(child);
			} else {
				splittedImplementing["orphans"].push(child);
			}
		};

		const hasParent = function(child) {
			let cChild = CORA.coraData(child.data);
			return cChild.containsChildWithNameInData("parentId");
		};

		const possiblyAddParentsAndSortedChildren = function(parentList, childrenList, groupId) {
			if (parentList !== undefined) {
				addParentsAndSortedChildren(parentList, childrenList, groupId);
			}
		};

		const addParentsAndSortedChildren = function(parentList, childrenList, groupId) {
			parentList.forEach(function(parent) {
				recordTypesByGroupId[groupId].push(parent);
				sortChildren(childrenList, parent, groupId);
			});
		};

		const addOrphans = function(orphans, groupId) {
			orphans.forEach(function(orphan) {
				recordTypesByGroupId[groupId].push(orphan);
			});
		};

		const sortChildren = function(childrenList, parent, groupId) {
			let parentId = getParentId(parent);
			childrenList.forEach(function(child) {
				addChildIfChildToParent(child, parentId, groupId);
			});
		};

		const getParentId = function(parent) {
			let cParent = CORA.coraData(parent.data);
			let cRecordInfo = CORA.coraData(cParent.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};

		const addChildIfChildToParent = function(child, parentId, groupId) {
			let childsParentId = getParentIdFromChild(child);
			if (parentId === childsParentId) {
				recordTypesByGroupId[groupId].push(child);
			}
		};

		const getParentIdFromChild = function(child) {
			let cChild = CORA.coraData(child.data);
			let cChildsParentIdGroup = CORA.coraData(cChild.getFirstChildByNameInData("parentId"));
			return cChildsParentIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
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