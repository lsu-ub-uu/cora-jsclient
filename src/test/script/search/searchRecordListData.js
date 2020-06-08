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
	coraTest.searchRecordList = {
		"dataList" : {
			"fromNo" : "1",
			"data" : [
					{
						"record" : {
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
										} ,{
										      "name": "searchGroup",
										      "value": "autocomplete"
										    },{
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
						}
					},
					{
						"record" : {
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
										},{
										      "name": "searchGroup",
										      "value": "publicSearch"
										    } ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/someSearch/",
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
												"value": "someSearch"
											},
											{
												"name": "type",
												"value": "index"
											}
										],
										"name": "workOrder"
									},
									"contentType": "application/vnd.uub.record+json",
									"url": "http://localhost:8080/therest/rest/record/workOrder/",
									"accept": "application/vnd.uub.record+json"
								}
							}
						}
					},
					{
						"record" : {
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
										} ,{
										      "name": "searchGroup",
										      "value": "autocomplete"
										    }],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataItemCollectionSearch/",
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
						}
					},
					{
						"record" : {
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
														"value" : "textSystemOneSearch"
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
												"value" : "textSystemOne"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/textSystemOne",
													"accept" : "application/vnd.uub.record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ,{
										      "name": "searchGroup",
										      "value": "autocomplete"
										    }],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/textSystemOneSearch/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSystemOneSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSystemOneSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSystemOneSearch",
									"accept" : "application/vnd.uub.record+json"
								}
							}
						}
					},
					{
						"record" : {
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
														"value" : "bookSearch"
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
															"value" : "systemOne"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/systemOne",
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
												"value" : "book"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/book",
													"accept" : "application/vnd.uub.record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ,{
										      "name": "searchGroup",
										      "value": "autocomplete"
										    }],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/bookSearch/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/bookSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/bookSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/bookSearch",
									"accept" : "application/vnd.uub.record+json"
								}
							}
						}
					},
					{
						"record" : {
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
														"value" : "loginSearch"
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
												"value" : "login"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/login",
													"accept" : "application/vnd.uub.record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ,{
										      "name": "searchGroup",
										      "value": "publicSearch"
										    }],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/loginSearch/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginSearch",
									"accept" : "application/vnd.uub.record+json"
								}
							}
						}
					},
					{
						"record" : {
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
														"value" : "loginWebRedirectSearch"
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
												"value" : "loginWebRedirect"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/loginWebRedirect",
													"accept" : "application/vnd.uub.record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ,{
										      "name": "searchGroup",
										      "value": "autocomplete"
										    }],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/loginWebRedirectSearch/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginWebRedirectSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginWebRedirectSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginWebRedirectSearch",
									"accept" : "application/vnd.uub.record+json"
								}
							}
						}
					},
					{
						"record" : {
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
														"value" : "presentationRepeatingContainerSearch"
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
												"value" : "presentationRepeatingContainer"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentationRepeatingContainer",
													"accept" : "application/vnd.uub.record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ,{
										      "name": "searchGroup",
										      "value": "publicSearch"
										    }],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationRepeatingContainerSearch/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRepeatingContainerSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRepeatingContainerSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRepeatingContainerSearch",
									"accept" : "application/vnd.uub.record+json"
								}
							}
						}
					},
					{
						"record" : {
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
														"value" : "presentationVarSearch"
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
												"value" : "presentationVar"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentationVar",
													"accept" : "application/vnd.uub.record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ,{
										      "name": "searchGroup",
										      "value": "publicSearch"
										    }],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationVarSearch/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationVarSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationVarSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationVarSearch",
									"accept" : "application/vnd.uub.record+json"
								}
							}
						}
					},
					{
						"record" : {
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
														"value" : "soundSearch"
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
												"value" : "sound"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/sound",
													"accept" : "application/vnd.uub.record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ,{
										      "name": "searchGroup",
										      "value": "autocomplete"
										    }],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/soundSearch/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/soundSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/soundSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/soundSearch",
									"accept" : "application/vnd.uub.record+json"
								}
							}
						}
					},
					{
						"record" : {
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
														"value" : "metadataSearch"
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
										} ,{
										      "name": "searchGroup",
										      "value": "autocomplete"
										    }],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataSearch/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
									"accept" : "application/vnd.uub.record+json"
								}
							}
						}
					} ],
			"totalNo" : "11",
			"containDataOfType" : "search",
			"toNo" : "11"
		}
	};
	coraTest.searchRecordListOneRecord = {
			"dataList" : {
				"fromNo" : "1",
				"data" : [
					{
						"record": {
							"data": {
								"children": [
									{
										"children": [
											{
												"name": "id",
												"value": "person2"
											},
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "recordType"
													},
													{
														"name": "linkedRecordId",
														"value": "person"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "http://localhost:8080/therest/rest/record/recordType/person",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "type"
											},
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"name": "createdBy"
											},
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "system"
													},
													{
														"name": "linkedRecordId",
														"value": "systemOne"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "http://localhost:8080/therest/rest/record/system/systemOne",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "dataDivider"
											},
											{
												"name": "tsCreated",
												"value": "2017-10-01 00:00:00.0"
											},
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2018-01-24 12:58:18.189"
											}
										],
										"name": "recordInfo"
									},
									{
										"repeatId": "0",
										"children": [
											{
												"name": "identifierType",
												"value": "viaf"
											},
											{
												"name": "identifierValue",
												"value": ""
											}
										],
										"name": "identifier"
									},
									{
										"children": [
											{
												"children": [
													{
														"name": "value",
														"value": "tv"
													}
												],
												"name": "namePart",
												"attributes": {
													"type": "givenName"
												}
											},
											{
												"children": [
													{
														"name": "value",
														"value": "a"
													}
												],
												"name": "namePart",
												"attributes": {
													"type": "familyName"
												}
											}
										],
										"name": "name",
										"attributes": {
											"type": "authorized"
										}
									},
									{
										"repeatId": "1",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "person"
											},
											{
												"name": "linkedRecordId",
												"value": "sdfd"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "http://localhost:8080/therest/rest/record/person/sdfd",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "relatedPerson"
									},
									{
										"repeatId": "2",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "person"
											},
											{
												"name": "linkedRecordId",
												"value": "sdfd"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "http://localhost:8080/therest/rest/record/person/sdfd",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "relatedPerson"
									},
									{
										"repeatId": "3",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "organisation"
											},
											{
												"name": "linkedRecordId",
												"value": "someOrganisation"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "http://localhost:8080/therest/rest/record/organisation/someOrganisation",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "relatedOrganisation",
										"attributes": {
											"type": "other"
										}
									}
								],
								"name": "person"
							},
							"actionLinks": {
								"read": {
									"requestMethod": "GET",
									"rel": "read",
									"url": "http://localhost:8080/therest/rest/record/person/person2",
									"accept": "application/vnd.uub.record+json"
								},
								"read_incoming_links": {
									"requestMethod": "GET",
									"rel": "read_incoming_links",
									"url": "http://localhost:8080/therest/rest/record/person/person2/incomingLinks",
									"accept": "application/vnd.uub.recordList+json"
								},
								"update": {
									"requestMethod": "POST",
									"rel": "update",
									"contentType": "application/vnd.uub.record+json",
									"url": "http://localhost:8080/therest/rest/record/person/person2",
									"accept": "application/vnd.uub.record+json"
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
														"value": "person"
													}
												],
												"name": "recordType"
											},
											{
												"name": "recordId",
												"value": "person2"
											},
											{
												"name": "type",
												"value": "index"
											}
										],
										"name": "workOrder"
									},
									"contentType": "application/vnd.uub.record+json",
									"url": "http://localhost:8080/therest/rest/record/workOrder/",
									"accept": "application/vnd.uub.record+json"
								}
							}
						}
					}],
				"totalNo" : "1",
				"containDataOfType" : "person",
				"toNo" : "1"
			}
		};
	coraTest.searchRecordListOneRecordWithNoIndexAction = {
		"dataList" : {
			"fromNo" : "1",
			"data" : [
				{
					"record" : {
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
											"value" : "metadataSearch"
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
								"url" : "http://epc.ub.uu.se/therest/rest/record/metadataSearch/",
								"accept" : "application/vnd.uub.recordList+json"
							},
							"read" : {
								"requestMethod" : "GET",
								"rel" : "read",
								"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
								"accept" : "application/vnd.uub.record+json"
							},
							"read_incoming_links" : {
								"requestMethod" : "GET",
								"rel" : "read_incoming_links",
								"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch/incomingLinks",
								"accept" : "application/vnd.uub.recordList+json"
							},
							"update" : {
								"requestMethod" : "POST",
								"rel" : "update",
								"contentType" : "application/vnd.uub.record+json",
								"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
								"accept" : "application/vnd.uub.record+json"
							}
						}
					}
				} ],
			"totalNo" : "1",
			"containDataOfType" : "search",
			"toNo" : "1"
		}
	};
	return coraTest;
}(CORATEST || {}));