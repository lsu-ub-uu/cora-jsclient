/*
 * Copyright 2016, 2018, 2020 Uppsala University Library
 * Copyright 2017 Olov McKie
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
QUnit.module("presentation/pRepeatingContainerTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let pubSub;

	let spec;

	let fixture;
	let metadataProvider;
	let textProvider;
	let jsBookkeeper;
	let presentationFactory;
	let pRepeatingContainerFactory;
	let pRepeatingContainerId;
	let cPRepeatingContainer;

	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");
		metadataProvider = CORATEST.MetadataProviderStub();
		pubSub = CORATEST.pubSubSpy();
		textProvider = CORATEST.textProviderStub();
		jsBookkeeper = CORATEST.jsBookkeeperSpy();
		presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		pRepeatingContainerFactory = attachedPRepeatingContainerFactory(
			metadataProvider, pubSub, textProvider, presentationFactory,
			jsBookkeeper, fixture);

		dependencies = {
			metadataProvider: metadataProvider,
			pubSub: pubSub,
			textProvider: textProvider,
			presentationFactory: presentationFactory,
			jsBookkeeper: jsBookkeeper
		};
		pRepeatingContainerId = "pTextVariableIdRContainer";
		cPRepeatingContainer = CORA.coraData(metadataProvider
			.getMetadataById(pRepeatingContainerId));
		spec = {
			path: [],
			cPresentation: cPRepeatingContainer,
			presentationCounter: "5-55"
		};

	});

	hooks.afterEach(() => {
		//no after
	});

	const attachedPRepeatingContainerFactory = function(metadataProvider, pubSub, textProvider,
		presentationFactory, jsBookkeeper, fixture) {
		let factor = function(path, pRepeatingContainerId) {
			let cPRepeatingContainer = CORA.coraData(metadataProvider
				.getMetadataById(pRepeatingContainerId));
			let dependencies = {
				metadataProvider: metadataProvider,
				pubSub: pubSub,
				textProvider: textProvider,
				presentationFactory: presentationFactory,
				jsBookkeeper: jsBookkeeper
			};
			let spec = {
				path: path,
				cPresentation: cPRepeatingContainer,
			};
			let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);
			let view = pRepeatingContainer.getView();
			fixture.appendChild(view);
			let valueView = view.firstChild;
			return {
				pRepeatingContainer: pRepeatingContainer,
				fixture: fixture,
				valueView: valueView,
				metadataProvider: metadataProvider,
				pubSub: pubSub,
				textProvider: textProvider,
				jsBookkeeper: jsBookkeeper,
				view: view
			};

		};
		return Object.freeze({
			factor: factor
		});
	};

	test("testGetDependencies", function(assert) {
		let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);
		assert.strictEqual(pRepeatingContainer.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);
		assert.strictEqual(pRepeatingContainer.getSpec(), spec);
	});

	test("testGetPresentationCounter", function(assert) {
		let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);
		assert.strictEqual(pRepeatingContainer.getPresentationCounter(), spec.presentationCounter);
	});

	test("testInit", function(assert) {
		let attachedPRepeatingContainer = pRepeatingContainerFactory.factor({},
			"pTextVariableIdRContainer");
		assert.strictEqual(attachedPRepeatingContainer.pRepeatingContainer.type,
			"pRepeatingContainer");
		assert.deepEqual(attachedPRepeatingContainer.view.className, "pRepeatingContainer "
			+ "pTextVariableIdRContainer");
		let view = attachedPRepeatingContainer.view;
		assert.ok(view.modelObject === attachedPRepeatingContainer.pRepeatingContainer,
			"modelObject should be a pointer to the javascript object instance");
		assert.strictEqual(view.childNodes.length, 3);

		assert.strictEqual(view.childNodes[0].textContent, "En rubrik");

		let requestedCPresentation = presentationFactory.getSpec(1).cPresentation;
		let recordInfo = requestedCPresentation.getFirstChildByNameInData("recordInfo");

		let presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		assert.strictEqual(presentationId, "pVarTextVariableIdOutput");
	});

	test("testaddPresentationsTriggersSubscribe", function(assert) {
		let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);

		let subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 2);
		assert.strictEqual(subscriptions[0].type, "visibilityChange");
		assert.stringifyEqual(subscriptions[0].path, ["1-123"]);
		assert.strictEqual(subscriptions[0].context, undefined);
		assert.strictEqual(subscriptions[0].functionToCall, pRepeatingContainer.handleMsgToDeterminVisibilityChange);

		subscriptions = pubSub.getSubscriptions();
		assert.strictEqual(subscriptions.length, 2);
		assert.strictEqual(subscriptions[1].type, "visibilityChange");
		assert.stringifyEqual(subscriptions[1].path, ["1-123"]);
		assert.strictEqual(subscriptions[1].context, undefined);
		assert.strictEqual(subscriptions[1].functionToCall, pRepeatingContainer.handleMsgToDeterminVisibilityChange);
	});

	test("testhandleMsgToDeterminVisibilityChange_visible", function(assert) {
		let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-34", "visible", false, false);

		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "5-55", "1-123", "visible", false, false);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-34", "visible", false, true);

		assertNumberOfMessages(assert, 2);
		assertMessageNumberIsSentToWithInfo(assert, 1, "5-55", "1-123", "visible", false, true);
	});

	test("testhandleMsgToDeterminVisibilityChange_hiddenInInput", function(assert) {
		let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-34", "hidden", true, true);

		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "5-55", "1-123", "hidden", true, true);
	});

	test("testhandleMsgToDeterminVisibilityChange_changing", function(assert) {
		let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-34", "visible", true, true);
		assertNumberOfMessages(assert, 1);
		assertMessageNumberIsSentToWithInfo(assert, 0, "5-55", "1-123", "visible", true, true);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-34", "hidden", false, false);
		assertNumberOfMessages(assert, 2);
		assertMessageNumberIsSentToWithInfo(assert, 1, "5-55", "1-123", "hidden", false, false);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-34", "visible", true, true);
		assertNumberOfMessages(assert, 3);
		assertMessageNumberIsSentToWithInfo(assert, 2, "5-55", "1-123", "visible", true, true);


		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-35", "visible", true, true);
		assertNumberOfMessages(assert, 3);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-34", "visible", false, false);
		assertNumberOfMessages(assert, 3);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-35", "hidden", false, false);
		assertNumberOfMessages(assert, 4);
		assertMessageNumberIsSentToWithInfo(assert, 3, "5-55", "1-123", "visible", false, false);
	});

	test("testhandleMsgToDeterminVisibilityChange_sendingCorrectVisibility", function(assert) {
		let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-34", "visible", false, false);
		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-35", "visible", true, true);
		assertNumberOfMessages(assert, 2);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-35", "hidden", false, false);
		assertNumberOfMessages(assert, 3);
		assertMessageNumberIsSentToWithInfo(assert, 2, "5-55", "1-123", "visible", false, false);
	});

	test("testhandleMsgToDeterminVisibilityChange_sendingCorrectContainsData", function(assert) {
		let pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-34", "hidden", true, true);
		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-35", "visible", true, true);
		assertNumberOfMessages(assert, 2);

		callHandleMsgForVisibilityChange(pRepeatingContainer, "1-35", "hidden", false, false);
		assertNumberOfMessages(assert, 3);
		assertMessageNumberIsSentToWithInfo(assert, 2, "5-55", "1-123", "hidden", true, true);
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
		assert.strictEqual(message.message.presentationCounter, presentationCounter, "presentationCounter is wrong");
		assert.strictEqual(message.message.visibility, visibility);
		assert.strictEqual(message.message.containsData, containsData, "containsData is wrong in message");
		assert.strictEqual(message.message.containsError, containsError, "containsError is wrong in message");
	};
});