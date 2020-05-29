/*
 * Copyright 2016 Olov McKie
 * Copyright 2016 Uppsala University Library
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

QUnit.module("net/ajaxCallFactoryTest.js", {
	beforeEach : function() {
		var xmlHttpRequestFactoryMultipleSpy = CORATEST.xmlHttpRequestFactoryMultipleSpy();
		xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);

		function minimalDummyFunction() {
		}

		this.spec = {
			"requestMethod" : "GET",
			"url" : "http://localhost:8080/therest/rest/record/recordType",
			"contentType" : "application/vnd.uub.record+json",
			"accept" : "application/vnd.uub.record+json",
			"loadMethod" : minimalDummyFunction,
			"errorMethod" : minimalDummyFunction,
			"timeoutMethod" : minimalDummyFunction,
			"downloadProgressMethod" : minimalDummyFunction,
			"uploadProgressMethod" : minimalDummyFunction
		};
		this.authTokenHolderSpy = CORATEST.authTokenHolderSpy();
		this.dependencies = {
			"xmlHttpRequestFactory" : xmlHttpRequestFactoryMultipleSpy,
			"authTokenHolder" : this.authTokenHolderSpy
		};
		this.ajaxCallFactory = CORA.ajaxCallFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.ajaxCallFactory);
	assert.strictEqual(this.ajaxCallFactory.type, "ajaxCallFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.ajaxCallFactory.getDependencies(), this.dependencies);
});

QUnit.test("factor", function(assert) {
	var ajaxCall = this.ajaxCallFactory.factor(this.spec);
	assert.strictEqual(ajaxCall.type, "ajaxCall");

	var ajaxCallSpec = ajaxCall.spec;
	assert.strictEqual(ajaxCallSpec.requestHeaders["Content-Type"], "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.requestHeaders["Accept"], "application/vnd.uub.record+json");
	var xmlHttpRequestFactory = this.dependencies.xmlHttpRequestFactory;
	assert.strictEqual(ajaxCallSpec.xmlHttpRequestFactory, xmlHttpRequestFactory);
});

QUnit.test("factorWithToken", function(assert) {
	var ajaxCall = this.ajaxCallFactory.factor(this.spec);
	var ajaxCallSpec = ajaxCall.spec;
	assert.ok(ajaxCallSpec.requestHeaders.authToken === "fitnesseAdminToken");
});

QUnit.test("factorWithoutToken", function(assert) {
	this.authTokenHolderSpy.setCurrentAuthTokenExists(false);
	var ajaxCall = this.ajaxCallFactory.factor(this.spec);
	var ajaxCallSpec = ajaxCall.spec;
	assert.ok(ajaxCallSpec.requestHeaders.authToken === undefined);
});

QUnit.test("noAccept", function(assert) {
	this.spec.accept = undefined;
	var ajaxCall = this.ajaxCallFactory.factor(this.spec);
	var ajaxCallSpec = ajaxCall.spec;
	assert.strictEqual(ajaxCallSpec.requestHeaders["Content-Type"], "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.requestHeaders["Accept"], undefined);
});
QUnit.test("noContentType", function(assert) {
	this.spec.contentType = undefined;
	var ajaxCall = this.ajaxCallFactory.factor(this.spec);
	var ajaxCallSpec = ajaxCall.spec;
	assert.strictEqual(ajaxCallSpec.requestHeaders["Content-Type"], undefined);
	assert.strictEqual(ajaxCallSpec.requestHeaders["Accept"], "application/vnd.uub.record+json");
});
