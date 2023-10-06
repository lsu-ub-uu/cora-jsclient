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
	beforeEach: function() {
		this.pParentVarViewFactory = CORATEST.standardParentFactorySpy("pParentVarViewSpy");
		this.dependencies = {
			"infoFactory": CORATEST.infoFactorySpy(),
			pParentVarViewFactory: this.pParentVarViewFactory
		};
		this.spec = {
		};

		this.getPNumVarView = function() {
			if (this.pNumVarView === undefined) {
				this.pNumVarView = CORA.pNumVarView(this.dependencies, this.spec);
			}
			return this.pNumVarView;
		};
	}
});

QUnit.test("getType", function(assert) {
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

QUnit.test("testParentStarted", function(assert) {
	this.getPNumVarView();
	
	let pParentVarViewSpec = this.pParentVarViewFactory.getSpec(0);
	assert.strictEqual(pParentVarViewSpec, this.spec);
	
	const child = this.pParentVarViewFactory.getChild(0);

	assert.notEqual(child.createInputElementWithSetValueFunction, undefined);
	assert.notEqual(child.useStandardOutput, undefined);
});

QUnit.test("testMethodUsedFromPParentVarView", function(assert) {
	let pNumVarView = this.getPNumVarView();
	let pParentVarView = this.pParentVarViewFactory.getFactored(0);
	
	assert.strictEqual(pNumVarView.getView, pParentVarView.getView);
	assert.strictEqual(pNumVarView.setValue, pParentVarView.setValue);
	assert.strictEqual(pNumVarView.updateClassName, pParentVarView.updateClassName);
	assert.strictEqual(pNumVarView.setState, pParentVarView.setState);
	assert.strictEqual(pNumVarView.disable, pParentVarView.disable);
	assert.strictEqual(pNumVarView.addAttributesView, pParentVarView.addAttributesView);
	assert.strictEqual(pNumVarView.hide, pParentVarView.hide);
	assert.strictEqual(pNumVarView.show, pParentVarView.show);
});

QUnit.test("createInputElementWithSetValueFunction", function(assert) {
	this.getPNumVarView();
	const child = this.pParentVarViewFactory.getChild(0);
	
	let inputElement = child.createInputElementWithSetValueFunction();
	
	assert.strictEqual(inputElement.nodeName, "INPUT");
	assert.strictEqual(inputElement.type, "text");
	
	assert.strictEqual(inputElement.value, "");
	inputElement.setValue("trams");
	assert.strictEqual(inputElement.value, "trams");
});

QUnit.test("useStandardOutput", function(assert) {
	this.getPNumVarView();
	const child = this.pParentVarViewFactory.getChild(0);
	
	assert.strictEqual(child.useStandardOutput(), true);
});