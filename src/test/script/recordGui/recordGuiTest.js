/*
 * Copyright 2017, 2020 Uppsala University Library
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
QUnit.module("recordGui/recordGuiTest.js", {
	beforeEach: function() {
		this.dependencies = {
			"metadataProvider": CORATEST.metadataProviderSpy(),
			"textProvider": CORATEST.textProviderStub(),
			"pubSub": CORATEST.pubSubSpy(),
			"dataHolder": CORATEST.dataHolderSpy(),
			"jsBookkeeper": CORATEST.jsBookkeeperSpy(),
			"presentationFactory": CORATEST.standardFactorySpy("presentationSpy"),
			"metadataControllerFactory": CORATEST.standardFactorySpy("metadataControllerSpy"),
			"metadataValidatorFactory": CORATEST.standardFactorySpy("metadataValidatorSpy"),
			"presentationHolderFactory": CORATEST.standardFactorySpy("presentationHolderSpy")
		};
		this.spec = {
			"metadataId": "someMetadataId",
			"data": {},
			"dataDivider": "someDataDivider",
			recordPartPermissionCalculator : CORATEST.recordPartPermissionCalculatorSpy()
		};
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	assert.strictEqual(recordGui.type, "recordGui");
});

QUnit.test("testGetDependencies", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	assert.strictEqual(recordGui.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	assert.strictEqual(recordGui.getSpec(), this.spec);
});

QUnit.test("testGetPubSub", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	assert.strictEqual(recordGui.pubSub, this.dependencies.pubSub);
});

QUnit.test("testGetDataHolder", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	assert.strictEqual(recordGui.dataHolder, this.dependencies.dataHolder);
});

QUnit.test("testGetjsBookkeeper", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	assert.strictEqual(recordGui.jsBookkeeper, this.dependencies.jsBookkeeper);
});

QUnit.test("testGetPresentationHolder", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	let presentation = recordGui.getPresentationHolder("presentationId", "metadataIdUsedInData");
	let factoredPresentation = this.dependencies.presentationHolderFactory.getFactored(0);
	assert.strictEqual(presentation, factoredPresentation);
});

QUnit.test("testGetPresentationHolderHasCorrectSpec", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	recordGui.getPresentationHolder("presentationId", "metadataIdUsedInData");
	let factoredSpec = this.dependencies.presentationHolderFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationId, "presentationId");
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "metadataIdUsedInData");
	assert.strictEqual(factoredSpec.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(factoredSpec.pubSub, this.dependencies.pubSub);
	assert.strictEqual(factoredSpec.textProvider, this.dependencies.textProvider);
	assert.strictEqual(factoredSpec.jsBookkeeper, this.dependencies.jsBookkeeper);
	assert.strictEqual(factoredSpec.presentationFactory, this.dependencies.presentationFactory);
	assert.strictEqual(factoredSpec.recordPartPermissionCalculator, this.spec.recordPartPermissionCalculator);
});

QUnit.test("testInitMetadataControllerStartingGui", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	let metadataController = recordGui.initMetadataControllerStartingGui();
	let factoredMetadataController = this.dependencies.metadataControllerFactory.getFactored(0);
	assert.strictEqual(metadataController, factoredMetadataController);
});

QUnit.test("testInitMetadataControllerStartingGuiHasCorrectSpec", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	recordGui.initMetadataControllerStartingGui();
	let factoredSpec = this.dependencies.metadataControllerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, this.spec.metadataId);
	assert.strictEqual(factoredSpec.data, this.spec.data);
	assert.strictEqual(factoredSpec.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(factoredSpec.pubSub, this.dependencies.pubSub);
});

QUnit.test("testValidateDataUsesValidator", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	
	let validationAnswer = recordGui.validateData();
	
	let factoredValidator = this.dependencies.metadataValidatorFactory.getFactored(0);
	assert.strictEqual(validationAnswer, factoredValidator.validate());
});

QUnit.test("testValidateDataHasCorrectSpec", function(assert) {
	let recordGui = CORA.recordGui(this.dependencies, this.spec);
	
	recordGui.validateData();
	
	let factoredValidatorSpec = this.dependencies.metadataValidatorFactory.getSpec(0);
	assert.strictEqual(factoredValidatorSpec.metadataId, this.spec.metadataId);
	assert.strictEqual(factoredValidatorSpec.data, this.dependencies.dataHolder.getData());
	assert.strictEqual(factoredValidatorSpec.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(factoredValidatorSpec.pubSub, this.dependencies.pubSub);
	assert.strictEqual(factoredValidatorSpec.recordPartPermissionCalculator, this.spec.recordPartPermissionCalculator);
});
