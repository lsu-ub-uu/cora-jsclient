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
QUnit.module("presentation/pVarTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pParentVarFactory = CORATEST.standardParentFactorySpy("pParentVarSpy");
		
		
		this.dependencies = {
			metadataProvider: this.metadataProvider,
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

	assert.strictEqual(pVar.getSpec(), this.spec);
});

QUnit.test("testParentStarted", function(assert) {
	CORA.pVar(this.dependencies, this.spec);
	
	let pParentVarFactory = this.pParentVarFactory.getSpec(0);
	assert.strictEqual(pParentVarFactory, this.spec);
	
	const child = this.pParentVarFactory.getChild(0);

	assert.notEqual(child.addTypeSpecificInfoToViewSpec, undefined);
	assert.notEqual(child.validateTypeSpecificValue, undefined);
	assert.notEqual(child.transformValueForView, undefined);
});

QUnit.test("testGetViewUsesPParentVarGetView", function(assert) {
	let pVar = CORA.pVar(this.dependencies, this.spec);
	let pParentVar = this.pParentVarFactory.getFactored(0);
	
	assert.strictEqual(pVar.getView, pParentVar.getView);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariable", function(assert) {
	CORA.pVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("input", viewSpec);
	
	let expectedSpec = {
		type: "pTextVar",
		inputType: "input",
		outputFormat: "text",
		inputFormat: "text",
		info:{
			technicalInfo:[
				{text: "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"}
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testFactoredViewCorrectlyForInputTextAreaVariable", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"textVariableIdTextAreaPVar"))
	CORA.pVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("input", viewSpec);
	
	let expectedSpec = {
		type: "pTextVar",
		inputType: "textarea",
		outputFormat: "text",
		inputFormat: "text",
		info:{
			technicalInfo:[
				{text: "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"}
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testInitTextNoInputTypeIsShownAsText", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"textVariableIdShowTextAreaFalsePVar"))
	CORA.pVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("input", viewSpec);
	
	let expectedSpec = {
		type: "pTextVar",
		inputType: "input",
		outputFormat: "text",
		inputFormat: "text",
		info:{
			technicalInfo:[
				{text: "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"}
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testInitTextInputFormatPassword", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdInputPassword"))
	CORA.pVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("input", viewSpec);
	
	let expectedSpec = {
		type: "pTextVar",
		inputType: "input",
		outputFormat: "text",
		inputFormat: "password",
		info:{
			technicalInfo:[
				{text: "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"}
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testInitTextOutputFormatImage", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdOutputImage"))
	CORA.pVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("output", viewSpec);
	
	let expectedSpec = {
		type: "pTextVar",
		inputType: "input",
		outputFormat: "image",
		inputFormat: "text",
		info:{
			technicalInfo:[
				{text: "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"}
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testValidateTypeSpecificValueValid", function(assert) {
	CORA.pVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("A Value");
	
	assert.true(valid);
});

QUnit.test("testValidateTypeSpecificValueValid", function(assert) {
	CORA.pVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("hej####/(&/%&/¤/");
	
	assert.false(valid);
});

QUnit.test("testAutoFormatEnteredValueDoNothing", function(assert) {
	CORA.pVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const formated = child.autoFormatEnteredValue("Hej hopp");
	
	assert.strictEqual(formated, "Hej hopp");
});

QUnit.test("testTransformValueForViewDoNothing", function(assert) {
	CORA.pVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const transformed = child.transformValueForView("input", "Hej hopp");
	
	assert.strictEqual(transformed, "Hej hopp");
});
