/*
 * Copyright 2015, 2016, 2017 Olov McKie
 * Copyright 2015, 2016, 2020 Uppsala University Library
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

QUnit.module("metadata/dataHolderTest.js", {
	beforeEach: function() {
		this.spec = {
			metadataId: "recordTypeOnlyMetadataIdChild",
			metadataProvider: new MetadataProviderStub(),
			pubSub: CORATEST.pubSubSpy()
		};

		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.newDataHolder = function(metadataId) {
			let spec = {
				metadataId: metadataId,
				metadataProvider: this.metadataProvider,
				pubSub: this.pubSub
			};
			return CORA.dataHolder(spec);
		};
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	let dataHolder = CORA.dataHolder(this.spec);
	assert.strictEqual(dataHolder.type, "dataHolder");
});

QUnit.test("testGetSpec", function(assert) {
	let dataHolder = CORA.dataHolder(this.spec);
	assert.strictEqual(dataHolder.getSpec(), this.spec);
});

QUnit.test("testInit2", function(assert) {
	let dataHolder = this.newDataHolder("recordTypeOnlyMetadataIdChild");

	// subscription
	let subscriptions = this.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	let firstSubscription = subscriptions[0];
	assert.strictEqual(firstSubscription.type, "*");
	assert.deepEqual(firstSubscription.path, {});
	assert.ok(firstSubscription.functionToCall === dataHolder.handleMsg);
});

QUnit.test("testCreateOneChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let expected = {
		name: "groupIdOneTextChild",
		children: []
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testCreateGroupIdOneTextChildOneAttribute", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChildOneAttribute");
	let expected = {
		name: "groupIdOneTextChildOneAttribute",
		children: [],
		attributes: {
			anAttribute: "aFinalValue"
		}
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testCreateGroupIdOneTextChildTwoAttributes", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChildTwoAttributes");
	let expected = {
		name: "groupIdOneTextChildTwoAttributes",
		children: [],
		attributes: {
			anAttribute: "aFinalValue",
			anOtherAttribute: "aOtherFinalValue"
		}
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildToGroupIdOneTextChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "textVariableId");
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "textVariableId",
			value: ""
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildToGroupIdOneTextChildWrongNameInData", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	assert.throws(function() {
		dataHolder.addChild(path, "textVariableIdNOT");
	}, "Error");
});

QUnit.test("testSetValueGroupIdOneTextChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild({}, "textVariableId");
	dataHolder.setValue(createLinkedPathWithNameInData("textVariableId"), 'A Value');

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "textVariableId",
			value: "A Value"
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueGroupIdOneTextChildWrongNameInData", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild({}, "textVariableId");
	assert.throws(function() {
		dataHolder.setValue(createLinkedPathWithNameInData("textVariableIdNOT"), 'A Value');
	}, "Error");
});

QUnit.test("testAddTwoChildrenWithSameNameInDataDifferentRepeatId", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "textVariableId", "one");
	dataHolder.addChild(path, "textVariableId", "two");

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "textVariableId",
			value: "",
			repeatId: "one"
		}, {
			name: "textVariableId",
			value: "",
			repeatId: "two"
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueTwoChildrenWithSameNameInDataDifferentRepeatId", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "textVariableId", "one");
	dataHolder.addChild(path, "textVariableId", "two");

	let path2 = createLinkedPathWithNameInDataAndRepeatId("textVariableId", "two");
	dataHolder.setValue(path2, 'Value 2');

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "textVariableId",
			value: "",
			repeatId: "one"
		}, {
			name: "textVariableId",
			value: "Value 2",
			repeatId: "two"
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddTwoDifferentChildrenToTopLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "textVariableId");
	dataHolder.addChild(path, "textVariableId2");
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "textVariableId",
			value: ""
		}, {
			name: "textVariableId2",
			value: ""
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddTwoDifferentChildrenSetValueOnSecondToTopLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "textVariableId");
	dataHolder.addChild(path, "textVariableId2");
	path = createLinkedPathWithNameInData("textVariableId2");
	dataHolder.setValue(path, 'Value 2');
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "textVariableId",
			value: ""
		}, {
			name: "textVariableId2",
			value: "Value 2"
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildGroup", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: []
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildToSecondLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: ""
			}]
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueToSecondLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path3, 'Value 2');
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "Value 2"
			}]
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddFourDifferentChildrenSomeWithAttributeToTopLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute");
	dataHolder.addChild(path, "textVariableId");

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChildTwoAttributes",
			children: [],
			attributes: {
				anAttribute: "aFinalValue",
				anOtherAttribute: "aOtherFinalValue"
			}
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [],
			attributes: {
				anOtherAttribute: "aOtherFinalValue"
			}
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [],
			attributes: {
				anAttribute: "aFinalValue"
			}
		}, {
			name: "textVariableId",
			value: ""
		}]
	};

	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildMissingAttributes", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	assert.throws(function() {
		dataHolder.addChild(path2, "textVariableId");
	}, "Error");
});

function addFourDifferentChildrenSomeWithAttributeAndChildrenToThem(dataHolder) {
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute");
	dataHolder.addChild(path, "textVariableId");

	let attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
		"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
		"aOtherFinalValue", "2"));
	let path2 = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	path2.children.push(attributes);
	dataHolder.addChild(path2, "textVariableId");

	let attributes2 = createAttributes();
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
		"aOtherFinalValue", "2"));
	let path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path3.children.push(attributes2);
	dataHolder.addChild(path3, "textVariableId");

	let attributes3 = createAttributes();
	attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
		"aFinalValue", "1"));
	let path4 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path4.children.push(attributes3);
	dataHolder.addChild(path4, "textVariableId");
}

QUnit.test("testAddFourDifferentChildrenSomeWithAttributeAndChildrenToThem", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	addFourDifferentChildrenSomeWithAttributeAndChildrenToThem(dataHolder);

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChildTwoAttributes",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: {
				anAttribute: "aFinalValue",
				anOtherAttribute: "aOtherFinalValue"
			}
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: {
				anOtherAttribute: "aOtherFinalValue"
			}
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: {
				anAttribute: "aFinalValue"
			}
		}, {
			name: "textVariableId",
			value: ""
		}]
	};

	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueFourDifferentChildrenSomeWithAttributeAndChildrenToThem", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	addFourDifferentChildrenSomeWithAttributeAndChildrenToThem(dataHolder);

	let attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
		"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
		"aOtherFinalValue", "2"));
	let path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path, "value 1");

	let attributes2 = createAttributes();
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
		"aOtherFinalValue", "1"));
	let path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path2.children.push(attributes2);
	path2.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path2, "value 2");

	let attributes3 = createAttributes();
	attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
		"aFinalValue", "1"));
	let path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path3.children.push(attributes3);
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path3, "value 3");

	let path4 = createLinkedPathWithNameInData("textVariableId");
	dataHolder.setValue(path4, "value 4");

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChildTwoAttributes",
			children: [{
				name: "textVariableId",
				value: "value 1"
			}],
			attributes: {
				anAttribute: "aFinalValue",
				anOtherAttribute: "aOtherFinalValue"
			}
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVariableId",
				value: "value 2"
			}],
			attributes: {
				anOtherAttribute: "aOtherFinalValue"
			}
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVariableId",
				value: "value 3"
			}],
			attributes: {
				anAttribute: "aFinalValue"
			}
		}, {
			name: "textVariableId",
			value: "value 4"
		}]
	};

	assert.stringifyEqual(dataHolder.getData(), expected);
});

function addEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder) {
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes", "1");
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes", "one");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute", "2");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute", "two");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute", "three");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute", "3");
	dataHolder.addChild(path, "textVariableId", "four");
	dataHolder.addChild(path, "textVariableId", "4");

	let attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
		"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
		"aOtherFinalValue", "2"));
	let path2 = createLinkedPathWithNameInDataAndRepeatId("groupIdOneTextChildTwoAttributes", "1");
	path2.children.push(attributes);
	dataHolder.addChild(path2, "textVariableId");

	attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
		"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
		"aOtherFinalValue", "2"));
	path2 = createLinkedPathWithNameInDataAndRepeatId("groupIdOneTextChildTwoAttributes", "one");
	path2.children.push(attributes);
	dataHolder.addChild(path2, "textVariableId");

	let attributes2 = createAttributes();
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
		"aOtherFinalValue", "2"));
	let path3 = createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
		"2");
	path3.children.push(attributes2);
	dataHolder.addChild(path3, "textVariableId");

	attributes2 = createAttributes();
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
		"aOtherFinalValue", "2"));
	path3 = createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
		"two");
	path3.children.push(attributes2);
	dataHolder.addChild(path3, "textVariableId");

	let attributes3 = createAttributes();
	attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
		"aFinalValue", "1"));
	let path4 = createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
		"three");
	path4.children.push(attributes3);
	dataHolder.addChild(path4, "textVariableId");

	attributes3 = createAttributes();
	attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
		"aFinalValue", "1"));
	path4 = createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
		"3");
	path4.children.push(attributes3);
	dataHolder.addChild(path4, "textVariableId");
}

QUnit.test("testAddEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem", function(
	assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	addEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder);

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChildTwoAttributes",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: {
				anAttribute: "aFinalValue",
				anOtherAttribute: "aOtherFinalValue"
			},
			repeatId: "1"
		}, {
			name: "groupIdOneTextChildTwoAttributes",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: {
				anAttribute: "aFinalValue",
				anOtherAttribute: "aOtherFinalValue"
			},
			repeatId: "one"
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: {
				anOtherAttribute: "aOtherFinalValue"
			},
			repeatId: "2"
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: {
				anOtherAttribute: "aOtherFinalValue"
			},
			repeatId: "two"
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: {
				anAttribute: "aFinalValue"
			},
			repeatId: "three"
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: {
				anAttribute: "aFinalValue"
			},
			repeatId: "3"
		}, {
			name: "textVariableId",
			value: "",
			repeatId: "four"
		}, {
			name: "textVariableId",
			value: "",
			repeatId: "4"
		}]
	};

	assert.stringifyEqual(dataHolder.getData(), expected);
});
QUnit.test("setValueEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem",
	function(assert) {
		let dataHolder = this.newDataHolder("groupIdOneTextChild");
		addEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder);

		let attributes = createAttributes();
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
		attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
		let path = createLinkedPathWithNameInDataAndRepeatId(
			"groupIdOneTextChildTwoAttributes", "1");
		path.children.push(attributes);
		path.children.push(createLinkedPathWithNameInData("textVariableId"));
		dataHolder.setValue(path, "value 1");

		let attributes2 = createAttributes();
		attributes2.children.push(createAttributeWithNameAndValueAndRepeatId(
			"anOtherAttribute", "aOtherFinalValue", "1"));
		let path2 = createLinkedPathWithNameInDataAndRepeatId(
			"textVarRepeat1to3InGroupOneAttribute", "2");
		path2.children.push(attributes2);
		path2.children.push(createLinkedPathWithNameInData("textVariableId"));
		dataHolder.setValue(path2, "value 2");

		let attributes3 = createAttributes();
		attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
		let path3 = createLinkedPathWithNameInDataAndRepeatId(
			"textVarRepeat1to3InGroupOneAttribute", "three");
		path3.children.push(attributes3);
		path3.children.push(createLinkedPathWithNameInData("textVariableId"));
		dataHolder.setValue(path3, "value three");

		let path4 = createLinkedPathWithNameInDataAndRepeatId("textVariableId", "four");
		dataHolder.setValue(path4, "value four");

		let expected = {
			name: "groupIdOneTextChild",
			children: [{
				name: "groupIdOneTextChildTwoAttributes",
				children: [{
					name: "textVariableId",
					value: "value 1"
				}],
				attributes: {
					anAttribute: "aFinalValue",
					anOtherAttribute: "aOtherFinalValue"
				},
				repeatId: "1"
			}, {
				name: "groupIdOneTextChildTwoAttributes",
				children: [{
					name: "textVariableId",
					value: ""
				}],
				attributes: {
					anAttribute: "aFinalValue",
					anOtherAttribute: "aOtherFinalValue"
				},
				repeatId: "one"
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVariableId",
					value: "value 2"
				}],
				attributes: {
					anOtherAttribute: "aOtherFinalValue"
				},
				repeatId: "2"
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVariableId",
					value: ""
				}],
				attributes: {
					anOtherAttribute: "aOtherFinalValue"
				},
				repeatId: "two"
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVariableId",
					value: "value three"
				}],
				attributes: {
					anAttribute: "aFinalValue"
				},
				repeatId: "three"
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVariableId",
					value: ""
				}],
				attributes: {
					anAttribute: "aFinalValue"
				},
				repeatId: "3"
			}, {
				name: "textVariableId",
				value: "value four",
				repeatId: "four"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "4"
			}]
		};

		assert.stringifyEqual(dataHolder.getData(), expected);
	});

QUnit.test("testRemoveSecondLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.remove(path3);
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: []
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});
QUnit.test("testRemoveChildToGroupIdOneTextChildWrongNameInData", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableIdNOT"));
	assert.throws(function() {
		dataHolder.remove(path3);
	}, "Error");
});
QUnit.test("testHandleMessageRemove", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.handleMsg({
		path: path3,
		type: "remove"
	}, "x/y/z/remove");
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: []
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageRemoveWrongPath", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));

	let messageToHandle = "x/y/z/remove";
	let expectedErrorMessageStartsWith = "Error: path(undefined) not found in dataHolder when trying to remove";

	assertThrownException(assert, dataHolder, messageToHandle, expectedErrorMessageStartsWith);
});

const assertThrownException = function(assert, dataHolder, messageToHandle, expectedErrorMessageStartsWith) {
	assert.throws(function() {
		dataHolder.handleMsg({}, messageToHandle);
	},
		function(caughtError) {
			return checkCatchedErrorStartsWith(caughtError, expectedErrorMessageStartsWith)
		}
	);
};

const checkCatchedErrorStartsWith = function(caughtError, expectedErrorMessageStartsWith) {
	return caughtError.toString().startsWith(expectedErrorMessageStartsWith);
};

QUnit.test("testHandleMessageMoveAfter", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId", "1");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path3, "textVariableId", "2");

	let path4 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path4, "textVariableId", "3");

	let basePath = createLinkedPathWithNameInData("groupIdOneTextChild");

	dataHolder.handleMsg({
		path: basePath,
		moveChild: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "groupIdOneTextChild"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "1"
				}]
			}]
		},
		basePositionOnChild: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "groupIdOneTextChild"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "2"
				}]
			}]
		},
		newPosition: "after"
	}, "x/y/z/move");

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "",
				repeatId: "2"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "1"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "3"
			}]
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageMoveBefore", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId", "1");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path3, "textVariableId", "2");

	let path4 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path4, "textVariableId", "3");

	let basePath = createLinkedPathWithNameInData("groupIdOneTextChild");

	dataHolder.handleMsg({
		path: basePath,
		moveChild: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "groupIdOneTextChild"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "1"
				}]
			}]
		},
		basePositionOnChild: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "groupIdOneTextChild"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "3"
				}]
			}]
		},
		newPosition: "before"
	}, "x/y/z/move");

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "",
				repeatId: "2"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "1"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "3"
			}]
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});
QUnit.test("testHandleMessageMoveBeforeFirst", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId", "1");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path3, "textVariableId", "2");

	let path4 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path4, "textVariableId", "3");

	let basePath = createLinkedPathWithNameInData("groupIdOneTextChild");

	dataHolder.handleMsg({
		path: basePath,
		moveChild: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "groupIdOneTextChild"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "3"
				}]
			}]
		},
		basePositionOnChild: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "groupIdOneTextChild"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "1"
				}]
			}]
		},
		newPosition: "before"
	}, "x/y/z/move");

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "",
				repeatId: "3"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "1"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "2"
			}]
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageMoveAfterLast", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId", "1");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path3, "textVariableId", "2");

	let path4 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path4, "textVariableId", "3");

	let basePath = createLinkedPathWithNameInData("groupIdOneTextChild");

	dataHolder.handleMsg({
		path: basePath,
		moveChild: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "groupIdOneTextChild"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "3"
				}]
			}]
		},
		basePositionOnChild: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "groupIdOneTextChild"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "2"
				}]
			}]
		},
		newPosition: "after"
	}, "x/y/z/move");

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "",
				repeatId: "1"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "2"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "3"
			}]
		}]
	};
	let x = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "",
				repeatId: "1"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "3"
			}, {
				name: "textVariableId",
				value: "",
				repeatId: "2"
			}]
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

function createLinkedPathWithNameInData(nameInData) {
	return {
		name: "linkedPath",
		children: [{
			name: "nameInData",
			value: nameInData
		}]
	};
}
function createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId) {
	return {
		name: "linkedPath",
		children: [{
			name: "nameInData",
			value: nameInData
		}, {
			name: "repeatId",
			value: repeatId
		}]
	};
}

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

QUnit.test("testAddChildToGroupIdOneRecordLinkChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkChild");
	let path = {};
	dataHolder.addChild(path, "myLink");
	let expected = {
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: []
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);

	let pathLinkedRecordType = {
		name: "linkedPath",
		children: [{
			name: "nameInData",
			value: "myLink"
		}]
	};

	dataHolder.addChild(pathLinkedRecordType, "linkedRecordTypeTextVar");
	let expectedLinkedRecordType = {
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: [{
				name: "linkedRecordType",
				value: ""
			}]
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expectedLinkedRecordType);
});

QUnit.test("testAddChildToGroupIdOneRecordLinkWithAttributeChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkWithAttributeChild");
	let path = {};
	dataHolder.addChild(path, "myLinkWithAttribute");
	let expected = {
		name: "groupIdOneRecordLinkWithAttributeChild",
		children: [{
			name: "myLinkWithAttribute",
			children: [],
			"attributes": {
				"type": "image"
			}
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);

	let pathLinkedRecordType = {
		name: "linkedPath",
		children: [{
			name: "nameInData",
			value: "myLinkWithAttribute"
		},
		{
			"name": "attributes",
			"children": [
				{
					"name": "attribute",
					"repeatId": "1",
					"children": [
						{
							"name": "attributeName",
							"value": "type"
						},
						{
							"name": "attributeValue",
							"value": "image"
						}
					]
				}
			]
		}]
	};

	dataHolder.addChild(pathLinkedRecordType, "linkedRecordTypeTextVar");
	let expectedLinkedRecordType = {
		name: "groupIdOneRecordLinkWithAttributeChild",
		children: [{
			name: "myLinkWithAttribute",
			children: [{
				name: "linkedRecordType",
				value: ""
			}],
			"attributes": {
				"type": "image"
			}
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expectedLinkedRecordType);
});


QUnit.test("testHandleMsgLinkedDataActionLinksGroupIdOneRecordLinkChild", function(assert) {
	let dataFromMsg = {
		data: {
			children: [{
				name: "linkedRecordType",
				value: "recordType"
			}, {
				name: "linkedRecordId",
				value: "writtenText"
			}],
			actionLinks: {
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://localhost:8080/therest/rest/record/recordType/writtenText",
					accept: "application/vnd.uub.record+json"
				}
			},
			name: "type"
		},
		path: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "recordInfo"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "type"
				}]
			}]
		}
	};
	let msg = "root/recordInfo/type/linkedData";
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkChild");
	let path = {};
	dataHolder.addChild(path, "myLink");

	let path2 = createLinkedPathWithNameInData("myLink");
	dataFromMsg.path = path2;

	dataHolder.handleMsg(dataFromMsg, msg);
	let expected = {
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: []
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);

	let expectedWithLinks = {
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: []
			, actionLinks: {
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://localhost:8080/therest/rest/record/recordType/writtenText",
					accept: "application/vnd.uub.record+json"
				}
			}
		}]
	};
	assert.stringifyEqual(dataHolder.getDataWithActionLinks(), expectedWithLinks);


});
QUnit.test("testHandleMsgLinkedDataActionLinksGroupIdOneRecordLinkChildNoActionLink", function(assert) {
	let dataFromMsg = {
		data: {
			children: [{
				name: "linkedRecordType",
				value: "recordType"
			}, {
				name: "linkedRecordId",
				value: "writtenText"
			}],
			// actionLinks: {
			// read: {
			// requestMethod: "GET",
			// rel: "read",
			// url: "http://localhost:8080/therest/rest/record/recordType/writtenText",
			// accept: "application/vnd.uub.record+json"
			// }
			// },
			name: "type"
		},
		path: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "recordInfo"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "type"
				}]
			}]
		}
	};
	let msg = "root/recordInfo/type/linkedData";
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkChild");
	let path = {};
	dataHolder.addChild(path, "myLink");

	let path2 = createLinkedPathWithNameInData("myLink");
	dataFromMsg.path = path2;

	dataHolder.handleMsg(dataFromMsg, msg);
	let expected = {
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: []
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
	assert.stringifyEqual(dataHolder.getDataWithActionLinks(), expected);
});

QUnit.test("testHandleMsgLinkedDataActionLinksGroupIdOneRecordLinkChildWrongPath", function(assert) {
	let dataFromMsg = {
		data: {
			children: [{
				name: "linkedRecordType",
				value: "recordType"
			}, {
				name: "linkedRecordId",
				value: "writtenText"
			}],
			actionLinks: {
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://localhost:8080/therest/rest/record/recordType/writtenText",
					accept: "application/vnd.uub.record+json"
				}
			},
			name: "type"
		},
		path: {
			name: "linkedPath",
			children: [{
				name: "nameInData",
				value: "recordInfo"
			}, {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "type"
				}]
			}]
		}
	};
	let msg = "root/recordInfo/type/linkedData";
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkChild");
	let path = {};
	dataHolder.addChild(path, "myLink");

	let path2 = createLinkedPathWithNameInData("myLinkNOT");
	dataFromMsg.path = path2;

	let expectedErrorMessageStartsWith = "path({\"name\":\"linkedPath\",\"children\":[{\"name\":\"nameInData\",\"value\":\"myLinkNOT\"}]}) not found in dataHolder:Error: name(myLinkNOT) with attributes (undefined) and repeatId (undefined) not found in children to coraData";

	assert.throws(function() {
		dataHolder.handleMsg(dataFromMsg, msg);
	}, new Error(expectedErrorMessageStartsWith));
});


QUnit.test("testAddChildToGroupIdOneResourceLinkChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneResourceLinkChild");
	let path = {};
	dataHolder.addChild(path, "masterResLink");
	let expected = {
		name: "groupIdOneResourceLinkChild",
		children: [{
			name: "master",
			children: []
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageAdd", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));

	let dataFromMessage = { "metadataId": "textVariableId", "path": {}, "nameInData": "textVariableId" };
	dataHolder.handleMsg(dataFromMessage, "root/groupIdOneTextChild/groupIdOneTextChild/add");

	let expected = {
		"name": "groupIdOneTextChild",
		"children": [
			{
				"name": "groupIdOneTextChild",
				"children": [
					{
						"name": "textVariableId",
						"value": ""
					}
				]
			},
			{
				"name": "textVariableId",
				"value": ""
			}
		]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageAddWrongPath", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));

	let messageToHandle = "root/textVariableId/add";
	let expectedErrorMessageStartsWith = "Error: path(undefined) not found in dataContainers:{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}]}]}";

	assertThrownException(assert, dataHolder, messageToHandle, expectedErrorMessageStartsWith);
//	assert.throws(function() {
//		dataHolder.handleMsg({}, "root/textVariableId/add");
//	},
//		new Error(expectedErrorMessageStartsWith)
//	);
});

QUnit.test("testHandleMessageSetValue", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));

	let dataFromMessage = { "data": "A value", "path": path3 };
	dataHolder.handleMsg(dataFromMessage, "root/textVariableId/setValue");

	let expected = {
		"name": "groupIdOneTextChild",
		"children": [
			{
				"name": "groupIdOneTextChild",
				"children": [
					{
						"name": "textVariableId",
						"value": "A value"
					}
				]
			}
		]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageSetValueWrongPath", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));

	let messageToHandle = "root/textVariableId/setValue";
	let expectedErrorMessageStartsWith = "Error: path(undefined) not found in dataHolder";

	assertThrownException(assert, dataHolder, messageToHandle, expectedErrorMessageStartsWith);
});

QUnit.test("testHandleMessageNoHandledType", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	let path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));

	let dataFromMessage = { "data": "A value", "path": path3 };
	dataHolder.handleMsg(dataFromMessage, "root/textVariableId/notHandled");

	let expected = {
		"name": "groupIdOneTextChild",
		"children": [
			{
				"name": "groupIdOneTextChild",
				"children": [
					{
						"name": "textVariableId",
						"value": ""
					}
				]
			}
		]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});



