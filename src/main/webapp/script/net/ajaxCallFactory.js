/*
 * Copyright 2016 Olov McKie
 * Copyright 2016 Uppsala University Library
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
	cora.ajaxCallFactory = function(dependencies) {
		const factor = function(ajaxCallSpecIn) {
			let ajaxCallSpec = ajaxCallSpecIn;
			ajaxCallSpec.requestHeaders = {};
			if (ajaxCallSpec.contentType) {
				ajaxCallSpec.requestHeaders["Content-Type"] = ajaxCallSpec.contentType;
			}
			if (ajaxCallSpec.accept) {
				ajaxCallSpec.requestHeaders["Accept"] = ajaxCallSpec.accept;
			}
			addXmlHttpRequestFactoryToSpec(ajaxCallSpec);
			possiblyAddAuthTokenToSpec(ajaxCallSpec);
			return createNewAjaxCallUsingSpec(ajaxCallSpec);
		};

		const addXmlHttpRequestFactoryToSpec = function(ajaxCallSpec) {
			ajaxCallSpec.xmlHttpRequestFactory = dependencies.xmlHttpRequestFactory;
		};

		const possiblyAddAuthTokenToSpec = function(ajaxCallSpec) {
			if (factoryHasToken()) {
				ajaxCallSpec.requestHeaders.authToken = dependencies.authTokenHolder
					.getCurrentAuthToken();
			}
		};

		const factoryHasToken = function() {
			return dependencies.authTokenHolder.hasCurrentAuthToken();
		};
		
		const createNewAjaxCallUsingSpec = function(ajaxCallSpec) {
			return CORA.ajaxCall(ajaxCallSpec);
		};

		const getDependencies = function() {
			return dependencies;
		};

		return Object.freeze({
			type: "ajaxCallFactory",
			getDependencies: getDependencies,
			factor: factor
		});
	};
	return cora;
}(CORA));