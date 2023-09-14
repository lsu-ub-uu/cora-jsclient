/*
 * Copyright 2016, 2017, 2018, 2020, 2023 Uppsala University Library
 * Copyright 2016, 2017, 2018 Olov McKie
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
QUnit.module("presentation/pChildRefHandlerTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");

		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
			"metadataProvider": this.metadataProvider,
			"pubSub": CORATEST.pubSubSpy(),
			"textProvider": CORATEST.textProviderStub(),
			"presentationFactory": CORATEST.standardFactorySpy("presentationSpy"),
			"jsBookkeeper": CORATEST.jsBookkeeperSpy(),
			"recordTypeProvider": CORATEST.recordTypeProviderStub(),
			"uploadManager": CORATEST.uploadManagerSpy(),
			"ajaxCallFactory": CORATEST.ajaxCallFactorySpy(),
			"pChildRefHandlerViewFactory": CORATEST.standardFactorySpy("pChildRefHandlerViewSpy"),
			"pRepeatingElementFactory": CORATEST.standardFactorySpy("pRepeatingElementSpy"),
			"dataDivider": "systemY"
		};
		this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();

		this.spec = {
			"parentPath": [],
			"cParentMetadata": CORA.coraData(this.metadataProvider
				.getMetadataById("groupIdOneTextChild")),
			"cPresentation": CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableId")),
			"cAlternativePresentation": CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableIdOutput")),
			cParentPresentation : {"value":"someDummyDataToSeeThatItIsPassedAlong"},
			"presentationSize": "bothEqual",
			"mode": "input",
			hasWritePermissionsForRecordPart: true,
			"recordPartPermissionCalculator": this.recordPartPermissionCalculator
		};

		this.assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy, recordType) {
			let ajaxCallSpec = ajaxCallSpy.getSpec();
			assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/"
				+ recordType + "/");
			assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
			assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
			assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.record+json");
		}
		this.record = {
			"data": {
				"children": [{
					"children": [{
						"children": [{
							"name": "linkedRecordType",
							"value": "system"
						}, {
							"name": "linkedRecordId",
							"value": "alvin"
						}],
						"actionLinks": {
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "http://localhost:8080/therest/rest/record/system/alvin",
								"accept": "application/vnd.uub.record+json"
							}
						},
						"name": "dataDivider"
					}, {
						"name": "id",
						"value": "image:333759270435575"
					}, {
						"name": "type",
						"value": "image"
					}, {
						"name": "createdBy",
						"children": [{
							"name": "linkedRecordType",
							"value": "user"
						}, {
							"name": "linkedRecordId",
							"value": "userId"
						}]
					}],
					"name": "recordInfo"
				}, {
					"name": "fileName",
					"value": "someFileName"
				}, {
					"name": "fileSize",
					"value": "1234567890"
				}],
				"name": "binary"
			},
			"actionLinks": {
				"read": {
					"requestMethod": "GET",
					"rel": "read",
					"url": "http://localhost:8080/therest/rest/record/image/"
						+ "image:333759270435575",
					"accept": "application/vnd.uub.record+json"
				},
				"update": {
					"requestMethod": "POST",
					"rel": "update",
					"contentType": "application/vnd.uub.record+json",
					"url": "http://localhost:8080/therest/rest/record/image/"
						+ "image:333759270435575",
					"accept": "application/vnd.uub.record+json"
				},
				"delete": {
					"requestMethod": "DELETE",
					"rel": "delete",
					"url": "http://localhost:8080/therest/rest/record/image/"
						+ "image:333759270435575"
				},
				"upload": {
					"requestMethod": "POST",
					"rel": "upload",
					"contentType": "multipart/form-data",
					"url": "http://localhost:8080/therest/rest/record/image/"
						+ "image:333759270435575/upload",
					"accept": "application/vnd.uub.record+json"
				}
			}

		};

		this.answerCall = function(attachedPChildRefHandler, no) {
			let ajaxCallSpy0 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(no);
			let jsonRecord = JSON.stringify({
				"record": this.record
			});
			let answer = {
				"spec": ajaxCallSpy0.getSpec(),
				"responseText": jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.answerCall2 = function(ajaxCallFactory, no) {
			let ajaxCallSpy0 = ajaxCallFactory.getFactored(no);
			let jsonRecord = JSON.stringify({
				"record": this.record
			});
			let answer = {
				"spec": ajaxCallSpy0.getSpec(),
				"responseText": jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}

		this.data = {
			name: "binary",
			children: [{
				name: "recordInfo",
				children: [{
					name: "dataDivider",
					children: [{
						name: "linkedRecordType",
						value: "system"
					}, {
						name: "linkedRecordId",
						value: "systemY"
					}]
				},{
					name: "validationType",
					children: [{
						name: "linkedRecordType",
						value: "validationType"
					}, {
						name: "linkedRecordId",
						value: "genericBinary"
					}]
				}]
			},{
				name: "expectedFileName",
				value: "someFile.tif"
			},{
				name: "expectedFileSize",
				value: "1234567890"
			}],
			"attributes": {
				"type": "genericBinary"
			}
		};
		this.data2 = {
			name: "binary",
			children: [{
				name: "recordInfo",
				children: [{
					name: "dataDivider",
					children: [{
						name: "linkedRecordType",
						value: "system"
					}, {
						name: "linkedRecordId",
						value: "systemY"
					}]
				},{
					name: "validationType",
					children: [{
						name: "linkedRecordType",
						value: "validationType"
					}, {
						name: "linkedRecordId",
						value: "genericBinary"
					}]
				}]
			},{
				name: "expectedFileName",
				value: "someFile2.tif"
			},{
				name: "expectedFileSize",
				value: "9876543210"
			}],
			"attributes": {
				"type": "genericBinary"
			}
		};
		this.data3 = {
			name: "binary",
			children: [{
				name: "recordInfo",
				children: [{
					name: "dataDivider",
					children: [{
						name: "linkedRecordType",
						value: "system"
					}, {
						name: "linkedRecordId",
						value: "systemY"
					}]
				},{
						name: "validationType",
						children: [{
							name: "linkedRecordType",
							value: "validationType"
						}, {
							name: "linkedRecordId",
							value: "genericBinary"
						}]
					}]
			},{
				name: "expectedFileName",
				value: "someFile3.tif"
			},{
				name: "expectedFileSize",
				value: "1122334455"
			}],
			attributes: {
				type: "genericBinary"
			}
		};

		this.files1 = [];
		let file1 = {
			"name": "someFile.tif",
			"size": 1234567890
		};
		this.files1.push(file1);

		this.files1to3 = [];
		this.files1to3.push(file1);
		let file2 = {
			"name": "someFile2.tif",
			"size": 9876543210
		};
		this.files1to3.push(file2);
		let file3 = {
			"name": "someFile3.tif",
			"size": 1122334455
		};
		this.files1to3.push(file3);
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);
	assert.ok(pChildRefHandler.isRepeating === false);
	assert.ok(pChildRefHandler.isStaticNoOfChildren === true);

	// subscription
	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	let firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, []);
	assert.ok(firstSubsription.functionToCall === pChildRefHandler.handleMsg);

	let secondSubscription = subscriptions[1];
	assert.strictEqual(secondSubscription.type, "move");
	assert.deepEqual(secondSubscription.path, []);
	assert.ok(secondSubscription.functionToCall === pChildRefHandler.handleMsg);

	let thirdSubscription = subscriptions[2];
	assert.strictEqual(thirdSubscription.type, "addUpToMinNumberOfRepeating");
	assert.deepEqual(thirdSubscription.path, []);
	assert.ok(thirdSubscription.functionToCall === pChildRefHandler.newElementsAdded);
});

QUnit.test("testInitViewIsFromFactoredView", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.childStyle = "someChildStyle";
	this.spec.textStyle = "someTextStyle";
	this.spec.mode = "input";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(view, factoredView.getView());

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "pVarTextVariableId",
		"isRepeating": false,
		"addText": "+ translated_textVariableIdText",
		"mode": "input",
		"textStyle": "someTextStyle",
		"childStyle": "someChildStyle"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
});

QUnit.test("testInitViewIsFromFactoredViewOutputMode", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.childStyle = "someChildStyle";
	this.spec.textStyle = "someTextStyle";
	this.spec.mode = "output";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(view, factoredView.getView());

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "pVarTextVariableId",
		"isRepeating": false,
		"addText": "+ translated_textVariableIdText",
		"mode": "output",
		"textStyle": "someTextStyle",
		"childStyle": "someChildStyle"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
});

QUnit.test("testChildMoved", function(assert) {
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let moveDataFromPChildRefHandlerView = {
		"moveChild": ["textVariableId.1"],
		"basePositionOnChild": ["textVariableId.two"],
		"newPosition": "after"
	};

	let moveData = {
		"path": [],
		"metadataId": "textVariableId",
		"moveChild": ["textVariableId.1"],
		"basePositionOnChild": ["textVariableId.two"],
		"newPosition": "after"
	};
	pChildRefHandler.childMoved(moveDataFromPChildRefHandlerView);

	assert.deepEqual(this.dependencies.jsBookkeeper.getMoveDataArray()[0], moveData);
});
QUnit.test("testChildMovedUsingMessage", function(assert) {
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let moveMessageData = {
		"path": [],
		"metadataId": "textVariableId",
		"moveChild": ["textVariableId.one"],
		"basePositionOnChild": ["textVariableId.two"],
		"newPosition": "after"
	};
	pChildRefHandler.handleMsg(moveMessageData, "root/move");
	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);

	assert.deepEqual(factoredView.getMovedChild(0), moveMessageData);
});

QUnit.test("testInitRepeatingVariableNoOfChildren", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1toX"));

	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.ok(pChildRefHandler.isRepeating === true);
	assert.ok(pChildRefHandler.isStaticNoOfChildren === false);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(view, factoredView.getView());

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "pVarTextVariableId",
		"isRepeating": true,
		"addText": "+ Exempel textvariabel",
		"mode": "input"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);

	// subscription
	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);
});

QUnit.test("testInitRepeatingStaticNoOfChildren", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat3to3"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.ok(pChildRefHandler.isRepeating === true);
	assert.ok(pChildRefHandler.isStaticNoOfChildren === true);

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "pVarTextVariableId",
		"isRepeating": true,
		"addText": "+ Exempel textvariabel",
		"mode": "input"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredSpec.addMethod, undefined);

	// subscription
	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);
});

QUnit.test("testAddButtonFor1toX", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1toX"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "pVarTextVariableId",
		"isRepeating": true,
		"addText": "+ Exempel textvariabel",
		"mode": "input"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);
});

QUnit.test("testSendAdd", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1toX"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	pChildRefHandler.sendAdd();
	let expectedAddData = {
		"childReference": {
			"children": [{
				"name": "ref",
				"children": [{
					"name": "linkedRecordType",
					"value": "metadataTextVariable"
				}, {
					"name": "linkedRecordId",
					"value": "textVariableId"
				}]
			}, {
				"name": "repeatMin",
				"value": "1"
			}, {
				"name": "repeatMax",
				"value": "X"
			}],
			"name": "childReference",
			"repeatId": "1"
		},
		"metadataId": "textVariableId",
		"nameInData": "textVariableId",
		"path": [],
		"recordPartPermissionCalculator": this.recordPartPermissionCalculator
	};
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray()[0], expectedAddData);
	let messages = this.dependencies.pubSub.getMessages();
	assert.deepEqual(messages.length, 1);
	assert.deepEqual(messages[0].type, "newElementsAdded");
});
QUnit.test("testSendAddBefore", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1toX"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let data = {
		path: "someFakePath"
	};
	pChildRefHandler.sendAddBefore(data);
	let addBeforeData = {
		"childReference": {
			"children": [{
				"name": "ref",
				"children": [{
					"name": "linkedRecordType",
					"value": "metadataTextVariable"
				}, {
					"name": "linkedRecordId",
					"value": "textVariableId"
				}]
			}, {
				"name": "repeatMin",
				"value": "1"
			}, {
				"name": "repeatMax",
				"value": "X"
			}],
			"name": "childReference",
			"repeatId": "1"
		},
		"metadataId": "textVariableId",
		"nameInData": "textVariableId",
		"path": [],
		"addBeforePath": "someFakePath",
		"recordPartPermissionCalculator": this.recordPartPermissionCalculator
	};
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddBeforeDataArray()[0], addBeforeData);
	let messages = this.dependencies.pubSub.getMessages();
	assert.deepEqual(messages.length, 1);
	assert.deepEqual(messages[0].type, "newElementsAdded");
});

QUnit.test("testAddButtonWithAttributes", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("pgTextVarRepeat1to3InGroupOneAttribute"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "pgTextVarRepeat1to3InGroupOneAttribute",
		"isRepeating": true,
		"addText": "+ textVarRepeat1to3InGroupOneAttributeText",
		"mode": "input"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);
	pChildRefHandler.sendAdd();

	let addedData = this.dependencies.jsBookkeeper.getAddDataArray()[0];

	let addData = {
		"metadataId": "textVarRepeat1to3InGroupOneAttribute",
		"path": [],
		"childReference": {
			"name": "childReference",
			"repeatId": "1",
			"children": [
				{
					"name": "ref",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataTextVariable"
						},
						{
							"name": "linkedRecordId",
							"value": "textVarRepeat1to3InGroupOneAttribute"
						}
					]
				},
				{
					"name": "repeatMin",
					"value": "0"
				},
				{
					"name": "repeatMax",
					"value": "2"
				}
			]
		},
		"nameInData": "textVarRepeat1to3InGroupOneAttribute",
		"attributes": {
			"anAttribute": [
				"aFinalValue"
			]
		},
		"recordPartPermissionCalculator": this.recordPartPermissionCalculator
	};
	assert.deepEqual(addedData, addData);
});

QUnit.test("testUploadButtonFor0toX", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("myChildOfBinaryPLink"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "myChildOfBinaryPLink",
		"isRepeating": true,
		"addText": "+ translated_myChildOfBinaryLinkText",
		"mode": "input",
		"upload": "true"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredSpec.addMethod, undefined);
});

QUnit.test("testHandleFilesSendingOneFile", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("myChildOfBinaryPLink"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	let ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "binary");

	assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);

	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));
});

QUnit.test("testHandleFilesSendingOneBinaryFile",
	function(assert) {
		this.dependencies.textProvider = CORATEST.textProviderSpy();
		this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
			.getMetadataById("groupIdOneBinaryRecordLinkChild"));
		this.spec.cPresentation = CORA.coraData(this.metadataProvider
			.getMetadataById("myBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		let view = pChildRefHandler.getView();
		this.fixture.appendChild(view);

		pChildRefHandler.handleFiles(this.files1);

		let ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
		this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "binary");

		assert
			.strictEqual(ajaxCallSpy0.getSpec().loadMethod,
				pChildRefHandler.processNewBinary);

		let data = JSON.parse(JSON.stringify(this.data));
		data.attributes.type = "genericBinary";
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(data));
	});

QUnit.test("testHandleFilesSendingOneFileError", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("myChildOfBinaryPLink"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	let ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "binary");

	assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);

	ajaxCallSpy0.getSpec().errorMethod({
		"status": 404
	});

	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0).innerHTML, "404");
});

QUnit.test("testHandleFilesReceiveAnswerForOneFile", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("myChildOfBinaryPLink"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	this.answerCall2(this.dependencies.ajaxCallFactory, 0);

	let addData = {
		"childReference": {
			"children": [{
				"name": "ref",
				"children": [{
					"name": "linkedRecordType",
					"value": "metadataRecordLink"
				}, {
					"name": "linkedRecordId",
					"value": "myChildOfBinaryLink"
				}]
			}, {
				"name": "repeatMin",
				"value": "0"
			}, {
				"name": "repeatMax",
				"value": "X"
			}],
			"name": "childReference",
			"repeatId": "one"
		},
		"metadataId": "myChildOfBinaryLink",
		"nameInData": "myChildOfBinaryLink",
		"path": [],
		"recordPartPermissionCalculator": this.recordPartPermissionCalculator
	};
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray()[0], addData);

	let setValueData = {
		"data": "image:333759270435575",
		"path": ["myChildOfBinaryLink.dummyRepeatId","linkedRecordIdTextVar"]
	}
	assert.deepEqual(this.dependencies.jsBookkeeper.getDataArray()[0], setValueData);

});

QUnit.test("testHandleFilesSavingMainRecordAfterReceiveAnswerForOneFile", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("myChildOfBinaryPLink"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	this.answerCall2(this.dependencies.ajaxCallFactory, 0);

	let messages = this.dependencies.pubSub.getMessages();
	assert.deepEqual(messages.length, 2);
	assert.deepEqual(messages[1].type, "updateRecord");

	// send more files
	pChildRefHandler.handleFiles(this.files1);
	this.answerCall2(this.dependencies.ajaxCallFactory, 1);
	assert.deepEqual(messages.length, 4);
	assert.deepEqual(messages[1].type, "updateRecord");
	assert.deepEqual(messages[3].type, "updateRecord");

});

QUnit.test("testHandleFilesSendingMoreThanOneFile", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("myChildOfBinaryPLink"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1to3);

	let ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	let ajaxCallSpy1 = this.dependencies.ajaxCallFactory.getFactored(1);
	assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(this.data2));

	let ajaxCallSpy2 = this.dependencies.ajaxCallFactory.getFactored(2);
	assert.strictEqual(ajaxCallSpy2.getSpec().data, JSON.stringify(this.data3));

	this.answerCall2(this.dependencies.ajaxCallFactory, 0);
	this.answerCall2(this.dependencies.ajaxCallFactory, 1);
	this.answerCall2(this.dependencies.ajaxCallFactory, 2);

	let messages = this.dependencies.pubSub.getMessages();
	assert.deepEqual(messages.length, 4);
	assert.deepEqual(messages[3].type, "updateRecord");

	let uploadManagerSpy = this.dependencies.uploadManager;
	assert.ok(uploadManagerSpy.wasUploadCalled());

	let uploadSpecs = uploadManagerSpy.uploadSpecs;
	let uploadSpec1 = uploadSpecs[0];
	let expectedUploadSpec1 = {
		"file": {
			"name": "someFile.tif",
			"size": 1234567890
		},
		"uploadLink": {
			"accept": "application/vnd.uub.record+json",
			"contentType": "multipart/form-data",
			"rel": "upload",
			"requestMethod": "POST",
			"url": "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload"
		}
	};
	assert.deepEqual(uploadSpec1, expectedUploadSpec1);

	let uploadSpec2 = uploadSpecs[1];
	let expectedUploadSpec2 = {
		"file": {
			"name": "someFile2.tif",
			"size": 9876543210
		},
		"uploadLink": {
			"accept": "application/vnd.uub.record+json",
			"contentType": "multipart/form-data",
			"rel": "upload",
			"requestMethod": "POST",
			"url": "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload"
		}
	};
	assert.deepEqual(uploadSpec2, expectedUploadSpec2);

	let uploadSpec3 = uploadSpecs[2];
	let expectedUploadSpec3 = {
		"file": {
			"name": "someFile3.tif",
			"size": 1122334455
		},
		"uploadLink": {
			"accept": "application/vnd.uub.record+json",
			"contentType": "multipart/form-data",
			"rel": "upload",
			"requestMethod": "POST",
			"url": "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload"
		}
	};
	assert.deepEqual(uploadSpec3, expectedUploadSpec3);

});

QUnit.test("testHandleFilesSendingMoreFilesThanAllowed", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneChildOfBinaryRecordLinkChildRepeatMax2"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("myChildOfBinaryPLink"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1to3);

	let ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	let ajaxCallSpy1 = this.dependencies.ajaxCallFactory.getFactored(1);
	assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(this.data2));

	let ajaxCallSpy2 = this.dependencies.ajaxCallFactory.getFactored(2);
	assert.strictEqual(ajaxCallSpy2, undefined);

	this.answerCall2(this.dependencies.ajaxCallFactory, 0);
	this.answerCall2(this.dependencies.ajaxCallFactory, 1);

	let messages = this.dependencies.pubSub.getMessages();
	assert.deepEqual(messages.length, 3);
	assert.deepEqual(messages[2].type, "updateRecord");

});

QUnit.test("testHandleFilesSendingMoreFilesThanAllowedDifferentRequest", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneChildOfBinaryRecordLinkChildRepeatMax2"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("myChildOfBinaryPLink"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	let ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	pChildRefHandler.handleMsg({
		"metadataId": "myChildOfBinaryLink"
	}, "x/y/z/add");

	let files2 = [];
	let file2 = {
		"name": "someFile2.tif",
		"size": 9876543210
	};
	files2.push(file2);
	let file3 = {
		"name": "someFile3.tif",
		"size": 1122334455
	};
	files2.push(file3);
	pChildRefHandler.handleFiles(files2);

	let ajaxCallSpy1 = this.dependencies.ajaxCallFactory.getFactored(1);
	assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(this.data2));

	let ajaxCallSpy2 = this.dependencies.ajaxCallFactory.getFactored(2);
	assert.strictEqual(ajaxCallSpy2, undefined);

});

QUnit.test("testAddButtonShownFor0to1", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat0to1"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "pVarTextVariableId",
		"isRepeating": false,
		"addText": "+ Exempel textvariabel",
		"mode": "input"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
});

QUnit.test("testAddOneChild", function(assert) {
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);

	pChildRefHandler.add("textVariableId");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	let factoredSpec = pRepeatingElementFactory.getSpec(0);
	let expectedSpec = {
		"path": ["textVariableId"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": false,
		"userCanMove": false,
		"userCanAddBefore": false
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	assert.deepEqual(factoredSpec.path, ["textVariableId"]);

	let factoredPresentationSpec = this.dependencies.presentationFactory.getSpec(0);
	assert.deepEqual(factoredPresentationSpec.path, ["textVariableId"]);
	assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	assert.strictEqual(factoredPresentationSpec.cPresentation,
		this.spec.cPresentation);
	assert.strictEqual(factoredPresentationSpec.cParentPresentation,
		this.spec.cParentPresentation);
	assert.strictEqual(factoredPresentationSpec.recordPartPermissionCalculator,
		this.spec.recordPartPermissionCalculator);
});

QUnit.test("testAddOneChildModeOutput", function(assert) {
	this.spec.mode = "output";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);

	pChildRefHandler.add("textVariableId");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	let factoredSpec = pRepeatingElementFactory.getSpec(0);
	let expectedSpec = {
		"path": ["textVariableId"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": false,
		"userCanMove": false,
		"userCanAddBefore": false
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

	assert.deepEqual(factoredSpec.path, ["textVariableId"]);

	let factoredPresentationSpec = this.dependencies.presentationFactory.getSpec(0);
	assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
});
QUnit.test("testAddOneChildBinary", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("myChildOfBinaryPLink"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);

	pChildRefHandler.add("textVariableId");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	let factoredSpec = pRepeatingElementFactory.getSpec(0);

	let expectedSpec = {
		"path": ["textVariableId"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": true,
		"userCanMove": true,
		"userCanAddBefore": false
	};

	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

	assert.deepEqual(factoredSpec.path, ["textVariableId"]);

	let factoredPresentationSpec = this.dependencies.presentationFactory.getSpec(0);
	assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
});

QUnit.test("testAddOneChildWithRepeatId", function(assert) {
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);

	pChildRefHandler.add("textVariableId", "one");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

	let factoredSpec = pRepeatingElementFactory.getSpec(0);
	let expectedSpec = {
		"path": ["textVariableId.one"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": false,
		"userCanMove": false,
		"userCanAddBefore": false
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);

	let factoredPresentationSpec = this.dependencies.presentationFactory.getSpec(0);
	assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
});

QUnit.test("testAddOneChildWithOneLevelPath", function(assert) {
	this.spec.parentPath = ["textVariableId"];

	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);

	pChildRefHandler.add("textVariableId");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());


	let factoredSpec = pRepeatingElementFactory.getSpec(0);
	let expectedSpec = {
		"path": ["textVariableId","textVariableId"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": false,
		"userCanMove": false,
		"userCanAddBefore": false
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);

	let factoredPresentationSpec = this.dependencies.presentationFactory.getSpec(0);
	assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
});

QUnit.test("testAddOneChildWithTwoLevelPath", function(assert) {
	
	this.spec.parentPath =["textVariableId","textVariableId"];
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);

	pChildRefHandler.add("textVariableId");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

	let factoredSpec = pRepeatingElementFactory.getSpec(0);
	let expectedSpec = {
		"path": ["textVariableId","textVariableId","textVariableId"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": false,
		"userCanMove": false,
		"userCanAddBefore": false
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);

	let factoredPresentationSpec = this.dependencies.presentationFactory.getSpec(0);
	assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
});

QUnit.test("testAddChildWithAttributesInPath",	function(assert) {
			this.spec.cParentMetadata = CORA
				.coraData(this.metadataProvider
					.getMetadataById("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"));
			this.spec.cPresentation = CORA.coraData(this.metadataProvider
				.getMetadataById("pgTextVarRepeat1to3InGroupOtherAttribute"));
			
			let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
			let view = pChildRefHandler.getView();
			
			this.fixture.appendChild(view);

			let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
			assert.strictEqual(factoredView.getAddedChild(0), undefined);
			
			pChildRefHandler.add("textVarRepeat1to3InGroupOtherAttribute", "one2");
			
			let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
			let factored = pRepeatingElementFactory.getFactored(0);
			assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

			let factoredSpec = this.dependencies.pRepeatingElementFactory.getSpec(0);
			let expectedSpec = {
				"path": ["textVarRepeat1to3InGroupOtherAttribute.one2"],
				"pChildRefHandlerView": factoredView,
				"pChildRefHandler": pChildRefHandler,
				"userCanRemove": true,
				"userCanMove": true,
				"userCanAddBefore": true
			};
			assert.stringifyEqual(factoredSpec, expectedSpec);

		});

QUnit.test("testRepeatingElement", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	this.spec.textStyle = "textStyleTest";
	this.spec.childStyle = "childStyleTest";
	this.spec.textStyleMinimized = "textStyleMinimizedTest";
	this.spec.childStyleMinimized = "childStyleMinimizedTest";

	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);

	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);
	pChildRefHandler.add("textVariableId", "one");
	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

	let factoredSpec = pRepeatingElementFactory.getSpec(0);

	let expectedSpec = {
		"path": ["textVariableId.one"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": true,
		"userCanMove": true,
		"userCanAddBefore": true
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);

	// subscription
	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 4);

	let firstSubsription = subscriptions[3];

	assert.strictEqual(firstSubsription.type, "remove");
	assert.deepEqual(firstSubsription.path, ["textVariableId.one"]);

	firstSubsription.functionToCall();

	assert.deepEqual(factoredView.getRemovedChild(0), factored.getView());
	assert.deepEqual(this.dependencies.pubSub.getUnsubscriptions()[0],
		firstSubsription.subscriptionId);

});
QUnit.test("testRepeatingElementOutputMode", function(assert) {
	this.spec.mode = "output";
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));

	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);

	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	pChildRefHandler.add("textVariableId", "one");
	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;

	let factoredSpec = pRepeatingElementFactory.getSpec(0);
	
	let expectedSpec = {
		"path": ["textVariableId.one"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": false,
		"userCanMove": false,
		"userCanAddBefore": false
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
});

QUnit.test("testRepeatingElement0to1", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat0to1"));

	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);

	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	pChildRefHandler.add("textVariableId", "one");
	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;

	let factoredSpec = pRepeatingElementFactory.getSpec(0);
	
	let expectedSpec = {
		"path": ["textVariableId.one"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": true,
		"userCanMove": false,
		"userCanAddBefore": false
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
});

QUnit.test("testRepeatingElementStaticNoOfChildrenNoAddButton", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat3to3"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.ok(pChildRefHandler.isRepeating === true);
	assert.ok(pChildRefHandler.isStaticNoOfChildren === true);

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "pVarTextVariableId",
		"isRepeating": true,
		"addText": "+ Exempel textvariabel",
		"mode": "input"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
	assert.strictEqual(factoredSpec.addMethod, undefined);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);
	pChildRefHandler.add("textVariableId", "one");
	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

	let factoredRepeatingSpec = pRepeatingElementFactory.getSpec(0);

	let expectedRepeatingSpec = {
		"path": ["textVariableId.one"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": false,
		"userCanMove": true,
		"userCanAddBefore": false
	};
	assert.stringifyEqual(factoredRepeatingSpec, expectedRepeatingSpec);
});

QUnit.test("testDragButtonHidden", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.ok(pChildRefHandler.isRepeating === true);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);
	pChildRefHandler.add("textVariableId", "one");
	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

	assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 1);
	assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "two");
	assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 1);
	assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 1);
});

QUnit.test("testDragButtonHiddenNotCalledForModeOutput", function(assert) {
	this.spec.mode = "output";
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.ok(pChildRefHandler.isRepeating === true);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);
	pChildRefHandler.add("textVariableId", "one");
	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

	assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "two");
	assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 0);
});

QUnit.test("testHideAddAndAddBeforeButtonWhenMaxRepeat", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "one");
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 1);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 1);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "two");
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 2);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 2);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "three");
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 2);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 1);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 2);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 1);
});

QUnit.test("testShowAddAndAddBeforeButtonWhenBelowMaxRepeat", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "one");
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 1);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 1);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "two");
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 2);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 2);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "three");
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 2);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 1);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 2);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 1);

	// call remove function in pChildRefHandler
	this.dependencies.pubSub.getSubscriptions()[3].functionToCall();
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 3);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 1);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 3);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 1);
});


QUnit.test("testHideAndShowAddAndAddBeforeButtonNotCalledWhenBelowMaxRepeat", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat0to1"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "one");
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 1);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	// call remove function in pChildRefHandler
	this.dependencies.pubSub.getSubscriptions()[3].functionToCall();
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 1);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 1);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);
});

QUnit.test("testHideChildrensRemoveAndAddBeforeButtonWhenAtMinRepeat", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 0);
	assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "one");
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 1);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 0);
	assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 1);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 1);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "two");
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 2);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 1);
	assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 1);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 2);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

	// call remove function in pChildRefHandler
	this.dependencies.pubSub.getSubscriptions()[3].functionToCall();
	assert.strictEqual(factoredView.getShowButtonViewCalled(), 3);
	assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 1);
	assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 2);
	assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 3);
	assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);
});
QUnit.test("testHideChildrensRemoveAndAddBeforeButtonWhenAtMinRepeatNotCalledForModeOutput",
	function(assert) {
		this.spec.mode = "output";
		this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		let view = pChildRefHandler.getView();
		this.fixture.appendChild(view);

		let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

		pChildRefHandler.add("textVariableId", "one");
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

		pChildRefHandler.add("textVariableId", "two");
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);

		// call remove function in pChildRefHandler
		this.dependencies.pubSub.getSubscriptions()[2].functionToCall();
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);
	});

QUnit.test("testShowAddAndAddBeforeButtonWhenBelowMaxRepeatWhenNoPermission", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	this.spec.hasWritePermissionsForRecordPart = false;
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.addMethod, undefined);
});

QUnit.test("testHandleMessageRightMetadataId", function(assert) {
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleMsg({
		"metadataId": "textVariableId"
	}, "x/y/z/add");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
});

QUnit.test("testHandleMessageMatchingNameInDataAndAttribute", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleMsg({
		"metadataId": "textVarRepeat1to3InGroupOneAttribute",
		"nameInData": "textVarRepeat1to3InGroupOneAttribute",
		"attributes": {
			"recordTypeTypeCollectionVar": ["aFinalValue"]
		}
	}, "x/y/z/add");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
});

QUnit.test("testHandleMessageMatchingNameInDataAndMoreGenericAttributeDefinition",
	function(assert) {
		this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
			.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
		this.spec.cPresentation = CORA.coraData(this.metadataProvider
			.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
		let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		let view = pChildRefHandler.getView();
		this.fixture.appendChild(view);

		pChildRefHandler.handleMsg({
			"metadataId": "textVarRepeat1to3InGroupOneAttribute",
			"nameInData": "textVarRepeat1to3InGroupOneAttribute",
			"attributes": {
				"recordTypeTypeCollectionVar": ["aOtherFinalValue"]
			}
		}, "x/y/z/add");

		let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	});

QUnit.test("testHandleMessageMatchingNameInDataWrongAttribute", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleMsg({
		"metadataId": "textVarRepeat1to3InGroupOneAttribute",
		"nameInData": "textVarRepeat1to3InGroupOneAttribute",
		"attributes": {
			"recordTypeTypeCollectionVarNOT": ["aFinalValue"]
		}
	}, "x/y/z/add");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored, undefined);
	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);
});

QUnit.test("testHandleMessageMatchingNameInDataNoAttribute", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleMsg({
		"metadataId": "textVarRepeat1to3InGroupOneAttribute",
		"nameInData": "textVarRepeat1to3InGroupOneAttribute",
		"attributes": {}
	}, "x/y/z/add");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored, undefined);
	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);
});

QUnit.test("testHandleMessageMatchingNameInDataMissingAttribute", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleMsg({
		"metadataId": "textVarRepeat1to3InGroupOneAttribute",
		"nameInData": "textVarRepeat1to3InGroupOneAttribute"
	}, "x/y/z/add");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored, undefined);
	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);
});

QUnit.test("testHandleMessageMatchingNameInDataNoAttributeInMetadata", function(assert) {
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleMsg({
		// textVarRepeat1to3InGroupOneAttribute (existing metadataId but not the
		// one used here)
		"metadataId": "textVarRepeat1to3InGroupOneAttribute",
		"nameInData": "textVariableId"
	}, "x/y/z/add");

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
});

QUnit.test("testHandleMessageNotRightMetadataId", function(assert) {
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleMsg({
		"metadataId": "textVariableIdNOT"
	});

	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	let factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored, undefined);
	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedChild(0), undefined);
});

QUnit.test("testWithAlternative", function(assert) {
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);

	pChildRefHandler.add("textVariableId", "one");

	let pRepeatingElement = this.dependencies.pRepeatingElementFactory.getFactored(0);
	assert.ok(pRepeatingElement.getPresentationMinimized() !== undefined);
	assert.strictEqual(pRepeatingElement.getPresentationSize(), "bothEqual");
});

QUnit.test("testWithAlternativePresentationSize", function(assert) {
	this.spec.presentationSize = "firstSmaller";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);

	pChildRefHandler.add("textVariableId", "one");

	let pRepeatingElement = this.dependencies.pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(pRepeatingElement.getPresentationSize(), "firstSmaller");
});

QUnit.test("testPresentationMatchingNameInData", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("presentationVarGroup"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("recordInfoPGroup"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationId, "recordInfoPGroup");
});

QUnit.test("testPresentationMatchingNameInDataAndAttributes", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("presentationVarAttributeGroup"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("recordInfoAttributePGroup"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationId, "recordInfoAttributePGroup");
});

QUnit.test("testPresentationNonMatchingNameInDataAndAttributes", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("presentationVarAttributeGroup"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("recordInfoPGroup"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.className, "fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfo");
});

QUnit.test("testPresentationNonMatchingNameInDataAndAttributes2", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("presentationVarGroup"));
	this.spec.cPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("recordInfoAttributePGroup"));
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.className,
		"fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfoAttribute");
});

QUnit.test("testSubscibeToNewElementsAddedWhenMinNumberOfRepeatingToShowIsSet", function(assert) {
	this.spec.minNumberOfRepeatingToShow = "1";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);

	// subscription
	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 4);

	let firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");

	let secondSubscription = subscriptions[1];
	assert.strictEqual(secondSubscription.type, "move");

	let thirdSubscription = subscriptions[2];
	assert.strictEqual(thirdSubscription.type, "newElementsAdded");
	assert.deepEqual(thirdSubscription.path, []);
	assert.strictEqual(thirdSubscription.functionToCall, pChildRefHandler.newElementsAdded);
});

QUnit.test("testNewElementsAddedNotEnough", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	this.spec.minNumberOfRepeatingToShow = "1";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	// unsubscription
	let unsubscriptions = this.dependencies.pubSub.getUnsubscriptions();
	assert.deepEqual(unsubscriptions.length, 0);

	pChildRefHandler.newElementsAdded();
	let addData = {
		"childReference": {
			"children": [{
				"name": "ref",
				"children": [{
					"name": "linkedRecordType",
					"value": "metadataTextVariable"
				}, {
					"name": "linkedRecordId",
					"value": "textVariableId"
				}]
			}, {
				"name": "repeatMin",
				"value": "1"
			}, {
				"name": "repeatMax",
				"value": "3"
			}],
			"name": "childReference",
			"repeatId": "1"
		},
		"metadataId": "textVariableId",
		"nameInData": "textVariableId",
		"path": [],
		"recordPartPermissionCalculator": this.recordPartPermissionCalculator
	};
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray()[0], addData);
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray().length, 1);

	// unsubscription
	let unsubscriptions2 = this.dependencies.pubSub.getUnsubscriptions();
	assert.deepEqual(unsubscriptions2.length, 1);
});

QUnit.test("testNewElementsAddedNotEnoughOneAlreadyAdded", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	this.spec.minNumberOfRepeatingToShow = "2";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	pChildRefHandler.add("textVariableId");
	pChildRefHandler.newElementsAdded();
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray().length, 1);
});

QUnit.test("testNewElementsAddedNotEnoughOneAlreadyAddedTwoshouldBeAdded", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	this.spec.minNumberOfRepeatingToShow = "3";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	pChildRefHandler.add("textVariableId");
	pChildRefHandler.newElementsAdded();
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray().length, 2);
});

QUnit.test("testNewElementsAddedNotEnoughOneAlreadyAddedTwoshouldBeAdded", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	this.spec.minNumberOfRepeatingToShow = "4";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	pChildRefHandler.add("textVariableId");
	pChildRefHandler.add("textVariableId");
	pChildRefHandler.add("textVariableId");
	pChildRefHandler.newElementsAdded();
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray().length, 0);
});


QUnit.test("testAddTextIsPickedFromSpecWhenExistInSpec", function(assert) {
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.spec.childStyle = "someChildStyle";
	this.spec.textStyle = "someTextStyle";
	this.spec.addText = "some_other_addButtonText";
	this.spec.mode = "input";
	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	let view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(view, factoredView.getView());

	let factoredSpec = this.dependencies.pChildRefHandlerViewFactory.getSpec(0);
	let expectedSpec = {
		"presentationId": "pVarTextVariableId",
		"isRepeating": false,
		"addText": "+ translated_some_other_addButtonText",
		"mode": "input",
		"textStyle": "someTextStyle",
		"childStyle": "someChildStyle"
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
});

QUnit.test("testRepeatingElementSpecWhenRepeatingButNoWritePermission", function(assert) {
	this.spec.cParentMetadata = CORA.coraData(this.metadataProvider
		.getMetadataById("groupIdOneTextChildRepeat1to3"));
	this.spec.hasWritePermissionsForRecordPart = false;

	let pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);

	let factoredView = this.dependencies.pChildRefHandlerViewFactory.getFactored(0);
	pChildRefHandler.add("textVariableId", "one");
	let pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;

	let factoredSpec = pRepeatingElementFactory.getSpec(0);
	
	let expectedSpec = {
		"path": ["textVariableId.one"],
		"pChildRefHandlerView": factoredView,
		"pChildRefHandler": pChildRefHandler,
		"userCanRemove": false,
		"userCanMove": false,
		"userCanAddBefore": false
	};
	assert.stringifyEqual(factoredSpec, expectedSpec);
});
