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

		//permissionsRead: id1, id2, id3
		//constraintsRead: id1, id5, id3, id4
		//FulfilledReadParts: id1, id3
		let fullfilledWriteRecordParts = [];
		let fullfilledReadRecordParts = [];
		let metadataProvider = dependencies.metadataProvider;
		let permissionsDefined = (spec.permissions != undefined);
		let writePermissions = spec.permissions.write;
		let readPermissions = spec.permissions.read;
		let flag = false;
		
		const start = function(){
		if (hasRecordPartPermissions()) {
			let metadataGroup = metadataProvider.getMetadataById(spec.metadataId);
			let cMetadataGroup = CORA.coraData(metadataGroup);
			let topLevelChildReferences = cMetadataGroup.getFirstChildByNameInData('childReferences');
			topLevelChildReferences.children.forEach(function(childReference) {
//				console.log(JSON.stringify(childReference));
				let cChildReference = CORA.coraData(childReference);
				if (childHasRecordPartConstraints(cChildReference)) {
					fullfilledWriteRecordParts.push("something");
				}
				//			//kolla om den har contstraints
				//			//kolla om det uppfylls - i så fall lägg till i listan
			});
		}
		//Spara permissions, 
		// Hämta constraints från post
		// Bygga upp FullfilledRecordparts.

		if (spec.permissions != undefined) {
			//			console.log(spec.permissions.read.length);
			if (spec.permissions.read.length > 0) {
				flag = true;
			}
		}
		
		}
		//		const possiblyValidateDataChildrenToChildRef = function(childReference) {
		//			if (shouldChildBeValidatedDependingOnRecordPartConstraintsAndUsersPermissions(childReference)) {
		//				validateDataChildForChildRefInvalid(childReference);
		//			}
		//		};
		//
		//		const shouldChildBeValidatedDependingOnRecordPartConstraintsAndUsersPermissions = function(childReference) {
		//			let cChildReference = CORA.coraData(childReference);
		//			if (childHasRecordPartConstraints(cChildReference)) {
		//				return userHasRecordPartPermission(cChildReference);
		//			}
		//			return true;
		//		};
		//
		const hasRecordPartPermissions = function(){
			return (permissionsDefined && writePermissions.length > 0 || readPermissions.length > 0);
		};
		
		const childHasRecordPartConstraints = function(cChildReference) {
			return cChildReference.containsChildWithNameInData("recordPartConstraint")
		};
		//
		//				const userHasRecordPartPermission = function(cChildReference) {
		//					let nameInData = extractNameInData(cChildReference);
		//					let writePermissions = spec.permissions.write;
		//					if (writePermissions.includes(nameInData)) {
		//						return true;
		//					}
		//					return false;
		//				};
		//				const extractNameInData = function(cChildReference) {
		//					let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
		//					let linkedRecordId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		//					return getMetadataById(linkedRecordId).getFirstAtomicValueByNameInData("nameInData");
		//				};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const getFulfillsReadForId = function() {
			//if (list.contains(id
			return flag;
		};

		const getFulfilledWriteRecordParts = function() {
			return fullfilledWriteRecordParts;
		}

		const getFulfilledReadRecordParts = function() {
			return fullfilledReadRecordParts;
		}
		
		start();
		return Object.freeze({
			type: "recordPartPermissionCalculator",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getFulfillsReadForId: getFulfillsReadForId,
			getFulfilledWriteRecordParts: getFulfilledWriteRecordParts,
			getFulfilledReadRecordParts: getFulfilledReadRecordParts
		});
	};
	return cora;
}(CORA));