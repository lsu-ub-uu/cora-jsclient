/*
 * Copyright 2015, 2016, 2024 Olov McKie
  * Copyright 2016, 2020, 2024 Uppsala University Library
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
			metadataProvider: this.metadataProvider,
			pubSub: this.pubSub
		};
		this.spec = {
			path: [],
			dataHolder: CORATEST.dataHolderSpy(),
			childReference: {
				name: "childReference",
				repeatId: "0",
				children: [
					{
						name: "ref",
						children: [{
							name: "linkedRecordType",
							value: "metadata"
						}, {
							name: "linkedRecordId",
							value: "textVariableId"
						}]
					}, {
						name: "repeatMin",
						value: "1"
					}, {
						name: "repeatMax",
						value: "1"
					}]
			}
		};
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
	let dataHolder = this.spec.dataHolder;
	let container = [{
		name: "textVariableId",
		value: "A Value"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(container);

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });

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
			name: "childReference",
			repeatId: repeatId,
			children: [
				{
					name: "ref",
					children: [{
						name: "linkedRecordType",
						value: "metadata"
					}, {
						name: "linkedRecordId",
						value: linkedRecordId
					}]
				}, {
					name: "repeatMin",
					value: repeatMin
				}, {
					name: "repeatMax",
					value: repeatMax
				}]
		};
	};

QUnit.test("testValidateGroupIdOneTextChild1to1WithDataEmptyValue", function(assert) {

	let dataHolder = this.spec.dataHolder;
	let container = [{
		name: "textVariableId",
		value: ""
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(container);


	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "1");

	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 1);
	assert.stringifyEqual(pubSubMessages[0], CORATEST.createValidationErrorMessage("textVariableId"));

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
});

CORATEST.createValidationErrorMessage =
	function(metadataId) {
		return {
			type: "validationError",
			message: {
				metadataId: metadataId,
				path: [metadataId]
			}
		};
	};

QUnit.test("testValidateGroupIdOneCollectionChild1toXWithData", function(assert) {

	let dataHolder = this.spec.dataHolder;
	let container = [{
		name: "yesNoUnknownVar",
		value: "no"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(container);

	this.spec.childReference = CORATEST.createChildReference("yesNoUnknownVar", "0", "1", "X");

	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "yesNoUnknownVar", path: [] });
});

QUnit.test("testValidateGroupIdOneCollectionChild1toXWithDataEmptyValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let container = [{
		name: "yesNoUnknownVar",
		value: ""
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(container);

	this.spec.childReference = CORATEST.createChildReference("yesNoUnknownVar", "0", "1", "X");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 1);
	assert.stringifyEqual(pubSubMessages[0], CORATEST.createValidationErrorMessage("yesNoUnknownVar"));
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "yesNoUnknownVar", path: [] });
});

QUnit.test("testValidategroupIdTwoTextChild1to1InGroupWithData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerGroup = [{
		name: "groupIdTwoTextChild",
		children: [{
			name: "textVariableId",
			value: "A Value"
		}, {
			name: "textVariableId2",
			value: "AValue2"
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerGroup);

	let containerChild1 = [{
		name: "textVariableId",
		value: "A Value"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	let containerChild2 = [{
		name: "textVariableId2",
		value: "AValue2"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);


	this.spec.childReference = CORATEST.createChildReference("groupIdTwoTextChild", "0", "1", "1");

	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);
	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdTwoTextChild", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdTwoTextChild"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVariableId2", path: ["groupIdTwoTextChild"] });
});

QUnit.test("testValidategroupIdTwoTextChild1to1InGroupWithEmptyValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerGroup = [{
		name: "groupIdTwoTextChild",
		"children": [{
			name: "textVariableId",
			value: ""
		}, {
			name: "textVariableId2",
			value: "AValue2"
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerGroup);

	let containerChild1 = [{
		name: "textVariableId",
		value: ""
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	let containerChild2 = [{
		name: "textVariableId2",
		value: "AValue2"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

	this.spec.childReference = CORATEST.createChildReference("groupIdTwoTextChild", "0", "1", "1");

	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);
	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	let validationError = {
		type: "validationError",
		message: {
			metadataId: "textVariableId",
			path: ["groupIdTwoTextChild", "textVariableId"]
		}
	};
	assert.stringifyEqual(messages[0], validationError);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdTwoTextChild", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdTwoTextChild"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVariableId2", path: ["groupIdTwoTextChild"] });
});

CORATEST.createRemoveMessage =
	function(metadataId) {
		return {
			type: "remove",
			message: {
				type: "remove",
				path: [metadataId]
			}
		};
	};

QUnit.test("testValidateOneChildRepeat0to1NoData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);
	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
});

QUnit.test("testValidateTextVariableRepeat1to3InGroupWithData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableId",
		value: "A Value",
		"repeatId": "one"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "3");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
});

QUnit.test("testValidateTextVariableRepeat1to3InGroupEmptyValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableId",
		value: "",
		"repeatId": "one"
	}, {
		name: "textVariableId",
		value: "",
		"repeatId": "two"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "3");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 2);

	let removeMessage = {
		type: "remove",
		message: {
			type: "remove",
			path: ["textVariableId.two"]
		}
	};
	assert.stringifyEqual(pubSubMessages[0], removeMessage);

	let validationError = {
		type: "validationError",
		message: {
			metadataId: "textVariableId",
			path: ["textVariableId.one"]
		}
	};
	assert.stringifyEqual(pubSubMessages[1], validationError);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
});

QUnit.test("testValidateOneChildRepeat3to3WithEmptyValueForOne", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableId",
		value: "A Value",
		"repeatId": "one"
	}, {
		name: "textVariableId",
		value: "",
		"repeatId": "two"
	}, {
		name: "textVariableId",
		value: "A Value3",
		"repeatId": "three"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "3", "3");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 1);


	let validationError = {
		type: "validationError",
		message: {
			metadataId: "textVariableId",
			path: ["textVariableId.two"]
		}
	};
	assert.stringifyEqual(pubSubMessages[0], validationError);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
});

QUnit.test("testValidateOneChildRepeat1toXWithDataForOne", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableId",
		value: "A Value",
		"repeatId": "one"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "X");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
});

QUnit.test("testValidateOneChildRepeat1toXWithDataForTwo", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableId",
		value: "A Value",
		"repeatId": "one"
	}, {
		name: "textVariableId",
		value: "A Value2",
		"repeatId": "two"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "X");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
});

QUnit.test("testValidateOneChildRepeat1toXWithFourWithDataForOne", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableId",
		value: "",
		"repeatId": "one"
	}, {
		name: "textVariableId",
		value: "",
		"repeatId": "two"
	}, {
		name: "textVariableId",
		value: "",
		"repeatId": "three"
	}, {
		name: "textVariableId",
		value: "A Value2",
		"repeatId": "four"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

	this.spec.childReference = CORATEST.createChildReference("textVariableId", "0", "1", "X");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, true);

	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 3);

	let removeMessage = {
		type: "remove",
		message: {
			type: "remove",
			path: ["textVariableId.one"]
		}
	};
	assert.stringifyEqual(pubSubMessages[0], removeMessage);
	removeMessage.message.path = ["textVariableId.two"];
	assert.stringifyEqual(pubSubMessages[1], removeMessage);
	removeMessage.message.path = ["textVariableId.three"];
	assert.stringifyEqual(pubSubMessages[2], removeMessage);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
});


QUnit.test("testValidateTextVarRepeat1to1InGroupOneAttributeInGroupWithData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "groupIdOneTextChildOneAttribute",
		children: [{
			name: "textVariableId",
			value: "A Value2"
		}]
		,
		attributes: [{
			id: "anAttribute",
			nameInData: "anAttribute",
			value: "aFinalValue"
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerChild2 = [{
		name: "textVariableId",
		value: "A Value2"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

	let containerAttribute = {
		id: "anAttribute",
		nameInData: "anAttribute",
		value: "aFinalValue"
	};
	let pathToAttribute = ["groupIdOneTextChildOneAttribute", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute, containerAttribute);

	this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildOneAttribute", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);

	assert.strictEqual(this.pubSub.getMessages().length, 0);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildOneAttribute", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdOneTextChildOneAttribute"] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildOneAttribute", "@anAttribute"]);
});

QUnit.test("testValidateTextVarRepeat1to1InGroupOneAttributeInGroupWithEmptyValue",
	function(assert) {

		let dataHolder = this.spec.dataHolder;
		let containerChild = [{
			name: "groupIdOneTextChildOneAttribute",
			children: [{
				name: "textVariableId",
				value: ""
			}]
			,
			attributes: [{
				id: "anAttribute",
				nameInData: "anAttribute",
				value: "aFinalValue"
			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
		let containerChild2 = [{
			name: "textVariableId",
			value: ""
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

		let containerAttribute = {
			id: "anAttribute",
			nameInData: "anAttribute",
			value: "aFinalValue"
		};

		let pathToAttribute = ["groupIdOneTextChildOneAttribute", "@anAttribute"];
		dataHolder.setContainer(pathToAttribute, containerAttribute);

		this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildOneAttribute", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);
		let pubSubMessages = this.pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 1);

		let validationError = {
			type: "validationError",
			message: {
				metadataId: "textVariableId",
				path: ["groupIdOneTextChildOneAttribute", "textVariableId"]
			}
		};
		assert.stringifyEqual(pubSubMessages[0], validationError);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildOneAttribute", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdOneTextChildOneAttribute"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildOneAttribute", "@anAttribute"]);
	});

QUnit.test("testValidateTextVarRepeat1to1InGroupTwoAttributeInGroupWithData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "groupIdOneTextChildTwoAttributes",
		children: [{
			name: "textVariableId",
			value: "A Value3"
		}]
		,
		attributes: [{
			id: "anAttribute",
			nameInData: "anAttribute",
			value: "aFinalValue"
		}, {
			id: "anOtherAttribute",
			nameInData: "anOtherAttribute",
			value: "aOtherFinalValue"
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerChild2 = [{
		name: "textVariableId",
		value: "A Value3"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

	let containerAttribute = {
		id: "anAttribute",
		nameInData: "anAttribute",
		value: "aFinalValue"
	};
	let pathToAttribute = ["groupIdOneTextChildTwoAttributes", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute, containerAttribute);

	let containerAttribute2 = {
		id: "anOtherAttribute",
		nameInData: "anOtherAttribute",
		value: "aOtherFinalValue"
	};
	let pathToAttribute2 = ["groupIdOneTextChildTwoAttributes", "@anOtherAttribute"];
	dataHolder.setContainer(pathToAttribute2, containerAttribute2);

	this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildTwoAttributes", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildTwoAttributes", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdOneTextChildTwoAttributes"] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildTwoAttributes", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPath(1), ["groupIdOneTextChildTwoAttributes", "@anOtherAttribute"]);
});

QUnit.test("testValidateTextVarRepeat1to1InGroupTwoAttributeInGroupWithEmptyValue", function(assert) {

	let dataHolder = this.spec.dataHolder;

	let containerChild0 = [{
		name: "groupInGroupOneTextChildTwoAttributes",
		children: [{
			name: "groupIdOneTextChildTwoAttributes",
			children: [{
				name: "textVariableId",
				value: ""
			}],
			attributes: [{
				id: "anAttribute",
				nameInData: "anAttribute",
				value: "aFinalValue"
			}, {
				id: "anOtherAttribute",
				nameInData: "anOtherAttribute",
				value: "aOtherFinalValue"
			}]
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = containerChild0[0].children;
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);
	let containerChild2 = [{
		name: "textVariableId",
		value: ""
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

	let containerAttribute = {
		id: "anAttribute",
		nameInData: "anAttribute",
		value: "aFinalValue"
	};
	let pathToAttribute = ["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute, containerAttribute);

	let containerAttribute2 = {
		id: "anOtherAttribute",
		nameInData: "anOtherAttribute",
		value: "aOtherFinalValue"
	};
	let pathToAttribute2 = ["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes", "@anOtherAttribute"];
	dataHolder.setContainer(pathToAttribute2, containerAttribute2);

	this.spec.childReference = CORATEST.createChildReference("groupInGroupOneTextChildTwoAttributes", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);
	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 1);

	let validationError = {
		type: "validationError",
		message: {
			metadataId: "textVariableId",
			path: ["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes", "textVariableId"]
		}
	};
	assert.stringifyEqual(pubSubMessages[0], validationError);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupInGroupOneTextChildTwoAttributes", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "groupIdOneTextChildTwoAttributes", path: ["groupInGroupOneTextChildTwoAttributes"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVariableId", path: ["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes"] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPath(1), ["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes", "@anOtherAttribute"]);
});

QUnit.test("testValidateTextVarRepeat1to3InGroupOneAttribute"
	+ "Repeat0to2InGroupRepeat1to3InGroupWithData", function(assert) {

		let dataHolder = this.spec.dataHolder;

		let containerChild0 = [{
			name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			children: [{
				name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				repeatId: "one0",
				children: [{
					name: "textVarRepeat1to3InGroupOneAttribute",
					repeatId: "one1",
					children: [{
						name: "textVar",
						value: "AValue3",
						repeatId: "one2"
					}]
					,
					attributes: [{
						id: "anAttribute",
						nameInData: "anAttribute",
						value: "aFinalValue"
					}]
				}]
			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		let containerChild1 = containerChild0[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

		let containerChild2 = containerChild1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

		let containerChild3 = containerChild2[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3);

		let containerAttribute = containerChild2[0].attributes[0];
		let pathToAttribute = ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
			"textVarRepeat1to3InGroupOneAttribute.one1",
			"@anAttribute"];
		dataHolder.setContainer(pathToAttribute, containerAttribute);

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
	});

QUnit.test("testValidateTextVarRepeat1to3InGroupOneAttribute"
	+ "Repeat0to2InGroupRepeat1to3InGroupWithEmptyValue", function(assert) {
		let dataHolder = this.spec.dataHolder;
		let containerChild0 = [{
			name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			children: [{
				name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				repeatId: "one0",
				children: [{
					name: "textVarRepeat1to3InGroupOneAttribute",
					repeatId: "one1",
					children: [{
						name: "textVar",
						value: "",
						repeatId: "one2"
					}]
					,
					attributes: [{
						id: "anAttribute",
						nameInData: "anAttribute",
						value: "aFinalValue"
					}]
				}]
			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		let containerChild1 = containerChild0[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

		let containerChild2 = containerChild1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

		let containerChild3 = containerChild2[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3);

		let containerAttribute = containerChild2[0].attributes[0];
		let pathToAttribute = ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
			"textVarRepeat1to3InGroupOneAttribute.one1",
			"@anAttribute"];
		dataHolder.setContainer(pathToAttribute, containerAttribute);

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);
		let pubSubMessages = this.pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 2);

		let validationError = {
			type: "validationError",
			message: {
				metadataId: "textVar",
				path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
					"textVarRepeat1to3InGroupOneAttribute.one1", "textVar.one2"]

			}
		};
		assert.stringifyEqual(pubSubMessages[0], validationError);

		let removeMessage = {
			type: "remove",
			message: {
				type: "remove",
				path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
					"textVarRepeat1to3InGroupOneAttribute.one1"]
			}
		};
		assert.stringifyEqual(pubSubMessages[1], removeMessage);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
	});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
	+ "Repeat0to2InGroupRepeat1to3InGroupWithData2", function(assert) {

		let dataHolder = this.spec.dataHolder;
		let containerChild0 = [{
			name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			children: [{
				name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				repeatId: "one0",
				children: [{
					name: "textVarRepeat1to3InGroupOneAttribute",
					repeatId: "one1",
					children: [{
						name: "textVar",
						value: "AValue3",
						repeatId: "one2"
					}]
					,
					attributes: [{
						id: "anAttribute",
						nameInData: "anAttribute",
						value: "aFinalValue"
					}]
				}]
			},
			{
				name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				repeatId: "one0_2",
				children: [{
					name: "textVarRepeat1to3InGroupOneAttribute",
					repeatId: "one1",
					children: [{
						name: "textVar",
						value: "AValue3",
						repeatId: "one2"
					}]
					,
					attributes: [{
						id: "anAttribute",
						nameInData: "anAttribute",
						value: "aFinalValue"
					}]
				}]
			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		let containerChildren1Level = containerChild0[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChildren1Level);

		let containerChild2 = containerChildren1Level[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

		let containerChild3 = containerChild2[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3);

		let containerAttribute = containerChild2[0].attributes[0];
		let pathToAttribute = ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
			"textVarRepeat1to3InGroupOneAttribute.one1",
			"@anAttribute"];
		dataHolder.setContainer(pathToAttribute, containerAttribute);

		let containerChild2_1 = containerChildren1Level[1].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2_1);

		let containerChild3_1 = containerChild2_1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3_1);

		let containerAttribute_1 = containerChild2_1[0].attributes[0];
		let pathToAttribute_1 = ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2",
			"textVarRepeat1to3InGroupOneAttribute.one1",
			"@anAttribute"];
		dataHolder.setContainer(pathToAttribute_1, containerAttribute_1);

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(4), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(5), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2", "textVarRepeat1to3InGroupOneAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(1), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
	});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
	+ "Repeat0to2InGroupRepeat1to3InGroupWithEmptyValue", function(assert) {
		let dataHolder = this.spec.dataHolder;
		let containerChild0 = [{
			name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			children: [{
				name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				repeatId: "one0",
				children: [{
					name: "textVarRepeat1to3InGroupOneAttribute",
					repeatId: "one1",
					children: [{
						name: "textVar",
						value: "",
						repeatId: "one2"
					}],
					attributes: [{
						id: "anAttribute",
						nameInData: "anAttribute",
						value: "aFinalValue"
					}]
				}]
			},
			{
				name: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
				repeatId: "one0_2",
				children: [{
					name: "textVarRepeat1to3InGroupOneAttribute",
					repeatId: "one1",
					children: [{
						name: "textVar",
						value: "",
						repeatId: "one2"
					}, {
						name: "textVar",
						value: "AValue3",
						repeatId: "one3"
					}]
					,
					attributes: [{
						id: "anAttribute",
						nameInData: "anAttribute",
						value: "aFinalValue"
					}]
				}]
			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		let containerChildren1Level = containerChild0[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChildren1Level);

		let containerChild2 = containerChildren1Level[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

		let containerChild3 = containerChild2[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3);

		let containerAttribute = containerChild2[0].attributes[0];
		let pathToAttribute = ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
			"textVarRepeat1to3InGroupOneAttribute.one1",
			"@anAttribute"];
		dataHolder.setContainer(pathToAttribute, containerAttribute);

		let containerChild2_1 = containerChildren1Level[1].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2_1);

		let containerChild3_1 = containerChild2_1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3_1);

		let containerAttribute_1 = containerChild2_1[0].attributes[0];
		let pathToAttribute_1 = ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2",
			"textVarRepeat1to3InGroupOneAttribute.one1",
			"@anAttribute"];
		dataHolder.setContainer(pathToAttribute_1, containerAttribute_1);



		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = this.pubSub.getMessages();
		assert.strictEqual(messages.length, 4);
		let validationError = {
			type: "validationError",
			message: {
				metadataId: "textVar",
				path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
					"textVarRepeat1to3InGroupOneAttribute.one1", "textVar.one2"]
			}
		};
		assert.stringifyEqual(messages[0], validationError);

		let removeMessage1 = {
			type: "remove",
			message: {
				type: "remove",
				path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
					"textVarRepeat1to3InGroupOneAttribute.one1"]
			}
		};
		assert.stringifyEqual(messages[1], removeMessage1);
		let removeMessage2 = {
			type: "remove",
			message: {
				type: "remove",
				path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2",
					"textVarRepeat1to3InGroupOneAttribute.one1", "textVar.one2"]
			}
		};
		assert.stringifyEqual(messages[2], removeMessage2);

		let removeMessage3 = {
			type: "remove",
			message: {
				type: "remove",
				path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0"]
			}
		};
		assert.stringifyEqual(messages[3], removeMessage3);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(4), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(5), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2", "textVarRepeat1to3InGroupOneAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(1), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
	});

QUnit.test("testInitTextVarRepeat1to3InGroup"
	+ "OneAttributeAndOtherAttributeRepeat0to2InGroupWithData", function(assert) {

		let dataHolder = this.spec.dataHolder;
		let containerChild0 = [{
			name: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			children: [{
				name: "textVarRepeat1to3InGroupOneAttribute",
				repeatId: "one1",
				children: [{
					name: "textVar",
					value: "AValue3",
					repeatId: "one2"
				}],
				attributes: [{
					id: "anAttribute",
					nameInData: "anAttribute",
					value: "aFinalValue"
				}]
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				repeatId: "one1",
				children: [{
					name: "textVar",
					value: "AValue33",
					repeatId: "one22"
				}],
				attributes: [{
					id: "anOtherAttribute",
					nameInData: "anOtherAttribute",
					value: "aOtherFinalValue"
				}]

			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		let containerChild1 = [containerChild0[0].children[0]];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

		let containerChild2 = containerChild1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

		let containerAttribute = containerChild1[0].attributes[0];
		let pathToAttribute = ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"textVarRepeat1to3InGroupOneAttribute.one1",
			"@anAttribute"];
		dataHolder.setContainer(pathToAttribute, containerAttribute);


		//second half
		let containerChild1_1 = [containerChild0[0].children[1]];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1_1);

		let containerChild2_1 = containerChild1_1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2_1);

		let containerChild3_1 = containerChild2_1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3_1);

		let containerAttribute_1 = containerChild1_1[0].attributes[0];
		let pathToAttribute_1 = ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"textVarRepeat1to3InGroupOtherAttribute.one1",
			"@anOtherAttribute"];
		dataHolder.setContainer(pathToAttribute_1, containerAttribute_1);

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVarRepeat1to3InGroupOtherAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(4), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(1), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1", "@anOtherAttribute"]);
	});

QUnit.test("testTwoChildrenSameNameInDataDifferentAttributesShouldOnlyHandleTheChildWithCorrectAttributeWithoutData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		children: [{
			name: "textVarRepeat1to3InGroupOneAttribute",
			repeatId: "one1",
			children: [{
				name: "textVar",
				value: "",
				repeatId: "one2"
			}],
			attributes: [{
				id: "anAttribute",
				nameInData: "anAttribute",
				value: "aFinalValue"
			}]
		}, {
			name: "textVarRepeat1to3InGroupOneAttribute",
			repeatId: "one1",
			children: [{
				name: "textVar",
				value: "",
				repeatId: "one22"
			}],
			attributes: [{
				id: "anOtherAttribute",
				nameInData: "anOtherAttribute",
				value: "aOtherFinalValue"
			}]

		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = [containerChild0[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	let containerChild2 = containerChild1[0].children;
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

	let containerAttribute = containerChild1[0].attributes[0];
	let pathToAttribute = ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		"textVarRepeat1to3InGroupOneAttribute.one1",
		"@anAttribute"];
	dataHolder.setContainer(pathToAttribute, containerAttribute);

	//second half
	let containerChild1_1 = [containerChild0[0].children[1]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1_1);

	let containerChild2_1 = containerChild1_1[0].children;
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2_1);

	let containerChild3_1 = containerChild2_1[0].children;
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3_1);

	let containerAttribute_1 = containerChild1_1[0].attributes[0];
	let pathToAttribute_1 = ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		"textVarRepeat1to3InGroupOtherAttribute.one1",
		"@anOtherAttribute"];
	dataHolder.setContainer(pathToAttribute_1, containerAttribute_1);

	this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "0", "0", "2");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);


	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 5);

	let validationError = {
		type: "validationError",
		message: {
			metadataId: "textVar",
			path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1", "textVar.one2"]
		}
	};
	assert.stringifyEqual(messages[0], validationError);

	let validationError2 = {
		type: "remove",
		message: {
			type: "remove",
			path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1"]
		}
	};
	assert.stringifyEqual(messages[1], validationError2);
	let validationError3 = {
		type: "validationError",
		message: {
			metadataId: "textVar",
			path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1", "textVar.one22"]
		}
	};
	assert.stringifyEqual(messages[2], validationError3);

	let validationError4 = {
		type: "remove",
		message: {
			type: "remove",
			path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1"]
		}
	};
	assert.stringifyEqual(messages[3], validationError4);

	let validationError5 = {
		type: "remove",
		message: {
			type: "remove",
			path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"]
		}
	};
	assert.stringifyEqual(messages[4], validationError5);


	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1"] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVarRepeat1to3InGroupOtherAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(4), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1"] });
	assert.deepEqual(dataHolder.getRequestedPath(1), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1", "@anOtherAttribute"]);
});

QUnit.test("testInitTextVarRepeat1to3InGroup"
	+ "OneAttributeAndOtherAttributeRepeat1to1InGroupWithData", function(assert) {

		let dataHolder = this.spec.dataHolder;
		let containerChild0 = [{
			name: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			children: [{
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "AValue3",
					repeatId: "one2"
				}],
				attributes: [{
					id: "anAttribute",
					nameInData: "anAttribute",
					value: "aFinalValue"
				}]
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "AValue33",
					repeatId: "one22"
				}],
				attributes: [{
					id: "anOtherAttribute",
					nameInData: "anOtherAttribute",
					value: "aOtherFinalValue"
				}]

			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		let containerChild1 = [containerChild0[0].children[0]];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

		let containerChild2 = containerChild1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

		let containerAttribute = containerChild1[0].attributes[0];
		let pathToAttribute = ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"textVarRepeat1to3InGroupOneAttribute",
			"@anAttribute"];
		dataHolder.setContainer(pathToAttribute, containerAttribute);

		//second half
		let containerChild1_1 = [containerChild0[0].children[1]];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1_1);

		let containerChild2_1 = containerChild1_1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2_1);

		let containerChild3_1 = containerChild2_1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3_1);

		let containerAttribute_1 = containerChild1_1[0].attributes[0];
		let pathToAttribute_1 = ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"textVarRepeat1to3InGroupOtherAttribute",
			"@anOtherAttribute"];
		dataHolder.setContainer(pathToAttribute_1, containerAttribute_1);

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "0", "0", "2");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();

		CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVarRepeat1to3InGroupOtherAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(4), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute"] });
		assert.deepEqual(dataHolder.getRequestedPath(1), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute", "@anOtherAttribute"]);

	});

QUnit.test("testInitTextVarRepeat1to3InGroup"
	+ "OneAttributeAndOtherAttributeRepeat1to1InGroupEmptyValue", function(assert) {

		let dataHolder = this.spec.dataHolder;
		let containerChild0 = [{
			name: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
			children: [{
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "",
					repeatId: "one2"
				}],
				attributes: [{
					id: "anAttribute",
					nameInData: "anAttribute",
					value: "aFinalValue"
				}]
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "",
					repeatId: "one22"
				}],
				attributes: [{
					id: "anOtherAttribute",
					nameInData: "anOtherAttribute",
					value: "aOtherFinalValue"
				}]

			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		let containerChild1 = [containerChild0[0].children[0]];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

		let containerChild2 = containerChild1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

		let containerAttribute = containerChild1[0].attributes[0];
		let pathToAttribute = ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
			"textVarRepeat1to3InGroupOneAttribute",
			"@anAttribute"];
		dataHolder.setContainer(pathToAttribute, containerAttribute);

		//second half
		let containerChild1_1 = [containerChild0[0].children[1]];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1_1);

		let containerChild2_1 = containerChild1_1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2_1);

		let containerChild3_1 = containerChild2_1[0].children;
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3_1);

		let containerAttribute_1 = containerChild1_1[0].attributes[0];
		let pathToAttribute_1 = ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
			"textVarRepeat1to3InGroupOtherAttribute",
			"@anOtherAttribute"];
		dataHolder.setContainer(pathToAttribute_1, containerAttribute_1);

		this.spec.childReference = CORATEST.createChildReference("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = this.pubSub.getMessages();
		assert.strictEqual(messages.length, 2);
		let validationError = {
			type: "validationError",
			message: {
				metadataId: "textVar",
				path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup", "textVarRepeat1to3InGroupOneAttribute",
					"textVar.one2"]
			}
		};
		assert.stringifyEqual(messages[0], validationError);
		let validationError1 = {
			type: "validationError",
			message: {
				metadataId: "textVar",
				path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup", "textVarRepeat1to3InGroupOtherAttribute",
					"textVar.one22"]
			}
		};
		assert.stringifyEqual(messages[1], validationError1);
	});

QUnit.test("testValidateGroupIdOneRecordLinkWithData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: [{
				name: "linkedRecordType",
				value: "metadataTextVariable"
			}, {
				name: "linkedRecordId",
				value: "someInstance"
			}]
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = [containerChild0[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	let containerChild2 = [containerChild1[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

	let containerChild3 = [containerChild1[0].children[1]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild3);


	this.spec.childReference = CORATEST.createChildReference("groupIdOneRecordLinkChild", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
		{ metadataId: "groupIdOneRecordLinkChild", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
		{ metadataId: "myLink", path: ["groupIdOneRecordLinkChild"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2),
		{ metadataId: "linkedRecordIdTextVar", path: ["groupIdOneRecordLinkChild", "myLink"] });
});

QUnit.test("testValidateGroupIdOneRecordLinkWithDataEmptyValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "groupIdOneRecordLinkChild",
		children: [{
			name: "myLink",
			children: [{
				name: "linkedRecordType",
				value: "metadataTextVariable"
			}, {
				name: "linkedRecordId",
				value: ""
			}]
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = [containerChild0[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	let linkedRecordIdChild = [containerChild1[0].children[1]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(linkedRecordIdChild);

	this.spec.childReference = CORATEST.createChildReference("groupIdOneRecordLinkChild", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	let expectedMessage = {
		type: "validationError",
		message: {
			metadataId: "linkedRecordIdTextVar",
			path: ["groupIdOneRecordLinkChild", "myLink", "linkedRecordIdTextVar"]
		}
	};

	assert.stringifyEqual(messages[0], expectedMessage);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
		{ metadataId: "groupIdOneRecordLinkChild", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
		{ metadataId: "myLink", path: ["groupIdOneRecordLinkChild"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2),
		{ metadataId: "linkedRecordIdTextVar", path: ["groupIdOneRecordLinkChild", "myLink"] });
});

QUnit.test("testValidateGroupId0to1ResourceLink", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "groupId0to1ResourceLinkChild",
		children: [{
			name: "myResourceLink",
			children: []
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = [containerChild0[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	this.spec.childReference = CORATEST.createChildReference("groupId0to1ResourceLinkChild", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testValidateGroupId0to1RecordLinkWithDataEmptyValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "groupId0to1RecordLinkChild",
		children: [{
			name: "myLink",
			children: [{
				name: "linkedRecordType",
				value: "metadataTextVariable"
			}, {
				name: "linkedRecordId",
				value: ""
			}]
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = [containerChild0[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	let linkedRecordIdChild = [containerChild1[0].children[1]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(linkedRecordIdChild);

	this.spec.childReference = CORATEST.createChildReference("groupId0to1RecordLinkChild", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 3);

	let expectedMessage = {
		type: "validationError",
		message: {
			metadataId: "linkedRecordIdTextVar",
			path: ["groupId0to1RecordLinkChild", "myLink", "linkedRecordIdTextVar"]
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);
	let expectedMessage2 = {
		type: "remove",
		message: {
			type: "remove",
			path: ["groupId0to1RecordLinkChild", "myLink"]
		}
	};
	assert.stringifyEqual(messages[1], expectedMessage2);
	let expectedMessage3 = {
		type: "remove",
		message: {
			type: "remove",
			path: ["groupId0to1RecordLinkChild"]
		}
	};
	assert.stringifyEqual(messages[2], expectedMessage3);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
		{ metadataId: "groupId0to1RecordLinkChild", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
		{ metadataId: "myLink", path: ["groupId0to1RecordLinkChild"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2),
		{ metadataId: "linkedRecordIdTextVar", path: ["groupId0to1RecordLinkChild", "myLink"] });
});

//// groupIdOneRecordLinkChildWithPath
QUnit.test("testValidateGroupIdOneRecordLinkChildWithPathWithData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "groupIdOneRecordLinkChildWithPath",
		children: [{
			name: "myPathLink",
			children: [{
				name: "linkedRecordType",
				value: "metadataTextVariable"
			}, {
				name: "linkedRecordId",
				value: "someInstance"
			}, {
				name: "linkedRepeatId",
				value: "one"
			}]
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = [containerChild0[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	let linkedRecordIdChild = [containerChild1[0].children[1]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(linkedRecordIdChild);

	let linkedRepeatIdChild = [containerChild1[0].children[2]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(linkedRepeatIdChild);

	this.spec.childReference = CORATEST.createChildReference("groupIdOneRecordLinkChildWithPath", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
		{ metadataId: "groupIdOneRecordLinkChildWithPath", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
		{ metadataId: "myPathLink", path: ["groupIdOneRecordLinkChildWithPath"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2),
		{ metadataId: "linkedRecordIdTextVar", path: ["groupIdOneRecordLinkChildWithPath", "myPathLink"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3),
		{ metadataId: "linkedRepeatIdTextVar", path: ["groupIdOneRecordLinkChildWithPath", "myPathLink"] });
});

QUnit.test("testValidateGroupIdOneRecordLinkChildWithPathWithDataEmptyValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "groupIdOneRecordLinkChildWithPath",
		children: [{
			name: "myPathLink",
			children: [{
				name: "linkedRecordType",
				value: "metadataTextVariable"
			}, {
				name: "linkedRecordId",
				value: "someInstance"
			}, {
				name: "linkedRepeatId",
				value: ""
			}]
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = [containerChild0[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	let linkedRecordIdChild = [containerChild1[0].children[1]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(linkedRecordIdChild);

	let linkedRepeatIdChild = [containerChild1[0].children[2]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(linkedRepeatIdChild);

	this.spec.childReference = CORATEST.createChildReference("groupIdOneRecordLinkChildWithPath", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	let expectedMessage = {
		type: "validationError",
		message: {
			metadataId: "linkedRepeatIdTextVar",
			path: ["groupIdOneRecordLinkChildWithPath", "myPathLink", "linkedRepeatIdTextVar"]
		}
	};

	assert.stringifyEqual(messages[0], expectedMessage);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
		{ metadataId: "groupIdOneRecordLinkChildWithPath", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
		{ metadataId: "myPathLink", path: ["groupIdOneRecordLinkChildWithPath"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2),
		{ metadataId: "linkedRecordIdTextVar", path: ["groupIdOneRecordLinkChildWithPath", "myPathLink"] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3),
		{ metadataId: "linkedRepeatIdTextVar", path: ["groupIdOneRecordLinkChildWithPath", "myPathLink"] });
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	CORATEST.setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "4");

	this.spec.childReference = CORATEST.createChildReference("groupIdOneNumberChild", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	CORATEST.assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
});

CORATEST.setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue = function(dataHolder, value) {
	let containerChild0 = [{
		name: "groupIdOneNumberChild",
		children: [{
			name: "numVariableId",
			value: value
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = [containerChild0[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);
};

CORATEST.assertDataHolderCalledCorrectlyForgroupIdOneNumberChild = function(assert, dataHolder) {
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
		{ metadataId: "groupIdOneNumberChild", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
		{ metadataId: "numVariableId", path: ["groupIdOneNumberChild"] });
};

QUnit.test("testValidateGroupIdOneNumberChild1to1WithEmptyValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	CORATEST.setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "");

	this.spec.childReference = CORATEST.createChildReference("groupIdOneNumberChild", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	let expectedMessage = {
		type: "validationError",
		message: {
			metadataId: "numVariableId",
			path: ["groupIdOneNumberChild", "numVariableId"]
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);
	CORATEST.assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
});

QUnit.test("testValidateGroupIdOneNumberChild0to1WithDataEmptyValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "groupIdOneNumberNotMandatoryChild",
		children: [{
			name: "numVariableId",
			value: ""
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	let containerChild1 = [containerChild0[0].children[0]];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

	this.spec.childReference = CORATEST.createChildReference("groupIdOneNumberNotMandatoryChild", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 2);

	let expectedResult = {
		type: "remove",
		message: {
			type: "remove",
			path: ["groupIdOneNumberNotMandatoryChild", "numVariableId"]
		}
	};
	assert.deepEqual(messages[0], expectedResult);
	let expectedResult2 = {
		type: "remove",
		message: {
			type: "remove",
			path: ["groupIdOneNumberNotMandatoryChild"]
		}
	};
	assert.deepEqual(messages[1], expectedResult2);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
		{ metadataId: "groupIdOneNumberNotMandatoryChild", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
		{ metadataId: "numVariableId", path: ["groupIdOneNumberNotMandatoryChild"] });
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithDataNotANumber", function(assert) {
	let dataHolder = this.spec.dataHolder;
	CORATEST.setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "Not a number");

	this.spec.childReference = CORATEST.createChildReference("groupIdOneNumberChild", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();

	let expectedResult = {
		type: "validationError",
		message: {
			metadataId: "numVariableId",
			path: ["groupIdOneNumberChild", "numVariableId"]
		}
	};
	assert.deepEqual(messages[0], expectedResult);
	CORATEST.assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithDataMaxAboveAllowed", function(assert) {
	let dataHolder = this.spec.dataHolder;
	CORATEST.setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "200");

	this.spec.childReference = CORATEST.createChildReference("groupIdOneNumberChild", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	let expectedResult = {
		type: "validationError",
		message: {
			metadataId: "numVariableId",
			path: ["groupIdOneNumberChild", "numVariableId"]
		}
	};

	assert.deepEqual(messages[0], expectedResult);
	CORATEST.assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithDataMinBelowAllowed", function(assert) {
	let dataHolder = this.spec.dataHolder;
	CORATEST.setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "-1");

	this.spec.childReference = CORATEST.createChildReference("groupIdOneNumberChild", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	let expectedResult = {
		type: "validationError",
		message: {
			metadataId: "numVariableId",
			path: ["groupIdOneNumberChild", "numVariableId"]
		}
	};

	assert.deepEqual(messages[0], expectedResult);
	CORATEST.assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
});

QUnit.test("testValidateGroupIdOneNumberChild1to1WithDataMoreDecimalsThanAllowed", function(assert) {
	let dataHolder = this.spec.dataHolder;
	CORATEST.setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "1.567");

	this.spec.childReference = CORATEST.createChildReference("groupIdOneNumberChild", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	let expectedResult = {
		type: "validationError",
		message: {
			metadataId: "numVariableId",
			path: ["groupIdOneNumberChild", "numVariableId"]
		}
	};

	assert.deepEqual(messages[0], expectedResult);
	CORATEST.assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
});

QUnit.test("testValidateGroupIdOneTextChild1to1OneCollectionChildWithFinalValueWithData", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "trueFalse",
		value: "true"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	this.spec.childReference = CORATEST.createChildReference("trueFalseTrueIsFinalValueCollectionVar", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);
	let pubSubMessages = this.pubSub.getMessages();
	assert.strictEqual(pubSubMessages.length, 0);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
		{ metadataId: "trueFalseTrueIsFinalValueCollectionVar", path: [] });
});

QUnit.test("testValidateGroupIdOneTextChild1to1OneCollectionChildWithFinalValueWithIncorrectFinalValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild0 = [{
		name: "trueFalse",
		value: "false"
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

	this.spec.childReference = CORATEST.createChildReference("trueFalseTrueIsFinalValueCollectionVar", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	let expectedMessage = {
		type: "validationError",
		message: {
			metadataId: "trueFalseTrueIsFinalValueCollectionVar",
			path: ["trueFalseTrueIsFinalValueCollectionVar"]
		}
	};

	assert.stringifyEqual(messages[0], expectedMessage);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
		{ metadataId: "trueFalseTrueIsFinalValueCollectionVar", path: [] });
});
//textVariableWithAnAttribute 
//textVariableWithAnAttributeChoice
//textVariableWithAnAttributeAndAnAttributeChoice (aFinalValue aOtherFinalValue)
QUnit.test("testTextVariableWithAnAttribute", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableWithAnAttribute",
		value: "A Value3",
		attributes: [{
			id: "anAttribute",
			nameInData: "anAttribute",
			value: "aFinalValue"
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerAttribute = containerChild[0].attributes[0];
	let pathToAttribute = ["textVariableWithAnAttribute", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute, containerAttribute);

	this.spec.childReference = CORATEST.createChildReference("textVariableWithAnAttribute", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttribute", path: [] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttribute", "@anAttribute"]);
});

QUnit.test("testTextVariableWithAnAttributeChoice", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableWithAnAttributeChoice",
		value: "A Value3",
		attributes: [{
			id: "anAttributeChoice",
			nameInData: "anAttributeChoice",
			value: "aFinalValue"
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerAttribute = containerChild[0].attributes[0];
	let pathToAttribute = ["textVariableWithAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute, containerAttribute);

	this.spec.childReference = CORATEST.createChildReference("textVariableWithAnAttributeChoice", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();

	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeChoice", "@anAttributeChoice"]);
});

QUnit.test("testTextVariableWithAnAttributeChoiceNoAttributeValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableWithAnAttributeChoice",
		value: "A Value3",
		attributes: [{
			id: "anAttributeChoice",
			nameInData: "anAttributeChoice",
			value: ""
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerAttribute = containerChild[0].attributes[0];
	let pathToAttribute = ["textVariableWithAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute, containerAttribute);

	this.spec.childReference = CORATEST.createChildReference("textVariableWithAnAttributeChoice", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	let expectedMessage = {
		type: "validationError",
		message: {
			metadataId: "anAttributeChoice",
			path: ["textVariableWithAnAttributeChoice", "@anAttributeChoice"]
		}
	};

	assert.stringifyEqual(messages[0], expectedMessage);
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeChoice", "@anAttributeChoice"]);
});

QUnit.test("testTextVariableWithAnAttributeChoiceNoValueAndNoAttributeValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableWithAnAttributeChoice",
		value: "",
		attributes: [{
			id: "anAttributeChoice",
			nameInData: "anAttributeChoice",
			value: ""
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerAttribute = containerChild[0].attributes[0];
	let pathToAttribute = ["textVariableWithAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute, containerAttribute);

	this.spec.childReference = CORATEST.createChildReference("textVariableWithAnAttributeChoice", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 2);
	let expectedMessage = {
		type: "validationError",
		message: {
			metadataId: "anAttributeChoice",
			path: ["textVariableWithAnAttributeChoice", "@anAttributeChoice"]
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);
	let expectedMessage2 = {
		type: "validationError",
		message: {
			metadataId: "textVariableWithAnAttributeChoice",
			path: ["textVariableWithAnAttributeChoice"]
		}
	};
	assert.stringifyEqual(messages[1], expectedMessage2);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeChoice", "@anAttributeChoice"]);
});

QUnit.test("testTextVariableWithOneAttributeChoiceAnOneFinalAttributeWithValues", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableWithAnAttributeAndAnAttributeChoice",
		value: "A Value3",
		attributes: [{
			id: "anAttributeChoice",
			nameInData: "anAttributeChoice",
			value: "aFinalValue"
		},
		{
			id: "anAttribute",
			nameInData: "anAttribute",
			value: "aFinalValue"
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerAttribute1 = containerChild[0].attributes[0];
	let pathToAttribute1 = ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute1, containerAttribute1);

	let containerAttribute2 = containerChild[0].attributes[1];
	let pathToAttribute2 = ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute2, containerAttribute2);

	this.spec.childReference = CORATEST.createChildReference("textVariableWithAnAttributeAndAnAttributeChoice", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPath(1), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
});

QUnit.test("testTextVariableWithOneAttributeChoiceWithoutValueAnOneFinalAttributeWithValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableWithAnAttributeAndAnAttributeChoice",
		value: "A Value3",
		attributes: [{
			id: "anAttributeChoice",
			nameInData: "anAttributeChoice",
			value: ""
		},
		{
			id: "anAttribute",
			nameInData: "anAttribute",
			value: "aFinalValue"
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerAttribute1 = containerChild[0].attributes[0];
	let pathToAttribute1 = ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute1, containerAttribute1);

	let containerAttribute2 = containerChild[0].attributes[1];
	let pathToAttribute2 = ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute2, containerAttribute2);

	this.spec.childReference = CORATEST.createChildReference("textVariableWithAnAttributeAndAnAttributeChoice", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	let expectedMessage = {
		type: "validationError",
		message: {
			metadataId: "anAttributeChoice",
			path: ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPath(1), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
});
QUnit.test("testTextVariableWithOneAttributeChoiceAnOneFinalAttributeWithoutValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableWithAnAttributeAndAnAttributeChoice",
		value: "A Value3",
		attributes: [{
			id: "anAttributeChoice",
			nameInData: "anAttributeChoice",
			value: "aFinalValue"
		},
		{
			id: "anAttribute",
			nameInData: "anAttribute",
			value: ""
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerAttribute1 = containerChild[0].attributes[0];
	let pathToAttribute1 = ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute1, containerAttribute1);

	let containerAttribute2 = containerChild[0].attributes[1];
	let pathToAttribute2 = ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute2, containerAttribute2);

	this.spec.childReference = CORATEST.createChildReference("textVariableWithAnAttributeAndAnAttributeChoice", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);

	let expectedMessage = {
		type: "validationError",
		message: {
			metadataId: "anAttribute",
			path: ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPath(1), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
});

QUnit.test("testTextVariableWithOneAttributeChoiceAnOneFinalAttributeAllWithoutValues", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "textVariableWithAnAttributeAndAnAttributeChoice",
		value: "",
		attributes: [{
			id: "anAttributeChoice",
			nameInData: "anAttributeChoice",
			value: ""
		},
		{
			id: "anAttribute",
			nameInData: "anAttribute",
			value: ""
		}]
	}];
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	let containerAttribute1 = containerChild[0].attributes[0];
	let pathToAttribute1 = ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute1, containerAttribute1);

	let containerAttribute2 = containerChild[0].attributes[1];
	let pathToAttribute2 = ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute2, containerAttribute2);

	this.spec.childReference = CORATEST.createChildReference("textVariableWithAnAttributeAndAnAttributeChoice", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 3);

	let expectedMessage0 = {
		type: "validationError",
		message: {
			metadataId: "anAttribute",
			path: ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage0);

	let expectedMessage1 = {
		type: "validationError",
		message: {
			metadataId: "anAttributeChoice",
			path: ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]
		}
	};
	assert.stringifyEqual(messages[1], expectedMessage1);

	let expectedMessage2 = {
		type: "validationError",
		message: {
			metadataId: "textVariableWithAnAttributeAndAnAttributeChoice",
			path: ["textVariableWithAnAttributeAndAnAttributeChoice"]
		}
	};
	assert.stringifyEqual(messages[2], expectedMessage2);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPath(1), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
});

QUnit.test("testGroupWithTextVariableWithOneAttributeChoiceAnOneFinalAttributeAllWithoutValues", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "groupIdOneTextChildWithChoice",
		children: [{
			name: "textVariableWithAnAttributeAndAnAttributeChoice",
			value: "a Value",
			attributes: [{
				id: "anAttributeChoice",
				nameInData: "anAttributeChoice",
				value: "aFinalValue"
			},
			{
				id: "anAttribute",
				nameInData: "anAttribute",
				value: "aFinalValue"
			}]
		}]
	}];
	
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	
	let containerChild1 = containerChild[0].children;
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);
	
	
	let containerAttribute1 = containerChild1[0].attributes[0];
	let pathToAttribute1 = ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute1, containerAttribute1);

	let containerAttribute2 = containerChild1[0].attributes[1];
	let pathToAttribute2 = ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute2, containerAttribute2);

	this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildWithChoice", "0", "1", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, true);
	CORATEST.assertValidationResultOk(assert, validationResult, this.pubSub);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildWithChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: ["groupIdOneTextChildWithChoice"] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPath(1), ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
});

QUnit.test("testGroupWithTextVariableWithOneAttributeChoiceAnOneFinalAttributeTextWithoutValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "groupIdOneTextChildWithChoice",
		children: [{
			name: "textVariableWithAnAttributeAndAnAttributeChoice",
			value: "",
			attributes: [{
				id: "anAttributeChoice",
				nameInData: "anAttributeChoice",
				value: "aFinalValue"
			},
			{
				id: "anAttribute",
				nameInData: "anAttribute",
				value: "aFinalValue"
			}]
		}]
	}];
	
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	
	let containerChild1 = containerChild[0].children;
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);
	
	
	let containerAttribute1 = containerChild1[0].attributes[0];
	let pathToAttribute1 = ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute1, containerAttribute1);

	let containerAttribute2 = containerChild1[0].attributes[1];
	let pathToAttribute2 = ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute2, containerAttribute2);

	this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildWithChoice", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, true);
	assert.strictEqual(validationResult.containsValuableData, false);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 2);
	
	let expectedMessage0 = {
		type: "validationError",
		message: {
			metadataId: "textVariableWithAnAttributeAndAnAttributeChoice",
			path: ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice"]
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage0);
	
	let expectedMessage1 = {
		type: "remove",
		message: {
			type: "remove",
			path: ["groupIdOneTextChildWithChoice"]
		}
	};
	assert.stringifyEqual(messages[1], expectedMessage1);

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildWithChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: ["groupIdOneTextChildWithChoice"] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPath(1), ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
});

QUnit.test("testGroupWithTextVariableWithOneAttributeChoiceAnOneFinalAttributeTextWithoutValue", function(assert) {
	let dataHolder = this.spec.dataHolder;
	let containerChild = [{
		name: "groupIdOneTextChildWithChoice",
		children: [{
			name: "textVariableWithAnAttributeAndAnAttributeChoice",
			value: "A value",
			attributes: [{
				id: "anAttributeChoice",
				nameInData: "anAttributeChoice",
				value: ""
			},
			{
				id: "anAttribute",
				nameInData: "anAttribute",
				value: "aFinalValue"
			}]
		}]
	}];
	
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);
	
	let containerChild1 = containerChild[0].children;
	dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);
	
	
	let containerAttribute1 = containerChild1[0].attributes[0];
	let pathToAttribute1 = ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
	dataHolder.setContainer(pathToAttribute1, containerAttribute1);

	let containerAttribute2 = containerChild1[0].attributes[1];
	let pathToAttribute2 = ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
	dataHolder.setContainer(pathToAttribute2, containerAttribute2);

	this.spec.childReference = CORATEST.createChildReference("groupIdOneTextChildWithChoice", "0", "0", "1");
	let metadataChildValidator = CORA.metadataChildValidator(this.dependencies, this.spec);

	let validationResult = metadataChildValidator.validate();
	assert.strictEqual(validationResult.everythingOkBelow, false);
	assert.strictEqual(validationResult.containsValuableData, true);

	let messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	
	let expectedMessage0 = {
		type: "validationError",
		message: {
			metadataId: "anAttributeChoice",
			path: ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage0);
	

	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildWithChoice", path: [] });
	assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: ["groupIdOneTextChildWithChoice"] });
	assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
	assert.deepEqual(dataHolder.getRequestedPath(1), ["groupIdOneTextChildWithChoice","textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
});


