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
	coraTest.holderSpy = function(spec) {

		var button = CORA.createSpanWithClassName("fakeButton");
		var view = CORA.createSpanWithClassName("fakeView");

		var openCalled = 0;
        var toggleCalled = 0;
		function getSpec() {
			return spec;
		}

		function getButton() {
			return button;
		}

		function getView() {
			return view;
		}

		function open() {
			openCalled++;
		}

		function getOpenCalled() {
			return openCalled;
		}

        function getToggleCalled() {
            return toggleCalled;
        }

		function toggleHolder(){
			toggleCalled++;
		}


		var out = Object.freeze({
			"type" : "holderSpy",
			getSpec : getSpec,
			getButton : getButton,
			toggleHolder : toggleHolder,
			openHolder : open,
			getOpenCalled:getOpenCalled,
			getToggleCalled:getToggleCalled,
			// closeHolder : close,
			getView : getView,
		// getStatus : getStatus
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
