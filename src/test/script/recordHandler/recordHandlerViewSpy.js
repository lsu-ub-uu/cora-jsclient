/*
 * Copyright 2016, 2023 Olov McKie
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
	coraTest.recordHandlerViewSpy = function(spec) {
		let addedEditViews = [];
		let addedShowViews = [];
		let addedButtons = [];
		let clearViewsWasCalled = false;
		let clearDataViewsWasCalled = false;
		let showDataFunction = null;
		let copyAsNewFunction = null;
		let objectsAddedToEditView = [];

		let showShowIncomingLinks = false;
		let showIndexButton = false;
		let objectsAddedToIncomingLinksView = [];
		
		let functionsAddedAsReloadRecord = [];
		
		let functionsAddedAsOpenDefinitionViewer = [];

		let spyView = document.createElement("span");
		function getView() {
			return spyView;
		}
		function addToEditView(viewToAdd) {
			addedEditViews.push(viewToAdd);
		}
		function addToShowView(viewToAdd) {
			addedShowViews.push(viewToAdd);
		}
		function addButton(text, onclickMethod, className) {
			let buttonSpec = {
				"text" : text,
				"onclickMethod" : onclickMethod,
				"className" : className
			}
			addedButtons.push(buttonSpec);
		}
		function clearViews() {
			clearViewsWasCalled = true;
		}
		function getClearViewsWasCalled() {
			return clearViewsWasCalled;
		}
		function clearDataViews() {
			clearDataViewsWasCalled = true;
		}
		function getClearDataViewsWasCalled() {
			return clearDataViewsWasCalled;
		}
		function setShowDataFunction(func) {
			showDataFunction = func;
		}
		function setCopyAsNewFunction(func) {
			copyAsNewFunction = func;
		}

		function getSpec() {
			return spec;
		}
		function getSpyView() {
			return spyView;
		}
		function getShowDataFunction() {
			return showDataFunction;
		}
		function getCopyAsNewFunction() {
			return copyAsNewFunction;
		}

		function getAddedEditView(number) {
			return addedEditViews[number];
		}
		function getAddedShowView(number) {
			return addedShowViews[number];
		}
		function getAddedButton(number) {
			return addedButtons[number];
		}

		function addObjectToEditView(objectToAdd) {
			objectsAddedToEditView.push(objectToAdd);
		}
		function getObjectAddedToEditView(number) {
			return objectsAddedToEditView[number];
		}

		function showShowIncomingLinksButton() {
			showShowIncomingLinks = true;
		}
		function getShowShowIncomingLinksButton() {
			return showShowIncomingLinks;
		}

		function addToIncomingLinksView(obj) {
			objectsAddedToIncomingLinksView.push(obj);
		}
		function getObjectAddedToIncomingLinksView(no) {
			return objectsAddedToIncomingLinksView[no];
		}

		function addReloadRecordFunction(functionToAdd){
			functionsAddedAsReloadRecord.push(functionToAdd);
		}
		
		function getReloadRecordFunction(no){
			return functionsAddedAsReloadRecord[no];
		}
		
		const addDefinitionViewerOpenFunction = function(functionToAdd){
			functionsAddedAsOpenDefinitionViewer.push(functionToAdd);
		};
		
		const getAddDefinitionViewerOpenFunction = function(no){
			return functionsAddedAsOpenDefinitionViewer[no];
		};

		const out = Object.freeze({
			getView : getView,
			addToShowView : addToShowView,
			addToEditView : addToEditView,
			addButton : addButton,
			clearViews : clearViews,
			getClearViewsWasCalled : getClearViewsWasCalled,
			clearDataViews : clearDataViews,
			getClearDataViewsWasCalled : getClearDataViewsWasCalled,
			setShowDataFunction : setShowDataFunction,
			setCopyAsNewFunction : setCopyAsNewFunction,

			getSpec : getSpec,
			getSpyView : getSpyView,
			getShowDataFunction : getShowDataFunction,
			getCopyAsNewFunction : getCopyAsNewFunction,
			getAddedEditView : getAddedEditView,
			getAddedShowView : getAddedShowView,
			getAddedButton : getAddedButton,
			addObjectToEditView : addObjectToEditView,
			getObjectAddedToEditView : getObjectAddedToEditView,

			addToIncomingLinksView : addToIncomingLinksView,
			getObjectAddedToIncomingLinksView : getObjectAddedToIncomingLinksView,
			showShowIncomingLinksButton : showShowIncomingLinksButton,
			getShowShowIncomingLinksButton : getShowShowIncomingLinksButton,
			addReloadRecordUsingFunction : addReloadRecordFunction,
			getReloadRecordUsingFunction : getReloadRecordFunction,
			
			addDefinitionViewerOpenFunction : addDefinitionViewerOpenFunction,
			getAddDefinitionViewerOpenFunction : getAddDefinitionViewerOpenFunction
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
