/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2017, 2023, 2024 Olov McKie
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
QUnit.module("presentation/pRecordLinkTest.js", hooks => {
	const test = QUnit.test;
	let fixture;
	let dependencies;
	let spec;
	let searchProvider;
	let providers;
	let searchHandlerFactory;
	let globalFactories;
	let pAttributesFactory;
	let recordPartPermissionCalculatorFactory;
	let dataFromMsgWithLink;
	let dataFromMsgWithLinkButNoValue;
	let dataFromMsgWithoutLink;


	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");
		setupGlobalFactories();
		setupProviders();
		setupDependencies();
		setupSpec();
		setupDataExamples();
	});

	const setupGlobalFactories = function() {
		searchHandlerFactory = CORATEST.standardFactorySpy("searchHandlerSpy");
		globalFactories = {
			searchHandlerFactory: searchHandlerFactory
		};
	};

	const setupProviders = function() {
		searchProvider = CORATEST.searchProviderSpy();
		providers = {
			searchProvider: searchProvider
		};
	};

	const setupDependencies = function() {
		pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");
		dependencies = {
			providers: providers,
			globalFactories: globalFactories,
			clientInstanceProvider: CORATEST.clientInstanceProviderSpy(),
			pRecordLinkViewFactory: CORATEST.standardFactorySpy("pRecordLinkViewSpy"),
			pAttributesFactory: pAttributesFactory,
			metadataProvider: CORATEST.MetadataProviderStub(),
			pubSub: CORATEST.pubSubSpy(),
			textProvider: CORATEST.textProviderStub(),
			presentationFactory: CORATEST.standardFactorySpy("presentationSpy"),
			jsBookkeeper: CORATEST.jsBookkeeperSpy(),
			recordGuiFactory: CORATEST.recordGuiFactorySpy(),
			ajaxCallFactory: CORATEST.ajaxCallFactorySpy(),
			recordTypeProvider: CORATEST.recordTypeProviderSpy()
		};
	};

	const setupSpec = function() {
		recordPartPermissionCalculatorFactory = CORATEST.standardFactorySpy("recordPartPermissionCalculatorSpy");
		spec = {
			path: [],
			cPresentation: CORA.coraData(dependencies.metadataProvider
				.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink")),
			recordPartPermissionCalculatorFactory: recordPartPermissionCalculatorFactory
		};
	};

	const setupDataExamples = function() {
		dataFromMsgWithLink = {
			data: {
				children: [{
					name: "linkedRecordType",
					value: "metadataTextVariable"
				}, {
					name: "linkedRecordId",
					value: "cora"
				}],
				actionLinks: {
					read: {
						requestMethod: "GET",
						rel: "read",
						url: "http://localhost:8080/therest/rest/record/system/cora",
						accept: "application/vnd.cora.record+json"
					}
				},
				name: "dataDivider"
			},
			path: ["dataDivider"]
		};

		dataFromMsgWithLinkButNoValue = {
			data: {
				children: [{
					name: "linkedRecordType",
					value: "metadataTextVariable"
				}, {
					name: "linkedRecordId",
					value: ""
				}],
				actionLinks: {
					read: {
						requestMethod: "GET",
						rel: "read",
						url: "http://localhost:8080/therest/rest/record/system/cora",
						accept: "application/vnd.cora.record+json"
					}
				},
				name: "dataDivider"
			},
			path: ["recordInfo", "dataDivider"]
		};

		dataFromMsgWithoutLink = {
			data: {
				children: [{
					name: "linkedRecordType",
					value: "metadataTextVariable"
				}, {
					name: "linkedRecordId",
					value: "cora"
				}],
				name: "dataDivider"
			},
			path: ["recordInfo", "dataDivider"]
		};
	};

	const answerCall2 = function(no) {
		let ajaxCallSpy0 = dependencies.ajaxCallFactory.getFactored(no);
		let jsonRecord = JSON.stringify({
			record: CORATEST.recordTypeList.dataList.data[4].record
		});
		let answer = {
			spec: ajaxCallSpy0.getSpec(),
			responseText: jsonRecord
		};
		ajaxCallSpy0.getSpec().loadMethod(answer);
	};

	const getIdFromCPresentation = function(cPresentation) {
		let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		let id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
		return id.value;
	};

	test("testGetDependencies", function(assert) {
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		assert.strictEqual(pRecordLink.getDependencies(), dependencies);
	});

	test("testGetSpec", function(assert) {
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		assert.strictEqual(pRecordLink.getSpec(), spec);
	});

	test("testInitRecordLinkWithImplementingLinkedRecordType", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		assert.strictEqual(pRecordLink.type, "pRecordLink");
		assert.deepEqual(view.className, "pRecordLinkViewSpyView");

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let recordTypeView = pRecordLinkView.getAddedChild(0);
		assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");

		let recordTypeTextView = recordTypeView.childNodes[0];
		assert.strictEqual(recordTypeTextView, dependencies.presentationFactory.getFactored(0)
			.getView());
		let factoredSpecForType = dependencies.presentationFactory.getSpec(0);
		assert.strictEqual(factoredSpecForType.metadataIdUsedInData, "linkedRecordTypeTextVar");

		let expectedPathForType = ["linkedRecordTypeTextVar"];
		assert.stringifyEqual(factoredSpecForType.path, expectedPathForType);
		let recordInfoForType = factoredSpecForType.cPresentation.getFirstChildByNameInData("recordInfo");
		let typePVarId = CORA.coraData(recordInfoForType).getFirstChildByNameInData("id");
		assert.strictEqual(typePVarId.value, "linkedRecordTypeOutputPVar");


		let recordIdView = pRecordLinkView.getAddedChild(1);
		assert.strictEqual(recordIdView.className, "linkedRecordIdView");

		let recordIdTextView = recordIdView.childNodes[0];
		assert.strictEqual(recordIdTextView, dependencies.presentationFactory.getFactored(1)
			.getView());

		let factoredSpec = dependencies.presentationFactory.getSpec(1);
		assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");

		let expectedPath = ["linkedRecordIdTextVar"];
		assert.stringifyEqual(factoredSpec.path, expectedPath);
		let recordInfo = factoredSpec.cPresentation.getFirstChildByNameInData("recordInfo");
		let id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
		assert.strictEqual(id.value, "linkedRecordIdPVar");
		assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
	});

	test("testInitSubscribeToLinkedDataMessages", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let subscriptions = dependencies.pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 4);

		let firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "linkedData");
		assert.deepEqual(firstSubsription.path, []);
		assert.ok(firstSubsription.functionToCall === pRecordLink.handleMsg);
	});

	test("testInitSubscribeToSetValueOnRecordTypeAndRecordId", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let subscriptions = dependencies.pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 4);

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

	test("testInitSubscribeToSetValueOnRecordTypeAndRecordId", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let factoredView = dependencies.pRecordLinkViewFactory.getFactored(0);

		let msg = {
			data: "A new value",
			path: []
		};
		pRecordLink.valueChangedOnInput(msg);

		assert.deepEqual(factoredView.getRemoveLinkedPresentation(), 1);
		assert.deepEqual(factoredView.getHideOpenLinkedRecord(), 1);
		assert.deepEqual(factoredView.getHideClearLinkedRecordIdButtons(), 1);
		assert.deepEqual(factoredView.getShowCalled(), 0);
	});

	test("testInitSubscribeToSetValueOnRecordId", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let subscriptions = dependencies.pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 4);

		let firstSubsription = subscriptions[3];
		assert.strictEqual(firstSubsription.type, "setValue");
		let expectedPath2 = ["linkedRecordIdTextVar"];
		assert.deepEqual(firstSubsription.path, expectedPath2);
		assert.ok(firstSubsription.functionToCall === pRecordLink.hideOrShowOutputPresentation);
	});

	test("testHideOrShowOutputPresentation", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let factoredView = dependencies.pRecordLinkViewFactory.getFactored(0);

		assert.deepEqual(factoredView.getHideCalled(), 1);
		assert.deepEqual(factoredView.getShowCalled(), 0);

		let msg = {
			data: "A new value",
			path: []
		};
		pRecordLink.hideOrShowOutputPresentation(msg);

		assert.deepEqual(factoredView.getHideCalled(), 1);
		assert.deepEqual(factoredView.getShowCalled(), 1);

		let msg2 = {
			data: "",
			path: []
		};
		pRecordLink.hideOrShowOutputPresentation(msg2);

		assert.deepEqual(factoredView.getHideCalled(), 2);
		assert.deepEqual(factoredView.getShowCalled(), 1);
	});

	test("testNoHideOrShowInputPresentation", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let factoredView = dependencies.pRecordLinkViewFactory.getFactored(0);

		let msg = {
			data: "A new value",
			path: []
		};
		pRecordLink.hideOrShowOutputPresentation(msg);

		assert.deepEqual(factoredView.getHideCalled(), 0);
		assert.deepEqual(factoredView.getShowCalled(), 0);

		let msg2 = {
			data: "",
			path: []
		};
		pRecordLink.hideOrShowOutputPresentation(msg2);

		assert.deepEqual(factoredView.getHideCalled(), 0);
		assert.deepEqual(factoredView.getShowCalled(), 0);
	});

	test("testGetDependencies", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		assert.strictEqual(pRecordLink.getDependencies(), dependencies);
	});

	test("testViewIsFactored", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let factoredView = dependencies.pRecordLinkViewFactory.getFactored(0);
		assert.strictEqual(pRecordLink.getView(), factoredView.getView());
		let factoredViewSpec = dependencies.pRecordLinkViewFactory.getSpec(0);

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
			presentAs: "link",
			pRecordLink: pRecordLink
		};
		assert.deepEqual(factoredViewSpec, expectedViewSpec);
	});

	test("testViewIsFactoredWithoutLabelIfShowLabelFalse", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoLabelNoPresentationOfLinkedRecordPLink"));

		CORA.pRecordLink(dependencies, spec);

		let factoredViewSpec = dependencies.pRecordLinkViewFactory.getSpec(0);
		assert.deepEqual(factoredViewSpec.label, undefined);
	});

	test("testViewIsFactoredWithSpecifiedLabelIfSpecifiedLabelTextIsSet", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkSpecifiedLabelTextNoPresentationOfLinkedRecordPLink"));

		CORA.pRecordLink(dependencies, spec);

		let factoredViewSpec = dependencies.pRecordLinkViewFactory.getSpec(0);
		assert.deepEqual(factoredViewSpec.label, "specifiedLabelText_text");
	});

	test("testViewIsFactoredWithoutPresentAs", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoLabelNoPresentationOfLinkedRecordPLink"));

		CORA.pRecordLink(dependencies, spec);

		let factoredViewSpec = dependencies.pRecordLinkViewFactory.getSpec(0);
		assert.deepEqual(factoredViewSpec.presentAs, "link");
	});

	test("testViewIsFactoredWithPresentAs_WithoutValueView", function(assert) {
		let presentation = dependencies.metadataProvider
			.getMetadataById("myLinkNoLabelNoPresentationOfLinkedRecordPLink");
		presentation.children.push({
			name: "presentAs",
			value: "onlyTranslatedText"
		});
		spec.cPresentation = CORA.coraData(presentation);

		CORA.pRecordLink(dependencies, spec);

		let factoredViewSpec = dependencies.pRecordLinkViewFactory.getSpec(0);
		assert.deepEqual(factoredViewSpec.presentAs, "onlyTranslatedText");

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let recordTypeView = pRecordLinkView.getAddedChild(0);
		assert.strictEqual(recordTypeView, undefined);
	});

	test("testInitSubscribeToSetValueOnRecordId_translatedTextSet", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		let presentation = dependencies.metadataProvider
			.getMetadataById("myLinkNoLabelNoPresentationOfLinkedRecordPLink");
		presentation.children.push({
			name: "presentAs",
			value: "onlyTranslatedText"
		});
		spec.cPresentation = CORA.coraData(presentation);

		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let factoredView = dependencies.pRecordLinkViewFactory.getFactored(0);

		let msg = {
			data: "A new value",
			path: []
		};
		pRecordLink.valueChangedOnInput(msg);

		assert.deepEqual(factoredView.getRemoveLinkedPresentation(), 1);
		assert.deepEqual(factoredView.getHideOpenLinkedRecord(), 1);
		assert.deepEqual(factoredView.getHideClearLinkedRecordIdButtons(), 1);
		assert.deepEqual(factoredView.getShowCalled(), 0);

		let addedTextNode = factoredView.getAddedLinkedPresentation(0);
		assert.equal(addedTextNode.nodeName, "#text");
		assert.strictEqual(addedTextNode.textContent, "translated_A new value");
	});

	test("testChangedValueFor_translatedTextSet", function(assert) {
		dependencies.textProvider = CORATEST.textProviderSpy();
		let presentation = dependencies.metadataProvider
			.getMetadataById("myLinkNoLabelNoPresentationOfLinkedRecordPLink");
		presentation.children.push({
			name: "presentAs",
			value: "onlyTranslatedText"
		});
		spec.cPresentation = CORA.coraData(presentation);

		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let factoredView = dependencies.pRecordLinkViewFactory.getFactored(0);

		let msg = {
			data: {
				children: [
					{
						name: "linkedRecordId",
						value: "A new value"
					}
				]
			},
			path: []
		};
		pRecordLink.handleMsg(msg);

		assert.deepEqual(factoredView.getRemoveLinkedPresentation(), 0);
		assert.deepEqual(factoredView.getHideOpenLinkedRecord(), 0);
		assert.deepEqual(factoredView.getHideClearLinkedRecordIdButtons(), 0);
		assert.deepEqual(factoredView.getShowCalled(), 0);

		let addedTextNode = factoredView.getAddedLinkedPresentation(0);
		assert.equal(addedTextNode.nodeName, "#text");
		assert.strictEqual(addedTextNode.textContent, "translated_A new value");
	});

	test("testFactoredPAttributes", function(assert) {
		let path = [];
		spec.path = path;
		CORA.pRecordLink(dependencies, spec);
		let pRecordLinkViewSpy = dependencies.pRecordLinkViewFactory.getFactored(0);

		let attributesSpec = pAttributesFactory.getSpec(0);

		assert.strictEqual(attributesSpec.addViewToParent, pRecordLinkViewSpy.addAttributesView);
		assert.strictEqual(attributesSpec.path, path);
		assert.strictEqual(attributesSpec.mode, "input");
		assert.strictEqual(attributesSpec.toShow, "all");
	});

	test("testFactoredPAttributes_attributesToShow_sentOnToAttributesFactory", function(assert) {
		let attributesToShow = {
			name: "attributesToShow",
			value: "selectable"
		};
		spec.cPresentation.getData().children.push(attributesToShow);
		CORA.pRecordLink(dependencies, spec);

		let attributesSpec = pAttributesFactory.getSpec(0);
		assert.strictEqual(attributesSpec.toShow, "selectable");
	});

	test("testInitSearchHandlerIsFactored", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));

		CORA.pRecordLink(dependencies, spec);
		let factoredSearchHandler = searchHandlerFactory.getFactored(0);

		assert.strictEqual(factoredSearchHandler.type, "searchHandlerSpy");
	});

	test("testInitSearchHandlerIsFactoredWithCorrectSpec", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));

		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let factoredSearchHandlerSpec = searchHandlerFactory.getSpec(0);

		let expectedSearchHandlerSpec = {
			metadataId: "textSearchGroup",
			presentationId: "textSearchPGroup",
			searchLink: {
				requestMethod: "GET",
				rel: "search",
				url: "http://epc.ub.uu.se/therest/rest/record/searchResult/textSearch",
				accept: "application/vnd.cora.recordList+json"
			},
			triggerWhenResultIsChoosen: pRecordLink.setResultFromSearch
		};
		assert.stringifyEqual(factoredSearchHandlerSpec, expectedSearchHandlerSpec);
		assert.strictEqual(factoredSearchHandlerSpec.triggerWhenResultIsChoosen,
			expectedSearchHandlerSpec.triggerWhenResultIsChoosen);
		assert.ok(pRecordLink.setResultFromSearch);
	});

	test("testInitSearchHandlerIsFactoredWithCorrectSpec_withResultPresentation", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchAndResultPresentationPLink"));

		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let factoredSearchHandlerSpec = searchHandlerFactory.getSpec(0);

		let expectedSearchHandlerSpec = {
			metadataId: "textSearchGroup",
			presentationId: "textSearchPGroup",
			searchResultPresentationId: "textSearchResultPGroup",
			searchLink: {
				requestMethod: "GET",
				rel: "search",
				url: "http://epc.ub.uu.se/therest/rest/record/searchResult/textSearch",
				accept: "application/vnd.cora.recordList+json"
			},
			triggerWhenResultIsChoosen: pRecordLink.setResultFromSearch
		};
		assert.stringifyEqual(factoredSearchHandlerSpec, expectedSearchHandlerSpec);
		assert.strictEqual(factoredSearchHandlerSpec.triggerWhenResultIsChoosen,
			expectedSearchHandlerSpec.triggerWhenResultIsChoosen);
		assert.ok(pRecordLink.setResultFromSearch);
	});

	test("testInitSearchHandlerIsAddedToView", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));

		CORA.pRecordLink(dependencies, spec);
		let factoredSearchHandler = searchHandlerFactory.getFactored(0);
		let factoredSearchHandlerView = factoredSearchHandler.getView();

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let addedSearchHandlerView = pRecordLinkView.getAddedSearchHandlerView(0);

		assert.strictEqual(addedSearchHandlerView, factoredSearchHandlerView);
	});

	test("testChoiceInSearchSendsCorrectMessagesOnPubSub", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let openInfo = CORATEST.openInfoWrittenTextGroupText;
		pRecordLink.setResultFromSearch(openInfo);

		let message0 = dependencies.pubSub.getMessages()[0];
		assert.strictEqual(message0.type, "setValue");
		assert.strictEqual(message0.message.data, "writtenTextGroupText");

		let expectedPath = ["linkedRecordIdTextVar"];
		assert.stringifyEqual(message0.message.path, expectedPath);

		let messageForType = dependencies.pubSub.getMessages()[1];
		assert.strictEqual(messageForType.type, "setValue");
		assert.strictEqual(messageForType.message.data, "coraText");

		let expectedPathForType = ["linkedRecordTypeTextVar"];
		assert.stringifyEqual(messageForType.message.path, expectedPathForType);

		let message1 = dependencies.pubSub.getMessages()[2];
		assert.strictEqual(message1.type, "linkedData");

		let typeFromPRecordLinkHandlesLinkingToAbstractType = "coraText";
		let recordId = "writtenTextGroupText";
		let expectedData1 = {
			children: [{
				name: "linkedRecordType",
				value: typeFromPRecordLinkHandlesLinkingToAbstractType
			}, {
				name: "linkedRecordId",
				value: recordId
			}],
			actionLinks: {
				read: openInfo.record.actionLinks.read
			},
			name: "myLink"
		};
		assert.stringifyEqual(message1.message.data, expectedData1);

		assert.stringifyEqual(message1.message.path, spec.path);
	});

	test("testChoiceInSearchSendsCorrectLinkedDataMessagesOnPubSubWhenMetadataPointsToAbstract",
		function(assert) {
			spec.cPresentation = CORA.coraData(dependencies.metadataProvider
				.getMetadataById("myAbstractLinkNoPresentationOfLinkedRecordWithSearchPLink"));
			let pRecordLink = CORA.pRecordLink(dependencies, spec);
			let openInfo = CORATEST.openInfoFilenameTextVar;

			pRecordLink.setResultFromSearch(openInfo);

			let message1 = dependencies.pubSub.getMessages()[2];
			assert.strictEqual(message1.type, "linkedData");

			let typeFromPRecordLinkHandlesLinkingToAbstractType = "metadataTextVariable";
			let recordId = "filenameTextVar";
			let expectedData1 = {
				children: [{
					name: "linkedRecordType",
					value: typeFromPRecordLinkHandlesLinkingToAbstractType
				}, {
					name: "linkedRecordId",
					value: recordId
				}],
				actionLinks: {
					read: openInfo.record.actionLinks.read
				},
				name: "myAbstractLink"
			};
			assert.stringifyEqual(message1.message.data, expectedData1);

			assert.stringifyEqual(message1.message.path, spec.path);
		});

	test("testInitSearchHandlerNOTFactoredWhenNoSearchLinkInPRecordLink", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));

		let factoredSearchHandler = searchHandlerFactory.getFactored(0);

		assert.stringifyEqual(factoredSearchHandler, undefined);
	});

	test("testInitSearchHandlerNOTFactoredWhenNoRightToPerformSearch", function(assert) {
		spec.cPresentation = CORA
			.coraData(dependencies.metadataProvider
				.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchNoRightToPerformSearchPLink"));

		let factoredSearchHandler = searchHandlerFactory.getFactored(0);

		assert.stringifyEqual(factoredSearchHandler, undefined);
	});

	test("testInitRecordLinkWithFinalValue", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithFinalValuePLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let recordIdView = pRecordLinkView.getAddedChild(1);
		assert.strictEqual(recordIdView.className, "linkedRecordIdView");

		let recordIdTextView = recordIdView.childNodes[0];

		assert.strictEqual(recordIdTextView, dependencies.presentationFactory.getFactored(1)
			.getView());

		let factoredSpec = dependencies.presentationFactory.getSpec(1);
		assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");

		let expectedPath = ["linkedRecordIdTextVar"];
		assert.stringifyEqual(factoredSpec.path, expectedPath);
		let recordInfo = factoredSpec.cPresentation.getFirstChildByNameInData("recordInfo");
		let id = CORA.coraData(recordInfo).getFirstChildByNameInData("id");
		assert.strictEqual(id.value, "linkedRecordIdOutputPVar");
		assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
	});

	test("testInitRecordLinkWithPath", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myPathLinkNoPresentationOfLinkedRecordPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);


		let recordTypeView = pRecordLinkView.getAddedChild(0);
		assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");

		let recordTypeTextView = recordTypeView.childNodes[0];

		assert.strictEqual(recordTypeTextView, dependencies.presentationFactory.getFactored(0)
			.getView());
		let factoredSpec1 = dependencies.presentationFactory.getSpec(0);
		assert.strictEqual(factoredSpec1.metadataIdUsedInData, "linkedRecordTypeTextVar");
		assert.strictEqual(getIdFromCPresentation(factoredSpec1.cPresentation), "linkedRecordTypeOutputPVar");
		let expectedTypePath = ["linkedRecordTypeTextVar"];
		assert.stringifyEqual(factoredSpec1.path, expectedTypePath);

		let recordIdView = pRecordLinkView.getAddedChild(1);
		assert.strictEqual(recordIdView.className, "linkedRecordIdView");

		let recordIdTextView = recordIdView.childNodes[0];
		assert.strictEqual(recordIdTextView, dependencies.presentationFactory.getFactored(1)
			.getView());
		let factoredSpec = dependencies.presentationFactory.getSpec(1);
		assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");
		assert.strictEqual(getIdFromCPresentation(factoredSpec.cPresentation), "linkedRecordIdPVar");
		let expectedPath = ["linkedRecordIdTextVar"];
		assert.stringifyEqual(factoredSpec.path, expectedPath);

		let repeatIdView = pRecordLinkView.getAddedChild(2);
		assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");


		let repeatIdTextView2 = repeatIdView.childNodes[0];
		assert.strictEqual(repeatIdTextView2, dependencies.presentationFactory.getFactored(2)
			.getView());
		let factoredSpec2 = dependencies.presentationFactory.getSpec(2);
		assert.strictEqual(factoredSpec2.metadataIdUsedInData, "linkedRepeatIdTextVar");
		assert.strictEqual(getIdFromCPresentation(factoredSpec2.cPresentation), "linkedRepeatIdPVar");
		let expectedPath2 = ["linkedRepeatIdTextVar"];
		assert.stringifyEqual(factoredSpec2.path, expectedPath2);


		assert.strictEqual(pRecordLinkView.getAddedChild(3), undefined);
	});

	test("testInitRecordLinkOutput", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);


		let recordIdView = pRecordLinkView.getAddedChild(1);
		assert.strictEqual(recordIdView.className, "linkedRecordIdView");
		let recordIdTextView = recordIdView.childNodes[0];

		assert.strictEqual(recordIdTextView, dependencies.presentationFactory.getFactored(1)
			.getView());
		let factoredSpec = dependencies.presentationFactory.getSpec(1);
		assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");
		assert.strictEqual(getIdFromCPresentation(factoredSpec.cPresentation), "linkedRecordIdOutputPVar");
		let expectedPath = ["linkedRecordIdTextVar"];
		assert.stringifyEqual(factoredSpec.path, expectedPath);

		let recordTypeView = pRecordLinkView.getAddedChild(0);
		assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");
		let recordTypeTextView = recordTypeView.childNodes[0];


		assert.strictEqual(recordTypeTextView, dependencies.presentationFactory.getFactored(0)
			.getView());
		let factoredSpecForType = dependencies.presentationFactory.getSpec(0);
		assert.strictEqual(factoredSpecForType.metadataIdUsedInData, "linkedRecordTypeTextVar");
		assert.strictEqual(getIdFromCPresentation(factoredSpecForType.cPresentation), "linkedRecordTypeOutputPVar");
		let expectedPathForType = ["linkedRecordTypeTextVar"];
		assert.stringifyEqual(factoredSpecForType.path, expectedPathForType);

		assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);
	});

	test("testInitRecordLinkWithPathOutput", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myPathLinkNoPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);

		let recordTypeView = pRecordLinkView.getAddedChild(0);
		assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");

		let recordTypeTextView = recordTypeView.childNodes[0];


		assert.strictEqual(recordTypeTextView, dependencies.presentationFactory.getFactored(0)
			.getView());
		let factoredSpecRecordType = dependencies.presentationFactory.getSpec(0);
		assert.strictEqual(factoredSpecRecordType.metadataIdUsedInData, "linkedRecordTypeTextVar");
		assert.strictEqual(getIdFromCPresentation(factoredSpecRecordType.cPresentation), "linkedRecordTypeOutputPVar");
		assert.stringifyEqual(factoredSpecRecordType.path, ["linkedRecordTypeTextVar"]);

		let recordIdView = pRecordLinkView.getAddedChild(1);
		assert.strictEqual(recordIdView.className, "linkedRecordIdView");

		let recordIdTextView = recordIdView.childNodes[0];

		assert.strictEqual(recordIdTextView, dependencies.presentationFactory.getFactored(1)
			.getView());
		let factoredSpec = dependencies.presentationFactory.getSpec(1);
		assert.strictEqual(factoredSpec.metadataIdUsedInData, "linkedRecordIdTextVar");
		assert.strictEqual(getIdFromCPresentation(factoredSpec.cPresentation), "linkedRecordIdOutputPVar");
		assert.stringifyEqual(factoredSpec.path, ["linkedRecordIdTextVar"]);


		let repeatIdView = pRecordLinkView.getAddedChild(2);
		assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");


		let repeatIdTextView2 = repeatIdView.childNodes[0];
		assert.strictEqual(repeatIdTextView2, dependencies.presentationFactory.getFactored(2)
			.getView());
		let factoredSpec2 = dependencies.presentationFactory.getSpec(2);
		assert.strictEqual(factoredSpec2.metadataIdUsedInData, "linkedRepeatIdTextVar");
		assert.strictEqual(getIdFromCPresentation(factoredSpec2.cPresentation), "linkedRepeatIdOutputPVar");
		assert.stringifyEqual(factoredSpec2.path, ["linkedRepeatIdTextVar"]);


		assert.strictEqual(pRecordLinkView.getAddedChild(3), undefined);
	});

	test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroup", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		let dataFromMsg = dataFromMsgWithLink;
		pRecordLink.handleMsg(dataFromMsg, "linkedData");
		answerCall2(0);

		// FOR LINKED PRESENTATION:
		assert.strictEqual(pRecordLink.type, "pRecordLink");
		assert.deepEqual(view.className, "pRecordLinkViewSpyView");

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
		assert.strictEqual(linkedRecordView.className, "recordViewer");

		assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);
		assert.strictEqual(pRecordLinkView.getClearLinkedRecordIdMethods(0), undefined);

		assert.strictEqual(dependencies.recordGuiFactory.getSpec(0).metadataId,
			"metadataTextVariableGroup");
	});

	test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoData", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		let dataFromMsg = {
			path: ["recordInfo", "dataDivider"]
		};
		pRecordLink.handleMsg(dataFromMsg, "linkedData");

		assert.strictEqual(pRecordLink.type, "pRecordLink");
		assert.deepEqual(view.className, "pRecordLinkViewSpyView");

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
		assert.strictEqual(linkedRecordView, undefined);

		assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);
	});

	test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoActionLinks", function(
		assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		let dataFromMsg = dataFromMsgWithoutLink;
		pRecordLink.handleMsg(dataFromMsg, "linkedData");

		assert.strictEqual(pRecordLink.type, "pRecordLink");
		assert.deepEqual(view.className, "pRecordLinkViewSpyView");

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
		assert.strictEqual(linkedRecordView, undefined);

		assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);
	});

	test(
		"testInitRecordLinkOutputWithLinkedRecordPresentationsGroupWrongLinkedRecordType",
		function(assert) {
			spec.cPresentation = CORA
				.coraData(dependencies.metadataProvider
					.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType"));
			let pRecordLink = CORA.pRecordLink(dependencies, spec);
			let view = pRecordLink.getView();
			fixture.appendChild(view);

			let dataFromMsg = {
				data: {
					children: [{
						name: "linkedRecordType",
						value: "metadataTextVariable"
					}, {
						name: "linkedRecordId",
						value: "cora"
					}],
					actionLinks: {
						read: {
							requestMethod: "GET",
							rel: "read",
							url: "http://localhost:8080/therest/rest/record/system/cora",
							accept: "application/vnd.cora.record+json"
						}
					},
					name: "dataDivider"
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
							value: "dataDivider"
						}]
					}]
				}
			};
			pRecordLink.handleMsg(dataFromMsg, "linkedData");

			assert.strictEqual(pRecordLink.type, "pRecordLink");
			assert.deepEqual(view.className, "pRecordLinkViewSpyView");

			let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
			let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
			assert.strictEqual(linkedRecordView, undefined);

			assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);

		});

	test("testRecordLinkWithLinkedRecordPresentationAbstractType", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		let dataFromMsg = dataFromMsgWithLink;
		pRecordLink.handleMsg(dataFromMsg, "linkedData");
		answerCall2(0);

		// FOR LINKED PRESENATION:
		assert.strictEqual(pRecordLink.type, "pRecordLink");
		assert.deepEqual(view.className, "pRecordLinkViewSpyView");

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
		assert.strictEqual(linkedRecordView.className, "recordViewer");

		assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);
		assert.strictEqual(pRecordLinkView.getClearLinkedRecordIdMethods(0), undefined);

		assert.strictEqual(dependencies.recordGuiFactory.getSpec(0).metadataId,
			"metadataTextVariableGroup");
	});

	test("testHandleMsgWithLinkShowsOpenLinkInView", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let dataFromMsg = dataFromMsgWithLink;

		assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 0);
		assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
		pRecordLink.handleMsg(dataFromMsg, "linkedData");

		assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 1);
		assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
	});

	test("testHandleMsgWithLinkHidesOpenLinkInViewWhenFirstShown", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let dataFromMsg = dataFromMsgWithoutLink;

		assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 0);
		assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
		pRecordLink.handleMsg(dataFromMsg, "linkedData");

		assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 0);
		assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);

		pRecordLink.handleMsg(dataFromMsgWithLink, "linkedData");
		assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 1);
		assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 0);
		pRecordLink.handleMsg(dataFromMsg, "linkedData");
		assert.strictEqual(pRecordLinkView.getShowOpenLinkedRecord(), 1);
		assert.strictEqual(pRecordLinkView.getHideOpenLinkedRecord(), 1);
	});

	test("testHandleMsgWithLinkHidesSearch", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let dataFromMsg = dataFromMsgWithLink;

		assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 0);
		pRecordLink.handleMsg(dataFromMsg, "linkedData");

		assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 1);
	});

	test("testHandleMsgWithLinkButNoValueUsedInCopyAsNewShowsSearch", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithSearchPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let dataFromMsg = dataFromMsgWithLinkButNoValue;

		assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 0);
		pRecordLink.handleMsg(dataFromMsg, "linkedData");

		assert.strictEqual(pRecordLinkView.getHideSearchHandlerView(), 0);
	});

	test("testOpenLinkedRecord", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let dataFromMsg = dataFromMsgWithLink;

		pRecordLink.handleMsg(dataFromMsg, "linkedData");

		pRecordLink.openLinkedRecord({
			loadInBackground: "false"
		});

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: dataFromMsg.data.actionLinks.read,
			loadInBackground: "false"
		};
		assert.strictEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "false");

		pRecordLink.openLinkedRecord({
			loadInBackground: "true"
		});
		assert.strictEqual(jsClient.getOpenInfo(1).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "true");
	});

	test("testClearLinkedRecordId", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordInputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);

		assert.strictEqual(pRecordLinkView.getChildrenShown(), 0);

		pRecordLink.clearLinkedRecordId();

		let message0 = dependencies.pubSub.getMessages()[0];
		assert.strictEqual(message0.type, "setValue");
		assert.strictEqual(message0.message.data, "");

		let expectedPath = ["linkedRecordIdTextVar"];

		assert.stringifyEqual(message0.message.path, expectedPath);
		assert.strictEqual(pRecordLinkView.getChildrenShown(), 1);
	});

	test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroup", function(assert) {
		spec.cPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordInputPLink"));
		let pRecordLink = CORA.pRecordLink(dependencies, spec);
		let view = pRecordLink.getView();
		fixture.appendChild(view);

		let dataFromMsg = dataFromMsgWithLink;
		pRecordLink.handleMsg(dataFromMsg, "linkedData");
		answerCall2(0);

		// FOR LINKED PRESENATION:
		assert.strictEqual(pRecordLink.type, "pRecordLink");
		assert.deepEqual(view.className, "pRecordLinkViewSpyView");

		let pRecordLinkView = dependencies.pRecordLinkViewFactory.getFactored(0);
		let linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
		assert.strictEqual(linkedRecordView.className, "recordViewer");

		assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);

		assert.strictEqual(dependencies.recordGuiFactory.getSpec(0).metadataId,
			"metadataTextVariableGroup");

		assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);
		assert.strictEqual(pRecordLinkView.getClearLinkedRecordIdMethods(0),
			pRecordLink.clearLinkedRecordId);
	});

	test("testOpenTextIdRecord", function(assert) {
		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pRecordLink.openTextIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://localhost:8080/therest/rest/record/text/" + "myLink" + "Text",
				accept: "application/vnd.cora.record+json"
			},
			loadInBackground: "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event2.ctrlKey = false;
		pRecordLink.openTextIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testOpenDefTextIdRecord", function(assert) {
		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pRecordLink.openDefTextIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://localhost:8080/therest/rest/record/text/" + "myLink"
					+ "DefText",
				accept: "application/vnd.cora.record+json"
			},
			loadInBackground: "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event.ctrlKey = false;
		pRecordLink.openDefTextIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testOpenMetadataIdRecord", function(assert) {
		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pRecordLink.openMetadataIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://localhost:8080/therest/rest/record/" + "metadata/"
					+ "myLink",
				accept: "application/vnd.cora.record+json"
			},
			loadInBackground: "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event.ctrlKey = false;
		pRecordLink.openMetadataIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testOpenPresentationIdRecord", function(assert) {
		let pRecordLink = CORA.pRecordLink(dependencies, spec);

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pRecordLink.openPresentationIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://fake.from.metadataproviderstub/rest/record/sometype/"
					+ "myLinkNoPresentationOfLinkedRecordPLink",
				accept: "application/vnd.cora.record+json"
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
});