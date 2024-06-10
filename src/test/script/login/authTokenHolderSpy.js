/*
 * Copyright 2016 Olov McKie
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
	coraTest.authTokenHolderSpy = function() {
		let currentAuthTokenExists = true;
		let tokens = [];
		
		const getCurrentAuthToken = function() {
			// for now hard coded to fitnesseAdminToken
			return "fitnesseAdminToken";
		};
		
		const hasCurrentAuthToken = function() {
			return currentAuthTokenExists;
		};
		
		const setCurrentAuthToken = function(authTokenIn) {
			tokens.push(authTokenIn);
		};
		
		const setCurrentAuthTokenExists = function(exists) {
			currentAuthTokenExists = exists;
		};
		
		const getToken = function(number) {
			return tokens[number];
		};
		
		let out = Object.freeze({
			type : "authTokenHolderSpy",
			getCurrentAuthToken : getCurrentAuthToken,
			hasCurrentAuthToken : hasCurrentAuthToken,
			setCurrentAuthTokenExists : setCurrentAuthTokenExists,
			getToken : getToken,
			setCurrentAuthToken : setCurrentAuthToken
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
