/*
 * Copyright 2017, 2025 Uppsala University Library
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
	cora.appTokenLogin = function(dependencies, spec) {
		const ajaxCallFactory = dependencies.ajaxCallFactory;
		let loginId;

		const login = function(loginIdIn, appToken) {
			loginId = loginIdIn;
			let callSpec = createCallSpec(loginId, appToken);
			ajaxCallFactory.factor(callSpec);
		};

		const createCallSpec = function(loginId, appToken) {
			return {
				requestMethod: spec.requestMethod,
				url: spec.url,
				contentType: spec.contentType,
				accept: spec.accept,
				loadMethod: spec.loadMethod,
				errorMethod: spec.errorCallback,
				timeoutMethod: spec.timeoutCallback,
				data: loginId + '\n' + appToken,
				timeoutInMS: 15000
			};
		};

		const getDependencies = function() {
			// needed for tests
			return dependencies;
		};

		const getSpec = function() {
			// needed for tests
			return spec;
		};

		return Object.freeze({
			type: "appTokenLogin",
			login: login,
			getDependencies: getDependencies,
			getSpec: getSpec
		});
	};

	return cora;
}(CORA));