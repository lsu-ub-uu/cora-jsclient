/*
 * Copyright 2016 Olov McKie
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

QUnit.module("gui/workItemViewFactoryTest.js", {
	beforeEach : function() {
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var workItemViewFactory = CORA.workItemViewFactory();
	assert.ok(workItemViewFactory);
	assert.strictEqual(workItemViewFactory.type, "workItemViewFactory");
});

QUnit.test("factor", function(assert) {
	var workItemViewFactory = CORA.workItemViewFactory();
	var spec = {
	};
	var workItemView = workItemViewFactory.factor(spec);
	assert.strictEqual(workItemView.getSpec(), spec);
});

QUnit.test("testFactoredDependencies", function(assert) {
	var workItemViewFactory = CORA.workItemViewFactory();
	var workItemView = workItemViewFactory.factor({});

	assert.strictEqual(workItemView.getDependencies().holderFactory.type, "holderFactory");
});
