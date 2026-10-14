/*
 * Copyright 2017 Uppsala University Library
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

import { openGuiItemHandlerView } from "./openGuiItemHandlerView.js";

export const openGuiItemHandlerViewFactory = function(dependencies) {

		function getDependencies() {
			return dependencies;
		}

		function factor(spec) {
			var openGuiItemHandlerViewDependencies = {};
			return openGuiItemHandlerView(openGuiItemHandlerViewDependencies, spec);
		}

		return Object.freeze({
			"type" : "openGuiItemHandlerViewFactory",
			getDependencies : getDependencies,
			factor : factor
		});
	};

