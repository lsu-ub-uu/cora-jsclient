/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2017 Olov McKie
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
	coraTest.attachedPCollectionVarFactory = function(metadataProvider, pubSub, textProvider,
		jsBookkeeper, fixture) {
		let factor = function(path, pCollectionVarPresentationId) {
			let cPCollectionVarPresentation = CORA.coraData(metadataProvider
				.getMetadataById(pCollectionVarPresentationId));
			let dependencies = {
				"metadataProvider": metadataProvider,
				"pubSub": pubSub,
				"textProvider": textProvider,
				"jsBookkeeper": jsBookkeeper
			};
			let spec = {
				"path": path,
				"cPresentation": cPCollectionVarPresentation
			};
			let pCollectionVar = CORA.pCollectionVar(dependencies, spec);
			let view = pCollectionVar.getView();
			fixture.appendChild(view);
			let valueView = view.firstChild;
			return {
				pCollectionVar: pCollectionVar,
				fixture: fixture,
				valueView: valueView,
				metadataProvider: metadataProvider,
				pubSub: pubSub,
				textProvider: textProvider,
				jsBookkeeper: jsBookkeeper,
				view: view
			};

		};
		return Object.freeze({
			factor: factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("presentation/pCollectionVarTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.pCollectionVarFactory = CORATEST.attachedPCollectionVarFactory(this.metadataProvider,
			this.pubSub, this.textProvider, this.jsBookkeeper, this.fixture);

		this.dependencies = {
			metadataProvider: this.metadataProvider,
			pubSub: this.pubSub,
			textProvider: this.textProvider,
			jsBookkeeper: this.jsBookkeeper
		};
		this.pCollectionVarPresentationId = "userSuppliedIdCollectionVarPCollVar";
		let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
			.getMetadataById(this.pCollectionVarPresentationId));
		this.spec = {
			"path": {},
			"cPresentation": cPCollectionVarPresentation
		};
	},
	afterEach: function() {
	}
});
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.testCollectionVariableSubscription = function(attachedPCollectionVar, assert) {
		let subscriptions = attachedPCollectionVar.pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 3);

		let firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, {});
		let pCollectionVar = attachedPCollectionVar.pCollectionVar;
		assert.ok(firstSubsription.functionToCall === pCollectionVar.handleMsg);

		let secondSubsription = subscriptions[1];
		assert.strictEqual(secondSubsription.type, "validationError");
		assert.deepEqual(secondSubsription.path, {});
		pCollectionVar = attachedPCollectionVar.pCollectionVar;
		assert.ok(secondSubsription.functionToCall === pCollectionVar.handleValidationError);

	};

	coraTest.testVariableMetadata = function(attachedPCollectionVar, assert) {
		let pCollectionVar = attachedPCollectionVar.pCollectionVar;
		assert.strictEqual(pCollectionVar.getText(), "Exempel textvariabel");
		assert.strictEqual(pCollectionVar.getDefText(), "Detta är en exempeldefinition "
			+ "för en textvariabel.");
		assert.strictEqual(pCollectionVar.getRegEx(), "^[0-9A-Öa-ö\\s!*.]{2,50}$");
	};

	coraTest.testJSBookkeeperNoCall = function(jsBookkeeper, assert) {
		let dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 0);
	};
	coraTest.testJSBookkeeperOneCallWithValue = function(jsBookkeeper, value, assert) {
		let dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 1);
		assert.strictEqual(dataArray[0].data, value);
	};
	return coraTest;
}(CORATEST || {}));

QUnit.test("testGetDependencies", function(assert) {
	this.pCollectionVarPresentationId = "userSuppliedIdCollectionVarPCollVar";
	let pCollectionVar = CORA.pCollectionVar(this.dependencies, this.spec);
	assert.strictEqual(pCollectionVar.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	this.pCollectionVarPresentationId = "userSuppliedIdCollectionVarPCollVar";
	let pCollectionVar = CORA.pCollectionVar(this.dependencies, this.spec);
	assert.strictEqual(pCollectionVar.getSpec(), this.spec);
});


QUnit.test("testInitInfoButtonCollectionVariable", function(assert) {
	let attachedPCollectionVar = this.pCollectionVarFactory.factor({},
		"userSuppliedIdCollectionVarPCollVar");
	assert.strictEqual(attachedPCollectionVar.pCollectionVar.type, "pCollVar");
	assert.deepEqual(attachedPCollectionVar.view.className,
		"pCollVar userSuppliedIdCollectionVarPCollVar");
	let view = attachedPCollectionVar.view;
	let infoButton = view.childNodes[1];

	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "iconButton infoButton");

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$")
		.test(attachedPCollectionVar.view.className));
	assert.equal(view.childNodes.length, 3);

	let infoView = view.childNodes[2];
	assert.equal(infoView.childNodes.length, 2);
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView",
		"userSuppliedIdCollectionVarText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
		"userSuppliedIdCollectionVarDefText", assert);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$")
		.test(attachedPCollectionVar.view.className));
	assert.equal(view.childNodes.length, 3);
	assert.equal(infoView.childNodes.length, 7);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "textIdView",
		"textId: userSuppliedIdCollectionVarText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "defTextIdView",
		"defTextId: userSuppliedIdCollectionVarDefText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[4], "metadataIdView",
		"metadataId: userSuppliedIdCollectionVar", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[5], "technicalView",
		"nameInData: userSuppliedId", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[6], "technicalView",
		"presentationId: userSuppliedIdCollectionVarPCollVar", assert);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.notOk(new RegExp("^(.*\\s)*infoActive(\\s.*)*$")
		.test(attachedPCollectionVar.view.className));
	assert.equal(view.childNodes.length, 2);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$")
		.test(attachedPCollectionVar.view.className));
	assert.equal(view.childNodes.length, 3);
});

QUnit.test("testInitCollection", function(assert) {
	let attachedPCollectionVar = this.pCollectionVarFactory.factor({},
		"userSuppliedIdCollectionVarPCollVar");
	assert.strictEqual(attachedPCollectionVar.pCollectionVar.type, "pCollVar");
	assert.deepEqual(attachedPCollectionVar.view.className,
		"pCollVar userSuppliedIdCollectionVarPCollVar");
	let view = attachedPCollectionVar.view;
	assert.ok(view.modelObject === attachedPCollectionVar.pCollectionVar);
	assert.equal(view.childNodes.length, 2);

	let valueView = attachedPCollectionVar.valueView;
	assert.equal(valueView.nodeName, "SELECT");
	assert.equal(valueView.type, "select-one");
	assert.equal(valueView.value, "");

	let options = valueView.childNodes;
	assert.equal(options[0].nodeName, "OPTION");
	assert.equal(options[0].text, "-- Gör ett val ur listan --");
	assert.equal(options[0].value, "");
	assert.equal(options[0].selected, true);

	assert.equal(options[1].nodeName, "OPTION");
	assert.equal(options[1].text, "false");
	assert.equal(options[1].value, "false");

	CORATEST.testCollectionVariableSubscription(attachedPCollectionVar, assert);

	let pCollectionVar = attachedPCollectionVar.pCollectionVar;
	assert.strictEqual(pCollectionVar.getText(), "userSuppliedIdCollectionVarText");
	assert.strictEqual(pCollectionVar.getDefText(), "userSuppliedIdCollectionVarDefText");

	assert.equal(attachedPCollectionVar.pCollectionVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitCollectionNoEmptyTextId", function(assert) {
	let attachedPCollectionVar = this.pCollectionVarFactory.factor({},
		"userSuppliedIdNoEmptyTextIdCollectionVarPCollVar");
	assert.strictEqual(attachedPCollectionVar.pCollectionVar.type, "pCollVar");
	assert.deepEqual(attachedPCollectionVar.view.className,
		"pCollVar userSuppliedIdNoEmptyTextIdCollectionVarPCollVar");
	let view = attachedPCollectionVar.view;
	assert.ok(view.modelObject === attachedPCollectionVar.pCollectionVar);
	assert.ok(view.childNodes.length, 2);

	let valueView = attachedPCollectionVar.valueView;
	assert.equal(valueView.nodeName, "SELECT");
	assert.equal(valueView.type, "select-one");

	let options = valueView.childNodes;
	assert.equal(options[0].nodeName, "OPTION");
	assert.equal(options[0].text, "false");
	assert.equal(options[0].value, "false");

	CORATEST.testCollectionVariableSubscription(attachedPCollectionVar, assert);

	let pCollectionVar = attachedPCollectionVar.pCollectionVar;
	assert.strictEqual(pCollectionVar.getText(), "userSuppliedIdCollectionVarText");
	assert.strictEqual(pCollectionVar.getDefText(), "userSuppliedIdCollectionVarDefText");

	assert.equal(attachedPCollectionVar.pCollectionVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testSetValueCollectionInput", function(assert) {
	let attachedPCollectionVar = this.pCollectionVarFactory.factor({},
		"userSuppliedIdCollectionVarPCollVar");
	attachedPCollectionVar.pCollectionVar.setValue("true");
	assert.equal(attachedPCollectionVar.valueView.value, "true");
});

QUnit.test("testChangedValueOk", function(assert) {
	let attachedPCollectionVar = this.pCollectionVarFactory.factor({},
		"userSuppliedIdCollectionVarPCollVar");
	attachedPCollectionVar.valueView.value = "true";
	attachedPCollectionVar.valueView.onblur();
	assert.equal(attachedPCollectionVar.pCollectionVar.getState(), "ok");
	assert.equal(attachedPCollectionVar.view.className,
		"pCollVar userSuppliedIdCollectionVarPCollVar");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "true", assert);
	attachedPCollectionVar.valueView.onblur();
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "true", assert);

});

QUnit.test("testInitCollectionOutput", function(assert) {
	let attachedPCollectionVar = this.pCollectionVarFactory.factor({},
		"userSuppliedIdCollectionVarOutputPCollVar");
	assert.deepEqual(attachedPCollectionVar.view.className,
		"pCollVar userSuppliedIdCollectionVarOutputPCollVar");
	let view = attachedPCollectionVar.view;
	assert.ok(view.modelObject === attachedPCollectionVar.pCollectionVar);
	assert.ok(view.childNodes.length, 2);

	let valueView = attachedPCollectionVar.valueView;
	assert.equal(valueView.nodeName, "SPAN");
	assert.equal(valueView.className, "value");
	assert.equal(valueView.innerHTML, "");

	CORATEST.testCollectionVariableSubscription(attachedPCollectionVar, assert);
});

QUnit.test("testSetValueCollectionInputEmptyTextId", function(assert) {
	let attachedPCollectionVar = this.pCollectionVarFactory.factor({},
		"yesNoUnknownPCollVar");

	let view = attachedPCollectionVar.view;
	assert.ok(view.modelObject === attachedPCollectionVar.pCollectionVar);
	assert.ok(view.childNodes.length, 3);

	let valueView = attachedPCollectionVar.valueView;
	assert.equal(valueView.nodeName, "SELECT");
	assert.equal(valueView.type, "select-one");

	let options = valueView.childNodes;
	assert.equal(options[0].nodeName, "OPTION");
	assert.equal(options[0].text, "-- Gör ett val ur listan --");
	assert.equal(options[0].value, "");

	assert.equal(options[1].nodeName, "OPTION");
	assert.equal(options[1].text, "Ja");
	assert.equal(options[1].value, "yes");
});

QUnit.test("testSetValueCollectionOutputEmptyTextId", function(assert) {
	let attachedPCollectionVar = this.pCollectionVarFactory.factor({},
		"userSuppliedIdCollectionVarOutputPCollVar");
	let valueView = attachedPCollectionVar.valueView;

	attachedPCollectionVar.pCollectionVar.setValue("false");
	assert.equal(valueView.innerHTML, "false");
	attachedPCollectionVar.pCollectionVar.setValue("");
	assert.equal(valueView.innerHTML, "");
});

QUnit.test("testHandleMessage", function(assert) {
	let attachedPCollectionVar = this.pCollectionVarFactory.factor({},
		"userSuppliedIdCollectionVarOutputPCollVar");
	let data = {
		"data": "false",
		"path": {}
	};
	attachedPCollectionVar.pCollectionVar.handleMsg(data);
	assert.equal(attachedPCollectionVar.valueView.innerHTML, "false");
});

QUnit.test("testHandleValidationError", function(assert) {
	let attachedPCollectionVar = CORATEST.createAttachedPCollectionVarWithError(this);
	assert.equal(attachedPCollectionVar.pCollectionVar.getState(), "error");
	assert.ok(new RegExp("^(.*\\s)*error(\\s.*)*$").test(attachedPCollectionVar.view.className));
});

CORATEST.createAttachedPCollectionVarWithError = function(testScope) {
	let attachedPCollectionVar = testScope.pCollectionVarFactory.factor({},
		"userSuppliedIdCollectionVarPCollVar");
	let message = {
		"metadataId": "userSuppliedIdCollectionVar",
		"path": {}
	};
	attachedPCollectionVar.pCollectionVar.handleValidationError(message);
	return attachedPCollectionVar;
};

QUnit.test("testHandleValidationErrorResetBySetValue", function(assert) {
	let attachedPCollectionVar = CORATEST.createAttachedPCollectionVarWithError(this);
	assert.equal(attachedPCollectionVar.pCollectionVar.getState(), "error");
	assert.ok(new RegExp("^(.*\\s)*error(\\s.*)*$").test(attachedPCollectionVar.view.className));

	let data = {
		"data": "false",
		"path": {}
	};
	attachedPCollectionVar.pCollectionVar.handleMsg(data);

	assert.equal(attachedPCollectionVar.pCollectionVar.getState(), "ok");
	assert.strictEqual(attachedPCollectionVar.view.className,
		"pCollVar userSuppliedIdCollectionVarPCollVar");
});

QUnit.test("testHandleValidationErrorResetByChangingValue", function(assert) {
	let attachedPCollectionVar = CORATEST.createAttachedPCollectionVarWithError(this);
	attachedPCollectionVar.valueView.value = "false";
	attachedPCollectionVar.valueView.onblur();
	let jsBookkeeper = this.jsBookkeeper;
	let dataArray = jsBookkeeper.getDataArray();
	assert.strictEqual(dataArray.length, 1);
	assert.strictEqual(dataArray[0].data, "false");
});

QUnit.test("testPubSubMessagesWithFirstLevelPath", function(assert) {
	let firstLevelPath = CORATEST.firstLevelPath;

	let expectedPath = {
		"name": "linkedPath",
		"children": [{
			"name": "nameInData",
			"value": "textVariableId"
		}]
	};
	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
	let spec = {
		path: firstLevelPath,
		cPresentation: cPCollectionVarPresentation
	};

	let pCollectionVar = CORA.pCollectionVar(this.dependencies, spec);
	let subscriptions = this.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	let disableSubscription = subscriptions[2];

	assert.strictEqual(disableSubscription.type, "disable");
	assert.deepEqual(disableSubscription.path, expectedPath);
	assert.ok(pCollectionVar.disableCollectionVar);
	assert.ok(disableSubscription.functionToCall === pCollectionVar.disableCollectionVar);
});

QUnit.test("testDisablePubSubMessagesWithFirstLevelPathWithRepeatId", function(assert) {
	let firstLevelPath = CORATEST.firstLevelPathWithRepeatId;

	let expectedPath = {
		"name": "linkedPath",
		"children": [{
			"name": "nameInData",
			"value": "textVariableId"
		}]
	};
	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
	let spec = {
		path: firstLevelPath,
		cPresentation: cPCollectionVarPresentation
	};

	let pCollectionVar = CORA.pCollectionVar(this.dependencies, spec);
	let subscriptions = this.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	let disableSubscription = subscriptions[2];

	assert.strictEqual(disableSubscription.type, "disable");
	assert.deepEqual(disableSubscription.path, expectedPath);
	assert.ok(pCollectionVar.disableCollectionVar);
	assert.ok(disableSubscription.functionToCall === pCollectionVar.disableCollectionVar);
});

QUnit.test("testPubSubMessagesWithTwoLevelPath", function(assert) {
	let pathWithTwoLevels = CORATEST.pathWithTwoLevels;

	let expectedPath = {
		"name": "linkedPath",
		"children": [{
			"name": "nameInData",
			"value": "recordInfo"
		}, {
			"name": "linkedPath",
			"children": [{
				"name": "nameInData",
				"value": "dataDivider"
			}]
		}]
	};
	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
	let spec = {
		path: pathWithTwoLevels,
		cPresentation: cPCollectionVarPresentation
	};

	CORA.pCollectionVar(this.dependencies, spec);
	let subscriptions = this.pubSub.getSubscriptions();

	let disableSubscription = subscriptions[2];
	assert.deepEqual(disableSubscription.path, expectedPath);
});

QUnit.test("testPubSubMessagesWithTwoLevelPathAndAttribute", function(assert) {
	let pathWithAttribute = CORATEST.twoLevelPathWithAttribute;

	let expectedPath = pathWithAttribute;
	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
	let spec = {
		path: pathWithAttribute,
		cPresentation: cPCollectionVarPresentation
	};

	CORA.pCollectionVar(this.dependencies, spec);
	let subscriptions = this.pubSub.getSubscriptions();

	let disableSubscription = subscriptions[2];
	assert.deepEqual(disableSubscription.path, expectedPath);
});
QUnit.test("testPubSubMessagesWithTwoLevelPathWithRepeatIdLowestLevel", function(assert) {
	let pathWithAttribute = CORATEST.twoLevelPathWithRepeatIdAtLowestLevel;

	let expectedPath = {
		"name": "linkedPath",
		"children": [{
			"name": "nameInData",
			"value": "userRole"
		}, {
			"name": "linkedPath",
			"children": [{
				"name": "nameInData",
				"value": "userRole"
			}]
		}]
	};
	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
	let spec = {
		path: pathWithAttribute,
		cPresentation: cPCollectionVarPresentation
	};
	CORA.pCollectionVar(this.dependencies, spec);
	let subscriptions = this.pubSub.getSubscriptions();

	let disableSubscription = subscriptions[2];
	assert.deepEqual(disableSubscription.path, expectedPath);
});

QUnit.test("testDisable", function(assert) {
	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
	let spec = {
		path: {},
		cPresentation: cPCollectionVarPresentation
	};
	let collectionVar = CORA.pCollectionVar(this.dependencies, spec);
	let view = collectionVar.getView();
	let valueView = view.childNodes[0];
	assert.notOk(valueView.disabled)
	collectionVar.disableCollectionVar();

	assert.ok(valueView.disabled)
});
