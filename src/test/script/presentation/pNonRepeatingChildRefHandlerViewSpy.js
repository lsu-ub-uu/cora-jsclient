/*
 * Copyright 2018 Uppsala University Library
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
	coraTest.pNonRepeatingChildRefHandlerViewSpy = function(dependencies, spec) {
		var addedChildren = [];
		var addedAlternativeChildren = [];
		var view = CORA.createSpanWithClassName("pNonRepeatingChildRefHandlerViewSpyView");
		//

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
		function addAlternativePresentation(childToAdd) {
			addedAlternativeChildren.push(childToAdd);
		}
		function getAddedAlternativeChild(number) {
			return addedAlternativeChildren[number];
		}
		
		var isShown;
		function hideContent() {
			isShown = false;
		}
		function showContent() {
			isShown = true;
		}
		function getIsShown() {
			return isShown;
		}

		var dataHasDataStyle;
		function setHasDataStyle(dataStyle) {
			dataHasDataStyle = dataStyle;
		}
		function getDataHasDataStyle() {
			return dataHasDataStyle;
		}

		var out = Object.freeze({
			"type" : "pChildRefHandlerViewSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addChild : addChild,
			getAddedChild : getAddedChild,
			addAlternativePresentation : addAlternativePresentation,
			getAddedAlternativeChild : getAddedAlternativeChild,

			hideContent : hideContent,
			showContent : showContent,
			getIsShown : getIsShown,

			setHasDataStyle : setHasDataStyle,
			getDataHasDataStyle : getDataHasDataStyle
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
