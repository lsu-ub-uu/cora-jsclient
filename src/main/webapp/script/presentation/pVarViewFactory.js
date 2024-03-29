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
	cora.pVarViewFactory = function() {
		const childDependencies = {
			infoFactory: CORA.infoFactory(),
		};
		
		const dependencies = {
			pParentVarViewFactory: CORA.genericParentFactory("pParentVarView", childDependencies)
		};
		
		function factor(spec) {
			if(spec.type === "pNumVar"){
				return CORA.pNumVarView(dependencies, spec);
			}
			if(spec.type === "pCollVar"){
				return CORA.pCollectionVarView(dependencies, spec);
			}
			if(spec.type === "pResourceLink"){
				return CORA.pResourceLinkView(dependencies, spec);
			}
			return CORA.pVarView(dependencies, spec);
		}

		return Object.freeze({
			type : "pVarViewFactory",
			factor : factor
		});
	};
	return cora;
}(CORA));