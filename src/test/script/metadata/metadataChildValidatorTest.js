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
QUnit.module("metadata/metadataChildValidatorTest.js", hooks => {
	let test = QUnit.test;
	let metadataProvider;
	let pubSub;
	let dataHolder;
	let dependencies;
	let spec;

	hooks.beforeEach(() => {
		metadataProvider = CORATEST.MetadataProviderStub();
		pubSub = CORATEST.pubSubSpy();
		dataHolder = CORATEST.dataHolderSpy();
		dependencies = {
			metadataProvider: metadataProvider,
			pubSub: pubSub
		};
		spec = {
			path: [],
			dataHolder: dataHolder,
			childReference: {
				name: "childReference",
				repeatId: "0",
				children: [{
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
	});

	test("testInit", function(assert) {
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);
		assert.strictEqual(metadataChildValidator.type, "metadataChildValidator");
	});

	test("testGetDependencies", function(assert) {
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);
		assert.strictEqual(metadataChildValidator.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);
		assert.strictEqual(metadataChildValidator.getSpec(), spec);
	});

	test("testValidateGroupIdOneTextChild1to1WithData", function(assert) {
		let container = [{
			name: "textVariableId",
			value: "A Value"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(container);

		spec.childReference = createChildReference("textVariableId", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });

		assertValidationResultOk(assert, validationResult, pubSub);
	});

	const assertValidationResultOk = function(assert, validationResult, pubSub) {
		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, true);
		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 0);
	};


	const createChildReference = function(linkedRecordId, repeatId, repeatMin, repeatMax) {
		return {
			name: "childReference",
			repeatId: repeatId,
			children: [{
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

	test("testValidateGroupIdOneTextChild1to1WithDataEmptyValue", function(assert) {
		let container = [{
			name: "textVariableId",
			value: ""
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(container);


		spec.childReference = createChildReference("textVariableId", "0", "1", "1");

		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 1);
		assert.stringifyEqual(pubSubMessages[0], createValidationErrorMessage("textVariableId"));

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
	});

	const createValidationErrorMessage = function(metadataId) {
		return {
			type: "validationError",
			message: {
				metadataId: metadataId,
				path: [metadataId]
			}
		};
	};

	test("testValidateGroupIdOneCollectionChild1toXWithData", function(assert) {
		let container = [{
			name: "yesNoUnknownVar",
			value: "no"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(container);

		spec.childReference = createChildReference("yesNoUnknownVar", "0", "1", "X");

		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "yesNoUnknownVar", path: [] });
	});

	test("testValidateGroupIdOneCollectionChild1toXWithDataEmptyValue", function(assert) {
		let dataHolder = spec.dataHolder;
		let container = [{
			name: "yesNoUnknownVar",
			value: ""
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(container);

		spec.childReference = createChildReference("yesNoUnknownVar", "0", "1", "X");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 1);
		assert.stringifyEqual(pubSubMessages[0], createValidationErrorMessage("yesNoUnknownVar"));
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "yesNoUnknownVar", path: [] });
	});

	test("testValidategroupIdTwoTextChild1to1InGroupWithData", function(assert) {
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


		spec.childReference = createChildReference("groupIdTwoTextChild", "0", "1", "1");

		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);
		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdTwoTextChild", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdTwoTextChild"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVariableId2", path: ["groupIdTwoTextChild"] });
	});

	test("testValidategroupIdTwoTextChild1to1InGroupWithEmptyValue", function(assert) {
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

		spec.childReference = createChildReference("groupIdTwoTextChild", "0", "1", "1");

		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);
		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let validationError = createValidationErrorWithMetadataIdAndPath("textVariableId",
			["groupIdTwoTextChild", "textVariableId"]
		);
		assert.stringifyEqual(messages[0], validationError);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdTwoTextChild", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdTwoTextChild"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVariableId2", path: ["groupIdTwoTextChild"] });
	});

	test("testValidategroupIdOneCollectionVariableWithFinalValue", function(assert) {
		let containerGroup = [{
			name: "groupWithOneCollectionVarChildWithFinalValue",
			children: [{
				name: "trueFalse",
				value: "true"
			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerGroup);

		let containerChild1 = [{
			name: "trueFalse",
			value: "true"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

		spec.childReference = createChildReference("groupWithOneCollectionVarChildWithFinalValue", "0", "1", "1");

		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);
		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);
		assert.strictEqual(validationResult.onlyFinalValues, true);

	});

	test("testValidateOneChildRepeat0to1NoData", function(assert) {
		let dataHolder = spec.dataHolder;
		let containerChild = [];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

		spec.childReference = createChildReference("textVariableId", "0", "0", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);
		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 0);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
	});

	test("testValidateTextVariableRepeat1to3InGroupWithData", function(assert) {
		let containerChild = [{
			name: "textVariableId",
			value: "A Value",
			repeatId: "one"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

		spec.childReference = createChildReference("textVariableId", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
	});

	test("testValidateTextVariableRepeat1to3InGroupEmptyValue", function(assert) {
		let containerChild = [{
			name: "textVariableId",
			value: "",
			repeatId: "one"
		}, {
			name: "textVariableId",
			value: "",
			repeatId: "two"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

		spec.childReference = createChildReference("textVariableId", "0", "1", "3");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 2);

		let removeMessage = createRemoveMessageWithPath(["textVariableId.two"]);
		assert.stringifyEqual(pubSubMessages[0], removeMessage);

		let validationError = createValidationErrorWithMetadataIdAndPath("textVariableId",
			["textVariableId.one"]
		);
		assert.stringifyEqual(pubSubMessages[1], validationError);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
	});

	const createRemoveMessageWithPath = function(path) {
		return {
			type: "remove",
			message: {
				type: "remove",
				path: path
			}
		};
	};

	const createValidationErrorWithMetadataIdAndPath = function(metadataId, path) {
		return {
			type: "validationError",
			message: {
				metadataId: metadataId,
				path: path
			}
		};
	};

	test("testValidateOneChildRepeat3to3WithEmptyValueForOne", function(assert) {
		let containerChild = [{
			name: "textVariableId",
			value: "A Value",
			repeatId: "one"
		}, {
			name: "textVariableId",
			value: "",
			repeatId: "two"
		}, {
			name: "textVariableId",
			value: "A Value3",
			repeatId: "three"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

		spec.childReference = createChildReference("textVariableId", "0", "3", "3");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, true);

		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 1);


		let validationError = createValidationErrorWithMetadataIdAndPath("textVariableId",
			["textVariableId.two"]
		);
		assert.stringifyEqual(pubSubMessages[0], validationError);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
	});

	test("testValidateOneChildRepeat1toXWithDataForOne", function(assert) {
		let containerChild = [{
			name: "textVariableId",
			value: "A Value",
			repeatId: "one"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

		spec.childReference = createChildReference("textVariableId", "0", "1", "X");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
	});

	test("testValidateOneChildRepeat1toXWithDataForTwo", function(assert) {
		let dataHolder = spec.dataHolder;
		let containerChild = [{
			name: "textVariableId",
			value: "A Value",
			repeatId: "one"
		}, {
			name: "textVariableId",
			value: "A Value2",
			repeatId: "two"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

		spec.childReference = createChildReference("textVariableId", "0", "1", "X");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
	});

	test("testValidateOneChildRepeat1toXWithFourWithDataForOne", function(assert) {
		let containerChild = [{
			name: "textVariableId",
			value: "",
			repeatId: "one"
		}, {
			name: "textVariableId",
			value: "",
			repeatId: "two"
		}, {
			name: "textVariableId",
			value: "",
			repeatId: "three"
		}, {
			name: "textVariableId",
			value: "A Value2",
			repeatId: "four"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild);

		spec.childReference = createChildReference("textVariableId", "0", "1", "X");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, true);

		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 3);

		let removeMessage = createRemoveMessageWithPath(["textVariableId.one"]);
		assert.stringifyEqual(pubSubMessages[0], removeMessage);
		removeMessage.message.path = ["textVariableId.two"];
		assert.stringifyEqual(pubSubMessages[1], removeMessage);
		removeMessage.message.path = ["textVariableId.three"];
		assert.stringifyEqual(pubSubMessages[2], removeMessage);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableId", path: [] });
	});


	test("testValidateTextVarRepeat1to1InGroupOneAttributeInGroupWithData", function(assert) {
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

		spec.childReference = createChildReference("groupIdOneTextChildOneAttribute", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);

		assert.strictEqual(pubSub.getMessages().length, 0);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildOneAttribute", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdOneTextChildOneAttribute"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildOneAttribute", "@anAttribute"]);
	});

	test("testValidateTextVarRepeat1to1InGroupOneAttributeInGroupWithEmptyValue",
		function(assert) {

			let dataHolder = spec.dataHolder;
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

			spec.childReference = createChildReference("groupIdOneTextChildOneAttribute", "0", "1", "1");
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

			let validationResult = metadataChildValidator.validate();

			assert.strictEqual(validationResult.everythingOkBelow, false);
			assert.strictEqual(validationResult.containsValuableData, false);
			let pubSubMessages = pubSub.getMessages();
			assert.strictEqual(pubSubMessages.length, 1);

			let validationError = createValidationErrorWithMetadataIdAndPath("textVariableId",
				["groupIdOneTextChildOneAttribute", "textVariableId"]
			);
			assert.stringifyEqual(pubSubMessages[0], validationError);
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildOneAttribute", path: [] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdOneTextChildOneAttribute"] });
			assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildOneAttribute", "@anAttribute"]);
		});

	test("testValidateTextVarRepeat1to1InGroupTwoAttributeInGroupWithData", function(assert) {
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

		spec.childReference = createChildReference("groupIdOneTextChildTwoAttributes", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildTwoAttributes", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableId", path: ["groupIdOneTextChildTwoAttributes"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildTwoAttributes", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPath(1), ["groupIdOneTextChildTwoAttributes", "@anOtherAttribute"]);
	});

	test("testValidateGroupWithGroup0to1WithTextVar0to1_noValues", function(assert) {
		let containerChild0 = [{
			name: "groupOneChildGroupRepeat0to1",
			children: [{
				name: "textVariableIdRepeat0to1InGroup",
				children: [{
					name: "textVariableId",
					value: ""
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


		spec.childReference = createChildReference("groupOneChildGroupRepeat0to1", "0", "0", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);
		assert.strictEqual(validationResult.onlyFinalValues, false);
		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 3);

		let remove0 = createRemoveMessageWithPath(["groupOneChildGroupRepeat0to1",
			"textVariableIdRepeat0to1InGroup", "textVariableId"]);
		assert.stringifyEqual(pubSubMessages[0], remove0);

		let remove1 = createRemoveMessageWithPath(["groupOneChildGroupRepeat0to1",
			"textVariableIdRepeat0to1InGroup"]);
		assert.stringifyEqual(pubSubMessages[1], remove1);

		let remove2 = createRemoveMessageWithPath(["groupOneChildGroupRepeat0to1"]);
		assert.stringifyEqual(pubSubMessages[2], remove2);
	});

	test("testValidateGroupWithTwoChildrenGroup0to1WithTextVar0to1_noValues", function(assert) {
		let containerChild0 = [{
			name: "groupTwoChildrenGroupRepeat0to1",
			children: [{
				name: "textVariableIdRepeat0to1InGroup",
				children: [{
					name: "textVariableId",
					value: ""
				}]
			}, {
				name: "textVariableId2Repeat0to1InGroup",
				children: [{
					name: "textVariableId",
					value: ""
				},
				{
					name: "textVariableId2",
					value: ""
				}]
			}]
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		let containerChild1 = [containerChild0[0].children[0]];
		//	//console.log(con)
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild1);

		let containerChild2 = [{
			name: "textVariableId",
			value: ""
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild2);

		let containerChild21 = [containerChild0[0].children[1]];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild21);

		let containerChild22 = [{
			name: "textVariableId",
			value: ""
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild22);

		let containerChild222 = [{
			name: "textVariableId2",
			value: ""
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild222);


		spec.childReference = createChildReference("groupTwoChildrenGroupRepeat0to1", "0", "0", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);
		assert.strictEqual(validationResult.onlyFinalValues, false);
		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 6);

		let remove0 = createRemoveMessageWithPath(["groupTwoChildrenGroupRepeat0to1",
			"textVariableIdRepeat0to1InGroup", "textVariableId"]);
		assert.stringifyEqual(pubSubMessages[0], remove0);

		let remove1 = createRemoveMessageWithPath(["groupTwoChildrenGroupRepeat0to1",
			"textVariableIdRepeat0to1InGroup"]);
		assert.stringifyEqual(pubSubMessages[1], remove1);

		let remove2 = createRemoveMessageWithPath(["groupTwoChildrenGroupRepeat0to1",
			"textVariableId2Repeat0to1InGroup", "textVariableId"]);
		assert.stringifyEqual(pubSubMessages[0], remove0);
		assert.stringifyEqual(pubSubMessages[2], remove2);

		let remove3 = createValidationErrorWithMetadataIdAndPath("textVariableId2",
			["groupTwoChildrenGroupRepeat0to1", "textVariableId2Repeat0to1InGroup", "textVariableId2"]
		);
		assert.stringifyEqual(pubSubMessages[3], remove3);

		let remove4 = createRemoveMessageWithPath(["groupTwoChildrenGroupRepeat0to1",
			"textVariableId2Repeat0to1InGroup"]);
		assert.stringifyEqual(pubSubMessages[4], remove4);

		let remove5 = createRemoveMessageWithPath(["groupTwoChildrenGroupRepeat0to1"]);
		assert.stringifyEqual(pubSubMessages[5], remove5);
	});

	test("testValidateGroupWithTwoChildrenGroup0to1WithTextVar0to1_noChildGroupInData", function(assert) {
		let containerChild0 = [{
			name: "groupTwoChildrenGroupRepeat0to1",
			children: []
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		spec.childReference = createChildReference("groupTwoChildrenGroupRepeat0to1", "0", "0", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);
		assert.strictEqual(validationResult.onlyFinalValues, false);
		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 1);

		let remove1 = createRemoveMessageWithPath(["groupTwoChildrenGroupRepeat0to1"]);
		assert.stringifyEqual(pubSubMessages[0], remove1);
	});


	test("testValidateTextVarRepeat1to1InGroupTwoAttributeInGroupWithEmptyValue", function(assert) {
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

		spec.childReference = createChildReference("groupInGroupOneTextChildTwoAttributes", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);
		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 1);

		let validationError = createValidationErrorWithMetadataIdAndPath("textVariableId",
			["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes", "textVariableId"]
		);
		assert.stringifyEqual(pubSubMessages[0], validationError);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupInGroupOneTextChildTwoAttributes", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "groupIdOneTextChildTwoAttributes", path: ["groupInGroupOneTextChildTwoAttributes"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVariableId", path: ["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPath(1), ["groupInGroupOneTextChildTwoAttributes", "groupIdOneTextChildTwoAttributes", "@anOtherAttribute"]);
	});

	test("testValidateTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithData", function(assert) {
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

			spec.childReference = createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "0", "1", "3");
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

			let validationResult = metadataChildValidator.validate();

			assertValidationResultOk(assert, validationResult, pubSub);

			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", path: [] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1"] });
			assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
		});

	test("testValidateTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithEmptyValue", function(assert) {
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

			spec.childReference = createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "0", "1", "3");
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

			let validationResult = metadataChildValidator.validate();

			assert.strictEqual(validationResult.everythingOkBelow, false);
			assert.strictEqual(validationResult.containsValuableData, false);
			let pubSubMessages = pubSub.getMessages();
			assert.strictEqual(pubSubMessages.length, 2);

			let validationError = createValidationErrorWithMetadataIdAndPath("textVar",
				["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
					"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
					"textVarRepeat1to3InGroupOneAttribute.one1", "textVar.one2"]
			);
			assert.stringifyEqual(pubSubMessages[0], validationError);

			let removeMessage = createRemoveMessageWithPath([
				"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
				"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
				"textVarRepeat1to3InGroupOneAttribute.one1"]);
			assert.stringifyEqual(pubSubMessages[1], removeMessage);

			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", path: [] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1"] });
			assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
		});

	test("testInitTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithData2", function(assert) {
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

			spec.childReference = createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "0", "1", "3");
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

			let validationResult = metadataChildValidator.validate();

			assertValidationResultOk(assert, validationResult, pubSub);
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", path: [] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1"] });
			assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(4), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(5), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2", "textVarRepeat1to3InGroupOneAttribute.one1"] });
			assert.deepEqual(dataHolder.getRequestedPath(1), ["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
		});

	test("testInitTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithEmptyValue", function(assert) {
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



			spec.childReference = createChildReference("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", "0", "1", "3");
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

			let validationResult = metadataChildValidator.validate();

			assert.strictEqual(validationResult.everythingOkBelow, true);
			assert.strictEqual(validationResult.containsValuableData, true);

			let messages = pubSub.getMessages();
			assert.strictEqual(messages.length, 4);
			let validationError = createValidationErrorWithMetadataIdAndPath("textVar",
				["textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
					"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
					"textVarRepeat1to3InGroupOneAttribute.one1", "textVar.one2"]
			);
			assert.stringifyEqual(messages[0], validationError);

			let removeMessage1 = createRemoveMessageWithPath([
				"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
				"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0",
				"textVarRepeat1to3InGroupOneAttribute.one1"]);
			assert.stringifyEqual(messages[1], removeMessage1);

			let removeMessage2 = createRemoveMessageWithPath([
				"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
				"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0_2",
				"textVarRepeat1to3InGroupOneAttribute.one1", "textVar.one2"]);
			assert.stringifyEqual(messages[2], removeMessage2);

			let removeMessage3 = createRemoveMessageWithPath([
				"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
				"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup.one0"]);
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

	test("testInitTextVarRepeat1to3InGroup"
		+ "OneAttributeAndOtherAttributeRepeat0to2InGroupWithData", function(assert) {
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

			spec.childReference = createChildReference("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "0", "1", "3");
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

			let validationResult = metadataChildValidator.validate();

			assertValidationResultOk(assert, validationResult, pubSub);

			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", path: [] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1"] });
			assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVarRepeat1to3InGroupOtherAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(4), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1"] });
			assert.deepEqual(dataHolder.getRequestedPath(1), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1", "@anOtherAttribute"]);
		});

	test("testTwoChildrenSameNameInDataDifferentAttributesShouldOnlyHandleTheChildWithCorrectAttributeWithoutData", function(assert) {
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

		spec.childReference = createChildReference("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "0", "0", "2");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);


		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 5);

		let validationError = createValidationErrorWithMetadataIdAndPath("textVar",
			["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
				"textVarRepeat1to3InGroupOneAttribute.one1", "textVar.one2"]
		);
		assert.stringifyEqual(messages[0], validationError);

		let validationError2 = createRemoveMessageWithPath([
			"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"textVarRepeat1to3InGroupOneAttribute.one1"]);
		assert.stringifyEqual(messages[1], validationError2);

		let validationError3 = createValidationErrorWithMetadataIdAndPath("textVar",
			["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
				"textVarRepeat1to3InGroupOtherAttribute.one1", "textVar.one22"]
		);
		assert.stringifyEqual(messages[2], validationError3);

		let validationError4 = createRemoveMessageWithPath([
			"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"textVarRepeat1to3InGroupOtherAttribute.one1"]);
		assert.stringifyEqual(messages[3], validationError4);

		let validationError5 = createRemoveMessageWithPath([
			"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"]);
		assert.stringifyEqual(messages[4], validationError5);


		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute.one1", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVarRepeat1to3InGroupOtherAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(4), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1"] });
		assert.deepEqual(dataHolder.getRequestedPath(1), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute.one1", "@anOtherAttribute"]);
	});

	test("testInitTextVarRepeat1to3InGroup"
		+ "OneAttributeAndOtherAttributeRepeat1to1InGroupWithData", function(assert) {
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

			spec.childReference = createChildReference("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "0", "0", "2");
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

			let validationResult = metadataChildValidator.validate();

			assertValidationResultOk(assert, validationResult, pubSub);

			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", path: [] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVarRepeat1to3InGroupOneAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute"] });
			assert.deepEqual(dataHolder.getRequestedPath(0), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOneAttribute", "@anAttribute"]);
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3), { metadataId: "textVarRepeat1to3InGroupOtherAttribute", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"] });
			assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(4), { metadataId: "textVar", path: ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute"] });
			assert.deepEqual(dataHolder.getRequestedPath(1), ["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", "textVarRepeat1to3InGroupOtherAttribute", "@anOtherAttribute"]);

		});

	test("testInitTextVarRepeat1to3InGroup"
		+ "OneAttributeAndOtherAttributeRepeat1to1InGroupEmptyValue", function(assert) {
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

			spec.childReference = createChildReference("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup", "0", "1", "1");
			let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

			let validationResult = metadataChildValidator.validate();
			assert.strictEqual(validationResult.everythingOkBelow, false);
			assert.strictEqual(validationResult.containsValuableData, false);

			let messages = pubSub.getMessages();
			assert.strictEqual(messages.length, 2);

			let validationError = createValidationErrorWithMetadataIdAndPath("textVar",
				["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
					"textVarRepeat1to3InGroupOneAttribute", "textVar.one2"]
			);
			assert.stringifyEqual(messages[0], validationError);

			let validationError1 = createValidationErrorWithMetadataIdAndPath("textVar",
				["textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
					"textVarRepeat1to3InGroupOtherAttribute", "textVar.one22"]
			);
			assert.stringifyEqual(messages[1], validationError1);
		});

	test("testValidateGroupIdOneRecordLinkWithData", function(assert) {
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


		spec.childReference = createChildReference("groupIdOneRecordLinkChild", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
			{ metadataId: "groupIdOneRecordLinkChild", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
			{ metadataId: "myLink", path: ["groupIdOneRecordLinkChild"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2),
			{ metadataId: "linkedRecordIdTextVar", path: ["groupIdOneRecordLinkChild", "myLink"] });
	});

	test("testValidateGroupIdOneRecordLinkWithDataEmptyValue", function(assert) {
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

		spec.childReference = createChildReference("groupIdOneRecordLinkChild", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let expectedMessage = createValidationErrorWithMetadataIdAndPath("linkedRecordIdTextVar",
			["groupIdOneRecordLinkChild", "myLink", "linkedRecordIdTextVar"]
		);
		assert.stringifyEqual(messages[0], expectedMessage);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
			{ metadataId: "groupIdOneRecordLinkChild", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
			{ metadataId: "myLink", path: ["groupIdOneRecordLinkChild"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2),
			{ metadataId: "linkedRecordIdTextVar", path: ["groupIdOneRecordLinkChild", "myLink"] });
	});

	test("testValidateGroupId0to1ResourceLink", function(assert) {
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

		spec.childReference = createChildReference("groupId0to1ResourceLinkChild", "0", "0", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 0);
	});

	test("testValidateGroupId0to1RecordLinkWithDataEmptyValue", function(assert) {
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

		spec.childReference = createChildReference("groupId0to1RecordLinkChild", "0", "0", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 3);

		let expectedMessage = createValidationErrorWithMetadataIdAndPath("linkedRecordIdTextVar",
			["groupId0to1RecordLinkChild", "myLink", "linkedRecordIdTextVar"]
		);
		assert.stringifyEqual(messages[0], expectedMessage);

		let expectedMessage2 = createRemoveMessageWithPath(["groupId0to1RecordLinkChild", "myLink"]);
		assert.stringifyEqual(messages[1], expectedMessage2);

		let expectedMessage3 = createRemoveMessageWithPath(["groupId0to1RecordLinkChild"]);
		assert.stringifyEqual(messages[2], expectedMessage3);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
			{ metadataId: "groupId0to1RecordLinkChild", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
			{ metadataId: "myLink", path: ["groupId0to1RecordLinkChild"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2),
			{ metadataId: "linkedRecordIdTextVar", path: ["groupId0to1RecordLinkChild", "myLink"] });
	});

	//// groupIdOneRecordLinkChildWithPath
	test("testValidateGroupIdOneRecordLinkChildWithPathWithData", function(assert) {
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

		spec.childReference = createChildReference("groupIdOneRecordLinkChildWithPath", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
			{ metadataId: "groupIdOneRecordLinkChildWithPath", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
			{ metadataId: "myPathLink", path: ["groupIdOneRecordLinkChildWithPath"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(2),
			{ metadataId: "linkedRecordIdTextVar", path: ["groupIdOneRecordLinkChildWithPath", "myPathLink"] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(3),
			{ metadataId: "linkedRepeatIdTextVar", path: ["groupIdOneRecordLinkChildWithPath", "myPathLink"] });
	});

	test("testValidateGroupIdOneRecordLinkChildWithPathWithDataEmptyValue", function(assert) {
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

		spec.childReference = createChildReference("groupIdOneRecordLinkChildWithPath", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);


		let expectedMessage = createValidationErrorWithMetadataIdAndPath("linkedRepeatIdTextVar",
			["groupIdOneRecordLinkChildWithPath", "myPathLink", "linkedRepeatIdTextVar"]
		);
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

	test("testValidateGroupIdOneNumberChild1to1WithData", function(assert) {
		setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "4");

		spec.childReference = createChildReference("groupIdOneNumberChild", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assertValidationResultOk(assert, validationResult, pubSub);
		assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
	});

	const setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue = function(dataHolder, value) {
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

	const assertDataHolderCalledCorrectlyForgroupIdOneNumberChild = function(assert, dataHolder) {
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
			{ metadataId: "groupIdOneNumberChild", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
			{ metadataId: "numVariableId", path: ["groupIdOneNumberChild"] });
	};

	test("testValidateGroupIdOneNumberChild1to1WithEmptyValue", function(assert) {
		setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "");

		spec.childReference = createChildReference("groupIdOneNumberChild", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let expectedMessage = createValidationErrorWithMetadataIdAndPath("numVariableId",
			["groupIdOneNumberChild", "numVariableId"]
		);
		assert.stringifyEqual(messages[0], expectedMessage);
		assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
	});

	test("testValidateGroupIdOneNumberChild0to1WithDataEmptyValue", function(assert) {
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

		spec.childReference = createChildReference("groupIdOneNumberNotMandatoryChild", "0", "0", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 2);

		let expectedResult = createRemoveMessageWithPath(["groupIdOneNumberNotMandatoryChild",
			"numVariableId"]);
		assert.deepEqual(messages[0], expectedResult);

		let expectedResult2 = createRemoveMessageWithPath(["groupIdOneNumberNotMandatoryChild"]);
		assert.deepEqual(messages[1], expectedResult2);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
			{ metadataId: "groupIdOneNumberNotMandatoryChild", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1),
			{ metadataId: "numVariableId", path: ["groupIdOneNumberNotMandatoryChild"] });
	});

	test("testValidateGroupIdOneNumberChild1to1WithDataNotANumber", function(assert) {
		setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "Not a number");

		spec.childReference = createChildReference("groupIdOneNumberChild", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();

		let expectedResult = createValidationErrorWithMetadataIdAndPath("numVariableId",
			["groupIdOneNumberChild", "numVariableId"]
		);
		assert.deepEqual(messages[0], expectedResult);
		assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
	});

	test("testValidateGroupIdOneNumberChild1to1WithDataMaxAboveAllowed", function(assert) {
		setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "200");

		spec.childReference = createChildReference("groupIdOneNumberChild", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let expectedResult = createValidationErrorWithMetadataIdAndPath("numVariableId",
			["groupIdOneNumberChild", "numVariableId"]
		);
		assert.deepEqual(messages[0], expectedResult);
		assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
	});

	test("testValidateGroupIdOneNumberChild1to1WithDataMinBelowAllowed", function(assert) {
		setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "-1");

		spec.childReference = createChildReference("groupIdOneNumberChild", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let expectedResult = createValidationErrorWithMetadataIdAndPath("numVariableId",
			["groupIdOneNumberChild", "numVariableId"]
		);
		assert.deepEqual(messages[0], expectedResult);
		assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
	});

	test("testValidateGroupIdOneNumberChild1to1WithDataMoreDecimalsThanAllowed", function(assert) {
		setUpDataHolderForTestingGroupIdOneNumberChildWithDataHolderAndValue(dataHolder, "1.567");

		spec.childReference = createChildReference("groupIdOneNumberChild", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let expectedResult = createValidationErrorWithMetadataIdAndPath("numVariableId",
			["groupIdOneNumberChild", "numVariableId"]
		);
		assert.deepEqual(messages[0], expectedResult);
		assertDataHolderCalledCorrectlyForgroupIdOneNumberChild(assert, dataHolder);
	});

	test("testValidateGroupIdOneTextChild1to1OneCollectionChildWithFinalValueWithData", function(assert) {
		let containerChild0 = [{
			name: "trueFalse",
			value: "true"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		spec.childReference = createChildReference("trueFalseTrueIsFinalValueCollectionVar", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);
		let pubSubMessages = pubSub.getMessages();
		assert.strictEqual(pubSubMessages.length, 0);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
			{ metadataId: "trueFalseTrueIsFinalValueCollectionVar", path: [] });
	});

	test("testValidateGroupIdOneTextChild1to1OneCollectionChildWithFinalValueWithIncorrectFinalValue", function(assert) {
		let containerChild0 = [{
			name: "trueFalse",
			value: "false"
		}];
		dataHolder.addToReturnForFindContainersUsingPathAndMetadataId(containerChild0);

		spec.childReference = createChildReference("trueFalseTrueIsFinalValueCollectionVar", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let expectedMessage = createValidationErrorWithMetadataIdAndPath("trueFalseTrueIsFinalValueCollectionVar",
			["trueFalseTrueIsFinalValueCollectionVar"]
		);
		assert.stringifyEqual(messages[0], expectedMessage);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0),
			{ metadataId: "trueFalseTrueIsFinalValueCollectionVar", path: [] });
	});
	//textVariableWithAnAttribute 
	//textVariableWithAnAttributeChoice
	//textVariableWithAnAttributeAndAnAttributeChoice (aFinalValue aOtherFinalValue)
	test("testTextVariableWithAnAttribute", function(assert) {
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

		spec.childReference = createChildReference("textVariableWithAnAttribute", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttribute", path: [] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttribute", "@anAttribute"]);
	});

	test("testTextVariableWithAnAttributeChoice", function(assert) {
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

		spec.childReference = createChildReference("textVariableWithAnAttributeChoice", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();

		assertValidationResultOk(assert, validationResult, pubSub);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeChoice", path: [] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeChoice", "@anAttributeChoice"]);
	});

	test("testTextVariableWithAnAttributeChoiceNoAttributeValue", function(assert) {
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

		spec.childReference = createChildReference("textVariableWithAnAttributeChoice", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let expectedMessage = createValidationErrorWithMetadataIdAndPath("anAttributeChoice",
			["textVariableWithAnAttributeChoice", "@anAttributeChoice"]
		);
		assert.stringifyEqual(messages[0], expectedMessage);
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeChoice", path: [] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeChoice", "@anAttributeChoice"]);
	});

	test("testTextVariableWithAnAttributeChoiceNoValueAndNoAttributeValue", function(assert) {
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

		spec.childReference = createChildReference("textVariableWithAnAttributeChoice", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 2);

		let expectedMessage = createValidationErrorWithMetadataIdAndPath("anAttributeChoice",
			["textVariableWithAnAttributeChoice", "@anAttributeChoice"]
		);
		assert.stringifyEqual(messages[0], expectedMessage);

		let expectedMessage2 = createValidationErrorWithMetadataIdAndPath("textVariableWithAnAttributeChoice",
			["textVariableWithAnAttributeChoice"]
		);
		assert.stringifyEqual(messages[1], expectedMessage2);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeChoice", path: [] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeChoice", "@anAttributeChoice"]);
	});

	test("testTextVariableWithOneAttributeChoiceAnOneFinalAttributeWithValues", function(assert) {
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

		spec.childReference = createChildReference("textVariableWithAnAttributeAndAnAttributeChoice", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 0);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: [] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPath(1), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
	});

	test("testTextVariableWithOneAttributeChoiceWithoutValueAnOneFinalAttributeWithValue", function(assert) {
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

		spec.childReference = createChildReference("textVariableWithAnAttributeAndAnAttributeChoice", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = pubSub.getMessages();
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

	test("testTextVariableWithOneAttributeChoiceAnOneFinalAttributeWithoutValue", function(assert) {
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

		spec.childReference = createChildReference("textVariableWithAnAttributeAndAnAttributeChoice", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let expectedMessage = createValidationErrorWithMetadataIdAndPath("anAttribute",
			["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]
		);
		assert.stringifyEqual(messages[0], expectedMessage);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: [] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPath(1), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
	});

	test("testTextVariableWithOneAttributeChoiceAnOneFinalAttributeAllWithoutValues", function(assert) {
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

		spec.childReference = createChildReference("textVariableWithAnAttributeAndAnAttributeChoice", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 3);

		let expectedMessage0 = createValidationErrorWithMetadataIdAndPath("anAttribute",
			["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]
		);
		assert.stringifyEqual(messages[0], expectedMessage0);

		let expectedMessage1 = createValidationErrorWithMetadataIdAndPath("anAttributeChoice",
			["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]
		);
		assert.stringifyEqual(messages[1], expectedMessage1);

		let expectedMessage2 = createValidationErrorWithMetadataIdAndPath("textVariableWithAnAttributeAndAnAttributeChoice",
			["textVariableWithAnAttributeAndAnAttributeChoice"]
		);
		assert.stringifyEqual(messages[2], expectedMessage2);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: [] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPath(1), ["textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
	});

	test("testGroupWithTextVariableWithOneAttributeChoiceAnOneFinalAttributeAllWithoutValues", function(assert) {
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
		let pathToAttribute1 = ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
		dataHolder.setContainer(pathToAttribute1, containerAttribute1);

		let containerAttribute2 = containerChild1[0].attributes[1];
		let pathToAttribute2 = ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
		dataHolder.setContainer(pathToAttribute2, containerAttribute2);

		spec.childReference = createChildReference("groupIdOneTextChildWithChoice", "0", "1", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, true);
		assertValidationResultOk(assert, validationResult, pubSub);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 0);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildWithChoice", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: ["groupIdOneTextChildWithChoice"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPath(1), ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
	});

	test("testGroupWithTextVariableWithOneAttributeChoiceAnOneFinalAttributeTextWithoutValue", function(assert) {
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
		let pathToAttribute1 = ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
		dataHolder.setContainer(pathToAttribute1, containerAttribute1);

		let containerAttribute2 = containerChild1[0].attributes[1];
		let pathToAttribute2 = ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
		dataHolder.setContainer(pathToAttribute2, containerAttribute2);

		spec.childReference = createChildReference("groupIdOneTextChildWithChoice", "0", "0", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, true);
		assert.strictEqual(validationResult.containsValuableData, false);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 2);

		let expectedMessage0 = createValidationErrorWithMetadataIdAndPath(
			"textVariableWithAnAttributeAndAnAttributeChoice",
			["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice"]
		);
		assert.stringifyEqual(messages[0], expectedMessage0);

		let expectedMessage1 = createRemoveMessageWithPath(["groupIdOneTextChildWithChoice"]);
		assert.stringifyEqual(messages[1], expectedMessage1);

		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildWithChoice", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: ["groupIdOneTextChildWithChoice"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPath(1), ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
	});

	test("testGroupWithTextVariableWithOneAttributeChoiceAnOneFinalAttributeTextWithoutValue", function(assert) {
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
		let pathToAttribute1 = ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"];
		dataHolder.setContainer(pathToAttribute1, containerAttribute1);

		let containerAttribute2 = containerChild1[0].attributes[1];
		let pathToAttribute2 = ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"];
		dataHolder.setContainer(pathToAttribute2, containerAttribute2);

		spec.childReference = createChildReference("groupIdOneTextChildWithChoice", "0", "0", "1");
		let metadataChildValidator = CORA.metadataChildValidator(dependencies, spec);

		let validationResult = metadataChildValidator.validate();
		assert.strictEqual(validationResult.everythingOkBelow, false);
		assert.strictEqual(validationResult.containsValuableData, true);

		let messages = pubSub.getMessages();
		assert.strictEqual(messages.length, 1);

		let expectedMessage0 = createValidationErrorWithMetadataIdAndPath("anAttributeChoice",
			["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice",
				"@anAttributeChoice"]
		);
		assert.stringifyEqual(messages[0], expectedMessage0);


		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(0), { metadataId: "groupIdOneTextChildWithChoice", path: [] });
		assert.deepEqual(dataHolder.getRequestedPathAndMetadataId(1), { metadataId: "textVariableWithAnAttributeAndAnAttributeChoice", path: ["groupIdOneTextChildWithChoice"] });
		assert.deepEqual(dataHolder.getRequestedPath(0), ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttribute"]);
		assert.deepEqual(dataHolder.getRequestedPath(1), ["groupIdOneTextChildWithChoice", "textVariableWithAnAttributeAndAnAttributeChoice", "@anAttributeChoice"]);
	});
});