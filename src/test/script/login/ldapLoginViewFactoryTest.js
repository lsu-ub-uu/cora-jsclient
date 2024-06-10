/*
 * Copyright 2019 Uppsala University Library
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

QUnit.module("login/ldapLoginViewFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			textProvider : CORATEST.textProviderSpy()
		};

	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let ldapLoginViewFactory = CORA.ldapLoginViewFactory(this.dependencies);
	assert.strictEqual(ldapLoginViewFactory.type, "ldapLoginViewFactory");
});

QUnit.test("testGetDependencies", function(assert) {
	let ldapLoginViewFactory = CORA.ldapLoginViewFactory(this.dependencies);
	assert.strictEqual(ldapLoginViewFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	let ldapLoginViewFactory = CORA.ldapLoginViewFactory(this.dependencies);
	let ldapLoginView = ldapLoginViewFactory.factor(this.spec);
	assert.strictEqual(ldapLoginView.type, "ldapLoginView");
});

QUnit.test("factorTestDependencies", function(assert) {
	let ldapLoginViewFactory = CORA.ldapLoginViewFactory(this.dependencies);
	let ldapLoginView = ldapLoginViewFactory.factor(this.spec);
	assert.strictEqual(ldapLoginView.getDependencies().workItemViewFactory.type,
		"workItemViewFactory");
	assert.strictEqual(ldapLoginView.getDependencies().textProvider,
			this.dependencies.textProvider);
});

QUnit.test("factorTestSpec", function(assert) {
	let ldapLoginViewFactory = CORA.ldapLoginViewFactory(this.dependencies);
	let ldapLoginView = ldapLoginViewFactory.factor(this.spec);
	assert.strictEqual(ldapLoginView.getSpec(), this.spec);
});
