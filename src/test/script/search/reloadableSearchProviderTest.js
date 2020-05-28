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

QUnit.module("search/reloadableSearchProviderTest.js",
		{
			beforeEach : function() {
				var methodToCall = {};
				var searchRecordListLink = {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/search/",
					"accept" : "application/vnd.uub.recordList+json"
				};

				this.spec = {
					"searchRecordListLink" : searchRecordListLink
				};
				this.dependencies = {
					"searchProviderFactory" : CORATEST.standardFactorySpy("searchProviderSpy")
				};

				this.reloadableSearchProvider = CORA.reloadableSearchProvider(this.dependencies,
						this.spec);
			},
			afterEach : function() {
			}
		});

QUnit.test("init", function(assert) {
	assert.ok(this.reloadableSearchProvider);
	assert.strictEqual(this.reloadableSearchProvider.type, "reloadableSearchProvider");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.reloadableSearchProvider.getDependencies(), this.dependencies);
});

QUnit.test("getSpec", function(assert) {
	assert.strictEqual(this.reloadableSearchProvider.getSpec(), this.spec);
});

QUnit.test("initFactorsFirstSearchProviderWithSpec", function(assert) {
	var firstFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(0);
	assert.ok(firstFactoredSearchProvider);
	var forwardedSpec = this.dependencies.searchProviderFactory.getSpec(0);
	assert.strictEqual(forwardedSpec.searchRecordListLink, this.spec.searchRecordListLink);
	assert.strictEqual(forwardedSpec.callWhenReady, this.spec.callWhenReady);
});

QUnit.test("testGetSearchByIdForwardedToFactoredProvider", function(assert) {
	var firstFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(0);
	var search = this.reloadableSearchProvider.getSearchById("someSearch");

	assert.strictEqual(firstFactoredSearchProvider.getFetchedSearchIdNo(0), "someSearch");
});

QUnit.test("testGetGetSearchByIdAnswerReturnedFromFactoredProvider", function(assert) {
	var firstFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(0);
	var search = this.reloadableSearchProvider.getSearchById("someSearch");

	assert.stringifyEqual(firstFactoredSearchProvider.getSearchById("someSearch"), search);
});

QUnit.test("testGetAllSearchesForwardedToFactoredProvider", function(assert) {
	var firstFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(0);
	assert.strictEqual(firstFactoredSearchProvider.getAllSearchesFetchedNo(), 0);
	var search = this.reloadableSearchProvider.getAllSearches();

	assert.strictEqual(firstFactoredSearchProvider.getAllSearchesFetchedNo(), 1);
});

QUnit.test("testGetGetAllSearchesAnswerReturnedFromFactoredProvider", function(assert) {
	var firstFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(0);
	var search = this.reloadableSearchProvider.getAllSearches ();

	assert.stringifyEqual(firstFactoredSearchProvider.getAllSearches(), search);
});

QUnit.test("testGetSearchesByGroupIdForwardedToFactoredProvider", function(assert) {
	var firstFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(0);
	assert.strictEqual(firstFactoredSearchProvider.getSearchesByGroupIdFetchedNo(), 0);
	var search = this.reloadableSearchProvider.getSearchesByGroupId("someGroupId");

	assert.strictEqual(firstFactoredSearchProvider.getSearchesByGroupIdFetchedNo(), 1);
	assert.strictEqual(firstFactoredSearchProvider.getGroupId(), "someGroupId");
});

QUnit.test("testGetGetSearchesByGroupIdAnswerReturnedFromFactoredProvider", function(assert) {
	var firstFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(0);
	var search = this.reloadableSearchProvider.getSearchesByGroupId("someGroupId");

	assert.stringifyEqual(firstFactoredSearchProvider.getSearchesByGroupId("someGroupId"), search);
});

QUnit.test("testReloadCreatesNewSearchProvider", function(assert) {
	var firstFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(0);
	var secondFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(1);
	assert.strictEqual(secondFactoredSearchProvider, undefined);
	var methodToCall = {};
	this.reloadableSearchProvider.reload(methodToCall);
	secondFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(1);
	assert.ok(secondFactoredSearchProvider);
});

QUnit.test("testReloadCreatesNewSearchProviderWithSpec", function(assert) {
	this.reloadableSearchProvider.reload({});
	var forwardedSpec = this.dependencies.searchProviderFactory.getSpec(1);
	assert.strictEqual(forwardedSpec.searchRecordListLink, this.spec.searchRecordListLink);
	assert.strictEqual(forwardedSpec.callWhenReady, this.reloadableSearchProvider.switchProvider);
});

QUnit.test("testMethodToCallCalledAfterSwitch", function(assert) {
	var called = false;
	function methodToCall() {
		called = true;
	}
	this.reloadableSearchProvider.reload(methodToCall);
	this.reloadableSearchProvider.switchProvider();
	assert.ok(called);
});

QUnit.test("testGetTranslationForwardedToSecondFactoredProviderAfterSwitchProvider", function(
		assert) {
	this.reloadableSearchProvider.reload(function() {
	});
	this.reloadableSearchProvider.switchProvider();
	var secondFactoredSearchProvider = this.dependencies.searchProviderFactory.getFactored(1);
	var translation = this.reloadableSearchProvider.getSearchById("someSearch");

	assert.strictEqual(secondFactoredSearchProvider.getFetchedSearchIdNo(0), "someSearch");
});
