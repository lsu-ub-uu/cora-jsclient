/*
 * Copyright 2024 Uppsala University Library
 * Copyright 2023, 2024 Olov McKie
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

QUnit.module("recursiveDelete/recursiveDeleteViewTest.js", {
	beforeEach: function() {
		this.dependencies = {
			someDep: "someDep"
		}
		this.spec = {
			someKey: "someValue"
		};
		
		this.recursiveDeleteView = CORA.recursiveDeleteView(this.dependencies, this.spec);
		let viewModel = {
			id: "minimalGroupId",
			type: "group",
			nameInData: "minimalGroup",
			text: { sv: "translated_sv_minimalGroupIdText", en: "translated_en_minimalGroupIdText" },
			defText: { sv: "translated_sv_minimalGroupIdDefText", en: "translated_en_minimalGroupIdDefText" },
			methodOpenDefiningRecord : this.openDefiningRecordUsingEventAndId,
			children: []
		};
		this.viewModel = viewModel;
		let child = {
			repeatMin: "1", repeatMax: "10", recordPartConstraint: "noConstraint", child: {
				id: "textVarId",
				type: "textVar",
				nameInData: "textVar",
				text: { sv: "translated_sv_textVarIdText", en: "translated_en_textVarIdText" },
				defText: { sv: "translated_sv_textVarIdDefText", en: "translated_en_textVarIdDefText" },
				methodOpenDefiningRecord : this.openDefiningRecordUsingEventAndId
			}
		};
		viewModel.children.push(child);
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.recursiveDeleteView.type, "recursiveDeleteView");
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.recursiveDeleteView.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("testOnlyForTestGetSpec", function(assert) {
	assert.strictEqual(this.recursiveDeleteView.onlyForTestGetSpec(), this.spec);
});

QUnit.test("testBasicView", function(assert) {
	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);
	CORATEST.assertElementHasTypeClassText(view, "SPAN", "recursiveDelete", "", assert);

	let header = view.childNodes[0];
	CORATEST.assertElementHasTypeClassText(header, "DIV", "header", "Recursive delete of minimalGroupId", assert);
	
	recursiveDeleteUpdateViewForViewModelAndAssertSameContent(assert,this.recursiveDeleteView, this.viewModel, view);
});

let recursiveDeleteUpdateViewForViewModelAndAssertSameContent = function(assert, recursiveDeleteView, viewModel, view){
	let oldChildNodes = Array.from(view.childNodes);
	recursiveDeleteView.updateViewForViewModel(viewModel);
	let newChildNodes = Array.from(view.childNodes);
	for (let i = 0; i < oldChildNodes.length; i++) {
  		let oldItem = oldChildNodes[i];
  		let newItem = newChildNodes[i];
		assert.propEqual(oldItem, newItem);
		assert.notStrictEqual(oldItem, newItem);
	}
};
//
QUnit.test("testLegend", function(assert) {
	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);

	let legend = view.childNodes[1];
	assert.strictEqual(legend.childNodes[0].textContent, "Legend", assert);
	
	let storage = legend.childNodes[1];
	CORATEST.assertElementHasTypeClassText(storage, "DIV", "", "", assert);
	CORATEST.assertElementHasTypeClassText(storage.childNodes[0], "SPAN", "presentation", "P", assert);
	CORATEST.assertElementHasTypeClassText(storage.childNodes[1], "SPAN", "", "Presentation", assert);
		
	recursiveDeleteUpdateViewForViewModelAndAssertSameContent(assert,this.recursiveDeleteView, this.viewModel, view);
});

//QUnit.test("testBasicMetadata", function(assert) {
//	let view = this.recursiveDeleteView.createViewForViewModel(this.viewModel);
//
//	let firstLevelMetadata = view.childNodes[1];
//	CORATEST.assertElementHasTypeClassText(firstLevelMetadata, "UL", "metadata", "", assert);
//	
//	let metadataHeader = firstLevelMetadata.childNodes[0];
//	assert.strictEqual(metadataHeader.tagName, "LI");
//	let childNodes = metadataHeader.childNodes;
//	CORATEST.assertElementHasTypeClassText(childNodes[0], "SPAN", "nameInData", "minimalGroup", assert);
//	CORATEST.assertElementHasTypeClassText(childNodes[1], "SPAN", "details",  "", assert);
//	
//	recursiveDeleteUpdateViewForViewModelAndAssertSameContent(assert,this.recursiveDeleteView, this.viewModel, view);
//});