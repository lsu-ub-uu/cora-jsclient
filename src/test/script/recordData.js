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
	coraTest.recordWithAllLinks = {
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
							"accept": "application/vnd.cora.record+json"
						}
					},
					"name": "metadataId"
				},{
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
									"accept": "application/vnd.cora.record+json"
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
									"accept": "application/vnd.cora.record+json"
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
									"accept": "application/vnd.cora.record+json"
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
											"accept": "application/vnd.cora.record+json"
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
											"accept": "application/vnd.cora.record+json"
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
									"accept": "application/vnd.cora.record+json"
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
							"accept": "application/vnd.cora.record+json"
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
							"accept": "application/vnd.cora.record+json"
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
							"accept": "application/vnd.cora.record+json"
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
							"accept": "application/vnd.cora.record+json"
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
							"accept": "application/vnd.cora.record+json"
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
							"accept": "application/vnd.cora.record+json"
						}
					},
					"name": "listPresentationViewId"
				},
				{
					"name": "idSource",
					"value": "userSupplied"
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
							"accept": "application/vnd.cora.record+json"
						}
					},
					"name": "textId"
				},
				{
					"children": [
						{
							"name": "linkedRecordType",
							"value": "textSystemOne"
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
							"accept": "application/vnd.cora.record+json"
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
							"accept": "application/vnd.cora.record+json"
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
				"accept": "application/vnd.cora.recordList+json"
			},
			"read": {
				"requestMethod": "GET",
				"rel": "read",
				"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
				"accept": "application/vnd.cora.record+json"
			},
			"read_incoming_links": {
				"requestMethod": "GET",
				"rel": "read_incoming_links",
				"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType/incomingLinks",
				"accept": "application/vnd.cora.recordList+json"
			},
			"update": {
				"requestMethod": "POST",
				"rel": "update",
				"contentType": "application/vnd.cora.record+json",
				"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
				"accept": "application/vnd.cora.record+json"
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
				"contentType": "application/vnd.cora.record+json",
				"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
				"accept": "application/vnd.cora.record+json"
			},
			"create": {
				"requestMethod": "POST",
				"rel": "create",
				"contentType": "application/vnd.cora.record+json",
				"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/",
				"accept": "application/vnd.cora.record+json"
			},
			"batch_index": {
				"requestMethod": "POST",
				"rel": "batch_index",
				"contentType": "application/vnd.cora.record+json",
				"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/recordType/",
				"accept": "application/vnd.cora.record+json"
			},
			"list": {
				"requestMethod": "GET",
				"rel": "list",
				"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/",
				"accept": "application/vnd.cora.recordList+json"
			},
			"validate": {
				"requestMethod": "POST",
				"rel": "validate",
				"contentType": "application/vnd.cora.workorder+json",
				"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
				"accept": "application/vnd.cora.record+json"
			},
			"delete": {
				"requestMethod": "DELETE",
				"rel": "delete",
				"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType"
			}
			
		}
	};
	coraTest.recordWithoutUpdateOrDeleteLink = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "svEnText"
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
	                "name": "type"
	            },{
							"children": [
								{
									"name": "linkedRecordType",
									"value": "validationType"
								},
								{
									"name": "linkedRecordId",
									"value": "textSystemOne"
								}
							],
							"actionLinks": {
								"read": {
									"requestMethod": "GET",
									"rel": "read",
									"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
									"accept": "application/vnd.cora.record+json"
								}
							},
							"name": "validationType"
						}, {
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
			              "url": "http://localhost:8080/therest/rest/record/system/cora",
			              "accept": "application/vnd.cora.record+json"
			            }
			          },
			          "name": "dataDivider"
			        } ],
				"name" : "recordInfo"
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "En text på både svenska och engelska"
				} ],
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				}
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "A text both in english and swedish"
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
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.cora.record+json"
			}
		}
	};
	coraTest.recordWithReadIncomingLinks= {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "svEnText"
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
							"name": "type"
					},{
							"children": [
								{
									"name": "linkedRecordType",
									"value": "validationType"
								},
								{
									"name": "linkedRecordId",
									"value": "textSystemOne"
								}
							],
							"actionLinks": {
								"read": {
									"requestMethod": "GET",
									"rel": "read",
									"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
									"accept": "application/vnd.cora.record+json"
								}
							},
							"name": "validationType"
						}, {
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
									"url": "http://localhost:8080/therest/rest/record/system/cora",
									"accept": "application/vnd.cora.record+json"
								}
							},
							"name": "dataDivider"
					} ],
					"name" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "text",
						"value" : "En text på både svenska och engelska"
					} ],
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					}
				}, {
					"children" : [ {
						"name" : "text",
						"value" : "A text both in english and swedish"
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
					"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
					"accept" : "application/vnd.cora.record+json"
				},
				"read_incoming_links":{
					"requestMethod" : "GET",
					"rel" : "read_incoming_links",
					"url" : "http://localhost:8080/therest/rest/record/coraText/textSystemOne/incomingLinks",
					"accept" : "application/vnd.cora.recordList+json"
				}
			}
	};
	coraTest.recordWithoutDeleteLink = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "svEnText"
				}, {
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
	                "name": "type"
	            },{
							"children": [
								{
									"name": "linkedRecordType",
									"value": "validationType"
								},
								{
									"name": "linkedRecordId",
									"value": "textSystemOne"
								}
							],
							"actionLinks": {
								"read": {
									"requestMethod": "GET",
									"rel": "read",
									"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
									"accept": "application/vnd.cora.record+json"
								}
							},
							"name": "validationType"
						}, {
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
			              "url": "http://localhost:8080/therest/rest/record/system/cora",
			              "accept": "application/vnd.cora.record+json"
			            }
			          },
			          "name": "dataDivider"
			        } ],
				"name" : "recordInfo"
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "En text på både svenska och engelska"
				} ],
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				}
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "A text both in english and swedish"
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
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/vnd.cora.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.cora.record+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.cora.record+json"
			}
		}
	};
	coraTest.recordWithIndexLink = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "svEnText"
					}, {
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
		                "name": "type"
		            },{
							"children": [
								{
									"name": "linkedRecordType",
									"value": "validationType"
								},
								{
									"name": "linkedRecordId",
									"value": "textSystemOne"
								}
							],
							"actionLinks": {
								"read": {
									"requestMethod": "GET",
									"rel": "read",
									"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
									"accept": "application/vnd.cora.record+json"
								}
							},
							"name": "validationType"
						}, {
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
				              "url": "http://localhost:8080/therest/rest/record/system/cora",
				              "accept": "application/vnd.cora.record+json"
				            }
				          },
				          "name": "dataDivider"
				        } ],
					"name" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "text",
						"value" : "En text på både svenska och engelska"
					} ],
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					}
				}, {
					"children" : [ {
						"name" : "text",
						"value" : "A text both in english and swedish"
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
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/vnd.cora.record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
					"accept" : "application/vnd.cora.record+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
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
			                  "value": "textSystemOne"
			                }
			              ],
			              "name": "recordType"
			            },
			            {
			              "name": "recordId",
			              "value": "svEnText"
			            },
			            {
			              "name": "type",
			              "value": "index"
			            }
			          ],
			          "name": "workOrder"
			        },
			        "contentType": "application/vnd.cora.record+json",
			        "url": "https://epc.ub.uu.se/therest/rest/record/workOrder/",
			        "accept": "application/vnd.cora.record+json"
			      }
			}
		};
	coraTest.recordWithoutIndexLink = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "svEnText"
				}, {
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
					"name": "type"
				},{
							"children": [
								{
									"name": "linkedRecordType",
									"value": "validationType"
								},
								{
									"name": "linkedRecordId",
									"value": "textSystemOne"
								}
							],
							"actionLinks": {
								"read": {
									"requestMethod": "GET",
									"rel": "read",
									"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
									"accept": "application/vnd.cora.record+json"
								}
							},
							"name": "validationType"
						}, {
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
								"url": "http://localhost:8080/therest/rest/record/system/cora",
								"accept": "application/vnd.cora.record+json"
							}
						},
						"name": "dataDivider"
					} ],
				"name" : "recordInfo"
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "En text på både svenska och engelska"
				} ],
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				}
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "A text both in english and swedish"
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
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/vnd.cora.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.cora.record+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.cora.record+json"
			}
		}
	};
	coraTest.recordWithMetadata = {
		"data" : {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textPart"
		}, {
			"children" : [ {
				"name" : "id",
				"value" : "textPartEnGroup"
			},  {
				"name" : "createdBy",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "user"
				}, {
					"name" : "linkedRecordId",
					"value" : "userId"
				} ]
			}, {
				"name" : "updatedBy",
				"value" : "userId"
			}, { 
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
					"name": "type"
				},{
							"children": [
								{
									"name": "linkedRecordType",
									"value": "validationType"
								},
								{
									"name": "linkedRecordId",
									"value": "textSystemOne"
								}
							],
							"actionLinks": {
								"read": {
									"requestMethod": "GET",
									"rel": "read",
									"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
									"accept": "application/vnd.cora.record+json"
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
								"url": "http://localhost:8080/therest/rest/record/system/cora",
								"accept": "application/vnd.cora.record+json"
							}
						},
						"name": "dataDivider"
					} ],
			"name" : "recordInfo"
		}, {
			"name" : "textId",
			"value" : "textPartEnGroupText"
		}, {
			"name" : "defTextId",
			"value" : "textPartEnGroupDefText"
		}, {
			"children" : [ {
				"repeatId" : "1",
				"children" : [ {
					"name" : "ref",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "textTextVar"
					} ],
					"attributes" : {
						"type" : "textVariable"
					}
				}, {
					"name" : "repeatMin",
					"value" : "1"
				}, {
					"name" : "repeatMax",
					"value" : "1"
				} ],
				"name" : "childReference"
			} ],
			"name" : "childReferences"
		}, {
			"children" : [ {
				"name" : "ref",
				"value" : "textPartTypeAlternativeCollectionVar"
			}, {
				"name" : "ref",
				"value" : "systemLanguageEnCollectionVar"
			} ],
			"name" : "attributeReferences"
		} ],
		"name" : "metadata",
		"attributes" : {
			"type" : "group"
		},
		},
		"actionLinks" : {
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/vnd.cora.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/metadata/textPartEnGroup",
				"accept" : "application/vnd.cora.record+json"
			},
			"read" : {
				"requestMethod" : "GET", 
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/metadata/textPartEnGroup",
				"accept" : "application/vnd.cora.record+json"
			}
		}
	};
	return coraTest;
}(CORATEST || {}));