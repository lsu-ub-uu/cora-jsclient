/*
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.pRecordLinkViewSpy = function(dependencies, spec) {
		var addedChildren = [];
		var addedLinkedPresentations = [];
		var addedToolViews = [];
		var childrenHidden = 0;
		var childrenShown = 0;
		var showDataF = null;
		var view = CORA.gui.createSpanWithClassName("pRecordLinkViewSpyView");
		var state;
		var value;

		var showOpenLinkedRecordCalled = 0;
		var hideOpenLinkedRecordCalled = 0;
		var removeLinkedPresentationCalled = 0;

		var addedSearchHandlerViews = [];
		var hideSearchHandlerViewCalled = 0;

		var clearLinkedRecordIdMethods = [];
		var hideClearLinkedRecordIdButtonCalled = 0;
		let hideCalled = 0;
		let showCalled = 0;

		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}
		function addChild(childToAdd) {
			addedChildren.push(childToAdd);
		}
		function getAddedChild(number) {
			return addedChildren[number];
		}

		function updateClassName() {
		}
		function hideChildren() {
			childrenHidden++;
		}
		function getChildrenHidden() {
			return childrenHidden;
		}

		function showChildren() {
			childrenShown++;
		}
		function getChildrenShown() {
			return childrenShown;
		}

		function addLinkedPresentation(presentationToAdd) {
			addedLinkedPresentations.push(presentationToAdd);
		}
		function getAddedLinkedPresentation(number) {
			return addedLinkedPresentations[number];
		}

		function showOpenLinkedRecordButton() {
			showOpenLinkedRecordCalled++;
		}
		function getShowOpenLinkedRecord() {
			return showOpenLinkedRecordCalled;
		}
		function hideOpenLinkedRecordButton() {
			hideOpenLinkedRecordCalled++;
		}
		function getHideOpenLinkedRecord() {
			return hideOpenLinkedRecordCalled;
		}

		function removeLinkedPresentation() {
			removeLinkedPresentationCalled++;
		}
		function getRemoveLinkedPresentation() {
			return removeLinkedPresentationCalled;
		}

		function addSearchHandlerView(searchHandlerToAdd) {
			addedSearchHandlerViews.push(searchHandlerToAdd);
		}
		function getAddedSearchHandlerView(number) {
			return addedSearchHandlerViews[number];
		}

		function hideSearchHandlerView() {
			hideSearchHandlerViewCalled++;
		}
		function getHideSearchHandlerView() {
			return hideSearchHandlerViewCalled;
		}

		function showClearLinkedRecordIdButton(onclickMethod) {
			clearLinkedRecordIdMethods.push(onclickMethod);
		}
		function getClearLinkedRecordIdMethods(no) {
			return clearLinkedRecordIdMethods[no];
		}

		function hideClearLinkedRecordIdButton() {
			hideClearLinkedRecordIdButtonCalled++;
		}
		function getHideClearLinkedRecordIdButtons() {
			return hideClearLinkedRecordIdButtonCalled;
		}
		
		const hide = function(){
			hideCalled++;
		};
		const getHideCalled = function(){
			return hideCalled;
		};
		const show = function(){
			showCalled++;
		};
		const getShowCalled = function(){
			return showCalled
		};
		
		var out = Object.freeze({
			"type" : "pRecordLinkViewSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			updateClassName : updateClassName,
			addChild : addChild,
			getAddedChild : getAddedChild,
			hideChildren : hideChildren,
			getChildrenHidden : getChildrenHidden,
			showChildren : showChildren,
			getChildrenShown : getChildrenShown,
			addLinkedPresentation : addLinkedPresentation,
			getAddedLinkedPresentation : getAddedLinkedPresentation,
			showOpenLinkedRecordButton : showOpenLinkedRecordButton,
			getShowOpenLinkedRecord : getShowOpenLinkedRecord,
			hideOpenLinkedRecordButton : hideOpenLinkedRecordButton,
			getHideOpenLinkedRecord : getHideOpenLinkedRecord,

			removeLinkedPresentation : removeLinkedPresentation,
			getRemoveLinkedPresentation : getRemoveLinkedPresentation,

			showClearLinkedRecordIdButton : showClearLinkedRecordIdButton,
			getClearLinkedRecordIdMethods : getClearLinkedRecordIdMethods,

			hideClearLinkedRecordIdButton : hideClearLinkedRecordIdButton,
			getHideClearLinkedRecordIdButtons : getHideClearLinkedRecordIdButtons,

			addSearchHandlerView : addSearchHandlerView,
			getAddedSearchHandlerView : getAddedSearchHandlerView,
			hideSearchHandlerView : hideSearchHandlerView,
			getHideSearchHandlerView : getHideSearchHandlerView,
			hide: hide,
			getHideCalled: getHideCalled,
			show: show,
			getShowCalled: getShowCalled
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
