/*
 * Copyright 2017 Uppsala University Library
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

QUnit.module("net/uploadManagerFactoryTest.js", {
	beforeEach : function() {
		this.record = CORATEST.recordTypeList.dataList.data[4].record;
		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
			"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy(),
			"textProvider" : CORATEST.textProviderSpy(),
			"ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy"),
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
		};
		this.spec = {
			"addView" : function() {
			},
			"showView" : function() {
			}
		};
		this.uploadManagerFactory = CORA.uploadManagerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.uploadManagerFactory);
	assert.strictEqual(this.uploadManagerFactory.type, "uploadManagerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.uploadManagerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var uploadManager = this.uploadManagerFactory.factor(this.spec);
	assert.ok(uploadManager);
	assert.strictEqual(uploadManager.type, "uploadManager");
});

QUnit.test("factorTestUsedIncomingDependencies", function(assert) {
	var uploadManager = this.uploadManagerFactory.factor(this.spec);
	var createdDependencies = uploadManager.getDependencies();
	assert.strictEqual(createdDependencies.clientInstanceProvider,
			this.dependencies.clientInstanceProvider);
	assert.strictEqual(createdDependencies.textProvider, this.dependencies.textProvider);
	assert.strictEqual(createdDependencies.ajaxCallFactory, this.dependencies.ajaxCallFactory);
});

QUnit.test("testFactorAddedDependenciesManagedGuiItemFactory", function(assert) {
	var uploadManager = this.uploadManagerFactory.factor(this.spec);
	var createdDependencies = uploadManager.getDependencies();
	assert.strictEqual(createdDependencies.managedGuiItemFactory,
			this.dependencies.managedGuiItemFactory);
});

QUnit.test("factorTestSpec", function(assert) {
	var uploadManager = this.uploadManagerFactory.factor(this.spec);
	var uploadManagerSpec = uploadManager.getSpec();
	assert.strictEqual(uploadManagerSpec, this.spec);
});
