/*
 * Copyright 2017 Olov McKie
 * Copyright 2020 Uppsala University Library
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
	coraTest.standardFactorySpy = function(toFactor) {
		let factoredList = [];
		let factoredSpec = [];
		let spySpecList = [];
		let spySpec = {};
		let spyDependencies = {};

		const factor = function(standardSpec) {
			factoredSpec.push(standardSpec);
			let spySpecToUse = getSpySpecOrFromListIfListIsSet();
			let factored = CORATEST[toFactor]({}, standardSpec, spySpecToUse);
			factoredList.push(factored);
			return factored;
		};

		const getSpySpecOrFromListIfListIsSet = function() {
			if (spySpecList.length == 0) {
				return spySpec;
			}
			return spySpecList[factoredList.length];
		}

		const getFactored = function(number) {
			return factoredList[number];
		};

		const getSpec = function(number) {
			return factoredSpec[number];
		};

		const setSpySpec = function(spySpecIn) {
			spySpec = spySpecIn;
		}

		const addSpySpec = function(spySpecIn) {
			spySpecList.push(spySpecIn);
		};

		const setSpyDependencies = function(spyDependenciesIn) {
			spyDependencies = spyDependenciesIn;
		};

		const getDependencies = function() {
			return spyDependencies;
		};

		let out = Object.freeze({
			"type": "standardFactorySpy",
			factor: factor,
			getFactored: getFactored,
			getSpec: getSpec,
			getDependencies: getDependencies,
			setSpyDependencies: setSpyDependencies,
			setSpySpec: setSpySpec,
			addSpySpec: addSpySpec
		});
		return out;
	};
	return coraTest;
}(CORATEST));
