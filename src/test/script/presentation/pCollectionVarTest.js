/*
 * Copyright 2016, 2020, 2024 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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
QUnit.module("presentation/pCollectionVarTest.js", hooks => {
	const test = QUnit.test;
	let metadataProvider;
	let textProvider;
	let pParentVarFactory;
	let dependencies;
	let spec;

	hooks.beforeEach(() => {
		metadataProvider = CORATEST.MetadataProviderStub();
		textProvider = CORATEST.textProviderStub();
		pParentVarFactory = CORATEST.standardParentFactorySpy("pParentVarSpy");


		dependencies = {
			metadataProvider: metadataProvider,
			textProvider: textProvider,
			pParentVarFactory: pParentVarFactory
		};
		spec = {
			path: [],
			metadataIdUsedInData: "userSuppliedIdCollectionVar",
			cPresentation: CORA.coraData(metadataProvider
				.getMetadataById("yesNoUnknownPCollVar"))
		};
	});


	test("testGetType", function(assert) {
		let pCollVar = CORA.pCollectionVar(dependencies, spec);

		assert.strictEqual(pCollVar.type, "pCollVar");
	});

	test("testGetDependencies", function(assert) {
		let pCollVar = CORA.pCollectionVar(dependencies, spec);

		assert.strictEqual(pCollVar.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let pCollVar = CORA.pCollectionVar(dependencies, spec);

		assert.strictEqual(pCollVar.getSpec(), spec);
	});

	test("testParentStarted", function(assert) {
		CORA.pCollectionVar(dependencies, spec);

		let pParentVarFactorySpec = pParentVarFactory.getSpec(0);
		assert.strictEqual(pParentVarFactorySpec, spec);

		const child = pParentVarFactory.getChild(0);

		assert.strictEqual(child.type, "pCollectionVar");
		assert.notEqual(child.addTypeSpecificInfoToViewSpec, undefined);
		assert.notEqual(child.validateTypeSpecificValue, undefined);
		assert.notEqual(child.transformValueForView, undefined);
	});

	test("testGetViewUsesPParentVarGetView", function(assert) {
		let pCollVar = CORA.pCollectionVar(dependencies, spec);
		let pParentVar = pParentVarFactory.getFactored(0);

		assert.strictEqual(pCollVar.getView, pParentVar.getView);
	});

	test("testDisableVarUsesPParentVarDisableVar", function(assert) {
		let pCollVar = CORA.pCollectionVar(dependencies, spec);
		let pParentVar = pParentVarFactory.getFactored(0);

		assert.strictEqual(pCollVar.disableVar, pParentVar.disableVar);
	});

	test("testFactoredViewCorrectlyForInputCollectionVariable", function(assert) {
		let pCollectionVar = CORA.pCollectionVar(dependencies, spec);
		const child = pParentVarFactory.getChild(0);
		let viewSpec = {
			info: {
				technicalInfo: []
			}
		};

		child.addTypeSpecificInfoToViewSpec("input", viewSpec);

		let expectedSpec = {
			type: "pCollVar",
			options: [
				["-- Gör ett val ur listan --", ""],
				["false translated", "false"],
				["true translated", "true"]
			],
			info: {
				technicalInfo: [
					{
						text: `itemCollection: trueFalseCollection`,
						onclickMethod: pCollectionVar.openRefCollectionIdRecord
					},
					{ text: "(false) false translated - false" },
					{ text: "(true) true translated - true" }
				]
			}
		};
		assert.deepEqual(viewSpec, expectedSpec);
	});

	test("testFactoredViewCorrectlyForInputCollectionVariableNoEmptyTextId", function(assert) {
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("userSuppliedIdNoEmptyTextIdCollectionVarPCollVar"))
		let pCollectionVar = CORA.pCollectionVar(dependencies, spec);
		const child = pParentVarFactory.getChild(0);
		let viewSpec = {
			info: {
				technicalInfo: []
			}
		};

		child.addTypeSpecificInfoToViewSpec("input", viewSpec);

		let expectedSpec = {
			type: "pCollVar",
			options: [
				["false translated", "false"],
				["true translated", "true"]
			],
			info: {
				technicalInfo: [
					{
						text: `itemCollection: trueFalseCollection`,
						onclickMethod: pCollectionVar.openRefCollectionIdRecord
					},
					{ text: "(false) false translated - false" },
					{ text: "(true) true translated - true" }
				]
			}
		};
		assert.deepEqual(viewSpec, expectedSpec);
	});

	test("testFactoredViewCorrectlyForOutputNoOptions", function(assert) {
		let pCollectionVar = CORA.pCollectionVar(dependencies, spec);
		const child = pParentVarFactory.getChild(0);
		let viewSpec = {
			info: {
				technicalInfo: []
			}
		};

		child.addTypeSpecificInfoToViewSpec("output", viewSpec);

		let expectedSpec = {
			type: "pCollVar",
			info: {
				technicalInfo: [
					{
						text: `itemCollection: trueFalseCollection`,
						onclickMethod: pCollectionVar.openRefCollectionIdRecord
					},
					{ text: "(false) false translated - false" },
					{ text: "(true) true translated - true" }
				]
			}
		};
		assert.deepEqual(viewSpec, expectedSpec);
	});

	test("testOpenRefCollectionIdRecord", function(assert) {
		let pCollectionVar = CORA.pCollectionVar(dependencies, spec);
		let event = document.createEvent('Event');
		event.ctrlKey = true;

		pCollectionVar.openRefCollectionIdRecord(event);

		let pParentVar = pParentVarFactory.getFactored(0);
		let expected = [event, {
			accept: "application/vnd.cora.record+json",
			rel: "read",
			requestMethod: "GET",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/trueFalseCollection"
		}];
		assert.deepEqual(pParentVar.getOpenLinkedRecordForLink(0), expected);
	});

	test("testValidateTypeSpecificValueValid", function(assert) {
		CORA.pCollectionVar(dependencies, spec);
		const child = pParentVarFactory.getChild(0);

		const valid = child.validateTypeSpecificValue("input", "A Value");

		assert.true(valid);
	});

	test("testAutoFormatEnteredValueDoNothing", function(assert) {
		CORA.pCollectionVar(dependencies, spec);
		const child = pParentVarFactory.getChild(0);

		const formated = child.autoFormatEnteredValue("Hej hopp");

		assert.strictEqual(formated, "Hej hopp");
	});

	test("testTransformValueForViewDoNothingOnInput", function(assert) {
		CORA.pCollectionVar(dependencies, spec);
		const child = pParentVarFactory.getChild(0);

		const transformed = child.transformValueForView("input", "true");

		assert.strictEqual(transformed, "true");
	});

	test("testTransformValueForViewTranslateValueToTextOnOutputEmptyValue", function(assert) {
		CORA.pCollectionVar(dependencies, spec);
		const child = pParentVarFactory.getChild(0);

		const transformed = child.transformValueForView("output", "");

		assert.strictEqual(transformed, "");
	});

	test("testTransformValueForViewTranslateValueToTextOnOutput", function(assert) {
		CORA.pCollectionVar(dependencies, spec);
		const child = pParentVarFactory.getChild(0);

		const transformed = child.transformValueForView("output", "true");

		assert.strictEqual(transformed, "true translated");
	});
});
