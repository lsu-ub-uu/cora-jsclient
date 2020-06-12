/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
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
QUnit.module("metadata/metadataControllerFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			recordTypeProvider : CORATEST.recordTypeProviderSpy(),
			metadataProvider : new MetadataProviderStub(),
			pubSub : CORATEST.pubSubSpy()
		};
		this.spec = {
			"metadataId" : "groupIdOneTextChild",
			"data" : undefined
		};
		this.metadataControllerFactory = CORA.metadataControllerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var metadataControllerFactory = CORA.metadataControllerFactory(this.dependencies);
	assert.strictEqual(metadataControllerFactory.type, "metadataControllerFactory");
});

QUnit.test("testGetDependencies", function(assert) {
	var metadataControllerFactory = CORA.metadataControllerFactory(this.dependencies);
	assert.strictEqual(metadataControllerFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	var metadataController = this.metadataControllerFactory.factor(this.spec);
	assert.strictEqual(metadataController.type, "metadataController");
});

QUnit.test("testSpec", function(assert) {
	var metadataController = this.metadataControllerFactory.factor(this.spec);
	var factoredSpec = metadataController.getSpec();
	assert.strictEqual(factoredSpec.metadataId, this.spec.metadataId);
	assert.strictEqual(factoredSpec.data, this.spec.data);
});

QUnit.test("testDependencies", function(assert) {
	var metadataController = this.metadataControllerFactory.factor(this.spec);
	var factoredDependencies = metadataController.getDependencies();
	assert.strictEqual(factoredDependencies.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(factoredDependencies.pubSub, this.dependencies.pubSub);
	
	assert.strictEqual(factoredDependencies.recordTypeProvider, this.dependencies.recordTypeProvider);
	assert.strictEqual(factoredDependencies.metadataChildAndRepeatInitializerFactory.type, "metadataChildAndRepeatInitializerFactory");
	
});
QUnit.test("testDependenciesForMetadataChildAndRepeatInitializerFactory", function(assert) {
	let metadataController = this.metadataControllerFactory.factor(this.spec);
	
	let factoredControllerDependencies = metadataController.getDependencies();
	let metadataChildAndRepeatInitializerFactory = factoredControllerDependencies.metadataChildAndRepeatInitializerFactory;
	
	let factoredDependencies = metadataChildAndRepeatInitializerFactory.getDependencies();
	
	assert.strictEqual(factoredDependencies.recordTypeProvider, this.dependencies.recordTypeProvider);
	assert.strictEqual(factoredDependencies.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(factoredDependencies.pubSub, this.dependencies.pubSub);
	
});
