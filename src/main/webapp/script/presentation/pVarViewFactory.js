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

import { genericParentFactory } from "../genericParentFactory.js";
import { infoFactory } from "../gui/infoFactory.js";
import { pCollectionVarView } from "./pCollectionVarView.js";
import { pNumVarView } from "./pNumVarView.js";
import { pParentVarView } from "./pParentVarView.js";
import { pResourceLinkView } from "./pResourceLinkView.js";
import { pVarView } from "./pVarView.js";

export const pVarViewFactory = function() {
		const childDependencies = {
			infoFactory: infoFactory(),
		};
		
		const dependencies = {
			pParentVarViewFactory: genericParentFactory(pParentVarView, childDependencies)
		};
		
		function factor(spec) {
			if(spec.type === "pNumVar"){
				return pNumVarView(dependencies, spec);
			}
			if(spec.type === "pCollVar"){
				return pCollectionVarView(dependencies, spec);
			}
			if(spec.type === "pResourceLink"){
				return pResourceLinkView(dependencies, spec);
			}
			return pVarView(dependencies, spec);
		}

		return Object.freeze({
			type : "pVarViewFactory",
			factor : factor
		});
	};

