/*
 * Copyright 2018, 2024 Olov McKie
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
	cora.button = function(spec) {
		const action = spec.action;
		let view;
		let actionMethod;

		const start = function() {
			view = createView();
			possiblyHandleAction();
			possiblyAddOnclickMethod();
			possiblyAddOnkeydownMethod();
			possiblyAddText();
		};

		const createView = function() {
			return CORA.createSpanWithClassName(getClassNameOrEmptyFromSpec());
		};

		const getClassNameOrEmptyFromSpec = function() {
			if (spec.className !== undefined) {
				return spec.className;
			}
			return "";
		};

		const possiblyHandleAction = function() {
			if (action !== undefined) {
				handleAction();
			}
		};

		const handleAction = function() {
			actionMethod = action.method;
		};

		const possiblyAddOnclickMethod = function() {
			if (specDemandsClick()) {
				addOnclickForMethodFromAction();
			}
		};

		const specDemandsClick = function(){
			return action !== undefined
			&& (action.clickable === true || action.clickable === undefined);
		};

		const addOnclickForMethodFromAction = function(){
			view.addEventListener('click', (event) => {
				event.stopPropagation();
				actionMethod(event);
			});
		};

		const possiblyAddOnkeydownMethod = function() {
			if(specDemandsKeydown()){
				addTabstop();
				addOnkeydownMethod();
			}
		};

		const specDemandsKeydown = function(){
			return action !== undefined && action.onkeydown !== undefined;
		};

		const addTabstop = function() {
			view.tabIndex = 0;
		};

		const addOnkeydownMethod = function() {
			let onkeydownFunction = function(event) {
				if (action.onkeydown.keys.indexOf(event.key) !== -1) {
					event.stopPropagation();
					actionMethod(event);
				}
			};
			view.addEventListener("keydown", onkeydownFunction);
		};

		const possiblyAddText = function() {
			if (spec.text !== undefined) {
				view.textContent = spec.text;
			}
		};

		const getView = function() {
			return view;
		};

		let out = Object.freeze({
			getView : getView
		});
		start();
		return out.getView();
	};

	return cora;
}(CORA));