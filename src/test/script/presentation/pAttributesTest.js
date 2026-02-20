/*
 * Copyright 2022, 2024 Uppsala University Library
 * Copyright 2023 Olov McKie
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
QUnit.module("presentation/pAttributesTest.js", hooks => {
	const test = QUnit.test;
	let metadataProvider;
	let pubSub;
	let presentationFactory;
	let pAttributesViewFactory;
	let dependencies;
	let spec;
	let addViewFunctionCalled;
	let addedView;
	let pAttributes;

	hooks.beforeEach(() => {
		metadataProvider = CORATEST.MetadataProviderStub();

		pubSub = CORATEST.pubSubSpy();
		presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		pAttributesViewFactory = CORATEST.standardFactorySpy("pAttributesViewSpy");

		addViewFunctionCalled = 0;
		addedView = undefined;

		dependencies = {
			metadataProvider: metadataProvider,
			pubSub: pubSub,
			presentationFactory: presentationFactory,
			pAttributesViewFactory: pAttributesViewFactory
		};
		spec = {
			path: ["whatEverPathToPresentationUsingAttributes"],
			mode: "input",
			toShow: "all",
			addViewToParent: function(viewToAdd) {
				addViewFunctionCalled += 1;
				addedView = viewToAdd;
			}
		};
	});
	hooks.afterEach(() => {
		//no after
	});
	const getAddViewFunctionCalled = function() {
		return addViewFunctionCalled;
	};
	const getAddedView = function() {
		return addedView;
	};


	test("testInit", function(assert) {
		pAttributes = CORA.pAttributes(dependencies, spec);
		assert.strictEqual(pAttributes.type, "pAttributes");
	});

	test("testGetDependencies", function(assert) {
		pAttributes = CORA.pAttributes(dependencies, spec);
		assert.strictEqual(pAttributes.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		pAttributes = CORA.pAttributes(dependencies, spec);
		assert.strictEqual(pAttributes.getSpec(), spec);
	});

	test("testViewFactored", function(assert) {
		pAttributes = CORA.pAttributes(dependencies, spec);
		let pAttributesViewSpy = pAttributesViewFactory.getFactored(0);
		assert.strictEqual(pAttributesViewSpy.type, "pAttributesViewSpy");
		assert.strictEqual(pAttributesViewFactory.getSpec(0), undefined);
	});

	test("testSubscribeToAddAttribute", function(assert) {
		pAttributes = CORA.pAttributes(dependencies, spec);
		let subscriptions = pubSub.getSubscriptions();

		let attributeSubsription = subscriptions[0];
		assert.strictEqual(attributeSubsription.type, "addAttribute");
		assert.stringifyEqual(attributeSubsription.path, spec.path);
		assert.ok(attributeSubsription.functionToCall === pAttributes.addAttributePresentation);
		assert.ok(attributeSubsription.functionToCall != undefined);

		assert.deepEqual(subscriptions.length, 1);
	});

	test("testAddAttributePresentation", function(assert) {
		pAttributes = CORA.pAttributes(dependencies, spec);
		let metadataId = "anAttribute";
		pAttributes.addAttributePresentation(createAddAttributeMsg(metadataId));

		let presentationForAttribute = buildExpectedPresentationForAttribute(metadataId, spec.mode);

		let presentationSpec = presentationFactory.getSpec(0);
		assert.deepEqual(presentationSpec.path, ["whatEverPathToPresentationUsingAttributes", "@anAttribute"]);
		assert.deepEqual(presentationSpec.metadataIdUsedInData, metadataId);
		assert.deepEqual(presentationSpec.cPresentation.getData(), presentationForAttribute);

		let expectedAttributePresentation = {
			view: presentationFactory.getFactored(0).getView(),
		};
		let pAttributesViewSpy = pAttributesViewFactory.getFactored(0);
		assert.deepEqual(pAttributesViewSpy.getAddedAttributePresentation(0), expectedAttributePresentation);
	});

	//	var CORATEST = (function(coraTest) {
	//		"use strict";
	const createAddAttributeMsg = function(metadataId) {
		return {
			metadataId: metadataId,
			path: ["whatEverPathToPresentationUsingAttributes"],
			nameInData: metadataId
		};
	};
	//		return coraTest;
	//	}(CORATEST || {}));

	test("testAddAttributeOutputPresentation", function(assert) {
		spec.mode = "output";
		pAttributes = CORA.pAttributes(dependencies, spec);
		let metadataId = "anAttribute";
		pAttributes.addAttributePresentation(createAddAttributeMsg(metadataId));

		let presentationForAttribute = buildExpectedPresentationForAttribute(metadataId, spec.mode);

		let presentationSpec = presentationFactory.getSpec(0);
		assert.deepEqual(presentationSpec.path, ["whatEverPathToPresentationUsingAttributes", "@anAttribute"]);
		assert.deepEqual(presentationSpec.metadataIdUsedInData, metadataId);
		assert.deepEqual(presentationSpec.cPresentation.getData(), presentationForAttribute);

		let expectedAttributePresentation = {
			view: presentationFactory.getFactored(0).getView(),
		};
		let pAttributesViewSpy = pAttributesViewFactory.getFactored(0);
		assert.deepEqual(pAttributesViewSpy.getAddedAttributePresentation(0), expectedAttributePresentation);
	});

	const buildExpectedPresentationForAttribute = function(metadataId, mode) {
		return {
			name: "presentation",
			children: [{
				name: "presentationOf",
				children: [
					{
						name: "linkedRecordId",
						value: metadataId
					}]
			}, {
				name: "mode",
				value: mode
			}, {
				name: "emptyTextId",
				children: [
					{
						name: "linkedRecordId",
						value: "initialEmptyValueText"
					}]
			}],
			attributes: {
				type: "pCollVar"
			}
		}
	};


	test("testAddAttributePresentation_withFinalValue_notAdded_selectable", function(assert) {
		spec.toShow = "selectable";
		pAttributes = CORA.pAttributes(dependencies, spec);
		let metadataId = "anAttribute";

		pAttributes.addAttributePresentation(createAddAttributeMsg(metadataId));

		let presentationForAttribute = buildExpectedPresentationForAttribute(metadataId, spec.mode);

		let presentationSpec = presentationFactory.getSpec(0);

		let pAttributesViewSpy = pAttributesViewFactory.getFactored(0);
		assert.deepEqual(pAttributesViewSpy.getAddedAttributePresentation(0), undefined);
	});

	test("testAddAttributePresentation_withFinalValue_notAdded_selectable", function(assert) {
		spec.toShow = "selectable";
		pAttributes = CORA.pAttributes(dependencies, spec);
		let metadataId = "anAttributeChoice";

		pAttributes.addAttributePresentation(createAddAttributeMsg(metadataId));

		let presentationForAttribute = buildExpectedPresentationForAttribute(metadataId, spec.mode);

		let presentationSpec = presentationFactory.getSpec(0);

		assert.deepEqual(presentationSpec.path, ["whatEverPathToPresentationUsingAttributes", "@anAttributeChoice"]);
		assert.deepEqual(presentationSpec.metadataIdUsedInData, metadataId);
		assert.deepEqual(presentationSpec.cPresentation.getData(), presentationForAttribute);

		let expectedAttributePresentation = {
			view: presentationFactory.getFactored(0).getView(),
		};
		let pAttributesViewSpy = pAttributesViewFactory.getFactored(0);
		assert.deepEqual(pAttributesViewSpy.getAddedAttributePresentation(0), expectedAttributePresentation);
	});


	test("testAttributesViewAddedUsingAddViewFunction", function(assert) {
		pAttributes = CORA.pAttributes(dependencies, spec);
		assert.strictEqual(getAddViewFunctionCalled(), 0);

		pAttributes.addAttributePresentation(createAddAttributeMsg("anAttribute"));
		pAttributes.addAttributePresentation(createAddAttributeMsg("anAttribute"));

		assert.strictEqual(getAddViewFunctionCalled(), 1);
		let pAttributesViewSpy = pAttributesViewFactory.getFactored(0);
		assert.strictEqual(getAddedView(), pAttributesViewSpy.getView());
	});

	test("testDisableAttributes", function(assert) {
		pAttributes = CORA.pAttributes(dependencies, spec);
		pAttributes.addAttributePresentation(createAddAttributeMsg("anAttribute"));
		pAttributes.addAttributePresentation(createAddAttributeMsg("anOtherAttribute"));

		let factoredAttributePVar1 = presentationFactory.getFactored(0);
		let factoredAttributePVar2 = presentationFactory.getFactored(1);
		assert.false(factoredAttributePVar1.getDisableVarStatus());
		assert.false(factoredAttributePVar2.getDisableVarStatus());

		pAttributes.disableExistingAttributes();

		assert.true(factoredAttributePVar1.getDisableVarStatus());
		assert.true(factoredAttributePVar2.getDisableVarStatus());
	});
});
