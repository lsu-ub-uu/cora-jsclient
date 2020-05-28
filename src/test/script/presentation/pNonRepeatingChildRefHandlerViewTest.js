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
QUnit.module("presentation/pNonRepeatingChildRefHandlerViewTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.dependencies = {};

		this.defaultChild = document.createElement("SPAN");
		var content = document.createTextNode(JSON
				.stringify("content needed for span to be visible in chrome"));
		this.defaultChild.appendChild(content);
		this.defaultChild.className = "someNode";
		this.defaultButton;

		this.alternativeChild = document.createElement("SPAN");
		var content2 = document.createTextNode(JSON
				.stringify("content needed for span to be visible in chrome"));
		this.alternativeChild.appendChild(content2);
		this.alternativeChild.className = "someOtherNode";
		this.alternativeButton;

		this.spec = {
			mode : "input"
		};
		this.createHandlerAddChildrenAndReturnHandler = function(presentationSizeIn) {
			let presentationSize = presentationSizeIn!==undefined ? presentationSizeIn : "bothEqual";
			var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
					this.dependencies, this.spec);
			pNonRepeatingChildRefHandlerView.addChild(this.defaultChild);

			pNonRepeatingChildRefHandlerView.addAlternativeChild(this.alternativeChild, 
				presentationSize);
			var view = pNonRepeatingChildRefHandlerView.getView();
			this.fixture.appendChild(view);

			var buttonView = view.childNodes[2];
			this.alternativeButton = buttonView.childNodes[0];
			this.defaultButton = buttonView.childNodes[1];

			return pNonRepeatingChildRefHandlerView;
		}
		this.createHandlerAddChildAndReturnHandler = function() {
			var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
					this.dependencies, this.spec);
			pNonRepeatingChildRefHandlerView.addChild(this.defaultChild);

			// pNonRepeatingChildRefHandlerView.addAlternativeChild(this.alternativeChild);
			this.fixture.appendChild(pNonRepeatingChildRefHandlerView.getView());

			return pNonRepeatingChildRefHandlerView;
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var pChildRefHandlerViewSpec = {};
	var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	assert.strictEqual(pNonRepeatingChildRefHandlerView.type, "pNonRepeatingChildRefHandlerView");
});

QUnit.test("testInitCreatesBaseView", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "someSContainer"
	};
	var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pNonRepeatingChildRefHandlerView.getView();
	assert.strictEqual(view.nodeName, "SPAN");
	assert
			.strictEqual(view.className,
					"pNonRepeatingChildRefHandler someSContainer containsNoData");
});

QUnit
		.test(
				"testInitCreatesBaseViewWithStyleInfo",
				function(assert) {
					var pChildRefHandlerViewSpec = {
						"presentationId" : "someSContainer",
						textStyle : "someTextStyle",
						childStyle : "someChildStyle"
					};
					var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
							this.dependencies, pChildRefHandlerViewSpec);
					var view = pNonRepeatingChildRefHandlerView.getView();
					assert.strictEqual(view.nodeName, "SPAN");
					assert
							.strictEqual(view.className,
									"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsNoData");
				});

QUnit
		.test(
				"testSetStyleDataInfo",
				function(assert) {
					var pChildRefHandlerViewSpec = {
						"presentationId" : "someSContainer",
						textStyle : "someTextStyle",
						childStyle : "someChildStyle"
					};
					var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
							this.dependencies, pChildRefHandlerViewSpec);
					var viewHandler = pNonRepeatingChildRefHandlerView;
					var view = viewHandler.getView();
					assert
							.strictEqual(view.className,
									"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsNoData");

					viewHandler.setHasDataStyle(true);
					assert
							.strictEqual(view.className,
									"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsData");

					viewHandler.setHasDataStyle(false);
					assert
							.strictEqual(view.className,
									"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer containsNoData");
				});

QUnit.test("testAddChild", function(assert) {
	var pChildRefHandlerViewSpec = {};
	var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	pNonRepeatingChildRefHandlerView.addChild(this.defaultChild);

	var view = pNonRepeatingChildRefHandlerView.getView();

	assert.strictEqual(view.firstChild, this.defaultChild);
	assert.strictEqual(view.firstChild.className, "someNode default");
});

QUnit.test("testAddAlternativeChild", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler().getView();
	assert.strictEqual(view.childNodes[1], this.alternativeChild);
	assert.strictEqual(view.childNodes[1].className, "someOtherNode alternative");

	var buttonView = view.childNodes[2];
	assert.strictEqual(buttonView.nodeName, "SPAN");
	assert.strictEqual(buttonView.className, "buttonView");
});

QUnit.test("testAddAlternativeChildHasButtons", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler().getView();
	var buttonView = view.childNodes[2];

	assert.strictEqual(buttonView.childNodes.length, 2);
});

QUnit.test("testalternativeButtonHasCorrectClassName", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler("bothEqual").getView();
	var buttonView = view.childNodes[2];
	var alternativeButton = buttonView.childNodes[0];

	assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
});

QUnit.test("testdefaultButtonHasCorrectClassName", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler("bothEqual").getView();
	var buttonView = view.childNodes[2];
	var defaultButton = buttonView.childNodes[1];

	assert.strictEqual(defaultButton.className, "iconButton defaultButton");
});

QUnit.test("testalternativeButtonHasCorrectClassNameForFirstSmaller", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler("firstSmaller").getView();
	var buttonView = view.childNodes[2];

	var alternativeButton = buttonView.childNodes[0];
	assert.strictEqual(alternativeButton.className, "iconButton maximizeButton");

	var defaultButton = buttonView.childNodes[1];
	assert.strictEqual(defaultButton.className, "iconButton minimizeButton");
});

QUnit.test("testalternativeButtonHasCorrectClassNameForFirstLarger", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler("firstLarger").getView();
	var buttonView = view.childNodes[2];

	var alternativeButton = buttonView.childNodes[0];
	assert.strictEqual(alternativeButton.className, "iconButton minimizeButton");

	var defaultButton = buttonView.childNodes[1];
	assert.strictEqual(defaultButton.className, "iconButton maximizeButton");
});

QUnit.test("testButtonFunctions", function(assert) {
	var viewHandler = this.createHandlerAddChildrenAndReturnHandler();

	viewHandler.showContent();

	assert.allVisible([ this.defaultChild, this.alternativeButton ]);
	assert.allNotVisible([ this.alternativeChild, this.defaultButton ]);

	CORATESTHELPER.simulateOnclick(this.alternativeButton);
	assert.allNotVisible([ this.defaultChild, this.alternativeButton ]);
	assert.allVisible([ this.alternativeChild, this.defaultButton ]);

	CORATESTHELPER.simulateOnclick(this.defaultButton);
	assert.allVisible([ this.defaultChild, this.alternativeButton ]);
	assert.allNotVisible([ this.alternativeChild, this.defaultButton ]);
});

QUnit.test("testShowAlterntiveButtonCallsFunction", function(assert) {
	var altFuncWasCalled = 0;
	var altFunc = function() {
		altFuncWasCalled++;
	}
	this.spec.callOnFirstShowOfAlternativePresentation = altFunc;
	var viewHandler = this.createHandlerAddChildrenAndReturnHandler();

	viewHandler.showContent();


	assert.strictEqual(altFuncWasCalled, 0);
	CORATESTHELPER.simulateOnclick(this.alternativeButton);
	assert.strictEqual(altFuncWasCalled, 1);
	CORATESTHELPER.simulateOnclick(this.alternativeButton);
	CORATESTHELPER.simulateOnclick(this.alternativeButton);
	CORATESTHELPER.simulateOnclick(this.alternativeButton);
	assert.strictEqual(altFuncWasCalled, 1);
});

QUnit.test("testButtonFunctionsKeyboardSpace", function(assert) {
	var viewHandler = this.createHandlerAddChildrenAndReturnHandler();

	viewHandler.showContent();

	assert.allVisible([ this.defaultChild, this.alternativeButton ]);
	assert.allNotVisible([ this.alternativeChild, this.defaultButton ]);

	CORATESTHELPER.simulateKeydown(this.alternativeButton, " ");
	assert.allNotVisible([ this.defaultChild, this.alternativeButton ]);
	assert.allVisible([ this.alternativeChild, this.defaultButton ]);

	CORATESTHELPER.simulateKeydown(this.defaultButton, " ");
	assert.allVisible([ this.defaultChild, this.alternativeButton ]);
	assert.allNotVisible([ this.alternativeChild, this.defaultButton ]);

});

QUnit.test("testButtonFunctionsKeyboardEnter", function(assert) {
	var viewHandler = this.createHandlerAddChildrenAndReturnHandler();

	viewHandler.showContent();

	assert.allVisible([ this.defaultChild, this.alternativeButton ]);
	assert.allNotVisible([ this.alternativeChild, this.defaultButton ]);

	CORATESTHELPER.simulateKeydown(this.alternativeButton, "Enter");
	assert.allNotVisible([ this.defaultChild, this.alternativeButton ]);
	assert.allVisible([ this.alternativeChild, this.defaultButton ]);

	CORATESTHELPER.simulateKeydown(this.defaultButton, "Enter");
	assert.allVisible([ this.defaultChild, this.alternativeButton ]);
	assert.allNotVisible([ this.alternativeChild, this.defaultButton ]);
});

QUnit.test("testHideAndShowContentOnlyOnePresentationShouldNotCrash", function(assert) {
	var viewHandler = this.createHandlerAddChildAndReturnHandler();
	var view = viewHandler.getView();

	viewHandler.showContent();

	assert.visible(this.defaultChild);

	viewHandler.hideContent();
	assert.notVisible(this.defaultChild);

	viewHandler.showContent();
	assert.visible(this.defaultChild);
});

QUnit.test("testHideAndShowContent", function(assert) {
	var viewHandler = this.createHandlerAddChildrenAndReturnHandler();
	var view = viewHandler.getView();
	var buttonView = view.childNodes[2];

	viewHandler.showContent();

	assert.visible(this.defaultChild);
	assert.notVisible(this.alternativeChild);
	assert.visible(buttonView);

	viewHandler.hideContent();
	assert.notVisible(this.defaultChild);
	assert.notVisible(this.alternativeChild);
	assert.notVisible(buttonView);

	viewHandler.showContent();
	assert.visible(this.defaultChild);
	assert.notVisible(this.alternativeChild);
	assert.visible(buttonView);
});

QUnit.test("testHideAndShowContentAlternativeShown", function(assert) {
	var viewHandler = this.createHandlerAddChildrenAndReturnHandler();
	var view = viewHandler.getView();
	var buttonView = view.childNodes[2];
	var alternativeButton = buttonView.childNodes[0];

	viewHandler.showContent();

	CORATESTHELPER.simulateOnclick(this.alternativeButton);

	CORATESTHELPER.simulateOnclick(this.alternativeButton);
	assert.notVisible(this.defaultChild);
	assert.visible(this.alternativeChild);
	assert.visible(buttonView);

	viewHandler.hideContent();
	assert.notVisible(this.defaultChild);
	assert.notVisible(this.alternativeChild);
	assert.notVisible(buttonView);

	viewHandler.showContent();
	assert.notVisible(this.defaultChild);
	assert.visible(this.alternativeChild);
	assert.visible(buttonView);
});