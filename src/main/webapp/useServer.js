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
	let href = window.location.href;
	let appTokensMap = createMapWithAppTokens();

	if (hrefContains(href, "systemone")) {
		enableCSS("aClientCSS");
		useSysteOnePreview();
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin']);
	
	} else if (hrefContains(href, "cora.alvin-portal.org")) {
		enableCSS("alvinCSS");
		useAlvinPre();
		enableIcon("alvin");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, []);
	
	} else if (hrefContains(href, "mig.alvin-portal.org")) {
		enableCSS("alvinCSS");
		useAlvinMigration();
		enableIcon("alvin");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'alvinAdmin']);
	
	} else if (hrefContains(href, "pre.diva-portal.org")) {
		enableCSS("divaLilaCSS");
		useDivaPre();
		enableIcon("diva");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['divaAdmin']);
	
	} else if (hrefContains(href, "mig.diva-portal.org")) {
		enableCSS("divaLilaCSS");
		useDivaMigration();
		enableIcon("diva");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, 
			['systemoneAdmin', 'divaAdmin', 'divaUser', 'divaEverything', 'divaSystemAdmin', 'divaDomainAdminUU', 'divaDomainAdminKTH']);
	
	} else if (hrefContains(href, "alvin")) {
		enableCSS("alvinCSS");
		useAlvinPreview();
		enableIcon("alvin");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'alvinAdmin', 'alvinUser']);
	
	} else if (hrefContains(href, "20240226/diva")) {
		enableCSS("divaLilaCSS");
		useDiva20240226();
		enableIcon("diva");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'divaAdmin']);
	
	} else if (hrefContains(href, "diva")) {
		enableCSS("divaLilaCSS");
		useDivaPreview();
		enableIcon("diva");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap,
			['systemoneAdmin', 'divaAdmin', 'divaUser', 'divaEverything', 'divaSystemAdmin', 'divaDomainAdminUU', 'divaDomainAdminKTH']);
	
	} else if (hrefContains(href, "localhost:38080")) {
		useLocalhostWithPort("38080", "38180", "SystemOne utveckling", "systemone");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin']);
	
	} else if (hrefContains(href, "localhost:38081")) {
		enableCSS("alvinCSS");
		useLocalhostWithPort("38081", "38181", "ALVIN utveckling", "alvin");
		enableIcon("alvin");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'alvinAdmin', 'alvinUser']);
	
	} else if (hrefContains(href, "localhost:38082")) {
		enableCSS("divaLilaCSS");
		useLocalhostWithPort("38082", "38182", "DiVA utveckling", "diva");
		enableIcon("diva");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap,
			['systemoneAdmin', 'divaAdmin', 'divaUser', 'divaEverything', 'divaSystemAdmin', 'divaDomainAdminUU', 'divaDomainAdminKTH']);
	
	} else if (hrefContains(href, "116:38080")) {
		useDevWithPort("38080", "38180", "SystemOne metadata (dev dator)", "systemone");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin']);
	
	} else if (hrefContains(href, "116:38081")) {
		enableCSS("alvinCSS");
		useDevWithPort("38081", "38181", "ALVIN metadata (dev dator)", "alvin");
		enableIcon("alvin");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'alvinAdmin']);
	
	} else if (hrefContains(href, "116:38082")) {
		enableCSS("divaLilaCSS");
		useDevWithPort("38082", "38182", "DiVA metadata (dev dator)", "diva");
		enableIcon("diva");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'divaAdmin']);
	
	} else if (hrefContains(href, "238:38080")) {
		useDevExternallyWithPort("38080", "38180", "SystemOne metadata (dev dator)", "systemone");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin']);
	
	} else if (hrefContains(href, "238:38081")) {
		enableCSS("alvinCSS");
		useDevExternallyWithPort("38081", "38181", "ALVIN metadata (dev dator)", "alvin");
		enableIcon("alvin");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'alvinAdmin']);
	
	} else if (hrefContains(href, "238:38082")) {
		enableCSS("divaLilaCSS");
		useDevExternallyWithPort("38082", "38182", "DiVA metadata (dev dator)", "diva");
		enableIcon("diva");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'divaAdmin']);
	
	} else if (hrefContains(href, ":30280")) {
		useCurrentHostWithPort("30080", "30180", "SystemOne metadata (k8s)", "systemone");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin']);
	
	} else if (hrefContains(href, ":30281")) {
		enableCSS("alvinCSS");
		useCurrentHostWithPort("30081", "30181", "ALVIN metadata (k8s)", "alvin");
		enableIcon("alvin");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'alvinAdmin']);
	
	} else if (hrefContains(href, ":30282")) {
		enableCSS("divaLilaCSS");
		useCurrentHostWithPort("30082", "30182", "DiVA metadata (k8s)", "diva");
		enableIcon("diva");
		addAppTokenToAppTokenOptions(appTokenOptions, appTokensMap, ['systemoneAdmin', 'divaAdmin']);
	
	} else {
		askForServerToUse();
	}
};

const addAppTokenToAppTokenOptions = function(appTokenOptions, appTokensMap, appTokenIds) {
	for (let token of appTokenIds) {
		appTokenOptions.push(appTokensMap.get(token));
	}
};

const hrefContains = function(href, part) {
	return (href.indexOf(part) !== -1);
};

const createMapWithAppTokens = function() {
	const appTokens = new Map();

	appTokens.set('systemoneAdmin', {
		text: "appToken for systemoneAdmin",
		type: "appTokenLogin",
		loginId: "systemoneAdmin@system.cora.uu.se",
		appToken: "5d3f3ed4-4931-4924-9faa-8eaf5ac6457e"
	});
	appTokens.set('alvinAdmin', {
		text: "appToken for alvinAdmin",
		type: "appTokenLogin",
		loginId: "alvinAdmin@cora.epc.ub.uu.se",
		appToken: "a50ca087-a3f5-4393-b2bb-315436d3c3be"
	});
	appTokens.set('alvinUser', {
		text: "appToken for alvinUser",
		type: "appTokenLogin",
		loginId: "alvinUser@cora.epc.ub.uu.se",
		appToken: "39291112-aff2-4929-b201-515720693722"
	});
	appTokens.set('divaAdmin', {
		text: "appToken as divaAdmin",
		type: "appTokenLogin",
		loginId: "divaAdmin@cora.epc.ub.uu.se",
		appToken: "49ce00fb-68b5-4089-a5f7-1c225d3cf156"
	});
	appTokens.set('divaUser', {
		text: "appToken for divaUser",
		type: "appTokenLogin",
		loginId: "divaUser@cora.epc.ub.uu.se",
		appToken: "fa98bc21-830b-4dc7-b952-ebe4cf02e921"
	});
	appTokens.set('divaEverything', {
		text: "appToken for divaEverything",
		type: "appTokenLogin",
		loginId: "divaEverything@diva.cora.uu.se",
		appToken: "77edfec1-e1f1-45d4-a452-411668eba0f0"
	});
	appTokens.set('divaSystemAdmin', {
		text: "appToken for systemAdmin",
		type: "appTokenLogin",
		loginId: "systemAdmin@diva.cora.uu.se",
		appToken: "b5ec82bb-9492-4d9f-9069-c2fac3b49493"
	});
	appTokens.set('divaDomainAdminUU', {
		text: "appToken for dominAdminUU",
		type: "appTokenLogin",
		loginId: "dominAdminUU@diva.cora.uu.se",
		appToken: "4808c689-48f1-4fe9-81e1-1888795933cf"
	});
	appTokens.set('divaDomainAdminKTH', {
		text: "appToken for domainAdminKTH",
		type: "appTokenLogin",
		loginId: "domainAdminKTH@diva.cora.uu.se",
		appToken: "cee52dba-56f8-4064-a379-05bd5ceab540"
	});

	return appTokens;
};

const enableIcon = function(systemName) {
	document.getElementById("tabIcon").href = `images/${systemName}Icon.svg`;
};

const enableCSS = function(cssName) {
	document.getElementById(cssName).disabled = true;
	document.getElementById(cssName).disabled = false;
};

const askForServerToUse = function() {
	var questionSpec = {
		"text": "Vilken server vill du använda?",
		"buttons": [{
			"text": "Uppsala Universitetsbibliotek",
			"onclickFunction": useUb
		}, {
			"text": "localhost",
			"onclickFunction": useLocalhost
		}, {
			"text": "localhost8089",
			"onclickFunction": useLocalhost2
		}, {
			"text": "ip from url",
			"onclickFunction": useLocalhost3
		}, {
			"text": "SystemOne",
			"onclickFunction": useSysteOnePreview
		}, {
			"text": "Alvin",
			"onclickFunction": useAlvinPreview
		}, {
			"text": "DiVA",
			"onclickFunction": useDivaPreview
		}]
	};
	var question = CORA.question(questionSpec);
	var questionView = question.getView();
	document.body.appendChild(questionView);
};

const useBaseUrlAndLoginUrl = function(baseUrlIn, loginUrlIn) {
	name = baseUrlIn;
	baseUrl = baseUrlIn;
	appTokenBaseUrl = loginUrlIn;
	startDependencies();
};

const useUb = function() {
	baseUrl = "http://epc.ub.uu.se/cora/rest/";
	appTokenBaseUrl = "http://epc.ub.uu.se/";
	startDependencies();
};

const useLocalhost = function() {
	appTokenBaseUrl = "http://localhost:8180/";
	baseUrl = "http://localhost:8080/systemone/rest/";
	startDependencies();
};

const useLocalhostWithPort = function(port, appTokenPort, nameIn, deployedName) {
	name = nameIn;
	appTokenBaseUrl = "http://localhost:" + appTokenPort + "/";
	baseUrl = "http://localhost:" + port + "/" + deployedName + "/rest/";
	startDependencies();
};

const useDevWithPort = function(port, appTokenPort, nameIn, deployedName) {
	name = nameIn;
	appTokenBaseUrl = "http://192.168.1.116:" + appTokenPort + "/";
	baseUrl = "http://192.168.1.116:" + port + "/" + deployedName + "/rest/";
	startDependencies();
};

const useDevExternallyWithPort = function(port, appTokenPort, nameIn, deployedName) {
	name = nameIn;
	appTokenBaseUrl = "http://130.238.171.238:" + appTokenPort + "/";
	baseUrl = "http://130.238.171.238:" + port + "/" + deployedName + "/rest/";
	startDependencies();
};
const useCurrentHostWithPort = function(port, appTokenPort, nameIn, deployedName) {
	name = nameIn;
	let currentUrl = window.location.href;
	let urlObj = new URL(currentUrl);
	let calculatedUrl = urlObj.protocol + "//" + urlObj.hostname + ":";
	appTokenBaseUrl = calculatedUrl + appTokenPort + "/";
	baseUrl = calculatedUrl + port + "/" + deployedName + "/rest/";
	startDependencies();
};

const useLocalhost2 = function() {
	appTokenBaseUrl = "http://localhost:8089/";
	baseUrl = "http://localhost:8080/systemone/rest/";
	startDependencies();
};

const useLocalhost3 = function() {
	appTokenBaseUrl = "/";
	baseUrl = "/systemone/rest/";
	startDependencies();
};

const useSysteOnePreview = function() {
	name = "SystemOne preview";
	baseUrl = "https://cora.epc.ub.uu.se/systemone/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/systemone/";
	startDependencies();
};

const useAlvinPre = function() {
	name = "ALVIN";
	baseUrl = "https://cora.alvin-portal.org/rest/";
	appTokenBaseUrl = "https://cora.alvin-portal.org/";
	startDependencies();
};

const useAlvinMigration = function() {
	name = "ALVIN migration";
	baseUrl = "https://mig.alvin-portal.org/rest/";
	appTokenBaseUrl = "https://mig.alvin-portal.org/";
	startDependencies();
};

const useAlvinPreview = function() {
	name = "ALVIN preview";
	baseUrl = "https://cora.epc.ub.uu.se/alvin/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/alvin/";
	startDependencies();
};

const useDivaMigration = function() {
	name = "DiVA migration";
	baseUrl = "https://mig.diva-portal.org/rest/";
	appTokenBaseUrl = "https://mig.diva-portal.org/";
	startDependencies();
};

const useDivaPreview = function() {
	name = "DiVA preview";
	baseUrl = "https://cora.epc.ub.uu.se/diva/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/diva/";
	startDependencies();
};

const useDivaPre = function() {
	name = "DiVA pre";
	baseUrl = "https://pre.diva-portal.org/rest/";
	appTokenBaseUrl = "https://pre.diva-portal.org/";
	startDependencies();
};

const useDiva20240226 = function() {
	name = "DiVA version 20240226";
	baseUrl = "https://cora.epc.ub.uu.se/20240226/diva/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/20240226/diva/";
	startDependencies();
};