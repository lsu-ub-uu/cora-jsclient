/*
 * Copyright 2018, 2019 Uppsala University Library
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
	coraTest.loginList = {
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
														"value" : "systemOneTokenLogin"
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
																"url" : "http://localhost:8080/therest/rest/record/system/systemOne",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "recordType"
														}, {
															"name" : "linkedRecordId",
															"value" : "loginToken"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/recordType/loginToken",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "type"
													}, {
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "systemOneUser"
														}, {
															"name" : "linkedRecordId",
															"value" : "12345"
														} ],
														"name" : "createdBy"
													}, {
														"name" : "tsCreated",
														"value" : "2017-10-01 00:00:00.0"
													}, {
														"repeatId" : "0",
														"children" : [ {
															"children" : [ {
																"name" : "linkedRecordType",
																"value" : "systemOneUser"
															}, {
																"name" : "linkedRecordId",
																"value" : "12345"
															} ],
															"name" : "updatedBy"
														}, {
															"name" : "tsUpdated",
															"value" : "2017-11-01 17:53:00.0"
														} ],
														"name" : "updated"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "loginName",
											"value" : "Token login systemOne"
										}
										, {
											"name" : "url",
											"value" : "some/url"
										}
										 ],
								"name" : "login",
								"attributes" : {
									"type" : "token"
								}
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/loginToken/systemOneTokenLogin",
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
											"children" : [
													{
														"name" : "id",
														"value" : "uuwr"
													},
													{
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
																"url" : "http://localhost:8080/therest/rest/record/recordType/loginWebRedirect",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "type"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "systemOneUser"
														}, {
															"name" : "linkedRecordId",
															"value" : "12345"
														} ],
														"name" : "createdBy"
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
																"url" : "http://localhost:8080/therest/rest/record/system/systemOne",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													}, {
														"name" : "tsCreated",
														"value" : "2017-10-01 00:00:00.0"
													}, {
														"repeatId" : "0",
														"children" : [ {
															"children" : [ {
																"name" : "linkedRecordType",
																"value" : "systemOneUser"
															}, {
																"name" : "linkedRecordId",
																"value" : "12345"
															} ],
															"name" : "updatedBy"
														}, {
															"name" : "tsUpdated",
															"value" : "2017-11-01 17:49:58.0"
														} ],
														"name" : "updated"
													}, {
														"repeatId" : "2",
														"children" : [ {
															"children" : [ {
																"name" : "linkedRecordType",
																"value" : "user"
															}, {
																"name" : "linkedRecordId",
																"value" : "141414"
															} ],
															"name" : "updatedBy"
														}, {
															"name" : "tsUpdated",
															"value" : "2018-05-08 08:22:37.644"
														} ],
														"name" : "updated"
													} ],
											"name" : "recordInfo"
										},
										{
											"name" : "loginName",
											"value" : "Uppsala web"
										},
										{
											"name" : "url",
											"value" : "https://epc.ub.uu.se/Shibboleth.sso/Login/uu?target=https://epc.ub.uu.se/idplogin/login"
										} ],
								"name" : "login",
								"attributes" : {
									"type" : "webRedirect"
								}
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/loginWebRedirect/uuwr",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://localhost:8080/therest/rest/record/loginWebRedirect/uuwr/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
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
														"value" : "testwr"
													},
													{
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
																"url" : "http://localhost:8080/therest/rest/record/recordType/loginWebRedirect",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "type"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "systemOneUser"
														}, {
															"name" : "linkedRecordId",
															"value" : "12345"
														} ],
														"name" : "createdBy"
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
																"url" : "http://localhost:8080/therest/rest/record/system/systemOne",
																"accept" : "application/vnd.uub.record+json"
															}
														},
														"name" : "dataDivider"
													}, {
														"name" : "tsCreated",
														"value" : "2017-10-01 00:00:00.0"
													}, {
														"repeatId" : "0",
														"children" : [ {
															"children" : [ {
																"name" : "linkedRecordType",
																"value" : "systemOneUser"
															}, {
																"name" : "linkedRecordId",
																"value" : "12345"
															} ],
															"name" : "updatedBy"
														}, {
															"name" : "tsUpdated",
															"value" : "2017-11-01 17:49:58.0"
														} ],
														"name" : "updated"
													}, {
														"repeatId" : "2",
														"children" : [ {
															"children" : [ {
																"name" : "linkedRecordType",
																"value" : "user"
															}, {
																"name" : "linkedRecordId",
																"value" : "141414"
															} ],
															"name" : "updatedBy"
														}, {
															"name" : "tsUpdated",
															"value" : "2018-05-08 08:22:37.644"
														} ],
														"name" : "updated"
													} ],
											"name" : "recordInfo"
										},
										{
											"name" : "loginName",
											"value" : "test web"
										},
										{
											"name" : "url",
											"value" : "https://epc.ub.uu.se/Shibboleth.sso/Login/test?target=https://epc.ub.uu.se/idplogin/login"
										} ],
								"name" : "login",
								"attributes" : {
									"type" : "webRedirect"
								}
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/loginWebRedirect/testwr",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://localhost:8080/therest/rest/record/loginWebRedirect/testwr/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
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
				                    "name": "id",
				                    "value": "uppsalaLDAP"
				                  },
				                  {
				                    "children": [
				                      {
				                        "name": "linkedRecordType",
				                        "value": "recordType"
				                      },
				                      {
				                        "name": "linkedRecordId",
				                        "value": "loginLDAP"
				                      }
				                    ],
				                    "actionLinks": {
				                      "read": {
				                        "requestMethod": "GET",
				                        "rel": "read",
				                        "url": "http://localhost:8080/therest/rest/record/recordType/loginLDAP",
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
				                  },
				                  {
				                    "name": "tsCreated",
				                    "value": "2019-01-25 08:24:23.334"
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
				                        "name": "updatedBy"
				                      },
				                      {
				                        "name": "tsUpdated",
				                        "value": "2019-01-25 08:24:23.334"
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
				                        "name": "updatedBy"
				                      },
				                      {
				                        "name": "tsUpdated",
				                        "value": "2019-01-25 09:17:15.977"
				                      }
				                    ],
				                    "name": "updated"
				                  }
				                ],
				                "name": "recordInfo"
				              },
				              {
				                "children": [
				                  {
				                    "name": "linkedRecordType",
				                    "value": "metadataGroup"
				                  },
				                  {
				                    "name": "linkedRecordId",
				                    "value": "passwordGroup"
				                  }
				                ],
				                "actionLinks": {
				                  "read": {
				                    "requestMethod": "GET",
				                    "rel": "read",
				                    "url": "http://localhost:8080/therest/rest/record/metadataGroup/passwordGroup",
				                    "accept": "application/vnd.uub.record+json"
				                  }
				                },
				                "name": "viewDefinition"
				              },
				              {
				                "children": [
				                  {
				                    "name": "linkedRecordType",
				                    "value": "presentationGroup"
				                  },
				                  {
				                    "name": "linkedRecordId",
				                    "value": "passwordPGroup"
				                  }
				                ],
				                "actionLinks": {
				                  "read": {
				                    "requestMethod": "GET",
				                    "rel": "read",
				                    "url": "http://localhost:8080/therest/rest/record/presentationGroup/passwordPGroup",
				                    "accept": "application/vnd.uub.record+json"
				                  }
				                },
				                "name": "viewPresentation"
				              },
				              {
				                "children": [
				                  {
				                    "name": "linkedRecordType",
				                    "value": "coraText"
				                  },
				                  {
				                    "name": "linkedRecordId",
				                    "value": "passwordGroupText"
				                  }
				                ],
				                "actionLinks": {
				                  "read": {
				                    "requestMethod": "GET",
				                    "rel": "read",
				                    "url": "http://localhost:8080/therest/rest/record/coraText/passwordGroupText",
				                    "accept": "application/vnd.uub.record+json"
				                  }
				                },
				                "name": "description"
				              }
				            ],
				            "name": "login",
				            "attributes": {
				              "type": "password"
				            }
				          },
				          "actionLinks": {
				            "read": {
				              "requestMethod": "GET",
				              "rel": "read",
				              "url": "http://localhost:8080/therest/rest/record/loginLDAP/uppsalaLDAP",
				              "accept": "application/vnd.uub.record+json"
				            },
				            "read_incoming_links": {
				              "requestMethod": "GET",
				              "rel": "read_incoming_links",
				              "url": "http://localhost:8080/therest/rest/record/loginLDAP/uppsalaLDAP/incomingLinks",
				              "accept": "application/vnd.uub.recordList+json"
				            }
				          }
				        }
				      }],
			"totalNo" : "4",
			"containDataOfType" : "login",
			"toNo" : "4"
		}
	};
	return coraTest;
}(CORATEST || {}));