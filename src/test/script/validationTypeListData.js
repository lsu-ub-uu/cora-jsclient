/*
 * Copyright 2023 Uppsala University Library
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
	
	coraTest.validationTypeList = {
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:59.915304Z"
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
												"value": "2023-03-02T15:29:02.274593Z"
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
												"value": "2023-04-17T09:04:45.592882Z"
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
										"value": "2023-03-02T09:01:59.915304Z"
									}
								],
								"name": "recordInfo"
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
										"value": "indexBatchJobValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/indexBatchJobValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "indexBatchJob"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/indexBatchJob",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/indexBatchJob",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/indexBatchJob/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/indexBatchJob",
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
												"value": "validationType"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:47.494547Z"
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
												"value": "2023-03-02T15:29:02.053112Z"
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
												"value": "2023-04-17T09:04:45.237835Z"
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
												"value": "2023-04-30T05:52:10.717525Z"
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
										"value": "2023-03-02T09:01:47.494547Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationVarText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationVarText",
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
										"value": "presentationVarValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationVarValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationVarNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationVarNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationVarGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationVarGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationVarNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationVarNewPGroup",
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
										"value": "presentationVarPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationVarPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "presentation"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationVar",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationVar/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationVar",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "presentationVar"
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
										"name": "id",
										"value": "collectPermissionTerm"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:47.898009Z"
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
												"value": "2023-03-02T15:29:02.522161Z"
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
												"value": "2023-04-17T09:04:45.811533Z"
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
												"value": "2023-04-30T05:52:11.301987Z"
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
										"value": "2023-03-02T09:01:47.898009Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "collectPermissionTermText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/collectPermissionTermText",
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
										"value": "collectPermissionTermValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/collectPermissionTermValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "collectPermissionTermNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/collectPermissionTermNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "collectPermissionTermGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/collectPermissionTermGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "collectPermissionTermNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectPermissionTermNewPGroup",
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
										"value": "collectPermissionTermPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectPermissionTermPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "collectTerm"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/collectTerm",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/collectPermissionTerm",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/collectPermissionTerm/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/collectPermissionTerm",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "collectPermissionTerm"
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
										"name": "id",
										"value": "presentationSurroundingContainer"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:48.312038Z"
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
												"value": "2023-03-02T15:29:02.750519Z"
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
												"value": "2023-04-17T09:04:46.116388Z"
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
												"value": "2023-04-30T05:52:11.463675Z"
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
										"value": "2023-03-02T09:01:48.312038Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationSurroundingContainerText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationSurroundingContainerText",
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
										"value": "presentationSurroundingContainerValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationSurroundingContainerValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationSurroundingContainerNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationSurroundingContainerNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationSurroundingContainerGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationSurroundingContainerGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationSurroundingContainerNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationSurroundingContainerNewPGroup",
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
										"value": "presentationSurroundingContainerPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationSurroundingContainerPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "presentation"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationSurroundingContainer",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationSurroundingContainer/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationSurroundingContainer",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "presentationSurroundingContainer"
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
										"name": "id",
										"value": "coraText"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:48.921120Z"
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
												"value": "2023-03-02T15:29:02.930554Z"
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
												"value": "2023-04-17T09:04:46.326252Z"
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
												"value": "2023-04-30T05:52:11.620715Z"
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
										"value": "2023-03-02T09:01:48.921120Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "coraTextText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/coraTextText",
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
										"value": "coraTextValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/coraTextValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "coraTextNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/coraTextNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "coraTextGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/coraTextGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "coraTextNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/coraTextNewPGroup",
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
										"value": "coraTextPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/coraTextPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "text"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/coraText",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/coraText/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/coraText",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "coraText"
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
										"name": "id",
										"value": "presentationNumberVar"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:49.362914Z"
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
												"value": "2023-03-02T15:29:03.155512Z"
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
												"value": "2023-04-17T09:04:46.571535Z"
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
												"value": "2023-04-30T05:52:11.774128Z"
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
										"value": "2023-03-02T09:01:49.362914Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationNumberVarText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationNumberVarText",
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
										"value": "presentationNumberVarValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationNumberVarValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationNumberVarNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationNumberVarNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationNumberVarGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationNumberVarGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationNumberVarNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationNumberVarNewPGroup",
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
										"value": "presentationNumberVarPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationNumberVarPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "presentation"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationNumberVar",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationNumberVar/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationNumberVar",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "presentationNumberVar"
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
										"name": "id",
										"value": "sound"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:49.849986Z"
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
												"value": "2023-03-02T15:29:03.381296Z"
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
												"value": "2023-04-17T09:04:46.831311Z"
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
												"value": "2023-04-30T05:52:11.949510Z"
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
										"value": "2023-03-02T09:01:49.849986Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "soundText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/soundText",
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
										"value": "soundValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/soundValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "soundNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/soundNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "soundGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/soundGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "soundNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/soundNewPGroup",
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
										"value": "soundPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/soundPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "binary"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/binary",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/sound",
							"accept": "application/vnd.uub.record+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/sound",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "sound"
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
						"delete": {
							"requestMethod": "DELETE",
							"rel": "delete",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/sound"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:50.212141Z"
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
												"value": "2023-03-02T15:29:03.622648Z"
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
												"value": "2023-04-17T09:04:47.066847Z"
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
										"value": "2023-03-02T09:01:50.212141Z"
									}
								],
								"name": "recordInfo"
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
										"value": "validationTypeValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/validationTypeValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "validationType"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "validationType"
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
										"name": "id",
										"value": "metadataGroup"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:00.379699Z"
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
												"value": "2023-03-02T15:29:03.841758Z"
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
												"value": "2023-04-17T09:04:47.303218Z"
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
												"value": "2023-04-30T05:52:12.125281Z"
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
										"value": "2023-03-02T09:02:00.379699Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataGroupText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataGroupText",
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
										"value": "metadataGroupValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataGroupValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataGroupNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataGroupNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataGroupGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataGroupGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataGroupNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataGroupNewPGroup",
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
										"value": "metadataGroupPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataGroupPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "metadata"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataGroup",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataGroup/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataGroup",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "metadataGroup"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:50.698671Z"
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
												"value": "2023-03-02T15:29:04.160689Z"
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
												"value": "2023-04-17T09:04:47.524029Z"
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
										"value": "2023-03-02T09:01:50.698671Z"
									}
								],
								"name": "recordInfo"
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
										"value": "loginUnitValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginUnitValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "loginUnit"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/loginUnit",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginUnit",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginUnit/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginUnit",
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
												"value": "validationType"
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
										"name": "id",
										"value": "presentationRecordLink"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:00.781140Z"
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
												"value": "2023-03-02T15:29:04.340463Z"
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
												"value": "2023-04-17T09:04:47.766739Z"
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
												"value": "2023-04-30T05:52:12.288227Z"
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
										"value": "2023-03-02T09:02:00.781140Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationRecordLinkText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationRecordLinkText",
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
										"value": "presentationRecordLinkValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationRecordLinkValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationRecordLinkNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationRecordLinkNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationRecordLinkGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationRecordLinkGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationRecordLinkNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationRecordLinkNewPGroup",
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
										"value": "presentationRecordLinkPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationRecordLinkPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "presentation"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationRecordLink",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationRecordLink/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationRecordLink",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "presentationRecordLink"
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
										"name": "id",
										"value": "systemOneUser"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:51.198437Z"
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
												"value": "2023-03-02T15:29:04.549177Z"
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
												"value": "2023-04-17T09:04:47.980553Z"
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
												"value": "2023-04-30T05:52:12.450633Z"
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
										"value": "2023-03-02T09:01:51.198437Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "systemOneUserText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/systemOneUserText",
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
										"value": "systemOneUserValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/systemOneUserValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "systemOneUserNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/systemOneUserNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "systemOneUserGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/systemOneUserGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "systemOneUserNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemOneUserNewPGroup",
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
										"value": "systemOneUserPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/systemOneUserPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "user"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/user",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/systemOneUser",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/systemOneUser/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/systemOneUser",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "systemOneUser"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:01.277747Z"
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
												"value": "2023-03-02T15:29:04.777366Z"
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
												"value": "2023-04-17T09:04:48.292674Z"
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
										"value": "2023-03-02T09:02:01.277747Z"
									}
								],
								"name": "recordInfo"
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
										"value": "demoValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/demoValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "demo"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/demo",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/demo",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/demo/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/demo",
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
												"value": "validationType"
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
										"name": "id",
										"value": "genericCollectionItem"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:01.796877Z"
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
												"value": "2023-03-02T15:29:04.991194Z"
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
												"value": "2023-04-17T09:04:48.540310Z"
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
												"value": "2023-04-30T05:52:12.587693Z"
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
										"value": "2023-03-02T09:02:01.796877Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "genericCollectionItemText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/genericCollectionItemText",
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
										"value": "genericCollectionItemValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/genericCollectionItemValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "genericCollectionItemNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/genericCollectionItemNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "genericCollectionItemGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/genericCollectionItemGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "genericCollectionItemNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/genericCollectionItemNewPGroup",
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
										"value": "genericCollectionItemPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/genericCollectionItemPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "metadata"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/genericCollectionItem",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/genericCollectionItem/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/genericCollectionItem",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "genericCollectionItem"
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
										"name": "id",
										"value": "metadataNumberVariable"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:02.296774Z"
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
												"value": "2023-03-02T15:29:05.172422Z"
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
												"value": "2023-04-17T09:04:48.785923Z"
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
												"value": "2023-04-30T05:52:12.714979Z"
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
										"value": "2023-03-02T09:02:02.296774Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataNumberVariableText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataNumberVariableText",
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
										"value": "metadataNumberVariableValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataNumberVariableValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataNumberVariableNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataNumberVariableNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataNumberVariableGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataNumberVariableGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataNumberVariableNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataNumberVariableNewPGroup",
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
										"value": "metadataNumberVariablePGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataNumberVariablePGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "metadata"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataNumberVariable",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataNumberVariable/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataNumberVariable",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "metadataNumberVariable"
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
										"name": "id",
										"value": "metadataResourceLink"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:02.791707Z"
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
												"value": "2023-03-02T15:29:05.393442Z"
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
												"value": "2023-04-17T09:04:49.026287Z"
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
												"value": "2023-04-30T05:52:12.842118Z"
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
										"value": "2023-03-02T09:02:02.791707Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataResourceLinkText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataResourceLinkText",
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
										"value": "metadataResourceLinkValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataResourceLinkValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataResourceLinkNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataResourceLinkNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataResourceLinkGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataResourceLinkGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataResourceLinkNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataResourceLinkNewPGroup",
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
										"value": "metadataResourceLinkPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataResourceLinkPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "metadata"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataResourceLink",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataResourceLink/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataResourceLink",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "metadataResourceLink"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:03.331773Z"
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
												"value": "2023-03-02T15:29:05.573020Z"
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
												"value": "2023-04-17T09:04:49.253987Z"
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
										"value": "2023-03-02T09:02:03.331773Z"
									}
								],
								"name": "recordInfo"
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
										"value": "exampleValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/exampleValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "example"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/example",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/example",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/example/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/example",
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
												"value": "validationType"
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
										"name": "id",
										"value": "guiElementLink"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:03.828542Z"
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
												"value": "2023-03-02T15:29:06.101921Z"
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
												"value": "2023-04-17T09:04:49.701020Z"
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
												"value": "2023-04-30T05:52:13.103198Z"
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
										"value": "2023-03-02T09:02:03.828542Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "guiElementLinkText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/guiElementLinkText",
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
										"value": "guiElementLinkValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/guiElementLinkValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "guiElementLinkNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/guiElementLinkNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "guiElementLinkGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/guiElementLinkGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "guiElementLinkNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/guiElementLinkNewPGroup",
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
										"value": "guiElementLinkPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/guiElementLinkPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "guiElement"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/guiElement",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/guiElementLink",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/guiElementLink/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/guiElementLink",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "guiElementLink"
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
										"name": "id",
										"value": "loginWebRedirect"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:04.339124Z"
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
												"value": "2023-03-02T15:29:06.322205Z"
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
												"value": "2023-04-17T09:04:49.881547Z"
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
												"value": "2023-04-30T05:52:13.244952Z"
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
										"value": "2023-03-02T09:02:04.339124Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "loginWebRedirectText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginWebRedirectText",
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
										"value": "loginWebRedirectValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginWebRedirectValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "loginWebRedirectNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginWebRedirectNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "loginWebRedirectGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginWebRedirectGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "loginWebRedirectNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginWebRedirectNewPGroup",
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
										"value": "loginWebRedirectPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginWebRedirectPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "login"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/login",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginWebRedirect",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginWebRedirect/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginWebRedirect",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "loginWebRedirect"
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
										"name": "id",
										"value": "collectStorageTerm"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:51.663745Z"
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
												"value": "2023-03-02T15:29:05.771848Z"
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
												"value": "2023-04-17T09:04:49.501528Z"
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
												"value": "2023-04-30T05:52:12.983166Z"
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
										"value": "2023-03-02T09:01:51.663745Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "collectStorageTermText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/collectStorageTermText",
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
										"value": "collectStorageTermValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/collectStorageTermValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "collectStorageTermNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/collectStorageTermNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "collectStorageTermGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/collectStorageTermGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "collectStorageTermNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectStorageTermNewPGroup",
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
										"value": "collectStorageTermPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectStorageTermPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "collectTerm"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/collectTerm",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/collectStorageTerm",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/collectStorageTerm/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/collectStorageTerm",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "collectStorageTerm"
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
										"name": "id",
										"value": "loginLDAP"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:52.138921Z"
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
												"value": "2023-03-02T15:29:06.566292Z"
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
												"value": "2023-04-17T09:04:50.013680Z"
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
												"value": "2023-04-30T05:52:13.420936Z"
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
										"value": "2023-03-02T09:01:52.138921Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "loginLDAPText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginLDAPText",
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
										"value": "loginLDAPValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginLDAPValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "loginLDAPNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginLDAPNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "loginLDAPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginLDAPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "loginLDAPNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginLDAPNewPGroup",
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
										"value": "loginLDAPPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginLDAPPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "login"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/login",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginLDAP",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginLDAP/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginLDAP",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "loginLDAP"
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
										"name": "id",
										"value": "metadataRecordLink"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:52.609955Z"
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
												"value": "2023-03-02T15:29:06.744308Z"
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
												"value": "2023-04-17T09:04:50.302347Z"
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
												"value": "2023-04-30T05:52:13.543797Z"
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
										"value": "2023-03-02T09:01:52.609955Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataRecordLinkText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataRecordLinkText",
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
										"value": "metadataRecordLinkValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataRecordLinkValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataRecordLinkNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataRecordLinkNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataRecordLinkGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataRecordLinkGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataRecordLinkNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataRecordLinkNewPGroup",
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
										"value": "metadataRecordLinkPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataRecordLinkPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "metadata"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataRecordLink",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataRecordLink/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataRecordLink",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "metadataRecordLink"
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
										"name": "id",
										"value": "presentationCollectionVar"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:53.129167Z"
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
												"value": "2023-03-02T15:29:06.923273Z"
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
												"value": "2023-04-17T09:04:50.550911Z"
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
												"value": "2023-04-30T05:52:13.682301Z"
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
										"value": "2023-03-02T09:01:53.129167Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationCollectionVarText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationCollectionVarText",
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
										"value": "presentationCollectionVarValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationCollectionVarValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationCollectionVarNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationCollectionVarNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationCollectionVarGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationCollectionVarGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationCollectionVarNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationCollectionVarNewPGroup",
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
										"value": "presentationCollectionVarPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationCollectionVarPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "presentation"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationCollectionVar",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationCollectionVar/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationCollectionVar",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "presentationCollectionVar"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:04.812734Z"
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
												"value": "2023-03-02T15:29:07.096599Z"
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
												"value": "2023-04-17T09:04:50.777725Z"
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
										"value": "2023-03-02T09:02:04.812734Z"
									}
								],
								"name": "recordInfo"
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
										"value": "searchValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/searchValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "search"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/search",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/search",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/search/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/search",
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
												"value": "validationType"
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
										"name": "id",
										"value": "presentationResourceLink"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:05.213391Z"
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
												"value": "2023-03-02T15:29:07.565994Z"
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
												"value": "2023-04-17T09:04:51.247201Z"
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
												"value": "2023-04-30T05:52:13.828675Z"
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
										"value": "2023-03-02T09:02:05.213391Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationResourceLinkText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationResourceLinkText",
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
										"value": "presentationResourceLinkValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationResourceLinkValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationResourceLinkNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationResourceLinkNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationResourceLinkGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationResourceLinkGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationResourceLinkNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationResourceLinkNewPGroup",
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
										"value": "presentationResourceLinkPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationResourceLinkPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "presentation"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationResourceLink",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationResourceLink/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationResourceLink",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "presentationResourceLink"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:53.598613Z"
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
												"value": "2023-03-02T15:29:07.331392Z"
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
												"value": "2023-04-17T09:04:50.993551Z"
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
										"value": "2023-03-02T09:01:53.598613Z"
									}
								],
								"name": "recordInfo"
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
										"value": "searchTermValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/searchTermValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "searchTerm"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/searchTerm",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/searchTerm",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/searchTerm/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/searchTerm",
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
												"value": "validationType"
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
										"name": "id",
										"value": "collectIndexTerm"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:05.732806Z"
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
												"value": "2023-03-02T15:29:07.792113Z"
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
												"value": "2023-04-17T09:04:51.496110Z"
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
												"value": "2023-04-30T05:52:13.971251Z"
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
										"value": "2023-03-02T09:02:05.732806Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "collectIndexTermText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/collectIndexTermText",
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
										"value": "collectIndexTermValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/collectIndexTermValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "collectIndexTermNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/collectIndexTermNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "collectIndexTermGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/collectIndexTermGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "collectIndexTermNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectIndexTermNewPGroup",
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
										"value": "collectIndexTermPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/collectIndexTermPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "collectTerm"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/collectTerm",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/collectIndexTerm",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/collectIndexTerm/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/collectIndexTerm",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "collectIndexTerm"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:54.055803Z"
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
												"value": "2023-03-02T15:29:07.982543Z"
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
												"value": "2023-04-17T09:04:51.730963Z"
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
										"value": "2023-03-02T09:01:54.055803Z"
									}
								],
								"name": "recordInfo"
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
										"value": "systemSecretValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/systemSecretValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "systemSecret"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/systemSecret",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/systemSecret",
							"accept": "application/vnd.uub.record+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/systemSecret",
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
												"value": "validationType"
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
						},
						"delete": {
							"requestMethod": "DELETE",
							"rel": "delete",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/systemSecret"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:54.452249Z"
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
												"value": "2023-03-02T15:29:08.201746Z"
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
												"value": "2023-04-17T09:04:51.960410Z"
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
										"value": "2023-03-02T09:01:54.452249Z"
									}
								],
								"name": "recordInfo"
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
										"value": "workOrderValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/workOrderValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "workOrder"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/workOrder",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/workOrder",
							"accept": "application/vnd.uub.record+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/workOrder",
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
												"value": "validationType"
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
						"delete": {
							"requestMethod": "DELETE",
							"rel": "delete",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/workOrder"
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
										"name": "id",
										"value": "image"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:54.806366Z"
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
												"value": "2023-03-02T15:29:08.419359Z"
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
												"value": "2023-04-17T09:04:52.165200Z"
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
												"value": "2023-04-30T05:52:14.105337Z"
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
										"value": "2023-03-02T09:01:54.806366Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "imageText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/imageText",
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
										"value": "imageValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/imageValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "imageNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/imageNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "imageGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/imageGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "imageNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/imageNewPGroup",
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
										"value": "imagePGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/imagePGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "binary"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/binary",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/image",
							"accept": "application/vnd.uub.record+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/image",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "image"
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
						"delete": {
							"requestMethod": "DELETE",
							"rel": "delete",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/image"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:55.274428Z"
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
												"value": "2023-03-02T15:29:08.648127Z"
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
												"value": "2023-04-17T09:04:52.463335Z"
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
										"value": "2023-03-02T09:01:55.274428Z"
									}
								],
								"name": "recordInfo"
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
										"value": "permissionRoleValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/permissionRoleValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "permissionRole"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionRole",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/permissionRole",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/permissionRole/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/permissionRole",
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
												"value": "validationType"
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
										"name": "id",
										"value": "textSystemOne"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:55.743604Z"
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
												"value": "2023-03-02T15:29:08.878503Z"
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
												"value": "2023-04-17T09:04:52.724615Z"
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
												"value": "2023-04-30T05:52:14.260418Z"
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
										"value": "2023-03-02T09:01:55.743604Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "textSystemOneText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/textSystemOneText",
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
										"value": "textSystemOneValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/textSystemOneValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "textSystemOneNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/textSystemOneNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "textSystemOneGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/textSystemOneGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "textSystemOneNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textSystemOneNewPGroup",
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
										"value": "textSystemOnePGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textSystemOnePGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "text"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/textSystemOne",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/textSystemOne/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/textSystemOne",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "textSystemOne"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:06.162058Z"
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
												"value": "2023-03-02T15:29:09.319767Z"
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
												"value": "2023-04-17T09:04:53.229486Z"
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
										"value": "2023-03-02T09:02:06.162058Z"
									}
								],
								"name": "recordInfo"
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
										"value": "recordTypeValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/recordTypeValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
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
												"value": "validationType"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:56.137521Z"
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
												"value": "2023-03-02T15:29:09.141348Z"
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
												"value": "2023-04-17T09:04:52.977560Z"
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
										"value": "2023-03-02T09:01:56.137521Z"
									}
								],
								"name": "recordInfo"
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
										"value": "appTokenValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/appTokenValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "appToken"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/appToken",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/appToken",
							"accept": "application/vnd.uub.record+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/appToken",
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
												"value": "validationType"
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
						"delete": {
							"requestMethod": "DELETE",
							"rel": "delete",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/appToken"
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
										"name": "id",
										"value": "loginToken"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:56.597496Z"
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
												"value": "2023-03-02T15:29:09.499674Z"
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
												"value": "2023-04-17T09:04:53.481171Z"
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
												"value": "2023-04-30T05:52:14.414143Z"
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
										"value": "2023-03-02T09:01:56.597496Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "loginTokenText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginTokenText",
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
										"value": "loginTokenValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/loginTokenValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "loginTokenNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginTokenNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "loginTokenGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/loginTokenGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "loginTokenNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginTokenNewPGroup",
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
										"value": "loginTokenPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/loginTokenPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "login"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/login",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginToken",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginToken/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/loginToken",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "loginToken"
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
										"name": "id",
										"value": "coraUser"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:06.610650Z"
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
												"value": "2023-03-02T15:29:09.705684Z"
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
												"value": "2023-04-17T09:04:53.703124Z"
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
												"value": "2023-04-30T05:52:14.535371Z"
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
										"value": "2023-03-02T09:02:06.610650Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "coraUserText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/coraUserText",
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
										"value": "coraUserValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/coraUserValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "coraUserNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/coraUserNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "coraUserGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/coraUserGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "coraUserNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/coraUserNewPGroup",
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
										"value": "coraUserPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/coraUserPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "user"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/user",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/coraUser",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/coraUser/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/coraUser",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "coraUser"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:57.158409Z"
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
												"value": "2023-03-02T15:29:10.035402Z"
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
												"value": "2023-04-17T09:04:53.920804Z"
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
										"value": "2023-03-02T09:01:57.158409Z"
									}
								],
								"name": "recordInfo"
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
										"value": "permissionRuleValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/permissionRuleValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "permissionRule"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionRule",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/permissionRule",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/permissionRule/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/permissionRule",
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
												"value": "validationType"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:57.632603Z"
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
												"value": "2023-03-02T15:29:10.262618Z"
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
												"value": "2023-04-17T09:04:54.122083Z"
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
										"value": "2023-03-02T09:01:57.632603Z"
									}
								],
								"name": "recordInfo"
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
										"value": "systemValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/systemValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "system"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/system",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/system",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/system/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/system",
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
												"value": "validationType"
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
										"name": "id",
										"value": "metadataTextVariable"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:58.102865Z"
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
												"value": "2023-03-02T15:29:10.458913Z"
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
												"value": "2023-04-17T09:04:54.343359Z"
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
												"value": "2023-04-30T05:52:14.650937Z"
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
										"value": "2023-03-02T09:01:58.102865Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataTextVariableText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataTextVariableText",
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
										"value": "metadataTextVariableValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataTextVariableValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataTextVariableNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataTextVariableNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataTextVariableGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataTextVariableGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataTextVariableNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataTextVariableNewPGroup",
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
										"value": "metadataTextVariablePGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataTextVariablePGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "metadata"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataTextVariable",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataTextVariable/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataTextVariable",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "metadataTextVariable"
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
										"name": "id",
										"value": "presentationRepeatingContainer"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:07.053072Z"
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
												"value": "2023-03-02T15:29:10.701598Z"
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
												"value": "2023-04-17T09:04:54.704189Z"
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
												"value": "2023-04-30T05:52:14.771115Z"
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
										"value": "2023-03-02T09:02:07.053072Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationRepeatingContainerText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationRepeatingContainerText",
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
										"value": "presentationRepeatingContainerValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationRepeatingContainerValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationRepeatingContainerNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationRepeatingContainerNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationRepeatingContainerGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationRepeatingContainerGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationRepeatingContainerNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationRepeatingContainerNewPGroup",
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
										"value": "presentationRepeatingContainerPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationRepeatingContainerPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "presentation"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationRepeatingContainer",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationRepeatingContainer/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationRepeatingContainer",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "presentationRepeatingContainer"
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
										"name": "id",
										"value": "metadataCollectionVariable"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:07.604429Z"
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
												"value": "2023-03-02T15:29:10.932366Z"
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
												"value": "2023-04-17T09:04:54.896927Z"
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
												"value": "2023-04-30T05:52:14.899785Z"
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
										"value": "2023-03-02T09:02:07.604429Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataCollectionVariableText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataCollectionVariableText",
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
										"value": "metadataCollectionVariableValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataCollectionVariableValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataCollectionVariableNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataCollectionVariableNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataCollectionVariableGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataCollectionVariableGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataCollectionVariableNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataCollectionVariableNewPGroup",
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
										"value": "metadataCollectionVariablePGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataCollectionVariablePGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "metadata"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataCollectionVariable",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataCollectionVariable/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataCollectionVariable",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "metadataCollectionVariable"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:58.509836Z"
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
												"value": "2023-03-02T15:29:11.133536Z"
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
												"value": "2023-04-17T09:04:55.110068Z"
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
										"value": "2023-03-02T09:01:58.509836Z"
									}
								],
								"name": "recordInfo"
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
										"value": "permissionUnitValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/permissionUnitValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "permissionUnit"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/permissionUnit",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/permissionUnit",
							"accept": "application/vnd.uub.record+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/permissionUnit",
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
												"value": "validationType"
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
						"delete": {
							"requestMethod": "DELETE",
							"rel": "delete",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/permissionUnit"
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:58.968207Z"
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
												"value": "2023-03-02T15:29:11.356919Z"
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
												"value": "2023-04-17T09:04:55.363172Z"
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
										"value": "2023-03-02T09:01:58.968207Z"
									}
								],
								"name": "recordInfo"
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
										"value": "validationOrderValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/validationOrderValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
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
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "validationOrder"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationOrder",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationOrder",
							"accept": "application/vnd.uub.record+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationOrder",
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
												"value": "validationType"
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
						"delete": {
							"requestMethod": "DELETE",
							"rel": "delete",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationOrder"
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
										"name": "id",
										"value": "genericBinary"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:01:59.456194Z"
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
												"value": "2023-03-02T15:29:11.533789Z"
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
												"value": "2023-04-17T09:04:55.867959Z"
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
												"value": "2023-04-30T05:52:15.033251Z"
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
										"value": "2023-03-02T09:01:59.456194Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "genericBinaryText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/genericBinaryText",
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
										"value": "genericBinaryValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/genericBinaryValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "genericBinaryNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/genericBinaryNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "genericBinaryGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/genericBinaryGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "genericBinaryNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/genericBinaryNewPGroup",
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
										"value": "genericBinaryPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/genericBinaryPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "binary"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/binary",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/genericBinary",
							"accept": "application/vnd.uub.record+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/genericBinary",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "genericBinary"
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
						"delete": {
							"requestMethod": "DELETE",
							"rel": "delete",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/genericBinary"
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
										"name": "id",
										"value": "presentationGroup"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:08.054707Z"
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
												"value": "2023-03-02T15:29:11.722211Z"
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
												"value": "2023-04-17T09:04:55.614697Z"
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
												"value": "2023-04-30T05:52:15.173119Z"
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
										"value": "2023-03-02T09:02:08.054707Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationGroupText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationGroupText",
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
										"value": "presentationGroupValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/presentationGroupValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationGroupNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationGroupNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationGroupGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/presentationGroupGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "presentationGroupNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationGroupNewPGroup",
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
										"value": "presentationGroupPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/presentationGroupPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "presentation"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/presentation",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationGroup",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationGroup/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/presentationGroup",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "presentationGroup"
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
										"name": "id",
										"value": "metadataItemCollection"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/validationType",
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
												"value": "validationType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/validationType",
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
												"value": "2023-03-02T09:02:08.533180Z"
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
												"value": "2023-03-02T15:29:11.987062Z"
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
												"value": "2023-04-17T09:04:56.124894Z"
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
												"value": "2023-04-30T05:52:15.306616Z"
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
										"value": "2023-03-02T09:02:08.533180Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataItemCollectionText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataItemCollectionText",
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
										"value": "metadataItemCollectionValidationDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/metadataItemCollectionValidationDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataItemCollectionNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataItemCollectionNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataItemCollectionGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/metadataItemCollectionGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "metadataItemCollectionNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataItemCollectionNewPGroup",
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
										"value": "metadataItemCollectionPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/metadataItemCollectionPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "recordType"
									},
									{
										"name": "linkedRecordId",
										"value": "metadata"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/metadata",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "validatesRecordType"
							}
						],
						"name": "validationType"
					},
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataItemCollection",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataItemCollection/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/metadataItemCollection",
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
												"value": "validationType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "metadataItemCollection"
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
			}
		],
		"totalNo": "46",
		"containDataOfType": "validationType",
		"toNo": "46"
	}
};
	return coraTest;
}(CORATEST || {}));