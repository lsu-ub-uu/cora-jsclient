/*
 * Copyright 2017, 2025 Uppsala University Library
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

QUnit.module("jsClient/jsClientViewTest.js", {
	beforeEach: function() {
		this.textProvider = CORATEST.textProviderSpy();
		this.providers = {
			textProvider: this.textProvider
		};
		this.dependencies = {
			messageHolderFactory: CORATEST.messageHolderFactorySpy()
		};
		this.spec = {
			name: "The Client",
			serverAddress: "http://epc.ub.uu.se/cora/rest/",
			reloadProvidersMethod: function() {
			},
			setLanguageMethod: function() {
			}
		};
	},
	afterEach: function() {
	}
});

QUnit.test("init", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	assert.strictEqual(jsClientView.type, "jsClientView");
	let mainView = jsClientView.getView();

	assert.strictEqual(mainView.modelObject, jsClientView);
});

QUnit.test("testGetProviders", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	assert.strictEqual(jsClientView.getProviders(), this.providers);
});

QUnit.test("testGetDependencies", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	assert.strictEqual(jsClientView.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	assert.strictEqual(jsClientView.getSpec(), this.spec);
});

QUnit.test("initCreatesMessageHolder", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	let messageHolder = this.dependencies.messageHolderFactory.getFactored(0);

	assert.strictEqual(jsClientView.getHeader().childNodes[1], messageHolder.getView());
});

QUnit.test("testMainLayout", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	let mainView = jsClientView.getView();
	assert.strictEqual(mainView.className, "jsClient mainView");

	let header = jsClientView.getHeader();
	assert.strictEqual(header.className, "header");
	assert.strictEqual(header, mainView.childNodes[0]);

	let sideBar = jsClientView.getSideBar();
	assert.strictEqual(sideBar.className, "sideBar");
	assert.strictEqual(sideBar, mainView.childNodes[1]);

	let serverAddress = sideBar.childNodes[2];
	assert.strictEqual(serverAddress.className, "serverAddress");
	assert.strictEqual(serverAddress.textContent, this.spec.serverAddress);

	let searchesView = jsClientView.getSearchesView();
	assert.strictEqual(searchesView.className, "searchesView");
	assert.strictEqual(searchesView, sideBar.childNodes[0]);

	let recordTypesView = jsClientView.getRecordTypesView();
	assert.strictEqual(recordTypesView.className, "recordTypesView");
	assert.strictEqual(recordTypesView, sideBar.childNodes[1]);

	let workArea = jsClientView.getWorkView();
	assert.strictEqual(workArea.className, "workArea");
	assert.strictEqual(workArea, mainView.childNodes[2]);


});

QUnit.test("testReloadProvidersButton", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	let mainView = jsClientView.getView();

	let header = jsClientView.getHeader();
	assert.strictEqual(header.childNodes.length, 6);
	let reloadProvidersButton = header.childNodes[2];
	assert.strictEqual(reloadProvidersButton.onclick, this.spec.reloadProvidersMethod);
	assert.strictEqual(reloadProvidersButton.textContent, "Ladda om");
});

QUnit.test("testReloadProvidersButtonStatus", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	let mainView = jsClientView.getView();

	let header = jsClientView.getHeader();
	assert.strictEqual(header.childNodes.length, 6);
	let reloadProvidersButton = header.childNodes[2];
	assert.strictEqual(reloadProvidersButton.className, "menuView");
	jsClientView.setReloadingProviders(true);
	assert.strictEqual(reloadProvidersButton.className, "menuView uploading");
	jsClientView.setReloadingProviders(false);
	assert.strictEqual(reloadProvidersButton.className, "menuView");
});

QUnit.test("testSetLanguageButton", function(assert) {
	let settedLang = "";
	this.spec.setLanguageMethod = function(lang) {
		settedLang = lang;
	};
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	let mainView = jsClientView.getView();

	let header = jsClientView.getHeader();
	assert.strictEqual(header.childNodes.length, 6);
	let languageChoice = header.childNodes[3];
	assert.strictEqual(languageChoice.type, "select-one");
	assert.strictEqual(languageChoice.options[0].value, "sv");
	assert.strictEqual(languageChoice.options[0].text, "sv");
	assert.strictEqual(languageChoice.options[1].value, "en");
	assert.strictEqual(languageChoice.options[1].text, "en");
	assert.strictEqual(languageChoice.options[2].value, "no");
	assert.strictEqual(languageChoice.options[2].text, "no");
	assert.strictEqual(languageChoice.options.length, 3);

	languageChoice.options[1].selected = true;
	languageChoice.onchange();
	assert.strictEqual(settedLang, "en");

	languageChoice.options[0].selected = true;
	languageChoice.onchange();
	assert.strictEqual(settedLang, "sv");
});

QUnit.test("testGetSpec", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	assert.strictEqual(jsClientView.getSpec(), this.spec);
});

QUnit.test("testAddToOpenGuiItemsView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	let aView = document.createElement("SPAN");
	jsClientView.addOpenGuiItemHandlerView(aView);

	let sideBar = jsClientView.getSideBar();
	assert.strictEqual(aView, sideBar.childNodes[0]);
});

QUnit.test("testSearchesViewHasHeadline", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	let searchesView = jsClientView.getSearchesView();

	let searchesViewFirstChild = searchesView.childNodes[0];
	assert.strictEqual(searchesViewFirstChild.nodeName, "DIV");
	assert.strictEqual(searchesViewFirstChild.className, "searchesViewHeadline");
	assert.strictEqual(searchesViewFirstChild.textContent, "translated_theClient_searchesHeadlineText");
});

QUnit.test("testAddToSearchesView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	let searchesView = jsClientView.getSearchesView();
	let aView = document.createElement("SPAN");

	jsClientView.addToSearchesView(aView);

	let searchesViewHeadline = searchesView.childNodes[1];
	assert.strictEqual(searchesViewHeadline, aView);
});

QUnit.test("testClearSearchesView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);

	let aView = document.createElement("SPAN");
	jsClientView.addToSearchesView(aView);

	let searchesView2 = jsClientView.getSearchesView();
	assert.strictEqual(searchesView2.childNodes.length, 2);

	jsClientView.clearSearchesView();

	assert.strictEqual(searchesView2.childNodes.length, 1);
});

QUnit.test("testAddToRecordTypesView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);

	let recordTypesView = jsClientView.getRecordTypesView();
	assert.strictEqual(recordTypesView.childNodes.length, 0);

	let someView = CORA.createSpanWithClassName("recordType");
	jsClientView.addToRecordTypesView(someView);

	let firstRecordType = recordTypesView.childNodes[0];
	assert.strictEqual(firstRecordType, someView);
	assert.strictEqual(firstRecordType.className, "recordType");
});

QUnit.test("testAddGroupOfRecordTypeToRecordTypesView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);

	let recordTypesView = jsClientView.getRecordTypesView();
	assert.strictEqual(recordTypesView.childNodes.length, 0);

	let someView = CORA.createSpanWithClassName("recordType");
	jsClientView.addGroupOfRecordTypesToView(someView);

	let firstRecordType = recordTypesView.childNodes[0];
	assert.strictEqual(firstRecordType, someView);
	assert.strictEqual(firstRecordType.className, "recordType");
});

QUnit.test("testClearRecordTypesView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);

	let someView = CORA.createSpanWithClassName("recordType");
	jsClientView.addToRecordTypesView(someView);

	let recordTypesView = jsClientView.getRecordTypesView();
	assert.strictEqual(recordTypesView.childNodes.length, 1);

	jsClientView.clearRecordTypesView();

	assert.strictEqual(recordTypesView.childNodes.length, 0);
});

QUnit.test("testAddWorkView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);

	let workView = jsClientView.getWorkView();
	assert.strictEqual(workView.childNodes.length, 0);

	let someView = CORA.createSpanWithClassName("recordType");
	jsClientView.addToWorkView(someView);

	let firstWorkView = workView.childNodes[0];
	assert.strictEqual(firstWorkView, someView);
	assert.strictEqual(firstWorkView.className, "recordType");
});

QUnit.test("testRemoveFromWorkView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);

	let workView = jsClientView.getWorkView();
	let someView = CORA.createSpanWithClassName("recordType");
	jsClientView.addToWorkView(someView);

	let firstWorkView = workView.childNodes[0];
	assert.strictEqual(firstWorkView, someView);

	jsClientView.removeFromWorkView(someView);

	let firstWorkView2 = workView.childNodes[0];
	assert.strictEqual(firstWorkView2, undefined);
});

QUnit.test("testAddLoginManagerView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);

	let someView = CORA.createSpanWithClassName("loginManagerView");
	jsClientView.addLoginManagerView(someView);

	assert.strictEqual(jsClientView.getHeader().childNodes[6], someView);
});

QUnit.test("testAddGlobalView", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);

	let someView = CORA.createSpanWithClassName("globalView");
	jsClientView.addGlobalView(someView);

	assert.strictEqual(jsClientView.getHeader().childNodes[6], someView);
});

QUnit.test("testSetInfoMessage", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);
	let timeout = 100;
	jsClientView.addInfoMessage("some info text", timeout);

		let messageHolder = this.dependencies.messageHolderFactory.getFactored(0);
		let expectedMessageSpec = {
			message : "some info text",
			type : CORA.message.INFO,
			timeout : timeout
		};
		assert.deepEqual(messageHolder.getCreatedMessageSpec(0), expectedMessageSpec);
});
QUnit.test("testSetErrorMessage", function(assert) {
	let jsClientView = CORA.jsClientView(this.providers, this.dependencies, this.spec);

	jsClientView.addErrorMessage("some error text");
	let messageHolder = this.dependencies.messageHolderFactory.getFactored(0);
	let expectedMessageSpec = {
		"message": "some error text",
		"type": CORA.message.ERROR
	};
	assert.stringifyEqual(messageHolder.getCreatedMessageSpec(0), expectedMessageSpec);
});
