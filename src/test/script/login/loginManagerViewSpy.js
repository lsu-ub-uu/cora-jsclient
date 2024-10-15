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
		let LoginIds = [];
		let loginOptions;
		let logoutOptions;
		let state;
		let noOfCallsToCloseHolder = 0;
		let html = CORA.gui.createSpanWithClassName("loginManagerViewSpy");
		const getHtml = function() {
			return html;
		};

		const setLoginId = function(LoginIdIn) {
			LoginIds.push(LoginIdIn);
		};

		const getLoginId = function(number) {
			return LoginIds[number];
		};

		const getLoginOptions = function() {
			return loginOptions;
		}
		const setLoginOptions = function(loginOptionsIn) {
			loginOptions = loginOptionsIn;
		};

		const setState = function(stateIn) {
			state = stateIn;
		};

		const closeHolder = function() {
			noOfCallsToCloseHolder++;
		};

		const getNoOfCallsToCloseHolder = function() {
			return noOfCallsToCloseHolder;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const getState = function() {
			return state;
		};

		let out = Object.freeze({
			getDependencies : getDependencies,
			getSpec : getSpec,
			getHtml : getHtml,
			setState : setState,
			getState : getState,
			getLoginOptions : getLoginOptions,
			setLoginId : setLoginId,
			getLoginId : getLoginId,
			setLoginOptions : setLoginOptions,
			closeHolder : closeHolder,
			getNoOfCallsToCloseHolder : getNoOfCallsToCloseHolder
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
