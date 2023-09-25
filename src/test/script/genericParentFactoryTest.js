/*
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

QUnit.module("genericParentFactoryTest.js", {
	beforeEach : function() {

		this.dependencies = {
			dummy : "dummy"
		};

		this.spec = {
			testing : "testing"
		};
		
		this.child = {
			child: "child"
		}

	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactor", this.dependencies);
	assert.ok(genericParentFactory);
	assert.strictEqual(genericParentFactory.type, "genericParentFactory");
});

QUnit.test("getTypeToFactor", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactor", this.dependencies);
	assert.strictEqual(genericParentFactory.getTypeToFactor(), "spyParentToFactor");
});

QUnit.test("getDependencies", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactor", this.dependencies);
	assert.strictEqual(genericParentFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestFactor", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactor", this.dependencies);
	let factored = genericParentFactory.factor(this.spec);
	assert.strictEqual(factored.type, "spyParentToFactor");
});

QUnit.test("factorTestDependencies", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactor", this.dependencies);
	let factored = genericParentFactory.factor(this.spec);
	let factoredDependencies = factored.getDependencies();
	assert.strictEqual(factoredDependencies, this.dependencies);
});

QUnit.test("factorTestSpec", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactor", this.dependencies);
	let factored = genericParentFactory.factor(this.spec);
	let factoredSpec = factored.getSpec();
	assert.strictEqual(factoredSpec, this.spec);
});

QUnit.test("factorTestChild", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactor", this.dependencies);
	let factored = genericParentFactory.factor(this.spec, this.child);
	let factoredChild = factored.getChild();
	assert.strictEqual(factoredChild, this.child);
});

QUnit.test("factorTestChild", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactor", this.dependencies);
	let factored = genericParentFactory.factor(this.spec);
	let factoredSpec = factored.getSpec();
	assert.strictEqual(factoredSpec, this.spec);
});

QUnit.test("factorTestFactorWithoutDependencies", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactorWithoutDependencies", undefined);

	let factored = genericParentFactory.factor(this.spec);

	assert.strictEqual(factored.type, "spyParentToFactorWithoutDependencies");
	let factoredSpec = factored.getSpec();
	assert.strictEqual(factoredSpec, this.spec);
});


QUnit.test("factorTestChildWithoutDependencies", function(assert) {
	let genericParentFactory = CORA.genericParentFactory("spyParentToFactorWithoutDependencies");
	let factored = genericParentFactory.factor(this.spec, this.child);
	let factoredChild = factored.getChild();
	assert.strictEqual(factoredChild, this.child);
});

var CORA = (function(cora) {
	"use strict";
	cora.spyParentToFactor = function(dependencies, spec, child) {
		let out;

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const getChild = function() {
			return child;
		};

		out = Object.freeze({
			type : "spyParentToFactor",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getChild : getChild,
		});
		return out;
	};
	return cora;
}(CORA));

var CORA = (function(cora) {
	"use strict";
	cora.spyParentToFactorWithoutDependencies = function(spec, child) {
		let out;

		const getSpec = function() {
			return spec;
		};

		const getChild = function() {
			return child;
		};

		out = Object.freeze({
			type : "spyParentToFactorWithoutDependencies",
			getSpec : getSpec,
			getChild : getChild,
		});
		return out;
	};
	return cora;
}(CORA));
