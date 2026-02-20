/*
 * Copyright 2017, 2023 Olov McKie
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
QUnit.module("genericFactoryTest.js", {
	beforeEach: function() {

		this.providers = {
			dummy: "providers"
		};

		this.dependencies = {
			dummy: "dependencies"
		};

		this.spec = {
			testing: "spec"
		};
		this.genericFactory = CORA.genericFactory("spyToFactor", this.dependencies);

	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.ok(this.genericFactory);
	assert.strictEqual(this.genericFactory.type, "genericFactory");
});

QUnit.test("getTypeToFactor", function(assert) {
	assert.strictEqual(this.genericFactory.getTypeToFactor(), "spyToFactor");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.genericFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestFactor", function(assert) {
	let factored = this.genericFactory.factor(this.spec);
	assert.strictEqual(factored.type, "spyToFactor");
});

QUnit.test("factorTestDependencies", function(assert) {
	let factored = this.genericFactory.factor(this.spec);
	let factoredDependencies = factored.getDependencies();
	assert.strictEqual(factoredDependencies, this.dependencies);
});

QUnit.test("factorTestSpec", function(assert) {
	let factored = this.genericFactory.factor(this.spec);
	let factoredSpec = factored.getSpec();
	assert.strictEqual(factoredSpec, this.spec);
});

QUnit.test("factorTestFactorWithProviders", function(assert) {
	let genericFactory = CORA.genericFactory("spyToFactorWithProviders", this.providers, this.dependencies);
	let factored = genericFactory.factor(this.spec);

	assert.strictEqual(factored.type, "spyToFactorWithProviders");

	assert.strictEqual(factored.getProviders(), this.providers);


	let factoredSpec = factored.getSpec();
	assert.strictEqual(factoredSpec, this.spec);
});

QUnit.test("factorTestFactorWithoutDependencies", function(assert) {
	let genericFactory = CORA.genericFactory("spyToFactorWithoutDependencies");
	let factored = genericFactory.factor(this.spec);

	assert.strictEqual(factored.type, "spyToFactorWithoutDependencies");
	let factoredSpec = factored.getSpec();
	assert.strictEqual(factoredSpec, this.spec);
});

var CORA = (function(cora) {
	"use strict";
	cora.spyToFactorWithProviders = function(providers, dependencies, spec) {
		let out;

		const getProviders = function() {
			return providers;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "spyToFactorWithProviders",
			getProviders: getProviders,
			getDependencies: getDependencies,
			getSpec: getSpec,
		});
		return out;
	};
	return cora;
}(CORA));
var CORA = (function(cora) {
	"use strict";
	cora.spyToFactor = function(dependencies, spec) {
		let out;

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};


		out = Object.freeze({
			type: "spyToFactor",
			getDependencies: getDependencies,
			getSpec: getSpec,
		});
		return out;
	};
	return cora;
}(CORA));


var CORA = (function(cora) {
	"use strict";
	cora.spyToFactorWithoutDependencies = function(spec) {
		let out;

		const getSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "spyToFactorWithoutDependencies",
			getSpec: getSpec,
		});
		return out;
	};
	return cora;
}(CORA));
