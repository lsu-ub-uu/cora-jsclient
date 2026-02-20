/*
 * Copyright 2017, 2023, 2024 Olov McKie
 * Copyright 2024 Uppsala University Library
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
	coraTest.managedGuiItemSpy = function(dependencies, spec) {
		let addedMenuPresentations = [];
		let addedWorkPresentations = [];
		let addedListPresentations = [];
		let menuView = CORA.createSpanWithClassName("menuViewSpy");
		let workView = CORA.createSpanWithClassName("menuViewSpy");
		let listView = CORA.createSpanWithClassName("listViewSpy");
		let changed = false;
		let active = false;
		let menuViewCleared = 0;
		let workViewCleared = 0;

		let workViewHidden = 0;
		let workViewShown = 0;
		let removed = 0;

		let reloadForMetadata = 0;

		let noOfChangedCalls = 0;
		let sendDataToServerCalls = 0;
		let sendDataToServerMethod;

		let reloadDataFromServerCalls = 0;
		let reloadDataFromServerMethod;
		
		let toggleNextIndicatorCalls = 0;
		let togglePreviousIndicatorCalls = 0;

		let setFocusCalledNoOfTimes = 0;
		
		function getDependencies() {
			return dependencies;
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
		function getListView() {
			return listView;
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

		function addListPresentation(presentationToAdd) {
			addedListPresentations.push(presentationToAdd);
		}
		function getAddedListPresentation(number) {
			return addedListPresentations[number];
		}

		function setChanged(changedIn) {
			noOfChangedCalls++;
			changed = changedIn;
		}
		function getChanged() {
			return changed;
		}
		function getNoOfChangedCalls() {
			return noOfChangedCalls;
		}
		function setActive(activeIn) {
			active = activeIn
		}
		function getActive() {
			return active;
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

		function hideWorkView() {
			workViewHidden++;
		}
		function getWorkViewHidden() {
			return workViewHidden;
		}
		function showWorkView() {
			workViewShown++;
		}
		function getWorkViewShown() {
			return workViewShown;
		}
		function remove() {
			removed++;
		}
		function getRemoved() {
			return removed;
		}

		function reloadForMetadataChanges() {
			reloadForMetadata++;
		}
		function getReloadForMetadataChanges() {
			return reloadForMetadata;
		}
		
		function sendDataToServer() {
			sendDataToServerCalls++;
		};
		const setSendDataToServer = function(method) {
			sendDataToServerMethod = method;
		};
		const getSendDataToServer = function() {
			return sendDataToServerMethod;
		};
		const getCallsToSendDataToServer = function() {
			return sendDataToServerCalls;
		};

		function reloadDataFromServer() {
			reloadDataFromServerCalls++;
		};
		const setReloadDataFromServer = function(method) {
			reloadDataFromServerMethod = method;
		};
		const getReloadDataFromServer = function() {
			return reloadDataFromServerMethod;
		};
		const getCallsToReloadDataFromServer = function() {
			return reloadDataFromServerCalls;
		};

		const toggleNextIndicator = function() {
			toggleNextIndicatorCalls++;
		};

		const getNoCallsToToggleNextIndicator = function(){
			return toggleNextIndicatorCalls;
		}

		const togglePreviousIndicator = function() {
			 togglePreviousIndicatorCalls++;
		};

		const getNoCallsToTogglePreviousIndicator = function(){
			return togglePreviousIndicatorCalls;
		};
		const setFocus = function(){
			setFocusCalledNoOfTimes++;
		};
		const getSetFocusCalledNoOfTimes = function(){
			return setFocusCalledNoOfTimes;
		};
		

		let out = Object.freeze({
			"type" : "managedGuiItemSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getMenuView : getMenuView,
			getWorkView : getWorkView,
			addMenuPresentation : addMenuPresentation,
			getAddedMenuPresentation : getAddedMenuPresentation,
			addWorkPresentation : addWorkPresentation,
			getAddedWorkPresentation : getAddedWorkPresentation,
			addListPresentation : addListPresentation,
			getAddedListPresentation : getAddedListPresentation,
			setChanged : setChanged,
			getChanged : getChanged,
			getNoOfChangedCalls : getNoOfChangedCalls,
			setActive : setActive,
			getActive : getActive,
			clearMenuView : clearMenuView,
			getMenuViewCleared : getMenuViewCleared,
			clearWorkView : clearWorkView,
			getWorkViewCleared : getWorkViewCleared,
			hideWorkView : hideWorkView,
			getWorkViewHidden : getWorkViewHidden,
			showWorkView : showWorkView,
			getWorkViewShown : getWorkViewShown,
			remove : remove,
			getRemoved : getRemoved,
			getListView : getListView,
			reloadForMetadataChanges : reloadForMetadataChanges,
			getReloadForMetadataChanges : getReloadForMetadataChanges,
			
			sendDataToServer : sendDataToServer,
			setSendDataToServer : setSendDataToServer,
			getSendDataToServer : getSendDataToServer,
			getCallsToSendDataToServer : getCallsToSendDataToServer,
			
			reloadDataFromServer : reloadDataFromServer,
			setReloadDataFromServer : setReloadDataFromServer,
			getReloadDataFromServer : getReloadDataFromServer,
			getCallsToReloadDataFromServer : getCallsToReloadDataFromServer,
			
			toggleNextIndicator : toggleNextIndicator,
			togglePreviousIndicator : togglePreviousIndicator,
			getNoCallsToToggleNextIndicator : getNoCallsToToggleNextIndicator,
			getNoCallsToTogglePreviousIndicator : getNoCallsToTogglePreviousIndicator,
			setFocus: setFocus,
			getSetFocusCalledNoOfTimes: getSetFocusCalledNoOfTimes
			
		});

		return out;
	};
	return coraTest;
}(CORATEST || {}));
;
