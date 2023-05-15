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
			"children": [{
				"children": [{
					"name": "id",
					"value": "textSystemOne"
				}, {
					"children": [{
						"name": "linkedRecordType",
						"value": "recordType"
					}, {
						"name": "linkedRecordId",
						"value": "recordType"
					}],
					"name": "type"
				}, {
					"name": "createdBy",
					"children": [{
						"name": "linkedRecordType",
						"value": "user"
					}, {
						"name": "linkedRecordId",
						"value": "userid"
					}]
				}, {
					"name": "updatedBy",
					"value": "userId"
				}, {
					"children": [{
						"name": "linkedRecordType",
						"value": "system"
					}, {
						"name": "linkedRecordId",
						"value": "cora"
					}],
					"actionLinks": {
						"read": {
							"requestMethod": "GET",
							"rel": "read",
							"url": "http://localhost:8080/therest/rest/record/system/cora",
							"accept": "application/vnd.uub.record+json"
						}
					},
					"name": "dataDivider"
				}],
				"name": "recordInfo"
			}, {
				"name": "metadataId",
				"children": [{
					"name": "linkedRecordType",
					"value": "metadataGroup"
				}, {
					"name": "linkedRecordId",
					"value": "textSystemOneGroup"
				}]
			}, {
				"name": "presentationViewId",
				"children": [{
					"name": "linkedRecordType",
					"value": "presentationGroup"
				}, {
					"name": "linkedRecordId",
					"value": "textSystemOneViewPGroup"
				}]
			}, {
				"name": "presentationFormId",
				"children": [{
					"name": "linkedRecordType",
					"value": "presentationGroup"
				}, {
					"name": "linkedRecordId",
					"value": "textSystemOneFormPGroup"
				}]
			}, {
				"name": "newMetadataId",
				"children": [{
					"name": "linkedRecordType",
					"value": "metadataGroup"
				}, {
					"name": "linkedRecordId",
					"value": "textSystemOneNewGroup"
				}]
			}, {
				"name": "newPresentationFormId",
				"children": [{
					"name": "linkedRecordType",
					"value": "presentationGroup"
				}, {
					"name": "linkedRecordId",
					"value": "textSystemOneFormNewPGroup"
				}]
			}, {
				"name": "menuPresentationViewId",
				"children": [{
					"name": "linkedRecordType",
					"value": "presentationGroup"
				}, {
					"name": "linkedRecordId",
					"value": "textSystemOneMenuPGroup"
				}]
			}, {
				"name": "listPresentationViewId",
				"children": [{
					"name": "linkedRecordType",
					"value": "presentationGroup"
				}, {
					"name": "linkedRecordId",
					"value": "textSystemOneListPGroup"
				}]
			}, {
				"name": "search",
				"children": [{
					"name": "linkedRecordType",
					"value": "search"
				}, {
					"name": "linkedRecordId",
					"value": "presentationVarSearch"
				}]
			}, {
				"name": "userSuppliedId",
				"value": "true"
			}, {
				"name": "selfPresentationViewId",
				"value": "textSystemOneViewSelfPGroup"
			}, {
				"name": "abstract",
				"value": "false"
			}, {
				"name": "parentId",
				"children": [{
					"name": "linkedRecordType",
					"value": "recordType"
				}, {
					"name": "linkedRecordId",
					"value": "text"
				}]
			}, {
				"name": "groupOfRecordType",
				"value": "metadata",
				"repeatId": "0"
			}, {
				"name": "groupOfRecordType",
				"value": "presentation",
				"repeatId": "1"
			}, {
				"name": "groupOfRecordType",
				"value": "systemConfiguration",
				"repeatId": "2"
			}],
			"name": "recordType"
		},
		"actionLinks": {
			"search": {
				"requestMethod": "GET",
				"rel": "search",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept": "application/vnd.uub.recordList+json"
			},
			"read": {
				"requestMethod": "GET",
				"rel": "read",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
				"accept": "application/vnd.uub.record+json"
			},
			"update": {
				"requestMethod": "POST",
				"rel": "update",
				"contentType": "application/vnd.uub.record+json",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
				"accept": "application/vnd.uub.record+json"
			},
			"create": {
				"requestMethod": "POST",
				"rel": "create",
				"contentType": "application/vnd.uub.record+json",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept": "application/vnd.uub.record+json"
			},
			"list": {
				"requestMethod": "GET",
				"rel": "list",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept": "application/vnd.uub.recordList+json"
			},
			"delete": {
				"requestMethod": "DELETE",
				"rel": "delete",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne"
			}
		}
	};
	let metadataForRecordType = provider.getRecordTypeById("textSystemOne");
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
	assert.stringifyEqual(recordTypeList.length, 15);

});

QUnit.test("getMetadataByRecordTypeId", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);

	let expected = {
		"metadataId": "textSystemOneGroup",
		"presentationViewId": "textSystemOneViewPGroup",
		"presentationFormId": "textSystemOneFormPGroup",
		"newMetadataId": "textSystemOneNewGroup",
		"newPresentationFormId": "textSystemOneFormNewPGroup",
		"menuPresentationViewId": "textSystemOneMenuPGroup",
		"listPresentationViewId": "textSystemOneListPGroup",
		"search": "presentationVarSearch",
		"userSuppliedId": "true",
		"abstract": "false",
		"parentId": "text",
		"actionLinks": {
			"search": {
				"requestMethod": "GET",
				"rel": "search",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept": "application/vnd.uub.recordList+json"
			},
			"read": {
				"requestMethod": "GET",
				"rel": "read",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
				"accept": "application/vnd.uub.record+json"
			},
			"update": {
				"requestMethod": "POST",
				"rel": "update",
				"contentType": "application/vnd.uub.record+json",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
				"accept": "application/vnd.uub.record+json"
			},
			"create": {
				"requestMethod": "POST",
				"rel": "create",
				"contentType": "application/vnd.uub.record+json",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept": "application/vnd.uub.record+json"
			},
			"list": {
				"requestMethod": "GET",
				"rel": "list",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept": "application/vnd.uub.recordList+json"
			},
			"delete": {
				"requestMethod": "DELETE",
				"rel": "delete",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne"
			}
		}
	};
	let x = provider.getMetadataByRecordTypeId("textSystemOne");
	assert.stringifyEqual(x, expected);
});
QUnit.test("getMetadataByRecordTypeIdNoParentId", function(assert) {
	let provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
 	this.answerValiationListCall(1);

	let expected = {
		"metadataId": "metadataGroup",
		"presentationViewId": "metadataViewPGroup",
		"presentationFormId": "metadataFormPGroup",
		"newMetadataId": "metadataNewGroup",
		"newPresentationFormId": "metadataFormNewPGroup",
		"menuPresentationViewId": "metadataMenuPGroup",
		"listPresentationViewId": "metadataListPGroup",
		"search": "presentationVarSearch",
		"userSuppliedId": "true",
		"abstract": "true",
		"actionLinks": {
			"search": {
				"requestMethod": "GET",
				"rel": "search",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept": "application/vnd.uub.recordList+json"
			},
			"read": {
				"requestMethod": "GET",
				"rel": "read",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
				"accept": "application/vnd.uub.record+json"
			},
			"update": {
				"requestMethod": "POST",
				"rel": "update",
				"contentType": "application/vnd.uub.record+json",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
				"accept": "application/vnd.uub.record+json"
			},
			"create": {
				"requestMethod": "POST",
				"rel": "create",
				"contentType": "application/vnd.uub.record+json",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept": "application/vnd.uub.record+json"
			},
			"list": {
				"requestMethod": "GET",
				"rel": "list",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept": "application/vnd.uub.recordList+json"
			},
			"delete": {
				"requestMethod": "DELETE",
				"rel": "delete",
				"url": "http://epc.ub.uu.se/cora/rest/record/recordType/metadata"
			}
		}
	};
	let x = provider.getMetadataByRecordTypeId("metadata");
	assert.stringifyEqual(x, expected);
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

