/*
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

QUnit.module("managedGuiItemFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
				"metadataProvider" : this.metadataProvider,
				"pubSub" : CORATEST.pubSubSpy(),
				"textProvider" : CORATEST.textProviderStub(),
				"presentationFactory" : CORATEST.presentationFactorySpy(),
				"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
				"recordTypeProvider" :  CORATEST.recordTypeProviderStub(),
				"uploadManager" : CORATEST.uploadManagerSpy(),
				"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
				"pRepeatingElementFactory" : CORATEST.pRepeatingElementFactorySpy(),
				"managedGuiItemViewFactory": CORATEST.managedGuiItemViewFactorySpy()
		};
		this.spec = {
			"parentPath" : {},
			"cParentMetadata" : CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChild")),
			"cPresentation" : CORA.coraData(this.metadataProvider.getMetadataById("pVarTextVariableId")),
			"cPresentationMinimized" : CORA.coraData(this.metadataProvider
					.getMetadataById("pVarTextVariableIdOutput"))
		};
		this.managedGuiItemFactory = CORA.managedGuiItemFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.managedGuiItemFactory);
	assert.strictEqual(this.managedGuiItemFactory.type, "managedGuiItemFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.managedGuiItemFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var managedGuiItem = this.managedGuiItemFactory.factor(this.spec);
	assert.ok(managedGuiItem);
	assert.strictEqual(managedGuiItem.getDependencies(), this.dependencies);
});

QUnit.test("factorTestSpec", function(assert) {
	var managedGuiItem = this.managedGuiItemFactory.factor(this.spec);
	assert.ok(managedGuiItem);
	var managedGuiItemSpec = managedGuiItem.getSpec();
	assert.strictEqual(managedGuiItemSpec, this.spec);
});
