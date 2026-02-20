/*
 * Copyright 2016, 2025 Uppsala University Library
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

QUnit.module("pubSubTest.js", hooks => {
	const test = QUnit.test;
	let pubSub;
	let messages;
	let toCall;

	hooks.beforeEach(() => {
		pubSub = CORA.pubSub();
		messages = [];
		toCall = function(data, msg) {
			messages.push({
				data: data,
				message: msg
			});
		};
	});

	hooks.afterEach(() => { });


	test("testInit", function(assert) {
		assert.strictEqual(pubSub.type, "pubSub");
	});

	test("testSubscribe", function(assert) {
		let type = "add";
		let path = [];
		let functionToCall = function() { };
		let context = this;

		let subscribeId = pubSub.subscribe(type, path, context, functionToCall);

		assert.deepEqual(subscribeId, [1]);
	});

	test("testPublish", function(assert) {
		let type = "add";
		let path = [];
		let data = {
			metadataId: "someId",
			path: path,
			repeatId: "someRepeatId"
		};

		pubSub.publish(type, data);

		assert.ok(pubSub !== undefined);
	});

	test("testProblemWhenCallingFunctionToCall", function(assert) {
		let type = "add";
		let path = [];
		let functionToCall = function() {
			throw new Error("An error");
		};
		let context = this;

		pubSub.subscribe(type, path, context, functionToCall);

		let data = {
			metadataId: "someId",
			path: path,
			repeatId: "someRepeatId"
		};

		assert.throws(function() {
			pubSub.publish(type, data);
		}, "Error");
	});

	test("testMore", function(assert) {
		let type = "add";
		let path = [];
		let context = this;
		let functionToCall = toCall;
		pubSub.subscribe(type, path, context, functionToCall);

		let data = {
			metadataId: "someId",
			path: path,
			repeatId: "someRepeatId"
		};

		pubSub.publish(type, data);

		assert.strictEqual(messages.length, 1);
		let expectedMessage0 = {
			message: "root/add",
			data: data
		};
		assert.deepEqual(messages[0], expectedMessage0);
	});

	test("testUnsubscribe", function(assert) {
		let type = "add";
		let path = [];
		let context = this;
		let subscribeId = pubSub.subscribe(type, path, context, toCall);

		let data = {
			metadataId: "someId",
			path: path,
			repeatId: "someRepeatId"
		};

		pubSub.publish(type, data);
		pubSub.unsubscribe(subscribeId);
		pubSub.publish(type, data);

		assert.strictEqual(messages.length, 1);
		let expectedMessage0 = {
			message: "root/add",
			data: data
		};
		assert.deepEqual(messages[0], expectedMessage0);
	});

	test("testSubscribeOnPathWithStar", function(assert) {
		let type = "add";
		let path = ["one", "two","three"];
		let context = this;
		pubSub.subscribe("*", ["one"], context, toCall);

		let data = {
			path: path,
			metadataId: "someId",
			repeatId: "someRepeatId"
		};
		pubSub.publish(type, data);

		data.path = ["one"];
		pubSub.publish("setValue", data);

		assert.strictEqual(messages.length, 2);
		let expectedMessage0 = {
			message: "root/one/two/three/add",
			data: data
		};
		assert.deepEqual(messages[0], expectedMessage0);
		let expectedMessage1 = {
			message: "root/one/setValue",
			data: data
		};
		assert.deepEqual(messages[1], expectedMessage1);
	});

	test("testUnsubscribePathBelow", function(assert) {
		let type = "add";
		let path = ["textVarRepeat1to3InGroupOneAttribute.3", "textVar.5"];
		let removePath = ["textVarRepeat1to3InGroupOneAttribute.3"];
		let context = this;
		pubSub.subscribe(type, path, context, toCall);

		let data = {
			metadataId: "someId",
			path: path,
			repeatId: "someRepeatId"
		};
		pubSub.publish(type, data);
		pubSub.unsubscribePathBelow(removePath);
		pubSub.publish(type, data);

		assert.strictEqual(messages.length, 1);
		let expectedMessage0 = {
			message: "root/textVarRepeat1to3InGroupOneAttribute.3/textVar.5/add",
			data: data
		};
		assert.deepEqual(messages[0], expectedMessage0);
	});

	test("testConvertPathNameInData", function(assert) {
		let path = ["someNameInData"];

		let convertedPath = pubSub.convertPathToMsg(path);

		assert.deepEqual(convertedPath, "root/someNameInData/");
	});


	test("testConvertPathNameInDataAndRepeatId", function(assert) {
		let path = ["someNameInData.one"];

		let convertedPath = pubSub.convertPathToMsg(path);

		assert.deepEqual(convertedPath, "root/someNameInData.one/");
	});


	test("testConvertPathNameInDataAndAttributesAndRepeatIdTwoLevels", function(assert) {
		let path = ["someNameInData.1", "someNameInData2.2"];

		let convertedPath = pubSub.convertPathToMsg(path);
		assert.deepEqual(convertedPath, "root/"
			+ "someNameInData.1/"
			+ "someNameInData2.2/");
	});

});