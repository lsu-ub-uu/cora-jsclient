/*
 * Copyright 2018, 2020 Uppsala University Library
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
	cora.numberVariableValidator = function(dependencies) {
		let value;
		let cMetadataElement;

		const validateData = function(valueIn, cMetadataElementIn) {
			value = valueIn;
			cMetadataElement = cMetadataElementIn;
			if (isNaN(value) || value === "") {
				return false;
			}
			return valueIsBetweenMinAndMax(value);
		}

		const valueIsBetweenMinAndMax = function(valueIn, cMetadataElementIn) {
			if (valueBetweenMinAndMax(value) && valueHasCorrectNumberOfDecimals(value)) {
				return true;
			}
			return false;
		}

		const valueBetweenMinAndMax = function(value) {
			let max = cMetadataElement.getFirstAtomicValueByNameInData("max");
			let min = cMetadataElement.getFirstAtomicValueByNameInData("min");
			if (valueAboveMax(value, max) || valueBelowMin(value, min)) {
				return false;
			}
			return true;
		}

		const valueAboveMax = function(value, max) {
			return parseFloat(value) > parseFloat(max);
		}

		const valueBelowMin = function(value, min) {
			return parseFloat(value) < parseFloat(min);
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
			validateData : validateData,
			getDependencies : getDependencies
		});
	};
	return cora;
}(CORA));