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
QUnit.module("presentation/pRepeatingElementTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();

		this.dependencies = {
			"jsBookkeeper" : this.jsBookkeeper
		};
		this.spec = {
			"path" : [],
			"pChildRefHandlerView" : CORATEST.pChildRefHandlerViewSpy(),
			"pChildRefHandler":CORATEST.pChildRefHandlerSpy(),
			"userCanRemove" : true,
			"userCanMove" : true,
			"userCanAddBefore" : true
		};
	}, 
});

QUnit.test("testInit", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
	assert.deepEqual(view.className, "repeatingElement");
	assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

	assert.strictEqual(pRepeatingElement.getPath(), this.spec.path);

	let repeatingElement = view;
	assert.strictEqual(repeatingElement.className, "repeatingElement");
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

QUnit.test("testInitNoAddBeforeButton", function(assert) {
	this.spec.userCanAddBefore = false;
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);
	
	assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
	assert.deepEqual(view.className, "repeatingElement");
	assert.ok(view.modelObject === pRepeatingElement,
	"modelObject should be a pointer to the javascript object instance");
	
	assert.strictEqual(pRepeatingElement.getPath(), this.spec.path);
	
	let repeatingElement = view;
	assert.strictEqual(repeatingElement.className, "repeatingElement");
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

QUnit.test("testInitNoRemoveOrDragOrAddBeforeButtonWhenUserCantDoAnything", function(assert) {
	this.spec.userCanRemove = false;
	this.spec.userCanMove = false;
	this.spec.userCanAddBefore = false;
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
	assert.deepEqual(view.className, "repeatingElement");
	assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

	assert.strictEqual(pRepeatingElement.getPath(), this.spec.path);

	let repeatingElement = view;
	assert.strictEqual(repeatingElement.className, "repeatingElement");
	let buttonView = repeatingElement.childNodes[0];
	assert.strictEqual(buttonView.className, "buttonView");

	assert.strictEqual(buttonView.childNodes.length, 0);
});

QUnit.test("testGetDependencies", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.getSpec(), this.spec);
});
QUnit.test("testDragenterToTellPChildRefHandlerThatSomethingIsDragedOverThis", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
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
			let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
			let view = pRepeatingElement.getView();
			this.fixture.appendChild(view);

			assert.strictEqual(pRepeatingElement.getView().ondragenter, null);
		});

QUnit.test("testButtonViewAndRemoveButton", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];
	let removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "iconButton removeButton");
});

QUnit.test("test0to1ShouldHaveRemoveButtonNoAddBeforeButton", function(assert) {
	this.spec.userCanMove = false;
	this.spec.userCanAddBefore = false;
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];
	let removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "iconButton removeButton");
	assert.strictEqual(buttonView.childNodes.length, 1);
});

QUnit.test("test1to1ShouldHaveNoRemoveOrDragOrAddBeforeButton", function(assert) {
	this.spec.userCanRemove = false;
	this.spec.userCanMove = false;
	this.spec.userCanAddBefore = false;
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];
	assert.strictEqual(buttonView.childNodes.length, 0);
});

QUnit.test("testRemoveButtonOnclick", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];
	let removeButton = buttonView.firstChild;

	CORATESTHELPER.simulateOnclick(removeButton);

	// subscription
	let removes = this.dependencies.jsBookkeeper.getRemoveDataArray();
	assert.deepEqual(removes.length, 1);

	let firstRemove = removes[0];
	assert.strictEqual(firstRemove.type, "remove");
	assert.deepEqual(firstRemove.path, []);
});

QUnit.test("testRemoveButtonHover", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);
	assert.deepEqual(view.className, "repeatingElement");

	let buttonView = view.childNodes[0];
	let removeButton = buttonView.firstChild;

	let mouseEnterEvent = new Event('mouseenter');
	removeButton.dispatchEvent(mouseEnterEvent);
	assert.deepEqual(view.className, "repeatingElement hoverRemove");

	let mouseLeaveEvent = new Event('mouseleave');
	removeButton.dispatchEvent(mouseLeaveEvent);
	assert.deepEqual(view.className, "repeatingElement");

	let mouseEnterEvent2 = new Event('mouseenter');
	removeButton.dispatchEvent(mouseEnterEvent2);
	assert.deepEqual(view.className, "repeatingElement hoverRemove");

});

QUnit.test("testDragButtonOnmousedownOnmouseup", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];
	let dragButton = buttonView.childNodes[1];

	assert.notOk(view.draggable);
	dragButton.onmousedown();
	assert.ok(view.draggable);
	dragButton.onmouseup();
	assert.notOk(view.draggable);
});

QUnit.test("testHideRemoveButton", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];
	let removeButton = buttonView.firstChild;

	assert.visible(removeButton, "buttonView should be visible");

	pRepeatingElement.hideRemoveButton();
	assert.notVisible(removeButton, "buttonView should be hidden");

	pRepeatingElement.showRemoveButton();
	assert.visible(removeButton, "buttonView should be visible");
});

QUnit.test("testHideDragButton", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];
	let dragButton = buttonView.childNodes[1];

	assert.visible(dragButton, "buttonView should be visible");

	pRepeatingElement.hideDragButton();
	assert.notVisible(dragButton, "buttonView should be hidden");

	pRepeatingElement.showDragButton();
	assert.visible(dragButton, "buttonView should be visible");
});

QUnit.test("testHideAndShowDragButtonWhenDragButtonNotPresent", function(assert) {
	this.spec.userCanMove = false;
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

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

QUnit.test("testAddBeforeButtonOnclick", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];
	let addBeforeButton = buttonView.childNodes[2];

	CORATESTHELPER.simulateOnclick(addBeforeButton);

	 let addBefores = this.spec.pChildRefHandler.getSendAddBeforeDataArray();
	 assert.deepEqual(addBefores.length, 1);
	
	 let firstAddBefore= addBefores[0];
	 assert.deepEqual(firstAddBefore.path, []);
});

QUnit.test("testHideShowAddBeforeButton", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];
	let addBeforeButton = buttonView.childNodes[2];

	assert.visible(addBeforeButton, "addBeforeButton should be visible");

	pRepeatingElement.hideAddBeforeButton();
	assert.notVisible(addBeforeButton, "addBeforeButton should be hidden");

	pRepeatingElement.showAddBeforeButton();
	assert.visible(addBeforeButton, "addBeforeButton should be visible");
});

QUnit.test("testAddPresentation", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let presentation = CORATEST.presentationStub();

	pRepeatingElement.addPresentation(presentation);

	let presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);
	assert.deepEqual(view.className, "repeatingElement");
});

QUnit.test("testAddPresentationNoStyle", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let presentation = CORATEST.presentationStub();

	pRepeatingElement.addPresentation(presentation);

	let presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);
	assert.deepEqual(view.className, "repeatingElement");
});

QUnit.test("testaddAlternativePresentationFirstSmaller", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];

	let presentation = CORATEST.presentationStub("minimized", "presentationStubMinimized");
	pRepeatingElement.addPresentation(presentation);

	let alternativePresentation = CORATEST.presentationStub("maximized", "presentationStubMaximized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "firstSmaller");

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

QUnit.test("testaddAlternativePresentationFirstLarger", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];

	let presentation = CORATEST.presentationStub("maximized", "presentationStubMaximized");
	pRepeatingElement.addPresentation(presentation);

	let alternativePresentation = CORATEST.presentationStub("minimized", "presentationStubMinimized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "firstLarger");

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

QUnit.test("testaddAlternativePresentationBothEqual", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];

	let presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	let presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);

	let alternativePresentation = CORATEST.presentationStub("minimized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "bothEqual");
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
});

QUnit.test("testMinimizealternativeButtonShouldWorkWithoutDraghandle", function(assert) {
	this.spec.userCanRemove = false;
	this.spec.userCanMove = false;
	this.spec.userCanAddBefore = false;
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];

	let presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	let alternativePresentation = CORATEST.presentationStub("minimized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "bothEqual");

	let alternativeButton = buttonView.childNodes[0];
	assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
	assert.visible(alternativeButton, "alternativeButton should be shown");
	let defaultButton = buttonView.childNodes[1];
	assert.strictEqual(defaultButton.className, "iconButton defaultButton");
	assert.notVisible(defaultButton, "defaultButton should be hidden");

	assert.strictEqual(buttonView.childNodes.length, 2);
});

QUnit.test("testaddAlternativePresentationToggleNoStyle", function(assert) {
	let pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	let view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	let buttonView = view.childNodes[0];

	let presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	assert.deepEqual(view.className, "repeatingElement");

	let alternativePresentation = CORATEST.presentationStub("minimized maximized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "bothEqual");
	assert.deepEqual(view.className, "repeatingElement");

	let alternativeButton = buttonView.childNodes[1];
	let defaultButton = buttonView.childNodes[2];

	alternativeButton.onclick();
	assert.deepEqual(view.className, "repeatingElement");

	defaultButton.onclick();
	assert.deepEqual(view.className, "repeatingElement");
});
