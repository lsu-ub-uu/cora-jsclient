/*
 * Copyright 2016 Olov McKie
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
	coraTest.infoSpy = function(spec) {
		var spyView = document.createElement("span");
		spyView.className = "infoSpySpan";
		// addBaseViewAccordingToSpec();
		var infoLevel = 0;
		var infoButtonSpec = {
			"className" : "infoButtonSpy",
			action : {
				method : addBaseViewAccordingToSpec
			}
		};
		var button = CORA.gui.button(infoButtonSpec);

		function addBaseViewAccordingToSpec() {
			if (spec.appendTo !== undefined) {
				spec.appendTo.appendChild(spyView);
			}
			if (spec.insertAfter !== undefined) {
				spec.insertAfter.parentNode.insertBefore(spyView, spec.insertAfter.nextSibling);
			}
		}
		function getView() {
			return spyView;
		}
		function getSpec() {
			return spec;
		}

		function getButton() {
			return button;
		}

		function getInfoLevel() {
			return infoLevel;
		}

		function setInfoLevel(level) {
			infoLevel = level;
		}

		var out = Object.freeze({
			"type" : "infoSpy",
			getSpec : getSpec,
			getView : getView,
			getButton : getButton,
			getInfoLevel : getInfoLevel,
			setInfoLevel : setInfoLevel
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
