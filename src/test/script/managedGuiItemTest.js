/*
 * Copyright 2016, 2018 Uppsala University Library
 * Copyright 2016, 2017, 2023 Olov McKie
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
			"activateMethod" : function() {
			},
			"removeMethod" : function() {
			},
			"callOnMetadataReloadMethod" : function() {

			}

		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	assert.strictEqual(managedGuiItem.type, "managedGuiItem");
});

QUnit.test("testInitNoPresentations", function(assert) {
	this.spec.menuPresentation = undefined;
	this.spec.workPresentation = undefined;

	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(managedGuiItem.type, "managedGuiItem");
	assert.strictEqual(factoredView.getAddedMenuPresentation(0), undefined);
	assert.strictEqual(factoredView.getAddedWorkPresentation(0), undefined);
});

QUnit.test("testInitMenuViewIsFromFactoredView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let menuView = managedGuiItem.getMenuView();

	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(menuView, factoredView.getMenuView());
});

QUnit.test("testInitWorkViewIsFromFactoredView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let workView = managedGuiItem.getWorkView();

	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(workView, factoredView.getWorkView());
});

QUnit.test("testInitListViewIsFromFactoredView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let listView = managedGuiItem.getListView();

	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(listView, factoredView.getListView());
});

QUnit.test("testGetDependencies", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	assert.strictEqual(managedGuiItem.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	assert.strictEqual(managedGuiItem.getSpec(), this.spec);
});

QUnit.test("testActivateMethodPassedOnToViewCallsMethodWithSelf", function(assert) {
	let calledWithManagedGuiItem;
	this.spec.activateMethod = function(managedGuiItem) {
		calledWithManagedGuiItem = managedGuiItem;
	}
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	let factoredSpec = this.dependencies.managedGuiItemViewFactory.getSpec(0);
	factoredSpec.activateMethod();
	assert.strictEqual(calledWithManagedGuiItem, managedGuiItem);
});

QUnit.test("testRemoveMethodAddedToView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getSpec().removeMethod, managedGuiItem.remove);
});

QUnit.test("testRemoveMethodPassedOnToViewCallsMethodWithSelf", function(assert) {
	let calledWithManagedGuiItem;
	this.spec.removeMethod = function(managedGuiItem) {
		calledWithManagedGuiItem = managedGuiItem;
	}
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	let factoredSpec = this.dependencies.managedGuiItemViewFactory.getSpec(0);
	factoredSpec.removeMethod();
	assert.strictEqual(calledWithManagedGuiItem, managedGuiItem);
});

QUnit.test("testDisableRemoveNoRemoveFunctionToView", function(assert) {
	this.spec.disableRemove = "true";
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredSpec = this.dependencies.managedGuiItemViewFactory.getSpec(0);

	assert.strictEqual(factoredSpec.removeMethod, undefined);
});

QUnit.test("testAddMenuPresentationPassedOnToView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	let presentationToAdd = CORA.gui.createSpanWithClassName("somePresentation");
	managedGuiItem.addMenuPresentation(presentationToAdd);
	assert.strictEqual(factoredView.getAddedMenuPresentation(0), presentationToAdd);
});

QUnit.test("testAddWorkPresentationPassedOnToView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	let presentationToAdd = CORA.gui.createSpanWithClassName("somePresentation");
	managedGuiItem.addWorkPresentation(presentationToAdd);
	assert.strictEqual(factoredView.getAddedWorkPresentation(0), presentationToAdd);
});

QUnit.test("testAddListPresentationPassedOnToView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	let presentationToAdd = CORA.gui.createSpanWithClassName("somePresentation");
	managedGuiItem.addListPresentation(presentationToAdd);
	assert.strictEqual(factoredView.getAddedListPresentation(0), presentationToAdd);
});

QUnit.test("testSetChangedPassedOnToView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

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
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

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

QUnit.test("testToggleNextColor", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredViewSpy = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredViewSpy.getState(), undefined);
	
	managedGuiItem.toggleNextIndicator();
	
	assert.stringifyEqual(factoredViewSpy.getState(), {
		active : false,
		changed : false,
		indicatorClassName : "indicatorClassName1"
	});
	
	managedGuiItem.togglePreviousIndicator();
	
	assert.stringifyEqual(factoredViewSpy.getState(), {
		active : false,
		changed : false
	});

	managedGuiItem.togglePreviousIndicator();
	
	assert.stringifyEqual(factoredViewSpy.getState(), {
		active : false,
		changed : false,
		indicatorClassName : "indicatorClassName8"
	});
	
	managedGuiItem.togglePreviousIndicator();
	managedGuiItem.togglePreviousIndicator();
	managedGuiItem.togglePreviousIndicator();
	managedGuiItem.togglePreviousIndicator();
	
	assert.stringifyEqual(factoredViewSpy.getState(), {
		active : false,
		changed : false,
		indicatorClassName : "indicatorClassName4"
	});
	
	managedGuiItem.togglePreviousIndicator();
	managedGuiItem.togglePreviousIndicator();
	managedGuiItem.togglePreviousIndicator();
	managedGuiItem.togglePreviousIndicator();
	
	assert.stringifyEqual(factoredViewSpy.getState(), {
		active : false,
		changed : false
	});

	managedGuiItem.toggleNextIndicator();
	managedGuiItem.toggleNextIndicator();
	managedGuiItem.toggleNextIndicator();
	managedGuiItem.toggleNextIndicator();
	managedGuiItem.toggleNextIndicator();
	managedGuiItem.toggleNextIndicator();
	managedGuiItem.toggleNextIndicator();
	managedGuiItem.toggleNextIndicator();
	assert.stringifyEqual(factoredViewSpy.getState(), {
		active : false,
		changed : false,
		indicatorClassName : "indicatorClassName8"
	});
	
	managedGuiItem.toggleNextIndicator();
	assert.stringifyEqual(factoredViewSpy.getState(), {
		active : false,
		changed : false
	});
	

});

QUnit.test("testClearMenuViewPassedOnToView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getMenuViewCleared(), 0);
	managedGuiItem.clearMenuView();
	assert.strictEqual(factoredView.getMenuViewCleared(), 1);
});

QUnit.test("testClearWorkViewPassedOnToView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getWorkViewCleared(), 0);
	managedGuiItem.clearWorkView();
	assert.strictEqual(factoredView.getWorkViewCleared(), 1);
});

QUnit.test("testHideWorkView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getHidden(), 0);
	managedGuiItem.hideWorkView();
	assert.strictEqual(factoredView.getHidden(), 1);
});

QUnit.test("testShowWorkView", function(assert) {
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getShown(), 0);
	managedGuiItem.showWorkView();
	assert.strictEqual(factoredView.getShown(), 1);
});

QUnit.test("testShowWorkViewCallsCallMethodAterShowWorkView", function(assert) {
	let called = false;
	let callMethodAfterShowWorkView = function() {
		called = true;
	}
	this.spec.callMethodAfterShowWorkView = callMethodAfterShowWorkView;
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	let factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);

	assert.strictEqual(called, false);
	managedGuiItem.showWorkView();
	assert.strictEqual(called, true);
});

QUnit.test("testReloadForMetadataChanges", function(assert) {
	let called = false;
	this.spec.callOnMetadataReloadMethod = function() {
		called = true;
	}
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	managedGuiItem.reloadForMetadataChanges();

	assert.strictEqual(called, true);
});

QUnit.test("testReloadForMetadataChangesNotSet", function(assert) {
	this.spec.callOnMetadataReloadMethod = undefined;
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	managedGuiItem.reloadForMetadataChanges();
	assert.ok(true);
});

QUnit.test("testSendDataToServer", function(assert) {
	let called = false;
	let sendDataToServerMethod = function() {
		called = true;
	}
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	managedGuiItem.setSendDataToServer(sendDataToServerMethod);
	managedGuiItem.sendDataToServer();

	assert.strictEqual(called, true);
});

QUnit.test("testSendDataToServerNotSet", function(assert) {
	this.spec.sendDataToServerMethod = undefined;
	let managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	managedGuiItem.sendDataToServer();
	assert.ok(true);
});