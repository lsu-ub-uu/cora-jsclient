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
import { pGroupView } from "./pGroupView.js";
import { pParentMultipleChildrenView } from "./pParentMultipleChildrenView.js";
import { pSurroundingContainerView } from "./pSurroundingContainerView.js";

export const pMultipleChildrenViewFactory = function() {
		const childDependencies = {
			infoFactory: infoFactory(),
		};
		
		const dependencies = {
			pParentMultipleChildrenViewFactory: genericParentFactory(pParentMultipleChildrenView,
				childDependencies)
		};
		
		function factor(spec) {
			if(spec.type === "container"){
				return pSurroundingContainerView(dependencies, spec);
			}
			
			return pGroupView(dependencies, spec);
		}

		const self = Object.freeze({
			type : "pMultipleChildrenViewFactory",
			factor : factor
		});
		return self;
	};

