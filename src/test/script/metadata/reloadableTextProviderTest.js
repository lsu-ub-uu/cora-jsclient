/*
 * Copyright 2017 Olov McKie
 * Copyright 2018 Uppsala University Library
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

QUnit.module("metadata/reloadableTextProviderTest.js", {
	beforeEach : function() {
		var methodToCall = {};
		var textListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
			"accept" : "application/vnd.uub.recordList+json"
		};
		this.spec = {
			"textListLink" : textListLink,
			"lang" : "sv",
			"callWhenReady" : methodToCall
		};
		this.dependencies = {
			"textProviderFactory" : CORATEST.standardFactorySpy("textProviderSpy")
		};

		this.reloadableTextProvider = CORA.reloadableTextProvider(this.dependencies, this.spec);
		this.secondFactoredTextProvider;
		this.reload = function() {
			this.reloadableTextProvider.reload(function() {
			});
			this.reloadableTextProvider.switchProvider();
			this.secondFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(1);
		}

	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.reloadableTextProvider);
	assert.strictEqual(this.reloadableTextProvider.type, "reloadableTextProvider");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.reloadableTextProvider.getDependencies(), this.dependencies);
});

QUnit.test("getSpec", function(assert) {
	assert.strictEqual(this.reloadableTextProvider.getSpec(), this.spec);
});

QUnit.test("initFactorsFirstTextProviderWithSpec", function(assert) {
	var firstFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(0);
	assert.ok(firstFactoredTextProvider);
	var forwardedSpec = this.dependencies.textProviderFactory.getSpec(0);
	assert.strictEqual(forwardedSpec.textListLink, this.spec.textListLink);
	assert.strictEqual(forwardedSpec.callWhenReady, this.spec.callWhenReady);
});

QUnit.test("testGetTranslationForwardedToFactoredProvider", function(assert) {
	var firstFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(0);
	var translation = this.reloadableTextProvider.getTranslation("someTextId");

	assert.strictEqual(firstFactoredTextProvider.getFetchedTextIdNo(0), "someTextId");
});

QUnit.test("testGetTranslationAnswerReturnedFromFactoredProvider", function(assert) {
	var firstFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(0);
	var translation = this.reloadableTextProvider.getTranslation("someTextId");

	assert.stringifyEqual(firstFactoredTextProvider.getTranslation("someTextId"), translation);
	assert.strictEqual(firstFactoredTextProvider.getFetchedTextIdNo(0), "someTextId");
});

QUnit.test("testReloadCreatesNewTextProvider", function(assert) {
	var firstFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(0);
	var secondFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(1);
	assert.strictEqual(secondFactoredTextProvider, undefined);
	var methodToCall = {};
	this.reloadableTextProvider.reload(methodToCall);
	secondFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(1);
	assert.ok(secondFactoredTextProvider);
});

QUnit.test("testReloadCreatesNewTextProviderWithSpec", function(assert) {
	this.reloadableTextProvider.reload({});
	var forwardedSpec = this.dependencies.textProviderFactory.getSpec(1);
	assert.strictEqual(forwardedSpec.textListLink, this.spec.textListLink);
	assert.strictEqual(forwardedSpec.callWhenReady, this.reloadableTextProvider.switchProvider);
});

QUnit.test("testMethodToCallCalledAfterSwitch", function(assert) {
	var called = false;
	function methodToCall() {
		called = true;
	}
	this.reloadableTextProvider.reload(methodToCall);
	this.reloadableTextProvider.switchProvider();
	assert.ok(called);
});

QUnit.test("testCurrentLangSetInSecondFactoredProviderAfterSwitchProvider", function(assert) {
	this.reloadableTextProvider.reload(function() {
	});
	this.reloadableTextProvider.setCurrentLang("en");
	this.reloadableTextProvider.switchProvider();
	var secondFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(1);

	assert.strictEqual(secondFactoredTextProvider.getSetCurrentLang(0), "en");
});

QUnit.test("testGetTranslationForwardedToSecondFactoredProviderAfterSwitchProvider", function(
		assert) {
	this.reload();
	var translation = this.reloadableTextProvider.getTranslation("someMetadataId");

	assert.strictEqual(this.secondFactoredTextProvider.getFetchedTextIdNo(0), "someMetadataId");
});

QUnit.test("testSetCurrentLangForwardedToFactoredProvider", function(assert) {
	var firstFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(0);
	var translation = this.reloadableTextProvider.setCurrentLang("en");

	assert.strictEqual(firstFactoredTextProvider.getSetCurrentLang(0), "en");
});

QUnit.test("testGetMetadataByIdForwardedToFactoredProvider", function(assert) {
	var firstFactoredTextProvider = this.dependencies.textProviderFactory.getFactored(0);
	var textAsMetadata = this.reloadableTextProvider.getMetadataById("someMetadataId");

	assert.strictEqual(firstFactoredTextProvider.getFetchedMetadataIdNo(0), "someMetadataId");
	assert.notEqual(textAsMetadata, undefined);
	assert.notEqual(textAsMetadata, firstFactoredTextProvider.getMetadataById("someMetadataId"));
});

QUnit.test("testGetMetadataByIdForwardedToSecondFactoredProviderAfterSwitchProvider",
		function(assert) {
			this.reload();
			var textAsMetadata = this.reloadableTextProvider.getMetadataById("someMetadataId");

			assert.strictEqual(this.secondFactoredTextProvider.getFetchedMetadataIdNo(0),
					"someMetadataId");
		});