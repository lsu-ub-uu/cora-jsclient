/*
 * Copyright 2019 Uppsala University Library
 *  Copyright 2017 Olov McKie
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
	cora.jsClientFactory = function(providers, dependencies) {

		var jsClient;
		function factor(jsClientSpec) {

			var globalFactories = {};

			var authTokenHolder = dependencies.authTokenHolder;
			var xmlHttpRequestFactory = CORA.xmlHttpRequestFactory();
			var ajaxCallFactoryDependencies = {
				"xmlHttpRequestFactory" : xmlHttpRequestFactory,
				"authTokenHolder" : authTokenHolder
			};
			var ajaxCallFactory = CORA.ajaxCallFactory(ajaxCallFactoryDependencies);

			var appTokenLoginFactoryDependencies = {
				"ajaxCallFactory" : ajaxCallFactory
			};
			var appTokenLoginFactory = CORA.appTokenLoginFactory(appTokenLoginFactoryDependencies);
			var webRedirectLoginFactory = CORA.webRedirectLoginFactory();

			var dependenciesLdap = {
				"providers" : providers,
				"globalFactories" : globalFactories
			};
			globalFactories.ldapLoginFactory = CORA.ldapLoginFactory(dependenciesLdap);

			var ldapLoginJsClientIntegratorDep = {
				"ldapLoginFactory" : globalFactories.ldapLoginFactory,
				"managedGuiItemFactory" : CORA.managedGuiItemFactory()
			};
			var ldapLoginJsClientIntegratorFactory = CORA.genericFactory(
					"ldapLoginJsClientIntegrator", ldapLoginJsClientIntegratorDep);

			var loginManagerFactoryDependencies = {
				"authTokenHolder" : authTokenHolder,
				"textProvider" : providers.textProvider,
				"appTokenLoginFactory" : appTokenLoginFactory,
				"webRedirectLoginFactory" : webRedirectLoginFactory,
				"ajaxCallFactory" : ajaxCallFactory,
				"ldapLoginJsClientIntegratorFactory" : ldapLoginJsClientIntegratorFactory
			};
			var loginManagerFactory = CORA.loginManagerFactory(loginManagerFactoryDependencies);

			var openGuiItemHandlerFactoryDep = {
				"textProvider" : providers.textProvider
			};
			var openGuiItemHandlerFactory = CORA
					.openGuiItemHandlerFactory(openGuiItemHandlerFactoryDep);

			var managedGuiItemFactory = CORA.managedGuiItemFactory();
			var uploadManagerDep = {
				"clientInstanceProvider" : providers.clientInstanceProvider,
				"textProvider" : providers.textProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"managedGuiItemFactory" : managedGuiItemFactory
			};
			var uploadManagerFactory = CORA.uploadManagerFactory(uploadManagerDep);

			var uploadManagerSpec = {};
			var uploadManager = uploadManagerFactory.factor(uploadManagerSpec);

			var recordGuiFactoryDep = {
				"providers" : providers,
				"globalFactories" : globalFactories,
				"ajaxCallFactory" : ajaxCallFactory,
				"authTokenHolder" : authTokenHolder,
				"uploadManager" : uploadManager
			};
			var recordGuiFactory = CORA.recordGuiFactory(recordGuiFactoryDep);

			var depRecordHandler = {
				"globalFactories" : globalFactories,
				"clientInstanceProvider" : providers.clientInstanceProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"recordGuiFactory" : recordGuiFactory,
				"managedGuiItemFactory" : managedGuiItemFactory,
				metadataProvider : providers.metadataProvider
			};
			var recordHandlerFactory = CORA.recordHandlerFactory(depRecordHandler);

			var depResultHandler = {
				"textProvider" : providers.textProvider,
				"recordHandlerFactory" : recordHandlerFactory,
				"ajaxCallFactory" : ajaxCallFactory,
				"recordGuiFactory" : recordGuiFactory
			};
			var resultHandlerFactory = CORA.resultHandlerFactory(depResultHandler);

			var searchRecordHandlerViewFactory = CORA.searchRecordHandlerViewFactory({});
			var searchRecordHandlerFactoryDep = {
				"globalFactories" : globalFactories,
				"searchRecordHandlerViewFactory" : searchRecordHandlerViewFactory,
				"textProvider" : providers.textProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"recordGuiFactory" : recordGuiFactory
			};
			var searchRecordHandlerFactory = CORA
					.searchRecordHandlerFactory(searchRecordHandlerFactoryDep);

			var depRecordListHandler = {
				"factories" : globalFactories
			};
			var recordListHandlerFactory = CORA.recordListHandlerFactory(depRecordListHandler);

			var recordTypeHandlerViewFactory = CORA.recordTypeHandlerViewFactory();

			var dependenciesRTH = {
				"clientInstanceProvider" : providers.clientInstanceProvider,
				"textProvider" : providers.textProvider,
				"factories" : globalFactories
			};
			var recordTypeHandlerFactory = CORA.recordTypeHandlerFactory(dependenciesRTH);

			var dependenciesSH = {
				"providers" : providers,
				"globalFactories" : globalFactories
			};
			globalFactories.searchHandlerFactory = CORA.searchHandlerFactory(dependenciesSH);

			globalFactories.loginManagerFactory = loginManagerFactory;
			globalFactories.ajaxCallFactory = ajaxCallFactory;
			globalFactories.appTokenLoginFactory = appTokenLoginFactory;
			globalFactories.webRedirectLoginFactory = webRedirectLoginFactory;
			globalFactories.openGuiItemHandlerFactory = openGuiItemHandlerFactory;
			globalFactories.managedGuiItemFactory = managedGuiItemFactory;
			globalFactories.recordGuiFactory = recordGuiFactory;
			globalFactories.resultHandlerFactory = resultHandlerFactory;
			globalFactories.searchRecordHandlerFactory = searchRecordHandlerFactory;
			globalFactories.searchRecordHandlerViewFactory = searchRecordHandlerViewFactory;
			globalFactories.recordTypeHandlerFactory = recordTypeHandlerFactory;
			globalFactories.recordHandlerFactory = recordHandlerFactory;
			globalFactories.recordListHandlerFactory = recordListHandlerFactory;
			globalFactories.recordTypeHandlerViewFactory = recordTypeHandlerViewFactory;

			var genericDependencies = {
				"providers" : providers,
				"globalInstances" : {
					"clientInstanceProvider" : providers.clientInstanceProvider
				},
				"globalFactories" : globalFactories
			};
			globalFactories.incomingLinksListHandlerFactory = CORA.genericFactory(
					"incomingLinksListHandler", genericDependencies);
			globalFactories.incomingLinksListHandlerViewFactory = CORA.genericFactory(
					"incomingLinksListHandlerView", genericDependencies);

			var menuDependencies = {
				recordTypeHandlerFactory : recordTypeHandlerFactory
			};
			var menuSpec = {
				baseUrl : jsClientSpec.baseUrl
			};
			var recordTypeMenu = CORA.recordTypeMenu(providers, menuDependencies, menuSpec);

			var dep = {
				"providers" : providers,
				"globalInstances" : {
					"clientInstanceProvider" : providers.clientInstanceProvider
				},
				"globalFactories" : globalFactories,

				"authTokenHolder" : authTokenHolder,
				"jsClientViewFactory" : CORA.jsClientViewFactory(),
				"appTokenLoginFactory" : appTokenLoginFactory,
				"openGuiItemHandlerFactory" : openGuiItemHandlerFactory,
				"uploadManager" : uploadManager,
				"searchRecordHandlerFactory" : searchRecordHandlerFactory,
				"recordTypeHandlerFactory" : recordTypeHandlerFactory,
				recordTypeMenu : recordTypeMenu
			};

			jsClient = CORA.jsClient(dep, jsClientSpec);
			return jsClient;
		}

		return Object.freeze({
			"type" : "jsClientFactory",
			factor : factor
		});
	};
	return cora;
}(CORA));