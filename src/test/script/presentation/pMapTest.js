/*
 * Copyright 2018, 2019, 2020, 2025 Uppsala University Library
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
"use strict";
QUnit.module("presentation/pMapTest.js", hooks => {
	const test = QUnit.test;
	let metadataProvider;
	let textProvider;
	let pubSub;
	let pMapViewFactory;

	let dependencies;
	let spec;
	let fixture;
	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");
		metadataProvider = new MetadataCoordinatesProviderStub();
		textProvider = CORATEST.textProviderSpy();
		pubSub = CORATEST.pubSubSpy();
		pMapViewFactory = CORATEST.standardFactorySpy("pMapViewSpy");
		dependencies = {
			metadataProvider: metadataProvider,
			infoFactory: CORATEST.infoFactorySpy(),
			pubSub: pubSub,
			textProvider: textProvider,
			pMapViewFactory: pMapViewFactory,
			jsBookkeeper: CORATEST.jsBookkeeperSpy(),
		};
		spec = {
			metadataIdUsedInData: "coordinatesGroup",
			path: [],
			cPresentation: CORA.coraData(metadataProvider
				.getMetadataById("coordinatesPGroup")),
		};
	});

	hooks.afterEach(() => { });


	test("testGetDependencies", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		assert.strictEqual(pMap.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		assert.strictEqual(pMap.getSpec(), spec);
	});

	test("testInit", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		assert.strictEqual(pMap.type, "pMap");

		let view = pMap.getView();
		fixture.appendChild(view);
		assert.strictEqual(view, pMapViewFactory.getFactored(0).getView());
		assert.ok(view.modelObject === pMap,
			"modelObject should be a pointer to the javascript object instance");
	});

	test("testInitSubscribesToInitcompleteMessage", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		let subscriptions = pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 5);

		let newElementsAddedSubscription = subscriptions[0];
		assert.strictEqual(newElementsAddedSubscription.type, "newElementsAdded");
		assert.deepEqual(newElementsAddedSubscription.path, []);
		assert.strictEqual(newElementsAddedSubscription.functionToCall, pMap.newElementsAdded);

		let setLatitudeSubscription = subscriptions[1];
		assert.strictEqual(setLatitudeSubscription.type, "setValue");
		let latitudePath = ["latitudeTextVar"];
		assert.stringifyEqual(setLatitudeSubscription.path, latitudePath);
		assert.strictEqual(setLatitudeSubscription.functionToCall, pMap.handleSetValueLatitude);

		let setLongitudeSubscription = subscriptions[2];
		assert.strictEqual(setLongitudeSubscription.type, "setValue");
		let longitudePath = ["longitudeTextVar"];
		assert.stringifyEqual(setLongitudeSubscription.path, longitudePath);
		assert.strictEqual(setLongitudeSubscription.functionToCall, pMap.handleSetValueLongitude);

		let viewJustMadeVisibleSubscription = subscriptions[3];
		assert.strictEqual(viewJustMadeVisibleSubscription.type, "viewJustMadeVisible");
		assert.deepEqual(viewJustMadeVisibleSubscription.path, []);
		assert.strictEqual(viewJustMadeVisibleSubscription.functionToCall, pMap.viewJustMadeVisible);

		let presentationShownSubscription = subscriptions[4];
		assert.strictEqual(presentationShownSubscription.type, "presentationShown");
		assert.deepEqual(presentationShownSubscription.path, []);
		assert.strictEqual(presentationShownSubscription.functionToCall, pMap.viewJustMadeVisible);
	});

	test("testnewElementsAddedStartsMapInViewAndUnsubscribesToInitcompleteMessage", function(
		assert) {
		let pMap = CORA.pMap(dependencies, spec);
		let view = pMap.getView();
		fixture.appendChild(view);

		let pMapView = pMapViewFactory.getFactored(0);
		assert.strictEqual(pMapView.getStartMapCalled(), 0);

		pMap.newElementsAdded();
		assert.strictEqual(pMapView.getStartMapCalled(), 1);

		// unsubscription
		let unsubscriptions = pubSub.getUnsubscriptions();
		assert.deepEqual(unsubscriptions.length, 1);
	});

	test("testnewElementsAddedDoesNothingIfViewNotCurrentlyVisible", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);

		let pMapView = pMapViewFactory.getFactored(0);
		assert.strictEqual(pMapView.getStartMapCalled(), 0);

		pMap.newElementsAdded();
		assert.strictEqual(pMapView.getStartMapCalled(), 0);

		// unsubscription
		let unsubscriptions = pubSub.getUnsubscriptions();
		assert.deepEqual(unsubscriptions.length, 0);
	});

	test("testnewElementsAddedStartsMapOnlyOnceNoMatterHowManyTimesItIsCalled", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		let view = pMap.getView();
		fixture.appendChild(view);

		let pMapView = pMapViewFactory.getFactored(0);
		assert.strictEqual(pMapView.getStartMapCalled(), 0);

		pMap.newElementsAdded();
		pMap.newElementsAdded();
		pMap.newElementsAdded();
		pMap.newElementsAdded();
		assert.strictEqual(pMapView.getStartMapCalled(), 1);

		// unsubscription
		let unsubscriptions = pubSub.getUnsubscriptions();
		assert.deepEqual(unsubscriptions.length, 1);
	});

	test(
		"testViewJustMadeVisibleStartsMapInViewOnlyAfternewElementsAddedHasBeenCalledAndViewIsCurrentlyVisible",
		function(assert) {
			let pMap = CORA.pMap(dependencies, spec);
			pMap.newElementsAdded();
			let view = pMap.getView();
			fixture.appendChild(view);

			let pMapView = pMapViewFactory.getFactored(0);
			assert.strictEqual(pMapView.getStartMapCalled(), 0);
			pMap.viewJustMadeVisible();
			assert.strictEqual(pMapView.getStartMapCalled(), 1);
		});

	test("testViewJustMadeVisibleDoesNothingIfnewElementsAddedHasNotBeenCalled", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		let view = pMap.getView();
		fixture.appendChild(view);

		let pMapView = pMapViewFactory.getFactored(0);
		assert.strictEqual(pMapView.getStartMapCalled(), 0);
		pMap.viewJustMadeVisible();
		assert.strictEqual(pMapView.getStartMapCalled(), 0);
	});

	test("testViewJustMadeVisibleDoesNothingIfViewCurrentlyNotVisible", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		pMap.newElementsAdded();

		let pMapView = pMapViewFactory.getFactored(0);
		assert.strictEqual(pMapView.getStartMapCalled(), 0);
		pMap.viewJustMadeVisible();
		assert.strictEqual(pMapView.getStartMapCalled(), 0);
	});

	test("testViewJustMadeVisibleOnlyStartsMapOnceNoMatterHowManyTimesItIsCalled", function(
		assert) {
		let pMap = CORA.pMap(dependencies, spec);
		pMap.newElementsAdded();
		let view = pMap.getView();
		fixture.appendChild(view);

		let pMapView = pMapViewFactory.getFactored(0);
		assert.strictEqual(pMapView.getStartMapCalled(), 0);
		pMap.viewJustMadeVisible();
		pMap.viewJustMadeVisible();
		pMap.viewJustMadeVisible();
		pMap.viewJustMadeVisible();
		assert.strictEqual(pMapView.getStartMapCalled(), 1);
	});

	test("testBothValuesSetSetsMarkerInView", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		let view = pMap.getView();
		fixture.appendChild(view);

		let pMapView = pMapViewFactory.getFactored(0);
		assert.strictEqual(pMapView.getMarkerValues(0), undefined);

		let msgLat = {
			path: [],
			data: "60.0"
		};
		let msgLng = {
			path: [],
			data: "55.8"
		};

		pMap.handleSetValueLatitude(msgLat);
		assert.strictEqual(pMapView.getMarkerValues(0), undefined);
		pMap.handleSetValueLongitude(msgLng);
		assert.strictEqual(pMapView.getMarkerValues(0), undefined);

		pMap.newElementsAdded();
		let expectedMarkerValue0 = {
			lat: "60.0",
			lng: "55.8"
		};
		assert.stringifyEqual(pMapView.getMarkerValues(0), expectedMarkerValue0);
	});

	test("testOneRemovedValueRemovesMarkerFromView", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		let view = pMap.getView();
		fixture.appendChild(view);

		let pMapView = pMapViewFactory.getFactored(0);
		assert.strictEqual(pMapView.getMarkerValues(0), undefined);

		let msgLat = {
			path: [],
			data: "60.0"
		};
		let msgLng = {
			path: [],
			data: "55.8"
		};
		let msgNoValue = {
			path: [],
			data: ""
		};

		pMap.handleSetValueLatitude(msgLat);
		pMap.handleSetValueLongitude(msgLng);
		pMap.newElementsAdded();
		assert.stringifyEqual(pMapView.getMarkerValues(0), {
			lat: "60.0",
			lng: "55.8"
		});
		assert.strictEqual(pMapView.getNoOfRemoveMarkerCalls(), 0);

		pMap.handleSetValueLatitude(msgNoValue);
		assert.strictEqual(pMapView.getNoOfRemoveMarkerCalls(), 1);

		pMap.handleSetValueLatitude(msgNoValue);
		assert.strictEqual(pMapView.getNoOfRemoveMarkerCalls(), 1);

		pMap.handleSetValueLatitude(msgLat);
		assert.strictEqual(pMapView.getNoOfRemoveMarkerCalls(), 1);

		pMap.handleSetValueLongitude(msgNoValue);
		assert.strictEqual(pMapView.getNoOfRemoveMarkerCalls(), 2);
	});

	test("testViewSpecInputMode", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		pMap.newElementsAdded();
		let view = pMap.getView();
		fixture.appendChild(view);

		let expectedSpec = {
			mode: "input",
			info: {
				text: "translated_coordinatesGroupText",
				defText: "translated_coordinatesGroupDefText",
				technicalInfo: [{
					text: "textId: coordinatesGroupText",
				}, {
					text: "defTextId: coordinatesGroupDefText",
				}, {
					text: "metadataId: coordinatesGroup",
				}, {
					text: "nameInData: coordinates"
				}, {
					text: "presentationId: coordinatesPGroup"
				}]
			},
			setLatLngMethod: pMap.publishLatLngValues
		};
		assert.stringifyEqual(pMapViewFactory.getSpec(0), expectedSpec);
		assert.notStrictEqual(expectedSpec.setLatLngMethod, undefined);
	});

	test("testViewSpecOutputMode", function(assert) {
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("coordinatesOutputPGroup"));
		let pMap = CORA.pMap(dependencies, spec);
		pMap.newElementsAdded();
		let view = pMap.getView();
		fixture.appendChild(view);
		let expectedSpec = {
			mode: "output",
			info: {
				text: "translated_coordinatesGroupText",
				defText: "translated_coordinatesGroupDefText",
				technicalInfo: [{
					text: "textId: coordinatesGroupText",
				}, {
					text: "defTextId: coordinatesGroupDefText",
				}, {
					text: "metadataId: coordinatesGroup",
				}, {
					text: "nameInData: coordinates"
				}, {
					text: "presentationId: coordinatesPGroup"
				}]
			},
			setLatLngMethod: pMap.publishLatLngValues
		};
		assert.stringifyEqual(pMapViewFactory.getSpec(0), expectedSpec);
		assert.notStrictEqual(expectedSpec.setLatLngMethod, undefined);
	});

	test("testpublishLatLngValuesShouldPublishData", function(assert) {
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("coordinatesPGroup"));
		let pMap = CORA.pMap(dependencies, spec);
		pMap.newElementsAdded();
		pMap.publishLatLngValues(12.4, 33.3);

		let messages = pubSub.getMessages();
		// //console.log(messages)
		assert.strictEqual(messages.length, 2);

		let expectedLatitudeMessage = {
			type: "setValue",
			message: {
				path: ["latitudeTextVar"],
				dataOrigin: "user",
				data: 12.4
			}
		};
		assert.deepEqual(messages[0], expectedLatitudeMessage);
		let expectedLongitudeMessage = {
			type: "setValue",
			message: {
				path: ["longitudeTextVar"],
				dataOrigin: "user",
				data: 33.3
			}
		};
		assert.deepEqual(messages[1], expectedLongitudeMessage);
	});

	test("testGetDependencies", function(assert) {
		let pMap = CORA.pMap(dependencies, spec);
		let dependencies2 = pMap.getDependencies();
		assert.equal(dependencies2, dependencies);
	});
});
