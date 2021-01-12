/*
 * Copyright 2017 Uppsala University Library
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

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.metadataProviderSpyForPermissionCalculator = function() {

		var fetchedMetadataIds = [];
		var fetchedMetadata = [];
		var callWhenReloadedMethod;
		var noOfReloads = 0;
		let childReferences = new Map();

		function getMetadataById(metadataId) {
			fetchedMetadataIds.push(metadataId);

			let metadata;

			if (metadataId.startsWith("textId")) {
				metadata = coraTest.createJsonAtomicTextVariable(metadataId);
			}
			else {
				metadata = coraTest.createJsonGroup(childReferences.get(metadataId), metadataId);
			}

			fetchedMetadata.push(metadata);
			return metadata;
		}

		function getFetchedMetadataId(no) {
			return fetchedMetadataIds[no];
		}
		function getFetchedMetadata(no) {
			return fetchedMetadata[no];
		}
		function getNumberOfCallsToGetMetadataById() {
			return fetchedMetadataIds.length
		}
		function reload(callWhenReloadedMethodIn) {
			noOfReloads++;
			callWhenReloadedMethod = callWhenReloadedMethodIn;
		}
		function getCallWhenReloadedMethod() {
			return callWhenReloadedMethod;
		}
		function getNoOfReloads() {
			return noOfReloads;
		}
		function setChildReferences(childReferenceKey, childReferenceValue) {
			childReferences.set(childReferenceKey, childReferenceValue);
		}
		return Object.freeze({
			getMetadataById: getMetadataById,
			getFetchedMetadataId: getFetchedMetadataId,
			getFetchedMetadata: getFetchedMetadata,
			reload: reload,
			getCallWhenReloadedMethod: getCallWhenReloadedMethod,
			getNoOfReloads: getNoOfReloads,
			callWhenReloadedMethod: callWhenReloadedMethod,
			setChildReferences: setChildReferences,
			getNumberOfCallsToGetMetadataById: getNumberOfCallsToGetMetadataById
		});
	};
	return coraTest;
}(CORATEST || {}));