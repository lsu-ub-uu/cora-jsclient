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
			recordPartPermissionCalculatorFactory : CORATEST.standardFactorySpy("recordPartPermissionCalculatorSpy")
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
		}
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
	assert.strictEqual(this.newPresentationFactory.getDataDivider, undefined);
});

QUnit.test("testFactorPVar", function(assert) {
	let pVar = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pVar.type, "pVar");
});

QUnit.test("testFactorPVarDependencies", function(assert) {
	let pVar = this.newPresentationFactory.factor(this.spec);

	let dependencies = pVar.getDependencies();
	assert.strictEqual(dependencies.pVarViewFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pVarViewFactory.getTypeToFactor(), "pVarView");
});

QUnit.test("testFactorMetadataIdUsedInData", function(assert) {
	let pVar = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pVar.getSpec().metadataIdUsedInData, "textVariableId");
});

QUnit.test("testFactorPCollVar", function(assert) {
	this.spec.cPresentation = this.getMetadataAsCoraData("userSuppliedIdCollectionVarPCollVar");
	let pCollVar = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pCollVar.type, "pCollVar");
});

QUnit.test("testFactorPGroup", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdOneTextChild";
	this.spec.cPresentation = this.getMetadataAsCoraData("pgGroupIdOneTextChild");
	let pGroup = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pGroup.type, "pGroup");
});

QUnit.test("testFactorPGroupDependencies", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdOneTextChild";
	this.spec.cPresentation = this.getMetadataAsCoraData("pgGroupIdOneTextChild");
	let pGroup = this.newPresentationFactory.factor(this.spec);

	let dependencies = pGroup.getDependencies();
	assert.strictEqual(dependencies.pChildRefHandlerFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pChildRefHandlerFactory.getTypeToFactor(), "pChildRefHandler");

	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerFactory.getTypeToFactor(),
		"pNonRepeatingChildRefHandler");
	assert.strictEqual(dependencies.infoFactory.type, "infoFactory");
});

QUnit.test("testFactorPGroupSpec", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdOneTextChild";
	this.spec.cPresentation = this.getMetadataAsCoraData("pgGroupIdOneTextChild");
	let pGroup = this.newPresentationFactory.factor(this.spec);
	let pGroupSpec = pGroup.getSpec();

	assert.strictEqual(pGroupSpec.path, this.spec.path);
	assert.strictEqual(pGroupSpec.metadataIdUsedInData, this.spec.metadataIdUsedInData);
	assert.strictEqual(pGroupSpec.cPresentation, this.spec.cPresentation);
	assert.strictEqual(pGroupSpec.cParentPresentation, this.spec.cParentPresentation);
	assert.strictEqual(pGroupSpec.recordPartPermissionCalculator,
		this.spec.recordPartPermissionCalculator);
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
	assert.strictEqual(dependencies.pChildRefHandlerFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pChildRefHandlerFactory.getTypeToFactor(), "pChildRefHandler");

	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerFactory.getTypeToFactor(),
		"pNonRepeatingChildRefHandler");
	assert.strictEqual(dependencies.infoFactory.type, "infoFactory");

	assert.strictEqual(dependencies.pMapViewFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pMapViewFactory.getTypeToFactor(), "pMapView");
});

QUnit.test("testFactorPChildRefHandlerDependencies", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdOneTextChild";
	this.spec.cPresentation = this.getMetadataAsCoraData("pgGroupIdOneTextChild");
	let pGroup = this.newPresentationFactory.factor(this.spec);

	let dependencies = pGroup.getDependencies().pChildRefHandlerFactory.getDependencies();
	assert.strictEqual(dependencies.presentationFactory.type, "presentationFactory");
	assert.strictEqual(dependencies.presentationFactory, this.newPresentationFactory);

	assert.strictEqual(dependencies.pRepeatingElementFactory.type, "genericFactory");
	assert
		.strictEqual(dependencies.pRepeatingElementFactory.getTypeToFactor(),
			"pRepeatingElement");

	assert.strictEqual(dependencies.pChildRefHandlerViewFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pChildRefHandlerViewFactory.getTypeToFactor(),
		"pChildRefHandlerView");
	assert.strictEqual(dependencies.dataDivider, this.dependencies.dataDivider);

});

QUnit.test("testFactorPRepeatingElementDependencies",
	function(assert) {
		this.spec.metadataIdUsedInData = "groupIdOneTextChild";
		this.spec.cPresentation = this.getMetadataAsCoraData("pgGroupIdOneTextChild");
		let pGroup = this.newPresentationFactory.factor(this.spec);

		let dependencies = pGroup.getDependencies().pChildRefHandlerFactory
			.getDependencies().pRepeatingElementFactory.getDependencies();
		assert.strictEqual(dependencies.infoFactory.type, "infoFactory");
		assert.strictEqual(dependencies.jsBookkeeper, this.dependencies.jsBookkeeper);

	});

QUnit.test("testFactorPNonRepeatingChildRefHandlerDependencies",
	function(assert) {
		this.spec.metadataIdUsedInData = "groupIdOneTextChild";
		this.spec.cPresentation = this.getMetadataAsCoraData("pgGroupIdOneTextChild");
		let pGroup = this.newPresentationFactory.factor(this.spec);

		let dependencies = pGroup.getDependencies().pNonRepeatingChildRefHandlerFactory
			.getDependencies();
		assert.strictEqual(dependencies.presentationFactory.type, "presentationFactory");
		assert.strictEqual(dependencies.presentationFactory, this.newPresentationFactory);

		assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerViewFactory.type,
			"genericFactory");
		assert.strictEqual(dependencies.pNonRepeatingChildRefHandlerViewFactory
			.getTypeToFactor(), "pNonRepeatingChildRefHandlerView");

		assert.strictEqual(dependencies.pubSub, this.dependencies.pubSub);
		assert.strictEqual(dependencies.providers, this.dependencies.providers);
	});

QUnit.test("testFactorPRepeatingContainer", function(assert) {
	this.spec.metadataIdUsedInData = "textVariableId";
	this.spec.cPresentation = this.getMetadataAsCoraData("pTextVariableIdRContainer");
	let pRContainer = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pRContainer.type, "pRepeatingContainer");
});

QUnit.test("testFactorPSurroundingContainer", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
	this.spec.cPresentation = this.getMetadataAsCoraData("pTextVariablePlus2SContainer");
	this.spec.cParentPresentation = this
		.getMetadataAsCoraData("pgGroupIdTwoTextChildSurrounding2TextPGroup");
	let pSContainer = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pSContainer.type, "pSurroundingContainer");
});

QUnit.test("testFactorPRecordLink",
	function(assert) {
		this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
		this.spec.cPresentation = this
			.getMetadataAsCoraData("myLinkNoPresentationOfLinkedRecordPLink");
		let pRecordLink = this.newPresentationFactory.factor(this.spec);

		assert.strictEqual(pRecordLink.type, "pRecordLink");
	});
	
QUnit.test("testFactorPRecordLinkSpec", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
	this.spec.cPresentation = this.getMetadataAsCoraData("myLinkNoPresentationOfLinkedRecordPLink");
	let pRecordLink = this.newPresentationFactory.factor(this.spec);
	let pRecordLinkSpec = pRecordLink.getSpec();

	assert.strictEqual(pRecordLinkSpec.path, this.spec.path);
	assert.strictEqual(pRecordLinkSpec.metadataIdUsedInData, this.spec.metadataIdUsedInData);
	assert.strictEqual(pRecordLinkSpec.cPresentation, this.spec.cPresentation);
	assert.strictEqual(pRecordLinkSpec.cParentPresentation, this.spec.cParentPresentation);
	assert.strictEqual(pRecordLinkSpec.recordPartPermissionCalculatorFactory,
		this.dependencies.recordPartPermissionCalculatorFactory);
});

QUnit.test("testFactorPRecordLinkDependencies",
	function(assert) {
		this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
		this.spec.cPresentation = this
			.getMetadataAsCoraData("myLinkNoPresentationOfLinkedRecordPLink");
		let pRecordLink = this.newPresentationFactory.factor(this.spec);

		let factoredDependencies = pRecordLink.getDependencies();

		assert.strictEqual(factoredDependencies.providers, this.dependencies.providers);

		assert.strictEqual(factoredDependencies.globalFactories,
			this.dependencies.globalFactories);

		assert.strictEqual(factoredDependencies.recordTypeProvider,
			this.dependencies.providers.recordTypeProvider);
		assert.strictEqual(factoredDependencies.clientInstanceProvider,
			this.dependencies.providers.clientInstanceProvider);

		assert.strictEqual(factoredDependencies.pRecordLinkViewFactory.type, "genericFactory");
		assert.strictEqual(factoredDependencies.pRecordLinkViewFactory.getTypeToFactor(),
			"pRecordLinkView");
	});

QUnit.test("testFactorPRecordLinkViewDependencies",
	function(assert) {
		this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
		this.spec.cPresentation = this
			.getMetadataAsCoraData("myLinkNoPresentationOfLinkedRecordPLink");
		let pRecordLink = this.newPresentationFactory.factor(this.spec);

		let factoredDependencies = pRecordLink.getDependencies().pRecordLinkViewFactory
			.getDependencies();

		assert.strictEqual(factoredDependencies.infoFactory.type, "infoFactory");
	});

QUnit.test("testFactorPResourceLink", function(assert) {
	this.dependencies.providers.textProvider = CORATEST.textProviderSpy();

	this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
	this.spec.cPresentation = this.getMetadataAsCoraData("masterPResLink");
	let pResourceLink = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pResourceLink.type, "pResourceLink");
	let factoredDependencies = pResourceLink.getDependencies();
	assert.strictEqual(factoredDependencies.metadataProvider,
		this.dependencies.providers.metadataProvider);
});

QUnit.test("testFactorPNumVar", function(assert) {
	this.spec.metadataIdUsedInData = "numVariableId";
	this.spec.cPresentation = this.getMetadataAsCoraData("pNumVarNumVariableId");
	let pNumVar = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pNumVar.type, "pNumVar");
});

QUnit.test("testFactorPNumVarDependencies", function(assert) {
	this.spec.metadataIdUsedInData = "numVariableId";
	this.spec.cPresentation = this.getMetadataAsCoraData("pNumVarNumVariableId");
	let pNumVar = this.newPresentationFactory.factor(this.spec);

	let factoredDependencies = pNumVar.getDependencies();

	assert.strictEqual(factoredDependencies.providers, this.dependencies.providers);

	assert.strictEqual(factoredDependencies.globalFactories, this.dependencies.globalFactories);

	assert.strictEqual(factoredDependencies.recordTypeProvider,
		this.dependencies.providers.recordTypeProvider);
	assert.strictEqual(factoredDependencies.clientInstanceProvider,
		this.dependencies.providers.clientInstanceProvider);

	assert.strictEqual(factoredDependencies.pNumVarViewFactory.type, "genericFactory");
	assert.strictEqual(factoredDependencies.pNumVarViewFactory.getTypeToFactor(), "pNumVarView");
});

QUnit.test("testFactorPNumVarViewDependencies", function(assert) {
	this.spec.metadataIdUsedInData = "numVariableId";
	this.spec.cPresentation = this.getMetadataAsCoraData("pNumVarNumVariableId");
	let pNumVar = this.newPresentationFactory.factor(this.spec);

	let factoredDependencies = pNumVar.getDependencies().pNumVarViewFactory.getDependencies();

	assert.strictEqual(factoredDependencies.infoFactory.type, "infoFactory");
});
