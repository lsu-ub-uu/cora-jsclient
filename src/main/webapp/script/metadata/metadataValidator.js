/*
 * Copyright 2015 Olov McKie
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
	cora.metadataValidator = function(dependencies, spec) {
		let topLevelMetadataId = spec.metadataId;
		let topLevelPath = [];
		let metadataProvider = dependencies.metadataProvider;
		let metadataChildValidatorFactory = dependencies.metadataChildValidatorFactory;
		let childrenResult = true;

		const validateFirstLevel = function() {
			let topLevelMetadataElement = getMetadataById(topLevelMetadataId);
			let topLevelChildReferences = topLevelMetadataElement
				.getFirstChildByNameInData('childReferences');
			return validateTopLevelChildren(topLevelChildReferences);
		};

		const validateTopLevelChildren = function(topLevelChildReferences) {
			childrenResult = true;
			topLevelChildReferences.children.forEach(function(childReference) {
				possiblyValidateDataChildrenToChildRef(childReference);
			});
			return childrenResult;
		};

		const possiblyValidateDataChildrenToChildRef = function(childReference) {
			if (shouldChildBeValidatedDependingOnRecordPartConstraintsAndUsersPermissions(childReference)) {
				validateDataChildForChildRefInvalid(childReference);
			}
		};

		const shouldChildBeValidatedDependingOnRecordPartConstraintsAndUsersPermissions = function(
			childReference) {
			let cChildReference = CORA.coraData(childReference);
			if (childHasRecordPartConstraints(cChildReference)) {
				return userHasRecordPartPermission(cChildReference);
			}
			return true;
		};

		const childHasRecordPartConstraints = function(cChildReference) {
			return cChildReference.containsChildWithNameInData("recordPartConstraint")
		};

		const userHasRecordPartPermission = function(cChildReference) {
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			return spec.recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart(cRef);
		};


		const validateDataChildForChildRefInvalid = function(childReference) {
			let childValidatorSpec = {
				path: topLevelPath,
				dataHolder: spec.dataHolder,
				childReference: childReference
			};
			let childValidator = metadataChildValidatorFactory.factor(childValidatorSpec);
			let childResult = childValidator.validate();
			if (!childResult.everythingOkBelow) {
				childrenResult = false;
			}
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

		return Object.freeze({
			type: "metadataValidator",
			getDependencies: getDependencies,
			getSpec: getSpec,
			validate: validateFirstLevel
		});
	};
	return cora;
}(CORA));