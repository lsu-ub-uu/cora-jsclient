/*
 * Copyright 2019 Uppsala University Library
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

import { passwordLoginView } from "./passwordLoginView.js";
import { workItemViewFactory } from "../gui/workItemViewFactory.js";

export const passwordLoginViewFactory = function(dependencies) {

		let dep = {
			textProvider : dependencies.textProvider,
			workItemViewFactory : workItemViewFactory(),
		};

		const factor = function(spec) {
			return passwordLoginView(dep, spec);
		};

		const getDependencies = function() {
			return dependencies;
		};

		return Object.freeze({
			type : "passwordLoginViewFactory",
			getDependencies : getDependencies,
			factor : factor
		});
	};

