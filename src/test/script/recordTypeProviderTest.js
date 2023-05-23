/*
 * Copyright 2016, 2017 Olov McKie
 * Copyright 2016, 2017, 2023 Uppsala University Library
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

QUnit.module("recordTypeProviderTest.js", {
	beforeEach: function() {
		this.ajaxCallFactorySpy = CORATEST.standardFactorySpy("ajaxCallSpy");
		let dependencies = {
			ajaxCallFactory: this.ajaxCallFactorySpy
		};
		this.dependencies = dependencies;

		let recordTypeListLink = {
			requestMethod: "GET",
			rel: "list",
			url: "http://epc.ub.uu.se/cora/rest/record/recordType/",
			accept: "application/vnd.uub.recordList+json"
		};
		this.recordTypeListLink = recordTypeListLink;

		let validationTypeListLink = {
			requestMethod: "GET",
			rel: "list",
			url: "http://epc.ub.uu.se/cora/rest/record/validationType/",
			accept: "application/vnd.uub.recordList+json"
		};
		this.validationTypeListLink = recordTypeListLink;

		let spec = {
			recordTypeListLink: recordTypeListLink,
			validationTypeListLink: validationTypeListLink
		};

		this.spec = spec;
		
		this.recordTypeListLink = recordTypeListLink;
		this.recordTypeListLinkJson = JSON.stringify(this.recordTypeListLink);

		this.answerListCall = function(no) {
			let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			let jsonRecordList = JSON.stringify(CORATEST.recordTypeList);
			let answer = {
				"spec": ajaxCallSpy0.getSpec(),
				"responseText": jsonRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.validationTypeListLink = validationTypeListLink;
		this.validationTypeListLinkJson = JSON.stringify(this.validationTypeListLink);

		this.answerValiationListCall = function(no) {
			let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			let jsonRecordList = JSON.stringify(CORATEST.validationTypeList);
			let answer = {
				"spec": ajaxCallSpy0.getSpec(),
				"responseText": jsonRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
	},
	afterEach: function() {
	}
});

QUnit.test("initCorrectType", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	assert.strictEqual(provider.type, "recordTypeProvider");
});

QUnit.test("initGetDependencies", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	assert.strictEqual(provider.getDependencies(), this.dependencies);
});

QUnit.test("initGetSpec", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	assert.strictEqual(provider.getSpec(), this.spec);
});

QUnit.test("initCorrectRequestMade", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, provider.onlyForTestHandleAnswerForRecordTypes);
	assert.false(ajaxCallSpec.loadMethod == undefined);
});

QUnit.test("initCorrectRequestMadeForValidationType", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);

	let ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	let ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/validationType/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, provider.onlyForTestHandleAnswerForValidationTypes);
	assert.false(ajaxCallSpec.loadMethod == undefined);
});

QUnit.test("callWhenReadyCalledAfterAnswersFromBothAjaxCallsAndProviderIsReady", function(assert) {
	let providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	this.spec.callWhenReady = providerReady;
	CORA.recordTypeProvider(this.dependencies, this.spec);

	assert.notOk(providerStarted);

	this.answerListCall(0);
	assert.notOk(providerStarted);

	this.answerValiationListCall(1);
	assert.ok(providerStarted);
});

QUnit.test("callWhenReadyCalledAfterAnswersFromBothAjaxCallsAndProviderIsReadyDifferntOrder", function(assert) {
	let providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	this.spec.callWhenReady = providerReady;
	CORA.recordTypeProvider(this.dependencies, this.spec);

	assert.notOk(providerStarted);

	this.answerValiationListCall(1);
	assert.notOk(providerStarted);

	this.answerListCall(0);
	assert.ok(providerStarted);
});

QUnit.test("initCallWhenReadyNotCalledWhenReadyIfUnspecified", function(assert) {
	let providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	CORA.recordTypeProvider(this.dependencies, this.spec);

	assert.notOk(providerStarted);

	this.answerListCall(0);

	assert.notOk(providerStarted);
});

QUnit.test("testInitEnteredLinkIsNotChanged", function(assert) {
	CORA.recordTypeProvider(this.dependencies, this.spec);
	let recordTypeListLinkJson = this.recordTypeListLinkJson;
	let recordTypeListLinkJsonAfter = JSON.stringify(this.recordTypeListLink);
	assert.deepEqual(recordTypeListLinkJsonAfter, recordTypeListLinkJson);
});

QUnit.test("getRecordTypeById", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);
	
	let expected = {
					"data": {
						"children": [
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "textGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/textGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "metadataId"
							},
							{
								"name": "abstract",
								"value": "false"
							},
							{
								"children": [
									{
										"name": "id",
										"value": "text"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "recordType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/recordType",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "type"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "system"
											},
											{
												"name": "linkedRecordId",
												"value": "cora"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/system/cora",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "dataDivider"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "validationType"
											},
											{
												"name": "linkedRecordId",
												"value": "recordType"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/validationType/recordType",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "validationType"
									},
									{
										"repeatId": "0",
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2018-03-15T10:41:14.404000Z"
											}
										],
										"name": "updated"
									},
									{
										"repeatId": "1",
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "12345"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2018-09-10T19:50:03.345000Z"
											}
										],
										"name": "updated"
									},
									{
										"repeatId": "2",
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2019-01-21T10:34:35.461000Z"
											}
										],
										"name": "updated"
									},
									{
										"repeatId": "3",
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2019-01-23T13:29:24.679000Z"
											}
										],
										"name": "updated"
									},
									{
										"repeatId": "4",
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2022-03-24T15:18:48.272163Z"
											}
										],
										"name": "updated"
									},
									{
										"repeatId": "5",
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2023-03-01T14:39:41.267068Z"
											}
										],
										"name": "updated"
									},
									{
										"repeatId": "6",
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2023-03-01T14:39:50.961961Z"
											}
										],
										"name": "updated"
									},
									{
										"repeatId": "7",
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2023-03-01T15:51:09.361215Z"
											}
										],
										"name": "updated"
									},
									{
										"repeatId": "8",
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/141414",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2023-03-02T15:33:04.829580Z"
											}
										],
										"name": "updated"
									},
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "user"
											},
											{
												"name": "linkedRecordId",
												"value": "12345"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "https://cora.epc.ub.uu.se/systemone/rest/record/user/12345",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "createdBy"
									},
									{
										"name": "tsCreated",
										"value": "2017-10-01T00:00:00.000000Z"
									}
								],
								"name": "recordInfo"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "textOutputPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textOutputPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationViewId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "textPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "presentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "metadata"
									},
									{
										"name": "linkedRecordId",
										"value": "textNewGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/metadata/textNewGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newMetadataId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "textNewPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textNewPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "newPresentationFormId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "textMenuPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textMenuPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "menuPresentationViewId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "presentation"
									},
									{
										"name": "linkedRecordId",
										"value": "textListPGroup"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/presentation/textListPGroup",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "listPresentationViewId"
							},
							{
								"name": "userSuppliedId",
								"value": "true"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "textText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/textText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "textId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "text"
									},
									{
										"name": "linkedRecordId",
										"value": "textDefText"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/textDefText",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "defTextId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "search"
									},
									{
										"name": "linkedRecordId",
										"value": "textSearch"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "https://cora.epc.ub.uu.se/systemone/rest/record/search/textSearch",
										"accept": "application/vnd.uub.record+json"
									}
								},
								"name": "search"
							},
							{
								"repeatId": "0",
								"name": "groupOfRecordType",
								"value": "metadata"
							},
							{
								"repeatId": "1",
								"name": "groupOfRecordType",
								"value": "presentation"
							},
							{
								"repeatId": "2",
								"name": "groupOfRecordType",
								"value": "systemConfiguration"
							},
							{
								"name": "public",
								"value": "true"
							},
							{
								"name": "storeInArchive",
								"value": "false"
							}
						],
						"name": "recordType"
					},
					"actionLinks": {
						"search": {
							"requestMethod": "GET",
							"rel": "search",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/textSearch",
							"accept": "application/vnd.uub.recordList+json"
						},
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text",
							"accept": "application/vnd.uub.record+json"
						},
						"read_incoming_links": {
							"requestMethod": "GET",
							"rel": "read_incoming_links",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text/incomingLinks",
							"accept": "application/vnd.uub.recordList+json"
						},
						"update": {
							"requestMethod": "POST",
							"rel": "update",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text",
							"accept": "application/vnd.uub.record+json"
						},
						"index": {
							"requestMethod": "POST",
							"rel": "index",
							"body": {
								"children": [
									{
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "recordType"
											}
										],
										"name": "recordType"
									},
									{
										"name": "recordId",
										"value": "text"
									},
									{
										"name": "type",
										"value": "index"
									}
								],
								"name": "workOrder"
							},
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
							"accept": "application/vnd.uub.record+json"
						},
						"create": {
							"requestMethod": "POST",
							"rel": "create",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/",
							"accept": "application/vnd.uub.record+json"
						},
						"batch_index": {
							"requestMethod": "POST",
							"rel": "batch_index",
							"contentType": "application/vnd.uub.record+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/text/",
							"accept": "application/vnd.uub.record+json"
						},
						"list": {
							"requestMethod": "GET",
							"rel": "list",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/",
							"accept": "application/vnd.uub.recordList+json"
						},
						"validate": {
							"requestMethod": "POST",
							"rel": "validate",
							"contentType": "application/vnd.uub.workorder+json",
							"url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
							"accept": "application/vnd.uub.record+json"
						}
					}
				};
	let metadataForRecordType = provider.getRecordTypeById("text");
	assert.stringifyEqual(metadataForRecordType, expected);
});

QUnit.test("getRecordTypeByIdNotFound", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);

	let error = false;
	try {
		let x = provider.getRecordTypeById("someNonExistingRecordTypeId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});

QUnit.test("getAllRecordTypes", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);

	let recordTypeList = provider.getAllRecordTypes();
	assert.stringifyEqual(recordTypeList.length, 24);

});

QUnit.test("getMetadataByRecordTypeIdAllButValidationTypeInfo", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);

	let expected = {
  "metadataId": "textGroup",
  "presentationViewId": "textOutputPGroup",
  "presentationFormId": "textPGroup",
  "newMetadataId": "textNewGroup",
  "newPresentationFormId": "textNewPGroup",
  "menuPresentationViewId": "textMenuPGroup",
  "listPresentationViewId": "textListPGroup",
  "search": "textSearch",
  "userSuppliedId": "true",
  "abstract": "false",
  "actionLinks": {
    "search": {
      "requestMethod": "GET",
      "rel": "search",
      "url": "https://cora.epc.ub.uu.se/systemone/rest/record/searchResult/textSearch",
      "accept": "application/vnd.uub.recordList+json"
    },
    "read": {
      "requestMethod": "GET",
      "rel": "read",
      "url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text",
      "accept": "application/vnd.uub.record+json"
    },
    "read_incoming_links": {
      "requestMethod": "GET",
      "rel": "read_incoming_links",
      "url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text/incomingLinks",
      "accept": "application/vnd.uub.recordList+json"
    },
    "update": {
      "requestMethod": "POST",
      "rel": "update",
      "contentType": "application/vnd.uub.record+json",
      "url": "https://cora.epc.ub.uu.se/systemone/rest/record/recordType/text",
      "accept": "application/vnd.uub.record+json"
    },
    "index": {
      "requestMethod": "POST",
      "rel": "index",
      "body": {
        "children": [
          {
            "children": [
              {
                "name": "linkedRecordType",
                "value": "recordType"
              },
              {
                "name": "linkedRecordId",
                "value": "recordType"
              }
            ],
            "name": "recordType"
          },
          {
            "name": "recordId",
            "value": "text"
          },
          {
            "name": "type",
            "value": "index"
          }
        ],
        "name": "workOrder"
      },
      "contentType": "application/vnd.uub.record+json",
      "url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
      "accept": "application/vnd.uub.record+json"
    },
    "create": {
      "requestMethod": "POST",
      "rel": "create",
      "contentType": "application/vnd.uub.record+json",
      "url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/",
      "accept": "application/vnd.uub.record+json"
    },
    "batch_index": {
      "requestMethod": "POST",
      "rel": "batch_index",
      "contentType": "application/vnd.uub.record+json",
      "url": "https://cora.epc.ub.uu.se/systemone/rest/record/index/text/",
      "accept": "application/vnd.uub.record+json"
    },
    "list": {
      "requestMethod": "GET",
      "rel": "list",
      "url": "https://cora.epc.ub.uu.se/systemone/rest/record/text/",
      "accept": "application/vnd.uub.recordList+json"
    },
    "validate": {
      "requestMethod": "POST",
      "rel": "validate",
      "contentType": "application/vnd.uub.workorder+json",
      "url": "https://cora.epc.ub.uu.se/systemone/rest/record/workOrder/",
      "accept": "application/vnd.uub.record+json"
    }
  }
//  ,
//  validationTypes: [{id: "coraText"}, {id: "textSystemOne"}]
};
	let x = provider.getMetadataByRecordTypeId("text");
	delete x.validationTypes;
	assert.stringifyEqual(x, expected);
});

QUnit.test("getMetadataByRecordTypeIdButValidationTypeInfo", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);

	let expected = {
		coraText : {
			id: "coraText",
			textId: "coraTextText",
			defTextId: "coraTextValidationDefText",
			createDefinitionId: "coraTextNewGroup",
			updateDefinitionId: "coraTextGroup",
			createFormId: "coraTextNewPGroup",
			updateFormId: "coraTextPGroup"
		}, 
		textSystemOne: {
			id: "textSystemOne",
			textId: "textSystemOneText",
			defTextId: "textSystemOneValidationDefText",
			createDefinitionId: "textSystemOneNewGroup",
			updateDefinitionId: "textSystemOneGroup",
			createFormId: "textSystemOneNewPGroup",
			updateFormId: "textSystemOnePGroup"
		}
	};
	let x = provider.getMetadataByRecordTypeId("text");
	assert.stringifyEqual(x.validationTypes, expected);
});

QUnit.test("getMetadataByRecordTypeIdNotFound", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);

	let error = false;
	try {
		let x = provider.getMetadataByRecordTypeId("someNonExistingRecordTypeId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});

QUnit.test("getRecordTypesByGroupIdNoMatchReturnsEmptyList", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);

	let recordTypeList = provider.getRecordTypesByGroupId("");
	assert.stringifyEqual(recordTypeList.length, 0);
});

QUnit.test("getRecordTypesByGroupId", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);

	let presentationRecordTypeList = provider.getRecordTypesByGroupId("presentation");
	assert.strictEqual(getIdFromRecord(presentationRecordTypeList[0]), "guiElement");
	assert.strictEqual(getIdFromRecord(presentationRecordTypeList[1]), "presentation");
	assert.strictEqual(getIdFromRecord(presentationRecordTypeList[2]), "text");
	assert.strictEqual(presentationRecordTypeList.length, 3);

	let metadataRecordTypeList = provider.getRecordTypesByGroupId("metadata");
	assert.strictEqual(getIdFromRecord(metadataRecordTypeList[0]), "collectTerm");
	assert.strictEqual(getIdFromRecord(metadataRecordTypeList[1]), "metadata");
	assert.strictEqual(getIdFromRecord(metadataRecordTypeList[2]), "recordType");
	assert.strictEqual(getIdFromRecord(metadataRecordTypeList[3]), "validationType");
	assert.strictEqual(getIdFromRecord(metadataRecordTypeList[4]), "text");

	assert.strictEqual(metadataRecordTypeList.length, 5);

	let systemConfRecordTypeList = provider.getRecordTypesByGroupId("systemConfiguration");
	assert.strictEqual(getIdFromRecord(systemConfRecordTypeList[0]), "loginUnit");
	assert.strictEqual(getIdFromRecord(systemConfRecordTypeList[1]), "login");
	assert.strictEqual(getIdFromRecord(systemConfRecordTypeList[2]), "system");
	assert.strictEqual(getIdFromRecord(systemConfRecordTypeList[3]), "text");
	assert.strictEqual(systemConfRecordTypeList.length, 4);

	let otherTypeList = provider.getRecordTypesByGroupId("other");
	assert.strictEqual(getIdFromRecord(otherTypeList[0]), "indexBatchJob");
	assert.strictEqual(otherTypeList.length, 6);
});

function getIdFromRecord(record) {
	let cRecord = CORA.coraData(record.data);
	let cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
	return cRecordInfo.getFirstAtomicValueByNameInData("id");

}

