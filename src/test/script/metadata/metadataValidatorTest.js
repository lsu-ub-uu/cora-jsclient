/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2016, 2020 Uppsala University Library
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


QUnit.module("metadata/metadataValidatorTest.js", {
	beforeEach: function() {
		this.metadataProvider = CORATEST.MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.metadataChildValidatorFactory = CORATEST.standardFactorySpy("metadataChildValidatorSpy");
		this.dependencies = {
			metadataProvider: this.metadataProvider,
			pubSub: this.pubSub,
			metadataChildValidatorFactory: this.metadataChildValidatorFactory
		};
		this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();
		this.spec = {
			metadataId: "groupIdOneTextChild",
			dataHolder: CORATEST.dataHolderSpy(),
			recordPartPermissionCalculator: this.recordPartPermissionCalculator
		};
		this.spySpec = {
			resultToReturn: {
				everythingOkBelow: true,
				containsValuableData: true
			}
		};
	}
});

QUnit.test("testInit", function(assert) {
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);
	assert.strictEqual(metadataValidator.type, "metadataValidator");
});

QUnit.test("testGetDependencies", function(assert) {
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);
	assert.strictEqual(metadataValidator.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);
	assert.strictEqual(metadataValidator.getSpec(), this.spec);
});

QUnit.test("testChildValidatorFactoryCalledWithCorrectSpec", function(assert) {
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();
	let childValidatorSpec = this.dependencies.metadataChildValidatorFactory.getSpec(0);

	assert.stringifyEqual(childValidatorSpec.path, []);
	assert.stringifyEqual(childValidatorSpec.dataHolder, this.spec.dataHolder);

	let m = CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChild"));
	let childReferences = m.getFirstChildByNameInData("childReferences");
	let childRef = childReferences.children[0];
	assert.stringifyEqual(childValidatorSpec.childReference, childRef);
});

QUnit.test("testFactoredChildValidatorValidateFunctionCalled", function(assert) {
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();

	let childValidator = this.dependencies.metadataChildValidatorFactory.getFactored(0);
	assert.strictEqual(childValidator.getValidateCalled(), true);
});

QUnit.test("testFactoredChildValidatorChildResultHandledTrueReturnedFromChild", function(assert) {
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	let validationResult = metadataValidator.validate();

	assert.strictEqual(validationResult, true);
});

QUnit.test("testFactoredChildValidatorChildResultHandledFalseReturnedFromChild", function(assert) {
	this.spySpec.resultToReturn.everythingOkBelow = false;
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	let validationResult = metadataValidator.validate();

	assert.strictEqual(validationResult, false);
});

QUnit.test("testFactoredChildValidatorValidateFunctionCalledTwiceWhenTwoChildren", function(assert) {
	this.spec.metadataId = "groupIdTwoTextChild";
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	let validationResult = metadataValidator.validate();

	assert.strictEqual(validationResult, true);

	let childValidator = this.dependencies.metadataChildValidatorFactory.getFactored(0);
	assert.strictEqual(childValidator.getValidateCalled(), true);
	let childValidator2 = this.dependencies.metadataChildValidatorFactory.getFactored(1);
	assert.strictEqual(childValidator2.getValidateCalled(), true);

});

QUnit.test("testChildValidatorFactoryCalledWithCorrectSpecForTwoChildren", function(assert) {
	this.spec.metadataId = "groupIdTwoTextChild";
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();
	let childValidatorSpec = this.dependencies.metadataChildValidatorFactory.getSpec(0);

	assert.stringifyEqual(childValidatorSpec.path, []);
	assert.stringifyEqual(childValidatorSpec.dataHolder, this.spec.dataHolder);

	let m = CORA.coraData(this.metadataProvider.getMetadataById("groupIdTwoTextChild"));
	let childReferences = m.getFirstChildByNameInData("childReferences");
	let childRef = childReferences.children[0];
	assert.stringifyEqual(childValidatorSpec.childReference, childRef);

	let childValidatorSpec2 = this.dependencies.metadataChildValidatorFactory.getSpec(1);

	assert.stringifyEqual(childValidatorSpec2.path, []);
	assert.stringifyEqual(childValidatorSpec2.data, this.spec.data);
	let childRef2 = childReferences.children[1];
	assert.stringifyEqual(childValidatorSpec2.childReference, childRef2);
});

QUnit.test("testFactoredChildValidatorChildResultHandledFalseReturnedFromChildWhenTwoChildren", function(assert) {
	this.spec.metadataId = "groupIdTwoTextChild";
	this.spySpec.resultToReturn.everythingOkBelow = false;
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	let validationResult = metadataValidator.validate();

	assert.strictEqual(validationResult, false);
});

QUnit.test("testChildResultHandledFalseReturnedFromChildWhenOneChildFalseOneTrue", function(assert) {
	this.spec.metadataId = "groupIdTwoTextChild";
	this.spySpec.resultToReturn.everythingOkBelow = false;
	this.metadataChildValidatorFactory.addSpySpec(this.spySpec);

	let spySpec2 = {
		resultToReturn: {
			everythingOkBelow: true,
			containsValuableData: true
		}
	};
	this.metadataChildValidatorFactory.addSpySpec(spySpec2);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	let validationResult = metadataValidator.validate();

	assert.strictEqual(validationResult, false);
});

QUnit.test("testRecordPartPermissionCalculatorCalledCorrectly", function(assert) {
	this.spec.metadataId = "groupIdOneTextChildWithWriteConstraints";
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();

	let requestedId = this.recordPartPermissionCalculator.getWriteRequestedId(0);
	assert.strictEqual(requestedId, "metadataTextVariable_textVariableId");
});

QUnit.test("testFactoredChildValidatorValidateFunctionNotCalledWhenWriteConstraintsNoPermissions", function(assert) {
	this.spec.metadataId = "groupIdOneTextChildWithWriteConstraints";
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	this.recordPartPermissionCalculator.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");

	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();
	let requestedId = this.recordPartPermissionCalculator.getWriteRequestedId(0);
	assert.strictEqual(requestedId, "metadataTextVariable_textVariableId");
	let childValidator = this.dependencies.metadataChildValidatorFactory.getFactored(0);
	assert.strictEqual(childValidator, undefined);
});

QUnit.test("testFactoredChildValidatorValidateFunctionCalledWhenConstraintsWithPermissions", function(assert) {
	this.spec.metadataId = "groupIdOneTextChildWithWriteConstraints";

	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();

	let childValidator = this.dependencies.metadataChildValidatorFactory.getFactored(0);
	assert.strictEqual(childValidator.getValidateCalled(), true);
});

QUnit.test("testFactoredChildValidatorValidateFunctionCalledWhenConstraintsWithMultiplePermissions", function(assert) {
	this.spec.metadataId = "groupIdOneTextChildWithWriteConstraints";

	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();

	let childValidator = this.dependencies.metadataChildValidatorFactory.getFactored(0);
	assert.strictEqual(childValidator.getValidateCalled(), true);
});

QUnit.test("testFactoredChildValidatorValidateFunctionCalledWhenConstraintsWithWrongPermissions", function(assert) {
	this.spec.metadataId = "groupIdOneTextChildWithWriteConstraints";
	this.recordPartPermissionCalculator.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");


	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();

	let childValidator = this.dependencies.metadataChildValidatorFactory.getFactored(0);
	assert.strictEqual(childValidator, undefined);
});

QUnit.test("testFactoredChildValidatorValidateFunctionNotCalledWhenReadWriteConstraintsNoPermissions", function(assert) {
	this.spec.metadataId = "groupIdOneTextChildWithReadWriteConstraints";
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	this.recordPartPermissionCalculator.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");

	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();

	let childValidator = this.dependencies.metadataChildValidatorFactory.getFactored(0);
	assert.strictEqual(childValidator, undefined);
});

QUnit.test("testFactoredChildValidatorValidateFunctionNotCalledWhenReadWriteConstraintsWithPermissions", function(assert) {
	this.spec.metadataId = "groupIdOneTextChildWithReadWriteConstraints";
	this.metadataChildValidatorFactory.setSpySpec(this.spySpec);
	let metadataValidator = CORA.metadataValidator(this.dependencies, this.spec);

	metadataValidator.validate();

	let childValidator = this.dependencies.metadataChildValidatorFactory.getFactored(0);
	assert.strictEqual(childValidator.getValidateCalled(), true);
});
