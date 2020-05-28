/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2017 Olov McKie
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
QUnit.module("ppresentation/RecordLinkTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");

		this.getIdForGeneratedPresentationByNo2 = function(no) {
			return CORA.coraData(
					this.dependencies.presentationFactory.getCPresentations()[no]
							.getFirstChildByNameInData("recordInfo"))
					.getFirstAtomicValueByNameInData("id");
		};
		this.answerCall2 = function(no) {
			var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(no);
			var jsonRecord = JSON.stringify({
				"record" : CORATEST.recordTypeList.dataList.data[4].record
			});
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		};
		this.searchProvider = CORATEST.searchProviderSpy();
		this.providers = {
			"searchProvider" : this.searchProvider
		};

		this.searchHandlerFactory = CORATEST.standardFactorySpy("searchHandlerSpy");
		this.globalFactories = {
			"searchHandlerFactory" : this.searchHandlerFactory
		};

		this.dependencies = {
			"providers" : this.providers,
			"globalFactories" : this.globalFactories,
			"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy(),
			"pRecordLinkViewFactory" : CORATEST.standardFactorySpy("pRecordLinkViewSpy"),
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"presentationFactory" : CORATEST.standardFactorySpy("presentationSpy"),
			"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
			"recordGuiFactory" : CORATEST.recordGuiFactorySpy(),
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
			 "recordTypeProvider" : CORATEST.recordTypeProviderSpy()
		};
		this.spec = {
			"path" : {},
			"cPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"))
		};

		this.dataFromMsgWithLink = {
			"data" : {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataTextVariable"
				}, {
					"name" : "linkedRecordId",
					"value" : "cora"
				} ],
				"actionLinks" : {
					"read" : {
						"requestMethod" : "GET",
						"rel" : "read",
						"url" : "http://localhost:8080/therest/rest/record/system/cora",
						"accept" : "application/vnd.uub.record+json"
					}
				},
				"name" : "dataDivider"
			},
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "recordInfo"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "dataDivider"
					} ]
				} ]
			}
		};
		this.dataFromMsgWithLinkButNoValue = {
			"data" : {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataTextVariable"
				}, {
					"name" : "linkedRecordId",
					"value" : ""
				} ],
				"actionLinks" : {
					"read" : {
						"requestMethod" : "GET",
						"rel" : "read",
						"url" : "http://localhost:8080/therest/rest/record/system/cora",
						"accept" : "application/vnd.uub.record+json"
					}
				},
				"name" : "dataDivider"
			},
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "recordInfo"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "dataDivider"
					} ]
				} ]
			}
		};
		this.dataFromMsgWithoutLink = {
			"data" : {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataTextVariable"
				}, {
					"name" : "linkedRecordId",
					"value" : "cora"
				} ],
				"name" : "dataDivider"
			},
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "recordInfo"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "dataDivider"
					} ]
				} ]
			}
		};
		this.getIdFromCPresentation = function(cPresentation){
			var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			var id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
			return id.value;
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInitRecordLinkWithImplementingLinkedRecordType", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var recordTypeView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");

	assert.strictEqual(recordTypeView.firstChild.className, "text");
	var recordTypeTextView = recordTypeView.childNodes[1];
	assert.strictEqual(recordTypeTextView, this.dependencies.presentationFactory.getFactored(0)
		.getView());
	var factoredSpecForType = this.dependencies.presentationFactory.getSpec(0);
	assert.strictEqual(factoredSpecForType.metadataIdUsedInData, "linkedRecordTypeTextVar");

	var expectedPathForType = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordType"
		} ]
	};
	assert.stringifyEqual(factoredSpecForType.path, expectedPathForType);
	var recordInfoForType = factoredSpecForType.cPresentation.getFirstChildByNameInData("recordInfo");
	var typePVarId = CORA.coraData(recordInfoForType).getFirstChildByNameInData("id");
	assert.strictEqual(typePVarId.value, "linkedRecordTypeOutputPVar");


	var recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");

	assert.strictEqual(recordIdView.firstChild.className, "text");
	var recordIdTextView = recordIdView.childNodes[1];
	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
		.getView());

	var factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");

	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(factoredSpec.path, expectedPath);
	var recordInfo = factoredSpec.cPresentation.getFirstChildByNameInData("recordInfo");
	var id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
	assert.strictEqual(id.value, "linkedRecordIdPVar");
	assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
});

QUnit.test("testInitRecordLinkWithAbstractLinkedRecordType", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myAbstractLinkNoPresentationOfLinkedRecordWithSearchPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);

	var recordTypeView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");

	assert.strictEqual(recordTypeView.firstChild.className, "text");
	assert.strictEqual(recordTypeView.firstChild.innerHTML, "Posttyp");
	var recordTypeTextView = recordTypeView.childNodes[1];
	assert.strictEqual(recordTypeTextView, this.dependencies.presentationFactory.getFactored(0)
		.getView());
	var factoredSpecForType = this.dependencies.presentationFactory.getSpec(0);
	assert.strictEqual(factoredSpecForType.metadataIdUsedInData, "linkedRecordTypeTextVar");

	var expectedPathForType = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordType"
		} ]
	};
	assert.stringifyEqual(factoredSpecForType.path, expectedPathForType);
	var recordInfoForType = factoredSpecForType.cPresentation.getFirstChildByNameInData("recordInfo");
	var typePVarId = CORA.coraData(recordInfoForType).getFirstChildByNameInData("id");
	assert.strictEqual(typePVarId.value, "linkedRecordTypePVar");

	var recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");

	assert.strictEqual(recordIdView.firstChild.className, "text");
	assert.strictEqual(recordIdView.firstChild.innerHTML, "PostId");
	var recordIdTextView = recordIdView.childNodes[1];
	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
		.getView());

	var factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");

	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(factoredSpec.path, expectedPath);
	var recordInfo = factoredSpec.cPresentation.getFirstChildByNameInData("recordInfo");
	var id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
	assert.strictEqual(id.value, "linkedRecordIdPVar");


	assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
});

QUnit.test("testInitSubscribeToLinkedDataMessages", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "linkedData");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === pRecordLink.handleMsg);
});

QUnit.test("testInitSubscribeToSetValueOnRecordTypeAndRecordId", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	var firstSubsription1 = subscriptions[1];
	assert.strictEqual(firstSubsription1.type, "setValue");
	var expectedPath = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordType"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(firstSubsription1.path, expectedPath);

	var firstSubsription = subscriptions[2];
	assert.strictEqual(firstSubsription.type, "setValue");
	var expectedPath = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(firstSubsription.path, expectedPath);
	assert.ok(firstSubsription.functionToCall === pRecordLink.valueChangedOnInput);
});

QUnit.test("testInitSubscribeToSetValueOnRecordTypeAndRecordId", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var factoredView = this.dependencies.pRecordLinkViewFactory.getFactored(0);

	pRecordLink.valueChangedOnInput();

	assert.deepEqual(factoredView.getRemoveLinkedPresentation(), 1);
	assert.deepEqual(factoredView.getHideOpenLinkedRecord(), 1);
	assert.deepEqual(factoredView.getHideClearLinkedRecordIdButtons(), 1);
});

QUnit.test("testGetDependencies", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	assert.strictEqual(pRecordLink.getDependencies(), this.dependencies);
});

QUnit.test("testViewIsFactored", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	var factoredView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	assert.strictEqual(pRecordLink.getView(), factoredView.getView());
	var factoredViewSpec = this.dependencies.pRecordLinkViewFactory.getSpec(0);

	var expectedViewSpec = {
		"mode" : "input",
		"info" : {
			"text" : "myLinkText",
			"defText" : "myLinkDefText",
			"technicalInfo" : [ "textId: " + "myLinkText", "defTextId: " + "myLinkDefText",
					"metadataId: " + "myLink", "nameInData: myLink",
					"linkedRecordType: metadataTextVariable" ]
		},
		"pRecordLink" : pRecordLink
	};
	assert.stringifyEqual(factoredViewSpec, expectedViewSpec);
});

QUnit.test("testInitSearchHandlerIsFactored", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));

	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var factoredSearchHandler = this.searchHandlerFactory.getFactored(0);

	assert.strictEqual(factoredSearchHandler.type, "searchHandlerSpy");
});

QUnit.test("testInitSearchHandlerIsFactoredWithCorrectSpec", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));

	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var factoredSearchHandlerSpec = this.searchHandlerFactory.getSpec(0);

	var expectedSearchHandlerSpec = {
		"metadataId" : "textSearchGroup",
		"presentationId" : "textSearchPGroup",
		"searchLink" : {
			"requestMethod" : "GET",
			"rel" : "search",
			"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/textSearch",
			"accept" : "application/vnd.uub.recordList+json"
		},
		"triggerWhenResultIsChoosen" : pRecordLink.setResultFromSearch
	};
	assert.stringifyEqual(factoredSearchHandlerSpec, expectedSearchHandlerSpec);
	assert.strictEqual(factoredSearchHandlerSpec.triggerWhenResultIsChoosen,
			expectedSearchHandlerSpec.triggerWhenResultIsChoosen);
	assert.ok(pRecordLink.setResultFromSearch);
});

QUnit.test("testInitSearchHandlerIsAddedToView", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));

	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var factoredSearchHandler = this.searchHandlerFactory.getFactored(0);
	var factoredSearchHandlerView = factoredSearchHandler.getView();

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var addedSearchHandlerView = pRecordLinkView.getAddedSearchHandlerView(0);

	assert.strictEqual(addedSearchHandlerView, factoredSearchHandlerView);
});

QUnit
		.test(
				"testChoiceInSearchSendsCorrectMessagesOnPubSub",
				function(assert) {
					this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
							.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));
					var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
					var openInfo = CORATEST.openInfoWrittenTextGroupText;
					pRecordLink.setResultFromSearch(openInfo);

					var message0 = this.dependencies.pubSub.getMessages()[0];
					assert.strictEqual(message0.type, "setValue");
					assert.strictEqual(message0.message.data, "writtenTextGroupText");

					var expectedPath = {
						"name" : "linkedPath",
						"children" : [ {
							"name" : "nameInData",
							"value" : "linkedRecordId"
						} ]
					};
					assert.stringifyEqual(message0.message.path, expectedPath);

					var messageForType = this.dependencies.pubSub.getMessages()[1];
					assert.strictEqual(messageForType.type, "setValue");
					assert.strictEqual(messageForType.message.data, "coraText");

					var expectedPathForType = {
						"name" : "linkedPath",
						"children" : [ {
							"name" : "nameInData",
							"value" : "linkedRecordType"
						} ]
					};
					assert.stringifyEqual(messageForType.message.path, expectedPathForType);

					var message1 = this.dependencies.pubSub.getMessages()[2];
					assert.strictEqual(message1.type, "linkedData");

					var typeFromPRecordLinkHandlesLinkingToAbstractType = "coraText";
					var recordId = "writtenTextGroupText";
					var expectedData1 = {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : typeFromPRecordLinkHandlesLinkingToAbstractType
						}, {
							"name" : "linkedRecordId",
							"value" : recordId
						} ],
						"actionLinks" : {
							"read" : openInfo.record.actionLinks.read
						},
						"name" : "myLink"
					};
					assert.stringifyEqual(message1.message.data, expectedData1);

					assert.stringifyEqual(message1.message.path, this.spec.path);
				});

QUnit
	.test(
		"testChoiceInSearchSendsCorrectLinkedDataMessagesOnPubSubWhenMetadataPointsToAbstract",
		function(assert) {
			this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
				.getMetadataById("myAbstractLinkNoPresentationOfLinkedRecordWithSearchPLink"));
			var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
			var openInfo = CORATEST.openInfoFilenameTextVar;

			pRecordLink.setResultFromSearch(openInfo);

			var message1 = this.dependencies.pubSub.getMessages()[2];
			assert.strictEqual(message1.type, "linkedData");

			var typeFromPRecordLinkHandlesLinkingToAbstractType = "metadataTextVariable";
			var recordId = "filenameTextVar";
			var expectedData1 = {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : typeFromPRecordLinkHandlesLinkingToAbstractType
				}, {
					"name" : "linkedRecordId",
					"value" : recordId
				} ],
				"actionLinks" : {
					"read" : openInfo.record.actionLinks.read
				},
				"name" : "myAbstractLink"
			};
			assert.stringifyEqual(message1.message.data, expectedData1);

			assert.stringifyEqual(message1.message.path, this.spec.path);
		});

QUnit.test("testInitSearchHandlerNOTFactoredWhenNoSearchLinkInPRecordLink", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));

	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var factoredSearchHandler = this.searchHandlerFactory.getFactored(0);

	assert.stringifyEqual(factoredSearchHandler, undefined);
});
QUnit
		.test(
				"testInitSearchHandlerNOTFactoredWhenNoRightToPerformSearch",
				function(assert) {
					this.spec.cPresentation = CORA
							.coraData(this.dependencies.metadataProvider
									.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchNoRightToPerformSearchPLink"));

					var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
					var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
					var factoredSearchHandler = this.searchHandlerFactory.getFactored(0);

					assert.stringifyEqual(factoredSearchHandler, undefined);
				});

QUnit.test("testInitRecordLinkWithFinalValue", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithFinalValuePLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	
	assert.strictEqual(recordIdView.firstChild.className, "text");
	assert.strictEqual(recordIdView.firstChild.innerHTML, "PostId");
	var recordIdTextView = recordIdView.childNodes[1];

	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
			.getView());

	var factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");

	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(factoredSpec.path, expectedPath);
	var recordInfo = factoredSpec.cPresentation.getFirstChildByNameInData("recordInfo");
	var id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
	assert.strictEqual(id.value, "linkedRecordIdOutputPVar");
	assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
});

QUnit.test("testInitRecordLinkWithPath", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myPathLinkNoPresentationOfLinkedRecordPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	
		
	var recordTypeView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");
	
	assert.strictEqual(recordTypeView.firstChild.className, "text");
	assert.strictEqual(recordTypeView.firstChild.innerHTML, "Posttyp");
	var recordTypeTextView = recordTypeView.childNodes[1];

	assert.strictEqual(recordTypeTextView, this.dependencies.presentationFactory.getFactored(0)
			.getView());
	var factoredSpec1 = this.dependencies.presentationFactory.getSpec(0);
	assert.strictEqual(factoredSpec1.metadataIdUsedInData, "linkedRecordTypeTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec1.cPresentation), "linkedRecordTypeOutputPVar");
	var expectedTypePath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordType"
		} ]
	};
	assert.stringifyEqual(factoredSpec1.path, expectedTypePath);

	var recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");

	assert.strictEqual(recordIdView.firstChild.className, "text");
	assert.strictEqual(recordIdView.firstChild.innerHTML, "PostId");
	var recordIdTextView = recordIdView.childNodes[1];
	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
			.getView());
	var factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec.cPresentation), "linkedRecordIdPVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(factoredSpec.path, expectedPath);

	var repeatIdView = pRecordLinkView.getAddedChild(2);
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");


	var repeatIdTextView = repeatIdView.childNodes[0];
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");

	var repeatIdTextView2 = repeatIdView.childNodes[1];
	assert.strictEqual(repeatIdTextView2, this.dependencies.presentationFactory.getFactored(2)
			.getView());
	var factoredSpec2 = this.dependencies.presentationFactory.getSpec(2);
	assert.strictEqual(factoredSpec2.metadataIdUsedInData, "linkedRepeatIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec2.cPresentation), "linkedRepeatIdPVar");
	var expectedPath2 = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "linkedRepeatId"
			} ]
	};
	assert.stringifyEqual(factoredSpec2.path, expectedPath2);


	assert.strictEqual(pRecordLinkView.getAddedChild(3), undefined);
});

QUnit.test("testInitRecordLinkOutput", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	
	
	var recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	assert.strictEqual(recordIdView.firstChild.className, "text");
	assert.strictEqual(recordIdView.firstChild.innerHTML, "PostId");
	var recordIdTextView = recordIdView.childNodes[1];

	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
			.getView());
	var factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec.cPresentation), "linkedRecordIdOutputPVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(factoredSpec.path, expectedPath);

	var recordTypeView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");
	assert.strictEqual(recordTypeView.firstChild.className, "text");
	assert.strictEqual(recordTypeView.firstChild.innerHTML, "Posttyp");
	var recordTypeTextView = recordTypeView.childNodes[1];


	assert.strictEqual(recordTypeTextView, this.dependencies.presentationFactory.getFactored(0)
			.getView());
	var factoredSpecForType = this.dependencies.presentationFactory.getSpec(0);
	assert.strictEqual(factoredSpecForType.metadataIdUsedInData, "linkedRecordTypeTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpecForType.cPresentation), "linkedRecordTypeOutputPVar");
	var expectedPathForType = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordType"
		} ]
	};
	assert.stringifyEqual(factoredSpecForType.path, expectedPathForType);

	assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
});

QUnit.test("testInitRecordLinkWithPathOutput", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myPathLinkNoPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	
	var recordTypeView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");
	
	assert.strictEqual(recordTypeView.firstChild.className, "text");
	assert.strictEqual(recordTypeView.firstChild.innerHTML, "Posttyp");
	var recordTypeTextView = recordTypeView.childNodes[1];


	assert.strictEqual(recordTypeTextView, this.dependencies.presentationFactory.getFactored(0)
			.getView());
	var factoredSpecRecordType = this.dependencies.presentationFactory.getSpec(0);
	assert.strictEqual(factoredSpecRecordType.metadataIdUsedInData, "linkedRecordTypeTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpecRecordType.cPresentation), "linkedRecordTypeOutputPVar");
	var expectedPathRecordType = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordType"
		} ]
	};
	assert.stringifyEqual(factoredSpecRecordType.path, expectedPathRecordType);

	var recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	
	assert.strictEqual(recordIdView.firstChild.className, "text");
	assert.strictEqual(recordIdView.firstChild.innerHTML, "PostId");
	var recordIdTextView = recordIdView.childNodes[1];

	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
			.getView());
	var factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec.cPresentation), "linkedRecordIdOutputPVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(factoredSpec.path, expectedPath);
	assert.strictEqual(recordIdView.firstChild.className, "text");


	var repeatIdView = pRecordLinkView.getAddedChild(2);
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");


	var repeatIdTextView = repeatIdView.childNodes[0];
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");

	var repeatIdTextView2 = repeatIdView.childNodes[1];
	assert.strictEqual(repeatIdTextView2, this.dependencies.presentationFactory.getFactored(2)
			.getView());
	var factoredSpec2 = this.dependencies.presentationFactory.getSpec(2);
	assert.strictEqual(factoredSpec2.metadataIdUsedInData, "linkedRepeatIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec2.cPresentation), "linkedRepeatIdOutputPVar");
	var expectedPath2 = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "linkedRepeatId"
			} ]
	};
	assert.stringifyEqual(factoredSpec2.path, expectedPath2);


	assert.strictEqual(pRecordLinkView.getAddedChild(3), undefined);
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroup", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var dataFromMsg = this.dataFromMsgWithLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");
	this.answerCall2(0);

	// FOR LINKED PRESENATION:
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView.className, "recordViewer");

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);
	assert.strictEqual(pRecordLinkView.getClearLinkedRecordIdMethods(0), undefined);

	assert.strictEqual(this.dependencies.recordGuiFactory.getSpec(0).metadataId,
			"metadataTextVariableGroup");
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoData", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var dataFromMsg = {
		"path" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "recordInfo"
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "dataDivider"
				} ]
			} ]
		}
	};
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView, undefined);

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoActionLinks", function(
		assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var dataFromMsg = this.dataFromMsgWithoutLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView, undefined);

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);
});

QUnit
		.test(
				"testInitRecordLinkOutputWithLinkedRecord"
						+ "PresentationsGroupWrongLinkedRecordType",
				function(assert) {
					this.spec.cPresentation = CORA
							.coraData(this.dependencies.metadataProvider
									.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType"));
					var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
					var view = pRecordLink.getView();
					var childrenView = view.firstChild;
					this.fixture.appendChild(view);

					var dataFromMsg = {
						"data" : {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataTextVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "cora"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/system/cora",
									"accept" : "application/vnd.uub.record+json"
								}
							},
							"name" : "dataDivider"
						},
						"path" : {
							"name" : "linkedPath",
							"children" : [ {
								"name" : "nameInData",
								"value" : "recordInfo"
							}, {
								"name" : "linkedPath",
								"children" : [ {
									"name" : "nameInData",
									"value" : "dataDivider"
								} ]
							} ]
						}
					};
					pRecordLink.handleMsg(dataFromMsg, "linkedData");

					assert.strictEqual(pRecordLink.type, "pRecordLink");
					assert.deepEqual(view.className, "pRecordLinkViewSpyView");

					var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
					var linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
					assert.strictEqual(linkedRecordView, undefined);

					assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);

				});

QUnit.test("testHandleMsgWithLinkShowsOpenLinkInView", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var dataFromMsg = this.dataFromMsgWithLink;

	assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 0);
	assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 1);
	assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
});

QUnit.test("testHandleMsgWithLinkHidesOpenLinkInViewWhenFirstShown", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var dataFromMsg = this.dataFromMsgWithoutLink;

	assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 0);
	assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 0);
	assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);

	pRecordLink.handleMsg(this.dataFromMsgWithLink, "linkedData");
	assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 1);
	assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
	pRecordLink.handleMsg(dataFromMsg, "linkedData");
	assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 1);
	assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 1);
});

QUnit.test("testHandleMsgWithLinkHidesSearch", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var dataFromMsg = this.dataFromMsgWithLink;

	assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 0);
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 1);
});

QUnit.test("testHandleMsgWithLinkButNoValueUsedInCopyAsNewShowsSearch", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var dataFromMsg = this.dataFromMsgWithLinkButNoValue;

	assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 0);
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 0);
});

QUnit.test("testOpenLinkedRecord", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var dataFromMsg = this.dataFromMsgWithLink;

	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	pRecordLink.openLinkedRecord({
		"loadInBackground" : "false"
	});

	var jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	var expectedOpenInfo = {
		"readLink" : dataFromMsg.data.actionLinks.read,
		"loadInBackground" : "false"
	};
	assert.strictEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "false");

	pRecordLink.openLinkedRecord({
		"loadInBackground" : "true"
	});
	assert.strictEqual(jsClient.getOpenInfo(1).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "true");
});

QUnit.test("testClearLinkedRecordId", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordInputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);

	assert.strictEqual(pRecordLinkView.getChildrenShown(), 0);

	pRecordLink.clearLinkedRecordId();

	var message0 = this.dependencies.pubSub.getMessages()[0];
	assert.strictEqual(message0.type, "setValue");
	assert.strictEqual(message0.message.data, "");

	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(message0.message.path, expectedPath);
	assert.strictEqual(pRecordLinkView.getChildrenShown(), 1);
});
QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroup", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordInputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var dataFromMsg = this.dataFromMsgWithLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");
	this.answerCall2(0);

	// FOR LINKED PRESENATION:
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView.className, "recordViewer");

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);

	assert.strictEqual(this.dependencies.recordGuiFactory.getSpec(0).metadataId,
			"metadataTextVariableGroup");

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);
	assert.strictEqual(pRecordLinkView.getClearLinkedRecordIdMethods(0),
			pRecordLink.clearLinkedRecordId);
});
