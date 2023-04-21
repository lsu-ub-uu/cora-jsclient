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
	cora.reloadableTextProvider = function(dependencies, spec) {

		var currentTextProvider;
		var loadingTextProvider;
		var callWhenSwitched;

		function start() {
			currentTextProvider = dependencies.textProviderFactory.factor(spec);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function getTranslation(id) {
			return currentTextProvider.getTranslation(id);
		}

		function reload(callAfterSwitch) {
			callWhenSwitched = callAfterSwitch;
			var reloadingSpec = {
				textListLink : spec.textListLink,
				callWhenReady : switchProvider
			};
			loadingTextProvider = dependencies.textProviderFactory.factor(reloadingSpec);
		}

		function switchProvider() {
			loadingTextProvider.setCurrentLang(currentTextProvider.getCurrentLang());
			currentTextProvider = loadingTextProvider;
			callWhenSwitched();
		}

		function setCurrentLang(lang) {
			currentTextProvider.setCurrentLang(lang);
		}

		function getMetadataById(metadataId) {
			return currentTextProvider.getMetadataById(metadataId);
		}
		
		const getAllTranslations = function(textId){
			return currentTextProvider.getAllTranslations(textId);
		};

		var out = Object.freeze({
			"type" : "reloadableTextProvider",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getTranslation : getTranslation,
			reload : reload,
			switchProvider : switchProvider,
			setCurrentLang : setCurrentLang,
			getMetadataById : getMetadataById,
			getAllTranslations : getAllTranslations
		});
		start();
		return out;
	};
	return cora;
}(CORA));