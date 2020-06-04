/*
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
	coraTest.pMapViewSpy = function(dependencies, spec) {
		var addedViews = [];
		var addedToolViews = [];
		var showDataF = null;
		var view = CORA.gui.createDivWithClassName("pMapViewSpy");
		var content = document.createTextNode(JSON
				.stringify("content needed for span to be visible in chrome"));
		view.appendChild(content);
		var state;
		var value;

		var startMapCalled = 0;

		var markersSet = [];
		var callsToRemoveMarker = 0;
		
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
		function callOnblurWithValue(valueToSet) {
			spec.onblurFunction(valueToSet);
		}
		function callOnkeyupWithValue(valueToSet) {
			spec.onkeyupFunction(valueToSet);
		}

		function startMap() {
			startMapCalled++;
		}
		function getStartMapCalled() {
			return startMapCalled;
		}

		function setMarker(lat, lng) {
			markersSet.push({
				"lat" : lat,
				"lng" : lng
			});
		}
		function getMarkerValues(no) {
			return markersSet[no];
		}

		function removeMarker() {
			callsToRemoveMarker++;
		}

		function getNoOfRemoveMarkerCalls() {
			return callsToRemoveMarker;
		}

		var out = Object.freeze({
			"type" : "pMapViewSpy",
			getDependencies : getDependencies,
			getView : getView,
			getSpec : getSpec,
			startMap : startMap,
			getStartMapCalled : getStartMapCalled,
			setMarker : setMarker,
			getMarkerValues : getMarkerValues,
			removeMarker : removeMarker,
			getNoOfRemoveMarkerCalls : getNoOfRemoveMarkerCalls
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
