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
QUnit.module.only("metadata/numberVariableValidatorTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.cMetadataElement = CORA.coraData(this.metadataProvider.getMetadataById("numVariableId"));
		
		this.numberValidator = CORA.numberVariableValidator();
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.strictEqual(this.numberValidator.type, "numberVariableValidator");
	assert.ok(this.numberValidator);
});

QUnit.test("testNotANumber", function(assert) {
	let validationAnswer = this.numberValidator.validateData("notANumber", this.cMetadataElement);
	
	assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testEmptyValue", function(assert) {
    let validationAnswer = this.numberValidator.validateData("", this.cMetadataElement);

    assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testValueAboveMaxAllowed", function(assert) {
	let validationAnswer = this.numberValidator.validateData("2000", this.cMetadataElement);
	
	assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testValueBelowMinAllowed", function(assert) {
	let validationAnswer = this.numberValidator.validateData("-2", this.cMetadataElement);
	
	assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testValueMoreDecimalsAllowedThanAllowed", function(assert) {
	let validationAnswer = this.numberValidator.validateData("2.56", this.cMetadataElement);
	
	assert.stringifyEqual(validationAnswer, false);
});

QUnit.test("testValueOk", function(assert) {
	let validationAnswer = this.numberValidator.validateData("2", this.cMetadataElement);
	
	assert.stringifyEqual(validationAnswer, true);
});

QUnit.test("testMaxValueOk", function(assert) {
	let validationAnswer = this.numberValidator.validateData("10", this.cMetadataElement);
	
	assert.stringifyEqual(validationAnswer, true);
});

QUnit.test("testMinValueOk", function(assert) {
	let validationAnswer = this.numberValidator.validateData("0", this.cMetadataElement);
	
	assert.stringifyEqual(validationAnswer, true);
});

QUnit.test("testDecimalsAllowedOk", function(assert) {
	let cMetadataElement = CORA.coraData(this.metadataProvider.getMetadataById("numVariableWithDecimalsId"));
	
	let validationAnswer = this.numberValidator.validateData("2.56", cMetadataElement);

	assert.stringifyEqual(validationAnswer, true);
});




