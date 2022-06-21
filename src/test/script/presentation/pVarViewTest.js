/*
 * Copyright 2016, 2018 Olov McKie
 * Copyright 2018 , 2019, 2020 Uppsala University Library
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

QUnit.module("presentation/pVarViewTest.js", {
	beforeEach: function() {
		this.dependencies = {
			"infoFactory": CORATEST.infoFactorySpy()
		};
		this.textIdOnclickMethod = {};
		this.defTextIdOnclickMethod = {
			tramas: "trams"
		};
		this.spec = {
			mode: "input",
			inputType: "input",
			outputFormat: "text",
			presentationId: "somePresentationId",
			info: {
				text: "someText",
				defText: "someDefText",
				technicalInfo: [{
					text: "textId: " + "textId",
					onclickMethod: this.textIdOnclickMethod
				}, {
					text: "defTextId: " + "defTextId",
					onclickMethod: this.defTextIdOnclickMethod
				}, {
					text: "metadataId: " + "metadataId"
				}]
			}
		};

		this.getPVarView = function() {
			if (this.pVarView === undefined) {
				this.pVarView = CORA.pVarView(this.dependencies, this.spec);
			}
			return this.pVarView;
		};
		this.getView = function() {
			if (this.pVarView === undefined) {
				this.pVarView = CORA.pVarView(this.dependencies, this.spec);
			}
			return this.pVarView.getView();
		};
		this.getValueView = function() {
			if (this.pVarView === undefined) {
				this.pVarView = CORA.pVarView(this.dependencies, this.spec);
			}
			return this.pVarView.getView().childNodes[0];
		};
	}
});

QUnit.test("init", function(assert) {
	let pVarView = this.getPVarView();
	assert.strictEqual(pVarView.type, "pVarView");
	assert.ok(this.pVarView);
});

QUnit.test("getSpec", function(assert) {
	let pVarView = this.getPVarView();
	assert.strictEqual(pVarView.getSpec(), this.spec);
});

QUnit.test("getDependencies", function(assert) {
	let pVarView = this.getPVarView();
	assert.strictEqual(pVarView.getDependencies(), this.dependencies);
});

QUnit.test("getView", function(assert) {
	let view = this.getView();
	assert.strictEqual(view.nodeName, "SPAN");
});

QUnit.test("testClassName", function(assert) {
	let view = this.getView();
	assert.strictEqual(view.className, "pVar somePresentationId");
});

QUnit.test("testInfoSpec", function(assert) {
	let expectedSpec = {
		appendTo: {},
		level1: [{
			className: "textView",
			text: "someText"
		}, {
			className: "defTextView",
			text: "someDefText"
		}],
		level2: [{
			className: "technicalView",
			text: "textId: textId",
			onclickMethod: this.textIdOnclickMethod
		}, {
			className: "technicalView",
			text: "defTextId: defTextId",
			onclickMethod: this.defTextIdOnclickMethod
		}, {
			className: "technicalView",
			text: "metadataId: metadataId"
		}]
	};
	let pVarView = this.getPVarView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.appendTo, this.getView());
	assert.strictEqual(usedSpec.afterLevelChange, pVarView.updateClassName);
	assert.strictEqual(usedSpec.level2[0].onclickMethod, this.textIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[1].onclickMethod, this.defTextIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[2].onclickMethod, undefined);

});
QUnit.test("testInfoButtonAddedToView", function(assert) {
	let view = this.getView();
	assert.strictEqual(view.childNodes[1].className, "infoButtonSpy");

});

QUnit.test("testInfoSpecNoTechnicalPart", function(assert) {
	this.spec.info.technicalInfo = null;
	let expectedSpec = {
		appendTo: {},
		level1: [{
			className: "textView",
			text: "someText"
		}, {
			className: "defTextView",
			text: "someDefText"
		}]
	};
	let pVarView = this.getPVarView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.appendTo, pVarView.getView());
});

QUnit.test("testActiveInfoShownInClassName", function(assert) {
	let pVarView = this.getPVarView();
	let view = this.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pVar somePresentationId");
	infoSpy.setInfoLevel(0);
	pVarView.updateClassName();
	assert.strictEqual(view.className, "pVar somePresentationId");
	infoSpy.setInfoLevel(1);
	pVarView.updateClassName();
	assert.strictEqual(view.className, "pVar somePresentationId infoActive");
	infoSpy.setInfoLevel(0);
	pVarView.updateClassName();
	assert.strictEqual(view.className, "pVar somePresentationId");
});

QUnit.test("testStateShownInClassName", function(assert) {
	let pVarView = this.getPVarView();
	let view = this.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pVar somePresentationId");
	pVarView.setState("error");
	assert.strictEqual(view.className, "pVar somePresentationId error");
	pVarView.setState("errorStillFocused");
	assert.strictEqual(view.className, "pVar somePresentationId errorStillFocused");
	pVarView.setState("error");
	infoSpy.setInfoLevel(1);
	pVarView.updateClassName();
	assert.strictEqual(view.className, "pVar somePresentationId error infoActive");
	pVarView.setState("ok");
	assert.strictEqual(view.className, "pVar somePresentationId infoActive");
});

QUnit.test("testInput", function(assert) {
	let valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "INPUT");
	assert.strictEqual(valueView.type, "text");
});

QUnit.test("testInputUnknownTypeIsText", function(assert) {
	this.spec.inputType = undefined;
	let valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "INPUT");
	assert.strictEqual(valueView.type, "text");
});

QUnit.test("testInputTypeTextArea", function(assert) {
	this.spec.inputType = "textarea";
	let valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "TEXTAREA");
	assert.strictEqual(valueView.type, "textarea");
});

QUnit.test("testInputFormatPassword", function(assert) {
	this.spec.inputType = "input";
	this.spec.inputFormat = "password";

	let valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "INPUT");
	assert.strictEqual(valueView.type, "password");
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

	let pVarView = this.getPVarView();
	pVarView.setValue("a Value");
	CORATESTHELPER.simulateBlur(this.getValueView());
	assert.strictEqual(valueFromView, "a Value");
});
QUnit.test("testInputOnblurNotSet", function(assert) {
	let valueFromView = "";

	let pVarView = this.getPVarView();
	pVarView.setValue("a Value");
	CORATESTHELPER.simulateBlur(this.getValueView());
	assert.strictEqual(valueFromView, "");
});

QUnit.test("testInputOnkeyup", function(assert) {
	let valueFromView = "";
	this.spec.onkeyupFunction = function(value) {
		valueFromView = value;
	};

	let pVarView = this.getPVarView();
	pVarView.setValue("a Value");

	CORATESTHELPER.simulateKeyup(this.getValueView(), "a");

	assert.strictEqual(valueFromView, "a Value");
});

QUnit.test("testInputOnkeyupNotSet", function(assert) {
	let valueFromView = "";

	let pVarView = this.getPVarView();
	pVarView.setValue("a Value");

	CORATESTHELPER.simulateKeyup(this.getValueView(), "a");

	assert.strictEqual(valueFromView, "");
});

QUnit.test("testOutputText", function(assert) {
	this.spec.mode = "output";
	let valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "SPAN");
	assert.strictEqual(valueView.className, "value");
});

QUnit.test("testOutputImage", function(assert) {
	this.spec.mode = "output";
	this.spec.outputFormat = "image";
	let valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "IMG");
});

QUnit.test("testSetValueInput", function(assert) {
	let pVarView = this.getPVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.value, "");
	pVarView.setValue("a Value");
	assert.strictEqual(valueView.value, "a Value");
});

QUnit.test("testSetValueOutputText", function(assert) {
	this.spec.mode = "output";
	let pVarView = this.getPVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.innerHTML, "");
	pVarView.setValue("a Value");
	assert.strictEqual(valueView.innerHTML, "a Value");
});

QUnit.test("testSetValueOutputImage", function(assert) {
	this.spec.mode = "output";
	this.spec.outputFormat = "image";
	let pVarView = this.getPVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.src, "");
	pVarView.setValue("http://www.some.domain.nu/image01.jpg");
	assert.strictEqual(valueView.src, "http://www.some.domain.nu/image01.jpg");
});

QUnit.test("testOutputLink", function(assert) {
	this.spec.mode = "output";
	this.spec.outputFormat = "link";
	let valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "A");
});

QUnit.test("testSetValueOutputLink", function(assert) {
	this.spec.mode = "output";
	this.spec.outputFormat = "link";
	let pVarView = this.getPVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.href, "");
	pVarView.setValue("http://www.some.domain.nu");
	assert.strictEqual(valueView.href, "http://www.some.domain.nu/");
	assert.strictEqual(valueView.text, "http://www.some.domain.nu");
});

QUnit.test("testDisableInput", function(assert) {
	let pVarView = this.getPVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.disabled, false);
	pVarView.disable();
	assert.strictEqual(valueView.disabled, true);
});

QUnit.test("testAddAttributesView", function(assert) {
	let pVarView = this.getPVarView();
	let fakeView = document.createElement("span");
	fakeView.appendChild(document.createTextNode("fake view"));

	pVarView.addAttributesView(fakeView);
	assert.strictEqual(pVarView.getView().firstChild, fakeView);

});