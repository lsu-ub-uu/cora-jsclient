/*
 * Copyright 2016, 2017, 2024 Olov McKie
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
QUnit.module("gui/infoTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture"); 
	},
	afterEach : function() {
	}
});

QUnit.test("testConstants", function(assert) {
	assert.strictEqual(CORA.info.NONE, 0);
	assert.strictEqual(CORA.info.TEXT, 1);
	assert.strictEqual(CORA.info.ALL, 2);
});

QUnit.test("initTestType", function(assert) {
	let spec = {};
	let info = CORA.info(spec);
	assert.strictEqual(info.type, "info");
});

QUnit.test("initTestGetSpec", function(assert) {
	let spec = {};
	let info = CORA.info(spec);
	assert.strictEqual(info.getSpec(), spec);
});

QUnit.test("initTestInitialState", function(assert) {
	let spec = {};
	let info = CORA.info(spec);
	assert.strictEqual(info.getInfoLevel(), CORA.info.NONE);
});

QUnit.test("initTestInfoButton", function(assert) {
	let spec = {};
	let info = CORA.info(spec);
	let infoButton = info.getButton();
	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "iconButton infoButton");
});

QUnit.test("initTestOneButtonClickafterLevelChangeCall", function(assert) {
	let wasCalled = false;
	function someFunction() {
		wasCalled = true;
	}
	let spec = {
		"afterLevelChange" : someFunction,
		"appendTo" : this.fixture

	};
	let info = CORA.info(spec);
	assert.strictEqual(this.fixture.childNodes.length, 0);

	let button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	assert.ok(wasCalled);
});

QUnit.test("initTestInfoViewAppendToOneButtonClick", function(assert) {
	let spec = {
		"appendTo" : this.fixture
	};
	let info = CORA.info(spec);
	assert.strictEqual(this.fixture.childNodes.length, 0);

	let button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	assert.strictEqual(info.getInfoLevel(), CORA.info.TEXT);

	let infoView = info.getView();
	let infoFromFixture = this.fixture.firstChild;
	assert.strictEqual(infoView, infoFromFixture);

	// base infoView
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	assert.equal(infoView.childNodes.length, 0);
});

QUnit.test("initTestInfoViewInsertAfterOneButtonClick", function(assert) {
	let fixture = this.fixture;
	let child1 = document.createElement("span");
	fixture.appendChild(child1);
	let child2 = document.createElement("span");
	fixture.appendChild(child2);

	let spec = {
		"insertAfter" : child1
	};
	let info = CORA.info(spec);

	let button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	let infoView = info.getView();
	let infoFromFixture = this.fixture.childNodes[1];
	assert.strictEqual(infoView, infoFromFixture);

	// base infoView
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	assert.equal(infoView.childNodes.length, 0);
});

QUnit.test("initTestInfoViewInsertBeforeOneButtonClick", function(assert) {
	let fixture = this.fixture;
	let child1 = document.createElement("span");
	fixture.appendChild(child1);
	let child2 = document.createElement("span");
	fixture.appendChild(child2);

	let spec = {
		"insertBefore" : child2
	};
	let info = CORA.info(spec);

	let button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	let infoView = info.getView();
	let infoFromFixture = this.fixture.childNodes[1];
	assert.strictEqual(infoView, infoFromFixture);

	// base infoView
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	assert.equal(infoView.childNodes.length, 0);
});

QUnit.test("initTestInfoViewWithInfoLevel1", function(assert) {
	let spec = {
		"appendTo" : this.fixture,
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		} ]
	};
	let info = CORA.info(spec);

	let button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	let infoView = info.getView();
	assert.equal(infoView.childNodes.length, 1);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView", "someText",
			assert);
});

QUnit.test("initTestInfoViewWithInfoLevel1TwoTexts", function(assert) {
	let spec = {
		"appendTo" : this.fixture,
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ]
	};
	let info = CORA.info(spec);

	let button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	let infoView = info.getView();
	assert.equal(infoView.childNodes.length, 2);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView", "someText",
			assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"someDefText", assert);
});

QUnit.test("initTestInfoViewAppendToTwoButtonClick", function(assert) {
	let spec = {
		"appendTo" : this.fixture
	};
	let info = CORA.info(spec);
	assert.strictEqual(this.fixture.childNodes.length, 0);

	let button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);
	CORATESTHELPER.simulateOnclick(button);

	assert.strictEqual(info.getInfoLevel(), CORA.info.ALL);

	let infoView = info.getView();
	let infoFromFixture = this.fixture.firstChild;
	assert.strictEqual(infoView, infoFromFixture);

	// base infoView
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	assert.equal(infoView.childNodes.length, 0);
});

QUnit.test("initTestInfoViewWithInfoLevel1TwoTexts", function(assert) {
	let spec = {
		"appendTo" : this.fixture,
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ],
		"level2" : [ {
			"className" : "metadataIdView",
			"text" : "someMetadataText"
		}, {
			"className" : "regExView",
			"text" : "someRegEx"
		} ]
	};
	let info = CORA.info(spec);

	let button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);
	CORATESTHELPER.simulateOnclick(button);

	let infoView = info.getView();
	assert.equal(infoView.childNodes.length, 4);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView", "someText",
			assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"someDefText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "metadataIdView",
			"someMetadataText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "regExView",
			"someRegEx", assert);
});

QUnit.test("initTestInfoViewAppendToThreeButtonClick", function(assert) {
	let spec = {
		"appendTo" : this.fixture
	};
	let info = CORA.info(spec);
	assert.strictEqual(this.fixture.childNodes.length, 0);

	let button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);
	CORATESTHELPER.simulateOnclick(button);
	CORATESTHELPER.simulateOnclick(button);

	assert.strictEqual(info.getInfoLevel(), CORA.info.NONE);

	let infoView = info.getView();
	let infoFromFixture = this.fixture.firstChild;
	assert.strictEqual(infoView, infoFromFixture);
});

QUnit.test("testOnclickIsNotPropagatedToParent", function(assert) {
	let clickedParent = false;
	let parent = document.createElement("SPAN");
	this.fixture.appendChild(parent);
	parent.onclick = function() {
		clickedParent = true;
	}
	let clicked = false;

	let spec = {
		appendTo : parent,
		level1 : [ {
			className : "textView",
			text : "someText",
			onclickMethod : function() {
				clicked=true;
			}
		} ]
	};
	let info = CORA.info(spec);

	let button = info.getButton();
	parent.appendChild(button);
	CORATESTHELPER.simulateOnclick(button);
	
	let firstInfoPart = info.getView().firstChild;
	CORATESTHELPER.simulateOnclick(firstInfoPart);

	assert.strictEqual(clicked, true);
	assert.strictEqual(clickedParent, false);
});