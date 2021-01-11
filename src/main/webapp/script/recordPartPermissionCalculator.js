/*
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
var CORA = (function(cora) {
	"use strict";
	cora.recordPartPermissionCalculator = function(dependencies, spec) {

		let metadataProvider = dependencies.metadataProvider;
		let fulfilledWriteRecordParts = [];
		let fulfilledReadRecordParts = [];
		let recordPartsHasReadConstraints = [];
		let recordPartsHasWriteConstraints = [];
		let readPermissions = spec.permissions.read;
		let writePermissions = spec.permissions.write;

		const start = function() {
			let topLevelChildReferences = getChildReferences(spec.metadataId);
			calculateRecordPartPermissions(topLevelChildReferences, false);
		};

		const getChildReferences = function(childId) {
			let metadataGroup = metadataProvider.getMetadataById(childId);
			let cMetadataGroup = CORA.coraData(metadataGroup);
			return cMetadataGroup.getFirstChildByNameInData('childReferences');

		};

		const calculateRecordPartPermissions = function(childReferences, unfulfilledWritePermissionInParentHierarchy) {
			childReferences.children.forEach(function(childReference) {
				handleRecordPartPermissionsForChildReference(childReference, unfulfilledWritePermissionInParentHierarchy);
			});
		};

		const handleRecordPartPermissionsForChildReference = function(childReference, unfulfilledWritePermissionInParentHierarchy) {
			let cChildReference = CORA.coraData(childReference);
			let childId = getLinkedRecordId(cChildReference);

			let unfulfilledWritePermissionInParentHierarchyChild = handleRecordPartPermissionsForCoraChildReference(cChildReference, childId, unfulfilledWritePermissionInParentHierarchy);
			possiblyRecurseForGroupChildren(cChildReference, childId, unfulfilledWritePermissionInParentHierarchyChild);
		};

		const getLinkedRecordId = function(cChildReference) {
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const handleRecordPartPermissionsForCoraChildReference = function(cChildReference, childId, unfulfilledWritePermissionInParentHierarchy) {
			let nameInData = extractNameInData(childId);
			handleReadRecordPartPermissions(cChildReference, nameInData);
			return handleWriteRecordPartPermissions(cChildReference, nameInData, unfulfilledWritePermissionInParentHierarchy);
		};

		const handleReadRecordPartPermissions = function(cChildReference, nameInData) {
			if (childHasReadWriteRecordPartConstraints(cChildReference)) {
				let combinedChildId = createCombinedChildId(cChildReference);
				recordPartsHasReadConstraints.push(combinedChildId);
				possiblyAddfulfilledReadRecordParts(nameInData, combinedChildId);
			}
		};

		const possiblyRecurseForGroupChildren = function(cChildReference, childId, unfulfilledWritePermissionInParentHierarchy) {
			if (permissionForChildShouldBeHandled(cChildReference)) {
				calculateRecordPartPermissions(getChildReferences(childId), unfulfilledWritePermissionInParentHierarchy);
			}
		};

		const permissionForChildShouldBeHandled = function(cChildReference) {
			return repeatMaxIsOne(cChildReference) && referencePointsToGroup(cChildReference);
		};

		const repeatMaxIsOne = function(cChildReference) {
			return cChildReference.getFirstChildByNameInData("repeatMax").value === "1";
		};

		const referencePointsToGroup = function(cChildReference) {
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordType") === "metadataGroup";
		};

		const childHasReadWriteRecordPartConstraints = function(cChildReference) {
			if (childHasRecordPartConstraints(cChildReference)) {
				return evaluateReadWriteConstraintExists(cChildReference);
			}
			return false;
		};

		const childHasRecordPartConstraints = function(cChildReference) {
			return cChildReference.containsChildWithNameInData("recordPartConstraint")
		};

		const evaluateReadWriteConstraintExists = function(cChildReference) {
			let constraint = cChildReference
				.getFirstAtomicValueByNameInData("recordPartConstraint");
			return constraint !== undefined && "readWrite" === constraint;
		}

		const possiblyAddfulfilledReadRecordParts = function(nameInData, combinedChildId) {
			if (userHasReadWritePermissionsForRecordPartContraint(nameInData)) {
				fulfilledReadRecordParts.push(combinedChildId);
			}
		};

		const handleWriteRecordPartPermissions = function(cChildReference, nameInData, unfulfilledWritePermissionInParentHierarchy) {
			let combinedChildId = createCombinedChildId(cChildReference);
			if (childHasWriteRecordPartConstraints(cChildReference)) {
				return handlePermissionsForChildWithWriteConstraint(combinedChildId, nameInData, unfulfilledWritePermissionInParentHierarchy);
			}
			if (unfulfilledWritePermissionInParentHierarchy) {
				recordPartsHasWriteConstraints.push(combinedChildId);
			}
			return unfulfilledWritePermissionInParentHierarchy;
		};
		
		const handlePermissionsForChildWithWriteConstraint = function(combinedChildId, nameInData, unfulfilledWritePermissionInParentHierarchy){
			recordPartsHasWriteConstraints.push(combinedChildId);
			if (unfulfilledWritePermissionInParentHierarchy) {
				return true;
			}
			possiblyAddfulfilledWriteRecordParts(nameInData, combinedChildId);
			return !fulfilledWriteRecordParts.includes(combinedChildId);
		};

		const childHasWriteRecordPartConstraints = function(cChildReference) {
			return childHasRecordPartConstraints(cChildReference);
		};

		const createCombinedChildId = function(cChildReference) {
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordType") + "_"
				+ cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const possiblyAddfulfilledWriteRecordParts = function(nameInData, combinedChildId) {
			if (userHasPermissionsForRecordPartContraint(nameInData)) {
				fulfilledWriteRecordParts.push(combinedChildId);
			}
		};

		const userHasPermissionsForRecordPartContraint = function(nameInData) {
			return writePermissions.includes(nameInData);
		};

		const userHasReadWritePermissionsForRecordPartContraint = function(nameInData) {
			return readPermissions.includes(nameInData);
		};

		const extractNameInData = function(linkedRecordId) {
			return getMetadataById(linkedRecordId).getFirstAtomicValueByNameInData("nameInData");
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const hasFulfilledReadPermissionsForRecordPart = function(recordType, recordId) {
			if (!recordPartsHasReadConstraints.includes(recordType + "_" + recordId)) {
				return true;
			}
			return fulfilledReadRecordParts.includes(recordType + "_" + recordId);
		};

		const hasFulfilledWritePermissionsForRecordPart = function(recordType, recordId) {
			if (!recordPartsHasWriteConstraints.includes(recordType + "_" + recordId)) {
				return true;
			}
			return fulfilledWriteRecordParts.includes(recordType + "_" + recordId);
		};

		const getFulfilledWriteRecordParts = function() {
			return fulfilledWriteRecordParts;
		};

		const getFulfilledReadRecordParts = function() {
			return fulfilledReadRecordParts;
		};

		start();

		return Object.freeze({
			type: "recordPartPermissionCalculator",
			getDependencies: getDependencies,
			getSpec: getSpec,
			hasFulfilledReadPermissionsForRecordPart: hasFulfilledReadPermissionsForRecordPart,
			hasFulfilledWritePermissionsForRecordPart: hasFulfilledWritePermissionsForRecordPart,
			getFulfilledWriteRecordParts: getFulfilledWriteRecordParts,
			getFulfilledReadRecordParts: getFulfilledReadRecordParts
		});
	};
	return cora;
}(CORA));