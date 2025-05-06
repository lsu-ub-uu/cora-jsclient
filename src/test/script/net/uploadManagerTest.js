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

QUnit.module("net/uploadManagerTest.js", {
	beforeEach : function() {
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		var textProvider = CORATEST.textProviderStub();
		var dependencies = {
			"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy(),
			"ajaxCallFactory" : this.ajaxCallFactorySpy,
			"textProvider" : textProvider,
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy")
		};
		this.dependencies = dependencies;

		var jsClient = {
			showView : function() {
			},
			addGlobalView : function() {
			}
		}

		var spec = {
			"showView" : function() {
			}
		};
		this.spec = spec;

		this.uploadManager = CORA.uploadManager(dependencies, spec);
		var uploadLink = CORATEST.createUploadLink();
		this.file = CORATEST.createFileForUpload();
		this.uploadSpec = {
			"uploadLink" : uploadLink,
			"file" : this.file
		}
		this.assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy) {
			var ajaxCallSpec = ajaxCallSpy.getSpec();
			assert.strictEqual(ajaxCallSpec.url, "http://localhost:8080/therest/rest/record/"
					+ "image/image:333759270435575/upload");
			assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
			assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.record+json");
			assert.strictEqual(ajaxCallSpec.loadMethod, this.uploadManager.uploadFinished);
			assert.strictEqual(ajaxCallSpec.data.get("file"), this.file);
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.uploadManager.type, "uploadManager");
});

QUnit.test("testGetDependencies", function(assert) {
	assert.strictEqual(this.uploadManager.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	assert.strictEqual(this.uploadManager.getSpec(), this.spec);
});

QUnit.test("testShowView", function(assert) {
	var x = {};
	this.uploadManager.showView(x);
	var viewSpec = this.uploadManager.view.getSpec();
	assert.strictEqual(this.dependencies.clientInstanceProvider.getJsClient()
			.getViewShowingInWorkView(0), x);
});
QUnit.test("testInitCreatesView", function(assert) {
	var viewSpec = this.uploadManager.view.getSpec();
	// assert.strictEqual(viewSpec.showWorkViewMethod, this.dependencies.clientInstanceProvider
	// .getJsClient().showView);
	assert.strictEqual(viewSpec.showWorkViewMethod, this.uploadManager.showView);
});

QUnit.test("testInitCreatesManagedGuiItem", function(assert) {
	var factoredManagedGuiItemSpec = this.dependencies.managedGuiItemFactory.getSpec(0);
	// assert.strictEqual(factoredManagedGuiItemSpec.activateMethod,
	// this.dependencies.clientInstanceProvider.getJsClient().showView);
	assert.strictEqual(factoredManagedGuiItemSpec.activateMethod, this.uploadManager.showView);
	assert.strictEqual(factoredManagedGuiItemSpec.disableRemove, "true");
});

QUnit.test("testInitAddsViewsToManagedGuiItem", function(assert) {
	var factoredManagedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	// should realy be a view factory
	var uploadManagerView = this.uploadManager.view;
	assert.strictEqual(factoredManagedGuiItem.getAddedMenuPresentation(0), uploadManagerView
			.getMenuView());
	assert.strictEqual(factoredManagedGuiItem.getAddedWorkPresentation(0), uploadManagerView
			.getWorkView());
});

QUnit.test("testGetManagedGuiItem", function(assert) {
	assert.strictEqual(this.uploadManager.getManagedGuiItem(),
			this.dependencies.managedGuiItemFactory.getFactored(0));
});

QUnit.test("testUpload", function(assert) {

	var uploadManager = this.uploadManager;

	uploadManager.upload(this.uploadSpec);

	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);
});

var CORATEST = (function(coraTest) {
	coraTest.createUploadLink = function() {
		return {
			"requestMethod" : "POST",
			"rel" : "upload",
			"contentType" : "multipart/form-data",
			"url" : "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload",
			"accept" : "application/vnd.cora.record+json"
		};
	};
	coraTest.createFileForUpload = function() {
		// ie does not have new File
		// return new File([ "" ], "filename.txt", {
		// type : "text/plain",
		// lastModified : new Date()
		// });
		return "";
	};

	return coraTest;
}(CORATEST || {}));

QUnit.test("testUploadQue", function(assert) {
	var uploadManager = this.uploadManager;
	var menuView = this.uploadManager.view.getMenuView();
	assert.strictEqual(menuView.className, "upload");

	uploadManager.upload(this.uploadSpec);

	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);

	assert.strictEqual(menuView.className, "upload uploading");

	uploadManager.upload(this.uploadSpec);
	assert.strictEqual(this.ajaxCallFactorySpy.getFactored(1), undefined);
	uploadManager.uploadFinished();

	var ajaxCallSpy1 = this.ajaxCallFactorySpy.getFactored(1);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy1);

	uploadManager.uploadFinished();
	assert.strictEqual(menuView.className, "upload");
});

QUnit.test("testUploadError", function(assert) {
	var uploadManager = this.uploadManager;
	uploadManager.upload(this.uploadSpec);
	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy0.getSpec().errorMethod(new Error("some error"));
	var fileView = this.uploadManager.view.getWorkView().childNodes[1];
	assert.strictEqual(fileView.lastChild.textContent, "ERROR");
});

QUnit.test("testUploadTimeout", function(assert) {
	var uploadManager = this.uploadManager;
	uploadManager.upload(this.uploadSpec);
	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy0.getSpec().timeoutMethod();

	var fileView = this.uploadManager.view.getWorkView().childNodes[1];
	assert.strictEqual(fileView.lastChild.textContent, "TIMEOUT");
});
