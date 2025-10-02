/*
 * Copyright 2016, 2018, 2020 Uppsala University Library
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
	coraTest.attachedPRepeatingContainerFactory = function(metadataProvider, pubSub, textProvider,
		presentationFactory, jsBookkeeper, fixture) {
		var factor = function(path, pRepeatingContainerId) {
			var cPRepeatingContainer = CORA.coraData(metadataProvider
				.getMetadataById(pRepeatingContainerId));
			var dependencies = {
				"metadataProvider": metadataProvider,
				"pubSub": pubSub,
				"textProvider": textProvider,
				"presentationFactory": presentationFactory,
				"jsBookkeeper": jsBookkeeper
			};
			var spec = {
				"path": path,
				"cPresentation": cPRepeatingContainer,
			};
			var pRepeatingContainer = CORA.pRepeatingContainer(dependencies, spec);
			var view = pRepeatingContainer.getView();
			fixture.appendChild(view);
			var valueView = view.firstChild;
			return {
				pRepeatingContainer: pRepeatingContainer,
				fixture: fixture,
				valueView: valueView,
				metadataProvider: metadataProvider,
				pubSub: pubSub,
				textProvider: textProvider,
				jsBookkeeper: jsBookkeeper,
				view: view
			};

		};
		return Object.freeze({
			factor: factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("presentation/pRepeatingContainerTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = CORATEST.MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		this.pRepeatingContainerFactory = CORATEST.attachedPRepeatingContainerFactory(
			this.metadataProvider, this.pubSub, this.textProvider, this.presentationFactory,
			this.jsBookkeeper, this.fixture);

		this.dependencies = {
			"metadataProvider": this.metadataProvider,
			"pubSub": this.pubSub,
			"textProvider": this.textProvider,
			"presentationFactory": this.presentationFactory,
			"jsBookkeeper": this.jsBookkeeper
		};
		this.pRepeatingContainerId = "pTextVariableIdRContainer";
		this.cPRepeatingContainer = CORA.coraData(this.metadataProvider
			.getMetadataById(this.pRepeatingContainerId));
		this.spec = {
			"path": [],
			"cPresentation": this.cPRepeatingContainer,
			presentationCounter: "5-55"
		};

	},
});

QUnit.test("testGetDependencies", function(assert) {
	var pRepeatingContainer = CORA.pRepeatingContainer(this.dependencies, this.spec);
	assert.strictEqual(pRepeatingContainer.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var pRepeatingContainer = CORA.pRepeatingContainer(this.dependencies, this.spec);
	assert.strictEqual(pRepeatingContainer.getSpec(), this.spec);
});
QUnit.test("testGetPresentationCounter", function(assert) {
	var pRepeatingContainer = CORA.pRepeatingContainer(this.dependencies, this.spec);
	assert.strictEqual(pRepeatingContainer.getPresentationCounter(), this.spec.presentationCounter);
});

QUnit.test("testInit",
	function(assert) {
		var attachedPRepeatingContainer = this.pRepeatingContainerFactory.factor({},
			"pTextVariableIdRContainer");
		assert.strictEqual(attachedPRepeatingContainer.pRepeatingContainer.type,
			"pRepeatingContainer");
		assert.deepEqual(attachedPRepeatingContainer.view.className, "pRepeatingContainer "
			+ "pTextVariableIdRContainer");
		var view = attachedPRepeatingContainer.view;
		assert.ok(view.modelObject === attachedPRepeatingContainer.pRepeatingContainer,
			"modelObject should be a pointer to the javascript object instance");
		assert.strictEqual(view.childNodes.length, 3);

		assert.strictEqual(view.childNodes[0].textContent, "En rubrik");

		var requestedCPresentation = this.presentationFactory.getSpec(1).cPresentation;
		var recordInfo = requestedCPresentation.getFirstChildByNameInData("recordInfo");

		var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		assert.strictEqual(presentationId, "pVarTextVariableIdOutput");
	});
