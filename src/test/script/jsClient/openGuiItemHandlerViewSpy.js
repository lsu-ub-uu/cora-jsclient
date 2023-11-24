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
	coraTest.openGuiItemHandlerViewSpy = function(dependencies, spec) {
		let addedManagedGuiItem = [];
		let getViewCalled = 0;
		let view = CORA.gui.createSpanWithClassName("recordTypeFromRecordTypeHandlerSpy");
		let removedMenuViews = [];
		let upMenuViews = [];
		let downMenuViews = [];
		
		function getView() {
			getViewCalled++;
			return view;
		}
		function getGetViewCalled() {
			return getViewCalled;
		}
		function addManagedGuiItem(managedGuiItem) {
			addedManagedGuiItem.push(managedGuiItem);
		}

		function getAddedManagedGuiItem(number) {
			return addedManagedGuiItem[number];
		}
		
		function removeManagedGuiItem(menuView){
			removedMenuViews.push(menuView);
		}
		function getRemovedManagedGuiItem(number){
			return removedMenuViews[number];
		}
		const moveMenuViewUp = function(view){
			upMenuViews.push(view);
		};
		const getMoveMenuViewUp = function(number){
			return upMenuViews[number];
		};
		
		const moveMenuViewDown = function(menuView){
			return downMenuViews.push(menuView);
		};
		const getMoveMenuViewDown = function(number){
			return downMenuViews[number];
		};
		
		return Object.freeze({
			"type" : "openGuiItemHandlerViewSpy",
			getView : getView,
			getGetViewCalled : getGetViewCalled,
			addManagedGuiItem : addManagedGuiItem,
			getRemovedManagedGuiItem : getRemovedManagedGuiItem,
			removeManagedGuiItem : removeManagedGuiItem,
			getAddedManagedGuiItem : getAddedManagedGuiItem,
			getMoveMenuViewUp : getMoveMenuViewUp,
			moveMenuViewUp : moveMenuViewUp,
			getMoveMenuViewDown : getMoveMenuViewDown,
			moveMenuViewDown : moveMenuViewDown
		});
	};
	return coraTest;
}(CORATEST || {}));