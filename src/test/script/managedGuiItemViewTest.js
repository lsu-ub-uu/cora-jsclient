/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017, 2023, 2024 Olov McKie
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
QUnit.module("managedGuiItemViewTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.dependencies = {};
		let focusinEvent=undefined;
		this.spec = {
			activateMethod : function() {
			},
			removeMethod : function() {
			},
			focusinMethod : function(event){
				focusinEvent = event;
			}
		};
		this.getFocusinEvent = function(){
			return focusinEvent;
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	assert.strictEqual(managedGuiItemView.type, "managedGuiItemView");
});

QUnit.test("testGetMenuView", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let menuView = managedGuiItemView.getMenuView();
	assert.strictEqual(menuView.className, "menuView");
});

QUnit.test("testMenuOnclickCallsActivateMethod", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let menuView = managedGuiItemView.getMenuView();
	assert.strictEqual(menuView.onclick, this.spec.activateMethod);
});

QUnit.test("testMenuViewHasRemoveButtonThatCallsRemoveMethods", function(assert) {
	let removeMethodHasBeenCalled = false;
	this.spec.removeMethod = function() {
		removeMethodHasBeenCalled = true;
	}

	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let menuView = managedGuiItemView.getMenuView();
	assert.strictEqual(menuView.lastChild.className, "iconButton removeButton");
	CORATESTHELPER.simulateOnclick(menuView.lastChild);
	
	assert.ok(removeMethodHasBeenCalled);
});

QUnit.test("testMenuViewHasNoRemoveButtonIfNoRemoveMethod", function(assert) {
	this.spec.removeMethod = undefined;
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let menuView = managedGuiItemView.getMenuView();
	assert.strictEqual(menuView.childNodes.length, 0);
});

QUnit.test("testGetListView", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let listView = managedGuiItemView.getListView();
	assert.strictEqual(listView.nodeName, "SPAN");
	assert.strictEqual(listView.className, "listView");
});

QUnit.test("testGetWorkView", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let workView = managedGuiItemView.getWorkView();
	assert.strictEqual(workView.className, "workView");
});

QUnit.test("testFocusinCallsFocusinMethod", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let workView = managedGuiItemView.getWorkView();
	let fixture = document.getElementById("qunit-fixture");
	fixture.appendChild(workView);
	let myInput = document.createElement("input");
	workView.appendChild(myInput);
	
	CORATESTHELPER.simulateFocus(myInput);
	
	assert.strictEqual(this.getFocusinEvent().target, myInput);
});

QUnit.test("testAddMenuPresentation", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let menuView = managedGuiItemView.getMenuView();
	assert.strictEqual(menuView.childNodes[0].className, "iconButton removeButton");

	let presentation = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addMenuPresentation(presentation);
	assert.strictEqual(menuView.childNodes[0], presentation);
	assert.strictEqual(menuView.childNodes[1].className, "iconButton removeButton");

	let presentation2 = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addMenuPresentation(presentation2);
	assert.strictEqual(menuView.childNodes[0], presentation);
	assert.strictEqual(menuView.childNodes[1], presentation2);
	assert.strictEqual(menuView.childNodes[2].className, "iconButton removeButton");
});

QUnit.test("testAddListPresentation", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let listView = managedGuiItemView.getListView();

	let presentation = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addListPresentation(presentation);
	assert.strictEqual(listView.childNodes[0], presentation);

	let presentation2 = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addListPresentation(presentation2);
	assert.strictEqual(listView.childNodes[0], presentation);
	assert.strictEqual(listView.childNodes[1], presentation2);
});

QUnit.test("testAddWorkPresentation", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let workView = managedGuiItemView.getWorkView();
	assert.strictEqual(workView.childNodes[0], undefined);

	let presentation = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addWorkPresentation(presentation);
	assert.strictEqual(workView.childNodes[0], presentation);

	let presentation2 = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addWorkPresentation(presentation2);
	assert.strictEqual(workView.childNodes[0], presentation);
	assert.strictEqual(workView.childNodes[1], presentation2);
});

QUnit.test("testUpdateMenuView", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let menuView = managedGuiItemView.getMenuView();
	assert.strictEqual(menuView.className, "menuView");

	managedGuiItemView.updateMenuView({
		active : false,
		changed : false
	});
	assert.strictEqual(menuView.className, "menuView");

	managedGuiItemView.updateMenuView({
		active : true,
		changed : false,
		indicatorClassName : "someIndicatiorClassName1"
	});
	assert.strictEqual(menuView.className, "menuView active someIndicatiorClassName1");

	managedGuiItemView.updateMenuView({
		active : true,
		changed : false,
		indicatorClassName : "someIndicatiorClassName2"
	});
	assert.strictEqual(menuView.className, "menuView active someIndicatiorClassName2");

	managedGuiItemView.updateMenuView({
		active : true,
		changed : true
	});
	assert.strictEqual(menuView.className, "menuView changed active");

	managedGuiItemView.updateMenuView({
		active : false,
		changed : true
	});
	assert.strictEqual(menuView.className, "menuView changed");
});

QUnit.test("testClearMenuView", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let menuView = managedGuiItemView.getMenuView();
	assert.strictEqual(menuView.childNodes[0].className, "iconButton removeButton");

	let presentation = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addMenuPresentation(presentation);
	assert.strictEqual(menuView.childNodes[0], presentation);
	assert.strictEqual(menuView.childNodes[1].className, "iconButton removeButton");

	let presentation2 = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addMenuPresentation(presentation2);
	assert.strictEqual(menuView.childNodes[0], presentation);
	assert.strictEqual(menuView.childNodes[1], presentation2);
	assert.strictEqual(menuView.childNodes[2].className, "iconButton removeButton");

	managedGuiItemView.clearMenuView();
	assert.strictEqual(menuView.childNodes.length, 1);
	assert.strictEqual(menuView.childNodes[0].className, "iconButton removeButton");
});

QUnit.test("testClearWorkView", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let workView = managedGuiItemView.getWorkView();
	assert.strictEqual(workView.childNodes[0], undefined);

	let presentation = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addWorkPresentation(presentation);
	assert.strictEqual(workView.childNodes[0], presentation);

	let presentation2 = CORA.gui.createSpanWithClassName("someClassName");
	managedGuiItemView.addWorkPresentation(presentation2);
	assert.strictEqual(workView.childNodes[0], presentation);
	assert.strictEqual(workView.childNodes[1], presentation2);

	managedGuiItemView.clearWorkView();
	assert.strictEqual(workView.childNodes[0], undefined);
});

QUnit.test("testHideWorkView", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let workView = managedGuiItemView.getWorkView();
	assert.strictEqual(workView.style.display, "");

	managedGuiItemView.hideWorkView();

	assert.strictEqual(workView.style.display, "none");
});

QUnit.test("testShowWorkView", function(assert) {
	let managedGuiItemView = CORA.managedGuiItemView(this.spec);
	let workView = managedGuiItemView.getWorkView();
	assert.strictEqual(workView.style.display, "");

	managedGuiItemView.showWorkView();

	managedGuiItemView.hideWorkView();
	assert.strictEqual(workView.style.display, "none");

	managedGuiItemView.showWorkView();
	assert.strictEqual(workView.style.display, "");
});
