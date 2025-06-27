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
var CORA = (function(cora) {
	"use strict";
	cora.question = function(spec) {
		var view = createView();
		var box = cora.box(view);

		var questionBox = createTextView();
		view.appendChild(questionBox);

		createAndAddButtons();

		function createView() {
			return CORA.createDivWithClassName("question");
		}
		function createTextView() {
			var viewNew = CORA.createDivWithClassName("questionBox");
			var textElement = document.createElement("text");
			viewNew.appendChild(textElement);
			textElement.innerHTML = spec.text;
			return viewNew;
		}

		function createAndAddButtons() {
			spec.buttons.forEach(function(buttonSpec) {
				var button = addButton(buttonSpec);
				questionBox.appendChild(button);
			});
		}

		function addButton(buttonSpec) {
			var button = document.createElement("input");
			button.type = "button";
			button.value = buttonSpec.text;
			if (buttonSpec.onclickFunction) {
				button.onclick = function() {
					buttonSpec.onclickFunction();
					box.hideWithEffect();
				};
			} else {
				button.onclick = function() {
					box.hideWithEffect();
				};
			}
			return button;
		}


		var out = Object.freeze({
			getView : box.getView,
			hide : box.hide,
			hideWithEffect : box.hideWithEffect
		});
		view.modelObject = out;
		return out;
	};

	return cora;
}(CORA));