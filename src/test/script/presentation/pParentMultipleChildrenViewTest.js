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
QUnit.module("presentation/pParentMultipleChildrenViewTest.js", {
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
			presentationId: "somePresentationId",
			className: "someClassName",
			headline: "Some headline text",
			headlineLevel: "h2",
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

		this.getpParentMultipleChildrenView = function() {
			if (this.pParentMultipleChildrenView === undefined) {
				this.pParentMultipleChildrenView = CORA.pParentMultipleChildrenView(this.dependencies, this.spec, this.createChildSpy());
			}
			return this.pParentMultipleChildrenView;
		};
		this.getView = function() {
			return this.getpParentMultipleChildrenView().getView();
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
			const getBaseClassName = function(){
				return "fakeBaseClassName";
			}
			return {
				createInputElementWithSetValueFunction: createInputElementWithSetValueFunction,
				useStandardOutput: useStandardOutput,
				createOutputWithSetValueFunction: createOutputWithSetValueFunction,
				getBaseClassName: getBaseClassName
			};
		};
	}
});

QUnit.test("init", function(assert) {
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	assert.strictEqual(pParentMultipleChildrenView.type, "pParentMultipleChildrenView");
	assert.ok(this.pParentMultipleChildrenView);
});

QUnit.test("getSpec", function(assert) {
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	assert.strictEqual(pParentMultipleChildrenView.getSpec(), this.spec);
});

QUnit.test("getDependencies", function(assert) {
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	assert.strictEqual(pParentMultipleChildrenView.getDependencies(), this.dependencies);
});

QUnit.test("getView", function(assert) {
	let view = this.getView();
	assert.strictEqual(view.nodeName, "DIV");
});

QUnit.test("testClassName", function(assert) {
	let view = this.getView();
	assert.strictEqual(view.className, "someClassName");
});

QUnit.test("testInfoSpec", function(assert) {
	let expectedSpec = {
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
		}],
		insertAfter: {}
	};
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.insertAfter, pParentMultipleChildrenView.getView().childNodes[0]);
	assert.strictEqual(usedSpec.afterLevelChange, pParentMultipleChildrenView.updateClassName);
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
//		appendTo: {},
		level1: [{
			className: "textView",
			text: "someText"
		}, {
			className: "defTextView",
			text: "someDefText"
		}],
		insertAfter: {}
	};
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.insertAfter, pParentMultipleChildrenView.getView().childNodes[0]);
	
});

QUnit.test("testActiveInfoShownInClassName", function(assert) {
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	let view = this.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "someClassName");
	infoSpy.setInfoLevel(0);
	pParentMultipleChildrenView.updateClassName();
	assert.strictEqual(view.className, "someClassName");
	infoSpy.setInfoLevel(1);
	pParentMultipleChildrenView.updateClassName();
	assert.strictEqual(view.className, "someClassName infoActive");
	infoSpy.setInfoLevel(0);
	pParentMultipleChildrenView.updateClassName();
	assert.strictEqual(view.className, "someClassName");
});

QUnit.test("testStateShownInClassName", function(assert) {
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	let view = this.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "someClassName");
	pParentMultipleChildrenView.setState("error");
	assert.strictEqual(view.className, "someClassName error");
	pParentMultipleChildrenView.setState("errorStillFocused");
	assert.strictEqual(view.className, "someClassName errorStillFocused");
	pParentMultipleChildrenView.setState("error");
	infoSpy.setInfoLevel(1);
	pParentMultipleChildrenView.updateClassName();
	assert.strictEqual(view.className, "someClassName error infoActive");
	pParentMultipleChildrenView.setState("ok");
	assert.strictEqual(view.className, "someClassName infoActive");
});

QUnit.test("testHeadlineInOutput", function(assert) {
	this.spec.mode = "output";
	let headline = this.getView().childNodes[0];
	assert.strictEqual(headline.nodeName, "H2");
	assert.strictEqual(headline.textContent, "Some headline text");
	assert.strictEqual(this.getView().childNodes.length, 2);
});

QUnit.test("testHeadlineInOutputNoClassName", function(assert) {
	this.spec.mode = "output";
	this.spec.headline = "Different headline";
	this.spec.headlineLevel = undefined;

	let headline = this.getView().childNodes[0];

	assert.strictEqual(headline.nodeName, "H2");
	assert.strictEqual(headline.textContent, "Different headline");
});

QUnit.test("testHeadlineInOutputOtherClassName", function(assert) {
	this.spec.mode = "output";
	this.spec.headline = "Different headline";
	this.spec.headlineLevel = "h4";
	let headline = this.getView().childNodes[0];
	assert.strictEqual(headline.nodeName, "H4");
	assert.strictEqual(headline.textContent, "Different headline");
});

QUnit.test("testNoHeadline", function(assert) {
	this.spec.headline = undefined;
	assert.strictEqual(this.getView().childNodes.length, 1);
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.ok(usedSpec.insertAfter);
	assert.strictEqual(usedSpec.insertAfter, infoSpy.getButton());
});

QUnit.test("testAddAttributesView", function(assert) {
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	let fakeView = document.createElement("span");
	fakeView.appendChild(document.createTextNode("fake view"));

	pParentMultipleChildrenView.addAttributesView(fakeView);
	assert.strictEqual(pParentMultipleChildrenView.getView().childNodes[2], fakeView);
});

QUnit.test("testHideShow", function(assert) {
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	let view = pParentMultipleChildrenView.getView();
	
	assert.strictEqual(view.style.display, "");
	
	pParentMultipleChildrenView.hide();
	
	assert.strictEqual(view.style.display, "none");
	
	pParentMultipleChildrenView.show();
	
	assert.strictEqual(view.style.display, "");
});

QUnit.test("testHideShowWithDisplaySetFromStart", function(assert) {
	let pParentMultipleChildrenView = this.getpParentMultipleChildrenView();
	let view = pParentMultipleChildrenView.getView();
	view.style.display = "flex";
	
	
	assert.strictEqual(view.style.display, "flex");
	
	pParentMultipleChildrenView.hide();
	
	assert.strictEqual(view.style.display, "none");
	
	pParentMultipleChildrenView.show();
	
	assert.strictEqual(view.style.display, "flex");
});
