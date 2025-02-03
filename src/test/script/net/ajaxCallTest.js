/*
 * Copyright 2016, 2025 Uppsala University Library
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
"use strict";

QUnit.module("net/ajaxCallTest.js", hooks => {
	const test = QUnit.test;
	let loadMethodWasCalled;
	let answer;
	let errorMethodWasCalled;
	let timeoutMethodWasCalled;
	let downloadProgressCalls;
	let uploadProgressCalls;
	let xmlHttpRequestFactoryMultipleSpy;
	let spec;

	hooks.beforeEach(() => {
		loadMethodWasCalled = false;
		errorMethodWasCalled = false;
		timeoutMethodWasCalled = false;
		downloadProgressCalls = 0;
		uploadProgressCalls = 0;
		answer = undefined;

		xmlHttpRequestFactoryMultipleSpy = CORATEST.xmlHttpRequestFactoryMultipleSpy();
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(200);

		spec = {
			xmlHttpRequestFactory: xmlHttpRequestFactoryMultipleSpy,
			requestMethod: "GET",
			url: "http://localhost:8080/therest/rest/record/recordType",
			requestHeaders: {
				"content-type": "application/vnd.uub.record+json",
				accept: "application/vnd.uub.record+json",
				authToken: "someRandomToken"
			},
			loadMethod: loadMethod,
			errorMethod: errorMethod,
			timeoutMethod: timeoutMethod,
			downloadProgressMethod: downloadProgressMethod,
			uploadProgressMethod: uploadProgressMethod
		};
	});

	hooks.afterEach(() => {
		clearTimeoutOfLastAjaxCall();
	});

	const clearTimeoutOfLastAjaxCall = function() {
		spec.loadMethod = function() { };
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		xmlHttpRequestSpy.addedEventListeners["load"][0]([]);
	}

	const loadMethod = function(answerIn) {
		loadMethodWasCalled = true;
		answer = answerIn;
	};

	const errorMethod = function() {
		errorMethodWasCalled = true;
	};

	const timeoutMethod = function() {
		timeoutMethodWasCalled = true;
	};

	const downloadProgressMethod = function() {
		downloadProgressCalls++;
	};

	const uploadProgressMethod = function() {
		uploadProgressCalls++;
	};

	const getLoadMethodWasCalled = function() {
		return loadMethodWasCalled;
	};

	const getAnswer = function() {
		return answer;
	};

	const getErrorMethodWasCalled = function() {
		return errorMethodWasCalled;
	};

	const getTimeoutMethodWasCalled = function() {
		return timeoutMethodWasCalled;
	};


	test("init", function(assert) {
		let ajaxCall = CORA.ajaxCall(spec);
		assert.strictEqual(ajaxCall.type, "ajaxCall");
		assert.strictEqual(ajaxCall.spec, spec);
	});

	test("defaultTimeout", function(assert) {
		let ajaxCall = CORA.ajaxCall(spec);
		assert.strictEqual(ajaxCall.getCurrentTimeout(), 90000);
	});

	test("setTimeout", function(assert) {
		spec.timeoutInMS = 10000;
		let ajaxCall = CORA.ajaxCall(spec);
		assert.strictEqual(ajaxCall.getCurrentTimeout(), 10000);
	});

	test("testResponseTypeNotSet", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(201);
		xmlHttpRequestFactoryMultipleSpy.setResponseText("a dummy response text");
		xmlHttpRequestFactoryMultipleSpy.setResponse("a dummy response");

		CORA.ajaxCall(spec);
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		assert.strictEqual(xmlHttpRequestSpy.responseType, undefined);
		assert.strictEqual(getAnswer().responseText, "a dummy response text");
		assert.strictEqual(getAnswer().response, "a dummy response");
	});
	
	test("testResponseTypeDocument", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(201);
		xmlHttpRequestFactoryMultipleSpy.setResponseText("a dummy response text");
		xmlHttpRequestFactoryMultipleSpy.setResponse("a dummy response");

		spec.responseType = "document";
		CORA.ajaxCall(spec);
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		assert.strictEqual(xmlHttpRequestSpy.responseType, "document");
		assert.strictEqual(getAnswer().responseText, "a dummy response text");
		assert.strictEqual(getAnswer().response, "a dummy response");
	});

	test("testResponseType", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(201);
		xmlHttpRequestFactoryMultipleSpy.setResponseText("a dummy response text");
		xmlHttpRequestFactoryMultipleSpy.setResponse("a dummy response");

		spec.responseType = "blob";
		CORA.ajaxCall(spec);
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		assert.strictEqual(xmlHttpRequestSpy.responseType, "blob");
		assert.strictEqual(getAnswer().responseText, undefined);
		assert.strictEqual(getAnswer().response, "a dummy response");
	});

	test("testXMLHttpRequestSetUpCorrect", function(assert) {
		CORA.ajaxCall(spec);

		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		let openUrl = xmlHttpRequestSpy.getOpenUrl();
		assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://localhost:8080/therest/rest/record/recordType");
		assert.strictEqual(openUrl.substring(openUrl.indexOf("?"), openUrl.lastIndexOf("=")),
			"?preventCache");
		assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
		assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/vnd.uub.record+json");
		assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"][0],
			"application/vnd.uub.record+json");
		assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["authToken"][0], "someRandomToken");
		assert.ok(getLoadMethodWasCalled(), "loadMethod was called ok")
	});

	test("testXMLHttpRequestSetUpWithRequestParameter", function(assert) {
		spec.parameters = {
			"someParameterName": "someParameterValue"
		};
		CORA.ajaxCall(spec);
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);

		let openUrl = xmlHttpRequestSpy.getOpenUrl();
		assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://localhost:8080/therest/rest/record/recordType");

		assert.strictEqual(openUrl.substring(openUrl.indexOf("?"), openUrl.lastIndexOf("=")),
			"?someParameterName=someParameterValue&preventCache");
	});

	test("testXMLHttpRequestSetUpWithRequestParameters", function(assert) {
		spec.parameters = {
			"someParameterName": "someParameterValue",
			"key2": "value2"
		};
		CORA.ajaxCall(spec);
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);

		let openUrl = xmlHttpRequestSpy.getOpenUrl();
		assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://localhost:8080/therest/rest/record/recordType");

		assert.strictEqual(openUrl.substring(openUrl.indexOf("?"), openUrl.lastIndexOf("=")),
			"?someParameterName=someParameterValue&key2=value2&preventCache");
	});

	test("testXMLHttpRequestSetUpWithRequestParameterIsUrlEncoded", function(assert) {
		spec.parameters = {
			"someParameterName": "va&lue"
		};
		CORA.ajaxCall(spec);
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);

		let openUrl = xmlHttpRequestSpy.getOpenUrl();
		assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://localhost:8080/therest/rest/record/recordType");

		assert.strictEqual(openUrl.substring(openUrl.indexOf("?"), openUrl.lastIndexOf("=")),
			"?someParameterName=" + encodeURIComponent("va&lue") + "&preventCache");
	});

	test("testSpecReturnedInCallToLoadMethod", function(assert) {
		let specReturned;
		function loadMethod(answer) {
			specReturned = answer.spec;
		}
		spec.loadMethod = loadMethod;
		CORA.ajaxCall(spec);
		assert.stringifyEqual(specReturned, spec);
	});

	test("testSpecReturnedInCallToLoadMethodNoSpecifiedProgressMethods", function(assert) {
		let specReturned;
		function loadMethod(answer) {
			specReturned = answer.spec;
		}
		spec.loadMethod = loadMethod;
		spec.downloadProgressMethod = undefined;
		spec.uploadProgressMethod = undefined;
		CORA.ajaxCall(spec);
		assert.stringifyEqual(specReturned, spec);
	});

	test("testCallErrorNot200answer406", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(406);
		CORA.ajaxCall(spec);
		assert.ok(getErrorMethodWasCalled(), "errorMethod was called ok");
	});

	test("testCallOKReturns500", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);
		CORA.ajaxCall(spec);
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		xmlHttpRequestSpy.status = 500;
		xmlHttpRequestSpy.runLoadFunction();
		assert.ok(getErrorMethodWasCalled(), "errorMethod was called ok");
	});

	test("testCallErrorNot200answer0", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(0);
		CORA.ajaxCall(spec);
		assert.ok(getErrorMethodWasCalled(), "errorMethod was called ok");
	});

	test("testTimeoutIsCalled", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);

		let done = assert.async();
		function assertFalse() {
			assert.ok(false);
		}
		spec.timeoutInMS = 1;
		spec.loadMethod = assertFalse;
		spec.errorMethod = assertFalse;

		CORA.ajaxCall(spec);
		window.setTimeout(function() {
			assert.ok(getTimeoutMethodWasCalled(), "timeoutMethod was called ok");
			done();
		}, 10);

	});

	test("testTimeoutIsNotCalledAsLoadIsCalled", function(assert) {
		let done = assert.async();
		function assertFalse() {
			assert.ok(false);
		}
		spec.timeoutInMS = 5;
		spec.errorMethod = assertFalse;

		CORA.ajaxCall(spec);

		window.setTimeout(function() {
			assert.ok(!getTimeoutMethodWasCalled(), "timeoutMethod should not have been called");
			done();
		}, 10);
	});

	test("testTimeoutIsNotCalledAsErrorIsCalled", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(400);
		let done = assert.async();
		function assertFalse() {
			assert.ok(false);
		}
		spec.timeoutInMS = 5;
		spec.loadMethod = assertFalse;

		CORA.ajaxCall(spec);
		window.setTimeout(function() {
			assert.ok(!getTimeoutMethodWasCalled(), "timeoutMethod should not have been called");
			done();
		}, 10);
	});

	test("testTimeoutIsNotCalledAsDownloadProgressIsCalled", function(assert) {
		let done = assert.async();
		xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);

		function assertFalse() {
			assert.ok(false);
		}
		spec.timeoutInMS = 5;
		spec.loadMethod = assertFalse;
		spec.errorMethod = assertFalse;

		CORA.ajaxCall(spec);

		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		let intervalId = window.setInterval(function() {
			xmlHttpRequestSpy.addedEventListeners["progress"][1]();
		}, 1);

		window.setTimeout(function() {
			assert.ok(!getTimeoutMethodWasCalled(), "timeoutMethod should not have been called");
			window.clearInterval(intervalId);
			done();
		}, 10);
	});

	test("testTimeoutIsNotCalledAsUploadProgressIsCalled", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);
		let done = assert.async();
		function assertFalse() {
			assert.ok(false);
		}
		spec.timeoutInMS = 10;
		spec.loadMethod = assertFalse;
		spec.errorMethod = assertFalse;

		CORA.ajaxCall(spec);

		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		let intervalId = window.setInterval(function() {
			xmlHttpRequestSpy.upload.addedEventListeners["progress"][1]();
		}, 1);
		window.setTimeout(function() {
			assert.ok(!getTimeoutMethodWasCalled(), "timeoutMethod should not have been called");
			window.clearInterval(intervalId);
			done();
		}, 20);
	});

	test("testTimeoutIsCalledAsUploadProgressIsCalledOnlyOnceUsingTimeout", function(assert) {
		xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);
		let done = assert.async();
		function assertFalse() {
			assert.ok(false);
		}
		spec.timeoutInMS = 50;
		spec.loadMethod = assertFalse;
		spec.errorMethod = assertFalse;

		CORA.ajaxCall(spec);

		function waitABitThenCheckThatTimeoutHasBeenCalled() {
			window.setTimeout(function() {
				assert.ok(getTimeoutMethodWasCalled(), "timeoutMethod should have been called");
				done();
			}, 100);
		}
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		window.setTimeout(function() {
			xmlHttpRequestSpy.upload.addedEventListeners["progress"][1]();
			waitABitThenCheckThatTimeoutHasBeenCalled();
		}, 20);
	});

	test("testSendCreate", function(assert) {
		let textData = {
			"name": "text",
			"children": [{
				"name": "recordInfo",
				"children": [{
					"name": "id",
					"value": "myText"
				}]
			}, {
				"name": "textPart",
				"attributes": {
					"type": "default",
					"lang": "sv"
				},
				"children": [{
					"name": "text",
					"value": "Min svenska text"
				}]
			}]
		};
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(201);
		xmlHttpRequestFactoryMultipleSpy.setResponseText("a dummy response text");
		xmlHttpRequestFactoryMultipleSpy.setResponse("a dummy response");

		spec.requestMethod = "POST";
		spec.data = JSON.stringify(textData);
		CORA.ajaxCall(spec);

		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		let openUrl = xmlHttpRequestSpy.getOpenUrl();
		assert.strictEqual(openUrl, "http://localhost:8080/therest/rest/record/recordType");
		assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "POST");
		assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/vnd.uub.record+json");
		assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"][0],
			"application/vnd.uub.record+json");

		assert.strictEqual(xmlHttpRequestSpy.getSentData(), JSON.stringify(textData));
		assert.strictEqual(getAnswer().status, 201);
		assert.strictEqual(getAnswer().responseText, "a dummy response text");
		assert.strictEqual(getAnswer().response, "a dummy response");
		assert.ok(getLoadMethodWasCalled(), "loadMethod was called ok")
	});

	test("testSendDelete", function(assert) {
		spec.requestMethod = "DELETE";
		spec.requestHeaders = null;

		CORA.ajaxCall(spec);
		let xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
		let openUrl = xmlHttpRequestSpy.getOpenUrl();
		assert.strictEqual(openUrl, "http://localhost:8080/therest/rest/record/recordType");
		assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "DELETE");
		assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"], undefined);
		assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"], undefined);

		assert.ok(getLoadMethodWasCalled(), "loadMethod was called ok")
	});

	test("testDownloadProgress", function(assert) {
		function progressMethod() {
			//empty method to check it is added
		}
		spec.downloadProgressMethod = progressMethod;
		let ajaxCall = CORA.ajaxCall(spec);
		assert.strictEqual(ajaxCall.xhr.addedEventListeners["progress"][0], progressMethod);
	});

	test("testUploadProgress", function(assert) {
		function progressMethod() {
			//empty method to check it is added
		}
		spec.uploadProgressMethod = progressMethod;
		let ajaxCall = CORA.ajaxCall(spec);
		assert.strictEqual(ajaxCall.xhr.upload.addedEventListeners["progress"][0], progressMethod);
	});
});
