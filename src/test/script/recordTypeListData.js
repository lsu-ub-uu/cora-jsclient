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
		"dataList" : {
			"fromNo" : "1",
			"data" : [
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationVar"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "presentationVarViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentation"
											} ]
										},{
						                      "name": "groupOfRecordType",
						                      "value": "presentation",
						                      "repeatId": "1"
						                } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadata"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "metadataViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "true"
										},{
						                    "name": "groupOfRecordType",
						                    "value": "metadata",
						                    "repeatId": "0"
						                  } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationSurroundingContainer"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationSurroundingContainerGroup"
											} ]
										},
										{
											"name" : "presentationViewId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationSurroundingContainerViewPGroup"
													} ]
										},
										{
											"name" : "presentationFormId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationSurroundingContainerFormPGroup"
													} ]
										},
										{
											"name" : "newMetadataId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "metadataGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationSurroundingContainerNewGroup"
													} ]
										},
										{
											"name" : "newPresentationFormId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationSurroundingContainerFormNewPGroup"
													} ]
										},
										{
											"name" : "menuPresentationViewId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationSurroundingContainerMenuPGroup"
													} ]
										},
										{
											"name" : "listPresentationViewId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationSurroundingContainerListPGroup"
													} ]
										},
										{
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										},
										{
											"name" : "userSuppliedId",
											"value" : "true"
										},
										{
											"name" : "selfPresentationViewId",
											"value" : "presentationSurroundingContainerViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentation"
											} ]
										},{
						                      "name": "groupOfRecordType",
						                      "value": "presentation",
						                      "repeatId": "1"
						                } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "textSystemOne"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textSystemOneGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textSystemOneViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textSystemOneFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textSystemOneNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textSystemOneFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textSystemOneMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textSystemOneListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "textSystemOneViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "text"
											} ]
										},{
						                    "name": "groupOfRecordType",
						                    "value": "metadata",
						                    "repeatId": "0"
						                  },{
						                      "name": "groupOfRecordType",
						                      "value": "presentation",
						                      "repeatId": "1"
						                    },{
						                        "name": "groupOfRecordType",
						                        "value": "systemConfiguration",
						                        "repeatId": "2"
						                } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "recordType"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "recordTypeGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "recordTypeViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "recordTypeFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "recordTypeNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "recordTypeFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "recordTypeMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "recordTypeListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "recordTypeViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										},{
						                    "name": "groupOfRecordType",
						                    "value": "metadata",
						                    "repeatId": "0"
						                  }],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataGroup"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroupGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroupViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroupFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroupNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroupFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroupMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroupListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "metadataGroupViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadata"
											} ]
										} ,{
										"name": "groupOfRecordType",
										"value": "metadata",
										"repeatId": "0"
									}],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataCollectionItem"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionItemGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionItemViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionItemFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionItemNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionItemFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionItemMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionItemListPGroup"
											} ]
										}, {
										      "name": "textId",
										      "children": [
										        {
										          "name": "linkedRecordType",
										          "value": "coraText"
										        },
										        {
										          "name": "linkedRecordId",
										          "value": "metadataCollectionItemText"
										        }
										      ]
										    },{
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "metadataCollectionItemViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadata"
											} ]
										},{
						                    "name": "groupOfRecordType",
						                    "value": "metadata",
						                    "repeatId": "0"
						                  } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentation"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "presentationViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "true"
										},{
						                      "name": "groupOfRecordType",
						                      "value": "presentation",
						                      "repeatId": "1"
						                    } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentation",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentation",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentation"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataRecordLink"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataRecordLinkGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataRecordLinkViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataRecordLinkFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataRecordLinkNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataRecordLinkFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataRecordLinkMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataRecordLinkListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "metadataRecordLinkViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadata"
											} ]
										},{
						                    "name": "groupOfRecordType",
						                    "value": "metadata",
						                    "repeatId": "0"
						                  } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataTextVariable"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataTextVariableGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataTextVariableViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataTextVariableFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataTextVariableNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataTextVariableFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataTextVariableMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataTextVariableListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "metadataTextVariableViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadata"
											} ]
										},{
						                    "name": "groupOfRecordType",
						                    "value": "metadata",
						                    "repeatId": "0"
						                  } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationRepeatingContainer"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationRepeatingContainerGroup"
											} ]
										},
										{
											"name" : "presentationViewId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationRepeatingContainerViewPGroup"
													} ]
										},
										{
											"name" : "presentationFormId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationRepeatingContainerFormPGroup"
													} ]
										},
										{
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationRepeatingContainerNewGroup"
											} ]
										},
										{
											"name" : "newPresentationFormId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationRepeatingContainerFormNewPGroup"
													} ]
										},
										{
											"name" : "menuPresentationViewId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationRepeatingContainerMenuPGroup"
													} ]
										},
										{
											"name" : "listPresentationViewId",
											"children" : [
													{
														"name" : "linkedRecordType",
														"value" : "presentationGroup"
													},
													{
														"name" : "linkedRecordId",
														"value" : "presentationRepeatingContainerListPGroup"
													} ]
										},
										{
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										},
										{
											"name" : "userSuppliedId",
											"value" : "true"
										},
										{
											"name" : "selfPresentationViewId",
											"value" : "presentationRepeatingContainerViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentation"
											} ]
										},{
						                      "name": "groupOfRecordType",
						                      "value": "presentation",
						                      "repeatId": "1"
						                    } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataCollectionVariable"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionVariableGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionVariableViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionVariableFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionVariableNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionVariableFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionVariableMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionVariableListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "metadataCollectionVariableViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadata"
											} ]
										},{
						                    "name": "groupOfRecordType",
						                    "value": "metadata",
						                    "repeatId": "0"
						                  } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "text"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "textListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "textViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "true"
										},{
						                    "name": "groupOfRecordType",
						                    "value": "metadata",
						                    "repeatId": "0"
						                  },{
						                      "name": "groupOfRecordType",
						                      "value": "presentation",
						                      "repeatId": "1"
						                    },{
						                        "name": "groupOfRecordType",
						                        "value": "systemConfiguration",
						                        "repeatId": "2"
						                } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationGroup"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationGroupGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationGroupViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationGroupFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationGroupNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationGroupFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationGroupMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationGroupListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "presentationGroupViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentation"
											} ]
										},{
						                      "name": "groupOfRecordType",
						                      "value": "presentation",
						                      "repeatId": "1"
						                    } ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataItemCollection"
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
									      				"name" : "createdBy",
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
														"name" : "updatedBy",
														"value" : "userId"
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
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataItemCollectionGroup"
											} ]
										}, {
											"name" : "presentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataItemCollectionViewPGroup"
											} ]
										}, {
											"name" : "presentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataItemCollectionFormPGroup"
											} ]
										}, {
											"name" : "newMetadataId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataItemCollectionNewGroup"
											} ]
										}, {
											"name" : "newPresentationFormId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataItemCollectionFormNewPGroup"
											} ]
										}, {
											"name" : "menuPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataItemCollectionMenuPGroup"
											} ]
										}, {
											"name" : "listPresentationViewId",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataItemCollectionListPGroup"
											} ]
										}, {
											"name" : "search",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "search"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVarSearch"
											} ]
										}, {
											"name" : "userSuppliedId",
											"value" : "true"
										}, {
											"name" : "selfPresentationViewId",
											"value" : "metadataItemCollectionViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
						                    "name": "groupOfRecordType",
						                    "value": "other",
						                    "repeatId": "0"
						                  }],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection",
									"accept" : "application/vnd.uub.record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection"
								}
							}
						}
					} ],
			"totalNo" : "15",
			"containDataOfType" : "recordType",
			"toNo" : "15"
		}
	};
	coraTest.recordTypeBrokenList = {
		"dataList" : {
			"fromNo" : "1",
			"data" : [ {
				"record" : {
					"dataBROKEN" : {
						"children" : [
								{
									"children" : [
											{
												"name" : "id",
												"value" : "presentationVar"
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
							      				"name" : "createdBy",
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
												"name" : "updatedBy",
												"value" : "userId"
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
														"url" : "http://localhost:8080/therest/rest/record/system/cora",
														"accept" : "application/vnd.uub.record+json"
													}
												},
												"name" : "dataDivider"
											} ],
									"name" : "recordInfo"
								}, {
									"name" : "metadataId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "metadataGroup"
									}, {
										"name" : "linkedRecordId",
										"value" : "presentationVarGroup"
									} ]
								}, {
									"name" : "presentationViewId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "presentationGroup"
									}, {
										"name" : "linkedRecordId",
										"value" : "presentationVarViewPGroup"
									} ]
								}, {
									"name" : "presentationFormId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "presentationGroup"
									}, {
										"name" : "linkedRecordId",
										"value" : "presentationVarFormPGroup"
									} ]
								}, {
									"name" : "newMetadataId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "metadataGroup"
									}, {
										"name" : "linkedRecordId",
										"value" : "presentationVarNewGroup"
									} ]
								}, {
									"name" : "newPresentationFormId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "presentationGroup"
									}, {
										"name" : "linkedRecordId",
										"value" : "presentationVarFormNewPGroup"
									} ]
								}, {
									"name" : "menuPresentationViewId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "presentationGroup"
									}, {
										"name" : "linkedRecordId",
										"value" : "presentationVarMenuPGroup"
									} ]
								}, {
									"name" : "listPresentationViewId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "presentationGroup"
									}, {
										"name" : "linkedRecordId",
										"value" : "presentationVarListPGroup"
									} ]
								}, {
									"name" : "search",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "search"
									}, {
										"name" : "linkedRecordId",
										"value" : "presentationVarSearch"
									} ]
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "presentationVarViewSelfPGroup"
								}, {
									"name" : "abstract",
									"value" : "false"
								}, {
									"name" : "parentId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "recordType"
									}, {
										"name" : "linkedRecordId",
										"value" : "presentation"
									} ]
								} ],
						"name" : "recordType"
					},
					"actionLinks" : {
						"search" : {
							"requestMethod" : "GET",
							"rel" : "search",
							"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
							"accept" : "application/vnd.uub.recordList+json"
						},
						"read" : {
							"requestMethod" : "GET",
							"rel" : "read",
							"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
							"accept" : "application/vnd.uub.record+json"
						},
						"update" : {
							"requestMethod" : "POST",
							"rel" : "update",
							"contentType" : "application/vnd.uub.record+json",
							"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
							"accept" : "application/vnd.uub.record+json"
						},
						"create" : {
							"requestMethod" : "POST",
							"rel" : "create",
							"contentType" : "application/vnd.uub.record+json",
							"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
							"accept" : "application/vnd.uub.record+json"
						},
						"list" : {
							"requestMethod" : "GET",
							"rel" : "list",
							"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
							"accept" : "application/vnd.uub.recordList+json"
						},
						"delete" : {
							"requestMethod" : "DELETE",
							"rel" : "delete",
							"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar"
						}
					}
				}
			} ],
			"totalNo" : "15",
			"containDataOfType" : "recordType",
			"toNo" : "15"
		}
	};
	return coraTest;
}(CORATEST || {}));