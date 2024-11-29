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
	let childViewModel;
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
			texts: [{ elementId: 2, id: "minimalGroupIdText", recordType: "text", dataDivider: "someDataDivider" },
			{ elementId: 3, id: "minimalGroupIdDefText", recordType: "text", dataDivider: "someDataDivider" }],
			methodOpenDefiningRecord: openDefiningRecordUsingEventAndId,
			attributes: [],
			refCollection: [],
			collectionItems: [],
			presentations: [],
			children: []
		};

		childViewModel = {
			elementId: 4,
			id: "textVarId",
			type: "textVariable",
			recordType: "metadata",
			nameInData: "textVar",
			texts: [{ elementId: 5, id: "someTextId", recordType: "text" }, { elementId: 6, id: "someDefTextId", recordType: "text" }],
			methodOpenDefiningRecord: openDefiningRecordUsingEventAndId
		};
		viewModel.children.push(childViewModel);
	};

	const openDefiningRecordUsingEventAndId = function(event, id) {
		callsToOpenDefiningRecord.push({ event: event, id: id });
	};

	test("testDeleteElementSetDeletingAndCallsDeleteUsingAjax", function(assert) {
		deleter.deleteElement(viewModel);
		
		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 1);

		//todo assert call to: view.setDeletingElement(viewModel.id)
		assertAjaxCalls(assert, 0, someRestUrl + "metadata/minimalGroupId", "DELETE", viewModel);

	});

	test("testDeleteElementCallBackSetDeletingAndCallsDeleteForAllChildren", function(assert) {
		let answer = {
			spec: { viewModel: viewModel }
		};

		//todo: use method from loadMethod from ajaxCall
		deleter.deleteRecordCallBack(answer);

		//todo assert call to: view.setDeletedElement(viewModel.id)
		
		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 3);
		let textElement = { elementId: 2, id: "minimalGroupIdText", recordType: "text", dataDivider: "someDataDivider" };
		let defTextElement = { elementId: 3, id: "minimalGroupIdDefText", recordType: "text", dataDivider: "someDataDivider" };
		assertAjaxCalls(assert, 0, someRestUrl + "text/minimalGroupIdText", "DELETE", textElement);
		assertAjaxCalls(assert, 1, someRestUrl + "text/minimalGroupIdDefText", "DELETE", defTextElement);
		assertAjaxCalls(assert, 2, someRestUrl + "metadata/textVarId", "DELETE", childViewModel);
		
		//todo assert call to: view.setDeletingElement(viewModel.id)
		//todo assert call to: view.setDeletingElement(viewModel.id)
		//todo assert call to: view.setDeletingElement(viewModel.id)

	});
	
	test("testDeleteElementCallFailsSetFailedDeletingAndCallsDeleteForAllChildren", function(assert) {
		let answer = {
			spec: { viewModel: viewModel }
		};

		deleter.deleteRecordFailedCallBack(answer);

		//todo assert call to: view.setFailedDeletedElement(viewModel.id)
		
		assert.strictEqual(ajaxCallFactorySpy.getFactoredAjaxCalls(), 0);
	});

	const assertAjaxCalls = function(assert, callNumber, url, requestMethod, viewModel) {
		let ajaxCallSpy = ajaxCallFactorySpy.getFactored(callNumber);
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, url);
		assert.strictEqual(ajaxCallSpec.requestMethod, requestMethod);
		assert.strictEqual(ajaxCallSpec.loadMethod, deleter.deleteRecordCallBack);
		assert.strictEqual(ajaxCallSpec.errorMethod, deleter.deleteRecordFailedCallBack);
		assert.strictEqual(ajaxCallSpec.accept, undefined);
		assert.strictEqual(ajaxCallSpec.contentType, undefined);
		assert.strictEqual(ajaxCallSpec.data, undefined);
		assert.deepEqual(ajaxCallSpec.viewModel, viewModel);
	};

});