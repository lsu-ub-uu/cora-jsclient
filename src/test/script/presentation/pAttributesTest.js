/*
 * Copyright 2022 Uppsala University Library
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

QUnit.module("presentation/pVarTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.presentationFactory = CORATEST.standardFactorySpy("presentationSpy");

		this.viewSpy = CORATEST.pAttributesViewSpy();

		let addViewFunctionCalled = 0;
		let addedView = undefined;
		this.getAddViewFunctionCalled = function() {
			return addViewFunctionCalled;
		};
		this.getAddedView = function() {
			return addedView;
		};

		this.dependencies = {
			pubSub: this.pubSub,
			presentationFactory: this.presentationFactory,
			view: this.viewSpy
		};
		this.spec = {
			path: ["whatEverPathToPresentationUsingAttributes"],
			mode: "input",
			addViewToParent: function(viewToAdd) {
				addViewFunctionCalled += 1;
				addedView = viewToAdd;
			}
		};
		this.pAttributes = CORA.pAttributes(this.dependencies, this.spec);
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.pAttributes.type, "pAttributes");
});

QUnit.test("testGetDependencies", function(assert) {
	assert.strictEqual(this.pAttributes.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	assert.strictEqual(this.pAttributes.getSpec(), this.spec);
});

QUnit.test("testSubscribeToAddAttribute", function(assert) {
	let subscriptions = this.pubSub.getSubscriptions();

	let attributeSubsription = subscriptions[0];
	assert.strictEqual(attributeSubsription.type, "addAttribute");
	assert.stringifyEqual(attributeSubsription.path, this.spec.path);
	assert.ok(attributeSubsription.functionToCall === this.pAttributes.addAttributePresentation);
	assert.ok(attributeSubsription.functionToCall != undefined);

	assert.deepEqual(subscriptions.length, 1);
});

QUnit.test("testAddAttributePresentation", function(assert) {
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
		text: "fake text from presentationSpy, anAttribute"
	};
	assert.deepEqual(this.viewSpy.getAddedAttributePresentation(0), expectedAttributePresentation);
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
		text: "fake text from presentationSpy, anAttribute"
	};
	assert.deepEqual(this.viewSpy.getAddedAttributePresentation(0), expectedAttributePresentation);
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

QUnit.test("testAttributesViewAddedUsingAddViewFunction", function(assert) {
	assert.strictEqual(this.getAddViewFunctionCalled(), 0);

	this.pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg("anAttribute"));
	this.pAttributes.addAttributePresentation(CORATEST.createAddAttributeMsg("anAttribute"));

	assert.strictEqual(this.getAddViewFunctionCalled(), 1);
	assert.strictEqual(this.getAddedView(), this.viewSpy.getView());
});


QUnit.test("testDisableAttributes", function(assert) {
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