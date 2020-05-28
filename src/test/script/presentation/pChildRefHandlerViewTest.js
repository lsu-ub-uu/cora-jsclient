/*
 * Copyright 2016, 2017, 2018 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
QUnit
		.module("presentation/pChildRefHandlerViewTest.js",
				{
					beforeEach : function() {
						this.fixture = document.getElementById("qunit-fixture");
						this.dependencies = {};

						this.spec = {
							"presentationId" : "pVarTextVariableId",
							"isRepeating" : true,
							"mode" : "input"
						};

						this.pChildRefHandlerView;

						this.getPChildRefHandlerView = function() {
							if (this.pChildRefHandlerView === undefined) {
								this.pChildRefHandlerView = CORA.pChildRefHandlerView(
										this.dependencies, this.spec);
								this.fixture.appendChild(this.pChildRefHandlerView.getView());
							}
							return this.pChildRefHandlerView;
						};

						this.getView = function() {
							this.getPChildRefHandlerView();
							return this.pChildRefHandlerView.getView();
						};
						
						this.getChildrenView = function (){
							return this.getView().firstChild;
						}
						
						this.addAndReturnPRepeatingElementSpy1 = function() {
							this.getPChildRefHandlerView();
							this.pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
							this.pRepeatingElementSpy.setParentModelObject(this
									.getPChildRefHandlerView());
							this.pRepeatingElementSpy.id = "pRepeatingElementSpy1";
							this.getPChildRefHandlerView().addChild(
									this.pRepeatingElementSpy.getView());
							return this.pRepeatingElementSpy;
						};
						this.addAndReturnPRepeatingElementSpy2 = function() {
							this.getPChildRefHandlerView();
							this.pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
							this.pRepeatingElementSpy2.setParentModelObject(this
									.getPChildRefHandlerView());
							this.pRepeatingElementSpy2.id = "pRepeatingElementSpy2";
							this.getPChildRefHandlerView().addChild(
									this.pRepeatingElementSpy2.getView());
							return this.pRepeatingElementSpy2;
						};

					},
					afterEach : function() {
					}
				});

QUnit.test("testInitNoAddButton", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = this.getView();

	assert.ok(view.viewObject === pChildRefHandlerView,
			"modelObject should be a pointer to the javascript object instance");
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.strictEqual(view.childNodes.length, 1);
	var childrenView = view.childNodes[0];
	assert.strictEqual(childrenView.className, "childrenView");

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView, undefined);
});

QUnit.test("testInitWithStyle", function(assert) {
	this.spec.textStyle = "someTextStyle";
	this.spec.childStyle = "someChildStyle";

	var view = this.getView();

	assert.deepEqual(view.className,
			"pChildRefHandler someTextStyle someChildStyle pVarTextVariableId");
});

QUnit.test("testInitWithAddButton", function(assert) {
	this.spec.addMethod = function() {
	};
	this.spec.addText = "some add text";

	var view = this.getView();
	assert.strictEqual(view.childNodes.length, 2);

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	assert.strictEqual(buttonView.firstChild.type, "button");
	assert.strictEqual(buttonView.firstChild.value, "some add text");
});

QUnit.test("testInitWithAddButtonNotCreatedForModeOutput", function(assert) {
	this.spec.mode = "output";
	this.spec.addMethod = function() {
	};
	this.spec.addText = "some add text";

	var view = this.getView();
	assert.strictEqual(view.childNodes.length, 1);

	var buttonView = view.childNodes[0];
	assert.strictEqual(buttonView.className, "childrenView");
});

QUnit.test("testInitFile", function(assert) {
	var handleFilesHasBeenCalled = false;
	function handleFiles(files) {
		handleFilesHasBeenCalled = true;
	}
	this.spec.presentationId = "myChildOfBinaryPLink";
	this.spec.upload = "true";
	this.spec.handleFilesMethod = handleFiles;

	var view = this.getView();

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.strictEqual(button.type, "file");

	button.onchange();
	assert.ok(handleFilesHasBeenCalled);
});

QUnit.test("testHideShowButtonView", function(assert) {
	this.spec.addMethod = function() {
	};

	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = this.getView();

	var buttonView = view.childNodes[1];
	assert.visible(buttonView);
	pChildRefHandlerView.hideButtonView();
	assert.notVisible(buttonView);
	pChildRefHandlerView.showButtonView();
	assert.visible(buttonView);

});

QUnit.test("testAddChildAndRemoveChild", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = pChildRefHandlerView.getView();
	this.fixture.appendChild(view);
	var childrenView = pChildRefHandlerView.getView().firstChild;

	var childElement = document.createElement("span");
	childElement.className = "repeatingElement";

	assert.strictEqual(childrenView.firstChild, null);
	pChildRefHandlerView.addChild(childElement);
	assert.strictEqual(childrenView.firstChild, childElement);

	pChildRefHandlerView.removeChild(childElement);
	assert.strictEqual(childrenView.firstChild, null);
});

QUnit.test("testShowAndHideChildrensRemoveButton", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = pChildRefHandlerView.getView();
	this.fixture.appendChild(view);
	// var childrenView = pChildRefHandlerView.getView().firstChild;

	var pRepeatingElementSpec = {
		"path" : "xyz"
	};
	var childElement = this.addAndReturnPRepeatingElementSpy1();
	var childElement2 = this.addAndReturnPRepeatingElementSpy2();

	assert.strictEqual(childElement.getHideRemoveButtonCalled(), 0);
	assert.strictEqual(childElement.getShowRemoveButtonCalled(), 0);
	assert.strictEqual(childElement2.getHideRemoveButtonCalled(), 0);
	assert.strictEqual(childElement2.getShowRemoveButtonCalled(), 0);

	pChildRefHandlerView.hideChildrensRemoveButton();
	pChildRefHandlerView.showChildrensRemoveButton();

	assert.strictEqual(childElement.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(childElement.getShowRemoveButtonCalled(), 1);
	assert.strictEqual(childElement2.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(childElement2.getShowRemoveButtonCalled(), 1);
});

QUnit.test("testShowAndHideChildrensDragButton", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = pChildRefHandlerView.getView();
	this.fixture.appendChild(view);
	var childrenView = pChildRefHandlerView.getView().firstChild;

	var pRepeatingElementSpec = {
		"path" : "xyz"
	};
	var childElement = this.addAndReturnPRepeatingElementSpy1();
	var childElement2 = this.addAndReturnPRepeatingElementSpy2();

	assert.strictEqual(childElement.getHideDragButtonCalled(), 0);
	assert.strictEqual(childElement.getShowDragButtonCalled(), 0);
	assert.strictEqual(childElement2.getHideDragButtonCalled(), 0);
	assert.strictEqual(childElement2.getShowDragButtonCalled(), 0);

	pChildRefHandlerView.hideChildrensDragButton();
	pChildRefHandlerView.showChildrensDragButton();

	assert.strictEqual(childElement.getHideDragButtonCalled(), 1);
	assert.strictEqual(childElement.getShowDragButtonCalled(), 1);
	assert.strictEqual(childElement2.getHideDragButtonCalled(), 1);
	assert.strictEqual(childElement2.getShowDragButtonCalled(), 1);
});

QUnit.test("testShowAndHideChildrensAddBeforeButton", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = pChildRefHandlerView.getView();
	this.fixture.appendChild(view);
	var childrenView = pChildRefHandlerView.getView().firstChild;

	var pRepeatingElementSpec = {
		"path" : "xyz"
	};
	var childElement = this.addAndReturnPRepeatingElementSpy1();
	var childElement2 = this.addAndReturnPRepeatingElementSpy2();

	assert.strictEqual(childElement.getHideAddBeforeButtonCalled(), 0);
	assert.strictEqual(childElement.getShowAddBeforeButtonCalled(), 0);
	assert.strictEqual(childElement2.getHideAddBeforeButtonCalled(), 0);
	assert.strictEqual(childElement2.getShowAddBeforeButtonCalled(), 0);

	pChildRefHandlerView.hideChildrensAddBeforeButton();
	pChildRefHandlerView.showChildrensAddBeforeButton();

	assert.strictEqual(childElement.getHideAddBeforeButtonCalled(), 1);
	assert.strictEqual(childElement.getShowAddBeforeButtonCalled(), 1);
	assert.strictEqual(childElement2.getHideAddBeforeButtonCalled(), 1);
	assert.strictEqual(childElement2.getShowAddBeforeButtonCalled(), 1);

	pChildRefHandlerView.hideChildrensAddBeforeButton();
	assert.strictEqual(childElement.getHideAddBeforeButtonCalled(), 2);
	assert.strictEqual(childElement.getShowAddBeforeButtonCalled(), 1);
	assert.strictEqual(childElement2.getHideAddBeforeButtonCalled(), 2);
	assert.strictEqual(childElement2.getShowAddBeforeButtonCalled(), 1);

});

QUnit.test("testBeforeDraggingChildrenViewOnlyHasDragStartEvent", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = pChildRefHandlerView.getView();
	var childrenView = view.childNodes[0];

	var childElement = this.addAndReturnPRepeatingElementSpy1();
	var childElement = this.addAndReturnPRepeatingElementSpy1();

	assert.notStrictEqual(childrenView.ondragstart, null);
	assert.strictEqual(childrenView.ondragstart, pChildRefHandlerView.dragstartHandler);

	assert.strictEqual(childrenView.ondragover, null);
	assert.strictEqual(childrenView.ondragenter, null);
	assert.strictEqual(childrenView.ondrop, null);
	assert.strictEqual(childrenView.ondragend, null);
});

QUnit.test("testDuringDraggingChildrenViewHasDraggingEvents", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = this.getView();
	var childrenView = view.childNodes[0];
	var repeatingElementView = this.addAndReturnPRepeatingElementSpy1().getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = repeatingElementView;
	eventSpy.screenY = 0;

	// dragStart
	this.pChildRefHandlerView.dragstartHandler(eventSpy);
	assert.strictEqual(eventSpy.stopPropagationWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.effectAllowed, "move");
	assert.strictEqual(eventSpy.target.className, "repeatingElement beeingDragged");
	assert.strictEqual(eventSpy.target.originalClassname, "repeatingElement");
	assert.strictEqual(eventSpy.dataTransfer.getFormat(), "text/notInUse");
	assert.strictEqual(eventSpy.dataTransfer.getData(), "notUsed");

	assert.notStrictEqual(childrenView.ondragstart, null);
	assert.strictEqual(childrenView.ondragstart, pChildRefHandlerView.dragstartHandler);

	assert.notStrictEqual(childrenView.ondragover, null);
	assert.strictEqual(childrenView.ondragover, pChildRefHandlerView.dragoverHandler);

	assert.notStrictEqual(childrenView.ondragenter, null);
	assert.strictEqual(childrenView.ondragenter, pChildRefHandlerView.dragenterHandler);

	assert.notStrictEqual(childrenView.ondrop, null);
	assert.strictEqual(childrenView.ondrop, pChildRefHandlerView.dropHandler);

	assert.notStrictEqual(childrenView.ondragend, null);
	assert.strictEqual(childrenView.ondragend, pChildRefHandlerView.dragendHandler);
});

QUnit.test("testDuringDraggingOfOtherElementChildrenViewOnlyHasDragstartEvent", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = this.getView();
	var childrenView = view.childNodes[0];
	var repeatingElementView = this.addAndReturnPRepeatingElementSpy1().getView();

	var childToDragElement = document.createElement("span");
	childToDragElement.className = "childToDragElement";
	repeatingElementView.appendChild(childToDragElement);

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = childToDragElement;
	eventSpy.screenY = 0;

	// dragStart
	this.pChildRefHandlerView.dragstartHandler(eventSpy);
	assert.strictEqual(eventSpy.target.className, "childToDragElement");
	assert.strictEqual(eventSpy.target.originalClassname, undefined);
	assert.strictEqual(eventSpy.stopPropagationWasCalled(), false);
	assert.strictEqual(eventSpy.dataTransfer.effectAllowed, undefined);
	assert.strictEqual(eventSpy.dataTransfer.getFormat(), "");
	assert.strictEqual(eventSpy.dataTransfer.getData(), "");

	assert.notStrictEqual(childrenView.ondragstart, null);
	assert.strictEqual(childrenView.ondragstart, pChildRefHandlerView.dragstartHandler);

	assert.strictEqual(childrenView.ondragover, null);
	assert.strictEqual(childrenView.ondragenter, null);
	assert.strictEqual(childrenView.ondrop, null);
	assert.strictEqual(childrenView.ondragend, null);
});

QUnit.test("testDraggingDragover", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = pChildRefHandlerView.getView();

	var childElement = document.createElement("span");
	childElement.className = "repeatingElement";
	pChildRefHandlerView.addChild(childElement);

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = childElement;
	eventSpy.screenY = 0;

	// dragover
	pChildRefHandlerView.dragoverHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");
});

//QUnit.test("testDraggingDragenter", function(assert) {
//	var pChildRefHandlerView = this.getPChildRefHandlerView();
//	var view = pChildRefHandlerView.getView();
//
//	var childElement = document.createElement("span");
//	childElement.className = "repeatingElement";
//	pChildRefHandlerView.addChild(childElement);
//
//	var eventSpy = CORATEST.eventSpy();
//	eventSpy.target = childElement;
//	eventSpy.screenY = 0;
//
//	// dragenter
//	pChildRefHandlerView.dragenterHandler(eventSpy);
//	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
//	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");
//});

//QUnit.test("testDraggingDragenterIsDragging", function(assert) {
//	var pChildRefHandlerView = this.getPChildRefHandlerView();
//
//	var spanHolder = document.createElement("span");
//	var beeingDragged = document.createElement("span");
//	beeingDragged.id = "beeingDragged";
//	beeingDragged.className = "eventSpy";
//
//	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
//	pChildRefHandlerView.setRepeatingElementDragOver(pRepeatingElementSpy);
//	pRepeatingElementSpy.id = "draggedOver";
//	spanHolder.appendChild(pRepeatingElementSpy.getView());
//
//	spanHolder.appendChild(beeingDragged);
//
//	var eventSpy = CORATEST.eventSpy();
//	eventSpy.target = beeingDragged;
//	eventSpy.screenY = 0;
//
//	// dragstart
//	pChildRefHandlerView.dragstartHandler(eventSpy);
//
//	// dragenter
//	pChildRefHandlerView.dragenterHandler(eventSpy);
//	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
//	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");
//});

QUnit.test("testEventActionsOnDragenter", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var childrenView = this.getChildrenView();
	
	var pRepeatingElementSpy1 = this.addAndReturnPRepeatingElementSpy1();
	var firstChild = pRepeatingElementSpy1.getView();
	
	var pRepeatingElementSpy2 = this.addAndReturnPRepeatingElementSpy2();
	var secondChild = pRepeatingElementSpy2.getView();

	// dragstart
	var dragstartEventSpy = CORATEST.eventSpy();
	dragstartEventSpy.target = firstChild;
	dragstartEventSpy.screenY = 500;
	childrenView.ondragstart(dragstartEventSpy);

	// dragenter
	var dragenterEventSpy = CORATEST.eventSpy();
	dragenterEventSpy.target = secondChild;
	dragenterEventSpy.screenY = 550;
	childrenView.ondragenter(dragenterEventSpy);
	
	// check dragenter
	assert.strictEqual(dragenterEventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(dragenterEventSpy.dataTransfer.dropEffect, "move");
});

QUnit.test("testDraggingTwoChildrenChangeOrderAfter", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var childrenView = this.getChildrenView();
	
	var pRepeatingElementSpy1 = this.addAndReturnPRepeatingElementSpy1();
	var firstChild = pRepeatingElementSpy1.getView();
	
	var pRepeatingElementSpy2 = this.addAndReturnPRepeatingElementSpy2();
	var secondChild = pRepeatingElementSpy2.getView();

	// check order
	assert.strictEqual(childrenView.firstChild, firstChild);

	// dragstart
	var dragstartEventSpy = CORATEST.eventSpy();
	dragstartEventSpy.target = firstChild;
	dragstartEventSpy.screenY = 500;
	childrenView.ondragstart(dragstartEventSpy);

	// dragEnter on secondChild
	secondChild.ondragenter();

	// dragenter
	var dragenterEventSpy = CORATEST.eventSpy();
	dragenterEventSpy.target = secondChild;
	dragenterEventSpy.screenY = 550;
	childrenView.ondragenter(dragenterEventSpy);
	
	// check order
	assert.strictEqual(childrenView.firstChild, secondChild);
});

QUnit.test("testDraggingTwoChildrenChangeOrderBefore", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var childrenView = this.getChildrenView();
	
	var pRepeatingElementSpy1 = this.addAndReturnPRepeatingElementSpy1();
	var firstChild = pRepeatingElementSpy1.getView();
	
	var pRepeatingElementSpy2 = this.addAndReturnPRepeatingElementSpy2();
	var secondChild = pRepeatingElementSpy2.getView();

	// order
	assert.strictEqual(childrenView.firstChild, firstChild);

	// dragstart
	var dragstartEventSpy = CORATEST.eventSpy();
	dragstartEventSpy.target = secondChild;
	dragstartEventSpy.screenY = 500;
	pChildRefHandlerView.dragstartHandler(dragstartEventSpy);

	// dragEnter on firstChild
	firstChild.ondragenter();

	// dragenter
	var dragenterEventSpy = CORATEST.eventSpy();
	dragenterEventSpy.target = firstChild;
	dragenterEventSpy.screenY = 450;
	pChildRefHandlerView.dragenterHandler(dragenterEventSpy);
	
	// check order
	assert.strictEqual(childrenView.firstChild, secondChild);
});

QUnit.test("testDraggingOneChildDragenterOnItselfItCanHappenInRealBrowsers", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var childrenView = this.getChildrenView();
	
	var pRepeatingElementSpy1 = this.addAndReturnPRepeatingElementSpy1();
	var firstChild = pRepeatingElementSpy1.getView();
	
	var pRepeatingElementSpy2 = this.addAndReturnPRepeatingElementSpy2();
	var secondChild = pRepeatingElementSpy2.getView();

	// check order
	assert.strictEqual(childrenView.firstChild, firstChild);

	// dragstart
	var dragstartEventSpy = CORATEST.eventSpy();
	dragstartEventSpy.target = firstChild;
	dragstartEventSpy.screenY = 500;
	childrenView.ondragstart(dragstartEventSpy);

	// dragEnter on firstChild
	firstChild.ondragenter(); 

	// dragenter
	var dragenterEventSpy = CORATEST.eventSpy();
	dragenterEventSpy.target = firstChild;
	dragenterEventSpy.screenY = 550;
	childrenView.ondragenter(dragenterEventSpy);
	
	// check order
	assert.strictEqual(childrenView.firstChild, firstChild);
});

QUnit.test("testDropHandlerDragging", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	pChildRefHandlerView.dropHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.stopPropagationWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");
});

QUnit.test("testDropHandlerNotDragging", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	// pChildRefHandlerView.dragstartHandler(eventSpy);

	pChildRefHandlerView.dropHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.stopPropagationWasCalled(), false);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, undefined);
});

QUnit.test("testDragendNotDragging", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	// pChildRefHandlerView.dragstartHandler(eventSpy);

	pChildRefHandlerView.dragendHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.stopPropagationWasCalled(), false);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, undefined);
});

QUnit.test("testDragendDragging", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();
	var secondChild = pRepeatingElementSpy2.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	var eventSpy2 = CORATEST.eventSpy();
	eventSpy2.target = secondChild;
	eventSpy2.screenY = 0;

	// dragend
	pChildRefHandlerView.dragendHandler(eventSpy2);
	assert.strictEqual(eventSpy2.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy2.stopPropagationWasCalled(), true);
	assert.strictEqual(eventSpy2.dataTransfer.dropEffect, undefined);
});

QUnit.test("testAfterDragendChildrenViewOnlyHasDragstartEventhandler", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var view = this.getView();
	var childrenView = view.childNodes[0];
	var repeatingElementView = this.addAndReturnPRepeatingElementSpy1().getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = repeatingElementView;
	eventSpy.screenY = 0;

	this.pChildRefHandlerView.dragstartHandler(eventSpy);
	this.pChildRefHandlerView.dragendHandler(eventSpy);

	assert.notStrictEqual(childrenView.ondragstart, null);
	assert.strictEqual(childrenView.ondragstart, pChildRefHandlerView.dragstartHandler);

	assert.strictEqual(childrenView.ondragover, null);
	assert.strictEqual(childrenView.ondragenter, null);
	assert.strictEqual(childrenView.ondrop, null);
	assert.strictEqual(childrenView.ondragend, null);
});

QUnit.test("testDragendDraggingChangeOrder", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();

	var path1 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ]
	};
	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.setPath(path1);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "two"
		} ]
	};
	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.setPath(path2);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();
	var secondChild = pRepeatingElementSpy2.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	// dragEnter on secondChild
	var pRepeatingElement = secondChild.modelObject;
	pRepeatingElement.getView().ondragenter();

	var eventSpy2 = CORATEST.eventSpy();
	eventSpy2.target = secondChild;
	eventSpy2.screenY = "50";

	// dragover
	pChildRefHandlerView.dragenterHandler(eventSpy2);
	assert.strictEqual(eventSpy2.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy2.dataTransfer.dropEffect, "move");

	// order
	var childrenView = pChildRefHandlerView.getView().firstChild;
	assert.strictEqual(childrenView.childNodes[0], secondChild);

	var movedData;
	function childMoved(data) {
		movedData = data;
	}
	pChildRefHandlerView.getView().modelObject = {
		"childMoved" : childMoved
	};

	// new below
	var eventSpy3 = CORATEST.eventSpy();
	eventSpy3.target = firstChild;
	eventSpy3.screenY = 55;
	// dragend
	pChildRefHandlerView.dragendHandler(eventSpy3);
	assert.strictEqual(eventSpy3.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy3.stopPropagationWasCalled(), true);
	assert.strictEqual(eventSpy3.dataTransfer.dropEffect, undefined);

	assert.strictEqual(eventSpy3.target.className, "repeatingElement");

	var moveData = {
		// "path" : {},
		// "metadataId" : "textVariableId",
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "after"
	};
	assert.deepEqual(movedData, moveData);
});
QUnit.test("testHandleMoveMessageAfter", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();
	var path = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ]
	};
	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "one";
	pRepeatingElementSpy.setPath(path);
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "two"
		} ]
	};
	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "two";
	pRepeatingElementSpy2.setPath(path2);
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());
	var childrenView = pChildRefHandlerView.getView().childNodes[0];

	assert.strictEqual(childrenView.childNodes[0], pRepeatingElementSpy.getView());
	assert.strictEqual(childrenView.childNodes[1], pRepeatingElementSpy2.getView());

	var moveData = {
		"path" : {},
		"metadataId" : "textVariableId",
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "after"
	};
	pChildRefHandlerView.moveChild(moveData);

	assert.strictEqual(childrenView.childNodes[0], pRepeatingElementSpy2.getView());
	assert.strictEqual(childrenView.childNodes[1], pRepeatingElementSpy.getView());
});

QUnit.test("testHandleMoveMessageBefore", function(assert) {
	var pChildRefHandlerView = this.getPChildRefHandlerView();

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "two"
		} ]
	};
	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "two";
	pRepeatingElementSpy2.setPath(path2);
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());
	var childrenView = pChildRefHandlerView.getView().childNodes[0];

	var path = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ]
	};
	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "one";
	pRepeatingElementSpy.setPath(path);
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	assert.strictEqual(childrenView.childNodes[0], pRepeatingElementSpy2.getView());
	assert.strictEqual(childrenView.childNodes[1], pRepeatingElementSpy.getView());

	var moveData = {
		"path" : {},
		"metadataId" : "textVariableId",
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "before"
	};
	pChildRefHandlerView.moveChild(moveData);

	assert.strictEqual(childrenView.childNodes[0], pRepeatingElementSpy.getView());
	assert.strictEqual(childrenView.childNodes[1], pRepeatingElementSpy2.getView());

});
