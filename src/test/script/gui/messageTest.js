/*
 * Copyright 2016 Olov McKie
 * Copyright 2021 Uppsala Universitet
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

QUnit.module("gui/messageTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
	},
	afterEach : function() {
	}
});

QUnit.test("testConstants", function(assert) {
	assert.deepEqual(CORA.message.ERROR, {
		"className" : "error",
		"defaultTimeout" : 0
	});
	assert.deepEqual(CORA.message.WARNING, {
		"className" : "warning",
		"defaultTimeout" : 10000
	});
	assert.deepEqual(CORA.message.INFO, {
		"className" : "info",
		"defaultTimeout" : 5000
	});
	assert.deepEqual(CORA.message.POSITIVE, {
		"className" : "positive",
		"defaultTimeout" : 3000
	});
});

QUnit.test("testInit", function(assert) {
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.ERROR,
		"timeout" : 254
	};
	var message = CORA.message(messageSpec);
	var view = message.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(message.getTimeout(), 254);

	assert.strictEqual(view.modelObject, message);
	assert.strictEqual(view.className, "message error");

	var messageText = view.childNodes[1];
	assert.strictEqual(messageText.textContent, "some text");

	var removeButton = view.childNodes[0];
	assert.strictEqual(removeButton.className, "iconButton removeButton");
	// to prevent rouge timers call remove on elements after test has completed
	message.clearHideTimeout();
});

QUnit.test("testHtmlInMessage", function(assert) {
	var messageSpec = {
		message : "<span>some text</span>",
		type : CORA.message.ERROR
	};
	var message = CORA.message(messageSpec);
	var view = message.getView();
	this.fixture.appendChild(view);

	var messageText = view.childNodes[1];
	assert.strictEqual(messageText.textContent, "some text");
});

QUnit.test("testHtmlInMessage", function(assert) {
	var messageSpec = {
		message : "<span>some text</span>",
		type : CORA.message.ERROR,
		renderHtml : false
	};
	var message = CORA.message(messageSpec);
	var view = message.getView();
	this.fixture.appendChild(view);

	var messageText = view.childNodes[1];
	assert.strictEqual(messageText.textContent, "<span>some text</span>");
});

QUnit.test("testInitWithoutTimeout", function(assert) {
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.WARNING
	};
	var message = CORA.message(messageSpec);
	var view = message.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(message.getTimeout(), 10000);
	// to prevent rouge timers call remove on elements after test has completed
	message.clearHideTimeout();
});

QUnit.test("testHide", function(assert) {
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.ERROR,
		"timeout" : 21
	};
	var message = CORA.message(messageSpec);

	var view = message.getView();
	this.fixture.appendChild(view);
	assert.visible(view);

	message.hide();
	assert.notVisible(view);
	// to prevent rouge timers call remove on elements after test has completed
	message.clearHideTimeout();
});

QUnit.test("testRemoveButton", function(assert) {
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.ERROR,
		"timeout" : 21
	};
	var message = CORA.message(messageSpec);

	var view = message.getView();
	this.fixture.appendChild(view);
	assert.visible(view);

	var removeButton = view.childNodes[0];
	CORATESTHELPER.simulateOnclick(removeButton);
	
	assert.notVisible(view);
	// to prevent rouge timers call remove on elements after test has completed
	message.clearHideTimeout();
});

QUnit.test("testRemoveButtonMultipleTransitionsMayCallHideMoreThanOnce", function(assert) {
	var messageSpec = {
			"message" : "some text",
			"type" : CORA.message.ERROR,
			"timeout" : 21
	};
	var message = CORA.message(messageSpec);
	
	var view = message.getView();
	this.fixture.appendChild(view);
	assert.visible(view);
	
	var removeButton = view.childNodes[0];
	CORATESTHELPER.simulateOnclick(removeButton);
	
	assert.notVisible(view);
	var noProblem = true;
	try{
		message.hide();
		message.hide();
	}catch (e) {
		noProblem = false;
	}
	assert.ok(noProblem);
});

QUnit.test("testHideAfterTimeout", function(assert) {
	var done = assert.async();
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.ERROR,
		"timeout" : 5
	};
	var message = CORA.message(messageSpec);

	var view = message.getView();
	this.fixture.appendChild(view);

	setTimeout(function() {
		assert.notVisible(view, "message should be hidden after 5ms timeout");
		done();
		// to prevent rouge timers call remove on elements after test has completed
		message.clearHideTimeout();
	}, 7);
});

QUnit.test("testHideWithEffect", function(assert) {
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.ERROR,
		"timeout" : 0
	};
	var message = CORA.message(messageSpec);

	var view = message.getView();
	this.fixture.appendChild(view);
	assert.visible(view);

	message.hideWithEffect();

	var event = document.createEvent('Event');
	event.initEvent('transitionend', true, true);
	view.dispatchEvent(event);

	assert.notVisible(view, "message should be hidden");

	// to prevent rouge timers call remove on elements after test has completed
	message.clearHideTimeout();
});
QUnit.test("testHideWithEffectTransitionendNotCalled", function(assert) {
	var done = assert.async();
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.ERROR,
		"timeout" : 0
	};
	var message = CORA.message(messageSpec);

	var view = message.getView();
	// no message className will make transition rule not affect this, triggering no
	// fired event
	view.className = "";
	this.fixture.appendChild(view);
	assert.visible(view);
	message.hideWithEffect();

	window.setTimeout(function() {
		assert.strictEqual(view.className, " toBeRemoved", "if toBeRemoved is still here,"
				+ " has the message not been removed by transitionend event");
		assert.strictEqual(view.parentNode, null, "message should be removed after max 1000ms");

		// to prevent rouge timers call remove on elements after
		// test has completed
		message.clearHideTimeout();
		done();
	}, 1050);
});