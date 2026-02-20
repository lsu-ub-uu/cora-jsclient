/*
 * Copyright 2016 Olov McKie
 * Copyright 2025  Uppsala University Library
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
		let view;
		let box;
		let questionBox;
		let notTriggered = true;

		const start = function() {
			view = createView();
			box = cora.box(view);

			questionBox = createTextView();
			view.appendChild(questionBox);

			createAndAddButtons();
		};

		const createView = function() {
			return CORA.createDivWithClassName("question");
		};

		const createTextView = function() {
			let viewNew = CORA.createDivWithClassName("questionBox");
			let textElement = document.createElement("text");
			viewNew.appendChild(textElement);
			textElement.innerHTML = spec.text;
			return viewNew;
		};

		const createAndAddButtons = function() {
			spec.buttons.forEach(function(buttonSpec) {
				let button = addButton(buttonSpec);
				questionBox.appendChild(button);
			});
		};

		const addButton = function(buttonSpec) {
			let button = document.createElement("input");
			button.type = "button";
			button.value = buttonSpec.text;
			if (buttonSpec.onclickFunction) {

				button.onclick = function() {
					if (onlyTriggerOnce()) {
						buttonSpec.onclickFunction();
						box.hideWithEffect();
					}
				};
			} else {
				button.onclick = function() {
					box.hideWithEffect();
				};
			}
			return button;
		};

		const onlyTriggerOnce = function() {
			if (notTriggered) {
				notTriggered = false;
				return true;
			}
			return false;
		};

		start();

		let out = Object.freeze({
			getView: box.getView,
			hide: box.hide,
			hideWithEffect: box.hideWithEffect
		});
		view.modelObject = out;
		return out;
	};

	return cora;
}(CORA));