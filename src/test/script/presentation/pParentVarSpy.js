/*
 * Copyright 2023 Olov McKie
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
	coraTest.pParentVarSpy = function() {
		let presentationCounter = "1-123";
		const getDependencies = function() {
			return "fakeDependencies from pParentVarSpy";
		};

		const getView = function() {
			return "fakeView from pParentVarSpy";
		};

		const disableVar = function() {
			//fake method doing nothing
		};

		let openLinkedRecordForLinkCalls = [];
		const openLinkedRecordForLink = function(event, readLink) {
			openLinkedRecordForLinkCalls.push([event, readLink]);
		};

		const getOpenLinkedRecordForLink = function(no) {
			return openLinkedRecordForLinkCalls[no];
		};

		const getPresentationCounter = function() {
			return presentationCounter;
		};

		return Object.freeze({
			type: "pParentVarSpy",
			getDependencies: getDependencies,
			getView: getView,
			disableVar: disableVar,
			openLinkedRecordForLink: openLinkedRecordForLink,
			getOpenLinkedRecordForLink: getOpenLinkedRecordForLink,
			getPresentationCounter: getPresentationCounter
		});
	};
	return coraTest;
}(CORATEST || {}));
