/*
 * Copyright 2024 Uppsala University Library
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

QUnit.module("recursiveDelete/recursiveDeleteFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			someDep : "someDep"
		};
		this.spec = {
			someKey : "someValue"
		};
		this.recursiveDeleteViewFactory = CORA.recursiveDeleteViewFactory( this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.strictEqual(this.recursiveDeleteViewFactory.type, "recursiveDeleteViewFactory");
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.recursiveDeleteViewFactory.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	let recursiveDeleteView = this.recursiveDeleteViewFactory.factor(this.spec);

	assert.strictEqual(recursiveDeleteView.type, "recursiveDeleteView");
});

QUnit.test("factorTestDependencies", function(assert) {
	let recursiveDeleteView = this.recursiveDeleteViewFactory.factor(this.spec);
	
	assert.deepEqual(recursiveDeleteView.onlyForTestGetDependencies(), {});
});

QUnit.test("factorTestSpec", function(assert) {
	let recursiveDeleteView = this.recursiveDeleteViewFactory.factor(this.spec);
	
	assert.deepEqual(recursiveDeleteView.onlyForTestGetSpec(), this.spec);
});
