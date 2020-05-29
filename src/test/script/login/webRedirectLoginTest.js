/*
 * Copyright 2017, 2018 Uppsala University Library
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

QUnit.module("login/webRedirectLoginTest.js", {
	beforeEach : function() {

		this.windowSpy = CORATEST.windowSpy();

		this.dependencies = {
			"window" : this.windowSpy
		};

		this.spec = {
			"url" : "http://www.organisation.org/login/"
		};

		this.webRedirectLogin = CORA.webRedirectLogin(this.dependencies, this.spec);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.webRedirectLogin);
	assert.strictEqual(this.webRedirectLogin.type, "webRedirectLogin");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.webRedirectLogin.getDependencies(), this.dependencies);
});

QUnit.test("getSpec", function(assert) {
	assert.strictEqual(this.webRedirectLogin.getSpec(), this.spec);
});

QUnit.test("testUrlIsOpened", function(assert) {
	assert.strictEqual(this.windowSpy.getOpenedUrl(), this.spec.url);
});

QUnit.test("testUrlOpenedName", function(assert) {
	assert.strictEqual(this.windowSpy.getOpenedName(), "CoraHelperWindow");
});

QUnit.test("testGetOpenedWindow", function(assert) {
	assert.strictEqual(this.webRedirectLogin.getOpenedWindow(), this.windowSpy.fakeOpenedWindow);
});
