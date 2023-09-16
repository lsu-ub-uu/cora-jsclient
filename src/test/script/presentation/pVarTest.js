/*
 * Copyright 2016, 2020 Uppsala University Library
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
	coraTest.testVariableSubscription = function(pVar, dependencies, path, disablePath, assert) {
		let subscriptions = dependencies.pubSub.getSubscriptions();

		let firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, path);
		assert.ok(firstSubsription.functionToCall === pVar.handleMsg);

		let secondSubsription = subscriptions[1];
		assert.strictEqual(secondSubsription.type, "validationError");
		assert.deepEqual(secondSubsription.path, path);
		assert.ok(secondSubsription.functionToCall === pVar.handleValidationError);

		let disableSubsription = subscriptions[2];
		assert.strictEqual(disableSubsription.type, "disable");
		assert.stringifyEqual(disableSubsription.path, disablePath);
		assert.ok(disableSubsription.functionToCall === pVar.disableVar);

		assert.deepEqual(subscriptions.length, 3);
	};

	coraTest.testVariableMetadata = function(pVar, assert) {
		assert.strictEqual(pVar.getText(), "Exempel textvariabel");
		assert.strictEqual(pVar.getDefText(), "Detta är en exempeldefinition "
			+ "för en textvariabel.");
		assert.strictEqual(pVar.getRegEx(), "^[0-9A-Öa-ö\\s!*.]{2,50}$");
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

QUnit.module.only("presentation/pVarTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		this.pVarViewFactory = CORATEST.standardFactorySpy("pVarViewSpy");
		this.pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");
		this.pParentVarFactory = CORATEST.standardFactorySpy("pParentVarSpy");
		
		
		this.dependencies = {
			clientInstanceProvider: CORATEST.clientInstanceProviderSpy(),
			metadataProvider: this.metadataProvider,
			presentationFactory: this.presentationFactory,
			pubSub: this.pubSub,
			textProvider: this.textProvider,
			jsBookkeeper: this.jsBookkeeper,
			pVarViewFactory: this.pVarViewFactory,
			pAttributesFactory: this.pAttributesFactory,
			pParentVarFactory: this.pParentVarFactory
		};
		this.spec = {
			path: [],
			metadataIdUsedInData: "textVariableId",
			cPresentation: CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableId"))
		};
	}
});

QUnit.test("testParentStarted", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pParentVarFactory = this.pParentVarFactory.getSpec(0);
	assert.strictEqual(pParentVarFactory, this.spec);
//	let pParentVar = this.pParentVarFactory.getFactored(0);
		
//	assert.strictEqual(pVar.getSpec, "pVar");
});

QUnit.test("testGetType", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

	assert.strictEqual(pVar.type, "pVar");
});

QUnit.test("testGetDependencies", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

	assert.strictEqual(pVar.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

//	assert.strictEqual(pVar.getSpec(), this.spec);
	let pParentVarFactory = this.pParentVarFactory.getSpec(0);
	assert.strictEqual(pVar.getSpec, pParentVarFactory.getSpec);

});

QUnit.test("testInitText2", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

	assert.equal(pVar.getState(), "ok");

	CORATEST.testVariableSubscription(pVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariable", function(assert) {
	this.spec.path = ["one", "two"];
	
	let pVar = CORA.pVar(this.dependencies, this.spec);

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		info: {
			defText: "Detta är en exempeldefinition för en textvariabel.",
			technicalInfo: [],
			text: "Exempel textvariabel"
		},
		onblurFunction: pVar.onBlur,
		onkeyupFunction: pVar.onkeyup,
		inputType: "input",
		mode: "input",
		outputFormat: "text",
		inputFormat: "text",
		placeholderText: "Skriv din text här",
		presentationId: "pVarTextVariableId"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		text: "textId: textVariableIdText",
		onclickMethod: pVar.openTextIdRecord
	}, {
		text: "defTextId: textVariableIdDefText",
		onclickMethod: pVar.openDefTextIdRecord
	}, {
		text: "metadataId: textVariableId",
		onclickMethod: pVar.openMetadataIdRecord
	}, {
		text: "nameInData: textVariableId"
	}, {
		text: "presentationId: pVarTextVariableId",
		onclickMethod: pVar.openPresentationIdRecord
	}, {
		text: "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariableShowLabelFalse", function(assert) {
	this.spec.path = ["one", "two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableIdShowLabelFalse"))
	
	CORA.pVar(this.dependencies, this.spec);

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.strictEqual(pVarViewSpy.getSpec().label, undefined);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariableOtherLabelText", function(assert) {
	this.spec.path = ["one", "two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableIdOtherLabelText"))
	
	CORA.pVar(this.dependencies, this.spec);

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.strictEqual(pVarViewSpy.getSpec().label, "otherLabelText_text");
});

QUnit.test("testFactoredPAttributes", function(assert) {
	CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);

	let attributesSpec = this.pAttributesFactory.getSpec(0);

	assert.strictEqual(attributesSpec.addViewToParent, pVarViewSpy.addAttributesView);
	assert.strictEqual(attributesSpec.path, this.spec.path);
	assert.strictEqual(attributesSpec.mode, "input");
});

QUnit.test("testGetRegexpShowsMetadataIdUsedInDataIsUsedAndNotPresentationOf", function(assert) {
	let pVarTextVariableId2 = this.metadataProvider.getMetadataById("pVarTextVariableId2");
	let presentationOf2 = pVarTextVariableId2.children[1].children[1].value;
	let textVariableId2 = this.metadataProvider.getMetadataById(presentationOf2);
	assert.strictEqual(textVariableId2.children[0].value, "(^[0-9A-Za-z]{2,50}$)");

	this.spec.path = ["one", "two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableIdOtherLabelText"))
	
	const pVar = CORA.pVar(this.dependencies, this.spec);
	
	assert.strictEqual(pVar.getRegEx(), "^[0-9A-Öa-ö\\s!*.]{2,50}$");
});

QUnit.test("testInitTextArea", function(assert) {
	this.spec.path = ["one", "two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))
	
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextAreaWithFirstLevelPath", function(assert) {
	let firstLevelPath = ["textVariableId"];
	let expectedDisablePath = ["textVariableId"];
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitWithFirstLevelPathWithRepeatId", function(assert) {
	let firstLevelPath = ["textVariableId.0"];
	let expectedDisablePath = ["textVariableId"];
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pVar = CORA.pVar(this.dependencies, this.spec);

	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testTextAreaWithTwoLevelPath", function(assert) {
	let firstLevelPath = ["recordInfo", "dataDivider"];
	let expectedDisablePath =firstLevelPath;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pVar = CORA.pVar(this.dependencies, this.spec);

	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextAreaWithThreeLevelPath", function(assert) {
	let firstLevelPath = ["recordInfo", "dataDivider", "linkedRecordType"];
	let expectedDisablePath =firstLevelPath;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pVar = CORA.pVar(this.dependencies, this.spec);

	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextAreaWithPathWithRepeatId", function(assert) {
	let firstLevelPath = ["userRole.0", "userRole"];
	let expectedDisablePath =firstLevelPath;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pVar = CORA.pVar(this.dependencies, this.spec);

	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testPathWithTwoLevelPathWithRepeatId", function(assert) {
	let firstLevelPath = ["userRole", "userRole.0"];
	let expectedDisablePath = ["userRole", "userRole"];;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pVar = CORA.pVar(this.dependencies, this.spec);

	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextAreaWithPathWithAttribute", function(assert) {
	let firstLevelPath = ["textPart", "numVariableId"];
	let expectedDisablePath = firstLevelPath;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pVar = CORA.pVar(this.dependencies, this.spec);

	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testFactoredViewCorrectlyForInputTextAreaVariable", function(assert) {
	this.spec.path = ["one","two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))
	
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		"info": {
			"defText": "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo": [],
			"text": "Exempel textvariabel"
		},
		"onblurFunction": pVar.onBlur,
		"onkeyupFunction": pVar.onkeyup,
		"inputType": "textarea",
		"mode": "input",
		"outputFormat": "text",
		"inputFormat": "text",
		"placeholderText": "Skriv din text här",
		"presentationId": "textVariableIdTextAreaPVar"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text": "textId: textVariableIdText",
		"onclickMethod": pVar.openTextIdRecord
	}, {
		"text": "defTextId: textVariableIdDefText",
		"onclickMethod": pVar.openDefTextIdRecord
	}, {
		"text": "metadataId: textVariableId",
		"onclickMethod": pVar.openMetadataIdRecord
	}, {
		"text": "nameInData: textVariableId"
	}, {
		"text": "presentationId: textVariableIdTextAreaPVar",
		onclickMethod: pVar.openPresentationIdRecord
	}, {
		"text": "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
});

QUnit.test("testInitTextNoInputTypeIsShownAsText", function(assert) {
	this.spec.path = ["one","two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"textVariableIdShowTextAreaFalsePVar"))
	
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		"info": {
			"defText": "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo": [],
			"text": "Exempel textvariabel"
		},
		"onblurFunction": pVar.onBlur,
		"onkeyupFunction": pVar.onkeyup,
		"inputType": "input",
		"mode": "input",
		"outputFormat": "text",
		"inputFormat": "text",
		"placeholderText": "Skriv din text här",
		"presentationId": "textVariableIdShowTextAreaFalsePVar"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text": "textId: textVariableIdText",
		"onclickMethod": pVar.openTextIdRecord
	}, {
		"text": "defTextId: textVariableIdDefText",
		"onclickMethod": pVar.openDefTextIdRecord
	}, {
		"text": "metadataId: textVariableId",
		"onclickMethod": pVar.openMetadataIdRecord
	}, {
		"text": "nameInData: textVariableId"
	}, {
		"text": "presentationId: textVariableIdShowTextAreaFalsePVar",
		onclickMethod: pVar.openPresentationIdRecord
	}, {
		"text": "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
	
	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextInputFormatPassword", function(assert) {
	this.spec.path = ["one","two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdInputPassword"))
	
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		"info": {
			"defText": "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo": [],
			"text": "Exempel textvariabel"
		},
		"onblurFunction": pVar.onBlur,
		"onkeyupFunction": pVar.onkeyup,
		"inputType": "input",
		"mode": "input",
		"outputFormat": "text",
		"inputFormat": "password",
		"presentationId": "pVarTextVariableId"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text": "textId: textVariableIdText",
		"onclickMethod": pVar.openTextIdRecord
	}, {
		"text": "defTextId: textVariableIdDefText",
		"onclickMethod": pVar.openDefTextIdRecord
	}, {
		"text": "metadataId: textVariableId",
		"onclickMethod": pVar.openMetadataIdRecord
	}, {
		"text": "nameInData: textVariableId"
	}, {
		"text": "presentationId: pVarTextVariableId",
		onclickMethod: pVar.openPresentationIdRecord
	}, {
		"text": "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testSetValueInput", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	pVar.setValue("A Value");

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A Value");
});

QUnit.test("testHandleMessage", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	let data = {
		"data": "A new value",
		"path": []
	};
	pVar.handleMsg(data);
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A new value");
});

QUnit.test("testChangedValueEmpty", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let data = {
		"data": "notEmpty",
		"path": []
	};
	pVar.handleMsg(data);
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("hej");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);
	pVarViewSpy.callOnblurWithValue("hej");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);

});

QUnit.test("testChangedValueError", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("hej####/(&/%&/¤/");
	assert.equal(pVarViewSpy.getState(), "error");
	assert.equal(pVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testHandleValidationError", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let message = {
		"metadataId": "textVariableId",
		"path": []
	};
	pVar.handleValidationError(message);
	assert.equal(pVar.getState(), "error");
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getState(), "error");
});

QUnit.test("testChangedValueEmpty", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let data = {
		"data": "notEmpty",
		"path": []
	};
	pVar.handleMsg(data);
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnkeyupWithValue("");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnkeyupWithValue("hej");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);
	pVarViewSpy.callOnkeyupWithValue("hej");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);
});

QUnit.test("testChangedValueError", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnkeyupWithValue("hej####/(&/%&/¤/");
	assert.equal(pVarViewSpy.getState(), "errorStillFocused");
	assert.equal(pVar.getState(), "errorStillFocused");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextOutput", function(assert) {
	this.spec.path = ["one","two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdOutput"))
	
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		"info": {
			"defText": "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo": [],
			"text": "Exempel textvariabel"
		},
		"onblurFunction": pVar.onBlur,
		"onkeyupFunction": pVar.onkeyup,
		"inputType": "input",
		"mode": "output",
		"outputFormat": "text",
		"inputFormat": "text",
		"presentationId": "pVarTextVariableIdOutput"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text": "textId: textVariableIdText",
		"onclickMethod": pVar.openTextIdRecord
	}, {
		"text": "defTextId: textVariableIdDefText",
		"onclickMethod": pVar.openDefTextIdRecord
	}, {
		"text": "metadataId: textVariableId",
		"onclickMethod": pVar.openMetadataIdRecord
	}, {
		"text": "nameInData: textVariableId"
	}, {
		"text": "presentationId: pVarTextVariableIdOutput",
		onclickMethod: pVar.openPresentationIdRecord
	}, {
		"text": "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextOutputFormatImage", function(assert) {
	this.spec.path = ["one","two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdOutputImage"))
	
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		"info": {
			"defText": "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo": [],
			"text": "Exempel textvariabel"
		},
		"onblurFunction": pVar.onBlur,
		"onkeyupFunction": pVar.onkeyup,
		"inputType": "input",
		"mode": "output",
		"outputFormat": "image",
		"inputFormat": "text",
		"presentationId": "pVarTextVariableId"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text": "textId: textVariableIdText",
		"onclickMethod": pVar.openTextIdRecord
	}, {
		"text": "defTextId: textVariableIdDefText",
		"onclickMethod": pVar.openDefTextIdRecord
	}, {
		"text": "metadataId: textVariableId",
		"onclickMethod": pVar.openMetadataIdRecord
	}, {
		"text": "nameInData: textVariableId"
	}, {
		"text": "presentationId: pVarTextVariableId",
		onclickMethod: pVar.openPresentationIdRecord
	}, {
		"text": "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	assert.equal(pVar.getState(), "ok");
	CORATEST.testVariableSubscription(pVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testVariableMetadata(pVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testSetValueTextOutput", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdOutput"))
	
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	
	pVar.setValue("A Value");
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A Value");
});

QUnit.test("testSetValueTextOutputFormatImage", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdOutputImage"))
	
	let pVar = CORA.pVar(this.dependencies, this.spec);

	pVar.setValue("http://www.some.domain.nu/image01.jpg");
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "http://www.some.domain.nu/image01.jpg");
});

QUnit.test("testHandleValidationErrorResetBySetValue", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

	let message = {
		"metadataId": "textVariableId",
		"path": []
	};
	pVar.handleValidationError(message);
	assert.equal(pVar.getState(), "error");
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getState(), "error");

	let data = {
		"data": "A new value",
		"path": []
	};
	pVar.handleMsg(data);
	assert.equal(pVarViewSpy.getState(), "ok");
});

QUnit.test("testOpenTextIdRecord", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pVar.openTextIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/text/" + "textVariableId" + "Text",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pVar.openTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenDefTextIdRecord", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pVar.openDefTextIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/text/" + "textVariableId"
				+ "DefText",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pVar.openDefTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenMetadataIdRecord", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pVar.openMetadataIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/" + "metadataTextVariable/"
				+ "textVariableTextVar",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenPresentationIdRecord", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pVar.openPresentationIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		readLink: {
			requestMethod: "GET",
			rel: "read",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/" 
				+ "pVarTextVariableId",
			accept: "application/vnd.uub.record+json"
		},
		loadInBackground: "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testDisable", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	
	pVar.disableVar();

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getDisabledCalled(), true);
});


QUnit.test("testDisableAttributes", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);

	let pAttributesSpy = this.pAttributesFactory.getFactored(0);
	assert.strictEqual(pAttributesSpy.getNoOfCallsToDisable(), 0);

	pVar.disableVar();

	assert.strictEqual(pAttributesSpy.getNoOfCallsToDisable(), 1);
});
