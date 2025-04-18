/*
 * Copyright 2018 Uppsala University Library
 * Copyright 2018 Olov McKIe
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
QUnit.module("presentation/pNonRepeatingChildRefHandlerTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");

		this.metadataProvider = CORATEST.MetadataProviderStub();
		this.dependencies = {
			providers : {
				metadataProvider : CORATEST.MetadataProviderStub()
			},
			"presentationFactory" : CORATEST.standardFactorySpy("presentationSpy"),
			"pNonRepeatingChildRefHandlerViewFactory" : CORATEST
					.standardFactorySpy("pNonRepeatingChildRefHandlerViewSpy"),
			pubSub : CORATEST.pubSubSpy()
		};
		this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();

		this.spec = {
			"parentPath" : [],
			"parentMetadataId" : "someParentMetadataId",
			mode : "input",
			"recordPartPermissionCalculator": this.recordPartPermissionCalculator,
			"cPresentation" : CORA.coraData({
				"name" : "presentation",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "somePresentationId"
					}, {
						"name" : "type",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "presentationSurroundingContainer"
						} ]
					} ]
				}, {
					"name" : "presentationsOf",
					"children" : [ {
						repeatId : "0",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadata"
						}, {
							"name" : "linkedRecordId",
							"value" : "groupWithOneCollectionVarChildGroup"
						} ],
						"name" : "presentationOf"
					} ]
				}, {
					"name" : "presentationsOf",
					"children" : [ {
						repeatId : "0",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadata"
						}, {
							"name" : "linkedRecordId",
							"value" : "groupIdOneTextChild"
						} ],
						"name" : "presentationOf"
					} ]
				} ]
			}),
			"cParentPresentation" : {
				type : "fakeCParentPresentationObject"
			},
			"presentationSize" : "bothEqual"
		};
		this.cAlternativePresentation = CORA.coraData({
		"name" : "presentation",
		"children" : [ {
			"name" : "recordInfo",
			"children" : [ {
				"name" : "id",
				"value" : "someOtherPresentationId"
			}, {
				"name" : "type",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "recordType"
				}, {
					"name" : "linkedRecordId",
					"value" : "presentationOtherSurroundingContainer"
				} ]
			} ]
		}, {
			"name" : "presentationsOf",
			"children" : [ {
				repeatId : "0",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadata"
				}, {
					"name" : "linkedRecordId",
					"value" : "groupWithOneCollectionVarChildGroup"
				} ],
				"name" : "presentationOf"
			} ]
		} ]
	});

	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	assert.strictEqual(pNonRepeatingChildRefHandler.type, "pNonRepeatingChildRefHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	assert.strictEqual(pNonRepeatingChildRefHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	assert.strictEqual(pNonRepeatingChildRefHandler.getSpec(), this.spec);
});

QUnit.test("testInitCreatesPresentation",
		function(assert) {
			let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
					this.spec);
			let factoredPresentationSpec = this.dependencies.presentationFactory.getSpec(0);

			assert.strictEqual(factoredPresentationSpec.path, this.spec.parentPath);
			assert.strictEqual(factoredPresentationSpec.metadataIdUsedInData,
					this.spec.parentMetadataId);
			assert.strictEqual(factoredPresentationSpec.cPresentation, this.spec.cPresentation);
			assert.strictEqual(factoredPresentationSpec.cParentPresentation,
					this.spec.cParentPresentation);

			let factoredAlternativePresentationSpec = this.dependencies.presentationFactory
					.getSpec(1);
			assert.strictEqual(factoredAlternativePresentationSpec, undefined);
			assert.deepEqual(factoredPresentationSpec.recordPartPermissionCalculator, this.spec.recordPartPermissionCalculator)

		});

QUnit.test("testInitPresentationAddedToView", function(assert) {
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let factoredPresentation = this.dependencies.presentationFactory.getFactored(0);

	let addedView = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0)
			.getAddedChild(0);
	assert.strictEqual(factoredPresentation.getView(), addedView);
});

QUnit.test("testInitOutputDefaultsHidesContent", function(assert) {
	this.spec.mode = "output";
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);
});

QUnit.test("testInitOutputDefaultsSetsStyleToNoContent", function(assert) {
	this.spec.mode = "output";
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
});

QUnit.test("testGetView", function(assert) {
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let view = pNonRepeatingChildRefHandler.getView();
	assert.strictEqual(view, this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(
			0).getView());
});

QUnit
		.test(
				"testViewSpec",
				function(assert) {
					this.spec.textStyle = "someTextStyle";
					this.spec.childStyle = "someChildStyle";
					let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(
							this.dependencies, this.spec);

					let viewSpec = this.dependencies.pNonRepeatingChildRefHandlerViewFactory
							.getSpec(0);
					let expectedSpec = {
						presentationId : "somePresentationId",
						textStyle : "someTextStyle",
						childStyle : "someChildStyle",
						callOnFirstShowOfAlternativePresentation : pNonRepeatingChildRefHandler.publishPresentationShown
					}
					assert.stringifyEqual(viewSpec, expectedSpec);

					assert.notStrictEqual(
							pNonRepeatingChildRefHandler.publishPresentationShown,
							undefined);
				});

QUnit.test("testInitWithAlternativeCreatesPresentation",
		function(assert) {
			this.spec.cAlternativePresentation = CORA.coraData({
				"name" : "presentation",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "someOtherPresentationId"
					}, {
						"name" : "type",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "presentationOtherSurroundingContainer"
						} ]
					} ]
				}, {
					"name" : "presentationsOf",
					"children" : [ {
						repeatId : "0",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadata"
						}, {
							"name" : "linkedRecordId",
							"value" : "groupWithOneCollectionVarChildGroup"
						} ],
						"name" : "presentationOf"
					} ]
				} ]
			});
			let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
					this.spec);
			let factoredPresentationSpec = this.dependencies.presentationFactory.getSpec(1);

			assert.strictEqual(factoredPresentationSpec.path, this.spec.parentPath);
			assert.strictEqual(factoredPresentationSpec.metadataIdUsedInData,
					this.spec.parentMetadataId);
			assert.strictEqual(factoredPresentationSpec.cPresentation,
					this.spec.cAlternativePresentation);
			assert.strictEqual(factoredPresentationSpec.cParentPresentation,
					this.spec.cParentPresentation);
		});

QUnit.test("testInitPresentationAlternativeAddedToView", function(assert) {
	this.spec.cAlternativePresentation = this.cAlternativePresentation;
	CORA.pNonRepeatingChildRefHandler(this.dependencies, this.spec);
	let factoredPresentation = this.dependencies.presentationFactory.getFactored(1);

	let factoredView = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0); 
	let addedView = factoredView.getAddedAlternativeChild(0);
	assert.strictEqual(factoredPresentation.getView(), addedView);
	let addedPresentationSize = factoredView.getPresentationSize();
	assert.strictEqual(addedPresentationSize, "bothEqual");
});

QUnit.test("testInitPresentationAlternativePresentationSize", function(assert) {
	this.spec.cAlternativePresentation = this.cAlternativePresentation;
	this.spec.presentationSize = "firstSmaller";
	CORA.pNonRepeatingChildRefHandler(this.dependencies, this.spec);

	let factoredView = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0); 
	let addedPresentationSize = factoredView.getPresentationSize();
	assert.strictEqual(addedPresentationSize, "firstSmaller");
});

QUnit.test("testInitSubscribesToAdd", function(assert) {
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);

	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.strictEqual(subscriptions.length, 1)
	assert.strictEqual(subscriptions[0].type, "add");
	assert.stringifyEqual(subscriptions[0].path, this.spec.parentPath);
	assert.strictEqual(subscriptions[0].context, undefined);
	assert.strictEqual(subscriptions[0].functionToCall, pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg);
});

QUnit.test("testSubscribesWhenAdd_SameId", function(assert) {
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);

	let msg = "root/add";
	let dataFromMsg = {
		metadataId : "groupWithOneCollectionVarChildGroup",
		path : [],
		repeatId : "1",
		nameInData : "groupWithOneCollectionVarChildGroup"
	};
	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.strictEqual(subscriptions.length, 1)

	pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg(dataFromMsg, msg);
	
	let path = ["groupWithOneCollectionVarChildGroup.1"];
	
	assert.strictEqual(subscriptions.length, 2)
	assert.strictEqual(subscriptions[1].type, "*");
	assert.stringifyEqual(subscriptions[1].path, path);
	assert.strictEqual(subscriptions[1].context, undefined);
	assert.strictEqual(subscriptions[1].functionToCall,
			pNonRepeatingChildRefHandler.handleMsgToDeterminDataState);
});

QUnit.test("testSubscribesWhenAdd_OtherIdSameNameInDataAttributes", function(assert) {
	this.spec.cPresentation = CORA.coraData({
		"name" : "presentation",
		"children" : [ {
			"name" : "recordInfo",
			"children" : [ {
				"name" : "id",
				"value" : "somePresentationId"
			}, {
				"name" : "type",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "recordType"
				}, {
					"name" : "linkedRecordId",
					"value" : "presentationSurroundingContainer"
				} ]
			} ]
		}, {
			"name" : "presentationsOf",
			"children" : [ {
				repeatId : "0",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadata"
				}, {
					"name" : "linkedRecordId",
					"value" : "groupWithOneCollectionVarChildGroupOtherIdSameNameInData"
				} ],
				"name" : "presentationOf"
			} ]
		}
		]
	});
	
	
	
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);

	let msg = "root/add";
	let dataFromMsg = {
		metadataId : "groupWithOneCollectionVarChildGroup",
		path : [],
		repeatId : "1",
		nameInData : "groupWithOneCollectionVarChildGroup"
	};
	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.strictEqual(subscriptions.length, 1)

	pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg(dataFromMsg, msg);
	
	let path = ["groupWithOneCollectionVarChildGroup.1"];
	
	assert.strictEqual(subscriptions.length, 2)
	assert.strictEqual(subscriptions[1].type, "*");
	assert.stringifyEqual(subscriptions[1].path, path);
	assert.strictEqual(subscriptions[1].context, undefined);
	assert.strictEqual(subscriptions[1].functionToCall,
			pNonRepeatingChildRefHandler.handleMsgToDeterminDataState);
});
QUnit.test("testSubscribesWhenAdd_OtherIdNotSameNameInDataAttributes", function(assert) {
	this.spec.cPresentation = CORA.coraData({
		"name" : "presentation",
		"children" : [ {
			"name" : "recordInfo",
			"children" : [ {
				"name" : "id",
				"value" : "somePresentationId"
			}, {
				"name" : "type",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "recordType"
				}, {
					"name" : "linkedRecordId",
					"value" : "presentationSurroundingContainer"
				} ]
			} ]
		}, {
			"name" : "presentationsOf",
			"children" : [ {
				repeatId : "0",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadata"
				}, {
					"name" : "linkedRecordId",
					"value" : "groupWithOneCollectionVarChildAndOneTextChildGroup"
				} ],
				"name" : "presentationOf"
			} ]
		}
		]
	});
	
	
	
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);

	let msg = "root/add";
	let dataFromMsg = {
		metadataId : "groupWithOneCollectionVarChildGroup",
		path : [],
		repeatId : "1",
		nameInData : "groupWithOneCollectionVarChildGroup"
	};
	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.strictEqual(subscriptions.length, 1)

	pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg(dataFromMsg, msg);
	
	let path = ["groupWithOneCollectionVarChildGroup.1"];
	
	assert.strictEqual(subscriptions.length, 1)
});


QUnit.test("testSubscribesWhenAddNoSubscriptionForNonHandledMetdataId", function(assert) {
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);

	let msg = "root/add";
	let dataFromMsg = {
		metadataId : "groupWithOneCollectionVarChildGroupNotHandled",
		path : [],
		repeatId : "1",
		nameInData : "groupWithOneCollectionVarChildGroup"
	};
	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.strictEqual(subscriptions.length, 1)

	pNonRepeatingChildRefHandler.possiblySubscribeOnAddMsg(dataFromMsg, msg);
	assert.strictEqual(subscriptions.length, 1)
});

QUnit.test("testChangeViewOnMessage", function(assert) {
	this.spec.mode = "output";
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);

	let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
	let dataFromMsg = {
		"data" : "someValue",
		path : []
	};
	assert.strictEqual(this.dependencies.pubSub.getMessages().length, 0);

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);
	
	assert.strictEqual(this.dependencies.pubSub.getMessages().length, 1);
	let firstMessage = this.dependencies.pubSub.getMessages()[0];
	assert.strictEqual(firstMessage.type, "presentationShown");
	let expectedMessage = {
		"data" : "",
		path : []
	};
	assert.stringifyEqual(firstMessage.message, expectedMessage);
});

QUnit.test("testChangeViewOnMessageNotShownForSetValueWithBlankValue", function(assert) {
	this.spec.mode = "output";
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);

	let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
	let dataFromMsg = {
		"data" : "",
		path : []
	};
	assert.strictEqual(this.dependencies.pubSub.getMessages().length, 0);

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);
	
	assert.strictEqual(this.dependencies.pubSub.getMessages().length, 0);

});

QUnit.test("testChangeViewOnMessageRemovedOnNewBlank", function(assert) {
	this.spec.mode = "output";
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);

	let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
	let dataFromMsg = {
		"data" : "someValue",
		path : []
	};

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);

	dataFromMsg.data = "";
	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);
});
QUnit.test("testChangeViewOnMessageRemovedOnNewBlankForInput", function(assert) {
	this.spec.mode = "input";
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);

	let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
	let dataFromMsg = {
		"data" : "someValue",
		path : []
	};

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);

	dataFromMsg.data = "";
	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);
});

QUnit.test("testChangeViewOnMessageRemovBlock", function(assert) {
	this.spec.mode = "output";
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);

	let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
	let dataFromMsg = {
		"data" : "someValue",
		path : ["groupWithOneCollectionVarChildGroup.1","someNameInData"]
	};

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);

	let msg2 = "root/groupWithOneCollectionVarChildGroup.1/remove";
	let dataFromMsg2 = {
		"type" : "remove",
		path : ["groupWithOneCollectionVarChildGroup.1"]
	};

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg2, msg2);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);
});

QUnit.test("testChangeViewOnMessageRemovBlockInput", function(assert) {
	this.spec.mode = "input";
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);

	let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
	let dataFromMsg = {
		"data" : "someValue",
		path : ["groupWithOneCollectionVarChildGroup.1","someNameInData"]
	};

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);

	let msg2 = "root/groupWithOneCollectionVarChildGroup.1/remove";
	let dataFromMsg2 = {
		"type" : "remove",
		path : ["groupWithOneCollectionVarChildGroup.1"]
	};

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg2, msg2);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);
});

QUnit.test("testChangeViewOnMessageTwoChildren", function(assert) {
	this.spec.mode = "output";
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	let viewHandlerSpy = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);

	let msg = "root/groupWithOneCollectionVarChildGroup.1/someNameInData/setValue";
	let dataFromMsg = {
		"data" : "someValue"
	};

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);

	let msg2 = "root/groupIdOneTextChild/someNameInData/setValue";
	let dataFromMsg2 = {
		"data" : "someValue2"
	};

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg2, msg2);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);

	dataFromMsg.data = "";
	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg, msg);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), true);
	assert.strictEqual(viewHandlerSpy.getIsShown(), true);

	let msg3 = "root/groupIdOneTextChild/remove";
	let dataFromMsg3 = {
		"type" : "remove"
	};

	pNonRepeatingChildRefHandler.handleMsgToDeterminDataState(dataFromMsg3, msg3);
	assert.strictEqual(viewHandlerSpy.getDataHasDataStyle(), false);
	assert.strictEqual(viewHandlerSpy.getIsShown(), false);
});

QUnit.test("testpublishPresentationShownPublishMessage", function(assert) {
	let pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	assert.strictEqual(this.dependencies.pubSub.getMessages().length, 0);
	
	pNonRepeatingChildRefHandler.publishPresentationShown();
	
	assert.strictEqual(this.dependencies.pubSub.getMessages().length, 1);
	let firstMessage = this.dependencies.pubSub.getMessages()[0];
	assert.strictEqual(firstMessage.type, "presentationShown");
	let expectedMessage = {
		"data" : "",
		path : []
	};
	assert.stringifyEqual(firstMessage.message, expectedMessage);
});
