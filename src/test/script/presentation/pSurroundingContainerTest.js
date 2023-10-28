/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017, 2018, 2023 Olov McKie
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
QUnit.module("presentation/pSurroundingContainerTest.js", {
	beforeEach: function() {
		this.getId = function(cData) {
			let recordInfo = cData.getFirstChildByNameInData("recordInfo");
			let id = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			return id;
		};
		this.pParentMultipleChildrenFactory = CORATEST.standardParentFactorySpy("pParentMultipleChildrenSpy");
			
		this.pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");
		
		this.fixture = document.getElementById("qunit-fixture");
		this.dependencies = {
			metadataProvider: new MetadataProviderStub(),
			pubSub: CORATEST.pubSubSpy(),
			textProvider: CORATEST.textProviderStub(),
			presentationFactory: CORATEST.standardFactorySpy("presentationSpy"),
			pAttributesFactory: this.pAttributesFactory,
			jsBookkeeper: CORATEST.jsBookkeeperSpy(),
			recordTypeProvider: CORATEST.recordTypeProviderStub(),
			pChildRefHandlerFactory: CORATEST.standardFactorySpy("pChildRefHandlerSpy"),
			pNonRepeatingChildRefHandlerFactory: CORATEST
				.standardFactorySpy("pNonRepeatingChildRefHandlerSpy"),
			pMultipleChildrenViewFactory: CORATEST.standardFactorySpy("pMultipleChildrenViewSpy"),
			pParentMultipleChildrenFactory: this.pParentMultipleChildrenFactory
		};
		this.spec = {
			"metadataIdUsedInData": "groupIdTwoTextChildRepeat1to5",
			"path": [],
			"cPresentation": CORA.coraData(this.dependencies.metadataProvider
				.getMetadataById("pTextVariablePlus2SContainer")),
			"cParentPresentation": CORA.coraData(this.dependencies.metadataProvider
				.getMetadataById("pgGroupIdTwoTextChildSurrounding2TextPGroup"))
		};
	},
});


QUnit.test("testInit", function(assert) {
	let pSurroundingContainer = CORA.pSurroundingContainer(this.dependencies, this.spec);
	
	assert.strictEqual(pSurroundingContainer.type, "pSurroundingContainer");
});

QUnit.test("testInitParentFactoryCalled", function(assert) {
	let pSurroundingContainer = CORA.pSurroundingContainer(this.dependencies, this.spec);
	
	assert.strictEqual(this.pParentMultipleChildrenFactory.getSpec(0), this.spec);
	let child = this.pParentMultipleChildrenFactory.getChild(0);
	
	assert.strictEqual(child.type, "pSurroundingContainer");
	assert.strictEqual(child.metadataId, this.spec.metadataIdUsedInData);
});

QUnit.test("testAddTypeSpecificInfoToView_WhenAddedToParentAsChild", function(assert) {
	let pSurroundingContainer = CORA.pSurroundingContainer(this.dependencies, this.spec);
	
	let child = this.pParentMultipleChildrenFactory.getChild(0);
	assert.ok(child.addTypeSpecificInfoToViewSpec);
	
	let spec ={
		className: "someChildType pgGroupIdOneTextChildMinimized",
	  	id: "onetwo",
	  	info: {
	    	defText: "groupIdOneTextChildDefText",
	    	text: "groupIdOneTextChildText",
	    	technicalInfo: [
	    	]
	  	},
	  	mode: "input",
		presentationId: "pgGroupIdOneTextChildMinimized"
	}
	spec.childExtra = "added by child";
	spec.info.technicalInfo.push(
		{
		text: "textId: groupIdOneTextChildRepeat1to3Text",
		onclickMethod: pSurroundingContainer.openTextIdRecord
	}, {
		text: "defTextId: groupIdOneTextChildRepeat1to3DefText",
		onclickMethod: pSurroundingContainer.openDefTextIdRecord
	}, {
		text: "metadataId: groupIdOneTextChildRepeat1to3",
		onclickMethod: pSurroundingContainer.openMetadataIdRecord
	}, {
		text: "nameInData: groupIdOneTextChildRepeat1to3"
	}, {
		text: "presentationId: pgGroupIdOneTextChildMinimized",
		onclickMethod: pSurroundingContainer.openPresentationIdRecord
	});


	child.addTypeSpecificInfoToViewSpec("input", spec);
	
	
	assert.strictEqual(spec.type, "container");
	assert.strictEqual(spec.info.text, "surroundingContainer");
	assert.strictEqual(spec.info.defText, "surroundingContainer");
	
	assert.strictEqual(spec.info.technicalInfo.length, 1);
	assert.deepEqual(spec.info.technicalInfo[0], {
		text: "presentationId: pgGroupIdOneTextChildMinimized",
		onclickMethod: pSurroundingContainer.openPresentationIdRecord
	});
	
});

QUnit.test("testGetView", function(assert) {
	let pSurroundingContainer = CORA.pResourceLink(this.dependencies, this.spec);
	let parent = this.pParentMultipleChildrenFactory.getFactored(0);
	
	assert.strictEqual(pSurroundingContainer.getView, parent.getView);
});

QUnit.test("testGetSpec", function(assert) {
	let pSurroundingContainer = CORA.pSurroundingContainer(this.dependencies, this.spec);
	assert.strictEqual(pSurroundingContainer.getSpec(), this.spec);
});

QUnit.test("testGetDependencies", function(assert) {
	let pSurroundingContainer = CORA.pSurroundingContainer(this.dependencies, this.spec);
	assert.strictEqual(pSurroundingContainer.getDependencies(), this.dependencies);
});

