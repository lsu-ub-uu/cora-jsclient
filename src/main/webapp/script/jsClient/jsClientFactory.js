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

import { ajaxCallFactory as ajaxCallFactoryImported } from "../net/ajaxCallFactory.js";
import { appTokenLoginFactory as appTokenLoginFactoryImported } from "../login/appTokenLoginFactory.js";
import { definitionViewerFactory } from "../definitionViewer/definitionViewerFactory.js";
import { genericFactory } from "../genericFactory.js";
import { jsClient as jsClientImported } from "./jsClient.js";
import { jsClientViewFactory } from "./jsClientViewFactory.js";
import { loginManagerFactory as loginManagerFactoryImported } from "../login/loginManagerFactory.js";
import { managedGuiItemFactory as managedGuiItemFactoryImported } from "../managedGuiItemFactory.js";
import { passwordLoginFactory } from "../login/passwordLoginFactory.js";
import { recordGuiFactory as recordGuiFactoryImported } from "../recordGui/recordGuiFactory.js";
import { recordHandlerFactory as recordHandlerFactoryImported } from "../recordHandlerFactory.js";
import { recordListHandlerFactory as recordListHandlerFactoryImported } from "../recordListHandlerFactory.js";
import { recordTypeHandlerFactory as recordTypeHandlerFactoryImported } from "../recordTypeHandlerFactory.js";
import { recordTypeHandlerViewFactory as recordTypeHandlerViewFactoryImported } from "../recordTypeHandlerViewFactory.js";
import { recordTypeMenu as recordTypeMenuImported } from "./recordTypeMenu.js";
import { resultHandlerFactory as resultHandlerFactoryImported } from "../search/resultHandlerFactory.js";
import { searchHandlerFactory } from "../search/searchHandlerFactory.js";
import { searchRecordHandlerViewFactory as searchRecordHandlerViewFactoryImported } from "../search/searchRecordHandlerViewFactory.js";
import { uploadManagerFactory as uploadManagerFactoryImported } from "../net/uploadManagerFactory.js";
import { webRedirectLoginFactory as webRedirectLoginFactoryImported } from "../login/webRedirectLoginFactory.js";
import { xmlHttpRequestFactory as xmlHttpRequestFactoryImported } from "../net/xmlHttpRequestFactory.js";

export const jsClientFactory = function(providers, dependencies) {
		let jsClient;
		function factor(jsClientSpec) {

			let globalFactories = {};

			let authTokenHolder = dependencies.authTokenHolder;
			let xmlHttpRequestFactory = xmlHttpRequestFactoryImported();
			let ajaxCallFactoryDependencies = {
				xmlHttpRequestFactory : xmlHttpRequestFactory,
				authTokenHolder : authTokenHolder
			};
			let ajaxCallFactory = ajaxCallFactoryImported(ajaxCallFactoryDependencies);

			let appTokenLoginFactoryDependencies = {
				ajaxCallFactory : ajaxCallFactory
			};
			let appTokenLoginFactory = appTokenLoginFactoryImported(appTokenLoginFactoryDependencies);
			let webRedirectLoginFactory = webRedirectLoginFactoryImported();

			let dependenciesPassword = {
				providers : providers,
				globalFactories : globalFactories
			};
			globalFactories.passwordLoginFactory = passwordLoginFactory(dependenciesPassword);

			let passwordLoginJsClientIntegratorDep = {
				passwordLoginFactory : globalFactories.passwordLoginFactory,
				managedGuiItemFactory : managedGuiItemFactoryImported()
			};
			let passwordLoginJsClientIntegratorFactory = genericFactory(
					"passwordLoginJsClientIntegrator", passwordLoginJsClientIntegratorDep);

			let loginManagerFactoryDependencies = {
				authTokenHolder : authTokenHolder,
				textProvider : providers.textProvider,
				appTokenLoginFactory : appTokenLoginFactory,
				webRedirectLoginFactory : webRedirectLoginFactory,
				ajaxCallFactory : ajaxCallFactory,
				passwordLoginJsClientIntegratorFactory : passwordLoginJsClientIntegratorFactory
			};
			let loginManagerFactory = loginManagerFactoryImported(loginManagerFactoryDependencies);

			let openGuiItemHandlerFactoryDep = {
				textProvider : providers.textProvider
			};
			let openGuiItemHandlerFactory = CORA
					.openGuiItemHandlerFactory(openGuiItemHandlerFactoryDep);

			let managedGuiItemFactory = managedGuiItemFactoryImported();
			let uploadManagerDep = {
				clientInstanceProvider : providers.clientInstanceProvider,
				textProvider : providers.textProvider,
				ajaxCallFactory : ajaxCallFactory,
				managedGuiItemFactory : managedGuiItemFactory
			};
			let uploadManagerFactory = uploadManagerFactoryImported(uploadManagerDep);

			let uploadManagerSpec = {};
			let uploadManager = uploadManagerFactory.factor(uploadManagerSpec);

			let calculatorFactoryDep = {
				metadataProvider : providers.metadataProvider
			};
			let recordGuiFactoryDep = {
				providers : providers,
				globalFactories : globalFactories,
				ajaxCallFactory : ajaxCallFactory,
				authTokenHolder : authTokenHolder,
				uploadManager : uploadManager,
				recordPartPermissionCalculatorFactory : genericFactory(
						"recordPartPermissionCalculator", calculatorFactoryDep)
			};
			let recordGuiFactory = recordGuiFactoryImported(recordGuiFactoryDep);

			let depRecordHandler = {
				globalFactories : globalFactories,
				clientInstanceProvider : providers.clientInstanceProvider,
				ajaxCallFactory : ajaxCallFactory,
				recordGuiFactory : recordGuiFactory,
				managedGuiItemFactory : managedGuiItemFactory,
				metadataProvider : providers.metadataProvider,
				textProvider : providers.textProvider
			};
			let recordHandlerFactory = recordHandlerFactoryImported(depRecordHandler);

			let depResultHandler = {
				textProvider : providers.textProvider,
				recordHandlerFactory : recordHandlerFactory,
				ajaxCallFactory : ajaxCallFactory,
				recordGuiFactory : recordGuiFactory
			};
			let resultHandlerFactory = resultHandlerFactoryImported(depResultHandler);

			let searchRecordHandlerViewFactory = searchRecordHandlerViewFactoryImported({});
			let searchRecordHandlerFactoryDep = {
				globalFactories : globalFactories,
				searchRecordHandlerViewFactory : searchRecordHandlerViewFactory,
				textProvider : providers.textProvider,
				ajaxCallFactory : ajaxCallFactory,
				recordGuiFactory : recordGuiFactory
			};
			let searchRecordHandlerFactory = CORA
					.searchRecordHandlerFactory(searchRecordHandlerFactoryDep);

			let depRecordListHandler = {
				factories : globalFactories
			};
			let recordListHandlerFactory = recordListHandlerFactoryImported(depRecordListHandler);

			let recordTypeHandlerViewFactory = recordTypeHandlerViewFactoryImported();

			let dependenciesRTH = {
				clientInstanceProvider : providers.clientInstanceProvider,
				textProvider : providers.textProvider,
				factories : globalFactories
			};
			let recordTypeHandlerFactory = recordTypeHandlerFactoryImported(dependenciesRTH);

			let dependenciesSH = {
				providers : providers,
				globalFactories : globalFactories
			};
			globalFactories.searchHandlerFactory = searchHandlerFactory(dependenciesSH);

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

			let genericDependencies = {
				providers : providers,
				globalInstances : {
					clientInstanceProvider : providers.clientInstanceProvider
				},
				globalFactories : globalFactories
			};
			globalFactories.incomingLinksListHandlerFactory = genericFactory(
					"incomingLinksListHandler", genericDependencies);
			globalFactories.incomingLinksListHandlerViewFactory = genericFactory(
					"incomingLinksListHandlerView", genericDependencies);

			let menuDependencies = {
				recordTypeHandlerFactory : recordTypeHandlerFactory
			};
			let menuSpec = {
				baseUrl : jsClientSpec.baseUrl
			};
			let recordTypeMenu = recordTypeMenuImported(providers, menuDependencies, menuSpec);

			let dependenciesRD = {
				globalFactories : globalFactories
			};
			
			let recursiveDeleteFactory = CORA
								.recursiveDeleteFactory(providers, dependenciesRD);
			
			let dep = {
				providers : providers,
				globalInstances : {
					clientInstanceProvider : providers.clientInstanceProvider
				},
				globalFactories : globalFactories,

				authTokenHolder : authTokenHolder,
				jsClientViewFactory : jsClientViewFactory(providers),
				appTokenLoginFactory : appTokenLoginFactory,
				openGuiItemHandlerFactory : openGuiItemHandlerFactory,
				uploadManager : uploadManager,
				searchRecordHandlerFactory : searchRecordHandlerFactory,
				recordTypeHandlerFactory : recordTypeHandlerFactory,
				definitionViewerFactory : definitionViewerFactory(providers),
				recursiveDeleteFactory : recursiveDeleteFactory,
				recordTypeMenu : recordTypeMenu
			};

			jsClient = jsClientImported(dep, jsClientSpec);
			return jsClient;
		}

		return Object.freeze({
			type : "jsClientFactory",
			factor : factor
		});
	};

