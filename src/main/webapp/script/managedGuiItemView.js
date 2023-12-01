/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017, 2023 Olov McKie
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

		let originalMenuViewClassName = "menuView";
		let menuView;
		let workView;
		let listView;
		
		const start = function() {
			menuView = createMenuView();
			workView = CORA.gui.createSpanWithClassName("workView");
			listView = CORA.gui.createSpanWithClassName("listView");
		};
		
		const createMenuView = function() {
			let newMenuView = CORA.gui.createSpanWithClassName(originalMenuViewClassName);
			newMenuView.onclick = spec.activateMethod;
			possiblyCreateRemoveButton(newMenuView);
			return newMenuView;
		};

		const possiblyCreateRemoveButton = function(addToView) {
			if (spec.removeMethod !== undefined) {
				createRemoveButton(addToView);
			}
		}
		const createRemoveButton = function(addToView) {
			let newButton = CORA.gui.createRemoveButton(spec.removeMethod);
			addToView.appendChild(newButton);
		};

		const getSpec = function() {
			return spec;
		};

		const getMenuView = function() {
			return menuView;
		};

		const getWorkView = function() {
			return workView;
		};

		const addMenuPresentation = function(presentationToAdd) {
			menuView.insertBefore(presentationToAdd, menuView.lastChild);
		};

		const addWorkPresentation = function(presentationToAdd) {
			workView.appendChild(presentationToAdd);
		};

		const updateMenuView = function(state) {
			let className = originalMenuViewClassName;
			if (state.changed) {
				className += " changed";
			}
			if (state.active) {
				className += " active";
			}
			if (state.indicatorClassName){
				className += " "+state.indicatorClassName;
			}
			menuView.className = className;
		};

		const clearMenuView = function() {
			let tempButton = menuView.lastChild;
			clearNodeChildren(menuView);
			menuView.appendChild(tempButton);
		};

		const clearNodeChildren = function(node) {
			while (node.lastChild) {
				node.removeChild(node.lastChild);
			}
		};

		const clearWorkView = function() {
			clearNodeChildren(workView);
		};

		const hideWorkView = function() {
			workView.style.display = "none";
		};

		const showWorkView = function() {
			workView.style.display = "";
		};

		const getListView = function() {
			return listView;
		};

		const addListPresentation = function(presentationToAdd) {
			listView.appendChild(presentationToAdd);
		};

		let out = Object.freeze({
			type : "managedGuiItemView",
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
			getListView : getListView,
			addListPresentation : addListPresentation
		});
		start();
		return out;
	};
	return cora;
}(CORA));