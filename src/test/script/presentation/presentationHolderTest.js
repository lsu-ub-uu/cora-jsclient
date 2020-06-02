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
//var CORATEST = (function(coraTest) {
//	"use strict";
//	coraTest.attachedPresentationFactory = function(metadataProvider, pubSub, textProvider,
//			presentationFactory, jsBookkeeper, fixture) {
//		let factor = function(presentationId) {
//			let dependencies = {
//					"metadataProvider" : metadataProvider,
//					"pubSub" : pubSub,
//					"textProvider" : textProvider,
//					"jsBookkeeper" : jsBookkeeper,
//					"presentationFactory" : presentationFactory,
//						
//				};
//			
//			let spec = {
//				"presentationId" : presentationId,
//				metadataIdUsedInData: "groupIdOneTextChild"
////				"metadataProvider" : metadataProvider,
////				"pubSub" : pubSub,
////				"textProvider" : textProvider,
////				"presentationFactory" : presentationFactory,
////				"jsBookkeeper" : jsBookkeeper
//
//			};
//			let presentation = CORA.presentationHolder(dependencies, spec);
//
//			let view = presentation.getView();
//			fixture.appendChild(view);
//			return {
//				presentation : presentation,
//				fixture : fixture,
//				metadataProvider : metadataProvider,
//				pubSub : pubSub,
//				textProvider : textProvider,
//				view : view
//			};
//
//		};
//		return Object.freeze({
//			factor : factor
//		});
//	};
//
//	return coraTest;
//}(CORATEST || {}));

QUnit.module("presentation/presentationHolderTest.js", {
	beforeEach : function() {
		this.presentationFactory = CORATEST.standardFactorySpy("presentationSpy");

		this.dependencies = {
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"presentationFactory" : this.presentationFactory,
			"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
				
		};
		this.spec = {
			"presentationId" : "pgGroupIdOneTextChild",
			metadataIdUsedInData: "groupIdOneTextChild",
			unfulfilledRecordPartConstraints : {
				read : [],
				write : []
			}
		};

		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
//		this.newAttachedPresentation = CORATEST.attachedPresentationFactory(this.metadataProvider,
//				this.pubSub, this.textProvider, this.presentationFactory, this.jsBookkeeper,
//				this.fixture);
	},
	afterEach : function() {
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
	assert.deepEqual(factoredSpec.path, {});

	let requestedCPresentation = factoredSpec.cPresentation;
	let recordInfo = requestedCPresentation.getFirstChildByNameInData("recordInfo");
	let presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
	
	assert.strictEqual(presentationId, "pgGroupIdOneTextChild");
	
	assert.strictEqual(factoredSpec.unfulfilledRecordPartConstraints, this.spec.unfulfilledRecordPartConstraints);
	
});

QUnit.test("testInitOneChild", function(assert) {
	let presentation = CORA.presentationHolder(this.dependencies, this.spec);
	
	let factoredPresentation = this.presentationFactory.getFactored(0);
	let firstPresentationAddedToView = presentation.getView().firstChild;

	assert.strictEqual(factoredPresentation.getView(), firstPresentationAddedToView) ;
	assert.strictEqual(presentation.getPresentationId(), "pgGroupIdOneTextChild");
	assert.ok(presentation.getPubSub());
});

//QUnit.test("testInitOneChildWithUnfulfilledConstraints", function(assert) {
//	let presentation = CORA.presentationHolder(this.dependencies, this.spec);
//
//	let requestedCPresentation = this.presentationFactory.getSpec(0).cPresentation;
//	let recordInfo = requestedCPresentation.getFirstChildByNameInData("recordInfo");
//
//	let presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
//	assert.strictEqual(presentationId, "pgGroupIdOneTextChild");
//});