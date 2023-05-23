/*
 * Copyright 2016 Uppsala University Library
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
	coraTest.recordTypeList = {
		"dataList": {
			"fromNo": "0",
			"data": [
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/collectTermGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "collectTerm"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T13:00:17.327000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:41.766000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-19T11:53:00.821000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:24:22.233000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:24:25.143000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:16:41.202531Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:39.773868Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:45.591588Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "8",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:05.758576Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "9",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:52:55.938214Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "10",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:08.061623Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "11",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-05-05T12:51:50.973537Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectTermOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectTermPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/collectTermNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectTermNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectTermMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectTermListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/collectTermText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/collectTermDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "collectTermSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/collectTermSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "metadata"
								},
								{
									"repeatId": "1",
									"name": "groupOfRecordType",
									"value": "permission"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/collectTermSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/collectTerm",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/collectTerm/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/collectTerm",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "collectTerm"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/collectTerm/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/collectTerm/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/collectTerm/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/indexBatchJobGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "indexBatchJob"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2021-06-02T14:04:37.873022Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:16:32.304836Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:57.237040Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:53:02.201308Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:07.859865Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2021-06-02T14:04:37.873022Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/indexBatchJobOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/indexBatchJobPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/indexBatchJobNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/indexBatchJobNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/indexBatchJobMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/indexBatchJobListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/indexBatchJobText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/indexBatchJobDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/indexBatchJobSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "indexBatchJobAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/indexBatchJobAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "other"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/indexBatchJobSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/indexBatchJob",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/indexBatchJob/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/indexBatchJob",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "indexBatchJob"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/indexBatchJob/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/indexBatchJob/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/indexBatchJob/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/workOrderGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "workOrder"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-26T15:11:09.704000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:05.617000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:34:44.011000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:29:48.165000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:18:41.128750Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:48.850972Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:51:20.129431Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:05.028277Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/workOrderOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/workOrderPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/workOrderNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/workOrderNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/workOrderMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/workOrderListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/workOrderText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/workOrderDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/workOrderSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "workOrderAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/workOrderAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "other"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/workOrderSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/workOrder",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/workOrder/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/workOrder",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "workOrder"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "metadata"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T10:39:38.892000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:49:27.021000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:26:35.755000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:24:32.638000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:15:38.461870Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:21:01.093736Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:46.924486Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:54.635188Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "8",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:57.974704Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "9",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:00.192242Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "10",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:00.840742Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "11",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:01.668410Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "12",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:08.538404Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "13",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:10.045708Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "14",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:49:04.954503Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "15",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:01.271992Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "metadataSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/metadataSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "metadata"
								},
								{
									"name": "public",
									"value": "true"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/metadataSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "metadata"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/metadata/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRoleGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/permissionRoleGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "permissionRole"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T10:41:46.228000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:09.952000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:34:55.627000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:29:53.039000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:18:28.656728Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:50.229623Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:51:31.670986Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:05.401169Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRoleOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRoleOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRolePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRolePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRoleNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/permissionRoleNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRoleNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRoleNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRoleMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRoleMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRoleListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRoleListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRoleText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/permissionRoleText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRoleDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/permissionRoleDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRoleSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/permissionRoleSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "permission"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/permissionRoleSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionRole",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionRole/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionRole",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "permissionRole"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/permissionRole/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/permissionRole/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/permissionRole/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/appTokenGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "appToken"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T10:42:02.182000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:16.914000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:35:22.254000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:30:09.683000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:18:14.453399Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:51.691591Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:51:42.464245Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:05.770039Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "131313"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/131313",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/appTokenOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/appTokenPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/appTokenNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/appTokenNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/appTokenMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/appTokenListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/appTokenText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/appTokenDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "appTokenSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/appTokenSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "permission"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/appToken",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/appToken/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/appToken",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "appToken"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/appToken/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypeGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/recordTypeGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "recordType"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-26T15:15:34.261000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:51:24.370000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:36:01.985000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:30:17.433000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:14:24.843721Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:06.422864Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:54:21.781671Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:11.394499Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypeOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/recordTypeOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/recordTypePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypeNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/recordTypeNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypeNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/recordTypeNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypeMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/recordTypeMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypeListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/recordTypeListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypeText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/recordTypeText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypeDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/recordTypeDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "recordTypeSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/recordTypeSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "metadata"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/recordTypeSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "recordType"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/recordType/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/validationTypeGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "validationType"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-01-18T13:33:03.257542Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-01-18T13:33:37.466483Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:43.381690Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:49:38.331470Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:02.380669Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2023-01-18T13:33:03.257542Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationTypeOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationTypePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/validationTypeNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationTypeNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationTypeMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationTypeListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/validationTypeText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/validationTypeDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/validationTypeSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationTypeAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationTypeAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "metadata"
								},
								{
									"name": "public",
									"value": "true"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/validationTypeSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "validationType"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/validationType/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/guiElementGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "guiElement"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-02-01T12:21:08.190000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:20:12.399984Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:03.034212Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:49:50.053436Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:02.683891Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2019-02-01T12:21:08.190000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/guiElementOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/guiElementPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/guiElementNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/guiElementNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/guiElementMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/guiElementListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/guiElementText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/guiElementDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/guiElementSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "guiElementAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/guiElementAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "presentation"
								},
								{
									"name": "public",
									"value": "true"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/guiElementSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/guiElement",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/guiElement/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/guiElement",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "guiElement"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/guiElement/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/guiElement/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/guiElement/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginUnitGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "loginUnit"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T10:40:20.324000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:49:45.381000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:27:47.089000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:31:04.895000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:25:40.092000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:16:44.174084Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:20:20.118575Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:44.120632Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "8",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:50:03.982193Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "9",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:02.866913Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-11-20T08:52:24.696000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginUnitOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginUnitPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginUnitNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginUnitNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginUnitMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginUnitListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginUnitText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginUnitDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/loginUnitSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginUnitAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginUnitAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "systemConfiguration"
								},
								{
									"repeatId": "1",
									"name": "groupOfRecordType",
									"value": "permission"
								},
								{
									"name": "public",
									"value": "true"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/loginUnitSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/loginUnit",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/loginUnit/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/loginUnit",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "loginUnit"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/loginUnit/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/loginUnit/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/loginUnit/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "loginGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "login"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-26T15:14:13.169000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:55.163000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:31:44.709000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:25:58.717000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:15:33.372765Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:46.196518Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:52.410224Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:03.670187Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "8",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:53:20.785865Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "9",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:08.709543Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "loginNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "loginListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "loginText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "loginDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "loginSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/loginSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "systemConfiguration"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/loginSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/login",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/login/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/login",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "login"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/login/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/login/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/login/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "defaultPermissionRuleGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/defaultPermissionRuleGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "permissionRule"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-04-09T14:32:13.221000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:23.581000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:36:18.723000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:30:37.155000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:17:56.052998Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:53.189033Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:51:55.247168Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:06.204822Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRuleOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRuleOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRulePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRulePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRuleNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/permissionRuleNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRuleNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRuleNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRuleMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRuleMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRuleListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionRuleListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRuleText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/permissionRuleText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRuleDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/permissionRuleDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionRuleSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/permissionRuleSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "permission"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/permissionRuleSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionRule",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionRule/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionRule",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "permissionRule"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/permissionRule/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/permissionRule/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/permissionRule/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "demoGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/demoGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "demo"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "testSystem"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/testSystem",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-08-29T14:09:07.043000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:31:58.129000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:26:06.700000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:15:27.748031Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:59.456531Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:53:28.190704Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:08.943309Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2018-08-29T14:09:07.043000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "demoOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/demoOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "demoPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/demoPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "demoNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/demoNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "demoNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/demoNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "demoMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/demoMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "demoListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/demoListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "demoText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/demoText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "demoDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/demoDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "demoSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/demoSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "demoAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/demoAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "other"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/demoSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/demo",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/demo/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/demo",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "demo"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/demo/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/demo/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/demo/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/exampleGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "example"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "testSystem"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/testSystem",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-09-10T09:07:42.594000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-09-10T09:55:27.059000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:15:04.819129Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:02.364334Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:53:50.277429Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:10.080546Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2019-09-10T09:07:42.594000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/exampleOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "examplePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/examplePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/exampleNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/exampleNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/exampleMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/exampleListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/exampleText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/exampleDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/exampleSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "exampleAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/exampleAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "other"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/exampleSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/example",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/example/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/example",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "example"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/example/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/example/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/example/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "presentation"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T10:40:34.014000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:49:49.799000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:32:49.703000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:27:39.475000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:19:45.291248Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:39.079766Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:40.546675Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:41.904223Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "8",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:47.628633Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "9",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:58.765943Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "10",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:05.008559Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "11",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:07.865803Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "12",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:09.284911Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "13",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:50:25.830317Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "14",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:03.472511Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/presentationSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "presentation"
								},
								{
									"name": "public",
									"value": "true"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/presentationSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "presentation"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/presentation/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "searchGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/searchGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "search"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-26T15:14:36.501000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:51:06.449000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:34:07.718000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:28:07.826000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:14:45.058949Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:04.353409Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:54:06.018032Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:10.747333Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "searchNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/searchNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "searchText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/searchText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "searchDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/searchDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "searchSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/searchSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "search"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/searchSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/search",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/search/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/search",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "search"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/search/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/searchTermGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "searchTerm"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T10:41:07.493000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:49:58.776000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:34:19.045000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:28:12.792000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:18:54.769522Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:48.281072Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:50:47.550396Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:04.268862Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchTermOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchTermPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/searchTermNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchTermNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchTermMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/searchTermListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/searchTermText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/searchTermDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "searchTermSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/searchTermSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "search"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/searchTermSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/searchTerm",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/searchTerm/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/searchTerm",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "searchTerm"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchTerm/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/searchTerm/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchTerm/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "systemGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/systemGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "system"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T12:59:27.084000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:25.837000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:36:38.483000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:30:51.548000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:17:50.307623Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:53.927630Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:52:01.753472Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:06.454581Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "systemNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/systemNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "systemText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/systemText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "systemDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/systemDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/systemSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "systemConfiguration"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/systemSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/system",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/system/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/system",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "system"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/system/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "binaryGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/binaryGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "binary"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T12:59:50.234000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:34.936000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-10-19T09:26:31.278000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:37:07.457000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:31:12.985000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:17:37.113899Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:42.657843Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:49.599812Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "8",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:56.590571Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "9",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:52:16.695301Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "10",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:06.924484Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "11",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-05-11T07:05:45.844820Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "binaryOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/binaryOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "binaryPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/binaryPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "binaryNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/binaryNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "binaryNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/binaryNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "binaryMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/binaryMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "binaryListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/binaryListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "binaryText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/binaryText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "binaryDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/binaryDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "binarySearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/binarySearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "other"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/binarySearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/binary",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/binary/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/binary",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "binary"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/binary/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/binary/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/binary/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/permissionUnitGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "permissionUnit"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T13:00:07.112000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:37.175000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:37:18.103000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:31:33.506000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:17:15.603292Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:17:21.534396Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:55.387625Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:52:27.959384Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "8",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:07.161138Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionUnitOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionUnitPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/permissionUnitNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionUnitNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionUnitMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionUnitListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/permissionUnitText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/permissionUnitDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/permissionUnitSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "permissionUnitAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/permissionUnitAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "permission"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/permissionUnitSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionUnit",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionUnit/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionUnit",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "permissionUnit"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/permissionUnit/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/permissionUnit/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/permissionUnit/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/systemSecretGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "systemSecret"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-04-27T09:21:32.698872Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T14:36:44.760726Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:04.466022Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2022-04-27T09:21:32.698872Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemSecretOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemSecretPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/systemSecretGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemSecretNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemSecretMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemSecretListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/systemSecretText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/systemSecretDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "textSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/textSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "systemSecretAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemSecretAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "permission"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/textSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/systemSecret",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/systemSecret/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/systemSecret",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "systemSecret"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "textGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/textGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "text"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T10:41:14.404000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:50:03.345000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:34:35.461000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:29:24.679000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:18:48.272163Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:41.267068Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:50.961961Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:51:09.361215Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "8",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:04.829580Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "textOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "textPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "textNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/textNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "textNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "textMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "textListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "true"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "textText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/textText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "textDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/textDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "textSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/textSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "metadata"
								},
								{
									"repeatId": "1",
									"name": "groupOfRecordType",
									"value": "presentation"
								},
								{
									"repeatId": "2",
									"name": "groupOfRecordType",
									"value": "systemConfiguration"
								},
								{
									"name": "public",
									"value": "true"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/textSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "text"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/text/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/validationOrderGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "validationOrder"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-02-15T05:49:22.540000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:17:07.609141Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:55.988884Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:52:39.908490Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:07.397290Z"
												}
											],
											"name": "updated"
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
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2019-02-15T05:49:22.540000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationOrderOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationOrderPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/validationOrderNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationOrderNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationOrderMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationOrderListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/validationOrderText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/validationOrderDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/validationOrderSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "validationOrderAutocompletePGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/validationOrderAutocompletePGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "other"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/validationOrderSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationOrder",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationOrder/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationOrder",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "validationOrder"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/validationOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationOrder/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				},
				{
					"record": {
						"data": {
							"children": [
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "userGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/userGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "metadataId"
								},
								{
									"name": "abstract",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "id",
											"value": "user"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "type"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "validationType"
												},
												{
													"name": "linkedRecordId",
													"value": "recordType"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "validationType"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "system"
												},
												{
													"name": "linkedRecordId",
													"value": "cora"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "dataDivider"
										},
										{
											"repeatId": "0",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-03-15T13:02:36.750000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "1",
											"children": [
												{
													"children": [
														{
															"name": "linkedRecordType",
															"value": "user"
														},
														{
															"name": "linkedRecordId",
															"value": "12345"
														}
													],
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2018-09-10T19:51:46.784000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "2",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:22:14.543000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "3",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-21T10:37:33.843000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "4",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2019-01-23T13:32:03.577000Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "5",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2022-03-24T15:13:46.316146Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "6",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:39:44.861298Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "7",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T14:40:07.067967Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "8",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-01T15:55:03.059610Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "9",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-03-02T15:33:12.876665Z"
												}
											],
											"name": "updated"
										},
										{
											"repeatId": "10",
											"children": [
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
													"actionLinks": {
														"read": {
															"requestMethod": "GET",
															"rel": "read",
															"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
															"accept": "application/vnd.uub.record+json"
														}
													},
													"name": "updatedBy"
												},
												{
													"name": "tsUpdated",
													"value": "2023-05-05T13:52:01.731601Z"
												}
											],
											"name": "updated"
										},
										{
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "12345"
												}
											],
											"actionLinks": {
												"read": {
													"requestMethod": "GET",
													"rel": "read",
													"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
													"accept": "application/vnd.uub.record+json"
												}
											},
											"name": "createdBy"
										},
										{
											"name": "tsCreated",
											"value": "2017-10-01T00:00:00.000000Z"
										}
									],
									"name": "recordInfo"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "userOutputPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/userOutputPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "userPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/userPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "presentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "userNewGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/userNewGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newMetadataId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "userNewPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/userNewPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "newPresentationFormId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "userMenuPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/userMenuPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "menuPresentationViewId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "userListPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/userListPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "listPresentationViewId"
								},
								{
									"name": "userSuppliedId",
									"value": "false"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "userText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/userText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "textId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "text"
										},
										{
											"name": "linkedRecordId",
											"value": "userDefText"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/userDefText",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "defTextId"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "search"
										},
										{
											"name": "linkedRecordId",
											"value": "userSearch"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/userSearch",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "search"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "userFilterPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/userFilterPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "autocompletePresentationView"
								},
								{
									"repeatId": "0",
									"name": "groupOfRecordType",
									"value": "permission"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "metadata"
										},
										{
											"name": "linkedRecordId",
											"value": "userFilterGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/userFilterGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "filter"
								},
								{
									"children": [
										{
											"name": "linkedRecordType",
											"value": "presentation"
										},
										{
											"name": "linkedRecordId",
											"value": "userFilterPGroup"
										}
									],
									"actionLinks": {
										"read": {
											"requestMethod": "GET",
											"rel": "read",
											"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/userFilterPGroup",
											"accept": "application/vnd.uub.record+json"
										}
									},
									"name": "filterPresentation"
								},
								{
									"name": "public",
									"value": "false"
								},
								{
									"name": "storeInArchive",
									"value": "false"
								}
							],
							"name": "recordType"
						},
						"actionLinks": {
							"search": {
								"requestMethod": "GET",
								"rel": "search",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/userSearch",
								"accept": "application/vnd.uub.recordList+json"
							},
							"read": {
								"requestMethod": "GET",
								"rel": "read",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/user",
								"accept": "application/vnd.uub.record+json"
							},
							"read_incoming_links": {
								"requestMethod": "GET",
								"rel": "read_incoming_links",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/user/incomingLinks",
								"accept": "application/vnd.uub.recordList+json"
							},
							"update": {
								"requestMethod": "POST",
								"rel": "update",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/user",
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
													"value": "recordType"
												}
											],
											"name": "recordType"
										},
										{
											"name": "recordId",
											"value": "user"
										},
										{
											"name": "type",
											"value": "index"
										}
									],
									"name": "workOrder"
								},
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							},
							"create": {
								"requestMethod": "POST",
								"rel": "create",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/",
								"accept": "application/vnd.uub.record+json"
							},
							"batch_index": {
								"requestMethod": "POST",
								"rel": "batch_index",
								"contentType": "application/vnd.uub.record+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/user/",
								"accept": "application/vnd.uub.record+json"
							},
							"list": {
								"requestMethod": "GET",
								"rel": "list",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/",
								"accept": "application/vnd.uub.recordList+json"
							},
							"validate": {
								"requestMethod": "POST",
								"rel": "validate",
								"contentType": "application/vnd.uub.workorder+json",
								"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
								"accept": "application/vnd.uub.record+json"
							}
						}
					}
				}
			],
			"totalNo": "24",
			"containDataOfType": "recordType",
			"toNo": "24"
		}
	};
	coraTest.recordTypeBrokenList = {
		"dataList": {
			"fromNo": "1",
			"data": [{
				"record": {
					"dataBROKEN": {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "presentationVar"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "recordType"
											}
										],
										"name": "type"
									},
									{
										"name": "createdBy",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "user"
											},
											{
												"name": "linkedRecordId",
												"value": "userid"
											}
										]
									},
									{
										"name": "updatedBy",
										"value": "userId"
									},
									{
										"children": [{
											"name": "linkedRecordType",
											"value": "system"
										}, {
											"name": "linkedRecordId",
											"value": "cora"
										}],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "http://localhost:8080/therest/rest/record/system/cora",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "dataDivider"
									}],
								"name": "recordInfo"
							}, {
								"name": "metadataId",
								"children": [{
									"name": "linkedRecordType",
									"value": "metadataGroup"
								}, {
									"name": "linkedRecordId",
									"value": "presentationVarGroup"
								}]
							}, {
								"name": "presentationViewId",
								"children": [{
									"name": "linkedRecordType",
									"value": "presentationGroup"
								}, {
									"name": "linkedRecordId",
									"value": "presentationVarViewPGroup"
								}]
							}, {
								"name": "presentationFormId",
								"children": [{
									"name": "linkedRecordType",
									"value": "presentationGroup"
								}, {
									"name": "linkedRecordId",
									"value": "presentationVarFormPGroup"
								}]
							}, {
								"name": "newMetadataId",
								"children": [{
									"name": "linkedRecordType",
									"value": "metadataGroup"
								}, {
									"name": "linkedRecordId",
									"value": "presentationVarNewGroup"
								}]
							}, {
								"name": "newPresentationFormId",
								"children": [{
									"name": "linkedRecordType",
									"value": "presentationGroup"
								}, {
									"name": "linkedRecordId",
									"value": "presentationVarFormNewPGroup"
								}]
							}, {
								"name": "menuPresentationViewId",
								"children": [{
									"name": "linkedRecordType",
									"value": "presentationGroup"
								}, {
									"name": "linkedRecordId",
									"value": "presentationVarMenuPGroup"
								}]
							}, {
								"name": "listPresentationViewId",
								"children": [{
									"name": "linkedRecordType",
									"value": "presentationGroup"
								}, {
									"name": "linkedRecordId",
									"value": "presentationVarListPGroup"
								}]
							}, {
								"name": "search",
								"children": [{
									"name": "linkedRecordType",
									"value": "search"
								}, {
									"name": "linkedRecordId",
									"value": "presentationVarSearch"
								}]
							}, {
								"name": "userSuppliedId",
								"value": "true"
							}, {
								"name": "selfPresentationViewId",
								"value": "presentationVarViewSelfPGroup"
							}, {
								"name": "abstract",
								"value": "false"
							}, {
								"name": "parentId",
								"children": [{
									"name": "linkedRecordType",
									"value": "recordType"
								}, {
									"name": "linkedRecordId",
									"value": "presentation"
								}]
							}],
						"name": "recordType"
					},
					"actionLinks": {
						"search": {
							"requestMethod": "GET",
							"rel": "search",
							"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
							"accept": "application/vnd.uub.recordList+json"
						},
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
							"accept": "application/vnd.uub.record+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
							"accept": "application/vnd.uub.record+json"
						},
						"create": {
							"requestMethod": "POST",
							"rel": "create",
							"contentType": "application/vnd.uub.record+json",
							"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
							"accept": "application/vnd.uub.record+json"
						},
						"list": {
							"requestMethod": "GET",
							"rel": "list",
							"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
							"accept": "application/vnd.uub.recordList+json"
						},
						"delete": {
							"requestMethod": "DELETE",
							"rel": "delete",
							"url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar"
						}
					}
				}
			}],
			"totalNo": "15",
			"containDataOfType": "recordType",
			"toNo": "15"
		}
	};
	return coraTest;
}(CORATEST || {}));