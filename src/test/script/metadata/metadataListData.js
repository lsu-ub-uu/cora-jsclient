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
	coraTest.metadataList = {
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
				                    "value": "recordInfoPVarGroup"
				                  },
				                  {
				                    "name": "type",
				                    "value": "metadataGroup"
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
				      						"value": "userId"
				      					}
				      				]
				      			},
				                  {
				                    "name": "updatedBy",
				                    "value": "userId"
				                  }
				                ],
				                "name": "recordInfo"
				              },
				              {
				                "name": "nameInData",
				                "value": "recordInfo"
				              },
				              {
				                "name": "textId",
				                "value": "recordInfoText"
				              },
				              {
				                "name": "defTextId",
				                "value": "recordInfoDefText"
				              },
				              {
				                "children": [
				                  {
				                    "repeatId": "1",
				                    "children": [
				                      {
				                        "name": "ref",
				                        "children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataTextVariable"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "idPVarTextVar"
		             						}
		             					],"attributes": {
		             						"type": "textVariable"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "1"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  },
				                  {
				                    "repeatId": "2",
				                    "children": [
				                      {
				                        "name": "ref",
				                        "children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataTextVariable"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "typeTextVar"
		             						}
		             					],"attributes": {
		             						"type": "textVariable"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "1"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  },
				                  {
				                    "repeatId": "3",
				                    "children": [
				                      {
				                        "name": "ref",
				                        "children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataTextVariable"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "createdByLink"
		             						}
		             					],"attributes": {
		             						"type": "textVariable"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "1"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  }
				                ],
				                "name": "childReferences"
				              }
				            ],
				            "name": "metadata",
				            "attributes": {
				              "type": "group"
				            }
				          },
				          "actionLinks": {
				            "read": {
				              "requestMethod": "GET",
				              "rel": "read",
				              "url": "http://localhost:8080/therest/rest/record/metadataGroup/recordInfoPVarGroup",
				              "accept": "application/vnd.uub.record+json"
				            },
				            "update": {
				              "requestMethod": "POST",
				              "rel": "update",
				              "contentType": "application/vnd.uub.record+json",
				              "url": "http://localhost:8080/therest/rest/record/metadataGroup/recordInfoPVarGroup",
				              "accept": "application/vnd.uub.record+json"
				            },
				            "delete": {
				              "requestMethod": "DELETE",
				              "rel": "delete",
				              "url": "http://localhost:8080/therest/rest/record/metadataGroup/recordInfoPVarGroup"
				            }
				          }
				        }
				      },
				      {
				        "record": {
				          "data": {
				            "children": [
				              {
				                "name": "nameInData",
				                "value": "metadata"
				              },
				              {
				                "children": [
				                  {
				                    "name": "id",
				                    "value": "metadataGroupGroup"
				                  },
				                  {
				                    "name": "type",
				                    "value": "metadataGroup"
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
					      						"value": "userId"
					      					}
					      				]
					      			},
				                  {
				                    "name": "updatedBy",
				                    "value": "userId"
				                  }
				                ],
				                "name": "recordInfo"
				              },
				              {
				                "name": "textId",
				                "value": "metadataGroupGroupText"
				              },
				              {
				                "name": "defTextId",
				                "value": "metadataGroupGroupDefText"
				              },
				              {
				                "children": [
				                  {
				                    "repeatId": "1",
				                    "children": [
				                      {
				                        "name": "ref",
				                        "children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataGroup"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "recordInfo"
		             						}
		             					],"attributes": {
		             						"type": "group"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "1"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  },
				                  {
				                    "repeatId": "2",
				                    "children": [
				                      {
				                        "name": "ref",
				                        "children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataTextVariable"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "nameInDataTextVar"
		             						}
		             					],"attributes": {
		             						"type": "textVariable"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "1"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  },
				                  {
				                    "repeatId": "3",
				                    "children": [
				                      {
				                        "name": "ref",
				                        "children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataTextVariable"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "textIdTextVar"
		             						}
		             					],"attributes": {
		             						"type": "textVariable"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "1"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  },
				                  {
				                    "repeatId": "4",
				                    "children": [
				                      {
				                        "name": "ref",
			                        	"children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataTextVariable"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "defTextIdTextVar"
		             						}
		             					],"attributes": {
		             						"type": "textVariable"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "1"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  },
				                  {
				                    "repeatId": "6",
				                    "children": [
				                      {
				                        "name": "ref",
				                        "children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataGroup"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "attributeReferences"
		             						}
		             					],"attributes": {
		             						"type": "group"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "0"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  },
				                  {
				                    "repeatId": "7",
				                    "children": [
				                      {
				                        "name": "ref",
				                        "children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataGroup"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "childReferences"
		             						}
		             					],"attributes": {
		             						"type": "group"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "1"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  }
				                ],
				                "name": "childReferences"
				              },
				              {
				                "children": [
				                  {
				                    "name": "ref",
				                    "value": "metadataTypeCollectionVar"
				                  }
				                ],
				                "name": "attributeReferences"
				              }
				            ],
				            "name": "metadata",
				            "attributes": {
				              "type": "group"
				            }
				          },
				          "actionLinks": {
				            "read": {
				              "requestMethod": "GET",
				              "rel": "read",
				              "url": "http://localhost:8080/therest/rest/record/metadataGroup/metadataGroupGroup",
				              "accept": "application/vnd.uub.record+json"
				            },
				            "update": {
				              "requestMethod": "POST",
				              "rel": "update",
				              "contentType": "application/vnd.uub.record+json",
				              "url": "http://localhost:8080/therest/rest/record/metadataGroup/metadataGroupGroup",
				              "accept": "application/vnd.uub.record+json"
				            },
				            "delete": {
				              "requestMethod": "DELETE",
				              "rel": "delete",
				              "url": "http://localhost:8080/therest/rest/record/metadataGroup/metadataGroupGroup"
				            }
				          }
				        }
				      },
				      {
				        "record": {
				          "data": {
				            "children": [
				              {
				                "name": "nameInData",
				                "value": "textPart"
				              },
				              {
				                "children": [
				                  {
				                    "name": "id",
				                    "value": "textPartEnGroup"
				                  },
				                  {
				                    "name": "type",
				                    "value": "metadataGroup"
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
					      						"value": "userId"
					      					}
					      				]
					      			},
				                  {
				                    "name": "updatedBy",
				                    "value": "userId"
				                  }
				                ],
				                "name": "recordInfo"
				              },
				              {
				                "name": "textId",
				                "value": "textPartEnGroupText"
				              },
				              {
				                "name": "defTextId",
				                "value": "textPartEnGroupDefText"
				              },
				              {
				                "children": [
				                  {
				                    "repeatId": "1",
				                    "children": [
				                      {
				                        "name": "ref",
				                        "children": [
		             						{
		             							"name": "linkedRecordType",
		             							"value": "metadataTextVariable"
		             						},
		             						{
		             							"name": "linkedRecordId",
		             							"value": "textTextVar"
		             						}
		             					],"attributes": {
		             						"type": "textVariable"
		             					}
				                      },
				                      {
				                        "name": "repeatMin",
				                        "value": "1"
				                      },
				                      {
				                        "name": "repeatMax",
				                        "value": "1"
				                      }
				                    ],
				                    "name": "childReference"
				                  }
				                ],
				                "name": "childReferences"
				              },{
				                "children": [
				                  {
				                    "name": "ref",
				                    "value": "textPartTypeAlternativeCollectionVar"
				                  },
				                  {
				                    "name": "ref",
				                    "value": "systemLanguageEnCollectionVar"
				                  }
				                ],
				                "name": "attributeReferences"
				              }
				            ],
				            "name": "metadata",
				            "attributes": {
				              "type": "group"
				            }
				          },
				          "actionLinks": {
				            "read": {
				              "requestMethod": "GET",
				              "rel": "read",
				              "url": "http://localhost:8080/therest/rest/record/metadataGroup/textPartEnGroup",
				              "accept": "application/vnd.uub.record+json"
				            },
				            "update": {
				              "requestMethod": "POST",
				              "rel": "update",
				              "contentType": "application/vnd.uub.record+json",
				              "url": "http://localhost:8080/therest/rest/record/metadataGroup/textPartEnGroup",
				              "accept": "application/vnd.uub.record+json"
				            },
				            "delete": {
				              "requestMethod": "DELETE",
				              "rel": "delete",
				              "url": "http://localhost:8080/therest/rest/record/metadataGroup/textPartEnGroup"
				            }
				          }
				        }
				      }
				    ],
				    "totalNo": "179",
				    "containDataOfType": "metadata",
				    "toNo": "179"
				  }
				};
	return coraTest;
}(CORATEST || {}));