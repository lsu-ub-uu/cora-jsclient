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
	coraTest.appTokenLoginFactorySpy = function(spec) {
		let dummyDependencies = {};
		let listOfFactored = [];
		let listOfSpec = [];
		const factor = function(factorSpec) {
			listOfSpec.push(factorSpec);
			let factored = CORATEST.appTokenLoginSpy(dummyDependencies, factorSpec);
			listOfFactored.push(factored);
			return factored;
		};

		const getFactored = function(number) {
			return listOfFactored[number];
		};
		
		const getSpec = function(number) {
			return listOfSpec[number];
		};

		let out = Object.freeze({
			factor : factor,
			getFactored : getFactored,
			getSpec : getSpec
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
