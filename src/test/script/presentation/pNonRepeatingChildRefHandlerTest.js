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
QUnit.module("presentation/pNonRepeatingChildRefHandlerTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let metadataProvider;
	let pubSub;
	let presentationFactory;
	let pNonRepeatingChildRefHandlerViewFactory;

	let recordPartPermissionCalculator;
	let spec;

	let cAlternativePresentation;

	hooks.beforeEach(() => {
		metadataProvider = CORATEST.MetadataProviderStub();
		pubSub = CORATEST.pubSubSpy();
		presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		pNonRepeatingChildRefHandlerViewFactory = CORATEST
			.standardFactorySpy("pNonRepeatingChildRefHandlerViewSpy");
		dependencies = {
			providers: {
				metadataProvider: metadataProvider
			},
			presentationFactory: presentationFactory,
			pNonRepeatingChildRefHandlerViewFactory: pNonRepeatingChildRefHandlerViewFactory,
			pubSub: pubSub
		};
		recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();

		spec = {
			parentPath: [],
			parentMetadataId: "someParentMetadataId",
			mode: "input",
			recordPartPermissionCalculator: recordPartPermissionCalculator,
			cPresentation: createPresentation(),
			cParentPresentation: {
				type: "fakeCParentPresentationObject"
			}
		};
		cAlternativePresentation = createAlternativePresentation();

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
	const createAlternativePresentation = function() {
		return CORA.coraData({
			name: "presentation",
			children: [{
				name: "recordInfo",
				children: [{
					name: "id",
					value: "someOtherPresentationId"
				}, {
					name: "type",
					children: [{
						name: "linkedRecordType",
						value: "recordType"
					}, {
						name: "linkedRecordId",
						value: "presentationOtherSurroundingContainer"
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
			}]
		});
	};

	test("testInit", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		assert.strictEqual(pNonRepeatingChildRefHandler.type, "pNonRepeatingChildRefHandler");
	});

	test("testGetDependencies", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		assert.strictEqual(pNonRepeatingChildRefHandler.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		assert.strictEqual(pNonRepeatingChildRefHandler.getSpec(), spec);
	});

	test("testInitCreatesPresentation", function(assert) {
		CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let factoredPresentationSpec = presentationFactory.getSpec(0);

		assert.strictEqual(factoredPresentationSpec.path, spec.parentPath);
		assert.strictEqual(factoredPresentationSpec.metadataIdUsedInData,
			spec.parentMetadataId);
		assert.strictEqual(factoredPresentationSpec.cPresentation, spec.cPresentation);
		assert.strictEqual(factoredPresentationSpec.cParentPresentation,
			spec.cParentPresentation);

		let factoredAlternativePresentationSpec = presentationFactory
			.getSpec(1);
		assert.strictEqual(factoredAlternativePresentationSpec, undefined);
		assert.deepEqual(factoredPresentationSpec.recordPartPermissionCalculator, spec.recordPartPermissionCalculator)

	});

	test("testInitPresentationAddedToView", function(assert) {
		CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let factoredPresentation = presentationFactory.getFactored(0);

		let addedView = pNonRepeatingChildRefHandlerViewFactory.getFactored(0)
			.getAddedChild(0);
		assert.strictEqual(factoredPresentation.getView(), addedView);
	});

	test("testInitOutputDefaultsHidesContent", function(assert) {
		spec.mode = "output";
		CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);
	});

	test("testInitOutputDefaultsSetsStyleToNoContent", function(assert) {
		spec.mode = "output";
		CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	});

	test("testGetView", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies,
			spec);
		let view = pNonRepeatingChildRefHandler.getView();
		assert.strictEqual(view, pNonRepeatingChildRefHandlerViewFactory.getFactored(
			0).getView());
	});

	test("testViewSpec", function(assert) {
		spec.textStyle = "someTextStyle";
		spec.childStyle = "someChildStyle";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);

		let viewSpec = pNonRepeatingChildRefHandlerViewFactory.getSpec(0);
		let expectedViewSpec = {
			presentationId: "somePresentationId",
			textStyle: "someTextStyle",
			childStyle: "someChildStyle",
			callOnFirstShowOfAlternativePresentation: pNonRepeatingChildRefHandler.publishPresentationShown
		}
		assert.stringifyEqual(viewSpec, expectedViewSpec);

		assert.notStrictEqual(pNonRepeatingChildRefHandler.publishPresentationShown, undefined);
	});

	test("testViewSpecWithOptionalClickableHeadline", function(assert) {
		spec.textStyle = "someTextStyle";
		spec.childStyle = "someChildStyle";
		spec.clickableHeadlineText = "Some headline text";
		spec.clickableHeadlineLevel = "h3";
		spec.presentationSize = "bothEqual";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);

		let viewSpec = pNonRepeatingChildRefHandlerViewFactory.getSpec(0);
		let expectedViewSpec = {
			presentationId: "somePresentationId",
			textStyle: "someTextStyle",
			childStyle: "someChildStyle",
			callOnFirstShowOfAlternativePresentation: pNonRepeatingChildRefHandler.publishPresentationShown,
			clickableHeadlineText: "Some headline text",
			clickableHeadlineLevel: "h3",
			presentationSize: "bothEqual"
		}
		assert.stringifyEqual(viewSpec, expectedViewSpec);
	});

	test("testInitWithAlternativeCreatesPresentation", function(assert) {
		spec.cAlternativePresentation = cAlternativePresentation;
		CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let factoredPresentationSpec = presentationFactory.getSpec(1);

		assert.strictEqual(factoredPresentationSpec.path, spec.parentPath);
		assert.strictEqual(factoredPresentationSpec.metadataIdUsedInData, spec.parentMetadataId);
		assert.strictEqual(factoredPresentationSpec.cPresentation, spec.cAlternativePresentation);
		assert.strictEqual(factoredPresentationSpec.cParentPresentation, spec.cParentPresentation);
	});

	test("testInitPresentationAlternativeAddedToView", function(assert) {
		spec.presentationSize = "bothEqual";
		spec.cAlternativePresentation = cAlternativePresentation;
		CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let factoredPresentation = presentationFactory.getFactored(1);

		let factoredView = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		let addedView = factoredView.getAddedAlternativeChild(0);
		assert.strictEqual(factoredPresentation.getView(), addedView);
	});


	test("testInitSubscribesToAdd", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);

		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 1)
		assert.strictEqual(subscriptions[0].type, "add");
		assert.stringifyEqual(subscriptions[0].path, spec.parentPath);
		assert.strictEqual(subscriptions[0].context, undefined);
		assert.strictEqual(subscriptions[0].functionToCall, pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg);
	});

	test("testSubscribesWhenAdd_SameId", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);

		let msg = "root/add";
		let dataFromMsg = {
			metadataId: "groupWithOneCollectionVarChildGroup",
			path: [],
			repeatId: "1",
			nameInData: "groupWithOneCollectionVarChildGroup"
		};
		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 1)

		pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg(dataFromMsg, msg);

		let path = ["groupWithOneCollectionVarChildGroup.1"];

		assert.strictEqual(subscriptions.length, 2)
		assert.strictEqual(subscriptions[1].type, "*");
		assert.stringifyEqual(subscriptions[1].path, path);
		assert.strictEqual(subscriptions[1].context, undefined);
		assert.strictEqual(subscriptions[1].functionToCall,
			pNonRepeatingChildRefHandler.handleMsgToDeterminDataState);
	});

	test("testSubscribesWhenAdd_OtherIdSameNameInDataAttributes", function(assert) {
		spec.cPresentation = CORA.coraData({
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
						value: "groupWithOneCollectionVarChildGroupOtherIdSameNameInData"
					}],
					name: "presentationOf"
				}]
			}
			]
		});



		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);

		let msg = "root/add";
		let dataFromMsg = {
			metadataId: "groupWithOneCollectionVarChildGroup",
			path: [],
			repeatId: "1",
			nameInData: "groupWithOneCollectionVarChildGroup"
		};
		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 1)

		pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg(dataFromMsg, msg);

		let path = ["groupWithOneCollectionVarChildGroup.1"];

		assert.strictEqual(subscriptions.length, 2)
		assert.strictEqual(subscriptions[1].type, "*");
		assert.stringifyEqual(subscriptions[1].path, path);
		assert.strictEqual(subscriptions[1].context, undefined);
		assert.strictEqual(subscriptions[1].functionToCall,
			pNonRepeatingChildRefHandler.handleMsgToDeterminDataState);
	});

	test("testSubscribesWhenAdd_OtherIdNotSameNameInDataAttributes", function(assert) {
		spec.cPresentation = CORA.coraData({
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
						value: "groupWithOneCollectionVarChildAndOneTextChildGroup"
					}],
					name: "presentationOf"
				}]
			}
			]
		});

		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);

		let msg = "root/add";
		let dataFromMsg = {
			metadataId: "groupWithOneCollectionVarChildGroup",
			path: [],
			repeatId: "1",
			nameInData: "groupWithOneCollectionVarChildGroup"
		};
		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 1)

		pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg(dataFromMsg, msg);

		assert.strictEqual(subscriptions.length, 1)
	});

	test("testSubscribesWhenAddNoSubscriptionForNonHandledMetdataId", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);

		let msg = "root/add";
		let dataFromMsg = {
			metadataId: "groupWithOneCollectionVarChildGroupNotHandled",
			path: [],
			repeatId: "1",
			nameInData: "groupWithOneCollectionVarChildGroup"
		};
		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 1)

		pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg(dataFromMsg, msg);
		assert.strictEqual(subscriptions.length, 1)
	});

	test("testChangeViewOnMessage", function(assert) {
		spec.mode = "output";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue",
			path: []
		};
		assert.strictEqual(pubSub.getMessages().length, 0);

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		assert.strictEqual(pubSub.getMessages().length, 1);
		let firstMessage = pubSub.getMessages()[0];
		assert.strictEqual(firstMessage.type, "presentationShown");
		let expectedMessage = {
			data: "",
			path: []
		};
		assert.stringifyEqual(firstMessage.message, expectedMessage);
	});

	test("testChangeViewOnMessageNotShownForSetValueWithBlankValue", function(assert) {
		spec.mode = "output";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "",
			path: []
		};
		assert.strictEqual(pubSub.getMessages().length, 0);

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);

		assert.strictEqual(pubSub.getMessages().length, 0);
	});

	test("testChangeViewOnMessageRemovedOnNewBlank", function(assert) {
		spec.mode = "output";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue",
			path: []
		};

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		dataFromMsg.data = "";
		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);
	});

	test("testChangeViewOnMessageRemovedOnNewBlankForInput", function(assert) {
		spec.mode = "input";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue",
			path: []
		};

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		dataFromMsg.data = "";
		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);
	});

	test("testChangeViewOnMessageRemovBlock", function(assert) {
		spec.mode = "output";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue",
			path: ["groupWithOneCollectionVarChildGroup.1", "someNameInData"]
		};

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		let msg2 = "root/groupWithOneCollectionVarChildGroup.1/remove";
		let dataFromMsg2 = {
			type: "remove",
			path: ["groupWithOneCollectionVarChildGroup.1"]
		};

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg2, msg2);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);
	});

	test("testChangeViewOnMessageRemovBlockInput", function(assert) {
		spec.mode = "input";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue",
			path: ["groupWithOneCollectionVarChildGroup.1", "someNameInData"]
		};

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		let msg2 = "root/groupWithOneCollectionVarChildGroup.1/remove";
		let dataFromMsg2 = {
			type: "remove",
			path: ["groupWithOneCollectionVarChildGroup.1"]
		};

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg2, msg2);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);
	});

	test("testChangeViewOnMessageTwoChildren", function(assert) {
		spec.mode = "output";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);

		let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
		let dataFromMsg = {
			data: "someValue"
		};

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		let msg2 = "root/groupIdOneTextChild/someNameInData/setValue";
		let dataFromMsg2 = {
			data: "someValue2"
		};

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg2, msg2);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		dataFromMsg.data = "";
		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
		assert.strictEqual(viewHandlerSpy.getIsShown(), true);

		let msg3 = "root/groupIdOneTextChild/remove";
		let dataFromMsg3 = {
			type: "remove"
		};

		pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg3, msg3);
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
		assert.strictEqual(viewHandlerSpy.getIsShown(), false);
	});

	test("testpublishPresentationShownPublishMessage", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		assert.strictEqual(pubSub.getMessages().length, 0);

		pNonRepeatingChildRefHandler.publishPresentationShown();

		assert.strictEqual(pubSub.getMessages().length, 1);
		let firstMessage = pubSub.getMessages()[0];
		assert.strictEqual(firstMessage.type, "presentationShown");
		let expectedMessage = {
			data: "",
			path: []
		};
		assert.stringifyEqual(firstMessage.message, expectedMessage);
	});
});
