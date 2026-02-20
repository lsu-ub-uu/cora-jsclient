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

QUnit.module("reloadableRecordTypeProviderTest.js", {
	beforeEach : function() {
		var methodToCall = {};
		var recordTypeListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		var validationTypeListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" :  "http://epc.ub.uu.se/cora/rest/record/validationType/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		
		this.spec = {
			recordTypeListLink : recordTypeListLink,
			validationTypeListLink: validationTypeListLink
		};
		this.dependencies = {
			"recordTypeProviderFactory" : CORATEST.standardFactorySpy("recordTypeProviderSpy")
		};

		this.reloadableRecordTypeProvider = CORA.reloadableRecordTypeProvider(this.dependencies,
				this.spec);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.reloadableRecordTypeProvider);
	assert.strictEqual(this.reloadableRecordTypeProvider.type, "reloadableRecordTypeProvider");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.reloadableRecordTypeProvider.getDependencies(), this.dependencies);
});

QUnit.test("getSpec", function(assert) {
	assert.strictEqual(this.reloadableRecordTypeProvider.getSpec(), this.spec);
});

QUnit.test("initFactorsFirstRecordTypeProviderWithSpec", function(assert) {
	var firstFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(0);
	assert.ok(firstFactoredRecordTypeProvider);
	var forwardedSpec = this.dependencies.recordTypeProviderFactory.getSpec(0);
	assert.strictEqual(forwardedSpec.recordTypeListLink, this.spec.recordTypeListLink);
	assert.strictEqual(forwardedSpec.validationTypeListLink, this.spec.validationTypeListLink);
	assert.strictEqual(forwardedSpec.callWhenReady, this.spec.callWhenReady);
});

QUnit.test("testGetRecordTypeByIdForwardedToFactoredProvider", function(assert) {
	var firstFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(0);
	var search = this.reloadableRecordTypeProvider.getRecordTypeById("someRecordTypeId");

	assert.strictEqual(firstFactoredRecordTypeProvider.getFetchedRecordTypeId(0),
			"someRecordTypeId");
});

QUnit.test("testGetGetRecordTypeByIdAnswerReturnedFromFactoredProvider", function(assert) {
	var firstFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(0);
	var search = this.reloadableRecordTypeProvider.getRecordTypeById("someRecordTypeId");

	assert.stringifyEqual(firstFactoredRecordTypeProvider.getRecordTypeById("someRecordTypeId"),
			search);
});

QUnit.test("testGetAllRecordTypesForwardedToFactoredProvider", function(assert) {
	var firstFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(0);
	assert.strictEqual(firstFactoredRecordTypeProvider.getAllRecordTypesFetchedNo(), 0);
	var search = this.reloadableRecordTypeProvider.getAllRecordTypes();

	assert.strictEqual(firstFactoredRecordTypeProvider.getAllRecordTypesFetchedNo(), 1);
});

QUnit.test("testGetGetAllRecordTypesAnswerReturnedFromFactoredProvider", function(assert) {
	var firstFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(0);
	var metadata = this.reloadableRecordTypeProvider.getAllRecordTypes();

	assert.stringifyEqual(firstFactoredRecordTypeProvider.getAllRecordTypes(), metadata);
});

QUnit.test("testGetMetadataByRecordTypeIdForwardedToFactoredProvider", function(assert) {
	var firstFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(0);
	var search = this.reloadableRecordTypeProvider.getMetadataByRecordTypeId("someRecordTypeId");

	assert.strictEqual(firstFactoredRecordTypeProvider.getFetchedMetadataByRecordTypeId(0),
			"someRecordTypeId");
});

QUnit.test("testGetMetadataByRecordTypeIdAnswerReturnedFromFactoredProvider", function(assert) {
	var firstFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(0);
	var metadata = this.reloadableRecordTypeProvider.getMetadataByRecordTypeId("someRecordTypeId");

	assert.stringifyEqual(firstFactoredRecordTypeProvider
			.getMetadataByRecordTypeId("someRecordTypeId"), metadata);
});

QUnit.test("testGetRecordTypesByGroupIdAnswerReturnedFromFactoredProvider", function(assert) {
	var firstFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
	.getFactored(0);
	var metadata = this.reloadableRecordTypeProvider.getRecordTypesByGroupId("someRecordTypeId");
	
	assert.stringifyEqual(firstFactoredRecordTypeProvider
			.getRecordTypesByGroupId("someRecordTypeId"), metadata);
});

QUnit.test("testReloadCreatesNewRecordTypeProvider", function(assert) {
	var firstFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(0);
	var secondFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(1);
	assert.strictEqual(secondFactoredRecordTypeProvider, undefined);
	var methodToCall = {};
	this.reloadableRecordTypeProvider.reload(methodToCall);
	secondFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory.getFactored(1);
	assert.ok(secondFactoredRecordTypeProvider);
});

QUnit.test("testReloadCreatesNewRecordTypeProviderWithSpec", function(assert) {
	this.reloadableRecordTypeProvider.reload({});
	var forwardedSpec = this.dependencies.recordTypeProviderFactory.getSpec(1);
	assert.strictEqual(forwardedSpec.recordTypeListLink, this.spec.recordTypeListLink);
	assert.strictEqual(forwardedSpec.validationTypeListLink, this.spec.validationTypeListLink);
	assert.strictEqual(forwardedSpec.callWhenReady,
			this.reloadableRecordTypeProvider.switchProvider);
});

QUnit.test("testMethodToCallCalledAfterSwitch", function(assert) {
	var called = false;
	function methodToCall() {
		called = true;
	}
	this.reloadableRecordTypeProvider.reload(methodToCall);
	this.reloadableRecordTypeProvider.switchProvider();
	assert.ok(called);
});

QUnit.test("testGetRecordTypeByIdForwardedToSecondFactoredProviderAfterSwitchProvider", function(
		assert) {
	this.reloadableRecordTypeProvider.reload(function() {
	});
	this.reloadableRecordTypeProvider.switchProvider();
	var secondFactoredRecordTypeProvider = this.dependencies.recordTypeProviderFactory
			.getFactored(1);
	var translation = this.reloadableRecordTypeProvider.getRecordTypeById("someRecordTypeId");

	assert.strictEqual(secondFactoredRecordTypeProvider.getFetchedRecordTypeId(0),
			"someRecordTypeId");
});
