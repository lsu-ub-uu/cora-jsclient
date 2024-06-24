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

QUnit.module("login/passwordLoginViewTest.js", hooks => {
	const test = QUnit.test;
	let dependencies;
	let spec;
	let textProvider; 
	let workItemViewFactory;
	let passwordLoginView;
	let factoredWorkItemView;

	hooks.beforeEach(() => {
		setupDependencies();
		setupSpec();
		startPasswordLoginView();
		factoredWorkItemView = getFactoredWorkItemView();
	});
	
	hooks.afterEach(() => {
		//no after
	});
	
	const setupDependencies = function() {
		textProvider = CORATEST.textProviderSpy();
		workItemViewFactory = CORATEST.standardFactorySpy("workItemViewSpy");
		
		dependencies = {
			workItemViewFactory : workItemViewFactory,
			messageHolderFactory : CORATEST.standardFactorySpy("messageHolderSpy"),
			textProvider : textProvider
		};
	};
	
	const setupSpec = function() {
		let nuberOfCallsToLogin = 0;
		let login = function(){
			nuberOfCallsToLogin++;
		};
		spec = {
			loginMethod: login
		};
	};
	
	const startPasswordLoginView = function(){
		passwordLoginView = CORA.passwordLoginView(dependencies, spec);
	};

	const getFactoredWorkItemView = function(){
		return workItemViewFactory.getFactored(0);
	};
	
	test("testInit", assert => {
		assert.strictEqual(passwordLoginView.type, "passwordLoginView");
	});
	
	test("testGetDependencies", assert => {
		assert.strictEqual(passwordLoginView.getDependencies(), dependencies);
	});
	
	test("testInitFactoredWorkItemViewSpec", assert => {
		let factoredSpec = workItemViewFactory.getSpec(0);
		assert.strictEqual(factoredSpec.extraClassName, "passwordLogin");
	});
	
	test("testInitViewIsFactoredWorkItemView", assert => {
		let view = passwordLoginView.getView();
	
		assert.strictEqual(view, factoredWorkItemView.getView());
	});
	
	test("testInitLoginFormHolderCreated", assert => {
		let loginFormHolder = factoredWorkItemView.getViewsAddedToView(0);
		assert.strictEqual(loginFormHolder.nodeName, "SPAN");
		assert.strictEqual(loginFormHolder.className, "loginFormHolder");
	});
	
	test("testAddPresentationToLoginFormHolder", assert => {
		let loginFormHolder = factoredWorkItemView.getViewsAddedToView(0);
		assert.strictEqual(loginFormHolder.childNodes.length, 0);
	
		let aPresentation = CORA.gui.createSpanWithClassName("some");
		passwordLoginView.addPresentationToLoginFormHolder(aPresentation);
		assert.strictEqual(loginFormHolder.childNodes.length, 1);
		assert.strictEqual(loginFormHolder.firstChild, aPresentation);
	});
	
	test("testInitButtonViewCreatedAndAddedToView", assert => {
		let buttonView = factoredWorkItemView.getViewsAddedToView(1);
		
		assert.strictEqual(buttonView.nodeName, "SPAN");
		assert.strictEqual(buttonView.className, "buttonView");
	});
	
	test("testInitSearchButtonCreatedAndAddedButtonView", assert => {
		let buttonView = factoredWorkItemView.getViewsAddedToView(1);
		let loginButton = buttonView.lastChild;
		assert.strictEqual(loginButton.nodeName, "INPUT");
		assert.strictEqual(loginButton.type, "button");
		let translatedLoginButtonText = textProvider.getTranslation("theClient_loginButtonText");
		assert.strictEqual(loginButton.value, translatedLoginButtonText);
		assert.strictEqual(loginButton.className, "loginButton");
		assert.strictEqual(loginButton.modelObject.getSpec().action.method, spec.loginMethod);
	});
});

