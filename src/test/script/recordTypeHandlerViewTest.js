/*
 * Copyright 2016 Uppsala University Library
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

import CORA from "../../main/webapp/script/aCoraNameSpace.js";
import CORATESTHELPER from "./aCoratestHelperNameSpace.js";
"use strict";

QUnit.module("recordTypeHandlerViewTest.js", {
	beforeEach : function() {
		this.dependencies = {};
		this.spec = {
			"headerText" : "some text",
			"fetchListMethod" : function() {
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testType", function(assert) {
	var recordTypeHandlerView = CORA.recordTypeHandlerView(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandlerView.type, "recordTypeHandlerView");
});

QUnit.test("testGetDependencies", function(assert) {
	var recordTypeHandlerView = CORA.recordTypeHandlerView(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandlerView.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var recordTypeHandlerView = CORA.recordTypeHandlerView(this.dependencies, this.spec);
	assert.strictEqual(recordTypeHandlerView.getSpec(), this.spec);
});

QUnit.test("testHeaderText", function(assert) {
	var recordTypeHandlerView = CORA.recordTypeHandlerView(this.dependencies, this.spec);
	var view = recordTypeHandlerView.getView();
	assert.strictEqual(view.className, "recordType");
	
	var header = view.firstChild;
	assert.strictEqual(header.textContent, "some text");
});

QUnit.test("initHeaderClickableAsWeHaveAFetchListMethod", function(assert) {
	var recordTypeHandlerView = CORA.recordTypeHandlerView(this.dependencies, this.spec);
	var view = recordTypeHandlerView.getView();

	var header = view.firstChild;
	assert.strictEqual(header.className, "header clickable");
	assert.strictEqual(header.onclick, this.spec.fetchListMethod);
});

QUnit.test("initHeaderNotClickableAsWeDoNotHaveAFetchListMethod", function(assert) {
	this.spec.fetchListMethod = undefined;
	var recordTypeHandlerView = CORA.recordTypeHandlerView(this.dependencies, this.spec);
	var view = recordTypeHandlerView.getView();
	
	var header = view.firstChild;
	assert.strictEqual(header.className, "header");
	assert.strictEqual(header.onclick, null);
});


QUnit.test("initWithCreateButtonAsWeHaveACreateNewMethod", function(assert) {
	var createNewMethodIsCalled = false;
	var createNewRecordCalled;
	function createNewMethod(createNewRecord) {
		createNewRecordCalled = createNewRecord;
		createNewMethodIsCalled = true;
	}
	this.spec.createNewMethod = createNewMethod;
	var recordTypeHandlerView = CORA.recordTypeHandlerView(this.dependencies, this.spec);

	var view = recordTypeHandlerView.getView();

	var buttonView = view.childNodes[1];
	var createButton = buttonView.childNodes[0];
	assert.strictEqual(buttonView.className, "buttonView");
	assert.strictEqual(createButton.className, "iconButton createButton");

	CORATESTHELPER.simulateOnclick(createButton);
	
	assert.strictEqual(createNewRecordCalled, "true");
	assert.strictEqual(createNewMethodIsCalled, true);
});

export {};
