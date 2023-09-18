/**
 * Copyright 2018, 2020 Uppsala University Library
 * Copyright 2023 Olov McKie
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
var CORA = (function(cora) {
	"use strict";
	cora.numberVariableValidator = function() {
		let value;
		let cMetadataElement;

		const validateData = function(valueIn, cMetadataElementIn) {
			value = valueIn;
			cMetadataElement = cMetadataElementIn;
			if (isNaN(value) || value === "") {
				return false;
			}
			return validateValue(value);
		}

		const validateValue = function(valueIn) {
			return (valueBetweenMinAndMax(value) && valueHasCorrectNumberOfDecimals(value));
		}

		const valueBetweenMinAndMax = function(value) {
			let max = cMetadataElement.getFirstAtomicValueByNameInData("max");
			let min = cMetadataElement.getFirstAtomicValueByNameInData("min");
			return (valueBelowMax(value, max) && valueAboveMin(value, min));
		}

		const valueBelowMax = function(value, max) {
			return parseFloat(value) <= parseFloat(max);
		}

		const valueAboveMin = function(value, min) {
			return parseFloat(value) >= parseFloat(min);
		}

		const valueHasCorrectNumberOfDecimals = function(value) {
			let numberOfDecimals = cMetadataElement
					.getFirstAtomicValueByNameInData("numberOfDecimals");
			if (valueHasDecimals(value)) {
				return handleValueWithDecimals(value, numberOfDecimals);
			}
			return numberOfDecimals === "0";
		}

		const valueHasDecimals = function(value) {
			let splittedString = value.split('.');
			return splittedString[1] !== undefined;
		}

		const handleValueWithDecimals = function(value, numberOfDecimals) {
			let splittedString = value.split('.');
			let actualNumOfDecimals = splittedString[1].length;
			return actualNumOfDecimals === Number(numberOfDecimals);
		}

		const getDependencies = function() {
			return dependencies;
		}

		return Object.freeze({
			type : "numberVariableValidator",
			validateData : validateData
		});
	};
	return cora;
}(CORA));