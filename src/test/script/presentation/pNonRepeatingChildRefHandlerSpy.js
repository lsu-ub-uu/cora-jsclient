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
	coraTest.pNonRepeatingChildRefHandlerSpy = function(dependencies, spec) {
		var added = [];
		var addedToolViews = [];
		var showDataF = null;
//		var view = document.createElement("span");
		var view = CORA.gui.createSpanWithClassName("pNonRepeatingChildRefHandlerSpyView");
		var state;
		var value;
		
		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}
		function add() {
		}
		function handleMsg() {
		}
		function isRepeating() {
		}
		function isStaticNoOfChildren() {
		}
		function sendAdd() {
		}
		function childRemoved() {
		}
		function childMoved() {
		}
		function handleFiles() {
		}
		function processNewBinary() {
		}
		
		
		var out = Object.freeze({
			"type" : "pNonRepeatingChildRefHandlerSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			add : add,
			handleMsg : handleMsg,
			isRepeating : isRepeating,
			isStaticNoOfChildren : isStaticNoOfChildren,
			sendAdd : sendAdd,
			childRemoved : childRemoved,
			childMoved : childMoved,
			handleFiles : handleFiles,
			processNewBinary : processNewBinary
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
