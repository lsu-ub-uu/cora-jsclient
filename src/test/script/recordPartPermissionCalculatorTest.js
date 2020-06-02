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

QUnit.module("recordPartPermissionCalculator.js", {
	beforeEach: function() {
//		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		this.metadataProviderSpy = CORATEST.metadataProviderNewSpy();
		
		this.dependencies = {
			metadataProvider: this.metadataProviderSpy
//			,
//			"uploadManager": this.uploadManager
		};
		this.spec = {
			metadataId : "groupIdOneTextChild",
			permissions : {
				write : [],
				read : []
			}
			
//			"loadMethod": function() {
//			},
//			"timeoutMethod": function() {
//			}
		};

	},
	afterEach: function() {
	}
});

QUnit.test("testType", function(assert) {
	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(recordPartPermissionCalculator.type, "recordPartPermissionCalculator");
});

QUnit.test("testGetDependencies", function(assert) {
	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(recordPartPermissionCalculator.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(recordPartPermissionCalculator.getSpec(), this.spec);
});

QUnit.test("testInitNoPermissions", function(assert) {
	this.dependencies.metadataProvider = CORATEST.metadataProviderNewSpy();
	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), undefined);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);
	
});
QUnit.test("testInitEmptyPermissions", function(assert) {
	this.spec.permissions = {
			write : [],
			read : []
	};
	this.dependencies.metadataProvider = CORATEST.metadataProviderNewSpy();
	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), undefined);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);
	
});

QUnit.test("testInitWithWritePermissionsNoConstraints", function(assert) {
	this.spec.permissions = {
			write : ["textVariableId"],
			read : []
		};
	this.dependencies.metadataProvider = CORATEST.metadataProviderNewSpy();
	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);
	
});
QUnit.test("testInitWithReadPermissionsNoConstraints", function(assert) {
	this.spec.permissions = {
			write : [],
			read : ["textVariableId"]
	};
	this.dependencies.metadataProvider = CORATEST.metadataProviderNewSpy();
	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);
	
});

QUnit.test("testInitWithWritePermissionsMatchingConstraints", function(assert) {
	let childReferences = {
			"name": "childReferences",
			"children": [{
				"name": "childReference",
				"repeatId": "0",
				"children": [
					{
						"name": "ref",
						"children": [{
							"name": "linkedRecordType",
							"value": "metadata"
						}, {
							"name": "linkedRecordId",
							"value": "textVariableId"
						}]
					}, {
						"name": "repeatMin",
						"value": "1"
					}, {
						"name": "repeatMax",
						"value": "1"
					}, {
			              "name": "recordPartConstraint",
			              "value": "write"
			            }]
			}]
		};
	this.spec.permissions = {
			write : ["textVariableId"],
			read : []
		};
	this.dependencies.metadataProvider = CORATEST.metadataProviderNewSpy();
	this.dependencies.metadataProvider.setChildReferences(childReferences);
	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 1);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);
	
});
//
//QUnit.test("testWriteConstraintsNoPermissions", function(assert) {
//	this.spec.metadataid = "groupIdOneTextChildWithWriteConstraints";
//	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
//});
//
//QUnit.test("testWriteConstraintsWithPermission", function(assert) {
//	this.spec.permissions = {
//			write : ["textVariableId"],
//			read : []
//		};
//	this.spec.metadataid = "groupIdOneTextChildWithWriteConstraints";
//	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 1);
//});
//
//QUnit.test("testUndefinedPermissions", function(assert) {
//	let undefinedPermissionSpec = {
//			metadataId : "groupIdOneTextChild"
//			};
//	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, undefinedPermissionSpec);
//	assert.strictEqual(recordPartPermissionCalculator.getFulfillsReadForId("someMetadataId"), false);
//});
//
//QUnit.test("testEmptyPermissions", function(assert) {
//	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//	assert.strictEqual(recordPartPermissionCalculator.getFulfillsReadForId("someMetadataId"), false);
//});
//
//QUnit.test("testFulfillsReadPermissions", function(assert) {
//	this.spec.permissions = {
//		write : [],
//		read : ["someMetadataId"]
//	};
//	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//	
//	assert.strictEqual(recordPartPermissionCalculator.getFulfillsReadForId("someMetadataId"), true);
//});
//QUnit.test("testUnfulfillsReadPermissionsWrongMetadataId", function(assert) {
//	this.spec.permissions = {
//			write : [],
//			read : ["someMetadataId"]
//	};
//	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//	
//	assert.strictEqual(recordPartPermissionCalculator.getFulfillsReadForId("NOTSomeMetadataId"), false);
//});

//QUnit.test("testIndexData", function(assert) {
//    var indexHandler = CORA.indexHandler(this.dependencies, this.spec);
//    var record = CORATEST.listWithDataToIndex.dataList.data[0].record;
//
//    indexHandler.indexData(record);
//
//    var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
//    assert.strictEqual(ajaxCallSpy0.getSpec().requestMethod, "POST");
//    assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, this.spec.loadMethod);
//
//});
//
//QUnit.test("testIndexDataWithoutIndexLink", function(assert) {
//    var indexHandler = CORA.indexHandler(this.dependencies, this.spec);
//    var record = CORATEST.listWithDataToIndex.dataList.data[2].record;
//
//    indexHandler.indexData(record);
//
//    assert.strictEqual(this.ajaxCallFactorySpy.callCount, 0);
//});
//
//QUnit.test("testHandleCallErrorDoesNothing", function(assert) {
//	var indexHandler = CORA.indexHandler(this.dependencies, this.spec);
//	try {
//		indexHandler.handleCallError();
//	} catch (error) {
//		assert.strictEqual(error.message, "error indexing");
//	}
//});
