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
	coraTest.pChildRefHandlerViewSpy = function(dependencies, spec) {
		var addedChildren = [];
		var removedChildren = [];
		var movedChildren = [];
		var view = CORA.createSpanWithClassName("pChildRefHandlerViewSpyView");

		var showButtonViewCalled = 0;
		var hideButtonViewCalled = 0;
		var showChildrensRemoveButtonCalled = 0;
		var hideChildrensRemoveButtonCalled = 0;
		var showChildrensDragButtonCalled = 0;
		var hideChildrensDragButtonCalled = 0;
		var showChildrensAddBeforeButtonCalled = 0;
		var hideChildrensAddBeforeButtonCalled = 0;

		var repeatingElementDragOver;

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
		function removeChild(childToAdd) {
			removedChildren.push(childToAdd);
		}
		function getRemovedChild(number) {
			return removedChildren[number];
		}
		function moveChild(dataFromMsg) {
			movedChildren.push(dataFromMsg);
		}
		function getMovedChild(number) {
			return movedChildren[number];
		}

		function showButtonView() {
			showButtonViewCalled++;
		}
		function getShowButtonViewCalled() {
			return showButtonViewCalled;
		}

		function hideButtonView() {
			hideButtonViewCalled++;
		}
		function getHideButtonViewCalled() {
			return hideButtonViewCalled;
		}

		function showChildrensRemoveButton() {
			showChildrensRemoveButtonCalled++;
		}
		function getShowChildrensRemoveButtonCalled() {
			return showChildrensRemoveButtonCalled;
		}

		function hideChildrensRemoveButton() {
			hideChildrensRemoveButtonCalled++;
		}
		function getHideChildrensRemoveButtonCalled() {
			return hideChildrensRemoveButtonCalled;
		}

		function showChildrensDragButton() {
			showChildrensDragButtonCalled++;
		}
		function getShowChildrensDragButtonCalled() {
			return showChildrensDragButtonCalled;
		}
		function hideChildrensDragButton() {
			hideChildrensDragButtonCalled++;
		}
		function getHideChildrensDragButtonCalled() {
			return hideChildrensDragButtonCalled;
		}
		
		function showChildrensAddBeforeButton() {
			showChildrensAddBeforeButtonCalled++;
		}
		function getShowChildrensAddBeforeButtonCalled() {
			return showChildrensAddBeforeButtonCalled;
		}
		function hideChildrensAddBeforeButton() {
			hideChildrensAddBeforeButtonCalled++;
		}
		function getHideChildrensAddBeforeButtonCalled() {
			return hideChildrensAddBeforeButtonCalled;
		}

		function setRepeatingElementDragOver(element) {
			repeatingElementDragOver = element;
		}
		function getRepeatingElementDragOver() {
			return repeatingElementDragOver;
		}

		var out = Object.freeze({
			"type" : "pChildRefHandlerViewSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addChild : addChild,
			removeChild : removeChild,
			getRemovedChild : getRemovedChild,
			getAddedChild : getAddedChild,
			moveChild : moveChild,
			getMovedChild : getMovedChild,
			showButtonView : showButtonView,
			getShowButtonViewCalled : getShowButtonViewCalled,
			hideButtonView : hideButtonView,
			getHideButtonViewCalled : getHideButtonViewCalled,
			showChildrensRemoveButton : showChildrensRemoveButton,
			getShowChildrensRemoveButtonCalled : getShowChildrensRemoveButtonCalled,
			hideChildrensRemoveButton : hideChildrensRemoveButton,
			getHideChildrensRemoveButtonCalled : getHideChildrensRemoveButtonCalled,
			hideChildrensDragButton : hideChildrensDragButton,
			getHideChildrensDragButtonCalled : getHideChildrensDragButtonCalled,
			showChildrensDragButton : showChildrensDragButton,
			getShowChildrensDragButtonCalled : getShowChildrensDragButtonCalled,
			hideChildrensAddBeforeButton : hideChildrensAddBeforeButton,
			getHideChildrensAddBeforeButtonCalled : getHideChildrensAddBeforeButtonCalled,
			showChildrensAddBeforeButton : showChildrensAddBeforeButton,
			getShowChildrensAddBeforeButtonCalled : getShowChildrensAddBeforeButtonCalled,
			setRepeatingElementDragOver : setRepeatingElementDragOver,
			getRepeatingElementDragOver : getRepeatingElementDragOver
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
