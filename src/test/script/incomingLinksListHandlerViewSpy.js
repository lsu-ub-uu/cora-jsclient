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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.incomingLinksListHandlerViewSpy = function(dependencies, spec) {
		var addedIncomingLink = [];
		var view = CORA.createSpanWithClassName("incomingLinksListHandlerViewSpy");

		var numberOfIncomingLinks;

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}

		function addIncomingLink(incomingLink) {
			addedIncomingLink.push(incomingLink)
		}
		function getAddedIncomingLink(number) {
			return addedIncomingLink[number];
		}

		function getView() {
			return view;
		}

		function setNumberOfIncomingLinks(no) {
			numberOfIncomingLinks = no;
		}
		function getNumberOfIncomingLinks() {
			return numberOfIncomingLinks;
		}

		var out = Object.freeze({
			"type" : "incomingLinksListHandlerViewSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			addIncomingLink : addIncomingLink,
			getAddedIncomingLink : getAddedIncomingLink,
			getView : getView,
			setNumberOfIncomingLinks : setNumberOfIncomingLinks,
			getNumberOfIncomingLinks : getNumberOfIncomingLinks
		});

		return out;
	};
	return coraTest;
}(CORATEST || {}));
