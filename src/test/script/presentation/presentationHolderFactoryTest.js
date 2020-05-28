/*
 * Copyright 2016, 2017, 2018, 2020 Uppsala University Library
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
QUnit.module("presentationHolderFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
		};
		this.spec = {
			"presentationId" : "pgGroupIdOneTextChild",
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"presentationFactory" : CORATEST.standardFactorySpy("presentationSpy"),
			"jsBookkeeper" : CORATEST.jsBookkeeperSpy()

		};
		this.presentationHolderFactory = CORA.presentationHolderFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	let presentationHolderFactory = CORA.presentationHolderFactory(this.dependencies);
	assert.strictEqual(presentationHolderFactory.type, "presentationHolderFactory");
});

QUnit.test("testGetDependencies", function(assert) {
	let presentationHolderFactory = CORA.presentationHolderFactory(this.dependencies);
	assert.strictEqual(presentationHolderFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	let presentationHolder = this.presentationHolderFactory.factor(this.spec);
	assert.strictEqual(presentationHolder.type, "presentationHolder");
});

QUnit.test("testFactorSpec", function(assert) {
	let presentationHolder = this.presentationHolderFactory.factor(this.spec);
	assert.strictEqual(presentationHolder.getSpec(), this.spec);
});
