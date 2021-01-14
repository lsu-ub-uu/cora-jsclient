/*
 * Copyright 2020 Uppsala University Library
 * 
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

QUnit.module("metadata/pathUtils.js", {
	beforeEach: function() {
	},
	afterEach: function() {
	}
});

QUnit.test("testInitPathUtils", function(assert) {
	let pathUtils = CORA.pathUtils();
	assert.strictEqual(pathUtils.type, "pathUtils");
});

QUnit.test("testBlankPath", function(assert) {
	let pathUtils = CORA.pathUtils();
	let path = {};
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.strictEqual(returnedPath, path);
});

QUnit.test("testOneLevelPathNoRepeatId", function(assert) {
	let path = CORATEST.firstLevelPath;
	let expectedPath = path;
	let pathUtils = CORA.pathUtils();
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.deepEqual(returnedPath, expectedPath);
});

QUnit.test("testOneLevelPathWithRepeatId", function(assert) {
	let path = CORATEST.firstLevelPathWithRepeatId;
	let expectedPath = {
		"name": "linkedPath",
		"children": [{
			"name": "nameInData",
			"value": "textVariableId"
		}]
	};
	let pathUtils = CORA.pathUtils();
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.deepEqual(returnedPath, expectedPath);
});

QUnit.test("testTwoLevelPathNoRepeatId", function(assert) {
	let path = CORATEST.pathWithTwoLevels;
	let expectedPath = path;
	let pathUtils = CORA.pathUtils();
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.deepEqual(returnedPath, expectedPath);
});

QUnit.test("testTwoLevelPathWithRepeatId", function(assert) {
	let path = CORATEST.twoLevelPathWithRepeatIdAtLowestLevel;
	let expectedPath = {
		"name": "linkedPath",
		"children": [{
			"name": "nameInData",
			"value": "userRole"
		}, {
			"name": "linkedPath",
			"children": [{
				"name": "nameInData",
				"value": "userRole"
			}]
		}]
	};
	let pathUtils = CORA.pathUtils();
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.deepEqual(returnedPath, expectedPath);
});

//QUnit.test("testDisablePubSubMessagesWithFirstLevelPathWithRepeatId", function(assert) {
//	let firstLevelPath = CORATEST.firstLevelPathWithRepeatId;
//
//	let expectedPath = {
//		"name": "linkedPath",
//		"children": [{
//			"name": "nameInData",
//			"value": "textVariableId"
//		}]
//	};
//	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
//		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
//	let spec = {
//		path: firstLevelPath,
//		cPresentation: cPCollectionVarPresentation
//	};
//
//	let pCollectionVar = CORA.pCollectionVar(this.dependencies, spec);
//	let subscriptions = this.pubSub.getSubscriptions();
//	assert.deepEqual(subscriptions.length, 3);
//
//	let disableSubscription = subscriptions[2];
//
//	assert.strictEqual(disableSubscription.type, "disable");
//	assert.deepEqual(disableSubscription.path, expectedPath);
//	assert.ok(pCollectionVar.disableCollectionVar);
//	assert.ok(disableSubscription.functionToCall === pCollectionVar.disableCollectionVar);
//});
//
//QUnit.test("testPubSubMessagesWithTwoLevelPath", function(assert) {
//	let pathWithTwoLevels = CORATEST.pathWithTwoLevels;
//
//	let expectedPath = {
//		"name": "linkedPath",
//		"children": [{
//			"name": "nameInData",
//			"value": "recordInfo"
//		}, {
//			"name": "linkedPath",
//			"children": [{
//				"name": "nameInData",
//				"value": "dataDivider"
//			}]
//		}]
//	};
//	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
//		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
//	let spec = {
//		path: pathWithTwoLevels,
//		cPresentation: cPCollectionVarPresentation
//	};
//
//	CORA.pCollectionVar(this.dependencies, spec);
//	let subscriptions = this.pubSub.getSubscriptions();
//
//	let disableSubscription = subscriptions[2];
//	assert.deepEqual(disableSubscription.path, expectedPath);
//});
//
//QUnit.test("testPubSubMessagesWithTwoLevelPathAndAttribute", function(assert) {
//	let pathWithAttribute = CORATEST.twoLevelPathWithAttribute;
//
//	let expectedPath = pathWithAttribute;
//	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
//		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
//	let spec = {
//		path: pathWithAttribute,
//		cPresentation: cPCollectionVarPresentation
//	};
//
//	CORA.pCollectionVar(this.dependencies, spec);
//	let subscriptions = this.pubSub.getSubscriptions();
//
//	let disableSubscription = subscriptions[2];
//	assert.deepEqual(disableSubscription.path, expectedPath);
//});
//QUnit.test("testPubSubMessagesWithTwoLevelPathWithRepeatIdLowestLevel", function(assert) {
//	let pathWithAttribute = CORATEST.twoLevelPathWithRepeatIdAtLowestLevel;
//
//	let expectedPath = {
//		"name": "linkedPath",
//		"children": [{
//			"name": "nameInData",
//			"value": "userRole"
//		}, {
//			"name": "linkedPath",
//			"children": [{
//				"name": "nameInData",
//				"value": "userRole"
//			}]
//		}]
//	};
//	let cPCollectionVarPresentation = CORA.coraData(this.metadataProvider
//		.getMetadataById("userSuppliedIdCollectionVarPCollVar"));
//	let spec = {
//		path: pathWithAttribute,
//		cPresentation: cPCollectionVarPresentation
//	};
//
//	CORA.pCollectionVar(this.dependencies, spec);
//	let subscriptions = this.pubSub.getSubscriptions();
//
//	let disableSubscription = subscriptions[2];
//	assert.deepEqual(disableSubscription.path, expectedPath);
//});

