/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2016, 2017, 2018, 2019, 2020 Uppsala University Library
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

QUnit.module("metadata/metadataChildInitializerTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.dependencies = {
			metadataProvider: this.metadataProvider,
			pubSub: this.pubSub,
			recordTypeProvider: CORATEST.recordTypeProviderSpy(),
			metadataChildAndRepeatInitializerFactory: CORATEST.metadataChildAndRepeatInitializerFactorySpy({})

		};
		this.spec = {
			data: undefined,
			path: {}
		};

		this.spec.childReference = {
			"name": "childReference",
			"repeatId": "0",
			"children": [{
				"name": "ref",
				"children": [{
					"name": "linkedRecordType",
					"value": "metadata"
				}, {
					"name": "linkedRecordId",
					"value": "textVariableId"
				}]
			}, {
				"name": "repeatMin",
				"value": "1"
			}, {
				"name": "repeatMax",
				"value": "1"
			}]
		};
	},
	afterEach: function() {
	}
});

CORATEST.createChildReferenceForChildInitializerWithRepeatId = function(linkedRecordId,
	linkedRecordType, repeatId, repeatMin, repeatMax) {
	return {
		"name": "childReference",
		"repeatId": repeatId,
		"children": CORATEST.createRef(linkedRecordType, linkedRecordId, repeatMin, repeatMax)
	};
};
CORATEST.createRef = function(linkedRecordType, linkedRecordId, repeatMin, repeatMax) {
	return [{
		"name": "ref",
		"children": [{
			"name": "linkedRecordType",
			"value": linkedRecordType
		}, {
			"name": "linkedRecordId",
			"value": linkedRecordId
		}]
	}, {
		"name": "repeatMin",
		"value": repeatMin
	}, {
		"name": "repeatMax",
		"value": repeatMax
	}]
};

CORATEST.createChildReferenceForChildInitializerWithNoRepeatId = function(linkedRecordId,
	linkedRecordType, repeatMin, repeatMax) {
	return {
		"name": "childReference",
		"children": CORATEST.createRef(linkedRecordType, linkedRecordId, repeatMin, repeatMax)
	};
};

QUnit.test("testInit", function(assert) {
	var metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	assert.strictEqual(metadataChildInitializer.type, "metadataChildInitializer");
});

QUnit.test("testGetSpec", function(assert) {
	var metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	assert.strictEqual(metadataChildInitializer.getSpec(), this.spec);
});
QUnit.test("testGetDependecies", function(assert) {
	var metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	assert.strictEqual(metadataChildInitializer.getDependencies(), this.dependencies);
});


QUnit.test("testInitGroupIdOneTextChildRepeatInitializerCalledCorrectly", function(assert) {
	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "textVariableId");
	assert.strictEqual(repeatSpec.path, this.spec.path);
	assert.strictEqual(repeatSpec.data, undefined);
	assert.strictEqual(repeatSpec.repeatId, undefined);

	let factored = this.dependencies.metadataChildAndRepeatInitializerFactory.getFactoredRepeatIntitializers(0);
	assert.ok(factored.getInitializeCalled());
});

QUnit.test("testInitGroupIdOneTextChildWithDataRepeatInitializerCalledCorrectly", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChild",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}]
	};
	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "textVariableId");
	assert.strictEqual(repeatSpec.path, this.spec.path);

	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);
	assert.strictEqual(repeatSpec.repeatId, undefined);

	let factored = this.dependencies.metadataChildAndRepeatInitializerFactory.getFactoredRepeatIntitializers(0);
	assert.ok(factored.getInitializeCalled());
});

function createLinkedPathWithNameInDataAsString(nameInData) {
	return JSON.stringify(createLinkedPathWithNameInData(nameInData));
}

QUnit.test("testGroupIdOneTextChildWithWrongDataRepeatInitializerCalledCorrectly", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChild",
		"children": [{
			"name": "textVariableIdNot",
			"value": "A Value"
		}]
	};


	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies,
		this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "textVariableId");
	assert.strictEqual(repeatSpec.path, this.spec.path);

	assert.stringifyEqual(repeatSpec.data, undefined);
	assert.strictEqual(repeatSpec.repeatId, undefined);

	let factored = this.dependencies.metadataChildAndRepeatInitializerFactory.getFactoredRepeatIntitializers(0);
	assert.ok(factored.getInitializeCalled());

});

QUnit.test("testInitGroupIdOneTextChildWithFinalValue", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableWithFinalValueId", "metadataTextVariable", "0", "1", "1");
	this.spec.data = {
		"name": "groupIdOneTextVarChildWithFinalValue",
		"children": [{
			"name": "textVariableIdNot",
			"value": "A Value"
		}]
	};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "textVariableWithFinalValueId");
	assert.strictEqual(repeatSpec.path, this.spec.path);

	assert.stringifyEqual(repeatSpec.data, undefined);
	assert.strictEqual(repeatSpec.repeatId, undefined);

	let factored = this.dependencies.metadataChildAndRepeatInitializerFactory.getFactoredRepeatIntitializers(0);
	assert.ok(factored.getInitializeCalled());

});

QUnit.test("testInitGroupIdTwoTextChildWithData", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChild",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}, {
			"name": "textVariableId2",
			"value": "A Value2"
		}]
	};

	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId2", "metadataTextVariable", "0", "1", "1");

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "textVariableId2");
	assert.strictEqual(repeatSpec.path, this.spec.path);

	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[1]);
	assert.strictEqual(repeatSpec.repeatId, undefined);

});

QUnit.test("testInitGroupIdTwoTextChildWithWrongData", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChild",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}, {
			"name": "textVariableId2NOT",
			"value": "A Value2"
		}]
	};
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId2", "metadataTextVariable", "0", "1", "1");
	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "textVariableId2");
	assert.strictEqual(repeatSpec.path, this.spec.path);

	assert.stringifyEqual(repeatSpec.data, undefined);
	assert.strictEqual(repeatSpec.repeatId, undefined);
});

QUnit.test("testInitOneChildRepeat0to1", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "0", "0", "1");
	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let factored = this.dependencies.metadataChildAndRepeatInitializerFactory.getFactoredRepeatIntitializers(0);
	assert.strictEqual(factored, undefined);

});

QUnit.test("testInitOneChildRepeat0to1WithData", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0to1",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}]
	};
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "0", "0", "1");
	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "textVariableId");
	assert.strictEqual(repeatSpec.path, this.spec.path);

	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);
	assert.strictEqual(repeatSpec.repeatId, undefined);

});

QUnit.test("testInitOneChildRepeat3to3", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "2", "3", "3");
	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "textVariableId");
	assert.strictEqual(repeatSpec.path, this.spec.path);

	assert.stringifyEqual(repeatSpec.data, undefined);
	assert.strictEqual(repeatSpec.repeatId, "0");

});

QUnit.test("testInitOneChildRepeat3to3WithData", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "2", "3", "3");

	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0to1",
		"children": [{
			"name": "textVariableId",
			"value": "A Value",
			"repeatId": "one"
		}, {
			"name": "textVariableId",
			"value": "A Value2",
			"repeatId": "two"
		}, {
			"name": "textVariableId",
			"value": "A Value3",
			"repeatId": "three"
		}]
	};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.repeatId, "one");
	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);

	let repeatSpec2 = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(1);
	assert.strictEqual(repeatSpec2.repeatId, "two");
	assert.stringifyEqual(repeatSpec2.data, this.spec.data.children[1]);

	let repeatSpec3 = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(2);
	assert.strictEqual(repeatSpec3.repeatId, "three");
	assert.stringifyEqual(repeatSpec3.data, this.spec.data.children[2]);

});

// function createLinkedPathWithNameInDataAndRepeatIdAsString(nameInData, repeatId) {
// return JSON.stringify(createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId));
// }
// function createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId) {
// return {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : nameInData
// }, {
// "name" : "repeatId",
// "value" : repeatId
// } ]
// };
// }

QUnit.test("testInitOneChildRepeat3to3WithDataForOne", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "2", "3", "3");
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0to1",
		"children": [{
			"name": "textVariableId",
			"value": "A Value",
			"repeatId": "one"
		}]
	};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.repeatId, "one");
	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);

	let repeatSpec2 = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(1);
	assert.strictEqual(repeatSpec2.repeatId, "0");
	assert.stringifyEqual(repeatSpec2.data, undefined);

	let repeatSpec3 = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(2);
	assert.strictEqual(repeatSpec3.repeatId, "1");
	assert.stringifyEqual(repeatSpec3.data, undefined);

});

QUnit.test("testInitOneChildRepeat3to3WithDataOCalculateRepeatId", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "2", "3", "3");
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0to1",
		"children": [{
			"name": "textVariableId",
			"value": "A Value",
			"repeatId": "5"
		}, {
			"name": "textVariableId",
			"value": "A Value2",
			"repeatId": "2"
		}]
	};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.repeatId, "5");
	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);

	let repeatSpec2 = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(1);
	assert.strictEqual(repeatSpec2.repeatId, "2");
	assert.stringifyEqual(repeatSpec2.data, this.spec.data.children[1]);

	let repeatSpec3 = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(2);
	assert.strictEqual(repeatSpec3.repeatId, "6");
	assert.stringifyEqual(repeatSpec3.data, undefined);

});

QUnit.test("testInitOneChildRepeat1toX", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "0", "1", "X");

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.repeatId, "0");
	assert.stringifyEqual(repeatSpec.data, undefined);

});

QUnit.test("testInitOneChildRepeat1toXWithDataForOne", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "0", "1", "X");
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0to1",
		"children": [{
			"name": "textVariableId",
			"value": "A Value",
			"repeatId": "one"
		}]
	};
	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.repeatId, "one");
	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);

});

QUnit.test("testInitOneChildRepeat1toXWithDataForTwo", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "0", "1", "X");
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0to1",
		"children": [{
			"name": "textVariableId",
			"value": "A Value",
			"repeatId": "one"
		}, {
			"name": "textVariableId",
			"value": "A Value2",
			"repeatId": "two"
		}]
	};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.repeatId, "one");
	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);
	let repeatSpec2 = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(1);
	assert.strictEqual(repeatSpec2.repeatId, "two");
	assert.stringifyEqual(repeatSpec2.data, this.spec.data.children[1]);

});

QUnit.test("testInitOneChildRepeat0toXPreviouslyNotRepeating", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "0", "0", "X");
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0toXPreviously0to1",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}]
	};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.repeatId, "0");
	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);

});

QUnit.test("testInitOneChildRepeat0toXPreviouslyNotRepeatingAddingNewChild", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"textVariableId", "metadataTextVariable", "0", "0", "X");
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0toXPreviously0to1",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}, {
			"name": "textVariableId",
			"value": "A Value2",
			"repeatId": "two"
		}]
	};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.repeatId, "0");
	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);
	let repeatSpec2 = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(1);
	assert.strictEqual(repeatSpec2.repeatId, "two");
	assert.stringifyEqual(repeatSpec2.data, this.spec.data.children[1]);

});

QUnit.test("testInitTextVarRepeat1to1InGroupOneAttributeInGroupWithData", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"groupIdOneTextChildOneAttribute", "metadataGroup", "0", "1", "1");
	this.spec.data = {
		"name": "groupInGroupOneTextChildOneAttribute",
		"children": [{
			"name": "groupIdOneTextChildOneAttribute",
			"children": [{
				"name": "textVariableId",
				"value": "A Value2"
			}],
			"attributes": {
				"anAttribute": "aFinalValue"
			}
		}]
	};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "groupIdOneTextChildOneAttribute");
	assert.strictEqual(repeatSpec.repeatId, undefined);
	assert.strictEqual(repeatSpec.path, this.spec.path);
	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);

});

QUnit.test("testInitTextVarRepeat1to1InGroupOneAttributeInGroupWithWrongData", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"groupIdOneTextChildOneAttribute", "metadataGroup", "0", "1", "1");

	this.spec.data = {
		"name": "groupInGroupOneTextChildOneAttribute",
		"children": [{
			"name": "groupIdOneTextChildOneAttribute",
			"children": [{
				"name": "textVariableId",
				"value": "A Value2"
			}],
			"attributes": {
				"anAttribute": "aFinalValueNOT"
			}
		}]
	};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "groupIdOneTextChildOneAttribute");
	assert.strictEqual(repeatSpec.repeatId, undefined);
	assert.stringifyEqual(repeatSpec.data, undefined);

});

QUnit.test("testInitTextVarRepeat1to1InGroupTwoAttributeInGroupWithData", function(assert) {
	this.spec.childReference = CORATEST.createChildReferenceForChildInitializerWithRepeatId(
		"groupIdOneTextChildTwoAttributes", "metadataGroup", "0", "1", "1");

	this.spec.data = {
			"name": "groupInGroupOneTextChildTwoAttributes",
			"children": [{
				"name": "groupIdOneTextChildTwoAttributes",
				"children": [{
					"name": "textVariableId",
					"value": "A Value3"
				}],
				"attributes": {
					"anAttribute": "aFinalValue",
					"anOtherAttribute": "aOtherFinalValue"
				}
			}]
		};

	let metadataChildInitializer = CORA.metadataChildInitializer(this.dependencies, this.spec);
	metadataChildInitializer.initialize();

	let repeatSpec = this.dependencies.metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
	assert.strictEqual(repeatSpec.metadataId, "groupIdOneTextChildTwoAttributes");
	assert.strictEqual(repeatSpec.repeatId, undefined);
	assert.stringifyEqual(repeatSpec.data, this.spec.data.children[0]);

});
