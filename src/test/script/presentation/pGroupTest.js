/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017, 2023 Olov McKie
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

QUnit.module("presentation/pGroupTest.js", {
	beforeEach : function() {
		this.getId = function(cData) {
			let recordInfo = cData.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}
		
		this.pParentMultipleChildrenFactory = CORATEST.standardParentFactorySpy("pParentMultipleChildrenSpy");
		
		this.fixture = document.getElementById("qunit-fixture");
		this.pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");
		this.dependencies = {
			metadataProvider : CORATEST.MetadataProviderStub(),
			pubSub : CORATEST.pubSubSpy(),
			textProvider : CORATEST.textProviderStub(),
			presentationFactory : CORATEST.standardFactorySpy("presentationSpy"),
			pAttributesFactory: this.pAttributesFactory,
			jsBookkeeper : CORATEST.jsBookkeeperSpy(),
			recordTypeProvider : CORATEST.recordTypeProviderStub(),
			pChildRefHandlerFactory : CORATEST.standardFactorySpy("pChildRefHandlerSpy"),
			pMultipleChildrenViewFactory: CORATEST.standardFactorySpy("pMultipleChildrenViewSpy"),
			pParentMultipleChildrenFactory: this.pParentMultipleChildrenFactory
			
		};
		this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();
		
		this.spec = {
			"metadataIdUsedInData" : "groupIdOneTextChild",
			"path" : [],
			"cPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdOneTextChild")),
			"cParentPresentation" : undefined,
			recordPartPermissionCalculator : this.recordPartPermissionCalculator,
		};
	}
}); 

QUnit.test("testInit", function(assert) {
	let pGroup = CORA.pGroup(this.dependencies, this.spec);
	
	assert.strictEqual(pGroup.type, "pGroup");
});

QUnit.test("testInitParentFactoryCalled", function(assert) {
	let pGroup = CORA.pGroup(this.dependencies, this.spec);
	
	assert.strictEqual(this.pParentMultipleChildrenFactory.getSpec(0), this.spec);
	let child = this.pParentMultipleChildrenFactory.getChild(0);
	
	assert.strictEqual(child.type, "pGroup");
	assert.strictEqual(child.metadataId, this.spec.metadataIdUsedInData);
});

QUnit.test("testAddTypeSpecificInfoToView_WhenAddedToParentAsChild", function(assert) {
	let pGroup = CORA.pGroup(this.dependencies, this.spec);
	
	let child = this.pParentMultipleChildrenFactory.getChild(0);
	assert.ok(child.addTypeSpecificInfoToViewSpec);
	let spec = {};

	child.addTypeSpecificInfoToViewSpec("input", spec);
	
	assert.strictEqual(spec.type, "pGroup");
});

QUnit.test("testGetView", function(assert) {
	let pGroup = CORA.pGroup(this.dependencies, this.spec);
	let parent = this.pParentMultipleChildrenFactory.getFactored(0);
	
	assert.strictEqual(pGroup.getView, parent.getView);
});

QUnit.test("testSpec", function(assert) {
	let pGroup = CORA.pGroup(this.dependencies, this.spec);
	let view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pGroup.getSpec(), this.spec);
});

QUnit.test("testDependencies", function(assert) {
	let pGroup = CORA.pGroup(this.dependencies, this.spec);
	let view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pGroup.getDependencies(), this.dependencies);
});


