/*
 * Copyright 2016 Olov McKie
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
	cora.workItemView = function(spec) {
		var out;
		var view;
		var topBar;
		var toolHolder;

		function start() {
			view = CORA.gui.createSpanWithClassName("workItem " + spec.extraClassName);
			topBar = createTopBarInView();
			toolHolder = createToolHolderAndAppendButtonToTopBar();
		}

		function createTopBarInView() {
			var topBarNew = CORA.gui.createSpanWithClassName("topBar");
			view.appendChild(topBarNew);

			return topBarNew;
		}

		function createToolHolderAndAppendButtonToTopBar() {
			var toolHolderNew = createToolHolderAndAppendToView();
			topBar.appendChild(toolHolderNew.getButton());
			return toolHolderNew;
		}

		function createToolHolderAndAppendToView() {
			var toolHolderNew = spec.holderFactory.factor({
				"className" : "tool",
				"appendTo" : view
			});
			return toolHolderNew;
		}

		function addToolViewToToolHolder(toolView) {
			toolHolder.getView().appendChild(toolView);
		}

		function getView() {
			return view;
		}

		function addViewToView(viewToAdd) {
			view.appendChild(viewToAdd);
		}

		function getSpec() {
			return spec;
		}

		out = Object.freeze({
			getView : getView,
			addToolViewToToolHolder : addToolViewToToolHolder,
			addViewToView : addViewToView,
			getSpec : getSpec
		});
		start();
		return out;
	};
	return cora;
}(CORA));