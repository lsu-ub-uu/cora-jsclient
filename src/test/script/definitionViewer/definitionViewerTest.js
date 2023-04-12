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

QUnit.module.only("definitionViewer/definitionViewerTest.js", {
	beforeEach: function() {
		this.metadataProvider = CORATEST.metadataProviderForDefinitionViewerSpy();
		this.textProvider = CORATEST.textProviderSpy();
		this.searchProvider = CORATEST.searchProviderSpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.clientInstanceProvider = CORATEST.clientInstanceProviderSpy();

		this.view = CORATEST.definitionViewerViewSpy()
		
		this.providers = {
			metadataProvider: this.metadataProvider,
			textProvider: this.textProvider,
			searchProvider: this.searchProvider,
			recordTypeProvider: this.recordTypeProvider,
		};

		this.dependencies = {
			view : this.view
		}
		this.spec = {
			someKey : "someValue"
		};
		this.definitionViewer = CORA.definitionViewer(this.providers, this.dependencies, this.spec);
		this.dataGroup = {
			children:[
				{name : "nameInData",
				value : "someNameInData"}
			]
		};
		this.metadataProvider.addMetadataById("someMetadataGroupId",this.dataGroup);
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.definitionViewer.type, "definitionViewer");
});

QUnit.test("testOnlyForTestGetProviders", function(assert) {
	assert.strictEqual(this.definitionViewer.onlyForTestGetProviders(), this.providers);
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.definitionViewer.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("testOnlyForTestGetSpec", function(assert) {
	assert.strictEqual(this.definitionViewer.onlyForTestGetSpec(), this.spec);
});

QUnit.test("testTopLevelMetadataGroupFetchedFromProvider", function(assert) {
	this.definitionViewer.getViewForMetadataGroupId("someMetadataGroupId");
	
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "someMetadataGroupId");
});

QUnit.test("testViewerViewIsCalledAndAnswerFromViewReturned", function(assert) {
	let generatedView = this.definitionViewer.getViewForMetadataGroupId("someMetadataGroupId");
	
	assert.true(this.view.getViewModelForCallNo(0)!=undefined);
	assert.deepEqual(this.view.getCreatedViewForCallNo(0), generatedView);
});

QUnit.test("testViewModel", function(assert) {
	let generatedView = this.definitionViewer.getViewForMetadataGroupId("someMetadataGroupId");
	
	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		nameInData: "someNameInData"
	};
	assert.deepEqual(viewModel, expected);
});

