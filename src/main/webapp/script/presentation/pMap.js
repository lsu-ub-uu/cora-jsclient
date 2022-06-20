/*
 * Copyright 2018, 2019, 2020 Uppsala University Library
 * Copyright 2018 Olov McKie
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
	cora.pMap = function(dependencies, spec) {
		let metadataProvider = dependencies.metadataProvider;
		let textProvider = dependencies.textProvider;
		let pubSub = dependencies.pubSub;

		let path = spec.path;

		let mapStarted = false;
		let longitudeValue = "";
		let latitudeValue = "";
		let newElementsAddedSubscriptionId = "";

		let pMapView;
		let view;
		let cPresentation = spec.cPresentation;
		let presentationId;
		let metadataId = spec.metadataIdUsedInData;
		let cMetadataElement;
		let nameInData;
		let textId;
		let text;
		let defTextId;
		let defText;
		let longitudePath;
		let latitudePath;
		let markerActive = false;
		let newElementsAddedHasBeenCalled = false;

		const start = function() {
			presentationId = getPresentationId();

			cMetadataElement = getMetadataById(metadataId);
			nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

			getTextInfoFromMetadata();
			subscribeToMessagesForMap();

			createView();
		}

		const getTextInfoFromMetadata = function() {
			let cTextGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData("textId"));
			textId = cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			text = textProvider.getTranslation(textId);

			let cDefTextGroup = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("defTextId"));
			defTextId = cDefTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			defText = textProvider.getTranslation(defTextId);
		}

		const subscribeToMessagesForMap = function() {
			subscribeTonewElementsAddedMessageForStartup();
			subscribeToSetValueForCoordinatesValues();
			subscribeToViewJustMadeVisibleForStartup();
			subscribeTopresentationShownForStartup();
		}

		const subscribeTonewElementsAddedMessageForStartup = function() {
			newElementsAddedSubscriptionId = pubSub.subscribe("newElementsAdded", [], undefined,
				newElementsAdded);
		}

		const subscribeToSetValueForCoordinatesValues = function() {
			let cChildReferences = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("childReferences"));
			let childReferences = cChildReferences.getChildrenByNameInData("childReference");
			childReferences.forEach(subscribeToSetValueIfLatitudeOrLongitude);
		}

		const subscribeToViewJustMadeVisibleForStartup = function() {
			pubSub.subscribe("viewJustMadeVisible", [], undefined, viewJustMadeVisible);
		}

		const subscribeTopresentationShownForStartup = function() {
			pubSub.subscribe("presentationShown", [], undefined, viewJustMadeVisible);
		}

		const getIdFromChildReference = function(childReference) {
			let cChildReference = CORA.coraData(childReference);
			let cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		const getNameInDataForChildId = function(idOfChildToOurGroup) {
			let cMetadataForChild = getMetadataById(idOfChildToOurGroup);
			return cMetadataForChild.getFirstAtomicValueByNameInData("nameInData");
		}

		const subscribeToSetValueIfLatitudeOrLongitude = function(childReference) {
			let idOfChildToOurGroup = getIdFromChildReference(childReference);
			let nameInDataForChild = getNameInDataForChildId(idOfChildToOurGroup);

			if ("longitude" === nameInDataForChild) {
				longitudePath = calculateNewPathForMetadataIdUsingParentPath(idOfChildToOurGroup,
					path);
				subscribeToSetValueForIdOfChildWithFunctionToCall(idOfChildToOurGroup,
					handleSetValueLongitude, longitudePath);
			}

			if ("latitude" === nameInDataForChild) {
				latitudePath = calculateNewPathForMetadataIdUsingParentPath(idOfChildToOurGroup,
					path);
				subscribeToSetValueForIdOfChildWithFunctionToCall(idOfChildToOurGroup,
					handleSetValueLatitude, latitudePath);
			}
		}

		const subscribeToSetValueForIdOfChildWithFunctionToCall = function(idOfChildToOurGroup,
			methodToCall, childPath) {
			pubSub.subscribe("setValue", childPath, undefined, methodToCall);
		}

		const calculateNewPathForMetadataIdUsingParentPath = function(metadataIdToAdd, parentPath) {
			let pathSpec = {
				metadataIdToAdd: metadataIdToAdd,
				parentPath: parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
		}

		const newElementsAdded = function() {
			newElementsAddedHasBeenCalled = true;
			if (mapNotStarted() && viewIsCurrentlyVisible()) {
				unsubscribeFromnewElementsAdded();
				startMap();
			}
		}

		const viewIsCurrentlyVisible = function() {
			return view.offsetHeight > 0;
		}

		const viewJustMadeVisible = function() {
			if (mapNotStarted() && newElementsAddedHasBeenCalled && viewIsCurrentlyVisible()) {
				startMap();
			}
		}

		const mapNotStarted = function() {
			return !mapStarted;
		}

		const startMap = function() {
			mapStarted = true;
			pMapView.startMap();
			possiblyHandleMarkerInView();
		}

		const handleSetValueLongitude = function(dataFromMsg) {
			longitudeValue = dataFromMsg.data;
			possiblyHandleMarkerInView();
		}

		const handleSetValueLatitude = function(dataFromMsg) {
			latitudeValue = dataFromMsg.data;
			possiblyHandleMarkerInView();
		}

		const possiblyHandleMarkerInView = function() {
			if (mapStarted) {
				handleMarkerInView();
			}
		}

		const handleMarkerInView = function() {
			if (enoughDataToPlaceMarker()) {
				setMarkerInView();
			} else {
				possiblyRemoveMarker();
			}
		}

		const enoughDataToPlaceMarker = function() {
			return longitudeValue !== "" && latitudeValue !== "";
		}

		const setMarkerInView = function() {
			pMapView.setMarker(latitudeValue, longitudeValue);
			markerActive = true;
		}

		const possiblyRemoveMarker = function() {
			if (markerActive) {
				pMapView.removeMarker();
				markerActive = false;
			}
		}

		const unsubscribeFromnewElementsAdded = function() {
			pubSub.unsubscribe(newElementsAddedSubscriptionId);
		}

		const createView = function() {
			let mode = cPresentation.getFirstAtomicValueByNameInData("mode");
			let pMapViewSpec = {
				mode: mode,
				info: {
					text: text,
					defText: defText,
					technicalInfo: [{
						text: "textId: " + textId
					}, {
						text: "defTextId: " + defTextId
					}, {
						text: "metadataId: " + metadataId
					}, {
						text: "nameInData: " + nameInData
					}, {
						text: "presentationId: " + presentationId
					}]
				},
				setLatLngMethod: publishLatLngValues
			};
			pMapView = dependencies.pMapViewFactory.factor(pMapViewSpec);
			view = pMapView.getView();
		}

		const publishLatLngValues = function(lat, lng) {
			let latitudeData = {
				data: lat,
				path: latitudePath
			};
			pubSub.publish("setValue", latitudeData);

			let longitudeData = {
				data: lng,
				path: longitudePath
			};
			pubSub.publish("setValue", longitudeData);
		}

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		const getPresentationId = function() {
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		const getView = function() {
			return view;
		}

		const getDependencies = function() {
			return dependencies;
		}

		const getSpec = function() {
			return spec;
		}

		let out = Object.freeze({
			type: "pMap",
			getView: getView,
			getDependencies: getDependencies,
			getSpec: getSpec,
			newElementsAdded: newElementsAdded,
			handleSetValueLongitude: handleSetValueLongitude,
			handleSetValueLatitude: handleSetValueLatitude,
			publishLatLngValues: publishLatLngValues,
			viewJustMadeVisible: viewJustMadeVisible
		});
		start();
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));