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

import CORA from "../../main/webapp/script/aCoraNameSpace.js";
"use strict";

QUnit.module("recordHandlerViewFactoryTest.js", {
	beforeEach : function() {
		this.spec = {
			"extraClassName" : "someClassname"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var recordHandlerViewFactory = CORA.recordHandlerViewFactory();
	assert.strictEqual(recordHandlerViewFactory.type, "recordHandlerViewFactory");
});

QUnit.test("factorTestDependencies", function(assert) {
	var recordHandlerViewFactory = CORA.recordHandlerViewFactory();
	var recordHandlerView = recordHandlerViewFactory.factor(this.spec);
	assert.strictEqual(recordHandlerView.getDependencies().workItemViewFactory.type,
			"workItemViewFactory");
	assert.strictEqual(recordHandlerView.getDependencies().messageHolderFactory.type,
	"messageHolderFactory");
    assert.strictEqual(recordHandlerView.getDependencies().holderFactory.type,
        "holderFactory");
});

QUnit.test("factorTestType", function(assert) {
	var recordHandlerViewFactory = CORA.recordHandlerViewFactory();
	var recordHandlerView = recordHandlerViewFactory.factor(this.spec);
	assert.strictEqual(recordHandlerView.type, "recordHandlerView");
});

QUnit.test("factorTestSpec", function(assert) {
	var recordHandlerViewFactory = CORA.recordHandlerViewFactory();
	var recordHandlerView = recordHandlerViewFactory.factor(this.spec);
	assert.strictEqual(recordHandlerView.getSpec(), this.spec);
});

export {};
