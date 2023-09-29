/*
 * Copyright 2018, 2020 Uppsala University Library
 * Copyright 2016, 2018, 2023 Olov McKie
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

QUnit.module("presentation/pNumVarViewTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"infoFactory" : CORATEST.infoFactorySpy()
		};
		this.textIdOnclickMethod = {};
		this.defTextIdOnclickMethod = {
			"tramas" : "trams"
		};
		this.spec = {
			"mode" : "input",
			"presentationId" : "somePresentationId",
			label: "Some label text",
			id: "someId",
			"info" : {
				"text" : "someText",
				"defText" : "someDefText",
				"technicalInfo" : [ {
					"text" : "textId: " + "textId",
					"onclickMethod" : this.textIdOnclickMethod
				}, {
					"text" : "defTextId: " + "defTextId",
					"onclickMethod" : this.defTextIdOnclickMethod
				}, {
					"text" : "metadataId: " + "metadataId"
				} ]
			}
		};

		this.getPNumVarView = function() {
			if (this.pNumVarView === undefined) {
				this.pNumVarView = CORA.pNumVarView(this.dependencies, this.spec);
			}
			return this.pNumVarView;
		};
		this.getView = function() {
			if (this.pNumVarView === undefined) {
				this.pNumVarView = CORA.pNumVarView(this.dependencies, this.spec);
			}
			return this.pNumVarView.getView();
		};
		this.getValueView = function() {
			if (this.pNumVarView === undefined) {
				this.pNumVarView = CORA.pNumVarView(this.dependencies, this.spec);
			}
			return this.pNumVarView.getView().childNodes[1];
		};
	}
});

QUnit.test("init", function(assert) {
	let pNumVarView = this.getPNumVarView();
	assert.strictEqual(pNumVarView.type, "pNumVarView");
	assert.ok(this.pNumVarView);
});

QUnit.test("getSpec", function(assert) {
	let pNumVarView = this.getPNumVarView();
	assert.strictEqual(pNumVarView.getSpec(), this.spec);
});

QUnit.test("getDependencies", function(assert) {
	let pNumVarView = this.getPNumVarView();
	assert.strictEqual(pNumVarView.getDependencies(), this.dependencies);
});

QUnit.test("getView", function(assert) {
	let view = this.getView();
	assert.strictEqual(view.nodeName, "SPAN");
});

QUnit.test("testClassName", function(assert) {
	let view = this.getView();
	assert.strictEqual(view.className, "pNumVar somePresentationId");
});

QUnit.test("testInfoSpec", function(assert) {
	let expectedSpec = {
		"appendTo" : {},
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ],
		"level2" : [ {
			"className" : "technicalView",
			"text" : "textId: textId",
			"onclickMethod" : this.textIdOnclickMethod
		}, {
			"className" : "technicalView",
			"text" : "defTextId: defTextId",
			"onclickMethod" : this.defTextIdOnclickMethod
		}, {
			"className" : "technicalView",
			"text" : "metadataId: metadataId"
		} ]
	};
	let pNumVarView = this.getPNumVarView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.appendTo, this.getView());
	assert.strictEqual(usedSpec.afterLevelChange, pNumVarView.updateClassName);
	assert.strictEqual(usedSpec.level2[0].onclickMethod, this.textIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[1].onclickMethod, this.defTextIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[2].onclickMethod, undefined);

});
QUnit.test("testInfoButtonAddedToView", function(assert) {
	let view = this.getView();
	assert.strictEqual(view.childNodes[2].className, "infoButtonSpy");

});

QUnit.test("testInfoSpecNoTechnicalPart", function(assert) {
	this.spec.info.technicalInfo = null;
	let expectedSpec = {
		"appendTo" : {},
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ]
	};
	let pNumVarView = this.getPNumVarView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.appendTo, pNumVarView.getView());
});

QUnit.test("testActiveInfoShownInClassName", function(assert) {
	let pNumVarView = this.getPNumVarView();
	let view = this.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pNumVar somePresentationId");
	infoSpy.setInfoLevel(0);
	pNumVarView.updateClassName();
	assert.strictEqual(view.className, "pNumVar somePresentationId");
	infoSpy.setInfoLevel(1);
	pNumVarView.updateClassName();
	assert.strictEqual(view.className, "pNumVar somePresentationId infoActive");
	infoSpy.setInfoLevel(0);
	pNumVarView.updateClassName();
	assert.strictEqual(view.className, "pNumVar somePresentationId");
});

QUnit.test("testStateShownInClassName", function(assert) {
	let pNumVarView = this.getPNumVarView();
	let view = this.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pNumVar somePresentationId");
	pNumVarView.setState("error");
	assert.strictEqual(view.className, "pNumVar somePresentationId error");
	pNumVarView.setState("errorStillFocused");
	assert.strictEqual(view.className, "pNumVar somePresentationId errorStillFocused");
	pNumVarView.setState("error");
	infoSpy.setInfoLevel(1);
	pNumVarView.updateClassName();
	assert.strictEqual(view.className, "pNumVar somePresentationId error infoActive");
	pNumVarView.setState("ok");
	assert.strictEqual(view.className, "pNumVar somePresentationId infoActive");
});

QUnit.test("testLabelInInput", function(assert) {
	let label = this.getView().childNodes[0];
	assert.strictEqual(label.nodeName, "LABEL");
	assert.strictEqual(label.textContent, "Some label text");
	assert.strictEqual(label.htmlFor, "someId");
	assert.strictEqual(this.getView().childNodes.length, 3);
});

QUnit.test("testLabelInOutput", function(assert) {
	this.spec.mode = "output";
	let label = this.getView().childNodes[0];
	assert.strictEqual(label.nodeName, "SPAN");
	assert.strictEqual(label.className, "label");
	assert.strictEqual(label.textContent, "Some label text");
	assert.strictEqual(this.getView().childNodes.length, 3);
});

QUnit.test("testNoLabel", function(assert) {
	this.spec.label = undefined;
	assert.strictEqual(this.getView().childNodes.length, 2);
});

QUnit.test("testInput", function(assert) {
	let valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "INPUT");
	assert.strictEqual(valueView.type, "text");
	assert.strictEqual(valueView.placeholder, "");
	assert.strictEqual(valueView.id, "someId");
});

QUnit.test("testInputPlaceholder", function(assert) {
	this.spec.placeholderText = "placeholderText";
	let valueView = this.getValueView();
	assert.strictEqual(valueView.placeholder, "placeholderText");
});

QUnit.test("testInputOnblur", function(assert) {
	let valueFromView = "";
	this.spec.onblurFunction = function(value) {
		valueFromView = value;
	};

	let pNumVarView = this.getPNumVarView();
	pNumVarView.setValue("a Value");
	CORATESTHELPER.simulateBlur(this.getValueView());
	assert.strictEqual(valueFromView, "a Value");
});
QUnit.test("testInputOnblurNotSet", function(assert) {
	let valueFromView = "";

	let pNumVarView = this.getPNumVarView();
	pNumVarView.setValue("a Value");
	CORATESTHELPER.simulateBlur(this.getValueView());
	assert.strictEqual(valueFromView, "");
});

QUnit.test("testInputOnkeyup", function(assert) {
	let valueFromView = "";
	this.spec.onkeyupFunction = function(value) {
		valueFromView = value;
	};

	let pNumVarView = this.getPNumVarView();
	pNumVarView.setValue("a Value");

	CORATESTHELPER.simulateKeyup(this.getValueView(), "a");

	assert.strictEqual(valueFromView, "a Value");
});

QUnit.test("testInputOnkeyupNotSet", function(assert) {
	let valueFromView = "";

	let pNumVarView = this.getPNumVarView();
	pNumVarView.setValue("a Value");

	CORATESTHELPER.simulateKeyup(this.getValueView(), "a");

	assert.strictEqual(valueFromView, "");
});

QUnit.test("testOutputText", function(assert) {
	this.spec.mode = "output";
	let valueView = this.getValueView(); 
	assert.strictEqual(valueView.nodeName, "SPAN");
	assert.strictEqual(valueView.className,"value");
});

QUnit.test("testSetValueInput", function(assert) {
	let pNumVarView = this.getPNumVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.value, "");
	pNumVarView.setValue("a Value");
	assert.strictEqual(valueView.value, "a Value");
});

QUnit.test("testSetValueOutputText", function(assert) {
	this.spec.mode = "output";
	let pNumVarView = this.getPNumVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.innerHTML, "");
	pNumVarView.setValue("a Value");
	assert.strictEqual(valueView.innerHTML, "a Value");
});

QUnit.test("testDisableInput", function(assert) {
	let pNumVarView = this.getPNumVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.disabled, false);
	pNumVarView.disable();
	assert.strictEqual(valueView.disabled, true);
});

QUnit.test("testAddAttributesView", function(assert) {
	let pNumVarView = this.getPNumVarView();
	let fakeView = document.createElement("span");
	fakeView.appendChild(document.createTextNode("fake view"));

	pNumVarView.addAttributesView(fakeView);
	assert.strictEqual(pNumVarView.getView().firstChild, fakeView);
});