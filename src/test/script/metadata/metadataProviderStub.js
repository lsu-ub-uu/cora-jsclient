/*
 * Copyright 2015, 2016, 2017 Olov McKie
 * Copyright 2015, 2017, 2018Uppsala University Library
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

function MetadataProviderStub() {
	// function createRecordInfoJson(id) {
	// return '{"recordInfo":{"children":[{"id":"' + id +
	// '"},{"type":"metadata"},'
	// + '{"createdBy":"userId"},{"updatedBy":"userId"}]}}';
	// }
	// function createNameInDataTextIdDefTextId(id) {
	// return '{"nameInData":"' + id + '"},{"textId":"' + id +
	// 'Text"},{"defTextId":"' + id
	// + 'DeffText"}';
	// }
	function createRecordInfoJson(id) {
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
					"value" : "metadataGroup"
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

	function createNameInDataTextIdDefTextId2(id) {
		return [ {
			"name" : "nameInData",
			"value" : id
		}, {
			"name" : "textId",
			"value" : id + "Text"
		}, {
			"name" : "defTextId",
			"value" : id + "DefText"
		} ];
	}

	function createNameInDataLinkedTextIdDefTextId2(id) {
		return [
				{
					"name" : "nameInData",
					"value" : id
				},
				{
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : id + "Text"
					} ],
					"actionLinks" : {
						"read" : {
							"requestMethod" : "GET",
							"rel" : "read",
							"url" : "http://localhost:8080/therest/rest/record/text/"
									+ id + "Text",
							"accept" : "application/vnd.uub.record+json"
						}
					},
					"name" : "textId"
				},
				{
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : id + "DefText"
					} ],
					"actionLinks" : {
						"read" : {
							"requestMethod" : "GET",
							"rel" : "read",
							"url" : "http://localhost:8080/therest/rest/record/text/"
									+ id + "DefText",
							"accept" : "application/vnd.uub.record+json"
						}
					},
					"name" : "defTextId"
				} ];
	}

	function createChildReferenceWithRefAndRepeatId1to1(refRecordType, ref,
			repeatId) {
		var attribute = "metadataGroup";
		if (refRecordType === "metadataCollectionVariable") {
			attribute = "collectionVariable";
		} else if (refRecordType === "metadataRecordLink") {
			attribute = "recordLink";
		} else if (refRecordType === "metadataResourceLink") {
			attribute = "resourceLink";
		} else if (refRecordType === "metadataTextVariable") {
			attribute = "textVariable";
		}
		else if (refRecordType === "metadataNumberVariable") {
			attribute = "numberVariable";
			}
		
		return createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
				refRecordType, ref, attribute, repeatId, "1", "1");
	}

	function createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
			refRecordType, ref, attribute, repeatId, repeatMin, repeatMax) {
		return {
			"name" : "childReference",
			"repeatId" : repeatId,
			"children" : [ 
				
				
				
				
				{
				"name" : "ref",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadata"
				}, {
					"name" : "linkedRecordId",
					"value" : ref
				} ]
			// ,
			// "attributes": {
			// "type": attribute
			// }
			}, {
				"name" : "repeatMin",
				"value" : repeatMin
			}, {
				"name" : "repeatMax",
				"value" : repeatMax
			} ]
		};
	}

	function createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(
			idToGet) {
		return [ createRecordInfoJson(idToGet) ]
				.concat(createNameInDataTextIdDefTextId2(idToGet));
	}

	function createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(
			idToGet) {
		return [ createRecordInfoJson(idToGet) ]
				.concat(createNameInDataLinkedTextIdDefTextId2(idToGet));
	}

	this.getMetadataById = function(idToGet) {
		if (idToGet === "textVariableId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "^[0-9A-Öa-ö\\s!*.]{2,50}$"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "textVariableId2") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}

			};
		}if (idToGet === "textVariableWithFinalValueId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "^[0-9A-Öa-ö\\s!*.]{2,50}$"
				} , {
			      "name": "finalValue",
			      "value": "someFinalValue"
			    }]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "yesNoUnknownVar") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "yesNoUnknownVar"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "yesNoUnknownVar"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "yesNoUnknownVarText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "yesNoUnknownVarDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataItemCollection"
					}, {
						"name" : "linkedRecordId",
						"value" : "yesNoUnknownCollection"
					} ],
					"name" : "refCollection"
				} ],
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "yesNoUnknownCollection") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "yesNoUnknownCollection"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "yesNoUnknownCollection"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "textSystemOne"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesNoUnknownText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "textSystemOne"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesNoUnknownDefText"
					} ]
				}, {
					"name" : "collectionItemReferences",
					"children" : [ {
						"name" : "ref",
						"repeatId" : "0",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionItem"
						}, {
							"name" : "linkedRecordId",
							"value" : "itemYes"
						} ]
					}, {
						"name" : "ref",
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionItem"
						}, {
							"name" : "linkedRecordId",
							"value" : "itemNo"
						} ]
					}, {
						"name" : "ref",
						"repeatId" : "2",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionItem"
						}, {
							"name" : "linkedRecordId",
							"value" : "itemUnknown"
						} ]
					} ]
				} ],
				"attributes" : {
					"type" : "itemCollection"
				}
			};
		}
		if (idToGet === "itemYes") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "itemYes"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "yes"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesDefText"
					} ]
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "recordTypeTypeChoice1") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "recordTypeTypeChoice1"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "aFinalValue"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesDefText"
					} ]
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "recordTypeTypeChoice2") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "recordTypeTypeChoice2"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "aOtherFinalValue"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesDefText"
					} ]
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "itemNo") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "itemNo"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "no"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemNoText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemNoDefText"
					} ]
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "itemUnknown") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "itemUnknown"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "unknown"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemUnknownText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemUnknownDefText"
					} ]
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "groupWithOneCollectionVarChildGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataCollectionVariable",
							"userSuppliedIdCollectionVar", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupWithOneCollectionVarChildAndOneTextChildGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataCollectionVariable",
							"trueFalseTrueIsFinalValueCollectionVar", "1"),
							 createChildReferenceWithRefAndRepeatId1to1(
										"metadataTextVariable", "textVariableId", "1")]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupWithOneCollectionVarChildAndOneTextChildNonMandatoryGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataCollectionVariable",
							"trueFalseTrueIsFinalValueCollectionVar", "1"),
							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable", "textVariableId", "textVariable", "1", "0", "1")]
				} ]
				.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupWithOneGroupWithCollectionVarChildAndOneTextChildNonMandatoryGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [  createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataGroup", "groupWithOneCollectionVarChildAndOneTextChildGroup", "group","1", "0", "1")]
				} ]
				.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataTextVariable", "textVariableId", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChild2") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataTextVariable", "textVariableId", "1") ]
				// }
				// ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId("groupIdOneTextChild"))
				// } ].concat([ createRecordInfoJson(idToGet)
				// ].concat(createNameInDataTextIdDefTextId2(idToGet)))
				} ]
						.concat([ createRecordInfoJson("groupIdOneTextChild") ]
								.concat(createNameInDataLinkedTextIdDefTextIdWithNameInDataAndId(
										"groupIdOneTextChild",
										"groupIdOneTextChild2")))
			};
		}
		if (idToGet === "groupIdOneNumberChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataNumberVariable", "numVariableId", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneNumberNotMandatoryChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataNumberVariable", "numVariableId",  "numberVariable","1",  "0", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "groupId1toXCollectionChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataGroup", "yesNoUnknownVar", "group", "1",
							"1", "X") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "groupInGroupOneTextChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataTextVariable", "groupIdOneTextChild", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "groupIdTwoTextChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "textVariableId",
									"1"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "textVariableId2",
									"1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdTwoTextChild1to1InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable", "groupIdTwoTextChild",
							"textVariable", "1", "1", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVariableIdRepeat1to3InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable", "textVariableId",
							"textVariable", "1", "1", "3") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdTwoTextChildRepeat1to5") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [
							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable", "textVariableId",
									"textVariable", "1", "1", "5"),
							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable", "textVariableId2",
									"textVariable", "1", "1", "5") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat1toX") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable", "textVariableId",
							"textVariable", "1", "1", "X") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat0to1") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable", "textVariableId",
							"textVariable", "1", "0", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat0toXPreviously0to1") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
						"metadataTextVariable", "textVariableId",
						"textVariable", "1", "0", "X") ]
				} ]
					.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("groupIdOneTextChildRepeat0to1"))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat1to3Previously0to1") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable", "textVariableId",
							"textVariable", "1", "1", "3") ]
				} ]
				.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("groupIdOneTextChildRepeat0to1"))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat3to3") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable", "textVariableId",
							"textVariable", "1", "3", "3") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat1to3") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable", "textVariableId",
							"textVariable", "1", "1", "3") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneChildGroupRepeat3to3") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable", "groupIdOneTextChild",
							"textVariable", "1", "3", "3") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "anAttribute") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "ref",
					"value" : "recordTypeTypeCollection"
				}, {
					"name" : "finalValue",
					"value" : "aFinalValue"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "groupIdOneTextChildOneAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"children" : [ {
								"repeatId" : "1",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionVariable"
								}, {
									"name" : "linkedRecordId",
									"value" : "anAttribute"
								} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						},
						{
							"name" : "childReferences",
							"children" : [

							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "textVariableId",
									"1") ]
						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupInGroupOneTextChildOneAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatId1to1(
							"metadataTextVariable",
							"groupIdOneTextChildOneAttribute", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "anOtherAttribute") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "ref",
					"value" : "recordTypeTypeCollection"
				}, {
					"name" : "finalValue",
					"value" : "aOtherFinalValue"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "groupIdOneTextChildTwoAttributes") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"children" : [ {
								"repeatId" : "1",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionVariable"
								}, {
									"name" : "linkedRecordId",
									"value" : "anAttribute"
								} ],
								"name" : "ref"
							}, {
								"repeatId" : "2",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionVariable"
								}, {
									"name" : "linkedRecordId",
									"value" : "anOtherAttribute"
								} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						},
						{
							"name" : "childReferences",
							"children" : [ createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "textVariableId",
									"1") ]
						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "groupInGroupOneTextChildTwoAttributes") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataTextVariable",
							"groupIdOneTextChildTwoAttributes", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "groupInGroupOneTextChildRepeat1to3OneAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable",
							"groupIdOneTextChildOneAttribute", "textVariable",
							"1", "1", "3") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable",
							"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
							"textVariable", "1", "1", "3") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable",
							"textVarRepeat1to3InGroupOneAttribute",
							"textVariable", "1", "0", "2") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOneAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"children" : [ {
								"repeatId" : "1",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionVariable"
								}, {
									"name" : "linkedRecordId",
									"value" : "anAttribute"
								} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						},
						{
							"name" : "childReferences",
							"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable", "textVar",
									"textVariable", "1", "1", "3") ]
						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupParentAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"children" : [ {
								"repeatId" : "1",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionVariable"
								}, {
									"name" : "linkedRecordId",
									"value" : "recordTypeParentCollectionVar"
								} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						},
						{
							"name" : "childReferences",
							"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable", "textVar",
									"textVariable", "1", "1", "3") ]
						} ]
						// .concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("textVarRepeat1to3InGroupOneAttribute"))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable",
									"textVarRepeat1to3InGroupOneAttribute",
									"textVariable", "1", "0", "2"),
							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable",
									"textVarRepeat1to3InGroupOtherAttribute",
									"textVariable", "1", "0", "2") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable",
									"textVarRepeat1to3InGroupOneAttribute",
									"textVariable", "1", "1", "1"),
							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable",
									"textVarRepeat1to3InGroupOtherAttribute",
									"textVariable", "1", "1", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupParentAttribute1toXInGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable",
							"textVarRepeat1to3InGroupParentAttribute",
							"textVariable", "1", "1", "X") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOtherAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"children" : [ {
								"repeatId" : "1",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionVariable"
								}, {
									"name" : "linkedRecordId",
									"value" : "anOtherAttribute"
								} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						},
						{
							"name" : "childReferences",
							"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"metadataTextVariable", "textVar",
									"textVariable", "1", "1", "3") ]
						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("textVarRepeat1to3InGroupOneAttribute"))
			};
		}
		if (idToGet === "textVar") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				},
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))

			};
		}

		if (idToGet === "brokenMetadataNoNameInData") {
			return {
				"name" : "metadata",
				"children" : [ {
					"nameInData_NOT_HERE" : "metadata"
				}, {
					"textId" : "metadataText"
				}, {
					"defTextId" : "metadataDeffText"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "recordTypeTypeCollectionVar"
						} ],
						"name" : "ref"
					} ],
					"name" : "attributeReferences"
				}, {
					"childReferences" : {
						"children" : [ {
							"childReference" : {
								"children" : [ {
									"ref" : "recordInfoNew"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "nameInData"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "textId"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "defTextId"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "attributeReferences"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "childReferences"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						} ]
					}
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "metadataNew") {
			return {
				"name" : "metadata",
				"children" : [ {
					"nameInData" : "metadata"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "recordTypeTypeCollectionVar"
						} ],
						"name" : "ref"
					} ],
					"name" : "attributeReferences"
				}, {
					"childReferences" : {
						"children" : [ {
							"childReference" : {
								"children" : [ {
									"ref" : "recordInfoNew"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "nameInData"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "textId"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "defTextId"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "attributeReferences"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "childReferences"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						} ]
					}
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "recordTypeOnlyMetadataIdChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataGroup", "metadataId", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "metadataId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "recordTypeOnlyMetadataIdPresentationViewIdChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextGroup", "metadataId", "1"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextGroup", "presentationViewId",
									"2") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "presentationViewId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "recordType") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextGroup", "metadataId", "1"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextGroup", "recordInfo", "2")

							,
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable",
									"presentationViewId", "3"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable",
									"presentationFormId", "4"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "newMetadataId",
									"5"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable",
									"newPresentationFormId", "6"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable",
									"listPresentationViewId", "7"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "searchMetadataId",
									"8"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable",
									"searchPresentationFormId", "9"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "userSuppliedId",
									"10"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "permissionKey",
									"11"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable",
									"selfPresentationViewId", "12") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))

			};

		}

		if (idToGet === "recordInfo") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataTextVariable", "id", "1") ]

				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "recordInfo2") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataTextVariable", "id", "1") ]

				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("recordInfo")),
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "recordInfoAttribute") {
			return {
				"name" : "metadata",
				"children" : [
						{
							"children" : [ {
								"repeatId" : "1",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionVariable"
								}, {
									"name" : "linkedRecordId",
									"value" : "anAttribute"
								} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						},
						{
							"name" : "childReferences",
							"children" : [ createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "id", "1") ]

						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("recordInfo")),
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "id") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "presentationFormId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "newMetadataId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "newPresentationFormId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "listPresentationViewId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "searchMetadataId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "searchPresentationFormId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "userSuppliedId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "^true$|^false$"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "permissionKey") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[A-Z\_]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "selfPresentationViewId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "recordTypeTypeCollection") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "recordTypeTypeCollection"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "recordTypeTypeCollection"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "textSystemOne"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesNoUnknownText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "textSystemOne"
					}, {
						"name" : "linkedRecordId",
						"value" : "itemYesNoUnknownDefText"
					} ]
				}, {
					"name" : "collectionItemReferences",
					"children" : [ {
						"name" : "ref",
						"repeatId" : "0",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionItem"
						}, {
							"name" : "linkedRecordId",
							"value" : "recordTypeTypeChoice1"
						} ]
					}, {
						"name" : "ref",
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionItem"
						}, {
							"name" : "linkedRecordId",
							"value" : "recordTypeTypeChoice2"
						} ]
					}
					// , {
					// "name" : "ref",
					// "repeatId" : "2",
					// "value" : "itemUnknown"
					// }
					]
				} ],
				"attributes" : {
					"type" : "itemCollection"
				}
			};
		}
		if (idToGet === "recordTypeTypeCollectionVar") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				},
				"children" : [ {
					"name" : "ref",
					"value" : "recordTypeTypeCollection"
				}, {
					"name" : "finalValue",
					"value" : "aFinalValue"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "recordTypeParentCollectionVar") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				},
				"children" : [ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataItemCollection"
					}, {
						"name" : "linkedRecordId",
						"value" : "recordTypeTypeCollection"
					} ],
					"name" : "refCollection"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId("recordTypeTypeCollectionVar"))
			};
		}
		if (idToGet === "metadata") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"children" : [ {
								"repeatId" : "1",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionVariable"
								}, {
									"name" : "linkedRecordId",
									"value" : "recordTypeTypeCollectionVar"
								} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						},
						{
							"name" : "childReferences",
							"children" : [
									createChildReferenceWithRefAndRepeatId1to1(
											"metadataTextGroup", "recordInfo",
											"1"),
									createChildReferenceWithRefAndRepeatId1to1(
											"metadataTextVariable",
											"nameInData", "2"),
									createChildReferenceWithRefAndRepeatId1to1(
											"metadataTextVariable", "textId",
											"3"),
									createChildReferenceWithRefAndRepeatId1to1(
											"metadataTextVariable",
											"defTextId", "4"),
									createChildReferenceWithRefAndRepeatId1to1(
											"attributeReferences", "5"),
									createChildReferenceWithRefAndRepeatId1to1(
											"metadataTextGroup",
											"childReferences", "6") ]

						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "nameInData") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "textId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "defTextId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "attributeReferences") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataTextVariable", "ref", "textVariable", "1",
							"1", "X") ]

				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "ref") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				},
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "childReferences") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metdataGroup", "childReference", "group", "1",
							"1", "X") ]

				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "childReference") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "ref", "1"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "repeatMin", "2"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "repeatMinKey", "3"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "repeatMax", "4"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "secret", "5"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "secretKey", "6"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "readOnly", "7"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "readOnlyKey", "8") ]

				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))

			};
		}
		if (idToGet === "repeatMin") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9\_]{1,3}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "repeatMinKey") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[A-Z\_]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "repeatMax") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9|X\_]{1,3}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "secret") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "^true$|^false$"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "secretKey") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[A-Z\_]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "readOnly") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "^true$|^false$"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "readOnlyKey") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[A-Z\_]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "presentationVarGroup") {
			return {
				"children" : [ {
					"name" : "nameInData",
					"value" : "presentation"
				}, {
					"children" : [ {
						"name" : "id",
						"value" : "presentationVarGroup"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataGroup"
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
					} ],
					"name" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "presentationVarGroupText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "presentationVarGroupDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadata"
							}, {
								"name" : "linkedRecordId",
								"value" : "recordInfoPVarGroup"
							} ]
						// "value" : "recordInfo"
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
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "presentationTypePVarCollectionVar"
						} ],
						"name" : "ref"
					} ],
					"name" : "attributeReferences"
				}, {
					"name" : "refParentId",
					"value" : "presentationGroup"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "presentationVarAttributeGroup") {
			return {
				"children" : [ {
					"name" : "nameInData",
					"value" : "presentation"
				}, {
					"children" : [ {
						"name" : "id",
						"value" : "presentationVarAttributeGroup"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataGroup"
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
					} ],
					"name" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "presentationVarGroupText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "presentationVarGroupDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadata"
							}, {
								"name" : "linkedRecordId",
								"value" : "recordInfoPVarAttributeGroup"
							} ]
						// "value" : "recordInfo"
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
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "presentationTypePVarCollectionVar"
						} ],
						"name" : "ref"
					} ],
					"name" : "attributeReferences"
				}, {
					"name" : "refParentId",
					"value" : "presentationGroup"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "idTextVar") {
			return {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "idTextVar"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataTextVariable"
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
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "nameInData",
					"value" : "id"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "idTextVarText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "idTextVarDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "recordInfoPVarGroup") {
			return {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "recordInfoPVarGroup"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataGroup"
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
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "nameInData",
					"value" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "recordInfoText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "recordInfoDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadata"
							}, {
								"name" : "linkedRecordId",
								"value" : "idPVarTextVar"
							} ],
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
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "recordInfoPVarAttributeGroup") {
			return {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "recordInfoPVarAttributeGroup"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataGroup"
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
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "nameInData",
					"value" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "recordInfoText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "recordInfoDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "anAttribute"
						} ],
						"name" : "ref"
					} ],
					"name" : "attributeReferences"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadata"
							}, {
								"name" : "linkedRecordId",
								"value" : "idPVarTextVar"
							} ]
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
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "groupIdOneRecordLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataRecordLink", "myLink", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneAbstractRecordLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
						"metadataRecordLink", "myAbstractLink", "1") ]
				} ]
					.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupId0to1RecordLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataRecordLink", "myLink", "recordLink", "1",
							"0", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myLink"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myLinkText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myLinkDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataTextVariable"
					} ],
					"name" : "linkedRecordType"
				} ]
			};
		}
		if (idToGet === "myAbstractLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myAbstractLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myAbstractLink"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myLinkText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myLinkDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadata"
					} ],
					"name" : "linkedRecordType"
				} ]
			};
		}
		if (idToGet === "groupIdOneRecordLinkWithAttributeChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataRecordLink", "myLinkWithAttribute", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myLinkWithAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myLinkWithAttribute"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myLinkWithAttribute"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myLinkText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myLinkDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataTextVariable"
					} ],
					"name" : "linkedRecordType"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "binaryTypeImageCollectionVar"
						} ],
						"name" : "ref"
					} ],
					"name" : "attributeReferences"
				} ]
			};
		}

		if (idToGet === "groupIdOneRecordLinkChildWithFinalValue") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataRecordLink", "myFinalValueLink", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myFinalValueLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myFinalValueLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myFinalValueLink"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myFinalValueLinkText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myFinalValueLinkDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataTextVariable"
					} ],
					"name" : "linkedRecordType"
				}, {
					"name" : "finalValue",
					"value" : "someInstance"
				} ]
			};
		}
		if (idToGet === "groupIdOneCollectionVarChildWithFinalValue") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataCollectionVariable", "binaryTypeGenericBinaryCollectionVar", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextVarChildWithFinalValue") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataTextVariable", "textVariableWithFinalValueId", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneChildOfBinaryRecordLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataRecordLink", "myChildOfBinaryLink",
							"recordLink", "one", "0", "X") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myChildOfBinaryLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myChildOfBinaryLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myChildOfBinaryLink"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myChildOfBinaryLinkText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myChildOfBinaryLinkDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "image"
					} ],
					"name" : "linkedRecordType"
				} ]
			};
		}
		if (idToGet === "groupIdOneChildOfBinaryRecordLinkChildRepeatMax2") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataRecordLink", "myChildOfBinaryLink",
							"recordLink", "one", "0", "2") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneBinaryRecordLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataRecordLink", "myBinaryLink", "recordLink",
							"one", "0", "X") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myBinaryLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myBinaryLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myBinaryLink"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myBinaryLinkText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myBinaryLinkDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "binary"
					} ],
					"name" : "linkedRecordType"
				} ]
			};
		}
		if (idToGet === "groupIdOneBinaryRecordNoDataDividerLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"metadataRecordLink", "myBinaryNoDataDividerLink",
							"recordLink", "one", "0", "X") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myBinaryNoDataDividerLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myBinaryNoDataDividerLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myBinaryNoDataDividerLink"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myBinaryNoDataDividerLinkText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myBinaryNoDataDividerLinkDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "noDataDividerBinary"
					} ],
					"name" : "linkedRecordType"
				} ]
			};
		}
		if (idToGet === "groupIdOneRecordLinkChildWithPath") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataRecordLink", "myPathLink", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myPathLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myPathLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myPathLink"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myPathLinkText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "myPathLinkDefText"
					} ],
					"name" : "defTextId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataTextVariable"
					} ],
					"name" : "linkedRecordType"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "name"
					}

					]
				} ]
			};
		}
		if (idToGet === "linkedRecordTypeTextVar") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "^[0-9A-Öa-ö\\s!*.]{2,50}$"
				} ]
						.concat([ createRecordInfoJson(idToGet) ]
								.concat(createNameInDataLinkedTextIdDefTextIdWithNameInDataAndId(
										"linkedRecordType", idToGet))),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		function createNameInDataTextIdDefTextIdWithNameInDataAndId(nameInData,
				id) {
			return [ {
				"name" : "nameInData",
				"value" : nameInData
			}, {
				"name" : "textId",
				"value" : id + "Text"
			}, {
				"name" : "defTextId",
				"value" : id + "DefText"
			} ];
		}

		function createNameInDataLinkedTextIdDefTextIdWithNameInDataAndId(
				nameInData, id) {
			return [ {
				"name" : "nameInData",
				"value" : nameInData
			}, {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "text"
				}, {
					"name" : "linkedRecordId",
					"value" : id + "Text"
				} ],
				"name" : "textId"
			}, {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "text"
				}, {
					"name" : "linkedRecordId",
					"value" : id + "DefText"
				} ],
				"name" : "defTextId"
			} ];
		}

		if (idToGet === "linkedRecordIdTextVar") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "^[0-9A-Öa-ö\\s!*.]{2,50}$"
				} ]
						.concat([ createRecordInfoJson(idToGet) ]
								.concat(createNameInDataLinkedTextIdDefTextIdWithNameInDataAndId(
										"linkedRecordId", idToGet))),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "linkedRepeatIdTextVar") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "^[0-9A-Öa-ö\\s!*.]{1,50}$"
				} ]
						.concat([ createRecordInfoJson(idToGet) ]
								.concat(createNameInDataTextIdDefTextIdWithNameInDataAndId(
										"linkedRepeatId", idToGet))),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "imageNewGroup") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "imageNewGroup"
									},
									{
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataGroup"
										} ],
										"name" : "type"
									},
									{
										"name" : "createdBy",
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "user"
										}, {
											"name" : "linkedRecordId",
											"value" : "userId"
										} ]
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									} ],
							"name" : "recordInfo"
						},
						{
							"name" : "nameInData",
							"value" : "binary"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "imageNewGroupText"
							} ],
							"name" : "textId"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "imageNewGroupDefText"
							} ],
							"name" : "defTextId"
						},
						{
							"name" : "refParentId",
							"value" : "imageGroup"
						},
						{
							"children" : [
									{
										"repeatId" : "3",
										"children" : [
												{
													"name" : "ref",
													"value" : "recordInfoCoraAutogeneratedNewGroup"
												}, {
													"name" : "repeatMin",
													"value" : "1"
												}, {
													"name" : "repeatMax",
													"value" : "1"
												} ],
										"name" : "childReference"
									}, {
										"repeatId" : "1",
										"children" : [ {
											"name" : "ref",
											"value" : "filenameTextVar"
										}, {
											"name" : "repeatMin",
											"value" : "1"
										}, {
											"name" : "repeatMax",
											"value" : "1"
										} ],
										"name" : "childReference"
									}, {
										"repeatId" : "2",
										"children" : [ {
											"name" : "ref",
											"value" : "filesizeTextVar"
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
								"repeatId" : "1",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionVariable"
								}, {
									"name" : "linkedRecordId",
									"value" : "binaryTypeImageCollectionVar"
								} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "binaryTypeImageCollectionVar") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "binaryTypeImageCollectionVar"
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									},
									{
										"children" : [
												{
													"name" : "linkedRecordType",
													"value" : "recordType"
												},
												{
													"name" : "linkedRecordId",
													"value" : "metadataCollectionVariable"
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
									} ],
							"name" : "recordInfo"
						}, {
							"name" : "nameInData",
							"value" : "type"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "binaryTypeImageCollectionVarText"
							} ],
							"name" : "textId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "binaryTypeImageCollectionVarDefText"
							} ],
							"name" : "defTextId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataItemCollection"
							}, {
								"name" : "linkedRecordId",
								"value" : "binaryTypeCollection"
							} ],
							"name" : "refCollection"
						}, {
							"name" : "refParentId",
							"value" : "binaryTypeCollectionVar"
						}, {
							"name" : "finalValue",
							"value" : "image"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "userSuppliedIdCollectionVar") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "userSuppliedIdCollectionVar"
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									},
									{
										"children" : [
												{
													"name" : "linkedRecordType",
													"value" : "recordType"
												},
												{
													"name" : "linkedRecordId",
													"value" : "metadataCollectionVariable"
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
									} ],
							"name" : "recordInfo"
						}, {
							"name" : "nameInData",
							"value" : "userSuppliedId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "userSuppliedIdCollectionVarText"
							} ],
							"name" : "textId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "userSuppliedIdCollectionVarDefText"
							} ],
							"name" : "defTextId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataItemCollection"
							}, {
								"name" : "linkedRecordId",
								"value" : "trueFalseCollection"
							} ],
							"name" : "refCollection"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "genericBinaryNewGroup") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "genericBinaryNewGroup"
									},
									{
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataGroup"
										} ],
										"name" : "type"
									},
									{
										"name" : "createdBy",
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "user"
										}, {
											"name" : "linkedRecordId",
											"value" : "userId"
										} ]
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									} ],
							"name" : "recordInfo"
						},
						{
							"name" : "nameInData",
							"value" : "binary"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "genericBinaryNewGroupText"
							} ],
							"name" : "textId"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "genericBinaryNewGroupDefText"
							} ],
							"name" : "defTextId"
						},
						{
							"name" : "refParentId",
							"value" : "genericBinaryGroup"
						},
						{
							"children" : [
									{
										"repeatId" : "0",
										"children" : [
												{
													"name" : "ref",
													"value" : "recordInfoCoraAutogeneratedNewGroup"
												}, {
													"name" : "repeatMin",
													"value" : "1"
												}, {
													"name" : "repeatMax",
													"value" : "1"
												} ],
										"name" : "childReference"
									}, {
										"repeatId" : "1",
										"children" : [ {
											"name" : "ref",
											"value" : "filenameTextVar"
										}, {
											"name" : "repeatMin",
											"value" : "1"
										}, {
											"name" : "repeatMax",
											"value" : "1"
										} ],
										"name" : "childReference"
									}, {
										"repeatId" : "2",
										"children" : [ {
											"name" : "ref",
											"value" : "filesizeTextVar"
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
						},
						{
							"children" : [ {
								"repeatId" : "1",
								"children" : [
										{
											"name" : "linkedRecordType",
											"value" : "metadataCollectionVariable"
										},
										{
											"name" : "linkedRecordId",
											"value" : "binaryTypeGenericBinaryCollectionVar"
										} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "numVariableId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "min",
					"value" : "0"
				}, 
				 {
					"name" : "max",
					"value" : "10"
				},
				{
					"name" : "warningMin",
					"value" : "2"
				}, 
				 {
					"name" : "warningMax",
					"value" : "8"
				}, 
				 {
					"name" : "numberOfDecimals",
					"value" : "0"
				}]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "numberVariable"
				}
			};
		}
		if (idToGet === "numVariableWithDecimalsId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "min",
					"value" : "0"
				}, 
				 {
					"name" : "max",
					"value" : "10"
				},
				{
					"name" : "warningMin",
					"value" : "2"
				}, 
				 {
					"name" : "warningMax",
					"value" : "8"
				}, 
				 {
					"name" : "numberOfDecimals",
					"value" : "2"
				}]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "numberVariable"
				}
			};
		}
		if (idToGet === "binaryTypeGenericBinaryCollectionVar") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "binaryTypeGenericBinaryCollectionVar"
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									},
									{
										"children" : [
												{
													"name" : "linkedRecordType",
													"value" : "recordType"
												},
												{
													"name" : "linkedRecordId",
													"value" : "metadataCollectionVariable"
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
									} ],
							"name" : "recordInfo"
						},
						{
							"name" : "nameInData",
							"value" : "type"
						},
						{
							"children" : [
									{
										"name" : "linkedRecordType",
										"value" : "text"
									},
									{
										"name" : "linkedRecordId",
										"value" : "binaryTypeGenericBinaryCollectionVarText"
									} ],
							"name" : "textId"
						},
						{
							"children" : [
									{
										"name" : "linkedRecordType",
										"value" : "text"
									},
									{
										"name" : "linkedRecordId",
										"value" : "binaryTypeGenericBinaryCollectionVarDefText"
									} ],
							"name" : "defTextId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataItemCollection"
							}, {
								"name" : "linkedRecordId",
								"value" : "binaryTypeCollection"
							} ],
							"name" : "refCollection"
						}, {
							"name" : "refParentId",
							"value" : "binaryTypeCollectionVar"
						}, {
							"name" : "finalValue",
							"value" : "genericBinary"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "noDataDividerBinaryNewGroup") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "noDataDividerBinaryNewGroup"
									},
									{
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataGroup"
										} ],
										"name" : "type"
									},
									{
										"name" : "createdBy",
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "user"
										}, {
											"name" : "linkedRecordId",
											"value" : "userId"
										} ]
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									} ],
							"name" : "recordInfo"
						},
						{
							"name" : "nameInData",
							"value" : "binary"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "noDataDividerBinaryNewGroupText"
							} ],
							"name" : "textId"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "noDataDividerBinaryNewGroupDefText"
							} ],
							"name" : "defTextId"
						},
						{
							"name" : "refParentId",
							"value" : "noDataDividerBinaryGroup"
						},
						{
							"children" : [ {
								"repeatId" : "0",
								"children" : [
										{
											"name" : "ref",
											"value" : "recordInfoNoDataDividerAutogeneratedNewGroup"
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
						},
						{
							"children" : [ {
								"repeatId" : "1",
								"children" : [
										{
											"name" : "linkedRecordType",
											"value" : "metadataCollectionVariable"
										},
										{
											"name" : "linkedRecordId",
											"value" : "binaryTypeGenericBinaryCollectionVar"
										} ],
								"name" : "ref"
							} ],
							"name" : "attributeReferences"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "trueFalseTrueIsFinalValueCollectionVar") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "trueFalseTrueIsFinalValueCollectionVar"
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									},
									{
										"children" : [
												{
													"name" : "linkedRecordType",
													"value" : "recordType"
												},
												{
													"name" : "linkedRecordId",
													"value" : "metadataCollectionVariable"
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
									} ],
							"name" : "recordInfo"
						},
						{
							"name" : "nameInData",
							"value" : "trueFalse"
						},
						{
							"children" : [
									{
										"name" : "linkedRecordType",
										"value" : "text"
									},
									{
										"name" : "linkedRecordId",
										"value" : "binaryTypeGenericBinaryCollectionVarText"
									} ],
							"name" : "textId"
						},
						{
							"children" : [
									{
										"name" : "linkedRecordType",
										"value" : "text"
									},
									{
										"name" : "linkedRecordId",
										"value" : "binaryTypeGenericBinaryCollectionVarDefText"
									} ],
							"name" : "defTextId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataItemCollection"
							}, {
								"name" : "linkedRecordId",
								"value" : "trueFalseCollection"
							} ],
							"name" : "refCollection"
						}, {
							"name" : "finalValue",
							"value" : "true"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "recordInfoCoraAutogeneratedNewGroup") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "recordInfoCoraAutogeneratedNewGroup"
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									}, {
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataGroup"
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
									} ],
							"name" : "recordInfo"
						},
						{
							"name" : "nameInData",
							"value" : "recordInfo"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "recordInfoCoraAutogeneratedNewText"
							} ],
							"name" : "textId"
						},
						{
							"children" : [
									{
										"name" : "linkedRecordType",
										"value" : "text"
									},
									{
										"name" : "linkedRecordId",
										"value" : "recordInfoCoraAutogeneratedNewDefText"
									} ],
							"name" : "defTextId"
						}, {
							"children" : [ {
								"repeatId" : "0",
								"children" : [ {
									"name" : "ref",
									"value" : "dataDividerCoraLink"
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
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "recordInfoNoDataDividerAutogeneratedNewGroup") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "recordInfoNoDataDividerAutogeneratedNewGroup"
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									}, {
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataGroup"
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
									} ],
							"name" : "recordInfo"
						},
						{
							"name" : "nameInData",
							"value" : "recordInfo"
						},
						{
							"children" : [
									{
										"name" : "linkedRecordType",
										"value" : "text"
									},
									{
										"name" : "linkedRecordId",
										"value" : "recordInfoCoraAutogeneratedNewDefText"
									} ],
							"name" : "textId"
						},
						{
							"children" : [
									{
										"name" : "linkedRecordType",
										"value" : "text"
									},
									{
										"name" : "linkedRecordId",
										"value" : "recordInfoNoDataDividerAutogeneratedNewDefText"
									} ],
							"name" : "defTextId"
						}, {
							"children" : [ {
								"repeatId" : "0",
								"children" : [ {
									"name" : "ref",
									"value" : "idTextVar"
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
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "dataDividerCoraLink") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "dataDividerCoraLink"
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									}, {
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataRecordLink"
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
									} ],
							"name" : "recordInfo"
						}, {
							"name" : "nameInData",
							"value" : "dataDivider"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "dataDividerCoraLinkText"
							} ],
							"name" : "textId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "dataDividerCoraLinkDefText"
							} ],
							"name" : "defTextId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "recordType"
							}, {
								"name" : "linkedRecordId",
								"value" : "system"
							} ],
							"name" : "linkedRecordType"
						}, {
							"name" : "finalValue",
							"value" : "cora"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				}
			};

		}
		if (idToGet === "trueFalseCollection") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "trueFalseCollection"
									},
									{
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataItemCollection"
										} ],
										"name" : "type"
									},
									{
										"name" : "createdBy",
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "user"
										}, {
											"name" : "linkedRecordId",
											"value" : "userId"
										} ]
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									} ],
							"name" : "recordInfo"
						}, {
							"name" : "nameInData",
							"value" : "trueFalseCollection"
						}, {
							"name" : "textId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "textSystemOne"
							}, {
								"name" : "linkedRecordId",
								"value" : "trueFalseCollectionText"
							} ]
						}, {
							"name" : "defTextId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "textSystemOne"
							}, {
								"name" : "linkedRecordId",
								"value" : "trueFalseCollectionDefText"
							} ]
						}, {
							"children" : [ {
								"repeatId" : "1",
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionItem"
								}, {
									"name" : "linkedRecordId",
									"value" : "falseItem"
								} ]
							}, {
								"repeatId" : "0",
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "metadataCollectionItem"
								}, {
									"name" : "linkedRecordId",
									"value" : "trueItem"
								} ]
							} ],
							"name" : "collectionItemReferences"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "itemCollection"
				}
			};
		}
		if (idToGet === "falseItem") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "falseItem"
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									}, {
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataItemCollection"
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
									} ],
							"name" : "recordInfo"
						}, {
							"name" : "nameInData",
							"value" : "false"
						}, {
							"name" : "textId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "coraText"
							}, {
								"name" : "linkedRecordId",
								"value" : "falseItemText"
							} ]
						}, {
							"name" : "defTextId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "coraText"
							}, {
								"name" : "linkedRecordId",
								"value" : "falseItemDefText"
							} ]
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "trueItem") {
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "trueItem"
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
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									}, {
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataCollectionItem"
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
									} ],
							"name" : "recordInfo"
						}, {
							"name" : "nameInData",
							"value" : "true"
						}, {
							"name" : "textId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "coraText"
							}, {
								"name" : "linkedRecordId",
								"value" : "trueItemText"
							} ]
						}, {
							"name" : "defTextId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "coraText"
							}, {
								"name" : "linkedRecordId",
								"value" : "trueItemDefText"
							} ]
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		// presentation

		switch (idToGet) {
		case "recordInfoPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoPGroup") ]
						.concat([ {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataGroup"
							}, {
								"name" : "linkedRecordId",
								"value" : "recordInfo"
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
											"value" : "presentation"
										}, {
											"name" : "linkedRecordId",
											"value" : "idTextOutputPVar"
										} ],
										"attributes" : {
											"type" : "presentation"
										}
									} ]
								}, {
									"name" : "textStyle",
									"value" : "h2TextStyle"
								}, {
									"name" : "childStyle",
									"value" : "fourChildStyle"
								} ]
							} ]
						} ])
			};

		case "recordInfoAttributePGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoAttributePGroup") ]
						.concat([ {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataGroup"
							}, {
								"name" : "linkedRecordId",
								"value" : "recordInfoAttribute"
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
											"value" : "presentation"
										}, {
											"name" : "linkedRecordId",
											"value" : "idTextOutputPVar"
										} ],
										"attributes" : {
											"type" : "pVar"
										}
									} ]
								}, {
									"name" : "textStyle",
									"value" : "h2TextStyle"
								}, {
									"name" : "childStyle",
									"value" : "fourChildStyle"
								} ]
							} ]
						} ])
			};
		case "idTextOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "idTextTextOutputPVar"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVariableId"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "pVarTextVariableId":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "pVarTextVariableId"
							} ]
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataTextVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "textVariableId"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataTextVariable/"
											+ "textVariableTextVar",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "input"
						}, {
							"name" : "emptyTextId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "enterTextHereText"
							} ]
						} ]
			};
		case "userSuppliedIdCollectionVarPCollVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pCollVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "userSuppliedIdCollectionVarPCollVar"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataCollectionVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "userSuppliedIdCollectionVar"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "emptyTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "initialEmptyValueText"
					} ]
				} ]
			};
		case "pNumVarNumVariableId":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pNumVar"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "pNumVarNumVariableId"
							} ]
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataNumberVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "numVariableId"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataNumberVariable/"
											+ "numVariableId",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "input"
						}]
			};
		case "pNumVarNumVariableIdOutput":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pNumVar"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "pNumVarNumVariableIdOutput"
							} ]
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataNumberVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "numVariableId"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataNumberVariable/"
											+ "numVariableId",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "output"
						}]
			};
		case "userSuppliedIdNoEmptyTextIdCollectionVarPCollVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pCollVar"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "userSuppliedIdNoEmptyTextIdCollectionVarPCollVar"
							} ]
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataCollectionVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "userSuppliedIdCollectionVar"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataCollectionVariable/userSuppliedIdCollectionVar",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "input"
						} ]
			};
		case "userSuppliedIdCollectionVarOutputPCollVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pCollVar"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "userSuppliedIdCollectionVarOutputPCollVar"
							} ]
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataCollectionVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "userSuppliedIdCollectionVar"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataCollectionVariable/userSuppliedIdCollectionVar",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "output"
						} ]
			};
		case "textVariableIdShowTextAreaFalsePVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "textVariableIdShowTextAreaFalsePVar"
							} ]
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataTextVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "textVariableId"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataTextVariable/textVariableId",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "input"
						}, {
							"name" : "emptyTextId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "enterTextHereText"
							} ]
						}, {
							"name" : "showAsTextArea",
							"value" : "false"
						} ]
			};
		case "textVariableIdTextAreaPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "textVariableIdTextAreaPVar"
							} ]
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataTextVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "textVariableId"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataTextVariable/textVariableId",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "input"
						}, {
							"name" : "emptyTextId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "enterTextHereText"
							} ]
						}, {
							"name" : "inputType",
							"value" : "textarea"
						} ]
			};

		case "pVarTextVariableIdOutput":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVariableIdOutput"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVariableId"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "pVarTextVariableIdOutputImage":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVariableId"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVariableId"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "output"
				}, {
					"name" : "outputFormat",
					"value" : "image"
				} ]
			};
		case "pVarTextVariableIdInputPassword":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVariableId"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVariableId"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "inputFormat",
					"value" : "password"
				} ]
			};	

		case "yesNoUnknownPCollVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pCollVar"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "yesNoUnknownPCollVar"
							} ]
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataCollectionVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "yesNoUnknownVar"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataCollectionVariable/userSuppliedIdCollectionVar",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "input"
						}, {
							"name" : "emptyTextId",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "initialEmptyValueText"
							} ]
						} ]
			};
		case "yesNoUnknownNoEmptyTextIdPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "yesNoUnknownNoEmptyTextIdPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "yesNoUnknownVar"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};

		case "yesNoUnknownOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "yesNoUnknownOutputPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "yesNoUnknownVar"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};

		case "pVarTextVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVar"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVar"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};

		case "pVarTextVarOutput":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVarOutput"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVar"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "myChildOfBinaryPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myChildOfBinaryPLink"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataRecordLink"
					}, {
						"name" : "linkedRecordId",
						"value" : "myChildOfBinaryLink"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
		case "myBinaryPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myBinaryPLink"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataRecordLink"
					}, {
						"name" : "linkedRecordId",
						"value" : "myBinaryLink"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};

		case "myBinaryNoDataDividerPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myBinaryNoDataDividerPLink"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataRecordLink"
					}, {
						"name" : "linkedRecordId",
						"value" : "myBinaryNoDataDividerLink"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};

		case "pgGroupIdOneTextChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChild"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "pgGroupIdOneTextChildWithPresentationStyle":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChild"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "presentationStyle",
					"value" : "frame"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextChildOutput":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChild"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "groupOneTextChildOutputImagePGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChild"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "presentation"
								} ],
								"attributes" : {
									"type" : "pVar"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgGroupId1toXCollectionChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupId1toXCollectionChild"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "yesNoUnknownPCollVar"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "groupWithOneCollectionVarChildPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ]
						.concat([
								{
									"children" : [
											{
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											},
											{
												"name" : "linkedRecordId",
												"value" : "groupWithOneCollectionVarChildGroup"
											} ],
									"name" : "presentationOf"
								},
								{
									"name" : "childReferences",
									"children" : [
											{
												"name" : "childReference",
												"repeatId" : "1",
												"children" : [ {
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "textSystemOne"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "aHeadlineText"
																} ],
														"attributes" : {
															"type" : "text"
														}
													} ]
												} ]
											},
											{
												"name" : "childReference",
												"repeatId" : "2",
												"children" : [
														{
															"name" : "refGroup",
															"repeatId" : "0",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "presentation"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "userSuppliedIdCollectionVarPCollVar"
																		} ],
																"attributes" : {
																	"type" : "presentation"
																}
															} ]
														},
														{
															"name" : "textStyle",
															"value" : "h2TextStyle"
														},
														{
															"name" : "childStyle",
															"value" : "fourChildStyle"
														} ]
											} ]
								} ])
			};
		case "pgGroupIdOneTextOneTextChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChild"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextTwoTextChildren":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChild"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "presentation"
								} ],
								"attributes" : {
									"type" : "pVar"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextChildMinimized":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChildRepeat1to3"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "refGroup",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h1TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "oneChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextChildMinimizedDefault":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChild"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h5TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "twoChildStyle"
						} ]
					} ]
				} ])
			};
		case "pgGroupIdOneTextChildMinimizedDefaultNoStyleInfo":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChild"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "refGroup",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						} ]
					} ]
				} ])
			};
		case "pgGroupIdOneTextChildMinimizedDefaultNoStyleInfoMinNumberOfRepeatingToShow":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChild"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "minNumberOfRepeatingToShow",
							"value" : "1"
						} ]
					} ]
				} ])
			};
		case "pgGroupIdOneTextChildMinimizedDefaultModeInput":
			return {
			"name" : "presentation",
			"attributes" : {
				"type" : "pGroup"
			},
			"children" : [ createRecordInfoJson(idToGet) ].concat([ {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "groupIdOneTextChild"
				} ],
				"name" : "presentationOf"
			}, {
				"name" : "childReferences",
				"children" : [ {
					"name" : "childReference",
					"repeatId" : "1",
					"children" : [ {
						"name" : "refGroup",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "presentation"
							}, {
								"name" : "linkedRecordId",
								"value" : "pVarTextVariableIdOutput"
							} ],
							"attributes" : {
								"type" : "presentation"
							}
						} ]
					}, {
						"name" : "refGroup",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "presentation"
							}, {
								"name" : "linkedRecordId",
								"value" : "pVarTextVariableId"
							} ],
							"attributes" : {
								"type" : "presentation"
							}
						} ]
					}, {
						"name" : "minNumberOfRepeatingToShow",
						"value" : "1"
					} ]
				} ]
			},{
				"name" : "mode",
				"value" : "input"
			} ])
		};
		case "pgGroupIdOneTextChildMinimizedDefaultModeOutput":
			return {
			"name" : "presentation",
			"attributes" : {
				"type" : "pGroup"
			},
			"children" : [ createRecordInfoJson(idToGet) ].concat([ {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "groupIdOneTextChild"
				} ],
				"name" : "presentationOf"
			}, {
				"name" : "childReferences",
				"children" : [ {
					"name" : "childReference",
					"repeatId" : "1",
					"children" : [ {
						"name" : "refGroup",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "presentation"
							}, {
								"name" : "linkedRecordId",
								"value" : "pVarTextVariableIdOutput"
							} ],
							"attributes" : {
								"type" : "presentation"
							}
						} ]
					}, {
						"name" : "refGroup",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "presentation"
							}, {
								"name" : "linkedRecordId",
								"value" : "pVarTextVariableId"
							} ],
							"attributes" : {
								"type" : "presentation"
							}
						} ]
					}, {
						"name" : "minNumberOfRepeatingToShow",
						"value" : "1"
					} ]
				} ]
			},{
				"name" : "mode",
				"value" : "output"
			} ])
		};

		case "pVarTextVariableId2":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVariableId2"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVariableId2"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};

		case "pgGroupIdTwoTextChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdTwoTextChild"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						},{
			                  "name": "addText",
			                  "children": [
			                    {
			                      "name": "linkedRecordType",
			                      "value": "coraText"
			                    },
			                    {
			                      "name": "linkedRecordId",
			                      "value": "someTextIdForAddText"
			                    }
			                  ]
			                } ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId2"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

			// groupInGroupOneTextChild
		case "pgGroupInGroupIdOneTextOneTextChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupInGroupOneTextChild"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pgGroupIdOneTextOneTextChild"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOneAttribute":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVarRepeat1to3InGroupOneAttribute"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "refTextVarPVar"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "pgTextVarRepeat1to3InGroupParentAttribute":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVarRepeat1to3InGroupParentAttribute"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVar"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOneAttributeMinimized":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVarRepeat1to3InGroupOneAttribute"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVarOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "pgTextVarRepeat1to3InGroupParentAttributeMinimized":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVarRepeat1to3InGroupParentAttribute"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVarOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOtherAttribute":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVarRepeat1to3InGroupOtherAttribute"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVar"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "pgTextVarRepeat1to3InGroupOtherAttributeAndMinimized":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVarRepeat1to3InGroupOtherAttribute"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVar"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "refGroup",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOtherAttributeMinimized":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVarRepeat1to3InGroupOtherAttribute"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ]
						.concat([
								{
									"children" : [
											{
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											},
											{
												"name" : "linkedRecordId",
												"value" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"
											} ],
									"name" : "presentationOf"
								},
								{
									"name" : "childReferences",
									"children" : [
											{
												"name" : "childReference",
												"repeatId" : "1",
												"children" : [
														{
															"name" : "refGroup",
															"repeatId" : "0",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "textSystemOne"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "aHeadlineText"
																		} ],
																"attributes" : {
																	"type" : "text"
																}
															} ]
														},
														{
															"name" : "textStyle",
															"value" : "h2TextStyle"
														},
														{
															"name" : "childStyle",
															"value" : "fourChildStyle"
														} ]
											},
											{
												"name" : "childReference",
												"repeatId" : "2",
												"children" : [
														{
															"name" : "refGroup",
															"repeatId" : "1",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "presentation"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "pgTextVarRepeat1to3InGroupOneAttributeMinimized"
																		} ],
																"attributes" : {
																	"type" : "presentation"
																}
															} ]
														},
														{
															"name" : "refGroup",
															"repeatId" : "0",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "presentation"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "pgTextVarRepeat1to3InGroupOneAttribute"
																		} ],
																"attributes" : {
																	"type" : "presentation"
																}
															} ]
														},

														{
															"name" : "textStyle",
															"value" : "h2TextStyle"
														},
														{
															"name" : "childStyle",
															"value" : "fourChildStyle"
														} ]
											},
											{
												"name" : "childReference",
												"repeatId" : "3",
												"children" : [
														{
															"name" : "refGroup",
															"repeatId" : "0",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "presentation"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "pgTextVarRepeat1to3InGroupOtherAttribute"
																		} ],
																"attributes" : {
																	"type" : "presentation"
																}
															} ]
														},
														{
															"name" : "refGroup",
															"repeatId" : "1",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "presentation"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "pgTextVarRepeat1to3InGroupOtherAttributeMinimized"
																		} ],
																"attributes" : {
																	"type" : "presentation"
																}
															} ]
														},
														{
															"name" : "textStyle",
															"value" : "h2TextStyle"
														},
														{
															"name" : "childStyle",
															"value" : "fourChildStyle"
														} ]
											} ]
								} ])
			};
		case "pgTextVarRepeat1to3InGroupParentAttribute1toXInGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ]
						.concat([
								{
									"children" : [
											{
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											},
											{
												"name" : "linkedRecordId",
												"value" : "textVarRepeat1to3InGroupParentAttribute1toXInGroup"
											} ],
									"name" : "presentationOf"
								},
								{
									"name" : "childReferences",
									"children" : [
											{
												"name" : "childReference",
												"repeatId" : "1",
												"children" : [
														{
															"name" : "refGroup",
															"repeatId" : "0",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "textSystemOne"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "aHeadlineText"
																		} ],
																"attributes" : {
																	"type" : "text"
																}
															} ]
														},
														{
															"name" : "textStyle",
															"value" : "h2TextStyle"
														},
														{
															"name" : "childStyle",
															"value" : "fourChildStyle"
														} ]
											},
											{
												"name" : "childReference",
												"repeatId" : "2",
												"children" : [
														{
															"name" : "refGroup",
															"repeatId" : "1",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "presentation"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "pgTextVarRepeat1to3InGroupParentAttributeMinimized"
																		} ],
																"attributes" : {
																	"type" : "presentation"
																}
															} ]
														},
														{
															"name" : "refGroup",
															"repeatId" : "0",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "presentation"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "pgTextVarRepeat1to3InGroupParentAttribute"
																		} ],
																"attributes" : {
																	"type" : "presentation"
																}
															} ]
														},
														{
															"name" : "textStyle",
															"value" : "h2TextStyle"
														},
														{
															"name" : "childStyle",
															"value" : "fourChildStyle"
														} ]
											} ]
								} ])
			};

		case "pgGroupIdOneTextOneTextChildTwoAttributes":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "pgGroupIdOneTextOneTextChildTwoAttributesNoTextStyle":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
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
							"children" : [
							// {
							// "name": "textStyle",
							// "value": "h2TextStyle"
							// },
							// {
							// "name": "childStyle",
							// "value": "fourChildStyle"
							// },
							{
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextTwoTextChildrenRepeat1toX":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChildRepeat1toX"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
			// groupIdOneTextChildRepeat1to3
		case "pgGroupIdOneTextTwoTextChildrenRepeat1to3":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChildRepeat1to3"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
			// groupIdOneTextChildRepeat3to3
		case "pgGroupIdOneTextTwoTextChildrenRepeat3to3":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChildRepeat3to3"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

			// pTextVariableIdRContainer
		case "pTextVariableIdRContainer":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "container",
					"repeat" : "this"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pTextVariableIdRContainer"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadata"
					}, {
						"name" : "linkedRecordId",
						"value" : "textVariableId"
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
									"value" : "coraText"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "refGroup",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableIdOutput"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ]
			};

		case "pgGroupIdRepeatingContainerRepeat1to3":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneTextChildRepeat1to3"
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
									"value" : "textSystemOne"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pTextVariableIdRContainer"
								} ],
								"attributes" : {
									"type" : "presentation",
									"repeat" : "this"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

			// groupIdTwoTextChild
			// pgGroupIdTwoTextChild
		case "pTextVariablePlus2SContainer":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "container",
					"repeat" : "children"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pTextVariablePlus2SContainer"
					} ]
				},
				{
					"name": "presentationsOf",
					"children": [{
                        "repeatId": "1",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadata"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "textVariableId"
                            }
                        ],
                        "name": "presentationOf"
                    },{
                        "repeatId": "2",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadata"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "textVariableId2"
                            }
                        ],
                        "name": "presentationOf"
                    }]
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
									"value" : "coraText"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pVarTextVariableId2"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ]
			};
		case "pTextVariablePlus2StyleSContainer":
			return {
			"name" : "presentation",
			"attributes" : {
				"type" : "container",
				"repeat" : "children"
			},
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "pTextVariablePlus2StyleSContainer"
				} ]
			}, {
				"name" : "presentationStyle",
				"value" : "withStyle"
			},
			{
				"name": "presentationsOf",
				"children": [{
					"repeatId": "1",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadata"
						},
						{
							"name": "linkedRecordId",
							"value": "textVariableId"
						}
						],
						"name": "presentationOf"
				},{
					"repeatId": "2",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadata"
						},
						{
							"name": "linkedRecordId",
							"value": "textVariableId2"
						}
						],
						"name": "presentationOf"
				}]
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
								"value" : "coraText"
							}, {
								"name" : "linkedRecordId",
								"value" : "aHeadlineText"
							} ],
							"attributes" : {
								"type" : "text"
							}
						} ]
					}, {
						"name" : "textStyle",
						"value" : "h2TextStyle"
					}, {
						"name" : "childStyle",
						"value" : "fourChildStyle"
					} ]
				}, {
					"name" : "childReference",
					"repeatId" : "2",
					"children" : [ {
						"name" : "refGroup",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "presentation"
							}, {
								"name" : "linkedRecordId",
								"value" : "pVarTextVariableId"
							} ],
							"attributes" : {
								"type" : "presentation"
							}
						} ]
					}, {
						"name" : "textStyle",
						"value" : "h2TextStyle"
					}, {
						"name" : "childStyle",
						"value" : "fourChildStyle"
					} ]
				}, {
					"name" : "childReference",
					"repeatId" : "3",
					"children" : [ {
						"name" : "refGroup",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "presentation"
							}, {
								"name" : "linkedRecordId",
								"value" : "pVarTextVariableId2"
							} ],
							"attributes" : {
								"type" : "presentation"
							}
						} ]
					}, {
						"name" : "textStyle",
						"value" : "h2TextStyle"
					}, {
						"name" : "childStyle",
						"value" : "fourChildStyle"
					} ]
				} ]
			} ]
		};

			// groupIdTwoTextChildRepeat1to5
			// "pTextVariablePlus2SContainer":

		case "pgGroupIdTwoTextChildSurrounding2TextPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdTwoTextChildRepeat1to5"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pTextVariablePlus2SContainer"
								} ],
								"attributes" : {
									"type" : "presentation",
									"repeat" : "children"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "groupWithSContainerPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdTwoTextChildRepeat1to5"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pTextVariablePlus2SContainer"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "groupWithSContainerAndAlternativeSContainerPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdTwoTextChildRepeat1to5"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pTextVariablePlus2SContainer"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						},  {
							"name" : "refGroup",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pTextVariablePlus2SContainer2"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "pTextVariablePlus2SContainer2":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "container",
					"repeat" : "children"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pTextVariablePlus2SContainer2"
					} ]
				}, {
					"name": "presentationsOf",
					"children": [{
                        "repeatId": "1",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadata"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "textVariableId"
                            }
                        ],
                        "name": "presentationOf"
                    },{
                        "repeatId": "2",
                        "children": [
                            {
                                "name": "linkedRecordType",
                                "value": "metadata"
                            },
                            {
                                "name": "linkedRecordId",
                                "value": "textVariableId2"
                            }
                        ],
                        "name": "presentationOf"
                    }]
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
									"value" : "coraText"
								}, {
									"name" : "linkedRecordId",
									"value" : "aHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pTextVariablePlus2SContainer"
								} ],
								"attributes" : {
									"type" : "presentation",
									"repeat" : "children"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ]
			};
		case "groupWithSContainerWithAddButtonTextPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdTwoTextChildRepeat1to5"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pTextVariablePlus2SContainer"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						},  {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						},{
			                  "name": "addText",
			                  "children": [
			                    {
			                      "name": "linkedRecordType",
			                      "value": "coraText"
			                    },
			                    {
			                      "name": "linkedRecordId",
			                      "value": "someTextIdForAddText"
			                    }
			                  ]
			                } ]
					} ]
				} ])
			};
		case "pgGroupIdTwoTextChildSurrounding2TextPGroup2":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdTwoTextChildRepeat1to5"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "pTextVariablePlus2SContainer2"
								} ],
								"attributes" : {
									"type" : "presentation",
									"repeat" : "children"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};

		case "asdfasdfsad":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myPGroup"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "myGroup"
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
									"value" : "coraText"
								}, {
									"name" : "linkedRecordId",
									"value" : "myHeadlineText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "myChildPVar"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "refGroup",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "myChildMinPGroup"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "refGroup",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "myChildPGroup"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						},

						{
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ]
			};
		case "myLinkNoPresentationOfLinkedRecordPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myLinkNoPresentationOfLinkedRecordPLink"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataRecordLink"
					}, {
						"name" : "linkedRecordId",
						"value" : "myLink"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
		case "myLinkNoPresentationOfLinkedRecordWithFinalValuePLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "myLinkNoPresentationOfLinkedRecordWithFinalValuePLink"
							} ]
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataRecordLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "myFinalValueLink"
							} ],
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "input"
						} ]
			};
		case "myLinkNoPresentationOfLinkedRecordChildOfBinary":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "myLinkNoPresentationOfLinkedRecordChildOfBinary"
							} ]
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataRecordLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "myChildOfBinaryLink"
							} ],
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "input"
						} ]
			};

		case "myLinkNoPresentationOfLinkedRecordWithSearchPLink":
			return {
				  "name": "presentation",
				  "children": [
				    {
				      "name": "recordInfo",
				      "children": [
				        {
				          "name": "id",
				          "value": "myLinkNoPresentationOfLinkedRecordWithSearchPLink"
				        },
				        {
				          "name": "type",
				          "children": [
				            {
				              "name": "linkedRecordType",
				              "value": "recordType"
				            },
				            {
				              "name": "linkedRecordId",
				              "value": "presentationRecordLink"
				            }
				          ]
				        },
				        {
				          "name": "dataDivider",
				          "children": [
				            {
				              "name": "linkedRecordType",
				              "value": "system"
				            },
				            {
				              "name": "linkedRecordId",
				              "value": "cora"
				            }
				          ]
				        }
				      ]
				    },
				    {
				      "name": "presentationOf",
				      "children": [
				        {
				          "name": "linkedRecordType",
				          "value": "metadataRecordLink"
				        },
				        {
				          "name": "linkedRecordId",
				          "value": "myLink"
				        }
				      ]
				    },
				    {
				      "name": "mode",
				      "value": "input"
				    },
				    {
				      "name": "search",
				      "children": [
				        {
				          "name": "linkedRecordType",
				          "value": "search"
				        },
				        {
				          "name": "linkedRecordId",
				          "value": "textSearch"
				        }
				      ]
				    }
				  ],
				  "attributes": {
				    "type": "pRecordLink"
				  }
				};
		case "myLinkNoPresentationOfLinkedRecordWithSearchNoRightToPerformSearchPLink":
			return {
			"name": "presentation",
			"children": [
				{
					"name": "recordInfo",
					"children": [
						{
							"name": "id",
							"value": "myLinkNoPresentationOfLinkedRecordWithSearchNoRightToPerformSearchPLink"
						},
						{
							"name": "type",
							"children": [
								{
									"name": "linkedRecordType",
									"value": "recordType"
								},
								{
									"name": "linkedRecordId",
									"value": "presentationRecordLink"
								}
								]
						},
						{
							"name": "dataDivider",
							"children": [
								{
									"name": "linkedRecordType",
									"value": "system"
								},
								{
									"name": "linkedRecordId",
									"value": "cora"
								}
								]
						}
						]
				},
				{
					"name": "presentationOf",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataRecordLink"
						},
						{
							"name": "linkedRecordId",
							"value": "myLink"
						}
						]
				},
				{
					"name": "mode",
					"value": "input"
				},
				{
					"name": "search",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "search"
						},
						{
							"name": "linkedRecordId",
							"value": "searchWithoutSearchLink"
						}
						]
				}
				],
				"attributes": {
					"type": "pRecordLink"
				}
		};
			case "myAbstractLinkNoPresentationOfLinkedRecordWithSearchPLink":
				return {
					"name": "presentation",
					"children": [
						{
							"name": "recordInfo",
							"children": [
								{
									"name": "id",
									"value": "myAbstractLinkNoPresentationOfLinkedRecordWithSearchPLink"
								},
								{
									"name": "type",
									"children": [
										{
											"name": "linkedRecordType",
											"value": "recordType"
										},
										{
											"name": "linkedRecordId",
											"value": "presentationRecordLink"
										}
									]
								},
								{
									"name": "dataDivider",
									"children": [
										{
											"name": "linkedRecordType",
											"value": "system"
										},
										{
											"name": "linkedRecordId",
											"value": "cora"
										}
									]
								}
							]
						},
						{
							"name": "presentationOf",
							"children": [
								{
									"name": "linkedRecordType",
									"value": "metadataRecordLink"
								},
								{
									"name": "linkedRecordId",
									"value": "myAbstractLink"
								}
							]
						},
						{
							"name": "mode",
							"value": "input"
						},
						{
							"name": "search",
							"children": [
								{
									"name": "linkedRecordType",
									"value": "search"
								},
								{
									"name": "linkedRecordId",
									"value": "metadataSearch"
								}
							]
						}
					],
					"attributes": {
						"type": "pRecordLink"
					}
				};
		case "myPathLinkNoPresentationOfLinkedRecordPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myPathLinkNoPresentationOfLinkedRecordPLink"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataRecordLink"
					}, {
						"name" : "linkedRecordId",
						"value" : "myPathLink"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
		case "myChildOfBinaryLinkPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myChildOfBinaryLinkPLink"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataRecordLink"
					}, {
						"name" : "linkedRecordId",
						"value" : "myChildOfBinaryLink"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
		case "myLinkNoPresentationOfLinkedRecordOutputPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "myLinkNoPresentationOfLinkedRecordOutputPLink"
							} ]
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataRecordLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "myLink"
							} ],
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "output"
						} ]
			};
		case "myPathLinkNoPresentationOfLinkedRecordOutputPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "myPathLinkNoPresentationOfLinkedRecordOutputPLink"
							} ]
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataRecordLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "myPathLink"
							} ],
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "output"
						} ]
			};
		case "myLinkPresentationOfLinkedRecordOutputPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myLinkPresentationOfLinkedRecordOutputPLink"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataRecordLink"
					}, {
						"name" : "linkedRecordId",
						"value" : "myLink"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "output"
				}, {
					"children": [
						{"repeatId": "1",
							"children": [
								{	"name": "presentedRecordType",
									"children": [
										{	"name": "linkedRecordType",
											"value": "recordType"
										},
										{	"name": "linkedRecordId",
											"value": "metadataTextVariable"
										}]
								},
								{	"name": "presentation",
									"children": [
										{	"name": "linkedRecordType",
											"value": "presentation"
										},
										{	"name": "linkedRecordId",
											"value": "metadataTextVariableViewPGroup"
										}]
								}],
							"name": "linkedRecordPresentation"
						}
					],
					"name": "linkedRecordPresentations"
				} ]
			};
		case "myLinkPresentationOfLinkedRecordInputPLink":
			return {
			"name" : "presentation",
			"attributes" : {
				"type" : "pRecordLink"
			},
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "myLinkPresentationOfLinkedRecordOutputPLink"
				} ]
			}, {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataRecordLink"
				}, {
					"name" : "linkedRecordId",
					"value" : "myLink"
				} ],
				"name" : "presentationOf"
			}, {
				"name" : "mode",
				"value" : "input"
			}, {
				"children": [
					{"repeatId": "1",
						"children": [
							{	"name": "presentedRecordType",
								"children": [
									{	"name": "linkedRecordType",
										"value": "recordType"
									},
									{	"name": "linkedRecordId",
										"value": "metadataTextVariable"
									}]
							},
							{	"name": "presentation",
								"children": [
									{	"name": "linkedRecordType",
										"value": "presentation"
									},
									{	"name": "linkedRecordId",
										"value": "metadataTextVariableViewPGroup"
									}]
							}],
							"name": "linkedRecordPresentation"
					}
					],
					"name": "linkedRecordPresentations"
			} ]
		};
		case "myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType"
							} ]
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataRecordLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "myLink"
							} ],
							"name" : "presentationOf"
						}, {
							"name" : "mode",
							"value" : "output"
						}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {	"name": "presentedRecordType",
								"children": [
									{	"name": "linkedRecordType",
										"value": "recordType"
									},
									{	"name": "linkedRecordId",
										"value": "NOTmetadataTextVariable"
									}]
							}, {	"name": "presentation",
								"children": [
									{	"name": "linkedRecordType",
										"value": "presentation"
									},
									{	"name": "linkedRecordId",
										"value": "metadataTextVariableViewPGroup"
									}]
							} ],
							"name" : "linkedRecordPresentation"
						} ],
						"name" : "linkedRecordPresentations"
					} ]
			};
		case "linkedRecordTypeOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRecordTypeOutputPVar"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "linkedRecordTypeTextVar"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "linkedRecordIdPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRecordIdPVar"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "linkedRecordIdTextVar"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "emptyTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "enterTextHereText"
					} ]
				} ]
			};
		case "linkedRecordIdOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRecordIdOutputPVar"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "linkedRecordIdTextVar"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
			case "linkedRecordTypePVar":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pVar"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "linkedRecordTypePVar"
						} ]
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataTextVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "linkedRecordTypeTextVar"
						} ],
						"name" : "presentationOf"
					}, {
						"name" : "mode",
						"value" : "input"
					}, {
						"name" : "emptyTextId",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "text"
						}, {
							"name" : "linkedRecordId",
							"value" : "enterTextHereText"
						} ]
					} ]
				};
		case "linkedRepeatIdPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRepeatIdPVar"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "linkedRepeatIdTextVar"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "emptyTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "enterTextHereText"
					} ]
				} ]
			};
		case "linkedRepeatIdOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRepeatIdOutputPVar"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "linkedRepeatIdTextVar"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "groupIdOneRecordLinkChildWithPathPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ]
						.concat([
								{
									"children" : [
											{
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											},
											{
												"name" : "linkedRecordId",
												"value" : "groupIdOneRecordLinkChildWithPath"
											} ],
									"name" : "presentationOf"
								},
								{
									"name" : "childReferences",
									"children" : [
											{
												"name" : "childReference",
												"repeatId" : "1",
												"children" : [
														{
															"name" : "refGroup",
															"repeatId" : "0",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "presentation"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "myPathLinkNoPresentationOfLinkedRecordPLink"
																		} ],
																"attributes" : {
																	"type" : "presentation"
																}
															} ]
														},
														{
															"name" : "textStyle",
															"value" : "h2TextStyle"
														},
														{
															"name" : "childStyle",
															"value" : "fourChildStyle"
														} ]
											},
											{
												"name" : "childReference",
												"repeatId" : "1",
												"children" : [
														{
															"name" : "refGroup",
															"repeatId" : "0",
															"children" : [ {
																"name" : "ref",
																"children" : [
																		{
																			"name" : "linkedRecordType",
																			"value" : "presentation"
																		},
																		{
																			"name" : "linkedRecordId",
																			"value" : "myPathLinkNoPresentationOfLinkedRecordOutputPLink"
																		} ],
																"attributes" : {
																	"type" : "presentation"
																}
															} ]
														},
														{
															"name" : "textStyle",
															"value" : "h2TextStyle"
														},
														{
															"name" : "childStyle",
															"value" : "fourChildStyle"
														} ]
											} ]
								} ])
			};
		case "groupIdOneChildOfBinaryRecordLinkChildPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "groupIdOneChildOfBinaryRecordLinkChild"
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
									"value" : "presentation"
								}, {
									"name" : "linkedRecordId",
									"value" : "myChildOfBinaryLinkPLink"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ]
						}, {
							"name" : "textStyle",
							"value" : "h2TextStyle"
						}, {
							"name" : "childStyle",
							"value" : "fourChildStyle"
						} ]
					} ]
				} ])
			};
		case "metadataTextVariableViewPGroup":
			return {
				"children" : [
						{
							"children" : [ {
								"name" : "id",
								"value" : "metadataTextVariableViewPGroup"
							}, {
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "recordType"
								}, {
									"name" : "linkedRecordId",
									"value" : "presentationGroup"
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
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "system"
								}, {
									"name" : "linkedRecordId",
									"value" : "cora"
								} ],
								"name" : "dataDivider"
							} ],
							"name" : "recordInfo"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataGroup"
							}, {
								"name" : "linkedRecordId",
								"value" : "metadataTextVariableGroup"
							} ],
							"name" : "presentationOf"
						},
						{
							"children" : [
									{
										"repeatId" : "0",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "presentation"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "recordInfoPGroup"
																} ],
														"attributes" : {
															"type" : "presentation"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "1",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "coraText"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "nameInDataTextVarText"
																} ],
														"attributes" : {
															"type" : "text"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "2",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "presentation"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "nameInDataTextVarOutputPVar"
																} ],
														"attributes" : {
															"type" : "presentation"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "3",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "coraText"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "textIdTextVarText"
																} ],
														"attributes" : {
															"type" : "text"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "4",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "presentation"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "textIdTextVarOutputPVar"
																} ],
														"attributes" : {
															"type" : "presentation"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "5",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "coraText"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "defTextIdTextVarText"
																} ],
														"attributes" : {
															"type" : "text"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "6",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "presentation"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "defTextIdTextVarOutputPVar"
																} ],
														"attributes" : {
															"type" : "presentation"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "7",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "coraText"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "everythingRegExpTextVarText"
																} ],
														"attributes" : {
															"type" : "text"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "8",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "presentation"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "everythingRegExpTextVarOutputPVar"
																} ],
														"attributes" : {
															"type" : "presentation"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "9",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "coraText"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "refParentIdTextVarText"
																} ],
														"attributes" : {
															"type" : "text"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "10",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "presentation"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "refParentIdTextVarOutputPVar"
																} ],
														"attributes" : {
															"type" : "presentation"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "11",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "coraText"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "finalValueTextVarText"
																} ],
														"attributes" : {
															"type" : "text"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									},
									{
										"repeatId" : "12",
										"children" : [
												{
													"name" : "refGroup",
													"repeatId" : "0",
													"children" : [ {
														"name" : "ref",
														"children" : [
																{
																	"name" : "linkedRecordType",
																	"value" : "presentation"
																},
																{
																	"name" : "linkedRecordId",
																	"value" : "finalValueTextVarOutputPVar"
																} ],
														"attributes" : {
															"type" : "presentation"
														}
													} ]
												}, {
													"name" : "textStyle",
													"value" : "h2TextStyle"
												}, {
													"name" : "childStyle",
													"value" : "fourChildStyle"
												} ],
										"name" : "childReference"
									} ],
							"name" : "childReferences"
						} ],
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				}
			};

			// TEXT
		case "recordInfoText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "recordInfoText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "recordInfoText"
					} ]
				} ]
			};
		case "textVariableIdText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "my2Text"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Exempel textvariabel"
					} ]
				} ]
			};

		case "textVariableIdDefText":
			return {
				"name" : "text",
				"children" : [
						{
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "my2Text"
							} ]
						},
						{
							"name" : "textPart",
							"attributes" : {
								"type" : "default",
								"lang" : "sv"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Detta är en exempeldefinition för en textvariabel."
							} ]
						},
						{
							"name" : "textPart",
							"attributes" : {
								"type" : "alternative",
								"lang" : "en"
							},
							"children" : [ {
								"name" : "text",
								"value" : "This is an example definition for a text variable."
							} ]
						} ]
			};
			

		case "aHeadlineText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "aHeadlineText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "En rubrik"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "A headline"
					} ]
				} ]
			};
		case "groupIdOneTextChildText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupIdOneTextChildText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupIdOneTextChildText"
					} ]
				} ]
			};
		case "groupIdOneTextChildDefText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupIdOneTextChildText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupIdOneTextChildText"
					} ]
				} ]
			};
		case "groupIdTwoTextChildRepeat1to5Text":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupIdTwoTextChildRepeat1to5Text"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupIdTwoTextChildRepeat1to5Text"
					} ]
				} ]
			};
		case "groupIdTwoTextChildRepeat1to5DefText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupIdTwoTextChildRepeat1to5DefText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupIdTwoTextChildRepeat1to5DefText"
					} ]
				} ]
			};
		case "groupIdOneTextChildRepeat1to3Text":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupIdOneTextChildRepeat1to3Text"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupIdOneTextChildRepeat1to3Text"
					} ]
				} ]
			};
		case "groupIdTwoTextChildRepeat1to3DefText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupIdTwoTextChildRepeat1to3DefText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupIdTwoTextChildRepeat1to3DefText"
					} ]
				} ]
			};
		case "groupIdTwoTextChildText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupIdTwoTextChildText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupIdTwoTextChildText"
					} ]
				} ]
			};
		case "groupIdTwoTextChildDefText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupIdTwoTextChildDefText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupIdTwoTextChildDefText"
					} ]
				} ]
			};
		case "textVarRepeat1to3InGroupOneAttributeText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textVarRepeat1to3InGroupOneAttributeText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "textVarRepeat1to3InGroupOneAttributeText"
					} ]
				} ]
			};
		case "textVarRepeat1to3InGroupOneAttributeDefText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textVarRepeat1to3InGroupOneAttributeDefText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "textVarRepeat1to3InGroupOneAttributeDefText"
					} ]
				} ]
			};
		case "groupInGroupOneTextChildText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupInGroupOneTextChildText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupInGroupOneTextChildText"
					} ]
				} ]
			};
		case "groupInGroupOneTextChildDefText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "groupInGroupOneTextChildDefText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "groupInGroupOneTextChildDefText"
					} ]
				} ]
			};

		case "masterPResLink":
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "masterPResLink"
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
												"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									},
									{
										"children" : [
												{
													"name" : "linkedRecordType",
													"value" : "recordType"
												},
												{
													"name" : "linkedRecordId",
													"value" : "presentationResourceLink"
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
									} ],
							"name" : "recordInfo"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataResourceLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "masterResLink"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataResourceLink/masterResLink",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "outputFormat",
							"value" : "image"
						}, 
						
						{
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ 
									
									{
										"name" : "refGroup",
										"repeatId" : "0",
										"children" : [ {
											"name" : "ref",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationVar"
											}, {
												"name" : "linkedRecordId",
												"value" : "filenamePVar"
											} ],
											"attributes" : {
												"type" : "pVar"
											}
										} ]
									} 
									, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						}
						
						],
				"name" : "presentation",
				"attributes" : {
					"type" : "pResourceLink"
				}
			};
		case "masterPResLinkNoChildReferences":
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "masterPResLinkNoChildReferences"
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
												"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									},
									{
										"children" : [
												{
													"name" : "linkedRecordType",
													"value" : "recordType"
												},
												{
													"name" : "linkedRecordId",
													"value" : "presentationResourceLink"
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
									} ],
							"name" : "recordInfo"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataResourceLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "masterResLink"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataResourceLink/masterResLink",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "outputFormat",
							"value" : "image"
						} ],
				"name" : "presentation",
				"attributes" : {
					"type" : "pResourceLink"
				}
			};
		case "masterPResLinkDownloadOutputFormat":
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "masterPResLinkDownloadOutputFormat"
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
												"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									},
									{
										"children" : [
												{
													"name" : "linkedRecordType",
													"value" : "recordType"
												},
												{
													"name" : "linkedRecordId",
													"value" : "presentationResourceLink"
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
									} ],
							"name" : "recordInfo"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataResourceLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "masterResLink"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataResourceLink/masterResLink",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "outputFormat",
							"value" : "download"
						} ],
				"name" : "presentation",
				"attributes" : {
					"type" : "pResourceLink"
				}
			};
		case "masterPResLinkNoOutputFormat":
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "masterPResLinkNoOutputFormat"
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
												"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									},
									{
										"children" : [
												{
													"name" : "linkedRecordType",
													"value" : "recordType"
												},
												{
													"name" : "linkedRecordId",
													"value" : "presentationResourceLink"
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
									} ],
							"name" : "recordInfo"
						},
						{
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataResourceLink"
							}, {
								"name" : "linkedRecordId",
								"value" : "masterResLink"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/metadataResourceLink/masterResLink",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "presentationOf"
						}, {
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ 
									{
										"name" : "refGroup",
										"repeatId" : "0",
										"children" : [ {
											"name" : "ref",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationVar"
											}, {
												"name" : "linkedRecordId",
												"value" : "filenamePVar"
											} ],
											"attributes" : {
												"type" : "pVar"
											}
										} ]
									} 
									
									, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ],
				"name" : "presentation",
				"attributes" : {
					"type" : "pResourceLink"
				}
			};
		case "masterResLink":
			return {
				"children" : [
						{
							"children" : [
									{
										"name" : "id",
										"value" : "masterResLink"
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
												"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
												"accept" : "application/vnd.uub.record+json"
											}
										},
										"name" : "dataDivider"
									}, {
										"children" : [ {
											"name" : "linkedRecordType",
											"value" : "recordType"
										}, {
											"name" : "linkedRecordId",
											"value" : "metadataResourceLink"
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
									} ],
							"name" : "recordInfo"
						}, {
							"name" : "nameInData",
							"value" : "master"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "masterResLinkText"
							} ],
							"name" : "textId"
						}, {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "text"
							}, {
								"name" : "linkedRecordId",
								"value" : "masterResLinkDefText"
							} ],
							"name" : "defTextId"
						} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "resourceLink"
				}
			};
		case "metadataGroupForResourceLinkGroup":
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "streamIdTextVar",
									"1"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "filenameTextVar",
									"1"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "filesizeTextVar",
									"1"),
							createChildReferenceWithRefAndRepeatId1to1(
									"metadataTextVariable", "mimeTypeTextVar",
									"1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("metadataGroupForResourceLinkGroup"))
			};
		case "filenamePVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "filenamePVar"
					} ]
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataTextVariable"
					}, {
						"name" : "linkedRecordId",
						"value" : "filenameTextVar"
					} ],
					"name" : "presentationOf"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "streamIdTextVar":
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				},
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("streamId"))

			};
		case "filenameTextVar":
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				},
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("filename"))

			};
		case "filesizeTextVar":
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				},
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("filesize"))
			};
		case "mimeTypeTextVar":
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				},
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("mimeType"))
			};
		case "groupIdOneResourceLinkChild":
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"metadataRecordLink", "masterResLink", "1") ]
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndLinkedTextIdAndDefTextId("groupIdOneResourceLinkChild"))
			};
		case "textPartDefaultGroup":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textPartDefaultGroup"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataGroup"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "textPart"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartDefaultGroupText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartDefaultGroupDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "refParentId",
					"value" : "textPartGroup"
				}, {
					"children" : [ {
						"repeatId" : "0",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "textPartTypeDefaultCollectionVar"
						} ],
						"name" : "ref"
					}, {
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "systemLanguagesCollectionVar"
						} ],
						"name" : "ref"
					} ],
					"name" : "attributeReferences"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"children" : [ {
							"name" : "ref",
							"value" : "textTextVar"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"repeatId" : "1"
					} ]
				} ],
				"attributes" : {
					"type" : "group"
				}
			};
		case "textPartTypeDefaultCollectionVar":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textPartTypeDefaultCollectionVar"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataCollectionVariable"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "type"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartTypeDefaultCollectionVarText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartTypeDefaultCollectionVarDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "refCollection",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataItemCollection"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartTypeCollection"
					} ]
				}, {
					"name" : "refParentId",
					"value" : "textPartTypeCollectionVar"
				}, {
					"name" : "finalValue",
					"value" : "default"
				} ],
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		case "systemLanguagesCollectionVar":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "systemLanguagesCollectionVar"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataCollectionVariable"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "lang"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguagesCollectionVarText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguagesCollectionVarDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "refCollection",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataItemCollection"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguagesCollection"
					} ]
				} ],
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		case "systemLanguagesCollection":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "systemLanguagesCollection"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataItemCollection"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "systemLanguagesCollection"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "textSystemOne"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguagesCollectionTextId"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "textSystemOne"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguagesCollectionDefTextId"
					} ]
				}, {
					"name" : "collectionItemReferences",
					"children" : [ {
						"name" : "ref",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionItem"
						}, {
							"name" : "linkedRecordId",
							"value" : "svItem"
						} ],
						"repeatId" : "1"
					}, {
						"name" : "ref",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionItem"
						}, {
							"name" : "linkedRecordId",
							"value" : "enItem"
						} ],
						"repeatId" : "2"
					} ]
				} ],
				"attributes" : {
					"type" : "itemCollection"
				}
			};
		case "svItem":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "svItem"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataCollectionItem"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "sv"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "svItemText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "svItemDefText"
					} ]
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		case "enItem":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "enItem"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataCollectionItem"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "en"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "enItemText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "enItemDefText"
					} ]
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		case "recordInfoTextGroup":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "recordInfoTextGroup"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataGroup"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "recordInfoText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "recordInfoDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"children" : [ {
							"name" : "ref",
							"value" : "idTextTextVar"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"repeatId" : "1"
					}, {
						"name" : "childReference",
						"children" : [ {
							"name" : "ref",
							"value" : "typeTextVar"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"repeatId" : "2"
					}, {
						"name" : "childReference",
						"children" : [ {
							"name" : "ref",
							"value" : "createdByLink"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"repeatId" : "3"
					}, {
						"name" : "childReference",
						"children" : [ {
							"name" : "ref",
							"value" : "dataDividerLink"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"repeatId" : "4"
					} ]
				} ],
				"attributes" : {
					"type" : "group"
				}
			};
		case "textPartSvGroup":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textPartSvGroup"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataGroup"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "textPart"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartSvGroupText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartSvGroupDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "refParentId",
					"value" : "textPartDefaultGroup"
				}, {
					"children" : [ {
						"repeatId" : "0",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "textPartTypeDefaultCollectionVar"
						} ],
						"name" : "ref"
					}, {
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "systemLanguageSvCollectionVar"
						} ],
						"name" : "ref"
					} ],
					"name" : "attributeReferences"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"children" : [ {
							"name" : "ref",
							"value" : "textTextVar"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"repeatId" : "1"
					} ]
				} ],
				"attributes" : {
					"type" : "group"
				}
			};
		case "systemLanguageSvCollectionVar":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "systemLanguageSvCollectionVar"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataCollectionVariable"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "lang"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguageSvCollectionVarText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguageSvCollectionVarDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "refCollection",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataItemCollection"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguagesCollection"
					} ]
				}, {
					"name" : "refParentId",
					"value" : "systemLanguagesCollectionVar"
				}, {
					"name" : "finalValue",
					"value" : "sv"
				} ],
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		case "textPartEnGroup":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textPartEnGroup"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataGroup"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "textPart"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartEnGroupText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartEnGroupDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "refParentId",
					"value" : "textPartAlternativeGroup"
				}, {
					"children" : [ {
						"repeatId" : "0",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "textPartTypeAlternativeCollectionVar"
						} ],
						"name" : "ref"
					}, {
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataCollectionVariable"
						}, {
							"name" : "linkedRecordId",
							"value" : "systemLanguageEnCollectionVar"
						} ],
						"name" : "ref"
					} ],
					"name" : "attributeReferences"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"children" : [ {
							"name" : "ref",
							"value" : "textTextVar"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"repeatId" : "1"
					} ]
				} ],
				"attributes" : {
					"type" : "group"
				}
			};
		case "textPartTypeAlternativeCollectionVar":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textPartTypeAlternativeCollectionVar"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataCollectionVariable"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "type"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartTypeAlternativeCollectionVarText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartTypeAlternativeCollectionVarDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "refCollection",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataItemCollection"
					}, {
						"name" : "linkedRecordId",
						"value" : "textPartTypeCollection"
					} ]
				}, {
					"name" : "refParentId",
					"value" : "textPartTypeCollectionVar"
				}, {
					"name" : "finalValue",
					"value" : "alternative"
				} ],
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		case "systemLanguageEnCollectionVar":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "systemLanguageEnCollectionVar"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataCollectionVariable"
						} ],
						"name" : "type"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "12345"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ]
					} ]
				}, {
					"name" : "nameInData",
					"value" : "lang"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguageEnCollectionVarText"
					} ],
					"name" : "textId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "text"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguageEnCollectionVarDefText"
					} ],
					"name" : "defTextId"
				}, {
					"name" : "refCollection",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataItemCollection"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemLanguagesCollection"
					} ]
				}, {
					"name" : "refParentId",
					"value" : "systemLanguagesCollectionVar"
				}, {
					"name" : "finalValue",
					"value" : "en"
				} ],
				"attributes" : {
					"type" : "collectionVariable"
				}
			};

		default:
			throw new Error("Id(" + idToGet + ") not found in stub");
		}
	};

	this.getTextById = function() {
		return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "my2Text"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "Min andra text på svenska"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "alternative",
					"lang" : "en"
				},
				"children" : [ {
					"name" : "text",
					"value" : "My second text in english"
				} ]
			} ]
		};
	};
}