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
	                        "value": "textSystemOne"
	                    }
	                ],
	                "name": "type"
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
			              "accept": "application/vnd.uub.record+json"
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
				"accept" : "application/vnd.uub.record+json"
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
								"value": "textSystemOne"
							}
							],
							"name": "type"
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
									"accept": "application/vnd.uub.record+json"
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
					"accept" : "application/vnd.uub.record+json"
				},
				"read_incoming_links":{
					"requestMethod" : "GET",
					"rel" : "read_incoming_links",
					"url" : "http://localhost:8080/therest/rest/record/coraText/textSystemOne/incomingLinks",
					"accept" : "application/vnd.uub.recordList+json"
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
	                        "value": "textSystemOne"
	                    }
	                ],
	                "name": "type"
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
			              "accept": "application/vnd.uub.record+json"
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
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.uub.record+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.uub.record+json"
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
		                        "value": "textSystemOne"
		                    }
		                ],
		                "name": "type"
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
				              "accept": "application/vnd.uub.record+json"
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
					"contentType" : "application/vnd.uub.record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
					"accept" : "application/vnd.uub.record+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
					"accept" : "application/vnd.uub.record+json"
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
			        "contentType": "application/vnd.uub.record+json",
			        "url": "https://epc.ub.uu.se/therest/rest/record/workOrder/",
			        "accept": "application/vnd.uub.record+json"
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
							"value": "textSystemOne"
						}
					],
					"name": "type"
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
								"accept": "application/vnd.uub.record+json"
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
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.uub.record+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.uub.record+json"
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
							"value": "textSystemOne"
						}
					],
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
								"url": "http://localhost:8080/therest/rest/record/system/cora",
								"accept": "application/vnd.uub.record+json"
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
			"name" : "refParentId",
			"value" : "textPartAlternativeGroup"
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
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/metadata/textPartEnGroup",
				"accept" : "application/vnd.uub.record+json"
			},
			"read" : {
				"requestMethod" : "GET", 
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/metadata/textPartEnGroup",
				"accept" : "application/vnd.uub.record+json"
			}
		}
	};
	return coraTest;
}(CORATEST || {}));