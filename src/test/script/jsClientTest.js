/*
 * Copyright 2016 Uppsala University Library
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

QUnit.module("jsClientTest.js", {
	beforeEach : function() {
		this.record = CORATEST.recordTypeList.dataList.data[4].record;
		this.createRecordHandlerViewFactory = function() {
			return {
				"factor" : function(recordHandlerViewSpec) {
					return CORA.recordHandlerView(recordHandlerViewSpec);
				}
			};
		};
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		this.factories = {
			"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy")
		};
		this.dependencies = {
			"factories" : this.factories,
			"loginManagerFactory" : CORATEST.loginManagerFactorySpy(),
			"ajaxCallFactory" : this.ajaxCallFactorySpy,
			"metadataProvider" : CORATEST.metadataProviderRealStub(),
			"textProvider" : CORATEST.textProviderRealStub(),
			"searchProvider" : CORATEST.searchProviderSpy(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
			"presentationFactoryFactory" : "not implemented yet",
			"jsClientViewFactory" : CORATEST.standardFactorySpy("jsClientViewSpy"),
			"searchRecordHandlerFactory" : CORATEST.standardFactorySpy("searchRecordHandlerSpy"),
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
			"openGuiItemHandlerFactory" : CORATEST.standardFactorySpy("openGuiItemHandlerSpy"),
			"recordTypeHandlerFactory" : CORATEST.standardFactorySpy("recordTypeHandlerSpy"),
			"uploadManager" : CORATEST.uploadManagerSpy(),
			"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy()
		}
		this.spec = {
			"name" : "The Client",
			"baseUrl" : "http://epc.ub.uu.se/cora/rest/",
			"appTokenBaseUrl" : "someAppTokenBaseUrl/"
		};

	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(jsClient.type, "jsClient");
});

QUnit.test("testJsClientSetInInstanceProvider", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(this.dependencies.clientInstanceProvider.getJsClient(), jsClient);
});

QUnit.test("testGetRecordTypeList", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var mainView = jsClient.getView();
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	assert.strictEqual(jsClientView.getView(), mainView);

	var recordTypeList = jsClient.getRecordTypeList();
	assert.strictEqual(recordTypeList.length, 19);
});

QUnit.test("testGetDependencies", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(jsClient.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(jsClient.getSpec(), this.spec);
});

QUnit.test("testViewSpec", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientViewSpec = this.dependencies.jsClientViewFactory.getSpec(0);

	assert.strictEqual(jsClientViewSpec.name, this.spec.name);
	assert.strictEqual(jsClientViewSpec.serverAddress, this.spec.baseUrl);
	assert.strictEqual(jsClientViewSpec.reloadProvidersMethod, jsClient.reloadProviders);
});

QUnit.test("testUploadManagerAddedToView", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedGlobalView(0), this.dependencies.uploadManager
			.getManagedGuiItem().getMenuView());
});

QUnit.test("testInitCreatesALoginManager", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var factored = this.dependencies.loginManagerFactory.getFactored(0);
	assert.ok(factored !== undefined);
	assert.strictEqual(this.dependencies.loginManagerFactory.getSpec(0).afterLoginMethod,
			jsClient.afterLogin);
	assert.strictEqual(this.dependencies.loginManagerFactory.getSpec(0).afterLogoutMethod,
			jsClient.afterLogout);
	assert.strictEqual(this.dependencies.loginManagerFactory.getSpec(0).appTokenBaseUrl,
			"someAppTokenBaseUrl/");
});

QUnit.test("testInitCreatesALoginManagerAndAddsItsHtmlToTheHeader", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getLoginManagerView(0).className, "loginManagerSpy");
});

QUnit.test("testInitCreatesAOpenGuiItemHandler", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var factored = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	assert.strictEqual(factored.type, "openGuiItemHandlerSpy");
});

QUnit.test("testInitAddsItsOpenGuiItemHandlerToView", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	var openGuiItemHandlerView = this.dependencies.openGuiItemHandlerFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedOpenGuiItemHandlerView(0), openGuiItemHandlerView
			.getView());
});

QUnit.test("initFactoresSearchRecordHandlersAndAddsToView", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	var addedSearchRecordHandlerView = jsClientView.getSearchesView(0);
	var factoredSearchRecordHandler = this.dependencies.searchRecordHandlerFactory.getFactored(0);
	assert.strictEqual(addedSearchRecordHandlerView, factoredSearchRecordHandler.getView());
	var factoredSpec = this.dependencies.searchRecordHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.baseUrl, this.spec.baseUrl);
	assert.strictEqual(factoredSpec.jsClient, jsClient);

	var addedSearchRecordHandlerView2 = jsClientView.getSearchesView(1);
	var factoredSearchRecordHandler2 = this.dependencies.searchRecordHandlerFactory.getFactored(1);
	assert.strictEqual(addedSearchRecordHandlerView2, factoredSearchRecordHandler2.getView());
	var factoredSpec2 = this.dependencies.searchRecordHandlerFactory.getSpec(1);
	assert.strictEqual(factoredSpec2.baseUrl, this.spec.baseUrl);

	var addedSearchRecordHandlerView3 = jsClientView.getSearchesView(2);
	var factoredSearchRecordHandler3 = this.dependencies.searchRecordHandlerFactory.getFactored(2);
	assert.strictEqual(addedSearchRecordHandlerView3, factoredSearchRecordHandler3.getView());
	var factoredSpec3 = this.dependencies.searchRecordHandlerFactory.getSpec(2);
	assert.strictEqual(factoredSpec3.baseUrl, this.spec.baseUrl);
});

QUnit.test("initFactoresSearchRecordHandlersSearchWithoutSearchLinkIsNotAdded", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);

	var factoredSearchRecordHandler4 = this.dependencies.searchRecordHandlerFactory.getFactored(3);
	assert.strictEqual(factoredSearchRecordHandler4, undefined);
});

QUnit.test("initFactoresRecordTypeHandlersAndAddsToViewIfRecordTypeHasActions", function(assert) {
	function getIdFromRecord(record) {
		var cRecord = CORA.coraData(record.data);
		var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
		return cRecordInfo.getFirstAtomicValueByNameInData("id");
	}

	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	var dependencies = this.dependencies;
	var spec = this.spec;

	function assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(number, id) {
		var factoredRecordTypeHandler = dependencies.recordTypeHandlerFactory.getFactored(number);
		assert.strictEqual(factoredRecordTypeHandler.getView(), jsClientView
				.getRecordTypesView(number));
		var factoredSpec = dependencies.recordTypeHandlerFactory.getSpec(number);
		assert.strictEqual(factoredSpec.jsClient, jsClient);
		assert.strictEqual(factoredSpec.baseUrl, spec.baseUrl);
		assert.strictEqual(getIdFromRecord(factoredSpec.recordTypeRecord), id);
	}

	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(0, "metadata");
	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(2, "metadataCollectionItem");
	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(7, "presentation");
	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(8, "presentationVar");
	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(18, "recordType");
});

QUnit.test("initFactoresRecordTypeHandlersNotAddedToViewIfRecordTypeWithoutActions", function(
		assert) {
	var spySpec = {
		"returnFalseForAnyAction" : true
	};
	this.dependencies.recordTypeHandlerFactory.setspySpec(spySpec);

	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getRecordTypesView(0), undefined);
});

QUnit.test("showView", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	var openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	var aView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewShown(), 0);

	jsClient.showView(aView);
	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aView.getWorkViewHidden(), 0);

	var aDifferentView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aDifferentView.getActive(), false);

	jsClient.showView(aDifferentView);
	assert.strictEqual(jsClientView.getAddedWorkView(1), aDifferentView.getWorkView());
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewHidden(), 1);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aDifferentView.getActive(), true);
	assert.strictEqual(aDifferentView.getWorkViewHidden(), 0);
	assert.strictEqual(aDifferentView.getWorkViewShown(), 1);

	jsClient.showView(aView);
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewHidden(), 1);
	assert.strictEqual(aView.getWorkViewShown(), 2);
	assert.strictEqual(aDifferentView.getActive(), false);
	assert.strictEqual(aDifferentView.getWorkViewHidden(), 1);
	assert.strictEqual(aDifferentView.getWorkViewShown(), 1);
});
QUnit.test("testAddGuiItem", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	var openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	var aView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), undefined);

	jsClient.addGuiItem(aView);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), aView);

	var aDifferentView = CORATEST.managedGuiItemSpy();

	jsClient.addGuiItem(aDifferentView);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(1), aDifferentView);
});

QUnit.test("hideAndRemoveView", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	var mainView = jsClient.getView();

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	var aView = CORATEST.managedGuiItemSpy();
	jsClient.showView(aView);

	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());

	jsClient.hideAndRemoveView(aView);
	assert.strictEqual(jsClientView.getRemovedWorkView(0), aView.getWorkView());
});
QUnit.test("testViewRemoved", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	var aView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewShown(), 0);

	jsClient.showView(aView);
	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aView.getWorkViewHidden(), 0);

	var aDifferentView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aDifferentView.getActive(), false);

	jsClient.showView(aDifferentView);
	assert.strictEqual(jsClientView.getAddedWorkView(1), aDifferentView.getWorkView());
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewHidden(), 1);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aDifferentView.getActive(), true);
	assert.strictEqual(aDifferentView.getWorkViewHidden(), 0);
	assert.strictEqual(aDifferentView.getWorkViewShown(), 1);

	var aThirdView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aThirdView.getActive(), false);
	jsClient.showView(aThirdView);
	assert.strictEqual(jsClientView.getAddedWorkView(2), aThirdView.getWorkView());

	jsClient.showView(aDifferentView);
	jsClient.viewRemoved(aThirdView);

	jsClient.viewRemoved(aDifferentView);
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewHidden(), 1);
	assert.strictEqual(aView.getWorkViewShown(), 2);

	jsClient.viewRemoved(aView);
	assert.strictEqual(aView.getActive(), false);
});

QUnit.test("getMetadataIdForRecordTypeIsPassedOnToRecordProvider", function(assert) {
	this.dependencies.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	var recordTypeListData = CORATEST.recordTypeList;

	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var metadata = jsClient.getMetadataForRecordTypeId("textSystemOne");

	assert.strictEqual(this.dependencies.recordTypeProvider.getFetchedMetadataByRecordTypeId(0),
			"textSystemOne");
	assert.strictEqual(metadata, this.dependencies.recordTypeProvider
			.getMetadataByRecordTypeId("textSystemOne"));
});

QUnit.test("testAfterLogin", function(assert) {
	this.dependencies.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	jsClient.afterLogin();
	assert.strictEqual(this.dependencies.recordTypeProvider.getCallWhenReloadedMethod(),
			jsClient.afterRecordTypeProviderReload);
});

QUnit.test("testAfterLogout", function(assert) {
	this.dependencies.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	jsClient.afterLogout();
	assert.strictEqual(this.dependencies.recordTypeProvider.getCallWhenReloadedMethod(),
			jsClient.afterRecordTypeProviderReload);
});

QUnit.test("testAfterRecordTypeProviderReload", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getRecordTypesClearedNoOfTimes(), 0);
	jsClient.afterRecordTypeProviderReload();
	assert.strictEqual(jsClientView.getRecordTypesClearedNoOfTimes(), 1);

	var recordType = jsClientView.getRecordTypesView(0);
	function getIdFromRecord(record) {
		var cRecord = CORA.coraData(record.data);
		var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
		return cRecordInfo.getFirstAtomicValueByNameInData("id");
	}

	var dependencies = this.dependencies;
	var spec = this.spec;

	function assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(number, id) {
		var factoredRecordTypeHandler = dependencies.recordTypeHandlerFactory.getFactored(number);
		assert.strictEqual(factoredRecordTypeHandler.getView(), jsClientView
				.getRecordTypesView(number - 19));
		var factoredSpec = dependencies.recordTypeHandlerFactory.getSpec(number);
		assert.strictEqual(factoredSpec.baseUrl, spec.baseUrl);
		assert.strictEqual(getIdFromRecord(factoredSpec.recordTypeRecord), id);
	}

	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(19, "metadata");
	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(21, "metadataCollectionItem");
	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(26, "presentation");
	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(27, "presentationVar");
	assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(37, "recordType");
});

QUnit.test("testOpenRecordUsingReadLink", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var readLink = {};
	var openInfo = {
		"readLink" : readLink,
		"loadInBackground" : "false"
	};
	jsClient.openRecordUsingReadLink(openInfo);

	var recordHandlerSpec = this.dependencies.factories.recordHandlerFactory.getSpec(0);
	assert.strictEqual(recordHandlerSpec.fetchLatestDataFromServer, "true");
	assert.strictEqual(recordHandlerSpec.partOfList, "false");
	assert.strictEqual(recordHandlerSpec.createNewRecord, "false");
	assert.strictEqual(recordHandlerSpec.record.actionLinks.read, readLink);
	assert.strictEqual(recordHandlerSpec.jsClient, jsClient);

	var openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	var recordHandler = this.dependencies.factories.recordHandlerFactory.getFactored(0);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), recordHandler
			.getManagedGuiItem());

	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	assert.strictEqual(jsClientView.getAddedWorkView(0), recordHandler.getManagedGuiItem()
			.getWorkView());
});

QUnit.test("testOpenRecordUsingReadLinkInBackground", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var readLink = {
		"requestMethod" : "GET",
		"rel" : "read",
		"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
		"accept" : "application/vnd.uub.record+json"
	};
	var openInfo = {
		"readLink" : readLink,
		"loadInBackground" : "true"
	};
	jsClient.openRecordUsingReadLink(openInfo);

	var recordHandlerSpec = this.dependencies.factories.recordHandlerFactory.getSpec(0);
	assert.strictEqual(recordHandlerSpec.fetchLatestDataFromServer, "true");
	assert.strictEqual(recordHandlerSpec.partOfList, "false");
	assert.strictEqual(recordHandlerSpec.createNewRecord, "false");
	assert.strictEqual(recordHandlerSpec.record.actionLinks.read, readLink);
	assert.strictEqual(recordHandlerSpec.jsClient, jsClient);

	var openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	var recordHandler = this.dependencies.factories.recordHandlerFactory.getFactored(0);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), recordHandler
			.getManagedGuiItem());

	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
});

QUnit.test("testReloadProviders", function(assert) {
	this.dependencies.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.dependencies.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.searchProvider = CORATEST.searchProviderSpy();

	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(this.dependencies.metadataProvider.getNoOfReloads(), 0);
	assert.strictEqual(this.dependencies.textProvider.getNoOfReloads(), 0);
	assert.strictEqual(this.dependencies.recordTypeProvider.getNoOfReloads(), 0);
	assert.strictEqual(this.dependencies.searchProvider.getNoOfReloads(), 0);
	jsClient.reloadProviders(function() {
	});
	assert.strictEqual(this.dependencies.metadataProvider.getNoOfReloads(), 1);
	assert.strictEqual(this.dependencies.textProvider.getNoOfReloads(), 1);
	assert.strictEqual(this.dependencies.recordTypeProvider.getNoOfReloads(), 1);
	assert.strictEqual(this.dependencies.searchProvider.getNoOfReloads(), 1);
});

QUnit.test("testReloadProvidersCallWhenReloaded", function(assert) {
	this.dependencies.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.dependencies.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.searchProvider = CORATEST.searchProviderSpy();

	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getReloadingProviders(), false);

	jsClient.reloadProviders();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.dependencies.metadataProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.dependencies.textProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.dependencies.recordTypeProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.dependencies.searchProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), false);

	jsClient.reloadProviders();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.dependencies.searchProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.dependencies.recordTypeProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.dependencies.textProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.dependencies.metadataProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), false);

});

QUnit.test("testReloadProvidersOnlyOneOngoingReload", function(assert) {
	this.dependencies.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.dependencies.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.searchProvider = CORATEST.searchProviderSpy();

	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var called = 0;
	var callWhenReloaded = function() {
		called++;
	}
	assert.strictEqual(this.dependencies.metadataProvider.getNoOfReloads(), 0);
	jsClient.reloadProviders(callWhenReloaded);
	assert.strictEqual(this.dependencies.metadataProvider.getNoOfReloads(), 1);
	jsClient.reloadProviders(callWhenReloaded);
	assert.strictEqual(this.dependencies.metadataProvider.getNoOfReloads(), 1);

	this.dependencies.metadataProvider.callWhenReloadedMethod();
	this.dependencies.textProvider.callWhenReloadedMethod();
	this.dependencies.recordTypeProvider.callWhenReloadedMethod();
	this.dependencies.searchProvider.callWhenReloadedMethod();

	jsClient.reloadProviders(callWhenReloaded);
	assert.strictEqual(this.dependencies.metadataProvider.getNoOfReloads(), 2);
});

QUnit.test("testReloadProvidersReloadsManagedGuiItem", function(assert) {
	this.dependencies.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.textProvider = CORATEST.textProviderSpy();
	this.dependencies.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.searchProvider = CORATEST.searchProviderSpy();
	
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var aGuiItem = CORATEST.managedGuiItemSpy();
	jsClient.showView(aGuiItem);
	var aGuiItem2 = CORATEST.managedGuiItemSpy();
	jsClient.showView(aGuiItem2);
	
	jsClient.reloadProviders();
	this.dependencies.metadataProvider.callWhenReloadedMethod();
	this.dependencies.textProvider.callWhenReloadedMethod();
	this.dependencies.recordTypeProvider.callWhenReloadedMethod();
	this.dependencies.searchProvider.callWhenReloadedMethod();

	assert.strictEqual(aGuiItem.getReloadForMetadataChanges(), 1);
	assert.strictEqual(aGuiItem2.getReloadForMetadataChanges(), 1);
});
