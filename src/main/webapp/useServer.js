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
function start() {

	var href = window.location.href;
	if (href.indexOf("systemone") !== -1) {
		enableCSS("aClientCSS");
		useCora();
	} else if (href.indexOf("alvin") !== -1) {
		enableCSS("alvinCSS");
		useAlvin();
		enableIcon("alvin");
	} else if (href.indexOf("20240226/diva") !== -1) {
		enableCSS("divaLilaCSS");
		useDiva20240226();
		enableIcon("diva");
	} else if (href.indexOf("diva") !== -1) {
		enableCSS("divaLilaCSS");
		useDiva();
		enableIcon("diva");
	} else if (href.indexOf("localhost:38080") !== -1 ) {
		useLocalhostWithPort("38080","38180", "SystemOne utveckling", "systemone");
	} else if (href.indexOf("localhost:38081") !== -1 ) {
		enableCSS("alvinCSS");
		useLocalhostWithPort("38081","38181","ALVIN utveckling", "alvin");
		enableIcon("alvin");
	} else if (href.indexOf("localhost:38082") !== -1 ) {
		enableCSS("divaLilaCSS");
		useLocalhostWithPort("38082","38182", "DiVA utveckling", "diva");
		enableIcon("diva");
	} else if (href.indexOf("116:38080") !== -1) {
		useDevWithPort("38080","38180", "SystemOne metadata (dev dator)", "systemone");
	} else if (href.indexOf("116:38081") !== -1) {
		enableCSS("alvinCSS");
		useDevWithPort("38081","38181", "ALVIN metadata (dev dator)", "alvin");
		enableIcon("alvin");
	} else if (href.indexOf("116:38082") !== -1) {
		enableCSS("divaLilaCSS");
		useDevWithPort("38082","38182","DiVA metadata (dev dator)", "diva");
		enableIcon("diva");
	} else if (href.indexOf("238:38080") !== -1) {
		useDevExternallyWithPort("38080","38180", "SystemOne metadata (dev dator)", "systemone");
	} else if (href.indexOf("238:38081") !== -1) {
		enableCSS("alvinCSS");
		useDevExternallyWithPort("38081","38181", "ALVIN metadata (dev dator)", "alvin");
		enableIcon("alvin");
	} else if (href.indexOf("238:38082") !== -1) {
		enableCSS("divaLilaCSS");
		useDevExternallyWithPort("38082","38182","DiVA metadata (dev dator)", "diva");
		enableIcon("diva");
	}
	else {
		askForServerToUse();
	}
}

function enableIcon(systemName){
	document.getElementById("tabIcon").href = `images/${systemName}Icon.svg`;
}
function enableCSS(cssName){
	document.getElementById(cssName).disabled = true;
	document.getElementById(cssName).disabled = false;
}

function askForServerToUse() {
	var questionSpec = {
		"text" : "Vilken server vill du använda?",
		"buttons" : [ {
			"text" : "Uppsala Universitetsbibliotek",
			"onclickFunction" : useUb
		}, {
			"text" : "localhost",
			"onclickFunction" : useLocalhost
		}, {
			"text" : "localhost8089",
			"onclickFunction" : useLocalhost2
		}, {
			"text" : "ip from url",
			"onclickFunction" : useLocalhost3
		}, {
			"text" : "SystemOne",
			"onclickFunction" : useCora
		}, {
			"text" : "Alvin",
			"onclickFunction" : useAlvin
		}, {
			"text" : "DiVA",
			"onclickFunction" : useDiva
		}, {
			"text" : "DiVA 20240226",
			"onclickFunction" : useDiva20240226
		} ]
	};
	var question = CORA.question(questionSpec);
	var questionView = question.getView();
	document.body.appendChild(questionView);
}

function useUb() {
	baseUrl = "http://epc.ub.uu.se/cora/rest/";
	appTokenBaseUrl = "http://epc.ub.uu.se/";
	startDependencies();
}

function useLocalhost() {
	appTokenBaseUrl = "http://localhost:8180/";
	baseUrl = "http://localhost:8080/systemone/rest/";
	startDependencies();
}

function useLocalhostWithPort(port, appTokenPort, nameIn, deployedName) {
	name = nameIn;
	appTokenBaseUrl = "http://localhost:" + appTokenPort + "/";
	baseUrl = "http://localhost:" + port + "/"+ deployedName+"/rest/";
	startDependencies();
}
function useDevWithPort(port, appTokenPort, nameIn, deployedName) {
	name = nameIn;
	appTokenBaseUrl = "http://192.168.1.116:" + appTokenPort + "/";
	baseUrl = "http://192.168.1.116:" + port + "/"+ deployedName+"/rest/";
	startDependencies();
}
function useDevExternallyWithPort(port, appTokenPort, nameIn, deployedName) {
	name = nameIn;
	appTokenBaseUrl = "http://130.238.171.238:" + appTokenPort + "/";
	baseUrl = "http://130.238.171.238:" + port + "/"+ deployedName+"/rest/";
	startDependencies();
}

function useLocalhost2() {
	appTokenBaseUrl = "http://localhost:8089/";
	baseUrl = "http://localhost:8080/systemone/rest/";
	startDependencies();
}
function useLocalhost3() {
	appTokenBaseUrl = "/";
	baseUrl = "/systemone/rest/";
	startDependencies();
}
function useCora() {
	name = "Systemone";
	baseUrl = "https://cora.epc.ub.uu.se/systemone/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/systemone/";
	startDependencies();
}
function useAlvin() {
	name = "ALVIN";
	baseUrl = "https://cora.epc.ub.uu.se/alvin/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/alvin/";
	startDependencies();
}
function useDiva() {
	name = "DiVA";
	baseUrl = "https://cora.epc.ub.uu.se/diva/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/diva/";
	startDependencies();
}
function useDiva20240226() {
	name = "DiVA 20240226";
	baseUrl = "https://cora.epc.ub.uu.se/20240226/diva/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/20240226/diva/";
	startDependencies();
}