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

var CORATEST = (function (coraTest) {
    "use strict";
    coraTest.recordTypeProviderStub = function () {
        let recordTypeArray = [];

        // switch (metadataId) {
        recordTypeArray["presentationVar"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "presentationVar"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationVarGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationVarViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationVarFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationVarNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationVarFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationVarMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationVarListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "presentationVarSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "presentationVarFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "selfPresentationViewId",
                    "value": "presentationVarViewSelfPGroup"
                }, {
                    "name": "abstract",
                    "value": "false"
                },
                  {
                    "name": "groupOfRecordType",
                    "value": "presentation",
                    "repeatId": "1"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentation"
                        }
                    ]
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
        };
        recordTypeArray["metadata"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "metadata"
                    }, {
                        "name": "type",
                        "value": "recordType"
                    },{
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "metadataSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "metadataFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "selfPresentationViewId",
                    "value": "metadataViewSelfPGroup"
                }, {
                    "name": "abstract",
                    "value": "true"
                } ,{
                    "name": "groupOfRecordType",
                    "value": "metadata",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadata"
                }
            }
        };
        recordTypeArray["presentationSurroundingContainer"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "presentationSurroundingContainer"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationSurroundingContainerGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationSurroundingContainerViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationSurroundingContainerFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationSurroundingContainerNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationSurroundingContainerFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationSurroundingContainerMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationSurroundingContainerListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "presentationSurroundingContainerSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "presentationSurroundingContainerFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "selfPresentationViewId",
                    "value": "presentationSurroundingContainerViewSelfPGroup"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentation"
                        }
                    ]
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer"
                }
            }
        };
        recordTypeArray["textSystemOne"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "textSystemOne"
                    }, {
                        "name": "type",
                        "value": "recordType"
                    },{
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "textSystemOneGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "textSystemOneViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "textSystemOneFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "textSystemOneNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "textSystemOneFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "textSystemOneMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "textSystemOneListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "textSystemOneSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "textSystemOneFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "text"
                        }
                    ]
                },{
                    "name": "groupOfRecordType",
                    "value": "metadata",
                    "repeatId": "0"
                  },{
                      "name": "groupOfRecordType",
                      "value": "presentation",
                      "repeatId": "1"
                }],
                "name": "recordType"
            },
            "actionLinks": {
                "read": {
                    "requestMethod": "GET",
                    "rel": "read",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
                    "accept": "application/vnd.uub.record+json"
                }
            }
        };
        recordTypeArray["recordType"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "recordType"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
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
                    "name": "presentationViewId",
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
                    "name": "presentationFormId",
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
                    "name": "newMetadataId",
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
                    "name": "newPresentationFormId",
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
                    "name": "menuPresentationViewId",
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
                    "name": "listPresentationViewId",
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
                    "name": "searchMetadataId",
                    "value": "recordTypeSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "recordTypeFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "false"
                },{
                    "name": "groupOfRecordType",
                    "value": "metadata",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/recordType"
                }
            }
        };
        recordTypeArray["metadataGroup"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "metadataGroup"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataGroupGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataGroupViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataGroupFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataGroupNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataGroupFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataGroupMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataGroupListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "metadataGroupSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "metadataGroupFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadata"
                        }
                    ]
                },{
                    "name": "groupOfRecordType",
                    "value": "metadata",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup"
                }
            }
        };
        recordTypeArray["metadataCollectionItem"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "metadataCollectionItem"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionItemGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionItemViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionItemFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionItemNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionItemFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionItemMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionItemListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "metadataCollectionItemSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "metadataCollectionItemFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadata"
                        }
                    ]
                },{
                    "name": "groupOfRecordType",
                    "value": "metadata",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem"
                }
            }
        };
        recordTypeArray["presentation"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "presentation"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "presentationSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "presentationFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "true"
                },{
                    "name": "groupOfRecordType",
                    "value": "presentation",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentation",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentation",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentation"
                }
            }
        };
        recordTypeArray["metadataRecordLink"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "metadataRecordLink"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataRecordLinkGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionItemViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataRecordLinkFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataRecordLinkNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataRecordLinkFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataRecordLinkMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataRecordLinkListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "metadataRecordLinkSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "metadataRecordLinkFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "permissionKey",
                    "value": "RECORDTYPE_METADATARECORDLINK"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadata"
                        }
                    ]
                },{
                    "name": "groupOfRecordType",
                    "value": "metadata",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink"
                }
            }
        };
        recordTypeArray["metadataTextVariable"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "metadataTextVariable"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataTextVariableGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataTextVariableViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataTextVariableFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataTextVariableNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataTextVariableFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataTextVariableMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataTextVariableListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "metadataTextVariableSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "metadataTextVariableFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadata"
                        }
                    ]
                },{
                    "name": "groupOfRecordType",
                    "value": "metadata",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable"
                }
            }
        };
        recordTypeArray["presentationRepeatingContainer"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "presentationRepeatingContainer"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationRepeatingContainerGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationRepeatingContainerViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationRepeatingContainerFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationRepeatingContainerNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationRepeatingContainerFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationRepeatingContainerMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationRepeatingContainerListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "presentationRepeatingContainerSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "presentationRepeatingContainerFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentation"
                        }
                    ]
                },{
                    "name": "groupOfRecordType",
                    "value": "presentation",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer"
                }
            }
        };
        recordTypeArray["metadataCollectionVariable"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "metadataCollectionVariable"
                    }, {
                        "name": "type",
                        "value": "recordType"
                    },{
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionVariableGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionVariableViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionVariableFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionVariableNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionVariableFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionVariableMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataCollectionVariableListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "metadataCollectionVariableSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "metadataCollectionVariableFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadata"
                        }
                    ]
                },{
                    "name": "groupOfRecordType",
                    "value": "metadata",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable"
                }
            }
        };
        recordTypeArray["text"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "text"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
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
                    "name": "presentationViewId",
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
                    "name": "presentationFormId",
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
                    "name": "newMetadataId",
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
                    "name": "newPresentationFormId",
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
                    "name": "menuPresentationViewId",
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
                    "name": "listPresentationViewId",
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
                    "name": "searchMetadataId",
                    "value": "textSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "textFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "selfPresentationViewId",
                    "value": "textViewSelfPGroup"
                }, {
                    "name": "abstract",
                    "value": "true"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/text",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/text",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/text"
                }
            }
        };
        recordTypeArray["presentationGroup"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "presentationGroup"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationGroupGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationGroupViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationGroupFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationGroupNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationGroupFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationGroupMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentationGroupListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "presentationGroupSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "presentationGroupFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "presentation"
                        }
                    ]
                },{
                    "name": "groupOfRecordType",
                    "value": "presentation",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup"
                }
            }
        };
        recordTypeArray["metadataItemCollection"] = {
            "data": {
                "children": [{
                    "children": [{
                        "name": "id",
                        "value": "metadataItemCollection"
                    }, {
                        "name": "type",
                        "value": "recordType"
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
	      			}, {
                        "name": "updatedBy",
                        "value": "userId"
                    }],
                    "name": "recordInfo"
                }, {
                    "name": "metadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataItemCollectionGroup"
                        }
                    ]
                }, {
                    "name": "presentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataItemCollectionViewPGroup"
                        }
                    ]
                }, {
                    "name": "presentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataItemCollectionFormPGroup"
                        }
                    ]
                }, {
                    "name": "newMetadataId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "metadataGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataItemCollectionNewGroup"
                        }
                    ]
                }, {
                    "name": "newPresentationFormId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataItemCollectionFormNewPGroup"
                        }
                    ]
                }, {
                    "name": "menuPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataItemCollectionMenuPGroup"
                        }
                    ]
                }, {
                    "name": "listPresentationViewId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "presentationGroup"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadataItemCollectionListPGroup"
                        }
                    ]
                }, {
                    "name": "searchMetadataId",
                    "value": "metadataItemCollectionSearchGroup"
                }, {
                    "name": "searchPresentationFormId",
                    "value": "metadataItemCollectionFormSearchPGroup"
                }, {
                    "name": "userSuppliedId",
                    "value": "true"
                }, {
                    "name": "abstract",
                    "value": "false"
                }, {
                    "name": "parentId",
                    "children": [
                        {
                            "name": "linkedRecordType",
                            "value": "recordType"
                        },
                        {
                            "name": "linkedRecordId",
                            "value": "metadata"
                        }
                    ]
                },{
                    "name": "groupOfRecordType",
                    "value": "metadata",
                    "repeatId": "1"
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection",
                    "accept": "application/vnd.uub.record+json"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection",
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
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection"
                }
            }
        };
        recordTypeArray["image"] = {
            "data": {
                "children": [
                    {
                        "name": "metadataId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadataGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "imageGroup"
                            }
                        ]
                    },
                    {
                        "name": "abstract",
                        "value": "false"
                    },
                    {
                        "name": "parentId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "recordType"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binary"
                            }
                        ]
                    },
                    {
                        "children": [
                            {
                                "name": "id",
                                "value": "image"
                            },
                            {
                                "name": "type",
                                "value": "recordType"
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
                                        "url": "http://epc.ub.uu.se/cora/rest/record/system/cora",
                                        "accept": "application/vnd.uub.record+json"
                                    }
                                },
                                "name": "dataDivider"
                            }
                        ],
                        "name": "recordInfo"
                    },
                    {
                        "name": "presentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "imageViewPGroup"
                            }
                        ]
                    },
                    {
                        "name": "presentationFormId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "imageFormPGroup"
                            }
                        ]
                    },
                    {
                        "name": "newMetadataId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadataGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "imageNewGroup"
                            }
                        ]
                    },
                    {
                        "name": "newPresentationFormId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "imageFormNewPGroup"
                            }
                        ]
                    },
                    {
                        "name": "menuPresentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "imageMenuPGroup"
                            }
                        ]
                    },
                    {
                        "name": "listPresentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "imageListPGroup"
                            }
                        ]
                    },
                    {
                        "name": "searchMetadataId",
                        "value": "imageSearchGroup"
                    },
                    {
                        "name": "searchPresentationFormId",
                        "value": "imageFormSearchPGroup"
                    },
                    {
                        "name": "userSuppliedId",
                        "value": "false"
                    }
                    ,{
                        "name": "groupOfRecordType",
                        "value": "system",
                        "repeatId": "1"
                    }
                ],
                "name": "recordType"
            },
            "actionLinks": {
                "search": {
                    "requestMethod": "GET",
                    "rel": "search",
                    "url": "http://epc.ub.uu.se/cora/rest/record/image/",
                    "accept": "application/vnd.uub.recordList+json"
                },
                "read": {
                    "requestMethod": "GET",
                    "rel": "read",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/image",
                    "accept": "application/vnd.uub.record+json"
                },
                "create_by_upload": {
                    "requestMethod": "POST",
                    "rel": "create_by_upload",
                    "contentType": "multipart/form-data",
                    "url": "http://epc.ub.uu.se/cora/rest/rest/record/image/"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/image",
                    "accept": "application/vnd.uub.record+json"
                },
                "create": {
                    "requestMethod": "POST",
                    "rel": "create",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/image/",
                    "accept": "application/vnd.uub.record+json"
                },
                "list": {
                    "requestMethod": "GET",
                    "rel": "list",
                    "url": "http://epc.ub.uu.se/cora/rest/record/image/",
                    "accept": "application/vnd.uub.recordList+json"
                },
                "delete": {
                    "requestMethod": "DELETE",
                    "rel": "delete",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/image"
                }
            }
        };
        recordTypeArray["binary"] = {
            "data": {
                "children": [
                    {
                        "name": "metadataId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadataGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binaryGroup"
                            }
                        ]
                    },
                    {
                        "name": "abstract",
                        "value": "true"
                    },
                    {
                        "children": [
                            {
                                "name": "id",
                                "value": "binary"
                            },
                            {
                                "name": "type",
                                "value": "recordType"
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
                                        "url": "http://epc.ub.uu.se/cora/rest/record/system/cora",
                                        "accept": "application/vnd.uub.record+json"
                                    }
                                },
                                "name": "dataDivider"
                            }
                        ],
                        "name": "recordInfo"
                    },
                    {
                        "name": "presentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binaryViewPGroup"
                            }
                        ]
                    },
                    {
                        "name": "presentationFormId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binaryFormPGroup"
                            }
                        ]
                    },
                    {
                        "name": "newMetadataId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadataGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binaryNewGroup"
                            }
                        ]
                    },
                    {
                        "name": "newPresentationFormId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binaryFormNewPGroup"
                            }
                        ]
                    },
                    {
                        "name": "menuPresentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binaryMenuPGroup"
                            }
                        ]
                    },
                    {
                        "name": "listPresentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binaryListPGroup"
                            }
                        ]
                    },
                    {
                        "name": "searchMetadataId",
                        "value": "binarySearchGroup"
                    },
                    {
                        "name": "searchPresentationFormId",
                        "value": "binaryFormSearchPGroup"
                    },
                    {
                        "name": "userSuppliedId",
                        "value": "true"
                    },{
                        "name": "groupOfRecordType",
                        "value": "system",
                        "repeatId": "1"
                    }
                ],
                "name": "recordType"
            },
            "actionLinks": {
                "search": {
                    "requestMethod": "GET",
                    "rel": "search",
                    "url": "http://epc.ub.uu.se/cora/rest/record/binary/",
                    "accept": "application/vnd.uub.recordList+json"
                },
                "read": {
                    "requestMethod": "GET",
                    "rel": "read",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/binary",
                    "accept": "application/vnd.uub.record+json"
                },
                "create_by_upload": {
                    "requestMethod": "POST",
                    "rel": "create_by_upload",
                    "contentType": "multipart/form-data",
                    "url": "http://epc.ub.uu.se/cora/rest/record/binary/"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/binary",
                    "accept": "application/vnd.uub.record+json"
                },
                "create": {
                    "requestMethod": "POST",
                    "rel": "create",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/binary/",
                    "accept": "application/vnd.uub.record+json"
                },
                "list": {
                    "requestMethod": "GET",
                    "rel": "list",
                    "url": "http://epc.ub.uu.se/cora/rest/record/binary/",
                    "accept": "application/vnd.uub.recordList+json"
                },
                "delete": {
                    "requestMethod": "DELETE",
                    "rel": "delete",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/binary"
                }
            }
        };
        recordTypeArray["genericBinary"] = {
            "data": {
                "children": [
                    {
                        "name": "metadataId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadataGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "genericBinaryGroup"
                            }
                        ]
                    },
                    {
                        "name": "abstract",
                        "value": "false"
                    },
                    {
                        "name": "parentId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "recordType"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binary"
                            }
                        ]
                    },
                    {
                        "children": [
                            {
                                "name": "id",
                                "value": "genericBinary"
                            },
                            {
                                "name": "type",
                                "value": "recordType"
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
                                        "url": "http://epc.ub.uu.se/cora/rest/record/system/cora",
                                        "accept": "application/vnd.uub.record+json"
                                    }
                                },
                                "name": "dataDivider"
                            }
                        ],
                        "name": "recordInfo"
                    },
                    {
                        "name": "presentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "genericBinaryViewPGroup"
                            }
                        ]
                    },
                    {
                        "name": "presentationFormId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "genericBinaryFormPGroup"
                            }
                        ]
                    },
                    {
                        "name": "newMetadataId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadataGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "genericBinaryNewGroup"
                            }
                        ]
                    },
                    {
                        "name": "newPresentationFormId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "genericBinaryFormNewPGroup"
                            }
                        ]
                    },
                    {
                        "name": "menuPresentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "genericBinaryMenuPGroup"
                            }
                        ]
                    },
                    {
                        "name": "listPresentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "genericBinaryListPGroup"
                            }
                        ]
                    },
                    {
                        "name": "searchMetadataId",
                        "value": "genericBinarySearchGroup"
                    },
                    {
                        "name": "searchPresentationFormId",
                        "value": "genericBinaryFormSearchPGroup"
                    },
                    {
                        "name": "userSuppliedId",
                        "value": "false"
                    },{
                        "name": "groupOfRecordType",
                        "value": "system",
                        "repeatId": "1"
                    }
                ],
                "name": "recordType"
            },
            "actionLinks": {
                "search": {
                    "requestMethod": "GET",
                    "rel": "search",
                    "url": "http://epc.ub.uu.se/cora/rest/record/genericBinary/",
                    "accept": "application/vnd.uub.recordList+json"
                },
                "read": {
                    "requestMethod": "GET",
                    "rel": "read",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/genericBinary",
                    "accept": "application/vnd.uub.record+json"
                },
                "create_by_upload": {
                    "requestMethod": "POST",
                    "rel": "create_by_upload",
                    "contentType": "multipart/form-data",
                    "url": "http://epc.ub.uu.se/cora/rest/record/genericBinary/"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/genericBinary",
                    "accept": "application/vnd.uub.record+json"
                },
                "create": {
                    "requestMethod": "POST",
                    "rel": "create",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/genericBinary/",
                    "accept": "application/vnd.uub.record+json"
                },
                "list": {
                    "requestMethod": "GET",
                    "rel": "list",
                    "url": "http://epc.ub.uu.se/cora/rest/record/genericBinary/",
                    "accept": "application/vnd.uub.recordList+json"
                },
                "delete": {
                    "requestMethod": "DELETE",
                    "rel": "delete",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/genericBinary"
                }
            }
        };
        recordTypeArray["noDataDividerBinary"] = {
            "data": {
                "children": [
                    {
                        "name": "metadataId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadataGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "noDataDividerBinaryGroup"
                            }
                        ]
                    },
                    {
                        "name": "abstract",
                        "value": "false"
                    },
                    {
                        "name": "parentId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "recordType"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "binary"
                            }
                        ]
                    },
                    {
                        "children": [
                            {
                                "name": "id",
                                "value": "noDataDividerBinary"
                            },
                            {
                                "name": "type",
                                "value": "recordType"
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
                                        "url": "http://epc.ub.uu.se/cora/rest/record/system/cora",
                                        "accept": "application/vnd.uub.record+json"
                                    }
                                },
                                "name": "dataDivider"
                            }
                        ],
                        "name": "recordInfo"
                    },
                    {
                        "name": "presentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "noDataDividerBinaryViewPGroup"
                            }
                        ]
                    },
                    {
                        "name": "presentationFormId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "noDataDividerBinaryFormPGroup"
                            }
                        ]
                    },
                    {
                        "name": "newMetadataId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadataGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "noDataDividerBinaryNewGroup"
                            }
                        ]
                    },
                    {
                        "name": "newPresentationFormId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "noDataDividerBinaryFormNewPGroup"
                            }
                        ]
                    },
                    {
                        "name": "menuPresentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "noDataDividerBinaryMenuPGroup"
                            }
                        ]
                    },
                    {
                        "name": "listPresentationViewId",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "presentationGroup"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "noDataDividerBinaryListPGroup"
                            }
                        ]
                    },
                    {
                        "name": "searchMetadataId",
                        "value": "noDataDividerBinarySearchGroup"
                    },
                    {
                        "name": "searchPresentationFormId",
                        "value": "noDataDividerBinaryFormSearchPGroup"
                    },
                    {
                        "name": "userSuppliedId",
                        "value": "false"
                    },{
                        "name": "groupOfRecordType",
                        "value": "system",
                        "repeatId": "1"
                    }
                ],
                "name": "recordType"
            },
            "actionLinks": {
                "search": {
                    "requestMethod": "GET",
                    "rel": "search",
                    "url": "http://epc.ub.uu.se/cora/rest/record/noDataDividerBinary/",
                    "accept": "application/vnd.uub.recordList+json"
                },
                "read": {
                    "requestMethod": "GET",
                    "rel": "read",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/noDataDividerBinary",
                    "accept": "application/vnd.uub.record+json"
                },
                "create_by_upload": {
                    "requestMethod": "POST",
                    "rel": "create_by_upload",
                    "contentType": "multipart/form-data",
                    "url": "http://epc.ub.uu.se/cora/rest/record/noDataDividerBinary/"
                },
                "update": {
                    "requestMethod": "POST",
                    "rel": "update",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/noDataDividerBinary",
                    "accept": "application/vnd.uub.record+json"
                },
                "create": {
                    "requestMethod": "POST",
                    "rel": "create",
                    "contentType": "application/vnd.uub.record+json",
                    "url": "http://epc.ub.uu.se/cora/rest/record/noDataDividerBinary/",
                    "accept": "application/vnd.uub.record+json"
                },
                "list": {
                    "requestMethod": "GET",
                    "rel": "list",
                    "url": "http://epc.ub.uu.se/cora/rest/record/noDataDividerBinary/",
                    "accept": "application/vnd.uub.recordList+json"
                },
                "delete": {
                    "requestMethod": "DELETE",
                    "rel": "delete",
                    "url": "http://epc.ub.uu.se/cora/rest/record/recordType/noDataDividerBinary"
                }
            }
        };

        function getRecordTypeById(recordTypeId) {

            if (recordTypeArray[recordTypeId] !== undefined) {
                return recordTypeArray[recordTypeId];
            } else {

                // default:
                console.log("Id(" + recordTypeId + ") not found in recordTypeProviderStub");
                throw new Error("Id(" + recordTypeId + ") not found in recordTypeProviderStub");
            }
        }

        function getAllRecordTypes() {
            var recordTypeList = [];
            Object.keys(recordTypeArray).forEach(function (id) {
                recordTypeList.push(recordTypeArray[id]);
            });
            return recordTypeList;
        }

        var metadata = {};
        function getMetadataByRecordTypeId(recordTypeId) {
            return metadata;
        }
        var requestedGroupIds = [];
        function getRecordTypesByGroupId(groupId){
        	requestedGroupIds.push(groupId);
        	var listToReturn = [];
        	if("typeOfResource" === groupId || "authority" === groupId){
        		listToReturn.push(recordTypeArray["metadata"]);
        		listToReturn.push(recordTypeArray["presentationVar"]);
        	}
        	else if("search" === groupId){
        		//one child but no list link in that child
        		listToReturn.push(recordTypeArray["textSystemOne"]);
        	}
        	//else empty list = no children
        	return listToReturn;
        }
        
        function getRequestedGroupId(number){
        	return requestedGroupIds[number];
        }

        return Object.freeze({
            getRecordTypeById: getRecordTypeById,
            getAllRecordTypes: getAllRecordTypes,
            getMetadataByRecordTypeId : getMetadataByRecordTypeId,
            getRecordTypesByGroupId : getRecordTypesByGroupId,
            getRequestedGroupId : getRequestedGroupId
        });
    };
    return coraTest;
}(CORATEST || {}));