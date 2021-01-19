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
var CORA = (function(cora) {
	"use strict";
	cora.pathUtils = function() {

		const ensureNoRepeatIdInLowestLevelOfPath = function(pathIn) {
			let path = JSON.parse(JSON.stringify(pathIn));
			if (pathHasChildren(path)) {
				removeRepeatIdFromLowestLevelOfPath(path);
			}
			return path;
		};

		const removeRepeatIdFromLowestLevelOfPath = function(path) {
			let lowestPath = getLowestPathPointer(path);
			let cLowestPath = CORA.coraData(lowestPath);
			if (cLowestPath.containsChildWithNameInData("repeatId")) {
				removeRepeatIdFromPathPart(cLowestPath, lowestPath);
			}
		};

		const getLowestPathPointer = function(path) {
			var cPath = CORA.coraData(path);
			if (cPath.containsChildWithNameInData("linkedPath")) {
				return getLowestPathPointer(cPath.getFirstChildByNameInData("linkedPath"));
			}
			return path;
		};

		const removeRepeatIdFromPathPart = function(cLowestPath, lowestPath) {
			let repeatIdObject = cLowestPath.getFirstChildByNameInData("repeatId");
			let children = lowestPath.children;
			lowestPath.children = children.filter((item) => item !== repeatIdObject);
		};

		const pathHasChildren = function(path) {
			return path.children !== undefined;
		};



		return Object.freeze({
			type: "pathUtils",
			ensureNoRepeatIdInLowestLevelOfPath: ensureNoRepeatIdInLowestLevelOfPath
		});

	};
	return cora;
}(CORA));