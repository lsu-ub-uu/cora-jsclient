/*
 * Copyright 2017 Olov McKie
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

export const reloadableSearchProvider = function(dependencies, spec) {

		var currentSearchProvider;
		var loadingSearchProvider;
		var callWhenSwitched;

		function start() {
			currentSearchProvider = dependencies.searchProviderFactory.factor(spec);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function getSearchById(id) {
			return currentSearchProvider.getSearchById(id);
		}

		function getAllSearches() {
			return currentSearchProvider.getAllSearches();
		}

		function getSearchesByGroupId(groupId) {
			return currentSearchProvider.getSearchesByGroupId(groupId);
		}

		function reload(callAfterSwitch) {
			callWhenSwitched = callAfterSwitch;
			var reloadingSpec = {
				searchRecordListLink : spec.searchRecordListLink,
				callWhenReady : switchProvider
			};
			loadingSearchProvider = dependencies.searchProviderFactory.factor(reloadingSpec);
		}

		function switchProvider() {
			currentSearchProvider = loadingSearchProvider;
			callWhenSwitched();
		}

		var out = Object.freeze({
			"type" : "reloadableSearchProvider",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getSearchById : getSearchById,
			getAllSearches : getAllSearches,
			getSearchesByGroupId : getSearchesByGroupId,
			reload : reload,
			switchProvider : switchProvider
		});
		start();
		return out;
	};

