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
QUnit.module("presentation/pResourceLinkTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.textProvider = CORATEST.textProviderStub();
		this.pParentVarFactory = CORATEST.standardParentFactorySpy("pParentVarSpy");
		
		
		this.dependencies = {
			metadataProvider: this.metadataProvider,
			textProvider: this.textProvider,
			pParentVarFactory: this.pParentVarFactory,
			authTokenHolder: CORATEST.authTokenHolderSpy()
		};
		this.spec = {
			path: [],
			metadataIdUsedInData: "textVariableId",
			cPresentation: CORA.coraData(this.metadataProvider
				.getMetadataById("masterPResLink"))
		};
	}
});

QUnit.test("testGetType", function(assert) {
	let resourceLink = CORA.pResourceLink(this.dependencies, this.spec);

	assert.strictEqual(resourceLink.type, "pResourceLink");
});

QUnit.test("testGetDependencies", function(assert) {
	let resourceLink = CORA.pResourceLink(this.dependencies, this.spec);

	assert.strictEqual(resourceLink.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let resourceLink = CORA.pResourceLink(this.dependencies, this.spec);

	assert.strictEqual(resourceLink.getSpec(), this.spec);
});

QUnit.test("testParentStarted", function(assert) {
	CORA.pResourceLink(this.dependencies, this.spec);
	
	let pParentVarFactory = this.pParentVarFactory.getSpec(0);
	assert.strictEqual(pParentVarFactory, this.spec);
	
	const child = this.pParentVarFactory.getChild(0);

	assert.strictEqual(child.type, "pResourceLink");
	assert.notEqual(child.addTypeSpecificInfoToViewSpec, undefined);
	assert.notEqual(child.validateTypeSpecificValue, undefined);
	assert.notEqual(child.transformValueForView, undefined);
});

QUnit.test("testGetViewUsesPParentVarGetView", function(assert) {
	let resourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	let pParentVar = this.pParentVarFactory.getFactored(0);
	
	assert.strictEqual(resourceLink.getView, pParentVar.getView);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariable", function(assert) {
	CORA.pResourceLink(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("input", viewSpec);
	
	let expectedSpec = {
		type: "pResourceLink",
		outputFormat: "image",
		downloadText: "Ladda ner",
	  	info:{
			technicalInfo:[
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testFactoredViewCorrectlyForInputTextAreaVariable", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"textVariableIdTextAreaPVar"))
	CORA.pResourceLink(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("input", viewSpec);
	
	let expectedSpec = {
		type: "pResourceLink",
		outputFormat: "text",
		downloadText: "Ladda ner",
	  	info:{
			technicalInfo:[
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testInitTextNoInputTypeIsShownAsText", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"textVariableIdShowTextAreaFalsePVar"))
	CORA.pResourceLink(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		downloadText: "Ladda ner",
	  	info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("input", viewSpec);
	
	let expectedSpec = {
		type: "pResourceLink",
		outputFormat: "text",
		downloadText: "Ladda ner",
	  	info:{
			technicalInfo:[
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testInitTextInputFormatPassword", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdInputPassword"))
	CORA.pResourceLink(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		downloadText: "Ladda ner",
	  	info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("input", viewSpec);
	
	let expectedSpec = {
		type: "pResourceLink",
		outputFormat: "text",
		downloadText: "Ladda ner",
	  	info:{
			technicalInfo:[
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testInitTextOutputFormatImage", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(
		"pVarTextVariableIdOutputImage"))
	CORA.pResourceLink(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	let viewSpec = {
		downloadText: "Ladda ner",
	  	info:{
			technicalInfo:[]
		}
	};
	
	child.addTypeSpecificInfoToViewSpec("output", viewSpec);
	
	let expectedSpec = {
		type: "pResourceLink",
		outputFormat: "image",
		downloadText: "Ladda ner",
	  	info:{
			technicalInfo:[
			]
		}
	};
	assert.deepEqual(viewSpec, expectedSpec);
});

QUnit.test("testValidateTypeSpecificValueValid", function(assert) {
	CORA.pResourceLink(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const valid = child.validateTypeSpecificValue("A Value");
	
	assert.true(valid);
});

QUnit.test("testAutoFormatEnteredValueDoNothing", function(assert) {
	CORA.pResourceLink(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	
	const formated = child.autoFormatEnteredValue("Hej hopp");
	
	assert.strictEqual(formated, "Hej hopp");
});

QUnit.test("testTransformValueForView_pickUrl", function(assert) {
	CORA.pResourceLink(this.dependencies, this.spec);
	const child = this.pParentVarFactory.getChild(0);
	const value = {
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "http://localhost:38080/systemone/rest/record/binary/binary:49671507525818/thumbnail",
							"accept": "image/jpeg"
						}
					},
					"name": "thumbnail",
					"mimeType": "image/jpeg"
				};
	const transformed = child.transformValueForView("input", value);
	
	assert.strictEqual(transformed, "http://localhost:38080/systemone/rest/record/binary/binary:49671507525818/thumbnail?authToken=fitnesseAdminToken");
});
