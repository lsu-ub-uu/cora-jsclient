/*
 * Copyright 2016, 2018, 2020 Uppsala University Library
 * Copyright 2016, 2017, 2018, 2023 Olov McKie
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
		fixture, pNumVarViewFactory, pAttributesFactory) {
		let factor = function(path, metadataIdUsedInData, pNumVarPresentationId) {
			let cPNumVarPresentation = CORA.coraData(metadataProvider
				.getMetadataById(pNumVarPresentationId));
			let dependencies = {
				clientInstanceProvider: CORATEST.clientInstanceProviderSpy(),
				metadataProvider: metadataProvider,
				pubSub: pubSub,
				textProvider: textProvider,
				jsBookkeeper: jsBookkeeper,
				pNumVarViewFactory: pNumVarViewFactory,
				pAttributesFactory: pAttributesFactory
			};
			let spec = {
				"path": path,
				"metadataIdUsedInData": metadataIdUsedInData,
				"cPresentation": cPNumVarPresentation
			};
			let pNumVar = CORA.pNumVar(dependencies, spec);
			return {
				spec: spec,
				pNumVar: pNumVar,
				fixture: fixture,
				metadataProvider: metadataProvider,
				pubSub: pubSub,
				textProvider: textProvider,
				jsBookkeeper: jsBookkeeper,
				dependencies: dependencies
			};

		};
		return Object.freeze({
			factor: factor
		});
	};

	return coraTest;
}(CORATEST || {}));

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.testNumVariableSubscription = function(attachedPNumVar, assert, path, disablePath) {
		let subscriptions = attachedPNumVar.pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 3);

		let firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, path);
		let pNumVar = attachedPNumVar.pNumVar;
		assert.ok(firstSubsription.functionToCall === pNumVar.handleMsg);

		let secondSubsription = subscriptions[1];
		assert.strictEqual(secondSubsription.type, "validationError");
		assert.deepEqual(secondSubsription.path, path);
		assert.ok(secondSubsription.functionToCall === pNumVar.handleValidationError);

		let disableSubsription = subscriptions[2];
		assert.strictEqual(disableSubsription.type, "disable");
		assert.stringifyEqual(disableSubsription.path, disablePath);
		assert.ok(disableSubsription.functionToCall === pNumVar.disableNumVar);

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

QUnit.module.only("presentation/pNumVarTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.pNumVarViewFactory = CORATEST.standardFactorySpy("pNumVarViewSpy");
		this.pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");
		this.pNumVarFactory = CORATEST.attachedPNumVarFactory(this.metadataProvider, this.pubSub,
			this.textProvider, this.jsBookkeeper, this.fixture, this.pNumVarViewFactory, this.pAttributesFactory);
	}
});

QUnit.test("testGetDependencies", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	assert.strictEqual(attachedPNumVar.pNumVar.getDependencies(), attachedPNumVar.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	assert.strictEqual(attachedPNumVar.pNumVar.getSpec(), attachedPNumVar.spec);
});

QUnit.test("testGetView", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let spyView = this.pNumVarViewFactory.getFactored(0);
	assert.strictEqual(attachedPNumVar.pNumVar.getView(), spyView.getView());
});

QUnit.test("testInitText", function(assert) {
	let path = {};
	let attachedPNumVar = this.pNumVarFactory.factor(path, "numVariableId", "pNumVarNumVariableId");
	assert.strictEqual(attachedPNumVar.pNumVar.type, "pNumVar");

	CORATEST.testNumVariableSubscription(attachedPNumVar, assert, path, path);

	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariable", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");

	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.deepEqual(pNumVarViewSpy.type, "pNumVarViewSpy");
	let expectedPNumVarViewSpec = {
		label: "numVariableIdText",
		info: {
			defText: "numVariableIdDefText",
			technicalInfo: [],
			text: "numVariableIdText"
		},
		onblurFunction: attachedPNumVar.pNumVar.onBlur,
		onkeyupFunction: attachedPNumVar.pNumVar.onkeyup,
		mode: "input",
		presentationId: "pNumVarNumVariableId",
		placeholderText: "Skriv din text här",
		
	};
	expectedPNumVarViewSpec.info.technicalInfo.push({
		text: "textId: numVariableIdText",
		onclickMethod: attachedPNumVar.pNumVar.openTextIdRecord
	}, {
		text: "defTextId: numVariableIdDefText",
		onclickMethod: attachedPNumVar.pNumVar.openDefTextIdRecord
	}, {
		text: "metadataId: numVariableId",
		onclickMethod: attachedPNumVar.pNumVar.openMetadataIdRecord
	}, {
		text: "nameInData: numVariableId"
	}, {
		text: "presentationId: pNumVarNumVariableId",
		onclickMethod: attachedPNumVar.pNumVar.openPresentationIdRecord
	}, {
		text: "min: 0",
	}, {
		text: "max: 10"
	}, {
		text: "warningMin: 2",
	}, {
		text: "warningMax: 8"
	},{
		text: "numberOfDecimals: 0"
	});

	assert.deepEqual(pNumVarViewSpy.getSpec(), expectedPNumVarViewSpec);
});

QUnit.test("testFactoredViewCorrectlyForInputNumVariableShowLabelFalse", function(assert) {
	this.pNumVarFactory.factor(["one", "two"], "numVariableId", "pNumVarNumVariableIdShowLabelFalse");

	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.strictEqual(pNumVarViewSpy.getSpec().label, undefined);
});

QUnit.test("testFactoredViewCorrectlyForInputNumVariableOtherLabelText", function(assert) {
	this.pNumVarFactory.factor(["one", "two"], "numVariableId", "pNumVarNumVariableIdOtherLabelText");

	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.strictEqual(pNumVarViewSpy.getSpec().label, "otherLabelText_text");
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariableNoEmptyText", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableIdNoEmptyText");

	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.deepEqual(pNumVarViewSpy.type, "pNumVarViewSpy");
	let expectedPNumVarViewSpec = {
		label: "numVariableIdText",
		"info": {
			"defText": "numVariableIdDefText",
			"technicalInfo": [],
			"text": "numVariableIdText"
		},
		"onblurFunction": attachedPNumVar.pNumVar.onBlur,
		"onkeyupFunction": attachedPNumVar.pNumVar.onkeyup,
		"mode": "input",
		"presentationId": "pNumVarNumVariableId"
		
	};
	expectedPNumVarViewSpec.info.technicalInfo.push({
		"text": "textId: numVariableIdText",
		"onclickMethod": attachedPNumVar.pNumVar.openTextIdRecord
	}, {
		"text": "defTextId: numVariableIdDefText",
		"onclickMethod": attachedPNumVar.pNumVar.openDefTextIdRecord
	}, {
		"text": "metadataId: numVariableId",
		"onclickMethod": attachedPNumVar.pNumVar.openMetadataIdRecord
	}, {
		"text": "nameInData: numVariableId"
	}, {
		"text": "presentationId: pNumVarNumVariableId",
		onclickMethod: attachedPNumVar.pNumVar.openPresentationIdRecord
	}, {
		"text": "min: 0",
	}, {
		"text": "max: 10"
	}, {
		"text": "warningMin: 2",
	}, {
		"text": "warningMax: 8"
	},{
		"text": "numberOfDecimals: 0"
	});

	assert.deepEqual(pNumVarViewSpy.getSpec(), expectedPNumVarViewSpec);
});

QUnit.test("testFactoredPAttributes", function(assert) {
	let path = [];
	this.pNumVarFactory.factor(path, "numVariableId", "pNumVarNumVariableId");
	let pNumViewSpy = this.pNumVarViewFactory.getFactored(0);

	let attributesSpec = this.pAttributesFactory.getSpec(0);

	assert.strictEqual(attributesSpec.addViewToParent, pNumViewSpy.addAttributesView);
	assert.strictEqual(attributesSpec.path, path);
	assert.strictEqual(attributesSpec.mode, "input");
});

QUnit.test("testDisableAttributes", function(assert) {
	let path = [];

	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	this.pNumVarFactory.factor(path, "numVariableId", "pNumVarNumVariableId");

	let pAttributesSpy = this.pAttributesFactory.getFactored(0);
	assert.strictEqual(pAttributesSpy.getNoOfCallsToDisable(), 0);

	attachedPNumVar.pNumVar.disableNumVar();

	assert.strictEqual(pAttributesSpy.getNoOfCallsToDisable(), 1);
});

QUnit.test("testInitNumWithFirstLevelPath", function(assert) {
	let firstLevelNumPath = ["textVariableId"];
	let topLevelPath = ["textVariableId"];
	let attachedPNumVar = this.pNumVarFactory.factor(firstLevelNumPath, "numVariableId",
		"pNumVarNumVariableId");
	CORATEST.testNumVariableSubscription(attachedPNumVar, assert, firstLevelNumPath, topLevelPath);
});

QUnit.test("testNumWithFirstLevelPathWithRepeatId", function(assert) {
	let firstLevelNumPathWithRepeatId = ["textVariableId.0"];
	let expectedPath = ["textVariableId"]
	let attachedPNumVar = this.pNumVarFactory.factor(firstLevelNumPathWithRepeatId, "numVariableId",
		"pNumVarNumVariableId");
	CORATEST.testNumVariableSubscription(attachedPNumVar, assert, firstLevelNumPathWithRepeatId, expectedPath);
});

QUnit.test("testNumWithTwoLevelPath", function(assert) {
	let numPathWithTwoLevels = ["recordInfo", "dataDivider"];
	let expectedPath = numPathWithTwoLevels;
	let attachedPNumVar = this.pNumVarFactory.factor(numPathWithTwoLevels, "numVariableId",
		"pNumVarNumVariableId");
	CORATEST.testNumVariableSubscription(attachedPNumVar, assert, numPathWithTwoLevels, expectedPath);
});

QUnit.test("testPathWithTwoLevelPathWithRepeatId", function(assert) {
	let numPathWithTwoLevels = ["userRole", "userRole.0"];
	let expectedPath = ["userRole", "userRole"];
	let attachedPNumVar = this.pNumVarFactory.factor(numPathWithTwoLevels, "numVariableId",
		"pNumVarNumVariableId");
	CORATEST.testNumVariableSubscription(attachedPNumVar, assert, numPathWithTwoLevels, expectedPath);
});

QUnit.test("testInitNumWithThreeLevelPath", function(assert) {
	let numPathWithThreeLevels = ["recordInfo", "dataDivider", "numVariableId"];
	let expectedPath = numPathWithThreeLevels;
	let attachedPNumVar = this.pNumVarFactory.factor(numPathWithThreeLevels, "numVariableId",
		"pNumVarNumVariableId");
	CORATEST.testNumVariableSubscription(attachedPNumVar, assert, numPathWithThreeLevels, expectedPath);
});

QUnit.test("testInitNumWithPathWithAttribute", function(assert) {
	let numPathWithAttribute = ["textPart", "numVariableId"];
	let expectedPath = numPathWithAttribute;
	let attachedPNumVar = this.pNumVarFactory.factor(numPathWithAttribute, "numVariableId",
		"pNumVarNumVariableId");
	CORATEST.testNumVariableSubscription(attachedPNumVar, assert, numPathWithAttribute, expectedPath);
});

QUnit.test("testSetValueInput", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	attachedPNumVar.pNumVar.setValue("3");

	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getValue(), "3");
});

QUnit.test("testHandleMessage", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let data = {
		data: "2",
		path: {}
	};
	attachedPNumVar.pNumVar.handleMsg(data);
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getValue(), "2");
});

QUnit.test("testChangedValueEmpty", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let data = {
		"data": "1",
		"path": {}
	};
	attachedPNumVar.pNumVar.handleMsg(data);
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("4");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "4", assert);
	pNumVarViewSpy.callOnblurWithValue("4");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "4", assert);

});

QUnit.test("testChangedValueNotANumberError", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("not a number");
	assert.equal(pNumVarViewSpy.getState(), "error");
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testChangedValueMaxError", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("200");
	assert.equal(pNumVarViewSpy.getState(), "error");
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testChangedValueMinError", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("-1");
	assert.equal(pNumVarViewSpy.getState(), "error");
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testChangedValueIncorrectNumberOfDecimalsError", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnblurWithValue("3.45");
	assert.equal(pNumVarViewSpy.getState(), "error");
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testOnBlurAutoFormatInputNothingWithoutDecimals", function(assert) {
	this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	
	pNumVarViewSpy.callOnblurWithValue("3,45");
	let dataArray = this.jsBookkeeper.getDataArray();
	assert.strictEqual(dataArray.length, 0);
	assert.equal(pNumVarViewSpy.getState(), "error");
});

QUnit.test("testOnBlurAutoFixingInputChangeCommaToDotNoValue", function(assert) {
	this.pNumVarFactory.factor({}, "numVariableWithDecimalsId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	
	pNumVarViewSpy.callOnblurWithValue("");
	let dataArray = this.jsBookkeeper.getDataArray();
	assert.strictEqual(dataArray.length, 0);
	assert.equal(pNumVarViewSpy.getState(), "ok");
});

QUnit.test("testOnBlurAutoFixingInputChangeCommaToDot", function(assert) {
	this.pNumVarFactory.factor({}, "numVariableWithDecimalsId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	
	pNumVarViewSpy.callOnblurWithValue("3,45");
	let dataArray = this.jsBookkeeper.getDataArray();
	assert.strictEqual(dataArray.length, 1);
	assert.strictEqual(dataArray[0].data, "3.45");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(pNumVarViewSpy.getValue(), "3.45");
});

QUnit.test("testOnBlurAutoFixingInputAddToFewDecimals", function(assert) {
	this.pNumVarFactory.factor({}, "numVariableWithDecimalsId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	
	pNumVarViewSpy.callOnblurWithValue("3,");
	let dataArray = this.jsBookkeeper.getDataArray();
	assert.strictEqual(dataArray.length, 1);
	assert.strictEqual(dataArray[0].data, "3.00");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(pNumVarViewSpy.getValue(), "3.00");
});

QUnit.test("testOnBlurAutoFixingInputAddOneToFewDecimals", function(assert) {
	this.pNumVarFactory.factor({}, "numVariableWithDecimalsId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	
	pNumVarViewSpy.callOnblurWithValue("3,4");
	let dataArray = this.jsBookkeeper.getDataArray();
	assert.strictEqual(dataArray.length, 1);
	assert.strictEqual(dataArray[0].data, "3.40");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(pNumVarViewSpy.getValue(), "3.40");
});

QUnit.test("testOnBlurAutoFixingInputAddMissingDotAndDecimals", function(assert) {
	this.pNumVarFactory.factor({}, "numVariableWithDecimalsId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	
	pNumVarViewSpy.callOnblurWithValue("3");
	let dataArray = this.jsBookkeeper.getDataArray();
	assert.strictEqual(dataArray.length, 1);
	assert.strictEqual(dataArray[0].data, "3.00");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(pNumVarViewSpy.getValue(), "3.00");
});

QUnit.test("testHandleValidationError", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let message = {
		"metadataId": "textVariableId",
		"path": {}
	};
	attachedPNumVar.pNumVar.handleValidationError(message);
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getState(), "error");
});

QUnit.test("testChangedValueEmptyAfterKeyUp", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let data = {
		"data": "notEmpty",
		"path": {}
	};
	attachedPNumVar.pNumVar.handleMsg(data);
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnkeyupWithValue("");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnkeyupWithValue("4");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "4", assert);
	pNumVarViewSpy.callOnkeyupWithValue("4");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "4", assert);
});

QUnit.test("testChangedValueError", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	pNumVarViewSpy.callOnkeyupWithValue("999");
	assert.equal(pNumVarViewSpy.getState(), "errorStillFocused");
	assert.equal(attachedPNumVar.pNumVar.getState(), "errorStillFocused");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testChangedValueOkThenErrorThenEmpty", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	
	pNumVarViewSpy.callOnkeyupWithValue("4");
	let dataArray = this.jsBookkeeper.getDataArray();
	assert.strictEqual(dataArray.length, 1);
	assert.strictEqual(dataArray[0].data, "4");

	pNumVarViewSpy.callOnkeyupWithValue("4X");
	assert.equal(pNumVarViewSpy.getState(), "errorStillFocused");
	assert.equal(attachedPNumVar.pNumVar.getState(), "errorStillFocused");
	assert.strictEqual(dataArray.length, 1);
	
	pNumVarViewSpy.callOnkeyupWithValue("");
	assert.equal(pNumVarViewSpy.getState(), "ok");
	assert.strictEqual(dataArray.length, 2);
	assert.strictEqual(dataArray[0].data, "4");
	assert.strictEqual(dataArray[1].data, "");
	assert.equal(attachedPNumVar.pNumVar.getState(), "ok");
});

QUnit.test("testInitNumberOutput", function(assert) {
	let path = {};
	let attachedPNumVar = this.pNumVarFactory.factor(path, "numVariableId", "pNumVarNumVariableIdOutput");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.deepEqual(pNumVarViewSpy.type, "pNumVarViewSpy");
	let expectedPNumVarViewSpec = {
		label: "numVariableIdText",
		"info": {
			"defText": "numVariableIdDefText",
			"technicalInfo": [],
			"text": "numVariableIdText"
		},
		"onblurFunction": attachedPNumVar.pNumVar.onBlur,
		"onkeyupFunction": attachedPNumVar.pNumVar.onkeyup,
		"mode": "output",
		"presentationId": "pNumVarNumVariableIdOutput"
	};
	expectedPNumVarViewSpec.info.technicalInfo.push({
		"text": "textId: numVariableIdText",
		"onclickMethod": attachedPNumVar.pNumVar.openTextIdRecord
	}, {
		"text": "defTextId: numVariableIdDefText",
		"onclickMethod": attachedPNumVar.pNumVar.openDefTextIdRecord
	}, {
		"text": "metadataId: numVariableId",
		"onclickMethod": attachedPNumVar.pNumVar.openMetadataIdRecord
	}, {
		"text": "nameInData: numVariableId"
	}, {
		"text": "presentationId: pNumVarNumVariableIdOutput",
		onclickMethod: attachedPNumVar.pNumVar.openPresentationIdRecord
	}, {
		"text": "min: 0"
	}, {
		"text": "max: 10"
	}, {
		"text": "warningMin: 2",
	}, {
		"text": "warningMax: 8"
	},{
		"text": "numberOfDecimals: 0"
	});
	assert.deepEqual(pNumVarViewSpy.getSpec(), expectedPNumVarViewSpec);

	CORATEST.testNumVariableSubscription(attachedPNumVar, assert, path, path);
});

QUnit.test("testSetValueTextOutput", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableIdOutput");

	attachedPNumVar.pNumVar.setValue("7");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getValue(), "7");
});

QUnit.test("testHandleValidationErrorResetBySetValue", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableIdOutput");
	let message = {
		"metadataId": "numVariableId",
		"path": {}
	};
	attachedPNumVar.pNumVar.handleValidationError(message);
	assert.equal(attachedPNumVar.pNumVar.getState(), "error");
	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getState(), "error");

	let data = {
		"data": "5",
		"path": {}
	};
	attachedPNumVar.pNumVar.handleMsg(data);
	assert.equal(pNumVarViewSpy.getState(), "ok");
});

QUnit.test("testOpenTextIdRecord", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPNumVar.pNumVar.openTextIdRecord(event);

	let jsClient = attachedPNumVar.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/text/" + "numVariableId" + "Text",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	attachedPNumVar.pNumVar.openTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenDefTextIdRecord", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPNumVar.pNumVar.openDefTextIdRecord(event);

	let jsClient = attachedPNumVar.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/text/" + "numVariableId"
				+ "DefText",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event.ctrlKey = false;
	attachedPNumVar.pNumVar.openDefTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});
QUnit.test("testOpenMetadataIdRecord", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPNumVar.pNumVar.openMetadataIdRecord(event);

	let jsClient = attachedPNumVar.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/" + "metadataNumberVariable/"
				+ "numVariableId",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event.ctrlKey = false;
	attachedPNumVar.pNumVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenPresentationIdRecord", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPNumVar.pNumVar.openPresentationIdRecord(event);

	let jsClient = attachedPNumVar.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		readLink: {
			requestMethod: "GET",
			rel: "read",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/" 
				+ "pNumVarNumVariableId",
			accept: "application/vnd.uub.record+json"
		},
		loadInBackground: "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	attachedPNumVar.pNumVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testDisable", function(assert) {
	let attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
	attachedPNumVar.pNumVar.disableNumVar();

	let pNumVarViewSpy = this.pNumVarViewFactory.getFactored(0);
	assert.equal(pNumVarViewSpy.getDisabledCalled(), true);
});