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
	coraTest.searchRecordHandlerViewFactorySpy = function() {
		var dummyDependencies = {};
		var listOfFactored = [];
		var listOfSpec = [];

		function factor(factorSpec) {
			listOfSpec.push(factorSpec);
			var factored = CORATEST.searchRecordHandlerViewSpy(dummyDependencies, factorSpec);
			listOfFactored.push(factored);
			return factored;
		}

		function getFactored(number) {
			return listOfFactored[number];
		}

		function getSpec(number) {
			return listOfSpec[number];
		}

		var out = Object.freeze({
			"type" : "searchRecordHandlerViewFactorySpy",
			factor : factor,
			getFactored : getFactored,
			getSpec : getSpec
		});
		return out;
	};
	return coraTest;
}(CORATEST));
