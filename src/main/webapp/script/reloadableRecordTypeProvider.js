/*
 * Copyright 2017 Olov McKie
 * Copyright 2018 Uppsala University Library
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
	cora.reloadableRecordTypeProvider = function(dependencies, spec) {

		var currentRecordTypeProvider;
		var loadingRecordTypeProvider;
		var callWhenSwitched;

		function start() {
			currentRecordTypeProvider = dependencies.recordTypeProviderFactory.factor(spec);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function getRecordTypeById(id) {
			return currentRecordTypeProvider.getRecordTypeById(id);
		}

		function getAllRecordTypes() {
			return currentRecordTypeProvider.getAllRecordTypes();
		}

		function getMetadataByRecordTypeId(id) {
			return currentRecordTypeProvider.getMetadataByRecordTypeId(id);
		}

		function getRecordTypesByGroupId(id) {
			return currentRecordTypeProvider.getRecordTypesByGroupId(id);
		}

		function reload(callAfterSwitch) {
			callWhenSwitched = callAfterSwitch;
			var reloadingSpec = {
				recordTypeListLink : spec.recordTypeListLink,
				validationTypeListLink : spec.validationTypeListLink,
				callWhenReady : switchProvider
			};
			loadingRecordTypeProvider = dependencies.recordTypeProviderFactory
					.factor(reloadingSpec);
		}

		function switchProvider() {
			currentRecordTypeProvider = loadingRecordTypeProvider;
			callWhenSwitched();
		}

		var out = Object.freeze({
			"type" : "reloadableRecordTypeProvider",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getRecordTypeById : getRecordTypeById,
			getAllRecordTypes : getAllRecordTypes,
			getMetadataByRecordTypeId : getMetadataByRecordTypeId,
			reload : reload,
			switchProvider : switchProvider,
			getRecordTypesByGroupId : getRecordTypesByGroupId
		});
		start();
		return out;
	};
	return cora;
}(CORA));