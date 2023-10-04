/*
 * Copyright 2016, 2018, 2023 Olov McKie
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

QUnit.module("presentation/pParentVarViewTest.js", {
	beforeEach: function() {
		this.dependencies = {
			infoFactory: CORATEST.infoFactorySpy()
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
			label: "Some label text",
			id: "someId",
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

		this.getpParentVarView = function() {
			if (this.pParentVarView === undefined) {
				this.pParentVarView = CORA.pParentVarView(this.dependencies, this.spec, this.createChildSpy());
			}
			return this.pParentVarView;
		};
		this.getView = function() {
			return this.getpParentVarView().getView();
		};
		this.getValueView = function() {
			return this.getView().childNodes[1];
		};
		
		this.createChildSpy = function (){
			const createInputElementWithSetValueFunction = function(){
				const valueView = document.createElement("input");
				valueView.setValue = function(value) {
					valueView.value = value;
				};
				return valueView;
			};
			const useStandardOutput = function(){
				return true;
			};
			const createOutputWithSetValueFunction = function(){
				let outputNew = CORA.gui.createSpanWithClassName("from child spy");
				outputNew.setValue = function(value) {
					outputNew.textContent = value;
				};
			return outputNew;
			};
			return {
				createInputElementWithSetValueFunction: createInputElementWithSetValueFunction,
				useStandardOutput: useStandardOutput,
				createOutputWithSetValueFunction: createOutputWithSetValueFunction
			};
		};
	}
});

QUnit.test("init", function(assert) {
	let pParentVarView = this.getpParentVarView();
	assert.strictEqual(pParentVarView.type, "pParentVarView");
	assert.ok(this.pParentVarView);
});

QUnit.test("getSpec", function(assert) {
	let pParentVarView = this.getpParentVarView();
	assert.strictEqual(pParentVarView.getSpec(), this.spec);
});

QUnit.test("getDependencies", function(assert) {
	let pParentVarView = this.getpParentVarView();
	assert.strictEqual(pParentVarView.getDependencies(), this.dependencies);
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
	let pParentVarView = this.getpParentVarView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.appendTo, this.getView());
	assert.strictEqual(usedSpec.afterLevelChange, pParentVarView.updateClassName);
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
		appendTo: {},
		level1: [{
			className: "textView",
			text: "someText"
		}, {
			className: "defTextView",
			text: "someDefText"
		}]
	};
	let pParentVarView = this.getpParentVarView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.appendTo, pParentVarView.getView());
});

QUnit.test("testActiveInfoShownInClassName", function(assert) {
	let pParentVarView = this.getpParentVarView();
	let view = this.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pVar somePresentationId");
	infoSpy.setInfoLevel(0);
	pParentVarView.updateClassName();
	assert.strictEqual(view.className, "pVar somePresentationId");
	infoSpy.setInfoLevel(1);
	pParentVarView.updateClassName();
	assert.strictEqual(view.className, "pVar somePresentationId infoActive");
	infoSpy.setInfoLevel(0);
	pParentVarView.updateClassName();
	assert.strictEqual(view.className, "pVar somePresentationId");
});

QUnit.test("testStateShownInClassName", function(assert) {
	let pParentVarView = this.getpParentVarView();
	let view = this.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pVar somePresentationId");
	pParentVarView.setState("error");
	assert.strictEqual(view.className, "pVar somePresentationId error");
	pParentVarView.setState("errorStillFocused");
	assert.strictEqual(view.className, "pVar somePresentationId errorStillFocused");
	pParentVarView.setState("error");
	infoSpy.setInfoLevel(1);
	pParentVarView.updateClassName();
	assert.strictEqual(view.className, "pVar somePresentationId error infoActive");
	pParentVarView.setState("ok");
	assert.strictEqual(view.className, "pVar somePresentationId infoActive");
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

	let pParentVarView = this.getpParentVarView();
	pParentVarView.setValue("a Value");
	CORATESTHELPER.simulateBlur(this.getValueView());
	assert.strictEqual(valueFromView, "a Value");
});

QUnit.test("testInputOnblurNotSet", function(assert) {
	let valueFromView = "";

	let pParentVarView = this.getpParentVarView();
	pParentVarView.setValue("a Value");
	CORATESTHELPER.simulateBlur(this.getValueView());
	assert.strictEqual(valueFromView, "");
});

QUnit.test("testInputOnkeyup", function(assert) {
	let valueFromView = "";
	this.spec.onkeyupFunction = function(value) {
		valueFromView = value;
	};

	let pParentVarView = this.getpParentVarView();
	pParentVarView.setValue("a Value");

	CORATESTHELPER.simulateKeyup(this.getValueView(), "a");

	assert.strictEqual(valueFromView, "a Value");
});

QUnit.test("testInputOnkeyupNotSet", function(assert) {
	let valueFromView = "";

	let pParentVarView = this.getpParentVarView();
	pParentVarView.setValue("a Value");

	CORATESTHELPER.simulateKeyup(this.getValueView(), "a");

	assert.strictEqual(valueFromView, "");
});

QUnit.test("testOutputText", function(assert) {
	this.spec.mode = "output";
	let valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "SPAN");
	assert.strictEqual(valueView.className, "value");
});

QUnit.test("testOutputNotStandard", function(assert) {
	let child = this.createChildSpy();
	child.useStandardOutput = function(){
		return false;
	};
	this.spec.mode = "output";

	let pParentVarView = CORA.pParentVarView(this.dependencies, this.spec, child);

	let valueView = pParentVarView.getView().childNodes[1];
	assert.strictEqual(valueView.className, "from child spy");
});

QUnit.test("testSetValueInput", function(assert) {
	let pParentVarView = this.getpParentVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.value, "");
	pParentVarView.setValue("a Value");
	assert.strictEqual(valueView.value, "a Value");
});

QUnit.test("testSetValueOutputText", function(assert) {
	this.spec.mode = "output";
	let pParentVarView = this.getpParentVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.innerHTML, "");
	pParentVarView.setValue("a Value");
	assert.strictEqual(valueView.innerHTML, "a Value");
});

QUnit.test("testDisableInput", function(assert) {
	let pParentVarView = this.getpParentVarView();
	let valueView = this.getValueView();

	assert.strictEqual(valueView.disabled, false);
	pParentVarView.disable();
	assert.strictEqual(valueView.disabled, true);
});

QUnit.test("testAddAttributesView", function(assert) {
	let pParentVarView = this.getpParentVarView();
	let fakeView = document.createElement("span");
	fakeView.appendChild(document.createTextNode("fake view"));

	pParentVarView.addAttributesView(fakeView);
	assert.strictEqual(pParentVarView.getView().childNodes[1], fakeView);
});

QUnit.test("testHideShow", function(assert) {
	let pParentVarView = this.getpParentVarView();
	let view = pParentVarView.getView();
	
	assert.strictEqual(view.style.display, "");
	
	pParentVarView.hide();
	
	assert.strictEqual(view.style.display, "none");
	
	pParentVarView.show();
	
	assert.strictEqual(view.style.display, "");
});

QUnit.test("testHideShowWithDisplaySetFromStart", function(assert) {
	let pParentVarView = this.getpParentVarView();
	let view = pParentVarView.getView();
	view.style.display = "flex";
	
	
	assert.strictEqual(view.style.display, "flex");
	
	pParentVarView.hide();
	
	assert.strictEqual(view.style.display, "none");
	
	pParentVarView.show();
	
	assert.strictEqual(view.style.display, "flex");
});
