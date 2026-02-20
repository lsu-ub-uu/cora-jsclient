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
addStandardAppTokensToLoginMenu = true;
const start = function() {
	let callSpec = 	{
		requestMethod : "GET",
		url : serverRestUrl,
		accept : "application/vnd.cora.deploymentInfo+json",
		loadMethod: deploymentInfoFetched,
		errorMethod: callError,
	};
	ajaxCallFactory.factor(callSpec);
};
const deploymentInfoFetched = function(answer){
	let deploymentInfo = JSON.parse(answer.responseText);
	name = deploymentInfo.deploymentName;
	baseUrl = deploymentInfo.urls.REST;

	appTokenLogin= deploymentInfo.urls.appTokenLogin;
	passwordLogin= deploymentInfo.urls.passwordLogin;
	for(const exampleUser of deploymentInfo.exampleUsers){
		let user = {
				text: exampleUser.name,
				type: exampleUser.type,
				loginId: exampleUser.loginId,
				appToken: exampleUser.appToken
			};
		appTokenOptions.push(user);
	}
	switch(deploymentInfo.applicationName){
	  case "alvin":
		enableCSS("alvinCSS");
		enableIcon("alvin");
	    break;
	  case "diva":
		enableCSS("divaLilaCSS");
		enableIcon("diva");
	    break;
	  default:
		enableCSS("aClientCSS");
		enableIcon("cora");
	}
	startDependencies();
};

const enableIcon = function(systemName) {
	document.getElementById("tabIcon").href = `images/${systemName}Icon.svg`;
};

const enableCSS = function(cssName) {
	document.getElementById(cssName).disabled = true;
	document.getElementById(cssName).disabled = false;
};

