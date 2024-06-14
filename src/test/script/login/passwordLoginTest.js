/*
 * Copyright 2019, 2024 Uppsala University Library
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

QUnit.module.only("login/passwordLoginTest.js", {
	beforeEach : function() {
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		let textProvider = CORATEST.textProviderStub();
			
		let dependencies = {
			ajaxCallFactory : this.ajaxCallFactorySpy,
			recordGuiFactory : CORATEST.standardFactorySpy("recordGuiSpy"),
			passwordLoginViewFactory : CORATEST.standardFactorySpy("passwordLoginViewSpy"),
			textProvider : textProvider
		};
		this.dependencies = dependencies;
	
		let jsClient = {
			showView : function() {
			},
			addGlobalView : function() {
			}
		}

		let authInfo = {};
		this.getAuthInfo = function() {
			return authInfo;
		};
		let errorInfo = {};
		this.getErrorInfo = function() {
			return errorInfo;
		};
		let timeoutInfo = {};
		this.getTimeoutInfo = function() {
			return timeoutInfo;
		};
		let spec = {
			metadataId : "someMetadataGroup",
			presentationId :"somePGroup",
//			jsClient: spec.jsClient,
			requestMethod: "POST",
			url: "someAppTokenBaseUrl/" + "login/rest/password/",
			accept: "application/vnd.uub.record+json",
//			authInfoCallback: authInfoCallback,
//			errorCallback: passwordErrorCallback,
//			timeoutCallback: passwordTimeoutCallback
			authInfoCallback : function(authInfoIn) {
				authInfo = authInfoIn;
			},
			errorCallback : function(error) {
				errorInfo = error;
			},
			timeoutCallback : function(timeout) {
				timeoutInfo = timeout;
			}
		};
		this.spec = spec;
	
		this.passwordLogin = CORA.passwordLogin(dependencies, spec);
		
		this.assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy) {
			let ajaxCallSpec = ajaxCallSpy.getSpec();
			assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
			assert.strictEqual(ajaxCallSpec.url, spec.url + "someLoginId");
			assert.strictEqual(ajaxCallSpec.accept, spec.accept);
			assert.strictEqual(ajaxCallSpec.loadMethod, this.passwordLogin.handleResponse);
			assert.strictEqual(ajaxCallSpec.errorMethod, spec.errorCallback);
			assert.strictEqual(ajaxCallSpec.timeoutMethod, spec.timeoutCallback);
			assert.strictEqual(ajaxCallSpec.timeoutInMS, 15000);
			assert.strictEqual(ajaxCallSpec.data, "somePassword");
		};
		this.loginData = {
			name: "password",
			children: [
				{
					name: "loginId",
					value: "someLoginId"
				},
				{
					name: "password",
					value: "somePassword"
				}
			]
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.passwordLogin.type, "passwordLogin");
});

QUnit.test("testGetDependencies", function(assert) {
	assert.strictEqual(this.passwordLogin.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	assert.strictEqual(this.passwordLogin.getSpec(), this.spec);
});

QUnit.test("testInitViewCreatedUsingFactory", function(assert) {
	let factoredView = this.dependencies.passwordLoginViewFactory.getFactored(0);
	assert.strictEqual(factoredView.type, "passwordLoginViewSpy");
	
	let spec = this.dependencies.passwordLoginViewFactory.getSpec(0);
	assert.strictEqual(spec.loginMethod, this.passwordLogin.login);
});

QUnit.test("testGetView", function(assert) {
	let factoredView = this.dependencies.passwordLoginViewFactory.getFactored(0);
	assert.strictEqual(this.passwordLogin.getView(), factoredView.getView());
});


QUnit.test("testInitRecordGuiFactoryCalled", function(assert) {
	let factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "someMetadataGroup");
	let emptyPermissions = {
				write: [],
				read: []
			};
	assert.deepEqual(factoredSpec.permissions, emptyPermissions);
});

QUnit.test("testInitRecordGuiGetPresentationCalled", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getPresentationIdUsed(0), "somePGroup");
	assert.strictEqual(factoredGui.getMetadataIdsUsedInData(0), "someMetadataGroup");
});

QUnit.test("testInitRecordGuiGetPresentationAddedToFormView", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(this.dependencies.passwordLoginViewFactory.getFactored(0)
			.getPresentationsAddedToLoginForm(0), factoredGui.getReturnedPresentations(0)
			.getView());
});

QUnit.test("testInitRecordGuiStartedGui", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredGui.getInitCalled(), 1);
});

QUnit.test("testLoginSendsRequest", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	let dataHolderSpy = factoredGui.dataHolder;
	dataHolderSpy.setData(this.loginData);
		
	this.passwordLogin.login();
	
	let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);
});

QUnit.test("testGetAuthTokenForAppToken", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	let dataHolderSpy = factoredGui.dataHolder;
	dataHolderSpy.setData(this.loginData);
	
	this.passwordLogin.login();

	let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	let loadMethod = ajaxCallSpy0.getSpec().loadMethod;
	let tokenAnswer = {
		data : {
			children : [ {
				name : "id",
				value : "someAuthToken"
			}, {
				name : "validForNoSeconds",
				value : "278"
			} ],
			name : "authToken"
		}, 
		actionLinks : {
			delete : {
				requestMethod : "DELETE",
				rel : "delete",
				url : "http://epc.ub.uu.se/login/rest/apptoken/131313"
			}
		}
	};
	let answer = {
		status : 201,
		responseText : JSON.stringify(tokenAnswer)
	};
	loadMethod(answer);
	let authInfo = this.getAuthInfo();
	assert.strictEqual(authInfo.userId, "someLoginId");
	assert.strictEqual(authInfo.token, "someAuthToken");
	assert.strictEqual(authInfo.validForNoSeconds, "278");
	assert.stringifyEqual(authInfo.actionLinks, tokenAnswer.actionLinks);
});

QUnit.test("testGetError", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	let dataHolderSpy = factoredGui.dataHolder;
	dataHolderSpy.setData(this.loginData);
	
	this.passwordLogin.login();
	
	let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	let errorMethod = ajaxCallSpy0.getSpec().errorMethod;

	let answer = {
		status : 201,
		responseText : "error"
	};
	errorMethod(answer);
	let errorInfo = this.getErrorInfo();

	assert.strictEqual(errorInfo, answer);
});

QUnit.test("testGetTimeOut", function(assert) {
	let factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
	let dataHolderSpy = factoredGui.dataHolder;
	dataHolderSpy.setData(this.loginData);
	
	this.passwordLogin.login();

	let ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	let timeoutMethod = ajaxCallSpy0.getSpec().timeoutMethod;

	let answer = {
		status : 201,
		responseText : "timeout"
	};
	timeoutMethod(answer);
	let timeoutInfo = this.getTimeoutInfo();

	assert.strictEqual(timeoutInfo, answer);
});
