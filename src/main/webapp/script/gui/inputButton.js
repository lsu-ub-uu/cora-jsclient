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
	cora.gui.inputButton = function(spec) {
		var view = createView();
		spec.type="inputButton";
		var button = cora.gui.buttonView(spec, view);
		button.init();

		function createView() {
				var inputButton = document.createElement("input");
				inputButton.type = "button";
				inputButton.className = cora.gui.getClassNameOrEmptyFromSpec(spec);
				return inputButton;
		}

		
		function getSpec(){
			return spec;
		}

		var out = Object.freeze({
			getView : button.getView,
			getSpec : getSpec
		});

		out.getView().modelObject = out;
		return out.getView();
	};

	return cora;
}(CORA));