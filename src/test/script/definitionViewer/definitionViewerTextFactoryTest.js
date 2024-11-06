/*
 * Copyright 2024
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

QUnit.module("definitionViewer/definitionViewerTextFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			someDep : "someDep"
		};
		this.spec = {
			someKey : "someValue"
		};
		this.definitionViewerTextFactory = CORA.definitionViewerTextFactory( this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.strictEqual(this.definitionViewerTextFactory.type, "definitionViewerTextFactory");
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.definitionViewerTextFactory.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	let definitionViewerText = this.definitionViewerTextFactory.factor(this.spec);

	assert.strictEqual(definitionViewerText.type, "definitionViewerText");
});

QUnit.test("factorTestDependencies", function(assert) {
	let definitionViewerText = this.definitionViewerTextFactory.factor(this.spec);
	
	assert.deepEqual(definitionViewerText.onlyForTestGetDependencies(), {});
});

QUnit.test("factorTestSpec", function(assert) {
	let definitionViewerText = this.definitionViewerTextFactory.factor(this.spec);
	
	assert.deepEqual(definitionViewerText.onlyForTestGetSpec(), this.spec);
});
