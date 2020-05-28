/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
	cora.managedGuiItemView = function(spec) {

		var originalMenuViewClassName = "menuView";
		var menuView = createMenuView();
		var workView = CORA.gui.createSpanWithClassName("workView");
		var listView = CORA.gui.createSpanWithClassName("listView");

		function createMenuView() {
			var newMenuView = CORA.gui.createSpanWithClassName(originalMenuViewClassName);
			newMenuView.onclick = spec.activateMethod;
			possiblyCreateRemoveButton(newMenuView);
			return newMenuView;
		}

		function possiblyCreateRemoveButton(addToView) {
			if (spec.removeMethod !== undefined) {
				createRemoveButton(addToView);
			}
		}
		function createRemoveButton(addToView) {
			var newButton = CORA.gui.createRemoveButton(spec.removeMethod);
			addToView.appendChild(newButton);
		}

		function getSpec() {
			return spec;
		}

		function getMenuView() {
			return menuView;
		}

		function getWorkView() {
			return workView;
		}

		function addMenuPresentation(presentationToAdd) {
			menuView.insertBefore(presentationToAdd, menuView.lastChild);
		}

		function addWorkPresentation(presentationToAdd) {
			workView.appendChild(presentationToAdd);
		}

		function updateMenuView(state) {
			var className = originalMenuViewClassName;
			if (state.changed) {
				className += " changed";
			}
			if (state.active) {
				className += " active";
			}
			menuView.className = className;
		}

		function clearMenuView() {
			var tempButton = menuView.lastChild;
			clearNodeChildren(menuView);
			menuView.appendChild(tempButton);
		}

		function clearNodeChildren(node) {
			while (node.lastChild) {
				node.removeChild(node.lastChild);
			}
		}

		function clearWorkView() {
			clearNodeChildren(workView);
		}

		function hideWorkView() {
			workView.style.display = "none";
		}

		function showWorkView() {
			workView.style.display = "";
		}

		function removeViews() {
			if (menuView.parentNode) {
				menuView.parentNode.removeChild(menuView);
			}
			if (workView.parentNode) {
				workView.parentNode.removeChild(workView);
			}
		}

		function getListView() {
			return listView;
		}

		function addListPresentation(presentationToAdd) {
			listView.appendChild(presentationToAdd);
		}

		return Object.freeze({
			"type" : "managedGuiItemView",
			getSpec : getSpec,
			getMenuView : getMenuView,
			getWorkView : getWorkView,
			addMenuPresentation : addMenuPresentation,
			addWorkPresentation : addWorkPresentation,
			updateMenuView : updateMenuView,
			clearMenuView : clearMenuView,
			clearWorkView : clearWorkView,
			hideWorkView : hideWorkView,
			showWorkView : showWorkView,
			removeViews : removeViews,
			getListView : getListView,
			addListPresentation : addListPresentation
		});
	};
	return cora;
}(CORA));