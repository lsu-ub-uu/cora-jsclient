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
	coraTest.loginUnitList = {
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
														"value" : "uuLoginUnit"
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
																"accept" : "application/vnd.cora.record+json"
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
															"value" : "loginUnit"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/recordType/loginUnit",
																"accept" : "application/vnd.cora.record+json"
															}
														},
														"name" : "type"
													}, {
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "user"
														}, {
															"name" : "linkedRecordId",
															"value" : "141414"
														} ],
														"name" : "createdBy"
													}, {
														"name" : "tsCreated",
														"value" : "2018-05-08 08:26:12.976"
													}, {
														"repeatId" : "0",
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
															"value" : "2018-05-08 08:26:12.976"
														} ],
														"name" : "updated"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "loginWebRedirect"
														}, {
															"name" : "linkedRecordId",
															"value" : "uuwr"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/loginWebRedirect/uuwr",
																"accept" : "application/vnd.cora.record+json"
															}
														},
														"name" : "login"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "coraText"
														}, {
															"name" : "linkedRecordId",
															"value" : "uuLoginUnitText"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/coraText/uuLoginUnitText",
																"accept" : "application/vnd.cora.record+json"
															}
														},
														"name" : "loginDescription"
													} ],
											"name" : "loginInfo"
										} ],
								"name" : "loginUnit"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/loginUnit/uuLoginUnit",
									"accept" : "application/vnd.cora.record+json"
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
														"value" : "testLoginUnit"
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
																"accept" : "application/vnd.cora.record+json"
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
															"value" : "loginUnit"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/recordType/loginUnit",
																"accept" : "application/vnd.cora.record+json"
															}
														},
														"name" : "type"
													}, {
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "user"
														}, {
															"name" : "linkedRecordId",
															"value" : "141414"
														} ],
														"name" : "createdBy"
													}, {
														"name" : "tsCreated",
														"value" : "2018-05-08 08:26:12.976"
													}, {
														"repeatId" : "0",
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
															"value" : "2018-05-08 08:26:12.976"
														} ],
														"name" : "updated"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "loginWebRedirect"
														}, {
															"name" : "linkedRecordId",
															"value" : "testwr"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/loginWebRedirect/testwr",
																"accept" : "application/vnd.cora.record+json"
															}
														},
														"name" : "login"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "coraText"
														}, {
															"name" : "linkedRecordId",
															"value" : "testLoginUnitText"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/coraText/testLoginUnitText",
																"accept" : "application/vnd.cora.record+json"
															}
														},
														"name" : "loginDescription"
													} ],
											"name" : "loginInfo"
										} ],
								"name" : "loginUnit"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/loginUnit/testLoginUnit",
									"accept" : "application/vnd.cora.record+json"
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
				                    "value": "uuSystemOneLDAPLoginUnit"
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
				                        "accept": "application/vnd.cora.record+json"
				                      }
				                    },
				                    "name": "dataDivider"
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
				                        "url": "http://localhost:8080/therest/rest/record/recordType/loginUnit",
				                        "accept": "application/vnd.cora.record+json"
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
				                    "name": "tsCreated",
				                    "value": "2019-01-25 08:39:04.315"
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
				                        "value": "2019-01-25 08:39:04.315"
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
				                    "children": [
				                      {
				                        "name": "linkedRecordType",
				                        "value": "loginLDAP"
				                      },
				                      {
				                        "name": "linkedRecordId",
				                        "value": "uppsalaLDAP"
				                      }
				                    ],
				                    "actionLinks": {
				                      "read": {
				                        "requestMethod": "GET",
				                        "rel": "read",
				                        "url": "http://localhost:8080/therest/rest/record/loginLDAP/uppsalaLDAP",
				                        "accept": "application/vnd.cora.record+json"
				                      }
				                    },
				                    "name": "login"
				                  },
				                  {
				                    "children": [
				                      {
				                        "name": "linkedRecordType",
				                        "value": "coraText"
				                      },
				                      {
				                        "name": "linkedRecordId",
				                        "value": "uuSystemOneLDAPLoginUnitText"
				                      }
				                    ],
				                    "actionLinks": {
				                      "read": {
				                        "requestMethod": "GET",
				                        "rel": "read",
				                        "url": "http://localhost:8080/therest/rest/record/coraText/uuSystemOneLDAPLoginUnitText",
				                        "accept": "application/vnd.cora.record+json"
				                      }
				                    },
				                    "name": "loginDescription"
				                  }
				                ],
				                "name": "loginInfo"
				              }
				            ],
				            "name": "loginUnit"
				          },
				          "actionLinks": {
				            "read": {
				              "requestMethod": "GET",
				              "rel": "read",
				              "url": "http://localhost:8080/therest/rest/record/loginUnit/uuSystemOneLDAPLoginUnit",
				              "accept": "application/vnd.cora.record+json"
				            }
				          }
				        }
				      }],
			"totalNo" : "2",
			"containDataOfType" : "loginUnit",
			"toNo" : "2"
		}
	};
	return coraTest;
}(CORATEST || {}));