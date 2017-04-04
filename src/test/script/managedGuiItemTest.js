/*
 * Copyright 2016 Uppsala University Library
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
QUnit.module("managedGuiItemTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");

		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
			"managedGuiItemViewFactory" : CORATEST.standardFactorySpy("managedGuiItemViewSpy"),
		};
		this.spec = {
			"handledBy" : function() {
			},
			"menuPresentation" : CORA.gui.createSpanWithClassName("menuPresentation"),
			"workPresentation" : CORA.gui.createSpanWithClassName("workPresentation"),
			"activateMethod" : function() {
			},
			"removeMethod" : function() {
			},
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	assert.strictEqual(managedGuiItem.type, "managedGuiItem");
});

QUnit.test("testInitNoPresentations", function(assert) {
	this.spec.menuPresentation = undefined;
	this.spec.workPresentation = undefined;

	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(managedGuiItem.type, "managedGuiItem");
	assert.strictEqual(factoredView.getAddedMenuPresentation(0), undefined);
	assert.strictEqual(factoredView.getAddedWorkPresentation(0), undefined);
});

QUnit.test("testInitMenuViewIsFromFactoredView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var menuView = managedGuiItem.getMenuView();

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(menuView, factoredView.getMenuView());
});

QUnit.test("testInitMenuPresentationViewIsFromSpec", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedMenuPresentation(0), this.spec.menuPresentation);
});

QUnit.test("testInitWorkViewIsFromFactoredView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var workView = managedGuiItem.getWorkView();

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(workView, factoredView.getWorkView());
});

QUnit.test("testInitWorkPresentationViewIsFromSpec", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedWorkPresentation(0), this.spec.workPresentation);
});

QUnit.test("testGetDependencies", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	assert.strictEqual(managedGuiItem.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	assert.strictEqual(managedGuiItem.getSpec(), this.spec);
});

QUnit.test("testHandleBy", function(assert) {
	var handleByIsCalled = false;
	var handleByCalledWith = "";
	this.spec.handleBy = function(stuff) {
		handleByIsCalled = true;
		handleByCalledWith = stuff;
	}
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	managedGuiItem.handleBy("someThing");
	assert.ok(handleByIsCalled);
	assert.strictEqual(handleByCalledWith, "someThing");
});

QUnit.test("testActivateMethodPassedOnToViewCallsMethodWithSelf", function(assert) {
	var calledWithManagedGuiItem;
	this.spec.activateMethod = function(managedGuiItem) {
		calledWithManagedGuiItem = managedGuiItem;
	}
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredSpec = this.dependencies.managedGuiItemViewFactory.getSpec(0);
	factoredSpec.activateMethod();
	assert.strictEqual(calledWithManagedGuiItem, managedGuiItem);
});

QUnit.test("testRemoveMethodAddedToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getSpec().removeMethod, managedGuiItem.remove);
});

QUnit.test("testRemoveMethodPassedOnToViewCallsMethodWithSelf", function(assert) {
	var calledWithManagedGuiItem;
	this.spec.removeMethod = function(managedGuiItem) {
		calledWithManagedGuiItem = managedGuiItem;
	}
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredSpec = this.dependencies.managedGuiItemViewFactory.getSpec(0);
	factoredSpec.removeMethod();
	assert.strictEqual(calledWithManagedGuiItem, managedGuiItem);
});

QUnit.test("testRemoveMethodCallsRemoveOnView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getRemoved(), 0);
	managedGuiItem.remove();
	assert.strictEqual(factoredView.getRemoved(), 1);
});

QUnit.test("testAddMenuPresentationPassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	var presentationToAdd = CORA.gui.createSpanWithClassName("somePresentation");
	managedGuiItem.addMenuPresentation(presentationToAdd);
	assert.strictEqual(factoredView.getAddedMenuPresentation(1), presentationToAdd);
});
QUnit.test("testAddMenuPresentationPassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	var presentationToAdd = CORA.gui.createSpanWithClassName("somePresentation");
	managedGuiItem.addMenuPresentation(presentationToAdd);
	assert.strictEqual(factoredView.getAddedMenuPresentation(1), presentationToAdd);
});

QUnit.test("testAddWorkPresentationPassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	var presentationToAdd = CORA.gui.createSpanWithClassName("somePresentation");
	managedGuiItem.addWorkPresentation(presentationToAdd);
	assert.strictEqual(factoredView.getAddedWorkPresentation(1), presentationToAdd);
});

QUnit.test("testSetChangedPassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getState(), undefined);
	managedGuiItem.setChanged(false);
	assert.stringifyEqual(factoredView.getState(), {
		"active" : false,
		"changed" : false
	});
	managedGuiItem.setChanged(true);
	assert.stringifyEqual(factoredView.getState(), {
		"active" : false,
		"changed" : true
	});
});

QUnit.test("testSetActivePassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getState(), undefined);
	managedGuiItem.setActive(false);
	assert.stringifyEqual(factoredView.getState(), {
		"active" : false,
		"changed" : false
	});
	managedGuiItem.setActive(true);
	assert.stringifyEqual(factoredView.getState(), {
		"active" : true,
		"changed" : false
	});
});

QUnit.test("testClearMenuViewPassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getMenuViewCleared(), 0);
	managedGuiItem.clearMenuView();
	assert.strictEqual(factoredView.getMenuViewCleared(), 1);
});

QUnit.test("testClearWorkViewPassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getWorkViewCleared(), 0);
	managedGuiItem.clearWorkView();
	assert.strictEqual(factoredView.getWorkViewCleared(), 1);
});

QUnit.test("testHideWorkView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getHidden(), 0);
	managedGuiItem.hideWorkView();
	assert.strictEqual(factoredView.getHidden(), 1);
});

QUnit.test("testShowWorkView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getShown(), 0);
	managedGuiItem.showWorkView();
	assert.strictEqual(factoredView.getShown(), 1);
});