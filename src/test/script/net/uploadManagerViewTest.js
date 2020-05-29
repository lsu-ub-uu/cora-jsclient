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

QUnit.module("net/uploadManagerViewTest.js", {
	beforeEach : function() {
		var item = {};
		var textProvider = CORATEST.textProviderStub();
		this.spec = {
			"textProvider" : textProvider
		};
		function showWorkViewMethod(itemIn) {
			item = itemIn;
		}
		this.getSetItem = function() {
			return item;
		}

	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var uploadManagerView = CORA.uploadManagerView(this.spec);
	assert.strictEqual(uploadManagerView.type, "uploadManagerView");
	assert.ok(uploadManagerView);
});
QUnit.test("testGetSpec", function(assert) {
	var uploadManagerView = CORA.uploadManagerView(this.spec);
	assert.strictEqual(uploadManagerView.getSpec(), this.spec);
});

QUnit.test("testGetMenuView", function(assert) {
	var uploadManagerView = CORA.uploadManagerView(this.spec);
	var menuView = uploadManagerView.getMenuView();
	assert.strictEqual(menuView.className, "menuView");
	assert.strictEqual(menuView.nodeName, "SPAN");
	assert.strictEqual(menuView.textContent, this.spec.textProvider
			.getTranslation("theClient_uploadMenuText"));
});

QUnit.test("testGetWorkView", function(assert) {
	var uploadManagerView = CORA.uploadManagerView(this.spec);
	var workView = uploadManagerView.getWorkView();
	assert.strictEqual(workView.className, "workView");
	assert.strictEqual(workView.nodeName, "SPAN");
	assert.strictEqual(workView.firstChild.className, "indexOrders");
});

QUnit.test("addFile", function(assert) {
	var uploadManagerView = CORA.uploadManagerView(this.spec);

	var workView = uploadManagerView.getWorkView();

	assert.strictEqual(workView.children.length, 1);
	var uploadItem = uploadManagerView.addFile("name1");
	assert.strictEqual(workView.children.length, 2);
	var uploadItem = uploadManagerView.addFile("name1");
	assert.ok(uploadItem);
	assert.ok(uploadItem.progressMethod);
	assert.ok(uploadItem.progress);
	assert.strictEqual(uploadItem.progress.nodeName, "PROGRESS");
	assert.ok(uploadItem.errorMethod);
	assert.ok(uploadItem.timeoutMethod);
});

QUnit.test("progressEvent", function(assert) {
	var uploadManagerView = CORA.uploadManagerView(this.spec);
	var uploadItem = uploadManagerView.addFile("name1");
	var event = {
		"lengthComputable" : false
	};
	uploadItem.progressMethod(event);
	assert.strictEqual(uploadItem.progress.value, 0);

	var event2 = {
		"lengthComputable" : true,
		"total" : 100,
		"loaded" : 50
	};
	uploadItem.progressMethod(event2);
	assert.strictEqual(uploadItem.progress.value, 50);
});

QUnit.test("activateDeactivate", function(assert) {
	var uploadManagerView = CORA.uploadManagerView(this.spec);

	var menuView = uploadManagerView.getMenuView();

	assert.strictEqual(menuView.className, "menuView");
	uploadManagerView.activate();
	assert.strictEqual(menuView.className, "menuView uploading");
	uploadManagerView.deactivate();
});
