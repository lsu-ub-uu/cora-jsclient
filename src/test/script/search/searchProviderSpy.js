/*
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

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.searchProviderSpy = function() {
		var searchArray = [];
		var fetchedSearchIds = [];
		var allSearchesNo = 0;
		var callWhenReloadedMethod;
		var noOfReloads = 0;

		searchArray["coraTextSearch"] = {
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
									"accept" : "application/vnd.uub.record+json"
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
										"name" : "type",
										"value" : "search"
									},
									{
										"name" : "createdBy",
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "user"
										}, {
											"name" : "linkedRecordId",
											"value" : "141414"
										} ]
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
												"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "recordTypeToSearchIn"
						} ],
				"name" : "search"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/coraTextSearch",
					"accept" : "application/vnd.uub.recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
					"accept" : "application/vnd.uub.record+json"
				},
				"read_incoming_links" : {
					"requestMethod" : "GET",
					"rel" : "read_incoming_links",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch/incomingLinks",
					"accept" : "application/vnd.uub.recordList+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/vnd.uub.record+json",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
					"accept" : "application/vnd.uub.record+json"
				}
			}
		};
		searchArray["someSearch"] = {
			"data" : {
				"children" : [
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataGroup"
							}, {
								"name" : "linkedRecordId",
								"value" : "metadataGroupGroup"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/metadataGroupGroup",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "metadataId"
						},
						{
							"children" : [
									{
										"name" : "id",
										"value" : "someSearch"
									},
									{
										"name" : "type",
										"value" : "search"
									},
									{
										"name" : "createdBy",
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "user"
										}, {
											"name" : "linkedRecordId",
											"value" : "141414"
										} ]
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
												"accept" : "application/vnd.uub.record+json"
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
								"value" : "metadataFormPGroup"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/metadataFormPGroup",
									"accept" : "application/vnd.uub.record+json"
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
								"value" : "metadata"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadata",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "recordTypeToSearchIn"
						} ],
				"name" : "search"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/someSearch",
					"accept" : "application/vnd.uub.recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/someSearch",
					"accept" : "application/vnd.uub.record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/vnd.uub.record+json",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/someSearch",
					"accept" : "application/vnd.uub.record+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/someSearch"
				}
			}
		};
		searchArray["metadataItemCollectionSearch"] = {
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
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "metadataId"
						},
						{
							"children" : [
									{
										"name" : "id",
										"value" : "metadataItemCollectionSearch"
									},
									{
										"name" : "type",
										"value" : "search"
									},
									{
										"name" : "createdBy",
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "user"
										}, {
											"name" : "linkedRecordId",
											"value" : "141414"
										} ]
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
												"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.record+json"
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
								"value" : "metadataItemCollection"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadataItemCollection",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "recordTypeToSearchIn"
						} ],
				"name" : "search"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/metadataItemCollectionSearch",
					"accept" : "application/vnd.uub.recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
					"accept" : "application/vnd.uub.record+json"
				},
				"read_incoming_links" : {
					"requestMethod" : "GET",
					"rel" : "read_incoming_links",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch/incomingLinks",
					"accept" : "application/vnd.uub.recordList+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/vnd.uub.record+json",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
					"accept" : "application/vnd.uub.record+json"
				}
			}
		};
		searchArray["searchWithoutSearchLink"] = {
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
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "metadataId"
						},
						{
							"children" : [
									{
										"name" : "id",
										"value" : "searchWithoutSearchLink"
									},
									{
										"name" : "type",
										"value" : "search"
									},
									{
										"name" : "createdBy",
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "user"
										}, {
											"name" : "linkedRecordId",
											"value" : "141414"
										} ]
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
												"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.record+json"
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
								"value" : "metadataItemCollection"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadataItemCollection",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "recordTypeToSearchIn"
						} ],
				"name" : "search"
			},
			"actionLinks" : {
				// "search" : {
				// "requestMethod" : "GET",
				// "rel" : "search",
				// "url" :
				// "http://epc.ub.uu.se/therest/rest/record/searchResult/metadataItemCollectionSearch",
				// "accept" : "application/vnd.uub.recordList+json"
				// },
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
					"accept" : "application/vnd.uub.record+json"
				},
				"read_incoming_links" : {
					"requestMethod" : "GET",
					"rel" : "read_incoming_links",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch/incomingLinks",
					"accept" : "application/vnd.uub.recordList+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/vnd.uub.record+json",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
					"accept" : "application/vnd.uub.record+json"
				}
			}
		};
		searchArray["textSearch"] = {
			"data" : {
				"name" : "search",
				"children" : [ {
					"name" : "metadataId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "textSearchGroup"
					} ]
				}, {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textSearch"
					}, {
						"name" : "type",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "search"
						} ]
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "141414"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "presentationId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "presentationGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "textSearchPGroup"
					} ]
				}, {
					"name" : "recordTypeToSearchIn",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "coraText"
					} ],
					"repeatId" : "0"
				}, {
					"name" : "recordTypeToSearchIn",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "textSystemOne"
					} ],
					"repeatId" : "1"
				}, {
					"name" : "searchGroup",
					"value" : "autocomplete"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textSearchText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textSearchDefText"
					} ]
				} ]
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/textSearch",
					"accept" : "application/vnd.uub.recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSearch",
					"accept" : "application/vnd.uub.record+json"
				},
				"read_incoming_links" : {
					"requestMethod" : "GET",
					"rel" : "read_incoming_links",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSearch/incomingLinks",
					"accept" : "application/vnd.uub.recordList+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/vnd.uub.record+json",
					"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSearch",
					"accept" : "application/vnd.uub.record+json"
				}
			}
		};
		function getSearchById(searchId) {
			fetchedSearchIds.push(searchId);

			if (searchArray[searchId] !== undefined) {
				return searchArray[searchId];
			} else {

				// default:
				console.log("Id(" + searchId + ") not found in searchProviderSpy");
				throw new Error("Id(" + searchId + ") not found in searchProviderSpy");
			}
		}

		function getAllSearches() {
			allSearchesNo++;
			var searchList = [];
			Object.keys(searchArray).forEach(function(id) {
				searchList.push(searchArray[id]);
			});
			return searchList;
		}

		function getFetchedSearchIdNo(no) {
			return fetchedSearchIds[no];
		}
		function getAllSearchesFetchedNo() {
			return allSearchesNo;
		}

		function reload(callWhenReloadedMethodIn) {
			noOfReloads++;
			callWhenReloadedMethod = callWhenReloadedMethodIn;
		}
		function getCallWhenReloadedMethod() {
			return callWhenReloadedMethod;
		}
		function callWhenReloadedMethod() {
			callWhenReloadedMethod();
		}
		function getNoOfReloads() {
			return noOfReloads;
		}

		return Object.freeze({
			"type" : "searchProviderSpy",
			getSearchById : getSearchById,
			getAllSearches : getAllSearches,
			getFetchedSearchIdNo : getFetchedSearchIdNo,
			getAllSearchesFetchedNo : getAllSearchesFetchedNo,
			reload : reload,
			getCallWhenReloadedMethod : getCallWhenReloadedMethod,
			getNoOfReloads : getNoOfReloads,
			callWhenReloadedMethod : callWhenReloadedMethod
		});
	};
	return coraTest;
}(CORATEST || {}));