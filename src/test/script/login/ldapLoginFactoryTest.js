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

QUnit.module("login/ldapLoginFactoryTest.js", {
	beforeEach : function() {
		this.providers = {
			"textProvider" : CORATEST.textProviderSpy(),
		};
		this.globalFactories = {
			"ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy"),
			"recordGuiFactory" : CORATEST.standardFactorySpy("recordGuiSpy"),
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy")
		};
		this.dependencies = {
			"providers" : this.providers,
			"globalFactories" : this.globalFactories

		};
		this.spec = {
			"metadataId" : "someMetadataGroup",
			"presentationId" : "somePresentationGroup",
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var ldapLoginFactory = CORA.ldapLoginFactory(this.dependencies);
	assert.strictEqual(ldapLoginFactory.type, "ldapLoginFactory");
});

QUnit.test("getDependencies", function(assert) {
	var ldapLoginFactory = CORA.ldapLoginFactory(this.dependencies);
	assert.strictEqual(ldapLoginFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	var ldapLoginFactory = CORA.ldapLoginFactory(this.dependencies);
	var ldapLogin = ldapLoginFactory.factor(this.spec);
	assert.strictEqual(ldapLogin.type, "ldapLogin");
});

