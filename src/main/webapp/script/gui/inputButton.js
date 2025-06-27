/*
 * Copyright 2018 Olov McKie
 * Copyright 2019 Uppsala Universitet
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
	cora.inputButton = function(spec) {
		var view;
		var action;

		function start() {
			view = createView();
			possiblyHandleAction();
			possiblyAddOnclickMethod();
			possiblyAddOnkeydownMethod();
			possiblyAddText();
		}

		function createView() {
				var button = document.createElement("input");
				button.type = "button";
				button.className = getClassNameOrEmptyFromSpec();
				return button;
		}

		function getClassNameOrEmptyFromSpec() {
			if (spec.className !== undefined) {
				return spec.className;
			}
			return "";
		}

		function possiblyHandleAction() {
			if (spec.action !== undefined) {
				handleAction();
			}
		}

		function handleAction() {
			action = spec.action.method;
		}

		function possiblyAddOnclickMethod() {
			if (specDemandsClick()) {
				addOnclickForMethodFromAction();
			}
		}

		function specDemandsClick(){
			return spec.action !== undefined
			&& (spec.action.clickable === true || spec.action.clickable === undefined);
		}

		function addOnclickForMethodFromAction(){
			view.addEventListener('click', (event) => {
				event.stopPropagation();
				action(event);
			});
		}

		function possiblyAddOnkeydownMethod() {
			if(specDemandsKeydown()){
				addTabstop();
				addOnkeydownMethod();
			}
		}

		function specDemandsKeydown(){
			return spec.action !== undefined && spec.action.onkeydown !== undefined;
		}

		function addTabstop() {
			view.tabIndex = 0;
		}

		function addOnkeydownMethod() {
			var onkeydownFunction = function(event) {
				if (spec.action.onkeydown.keys.indexOf(event.key) !== -1) {
					event.stopPropagation();
					action(event);
				}
			};
			view.addEventListener("keydown", onkeydownFunction);
		}

		function possiblyAddText() {
			if (spec.text !== undefined) {
				view.value = spec.text;
			}
		}

		function getView() {
			return view;
		}
		
		function getSpec(){
			return spec;
		}

		var out = Object.freeze({
			getView : getView,
			getSpec : getSpec
		});
		start();
		out.getView().modelObject = out;
		return out.getView();
	};

	return cora;
}(CORA));