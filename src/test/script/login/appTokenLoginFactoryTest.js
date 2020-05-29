/*
 * Copyright 2017 Uppsala University Library
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

QUnit.module("login/appTokenLoginFactoryTest.js", {
	beforeEach : function() {
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();

		this.dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy
		};
		this.appTokenLoginFactory = CORA.appTokenLoginFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.appTokenLoginFactory);
	assert.strictEqual(this.appTokenLoginFactory.type, "appTokenLoginFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.appTokenLoginFactory.getDependencies(), this.dependencies);
});

QUnit.test("factor", function(assert) {
	var spec = {};
	var appTokenLogin = this.appTokenLoginFactory.factor(spec);
	assert.strictEqual(appTokenLogin.type, "appTokenLogin");
	
	var appTokenLoginDependencies = appTokenLogin.getDependencies();
	assert.strictEqual(appTokenLoginDependencies.ajaxCallFactory, this.dependencies.ajaxCallFactory);

	var appTokenLoginSpec = appTokenLogin.getSpec();
	assert.strictEqual(appTokenLoginSpec, spec);
});
