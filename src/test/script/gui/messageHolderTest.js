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

QUnit.module("gui/messageHolderTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
	},
	afterEach : function() {
	}
});


QUnit.test("testInit", function(assert) {
	var messageHolder = CORA.messageHolder();
	
	var view = messageHolder.getView();
	assert.strictEqual(view.modelObject, messageHolder);
	assert.strictEqual(view.className, "messageHolder");
});

QUnit.test("testNewMessage", function(assert) {
	var messageHolder = CORA.messageHolder();
	var view = messageHolder.getView();
	
	var messageSpec = {
			"message" : "some text",
			"type" : CORA.message.ERROR,
			"timeout" : 20
		};
	messageHolder.createMessage(messageSpec);
	
	var messageView = view.firstChild;
	assert.strictEqual(messageView.className, "message error");

	var messageText = messageView.childNodes[1];
	assert.strictEqual(messageText.textContent, "some text");
});
