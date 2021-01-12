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

	coraTest.createJsonForChildReference = function(arrayWithChildParameters) {

		let json = {
			"name": "childReferences",
			"children": []
		};

		let repeatId = 0;
		arrayWithChildParameters.forEach((parameters) => {
			let linkedRecordType, linkedRecordId, constraint, repeatMax;
			[linkedRecordType, linkedRecordId, constraint, repeatMax = "1"] = parameters;

			let constraintPart = {
				"name": "recordPartConstraint",
				"value": constraint
			};

			let child = {
				"name": "childReference",
				"repeatId": repeatId++,
				"children": [
					{
						"name": "ref",
						"children": [{
							"name": "linkedRecordType",
							"value": linkedRecordType
						}, {
							"name": "linkedRecordId",
							"value": linkedRecordId
						}]
					}, {
						"name": "repeatMin",
						"value": "1"
					}, {
						"name": "repeatMax",
						"value": repeatMax
					}
				]
			};

			if (typeof constraint !== 'undefined') {
				child.children.push(constraintPart)
			}

			json.children.push(child);

		});

		return json;
	};

	coraTest.createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId = function(idToGet) {
		return [coraTest.createJsonRecordInfo(idToGet)]
			.concat(coraTest.createJsonNameInDataTextIdAndDefTextId(idToGet));
	};

	coraTest.createJsonRecordInfo = function(id) {
		return {
			"name": "recordInfo",
			"children": [{
				"name": "id",
				"value": id
			}, {
				"name": "type",
				"value": "metadataGroup"
			}, {
				"name": "createdBy",
				"children": [{
					"name": "linkedRecordType",
					"value": "user"
				}, {
					"name": "linkedRecordId",
					"value": "userId"
				}]
			}, {
				"name": "updatedBy",
				"value": "userId"
			}]
		};
	}

	coraTest.createJsonNameInDataTextIdAndDefTextId = function(id) {
		return [{
			"name": "nameInData",
			"value": id + "NameInData"
		}, {
			"name": "textId",
			"value": id + "Text"
		}, {
			"name": "defTextId",
			"value": id + "DefText"
		}];
	}

	coraTest.createJsonAtomicTextVariable = function(metadataId) {
		return {
			"name": "metadata",
			"children": [{
				"name": "regEx",
				"value": "^[0-9A-Öa-ö\\s!*.]{2,50}$"
			}]
				.concat(coraTest.createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(metadataId)),
			"attributes": {
				"type": "textVariable"
			}
		}
	};

	coraTest.createJsonGroup = function(childReferences, metadataId) {
		return	{
			"name": "metadata",
				"attributes": {
				"type": "group"
			},
			"children": [childReferences].concat(coraTest.createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(metadataId))
		};
	}


	return coraTest;
}(CORATEST || {}));