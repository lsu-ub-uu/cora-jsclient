/*
 * Copyright 2016, 2018 Olov McKie
 * Copyright 2020, 2025 Uppsala University Library
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


QUnit.module("metadata/jsBookkeeperTest.js", hooks => {
	const test = QUnit.test;
	let metadataProvider;
	let textProvider;
	let dataHolder;
	let pubSub;
	let metadataChildAndRepeatInitializerFactory;
	let jsBookkeeperFactory;

	let dependencies;
	let spec;
	hooks.beforeEach(() => {
		metadataChildAndRepeatInitializerFactory = CORATEST.metadataChildAndRepeatInitializerFactorySpy({});

		dependencies = {
			recordTypeProvider: CORATEST.recordTypeProviderSpy(),
			metadataChildAndRepeatInitializerFactory: metadataChildAndRepeatInitializerFactory
		};
		spec = {
			metadataId: "groupIdOneTextChild",
			metadataProvider: CORATEST.MetadataProviderStub(),
			pubSub: CORATEST.pubSubSpy(),
			textProvider: CORATEST.textProviderStub(),
			dataHolder: CORATEST.dataHolderStub()
		};
		metadataProvider = CORATEST.MetadataProviderStub();
		pubSub = CORATEST.pubSubSpy();
		textProvider = CORATEST.textProviderStub();
		dataHolder = CORATEST.dataHolderStub();
		jsBookkeeperFactory = createJsBookkeeperFactorySpy(metadataProvider, pubSub,
			textProvider);
	});

	hooks.afterEach(() => { });


	const createRefForJsBookkeeper = function(linkedRecordType, linkedRecordId, repeatMin, repeatMax) {
		return {
			name: "childReference",
			repeatId: "1",
			children: [{
				name: "ref",
				children: [{
					name: "linkedRecordType",
					value: linkedRecordType
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
		}
	};
	
	const createJsBookkeeperFactorySpy = function(metadataProvider, pubSub, textProvider) {
		let factor = function(metadataId, dataHolder) {
			let dependencies = {
				recordTypeProvider: CORATEST.recordTypeProviderSpy(),
				metadataChildAndRepeatInitializerFactory: CORATEST.metadataChildAndRepeatInitializerFactorySpy({})
			};
			let spec = {
				metadataId: metadataId,
				metadataProvider: metadataProvider,
				pubSub: pubSub,
				textProvider: textProvider,
				dataHolder: dataHolder
			};
			return CORA.jsBookkeeper(dependencies, spec);
		};
		return Object.freeze({
			factor: factor
		});
	};

	test("testInit", function(assert) {
		let jsBookkeeper = CORA.jsBookkeeper(dependencies, spec);
		assert.strictEqual(jsBookkeeper.type, "jsBookkeeper");
	});

	test("testGetSpec", function(assert) {
		let jsBookkeeper = CORA.jsBookkeeper(dependencies, spec);
		assert.strictEqual(jsBookkeeper.getSpec(), spec);
	});

	test("testGetDependencies", function(assert) {
		let jsBookkeeper = CORA.jsBookkeeper(dependencies, spec);
		assert.strictEqual(jsBookkeeper.getDependencies(), dependencies);
	});

	test("testSetValue", function(assert) {
		let jsBookkeeper = jsBookkeeperFactory.factor("groupIdOneTextChild", dataHolder);
		let data = {
			data: "a Value",
			path: []
		};
		jsBookkeeper.setValue(data);
		let messages = pubSub.getMessages();

		let expectedMessage = {
			type: "setValue",
			message: {
				dataOrigin: "user",
				data: "a Value",
				path: []
			}
		};
		assert.deepEqual(messages[0], expectedMessage);
		assert.equal(messages.length, 1);
	});

	test("testCorrectCallToChildAndRepeatInitializerFactoryOnAddNonRepeatable", function(assert) {
		let childReferenceTextVariableId = createRefForJsBookkeeper("metadataTextVariable", "textVariableId", "1", "1");

		let jsBookkeeper = CORA.jsBookkeeper(dependencies, spec);
		let data = {
			metadataId: "textVariableId",
			path: [],
			childReference: childReferenceTextVariableId,
			recordPartPermissionCalculator: CORATEST.recordPartPermissionCalculatorSpy()
		};
		jsBookkeeper.add(data);
		let factoredSpec = metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "textVariableId");
		assert.strictEqual(factoredSpec.path, data.path);
		assert.strictEqual(factoredSpec.data, undefined);
		assert.strictEqual(factoredSpec.repeatId, undefined);
		assert.strictEqual(factoredSpec.recordPartPermissionCalculator, data.recordPartPermissionCalculator);

		let factored = metadataChildAndRepeatInitializerFactory.getFactoredRepeatIntitializers(0);
		assert.ok(factored.getInitializeCalled());
	});

	test("testCorrectCallToChildAndRepeatInitializerFactoryOnAddRepeateble", function(assert) {
		let childReferenceTextVariableId = createRefForJsBookkeeper("metadataTextVariable", "textVariableId", "1", "4");

		let jsBookkeeper = CORA.jsBookkeeper(dependencies, spec);
		let data = {
			metadataId: "textVariableId",
			path: [],
			childReference: childReferenceTextVariableId,
			recordPartPermissionCalculator: CORATEST.recordPartPermissionCalculatorSpy()
		};
		jsBookkeeper.add(data);
		let factoredSpec = metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "textVariableId");
		assert.strictEqual(factoredSpec.path, data.path);
		assert.strictEqual(factoredSpec.data, undefined);
		assert.strictEqual(factoredSpec.repeatId, "1");
		assert.strictEqual(factoredSpec.recordPartPermissionCalculator, data.recordPartPermissionCalculator);

		let factored = metadataChildAndRepeatInitializerFactory.getFactoredRepeatIntitializers(0);
		assert.ok(factored.getInitializeCalled());
	});

	test("testAddRepeating", function(assert) {
		let currentData = {
			name: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			children: [{
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "one",
					repeatId: "one"
				}, {
					name: "textVar",
					value: "two",
					repeatId: "2"
				}, {
					name: "textVar",
					value: "three",
					repeatId: "1"
				}],
				attributes: {
					anAttribute: "aFinalValue"
				},
				repeatId: "1"
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "three",
					repeatId: "3"
				}],
				attributes: {
					anAttribute: "aFinalValue"
				},
				repeatId: "2"
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "four",
					repeatId: "4"
				}],
				attributes: {
					anOtherAttribute: "aOtherFinalValue"
				},
				repeatId: "3"
			}]
		};
		let foundContainer = {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVar",
				value: "one",
				repeatId: "one"
			}, {
				name: "textVar",
				value: "two",
				repeatId: "2"
			}, {
				name: "textVar",
				value: "three",
				repeatId: "1"
			}],
			attributes: {
				anAttribute: "aFinalValue"
			},
			repeatId: "1"
		};
		let dataHolder = CORATEST.dataHolderStub(currentData, foundContainer);
		spec.dataHolder = dataHolder;
		let jsBookkeeper = CORA.jsBookkeeper(dependencies, spec);

		let data = {
			metadataId: "textVar",
			path: ["textVarRepeat1to3InGroupOneAttribute.1"],
			childReference: {
				name: "childReference",
				repeatId: "1",
				children: [{
					name: "ref",
					children: [{
						name: "linkedRecordType",
						value: "metadataTextVariable"
					}, {
						name: "linkedRecordId",
						value: "textVar"
					}],
					attributes: {
						type: "textVariable"
					}
				}, {
					name: "repeatMin",
					value: "1"
				}, {
					name: "repeatMax",
					value: "3"
				}]
			}
		};

		let startRepeatId = jsBookkeeper.add(data);

		let factoredSpec = metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "textVar");
		assert.strictEqual(factoredSpec.path, data.path);
		assert.strictEqual(factoredSpec.data, undefined);
		assert.strictEqual(factoredSpec.repeatId, "3");
		assert.deepEqual(dataHolder.getUsedPath(), ["textVarRepeat1to3InGroupOneAttribute.1"]);
		assert.strictEqual(startRepeatId, "3");

	});
	test("testAddBefore", function(assert) {
		let currentData = {
			name: "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			children: [{
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "one",
					repeatId: "one"
				}, {
					name: "textVar",
					value: "two",
					repeatId: "2"
				}, {
					name: "textVar",
					value: "three",
					repeatId: "1"
				}],
				attributes: {
					anAttribute: "aFinalValue"
				},
				repeatId: "1"
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "three",
					repeatId: "3"
				}],
				attributes: {
					anAttribute: "aFinalValue"
				},
				repeatId: "2"
			}, {
				name: "textVarRepeat1to3InGroupOneAttribute",
				children: [{
					name: "textVar",
					value: "four",
					repeatId: "4"
				}],
				attributes: {
					anOtherAttribute: "aOtherFinalValue"
				},
				repeatId: "3"
			}]
		};
		let foundContainer = {
			name: "textVarRepeat1to3InGroupOneAttribute",
			children: [{
				name: "textVar",
				value: "one",
				repeatId: "one"
			}, {
				name: "textVar",
				value: "two",
				repeatId: "2"
			}, {
				name: "textVar",
				value: "three",
				repeatId: "1"
			}],
			attributes: {
				anAttribute: "aFinalValue"
			},
			repeatId: "1"
		};
		let dataHolder = CORATEST.dataHolderStub(currentData, foundContainer);
		spec.dataHolder = dataHolder;
		let jsBookkeeper = CORA.jsBookkeeper(dependencies, spec);
		let data = {
			metadataId: "textVar",
			path: ["textVarRepeat1to3InGroupOneAttribute.1"],
			childReference: {
				name: "childReference",
				repeatId: "1",
				children: [{
					name: "ref",
					children: [{
						name: "linkedRecordType",
						value: "metadataTextVariable"
					}, {
						name: "linkedRecordId",
						value: "textVar"
					}],
					attributes: {
						type: "textVariable"
					}
				}, {
					name: "repeatMin",
					value: "1"
				}, {
					name: "repeatMax",
					value: "3"
				}]
			},
			addBeforePath: ["textVarRepeat1to3InGroupOneAttribute.1", "textVar.one"]
		};

		jsBookkeeper.addBefore(data);

		let factoredSpec = metadataChildAndRepeatInitializerFactory.getRepeatSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "textVar");
		assert.strictEqual(factoredSpec.path, data.path);
		assert.strictEqual(factoredSpec.data, undefined);
		assert.strictEqual(factoredSpec.repeatId, "3");
	});

	test("testRemove", function(assert) {
		let jsBookkeeper = jsBookkeeperFactory.factor("groupIdOneTextChild", dataHolder);
		let data = {
			path: []
		};
		jsBookkeeper.remove(data);
		let messages = pubSub.getMessages();
		let expectedMessage = {
			type: "remove",
			message: {
				path: []
			}
		};
		assert.stringifyEqual(messages[0], expectedMessage);

		assert.equal(messages.length, 1);

		let unsubscriptionsPathBelow = pubSub.getUnsubscriptionsPathBelow();
		assert.equal(unsubscriptionsPathBelow.length, 1);
		assert.stringifyEqual(unsubscriptionsPathBelow[0], []);
	});

	test("testMove", function(assert) {
		let jsBookkeeper = jsBookkeeperFactory.factor("groupIdOneTextChild", dataHolder);
		let data = {
			path: [],
			moveChild: {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "one"
				}]
			},
			basePositionOnChild: {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: "textVariableId"
				}, {
					name: "repeatId",
					value: "two"
				}]
			},
			newPosition: "after"
		};
		jsBookkeeper.move(data);
		let messages = pubSub.getMessages();
		let expectedMessage = {
			type: "move",
			message: {
				path: [],
				moveChild: {
					name: "linkedPath",
					children: [{
						name: "nameInData",
						value: "textVariableId"
					}, {
						name: "repeatId",
						value: "one"
					}]
				},
				basePositionOnChild: {
					name: "linkedPath",
					children: [{
						name: "nameInData",
						value: "textVariableId"
					}, {
						name: "repeatId",
						value: "two"
					}]
				},
				newPosition: "after"
			}
		};
		assert.stringifyEqual(messages[0], expectedMessage);

		assert.equal(messages.length, 1);
	});
});
