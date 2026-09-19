/*
 * Copyright 2016, 2017 Olov McKie
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
import CORATEST from "../aCoratestNameSpace.js";

const coraTest = CORATEST;

coraTest.pRepeatingElementSpy = function(dependencies, spec) {
		var view = document.createElement("span");
		view.className = "repeatingElement";
		var parentModelObject;
		var path = spec.path;
		var presentation;
		var presentationMinimized;
		var showDragButtonCalled = 0;
		var hideDragButtonCalled = 0;
		var showAddBeforeButtonCalled = 0;
		var hideAddBeforeButtonCalled = 0;
		var showRemoveButtonCalled = 0;
		var hideRemoveButtonCalled = 0;
		var presentationSize;

		function getView() {
			return view;
		}
		function ondragenter() {
			parentModelObject.setRepeatingElementDragOver(view.modelObject);
		}
		function setParentModelObject(pMO) {
			parentModelObject = pMO;
		}
		function getPath() {
			return path;
		}
		function setPath(p) {
			path = p;
		}
		function addPresentation(presentationIn) {
			presentation = presentationIn;
		}
		function getPresentation() {
			return presentation;
		}
		function addAlternativePresentation(presentationIn, presentationSizeIn) {
			presentationMinimized = presentationIn;
			presentationSize = presentationSizeIn;
		}
		function getPresentationMinimized() {
			return presentationMinimized;
		}
		function getPresentationSize() {
			return presentationSize;
		}

		function hideRemoveButton() {
			hideRemoveButtonCalled++;
		}
		function showRemoveButton() {
			showRemoveButtonCalled++;
		}
		function hideDragButton() {
			hideDragButtonCalled++;
		}
		function showDragButton() {
			showDragButtonCalled++;
		}
		function hideAddBeforeButton() {
			hideAddBeforeButtonCalled++;
		}
		function showAddBeforeButton() {
			showAddBeforeButtonCalled++;
		}

		function getHideRemoveButtonCalled() {
			return hideRemoveButtonCalled;
		}
		function getShowRemoveButtonCalled() {
			return showRemoveButtonCalled;
		}
		function getHideDragButtonCalled() {
			return hideDragButtonCalled;
		}
		function getShowDragButtonCalled() {
			return showDragButtonCalled;
		}
		function getHideAddBeforeButtonCalled() {
			return hideAddBeforeButtonCalled;
		}
		function getShowAddBeforeButtonCalled() {
			return showAddBeforeButtonCalled;
		}
		var out = ({
			"type" : "pRepeatingElementSpy",
			getView : getView,
			ondragenter : ondragenter,
			setParentModelObject : setParentModelObject,
			addPresentation : addPresentation,
			addAlternativePresentation : addAlternativePresentation,
			hideRemoveButton : hideRemoveButton,
			showRemoveButton : showRemoveButton,
			hideDragButton : hideDragButton,
			showDragButton : showDragButton,
			hideAddBeforeButton : hideAddBeforeButton,
			showAddBeforeButton : showAddBeforeButton,
			getPath : getPath,
			setPath : setPath,
			getHideRemoveButtonCalled : getHideRemoveButtonCalled,
			getShowRemoveButtonCalled : getShowRemoveButtonCalled,
			getHideDragButtonCalled : getHideDragButtonCalled,
			getShowDragButtonCalled : getShowDragButtonCalled,
			getHideAddBeforeButtonCalled : getHideAddBeforeButtonCalled,
			getShowAddBeforeButtonCalled : getShowAddBeforeButtonCalled,
			getPresentation : getPresentation,
			getPresentationMinimized : getPresentationMinimized,
			getPresentationSize : getPresentationSize
		});
		view.modelObject = out;
		view.ondragenter = out.ondragenter;
		return out;
	};

export default CORATEST;
