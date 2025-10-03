/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2016, 2017, 2018, 2023, 2024 Olov McKie
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
QUnit.module("presentation/pParentVarTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let metadataProvider;
	let textProvider;

	let jsBookkeeper;
	let pubSub;
	let presentationFactory;
	let pVarViewFactory;
	let pAttributesFactory;

	let spec;

	hooks.beforeEach(() => {
		metadataProvider = CORATEST.MetadataProviderStub();
		pubSub = CORATEST.pubSubSpy();
		textProvider = CORATEST.textProviderStub();
		jsBookkeeper = CORATEST.jsBookkeeperSpy();
		presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		pVarViewFactory = CORATEST.standardFactorySpy("pVarViewSpy");
		pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");


		dependencies = {
			clientInstanceProvider: CORATEST.clientInstanceProviderSpy(),
			metadataProvider: metadataProvider,
			presentationFactory: presentationFactory,
			pubSub: pubSub,
			textProvider: textProvider,
			jsBookkeeper: jsBookkeeper,
			pVarViewFactory: pVarViewFactory,
			pAttributesFactory: pAttributesFactory
		};
		spec = {
			presentationCounter: "1-333",
			path: [],
			metadataIdUsedInData: "textVariableId",
			cPresentation: CORA.coraData(metadataProvider.getMetadataById("pVarTextVariableId"))
		};


	});
	hooks.afterEach(() => {
		//no after
	});

	const createChildSpy = function() {
		let lastValueSentToValidateTypeSpecificValue = "no call to validateTypeSpecificValue";
		let lastInfoValueForViewMode = "";
		const addTypeSpecificInfoToViewSpec = function(mode, pVarViewSpec) {
			lastInfoValueForViewMode = mode;
			pVarViewSpec.childExtra = "added by child";
		};
		const validateTypeSpecificValue = function(value) {
			lastValueSentToValidateTypeSpecificValue = value;
			return true;
		};
		const getLastValueSentToValidateTypeSpecificValue = function(value) {
			return lastValueSentToValidateTypeSpecificValue;
		};
		const autoFormatEnteredValue = function(valueFromView) {
			return valueFromView;
		};
		let lastTransformValueForViewMode = "";
		const transformValueForView = function(mode, valueFromView) {
			lastTransformValueForViewMode = mode;
			return "Transformed " + valueFromView;
		};
		const getLastTransformValueForViewMode = function(value) {
			return lastTransformValueForViewMode;
		};
		return {
			type: "fakeChildType",
			getLastValueSentToValidateTypeSpecificValue: getLastValueSentToValidateTypeSpecificValue,
			addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec,
			validateTypeSpecificValue: validateTypeSpecificValue,
			autoFormatEnteredValue: autoFormatEnteredValue,
			transformValueForView: transformValueForView,
			getLastTransformValueForViewMode: getLastTransformValueForViewMode
		};
	};

	const testVariableSubscription = function(pParentVar, dependencies, path, disablePath, assert) {
		let subscriptions = dependencies.pubSub.getSubscriptions();

		let firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, path);
		assert.ok(firstSubsription.functionToCall === pParentVar.handleSetValueMsg);

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

	const testParentVariableMetadata = function(pParentVar, assert) {
		assert.strictEqual(pParentVar.getText(), "Exempel textvariabel");
		assert.strictEqual(pParentVar.getDefText(), "Detta är en exempeldefinition "
			+ "för en textvariabel.");
	};

	const testJSBookkeeperNoCall = function(jsBookkeeper, assert) {
		let dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 0);
	};

	const testJSBookkeeperOneCallWithValue = function(jsBookkeeper, value, path, assert) {
		let dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 1);
		assert.strictEqual(dataArray[0].data, value);
		assert.deepEqual(dataArray[0].path, path);
	};

	test("testGetType", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.strictEqual(pParentVar.type, "pParentVar");
	});

	test("testGetDependencies", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.strictEqual(pParentVar.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.strictEqual(pParentVar.getSpec(), spec);
	});

	test("testGetView", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());
		let spyView = pVarViewFactory.getFactored(0);
		assert.strictEqual(pParentVar.getView(), spyView.getView());
	});

	test("testInitText2", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.equal(pParentVar.getState(), "ok");

		testVariableSubscription(pParentVar, dependencies, spec.path, spec.path, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testFactoredViewCorrectlyForInputVariable", function(assert) {
		spec.path = ["one", "two"];
		let child = createChildSpy();

		let pParentVar = CORA.pParentVar(dependencies, spec, child);

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
		let expectedPVarViewSpec = {
			className: "pVar fakeChildType pVarTextVariableId",
			valueViewClassName: "onetwo",
			label: "Exempel textvariabel",
			id: "1-333",
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


	test("testFactoredViewCorrectlyForInputTextVariableShowLabelFalse", function(assert) {
		spec.path = ["one", "two"];
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pVarTextVariableIdShowLabelFalse"))

		CORA.pParentVar(dependencies, spec, createChildSpy());

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.strictEqual(pVarViewSpy.getSpec().label, undefined);
	});

	test("testFactoredViewCorrectlyForInputTextVariableSpecifiedLabelText", function(assert) {
		spec.path = ["one", "two"];
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pVarTextVariableIdSpecifiedLabelText"))

		CORA.pParentVar(dependencies, spec, createChildSpy());

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.strictEqual(pVarViewSpy.getSpec().label, "specifiedLabelText_text");
	});

	test("testFactoredViewCorrectlyForInputTextVariableNoEmptyTextId", function(assert) {
		spec.path = ["one", "two"];
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pVarTextVariableIdInputPassword"))

		CORA.pParentVar(dependencies, spec, createChildSpy());

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.strictEqual(pVarViewSpy.getSpec().placeholderText, undefined);
	});

	test("testFactoredPAttributes", function(assert) {
		spec.metadataIdUsedInData = "textVariableWithAnAttribute";
		CORA.pParentVar(dependencies, spec, createChildSpy());

		let pVarViewSpy = pVarViewFactory.getFactored(0);

		let attributesSpec = pAttributesFactory.getSpec(0);

		assert.strictEqual(attributesSpec.addViewToParent, pVarViewSpy.addAttributesView);
		assert.strictEqual(attributesSpec.path, spec.path);
		assert.strictEqual(attributesSpec.mode, "input");
		assert.strictEqual(attributesSpec.toShow, "all");
	});

	test("testFactoredPAttributes_notFactoredIfNoAttributes", function(assert) {
		CORA.pParentVar(dependencies, spec, createChildSpy());

		pVarViewFactory.getFactored(0);

		assert.strictEqual(pAttributesFactory.getNoOfFactored(), 0);
	});

	test("testFactoredPAttributes_attributesToShow_sentOnToAttributesFactory", function(assert) {
		spec.metadataIdUsedInData = "textVariableWithAnAttribute";
		let attributesToShow = {
			name: "attributesToShow",
			value: "selectable"
		};
		spec.cPresentation.getData().children.push(attributesToShow);
		CORA.pParentVar(dependencies, spec, createChildSpy());

		let attributesSpec = pAttributesFactory.getSpec(0);
		assert.strictEqual(attributesSpec.toShow, "selectable");
	});

	test("testMetadataIdUsedInData_IsUsedAndNot_PresentationOf", function(assert) {
		let pVarTextVariableId2 = metadataProvider.getMetadataById("pVarTextVariableId2");
		let presentationOf2 = pVarTextVariableId2.children[1].children[1].value;
		let textVariableId2 = metadataProvider.getMetadataById(presentationOf2);
		assert.strictEqual(textVariableId2.children[0].value, "(^[0-9A-Za-z]{2,50}$)");

		spec.path = ["one", "two"];
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pVarTextVariableIdSpecifiedLabelText"));

		CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.strictEqual(metadataProvider.getRequestedMetadataIds().pop(), "textVariableId");
	});

	test("testInitTextArea", function(assert) {
		spec.path = ["one", "two"];
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.equal(pParentVar.getState(), "ok");
		testVariableSubscription(pParentVar, dependencies, spec.path, spec.path, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testInitTextAreaWithFirstLevelPath", function(assert) {
		let firstLevelPath = ["textVariableId"];
		let expectedDisablePath = ["textVariableId"];
		spec.path = firstLevelPath;
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.equal(pParentVar.getState(), "ok");
		testVariableSubscription(pParentVar, dependencies, firstLevelPath, expectedDisablePath, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testInitWithFirstLevelPathWithRepeatId", function(assert) {
		let firstLevelPath = ["textVariableId.0"];
		let expectedDisablePath = ["textVariableId"];
		spec.path = firstLevelPath;
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.equal(pParentVar.getState(), "ok");
		testVariableSubscription(pParentVar, dependencies, firstLevelPath, expectedDisablePath, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testTextAreaWithTwoLevelPath", function(assert) {
		let firstLevelPath = ["recordInfo", "dataDivider"];
		let expectedDisablePath = firstLevelPath;
		spec.path = firstLevelPath;
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.equal(pParentVar.getState(), "ok");
		testVariableSubscription(pParentVar, dependencies, firstLevelPath, expectedDisablePath, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testInitTextAreaWithThreeLevelPath", function(assert) {
		let firstLevelPath = ["recordInfo", "dataDivider", "linkedRecordType"];
		let expectedDisablePath = firstLevelPath;
		spec.path = firstLevelPath;
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.equal(pParentVar.getState(), "ok");
		testVariableSubscription(pParentVar, dependencies, firstLevelPath, expectedDisablePath, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testInitTextAreaWithPathWithRepeatId", function(assert) {
		let firstLevelPath = ["userRole.0", "userRole"];
		let expectedDisablePath = firstLevelPath;
		spec.path = firstLevelPath;
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.equal(pParentVar.getState(), "ok");
		testVariableSubscription(pParentVar, dependencies, firstLevelPath, expectedDisablePath, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testPathWithTwoLevelPathWithRepeatId", function(assert) {
		let firstLevelPath = ["userRole", "userRole.0"];
		let expectedDisablePath = ["userRole", "userRole"];;
		spec.path = firstLevelPath;
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.equal(pParentVar.getState(), "ok");
		testVariableSubscription(pParentVar, dependencies, firstLevelPath, expectedDisablePath, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testInitTextAreaWithPathWithAttribute", function(assert) {
		let firstLevelPath = ["textPart", "numVariableId"];
		let expectedDisablePath = firstLevelPath;
		spec.path = firstLevelPath;
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.equal(pParentVar.getState(), "ok");
		testVariableSubscription(pParentVar, dependencies, firstLevelPath, expectedDisablePath, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testFactoredViewCorrectlyForInputTextAreaVariable", function(assert) {
		spec.path = ["one", "two"];
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("textVariableIdTextAreaPVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
		let expectedPVarViewSpec = {
			className: "pVar fakeChildType textVariableIdTextAreaPVar",
			valueViewClassName: "onetwo",
			label: "Exempel textvariabel",
			id: "1-333",
			mode: "input",
			info: {
				defText: "Detta är en exempeldefinition för en textvariabel.",
				technicalInfo: [],
				text: "Exempel textvariabel"
			},
			onblurFunction: pParentVar.onBlur,
			onkeyupFunction: pParentVar.onkeyup,
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

	test("testInitTextNoInputTypeIsShownAsText", function(assert) {
		spec.path = ["one", "two"];
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById(
			"textVariableIdShowTextAreaFalsePVar"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
		let expectedPVarViewSpec = {
			className: "pVar fakeChildType textVariableIdShowTextAreaFalsePVar",
			valueViewClassName: "onetwo",
			label: "Exempel textvariabel",
			id: "1-333",
			mode: "input",
			info: {
				defText: "Detta är en exempeldefinition för en textvariabel.",
				technicalInfo: [],
				text: "Exempel textvariabel"
			},
			onblurFunction: pParentVar.onBlur,
			onkeyupFunction: pParentVar.onkeyup,
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
		testVariableSubscription(pParentVar, dependencies, spec.path, spec.path, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testInitTextInputFormatPassword", function(assert) {
		spec.path = ["one", "two"];
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById(
			"pVarTextVariableIdInputPassword"))

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
		let expectedPVarViewSpec = {
			className: "pVar fakeChildType pVarTextVariableId",
			valueViewClassName: "onetwo",
			label: "Exempel textvariabel",
			id: "1-333",
			mode: "input",
			info: {
				defText: "Detta är en exempeldefinition för en textvariabel.",
				technicalInfo: [],
				text: "Exempel textvariabel"
			},
			onblurFunction: pParentVar.onBlur,
			onkeyupFunction: pParentVar.onkeyup,
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
		testVariableSubscription(pParentVar, dependencies, spec.path, spec.path, assert);
		testParentVariableMetadata(pParentVar, assert);
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testInitTextInputNoRecordInfoAsInFakePresentationForAttributes", function(assert) {
		spec.path = ["one", "two"];
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById(
			"pVarTextVariableIdNoRecordInfoAsInFakePresentationForAttributes"))

		spec.path = ["one", "two.0", "three.9"];
		let child = createChildSpy();

		let pParentVar = CORA.pParentVar(dependencies, spec, child);

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
		let expectedPVarViewSpec = {
			className: "pVar fakeChildType",
			valueViewClassName: "onetwo-0three-9",
			label: "Exempel textvariabel",
			id: "1-333",
			mode: "input",
			info: {
				defText: "Detta är en exempeldefinition för en textvariabel.",
				technicalInfo: [],
				text: "Exempel textvariabel"
			},
			onblurFunction: pParentVar.onBlur,
			onkeyupFunction: pParentVar.onkeyup,
			placeholderText: "Skriv din text här",
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
	test("testSetValueInput", function(assert) {
		const childSpy = createChildSpy();
		let pParentVar = CORA.pParentVar(dependencies, spec, childSpy);
		let data = {
			dataOrigin: "final",
			data: "A Value",
			path: []
		};
		pParentVar.handleSetValueMsg(data);

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.equal(pVarViewSpy.getValue(), "Transformed A Value");

		assert.strictEqual(childSpy.getLastTransformValueForViewMode(), "input");
	});

	test("testSetValueNoChangeToShowHideInInputMode", function(assert) {
		const pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());
		let data = {
			dataOrigin: "startup",
			data: "A Value",
			path: []
		};
		pParentVar.handleSetValueMsg(data);


		let spyView = pVarViewFactory.getFactored(0);
		assert.strictEqual(spyView.getShowCalled(), 0);
		assert.strictEqual(spyView.getHideCalled(), 0);
	});

	test("testHandleMessage", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());
		let data = {
			dataOrigin: "final",
			data: "A new value",
			path: []
		};
		pParentVar.handleSetValueMsg(data);
		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.equal(pVarViewSpy.getValue(), "Transformed A new value");
		assert.equal(pVarViewSpy.getState(), "ok");

		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "1-333", "1-333", "visible", false);

		data.dataOrigin = "startup";
		data.data = "some other value";
		pParentVar.handleSetValueMsg(data);
		assertNumberOfMessages(assert, 2);
		assertMessageNumberIsSentToWithInfo(assert, 1, "1-333", "1-333", "visible", true);

		data.dataOrigin = "user";
		data.data = "";
		pParentVar.handleSetValueMsg(data);
		assertNumberOfMessages(assert, 3);
		assertMessageNumberIsSentToWithInfo(assert, 2, "1-333", "1-333", "visible", false);

	});
	test("testHandleMessage_output", function(assert) {
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("idTextOutputPVar"));

		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());
		let data = {
			dataOrigin: "final",
			data: "A new value",
			path: []
		};
		pParentVar.handleSetValueMsg(data);
		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.equal(pVarViewSpy.getValue(), "Transformed A new value");
		assert.equal(pVarViewSpy.getState(), "ok");

		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "1-333", "1-333", "visible", false);

		data.dataOrigin = "startup";
		data.data = "some other value";
		pParentVar.handleSetValueMsg(data);
		assertNumberOfMessages(assert, 2);
		assertMessageNumberIsSentToWithInfo(assert, 1, "1-333", "1-333", "visible", true);

		data.dataOrigin = "user";
		data.data = "";
		pParentVar.handleSetValueMsg(data);
		assertNumberOfMessages(assert, 3);
		assertMessageNumberIsSentToWithInfo(assert, 2, "1-333", "1-333", "hidden", false);

	});


	const assertNumberOfMessages = function(assert, noMessages) {
		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, noMessages);
	};

	const assertMessageNumberIsSentToWithInfo = function(assert, messageNo, parentPresentationCounter,
		presentationCounter, visibility, containsData) {
		let messages = pubSub.getMessages();
		let message0 = messages[messageNo];
		assert.strictEqual(message0.type, "visibilityChange");
		assert.stringifyEqual(message0.message.path, [parentPresentationCounter]);
		assert.strictEqual(message0.message.presentationCounter, presentationCounter);
		assert.strictEqual(message0.message.visibility, visibility);
		assert.strictEqual(message0.message.containsData, containsData, "containsData is wrong");
	};

	test("testChangedValueEmpty", function(assert) {
		spec.path = ["one", "two"];
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let data = {
			data: "notEmpty",
			path: ["one", "two"]
		};
		pParentVar.handleSetValueMsg(data);
		let pVarViewSpy = pVarViewFactory.getFactored(0);
		pVarViewSpy.callOnblurWithValue("");
		assert.equal(pParentVar.getState(), "ok");
		testJSBookkeeperOneCallWithValue(jsBookkeeper, "", ["one", "two"], assert);
	});

	test("testAutoFormatEnteredValueEmptyDoNothing", function(assert) {
		let child = createChildSpy();
		child.autoFormatEnteredValue = function(valueFromView) {
			return "autoFormatEnteredValue by child";
		};
		spec.path = ["one", "two"];
		let pParentVar = CORA.pParentVar(dependencies, spec, child);

		let data = {
			data: "",
			path: ["one", "two"]
		};
		pParentVar.handleSetValueMsg(data);
		let pVarViewSpy = pVarViewFactory.getFactored(0);

		pParentVar.onBlur("");

		assert.equal(pVarViewSpy.getValue(), "");
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testAutoFormatEnteredValueEmptyDoNothing", function(assert) {
		let child = createChildSpy();
		child.autoFormatEnteredValue = function(valueFromView) {
			return "autoFormatEnteredValue by child";
		};
		spec.path = ["one", "two"];
		let pParentVar = CORA.pParentVar(dependencies, spec, child);

		let data = {
			data: "Not empty",
			path: ["one", "two"]
		};
		pParentVar.handleSetValueMsg(data);
		let pVarViewSpy = pVarViewFactory.getFactored(0);

		pParentVar.onBlur("some value");

		assert.equal(pVarViewSpy.getValue(), "autoFormatEnteredValue by child");
		testJSBookkeeperOneCallWithValue(jsBookkeeper, "autoFormatEnteredValue by child",
			["one", "two"], assert);
	});

	test("testChangedValueOk", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		pVarViewSpy.callOnblurWithValue("hej");
		assert.equal(pVarViewSpy.getState(), "ok");
		assert.equal(pParentVar.getState(), "ok");
		testJSBookkeeperOneCallWithValue(jsBookkeeper, "hej", [], assert);
		pVarViewSpy.callOnblurWithValue("hej");
		testJSBookkeeperOneCallWithValue(jsBookkeeper, "hej", [], assert);
	});

	test("testChangedValueError", function(assert) {
		const childSpy = createChildSpy();
		childSpy.validateTypeSpecificValue = function() { return false; }
		let pParentVar = CORA.pParentVar(dependencies, spec, childSpy);

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		pVarViewSpy.callOnblurWithValue("hej####/(&/%&/¤/");
		assert.equal(pVarViewSpy.getState(), "error");
		assert.equal(pParentVar.getState(), "error");
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testHandleValidationError", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let message = {
			metadataId: "textVariableId",
			path: []
		};

		pParentVar.handleValidationError(message);

		assert.equal(pParentVar.getState(), "error");
		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.equal(pVarViewSpy.getState(), "error");
	});

	test("testHandleValidationErrorResetBySetValue", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let message = {
			metadataId: "textVariableId",
			path: []
		};

		pParentVar.handleValidationError(message);

		assert.equal(pParentVar.getState(), "error");
		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.equal(pVarViewSpy.getState(), "error");

		let data = {
			data: "A new value",
			path: []
		};
		pParentVar.handleSetValueMsg(data);
		assert.equal(pVarViewSpy.getState(), "ok");
	});


	test("testChangedValueEmpty", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let data = {
			data: "notEmpty",
			path: []
		};

		pParentVar.handleSetValueMsg(data);

		let pVarViewSpy = pVarViewFactory.getFactored(0);

		pVarViewSpy.callOnkeyupWithValue("");

		assert.equal(pVarViewSpy.getState(), "ok");
		assert.equal(pParentVar.getState(), "ok");
		testJSBookkeeperOneCallWithValue(jsBookkeeper, "", [], assert);
	});

	test("testChangedValueNoCallToChildValidateTypeSpecificValue", function(assert) {
		const childSpy = createChildSpy();
		CORA.pParentVar(dependencies, spec, childSpy);

		let pVarViewSpy = pVarViewFactory.getFactored(0);

		pVarViewSpy.callOnkeyupWithValue("");

		assert.strictEqual(childSpy.getLastValueSentToValidateTypeSpecificValue(),
			"no call to validateTypeSpecificValue");
	});

	test("testChangedValueOk", function(assert) {
		const childSpy = createChildSpy();
		let pParentVar = CORA.pParentVar(dependencies, spec, childSpy);

		let pVarViewSpy = pVarViewFactory.getFactored(0);

		pVarViewSpy.callOnkeyupWithValue("hej");

		assert.strictEqual(childSpy.getLastValueSentToValidateTypeSpecificValue(), "hej");

		assert.equal(pVarViewSpy.getState(), "ok");
		assert.equal(pParentVar.getState(), "ok");
		testJSBookkeeperOneCallWithValue(jsBookkeeper, "hej", [], assert);
		pVarViewSpy.callOnkeyupWithValue("hej");
		testJSBookkeeperOneCallWithValue(jsBookkeeper, "hej", [], assert);
	});

	test("testChangedValueError", function(assert) {
		const childSpy = createChildSpy();
		childSpy.validateTypeSpecificValue = function() { return false; }
		let pParentVar = CORA.pParentVar(dependencies, spec, childSpy);

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		pVarViewSpy.callOnkeyupWithValue("hej####/(&/%&/¤/");
		assert.equal(pVarViewSpy.getState(), "errorStillFocused");
		assert.equal(pParentVar.getState(), "errorStillFocused");
		testJSBookkeeperNoCall(jsBookkeeper, assert);
	});

	test("testOpenTextIdRecord", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pParentVar.openTextIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://localhost:8080/therest/rest/record/text/" + "textVariableId" + "Text",
				accept: "application/vnd.cora.record+json"
			},
			loadInBackground: "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event2.ctrlKey = false;
		pParentVar.openTextIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testOpenDefTextIdRecord", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pParentVar.openDefTextIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://localhost:8080/therest/rest/record/text/" + "textVariableId"
					+ "DefText",
				accept: "application/vnd.cora.record+json"
			},
			loadInBackground: "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event2.ctrlKey = false;
		pParentVar.openDefTextIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testOpenMetadataIdRecord", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pParentVar.openMetadataIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://fake.from.metadataproviderstub/rest/record/sometype/textVariableId",
				accept: "application/vnd.cora.record+json"
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

	test("testOpenPresentationIdRecord", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pParentVar.openPresentationIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://fake.from.metadataproviderstub/rest/record/sometype/"
					+ "pVarTextVariableId",
				accept: "application/vnd.cora.record+json"
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

	test("testOpenLinkedRecordForLink", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let event = document.createEvent('Event');
		let link = {
			requestMethod: "GET",
			rel: "read",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/"
				+ "pVarTextVariableId",
			accept: "application/vnd.cora.record+json"
		};
		event.ctrlKey = true;
		pParentVar.openLinkedRecordForLink(event, link);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://fake.from.metadataproviderstub/rest/record/sometype/"
					+ "pVarTextVariableId",
				accept: "application/vnd.cora.record+json"
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

	test("testDisable", function(assert) {
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		pParentVar.disableVar();

		let pVarViewSpy = pVarViewFactory.getFactored(0);
		assert.equal(pVarViewSpy.getDisabledCalled(), true);
	});

	test("testDisableAttributes", function(assert) {
		spec.metadataIdUsedInData = "textVariableWithAnAttribute";
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		let pAttributesSpy = pAttributesFactory.getFactored(0);
		assert.strictEqual(pAttributesSpy.getNoOfCallsToDisable(), 0);

		pParentVar.disableVar();

		assert.strictEqual(pAttributesSpy.getNoOfCallsToDisable(), 1);
	});

	test("testGetPresentationCounter", function(assert) {
		spec.metadataIdUsedInData = "textVariableWithAnAttribute";
		let pParentVar = CORA.pParentVar(dependencies, spec, createChildSpy());

		assert.strictEqual(pParentVar.getPresentationCounter(), spec.presentationCounter);
	});
});
