/*
 * Copyright 2021 Uppsala Universitet
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
	coraTest.busySpy = function(spec) {
		var spyView = document.createElement("span");
		spyView.className = "busySpySpan";
		var showIsCalledNoOfTimes = 0;

		function getView() {
			return spyView;
		}

		function show() {
			showIsCalledNoOfTimes++;
		}

		function hide() {
		}

		function hideWithEffect() {
		}
		function addBeforeShowFunction(func) {
		}
		function getShowIsCalledNoOfTimes(){
			return showIsCalledNoOfTimes;
		}
		return Object.freeze({
			"type": "busySpy",
			getView: getView,
			show: show,
			hide: hide,
			hideWithEffect: hideWithEffect,
			addBeforeShowFunction: addBeforeShowFunction,
			getShowIsCalledNoOfTimes: getShowIsCalledNoOfTimes
		});
	};
	return coraTest;
}(CORATEST || {}));
