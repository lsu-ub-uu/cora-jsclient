/*
 * Copyright 2016, 2018 Uppsala University Library
 * Copyright 2016, 2017, 2018 Olov McKie
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
	coraTest.attachedPNumVarFactory = function(metadataProvider, pubSub, textProvider, jsBookkeeper,
			fixture, pNumVarViewFactory) {
		var factor = function(path, metadataIdUsedInData, pNumVarPresentationId) {
			var cPNumVarPresentation = CORA.coraData(metadataProvider
					.getMetadataById(pNumVarPresentationId));
			var dependencies = {
				"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy(),
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper,
				"pNumVarViewFactory" : pNumVarViewFactory
			};
			var spec = {
				"path" : path,
				"metadataIdUsedInData" : metadataIdUsedInData,
				"cPresentation" : cPNumVarPresentation
			};
			var pNumVar = CORA.pNumVar(dependencies, spec);
			return {
				spec : spec,
				pNumVar : pNumVar,
				fixture : fixture,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				textProvider : textProvider,
				jsBookkeeper : jsBookkeeper,
				dependencies : dependencies
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.testNumVariableSubscription = function(attachedPNumVar, assert) {
		var subscriptions = attachedPNumVar.pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 2);

		var firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, {});
		var pNumVar = attachedPNumVar.pNumVar;
		assert.ok(firstSubsription.functionToCall === pNumVar.handleMsg);

		var secondSubsription = subscriptions[1];
		assert.strictEqual(secondSubsription.type, "validationError");
		assert.deepEqual(secondSubsription.path, {});
		var pNumVar = attachedPNumVar.pNumVar;
		assert.ok(secondSubsription.functionToCall === pNumVar.handleValidationError);

	};

	coraTest.testNumVariableMetadata = function(attachedPNumVar, assert) {
		var pNumVar = attachedPNumVar.pNumVar;
		assert.strictEqual(pNumVar.getText(), "numVariableIdText");
		assert.strictEqual(pNumVar.getDefText(), "numVariableIdDefText");
		assert.strictEqual(pNumVar.getMin(), "0");
		assert.strictEqual(pNumVar.getMax(), "10");
		assert.strictEqual(pNumVar.getWarningMin(), "2");
		assert.strictEqual(pNumVar.getWarningMax(), "8");
		assert.strictEqual(pNumVar.getNumberOfDecimals(), "0");
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

QUnit.module("presentation/pNumVarTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.pNumVarViewFactory = CORATEST.standardFactorySpy("pNumVarViewSpy");
		this.pNumVarFactory = CORATEST.attachedPNumVarFactory(this.metadataProvider, this.pubSub,
				this.textProvider, this.jsBookkeeper, this.fixture, this.pNumVarViewFactory);
	},
	afterEach : function() {
	}
});

QUnit.test("testGetDependencies", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	assert.strictEqual(attachedPNumVar.pNumVar.getDependencies(), attachedPNumVar.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	assert.strictEqual(attachedPNumVar.pNumVar.getSpec(), attachedPNumVar.spec);
});

QUnit.test("testGetView", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var spyView = this.pNumVarViewFactory.getFactored(0);
	assert.strictEqual(attachedPNumVar.pNumVar.getView(), spyView.getView());
});

QUnit.test("testInitText", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	assert.strictEqual(attachedPNumVar.pNumVar.type, "pNumVar");

	CORATEST.testNumVariableSubscription(attachedPNumVar, assert);
	CORATEST.testNumVariableMetadata(attachedPNumVar, assert);

	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariable", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");

	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.deepEqual(pNumVarViewSpy.type, "pNumVarViewSpy");
	var expectedPNumVarViewSpec = {
		"info" : {
			"defText" : "numVariableIdDefText",
			"technicalInfo" : [],
			"text" : "numVariableIdText"
		},
		"onblurFunction" : attachedPNumVar.pNumVar.onBlur,
		"onkeyupFunction" : attachedPNumVar.pNumVar.onkeyup,
		"mode" : "input",
		"presentationId" : "pNumVarNumVariableId"
	};
	expectedPNumVarViewSpec.info.technicalInfo.push({
		"text" : "textId: numVariableIdText",
		"onclickMethod" : attachedPNumVar.pNumVar.openTextIdRecord
	}, {
		"text" : "defTextId: numVariableIdDefText",
		"onclickMethod" : attachedPNumVar.pNumVar.openDefTextIdRecord
	}, {
		"text" : "metadataId: numVariableId",
		"onclickMethod" : attachedPNumVar.pNumVar.openMetadataIdRecord
	}, {
		"text" : "nameInData: numVariableId"
	}, {
		"text" : "presentationId: pNumVarNumVariableId"
	}, {
		"text": "min: 0",
	}, {
		"text": "max: 10"
	}, {
		"text": "warningMin: 2",
	}, {
		"text": "warningMax: 8"
	});

	assert.deepEqual(pNumVarViewSpy.getSpec(), expectedPNumVarViewSpec);
});



QUnit.test("testSetValueInput", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	attachedPNumVar.pNumVar.setValue("3");

	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getValue(), "3");
});

QUnit.test("testHandleMessage", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var data = {
		"data" : "2",
		"path" : {}
	};
	attachedPNumVar.pNumVar.handleMsg(data);
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getValue(), "2");
});

QUnit.test("testChangedValueEmpty", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var data = {
		"data" : "1",
		"path" : {}
	};
	attachedPNumVar.pNumVar.handleMsg(data);
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("4");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "4", assert);
	pNumVarViewSpy.callOnblurWithValue("4");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "4", assert);

});

QUnit.test("testChangedValueNotANumberError", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("not a number");
	assert.equal(pNumVarViewSpy.getState(), "error");
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testChangedValueMaxError", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("200");
	assert.equal(pNumVarViewSpy.getState(), "error");
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testChangedValueMinError", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("-1");
	assert.equal(pNumVarViewSpy.getState(), "error");
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});
QUnit.test("testChangedValueIncorrectNumberOfDecimalsError", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("3.45");
	assert.equal(pNumVarViewSpy.getState(), "error");
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});
QUnit.test("testHandleValidationError", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var message = {
		"metadataId" : "textVariableId",
		"path" : {}
	};
	attachedPNumVar.pNumVar.handleValidationError(message);
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getState(), "error");
});

QUnit.test("testChangedValueEmptyAfterKeyUp", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var data = {
		"data" : "notEmpty",
		"path" : {}
	};
	attachedPNumVar.pNumVar.handleMsg(data);
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnkeyupWithValue("");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnkeyupWithValue("4");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "4", assert);
	pNumVarViewSpy.callOnkeyupWithValue("4");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "4", assert);
});

QUnit.test("testChangedValueError", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnkeyupWithValue("999");
	assert.equal(pNumVarViewSpy.getState(), "errorStillFocused");
	assert.equal(attachedPNumVar.pNumVar.getState(), "errorStillFocused");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitNumberOutput", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableIdOutput");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.deepEqual(pNumVarViewSpy.type, "pNumVarViewSpy");
	var expectedPNumVarViewSpec = {
		"info" : {
			"defText" : "numVariableIdDefText",
			"technicalInfo" : [],
			"text" : "numVariableIdText"
		},
		"onblurFunction" : attachedPNumVar.pNumVar.onBlur,
		"onkeyupFunction" : attachedPNumVar.pNumVar.onkeyup,
		"mode" : "output",
		"presentationId" : "pNumVarNumVariableIdOutput"
	};
	expectedPNumVarViewSpec.info.technicalInfo.push({
		"text" : "textId: numVariableIdText",
		"onclickMethod" : attachedPNumVar.pNumVar.openTextIdRecord
	}, {
		"text" : "defTextId: numVariableIdDefText",
		"onclickMethod" : attachedPNumVar.pNumVar.openDefTextIdRecord
	}, {
		"text" : "metadataId: numVariableId",
		"onclickMethod" : attachedPNumVar.pNumVar.openMetadataIdRecord
	}, {
		"text" : "nameInData: numVariableId"
	}, {
		"text" : "presentationId: pNumVarNumVariableIdOutput"
	}, {
            "text": "min: 0"
    }, {
            "text": "max: 10"
	}, {
    		"text": "warningMin: 2",
	}, {
    		"text": "warningMax: 8"
	});
	assert.deepEqual(pNumVarViewSpy.getSpec(), expectedPNumVarViewSpec);

	CORATEST.testNumVariableSubscription(attachedPNumVar, assert);
	CORATEST.testNumVariableMetadata(attachedPNumVar, assert);
});

QUnit.test("testSetValueTextOutput", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableIdOutput");
	var valueView = attachedPNumVar.valueView;

	attachedPNumVar.pNumVar.setValue("7");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getValue(), "7");
});

QUnit.test("testHandleValidationErrorResetBySetValue", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableIdOutput");
	var message = {
		"metadataId" : "numVariableId",
		"path" : {}
	};
	attachedPNumVar.pNumVar.handleValidationError(message);
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	var pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getState(), "error");

	var data = {
		"data" : "5",
		"path" : {}
	};
	attachedPNumVar.pNumVar.handleMsg(data);
	assert.equal(pNumVarViewSpy.getState(), "ok");
});

QUnit.test("testOpenTextIdRecord", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");

	var event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPNumVar.pNumVar.openTextIdRecord(event);

	var jsClient = attachedPNumVar.dependencies.clientInstanceProvider.getJsClient();
	var expectedOpenInfo = {
		"readLink" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://localhost:8080/therest/rest/record/text/" + "numVariableId" + "Text",
			"accept" : "application/vnd.uub.record+json"
		},
		"loadInBackground" : "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	var event = document.createEvent('Event');
	event.ctrlKey = false;
	attachedPNumVar.pNumVar.openTextIdRecord(event);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenDefTextIdRecord", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");

	var event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPNumVar.pNumVar.openDefTextIdRecord(event);

	var jsClient = attachedPNumVar.dependencies.clientInstanceProvider.getJsClient();
	var expectedOpenInfo = {
		"readLink" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://localhost:8080/therest/rest/record/text/" + "numVariableId"
					+ "DefText",
			"accept" : "application/vnd.uub.record+json"
		},
		"loadInBackground" : "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	var event = document.createEvent('Event');
	event.ctrlKey = false;
	attachedPNumVar.pNumVar.openDefTextIdRecord(event);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});
QUnit.test("testOpenMetadataIdRecord", function(assert) {
	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");

	var event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPNumVar.pNumVar.openMetadataIdRecord(event);

	var jsClient = attachedPNumVar.dependencies.clientInstanceProvider.getJsClient();
	var expectedOpenInfo = {
		"readLink" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://localhost:8080/therest/rest/record/" + "metadataNumberVariable/"
					+ "numVariableId",
			"accept" : "application/vnd.uub.record+json"
		},
		"loadInBackground" : "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	var event = document.createEvent('Event');
	event.ctrlKey = false;
	attachedPNumVar.pNumVar.openMetadataIdRecord(event);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});
