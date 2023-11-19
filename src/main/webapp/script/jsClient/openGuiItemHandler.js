/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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
		let view;
		let viewSpec = {
			headerText : dependencies.textProvider.getTranslation("theClient_openedText")
		};
		
		let managedGuiItemShowing = undefined;
		let managedGuiItemList = [];
		let managedGuiItemOrderedList = [];
		
		const start = function() {
			view = dependencies.openGuiItemHandlerViewFactory.factor(viewSpec);
		};
		
		const addManagedGuiItem = function(managedGuiItem) {
			managedGuiItemList.push(managedGuiItem);
			view.addManagedGuiItem(managedGuiItem.getMenuView());
		};

		const getShowingItem = function(){
			return managedGuiItemShowing;
		};

		const getItemList = function(){
			return managedGuiItemList;
		};
		
		const showView = function(managedGuiItem) {
			resetLastShowingMenuItem();
			showWorkView(managedGuiItem);
			managedGuiItemShowing = managedGuiItem;
		};

		const resetLastShowingMenuItem = function() {
			if (managedGuiItemShowing !== undefined) {
				managedGuiItemShowing.setActive(false);
				managedGuiItemShowing.hideWorkView();
				managedGuiItemShowing = undefined;
			}
		};

		const showWorkView = function(managedGuiItem) {
			managedGuiItem.showWorkView();
			managedGuiItem.setActive(true);

			removeManagedGuiItemFromOrderedList(managedGuiItem);
			managedGuiItemOrderedList.push(managedGuiItem);
		};

		const viewRemoved = function(managedGuiItem) {
			removeManagedGuiItemFromList(managedGuiItem);
			removeManagedGuiItemFromOrderedList(managedGuiItem);

			if(managedGuiItemShowing === managedGuiItem){
				let previous = managedGuiItemOrderedList.pop();
				if (previous) {
					showView(previous);
				}else {
					resetLastShowingMenuItem();
				} 
			}
			view.removeManagedGuiItem(managedGuiItem.getMenuView());
		};
		
		const removeManagedGuiItemFromList = function(managedGuiItem) {
			if (managedGuiItemList.indexOf(managedGuiItem) > -1) {
				managedGuiItemList.splice(managedGuiItemList.indexOf(managedGuiItem), 1);
			}
		};
		
		const removeManagedGuiItemFromOrderedList = function(managedGuiItem) {
			if (managedGuiItemOrderedList.indexOf(managedGuiItem) > -1) {
				managedGuiItemOrderedList.splice(managedGuiItemOrderedList.indexOf(managedGuiItem), 1);
			} 
		};
		
		const moveCurrentMenuViewUp = function(){
			if(managedGuiItemShowing){
				view.moveMenuViewUp(managedGuiItemShowing.getMenuView());
			}
		};
		
		const moveCurrentMenuViewDown = function(menuView){
			if(managedGuiItemShowing){
				view.moveMenuViewDown(managedGuiItemShowing.getMenuView());
			}
		};
		

		const getView = function() {
			return view.getView();
		};

		const getSpec = function() {
			return spec;
		};

		const getDependencies = function() {
			return dependencies;
		};

		let out = Object.freeze({
			type : "openGuiItemHandler",
			getSpec : getSpec,
			getDependencies : getDependencies,
			getView : getView,
			addManagedGuiItem : addManagedGuiItem,
			getShowingItem : getShowingItem,
			getItemList : getItemList,
			viewRemoved : viewRemoved,
			showView : showView,
			moveCurrentMenuViewUp : moveCurrentMenuViewUp,
			moveCurrentMenuViewDown : moveCurrentMenuViewDown
		});
		start();
		return out;
	};
	return cora;
}(CORA));