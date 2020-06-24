/*
 * Copyright 2016, 2017, 2018 Olov McKie
 * Copyright 2017, 2018 Uppsala University Library
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
QUnit.module("presentation/pRepeatingElementTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();

		this.dependencies = {
			"jsBookkeeper" : this.jsBookkeeper
		};
		this.spec = {
			"path" : {},
			"pChildRefHandlerView" : CORATEST.pChildRefHandlerViewSpy(),
			"pChildRefHandler":CORATEST.pChildRefHandlerSpy(),
			"userCanRemove" : true,
			"userCanMove" : true,
			"userCanAddBefore" : true
		};
	}, 
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
	assert.deepEqual(view.className, "repeatingElement");
	assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

	assert.strictEqual(pRepeatingElement.getPath(), this.spec.path);

	var repeatingElement = view;
	assert.strictEqual(repeatingElement.className, "repeatingElement");
	var buttonView = repeatingElement.childNodes[0];
	assert.strictEqual(buttonView.className, "buttonView");

	// remove button
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "iconButton removeButton");

	// drag button
	var removeButton = buttonView.childNodes[1];
	assert.strictEqual(removeButton.className, "iconButton dragButton");

	// addBeforeButton
	var addBeforeButton = buttonView.childNodes[2];
	assert.strictEqual(addBeforeButton.className, "iconButton addBeforeButton");

	assert.strictEqual(buttonView.childNodes.length, 3);
});

QUnit.test("testInitNoAddBeforeButton", function(assert) {
	this.spec.userCanAddBefore = false;
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);
	
	assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
	assert.deepEqual(view.className, "repeatingElement");
	assert.ok(view.modelObject === pRepeatingElement,
	"modelObject should be a pointer to the javascript object instance");
	
	assert.strictEqual(pRepeatingElement.getPath(), this.spec.path);
	
	var repeatingElement = view;
	assert.strictEqual(repeatingElement.className, "repeatingElement");
	var buttonView = repeatingElement.childNodes[0];
	assert.strictEqual(buttonView.className, "buttonView");
	
	// remove button
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "iconButton removeButton");
	
	// drag button
	var removeButton = buttonView.childNodes[1];
	assert.strictEqual(removeButton.className, "iconButton dragButton");
	
	
	assert.strictEqual(buttonView.childNodes.length, 2);
});

QUnit.test("testInitNoRemoveOrDragOrAddBeforeButtonWhenUserCantDoAnything", function(assert) {
	this.spec.userCanRemove = false;
	this.spec.userCanMove = false;
	this.spec.userCanAddBefore = false;
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
	assert.deepEqual(view.className, "repeatingElement");
	assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

	assert.strictEqual(pRepeatingElement.getPath(), this.spec.path);

	var repeatingElement = view;
	assert.strictEqual(repeatingElement.className, "repeatingElement");
	var buttonView = repeatingElement.childNodes[0];
	assert.strictEqual(buttonView.className, "buttonView");

	assert.strictEqual(buttonView.childNodes.length, 0);
});

QUnit.test("testGetDependencies", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.getSpec(), this.spec);
});
QUnit.test("testDragenterToTellPChildRefHandlerThatSomethingIsDragedOverThis", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	pRepeatingElement.getView().ondragenter();
	assert
			.strictEqual(this.spec.pChildRefHandlerView.getRepeatingElementDragOver(),
					pRepeatingElement);
});
QUnit.test(
		"testDragenterToTellPChildRefHandlerThatSomethingIsDragedOverThisNoFunctionWhenNoMove",
		function(assert) {
			this.spec.userCanMove = false;
			var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
			var view = pRepeatingElement.getView();
			this.fixture.appendChild(view);

			assert.strictEqual(pRepeatingElement.getView().ondragenter, null);
		});

QUnit.test("testButtonViewAndRemoveButton", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "iconButton removeButton");
});

QUnit.test("test0to1ShouldHaveRemoveButtonNoAddBeforeButton", function(assert) {
	this.spec.userCanMove = false;
	this.spec.userCanAddBefore = false;
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "iconButton removeButton");
	assert.strictEqual(buttonView.childNodes.length, 1);
});

QUnit.test("test1to1ShouldHaveNoRemoveOrDragOrAddBeforeButton", function(assert) {
	this.spec.userCanRemove = false;
	this.spec.userCanMove = false;
	this.spec.userCanAddBefore = false;
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	assert.strictEqual(buttonView.childNodes.length, 0);
});

QUnit.test("testRemoveButtonOnclick", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;

	CORATESTHELPER.simulateOnclick(removeButton);

	// subscription
	var removes = this.dependencies.jsBookkeeper.getRemoveDataArray();
	assert.deepEqual(removes.length, 1);

	var firstRemove = removes[0];
	assert.strictEqual(firstRemove.type, "remove");
	var path = {};
	assert.deepEqual(firstRemove.path, path);
});

QUnit.test("testRemoveButtonHover", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);
	assert.deepEqual(view.className, "repeatingElement");

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;

	var event = new Event('mouseenter');
	removeButton.dispatchEvent(event);
	assert.deepEqual(view.className, "repeatingElement hoverRemove");

	var event = new Event('mouseleave');
	removeButton.dispatchEvent(event);
	assert.deepEqual(view.className, "repeatingElement");

	var event = new Event('mouseenter');
	removeButton.dispatchEvent(event);
	assert.deepEqual(view.className, "repeatingElement hoverRemove");

});

QUnit.test("testDragButtonOnmousedownOnmouseup", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var dragButton = buttonView.childNodes[1];

	assert.notOk(view.draggable);
	dragButton.onmousedown();
	assert.ok(view.draggable);
	dragButton.onmouseup();
	assert.notOk(view.draggable);
});

QUnit.test("testHideRemoveButton", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;

	assert.visible(removeButton, "buttonView should be visible");

	pRepeatingElement.hideRemoveButton();
	assert.notVisible(removeButton, "buttonView should be hidden");

	pRepeatingElement.showRemoveButton();
	assert.visible(removeButton, "buttonView should be visible");
});

QUnit.test("testHideDragButton", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var dragButton = buttonView.childNodes[1];

	assert.visible(dragButton, "buttonView should be visible");

	pRepeatingElement.hideDragButton();
	assert.notVisible(dragButton, "buttonView should be hidden");

	pRepeatingElement.showDragButton();
	assert.visible(dragButton, "buttonView should be visible");
});

QUnit.test("testHideDragButtonWhenDragButtonNotPresent", function(assert) {
	this.spec.userCanMove = false;
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	
	assert.strictEqual(buttonView.childNodes.length, 2);

	//since dragButton is undefined, hide is not called from hideDragButton(), 
	//this crashed before
	pRepeatingElement.hideDragButton();
});

QUnit.test("testAddBeforeButtonOnclick", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var addBeforeButton = buttonView.childNodes[2];

	CORATESTHELPER.simulateOnclick(addBeforeButton);

	 var addBefores = this.spec.pChildRefHandler.getSendAddBeforeDataArray();
	 assert.deepEqual(addBefores.length, 1);
	
	 var firstAddBefore= addBefores[0];
	 var path = {};
	 assert.deepEqual(firstAddBefore.path, path);
});

QUnit.test("testHideShowAddBeforeButton", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var addBeforeButton = buttonView.childNodes[2];

	assert.visible(addBeforeButton, "addBeforeButton should be visible");

	pRepeatingElement.hideAddBeforeButton();
	assert.notVisible(addBeforeButton, "addBeforeButton should be hidden");

	pRepeatingElement.showAddBeforeButton();
	assert.visible(addBeforeButton, "addBeforeButton should be visible");
});

QUnit.test("testAddPresentation", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var presentation = CORATEST.presentationStub();

	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);
	assert.deepEqual(view.className, "repeatingElement");
});

QUnit.test("testAddPresentationNoStyle", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var presentation = CORATEST.presentationStub();

	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);
	assert.deepEqual(view.className, "repeatingElement");
});

QUnit.test("testaddAlternativePresentationFirstSmaller", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("minimized", "presentationStubMinimized");
	pRepeatingElement.addPresentation(presentation);

	var alternativePresentation = CORATEST.presentationStub("maximized", "presentationStubMaximized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "firstSmaller");

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStubMinimized default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 3);

	var alternativePresentationView = view.childNodes[1];
	assert.strictEqual(alternativePresentationView.className, "presentationStubMaximized alternative");
	assert.notVisible(alternativePresentationView, "alternativePresentationView should be hidden");

	// test minimized/maximized button
	var alternativeButton = buttonView.childNodes[1];
	assert.strictEqual(alternativeButton.className, "iconButton maximizeButton");
	assert.visible(alternativeButton, "maximizeButton should be shown");
	var defaultButton = buttonView.childNodes[2];
	assert.strictEqual(defaultButton.className, "iconButton minimizeButton");
	assert.notVisible(defaultButton, "minimizeButton should be hidden");
});

QUnit.test("testaddAlternativePresentationFirstLarger", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized", "presentationStubMaximized");
	pRepeatingElement.addPresentation(presentation);

	var alternativePresentation = CORATEST.presentationStub("minimized", "presentationStubMinimized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "firstLarger");

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStubMaximized default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 3);

	var alternativePresentationView = view.childNodes[1];
	assert.strictEqual(alternativePresentationView.className, "presentationStubMinimized alternative");
	assert.notVisible(alternativePresentationView, "alternativePresentationView should be hidden");

	// test minimized/maximized button
	var alternativeButton = buttonView.childNodes[1];
	assert.strictEqual(alternativeButton.className, "iconButton minimizeButton");
	assert.visible(alternativeButton, "minimizeButton should be shown");
	var defaultButton = buttonView.childNodes[2];
	assert.strictEqual(defaultButton.className, "iconButton maximizeButton");
	assert.notVisible(defaultButton, "maximizeButton should be hidden");
});

QUnit.test("testaddAlternativePresentationBothEqual", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);

	var alternativePresentation = CORATEST.presentationStub("minimized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "bothEqual");
	assert.deepEqual(view.className, "repeatingElement");

	var alternativePresentationView = view.childNodes[1];
	assert.strictEqual(alternativePresentationView.className, "presentationStub alternative");
	assert.notVisible(alternativePresentationView, "alternativePresentationView should be hidden");

	// test minimized/maximized button
	var alternativeButton = buttonView.childNodes[1];
	assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
	assert.visible(alternativeButton, "alternativeButton should be shown");
	var defaultButton = buttonView.childNodes[2];
	assert.strictEqual(defaultButton.className, "iconButton defaultButton");
	assert.notVisible(defaultButton, "defaultButton should be hidden");
});

QUnit.test("testMinimizealternativeButtonShouldWorkWithoutDraghandle", function(assert) {
	this.spec.userCanRemove = false;
	this.spec.userCanMove = false;
	this.spec.userCanAddBefore = false;
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var alternativePresentation = CORATEST.presentationStub("minimized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "bothEqual");

	var alternativeButton = buttonView.childNodes[0];
	assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
	assert.visible(alternativeButton, "alternativeButton should be shown");
	var defaultButton = buttonView.childNodes[1];
	assert.strictEqual(defaultButton.className, "iconButton defaultButton");
	assert.notVisible(defaultButton, "defaultButton should be hidden");

	assert.strictEqual(buttonView.childNodes.length, 2);
});

QUnit.test("testaddAlternativePresentationToggleNoStyle", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.deepEqual(view.className, "repeatingElement");

	var alternativePresentation = CORATEST.presentationStub("minimized maximized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "bothEqual");
	assert.deepEqual(view.className, "repeatingElement");

	var alternativePresentationView = view.childNodes[1];
	var alternativeButton = buttonView.childNodes[1];
	var defaultButton = buttonView.childNodes[2];

	alternativeButton.onclick();
	assert.deepEqual(view.className, "repeatingElement");

	defaultButton.onclick();
	assert.deepEqual(view.className, "repeatingElement");
});
