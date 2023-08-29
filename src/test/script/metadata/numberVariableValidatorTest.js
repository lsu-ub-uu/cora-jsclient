/*
 * Copyright 2018 Uppsala University Library
 * Copyright 2023 Olov McKie
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
QUnit.module("metadata/numberVariableValidatorTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		let dependencies = {
			"metadataProvider" : this.metadataProvider,
		};
		this.dependencies = dependencies;
		
		this.getNumberValidator = function() {
			if (this.numberValidator === undefined) {
				this.numberValidator = CORA.numberVariableValidator(this.dependencies);
			}
			return this.numberValidator;
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	let numberValidator = this.getNumberValidator();
	assert.strictEqual(numberValidator.type, "numberVariableValidator");
	assert.ok(this.numberValidator);
});

QUnit.test("getDependencies", function(assert) {
	let numberValidator = this.getNumberValidator();
	assert.strictEqual(numberValidator.getDependencies(), this.dependencies);
});

QUnit.test("testNotANumber", function(assert) {
	let numberValidator = this.getNumberValidator();
	
	let cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));
	
	let validationAnswer = numberValidator.validateData("notANumber", cMetadataElement);
	assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testEmptyValue", function(assert) {
    let numberValidator = this.getNumberValidator();

    let cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));

    let validationAnswer = numberValidator.validateData("", cMetadataElement);
    assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testValueAboveMaxAllowed", function(assert) {
	let numberValidator = this.getNumberValidator();
	
	let cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));
	
	let validationAnswer = numberValidator.validateData("2000", cMetadataElement);
	assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testValueBelowMinAllowed", function(assert) {
	let numberValidator = this.getNumberValidator();
	
	let cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));
	
	let validationAnswer = numberValidator.validateData("-2", cMetadataElement);
	assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testValueMoreDecimalsAllowedThanAllowed", function(assert) {
	let numberValidator = this.getNumberValidator();
	
	let cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));
	
	let validationAnswer = numberValidator.validateData("2.56", cMetadataElement);
	assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testValueOk", function(assert) {
	let numberValidator = this.getNumberValidator();
	
	let cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));
	
	let validationAnswer = numberValidator.validateData("2", cMetadataElement);
	assert.stringifyEqual(validationAnswer, true);
});

QUnit.test("testMaxValueOk", function(assert) {
	let numberValidator = this.getNumberValidator();
	
	let cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));
	
	let validationAnswer = numberValidator.validateData("10", cMetadataElement);
	assert.stringifyEqual(validationAnswer, true);
});

QUnit.test("testMinValueOk", function(assert) {
	let numberValidator = this.getNumberValidator();
	
	let cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));
	
	let validationAnswer = numberValidator.validateData("0", cMetadataElement);
	assert.stringifyEqual(validationAnswer, true);
});

QUnit.test("testDecimalsAllowedOk", function(assert) {
	let numberValidator = this.getNumberValidator();
	
	let cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableWithDecimalsId"));
	
	let validationAnswer = numberValidator.validateData("2.56", cMetadataElement);
	assert.stringifyEqual(validationAnswer, true);
});




