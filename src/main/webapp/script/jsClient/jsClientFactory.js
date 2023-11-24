/*
 * Copyright 2019, 2020 Uppsala University Library
 *  Copyright 2017, 2023 Olov McKie
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

		let jsClient;
		function factor(jsClientSpec) {

			let globalFactories = {};

			let authTokenHolder = dependencies.authTokenHolder;
			let xmlHttpRequestFactory = CORA.xmlHttpRequestFactory();
			let ajaxCallFactoryDependencies = {
				"xmlHttpRequestFactory" : xmlHttpRequestFactory,
				"authTokenHolder" : authTokenHolder
			};
			let ajaxCallFactory = CORA.ajaxCallFactory(ajaxCallFactoryDependencies);

			let appTokenLoginFactoryDependencies = {
				"ajaxCallFactory" : ajaxCallFactory
			};
			let appTokenLoginFactory = CORA.appTokenLoginFactory(appTokenLoginFactoryDependencies);
			let webRedirectLoginFactory = CORA.webRedirectLoginFactory();

			let dependenciesLdap = {
				"providers" : providers,
				"globalFactories" : globalFactories
			};
			globalFactories.ldapLoginFactory = CORA.ldapLoginFactory(dependenciesLdap);

			let ldapLoginJsClientIntegratorDep = {
				"ldapLoginFactory" : globalFactories.ldapLoginFactory,
				"managedGuiItemFactory" : CORA.managedGuiItemFactory()
			};
			let ldapLoginJsClientIntegratorFactory = CORA.genericFactory(
					"ldapLoginJsClientIntegrator", ldapLoginJsClientIntegratorDep);

			let loginManagerFactoryDependencies = {
				"authTokenHolder" : authTokenHolder,
				"textProvider" : providers.textProvider,
				"appTokenLoginFactory" : appTokenLoginFactory,
				"webRedirectLoginFactory" : webRedirectLoginFactory,
				"ajaxCallFactory" : ajaxCallFactory,
				"ldapLoginJsClientIntegratorFactory" : ldapLoginJsClientIntegratorFactory
			};
			let loginManagerFactory = CORA.loginManagerFactory(loginManagerFactoryDependencies);

			let openGuiItemHandlerFactoryDep = {
				"textProvider" : providers.textProvider
			};
			let openGuiItemHandlerFactory = CORA
					.openGuiItemHandlerFactory(openGuiItemHandlerFactoryDep);

			let managedGuiItemFactory = CORA.managedGuiItemFactory();
			let uploadManagerDep = {
				"clientInstanceProvider" : providers.clientInstanceProvider,
				"textProvider" : providers.textProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"managedGuiItemFactory" : managedGuiItemFactory
			};
			let uploadManagerFactory = CORA.uploadManagerFactory(uploadManagerDep);

			let uploadManagerSpec = {};
			let uploadManager = uploadManagerFactory.factor(uploadManagerSpec);

			let recordGuiFactoryDep = {
				"providers" : providers,
				"globalFactories" : globalFactories,
				"ajaxCallFactory" : ajaxCallFactory,
				"authTokenHolder" : authTokenHolder,
				"uploadManager" : uploadManager
			};
			let recordGuiFactory = CORA.recordGuiFactory(recordGuiFactoryDep);

			let depRecordHandler = {
				"globalFactories" : globalFactories,
				"clientInstanceProvider" : providers.clientInstanceProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"recordGuiFactory" : recordGuiFactory,
				"managedGuiItemFactory" : managedGuiItemFactory,
				metadataProvider : providers.metadataProvider,
				textProvider : providers.textProvider
			};
			let recordHandlerFactory = CORA.recordHandlerFactory(depRecordHandler);

			let depResultHandler = {
				"textProvider" : providers.textProvider,
				"recordHandlerFactory" : recordHandlerFactory,
				"ajaxCallFactory" : ajaxCallFactory,
				"recordGuiFactory" : recordGuiFactory
			};
			let resultHandlerFactory = CORA.resultHandlerFactory(depResultHandler);

			let searchRecordHandlerViewFactory = CORA.searchRecordHandlerViewFactory({});
			let searchRecordHandlerFactoryDep = {
				"globalFactories" : globalFactories,
				"searchRecordHandlerViewFactory" : searchRecordHandlerViewFactory,
				"textProvider" : providers.textProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"recordGuiFactory" : recordGuiFactory
			};
			let searchRecordHandlerFactory = CORA
					.searchRecordHandlerFactory(searchRecordHandlerFactoryDep);

			let depRecordListHandler = {
				"factories" : globalFactories
			};
			let recordListHandlerFactory = CORA.recordListHandlerFactory(depRecordListHandler);

			let recordTypeHandlerViewFactory = CORA.recordTypeHandlerViewFactory();

			let dependenciesRTH = {
				"clientInstanceProvider" : providers.clientInstanceProvider,
				"textProvider" : providers.textProvider,
				"factories" : globalFactories
			};
			let recordTypeHandlerFactory = CORA.recordTypeHandlerFactory(dependenciesRTH);

			let dependenciesSH = {
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
			
			//globalFactories.definitionViewerFactory = CORA.definitionViewerFactory(providers);

			let genericDependencies = {
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

			let menuDependencies = {
				recordTypeHandlerFactory : recordTypeHandlerFactory
			};
			let menuSpec = {
				baseUrl : jsClientSpec.baseUrl
			};
			let recordTypeMenu = CORA.recordTypeMenu(providers, menuDependencies, menuSpec);
			
			
			let dep = {
				"providers" : providers,
				"globalInstances" : {
					"clientInstanceProvider" : providers.clientInstanceProvider
				},
				"globalFactories" : globalFactories,

				"authTokenHolder" : authTokenHolder,
				"jsClientViewFactory" : CORA.jsClientViewFactory(providers),
				"appTokenLoginFactory" : appTokenLoginFactory,
				"openGuiItemHandlerFactory" : openGuiItemHandlerFactory,
				"uploadManager" : uploadManager,
				"searchRecordHandlerFactory" : searchRecordHandlerFactory,
				"recordTypeHandlerFactory" : recordTypeHandlerFactory,
				definitionViewerFactory : CORA.definitionViewerFactory(providers),
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