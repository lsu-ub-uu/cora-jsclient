/*
 * Copyright 2017 Olov McKie
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
		this.metadataProvider = new MetadataProviderStub();
		
		this.dependencies = {
			clientInstanceProvider: CORATEST.clientInstanceProviderSpy(),
			metadataProvider: this.metadataProvider,
			pubSub: CORATEST.pubSubSpy(),
			textProvider: CORATEST.textProviderStub(),
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
			recordPartPermissionCalculator: this.recordPartPermissionCalculator
		};
		
		this.getId = function(cData) {
			let recordInfo = cData.getFirstChildByNameInData("recordInfo");
			let id = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			return id;
		}
		
		let createBaseViewHolder = function() {
			return CORA.gui.createDivWithClassName("pParentMultipleChildren pGroup");
		}
		
		let lastInfoValueForViewMode="";
		const addTypeSpecificInfoToViewSpec= function (mode, pVarViewSpec) {
			lastInfoValueForViewMode = mode;
			pVarViewSpec.childExtra = "added by child";
		};
		const getLastInfoValueForViewMode= function (value) {
			return lastInfoValueForViewMode;
		};
		
		this.my = {
			metadataId: this.spec.metadataIdUsedInData,
			cPresentation: CORA.coraData(this.dependencies.metadataProvider
				.getMetadataById("pgGroupIdOneTextChildMinimized")),
			// used in surroundingContainer
			cParentPresentation: CORA.coraData(this.dependencies.metadataProvider
				.getMetadataById("pgGroupIdOneTextChildMinimized")),
			createBaseViewHolder: createBaseViewHolder,
			addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec,
			getLastInfoValueForViewMode:getLastInfoValueForViewMode
			
		};
		this.getMetadataAsCoraData = function(metadataId) {
			return CORA.coraData(this.dependencies.metadataProvider.getMetadataById(metadataId));
		};
		this.setMyMetadataId = function(metadataId) {
			this.my.metadataId = metadataId;
		};
		this.setMyCPresentation = function(metadataId) {
			this.my.cPresentation = this.getMetadataAsCoraData(metadataId);
		};
		this.setMyCParentPresentation = function(metadataId) {
			this.my.cParentPresentation = this.getMetadataAsCoraData(metadataId);
		};
		this.createAndInitPMultipleChildren = function() {
			this.pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, this.spec, this.my);
			return this.pParentMultipleChildren;
		}
		this.assertNoOfChildrenAddedToView = function(assert, no) {
			let view = this.pParentMultipleChildren.getView();
			assert.strictEqual(view.childNodes.length - this.standardNoOfChildren, no);
		};

	}
});

QUnit.test("testInit", function(assert) {
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pParentMultipleChildren.type, "pParentMultipleChildren");
	assert.visible(view, "pParentMultipleChildren view should be visible");
	let expectedClassName = 'pParentMultipleChildren pGroup';
	assert.deepEqual(view.className, expectedClassName);
});

//QUnit.test("testGetView", function(assert) {
//	let pParentVar = CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
//	let spyView = this.pVarViewFactory.getFactored(0);
//	assert.strictEqual(pParentVar.getView(), spyView.getView());
//});

QUnit.test("testFactoredViewCorrectlyForInputVariable", function(assert) {
	this.spec.path = ["one", "two"];
//	let child = this.createChildSpy();
	let child = this.my;
	let pParentVar = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	
	let viewSpy = this.pMultipleChildrenViewFactory.getFactored(0);
	assert.deepEqual(viewSpy.type, "pMultipleChildrenViewSpy");
//	let expectedViewSpec = {
//		label: "Exempel textvariabel",
//		id: "onetwo",
//		mode: "input",
//		info: {
//			defText: "Detta är en exempeldefinition för en textvariabel.",
//			technicalInfo: [],
//			text: "Exempel textvariabel"
//		},
//		onblurFunction: pParentVar.onBlur,
//		onkeyupFunction: pParentVar.onkeyup,
//		placeholderText: "Skriv din text här",
//		presentationId: "pVarTextVariableId"
//	};
	let expectedViewSpec ={
		className: "",
	  id: "onetwo",
	  info: {
	    defText: "groupIdOneTextChildDefText",
	    technicalInfo: [
	    ],
	    text: "groupIdOneTextChildText"
	  },
	  mode: "input",
	presentationId: "pgGroupIdOneTextChildMinimized"
	}
	
	expectedViewSpec.childExtra = "added by child";
	
	assert.strictEqual(child.getLastInfoValueForViewMode(),"input");
	
	expectedViewSpec.info.technicalInfo.push(
		{
		text: "textId: groupIdOneTextChildRepeat1to3Text",
		onclickMethod: pParentVar.openTextIdRecord
	}, {
		text: "defTextId: groupIdOneTextChildRepeat1to3DefText",
		onclickMethod: pParentVar.openDefTextIdRecord
	}, {
		text: "metadataId: groupIdOneTextChildRepeat1to3",
		onclickMethod: pParentVar.openMetadataIdRecord
	}, {
		text: "nameInData: groupIdOneTextChildRepeat1to3"
	}, {
		text: "presentationId: pgGroupIdOneTextChildMinimized",
		onclickMethod: pParentVar.openPresentationIdRecord
	});
	assert.deepEqual(viewSpy.getSpec(), expectedViewSpec);
});


QUnit.test("testOpenTextIdRecord", function(assert) {
	let child = this.my;
	let pParentVar = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentVar.openTextIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/text/" + "groupIdOneTextChildRepeat1to3"
			 + "Text",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pParentVar.openTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenDefTextIdRecord", function(assert) {
	let child = this.my;
	let pParentVar = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentVar.openDefTextIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://localhost:8080/therest/rest/record/text/" + "groupIdOneTextChildRepeat1to3"
				+ "DefText",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pParentVar.openDefTextIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenMetadataIdRecord", function(assert) {
	let child = this.my;
	let pParentVar = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentVar.openMetadataIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		"readLink": {
			"requestMethod": "GET",
			"rel": "read",
			"url": "http://fake.from.metadataproviderstub/rest/record/sometype/groupIdOneTextChildRepeat1to3",
			"accept": "application/vnd.uub.record+json"
		},
		"loadInBackground": "false"
	};
	
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pParentVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenPresentationIdRecord", function(assert) {
	let child = this.my;
	let pParentVar = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	let event = document.createEvent('Event');
	event.ctrlKey = true;
	pParentVar.openPresentationIdRecord(event);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		readLink: {
			requestMethod: "GET",
			rel: "read",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/" 
				+ "pgGroupIdOneTextChildMinimized",
			accept: "application/vnd.uub.record+json"
		},
		loadInBackground: "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pParentVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenLinkedRecordForLink", function(assert) {
	let child = this.my;
	let pParentVar = CORA.pParentMultipleChildren(this.dependencies, this.spec, child);

	let event = document.createEvent('Event');
	let link = {
			requestMethod: "GET",
			rel: "read",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/" 
				+ "pgGroupIdOneTextChildMinimized",
			accept: "application/vnd.uub.record+json"
		};
	event.ctrlKey = true;
	pParentVar.openLinkedRecordForLink(event, link);

	let jsClient = this.dependencies.clientInstanceProvider.getJsClient();
	let expectedOpenInfo = {
		readLink: {
			requestMethod: "GET",
			rel: "read",
			url: "http://fake.from.metadataproviderstub/rest/record/sometype/" 
				+ "pgGroupIdOneTextChildMinimized",
			accept: "application/vnd.uub.record+json"
		},
		loadInBackground: "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	let event2 = document.createEvent('Event');
	event2.ctrlKey = false;
	pParentVar.openMetadataIdRecord(event2);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});





//QUnit.test("testFactoredViewCorrectlyForInputTextVariableShowLabelFalse", function(assert) {
//	this.spec.path = ["one", "two"];
//	this.spec.cPresentation = CORA.coraData(this.metadataProvider
//				.getMetadataById("pVarTextVariableIdShowLabelFalse"))
//	
//	CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
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
//	CORA.pParentVar(this.dependencies, this.spec, this.createChildSpy());
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
	assert.strictEqual(factoredSpec.mode, "input");
	assert.strictEqual(factoredSpec.hasWritePermissionsForRecordPart, true);
	assert.strictEqual(factoredSpec.recordPartPermissionCalculator, this.recordPartPermissionCalculator)
});

QUnit.test("testFirstMinimizedDefaultPChildRefHandlerSpec", function(assert) {
	this.setMyCPresentation("pgGroupIdOneTextChildMinimizedDefault");
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
	this.setMyCPresentation("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfo");
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
	assert.strictEqual(factoredSpec.presentationSize, "bothEqual");
});

QUnit.test("testPGroupChildRefHandlerSpecPresentationSizeFirstSmaller", function(assert) {
	this.setMyCPresentation("pgGroupIdOneTextChildNoOptionalRefInfo");

	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
});

QUnit.test("testFirstPChildRefHandlerSpecNoStyleInfoMinNumberOfRepeatingToShow", function(assert) {
	this.setMyCPresentation("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfoMinNumberOfRepeatingToShow");
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
	assert.strictEqual(factoredSpec.mode, "input");

	assert.strictEqual(factoredSpec.minNumberOfRepeatingToShow, "1");
});

QUnit.test("pgGroupIdOneTextChildMinimizedDefaultModeInput", function(assert) {
	this.setMyCPresentation("pgGroupIdOneTextChildMinimizedDefaultModeInput");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.mode, "input");
});

QUnit.test("pgGroupIdOneTextChildMinimizedDefaultModeOutput", function(assert) {
	this.setMyCPresentation("pgGroupIdOneTextChildMinimizedDefaultModeOutput");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.mode, "output");
});

QUnit.test("testText", function(assert) {
	this.setMyCPresentation("pgGroupIdOneTextOneTextChildTwoAttributes");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.childNodes[1].className, "text h2TextStyle fourChildStyle");
});
QUnit.test("testTextNoTextStyle", function(assert) {
	this.setMyCPresentation("pgGroupIdOneTextOneTextChildTwoAttributesNoTextStyle");
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.childNodes[1].className, "text");
});

QUnit.test("testPNonRepeatingChildRefHandlerSpec", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setMyCPresentation("groupWithSContainerPGroup");
	this.setMyCParentPresentation("groupWithSContainerPGroup");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);


	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);

	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(factoredSpec.parentMetadataId, "groupIdTwoTextChildRepeat1to5");
	assert.strictEqual(factoredSpec.mode, "input");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pTextVariablePlus2SContainer");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation), "groupWithSContainerPGroup");
	assert.strictEqual(factoredSpec.cAlternativePresentation, undefined);
	assert.strictEqual(factoredSpec.recordPartPermissionCalculator, this.spec.recordPartPermissionCalculator);

	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0)
	assert.strictEqual(view.childNodes[1], factored.getView());
	assert.strictEqual(factoredSpec.textStyle, "h2TextStyle");
	assert.strictEqual(factoredSpec.childStyle, "fourChildStyle");
	assert.strictEqual(factoredSpec.presentationSize, "bothEqual");

});

QUnit.test("testPNonRepeatingChildRefHandlerSpecFirstSmaller", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setMyCPresentation("groupWithSContainerAndAlternativeSContainerPGroup");
	this.setMyCParentPresentation("groupWithSContainerAndAlternativeSContainerPGroup");

	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
});

QUnit.test("testPNonRepeatingChildRefHandlerSpecWithMinimized", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setMyCPresentation("groupWithSContainerAndAlternativeSContainerPGroup");
	this.setMyCParentPresentation("groupWithSContainerAndAlternativeSContainerPGroup");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);

	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(factoredSpec.parentMetadataId, "groupIdTwoTextChildRepeat1to5");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pTextVariablePlus2SContainer");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation),
		"pTextVariablePlus2SContainer2");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
		"groupWithSContainerAndAlternativeSContainerPGroup");

	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0)
	assert.strictEqual(view.childNodes[1], factored.getView());
});

QUnit.test("testGuiElementLink", function(assert) {
	this.dependencies.metadataProvider = new MetadataProviderStubGuiElement();
	let spec = {
		"metadataIdUsedInData": "groupIdOneTextChild",
		"path": [],
	};
	let createBaseViewHolder = function() {
		return CORA.gui.createDivWithClassName("pParentMultipleChildren pGroup");
	}

	let my = {
		"metadataId": "groupIdOneTextChild",
		"cPresentation": CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneGuiElementLinkChild")),
		"createBaseViewHolder": createBaseViewHolder
	};

	let pParentMultipleChildren = CORA.pParentMultipleChildren(this.dependencies, spec, my);
//	pParentMultipleChildren.init();
	let view = pParentMultipleChildren.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.childNodes[1].className, "guiElement");
	assert.strictEqual(view.childNodes[1].nodeName, "A");
	assert.strictEqual(view.childNodes[1].text, "text for: someTextToPresentAsLinkText");
	assert.strictEqual(view.childNodes[1].href, "http://www.google.se/");
});

QUnit.test("testFirstPChildRefHandlerSpecNoAddButtonText", function(assert) {
	this.setMyCPresentation("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfo");
	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");

	assert.strictEqual(factoredSpec.addText, undefined);
});

QUnit.test("testFirstPChildRefHandlerSpecWithAddButtonText", function(assert) {
	this.setMyCPresentation("pgGroupIdTwoTextChild");

	this.createAndInitPMultipleChildren();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");

	assert.strictEqual(factoredSpec.addText, "someTextIdForAddText");
});

QUnit.test("testSurroundingContainerPermissionCalculatorCalledUntilOneIsFoundTrueNoneIsOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setMyCPresentation("groupWithSContainerPGroup");
	this.setMyCParentPresentation("groupWithSContainerPGroup");
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

	this.createAndInitPMultipleChildren();

	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(1), "metadataTextVariable_textVariableId2");
	this.assertNoOfChildrenAddedToView(assert, 0);
});

QUnit.test("testSurroundingContainerPermissionCalculatorCalledUntilOneIsFoundTrueFirstIsOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setMyCPresentation("groupWithSContainerPGroup");
	this.setMyCParentPresentation("groupWithSContainerPGroup");
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

	this.createAndInitPMultipleChildren();

	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(1), undefined);
	this.assertNoOfChildrenAddedToView(assert, 1);
});

QUnit.test("testSurroundingContainerPermissionCalculatorCalledUntilOneIsFoundTrueSecondIsOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setMyCPresentation("groupWithSContainerPGroup");
	this.setMyCParentPresentation("groupWithSContainerPGroup");
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId");

	this.createAndInitPMultipleChildren();

	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(1), "metadataTextVariable_textVariableId2");
	this.assertNoOfChildrenAddedToView(assert, 1);
});

QUnit.test("testSurroundingContainerPermissionWhenTwoChildrenOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setMyCPresentation("groupWithSContainerPGroup");
	this.setMyCParentPresentation("groupWithSContainerPGroup");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();

	let view = pParentMultipleChildren.getView();
	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(view.childNodes[1], factored.getView());

	let factored2 = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(1);
	assert.strictEqual(factored2, undefined);

	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);

	assert.strictEqual(factoredSpec.textStyle, "h2TextStyle");
	assert.strictEqual(factoredSpec.childStyle, "fourChildStyle");
	assert.strictEqual(factoredSpec.presentationSize, "bothEqual");
});

QUnit.test("testSurroundingContainerPermissionWhenOneChildOkOneNotOk", function(assert) {
	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
	this.setMyCPresentation("groupWithSContainerPGroup");
	this.setMyCParentPresentation("groupWithSContainerPGroup");

	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	let view = pParentMultipleChildren.getView();

	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(view.childNodes[1], factored.getView());
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
	
	let attributesSpec = this.pAttributesFactory.getSpec(0);

	assert.strictEqual(attributesSpec.addViewToParent, pParentMultipleChildren.addAttributesView);
	assert.strictEqual(attributesSpec.path, this.path);
	assert.strictEqual(attributesSpec.mode, "input");
});

QUnit.test("testAddAttributesView", function(assert) {
	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	
	let fakeView = document.createElement("span");
	fakeView.appendChild(document.createTextNode("fake view"));
	pParentMultipleChildren.addAttributesView(fakeView);
	assert.strictEqual(pParentMultipleChildren.getView().firstChild, fakeView);
});

QUnit.test("testSurroundingNoAttributes", function(assert) {
//	this.setMyMetadataId("groupIdTwoTextChildRepeat1to5");
//	this.setMyCPresentation("groupWithSContainerPGroup");
//	this.setMyCParentPresentation("groupWithSContainerPGroup");
	this.my.type="pSurroundingContainer";

	let pParentMultipleChildren = this.createAndInitPMultipleChildren();
	
	let attributesSpec = this.pAttributesFactory.getSpec(0);
	
	assert.strictEqual(attributesSpec, undefined);

//	let view = pParentMultipleChildren.getView();
//	let factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0);
//	assert.strictEqual(view.childNodes[1], factored.getView());
//
//	let factored2 = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(1);
//	assert.strictEqual(factored2, undefined);
//
//	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);
//
//	assert.strictEqual(factoredSpec.textStyle, "h2TextStyle");
//	assert.strictEqual(factoredSpec.childStyle, "fourChildStyle");
//	assert.strictEqual(factoredSpec.presentationSize, "bothEqual");
});

