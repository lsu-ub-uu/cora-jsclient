/*
 * Copyright 2017 Uppsala University Library
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
var CORATEST = (function(cora) {
	"use strict";
	cora.appTokenLoginSpy = function(dependencies, spec) {
		let userId;
		let userIds = [];
		let appTokens = [];
		const login = function(userIdIn, appToken) {
			userIds.push(userIdIn);
			appTokens.push(appToken);
			let authInfo = {
					"userId" : userIdIn,
					"token" : "fake authToken from appTokenLoginSpy",
					"validForNoSeconds" : "131"
				};
			spec.authInfoCallback(authInfo);
		};

		const handleResponse = function(answer) {
			//nothing
		};
		
		const getDependencies = function() {
			return dependencies;
		};
		
		const getSpec = function() {
			return spec;
		};
		
		const getUserId = function(number) {
			return userIds[number];
		};
		
		const getAppToken = function(number) {
			return appTokens[number];
		};

		let out = Object.freeze({
			type : "appTokenLoginSpy",
			login : login,
			handleResponse : handleResponse,
			getDependencies : getDependencies,
			getSpec : getSpec,
			getUserId : getUserId,
			getAppToken : getAppToken
		});
		return out;
	};

	return cora;
}(CORATEST || {}));