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
QUnit.module("login/pChildRefHandlerTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let spec;
	let metadataProvider;
	let textProvider;
	let pubSub;
	let jsBookkeeper;
	let presentationFactory;
	let recordPartPermissionCalculator;
	let pChildRefHandlerViewFactory;
	let pRepeatingElementFactory;
	let ajaxCallFactory;
	let fixture;
	let record;
	let data;
	let data2;
	let data3;
	let files1;
	let files1to3;
	
	let pChildRefHandler;
	let view;

	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");
		setupDependencies();
		setupSpec();
		createExampleRecord();
		createExampleData();
	});
	
	hooks.afterEach(() => {
		//no after
	});

	const setupDependencies = function() {
		metadataProvider = new MetadataProviderStub();
		textProvider = CORATEST.textProviderSpy();
		pubSub = CORATEST.pubSubSpy();
		jsBookkeeper = CORATEST.jsBookkeeperSpy();
		presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		pChildRefHandlerViewFactory = CORATEST.standardFactorySpy("pChildRefHandlerViewSpy");
		pRepeatingElementFactory = CORATEST.standardFactorySpy("pRepeatingElementSpy");
		ajaxCallFactory = CORATEST.ajaxCallFactorySpy();
		dependencies = {
			metadataProvider: metadataProvider,
			textProvider: textProvider,
			pubSub: pubSub,
			presentationFactory: presentationFactory,
			jsBookkeeper: jsBookkeeper,
			recordTypeProvider: CORATEST.recordTypeProviderStub(),
			uploadManager: CORATEST.uploadManagerSpy(),
			ajaxCallFactory: ajaxCallFactory,
			pChildRefHandlerViewFactory: pChildRefHandlerViewFactory,
			pRepeatingElementFactory: pRepeatingElementFactory,
			dataDivider: "systemY"
		};
	};
	
	const setupSpec = function() {
		recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();

		spec = {
			parentPath: [],
			cParentMetadata: getCMetadata("groupIdOneTextChild"),
			cPresentation: getCMetadata("pVarTextVariableId"),
			cAlternativePresentation: getCMetadata("pVarTextVariableIdOutput"),
			cParentPresentation : {"value":"someDummyDataToSeeThatItIsPassedAlong"},
			presentationSize: "bothEqual",
			mode: "input",
			hasWritePermissionsForRecordPart: true,
			recordPartPermissionCalculator: recordPartPermissionCalculator
		};
	};
	
	const createExampleRecord = function(){
		record = {
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
	};
	const createExampleData = function(){
		data = {
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
      			"name": "adminInfo",
      			"children": [{   				
          			"name": "visibility",
          			"value": "unpublished"
        		}]
    		},{
				name: "originalFileName",
				value: "someFile.tif"
			},{
				name: "expectedFileSize",
				value: "1234567890"
			}],
			"attributes": {
				"type": "generic"
			}
		};
		data2 = {
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
      			"name": "adminInfo",
      			"children": [{   				
          			"name": "visibility",
          			"value": "unpublished"
        		}]
    		},{
				name: "originalFileName",
				value: "someFile2.tif"
			},{
				name: "expectedFileSize",
				value: "9876543210"
			}],
			"attributes": {
				"type": "generic"
			}
		};
		data3 = {
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
      			"name": "adminInfo",
      			"children": [{   				
          			"name": "visibility",
          			"value": "unpublished"
        		}]
    		},{
				name: "originalFileName",
				value: "someFile3.tif"
			},{
				name: "expectedFileSize",
				value: "1122334455"
			}],
			attributes: {
				type: "generic"
			}
		};

		files1 = [];
		let file1 = {
			"name": "someFile.tif",
			"size": 1234567890
		};
		files1.push(file1);

		files1to3 = [];
		files1to3.push(file1);
		let file2 = {
			"name": "someFile2.tif",
			"size": 9876543210
		};
		files1to3.push(file2);
		let file3 = {
			"name": "someFile3.tif",
			"size": 1122334455
		};
		files1to3.push(file3);
	};
	
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
			"record": record
		});
		let answer = {
			"spec": ajaxCallSpy0.getSpec(),
			"responseText": jsonRecord
		};
		ajaxCallSpy0.getSpec().loadMethod(answer);
	};
	
	const getCMetadata = function(id){
		return CORA.coraData(metadataProvider.getMetadataById(id))
	};
	
	const createPChildRefHandlerSetItAndView = function(){
		pChildRefHandler = CORA.pChildRefHandler(dependencies, spec);
		view = pChildRefHandler.getView();
		fixture.appendChild(view);
	};
	
	test("testInit", assert => {
		createPChildRefHandlerSetItAndView();
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
	
	test("testInitViewIsFromFactoredView", assert => {
		spec.childStyle = "someChildStyle";
		spec.textStyle = "someTextStyle";
		spec.mode = "input";
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(view, factoredView.getView());
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
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
	
	test("testInitViewIsFromFactoredViewOutputMode", assert => {
		spec.childStyle = "someChildStyle";
		spec.textStyle = "someTextStyle";
		spec.mode = "output";
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(view, factoredView.getView());
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
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
	
	test("testChildMoved", assert => {
		createPChildRefHandlerSetItAndView();
	
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
	
		assert.deepEqual(jsBookkeeper.getMoveDataArray()[0], moveData);
	});
	
	test("testChildMovedUsingMessage", assert => {
		createPChildRefHandlerSetItAndView();
	
		let moveMessageData = {
			"path": [],
			"metadataId": "textVariableId",
			"moveChild": ["textVariableId.one"],
			"basePositionOnChild": ["textVariableId.two"],
			"newPosition": "after"
		};
		pChildRefHandler.handleMsg(moveMessageData, "root/move");
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
	
		assert.deepEqual(factoredView.getMovedChild(0), moveMessageData);
	});
	
	test("testInitRepeatingVariableNoOfChildren", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1toX");
		createPChildRefHandlerSetItAndView();
	
		assert.ok(pChildRefHandler.isRepeating === true);
		assert.ok(pChildRefHandler.isStaticNoOfChildren === false);
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(view, factoredView.getView());
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			"presentationId": "pVarTextVariableId",
			"isRepeating": true,
			"addText": "+ translated_textVariableIdText",
			"mode": "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);
	
		// subscription
		let subscriptions = pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 4);
	});
	
	test("testInitRepeatingStaticNoOfChildren", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat3to3");
		createPChildRefHandlerSetItAndView();
	
		assert.ok(pChildRefHandler.isRepeating === true);
		assert.ok(pChildRefHandler.isStaticNoOfChildren === true);
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			"presentationId": "pVarTextVariableId",
			"isRepeating": true,
			"addText": "+ translated_textVariableIdText",
			"mode": "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, undefined);
	
		// subscription
		let subscriptions = pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 4);
	});
	
	test("testAddButtonFor1toX", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1toX");
		createPChildRefHandlerSetItAndView();
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			"presentationId": "pVarTextVariableId",
			"isRepeating": true,
			"addText": "+ translated_textVariableIdText",
			"mode": "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);
	});
	
	test("testSendAdd", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1toX");
		createPChildRefHandlerSetItAndView();
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
			"recordPartPermissionCalculator": recordPartPermissionCalculator
		};
		assert.deepEqual(jsBookkeeper.getAddDataArray()[0], expectedAddData);
		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 1);
		assert.deepEqual(messages[0].type, "newElementsAdded");
	});
	
	test("testSendAddBefore", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1toX");
		createPChildRefHandlerSetItAndView();
		let dataFake = {
			path: "someFakePath"
		};
		pChildRefHandler.sendAddBefore(dataFake);
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
			"recordPartPermissionCalculator": recordPartPermissionCalculator
		};
		assert.deepEqual(jsBookkeeper.getAddBeforeDataArray()[0], addBeforeData);
		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 1);
		assert.deepEqual(messages[0].type, "newElementsAdded");
	});
	
	test("testAddButtonWithAttributes", assert => {
		spec.cParentMetadata = getCMetadata("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
		spec.cPresentation = getCMetadata("pgTextVarRepeat1to3InGroupOneAttribute");
		createPChildRefHandlerSetItAndView();
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			"presentationId": "pgTextVarRepeat1to3InGroupOneAttribute",
			"isRepeating": true,
			"addText": "+ translated_textVarRepeat1to3InGroupOneAttributeText",
			"mode": "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);
		pChildRefHandler.sendAdd();
	
		let addedData = jsBookkeeper.getAddDataArray()[0];
	
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
			"recordPartPermissionCalculator": recordPartPermissionCalculator
		};
		assert.deepEqual(addedData, addData);
	});
	
	test("testUploadButtonFor0toX", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneChildOfBinaryRecordLinkChild");
		spec.cPresentation = getCMetadata("myChildOfBinaryPLink");
		createPChildRefHandlerSetItAndView();
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
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
	
	test("testHandleFilesSendingOneFile", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneChildOfBinaryRecordLinkChild");
		spec.cPresentation = getCMetadata("myChildOfBinaryPLink");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleFiles(files1);
	
		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "binary");
	
		assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);
	
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(data));
	});
	
	test("testHandleFilesSendingOneBinaryFile",	assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneBinaryRecordLinkChild");
		spec.cPresentation = getCMetadata("myBinaryPLink");
		createPChildRefHandlerSetItAndView();

		pChildRefHandler.handleFiles(files1);

		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "binary");

		assert
			.strictEqual(ajaxCallSpy0.getSpec().loadMethod,
				pChildRefHandler.processNewBinary);

		let dataCopy = JSON.parse(JSON.stringify(data));
		dataCopy.attributes.type = "generic";
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(dataCopy));
	});
	
	test("testHandleFilesSendingOneFileError", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneChildOfBinaryRecordLinkChild");
		spec.cPresentation = getCMetadata("myChildOfBinaryPLink");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleFiles(files1);
	
		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "binary");
	
		assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);
	
		ajaxCallSpy0.getSpec().errorMethod({
			"status": 404
		});
	
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(data));
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0).innerHTML, "404");
	});
	
	test("testHandleFilesReceiveAnswerForOneFile", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneChildOfBinaryRecordLinkChild");
		spec.cPresentation = getCMetadata("myChildOfBinaryPLink");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleFiles(files1);
	
		answerCall(ajaxCallFactory, 0);
	
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
			"recordPartPermissionCalculator": recordPartPermissionCalculator
		};
		assert.deepEqual(jsBookkeeper.getAddDataArray()[0], addData);
	
		let setValueData = {
			"data": "image:333759270435575",
			"path": ["myChildOfBinaryLink.dummyRepeatId","linkedRecordIdTextVar"]
		}
		assert.deepEqual(jsBookkeeper.getDataArray()[0], setValueData);
	
	});
	
	test("testHandleFilesSavingMainRecordAfterReceiveAnswerForOneFile", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneChildOfBinaryRecordLinkChild");
		spec.cPresentation = getCMetadata("myChildOfBinaryPLink");
		createPChildRefHandlerSetItAndView();
	
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
	
	test("testHandleFilesSendingMoreThanOneFile", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneChildOfBinaryRecordLinkChild");
		spec.cPresentation = getCMetadata("myChildOfBinaryPLink");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleFiles(files1to3);
	
		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(data));
	
		let ajaxCallSpy1 = ajaxCallFactory.getFactored(1);
		assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(data2));
	
		let ajaxCallSpy2 = ajaxCallFactory.getFactored(2);
		assert.strictEqual(ajaxCallSpy2.getSpec().data, JSON.stringify(data3));
	
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
	
	test("testHandleFilesSendingMoreFilesThanAllowed", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneChildOfBinaryRecordLinkChildRepeatMax2");
		spec.cPresentation = getCMetadata("myChildOfBinaryPLink");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleFiles(files1to3);
	
		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(data));
	
		let ajaxCallSpy1 = ajaxCallFactory.getFactored(1);
		assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(data2));
	
		let ajaxCallSpy2 = ajaxCallFactory.getFactored(2);
		assert.strictEqual(ajaxCallSpy2, undefined);
	
		answerCall(ajaxCallFactory, 0);
		answerCall(ajaxCallFactory, 1);
	
		let messages = pubSub.getMessages();
		assert.deepEqual(messages.length, 3);
		assert.deepEqual(messages[2].type, "updateRecord");
	});
	
	test("testHandleFilesSendingMoreFilesThanAllowedDifferentRequest", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneChildOfBinaryRecordLinkChildRepeatMax2");
		spec.cPresentation = getCMetadata("myChildOfBinaryPLink");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleFiles(files1);
	
		let ajaxCallSpy0 = ajaxCallFactory.getFactored(0);
		assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(data));
	
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
	
		let ajaxCallSpy1 = ajaxCallFactory.getFactored(1);
		assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(data2));
	
		let ajaxCallSpy2 = ajaxCallFactory.getFactored(2);
		assert.strictEqual(ajaxCallSpy2, undefined);
	
	});
	
	test("testAddButtonShownFor0to1", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat0to1");
		createPChildRefHandlerSetItAndView();
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			"presentationId": "pVarTextVariableId",
			"isRepeating": false,
			"addText": "+ translated_textVariableIdText",
			"mode": "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, pChildRefHandler.sendAdd);
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getShowButtonViewCalled(), 0);
		assert.strictEqual(factoredView.getHideButtonViewCalled(), 0);
	});
	
	test("testAddOneChild", assert => {
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	
		pChildRefHandler.add("textVariableId");
	
		
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
	
		let factoredPresentationSpec = presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.path, ["textVariableId"]);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
		assert.strictEqual(factoredPresentationSpec.cPresentation,
			spec.cPresentation);
		assert.strictEqual(factoredPresentationSpec.cParentPresentation,
			spec.cParentPresentation);
		assert.strictEqual(factoredPresentationSpec.recordPartPermissionCalculator,
			spec.recordPartPermissionCalculator);
	});
	
	test("testAddOneChildModeOutput", assert => {
		spec.mode = "output";
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	
		pChildRefHandler.add("textVariableId");
	
		
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
	
		let factoredPresentationSpec = presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});
	
	test("testAddOneChildBinary", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneChildOfBinaryRecordLinkChild");
		spec.cPresentation = getCMetadata("myChildOfBinaryPLink");
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	
		pChildRefHandler.add("textVariableId");
	
		
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
	
		let factoredPresentationSpec = presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});
	
	test("testAddOneChildWithRepeatId", assert => {
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	
		pChildRefHandler.add("textVariableId", "one");
	
		
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
	
		let factoredPresentationSpec = presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});
	
	test("testAddOneChildWithOneLevelPath", assert => {
		spec.parentPath = ["textVariableId"];
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	
		pChildRefHandler.add("textVariableId");
	
		
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
	
		let factoredPresentationSpec = presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});
	
	test("testAddOneChildWithTwoLevelPath", assert => {
		spec.parentPath =["textVariableId","textVariableId"];
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	
		pChildRefHandler.add("textVariableId");
	
		
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
	
		let factoredPresentationSpec = presentationFactory.getSpec(0);
		assert.deepEqual(factoredPresentationSpec.metadataIdUsedInData, "textVariableId");
	});
	
	test("testAddChildWithAttributesInPath", assert => {
		spec.cParentMetadata = getCMetadata("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup");
		spec.cPresentation = getCMetadata("pgTextVarRepeat1to3InGroupOtherAttribute");
		createPChildRefHandlerSetItAndView();

		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
		
		pChildRefHandler.add("textVarRepeat1to3InGroupOtherAttribute", "one2");
		
		
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());

		let factoredSpec = pRepeatingElementFactory.getSpec(0);
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
	
	test("testRepeatingElement", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		spec.textStyle = "textStyleTest";
		spec.childStyle = "childStyleTest";
		spec.textStyleMinimized = "textStyleMinimizedTest";
		spec.childStyleMinimized = "childStyleMinimizedTest";
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
		pChildRefHandler.add("textVariableId", "one");
		
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
	
	test("testRepeatingElementOutputMode", assert => {
		spec.mode = "output";
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		pChildRefHandler.add("textVariableId", "one");
		
	
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
	
	test("testRepeatingElement0to1", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat0to1");
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		pChildRefHandler.add("textVariableId", "one");
		
	
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
	
	test("testRepeatingElementStaticNoOfChildrenNoAddButton", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat3to3");
		createPChildRefHandlerSetItAndView();
	
		assert.ok(pChildRefHandler.isRepeating === true);
		assert.ok(pChildRefHandler.isStaticNoOfChildren === true);
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
		let expectedSpec = {
			"presentationId": "pVarTextVariableId",
			"isRepeating": true,
			"addText": "+ translated_textVariableIdText",
			"mode": "input"
		};
		assert.stringifyEqual(factoredSpec, expectedSpec);
		assert.strictEqual(factoredSpec.addMethod, undefined);
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
		pChildRefHandler.add("textVariableId", "one");
		
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
	
	test("testDragButtonHidden", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		createPChildRefHandlerSetItAndView();
	
		assert.ok(pChildRefHandler.isRepeating === true);
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
		pChildRefHandler.add("textVariableId", "one");
		
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	
		assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 1);
		assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 0);
	
		pChildRefHandler.add("textVariableId", "two");
		assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 1);
		assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 1);
	});
	
	test("testDragButtonHiddenNotCalledForModeOutput", assert => {
		spec.mode = "output";
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		createPChildRefHandlerSetItAndView();
	
		assert.ok(pChildRefHandler.isRepeating === true);
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
		pChildRefHandler.add("textVariableId", "one");
		
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	
		assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 0);
	
		pChildRefHandler.add("textVariableId", "two");
		assert.strictEqual(factoredView.getHideChildrensDragButtonCalled(), 0);
		assert.strictEqual(factoredView.getShowChildrensDragButtonCalled(), 0);
	});
	
	test("testHideAddAndAddBeforeButtonWhenMaxRepeat", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
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
	
	test("testShowAddAndAddBeforeButtonWhenBelowMaxRepeat", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
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
	
	
	test("testHideAndShowAddAndAddBeforeButtonNotCalledWhenBelowMaxRepeat", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat0to1");
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
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
	
	test("testHideChildrensRemoveAndAddBeforeButtonWhenAtMinRepeat", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
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
	test("testHideChildrensRemoveAndAddBeforeButtonWhenAtMinRepeatNotCalledForModeOutput", assert => {
		spec.mode = "output";
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		createPChildRefHandlerSetItAndView();

		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
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
	
	test("testShowAddAndAddBeforeButtonWhenBelowMaxRepeatWhenNoPermission", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		spec.hasWritePermissionsForRecordPart = false;
		createPChildRefHandlerSetItAndView();
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
		assert.strictEqual(factoredSpec.addMethod, undefined);
	});
	
	test("testHandleMessageRightMetadataId", assert => {
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleMsg({
			"metadataId": "textVariableId"
		}, "x/y/z/add");
	
		
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	});
	
	test("testHandleMessageMatchingNameInDataAndAttribute", assert => {
		spec.cParentMetadata = getCMetadata("textVarRepeat1to3InGroupParentAttribute1toXInGroup");
		spec.cPresentation = getCMetadata("pgTextVarRepeat1to3InGroupParentAttribute");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleMsg({
			"metadataId": "textVarRepeat1to3InGroupOneAttribute",
			"nameInData": "textVarRepeat1to3InGroupOneAttribute",
			"attributes": {
				"recordTypeTypeCollectionVar": ["aFinalValue"]
			}
		}, "x/y/z/add");
	
		
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	});
	
	test("testHandleMessageMatchingNameInDataAndMoreGenericAttributeDefinition", assert => {
		spec.cParentMetadata = getCMetadata("textVarRepeat1to3InGroupParentAttribute1toXInGroup");
		spec.cPresentation = getCMetadata("pgTextVarRepeat1to3InGroupParentAttribute");
		createPChildRefHandlerSetItAndView();

		pChildRefHandler.handleMsg({
			"metadataId": "textVarRepeat1to3InGroupOneAttribute",
			"nameInData": "textVarRepeat1to3InGroupOneAttribute",
			"attributes": {
				"recordTypeTypeCollectionVar": ["aOtherFinalValue"]
			}
		}, "x/y/z/add");

		
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	});
	
	test("testHandleMessageMatchingNameInDataWrongAttribute", assert => {
		spec.cParentMetadata = getCMetadata("textVarRepeat1to3InGroupParentAttribute1toXInGroup");
		spec.cPresentation = getCMetadata("pgTextVarRepeat1to3InGroupParentAttribute");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleMsg({
			"metadataId": "textVarRepeat1to3InGroupOneAttribute",
			"nameInData": "textVarRepeat1to3InGroupOneAttribute",
			"attributes": {
				"recordTypeTypeCollectionVarNOT": ["aFinalValue"]
			}
		}, "x/y/z/add");
	
		
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factored, undefined);
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	});
	
	test("testHandleMessageMatchingNameInDataNoAttribute", assert => {
		spec.cParentMetadata = getCMetadata("textVarRepeat1to3InGroupParentAttribute1toXInGroup");
		spec.cPresentation = getCMetadata("pgTextVarRepeat1to3InGroupParentAttribute");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleMsg({
			"metadataId": "textVarRepeat1to3InGroupOneAttribute",
			"nameInData": "textVarRepeat1to3InGroupOneAttribute",
			"attributes": {}
		}, "x/y/z/add");
	
		
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factored, undefined);
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	});
	
	test("testHandleMessageMatchingNameInDataMissingAttribute", assert => {
		spec.cParentMetadata = getCMetadata("textVarRepeat1to3InGroupParentAttribute1toXInGroup");
		spec.cPresentation = getCMetadata("pgTextVarRepeat1to3InGroupParentAttribute");
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleMsg({
			"metadataId": "textVarRepeat1to3InGroupOneAttribute",
			"nameInData": "textVarRepeat1to3InGroupOneAttribute"
		}, "x/y/z/add");
	
		
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factored, undefined);
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	});
	
	test("testHandleMessageMatchingNameInDataNoAttributeInMetadata", assert => {
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleMsg({
			// textVarRepeat1to3InGroupOneAttribute (existing metadataId but not the
			// one used here)
			"metadataId": "textVarRepeat1to3InGroupOneAttribute",
			"nameInData": "textVariableId"
		}, "x/y/z/add");
	
		
		let factored = pRepeatingElementFactory.getFactored(0);
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), factored.getView());
	});
	
	test("testHandleMessageNotRightMetadataId", assert => {
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.handleMsg({
			"metadataId": "textVariableIdNOT"
		});
	
		
		let factored = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(factored, undefined);
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getAddedChild(0), undefined);
	});
	
	test("testWithAlternative", assert => {
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.add("textVariableId", "one");
	
		let pRepeatingElement = pRepeatingElementFactory.getFactored(0);
		assert.ok(pRepeatingElement.getPresentationMinimized() !== undefined);
		assert.strictEqual(pRepeatingElement.getPresentationSize(), "bothEqual");
	});
	
	test("testWithAlternativePresentationSize", assert => {
		spec.presentationSize = "firstSmaller";
		createPChildRefHandlerSetItAndView();
	
		pChildRefHandler.add("textVariableId", "one");
	
		let pRepeatingElement = pRepeatingElementFactory.getFactored(0);
		assert.strictEqual(pRepeatingElement.getPresentationSize(), "firstSmaller");
	});
	
	test("testPresentationMatchingNameInData", assert => {
		spec.cParentMetadata = getCMetadata("presentationVarGroup");
		spec.cPresentation = getCMetadata("recordInfoPGroup");
		createPChildRefHandlerSetItAndView();
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
		assert.strictEqual(factoredSpec.presentationId, "recordInfoPGroup");
	});
	
	test("testPresentationMatchingNameInDataAndAttributes", assert => {
		spec.cParentMetadata = getCMetadata("presentationVarAttributeGroup");
		spec.cPresentation = getCMetadata("recordInfoAttributePGroup");
		createPChildRefHandlerSetItAndView();
	
		fixture.appendChild(view);
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
		assert.strictEqual(factoredSpec.presentationId, "recordInfoAttributePGroup");
	});
	
	test("testPresentationNonMatchingNameInDataAndAttributes", assert => {
		spec.cParentMetadata = getCMetadata("presentationVarAttributeGroup");
		spec.cPresentation = getCMetadata("recordInfoPGroup");
		createPChildRefHandlerSetItAndView();
	
		assert.strictEqual(view.className, "fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfo");
	});
	
	test("testPresentationNonMatchingNameInDataAndAttributes2", assert => {
		spec.cParentMetadata = getCMetadata("presentationVarGroup");
		spec.cPresentation = getCMetadata("recordInfoAttributePGroup");
		createPChildRefHandlerSetItAndView();
	
		assert.strictEqual(view.className,
			"fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfoAttribute");
	});
	
	test("testSubscibeToNewElementsAddedWhenMinNumberOfRepeatingToShowIsSet", assert => {
		spec.minNumberOfRepeatingToShow = "1";
		createPChildRefHandlerSetItAndView();
	
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
	
	test("testNewElementsAddedNotEnough", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		spec.minNumberOfRepeatingToShow = "1";
		createPChildRefHandlerSetItAndView();
		// unsubscription
		let unsubscriptions = pubSub.getUnsubscriptions();
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
			"recordPartPermissionCalculator": recordPartPermissionCalculator
		};
		assert.deepEqual(jsBookkeeper.getAddDataArray()[0], addData);
		assert.deepEqual(jsBookkeeper.getAddDataArray().length, 1);
	
		// unsubscription
		let unsubscriptions2 = pubSub.getUnsubscriptions();
		assert.deepEqual(unsubscriptions2.length, 1);
	});
	
	test("testNewElementsAddedNotEnoughOneAlreadyAdded", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		spec.minNumberOfRepeatingToShow = "2";
		createPChildRefHandlerSetItAndView();
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.newElementsAdded();
		assert.deepEqual(jsBookkeeper.getAddDataArray().length, 1);
	});
	
	test("testNewElementsAddedNotEnoughOneAlreadyAddedTwoshouldBeAdded", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		spec.minNumberOfRepeatingToShow = "3";
		createPChildRefHandlerSetItAndView();
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.newElementsAdded();
		assert.deepEqual(jsBookkeeper.getAddDataArray().length, 2);
	});
	
	test("testNewElementsAddedNotEnoughOneAlreadyAddedTwoshouldBeAdded", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		spec.minNumberOfRepeatingToShow = "4";
		createPChildRefHandlerSetItAndView();
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.add("textVariableId");
		pChildRefHandler.newElementsAdded();
		assert.deepEqual(jsBookkeeper.getAddDataArray().length, 0);
	});
	
	
	test("testAddTextIsPickedFromSpecWhenExistInSpec", assert => {
		spec.childStyle = "someChildStyle";
		spec.textStyle = "someTextStyle";
		spec.addText = "some_other_addButtonText";
		spec.mode = "input";
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(view, factoredView.getView());
	
		let factoredSpec = pChildRefHandlerViewFactory.getSpec(0);
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
	
	test("testRepeatingElementSpecWhenRepeatingButNoWritePermission", assert => {
		spec.cParentMetadata = getCMetadata("groupIdOneTextChildRepeat1to3");
		spec.hasWritePermissionsForRecordPart = false;
	
		createPChildRefHandlerSetItAndView();
	
		let factoredView = pChildRefHandlerViewFactory.getFactored(0);
		pChildRefHandler.add("textVariableId", "one");
		
	
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

});
