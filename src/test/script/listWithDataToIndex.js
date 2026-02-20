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
	coraTest.listWithDataToIndex = {
			  "dataList": {
				    "fromNo": "1",
				    "data": [
				      {
				        "record": {
				          "data": {
				            "children": [
				              {
				                "children": [
				                  {
				                    "name": "id",
				                    "value": "writtenText:9011356289912"
				                  },
				                  {
				                    "children": [
				                      {
				                        "name": "linkedRecordType",
				                        "value": "recordType"
				                      },
				                      {
				                        "name": "linkedRecordId",
				                        "value": "writtenText"
				                      }
				                    ],
				                    "actionLinks": {
				                      "read": {
				                        "requestMethod": "GET",
				                        "rel": "read",
				                        "url": "https://epc.ub.uu.se/therest/rest/record/recordType/writtenText",
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
				                        "url": "https://epc.ub.uu.se/therest/rest/record/system/testSystem",
				                        "accept": "application/vnd.cora.record+json"
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
				                    "value": "2017-11-13 13:03:42.094"
				                  }
				                ],
				                "name": "recordInfo"
				              },
				              {
				                "name": "manuscript",
				                "value": "no"
				              },
				              {
				                "children": [
				                  {
				                    "name": "mainTitle",
				                    "value": "En andra text"
				                  },
				                  {
				                    "name": "subTitle",
				                    "value": "SubTitle"
				                  }
				                ],
				                "name": "title"
				              },
				              {
				                "name": "collection",
				                "value": "yes"
				              },
				              {
				                "children": [
				                  {
				                    "children": [
				                      {
				                        "name": "linkedRecordType",
				                        "value": "locationUnit"
				                      },
				                      {
				                        "name": "linkedRecordId",
				                        "value": "uu"
				                      }
				                    ],
				                    "actionLinks": {
				                      "read": {
				                        "requestMethod": "GET",
				                        "rel": "read",
				                        "url": "https://epc.ub.uu.se/therest/rest/record/locationUnit/uu",
				                        "accept": "application/vnd.cora.record+json"
				                      }
				                    },
				                    "name": "location"
				                  },
				                  {
				                    "name": "sigel",
				                    "value": "sigelL"
				                  }
				                ],
				                "name": "physicalLocation"
				              },
				              {
				                "repeatId": "0",
				                "children": [
				                  {
				                    "repeatId": "0",
				                    "name": "role",
				                    "value": "editor"
				                  },
				                  {
				                    "children": [
				                      {
				                        "name": "linkedRecordType",
				                        "value": "person"
				                      },
				                      {
				                        "name": "linkedRecordId",
				                        "value": "PersonOne"
				                      }
				                    ],
				                    "actionLinks": {
				                      "read": {
				                        "requestMethod": "GET",
				                        "rel": "read",
				                        "url": "https://epc.ub.uu.se/therest/rest/record/person/PersonOne",
				                        "accept": "application/vnd.cora.record+json"
				                      }
				                    },
				                    "name": "personLink"
				                  }
				                ],
				                "name": "personRole"
				              }
				            ],
				            "name": "bibliographic"
				          },
				          "actionLinks": {
				            "read": {
				              "requestMethod": "GET",
				              "rel": "read",
				              "url": "https://epc.ub.uu.se/therest/rest/record/writtenText/writtenText:9011356289912",
				              "accept": "application/vnd.cora.record+json"
				            },
				            "update": {
				              "requestMethod": "POST",
				              "rel": "update",
				              "contentType": "application/vnd.cora.record+json",
				              "url": "https://epc.ub.uu.se/therest/rest/record/writtenText/writtenText:9011356289912",
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
				                        "value": "writtenText"
				                      }
				                    ],
				                    "name": "recordType"
				                  },
				                  {
				                    "name": "recordId",
				                    "value": "writtenText:9011356289912"
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
				            },
				            "delete": {
				              "requestMethod": "DELETE",
				              "rel": "delete",
				              "url": "https://epc.ub.uu.se/therest/rest/record/writtenText/writtenText:9011356289912"
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
				                    "value": "writtenText:93918281873569"
				                  },
				                  {
				                    "children": [
				                      {
				                        "name": "linkedRecordType",
				                        "value": "recordType"
				                      },
				                      {
				                        "name": "linkedRecordId",
				                        "value": "writtenText"
				                      }
				                    ],
				                    "actionLinks": {
				                      "read": {
				                        "requestMethod": "GET",
				                        "rel": "read",
				                        "url": "https://epc.ub.uu.se/therest/rest/record/recordType/writtenText",
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
				                        "url": "https://epc.ub.uu.se/therest/rest/record/system/testSystem",
				                        "accept": "application/vnd.cora.record+json"
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
				                    "value": "2017-11-29 07:49:21.021"
				                  }
				                ],
				                "name": "recordInfo"
				              },
				              {
				                "name": "manuscript",
				                "value": "no"
				              },
				              {
				                "children": [
				                  {
				                    "name": "mainTitle",
				                    "value": "TestWrittenText"
				                  },
				                  {
				                    "name": "subTitle",
				                    "value": "SubTitle"
				                  }
				                ],
				                "name": "title"
				              },
				              {
				                "repeatId": "0",
				                "children": [
				                  {
				                    "repeatId": "0",
				                    "name": "role",
				                    "value": "editor"
				                  },
				                  {
				                    "children": [
				                      {
				                        "name": "linkedRecordType",
				                        "value": "person"
				                      },
				                      {
				                        "name": "linkedRecordId",
				                        "value": "person2"
				                      }
				                    ],
				                    "actionLinks": {
				                      "read": {
				                        "requestMethod": "GET",
				                        "rel": "read",
				                        "url": "https://epc.ub.uu.se/therest/rest/record/person/person2",
				                        "accept": "application/vnd.cora.record+json"
				                      }
				                    },
				                    "name": "personLink"
				                  }
				                ],
				                "name": "personRole"
				              },
				              {
				                "name": "collection",
				                "value": "yes"
				              },
				              {
				                "children": [
				                  {
				                    "children": [
				                      {
				                        "name": "linkedRecordType",
				                        "value": "locationUnit"
				                      },
				                      {
				                        "name": "linkedRecordId",
				                        "value": "uu"
				                      }
				                    ],
				                    "actionLinks": {
				                      "read": {
				                        "requestMethod": "GET",
				                        "rel": "read",
				                        "url": "https://epc.ub.uu.se/therest/rest/record/locationUnit/uu",
				                        "accept": "application/vnd.cora.record+json"
				                      }
				                    },
				                    "name": "location"
				                  },
				                  {
				                    "name": "sigel",
				                    "value": "sigelL"
				                  }
				                ],
				                "name": "physicalLocation"
				              }
				            ],
				            "name": "bibliographic"
				          },
				          "actionLinks": {
				            "read": {
				              "requestMethod": "GET",
				              "rel": "read",
				              "url": "https://epc.ub.uu.se/therest/rest/record/writtenText/writtenText:93918281873569",
				              "accept": "application/vnd.cora.record+json"
				            },
				            "update": {
				              "requestMethod": "POST",
				              "rel": "update",
				              "contentType": "application/vnd.cora.record+json",
				              "url": "https://epc.ub.uu.se/therest/rest/record/writtenText/writtenText:93918281873569",
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
				                        "value": "writtenText"
				                      }
				                    ],
				                    "name": "recordType"
				                  },
				                  {
				                    "name": "recordId",
				                    "value": "writtenText:93918281873569"
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
				            },
				            "delete": {
				              "requestMethod": "DELETE",
				              "rel": "delete",
				              "url": "https://epc.ub.uu.se/therest/rest/record/writtenText/writtenText:93918281873569"
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
                                                    "value": "writtenText:939182818735699"
                                                },
                                                {
                                                    "children": [
                                                        {
                                                            "name": "linkedRecordType",
                                                            "value": "recordType"
                                                        },
                                                        {
                                                            "name": "linkedRecordId",
                                                            "value": "writtenText"
                                                        }
                                                    ],
                                                    "actionLinks": {
                                                        "read": {
                                                            "requestMethod": "GET",
                                                            "rel": "read",
                                                            "url": "https://epc.ub.uu.se/therest/rest/record/recordType/writtenText",
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
                                                            "url": "https://epc.ub.uu.se/therest/rest/record/system/testSystem",
                                                            "accept": "application/vnd.cora.record+json"
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
                                                    "value": "2017-11-29 07:49:21.021"
                                                }
                                            ],
                                            "name": "recordInfo"
                                        },
                                        {
                                            "name": "manuscript",
                                            "value": "no"
                                        },
                                        {
                                            "children": [
                                                {
                                                    "name": "mainTitle",
                                                    "value": "TestWrittenText"
                                                },
                                                {
                                                    "name": "subTitle",
                                                    "value": "SubTitle"
                                                }
                                            ],
                                            "name": "title"
                                        },
                                        {
                                            "repeatId": "0",
                                            "children": [
                                                {
                                                    "repeatId": "0",
                                                    "name": "role",
                                                    "value": "editor"
                                                },
                                                {
                                                    "children": [
                                                        {
                                                            "name": "linkedRecordType",
                                                            "value": "person"
                                                        },
                                                        {
                                                            "name": "linkedRecordId",
                                                            "value": "person2"
                                                        }
                                                    ],
                                                    "actionLinks": {
                                                        "read": {
                                                            "requestMethod": "GET",
                                                            "rel": "read",
                                                            "url": "https://epc.ub.uu.se/therest/rest/record/person/person2",
                                                            "accept": "application/vnd.cora.record+json"
                                                        }
                                                    },
                                                    "name": "personLink"
                                                }
                                            ],
                                            "name": "personRole"
                                        },
                                        {
                                            "name": "collection",
                                            "value": "yes"
                                        },
                                        {
                                            "children": [
                                                {
                                                    "children": [
                                                        {
                                                            "name": "linkedRecordType",
                                                            "value": "locationUnit"
                                                        },
                                                        {
                                                            "name": "linkedRecordId",
                                                            "value": "uu"
                                                        }
                                                    ],
                                                    "actionLinks": {
                                                        "read": {
                                                            "requestMethod": "GET",
                                                            "rel": "read",
                                                            "url": "https://epc.ub.uu.se/therest/rest/record/locationUnit/uu",
                                                            "accept": "application/vnd.cora.record+json"
                                                        }
                                                    },
                                                    "name": "location"
                                                },
                                                {
                                                    "name": "sigel",
                                                    "value": "sigelL"
                                                }
                                            ],
                                            "name": "physicalLocation"
                                        }
                                    ],
                                    "name": "bibliographic"
                                },
                                "actionLinks": {
                                    "read": {
                                        "requestMethod": "GET",
                                        "rel": "read",
                                        "url": "https://epc.ub.uu.se/therest/rest/record/writtenText/writtenText:93918281873569",
                                        "accept": "application/vnd.cora.record+json"
                                    },
                                    "update": {
                                        "requestMethod": "POST",
                                        "rel": "update",
                                        "contentType": "application/vnd.cora.record+json",
                                        "url": "https://epc.ub.uu.se/therest/rest/record/writtenText/writtenText:93918281873569",
                                        "accept": "application/vnd.cora.record+json"
                                    },
                                    "delete": {
                                        "requestMethod": "DELETE",
                                        "rel": "delete",
                                        "url": "https://epc.ub.uu.se/therest/rest/record/writtenText/writtenText:93918281873569"
                                    }
                                }
                            }
                        }
				    ],
				    "totalNo": "3",
				    "containDataOfType": "writtenText",
				    "toNo": "3"
				  }
				};
	return coraTest;
}(CORATEST || {}));