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

QUnit.module("incomingLinksListHandlerViewTest.js", {
	beforeEach : function() {
		this.dependencies = {};
		this.spec = {
			"ofText" : "av",
			"fromNo" : "1",
			"toNo" : "15",
			"totalNo" : "1520000",
			"resultHandler" : CORATEST.resultHandlerSpy()
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
			this.spec);
	assert.strictEqual(incomingLinksListHandlerView.type, "incomingLinksListHandlerView");
});

QUnit.test("testGetDependencies", function(assert) {
	var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
			this.spec);
	assert.strictEqual(incomingLinksListHandlerView.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
			this.spec);
	assert.strictEqual(incomingLinksListHandlerView.getSpec(), this.spec);
});

QUnit.test("testGetView", function(assert) {
	var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
			this.spec);
	var view = incomingLinksListHandlerView.getView();
	assert.strictEqual(view.nodeName, "SPAN");
	assert.strictEqual(view.className, "incomingLinksList");
});
//
// QUnit.test("testInfoPartOfView", function(assert) {
// var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
// this.spec);
// var infoHolder = incomingLinksListHandlerView.getView().firstChild;
// assert.strictEqual(infoHolder.nodeName, "SPAN");
// assert.strictEqual(infoHolder.className, "infoHolder");
// });
//
// QUnit.test("testInfoPartContainsInfo", function(assert) {
// var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
// this.spec);
// var infoHolder = incomingLinksListHandlerView.getView().firstChild;
// assert.strictEqual(infoHolder.textContent, "1 - 15 av 1520000");
// });

QUnit.test("testResultsPartOfView", function(assert) {
	var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
			this.spec);
	var incomingLinksList = incomingLinksListHandlerView.getView().childNodes[0];
	assert.strictEqual(incomingLinksList.nodeName, "SPAN");
	assert.strictEqual(incomingLinksList.className, "incomingLinks");
});

QUnit.test("testAddIncomingLink", function(assert) {
	var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
			this.spec);
	var incomingLinksList = incomingLinksListHandlerView.getView().childNodes[0];
	var readLink = {
		"requestMethod" : "GET",
		"rel" : "read",
		"url" : "http://localhost:8080/therest/rest/record/presentationGroup/recordTypeFormPGroup",
		"accept" : "application/vnd.uub.record+json"
	};
	var incomingLink = {
		"linkedRecordType" : "recordType",
		"linkedRecordId" : "recordId",
		"readLink" : readLink
	};
	incomingLinksListHandlerView.addIncomingLink(incomingLink);

	var incomingLink = incomingLinksList.firstChild;

	assert.strictEqual(incomingLink.nodeName, "SPAN");
	assert.strictEqual(incomingLink.className, "incomingLink");

	assert.strictEqual(incomingLink.firstChild.nodeName, "SPAN");
	assert.strictEqual(incomingLink.firstChild.className, "recordType");
	assert.strictEqual(incomingLink.firstChild.textContent, "recordType");

	assert.strictEqual(incomingLink.childNodes[1].nodeName, "SPAN");
	assert.strictEqual(incomingLink.childNodes[1].className, "recordId");
	assert.strictEqual(incomingLink.childNodes[1].textContent, "recordId");

});

// QUnit.test("testAddChildPresentationClickable", function(assert) {
// var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
// this.spec);
// var incomingLinksList = incomingLinksListHandlerView.getView().childNodes[1];
// var childToAdd = document.createElement("span");
// var record = {};
// incomingLinksListHandlerView.addChildPresentation(childToAdd, record);
//
// var firstListItem = incomingLinksList.firstChild;
// var event = document.createEvent('Event');
// firstListItem.onclick(event);
//
// var firstOpenInfo = this.spec.resultHandler.getOpenedRecord(0);
// assert.strictEqual(firstOpenInfo.record, record);
// assert.strictEqual(firstOpenInfo.loadInBackground, "false");
// });
//
// QUnit.test("testAddChildPresentationClickableLoadInBackground", function(assert) {
// var incomingLinksListHandlerView = CORA.incomingLinksListHandlerView(this.dependencies,
// this.spec);
// var incomingLinksList = incomingLinksListHandlerView.getView().childNodes[1];
// var childToAdd = document.createElement("span");
// var record = {};
// incomingLinksListHandlerView.addChildPresentation(childToAdd, record);
//
// var firstListItem = incomingLinksList.firstChild;
// var event = document.createEvent('Event');
// event.ctrlKey = true;
// firstListItem.onclick(event);
//
// var firstOpenInfo = this.spec.resultHandler.getOpenedRecord(0);
// assert.strictEqual(firstOpenInfo.record, record);
// assert.strictEqual(firstOpenInfo.loadInBackground, "true");
// });

