/*
 * Copyright 2016, 2017 Olov McKie
 * Copyright 2018, 2020 Uppsala University Library
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
QUnit.module("presentation/presentationFactoryTest.js", {
	beforeEach: function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.dataDivider = "systemX";

		this.dependencies = {
			"providers": {
				"metadataProvider": this.metadataProvider,
				"textProvider": this.textProvider,
				"recordTypeProvider": this.recordTypeProvider,
				"clientInstanceProvider": CORATEST.clientInstanceProviderSpy(),
			},
			"globalFactories": {
				"searchHandlerFactory": CORATEST.standardFactorySpy("searchHandlerSpy")
			},
			"pubSub": this.pubSub,
			"jsBookkeeper": this.jsBookkeeper,
			"dataDivider": this.dataDivider,
			"pChildRefHandlerFactory": CORATEST.standardFactorySpy("pChildRefHandlerSpy"),
			recordPartPermissionCalculatorFactory: CORATEST.standardFactorySpy("recordPartPermissionCalculatorSpy")
		};
		this.newPresentationFactory = CORA.presentationFactory(this.dependencies);

		this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();
		this.spec = {
			"path": {},
			"metadataIdUsedInData": "textVariableId",
			"cPresentation": CORA.coraData(this.metadataProvider
				.getMetadataById("pVarTextVariableId")),
			"cParentPresentation": null,
			recordPartPermissionCalculator: this.recordPartPermissionCalculator
		};
		this.getMetadataAsCoraData = function(id) {
			return CORA.coraData(this.metadataProvider.getMetadataById(id));
		};
		this.setMetadataIdUsedInData = function(metadataId) {
			this.spec.metadataIdUsedInData = metadataId;
		};
		this.setCPresentation = function(metadataId) {
			this.spec.cPresentation = this.getMetadataAsCoraData(metadataId);
		};
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	let presentationFactory = CORA.presentationFactory(this.dependencies);
	assert.strictEqual(presentationFactory.type, "presentationFactory");
});

QUnit.test("testGetDependencies", function(assert) {
	let presentationFactory = CORA.presentationFactory(this.dependencies);
	assert.strictEqual(presentationFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactorPVar", function(assert) {
	let pVar = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pVar.type, "pVar");

	let dependencies = pVar.getDependencies();
	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
	
	let spec = pVar.getSpec();
	CORATEST.assertCorrectCommonSpec(assert, this, spec);
});


QUnit.test("testFactorPCollVar", function(assert) {
	this.setCPresentation("userSuppliedIdCollectionVarPCollVar");
	let pCollVar = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pCollVar.type, "pCollVar");

	let dependencies = pCollVar.getDependencies();
	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
	
	let spec = pCollVar.getSpec();
	CORATEST.assertCorrectCommonSpec(assert, this, spec);
});

QUnit.test("testFactorPGroup", function(assert) {
	this.setMetadataIdUsedInData("groupIdOneTextChild");
	this.setCPresentation("pgGroupIdOneTextChild");
	let pGroup = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pGroup.type, "pGroup");

	let dependencies = pGroup.getDependencies();
	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
	
	let spec = pGroup.getSpec();
	CORATEST.assertCorrectCommonSpec(assert, this, spec);
	assert.strictEqual(spec.recordPartPermissionCalculator,	this.spec.recordPartPermissionCalculator);
});

QUnit.test("testFactorPGroupAsMap", function(assert) {
	this.dependencies.providers.metadataProvider = new MetadataCoordinatesProviderStub();
	this.dependencies.providers.textProvider = CORATEST.textProviderSpy();
	this.spec = {
		"path": {},
		"metadataIdUsedInData": "coordinatesGroup",
		"cPresentation": CORA.coraData(this.dependencies.providers.metadataProvider
			.getMetadataById("coordinatesPGroup")),
		"cParentPresentation": null
	};
	this.newPresentationFactory = CORA.presentationFactory(this.dependencies);
	let pMap = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pMap.type, "pMap");

	let dependencies = pMap.getDependencies();
	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
	
	let spec = pMap.getSpec();
	CORATEST.assertCorrectCommonSpec(assert, this, spec);
});

QUnit.test("testFactorPGroupAsMapDependencies", function(assert) {
	this.dependencies.providers.metadataProvider = new MetadataCoordinatesProviderStub();
	this.dependencies.providers.textProvider = CORATEST.textProviderSpy();
	this.spec = {
		"path": {},
		"metadataIdUsedInData": "coordinatesGroup",
		"cPresentation": CORA.coraData(this.dependencies.providers.metadataProvider
			.getMetadataById("coordinatesPGroup")),
		"cParentPresentation": null
	};
	this.newPresentationFactory = CORA.presentationFactory(this.dependencies);
	let pMap = this.newPresentationFactory.factor(this.spec);

	let dependencies = pMap.getDependencies();
	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
});

//QUnit.test("testFactorPChildRefHandlerDependencies", function(assert) {
//	this.setMetadataIdUsedInData("groupIdOneTextChild");
//	this.setCPresentation("pgGroupIdOneTextChild");
//	let pGroup = this.newPresentationFactory.factor(this.spec);
//
//	let dependencies = pGroup.getDependencies();
//	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
//	
//
//});



//QUnit.test("testFactorPNonRepeatingChildRefHandlerDependencies", function(assert) {
//	this.setMetadataIdUsedInData("groupIdOneTextChild");
//	this.setCPresentation("pgGroupIdOneTextChild");
//	let pGroup = this.newPresentationFactory.factor(this.spec);
//
//	let dependencies = pGroup.getDependencies().pNonRepeatingChildRefHandlerFactory
//		.getDependencies();
//	assert.strictEqual(dependencies.presentationFactory.type, "presentationFactory");
//	assert.strictEqual(dependencies.presentationFactory, this.newPresentationFactory);
//
//	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerViewFactory.type,
//		"genericFactory");
//	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerViewFactory
//		.getTypeToFactor(), "pNonRepeatingChildRefHandlerView");
//
//	assert.strictEqual(dependencies.pubSub, this.dependencies.pubSub);
//	assert.strictEqual(dependencies.providers, this.dependencies.providers);
//});

QUnit.test("testFactorPRepeatingContainer", function(assert) {
	this.setMetadataIdUsedInData("textVariableId");
	this.setCPresentation("pTextVariableIdRContainer");
	let pRContainer = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pRContainer.type, "pRepeatingContainer");
});

QUnit.test("testFactorPSurroundingContainer", function(assert) {
	this.setMetadataIdUsedInData("groupIdTwoTextChildRepeat1to5");
	this.setCPresentation("pTextVariablePlus2SContainer");
	this.spec.cParentPresentation = this.getMetadataAsCoraData("pgGroupIdTwoTextChildSurrounding2TextPGroup");
	let pSContainer = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pSContainer.type, "pSurroundingContainer");
});
 
QUnit.test("testFactorPSurroundingContainerDependencies", function(assert) {
	this.setMetadataIdUsedInData("groupIdTwoTextChildRepeat1to5");
	this.setCPresentation("pTextVariablePlus2SContainer");
	this.spec.cParentPresentation = this.getMetadataAsCoraData("pgGroupIdTwoTextChildSurrounding2TextPGroup");
	let pSContainer = this.newPresentationFactory.factor(this.spec);


	let dependencies = pSContainer.getDependencies();
	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
});


QUnit.test("testFactorPSurroundingContainerSpec", function(assert) {
	this.setMetadataIdUsedInData("groupIdTwoTextChildRepeat1to5");
	this.setCPresentation("pTextVariablePlus2SContainer");
	this.spec.cParentPresentation = this.getMetadataAsCoraData("pgGroupIdTwoTextChildSurrounding2TextPGroup");
	
	let pSContainer = this.newPresentationFactory.factor(this.spec);

	let pSContainerSpec = pSContainer.getSpec();
	CORATEST.assertCorrectCommonSpec(assert, this, pSContainerSpec);
	assert.strictEqual(pSContainerSpec.recordPartPermissionCalculator,
		this.spec.recordPartPermissionCalculator);
});

QUnit.test("testFactorPRecordLink", function(assert) {
	this.setMetadataIdUsedInData("groupIdTwoTextChildRepeat1to5");
	this.spec.cPresentation = this
		.getMetadataAsCoraData("myLinkNoPresentationOfLinkedRecordPLink");
	let pRecordLink = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pRecordLink.type, "pRecordLink");
});

QUnit.test("testFactorPRecordLinkSpec", function(assert) {
	this.setMetadataIdUsedInData("groupIdTwoTextChildRepeat1to5");
	this.setCPresentation("myLinkNoPresentationOfLinkedRecordPLink");
	let pRecordLink = this.newPresentationFactory.factor(this.spec);
	let pRecordLinkSpec = pRecordLink.getSpec();

	assert.strictEqual(pRecordLinkSpec.path, this.spec.path);
	assert.strictEqual(pRecordLinkSpec.metadataIdUsedInData, this.spec.metadataIdUsedInData);
	assert.strictEqual(pRecordLinkSpec.cPresentation, this.spec.cPresentation);
	assert.strictEqual(pRecordLinkSpec.cParentPresentation, this.spec.cParentPresentation);
	assert.strictEqual(pRecordLinkSpec.recordPartPermissionCalculatorFactory,
		this.dependencies.recordPartPermissionCalculatorFactory);
});

QUnit.test("testFactorPRecordLinkDependencies", function(assert) {
	this.setMetadataIdUsedInData("groupIdTwoTextChildRepeat1to5");
	this.spec.cPresentation = this
		.getMetadataAsCoraData("myLinkNoPresentationOfLinkedRecordPLink");
	let pRecordLink = this.newPresentationFactory.factor(this.spec);

	let dependencies = pRecordLink.getDependencies();
	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
});


QUnit.test("testFactorPResourceLink", function(assert) {
	this.dependencies.providers.textProvider = CORATEST.textProviderSpy();

	this.setMetadataIdUsedInData("groupIdTwoTextChildRepeat1to5");
	this.setCPresentation("masterPResLink");
	let pResourceLink = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pResourceLink.type, "pResourceLink");
	let dependencies = pResourceLink.getDependencies();
	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
});

QUnit.test("testFactorPNumVar", function(assert) {
	this.setMetadataIdUsedInData("numVariableId");
	this.setCPresentation("pNumVarNumVariableId");
	let pNumVar = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pNumVar.type, "pNumVar");
});

QUnit.test("testFactorPNumVarDependencies", function(assert) {
	this.setMetadataIdUsedInData("numVariableId");
	this.setCPresentation("pNumVarNumVariableId");
	let pNumVar = this.newPresentationFactory.factor(this.spec);

	let dependencies = pNumVar.getDependencies();
	CORATEST.assertCorrectCommonDependencies(assert, this, dependencies);
});

QUnit.test("testFactorPNumVarViewDependencies", function(assert) {
	this.setMetadataIdUsedInData("numVariableId");
	this.setCPresentation("pNumVarNumVariableId");
	let pNumVar = this.newPresentationFactory.factor(this.spec);

	let factoredDependencies = pNumVar.getDependencies().pNumVarViewFactory.getDependencies();

	assert.strictEqual(factoredDependencies.infoFactory.type, "infoFactory");
});

CORATEST.assertCorrectCommonDependencies = function(assert, context, dependencies){
	assert.strictEqual(dependencies.providers, context.dependencies.providers);
	assert.strictEqual(dependencies.metadataProvider, context.dependencies.providers.metadataProvider);
	assert.strictEqual(dependencies.globalFactories, context.dependencies.globalFactories);
	assert.strictEqual(dependencies.recordTypeProvider,	context.dependencies.providers.recordTypeProvider);
	assert.strictEqual(dependencies.clientInstanceProvider,	context.dependencies.providers.clientInstanceProvider);

	assert.strictEqual(dependencies.infoFactory.type, "infoFactory");
	
	assert.strictEqual(dependencies.pVarViewFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pVarViewFactory.getTypeToFactor(), "pVarView");
	
	assert.strictEqual(dependencies.pChildRefHandlerFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pChildRefHandlerFactory.getTypeToFactor(), "pChildRefHandler");

	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerFactory.getTypeToFactor(),
		"pNonRepeatingChildRefHandler");

	assert.strictEqual(dependencies.pMapViewFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pMapViewFactory.getTypeToFactor(), "pMapView");

	assert.strictEqual(dependencies.pRecordLinkViewFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pRecordLinkViewFactory.getTypeToFactor(), "pRecordLinkView");
	let pRLVFDependencies = dependencies.pRecordLinkViewFactory.getDependencies();
	assert.strictEqual(pRLVFDependencies.infoFactory.type, "infoFactory");

	assert.strictEqual(dependencies.pNumVarViewFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pNumVarViewFactory.getTypeToFactor(), "pNumVarView");

	CORATEST.assertCorrectPChildRefHandlerFactoryDependencies(assert, context, 
		dependencies.pChildRefHandlerFactory.getDependencies());
		
	CORATEST.assertCorrectPNonRepeatingChildRefHandlerFactoryDependencies(assert, context, 
		dependencies.pNonRepeatingChildRefHandlerFactory.getDependencies());
}

CORATEST.assertCorrectPChildRefHandlerFactoryDependencies = function(assert, context, dependencies){
	assert.strictEqual(dependencies.presentationFactory.type, "presentationFactory");
	assert.strictEqual(dependencies.presentationFactory, context.newPresentationFactory);

	assert.strictEqual(dependencies.pRepeatingElementFactory.type, "genericFactory");
	assert
		.strictEqual(dependencies.pRepeatingElementFactory.getTypeToFactor(),
			"pRepeatingElement");

	assert.strictEqual(dependencies.pChildRefHandlerViewFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pChildRefHandlerViewFactory.getTypeToFactor(),
		"pChildRefHandlerView");
	assert.strictEqual(dependencies.dataDivider, context.dependencies.dataDivider);
	
	CORATEST.assertCorrectPRepeatingElementFactoryDependencies(assert, context, 
		dependencies.pRepeatingElementFactory.getDependencies());
}

CORATEST.assertCorrectPRepeatingElementFactoryDependencies = function(assert, context, dependencies){
	assert.strictEqual(dependencies.infoFactory.type, "infoFactory");
	assert.strictEqual(dependencies.jsBookkeeper, context.dependencies.jsBookkeeper);
}

CORATEST.assertCorrectPNonRepeatingChildRefHandlerFactoryDependencies = function(assert, context, dependencies){
	assert.strictEqual(dependencies.presentationFactory.type, "presentationFactory");
	assert.strictEqual(dependencies.presentationFactory, context.newPresentationFactory);

	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerViewFactory.type,
		"genericFactory");
	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerViewFactory
		.getTypeToFactor(), "pNonRepeatingChildRefHandlerView");

	assert.strictEqual(dependencies.pubSub, context.dependencies.pubSub);
	assert.strictEqual(dependencies.providers, context.dependencies.providers);
}
CORATEST.assertCorrectCommonSpec = function(assert, context, spec){
	assert.strictEqual(spec.path, context.spec.path);
	assert.strictEqual(spec.metadataIdUsedInData, context.spec.metadataIdUsedInData);
	assert.strictEqual(spec.cPresentation, context.spec.cPresentation);
	assert.strictEqual(spec.cParentPresentation, context.spec.cParentPresentation);
}
