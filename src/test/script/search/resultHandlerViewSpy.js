/*
 * Copyright 2017 Uppsala University Library
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
	coraTest.resultHandlerViewSpy = function() {

		var view = CORA.createSpanWithClassName("spyView");
		var presentationsAdded = [];
		var addedButton;

		function getView() {
			return view;
		}

		function addChildPresentation(presentationToAdd, record) {
			presentationsAdded.push({
				"presentation" : presentationToAdd,
				"record" : record
			});
		}
		function getAddedPresentation(number) {
			return presentationsAdded[number];
		}

		function addButton(text, onclickMethod, className){
			addedButton = {
				"text" : text,
				"onclickMethod" : onclickMethod,
				"className" : className
			};
		}

		function getAddedButton(){
			return addedButton;
		}

		return Object.freeze({
			"type" : "resultHandlerViewSpy",
			getView : getView,
			addChildPresentation : addChildPresentation,
			getAddedPresentation : getAddedPresentation,
			addButton : addButton,
			getAddedButton : getAddedButton
		});
	};
	return coraTest;
}(CORATEST || {}));