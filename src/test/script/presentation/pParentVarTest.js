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
	coraTest.testVariableSubscription = function(pParentVar, dependencies, path, disablePath, assert) {
		let subscriptions = dependencies.pubSub.getSubscriptions();

		let firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, path);
		assert.ok(firstSubsription.functionToCall === pParentVar.handleMsg);

		let secondSubsription = subscriptions[1];
		assert.strictEqual(secondSubsription.type, "validationError");
		assert.deepEqual(secondSubsription.path, path);
		assert.ok(secondSubsription.functionToCall === pParentVar.handleValidationError);

		let disableSubsription = subscriptions[2];
		assert.strictEqual(disableSubsription.type, "disable");
		assert.stringifyEqual(disableSubsription.path, disablePath);
		assert.ok(disableSubsription.functionToCall === pParentVar.disableVar);

		assert.deepEqual(subscriptions.length, 3);
	};

	coraTest.testParentVariableMetadata = function(pParentVar, assert) {
		assert.strictEqual(pParentVar.getText(), "Exempel textvariabel");
		assert.strictEqual(pParentVar.getDefText(), "Detta är en exempeldefinition "
			+ "för en textvariabel.");
	};

	coraTest.testJSBookkeeperNoCall = function(jsBookkeeper, assert) {
		let dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 0);
	};
	coraTest.testJSBookkeeperOneCallWithValue = function(jsBookkeeper, value, path, assert) {
		let dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 1);
		assert.strictEqual(dataArray[0].data, value);
		assert.deepEqual(dataArray[0].path, path);
	};
	return coraTest;
}(CORATEST || {}));

QUnit.module("presentation/pParentVarTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		this.pVarViewFactory = CORATEST.standardFactorySpy("pVarViewSpy");
		this.pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");
		
		
		this.dependencies = {
			clientInstanceProvider: CORATEST.clientInstanceProviderSpy(),
			metadataProvider: this.metadataProvider,
			presentationFactory: this.presentationFactory,
			pubSub: this.pubSub,
			textProvider: this.textProvider,
			jsBookkeeper: this.jsBookkeeper,
			pVarViewFactory: this.pVarViewFactory,
			pAttributesFactory: this.pAttributesFactory
		};
		this.spec = {
			path: [],
			metadataIdUsedInData: "textVariableId",
			cPresentation: CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableId"))
		};
		
		this.createChildSpy = function (){
			let lastValueSentToValidateTypeSpecificValue="no call to validateTypeSpecificValue";
			let lastInfoValueForViewMode="";
			const addTypeSpecificInfoToViewSpec= function (mode, pVarViewSpec) {
				lastInfoValueForViewMode = mode;
				pVarViewSpec.childExtra = "added by child";
			};
			const validateTypeSpecificValue= function (value) {
				lastValueSentToValidateTypeSpecificValue=value;
				return true;
			};
			const getLastValueSentToValidateTypeSpecificValue= function (value) {
				return lastValueSentToValidateTypeSpecificValue;
			};
			const autoFormatEnteredValue= function (valueFromView) {
				return valueFromView;
			};
			let lastTransformValueForViewMode="";
			const transformValueForView= function (mode, valueFromView) {
				lastTransformValueForViewMode=mode;
				return "Transformed "+valueFromView;
			};
			const getLastTransformValueForViewMode= function (value) {
				return lastTransformValueForViewMode;
			};
			return {
				getLastValueSentToValidateTypeSpecificValue: getLastValueSentToValidateTypeSpecificValue,
				addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec,
				validateTypeSpecificValue: validateTypeSpecificValue,
				autoFormatEnteredValue: autoFormatEnteredValue,
				transformValueForView: transformValueForView,
				getLastTransformValueForViewMode: getLastTransformValueForViewMode
			};
		};
	}
});

QUnit.test("testGetType", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.strictEqual(pParentVar.type, "pParentVar");
});

QUnit.test("testGetDependencies", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.strictEqual(pParentVar.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.strictEqual(pParentVar.getSpec(), this.spec);
});

QUnit.test("testGetView", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	let spyView = this.pVarViewFactory.getFactored(0);
	assert.strictEqual(pParentVar.getView(), spyView.getView());
});

QUnit.test("testInitText2", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.equal(pParentVar.getState(), "ok");

	CORATEST.testVariableSubscription(pParentVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testViewHiddenInOutputMode", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("idTextOutputPVar"));
	CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	let spyView = this.pVarViewFactory.getFactored(0);
	assert.strictEqual(spyView.getShowCalled(), 0);
	assert.strictEqual(spyView.getHideCalled(), 1);
});

QUnit.test("testFactoredViewCorrectlyForInputVariable", function(assert) {
	this.spec.path = ["one", "two"];
	let child = this.createChildSpy();
	
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, child);

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		mode: "input",
		info: {
			defText: "Detta är en exempeldefinition för en textvariabel.",
			technicalInfo: [],
			text: "Exempel textvariabel"
		},
		onblurFunction: pParentVar.onBlur,
		onkeyupFunction: pParentVar.onkeyup,
		placeholderText: "Skriv din text här",
		presentationId: "pVarTextVariableId"
	};
	
	expectedPVarViewSpec.childExtra = "added by child";
	
	expectedPVarViewSpec.info.technicalInfo.push(
		{
		text: "textId: textVariableIdText",
		onclickMethod: pParentVar.openTextIdRecord
	}, {
		text: "defTextId: textVariableIdDefText",
		onclickMethod: pParentVar.openDefTextIdRecord
	}, {
		text: "metadataId: textVariableId",
		onclickMethod: pParentVar.openMetadataIdRecord
	}, {
		text: "nameInData: textVariableId"
	}, {
		text: "presentationId: pVarTextVariableId",
		onclickMethod: pParentVar.openPresentationIdRecord
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
});


QUnit.test("testFactoredViewCorrectlyForInputTextVariableShowLabelFalse", function(assert) {
	this.spec.path = ["one", "two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableIdShowLabelFalse"))
	
	CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.strictEqual(pVarViewSpy.getSpec().label, undefined);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariableSpecifiedLabelText", function(assert) {
	this.spec.path = ["one", "two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableIdSpecifiedLabelText"))
	
	CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.strictEqual(pVarViewSpy.getSpec().label, "specifiedLabelText_text");
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariableNoEmptyTextId", function(assert) {
	this.spec.path = ["one", "two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableIdInputPassword"))
	
	CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.strictEqual(pVarViewSpy.getSpec().placeholderText, undefined);
});

QUnit.test("testFactoredPAttributes", function(assert) {
	CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);

	let attributesSpec = this.pAttributesFactory.getSpec(0);

	assert.strictEqual(attributesSpec.addViewToParent, pVarViewSpy.addAttributesView);
	assert.strictEqual(attributesSpec.path, this.spec.path);
	assert.strictEqual(attributesSpec.mode, "input");
});

QUnit.test("testMetadataIdUsedInData_IsUsedAndNot_PresentationOf", function(assert) {
	let pVarTextVariableId2 = this.metadataProvider.getMetadataById("pVarTextVariableId2");
	let presentationOf2 = pVarTextVariableId2.children[1].children[1].value;
	let textVariableId2 = this.metadataProvider.getMetadataById(presentationOf2);
	assert.strictEqual(textVariableId2.children[0].value, "(^[0-9A-Za-z]{2,50}$)");

	this.spec.path = ["one", "two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableIdSpecifiedLabelText"));
	
	CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	assert.strictEqual(this.metadataProvider.getRequestedMetadataIds().pop(), "textVariableId");
});

QUnit.test("testInitTextArea", function(assert) {
	this.spec.path = ["one", "two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))
	
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextAreaWithFirstLevelPath", function(assert) {
	let firstLevelPath = ["textVariableId"];
	let expectedDisablePath = ["textVariableId"];
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitWithFirstLevelPathWithRepeatId", function(assert) {
	let firstLevelPath = ["textVariableId.0"];
	let expectedDisablePath = ["textVariableId"];
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testTextAreaWithTwoLevelPath", function(assert) {
	let firstLevelPath = ["recordInfo", "dataDivider"];
	let expectedDisablePath =firstLevelPath;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextAreaWithThreeLevelPath", function(assert) {
	let firstLevelPath = ["recordInfo", "dataDivider", "linkedRecordType"];
	let expectedDisablePath =firstLevelPath;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextAreaWithPathWithRepeatId", function(assert) {
	let firstLevelPath = ["userRole.0", "userRole"];
	let expectedDisablePath =firstLevelPath;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testPathWithTwoLevelPathWithRepeatId", function(assert) {
	let firstLevelPath = ["userRole", "userRole.0"];
	let expectedDisablePath = ["userRole", "userRole"];;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextAreaWithPathWithAttribute", function(assert) {
	let firstLevelPath = ["textPart", "numVariableId"];
	let expectedDisablePath = firstLevelPath;
	this.spec.path = firstLevelPath;
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, firstLevelPath, expectedDisablePath, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testFactoredViewCorrectlyForInputTextAreaVariable", function(assert) {
	this.spec.path = ["one","two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))
	
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		mode: "input",
		info: {
			defText: "Detta är en exempeldefinition för en textvariabel.",
			technicalInfo: [],
			text: "Exempel textvariabel"
		},
		"onblurFunction": pParentVar.onBlur,
		"onkeyupFunction": pParentVar.onkeyup,
		placeholderText: "Skriv din text här",
		presentationId: "textVariableIdTextAreaPVar"
	};
	expectedPVarViewSpec.childExtra = "added by child";
	
	expectedPVarViewSpec.info.technicalInfo.push({
		text: "textId: textVariableIdText",
		onclickMethod: pParentVar.openTextIdRecord
	}, {
		text: "defTextId: textVariableIdDefText",
		onclickMethod: pParentVar.openDefTextIdRecord
	}, {
		text: "metadataId: textVariableId",
		onclickMethod: pParentVar.openMetadataIdRecord
	}, {
		text: "nameInData: textVariableId"
	}, {
		text: "presentationId: textVariableIdTextAreaPVar",
		onclickMethod: pParentVar.openPresentationIdRecord
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
});

QUnit.test("testInitTextNoInputTypeIsShownAsText", function(assert) {
	this.spec.path = ["one","two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"textVariableIdShowTextAreaFalsePVar"))
	
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		mode: "input",
		info: {
			defText: "Detta är en exempeldefinition för en textvariabel.",
			technicalInfo: [],
			text: "Exempel textvariabel"
		},
		"onblurFunction": pParentVar.onBlur,
		"onkeyupFunction": pParentVar.onkeyup,
		placeholderText: "Skriv din text här",
		presentationId: "textVariableIdShowTextAreaFalsePVar"
	};
	expectedPVarViewSpec.childExtra = "added by child";
	
	expectedPVarViewSpec.info.technicalInfo.push({
		text: "textId: textVariableIdText",
		onclickMethod: pParentVar.openTextIdRecord
	}, {
		text: "defTextId: textVariableIdDefText",
		onclickMethod: pParentVar.openDefTextIdRecord
	}, {
		text: "metadataId: textVariableId",
		onclickMethod: pParentVar.openMetadataIdRecord
	}, {
		text: "nameInData: textVariableId"
	}, {
		text: "presentationId: textVariableIdShowTextAreaFalsePVar",
		onclickMethod: pParentVar.openPresentationIdRecord
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
	
	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextInputFormatPassword", function(assert) {
	this.spec.path = ["one","two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdInputPassword"))
	
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		mode: "input",
		info: {
			defText: "Detta är en exempeldefinition för en textvariabel.",
			technicalInfo: [],
			text: "Exempel textvariabel"
		},
		"onblurFunction": pParentVar.onBlur,
		"onkeyupFunction": pParentVar.onkeyup,
		presentationId: "pVarTextVariableId",
	};
	expectedPVarViewSpec.childExtra = "added by child";
	
	expectedPVarViewSpec.info.technicalInfo.push({
		text: "textId: textVariableIdText",
		onclickMethod: pParentVar.openTextIdRecord
	}, {
		text: "defTextId: textVariableIdDefText",
		onclickMethod: pParentVar.openDefTextIdRecord
	}, {
		text: "metadataId: textVariableId",
		onclickMethod: pParentVar.openMetadataIdRecord
	}, {
		text: "nameInData: textVariableId"
	}, {
		text: "presentationId: pVarTextVariableId",
		onclickMethod: pParentVar.openPresentationIdRecord
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testVariableSubscription(pParentVar, this.dependencies, this.spec.path, this.spec.path, assert);
	CORATEST.testParentVariableMetadata(pParentVar, assert);
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextInputNoRecordInfoAsInFakePresentationForAttributes", function(assert) {
	this.spec.path = ["one","two"];
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdNoRecordInfoAsInFakePresentationForAttributes"))
	
	this.spec.path = ["one", "two"];
	let child = this.createChildSpy();
	
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, child);

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	let expectedPVarViewSpec = {
		label: "Exempel textvariabel",
		id: "onetwo",
		mode: "input",
		info: {
			defText: "Detta är en exempeldefinition för en textvariabel.",
			technicalInfo: [],
			text: "Exempel textvariabel"
		},
		onblurFunction: pParentVar.onBlur,
		onkeyupFunction: pParentVar.onkeyup,
		placeholderText: "Skriv din text här",
//		presentationId: undefined
	};
	
	expectedPVarViewSpec.childExtra = "added by child";
	
	expectedPVarViewSpec.info.technicalInfo.push(
		{
		text: "textId: textVariableIdText",
		onclickMethod: pParentVar.openTextIdRecord
	}, {
		text: "defTextId: textVariableIdDefText",
		onclickMethod: pParentVar.openDefTextIdRecord
	}, {
		text: "metadataId: textVariableId",
		onclickMethod: pParentVar.openMetadataIdRecord
	}, {
		text: "nameInData: textVariableId"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
});
//
QUnit.test("testSetValueInput", function(assert) {
	const childSpy = this.createChildSpy();
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, childSpy);
	pParentVar.setValue("A Value");

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "Transformed A Value");
	
	assert.strictEqual(childSpy.getLastTransformValueForViewMode(), "input");
});

QUnit.test("testSetValueNoChangeToShowHideInInputMode", function(assert) {
	const pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	pParentVar.setValue("A Value");
	
	let spyView = this.pVarViewFactory.getFactored(0);
	assert.strictEqual(spyView.getShowCalled(), 0);
	assert.strictEqual(spyView.getHideCalled(), 0);
});

QUnit.test("testSetValueChangeShowHideInOutputMode", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById("idTextOutputPVar"));
	const child = this.createChildSpy();
	child.transformValueForView=function(mode, valueFromView){return valueFromView};
	const pParentVar = CORA.pParentVar(this.dependencies, this.spec, child);
	
	let spyView = this.pVarViewFactory.getFactored(0);
	assert.strictEqual(spyView.getShowCalled(), 0);
	assert.strictEqual(spyView.getHideCalled(), 1);
	
	pParentVar.setValue("A Value");
	
	assert.strictEqual(spyView.getShowCalled(), 1);
	assert.strictEqual(spyView.getHideCalled(), 1);

	pParentVar.setValue("");

	assert.strictEqual(spyView.getShowCalled(), 1);
	assert.strictEqual(spyView.getHideCalled(), 2);
});

QUnit.test("testHandleMessage", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	let data = {
		"data": "A new value",
		"path": []
	};
	pParentVar.handleMsg(data);
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "Transformed A new value");
	assert.equal(pVarViewSpy.getState(), "ok");
});

QUnit.test("testChangedValueEmpty", function(assert) {
	this.spec.path = ["one", "two"];
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	let data = {
		"data": "notEmpty",
		"path": ["one", "two"]
	};
	pParentVar.handleMsg(data);
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("");
	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", ["one", "two"], assert);
});

QUnit.test("testAutoFormatEnteredValueEmptyDoNothing", function(assert) {
	let child = this.createChildSpy();
	child.autoFormatEnteredValue= function (valueFromView) {
		return "autoFormatEnteredValue by child";
	};
	this.spec.path = ["one", "two"];
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, child);
	
	let data = {
		"data": "",
		"path": ["one", "two"]
	};
	pParentVar.handleMsg(data);
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	
	pParentVar.onBlur("");
	
	assert.equal(pVarViewSpy.getValue(), "");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testAutoFormatEnteredValueEmptyDoNothing", function(assert) {
	let child = this.createChildSpy();
	child.autoFormatEnteredValue= function (valueFromView) {
		return "autoFormatEnteredValue by child";
	};
	this.spec.path = ["one", "two"];
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, child);
	
	let data = {
		"data": "Not empty",
		"path": ["one", "two"]
	};
	pParentVar.handleMsg(data);
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	
	pParentVar.onBlur("some value");
	
	assert.equal(pVarViewSpy.getValue(), "autoFormatEnteredValue by child");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "autoFormatEnteredValue by child",
		["one", "two"], assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("hej");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", [], assert);
	pVarViewSpy.callOnblurWithValue("hej");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", [], assert);
});

QUnit.test("testChangedValueError", function(assert) {
	const childSpy = this.createChildSpy();
	childSpy.validateTypeSpecificValue = function(){return false;}
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, childSpy);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("hej####/(&/%&/¤/");
	assert.equal(pVarViewSpy.getState(), "error");
	assert.equal(pParentVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});
 
QUnit.test("testHandleValidationError", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	let message = {
		"metadataId": "textVariableId",
		"path": []
	};
	
	pParentVar.handleValidationError(message);
	
	assert.equal(pParentVar.getState(), "error");
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getState(), "error");
});

QUnit.test("testHandleValidationErrorResetBySetValue", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let message = {
		"metadataId": "textVariableId",
		"path": []
	};
	
	pParentVar.handleValidationError(message);
	
	assert.equal(pParentVar.getState(), "error");
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getState(), "error");

	let data = {
		"data": "A new value",
		"path": []
	};
	pParentVar.handleMsg(data);
	assert.equal(pVarViewSpy.getState(), "ok");
});


QUnit.test("testChangedValueEmpty", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	let data = {
		"data": "notEmpty",
		"path": []
	};
	
	pParentVar.handleMsg(data);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	
	pVarViewSpy.callOnkeyupWithValue("");
	
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", [], assert);
});

QUnit.test("testChangedValueNoCallToChildValidateTypeSpecificValue", function(assert) {
	const childSpy = this.createChildSpy();
	CORA.pParentVar(this.dependencies, this.spec, childSpy);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	
	pVarViewSpy.callOnkeyupWithValue("");
	
	assert.strictEqual(childSpy.getLastValueSentToValidateTypeSpecificValue(), 
		"no call to validateTypeSpecificValue");
});

QUnit.test("testChangedValueOk", function(assert) {
	const childSpy = this.createChildSpy();
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, childSpy);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	
	pVarViewSpy.callOnkeyupWithValue("hej");
	
	assert.strictEqual(childSpy.getLastValueSentToValidateTypeSpecificValue(), "hej");
	
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(pParentVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", [], assert);
	pVarViewSpy.callOnkeyupWithValue("hej");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", [], assert);
});

QUnit.test("testChangedValueError", function(assert) {
	const childSpy = this.createChildSpy();
	childSpy.validateTypeSpecificValue = function(){return false;}
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, childSpy);
	
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnkeyupWithValue("hej####/(&/%&/¤/");
	assert.equal(pVarViewSpy.getState(), "errorStillFocused");
	assert.equal(pParentVar.getState(), "errorStillFocused");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testOpenTextIdRecord", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentVar.openTextIdRecord(event);

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
	pParentVar.openTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenDefTextIdRecord", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentVar.openDefTextIdRecord(event);

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
	pParentVar.openDefTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenMetadataIdRecord", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentVar.openMetadataIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://fake.from.metadataproviderstub/rest/record/sometype/textVariableId",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pParentVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenPresentationIdRecord", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentVar.openPresentationIdRecord(event);

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
	pParentVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenLinkedRecordForLink", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let event = document.createEvent('Event');
	let link = {
			requestMethod: "GET",
			rel: "read",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/" 
				+ "pVarTextVariableId",
			accept: "application/vnd.uub.record+json"
		};
	event.ctrlKey = true;
	pParentVar.openLinkedRecordForLink(event, link);

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
	pParentVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testDisable", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
	
	pParentVar.disableVar();

	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getDisabledCalled(), true);
});

QUnit.test("testDisableAttributes", function(assert) {
	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());

	let pAttributesSpy = this.pAttributesFactory.getFactored(0);
	assert.strictEqual(pAttributesSpy.getNoOfCallsToDisable(), 0);

	pParentVar.disableVar();

	assert.strictEqual(pAttributesSpy.getNoOfCallsToDisable(), 1);
});
