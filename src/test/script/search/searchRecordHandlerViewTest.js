/*
 * Copyright 2017 Uppsala University Library
 * Copyright 2017 Olov McKie
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

QUnit.module("search/searchRecordHandlerViewTest.js", {
	beforeEach : function() {
		this.dependencies = {};
		this.spec = {
			"headerText" : "some text",
			"openSearchMethod" : function() {
			}
		};
	},
	afterEach : function() {
	}
});
QUnit.test("testInit", function(assert) {
	var searchRecordHandlerView = CORA.searchRecordHandlerView(this.dependencies, this.spec);
	assert.strictEqual(searchRecordHandlerView.type, "searchRecordHandlerView");
});

QUnit.test("testGetDependencies", function(assert) {
	var searchRecordHandlerView = CORA.searchRecordHandlerView(this.dependencies, this.spec);
	assert.strictEqual(searchRecordHandlerView.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var searchRecordHandlerView = CORA.searchRecordHandlerView(this.dependencies, this.spec);
	assert.strictEqual(searchRecordHandlerView.getSpec(), this.spec);
});

QUnit.test("testGetView", function(assert) {
	var searchRecordHandlerView = CORA.searchRecordHandlerView(this.dependencies, this.spec);
	var view = searchRecordHandlerView.getView();
	assert.strictEqual(view.className, "searchRecord");

	var header = view.firstChild;
	assert.strictEqual(header.className, "header clickable");
	assert.strictEqual(header.textContent, "some text");

	var childrenView = view.childNodes[1];
	assert.strictEqual(childrenView.className, "childrenView");
});

QUnit.test("testMenuOnclick", function(assert) {
	var searchRecordHandlerView = CORA.searchRecordHandlerView(this.dependencies, this.spec);
	var header = searchRecordHandlerView.getView().firstChild;
	assert.strictEqual(header.onclick, this.spec.openSearchMethod);
});

QUnit.test("testAddManagedGuiItem", function(assert) {
	var searchRecordHandlerView = CORA.searchRecordHandlerView(this.dependencies, this.spec);
	var managedGuiItem = CORATEST.managedGuiItemSpy();
	var createdManagedGuiItem = searchRecordHandlerView.addManagedGuiItem(managedGuiItem);
	var view = searchRecordHandlerView.getView();
	var childrenView = view.childNodes[1];
	assert.strictEqual(childrenView.childNodes[0], managedGuiItem.getMenuView());
});

QUnit.test("testRemoveManagedGuiItem", function(assert) {
	var searchRecordHandlerView = CORA.searchRecordHandlerView(this.dependencies, this.spec);
	var managedGuiItem = CORATEST.managedGuiItemSpy();
	var createdManagedGuiItem = searchRecordHandlerView.addManagedGuiItem(managedGuiItem);
	var view = searchRecordHandlerView.getView();
	var childrenView = view.childNodes[1];
	assert.strictEqual(childrenView.childNodes[0], managedGuiItem.getMenuView());

	// remove
	searchRecordHandlerView.removeManagedGuiItem(managedGuiItem);
	assert.strictEqual(childrenView.childNodes[0], undefined);
});
