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
		let presentationSize = presentationSizeIn !== undefined ? presentationSizeIn : "bothEqual";
		let pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
			dependencies, spec);
		pNonRepeatingChildRefHandlerView.addChild(defaultChild);

		pNonRepeatingChildRefHandlerView.addAlternativeChild(alternativeChild,
			presentationSize);
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

		fixture.appendChild(pNonRepeatingChildRefHandlerView.getView());

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
		assert
			.strictEqual(view.className,
				"pNonRepeatingChildRefHandler someSContainer containsNoData");
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
		assert.strictEqual(view.className,
			"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsData");

		viewHandler.setHasDataStyle(false);
		assert.strictEqual(view.className,
			"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsNoData");
		assert.strictEqual(view.childNodes.length, 0);
	});

	test("testInitWithClickabeHeadline", function(assert) {
		let pChildRefHandlerViewSpec = {
			clickableHeadlineText: "Some headline text"
		};
		let pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(dependencies,
			pChildRefHandlerViewSpec);

		let view = pNonRepeatingChildRefHandlerView.getView();
		let headline = view.childNodes[0];

		assert.strictEqual(headline.nodeName, "H2");
		assert.strictEqual(headline.textContent, "Some headline text");
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

	test("testAddAlternativeChild", function(assert) {
		let view = createHandlerAddChildrenAndReturnHandler().getView();
		assert.strictEqual(view.childNodes[1], alternativeChild);
		assert.strictEqual(view.childNodes[1].className, "someOtherNode alternative");

		let buttonView = view.childNodes[2];
		assert.strictEqual(buttonView.nodeName, "SPAN");
		assert.strictEqual(buttonView.className, "buttonView");
	});

	test("testAddAlternativeChildHasButtons", function(assert) {
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

	test("testShowAlterntiveButtonCallsFunction", function(assert) {
		let altFuncWasCalled = 0;
		let altFunc = function() {
			altFuncWasCalled++;
		}
		spec.callOnFirstShowOfAlternativePresentation = altFunc;
		let viewHandler = createHandlerAddChildrenAndReturnHandler();

		viewHandler.showContent();


		assert.strictEqual(altFuncWasCalled, 0);
		CORATESTHELPER.simulateOnclick(alternativeButton);
		assert.strictEqual(altFuncWasCalled, 1);
		CORATESTHELPER.simulateOnclick(alternativeButton);
		CORATESTHELPER.simulateOnclick(alternativeButton);
		CORATESTHELPER.simulateOnclick(alternativeButton);
		assert.strictEqual(altFuncWasCalled, 1);
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

		assert.visible(defaultChild);
		assert.notVisible(alternativeChild);
		assert.visible(buttonView);

		viewHandler.hideContent();
		assert.notVisible(defaultChild);
		assert.notVisible(alternativeChild);
		assert.notVisible(buttonView);

		viewHandler.showContent();
		assert.visible(defaultChild);
		assert.notVisible(alternativeChild);
		assert.visible(buttonView);
	});

	test("testHideAndShowContentAlternativeShown", function(assert) {
		let viewHandler = createHandlerAddChildrenAndReturnHandler();
		let view = viewHandler.getView();
		let buttonView = view.childNodes[2];
		let alternativeButton = buttonView.childNodes[0];

		viewHandler.showContent();

		CORATESTHELPER.simulateOnclick(alternativeButton);

		CORATESTHELPER.simulateOnclick(alternativeButton);
		assert.notVisible(defaultChild);
		assert.visible(alternativeChild);
		assert.visible(buttonView);

		viewHandler.hideContent();
		assert.notVisible(defaultChild);
		assert.notVisible(alternativeChild);
		assert.notVisible(buttonView);

		viewHandler.showContent();
		assert.notVisible(defaultChild);
		assert.visible(alternativeChild);
		assert.visible(buttonView);
	});
});
