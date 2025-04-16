/*
 * Copyright 2018, 2020, 2025 Uppsala University Library
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

QUnit.module.only("jsClient/recordTypeMenuTest.js", hooks => {
	const test = QUnit.test;
	let providers;
	let dependencies;
	let spec;
	let menu;
	let dummyJsClient;
	let recordTypeGroups;
	
	hooks.beforeEach(() => {
		providers = {
			metadataProvider: CORATEST.metadataProviderRealStub(),
			textProvider: CORATEST.textProviderSpy(),
			recordTypeProvider: CORATEST.recordTypeProviderStub()
		};

		dependencies = {
			recordTypeHandlerFactory: CORATEST.standardFactorySpy("recordTypeHandlerSpy")
		};
		spec = {};
		dummyJsClient = {};

		menu = CORA.recordTypeMenu(providers, dependencies, spec);
		recordTypeGroups = menu.getRecordTypeGroups(dummyJsClient);
	});

	hooks.afterEach(() => {
	});

	test("init", function(assert) {
		assert.strictEqual(menu.type, "recordTypeMenu");
	});

	test("testGetProviders", function(assert) {
		assert.strictEqual(menu.getProviders(), providers);
	});

	test("testGetDependencies", function(assert) {
		assert.strictEqual(menu.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let menu = CORA.recordTypeMenu(providers, dependencies, spec);
		assert.strictEqual(menu.getSpec(), spec);
	});

	test("testGetRecordTypeGroupsLength", function(assert) {
		assert.strictEqual(recordTypeGroups.length, 3);
	});

	test("testGetRecordTypeGroupsContainsExpectedHtmlFirstGroup", function(assert) {
		let recordTypeGroup = recordTypeGroups[0];
		let headline0 = recordTypeGroup.childNodes[0];

		let translatedHeadline = providers.textProvider.getTranslation("typeOfResourceItemText");

		assert.strictEqual(headline0.nodeName, "SPAN");
		assert.strictEqual(headline0.className, "recordTypeGroupHeadline");
		assert.strictEqual(headline0.innerHTML, translatedHeadline);
		assert.strictEqual(recordTypeGroup.childNodes.length, 3);
	});

	test("testGetRecordTypeGroupsContainsExpectedHtmlSecondGroup", function(assert) {
		let recordTypeGroup = recordTypeGroups[1];
		let headline0 = recordTypeGroup.childNodes[0];

		let translatedHeadline = providers.textProvider.getTranslation("authorityItemText");

		assert.strictEqual(headline0.nodeName, "SPAN");
		assert.strictEqual(headline0.className, "recordTypeGroupHeadline");
		assert.strictEqual(headline0.innerHTML, translatedHeadline);
		assert.strictEqual(recordTypeGroup.childNodes.length, 3);
	});

	test("testGetRecordTypeGroupsContainsNoHeadlineForGroupWhenNoChildren", function(assert) {
		let recordTypeGroup = recordTypeGroups[3];
		assert.strictEqual(recordTypeGroup, undefined);
	});

	test("testGetRecordTypeGroupsChildrenAreViewFromRecordTypeHandler", function(assert) {
		let rthf = dependencies.recordTypeHandlerFactory;

		let recordTypeGroupChildren1 = recordTypeGroups[0].childNodes;
		assert.strictEqual(recordTypeGroupChildren1[1], rthf.getFactored(0).getView());
		assert.strictEqual(recordTypeGroupChildren1[2], rthf.getFactored(1).getView());

		let recordTypeGroupChildren2 = recordTypeGroups[1].childNodes;
		assert.strictEqual(recordTypeGroupChildren2[1], rthf.getFactored(2).getView());
		assert.strictEqual(recordTypeGroupChildren2[2], rthf.getFactored(3).getView());
	});

	test("testGetRecordTypeGroupsChildrenAreViewFromRecordTypeHandlerNoAction", function(assert) {
		let spySpec = {
			"returnFalseForAnyAction": true
		};
		dependencies.recordTypeHandlerFactory.setSpySpec(spySpec);

		menu = CORA.recordTypeMenu(providers, dependencies, spec);
		recordTypeGroups = menu.getRecordTypeGroups(dummyJsClient);

		assert.strictEqual(recordTypeGroups.length, 3);
		assert.strictEqual(recordTypeGroups[0].childNodes.length, 1);
		assert.strictEqual(recordTypeGroups[1].childNodes.length, 1);
	});
});
