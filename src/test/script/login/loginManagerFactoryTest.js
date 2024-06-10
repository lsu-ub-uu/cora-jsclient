/*
 * Copyright 2017, 2019 Uppsala University Library
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

QUnit.module("login/loginManagerFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			textProvider : CORATEST.textProviderSpy(),
			appTokenLoginFactory : {
				type : "fakeAppTokenLoginFactory"
			},
			webRedirectLoginFactory : {
				type : "fakeWebRedirectLoginFactory"
			},
			ldapLoginJsClientIntegratorFactory : {
				type : "fakeLdapLoginJsClientIntegratorFactory"
			},
			authTokenHolder : {
				type : "fakeAuthTokenHolder"
			},
			ajaxCallFactory : {
				type : "fakeAjaxCallFactory",
				factor : function() {
				}
			}
		};
		this.loginManagerFactory = CORA.loginManagerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.loginManagerFactory);
	assert.strictEqual(this.loginManagerFactory.type, "loginManagerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.loginManagerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factor",
		function(assert) {
			let testCallHasBeenCalled = false;
			function testCall() {
				testCallHasBeenCalled = true;
			}
			let loginManagerSpec = {
				afterLoginMethod : testCall,
				appTokenBaseUrl : "someAppTokenBaseUrl/"
			// "afterLogoutMethod":yy,
			// "afterUserInactiveMethod":zz
			};
			let loginManager = this.loginManagerFactory.factor(loginManagerSpec);
			assert.strictEqual(loginManager.type, "loginManager");

			let loginManagerDependencies = loginManager.getDependencies();
			assert.strictEqual(loginManagerDependencies.textProvider,
					this.dependencies.textProvider);
			assert.strictEqual(loginManagerDependencies.loginManagerViewFactory.type,
					"loginManagerViewFactory");
			assert.strictEqual(loginManagerDependencies.appTokenLoginFactory,
					this.dependencies.appTokenLoginFactory);
			assert.strictEqual(loginManagerDependencies.ldapLoginJsClientIntegratorFactory.type,
					"fakeLdapLoginJsClientIntegratorFactory");
			assert.strictEqual(loginManagerDependencies.webRedirectLoginFactory.type,
			"fakeWebRedirectLoginFactory");
			assert.strictEqual(loginManagerDependencies.authTokenHolder,
					this.dependencies.authTokenHolder);
			assert.strictEqual(loginManagerDependencies.ajaxCallFactory,
					this.dependencies.ajaxCallFactory);

			loginManagerSpec = loginManager.getSpec();
			assert.strictEqual(loginManagerSpec.afterLoginMethod, testCall);
			assert.strictEqual(loginManagerSpec.appTokenBaseUrl, "someAppTokenBaseUrl/");
		});
