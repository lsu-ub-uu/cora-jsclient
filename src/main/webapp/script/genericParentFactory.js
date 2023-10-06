/*
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
	cora.genericParentFactory = function(typeToFactor, dependencies) {
		let out;

		const factor = function(spec, child) {
			if(undefined == dependencies){
				return CORA[typeToFactor](spec, child);
			}
			return CORA[typeToFactor](dependencies, spec, child);
		};

		const getTypeToFactor = function() {
			return typeToFactor;
		};

		const getDependencies = function() {
			return dependencies;
		};

		out = Object.freeze({
			type : "genericParentFactory",
			getTypeToFactor : getTypeToFactor,
			getDependencies : getDependencies,
			factor : factor
		});
		return out;
	};
	return cora;
}(CORA));