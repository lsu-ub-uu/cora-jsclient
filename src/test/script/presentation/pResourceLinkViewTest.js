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
QUnit.module("presentation/pResourceLinkViewTest.js", {
	beforeEach: function() {
		this.pParentMultipleChildrenViewFactory = CORATEST.standardParentFactorySpy("pParentMultipleChildrenViewSpy");
		this.dependencies = {
			"infoFactory": CORATEST.infoFactorySpy(),
			pParentMultipleChildrenViewFactory: this.pParentMultipleChildrenViewFactory
		};
		this.spec = {
			inputType: "input"
		};

		this.getPResourceLinkView = function() {
			if (this.pResourceLinkView === undefined) {
				this.pResourceLinkView = CORA.pResourceLinkView(this.dependencies, this.spec);
			}
			return this.pResourceLinkView;
		};
	}
});

QUnit.test("getType", function(assert) {
	let pResourceLinkView = this.getPResourceLinkView();
	assert.strictEqual(pResourceLinkView.type, "pResourceLinkView");
	assert.ok(this.pResourceLinkView);
});

QUnit.test("getSpec", function(assert) {
	let pResourceLinkView = this.getPResourceLinkView();
	assert.strictEqual(pResourceLinkView.getSpec(), this.spec);
});

QUnit.test("getDependencies", function(assert) {
	let pResourceLinkView = this.getPResourceLinkView();
	assert.strictEqual(pResourceLinkView.getDependencies(), this.dependencies);
});

QUnit.test("testParentStarted", function(assert) {
	this.getPResourceLinkView();
	
	let pParentVarViewSpec = this.pParentMultipleChildrenViewFactory.getSpec(0);
	assert.strictEqual(pParentVarViewSpec, this.spec);
	
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);

	assert.notEqual(child.createInputElementWithSetValueFunction, undefined);
	assert.notEqual(child.useStandardOutput, undefined);
	assert.notEqual(child.createOutputWithSetValueFunction, undefined);
});

QUnit.test("testMethodUsedFromPParentVarView", function(assert) {
	let pResourceLinkView = this.getPResourceLinkView();
	let pParentVarView = this.pParentMultipleChildrenViewFactory.getFactored(0);
	
	assert.strictEqual(pResourceLinkView.getView, pParentVarView.getView);
	assert.strictEqual(pResourceLinkView.setValue, pParentVarView.setValue);
	assert.strictEqual(pResourceLinkView.updateClassName, pParentVarView.updateClassName);
	assert.strictEqual(pResourceLinkView.setState, pParentVarView.setState);
	assert.strictEqual(pResourceLinkView.disable, pParentVarView.disable);
	assert.strictEqual(pResourceLinkView.addAttributesView, pParentVarView.addAttributesView);
	assert.strictEqual(pResourceLinkView.hide, pParentVarView.hide);
	assert.strictEqual(pResourceLinkView.show, pParentVarView.show);
});

QUnit.test("testGetBaseClassName", function(assert) {
	let pResourceLinkView = this.getPResourceLinkView();
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);
	
	assert.strictEqual(child.getBaseClassName(), "pResourceLink");
});

QUnit.test("createInputElementWithSetValueFunction", function(assert) {
	this.getPResourceLinkView();
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);
	
	let inputElement = child.createInputElementWithSetValueFunction();
	
	assert.strictEqual(inputElement.nodeName, "INPUT");
	assert.strictEqual(inputElement.type, "text");
	
	assert.strictEqual(inputElement.value, "");
	inputElement.setValue("trams");
	assert.strictEqual(inputElement.value, "trams");
});

QUnit.test("createInputElementWithSetValueFunctionTextArea", function(assert) {
	this.spec.inputType = "textarea";
	this.getPResourceLinkView();
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);
	
	let inputElement = child.createInputElementWithSetValueFunction();
	
	assert.strictEqual(inputElement.nodeName, "TEXTAREA");
	assert.strictEqual(inputElement.type, "textarea");
	
	assert.strictEqual(inputElement.value, "");
	inputElement.setValue("trams");
	assert.strictEqual(inputElement.value, "trams");
});

QUnit.test("createInputElementWithSetValueFunctionPassword", function(assert) {
	this.spec.inputFormat = "password";
	this.getPResourceLinkView();
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);
	
	let inputElement = child.createInputElementWithSetValueFunction();
	
	assert.strictEqual(inputElement.nodeName, "INPUT");
	assert.strictEqual(inputElement.type, "password");
	
	assert.strictEqual(inputElement.value, "");
	inputElement.setValue("trams");
	assert.strictEqual(inputElement.value, "trams");
});

QUnit.test("useStandardOutput", function(assert) {
	this.getPResourceLinkView();
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);
	
	assert.strictEqual(child.useStandardOutput(), true);
});

QUnit.test("useStandardOutputImageIsFalse", function(assert) {
	this.spec.outputFormat = "image";
	this.getPResourceLinkView();
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);
	
	assert.strictEqual(child.useStandardOutput(), false);
});

QUnit.test("useStandardOutputLinlIsFalse", function(assert) {
	this.spec.outputFormat = "link";
	this.getPResourceLinkView();
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);
	
	assert.strictEqual(child.useStandardOutput(), false);
});

QUnit.test("createOutputWithSetValueFunctionImage", function(assert) {
	this.spec.outputFormat = "image";
	this.getPResourceLinkView();
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);
	
	let inputElement = child.createOutputWithSetValueFunction();
	
	assert.strictEqual(inputElement.nodeName, "IMG");
	assert.strictEqual(inputElement.src, "");
	inputElement.setValue("http://localhost/trams");
	assert.strictEqual(inputElement.src, "http://localhost/trams");
});

QUnit.test("createOutputWithSetValueFunctionLink", function(assert) {
	this.spec.outputFormat = "link";
	this.getPResourceLinkView();
	const child = this.pParentMultipleChildrenViewFactory.getChild(0);
	
	let inputElement = child.createOutputWithSetValueFunction();
	
	assert.strictEqual(inputElement.nodeName, "A");
	assert.strictEqual(inputElement.href, "");
	assert.strictEqual(inputElement.text, "");
	inputElement.setValue("http://localhost/trams");
	assert.strictEqual(inputElement.href, "http://localhost/trams");
	assert.strictEqual(inputElement.text, "http://localhost/trams");
});
