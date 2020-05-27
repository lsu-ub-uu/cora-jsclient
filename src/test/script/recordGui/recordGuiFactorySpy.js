/*
 * Copyright 2017 Olov McKie
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.recordGuiFactorySpy = function() {
		let factoredrecordGuis = [];
		let factoredSpec = [];

		function factor(spec) {
			let metadataId = spec.metadataId;
			let data = spec.data;
			let dataDivider = spec.dataDivider;
			let permissions = spec.permissions;
			factoredSpec.push(spec);

			let factoredrecordGui = CORATEST.recordGuiSpy();
			factoredrecordGuis.push(factoredrecordGui);
			return factoredrecordGui;
		}

		function getFactored(number) {
			return factoredrecordGuis[number];
		}

		function getSpec(number) {
			return factoredSpec[number];
		}

		let out = Object.freeze({
			"type" : "recordGuiFactorySpy",
			factor : factor,
			getFactored : getFactored,
			getSpec : getSpec
		});
		return out;
	};
	return coraTest;
}(CORATEST));
