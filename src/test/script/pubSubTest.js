/*
 * Copyright 2016 Uppsala University Library
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

QUnit.module("pubSubTest.js", {
	beforeEach : function() {
		this.pubSub = CORA.pubSub();
		this.messages = [];
		this.toCall = function(data, msg) {
			this.messages.push({
				"data" : data,
				"message" : msg
			});
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.pubSub.type , "pubSub");
});

QUnit.test("testSubscribe", function(assert) {
	var type = "add";
	var path = [];
	var functionToCall = function() {
	};
	var context = this;
	var subscribeId = this.pubSub.subscribe(type, path, context, functionToCall);
	assert.ok(subscribeId !== undefined);
	assert.ok(this.pubSub !== undefined);
});
QUnit.test("testPublish", function(assert) {
	var type = "add";
	var path = [];
	var data = {
		"metadataId" : "someId",
		"path" : path,
		"repeatId" : "someRepeatId"
	};
	this.pubSub.publish(type, data);
	assert.ok(this.pubSub !== undefined);
});
QUnit.test("testProblemWhenCallingFunctionToCall", function(assert) {
	var type = "add";
	var path = [];
	var functionToCall = function() {
		// generate error
		x + y === z;
	};
	var context = this;
	this.pubSub.subscribe(type, path, context, functionToCall);
	assert.ok(this.pubSub !== undefined);

	var data = {
		"metadataId" : "someId",
		"path" : path,
		"repeatId" : "someRepeatId"
	};
	assert.throws(function() {
		this.pubSub.publish(type, data);
	}, "Error");
});

QUnit.test("testMore", function(assert) {
	var type = "add";
	var path = [];
	var context = this;
	var functionToCall = this.toCall;
	this.pubSub.subscribe(type, path, context, functionToCall);

	var data = {
		"metadataId" : "someId",
		"path" : path,
		"repeatId" : "someRepeatId"
	};
	this.pubSub.publish(type, data);
	assert.ok(this.messages.length === 1);
	assert.deepEqual(this.messages[0].data, data);
	assert.deepEqual(this.messages[0].message, "root/add");
});

QUnit.test("testUnsubscribe", function(assert) {
	var type = "add";
	var path = [];
	var context = this;
	var functionToCall = this.toCall;
	var subscribeId = this.pubSub.subscribe(type, path, context, functionToCall);

	var data = {
		"metadataId" : "someId",
		"path" : path,
		"repeatId" : "someRepeatId"
	};
	this.pubSub.publish(type, data);
	this.pubSub.unsubscribe(subscribeId);
	this.pubSub.publish(type, data);
	assert.strictEqual(this.messages.length, 1);
	assert.deepEqual(this.messages[0].data, data);
	assert.deepEqual(this.messages[0].message, "root/add");
});

QUnit.test("testUnsubscribePathBelow", function(assert) {
	var type = "add";
	var path = ["textVarRepeat1to3InGroupOneAttribute.3", "textVar.5"];
	var removePath = ["textVarRepeat1to3InGroupOneAttribute.3"];
	var context = this;
	var functionToCall = this.toCall;
	this.pubSub.subscribe(type, path, context, functionToCall);

	var data = {
		"metadataId" : "someId",
		"path" : path,
		"repeatId" : "someRepeatId"
	};
	this.pubSub.publish(type, data);
	this.pubSub.unsubscribePathBelow(removePath);
	this.pubSub.publish(type, data);
	assert.strictEqual(this.messages.length, 1);
});

QUnit.test("testConvertPathNameInData", function(assert) {
	var path = ["someNameInData"];
	var convertedPath = this.pubSub.convertPathToMsg(path);
	assert.deepEqual(convertedPath, "root/someNameInData/");
});


QUnit.test("testConvertPathNameInDataAndRepeatId", function(assert) {
	var path = ["someNameInData.one"];
	var convertedPath = this.pubSub.convertPathToMsg(path);
	assert.deepEqual(convertedPath, "root/someNameInData.one/");
});


QUnit.test("testConvertPathNameInDataAndAttributesAndRepeatIdTwoLevels", function(assert) {
	var path = ["someNameInData.1", "someNameInData2.2"];

	var convertedPath = this.pubSub.convertPathToMsg(path);
	assert.deepEqual(convertedPath, "root/"
			+ "someNameInData.1/"
			+ "someNameInData2.2/");
});