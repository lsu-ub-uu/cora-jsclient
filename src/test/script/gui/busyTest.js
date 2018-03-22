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

QUnit.module("busyTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.fixture.innerHTML = "";
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var busy = CORA.busy();
	var view = busy.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.modelObject, busy);
	assert.strictEqual(view.className, "busy hidden");

	assert.notVisible(view);
});

QUnit.test("testShowAndHide", function(assert) {
	var busy = CORA.busy();
	var view = busy.getView();
	this.fixture.appendChild(view);

	busy.show();
	assert.visible(view);

	busy.hide();
	assert.notVisible(view);
});

QUnit.test("testHideWithEffect", function(assert) {
	var busy = CORA.busy();
	var view = busy.getView();
	this.fixture.appendChild(view);

	busy.show();
	assert.visible(view);

	busy.hideWithEffect();

	var event = document.createEvent('Event');
	event.initEvent('transitionend', true, true);
	view.dispatchEvent(event);

	assert.notVisible(view);
});
QUnit.test("testHideWithEffectTransitionendNotCalled", function(assert) {
	var done = assert.async();
	var busy = CORA.busy();
	var view = busy.getView();
	this.fixture.appendChild(view);

	busy.show();
	assert.visible(view);

	// no busy className will make transition rule not affect this, triggering no
	// fired event
	view.className = "";
	busy.hideWithEffect();

	window.setTimeout(function() {
		assert.strictEqual(view.className, " toBeRemoved hidden", "if toBeRemoved is still here,"
				+ " has the busy not been removed by transitionend event");
		done();
	}, 1050);
});

QUnit.test("testAddBeforeShowFunction", function(assert) {
	var busy = CORA.busy();
	var view = busy.getView();
	this.fixture.appendChild(view);
	var called = false;
	busy.addBeforeShowFunction(function() {
		called = true;
	});

	busy.show();
	assert.visible(view);
	assert.strictEqual(called, true);
});
