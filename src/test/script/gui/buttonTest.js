/*
 * Copyright 2018, 2024 Olov McKie
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

QUnit.module("gui/buttonTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let button = CORA.gui.button({});
	this.fixture.appendChild(button);

	assert.strictEqual(button.nodeName, "SPAN");
	assert.strictEqual(button.className, "");
});

QUnit.test("testClassNameInSpec", function(assert) {
	let button = CORA.gui.button({
		className : "iconButton removeButton"
	});
	this.fixture.appendChild(button);

	assert.strictEqual(button.className, "iconButton removeButton");
});

QUnit.test("testActionOnclickActiveByDefault", function(assert) {
	let clicked = 0;
	let button = CORA.gui.button({
		action : {
			method : function() {
				clicked = clicked + 1;
			}
		}
	});
	this.fixture.appendChild(button);

	CORATESTHELPER.simulateOnclick(button);
	assert.strictEqual(clicked, 1);
});

QUnit.test("testActionDisableOnclick", function(assert) {
	let clicked = false;
	let button = CORA.gui.button({
		action : {
			method : function() {
				clicked = true;
			},
			clickable : false
		}
	});
	this.fixture.appendChild(button);

	CORATESTHELPER.simulateOnclick(button);
	assert.strictEqual(clicked, false);
});

QUnit.test("testOnclickIsNotPropagatedToParent", function(assert) {
	let clickedParent = false;
	let parent = document.createElement("SPAN");
	this.fixture.appendChild(parent);
	parent.onclick = function() {
		clickedParent = true;
	}
	let clicked = false;
	let button = CORA.gui.button({
		action : {
			method : function() {
				clicked = true;
			}
		}
	});
	parent.appendChild(button);
	CORATESTHELPER.simulateOnclick(button);
	assert.strictEqual(clicked, true);
	assert.strictEqual(clickedParent, false);
});

QUnit.test("testButtonWithText", function(assert) {
	let button = CORA.gui.button({
		text : "someText"
	});
	this.fixture.appendChild(button);
	assert.strictEqual(button.textContent, "someText");
});

QUnit.test("testOnkeydownInSpec", function(assert) {
	let activated = false;
	let button = CORA.gui.button({
		action : {
			method : function() {
				activated = true;
			},
			onkeydown : {
				keys : [ "a" ]
			}
		}
	});
	this.fixture.appendChild(button);

	assert.strictEqual(button.tabIndex, 0);

	CORATESTHELPER.simulateKeydown(button, "a");
	assert.strictEqual(activated, true);
});

QUnit.test("testOnkeydownWithMoreKeysInSpec", function(assert) {
	let activated = false;
	let button = CORA.gui.button({
		action : {
			method : function() {
				activated = true;
			},
			onkeydown : {
				keys : [ "a", "o", "i" ],
			}
		}
	});
	this.fixture.appendChild(button);

	assert.strictEqual(button.tabIndex, 0);

	CORATESTHELPER.simulateKeydown(button, "a");
	assert.strictEqual(activated, true);

	activated = false;
	CORATESTHELPER.simulateKeydown(button, "o");
	assert.strictEqual(activated, true);

	activated = false;
	CORATESTHELPER.simulateKeydown(button, "i");
	assert.strictEqual(activated, true);
});

QUnit.test("testOnkeydownInSpecNotCalledForWrongKey", function(assert) {
	let activated = false;
	let button = CORA.gui.button({
		action : {
			method : function() {
				activated = true;
			},
			onkeydown : {
				keys : [ "a" ]
			}
		}
	});
	this.fixture.appendChild(button);

	CORATESTHELPER.simulateKeydown(button, "b");
	assert.strictEqual(activated, false);
});
