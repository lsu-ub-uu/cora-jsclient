/*
 * Copyright 2016 Uppsala University Library
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.xmlHttpRequestFactoryMultipleSpy = function() {
		var factorWasCalled = false;
		var responseStatus;
		var responseText;
		var response;
		var factoredXmlHttpRequests = [];
		var sendResponse = true;

		function factor() {
			var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy();
			setupXmlHttpRequestSpy(xmlHttpRequestSpy);
			factorWasCalled = true;
			factoredXmlHttpRequests.push(xmlHttpRequestSpy);
			return xmlHttpRequestSpy;
		}

		function setupXmlHttpRequestSpy(xmlHttpRequestSpy) {
			if (responseStatus !== undefined) {
				xmlHttpRequestSpy.status = responseStatus;
			}
			if (responseText !== undefined) {
				xmlHttpRequestSpy.responseText = responseText;
			}
			if (response !== undefined) {
				xmlHttpRequestSpy.response= response;
			}
			if (sendResponse) {
				if (responseStatus === 200 || responseStatus === 201) {
					xmlHttpRequestSpy.setSendFunction(function() {
						xmlHttpRequestSpy.addedEventListeners["load"][0]();
					});
				} else {
					xmlHttpRequestSpy.setSendFunction(function() {
						xmlHttpRequestSpy.addedEventListeners["error"][0]();
					});
				}
			} else {
				xmlHttpRequestSpy.setSendFunction(function() {
				});

			}
		}

		function wasFactorCalled() {
			return factorWasCalled;
		}

		function setResponseStatus(status) {
			responseStatus = status;
		}

		function setResponseText(text) {
			responseText = text;
		}

		function getFactoredXmlHttpRequest(number) {
			return factoredXmlHttpRequests[number];
		}

		function setSendResponse(send) {
			sendResponse = send;
		}
		function setResponse(responseIn) {
			response = responseIn;
		}
		

		var out = Object.freeze({
			setResponseStatus : setResponseStatus,
			setResponseText : setResponseText,
			setResponse:setResponse,
			factor : factor,
			wasFactorCalled : wasFactorCalled,
			getFactoredXmlHttpRequest : getFactoredXmlHttpRequest,
			setSendResponse : setSendResponse
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));