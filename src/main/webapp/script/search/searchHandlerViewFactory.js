/*
 * Copyright 2017 Uppsala University Library
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

import { busy } from "../gui/busy.js";
import { genericFactory } from "../genericFactory.js";
import { messageHolderFactory } from "../gui/messageHolderFactory.js";
import { searchHandlerView } from "./searchHandlerView.js";
import { workItemViewFactory } from "../gui/workItemViewFactory.js";

export const searchHandlerViewFactory = function(dependencies) {

		var dep = {
			"textProvider" : dependencies.textProvider,
			"workItemViewFactory" : workItemViewFactory(),
			"messageHolderFactory" : messageHolderFactory(),
			busyFactory : genericFactory(busy)
		};

		function factor(spec) {
			return searchHandlerView(dep, spec);
		}

		function getDependencies() {
			return dependencies;
		}

		return Object.freeze({
			"type" : "searchHandlerViewFactory",
			getDependencies : getDependencies,
			factor : factor
		});
	};

