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

QUnit.module("gui/pVarViewFactoryTest.js", {
	beforeEach : function() {
		this.pVarViewFactory = CORA.pVarViewFactory();
		this.spec = {
			viewType: "pTextVar",
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
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.pVarViewFactory);
	assert.strictEqual(this.pVarViewFactory.type, "pVarViewFactory");
});

QUnit.test("testFactorViewForPTextVar", function(assert) {
	let view = this.pVarViewFactory.factor(this.spec);
	
	assert.ok(view);
	assert.strictEqual(view.type, "pVarView");
});

QUnit.test("factorSetsSpecInPTextVarView", function(assert) {
	let view = this.pVarViewFactory.factor(this.spec);
	
	let spec = view.getSpec();
	assert.deepEqual(spec, this.spec);
});

QUnit.test("factorSetsDependenciesInPTextVarView", function(assert) {
	let view = this.pVarViewFactory.factor(this.spec);
	let dependencies = view.getDependencies();
	
	assert.strictEqual(view.type, "pVarView");
	assert.deepEqual(dependencies.pParentVarViewFactory.type, "genericParentFactory");
	assert.deepEqual(dependencies.pParentVarViewFactory.getTypeToFactor(), "pParentVarView");
	
	let pParentDependencies = dependencies.pParentVarViewFactory.getDependencies();
	assert.deepEqual(pParentDependencies.infoFactory.type, "infoFactory");
});

QUnit.test("testFactorViewForPNumVar", function(assert) {
	this.spec.type = "pNumVar";
	
	let view = this.pVarViewFactory.factor(this.spec);
	let dependencies = view.getDependencies();
	
	assert.deepEqual(dependencies.pParentVarViewFactory.type, "genericParentFactory");
	assert.deepEqual(dependencies.pParentVarViewFactory.getTypeToFactor(), "pParentVarView");
	
	let pParentDependencies = dependencies.pParentVarViewFactory.getDependencies();
	assert.deepEqual(pParentDependencies.infoFactory.type, "infoFactory");
	assert.strictEqual(view.type, "pNumVarView");
});

QUnit.test("factorSetsSpecInPNumVarView", function(assert) {
	this.spec.type = "pNumVar";
	let view = this.pVarViewFactory.factor(this.spec);
	
	let spec = view.getSpec();
	assert.deepEqual(spec, this.spec);
});

QUnit.test("factorSetsDependenciesInPNumVarView", function(assert) {
	this.spec.type = "pNumVar";
	let view = this.pVarViewFactory.factor(this.spec);
	
	let dependencies = view.getDependencies();
	assert.deepEqual(dependencies.infoFactory.type, "infoFactory");
});
