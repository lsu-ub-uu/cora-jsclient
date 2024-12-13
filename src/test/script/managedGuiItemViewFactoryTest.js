/*
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

QUnit.module("managedGuiItemViewFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = CORATEST.MetadataProviderStub();
		this.dependencies = {};
		this.spec = {
			"activateMethod" : function() {
			},
			"removeMethod" : function() {
			},
		};
		this.managedGuiItemViewFactory = CORA.managedGuiItemViewFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.managedGuiItemViewFactory);
	assert.strictEqual(this.managedGuiItemViewFactory.type, "managedGuiItemViewFactory");
});

QUnit.test("factorTestType", function(assert) {
	var managedGuiItemView = this.managedGuiItemViewFactory.factor(this.spec);
	assert.ok(managedGuiItemView);
	assert.strictEqual(managedGuiItemView.type, "managedGuiItemView");
});

QUnit.test("factorTestSpec", function(assert) {
	var managedGuiItemView = this.managedGuiItemViewFactory.factor(this.spec);
	var managedGuiItemViewSpec = managedGuiItemView.getSpec();
	assert.strictEqual(managedGuiItemViewSpec, this.spec);
});
