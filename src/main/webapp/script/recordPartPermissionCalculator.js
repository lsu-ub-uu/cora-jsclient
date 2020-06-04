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
		let fullfilledWriteRecordParts = [];
		let fullfilledReadRecordParts = [];
		let writePermissions = spec.permissions.write;
		let readPermissions = spec.permissions.read;

		const start = function() {
			if (hasRecordPartPermissions()) {
				calculateRecordPartPermissions();
			}
		};

		const calculateRecordPartPermissions = function() {
			let topLevelChildReferences = getChildReferences();
			topLevelChildReferences.children.forEach(function(childReference) {
				handleRecordPartPermissionsForChildReference(childReference);
			});
		};

		const handleRecordPartPermissionsForChildReference = function(childReference) {
			let cChildReference = CORA.coraData(childReference);
			let childId = getChildId(cChildReference);
			let nameInData = extractNameInData(childId);
			handleReadRecordPartPermissions(cChildReference, nameInData);
			handleWriteRecordPartPermissions(cChildReference, nameInData);
		};

		const getChildId = function(cChildReference) {
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const getChildReferences = function() {
			let metadataGroup = metadataProvider.getMetadataById(spec.metadataId);
			let cMetadataGroup = CORA.coraData(metadataGroup);
			return cMetadataGroup.getFirstChildByNameInData('childReferences');

		};

		const handleReadRecordPartPermissions = function(cChildReference, nameInData) {
			if (childHasReadWriteRecordPartConstraints(cChildReference)) {
				let childCombinedId = getChildCombinedId(cChildReference);
				possiblyAddFullfilledReadRecordParts(nameInData, childCombinedId);
			}
		}

		const childHasReadWriteRecordPartConstraints = function(cChildReference) {
			if (readPermissions.length > 0 && childHasRecordPartConstraints(cChildReference)) {
				return evaluateReadWriteConstraintExists(cChildReference);
			}
			return false;
		};

		const childHasRecordPartConstraints = function(cChildReference) {
			return cChildReference.containsChildWithNameInData("recordPartConstraint")
		};

		const evaluateReadWriteConstraintExists = function(cChildReference) {
			let constraint = cChildReference.getFirstAtomicValueByNameInData("recordPartConstraint");
			return constraint != undefined && "readWrite" === constraint;
		}

		const possiblyAddFullfilledReadRecordParts = function(nameInData, childCombinedId) {
			if (userHasReadWritePermissionsForRecordPartContraint(nameInData)) {
				fullfilledReadRecordParts.push(childCombinedId);
			}
		};

		const handleWriteRecordPartPermissions = function(cChildReference, nameInData) {
			if (childHasWriteRecordPartConstraints(cChildReference)) {
				let childCombinedId = getChildCombinedId(cChildReference);
				possiblyAddFullfilledWriteRecordParts(nameInData, childCombinedId);
			}
		};

		const childHasWriteRecordPartConstraints = function(cChildReference) {
			return writePermissions.length > 0 && childHasRecordPartConstraints(cChildReference);
		};

		const getChildCombinedId = function(cChildReference) {
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordType") + "_"
				+ cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const possiblyAddFullfilledWriteRecordParts = function(nameInData, childCombinedId) {
			if (userHasPermissionsForRecordPartContraint(nameInData)) {
				fullfilledWriteRecordParts.push(childCombinedId);
			}
		};

		const hasRecordPartPermissions = function() {
			return (permissionsDefined() && writePermissions.length > 0 || readPermissions.length > 0);
		};

		const permissionsDefined = function() {
			return spec.permissions != undefined;
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
			return fullfilledReadRecordParts.includes(recordType + "_" + recordId);
		};

		const hasFulfilledWritePermissionsForRecordPart = function(recordType, recordId) {
			return fullfilledWriteRecordParts.includes(recordType + "_" + recordId);
		};

		const getFulfilledWriteRecordParts = function() {
			return fullfilledWriteRecordParts;
		};

		const getFulfilledReadRecordParts = function() {
			return fullfilledReadRecordParts;
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