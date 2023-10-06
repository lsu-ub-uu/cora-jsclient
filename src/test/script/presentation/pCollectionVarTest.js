/*
 * Copyright 2016, 2020 Uppsala University Library
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
QUnit.module("presentation/pCollectionVarTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.textProvider = new CORATEST.textProviderStub();
		this.pParentVarFactory = CORATEST.standardParentFactorySpy("pParentVarSpy");
		
		
		this.dependencies = {
			metadataProvider: this.metadataProvider,
			textProvider: this.textProvider,
			pParentVarFactory: this.pParentVarFactory
		};
		this.spec = {
			path: [],
			metadataIdUsedInData: "userSuppliedIdCollectionVar",
			cPresentation: CORA.coraData(this.metadataProvider
				.getMetadataById("yesNoUnknownPCollVar"))
		};
	}
});

QUnit.test("testGetType", function(assert) {
	let pCollVar = CORA.pCollectionVar(this.dependencies, this.spec);

	assert.strictEqual(pCollVar.type, "pCollVar");
});

QUnit.test("testGetDependencies", function(assert) {
	let pCollVar = CORA.pCollectionVar(this.dependencies, this.spec);

	assert.strictEqual(pCollVar.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let pCollVar = CORA.pCollectionVar(this.dependencies, this.spec);

	assert.strictEqual(pCollVar.getSpec(), this.spec);
});

QUnit.test("testParentStarted", function(assert) {
	CORA.pCollectionVar(this.dependencies, this.spec);
	
	let pParentVarFactory = this.pParentVarFactory.getSpec(0);
	assert.strictEqual(pParentVarFactory, this.spec);
	
	const child = this.pParentVarFactory.getChild(0);

	assert.notEqual(child.addTypeSpecificInfoToViewSpec, undefined);
	assert.notEqual(child.validateTypeSpecificValue, undefined);
	assert.notEqual(child.transformValueForView, undefined);
});

QUnit.test("testGetViewUsesPParentVarGetView", function(assert) {
	let pCollVar = CORA.pCollectionVar(this.dependencies, this.spec);
	let pParentVar = this.pParentVarFactory.getFactored(0);
	
	assert.strictEqual(pCollVar.getView, pParentVar.getView);
});

QUnit.test("testFactoredViewCorrectlyForInputCollectionVariable", function(assert) {
	let pCollectionVar = CORA.pCollectionVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
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
		info:{
			technicalInfo:[
				{text: `itemCollection: trueFalseCollection`,
				onclickMethod: pCollectionVar.openRefCollectionIdRecord}
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testFactoredViewCorrectlyForInputCollectionVariableNoEmptyTextId", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
				.getMetadataById("userSuppliedIdNoEmptyTextIdCollectionVarPCollVar"))
	let pCollectionVar = CORA.pCollectionVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("input", viewSpec);
	
	let expectedSpec = {
		type: "pCollVar",
		options: [
			["false translated", "false"],
			["true translated", "true"]
		],
		info:{
			technicalInfo:[
				{text: `itemCollection: trueFalseCollection`,
				onclickMethod: pCollectionVar.openRefCollectionIdRecord}
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testFactoredViewCorrectlyForOutputNoOptions", function(assert) {
	let pCollectionVar = CORA.pCollectionVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("output", viewSpec);
	
	let expectedSpec = {
		type: "pCollVar",
		info:{
			technicalInfo:[
				{text: `itemCollection: trueFalseCollection`,
				onclickMethod: pCollectionVar.openRefCollectionIdRecord}
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testOpenRefCollectionIdRecord", function(assert) {
	let pCollectionVar = CORA.pCollectionVar(this.dependencies, this.spec);
	let event = document.createEvent('Event');
	event.ctrlKey = true;
	
	pCollectionVar.openRefCollectionIdRecord(event);
	
	let pParentVar = this.pParentVarFactory.getFactored(0);
	let expected = [event, {
	    "accept": "application/vnd.uub.record+json",
	    "rel": "read",
	    "requestMethod": "GET",
	    "url": "http://fake.from.metadataproviderstub/rest/record/sometype/trueFalseCollection"
	  }];
	assert.deepEqual(pParentVar.getOpenLinkedRecordForLink(0), expected);
});

QUnit.test("testValidateTypeSpecificValueValid", function(assert) {
	CORA.pCollectionVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("input", "A Value");
	
	assert.true(valid);
});

QUnit.test("testAutoFormatEnteredValueDoNothing", function(assert) {
	CORA.pCollectionVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const formated = child.autoFormatEnteredValue("Hej hopp");
	
	assert.strictEqual(formated, "Hej hopp");
});

QUnit.test("testTransformValueForViewDoNothingOnInput", function(assert) {
	CORA.pCollectionVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const transformed = child.transformValueForView("input", "true");
	
	assert.strictEqual(transformed, "true");
});

QUnit.test("testTransformValueForViewTranslateValueToTextOnOutputEmptyValue", function(assert) {
	CORA.pCollectionVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const transformed = child.transformValueForView("output", "");
	
	assert.strictEqual(transformed, "");
});

QUnit.test("testTransformValueForViewTranslateValueToTextOnOutput", function(assert) {
	CORA.pCollectionVar(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const transformed = child.transformValueForView("output", "true");
	
	assert.strictEqual(transformed, "true translated");
});
