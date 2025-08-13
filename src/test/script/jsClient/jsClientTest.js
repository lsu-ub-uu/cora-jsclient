/*
 * Copyright 2016, 2019, 2024, 2025 Uppsala University Library
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

QUnit.module("jsClient/jsClientTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
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
			recordHandlerFactory: this.recordHandlerFactory,
			managedGuiItemFactory: CORATEST.standardFactorySpy("managedGuiItemSpy")
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
			recordTypeMenu: this.recordTypeMenu,
			definitionViewerFactory: CORATEST.standardFactorySpy("definitionViewerSpy"),
			recursiveDeleteFactory: CORATEST.standardFactorySpy("recursiveDeleteSpy")

		}
		this.spec = {
			name: "The Client",
			baseUrl: "http://epc.ub.uu.se/cora/rest/",
			loginBaseUrl: "someAppTokenBaseUrl/"
		};
		let addedEvents = [];
		this.addedEvents = addedEvents;
		this.addEvent = function(type, listener, useCapture) {
			addedEvents.push({
				type: type,
				listener: listener,
				useCapture: useCapture
			});
		}
		this.oldAddEventListener = document.addEventListener;
		document.addEventListener = this.addEvent;


	},
	afterEach: function() {
		document.addEventListener = this.oldAddEventListener;
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

QUnit.test("testInitCreatesALoginManager", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let factored = this.loginManagerFactory.getFactored(0);
	let loginManagerSpec = this.loginManagerFactory.getSpec(0);

	assert.strictEqual(loginManagerSpec.afterLoginMethod, jsClient.afterLogin);
	assert.strictEqual(loginManagerSpec.afterLogoutMethod, jsClient.afterLogout);
	assert.strictEqual(loginManagerSpec.setInfoMessage, jsClientView.addInfoMessage);
	assert.strictEqual(loginManagerSpec.setErrorMessage, jsClientView.addErrorMessage);

	assert.strictEqual(loginManagerSpec.baseUrl, this.spec.baseUrl);
	assert.strictEqual(loginManagerSpec.loginBaseUrl, "someAppTokenBaseUrl/");
	assert.strictEqual(loginManagerSpec.jsClient, jsClient);

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
	assert.notEqual(thirdGroupOfRecordTypes, undefined);
	assert.strictEqual(thirdGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(thirdGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
	assert.strictEqual(thirdGroupOfRecordTypes.firstChild.innerHTML,
		"translated_testItemText");

	let fourthGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(3);
	assert.strictEqual(fourthGroupOfRecordTypes, undefined);
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
	assert.notEqual(thirdGroupOfRecordTypes, undefined);
	assert.strictEqual(thirdGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(thirdGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
	assert.strictEqual(thirdGroupOfRecordTypes.firstChild.innerHTML,
		"translated_testItemText");

	let fourthGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(3);
	assert.strictEqual(fourthGroupOfRecordTypes, undefined);
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
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	let aView = CORATEST.managedGuiItemSpy();

	jsClient.showView(aView);
	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), aView);

	let aDifferentView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aDifferentView.getActive(), false);

	jsClient.showView(aDifferentView);
	assert.strictEqual(jsClientView.getAddedWorkView(1), aDifferentView.getWorkView());
	assert.strictEqual(openGuiItemHandler.getShowViewList(1), aDifferentView);

	jsClient.showView(aView);
	assert.strictEqual(openGuiItemHandler.getShowViewList(2), aView);
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

QUnit.test("testViewRemoved", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);


	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	let aView = CORATEST.managedGuiItemSpy();

	jsClient.showView(aView);
	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), aView);

	let aDifferentView = CORATEST.managedGuiItemSpy();

	jsClient.showView(aDifferentView);
	assert.strictEqual(jsClientView.getAddedWorkView(1), aDifferentView.getWorkView());
	assert.strictEqual(openGuiItemHandler.getShowViewList(1), aDifferentView);

	let aThirdView = CORATEST.managedGuiItemSpy();
	jsClient.showView(aThirdView);
	assert.strictEqual(openGuiItemHandler.getShowViewList(2), aThirdView);

	jsClient.showView(aDifferentView);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(3), undefined);
	assert.strictEqual(openGuiItemHandler.getShowViewList(3), aDifferentView);
	jsClient.viewRemoved(aThirdView);
	assert.strictEqual(openGuiItemHandler.getViewRemovedList(0), aThirdView);
	assert.strictEqual(jsClientView.getRemovedWorkView(0), aThirdView.getWorkView());


	jsClient.viewRemoved(aDifferentView);
	assert.strictEqual(openGuiItemHandler.getViewRemovedList(1), aDifferentView);
	assert.strictEqual(jsClientView.getRemovedWorkView(1), aDifferentView.getWorkView());

	jsClient.viewRemoved(aView);
	assert.strictEqual(openGuiItemHandler.getViewRemovedList(2), aView);
	assert.strictEqual(jsClientView.getRemovedWorkView(2), aView.getWorkView());
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
		CORATEST.assertRecordTypesHasBeenLoadedCorrectly2(assert, this, jsClient, 1);
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

//	let thirdGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(2 + extra);
//	assert.strictEqual(thirdGroupOfRecordTypes, undefined);

	let thirdGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(2 + extra);
	assert.notEqual(thirdGroupOfRecordTypes, undefined);
	assert.strictEqual(thirdGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(thirdGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
	assert.strictEqual(thirdGroupOfRecordTypes.firstChild.innerHTML,
		"translated_testItemText");

	let fourthGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(3 + extra);
	assert.strictEqual(fourthGroupOfRecordTypes, undefined);
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
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), recordHandler
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
		accept: "application/vnd.cora.record+json"
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
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), undefined);

	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
});

QUnit.test("testOpenDefinitionViewerForId", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);

	jsClient.openDefinitionViewerForId("someId");

	let definitionViewer = this.dependencies.definitionViewerFactory.getFactored(0);
	let id = this.dependencies.definitionViewerFactory.getSpec(0);

	assert.deepEqual(id, { id: "someId" });

	let managedGui = this.dependencies.globalFactories.managedGuiItemFactory.getFactored(0);
	let managedGuiSpec = managedGui.getSpec();

	assert.strictEqual(managedGuiSpec.activateMethod, jsClient.showView);
	assert.strictEqual(managedGuiSpec.removeMethod, jsClient.viewRemoved);
	assert.strictEqual(managedGuiSpec.callOnMetadataReloadMethod, definitionViewer.reloadForMetadataChanges);

	assert.deepEqual(managedGui.getAddedWorkPresentation(0), definitionViewer.getView());

	let menuPresentation = managedGui.getAddedMenuPresentation(0);
	assert.deepEqual(menuPresentation.tagName, "SPAN");
	assert.deepEqual(menuPresentation.className, "definitionViewer");
	assert.deepEqual(menuPresentation.innerHTML, "Definition viewer: someId");

	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), managedGui);
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), managedGui);

	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	assert.strictEqual(jsClientView.getAddedWorkView(0), managedGui.getWorkView());
});

QUnit.test("testOpenRecursiveDeleteForId", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);

	jsClient.openRecursiveDeleteForId("someId");

	let recursiveDelete = this.dependencies.recursiveDeleteFactory.getFactored(0);
	let id = this.dependencies.recursiveDeleteFactory.getSpec(0);

	assert.deepEqual(id, { id: "someId" });

	let managedGui = this.dependencies.globalFactories.managedGuiItemFactory.getFactored(0);
	let managedGuiSpec = managedGui.getSpec();

	assert.strictEqual(managedGuiSpec.activateMethod, jsClient.showView);
	assert.strictEqual(managedGuiSpec.removeMethod, jsClient.viewRemoved);

	assert.deepEqual(managedGui.getAddedWorkPresentation(0), recursiveDelete.getView());

	let menuPresentation = managedGui.getAddedMenuPresentation(0);
	assert.deepEqual(menuPresentation.tagName, "SPAN");
	assert.deepEqual(menuPresentation.className, "recursiveDelete");
	assert.deepEqual(menuPresentation.innerHTML, "Recursive delete: someId");

	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	assert.strictEqual(openGuiItemHandler.getAddedManagedGuiItem(0), managedGui);
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), managedGui);

	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	assert.strictEqual(jsClientView.getAddedWorkView(0), managedGui.getWorkView());
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
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	openGuiItemHandler.setGetItemList([aGuiItem, aGuiItem2]);


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
	CORATEST.assertRecordTypesHasBeenLoadedCorrectly2(assert, this, jsClient, 1);
	assert.strictEqual(jsClientView.getSearchesClearedNoOfTimes(), 1);
	CORATEST.assertSearchesHasBeenLoadedCorrectly(assert, this, jsClient, 1);
});
CORATEST.assertRecordTypesHasBeenLoadedCorrectly2 = function(assert, test, jsClient,
	noOfPreviousReloads) {
	let extra = noOfPreviousReloads * 2;
	let jsClientView = test.dependencies.jsClientViewFactory.getFactored(0);

	let firstGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(0 + extra);
	assert.notEqual(firstGroupOfRecordTypes, undefined);
	assert.strictEqual(firstGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(firstGroupOfRecordTypes.firstChild.className,
		"recordTypeGroupHeadline");
	assert.strictEqual(firstGroupOfRecordTypes.firstChild.innerHTML,
		"translated_testItemText");
	let childrenOfGroup1 = firstGroupOfRecordTypes.children;
	assert.strictEqual(childrenOfGroup1.length, 2);

	let secondGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(1 + extra);
	assert.notEqual(secondGroupOfRecordTypes, undefined);
	assert.strictEqual(secondGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(secondGroupOfRecordTypes.firstChild.className,
		"recordTypeGroupHeadline");
	assert.strictEqual(secondGroupOfRecordTypes.firstChild.innerHTML,
		"translated_typeOfResourceItemText");
	let childrenOfGroup2 = secondGroupOfRecordTypes.children;
	assert.strictEqual(childrenOfGroup2.length, 3);

//	let thirdGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(2 + extra);
//	assert.strictEqual(thirdGroupOfRecordTypes, undefined);

	let thirdGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(2 + extra);
	assert.notEqual(thirdGroupOfRecordTypes, undefined);
	assert.strictEqual(thirdGroupOfRecordTypes.className, "recordTypeGroup");
	assert.strictEqual(thirdGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
	assert.strictEqual(thirdGroupOfRecordTypes.firstChild.innerHTML,
		"translated_authorityItemText");

}
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
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	openGuiItemHandler.setGetItemList([aGuiItem, aGuiItem2]);

	jsClient.setCurrentLang("en");

	assert.strictEqual(this.textProvider.getSetCurrentLang(0), "en");

	assert.strictEqual(aGuiItem.getReloadForMetadataChanges(), 1);
	assert.strictEqual(aGuiItem2.getReloadForMetadataChanges(), 1);
});

QUnit.test("testAddedEventListener_forKeyDown", function(assert) {
	let jsClient = CORA.jsClient(this.dependencies, this.spec);

	let firstAddedListener = this.addedEvents[0];
	assert.strictEqual(firstAddedListener.type, "keydown");
	assert.strictEqual(firstAddedListener.listener, jsClient.onKeyDown);
	assert.strictEqual(firstAddedListener.useCapture, undefined);
});

QUnit.test("testOnKeyDown_forKey_altKey+s_noShowingGuiItem", function(assert) {
	let blurCalledBeforeSaveToSetValueOfCurrentSelect = false;
	let input = document.createElement("input");
	this.fixture.appendChild(input);
	input.addEventListener("blur", () => { blurCalledBeforeSaveToSetValueOfCurrentSelect = true; });
	input.focus();

	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "s";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(undefined);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(aView.getCallsToSendDataToServer(), 0);
	assert.true(blurCalledBeforeSaveToSetValueOfCurrentSelect);
});

QUnit.test("testOnKeyDown_forKey_altKey+s", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "s";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(aView);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(aView.getCallsToSendDataToServer(), 1);
});

QUnit.test("testOnKeyDown_forKey_altKey+r_noShowingGuiItem", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "r";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(undefined);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(aView.getCallsToReloadDataFromServer(), 0);
});

QUnit.test("testOnKeyDown_forKey_altKey+r", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "r";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(aView);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(aView.getCallsToReloadDataFromServer(), 1);
});

QUnit.test("testOnKeyDown_forKey_altKey+w_noShowingGuiItem", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "w";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(undefined);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(openGuiItemHandler.getViewRemovedList(0), undefined);
	assert.strictEqual(jsClientView.getRemovedWorkView(0), undefined);
});

QUnit.test("testOnKeyDown_forKey_altKey+w", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "w";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(aView);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(openGuiItemHandler.getViewRemovedList(0), aView);
	assert.strictEqual(jsClientView.getRemovedWorkView(0), aView.getWorkView());
});

QUnit.test("testOnKeyDown_forKey_altKey+ArrowRight_noShowingGuiItem", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowRight";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(undefined);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(aView.getNoCallsToToggleNextIndicator(), 0);
	assert.strictEqual(aView.getNoCallsToTogglePreviousIndicator(), 0);
});

QUnit.test("testOnKeyDown_forKey_altKey+ArrowRight_showingGuiItem", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowRight";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(aView);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(aView.getNoCallsToToggleNextIndicator(), 1);
	assert.strictEqual(aView.getNoCallsToTogglePreviousIndicator(), 0);
});

QUnit.test("testOnKeyDown_forKey_altKey+ArrowLeft_noShowingGuiItem", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowLeft";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(undefined);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(aView.getNoCallsToToggleNextIndicator(), 0);
	assert.strictEqual(aView.getNoCallsToTogglePreviousIndicator(), 0);
});

QUnit.test("testOnKeyDown_forKey_altKey+ArrowLeft_showingGuiItem", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowLeft";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetShowingGuiItem(aView);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(aView.getNoCallsToToggleNextIndicator(), 0);
	assert.strictEqual(aView.getNoCallsToTogglePreviousIndicator(), 1);
});



QUnit.test("testOnKeyDown_forKey_ctrlKey+altKey+ArrowUp", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowUp";
	eventSpy.ctrlKey = true;
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetPreviousGuiItem(aView);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(openGuiItemHandler.getCallsToMoveCurrentMenuViewUp(), 1);
	assert.strictEqual(openGuiItemHandler.getCallsToMoveCurrentMenuViewDown(), 0);
	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), undefined);
});

QUnit.test("testOnKeyDown_forKey_ctrlKey+altKey+ArrowDown", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowDown";
	eventSpy.ctrlKey = true;
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetPreviousGuiItem(aView);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());
	assert.strictEqual(openGuiItemHandler.getCallsToMoveCurrentMenuViewUp(), 0);
	assert.strictEqual(openGuiItemHandler.getCallsToMoveCurrentMenuViewDown(), 1);
	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), undefined);
});

QUnit.test("testOnKeyDown_forKey_altKey+ArrowUp_noPreviousItem", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowUp";
	eventSpy.altKey = true;
	openGuiItemHandler.setGetPreviousGuiItem(undefined);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), undefined);
});

QUnit.test("testOnKeyDown_forKey_altKey+ArrowUp", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowUp";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetPreviousGuiItem(aView);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());

	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), aView);
});

QUnit.test("testOnKeyDown_forKey_altKey+ArrowDown_noPreviousItem", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowDown";
	eventSpy.altKey = true;
	openGuiItemHandler.setGetNextGuiItem(undefined);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), undefined);
});

QUnit.test("testOnKeyDown_forKey_altKey+ArrowDown", function(assert) {
	CORA.jsClient(this.dependencies, this.spec);
	let jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	let openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	let onKeyDown = this.addedEvents[0].listener;

	let eventSpy = CORATEST.eventSpy();
	eventSpy.key = "ArrowDown";
	eventSpy.altKey = true;
	let aView = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.setGetNextGuiItem(aView);

	onKeyDown(eventSpy);

	assert.true(eventSpy.preventDefaultWasCalled());

	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(openGuiItemHandler.getShowViewList(0), aView);
});





