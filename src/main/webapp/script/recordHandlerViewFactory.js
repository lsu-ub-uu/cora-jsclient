/*
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

import { holderFactory } from "./gui/holderFactory.js";
import { messageHolderFactory } from "./gui/messageHolderFactory.js";
import { recordHandlerView } from "./recordHandlerView.js";
import { workItemViewFactory } from "./gui/workItemViewFactory.js";

export const recordHandlerViewFactory = function() {

		var dependencies = {
			"workItemViewFactory" : workItemViewFactory(),
			"messageHolderFactory" : messageHolderFactory(),
			"holderFactory": holderFactory()
		};

		function factor(recordHandlerViewSpec) {
			return recordHandlerView(dependencies, recordHandlerViewSpec);
		}

		return Object.freeze({
			"type" : "recordHandlerViewFactory",
			factor : factor
		});
	};

