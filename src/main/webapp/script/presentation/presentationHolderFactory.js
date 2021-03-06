/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
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
	cora.presentationHolderFactory = function(dependencies) {

		const factor = function(spec) {
			let presentationHolderDependencies = {
					metadataProvider: dependencies.metadataProvider,
					presentationFactory: dependencies.presentationFactory,
					pubSub: dependencies.pubSub,
					//not sure these are used
					textProvider : dependencies.textProvider,
					jsBookkeeper : dependencies.jsBookkeeper
			};
			return CORA.presentationHolder(presentationHolderDependencies, spec);
		};

		const getDependencies = function() {
			return dependencies;
		};

		return Object.freeze({
			"type" : "presentationHolderFactory",
			getDependencies : getDependencies,
			factor : factor
		});
	};
	return cora;
}(CORA));