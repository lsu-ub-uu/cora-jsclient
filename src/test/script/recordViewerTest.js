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

		let presentation = this.presentation;
		this.presentationIdUsed = [];
		let presentationIdUsed = this.presentationIdUsed;
		this.pubSub = CORATEST.pubSubSpy();
		this.recordGuiFactory = CORATEST.recordGuiFactorySpy();
		this.recordGui = {
			getPresentationHolder : function(presentationId) {
				presentationIdUsed.push(presentationId);
				return presentation;
			},
			initMetadataControllerStartingGui : function initMetadataControllerStartingGui() {
			},
			dataHolder : {
				getData : function() {
					return {};
				}
			},
			validateData : function() {
				return true;
			},
			pubSub : this.pubSub
		};

		this.metadataIdUsed = [];
		this.dataDividerUsed = [];

		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		
		this.recordViewerSpec = {
			read : {
				requestMethod : "GET",
				rel : "read",
				url : "http://epc.ub.uu.se/cora/rest/record/system/cora",
				accept : "application/vnd.cora.record+json"
			},
			presentationId : "somePresentationId",
			metadataId : "someMetadataId",
			recordGuiFactory : this.recordGuiFactory,
			ajaxCallFactory : this.ajaxCallFactorySpy,
		};
		this.recordToReturn = CORATEST.recordTypeList.dataList.data[4].record;
		this.answerCall = function(no) {
			let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			let jsonRecord = JSON.stringify({
				record : this.recordToReturn
			});
			let answer = {
				spec : ajaxCallSpy0.getSpec(),
				responseText : jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
	},
	afterEach : function() {
	}
});

QUnit.test("initCheckBusyAndMessageHolder", function(assert) {
	let recordViewer = CORA.recordViewer(this.recordViewerSpec);
	assert.notStrictEqual(recordViewer, undefined);

	let view = recordViewer.getView();
	assert.strictEqual(view.className, "recordViewer");

	let messageHolder = view.childNodes[0];
	assert.strictEqual(messageHolder.className, "messageHolder");

	let busy = view.childNodes[1];
	assert.strictEqual(busy.className, "busy");
});

QUnit.test("initCallToServer", function(assert) {
	let recordViewer = CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/system/cora");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.cora.record+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, recordViewer.processFetchedRecord);

	let view = recordViewer.getView();
	assert.strictEqual(view.childNodes.length, 3);

	let busy = view.childNodes[1];
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

	let factoredGuiSpec = this.recordGuiFactory.getSpec(0);
	let emptyPermissions = {
				write: [],
				read: []
			};
	assert.deepEqual(factoredGuiSpec.permissions, emptyPermissions);
});

QUnit.test("testSpecToRecordGuiEmptyPermissions", function(assert) {
	this.recordToReturn.permissions = undefined;
	CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);

	
	let factoredGuiSpec = this.recordGuiFactory.getSpec(0);
	let emptyPermissions = {
				write: [],
				read: []
			};
	assert.deepEqual(factoredGuiSpec.permissions, emptyPermissions);
});

QUnit.test("testSpecToRecordGuiOnlyReadPermissions", function(assert) {
	this.recordToReturn.permissions = {
		read: ["someVariable"]
	};
	CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);
	
	let factoredGuiSpec = this.recordGuiFactory.getSpec(0);
	let permissions = {
				write: [],
				read: this.recordToReturn.permissions.read
			};
	assert.deepEqual(factoredGuiSpec.permissions, permissions);
});

QUnit.test("testSpecToRecordGuiOnlyWritePermissions", function(assert) {
	this.recordToReturn.permissions = {
			write: ["someVariable"]
	};
	CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);
	
	let factoredGuiSpec = this.recordGuiFactory.getSpec(0);
	let permissions = {
				write: this.recordToReturn.permissions.write,
				read: []
			};
	assert.deepEqual(factoredGuiSpec.permissions, permissions);
});

QUnit.test("testSpecToRecordGuiReadAndWritePermissions", function(assert) {
	this.recordToReturn.permissions = {
			write: ["someVariable"],
			read: ["someVariableForRead"]
	};
	CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);
	
	let factoredGuiSpec = this.recordGuiFactory.getSpec(0);
	let permissions = {
				write: this.recordToReturn.permissions.write,
				read: this.recordToReturn.permissions.read
			};
	assert.deepEqual(factoredGuiSpec.permissions, permissions);
});


QUnit.test("errorMissingPresentation", function(assert) {
	let recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			throw new Error("missing metadata");
		}
	};
	this.recordViewerSpec.recordGuiFactory = recordGuiFactorySpy;
	let recordViewer = CORA.recordViewer(this.recordViewerSpec);
	this.answerCall(0);
	let view = recordViewer.getView();
	assert.strictEqual(view.childNodes[2].textContent.substring(0, 24), "Error: missing metadata");
});

QUnit.test("errorDataNotFound", function(assert) {
	let recordViewer = CORA.recordViewer(this.recordViewerSpec);
	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy.getSpec().errorMethod({
		"status" : 404
	});
	let view = recordViewer.getView();
	assert.strictEqual(view.childNodes[0].textContent, "404");
});
