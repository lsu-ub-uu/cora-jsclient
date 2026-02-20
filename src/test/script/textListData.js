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
	coraTest.textList = {
		"dataList" : {
			"fromNo" : "1",
			"data" : [
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "presentationOfTextVarText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Presentation av"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationOfTextVarText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationOfTextVarText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationOfTextVarText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "refMinimizedItemText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "minimierad presentation"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/refMinimizedItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/refMinimizedItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/refMinimizedItemText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "modeCollectionTextVarText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Presentationsläge"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/modeCollectionTextVarText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/modeCollectionTextVarText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/modeCollectionTextVarText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "imageItemText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "bild"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/imageItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/imageItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/imageItemText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "id",
												"value" : "presentationChildReferencesGroupText"
											}, {
												"name" : "type",
												"value" : "textSystemOne"
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
							      			} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "text",
												"value" : "Referenser till barn som ska visas i presentationen"
											} ],
											"name" : "textPart",
											"attributes" : {
												"type" : "default",
												"lang" : "sv"
											}
										} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationChildReferencesGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationChildReferencesGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationChildReferencesGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "refItemText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "presentation"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/refItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/refItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/refItemText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "textPartEnPGroupText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			}],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Engelska"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartEnPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartEnPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartEnPGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "recordInfoNewTextPGroupText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Textid"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/recordInfoNewTextPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/recordInfoNewTextPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/recordInfoNewTextPGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "textPartSvPGroupText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Svenska"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartSvPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartSvPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartSvPGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "textSystemOneNewPGroupText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			}],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "En ny text"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textSystemOneNewPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textSystemOneNewPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textSystemOneNewPGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "textPartAlternativePGroupText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Alternativa översättningar"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartAlternativePGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartAlternativePGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartAlternativePGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "emptyTextIdTextVarText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Empty text id??"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/emptyTextIdTextVarText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/emptyTextIdTextVarText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/emptyTextIdTextVarText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "presentationVarIdText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Id"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationVarIdText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationVarIdText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationVarIdText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "textItemText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "text"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textItemText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "initialEmptyValueText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "-- Gör ett val ur listan --"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/initialEmptyValueText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/initialEmptyValueText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/initialEmptyValueText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "1Text"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Nästan kortaste möjliga id"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Almost shortest possible id"
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
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/1Text",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/1Text",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/1Text"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "presentationChildReferenceMinimizedRefText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			}],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Id på den minimierade barnpresentationen"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationChildReferenceMinimizedRefText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationChildReferenceMinimizedRefText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationChildReferenceMinimizedRefText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "recordTypePGroupText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Posttyp"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/recordTypePGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/recordTypePGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/recordTypePGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "recordInfoTextPGroupText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Textid"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/recordInfoTextPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/recordInfoTextPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/recordInfoTextPGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "outputFormatVarText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Format för output"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/outputFormatVarText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/outputFormatVarText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/outputFormatVarText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "presentationGroupIdText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Id"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationGroupIdText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationGroupIdText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationGroupIdText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "soundItemText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "ljud"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/soundItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/soundItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/soundItemText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "textPartDefaultPGroupText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Default"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartDefaultPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartDefaultPGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textPartDefaultPGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "inputItemText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "input"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/inputItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/inputItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/inputItemText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "outputItemText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "output"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/outputItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/outputItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/outputItemText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "textSystemOnePGroupText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "En text"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textSystemOnePGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textSystemOnePGroupText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/textSystemOnePGroupText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "videoItemText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "video"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/videoItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/videoItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/videoItemText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "defaultPresentationCollectionText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Presentation att visa initialt"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/defaultPresentationCollectionText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/defaultPresentationCollectionText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/defaultPresentationCollectionText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "downloadItemText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "nedladdning"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/downloadItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/downloadItemText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/downloadItemText"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "presentationChildReferenceRefText"
									}, {
										"name" : "type",
										"value" : "textSystemOne"
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
					      			} ],
									"name" : "recordInfo"
								}, {
									"children" : [ {
										"name" : "text",
										"value" : "Id på barnpresentationen"
									} ],
									"name" : "textPart",
									"attributes" : {
										"type" : "default",
										"lang" : "sv"
									}
								} ],
								"name" : "text"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationChildReferenceRefText",
									"accept" : "application/vnd.cora.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.cora.record+json",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationChildReferenceRefText",
									"accept" : "application/vnd.cora.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://localhost:8080/therest/rest/record/textSystemOne/presentationChildReferenceRefText"
								}
							}
						}
					} ],
			"totalNo" : "30",
			"containDataOfType" : "text",
			"toNo" : "30"
		}
	};
	return coraTest;
}(CORATEST || {}));