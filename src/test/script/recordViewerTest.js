/*
 * Copyright 2016, 2017 Uppsala University Library
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

QUnit.module("recordViewerTest.js", {
	beforeEach : function() {
		this.presentation = {
			"getView" : function() {
				return document.createElement("span");
			}
		};

		var presentation = this.presentation;
		this.presentationIdUsed = [];
		var presentationIdUsed = this.presentationIdUsed;
		this.pubSub = CORATEST.pubSubSpy();
		this.recordGuiFactory = CORATEST.recordGuiFactorySpy();
		this.recordGui = {
			"getPresentationHolder" : function(presentationId) {
				presentationIdUsed.push(presentationId);
				return presentation;
			},
			"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
			},
			"dataHolder" : {
				"getData" : function() {
					return {};
				}
			},
			"validateData" : function() {
				return true;
			},
			"pubSub" : this.pubSub
		};

//		var recordGui = this.recordGui;
		this.metadataIdUsed = [];
//		var metadataIdUsed = this.metadataIdUsed;
		this.dataDividerUsed = [];
//		var dataDividerUsed = this.dataDividerUsed;
//		this.recordGuiFactorySpy = {
//			"factor" : function(spec) {
//				var metadataId = spec.metadataId;
//				var data = spec.data;
//				var dataDivider = spec.dataDivider;
//
//				metadataIdUsed.push(metadataId);
//				dataDividerUsed.push(dataDivider);
//				return recordGui;
//			}
//		};

		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		this.recordPartPermissionCalculatorFactory = CORATEST.standardFactorySpy("recordPartPermissionCalculatorSpy")

		
		this.recordViewerSpec = {
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
				"accept" : "application/vnd.uub.record+json"
			},
			"presentationId" : "somePresentationId",
			"metadataId" : "someMetadataId",
			"recordGuiFactory" : this.recordGuiFactory,
			"ajaxCallFactory" : this.ajaxCallFactorySpy,
			recordPartPermissionCalculatorFactory: this.recordPartPermissionCalculatorFactory
			
		};
		this.recordToReturn = CORATEST.recordTypeList.dataList.data[4].record;
		this.answerCall = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonRecord = JSON.stringify({
				// "record" : CORATEST.record
				"record" : this.recordToReturn
			});
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
	},
	afterEach : function() {
	}
});

QUnit.test("initCheckBusyAndMessageHolder", function(assert) {
	var recordViewer = CORA.recordViewer(this.recordViewerSpec);
	assert.notStrictEqual(recordViewer, undefined);

	var view = recordViewer.getView();
	assert.strictEqual(view.className, "recordViewer");

	var messageHolder = view.childNodes[0];
	assert.strictEqual(messageHolder.className, "messageHolder");

	var busy = view.childNodes[1];
	assert.strictEqual(busy.className, "busy");
});

QUnit.test("initCallToServer", function(assert) {
	var recordViewer = CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/system/cora");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, recordViewer.processFetchedRecord);

	var view = recordViewer.getView();
	assert.strictEqual(view.childNodes.length, 3);

	var busy = view.childNodes[1];
	assert.strictEqual(busy.className, "busy toBeRemoved");
});

QUnit.test("testCorrectSpecToRecordGui", function(assert) {
	CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);

	let factoredSpec = this.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "someMetadataId");
	assert.strictEqual(factoredSpec.dataDivider, "cora");
	let expectedData =  CORATEST.recordTypeList.dataList.data[4].record.data;
	assert.stringifyEqual(factoredSpec.data, expectedData);
	let factoredCalculator = this.recordViewerSpec.recordPartPermissionCalculatorFactory.getFactored(0);
	assert.strictEqual(factoredSpec.recordPartPermissionCalculator, factoredCalculator);
	
	let calcualatorSpec = this.recordViewerSpec.recordPartPermissionCalculatorFactory.getSpec(0);
	assert.strictEqual(calcualatorSpec.metadataId, this.recordViewerSpec.metadataId);
});

QUnit.test("testSpecToRecordGuiEmptyPermissions", function(assert) {
	this.recordToReturn.permissions = undefined;
	CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);

	
	let calcualatorSpec = this.recordViewerSpec.recordPartPermissionCalculatorFactory.getSpec(0);
	assert.stringifyEqual(calcualatorSpec.permissions.read, []);
	assert.stringifyEqual(calcualatorSpec.permissions.write, []);
});

QUnit.test("testSpecToRecordGuiOnlyReadPermissions", function(assert) {
	this.recordToReturn.permissions = {
		read: ["someVariable"]
	};
	CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);
	
	let calcualatorSpec = this.recordViewerSpec.recordPartPermissionCalculatorFactory.getSpec(0);
	assert.stringifyEqual(calcualatorSpec.permissions.read, this.recordToReturn.permissions.read);
	assert.stringifyEqual(calcualatorSpec.permissions.write, []);
});

QUnit.test("testSpecToRecordGuiOnlyWritePermissions", function(assert) {
	this.recordToReturn.permissions = {
			write: ["someVariable"]
	};
	CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);
	
	let calcualatorSpec = this.recordViewerSpec.recordPartPermissionCalculatorFactory.getSpec(0);
	assert.stringifyEqual(calcualatorSpec.permissions.write, this.recordToReturn.permissions.write);
	assert.stringifyEqual(calcualatorSpec.permissions.read, []);
});

QUnit.test("testSpecToRecordGuiReadAndWritePermissions", function(assert) {
	this.recordToReturn.permissions = {
			write: ["someVariable"],
			read: ["someVariableForRead"]
	};
	CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);
	
	let calcualatorSpec = this.recordViewerSpec.recordPartPermissionCalculatorFactory.getSpec(0);
	assert.stringifyEqual(calcualatorSpec.permissions.write, this.recordToReturn.permissions.write);
	assert.stringifyEqual(calcualatorSpec.permissions.read, this.recordToReturn.permissions.read);
});


QUnit.test("errorMissingPresentation", function(assert) {
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			throw new Error("missing metadata");
		}
	};
	this.recordViewerSpec.recordGuiFactory = recordGuiFactorySpy;
	var recordViewer = CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);
	var view = recordViewer.getView();
	assert.strictEqual(view.childNodes[2].textContent.substring(0, 24), "Error: missing metadata");
});

QUnit.test("errorDataNotFound", function(assert) {
	var recordViewer = CORA.recordViewer(this.recordViewerSpec);
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy.getSpec().errorMethod({
		"status" : 404
	});
	var view = recordViewer.getView();
	assert.strictEqual(view.childNodes[0].textContent, "404");
});
