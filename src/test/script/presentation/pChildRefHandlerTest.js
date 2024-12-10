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
QUnit.module.only("presentation/pChildRefHandlerTest.js", hooks => {
	const test = QUnit.test;
	let fixture;
	let dependencies;
	let metadataProvider;
	let pubSub;
	let textProvider;
	let ajaxCallFactory;
	
	let recordPartPermissionCalculator;
	let spec;
	let record;
	let dataBinaryRecord;
	let dataBinaryRecord2;
	let dataBinaryRecord3;
	let files1;
	let file1;
	let file2;
	let file3;
	let files1to3;

	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");
		metadataProvider = new MetadataProviderStub();
		pubSub = CORATEST.pubSubSpy();
		textProvider = CORATEST.textProviderStub();
		ajaxCallFactory = CORATEST.standardFactorySpy("ajaxCallSpy");
		dependencies = {
			metadataProvider: metadataProvider,
			pubSub: pubSub,
			textProvider: textProvider,
			presentationFactory: CORATEST.standardFactorySpy("presentationSpy"),
			jsBookkeeper: CORATEST.jsBookkeeperSpy(),
			recordTypeProvider: CORATEST.recordTypeProviderStub(),
			uploadManager: CORATEST.uploadManagerSpy(),
			ajaxCallFactory: ajaxCallFactory,
			pChildRefHandlerViewFactory: CORATEST.standardFactorySpy("pChildRefHandlerViewSpy"),
			pRepeatingElementFactory: CORATEST.standardFactorySpy("pRepeatingElementSpy"),
			dataDivider: "systemY"
		};
		recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();

		spec = {
			parentPath: [],
			cParentMetadata: CORA.coraData(metadataProvider
				.getMetadataById("groupIdOneTextChild")),
			cPresentation: CORA.coraData(metadataProvider
				.getMetadataById("pVarTextVariableId")),
			cAlternativePresentation: CORA.coraData(metadataProvider
				.getMetadataById("pVarTextVariableIdOutput")),
			cParentPresentation: { value: "someDummyDataToSeeThatItIsPassedAlong" },
			presentationSize: "bothEqual",
			mode: "input",
			hasWritePermissionsForRecordPart: true,
			recordPartPermissionCalculator: recordPartPermissionCalculator
		};

		record = {
			data: {
				children: [{
					children: [{
						children: [{
							name: "linkedRecordType",
							value: "system"
						}, {
							name: "linkedRecordId",
							value: "alvin"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://localhost:8080/therest/rest/record/system/alvin",
								accept: "application/vnd.uub.record+json"
							}
						},
						name: "dataDivider"
					}, {
						name: "id",
						value: "image:333759270435575"
					}, {
						name: "type",
						value: "image"
					}, {
						name: "createdBy",
						children: [{
							name: "linkedRecordType",
							value: "user"
						}, {
							name: "linkedRecordId",
							value: "userId"
						}]
					}],
					name: "recordInfo"
				}, {
					name: "fileName",
					value: "someFileName"
				}, {
					name: "fileSize",
					value: "1234567890"
				}],
				name: "binary"
			},
			actionLinks: {
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://localhost:8080/therest/rest/record/image/"
						+ "image:333759270435575",
					accept: "application/vnd.uub.record+json"
				},
				update: {
					requestMethod: "POST",
					rel: "update",
					contentType: "application/vnd.uub.record+json",
					url: "http://localhost:8080/therest/rest/record/image/"
						+ "image:333759270435575",
					accept: "application/vnd.uub.record+json"
				},
				delete: {
					requestMethod: "DELETE",
					rel: "delete",
					url: "http://localhost:8080/therest/rest/record/image/"
						+ "image:333759270435575"
				},
				upload: {
					requestMethod: "POST",
					rel: "upload",
					contentType: "multipart/form-data",
					url: "http://localhost:8080/therest/rest/record/image/"
						+ "image:333759270435575/upload",
					accept: "application/vnd.uub.record+json"
				}
			}

		};

		dataBinaryRecord = {
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
				}, {
					name: "validationType",
					children: [{
						name: "linkedRecordType",
						value: "validationType"
					}, {
						name: "linkedRecordId",
						value: "genericBinary"
					}]
				}]
			}, {
				name: "adminInfo",
				children: [{
					name: "visibility",
					value: "unpublished"
				}]
			}, {
				name: "originalFileName",
				value: "someFile.tif"
			}, {
				name: "expectedFileSize",
				value: "1234567890"
			}],
			attributes: {
				"type": "generic"
			}
		};

		dataBinaryRecord2 = {
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
				}, {
					name: "validationType",
					children: [{
						name: "linkedRecordType",
						value: "validationType"
					}, {
						name: "linkedRecordId",
						value: "genericBinary"
					}]
				}]
			}, {
				name: "adminInfo",
				children: [{
					name: "visibility",
					value: "unpublished"
				}]
			}, {
				name: "originalFileName",
				value: "someFile2.tif"
			}, {
				name: "expectedFileSize",
				value: "9876543210"
			}],
			attributes: {
				"type": "generic"
			}
		};

		dataBinaryRecord3 = {
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
				}, {
					name: "validationType",
					children: [{
						name: "linkedRecordType",
						value: "validationType"
					}, {
						name: "linkedRecordId",
						value: "genericBinary"
					}]
				}]
			}, {
				name: "adminInfo",
				children: [{
					name: "visibility",
					value: "unpublished"
				}]
			}, {
				name: "originalFileName",
				value: "someFile3.tif"
			}, {
				name: "expectedFileSize",
				value: "1122334455"
			}],
			attributes: {
				type: "generic"
			}
		};

		files1 = [];
		file1 = {
			name: "someFile.tif",
			size: 1234567890
		};
		files1.push(file1);

		files1to3 = [];
		files1to3.push(file1);
		file2 = {
			name: "someFile2.tif",
			size: 9876543210
		};
		files1to3.push(file2);
		file3 = {
			name: "someFile3.tif",
			size: 1122334455
		};
		files1to3.push(file3);
	});
	hooks.afterEach(() => {
		//no after
	});

	const assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy, recordType) {
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/"
			+ recordType + "/");
		assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
		assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
		assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.record+json");
	};

	const answerCall = function(ajaxCallFactory, no) {
		let ajaxCallSpy0 = ajaxCallFactory.getFactored(no);
		let jsonRecord = JSON.stringify({
			record: record
		});
		let answer = {
			spec: ajaxCallSpy0.getSpec(),
			responseText: jsonRecord
		};
		ajaxCallSpy0.getSpec().loadMethod(answer);
	};

	test("testInit", function(assert) {
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);
		assert.ok(pChildRefHandler.isRepeating === false);
		assert.ok(pChildRefHandler.isStaticNoOfChildren === true);

		// subscription
		let subscriptions = pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 4);

		let firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "add");
		assert.deepEqual(firstSubsription.path, []);
		assert.ok(firstSubsription.functionToCall === pChildRefHandler.handleMsg);

		let secondSubscription = subscriptions[1];
		assert.strictEqual(secondSubscription.type, "move");
		assert.deepEqual(secondSubscription.path, []);
		assert.ok(secondSubscription.functionToCall === pChildRefHandler.handleMsg);

		let thirdSubscription = subscriptions[2];
		assert.strictEqual(thirdSubscription.type, "newElementsAdded");
		assert.deepEqual(thirdSubscription.path, []);
		assert.ok(thirdSubscription.functionToCall === pChildRefHandler.newElementsAdded);

		let fourthSubscription = subscriptions[3];
		assert.strictEqual(fourthSubscription.type, "addUpToMinNumberOfRepeating");
		assert.deepEqual(fourthSubscription.path, []);
		assert.ok(fourthSubscription.functionToCall === pChildRefHandler.newElementsAdded);
	});

	test("testInitViewIsFromFactoredView", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.childStyle = "someChildStyle";
		spec.textStyle = "someTextStyle";
		spec.mode = "input";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(view, factoredView.getView());

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "pVarTextVariableId",
			isRepeating: false,
			addText: "+ translated_textVariableIdText",
			mode: "input",
			textStyle: "someTextStyle",
			childStyle: "someChildStyle"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
	});

	test("testInitViewIsFromFactoredViewOutputMode", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.childStyle = "someChildStyle";
		spec.textStyle = "someTextStyle";
		spec.mode = "output";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(view, factoredView.getView());

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "pVarTextVariableId",
			isRepeating: false,
			addText: "+ translated_textVariableIdText",
			mode: "output",
			textStyle: "someTextStyle",
			childStyle: "someChildStyle"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
	});

	test("testChildMoved", function(assert) {
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let moveDataFromPChildRefHandlerView = {
			moveChild: ["textVariableId.1"],
			basePositionOnChild: ["textVariableId.two"],
			newPosition: "after"
		};

		let moveData = {
			path: [],
			metadataId: "textVariableId",
			moveChild: ["textVariableId.1"],
			basePositionOnChild: ["textVariableId.two"],
			newPosition: "after"
		};
		pChildRefHandler.childMoved(moveDataFromPChildRefHandlerView);

		assert.deepEqual(dependencies.jsBookkeeper.getMoveDataArray()[0], moveData);
	});

	test("testChildMovedUsingMessage", function(assert) {
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let moveMessageData = {
			path: [],
			metadataId: "textVariableId",
			moveChild: ["textVariableId.one"],
			basePositionOnChild: ["textVariableId.two"],
			newPosition: "after"
		};
		pChildRefHandler.handleMsg(moveMessageData, "root/move");
		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);

		assert.deepEqual(factoredView.getMovedChild(0), moveMessageData);
	});

	test("testInitRepeatingVariableNoOfChildren", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1toX"));

		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		assert.ok(pChildRefHandler.isRepeating === true);
		assert.ok(pChildRefHandler.isStaticNoOfChildren === false);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(view, factoredView.getView());

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "pVarTextVariableId",
			isRepeating: true,
			addText: "+ Exempel textvariabel",
			mode: "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);

		// subscription
		let subscriptions = pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 4);
	});

	test("testInitRepeatingStaticNoOfChildren", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat3to3"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		assert.ok(pChildRefHandler.isRepeating === true);
		assert.ok(pChildRefHandler.isStaticNoOfChildren === true);

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "pVarTextVariableId",
			isRepeating: true,
			addText: "+ Exempel textvariabel",
			mode: "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, undefined);

		// subscription
		let subscriptions = pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 4);
	});

	test("testAddButtonFor1toX", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1toX"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "pVarTextVariableId",
			isRepeating: true,
			addText: "+ Exempel textvariabel",
			mode: "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);
	});

	test("testSendAdd", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1toX"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		pChildRefHandler.sendAdd();
		let expectedAddData = {
			childReference: {
				children: [{
					name: "ref",
					children: [{
						name: "linkedRecordType",
						value: "metadataTextVariable"
					}, {
						name: "linkedRecordId",
						value: "textVariableId"
					}]
				}, {
					name: "repeatMin",
					value: "1"
				}, {
					name: "repeatMax",
					value: "X"
				}],
				name: "childReference",
				repeatId: "1"
			},
			metadataId: "textVariableId",
			nameInData: "textVariableId",
			path: [],
			recordPartPermissionCalculator: recordPartPermissionCalculator
		};
		assert.deepEqual(dependencies.jsBookkeeper.getAddDataArray()[0], expectedAddData);
		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 1);
		assert.deepEqual(messages[0].type, "newElementsAdded");
	});

	test("testSendAddBefore", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1toX"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let data = {
			path: "someFakePath"
		};
		pChildRefHandler.sendAddBefore(data);
		let addBeforeData = {
			childReference: {
				children: [{
					name: "ref",
					children: [{
						name: "linkedRecordType",
						value: "metadataTextVariable"
					}, {
						name: "linkedRecordId",
						value: "textVariableId"
					}]
				}, {
					name: "repeatMin",
					value: "1"
				}, {
					name: "repeatMax",
					value: "X"
				}],
				name: "childReference",
				repeatId: "1"
			},
			metadataId: "textVariableId",
			nameInData: "textVariableId",
			path: [],
			addBeforePath: "someFakePath",
			recordPartPermissionCalculator: recordPartPermissionCalculator
		};
		assert.deepEqual(dependencies.jsBookkeeper.getAddBeforeDataArray()[0], addBeforeData);
		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 1);
		assert.deepEqual(messages[0].type, "newElementsAdded");
	});

	test("testAddButtonWithAttributes", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pgTextVarRepeat1to3InGroupOneAttribute"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "pgTextVarRepeat1to3InGroupOneAttribute",
			isRepeating: true,
			addText: "+ textVarRepeat1to3InGroupOneAttributeText",
			mode: "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);
		pChildRefHandler.sendAdd();

		let addedData = dependencies.jsBookkeeper.getAddDataArray()[0];

		let addData = {
			metadataId: "textVarRepeat1to3InGroupOneAttribute",
			path: [],
			childReference: {
				name: "childReference",
				repeatId: "1",
				children: [
					{
						name: "ref",
						children: [
							{
								name: "linkedRecordType",
								value: "metadataTextVariable"
							},
							{
								name: "linkedRecordId",
								value: "textVarRepeat1to3InGroupOneAttribute"
							}
						]
					},
					{
						name: "repeatMin",
						value: "0"
					},
					{
						name: "repeatMax",
						value: "2"
					}
				]
			},
			nameInData: "textVarRepeat1to3InGroupOneAttribute",
			attributes: {
				anAttribute: [
					"aFinalValue"
				]
			},
			recordPartPermissionCalculator: recordPartPermissionCalculator
		};
		assert.deepEqual(addedData, addData);
	});

	test("testUploadButtonFor0toX", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "myChildOfBinaryPLink",
			isRepeating: true,
			addText: "+ translated_myChildOfBinaryLinkText",
			mode: "input",
			upload: "true"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, undefined);
	});

	test("testHandleFilesSendingOneFile", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleFiles(files1);

		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "binary");

		assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);

		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(dataBinaryRecord));
	});

	test("testHandleFilesSendingOneBinaryFile", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneBinaryRecordLinkChild"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleFiles(files1);

		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "binary");

		assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);

		dataBinaryRecord = JSON.parse(JSON.stringify(dataBinaryRecord));
		dataBinaryRecord.attributes.type = "generic";
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(dataBinaryRecord));
	});

	test("testHandleFilesSendingOneFileError", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleFiles(files1);

		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "binary");

		assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);

		ajaxCallSpy0.getSpec().errorMethod({
			"status": 404
		});

		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(dataBinaryRecord));

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0).innerHTML, "404");
	});

	test("testHandleFilesReceiveAnswerForOneFile", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleFiles(files1);

		answerCall(ajaxCallFactory, 0);

		let addData = {
			childReference: {
				children: [{
					name: "ref",
					children: [{
						name: "linkedRecordType",
						value: "metadataRecordLink"
					}, {
						name: "linkedRecordId",
						value: "myChildOfBinaryLink"
					}]
				}, {
					name: "repeatMin",
					value: "0"
				}, {
					name: "repeatMax",
					value: "X"
				}],
				name: "childReference",
				repeatId: "one"
			},
			metadataId: "myChildOfBinaryLink",
			nameInData: "myChildOfBinaryLink",
			path: [],
			recordPartPermissionCalculator: recordPartPermissionCalculator
		};
		assert.deepEqual(dependencies.jsBookkeeper.getAddDataArray()[0], addData);

		let setValueData = {
			data: "image:333759270435575",
			path: ["myChildOfBinaryLink.dummyRepeatId", "linkedRecordIdTextVar"]
		}
		assert.deepEqual(dependencies.jsBookkeeper.getDataArray()[0], setValueData);

	});

	test("testHandleFilesSavingMainRecordAfterReceiveAnswerForOneFile", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleFiles(files1);

		answerCall(ajaxCallFactory, 0);

		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 2);
		assert.deepEqual(messages[1].type, "updateRecord");

		// send more files
		pChildRefHandler.handleFiles(files1);
		answerCall(ajaxCallFactory, 1);
		assert.deepEqual(messages.length, 4);
		assert.deepEqual(messages[1].type, "updateRecord");
		assert.deepEqual(messages[3].type, "updateRecord");

	});

	test("testHandleFilesSendingMoreThanOneFile", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleFiles(files1to3);

		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(dataBinaryRecord));

		let ajaxCallSpy1 = ajaxCallFactory.getFactored(1);
		assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(dataBinaryRecord2));

		let ajaxCallSpy2 = ajaxCallFactory.getFactored(2);
		assert.strictEqual(ajaxCallSpy2.getSpec().data, JSON.stringify(dataBinaryRecord3));

		answerCall(ajaxCallFactory, 0);
		answerCall(ajaxCallFactory, 1);
		answerCall(ajaxCallFactory, 2);

		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 4);
		assert.deepEqual(messages[3].type, "updateRecord");

		let uploadManagerSpy = dependencies.uploadManager;
		assert.ok(uploadManagerSpy.wasUploadCalled());

		let uploadSpecs = uploadManagerSpy.uploadSpecs;
		let uploadSpec1 = uploadSpecs[0];
		let expectedUploadSpec1 = {
			file: {
				name: "someFile.tif",
				size: 1234567890
			},
			uploadLink: {
				accept: "application/vnd.uub.record+json",
				contentType: "multipart/form-data",
				rel: "upload",
				requestMethod: "POST",
				url: "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload"
			}
		};
		assert.deepEqual(uploadSpec1, expectedUploadSpec1);

		let uploadSpec2 = uploadSpecs[1];
		let expectedUploadSpec2 = {
			file: {
				name: "someFile2.tif",
				size: 9876543210
			},
			uploadLink: {
				accept: "application/vnd.uub.record+json",
				contentType: "multipart/form-data",
				rel: "upload",
				requestMethod: "POST",
				url: "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload"
			}
		};
		assert.deepEqual(uploadSpec2, expectedUploadSpec2);

		let uploadSpec3 = uploadSpecs[2];
		let expectedUploadSpec3 = {
			file: {
				name: "someFile3.tif",
				size: 1122334455
			},
			uploadLink: {
				accept: "application/vnd.uub.record+json",
				contentType: "multipart/form-data",
				rel: "upload",
				requestMethod: "POST",
				url: "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload"
			}
		};
		assert.deepEqual(uploadSpec3, expectedUploadSpec3);

	});

	test("testHandleFiles1to1ExistingFile", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChildRepeat1to1"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);
		pChildRefHandler.add("myChildOfBinaryLink", "0");
		let subscriptions = pubSub.getSubscriptions();
		let setValueSubscription = subscriptions[subscriptions.length - 2];
		//		console.log("setValueSubscription", setValueSubscription)
		//		assert.strictEqual(subscriptions.length, 2)
		let setValueBinaryIdMethod = setValueSubscription.functionToCall;
		let setValueData = {
			path: ['myChildOfBinaryLink.0', 'linkedRecordIdTextVar'],
			data: "someBinaryId"
		};
		setValueBinaryIdMethod(setValueData);

		pChildRefHandler.handleFiles(files1to3);

		assertNoOfNewBinaryCreated(assert, 0);
	});

	test("testHandleFiles1to1DefaultShownOneEmptyLink", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChildRepeat1to1"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);
		pChildRefHandler.add("myChildOfBinaryLink", "0");
		let subscriptions = pubSub.getSubscriptions();
		let setValueSubscription = subscriptions[subscriptions.length - 2];
		let setValueBinaryIdMethod = setValueSubscription.functionToCall;
		let setValueData = {
			path: ['myChildOfBinaryLink.0', 'linkedRecordIdTextVar'],
			data: ""
		};
		setValueBinaryIdMethod(setValueData);

		pChildRefHandler.handleFiles(files1to3);

		assertNoOfNewBinaryCreated(assert, 1);
	});

	const assertNoOfNewBinaryCreated = function(assert, noOfNewBinaryCreated) {
		assert.strictEqual(ajaxCallFactory.getNoOfFactored(), noOfNewBinaryCreated);
	};

	test("testHandleFilesSendingMoreFilesThanAllowed", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChildRepeatMax2"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleFiles(files1to3);

		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(dataBinaryRecord));

		let ajaxCallSpy1 = ajaxCallFactory.getFactored(1);
		assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(dataBinaryRecord2));

		let ajaxCallSpy2 = ajaxCallFactory.getFactored(2);
		assert.strictEqual(ajaxCallSpy2, undefined);

		answerCall(ajaxCallFactory, 0);
		answerCall(ajaxCallFactory, 1);

		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 3);
		assert.deepEqual(messages[2].type, "updateRecord");

	});

	test("testHandleFilesSendingMoreFilesThanAllowedDifferentRequest", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChildRepeatMax2"));
		spec.cPresentation = CORA.coraData(metadataProvider.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleFiles(files1);

		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(dataBinaryRecord));

		pChildRefHandler.handleMsg({
			metadataId: "myChildOfBinaryLink"
		}, "x/y/z/add");

		let files2 = [];
		let file2 = {
			name: "someFile2.tif",
			size: 9876543210
		};
		files2.push(file2);
		let file3 = {
			name: "someFile3.tif",
			size: 1122334455
		};
		files2.push(file3);
		pChildRefHandler.handleFiles(files2);

		let ajaxCallSpy1 = ajaxCallFactory.getFactored(1);
		assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(dataBinaryRecord2));

		let ajaxCallSpy2 = ajaxCallFactory.getFactored(2);
		assert.strictEqual(ajaxCallSpy2, undefined);

	});

	test("testAddButtonShownFor0to1", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat0to1"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "pVarTextVariableId",
			isRepeating: false,
			addText: "+ Exempel textvariabel",
			mode: "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	});

	test("testAddOneChild", function(assert) {
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);

		pChildRefHandler.add("textVariableId");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredSpec = pRepeatingElementFactory.getSpec(0);
		let expectedSpec = {
			path: ["textVariableId"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: false,
			userCanMove: false,
			userCanAddBefore: false
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
		assert.deepEqual(factoredSpec.path, ["textVariableId"]);

		let factoredPresentationSpec = dependencies.presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.path, ["textVariableId"]);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
		assert.strictEqual(factoredPresentationSpec.cPresentation,
			spec.cPresentation);
		assert.strictEqual(factoredPresentationSpec.cParentPresentation,
			spec.cParentPresentation);
		assert.strictEqual(factoredPresentationSpec.recordPartPermissionCalculator,
			spec.recordPartPermissionCalculator);
	});

	test("testAddOneChildModeOutput", function(assert) {
		spec.mode = "output";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);

		pChildRefHandler.add("textVariableId");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredSpec = pRepeatingElementFactory.getSpec(0);
		let expectedSpec = {
			path: ["textVariableId"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: false,
			userCanMove: false,
			userCanAddBefore: false
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		assert.deepEqual(factoredSpec.path, ["textVariableId"]);

		let factoredPresentationSpec = dependencies.presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});
	test("testAddOneChildBinary", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("myChildOfBinaryPLink"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);

		pChildRefHandler.add("textVariableId");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredSpec = pRepeatingElementFactory.getSpec(0);

		let expectedSpec = {
			path: ["textVariableId"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: true,
			userCanMove: true,
			userCanAddBefore: false
		};

		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		assert.deepEqual(factoredSpec.path, ["textVariableId"]);

		let factoredPresentationSpec = dependencies.presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});

	test("testAddOneChildWithRepeatId", function(assert) {
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);

		pChildRefHandler.add("textVariableId", "one");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		let factoredSpec = pRepeatingElementFactory.getSpec(0);
		let expectedSpec = {
			path: ["textVariableId.one"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: false,
			userCanMove: false,
			userCanAddBefore: false
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);

		let factoredPresentationSpec = dependencies.presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});

	test("testAddOneChildWithOneLevelPath", function(assert) {
		spec.parentPath = ["textVariableId"];

		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);

		pChildRefHandler.add("textVariableId");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());


		let factoredSpec = pRepeatingElementFactory.getSpec(0);
		let expectedSpec = {
			path: ["textVariableId", "textVariableId"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: false,
			userCanMove: false,
			userCanAddBefore: false
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);

		let factoredPresentationSpec = dependencies.presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});

	test("testAddOneChildWithTwoLevelPath", function(assert) {

		spec.parentPath = ["textVariableId", "textVariableId"];
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);

		pChildRefHandler.add("textVariableId");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		let factoredSpec = pRepeatingElementFactory.getSpec(0);
		let expectedSpec = {
			path: ["textVariableId", "textVariableId", "textVariableId"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: false,
			userCanMove: false,
			userCanAddBefore: false
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);

		let factoredPresentationSpec = dependencies.presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});

	test("testAddChildWithAttributesInPath", function(assert) {
		spec.cParentMetadata = CORA
			.coraData(metadataProvider
				.getMetadataById("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pgTextVarRepeat1to3InGroupOtherAttribute"));

		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();

		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);

		pChildRefHandler.add("textVarRepeat1to3InGroupOtherAttribute", "one2");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		let factoredSpec = dependencies.pRepeatingElementFactory.getSpec(0);
		let expectedSpec = {
			path: ["textVarRepeat1to3InGroupOtherAttribute.one2"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: true,
			userCanMove: true,
			userCanAddBefore: true
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);

	});

	test("testRepeatingElement", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		spec.textStyle = "textStyleTest";
		spec.childStyle = "childStyleTest";
		spec.textStyleMinimized = "textStyleMinimizedTest";
		spec.childStyleMinimized = "childStyleMinimizedTest";

		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);

		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
		pChildRefHandler.add("textVariableId", "one");
		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		let factoredSpec = pRepeatingElementFactory.getSpec(0);

		let expectedSpec = {
			path: ["textVariableId.one"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: true,
			userCanMove: true,
			userCanAddBefore: true
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);

		// subscription
		let subscriptions = pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 5);

		let firstSubsription = subscriptions[4];

		assert.strictEqual(firstSubsription.type, "remove");
		assert.deepEqual(firstSubsription.path, ["textVariableId.one"]);

		firstSubsription.functionToCall();

		assert.deepEqual(factoredView.getRemovedChild(0), factored.getView());
		assert.deepEqual(pubSub.getUnsubscriptions()[0],
			firstSubsription.subscriptionId);
	});

	test("testRepeatingElementOutputMode", function(assert) {
		spec.mode = "output";
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));

		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);

		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		pChildRefHandler.add("textVariableId", "one");
		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;

		let factoredSpec = pRepeatingElementFactory.getSpec(0);

		let expectedSpec = {
			path: ["textVariableId.one"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: false,
			userCanMove: false,
			userCanAddBefore: false
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
	});

	test("testRepeatingElement0to1", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat0to1"));

		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);

		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		pChildRefHandler.add("textVariableId", "one");
		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;

		let factoredSpec = pRepeatingElementFactory.getSpec(0);

		let expectedSpec = {
			path: ["textVariableId.one"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: true,
			userCanMove: false,
			userCanAddBefore: false
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
	});

	test("testRepeatingElementStaticNoOfChildrenNoAddButton", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat3to3"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		assert.ok(pChildRefHandler.isRepeating === true);
		assert.ok(pChildRefHandler.isStaticNoOfChildren === true);

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "pVarTextVariableId",
			isRepeating: true,
			addText: "+ Exempel textvariabel",
			mode: "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, undefined);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
		pChildRefHandler.add("textVariableId", "one");
		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		let factoredRepeatingSpec = pRepeatingElementFactory.getSpec(0);

		let expectedRepeatingSpec = {
			path: ["textVariableId.one"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: false,
			userCanMove: true,
			userCanAddBefore: false
		};
		assert.stringifyEqual(factoredRepeatingSpec, expectedRepeatingSpec);
	});

	test("testDragButtonHidden", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		assert.ok(pChildRefHandler.isRepeating === true);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
		pChildRefHandler.add("textVariableId", "one");
		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 1);
		assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 0);

		pChildRefHandler.add("textVariableId", "two");
		assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 1);
		assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 1);
	});

	test("testDragButtonHiddenNotCalledForModeOutput", function(assert) {
		spec.mode = "output";
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		assert.ok(pChildRefHandler.isRepeating === true);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
		pChildRefHandler.add("textVariableId", "one");
		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 0);

		pChildRefHandler.add("textVariableId", "two");
		assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 0);
	});

	test("testHideAddAndAddBeforeButtonWhenMaxRepeat", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
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

	test("testShowAddAndAddBeforeButtonWhenBelowMaxRepeat", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
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
		pubSub.getSubscriptions()[4].functionToCall();
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 3);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 1);
		assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 3);
		assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 1);
	});


	test("testHideAndShowAddAndAddBeforeButtonNotCalledWhenBelowMaxRepeat", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat0to1"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
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
		pubSub.getSubscriptions()[4].functionToCall();
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 1);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 1);
		assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);
	});

	test("testHideChildrensRemoveAndAddBeforeButtonWhenAtMinRepeat", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
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
		pubSub.getSubscriptions()[4].functionToCall();
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 3);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 1);
		assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 2);
		assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 3);
		assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);
	});

	test("testHideChildrensRemoveAndAddBeforeButtonWhenAtMinRepeatNotCalledForModeOutput", function(assert) {
		spec.mode = "output";
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
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
		pubSub.getSubscriptions()[2].functionToCall();
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensRemoveButtonCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensAddBeforeButtonCalled(), 0);
		assert.strictEqual(factoredView.getHideChildrensAddBeforeButtonCalled(), 0);
	});

	test("testShowAddAndAddBeforeButtonWhenBelowMaxRepeatWhenNoPermission", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		spec.hasWritePermissionsForRecordPart = false;
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		assert.strictEqual(factoredSpec.addMethod, undefined);
	});

	test("testHandleMessageRightMetadataId", function(assert) {
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleMsg({
			metadataId: "textVariableId"
		}, "x/y/z/add");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	});

	test("testHandleMessageMatchingNameInDataAndAttribute", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleMsg({
			metadataId: "textVarRepeat1to3InGroupOneAttribute",
			nameInData: "textVarRepeat1to3InGroupOneAttribute",
			attributes: {
				"recordTypeTypeCollectionVar": ["aFinalValue"]
			}
		}, "x/y/z/add");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	});

	test("testHandleMessageMatchingNameInDataAndMoreGenericAttributeDefinition",
		function(assert) {
			spec.cParentMetadata = CORA.coraData(metadataProvider
				.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
			spec.cPresentation = CORA.coraData(metadataProvider
				.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
			let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
			let view = pChildRefHandler.getView();
			fixture.appendChild(view);

			pChildRefHandler.handleMsg({
				metadataId: "textVarRepeat1to3InGroupOneAttribute",
				nameInData: "textVarRepeat1to3InGroupOneAttribute",
				attributes: {
					"recordTypeTypeCollectionVar": ["aOtherFinalValue"]
				}
			}, "x/y/z/add");

			let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
			let factored = pRepeatingElementFactory.getFactored(0);
			let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
			assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
		});

	test("testHandleMessageMatchingNameInDataWrongAttribute", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleMsg({
			metadataId: "textVarRepeat1to3InGroupOneAttribute",
			nameInData: "textVarRepeat1to3InGroupOneAttribute",
			attributes: {
				"recordTypeTypeCollectionVarNOT": ["aFinalValue"]
			}
		}, "x/y/z/add");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factored, undefined);
		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	});

	test("testHandleMessageMatchingNameInDataNoAttribute", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleMsg({
			metadataId: "textVarRepeat1to3InGroupOneAttribute",
			nameInData: "textVarRepeat1to3InGroupOneAttribute",
			attributes: {}
		}, "x/y/z/add");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factored, undefined);
		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	});

	test("testHandleMessageMatchingNameInDataMissingAttribute", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleMsg({
			metadataId: "textVarRepeat1to3InGroupOneAttribute",
			nameInData: "textVarRepeat1to3InGroupOneAttribute"
		}, "x/y/z/add");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factored, undefined);
		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	});

	test("testHandleMessageMatchingNameInDataNoAttributeInMetadata", function(assert) {
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleMsg({
			// textVarRepeat1to3InGroupOneAttribute (existing metadataId but not the
			// one used here)
			metadataId: "textVarRepeat1to3InGroupOneAttribute",
			nameInData: "textVariableId"
		}, "x/y/z/add");

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	});

	test("testHandleMessageNotRightMetadataId", function(assert) {
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		pChildRefHandler.handleMsg({
			metadataId: "textVariableIdNOT"
		});

		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factored, undefined);
		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	});

	test("testWithAlternative", function(assert) {
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);

		pChildRefHandler.add("textVariableId", "one");

		let pRepeatingElement = dependencies.pRepeatingElementFactory.getFactored(0);
		assert.ok(pRepeatingElement.getPresentationMinimized() !== undefined);
		assert.strictEqual(pRepeatingElement.getPresentationSize(), "bothEqual");
	});

	test("testWithAlternativePresentationSize", function(assert) {
		spec.presentationSize = "firstSmaller";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);

		pChildRefHandler.add("textVariableId", "one");

		let pRepeatingElement = dependencies.pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(pRepeatingElement.getPresentationSize(), "firstSmaller");
	});

	test("testPresentationMatchingNameInData", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("presentationVarGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("recordInfoPGroup"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		assert.strictEqual(factoredSpec.presentationId, "recordInfoPGroup");
	});

	test("testPresentationMatchingNameInDataAndAttributes", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("presentationVarAttributeGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("recordInfoAttributePGroup"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		assert.strictEqual(factoredSpec.presentationId, "recordInfoAttributePGroup");
	});

	test("testPresentationNonMatchingNameInDataAndAttributes", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("presentationVarAttributeGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("recordInfoPGroup"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		assert.strictEqual(view.className, "fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfo");
	});

	test("testPresentationNonMatchingNameInDataAndAttributes2", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("presentationVarGroup"));
		spec.cPresentation = CORA.coraData(metadataProvider
			.getMetadataById("recordInfoAttributePGroup"));
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		assert.strictEqual(view.className,
			"fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfoAttribute");
	});

	test("testSubscibeToNewElementsAddedWhenMinNumberOfRepeatingToShowIsSet", function(assert) {
		spec.minNumberOfRepeatingToShow = "1";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);

		// subscription
		let subscriptions = pubSub.getSubscriptions();
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

	test("testNewElementsAddedNotEnough", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		spec.minNumberOfRepeatingToShow = "1";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		// unsubscription
		let unsubscriptions = pubSub.getUnsubscriptions();
		assert.deepEqual(unsubscriptions.length, 0);

		pChildRefHandler.newElementsAdded();
		let addData = {
			childReference: {
				children: [{
					name: "ref",
					children: [{
						name: "linkedRecordType",
						value: "metadataTextVariable"
					}, {
						name: "linkedRecordId",
						value: "textVariableId"
					}]
				}, {
					name: "repeatMin",
					value: "1"
				}, {
					name: "repeatMax",
					value: "3"
				}],
				name: "childReference",
				repeatId: "1"
			},
			metadataId: "textVariableId",
			nameInData: "textVariableId",
			path: [],
			recordPartPermissionCalculator: recordPartPermissionCalculator
		};
		assert.deepEqual(dependencies.jsBookkeeper.getAddDataArray()[0], addData);
		assert.deepEqual(dependencies.jsBookkeeper.getAddDataArray().length, 1);

		// unsubscription
		let unsubscriptions2 = pubSub.getUnsubscriptions();
		assert.deepEqual(unsubscriptions2.length, 1);
	});

	test("testNewElementsAddedNotEnoughOneAlreadyAdded", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		spec.minNumberOfRepeatingToShow = "2";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.newElementsAdded();
		assert.deepEqual(dependencies.jsBookkeeper.getAddDataArray().length, 1);
	});

	test("testNewElementsAddedNotEnoughOneAlreadyAddedTwoshouldBeAdded", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		spec.minNumberOfRepeatingToShow = "3";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.newElementsAdded();
		assert.deepEqual(dependencies.jsBookkeeper.getAddDataArray().length, 2);
	});

	test("testNewElementsAddedNotEnoughOneAlreadyAddedTwoshouldBeAdded", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		spec.minNumberOfRepeatingToShow = "4";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.newElementsAdded();
		assert.deepEqual(dependencies.jsBookkeeper.getAddDataArray().length, 0);
	});


	test("testAddTextIsPickedFromSpecWhenExistInSpec", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		spec.childStyle = "someChildStyle";
		spec.textStyle = "someTextStyle";
		spec.addText = "some_other_addButtonText";
		spec.mode = "input";
		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		let view = pChildRefHandler.getView();
		fixture.appendChild(view);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(view, factoredView.getView());

		let factoredSpec = dependencies.pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			presentationId: "pVarTextVariableId",
			isRepeating: false,
			addText: "+ translated_some_other_addButtonText",
			mode: "input",
			textStyle: "someTextStyle",
			childStyle: "someChildStyle"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
	});

	test("testRepeatingElementSpecWhenRepeatingButNoWritePermission", function(assert) {
		spec.cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("groupIdOneTextChildRepeat1to3"));
		spec.hasWritePermissionsForRecordPart = false;

		let pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);

		let factoredView = dependencies.pChildRefHandlerViewFactory.getFactored(0);
		pChildRefHandler.add("textVariableId", "one");
		let pRepeatingElementFactory = dependencies.pRepeatingElementFactory;

		let factoredSpec = pRepeatingElementFactory.getSpec(0);

		let expectedSpec = {
			path: ["textVariableId.one"],
			pChildRefHandlerView: factoredView,
			pChildRefHandler: pChildRefHandler,
			userCanRemove: false,
			userCanMove: false,
			userCanAddBefore: false
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
	});
});