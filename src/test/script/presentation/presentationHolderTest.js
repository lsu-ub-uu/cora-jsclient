/*
 * Copyright 2016, 2018, 2020 Uppsala University Library
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
QUnit.module("presentation/presentationHolderTest.js", {
	beforeEach: function() {
		this.presentationFactory = CORATEST.standardFactorySpy("presentationSpy");

		this.dependencies = {
			"metadataProvider": new MetadataProviderStub(),
			"pubSub": CORATEST.pubSubSpy(),
			"textProvider": CORATEST.textProviderStub(),
			"presentationFactory": this.presentationFactory,
			"jsBookkeeper": CORATEST.jsBookkeeperSpy(),

		};
		this.recordPartPermissionCalculator = CORATEST.recordPartPermissionCalculatorSpy();
		this.spec = {
			"presentationId": "pgGroupIdOneTextChild",
			metadataIdUsedInData: "groupIdOneTextChild",
			recordPartPermissionCalculator: this.recordPartPermissionCalculator
		};

		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	let presentationHolder = CORA.presentationHolder(this.dependencies, this.spec);
	assert.strictEqual(presentationHolder.type, "presentationHolder");
});

QUnit.test("testGetSpec", function(assert) {
	let presentationHolder = CORA.presentationHolder(this.dependencies, this.spec);
	assert.strictEqual(presentationHolder.getSpec(), this.spec);
});

QUnit.test("testGetDependencies", function(assert) {
	let presentationHolder = CORA.presentationHolder(this.dependencies, this.spec);
	assert.strictEqual(presentationHolder.getDependencies(), this.dependencies);
});

QUnit.test("testFactorPresentationCheckSpec", function(assert) {
	CORA.presentationHolder(this.dependencies, this.spec);
	let factoredSpec = this.presentationFactory.getSpec(0);

	assert.strictEqual(factoredSpec.metadataIdUsedInData, this.spec.metadataIdUsedInData);
	assert.deepEqual(factoredSpec.path, []);

	let requestedCPresentation = factoredSpec.cPresentation;
	let recordInfo = requestedCPresentation.getFirstChildByNameInData("recordInfo");
	let presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");

	assert.strictEqual(presentationId, "pgGroupIdOneTextChild");

	assert.strictEqual(factoredSpec.recordPartPermissionCalculator,
		this.recordPartPermissionCalculator);

});

QUnit.test("testInitOneChild", function(assert) {
	let presentation = CORA.presentationHolder(this.dependencies, this.spec);

	let factoredPresentation = this.presentationFactory.getFactored(0);
	let firstPresentationAddedToView = presentation.getView().firstChild;

	assert.strictEqual(factoredPresentation.getView(), firstPresentationAddedToView);
	assert.strictEqual(presentation.getPresentationId(), "pgGroupIdOneTextChild");
	assert.ok(presentation.getPubSub());
});
