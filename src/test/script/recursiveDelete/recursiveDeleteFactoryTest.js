/*
 * Copyright 2024 Uppsala University Library
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

QUnit.module("recursiveDelete/recursiveDeleteFactoryTest.js", {
	beforeEach : function() {
		this.providers = {
			"recordTypeProvider" : CORATEST.recordTypeProviderSpy(),
			"textProvider" : CORATEST.textProviderSpy(),
			"metadataProvider" : CORATEST.metadataProviderSpy(),
			"searchProvider" : CORATEST.searchProviderSpy(),
			"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy()
		};
		this.globalFactories = {
			ajaxCallFactory: CORATEST.standardFactorySpy("ajaxCallSpy")
		};
		this.dependencies = {
			globalFactories: this.globalFactories,
			managedGuiItemFactory: CORATEST.standardFactorySpy("managedGuiItemSpy"),
			someDep : "someDep"
		};
		this.spec = {
			jsClient : CORATEST.jsClientSpy(),
			someKey : "someValue"
		};
		this.recursiveDeleteFactory = CORA.recursiveDeleteFactory(this.providers, this.dependencies);
	},
	afterEach : function() {
	}
});


QUnit.test("init", function(assert) {
	assert.strictEqual(this.recursiveDeleteFactory.type, "recursiveDeleteFactory");
});

QUnit.test("testOnlyForTestGetProviders", function(assert) {
	assert.strictEqual(this.recursiveDeleteFactory.onlyForTestGetProviders(), this.providers);
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.recursiveDeleteFactory.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	let recursiveDelete = this.recursiveDeleteFactory.factor(this.spec);

	assert.strictEqual(recursiveDelete.type, "recursiveDelete");
});

QUnit.test("factorTestProviders", function(assert) {
	let recursiveDelete = this.recursiveDeleteFactory.factor(this.spec);
	
	assert.strictEqual(recursiveDelete.onlyForTestGetProviders(), this.providers);
});

QUnit.test("factorTestDependencies", function(assert) {
	let recursiveDelete = this.recursiveDeleteFactory.factor(this.spec);
	
	assert.deepEqual(recursiveDelete.onlyForTestGetDependencies().view.type, 
		CORA.recursiveDeleteView().type);
	assert.deepEqual(recursiveDelete.onlyForTestGetDependencies().ajaxCallFactory, 
		this.globalFactories.ajaxCallFactory);
});

QUnit.test("factorTestSpec", function(assert) {
	let recursiveDelete = this.recursiveDeleteFactory.factor(this.spec);
	
	assert.deepEqual(recursiveDelete.onlyForTestGetSpec(), this.spec);
});
