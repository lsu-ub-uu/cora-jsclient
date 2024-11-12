/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2024 Uppsala University Library
 *
 * file is part of Cora.
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
QUnit.module("metadata/coraDataTest.js", hooks => {
	const test = QUnit.test;
	let firstChild;
	let secondChild;
	let dataOneLevel
	let coraData;
	let firstChild2;
	let groupInGroupOneTextChildOneAttribute;
	let coraDataWithAttribute;
	let firstChild3;
	let secondChild3;
	let thirdChild3;
	let fourthChild3;
	let fifthChild3;
	let groupInGroupOneTextChildAllTypes;
	let coraDataWithAllTypes;

	hooks.beforeEach(() => {
		firstChild = {
			name: "textletiableId",
			value: "A Value",
			repeatId: "1"
		};
		secondChild = {
			name: "textletiableId",
			value: "A Value2",
			repeatId: "2"
		};
		dataOneLevel = {
			name: "groupIdOneTextChild",
			children: [firstChild, secondChild]
		};
		coraData = CORA.coraData(dataOneLevel);

		firstChild2 = {
			name: "groupIdOneTextChildOneAttribute",
			children: [{
				name: "textletiableId",
				value: "A Value1"
			}],
			"attributes": {
				"anAttribute": "aFinalValue"
			}
		};

		groupInGroupOneTextChildOneAttribute = {
			name: "groupInGroupOneTextChildOneAttribute",
			children: [firstChild2]
		};
		coraDataWithAttribute = CORA.coraData(groupInGroupOneTextChildOneAttribute);

		firstChild3 = {
			name: "groupIdOneTextChild",
			children: [{
				name: "textletiableId",
				value: "A Value1"
			}],
			"attributes": {
				"anAttribute": "aFinalValue"
			},
			repeatId: "one"
		};
		secondChild3 = {
			name: "groupIdOneTextChild",
			children: [{
				name: "textletiableId",
				value: "A Value2"
			}],
			"attributes": {
				"anAttribute": "aFinalValue"
			}
		};
		thirdChild3 = {
			name: "groupIdOneTextChild",
			children: [{
				name: "textletiableId",
				value: "A Value1"
			}],
			repeatId: "one"
		};
		fourthChild3 = {
			name: "groupIdOneTextChild",
			children: [{
				name: "textletiableId",
				value: "A Value1"
			}]
		};
		fifthChild3 = {
			name: "groupIdOneTextChildOther",
			children: [{
				name: "textletiableId",
				value: "A Value1"
			}]
		};
		groupInGroupOneTextChildAllTypes = {
			name: "topGroupAll",
			children: [firstChild3, secondChild3, thirdChild3,
				fourthChild3, fifthChild3]
		};
		coraDataWithAllTypes = CORA.coraData(groupInGroupOneTextChildAllTypes);

	});

	test("testGetData", function(assert) {
		let dataFound = coraData.getData();
		assert.deepEqual(JSON.stringify(dataFound), JSON.stringify(dataOneLevel));
	});

	test("testContainsChildWithNameInData", function(assert) {
		assert.ok(coraData.containsChildWithNameInData("textletiableId"));
	});

	test("testContainsChildWithNameInDataNotFound", function(assert) {
		assert.notOk(coraData.containsChildWithNameInData("textletiableId_NOT_FOUND"));
	});

	test("testGetFirstChildByNameInData", function(assert) {
		let firstChildFound = coraData.getFirstChildByNameInData("textletiableId");
		assert.stringifyEqual(firstChildFound, firstChild);
	});

	test("testGetFirstChildByNameInDataNotFound", function(assert) {
		assert.throws(function() {
			coraData.getFirstChildByNameInData("textletiableId_NOT_FOUND");
		}, "Error");
	});

	test("testGetFirstAtomicValueByNameInData", function(assert) {
		let firstChild = "A Value";
		let atomicValueFound = coraData.getFirstAtomicValueByNameInData("textletiableId");
		assert.stringifyEqual(atomicValueFound, firstChild);
	});

	test("testGetNoOfChildrenWithNameInData", function(assert) {
		let noFound = coraData.getNoOfChildrenWithNameInData("textletiableId");
		assert.deepEqual(noFound, 2);
	});

	test("testGetNoOfChildrenWithNameInDataNotFound", function(assert) {
		let noFound = coraData.getNoOfChildrenWithNameInData("textletiableId_NOT_FOUND");
		assert.deepEqual(noFound, 0);
	});

	test("testGetNoOfChildrenWithNameInDataOne", function(assert) {
		let data = {
			name: "groupIdOneTextChild",
			children: [{
				name: "textletiableId",
				value: "A Value",
				repeatId: "1"
			}]
		};
		let coraData = CORA.coraData(data);
		let noFound = coraData.getNoOfChildrenWithNameInData("textletiableId");
		assert.deepEqual(noFound, 1);
	});

	test("testContainsChildWithNameInDataAndAttribute", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

		assert.ok(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
	});

	const createAttributes = function() {
		return {
			name: "attributes",
			children: []
		};
	};

	const createAttributeWithNameAndValueAndRepeatId = function(attributeName, attributeValue, repeatId) {
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
	};

	test("testContainsChildWithNameInDataAndAttributeWithValueList", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			["aFinalValue"]));

		assert.ok(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
	});

	test("testContainsChildWithNameInDataAndAttributeWithValueListTwoValuesCorrect", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			["someOtherValue", "aFinalValue"]));

		assert.ok(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
	});

	test("testContainsChildWithNameInDataAndAttributeWithValueListTwoValuesWrong", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			["someOtherValue", "aFinalValueNOT"]));

		assert.notOk(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
	});

	test("testContainsChildWithNameInDataAndAttributeWithValueListEmpty", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			[]));

		assert.notOk(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
	});

	test("testContainsChildWithNameInDataAndAttributeWrongAttributeName", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttributeNOT",
			"aFinalValue"));

		assert.notOk(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
	});

	test("testContainsChildWithNameInDataAndAttributeWrongAttributeValue", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValueNot"));

		assert.notOk(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
	});

	test("testContainsChildWithNameInDataAndAttributeOneAttributeToMany", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute2",
			"aFinalValue"));

		assert.notOk(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
	});

	test("testContainsChildWithNameInDataAndAttributeNoAttributes", function(assert) {
		let attributes = createAttributes();

		assert.notOk(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes));
	});

	test("testContainsChildWithNameInDataAndAttributeNoAttributesHolder", function(assert) {
		assert.notOk(coraDataWithAttribute.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", undefined));
	});

	test("testContainsChildWithNameInDataAndAttributeButNoAttributeInMetadata", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

		assert.notOk(coraData.containsChildWithNameInDataAndAttributes("textletiableId",
			attributes));
	});

	test("testContainsChildWithNameInDataAndAttributeNoAttributeInMetadataOrParameter",
		function(assert) {
			assert.ok(coraData.containsChildWithNameInDataAndAttributes("textletiableId",
				undefined));
		});

	test("testContainsChildWithNameInDataAndAttributeNoAttributeInMetadataEmptyAttributesHolder",
		function(assert) {
			let attributes = createAttributes();

			assert.ok(coraData.containsChildWithNameInDataAndAttributes("textletiableId",
				attributes));
		});

	test("testGetFirstChildByNameInDataAndAttribute", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

		let firstChildFound = coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes);
		assert.stringifyEqual(firstChildFound, firstChild2);
	});

	test("testGetFirstChildByNameInDataAndAttributeWrongAttributeName", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttributeNOT",
			"aFinalValue"));

		assert.throws(function() {
			coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
		}, "Error");
	});

	test("testGetFirstChildByNameInDataAndAttributeWrongAttributeValue", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValueNOT"));

		assert.throws(function() {
			coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
		}, "Error");
	});

	test("testGetFirstChildByNameInDataAndAttributeOneAttributeToMany", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValueNOT"));
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute2",
			"aFinalValue"));

		assert.throws(function() {
			coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
		}, "Error");
	});

	test("testgetFirstChildByNameInDataAndAttributeNoAttributes", function(assert) {
		let attributes = createAttributes();

		assert.throws(function() {
			coraDataWithAttribute.getFirstChildByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
		}, "Error");
	});

	test("testgetChildrenByNameInDataAndAttributeNoAttributes", function(assert) {
		let attributes = createAttributes();

		assert.throws(function() {
			coraDataWithAttribute.getChildrenByNameInDataAndAttributes(
				"groupIdOneTextChildOneAttribute", attributes);
		}, "Error");
	});

	test("testGetFirstChildByNameInDataAndAttributeButNoAttributeInMetadata", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

		assert.throws(function() {
			coraData.getFirstChildByNameInDataAndAttributes("textletiableId", attributes);
		}, "Error");
	});

	test("testGetFirstChildByNameInDataAndAttributeNoAttributeInMetadataEmptyAttributesHolder",
		function(assert) {
			let attributes = createAttributes();
			let firstChildFound = coraData.getFirstChildByNameInDataAndAttributes(
				"textletiableId", attributes);
			assert.stringifyEqual(firstChildFound, firstChild);
		});

	test("testGetChildrenByNameInData", function(assert) {
		let children = coraDataWithAttribute.getChildrenByNameInData(
			"groupIdOneTextChildOneAttribute");
		assert.stringifyEqual(children, [firstChild2]);
	});

	test("testGetChildrenByNameInDataNameNotFound", function(assert) {
		assert.throws(function() {
			coraDataWithAttribute.getChildrenByNameInData("groupIdOneTextChildOneAttributeNOT");
		}, "Error");
	});

	test("testGetChildrenByNameInDataAndAttribute", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

		let children = coraDataWithAttribute.getChildrenByNameInDataAndAttributes(
			"groupIdOneTextChildOneAttribute", attributes);
		assert.stringifyEqual(children, [firstChild2]);
	});

	test("testContainsChildWithNameInDataAndIndex", function(assert) {
		assert.ok(coraData.containsChildWithNameInDataAndIndex("textletiableId", 0));
	});

	test("testContainsChildWithNameInDataAndIndex1", function(assert) {
		assert.ok(coraData.containsChildWithNameInDataAndIndex("textletiableId", 1));
	});

	test("testContainsChildWithNameInDataAndIndex2", function(assert) {
		assert.notOk(coraData.containsChildWithNameInDataAndIndex("textletiableId", 2));
	});

	test("testContainsChildWithNameInDataAndIndexNotFound", function(assert) {
		assert.notOk(coraData.containsChildWithNameInDataAndIndex("textletiableId_NOT_FOUND", 1));
	});

	test("testGetChildByNameInDataAndIndex", function(assert) {
		let firstChildFound = coraData.getChildByNameInDataAndIndex("textletiableId", 0);
		assert.stringifyEqual(firstChildFound, firstChild);
	});

	test("testGetChildByNameInDataAndIndex1", function(assert) {
		let firstChildFound = coraData.getChildByNameInDataAndIndex("textletiableId", 1);
		assert.stringifyEqual(firstChildFound, secondChild);
	});

	test("testGetChildByNameInDataAndIndexNotFound", function(assert) {
		assert.throws(function() {
			coraData.getChildByNameInDataAndIndex("textletiableId_NOT_FOUND", 1);
		}, "Error");
	});

	test("testGetAtomicValueByNameInDataAndIndex1", function(assert) {
		assert.deepEqual("A Value", coraData.getAtomicValueByNameInDataAndIndex("textletiableId",
			0));
	});

	test("testContainsChildWithNameInDataAndRepeatId", function(assert) {
		assert.ok(coraData.containsChildWithNameInDataAndRepeatId("textletiableId", "1"));
	});

	test("testContainsChildWithNameInDataButWrongRepeatId", function(assert) {
		assert.notOk(coraData.containsChildWithNameInDataAndRepeatId("textletiableId", "1NOT"));
	});

	test("testGetChildByNameInDataAndRepeatId",
		function(assert) {
			let firstChildFound = coraData.getFirstChildByNameInDataAndRepeatId(
				"textletiableId", "1");
			assert.stringifyEqual(firstChildFound, firstChild);
		});

	test("testGetChildByNameInDataAndRepeatIdNotFound", function(assert) {
		assert.throws(function() {
			coraData.getFirstChildByNameInDataAndRepeatId("textletiableId", "1NOT");
		}, "Error");
	});

	test("testGetChildByNameInDataAndRepeatIdNotFound2", function(assert) {
		assert.throws(function() {
			coraData.getFirstChildByNameInDataAndRepeatId("textletiableIdNOT", "1");
		}, "Error");
	});

	test("testContainsChildAllTypes", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
		assert.ok(coraDataWithAllTypes.containsChildWithNameInDataAndAttributesAndRepeatId(
			"groupIdOneTextChild", attributes, "one"));
	});

	test("testContainsChildAllTypesWrongRepeatId", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
		assert.notOk(coraDataWithAllTypes.containsChildWithNameInDataAndAttributesAndRepeatId(
			"groupIdOneTextChild", attributes, "oneNOT"));
	});

	test("testContainsChildAllTypesWrongAttribute", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValueNOT"));
		assert.notOk(coraDataWithAllTypes.containsChildWithNameInDataAndAttributesAndRepeatId(
			"groupIdOneTextChild", attributes, "one"));
	});

	test("testContainsChildAllTypesWrongNameInData", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
		assert.notOk(coraDataWithAllTypes.containsChildWithNameInDataAndAttributesAndRepeatId(
			"groupIdOneTextChildNOT", attributes, "one"));
	});

	test("testContainsChildAllTypesNotUsingRepeatId", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
		assert.ok(coraDataWithAllTypes.containsChildWithNameInDataAndAttributes(
			"groupIdOneTextChild", attributes));
	});

	test("testContainsChildAllTypesNotUsingAttributes", function(assert) {
		assert.ok(coraDataWithAllTypes.containsChildWithNameInDataAndRepeatId(
			"groupIdOneTextChild", "one"));
	});

	test("testContainsChildAllTypesOnlyNameInData", function(assert) {
		assert.ok(coraDataWithAllTypes.containsChildWithNameInData("groupIdOneTextChild"));
	});

	test("testGetFirstChildByNameInDataAndAttributesAndRepeatId", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
		let firstChildFound = coraDataWithAllTypes
			.getFirstChildByNameInDataAndAttributesAndRepeatId("groupIdOneTextChild", attributes,
				"one");
		assert.stringifyEqual(firstChildFound, firstChild3);
	});

	test("testGetFirstChildByNameInDataAndAttributesAndRepeatIdWrongSomething", function(assert) {
		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));

		assert.throws(function() {
			coraDataWithAllTypes.getFirstChildByNameInDataAndAttributesAndRepeatId(
				"groupIdOneTextChild", attributes, "oneNOT");
		}, "Error");
	});

	test("testGetLinkedRecordIdFromFirstChildLinkWithNameInData", function(assert) {
		let data = {
			name: "groupIdOneTextChild",
			children: [{
				name: "someLink",
				children: [{
					name: "linkedRecordType",
					value: "someLinkedType"
				}, {
					name: "linkedRecordId",
					value: "someLinkedId"
				}
				]
			}]
		};
		let coraData = CORA.coraData(data);
		let linkedRecordId = coraData.getLinkedRecordIdFromFirstChildLinkWithNameInData("someLink");
		assert.strictEqual(linkedRecordId, "someLinkedId");
	});
});
