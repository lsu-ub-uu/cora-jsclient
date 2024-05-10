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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.managedGuiItemViewSpy = function(dependencies, spec) {
		let addedChildren = [];
		let removedChildren = [];
		let movedChildren = [];
		let menuView = CORA.gui.createSpanWithClassName("managedGuiItemMenuViewSpyView");
		let workView = CORA.gui.createSpanWithClassName("managedGuiItemWorkViewSpyView");
		let listView = CORA.gui.createSpanWithClassName("managedGuiItemListViewSpyView");
		let addedMenuPresentations = [];
		let addedWorkPresentations = [];
		let addedListPresentations = [];
		let menuViewCleared = 0;
		let workViewCleared = 0;
		let hidden = 0;
		let shown = 0;
		let removed = 0;
		let state;
		let focusedClass = "focusOnId_notCalledYet";

		function getMenuView() {
			return menuView;
		}

		function getWorkView() {
			return workView;
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}

		function addMenuPresentation(presentationToAdd) {
			addedMenuPresentations.push(presentationToAdd);
		}
		function getAddedMenuPresentation(number) {
			return addedMenuPresentations[number];
		}
		function addWorkPresentation(presentationToAdd) {
			addedWorkPresentations.push(presentationToAdd);
		}
		function getAddedWorkPresentation(number) {
			return addedWorkPresentations[number];
		}
		function clearMenuView() {
			menuViewCleared++;
		}
		function getMenuViewCleared() {
			return menuViewCleared;
		}
		function clearWorkView() {
			workViewCleared++;
		}
		function getWorkViewCleared() {
			return workViewCleared;
		}
		function updateMenuView(stateIn) {
			state = stateIn;
		}
		function getState() {
			return state;
		}
		function hideWorkView() {
			hidden++;
		}
		function getHidden() {
			return hidden;
		}

		function showWorkView() {
			shown++
		}
		function getShown() {
			return shown;
		}
		function removeViews() {
			removed++;
		}
		function getRemoved() {
			return removed;
		}
		function getListView() {
			return listView;
		}
		function addListPresentation(presentationToAdd) {
			addedListPresentations.push(presentationToAdd);
		}
		function getAddedListPresentation(number) {
			return addedListPresentations[number];
		}
		
		function focusToClass(id){
			focusedClass = id;
		}
		function getFocusedClass(){
			return focusedClass;
		}
		
		let out = Object.freeze({
			"type" : "managedGuiItemViewSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getMenuView : getMenuView,
			getWorkView : getWorkView,
			addMenuPresentation : addMenuPresentation,
			getAddedMenuPresentation : getAddedMenuPresentation,
			addWorkPresentation : addWorkPresentation,
			getAddedWorkPresentation : getAddedWorkPresentation,
			updateMenuView : updateMenuView,
			getState : getState,
			clearMenuView : clearMenuView,
			getMenuViewCleared : getMenuViewCleared,
			clearWorkView : clearWorkView,
			getWorkViewCleared : getWorkViewCleared,
			hideWorkView : hideWorkView,
			getHidden : getHidden,
			showWorkView : showWorkView,
			getShown : getShown,
			removeViews : removeViews,
			getRemoved : getRemoved,
			getListView : getListView,
			addListPresentation : addListPresentation,
			getAddedListPresentation : getAddedListPresentation,
			
			focusToClass: focusToClass,
			getFocusedClass: getFocusedClass
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
