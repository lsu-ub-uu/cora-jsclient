/*
 * Copyright 2017 Uppsala University Library
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
var CORATEST = (function(cora) {
	"use strict";
	cora.webRedirectLoginSpy = function(dependencies, spec) {
		var fakeOpenedWindow = CORATEST.windowSpy();
//		var fakeOpenedWindow = {
//			fake : "fakeOpenedWindow"
//		};
		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}

		function getOpenedWindow() {
			return fakeOpenedWindow;
		}
		var out = Object.freeze({
			"type" : "webRedirectLoginSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getOpenedWindow : getOpenedWindow,
		});
		return out;
	};

	return cora;
}(CORATEST || {}));