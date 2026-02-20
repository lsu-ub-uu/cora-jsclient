/*
 * Copyright 2017 Olov McKie
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

QUnit.module("recordTypeProviderFactoryTest.js", {
	beforeEach : function() {
		let recordTypeListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		let validationTypeListLink = {
			requestMethod: "GET",
			rel: "list",
			url: "http://epc.ub.uu.se/cora/rest/record/validationType/",
			accept: "application/vnd.cora.recordList+json"
		};
		this.validationTypeListLink = recordTypeListLink;

		this.spec = {
			recordTypeListLink: recordTypeListLink,
			validationTypeListLink: validationTypeListLink
		};
		this.dependencies = {
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy()
		};
		this.recordTypeProviderFactory = CORA.recordTypeProviderFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.recordTypeProviderFactory);
	assert.strictEqual(this.recordTypeProviderFactory.type, "recordTypeProviderFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.recordTypeProviderFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	let recordTypeProvider = this.recordTypeProviderFactory.factor(this.spec);
	assert.strictEqual(recordTypeProvider.type, "recordTypeProvider");
});

QUnit.test("factorTestDependencies", function(assert) {
	let recordTypeProvider = this.recordTypeProviderFactory.factor(this.spec);
	let factoredDependencies = recordTypeProvider.getDependencies();
	assert.strictEqual(factoredDependencies.ajaxCallFactory, this.dependencies.ajaxCallFactory);
});

QUnit.test("factorTestSpec", function(assert) {
	let recordTypeProvider = this.recordTypeProviderFactory.factor(this.spec);
	let usedSpec = recordTypeProvider.getSpec();
	assert.strictEqual(usedSpec, this.spec);
});
