/*
 * Copyright 2016, 201, 2019, 2024, 2025 Uppsala University Library
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
var CORA = (function(cora) {
	"use strict";
	cora.jsClient = function(dependencies, spec) {
		const metadataProvider = dependencies.providers.metadataProvider;
		const textProvider = dependencies.providers.textProvider;
		const recordTypeProvider = dependencies.providers.recordTypeProvider;
		const searchProvider = dependencies.providers.searchProvider;

		const loginManagerFactory = dependencies.globalFactories.loginManagerFactory;
		const recordHandlerFactory = dependencies.globalFactories.recordHandlerFactory;
		const managedGuiItemFactory = dependencies.globalFactories.managedGuiItemFactory;
		
		let out;
		let NO_OF_PROVIDERS = 4;
		let reloadingProvidersInProgress = false;
		let reloadedProviders = 0;

		let jsClientView;
		let openGuiItemHandler;

		const start = function() {
			document.addEventListener('keydown', onKeyDown);
			dependencies.globalInstances.clientInstanceProvider.setJsClient(out);
			let jsClientViewSpec = {
				name: spec.name,
				serverAddress: spec.baseUrl,
				reloadProvidersMethod: out.reloadProviders,
				setLanguageMethod: out.setCurrentLang,
				showPasswordLoginMethod: out.showPasswordLogin
			};
			jsClientView = dependencies.jsClientViewFactory.factor(jsClientViewSpec);

			let loginManager = createLoginManager();
			jsClientView.addLoginManagerView(loginManager.getHtml());

			jsClientView.addGlobalView(dependencies.uploadManager.getManagedGuiItem().getMenuView());
			createAndAddOpenGuiItemHandlerToSideBar();
			addMainSearchesUserIsAuthorizedToUseToSideBar();
			createAndAddGroupOfRecordTypesToSideBar();
			
		};
		
		const onKeyDown = function(event){
			if (altPlusKeyPressed(event, 's')) {
				blurCurrentActiveElementToSetValueFromSelect();
				return save(event);
			}
			if (altPlusKeyPressed(event, 'r')) {
				return reload(event);
			}
			if (altPlusKeyPressed(event, 'w')) {
				return close(event);
			}
			if (event.ctrlKey && altPlusKeyPressed(event, 'ArrowUp')) {
				return moveShowingUp(event);
			}
			if (event.ctrlKey && altPlusKeyPressed(event, 'ArrowDown')) {
				return moveShowingDown(event);
			}
			if (altPlusKeyPressed(event, 'ArrowUp')) {
				return changeToPreviousShowing(event);
			}
			if (altPlusKeyPressed(event, 'ArrowDown')) {
				return changeToNextShowing(event);
			}
			if (altPlusKeyPressed(event, 'ArrowRight')) {
				return changeToNextIndicator(event);
			}
			if (altPlusKeyPressed(event, 'ArrowLeft')) {
				return changeToPreviousIndicator(event);
			}
		};

		const altPlusKeyPressed = function(event, key){
			let keyPressed = event.key;
			return event.altKey && keyPressed === key;
		};

		const blurCurrentActiveElementToSetValueFromSelect = function(){
			if(document.activeElement){
				document.activeElement.blur();
			}
		};
		
		const save = function(event) {
			event.preventDefault();
			if(openGuiItemHandler.getShowingGuiItem()){
				openGuiItemHandler.getShowingGuiItem().sendDataToServer();
			}
		};

		const reload = function(event) {
			event.preventDefault();
			if(openGuiItemHandler.getShowingGuiItem()){
				openGuiItemHandler.getShowingGuiItem().reloadDataFromServer();
			}
		};

		const close = function(event) {
			event.preventDefault();
			if(openGuiItemHandler.getShowingGuiItem()){
				viewRemoved(openGuiItemHandler.getShowingGuiItem());
			}
		};
		
		const moveShowingUp = function(event) {
			event.preventDefault();
			openGuiItemHandler.moveCurrentMenuViewUp();
		};
		
		const moveShowingDown = function(event) {
			event.preventDefault();
			openGuiItemHandler.moveCurrentMenuViewDown();
		};
		
		const changeToPreviousShowing = function(event) {
			event.preventDefault();
			let switchToItem = openGuiItemHandler.getPreviousGuiItem();
			if(switchToItem){
				showView(switchToItem);
			}
		};
		
		const changeToNextShowing = function(event) {
			event.preventDefault();
			let switchToItem = openGuiItemHandler.getNextGuiItem();
			if(switchToItem){
				showView(switchToItem);
			}
		};
		
		const changeToNextIndicator = function(event){
			event.preventDefault();
			if(openGuiItemHandler.getShowingGuiItem()){
				openGuiItemHandler.getShowingGuiItem().toggleNextIndicator();
			}
		};
		
		const changeToPreviousIndicator = function(event){
			event.preventDefault();
			if(openGuiItemHandler.getShowingGuiItem()){
				openGuiItemHandler.getShowingGuiItem().togglePreviousIndicator();
			}
		};
		
		const createLoginManager = function() {
			let loginManagerSpec = {
				afterLoginMethod: afterLogin,
				afterLogoutMethod: afterLogout,
				setInfoMessage: jsClientView.addInfoMessage,
				setErrorMessage: jsClientView.addErrorMessage,
				appTokenBaseUrl: spec.appTokenBaseUrl,
				baseUrl: spec.baseUrl,
				jsClient: out
			};
			let loginManager = loginManagerFactory.factor(loginManagerSpec);
			dependencies.globalInstances.loginManager = loginManager;
			return loginManager;
		};

		const createAndAddOpenGuiItemHandlerToSideBar = function() {
			openGuiItemHandler = dependencies.openGuiItemHandlerFactory.factor();
			jsClientView.addOpenGuiItemHandlerView(openGuiItemHandler.getView());
		};

		const addMainSearchesUserIsAuthorizedToUseToSideBar = function() {
			let mainSearches = searchProvider.getSearchesByGroupId("publicSearch");
			mainSearches.forEach(function(search) {
				possiblyCreateAndAddSearchRecordHandlerToSideBar(search);
			});
		};

		const possiblyCreateAndAddSearchRecordHandlerToSideBar = function(search) {
			if (userIsAuthorizedToUseSearch(search)) {
				let searchRecordHandler = createSearchRecordHandler(search);
				addSearchRecordHandlerToSideBar(searchRecordHandler);
			}
		};

		const userIsAuthorizedToUseSearch = function(search) {
			return search.actionLinks.search !== undefined;
		};

		const createSearchRecordHandler = function(search) {
			let specSearch = {
				searchRecord: search,
				baseUrl: spec.baseUrl,
				jsClient: out
			};
			return dependencies.searchRecordHandlerFactory.factor(specSearch);
		};

		const addSearchRecordHandlerToSideBar = function(searchRecordHandler) {
			jsClientView.addToSearchesView(searchRecordHandler.getView());
		};

		const createAndAddGroupOfRecordTypesToSideBar = function() {
			let thisInstanceOfJsClient = out;
			let recordTypeGroups = dependencies.recordTypeMenu
				.getRecordTypeGroups(thisInstanceOfJsClient);
			addAllRecordTypeGroupsToSideBarInView(recordTypeGroups);
		};

		const addAllRecordTypeGroupsToSideBarInView = function(recordTypeGroups) {
			recordTypeGroups.forEach(function(recordTypeGroup) {
				jsClientView.addGroupOfRecordTypesToView(recordTypeGroup);
			});
		};

		const getView = function() {
			return jsClientView.getView();
		};

		const showView = function(managedGuiItem) {
			showNewWorkView(managedGuiItem);
			openGuiItemHandler.showView(managedGuiItem);
		};

		const addGuiItem = function(managedGuiItem) {
			openGuiItemHandler.addManagedGuiItem(managedGuiItem);
		};

		const showNewWorkView = function(managedGuiItem) {
			if (managedGuiItem.getWorkView().parentNode !== jsClientView.getWorkView()) {
				jsClientView.addToWorkView(managedGuiItem.getWorkView());
			}
		};

		const viewRemoved = function(managedGuiItem) {
			openGuiItemHandler.viewRemoved(managedGuiItem);
			jsClientView.removeFromWorkView(managedGuiItem.getWorkView());
		};

		const getMetadataForRecordTypeId = function(recordTypeId) {
			return recordTypeProvider.getMetadataByRecordTypeId(recordTypeId);
		};

		const afterLogin = function() {
			recordTypeProvider.reload(afterRecordTypeProviderReload);
			searchProvider.reload(afterSearchProviderReload);
		};

		const afterLogout = function() {
			recordTypeProvider.reload(afterRecordTypeProviderReload);
			searchProvider.reload(afterSearchProviderReload);
		};

		const afterRecordTypeProviderReload = function() {
			jsClientView.clearRecordTypesView();
			createAndAddGroupOfRecordTypesToSideBar();
		};

		const afterSearchProviderReload = function() {
			jsClientView.clearSearchesView();
			addMainSearchesUserIsAuthorizedToUseToSideBar();
		};


		const openRecordUsingReadLink = function(openInfo) {
			let record = {
				actionLinks: {
					read: openInfo.readLink
				}
			};
			let recordHandlerSpec = {
				fetchLatestDataFromServer: "true",
				partOfList: "false",
				createNewRecord: "false",
				record: record,
				jsClient: out
			};
			let recordHandlerNew = recordHandlerFactory.factor(recordHandlerSpec);
			addGuiItem(recordHandlerNew.getManagedGuiItem());
			if (openInfo.loadInBackground !== "true") {
				showView(recordHandlerNew.getManagedGuiItem());
			}
		};

		const openDefinitionViewerForId = function(id) {
			let definitionViewer = dependencies.definitionViewerFactory.factor({id:id});
			let definitionView = definitionViewer.getView();
			
			let definitionManagedGuiItem = createManagedGuiItem(definitionViewer.reloadForMetadataChanges);
			definitionManagedGuiItem.addWorkPresentation(definitionView);
			
			let definitionMenuView = CORA.gui.createSpanWithClassName("definitionViewer");
			definitionMenuView.innerHTML = "Definition viewer: " + id;
			definitionManagedGuiItem.addMenuPresentation(definitionMenuView);
			
			addGuiItem(definitionManagedGuiItem);
			showView(definitionManagedGuiItem);
		};

		const openRecursiveDeleteForId = function(id) {
			let recursiveDelete = dependencies.recursiveDeleteFactory.factor({id:id});
			let recursiveDeleteView = recursiveDelete.getView();

			let recursiveDeleteManagedGuiItem = createManagedGuiItem();
			recursiveDeleteManagedGuiItem.addWorkPresentation(recursiveDeleteView);
			
			let recursiveDeleteMenuView = CORA.gui.createSpanWithClassName("recursiveDelete");
			recursiveDeleteMenuView.innerHTML = "Recursive delete: " + id;
			recursiveDeleteManagedGuiItem.addMenuPresentation(recursiveDeleteMenuView);
			
			addGuiItem(recursiveDeleteManagedGuiItem);
			showView(recursiveDeleteManagedGuiItem);
		};
		
		const createManagedGuiItem = function(reloadForMetadataChanges) {
			let managedGuiItemSpec = assembleManagedGuiItemSpec(reloadForMetadataChanges);
			return managedGuiItemFactory.factor(managedGuiItemSpec);
		};

		const assembleManagedGuiItemSpec = function(reloadForMetadataChanges) {
			return {
				activateMethod: showView,
				removeMethod: viewRemoved,
				callOnMetadataReloadMethod: reloadForMetadataChanges
			};
		};
		
		const reloadProviders = function() {
			if (reloadingProvidersInProgress === false) {
				startReloadOfProviders();
			}
		};

		const startReloadOfProviders = function() {
			setReloadingProvidersInProgressStatus(true);
			metadataProvider.reload(providerReloaded);
			textProvider.reload(providerReloaded);
			recordTypeProvider.reload(providerReloaded);
			searchProvider.reload(providerReloaded);
		};

		const setReloadingProvidersInProgressStatus = function(status) {
			reloadingProvidersInProgress = status;
			jsClientView.setReloadingProviders(status);
		};

		const providerReloaded = function() {
			reloadedProviders++;
			if (NO_OF_PROVIDERS === reloadedProviders) {
				reloadedProviders = 0;
				setReloadingProvidersInProgressStatus(false);
				afterRecordTypeProviderReload();
				afterSearchProviderReload();
				reloadOpenRecords();
			}
		};

		const reloadOpenRecords = function() {
			openGuiItemHandler.getItemList().forEach(function(managedGuiItem) {
				managedGuiItem.reloadForMetadataChanges();
			});
		};

		const setCurrentLang = function(lang) {
			textProvider.setCurrentLang(lang);
			reloadOpenRecords();
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "jsClient",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			showView: showView,
			getMetadataForRecordTypeId: getMetadataForRecordTypeId,
			afterLogin: afterLogin,
			afterLogout: afterLogout,
			afterRecordTypeProviderReload: afterRecordTypeProviderReload,
			afterSearchProviderReload: afterSearchProviderReload,
			viewRemoved: viewRemoved,
			addGuiItem: addGuiItem,
			openRecordUsingReadLink: openRecordUsingReadLink,
			reloadProviders: reloadProviders,
			setCurrentLang: setCurrentLang,
			openDefinitionViewerForId: openDefinitionViewerForId,
			openRecursiveDeleteForId: openRecursiveDeleteForId,
			onKeyDown: onKeyDown
		});
		start();

		return out;
	};
	return cora;
}(CORA));