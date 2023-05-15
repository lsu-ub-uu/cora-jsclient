/*
 * Copyright 2017, 2023 Olov McKie
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
	cora.reloadableMetadataProvider = function(dependencies, spec) {

		var currentMetadataProvider;
		var loadingMetadataProvider;
		var callWhenSwitched;

		function start() {
			currentMetadataProvider = dependencies.metadataProviderFactory.factor(spec);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function getMetadataById(id) {
			return currentMetadataProvider.getMetadataById(id);
		}

		const getMetadataRecordById = function(id) {
			return currentMetadataProvider.getMetadataRecordById(id);
		};

		function reload(callAfterSwitch) {
			callWhenSwitched = callAfterSwitch;
			var reloadingSpec = {
				metadataListLink : spec.metadataListLink,
				presentationListLink : spec.presentationListLink,
				textListLink : spec.textListLink,
				guiElementListLink : spec.guiElementListLink,
				callWhenReady : switchProvider
			};
			loadingMetadataProvider = dependencies.metadataProviderFactory.factor(reloadingSpec);
		}

		function switchProvider() {
			currentMetadataProvider = loadingMetadataProvider;
			callWhenSwitched();
		}

		var out = Object.freeze({
			"type" : "reloadableMetadataProvider",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getMetadataById : getMetadataById,
			getMetadataRecordById: getMetadataRecordById,
			reload : reload,
			switchProvider : switchProvider
		});
		start();
		return out;
	};
	return cora;
}(CORA));