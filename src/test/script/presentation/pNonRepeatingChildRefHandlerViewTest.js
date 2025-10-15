/*
 * Copyright 2018 Uppsala University Library
 * Copyright 2018 Olov McKie
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
QUnit.module("presentation/pNonRepeatingChildRefHandlerViewTest.js", hooks => {
	const test = QUnit.test;
	let fixture;
	let dependencies;

	let defaultChild;
	let defaultButton;
	let alternativeChild;
	let alternativeButton;

	let spec;

	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");
		dependencies = {};

		defaultChild = document.createElement("SPAN");
		let content = document.createTextNode(JSON
			.stringify("content needed for span to be visible in chrome"));
		defaultChild.appendChild(content);
		defaultChild.className = "someNode";

		alternativeChild = document.createElement("SPAN");
		let content2 = document.createTextNode(JSON
			.stringify("content needed for span to be visible in chrome"));
		alternativeChild.appendChild(content2);
		alternativeChild.className = "someOtherNode";

		spec = {
			mode: "input"
		};

	});

	hooks.afterEach(() => {
		//no after
	});

	const createHandlerAddChildrenAndReturnHandler = function(presentationSizeIn) {
		spec.presentationSize = presentationSizeIn !== undefined ? presentationSizeIn : "bothEqual";
		let pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
			dependencies, spec);
		pNonRepeatingChildRefHandlerView.addChild(defaultChild);

		pNonRepeatingChildRefHandlerView.addAlternativePresentation(alternativeChild);
		let view = pNonRepeatingChildRefHandlerView.getView();
		fixture.appendChild(view);

		let buttonView = view.childNodes[2];
		alternativeButton = buttonView.childNodes[0];
		defaultButton = buttonView.childNodes[1];

		return pNonRepeatingChildRefHandlerView;
	};

	const createHandlerAddChildAndReturnHandler = function() {
		let pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
			dependencies, spec);
		pNonRepeatingChildRefHandlerView.addChild(defaultChild);

		let view = pNonRepeatingChildRefHandlerView.getView();
		fixture.appendChild(view);

		let buttonView = view.childNodes[2];
		if (buttonView) {
			alternativeButton = buttonView.childNodes[0];
			defaultButton = buttonView.childNodes[1];
		}
		return pNonRepeatingChildRefHandlerView;
	};

	test("testInit", function(assert) {
		let pChildRefHandlerViewSpec = {};
		let pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(dependencies,
			pChildRefHandlerViewSpec);
		assert.strictEqual(pNonRepeatingChildRefHandlerView.type, "pNonRepeatingChildRefHandlerView");
	});

	test("testInitCreatesBaseView", function(assert) {
		let pChildRefHandlerViewSpec = {
			presentationId: "someSContainer"
		};
		let pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(dependencies,
			pChildRefHandlerViewSpec);
		let view = pNonRepeatingChildRefHandlerView.getView();
		assert.strictEqual(view.nodeName, "SPAN");
		assert.strictEqual(view.className, "pNonRepeatingChildRefHandler someSContainer containsNoData");
	});

	test("testInitCreatesBaseViewWithStyleInfo", function(assert) {
		let pChildRefHandlerViewSpec = {
			presentationId: "someSContainer",
			textStyle: "someTextStyle",
			childStyle: "someChildStyle"
		};
		let pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
			dependencies, pChildRefHandlerViewSpec);
		let view = pNonRepeatingChildRefHandlerView.getView();
		assert.strictEqual(view.nodeName, "SPAN");
		assert.strictEqual(view.className,
			"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsNoData");
	});

	test("testSetStyleDataInfo", function(assert) {
		let pChildRefHandlerViewSpec = {
			presentationId: "someSContainer",
			textStyle: "someTextStyle",
			childStyle: "someChildStyle"
		};
		let pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
			dependencies, pChildRefHandlerViewSpec);
		let viewHandler = pNonRepeatingChildRefHandlerView;
		let view = viewHandler.getView();
		assert.strictEqual(view.className,
			"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsNoData");

		viewHandler.setHasDataStyle(true);
		viewHandler.setHasErrorStyle(true);
		assert.strictEqual(view.className,
			"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsData containsError");

		viewHandler.setHasDataStyle(false);
		viewHandler.setHasErrorStyle(false);
		assert.strictEqual(view.className,
			"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsNoData");
		assert.strictEqual(view.childNodes.length, 0);
	});

	test("testAddChild", function(assert) {
		let pChildRefHandlerViewSpec = {};
		let pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(dependencies,
			pChildRefHandlerViewSpec);
		pNonRepeatingChildRefHandlerView.addChild(defaultChild);

		let view = pNonRepeatingChildRefHandlerView.getView();

		assert.strictEqual(view.childNodes[0], defaultChild);
		assert.strictEqual(view.childNodes[0].className, "someNode default");
	});

	test("testaddAlternativePresentation", function(assert) {
		let view = createHandlerAddChildrenAndReturnHandler().getView();
		assert.strictEqual(view.childNodes[1], alternativeChild);
		assert.strictEqual(view.childNodes[1].className, "someOtherNode alternative");

		let buttonView = view.childNodes[2];
		assert.strictEqual(buttonView.nodeName, "SPAN");
		assert.strictEqual(buttonView.className, "buttonView");
	});

	test("testaddAlternativePresentationHasButtons", function(assert) {
		let view = createHandlerAddChildrenAndReturnHandler().getView();
		let buttonView = view.childNodes[2];

		assert.strictEqual(buttonView.childNodes.length, 2);
	});

	test("testalternativeButtonHasCorrectClassName", function(assert) {
		let view = createHandlerAddChildrenAndReturnHandler("bothEqual").getView();
		let buttonView = view.childNodes[2];
		let alternativeButton = buttonView.childNodes[0];

		assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
	});

	test("testdefaultButtonHasCorrectClassName", function(assert) {
		let view = createHandlerAddChildrenAndReturnHandler("bothEqual").getView();
		let buttonView = view.childNodes[2];
		let defaultButton = buttonView.childNodes[1];

		assert.strictEqual(defaultButton.className, "iconButton defaultButton");
	});

	test("testalternativeButtonHasCorrectClassNameForFirstSmaller", function(assert) {
		let view = createHandlerAddChildrenAndReturnHandler("firstSmaller").getView();
		let buttonView = view.childNodes[2];

		let alternativeButton = buttonView.childNodes[0];
		assert.strictEqual(alternativeButton.className, "iconButton maximizeButton");

		let defaultButton = buttonView.childNodes[1];
		assert.strictEqual(defaultButton.className, "iconButton minimizeButton");
	});

	test("testalternativeButtonHasCorrectClassNameForFirstLarger", function(assert) {
		let view = createHandlerAddChildrenAndReturnHandler("firstLarger").getView();
		let buttonView = view.childNodes[2];

		let alternativeButton = buttonView.childNodes[0];
		assert.strictEqual(alternativeButton.className, "iconButton minimizeButton");

		let defaultButton = buttonView.childNodes[1];
		assert.strictEqual(defaultButton.className, "iconButton maximizeButton");
	});

	test("testInitWithClickabeHeadline_SingleInitiallyHidden", function(assert) {
		spec.presentationSize = "singleInitiallyHidden";
		spec.clickableHeadlineText = "Some headline text";
		let view = createHandlerAddChildAndReturnHandler().getView();
		let headline = view.childNodes[0];

		assert.strictEqual(headline.nodeName, "H2");
		assert.strictEqual(headline.className, "clickableHeadline");
		assert.strictEqual(headline.textContent, "Some headline text");

		let presentationView = view.childNodes[1];
		assert.strictEqual(presentationView.className, "someNode default");
		assert.notVisible(presentationView, "presentationView should not be visible");
		assert.strictEqual(view.childNodes.length, 3);

		let buttonView = view.childNodes[2];
		assert.strictEqual(buttonView.className, "buttonView");
		// test minimized/maximized button
		let alternativeButton = buttonView.childNodes[1];
		assert.strictEqual(alternativeButton.className, "iconButton maximizeButton");
		assert.visible(alternativeButton, "maximizeButton should be shown");
		let defaultButton = buttonView.childNodes[0];
		assert.strictEqual(defaultButton.className, "iconButton minimizeButton");
		assert.notVisible(defaultButton, "minimizeButton should be hidden");

		assert.strictEqual(buttonView.childNodes.length, 2);

		let clickableHeadline = view.childNodes[0];
		CORATESTHELPER.simulateOnclick(clickableHeadline);
		assert.visible(presentationView, "presentationView should be visible");

		assert.strictEqual(view.childNodes.length, 3);
	});

	test("testInitWithClickabeHeadline_nonDefaultHeadlineLevel", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		spec.clickableHeadlineLevel = "h4";
		let view = createHandlerAddChildAndReturnHandler().getView();
		let headline = view.childNodes[0];

		assert.strictEqual(headline.nodeName, "H4");
		assert.strictEqual(headline.className, "clickableHeadline");
		assert.strictEqual(headline.textContent, "Some headline text");

		assert.strictEqual(view.childNodes.length, 3);
	});


	test("testaddAlternativePresentation_headlineDefaultsToSingleInitiallyHidden", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		let pNonRepeatingChildRefHandlerView = createHandlerAddChildAndReturnHandler();
		let view = pNonRepeatingChildRefHandlerView.getView();

		let buttonView = view.childNodes[2];
		assert.strictEqual(buttonView.className, "buttonView");

		pNonRepeatingChildRefHandlerView.addAlternativePresentation(alternativeChild);

		let defaultPresentation = view.childNodes[1];
		assert.strictEqual(defaultPresentation.className, "someNode default");
		assert.visible(defaultPresentation, "defalutPresentation should be visible, as there is an alternative");
		assert.strictEqual(view.childNodes.length, 4);

		// test minimized/maximized button
		let alternativeButton = buttonView.childNodes[0];
		assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
		assert.visible(alternativeButton, "alternativeButton should be shown");
		let defaultButton = buttonView.childNodes[1];
		assert.strictEqual(defaultButton.className, "iconButton defaultButton");
		assert.notVisible(defaultButton, "defaultButton should be hidden");

		assert.strictEqual(buttonView.childNodes.length, 2);

		let clickableHeadline = view.childNodes[0];
		CORATESTHELPER.simulateOnclick(clickableHeadline);
		assert.visible(alternativeChild, "presentationView should be visible");
	});

	test("testaddAlternativePresentation_headlineSingleInitiallyVisible", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		spec.presentationSize = "singleInitiallyVisible";
		let pNonRepeatingChildRefHandlerView = createHandlerAddChildAndReturnHandler();
		let view = pNonRepeatingChildRefHandlerView.getView();

		let buttonView = view.childNodes[2];
		assert.strictEqual(buttonView.className, "buttonView");

		pNonRepeatingChildRefHandlerView.addAlternativePresentation(alternativeChild);

		let defaultPresentation = view.childNodes[1];
		assert.strictEqual(defaultPresentation.className, "someNode default");
		assert.visible(defaultPresentation, "defalutPresentation should be visible, as there is an alternative");
		assert.strictEqual(view.childNodes.length, 4);

		// test minimized/maximized button
		let minimizeButton = buttonView.childNodes[0];
		assert.strictEqual(minimizeButton.className, "iconButton minimizeButton");
		assert.visible(minimizeButton, "minimizeButton should be shown");
		let maximizeButton = buttonView.childNodes[1];
		assert.strictEqual(maximizeButton.className, "iconButton maximizeButton");
		assert.notVisible(maximizeButton, "maximizeButton should be hidden");

		assert.strictEqual(buttonView.childNodes.length, 2);

		let clickableHeadline = view.childNodes[0];
		CORATESTHELPER.simulateOnclick(clickableHeadline);
		assert.visible(alternativeChild, "presentationView should be visible");
	});

	test("testaddAlternativePresentation_headlineFirstSmaller", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		spec.presentationSize = "firstSmaller";
		let pNonRepeatingChildRefHandlerView = createHandlerAddChildAndReturnHandler();
		let view = pNonRepeatingChildRefHandlerView.getView();

		let buttonView = view.childNodes[2];
		assert.strictEqual(buttonView.className, "buttonView");

		pNonRepeatingChildRefHandlerView.addAlternativePresentation(alternativeChild);

		let defaultPresentation = view.childNodes[1];
		assert.strictEqual(defaultPresentation.className, "someNode default");
		assert.visible(defaultPresentation, "defalutPresentation should be visible, as there is an alternative");
		assert.strictEqual(view.childNodes.length, 4);

		// test minimized/maximized button
		let minimizeButton = buttonView.childNodes[1];
		assert.strictEqual(minimizeButton.className, "iconButton minimizeButton");
		assert.notVisible(minimizeButton, "minimizeButton should not be visible");
		let maximizeButton = buttonView.childNodes[0];
		assert.strictEqual(maximizeButton.className, "iconButton maximizeButton");
		assert.visible(maximizeButton, "maximizeButton should be visible");

		assert.strictEqual(buttonView.childNodes.length, 2);

		let clickableHeadline = view.childNodes[0];
		CORATESTHELPER.simulateOnclick(clickableHeadline);
		assert.visible(alternativeChild, "presentationView should be visible");
	});

	test("testaddAlternativePresentation_headlineFirstLarger", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		spec.presentationSize = "firstLarger";
		let pNonRepeatingChildRefHandlerView = createHandlerAddChildAndReturnHandler();
		let view = pNonRepeatingChildRefHandlerView.getView();

		let buttonView = view.childNodes[2];
		assert.strictEqual(buttonView.className, "buttonView");

		pNonRepeatingChildRefHandlerView.addAlternativePresentation(alternativeChild);

		let defaultPresentation = view.childNodes[1];
		assert.strictEqual(defaultPresentation.className, "someNode default");
		assert.visible(defaultPresentation, "defalutPresentation should be visible, as there is an alternative");
		assert.strictEqual(view.childNodes.length, 4);

		// test minimized/maximized button
		let minimizeButton = buttonView.childNodes[0];
		assert.strictEqual(minimizeButton.className, "iconButton minimizeButton");
		assert.visible(minimizeButton, "minimizeButton should be visible");
		let maximizeButton = buttonView.childNodes[1];
		assert.strictEqual(maximizeButton.className, "iconButton maximizeButton");
		assert.notVisible(maximizeButton, "maximizeButton should not be visible");

		assert.strictEqual(buttonView.childNodes.length, 2);

		let clickableHeadline = view.childNodes[0];
		CORATESTHELPER.simulateOnclick(clickableHeadline);
		assert.visible(alternativeChild, "presentationView should be visible");
	});

	test("testButtonFunctions", function(assert) {
		let viewHandler = createHandlerAddChildrenAndReturnHandler();

		viewHandler.showContent();

		assert.allVisible([defaultChild, alternativeButton]);
		assert.allNotVisible([alternativeChild, defaultButton]);

		CORATESTHELPER.simulateOnclick(alternativeButton);
		assert.allNotVisible([defaultChild, alternativeButton]);
		assert.allVisible([alternativeChild, defaultButton]);

		CORATESTHELPER.simulateOnclick(defaultButton);
		assert.allVisible([defaultChild, alternativeButton]);
		assert.allNotVisible([alternativeChild, defaultButton]);
	});

	test("testShowDefaultButtonCallsFunction", function(assert) {
		let altFuncWasCalled = 0;
		let altFunc = function() {
			altFuncWasCalled++;
		}
		spec.callOnFirstShowOfPresentation = altFunc;
		let viewHandler = createHandlerAddChildrenAndReturnHandler();

		viewHandler.showContent();


		assert.strictEqual(altFuncWasCalled, 1);
		CORATESTHELPER.simulateOnclick(defaultButton);
		assert.strictEqual(altFuncWasCalled, 1);
		CORATESTHELPER.simulateOnclick(defaultButton);
		CORATESTHELPER.simulateOnclick(defaultButton);
		CORATESTHELPER.simulateOnclick(defaultButton);
		assert.strictEqual(altFuncWasCalled, 1);
	});

	test("testButtonFunctions", function(assert) {
		let altFuncWasCalled = 0;
		let altFunc = function() {
			altFuncWasCalled++;
		}
		spec.callOnFirstShowOfPresentation = altFunc;
		spec.presentationSize = "singleInitiallyHidden";
		spec.clickableHeadlineText = "Some headline text";
		let viewHandler = createHandlerAddChildAndReturnHandler();

		viewHandler.showContent();

		assert.strictEqual(altFuncWasCalled, 1);
		CORATESTHELPER.simulateOnclick(defaultButton);
		assert.strictEqual(altFuncWasCalled, 2);
		CORATESTHELPER.simulateOnclick(defaultButton);
		CORATESTHELPER.simulateOnclick(defaultButton);
		CORATESTHELPER.simulateOnclick(defaultButton);
		assert.strictEqual(altFuncWasCalled, 2);
	});

	test("testShowAlterntiveButtonCallsFunction", function(assert) {
		let altFuncWasCalled = 0;
		let altFunc = function() {
			altFuncWasCalled++;
		}
		spec.callOnFirstShowOfPresentation = altFunc;
		let viewHandler = createHandlerAddChildrenAndReturnHandler();

		viewHandler.showContent();


		assert.strictEqual(altFuncWasCalled, 1);
		CORATESTHELPER.simulateOnclick(alternativeButton);
		assert.strictEqual(altFuncWasCalled, 2);
		CORATESTHELPER.simulateOnclick(alternativeButton);
		CORATESTHELPER.simulateOnclick(alternativeButton);
		CORATESTHELPER.simulateOnclick(alternativeButton);
		assert.strictEqual(altFuncWasCalled, 2);
	});

	test("testButtonFunctionsKeyboardSpace", function(assert) {
		let viewHandler = createHandlerAddChildrenAndReturnHandler();

		viewHandler.showContent();

		assert.allVisible([defaultChild, alternativeButton]);
		assert.allNotVisible([alternativeChild, defaultButton]);

		CORATESTHELPER.simulateKeydown(alternativeButton, " ");
		assert.allNotVisible([defaultChild, alternativeButton]);
		assert.allVisible([alternativeChild, defaultButton]);

		CORATESTHELPER.simulateKeydown(defaultButton, " ");
		assert.allVisible([defaultChild, alternativeButton]);
		assert.allNotVisible([alternativeChild, defaultButton]);
	});

	test("testButtonFunctionsKeyboardEnter", function(assert) {
		let viewHandler = createHandlerAddChildrenAndReturnHandler();

		viewHandler.showContent();

		assert.allVisible([defaultChild, alternativeButton]);
		assert.allNotVisible([alternativeChild, defaultButton]);

		CORATESTHELPER.simulateKeydown(alternativeButton, "Enter");
		assert.allNotVisible([defaultChild, alternativeButton]);
		assert.allVisible([alternativeChild, defaultButton]);

		CORATESTHELPER.simulateKeydown(defaultButton, "Enter");
		assert.allVisible([defaultChild, alternativeButton]);
		assert.allNotVisible([alternativeChild, defaultButton]);
	});

	test("testHideAndShowContentOnlyOnePresentationShouldNotCrash", function(assert) {
		let viewHandler = createHandlerAddChildAndReturnHandler();

		viewHandler.showContent();

		assert.visible(defaultChild);

		viewHandler.hideContent();
		assert.notVisible(defaultChild);

		viewHandler.showContent();
		assert.visible(defaultChild);
	});

	test("testHideAndShowContent", function(assert) {
		let viewHandler = createHandlerAddChildrenAndReturnHandler();
		let view = viewHandler.getView();
		let buttonView = view.childNodes[2];

		viewHandler.showContent();

		assert.allVisible([defaultChild, buttonView]);
		assert.notVisible(alternativeChild);

		viewHandler.hideContent();
		assert.allNotVisible([defaultChild, alternativeChild, buttonView]);

		viewHandler.showContent();
		assert.allVisible([defaultChild, buttonView]);
		assert.notVisible(alternativeChild);
	});

	test("testHideAndShowContentAlternativeShown", function(assert) {
		let viewHandler = createHandlerAddChildrenAndReturnHandler();
		let view = viewHandler.getView();
		let buttonView = view.childNodes[2];
		let alternativeButton = buttonView.childNodes[0];

		viewHandler.showContent();

		CORATESTHELPER.simulateOnclick(alternativeButton);

		assert.notVisible(defaultChild);
		assert.allVisible([view, alternativeChild, buttonView]);

		viewHandler.hideContent();
		assert.allNotVisible([view, defaultChild, alternativeChild, buttonView]);

		viewHandler.showContent();
		assert.notVisible(defaultChild);
		assert.allVisible([view, alternativeChild, buttonView]);
	});

	test("testHideAndShowContent_withClickableHeadline", function(assert) {
		spec.clickableHeadlineText = "Some headline text";
		let viewHandler = createHandlerAddChildrenAndReturnHandler();
		let view = viewHandler.getView();
		let headline = view.childNodes[0];
		let buttonView = view.childNodes[3];

		viewHandler.showContent();

		assert.strictEqual(buttonView.className, "buttonView");
		assert.strictEqual(view.childNodes.length, 4);
		assert.allVisible([view]);
		assert.allVisible([headline]);
		assert.allVisible([defaultChild]);
		assert.allVisible([buttonView]);
		assert.allVisible([view, headline, defaultChild, buttonView]);
		assert.notVisible(alternativeChild);

		viewHandler.hideContent();
		assert.allNotVisible([view, headline, defaultChild, alternativeChild, buttonView]);

		viewHandler.showContent();
		assert.allVisible([view, headline, defaultChild, buttonView]);
		assert.notVisible(alternativeChild);
	});
});
