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
	coraTest.openInfoFilenameTextVar = {
		"loadInBackground" : "false",
		"record" : {
			"data" : {
				"children" : [
					{
						"children" : [
							{
								"name" : "id",
								"value" : "filenameTextVar"
							},
							{
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "recordType"
								}, {
									"name" : "linkedRecordId",
									"value" : "metadataTextVariable"
								} ],
								"actionLinks" : {
									"read" : {
										"requestMethod" : "GET",
										"rel" : "read",
										"url" : "http://localhost:8080/therest/rest/record/recordType/metadataTextVariable",
										"accept" : "application/vnd.cora.record+json"
									}
								},
								"name" : "type"
							},
							{
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "user"
								}, {
									"name" : "linkedRecordId",
									"value" : "141414"
								} ],
								"name" : "createdBy"
							},
							{
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "system"
								}, {
									"name" : "linkedRecordId",
									"value" : "bibsys"
								} ],
								"actionLinks" : {
									"read" : {
										"requestMethod" : "GET",
										"rel" : "read",
										"url" : "http://localhost:8080/therest/rest/record/system/bibsys",
										"accept" : "application/vnd.cora.record+json"
									}
								},
								"name" : "dataDivider"
							} ],
						"name" : "recordInfo"
					}, {
						"name": "textId",
						"children": [
							{
								"name": "linkedRecordType",
								"value": "coraText"
							},
							{
								"name": "linkedRecordId",
								"value": "filenameTextVarVarText"
							}
						]
					},
					{
						"name": "defTextId",
						"children": [
							{
								"name": "linkedRecordType",
								"value": "coraText"
							},
							{
								"name": "linkedRecordId",
								"value": "filenameTextVarDefText"
							}
						]
					},
					{
						"name": "regEx",
						"value": "(^[0-9A-Za-z:-_]{2,50}$)"
					} ],
				"name" : "metadata"
			},
			"actionLinks" : {
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://localhost:8080/therest/rest/record/metadataTextVariable/filenameTextVar",
					"accept" : "application/vnd.cora.record+json"
				},
				"read_incoming_links" : {
					"requestMethod" : "GET",
					"rel" : "read_incoming_links",
					"url" : "http://localhost:8080/therest/rest/record/metadataTextVariable/filenameTextVar/incomingLinks",
					"accept" : "application/vnd.cora.recordList+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/vnd.cora.record+json",
					"url" : "http://localhost:8080/therest/rest/record/metadataTextVariable/filenameTextVar",
					"accept" : "application/vnd.cora.record+json"
				}
			}
		}

	};
	coraTest.openInfoWrittenTextGroupText = {
		"loadInBackground" : "false",
		"record" : {
			"data" : {
				"children" : [
					{
						"children" : [
							{
								"name" : "id",
								"value" : "writtenTextGroupText"
							},
							{
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "recordType"
								}, {
									"name" : "linkedRecordId",
									"value" : "coraText"
								} ],
								"actionLinks" : {
									"read" : {
										"requestMethod" : "GET",
										"rel" : "read",
										"url" : "http://localhost:8080/therest/rest/record/recordType/coraText",
										"accept" : "application/vnd.cora.record+json"
									}
								},
								"name" : "type"
							},
							{
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "user"
								}, {
									"name" : "linkedRecordId",
									"value" : "141414"
								} ],
								"name" : "createdBy"
							},
							{
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "system"
								}, {
									"name" : "linkedRecordId",
									"value" : "bibsys"
								} ],
								"actionLinks" : {
									"read" : {
										"requestMethod" : "GET",
										"rel" : "read",
										"url" : "http://localhost:8080/therest/rest/record/system/bibsys",
										"accept" : "application/vnd.cora.record+json"
									}
								},
								"name" : "dataDivider"
							} ],
						"name" : "recordInfo"
					}, {
						"children" : [ {
							"name" : "text",
							"value" : "Text2"
						} ],
						"name" : "textPart",
						"attributes" : {
							"type" : "default",
							"lang" : "sv"
						}
					}, {
						"children" : [ {
							"name" : "text",
							"value" : "Text"
						} ],
						"name" : "textPart",
						"attributes" : {
							"type" : "alternative",
							"lang" : "en"
						}
					} ],
				"name" : "text"
			},
			"actionLinks" : {
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://localhost:8080/therest/rest/record/coraText/writtenTextGroupText",
					"accept" : "application/vnd.cora.record+json"
				},
				"read_incoming_links" : {
					"requestMethod" : "GET",
					"rel" : "read_incoming_links",
					"url" : "http://localhost:8080/therest/rest/record/coraText/writtenTextGroupText/incomingLinks",
					"accept" : "application/vnd.cora.recordList+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/vnd.cora.record+json",
					"url" : "http://localhost:8080/therest/rest/record/coraText/writtenTextGroupText",
					"accept" : "application/vnd.cora.record+json"
				}
			}
		}

	};
	return coraTest;
}(CORATEST || {}));