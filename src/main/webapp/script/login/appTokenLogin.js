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
var CORA = (function(cora) {
	"use strict";
	cora.appTokenLogin = function(dependencies, spec) {
		var userId;
		function login(userIdIn, appToken) {
			userId = userIdIn;
			var callSpec = createCallSpec(appToken);
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function createCallSpec(appToken) {
			var callSpec = {
				"requestMethod" : spec.requestMethod,
				"url" : spec.url + userId,
				"accept" : spec.accept,
				"loadMethod" : handleResponse,
				"errorMethod" : errorMethod,
				"timeoutMethod" : timeoutMethod,
				"data" : appToken,
				"timeoutInMS" : 15000
			};
			return callSpec;
		}

		function errorMethod(answer) {
			spec.errorCallback(answer);
		}

		function timeoutMethod(answer) {
			spec.timeoutCallback(answer);
		}

		function handleResponse(answer) {
			var data = JSON.parse(answer.responseText);
			var cData = CORA.coraData(data);
			var token = cData.getFirstAtomicValueByNameInData("id");
			var validForNoSeconds = cData
					.getFirstAtomicValueByNameInData("validForNoSeconds");
			var authInfo = {
				"userId" : userId,
				"token" : token,
				"validForNoSeconds" : validForNoSeconds
			};
			spec.authInfoCallback(authInfo);
		}

		var out = Object.freeze({
			"type" : "appTokenLogin",
			login : login,
			handleResponse : handleResponse
		});
		return out;
	};

	return cora;
}(CORA));