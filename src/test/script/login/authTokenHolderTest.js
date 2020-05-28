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

QUnit.module("login/authTokenHolderTest.js", {
	beforeEach : function() {
		this.authTokenHolder = CORA.authTokenHolder();
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var authTokenHolder = this.authTokenHolder;
	assert.strictEqual(authTokenHolder.type, "authTokenHolder");
});

QUnit.test("testGetCurrentAuthToken", function(assert) {
	var authTokenHolder = this.authTokenHolder;
	assert.strictEqual(authTokenHolder.getCurrentAuthToken(), "");
});

QUnit.test("testHasCurrentAuthToken", function(assert) {
	var authTokenHolder = this.authTokenHolder;
	assert.notOk(authTokenHolder.hasCurrentAuthToken());
});

QUnit.test("testSetCurrentAuthToken", function(assert) { 
	var authTokenHolder = this.authTokenHolder;
	authTokenHolder.setCurrentAuthToken("someToken");
	assert.strictEqual(authTokenHolder.getCurrentAuthToken(), "someToken");
});

QUnit.test("testSetCurrentAuthTokenResultsInHasTokenTrue", function(assert) {
	var authTokenHolder = this.authTokenHolder;
	authTokenHolder.setCurrentAuthToken("someToken");
	assert.ok(authTokenHolder.hasCurrentAuthToken());
});

