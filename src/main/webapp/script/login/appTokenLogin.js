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
		const ajaxCallFactory = dependencies.ajaxCallFactory;
		let loginId;

		const login = function(loginIdIn, appToken) {
			loginId = loginIdIn;
			let callSpec = createCallSpec(loginId,appToken);
			ajaxCallFactory.factor(callSpec);
		};

		const createCallSpec = function(loginId,appToken) {
			return {
				requestMethod : spec.requestMethod,
				url : spec.url,
				contentType : spec.contentType,
				accept : spec.accept,
				loadMethod : handleResponse,
				errorMethod : errorMethod,
				timeoutMethod : timeoutMethod,
				data : loginId+'\n'+appToken,
				timeoutInMS : 15000
			};
		};

		const errorMethod = function(answer) {
			spec.errorCallback(answer);
		};

		const timeoutMethod = function(answer) {
			spec.timeoutCallback(answer);
		};

		const handleResponse = function(answer) {
			let everything = JSON.parse(answer.responseText);
			let data = everything.data;
			let cData = CORA.coraData(data);
			let token = cData.getFirstAtomicValueByNameInData("token");
			let userId = cData.getFirstAtomicValueByNameInData("userId");
			let validForNoSeconds = cData.getFirstAtomicValueByNameInData("validForNoSeconds");
			let authInfo = {
				userId : userId,
				loginId : loginId,
				token : token,
				validForNoSeconds : validForNoSeconds,
				actionLinks : everything.actionLinks
			};
			spec.authInfoCallback(authInfo);
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
			type : "appTokenLogin",
			login : login,
			handleResponse : handleResponse,
			getDependencies : getDependencies,
			getSpec : getSpec
		});
	};

	return cora;
}(CORA));