/*
 * Copyright 2017, 2018 Uppsala University Library
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

QUnit.module("login/loginManagerViewTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"textProvider" : CORATEST.textProviderSpy()
		};
		
		var loginMethodCalled = [];
		function loginMethod(loginOption) {
			loginMethodCalled.push(loginOption);
		}
		this.getLoginMethodCalled = function(number) {
			return loginMethodCalled[number];
		}
		
		var logoutMethodHasBeenCalled = false;
		function logoutMethod() {
			logoutMethodHasBeenCalled = true;
		}
		this.getLogoutMethodHasBeenCalled = function() {
			return logoutMethodHasBeenCalled;
		}

		var appTokenLoginRun = false;
		var webRedirectLoginRun = false;
		function testAppTokenLogin() {
			appTokenLoginRun = true;
		}
		this.getAppTokenLoginRun = function() {
			return appTokenLoginRun;
		}
		function testWebRedirectLogin() {
			webRedirectLoginRun = true;
		}
		this.getWebRedirectLoginRun = function() {
			return webRedirectLoginRun;
		}
		var loginOptions = [ {
			"text" : "appToken",
			"call" : testAppTokenLogin
		}, {
			"text" : "webRedirect uu",
			"call" : testWebRedirectLogin
		} ];
		this.loginOptions = loginOptions;
		
		var loginOptions2 = [ {
			"text" : "appToken2",
			"call" : testAppTokenLogin
		}, {
			"text" : "webRedirect uu2",
			"call" : testWebRedirectLogin
		} ];
		this.loginOptions2 = loginOptions2;
		
		this.spec = {
			"loginMethod" : loginMethod,
			"logoutMethod" : logoutMethod
		};

		this.loginManagerView;
		this.getLoginManagerView = function() {
			if (this.loginManagerView === undefined) {
				this.loginManagerView = CORA.loginManagerView(this.dependencies, this.spec);
			}
			return this.loginManagerView;
		};
		this.getHtml = function() {
			if (this.loginManagerView === undefined) {
				this.loginManagerView = CORA.loginManagerView(this.dependencies, this.spec);
			}
			return this.loginManagerView.getHtml();
		};
		this.getMenu = function() {
			if (this.loginManagerView === undefined) {
				this.loginManagerView = CORA.loginManagerView(this.dependencies, this.spec);
			}
			return this.loginManagerView.getMenu();
		};
		this.openMenu = function() {
			var view = this.getHtml();
			CORATESTHELPER.simulateOnclick(view);
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	assert.strictEqual(loginManagerView.type, "loginManagerView");
	assert.ok(this.loginManagerView);
});

QUnit.test("getDependencies", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	assert.strictEqual(loginManagerView.getDependencies(), this.dependencies);
});

QUnit.test("getSpec", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	assert.strictEqual(loginManagerView.getSpec(), this.spec);
});

QUnit.test("getHtml", function(assert) {
	var view = this.getHtml();
	assert.strictEqual(view.nodeName, "SPAN");
});

QUnit.test("testClassName", function(assert) {
	var view = this.getHtml();
	assert.strictEqual(view.className, "iconButton loginManagerView");
});

QUnit.test("testText", function(assert) {
	var view = this.getHtml();
	assert.strictEqual(view.textContent, "translated_theClient_loginMenuText");
	assert.strictEqual(this.dependencies.textProvider.getFetchedTextIdNo(0),
			"theClient_loginMenuText");
});

QUnit.test("testGetMenu", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = loginManagerView.getMenu();
	assert.strictEqual(menu.nodeName, "SPAN");
	assert.strictEqual(menu.className, "holder loginManagerView");

	assert.notVisible(menu);
	this.openMenu();
	assert.visible(menu);
});

QUnit.test("testLoginOptions", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();
	assert.strictEqual(menu.childNodes.length, 0);
});

QUnit.test("testSetLoginOptions", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	loginManagerView.setLoginOptions(this.loginOptions2);
	var menu = this.getMenu();
	assert.strictEqual(menu.childNodes.length, 2);
	assert.strictEqual(menu.childNodes[0].textContent, "appToken2");
	assert.strictEqual(menu.childNodes[1].textContent, "webRedirect uu2");

	CORATESTHELPER.simulateOnclick(menu.childNodes[0]);
	assert.strictEqual(this.getLoginMethodCalled(0), this.loginOptions2[0]);

	CORATESTHELPER.simulateOnclick(menu.childNodes[1]);
	assert.strictEqual(this.getLoginMethodCalled(1), this.loginOptions2[1]);
});

QUnit.test("testSetUserId", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();
	var view = this.getHtml();
	loginManagerView.setUserId("someUserId");
	assert.strictEqual(view.textContent, "someUserId");
});

QUnit.test("testSetStateLoggedin", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();
	this.openMenu();
	loginManagerView.setState(CORA.loginManager.LOGGEDIN);
	assert.notVisible(menu);
	assert.strictEqual(menu.childNodes.length, 1);
	assert.strictEqual(menu.childNodes[0].textContent, "translated_theClient_logoutMenuText");

	CORATESTHELPER.simulateOnclick(menu.childNodes[0]);
	assert.ok(this.getLogoutMethodHasBeenCalled());

});

QUnit.test("testSetStateLoggedout", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	loginManagerView.setLoginOptions(this.loginOptions);
	var menu = this.getMenu();
	this.openMenu();
	loginManagerView.setState(CORA.loginManager.LOGGEDOUT);
	assert.notVisible(menu);

	var view = this.getHtml();
	assert.strictEqual(view.textContent, "translated_theClient_loginMenuText");

	assert.strictEqual(menu.childNodes.length, 2);
	assert.strictEqual(menu.childNodes[0].textContent, "appToken");
	assert.strictEqual(menu.childNodes[1].textContent, "webRedirect uu");
});

QUnit.test("testSetStateFirstLoggedinThenLoggedout", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	loginManagerView.setLoginOptions(this.loginOptions);
	var menu = this.getMenu();

	loginManagerView.setState(CORA.loginManager.LOGGEDIN);
	loginManagerView.setUserId("someUserId");
	assert.strictEqual(menu.childNodes.length, 1);
	assert.strictEqual(menu.childNodes[0].textContent, "translated_theClient_logoutMenuText");

	loginManagerView.setState(CORA.loginManager.LOGGEDOUT);

	var view = this.getHtml();
	assert.strictEqual(view.textContent, "translated_theClient_loginMenuText");

	assert.strictEqual(menu.childNodes.length, 2);
	assert.strictEqual(menu.childNodes[0].textContent, "appToken");
	assert.strictEqual(menu.childNodes[1].textContent, "webRedirect uu");
});

QUnit.test("testCloseHolder", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();
	this.openMenu();
	loginManagerView.closeHolder();
	assert.notVisible(menu);

});
