/*
 * Copyright 2020 Uppsala University Library
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

QUnit.module("metadata/metadataRepeatInitializerTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.dependencies = {
			recordTypeProvider : CORATEST.recordTypeProviderSpy(),
			metadataRepeatInitializerFactory : CORATEST
					.standardFactorySpy("metadataRepeatInitializerSpy")

		};
		this.spec = {
			data : undefined,
			path : {},
			metadataProvider : this.metadataProvider,
			pubSub : this.pubSub
		};

		this.spec.childReference = {
			"name" : "childReference",
			"repeatId" : "0",
			"children" : [ {
				"name" : "ref",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadata"
				}, {
					"name" : "linkedRecordId",
					"value" : "textVariableId"
				} ]
			}, {
				"name" : "repeatMin",
				"value" : "1"
			}, {
				"name" : "repeatMax",
				"value" : "1"
			} ]
		};

		// this.metadataProvider = metadataProvider;
		// this.pubSub = pubSub;
		// this.metadataControllerFactory =
		// CORATEST.metadataControllerFactory(this.metadataProvider,
		// this.pubSub);
	},
	afterEach : function() {
	}
});

//CORATEST.createChildReferenceForChildInitializerWithRepeatId = function(linkedRecordId,
//		linkedRecordType, repeatId, repeatMin, repeatMax) {
//	return {
//		"name" : "childReference",
//		"repeatId" : repeatId,
//		"children" : CORATEST.createRef(linkedRecordType, linkedRecordId, repeatMin, repeatMax)
//	};
//};
//CORATEST.createRef = function(linkedRecordType, linkedRecordId, repeatMin, repeatMax) {
//	return [ {
//		"name" : "ref",
//		"children" : [ {
//			"name" : "linkedRecordType",
//			"value" : linkedRecordType
//		}, {
//			"name" : "linkedRecordId",
//			"value" : linkedRecordId
//		} ]
//	}, {
//		"name" : "repeatMin",
//		"value" : repeatMin
//	}, {
//		"name" : "repeatMax",
//		"value" : repeatMax
//	} ]
//};
//
//CORATEST.createChildReferenceForChildInitializerWithNoRepeatId = function(linkedRecordId,
//		linkedRecordType, repeatMin, repeatMax) {
//	return {
//		"name" : "childReference",
//		"children" : CORATEST.createRef(linkedRecordType, linkedRecordId, repeatMin, repeatMax)
//	};
//};
//
//QUnit.test("testInit", function(assert) {
//
//	var metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	assert.strictEqual(metadataChildInitializer.type, "metadataChildInitializer");
//});
//
//QUnit.test("testGetSpec", function(assert) {
//	var metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	assert.strictEqual(metadataChildInitializer.getSpec(), this.spec);
//});
//QUnit.test("testGetDependecies", function(assert) {
//	var metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	assert.strictEqual(metadataChildInitializer.getDependencies(), this.dependencies);
//});
//
//QUnit.test("testInit2", function(assert) {
//	var metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	assert.ok(metadataChildInitializer !== undefined);
//	var messages = this.pubSub.getMessages();
//	assert.ok(messages !== undefined);
//});
//
//QUnit.test("testInitGroupIdOneTextChild", function(assert) {
//	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	metadataChildInitializer.initialize();
//	let messages = this.pubSub.getMessages();
//	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
//			+ '"metadataId":"textVariableId","path":{},"nameInData":"textVariableId"}}');
//
//	assert.equal(messages.length, 1);
//});
//
//QUnit.test("testInitGroupIdOneTextChildRepeatInitializerCalledCorrectly", function(assert) {
//	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	metadataChildInitializer.initialize();
//
//	let repeatSpec = this.dependencies.metadataRepeatInitializerFactory.getSpec(0);
//	assert.strictEqual(repeatSpec.metadataId, "textVariableId");
//	assert.strictEqual(repeatSpec.path, this.spec.path);
//	assert.strictEqual(repeatSpec.data, undefined);
//	assert.strictEqual(repeatSpec.repeatId, undefined);
//
//	let factored = this.dependencies.metadataRepeatInitializerFactory.getFactored(0);
//	assert.ok(factored.getInitializeCalled());
//});
//
//QUnit.test("testInitGroupIdOneTextChildWithDataRepeatInitializerCalledCorrectly", function(assert) {
//	this.spec.data = {
//		"name" : "groupIdOneTextChild",
//		"children" : [ {
//			"name" : "textVariableId",
//			"value" : "A Value"
//		} ]
//	};
//	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	metadataChildInitializer.initialize();
//
//	let repeatSpec = this.dependencies.metadataRepeatInitializerFactory.getSpec(0);
//	assert.strictEqual(repeatSpec.metadataId, "textVariableId");
//	assert.strictEqual(repeatSpec.path, this.spec.path);
//
//	let expectedData = {
//		"name" : "textVariableId",
//		"value" : "A Value"
//	};
//	assert.stringifyEqual(repeatSpec.data, expectedData);
//	assert.strictEqual(repeatSpec.repeatId, undefined);
//
//	let factored = this.dependencies.metadataRepeatInitializerFactory.getFactored(0);
//	assert.ok(factored.getInitializeCalled());
//});
//
//// QUnit.test("testInitGroupIdOneTextChildWithData", function(assert) {
//// let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//// metadataChildInitializer.initialize();
//// let messages = this.pubSub.getMessages();
//// assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
//// + '"metadataId":"textVariableId","path":{},"nameInData":"textVariableId"}}');
//// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
//// + '"path":' + createLinkedPathWithNameInDataAsString("textVariableId") + '}}');
////
//// assert.equal(messages.length, 2);
//// });
//
//function createLinkedPathWithNameInDataAsString(nameInData) {
//	return JSON.stringify(createLinkedPathWithNameInData(nameInData));
//}
//
//QUnit.test("testGroupIdOneTextChildWithWrongDataRepeatInitializerCalledCorrectly", function(assert) {
//	this.spec.data = {
//		"name" : "groupIdOneTextChild",
//		"children" : [ {
//			"name" : "textVariableIdNot",
//			"value" : "A Value"
//		} ]
//	};
//
//	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	metadataChildInitializer.initialize();
//	
//	let repeatSpec = this.dependencies.metadataRepeatInitializerFactory.getSpec(0);
//	assert.strictEqual(repeatSpec.metadataId, "textVariableId");
//	assert.strictEqual(repeatSpec.path, this.spec.path);
//
//	assert.stringifyEqual(repeatSpec.data, undefined);
//	assert.strictEqual(repeatSpec.repeatId, undefined);
//
//	let factored = this.dependencies.metadataRepeatInitializerFactory.getFactored(0);
//	assert.ok(factored.getInitializeCalled());
//	
//	
////	let messages = this.pubSub.getMessages();
////	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
////			+ '"metadataId":"textVariableId","path":{},"nameInData":"textVariableId"}}');
////
////	assert.equal(messages.length, 1);
//});
////QUnit.test("testInitGroupIdOneTextChildWithWrongData", function(assert) {
////	this.spec.data = {
////			"name" : "groupIdOneTextChild",
////			"children" : [ {
////				"name" : "textVariableIdNot",
////				"value" : "A Value"
////			} ]
////	};
////	
////	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
////	metadataChildInitializer.initialize();
////	let messages = this.pubSub.getMessages();
////	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
////			+ '"metadataId":"textVariableId","path":{},"nameInData":"textVariableId"}}');
////	
////	assert.equal(messages.length, 1);
////});
//
//QUnit
//		.test(
//				"testInitGroupIdOneTextChildWithFinalValue",
//				function(assert) {
//					this.spec.childReference = CORATEST
//							.createChildReferenceForChildInitializerWithRepeatId(
//									"textVariableWithFinalValueId", "metadataTextVariable", "0",
//									"1", "1");
//					// console.log(JSON.stringify(this.spec.childReference))
//					this.spec.data = {
//						"name" : "groupIdOneTextVarChildWithFinalValue",
//						"children" : [ {
//							"name" : "textVariableIdNot",
//							"value" : "A Value"
//						} ]
//					};
//
//					let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies,
//							this.spec);
//					metadataChildInitializer.initialize();
//					var messages = this.pubSub.getMessages();
//					assert
//							.deepEqual(
//									JSON.stringify(messages[0]),
//									'{"type":"add","message":{'
//											+ '"metadataId":"textVariableWithFinalValueId","path":{},"nameInData":"textVariableWithFinalValueId"}}');
//
//					assert
//							.deepEqual(
//									JSON.stringify(messages[1]),
//									'{"type":"setValue","message":{"data":"someFinalValue",'
//											+ '"path":'
//											+ createLinkedPathWithNameInDataAsString("textVariableWithFinalValueId")
//											+ '}}');
//					assert.equal(messages.length, 2);
//				});
//
//QUnit.test("testInitGroupIdTwoTextChildSecondChildHandledCorrectly", function(assert) {
//	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
//			"textVariableId2", "metadataTextVariable", "0", "1", "1");
//	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	metadataChildInitializer.initialize();
//
//	var messages = this.pubSub.getMessages();
//	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
//			+ '"metadataId":"textVariableId2","path":{},"nameInData":"textVariableId2"}}');
//
//	assert.equal(messages.length, 1);
//});
//
//// QUnit.test("testInitGroupIdTwoTextChildWithData", function(assert) {
//// var data = {
//// "name" : "groupIdOneTextChild",
//// "children" : [ {
//// "name" : "textVariableId",
//// "value" : "A Value"
//// }, {
//// "name" : "textVariableId2",
//// "value" : "A Value2"
//// } ]
//// };
////
//// this.metadataControllerFactory.factor("groupIdTwoTextChild", data);
//// var messages = this.pubSub.getMessages();
//// assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
//// + '"metadataId":"textVariableId","path":{},"nameInData":"textVariableId"}}');
//// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
//// + '"path":' + createLinkedPathWithNameInDataAsString("textVariableId") + '}}');
////
//// assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
//// + '"metadataId":"textVariableId2","path":{},"nameInData":"textVariableId2"}}');
//// assert.deepEqual(JSON.stringify(messages[3]),
//// '{"type":"setValue","message":{"data":"A Value2",' + '"path":'
//// + createLinkedPathWithNameInDataAsString("textVariableId2") + '}}');
////
//// assert.equal(messages.length, 6);
//// });
////
//QUnit.test("testInitGroupIdTwoTextChildWithWrongData", function(assert) {
//	var data = {
//		"name" : "groupIdOneTextChild",
//		"children" : [ {
//			"name" : "textVariableId",
//			"value" : "A Value"
//		}, {
//			"name" : "textVariableId2NOT",
//			"value" : "A Value2"
//		} ]
//	};
//	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
//			"textVariableId2", "metadataTextVariable", "0", "1", "1");
//	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	metadataChildInitializer.initialize();
//	var messages = this.pubSub.getMessages();
//
//	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
//			+ '"metadataId":"textVariableId2","path":{},"nameInData":"textVariableId2"}}');
//
//	assert.equal(messages.length, 1);
//});
//
//QUnit.test("testInitOneChildRepeat0to1", function(assert) {
//	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
//			"textVariableId", "metadataTextVariable", "0", "0", "1");
//	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	metadataChildInitializer.initialize();
//	var messages = this.pubSub.getMessages();
//	assert.equal(messages.length, 0);
//});
//
//QUnit.test("testInitOneChildRepeat0to1WithData", function(assert) {
//	this.spec.data = {
//		"name" : "groupIdOneTextChildRepeat0to1",
//		"children" : [ {
//			"name" : "textVariableId",
//			"value" : "A Value"
//		} ]
//	};
//	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
//			"textVariableId", "metadataTextVariable", "0", "0", "1");
//	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
//	metadataChildInitializer.initialize();
//	var messages = this.pubSub.getMessages();
//	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
//			+ '"metadataId":"textVariableId","path":{},"nameInData":"textVariableId"}}');
//	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
//			+ '"path":' + createLinkedPathWithNameInDataAsString("textVariableId") + '}}');
//
//	assert.equal(messages.length, 2);
//});
//
// QUnit
// .test(
// "testInitOneChildRepeat3to3",
// function(assert) {
// this.metadataControllerFactory.factor("groupIdOneTextChildRepeat3to3",
// undefined);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"0","nameInData":"textVariableId"}}');
// assert
// .deepEqual(
// JSON.stringify(messages[1]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"1","nameInData":"textVariableId"}}');
// assert
// .deepEqual(
// JSON.stringify(messages[2]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"2","nameInData":"textVariableId"}}');
//
// assert.equal(messages.length, 5);
// });
//
// QUnit
// .test(
// "testInitOneChildRepeat3to3WithData",
// function(assert) {
// var data = {
// "name" : "groupIdOneTextChildRepeat0to1",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value",
// "repeatId" : "one"
// }, {
// "name" : "textVariableId",
// "value" : "A Value2",
// "repeatId" : "two"
// }, {
// "name" : "textVariableId",
// "value" : "A Value3",
// "repeatId" : "three"
// } ]
// };
//
// this.metadataControllerFactory.factor("groupIdOneTextChildRepeat3to3", data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"one","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[1]),
// '{"type":"setValue","message":{"data":"A Value",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "one") + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[2]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"two","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[3]),
// '{"type":"setValue","message":{"data":"A Value2",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "two") + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[4]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"three","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[5]),
// '{"type":"setValue","message":{"data":"A Value3",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "three") + '}}');
//
// assert.equal(messages.length, 8);
// });
//
function createLinkedPathWithNameInDataAndRepeatIdAsString(nameInData, repeatId) {
	return JSON.stringify(createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId));
}
function createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId) {
	return {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : nameInData
		}, {
			"name" : "repeatId",
			"value" : repeatId
		} ]
	};
}
//
// QUnit
// .test(
// "testInitOneChildRepeat3to3WithDataForOne",
// function(assert) {
// var data = {
// "name" : "groupIdOneTextChildRepeat0to1",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value",
// "repeatId" : "one"
// } ]
// };
//
// this.metadataControllerFactory.factor("groupIdOneTextChildRepeat3to3", data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"one","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[1]),
// '{"type":"setValue","message":{"data":"A Value",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "one") + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[2]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"0","nameInData":"textVariableId"}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[3]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"1","nameInData":"textVariableId"}}');
//
// assert.equal(messages.length, 6);
// });
//
// QUnit
// .test(
// "testInitOneChildRepeat3to3WithDataOCalculateRepeatId",
// function(assert) {
// var data = {
// "name" : "groupIdOneTextChildRepeat0to1",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value",
// "repeatId" : "5"
// }, {
// "name" : "textVariableId",
// "value" : "A Value2",
// "repeatId" : "2"
// } ]
// };
//
// this.metadataControllerFactory.factor("groupIdOneTextChildRepeat3to3", data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"5","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[1]),
// '{"type":"setValue","message":{"data":"A Value",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "5") + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[2]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"2","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[3]),
// '{"type":"setValue","message":{"data":"A Value2",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "2") + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[4]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"6","nameInData":"textVariableId"}}');
//
// assert.equal(messages.length, 7);
// });
//
// QUnit
// .test(
// "testInitOneChildRepeat1toX",
// function(assert) {
// this.metadataControllerFactory.factor("groupIdOneTextChildRepeat1toX",
// undefined);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"0","nameInData":"textVariableId"}}');
//
// assert.equal(messages.length, 3);
// });
//
// QUnit
// .test(
// "testInitOneChildRepeat1toXWithDataForOne",
// function(assert) {
// var data = {
// "name" : "groupIdOneTextChildRepeat0to1",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value",
// "repeatId" : "one"
// } ]
// };
//
// this.metadataControllerFactory.factor("groupIdOneTextChildRepeat1toX", data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"one","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[1]),
// '{"type":"setValue","message":{"data":"A Value",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "one") + '}}');
//
// assert.equal(messages.length, 4);
// });
//
// QUnit
// .test(
// "testInitOneChildRepeat1toXWithDataForTwo",
// function(assert) {
// var data = {
// "name" : "groupIdOneTextChildRepeat0to1",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value",
// "repeatId" : "one"
// }, {
// "name" : "textVariableId",
// "value" : "A Value2",
// "repeatId" : "two"
// } ]
// };
//
// this.metadataControllerFactory.factor("groupIdOneTextChildRepeat1toX", data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"one","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[1]),
// '{"type":"setValue","message":{"data":"A Value",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "one") + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[2]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"two","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[3]),
// '{"type":"setValue","message":{"data":"A Value2",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "two") + '}}');
//
// assert.equal(messages.length, 6);
// });
//
// QUnit
// .test(
// "testInitOneChildRepeat0toXPreviouslyNotRepeating",
// function(assert) {
// var data = {
// "name" : "groupIdOneTextChildRepeat0toXPreviously0to1",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value"
// } ]
// };
//
// this.metadataControllerFactory.factor(
// "groupIdOneTextChildRepeat0toXPreviously0to1", data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"0","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[1]),
// '{"type":"setValue","message":{"data":"A Value",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "0") + '}}');
// });
//
// QUnit
// .test(
// "testInitOneChildRepeat0toXPreviouslyNotRepeatingAddingNewChild",
// function(assert) {
// var data = {
// "name" : "groupIdOneTextChildRepeat0toXPreviously0to1",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value"
// }, {
// "name" : "textVariableId",
// "value" : "A Value2",
// "repeatId" : "two"
// } ]
// };
//
// this.metadataControllerFactory.factor(
// "groupIdOneTextChildRepeat0toXPreviously0to1", data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"0","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[1]),
// '{"type":"setValue","message":{"data":"A Value",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "0") + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[2]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"two","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[3]),
// '{"type":"setValue","message":{"data":"A Value2",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "two") + '}}');
//
// assert.equal(messages.length, 6);
// });
//
// QUnit
// .test(
// "testInitOneChildRepeat1to3PreviouslyNotRepeating",
// function(assert) {
// var data = {
// "name" : "groupIdOneTextChildRepeat0toXPreviously0to1",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value"
// } ]
// };
//
// this.metadataControllerFactory.factor(
// "groupIdOneTextChildRepeat1to3Previously0to1", data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"repeatId":"0","nameInData":"textVariableId"}}');
// assert.deepEqual(JSON.stringify(messages[1]),
// '{"type":"setValue","message":{"data":"A Value",'
// + '"path":'
// + createLinkedPathWithNameInDataAndRepeatIdAsString(
// "textVariableId", "0") + '}}');
// });
//
// QUnit.test("testInitOneChildOneAttribute", function(assert) {
// this.metadataControllerFactory.factor("groupIdOneTextChildOneAttribute", undefined);
// var messages = this.pubSub.getMessages();
// assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"nameInData":"textVariableId"}}');
//
// assert.equal(messages.length, 3);
// });
//
// QUnit.test("testInitOneChildOneAttributeWithDataForOne", function(assert) {
// var data = {
// "name" : "groupIdOneTextChildOneAttribute",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// };
//
// this.metadataControllerFactory.factor("groupIdOneTextChildOneAttribute", data);
// var messages = this.pubSub.getMessages();
// assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":{},"nameInData":"textVariableId"}}');
//
// var path = createLinkedPathWithNameInData("textVariableId");
//
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
// + '"path":' + JSON.stringify(path) + '}}');
//
// assert.equal(messages.length, 4);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to1InGroupOneAttributeInGroup",
// function(assert) {
// this.metadataControllerFactory.factor("groupInGroupOneTextChildOneAttribute",
// undefined);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// +
// '"metadataId":"groupIdOneTextChildOneAttribute","path":{},"nameInData":"groupIdOneTextChildOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue"));
// path.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":' + JSON.stringify(path)
// + ',"nameInData":"textVariableId"}}');
//
// assert.equal(messages.length, 4);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to1InGroupOneAttributeInGroupWithData",
// function(assert) {
// var data = {
// "name" : "groupInGroupOneTextChildOneAttribute",
// "children" : [ {
// "name" : "groupIdOneTextChildOneAttribute",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value2"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// } ]
// };
//
// this.metadataControllerFactory.factor("groupInGroupOneTextChildOneAttribute",
// data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// +
// '"metadataId":"groupIdOneTextChildOneAttribute","path":{},"nameInData":"groupIdOneTextChildOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue"));
// path.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":' + JSON.stringify(path)
// + ',"nameInData":"textVariableId"}}');
//
// var path2 = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
// var attributes2 = createAttributes();
// attributes2.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue"));
// path2.children.push(attributes2);
// path2.children.push(createLinkedPathWithNameInData("textVariableId"));
// assert.deepEqual(JSON.stringify(messages[2]),
// '{"type":"setValue","message":{"data":"A Value2",' + '"path":'
// + JSON.stringify(path2) + '}}');
//
// assert.equal(messages.length, 5);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to1InGroupOneAttributeInGroupWithWrongData",
// function(assert) {
// var data = {
// "name" : "groupInGroupOneTextChildOneAttribute",
// "children" : [ {
// "name" : "groupIdOneTextChildOneAttribute",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value2"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValueNOT"
// }
// } ]
// };
//
// this.metadataControllerFactory.factor("groupInGroupOneTextChildOneAttribute",
// data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// +
// '"metadataId":"groupIdOneTextChildOneAttribute","path":{},"nameInData":"groupIdOneTextChildOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue"));
// path.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":' + JSON.stringify(path)
// + ',"nameInData":"textVariableId"}}');
//
// assert.equal(messages.length, 4);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to1InGroupTwoAttributeInGroup",
// function(assert) {
// this.metadataControllerFactory.factor("groupInGroupOneTextChildTwoAttributes",
// undefined);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// +
// '"metadataId":"groupIdOneTextChildTwoAttributes","path":{},"nameInData":"groupIdOneTextChildTwoAttributes","attributes":{"anAttribute":["aFinalValue"],"anOtherAttribute":["aOtherFinalValue"]}}}');
//
// var path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anOtherAttribute", "aOtherFinalValue", "2"));
// path.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":' + JSON.stringify(path)
// + ',"nameInData":"textVariableId"}}');
//
// assert.equal(messages.length, 4);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to1InGroupTwoAttributeInGroupWithData",
// function(assert) {
// var data = {
// "name" : "groupInGroupOneTextChildTwoAttributes",
// "children" : [ {
// "name" : "groupIdOneTextChildTwoAttributes",
// "children" : [ {
// "name" : "textVariableId",
// "value" : "A Value3"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue",
// "anOtherAttribute" : "aOtherFinalValue"
// }
// } ]
// };
//
// this.metadataControllerFactory.factor("groupInGroupOneTextChildTwoAttributes",
// data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// +
// '"metadataId":"groupIdOneTextChildTwoAttributes","path":{},"nameInData":"groupIdOneTextChildTwoAttributes","attributes":{"anAttribute":["aFinalValue"],"anOtherAttribute":["aOtherFinalValue"]}}}');
//
// var path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anOtherAttribute", "aOtherFinalValue", "2"));
// path.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":' + JSON.stringify(path)
// + ',"nameInData":"textVariableId"}}');
//
// var path2 = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
// var attributes2 = createAttributes();
// attributes2.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// attributes2.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anOtherAttribute", "aOtherFinalValue", "2"));
// path2.children.push(attributes2);
// path2.children.push(createLinkedPathWithNameInData("textVariableId"));
// assert.deepEqual(JSON.stringify(messages[2]),
// '{"type":"setValue","message":{"data":"A Value3",' + '"path":'
// + JSON.stringify(path2) + '}}');
//
// assert.equal(messages.length, 5);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// function(assert) {
// this.metadataControllerFactory
// .factor(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// undefined);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
// +
// ',"path":{},"repeatId":"0","nameInData":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"}}');
//
// assert.equal(messages.length, 3);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to3InGroupOneAttribute"
// + "Repeat0to2InGroupRepeat1to3InGroupWithData",
// function(assert) {
// var data = {
// "name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
// "repeatId" : "one0",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "repeatId" : "one1",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value3",
// "repeatId" : "one2"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// } ]
// } ]
// };
//
// this.metadataControllerFactory
// .factor(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
// +
// ',"path":{},"repeatId":"one0","nameInData":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"}}');
//
// var path =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path.children.push({
// "name" : "repeatId",
// "value" : "one0"
// });
// assert
// .deepEqual(
// JSON.stringify(messages[1]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":'
// + JSON.stringify(path)
// +
// ',"repeatId":"one1","nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path2 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path2.children.push({
// "name" : "repeatId",
// "value" : "one0"
// });
// var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path2.children.push(path22);
// path22.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path22.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path2)
// + ',"repeatId":"one2","nameInData":"textVar"}}');
//
// var path3 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path3.children.push({
// "name" : "repeatId",
// "value" : "one0"
// });
// var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path3.children.push(path32);
// path32.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes32 = createAttributes();
// attributes32.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path32.children.push(attributes32);
//
// var path33 = createLinkedPathWithNameInData("textVar");
// path32.children.push(path33);
// path33.children.push({
// "name" : "repeatId",
// "value" : "one2"
// });
//
// assert.deepEqual(JSON.stringify(messages[3]),
// '{"type":"setValue","message":{"data":"A Value3",' + '"path":'
// + JSON.stringify(path3) + '}}');
//
// assert.equal(messages.length, 6);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to3InGroupOneAttribute"
// + "Repeat0to2InGroupRepeat1to3InGroupWithData2",
// function(assert) {
// var data = {
// "name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
// "repeatId" : "one0",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "repeatId" : "one1",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value3",
// "repeatId" : "one2"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// } ]
// } ]
// };
//
// this.metadataControllerFactory
// .factor(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup","path":{},"repeatId":"one0","nameInData":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"}}');
//
// var path =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path.children.push({
// "name" : "repeatId",
// "value" : "one0"
// });
// assert
// .deepEqual(
// JSON.stringify(messages[1]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":'
// + JSON.stringify(path)
// +
// ',"repeatId":"one1","nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path2 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path2.children.push({
// "name" : "repeatId",
// "value" : "one0"
// });
// var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path2.children.push(path22);
// path22.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path22.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path2)
// + ',"repeatId":"one2","nameInData":"textVar"}}');
//
// var path3 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path3.children.push({
// "name" : "repeatId",
// "value" : "one0"
// });
// var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path3.children.push(path32);
// path32.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes32 = createAttributes();
// attributes32.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path32.children.push(attributes32);
//
// var path33 = createLinkedPathWithNameInData("textVar");
// path32.children.push(path33);
// path33.children.push({
// "name" : "repeatId",
// "value" : "one2"
// });
//
// assert.deepEqual(JSON.stringify(messages[3]),
// '{"type":"setValue","message":{"data":"A Value3",' + '"path":'
// + JSON.stringify(path3) + '}}');
// assert.equal(messages.length, 6);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to3InGroupOneAttribute"
// + "Repeat0to2InGroupRepeat1to3InGroupWithData3",
// function(assert) {
// var data = {
// "name" : "textVarRepeat1to3InGroupOne"
// + "AttributeRepeat0to2InGroupRepeat1to3InGroup",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
// "repeatId" : "one0",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "repeatId" : "one1",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value3",
// "repeatId" : "one2"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// } ]
// }, {
// "name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
// "repeatId" : "one0_2",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "repeatId" : "one1",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value3",
// "repeatId" : "one2"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// } ]
// } ]
// };
//
// this.metadataControllerFactory.factor("textVarRepeat1to3InGroupOne"
// + "AttributeRepeat0to2InGroupRepeat1to3InGroup", data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
// +
// ',"path":{},"repeatId":"one0","nameInData":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"}}');
//
// var path =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path.children.push({
// "name" : "repeatId",
// "value" : "one0"
// });
// assert
// .deepEqual(
// JSON.stringify(messages[1]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":'
// + JSON.stringify(path)
// +
// ',"repeatId":"one1","nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path2 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path2.children.push({
// "name" : "repeatId",
// "value" : "one0"
// });
// var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path2.children.push(path22);
// path22.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path22.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path2)
// + ',"repeatId":"one2","nameInData":"textVar"}}');
//
// var path3 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path3.children.push({
// "name" : "repeatId",
// "value" : "one0"
// });
// var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path3.children.push(path32);
// path32.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes32 = createAttributes();
// attributes32.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path32.children.push(attributes32);
//
// var path33 = createLinkedPathWithNameInData("textVar");
// path32.children.push(path33);
// path33.children.push({
// "name" : "repeatId",
// "value" : "one2"
// });
//
// assert.deepEqual(JSON.stringify(messages[3]),
// '{"type":"setValue","message":{"data":"A Value3",' + '"path":'
// + JSON.stringify(path3) + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[4]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
// +
// ',"path":{},"repeatId":"one0_2","nameInData":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"}}');
//
// var path =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path.children.push({
// "name" : "repeatId",
// "value" : "one0_2"
// });
// assert
// .deepEqual(
// JSON.stringify(messages[5]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":'
// + JSON.stringify(path)
// +
// ',"repeatId":"one1","nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path2 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path2.children.push({
// "name" : "repeatId",
// "value" : "one0_2"
// });
// var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path2.children.push(path22);
// path22.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path22.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[6]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path2)
// + ',"repeatId":"one2","nameInData":"textVar"}}');
//
// var path3 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
// path3.children.push({
// "name" : "repeatId",
// "value" : "one0_2"
// });
// var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path3.children.push(path32);
// path32.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path32.children.push(attributes);
//
// var path33 = createLinkedPathWithNameInData("textVar");
// path32.children.push(path33);
// path33.children.push({
// "name" : "repeatId",
// "value" : "one2"
// });
//
// assert.deepEqual(JSON.stringify(messages[7]),
// '{"type":"setValue","message":{"data":"A Value3",' + '"path":'
// + JSON.stringify(path3) + '}}');
//
// assert.equal(messages.length, 10);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to3InGroupOneAttribute"
// + "Repeat0to2InGroupRepeat1to3InGroupWithData4",
// function(assert) {
// var data = {
// "name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// "children" : []
// };
//
// this.metadataControllerFactory
// .factor(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// data);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
// +
// ',"path":{},"repeatId":"0","nameInData":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"}}');
//
// assert.equal(messages.length, 3);
// });
//
// QUnit.test("testInitTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
// function(assert) {
// this.metadataControllerFactory.factor(
// "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
// undefined);
// var messages = this.pubSub.getMessages();
// assert.equal(messages.length, 2);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to3InGroup"
// + "OneAttributeAndOtherAttributeRepeat0to2InGroupWithData",
// function(assert) {
// var data = {
// "name" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "repeatId" : "one1",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value3",
// "repeatId" : "one2"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// }, {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "repeatId" : "one1",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value33",
// "repeatId" : "one22"
// } ],
// "attributes" : {
// "anOtherAttribute" : "aOtherFinalValue"
// }
// } ]
// };
// this.metadataControllerFactory
// .factor(
// "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
// data);
// var messages = this.pubSub.getMessages();
//
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttribute"'
// +
// ',"path":{},"repeatId":"one1","nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path.children.push(attributes);
//
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path)
// + ',"repeatId":"one2","nameInData":"textVar"}}');
//
// var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path2.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes2 = createAttributes();
// attributes2.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path2.children.push(attributes2);
//
// var path22 = createLinkedPathWithNameInData("textVar");
// path2.children.push(path22);
// path22.children.push({
// "name" : "repeatId",
// "value" : "one2"
// });
// assert.deepEqual(JSON.stringify(messages[2]),
// '{"type":"setValue","message":{"data":"A Value3"' + ',"path":'
// + JSON.stringify(path2) + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[3]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOtherAttribute"'
// +
// ',"path":{},"repeatId":"one1","nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anOtherAttribute":["aOtherFinalValue"]}}}');
//
// var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path3.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes3 = createAttributes();
// attributes3.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anOtherAttribute", "aOtherFinalValue", "1"));
// path3.children.push(attributes3);
//
// assert.deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path3)
// + ',"repeatId":"one22","nameInData":"textVar"}}');
//
// var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// path32.children.push({
// "name" : "repeatId",
// "value" : "one1"
// });
// var attributes32 = createAttributes();
// attributes32.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anOtherAttribute", "aOtherFinalValue", "1"));
// path32.children.push(attributes32);
//
// var path322 = createLinkedPathWithNameInData("textVar");
// path32.children.push(path322);
// path322.children.push({
// "name" : "repeatId",
// "value" : "one22"
// });
// assert.deepEqual(JSON.stringify(messages[5]),
// '{"type":"setValue","message":{"data":"A Value33"' + ',"path":'
// + JSON.stringify(path32) + '}}');
//
// assert.equal(messages.length, 8);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
// function(assert) {
// this.metadataControllerFactory
// .factor(
// "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
// undefined);
// var messages = this.pubSub.getMessages();
//
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttribute"'
// +
// ',"path":{},"nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path.children.push(attributes);
//
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path)
// + ',"repeatId":"0","nameInData":"textVar"}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[2]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOtherAttribute"'
// +
// ',"path":{},"nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anOtherAttribute":["aOtherFinalValue"]}}}');
//
// var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes3 = createAttributes();
// attributes3.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anOtherAttribute", "aOtherFinalValue", "1"));
// path3.children.push(attributes3);
// assert.deepEqual(JSON.stringify(messages[3]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path3)
// + ',"repeatId":"0","nameInData":"textVar"}}');
//
// assert.equal(messages.length, 6);
// });
//
// QUnit
// .test(
// "testInitTextVarRepeat1to3InGroup"
// + "OneAttributeAndOtherAttributeRepeat1to1InGroupWithData",
// function(assert) {
//
// var data = {
// "name" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value3",
// "repeatId" : "one2"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// }, {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value33",
// "repeatId" : "one22"
// } ],
// "attributes" : {
// "anOtherAttribute" : "aOtherFinalValue"
// }
// } ]
// };
// this.metadataControllerFactory
// .factor(
// "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
// data);
// var messages = this.pubSub.getMessages();
//
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttribute"'
// +
// ',"path":{},"nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path.children.push(attributes);
//
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path)
// + ',"repeatId":"one2","nameInData":"textVar"}}');
//
// var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes2 = createAttributes();
// attributes2.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue", "1"));
// path2.children.push(attributes2);
//
// var path22 = createLinkedPathWithNameInData("textVar");
// path2.children.push(path22);
// path22.children.push({
// "name" : "repeatId",
// "value" : "one2"
// });
// assert.deepEqual(JSON.stringify(messages[2]),
// '{"type":"setValue","message":{"data":"A Value3"' + ',"path":'
// + JSON.stringify(path2) + '}}');
//
// assert
// .deepEqual(
// JSON.stringify(messages[3]),
// '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOtherAttribute"'
// +
// ',"path":{},"nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anOtherAttribute":["aOtherFinalValue"]}}}');
//
// var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes3 = createAttributes();
// attributes3.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anOtherAttribute", "aOtherFinalValue", "1"));
// path3.children.push(attributes3);
//
// assert.deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path3)
// + ',"repeatId":"one22","nameInData":"textVar"}}');
//
// var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes32 = createAttributes();
// attributes32.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anOtherAttribute", "aOtherFinalValue", "1"));
// path32.children.push(attributes32);
//
// var path322 = createLinkedPathWithNameInData("textVar");
// path32.children.push(path322);
// path322.children.push({
// "name" : "repeatId",
// "value" : "one22"
// });
// assert.deepEqual(JSON.stringify(messages[5]),
// '{"type":"setValue","message":{"data":"A Value33"' + ',"path":'
// + JSON.stringify(path32) + '}}');
//
// assert.equal(messages.length, 8);
// });
// QUnit
// .test(
// "testInitTextVarRepeat1to1" + "InGroupOneAttributeInGroup",
// function(assert) {
// this.metadataControllerFactory.factor("groupInGroupOneTextChildOneAttribute",
// undefined);
// var messages = this.pubSub.getMessages();
// assert
// .deepEqual(
// JSON.stringify(messages[0]),
// '{"type":"add","message":{'
// +
// '"metadataId":"groupIdOneTextChildOneAttribute","path":{},"nameInData":"groupIdOneTextChildOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anAttribute", "aFinalValue"));
// path.children.push(attributes);
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVariableId","path":' + JSON.stringify(path)
// + ',"nameInData":"textVariableId"}}');
//
// assert.equal(messages.length, 4);
// });
//
// QUnit.test("testInitGroupWithOneRecordLink", function(assert) {
// this.metadataControllerFactory.factor("groupIdOneRecordLinkChild", undefined);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForRecordLink = {
// "type" : "add",
// "message" : {
// "metadataId" : "myLink",
// "path" : {},
// "nameInData" : "myLink"
// }
// };
// assert.stringifyEqual(messages[0], expectedAddForRecordLink);
//
// var expectedAddForLinkedRecordType = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRecordTypeTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myLink"
// } ]
// },
// "nameInData" : "linkedRecordType"
// }
// };
// assert.stringifyEqual(messages[1], expectedAddForLinkedRecordType);
//
// var expectedSetValueForLinkedRecordType = {
// "type" : "setValue",
// "message" : {
// "data" : "metadataTextVariable",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myLink"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "linkedRecordType"
// } ]
//
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[2], expectedSetValueForLinkedRecordType);
//
// var expectedAddForLinkedRecordId = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRecordIdTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myLink"
// } ]
// },
// "nameInData" : "linkedRecordId"
// }
// };
// assert.stringifyEqual(messages[3], expectedAddForLinkedRecordId);
//
// var expectedLinkedData = {
// "type" : "linkedData",
// "message" : {
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myLink"
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[4], expectedLinkedData);
//
// assert.equal(messages.length, 7);
// });
//
// QUnit.test("testInitGroupWithOneRecordLinkWithFinalValue", function(assert) {
// this.metadataControllerFactory.factor("groupIdOneRecordLinkChildWithFinalValue", undefined);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForRecordLink = {
// "type" : "add",
// "message" : {
// "metadataId" : "myFinalValueLink",
// "path" : {},
// "nameInData" : "myFinalValueLink"
// }
// };
// assert.stringifyEqual(messages[0], expectedAddForRecordLink);
//
// var expectedAddForLinkedRecordType = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRecordTypeTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myFinalValueLink"
// } ]
// },
// "nameInData" : "linkedRecordType"
// }
// };
// assert.stringifyEqual(messages[1], expectedAddForLinkedRecordType);
//
// var expectedSetValueForLinkedRecordType = {
// "type" : "setValue",
// "message" : {
// "data" : "metadataTextVariable",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myFinalValueLink"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "linkedRecordType"
// } ]
//
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[2], expectedSetValueForLinkedRecordType);
//
// var expectedAddForLinkedRecordId = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRecordIdTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myFinalValueLink"
// } ]
// },
// "nameInData" : "linkedRecordId"
// }
// };
// assert.stringifyEqual(messages[3], expectedAddForLinkedRecordId);
//
// var expectedSetValueForLinkedRecordId = {
// "type" : "setValue",
// "message" : {
// "data" : "someInstance",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myFinalValueLink"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "linkedRecordId"
// } ]
//
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[4], expectedSetValueForLinkedRecordId);
//
// assert.equal(messages.length, 8);
// });
//
// QUnit.test("testInitGroupWithOneAbstractRecordLink", function(assert) {
// this.metadataControllerFactory.factor("groupIdOneAbstractRecordLinkChild", undefined);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForRecordLink = {
// "type" : "add",
// "message" : {
// "metadataId" : "myAbstractLink",
// "path" : {},
// "nameInData" : "myAbstractLink"
// }
// };
// assert.stringifyEqual(messages[0], expectedAddForRecordLink);
//
// var expectedAddForLinkedRecordType = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRecordTypeTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// } ]
// },
// "nameInData" : "linkedRecordType"
// }
// };
// assert.stringifyEqual(messages[1], expectedAddForLinkedRecordType);
//
// var expectedSetValueForLinkedRecordType = {
// "type" : "setValue",
// "message" : {
// // "data" : "metadata",
// "data" : "",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "linkedRecordType"
// } ]
//
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[2], expectedSetValueForLinkedRecordType);
//
// var expectedAddForLinkedRecordId = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRecordIdTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// } ]
// },
// "nameInData" : "linkedRecordId"
// }
// };
// assert.stringifyEqual(messages[3], expectedAddForLinkedRecordId);
//
// var expectedLinkedData = {
// "type" : "linkedData",
// "message" : {
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[4], expectedLinkedData);
//
// assert.equal(messages.length, 7);
// });
//
// QUnit.test("testInitGroupWithOneAbstractRecordLinkWithData", function(assert) {
// var data = {
// "name" : "groupIdOneRecordLinkChild",
// "children" : [ {
// "name" : "myAbstractLink",
// "children" : [ {
// "name" : "linkedRecordType",
// "value" : "metadataTextVariable"
// }, {
// "name" : "linkedRecordId",
// "value" : "someRecordId"
// } ]
// } ]
// };
// this.metadataControllerFactory.factor("groupIdOneAbstractRecordLinkChild", data);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForRecordLink = {
// "type" : "add",
// "message" : {
// "metadataId" : "myAbstractLink",
// "path" : {},
// "nameInData" : "myAbstractLink"
// }
// };
// assert.stringifyEqual(messages[0], expectedAddForRecordLink);
//
// var expectedAddForLinkedRecordType = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRecordTypeTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// } ]
// },
// "nameInData" : "linkedRecordType"
// }
// };
// assert.stringifyEqual(messages[1], expectedAddForLinkedRecordType);
//
// var expectedSetValueForLinkedRecordType = {
// "type" : "setValue",
// "message" : {
// // "data" : "",
// "data" : "metadataTextVariable",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "linkedRecordType"
// } ]
//
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[2], expectedSetValueForLinkedRecordType);
//
// var expectedAddForLinkedRecordId = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRecordIdTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// } ]
// },
// "nameInData" : "linkedRecordId"
// }
// };
// assert.stringifyEqual(messages[3], expectedAddForLinkedRecordId);
//
// var expectedSetValueForLinkedRecordId = {
// "type" : "setValue",
// "message" : {
// "data" : "someRecordId",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "linkedRecordId"
// } ]
//
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[4], expectedSetValueForLinkedRecordId);
//
// assert.equal(messages.length, 8);
// });
//
// QUnit.test("testInitGroupWithOneAbstractRecordLinkWithEmptyLinkedRecordType", function(assert) {
// var data = {
// "name" : "groupIdOneRecordLinkChild",
// "children" : [ {
// "name" : "myAbstractLink",
// "children" : [ {
// "name" : "linkedRecordType",
// "value" : ""
// }, {
// "name" : "linkedRecordId",
// "value" : "someRecordId"
// } ]
// } ]
// };
// this.metadataControllerFactory.factor("groupIdOneAbstractRecordLinkChild", data);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForRecordLink = {
// "type" : "add",
// "message" : {
// "metadataId" : "myAbstractLink",
// "path" : {},
// "nameInData" : "myAbstractLink"
// }
// };
// assert.stringifyEqual(messages[0], expectedAddForRecordLink);
//
// var expectedAddForLinkedRecordType = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRecordTypeTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// } ]
// },
// "nameInData" : "linkedRecordType"
// }
// };
// assert.stringifyEqual(messages[1], expectedAddForLinkedRecordType);
//
// var expectedSetValueForLinkedRecordType = {
// "type" : "setValue",
// "message" : {
// "data" : "",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myAbstractLink"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "linkedRecordType"
// } ]
//
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[2], expectedSetValueForLinkedRecordType);
// assert.equal(messages.length, 8);
// });
//
// QUnit.test("testInitGroupWithOneRecordLinkWithData", function(assert) {
// var data = {
// "name" : "groupIdOneRecordLinkChild",
// "children" : [ {
// "name" : "myLink",
// "children" : [ {
// "name" : "linkedRecordType",
// "value" : "metadataTextVariable"
// }, {
// "name" : "linkedRecordId",
// "value" : "someRecordId"
// } ]
// } ]
// };
// this.metadataControllerFactory.factor("groupIdOneRecordLinkChild", data);
// var messages = this.pubSub.getMessages();
//
// var expectedSetValueForLinkedRecordType = {
// "type" : "setValue",
// "message" : {
// "data" : "someRecordId",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myLink"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "linkedRecordId"
// } ]
//
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[4], expectedSetValueForLinkedRecordType);
// assert.equal(messages.length, 8);
// });
//
// QUnit.test("testInitGroupWithOneRecordLinkWithPath", function(assert) {
// this.metadataControllerFactory.factor("groupIdOneRecordLinkChildWithPath", undefined);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForLinkedRepeatId = {
// "type" : "add",
// "message" : {
// "metadataId" : "linkedRepeatIdTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myPathLink"
// } ]
// },
// "nameInData" : "linkedRepeatId"
// }
// };
// assert.stringifyEqual(messages[4], expectedAddForLinkedRepeatId);
// assert.equal(messages.length, 8);
// });
//
// QUnit.test("testInitGroupWithOneRecordLinkWithPathWithData", function(assert) {
// var data = {
// "name" : "groupIdOneRecordLinkChildWithPath",
// "children" : [ {
// "name" : "myPathLink",
// "children" : [ {
// "name" : "linkedRecordType",
// "value" : "metadataTextVariable"
// }, {
// "name" : "linkedRecordId",
// "value" : "someRecordId"
// }, {
// "name" : "linkedRepeatId",
// "value" : "someRepeatId1"
// } ]
// } ]
// };
// this.metadataControllerFactory.factor("groupIdOneRecordLinkChildWithPath", data);
// var messages = this.pubSub.getMessages();
//
// var expectedSetValueForLinkedRepeatId = {
// "type" : "setValue",
// "message" : {
// "data" : "someRepeatId1",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "myPathLink"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "linkedRepeatId"
// } ]
//
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[6], expectedSetValueForLinkedRepeatId);
// assert.equal(messages.length, 10);
// });
//
// QUnit.test("testInitGroupWithOneResourceLink", function(assert) {
// this.metadataControllerFactory.factor("groupIdOneResourceLinkChild", undefined);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForResourceLink = {
// "type" : "add",
// "message" : {
// "metadataId" : "masterResLink",
// "path" : {},
// "nameInData" : "master"
// }
// };
// assert.stringifyEqual(messages[0], expectedAddForResourceLink);
//
// var expectedAddForStreamId = {
// "type" : "add",
// "message" : {
// "metadataId" : "streamIdTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// },
// "nameInData" : "streamId"
// }
// };
// assert.stringifyEqual(messages[1], expectedAddForStreamId);
//
// var expectedAddForFilename = {
// "type" : "add",
// "message" : {
// "metadataId" : "filenameTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// },
// "nameInData" : "filename"
// }
// };
// assert.stringifyEqual(messages[2], expectedAddForFilename);
//
// var expectedAddForFilesize = {
// "type" : "add",
// "message" : {
// "metadataId" : "filesizeTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// },
// "nameInData" : "filesize"
// }
// };
// assert.stringifyEqual(messages[3], expectedAddForFilesize);
//
// var expectedAddForMimeType = {
// "type" : "add",
// "message" : {
// "metadataId" : "mimeTypeTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// },
// "nameInData" : "mimeType"
// }
// };
// assert.stringifyEqual(messages[4], expectedAddForMimeType);
//
// var expectedLinkedData = {
// "type" : "linkedResource",
// "message" : {
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[5], expectedLinkedData);
//
// var expectedNewElementsAdded = {
// "type" : "newElementsAdded",
// "message" : {
// "data" : "",
// "path" : {}
// }
// };
// assert.stringifyEqual(messages[6], expectedNewElementsAdded);
//	
// var expectedInitcomplete = {
// "type" : "initComplete",
// "message" : {
// "data" : "",
// "path" : {}
// }
// };
// assert.stringifyEqual(messages[7], expectedInitcomplete);
//
// assert.equal(messages.length, 8);
// });
//
// QUnit
// .test(
// "testInitGroupWithOneResourceLinkWithData",
// function(assert) {
// var data = {
// "name" : "groupIdOneResourceLinkChild",
// "children" : [ {
// "name" : "master",
// "children" : [ {
// "name" : "streamId",
// "value" : "binary:123456789"
// }, {
// "name" : "filename",
// "value" : "adele.png"
// }, {
// "name" : "filesize",
// "value" : "12345"
// }, {
// "name" : "mimeType",
// "value" : "application/png"
// } ],
// "actionLinks" : {
// "read" : {
// "requestMethod" : "GET",
// "rel" : "read",
// "url" : "http://localhost:8080/therest/rest/record/image/image:123456/master",
// "accept" : "application/octet-stream"
// }
// }
// } ]
// };
// this.metadataControllerFactory.factor("groupIdOneResourceLinkChild", data);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForResourceLink = {
// "type" : "add",
// "message" : {
// "metadataId" : "masterResLink",
// "path" : {},
// "nameInData" : "master"
// }
// };
// assert.stringifyEqual(messages[0], expectedAddForResourceLink);
//
// var expectedAddForStreamId = {
// "type" : "add",
// "message" : {
// "metadataId" : "streamIdTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// },
// "nameInData" : "streamId"
// }
// };
// assert.stringifyEqual(messages[1], expectedAddForStreamId);
//
// var expectedSetValueForStreamId = {
// "type" : "setValue",
// "message" : {
// "data" : "binary:123456789",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "streamId"
// } ]
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[2], expectedSetValueForStreamId);
//
// var expectedAddForFilename = {
// "type" : "add",
// "message" : {
// "metadataId" : "filenameTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// },
// "nameInData" : "filename"
// }
// };
// assert.stringifyEqual(messages[3], expectedAddForFilename);
//
// var expectedSetValueForFilename = {
// "type" : "setValue",
// "message" : {
// "data" : "adele.png",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "filename"
// } ]
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[4], expectedSetValueForFilename);
//
// var expectedAddForFilesize = {
// "type" : "add",
// "message" : {
// "metadataId" : "filesizeTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// },
// "nameInData" : "filesize"
// }
// };
// assert.stringifyEqual(messages[5], expectedAddForFilesize);
//
// var expectedSetValueForFilesize = {
// "type" : "setValue",
// "message" : {
// "data" : "12345",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "filesize"
// } ]
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[6], expectedSetValueForFilesize);
//
// var expectedAddForMimeType = {
// "type" : "add",
// "message" : {
// "metadataId" : "mimeTypeTextVar",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// },
// "nameInData" : "mimeType"
// }
// };
// assert.stringifyEqual(messages[7], expectedAddForMimeType);
//
// var expectedSetValueForMimeType = {
// "type" : "setValue",
// "message" : {
// "data" : "application/png",
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "mimeType"
// } ]
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[8], expectedSetValueForMimeType);
//
// var expectedLinkedData = {
// "type" : "linkedResource",
// "message" : {
// "data" : {
// "name" : "master",
// "children" : [ {
// "name" : "streamId",
// "value" : "binary:123456789"
// }, {
// "name" : "filename",
// "value" : "adele.png"
// }, {
// "name" : "filesize",
// "value" : "12345"
// }, {
// "name" : "mimeType",
// "value" : "application/png"
// } ],
// "actionLinks" : {
// "read" : {
// "requestMethod" : "GET",
// "rel" : "read",
// "url" : "http://localhost:8080/therest/rest/record/image/image:123456/master",
// "accept" : "application/octet-stream"
// }
// }
// },
// "path" : {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "master"
// } ]
// }
// }
// };
// assert.stringifyEqual(messages[9], expectedLinkedData);
//
// var expectedNewElementsAdded = {
// "type" : "newElementsAdded",
// "message" : {
// "data" : "",
// "path" : {}
// }
// };
// assert.stringifyEqual(messages[10], expectedNewElementsAdded);
//					
// var expectedInitcomplete = {
// "type" : "initComplete",
// "message" : {
// "data" : "",
// "path" : {}
// }
// };
// assert.stringifyEqual(messages[11], expectedInitcomplete);
//					
// assert.equal(messages.length, 12);
// });
//
// QUnit.test("testInitGroupWithOneCollectionVarNotAsAttributeWithFinalValue", function(assert) {
// this.metadataControllerFactory.factor("groupIdOneCollectionVarChildWithFinalValue", undefined);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForCollectionVar = {
// "type" : "add",
// "message" : {
// "metadataId" : "binaryTypeGenericBinaryCollectionVar",
// "path" : {},
// "nameInData" : "type"
// }
// };
// assert.stringifyEqual(messages[0], expectedAddForCollectionVar);
//
// assert.deepEqual(JSON.stringify(messages[1]),
// '{"type":"setValue","message":{"data":"genericBinary",' + '"path":'
// + createLinkedPathWithNameInDataAsString("type") + '}}');
// });
//
// QUnit.test("testInitGroupWithOneCollectionVarNoFinalValue", function(assert) {
// this.metadataControllerFactory.factor("groupWithOneCollectionVarChildGroup", undefined);
// var messages = this.pubSub.getMessages();
//
// var expectedAddForCollectionVar = {
// "type" : "add",
// "message" : {
// "metadataId" : "userSuppliedIdCollectionVar",
// "path" : {},
// "nameInData" : "userSuppliedId"
// }
// };
// assert.stringifyEqual(messages[0], expectedAddForCollectionVar);
//
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"newElementsAdded","message":{"data":"",'
// + '"path":{}}}');
// assert.deepEqual(JSON.stringify(messages[2]), '{"type":"initComplete","message":{"data":"",'
// + '"path":{}}}');
// });
