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
	cora.busy = function() {
		let view = createView();
		let beforeShowFunction;

		let box = cora.gui.box(view);

		function createView() {
			return CORA.gui.createDivWithClassName("busy hidden");
		}


		function show() {
			if (beforeShowFunction) {
				beforeShowFunction();
			}
			view.className = "busy";
		}

		/**
		 * addBeforeShowFunction gives the possibility to add a function to set the place of busy
		 * this can be something like function(){this.obj.appendChild(this.busy);} if the function
		 * is set, it is called before each show useful to always be last (or before a specific
		 * element) or add if in a container that gets cleared (widget.content)
		 */
		function addBeforeShowFunction(func) {
			beforeShowFunction = func;
		}

		let out = Object.freeze({
			getView: box.getView,
			show: show,
			hide: box.hide,
			hideWithEffect: box.hideWithEffect,
			addBeforeShowFunction: addBeforeShowFunction
		});
		view.modelObject = out;
		return out;
	};

	return cora;
}(CORA));