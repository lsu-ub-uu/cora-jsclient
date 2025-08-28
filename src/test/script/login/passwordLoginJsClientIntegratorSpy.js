/*
 * Copyright 2019 Uppsala University Library
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
	coraTest.passwordLoginJsClientIntegratorSpy = function(dependencies, spec) {
		let noOfShowPasswordLoginInJsClient = 0;
		let noOfRemovePasswordLoginFromJsClient = 0;
		let view = CORA.createSpanWithClassName("passwordLoginJsClientIntegratorSpy");
		const getView = function() {
			return view;
		};

		const showPasswordLoginInJsClient = function() {
			noOfShowPasswordLoginInJsClient++;
		};

		const getNoOfShowPasswordLoginInJsClient = function() {
			return noOfShowPasswordLoginInJsClient;
		};

		const removePasswordLoginFromJsClient = function() {
			noOfRemovePasswordLoginFromJsClient++;
		};

		const getNoOfRemovePasswordLoginFromJsClient = function() {
			return noOfRemovePasswordLoginFromJsClient;
		};

		return Object.freeze({
			type : "passwordLoginJsClientIntegratorSpy",
			getView : getView,
			showPasswordLoginInJsClient : showPasswordLoginInJsClient,
			getNoOfShowPasswordLoginInJsClient : getNoOfShowPasswordLoginInJsClient,
			removePasswordLoginFromJsClient : removePasswordLoginFromJsClient,
			getNoOfRemovePasswordLoginFromJsClient : getNoOfRemovePasswordLoginFromJsClient
		});
	};
	return coraTest;
}(CORATEST || {}));