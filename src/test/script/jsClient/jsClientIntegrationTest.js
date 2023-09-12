/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2017 Olov McKie
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

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.dependenciesFactory = function(metadataProvider, pubSub, textProvider) {
		var factor = function(metadataId, presentationId, metadataIdUsedInData) {
			let specDataHolder = {
				"metadataId": metadataId,
				"metadataProvider": metadataProvider,
				"pubSub": pubSub
			};
			let dataHolder = CORA.dataHolder(specDataHolder);
			let depJSBookkeeper = {
				"recordTypeProvider": CORATEST.recordTypeProviderSpy()
			};
			let specJSBookkeeper = {
				"metadataId": metadataId,
				"metadataProvider": metadataProvider,
				"pubSub": pubSub,
				"textProvider": textProvider,
				"dataHolder": dataHolder
			};
			let jsBookkeeper = CORA.jsBookkeeper(depJSBookkeeper, specJSBookkeeper);

			let specPresentationFactory = {
				"providers": {
					"metadataProvider": metadataProvider,
					"textProvider": textProvider,
				},
				"pubSub": pubSub,
				"jsBookkeeper": jsBookkeeper
			};
			let presentationFactory = CORA.presentationFactory(specPresentationFactory);

			let holderDependencies = {
				"metadataProvider": metadataProvider,
				"pubSub": pubSub,
				"textProvider": textProvider,
				"jsBookkeeper": jsBookkeeper,
				"presentationFactory": presentationFactory
			};
			let spec = {
				"presentationId": presentationId,
				"metadataIdUsedInData": metadataIdUsedInData,

			};
			let presentation = CORA.presentationHolder(holderDependencies, spec);

			let metadataChildAndRepeatInitializerDep = {
				recordTypeProvider: CORATEST.recordTypeProviderSpy(),
				metadataProvider: metadataProvider,
				pubSub: pubSub
			};

			let metadataChildAndRepeatInitializerFactory = CORA.metadataChildAndRepeatInitializerFactory(metadataChildAndRepeatInitializerDep);

			let specMetadataController = {
				"metadataId": metadataId,
				"data": undefined,
				recordPartPermissionCalculator: CORATEST.recordPartPermissionCalculatorSpy(),
				"metadataProvider": metadataProvider
			};
			let depMetadataController = {
				"recordTypeProvider": CORATEST.recordTypeProviderSpy(),
				metadataChildAndRepeatInitializerFactory: metadataChildAndRepeatInitializerFactory,
				metadataProvider: metadataProvider,
				pubSub: pubSub
			};
			let metadataController = CORA.metadataController(depMetadataController, specMetadataController);

			return Object.freeze({
				jsBookkeeper: jsBookkeeper,
				presentationFactory: presentationFactory,
				presentation: presentation,
				dataHolder: dataHolder,
				metadataController: metadataController
			});
		};
		return Object.freeze({
			factor: factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("jsClient/jsClientIntegrationTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORA.pubSub();
		this.textProvider = CORATEST.textProviderStub();
		this.pVarViewFactory = CORATEST.standardFactorySpy("pVarViewSpy");
		this.pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");

		this.dependenciesFactory = CORATEST.dependenciesFactory(this.metadataProvider, this.pubSub,
			this.textProvider);
	},
	afterEach: function() {
	}
});

QUnit.test("testIntegrateCoraPubSubPVar", function(assert) {
	let path = ["testVar"];

	let cPVarPresentation = CORA.coraData(this.metadataProvider
		.getMetadataById("pVarTextVariableIdOutput"));
	let dependencies = {
		"metadataProvider": this.metadataProvider,
		"pubSub": this.pubSub,
		"textProvider": this.textProvider,
		"pVarViewFactory": this.pVarViewFactory,
		pAttributesFactory: this.pAttributesFactory
	};
	let spec = {
		"path": path,
		"metadataIdUsedInData": "textVariableId",
		"cPresentation": cPVarPresentation
	};
	let pVar = CORA.pVar(dependencies, spec);

	pVar.setValue("A Value");
	let pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A Value");

	let type = "setValue";
	let data = {
		"data": "A new value",
		"path": path
	};
	this.pubSub.publish(type, data);

	assert.equal(pVarViewSpy.getValue(), "A new value");
});

QUnit.test("testIntegrateCoraPubSubDataHolderPresentationMetadataController", function(assert) {
	let metadataId = "groupIdOneTextChild";
	let presentationId = "pgGroupIdOneTextChild";
	let metadataIdUsedInData = "groupIdOneTextChild";

	let dependencies = this.dependenciesFactory.factor(metadataId, presentationId,
		metadataIdUsedInData);
	let presentation = dependencies.presentation;
	let dataHolder = dependencies.dataHolder;

	let view = presentation.getView();
	this.fixture.appendChild(view);

	let pGroupView = view.firstChild;
	let childRefHandler = pGroupView.childNodes[1];

	let pVarView = childRefHandler.firstChild.firstChild.firstChild;
	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId default");
	let input = pVarView.childNodes[1];
	assert.deepEqual(input.value, "");

	let path2 = ["textVariableId"];
	let data2 = {
		"path": path2,
		"data": "a Value"
	};
	this.pubSub.publish("setValue", data2);
	//	assert.deepEqual(input.value, "a Value");

	assert.deepEqual(dataHolder.getData(), {
		"children": [{
			"name": "textVariableId",
			"value": "a Value"
		}],
		"name": "groupIdOneTextChild"
	});
});

//QUnit.test("testIntegrateCoraPubSubDataHolderPresentationMetadataControllerTwoLevels", function(
//		assert) {
//	let metadataId = "groupInGroupOneTextChild";
//	let presentationId = "pgGroupInGroupIdOneTextOneTextChild";
//	let metadataIdUsedInData = "groupInGroupOneTextChild";
//
//	let dependencies = this.dependenciesFactory.factor(metadataId, presentationId,
//			metadataIdUsedInData);
//
//	let presentation = dependencies.presentation;
//	let dataHolder = dependencies.dataHolder;
//
//	let view = presentation.getView();
//	this.fixture.appendChild(view);
//
//	let topPGroupView = view.childNodes[0];
//
//	let childRefHandler1 = topPGroupView.childNodes[2];
//	let pGroupView = childRefHandler1.childNodes[0].firstChild.firstChild;
//	
//	let childRefHandler2 = pGroupView.childNodes[2];
//
//	let pVarView = childRefHandler2.firstChild.firstChild.firstChild;
//	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId default");
//	let input = pVarView.firstChild;
//	assert.deepEqual(input.value, "");
//
//	let path2 = ["groupIdOneTextChild","textVariableId"];
//	let data2 = {
//		"path" : path2, 
//		"data" : "a Value one level down"
//	};
//	this.pubSub.publish("setValue", data2);
//	assert.deepEqual(input.value, "a Value one level down");
//
//	assert.deepEqual(dataHolder.getData(), {
//		"children" : [ {
//			"children" : [ {
//				"name" : "textVariableId",
//				"value" : "a Value one level down"
//			} ],
//			"name" : "groupIdOneTextChild"
//		} ],
//		"name" : "groupInGroupOneTextChild"
//	});
//});
//
//QUnit.test("testIntegrateRepeatingContainer",
//		function(assert) {
//			let metadataId = "groupIdOneTextChildRepeat1to3";
//			let presentationId = "pgGroupIdRepeatingContainerRepeat1to3";
//			let metadataIdUsedInData = "groupIdOneTextChild";
//
//			let dependencies = this.dependenciesFactory.factor(metadataId, presentationId,
//					metadataIdUsedInData);
//
//			let presentation = dependencies.presentation;
//
//			let view = presentation.getView();
//			this.fixture.appendChild(view);
//
//			let topPGroupView = view.firstChild;
//			let headline = topPGroupView.childNodes[1];
//			assert.strictEqual(headline.textContent, "En rubrik");
//
//			let repeatingContainer = topPGroupView.childNodes[2];
//			assert.deepEqual(repeatingContainer.className,
//					"pChildRefHandler h2TextStyle fourChildStyle pTextVariableIdRContainer");
//
//			let childrenView = repeatingContainer.firstChild;
//			let repeatingElement = childrenView.firstChild;
//			let pVarView = repeatingElement.firstChild;
//			assert.deepEqual(pVarView.className,
//					"pRepeatingContainer pTextVariableIdRContainer default");
//		});
//
//QUnit.test("testIntegrateCoraPubSubDataHolderPresentationMetadataControllerSurroundingC", function(
//		assert) {
//	let metadataId = "groupIdTwoTextChildRepeat1to5";
//	let presentationId = "pgGroupIdTwoTextChildSurrounding2TextPGroup";
//	let metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
//
//	let dependencies = this.dependenciesFactory.factor(metadataId, presentationId,
//			metadataIdUsedInData);
//
//	let presentation = dependencies.presentation;
//
//	let view = presentation.getView();
//	this.fixture.appendChild(view);
//
//	let topPGroupView = view.firstChild;
//
//	let pNonRepeatingChildRefHandlerView = topPGroupView.childNodes[1];
//
//	let surroundingContainer = pNonRepeatingChildRefHandlerView.childNodes[0];
//
//	let headline = surroundingContainer.childNodes[1];
//	assert.strictEqual(headline.textContent, "En rubrik");
//
//	let childRefHandler1 = surroundingContainer.childNodes[2];
//	let childrenView = childRefHandler1.firstChild;
//	let repeatingElement = childrenView.firstChild;
//	let pVarView = repeatingElement.firstChild;
//	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId default");
//
//	let childRefHandler2 = surroundingContainer.childNodes[3];
//	let childrenView2 = childRefHandler2.firstChild;
//	let repeatingElement2 = childrenView2.firstChild;
//	let pVarView2 = repeatingElement2.firstChild;
//	assert.deepEqual(pVarView2.className, "pVar pVarTextVariableId2 default");
//});
//
// QUnit.test("testIntegrateSurroundingContainerInSurroundingContainer", function(assert) {
//	let metadataId = "groupIdTwoTextChildRepeat1to5";
//	let presentationId = "pgGroupIdTwoTextChildSurrounding2TextPGroup2";
//	let metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
//
//	let dependencies = this.dependenciesFactory.factor(metadataId, presentationId,
//			metadataIdUsedInData);
//
//	let presentation = dependencies.presentation;
//
//	let view = presentation.getView();
//	this.fixture.appendChild(view);
//
//	let topPGroupView = view.firstChild;
//	let pNonRepeatingChildRefHandlerView = topPGroupView.childNodes[1];
//
//	let surroundingContainer = pNonRepeatingChildRefHandlerView.childNodes[0];
//
//	let headline = surroundingContainer.childNodes[1];
//	assert.strictEqual(headline.textContent, "En rubrik");
//
//	let pNonRepeatingChildRefHandlerView2 = surroundingContainer.childNodes[2];
//
//	let surroundingContainerLevel2 = pNonRepeatingChildRefHandlerView2.childNodes[0];
//
//	let headline2 = surroundingContainerLevel2.childNodes[1];
//	assert.strictEqual(headline2.textContent, "En rubrik");
//
//	let childRefHandler1 = surroundingContainerLevel2.childNodes[2];
//	let childrenView = childRefHandler1.firstChild;
//	let repeatingElement = childrenView.firstChild;
//	let pVarView = repeatingElement.firstChild;
//	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId default");
//
//	let childRefHandler2 = surroundingContainerLevel2.childNodes[3];
//	let childrenView2 = childRefHandler2.firstChild;
//	let repeatingElement2 = childrenView2.firstChild;
//	let pVarView2 = repeatingElement2.firstChild;
//	assert.deepEqual(pVarView2.className, "pVar pVarTextVariableId2 default");
//});
