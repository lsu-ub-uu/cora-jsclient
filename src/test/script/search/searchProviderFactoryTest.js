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

QUnit.module("search/searchProviderFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy()
		};
		var searchRecordListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/search/",
			"accept" : "application/vnd.uub.recordList+json"
		};
		this.spec = {
			"searchRecordListLink" : searchRecordListLink
		};
		this.searchProviderFactory = CORA.searchProviderFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.searchProviderFactory);
	assert.strictEqual(this.searchProviderFactory.type, "searchProviderFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.searchProviderFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var searchProvider = this.searchProviderFactory.factor(this.spec);
	assert.strictEqual(searchProvider.type, "searchProvider");
});

QUnit.test("factorTestDependencies", function(assert) {
	var searchProvider = this.searchProviderFactory.factor(this.spec);
	var factoredDependencies = searchProvider.getDependencies();
	assert.strictEqual(factoredDependencies.ajaxCallFactory, this.dependencies.ajaxCallFactory);
});

QUnit.test("factorTestSpec", function(assert) {
	var searchProvider = this.searchProviderFactory.factor(this.spec);
	var usedSpec = searchProvider.getSpec();
	assert.strictEqual(usedSpec, this.spec);
});
