/*
 * Copyright 2020 Uppsala University Library
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

QUnit.module("metadata/metadataRepeatInitializerTest.js", {
    beforeEach: function () {
        this.metadataProvider = CORATEST.MetadataProviderStub();
        this.pubSub = CORATEST.pubSubSpy();
        this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();

        this.dependencies = {
            metadataProvider: this.metadataProvider,
            pubSub: this.pubSub,
            recordTypeProvider: CORATEST.recordTypeProviderSpy(),
            metadataChildAndRepeatInitializerFactory: CORATEST
                .metadataChildAndRepeatInitializerFactorySpy({})
        };
        this.spec = {
            metadataId: "textVariableId",
            path: [],
            data: undefined,
            repeatId: undefined,
            recordPartPermissionCalculator: this.recordPartPermissionCalculator
        };
    }
});

QUnit.test("testInit", function (assert) {

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    assert.strictEqual(metadataRepeatInitializer.type, "metadataRepeatInitializer");
});

QUnit.test("testGetSpec", function (assert) {
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    assert.strictEqual(metadataRepeatInitializer.getSpec(), this.spec);
});

QUnit.test("testGetDependecies", function (assert) {
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    assert.strictEqual(metadataRepeatInitializer.getDependencies(), this.dependencies);
});

QUnit.test("testTextVariableNoChildInitializerCalled", function (assert) {
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
    assert.strictEqual(repeatSpec, undefined);
});

QUnit.test("testMessagesTextVariableNoData", function (assert) {
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();
    let messages = this.pubSub.getMessages();
    assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
        + '"metadataId":"textVariableId","path":[],"nameInData":"textVariableId"}}');
    assert.equal(messages.length, 1);
});

QUnit.test("testMessagesTextVariableWithData", function (assert) {
    this.spec.data = {
        "name": "textVariableId",
        "value": "A Value"
    };
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();
    let messages = this.pubSub.getMessages();
    assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
        + '"metadataId":"textVariableId","path":[],"nameInData":"textVariableId"}}');
    assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"type":"setValue","data":"A Value",'
        + '"path":["textVariableId"]}}');

    assert.equal(messages.length, 2);
});

QUnit.test("testMessagesNonEmptyParentPathTextVariableWithData", function (assert) {
    this.spec.data = {
        "name": "textVariableId",
        "value": "A Value"
    };
    this.spec.path = ["recordInfo", "type"];

    let expectedSetValuePath = ["recordInfo", "type", "textVariableId"];

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let messages = this.pubSub.getMessages();
    assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
        + '"metadataId":"textVariableId","path":' + (JSON.stringify(this.spec.path)) + ',"nameInData":"textVariableId"}}');
    assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"type":"setValue","data":"A Value",'
        + '"path":' + (JSON.stringify(expectedSetValuePath)) + '}}');
    assert.equal(messages.length, 2);
});

QUnit.test("testMessagesTextVariableWithAttributeNoData", function (assert) {
    this.spec.metadataId = "groupIdOneTextChildOneAttribute";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();
    let messages = this.pubSub.getMessages();

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

QUnit.test("testMessagesTextVariableWithTwoAttributeNoData", function (assert) {
    this.spec.metadataId = "groupIdOneTextChildTwoAttributes";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();
    let messages = this.pubSub.getMessages();

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

QUnit.test("testMessagesTextVariableWithAttributeChoiceNoData", function (assert) {
    this.spec.metadataId = "groupIdOneTextChildOneAttributeChoice";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();
    let messages = this.pubSub.getMessages();

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
QUnit.test("testMessagesTextVariableWithAttributeChoiceWithData", function (assert) {
    this.spec.metadataId = "groupIdOneTextChildOneAttributeChoice";
    //possible attribute values aFinalValue, aOtherFinalValue
    this.spec.data = {
        name: "groupIdOneTextChildOneAttributeChoice",
        attributes: {
            anAttributeChoice: "aFinalValue"
        }
    };

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();
    let messages = this.pubSub.getMessages();

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
            data: "aFinalValue"
        }
    };
    assert.deepEqual(messages[2], setValueAttribute2);

    assert.equal(messages.length, 3);
});

QUnit.test("testMessagesTextVariableFinalValue", function (assert) {
    this.spec.metadataId = "textVariableWithFinalValueId";
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();
    let messages = this.pubSub.getMessages();
    assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
        + '"metadataId":"textVariableWithFinalValueId","path":[],"nameInData":"textVariableWithFinalValueId"}}');
    assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"type":"setValue","data":"someFinalValue",'
        + '"path":["textVariableWithFinalValueId"]}}');
    assert.deepEqual(JSON.stringify(messages[2]), '{"type":"disable","message":{"type":"disable",'
        + '"path":["textVariableWithFinalValueId"]}}');

    assert.equal(messages.length, 3);
});

QUnit.test("testMessagesTextVariableWithWrongFinalValue", function (assert) {
    this.spec.metadataId = "textVariableWithFinalValueId";
    this.spec.data = {
        "name": "textVariableWithFinalValueId",
        "value": "NOTAFinalValue"
    };
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();
    let messages = this.pubSub.getMessages();
    assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
        + '"metadataId":"textVariableWithFinalValueId","path":[],"nameInData":"textVariableWithFinalValueId"}}');
    assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"type":"setValue","data":"someFinalValue",'
        + '"path":["textVariableWithFinalValueId"]}}');
    assert.deepEqual(JSON.stringify(messages[2]), '{"type":"disable","message":{"type":"disable",'
        + '"path":["textVariableWithFinalValueId"]}}');

    assert.equal(messages.length, 3);
});

CORATEST.createRefForRepeatIntitalizer = function (linkedRecordType, linkedRecordId, repeatMin, repeatMax) {
    return {
        "name": "childReference",
        "repeatId": "1",
        "children": [{
            "name": "ref",
            "children": [{
                "name": "linkedRecordType",
                "value": linkedRecordType
            }, {
                "name": "linkedRecordId",
                "value": linkedRecordId
            }]
        }, {
            "name": "repeatMin",
            "value": repeatMin
        }, {
            "name": "repeatMax",
            "value": repeatMax
        }]
    }
};

let expectedChildReferenceTextVariableId = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "textVariableId", "1", "1");

let expectedChildReferenceTextVariableId2 = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "textVariableId2", "1", "1");


QUnit.test("testMessagesGroup", function (assert) {
    this.spec.metadataId = "groupIdOneTextChild";
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();
    let messages = this.pubSub.getMessages();
    assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
        + '"metadataId":"groupIdOneTextChild","path":[],"nameInData":"groupIdOneTextChild"}}');
    assert.equal(messages.length, 1);
});

QUnit.test("testGroupOneTextChildWithNODataChildAndRepeatInitializerCalledCorrectly", function (
    assert) {
    this.spec.metadataId = "groupIdOneTextChild";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);

    assert.stringifyEqual(repeatSpec.childReference, expectedChildReferenceTextVariableId);
    assert.stringifyEqual(repeatSpec.data, undefined);
    assert.stringifyEqual(repeatSpec.path, ["groupIdOneTextChild"]);

    let factoredChild = this.dependencies.metadataChildAndRepeatInitializerFactory
        .getFactoredChildIntitializers(0);
    assert.ok(factoredChild.getInitializeTopLevelCalled());
});

QUnit.test("testGroupOneTextChildWithData", function (assert) {
    this.spec.metadataId = "groupIdOneTextChild";
    this.spec.data = {
        "name": "groupIdOneTextChild",
        "children": [{
            "name": "textVariableId",
            "value": "A Value"
        }]
    };
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
    assert.stringifyEqual(repeatSpec.childReference, expectedChildReferenceTextVariableId);
    assert.stringifyEqual(repeatSpec.data, this.spec.data);
    assert.stringifyEqual(repeatSpec.path, ["groupIdOneTextChild"]);
    assert.stringifyEqual(repeatSpec.recordPartPermissionCalculator, this.recordPartPermissionCalculator);

    let factoredChild = this.dependencies.metadataChildAndRepeatInitializerFactory
        .getFactoredChildIntitializers(0);
    assert.ok(factoredChild.getInitializeTopLevelCalled());
});

QUnit.test("testGroupTwoTextChildrenWithNODataChildAndRepeatInitializerCalledCorrectly", function (
    assert) {
    this.spec.metadataId = "groupIdTwoTextChild";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);

    assert.stringifyEqual(repeatSpec.childReference, expectedChildReferenceTextVariableId);
    assert.stringifyEqual(repeatSpec.data, undefined);
    assert.stringifyEqual(repeatSpec.path, ["groupIdTwoTextChild"]);
    assert.stringifyEqual(repeatSpec.recordPartPermissionCalculator, this.recordPartPermissionCalculator);


    let factoredChild = this.dependencies.metadataChildAndRepeatInitializerFactory
        .getFactoredChildIntitializers(0);
    assert.ok(factoredChild.getInitializeTopLevelCalled());

    let repeatSpec2 = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(1);

    assert.stringifyEqual(repeatSpec2.childReference, expectedChildReferenceTextVariableId2);
    assert.stringifyEqual(repeatSpec2.data, undefined);
    assert.stringifyEqual(repeatSpec2.path, ["groupIdTwoTextChild"]);

    let factoredChild2 = this.dependencies.metadataChildAndRepeatInitializerFactory
        .getFactoredChildIntitializers(1);
    assert.ok(factoredChild2.getInitializeTopLevelCalled());
});

QUnit.test("testRecordLinkMessage", function (assert) {
    this.spec.metadataId = "myLink";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let messages = this.pubSub.getMessages();

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
            path: ["myLink"]
        }
    };
    assert.stringifyEqual(messages[1], expectedAddForLinkedRecordType);
    assert.equal(messages.length, 2);
});

QUnit.test("testRecordLinkCorrectCallToChildAndRepeatInitalizerNoDataNoRepeatId", function (assert) {
    this.spec.metadataId = "myLink";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let linkedRecordTypeSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
    let expectedRecordTypeReference = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "linkedRecordTypeTextVar", "1", "1");

    assert.stringifyEqual(linkedRecordTypeSpec.childReference, expectedRecordTypeReference);
    assert.stringifyEqual(linkedRecordTypeSpec.data, {
        "name": "myLink",
        "children": [{"name": "linkedRecordType", "value": "metadataTextVariable"}]
    });
    assert.stringifyEqual(linkedRecordTypeSpec.path, ["myLink"]);

    let linkedRecordIdSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(1);
    let expectedRecordIdReference = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "linkedRecordIdTextVar", "1", "1");
    assert.stringifyEqual(linkedRecordIdSpec.childReference, expectedRecordIdReference);
    assert.stringifyEqual(linkedRecordIdSpec.data, this.spec.data);
    assert.stringifyEqual(linkedRecordIdSpec.path, ["myLink"]);

});

QUnit.test("testRecordLinkWithMessagesNonEmptyPathInSpec", function (assert) {
    this.spec.path = ["recordInfo", "type"];
    this.spec.metadataId = "myLink";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let messages = this.pubSub.getMessages();

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

QUnit.test("testRecordLinkWithPathMessages", function (assert) {
    this.spec.metadataId = "myPathLink";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let messages = this.pubSub.getMessages();

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
                path: ["myPathLink"]
            }
        };

    assert.stringifyEqual(messages[1], expectedAddForLinkedData);
    assert.stringifyEqual(messages[2], undefined);
});

QUnit.test("testRecordLinkMessageCorrectCallToChildAndRepeatInitalizerNoDataWithLinkedPath", function (assert) {
    this.spec.metadataId = "myPathLink";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let linkedRecordTypeSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
    let expectedRecordTypeReference = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "linkedRecordTypeTextVar", "1", "1");

    assert.stringifyEqual(linkedRecordTypeSpec.childReference, expectedRecordTypeReference);
    assert.stringifyEqual(linkedRecordTypeSpec.data, {
        "name": "myPathLink",
        "children": [{"name": "linkedRecordType", "value": "metadataTextVariable"}]
    });
    assert.stringifyEqual(linkedRecordTypeSpec.path, ["myPathLink"]);


    let linkedRecordIdSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(1);
    let expectedRecordIdReference = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "linkedRecordIdTextVar", "1", "1");
    assert.stringifyEqual(linkedRecordIdSpec.childReference, expectedRecordIdReference);
    assert.stringifyEqual(linkedRecordIdSpec.data, this.spec.data);
    assert.stringifyEqual(linkedRecordIdSpec.path, ["myPathLink"]);


    let linkedRepeatTypeSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(2);
    let expectedRecordRepeatIdReference = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "linkedRepeatIdTextVar", "1", "1");
    assert.stringifyEqual(linkedRepeatTypeSpec.childReference, expectedRecordRepeatIdReference);
    assert.stringifyEqual(linkedRepeatTypeSpec.data, this.spec.data);
    assert.stringifyEqual(linkedRepeatTypeSpec.path, ["myPathLink"]);

    assert.stringifyEqual(this.dependencies.metadataChildAndRepeatInitializerFactory.getFactoredChildIntitializers(3), undefined);
});

QUnit.test("testRecordLinkCorrectCallToChildAndRepeatInitalizerNoDataFinalValue", function (assert) {
    this.spec.metadataId = "myFinalValueLink";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let linkedRecordTypeSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
    let expectedRecordTypeReference = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "linkedRecordTypeTextVar", "1", "1");

    assert.stringifyEqual(linkedRecordTypeSpec.childReference, expectedRecordTypeReference);
    assert.stringifyEqual(linkedRecordTypeSpec.data, {
        "name": "myFinalValueLink",
        "children": [{"name": "linkedRecordType", "value": "metadataTextVariable"}]
    });
    assert.stringifyEqual(linkedRecordTypeSpec.path, ["myFinalValueLink"]);
    let linkedRecordIdSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(1);
    let expectedRecordIdReference = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "linkedRecordIdTextVar", "1", "1");
    assert.stringifyEqual(linkedRecordIdSpec.childReference, expectedRecordIdReference);
    assert.stringifyEqual(linkedRecordIdSpec.data, {
        "name": "myFinalValueLink",
        "children": [{"name": "linkedRecordId", "value": "someInstance"}]
    });
    assert.stringifyEqual(linkedRecordIdSpec.path, ["myFinalValueLink"]);

});

QUnit.test("testResourceLinkMessage", function (assert) {
    this.spec.metadataId = "masterResLink";
	this.spec.data = 	{
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
    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let messages = this.pubSub.getMessages();
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
            data: this.spec.data,
            path: ["masterResLink"],
            type: "setValue",
            special: "resourceLink"
        }
    };
    assert.stringifyEqual(messages[1], expectedLinkedResourceMessage);


});

//QUnit.test("testResourceLinkCorrectCallsToChildAndRepeatInitalizer", function(assert) {
//	this.spec.metadataId = "masterResLink";
//	this.spec.data = {some:"data"};
//
//	let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
//	metadataRepeatInitializer.initialize();
//
//	let streamIdSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getChildSpec(0);
//	let expectedStreamIdReference = CORATEST.createRefForRepeatIntitalizer("metadataTextVariable", "masterResourceLinkTextVar", "1", "1");
//
//	assert.stringifyEqual(streamIdSpec.childReference, expectedStreamIdReference);
//	assert.stringifyEqual(streamIdSpec.data, this.spec.data);
//	assert.stringifyEqual(streamIdSpec.path, ["masterResLink"]);
//});

QUnit.test("testRecordPartReadPermissionsWhenPermissionExists", function (
    assert) {
    this.spec.metadataId = "groupIdOneTextChild";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let recordPartPermissionCalculatorSpy = this.spec.recordPartPermissionCalculator;
    let callsToHasFulfilledReadPermissionsForRecordPart = recordPartPermissionCalculatorSpy.getReadRequestedIdsArray();
    assert.equal(callsToHasFulfilledReadPermissionsForRecordPart.length, 1);
    assert.equal(callsToHasFulfilledReadPermissionsForRecordPart[0], "metadataTextVariable_textVariableId");


    let factoredChild = this.dependencies.metadataChildAndRepeatInitializerFactory
        .getFactoredChildIntitializers(0);
    assert.ok(factoredChild.getInitializeTopLevelCalled());
});

QUnit.test("testRecordPartReadPermissionsWhenNOPermissionExists", function (
    assert) {
    this.spec.metadataId = "groupIdOneTextChild";
    let recordPartPermissionCalculatorSpy = this.spec.recordPartPermissionCalculator;
    recordPartPermissionCalculatorSpy.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let callsToHasFulfilledReadPermissionsForRecordPart = recordPartPermissionCalculatorSpy.getReadRequestedIdsArray();
    assert.equal(callsToHasFulfilledReadPermissionsForRecordPart.length, 1);
    assert.equal(callsToHasFulfilledReadPermissionsForRecordPart[0], "metadataTextVariable_textVariableId");


    let factoredChild = this.dependencies.metadataChildAndRepeatInitializerFactory
        .getFactoredChildIntitializers(0);
    assert.equal(factoredChild, undefined);
});

QUnit.test("testRecordPartWritePermissionsWhenPermissionExists", function (
    assert) {
    this.spec.metadataId = "groupIdOneTextChild";

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let recordPartPermissionCalculatorSpy = this.spec.recordPartPermissionCalculator;
    let callsToHasFulfilledWritePermissionsForRecordPart = recordPartPermissionCalculatorSpy.getWriteRequestedIdsArray();
    assert.equal(callsToHasFulfilledWritePermissionsForRecordPart.length, 1);
    assert.equal(callsToHasFulfilledWritePermissionsForRecordPart[0], "metadataTextVariable_textVariableId");


    let factoredChild = this.dependencies.metadataChildAndRepeatInitializerFactory
        .getFactoredChildIntitializers(0);
    assert.ok(factoredChild.getInitializeTopLevelCalled());
    assert.strictEqual(factoredChild.getHasWritePermission(), true);
});

QUnit.test("testRecordPartWritePermissionsWhenPermissionNOExists", function (
    assert) {
    this.spec.metadataId = "groupIdOneTextChild";
    let recordPartPermissionCalculatorSpy = this.spec.recordPartPermissionCalculator;
    recordPartPermissionCalculatorSpy.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");

    let metadataRepeatInitializer = CORA.metadataRepeatInitializer(this.dependencies, this.spec);
    metadataRepeatInitializer.initialize();

    let factoredChild = this.dependencies.metadataChildAndRepeatInitializerFactory
        .getFactoredChildIntitializers(0);
    assert.strictEqual(factoredChild.getHasWritePermission(), false);
});
