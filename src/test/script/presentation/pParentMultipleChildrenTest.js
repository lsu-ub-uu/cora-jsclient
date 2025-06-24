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

QUnit.module("presentation/pParentMultipleChildrenTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");
		this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();
		this.standardNoOfChildren = 1;
		this.pParentMultipleChildren = null;
		this.path = [];
		this.pMultipleChildrenViewFactory = CORATEST.standardFactorySpy("pMultipleChildrenViewSpy");
		this.metadataProvider = CORATEST.MetadataProviderStub();

		this.dependencies = {
			clientInstanceProvider: CORATEST.clientInstanceProviderSpy(),
			metadataProvider: this.metadataProvider,
			pubSub: CORATEST.pubSubSpy(),
			textProvider: CORATEST.textProviderStub(),
			textProvider: CORATEST.textProviderSpy(),
			presentationFactory: CORATEST.standardFactorySpy("presentationSpy"),
			pAttributesFactory: this.pAttributesFactory,
			jsBookkeeper: CORATEST.jsBookkeeperSpy(),
			recordTypeProvider: CORATEST.recordTypeProviderStub(),
			pChildRefHandlerFactory: CORATEST.standardFactorySpy("pChildRefHandlerSpy"),
			pNonRepeatingChildRefHandlerFactory: CORATEST
				.standardFactorySpy("pNonRepeatingChildRefHandlerSpy"),
			pMultipleChildrenViewFactory: this.pMultipleChildrenViewFactory
		};

		this.spec = {
			metadataIdUsedInData: "groupIdOneTextChildRepeat1to3",
			path: this.path,
			cPresentation: CORA.coraData(this.dependencies.metadataProvider
				.getMetadataById("pgGroupIdOneTextChildMinimized")),
			// used in surroundingContainer
			cParentPresentation: CORA.coraData(this.dependencies.metadataProvider
				.getMetadataById("pgGroupIdOneTextChildMinimized")),
			recordPartPermissionCalculator: this.recordPartPermissionCalculator
		};

		this.getId = function(cData) {
			let recordInfo = cData.getFirstChildByNameInData("recordInfo");
			let id = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			return id;
		}

		let lastInfoValueForViewMode = "";
		const addTypeSpecificInfoToViewSpec = function(mode, pVarViewSpec) {
			lastInfoValueForViewMode = mode;
			pVarViewSpec.childExtra = "added by child";
		};

		this.child = {
			type: "someChildType",
			metadataId: this.spec.metadataIdUsedInData,
			addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec
		};

		this.getMetadataAsCoraData = function(metadataId) {
			return CORA.coraData(this.dependencies.metadataProvider.getMetadataById(metadataId));
		};
		this.setMyMetadataId = function(metadataId) {
			this.child.metadataId = metadataId;
		};
		this.setSpecCPresentation = function(metadataId) {
			this.spec.cPresentation = this.getMetadataAsCoraData(metadataId);
		};
		this.setSpecCParentPresentation = function(metadataId) {
			this.spec.cParentPresentation = this.getMetadataAsCoraData(metadataId);
		};
		this.createAndInitPMultipleChildren = function() {
			this.pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec,
				this.child);
			return this.pParentMultipleChildren;
		}
		this.assertNoOfChildrenAddedToView = function(assert, no) {
			let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
			assert.strictEqual(viewSpy.getNoOfAppendedChildren(), no);
		};

	}
});

QUnit.test("testInit", function(assert) {
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	assert.strictEqual(pParentMultipleChildren.type, "pParentMultipleChildren");
});


QUnit.test("testGetView", function(assert) {
	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, this.child);

	let spyView = this.pMultipleChildrenViewFactory.getFactored(0);
	assert.strictEqual(pParentMultipleChildren.getView(), spyView.getView());
});



QUnit.test("testFactoredViewCorrectlyForInputVariable", function(assert) {
	this.spec.path = ["one", "two"];

	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, this.child);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
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
	let viewSpec = this.pMultipleChildrenViewFactory.getSpec(0);
	assert.deepEqual(viewSpec, expectedViewSpec);
});

QUnit.test("testFactoredViewCorrectly_ForPresentationStyle", function(assert) {
	this.spec.path = ["one", "two"];
	this.setSpecCPresentation("pTextVariablePlus2StyleSContainer");
	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, this.child);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);

	assert.strictEqual(viewSpy.getSpec().className, "someChildType withStyle "
		+ "pTextVariablePlus2StyleSContainer");
});


QUnit.test("testOpenTextIdRecord", function(assert) {
	let child = this.child;
	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentMultipleChildren.openTextIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
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

QUnit.test("testOpenDefTextIdRecord", function(assert) {
	let child = this.child;
	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentMultipleChildren.openDefTextIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
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

QUnit.test("testOpenMetadataIdRecord", function(assert) {
	let child = this.child;
	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentMultipleChildren.openMetadataIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
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

QUnit.test("testOpenPresentationIdRecord", function(assert) {
	let child = this.child;
	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentMultipleChildren.openPresentationIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
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

QUnit.test("testOpenLinkedRecordForLink", function(assert) {
	let child = this.child;
	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

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

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
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





//QUnit.test("testFactoredViewCorrectlyForInputTextVariableShowLabelFalse", function(assert) {
//	this.spec.path = ["one", "two"];
//	this.spec.cPresentation = CORA.coraData(this.metadataProvider
//				.getMetadataById("pVarTextVariableIdShowLabelFalse"))
//	
//	CORA.pParentMultipleChildren(this.dependencies, this.spec, this.createChildSpy());
//
//	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
//	assert.strictEqual(pVarViewSpy.getSpec().label, undefined);
//});
//
//QUnit.test("testFactoredViewCorrectlyForInputTextVariableSpecifiedLabelText", function(assert) {
//	this.spec.path = ["one", "two"];
//	this.spec.cPresentation = CORA.coraData(this.metadataProvider
//				.getMetadataById("pVarTextVariableIdSpecifiedLabelText"))
//	
//	CORA.pParentMultipleChildren(this.dependencies, this.spec, this.createChildSpy());
//
//	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
//	assert.strictEqual(pVarViewSpy.getSpec().label, "specifiedLabelText_text");
//});
//


QUnit.test("testFirstPChildRefHandlerSpec", function(assert) {
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(this.getId(factoredSpec.cParentMetadata),
		"groupIdOneTextChildRepeat1to3");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
		"pgGroupIdOneTextChildMinimized");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation),
		"pVarTextVariableIdOutput");
	assert.strictEqual(factoredSpec.minimizedDefault, undefined);

	assert.strictEqual(factoredSpec.textStyle, "h1TextStyle");
	assert.strictEqual(factoredSpec.childStyle, "oneChildStyle");
	assert.strictEqual(factoredSpec.clickableHeadlineText, "translated_someHeadlineIdText");
	assert.strictEqual(factoredSpec.clickableHeadlineLevel, "h3");
	assert.strictEqual(factoredSpec.mode, "input");
	assert.strictEqual(factoredSpec.hasWritePermissionsForRecordPart, true);
	assert.strictEqual(factoredSpec.recordPartPermissionCalculator, this.recordPartPermissionCalculator)
});

QUnit.test("testFirstMinimizedDefaultPChildRefHandlerSpec", function(assert) {
	this.setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefault");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdOneTextChildRepeat1to3");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
		"pgGroupIdOneTextChildMinimized");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");

	assert.strictEqual(factoredSpec.textStyle, "h5TextStyle");
	assert.strictEqual(factoredSpec.childStyle, "twoChildStyle");
	assert.strictEqual(factoredSpec.mode, "input");
});

QUnit.test("testFirstPChildRefHandlerSpecNoStyleInfo", function(assert) {
	this.setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfo");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdOneTextChildRepeat1to3");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
		"pgGroupIdOneTextChildMinimized");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");

	assert.strictEqual(factoredSpec.textStyle, undefined);
	assert.strictEqual(factoredSpec.childStyle, undefined);
	assert.strictEqual(factoredSpec.minNumberOfRepeatingToShow, undefined);
	assert.strictEqual(factoredSpec.mode, "input");
	assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
});

QUnit.test("testPGroupChildRefHandlerSpecPresentationSizeFirstSmaller", function(assert) {
	this.setSpecCPresentation("pgGroupIdOneTextChildNoOptionalRefInfo");

	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
});

QUnit.test("testFirstPChildRefHandlerSpecNoStyleInfoMinNumberOfRepeatingToShow", function(assert) {
	this.setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfoMinNumberOfRepeatingToShow");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(this.getId(factoredSpec.cParentMetadata),
		"groupIdOneTextChildRepeat1to3");
	assert.strictEqual(this.getId(factoredSpec.cPresentation),
		"pVarTextVariableIdOutput");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
		"pgGroupIdOneTextChildMinimized");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation),
		"pVarTextVariableId");

	assert.strictEqual(factoredSpec.textStyle, undefined);
	assert.strictEqual(factoredSpec.childStyle, undefined);
	assert.strictEqual(factoredSpec.clickableHeadlineText, undefined);
	assert.strictEqual(factoredSpec.clickableHeadlineLevel, undefined);

	assert.strictEqual(factoredSpec.mode, "input");

	assert.strictEqual(factoredSpec.minNumberOfRepeatingToShow, "1");
});

QUnit.test("pgGroupIdOneTextChildMinimizedDefaultModeInput", function(assert) {
	this.setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultModeInput");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.mode, "input");
});

QUnit.test("pgGroupIdOneTextChildMinimizedDefaultModeOutput", function(assert) {
	this.setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultModeOutput");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.mode, "output");
});

QUnit.test("testText", function(assert) {
	this.setSpecCPresentation("pgGroupIdOneTextOneTextChildTwoAttributes");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0).className, "text h2TextStyle fourChildStyle");
});

QUnit.test("testTextNoTextStyle", function(assert) {
	this.setSpecCPresentation("pgGroupIdOneTextOneTextChildTwoAttributesNoTextStyle");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0).className, "text");
});

QUnit.test("testPNonRepeatingChildRefHandlerSpec", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("groupWithSContainerPGroup");
	this.setSpecCParentPresentation("groupWithSContainerPGroup");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	//	let view = pParentMultipleChildren.getView();
	//	this.fixture.appendChild(view);


	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);

	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(factoredSpec.parentMetadataId, "groupIdTwoTextChildRepeat1to5");
	assert.strictEqual(factoredSpec.mode, "input");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pTextVariablePlus2SContainer");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation), "groupWithSContainerPGroup");
	assert.strictEqual(factoredSpec.cAlternativePresentation, undefined);
	assert.strictEqual(factoredSpec.recordPartPermissionCalculator, this.spec.recordPartPermissionCalculator);

	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0)
	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());
	assert.strictEqual(factoredSpec.textStyle, "h2TextStyle");
	assert.strictEqual(factoredSpec.childStyle, "fourChildStyle");
	assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
});

QUnit.test("testPNonRepeatingChildRefHandlerSpecFirstSmaller", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("groupWithSContainerAndAlternativeSContainerPGroup");
	this.setSpecCParentPresentation("groupWithSContainerAndAlternativeSContainerPGroup");

	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
});

QUnit.test("testPNonRepeatingChildRefHandlerSpecWithMinimized", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("groupWithSContainerAndAlternativeSContainerPGroup");
	this.setSpecCParentPresentation("groupWithSContainerAndAlternativeSContainerPGroup");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);

	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(factoredSpec.parentMetadataId, "groupIdTwoTextChildRepeat1to5");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pTextVariablePlus2SContainer");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation),
		"pTextVariablePlus2SContainer2");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
		"groupWithSContainerAndAlternativeSContainerPGroup");

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());
});

QUnit.test("testGuiElementLink", function(assert) {
	this.dependencies.metadataProvider = new MetadataProviderStubGuiElement();
	this.spec.metadataIdUsedInData = "groupIdOneTextChild";
	this.child.metadataId = "groupIdOneTextChild";
	this.setSpecCPresentation("pgGroupIdOneGuiElementLinkChild");

	this.child.cParentPresentation = CORA.coraData(this.dependencies.metadataProvider
		.getMetadataById("pgGroupIdOneTextChildMinimized"))

	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, this.child);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	let firstAddedChild = viewSpy.getAppendedChild(0);
	assert.strictEqual(firstAddedChild.className, "guiElement");
	assert.strictEqual(firstAddedChild.nodeName, "A");
	assert.strictEqual(firstAddedChild.text, "translated_someTextToPresentAsLinkText");
	assert.strictEqual(firstAddedChild.href, "http://www.google.se/");
});

QUnit.test("testFirstPChildRefHandlerSpecNoAddButtonText", function(assert) {
	this.setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfo");
	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");

	assert.strictEqual(factoredSpec.addText, undefined);
});

QUnit.test("testFirstPChildRefHandlerSpecWithAddButtonText", function(assert) {
	this.setSpecCPresentation("pgGroupIdTwoTextChild");

	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");

	assert.strictEqual(factoredSpec.addText, "someTextIdForAddText");
});

QUnit.test("testSurroundingContainerPermissionCalculatorCalledUntilOneIsFoundTrueNoneIsOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("groupWithSContainerPGroup");
	this.setSpecCParentPresentation("groupWithSContainerPGroup");
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

	this.createAndInitPMultipleChildren();

	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(1), "metadataTextVariable_textVariableId2");
	this.assertNoOfChildrenAddedToView(assert, 0);
});

QUnit.test("testSurroundingContainerPermissionCalculatorCalledUntilOneIsFoundTrueFirstIsOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("groupWithSContainerPGroup");
	this.setSpecCParentPresentation("groupWithSContainerPGroup");
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

	this.createAndInitPMultipleChildren();

	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(1), undefined);
	this.assertNoOfChildrenAddedToView(assert, 1);
});

QUnit.test("testSurroundingContainerPermissionCalculatorCalledUntilOneIsFoundTrueSecondIsOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("groupWithSContainerPGroup");
	this.setSpecCParentPresentation("groupWithSContainerPGroup");
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");

	this.createAndInitPMultipleChildren();

	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(1), "metadataTextVariable_textVariableId2");
	this.assertNoOfChildrenAddedToView(assert, 1);
});

QUnit.test("testSurroundingContainerPermissionWhenTwoChildrenOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("groupWithSContainerPGroup");
	this.setSpecCParentPresentation("groupWithSContainerPGroup");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());

	let factored2 = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(1);
	assert.strictEqual(factored2, undefined);

	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);

	assert.strictEqual(factoredSpec.textStyle, "h2TextStyle");
	assert.strictEqual(factoredSpec.childStyle, "fourChildStyle");
	assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
});

QUnit.test("testSurroundingContainerPermissionWhenOneChildOkOneNotOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("groupWithSContainerPGroup");
	this.setSpecCParentPresentation("groupWithSContainerPGroup");

	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());
	let factored2 = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(1);
	assert.strictEqual(factored2, undefined);
});

QUnit.test("testFirstPChildRefHandlerNotCalledWhenNoReadPermission", function(assert) {
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");
	this.recordPartPermissionCalculator.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");

	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec, undefined);
	this.assertNoOfChildrenAddedToView(assert, 0);
});

QUnit.test("testFirstPChildRefHandlerSpecWhenNoWritePermission", function(assert) {
	this.recordPartPermissionCalculator.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");

	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdOneTextChildRepeat1to3");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
		"pgGroupIdOneTextChildMinimized");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation),
		"pVarTextVariableIdOutput");
	assert.strictEqual(factoredSpec.minimizedDefault, undefined);

	assert.strictEqual(factoredSpec.textStyle, "h1TextStyle");
	assert.strictEqual(factoredSpec.childStyle, "oneChildStyle");
	assert.strictEqual(factoredSpec.mode, "input");
	assert.strictEqual(factoredSpec.hasWritePermissionsForRecordPart, false);
	this.assertNoOfChildrenAddedToView(assert, 1);
});

QUnit.test("testFirstPChildRefHandlerSpecWhenNoConstraints", function(assert) {
	this.spec.recordPartPermissionCalculator = undefined;
	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.hasWritePermissionsForRecordPart, true);
});

QUnit.test("testFactoredPAttributes", function(assert) {
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	let attributesSpec = this.pAttributesFactory.getSpec(0);
	assert.strictEqual(attributesSpec.addViewToParent, viewSpy.addAttributesView);
	assert.strictEqual(attributesSpec.path, this.spec.path);
	assert.strictEqual(attributesSpec.mode, "input");
	assert.strictEqual(attributesSpec.toShow, "all");
});

QUnit.test("testFactoredPAttributes_attributesToShow_sentOnToAttributesFactory", function(assert) {
	let attributesToShow = {
		name: "attributesToShow",
		value: "selectable"
	};
	this.spec.cPresentation.getData().children.push(attributesToShow);
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let attributesSpec = this.pAttributesFactory.getSpec(0);
	assert.strictEqual(attributesSpec.toShow, "selectable");
});

QUnit.test("testSurroundingNoAttributes", function(assert) {
	this.child.type = "pSurroundingContainer";

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let attributesSpec = this.pAttributesFactory.getSpec(0);

	assert.strictEqual(attributesSpec, undefined);
});

QUnit.test("testInitOneChild", function(assert) {
	this.setMyMetadataId("groupIdOneTextChild");
	this.setSpecCPresentation("pgGroupIdOneTextChild");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.assertNoOfChildrenAddedToView(assert, 1);
	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	let factored = this.dependencies.pChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdOneTextChild");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
});


QUnit.test("testInitOneTextOneChild", function(assert) {
	this.setMyMetadataId("groupIdOneTextChild");
	this.setSpecCPresentation("pgGroupIdOneTextOneTextChild");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let view = pParentMultipleChildren.getView();
	this.assertNoOfChildrenAddedToView(assert, 2);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0).textContent, "translated_aHeadlineText");

	let factored = this.dependencies.pChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(1), factored.getView());

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdOneTextChild");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
});

QUnit.test("testInitOneCollectionChild", function(assert) {
	this.setMyMetadataId("groupWithOneCollectionVarChildGroup");
	this.setSpecCPresentation("groupWithOneCollectionVarChildPGroup");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let view = pParentMultipleChildren.getView();
	this.assertNoOfChildrenAddedToView(assert, 2);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0).textContent, "translated_aHeadlineText");

	let factored = this.dependencies.pChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(1), factored.getView());

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupWithOneCollectionVarChildGroup");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "userSuppliedIdCollectionVarPCollVar");
});

QUnit.test("testInitTwoChildren", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChild");
	this.setSpecCPresentation("pgGroupIdTwoTextChild");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let view = pParentMultipleChildren.getView();
	this.assertNoOfChildrenAddedToView(assert, 2);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);

	let factored = this.dependencies.pChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0), factored.getView());
	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdTwoTextChild");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");

	let factored1 = this.dependencies.pChildRefHandlerFactory.getFactored(1);
	assert.strictEqual(viewSpy.getAppendedChild(1), factored1.getView());

	let factoredSpec1 = this.dependencies.pChildRefHandlerFactory.getSpec(1);
	assert.deepEqual(factoredSpec1.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec1.cParentMetadata), "groupIdTwoTextChild");
	assert.strictEqual(this.getId(factoredSpec1.cPresentation), "pVarTextVariableId2");

});

QUnit.test("testInitOneChildMinimized", function(assert) {
	this.setMyMetadataId("groupIdOneTextChildRepeat1to3");
	this.setSpecCPresentation("pgGroupIdOneTextChildMinimized");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	this.assertNoOfChildrenAddedToView(assert, 1);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata),
		"groupIdOneTextChildRepeat1to3");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
		"pgGroupIdOneTextChildMinimized");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation),
		"pVarTextVariableIdOutput");
	assert.strictEqual(factoredSpec.minimizedDefault, undefined);
});

QUnit.test("testInitOneChildMinimizedDefault", function(assert) {
	this.setMyMetadataId("groupIdOneTextChild");
	this.setSpecCPresentation("pgGroupIdOneTextChildMinimizedDefault");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	this.assertNoOfChildrenAddedToView(assert, 1);


	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdOneTextChild");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");
});

QUnit.test("testInit", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("pTextVariablePlus2SContainer");
	this.setSpecCParentPresentation("pgGroupIdTwoTextChildSurrounding2TextPGroup");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	this.assertNoOfChildrenAddedToView(assert, 3);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0).textContent, "translated_aHeadlineText");

	let factored = this.dependencies.pChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(1), factored.getView());

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdTwoTextChildRepeat1to5");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation), "pgGroupIdTwoTextChildSurrounding2TextPGroup");
	assert.strictEqual(factoredSpec.minimizedDefault, undefined);
});


QUnit.test("testNestedSurroundingContainer", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setSpecCPresentation("pTextVariablePlus2SContainer2");
	this.setSpecCParentPresentation("pgGroupIdTwoTextChildSurrounding2TextPGroup2");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	this.assertNoOfChildrenAddedToView(assert, 2);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(0).textContent, "translated_aHeadlineText");

	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(viewSpy.getAppendedChild(1), factored.getView());

	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(factoredSpec.parentMetadataId, "groupIdTwoTextChildRepeat1to5");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pTextVariablePlus2SContainer");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation), "pgGroupIdTwoTextChildSurrounding2TextPGroup2");
	assert.strictEqual(factoredSpec.minimizedDefault, undefined);
});

QUnit.test("testGetInfoShowsMetadataIdUsedInDataIsUsedAndNotPresentationOf", function(assert) {
	this.spec.path = ["one", "two"];
	this.setMyMetadataId("groupIdOneTextChild2");
	this.setSpecCPresentation("pgGroupIdOneTextChild");
	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, this.child);

	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
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
	let viewSpec = this.pMultipleChildrenViewFactory.getSpec(0);
	assert.deepEqual(viewSpec, expectedViewSpec);
});
