/*
 * Copyright 2024 Uppsala University Library
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

QUnit.module.only("recursiveDelete/recursiveDeleteDeleterTest.js", hooks => {
	const test = QUnit.test;
	const only = QUnit.only;

	let dependencies;
	let spec;
	let someRestUrl = "http://someRestUrl/rest/record/";
	let ajaxCallFactorySpy;
	let viewModel;
	let deleter;

	hooks.beforeEach(() => {
		ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();

		setupDependencies();
		setupSpec();

		deleter = CORA.recursiveDeleteDeleter(dependencies, spec);

		setUpBasicViewModel();
	});

	hooks.afterEach(() => {
		//no after
	});

	const setupDependencies = function() {
		dependencies = {
			ajaxCallFactory: ajaxCallFactorySpy
		};
	};
	const setupSpec = function() {
		spec = {
			baseRestUrl: someRestUrl
		};
	};

	const setUpBasicViewModel = function() {
		viewModel = {
			elementId: 1,
			id: "minimalGroupId",
			type: "group",
			recordType: "metadata",
			nameInData: "minimalGroup",
			dataDivider: "someDataDivider",
			texts: [{ elementId: 2, id: "minimalGroupIdText", recordType: "text", dataDivider: "someDataDivider" },
			{ elementId: 3, id: "minimalGroupIdDefText", recordType: "text", dataDivider: "someDataDivider" }],
			methodOpenDefiningRecord: openDefiningRecordUsingEventAndId,
			attributes: [],
			refCollection: [],
			collectionItems: [],
			presentations: [],
			children: []
		};

		let child = {
			elementId: 4,
			id: "textVarId",
			type: "textVariable",
			nameInData: "textVar",
			dataDivider: "someOtherDataDivider",
			texts: [{ elementId: 5, id: "someTextId", recordType: "text" }, { elementId: 6, id: "someDefTextId", recordType: "text" }],
			methodOpenDefiningRecord: openDefiningRecordUsingEventAndId
		};
		viewModel.children.push(child);
	};

	const openDefiningRecordUsingEventAndId = function(event, id) {
		callsToOpenDefiningRecord.push({ event: event, id: id });
	};

	only("testStartDeleting", function(assert) {
		deleter.startDeleting(viewModel);

//		assert.strictEqual(ajaxCallFactorySpy.callCount, 1);

		assertAjaxCalls(assert, 0, someRestUrl + "metadata/minimalGroupId", "DELETE");
//		assertAjaxCalls(assert, 1, someRestUrl + "text/minimalGroupIdText", "DELETE");

	});

	const assertAjaxCalls = function(assert, callNumber, url, requestMethod) {
		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(callNumber);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, url);
		assert.strictEqual(ajaxCallSpec.requestMethod, requestMethod);
		assert.strictEqual(ajaxCallSpec.accept, undefined);
		assert.strictEqual(ajaxCallSpec.contentType, undefined);
		assert.strictEqual(ajaxCallSpec.data, undefined);
	};

});