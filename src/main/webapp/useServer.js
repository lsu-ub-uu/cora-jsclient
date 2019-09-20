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
var href;
function start() {

	href = window.location.href;
	if (href.indexOf("systemone") !== -1) {
		document.getElementById("systemOneCSS").disabled = true;
		document.getElementById("systemOneCSS").disabled = false;
		useCora();
	} else if (href.indexOf("alvin") !== -1) {
		document.getElementById("alvinCSS").disabled = true;
		document.getElementById("alvinCSS").disabled = false;
		useAlvin();
	} else if (href.indexOf("diva") !== -1) {
		document.getElementById("divaCSS").disabled = true;
		document.getElementById("divaCSS").disabled = false;
		useDiva();
	} else if (href.indexOf("localhost:8080") !== -1 ) {
		useLocalhostWithPort("8080","8180", "SystemOne local dev", "systemone");
	} else if (href.indexOf("localhost:8081") !== -1 ) {
		document.getElementById("alvinCSS").disabled = true;
		document.getElementById("alvinCSS").disabled = false;
		useLocalhostWithPort("8081","8181","ALVIN local dev", "alvin");
	} else if (href.indexOf("localhost:8082") !== -1 ) {
		document.getElementById("divaCSS").disabled = true;
		document.getElementById("divaCSS").disabled = false;
		useLocalhostWithPort("8082","8182", "DiVA local dev", "diva");
	} else if (href.indexOf("116:8080") !== -1) {
		useDevWithPort("8080","8180", "SystemOne dev", "systemone");
	} else if (href.indexOf("116:8081") !== -1) {
		document.getElementById("alvinCSS").disabled = true;
		document.getElementById("alvinCSS").disabled = false;
		useDevWithPort("8081","8181", "ALVIN dev", "alvin");
	} else if (href.indexOf("116:8082") !== -1) {
		document.getElementById("divaCSS").disabled = true;
		document.getElementById("divaCSS").disabled = false;
		useDevWithPort("8082","8182","DiVA dev", "diva");
	} else {
		askForServerToUse();
	}
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

function useLocalhost2() {
	appTokenBaseUrl = "http://localhost:8089/";
	baseUrl = "http://localhost:8080/systemone/rest/";
	startDependencies();
}
function useLocalhost3() {
	var systemToUse = "systemone";
	if(href.indexOf("238:8081") !== -1){
		systemToUse="alvin";
	}else if(href.indexOf("238:8082") !== -1){
		systemToUse="diva";
	}
	appTokenBaseUrl = "/";
	baseUrl = "/"+systemToUse+"/rest/";
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