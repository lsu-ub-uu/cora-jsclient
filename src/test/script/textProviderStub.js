/*
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
	coraTest.textProviderStub = function() {

		function getTranslation(textId) {
			switch (textId) {
			case "textVariableIdText":
				return "Exempel textvariabel";
				// "Example text variable"
				break;
			case "textVariableIdDefText":
				return "Detta är en exempeldefinition för en textvariabel.";
				// This is an example definition for a text variable.
				break;
			case "aHeadlineText":
				return "En rubrik";
				// A headline
				break;
			default:
				throw new Error("Id(" + textId + ") not found in stub");
				break;
			}

			return text;
		}

		return Object.freeze({
			getTranslation : getTranslation
		});
	};
	return coraTest;
}(CORATEST || {}));