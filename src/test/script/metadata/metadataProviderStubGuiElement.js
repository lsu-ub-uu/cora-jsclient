/*
 * Copyright 2019 Uppsala University Library
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

function MetadataProviderStubGuiElement() {
	

	this.getMetadataById = function(idToGet) {
		switch (idToGet) {
		case "pgGroupIdOneGuiElementLinkChild":
			return {
			"name" : "presentation",
			"attributes" : {
				"type" : "pGroup"
			},
			"children" : [ createRecordInfoJson("presentationGroup", idToGet) ].concat([ {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "groupIdOneTextChildTwoAttributes"
				} ],
				"name" : "presentationOf"
			}, {
				"name" : "childReferences",
				"children" : [ {
					"name" : "childReference",
					"repeatId" : "1",
					"children" : [ {
						"name" : "refGroup",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "guiElementLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "childGuiElementLink"
							} ],
							"attributes" : {
								"type" : "guiElement"
							}
						} ]
					}]
				} ]
			} ])
		};
case "pgGroupIdOneTextChildMinimized":
				return {
					"name": "presentation",
					"attributes": {
						"type": "pGroup"
					},
					"children": [createRecordInfoJson(idToGet)].concat([{
						"children": [{
							"name": "linkedRecordType",
							"value": "metadataGroup"
						}, {
							"name": "linkedRecordId",
							"value": "groupIdOneTextChildRepeat1to3"
						}],
						"name": "presentationOf"
					}, {
						"name": "childReferences",
						"children": [{
							"name": "childReference",
							"repeatId": "1",
							"children": [{
								"name": "refGroup",
								"repeatId": "0",
								"children": [{
									"name": "ref",
									"children": [{
										"name": "linkedRecordType",
										"value": "presentation"
									}, {
										"name": "linkedRecordId",
										"value": "pVarTextVariableId"
									}],
									"attributes": {
										"type": "presentation"
									}
								}]
							}, {
								"name": "refGroup",
								"repeatId": "1",
								"children": [{
									"name": "ref",
									"children": [{
										"name": "linkedRecordType",
										"value": "presentation"
									}, {
										"name": "linkedRecordId",
										"value": "pVarTextVariableIdOutput"
									}],
									"attributes": {
										"type": "presentation"
									}
								}]
							}, {
								"name": "textStyle",
								"value": "h1TextStyle"
							}, {
								"name": "childStyle",
								"value": "oneChildStyle"
							}]
						}]
					}])
				};
		case "childGuiElementLink":
			return {
				"name" : "guiElement",
				"attributes" : {
					"type" : "guiElementLink"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
				      "name": "url",
				      "value": "http://www.google.se"
				    },
				    {
				      "name": "elementText",
				      "children": [
				        {
				          "name": "linkedRecordType",
				          "value": "coraText"
				        },
				        {
				          "name": "linkedRecordId",
				          "value": "someTextToPresentAsLinkText"
				        }
				      ]
				    },
				    {
				      "name": "presentAs",
				      "value": "link"
				    } ])
			};

		case "groupIdOneTextChild":
				return {
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					},
					"children" : [ {
						"name" : "childReferences",
						"children" : [ createChildReferenceWithLinkedRecordTypeRefRepeatIdRepeatMinAndRepeatMax(
								"metadataTextVariable", "textVariableId", "0", "1", "1") ]
					}, {
					      "name": "nameInData",
					      "value": idToGet
					    }, {
					        "name": "textId",
					        "children": [
					          {
					            "name": "linkedRecordType",
					            "value": "coraText"
					          },
					          {
					            "name": "linkedRecordId",
					            "value": "textVariableIdText"
					          }
					        ]
					      },
					      {
					        "name": "defTextId",
					        "children": [
					          {
					            "name": "linkedRecordType",
					            "value": "coraText"
					          },
					          {
					            "name": "linkedRecordId",
					            "value": "textVariableIdText"
					          }
					        ]
					      } ]
				};
			
		case "textVariableId":
				return {
					"name" : "metadata",
					"children" : [ {
						"name" : "regEx",
						"value" : "^[0-9A-Öa-ö\\s!*.]{2,50}$"
					},
				    {
					      "name": "nameInData",
					      "value": idToGet
					    } ]
							.concat(createRecordInfoJson("metadataTextVariable",  idToGet)),
					"attributes" : {
						"type" : "textVariable"
					}
				};
		default:
			throw new Error("Id(" + idToGet + ") not found in stub");
	};

	}
	
	function createRecordInfoJson(recordType,id) {
		return {
			"name" : "recordInfo",
			"children" : [ {
				"name" : "id",
				"value" : id
			}, {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "recordType"
				}, {
					"name" : "linkedRecordId",
					"value" : recordType
				} ],
				"name" : "type"
			}, {
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
			} ]
		};
	}
	
	
	function createChildReferenceWithLinkedRecordTypeRefRepeatIdRepeatMinAndRepeatMax(
			refRecordType, ref, repeatId, repeatMin, repeatMax) {
		return {
			"name" : "childReference",
			"repeatId" : repeatId,
			"children" : [ 
				{
				"name" : "ref",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : refRecordType
				}, {
					"name" : "linkedRecordId",
					"value" : ref
				} ]
			}, {
				"name" : "repeatMin",
				"value" : repeatMin
			}, {
				"name" : "repeatMax",
				"value" : repeatMax
			} ]
		};
	}

}