/*
 * Copyright 2016 Olov McKie
 * Copyright 2025  Uppsala University Library
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

QUnit.module("gui/questionTest.js", hooks => {
	const test = QUnit.test;
	let fixture;
	let spec;

	let question;
	let view;

	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");

		spec = {
			text: "Are you sure?",
			buttons: [{
				text: "yes"
			}]
		};
	});

	hooks.afterEach(() => { });

	const startQuestion = function() {
		question = CORA.question(spec);
		view = question.getView();
		fixture.appendChild(view);
	};

	test("testInitAndButtonClickRemovesQuestion", function(assert) {
		let done = assert.async();
		startQuestion();

		assert.strictEqual(view.modelObject, question);
		assert.strictEqual(view.className, "question");

		assert.visible(view);

		let questionBox = view.firstChild;
		assert.strictEqual(questionBox.className, "questionBox");
		assert.strictEqual(questionBox.firstChild.innerHTML, "Are you sure?");

		let button1 = questionBox.childNodes[1];
		assert.strictEqual(button1.type, "button");
		assert.strictEqual(button1.value, "yes");

		button1.onclick();

		window.setTimeout(function() {
			assert.notVisible(view);
			done();
		}, 1050);
	});

	test("testHide", function(assert) {
		startQuestion();

		assert.visible(view);
		question.hide();
		assert.notVisible(view);
	});

	test("testInitAndButtonClick", function(assert) {
		let buttonClicked = false;
		let clickFunction = function() {
			buttonClicked = true;
		};
		spec.buttons[0].onclickFunction = clickFunction;

		startQuestion();

		let questionBox = view.firstChild;
		let button1 = questionBox.childNodes[1];

		assert.strictEqual(buttonClicked, false);
		button1.onclick();
		assert.strictEqual(buttonClicked, true);
	});

	test("testMultipleButtonClickShouldOnlyTriggerOnce", function(assert) {
		let buttonClicked = 0;
		let clickFunction = function() {
			buttonClicked++;
		};
		spec.buttons.push({ text: "no" });
		spec.buttons[0].onclickFunction = clickFunction;
		spec.buttons[1].onclickFunction = clickFunction;

		startQuestion();

		let questionBox = view.firstChild;
		let button1 = questionBox.childNodes[1];
		let button2 = questionBox.childNodes[2];

		assert.strictEqual(buttonClicked, 0);
		button1.onclick();
		button2.onclick();
		button1.onclick();
		button2.onclick();
		button1.onclick();
		button2.onclick();
		assert.strictEqual(buttonClicked, 1);
	});

	test("testHideWithEffectEvent", function(assert) {
		startQuestion();

		assert.visible(view);

		question.hideWithEffect();

		let event = document.createEvent('Event');
		event.initEvent('transitionend', true, true);
		view.dispatchEvent(event);

		assert.notVisible(view);
	});

	test("testHideWithEffectTransitionendNotCalled", function(assert) {
		let done = assert.async();

		startQuestion();

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

	test("testTwoButtons", function(assert) {
		spec.buttons.push({ text: "no" });

		startQuestion();

		assert.strictEqual(view.modelObject, question);
		assert.strictEqual(view.className, "question");

		assert.visible(view);

		let questionBox = view.firstChild;
		assert.strictEqual(questionBox.className, "questionBox");
		assert.strictEqual(questionBox.firstChild.innerHTML, "Are you sure?");

		let button1 = questionBox.childNodes[1];
		assert.strictEqual(button1.type, "button");
		assert.strictEqual(button1.value, "yes");

		let button2 = questionBox.childNodes[2];
		assert.strictEqual(button2.type, "button");
		assert.strictEqual(button2.value, "no");
	});

});