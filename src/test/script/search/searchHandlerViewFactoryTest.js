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

QUnit.module("search/searchHandlerViewFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"textProvider" : CORATEST.textProviderSpy()
		};

		this.spec = {
			"searchMethod" : function() {
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var searchHandlerViewFactory = CORA.searchHandlerViewFactory(this.dependencies);
	assert.strictEqual(searchHandlerViewFactory.type, "searchHandlerViewFactory");
});

QUnit.test("testGetDependencies", function(assert) {
	var searchHandlerViewFactory = CORA.searchHandlerViewFactory(this.dependencies);
	assert.strictEqual(searchHandlerViewFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	var searchHandlerViewFactory = CORA.searchHandlerViewFactory(this.dependencies);
	var searchHandlerView = searchHandlerViewFactory.factor(this.spec);
	assert.strictEqual(searchHandlerView.type, "searchHandlerView");
});

QUnit.test("factorTestDependencies", function(assert) {
	var searchHandlerViewFactory = CORA.searchHandlerViewFactory(this.dependencies);
	var searchHandlerView = searchHandlerViewFactory.factor(this.spec);
	assert.strictEqual(searchHandlerView.getDependencies().workItemViewFactory.type,
			"workItemViewFactory");
	assert.strictEqual(searchHandlerView.getDependencies().messageHolderFactory.type,
			"messageHolderFactory");

	assert.strictEqual(searchHandlerView.getDependencies().busyFactory.type,
			"genericFactory");
	assert.strictEqual(searchHandlerView.getDependencies().busyFactory.getTypeToFactor(),
			"busy");

	assert.strictEqual(searchHandlerView.getDependencies().textProvider,
			this.dependencies.textProvider); 
});

QUnit.test("factorTestSpec", function(assert) {
	var searchHandlerViewFactory = CORA.searchHandlerViewFactory(this.dependencies);
	var searchHandlerView = searchHandlerViewFactory.factor(this.spec);
	assert.strictEqual(searchHandlerView.getSpec(), this.spec);
});
