/*
 * Copyright 2017, 2023 Olov McKie
 * Copyright 2017, 2019, 2020 Uppsala University Library
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

QUnit.module.only("presentation/pParentMultipleChildrenTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let pAttributesFactory;
	let recordPartPermissionCalculator;
	let pParentMultipleChildren;
	let path;
	let pMultipleChildrenViewFactory;
	let metadataProvider;
	let child;

	let spec;

	let fixture;
	let lastInfoValueForViewMode;

	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");
		pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");
		recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();
		pParentMultipleChildren = null;
		path = [];
		pMultipleChildrenViewFactory = CORATEST.standardFactorySpy("pMultipleChildrenViewSpy");
		metadataProvider = CORATEST.MetadataProviderStub();

		dependencies = {
			clientInstanceProvider: CORATEST.clientInstanceProviderSpy(),
			metadataProvider: metadataProvider,
			pubSub: CORATEST.pubSubSpy(),
			//			textProvider: CORATEST.textProviderStub(),
			textProvider: CORATEST.textProviderSpy(),
			presentationFactory: CORATEST.standardFactorySpy("presentationSpy"),
			pAttributesFactory: pAttributesFactory,
			jsBookkeeper: CORATEST.jsBookkeeperSpy(),
			recordTypeProvider: CORATEST.recordTypeProviderStub(),
			pChildRefHandlerFactory: CORATEST.standardFactorySpy("pChildRefHandlerSpy"),
			pNonRepeatingChildRefHandlerFactory: CORATEST
				.standardFactorySpy("pNonRepeatingChildRefHandlerSpy"),
			pMultipleChildrenViewFactory: pMultipleChildrenViewFactory
		};

		spec = {
			metadataIdUsedInData: "groupIdOneTextChildRepeat1to3",
			path: path,
			cPresentation: CORA.coraData(dependencies.metadataProvider
				.getMetadataById("pgGroupIdOneTextChildMinimized")),
			// used in surroundingContainer
			cParentPresentation: CORA.coraData(dependencies.metadataProvider
				.getMetadataById("pgGroupIdOneTextChildMinimized")),
			recordPartPermissionCalculator: recordPartPermissionCalculator,
			presentationCounter: "somePresentationCounter"
		};

		child = {
			type: "someChildType",
			metadataId: spec.metadataIdUsedInData,
			addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec
		};

	});

	hooks.afterEach(() => { });

	const addTypeSpecificInfoToViewSpec = function(mode, pVarViewSpec) {
		lastInfoValueForViewMode = mode;
		pVarViewSpec.childExtra = "added by child";
	};

	const getId = function(cData) {
		let recordInfo = cData.getFirstChildByNameInData("recordInfo");
		let id = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		return id;
	}
	const getMetadataAsCoraData = function(metadataId) {
		return CORA.coraData(dependencies.metadataProvider.getMetadataById(metadataId));
	};
	const setMyMetadataId = function(metadataId) {
		child.metadataId = metadataId;
	};
	const setSpecCPresentation = function(metadataId) {
		spec.cPresentation = getMetadataAsCoraData(metadataId);
	};
	const setSpecCParentPresentation = function(metadataId) {
		spec.cParentPresentation = getMetadataAsCoraData(metadataId);
	};
	const createAndInitPMultipleChildren = function() {
		pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec,
			child);
		return pParentMultipleChildren;
	}
	const assertNoOfChildrenAddedToView = function(assert, no) {
		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.strictEqual(viewSpy.getNoOfAppendedChildren(), no);
	};

	test("testInit", function(assert) {
		let pParentMultipleChildren = createAndInitPMultipleChildren();

		assert.strictEqual(pParentMultipleChildren.type, "pParentMultipleChildren");
	});

	test("testGetView", function(assert) {
		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let spyView = pMultipleChildrenViewFactory.getFactored(0);
		assert.strictEqual(pParentMultipleChildren.getView(), spyView.getView());
	});

	test("testFactoredViewCorrectlyForInputVariable", function(assert) {
		spec.path = ["one", "two"];

		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.deepEqual(viewSpy.type, "pMultipleChildrenViewSpy");

		let expectedViewSpec = {
			className: "someChildType pgGroupIdOneTextChildMinimized",
			headline: "translated_groupIdOneTextChildRepeat1to3Text",
			headlineLevel: "h2",
			id: "onetwo",
			info: {
				defText: "translated_groupIdOneTextChildRepeat1to3DefText",
				text: "translated_groupIdOneTextChildRepeat1to3Text",
				technicalInfo: [
				]
			},
			mode: "input",
			presentationId: "pgGroupIdOneTextChildMinimized"
		}
		expectedViewSpec.childExtra = "added by child";
		expectedViewSpec.info.technicalInfo.push(
			{
				text: "textId: groupIdOneTextChildRepeat1to3Text",
				onclickMethod: pParentMultipleChildren.openTextIdRecord
			}, {
			text: "defTextId: groupIdOneTextChildRepeat1to3DefText",
			onclickMethod: pParentMultipleChildren.openDefTextIdRecord
		}, {
			text: "metadataId: groupIdOneTextChildRepeat1to3",
			onclickMethod: pParentMultipleChildren.openMetadataIdRecord
		}, {
			text: "nameInData: groupIdOneTextChildRepeat1to3"
		}, {
			text: "presentationId: pgGroupIdOneTextChildMinimized",
			onclickMethod: pParentMultipleChildren.openPresentationIdRecord
		});
		let viewSpec = pMultipleChildrenViewFactory.getSpec(0);
		assert.deepEqual(viewSpec, expectedViewSpec);
	});

	test("testFactoredViewCorrectly_ForPresentationStyle", function(assert) {
		spec.path = ["one", "two"];
		setSpecCPresentation("pTextVariablePlus2StyleSContainer");
		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);

		assert.strictEqual(viewSpy.getSpec().className, "someChildType withStyle "
			+ "pTextVariablePlus2StyleSContainer");
	});

	test("testOpenTextIdRecord", function(assert) {
		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pParentMultipleChildren.openTextIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			"readLink": {
				"requestMethod": "GET",
				"rel": "read",
				"url": "http://localhost:8080/therest/rest/record/text/" + "groupIdOneTextChildRepeat1to3"
					+ "Text",
				"accept": "application/vnd.cora.record+json"
			},
			"loadInBackground": "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event2.ctrlKey = false;
		pParentMultipleChildren.openTextIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testOpenDefTextIdRecord", function(assert) {
		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pParentMultipleChildren.openDefTextIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			"readLink": {
				"requestMethod": "GET",
				"rel": "read",
				"url": "http://localhost:8080/therest/rest/record/text/" + "groupIdOneTextChildRepeat1to3"
					+ "DefText",
				"accept": "application/vnd.cora.record+json"
			},
			"loadInBackground": "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event2.ctrlKey = false;
		pParentMultipleChildren.openDefTextIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testOpenMetadataIdRecord", function(assert) {
		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pParentMultipleChildren.openMetadataIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			"readLink": {
				"requestMethod": "GET",
				"rel": "read",
				"url": "http://fake.from.metadataproviderstub/rest/record/sometype/groupIdOneTextChildRepeat1to3",
				"accept": "application/vnd.cora.record+json"
			},
			"loadInBackground": "false"
		};

		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event2.ctrlKey = false;
		pParentMultipleChildren.openMetadataIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testOpenPresentationIdRecord", function(assert) {
		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let event = document.createEvent('Event');
		event.ctrlKey = true;
		pParentMultipleChildren.openPresentationIdRecord(event);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://fake.from.metadataproviderstub/rest/record/sometype/"
					+ "pgGroupIdOneTextChildMinimized",
				accept: "application/vnd.cora.record+json"
			},
			loadInBackground: "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event2.ctrlKey = false;
		pParentMultipleChildren.openMetadataIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testOpenLinkedRecordForLink", function(assert) {
		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let event = document.createEvent('Event');
		let link = {
			requestMethod: "GET",
			rel: "read",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/"
				+ "pgGroupIdOneTextChildMinimized",
			accept: "application/vnd.cora.record+json"
		};
		event.ctrlKey = true;
		pParentMultipleChildren.openLinkedRecordForLink(event, link);

		let jsClient = dependencies.clientInstanceProvider.getJsClient();
		let expectedOpenInfo = {
			readLink: {
				requestMethod: "GET",
				rel: "read",
				url: "http://fake.from.metadataproviderstub/rest/record/sometype/"
					+ "pgGroupIdOneTextChildMinimized",
				accept: "application/vnd.cora.record+json"
			},
			loadInBackground: "false"
		};
		assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
		assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

		let event2 = document.createEvent('Event');
		event2.ctrlKey = false;
		pParentMultipleChildren.openMetadataIdRecord(event2);
		assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
	});

	test("testFirstPChildRefHandlerSpec", function(assert) {
		let pParentMultipleChildren = createAndInitPMultipleChildren();
		let view = pParentMultipleChildren.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);


		assert.strictEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(getId(factoredSpec.cParentMetadata),
			"groupIdOneTextChildRepeat1to3");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableId");
		assert.strictEqual(getId(factoredSpec.cParentPresentation),
			"pgGroupIdOneTextChildMinimized");
		assert.strictEqual(getId(factoredSpec.cAlternativePresentation),
			"pVarTextVariableIdOutput");
		assert.strictEqual(factoredSpec.minimizedDefault, undefined);

		assert.strictEqual(factoredSpec.textStyle, "h1TextStyle");
		assert.strictEqual(factoredSpec.childStyle, "oneChildStyle");
		assert.strictEqual(factoredSpec.clickableHeadlineText, "translated_someHeadlineIdText");
		assert.strictEqual(factoredSpec.clickableHeadlineLevel, "h3");
		assert.strictEqual(factoredSpec.mode, "input");
		assert.strictEqual(factoredSpec.hasWritePermissionsForRecordPart, true);
		assert.strictEqual(factoredSpec.recordPartPermissionCalculator, recordPartPermissionCalculator)

		assert.strictEqual(factoredSpec.parentPresentationCounter, spec.presentationCounter)
	});

	test("testFirstMinimizedDefaultPChildRefHandlerSpec", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefault");
		let pParentMultipleChildren = createAndInitPMultipleChildren();
		let view = pParentMultipleChildren.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupIdOneTextChildRepeat1to3");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
		assert.strictEqual(getId(factoredSpec.cParentPresentation),
			"pgGroupIdOneTextChildMinimized");
		assert.strictEqual(getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");

		assert.strictEqual(factoredSpec.textStyle, "h5TextStyle");
		assert.strictEqual(factoredSpec.childStyle, "twoChildStyle");
		assert.strictEqual(factoredSpec.mode, "input");
		assert.strictEqual(factoredSpec.parentPresentationCounter, spec.presentationCounter)
	});

	test("testpgGroupIdOneTextChildHeadlineFirstSmallerPChildRefHandlerSpec", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextChildHeadlineFirstSmaller");
		let pParentMultipleChildren = createAndInitPMultipleChildren();
		let view = pParentMultipleChildren.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupIdOneTextChildRepeat1to3");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableId");
		assert.strictEqual(getId(factoredSpec.cParentPresentation),
			"pgGroupIdOneTextChildMinimized");

		assert.strictEqual(factoredSpec.textStyle, "h1TextStyle");
		assert.strictEqual(factoredSpec.childStyle, "oneChildStyle");
		assert.strictEqual(factoredSpec.mode, "input");
		assert.strictEqual(factoredSpec.presentationSize, "firstLarger");
	});

	test("testFirstPChildRefHandlerSpecNoStyleInfo", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfo");
		let pParentMultipleChildren = createAndInitPMultipleChildren();
		let view = pParentMultipleChildren.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupIdOneTextChildRepeat1to3");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
		assert.strictEqual(getId(factoredSpec.cParentPresentation),
			"pgGroupIdOneTextChildMinimized");
		assert.strictEqual(getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");

		assert.strictEqual(factoredSpec.textStyle, undefined);
		assert.strictEqual(factoredSpec.childStyle, undefined);
		assert.strictEqual(factoredSpec.minNumberOfRepeatingToShow, undefined);
		assert.strictEqual(factoredSpec.mode, "input");
		assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
	});

	test("testPGroupChildRefHandlerSpecPresentationSizeFirstSmaller", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextChildNoOptionalRefInfo");

		createAndInitPMultipleChildren();

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
	});

	test("testFirstPChildRefHandlerSpecNoStyleInfoMinNumberOfRepeatingToShow", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfoMinNumberOfRepeatingToShow");
		let pParentMultipleChildren = createAndInitPMultipleChildren();
		let view = pParentMultipleChildren.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(getId(factoredSpec.cParentMetadata),
			"groupIdOneTextChildRepeat1to3");
		assert.strictEqual(getId(factoredSpec.cPresentation),
			"pVarTextVariableIdOutput");
		assert.strictEqual(getId(factoredSpec.cParentPresentation),
			"pgGroupIdOneTextChildMinimized");
		assert.strictEqual(getId(factoredSpec.cAlternativePresentation),
			"pVarTextVariableId");

		assert.strictEqual(factoredSpec.textStyle, undefined);
		assert.strictEqual(factoredSpec.childStyle, undefined);
		assert.strictEqual(factoredSpec.clickableHeadlineText, undefined);
		assert.strictEqual(factoredSpec.clickableHeadlineLevel, undefined);

		assert.strictEqual(factoredSpec.mode, "input");

		assert.strictEqual(factoredSpec.minNumberOfRepeatingToShow, "1");
	});

	test("pgGroupIdOneTextChildMinimizedDefaultModeInput", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultModeInput");
		let pParentMultipleChildren = createAndInitPMultipleChildren();
		let view = pParentMultipleChildren.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.mode, "input");
	});

	test("pgGroupIdOneTextChildMinimizedDefaultModeOutput", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultModeOutput");
		let pParentMultipleChildren = createAndInitPMultipleChildren();
		let view = pParentMultipleChildren.getView();
		fixture.appendChild(view);

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.mode, "output");
	});

	test("testText", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextOneTextChildTwoAttributes");
		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0).className, "text h2TextStyle fourChildStyle");
	});

	test("testTextNoTextStyle", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextOneTextChildTwoAttributesNoTextStyle");
		let pParentMultipleChildren = createAndInitPMultipleChildren();
		let view = pParentMultipleChildren.getView();
		fixture.appendChild(view);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0).className, "text");
	});

	test("testPNonRepeatingChildRefHandlerSpec", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("groupWithSContainerPGroup");
		setSpecCParentPresentation("groupWithSContainerPGroup");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let factoredSpec = dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);

		assert.strictEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(factoredSpec.parentMetadataId, "groupIdTwoTextChildRepeat1to5");
		assert.strictEqual(factoredSpec.mode, "input");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pTextVariablePlus2SContainer");
		assert.strictEqual(getId(factoredSpec.cParentPresentation), "groupWithSContainerPGroup");
		assert.strictEqual(factoredSpec.cAlternativePresentation, undefined);
		assert.strictEqual(factoredSpec.recordPartPermissionCalculator, spec.recordPartPermissionCalculator);

		let factored = dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0)
		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());
		assert.strictEqual(factoredSpec.textStyle, "h2TextStyle");
		assert.strictEqual(factoredSpec.childStyle, "fourChildStyle");
		assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
	});

	test("testPNonRepeatingChildRefHandlerSpecFirstSmaller", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("groupWithSContainerAndAlternativeSContainerPGroup");
		setSpecCParentPresentation("groupWithSContainerAndAlternativeSContainerPGroup");

		createAndInitPMultipleChildren();

		let factoredSpec = dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
	});

	test("testPNonRepeatingChildRefHandlerSpecWithMinimized", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("groupWithSContainerAndAlternativeSContainerPGroup");
		setSpecCParentPresentation("groupWithSContainerAndAlternativeSContainerPGroup");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let factoredSpec = dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);

		assert.strictEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(factoredSpec.parentMetadataId, "groupIdTwoTextChildRepeat1to5");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pTextVariablePlus2SContainer");
		assert.strictEqual(getId(factoredSpec.cAlternativePresentation),
			"pTextVariablePlus2SContainer2");
		assert.strictEqual(getId(factoredSpec.cParentPresentation),
			"groupWithSContainerAndAlternativeSContainerPGroup");

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		let factored = dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());
	});

	test("testGuiElementLink", function(assert) {
		dependencies.metadataProvider = new MetadataProviderStubGuiElement();
		spec.metadataIdUsedInData = "groupIdOneTextChild";
		child.metadataId = "groupIdOneTextChild";
		setSpecCPresentation("pgGroupIdOneGuiElementLinkChild");

		child.cParentPresentation = CORA.coraData(dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextChildMinimized"))

		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		let firstAddedChild = viewSpy.getAppendedChild(0);
		assert.strictEqual(firstAddedChild.className, "guiElement");
		assert.strictEqual(firstAddedChild.nodeName, "A");
		assert.strictEqual(firstAddedChild.text, "translated_someTextToPresentAsLinkText");
		assert.strictEqual(firstAddedChild.href, "http://www.google.se/");
	});

	test("testFirstPChildRefHandlerSpecNoAddButtonText", function(assert) {
		setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfo");
		createAndInitPMultipleChildren();

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
		assert.strictEqual(getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");

		assert.strictEqual(factoredSpec.addText, undefined);
	});

	test("testFirstPChildRefHandlerSpecWithAddButtonText", function(assert) {
		setSpecCPresentation("pgGroupIdTwoTextChild");

		createAndInitPMultipleChildren();

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableId");

		assert.strictEqual(factoredSpec.addText, "someTextIdForAddText");
	});

	test("testSurroundingContainerPermissionCalculatorCalledUntilOneIsFoundTrueNoneIsOk", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("groupWithSContainerPGroup");
		setSpecCParentPresentation("groupWithSContainerPGroup");
		recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");
		recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

		createAndInitPMultipleChildren();

		assert.strictEqual(recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
		assert.strictEqual(recordPartPermissionCalculator.getReadRequestedId(1), "metadataTextVariable_textVariableId2");
		assertNoOfChildrenAddedToView(assert, 0);
	});

	test("testSurroundingContainerPermissionCalculatorCalledUntilOneIsFoundTrueFirstIsOk", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("groupWithSContainerPGroup");
		setSpecCParentPresentation("groupWithSContainerPGroup");
		recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

		createAndInitPMultipleChildren();

		assert.strictEqual(recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
		assert.strictEqual(recordPartPermissionCalculator.getReadRequestedId(1), undefined);
		assertNoOfChildrenAddedToView(assert, 1);
	});

	test("testSurroundingContainerPermissionCalculatorCalledUntilOneIsFoundTrueSecondIsOk", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("groupWithSContainerPGroup");
		setSpecCParentPresentation("groupWithSContainerPGroup");
		recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");

		createAndInitPMultipleChildren();

		assert.strictEqual(recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
		assert.strictEqual(recordPartPermissionCalculator.getReadRequestedId(1), "metadataTextVariable_textVariableId2");
		assertNoOfChildrenAddedToView(assert, 1);
	});

	test("testSurroundingContainerPermissionWhenTwoChildrenOk", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("groupWithSContainerPGroup");
		setSpecCParentPresentation("groupWithSContainerPGroup");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		let factored = dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());

		let factored2 = dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(1);
		assert.strictEqual(factored2, undefined);

		let factoredSpec = dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);

		assert.strictEqual(factoredSpec.textStyle, "h2TextStyle");
		assert.strictEqual(factoredSpec.childStyle, "fourChildStyle");
		assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
	});

	test("testSurroundingContainerPermissionWhenOneChildOkOneNotOk", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("groupWithSContainerPGroup");
		setSpecCParentPresentation("groupWithSContainerPGroup");

		recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		let factored = dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());
		let factored2 = dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(1);
		assert.strictEqual(factored2, undefined);
	});

	test("testFirstPChildRefHandlerNotCalledWhenNoReadPermission", function(assert) {
		recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");
		recordPartPermissionCalculator.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");

		createAndInitPMultipleChildren();

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec, undefined);
		assertNoOfChildrenAddedToView(assert, 0);
	});

	test("testFirstPChildRefHandlerSpecWhenNoWritePermission", function(assert) {
		recordPartPermissionCalculator.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");

		createAndInitPMultipleChildren();

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupIdOneTextChildRepeat1to3");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableId");
		assert.strictEqual(getId(factoredSpec.cParentPresentation),
			"pgGroupIdOneTextChildMinimized");
		assert.strictEqual(getId(factoredSpec.cAlternativePresentation),
			"pVarTextVariableIdOutput");
		assert.strictEqual(factoredSpec.minimizedDefault, undefined);

		assert.strictEqual(factoredSpec.textStyle, "h1TextStyle");
		assert.strictEqual(factoredSpec.childStyle, "oneChildStyle");
		assert.strictEqual(factoredSpec.mode, "input");
		assert.strictEqual(factoredSpec.hasWritePermissionsForRecordPart, false);
		assertNoOfChildrenAddedToView(assert, 1);
	});

	test("testFirstPChildRefHandlerSpecWhenNoConstraints", function(assert) {
		spec.recordPartPermissionCalculator = undefined;
		createAndInitPMultipleChildren();

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.strictEqual(factoredSpec.hasWritePermissionsForRecordPart, true);
	});

	test("testFactoredPAttributes", function(assert) {
		setMyMetadataId("groupIdOneTextChildOneAttribute");
		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		let attributesSpec = pAttributesFactory.getSpec(0);
		assert.strictEqual(attributesSpec.addViewToParent, viewSpy.addAttributesView);
		assert.strictEqual(attributesSpec.path, spec.path);
		assert.strictEqual(attributesSpec.mode, "input");
		assert.strictEqual(attributesSpec.toShow, "all");
	});

	test("testFactoredPAttributesNotFactoredIfNoAttributes", function(assert) {
		let pParentMultipleChildren = createAndInitPMultipleChildren();

		assert.strictEqual(pAttributesFactory.getNoOfFactored(), 0);
	});

	test("testFactoredPAttributes_attributesToShow_sentOnToAttributesFactory", function(assert) {
		setMyMetadataId("groupIdOneTextChildOneAttribute");
		let attributesToShow = {
			name: "attributesToShow",
			value: "selectable"
		};
		spec.cPresentation.getData().children.push(attributesToShow);
		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let attributesSpec = pAttributesFactory.getSpec(0);
		assert.strictEqual(attributesSpec.toShow, "selectable");
	});

	test("testSurroundingNoAttributes", function(assert) {
		child.type = "pSurroundingContainer";

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let attributesSpec = pAttributesFactory.getSpec(0);

		assert.strictEqual(attributesSpec, undefined);
	});

	test("testInitOneChild", function(assert) {
		setMyMetadataId("groupIdOneTextChild");
		setSpecCPresentation("pgGroupIdOneTextChild");

		let pParentMultipleChildren = createAndInitPMultipleChildren();
		let view = pParentMultipleChildren.getView();
		assertNoOfChildrenAddedToView(assert, 1);
		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		let factored = dependencies.pChildRefHandlerFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.deepEqual(factoredSpec.parentPath, spec.path);

		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupIdOneTextChild");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableId");
	});


	test("testInitOneTextOneChild", function(assert) {
		setMyMetadataId("groupIdOneTextChild");
		setSpecCPresentation("pgGroupIdOneTextOneTextChild");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let view = pParentMultipleChildren.getView();
		assertNoOfChildrenAddedToView(assert, 2);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0).textContent, "translated_aHeadlineText");

		let factored = dependencies.pChildRefHandlerFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(1), factored.getView());

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.deepEqual(factoredSpec.parentPath, spec.path);

		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupIdOneTextChild");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableId");
	});

	test("testInitOneCollectionChild", function(assert) {
		setMyMetadataId("groupWithOneCollectionVarChildGroup");
		setSpecCPresentation("groupWithOneCollectionVarChildPGroup");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let view = pParentMultipleChildren.getView();
		assertNoOfChildrenAddedToView(assert, 2);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0).textContent, "translated_aHeadlineText");

		let factored = dependencies.pChildRefHandlerFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(1), factored.getView());

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.deepEqual(factoredSpec.parentPath, spec.path);

		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupWithOneCollectionVarChildGroup");
		assert.strictEqual(getId(factoredSpec.cPresentation), "userSuppliedIdCollectionVarPCollVar");
	});

	test("testInitTwoChildren", function(assert) {
		setMyMetadataId("groupIdTwoTextChild");
		setSpecCPresentation("pgGroupIdTwoTextChild");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		let view = pParentMultipleChildren.getView();
		assertNoOfChildrenAddedToView(assert, 2);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);

		let factored = dependencies.pChildRefHandlerFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());
		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.deepEqual(factoredSpec.parentPath, spec.path);
		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupIdTwoTextChild");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableId");

		let factored1 = dependencies.pChildRefHandlerFactory.getFactored(1);
		assert.strictEqual(viewSpy.getAppendedChild(1), factored1.getView());

		let factoredSpec1 = dependencies.pChildRefHandlerFactory.getSpec(1);
		assert.deepEqual(factoredSpec1.parentPath, spec.path);

		assert.strictEqual(getId(factoredSpec1.cParentMetadata), "groupIdTwoTextChild");
		assert.strictEqual(getId(factoredSpec1.cPresentation), "pVarTextVariableId2");

	});

	test("testInitOneChildMinimized", function(assert) {
		setMyMetadataId("groupIdOneTextChildRepeat1to3");
		setSpecCPresentation("pgGroupIdOneTextChildMinimized");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		assertNoOfChildrenAddedToView(assert, 1);

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.deepEqual(factoredSpec.parentPath, spec.path);

		assert.strictEqual(getId(factoredSpec.cParentMetadata),
			"groupIdOneTextChildRepeat1to3");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableId");
		assert.strictEqual(getId(factoredSpec.cParentPresentation),
			"pgGroupIdOneTextChildMinimized");
		assert.strictEqual(getId(factoredSpec.cAlternativePresentation),
			"pVarTextVariableIdOutput");
		assert.strictEqual(factoredSpec.minimizedDefault, undefined);
	});

	test("testInitOneChildMinimizedDefault", function(assert) {
		setMyMetadataId("groupIdOneTextChild");
		setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefault");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		assertNoOfChildrenAddedToView(assert, 1);


		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.deepEqual(factoredSpec.parentPath, spec.path);

		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupIdOneTextChild");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
		assert.strictEqual(getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");
	});

	test("testInit", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("pTextVariablePlus2SContainer");
		setSpecCParentPresentation("pgGroupIdTwoTextChildSurrounding2TextPGroup");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		assertNoOfChildrenAddedToView(assert, 3);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0).textContent, "translated_aHeadlineText");

		let factored = dependencies.pChildRefHandlerFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(1), factored.getView());

		let factoredSpec = dependencies.pChildRefHandlerFactory.getSpec(0);
		assert.deepEqual(factoredSpec.parentPath, spec.path);

		assert.strictEqual(getId(factoredSpec.cParentMetadata), "groupIdTwoTextChildRepeat1to5");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pVarTextVariableId");
		assert.strictEqual(getId(factoredSpec.cParentPresentation), "pgGroupIdTwoTextChildSurrounding2TextPGroup");
		assert.strictEqual(factoredSpec.minimizedDefault, undefined);
	});

	test("testNestedSurroundingContainer", function(assert) {
		setMyMetadataId("groupIdTwoTextChildRepeat1to5");
		setSpecCPresentation("pTextVariablePlus2SContainer2");
		setSpecCParentPresentation("pgGroupIdTwoTextChildSurrounding2TextPGroup2");

		let pParentMultipleChildren = createAndInitPMultipleChildren();

		assertNoOfChildrenAddedToView(assert, 2);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(0).textContent, "translated_aHeadlineText");

		let factored = dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
		assert.strictEqual(viewSpy.getAppendedChild(1), factored.getView());

		let factoredSpec = dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);
		assert.deepEqual(factoredSpec.parentPath, spec.path);

		assert.strictEqual(factoredSpec.parentMetadataId, "groupIdTwoTextChildRepeat1to5");
		assert.strictEqual(getId(factoredSpec.cPresentation), "pTextVariablePlus2SContainer");
		assert.strictEqual(getId(factoredSpec.cParentPresentation), "pgGroupIdTwoTextChildSurrounding2TextPGroup2");
		assert.strictEqual(factoredSpec.minimizedDefault, undefined);
	});

	test("testGetInfoShowsMetadataIdUsedInDataIsUsedAndNotPresentationOf", function(assert) {
		spec.path = ["one", "two"];
		setMyMetadataId("groupIdOneTextChild2");
		setSpecCPresentation("pgGroupIdOneTextChild");
		let pParentMultipleChildren = CORA.pParentMultipleChildren(dependencies, spec, child);

		let viewSpy = pMultipleChildrenViewFactory.getFactored(0);
		assert.deepEqual(viewSpy.type, "pMultipleChildrenViewSpy");

		let expectedViewSpec = {
			className: "someChildType pgGroupIdOneTextChild",
			headline: "translated_specifiedHeadlineText",
			headlineLevel: "h3",
			id: "onetwo",
			info: {
				defText: "translated_groupIdOneTextChild2DefText",
				text: "translated_groupIdOneTextChild2Text",
				technicalInfo: [
				]
			},
			mode: "input",
			presentationId: "pgGroupIdOneTextChild"
		}
		expectedViewSpec.childExtra = "added by child";
		expectedViewSpec.info.technicalInfo.push(
			{
				text: "textId: groupIdOneTextChild2Text",
				onclickMethod: pParentMultipleChildren.openTextIdRecord
			}, {
			text: "defTextId: groupIdOneTextChild2DefText",
			onclickMethod: pParentMultipleChildren.openDefTextIdRecord
		}, {
			text: "metadataId: groupIdOneTextChild2",
			onclickMethod: pParentMultipleChildren.openMetadataIdRecord
		}, {
			text: "nameInData: groupIdOneTextChild"
		}, {
			text: "presentationId: pgGroupIdOneTextChild",
			onclickMethod: pParentMultipleChildren.openPresentationIdRecord
		});
		let viewSpec = pMultipleChildrenViewFactory.getSpec(0);
		assert.deepEqual(viewSpec, expectedViewSpec);
	});

	test("testGetPresentationCounter", function(assert) {
		let pParentMultipleChildren = createAndInitPMultipleChildren();

		assert.strictEqual(pParentMultipleChildren.getPresentationCounter(), spec.presentationCounter);
	});

});
