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

QUnit.module.only("definitionViewer/definitionViewerFactoryTest.js", {
	beforeEach : function() {
		this.providers = {
			"recordTypeProvider" : CORATEST.recordTypeProviderSpy(),
			"textProvider" : CORATEST.textProviderSpy(),
			"metadataProvider" : CORATEST.metadataProviderSpy(),
			"searchProvider" : CORATEST.searchProviderSpy(),
			"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy()
		};
		this.dependencies = {
			someDep : "someDep"
		};
		this.spec = {
			someKey : "someValue"
		};
		this.definitionViewerFactory = CORA.definitionViewerFactory(this.providers, this.dependencies);
	},
	afterEach : function() {
	}
});

//changing dependencies to have subcategories
//
//providers, globalFactories, globalInstances, localFactories,
//localInstances,  a start is done in jsClient

QUnit.test("init", function(assert) {
	assert.strictEqual(this.definitionViewerFactory.type, "definitionViewerFactory");
});

QUnit.test("testOnlyForTestGetProviders", function(assert) {
	assert.strictEqual(this.definitionViewerFactory.onlyForTestGetProviders(), this.providers);
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.definitionViewerFactory.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var definitionViewer = this.definitionViewerFactory.factor(this.spec);

	assert.strictEqual(definitionViewer.type, "definitionViewer");
});

QUnit.test("factorTestProviders", function(assert) {
	var definitionViewer = this.definitionViewerFactory.factor(this.spec);
	
	assert.strictEqual(definitionViewer.onlyForTestGetProviders(), this.providers);
});

QUnit.test("factorTestDependencies", function(assert) {
	var definitionViewer = this.definitionViewerFactory.factor(this.spec);
	
	assert.deepEqual(definitionViewer.onlyForTestGetDependencies(), {});
});

QUnit.test("factorTestSpec", function(assert) {
	var definitionViewer = this.definitionViewerFactory.factor(this.spec);
	
	assert.deepEqual(definitionViewer.onlyForTestGetSpec(), this.spec);
});
