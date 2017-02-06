/*
 * Copyright 2016, 2017 Uppsala University Library
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

QUnit.module("loginManagerTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"loginManagerViewFactory" : CORATEST.loginManagerViewFactorySpy(),
			"appTokenLoginFactory" : CORATEST.appTokenLoginFactorySpy()
		};
		this.loginManager = CORA.loginManager(this.dependencies);

	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.type, "loginManager");
});

QUnit.test("testGetDependencies", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.getDependencies(), this.dependencies);
});

QUnit.test("testInitCreatesALoginManagerView", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.ok(factoredView !== undefined);
});

QUnit.test("testInitCreatesALoginManagerViewsViewIsReturnedForGetHtml", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	var loginManagerHtml = loginManager.getHtml();
	assert.strictEqual(loginManagerHtml, factoredView.getHtml());
});

QUnit.test("testAppTokenLoginFactoryIsCalledOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenLogin(0);
	var factored1 = this.dependencies.listOfFactored.getFactored(0);
	assert.ok(factored1);
});


