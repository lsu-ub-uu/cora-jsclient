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
QUnit.module("presentation/pNumVarTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pParentVarFactory = CORATEST.standardParentFactorySpy("pParentVarSpy");
		
		
		this.dependencies = {
			metadataProvider: this.metadataProvider,
			pParentVarFactory: this.pParentVarFactory
		};
		this.spec = {
			path: [],
			metadataIdUsedInData: "numVariableId",
			cPresentation: CORA.coraData(this.metadataProvider
				.getMetadataById("pNumVarNumVariableId"))
		};
		this.specWithDecimals = {
			path: [],
			metadataIdUsedInData: "numVariableWithDecimalsId",
			cPresentation: CORA.coraData(this.metadataProvider
				.getMetadataById("pNumVarNumVariableId"))
		};
	}
});

QUnit.test("testGetType", function(assert) {
	let pVar = CORA.pNumVar(this.dependencies, this.spec);

	assert.strictEqual(pVar.type, "pNumVar");
});

QUnit.test("testGetDependencies", function(assert) {
	let pVar = CORA.pNumVar(this.dependencies, this.spec);

	assert.strictEqual(pVar.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let pVar = CORA.pNumVar(this.dependencies, this.spec);

	assert.strictEqual(pVar.getSpec(), this.spec);
});

QUnit.test("testParentStarted", function(assert) {
	CORA.pNumVar(this.dependencies, this.spec);
	
	let pParentVarFactory = this.pParentVarFactory.getSpec(0);
	assert.strictEqual(pParentVarFactory, this.spec);
	
	const child = this.pParentVarFactory.getChild(0);

	assert.notEqual(child.addTypeSpecificInfoToViewSpec, undefined);
	assert.notEqual(child.validateTypeSpecificValue, undefined);
});

QUnit.test("testGetViewUsesPParentVarGetView", function(assert) {
	let pVar = CORA.pNumVar(this.dependencies, this.spec);
	let pParentVar = this.pParentVarFactory.getFactored(0);
	
	assert.strictEqual(pVar.getView, pParentVar.getView);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariable", function(assert) {
	CORA.pNumVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec(viewSpec);
	
	let expectedSpec = {
		type: "pNumVar",
		info:{
			technicalInfo:[
				{
					text: "min: 0",
				}, {
					text: "max: 10"
				}, {
					text: "warningMin: 2",
				}, {
					text: "warningMax: 8"
				},{
					text: "numberOfDecimals: 0"
				}
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testValidateTypeSpecificValueValid", function(assert) {
	CORA.pNumVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("8");
	
	assert.true(valid);
});

QUnit.test("testValidateTypeSpecificValueValidNoOfDecimals", function(assert) {
	CORA.pNumVar(this.dependencies, this.specWithDecimals);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("8.12");
	
	assert.true(valid);
});

QUnit.test("testValidateTypeSpecificValueNaN", function(assert) {
	CORA.pNumVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("hej");
	
	assert.false(valid);
});

QUnit.test("testValidateTypeSpecificValueNaN", function(assert) {
	CORA.pNumVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("hej");
	
	assert.false(valid);
});

QUnit.test("testValidateTypeSpecificValueBelowMin", function(assert) {
	CORA.pNumVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("-1");
	
	assert.false(valid);
});

QUnit.test("testValidateTypeSpecificValueAboveMax", function(assert) {
	CORA.pNumVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("11");
	
	assert.false(valid);
});

QUnit.test("testValidateTypeSpecificValueWrongNoOfDecimals", function(assert) {
	CORA.pNumVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("1.1");
	
	assert.false(valid);
});

QUnit.test("testAutoFormatEnteredValueNoDecimalsDoNothing", function(assert) {
	CORA.pNumVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const formated = child.autoFormatEnteredValue("1");
	
	assert.strictEqual(formated, "1");
});

QUnit.test("testAutoFormatEnteredValueNoChangeNeeded", function(assert) {
	CORA.pNumVar(this.dependencies, this.specWithDecimals);
	const child = this.pParentVarFactory.getChild(0);
	
	const formated = child.autoFormatEnteredValue("1.11");
	
	assert.strictEqual(formated, "1.11");
});

QUnit.test("testAutoFormatEnteredValueFixCommaToDot", function(assert) {
	CORA.pNumVar(this.dependencies, this.specWithDecimals);
	const child = this.pParentVarFactory.getChild(0);
	
	const formated = child.autoFormatEnteredValue("1,11");
	
	assert.strictEqual(formated, "1.11");
});

QUnit.test("testAutoFormatEnteredValueFixToFewDecimals", function(assert) {
	CORA.pNumVar(this.dependencies, this.specWithDecimals);
	const child = this.pParentVarFactory.getChild(0);
	
	const formated = child.autoFormatEnteredValue("1,");
	
	assert.strictEqual(formated, "1.00");
});

QUnit.test("testAutoFormatEnteredValueFixToFewDecimalsOneMoreNeeded", function(assert) {
	CORA.pNumVar(this.dependencies, this.specWithDecimals);
	const child = this.pParentVarFactory.getChild(0);
	
	const formated = child.autoFormatEnteredValue("1,2");
	
	assert.strictEqual(formated, "1.20");
});

QUnit.test("testAutoFormatEnteredValueFixNoDot", function(assert) {
	CORA.pNumVar(this.dependencies, this.specWithDecimals);
	const child = this.pParentVarFactory.getChild(0);
	
	const formated = child.autoFormatEnteredValue("1");
	
	assert.strictEqual(formated, "1.00");
});