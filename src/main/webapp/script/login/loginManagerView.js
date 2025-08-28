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
var CORA = (function(cora) {
	"use strict";
	cora.loginManagerView = function(dependencies, spec) {
		const textProvider = dependencies.textProvider;
		let out;
		let view;
		let menu;
		let baseClassName = "loginManagerView";
		let holder;
		let loginOptions;

		const start = function() {
			let holderSpec = {
				className : baseClassName,
				buttonText : textProvider.getTranslation("theClient_loginMenuText"),
				appendTo : document.body
			};
			holder = CORA.holder(holderSpec);
			view = holder.getButton();
			menu = holder.getView();
		};

		const getHtml = function() {
			return view;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const getMenu = function() {
			return menu;
		};

		const setLoginOptions = function(loginOptionsIn) {
			loginOptions = loginOptionsIn;
			menu.innerHTML = "";
			loginOptions.forEach(addMenuElement);
		};

		const addMenuElement = function(loginOption) {
			let buttonSpec = {
				className : "menuOption",
				text : loginOption.text,
				action : {
					method : function() {
						spec.loginMethod(loginOption);
					}
				}
			};
			let optionButton = CORA.button(buttonSpec);
			menu.appendChild(optionButton);
		};

		const setLoginId = function(loginIdIn) {
			view.textContent = loginIdIn;
		};

		const closeHolder = function() {
			holder.closeHolder();

		};

		const setState = function(stateIn) {
			holder.closeHolder();
			if (CORA.loginManager.LOGGEDIN === stateIn) {
				menu.innerHTML = "";
				let logoutOptions = [ {
					text : textProvider.getTranslation("theClient_logoutMenuText"),
					call : spec.logoutMethod
				} ];
				logoutOptions.forEach(addLogoutMenuElement);
			} else {
				setLoginOptions(loginOptions);
				view.textContent = textProvider
						.getTranslation("theClient_loginMenuText");
			}
		};

		const addLogoutMenuElement = function(logoutOption) {
			let buttonSpec = {
				className : "menuOption",
				text : logoutOption.text,
				action : {
					method : logoutOption.call
				}
			};
			let optionButton = CORA.button(buttonSpec);
			menu.appendChild(optionButton);
		}

		out = Object.freeze({
			type : "loginManagerView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getHtml : getHtml,
			getMenu : getMenu,
			setState : setState,
			setLoginId : setLoginId,
			setLoginOptions : setLoginOptions,
			closeHolder : closeHolder
		});
		start();
		return out;
	};
	return cora;
}(CORA));