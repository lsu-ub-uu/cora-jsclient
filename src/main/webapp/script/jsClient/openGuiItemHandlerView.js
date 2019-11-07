/*
 * Copyright 2016, 2017, 2019 Uppsala University Library
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
	cora.openGuiItemHandlerView = function(dependencies, spec) {
		var out;
		var view;
		var header;
		var childrenView;
		spec.viewClassName="openGuiItemHandlerView";
		spec.headerClassName="header";
        var handlerView = cora.gui.handlerView(dependencies, spec);


		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		out = Object.freeze({
			type : "openGuiItemHandlerView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : handlerView.getView,
			addManagedGuiItem : handlerView.addManagedGuiItem,
			removeManagedGuiItem : handlerView.removeManagedGuiItem
		});

		return out;
	};
	return cora;
}(CORA));