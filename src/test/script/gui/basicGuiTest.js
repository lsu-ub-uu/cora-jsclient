/*
 * Copyright 2016, 2023 Olov McKie
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

QUnit.module("gui/basicGuiTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
	},
	afterEach : function() {
	}
});

QUnit.test("testCreateRemoveButton", function(assert) {
	let clicked = false;

	let onclick = function() {
		clicked = true;
	};
	let button = CORA.gui.createRemoveButton(onclick);
	assert.strictEqual(button.className, "iconButton removeButton");

	CORATESTHELPER.simulateOnclick(button);
	
	assert.strictEqual(clicked, true);
});

QUnit.test("testCreateSpanWithClassName", function(assert) {
	let span = CORA.gui.createSpanWithClassName("className");
	assert.strictEqual(span.nodeName, "SPAN");
	assert.strictEqual(span.className, "className");
});

QUnit.test("testCreateDivWithClassName", function(assert) {
	let div = CORA.gui.createDivWithClassName("className");
	assert.strictEqual(div.nodeName, "DIV");
	assert.strictEqual(div.className, "className");
});

QUnit.test("testCreateLabelWithClassName", function(assert) {
	let div = CORA.gui.createLabelWithClassName("className");
	assert.strictEqual(div.nodeName, "LABEL");
	assert.strictEqual(div.className, "className");
});
