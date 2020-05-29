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

QUnit.module("gui/questionTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
	},
	afterEach : function() {
	}
});

QUnit.test("testInitAndButtonClickRemovesQuestion", function(assert) {
	var done = assert.async();
	var spec = {
		"text" : "Are you sure?",
		"buttons" : [ {
			"text" : "yes"
		} ]
	};
	var question = CORA.question(spec);
	var view = question.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.modelObject, question);
	assert.strictEqual(view.className, "question");

	assert.visible(view);

	var questionBox = view.firstChild;
	assert.strictEqual(questionBox.className, "questionBox");
	assert.strictEqual(questionBox.firstChild.innerHTML, "Are you sure?");

	var button1 = questionBox.childNodes[1];
	assert.strictEqual(button1.type, "button");
	assert.strictEqual(button1.value, "yes");

	button1.onclick();

	window.setTimeout(function() {
		assert.notVisible(view);
		done();
	}, 1050);
});

QUnit.test("testHide", function(assert) {
	var spec = {
			"text" : "Are you sure?",
			"buttons" : [ {
				"text" : "yes"
			} ]
	};
	var question = CORA.question(spec);
	var view = question.getView();
	this.fixture.appendChild(view);
	
	assert.visible(view);
	question.hide();
	assert.notVisible(view);
});
	
QUnit.test("testInitAndButtonClick", function(assert) {
	var buttonClicked = false;
	var clickFunction = function (){
		buttonClicked = true;
	};
	var spec = {
		"text" : "Are you sure?",
		"buttons" : [ {
			"text" : "yes",
			"onclickFunction":clickFunction
		} ]
	};
	var question = CORA.question(spec);
	var view = question.getView();
	this.fixture.appendChild(view);


	var questionBox = view.firstChild;
	var button1 = questionBox.childNodes[1];
	
	assert.strictEqual(buttonClicked, false);
	button1.onclick();
	assert.strictEqual(buttonClicked, true);
});

QUnit.test("testHideWithEffectEvent", function(assert) {
	var spec = {
		"text" : "Are you sure?",
		"buttons" : [ {
			"text" : "yes"
		} ]
	};
	var question = CORA.question(spec);
	var view = question.getView();
	this.fixture.appendChild(view);

	assert.visible(view);

	question.hideWithEffect();

	var event = document.createEvent('Event');
	event.initEvent('transitionend', true, true);
	view.dispatchEvent(event);

	assert.notVisible(view);
	
});
QUnit.test("testHideWithEffectTransitionendNotCalled", function(assert) {
	var done = assert.async();
	var spec = {
		"text" : "Are you sure?",
		"buttons" : [ {
			"text" : "yes"
		} ]
	};
	var question = CORA.question(spec);
	var view = question.getView();
	this.fixture.appendChild(view);

	assert.visible(view);

	// no question className will make transition rule not affect this, triggering no
	// fired event
	view.className = "";
	question.hideWithEffect();

	window.setTimeout(function() {
		assert.strictEqual(view.className, " toBeRemoved hidden", "if toBeRemoved is still here,"
				+ " has the question not been removed by transitionend event");
		done();
	}, 1050);
});

QUnit.test("testTwoButtons", function(assert) {
	var spec = {
		"text" : "Are you sure?",
		"buttons" : [ {
			"text" : "yes"
		},{
			"text" : "no"
		} ]
	};
	var question = CORA.question(spec);
	var view = question.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.modelObject, question);
	assert.strictEqual(view.className, "question");

	assert.visible(view);

	var questionBox = view.firstChild;
	assert.strictEqual(questionBox.className, "questionBox");
	assert.strictEqual(questionBox.firstChild.innerHTML, "Are you sure?");

	var button1 = questionBox.childNodes[1];
	assert.strictEqual(button1.type, "button");
	assert.strictEqual(button1.value, "yes");

	var button2 = questionBox.childNodes[2];
	assert.strictEqual(button2.type, "button");
	assert.strictEqual(button2.value, "no");
});