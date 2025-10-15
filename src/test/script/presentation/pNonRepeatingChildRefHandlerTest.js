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
			},
			parentPresentationCounter: "1-1"
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
				}, {
					repeatId: "1",
					children: [{
						name: "linkedRecordType",
						value: "metadata"
					}, {
						name: "linkedRecordId",
						value: "groupIdOneTextChild"
					}],
					name: "presentationOf"
				}]
			}
			]
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

	//TODO: here
	test("testInitWorksIfMetadataMatches", function(assert) {
		let lessGoodPresentation = createLessGoodPresentation(
			"groupWithOneCollectionVarChildGroupOtherIdSameNameInData", "groupIdOneTextChild2");
		spec.cPresentation = lessGoodPresentation;
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

	test("testInitCreatesFakeIfNoMatchBetweenDataBeeingPresentedAndCurrentMetadata", function(assert) {
		let lessGoodPresentation = createLessGoodPresentation(
			"groupWithOneCollectionVarChildAndOneTextChildGroup", "groupIdOneTextChild2");
		spec.cPresentation = lessGoodPresentation;
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let factoredPresentationSpec = presentationFactory.getSpec(0);

		assert.strictEqual(factoredPresentationSpec, undefined);

		let view = pNonRepeatingChildRefHandler.getView();
		assert.strictEqual(view.className, "fakePChildRefHandlerViewAsNoMetadataExistsFor " +
			"groupWithOneCollectionVarChildAndOneTextChildGroup groupIdOneTextChild2");
	});

	const createLessGoodPresentation = function(id1, id2) {
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
						value: id1
					}],
					name: "presentationOf"
				}, {
					repeatId: "1",
					children: [{
						name: "linkedRecordType",
						value: "metadata"
					}, {
						name: "linkedRecordId",
						value: id2
					}],
					name: "presentationOf"
				}]
			}
			]
		});
	};
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
			callOnFirstShowOfPresentation: pNonRepeatingChildRefHandler.publishPresentationShown,
			clickableHeadlineText: "Some headline text",
			clickableHeadlineLevel: "h3",
			presentationSize: "bothEqual"
		}
		assert.stringifyEqual(viewSpec, expectedViewSpec);
		assert.strictEqual(viewSpec.callOnFirstShowOfPresentation, expectedViewSpec.callOnFirstShowOfPresentation);
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

	test("testaddPresentationsTriggersSubscribe", function(assert) {
		spec.cAlternativePresentation = cAlternativePresentation;
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);

		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 2);
		assert.strictEqual(subscriptions[0].type, "visibilityChange");
		assert.stringifyEqual(subscriptions[0].path, ["1-123"]);
		assert.strictEqual(subscriptions[0].context, undefined);
		assert.strictEqual(subscriptions[0].functionToCall, pNonRepeatingChildRefHandler.handleMsgToDeterminVisibilityChange);

		subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 2);
		assert.strictEqual(subscriptions[1].type, "visibilityChange");
		assert.stringifyEqual(subscriptions[1].path, ["1-123"]);
		assert.strictEqual(subscriptions[1].context, undefined);
		assert.strictEqual(subscriptions[1].functionToCall, pNonRepeatingChildRefHandler.handleMsgToDeterminVisibilityChange);
	});

	test("testhandleMsgToDeterminVisibilityChange_visible", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "visible", false, false);

		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "1-1", "1-123", "visible", false, false);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, false, false);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "visible", false, true);
		assertNumberOfMessages(assert, 2);
		assertMessageNumberIsSentToWithInfo(assert, 1, "1-1", "1-123", "visible", false, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, false, true);
	});

	test("testhandleMsgToDeterminVisibilityChange_hiddenInInput", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "hidden", true, true);

		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "1-1", "1-123", "hidden", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
	});

	test("testhandleMsgToDeterminVisibilityChange_notHiddenInOutput", function(assert) {
		spec.mode = "output";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "hidden", true, true);

		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "1-1", "1-123", "hidden", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, false, true, true);
	});

	test("testhandleMsgToDeterminVisibilityChange_changing_output", function(assert) {
		spec.mode = "output";
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "visible", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "1-1", "1-123", "visible", true, true);

		//		
		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "hidden", false);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, false, false, false);
		assertNumberOfMessages(assert, 2);
		assertMessageNumberIsSentToWithInfo(assert, 1, "1-1", "1-123", "hidden", false, false);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "visible", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 3);
		assertMessageNumberIsSentToWithInfo(assert, 2, "1-1", "1-123", "visible", true, true);


		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-35", "visible", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 3);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "visible", false, false);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 3);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-35", "hidden", false, false);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, false, false);
		assertNumberOfMessages(assert, 4);
		assertMessageNumberIsSentToWithInfo(assert, 3, "1-1", "1-123", "visible", false, false);
	});

	test("testhandleMsgToDeterminVisibilityChange_changing", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "visible", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "1-1", "1-123", "visible", true, true);

		//		
		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "hidden", false, false);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, false, false);
		assertNumberOfMessages(assert, 2);
		assertMessageNumberIsSentToWithInfo(assert, 1, "1-1", "1-123", "hidden", false, false);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "visible", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 3);
		assertMessageNumberIsSentToWithInfo(assert, 2, "1-1", "1-123", "visible", true, true);


		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-35", "visible", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 3);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "visible", false, false);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 3);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-35", "hidden", false, false);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, false, false);
		assertNumberOfMessages(assert, 4);
		assertMessageNumberIsSentToWithInfo(assert, 3, "1-1", "1-123", "visible", false, false);
	});

	test("testhandleMsgToDeterminVisibilityChange_sendingCorrectVisibility", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "visible", false, false);
		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-35", "visible", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 2);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-35", "hidden", false, false);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, false, false);
		assertNumberOfMessages(assert, 3);
		assertMessageNumberIsSentToWithInfo(assert, 2, "1-1", "1-123", "visible", false, false);
	});

	test("testhandleMsgToDeterminVisibilityChange_sendingCorrectContainsData", function(assert) {
		let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(dependencies, spec);
		let viewHandlerSpy = pNonRepeatingChildRefHandlerViewFactory.getFactored(0);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-34", "hidden", true, true);
		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-35", "visible", true, true);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 2);

		callHandleMsgForVisibilityChange(pNonRepeatingChildRefHandler, "1-35", "hidden", false, false);
		assertViewVisibilityAndContainsData(assert, viewHandlerSpy, true, true, true);
		assertNumberOfMessages(assert, 3);
		assertMessageNumberIsSentToWithInfo(assert, 2, "1-1", "1-123", "hidden", true, true);
	});

	const callHandleMsgForVisibilityChange = function(pRepeatingElement, presentationCounter,
		visibility, containsData, containsError) {
		let msg = presentationCounter + "/visibilityChange";
		let dataFromMsg = {
			presentationCounter: presentationCounter,
			visibility: visibility,
			containsData: containsData,
			containsError: containsError
		};
		pRepeatingElement.handleMsgToDeterminVisibilityChange(dataFromMsg, msg);
	};

	const assertNumberOfMessages = function(assert, noMessages) {
		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, noMessages);
	};

	const assertMessageNumberIsSentToWithInfo = function(assert, messageNo, parentPresentationCounter,
		presentationCounter, visibility, containsData, containsError) {
		let messages = pubSub.getMessages();
		let message = messages[messageNo];
		assert.strictEqual(message.type, "visibilityChange");
		assert.stringifyEqual(message.message.path, [parentPresentationCounter]);
		assert.strictEqual(message.message.presentationCounter, presentationCounter);
		assert.strictEqual(message.message.visibility, visibility);
		assert.strictEqual(message.message.containsData, containsData, "containsData is wrong in message");
		assert.strictEqual(message.message.containsError, containsError);
	};

	const assertViewVisibilityAndContainsData = function(assert, viewHandlerSpy, visible, containsData,
		containsError) {
		assert.strictEqual(viewHandlerSpy.getIsShown(), visible, "visibility is wrong");
		assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), containsData, "containsData is wrong in view");
		assert.strictEqual(viewHandlerSpy.getDataHasErrorStyle(), containsError, "containsError is wrong in view");
	};

});
