/*
 * Copyright 2023 Olov McKie
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
QUnit.module("presentation/pCollectionVarViewTest.js", {
	beforeEach: function() {
		this.pParentVarViewFactory = CORATEST.standardParentFactorySpy("pParentVarViewSpy");
		this.dependencies = {
			"infoFactory": CORATEST.infoFactorySpy(),
			pParentVarViewFactory: this.pParentVarViewFactory
		};
		this.spec = {
			options: [
				["empty", ""],
				["text1", "value1"],
				["text2", "value2"]
			]
		};

		this.getpCollectionVarView = function() {
			if (this.pCollectionVarView === undefined) {
				this.pCollectionVarView = CORA.pCollectionVarView(this.dependencies, this.spec);
			}
			return this.pCollectionVarView;
		};
	}
});

QUnit.test("getType", function(assert) {
	let pCollectionVarView = this.getpCollectionVarView();
	assert.strictEqual(pCollectionVarView.type, "pCollectionVarView");
	assert.ok(this.pCollectionVarView);
});

QUnit.test("getSpec", function(assert) {
	let pCollectionVarView = this.getpCollectionVarView();
	assert.strictEqual(pCollectionVarView.getSpec(), this.spec);
});

QUnit.test("getDependencies", function(assert) {
	let pCollectionVarView = this.getpCollectionVarView();
	assert.strictEqual(pCollectionVarView.getDependencies(), this.dependencies);
});

QUnit.test("testParentStarted", function(assert) {
	this.getpCollectionVarView();
	
	let pParentVarViewSpec = this.pParentVarViewFactory.getSpec(0);
	assert.strictEqual(pParentVarViewSpec, this.spec);
	
	const child = this.pParentVarViewFactory.getChild(0);

	assert.notEqual(child.createInputElementWithSetValueFunction, undefined);
	assert.notEqual(child.useStandardOutput, undefined);
});

QUnit.test("testMethodUsedFromPParentVarView", function(assert) {
	let pCollectionVarView = this.getpCollectionVarView();
	let pParentVarView = this.pParentVarViewFactory.getFactored(0);
	
	assert.strictEqual(pCollectionVarView.getView, pParentVarView.getView);
	assert.strictEqual(pCollectionVarView.setValue, pParentVarView.setValue);
	assert.strictEqual(pCollectionVarView.updateClassName, pParentVarView.updateClassName);
	assert.strictEqual(pCollectionVarView.setState, pParentVarView.setState);
	assert.strictEqual(pCollectionVarView.disable, pParentVarView.disable);
	assert.strictEqual(pCollectionVarView.addAttributesView, pParentVarView.addAttributesView);
	assert.strictEqual(pCollectionVarView.hide, pParentVarView.hide);
	assert.strictEqual(pCollectionVarView.show, pParentVarView.show);
});

QUnit.test("createInputElementWithSetValueFunction", function(assert) {
	this.getpCollectionVarView();
	const child = this.pParentVarViewFactory.getChild(0);
	
	let inputElement = child.createInputElementWithSetValueFunction();
	
	assert.strictEqual(inputElement.nodeName, "SELECT");
	assert.strictEqual(inputElement.type, "select-one");
	
	let options = inputElement.options;
	assert.strictEqual(options.length, 3);
	
	assert.strictEqual(inputElement.value, "");
	inputElement.setValue("value1");
	assert.strictEqual(inputElement.value, "value1");
});

QUnit.test("createInputElementOptionsCreatedAsExpected", function(assert) {
	this.getpCollectionVarView();
	const child = this.pParentVarViewFactory.getChild(0);
	
	let inputElement = child.createInputElementWithSetValueFunction();
	
	let options = inputElement.options;
	assert.strictEqual(options.length, 3);
	assert.strictEqual(options[0].nodeName, "OPTION");
	assert.strictEqual(options[0].text, "empty");
	assert.strictEqual(options[0].value, "");
	assert.strictEqual(options[0].selected, true);
	assert.strictEqual(options[1].nodeName, "OPTION");
	assert.strictEqual(options[1].text, "text1");
	assert.strictEqual(options[1].value, "value1");
	assert.strictEqual(options[2].nodeName, "OPTION");
	assert.strictEqual(options[2].text, "text2");
	assert.strictEqual(options[2].value, "value2");
		
});

QUnit.test("useStandardOutput", function(assert) {
	this.getpCollectionVarView();
	const child = this.pParentVarViewFactory.getChild(0);
	
	assert.strictEqual(child.useStandardOutput(), true);
});

