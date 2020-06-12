/*
 * Copyright 2020 Uppsala University Library
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
QUnit.module("metadata/metadataChildAndRepeatInitializerFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.dependencies = {
			recordTypeProvider : CORATEST.recordTypeProviderSpy(),
			metadataProvider : this.metadataProvider,
			pubSub : this.pubSub
		};
		this.childSpec = {
				data: undefined,
				path: {}
			};

			this.childSpec.childReference = {
				"name": "childReference",
				"repeatId": "0",
				"children": [{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadata"
					}, {
						"name": "linkedRecordId",
						"value": "textVariableId"
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}]
			};
			
			this.repeatSpec = {
					"metadataId" : "textVariableId",
					"path" : {},
					"data" : {
						"name": "textVariableId",
						"value": "A Value"
					},
					"repeatId" : "0"
				};
		this.metadataControllerFactory = CORA.metadataControllerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let metadataChildAndRepeatInitializerFactory = CORA.metadataChildAndRepeatInitializerFactory(this.dependencies);
	assert.strictEqual(metadataChildAndRepeatInitializerFactory.type, "metadataChildAndRepeatInitializerFactory");
	
	let childInitializerFactory = metadataChildAndRepeatInitializerFactory.getChildInitializerFactory();
	assert.strictEqual(childInitializerFactory.type, "genericFactory");
	
	let repeatInitializerFactory = metadataChildAndRepeatInitializerFactory.getRepeatInitializerFactory();
	assert.strictEqual(repeatInitializerFactory.type, "genericFactory");
});

QUnit.test("testFactorChildInitializer", function(assert) {
	let metadataChildAndRepeatInitializerFactory = CORA.metadataChildAndRepeatInitializerFactory(this.dependencies);
	
	let factored = metadataChildAndRepeatInitializerFactory.factorChildInitializer(this.childSpec);
	assert.strictEqual(factored.type, "metadataChildInitializer");
	assert.stringifyEqual(factored.getSpec(), this.childSpec);
	
	let childDependencies = factored.getDependencies();
	assert.strictEqual(childDependencies.recordTypeProvider, this.dependencies.recordTypeProvider);
	assert.strictEqual(childDependencies.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(childDependencies.pubSub, this.dependencies.pubSub);
	assert.strictEqual(childDependencies.metadataChildAndRepeatInitializerFactory, metadataChildAndRepeatInitializerFactory);
	
});

QUnit.test("testFactorRepeatInitializer", function(assert) {
	let metadataChildAndRepeatInitializerFactory = CORA.metadataChildAndRepeatInitializerFactory(this.dependencies);
	
	let factored = metadataChildAndRepeatInitializerFactory.factorRepeatInitializer(this.repeatSpec);
	assert.strictEqual(factored.type, "metadataRepeatInitializer");
	assert.stringifyEqual(factored.getSpec(), this.repeatSpec);

	let childDependencies = factored.getDependencies();
	assert.strictEqual(childDependencies.recordTypeProvider, this.dependencies.recordTypeProvider);
	assert.strictEqual(childDependencies.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(childDependencies.pubSub, this.dependencies.pubSub);
	assert.strictEqual(childDependencies.metadataChildAndRepeatInitializerFactory, metadataChildAndRepeatInitializerFactory);
});	

QUnit.test("testGetDependencies", function(assert) {
	let metadataChildAndRepeatInitializerFactory = CORA.metadataChildAndRepeatInitializerFactory(this.dependencies);
	assert.strictEqual(metadataChildAndRepeatInitializerFactory.getDependencies(), this.dependencies);
});
