/*
 * Copyright 2016, 2018 Olov McKie
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

import CORA from "../../../main/webapp/script/aCoraNameSpace.js";
import CORATESTHELPER from "../aCoratestHelperNameSpace.js";
"use strict";
QUnit.module("gui/holderTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
	},
	afterEach : function() {
	}
});

QUnit.test("testConstants", function(assert) {
	assert.strictEqual(CORA.holder.CLOSED, 0);
	assert.strictEqual(CORA.holder.OPEN, 1); 
});
 
QUnit.test("initTestInitialState", function(assert) {
	var spec = {};
	var holder = CORA.holder(spec);
	assert.strictEqual(holder.getStatus(), CORA.holder.CLOSED);
});

QUnit.test("initTestType", function(assert) {
	var spec = {};
	var holder = CORA.holder(spec);
	assert.strictEqual(holder.type, "holder");
});

QUnit.test("initGetSpec", function(assert) {
	var spec = {};
	var holder = CORA.holder(spec);
	assert.strictEqual(holder.getSpec(), spec);
});

QUnit.test("initTestHolder", function(assert) {
	var spec = {};
	var holder = CORA.holder(spec);
	var holderButton = holder.getButton();
	assert.equal(holderButton.nodeName, "SPAN");
	assert.equal(holderButton.className, "iconButton");

	var holderView = holder.getView();
	assert.equal(holderView.nodeName, "SPAN");
	assert.equal(holderView.className, "holder");

	assert.notVisible(holderView);
});

QUnit.test("initTestHolderWithClassName", function(assert) {
	var spec = {
		"className" : "tool"
	};
	var holder = CORA.holder(spec);
	var holderButton = holder.getButton();
	assert.equal(holderButton.nodeName, "SPAN");
	assert.equal(holderButton.className, "iconButton tool");

	var holderView = holder.getView();
	assert.equal(holderView.nodeName, "SPAN");
	assert.equal(holderView.className, "holder tool");
});

QUnit.test("initTestHolderWithClassNameAndButtonText", function(assert) {
	var spec = {
		"className" : "tool",
		"buttonText" : "someText"
	};
	var holder = CORA.holder(spec);
	var holderButton = holder.getButton();
	assert.equal(holderButton.nodeName, "SPAN");
	assert.equal(holderButton.className, "iconButton tool");
	assert.equal(holderButton.textContent, "someText");
});

QUnit.test("initTestOneButtonClickAfterOpenCloseCall", function(assert) {
	var wasCalled = false;
	function someFunction() {
		wasCalled = true;
	}
	var spec = {
		"afterOpenClose" : someFunction,
		"appendTo" : this.fixture

	};
	var holder = CORA.holder(spec);

	var button = holder.getButton();
	CORATESTHELPER.simulateOnclick(button);

	assert.ok(wasCalled);
});

QUnit.test("initTestHolderAppendTo", function(assert) {
	var spec = {
		"appendTo" : this.fixture
	};
	var holder = CORA.holder(spec);
	var holderView = holder.getView();
	var holderFromFixture = this.fixture.firstChild;
	assert.strictEqual(holderView, holderFromFixture);
});

QUnit.test("initTestHolderViewInsertAfter", function(assert) {
	var fixture = this.fixture;
	var child1 = document.createElement("span");
	fixture.appendChild(child1);
	var child2 = document.createElement("span");
	fixture.appendChild(child2);

	var spec = {
		"insertAfter" : child1
	};
	var holder = CORA.holder(spec);

	var holderView = holder.getView();
	var holderFromFixture = this.fixture.childNodes[1];
	assert.strictEqual(holderView, holderFromFixture);
});

QUnit.test("initTestHolderOneButtonClick", function(assert) {
	var spec = {
		"appendTo" : this.fixture
	};
	var holder = CORA.holder(spec);
	assert.strictEqual(holder.getStatus(), CORA.holder.CLOSED);

	var button = holder.getButton();
	CORATESTHELPER.simulateOnclick(button);

	var holderView = holder.getView();
	assert.visible(holderView);
});

QUnit.test("initTestHolderTwoButtonClick", function(assert) {
	var spec = {
		"appendTo" : this.fixture
	};
	var holder = CORA.holder(spec);

	var button = holder.getButton();
	CORATESTHELPER.simulateOnclick(button);
	CORATESTHELPER.simulateOnclick(button);

	assert.strictEqual(holder.getStatus(), CORA.holder.CLOSED);

	var holderView = holder.getView();
	assert.notVisible(holderView);
});

QUnit.test("initTestToggleHolder", function(assert) {
	var spec = {
		"appendTo" : this.fixture
	};
	var holder = CORA.holder(spec);
	var holderView = holder.getView();
	assert.notVisible(holderView);
	assert.strictEqual(holder.getStatus(), CORA.holder.CLOSED);

	var event = document.createEvent('Event');
	holder.toggleHolder(event);

	assert.visible(holderView);
	assert.strictEqual(holder.getStatus(), CORA.holder.OPEN);

	holder.toggleHolder(event);

	assert.notVisible(holderView);
	assert.strictEqual(holder.getStatus(), CORA.holder.CLOSED);
});
QUnit.test("initTestOpenCloseHolder", function(assert) {
	var wasCalled = 0;
	function someFunction() {
		wasCalled++;
	}
	var spec = {
		"afterOpenClose" : someFunction,
		"appendTo" : this.fixture
	};
	var holder = CORA.holder(spec);
	var holderView = holder.getView();
	assert.notVisible(holderView);
	assert.strictEqual(holder.getStatus(), CORA.holder.CLOSED);
	assert.strictEqual(wasCalled, 1);

	var event = document.createEvent('Event');

	holder.openHolder(event);
	assert.visible(holderView);
	assert.strictEqual(holder.getStatus(), CORA.holder.OPEN);
	assert.strictEqual(wasCalled, 2);

	holder.openHolder(event);
	assert.visible(holderView);
	assert.strictEqual(holder.getStatus(), CORA.holder.OPEN);
	assert.strictEqual(wasCalled, 3);

	holder.closeHolder(event);
	assert.notVisible(holderView);
	assert.strictEqual(holder.getStatus(), CORA.holder.CLOSED);
	assert.strictEqual(wasCalled, 4);

	holder.closeHolder(event);
	assert.notVisible(holderView);
	assert.strictEqual(holder.getStatus(), CORA.holder.CLOSED);
	assert.strictEqual(wasCalled, 5);

	holder.openHolder(event);
	assert.visible(holderView);
	assert.strictEqual(holder.getStatus(), CORA.holder.OPEN);
	assert.strictEqual(wasCalled, 6);
});

export {};
