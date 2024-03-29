/*
 * Copyright 2016, 2017, 2018 Uppsala University Library
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
	cora.managedGuiItem = function(dependencies, spec) {
		let out;
		let active = false;
		let changed = false;
		let viewSpec;
		let view;
		let sendDataToServerMethod;
		let currentIndicatorNo = 0;
		const maxNumberIndicators = 9;
		
		const start = function() {
			viewSpec = {
				activateMethod : activate
			};
			if (spec.disableRemove !== "true") {
				viewSpec.removeMethod = remove;
			}
			view = dependencies.managedGuiItemViewFactory.factor(viewSpec);
		};
		
		const activate = function() {
			spec.activateMethod(out);
		};

		const remove = function() {
			spec.removeMethod(out);
		};

		const getMenuView = function() {
			return view.getMenuView();
		};

		const getWorkView = function() {
			return view.getWorkView();
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const addMenuPresentation = function(presentationToAdd) {
			view.addMenuPresentation(presentationToAdd);
		};

		const addWorkPresentation = function(presentationToAdd) {
			view.addWorkPresentation(presentationToAdd);
		};

		const setChanged = function(changedIn) {
			changed = changedIn;
			updateViewState();
		};

		const updateViewState = function() {
			let state = {
				active : active,
				changed : changed,
			};
			if(currentIndicatorNo>0){
				state.indicatorClassName = "indicatorClassName" + currentIndicatorNo;
			}
			view.updateMenuView(state);
		};
		
		const setActive = function(activeIn) {
			active = activeIn;
			updateViewState();
		};
		
		const toggleNextIndicator = function() {
			currentIndicatorNo = (currentIndicatorNo+1) % maxNumberIndicators;
			updateViewState();
		};
		
		const togglePreviousIndicator = function() {
			currentIndicatorNo = (currentIndicatorNo - 1 + maxNumberIndicators) % maxNumberIndicators;
			updateViewState();
		};

		const clearMenuView = function() {
			view.clearMenuView();
		};

		const clearWorkView = function() {
			view.clearWorkView();
		};

		const hideWorkView = function() {
			view.hideWorkView();
		};

		const showWorkView = function() {
			view.showWorkView();
			if (spec.callMethodAfterShowWorkView !== undefined) {
				spec.callMethodAfterShowWorkView();
			}
		};

		const getListView = function() {
			return view.getListView();
		};

		const addListPresentation = function(presentationToAdd) {
			view.addListPresentation(presentationToAdd);
		};

		const reloadForMetadataChanges = function() {
			if (spec.callOnMetadataReloadMethod !== undefined) {
				spec.callOnMetadataReloadMethod();
			}
		};
		
		const setSendDataToServer = function(method) {
			sendDataToServerMethod = method;
		};
		
		const sendDataToServer = function() {
			if (sendDataToServerMethod !== undefined) {
				sendDataToServerMethod();
			}
		};

		out = Object.freeze({
			type : "managedGuiItem",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getMenuView : getMenuView,
			getWorkView : getWorkView,
			remove : remove,
			addMenuPresentation : addMenuPresentation,
			addWorkPresentation : addWorkPresentation,
			setChanged : setChanged,
			setActive : setActive,
			toggleNextIndicator : toggleNextIndicator,
			togglePreviousIndicator : togglePreviousIndicator,
			clearMenuView : clearMenuView,
			clearWorkView : clearWorkView,
			hideWorkView : hideWorkView,
			showWorkView : showWorkView,
			getListView : getListView,
			addListPresentation : addListPresentation,
			reloadForMetadataChanges : reloadForMetadataChanges,
			setSendDataToServer : setSendDataToServer,
			sendDataToServer : sendDataToServer
		});
		start();
		return out;
	};

	return cora;
}(CORA));