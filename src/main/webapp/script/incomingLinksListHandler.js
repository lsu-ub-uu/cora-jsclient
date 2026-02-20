/*
 * Copyright 2017 Olov McKie
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
	cora.incomingLinksListHandler = function(dependencies, spec) {
		var view;
		function start() {
			var viewSpec = {
				"openRecordUsingLink" : openRecordUsingLink
			};
			view = dependencies.globalFactories.incomingLinksListHandlerViewFactory
					.factor(viewSpec);
			fetchDataFromServer();
		}

		function getView() {
			return view.getView();
		}

		function fetchDataFromServer() {
			var listLink = spec.read_incoming_links;
			var callSpec = {
				"url" : listLink.url,
				"requestMethod" : listLink.requestMethod,
				"accept" : listLink.accept,
				"contentType" : listLink.contentType,
				"loadMethod" : handleAnswerWithIncomingLinksList,
				"errorMethod" : handleCallError
			};
			dependencies.globalFactories.ajaxCallFactory.factor(callSpec);
		}

		function handleAnswerWithIncomingLinksList(answer) {
			var response = JSON.parse(answer.responseText);
			var data = response.dataList.data;

			view.setNumberOfIncomingLinks(data.length);
			data.forEach(addIncomingLinkToView);
		}

		function addIncomingLinkToView(incomingLink) {
			var cData = CORA.coraData(incomingLink);
			var from = cData.getFirstChildByNameInData("from");
			var cFrom = CORA.coraData(from);
			var incomingLinkToAdd = {
				"linkedRecordType" : cFrom.getFirstAtomicValueByNameInData("linkedRecordType"),
				"linkedRecordId" : cFrom.getFirstAtomicValueByNameInData("linkedRecordId"),
				"readLink" : from.actionLinks.read
			};
			view.addIncomingLink(incomingLinkToAdd);
		}

		function handleCallError(error) {
			throw new Error("error fetching links from server", error);
		}

		function openRecordUsingLink(openInfo) {
			var jsClient = dependencies.globalInstances.clientInstanceProvider.getJsClient();
			jsClient.openRecordUsingReadLink(openInfo);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		var out = Object.freeze({
			"type" : "incomingLinksListHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			handleAnswerWithIncomingLinksList : handleAnswerWithIncomingLinksList,
			handleCallError : handleCallError,
			openRecordUsingLink : openRecordUsingLink
		});

		start();

		return out;
	};
	return cora;
}(CORA));