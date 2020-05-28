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

QUnit.module("metadata/reloadableMetadataProviderTest.js", {
	beforeEach : function() {
		var metadataListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/metadata/",
			"accept" : "application/vnd.uub.recordList+json"
		};
		var presentationListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/presentation/",
			"accept" : "application/vnd.uub.recordList+json"
		};
		var textListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
			"accept" : "application/vnd.uub.recordList+json"
		};
		var guiElementListLink = {
				"requestMethod" : "GET",
				"rel" : "list",
				"url" : "http://epc.ub.uu.se/cora/rest/record/guiElement/",
				"accept" : "application/vnd.uub.recordList+json"
			};
		var methodToCall = {};
		this.spec = {
			"metadataListLink" : metadataListLink,
			"textListLink" : textListLink,
			"presentationListLink" : presentationListLink,
			"guiElementListLink" : guiElementListLink,
			"callWhenReady" : methodToCall
		};
		this.dependencies = {
			// "ajaxCallFactory" : CORATEST.ajaxCallFactorySpy()
			"metadataProviderFactory" : CORATEST.standardFactorySpy("metadataProviderSpy")
		};
		this.reloadableMetadataProvider = CORA.reloadableMetadataProvider(this.dependencies,
				this.spec);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.reloadableMetadataProvider);
	assert.strictEqual(this.reloadableMetadataProvider.type, "reloadableMetadataProvider");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.reloadableMetadataProvider.getDependencies(), this.dependencies);
});

QUnit.test("getSpec", function(assert) {
	assert.strictEqual(this.reloadableMetadataProvider.getSpec(), this.spec);
});

QUnit.test("initFactorsFirstMetadataProviderWithSpec", function(assert) {
	var firstFactoredMetadataProvider = this.dependencies.metadataProviderFactory.getFactored(0);
	assert.ok(firstFactoredMetadataProvider);
	var forwardedSpec = this.dependencies.metadataProviderFactory.getSpec(0);
	assert.strictEqual(forwardedSpec.metadataListLink, this.spec.metadataListLink);
	assert.strictEqual(forwardedSpec.textListLink, this.spec.textListLink);
	assert.strictEqual(forwardedSpec.presentationListLink, this.spec.presentationListLink);
	assert.strictEqual(forwardedSpec.guiElementListLink, this.spec.guiElementListLink);
	assert.strictEqual(forwardedSpec.callWhenReady, this.spec.callWhenReady);
});

QUnit.test("testGetMetadataByIdForwardedToFactoredProvider", function(assert) {
	var firstFactoredMetadataProvider = this.dependencies.metadataProviderFactory.getFactored(0);
	var metadata = this.reloadableMetadataProvider.getMetadataById("someMetadataId");

	assert.strictEqual(firstFactoredMetadataProvider.getFetchedMetadataId(0), "someMetadataId");
});

QUnit.test("testGetMetadataByIdAnswerReturnedFromFactoredProvider", function(assert) {
	var firstFactoredMetadataProvider = this.dependencies.metadataProviderFactory.getFactored(0);
	var metadata = this.reloadableMetadataProvider.getMetadataById("someMetadataId");

	assert
			.stringifyEqual(firstFactoredMetadataProvider.getMetadataById("someMetadataId"),
					metadata);
	assert.strictEqual(firstFactoredMetadataProvider.getFetchedMetadata(0), metadata);
});

QUnit.test("testReloadCreatesNewMetadataProvider", function(assert) {
	var firstFactoredMetadataProvider = this.dependencies.metadataProviderFactory.getFactored(0);
	var secondFactoredMetadataProvider = this.dependencies.metadataProviderFactory.getFactored(1);
	assert.strictEqual(secondFactoredMetadataProvider, undefined);
	var methodToCall = {};
	this.reloadableMetadataProvider.reload(methodToCall);
	secondFactoredMetadataProvider = this.dependencies.metadataProviderFactory.getFactored(1);
	assert.ok(secondFactoredMetadataProvider);
});

QUnit.test("testReloadCreatesNewMetadataProviderWithSpec",
		function(assert) {
			this.reloadableMetadataProvider.reload({});
			var forwardedSpec = this.dependencies.metadataProviderFactory.getSpec(1);
			assert.strictEqual(forwardedSpec.metadataListLink, this.spec.metadataListLink);
			assert.strictEqual(forwardedSpec.textListLink, this.spec.textListLink);
			assert.strictEqual(forwardedSpec.presentationListLink, this.spec.presentationListLink);
			assert.strictEqual(forwardedSpec.guiElementListLink, this.spec.guiElementListLink);
			assert.strictEqual(forwardedSpec.callWhenReady,
					this.reloadableMetadataProvider.switchProvider);
		});

QUnit.test("testMethodToCallIsCalledAfterSwitch", function(assert) {
	var called = false;
	function methodToCall() {
		called = true;
	}
	this.reloadableMetadataProvider.reload(methodToCall);
	this.reloadableMetadataProvider.switchProvider();
	assert.ok(called);
});

QUnit.test("testGetMetadataByIdForwardedToSecondFactoredProviderAfterSwitchProvider", function(
		assert) {
	this.reloadableMetadataProvider.reload(function() {
	});
	this.reloadableMetadataProvider.switchProvider();
	var secondFactoredMetadataProvider = this.dependencies.metadataProviderFactory.getFactored(1);
	var metadata = this.reloadableMetadataProvider.getMetadataById("someMetadataId");

	assert.strictEqual(secondFactoredMetadataProvider.getFetchedMetadataId(0), "someMetadataId");
});