/*
 * Copyright 2016, 2019 Uppsala University Library
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

QUnit.module("jsClient/jsClientTest.js", {
	beforeEach: function() {
		this.record = CORATEST.recordTypeList.dataList.data[4].record;
		this.createRecordHandlerViewFactory = function() {
			return {
				factor: function(recordHandlerViewSpec) {
					return CORA.recordHandlerView(recordHandlerViewSpec);
				}
			};
		};

		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		this.loginManagerFactory = CORATEST.loginManagerFactorySpy();
		this.recordHandlerFactory = CORATEST.standardFactorySpy("recordHandlerSpy");
		this.globalFactories = {
			ajaxCallFactory: this.ajaxCallFactorySpy,
			loginManagerFactory: this.loginManagerFactory,
			recordHandlerFactory: this.recordHandlerFactory
		};

		this.metadataProvider = CORATEST.metadataProviderRealStub();
		this.textProvider = CORATEST.textProviderSpy();
		this.searchProvider = CORATEST.searchProviderSpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.clientInstanceProvider = CORATEST.clientInstanceProviderSpy();

		let recordTypeHandlerFactory = CORATEST.standardFactorySpy("recordTypeHandlerSpy");

		let providers = {
			metadataProvider: this.metadataProvider,
			textProvider: this.textProvider,
			searchProvider: this.searchProvider,
			recordTypeProvider: this.recordTypeProvider,
		};

		let menuDependencies = {
			recordTypeHandlerFactory: recordTypeHandlerFactory
		};
		let menuSpec = {
			baseUrl: "http://epc.ub.uu.se/cora/rest/"
		};
		let recordTypeMenu = CORA.recordTypeMenu(providers, menuDependencies, menuSpec);

		this.recordTypeMenu = recordTypeMenu;
		this.dependencies = {
			providers: providers,
			globalInstances: {
				clientInstanceProvider: this.clientInstanceProvider
			},
			globalFactories: this.globalFactories,
			presentationFactoryFactory: "not implemented yet",
			jsClientViewFactory: CORATEST.standardFactorySpy("jsClientViewSpy"),
			searchRecordHandlerFactory: CORATEST.standardFactorySpy("searchRecordHandlerSpy"),
			managedGuiItemFactory: CORATEST.standardFactorySpy("managedGuiItemSpy"),
			openGuiItemHandlerFactory: CORATEST.standardFactorySpy("openGuiItemHandlerSpy"),
			recordTypeHandlerFactory: recordTypeHandlerFactory,
			uploadManager: CORATEST.uploadManagerSpy(),
			recordTypeMenu: this.recordTypeMenu
		}
		this.spec = {
			name: "The Client",
			baseUrl: "http://epc.ub.uu.se/cora/rest/",
			appTokenBaseUrl: "someAppTokenBaseUrl/"
		};

	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(jsClient.type, "jsClient");
});

QUnit.test("testJsClientSetInInstanceProvider", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(this.clientInstanceProvider.getJsClient(), jsClient);
});

function getIdFromRecord(record) {
	let cRecord = CORA.coraData(record.data);
	let cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
	return cRecordInfo.getFirstAtomicValueByNameInData("id");
}

QUnit.test("testGetDependencies", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(jsClient.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(jsClient.getSpec(), this.spec);
});

QUnit.test("testViewSpec", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientViewSpec = this.dependencies.jsClientViewFactory.getSpec(0);

	assert.strictEqual(jsClientViewSpec.name, this.spec.name);
	assert.strictEqual(jsClientViewSpec.serverAddress, this.spec.baseUrl);
	assert.strictEqual(jsClientViewSpec.reloadProvidersMethod, jsClient.reloadProviders);
	assert.strictEqual(jsClientViewSpec.setLanguageMethod, jsClient.setCurrentLang);
});

QUnit.test("testGetView", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = jsClient.getView();
	let jsClientViewFactory = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView, jsClientViewFactory.getView());
});

QUnit.test("testUploadManagerAddedToView", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedGlobalView(0), this.dependencies.uploadManager
		.getManagedGuiItem().getMenuView());
});

QUnit.test("testInitCreatesALoginManager",
	function(assert) {
		let jsClient = CORA.jsClient(this.dependencies, this.spec);
		let factored = this.loginManagerFactory.getFactored(0);
		assert.ok(factored !== undefined);
		assert.strictEqual(this.loginManagerFactory.getSpec(0).afterLoginMethod,
			jsClient.afterLogin);
		assert.strictEqual(this.loginManagerFactory.getSpec(0).afterLogoutMethod,
			jsClient.afterLogout);
		assert.strictEqual(this.loginManagerFactory.getSpec(0).baseUrl, this.spec.baseUrl);
		assert.strictEqual(this.loginManagerFactory.getSpec(0).appTokenBaseUrl,
			"someAppTokenBaseUrl/");
		assert.strictEqual(this.loginManagerFactory.getSpec(0).jsClient, jsClient);

		assert.strictEqual(this.dependencies.globalInstances.loginManager, factored);

	});

QUnit.test("testInitCreatesALoginManagerAndAddsItsHtmlToTheHeader", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getLoginManagerView(0).className, "loginManagerSpy");
});

QUnit.test("testInitCreatesAOpenGuiItemHandler", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let factored = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	assert.strictEqual(factored.type, "openGuiItemHandlerSpy");
});

QUnit.test("testInitAddsItsOpenGuiItemHandlerToView", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandlerView = this.dependencies.openGuiItemHandlerFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedOpenGuiItemHandlerView(0), openGuiItemHandlerView
		.getView());
});

QUnit.test("testSearchProviderIsCalledWithPublicSearchGroupId", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(this.searchProvider.getGroupId(), "publicSearch");
});

QUnit.test("initFactoresSearchRecordHandlersAndAddsToView", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	CORATEST.assertSearchesHasBeenLoadedCorrectly(assert, this, jsClient, 0);
});

CORATEST.assertSearchesHasBeenLoadedCorrectly = function(assert, test, jsClient,
	noOfPreviousReloads) {
	let extra = noOfPreviousReloads * 3;
	/**
	 * searches in searchProviderSpy returned when asked for any group:<br> + coraTextSearch,
	 * searchGroup=publicSearch, searchLink=true<br> + someSearch, searchGroup=publicSearch,
	 * searchLink=true<br> + metadataItemCollectionSearch, searchGroup=autocomplete,
	 * searchLink=true<br> - searchWithoutSearchLink, searchGroup=publicSearch, searchLink=false<br>
	 */
	let jsClientView = test.dependencies.jsClientViewFactory.getFactored(0);

	let addedSearchRecordHandlerView = jsClientView.getSearchesView(0);
	let factoredSearchRecordHandler = test.dependencies.searchRecordHandlerFactory
		.getFactored(0 + extra);
	assert.strictEqual(addedSearchRecordHandlerView, factoredSearchRecordHandler.getView());
	let factoredSpec = test.dependencies.searchRecordHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.baseUrl, test.spec.baseUrl);
	assert.strictEqual(factoredSpec.jsClient, jsClient);

	let addedSearchRecordHandlerView2 = jsClientView.getSearchesView(1);
	let factoredSearchRecordHandler2 = test.dependencies.searchRecordHandlerFactory
		.getFactored(1 + extra);
	assert.strictEqual(addedSearchRecordHandlerView2, factoredSearchRecordHandler2.getView());
	let factoredSpec2 = test.dependencies.searchRecordHandlerFactory.getSpec(1);
	assert.strictEqual(factoredSpec2.baseUrl, test.spec.baseUrl);

	let addedSearchRecordHandlerView3 = jsClientView.getSearchesView(2);
	let factoredSearchRecordHandler3 = test.dependencies.searchRecordHandlerFactory
		.getFactored(2 + extra);
	assert.strictEqual(addedSearchRecordHandlerView3, factoredSearchRecordHandler3.getView());
	let factoredSpec3 = test.dependencies.searchRecordHandlerFactory.getSpec(2);
	assert.strictEqual(factoredSpec3.baseUrl, test.spec.baseUrl);

	let lastHandlerShouldNotBeFactoredNoSearchLink = test.dependencies.searchRecordHandlerFactory
		.getFactored(6);
	assert.strictEqual(lastHandlerShouldNotBeFactoredNoSearchLink, undefined);
}

QUnit.test("initFactoresRecordTypeHandlersAndAddsToViewIfRecordTypeHasActions",
	function(assert) {

		let jsClient = CORA.jsClient(this.dependencies, this.spec);
		let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

		let dependencies = this.dependencies;
		let spec = this.spec;

		function assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(factored,
			group, number, id) {
			let factoredRecordTypeHandler = dependencies.recordTypeHandlerFactory
				.getFactored(factored);

			let groupOfGroups = jsClientView.getGroupOfRecordTypes(group);
			assert.strictEqual(factoredRecordTypeHandler.getView(),
				groupOfGroups.children[number]);

			let factoredSpec = dependencies.recordTypeHandlerFactory.getSpec(factored);
			assert.strictEqual(factoredSpec.jsClient, jsClient);
			assert.strictEqual(factoredSpec.baseUrl, spec.baseUrl);
			assert.strictEqual(getIdFromRecord(factoredSpec.recordTypeRecord), id);
		}

		assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(0, 0, 1, "metadata");
		assertFactoredRecordTypeHandlerAddsViewHasCorrectBaseUrlAndHasId(1, 0, 2,
			"presentationVar");
	});

QUnit.test("initFactoresRecordTypeHandlersAsGroupsAndAddsToViewIfRecordTypeHasActions", function(
	assert) {
	CORA.jsClient(this.dependencies, this.spec);

	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let firstGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(0);
	assert.notEqual(firstGroupOfRecordTypes, undefined);
	assert.strictEqual(firstGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(firstGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
	assert.strictEqual(firstGroupOfRecordTypes.firstChild.innerHTML,
		"translated_typeOfResourceItemText");
	let childrenOfGroup1 = firstGroupOfRecordTypes.children;
	assert.strictEqual(childrenOfGroup1.length, 3);

	let secondGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(1);
	assert.notEqual(secondGroupOfRecordTypes, undefined);
	assert.strictEqual(secondGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(secondGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
	assert.strictEqual(secondGroupOfRecordTypes.firstChild.innerHTML,
		"translated_authorityItemText");
	let childrenOfGroup2 = secondGroupOfRecordTypes.children;
	assert.strictEqual(childrenOfGroup2.length, 3);

	let thirdGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(2);
	assert.strictEqual(thirdGroupOfRecordTypes, undefined);
});

QUnit.test("initFactoresRecordTypeHandlersAsGroupsAndAddsToViewIfRecordTypeHasNoActions", function(
	assert) {
	let spySpec = {
		returnFalseForAnyAction: true
	};
	this.dependencies.recordTypeHandlerFactory.setSpySpec(spySpec);

	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	let firstGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(0);
	assert.notEqual(firstGroupOfRecordTypes, undefined);
	assert.strictEqual(firstGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(firstGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
	assert.strictEqual(firstGroupOfRecordTypes.firstChild.innerHTML,
		"translated_typeOfResourceItemText");
	let childrenOfGroup1 = firstGroupOfRecordTypes.children;
	assert.strictEqual(childrenOfGroup1.length, 1);

	let secondGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(1);
	assert.notEqual(secondGroupOfRecordTypes, undefined);
	assert.strictEqual(secondGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(secondGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
	assert.strictEqual(secondGroupOfRecordTypes.firstChild.innerHTML,
		"translated_authorityItemText");
	let childrenOfGroup2 = secondGroupOfRecordTypes.children;
	assert.strictEqual(childrenOfGroup2.length, 1);

	let thirdGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(2);
	assert.strictEqual(thirdGroupOfRecordTypes, undefined);
});

QUnit.test("requestGroupsOfRecordTypes", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.providers.recordTypeProvider.getRequestedGroupId(0),
		"typeOfResource");
	assert.strictEqual(this.dependencies.providers.recordTypeProvider.getRequestedGroupId(1),
		"authority");

});

QUnit.test("initFactoresRecordTypeHandlersNotAddedToViewIfRecordTypeWithoutActions", function(
	assert) {
	let spySpec = {
		returnFalseForAnyAction: true
	};
	this.dependencies.recordTypeHandlerFactory.setSpySpec(spySpec);

	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getRecordTypesView(0), undefined);
});

QUnit.test("showView", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	let aView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewShown(), 0);

	jsClient.showView(aView);
	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aView.getWorkViewHidden(), 0);

	let aDifferentView = CORATEST.managedGuiItemSpy();
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
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	let aView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), undefined);

	jsClient.addGuiItem(aView);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), aView);

	let aDifferentView = CORATEST.managedGuiItemSpy();

	jsClient.addGuiItem(aDifferentView);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(1), aDifferentView);
});

QUnit.test("hideAndRemoveView", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	let aView = CORATEST.managedGuiItemSpy();
	jsClient.showView(aView);

	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());

	jsClient.hideAndRemoveView(aView);
	assert.strictEqual(jsClientView.getRemovedWorkView(0), aView.getWorkView());
});
QUnit.test("testViewRemoved", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	let aView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewShown(), 0);

	jsClient.showView(aView);
	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aView.getWorkViewHidden(), 0);

	let aDifferentView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aDifferentView.getActive(), false);

	jsClient.showView(aDifferentView);
	assert.strictEqual(jsClientView.getAddedWorkView(1), aDifferentView.getWorkView());
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewHidden(), 1);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aDifferentView.getActive(), true);
	assert.strictEqual(aDifferentView.getWorkViewHidden(), 0);
	assert.strictEqual(aDifferentView.getWorkViewShown(), 1);

	let aThirdView = CORATEST.managedGuiItemSpy();
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
	this.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.providers.recordTypeProvider = this.recordTypeProvider;

	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let metadata = jsClient.getMetadataForRecordTypeId("textSystemOne");

	assert
		.strictEqual(this.recordTypeProvider.getFetchedMetadataByRecordTypeId(0),
			"textSystemOne");
	assert
		.strictEqual(metadata, this.recordTypeProvider
			.getMetadataByRecordTypeId("textSystemOne"));
});

QUnit.test("testAfterLogin", function(assert) {
	this.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.searchProvider = CORATEST.searchProviderSpy();
	this.dependencies.providers.recordTypeProvider = this.recordTypeProvider;
	this.dependencies.providers.searchProvider = this.searchProvider;
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	jsClient.afterLogin();
	assert.strictEqual(this.recordTypeProvider.getCallWhenReloadedMethod(),
		jsClient.afterRecordTypeProviderReload);
	assert.strictEqual(this.searchProvider.getCallWhenReloadedMethod(),
		jsClient.afterSearchProviderReload);
});

QUnit.test("testAfterLogout", function(assert) {
	this.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.searchProvider = CORATEST.searchProviderSpy();
	this.dependencies.providers.recordTypeProvider = this.recordTypeProvider;
	this.dependencies.providers.searchProvider = this.searchProvider;
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	jsClient.afterLogout();
	assert.strictEqual(this.recordTypeProvider.getCallWhenReloadedMethod(),
		jsClient.afterRecordTypeProviderReload);
	assert.strictEqual(this.searchProvider.getCallWhenReloadedMethod(),
		jsClient.afterSearchProviderReload);
});

QUnit.test("testAfterReloadRecordTypeHandlersAsGroupsAndAddsToViewIfRecordTypeHasActions",
	function(assert) {
		let jsClient = CORA.jsClient(this.dependencies, this.spec);
		let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

		assert.strictEqual(jsClientView.getRecordTypesClearedNoOfTimes(), 0);
		CORATEST.assertRecordTypesHasBeenLoadedCorrectly(assert, this, jsClient, 0);

		jsClient.afterRecordTypeProviderReload();

		assert.strictEqual(jsClientView.getRecordTypesClearedNoOfTimes(), 1);
		CORATEST.assertRecordTypesHasBeenLoadedCorrectly(assert, this, jsClient, 1);
	});

CORATEST.assertRecordTypesHasBeenLoadedCorrectly = function(assert, test, jsClient,
	noOfPreviousReloads) {
	let extra = noOfPreviousReloads * 2;
	let jsClientView = test.dependencies.jsClientViewFactory.getFactored(0);

	let firstGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(0 + extra);
	assert.notEqual(firstGroupOfRecordTypes, undefined);
	assert.strictEqual(firstGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(firstGroupOfRecordTypes.firstChild.className,
		"recordTypeGroupHeadline");
	assert.strictEqual(firstGroupOfRecordTypes.firstChild.innerHTML,
		"translated_typeOfResourceItemText");
	let childrenOfGroup1 = firstGroupOfRecordTypes.children;
	assert.strictEqual(childrenOfGroup1.length, 3);

	let secondGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(1 + extra);
	assert.notEqual(secondGroupOfRecordTypes, undefined);
	assert.strictEqual(secondGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(secondGroupOfRecordTypes.firstChild.className,
		"recordTypeGroupHeadline");
	assert.strictEqual(secondGroupOfRecordTypes.firstChild.innerHTML,
		"translated_authorityItemText");
	let childrenOfGroup2 = secondGroupOfRecordTypes.children;
	assert.strictEqual(childrenOfGroup2.length, 3);

	let thirdGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(2 + extra);
	assert.strictEqual(thirdGroupOfRecordTypes, undefined);
}
QUnit.test("testAfterReloadSearchProviderViewIsReloaded", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getSearchesClearedNoOfTimes(), 0);
	jsClient.afterSearchProviderReload();
	assert.strictEqual(jsClientView.getSearchesClearedNoOfTimes(), 1);

	CORATEST.assertSearchesHasBeenLoadedCorrectly(assert, this, jsClient, 1);
});

QUnit.test("testOpenRecordUsingReadLink", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let readLink = {};
	let openInfo = {
		readLink: readLink,
		loadInBackground: "false"
	};
	jsClient.openRecordUsingReadLink(openInfo);

	let recordHandlerSpec = this.recordHandlerFactory.getSpec(0);
	assert.strictEqual(recordHandlerSpec.fetchLatestDataFromServer, "true");
	assert.strictEqual(recordHandlerSpec.partOfList, "false");
	assert.strictEqual(recordHandlerSpec.createNewRecord, "false");
	assert.strictEqual(recordHandlerSpec.record.actionLinks.read, readLink);
	assert.strictEqual(recordHandlerSpec.jsClient, jsClient);

	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let recordHandler = this.recordHandlerFactory.getFactored(0);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), recordHandler
		.getManagedGuiItem());

	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	assert.strictEqual(jsClientView.getAddedWorkView(0), recordHandler.getManagedGuiItem()
		.getWorkView());
});

QUnit.test("testOpenRecordUsingReadLinkInBackground", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let readLink = {
		requestMethod: "GET",
		rel: "read",
		url: "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
		accept: "application/vnd.uub.record+json"
	};
	let openInfo = {
		readLink: readLink,
		loadInBackground: "true"
	};
	jsClient.openRecordUsingReadLink(openInfo);

	let recordHandlerSpec = this.recordHandlerFactory.getSpec(0);
	assert.strictEqual(recordHandlerSpec.fetchLatestDataFromServer, "true");
	assert.strictEqual(recordHandlerSpec.partOfList, "false");
	assert.strictEqual(recordHandlerSpec.createNewRecord, "false");
	assert.strictEqual(recordHandlerSpec.record.actionLinks.read, readLink);
	assert.strictEqual(recordHandlerSpec.jsClient, jsClient);

	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let recordHandler = this.recordHandlerFactory.getFactored(0);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), recordHandler
		.getManagedGuiItem());

	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
});

QUnit.test("testReloadProviders", function(assert) {
	this.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.providers.metadataProvider = this.metadataProvider;
	this.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.providers.recordTypeProvider = this.recordTypeProvider;

	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	assert.strictEqual(this.metadataProvider.getNoOfReloads(), 0);
	assert.strictEqual(this.textProvider.getNoOfReloads(), 0);
	assert.strictEqual(this.recordTypeProvider.getNoOfReloads(), 0);
	assert.strictEqual(this.searchProvider.getNoOfReloads(), 0);
	jsClient.reloadProviders(function() {
	});
	assert.strictEqual(this.metadataProvider.getNoOfReloads(), 1);
	assert.strictEqual(this.textProvider.getNoOfReloads(), 1);
	assert.strictEqual(this.recordTypeProvider.getNoOfReloads(), 1);
	assert.strictEqual(this.searchProvider.getNoOfReloads(), 1);
});

QUnit.test("testReloadProvidersCallWhenReloaded", function(assert) {
	this.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.providers.metadataProvider = this.metadataProvider;
	this.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.providers.recordTypeProvider = this.recordTypeProvider;

	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getReloadingProviders(), false);

	jsClient.reloadProviders();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.metadataProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.textProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.recordTypeProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.searchProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), false);

	jsClient.reloadProviders();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.searchProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.recordTypeProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.textProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), true);
	this.metadataProvider.callWhenReloadedMethod();
	assert.strictEqual(jsClientView.getReloadingProviders(), false);

});

QUnit.test("testReloadProvidersOnlyOneOngoingReload", function(assert) {
	this.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.providers.metadataProvider = this.metadataProvider;
	this.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.providers.recordTypeProvider = this.recordTypeProvider;

	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let called = 0;
	let callWhenReloaded = function() {
		called++;
	}
	assert.strictEqual(this.metadataProvider.getNoOfReloads(), 0);
	jsClient.reloadProviders(callWhenReloaded);
	assert.strictEqual(this.metadataProvider.getNoOfReloads(), 1);
	jsClient.reloadProviders(callWhenReloaded);
	assert.strictEqual(this.metadataProvider.getNoOfReloads(), 1);

	this.metadataProvider.callWhenReloadedMethod();
	this.textProvider.callWhenReloadedMethod();
	this.recordTypeProvider.callWhenReloadedMethod();
	this.searchProvider.callWhenReloadedMethod();

	jsClient.reloadProviders(callWhenReloaded);
	assert.strictEqual(this.metadataProvider.getNoOfReloads(), 2);
});

QUnit.test("testReloadProvidersReloadsManagedGuiItem", function(assert) {
	this.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.providers.metadataProvider = this.metadataProvider;
	this.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.providers.recordTypeProvider = this.recordTypeProvider;

	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let aGuiItem = CORATEST.managedGuiItemSpy();
	jsClient.showView(aGuiItem);
	let aGuiItem2 = CORATEST.managedGuiItemSpy();
	jsClient.showView(aGuiItem2);

	jsClient.reloadProviders();
	this.metadataProvider.callWhenReloadedMethod();
	this.textProvider.callWhenReloadedMethod();
	this.recordTypeProvider.callWhenReloadedMethod();
	this.searchProvider.callWhenReloadedMethod();

	assert.strictEqual(aGuiItem.getReloadForMetadataChanges(), 1);
	assert.strictEqual(aGuiItem2.getReloadForMetadataChanges(), 1);
});

QUnit.test("testReloadProvidersReloadsRecordTypesAndSearches", function(assert) {
	this.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.providers.metadataProvider = this.metadataProvider;
	this.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.providers.recordTypeProvider = this.recordTypeProvider;

	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getRecordTypesClearedNoOfTimes(), 0);
	CORATEST.assertRecordTypesHasBeenLoadedCorrectly(assert, this, jsClient, 0);
	assert.strictEqual(jsClientView.getSearchesClearedNoOfTimes(), 0);
	CORATEST.assertSearchesHasBeenLoadedCorrectly(assert, this, jsClient, 0);

	jsClient.reloadProviders();
	this.metadataProvider.callWhenReloadedMethod();
	this.textProvider.callWhenReloadedMethod();
	this.recordTypeProvider.callWhenReloadedMethod();
	this.searchProvider.callWhenReloadedMethod();

	assert.strictEqual(jsClientView.getRecordTypesClearedNoOfTimes(), 1);
	CORATEST.assertRecordTypesHasBeenLoadedCorrectly(assert, this, jsClient, 1);
	assert.strictEqual(jsClientView.getSearchesClearedNoOfTimes(), 1);
	CORATEST.assertSearchesHasBeenLoadedCorrectly(assert, this, jsClient, 1);
});

QUnit.test("testSetCurrentLangReloadsManagedGuiItem", function(assert) {
	this.metadataProvider = CORATEST.metadataProviderSpy();
	this.dependencies.providers.metadataProvider = this.metadataProvider;
	this.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	this.dependencies.providers.recordTypeProvider = this.recordTypeProvider;

	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let aGuiItem = CORATEST.managedGuiItemSpy();
	jsClient.showView(aGuiItem);
	let aGuiItem2 = CORATEST.managedGuiItemSpy();
	jsClient.showView(aGuiItem2);

	jsClient.setCurrentLang("en");

	assert.strictEqual(this.textProvider.getSetCurrentLang(0), "en");

	assert.strictEqual(aGuiItem.getReloadForMetadataChanges(), 1);
	assert.strictEqual(aGuiItem2.getReloadForMetadataChanges(), 1);
});
