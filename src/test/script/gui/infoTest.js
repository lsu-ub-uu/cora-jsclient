/*
 * Copyright 2016, 2017 Olov McKie
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
	var spec = {};
	var info = CORA.info(spec);
	assert.strictEqual(info.type, "info");
});

QUnit.test("initTestGetSpec", function(assert) {
	var spec = {};
	var info = CORA.info(spec);
	assert.strictEqual(info.getSpec(), spec);
});

QUnit.test("initTestInitialState", function(assert) {
	var spec = {};
	var info = CORA.info(spec);
	assert.strictEqual(info.getInfoLevel(), CORA.info.NONE);
});

QUnit.test("initTestInfoButton", function(assert) {
	var spec = {};
	var info = CORA.info(spec);
	var infoButton = info.getButton();
	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "iconButton infoButton");
});

QUnit.test("initTestOneButtonClickafterLevelChangeCall", function(assert) {
	var wasCalled = false;
	function someFunction() {
		wasCalled = true;
	}
	var spec = {
		"afterLevelChange" : someFunction,
		"appendTo" : this.fixture

	};
	var info = CORA.info(spec);
	assert.strictEqual(this.fixture.childNodes.length, 0);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	assert.ok(wasCalled);
});

QUnit.test("initTestInfoViewAppendToOneButtonClick", function(assert) {
	var spec = {
		"appendTo" : this.fixture
	};
	var info = CORA.info(spec);
	assert.strictEqual(this.fixture.childNodes.length, 0);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	assert.strictEqual(info.getInfoLevel(), CORA.info.TEXT);

	var infoView = info.getView();
	var infoFromFixture = this.fixture.firstChild;
	assert.strictEqual(infoView, infoFromFixture);

	// base infoView
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	assert.equal(infoView.childNodes.length, 0);
});

QUnit.test("initTestInfoViewInsertAfterOneButtonClick", function(assert) {
	var fixture = this.fixture;
	var child1 = document.createElement("span");
	fixture.appendChild(child1);
	var child2 = document.createElement("span");
	fixture.appendChild(child2);

	var spec = {
		"insertAfter" : child1
	};
	var info = CORA.info(spec);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	var infoView = info.getView();
	var infoFromFixture = this.fixture.childNodes[1];
	assert.strictEqual(infoView, infoFromFixture);

	// base infoView
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	assert.equal(infoView.childNodes.length, 0);
});

QUnit.test("initTestInfoViewInsertBeforeOneButtonClick", function(assert) {
	var fixture = this.fixture;
	var child1 = document.createElement("span");
	fixture.appendChild(child1);
	var child2 = document.createElement("span");
	fixture.appendChild(child2);

	var spec = {
		"insertBefore" : child2
	};
	var info = CORA.info(spec);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	var infoView = info.getView();
	var infoFromFixture = this.fixture.childNodes[1];
	assert.strictEqual(infoView, infoFromFixture);

	// base infoView
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	assert.equal(infoView.childNodes.length, 0);
});

QUnit.test("initTestInfoViewWithInfoLevel1", function(assert) {
	var spec = {
		"appendTo" : this.fixture,
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		} ]
	};
	var info = CORA.info(spec);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	var infoView = info.getView();
	assert.equal(infoView.childNodes.length, 1);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView", "someText",
			assert);
});

QUnit.test("initTestInfoViewWithInfoLevel1TwoTexts", function(assert) {
	var spec = {
		"appendTo" : this.fixture,
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ]
	};
	var info = CORA.info(spec);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	var infoView = info.getView();
	assert.equal(infoView.childNodes.length, 2);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView", "someText",
			assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"someDefText", assert);
});

QUnit.test("initTestInfoViewAppendToTwoButtonClick", function(assert) {
	var spec = {
		"appendTo" : this.fixture
	};
	var info = CORA.info(spec);
	assert.strictEqual(this.fixture.childNodes.length, 0);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);
	CORATESTHELPER.simulateOnclick(button);

	assert.strictEqual(info.getInfoLevel(), CORA.info.ALL);

	var infoView = info.getView();
	var infoFromFixture = this.fixture.firstChild;
	assert.strictEqual(infoView, infoFromFixture);

	// base infoView
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	assert.equal(infoView.childNodes.length, 0);
});

QUnit.test("initTestInfoViewWithInfoLevel1TwoTexts", function(assert) {
	var spec = {
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
	var info = CORA.info(spec);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);
	CORATESTHELPER.simulateOnclick(button);

	var infoView = info.getView();
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
	var spec = {
		"appendTo" : this.fixture
	};
	var info = CORA.info(spec);
	assert.strictEqual(this.fixture.childNodes.length, 0);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);
	CORATESTHELPER.simulateOnclick(button);
	CORATESTHELPER.simulateOnclick(button);

	assert.strictEqual(info.getInfoLevel(), CORA.info.NONE);

	var infoView = info.getView();
	var infoFromFixture = this.fixture.firstChild;
	assert.strictEqual(infoView, infoFromFixture);
});

QUnit.test("initOnclickOnInfoPart", function(assert) {
	var spec = {
		"appendTo" : this.fixture,
		"level1" : [ {
			"className" : "textView",
			"text" : "someText",
			"onclickMethod" : function() {
			}
		} ]
	};
	var info = CORA.info(spec);

	var button = info.getButton();
	CORATESTHELPER.simulateOnclick(button);

	var firstInfoPart = info.getView().firstChild;
	assert.equal(firstInfoPart.onclick, spec.level1[0].onclickMethod);
	assert.equal(firstInfoPart.className, "textView clickable");
});