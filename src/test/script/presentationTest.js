/*
 * Copyright 2016 Uppsala University Library
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
	coraTest.attachedPresentationFactory = function(metadataProvider, pubSub, textProvider,
			presentationFactory, jsBookkeeper, fixture) {
		var factor = function(presentationId) {

			var spec = {
				"presentationId" : presentationId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"presentationFactory" : presentationFactory,
				"jsBookkeeper" : jsBookkeeper

			};
			var presentation = CORA.presentation(spec);

			var view = presentation.getView();
			fixture.appendChild(view);
			return {
				presentation : presentation,
				fixture : fixture,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				textProvider : textProvider,
				view : view
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("CORA.Presentation", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.presentationFactory = CORATEST.presentationFactorySpy();
		this.newAttachedPresentation = CORATEST.attachedPresentationFactory(this.metadataProvider,
				this.pubSub, this.textProvider, this.presentationFactory, this.jsBookkeeper,
				this.fixture);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var attachedPresentation = this.newAttachedPresentation.factor("pgGroupIdOneTextChild");
	var presentation = attachedPresentation.presentation;
	assert.strictEqual(presentation.getPresentationId(), "pgGroupIdOneTextChild");
	assert.ok(presentation.getPubSub());
});

QUnit.test("testInitOneChild", function(assert) {
	var attachedPresentation = this.newAttachedPresentation.factor("pgGroupIdOneTextChild");
	var presentation = attachedPresentation.presentation;
	var view = presentation.getView();

	var requestedCPresentation = this.presentationFactory.getCPresentation();
	var recordInfo = requestedCPresentation.getFirstChildByNameInData("recordInfo");

	var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
	assert.strictEqual(presentationId, "pgGroupIdOneTextChild");
});