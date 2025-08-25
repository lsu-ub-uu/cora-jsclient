/*
 * Copyright 2018 Uppsala University Library
 * Copyright 2018 Olov McKIe
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
QUnit.module("presentation/containsDataTracker.js", hooks => {
	const test = QUnit.test;
	let providers;
	let dependencies;
	let metadataProvider;
	let pubSub;

	let spec;
	let containsData;
	let noOfCallsToContainsData;

	hooks.beforeEach(() => {
		containsData = undefined;
		noOfCallsToContainsData = 0
		metadataProvider = CORATEST.MetadataProviderStub();
		providers = {
			metadataProvider: metadataProvider
		};
		pubSub = CORATEST.pubSubSpy();
		dependencies = {
			pubSub: pubSub
		};
		const methodToCallOnContainsDataChange = function(containsDataIn) {
			containsData = containsDataIn;
			noOfCallsToContainsData++;
		};

		spec = {
			methodToCallOnContainsDataChange: methodToCallOnContainsDataChange,
			topLevelMetadataIds: ['groupWithOneCollectionVarChildGroup'],
			parentPath: [],
			parentMetadataId: "someParentMetadataId",
			//			cPresentation: createPresentation(),
		};
	});

	hooks.afterEach(() => {
		//no after
	});

	const createPresentation = function() {
		return CORA.coraData({
			name: "presentation",
			children: [{
				name: "recordInfo",
				children: [{
					name: "id",
					value: "somePresentationId"
				}, {
					name: "type",
					children: [{
						name: "linkedRecordType",
						value: "recordType"
					}, {
						name: "linkedRecordId",
						value: "presentationSurroundingContainer"
					}]
				}]
			}, {
				name: "presentationsOf",
				children: [{
					repeatId: "0",
					children: [{
						name: "linkedRecordType",
						value: "metadata"
					}, {
						name: "linkedRecordId",
						value: "groupWithOneCollectionVarChildGroup"
					}],
					name: "presentationOf"
				}]
			}, {
				name: "presentationsOf",
				children: [{
					repeatId: "0",
					children: [{
						name: "linkedRecordType",
						value: "metadata"
					}, {
						name: "linkedRecordId",
						value: "groupIdOneTextChild"
					}],
					name: "presentationOf"
				}]
			}]
		});
	};

	const createContainsDataTracker = function() {
		return CORA.containsDataTracker(providers, dependencies, spec);
	};

	test("testInit", function(assert) {
		let containsDataTracker = createContainsDataTracker();
		assert.strictEqual(containsDataTracker.type, "containsDataTracker");
	});

	test("testGetDependencies", function(assert) {
		let containsDataTracker = createContainsDataTracker();
		assert.strictEqual(containsDataTracker.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let containsDataTracker = createContainsDataTracker();
		assert.strictEqual(containsDataTracker.getSpec(), spec);
	});

	test("testInitSubscribesToAdd", function(assert) {
		let containsDataTracker = createContainsDataTracker();

		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 2)
		assert.strictEqual(subscriptions[0].type, "add");
		assert.stringifyEqual(subscriptions[0].path, spec.parentPath);
		assert.strictEqual(subscriptions[0].context, undefined);
		assert.strictEqual(subscriptions[0].functionToCall, containsDataTracker.possiblySubscribeOnAddMsg);

		assert.strictEqual(subscriptions[1].type, "*");
		assert.stringifyEqual(subscriptions[1].path, spec.parentPath);
		assert.strictEqual(subscriptions[1].context, undefined);
		assert.strictEqual(subscriptions[1].functionToCall, containsDataTracker.handleMsgToDeterminDataState);
	});

	test("testSubscribesWhenAdd_SameId", function(assert) {
		let containsDataTracker = createContainsDataTracker();

		let msg = "root/add";
		let dataFromMsg = {
			metadataId: "groupWithOneCollectionVarChildGroup",
			path: [],
			repeatId: "1",
			nameInData: "groupWithOneCollectionVarChildGroup"
		};
		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 2)

		containsDataTracker.possiblySubscribeOnAddMsg(dataFromMsg, msg);

		let path = ["groupWithOneCollectionVarChildGroup.1"];

		assert.strictEqual(subscriptions.length, 3)
		assert.strictEqual(subscriptions[2].type, "*");
		assert.stringifyEqual(subscriptions[2].path, path);
		assert.strictEqual(subscriptions[2].context, undefined);
		assert.strictEqual(subscriptions[2].functionToCall,
			containsDataTracker.handleMsgToDeterminDataState);
	});

	test("testSubscribesWhenAdd_OtherIdSameNameInDataAttributes", function(assert) {
//		spec.cPresentation = CORA.coraData({
//			name: "presentation",
//			children: [{
//				name: "recordInfo",
//				children: [{
//					name: "id",
//					value: "somePresentationId"
//				}, {
//					name: "type",
//					children: [{
//						name: "linkedRecordType",
//						value: "recordType"
//					}, {
//						name: "linkedRecordId",
//						value: "presentationSurroundingContainer"
//					}]
//				}]
//			}, {
//				name: "presentationsOf",
//				children: [{
//					repeatId: "0",
//					children: [{
//						name: "linkedRecordType",
//						value: "metadata"
//					}, {
//						name: "linkedRecordId",
//						value: "groupWithOneCollectionVarChildGroupOtherIdSameNameInData"
//					}],
//					name: "presentationOf"
//				}]
//			}
//			]
//		});

		spec.topLevelMetadataIds= ['groupWithOneCollectionVarChildGroup'];
				

		let containsDataTracker = createContainsDataTracker();

		let msg = "root/add";
		let dataFromMsg = {
			metadataId: "groupWithOneCollectionVarChildGroup",
			path: [],
			repeatId: "1",
			nameInData: "groupWithOneCollectionVarChildGroup"
		};
		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 2)

		containsDataTracker.possiblySubscribeOnAddMsg(dataFromMsg, msg);

		let path = ["groupWithOneCollectionVarChildGroup.1"];

		assert.strictEqual(subscriptions.length, 3)
		assert.strictEqual(subscriptions[2].type, "*");
		assert.stringifyEqual(subscriptions[2].path, path);
		assert.strictEqual(subscriptions[2].context, undefined);
		assert.strictEqual(subscriptions[2].functionToCall,
			containsDataTracker.handleMsgToDeterminDataState);
	});

	test("testSubscribesWhenAdd_OtherIdNotSameNameInDataAttributes", function(assert) {
//		spec.cPresentation = CORA.coraData({
//			name: "presentation",
//			children: [{
//				name: "recordInfo",
//				children: [{
//					name: "id",
//					value: "somePresentationId"
//				}, {
//					name: "type",
//					children: [{
//						name: "linkedRecordType",
//						value: "recordType"
//					}, {
//						name: "linkedRecordId",
//						value: "presentationSurroundingContainer"
//					}]
//				}]
//			}, {
//				name: "presentationsOf",
//				children: [{
//					repeatId: "0",
//					children: [{
//						name: "linkedRecordType",
//						value: "metadata"
//					}, {
//						name: "linkedRecordId",
//						value: "groupWithOneCollectionVarChildAndOneTextChildGroup"
//					}],
//					name: "presentationOf"
//				}]
//			}
//			]
//		});
		spec.topLevelMetadataIds= ['groupWithOneCollectionVarChildAndOneTextChildGroup'];
		let containsDataTracker = createContainsDataTracker();

		let msg = "root/add";
		let dataFromMsg = {
			metadataId: "groupWithOneCollectionVarChildGroup",
			path: [],
			repeatId: "1",
			nameInData: "groupWithOneCollectionVarChildGroup"
		};
		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 2)

		containsDataTracker.possiblySubscribeOnAddMsg(dataFromMsg, msg);

		assert.strictEqual(subscriptions.length, 2)
	});

	test("testSubscribesWhenAdd_NoSubscriptionForNonHandledMetdataId", function(assert) {
		let containsDataTracker = createContainsDataTracker();

		let msg = "root/add";
		let dataFromMsg = {
			metadataId: "groupWithOneCollectionVarChildGroupNotHandled",
			path: [],
			repeatId: "1",
			nameInData: "groupWithOneCollectionVarChildGroup"
		};
		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 2)

		containsDataTracker.possiblySubscribeOnAddMsg(dataFromMsg, msg);
		assert.strictEqual(subscriptions.length, 2)
	});

	test("testCallToMethodToCallOnContainsDataChange_onMessageForNewValue", function(assert) {
		let containsDataTracker = createContainsDataTracker();

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue",
			path: []
		};

		assert.strictEqual(containsData, undefined);

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);

		assert.strictEqual(containsData, true);
	});

	test("testCallToMethodToCallOnContainsDataChange_onMessageForBlank", function(assert) {
		let containsDataTracker = createContainsDataTracker();

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "",
			path: []
		};

		assert.strictEqual(containsData, undefined);

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);

		assert.strictEqual(containsData, false);
	});

	test("testCallToMethodToCallOnContainsDataChange_onMessageForEmptiedValue", function(assert) {
		let containsDataTracker = createContainsDataTracker();

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue",
			path: []
		};
		assert.strictEqual(containsData, undefined);

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);

		assert.strictEqual(containsData, true);

		dataFromMsg.data = "";
		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);

		assert.strictEqual(containsData, false);
	});

	test("testCallToMethodToCallOnContainsDataChange_onMessageRemovBlock", function(assert) {
		let containsDataTracker = createContainsDataTracker();

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue",
			path: ["groupWithOneCollectionVarChildGroup.1", "someNameInData"]
		};

		assert.strictEqual(containsData, undefined);

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);

		assert.strictEqual(containsData, true);

		let msg2 = "root/groupWithOneCollectionVarChildGroup.1/remove";
		let dataFromMsg2 = {
			type: "remove",
			path: ["groupWithOneCollectionVarChildGroup.1"]
		};


		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg2, msg2);

		assert.strictEqual(containsData, false);
	});

	test("testCallToMethodToCallOnContainsDataChange_onMessageTwoChildren", function(assert) {
		let containsDataTracker = createContainsDataTracker();

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue"
		};
		assert.strictEqual(containsData, undefined);

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);

		assert.strictEqual(containsData, true);

		let msg2 = "root/groupIdOneTextChild/someNameInData/setValue";
		let dataFromMsg2 = {
			data: "someValue2"
		};

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg2, msg2);


		assert.strictEqual(containsData, true);

		dataFromMsg.data = "";
		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);

		assert.strictEqual(containsData, true);

		let msg3 = "root/groupIdOneTextChild/remove";
		let dataFromMsg3 = {
			type: "remove"
		};

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg3, msg3);

		assert.strictEqual(containsData, false);
	});

	test("testCallToMethodToCallOnContainsDataChange_onlyCalledWhenStateChanges", function(assert) {
		let containsDataTracker = createContainsDataTracker();

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue",
			path: []
		};

		assert.strictEqual(containsData, undefined);
		assert.strictEqual(noOfCallsToContainsData, 0);

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(noOfCallsToContainsData, 1);
		assert.strictEqual(containsData, true);

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(noOfCallsToContainsData, 1);
		assert.strictEqual(containsData, true);

		dataFromMsg.data = "";
		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(noOfCallsToContainsData, 2);
		assert.strictEqual(containsData, false);

		containsDataTracker.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(noOfCallsToContainsData, 2);
		assert.strictEqual(containsData, false);
	});

});
