/*
 * Copyright 2017 Uppsala University Library
 * Copyright 2023 Olov McKie
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
	coraTest.openGuiItemHandlerSpy = function(dependencies, spec) {
		let addedManagedGuiItem = [];
		let getViewCalled = 0;
		let view = CORA.gui.createSpanWithClassName("openGuiItemHandlerSpy");
		
		let viewRemovedList = [];
		let showViewList = [];
		let callsToItemList = 0;
		let getItemListList = [];

		function getView() {
			getViewCalled++;
			return view;
		}

		function addManagedGuiItem(managedGuiItem) {
			addedManagedGuiItem.push(managedGuiItem);
			return managedGuiItem;
		}

		function getAddedManagedGuiItem(number) {
			return addedManagedGuiItem[number];
		}

		function getShowingItem() {
//			return addedManagedGuiItem;
		}
		function getItemList() {
			callsToItemList++;
			return getItemListList;
		}
		function setGetItemList(list) {
			return getItemListList = list;
		}
		function getItemListCalled() {
			return callsToItemList;
		}

		function viewRemoved(item) {
			return viewRemovedList.push(item);
		}
		function getViewRemovedList(number) {
			return viewRemovedList[number];
		}

		function showView(item) {
			return showViewList.push(item);
		}
		function getShowViewList(number) {
			return showViewList[number];
		}

		return Object.freeze({
			type : "openGuiItemHandlerSpy",
			getView : getView,
			addManagedGuiItem : addManagedGuiItem,
			getAddedManagedGuiItem : getAddedManagedGuiItem,
			
			getShowingItem : getShowingItem,
			getItemList : getItemList,
			setGetItemList : setGetItemList,
			getItemListCalled: getItemListCalled,
			viewRemoved : viewRemoved,
			getViewRemovedList: getViewRemovedList,
			showView : showView,
			getShowViewList: getShowViewList
		});
	};
	return coraTest;
}(CORATEST || {}));