/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2016, 2017, 2018, 2019, 2020, 2025 Uppsala University Library
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
QUnit.module("metadata/metadataControllerTest.js", hooks => {
	const test = QUnit.test;
	let metadataProvider;
	let metadataChildAndRepeatInitializerFactory;
	let metadataChildInitializerFactory;
	let pubSub;
	let recordPartPermissionCalculator;

	let dependencies;
	let spec;

	hooks.beforeEach(() => {
		metadataProvider = CORATEST.MetadataProviderStub();
		metadataChildAndRepeatInitializerFactory = CORATEST.metadataChildAndRepeatInitializerFactorySpy({});
		metadataChildInitializerFactory = CORATEST.standardFactorySpy("metadataChildInitializerSpy");
		pubSub = CORATEST.pubSubSpy();
		recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();

		dependencies = {
			recordTypeProvider: CORATEST.recordTypeProviderSpy(),
			metadataProvider: metadataProvider,
			pubSub: pubSub,
			metadataChildInitializerFactory: metadataChildInitializerFactory,
			metadataChildAndRepeatInitializerFactory: metadataChildAndRepeatInitializerFactory
		};
		spec = {
			metadataId: "groupIdOneTextChild",
			data: { "someData": "data" },
			metadataProvider: metadataProvider,
			pubSub: pubSub,
			recordPartPermissionCalculator: recordPartPermissionCalculator
		};
	});

	hooks.afterEach(() => { });


	test("testInit", function(assert) {
		let metadataController = CORA.metadataController(dependencies, spec);
		assert.strictEqual(metadataController.type, "metadataController");
	});

	test("testGetSpec", function(assert) {
		let metadataController = CORA.metadataController(dependencies, spec);
		assert.strictEqual(metadataController.getSpec(), spec);
	});

	test("testGetDependencies", function(assert) {
		let metadataController = CORA.metadataController(dependencies, spec);
		assert.strictEqual(metadataController.getDependencies(), dependencies);
	});


	test("testCorrectSpecSentToChildIntitilizerFactor", function(assert) {
		let metadataController = CORA.metadataController(dependencies, spec);
		assert.ok(metadataController !== undefined);
		let spec2 = metadataChildAndRepeatInitializerFactory.getChildSpec(0);

		let topGroup = CORA.coraData(metadataProvider.getMetadataById("groupIdOneTextChild"));
		let childReferences = topGroup.getFirstChildByNameInData("childReferences");
		let childReference = childReferences.children[0];
		assert.stringifyEqual(spec2.childReference, childReference);
		assert.deepEqual(spec2.recordPartPermissionCalculator, spec2.recordPartPermissionCalculator);

		assert.deepEqual(spec2.path, []);
		assert.deepEqual(spec2.data, spec2.data);
	});

	test("testChildIntitilizerIsCalled", function(assert) {
		let metadataController = CORA.metadataController(dependencies, spec);
		assert.ok(metadataController !== undefined);
		let factored = metadataChildAndRepeatInitializerFactory.getFactoredChildIntitializers(0);

		assert.strictEqual(factored.getInitializeTopLevelCalled(), true);
		assert.strictEqual(factored.getHasWritePermission(), true);
	});

	test("testCorrectSpecSentToChildIntitilizerFactorWhenTwoChildren", function(assert) {
		spec.metadataId = "groupIdTwoTextChild";

		let metadataController = CORA.metadataController(dependencies, spec);
		assert.ok(metadataController !== undefined);
		let spec2 = metadataChildAndRepeatInitializerFactory.getChildSpec(0);

		let topGroup = CORA.coraData(metadataProvider.getMetadataById("groupIdTwoTextChild"));
		let childReferences = topGroup.getFirstChildByNameInData("childReferences");
		let childReference = childReferences.children[0];
		assert.stringifyEqual(spec2.childReference, childReference);

		assert.deepEqual(spec2.path, []);
		assert.deepEqual(spec2.data, spec2.data);

		let spec3 = metadataChildAndRepeatInitializerFactory.getChildSpec(1);

		let childReference2 = childReferences.children[1];
		assert.stringifyEqual(spec3.childReference, childReference2);

		assert.deepEqual(spec3.path, []);
		assert.deepEqual(spec3.data, spec3.data);
	});

	test("testPubSubMessages", function(assert) {
		CORA.metadataController(dependencies, spec);

		let messages = pubSub.getMessages();

		assert.equal(messages.length, 2);
		assert.deepEqual(JSON.stringify(messages[0]),
			'{"type":"newElementsAdded","message":{"data":"","path":[]}}');
		assert.deepEqual(JSON.stringify(messages[1]),
			'{"type":"initComplete","message":{"data":"","path":[]}}');
	});

	test("testRecordPartPermissionCalculatorCallsCorrectly", function(assert) {
		spec.metadataId = "groupIdTwoTextChild";

		CORA.metadataController(dependencies, spec);

		let recordPartPermissionCalculatorSpy = spec.recordPartPermissionCalculator;
		let callsToHasFulfilledReadPermissionsForRecordPart = recordPartPermissionCalculatorSpy.getReadRequestedIdsArray();
		assert.equal(callsToHasFulfilledReadPermissionsForRecordPart.length, 2);
		assert.equal(callsToHasFulfilledReadPermissionsForRecordPart[0], "metadataTextVariable_textVariableId");
		assert.equal(callsToHasFulfilledReadPermissionsForRecordPart[1], "metadataTextVariable_textVariableId2");

	});

	test("testChildIntializerIsFactoredCorrectlyWhenPermissionMissingForOneChild", function(assert) {
		spec.metadataId = "groupIdTwoTextChild";
		let recordPartPermissionCalculatorSpy = spec.recordPartPermissionCalculator;
		recordPartPermissionCalculatorSpy.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");

		CORA.metadataController(dependencies, spec);

		let topGroup = CORA.coraData(metadataProvider.getMetadataById("groupIdTwoTextChild"));
		let childReferences = topGroup.getFirstChildByNameInData("childReferences");

		let spec2 = metadataChildAndRepeatInitializerFactory.getChildSpec(0);
		let childReference2 = childReferences.children[1];
		assert.stringifyEqual(spec2.childReference, childReference2);

		assert.deepEqual(spec2.path, []);
		assert.deepEqual(spec2.data, spec2.data);

		let spec3 = metadataChildAndRepeatInitializerFactory.getChildSpec(1);
		assert.strictEqual(spec3, undefined);
	});

	test("testHasPermissionIsFalseWhenChildIsMissingWritePermission", function(assert) {
		let recordPartPermissionCalculatorSpy = spec.recordPartPermissionCalculator;
		recordPartPermissionCalculatorSpy.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");

		let metadataController = CORA.metadataController(dependencies, spec);
		assert.ok(metadataController !== undefined);
		let factored = metadataChildAndRepeatInitializerFactory.getFactoredChildIntitializers(0);

		assert.strictEqual(factored.getInitializeTopLevelCalled(), true);
		assert.strictEqual(factored.getHasWritePermission(), false);


	});

	test("testAddAttributes", function(assert) {
		spec.metadataId = "groupIdOneTextChildTwoAttributes";

		CORA.metadataController(dependencies, spec);

		let messages = pubSub.getMessages();

		assert.deepEqual(messages[0], {
			type: "addAttribute", message: {
				metadataId: "anAttribute", nameInData: "anAttribute", path: []
			}
		});
		assert.deepEqual(messages[1], {
			type: "setValue", message: {
				path: ["@anAttribute"], dataOrigin: "final", data: "aFinalValue"
			}
		});
		assert.deepEqual(messages[2], {
			type: "disable", message: {
				path: ["@anAttribute"]
			}
		});

		assert.deepEqual(messages[3], {
			type: "addAttribute", message: {
				metadataId: "anOtherAttribute", nameInData: "anOtherAttribute", path: []
			}
		});
		assert.deepEqual(messages[4], {
			type: "setValue", message: {
				path: ["@anOtherAttribute"], dataOrigin: "final", data: "aOtherFinalValue"
			}
		});
		assert.deepEqual(messages[5], {
			type: "disable", message: {
				path: ["@anOtherAttribute"]
			}
		});

		assert.deepEqual(messages[6], {
			type: "newElementsAdded", message: {
				data: "", path: []
			}
		});
		assert.deepEqual(messages[7], {
			type: "initComplete", message: {
				path: [], data: ""
			}
		});

		assert.equal(messages.length, 8);
	});

	test("testAddAttributes_noValue", function(assert) {
		spec.metadataId = "groupIdOneTextChildOneAttributeChoice";
		spec.data = {
			someData: "data",
			attributes: {
				type: "image"
			}
		};

		CORA.metadataController(dependencies, spec);

		let messages = pubSub.getMessages();

		assert.deepEqual(messages[0], {
			type: "addAttribute", message: {
				metadataId: "anAttributeChoice", nameInData: "anAttributeChoice", path: []
			}
		});

		assert.deepEqual(messages[1], {
			type: "setValue", message: {
				path: ["@anAttributeChoice"],
				dataOrigin: "startup",
				data: undefined
			}
		});
		assert.deepEqual(messages[2], {
			type: "newElementsAdded", message: {
				data: "", path: []
			}
		});
		assert.deepEqual(messages[3], {
			type: "initComplete", message: {
				path: [], data: ""
			}
		});

		assert.equal(messages.length, 4);
	});

	test("testAddAttributes_WithValue", function(assert) {
		spec.metadataId = "groupIdOneTextChildOneAttributeChoice";
		spec.data = {
			someData: "data",
			attributes: {
				anAttributeChoice: "yes"
			}
		};

		CORA.metadataController(dependencies, spec);

		let messages = pubSub.getMessages();

		assert.deepEqual(messages[0], {
			type: "addAttribute", message: {
				metadataId: "anAttributeChoice", nameInData: "anAttributeChoice", path: []
			}
		});

		assert.deepEqual(messages[1], {
			type: "setValue", message: {
				path: ["@anAttributeChoice"],
				dataOrigin: "startup",
				data: "yes"
			}
		});
		assert.deepEqual(messages[2], {
			type: "newElementsAdded", message: {
				data: "", path: []
			}
		});
		assert.deepEqual(messages[3], {
			type: "initComplete", message: {
				path: [], data: ""
			}
		});

		assert.equal(messages.length, 4);
	});
});
