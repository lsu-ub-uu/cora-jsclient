import { startUsingServer } from "../useServer.js";
import { ajaxCallFactory as ajaxCallFactoryImported } from "./net/ajaxCallFactory.js";
import { authTokenHolder as authTokenHolderImported } from "./login/authTokenHolder.js";
import { clientInstanceProvider } from "./jsClient/clientInstanceProvider.js";
import { jsClientFactory as jsClientFactoryImported } from "./jsClient/jsClientFactory.js";
import { metadataProviderFactory } from "./metadata/metadataProviderFactory.js";
import { recordTypeProviderFactory } from "./recordTypeProviderFactory.js";
import { reloadableMetadataProvider } from "./metadata/reloadableMetadataProvider.js";
import { reloadableRecordTypeProvider } from "./reloadableRecordTypeProvider.js";
import { reloadableSearchProvider } from "./search/reloadableSearchProvider.js";
import { reloadableTextProvider } from "./metadata/reloadableTextProvider.js";
import { searchProviderFactory } from "./search/searchProviderFactory.js";
import { textProviderFactory } from "./metadata/textProviderFactory.js";
import { xmlHttpRequestFactory as xmlHttpRequestFactoryImported } from "./net/xmlHttpRequestFactory.js";

const state = {
	name : "A Client",
	baseUrl : "http://epc.ub.uu.se/cora/rest/",
	appTokenLogin : undefined,
	passwordLogin : undefined,
	jsClientSpec : undefined,
	jsClient : undefined,
	jsClientView : undefined,
	metadataProvider : undefined,
	textProvider : undefined,
	searchProvider : undefined,
	recordTypeProvider : undefined,
	metadataProviderStarted : false,
	textProviderStarted : false,
	searchProviderStarted : false,
	recordTypeProviderStarted : false
};

const authTokenHolder = authTokenHolderImported();
const xmlHttpRequestFactory = xmlHttpRequestFactoryImported();
const ajaxCallFactoryDependencies = {
	"xmlHttpRequestFactory" : xmlHttpRequestFactory,
	"authTokenHolder" : authTokenHolder
};
const ajaxCallFactory = ajaxCallFactoryImported(ajaxCallFactoryDependencies);

const metadataProviderReady = function() {
	state.metadataProviderStarted = true;
	possiblyStartJsClient();
};

const textProviderReady = function() {
	state.textProviderStarted = true;
	possiblyStartJsClient();
};

const searchProviderReady = function() {
	state.searchProviderStarted = true;
	possiblyStartJsClient();
};

const recordTypeProviderReady = function() {
	state.recordTypeProviderStarted = true;
	possiblyStartJsClient();
};

const possiblyStartJsClient = function() {
	if (state.recordTypeProviderStarted && state.metadataProviderStarted
			&& state.textProviderStarted && state.searchProviderStarted) {
		startJsClient();
	}
};

const startDependencies = function() {
	tryToPreventAccidentialLeavOfPage();

	let metadataListLink = createListActionLink("metadata");
	let validationTypeListLink = createListActionLink("validationType");
	let presentationListLink = createListActionLink("presentation");
	let textListLink = createListActionLink("text");
	let guiElementListLink = createListActionLink("guiElement");

	let textProviderSpec = {
		"textListLink" : textListLink,
		"lang" : "sv",
		"callWhenReady" : textProviderReady
	};
	let dependenciesTextProviderFactory = {
		"ajaxCallFactory" : ajaxCallFactory
	};
	let dependenciesTextProvider = {
		"textProviderFactory" : textProviderFactory(dependenciesTextProviderFactory)
	};
	state.textProvider = reloadableTextProvider(dependenciesTextProvider, textProviderSpec);

	let metadataProviderSpec = {
		"metadataListLink" : metadataListLink,
		"textListLink" : textListLink,
		"presentationListLink" : presentationListLink,
		"guiElementListLink" : guiElementListLink,
		"callWhenReady" : metadataProviderReady
	};

	let dependenciesMetadataProviderFactory = {
		"textProvider" : state.textProvider,
		"ajaxCallFactory" : ajaxCallFactory
	};
	let dependenciesMetadataProvider = {
		"metadataProviderFactory" : metadataProviderFactory(dependenciesMetadataProviderFactory)
	};
	state.metadataProvider = reloadableMetadataProvider(dependenciesMetadataProvider,
			metadataProviderSpec);

	let dependenciesSearchProviderFactory = {
		"ajaxCallFactory" : ajaxCallFactory
	};
	let dependenciesSearchProvider = {
		"searchProviderFactory" : searchProviderFactory(dependenciesSearchProviderFactory)
	};
	let searchRecordListLink = createListActionLink("search");
	let specSearchProvider = {
		"searchRecordListLink" : searchRecordListLink,
		"callWhenReady" : searchProviderReady
	};
	state.searchProvider = reloadableSearchProvider(dependenciesSearchProvider,
			specSearchProvider);

	let dependenciesRecordTypeProviderFactory = {
		"ajaxCallFactory" : ajaxCallFactory
	};
	let dependenciesReloadableRecordTypeProvider = {
		"recordTypeProviderFactory" : recordTypeProviderFactory(
				dependenciesRecordTypeProviderFactory)
	};
	let recordTypeListLink = createListActionLink("recordType");
	let recordTypeProviderSpec = {
		"recordTypeListLink" : recordTypeListLink,
		"validationTypeListLink" : validationTypeListLink,
		"callWhenReady" : recordTypeProviderReady
	};
	state.recordTypeProvider = reloadableRecordTypeProvider(
			dependenciesReloadableRecordTypeProvider, recordTypeProviderSpec);
};

const tryToPreventAccidentialLeavOfPage = function() {
	window.addEventListener("beforeunload", function(e) {
		let confirmationMessage = "\\o/";
		(e || window.event).returnValue = confirmationMessage;
		return confirmationMessage;
	});
};

const createListActionLink = function(recordType) {
	return {
		requestMethod : "GET",
		rel : "list",
		url : state.baseUrl + "record/" + recordType + "/",
		accept : "application/vnd.cora.recordList+json"
	};
};

const startJsClient = function() {
	let providers = {
		"metadataProvider" : state.metadataProvider,
		"textProvider" : state.textProvider,
		"searchProvider" : state.searchProvider,
		"recordTypeProvider" : state.recordTypeProvider,
		"clientInstanceProvider" : clientInstanceProvider()
	};
	state.jsClientSpec = {
		"name" : state.name,
		"baseUrl" : state.baseUrl,
		appTokenLogin : state.appTokenLogin,
		passwordLogin : state.passwordLogin
	};
	let dependencies = {
		"authTokenHolder" : authTokenHolder
	};
	let jsClientFactory = jsClientFactoryImported(providers, dependencies);
	state.jsClient = jsClientFactory.factor(state.jsClientSpec);
	state.jsClientView = state.jsClient.getView();
	document.body.appendChild(state.jsClient.getView());
};

const callError = function(error) {
	return error;
};

const enableIcon = function(systemName) {
	document.getElementById("tabIcon").href = `images/${systemName}Icon.svg`;
};

const enableCSS = function(cssName) {
	document.getElementById(cssName).disabled = true;
	document.getElementById(cssName).disabled = false;
};

window.addEventListener("load", function() {
	startUsingServer({
		ajaxCallFactory : ajaxCallFactory,
		serverRestUrl : window.serverRestUrl,
		startDependencies : startDependencies,
		callError : callError,
		enableCSS : enableCSS,
		enableIcon : enableIcon,
		get name() {
			return state.name;
		},
		set name(value) {
			state.name = value;
		},
		get baseUrl() {
			return state.baseUrl;
		},
		set baseUrl(value) {
			state.baseUrl = value;
		},
		get appTokenLogin() {
			return state.appTokenLogin;
		},
		set appTokenLogin(value) {
			state.appTokenLogin = value;
		},
		get passwordLogin() {
			return state.passwordLogin;
		},
		set passwordLogin(value) {
			state.passwordLogin = value;
		}
	});
});

export {};
