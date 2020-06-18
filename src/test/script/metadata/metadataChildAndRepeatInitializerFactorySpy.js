/*
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
	coraTest.metadataChildAndRepeatInitializerFactorySpy = function(dependencies) {
		let factoredChildIntitializers = [];
		let factoredRepeatIntitializers = [];
		let childIntitializerSpec = [];
		let repeatIntitializerSpec = [];
		
		
		const factorChildInitializer = function(spec) {
			childIntitializerSpec.push(spec);
			
			var factoredChild = CORATEST.metadataChildInitializerSpy({}, spec);
			factoredChildIntitializers.push(factoredChild);
			return factoredChild;
		}
		const factorRepeatInitializer = function(spec) {
			repeatIntitializerSpec.push(spec);
			
			var factoredRepeat = CORATEST.metadataRepeatInitializerSpy({}, spec);
			factoredRepeatIntitializers.push(factoredRepeat);
			return factoredRepeat;
		}

		const getFactoredChildIntitializers = function(number) {
			return factoredChildIntitializers[number];
		};
		
		const getFactoredRepeatIntitializers = function(number) {
			return factoredRepeatIntitializers[number];
		};
		
		const getChildSpec = function(number) {
			return childIntitializerSpec[number];
		};
		
		const getRepeatSpec = function(number) {
			return repeatIntitializerSpec[number];
		};

		let out = Object.freeze({
			factorChildInitializer : factorChildInitializer,
			factorRepeatInitializer : factorRepeatInitializer,
			getFactoredChildIntitializers : getFactoredChildIntitializers,
			getFactoredRepeatIntitializers : getFactoredRepeatIntitializers,
			getChildSpec : getChildSpec,
			getRepeatSpec : getRepeatSpec
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
