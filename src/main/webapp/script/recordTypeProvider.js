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
var CORA = (function (cora) {
    "use strict";
    cora.recordTypeProvider = function (dependencies, spec) {

        var callWhenReady = spec.callWhenReady;
        var allRecordTypes = [];
        var allRecordTypesById = {};
        var metadataByRecordTypeId = {};
        var recordTypesByGroupId = {};

        function start() {
            fetchRecordTypeListAndThen(processFetchedData);
        }

        function fetchRecordTypeListAndThen(callAfterAnswer) {
            callThroughAjax(spec.recordTypeListLink, callAfterAnswer);
        }

        function callThroughAjax(linkSpec, callAfterAnswer) {
            var ajaxCallSpec = createIndependentCopy(linkSpec);
            ajaxCallSpec.loadMethod = callAfterAnswer;
            dependencies.ajaxCallFactory.factor(ajaxCallSpec);
        }

        function createIndependentCopy(someObject) {
            return JSON.parse(JSON.stringify(someObject));
        }

        function processFetchedData(answer) {
            populateAllRecordTypesByIdFromAnswer(answer);
            if (callWhenReady) {
                callWhenReady();
            }
        }

        function populateAllRecordTypesByIdFromAnswer(answer) {
            resetHolders();
            var listOfAllRecordTypesAsRecords = JSON.parse(answer.responseText).dataList.data;
            listOfAllRecordTypesAsRecords.forEach(function (recordContainer) {
                addRecordToRecordTypeLists(recordContainer);
            });
            addRecordsToTypesByGroup();
        }

        function resetHolders() {
            allRecordTypes = [];
            allRecordTypesById = {};
            metadataByRecordTypeId = {};
        }

        function addRecordToRecordTypeLists(recordContainer) {
            var record = recordContainer.record;
            addRecordToAllRecordTypes(record);
            addRecordToTypesById(record);
        }

        function addRecordToAllRecordTypes(record) {
            allRecordTypes.push(record);
        }

        function addRecordToTypesById(record) {
            var recordId = getIdFromRecordData(record.data);
            allRecordTypesById[recordId] = record;
            addToMetadataByRecordTypeId(recordId, record);
        }

        function getIdFromRecordData(recordData) {
            var cRecord = CORA.coraData(recordData);
            var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
            return cRecordInfo.getFirstAtomicValueByNameInData("id");
        }

        function addToMetadataByRecordTypeId(recordId, record) {
            var cRecord = CORA.coraData(record.data);
            var metadata = {
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
            metadataByRecordTypeId[recordId] = metadata;
        }

        function getLinkValueFromRecord(id, cRecord) {
            if (cRecord.containsChildWithNameInData(id)) {

                var cRecordLink = CORA.coraData(cRecord.getFirstChildByNameInData(id));
                return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
            }
        }

        function getRecordTypeById(recordTypeId) {
            if (allRecordTypesById[recordTypeId] !== undefined) {
                return allRecordTypesById[recordTypeId];
            }
            throw new Error("Id(" + recordTypeId + ") not found in recordTypeProvider");
        }

        function addRecordsToTypesByGroup() {
            var sortedByGroup = sortListUsingNameInData(allRecordTypes, "groupOfRecordType");
            var recordTypeGroupIdList = putRecordTypeGroupIdsIntoList(sortedByGroup);
            sortParentsAndChildrenForEachGroupIdInList(sortedByGroup, recordTypeGroupIdList);
        }

        function sortListUsingNameInData(listToSort, nameInData) {
            var sorter = CORA.recordTypeSorter();
            return sorter.sortListUsingChildWithNameInData(listToSort, nameInData);
        }

        function putRecordTypeGroupIdsIntoList(sortedByGroup) {
            var recordTypeGroupIdList = [];
            Object.keys(sortedByGroup).forEach(function (id) {
                recordTypeGroupIdList.push(id);
            });
            return recordTypeGroupIdList;
        }

        function sortParentsAndChildrenForEachGroupIdInList(sortedByGroup, recordTypeGroupIdList) {
            recordTypeGroupIdList.forEach(function (groupId) {
                var groupSortedByAbstract = sortListUsingNameInData(sortedByGroup[groupId], "abstract");
                sortGroupOnParentChildren(groupSortedByAbstract, groupId);
            });
        }

        function sortGroupOnParentChildren(groupSortedByAbstract, groupId) {
            recordTypesByGroupId[groupId] = [];
            var splittedImplementing = splitImplementingTypes(groupSortedByAbstract);
            var parentList = groupSortedByAbstract["true"];
            possiblyAddParentsAndSortedChildren(parentList, splittedImplementing["children"], groupId);
            addOrphans(splittedImplementing["orphans"], groupId);
        }

        function splitImplementingTypes(groupSortedByAbstract) {
            var implementingTypes = groupSortedByAbstract["false"];
            return splitImplementingIntoChildrenOrOrphans(implementingTypes);
        }

        function splitImplementingIntoChildrenOrOrphans(allChildrenList) {
            var splittedImplementing = createHolderForChildrenAndOrphans();
            allChildrenList.forEach(function (child) {
                sortAsOrphanOrNotOrphan(child, splittedImplementing);
            });
            return splittedImplementing;
        }

        function createHolderForChildrenAndOrphans() {
            var splittedImplementing = {};
            splittedImplementing["children"] = [];
            splittedImplementing["orphans"] = [];
            return splittedImplementing;
        }

        function sortAsOrphanOrNotOrphan(child, splittedImplementing) {
            if (hasParent(child)) {
                splittedImplementing["children"].push(child);
            } else {
                splittedImplementing["orphans"].push(child);
            }
        }

        function hasParent(child) {
            var cChild = CORA.coraData(child.data);
            return cChild.containsChildWithNameInData("parentId");
        }

        function possiblyAddParentsAndSortedChildren(parentList, childrenList, groupId) {
            if (parentList !== undefined) {
                addParentsAndSortedChildren(parentList, childrenList, groupId);
            }
        }

        function addParentsAndSortedChildren(parentList, childrenList, groupId) {
            parentList.forEach(function (parent) {
                recordTypesByGroupId[groupId].push(parent);
                sortChildren(childrenList, parent, groupId);
            });
        }

        function addOrphans(orphans, groupId) {
            orphans.forEach(function (orphan) {
                recordTypesByGroupId[groupId].push(orphan);
            });
        }

        function sortChildren(childrenList, parent, groupId) {
            var parentId = getParentId(parent);
            childrenList.forEach(function (child) {
                addChildIfChildToParent(child, parentId, groupId);
            });
        }

        function getParentId(parent) {
            var cParent = CORA.coraData(parent.data);
            var cRecordInfo = CORA.coraData(cParent.getFirstChildByNameInData("recordInfo"));
            return cRecordInfo.getFirstAtomicValueByNameInData("id");
        }

        function addChildIfChildToParent(child, parentId, groupId) {
            var childsParentId = getParentIdFromChild(child);
            if (parentId === childsParentId) {
                recordTypesByGroupId[groupId].push(child);
            }
        }

        function getParentIdFromChild(child) {
            var cChild = CORA.coraData(child.data);
            var cChildsParentIdGroup = CORA.coraData(cChild.getFirstChildByNameInData("parentId"));
            return cChildsParentIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
        }

        function getAllRecordTypes() {
            return allRecordTypes;
        }

        function getMetadataByRecordTypeId(recordTypeId) {
            if (metadataByRecordTypeId[recordTypeId] !== undefined) {
                return metadataByRecordTypeId[recordTypeId];
            }
            throw new Error("Id(" + recordTypeId + ") not found in recordTypeProvider");
        }

        function getDependencies() {
            return dependencies;
        }

        function getSpec() {
            return spec;
        }

        function getRecordTypesByGroupId(groupId) {
            if (recordTypesByGroupId[groupId] === undefined) {
                return [];
            }
            return recordTypesByGroupId[groupId];
        }

        var out = Object.freeze({
            "type": "recordTypeProvider",
            getDependencies: getDependencies,
            getSpec: getSpec,
            getRecordTypeById: getRecordTypeById,
            getAllRecordTypes: getAllRecordTypes,
            processFetchedData: processFetchedData,
            getMetadataByRecordTypeId: getMetadataByRecordTypeId,
            getRecordTypesByGroupId: getRecordTypesByGroupId
        });
        start();
        return out;
    };
    return cora;
}(CORA));