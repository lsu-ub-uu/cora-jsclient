/*
 * Copyright 2016 Uppsala University Library
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
	coraTest.presentationStub = function(id, className) {
		var view = document.createElement("span");
		view.className = "presentationStub";
		if (undefined !== className) {
			view.className = className;
		}
		if (id !== undefined) {
			view.id = id;
		}
		view.style.minHeight = "2px";
		view.style.minWidth = "2px";
		view.style.display = "block";
		function getView() {
			return view;
		}
		const getPresentationCounter = function() {
			return "1-34-Spy";
		};

		return Object.freeze({
			getView: getView,
			getPresentationCounter: getPresentationCounter
		});
	};
	return coraTest;
}(CORATEST || {}));