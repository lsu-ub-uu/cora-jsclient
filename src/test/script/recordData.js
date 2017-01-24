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
	coraTest.record = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "recordType"
				}, {
					"name" : "type",
					"value" : "recordType"
				}, {
					"name" : "createdBy",
					"value" : "userId"
				}, {
					"name" : "updatedBy",
					"value" : "userId"
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
			              "accept": "application/uub+record+json"
			            }
			          },
			          "name": "dataDivider"
			        } ],
				"name" : "recordInfo"
			}, {
				"name" : "metadataId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "metadataGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "recordTypeGroup"
					}
				]
			}, {
				"name" : "presentationViewId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "recordTypeViewPGroup"
					}
				]
			}, {
				"name" : "presentationFormId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "recordTypeFormPGroup"
					}
				]
			}, {
				"name" : "newMetadataId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "metadataGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "recordTypeNewGroup"
					}
				]
			}, {
				"name" : "newPresentationFormId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "recordTypeFormNewPGroup"
					}
				]
			}, {
				"name" : "menuPresentationViewId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "recordTypeMenuPGroup"
					}
				]
			}, {
				"name" : "listPresentationViewId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "recordTypeListPGroup"
					}
				]
			}, {
				"name" : "searchMetadataId",
				"value" : "recordTypeSearchGroup"
			}, {
				"name" : "searchPresentationFormId",
				"value" : "recordTypeFormSearchPGroup"
			}, {
				"name" : "userSuppliedId",
				"value" : "true"
			}, {
				"name" : "selfPresentationViewId",
				"value" : "recordTypeViewSelfPGroup"
			}, {
				"name" : "abstract",
				"value" : "false"
			} ],
			"name" : "recordType"
		},
		"actionLinks" : {
			"search" : {
				"requestMethod" : "GET",
				"rel" : "search",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/uub+recordList+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
				"accept" : "application/uub+record+json"
			},
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/uub+record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
				"accept" : "application/uub+record+json"
			},
			"create" : {
				"requestMethod" : "POST",
				"rel" : "create",
				"contentType" : "application/uub+record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/uub+record+json"
			},
			"list" : {
				"requestMethod" : "GET",
				"rel" : "list",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/uub+recordList+json"
			},
			"delete" : {
				"requestMethod" : "DELETE",
				"rel" : "delete",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType"
			}
		}
	};
	coraTest.recordAbstract = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "text"
				}, {
					"name" : "type",
					"value" : "recordType"
				}, {
					"name" : "createdBy",
					"value" : "userId"
				}, {
					"name" : "updatedBy",
					"value" : "userId"
				} ],
				"name" : "recordInfo"
			}, {
				"name" : "metadataId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "metadataGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "textGroup"
					}
				]
			}, {
				"name" : "presentationViewId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "textViewPGroup"
					}
				]
			}, {
				"name" : "presentationFormId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "textFormPGroup"
					}
				]
			}, {
				"name" : "newMetadataId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "metadataGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "textNewGroup"
					}
				]
			}, {
				"name" : "newPresentationFormId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "textFormNewPGroup"
					}
				]
			}, {
				"name" : "menuPresentationViewId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "textMenuPGroup"
					}
				]
			}, {
				"name" : "listPresentationViewId",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "presentationGroup"
					},
					{
						"name": "linkedRecordId",
						"value": "textListPGroup"
					}
				]
			}, {
				"name" : "searchMetadataId",
				"value" : "textSearchGroup"
			}, {
				"name" : "searchPresentationFormId",
				"value" : "textFormSearchPGroup"
			}, {
				"name" : "userSuppliedId",
				"value" : "true"
			}, {
				"name" : "selfPresentationViewId",
				"value" : "textViewSelfPGroup"
			}, {
				"name" : "abstract",
				"value" : "true"
			} ],
			"name" : "recordType"
		},
		"actionLinks" : {
			"search" : {
				"requestMethod" : "GET",
				"rel" : "search",
				"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
				"accept" : "application/uub+recordList+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text",
				"accept" : "application/uub+record+json"
			},
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/uub+record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text",
				"accept" : "application/uub+record+json"
			},
			"create" : {
				"requestMethod" : "POST",
				"rel" : "create",
				"contentType" : "application/uub+record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
				"accept" : "application/uub+record+json"
			},
			"list" : {
				"requestMethod" : "GET",
				"rel" : "list",
				"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
				"accept" : "application/uub+recordList+json"
			},
			"delete" : {
				"requestMethod" : "DELETE",
				"rel" : "delete",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text"
			}
		}
	};
	coraTest.recordWithoutUpdateOrDeleteLink = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "svEnText"
				}, {
					"name" : "type",
					"value" : "textSystemOne"
				}, {
					"name" : "createdBy",
					"value" : "userId"
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
			              "accept": "application/uub+record+json"
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
				"accept" : "application/uub+record+json"
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
					"name" : "type",
					"value" : "textSystemOne"
				}, {
					"name" : "createdBy",
					"value" : "userId"
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
			              "accept": "application/uub+record+json"
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
				"contentType" : "application/uub+record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/uub+record+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/uub+record+json"
			}
		}
	};
	// coraTest.record = {};
	return coraTest;
}(CORATEST));