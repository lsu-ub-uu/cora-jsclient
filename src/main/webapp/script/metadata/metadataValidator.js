/*
 * Copyright 2015 Olov McKie
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
	cora.metadataValidator = function(spec) {
		let topLevelMetadataId = spec.metadataId;
		let topLevelData = spec.data;

		const validateFirstLevel = function() {
			let childrenResult = true;
			let topLevelMetadataElement = getMetadataById(topLevelMetadataId);
			let topLevelChildReferences = topLevelMetadataElement
				.getFirstChildByNameInData('childReferences');
			let topLevelPath = {};
			topLevelChildReferences.children.forEach(function(childReference) {
				let childResult = CORA.metadataChildValidator(childReference, topLevelPath,
					topLevelData, spec.metadataProvider, spec.pubSub);
				if (!childResult.everythingOkBelow) {
					childrenResult = false;
				}
			});
			return childrenResult;
		};

		const getMetadataById = function(id) {
			return CORA.coraData(spec.metadataProvider.getMetadataById(id));
		};

		const getSpec = function() {
			return spec;
		};

		let out = Object.freeze({
			"type": "metadataValidator",
			validate: validateFirstLevel,
			getSpec: getSpec
		});
		return out;
	};
	return cora;
}(CORA));