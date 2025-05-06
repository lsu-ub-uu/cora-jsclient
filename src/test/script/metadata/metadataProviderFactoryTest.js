/*
 * Copyright 2017 Olov McKie
 * Copyright 2018, 2019 Uppsala University Library
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

QUnit.module("metadata/metadataProviderFactoryTest.js", {
	beforeEach : function() {
		var metadataListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/metadata/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		var presentationListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/presentation/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		var textListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		var guiElementListLink = {
				"requestMethod" : "GET",
				"rel" : "list",
				"url" : "http://epc.ub.uu.se/cora/rest/record/guiElement/",
				"accept" : "application/vnd.cora.recordList+json"
			};
		this.spec = {
			"metadataListLink" : metadataListLink,
			"textListLink" : textListLink,
			"presentationListLink" : presentationListLink,
			"guiElementListLink" : guiElementListLink
		};
		this.dependencies = {
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.metadataProviderFactory = CORA.metadataProviderFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.metadataProviderFactory);
	assert.strictEqual(this.metadataProviderFactory.type, "metadataProviderFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.metadataProviderFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var metadataProvider = this.metadataProviderFactory.factor(this.spec);
	assert.strictEqual(metadataProvider.type, "metadataProvider");
});

QUnit.test("factorTestDependencies", function(assert) {
	var metadataProvider = this.metadataProviderFactory.factor(this.spec);
	var factoredDependencies = metadataProvider.getDependencies();
	assert.strictEqual(factoredDependencies.ajaxCallFactory, this.dependencies.ajaxCallFactory);
	assert.strictEqual(factoredDependencies.textProvider, this.dependencies.textProvider);
});

QUnit.test("factorTestSpec", function(assert) {
	var metadataProvider = this.metadataProviderFactory.factor(this.spec);
	var usedSpec = metadataProvider.getSpec();
	assert.strictEqual(usedSpec, this.spec);
});
