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

QUnit.module("presentation/pMultipleChildrenTest.js", {
	beforeEach : function() {
		this.getId = function(cData) {
			let recordInfo = cData.getFirstChildByNameInData("recordInfo");
			let id = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			return id;
		}

		this.fixture = document.getElementById("qunit-fixture");
		this.dependencies = {
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"presentationFactory" : CORATEST.standardFactorySpy("presentationSpy"),
			"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
			"pChildRefHandlerFactory" : CORATEST.standardFactorySpy("pChildRefHandlerSpy"),
			"pNonRepeatingChildRefHandlerFactory" : CORATEST
					.standardFactorySpy("pNonRepeatingChildRefHandlerSpy")
		};
		this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();
		
		this.spec = {
			"metadataIdUsedInData" : "groupIdOneTextChildRepeat1to3",
			"path" : {},
			recordPartPermissionCalculator : this.recordPartPermissionCalculator
		};
		let createBaseViewHolder = function() {
			return CORA.gui.createDivWithClassName("pMultipleChildren pGroup");
		}
		this.my = {
			"metadataId" : this.spec.metadataIdUsedInData,
			"cPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdOneTextChildMinimized")),
			// used in surroundingContainer
			"cParentPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdOneTextChildMinimized")),
			"createBaseViewHolder" : createBaseViewHolder
		};

	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pMultipleChildren.type, "pMultipleChildren");
	assert.visible(view, "pMultipleChildren view should be visible");
	let expectedClassName = 'pMultipleChildren pGroup';
	assert.deepEqual(view.className, expectedClassName);
});

QUnit.test("testFirstPChildRefHandlerSpec",
		function(assert) {
			let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
			pMultipleChildren.init();
			let view = pMultipleChildren.getView();
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
});

QUnit.test("testFirstMinimizedDefaultPChildRefHandlerSpec", function(assert) {
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextChildMinimizedDefault"));
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
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
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfo"));
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
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
	let pGroupJson = this.dependencies.metadataProvider.getMetadataById("pgGroupIdOneTextChildNoOptionalRefInfo");
	
	this.my.cPresentation = CORA.coraData(pGroupJson);
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
});

QUnit
		.test(
				"testFirstPChildRefHandlerSpecNoStyleInfoMinNumberOfRepeatingToShow",
				function(assert) {
					this.my.cPresentation = CORA
							.coraData(this.dependencies.metadataProvider
									.getMetadataById("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfoMinNumberOfRepeatingToShow"));
					let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec,
							this.my);
					pMultipleChildren.init();
					let view = pMultipleChildren.getView();
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
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextChildMinimizedDefaultModeInput"));
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.mode, "input");
});

QUnit.test("pgGroupIdOneTextChildMinimizedDefaultModeOutput", function(assert) {
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextChildMinimizedDefaultModeOutput"));
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
	this.fixture.appendChild(view);

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.mode, "output");
});

QUnit.test("testText", function(assert) {
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextOneTextChildTwoAttributes"));
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.childNodes[1].className, "text h2TextStyle fourChildStyle");
});
QUnit.test("testTextNoTextStyle", function(assert) {
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextOneTextChildTwoAttributesNoTextStyle"));
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.childNodes[1].className, "text");
});

QUnit.test("testPNonRepeatingChildRefHandlerSpec", function(assert) {
	this.my.metadataId = "groupIdTwoTextChildRepeat1to5";
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));
	this.my.cParentPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));

	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
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
	this.my.metadataId = "groupIdTwoTextChildRepeat1to5";
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerAndAlternativeSContainerPGroup"));
	this.my.cParentPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerAndAlternativeSContainerPGroup"));

	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();

	let factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationSize, "firstSmaller");
});

QUnit.test("testPNonRepeatingChildRefHandlerSpecWithMinimized", function(assert) {
	this.my.metadataId = "groupIdTwoTextChildRepeat1to5";
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerAndAlternativeSContainerPGroup"));
	this.my.cParentPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerAndAlternativeSContainerPGroup"));

	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
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
			"metadataIdUsedInData" : "groupIdOneTextChild",
			"path" : {},
		};
	let createBaseViewHolder = function() {
		return CORA.gui.createDivWithClassName("pMultipleChildren pGroup");
	}
	
		let my = {
			"metadataId" :"groupIdOneTextChild",
			"cPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdOneGuiElementLinkChild")),
			"createBaseViewHolder" : createBaseViewHolder
		};
	
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, spec, my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.childNodes[1].className, "guiElement");
	assert.strictEqual(view.childNodes[1].nodeName, "A");
	assert.strictEqual(view.childNodes[1].text, "text for: someTextToPresentAsLinkText");
	assert.strictEqual(view.childNodes[1].href, "http://www.google.se/");
});

QUnit.test("testFirstPChildRefHandlerSpecNoAddButtonText", function(assert) {
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextChildMinimizedDefaultNoStyleInfo"));
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();

	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.parentPath, this.spec.path);
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");

	assert.strictEqual(factoredSpec.addText, undefined);
});

QUnit.test("testFirstPChildRefHandlerSpecWithAddButtonText", function(assert) {
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdTwoTextChild"));
	
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	
	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");

	assert.strictEqual(factoredSpec.addText, "someTextIdForAddText");
});

QUnit.test("testSurroundingContainerPermissionCalculatorCalledForEachChild", function(assert) {
	this.my.metadataId = "groupIdTwoTextChildRepeat1to5";
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));
	this.my.cParentPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));

	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(1), "metadataTextVariable_textVariableId2");
	
});

QUnit.test("testSurroundingContainerPermissionWhenTwoChildrenOk", function(assert) {
	this.my.metadataId = "groupIdTwoTextChildRepeat1to5";
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));
	this.my.cParentPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));

	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	
	let view = pMultipleChildren.getView();
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
	this.my.metadataId = "groupIdTwoTextChildRepeat1to5";
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));
	this.my.cParentPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));
	
	this.recordPartPermissionCalculator.addIdToReturnFalseForRead("metadataTextVariable_textVariableId2");

	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	
	let factored = this.dependencies.pChildRefHandlerFactory.getFactored(0);
	assert.strictEqual(factored, undefined);
	let factored2 = this.dependencies.pChildRefHandlerFactory.getFactored(1);
	
	assert.strictEqual(factored2, undefined);
});

QUnit.test("testPGroupPermissionCalculatorCalledForEachChild", function(assert) {
	this.my.metadataId = "groupIdTwoTextChildRepeat1to5";
	this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));
	this.my.cParentPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithSContainerPGroup"));

	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(0), "metadataTextVariable_textVariableId");
	assert.strictEqual(this.recordPartPermissionCalculator.getReadRequestedId(1), "metadataTextVariable_textVariableId2");
	
});

QUnit.test("testFirstPChildRefHandlerSpecWhenNoWritePermission", function(assert) {
	this.recordPartPermissionCalculator.addIdToReturnFalseForWrite("metadataTextVariable_textVariableId");
	
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	let view = pMultipleChildren.getView();
	this.fixture.appendChild(view);

	
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
});

QUnit.test("testFirstPChildRefHandlerSpecWhenNoConstraints", function(assert) {
	this.spec.recordPartPermissionCalculator = undefined;
	let pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	
	let factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.hasWritePermissionsForRecordPart, true);
});

