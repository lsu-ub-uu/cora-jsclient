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

QUnit.module("recordTypeHandlerViewFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = CORATEST.MetadataProviderStub();
		this.dependencies = {};
		this.spec = {
			"presentationId" : "pVarTextVariableId"
		};
		this.recordTypeHandlerViewFactory = CORA.recordTypeHandlerViewFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.recordTypeHandlerViewFactory);
	assert.strictEqual(this.recordTypeHandlerViewFactory.type, "recordTypeHandlerViewFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.recordTypeHandlerViewFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var recordTypeHandlerView = this.recordTypeHandlerViewFactory.factor(this.spec);
	assert.ok(recordTypeHandlerView);
	assert.strictEqual(recordTypeHandlerView.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var recordTypeHandlerView = this.recordTypeHandlerViewFactory.factor(this.spec);
	assert.ok(recordTypeHandlerView);
	assert.strictEqual(recordTypeHandlerView.type, "recordTypeHandlerView");
});

QUnit.test("factorTestSpec", function(assert) {
	var recordTypeHandlerView = this.recordTypeHandlerViewFactory.factor(this.spec);
	var recordTypeHandlerViewSpec = recordTypeHandlerView.getSpec();
	assert.strictEqual(recordTypeHandlerViewSpec, this.spec);
});
