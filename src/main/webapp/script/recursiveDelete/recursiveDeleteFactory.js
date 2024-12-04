/*
 * Copyright 2024 Uppsala University Library
 * Copyright 2023 Olov McKie
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
	cora.recursiveDeleteFactory = function(providers, dependencies) {

		const factor = function(spec) {
			let deleteViewDep = {
				textProvider: providers.textProvider,
				questionFactory: CORA.genericFactory("question", undefined),
			};
			
			let deleteView = CORA.recursiveDeleteView(deleteViewDep);

			let deleteDeleterDep = {
				ajaxCallFactory: dependencies.globalFactories.ajaxCallFactory,
				view: deleteView
			};
			let deleteDeleter = CORA.recursiveDeleteDeleter(deleteDeleterDep);


			let dep = {
				ajaxCallFactory: dependencies.globalFactories.ajaxCallFactory,
				view: deleteView,
				deleteDeleter: deleteDeleter
			};

			let recursiveDelete = CORA.recursiveDelete(providers, dep, spec);
			return recursiveDelete;
		}

		const onlyForTestGetProviders = function() {
			return providers;
		};

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		return Object.freeze({
			type: "recursiveDeleteFactory",
			onlyForTestGetProviders: onlyForTestGetProviders,
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			factor: factor
		});
	};
	return cora;
}(CORA));