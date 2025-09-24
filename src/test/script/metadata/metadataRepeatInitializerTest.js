/*
 * Copyright 2020, 2025 Uppsala University Library
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
QUnit.module("metadata/metadataRepeatInitializerTest.js", hooks => {
	const test = QUnit.test;
	let metadataProvider;
	let pubSub;
	let recordPartPermissionCalculator;

	let dependencies;
	let spec;

	hooks.beforeEach(() => {
		metadataProvider = CORATEST.MetadataProviderStub();
		pubSub = CORATEST.pubSubSpy();
		recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();

		dependencies = {
			metadataProvider: metadataProvider,
			pubSub: pubSub,
			recordTypeProvider: CORATEST.recordTypeProviderSpy(),
			metadataChildAndRepeatInitializerFactory: CORATEST
				.metadataChildAndRepeatInitializerFactorySpy({})
		};
		spec = {
			metadataId: "textVariableId",
			path: [],
			data: undefined,
			repeatId: undefined,
			recordPartPermissionCalculator: recordPartPermissionCalculator
		};
	});

	hooks.afterEach(() => { });

	test("testInit", function(assert) {
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		assert.strictEqual(metadataRepeatInitializer.type, "metadataRepeatInitializer");
	});

	test("testGetSpec", function(assert) {
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		assert.strictEqual(metadataRepeatInitializer.getSpec(), spec);
	});

	test("testGetDependecies", function(assert) {
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		assert.strictEqual(metadataRepeatInitializer.getDependencies(), dependencies);
	});

	test("testTextVariableNoChildInitializerCalled", function(assert) {
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let repeatSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
		assert.strictEqual(repeatSpec, undefined);
	});

	test("testMessagesTextVariableNoData", function(assert) {
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();
		let messages = pubSub.getMessages();
		let expectedMessage0 = {
			"type": "add",
			"message": {
				"metadataId": "textVariableId",
				"path": [],
				"nameInData": "textVariableId",
				repeatId: undefined
			}
		};
		assert.deepEqual(messages[0], expectedMessage0);
		assert.equal(messages.length, 1);
	});

	test("testMessagesTextVariableWithData", function(assert) {
		spec.data = {
			name: "textVariableId",
			value: "A Value"
		};
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();
		let messages = pubSub.getMessages();
		assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":[],"nameInData":"textVariableId"}}');
		let expectedMessage1 = {
			"type": "setValue",
			"message": {
				"type": "setValue",
				dataOrigin: "startup",
				"data": "A Value",
				"path": ["textVariableId"]
			}
		};
		assert.deepEqual(messages[1], expectedMessage1);

		assert.equal(messages.length, 2);
	});

	test("testMessagesNonEmptyParentPathTextVariableWithData", function(assert) {
		spec.data = {
			name: "textVariableId",
			value: "A Value"
		};
		spec.path = ["recordInfo", "type"];

		let expectedSetValuePath = ["recordInfo", "type", "textVariableId"];

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let messages = pubSub.getMessages();
		assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + (JSON.stringify(spec.path)) + ',"nameInData":"textVariableId"}}');
		let expectedMessage1 = {
			"type": "setValue",
			"message": {
				"path": expectedSetValuePath,
				dataOrigin: "startup",
				"data": "A Value",
				"type": "setValue",
			}
		};
		assert.deepEqual(messages[1], expectedMessage1);
		assert.equal(messages.length, 2);
	});

	test("testMessagesTextVariableWithAttributeNoData", function(assert) {
		spec.metadataId = "groupIdOneTextChildOneAttribute";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();
		let messages = pubSub.getMessages();

		assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildOneAttribute","path":[]' +
			',"nameInData":"groupIdOneTextChildOneAttribute"' +
			',"attributes":{"anAttribute":["aFinalValue"]}}}');

		let message1 = {
			type: "addAttribute",
			message: {
				metadataId: "anAttribute",
				path: ["groupIdOneTextChildOneAttribute"],
				nameInData: "anAttribute"
			}
		};
		assert.deepEqual(messages[1], message1);

		let message2 = {
			type: "setValue",
			message: {
				path: ["groupIdOneTextChildOneAttribute", "@anAttribute"],
				dataOrigin: "final",
				data: "aFinalValue"
			}
		};
		assert.deepEqual(messages[2], message2);


		let message3 = {
			type: "disable",
			message: {
				path: ["groupIdOneTextChildOneAttribute", "@anAttribute"]
			}
		};
		assert.deepEqual(messages[3], message3);

		assert.equal(messages.length, 4);
	});

	test("testMessagesTextVariableWithTwoAttributeNoData", function(assert) {
		spec.metadataId = "groupIdOneTextChildTwoAttributes";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();
		let messages = pubSub.getMessages();

		assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildTwoAttributes","path":[]' +
			',"nameInData":"groupIdOneTextChildTwoAttributes"' +
			',"attributes":{"anAttribute":["aFinalValue"],"anOtherAttribute":["aOtherFinalValue"]}}}');

		let addAttribute1 = {
			type: "addAttribute",
			message: {
				metadataId: "anAttribute",
				path: ["groupIdOneTextChildTwoAttributes"],
				nameInData: "anAttribute"
			}
		};
		assert.deepEqual(messages[1], addAttribute1);

		let setValueAttribute1 = {
			type: "setValue",
			message: {
				path: ["groupIdOneTextChildTwoAttributes", "@anAttribute"],
				dataOrigin: "final",
				data: "aFinalValue"
			}
		};
		assert.deepEqual(messages[2], setValueAttribute1);

		let disable1 = {
			type: "disable",
			message: {
				path: ["groupIdOneTextChildTwoAttributes", "@anAttribute"]
			}
		};
		assert.deepEqual(messages[3], disable1);

		let addAttribute2 = {
			type: "addAttribute",
			message: {
				metadataId: "anOtherAttribute",
				path: ["groupIdOneTextChildTwoAttributes"],
				nameInData: "anOtherAttribute"
			}
		};
		assert.deepEqual(messages[4], addAttribute2);

		let setValueAttribute2 = {
			type: "setValue",
			message: {
				path: ["groupIdOneTextChildTwoAttributes", "@anOtherAttribute"],
				dataOrigin: "final",
				data: "aOtherFinalValue"
			}
		};
		assert.deepEqual(messages[5], setValueAttribute2);

		let disable2 = {
			type: "disable",
			message: {
				path: ["groupIdOneTextChildTwoAttributes", "@anOtherAttribute"]
			}
		};
		assert.deepEqual(messages[6], disable2);

		assert.equal(messages.length, 7);
	});

	test("testMessagesTextVariableWithAttributeChoiceNoData", function(assert) {
		spec.metadataId = "groupIdOneTextChildOneAttributeChoice";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();
		let messages = pubSub.getMessages();

		assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildOneAttributeChoice","path":[]' +
			',"nameInData":"groupIdOneTextChildOneAttributeChoice",' +
			'"attributes":{"anAttributeChoice":["aFinalValue","aOtherFinalValue"]}}}');

		let message1 = {
			type: "addAttribute",
			message: {
				metadataId: "anAttributeChoice",
				path: ["groupIdOneTextChildOneAttributeChoice"],
				nameInData: "anAttributeChoice"
			}
		};
		assert.deepEqual(messages[1], message1);

		assert.equal(messages.length, 2);
	});
	test("testMessagesTextVariableWithAttributeChoiceWithData", function(assert) {
		spec.metadataId = "groupIdOneTextChildOneAttributeChoice";
		//possible attribute values aFinalValue, aOtherFinalValue
		spec.data = {
			name: "groupIdOneTextChildOneAttributeChoice",
			attributes: {
				anAttributeChoice: "aStartupValue"
			}
		};

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();
		let messages = pubSub.getMessages();

		assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildOneAttributeChoice","path":[]' +
			',"nameInData":"groupIdOneTextChildOneAttributeChoice",' +
			'"attributes":{"anAttributeChoice":["aFinalValue","aOtherFinalValue"]}}}');

		let message1 = {
			type: "addAttribute",
			message: {
				metadataId: "anAttributeChoice",
				path: ["groupIdOneTextChildOneAttributeChoice"],
				nameInData: "anAttributeChoice"
			}
		};
		assert.deepEqual(messages[1], message1);

		let setValueAttribute2 = {
			type: "setValue",
			message: {
				path: ["groupIdOneTextChildOneAttributeChoice", "@anAttributeChoice"],
				dataOrigin: "startup",
				data: "aStartupValue"
			}
		};
		assert.deepEqual(messages[2], setValueAttribute2);

		assert.equal(messages.length, 3);
	});

	test("testMessagesTextVariableFinalValue", function(assert) {
		spec.metadataId = "textVariableWithFinalValueId";
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();
		let messages = pubSub.getMessages();
		assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableWithFinalValueId","path":[],"nameInData":"textVariableWithFinalValueId"}}');
		let expectedMessage1 = {
			"type": "setValue",
			"message": {
				"type": "setValue",
				dataOrigin: "final",
				"data": "someFinalValue",
				"path": ["textVariableWithFinalValueId"]
			}
		};
		assert.deepEqual(messages[1], expectedMessage1);
		assert.deepEqual(JSON.stringify(messages[2]), '{"type":"disable","message":{"type":"disable",'
			+ '"path":["textVariableWithFinalValueId"]}}');

		assert.equal(messages.length, 3);
	});

	test("testMessagesTextVariableWithWrongFinalValue", function(assert) {
		spec.metadataId = "textVariableWithFinalValueId";
		spec.data = {
			name: "textVariableWithFinalValueId",
			value: "NOTAFinalValue"
		};
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();
		let messages = pubSub.getMessages();
		assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableWithFinalValueId","path":[],"nameInData":"textVariableWithFinalValueId"}}');
		let expectedMessage1 = {
			"type": "setValue",
			"message": {
				"type": "setValue",
				dataOrigin: "final",
				"data": "someFinalValue",
				"path": ["textVariableWithFinalValueId"]
			}
		};
		assert.deepEqual(messages[1], expectedMessage1);
		assert.deepEqual(JSON.stringify(messages[2]), '{"type":"disable","message":{"type":"disable",'
			+ '"path":["textVariableWithFinalValueId"]}}');

		assert.equal(messages.length, 3);
	});

	CORATEST.createRefForRepeatIntitalizer = function(linkedRecordType, linkedRecordId,
		repeatMin, repeatMax) {
		return {
			name: "childReference",
			repeatId: "1",
			children: [{
				name: "ref",
				children: [{
					name: "linkedRecordType",
					value: linkedRecordType
				}, {
					name: "linkedRecordId",
					value: linkedRecordId
				}]
			}, {
				name: "repeatMin",
				value: repeatMin
			}, {
				name: "repeatMax",
				value: repeatMax
			}]
		}
	};

	let expectedChildReferenceTextVariableId = CORATEST.createRefForRepeatIntitalizer(
		"metadataTextVariable", "textVariableId", "1", "1");

	let expectedChildReferenceTextVariableId2 = CORATEST.createRefForRepeatIntitalizer(
		"metadataTextVariable", "textVariableId2", "1", "1");


	test("testMessagesGroup", function(assert) {
		spec.metadataId = "groupIdOneTextChild";
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();
		let messages = pubSub.getMessages();
		assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChild","path":[],"nameInData":"groupIdOneTextChild"}}');
		assert.equal(messages.length, 1);
	});

	test("testGroupOneTextChildWithNODataChildAndRepeatInitializerCalledCorrectly", function(
		assert) {
		spec.metadataId = "groupIdOneTextChild";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let repeatSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);

		assert.stringifyEqual(repeatSpec.childReference, expectedChildReferenceTextVariableId);
		assert.stringifyEqual(repeatSpec.data, undefined);
		assert.stringifyEqual(repeatSpec.path, ["groupIdOneTextChild"]);

		let factoredChild = dependencies.metadataChildAndRepeatInitializerFactory
			.getFactoredChildIntitializers(0);
		assert.ok(factoredChild.getInitializeTopLevelCalled());
	});

	test("testGroupOneTextChildWithData", function(assert) {
		spec.metadataId = "groupIdOneTextChild";
		spec.data = {
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "A Value"
			}]
		};
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let repeatSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
		assert.stringifyEqual(repeatSpec.childReference, expectedChildReferenceTextVariableId);
		assert.stringifyEqual(repeatSpec.data, spec.data);
		assert.stringifyEqual(repeatSpec.path, ["groupIdOneTextChild"]);
		assert.stringifyEqual(repeatSpec.recordPartPermissionCalculator, recordPartPermissionCalculator);

		let factoredChild = dependencies.metadataChildAndRepeatInitializerFactory
			.getFactoredChildIntitializers(0);
		assert.ok(factoredChild.getInitializeTopLevelCalled());
	});

	test("testGroupTwoTextChildrenWithNODataChildAndRepeatInitializerCalledCorrectly", function(
		assert) {
		spec.metadataId = "groupIdTwoTextChild";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let repeatSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);

		assert.stringifyEqual(repeatSpec.childReference, expectedChildReferenceTextVariableId);
		assert.stringifyEqual(repeatSpec.data, undefined);
		assert.stringifyEqual(repeatSpec.path, ["groupIdTwoTextChild"]);
		assert.stringifyEqual(repeatSpec.recordPartPermissionCalculator, recordPartPermissionCalculator);


		let factoredChild = dependencies.metadataChildAndRepeatInitializerFactory
			.getFactoredChildIntitializers(0);
		assert.ok(factoredChild.getInitializeTopLevelCalled());

		let repeatSpec2 = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(1);

		assert.stringifyEqual(repeatSpec2.childReference, expectedChildReferenceTextVariableId2);
		assert.stringifyEqual(repeatSpec2.data, undefined);
		assert.stringifyEqual(repeatSpec2.path, ["groupIdTwoTextChild"]);

		let factoredChild2 = dependencies.metadataChildAndRepeatInitializerFactory
			.getFactoredChildIntitializers(1);
		assert.ok(factoredChild2.getInitializeTopLevelCalled());
	});

	test("testRecordLinkMessage", function(assert) {
		spec.metadataId = "myLink";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let messages = pubSub.getMessages();

		let expectedAddForRecordLink = {
			type: "add",
			message: {
				metadataId: "myLink",
				path: [],
				nameInData: "myLink"
			}
		};
		assert.stringifyEqual(messages[0], expectedAddForRecordLink);

		let expectedAddForLinkedRecordType = {
			type: "linkedData",
			message: {
				path: ["myLink"],
				dataOrigin: "startup",
				data: undefined
			}
		};
		assert.deepEqual(messages[1], expectedAddForLinkedRecordType);
		assert.equal(messages.length, 2);
	});

	test("testRecordLinkCorrectCallToChildAndRepeatInitalizerNoDataNoRepeatId", function(assert) {
		spec.metadataId = "myLink";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let linkedRecordTypeSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
		let expectedRecordTypeReference = CORATEST.createRefForRepeatIntitalizer(
			"metadataTextVariable", "linkedRecordTypeTextVar", "1", "1");

		assert.stringifyEqual(linkedRecordTypeSpec.childReference, expectedRecordTypeReference);
		assert.stringifyEqual(linkedRecordTypeSpec.data, {
			name: "myLink",
			children: [{ name: "linkedRecordType", value: "metadataTextVariable" }]
		});
		assert.stringifyEqual(linkedRecordTypeSpec.path, ["myLink"]);

		let linkedRecordIdSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(1);
		let expectedRecordIdReference = CORATEST.createRefForRepeatIntitalizer(
			"metadataTextVariable", "linkedRecordIdTextVar", "1", "1");
		assert.stringifyEqual(linkedRecordIdSpec.childReference, expectedRecordIdReference);
		assert.stringifyEqual(linkedRecordIdSpec.data, spec.data);
		assert.stringifyEqual(linkedRecordIdSpec.path, ["myLink"]);

	});

	test("testRecordLinkWithMessagesNonEmptyPathInSpec", function(assert) {
		spec.path = ["recordInfo", "type"];
		spec.metadataId = "myLink";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let messages = pubSub.getMessages();

		let expectedAddForRecordLink = {
			type: "add",
			message: {
				metadataId: "myLink",
				path: ["recordInfo", "type"],
				nameInData: "myLink"
			}
		};
		assert.stringifyEqual(messages[0], expectedAddForRecordLink);
	});

	test("testRecordLinkWithPathMessages", function(assert) {
		spec.metadataId = "myPathLink";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let messages = pubSub.getMessages();

		let expectedAddForRecordLink = {
			type: "add",
			message: {
				metadataId: "myPathLink",
				path: [],
				nameInData: "myPathLink"
			}
		};
		assert.stringifyEqual(messages[0], expectedAddForRecordLink);

		let expectedAddForLinkedData =
		{
			type: "linkedData",
			message: {
				path: ["myPathLink"],
				dataOrigin: "startup",
				data: undefined
			}
		};

		assert.deepEqual(messages[1], expectedAddForLinkedData);
		assert.stringifyEqual(messages[2], undefined);
	});

	test("testRecordLinkMessageCorrectCallToChildAndRepeatInitalizerNoDataWithLinkedPath", function(assert) {
		spec.metadataId = "myPathLink";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let linkedRecordTypeSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
		let expectedRecordTypeReference = CORATEST.createRefForRepeatIntitalizer(
			"metadataTextVariable", "linkedRecordTypeTextVar", "1", "1");

		assert.stringifyEqual(linkedRecordTypeSpec.childReference, expectedRecordTypeReference);
		assert.stringifyEqual(linkedRecordTypeSpec.data, {
			name: "myPathLink",
			children: [{
				name: "linkedRecordType",
				value: "metadataTextVariable"
			}]
		});
		assert.stringifyEqual(linkedRecordTypeSpec.path, ["myPathLink"]);


		let linkedRecordIdSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(1);
		let expectedRecordIdReference = CORATEST.createRefForRepeatIntitalizer(
			"metadataTextVariable", "linkedRecordIdTextVar", "1", "1");
		assert.stringifyEqual(linkedRecordIdSpec.childReference, expectedRecordIdReference);
		assert.stringifyEqual(linkedRecordIdSpec.data, spec.data);
		assert.stringifyEqual(linkedRecordIdSpec.path, ["myPathLink"]);


		let linkedRepeatTypeSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(2);
		let expectedRecordRepeatIdReference = CORATEST.createRefForRepeatIntitalizer(
			"metadataTextVariable", "linkedRepeatIdTextVar", "1", "1");
		assert.stringifyEqual(linkedRepeatTypeSpec.childReference, expectedRecordRepeatIdReference);
		assert.stringifyEqual(linkedRepeatTypeSpec.data, spec.data);
		assert.stringifyEqual(linkedRepeatTypeSpec.path, ["myPathLink"]);

		assert.stringifyEqual(dependencies.metadataChildAndRepeatInitializerFactory.getFactoredChildIntitializers(3), undefined);
	});

	test("testRecordLinkCorrectCallToChildAndRepeatInitalizerNoDataFinalValue", function(assert) {
		spec.metadataId = "myFinalValueLink";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let linkedRecordTypeSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
		let expectedRecordTypeReference = CORATEST.createRefForRepeatIntitalizer(
			"metadataTextVariable", "linkedRecordTypeTextVar", "1", "1");

		assert.stringifyEqual(linkedRecordTypeSpec.childReference, expectedRecordTypeReference);
		assert.stringifyEqual(linkedRecordTypeSpec.data, {
			name: "myFinalValueLink",
			children: [{ name: "linkedRecordType", value: "metadataTextVariable" }]
		});
		assert.stringifyEqual(linkedRecordTypeSpec.path, ["myFinalValueLink"]);
		let linkedRecordIdSpec = dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(1);
		let expectedRecordIdReference = CORATEST.createRefForRepeatIntitalizer(
			"metadataTextVariable", "linkedRecordIdTextVar", "1", "1");
		assert.stringifyEqual(linkedRecordIdSpec.childReference, expectedRecordIdReference);
		assert.stringifyEqual(linkedRecordIdSpec.data, {
			name: "myFinalValueLink",
			children: [{
				name: "linkedRecordId",
				value: "someInstance"
			}]
		});
		assert.stringifyEqual(linkedRecordIdSpec.path, ["myFinalValueLink"]);

	});

	test("testResourceLinkMessage", function(assert) {
		spec.metadataId = "masterResLink";
		spec.data = {
			children: [
				{
					name: "linkedRecordType",
					value: "binary"
				},
				{
					name: "linkedRecordId",
					value: "binary:29475728554942"
				},
				{
					name: "mimeType",
					value: "image/jpeg"
				}
			],
			actionLinks: {
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://localhost:38080/systemone/rest/record/binary/binary:1899959244835025/large",
					accept: "image/jpeg"
				}
			},
			name: "large",
		};
		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 2);

		let expectedAddForResourceLink = {
			type: "add",
			message: {
				metadataId: "masterResLink",
				path: [],
				nameInData: "master"
			}
		};
		assert.stringifyEqual(messages[0], expectedAddForResourceLink);

		let expectedLinkedResourceMessage = {
			type: "setValue",
			message: {
				path: ["masterResLink"],
				dataOrigin: "startup",
				data: spec.data,
				type: "setValue",
				special: "resourceLink"
			}
		};
		assert.deepEqual(messages[1], expectedLinkedResourceMessage);


	});

	test("testRecordPartReadPermissionsWhenPermissionExists", function(assert) {
		spec.metadataId = "groupIdOneTextChild";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let recordPartPermissionCalculatorSpy = spec.recordPartPermissionCalculator;
		let callsToHasFulfilledReadPermissionsForRecordPart = recordPartPermissionCalculatorSpy.getReadRequestedIdsArray();
		assert.equal(callsToHasFulfilledReadPermissionsForRecordPart.length, 1);
		assert.equal(callsToHasFulfilledReadPermissionsForRecordPart[0], "metadataTextVariable_textVariableId");


		let factoredChild = dependencies.metadataChildAndRepeatInitializerFactory
			.getFactoredChildIntitializers(0);
		assert.ok(factoredChild.getInitializeTopLevelCalled());
	});

	test("testRecordPartReadPermissionsWhenNOPermissionExists", function(assert) {
		spec.metadataId = "groupIdOneTextChild";
		let recordPartPermissionCalculatorSpy = spec.recordPartPermissionCalculator;
		recordPartPermissionCalculatorSpy.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let callsToHasFulfilledReadPermissionsForRecordPart = recordPartPermissionCalculatorSpy.getReadRequestedIdsArray();
		assert.equal(callsToHasFulfilledReadPermissionsForRecordPart.length, 1);
		assert.equal(callsToHasFulfilledReadPermissionsForRecordPart[0], "metadataTextVariable_textVariableId");


		let factoredChild = dependencies.metadataChildAndRepeatInitializerFactory
			.getFactoredChildIntitializers(0);
		assert.equal(factoredChild, undefined);
	});

	test("testRecordPartWritePermissionsWhenPermissionExists", function(assert) {
		spec.metadataId = "groupIdOneTextChild";

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let recordPartPermissionCalculatorSpy = spec.recordPartPermissionCalculator;
		let callsToHasFulfilledWritePermissionsForRecordPart = recordPartPermissionCalculatorSpy.getWriteRequestedIdsArray();
		assert.equal(callsToHasFulfilledWritePermissionsForRecordPart.length, 1);
		assert.equal(callsToHasFulfilledWritePermissionsForRecordPart[0], "metadataTextVariable_textVariableId");


		let factoredChild = dependencies.metadataChildAndRepeatInitializerFactory
			.getFactoredChildIntitializers(0);
		assert.ok(factoredChild.getInitializeTopLevelCalled());
		assert.strictEqual(factoredChild.getHasWritePermission(), true);
	});

	test("testRecordPartWritePermissionsWhenPermissionNOExists", function(assert) {
		spec.metadataId = "groupIdOneTextChild";
		let recordPartPermissionCalculatorSpy = spec.recordPartPermissionCalculator;
		recordPartPermissionCalculatorSpy.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");

		let metadataRepeatInitializer = CORA.metadataRepeatInitializer(dependencies, spec);
		metadataRepeatInitializer.initialize();

		let factoredChild = dependencies.metadataChildAndRepeatInitializerFactory
			.getFactoredChildIntitializers(0);
		assert.strictEqual(factoredChild.getHasWritePermission(), false);
	});
});
