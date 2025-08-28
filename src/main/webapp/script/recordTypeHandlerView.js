/*
 * Copyright 2016, 2017 Uppsala University Library
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
	cora.recordTypeHandlerView = function(dependencies, spec) {
		var out;
		var view;
		var header;
		var buttonView;

		function start() {
			view = CORA.createSpanWithClassName("recordType");

			header = createHeader();
			view.appendChild(header);

			buttonView = CORA.createSpanWithClassName("buttonView");
			view.appendChild(buttonView);
			possiblyCreateCreateButton();
		}

		function createHeader() {
			var headerNew = CORA.createSpanWithClassName("header");
			if (specHasFetchListMethod()) {
				headerNew.className = headerNew.className + " clickable";
				headerNew.onclick = spec.fetchListMethod;
			}
			headerNew.textContent = spec.headerText;
			return headerNew;
		}

		function specHasFetchListMethod() {
			return spec.fetchListMethod !== undefined;
		}

		function possiblyCreateCreateButton() {
			if (spec.createNewMethod !== undefined) {
				buttonView.appendChild(createCreateButton());
			}
		}

		function createCreateButton() {
			var buttonSpec = {
				"className" : "iconButton createButton",
				action : {
					method : function() {
						spec.createNewMethod("true");
					}
				}
			};
			return CORA.button(buttonSpec);
		}

		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		out = Object.freeze({
			"type" : "recordTypeHandlerView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView
		});
		start();
		return out;
	};
	return cora;
}(CORA));