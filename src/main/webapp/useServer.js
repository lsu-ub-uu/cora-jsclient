/*
 * Copyright 2016, 2017, 2018 Uppsala University Library
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
import {
	addStandardAppTokenOption,
	clearStandardAppTokenOptions,
	enableStandardAppTokenLoginOptions
} from "./script/login/loginManager.js";

export const startUsingServer = function(context) {
	enableStandardAppTokenLoginOptions();
	clearStandardAppTokenOptions();
	let callSpec = {
		requestMethod : "GET",
		url : context.serverRestUrl,
		accept : "application/vnd.cora.deploymentInfo+json",
		loadMethod : function(answer) {
			deploymentInfoFetched(context, answer);
		},
		errorMethod : context.callError,
	};
	context.ajaxCallFactory.factor(callSpec);
};

const deploymentInfoFetched = function(context, answer) {
	let deploymentInfo = JSON.parse(answer.responseText);
	context.name = deploymentInfo.deploymentName;
	context.baseUrl = deploymentInfo.urls.REST;
	context.appTokenLogin = deploymentInfo.urls.appTokenLogin;
	context.passwordLogin = deploymentInfo.urls.passwordLogin;
	for (const exampleUser of deploymentInfo.exampleUsers) {
		let user = {
			text : exampleUser.name,
			type : exampleUser.type,
			loginId : exampleUser.loginId,
			appToken : exampleUser.appToken
		};
		addStandardAppTokenOption(user);
	}
	switch (deploymentInfo.applicationName) {
	case "alvin":
		context.enableCSS("alvinCSS");
		context.enableIcon("alvin");
		break;
	case "diva":
		context.enableCSS("divaLilaCSS");
		context.enableIcon("diva");
		break;
	default:
		context.enableCSS("aClientCSS");
		context.enableIcon("cora");
	}
	context.startDependencies();
};
