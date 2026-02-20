/*
 * Copyright 2016, 2017 Olov McKie
 * Copyright 2016, 2017 Uppsala University Library
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
"use strict";

QUnit.module("search/searchProviderTest.js", {
	beforeEach : function() {
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		var dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy
		};
		this.dependencies = dependencies;

		var searchRecordListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/search/",
			"accept" : "application/vnd.cora.recordList+json"
		};
		this.searchRecordListLink = searchRecordListLink;

		var spec = {
			"searchRecordListLink" : searchRecordListLink
		};

		this.spec = spec;
		this.searchRecordListLink = searchRecordListLink;
		this.searchRecordListLinkJson = JSON.stringify(this.searchRecordListLink);

		this.answerListCall = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonSearchRecordList = JSON.stringify(CORATEST.searchRecordList);
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonSearchRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	assert.strictEqual(provider.type, "searchProvider");
});

QUnit.test("testGetDependencies", function(assert) {
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	assert.strictEqual(provider.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	assert.strictEqual(provider.getSpec(), this.spec);
});

QUnit.test("testInitCorrectRequestMade", function(assert) {
	var provider = CORA.searchProvider(this.dependencies, this.spec);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/search/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, provider.processFetchedData);
});

QUnit.test("initCallWhenReadyCalledWhenReady", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}
	this.spec.callWhenReady = providerReady;
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	assert.notOk(providerStarted);

	this.answerListCall(0);
	assert.ok(providerStarted);
});

QUnit.test("initCallWhenReadyNotCalledWhenReadyIfUnspecified", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	assert.notOk(providerStarted);

	this.answerListCall(0);
	assert.notOk(providerStarted);
});

QUnit.test("testInitEnteredLinkIsNotChanged", function(assert) {
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	var searchRecordListLinkJson = this.searchRecordListLinkJson;
	var searchRecordListLinkJsonAfter = JSON.stringify(this.searchRecordListLink);
	assert.deepEqual(searchRecordListLinkJsonAfter, searchRecordListLinkJson);
});

QUnit
		.test(
				"getSearchById",
				function(assert) {
					var provider = CORA.searchProvider(this.dependencies, this.spec);
					this.answerListCall(0);

					var expected = {
						"data" : {
							"children" : [
									{
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "metadataGroup"
										}, {
											"name" : "linkedRecordId",
											"value" : "autocompleteSearchGroup"
										} ],
										"actionLinks" : {
											"read" : {
												"requestMethod" : "GET",
												"rel" : "read",
												"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
												"accept" : "application/vnd.cora.record+json"
											}
										},
										"name" : "metadataId"
									},
									{
										"children" : [
												{
													"name" : "id",
													"value" : "coraTextSearch"
												},
												{
											          "name": "type",
											          "children": [
											            {
											              "name": "linkedRecordType",
											              "value": "recordType"
											            },
											            {
											              "name": "linkedRecordId",
											              "value": "search"
											            }
											          ]
											        },
												{
								      				"name" : "createdBy",
								      				"children": [
								      					{
								      						"name": "linkedRecordType",
								      						"value": "user"
								      					},
								      					{
								      						"name": "linkedRecordId",
								      						"value": "141414"
								      					}
								      				]
								      			},
												{
													"children" : [ {
														"name" : "linkedRecordType",
														"value" : "system"
													}, {
														"name" : "linkedRecordId",
														"value" : "cora"
													} ],
													"actionLinks" : {
														"read" : {
															"requestMethod" : "GET",
															"rel" : "read",
															"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
															"accept" : "application/vnd.cora.record+json"
														}
													},
													"name" : "dataDivider"
												} ],
										"name" : "recordInfo"
									},
									{
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "presentationGroup"
										}, {
											"name" : "linkedRecordId",
											"value" : "autocompleteSearchPGroup"
										} ],
										"actionLinks" : {
											"read" : {
												"requestMethod" : "GET",
												"rel" : "read",
												"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
												"accept" : "application/vnd.cora.record+json"
											}
										},
										"name" : "presentationId"
									},
									{
										"repeatId" : "0",
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
												"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/coraText",
												"accept" : "application/vnd.cora.record+json"
											}
										},
										"name" : "recordTypeToSearchIn"
									} ,{
									      "name": "searchGroup",
									      "value": "autocomplete"
									    },
									    {
									        "name": "textId",
									        "children": [
									          {
									            "name": "linkedRecordType",
									            "value": "coraText"
									          },
									          {
									            "name": "linkedRecordId",
									            "value": "coraTextSearchText"
									          }
									        ]
									      }],
							"name" : "search"
						},
						"actionLinks" : {
							"search" : {
								"requestMethod" : "GET",
								"rel" : "search",
								"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/coraTextSearch",
								"accept" : "application/vnd.cora.recordList+json"
							},
							"read" : {
								"requestMethod" : "GET",
								"rel" : "read",
								"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
								"accept" : "application/vnd.cora.record+json"
							},
							"read_incoming_links" : {
								"requestMethod" : "GET",
								"rel" : "read_incoming_links",
								"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch/incomingLinks",
								"accept" : "application/vnd.cora.recordList+json"
							},
							"update" : {
								"requestMethod" : "POST",
								"rel" : "update",
								"contentType" : "application/vnd.cora.record+json",
								"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
								"accept" : "application/vnd.cora.record+json"
							},
						    "index": {
						      "requestMethod": "POST",
						      "rel": "index",
						      "body": {
						        "children": [
						          {
						            "children": [
						              {
						                "name": "linkedRecordType",
						                "value": "recordType"
						              },
						              {
						                "name": "linkedRecordId",
						                "value": "search"
						              }
						            ],
						            "name": "recordType"
						          },
						          {
						            "name": "recordId",
						            "value": "coraTextSearch"
						          },
						          {
						            "name": "type",
						            "value": "index"
						          }
						        ],
						        "name": "workOrder"
						      },
						      "contentType": "application/vnd.cora.record+json",
						      "url": "http://localhost:8080/therest/rest/record/workOrder/",
						      "accept": "application/vnd.cora.record+json"
						    }
						}
					};
					var x = provider.getSearchById("coraTextSearch");
					assert.stringifyEqual(x, expected);
				});

QUnit.test("getSearchByIdNotFound", function(assert) {
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	this.answerListCall(0);

	var error = false;
	try {
		var x = provider.getSearchById("someNonExistingRecordTypeId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});

QUnit.test("getAllSearches", function(assert) {
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	this.answerListCall(0);

	var recordTypeList = provider.getAllSearches();
	assert.stringifyEqual(recordTypeList.length, 11);
});

QUnit.test("testReload", function(assert) {
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	var providerReloaded = false;
	function callWhenProviderHasReloaded() {
		providerReloaded = true;
	}

	assert.notOk(providerReloaded);

	provider.reload(callWhenProviderHasReloaded);

	this.answerListCall(1);
	assert.ok(providerReloaded);
});

QUnit.test("testGetSearchesByGroupId", function(assert) {
	var provider = CORA.searchProvider(this.dependencies, this.spec);
	this.answerListCall(0);

	var autocompleteList = provider.getSearchesByGroupId("autocomplete");
	assert.stringifyEqual(autocompleteList.length, 7);

	var publicSearchesList = provider.getSearchesByGroupId("publicSearch");
	assert.stringifyEqual(publicSearchesList.length, 4);

	var nonExistingSearchesList = provider.getSearchesByGroupId("NONExistingGroup");
	assert.stringifyEqual(nonExistingSearchesList.length, 0);
});
