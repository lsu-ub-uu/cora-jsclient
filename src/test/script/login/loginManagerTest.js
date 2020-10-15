/*
 * Copyright 2016, 2017, 2018, 2019 Uppsala University Library
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

QUnit.module("login/loginManagerTest.js",
	{
		beforeEach: function() {
			addStandardAppTokensToLoginMenu = true;
			this.loginOption;
			this.getAddedWindowEvents = function() {
				return addedEvents;
			};
			var addedEvents = [];
			this.addEvent = function(type, listener, useCapture) {
				addedEvents.push({
					type: type,
					listener: listener,
					useCapture: useCapture
				});
			}
			var oldAddEvent = window.addEventListener;
			window.addEventListener = this.addEvent;
			this.dependencies = {
				textProvider: CORATEST.textProviderSpy(),
				"loginManagerViewFactory": CORATEST.loginManagerViewFactorySpy(),
				"appTokenLoginFactory": CORATEST.appTokenLoginFactorySpy(),
				"webRedirectLoginFactory": CORATEST
					.standardFactorySpy("webRedirectLoginSpy"),
				"ldapLoginJsClientIntegratorFactory": CORATEST
					.standardFactorySpy("ldapLoginJsClientIntegratorSpy"),
				"authTokenHolder": CORATEST.authTokenHolderSpy(),
				"ajaxCallFactory": CORATEST.ajaxCallFactorySpy()
			};
			var afterLoginMethodCalled = false;
			this.afterLoginMethod = function() {
				afterLoginMethodCalled = true;
			};
			this.afterLoginMethodWasCalled = function() {
				return afterLoginMethodCalled;
			}

			var afterLogoutMethodCalled = false;
			this.afterLogoutMethod = function() {
				afterLogoutMethodCalled = true;
			};
			this.afterLogoutMethodWasCalled = function() {
				return afterLogoutMethodCalled;
			}

			var errorMessage;
			this.setErrorMessage = function(errorMessageIn) {
				errorMessage = errorMessageIn;
			}
			this.getErrorMessage = function() {
				return errorMessage;
			}
			this.spec = {
				"afterLoginMethod": this.afterLoginMethod,
				"afterLogoutMethod": this.afterLogoutMethod,
				"setErrorMessage": this.setErrorMessage,
				"appTokenBaseUrl": "someAppTokenBaseUrl/",
				baseUrl: "http://epc.ub.uu.se/cora/rest/",
				"jsClient": CORATEST.jsClientSpy()
			};
			this.loginManager = CORA.loginManager(this.dependencies, this.spec);

			this.authInfo = {
				userId: "141414",
				"token": "fake authToken from here",
				"validForNoSeconds": "131",
				"actionLinks": {
					"delete": {
						"requestMethod": "DELETE",
						"rel": "delete",
						"url": "http://localhost:8080/apptokenverifier/rest/apptoken/141414"
					}
				}
			};
			this.loginWithWebRedirect = function() {
				this.loginOption = {
					text: "Uppsala webredirect",
					type: "webRedirectLogin",
					"url": "https://epc.ub.uu.se/Shibboleth.sso/Login/uu?target=https://epc.ub.uu.se/systemone/idplogin/login"
				};
				this.loginManager.login(this.loginOption);
			}

			this.answerListLoginUnitsCall = function(no) {
				var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(no);
				var jsonLoginUnitList = JSON.stringify(CORATEST.loginUnitList);
				var answer = {
					"spec": ajaxCallSpy0.getSpec(),
					"responseText": jsonLoginUnitList
				};
				ajaxCallSpy0.getSpec().loadMethod(answer);
			}
			this.answerListLoginsCall = function(no) {
				var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(no);
				var jsonLoginList = JSON.stringify(CORATEST.loginList);
				var answer = {
					"spec": ajaxCallSpy0.getSpec(),
					"responseText": jsonLoginList
				};
				ajaxCallSpy0.getSpec().loadMethod(answer);
			}
		},
		afterEach: function() {
		}
	});

QUnit.test("testConstants", function(assert) {
	assert.strictEqual(CORA.loginManager.LOGGEDOUT, 0);
	assert.strictEqual(CORA.loginManager.LOGGEDIN, 1);
});

QUnit.test("init", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.type, "loginManager");
});

QUnit.test("testGetDependencies", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.getDependencies(), this.dependencies);
});
QUnit.test("testGetSpec", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.getSpec(), this.spec);
});

QUnit.test("testCallForLoginUnitsAndLogin", function(assert) {
	var loginManager = this.loginManager;
	var ajaxCallSpy = this.dependencies.ajaxCallFactory.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, this.spec.baseUrl + "record/loginUnit");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.loadMethod, loginManager.fetchLoginUnitCallback);
	assert.strictEqual(ajaxCallSpec.errorMethod, loginManager.fetchLoginUnitErrorCallback);
	assert.strictEqual(ajaxCallSpec.timeoutMethod, loginManager.fetchLoginUnitTimeoutCallback);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.timeoutInMS, undefined);

	var ajaxCallSpy1 = this.dependencies.ajaxCallFactory.getFactored(1);
	var ajaxCallSpec1 = ajaxCallSpy1.getSpec();
	assert.strictEqual(ajaxCallSpec1.url, this.spec.baseUrl + "record/login");
	assert.strictEqual(ajaxCallSpec1.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec1.loadMethod, loginManager.fetchLoginCallback);
	assert.strictEqual(ajaxCallSpec1.errorMethod, loginManager.fetchLoginErrorCallback);
	assert.strictEqual(ajaxCallSpec1.timeoutMethod, loginManager.fetchLoginTimeoutCallback);
	assert.strictEqual(ajaxCallSpec1.data, undefined);
	assert.strictEqual(ajaxCallSpec1.timeoutInMS, undefined);
});

QUnit.test("testAnswerForLoginUnitsOnlySetInViewAfterAnswerForBothLists", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getLoginOptions(), undefined);
	this.answerListLoginUnitsCall(0);
	assert.strictEqual(factoredView.getLoginOptions(), undefined);
	this.answerListLoginsCall(1);
	assert.notEqual(factoredView.getLoginOptions(), undefined);
});

QUnit.test("testAnswerForLoginUnitsOnlySetInViewAfterAnswerForBothListsReOrdered",
	function(assert) {
		var loginManager = this.loginManager;
		var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
		assert.strictEqual(factoredView.getLoginOptions(), undefined);
		this.answerListLoginsCall(1);
		assert.strictEqual(factoredView.getLoginOptions(), undefined);
		this.answerListLoginUnitsCall(0);
		assert.notEqual(factoredView.getLoginOptions(), undefined);
	});

QUnit
	.test(
		"testAnswerForLoginUnits",
		function(assert) {
			this.loginManager = CORA.loginManager(this.dependencies, this.spec);
			var loginManager = this.loginManager;
			var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
			this.answerListLoginUnitsCall(0);
			this.answerListLoginsCall(1);
			var expectedLoginOptions = [
				{
					text: "appToken as 141414",
					type: "appTokenLogin",
					userId: "141414",
					appToken: "63e6bd34-02a1-4c82-8001-158c104cae0e"
				},
				{
					text: "appToken as 151515 alvin",
					type: "appTokenLogin",
					userId: "151515",
					appToken: "63ef81cd-1d88-4a6a-aff0-f0d809a74d34"
				},
				{
					text: "appToken as 161616 diva",
					type: "appTokenLogin",
					userId: "161616",
					appToken: "f7973be9-02e0-4c42-979b-09e42372a02a"
				},
				{
					text: "diva user",
					type: "appTokenLogin",
					userId: "coraUser:4412982402853626",
					appToken: "b27039e1-593d-4d95-a69a-b33aa8c0924a"
				}, {
					text: "divaEverything",
					type: "appTokenLogin",
					userId: "coraUser:490742519075086",
					appToken: "2e57eb36-55b9-4820-8c44-8271baab4e8e"
				}, {
					text: "divaSystemAdmin",
					type: "appTokenLogin",
					userId: "coraUser:491055276494310",
					appToken: "0c240296-0315-4e48-a991-4e6350e73413"
				}, {
					text: "divaDomainAdminUU",
					type: "appTokenLogin",
					userId: "coraUser:491144693381458",
					appToken: "89ad2b42-785a-4421-a647-f959cdb85f4a"
				}, {
					text: "divaDomainAdminKTH",
					type: "appTokenLogin",
					userId: "coraUser:491201365536105",
					appToken: "765b4fcd-43b4-433a-bf7f-8e929f94d3fe"
				},
				{
					text: "alvin user",
					type: "appTokenLogin",
					userId: "coraUser:4412566252284358",
					appToken: "935ae709-4056-4b3d-85d2-469b304acfae"
				},
				{
					text: "translated_uuLoginUnitText",
					type: "webRedirect",
					url: "https://epc.ub.uu.se/Shibboleth.sso/Login/uu?target=https://epc.ub.uu.se/idplogin/login"
				},
				{
					text: "translated_testLoginUnitText",
					type: "webRedirect",
					url: "https://epc.ub.uu.se/Shibboleth.sso/Login/test?target=https://epc.ub.uu.se/idplogin/login"
				}, {
					text: "translated_uuSystemOneLDAPLoginUnitText",
					type: "ldap",
					"url": "http://www.google.se",
					"metadataId": "ldapGroup",
					"presentationId": "ldapPGroup",
					"loginUnitId": "uuSystemOneLDAPLoginUnit"
				}];
			assert.stringifyEqual(factoredView.getLoginOptions(), expectedLoginOptions);
		});
QUnit
	.test(
		"testAnswerForLoginUnitsWithoutStandardApptokenLogins",
		function(assert) {
			addStandardAppTokensToLoginMenu = false;
			this.loginManager = CORA.loginManager(this.dependencies, this.spec);
			var loginManager = this.loginManager;
			var factoredView = this.dependencies.loginManagerViewFactory.getFactored(1);
			this.answerListLoginUnitsCall(2);
			this.answerListLoginsCall(3);
			var expectedLoginOptions = [
				{
					text: "translated_uuLoginUnitText",
					type: "webRedirect",
					url: "https://epc.ub.uu.se/Shibboleth.sso/Login/uu?target=https://epc.ub.uu.se/idplogin/login"
				},
				{
					text: "translated_testLoginUnitText",
					type: "webRedirect",
					url: "https://epc.ub.uu.se/Shibboleth.sso/Login/test?target=https://epc.ub.uu.se/idplogin/login"
				}, {
					text: "translated_uuSystemOneLDAPLoginUnitText",
					type: "ldap",
					"url": "http://www.google.se",
					"metadataId": "ldapGroup",
					"presentationId": "ldapPGroup",
					"loginUnitId": "uuSystemOneLDAPLoginUnit"
				}];
			assert.stringifyEqual(factoredView.getLoginOptions(), expectedLoginOptions);
		});

QUnit.test("testLoginUnitErrorMessage", function(assert) {
	var loginManager = this.loginManager;
	loginManager.fetchLoginUnitErrorCallback();
	assert.strictEqual(this.getErrorMessage(), "Fetching of loginUnits failed!");
});

QUnit.test("testLoginUnitTimeoutMessage", function(assert) {
	var loginManager = this.loginManager;
	loginManager.fetchLoginUnitTimeoutCallback();
	assert.strictEqual(this.getErrorMessage(), "Fetching of loginUnits timedout!");
});

QUnit.test("testLoginErrorMessage", function(assert) {
	var loginManager = this.loginManager;
	loginManager.fetchLoginErrorCallback();
	assert.strictEqual(this.getErrorMessage(), "Fetching of logins failed!");
});

QUnit.test("testLoginTimeoutMessage", function(assert) {
	var loginManager = this.loginManager;
	loginManager.fetchLoginTimeoutCallback();
	assert.strictEqual(this.getErrorMessage(), "Fetching of logins timedout!");
});

QUnit.test("testInitCreatesALoginManagerView", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.ok(factoredView !== undefined);
});

QUnit.test("testInitCreatesALoginManagerViewsViewIsReturnedForGetHtml", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	var loginManagerHtml = loginManager.getHtml();
	assert.strictEqual(loginManagerHtml, factoredView.getHtml());
});

QUnit.test("testInitLoginManagerViewSpec", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	var factoredSpec = factoredView.getSpec();

	var factoredLoginOptions = factoredSpec.loginOptions;

	assert.strictEqual(factoredLoginOptions, undefined);
	assert.strictEqual(factoredSpec.loginMethod, loginManager.login);
	assert.strictEqual(factoredSpec.logoutMethod, loginManager.logout);
});

QUnit.test("testAppTokenLoginFactoryIsCalledOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "appTokenLogin"
	});
	var factored1 = this.dependencies.appTokenLoginFactory.getFactored(0);
	assert.ok(factored1);
	var spec0 = this.dependencies.appTokenLoginFactory.getSpec(0);
	assert.strictEqual(spec0.requestMethod, "POST");
	assert.strictEqual(spec0.url, "someAppTokenBaseUrl/apptokenverifier/rest/apptoken/");
	assert.strictEqual(spec0.accept, "");
	assert.strictEqual(spec0.authInfoCallback, loginManager.appTokenAuthInfoCallback);
	assert.strictEqual(spec0.errorCallback, loginManager.appTokenErrorCallback);
	assert.strictEqual(spec0.timeoutCallback, loginManager.appTokenTimeoutCallback);
});

QUnit.test("testAppTokenLoginCallsServerOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "appTokenLogin",
		userId: "testUserId",
		appToken: "testAppToken"
	});
	var factored0 = this.dependencies.appTokenLoginFactory.getFactored(0);
	assert.strictEqual(factored0.getUserId(0), "testUserId");
	assert.strictEqual(factored0.getAppToken(0), "testAppToken");
});

QUnit.test("testWebRedirectLoginListensForMessagesOnWindow", function(assert) {
	var loginManager = this.loginManager;
	this.loginWithWebRedirect();

	var addedEvent = this.getAddedWindowEvents()[0];
	assert.strictEqual(addedEvent.type, "message");
	assert.strictEqual(addedEvent.listener, loginManager.receiveMessage);
	assert.strictEqual(addedEvent.useCapture, false);
});

QUnit.test("testWebRedirectLoginFactoryIsCalledOnWebRedirectLogin", function(assert) {
	var loginManager = this.loginManager;
	this.loginWithWebRedirect();

	var factored = this.dependencies.webRedirectLoginFactory.getFactored(0);
	assert.strictEqual(factored.type, "webRedirectLoginSpy");
	var spec0 = this.dependencies.webRedirectLoginFactory.getSpec(0);

	assert.strictEqual(spec0.url, this.loginOption.url);
});

QUnit.test("testRecieveMessageFromWebRedirectLogin", function(assert) {
	var loginManager = this.loginManager;
	this.loginWithWebRedirect();

	var factored = this.dependencies.webRedirectLoginFactory.getFactored(0);
	loginManager.receiveMessage({
		origin: "https://epc.ub.uu.se",
		data: this.authInfo,
		source: factored.getOpenedWindow()
	});
	var authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), "fake authToken from here");
});

QUnit.test("testRecieveMessageFromWebRedirectLoginNotHandledIfWrongOrigin", function(assert) {
	var loginManager = this.loginManager;
	this.loginWithWebRedirect();
	loginManager.receiveMessage({
		origin: "https://epc.ub.uu.se/systemoneNOT/idplogin/login",
		data: this.authInfo,
		source: {}
	});
	var authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), undefined);
});

QUnit.test("testRecieveMessageFromWebRedirectLoginOnlyHandledIfFromCorrectWindow",
	function(assert) {
		var loginManager = this.loginManager;
		this.loginWithWebRedirect();
		loginManager.receiveMessage({
			origin: "https://epc.ub.uu.se/systemone/idplogin/login",
			data: this.authInfo,
			source: {}
		});
		var authTokenHolder = this.dependencies.authTokenHolder;
		assert.strictEqual(authTokenHolder.getToken(0), undefined);
	});

QUnit.test("testAuthTokenIsSetInAuthTokenHolderOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), "fake authToken from here");
});

QUnit.test("testUserIdIsSetInViewOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getUserId(0), "141414");
});

QUnit.test("testLoggedinStateIsSetOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	var stateSetInView = factoredView.getState();

	assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDIN);
});

QUnit.test("testLoggedinSpecAfterLoginMethodIsCalledOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);

	assert.strictEqual(this.afterLoginMethodWasCalled(), true);
});

QUnit.test("testLogoutCallIsMadeOnAppTokenLogout", function(assert) {
	var loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "appTokenLogin"
	});
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);

	loginManager.logout();

	var ajaxCallSpy = this.dependencies.ajaxCallFactory.getFactored(2);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://localhost:8080/apptokenverifier/"
		+ "rest/apptoken/141414");
	assert.strictEqual(ajaxCallSpec.requestMethod, "DELETE");
	// assert.strictEqual(ajaxCallSpec.accept, "");
	assert.strictEqual(ajaxCallSpec.loadMethod, loginManager.logoutCallback);
	assert.strictEqual(ajaxCallSpec.data, "fake authToken from here");
});

QUnit.test("testLoggedoutStateIsSetOnAppTokenLogoutCallback", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);

	loginManager.logoutCallback();
	var stateSetInView = factoredView.getState();
	assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDOUT);
});

QUnit.test("testLoggedoutSpecAfterLogoutMethodIsCalledOnAppTokenLogoutCallback", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	loginManager.logoutCallback();

	assert.strictEqual(this.afterLogoutMethodWasCalled(), true);
});

QUnit.test("testAuthTokenIsRemovedOnAppTokenLogoutCallback", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenAuthInfoCallback(this.authInfo);
	loginManager.logoutCallback();

	var authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(1), "");
});

QUnit.test("testErrorMessage", function(assert) {
	var loginManager = this.loginManager;
	var errorObject = {};
	loginManager.appTokenErrorCallback(errorObject);
	assert.strictEqual(this.getErrorMessage(), "AppToken login failed!");
});

QUnit.test("testErrorForStoppedServerOnLogoutResultsInLogout", function(assert) {
	var loginManager = this.loginManager;
	var errorObject = {
		status: 0,
		spec: {
			requestMethod: "DELETE"
		}
	};
	loginManager.appTokenErrorCallback(errorObject);
	assert.strictEqual(this.getErrorMessage(), undefined);

	assertLogoutPerformed(this, assert);
});

QUnit.test("testLdapLoginFactoryIsCalledOnLdapLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "ldap",
		"metadataId": "someMetadataId",
		"presentationId": "somePresentationId"
	});
	var factored1 = this.dependencies.ldapLoginJsClientIntegratorFactory.getFactored(0);
	assert.ok(factored1);
	assert.strictEqual(factored1.type, "ldapLoginJsClientIntegratorSpy");
	var spec0 = this.dependencies.ldapLoginJsClientIntegratorFactory.getSpec(0);
	assert.strictEqual(spec0.metadataId, "someMetadataId");
	assert.strictEqual(spec0.presentationId, "somePresentationId");
	assert.strictEqual(spec0.jsClient, this.spec.jsClient);
});

QUnit.test("testLdapLoginFactoryIsCalledOnlyOnceForSameLdapLogin", function(assert) {
	var loginManager = this.loginManager;
	var spec = {
		text: "someText",
		type: "ldap",
		"metadataId": "someMetadataId",
		"presentationId": "somePresentationId",
		"loginUnitId": "uuSystemOneLDAPLoginUnit"

	};
	loginManager.login(spec);
	var factored = this.dependencies.ldapLoginJsClientIntegratorFactory.getFactored(0);
	assert.ok(factored);

	loginManager.login(spec);

	var factored1 = this.dependencies.ldapLoginJsClientIntegratorFactory.getFactored(1);
	assert.strictEqual(factored1, undefined);
});

QUnit.test("testLdapLoginFactoryIsCalledOnceForEachDifferentLdapLogin", function(assert) {
	var loginManager = this.loginManager;
	var spec = {
		text: "someText",
		type: "ldap",
		"metadataId": "someMetadataId",
		"presentationId": "somePresentationId",
		"loginUnitId": "uuSystemOneLDAPLoginUnit"

	};
	loginManager.login(spec);
	var factored = this.dependencies.ldapLoginJsClientIntegratorFactory.getFactored(0);
	assert.ok(factored);
	spec.loginUnitId = "someOtherLDAPLoginUnit";
	loginManager.login(spec);

	var factored1 = this.dependencies.ldapLoginJsClientIntegratorFactory.getFactored(1);
	assert.ok(factored1);
});

QUnit.test("testLdapLoginShownInJsClientWhenSameLoginCalledAgain", function(assert) {
	var loginManager = this.loginManager;
	var spec = {
		text: "someText",
		type: "ldap",
		"metadataId": "someMetadataId",
		"presentationId": "somePresentationId",
		"loginUnitId": "uuSystemOneLDAPLoginUnit"
	};
	loginManager.login(spec);
	var factored = this.dependencies.ldapLoginJsClientIntegratorFactory.getFactored(0);
	assert.strictEqual(factored.getNoOfShowLdapLoginInJsClient(), 0);

	loginManager.login(spec);
	assert.strictEqual(factored.getNoOfShowLdapLoginInJsClient(), 1);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getNoOfCallsToCloseHolder(), 2);
});

QUnit.test("testCloseHolderIsCalledOnShowLdap", function(assert) {
	var loginManager = this.loginManager;
	loginManager.login({
		text: "someText",
		type: "ldap",
		"metadataId": "someMetadataId",
		"presentationId": "somePresentationId"
	});
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);

	assert.strictEqual(factoredView.getNoOfCallsToCloseHolder(), 1);
});

function assertLogoutPerformed(test, assert) {
	var factoredView = test.dependencies.loginManagerViewFactory.getFactored(0);
	var stateSetInView = factoredView.getState();
	assert.strictEqual(stateSetInView, CORA.loginManager.LOGGEDOUT);

	assert.strictEqual(test.afterLogoutMethodWasCalled(), true);

	var authTokenHolder = test.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), "");
}

QUnit.test("testErrorRestartedServerOnLogoutResultsInLogout", function(assert) {
	var loginManager = this.loginManager;
	var errorObject = {
		status: 404,
		spec: {
			requestMethod: "DELETE"
		}
	};
	loginManager.appTokenErrorCallback(errorObject);
	assert.strictEqual(this.getErrorMessage(), undefined);

	assertLogoutPerformed(this, assert);
});

QUnit.test("testTimeoutMessage", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenTimeoutCallback();
	assert.strictEqual(this.getErrorMessage(), "AppToken login timedout!");
});
