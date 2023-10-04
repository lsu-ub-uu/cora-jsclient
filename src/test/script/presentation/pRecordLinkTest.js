/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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
QUnit.module.only("presentation/pRecordLinkTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");

		this.getIdForGeneratedPresentationByNo2 = function(no) {
			return CORA.coraData(
				this.dependencies.presentationFactory.getCPresentations()[no]
					.getFirstChildByNameInData("recordInfo"))
				.getFirstAtomicValueByNameInData("id");
		};
		this.answerCall2 = function(no) {
			let ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(no);
			let jsonRecord = JSON.stringify({
				"record": CORATEST.recordTypeList.dataList.data[4].record
			});
			let answer = {
				"spec": ajaxCallSpy0.getSpec(),
				"responseText": jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		};
		this.searchProvider = CORATEST.searchProviderSpy();
		this.providers = {
			"searchProvider": this.searchProvider
		};

		this.searchHandlerFactory = CORATEST.standardFactorySpy("searchHandlerSpy");
		this.globalFactories = {
			"searchHandlerFactory": this.searchHandlerFactory
		};

		this.pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");

		this.dependencies = {
			providers: this.providers,
			globalFactories: this.globalFactories,
			clientInstanceProvider: CORATEST.clientInstanceProviderSpy(),
			pRecordLinkViewFactory: CORATEST.standardFactorySpy("pRecordLinkViewSpy"),
			pAttributesFactory: this.pAttributesFactory,
			metadataProvider: new MetadataProviderStub(),
			pubSub: CORATEST.pubSubSpy(),
			textProvider: CORATEST.textProviderStub(),
			presentationFactory: CORATEST.standardFactorySpy("presentationSpy"),
			jsBookkeeper: CORATEST.jsBookkeeperSpy(),
			recordGuiFactory: CORATEST.recordGuiFactorySpy(),
			ajaxCallFactory: CORATEST.ajaxCallFactorySpy(),
			recordTypeProvider: CORATEST.recordTypeProviderSpy()
		};
		this.recordPartPermissionCalculatorFactory = CORATEST.standardFactorySpy("recordPartPermissionCalculatorSpy");

		this.spec = {
			"path": [],
			"cPresentation": CORA.coraData(this.dependencies.metadataProvider
				.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink")),
			recordPartPermissionCalculatorFactory: this.recordPartPermissionCalculatorFactory
		};

		this.dataFromMsgWithLink = {
			"data": {
				"children": [{
					"name": "linkedRecordType",
					"value": "metadataTextVariable"
				}, {
					"name": "linkedRecordId",
					"value": "cora"
				}],
				"actionLinks": {
					"read": {
						"requestMethod": "GET",
						"rel": "read",
						"url": "http://localhost:8080/therest/rest/record/system/cora",
						"accept": "application/vnd.uub.record+json"
					}
				},
				"name": "dataDivider"
			},
			"path": ["dataDivider"]
		};
		this.dataFromMsgWithLinkButNoValue = {
			"data": {
				"children": [{
					"name": "linkedRecordType",
					"value": "metadataTextVariable"
				}, {
					"name": "linkedRecordId",
					"value": ""
				}],
				"actionLinks": {
					"read": {
						"requestMethod": "GET",
						"rel": "read",
						"url": "http://localhost:8080/therest/rest/record/system/cora",
						"accept": "application/vnd.uub.record+json"
					}
				},
				"name": "dataDivider"
			},
			"path": ["recordInfo", "dataDivider"]
		};
		this.dataFromMsgWithoutLink = {
			"data": {
				"children": [{
					"name": "linkedRecordType",
					"value": "metadataTextVariable"
				}, {
					"name": "linkedRecordId",
					"value": "cora"
				}],
				"name": "dataDivider"
			},
			"path": ["recordInfo", "dataDivider"]
		};
		this.getIdFromCPresentation = function(cPresentation) {
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			let id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
			return id.value;
		}
	},
});

QUnit.test("testGetDependencies", function(assert) {
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	assert.strictEqual(pRecordLink.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	assert.strictEqual(pRecordLink.getSpec(), this.spec);
});

QUnit.test("testInitRecordLinkWithImplementingLinkedRecordType", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let recordTypeView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");

	assert.strictEqual(recordTypeView.firstChild.className, "text");
	let recordTypeTextView = recordTypeView.childNodes[1];
	assert.strictEqual(recordTypeTextView, this.dependencies.presentationFactory.getFactored(0)
		.getView());
	let factoredSpecForType = this.dependencies.presentationFactory.getSpec(0);
	assert.strictEqual(factoredSpecForType.metadataIdUsedInData, "linkedRecordTypeTextVar");

	let expectedPathForType = ["linkedRecordTypeTextVar"];
	assert.stringifyEqual(factoredSpecForType.path, expectedPathForType);
	let recordInfoForType = factoredSpecForType.cPresentation.getFirstChildByNameInData("recordInfo");
	let typePVarId = CORA.coraData(recordInfoForType).getFirstChildByNameInData("id");
	assert.strictEqual(typePVarId.value, "linkedRecordTypeOutputPVar");


	let recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");

	assert.strictEqual(recordIdView.firstChild.className, "text");
	let recordIdTextView = recordIdView.childNodes[1];
	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
		.getView());

	let factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");

	let expectedPath = ["linkedRecordIdTextVar"];
	assert.stringifyEqual(factoredSpec.path, expectedPath);
	let recordInfo = factoredSpec.cPresentation.getFirstChildByNameInData("recordInfo");
	let id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
	assert.strictEqual(id.value, "linkedRecordIdPVar");
	assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
});


QUnit.test("testInitSubscribeToLinkedDataMessages", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	let firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "linkedData");
	assert.deepEqual(firstSubsription.path, []);
	assert.ok(firstSubsription.functionToCall === pRecordLink.handleMsg);
});

QUnit.test("testInitSubscribeToSetValueOnRecordTypeAndRecordId", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	let subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	let firstSubsription1 = subscriptions[1];
	assert.strictEqual(firstSubsription1.type, "setValue");
	let expectedPath = ["linkedRecordTypeTextVar"];
	assert.deepEqual(firstSubsription1.path, expectedPath);

	let firstSubsription = subscriptions[2];
	assert.strictEqual(firstSubsription.type, "setValue");
	let expectedPath2 = ["linkedRecordIdTextVar"];
	assert.deepEqual(firstSubsription.path, expectedPath2);
	assert.ok(firstSubsription.functionToCall === pRecordLink.valueChangedOnInput);
});

QUnit.test("testInitSubscribeToSetValueOnRecordTypeAndRecordId", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let factoredView = this.dependencies.pRecordLinkViewFactory.getFactored(0);

	pRecordLink.valueChangedOnInput();

	assert.deepEqual(factoredView.getRemoveLinkedPresentation(), 1);
	assert.deepEqual(factoredView.getHideOpenLinkedRecord(), 1);
	assert.deepEqual(factoredView.getHideClearLinkedRecordIdButtons(), 1);
});

QUnit.test("testGetDependencies", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	assert.strictEqual(pRecordLink.getDependencies(), this.dependencies);
});

QUnit.test("testViewIsFactored", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	let factoredView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	assert.strictEqual(pRecordLink.getView(), factoredView.getView());
	let factoredViewSpec = this.dependencies.pRecordLinkViewFactory.getSpec(0);

	let expectedViewSpec = {
		mode: "input",
		label: "myLinkText",
		info: {
			text: "myLinkText",
			defText: "myLinkDefText",
			technicalInfo: [
				{
					text: "textId: myLinkText",
					onclickMethod: pRecordLink.openTextIdRecord
				},
				{
					text: "defTextId: myLinkDefText",
					"onclickMethod": pRecordLink.openDefTextIdRecord,
				},
				{
					text: "metadataId: myLink",
					onclickMethod: pRecordLink.openMetadataIdRecord
				},
				{
					text: "nameInData: myLink"
				},
				{
					text: "linkedRecordType: metadataTextVariable"
				},
				{
					text: "presentationId: myLinkNoPresentationOfLinkedRecordPLink",
					onclickMethod: pRecordLink.openPresentationIdRecord
				}
			]
		},
		"pRecordLink": pRecordLink
	};
	assert.deepEqual(factoredViewSpec, expectedViewSpec);
});

QUnit.test("testViewIsFactoredWithoutLabelIfShowLabelFalse", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoLabelNoPresentationOfLinkedRecordPLink"));

	CORA.pRecordLink(this.dependencies, this.spec);

	let factoredViewSpec = this.dependencies.pRecordLinkViewFactory.getSpec(0);
	assert.deepEqual(factoredViewSpec.label, undefined);
});

QUnit.test("testViewIsFactoredWithOtherLabelIfOtherLabelTextIsSet", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkOtherLabelTextNoPresentationOfLinkedRecordPLink"));

	CORA.pRecordLink(this.dependencies, this.spec);

	let factoredViewSpec = this.dependencies.pRecordLinkViewFactory.getSpec(0);
	assert.deepEqual(factoredViewSpec.label, "otherLabelText_text");
});

QUnit.test("testFactoredPAttributes", function(assert) {
	let path = [];
	this.spec.path = path;
	CORA.pRecordLink(this.dependencies, this.spec);
	let pRecordLinkViewSpy = this.dependencies.pRecordLinkViewFactory.getFactored(0);

	let attributesSpec = this.pAttributesFactory.getSpec(0);

	assert.strictEqual(attributesSpec.addViewToParent, pRecordLinkViewSpy.addAttributesView);
	assert.strictEqual(attributesSpec.path, path);
	assert.strictEqual(attributesSpec.mode, "input");
});

QUnit.test("testInitSearchHandlerIsFactored", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));

	CORA.pRecordLink(this.dependencies, this.spec);
	let factoredSearchHandler = this.searchHandlerFactory.getFactored(0);

	assert.strictEqual(factoredSearchHandler.type, "searchHandlerSpy");
});

QUnit.test("testInitSearchHandlerIsFactoredWithCorrectSpec", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));

	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let factoredSearchHandlerSpec = this.searchHandlerFactory.getSpec(0);

	let expectedSearchHandlerSpec = {
		"metadataId": "textSearchGroup",
		"presentationId": "textSearchPGroup",
		"searchLink": {
			"requestMethod": "GET",
			"rel": "search",
			"url": "http://epc.ub.uu.se/therest/rest/record/searchResult/textSearch",
			"accept": "application/vnd.uub.recordList+json"
		},
		"triggerWhenResultIsChoosen": pRecordLink.setResultFromSearch
	};
	assert.stringifyEqual(factoredSearchHandlerSpec, expectedSearchHandlerSpec);
	assert.strictEqual(factoredSearchHandlerSpec.triggerWhenResultIsChoosen,
		expectedSearchHandlerSpec.triggerWhenResultIsChoosen);
	assert.ok(pRecordLink.setResultFromSearch);
});

QUnit.test("testInitSearchHandlerIsAddedToView", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));

	CORA.pRecordLink(this.dependencies, this.spec);
	let factoredSearchHandler = this.searchHandlerFactory.getFactored(0);
	let factoredSearchHandlerView = factoredSearchHandler.getView();

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let addedSearchHandlerView = pRecordLinkView.getAddedSearchHandlerView(0);

	assert.strictEqual(addedSearchHandlerView, factoredSearchHandlerView);
});

QUnit
	.test(
		"testChoiceInSearchSendsCorrectMessagesOnPubSub",
		function(assert) {
			this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
				.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));
			let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
			let openInfo = CORATEST.openInfoWrittenTextGroupText;
			pRecordLink.setResultFromSearch(openInfo);

			let message0 = this.dependencies.pubSub.getMessages()[0];
			assert.strictEqual(message0.type, "setValue");
			assert.strictEqual(message0.message.data, "writtenTextGroupText");

			let expectedPath = ["linkedRecordIdTextVar"];
			assert.stringifyEqual(message0.message.path, expectedPath);

			let messageForType = this.dependencies.pubSub.getMessages()[1];
			assert.strictEqual(messageForType.type, "setValue");
			assert.strictEqual(messageForType.message.data, "coraText");

			let expectedPathForType = ["linkedRecordTypeTextVar"];
			assert.stringifyEqual(messageForType.message.path, expectedPathForType);

			let message1 = this.dependencies.pubSub.getMessages()[2];
			assert.strictEqual(message1.type, "linkedData");

			let typeFromPRecordLinkHandlesLinkingToAbstractType = "coraText";
			let recordId = "writtenTextGroupText";
			let expectedData1 = {
				"children": [{
					"name": "linkedRecordType",
					"value": typeFromPRecordLinkHandlesLinkingToAbstractType
				}, {
					"name": "linkedRecordId",
					"value": recordId
				}],
				"actionLinks": {
					"read": openInfo.record.actionLinks.read
				},
				"name": "myLink"
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
			let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
			let openInfo = CORATEST.openInfoFilenameTextVar;

			pRecordLink.setResultFromSearch(openInfo);

			let message1 = this.dependencies.pubSub.getMessages()[2];
			assert.strictEqual(message1.type, "linkedData");

			let typeFromPRecordLinkHandlesLinkingToAbstractType = "metadataTextVariable";
			let recordId = "filenameTextVar";
			let expectedData1 = {
				"children": [{
					"name": "linkedRecordType",
					"value": typeFromPRecordLinkHandlesLinkingToAbstractType
				}, {
					"name": "linkedRecordId",
					"value": recordId
				}],
				"actionLinks": {
					"read": openInfo.record.actionLinks.read
				},
				"name": "myAbstractLink"
			};
			assert.stringifyEqual(message1.message.data, expectedData1);

			assert.stringifyEqual(message1.message.path, this.spec.path);
		});

QUnit.test("testInitSearchHandlerNOTFactoredWhenNoSearchLinkInPRecordLink", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));

	let factoredSearchHandler = this.searchHandlerFactory.getFactored(0);

	assert.stringifyEqual(factoredSearchHandler, undefined);
});
QUnit
	.test(
		"testInitSearchHandlerNOTFactoredWhenNoRightToPerformSearch",
		function(assert) {
			this.spec.cPresentation = CORA
				.coraData(this.dependencies.metadataProvider
					.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchNoRightToPerformSearchPLink"));

			let factoredSearchHandler = this.searchHandlerFactory.getFactored(0);

			assert.stringifyEqual(factoredSearchHandler, undefined);
		});

QUnit.test("testInitRecordLinkWithFinalValue", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordWithFinalValuePLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");

	assert.strictEqual(recordIdView.firstChild.className, "text");
	assert.strictEqual(recordIdView.firstChild.innerHTML, "PostId");
	let recordIdTextView = recordIdView.childNodes[1];

	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
		.getView());

	let factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");

	let expectedPath = ["linkedRecordIdTextVar"];
	assert.stringifyEqual(factoredSpec.path, expectedPath);
	let recordInfo = factoredSpec.cPresentation.getFirstChildByNameInData("recordInfo");
	let id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
	assert.strictEqual(id.value, "linkedRecordIdOutputPVar");
	assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
});

QUnit.test("testInitRecordLinkWithPath", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myPathLinkNoPresentationOfLinkedRecordPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);


	let recordTypeView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");

	assert.strictEqual(recordTypeView.firstChild.className, "text");
	assert.strictEqual(recordTypeView.firstChild.innerHTML, "Posttyp");
	let recordTypeTextView = recordTypeView.childNodes[1];

	assert.strictEqual(recordTypeTextView, this.dependencies.presentationFactory.getFactored(0)
		.getView());
	let factoredSpec1 = this.dependencies.presentationFactory.getSpec(0);
	assert.strictEqual(factoredSpec1.metadataIdUsedInData, "linkedRecordTypeTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec1.cPresentation), "linkedRecordTypeOutputPVar");
	let expectedTypePath = ["linkedRecordTypeTextVar"];
	assert.stringifyEqual(factoredSpec1.path, expectedTypePath);

	let recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");

	assert.strictEqual(recordIdView.firstChild.className, "text");
	assert.strictEqual(recordIdView.firstChild.innerHTML, "PostId");
	let recordIdTextView = recordIdView.childNodes[1];
	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
		.getView());
	let factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec.cPresentation), "linkedRecordIdPVar");
	let expectedPath = ["linkedRecordIdTextVar"];
	assert.stringifyEqual(factoredSpec.path, expectedPath);

	let repeatIdView = pRecordLinkView.getAddedChild(2);
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");


	let repeatIdTextView = repeatIdView.childNodes[0];
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");

	let repeatIdTextView2 = repeatIdView.childNodes[1];
	assert.strictEqual(repeatIdTextView2, this.dependencies.presentationFactory.getFactored(2)
		.getView());
	let factoredSpec2 = this.dependencies.presentationFactory.getSpec(2);
	assert.strictEqual(factoredSpec2.metadataIdUsedInData, "linkedRepeatIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec2.cPresentation), "linkedRepeatIdPVar");
	let expectedPath2 = ["linkedRepeatIdTextVar"];
	assert.stringifyEqual(factoredSpec2.path, expectedPath2);


	assert.strictEqual(pRecordLinkView.getAddedChild(3), undefined);
});

QUnit.test("testInitRecordLinkOutput", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);


	let recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	assert.strictEqual(recordIdView.firstChild.className, "text");
	assert.strictEqual(recordIdView.firstChild.innerHTML, "PostId");
	let recordIdTextView = recordIdView.childNodes[1];

	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
		.getView());
	let factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec.cPresentation), "linkedRecordIdOutputPVar");
	let expectedPath = ["linkedRecordIdTextVar"];
	assert.stringifyEqual(factoredSpec.path, expectedPath);

	let recordTypeView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");
	assert.strictEqual(recordTypeView.firstChild.className, "text");
	assert.strictEqual(recordTypeView.firstChild.innerHTML, "Posttyp");
	let recordTypeTextView = recordTypeView.childNodes[1];


	assert.strictEqual(recordTypeTextView, this.dependencies.presentationFactory.getFactored(0)
		.getView());
	let factoredSpecForType = this.dependencies.presentationFactory.getSpec(0);
	assert.strictEqual(factoredSpecForType.metadataIdUsedInData, "linkedRecordTypeTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpecForType.cPresentation), "linkedRecordTypeOutputPVar");
	let expectedPathForType = ["linkedRecordTypeTextVar"];
	assert.stringifyEqual(factoredSpecForType.path, expectedPathForType);

	assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
});

QUnit.test("testInitRecordLinkWithPathOutput", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myPathLinkNoPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);

	let recordTypeView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");

	assert.strictEqual(recordTypeView.firstChild.className, "text");
	assert.strictEqual(recordTypeView.firstChild.innerHTML, "Posttyp");
	let recordTypeTextView = recordTypeView.childNodes[1];


	assert.strictEqual(recordTypeTextView, this.dependencies.presentationFactory.getFactored(0)
		.getView());
	let factoredSpecRecordType = this.dependencies.presentationFactory.getSpec(0);
	assert.strictEqual(factoredSpecRecordType.metadataIdUsedInData, "linkedRecordTypeTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpecRecordType.cPresentation), "linkedRecordTypeOutputPVar");
	assert.stringifyEqual(factoredSpecRecordType.path, ["linkedRecordTypeTextVar"]);

	let recordIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");

	assert.strictEqual(recordIdView.firstChild.className, "text");
	assert.strictEqual(recordIdView.firstChild.innerHTML, "PostId");
	let recordIdTextView = recordIdView.childNodes[1];

	assert.strictEqual(recordIdTextView, this.dependencies.presentationFactory.getFactored(1)
		.getView());
	let factoredSpec = this.dependencies.presentationFactory.getSpec(1);
	assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec.cPresentation), "linkedRecordIdOutputPVar");
	assert.stringifyEqual(factoredSpec.path, ["linkedRecordIdTextVar"]);
	assert.strictEqual(recordIdView.firstChild.className, "text");


	let repeatIdView = pRecordLinkView.getAddedChild(2);
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");


	let repeatIdTextView = repeatIdView.childNodes[0];
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");

	let repeatIdTextView2 = repeatIdView.childNodes[1];
	assert.strictEqual(repeatIdTextView2, this.dependencies.presentationFactory.getFactored(2)
		.getView());
	let factoredSpec2 = this.dependencies.presentationFactory.getSpec(2);
	assert.strictEqual(factoredSpec2.metadataIdUsedInData, "linkedRepeatIdTextVar");
	assert.strictEqual(this.getIdFromCPresentation(factoredSpec2.cPresentation), "linkedRepeatIdOutputPVar");
	assert.stringifyEqual(factoredSpec2.path, ["linkedRepeatIdTextVar"]);


	assert.strictEqual(pRecordLinkView.getAddedChild(3), undefined);
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroup", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	let dataFromMsg = this.dataFromMsgWithLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");
	this.answerCall2(0);

	// FOR LINKED PRESENTATION:
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView.className, "recordViewer");

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);
	assert.strictEqual(pRecordLinkView.getClearLinkedRecordIdMethods(0), undefined);

	assert.strictEqual(this.dependencies.recordGuiFactory.getSpec(0).metadataId,
		"metadataTextVariableGroup");
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoData", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	let dataFromMsg = {
		"path": ["recordInfo", "dataDivider"]
	};
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView, undefined);

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoActionLinks", function(
	assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	let dataFromMsg = this.dataFromMsgWithoutLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
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
			let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
			let view = pRecordLink.getView();
			this.fixture.appendChild(view);

			let dataFromMsg = {
				"data": {
					"children": [{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					}, {
						"name": "linkedRecordId",
						"value": "cora"
					}],
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "http://localhost:8080/therest/rest/record/system/cora",
							"accept": "application/vnd.uub.record+json"
						}
					},
					"name": "dataDivider"
				},
				"path": {
					"name": "linkedPath",
					"children": [{
						"name": "nameInData",
						"value": "recordInfo"
					}, {
						"name": "linkedPath",
						"children": [{
							"name": "nameInData",
							"value": "dataDivider"
						}]
					}]
				}
			};
			pRecordLink.handleMsg(dataFromMsg, "linkedData");

			assert.strictEqual(pRecordLink.type, "pRecordLink");
			assert.deepEqual(view.className, "pRecordLinkViewSpyView");

			let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
			let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
			assert.strictEqual(linkedRecordView, undefined);

			assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);

		});

QUnit.test("testRecordLinkWithLinkedRecordPresentationAbstractType", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	let dataFromMsg = this.dataFromMsgWithLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");
	this.answerCall2(0);

	// FOR LINKED PRESENATION:
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView.className, "recordViewer");

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);
	assert.strictEqual(pRecordLinkView.getClearLinkedRecordIdMethods(0), undefined);

	assert.strictEqual(this.dependencies.recordGuiFactory.getSpec(0).metadataId,
		"metadataTextVariableGroup");
});

QUnit.test("testHandleMsgWithLinkShowsOpenLinkInView", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let dataFromMsg = this.dataFromMsgWithLink;

	assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 0);
	assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 1);
	assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
});

QUnit.test("testHandleMsgWithLinkHidesOpenLinkInViewWhenFirstShown", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let dataFromMsg = this.dataFromMsgWithoutLink;

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
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let dataFromMsg = this.dataFromMsgWithLink;

	assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 0);
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 1);
});

QUnit.test("testHandleMsgWithLinkButNoValueUsedInCopyAsNewShowsSearch", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let dataFromMsg = this.dataFromMsgWithLinkButNoValue;

	assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 0);
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 0);
});

QUnit.test("testOpenLinkedRecord", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let dataFromMsg = this.dataFromMsgWithLink;

	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	pRecordLink.openLinkedRecord({
		"loadInBackground": "false"
	});

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": dataFromMsg.data.actionLinks.read,
		"loadInBackground": "false"
	};
	assert.strictEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "false");

	pRecordLink.openLinkedRecord({
		"loadInBackground": "true"
	});
	assert.strictEqual(jsClient.getOpenInfo(1).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "true");
});

QUnit.test("testClearLinkedRecordId", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordInputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);

	assert.strictEqual(pRecordLinkView.getChildrenShown(), 0);

	pRecordLink.clearLinkedRecordId();

	let message0 = this.dependencies.pubSub.getMessages()[0];
	assert.strictEqual(message0.type, "setValue");
	assert.strictEqual(message0.message.data, "");

	let expectedPath = ["linkedRecordIdTextVar"];

	assert.stringifyEqual(message0.message.path, expectedPath);
	assert.strictEqual(pRecordLinkView.getChildrenShown(), 1);
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroup", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("myLinkPresentationOfLinkedRecordInputPLink"));
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	let view = pRecordLink.getView();
	this.fixture.appendChild(view);

	let dataFromMsg = this.dataFromMsgWithLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");
	this.answerCall2(0);

	// FOR LINKED PRESENATION:
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	let pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView.className, "recordViewer");

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);

	assert.strictEqual(this.dependencies.recordGuiFactory.getSpec(0).metadataId,
		"metadataTextVariableGroup");

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);
	assert.strictEqual(pRecordLinkView.getClearLinkedRecordIdMethods(0),
		pRecordLink.clearLinkedRecordId);
});

QUnit.test("testOpenTextIdRecord", function(assert) {
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pRecordLink.openTextIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/text/" + "myLink" + "Text",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pRecordLink.openTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenDefTextIdRecord", function(assert) {
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pRecordLink.openDefTextIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/text/" + "myLink"
				+ "DefText",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event.ctrlKey = false;
	pRecordLink.openDefTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});
QUnit.test("testOpenMetadataIdRecord", function(assert) {
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pRecordLink.openMetadataIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/" + "metadata/"
				+ "myLink",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event.ctrlKey = false;
	pRecordLink.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenPresentationIdRecord", function(assert) {
	let pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pRecordLink.openPresentationIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		readLink: {
			requestMethod: "GET",
			rel: "read",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/" 
				+ "myLinkNoPresentationOfLinkedRecordPLink",
			accept: "application/vnd.uub.record+json"
		},
		loadInBackground: "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pRecordLink.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});
