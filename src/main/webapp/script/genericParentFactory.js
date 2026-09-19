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
import coraNamespace from "./aCoraNameSpace.js";

const resolveTypeToFactor = function(typeToFactor) {
	if (typeof typeToFactor === "function") {
		return typeToFactor;
	}
	const resolvedTypeToFactor = coraNamespace[typeToFactor];
	if (resolvedTypeToFactor === undefined) {
		throw new Error("Could not resolve parent factory from CORA namespace: " + typeToFactor);
	}
	return resolvedTypeToFactor;
};

export const genericParentFactory = function(typeToFactor, dependencies) {
	let out;
	const resolvedTypeToFactor = resolveTypeToFactor(typeToFactor);

	const factor = function(spec, child) {
		if(undefined == dependencies){
			return resolvedTypeToFactor(spec, child);
		}
		return resolvedTypeToFactor(dependencies, spec, child);
	};

	const getTypeToFactor = function() {
		return resolvedTypeToFactor.name || typeToFactor;
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
