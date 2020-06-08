/*
 * Copyright 2016, 2017 Uppsala University Library
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
	coraTest.loginManagerViewSpy = function(dependencies, spec) {
		var userIds = [];
		var loginOptions;
		var logoutOptions;
		var state;
		var noOfCallsToCloseHolder = 0;
		var html = CORA.gui.createSpanWithClassName("loginManagerViewSpy");
		function getHtml() {
			return html;
		}

		function setUserId(userIdIn) {
			userIds.push(userIdIn);
		}

		function getUserId(number) {
			return userIds[number];
		}

		function getLoginOptions() {
			return loginOptions;
		}
		function setLoginOptions(loginOptionsIn) {
			loginOptions = loginOptionsIn;
		}

		function setState(stateIn) {
			state = stateIn;
		}

		function closeHolder() {
			noOfCallsToCloseHolder++;
		}

		function getNoOfCallsToCloseHolder() {
			return noOfCallsToCloseHolder;
		}
		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}
		function getState() {
			return state;
		}

		var out = Object.freeze({
			getDependencies : getDependencies,
			getSpec : getSpec,
			getHtml : getHtml,
			setState : setState,
			getState : getState,
			getLoginOptions : getLoginOptions,
			setUserId : setUserId,
			getUserId : getUserId,
			setLoginOptions : setLoginOptions,
			closeHolder : closeHolder,
			getNoOfCallsToCloseHolder : getNoOfCallsToCloseHolder
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
