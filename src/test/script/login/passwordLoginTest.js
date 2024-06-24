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

QUnit.module("login/passwordLoginTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let spec;
	let passwordLogin;
	let ajaxCallFactorySpy;
	let getAuthInfo;
	let getErrorInfo;
	let getTimeoutInfo;
	let loginData;

	hooks.beforeEach(() => {
		setupDependencies();
		setupSpec();
		setupLoginData();
		startPasswordLogin();
	});
	
	hooks.afterEach(() => {
		//no after
	});
	
	const setupDependencies = function() {
		ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		let textProvider = CORATEST.textProviderStub();
			
		dependencies = {
			ajaxCallFactory : ajaxCallFactorySpy,
			recordGuiFactory : CORATEST.standardFactorySpy("recordGuiSpy"),
			passwordLoginViewFactory : CORATEST.standardFactorySpy("passwordLoginViewSpy"),
			textProvider : textProvider
		};
	};
	
	const setupSpec = function() {
		let authInfo = {};
		getAuthInfo = function() {
			return authInfo;
		};
		let errorInfo = {};
		getErrorInfo = function() {
			return errorInfo;
		};
		let timeoutInfo = {};
		getTimeoutInfo = function() {
			return timeoutInfo;
		};
		spec = {
			metadataId : "someMetadataGroup",
			presentationId :"somePGroup",
			requestMethod: "POST",
			url: "someAppTokenBaseUrl/" + "login/rest/password/",
			accept: "application/vnd.uub.record+json",
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
	};
	
	const setupLoginData = function() {
		loginData = {
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
	};
	
	const startPasswordLogin = function(){
		passwordLogin = CORA.passwordLogin(dependencies, spec);
	};
	
	const assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy) {
		let ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
		assert.strictEqual(ajaxCallSpec.url, spec.url + "someLoginId");
		assert.strictEqual(ajaxCallSpec.accept, spec.accept);
		assert.strictEqual(ajaxCallSpec.loadMethod, passwordLogin.handleResponse);
		assert.strictEqual(ajaxCallSpec.errorMethod, spec.errorCallback);
		assert.strictEqual(ajaxCallSpec.timeoutMethod, spec.timeoutCallback);
		assert.strictEqual(ajaxCallSpec.timeoutInMS, 15000);
		assert.strictEqual(ajaxCallSpec.data, "somePassword");
	};
	
	test("testInit", assert => {
		assert.strictEqual(passwordLogin.type, "passwordLogin");
	});
	
	test("testGetDependencies", assert => {
		assert.strictEqual(passwordLogin.getDependencies(), dependencies);
	});
	
	test("testGetSpec", assert => {
		assert.strictEqual(passwordLogin.getSpec(), spec);
	});
	
	test("testInitViewCreatedUsingFactory", assert => {
		let factoredView = dependencies.passwordLoginViewFactory.getFactored(0);
		assert.strictEqual(factoredView.type, "passwordLoginViewSpy");
		
		let spec = dependencies.passwordLoginViewFactory.getSpec(0);
		assert.strictEqual(spec.loginMethod, passwordLogin.login);
	});
	
	test("testGetView", assert => {
		let factoredView = dependencies.passwordLoginViewFactory.getFactored(0);
		assert.strictEqual(passwordLogin.getView(), factoredView.getView());
	});
	
	
	test("testInitRecordGuiFactoryCalled", assert => {
		let factoredSpec = dependencies.recordGuiFactory.getSpec(0);
		assert.strictEqual(factoredSpec.metadataId, "someMetadataGroup");
		let emptyPermissions = {
					write: [],
					read: []
				};
		assert.deepEqual(factoredSpec.permissions, emptyPermissions);
	});
	
	test("testInitRecordGuiGetPresentationCalled", assert => {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(factoredGui.getPresentationIdUsed(0), "somePGroup");
		assert.strictEqual(factoredGui.getMetadataIdsUsedInData(0), "someMetadataGroup");
	});
	
	test("testInitRecordGuiGetPresentationAddedToFormView", assert => {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(dependencies.passwordLoginViewFactory.getFactored(0)
				.getPresentationsAddedToLoginForm(0), factoredGui.getReturnedPresentations(0)
				.getView());
	});
	
	test("testInitRecordGuiStartedGui", assert => {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		assert.strictEqual(factoredGui.getInitCalled(), 1);
	});
	
	test("testLoginSendsRequest", assert => {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		let dataHolderSpy = factoredGui.dataHolder;
		dataHolderSpy.setData(loginData);
			
		passwordLogin.login();
		
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(0);
		assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);
	});
	
	test("testGetAuthTokenForAppToken", assert => {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		let dataHolderSpy = factoredGui.dataHolder;
		dataHolderSpy.setData(loginData);
		
		passwordLogin.login();
	
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(0);
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
		let authInfo = getAuthInfo();
		assert.strictEqual(authInfo.userId, "someLoginId");
		assert.strictEqual(authInfo.token, "someAuthToken");
		assert.strictEqual(authInfo.validForNoSeconds, "278");
		assert.stringifyEqual(authInfo.actionLinks, tokenAnswer.actionLinks);
	});
	
	test("testGetError", assert => {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		let dataHolderSpy = factoredGui.dataHolder;
		dataHolderSpy.setData(loginData);
		
		passwordLogin.login();
		
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(0);
		let errorMethod = ajaxCallSpy0.getSpec().errorMethod;
	
		let answer = {
			status : 201,
			responseText : "error"
		};
		errorMethod(answer);
		let errorInfo = getErrorInfo();
	
		assert.strictEqual(errorInfo, answer);
	});
	
	test("testGetTimeOut", assert => {
		let factoredGui = dependencies.recordGuiFactory.getFactored(0);
		let dataHolderSpy = factoredGui.dataHolder;
		dataHolderSpy.setData(loginData);
		
		passwordLogin.login();
	
		let ajaxCallSpy0 = ajaxCallFactorySpy.getFactored(0);
		let timeoutMethod = ajaxCallSpy0.getSpec().timeoutMethod;
	
		let answer = {
			status : 201,
			responseText : "timeout"
		};
		timeoutMethod(answer);
		let timeoutInfo = getTimeoutInfo();
	
		assert.strictEqual(timeoutInfo, answer);
	});

});

