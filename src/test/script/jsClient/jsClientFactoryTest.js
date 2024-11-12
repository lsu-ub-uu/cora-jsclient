/*
 * Copyright 2019, 2020 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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

QUnit.module.only("jsClient/jsClientFactoryTest.js", {
	beforeEach : function() {
		this.providers = {
			"recordTypeProvider" : CORATEST.recordTypeProviderSpy(),
			"textProvider" : CORATEST.textProviderSpy(),
			"metadataProvider" : CORATEST.metadataProviderSpy(),
			"searchProvider" : CORATEST.searchProviderSpy(),
			"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy()
		};
		this.dependencies = {
			"authTokenHolder" : CORATEST.authTokenHolderSpy()
		};
		this.spec = {
			baseUrl : "http://dummy.org"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	assert.strictEqual(jsClientFactory.type, "jsClientFactory");
});

QUnit.test("factorTestType", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClient = jsClientFactory.factor(this.spec);
	assert.strictEqual(jsClient.type, "jsClient");
});

QUnit.test("factorTestDependenciesProviders", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClient = jsClientFactory.factor(this.spec);
	let factoredDep = jsClient.getDependencies();
	assert.strictEqual(factoredDep.providers, this.providers);
});

QUnit.test("factorTestDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClient = jsClientFactory.factor(this.spec);
	let factoredDep = jsClient.getDependencies();

	let providers = factoredDep.providers;
	assert.strictEqual(providers, this.providers);

	let globalFactories = factoredDep.globalFactories;
	assert.strictEqual(globalFactories.ajaxCallFactory.type, "ajaxCallFactory");
	assert.strictEqual(globalFactories.loginManagerFactory.type, "loginManagerFactory");
	assert.strictEqual(globalFactories.searchHandlerFactory.type, "searchHandlerFactory");

	assert.strictEqual(factoredDep.globalInstances.clientInstanceProvider,
			this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.jsClientViewFactory.type, "jsClientViewFactory");
	assert.strictEqual(factoredDep.authTokenHolder, this.dependencies.authTokenHolder);
	assert.strictEqual(factoredDep.appTokenLoginFactory.type, "appTokenLoginFactory");
	assert.strictEqual(factoredDep.openGuiItemHandlerFactory.type, "openGuiItemHandlerFactory");
	assert.strictEqual(factoredDep.openGuiItemHandlerFactory,
			factoredDep.globalFactories.openGuiItemHandlerFactory);
	assert.strictEqual(factoredDep.uploadManager.type, "uploadManager");
	assert.strictEqual(factoredDep.searchRecordHandlerFactory.type, "searchRecordHandlerFactory");
	assert.strictEqual(factoredDep.recordTypeHandlerFactory.type, "recordTypeHandlerFactory");
	assert.strictEqual(factoredDep.definitionViewerFactory.type, "definitionViewerFactory");
	assert.strictEqual(factoredDep.recursiveDeleteFactory.type, "recursiveDeleteFactory");

	assert.strictEqual(factoredDep.recordTypeMenu.type, "recordTypeMenu");
});

QUnit.test("testDefinitionViewerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClient = jsClientFactory.factor(this.spec);
	let factoredDep = jsClient.getDependencies();
	assert.equal(factoredDep.definitionViewerFactory.onlyForTestGetProviders(), this.providers);
});

QUnit.test("testRecursiveDeleteFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClient = jsClientFactory.factor(this.spec);
	let factoredDep = jsClient.getDependencies();
	assert.equal(factoredDep.recursiveDeleteFactory.onlyForTestGetProviders(), this.providers);     
	assert.equal(factoredDep.recursiveDeleteFactory.onlyForTestGetDependencies().globalFactories.ajaxCallFactory.type, "ajaxCallFactory");     
});

QUnit.test("testSearchHandlerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.globalFactories.searchHandlerFactory.getDependencies();

	assert.strictEqual(factoredDep.providers, jsClientFactoredDep.providers);
	assert.strictEqual(factoredDep.globalFactories, jsClientFactoredDep.globalFactories);
});

QUnit.test("testAjaxCallFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let factoredDep = jsClientFactory.factor(this.spec).getDependencies().globalFactories.ajaxCallFactory
			.getDependencies();
	assert.strictEqual(factoredDep.xmlHttpRequestFactory.type,
			"xmlHttpRequestFactory");
	assert.strictEqual(factoredDep.authTokenHolder,
			this.dependencies.authTokenHolder);
});

QUnit.test("testAppTokenLoginFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.appTokenLoginFactory.getDependencies();
	assert.strictEqual(factoredDep.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
});

QUnit.test("testloginManagerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.globalFactories.loginManagerFactory.getDependencies();
	assert.strictEqual(factoredDep.authTokenHolder, this.dependencies.authTokenHolder);
	assert.strictEqual(factoredDep.appTokenLoginFactory,
			jsClientFactoredDep.globalFactories.appTokenLoginFactory);

	assert.ok(factoredDep.webRedirectLoginFactory);
	assert.strictEqual(factoredDep.webRedirectLoginFactory,
			jsClientFactoredDep.globalFactories.webRedirectLoginFactory);

	assert.strictEqual(factoredDep.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);
	assert.strictEqual(factoredDep.passwordLoginJsClientIntegratorFactory.type, "genericFactory");

	let passwordLoginJsClientIntegratorFactory = factoredDep.passwordLoginJsClientIntegratorFactory;
	let jsCIFDependencies  = passwordLoginJsClientIntegratorFactory.getDependencies();
	
	assert.strictEqual(jsCIFDependencies.passwordLoginFactory.type,	"passwordLoginFactory");

});

QUnit.test("testOpenGuiItemHandlerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.openGuiItemHandlerFactory.getDependencies();
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);
});

QUnit.test("testUploadManagerDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.uploadManager.getDependencies();
	assert.strictEqual(factoredDep.clientInstanceProvider, this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);
	assert.strictEqual(factoredDep.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
	assert.strictEqual(factoredDep.managedGuiItemFactory,
			jsClientFactoredDep.globalFactories.managedGuiItemFactory);
});

QUnit.test("testRecordGuiFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.globalFactories.recordGuiFactory.getDependencies();

	assert.strictEqual(factoredDep.providers, this.providers);

	assert.strictEqual(factoredDep.globalFactories, jsClientFactoredDep.globalFactories);

	assert.strictEqual(factoredDep.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
	assert.strictEqual(factoredDep.authTokenHolder, this.dependencies.authTokenHolder);
	assert.strictEqual(factoredDep.uploadManager.type, "uploadManager");
	
	let recordPartPermissionCalculatorFactory = factoredDep.recordPartPermissionCalculatorFactory;
	assert.strictEqual(recordPartPermissionCalculatorFactory.type, "genericFactory");
	assert.strictEqual(recordPartPermissionCalculatorFactory.getTypeToFactor(), 
		"recordPartPermissionCalculator");
	let recordPartPermissionCalculatorDep = {
		metadataProvider : this.providers.metadataProvider
	};
	assert.deepEqual(recordPartPermissionCalculatorFactory.getDependencies(), 
		recordPartPermissionCalculatorDep);
});

QUnit.test("testsearchRecordHandlerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.searchRecordHandlerFactory.getDependencies();
	assert.strictEqual(factoredDep.searchRecordHandlerViewFactory.type,
			"searchRecordHandlerViewFactory");
	assert.strictEqual(factoredDep.globalFactories.searchRecordHandlerFactory,
			jsClientFactoredDep.globalFactories.searchRecordHandlerFactory);
	assert.strictEqual(factoredDep.searchRecordHandlerViewFactory,
			jsClientFactoredDep.globalFactories.searchRecordHandlerViewFactory);
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);
	assert.strictEqual(factoredDep.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
	assert.strictEqual(factoredDep.recordGuiFactory,
			jsClientFactoredDep.globalFactories.recordGuiFactory);

});

QUnit.test("testRecordTypeHandlerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.recordTypeHandlerFactory.getDependencies();

	assert.strictEqual(factoredDep.clientInstanceProvider, this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);
	assert.strictEqual(factoredDep.factories.recordGuiFactory,
			jsClientFactoredDep.globalFactories.recordGuiFactory);
	assert.strictEqual(factoredDep.factories.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
});

QUnit.test("testResultHandlerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

	let factories = jsClientFactoredDep.globalFactories;
	let resultHandlerFactory = factories.resultHandlerFactory;
	assert.strictEqual(resultHandlerFactory.type, "resultHandlerFactory");

	let dependencies = resultHandlerFactory.getDependencies();
	assert.strictEqual(dependencies.textProvider, this.providers.textProvider);
	assert.strictEqual(dependencies.recordHandlerFactory, factories.recordHandlerFactory);
	assert.strictEqual(dependencies.ajaxCallFactory.type, "ajaxCallFactory");
	assert.strictEqual(dependencies.recordGuiFactory,
			jsClientFactoredDep.globalFactories.recordGuiFactory);
});

QUnit.test("testRecordTypeHandlerViewFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

	let factories = jsClientFactoredDep.globalFactories;
	let recordTypeHandlerViewFactory = factories.recordTypeHandlerViewFactory;
	assert.strictEqual(recordTypeHandlerViewFactory.type, "recordTypeHandlerViewFactory");
});

QUnit.test("testRecordHandlerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

	let factories = jsClientFactoredDep.globalFactories;
	let recordHandlerFactory = factories.recordHandlerFactory;
	assert.strictEqual(recordHandlerFactory.type, "recordHandlerFactory");

	let factoredDep = recordHandlerFactory.getDependencies();
	assert.strictEqual(factoredDep.clientInstanceProvider, this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.ajaxCallFactory, factories.ajaxCallFactory);
	assert.strictEqual(factoredDep.recordGuiFactory, factories.recordGuiFactory);
	assert.strictEqual(factoredDep.managedGuiItemFactory, factories.managedGuiItemFactory);
	assert.strictEqual(factoredDep.metadataProvider, this.providers.metadataProvider);
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);

	assert.strictEqual(factoredDep.globalFactories, jsClientFactoredDep.globalFactories);
});

QUnit.test("testRecordListHandlerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

	let factories = jsClientFactoredDep.globalFactories;
	let recordListHandlerFactory = factories.recordListHandlerFactory;
	assert.strictEqual(recordListHandlerFactory.type, "recordListHandlerFactory");

	let dependencies = recordListHandlerFactory.getDependencies();
	assert.strictEqual(dependencies.factories.ajaxCallFactory,
			factories.ajaxCallFactory);
	assert.strictEqual(dependencies.factories.recordGuiFactory,
			factories.recordGuiFactory);
	assert.strictEqual(dependencies.factories.managedGuiItemFactory,
			factories.managedGuiItemFactory);
	assert.strictEqual(dependencies.factories.recordHandlerFactory,
			factories.recordHandlerFactory);
	assert.strictEqual(dependencies.factories.resultHandlerFactory,
			factories.resultHandlerFactory);
});

QUnit.test("testSpecSentToJSClient", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClient = jsClientFactory.factor(this.spec);
	assert.strictEqual(jsClient.getSpec(), this.spec);
});

QUnit.test("testIncomingLinksListHandlerFactory", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);

	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

	assert.strictEqual(jsClientFactoredDep.globalFactories.incomingLinksListHandlerFactory.type,
			"genericFactory");
	assert.strictEqual(jsClientFactoredDep.globalFactories.incomingLinksListHandlerFactory
			.getTypeToFactor(), "incomingLinksListHandler");
});

QUnit.test("testIncomingLinksListHandlerFactoryDependencies", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.globalFactories.incomingLinksListHandlerFactory
			.getDependencies();

	assert.strictEqual(factoredDep.providers, this.providers);
	assert.strictEqual(factoredDep.globalInstances.clientInstanceProvider,
			this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.globalFactories, jsClientFactoredDep.globalFactories);
});

QUnit.test("testIncomingLinksListHandlerViewFactory", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let factoredDep = jsClientFactoredDep.globalFactories.incomingLinksListHandlerViewFactory
			.getDependencies();

	assert.strictEqual(
			jsClientFactoredDep.globalFactories.incomingLinksListHandlerViewFactory.type,
			"genericFactory");
	assert.strictEqual(jsClientFactoredDep.globalFactories.incomingLinksListHandlerViewFactory
			.getTypeToFactor(), "incomingLinksListHandlerView");

	assert.strictEqual(factoredDep.providers, this.providers);
	assert.strictEqual(factoredDep.globalInstances.clientInstanceProvider,
			this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.globalFactories, jsClientFactoredDep.globalFactories);
});

QUnit.test("testRecordTypeMenuDependenciesAndSpec", function(assert) {
	let jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	let jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	let recordTypeMenu = jsClientFactoredDep.recordTypeMenu;
	let factoredProviders = recordTypeMenu.getProviders();
	let factoredDep = recordTypeMenu.getDependencies();
	let factoredSpec = recordTypeMenu.getSpec();

	assert.strictEqual(factoredProviders, jsClientFactoredDep.providers);
	assert.strictEqual(factoredDep.recordTypeHandlerFactory,
			jsClientFactoredDep.recordTypeHandlerFactory);
	assert.strictEqual(factoredSpec.baseUrl, this.spec.baseUrl);
});