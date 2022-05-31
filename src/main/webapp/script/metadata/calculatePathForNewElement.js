/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016 Olov McKie
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
	cora.calculatePathForNewElement = function(spec) {
		var metadataId = spec.metadataIdToAdd;
		var repeatId = spec.repeatId;

		var newPath = calculatePathForNewElement();

		function copyPath(pathToCopy) {
			return JSON.parse(JSON.stringify(pathToCopy));
		}

		function calculatePathForNewElement() {
			if (parentPathPointsToTopLevel()) {
				return createPathForThisLevel();
			}
			return addPathForThisLevelToParentPath();
		}

		function parentPathPointsToTopLevel() {
			return spec.parentPath.length == 0;
		}

		function createPathForThisLevel() {
			var path = createLinkedPath();
			possiblyAddRepeatId(path);
			return path;
		}

		function createLinkedPath() {
			if (spec.type == "attribute") {
				return ["@" + metadataId];
			}
			return [metadataId];
		}

		function possiblyAddRepeatId(path) {
			if (pathShouldHaveRepeatId()) {
				path.push(path.pop() + "." + repeatId);
			}
		}

		function pathShouldHaveRepeatId() {
			return repeatId !== undefined;
		}

		function addPathForThisLevelToParentPath() {
			var parentPathCopy = copyPath(spec.parentPath);
			var childPath = createPathForThisLevel();
			parentPathCopy.push(childPath[0]);
			return parentPathCopy;
		}

		return newPath;
	};
	return cora;
}(CORA));