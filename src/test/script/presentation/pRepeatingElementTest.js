/*
 * Copyright 2016, 2017, 2018 Olov McKie
 * Copyright 2017, 2018, 2020 Uppsala University Library
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
QUnit.module("presentation/pRepeatingElementTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let jsBookkeeper;
	let pubSub;
	let containsDataTrackerFactory;

	let spec;

	let fixture;
	let view;

	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");
		jsBookkeeper = CORATEST.jsBookkeeperSpy();
		pubSub = CORATEST.pubSubSpy();
		containsDataTrackerFactory = CORATEST.standardFactorySpy("containsDataTrackerSpy");

		dependencies = {
			jsBookkeeper: jsBookkeeper,
			pubSub: pubSub,
			containsDataTrackerFactory: containsDataTrackerFactory
		};
		spec = {
			path: [],
			pChildRefHandlerView: CORATEST.pChildRefHandlerViewSpy(),
			pChildRefHandler: CORATEST.pChildRefHandlerSpy(),
			userCanRemove: true,
			userCanMove: true,
			userCanAddBefore: true,
			mode: "input"
		};
	});
	hooks.afterEach(() => {
		//no after
	});

	const createAndReturnPRepeatingElementGetAndAttatchView = function() {
		const pRepeatingElement = CORA.pRepeatingElement(dependencies, spec);
		view = pRepeatingElement.getView();
		fixture.appendChild(view);
		return pRepeatingElement;
	};

	test("testInit", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
		assert.deepEqual(view.className, "repeatingElement containsNoData");
		assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

		assert.strictEqual(pRepeatingElement.getPath(), spec.path);

		let repeatingElement = view;
		assert.strictEqual(repeatingElement.className, "repeatingElement containsNoData");
		let buttonView = repeatingElement.childNodes[0];
		assert.strictEqual(buttonView.className, "buttonView");

		// remove button
		let removeButton = buttonView.firstChild;
		assert.strictEqual(removeButton.className, "iconButton removeButton");

		// drag button
		let dragButton = buttonView.childNodes[1];
		assert.strictEqual(dragButton.className, "iconButton dragButton");

		// addBeforeButton
		let addBeforeButton = buttonView.childNodes[2];
		assert.strictEqual(addBeforeButton.className, "iconButton addBeforeButton");

		assert.strictEqual(buttonView.childNodes.length, 3);
	});

	test("testInit_createsContainsDataTracker", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		assert.strictEqual(containsDataTrackerFactory.getNoOfFactored(), 1);
		let factoredSpec = containsDataTrackerFactory.getSpec(0);

		assert.strictEqual(factoredSpec.methodToCallOnContainsDataChange,
			pRepeatingElement.onlyForTestMethodToCallOnContainsDataChange);
		assert.stringifyEqual(factoredSpec.topLevelMetadataIds, undefined);
		assert.stringifyEqual(factoredSpec.path, spec.path);
	});


	test("testChangeViewOnContainsDataTracker_output", function(assert) {
		spec.mode = "output";
		createAndReturnPRepeatingElementGetAndAttatchView();
		let factoredSpec = containsDataTrackerFactory.getSpec(0);

		assert.strictEqual(view.className, "repeatingElement containsNoData");
		assert.elementHasNotClass(view, "containsData");
		assert.elementHasClass(view, "containsNoData");
		assert.notVisible(view);

		factoredSpec.methodToCallOnContainsDataChange(true);
		assert.elementHasClass(view, "containsData");
		assert.elementHasNotClass(view, "containsNoData");
		assert.visible(view);

		factoredSpec.methodToCallOnContainsDataChange(true);
		assert.elementHasClass(view, "containsData");
		assert.elementHasNotClass(view, "containsNoData");
		assert.visible(view);

		factoredSpec.methodToCallOnContainsDataChange(false);
		assert.elementHasNotClass(view, "containsData");
		assert.elementHasClass(view, "containsNoData");
		assert.notVisible(view);

		factoredSpec.methodToCallOnContainsDataChange(true);
		assert.elementHasClass(view, "containsData");
		assert.elementHasNotClass(view, "containsNoData");
		assert.visible(view);
	});

	test("testChangeViewOnContainsDataTracker_presetDisplay_input", function(assert) {
		spec.mode = "input";
		createAndReturnPRepeatingElementGetAndAttatchView();
		let factoredSpec = containsDataTrackerFactory.getSpec(0);
		view.style.display = "flex";

		factoredSpec.methodToCallOnContainsDataChange(false);
		assert.strictEqual(view.style.display, "flex");

		factoredSpec.methodToCallOnContainsDataChange(true);
		assert.strictEqual(view.style.display, "flex");
	});

	test("testChangeViewOnContainsDataTracker_presetDisplay_output", function(assert) {
		spec.mode = "output";
		createAndReturnPRepeatingElementGetAndAttatchView();
		let factoredSpec = containsDataTrackerFactory.getSpec(0);
		view.style.display = "flex";


		factoredSpec.methodToCallOnContainsDataChange(false);
		assert.strictEqual(view.style.display, "none");

		factoredSpec.methodToCallOnContainsDataChange(true);
		assert.strictEqual(view.style.display, "flex");
	});

	test("testChangeViewOnContainsDataTracker_input", function(assert) {
		spec.mode = "input";
		createAndReturnPRepeatingElementGetAndAttatchView();
		let factoredSpec = containsDataTrackerFactory.getSpec(0);

		assert.strictEqual(view.className, "repeatingElement containsNoData");

		factoredSpec.methodToCallOnContainsDataChange(true);
		assert.elementHasClass(view, "containsData");
		assert.elementHasNotClass(view, "containsNoData");
		assert.visible(view);

		factoredSpec.methodToCallOnContainsDataChange(true);
		assert.elementHasClass(view, "containsData");
		assert.elementHasNotClass(view, "containsNoData");
		assert.visible(view);

		factoredSpec.methodToCallOnContainsDataChange(false);
		assert.elementHasNotClass(view, "containsData");
		assert.elementHasClass(view, "containsNoData");
		assert.visible(view);

		factoredSpec.methodToCallOnContainsDataChange(true);
		assert.elementHasClass(view, "containsData");
		assert.elementHasNotClass(view, "containsNoData");
		assert.visible(view);
	});

	test("testInitClickableHeadline", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		createAndReturnPRepeatingElementGetAndAttatchView();

		let repeatingElement = view;
		assert.strictEqual(repeatingElement.className, "repeatingElement containsNoData");

		let headline = view.childNodes[0];
		assert.strictEqual(headline.nodeName, "H2");
		assert.strictEqual(headline.className, "clickableHeadline");
		assert.strictEqual(headline.textContent, "Some headline text");
	});

	test("testInitClickableHeadline_nonDefaultHeadlineLevel", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		spec.clickableHeadlineLevel = "h4";
		createAndReturnPRepeatingElementGetAndAttatchView();

		let repeatingElement = view;
		assert.strictEqual(repeatingElement.className, "repeatingElement containsNoData");

		let headline = view.childNodes[0];
		assert.strictEqual(headline.nodeName, "H4");
		assert.strictEqual(headline.className, "clickableHeadline");
		assert.strictEqual(headline.textContent, "Some headline text");
	});

	test("testInitNoAddBeforeButton", function(assert) {
		spec.userCanAddBefore = false;
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
		assert.deepEqual(view.className, "repeatingElement containsNoData");
		assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

		assert.strictEqual(pRepeatingElement.getPath(), spec.path);

		let repeatingElement = view;
		assert.strictEqual(repeatingElement.className, "repeatingElement containsNoData");
		let buttonView = repeatingElement.childNodes[0];
		assert.strictEqual(buttonView.className, "buttonView");

		// remove button
		let removeButton = buttonView.firstChild;
		assert.strictEqual(removeButton.className, "iconButton removeButton");

		// drag button
		let dragButton = buttonView.childNodes[1];
		assert.strictEqual(dragButton.className, "iconButton dragButton");


		assert.strictEqual(buttonView.childNodes.length, 2);
	});

	test("testInitNoRemoveOrDragOrAddBeforeButtonWhenUserCantDoAnything", function(assert) {
		spec.userCanRemove = false;
		spec.userCanMove = false;
		spec.userCanAddBefore = false;
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
		assert.deepEqual(view.className, "repeatingElement containsNoData");
		assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

		assert.strictEqual(pRepeatingElement.getPath(), spec.path);

		let repeatingElement = view;
		assert.strictEqual(repeatingElement.className, "repeatingElement containsNoData");
		let buttonView = repeatingElement.childNodes[0];
		assert.strictEqual(buttonView.className, "buttonView");

		assert.strictEqual(buttonView.childNodes.length, 0);
	});

	test("testGetDependencies", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		assert.strictEqual(pRepeatingElement.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		assert.strictEqual(pRepeatingElement.getSpec(), spec);
	});
	test("testDragenterToTellPChildRefHandlerThatSomethingIsDragedOverThis", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		pRepeatingElement.getView().ondragenter();
		assert
			.strictEqual(spec.pChildRefHandlerView.getRepeatingElementDragOver(),
				pRepeatingElement);
	});
	test(
		"testDragenterToTellPChildRefHandlerThatSomethingIsDragedOverThisNoFunctionWhenNoMove",
		function(assert) {
			spec.userCanMove = false;
			let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

			assert.strictEqual(pRepeatingElement.getView().ondragenter, null);
		});

	test("testButtonViewAndRemoveButton", function(assert) {
		createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		let removeButton = buttonView.firstChild;
		assert.strictEqual(removeButton.className, "iconButton removeButton");
	});

	test("test0to1ShouldHaveRemoveButtonNoAddBeforeButton", function(assert) {
		spec.userCanMove = false;
		spec.userCanAddBefore = false;
		createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		let removeButton = buttonView.firstChild;
		assert.strictEqual(removeButton.className, "iconButton removeButton");
		assert.strictEqual(buttonView.childNodes.length, 1);
	});

	test("test1to1ShouldHaveNoRemoveOrDragOrAddBeforeButton", function(assert) {
		spec.userCanRemove = false;
		spec.userCanMove = false;
		spec.userCanAddBefore = false;
		createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		assert.strictEqual(buttonView.childNodes.length, 0);
	});

	test("testRemoveButtonOnclick", function(assert) {
		createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		let removeButton = buttonView.firstChild;

		CORATESTHELPER.simulateOnclick(removeButton);

		// subscription
		let removes = dependencies.jsBookkeeper.getRemoveDataArray();
		assert.deepEqual(removes.length, 1);

		let firstRemove = removes[0];
		assert.strictEqual(firstRemove.type, "remove");
		assert.deepEqual(firstRemove.path, []);
	});

	test("testRemoveButtonHover", function(assert) {
		createAndReturnPRepeatingElementGetAndAttatchView();
		assert.deepEqual(view.className, "repeatingElement containsNoData");

		let buttonView = view.childNodes[0];
		let removeButton = buttonView.firstChild;

		let mouseEnterEvent = new Event('mouseenter');
		removeButton.dispatchEvent(mouseEnterEvent);
		assert.deepEqual(view.className, "repeatingElement containsNoData hoverRemove");

		let mouseLeaveEvent = new Event('mouseleave');
		removeButton.dispatchEvent(mouseLeaveEvent);
		assert.deepEqual(view.className, "repeatingElement containsNoData");

		let mouseEnterEvent2 = new Event('mouseenter');
		removeButton.dispatchEvent(mouseEnterEvent2);
		assert.deepEqual(view.className, "repeatingElement containsNoData hoverRemove");

	});

	test("testDragButtonOnmousedownOnmouseup", function(assert) {
		createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		let dragButton = buttonView.childNodes[1];

		assert.notOk(view.draggable);
		dragButton.onmousedown();
		assert.ok(view.draggable);
		dragButton.onmouseup();
		assert.notOk(view.draggable);
	});

	test("testHideRemoveButton", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		let removeButton = buttonView.firstChild;

		assert.visible(removeButton, "buttonView should be visible");

		pRepeatingElement.hideRemoveButton();
		assert.notVisible(removeButton, "buttonView should be hidden");

		pRepeatingElement.showRemoveButton();
		assert.visible(removeButton, "buttonView should be visible");
	});

	test("testHideDragButton", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		let dragButton = buttonView.childNodes[1];

		assert.visible(dragButton, "buttonView should be visible");

		pRepeatingElement.hideDragButton();
		assert.notVisible(dragButton, "buttonView should be hidden");

		pRepeatingElement.showDragButton();
		assert.visible(dragButton, "buttonView should be visible");
	});

	test("testHideAndShowDragButtonWhenDragButtonNotPresent", function(assert) {
		spec.userCanMove = false;
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		let removeButton = buttonView.childNodes[0];
		assert.strictEqual(removeButton.className, "iconButton removeButton");
		let addBeforeButton = buttonView.childNodes[1];
		assert.strictEqual(addBeforeButton.className, "iconButton addBeforeButton");

		let numOfChildrenWhenDragButtonIsMissing = 2;

		assert.strictEqual(buttonView.childNodes.length, numOfChildrenWhenDragButtonIsMissing);

		//since dragButton is undefined, hide/show is not called from 
		//hideDragButton()/showDragButton(), this crashed before
		pRepeatingElement.hideDragButton();
		pRepeatingElement.showDragButton();
	});

	test("testAddBeforeButtonOnclick", function(assert) {
		createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		let addBeforeButton = buttonView.childNodes[2];

		CORATESTHELPER.simulateOnclick(addBeforeButton);

		let addBefores = spec.pChildRefHandler.getSendAddBeforeDataArray();
		assert.deepEqual(addBefores.length, 1);

		let firstAddBefore = addBefores[0];
		assert.deepEqual(firstAddBefore.path, []);
	});

	test("testHideShowAddBeforeButton", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];
		let addBeforeButton = buttonView.childNodes[2];

		assert.visible(addBeforeButton, "addBeforeButton should be visible");

		pRepeatingElement.hideAddBeforeButton();
		assert.notVisible(addBeforeButton, "addBeforeButton should be hidden");

		pRepeatingElement.showAddBeforeButton();
		assert.visible(addBeforeButton, "addBeforeButton should be visible");
	});

	test("testAddPresentation", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let presentation = CORATEST.presentationStub();

		pRepeatingElement.addPresentation(presentation);

		let presentationView = view.childNodes[0];
		assert.strictEqual(presentationView.className, "presentationStub default");
		assert.visible(presentationView, "presentationView should be visible");
		assert.strictEqual(view.childNodes.length, 2);
		assert.deepEqual(view.className, "repeatingElement");
	});

	test("testAddPresentationNoStyle", function(assert) {
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let presentation = CORATEST.presentationStub();

		pRepeatingElement.addPresentation(presentation);

		let presentationView = view.childNodes[0];
		assert.strictEqual(presentationView.className, "presentationStub default");
		assert.visible(presentationView, "presentationView should be visible");
		assert.strictEqual(view.childNodes.length, 2);
		assert.deepEqual(view.className, "repeatingElement");
	});

	test("testaddAlternativePresentationFirstSmaller", function(assert) {
		spec.presentationSize = "firstSmaller";
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];

		let presentation = CORATEST.presentationStub("minimized", "presentationStubMinimized");
		pRepeatingElement.addPresentation(presentation);

		let alternativePresentation = CORATEST.presentationStub("maximized", "presentationStubMaximized");
		pRepeatingElement.addAlternativePresentation(alternativePresentation);

		let presentationView = view.childNodes[0];
		assert.strictEqual(presentationView.className, "presentationStubMinimized default");
		assert.visible(presentationView, "presentationView should be visible");
		assert.strictEqual(view.childNodes.length, 3);

		let alternativePresentationView = view.childNodes[1];
		assert.strictEqual(alternativePresentationView.className, "presentationStubMaximized alternative");
		assert.notVisible(alternativePresentationView, "alternativePresentationView should be hidden");

		// test minimized/maximized button
		let alternativeButton = buttonView.childNodes[1];
		assert.strictEqual(alternativeButton.className, "iconButton maximizeButton");
		assert.visible(alternativeButton, "maximizeButton should be shown");
		let defaultButton = buttonView.childNodes[2];
		assert.strictEqual(defaultButton.className, "iconButton minimizeButton");
		assert.notVisible(defaultButton, "minimizeButton should be hidden");
	});

	test("testaddAlternativePresentationFirstLarger", function(assert) {
		spec.presentationSize = "firstLarger";
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];

		let presentation = CORATEST.presentationStub("maximized", "presentationStubMaximized");
		pRepeatingElement.addPresentation(presentation);

		let alternativePresentation = CORATEST.presentationStub("minimized", "presentationStubMinimized");
		pRepeatingElement.addAlternativePresentation(alternativePresentation);

		let presentationView = view.childNodes[0];
		assert.strictEqual(presentationView.className, "presentationStubMaximized default");
		assert.visible(presentationView, "presentationView should be visible");
		assert.strictEqual(view.childNodes.length, 3);

		let alternativePresentationView = view.childNodes[1];
		assert.strictEqual(alternativePresentationView.className, "presentationStubMinimized alternative");
		assert.notVisible(alternativePresentationView, "alternativePresentationView should be hidden");

		// test minimized/maximized button
		let alternativeButton = buttonView.childNodes[1];
		assert.strictEqual(alternativeButton.className, "iconButton minimizeButton");
		assert.visible(alternativeButton, "minimizeButton should be shown");
		let defaultButton = buttonView.childNodes[2];
		assert.strictEqual(defaultButton.className, "iconButton maximizeButton");
		assert.notVisible(defaultButton, "maximizeButton should be hidden");
	});

	test("testaddAlternativePresentationBothEqual", function(assert) {
		spec.presentationSize = "bothEqual";
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];

		let presentation = CORATEST.presentationStub("maximized");
		pRepeatingElement.addPresentation(presentation);

		let presentationView = view.childNodes[0];
		assert.strictEqual(presentationView.className, "presentationStub default");
		assert.visible(presentationView, "presentationView should be visible");
		assert.strictEqual(view.childNodes.length, 2);

		let alternativePresentation = CORATEST.presentationStub("minimized");
		pRepeatingElement.addAlternativePresentation(alternativePresentation);
		assert.deepEqual(view.className, "repeatingElement");

		let alternativePresentationView = view.childNodes[1];
		assert.strictEqual(alternativePresentationView.className, "presentationStub alternative");
		assert.notVisible(alternativePresentationView, "alternativePresentationView should be hidden");

		// test minimized/maximized button
		let alternativeButton = buttonView.childNodes[1];
		assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
		assert.visible(alternativeButton, "alternativeButton should be shown");
		let defaultButton = buttonView.childNodes[2];
		assert.strictEqual(defaultButton.className, "iconButton defaultButton");
		assert.notVisible(defaultButton, "defaultButton should be hidden");

		assert.strictEqual(buttonView.childNodes.length, 5);
	});

	test("testaddAlternativePresentation_SingleInitiallyHidden", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		spec.presentationSize = "singleInitiallyHidden";
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[1];
		assert.strictEqual(buttonView.className, "buttonView");

		let presentation = CORATEST.presentationStub("maximized");
		pRepeatingElement.addPresentation(presentation);

		let presentationView = view.childNodes[1];
		assert.strictEqual(presentationView.className, "presentationStub default");
		assert.notVisible(presentationView, "presentationView should not be visible");
		assert.strictEqual(view.childNodes.length, 3);

		// test minimized/maximized button
		let alternativeButton = buttonView.childNodes[2];
		assert.strictEqual(alternativeButton.className, "iconButton maximizeButton");
		assert.visible(alternativeButton, "maximizeButton should be shown");
		let defaultButton = buttonView.childNodes[1];
		assert.strictEqual(defaultButton.className, "iconButton minimizeButton");
		assert.notVisible(defaultButton, "minimizeButton should be hidden");

		assert.strictEqual(buttonView.childNodes.length, 5);

		let clickableHeadline = view.childNodes[0];
		CORATESTHELPER.simulateOnclick(clickableHeadline);
		assert.visible(presentationView, "presentationView should be visible");
	});

	test("testaddAlternativePresentation_headlineDefaultsToSingleInitiallyHidden", function(assert) {
		spec.clickableHeadlineText = "Some headline text";

		let pRepeatingElement = CORA.pRepeatingElement(dependencies, spec);
		let view = pRepeatingElement.getView();
		fixture.appendChild(view);

		let buttonView = view.childNodes[1];
		assert.strictEqual(buttonView.className, "buttonView");

		let presentation = CORATEST.presentationStub("maximized");
		pRepeatingElement.addPresentation(presentation);

		let presentationView = view.childNodes[1];
		assert.strictEqual(presentationView.className, "presentationStub default");
		assert.notVisible(presentationView, "presentationView should not be visible");
		assert.strictEqual(view.childNodes.length, 3);

		// test minimized/maximized button
		let alternativeButton = buttonView.childNodes[2];
		assert.strictEqual(alternativeButton.className, "iconButton maximizeButton");
		assert.visible(alternativeButton, "maximizeButton should be shown");
		let defaultButton = buttonView.childNodes[1];
		assert.strictEqual(defaultButton.className, "iconButton minimizeButton");
		assert.notVisible(defaultButton, "minimizeButton should be hidden");

		assert.strictEqual(buttonView.childNodes.length, 5);

		let clickableHeadline = view.childNodes[0];
		CORATESTHELPER.simulateOnclick(clickableHeadline);
		assert.visible(presentationView, "presentationView should be visible");
	});

	test("testaddAlternativePresentation_SingleInitiallyVisible", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		spec.presentationSize = "singleInitiallyVisible";
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[1];
		assert.strictEqual(buttonView.className, "buttonView");

		let presentation = CORATEST.presentationStub("maximized");
		pRepeatingElement.addPresentation(presentation);

		let presentationView = view.childNodes[1];
		assert.strictEqual(presentationView.className, "presentationStub default");
		assert.visible(presentationView, "presentationView should be visible");
		assert.strictEqual(view.childNodes.length, 3);

		// test minimized/maximized button
		let alternativeButton = buttonView.childNodes[2];
		assert.strictEqual(alternativeButton.className, "iconButton maximizeButton");
		assert.notVisible(alternativeButton, "maximizeButton should not be shown");
		let defaultButton = buttonView.childNodes[1];
		assert.strictEqual(defaultButton.className, "iconButton minimizeButton");
		assert.visible(defaultButton, "minimizeButton should be hidden");

		assert.strictEqual(buttonView.childNodes.length, 5);

		let clickableHeadline = view.childNodes[0];
		CORATESTHELPER.simulateOnclick(clickableHeadline);
		assert.notVisible(presentationView, "presentationView should not be visible");
	});

	test("testaddAlternativePresentation_FirstSmallerWithHeadline", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		spec.presentationSize = "firstSmaller";
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[1];

		let presentation = CORATEST.presentationStub("minimized", "presentationStubMinimized");
		pRepeatingElement.addPresentation(presentation);

		let alternativePresentation = CORATEST.presentationStub("maximized", "presentationStubMaximized");
		pRepeatingElement.addAlternativePresentation(alternativePresentation);

		let presentationView = view.childNodes[1];
		assert.strictEqual(presentationView.className, "presentationStubMinimized default");
		assert.visible(presentationView, "presentationView should be visible");
		assert.strictEqual(view.childNodes.length, 4);

		let alternativePresentationView = view.childNodes[2];
		assert.strictEqual(alternativePresentationView.className, "presentationStubMaximized alternative");
		assert.notVisible(alternativePresentationView, "alternativePresentationView should be hidden");

		// test minimized/maximized button
		let alternativeButton = buttonView.childNodes[1];
		assert.strictEqual(alternativeButton.className, "iconButton maximizeButton");
		assert.visible(alternativeButton, "maximizeButton should be shown");
		let defaultButton = buttonView.childNodes[2];
		assert.strictEqual(defaultButton.className, "iconButton minimizeButton");
		assert.notVisible(defaultButton, "minimizeButton should be hidden");

		assert.strictEqual(buttonView.childNodes.length, 5);
	});


	test("testMinimizealternativeButtonShouldWorkWithoutDraghandle", function(assert) {
		spec.presentationSize = "bothEqual";
		spec.userCanRemove = false;
		spec.userCanMove = false;
		spec.userCanAddBefore = false;
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];

		let presentation = CORATEST.presentationStub("maximized");
		pRepeatingElement.addPresentation(presentation);

		let alternativePresentation = CORATEST.presentationStub("minimized");
		pRepeatingElement.addAlternativePresentation(alternativePresentation);

		let alternativeButton = buttonView.childNodes[0];
		assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
		assert.visible(alternativeButton, "alternativeButton should be shown");
		let defaultButton = buttonView.childNodes[1];
		assert.strictEqual(defaultButton.className, "iconButton defaultButton");
		assert.notVisible(defaultButton, "defaultButton should be hidden");

		assert.strictEqual(buttonView.childNodes.length, 2);
	});

	test("testaddAlternativePresentationToggleNoStyle", function(assert) {
		spec.presentationSize = "bothEqual";
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let buttonView = view.childNodes[0];

		let presentation = CORATEST.presentationStub("maximized");
		pRepeatingElement.addPresentation(presentation);

		assert.deepEqual(view.className, "repeatingElement");

		let alternativePresentation = CORATEST.presentationStub("minimized maximized");
		pRepeatingElement.addAlternativePresentation(alternativePresentation);
		assert.deepEqual(view.className, "repeatingElement");

		let alternativeButton = buttonView.childNodes[1];
		let defaultButton = buttonView.childNodes[2];

		alternativeButton.onclick();
		assert.deepEqual(view.className, "repeatingElement");

		defaultButton.onclick();
		assert.deepEqual(view.className, "repeatingElement");
	});

	////////////////////////////////////////////////////////////
	test("testShowDefaultButtonCallsFunction", function(assert) {
		let altFuncWasCalled = 0;
		let altFunc = function() {
			altFuncWasCalled++;
		}
		spec.clickableHeadlineText = "Some headline text";
		spec.presentationSize = "singleInitiallyVisible";
		spec.callOnFirstShowOfPresentation = altFunc;
		spec.presentationSize = "bothEqual";

		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();

		let presentation = CORATEST.presentationStub("maximized");
		pRepeatingElement.addPresentation(presentation);


		let buttonView = view.childNodes[2];
		assert.strictEqual(buttonView.className, "buttonView")


		let alternativeButton = buttonView.childNodes[1];
		assert.strictEqual(alternativeButton.className, "iconButton alternativeButton")
		let defaultButton = buttonView.childNodes[2];
		assert.strictEqual(defaultButton.className, "iconButton defaultButton")


		assert.strictEqual(altFuncWasCalled, 0);
		CORATESTHELPER.simulateOnclick(defaultButton);
		assert.strictEqual(altFuncWasCalled, 1);
		CORATESTHELPER.simulateOnclick(defaultButton);
		CORATESTHELPER.simulateOnclick(defaultButton);
		CORATESTHELPER.simulateOnclick(defaultButton);
		assert.strictEqual(altFuncWasCalled, 1);
	});
	
	test("testShowAlternativeButtonCallsFunction", function(assert) {
		let altFuncWasCalled = 0;
		let altFunc = function() {
			altFuncWasCalled++;
		}
		spec.clickableHeadlineText = "Some headline text";
		spec.presentationSize = "singleInitiallyVisible";
		spec.callOnFirstShowOfPresentation = altFunc;
		spec.presentationSize = "bothEqual";
		let pRepeatingElement = createAndReturnPRepeatingElementGetAndAttatchView();
		let presentation = CORATEST.presentationStub("maximized");
		pRepeatingElement.addPresentation(presentation);

		let buttonView = view.childNodes[2];


		let alternativeButton = buttonView.childNodes[1];
		assert.strictEqual(alternativeButton.className, "iconButton alternativeButton")
		let defaultButton = buttonView.childNodes[2];
		assert.strictEqual(defaultButton.className, "iconButton defaultButton")


		assert.strictEqual(altFuncWasCalled, 0);
		CORATESTHELPER.simulateOnclick(defaultButton);
		assert.strictEqual(altFuncWasCalled, 1);
		CORATESTHELPER.simulateOnclick(defaultButton);
		CORATESTHELPER.simulateOnclick(defaultButton);
		CORATESTHELPER.simulateOnclick(defaultButton);
		assert.strictEqual(altFuncWasCalled, 1);
	});

});