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
"use strict";
QUnit.module("metadata/metadataHelperTest.js", {
	beforeEach : function() {
		this.metadataHelper = CORA.metadataHelper({
			"metadataProvider" : new MetadataProviderStub()
		})
	},
	afterEach : function() {
	}
});

QUnit.test("testNoAttributes", function(assert) {
	var attributesObject = this.metadataHelper
			.collectAttributesAsObjectForMetadataId("groupIdOneTextChild");
	assert.stringifyEqual(attributesObject, {});
});

QUnit.test("testOneAttributes", function(assert) {
	var expectedObject = {
		"anAttribute" : [ "aFinalValue" ]
	};
	var attributesObject = this.metadataHelper
			.collectAttributesAsObjectForMetadataId("groupIdOneTextChildOneAttribute");
	assert.stringifyEqual(attributesObject, expectedObject);
});

QUnit.test("testTwoAttributes", function(assert) {
	var expectedObject = {
		"anAttribute" : [ "aFinalValue" ],
		"anOtherAttribute" : [ "aOtherFinalValue" ]
	};
	var attributesObject = this.metadataHelper
			.collectAttributesAsObjectForMetadataId("groupIdOneTextChildTwoAttributes");
	assert.stringifyEqual(attributesObject, expectedObject);
});

QUnit.test("testAbstractAttributes", function(assert) {
	var expectedObject = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attributesObject = this.metadataHelper
			.collectAttributesAsObjectForMetadataId("textVarRepeat1to3InGroupParentAttribute");
	assert.stringifyEqual(attributesObject, expectedObject);
});

QUnit.test("testGetChildRefPartOfMetadata", function(assert) {
	var parentMetadata = {
		"name" : "metadata",
		"attributes" : {
			"type" : "group"
		},
		"children" : [ {
			"name" : "childReferences",
			"children" : [ {
				"name" : "childReference",
				"repeatId" : "1",
				"children" : [ {
					"name" : "ref",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataTextVariable"
						},
						{
							"name": "linkedRecordId",
							"value": "textVariableId"
						}
					],"attributes": {
						"type": "textVariable"
					}
				}, {
					"name" : "repeatMin",
					"value" : "1"
				}, {
					"name" : "repeatMax",
					"value" : "1"
				} ]
			} ]
		}, {
			"name" : "recordInfo",
			"children" : [ {
				"name" : "id",
				"value" : "groupIdOneTextChild"
			}, 
			 {
				"name" : "type",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "recordType"
					},
					{
						"name": "linkedRecordId",
						"value": "metadataGroup"
					}
				]
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
			}, {
				"name" : "updatedBy",
				"value" : "userId"
			} ]
		}, {
			"name" : "nameInData",
			"value" : "groupIdOneTextChild"
		}, {
			"name" : "textId",
			"value" : "groupIdOneTextChildText"
		}, {
			"name" : "defTextId",
			"value" : "groupIdOneTextChildDefText"
		} ]
	};

	var cParentMetadataChildRefPart = this.metadataHelper.getChildRefPartOfMetadata(CORA
			.coraData(parentMetadata), "textVariableId");
	var expectedData = {
		"name" : "childReference",
		"repeatId" : "1",
		"children" : [ {
			"name" : "ref",
			"children": [
				{
					"name": "linkedRecordType",
					"value": "metadataTextVariable"
				},
				{
					"name": "linkedRecordId",
					"value": "textVariableId"
				}
			],"attributes": {
				"type": "textVariable"
			}
		}, {
			"name" : "repeatMin",
			"value" : "1"
		}, {
			"name" : "repeatMax",
			"value" : "1"
		} ]
	};
	assert.stringifyEqual(cParentMetadataChildRefPart.getData(), expectedData);
});
QUnit.test("testGetChildRefPartOfMetadata2", function(assert) {
	var parentMetadata = {
		"children" : [ {
			"children" : [ {
				"name" : "id",
				"value" : "textSystemOneGroup"
			}, {
				"name" : "type",
				"value" : "metadataGroup"
			}, {
				"name" : "createdBy",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "user"
					},
					{
						"name": "linkedRecordId",
						"value": "12345"
					}
				]
			}, {
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
			"value" : "text"
		}, {
			"name" : "textId",
			"value" : "textSystemOneGroupText"
		}, {
			"name" : "defTextId",
			"value" : "textSystemOneGroupDefText"
		}, {
			"children" : [ {
				"repeatId" : "1",
				"children" : [ {
					"name" : "ref",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "recordInfoTextGroup"
						}
					],"attributes": {
						"type": "group"
					}
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
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "textPartSvGroup"
						}
					],"attributes": {
						"type": "group"
					}
				}, {
					"name" : "repeatMin",
					"value" : "1"
				}, {
					"name" : "repeatMax",
					"value" : "1"
				} ],
				"name" : "childReference"
			}, {
				"repeatId" : "3",
				"children" : [ {
					"name" : "ref",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "textPartEnGroup"
						}
					],"attributes": {
						"type": "group"
					}
				}, {
					"name" : "repeatMin",
					"value" : "0"
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

	var cParentMetadataChildRefPart = this.metadataHelper.getChildRefPartOfMetadata(CORA
			.coraData(parentMetadata), "textPartDefaultGroup");
	var expectedData = {
		"repeatId" : "2",
		"children" : [ {
			"name" : "ref",
			"children": [
				{
					"name": "linkedRecordType",
					"value": "metadataGroup"
				},
				{
					"name": "linkedRecordId",
					"value": "textPartSvGroup"
				}
			],"attributes": {
				"type": "group"
			}
		}, {
			"name" : "repeatMin",
			"value" : "1"
		}, {
			"name" : "repeatMax",
			"value" : "1"
		} ],
		"name" : "childReference"
	};
	assert.stringifyEqual(cParentMetadataChildRefPart.getData(), expectedData);
});

QUnit.test("testSameAttributeUndefined", function(assert) {
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(undefined, undefined));
});

QUnit.test("testSameAttributeOneUndefined", function(assert) {
	var attribute1 = {};
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(attribute1, undefined));
	var attribute2 = {};
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(undefined, attribute2));
});

QUnit.test("testSameAttributeEmpty", function(assert) {
	var attribute1 = {};
	var attribute2 = {};
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});

QUnit.test("testSameAttributeOneEmpty", function(assert) {
	var attribute1 = {
		"anAttribute" : [ "aFinalValue" ]
	};
	var attribute2 = {};
	assert.notOk(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});

QUnit.test("testfirstAttributesExistsInSecondame", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});

QUnit.test("testfirstAttributesExistsInSecondReversedAttributes", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aOtherFinalValue", "aFinalValue" ]
	};
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});

QUnit.test("testSameAttributeDifferentAttributeValues", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue" ]
	};
	assert.notOk(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferentAttributeValues2", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aOtherFinalValue" ]
	};
	assert.notOk(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferentAttributeValues3", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferentAttributeValues4", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferentAttributeValues5", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aOtherFinalValue", "aFinalValue" ]
	};
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferentAttributeValues6", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aOtherFinalValue", "aFinalValue" ]
	};
	assert.ok(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferent", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVarNOT" : [ "aFinalValue" ]
	};
	assert.notOk(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferentName", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVarNOT" : [ "aFinalValue" ]
	};
	assert.notOk(this.metadataHelper.firstAttributesExistsInSecond(attribute1, attribute2));
});
