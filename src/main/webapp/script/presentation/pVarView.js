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
	cora.pVarView = function(spec) {
		var out;
		var view;

		function start() {
			view = CORA.gui.createSpanWithClassName("pVar " + spec.presentationId);
		}

		function getView() {
			return view;
		}

		function getSpec() {
			return spec;
		}

		out = Object.freeze({
			"type" : "pVarView",
			getSpec : getSpec,
			getView : getView
		});
		start();
		return out;
	};
	return cora;
}(CORA));