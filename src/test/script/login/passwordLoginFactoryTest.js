/*
 * Copyright 2019 Uppsala University Library
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

QUnit.module("login/passwordLoginFactoryTest.js", {
	beforeEach : function() {
		this.providers = {
			textProvider : CORATEST.textProviderSpy(),
		};
		this.globalFactories = {
//			ajaxCallFactory : CORATEST.standardFactorySpy("ajaxCallSpy"),
			recordGuiFactory : CORATEST.standardFactorySpy("recordGuiSpy"),
			managedGuiItemFactory : CORATEST.standardFactorySpy("managedGuiItemSpy")
		};
		this.dependencies = {
			providers : this.providers,
			globalFactories : this.globalFactories,
			metadataProvider: CORATEST.metadataProviderSpy()
		};

		this.spec = {
			metadataId : "someMetadataGroup",
			presentationId : "somePresentationGroup",
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	let passwordLoginFactory = CORA.passwordLoginFactory(this.dependencies);
	assert.strictEqual(passwordLoginFactory.type, "passwordLoginFactory");
});

QUnit.test("getDependencies", function(assert) {
	let passwordLoginFactory = CORA.passwordLoginFactory(this.dependencies);
	assert.strictEqual(passwordLoginFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	let passwordLoginFactory = CORA.passwordLoginFactory(this.dependencies);
	let passwordLogin = passwordLoginFactory.factor(this.spec);
	assert.strictEqual(passwordLogin.type, "passwordLogin");
});

QUnit.test("factorTestDependencies", function(assert) {
	let passwordLoginFactory = CORA.passwordLoginFactory(this.dependencies);
	let passwordLogin = passwordLoginFactory.factor(this.spec);
	
	
	let factoredDependencies = passwordLogin.getDependencies();
	assert.strictEqual(factoredDependencies.ajaxCallFactory, this.dependencies.globalFactories
		.ajaxCallFactory);
	assert.strictEqual(factoredDependencies.recordGuiFactory, this.dependencies.globalFactories
		.recordGuiFactory);
//	assert.strictEqual(factoredDependencies.managedGuiItemFactory,
//		this.dependencies.globalFactories.managedGuiItemFactory);
	
	assert.strictEqual(factoredDependencies.passwordLoginViewFactory.type, "passwordLoginViewFactory");
	let passwordLoginViewFactoryDep = factoredDependencies.passwordLoginViewFactory.getDependencies();
	assert.strictEqual(passwordLoginViewFactoryDep.textProvider, this.providers.textProvider);
});

