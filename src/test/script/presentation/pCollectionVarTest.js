/*
 * Copyright 2016 Uppsala University Library
 * 
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.attachedPCollectionVarFactory = function(metadataProvider, pubSub, textProvider, jsBookkeeper,
			fixture) {
		var factor = function(path, pCollectionVarPresentationId) {
			var cPCollectionVarPresentation = CORA.coraData(metadataProvider
					.getMetadataById(pCollectionVarPresentationId));

			var spec = {
				"path" : path,
				"cPresentation" : cPCollectionVarPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper
			};
			var pCollectionVar = CORA.pCollectionVar(spec);
			var view = pCollectionVar.getView();
			fixture.appendChild(view);
			var valueView = view.firstChild;
			return {
				pCollectionVar : pCollectionVar,
				fixture : fixture,
				valueView : valueView,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				textProvider : textProvider,
				jsBookkeeper : jsBookkeeper,
				view : view
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("pCollectionVarTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.pCollectionVarFactory = CORATEST.attachedPCollectionVarFactory(this.metadataProvider, this.pubSub,
				this.textProvider, this.jsBookkeeper, this.fixture);
	},
	afterEach : function() {
	}
});

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.testCollectionVariableSubscription = function(attachedPCollectionVar, assert) {
		var subscriptions = attachedPCollectionVar.pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 2);

		var firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, {});
		var pCollectionVar = attachedPCollectionVar.pCollectionVar;
		assert.ok(firstSubsription.functionToCall === pCollectionVar.handleMsg);

		var secondSubsription = subscriptions[1];
		assert.strictEqual(secondSubsription.type, "validationError");
		assert.deepEqual(secondSubsription.path, {});
		var pCollectionVar = attachedPCollectionVar.pCollectionVar;
		assert.ok(secondSubsription.functionToCall === pCollectionVar.handleValidationError);

	};
//
	coraTest.testVariableMetadata = function(attachedPCollectionVar, assert) {
		var pCollectionVar = attachedPCollectionVar.pCollectionVar;
		assert.strictEqual(pCollectionVar.getText(), "Exempel textvariabel");
		assert.strictEqual(pCollectionVar.getDefText(), "Detta är en exempeldefinition "
				+ "för en textvariabel.");
		assert.strictEqual(pCollectionVar.getRegEx(), "^[0-9A-Öa-ö\\s!*.]{2,50}$");
	};

	coraTest.testJSBookkeeperNoCall = function(jsBookkeeper, assert) {
		var dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 0);
	};
	coraTest.testJSBookkeeperOneCallWithValue = function(jsBookkeeper, value, assert) {
		var dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 1);
		assert.strictEqual(dataArray[0].data, value);
	};
	return coraTest;
}(CORATEST || {}));

QUnit.test("testInitInfoButtonCollectionVariable", function(assert) {
	var attachedPCollectionVar = this.pCollectionVarFactory.factor({}, "userSuppliedIdCollectionVarPCollVar");
	assert.strictEqual(attachedPCollectionVar.pCollectionVar.type, "pCollVar");
	assert.deepEqual(attachedPCollectionVar.view.className, "pCollVar userSuppliedIdCollectionVarPCollVar");
	var view = attachedPCollectionVar.view;
	var infoButton = view.childNodes[1];

	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "infoButton");

	var event = document.createEvent('Event');
	infoButton.onclick(event);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(attachedPCollectionVar.view.className));
	assert.equal(view.childNodes.length, 3);

	var infoView = view.childNodes[2];
	assert.equal(infoView.childNodes.length, 2);
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView",
			"userSuppliedIdCollectionVarText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"userSuppliedIdCollectionVarDefText", assert);

	infoButton.onclick(event);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(attachedPCollectionVar.view.className));
	assert.equal(view.childNodes.length, 3);
	assert.equal(infoView.childNodes.length, 5);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "textIdView",
			"textId: userSuppliedIdCollectionVarText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "defTextIdView",
			"defTextId: userSuppliedIdCollectionVarDefText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[4], "metadataIdView",
			"metadataId: userSuppliedIdCollectionVar", assert);
	
	infoButton.onclick(event);
	assert.notOk(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(attachedPCollectionVar.view.className));
	assert.equal(view.childNodes.length, 2);

	infoButton.onclick(event);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(attachedPCollectionVar.view.className));
	assert.equal(view.childNodes.length, 3);
});

QUnit.test("testInitCollection", function(assert) {
	var attachedPCollectionVar = this.pCollectionVarFactory.factor({}, "userSuppliedIdCollectionVarPCollVar");
	assert.strictEqual(attachedPCollectionVar.pCollectionVar.type, "pCollVar");
	assert.deepEqual(attachedPCollectionVar.view.className, "pCollVar userSuppliedIdCollectionVarPCollVar");
	var view = attachedPCollectionVar.view;
	assert.ok(view.modelObject === attachedPCollectionVar.pCollectionVar);
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPCollectionVar.valueView;
	assert.equal(valueView.nodeName, "SELECT");
	assert.equal(valueView.type, "select-one");
	// assert.equal(valueView.value, "");

	var options = valueView.childNodes;
	assert.equal(options[0].nodeName, "OPTION");
	assert.equal(options[0].text, "-- Gör ett val ur listan --");
	assert.equal(options[0].value, "");
	assert.equal(options[0].selected, true);

	assert.equal(options[1].nodeName, "OPTION");
	assert.equal(options[1].text, "false");
	assert.equal(options[1].value, "false");

	CORATEST.testCollectionVariableSubscription(attachedPCollectionVar, assert);
//
	var pCollectionVar = attachedPCollectionVar.pCollectionVar;
	assert.strictEqual(pCollectionVar.getText(), "userSuppliedIdCollectionVarText");
	assert.strictEqual(pCollectionVar.getDefText(), "userSuppliedIdCollectionVarDefText");

	assert.equal(attachedPCollectionVar.pCollectionVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitCollectionNoEmptyTextId", function(assert) {
	var attachedPCollectionVar = this.pCollectionVarFactory.factor({}, "userSuppliedIdNoEmptyTextIdCollectionVarPCollVar");
	assert.strictEqual(attachedPCollectionVar.pCollectionVar.type, "pCollVar");
	assert.deepEqual(attachedPCollectionVar.view.className, "pCollVar userSuppliedIdNoEmptyTextIdCollectionVarPCollVar");
	var view = attachedPCollectionVar.view;
	assert.ok(view.modelObject === attachedPCollectionVar.pCollectionVar);
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPCollectionVar.valueView;
	assert.equal(valueView.nodeName, "SELECT");
	assert.equal(valueView.type, "select-one");
	// assert.equal(valueView.value, "");

	var options = valueView.childNodes;
	assert.equal(options[0].nodeName, "OPTION");
	assert.equal(options[0].text, "false");
	assert.equal(options[0].value, "false");

	CORATEST.testCollectionVariableSubscription(attachedPCollectionVar, assert);

	var pCollectionVar = attachedPCollectionVar.pCollectionVar;
	assert.strictEqual(pCollectionVar.getText(), "userSuppliedIdCollectionVarText");
	assert.strictEqual(pCollectionVar.getDefText(), "userSuppliedIdCollectionVarDefText");

	assert.equal(attachedPCollectionVar.pCollectionVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});


QUnit.test("testInitCollectionOutput", function(assert) {
	var attachedPCollectionVar = this.pCollectionVarFactory.factor({}, "userSuppliedIdCollectionVarOutputPCollVar");
	assert.deepEqual(attachedPCollectionVar.view.className, "pCollVar userSuppliedIdCollectionVarOutputPCollVar");
	var view = attachedPCollectionVar.view;
	assert.ok(view.modelObject === attachedPCollectionVar.pCollectionVar);
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPCollectionVar.valueView;
	assert.equal(valueView.nodeName, "SPAN");
	assert.equal(valueView.innerHTML, "");

	CORATEST.testCollectionVariableSubscription(attachedPCollectionVar, assert);
});

//QUnit.test("testSetValueTextOutput", function(assert) {
//	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableIdOutput");
//	var valueView = attachedPVar.valueView;
//
//	attachedPVar.pVar.setValue("A Value");
//	assert.equal(valueView.innerHTML, "A Value");
//});
//QUnit.test("testSetValueTextOutputFormatImage", function(assert) {
//	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableIdOutputImage");
//	var valueView = attachedPVar.valueView;
//
//	attachedPVar.pVar.setValue("http://www.some.domain.nu/image01.jpg");
//	assert.equal(valueView.src, "http://www.some.domain.nu/image01.jpg");
//});
//
//QUnit.test("testSetValueCollectionOutput", function(assert) {
//	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownOutputPVar");
//	var valueView = attachedPVar.valueView;
//
//	attachedPVar.pVar.setValue("yes");
//	assert.equal(valueView.innerHTML, "Ja");
//	attachedPVar.pVar.setValue("no");
//	assert.equal(valueView.innerHTML, "Nej");
//});
//
//QUnit.test("testSetValueCollectionOutputEmptyTextId", function(assert) {
//	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownOutputPVar");
//	var valueView = attachedPVar.valueView;
//
//	attachedPVar.pVar.setValue("no");
//	assert.equal(valueView.innerHTML, "Nej");
//	attachedPVar.pVar.setValue("");
//	assert.equal(valueView.innerHTML, "");
//});
//
//QUnit.test("testHandleValidationErrorResetBySetValue", function(assert) {
//	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
//	var message = {
//		"metadataId" : "textVariableId",
//		"path" : {}
//	};
//	attachedPVar.pVar.handleValidationError(message);
//	assert.equal(attachedPVar.pVar.getState(), "error");
//	assert.ok(new RegExp("^(.*\\s)*error(\\s.*)*$").test(attachedPVar.view.className));
//
//	var data = {
//		"data" : "A new value",
//		"path" : {}
//	};
//	attachedPVar.pVar.handleMsg(data);
//
//	assert.strictEqual(attachedPVar.view.className, "pVar pVarTextVariableId");
//});
