/*
 * Copyright 2016 Olov McKie
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

QUnit.module("gui/infoFactoryTest.js", {
	beforeEach : function() {
		this.infoFactory = CORA.infoFactory();
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.infoFactory);
	assert.strictEqual(this.infoFactory.type, "infoFactory");
});

QUnit.test("testFactorType", function(assert) {
	var info = this.infoFactory.factor({});
	assert.ok(info);
	assert.strictEqual(info.type, "info");
});
QUnit.test("factor", function(assert) {
	var spec = {
		"dummyKey" : "dummyVar"
	};
	var info = this.infoFactory.factor(spec);
	var infoSpec = info.getSpec();
	assert.strictEqual(infoSpec.extraClassName, spec.extraClassName);
});
