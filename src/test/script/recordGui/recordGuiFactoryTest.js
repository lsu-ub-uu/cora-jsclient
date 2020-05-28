/*
 * Copyright 2016, 2017 Uppsala University Library
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
QUnit.module("recordGui/recordGuiFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"providers" : {
				"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy(),
				"metadataProvider" : new MetadataProviderStub(),
				"textProvider" : CORATEST.textProviderStub(),
				"recordTypeProvider" :CORATEST.recordTypeProviderSpy()
			},
			"globalFactories" : {
				"searchHandlerFactory" : CORATEST.standardFactorySpy("searchHandlerSpy")
			},
			"authTokenHolder" : CORATEST.authTokenHolderSpy(),
			"uploadManager" : CORATEST.uploadManagerSpy(),
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy()
		};
		this.spec = {
			"metadataId" : "groupIdOneTextChild",
			"data" : {},
			"dataDivider" : "someDataDivider"
		};
		this.recordGuiFactory = CORA.recordGuiFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var recordGuiFactory = CORA.recordGuiFactory(this.dependencies);
	assert.strictEqual(recordGuiFactory.type, "recordGuiFactory");
});
QUnit.test("testGetDependencies", function(assert) {
	var recordGuiFactory = CORA.recordGuiFactory(this.dependencies);
	assert.strictEqual(recordGuiFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	assert.strictEqual(recordGui.type, "recordGui");
});

QUnit.test("testFactorSpec", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	assert.strictEqual(recordGui.getSpec(), this.spec);
});

QUnit.test("testFactorDependencies", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var factoredDependencies = recordGui.getDependencies();
	assert.strictEqual(factoredDependencies.metadataProvider,this.dependencies.providers.metadataProvider);
	assert.strictEqual(factoredDependencies.textProvider,this.dependencies.providers.textProvider);
});

QUnit.test("testFactorDependencyPubSub", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var pubSub = recordGui.getDependencies().pubSub;
	assert.strictEqual(pubSub.type, "pubSub");
});

QUnit.test("testFactorDependencyDataHolder", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var dataHolder = recordGui.getDependencies().dataHolder;
	assert.strictEqual(dataHolder.type, "dataHolder");
	var specDH = dataHolder.getSpec();
	assert.strictEqual(specDH.metadataId, this.spec.metadataId);
	assert.strictEqual(specDH.metadataProvider,this.dependencies.providers.metadataProvider);
	assert.strictEqual(specDH.pubSub, recordGui.getDependencies().pubSub);
});

QUnit.test("testFactorJsBookkeeperSpec", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var jsBookkeeper = recordGui.getDependencies().jsBookkeeper;
	assert.strictEqual(jsBookkeeper.type, "jsBookkeeper");
	var specBK = jsBookkeeper.getSpec();
	assert.strictEqual(specBK.metadataId, this.spec.metadataId);
	assert.strictEqual(specBK.metadataProvider,this.dependencies.providers.metadataProvider);
	assert.strictEqual(specBK.pubSub, recordGui.getDependencies().pubSub);
	assert.strictEqual(specBK.textProvider,this.dependencies.providers.textProvider);
	assert.strictEqual(specBK.dataHolder, recordGui.getDependencies().dataHolder);
});

QUnit.test("testFactorJsBookkeeperDependencies", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var jsBookkeeper = recordGui.getDependencies().jsBookkeeper;
	assert.strictEqual(jsBookkeeper.type, "jsBookkeeper");
	var depBK = jsBookkeeper.getDependencies();
	assert.strictEqual(depBK.recordTypeProvider,this.dependencies.providers.recordTypeProvider);
});

QUnit.test("testFactorDependencyPresentationFactory", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var presentationFactory = recordGui.getDependencies().presentationFactory;
	assert.strictEqual(presentationFactory.type, "presentationFactory");
	var dependenciesPF = presentationFactory.getDependencies();

	assert.strictEqual(dependenciesPF.providers, this.dependencies.providers);

	assert.strictEqual(dependenciesPF.globalFactories, this.dependencies.globalFactories);

	assert.strictEqual(dependenciesPF.authTokenHolder, this.dependencies.authTokenHolder);
	assert.strictEqual(dependenciesPF.pubSub, recordGui.getDependencies().pubSub);
	assert.strictEqual(dependenciesPF.jsBookkeeper, recordGui.getDependencies().jsBookkeeper);
	assert.strictEqual(dependenciesPF.recordGuiFactory, this.recordGuiFactory);
	assert.strictEqual(dependenciesPF.dataDivider, this.spec.dataDivider);
	assert.strictEqual(dependenciesPF.uploadManager, this.dependencies.uploadManager);
	assert.strictEqual(dependenciesPF.ajaxCallFactory, this.dependencies.ajaxCallFactory);
});

QUnit.test("testFactorDependencyPresentationHolderFactory", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var presentationHolderFactory = recordGui.getDependencies().presentationHolderFactory;
	assert.strictEqual(presentationHolderFactory.type, "presentationHolderFactory");
});

QUnit.test("testFactorDependencyMetadataController", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var metadataControllerFactory = recordGui.getDependencies().metadataControllerFactory;
	assert.strictEqual(metadataControllerFactory.type, "metadataControllerFactory");
	var dependenciesCF = metadataControllerFactory.getDependencies();
	assert.strictEqual(dependenciesCF.metadataProvider,this.dependencies.providers.metadataProvider);
	assert.strictEqual(dependenciesCF.recordTypeProvider,this.dependencies.providers.recordTypeProvider);
	assert.strictEqual(dependenciesCF.pubSub.type, "pubSub");
});

QUnit.test("testFactorDependencyMetadataValidator", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var metadataValidatorFactory = recordGui.getDependencies().metadataValidatorFactory;
	assert.strictEqual(metadataValidatorFactory.type, "metadataValidatorFactory");
	var dependenciesMV = metadataValidatorFactory.getDependencies();
	assert.strictEqual(dependenciesMV.metadataProvider, this.dependencies.providers.metadataProvider);
	assert.strictEqual(dependenciesMV.pubSub.type, "pubSub");
});
