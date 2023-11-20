/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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

QUnit.module("jsClient/openGuiItemHandlerTest.js", {
	beforeEach : function() {
		this.search = CORATEST.searchRecordList.dataList.data[0].record;

		this.dependencies = {
			"openGuiItemHandlerViewFactory" : CORATEST
					.standardFactorySpy("openGuiItemHandlerViewSpy"),
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.spec = {
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	assert.strictEqual(openGuiItemHandler.type, "openGuiItemHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	assert.strictEqual(openGuiItemHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	assert.strictEqual(openGuiItemHandler.getSpec(), this.spec);
});

QUnit.test("testViewIsCreatedUsingFactory", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	assert.strictEqual(openGuiItemHandler.getView(), factoredView.getView());
});

QUnit.test("testViewSpec", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let factoredSpec = this.dependencies.openGuiItemHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.headerText, this.dependencies.textProvider
			.getTranslation("theClient_openedText"));
	assert.strictEqual(factoredSpec.openSearchMethod, openGuiItemHandler.openSearch);
});

QUnit.test("testAddManagedGuiItemPassedOnToView", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	let aItem = CORATEST.managedGuiItemSpy();
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	
	assert.strictEqual(factoredView.getAddedManagedGuiItem(0), aItem.getMenuView());
	assert.strictEqual(openGuiItemHandler.getShowingItem(), undefined);
	assert.strictEqual(aItem.getActive(), false);
	
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem]);
});

QUnit.test("testAddManagedGuiItem_list", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.addManagedGuiItem(bItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), undefined);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem]);
	
	openGuiItemHandler.viewRemoved(aItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), undefined);
	assert.deepEqual(openGuiItemHandler.getItemList(), [bItem]);
	
	openGuiItemHandler.viewRemoved(aItem);
});

QUnit.test("testAddManagedGuiItem_show", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	let cItem = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aItem.getWorkViewShown(), 0);
	assert.strictEqual(aItem.getActive(), false);
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	
	assert.strictEqual(aItem.getWorkViewShown(), 0);
	assert.strictEqual(aItem.getActive(), false);
	assert.strictEqual(bItem.getWorkViewHidden(), 0);
	
	openGuiItemHandler.showView(aItem);
	
	assert.strictEqual(aItem.getWorkViewShown(), 1);
	assert.strictEqual(aItem.getActive(), true);
	assert.strictEqual(aItem.getWorkViewHidden(), 0);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), aItem);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem]);

	openGuiItemHandler.addManagedGuiItem(bItem);

	assert.strictEqual(bItem.getWorkViewShown(), 0);
	assert.strictEqual(bItem.getActive(), false);
	assert.strictEqual(bItem.getWorkViewHidden(), 0);

	openGuiItemHandler.showView(bItem);
	
	assert.strictEqual(aItem.getActive(), false);
	assert.strictEqual(aItem.getWorkViewHidden(), 1);
	assert.strictEqual(bItem.getWorkViewShown(), 1);
	assert.strictEqual(bItem.getActive(), true);

	assert.strictEqual(openGuiItemHandler.getShowingItem(), bItem);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem]);
	
	openGuiItemHandler.addManagedGuiItem(cItem);
	openGuiItemHandler.showView(cItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), cItem);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem, cItem]);
	
	openGuiItemHandler.showView(aItem);
	assert.strictEqual(openGuiItemHandler.getShowingItem(), aItem);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem, cItem]);
});

QUnit.test("testAddManagedGuiItem_showMultiple", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	let cItem = CORATEST.managedGuiItemSpy();
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.showView(aItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), aItem);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem]);

	openGuiItemHandler.addManagedGuiItem(bItem);
	openGuiItemHandler.showView(bItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), bItem);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem]);
	
	openGuiItemHandler.addManagedGuiItem(cItem);
	openGuiItemHandler.showView(cItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), cItem);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem, cItem]);
	
	openGuiItemHandler.showView(aItem);
	assert.strictEqual(openGuiItemHandler.getShowingItem(), aItem);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem, cItem]);
});

QUnit.test("testAddManagedGuiItem_viewRemoved_showsLastActive", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	let cItem = CORATEST.managedGuiItemSpy();
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.addManagedGuiItem(bItem);
	openGuiItemHandler.addManagedGuiItem(cItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), undefined);

	openGuiItemHandler.showView(cItem);
	openGuiItemHandler.showView(bItem);
	openGuiItemHandler.showView(aItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), aItem);
	
	openGuiItemHandler.viewRemoved(cItem);
	assert.strictEqual(factoredView.getRemovedManagedGuiItem(0),cItem.getMenuView());
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), aItem);
	
	openGuiItemHandler.addManagedGuiItem(cItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingItem(), aItem);
});

QUnit.test("testAddManagedGuiItem_viewRemoved_lastActiveReset", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let aItem = CORATEST.managedGuiItemSpy();
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.showView(aItem);
	openGuiItemHandler.viewRemoved(aItem);
	
	assert.strictEqual(aItem.getActive(), false);
	assert.strictEqual(openGuiItemHandler.getShowingItem(), undefined);
});

QUnit.test("testGetShowingGuiItem", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.addManagedGuiItem(bItem);
	
	assert.strictEqual(openGuiItemHandler.getShowingGuiItem(), undefined);
	
	openGuiItemHandler.showView(aItem);
	assert.strictEqual(openGuiItemHandler.getShowingGuiItem(), aItem);
});

QUnit.test("testGetNextGuiItem", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	assert.strictEqual(openGuiItemHandler.getNextGuiItem(), undefined);
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.addManagedGuiItem(bItem);
	
	assert.strictEqual(openGuiItemHandler.getNextGuiItem(), undefined);
	
	openGuiItemHandler.showView(aItem);
	assert.strictEqual(openGuiItemHandler.getNextGuiItem(), bItem);
	
	openGuiItemHandler.showView(bItem);
	assert.strictEqual(openGuiItemHandler.getNextGuiItem(), undefined);
});

QUnit.test("testGetPreviousGuiItem", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	assert.strictEqual(openGuiItemHandler.getNextGuiItem(), undefined);
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.addManagedGuiItem(bItem);
	
	assert.strictEqual(openGuiItemHandler.getPreviousGuiItem(), undefined);
	
	openGuiItemHandler.showView(aItem);
	assert.strictEqual(openGuiItemHandler.getPreviousGuiItem(), undefined);
	
	openGuiItemHandler.showView(bItem);
	assert.strictEqual(openGuiItemHandler.getPreviousGuiItem(), aItem);
});



QUnit.test("testAddManagedGuiItem_noMoveIfNoCurrentMenuView", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.addManagedGuiItem(bItem);
	
	openGuiItemHandler.moveCurrentMenuViewUp();
	openGuiItemHandler.moveCurrentMenuViewDown();
	
	assert.strictEqual(factoredView.getMoveMenuViewUp(0), undefined);
	assert.strictEqual(factoredView.getMoveMenuViewDown(0), undefined);
});

QUnit.test("testAddManagedGuiItem_moveCurrentMenuViewUp", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	let cItem = CORATEST.managedGuiItemSpy();
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.addManagedGuiItem(bItem);
	openGuiItemHandler.addManagedGuiItem(cItem);
	openGuiItemHandler.showView(aItem);
	openGuiItemHandler.showView(bItem);
	openGuiItemHandler.showView(cItem);
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem, cItem]);
	
	openGuiItemHandler.moveCurrentMenuViewUp();
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, cItem, bItem]);
	assert.strictEqual(factoredView.getMoveMenuViewUp(0), cItem.getMenuView());
	
	openGuiItemHandler.moveCurrentMenuViewUp();
	assert.deepEqual(openGuiItemHandler.getItemList(), [cItem, aItem, bItem]);
	assert.strictEqual(factoredView.getMoveMenuViewUp(0), cItem.getMenuView());
	
	openGuiItemHandler.moveCurrentMenuViewUp();
	assert.deepEqual(openGuiItemHandler.getItemList(), [cItem, aItem, bItem]);
	assert.strictEqual(factoredView.getMoveMenuViewUp(0), cItem.getMenuView());
	
	openGuiItemHandler.moveCurrentMenuViewDown();
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, cItem, bItem]);
	assert.strictEqual(factoredView.getMoveMenuViewUp(0), cItem.getMenuView());
	
	openGuiItemHandler.moveCurrentMenuViewDown();
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem, cItem]);
	assert.strictEqual(factoredView.getMoveMenuViewUp(0), cItem.getMenuView());
	
	openGuiItemHandler.moveCurrentMenuViewDown();
	assert.deepEqual(openGuiItemHandler.getItemList(), [aItem, bItem, cItem]);
	assert.strictEqual(factoredView.getMoveMenuViewUp(0), cItem.getMenuView());
	
	
});

QUnit.test("testAddManagedGuiItem_moveCurrentMenuViewDown", function(assert) {
	let openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	let factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	let aItem = CORATEST.managedGuiItemSpy();
	let bItem = CORATEST.managedGuiItemSpy();
	
	openGuiItemHandler.addManagedGuiItem(aItem);
	openGuiItemHandler.showView(aItem);
	openGuiItemHandler.addManagedGuiItem(bItem);
	openGuiItemHandler.showView(bItem);
	openGuiItemHandler.showView(aItem);
	
	openGuiItemHandler.moveCurrentMenuViewDown();
	
	assert.strictEqual(factoredView.getMoveMenuViewDown(0), aItem.getMenuView());
});
