/*
 * Copyright 2015, 2016 Olov McKie
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

// begin workaround qunit does not report number of tests
var testCount = 0;
var qunitTest = QUnit.test;
QUnit.test = window.test = function() {
	testCount += 1;
	qunitTest.apply(this, arguments);
};
QUnit.begin(function(args) {
	args.totalTests = testCount;
});
// end workaround qunit does not report number of tests

QUnit.module("metadata/coraDataTest.js", {
	beforeEach : function() {
		this.firstChild = {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "1"
		};
		this.secondChild = {
			"name" : "textVariableId",
			"value" : "A Value2",
			"repeatId" : "2"
		};
		this.dataOneLevel = {
			"name" : "groupIdOneTextChild",
			"children" : [ this.firstChild, this.secondChild ]
		};
		this.coraData = CORA.coraData(this.dataOneLevel);

		this.firstChild2 = {
			"name" : "groupIdOneTextChildOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value1"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			}
		};
		this.secondChild2 = {
			"name" : "groupIdOneTextChildOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value2"
			} ],
			"attributes" : {
				"anAttribute2" : "aFinalValue2"
			}
		};
		this.thirdChild2 = {
			"name" : "groupIdOneTextChildOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value2"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue",
				"anAttribute2" : "aFinalValue2"
			}
		};
		this.fourthChild2 = {
			"name" : "groupIdOneTextChildOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value3"
			} ]
		};

		this.groupInGroupOneTextChildOneAttribute = {
			"name" : "groupInGroupOneTextChildOneAttribute",
			"children" : [ this.firstChild2 ]
		};
		this.coraDataWithAttribute = CORA.coraData(this.groupInGroupOneTextChildOneAttribute);

		this.firstChild3 = {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value1"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			},
			"repeatId" : "one"
		};
		this.secondChild3 = {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value2"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			}
		};
		this.thirdChild3 = {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value1"
			} ],
			"repeatId" : "one"
		};
		this.fourthChild3 = {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value1"
			} ]
		};
		this.fifthChild3 = {
			"name" : "groupIdOneTextChildOther",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value1"
			} ]
		};
		this.groupInGroupOneTextChildAllTypes = {
			"name" : "topGroupAll",
			"children" : [ this.firstChild3, this.secondChild3, this.thirdChild3,
					this.fourthChild3, this.fifthChild3 ]
		};
		this.coraDataWithAllTypes = CORA.coraData(this.groupInGroupOneTextChildAllTypes);

	},
	afterEach : function() {
	}
});

QUnit.test("testGetData", function(assert) {
	var dataFound = this.coraData.getData();
	assert.deepEqual(JSON.stringify(dataFound), JSON.stringify(this.dataOneLevel));
});

QUnit.test("testContainsChildWithNameInData", function(assert) {
	assert.ok(this.coraData.containsChildWithNameInData("textVariableId"));
});

QUnit.test("testContainsChildWithNameInDataNotFound", function(assert) {
	assert.notOk(this.coraData.containsChildWithNameInData("textVariableId_NOT_FOUND"));
});

QUnit.test("testGetFirstChildByNameInData", function(assert) {
	var firstChildFound = this.coraData.getFirstChildByNameInData("textVariableId");
	assert.stringifyEqual(firstChildFound, this.firstChild);
});

QUnit.test("testGetFirstChildByNameInDataNotFound", function(assert) {
	assert.throws(function() {
		this.coraData.getFirstChildByNameInData("textVariableId_NOT_FOUND");
	}, "Error");
});

QUnit.test("testGetFirstAtomicValueByNameInData", function(assert) {
	var firstChild = "A Value";
	var atomicValueFound = this.coraData.getFirstAtomicValueByNameInData("textVariableId");
	assert.stringifyEqual(atomicValueFound, firstChild);
});

QUnit.test("testGetNoOfChildrenWithNameInData", function(assert) {
	var noFound = this.coraData.getNoOfChildrenWithNameInData("textVariableId");
	assert.deepEqual(noFound, 2);
});

QUnit.test("testGetNoOfChildrenWithNameInDataNotFound", function(assert) {
	var noFound = this.coraData.getNoOfChildrenWithNameInData("textVariableId_NOT_FOUND");
	assert.deepEqual(noFound, 0);
});

QUnit.test("testGetNoOfChildrenWithNameInDataOne", function(assert) {
	var data = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "1"
		} ]
	};
	var coraData = CORA.coraData(data);
	var noFound = coraData.getNoOfChildrenWithNameInData("textVariableId");
	assert.deepEqual(noFound, 1);
});

QUnit.test("testContainsChildWithNameInDataAndAttribute", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

	assert.ok(this.coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
});
function createAttributes() {
	return {
		name: "attributes",
		children: []
	};
}

function createAttributeWithNameAndValueAndRepeatId(attributeName, attributeValue, repeatId) {
	return {
		name: "attribute",
		repeatId: repeatId || "1",
		children: [{
			name: "attributeName",
			value: attributeName
		}, {
			name: "attributeValue",
			value: attributeValue
		}]
	};
}
QUnit.test("testContainsChildWithNameInDataAndAttributeWrongAttributeName", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttributeNOT",
			"aFinalValue"));

	assert.notOk(this.coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
});

QUnit.test("testContainsChildWithNameInDataAndAttributeWrongAttributeValue", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValueNot"));

	assert.notOk(this.coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
});

QUnit.test("testContainsChildWithNameInDataAndAttributeOneAttributeToMany", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute2",
			"aFinalValue"));

	assert.notOk(this.coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
});

QUnit.test("testContainsChildWithNameInDataAndAttributeNoAttributes", function(assert) {
	var attributes = createAttributes();

	assert.notOk(this.coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
});

QUnit.test("testContainsChildWithNameInDataAndAttributeNoAttributesHolder", function(assert) {
	assert.notOk(this.coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", undefined));
});

QUnit.test("testContainsChildWithNameInDataAndAttributeButNoAttributeInMetadata", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

	assert.notOk(this.coraData.containsChildWithNameInDataAndAttributes("textVariableId",
			attributes));
});

QUnit.test("testContainsChildWithNameInDataAndAttributeNoAttributeInMetadataOrParameter",
		function(assert) {
			assert.ok(this.coraData.containsChildWithNameInDataAndAttributes("textVariableId",
					undefined));
		});

QUnit.test("testContainsChildWithNameInDataAndAttributeNoAttributeInMetadataEmptyAttributesHolder",
		function(assert) {
			var attributes = createAttributes();

			assert.ok(this.coraData.containsChildWithNameInDataAndAttributes("textVariableId",
					attributes));
		});

QUnit.test("testGetFirstChildByNameInDataAndAttribute", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

	var firstChildFound = this.coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes);
	assert.stringifyEqual(firstChildFound, this.firstChild2);
});

QUnit.test("testGetFirstChildByNameInDataAndAttributeWrongAttributeName", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttributeNOT",
			"aFinalValue"));

	assert.throws(function() {
		this.coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
	}, "Error");
});

QUnit.test("testGetFirstChildByNameInDataAndAttributeWrongAttributeValue", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValueNOT"));

	assert.throws(function() {
		this.coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
	}, "Error");
});

QUnit.test("testGetFirstChildByNameInDataAndAttributeOneAttributeToMany", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValueNOT"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute2",
			"aFinalValue"));

	assert.throws(function() {
		this.coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
	}, "Error");
});

QUnit.test("testgetFirstChildByNameInDataAndAttributeNoAttributes", function(assert) {
	var attributes = createAttributes();

	assert.throws(function() {
		this.coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
	}, "Error");
});

QUnit.test("testgetChildrenByNameInDataAndAttributeNoAttributes", function(assert) {
	var attributes = createAttributes();

	assert.throws(function() {
		this.coraDataWithAttribute.getChildrenByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
	}, "Error");
});

QUnit.test("testGetFirstChildByNameInDataAndAttributeButNoAttributeInMetadata", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

	assert.throws(function() {
		this.coraData.getFirstChildByNameInDataAndAttributes("textVariableId", attributes);
	}, "Error");
});

QUnit.test("testGetFirstChildByNameInDataAndAttributeNoAttributeInMetadataEmptyAttributesHolder",
		function(assert) {
			var attributes = createAttributes();
			var firstChildFound = this.coraData.getFirstChildByNameInDataAndAttributes(
					"textVariableId", attributes);
			assert.stringifyEqual(firstChildFound, this.firstChild);
		});

QUnit.test("testGetChildrenByNameInData", function(assert) {
	var children = this.coraDataWithAttribute.getChildrenByNameInData(
			"groupIdOneTextChildOneAttribute");
	assert.stringifyEqual(children, [ this.firstChild2 ]);
});

QUnit.test("testGetChildrenByNameInDataNameNotFound", function(assert) {
	assert.throws(function() {
		this.coraDataWithAttribute.getChildrenByNameInData("groupIdOneTextChildOneAttributeNOT");
	}, "Error");
});

QUnit.test("testGetChildrenByNameInDataAndAttribute", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

	var children = this.coraDataWithAttribute.getChildrenByNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes);
	assert.stringifyEqual(children, [ this.firstChild2 ]);
});

QUnit.test("testContainsChildWithNameInDataAndIndex", function(assert) {
	assert.ok(this.coraData.containsChildWithNameInDataAndIndex("textVariableId", 0));
});

QUnit.test("testContainsChildWithNameInDataAndIndex1", function(assert) {
	assert.ok(this.coraData.containsChildWithNameInDataAndIndex("textVariableId", 1));
});

QUnit.test("testContainsChildWithNameInDataAndIndex2", function(assert) {
	assert.notOk(this.coraData.containsChildWithNameInDataAndIndex("textVariableId", 2));
});

QUnit.test("testContainsChildWithNameInDataAndIndexNotFound", function(assert) {
	assert.notOk(this.coraData.containsChildWithNameInDataAndIndex("textVariableId_NOT_FOUND", 1));
});

QUnit.test("testGetChildByNameInDataAndIndex", function(assert) {
	var firstChildFound = this.coraData.getChildByNameInDataAndIndex("textVariableId", 0);
	assert.stringifyEqual(firstChildFound, this.firstChild);
});

QUnit.test("testGetChildByNameInDataAndIndex1", function(assert) {
	var firstChildFound = this.coraData.getChildByNameInDataAndIndex("textVariableId", 1);
	assert.stringifyEqual(firstChildFound, this.secondChild);
});

QUnit.test("testGetChildByNameInDataAndIndexNotFound", function(assert) {
	assert.throws(function() {
		this.coraData.getChildByNameInDataAndIndex("textVariableId_NOT_FOUND", 1);
	}, "Error");
});

QUnit.test("testGetAtomicValueByNameInDataAndIndex1", function(assert) {
	assert.deepEqual("A Value", this.coraData.getAtomicValueByNameInDataAndIndex("textVariableId",
			0));
});

QUnit.test("testContainsChildWithNameInDataAndRepeatId", function(assert) {
	assert.ok(this.coraData.containsChildWithNameInDataAndRepeatId("textVariableId", "1"));
});

QUnit.test("testContainsChildWithNameInDataButWrongRepeatId", function(assert) {
	assert.notOk(this.coraData.containsChildWithNameInDataAndRepeatId("textVariableId", "1NOT"));
});

QUnit.test("testGetChildByNameInDataAndRepeatId",
		function(assert) {
			var firstChildFound = this.coraData.getFirstChildByNameInDataAndRepeatId(
					"textVariableId", "1");
			assert.stringifyEqual(firstChildFound, this.firstChild);
		});

QUnit.test("testGetChildByNameInDataAndRepeatIdNotFound", function(assert) {
	assert.throws(function() {
		this.coraData.getFirstChildByNameInDataAndRepeatId("textVariableId", "1NOT");
	}, "Error");
});

QUnit.test("testGetChildByNameInDataAndRepeatIdNotFound2", function(assert) {
	assert.throws(function() {
		this.coraData.getFirstChildByNameInDataAndRepeatId("textVariableIdNOT", "1");
	}, "Error");
});

QUnit.test("testContainsChildAllTypes", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	assert.ok(this.coraDataWithAllTypes.containsChildWithNameInDataAndAttributesAndRepeatId(
			"groupIdOneTextChild", attributes, "one"));
});

QUnit.test("testContainsChildAllTypesWrongRepeatId", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	assert.notOk(this.coraDataWithAllTypes.containsChildWithNameInDataAndAttributesAndRepeatId(
			"groupIdOneTextChild", attributes, "oneNOT"));
});

QUnit.test("testContainsChildAllTypesWrongAttribute", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValueNOT"));
	assert.notOk(this.coraDataWithAllTypes.containsChildWithNameInDataAndAttributesAndRepeatId(
			"groupIdOneTextChild", attributes, "one"));
});

QUnit.test("testContainsChildAllTypesWrongNameInData", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	assert.notOk(this.coraDataWithAllTypes.containsChildWithNameInDataAndAttributesAndRepeatId(
			"groupIdOneTextChildNOT", attributes, "one"));
});

QUnit.test("testContainsChildAllTypesNotUsingRepeatId", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	assert.ok(this.coraDataWithAllTypes.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChild", attributes));
});

QUnit.test("testContainsChildAllTypesNotUsingAttributes", function(assert) {
	assert.ok(this.coraDataWithAllTypes.containsChildWithNameInDataAndRepeatId(
			"groupIdOneTextChild", "one"));
});

QUnit.test("testContainsChildAllTypesOnlyNameInData", function(assert) {
	assert.ok(this.coraDataWithAllTypes.containsChildWithNameInData("groupIdOneTextChild"));
});

QUnit.test("testGetFirstChildByNameInDataAndAttributesAndRepeatId", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	var firstChildFound = this.coraDataWithAllTypes
			.getFirstChildByNameInDataAndAttributesAndRepeatId("groupIdOneTextChild", attributes,
					"one");
	assert.stringifyEqual(firstChildFound, this.firstChild3);
});

QUnit.test("testGetFirstChildByNameInDataAndAttributesAndRepeatIdWrongSomething", function(assert) {
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

	assert.throws(function() {
		this.coraDataWithAllTypes.getFirstChildByNameInDataAndAttributesAndRepeatId(
				"groupIdOneTextChild", attributes, "oneNOT");
	}, "Error");
});
