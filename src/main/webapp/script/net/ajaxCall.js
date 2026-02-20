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
var CORA = (function(cora) {
	"use strict";
	cora.ajaxCall = function(spec) {
		const defaultTimeoutMS = 90000;
		const timeoutTime = spec.timeoutInMS ? spec.timeoutInMS : defaultTimeoutMS;
		let intervalId;
		let xhr;
		let intervalStart;
		let timeProgress;

		const start = function() {
			xhr = factorXmlHttpRequestUsingFactoryFromSpec();
			addListenersToXmlHttpRequest();
			open();
			setTimeout();
			setHeadersSpecifiedInSpec();
			setResponseTypeSpecifiedInSpec();
			sendRequest();
		};

		const factorXmlHttpRequestUsingFactoryFromSpec = function() {
			return spec.xmlHttpRequestFactory.factor();
		};

		const addListenersToXmlHttpRequest = function() {
			xhr.addEventListener("load", handleLoadEvent);
			xhr.addEventListener("error", handleErrorEvent);
			addDownloadProgressListnerIfSpecifiedInSpec();
			xhr.addEventListener("progress", updateProgressTime);
			addUploadProgressListnerIfSpecifiedInSpec();
			xhr.upload.addEventListener("progress", updateProgressTime);
		};

		const handleLoadEvent = function() {
			window.clearInterval(intervalId);

			if (statusIsOk()) {
				createReturnObjectAndCallLoadMethodFromSpec();
			} else {
				createReturnObjectAndCallErrorMethodFromSpec();
			}
		};

		const statusIsOk = function() {
			return xhr.status === 200 || xhr.status === 201;
		};

		const createReturnObjectAndCallLoadMethodFromSpec = function() {
			spec.loadMethod(createReturnObject());
		};

		const createReturnObject = function() {
			let returnObject = {
				spec: spec,
				status: xhr.status,
				response: xhr.response
			};
			let responseType = spec.responseType;
			if (responseType === undefined || responseType === 'document') {
				returnObject.responseText = xhr.responseText;
			}
			return returnObject;
		};

		const handleErrorEvent = function() {
			window.clearInterval(intervalId);
			createReturnObjectAndCallErrorMethodFromSpec();
		};

		const createReturnObjectAndCallErrorMethodFromSpec = function() {
			spec.errorMethod(createReturnObject());
		};

		const addDownloadProgressListnerIfSpecifiedInSpec = function() {
			if (spec.downloadProgressMethod !== undefined) {
				xhr.addEventListener("progress", spec.downloadProgressMethod);
			}
		};

		const updateProgressTime = function() {
			timeProgress = performance.now();
		};

		const addUploadProgressListnerIfSpecifiedInSpec = function() {
			if (spec.uploadProgressMethod !== undefined) {
				xhr.upload.addEventListener("progress", spec.uploadProgressMethod);
			}
		};

		const open = function() {
			if (spec.requestMethod === "GET") {
				xhr.open(spec.requestMethod, createUrl());
			} else {
				xhr.open(spec.requestMethod, spec.url);
			}
			startTimers();
		};

		const createUrl = function() {
			let url = spec.url + "?";
			url += possiblyCreateUrlParameters();
			url += "preventCache=" + (new Date()).getTime();
			return url;
		};

		const possiblyCreateUrlParameters = function() {
			if (spec.parameters !== undefined) {
				return createUrlParameters();
			}
			return "";
		};

		const createUrlParameters = function() {
			let url = "";
			let keys = Object.keys(spec.parameters);
			for (const element of keys) {
				url += createUrlParameter(element);
			}
			return url;
		};

		const createUrlParameter = function(key) {
			return key + "=" + encodeURIComponent(spec.parameters[key]) + "&";
		};

		const startTimers = function() {
			timeProgress = performance.now();
			intervalStart = timeProgress;
		};

		const setTimeout = function() {
			intervalId = window.setInterval(handleTimeout, timeoutTime);
		};

		const handleTimeout = function() {
			let progressAfterStartTime = timeProgress - intervalStart;
			if (progressAfterStartTime > 0) {
				intervalStart = performance.now();
			} else {
				window.clearInterval(intervalId);
				xhr.abort();
				spec.timeoutMethod(createReturnObject());
			}
		};

		const setHeadersSpecifiedInSpec = function() {
			if (spec.requestHeaders) {
				let keys = Object.keys(spec.requestHeaders);
				for (const element of keys) {
					xhr.setRequestHeader(element, spec.requestHeaders[element]);
				}
			}
		};

		const setResponseTypeSpecifiedInSpec = function() {
			if (spec.responseType) {
				xhr.responseType = spec.responseType;
			}
		};

		const sendRequest = function() {
			if (spec.data !== undefined) {
				xhr.send(spec.data);
			} else {
				xhr.send();
			}
		};

		const getCurrentTimeout = function() {
			return timeoutTime;
		};

		start();
		return Object.freeze({
			type: "ajaxCall",
			xhr: xhr,
			spec: spec,
			getCurrentTimeout: getCurrentTimeout
		});
	};
	return cora;
}(CORA));