/*
 * Copyright 2023 Uppsala Universitet
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
	coraTest.questionSpy = function(spec) {
		let spyView = document.createElement("span");
		spyView.className = "questionSpySpan";

		const getView = function() {
			return spyView;
		};


		const hide = function() {
			
		};

		const hideWithEffect = function() {
			
		};
		
		
		return Object.freeze({
			type: "questionSpy",
			getView: getView,
			hide: hide,
			hideWithEffect: hideWithEffect
		});
	};
	return coraTest;
}(CORATEST || {}));
