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

QUnit.module("metadata/textProviderFactoryTest.js", {
	beforeEach : function() {
		var textListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
			"accept" : "application/vnd.uub.recordList+json"
		};
		this.spec = {
			"textListLink" : textListLink,
			"lang" : "sv"
		};
		this.dependencies = {
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy()
		};
		this.textProviderFactory = CORA.textProviderFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.textProviderFactory);
	assert.strictEqual(this.textProviderFactory.type, "textProviderFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.textProviderFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var textProvider = this.textProviderFactory.factor(this.spec);
	assert.strictEqual(textProvider.type, "textProvider");
});

QUnit.test("factorTestDependencies", function(assert) {
	var textProvider = this.textProviderFactory.factor(this.spec);
	var factoredDependencies = textProvider.getDependencies();
	assert.strictEqual(factoredDependencies.ajaxCallFactory, this.dependencies.ajaxCallFactory);
});

QUnit.test("factorTestSpec", function(assert) {
	var textProvider = this.textProviderFactory.factor(this.spec);
	var usedSpec = textProvider.getSpec();
	assert.strictEqual(usedSpec, this.spec);
});
