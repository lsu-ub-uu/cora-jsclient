import CORA from "./main.js";
import CORATEST from "../../test/script/aCoratestNameSpace.js";
import "../../test/script/metadata/metadataProviderStub.js";
import "../../test/script/metadata/textProviderStub.js";
import "../../test/script/recordTypeProviderStub.js";
import "../../test/script/metadata/metadataProviderRealStub.js";
import "../../test/script/metadata/textProviderRealStub.js";

const MetadataProviderStub = CORATEST.MetadataProviderStub;

	const coraTest = CORATEST;
		coraTest.dependenciesFactory = function(metadataProvider, pubSub, textProvider,
				recordTypeProvider) {
			var factor = function(metadataId, presentationId, data) {
				var specDataHolder = {
					"metadataId" : metadataId,
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub
				};
				var dataHolder = CORA.dataHolder(specDataHolder);

				var specJSBookkeeper = {
					"metadataId" : metadataId,
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub,
					"textProvider" : textProvider,
					"dataHolder" : dataHolder
				};
				var jsBookkeeper = CORA.jsBookkeeper(specJSBookkeeper);

				var dependencyPresentationFactory = {
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub,
					"textProvider" : textProvider,
					"jsBookkeeper" : jsBookkeeper,
					"recordTypeProvider" : recordTypeProvider,
					"dataDivider" : "systemX"
				};
				var presentationFactory = CORA.presentationFactory(dependencyPresentationFactory);

				var spec = {
					"metadataIdUsedInData" : metadataId,
					"presentationId" : presentationId,
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub,
					"textProvider" : textProvider,
					"jsBookkeeper" : jsBookkeeper,
					"presentationFactory" : presentationFactory
				};
				var presentation = CORA.presentation(spec);
				var presentation2 = CORA.presentation(spec);

				var specMetadataController = {
					"metadataId" : metadataId,
					"data" : data,
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub
				};
				var metadataController = CORA.metadataController(specMetadataController);

				return Object.freeze({
					jsBookkeeper : jsBookkeeper,
					presentationFactory : presentationFactory,
					presentation : presentation,
					presentation2 : presentation2,
					dataHolder : dataHolder,
					metadataController : metadataController
				});
			};
			return Object.freeze({
				factor : factor
			});
		};


	window.onload = start;
	var baseUrl = "http://epc.ub.uu.se/cora/rest/";
	var jsClientSpec;
	function start() {
		startDependencies();
		// 		startJsClient();
		getStuffFromServer();

		var metadataProvider = new MetadataProviderStub();
		var textProvider = CORATEST.textProviderStub();
		var recordTypeProvider = CORATEST.recordTypeProviderStub();
		client1(metadataProvider, textProvider, recordTypeProvider);
		client2(metadataProvider, textProvider, recordTypeProvider);
		client3(metadataProvider, textProvider, recordTypeProvider);
		client4(metadataProvider, textProvider, recordTypeProvider);
		client5(metadataProvider, textProvider, recordTypeProvider);
		client6(metadataProvider, textProvider, recordTypeProvider);
		client7(metadataProvider, textProvider, recordTypeProvider);
		client8(metadataProvider, textProvider, recordTypeProvider);

		var metadataProviderRealStub = CORATEST.metadataProviderRealStub();
		var textProviderRealStub = CORATEST.textProviderRealStub();

		// 		client9(metadataProviderRealStub, textProviderRealStub, recordTypeProvider);

		client10(metadataProvider, textProvider, recordTypeProvider);
		client11(metadataProvider, textProvider, recordTypeProvider);
		client12(metadataProvider, textProvider, recordTypeProvider);
	}
	var metadataProviderStarted = false;
	function metadataProviderReady() {
		metadataProviderStarted = true;
		possiblyStartJsClient();
	}

	var textProviderStarted = false;
	function textProviderReady() {
		textProviderStarted = true;
		possiblyStartJsClient();
	}

	var recordTypeProviderStarted = false;
	function recordTypeProviderReady() {
		recordTypeProviderStarted = true;
		possiblyStartJsClient();
	}

	function possiblyStartJsClient() {
		if (recordTypeProviderStarted && metadataProviderStarted && textProviderStarted) {
			startJsClients();
		}
	}

	function startDependencies() {
		var xmlHttpRequestFactory = CORA.xmlHttpRequestFactory();
		var loginManager = CORA.loginManager();

		var ajaxCallFactoryDependencies = {
			"xmlHttpRequestFactory" : xmlHttpRequestFactory,
			"loginManager" : loginManager
		};
		var dependencies = {
			"ajaxCallFactory" : CORA.ajaxCallFactory(ajaxCallFactoryDependencies),
			"loginManager" : loginManager
		};
		var metadataListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : baseUrl + "record/metadata/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		var presentationListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : baseUrl + "record/presentation/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		var textListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : baseUrl + "record/text/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		var metadataProviderSpec = {
			"dependencies" : dependencies,
			"metadataListLink" : metadataListLink,
			"textListLink" : textListLink,
			"presentationListLink" : presentationListLink,
			"callWhenReady" : metadataProviderReady
		};

		var metadataProvider = CORA.metadataProvider(metadataProviderSpec);

		var textProviderSpec = {
			"dependencies" : dependencies,
			"textListLink" : textListLink,
			"lang" : "sv",
			"callWhenReady" : textProviderReady
		};

		var textProvider = CORA.textProvider(textProviderSpec);

		var recordTypeListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : baseUrl + "record/recordType/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		var recordTypeProviderSpec = {
			"dependencies" : dependencies,
			"recordTypeListLink" : recordTypeListLink,
			"callWhenReady" : recordTypeProviderReady
		};
		var recordTypeProvider = CORA.recordTypeProvider(recordTypeProviderSpec);

		var jsClientDependencies = {
			"ajaxCallFactory" : CORA.ajaxCallFactory(ajaxCallFactoryDependencies),
			"loginManager" : loginManager,
			"metadataProvider" : metadataProvider,
			"textProvider" : textProvider,
			"recordTypeProvider" : recordTypeProvider,
			"xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
			"presentationFactoryFactory" : "not implemented yet"
		}
		jsClientSpec = {
			"dependencies" : jsClientDependencies,
			"name" : "The Client",
			"baseUrl" : baseUrl
		};
	}
	function startJsClients() {
		// 		var jsClient = CORA.jsClient(jsClientSpec);
		// 		document.body.appendChild(jsClient.getView());
		client9(jsClientSpec.dependencies.metadataProvider, jsClientSpec.dependencies.textProvider,
				jsClientSpec.dependencies.recordTypeProvider);
	}

	// 	function startJsClient() {
	// 		var spec = {
	// 			"xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
	// 			"name" : "The Client",
	// 			"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	// 		};
	// 		var jsClient = CORA.jsClient(spec);
	// 		document.body.appendChild(jsClient.getView());
	// 	}

	function getStuffFromServer() {
		var spec = {
			"xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
			"timeoutInMS" : 1000,
			"timeoutMethod" : function() {
				alert("timeout");
			},
			"requestMethod" : "GET",
			"requestHeaders" : {
				"content-type" : "application/vnd.cora.record+json",
				"accept" : "application/vnd.cora.record+json"
			},
			"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
			"loadMethod" : loadMethod,
			"errorMethod" : function(error) {
				alert("error" + error.status);
			},
		};
		CORA.ajaxCall(spec);
	}
	function loadMethod(answer) {
		var xmlHttpRequest1 = document.getElementById("xmlHttpRequest1");
		xmlHttpRequest1.textContent = answer.responseText;
	}
	function client1(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client1");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupIdOneTextChild";
		var presentationId = "pgGroupIdOneTextChildOutput";

		var dependencies = dependenciesFactory.factor(metadataId, presentationId);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		var path2 = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			} ]
		};
		var data2 = {
			"path" : path2,
			"data" : "a Value"
		};
		pubSub.publish("setValue", data2);
	}

	function client2(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client2");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupIdOneTextChild";
		var presentationId = "pgGroupIdOneTextTwoTextChildren";

		var data = {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A different value!"
			} ]
		};

		var dependencies = dependenciesFactory.factor(metadataId, presentationId, data);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		var path2 = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			} ]
		};
		var data2 = {
			"path" : path2,
			"data" : "aValue1"
		};

	}

	function client3(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client3");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupInGroupOneTextChild";
		var presentationId = "pgGroupInGroupIdOneTextOneTextChild";

		var data = {
			"name" : "groupInGroupOneTextChild",
			"children" : [ {
				"name" : "groupIdOneTextChild",
				"children" : [ {
					"name" : "textVariableId",
					"value" : "A Value2"
				} ]
			} ]
		};

		var dependencies = dependenciesFactory.factor(metadataId, presentationId, data);

		var view = dependencies.presentation.getView();
		place.appendChild(view);
	}

	function client4(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client4");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupIdOneTextChildRepeat1to3";
		var presentationId = "pgGroupIdRepeatingContainerRepeat1to3";

		var data = {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A different value!",
				"repeatId" : "one"
			} ]
		};

		var dependencies = dependenciesFactory.factor(metadataId, presentationId, data);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		view.dataHolder = dependencies.dataHolder;

		function showData() {
			var clientData = document.getElementById("client4Data");
			clientData.innerHTML = JSON.stringify(dependencies.dataHolder.getData());
		}
		document.getElementById("client4DataButton").onclick = showData;

		var path2 = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			} ]
		};
		var data2 = {
			"path" : path2,
			"data" : "aValue1"
		};

	}
	function client5(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client5");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupIdTwoTextChildRepeat1to5";
		var presentationId = "pgGroupIdTwoTextChildSurrounding2TextPGroup2";

		var dependencies = dependenciesFactory.factor(metadataId, presentationId);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		view.dataHolder = dependencies.dataHolder;

		function showData() {
			var clientData = document.getElementById("client5Data");
			clientData.innerHTML = JSON.stringify(dependencies.dataHolder.getData());
		}
		document.getElementById("client5DataButton").onclick = showData;
	}
	function client6(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client6");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup";
		var presentationId = "pgTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup";

		var data = {
			"name" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"children" : [ {
				"name" : "textVarRepeat1to3InGroupOneAttribute",
				"children" : [ {
					"name" : "textVar",
					"value" : "one",
					"repeatId" : "1"
				}, {
					"name" : "textVar",
					"value" : "two",
					"repeatId" : "2"
				} ],
				"attributes" : {
					"anAttribute" : "aFinalValue"
				},
				"repeatId" : "1"
			}, {
				"name" : "textVarRepeat1to3InGroupOneAttribute",
				"children" : [ {
					"name" : "textVar",
					"value" : "three",
					"repeatId" : "3"
				} ],
				"attributes" : {
					"anAttribute" : "aFinalValue"
				},
				"repeatId" : "2"
			}, {
				"name" : "textVarRepeat1to3InGroupOneAttribute",
				"children" : [ {
					"name" : "textVar",
					"value" : "four",
					"repeatId" : "4"
				} ],
				"attributes" : {
					"anOtherAttribute" : "aOtherFinalValue"
				},
				"repeatId" : "3"
			} ]
		};
		var dependencies = dependenciesFactory.factor(metadataId, presentationId, data);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		view.dataHolder = dependencies.dataHolder;

		function showData() {
			var clientData = document.getElementById("client6Data");
			clientData.innerHTML = JSON.stringify(dependencies.dataHolder.getData());
		}
		document.getElementById("client6DataButton").onclick = showData;
	}
	function client7(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client7");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupIdOneTextChildRepeat1to3";
		var presentationId = "pgGroupIdOneTextChildMinimized";
		var dependencies = dependenciesFactory.factor(metadataId, presentationId);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		view.dataHolder = dependencies.dataHolder;

		function showData() {
			var clientData = document.getElementById("client7Data");
			clientData.innerHTML = JSON.stringify(dependencies.dataHolder.getData());
		}
		document.getElementById("client7DataButton").onclick = showData;
	}
	function client8(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client8");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupId1toXCollectionChild";
		var presentationId = "pgGroupId1toXCollectionChild";

		var data = {
			"name" : "groupId1toXCollectionChild",
			"children" : [ {
				"name" : "yesNoUnknownVar",
				"value" : "",
				"repeatId" : "0"
			}, {
				"name" : "yesNoUnknownVar",
				"value" : "yes",
				"repeatId" : "1"
			}, {
				"name" : "yesNoUnknownVar",
				"value" : "no",
				"repeatId" : "2"
			}, {
				"name" : "yesNoUnknownVar",
				"value" : "unknown",
				"repeatId" : "3"
			} ]
		};
		var dependencies = dependenciesFactory.factor(metadataId, presentationId, data);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		view.dataHolder = dependencies.dataHolder;

		function showData() {
			var clientData = document.getElementById("client8Data");
			clientData.innerHTML = JSON.stringify(dependencies.dataHolder.getData());
		}
		document.getElementById("client8DataButton").onclick = showData;
		place.appendChild(dependencies.presentation2.getView());

	}

	function client9(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client9");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "textSystemOneNewGroup";
		var presentationId = "textSystemOneFormNewPGroup";
		var dependencies = dependenciesFactory.factor(metadataId, presentationId);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		view.dataHolder = dependencies.dataHolder;

		function showData() {
			var clientData = document.getElementById("client9Data");
			clientData.innerHTML = JSON.stringify(dependencies.dataHolder.getData());
		}
		document.getElementById("client9DataButton").onclick = showData;

		// 		var spec = {
		// 				"presentationId" : presentationId,
		// 				"metadataProvider" : metadataProvider,
		// 				"pubSub" : pubSub,
		// 				"textProvider" : textProvider,
		// 				"jsBookkeeper" : dependencies.jsBookkeeper,
		// 				"presentationFactory" : dependencies.presentationFactory
		// 			};
		// 			var presentation2 = CORA.presentation(spec);
		place.appendChild(dependencies.presentation2.getView());

	}
	function client10(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client10");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupIdOneTextChild";
		var presentationId = "groupOneTextChildOutputImagePGroup";

		var dependencies = dependenciesFactory.factor(metadataId, presentationId);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		var path2 = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			} ]
		};
		var data2 = {
			"path" : path2,
			"data" : "http://imgs.xkcd.com/static/terrible_small_logo.png"
		};
		pubSub.publish("setValue", data2);
	}

	function client11(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client11");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupIdOneRecordLinkChildWithPath";
		var presentationId = "groupIdOneRecordLinkChildWithPathPGroup";
		var dependencies = dependenciesFactory.factor(metadataId, presentationId);

		var view = dependencies.presentation.getView();
		place.appendChild(view);

		view.dataHolder = dependencies.dataHolder;

		function showData() {
			var clientData = document.getElementById("client11Data");
			clientData.innerHTML = JSON.stringify(dependencies.dataHolder.getData());
		}
		document.getElementById("client11DataButton").onclick = showData;

	}

	function client12(metadataProvider, textProvider, recordTypeProvider) {
		var place = document.getElementById("client12");
		var pubSub = CORA.pubSub();
		var dependenciesFactory = CORATEST.dependenciesFactory(metadataProvider, pubSub,
				textProvider, recordTypeProvider);
		var metadataId = "groupIdOneChildOfBinaryRecordLinkChild";
		var presentationId = "groupIdOneChildOfBinaryRecordLinkChildPGroup";
		var dependencies = dependenciesFactory.factor(metadataId, presentationId);
		var view = dependencies.presentation.getView();
		place.appendChild(view);

		view.dataHolder = dependencies.dataHolder;

		function showData() {
			var clientData = document.getElementById("client12Data");
			clientData.innerHTML = JSON.stringify(dependencies.dataHolder.getData());
		}
		document.getElementById("client12DataButton").onclick = showData;

	}

export {};
