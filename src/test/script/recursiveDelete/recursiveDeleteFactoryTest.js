/*
 * Copyright 2024 Uppsala University Library
 * Copyright 2023 Olov McKie
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

QUnit.module("recursiveDelete/recursiveDeleteFactoryTest.js", hooks => {
	const test = QUnit.test;
	let providers;
	let globalFactories;
	let dependencies;
	let spec;
	let recursiveDeleteFactory;

	hooks.beforeEach(() => {
		providers = {
			recordTypeProvider: CORATEST.recordTypeProviderSpy(),
			textProvider: CORATEST.textProviderSpy(),
			metadataProvider: CORATEST.metadataProviderSpy(),
			searchProvider: CORATEST.searchProviderSpy(),
			clientInstanceProvider: CORATEST.clientInstanceProviderSpy()
		};
		globalFactories = {
			ajaxCallFactory: CORATEST.standardFactorySpy("ajaxCallSpy")
		};
		dependencies = {
			globalFactories: globalFactories
		};
		spec = {
			jsClient: CORATEST.jsClientSpy(),
			someKey: "someValue"
		};
		recursiveDeleteFactory = CORA.recursiveDeleteFactory(providers, dependencies);
	});
	hooks.afterEach(() => {
		//no afterEach
	});

	test("init", function(assert) {
		assert.strictEqual(recursiveDeleteFactory.type, "recursiveDeleteFactory");
	});

	test("testOnlyForTestGetProviders", function(assert) {
		assert.strictEqual(recursiveDeleteFactory.onlyForTestGetProviders(), providers);
	});

	test("testOnlyForTestGetDependencies", function(assert) {
		assert.strictEqual(recursiveDeleteFactory.onlyForTestGetDependencies(), dependencies);
	});

	test("factorTestType", function(assert) {
		let recursiveDelete = recursiveDeleteFactory.factor(spec);

		assert.strictEqual(recursiveDelete.type, "recursiveDelete");
	});

	test("factorTestProviders", function(assert) {
		let recursiveDelete = recursiveDeleteFactory.factor(spec);

		assert.strictEqual(recursiveDelete.onlyForTestGetProviders(), providers);
	});

	test("factorTestDependencies", function(assert) {
		let recursiveDelete = recursiveDeleteFactory.factor(spec);

		assert.deepEqual(recursiveDelete.onlyForTestGetDependencies().view.type,
			"recursiveDeleteView");
		assert.deepEqual(recursiveDelete.onlyForTestGetDependencies().ajaxCallFactory,
			globalFactories.ajaxCallFactory);
		assert.deepEqual(recursiveDelete.onlyForTestGetDependencies().deleteDeleter.type,
			"recursiveDeleteDeleter");
	});

	test("factorTestDependenciesForDeleteDeleter", function(assert) {
		let recursiveDelete = recursiveDeleteFactory.factor(spec);

		let deleteDeleter = recursiveDelete.onlyForTestGetDependencies().deleteDeleter;
		let deleteDeleterDep = deleteDeleter.onlyForTestGetDependencies();
		let deleteDeleterSpec = deleteDeleter.onlyForTestGetSpec();

		assert.strictEqual(deleteDeleter.type, "recursiveDeleteDeleter");
		assert.strictEqual(deleteDeleterDep.view.type, "recursiveDeleteView");
		assert.strictEqual(deleteDeleterSpec.baseRestUrl, "whatt");

		//	assert.deepEqual(recursiveDelete.onlyForTestGetDependencies().view.type,
		//		"recursiveDeleteView");
		//	assert.deepEqual(recursiveDelete.onlyForTestGetDependencies().ajaxCallFactory,
		//		globalFactories.ajaxCallFactory);
		//	assert.deepEqual(recursiveDelete.onlyForTestGetDependencies().deleteDeleter.type,
		//		"recursiveDeleteDeleter");
	});

	test("factorTestSpec", function(assert) {
		let recursiveDelete = recursiveDeleteFactory.factor(spec);

		assert.deepEqual(recursiveDelete.onlyForTestGetSpec(), spec);
	});
});
