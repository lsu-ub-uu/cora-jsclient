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
	coraTest.firstLevelPath = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			} ]
		};
	coraTest.firstLevelPathWithRepeatId = {
			"name": "linkedPath",
			"children": [
				{
					"name": "nameInData",
					"value": "textVariableId"
				},
				{
					"name": "repeatId",
					"value": "0"
				}
			]
		};
	coraTest.pathWithTwoLevels = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "recordInfo"
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "dataDivider"
				} ]
			} ]
		};
	coraTest.numPathWithThreeLevels = {
			"name": "linkedPath",
			"children": [{
				"name": "nameInData",
				"value": "recordInfo"
			}, {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "dataDivider"
				}, {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "numVariableId"
					}]
				}]
			}]
		};
	coraTest.twoLevelPathWithAttribute = {
			"name": "linkedPath",
			"children": [{
				"name": "nameInData",
				"value": "textPart"
			}, {
				"name": "attributes",
				"children": [{
					"name": "attribute",
					"repeatId": "1",
					"children": [{
						"name": "attributeName",
						"value": "type"
					}, {
						"name": "attributeValue",
						"value": "alternative"
					}]
				}]
			}, {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "numVariableId"
				}]
			}]
		};
	coraTest.twoLevelPathWithRepeatId = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "userRole"
			}, {
				"name" : "repeatId",
				"value" : "0"
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "userRole"
				} ]
			} ]
		}
	return coraTest;
}(CORATEST || {}));