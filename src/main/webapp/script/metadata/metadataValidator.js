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
		let topLevelData = spec.data;
		let metadataProvider = dependencies.metadataProvider;
		let pubSub = dependencies.pubSub;

		const validateFirstLevel = function() {
			let topLevelMetadataElement = getMetadataById(topLevelMetadataId);
			let topLevelChildReferences = topLevelMetadataElement
				.getFirstChildByNameInData('childReferences');
			let topLevelPath = {};
			return validateTopLevelChildren(topLevelPath, topLevelChildReferences);
		};

		const validateTopLevelChildren = function(topLevelPath, topLevelChildReferences) {
			let childrenResult = true;
			topLevelChildReferences.children.forEach(function(childReference) {
				//kolla om childreference har constraints
				//om inte - fortsätt som vanligt
				// om den har constraints - kolla om användaren har rättigheter
				//om anv har rättigheter fortsätt som vanligt
				//annars return true??
				//				let childResult = CORA.metadataChildValidator(childReference, topLevelPath,
				//					topLevelData, metadataProvider, pubSub);
				//				if (!childResult.everythingOkBelow) {
				//					childrenResult = false;
				//				}
			});
			return childrenResult;

		}

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		let out = Object.freeze({
			type: "metadataValidator",
			getDependencies: getDependencies,
			getSpec: getSpec,
			validate: validateFirstLevel
		});
		return out;
	};
	return cora;
}(CORA));