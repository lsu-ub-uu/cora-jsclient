/*
 * Copyright 2018 Uppsala University Library
 * Copyright 2016, 2018 Olov McKie
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

		this.pNumVarView;
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
			return this.pNumVarView.getView().childNodes[0];
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var pNumVarView = this.getPNumVarView();
	assert.strictEqual(pNumVarView.type, "pNumVarView");
	assert.ok(this.pNumVarView);
});

QUnit.test("getSpec", function(assert) {
	var pNumVarView = this.getPNumVarView();
	assert.strictEqual(pNumVarView.getSpec(), this.spec);
});

QUnit.test("getDependencies", function(assert) {
	var pNumVarView = this.getPNumVarView();
	assert.strictEqual(pNumVarView.getDependencies(), this.dependencies);
});

QUnit.test("getView", function(assert) {
	var view = this.getView();
	assert.strictEqual(view.nodeName, "SPAN");
});

QUnit.test("testClassName", function(assert) {
	var view = this.getView();
	assert.strictEqual(view.className, "pNumVar somePresentationId");
});

QUnit.test("testInfoSpec", function(assert) {
	var expectedSpec = {
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
	var pNumVarView = this.getPNumVarView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	var usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.appendTo, this.getView());
	assert.strictEqual(usedSpec.afterLevelChange, pNumVarView.updateClassName);
	assert.strictEqual(usedSpec.level2[0].onclickMethod, this.textIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[1].onclickMethod, this.defTextIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[2].onclickMethod, undefined);

});
QUnit.test("testInfoButtonAddedToView", function(assert) {
	var view = this.getView();
	assert.strictEqual(view.childNodes[1].className, "infoButtonSpy");

});

QUnit.test("testInfoSpecNoTechnicalPart", function(assert) {
	this.spec.info.technicalInfo = null;
	var expectedSpec = {
		"appendTo" : {},
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ]
	};
	var pNumVarView = this.getPNumVarView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	var usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.appendTo, pNumVarView.getView());
});

QUnit.test("testActiveInfoShownInClassName", function(assert) {
	var pNumVarView = this.getPNumVarView();
	var view = this.getView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
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
	var pNumVarView = this.getPNumVarView();
	var view = this.getView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
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

QUnit.test("testInput", function(assert) {
	var valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "INPUT");
	assert.strictEqual(valueView.type, "text");
});

QUnit.test("testInputOnblur", function(assert) {
	var valueFromView = "";
	this.spec.onblurFunction = function(value) {
		valueFromView = value;
	};

	var pNumVarView = this.getPNumVarView();
	pNumVarView.setValue("a Value");
	var valueView = this.getValueView();
	CORATESTHELPER.simulateBlur(this.getValueView());
	assert.strictEqual(valueFromView, "a Value");
});
QUnit.test("testInputOnblurNotSet", function(assert) {
	var valueFromView = "";

	var pNumVarView = this.getPNumVarView();
	pNumVarView.setValue("a Value");
	var valueView = this.getValueView();
	CORATESTHELPER.simulateBlur(this.getValueView());
	assert.strictEqual(valueFromView, "");
});

QUnit.test("testInputOnkeyup", function(assert) {
	var valueFromView = "";
	this.spec.onkeyupFunction = function(value) {
		valueFromView = value;
	};

	var pNumVarView = this.getPNumVarView();
	pNumVarView.setValue("a Value");
	var valueView = this.getValueView();

	CORATESTHELPER.simulateKeyup(this.getValueView(), "a");

	assert.strictEqual(valueFromView, "a Value");
});

QUnit.test("testInputOnkeyupNotSet", function(assert) {
	var valueFromView = "";

	var pNumVarView = this.getPNumVarView();
	pNumVarView.setValue("a Value");
	var valueView = this.getValueView();

	CORATESTHELPER.simulateKeyup(this.getValueView(), "a");

	assert.strictEqual(valueFromView, "");
});

QUnit.test("testOutputText", function(assert) {
	this.spec.mode = "output";
	var valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "SPAN");
	assert.strictEqual(valueView.className,"value");
});

QUnit.test("testSetValueInput", function(assert) {
	var pNumVarView = this.getPNumVarView();
	var valueView = this.getValueView();

	assert.strictEqual(valueView.value, "");
	pNumVarView.setValue("a Value");
	assert.strictEqual(valueView.value, "a Value");
});

QUnit.test("testSetValueOutputText", function(assert) {
	this.spec.mode = "output";
	var pNumVarView = this.getPNumVarView();
	var valueView = this.getValueView();

	assert.strictEqual(valueView.innerHTML, "");
	pNumVarView.setValue("a Value");
	assert.strictEqual(valueView.innerHTML, "a Value");
});

QUnit.test("testDisableInput", function(assert) {
	var pNumVarView = this.getPNumVarView();
	var valueView = this.getValueView();

	assert.strictEqual(valueView.disabled, false);
	pNumVarView.disable();
	assert.strictEqual(valueView.disabled, true);
});

