/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
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
QUnit.module("metadataValidatorFactoryTest.js", {
	beforeEach: function() {
		this.dependencies = {
			metadataProvider: CORATEST.metadataProviderSpy(),
			pubSub: CORATEST.pubSubSpy()
		};
		this.spec = {
			metadataId: "groupIdOneTextChild",
			data: {},
		};
		this.metadataValidatorFactory = CORA.metadataValidatorFactory(this.dependencies);
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	let metadataValidatorFactory = CORA.metadataValidatorFactory(this.dependencies);
	assert.strictEqual(metadataValidatorFactory.type, "metadataValidatorFactory");
});

QUnit.test("testGetDependencies", function(assert) {
	let metadataValidatorFactory = CORA.metadataValidatorFactory(this.dependencies);
	assert.strictEqual(metadataValidatorFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	let metadataValidator = this.metadataValidatorFactory.factor(this.spec);
	assert.strictEqual(metadataValidator.type, "metadataValidator");
});

QUnit.test("testSpec", function(assert) {
	let expectedSpec = {
		metadataId: "groupIdOneTextChild",
		data: {},
	};

	let metadataValidator = this.metadataValidatorFactory.factor(this.spec);

	let factoredSpec = metadataValidator.getSpec();
	assert.stringifyEqual(factoredSpec, expectedSpec);
});

QUnit.test("testDependencies", function(assert) {
	let metadataValidator = this.metadataValidatorFactory.factor(this.spec);
	let factoredDependencies = metadataValidator.getDependencies();
	assert.strictEqual(factoredDependencies.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(factoredDependencies.pubSub, this.dependencies.pubSub);

	assert.strictEqual(factoredDependencies.metadataChildValidatorFactory.type,
	"genericFactory");
});

QUnit.test("testMetadataChildValidatorFactoryDependencies", function(assert) {
	let metadataValidator = this.metadataValidatorFactory.factor(this.spec);
	var factoredDependencies = metadataValidator.getDependencies();
	var metadataChildValidatorFactory = factoredDependencies.metadataChildValidatorFactory;
	assert.strictEqual(metadataChildValidatorFactory.getTypeToFactor(), "metadataChildValidator");
	
	var childValidatorFactoryDependencies = factoredDependencies.metadataChildValidatorFactory.getDependencies();
	assert.strictEqual(childValidatorFactoryDependencies.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(childValidatorFactoryDependencies.pubSub, this.dependencies.pubSub);
});
