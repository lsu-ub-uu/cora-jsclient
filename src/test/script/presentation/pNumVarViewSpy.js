/*
 * Copyright 2018 Uppsala University Library
 * Copyright 2016, 2018 Olov McKie
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
	coraTest.pNumVarViewSpy = function(dependencies, spec) {
		var addedViews = [];
		var addedToolViews = [];
		var showDataF = null;
		var view = document.createElement("span");
		var state;
		var value;
		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}
		function setValue(valueIn) {
			value = valueIn;
		}
		function getValue() {
			return value;
		}
		function setState(stateIn) {
			state = stateIn;
		}
		function getState() {
			return state;
		}
		function callOnblurWithValue(valueToSet){
			spec.onblurFunction(valueToSet);
		}
		function callOnkeyupWithValue(valueToSet){
			spec.onkeyupFunction(valueToSet);
		}
		var out = Object.freeze({
			"type" : "pNumVarViewSpy",
			getDependencies : getDependencies,
			getView : getView,
			getSpec : getSpec,
			setValue : setValue,
			getValue : getValue,
			setState : setState,
			getState : getState,
			callOnblurWithValue:callOnblurWithValue,
			callOnkeyupWithValue:callOnkeyupWithValue
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
