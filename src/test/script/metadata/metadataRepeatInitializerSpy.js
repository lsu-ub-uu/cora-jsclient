/*
 * Copyright 2017, 2020 Uppsala University Library
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
	coraTest.metadataRepeatInitializerSpy = function(dependencies, spec, spySpec) {
		let initializeCalled = false;
		
		const initialize = function() {
			initializeCalled = true;
		};
		
		const getInitializeCalled = function() {
			return initializeCalled;
		};
		
		return Object.freeze({
			"type": "metadataRepeatInitializerSpy",
			initialize: initialize,
			getInitializeCalled: getInitializeCalled
		});
	};
	return coraTest;
}(CORATEST || {}));