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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.workItemViewSpy = function(spec) {
		var addedViews = [];
		var addedToolViews = [];
		var showDataF = null;
		var spyView = document.createElement("span");
		function getView() {
			return spyView;
		}
		function addToolViewToToolHolder(viewToAdd) {
			addedToolViews.push(viewToAdd);
		}
		function addViewToView(viewToAdd) {
			addedViews.push(viewToAdd);
		}

		function setShowDataFunction(showDataFunction) {
			showDataF = showDataFunction;
		}

		function getSpec() {
			return spec;
		}

		function getViewsAddedToView(number) {
			return addedViews[number];
		}
		function getToolViewsAddedToView() {
			return addedToolViews;
		}

		function getShowDataFunction() {
			return showDataF;
		}

		function getSpyView() {
			return spyView;
		}

		var out = Object.freeze({
			getView : getView,
			addToolViewToToolHolder : addToolViewToToolHolder,
			addViewToView : addViewToView,

			getSpec : getSpec,
			getViewsAddedToView : getViewsAddedToView,
			getToolViewsAddedToView : getToolViewsAddedToView,
			getShowDataFunction : getShowDataFunction,
			getSpyView : getSpyView
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
