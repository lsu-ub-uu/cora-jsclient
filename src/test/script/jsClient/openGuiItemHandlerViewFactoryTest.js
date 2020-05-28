/*
 * Copyright 2017 Uppsala University Library
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

QUnit.module("jsClient/openGuiItemHandlerViewFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"messageHolderFactory" : CORATEST.messageHolderFactorySpy()
		};
		this.spec = {
			"name" : "someName"
		}
		this.openGuiItemHandlerViewFactory = CORA.openGuiItemHandlerViewFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.openGuiItemHandlerViewFactory);
	assert.strictEqual(this.openGuiItemHandlerViewFactory.type, "openGuiItemHandlerViewFactory");
}); 

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.openGuiItemHandlerViewFactory.getDependencies(), this.dependencies);
});

QUnit.test("factor", function(assert) {
	var openGuiItemHandlerView = this.openGuiItemHandlerViewFactory.factor(this.spec);
	assert.strictEqual(openGuiItemHandlerView.type, "openGuiItemHandlerView");

	var openGuiItemHandlerViewSpec = openGuiItemHandlerView.getSpec();
	assert.strictEqual(openGuiItemHandlerViewSpec, this.spec);
});
