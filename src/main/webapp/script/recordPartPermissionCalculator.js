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
		let visitedChildReferences = [];

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
			let nameInData = extractNameInData(childId);

			let fulfilledReadPermissionOnGroupParent = handleReadRecordPartPermissions(cChildReference, nameInData);
			let unfulfilledWritePermissionInParentHierarchyChild = handleWriteRecordPartPermissions(cChildReference, nameInData, unfulfilledWritePermissionInParentHierarchy);

			possiblyRecurseForGroupChildren(cChildReference, childId, unfulfilledWritePermissionInParentHierarchyChild, fulfilledReadPermissionOnGroupParent);
		};

		const getLinkedRecordId = function(cChildReference) {
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const handleReadRecordPartPermissions = function(cChildReference, nameInData) {

			if (childHasReadWriteRecordPartConstraints(cChildReference)) {
				let combinedChildId = createCombinedChildId(cChildReference);
				recordPartsHasReadConstraints.push(combinedChildId);
				possiblyAddfulfilledReadRecordParts(nameInData, combinedChildId);
				return fulfilledReadRecordParts.includes(combinedChildId);
			}
			return true;
		};

		const possiblyRecurseForGroupChildren = function(cChildReference, childId, unfulfilledWritePermissionInParentHierarchy, fulfilledReadPermissionOnGroupParent) {
			if (permissionForChildShouldBeHandled(cChildReference, fulfilledReadPermissionOnGroupParent)) {
				visitedChildReferences.push(createCombinedChildId(cChildReference));
				calculateRecordPartPermissions(getChildReferences(childId), unfulfilledWritePermissionInParentHierarchy);
			}
		};

		const permissionForChildShouldBeHandled = function(cChildReference, fulfilledReadPermissionOnGroupParent) {
			return repeatMaxIsOne(cChildReference) && referencePointsToGroup(cChildReference)
				&& fulfilledReadPermissionOnGroupParent && isTheFirstVisitToChildReference(cChildReference);
		};
		const isTheFirstVisitToChildReference = function(cChildReference) {
			let combinedId = createCombinedChildId(cChildReference);
			return !visitedChildReferences.includes(combinedId);
		}

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

		const handlePermissionsForChildWithWriteConstraint = function(combinedChildId, nameInData, unfulfilledWritePermissionInParentHierarchy) {
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

		const hasFulfilledReadPermissionsForRecordPart = function(cRef) {
			let recordType = cRef.getFirstAtomicValueByNameInData("linkedRecordType");
			let recordId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");

			if (!recordPartsHasReadConstraints.includes(recordType + "_" + recordId)) {
				return true;
			}
			return fulfilledReadRecordParts.includes(recordType + "_" + recordId);
		};

		const hasFulfilledWritePermissionsForRecordPart = function(cRef) {
			
			let recordType = cRef.getFirstAtomicValueByNameInData("linkedRecordType");
			let recordId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
			
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