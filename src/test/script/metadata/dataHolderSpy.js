/*
 * Copyright 2017, 2021 Uppsala University Library
 * Copyright 2017 Olov McKie
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
	coraTest.dataHolderSpy = function(spec) {
		var data = {};
		var dataWithActionLinks = {
			"actionLinks": {
				"read": {
					"requestMethod": "GET",
					"rel": "read",
					"url": "http://localhost:8080/therest/rest/record/recordType/writtenText",
					"accept": "application/vnd.uub.record+json"
				}
			}
		};

		let containerPath = {};
		let paths = [];
		let pathsAndMetadataId = [];
		let containerPathNoRepeatId = [];
		let returnNo = 0;
		function getData() {
			return data;
		}

		function getDataWithActionLinks() {
			return dataWithActionLinks;
		}

		function setData(dataIn) {
			data = dataIn;
		}

		const findContainer = function(path) {
			paths.push(path);
			let pathToFind = JSON.stringify(path);
			return containerPath[pathToFind];
		};

		const setContainer = function(path, dataContainer) {
			let pathString = JSON.stringify(path);
			containerPath[pathString] = dataContainer;
		};
		const getRequestedPath = function(callNo) {
			return paths[callNo];
		};

		const findContainersUsingPathAndMetadataId = function(path, metadataId) {
			pathsAndMetadataId.push({ path: path, metadataId: metadataId });
			let toReturn = containerPathNoRepeatId[returnNo];
			returnNo++;
			return toReturn;
		};
		const addToReturnForFindContainersUsingPathAndMetadataId = function(toAdd) {
			containerPathNoRepeatId.push(toAdd);
		};
		const getRequestedPathAndMetadataId = function(callNo) {
			return pathsAndMetadataId[callNo];
		};
		return Object.freeze({
			"type": "dataHolderSpy",
			getData: getData,
			getDataWithActionLinks: getDataWithActionLinks,
			setData: setData,
			findContainer: findContainer,
			setContainer: setContainer,
			getRequestedPath: getRequestedPath,
			findContainersUsingPathAndMetadataId: findContainersUsingPathAndMetadataId,
			addToReturnForFindContainersUsingPathAndMetadataId: addToReturnForFindContainersUsingPathAndMetadataId,
			getRequestedPathAndMetadataId: getRequestedPathAndMetadataId
		});
	};
	return coraTest;
}(CORATEST || {}));