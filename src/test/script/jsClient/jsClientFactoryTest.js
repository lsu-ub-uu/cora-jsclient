/*
 * Copyright 2019 Uppsala University Library
 * Copyright 2017 Olov McKie
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

QUnit.module("jsClient/jsClientFactoryTest.js", {
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
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	assert.strictEqual(jsClientFactory.type, "jsClientFactory");
});

QUnit.test("factorTestType", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClient = jsClientFactory.factor(this.spec);
	assert.strictEqual(jsClient.type, "jsClient");
});

QUnit.test("factorTestDependenciesProviders", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClient = jsClientFactory.factor(this.spec);
	var factoredDep = jsClient.getDependencies();
	assert.strictEqual(factoredDep.providers, this.providers);
});

QUnit.test("factorTestDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClient = jsClientFactory.factor(this.spec);
	var factoredDep = jsClient.getDependencies();

	var providers = factoredDep.providers;
	assert.strictEqual(providers, this.providers);

	var globalFactories = factoredDep.globalFactories;
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

	assert.strictEqual(factoredDep.recordTypeMenu.type, "recordTypeMenu");
});

QUnit.test("testSearchHandlerFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.globalFactories.searchHandlerFactory.getDependencies();

	assert.strictEqual(factoredDep.providers, jsClientFactoredDep.providers);
	assert.strictEqual(factoredDep.globalFactories, jsClientFactoredDep.globalFactories);
});

QUnit
		.test(
				"testAjaxCallFactoryDependencies",
				function(assert) {
					var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
					var factoredDep = jsClientFactory.factor(this.spec).getDependencies().globalFactories.ajaxCallFactory
							.getDependencies();
					assert.strictEqual(factoredDep.xmlHttpRequestFactory.type,
							"xmlHttpRequestFactory");
					assert.strictEqual(factoredDep.authTokenHolder,
							this.dependencies.authTokenHolder);
				});

QUnit.test("testAppTokenLoginFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.appTokenLoginFactory.getDependencies();
	assert.strictEqual(factoredDep.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
});

QUnit.test("testloginManagerFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.globalFactories.loginManagerFactory.getDependencies();
	assert.strictEqual(factoredDep.authTokenHolder, this.dependencies.authTokenHolder);
	assert.strictEqual(factoredDep.appTokenLoginFactory,
			jsClientFactoredDep.globalFactories.appTokenLoginFactory);

	assert.ok(factoredDep.webRedirectLoginFactory);
	assert.strictEqual(factoredDep.webRedirectLoginFactory,
			jsClientFactoredDep.globalFactories.webRedirectLoginFactory);

	assert.strictEqual(factoredDep.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);
	assert.strictEqual(factoredDep.ldapLoginJsClientIntegratorFactory.type, "genericFactory");

	var ldapLoginJsClientIntegratorFactory = factoredDep.ldapLoginJsClientIntegratorFactory;
	var jsCIFDependencies  = ldapLoginJsClientIntegratorFactory.getDependencies();
	
	assert.strictEqual(jsCIFDependencies.ldapLoginFactory.type,	"ldapLoginFactory");

});

QUnit.test("testOpenGuiItemHandlerFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.openGuiItemHandlerFactory.getDependencies();
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);
});

QUnit.test("testUploadManagerDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.uploadManager.getDependencies();
	assert.strictEqual(factoredDep.clientInstanceProvider, this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);
	assert.strictEqual(factoredDep.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
	assert.strictEqual(factoredDep.managedGuiItemFactory,
			jsClientFactoredDep.globalFactories.managedGuiItemFactory);
});

QUnit.test("testRecordGuiFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.globalFactories.recordGuiFactory.getDependencies();

	assert.strictEqual(factoredDep.providers, this.providers);

	assert.strictEqual(factoredDep.globalFactories, jsClientFactoredDep.globalFactories);

	assert.strictEqual(factoredDep.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
	assert.strictEqual(factoredDep.authTokenHolder, this.dependencies.authTokenHolder);
	assert.strictEqual(factoredDep.uploadManager.type, "uploadManager");
});

QUnit.test("testsearchRecordHandlerFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.searchRecordHandlerFactory.getDependencies();
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
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.recordTypeHandlerFactory.getDependencies();

	assert.strictEqual(factoredDep.clientInstanceProvider, this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.textProvider, this.providers.textProvider);
	assert.strictEqual(factoredDep.factories.recordGuiFactory,
			jsClientFactoredDep.globalFactories.recordGuiFactory);
	assert.strictEqual(factoredDep.factories.ajaxCallFactory,
			jsClientFactoredDep.globalFactories.ajaxCallFactory);
});

QUnit.test("testResultHandlerFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

	var factories = jsClientFactoredDep.globalFactories;
	var resultHandlerFactory = factories.resultHandlerFactory;
	assert.strictEqual(resultHandlerFactory.type, "resultHandlerFactory");

	var dependencies = resultHandlerFactory.getDependencies();
	assert.strictEqual(dependencies.textProvider, this.providers.textProvider);
	assert.strictEqual(dependencies.recordHandlerFactory, factories.recordHandlerFactory);
	assert.strictEqual(dependencies.ajaxCallFactory.type, "ajaxCallFactory");
	assert.strictEqual(dependencies.recordGuiFactory,
			jsClientFactoredDep.globalFactories.recordGuiFactory);
});

QUnit.test("testRecordTypeHandlerViewFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

	var factories = jsClientFactoredDep.globalFactories;
	var recordTypeHandlerViewFactory = factories.recordTypeHandlerViewFactory;
	assert.strictEqual(recordTypeHandlerViewFactory.type, "recordTypeHandlerViewFactory");
});

QUnit.test("testRecordHandlerFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

	var factories = jsClientFactoredDep.globalFactories;
	var recordHandlerFactory = factories.recordHandlerFactory;
	assert.strictEqual(recordHandlerFactory.type, "recordHandlerFactory");

	var factoredDep = recordHandlerFactory.getDependencies();
	assert.strictEqual(factoredDep.clientInstanceProvider, this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.ajaxCallFactory, factories.ajaxCallFactory);
	assert.strictEqual(factoredDep.recordGuiFactory, factories.recordGuiFactory);
	assert.strictEqual(factoredDep.managedGuiItemFactory, factories.managedGuiItemFactory);

	assert.strictEqual(factoredDep.globalFactories, jsClientFactoredDep.globalFactories);
});

QUnit
		.test("testRecordListHandlerFactoryDependencies",
				function(assert) {
					var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
					var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

					var factories = jsClientFactoredDep.globalFactories;
					var recordListHandlerFactory = factories.recordListHandlerFactory;
					assert.strictEqual(recordListHandlerFactory.type, "recordListHandlerFactory");

					var dependencies = recordListHandlerFactory.getDependencies();
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
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClient = jsClientFactory.factor(this.spec);
	assert.strictEqual(jsClient.getSpec(), this.spec);
});

QUnit.test("testIncomingLinksListHandlerFactory", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);

	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();

	assert.strictEqual(jsClientFactoredDep.globalFactories.incomingLinksListHandlerFactory.type,
			"genericFactory");
	assert.strictEqual(jsClientFactoredDep.globalFactories.incomingLinksListHandlerFactory
			.getTypeToFactor(), "incomingLinksListHandler");
});

QUnit.test("testIncomingLinksListHandlerFactoryDependencies", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.globalFactories.incomingLinksListHandlerFactory
			.getDependencies();

	assert.strictEqual(factoredDep.providers, this.providers);
	assert.strictEqual(factoredDep.globalInstances.clientInstanceProvider,
			this.providers.clientInstanceProvider);
	assert.strictEqual(factoredDep.globalFactories, jsClientFactoredDep.globalFactories);
});

QUnit.test("testIncomingLinksListHandlerViewFactory", function(assert) {
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var factoredDep = jsClientFactoredDep.globalFactories.incomingLinksListHandlerViewFactory
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
	var jsClientFactory = CORA.jsClientFactory(this.providers, this.dependencies);
	var jsClientFactoredDep = jsClientFactory.factor(this.spec).getDependencies();
	var recordTypeMenu = jsClientFactoredDep.recordTypeMenu;
	var factoredProviders = recordTypeMenu.getProviders();
	var factoredDep = recordTypeMenu.getDependencies();
	var factoredSpec = recordTypeMenu.getSpec();

	assert.strictEqual(factoredProviders, jsClientFactoredDep.providers);
	assert.strictEqual(factoredDep.recordTypeHandlerFactory,
			jsClientFactoredDep.recordTypeHandlerFactory);
	assert.strictEqual(factoredSpec.baseUrl, this.spec.baseUrl);
});