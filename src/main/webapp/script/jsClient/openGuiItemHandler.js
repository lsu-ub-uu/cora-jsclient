/*
 * Copyright 2016, 2017 Uppsala University Library
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
var CORA = (function(cora) {
	"use strict";
	cora.openGuiItemHandler = function(dependencies, spec) {

		var viewSpec = {
			"headerText" : dependencies.textProvider.getTranslation("theClient_openedText")
		};

		var view = dependencies.openGuiItemHandlerViewFactory.factor(viewSpec);

		function getView() {
			return view.getView();
		}

		function addManagedGuiItem(managedGuiItem) {
			view.addManagedGuiItem(managedGuiItem);
		}

		function getSpec() {
			return spec;
		}

		function getDependencies() {
			return dependencies;
		}

		return Object.freeze({
			"type" : "openGuiItemHandler",
			getSpec : getSpec,
			getDependencies : getDependencies,
			getView : getView,
			addManagedGuiItem : addManagedGuiItem
		});
	};
	return cora;
}(CORA));