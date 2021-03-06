/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2016, 2020 Uppsala University Library
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
QUnit.module("metadata/metadataChildValidatorTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.dependencies = {
			"metadataProvider": this.metadataProvider,
			"pubSub": this.pubSub
		};
		this.spec = {
			"path": {},
		};
		this.spec.childReference = {
			"name": "childReference",
			"repeatId": "0",
			"children": [
				{
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

QUnit.test("testInit", function(assert) {
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);
	assert.strictEqual(metadataChildValidator.type, "metadataChildValidator");
});


QUnit.test("testGetDependencies", function(assert) {
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);
	assert.strictEqual(metadataChildValidator.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);
	assert.strictEqual(metadataChildValidator.getSpec(), this.spec);
});

QUnit.test("testValidateGroupIdOneTextChild1to1WithData", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChild",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}]
	};
	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

CORATEST.assertValidationResultOk = function(assert, validationResult, pubSub) {
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, true);
	let pubSubMessages = pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 0);
};


CORATEST.createChildReference =
	function(linkedRecordId, repeatId, repeatMin, repeatMax) {
		return {
			"name": "childReference",
			"repeatId": repeatId,
			"children": [
				{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadata"
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
	};

QUnit.test("testValidateGroupIdOneTextChild1to1WithDataEmptyValue", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChild",
		"children": [{
			"name": "textVariableId",
			"value": ""
		}]
	};
	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "1");

	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 1);
	assert.stringifyEqual(pubSubMessages[0], CORATEST.createValidationErrorMessage("textVariableId"));
});

CORATEST.createValidationErrorMessage =
	function(metadataId) {
		return {
			"type": "validationError",
			"message": {
				"metadataId": metadataId,
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": metadataId
					}]
				}
			}
		};
	};

QUnit.test("testValidateGroupIdOneCollectionChild1toXWithData", function(assert) {
	this.spec.data = {
		"name": "groupId1toXCollectionChild",
		"children": [{
			"name": "yesNoUnknownVar",
			"value": "no"
		}]
	};
	this.spec.childReference = CORATEST.createChildReference("yesNoUnknownVar", "0", "1", "X");

	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateGroupIdOneCollectionChild1toXWithDataEmptyValue", function(assert) {
	this.spec.data = {
		"name": "groupId1toXCollectionChild",
		"children": [{
			"name": "yesNoUnknownVar",
			"value": ""
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("yesNoUnknownVar", "0", "1", "X");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 1);
	assert.stringifyEqual(pubSubMessages[0], CORATEST.createValidationErrorMessage("yesNoUnknownVar"));
});

QUnit.test("testValidateGroupIdTwoTextChildWithData", function(assert) {
	this.spec.data = {
		"name": "groupIdTwoTextChild",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}, {
			"name": "textVariableId2",
			"value": "AValue2"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("textVariableId2", "0", "1", "1");

	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);
	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidategroupIdTwoTextChild1to1InGroupWithData", function(assert) {
	this.spec.data = {
		"name": "groupIdTwoTextChild1to1InGroup",
		"children": [{
			"name": "groupIdTwoTextChild",
			"children": [{
				"name": "textVariableId",
				"value": "A Value"
			}, {
				"name": "textVariableId2",
				"value": "AValue2"
			}]
		}]
	};
	this.spec.childReference = CORATEST.createChildReference("groupIdTwoTextChild", "0", "1", "1");

	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);
	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidategroupIdTwoTextChild1to1InGroupWithEmptyValue", function(assert) {
	this.spec.data = {
		"name": "groupIdTwoTextChild1to1InGroup",
		"children": [{
			"name": "groupIdTwoTextChild",
			"children": [{
				"name": "textVariableId",
				"value": ""
			}, {
				"name": "textVariableId2",
				"value": "AValue2"
			}]
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("groupIdTwoTextChild", "0", "1", "1");

	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);
	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	let validationError = {
		"type": "validationError",
		"message": {
			"metadataId": "textVariableId",
			"path": {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "groupIdTwoTextChild"
				}, {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "textVariableId"
					}]
				}]
			}
		}
	};
	assert.stringifyEqual(messages[0], validationError);
});

QUnit.test("testValidateOneChildRepeat0to1WithData", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0to1",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateOneChildRepeat0to1WithEmptyValue", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0to1",
		"children": [{
			"name": "textVariableId",
			"value": ""
		}]
	};
	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 1);
	assert.stringifyEqual(pubSubMessages[0], CORATEST.createRemoveMessage("textVariableId"));
});

CORATEST.createRemoveMessage =
	function(metadataId) {
		return {
			"type": "remove",
			"message": {
				"type": "remove",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": metadataId
					}]
				}
			}
		};
	};

QUnit.test("testValidateOneChildRepeat0to1NoData", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat0to1",
		"children": []
	};

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);
	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

// textVarRepeat1to3InGroup
QUnit.test("testValidateTextVariableRepeat1to3InGroupWithData", function(assert) {
	this.spec.data = {
		"name": "textVariableIdRepeat1to3InGroup",
		"children": [{
			"name": "textVariableId",
			"value": "A Value",
			"repeatId": "one"
		}]
	};
	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "3");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateTextVariableRepeat1to3InGroupEmptyValue", function(assert) {
	this.spec.data = {
		"name": "textVariableIdRepeat1to3InGroup",
		"children": [{
			"name": "textVariableId",
			"value": "",
			"repeatId": "one"
		}, {
			"name": "textVariableId",
			"value": "",
			"repeatId": "two"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "3");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 2);

	let removeMessage = {
		"type": "remove",
		"message": {
			"type": "remove",
			"path": {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "textVariableId"
				}, {
					"name": "repeatId",
					"value": "two"
				}]
			}
		}
	};
	assert.stringifyEqual(pubSubMessages[0], removeMessage);

	let validationError = {
		"type": "validationError",
		"message": {
			"metadataId": "textVariableId",
			"path": {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "textVariableId"
				}, {
					"name": "repeatId",
					"value": "one"
				}]
			}
		}
	};
	assert.stringifyEqual(pubSubMessages[1], validationError);
});

QUnit.test("testValidateOneChildRepeat3to3WithEmptyValueForOne", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat3to3",
		"children": [{
			"name": "textVariableId",
			"value": "A Value",
			"repeatId": "one"
		}, {
			"name": "textVariableId",
			"value": "",
			"repeatId": "two"
		}, {
			"name": "textVariableId",
			"value": "A Value3",
			"repeatId": "three"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "3", "3");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 1);


	let validationError = {
		"type": "validationError",
		"message": {
			"metadataId": "textVariableId",
			"path": {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "textVariableId"
				},
				{
					"name": "repeatId",
					"value": "two"
				}]
			}
		}
	};
	assert.stringifyEqual(pubSubMessages[0], validationError);

});

QUnit.test("testValidateOneChildRepeat1toXWithDataForOne", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat1toX",
		"children": [{
			"name": "textVariableId",
			"value": "A Value",
			"repeatId": "one"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "X");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateOneChildRepeat1toXWithDataForTwo", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat1tox",
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

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "X");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateOneChildRepeat1toXWithTwoWithDataForOne", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChildRepeat1toX",
		"children": [{
			"name": "textVariableId",
			"value": "",
			"repeatId": "one"
		}, {
			"name": "textVariableId",
			"value": "A Value2",
			"repeatId": "two"
		}]
	};
	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "X");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, true);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 1);

	let removeMessage = {
		"type": "remove",
		"message": {
			"type": "remove",
			"path": {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "textVariableId"
				}, {
					"name": "repeatId",
					"value": "one"
				}]
			}
		}
	};
	assert.stringifyEqual(pubSubMessages[0], removeMessage);
});

QUnit.test("testValidateOneChildOneAttributeWithDataForOne", function(assert) {
	this.spec.data = {
		"name": "groupIdOneTextChildOneAttribute",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		}],
		"attributes": {
			"anAttribute": "aFinalValue"
		}
	};

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateTextVarRepeat1to1InGroupOneAttributeInGroupWithData", function(assert) {
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
	this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildOneAttribute", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateTextVarRepeat1to1InGroupOneAttributeInGroupWithEmptyValue",
	function(assert) {
		this.spec.data = {
			"name": "groupInGroupOneTextChildOneAttribute",
			"children": [{
				"name": "groupIdOneTextChildOneAttribute",
				"children": [{
					"name": "textVariableId",
					"value": ""
				}],
				"attributes": {
					"anAttribute": "aFinalValue"
				}
			}]
		};
		this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildOneAttribute", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);
		let pubSubMessages = this.pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 1);

		let validationError = {
			"type": "validationError",
			"message": {
				"metadataId": "textVariableId",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "groupIdOneTextChildOneAttribute"
					}, {
						"name": "attributes",
						"children": [{
							"name": "attribute",
							"repeatId": "1",
							"children": [{
								"name": "attributeName",
								"value": "anAttribute"
							}, {
								"name": "attributeValue",
								"value": "aFinalValue"
							}]
						}]
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "textVariableId"
						}]
					}]
				}
			}
		};
		assert.stringifyEqual(pubSubMessages[0], validationError);
	});

QUnit.test("testValidateTextVarRepeat1to1InGroupTwoAttributeInGroupWithData", function(assert) {
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
	this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildTwoAttributes", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateTextVarRepeat1to1InGroupTwoAttributeInGroupWithEmptyValue",
	function(assert) {
		this.spec.data = {
			"name": "groupInGroupOneTextChildTwoAttributes",
			"children": [{
				"name": "groupIdOneTextChildTwoAttributes",
				"children": [{
					"name": "textVariableId",
					"value": ""
				}],
				"attributes": {
					"anAttribute": "aFinalValue",
					"anOtherAttribute": "aOtherFinalValue"
				}
			}]
		};
		this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildTwoAttributes", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);
		let pubSubMessages = this.pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 1);

		let validationError = {
			"type": "validationError",
			"message": {
				"metadataId": "textVariableId",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "groupIdOneTextChildTwoAttributes"
					}, {
						"name": "attributes",
						"children": [{
							"name": "attribute",
							"repeatId": "1",
							"children": [{
								"name": "attributeName",
								"value": "anAttribute"
							}, {
								"name": "attributeValue",
								"value": "aFinalValue"
							}]
						}, {
							"name": "attribute",
							"repeatId": "2",
							"children": [{
								"name": "attributeName",
								"value": "anOtherAttribute"
							}, {
								"name": "attributeValue",
								"value": "aOtherFinalValue"
							}]
						}]
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "textVariableId"
						}]
					}]
				}
			}
		};
		assert.stringifyEqual(pubSubMessages[0], validationError);
	});

QUnit.test("testValidateTextVarRepeat1to3InGroupOneAttribute"
	+ "Repeat0to2InGroupRepeat1to3InGroupWithData", function(assert) {
		this.spec.data = {
			"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"children": [{
				"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				"repeatId": "one0",
				"children": [{
					"name": "textVarRepeat1to3InGroupOneAttribute",
					"repeatId": "one1",
					"children": [{
						"name": "textVar",
						"value": "AValue3",
						"repeatId": "one2"
					}],
					"attributes": {
						"anAttribute": "aFinalValue"
					}
				}]
			}]
		};

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	});

QUnit.test("testValidateTextVarRepeat1to3InGroupOneAttribute"
	+ "Repeat0to2InGroupRepeat1to3InGroupWithEmptyValue", function(assert) {
		this.spec.data = {
			"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"children": [{
				"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				"repeatId": "one0",
				"children": [{
					"name": "textVarRepeat1to3InGroupOneAttribute",
					"repeatId": "one1",
					"children": [{
						"name": "textVar",
						"value": "",
						"repeatId": "one2"
					}],
					"attributes": {
						"anAttribute": "aFinalValue"
					}
				}]
			}]
		};

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);
		let pubSubMessages = this.pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 2);

		let validationError = {
			"type": "validationError",
			"message": {
				"metadataId": "textVar",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
					}, {
						"name": "repeatId",
						"value": "one0"
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "textVarRepeat1to3InGroupOneAttribute"
						}, {
							"name": "repeatId",
							"value": "one1"
						}, {
							"name": "attributes",
							"children": [{
								"name": "attribute",
								"repeatId": "1",
								"children": [{
									"name": "attributeName",
									"value": "anAttribute"
								}, {
									"name": "attributeValue",
									"value": "aFinalValue"
								}]
							}]
						}, {
							"name": "linkedPath",
							"children": [{
								"name": "nameInData",
								"value": "textVar"
							}, {
								"name": "repeatId",
								"value": "one2"
							}]
						}]
					}]
				}
			}
		};
		assert.stringifyEqual(pubSubMessages[0], validationError);

		let removeMessage = {
			"type": "remove",
			"message": {
				"type": "remove",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
					}, {
						"name": "repeatId",
						"value": "one0"
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "textVarRepeat1to3InGroupOneAttribute"
						}, {
							"name": "repeatId",
							"value": "one1"
						}, {
							"name": "attributes",
							"children": [{
								"name": "attribute",
								"repeatId": "1",
								"children": [{
									"name": "attributeName",
									"value": "anAttribute"
								}, {
									"name": "attributeValue",
									"value": "aFinalValue"
								}]
							}]
						}]
					}]
				}
			}
		};
		assert.stringifyEqual(pubSubMessages[1], removeMessage);
	});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
	+ "Repeat0to2InGroupRepeat1to3InGroupWithData2", function(assert) {
		this.spec.data = {
			"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"children": [{
				"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				"repeatId": "one0",
				"children": [{
					"name": "textVarRepeat1to3InGroupOneAttribute",
					"repeatId": "one1",
					"children": [{
						"name": "textVar",
						"value": "AValue3",
						"repeatId": "one2"
					}],
					"attributes": {
						"anAttribute": "aFinalValue"
					}
				}]
			}, {
				"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				"repeatId": "one0_2",
				"children": [{
					"name": "textVarRepeat1to3InGroupOneAttribute",
					"repeatId": "one1",
					"children": [{
						"name": "textVar",
						"value": "AValue3",
						"repeatId": "one2"
					}],
					"attributes": {
						"anAttribute": "aFinalValue"
					}
				}]
			}]
		};
		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
	+ "Repeat0to2InGroupRepeat1to3InGroupWithEmptyValue", function(assert) {
		this.spec.data = {
			"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"children": [{
				"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				"repeatId": "one0",
				"children": [{
					"name": "textVarRepeat1to3InGroupOneAttribute",
					"repeatId": "one1",
					"children": [{
						"name": "textVar",
						"value": "",
						"repeatId": "one2"
					}],
					"attributes": {
						"anAttribute": "aFinalValue"
					}
				}]
			}, {
				"name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				"repeatId": "one0_2",
				"children": [{
					"name": "textVarRepeat1to3InGroupOneAttribute",
					"repeatId": "one1",
					"children": [{
						"name": "textVar",
						"value": "",
						"repeatId": "one2"
					}, {
						"name": "textVar",
						"value": "AValue3",
						"repeatId": "one3"
					}],
					"attributes": {
						"anAttribute": "aFinalValue"
					}
				}]
			}]
		};

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = this.pubSub.getMessages();
		assert.strictEqual(messages.length, 4);
		let validationError = {
			"type": "validationError",
			"message": {
				"metadataId": "textVar",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
					}, {
						"name": "repeatId",
						"value": "one0"
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "textVarRepeat1to3InGroupOneAttribute"
						}, {
							"name": "repeatId",
							"value": "one1"
						}, {
							"name": "attributes",
							"children": [{
								"name": "attribute",
								"repeatId": "1",
								"children": [{
									"name": "attributeName",
									"value": "anAttribute"
								}, {
									"name": "attributeValue",
									"value": "aFinalValue"
								}]
							}]
						}, {
							"name": "linkedPath",
							"children": [{
								"name": "nameInData",
								"value": "textVar"
							}, {
								"name": "repeatId",
								"value": "one2"
							}]
						}]
					}]
				}
			}
		};
		assert.stringifyEqual(messages[0], validationError);

		let removeMessage1 = {
			"type": "remove",
			"message": {
				"type": "remove",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
					}, {
						"name": "repeatId",
						"value": "one0"
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "textVarRepeat1to3InGroupOneAttribute"
						}, {
							"name": "repeatId",
							"value": "one1"
						}, {
							"name": "attributes",
							"children": [{
								"name": "attribute",
								"repeatId": "1",
								"children": [{
									"name": "attributeName",
									"value": "anAttribute"
								}, {
									"name": "attributeValue",
									"value": "aFinalValue"
								}]
							}]
						}]
					}]
				}
			}
		};
		assert.stringifyEqual(messages[1], removeMessage1);

		let removeMessage2 = {
			"type": "remove",
			"message": {
				"type": "remove",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
					}, {
						"name": "repeatId",
						"value": "one0_2"
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "textVarRepeat1to3InGroupOneAttribute"
						}, {
							"name": "repeatId",
							"value": "one1"
						}, {
							"name": "attributes",
							"children": [{
								"name": "attribute",
								"repeatId": "1",
								"children": [{
									"name": "attributeName",
									"value": "anAttribute"
								}, {
									"name": "attributeValue",
									"value": "aFinalValue"
								}]
							}]
						}, {
							"name": "linkedPath",
							"children": [{
								"name": "nameInData",
								"value": "textVar"
							}, {
								"name": "repeatId",
								"value": "one2"
							}]
						}]
					}]
				}
			}
		};
		assert.stringifyEqual(messages[2], removeMessage2);

		let removeMessage3 = {
			"type": "remove",
			"message": {
				"type": "remove",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
					}, {
						"name": "repeatId",
						"value": "one0"
					}]
				}
			}
		};
		assert.stringifyEqual(messages[3], removeMessage3);
	});

QUnit.test("testInitTextVarRepeat1to3InGroup"
	+ "OneAttributeAndOtherAttributeRepeat0to2InGroupWithData", function(assert) {
		this.spec.data = {
			"name": "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"children": [{
				"name": "textVarRepeat1to3InGroupOneAttribute",
				"repeatId": "one1",
				"children": [{
					"name": "textVar",
					"value": "AValue3",
					"repeatId": "one2"
				}],
				"attributes": {
					"anAttribute": "aFinalValue"
				}
			}, {
				"name": "textVarRepeat1to3InGroupOneAttribute",
				"repeatId": "one1",
				"children": [{
					"name": "textVar",
					"value": "AValue33",
					"repeatId": "one22"
				}],
				"attributes": {
					"anOtherAttribute": "aOtherFinalValue"
				}
			}]
		};

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttribute", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	});

QUnit.test("testTwoChildrenSameNameInDataDifferentAttributesShouldOnlyHandleTheChildWithCorrectAttribute", function(assert) {
	this.spec.data = {
		"name": "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		"children": [{
			"name": "textVarRepeat1to3InGroupOneAttribute",
			"repeatId": "one1",
			"children": [{
				"name": "textVar",
				"value": "",
				"repeatId": "one2"
			}],
			"attributes": {
				"anAttribute": "aFinalValue"
			}
		}, {
			"name": "textVarRepeat1to3InGroupOneAttribute",
			"repeatId": "one1",
			"children": [{
				"name": "textVar",
				"value": "",
				"repeatId": "one22"
			}],
			"attributes": {
				"anOtherAttribute": "aOtherFinalValue"
			}
		}]
	};


	this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttribute", "0", "0", "2");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);


	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 2);

	let validationError = {
		"type": "validationError",
		"message": {
			"metadataId": "textVar",
			"path": {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name": "repeatId",
					"value": "one1"
				}, {
					"name": "attributes",
					"children": [{
						"name": "attribute",
						"repeatId": "1",
						"children": [{
							"name": "attributeName",
							"value": "anAttribute"
						}, {
							"name": "attributeValue",
							"value": "aFinalValue"
						}]
					}]
				}, {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "textVar"
					}, {
						"name": "repeatId",
						"value": "one2"
					}]
				}]
			}
		}
	};
	assert.stringifyEqual(messages[0], validationError);
	let validationError2 = {
		"type": "remove",
		"message": {
			"type": "remove",
			"path": {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name": "repeatId",
					"value": "one1"
				}, {
					"name": "attributes",
					"children": [{
						"name": "attribute",
						"repeatId": "1",
						"children": [{
							"name": "attributeName",
							"value": "anAttribute"
						}, {
							"name": "attributeValue",
							"value": "aFinalValue"
						}]
					}]
				}]
			}
		}
	};
	assert.stringifyEqual(messages[1], validationError2);

});

QUnit.test("testInitTextVarRepeat1to3InGroup"
	+ "OneAttributeAndOtherAttributeRepeat1to1InGroupWithData", function(assert) {

		this.spec.data = {
			"name": "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"children": [{
				"name": "textVarRepeat1to3InGroupOneAttribute",
				"children": [{
					"name": "textVar",
					"value": "AValue3",
					"repeatId": "one2"
				}],
				"attributes": {
					"anAttribute": "aFinalValue"
				}
			}, {
				"name": "textVarRepeat1to3InGroupOneAttribute",
				"children": [{
					"name": "textVar",
					"value": "AValue33",
					"repeatId": "one22"
				}],
				"attributes": {
					"anOtherAttribute": "aOtherFinalValue"
				}
			}]
		};
		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttribute", "0", "0", "2");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);

	});

QUnit.test("testInitTextVarRepeat1to3InGroup"
	+ "OneAttributeAndOtherAttributeRepeat1to1InGroupEmptyValue", function(assert) {

		this.spec.data = {
			"name": "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
			"children": [{
				"name": "textVarRepeat1to3InGroupOneAttribute",
				"children": [{
					"name": "textVar",
					"value": "",
					"repeatId": "one2"
				}],
				"attributes": {
					"anAttribute": "aFinalValue"
				}
			}, {
				"name": "textVarRepeat1to3InGroupOneAttribute",
				"children": [{
					"name": "textVar",
					"value": "",
					"repeatId": "one22"
				}],
				"attributes": {
					"anOtherAttribute": "aOtherFinalValue"
				}
			}]
		};

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttribute", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = this.pubSub.getMessages();
		assert.strictEqual(messages.length, 1);
		let validationError = {
			"type": "validationError",
			"message": {
				"metadataId": "textVar",
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "textVarRepeat1to3InGroupOneAttribute"
					}, {
						"name": "attributes",
						"children": [{
							"name": "attribute",
							"repeatId": "1",
							"children": [{
								"name": "attributeName",
								"value": "anAttribute"
							}, {
								"name": "attributeValue",
								"value": "aFinalValue"
							}]
						}]
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "textVar"
						}, {
							"name": "repeatId",
							"value": "one2"
						}]
					}]
				}
			}
		};
		assert.stringifyEqual(messages[0], validationError);
	});

QUnit.test("testValidateGroupIdOneRecordLinkWithData", function(assert) {
	this.spec.data = {
		"name": "groupIdOneRecordLinkChild",
		"children": [{
			"name": "myLink",
			"children": [{
				"name": "linkedRecordType",
				"value": "metadataTextVariable"
			}, {
				"name": "linkedRecordId",
				"value": "someInstance"
			}]
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("myLink", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);

});

QUnit.test("testValidateGroupIdOneRecordLinkWithDataEmptyValue", function(assert) {
	this.spec.data = {
		"name": "groupIdOneRecordLinkChild",
		"children": [{
			"name": "myLink",
			"children": [{
				"name": "linkedRecordType",
				"value": "metadataTextVariable"
			}, {
				"name": "linkedRecordId",
				"value": ""
			}]
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("myLink", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	let expectedMessage = {
		"type": "validationError",
		"message": {
			"metadataId": "linkedRecordIdTextVar",
			"path": {
				"name": "linkedPath",
				"children": [

					{
						"name": "nameInData",
						"value": "myLink"
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "linkedRecordId"
						}]
					}]
			}
		}
	};

	assert.stringifyEqual(messages[0], expectedMessage);
});

// "groupId0to1RecordLinkChild"
QUnit.test("testValidateGroupId0to1RecordLinkWithDataEmptyValue", function(assert) {
	this.spec.data = {
		"name": "groupId0to1RecordLinkChild",
		"children": [{
			"name": "myLink",
			"children": [{
				"name": "linkedRecordType",
				"value": "metadataTextVariable"
			}, {
				"name": "linkedRecordId",
				"value": ""
			}]
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("myLink", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 2);

	let expectedMessage = {
		"type": "validationError",
		"message": {
			"metadataId": "linkedRecordIdTextVar",
			"path": {
				"name": "linkedPath",
				"children": [

					{
						"name": "nameInData",
						"value": "myLink"
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "linkedRecordId"
						}]
					}]
			}
		}
	};
	let expectedMessage2 = {
		"type": "remove",
		"message": {
			"type": "remove",
			"path": {
				"name": "linkedPath",
				"children": [

					{
						"name": "nameInData",
						"value": "myLink"
					}]
			}
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);
	assert.stringifyEqual(messages[1], expectedMessage2);
});

//// groupIdOneRecordLinkChildWithPath
QUnit.test("testValidateGroupIdOneRecordLinkChildWithPathWithData", function(assert) {
	this.spec.data = {
		"name": "groupIdOneRecordLinkChildWithPath",
		"children": [{
			"name": "myPathLink",
			"children": [{
				"name": "linkedRecordType",
				"value": "metadataTextVariable"
			}, {
				"name": "linkedRecordId",
				"value": "someInstance"
			}, {
				"name": "linkedRepeatId",
				"value": "one"
			}]
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("myPathLink", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateGroupIdOneRecordLinkChildWithPathWithDataEmptyValue", function(assert) {
	this.spec.data = {
		"name": "groupIdOneRecordLinkChildWithPath",
		"children": [{
			"name": "myPathLink",
			"children": [{
				"name": "linkedRecordType",
				"value": "metadataTextVariable"
			}, {
				"name": "linkedRecordId",
				"value": "someInstance"
			}, {
				"name": "linkedRepeatId",
				"value": ""
			}]
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("myPathLink", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	let expectedMessage = {
		"type": "validationError",
		"message": {
			"metadataId": "linkedRepeatIdTextVar",
			"path": {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "myPathLink"
				}, {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "linkedRepeatId"
					}]
				}]
			}
		}
	};

	assert.stringifyEqual(messages[0], expectedMessage);
});
QUnit.test("testValidateGroupIdOneNumberChild1to1WithData", function(assert) {
	this.spec.data = {
		"name": "groupIdOneNumberChild",
		"children": [{
			"name": "numVariableId",
			"value": "4"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("numVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithEmptyValue", function(assert) {
	this.spec.data = {
		"name": "groupIdOneNumberChild",
		"children": [{
			"name": "numVariableId",
			"value": ""
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("numVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
});


QUnit.test("testValidateGroupIdOneNumberChild0to1WithDataEmptyValue", function(assert) {
	this.spec.data = {
		"name": "groupIdOneNumberNotMandatoryChild",
		"children": [{
			"name": "numVariableId",
			"value": ""
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("numVariableId", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"remove","message":{'
		+ '"type":"remove",' + '"path":{\"name\":\"linkedPath\"'
		+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"numVariableId\"}]}}}');
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithDataNotANumber", function(assert) {
	this.spec.data = {
		"name": "groupIdOneNumberChild",
		"children": [{
			"name": "numVariableId",
			"value": "Not a number"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("numVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"validationError","message":{'
		+ '"metadataId":"numVariableId",' + '"path":{\"name\":\"linkedPath\"'
		+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"numVariableId\"}]}}}');
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithDataMaxAboveAllowed", function(assert) {
	this.spec.data = {
		"name": "groupIdOneNumberChild",
		"children": [{
			"name": "numVariableId",
			"value": "200"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("numVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"validationError","message":{'
		+ '"metadataId":"numVariableId",' + '"path":{\"name\":\"linkedPath\"'
		+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"numVariableId\"}]}}}');
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithDataMinBelowAllowed", function(assert) {
	this.spec.data = {
		"name": "groupIdOneNumberChild",
		"children": [{
			"name": "numVariableId",
			"value": "-1"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("numVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"validationError","message":{'
		+ '"metadataId":"numVariableId",' + '"path":{\"name\":\"linkedPath\"'
		+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"numVariableId\"}]}}}');
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithDataMoreDecimalsThanAllowed", function(assert) {
	this.spec.data = {
		"name": "groupIdOneNumberChild",
		"children": [{
			"name": "numVariableId",
			"value": "1.567"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("numVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"validationError","message":{'
		+ '"metadataId":"numVariableId",' + '"path":{\"name\":\"linkedPath\"'
		+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"numVariableId\"}]}}}');
});

QUnit.test("testValidateGroupIdOneTextChild1to1OneCollectionChildWithFinalValueWithData", function(assert) {
	this.spec.data = {
		"name": "groupWithOneCollectionVarChildAndOneTextChildGroup",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		},
		{
			"name": "trueFalse",
			"value": "true"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);

});

QUnit.test("testValidateGroupIdOneTextChild1to1OneCollectionChildWithFinalValueWithIncorrectFinalValue", function(assert) {
	this.spec.data = {
		"name": "groupWithOneCollectionVarChildAndOneTextChildGroup",
		"children": [{
			"name": "textVariableId",
			"value": "A Value"
		},
		{
			"name": "trueFalse",
			"value": "false"
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("trueFalseTrueIsFinalValueCollectionVar", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	let expectedMessage = {
		"type": "validationError",
		"message": {
			"metadataId": "trueFalseTrueIsFinalValueCollectionVar",
			"path": {
				"name": "linkedPath",
				"children": [{
					"name": "nameInData",
					"value": "trueFalse"
				}]

			}
		}
	};

	assert.stringifyEqual(messages[0], expectedMessage);
});

QUnit.test("testValidateGroupInGroupIdOneTextChild0to1OneCollectionChildWithFinalValueWithData", function(assert) {
	this.spec.data = {
		"name": "groupWithOneGroupWithCollectionVarChildAndOneTextChildNonMandatoryGroup",
		"children": [{
			"name": "groupWithOneCollectionVarChildAndOneTextChildGroup",
			"children": [{
				"name": "textVariableId",
				"value": ""
			}, {
				"name": "trueFalse",
				"value": "true"
			}]
		}]
	};

	this.spec.childReference = CORATEST.createChildReference("groupWithOneCollectionVarChildAndOneTextChildGroup", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	let validationError = {
		"type": "validationError",
		"message": {
			"metadataId": "textVariableId",
			"path": {
				"name": "linkedPath",
				"children": [
					{
						"name": "nameInData",
						"value": "groupWithOneCollectionVarChildAndOneTextChildGroup"
					},
					{
						"name": "linkedPath",
						"children": [
							{
								"name": "nameInData",
								"value": "textVariableId"
							}]
					}]
			}
		}
	};
	assert.stringifyEqual(messages[0], validationError);
	let removeMessage = {
		"type": "remove",
		"message": {
			"type": "remove",
			"path": {
				"name": "linkedPath",
				"children": [
					{
						"name": "nameInData",
						"value": "groupWithOneCollectionVarChildAndOneTextChildGroup"
					}
				]
			}
		}
	};
	assert.stringifyEqual(messages[1], removeMessage);

	assert.strictEqual(messages.length, 2);
});