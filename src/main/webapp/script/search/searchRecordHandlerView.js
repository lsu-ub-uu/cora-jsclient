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
	cora.searchRecordHandlerView = function(dependencies, spec) {
		var out;
		var view;
		var header;
		var childrenView;

		function start() {
			view = CORA.createSpanWithClassName("searchRecord");

			header = createHeader();
			view.appendChild(header);

			childrenView = CORA.createSpanWithClassName("childrenView");
			view.appendChild(childrenView);
		}

		function createHeader() {
			var headerNew = CORA.createSpanWithClassName("header clickable");
			headerNew.onclick = spec.openSearchMethod;
			headerNew.textContent = spec.headerText;
			return headerNew;
		}

		function getView() {
			return view;
		}

		function addManagedGuiItem(managedGuiItem) {
			childrenView.appendChild(managedGuiItem.getMenuView());
		}

		function removeManagedGuiItem(managedGuiItem) {
			childrenView.removeChild(managedGuiItem.getMenuView());
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		out = Object.freeze({
			type : "searchRecordHandlerView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addManagedGuiItem : addManagedGuiItem,
			removeManagedGuiItem : removeManagedGuiItem
		});
		start();
		return out;
	};
	return cora;
}(CORA));