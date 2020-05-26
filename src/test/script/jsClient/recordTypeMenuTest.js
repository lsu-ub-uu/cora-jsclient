/*
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

QUnit.module("recordTypeMenuTest.js", {
	beforeEach : function() {
		var providers = {
			"metadataProvider" : CORATEST.metadataProviderRealStub(),
			"textProvider" : CORATEST.textProviderSpy(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub()
		};
		this.providers = providers;

		this.dependencies = {
			recordTypeHandlerFactory : CORATEST.standardFactorySpy("recordTypeHandlerSpy")
		};
		this.spec = {};
		this.dummyJsClient = {};

		this.menu = CORA.recordTypeMenu(this.providers, this.dependencies, this.spec);
		this.recordTypeGroups = this.menu.getRecordTypeGroups(this.dummyJsClient);

	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.strictEqual(this.menu.type, "recordTypeMenu");
});

QUnit.test("testGetProviders", function(assert) {
	assert.strictEqual(this.menu.getProviders(), this.providers);
});

QUnit.test("testGetDependencies", function(assert) {
	assert.strictEqual(this.menu.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var menu = CORA.recordTypeMenu(this.providers, this.dependencies, this.spec);
	assert.strictEqual(menu.getSpec(), this.spec);
});

QUnit.test("testGetRecordTypeGroupsLength", function(assert) {
	assert.strictEqual(this.recordTypeGroups.length, 2);
});

QUnit.test("testGetRecordTypeGroupsContainsExpectedHtmlFirstGroup", function(assert) {
	var recordTypeGroup = this.recordTypeGroups[0];
	var headline0 = recordTypeGroup.childNodes[0];

	var translatedHeadline = this.providers.textProvider.getTranslation("typeOfResourceItemText");

	assert.strictEqual(headline0.nodeName, "SPAN");
	assert.strictEqual(headline0.className, "recordTypeGroupHeadline");
	assert.strictEqual(headline0.innerHTML, translatedHeadline);
	assert.strictEqual(recordTypeGroup.childNodes.length, 3);
});

QUnit.test("testGetRecordTypeGroupsContainsExpectedHtmlSecondGroup", function(assert) {
	var recordTypeGroup = this.recordTypeGroups[1];
	var headline0 = recordTypeGroup.childNodes[0];

	var translatedHeadline = this.providers.textProvider.getTranslation("authorityItemText");

	assert.strictEqual(headline0.nodeName, "SPAN");
	assert.strictEqual(headline0.className, "recordTypeGroupHeadline");
	assert.strictEqual(headline0.innerHTML, translatedHeadline);
	assert.strictEqual(recordTypeGroup.childNodes.length, 3);
});

QUnit.test("testGetRecordTypeGroupsContainsNoHeadlineForGroupWhenNoChildren", function(assert) {
	var recordTypeGroup = this.recordTypeGroups[2];
	assert.strictEqual(recordTypeGroup, undefined);
});

QUnit.test("testGetRecordTypeGroupsChildrenAreViewFromRecordTypeHandler", function(assert) {
	var rthf = this.dependencies.recordTypeHandlerFactory;

	var recordTypeGroupChildren1 = this.recordTypeGroups[0].childNodes;
	assert.strictEqual(recordTypeGroupChildren1[1], rthf.getFactored(0).getView());
	assert.strictEqual(recordTypeGroupChildren1[2], rthf.getFactored(1).getView());

	var recordTypeGroupChildren2 = this.recordTypeGroups[1].childNodes;
	assert.strictEqual(recordTypeGroupChildren2[1], rthf.getFactored(2).getView());
	assert.strictEqual(recordTypeGroupChildren2[2], rthf.getFactored(3).getView());
});

QUnit.test("testGetRecordTypeGroupsChildrenAreViewFromRecordTypeHandlerNoAction", function(assert) {
	var spySpec = {
		"returnFalseForAnyAction" : true
	};
	this.dependencies.recordTypeHandlerFactory.setSpySpec(spySpec);

	this.menu = CORA.recordTypeMenu(this.providers, this.dependencies, this.spec);
	this.recordTypeGroups = this.menu.getRecordTypeGroups(this.dummyJsClient);

	assert.strictEqual(this.recordTypeGroups.length, 2);
	assert.strictEqual(this.recordTypeGroups[0].childNodes.length, 1);
	assert.strictEqual(this.recordTypeGroups[1].childNodes.length, 1);
});
