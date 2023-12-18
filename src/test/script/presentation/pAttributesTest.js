/*
 * Copyright 2022 Uppsala University Library
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

QUnit.module("presentation/pAttributesTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		
		this.pubSub = CORATEST.pubSubSpy();
		this.presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		this.pAttributesViewFactory = CORATEST.standardFactorySpy("pAttributesViewSpy");

		let addViewFunctionCalled = 0;
		let addedView = undefined;
		this.getAddViewFunctionCalled = function() {
			return addViewFunctionCalled;
		};
		this.getAddedView = function() {
			return addedView;
		};

		this.dependencies = {
			metadataProvider : this.metadataProvider,
			pubSub: this.pubSub,
			presentationFactory: this.presentationFactory,
			pAttributesViewFactory: this.pAttributesViewFactory
		};
		this.spec = {
			path: ["whatEverPathToPresentationUsingAttributes"],
			mode: "input",
			toShow: "all",
			addViewToParent: function(viewToAdd) {
				addViewFunctionCalled += 1;
				addedView = viewToAdd;
			}
		};
	}
});

QUnit.test("testInit", function(assert) {
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	assert.strictEqual(this.pAttributes.type, "pAttributes");
});

QUnit.test("testGetDependencies", function(assert) {
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	assert.strictEqual(this.pAttributes.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	assert.strictEqual(this.pAttributes.getSpec(), this.spec);
});

QUnit.test("testViewFactored", function(assert) {
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	let pAttributesViewSpy = this.pAttributesViewFactory.getFactored(0);
	assert.strictEqual(pAttributesViewSpy.type, "pAttributesViewSpy");
	assert.strictEqual(this.pAttributesViewFactory.getSpec(0), undefined);
});

QUnit.test("testSubscribeToAddAttribute", function(assert) {
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	let subscriptions = this.pubSub.getSubscriptions();

	let attributeSubsription = subscriptions[0];
	assert.strictEqual(attributeSubsription.type, "addAttribute");
	assert.stringifyEqual(attributeSubsription.path, this.spec.path);
	assert.ok(attributeSubsription.functionToCall === this.pAttributes.addAttributePresentation);
	assert.ok(attributeSubsription.functionToCall != undefined);

	assert.deepEqual(subscriptions.length, 1);
});

QUnit.test("testAddAttributePresentation", function(assert) {
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	let pAttributes = this.pAttributes;
	let metadataId = "anAttribute";
	pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg(metadataId));

	let presentationForAttribute = buildExpectedPresentationForAttribute(metadataId, this.spec.mode);

	let presentationSpec = this.presentationFactory.getSpec(0);
	assert.deepEqual(presentationSpec.path, ["whatEverPathToPresentationUsingAttributes", "@anAttribute"]);
	assert.deepEqual(presentationSpec.metadataIdUsedInData, metadataId);
	assert.deepEqual(presentationSpec.cPresentation.getData(), presentationForAttribute);

	let expectedAttributePresentation = {
		view: this.presentationFactory.getFactored(0).getView(),
	};
	let pAttributesViewSpy = this.pAttributesViewFactory.getFactored(0);
	assert.deepEqual(pAttributesViewSpy.getAddedAttributePresentation(0), expectedAttributePresentation);
});

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.createAddAttributeMsg = function(metadataId) {
		return {
			metadataId: metadataId,
			path: ["whatEverPathToPresentationUsingAttributes"],
			nameInData: metadataId
		};
	};
	return coraTest;
}(CORATEST || {}));

QUnit.test("testAddAttributeOutputPresentation", function(assert) {
	this.spec.mode = "output";
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	let pAttributes = this.pAttributes;
	let metadataId = "anAttribute";
	pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg(metadataId));

	let presentationForAttribute = buildExpectedPresentationForAttribute(metadataId, this.spec.mode);

	let presentationSpec = this.presentationFactory.getSpec(0);
	assert.deepEqual(presentationSpec.path, ["whatEverPathToPresentationUsingAttributes", "@anAttribute"]);
	assert.deepEqual(presentationSpec.metadataIdUsedInData, metadataId);
	assert.deepEqual(presentationSpec.cPresentation.getData(), presentationForAttribute);

	let expectedAttributePresentation = {
		view: this.presentationFactory.getFactored(0).getView(),
	};
	let pAttributesViewSpy = this.pAttributesViewFactory.getFactored(0);
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


QUnit.test("testAddAttributePresentation_withFinalValue_notAdded_selectable", function(assert) {
	this.spec.toShow = "selectable";
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	let pAttributes = this.pAttributes;
	let metadataId = "anAttribute";
	
	pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg(metadataId));

	let presentationForAttribute = buildExpectedPresentationForAttribute(metadataId, this.spec.mode);

	let presentationSpec = this.presentationFactory.getSpec(0);
	
	let pAttributesViewSpy = this.pAttributesViewFactory.getFactored(0);
	assert.deepEqual(pAttributesViewSpy.getAddedAttributePresentation(0), undefined);
});			

QUnit.test("testAddAttributePresentation_withFinalValue_notAdded_selectable", function(assert) {
	this.spec.toShow = "selectable";
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	let pAttributes = this.pAttributes;
	let metadataId = "anAttributeChoice";
	
	pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg(metadataId));

	let presentationForAttribute = buildExpectedPresentationForAttribute(metadataId, this.spec.mode);

	let presentationSpec = this.presentationFactory.getSpec(0);
	
	assert.deepEqual(presentationSpec.path, ["whatEverPathToPresentationUsingAttributes", "@anAttributeChoice"]);
	assert.deepEqual(presentationSpec.metadataIdUsedInData, metadataId);
	assert.deepEqual(presentationSpec.cPresentation.getData(), presentationForAttribute);

	let expectedAttributePresentation = {
		view: this.presentationFactory.getFactored(0).getView(),
	};
	let pAttributesViewSpy = this.pAttributesViewFactory.getFactored(0);
	assert.deepEqual(pAttributesViewSpy.getAddedAttributePresentation(0), expectedAttributePresentation);
});			


QUnit.test("testAttributesViewAddedUsingAddViewFunction", function(assert) {
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	assert.strictEqual(this.getAddViewFunctionCalled(), 0);

	this.pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg("anAttribute"));
	this.pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg("anAttribute"));

	assert.strictEqual(this.getAddViewFunctionCalled(), 1);
	let pAttributesViewSpy = this.pAttributesViewFactory.getFactored(0);
	assert.strictEqual(this.getAddedView(), pAttributesViewSpy.getView());
});


QUnit.test("testDisableAttributes", function(assert) {
	this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	let pAttributes = this.pAttributes;
	pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg("anAttribute"));
	pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg("anOtherAttribute"));

	let factoredAttributePVar1 = this.presentationFactory.getFactored(0);
	let factoredAttributePVar2 = this.presentationFactory.getFactored(1);
	assert.false(factoredAttributePVar1.getDisableVarStatus());
	assert.false(factoredAttributePVar2.getDisableVarStatus());

	pAttributes.disableExistingAttributes();

	assert.true(factoredAttributePVar1.getDisableVarStatus());
	assert.true(factoredAttributePVar2.getDisableVarStatus());
});
