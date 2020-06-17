/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2016, 2017, 2018, 2019 Uppsala University Library
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

QUnit.module("metadata/metadataControllerTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.metadataChildAndRepeatInitializerFactory = CORATEST.metadataChildAndRepeatInitializerFactorySpy({});
		this.metadataChildInitializerFactory = CORATEST.standardFactorySpy("metadataChildInitializerSpy");
		this.pubSub = CORATEST.pubSubSpy();
		this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();

		this.dependencies = {
			recordTypeProvider: CORATEST.recordTypeProviderSpy(),
			metadataProvider: this.metadataProvider,
			pubSub: this.pubSub,
			metadataChildInitializerFactory: this.metadataChildInitializerFactory,
			metadataChildAndRepeatInitializerFactory: this.metadataChildAndRepeatInitializerFactory
		};
		this.spec = {
			metadataId: "groupIdOneTextChild",
			data: { "someData": "data" },
			metadataProvider: this.metadataProvider,
			pubSub: this.pubSub,
			recordPartPermissionCalculator: this.recordPartPermissionCalculator
		};
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {

	var metadataController = CORA.metadataController(this.dependencies, this.spec);
	assert.strictEqual(metadataController.type, "metadataController");
});

QUnit.test("testGetSpec", function(assert) {
	var metadataController = CORA.metadataController(this.dependencies, this.spec);
	assert.strictEqual(metadataController.getSpec(), this.spec);
});
QUnit.test("testGetDependencies", function(assert) {
	var metadataController = CORA.metadataController(this.dependencies, this.spec);
	assert.strictEqual(metadataController.getDependencies(), this.dependencies);
});

QUnit.test("testCorrectSpecSentToChildIntitilizerFactor", function(assert) {
	var metadataController = CORA.metadataController(this.dependencies, this.spec);
	assert.ok(metadataController !== undefined);
	let spec = this.metadataChildAndRepeatInitializerFactory.getChildSpec(0);

	let topGroup = CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChild"));
	let childReferences = topGroup.getFirstChildByNameInData("childReferences");
	let childReference = childReferences.children[0];
	assert.stringifyEqual(spec.childReference, childReference);

	assert.deepEqual(spec.path, {});
	assert.deepEqual(spec.data, this.spec.data);
});

QUnit.test("testChildIntitilizerIsCalled", function(assert) {
	var metadataController = CORA.metadataController(this.dependencies, this.spec);
	assert.ok(metadataController !== undefined);
	let factored = this.metadataChildAndRepeatInitializerFactory.getFactoredChildIntitializers(0);

	assert.strictEqual(factored.getInitializeCalled(), true);

});

QUnit.test("testCorrectSpecSentToChildIntitilizerFactorWhenTwoChildren", function(assert) {
	this.spec.metadataId = "groupIdTwoTextChild";

	let metadataController = CORA.metadataController(this.dependencies, this.spec);
	assert.ok(metadataController !== undefined);
	let spec = this.metadataChildAndRepeatInitializerFactory.getChildSpec(0);

	let topGroup = CORA.coraData(this.metadataProvider.getMetadataById("groupIdTwoTextChild"));
	let childReferences = topGroup.getFirstChildByNameInData("childReferences");
	let childReference = childReferences.children[0];
	assert.stringifyEqual(spec.childReference, childReference);

	assert.deepEqual(spec.path, {});
	assert.deepEqual(spec.data, this.spec.data);

	let spec2 = this.metadataChildAndRepeatInitializerFactory.getChildSpec(1);

	let childReference2 = childReferences.children[1];
	assert.stringifyEqual(spec2.childReference, childReference2);

	assert.deepEqual(spec2.path, {});
	assert.deepEqual(spec2.data, this.spec.data);
});

QUnit.test("testPubSubMessages", function(assert) {
	CORA.metadataController(this.dependencies, this.spec);

	let messages = this.pubSub.getMessages();

	assert.equal(messages.length, 2);
	assert.deepEqual(JSON.stringify(messages[0]),
		'{"type":"newElementsAdded","message":{"data":"","path":{}}}');
	assert.deepEqual(JSON.stringify(messages[1]),
		'{"type":"initComplete","message":{"data":"","path":{}}}');
});

QUnit.test("testRecordPartPermissionCalculatorCallsCorrectly", function(assert) {  
	this.spec.metadataId = "groupIdTwoTextChild";

	CORA.metadataController(this.dependencies, this.spec);
	
	let recordPartPermissionCalculatorSpy = this.spec.recordPartPermissionCalculator;
	let callsToHasFulfilledReadPermissionsForRecordPart = recordPartPermissionCalculatorSpy.getReadRequestedIdsArray();
	assert.equal(callsToHasFulfilledReadPermissionsForRecordPart.length, 2);
	assert.equal(callsToHasFulfilledReadPermissionsForRecordPart[0], "metadataTextVariable_textVariableId");
	assert.equal(callsToHasFulfilledReadPermissionsForRecordPart[1], "metadataTextVariable_textVariableId2");
	
});

QUnit.test("testRecordPartPermissionCalculatorCallsCorrectlyWhenPermissionMissingForOneChild", function(assert) {  
	this.spec.metadataId = "groupIdTwoTextChild";
	let recordPartPermissionCalculatorSpy = this.spec.recordPartPermissionCalculator;
	recordPartPermissionCalculatorSpy.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");
	
	CORA.metadataController(this.dependencies, this.spec);
	
	let topGroup = CORA.coraData(this.metadataProvider.getMetadataById("groupIdTwoTextChild"));
	let childReferences = topGroup.getFirstChildByNameInData("childReferences");
	
	let spec = this.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
	let childReference2 = childReferences.children[1];
	assert.stringifyEqual(spec.childReference, childReference2);

	assert.deepEqual(spec.path, {});
	assert.deepEqual(spec.data, this.spec.data);
	
	let spec2 = this.metadataChildAndRepeatInitializerFactory.getChildSpec(1);
	assert.strictEqual(spec2, undefined);
});
