/*
 * Copyright 2015, 2016, 2017, 2024 Olov McKie
 * Copyright 2015, 2016, 2020, 2024 Uppsala University Library
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
			metadataProvider: CORATEST.MetadataProviderStub(),
			pubSub: CORATEST.pubSubSpy()
		};

		this.metadataProvider = CORATEST.MetadataProviderStub();
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
	assert.strictEqual(subscriptions.length, 1);

	let firstSubscription = subscriptions[0];
	assert.strictEqual(firstSubscription.type, "*");
	assert.deepEqual(firstSubscription.path, []);
	assert.ok(firstSubscription.functionToCall === dataHolder.handleMsg);
});

QUnit.test("testFindContainerTopLevelPath", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = [];

	let expected = {
		name: "groupIdOneTextChild",
		children: []
	};
	let foundContainer = dataHolder.findContainer(path);
	assert.deepEqual(foundContainer, expected);
});

QUnit.test("testFindContainerTwoChildrenWithSameMetadataIdDifferentRepeatId", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = [];
	dataHolder.addChild(path, "textVariableId", "one");
	dataHolder.addChild(path, "textVariableId", "two");

	let expected =
		[{
			name: "textVariableId",
			value: "",
			repeatId: "one"
		}, {
			name: "textVariableId",
			value: "",
			repeatId: "two"
		}];
	assert.deepEqual(dataHolder.findContainersUsingPathAndMetadataId(path, "textVariableId"), expected);
	assert.deepEqual(dataHolder.findContainer(["textVariableId.two"]), expected[1]);
});

QUnit.test("testFindContainerTwoChildrenWithDifferentMetadataIdDifferentRepeatId", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = [];
	dataHolder.addChild(path, "textVariableId", "one");
	dataHolder.addChild(path, "groupIdOneTextChild", "two");

	let expected =
		[{
			name: "textVariableId",
			value: "",
			repeatId: "one"
		}]
		;
	assert.deepEqual(dataHolder.findContainersUsingPathAndMetadataId(path, "textVariableId"), expected);
	assert.deepEqual(dataHolder.findContainer(["textVariableId.one"]), expected[0]);
});
QUnit.test("testFindContainerDeeperChild", function(assert) {
	let path = ["groupIdOneTextChild"];
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");
	dataHolder.setValue(["groupIdOneTextChild", "textVariableId"], 'Value 2');

	let expected = [{
		name: "textVariableId",
		value: "Value 2"
	}];
	assert.deepEqual(dataHolder.findContainersUsingPathAndMetadataId(path, "textVariableId"), expected);
	assert.deepEqual(dataHolder.findContainer(["groupIdOneTextChild", "textVariableId"]), expected[0]);
});

QUnit.test("testFindContainerDeeperChildRepeatId", function(assert) {
	let path = ["groupIdOneTextChild"];
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "one");
	dataHolder.setValue(["groupIdOneTextChild", "textVariableId.one"], 'Value 2');

	let expected = [{
		name: "textVariableId",
		repeatId: "one",
		value: "Value 2"
	}];
	assert.deepEqual(dataHolder.findContainersUsingPathAndMetadataId(path, "textVariableId"), expected);
	assert.deepEqual(dataHolder.findContainer(["groupIdOneTextChild", "textVariableId.one"]), expected[0]);
});

QUnit.test("testFindContainerNotFound", function(assert) {
	let path = ["groupIdOneTextChild"];
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "one");

	let expected = [];
	assert.deepEqual(dataHolder.findContainersUsingPathAndMetadataId(path, "textVariableIdNOT"), expected);
});



QUnit.test("testCreateNewDataHolder", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	let expected = {
		name: "groupIdOneTextChild",
		children: []
	};
	assert.stringifyEqual(dataHolder.getData(), expected);

	let expectedContainerPath = {
		"[]": expected
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath);
	assert.stringifyEqual(dataHolder.findContainer([]), expected);

	let expectedContainerPathNoRepeatId = {
//		"[]":{
//			"name":"groupIdOneTextChild",
//			"children":[]
//		}
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId);
});

QUnit.test("testCreateGroupIdOneTextChildOneAttribute", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChildOneAttribute");
	let expectedBeforeAttribute = {
		name: "groupIdOneTextChildOneAttribute",
		children: []
	};
	assert.deepEqual(dataHolder.getData(), expectedBeforeAttribute);

	callWithMessageToAddAttribute(dataHolder, "anAttribute", [], "anAttribute");
	let expectedAddedAttribute = {
		name: "groupIdOneTextChildOneAttribute",
		children: [],
		attributes: {
			anAttribute: ""
		}
	};
	assert.deepEqual(dataHolder.getData(), expectedAddedAttribute);

	let expectedContainerPath = {
		'[]': {
			name: "groupIdOneTextChildOneAttribute",
			children: [],
			attributes: [{
		        "id": "anAttribute",
		        "nameInData": "anAttribute",
		        "value": ""
		      }]
		},
		'["@anAttribute"]': {
		    "id"        : "anAttribute",
		    "nameInData": "anAttribute",
		    "value"     : ""
		  }
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath);

	let expectedContainerPathNoRepeatId = {
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId);


	callWithMessageToSetValue(dataHolder, ["@anAttribute"], "aFinalValue");
	let expectedAddedAttributeValue = {
		name: "groupIdOneTextChildOneAttribute",
		children: [],
		attributes: {
			anAttribute: "aFinalValue"
		}
	};
	assert.deepEqual(dataHolder.getData(), expectedAddedAttributeValue);

	let expectedContainerPath2 = {
		'[]': {
			name: "groupIdOneTextChildOneAttribute",
			children: [],
			attributes: [{
		        "id": "anAttribute",
		        "nameInData": "anAttribute",
		        "value": "aFinalValue"
		      }]
		},
		'["@anAttribute"]': {
		    "id"        : "anAttribute",
		    "nameInData": "anAttribute",
		    "value"     : "aFinalValue"
		  }
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath2);

	let expectedContainerPathNoRepeatId2 = {
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);
});

QUnit.test("testCreateGroupIdOneTextChildTwoAttributes", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChildTwoAttributes");

	callWithMessageToAddAttribute(dataHolder, "anAttribute", [], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["@anAttribute"], "aFinalValue");
	
	callWithMessageToAddAttribute(dataHolder, "anOtherAttribute", [], "anOtherAttribute");
	let expectedAddedAttribute2 = {
		name: "groupIdOneTextChildTwoAttributes",
		children: [],
		attributes: {
			anAttribute: "aFinalValue",
			anOtherAttribute: ""
		}
	};
	assert.deepEqual(dataHolder.getData(), expectedAddedAttribute2);

	callWithMessageToSetValue(dataHolder, ["@anOtherAttribute"], "anOtherFinalValue");
	let expectedAddedAttributeValue2 = {
		name: "groupIdOneTextChildTwoAttributes",
		children: [],
		attributes: {
			anAttribute: "aFinalValue",
			anOtherAttribute: "anOtherFinalValue"
		}
	};
	assert.deepEqual(dataHolder.getData(), expectedAddedAttributeValue2);

	let expectedContainerPath2 = {
		'[]': {
			name: "groupIdOneTextChildTwoAttributes",
			children: [],
			attributes: [{
		        "id": "anAttribute",
		        "nameInData": "anAttribute",
		        "value": "aFinalValue"
		      },{
		        "id": "anOtherAttribute",
		        "nameInData": "anOtherAttribute",
		        "value": "anOtherFinalValue"
		      }]
		},
		'["@anAttribute"]': {
		    "id"        : "anAttribute",
		    "nameInData": "anAttribute",
		    "value"     : "aFinalValue"
		},
		'["@anOtherAttribute"]': {
		    "id"        : "anOtherAttribute",
		    "nameInData": "anOtherAttribute",
		    "value"     : "anOtherFinalValue"
		}
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath2);

	let expectedContainerPathNoRepeatId2 = {
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);
});

const callWithMessageToAddAttribute = function(dataHolder, metadataId, path, nameInData) {
	let addAttributeMsg = {
		metadataId: metadataId,
		path: path,
		nameInData: nameInData
	};
	dataHolder.handleMsg(addAttributeMsg, "x/y/z/addAttribute");
};

const callWithMessageToSetValue = function(dataHolder, path, data) {
	let setValueMsg = {
		path: path,
		data: data
	};
	dataHolder.handleMsg(setValueMsg, "x/y/z/setValue");
};

QUnit.test("testAddChildToGroupIdOneTextChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = [];
	dataHolder.addChild(path, "textVariableId");
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "textVariableId",
			value: ""
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);

	let expectedContainerPath2 = {
		'[]': {
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: ""
			}]
		},
		'["textVariableId"]': {
			name: "textVariableId",
			value: ""
		}
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath2);

	let expectedContainerPathNoRepeatId2 = {
		'["textVariableId"]': [{
			name: "textVariableId",
			value: ""
		}]
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);
});

QUnit.test("testAddChildToGroupIdOneTextChildWrongMetadataId", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = [];
	assert.throws(function() {
		dataHolder.addChild(path, "textVariableIdNOT");
	}, "Error");
});

QUnit.test("testSetValueGroupIdOneTextChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "textVariableId");
	dataHolder.setValue(["textVariableId"], 'A Value');

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "textVariableId",
			value: "A Value"
		}]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
	
	let expectedContainerPath2 = {
		'[]': {
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "A Value"
			}]
		},
		'["textVariableId"]': {
			name: "textVariableId",
			value: "A Value"
		}
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath2);

	let expectedContainerPathNoRepeatId2 = {
		'["textVariableId"]': [{
			name: "textVariableId",
			value: "A Value"
		}]
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);
});

QUnit.test("testSetValueGroupIdOneTextChildWrongMetadataId", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "textVariableId");
	assert.throws(function() {
		dataHolder.setValue(["textVariableIdNOT"], 'A Value');
	}, "Error");
});

QUnit.test("testAddTwoChildrenWithSameMetadataIdDifferentRepeatId", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = [];
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

	assert.deepEqual(dataHolder.getData(), expected);
	
	let expectedContainerPath2 = {
		'[]': {
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				repeatId: "one",
				value: ""
			}, {
				name: "textVariableId",
				repeatId: "two",
				value: ""
			}]
		},
		'["textVariableId.one"]': {
			name: "textVariableId",
			repeatId: "one",
			value: ""
		},
		'["textVariableId.two"]': {
			name: "textVariableId",
			repeatId: "two",
			value: ""
		}
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath2);

	let expectedContainerPathNoRepeatId2 = {
		'["textVariableId"]': [{
			name: "textVariableId",
			repeatId: "one",
			value: ""
		},{
			name: "textVariableId",
			repeatId: "two",
			value: ""
		}]
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);

});

QUnit.test("testSetValueTwoChildrenWithSameMetadataIdDifferentRepeatId", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "textVariableId", "one");
	dataHolder.addChild([], "textVariableId", "two");

	dataHolder.setValue(["textVariableId.two"], 'Value 2');

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
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddTwoDifferentChildrenToTopLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "textVariableId");
	dataHolder.addChild([], "textVariableId2");

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
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddTwoDifferentChildrenSetValueOnSecondToTopLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "textVariableId");
	dataHolder.addChild([], "textVariableId2");
	dataHolder.setValue(["textVariableId2"], 'Value 2');

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
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildGroup", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: []
		}]
	};
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildToSecondLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");

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
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueToSecondLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");
	dataHolder.setValue(["groupIdOneTextChild", "textVariableId"], 'Value 2');

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
	assert.deepEqual(dataHolder.getData(), expected);
	
	let expectedContainerPath2 = {
		'[]': {
			name: "groupIdOneTextChild",
			children: [{
				name: "groupIdOneTextChild",
				children: [{
					name: "textVariableId",
					value: "Value 2"
				}]
			}]
		},
		'["groupIdOneTextChild"]': {
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "Value 2"
			}]},
		'["groupIdOneTextChild","textVariableId"]': {
			name: "textVariableId",
			value: "Value 2"
		}
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath2);

	let expectedContainerPathNoRepeatId2 = {
		'["groupIdOneTextChild"]': [{
			name: "groupIdOneTextChild",
			children: [{
				name: "textVariableId",
				value: "Value 2"
			}]}],
		'["groupIdOneTextChild","textVariableId"]': [{
			name: "textVariableId",
			value: "Value 2"
		}]
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);

});

QUnit.test("testAddFourDifferentChildrenSomeWithAttributeToTopLevel", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChildTwoAttributes");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["groupIdOneTextChildTwoAttributes"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["groupIdOneTextChildTwoAttributes", "@anAttribute"], "aFinalValue");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["groupIdOneTextChildTwoAttributes"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["groupIdOneTextChildTwoAttributes", "@anAttribute"], "aOtherFinalValue");

	dataHolder.addChild([], "textVarRepeat1to3InGroupOtherAttribute");
	callWithMessageToAddAttribute(dataHolder, "anOtherAttribute", ["textVarRepeat1to3InGroupOtherAttribute"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOtherAttribute", "@anOtherAttribute"], "aOtherFinalValue");

	dataHolder.addChild([], "textVarRepeat1to3InGroupOneAttribute");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["textVarRepeat1to3InGroupOneAttribute"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOneAttribute", "@anAttribute"], "aFinalValue");

	dataHolder.addChild([], "textVariableId");

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

	assert.deepEqual(dataHolder.getData(), expected);
});

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

	assert.deepEqual(dataHolder.getData(), expected);

});

function addFourDifferentChildrenSomeWithAttributeAndChildrenToThem(dataHolder) {
	dataHolder.addChild([], "groupIdOneTextChildTwoAttributes");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["groupIdOneTextChildTwoAttributes"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["groupIdOneTextChildTwoAttributes", "@anAttribute"], "aFinalValue");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["groupIdOneTextChildTwoAttributes"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["groupIdOneTextChildTwoAttributes", "@anAttribute"], "aOtherFinalValue");

	dataHolder.addChild([], "textVarRepeat1to3InGroupOtherAttribute");
	callWithMessageToAddAttribute(dataHolder, "anOtherAttribute", ["textVarRepeat1to3InGroupOtherAttribute"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOtherAttribute", "@anOtherAttribute"], "aOtherFinalValue");

	dataHolder.addChild([], "textVarRepeat1to3InGroupOneAttribute");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["textVarRepeat1to3InGroupOneAttribute"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOneAttribute", "@anAttribute"], "aFinalValue");

	dataHolder.addChild([], "textVariableId");

	dataHolder.addChild(["groupIdOneTextChildTwoAttributes"], "textVariableId");
	dataHolder.addChild(["textVarRepeat1to3InGroupOtherAttribute"], "textVariableId");
	dataHolder.addChild(["textVarRepeat1to3InGroupOneAttribute"], "textVariableId");
}


QUnit.test("testSetValueFourDifferentChildrenSomeWithAttributeAndChildrenToThem", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	addFourDifferentChildrenSomeWithAttributeAndChildrenToThem(dataHolder);

	dataHolder.setValue(["groupIdOneTextChildTwoAttributes", "textVariableId"], "value 1");
	dataHolder.setValue(["textVarRepeat1to3InGroupOtherAttribute", "textVariableId"], "value 2");
	dataHolder.setValue(["textVarRepeat1to3InGroupOneAttribute", "textVariableId"], "value 3");
	dataHolder.setValue(["textVariableId"], "value 4");

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
	assert.deepEqual(dataHolder.getData(), expected);
});

function addEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder) {
	let path = [];
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes", "1");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["groupIdOneTextChildTwoAttributes.1"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["groupIdOneTextChildTwoAttributes.1", "@anAttribute"], "aFinalValue");
	callWithMessageToAddAttribute(dataHolder, "anOtherAttribute", ["groupIdOneTextChildTwoAttributes.1"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["groupIdOneTextChildTwoAttributes.1", "@anOtherAttribute"], "aOtherFinalValue");

	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes", "one");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["groupIdOneTextChildTwoAttributes.one"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["groupIdOneTextChildTwoAttributes.one", "@anAttribute"], "aFinalValue");
	callWithMessageToAddAttribute(dataHolder, "anOtherAttribute", ["groupIdOneTextChildTwoAttributes.one"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["groupIdOneTextChildTwoAttributes.one", "@anOtherAttribute"], "aOtherFinalValue");

	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute", "2");
	callWithMessageToAddAttribute(dataHolder, "anOtherAttribute", ["textVarRepeat1to3InGroupOtherAttribute.2"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOtherAttribute.2", "@anOtherAttribute"], "aOtherFinalValue");

	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute", "two");
	callWithMessageToAddAttribute(dataHolder, "anOtherAttribute", ["textVarRepeat1to3InGroupOtherAttribute.two"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOtherAttribute.two", "@anOtherAttribute"], "aOtherFinalValue");

	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute", "three");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["textVarRepeat1to3InGroupOneAttribute.three"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOneAttribute.three", "@anAttribute"], "aFinalValue");

	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute", "3");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["textVarRepeat1to3InGroupOneAttribute.3"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOneAttribute.3", "@anAttribute"], "aFinalValue");


	dataHolder.addChild(path, "textVariableId", "four");
	dataHolder.addChild(path, "textVariableId", "4");
	dataHolder.addChild(["groupIdOneTextChildTwoAttributes.1"], "textVariableId");
	dataHolder.addChild(["groupIdOneTextChildTwoAttributes.one"], "textVariableId");
	dataHolder.addChild(["textVarRepeat1to3InGroupOtherAttribute.2"], "textVariableId");
	dataHolder.addChild(["textVarRepeat1to3InGroupOtherAttribute.two"], "textVariableId");
	dataHolder.addChild(["textVarRepeat1to3InGroupOneAttribute.three"], "textVariableId");
	dataHolder.addChild(["textVarRepeat1to3InGroupOneAttribute.3"], "textVariableId");
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

	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("setValueEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem",
	function(assert) {
		let dataHolder = this.newDataHolder("groupIdOneTextChild");

		addEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder);
		dataHolder.setValue(["groupIdOneTextChildTwoAttributes.1", "textVariableId"], "value 1");
		dataHolder.setValue(["textVarRepeat1to3InGroupOtherAttribute.2", "textVariableId"], "value 2");
		dataHolder.setValue(["textVarRepeat1to3InGroupOneAttribute.three", "textVariableId"], "value three");
		dataHolder.setValue(["textVariableId.four"], "value four");

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

		assert.deepEqual(dataHolder.getData(), expected);
	});

QUnit.test("testRemoveSecondLevel", function(assert) {

	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");
	dataHolder.setValue(["groupIdOneTextChild", "textVariableId"], 'Value 2');

	dataHolder.remove(["groupIdOneTextChild", "textVariableId"]);
	let expected = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: []
		}]
	};
	assert.deepEqual(dataHolder.getData(), expected);
	
	let expectedContainerPath2 = {
		'[]': {
			name: "groupIdOneTextChild",
			children: [{
				name: "groupIdOneTextChild",
				children: []
			}]
		},
		'["groupIdOneTextChild"]': {
			name: "groupIdOneTextChild",
			children: []
		}
		
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath2);

	let expectedContainerPathNoRepeatId2 = {
		'["groupIdOneTextChild"]': [{
			name: "groupIdOneTextChild",
			children: []}]
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);
});

QUnit.test("testRemoveChildToGroupIdOneTextChildWrongMetadataId", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	let path = [];
	dataHolder.addChild(path, "groupIdOneTextChild");

	let path2 = ["groupIdOneTextChild"];
	dataHolder.addChild(path2, "textVariableId");

	assert.throws(function() {
		dataHolder.remove(["groupIdOneTextChild", "textVariableIdNOT"]);
	}, "Error");
});

QUnit.test("testHandleMessageRemove", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "groupIdOneTextChild");

	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");

	dataHolder.handleMsg({
		path: ["groupIdOneTextChild", "textVariableId"],
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

QUnit.test("testHandleMessageRemoveEmptyPath", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");

	let expectedErrorMessage = "Remove container failed with path: [\"somePathNotFound\"]. "
		+ "Error: Unable to find container with path: [\"somePathNotFound\"] in dataHolder";

	assert.throws(function() {
		let emptyData = { path: ["somePathNotFound"] };
		dataHolder.handleMsg(emptyData, "x/y/z/remove");
	}, new Error(expectedErrorMessage));

});

QUnit.test("testRemoveThenFindContainerDeeperChildRepeatId", function(assert) {
	let path = ["groupIdOneTextChild"];
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "one");
	dataHolder.setValue(["groupIdOneTextChild", "textVariableId.one"], 'Value 1');
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "two");
	dataHolder.setValue(["groupIdOneTextChild", "textVariableId.two"], 'Value 2');

	let pathToVariable = ["groupIdOneTextChild", "textVariableId.one"];

	dataHolder.handleMsg({
		path: pathToVariable,
		type: "remove"
	}, "x/y/z/remove");
	
	let expected1 = {
		name: "groupIdOneTextChild",
		children: [{
			name: "groupIdOneTextChild",
			children: [
				{
					name: "textVariableId",
					repeatId: "two",
					value: "Value 2"
				}
			]
		}]
	};
	assert.deepEqual(dataHolder.getData(), expected1);

	let expectedErrorMessage = "Unable to find container with " +
		"path: [\"groupIdOneTextChild\",\"textVariableId.one\"] in dataHolder";
	assert.throws(function() {
		dataHolder.findContainer(pathToVariable);
		dataHolder.handleMsg(emptyData, "x/y/z/remove");
	}, new Error(expectedErrorMessage));

	let expected = [{
		name: "textVariableId",
		repeatId: "two",
		value: "Value 2"
	}];

	assert.deepEqual(dataHolder.findContainersUsingPathAndMetadataId(path, "textVariableId"), expected);
	assert.deepEqual(dataHolder.findContainer(["groupIdOneTextChild", "textVariableId.two"]), expected[0]);
	
	let expectedContainerPath2 = {
		'[]': {
			name: "groupIdOneTextChild",
			children: [{
				name: "groupIdOneTextChild",
				children: [
					{
						name: "textVariableId",
						repeatId: "two",
						value: "Value 2"
					}
				]
			}]
		},
		'["groupIdOneTextChild"]': {
			name: "groupIdOneTextChild",
			children: [
					{
						name: "textVariableId",
						repeatId: "two",
						value: "Value 2"
					}
				]
		},
		'["groupIdOneTextChild","textVariableId.two"]': {
			name: "textVariableId",
			repeatId: "two",
			value: "Value 2"
		}
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath2);

	let expectedContainerPathNoRepeatId2 = {
		'["groupIdOneTextChild"]': [{
			name: "groupIdOneTextChild",
			children: [
				{
					name: "textVariableId",
					repeatId: "two",
					value: "Value 2"
				}
			]}],
		'["groupIdOneTextChild","textVariableId"]': [
			{
				name: "textVariableId",
				repeatId: "two",
				value: "Value 2"
			}
		]
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);
}); 
QUnit.test("testRemoveTopLevelThenFindContainerDeeperChildRepeatId", function(assert) {
	let path = ["groupIdOneTextChild"];
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "one");
	dataHolder.setValue(["groupIdOneTextChild", "textVariableId.one"], 'Value 1');
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "two");
	dataHolder.setValue(["groupIdOneTextChild", "textVariableId.two"], 'Value 2');

	let expected0 = {
			name: "groupIdOneTextChild",
			children: [{
				name: "groupIdOneTextChild",
				children: [
					{
			          "name": "textVariableId",
			          "repeatId": "one",
			          "value": "Value 1"
			        },
			        {
						name: "textVariableId",
						repeatId: "two",
						value: "Value 2"
					}
				]
			}]} ;
	assert.deepEqual(dataHolder.getData(), expected0);
	
	let pathToVariable = ["groupIdOneTextChild"];

	dataHolder.handleMsg({
		path: pathToVariable,
		type: "remove"
	}, "x/y/z/remove");
	
	let expected1 = {
		name: "groupIdOneTextChild",
		children: []
	};
	assert.deepEqual(dataHolder.getData(), expected1);

	let expectedErrorMessage = "Unable to find container with " +
		"path: [\"groupIdOneTextChild\"] in dataHolder";
	assert.throws(function() {
		dataHolder.findContainer(pathToVariable);
		dataHolder.handleMsg(emptyData, "x/y/z/remove");
	}, new Error(expectedErrorMessage));

	let expected = [{
		name: "textVariableId",
		repeatId: "two",
		value: "Value 2"
	}];

	assert.stringifyEqual(dataHolder.findContainersUsingPathAndMetadataId(path, "textVariableId"),[]);

	let expectedErrorMessage3 = "Unable to find container with " +
		"path: [\"groupIdOneTextChild\",\"textVariableId.two\"] in dataHolder";
	assert.throws(function() {
		dataHolder.findContainer(["groupIdOneTextChild", "textVariableId.two"]);
	}, new Error(expectedErrorMessage3));
	
	let expectedContainerPath3 = {
		'[]': {
			name: "groupIdOneTextChild",
			children: []
		}
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPath(), expectedContainerPath3);

	let expectedContainerPathNoRepeatId2 = {
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);
}); 

function addFourDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder) {
	let path = [];
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute", "2");
	callWithMessageToAddAttribute(dataHolder, "anOtherAttribute", ["textVarRepeat1to3InGroupOtherAttribute.2"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOtherAttribute.2", "@anOtherAttribute"], "aOtherFinalValue");

	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute", "two");
	callWithMessageToAddAttribute(dataHolder, "anOtherAttribute", ["textVarRepeat1to3InGroupOtherAttribute.two"], "anOtherAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOtherAttribute.two", "@anOtherAttribute"], "aOtherFinalValue");

	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute", "three");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["textVarRepeat1to3InGroupOneAttribute.three"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOneAttribute.three", "@anAttribute"], "aFinalValue");

	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute", "3");
	callWithMessageToAddAttribute(dataHolder, "anAttribute", ["textVarRepeat1to3InGroupOneAttribute.3"], "anAttribute");
	callWithMessageToSetValue(dataHolder, ["textVarRepeat1to3InGroupOneAttribute.3", "@anAttribute"], "aFinalValue");


	dataHolder.addChild(["textVarRepeat1to3InGroupOtherAttribute.2"], "textVariableId");
	dataHolder.addChild(["textVarRepeat1to3InGroupOtherAttribute.two"], "textVariableId");
	dataHolder.addChild(["textVarRepeat1to3InGroupOneAttribute.three"], "textVariableId");
	dataHolder.addChild(["textVarRepeat1to3InGroupOneAttribute.3"], "textVariableId");
};

QUnit.test("testAddRemoveFourDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem", function(
	assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	addFourDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder);

	let expected = {
		name: "groupIdOneTextChild",
		children: [{
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
		}]
	};
	assert.deepEqual(dataHolder.getData(), expected);
	
	let pathToVariable = ["textVarRepeat1to3InGroupOneAttribute.three"];

	dataHolder.handleMsg({
		path: pathToVariable,
		type: "remove"
	}, "x/y/z/remove");
	
	let expectedErrorMessage = "Unable to find container with " +
		"path: [\"textVarRepeat1to3InGroupOneAttribute.three\"] in dataHolder";
	assert.throws(function() {
		dataHolder.findContainer(pathToVariable);
		dataHolder.handleMsg(emptyData, "x/y/z/remove");
	}, new Error(expectedErrorMessage));

	let expectedContainerPathNoRepeatId2 = {
		'["textVarRepeat1to3InGroupOtherAttribute"]':[
			{
				name: "textVarRepeat1to3InGroupOneAttribute",
				repeatId: "2",
				children: [{
					name: "textVariableId",
					value: ""
				}],
				attributes: [{
					id: "anOtherAttribute",
					nameInData: "anOtherAttribute",
					value: "aOtherFinalValue"
				}]
			},
			{
				name: "textVarRepeat1to3InGroupOneAttribute",
				repeatId: "two", 
				children: [{
					name: "textVariableId",
					value: ""
				}],
				attributes: [{
					id: "anOtherAttribute",
					nameInData: "anOtherAttribute",
					value: "aOtherFinalValue"
				}]
			}],
		'["textVarRepeat1to3InGroupOneAttribute"]':[
			{
				name: "textVarRepeat1to3InGroupOneAttribute",
				repeatId: "3",
				children: [{
					name: "textVariableId",
					value: ""
				}],
				attributes: [{
					id: "anAttribute",
					nameInData: "anAttribute",
					value: "aFinalValue"
				}]
			}],
		'["textVarRepeat1to3InGroupOtherAttribute.2","textVariableId"]':[
			{
				name: "textVariableId",
				value: ""
			}],
		'["textVarRepeat1to3InGroupOtherAttribute.two","textVariableId"]':[
			{
				name: "textVariableId",
				value: ""
			}],
		'["textVarRepeat1to3InGroupOneAttribute.3","textVariableId"]':[
			{
				name: "textVariableId",
				value: ""
			}]
			
		
	};
	assert.stringifyEqual(dataHolder.onlyForTestGetContainerPathNoRepeatId(), expectedContainerPathNoRepeatId2);

});
QUnit.test("testHandleMessageRemoveThenFindContainer", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "groupIdOneTextChild");

	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");

	dataHolder.handleMsg({
		path: ["groupIdOneTextChild", "textVariableId"],
		type: "remove"
	}, "x/y/z/remove");

	let expected = [];
	assert.deepEqual(dataHolder.findContainersUsingPathAndMetadataId(["groupIdOneTextChild"]
		, "textVariableId"), expected);
});

QUnit.test("testHandleMessageMoveAfter", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "1");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "2");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "3");

	dataHolder.handleMsg({
		moveChild: ["groupIdOneTextChild", "textVariableId.1"],
		basePositionOnChild: ["groupIdOneTextChild", "textVariableId.2"],
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
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageMoveBefore", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "1");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "2");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "3");

	dataHolder.handleMsg({
		path: {},
		moveChild: ["groupIdOneTextChild", "textVariableId.1"],
		basePositionOnChild: ["groupIdOneTextChild", "textVariableId.3"],
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
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageMoveBeforeFirst", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "1");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "2");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "3");

	dataHolder.handleMsg({
		moveChild: ["groupIdOneTextChild", "textVariableId.3"],
		basePositionOnChild: ["groupIdOneTextChild", "textVariableId.1"],
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
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageMoveWrongPath", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "1");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "2");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId", "3");

	let dataFromMessage = {
		moveChild: ["someWrongPath", "textVariableId.1"],
		basePositionOnChild: ["groupIdOneTextChild", "textVariableId.3"],
		newPosition: "after"
	}

	let expectedErrorMessage = "Move conatiner failed, with moveChild: " +
		"[\"someWrongPath\",\"textVariableId.1\"], basePositionOnChild: [\"groupIdOneTextChild\","
		+ "\"textVariableId.3\"] and newPosition: after. "
		+ "Error: Unable to find container with path: [\"someWrongPath\",\"textVariableId.1\"] in dataHolder";

	assert.throws(function() {
		dataHolder.handleMsg(dataFromMessage, "x/y/z/move");
	},
		new Error(expectedErrorMessage)
	);
});

QUnit.test("testAddChildToGroupIdOneRecordLinkChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkChild");

	dataHolder.addChild([], "myLink");

	let expected = {
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: []
		}]
	};
	assert.deepEqual(dataHolder.getData(), expected);

	dataHolder.addChild(["myLink"], "linkedRecordTypeTextVar");
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
	assert.deepEqual(dataHolder.getData(), expectedLinkedRecordType);
});

QUnit.test("testAddChildToGroupIdOneRecordLinkWithAttributeChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkWithAttributeChild");

	dataHolder.addChild([], "myLinkWithAttribute");
	callWithMessageToAddAttribute(dataHolder, "type", ["myLinkWithAttribute"], "type");
	callWithMessageToSetValue(dataHolder, ["myLinkWithAttribute", "@type"], "image");


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
	assert.deepEqual(dataHolder.getData(), expected);

	dataHolder.addChild(["myLinkWithAttribute"], "linkedRecordTypeTextVar");

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
	assert.deepEqual(dataHolder.getData(), expectedLinkedRecordType);
});


QUnit.test("testHandleMsgLinkedDataActionLinksGroupIdOneRecordLinkChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkChild");

	dataHolder.addChild([], "myLink");

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
					accept: "application/vnd.cora.record+json"
				}
			},
			name: "type"
		},
		path: ["myLink"]
	};
	let msg = "root/recordInfo/type/linkedData";

	dataHolder.handleMsg(dataFromMsg, msg);

	let expected = {
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: []
		}]
	};
	assert.deepEqual(dataHolder.getData(), expected);

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
					accept: "application/vnd.cora.record+json"
				}
			}
		}]
	};
	assert.deepEqual(dataHolder.getDataWithActionLinks(), expectedWithLinks);
});

QUnit.test("testHandleMsgLinkedDataActionLinksGroupIdOneRecordLinkChildNoActionLink", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkChild");
	dataHolder.addChild([], "myLink");

	let dataFromMsg = {
		data: {
			children: [{
				name: "linkedRecordType",
				value: "recordType"
			}, {
				name: "linkedRecordId",
				value: "writtenText"
			}],
			name: "type"
		},
		path: ["myLink"]
	};
	let msg = "root/recordInfo/type/linkedData";

	dataHolder.handleMsg(dataFromMsg, msg);

	let expected = {
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: []
		}]
	};
	assert.deepEqual(dataHolder.getData(), expected);
	assert.deepEqual(dataHolder.getDataWithActionLinks(), expected);
});

QUnit.test("testHandleMsgLinkedDataActionLinksGroupIdOneRecordLinkChildWrongPath", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneRecordLinkChild");
	dataHolder.addChild([], "myLink");

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
					accept: "application/vnd.cora.record+json"
				}
			},
			name: "type"
		},
		path: ["myLinkNOT"]
	};
	let msg = "root/recordInfo/type/linkedData";

	let expectedErrorMessage = "Set actionLink failed. "
		+ "Error: Unable to find container with path: [\"myLinkNOT\"] in dataHolder";

	assert.throws(function() {
		dataHolder.handleMsg(dataFromMsg, msg);
	}, new Error(expectedErrorMessage));
});

QUnit.test("testAddChildToGroupIdOneResourceLinkChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneResourceLinkChild");

	dataHolder.addChild([], "masterResLink");
	let expected = {
		name: "groupIdOneResourceLinkChild",
		children: [{
			name: "master",
			mimeType: ""
		}]
	};

	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueChildToGroupIdOneResourceLinkChild", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneResourceLinkChild");
	dataHolder.addChild([], "masterResLink");
	let message = {
		data: {
			actionLinks: {
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://localhost:38080/systemone/rest/record/binary/binary:1899959244835025/large",
					accept: "image/jpeg"
				}
			},
			name: "large",
			mimeType: "image/jpeg"
		},
		path:"root/groupIdOneResourceLinkChild/masterResLink"
	};

	let expectedLinkedResourceMessage = {
		type: "setValue",
		message: {
			data: message.data,
			path: ["masterResLink"],
			type: "setValue",
			special: "resourceLink"
		}
	};
	dataHolder.handleMsg(expectedLinkedResourceMessage.message, "root/master/setValue");

	let expected = {
		name: "groupIdOneResourceLinkChild",
		children: [{
			name: "master",
			mimeType: "image/jpeg"
		}]
	};
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueChildToGroupIdOneResourceLinkChild_ActionLinksStoredInternallyInDataHolder", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneResourceLinkChild");
	dataHolder.addChild([], "masterResLink");
	let message = {
		data: {
			actionLinks: {
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://localhost:38080/systemone/rest/record/binary/binary:1899959244835025/large",
					accept: "image/jpeg"
				}
			},
			name: "large",
			mimeType: "image/jpeg"
		},
		path:"root/groupIdOneResourceLinkChild/masterResLink"
	};

	let expectedLinkedResourceMessage = {
		type: "setValue",
		message: {
			data: message.data,
			path: ["masterResLink"],
			type: "setValue",
			special: "resourceLink"
		}
	};
	dataHolder.handleMsg(expectedLinkedResourceMessage.message, "root/master/setValue");

	let expected2 = {
		name: "groupIdOneResourceLinkChild",
		children: [{
			actionLinks: {
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://localhost:38080/systemone/rest/record/binary/binary:1899959244835025/large",
					accept: "image/jpeg"
				}
			},
			name: "master",
			mimeType: "image/jpeg"
		}]
	};
	assert.deepEqual(dataHolder.getDataWithActionLinks(), expected2);
});

QUnit.test("testHandleMessageAdd", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");

	let dataFromMessage = { "metadataId": "textVariableId", "path": [], "nameInData": "textVariableId" };
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
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageAddWrongPath", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");

	let expectedErrorMessage = "Add conatiner failed, with path: [\"somePathNotFound\"]"
		+ ", metadataId: \"textVariableId\" and repeatId:1. Error: Unable to find container with "
		+ "path: [\"somePathNotFound\"] in dataHolder";

	let dataMsg = { metadataId: "textVariableId", path: ["somePathNotFound"], repeatId: 1 };
	assert.throws(function() {
		dataHolder.handleMsg(dataMsg, "root/textVariableId/add");
	},
		new Error(expectedErrorMessage)
	);
});

QUnit.test("testHandleMessageSetValue", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");

	let dataFromMessage = { "data": "A value", "path": ["groupIdOneTextChild", "textVariableId"] };

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
	assert.deepEqual(dataHolder.getData(), expected);
});

QUnit.test("testHandleMessageSetValueWrongPath", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");

	let expectedErrorMessage = "Set value into conatiner failed, with path:"
		+ " [\"groupIdOneTextChild\",\"someNotFoundPath\"] and value: A value. Error: Unable to "
		+ "find container with path: [\"groupIdOneTextChild\",\"someNotFoundPath\"] in dataHolder";

	let dataFromMessage = { "data": "A value", "path": ["groupIdOneTextChild", "someNotFoundPath"] };
	assert.throws(function() {
		dataHolder.handleMsg(dataFromMessage, "root/textVariableId/setValue");
	},
		new Error(expectedErrorMessage)
	);
});

QUnit.test("testHandleMessageNoHandledType", function(assert) {
	let dataHolder = this.newDataHolder("groupIdOneTextChild");

	dataHolder.addChild([], "groupIdOneTextChild");
	dataHolder.addChild(["groupIdOneTextChild"], "textVariableId");

	let dataFromMessage = { "data": "A value", "path": ["groupIdOneTextChild", "textVariableId"] };
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
	assert.deepEqual(dataHolder.getData(), expected);
});