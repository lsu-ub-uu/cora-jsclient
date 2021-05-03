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
			"actionLinks" : {
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://localhost:8080/therest/rest/record/recordType/writtenText",
					"accept" : "application/vnd.uub.record+json"
				}
			}
		};
		
		function getData() {
			return data;
		}

		function getDataWithActionLinks() {
			return dataWithActionLinks;
		}
		
		function setData(dataIn){
			data = dataIn;
		}
		return Object.freeze({
			"type" : "dataHolderSpy",
			getData : getData,
			getDataWithActionLinks : getDataWithActionLinks,
			setData : setData
		});
	};
	return coraTest;
}(CORATEST || {}));