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
"use strict";
QUnit.module("presentation/pMapTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		var metadataProvider = new MetadataCoordinatesProviderStub();
		this.dependencies = {
			metadataProvider : metadataProvider,
			infoFactory : CORATEST.infoFactorySpy(),
			pubSub : CORATEST.pubSubSpy(),
			textProvider : CORATEST.textProviderSpy(),
			pMapViewFactory : CORATEST.standardFactorySpy("pMapViewSpy"),
			jsBookkeeper : CORATEST.jsBookkeeperSpy(),
		};
		this.spec = {
			metadataIdUsedInData : "coordinatesGroup",
			path : [],
			cPresentation : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("coordinatesPGroup")),
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testGetDependencies", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	assert.strictEqual(pMap.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	assert.strictEqual(pMap.getSpec(), this.spec);
});

QUnit.test("testInit", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	assert.strictEqual(pMap.type, "pMap");

	var view = pMap.getView();
	this.fixture.appendChild(view);
	assert.strictEqual(view, this.dependencies.pMapViewFactory.getFactored(0).getView());
	assert.ok(view.modelObject === pMap,
			"modelObject should be a pointer to the javascript object instance");
});

QUnit.test("testInitSubscribesToInitcompleteMessage", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 5);

	var newElementsAddedSubscription = subscriptions[0];
	assert.strictEqual(newElementsAddedSubscription.type, "newElementsAdded");
	assert.deepEqual(newElementsAddedSubscription.path, []);
	assert.strictEqual(newElementsAddedSubscription.functionToCall, pMap.newElementsAdded);

	var setLatitudeSubscription = subscriptions[1];
	assert.strictEqual(setLatitudeSubscription.type, "setValue");
	var latitudePath = ["latitudeTextVar"];
	assert.stringifyEqual(setLatitudeSubscription.path, latitudePath);
	assert.strictEqual(setLatitudeSubscription.functionToCall, pMap.handleSetValueLatitude);

	var setLongitudeSubscription = subscriptions[2];
	assert.strictEqual(setLongitudeSubscription.type, "setValue");
	var longitudePath = ["longitudeTextVar"];
	assert.stringifyEqual(setLongitudeSubscription.path, longitudePath);
	assert.strictEqual(setLongitudeSubscription.functionToCall, pMap.handleSetValueLongitude);

	var viewJustMadeVisibleSubscription = subscriptions[3];
	assert.strictEqual(viewJustMadeVisibleSubscription.type, "viewJustMadeVisible");
	assert.deepEqual(viewJustMadeVisibleSubscription.path, []);
	assert.strictEqual(viewJustMadeVisibleSubscription.functionToCall, pMap.viewJustMadeVisible);

	var presentationShownSubscription = subscriptions[4];
	assert.strictEqual(presentationShownSubscription.type, "presentationShown");
	assert.deepEqual(presentationShownSubscription.path, []);
	assert.strictEqual(presentationShownSubscription.functionToCall, pMap.viewJustMadeVisible);

});

QUnit.test("testnewElementsAddedStartsMapInViewAndUnsubscribesToInitcompleteMessage", function(
		assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	var view = pMap.getView();
	this.fixture.appendChild(view);

	var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
	assert.strictEqual(pMapView.getStartMapCalled(), 0);

	pMap.newElementsAdded();
	assert.strictEqual(pMapView.getStartMapCalled(), 1);

	// unsubscription
	var unsubscriptions = this.dependencies.pubSub.getUnsubscriptions();
	assert.deepEqual(unsubscriptions.length, 1);
});

QUnit.test("testnewElementsAddedDoesNothingIfViewNotCurrentlyVisible", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);

	var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
	assert.strictEqual(pMapView.getStartMapCalled(), 0);

	pMap.newElementsAdded();
	assert.strictEqual(pMapView.getStartMapCalled(), 0);

	// unsubscription
	var unsubscriptions = this.dependencies.pubSub.getUnsubscriptions();
	assert.deepEqual(unsubscriptions.length, 0);
});

QUnit.test("testnewElementsAddedStartsMapOnlyOnceNoMatterHowManyTimesItIsCalled", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	var view = pMap.getView();
	this.fixture.appendChild(view);

	var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
	assert.strictEqual(pMapView.getStartMapCalled(), 0);

	pMap.newElementsAdded();
	pMap.newElementsAdded();
	pMap.newElementsAdded();
	pMap.newElementsAdded();
	assert.strictEqual(pMapView.getStartMapCalled(), 1);

	// unsubscription
	var unsubscriptions = this.dependencies.pubSub.getUnsubscriptions();
	assert.deepEqual(unsubscriptions.length, 1);
});
QUnit
		.test(
				"testViewJustMadeVisibleStartsMapInViewOnlyAfternewElementsAddedHasBeenCalledAndViewIsCurrentlyVisible",
				function(assert) {
					var pMap = CORA.pMap(this.dependencies, this.spec);
					pMap.newElementsAdded();
					var view = pMap.getView();
					this.fixture.appendChild(view);

					var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
					assert.strictEqual(pMapView.getStartMapCalled(), 0);
					pMap.viewJustMadeVisible();
					assert.strictEqual(pMapView.getStartMapCalled(), 1);
				});
QUnit.test("testViewJustMadeVisibleDoesNothingIfnewElementsAddedHasNotBeenCalled",
		function(assert) {
			var pMap = CORA.pMap(this.dependencies, this.spec);
			// pMap.newElementsAdded();
			var view = pMap.getView();
			this.fixture.appendChild(view);

			var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
			assert.strictEqual(pMapView.getStartMapCalled(), 0);
			pMap.viewJustMadeVisible();
			assert.strictEqual(pMapView.getStartMapCalled(), 0);
		});
QUnit.test("testViewJustMadeVisibleDoesNothingIfViewCurrentlyNotVisible", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	pMap.newElementsAdded();
	// var view = pMap.getView();
	// this.fixture.appendChild(view);

	var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
	assert.strictEqual(pMapView.getStartMapCalled(), 0);
	pMap.viewJustMadeVisible();
	assert.strictEqual(pMapView.getStartMapCalled(), 0);
});
QUnit.test("testViewJustMadeVisibleOnlyStartsMapOnceNoMatterHowManyTimesItIsCalled", function(
		assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	pMap.newElementsAdded();
	var view = pMap.getView();
	this.fixture.appendChild(view);

	var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
	assert.strictEqual(pMapView.getStartMapCalled(), 0);
	pMap.viewJustMadeVisible();
	pMap.viewJustMadeVisible();
	pMap.viewJustMadeVisible();
	pMap.viewJustMadeVisible();
	assert.strictEqual(pMapView.getStartMapCalled(), 1);
});

QUnit.test("testBothValuesSetSetsMarkerInView", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	var view = pMap.getView();
	this.fixture.appendChild(view);

	var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
	assert.strictEqual(pMapView.getMarkerValues(0), undefined);

	var msgLat = {
		"path" : [],
		"data" : "60.0"
	};
	var msgLng = {
		"path" : [],
		"data" : "55.8"
	};

	pMap.handleSetValueLatitude(msgLat);
	assert.strictEqual(pMapView.getMarkerValues(0), undefined);
	pMap.handleSetValueLongitude(msgLng);
	assert.strictEqual(pMapView.getMarkerValues(0), undefined);

	pMap.newElementsAdded();
	assert.stringifyEqual(pMapView.getMarkerValues(0), {
		"lat" : "60.0",
		"lng" : "55.8"
	});
});

QUnit.test("testOneRemovedValueRemovesMarkerFromView", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	var view = pMap.getView();
	this.fixture.appendChild(view);

	var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
	assert.strictEqual(pMapView.getMarkerValues(0), undefined);

	var msgLat = {
		"path" : [],
		"data" : "60.0"
	};
	var msgLng = {
		"path" : [],
		"data" : "55.8"
	};
	var msgNoValue = {
		"path" : [],
		"data" : ""
	};

	pMap.handleSetValueLatitude(msgLat);
	pMap.handleSetValueLongitude(msgLng);
	pMap.newElementsAdded();
	assert.stringifyEqual(pMapView.getMarkerValues(0), {
		"lat" : "60.0",
		"lng" : "55.8"
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

QUnit.test("testViewSpecInputMode", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	pMap.newElementsAdded();
	var view = pMap.getView();
	this.fixture.appendChild(view);

	// var infoFactory = this.dependencies.infoFactory;
	// var firstFactoredInfo = infoFactory.getFactored(0);
	// var firstFactoredInfosButton = firstFactoredInfo.getButton();
	//
	// var infoButton = view.childNodes[0];
	// assert.equal(infoButton, firstFactoredInfosButton);

	// var expectedInfoSpec = {
	// "level1" : [ {
	// "className" : "textView",
	// "text" : "translated_coordinatesGroupText"
	// }, {
	// "className" : "defTextView",
	// "text" : "translated_coordinatesGroupDefText"
	// } ],
	// "level2" : [ {
	// "className" : "textIdView",
	// "text" : "textId: coordinatesGroupText"
	// }, {
	// "className" : "defTextIdView",
	// "text" : "defTextId: coordinatesGroupDefText"
	// }, {
	// "className" : "metadataIdView",
	// "text" : "metadataId: coordinatesGroup"
	// }, {
	// "className" : "technicalView",
	// "text" : "nameInData: coordinates"
	// }, {
	// "className" : "technicalView",
	// "text" : "presentationId: coordinatesPGroup"
	// } ],
	// "insertAfter" : infoButton
	// };
	// var spec = {
	// "appendTo" : this.fixture,
	// "level1" : [ {
	// "className" : "textView",
	// "text" : "someText"
	// }, {
	// "className" : "defTextView",
	// "text" : "someDefText"
	// } ],
	// "level2" : [ {
	// "className" : "metadataIdView",
	// "text" : "someMetadataText"
	// }, {
	// "className" : "regExView",
	// "text" : "someRegEx"
	// } ]
	// };
	// assert.stringifyEqual(firstFactoredInfo.getSpec(), expectedInfoSpec);
	var expectedSpec = {
		"mode" : "input",
		// "inputType" : getInputType(),
		// "outputFormat" : outputFormat,
		// "presentationId" : presentationId,
		"info" : {
			"text" : "translated_coordinatesGroupText",
			"defText" : "translated_coordinatesGroupDefText",
			"technicalInfo" : [ {
				"text" : "textId: coordinatesGroupText",
			// onclickMethod : openTextIdRecord
			}, {
				"text" : "defTextId: coordinatesGroupDefText",
			// onclickMethod : openDefTextIdRecord
			}, {
				"text" : "metadataId: coordinatesGroup",
			// onclickMethod : openMetadataIdRecord
			}, {
				"text" : "nameInData: coordinates"
			// }, {
			// "text" : "regEx: " + regEx
			}, {
				"text" : "presentationId: coordinatesPGroup"
			} ]
		},
		setLatLngMethod : pMap.publishLatLngValues
	};
	assert.stringifyEqual(this.dependencies.pMapViewFactory.getSpec(0), expectedSpec);
	assert.notStrictEqual(expectedSpec.setLatLngMethod, undefined);
});
QUnit.test("testViewSpecOutputMode", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("coordinatesOutputPGroup"));
	var pMap = CORA.pMap(this.dependencies, this.spec);
	pMap.newElementsAdded();
	var view = pMap.getView();
	this.fixture.appendChild(view);
	var expectedSpec = {
		"mode" : "output",
		// "inputType" : getInputType(),
		// "outputFormat" : outputFormat,
		// "presentationId" : presentationId,
		"info" : {
			"text" : "translated_coordinatesGroupText",
			"defText" : "translated_coordinatesGroupDefText",
			"technicalInfo" : [ {
				"text" : "textId: coordinatesGroupText",
			// onclickMethod : openTextIdRecord
			}, {
				"text" : "defTextId: coordinatesGroupDefText",
			// onclickMethod : openDefTextIdRecord
			}, {
				"text" : "metadataId: coordinatesGroup",
			// onclickMethod : openMetadataIdRecord
			}, {
				"text" : "nameInData: coordinates"
			// }, {
			// "text" : "regEx: " + regEx
			}, {
				"text" : "presentationId: coordinatesPGroup"
			} ]
		},
		setLatLngMethod : pMap.publishLatLngValues
	};
	assert.stringifyEqual(this.dependencies.pMapViewFactory.getSpec(0), expectedSpec);
	assert.notStrictEqual(expectedSpec.setLatLngMethod, undefined);
});

QUnit.test("testpublishLatLngValuesShouldPublishData", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("coordinatesPGroup"));
	var pMap = CORA.pMap(this.dependencies, this.spec);
	pMap.newElementsAdded();
	pMap.publishLatLngValues(12.4, 33.3);

	var messages = this.dependencies.pubSub.getMessages();
	// console.log(messages)
	assert.strictEqual(messages.length, 2);

	var latitudeMessage = messages[0];
	assert.strictEqual(latitudeMessage.type, "setValue");
	assert.strictEqual(latitudeMessage.message.data, 12.4);
	assert.stringifyEqual(latitudeMessage.message.path, ["latitudeTextVar"]);

	var longitudeMessage = messages[1];
	assert.strictEqual(longitudeMessage.type, "setValue");
	assert.strictEqual(longitudeMessage.message.data, 33.3);
	assert.stringifyEqual(longitudeMessage.message.path, ["longitudeTextVar"]);

});

QUnit.test("testGetDependencies", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	var dependencies = pMap.getDependencies();
	assert.equal(dependencies, this.dependencies);
});
