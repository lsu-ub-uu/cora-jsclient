/*
 * Copyright 2023 Olov McKie
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

QUnit.module("definitionViewer/definitionViewerFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			someDep : "someDep"
		};
		this.spec = {
			someKey : "someValue"
		};
		this.definitionViewerViewFactory = CORA.definitionViewerViewFactory( this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.strictEqual(this.definitionViewerViewFactory.type, "definitionViewerViewFactory");
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.definitionViewerViewFactory.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	let definitionViewerView = this.definitionViewerViewFactory.factor(this.spec);

	assert.strictEqual(definitionViewerView.type, "definitionViewerView");
});

QUnit.test("factorTestDependencies", function(assert) {
	let definitionViewerView = this.definitionViewerViewFactory.factor(this.spec);
	
	assert.deepEqual(definitionViewerView.onlyForTestGetDependencies(), {});
});

QUnit.test("factorTestSpec", function(assert) {
	let definitionViewerView = this.definitionViewerViewFactory.factor(this.spec);
	
	assert.deepEqual(definitionViewerView.onlyForTestGetSpec(), this.spec);
});
