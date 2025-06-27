/*
 * Copyright 2018 Olov McKie
 * Copyright 2018 Uppsala University Library
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
	cora.pMapView = function(dependencies, spec) {
		var mode = spec.mode;

		var out;
		var view;
		var valueView;
		var baseClassName = "pMap " + spec.presentationId;
		var info;

		var defaultLatLng = [ 61.7, 15.0 ];
		var defaultZoom = 4;
		var map;
		var marker;

		function start() {
			view = CORA.createSpanWithClassName(baseClassName);
			info = createInfo();

			view.appendChild(info.getButton());
			createValueView();
		}

		function createInfo() {
			var infoSpec = {
				"afterLevelChange" : updateClassName,
				"level1" : [ {
					"className" : "textView",
					"text" : spec.info.text
				}, {
					"className" : "defTextView",
					"text" : spec.info.defText
				} ]
			};
			possiblyAddLevel2Info(infoSpec);
			var newInfo = dependencies.infoFactory.factor(infoSpec);
			infoSpec.insertAfter = newInfo.getButton();
			return newInfo;
		}

		function possiblyAddLevel2Info(infoSpec) {
			if (specInfoHasTechnicalInfo()) {
				addLevelTechnicalInfoAsLevel2(infoSpec);
			}
		}

		function specInfoHasTechnicalInfo() {
			return spec.info.technicalInfo;
		}

		function addLevelTechnicalInfoAsLevel2(infoSpec) {
			infoSpec.level2 = [];
			spec.info.technicalInfo.forEach(function(techInfo) {
				infoSpec.level2.push(createTechInfoPart(techInfo));
			});
		}

		function createTechInfoPart(techInfo) {
			var techInfoPart = {
				"className" : "technicalView",
				"text" : techInfo.text
			};

			if (techInfo.onclickMethod !== undefined) {
				techInfoPart.onclickMethod = techInfo.onclickMethod;
			}
			return techInfoPart;
		}

		function updateClassName() {
			var className = baseClassName;
			if (infoIsShown()) {
				className += " infoActive";
			}
			view.className = className;
		}

		function infoIsShown() {
			return info.getInfoLevel() !== 0;
		}

		function createValueView() {
			valueView = CORA.createDivWithClassName("coraMap");
			view.appendChild(valueView);
		}

		function startMap() {
			map = createMap();
			addOpenStreetmapLayerToMap();
			addMiniMapToMap();
		}

		function createMap() {
			var newMap = L.map(valueView).setView(defaultLatLng, defaultZoom);
			valueView.modelObject = newMap;
			newMap.on('click', onMapClick);
			return newMap;
		}

		function addOpenStreetmapLayerToMap() {
			var titleLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution : 'Map data &copy;' + '<a href="https://www.openstreetmap.org/">'
						+ 'OpenStreetMap</a> contributors'
			});
			titleLayer.addTo(map);
		}

		function addMiniMapToMap() {
			var miniLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {});
			var minimap = new L.Control.MiniMap(miniLayer);
			minimap.addTo(map);
			valueView.minimap = minimap;
		}

		function onMapClick(e) {
			if (modeIsInputAndNoMarkerExistsInMap()) {
				var latLng = e.latlng;
				setMarker(latLng.lat, latLng.lng);
				setCoordinateFromLatLng(latLng.lat, latLng.lng);
			}
		}

		function modeIsInputAndNoMarkerExistsInMap() {
			return mode === "input" && marker === undefined;
		}

		function setMarker(lat, lng) {
			var latLng = [ lat, lng ];
			ensureMarkerIsAtLatLng(latLng);

			var zoomLevel = 10;
			map.flyTo(latLng, zoomLevel);
		}

		function ensureMarkerIsAtLatLng(latLng) {
			if (marker === undefined) {
				setNewMarker(latLng);
			} else {
				moveMarker(latLng);
			}
		}

		function setNewMarker(latLng) {
			if (mode === "input") {
				marker = createInputMarker(latLng);
			} else {
				marker = L.marker(latLng);
			}

			marker.addTo(map);
			valueView.marker = marker;
		}

		function createInputMarker(latLng) {
			var newMarker = L.marker(latLng, {
				draggable : true
			});
			return newMarker.on("dragend", setCoordinateFromMarkerDrag);
		}

		function moveMarker(latLng) {
			marker.setLatLng(latLng);
		}

		function setCoordinateFromMarkerDrag(event) {
			var latLngFromDragEnd = event.target.getLatLng();
			setCoordinateFromLatLng(latLngFromDragEnd.lat, latLngFromDragEnd.lng);
		}

		function setCoordinateFromLatLng(lat, lng) {
			var latAsString = "" + lat;
			var lngAsString = "" + lng;
			spec.setLatLngMethod(latAsString, lngAsString);
		}

		function removeMarker() {
			valueView.marker = undefined;
			map.removeLayer(marker);
			marker = undefined;
			map.flyTo(defaultLatLng, defaultZoom);
		}

		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		out = Object.freeze({
			"type" : "pMapView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			updateClassName : updateClassName,
			startMap : startMap,
			setMarker : setMarker,
			removeMarker : removeMarker,
			setCoordinateFromMarkerDrag : setCoordinateFromMarkerDrag,
			onMapClick : onMapClick
		});
		start();
		valueView.modelObject2 = out;

		return out;
	};
	return cora;
}(CORA));