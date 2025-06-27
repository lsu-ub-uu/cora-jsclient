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
		let view;
		let action;

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
			if (spec.action !== undefined) {
				handleAction();
			}
		};

		const handleAction = function() {
			action = spec.action.method;
		};

		const possiblyAddOnclickMethod = function() {
			if (specDemandsClick()) {
				addOnclickForMethodFromAction();
			}
		};

		const specDemandsClick = function(){
			return spec.action !== undefined
			&& (spec.action.clickable === true || spec.action.clickable === undefined);
		};

		const addOnclickForMethodFromAction = function(){
			view.addEventListener('click', (event) => {
				event.stopPropagation();
				action(event);
			});
		};

		const possiblyAddOnkeydownMethod = function() {
			if(specDemandsKeydown()){
				addTabstop();
				addOnkeydownMethod();
			}
		};

		const specDemandsKeydown = function(){
			return spec.action !== undefined && spec.action.onkeydown !== undefined;
		};

		const addTabstop = function() {
			view.tabIndex = 0;
		};

		const addOnkeydownMethod = function() {
			let onkeydownFunction = function(event) {
				if (spec.action.onkeydown.keys.indexOf(event.key) !== -1) {
					event.stopPropagation();
					action(event);
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