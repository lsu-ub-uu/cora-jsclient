/*
 * Copyright 2019 Uppsala University Library
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
	cora.passwordLoginJsClientIntegrator = function(dependencies, spec) {
		let managedGuiItem;
		let passwordLogin;

		const start = function() {
			managedGuiItem = createManagedGuiItem();
			showPasswordLoginInJsClient();

			passwordLogin = createPasswordLogin();
			managedGuiItem.addWorkPresentation(passwordLogin.getView());
		};

		const createPasswordLogin = function() {
			return dependencies.passwordLoginFactory.factor(spec);
		};

		const createManagedGuiItem = function() {
			let managedGuiItemSpec = {
				activateMethod : spec.jsClient.showView,
				removeMethod : spec.jsClient.viewRemoved
			};
			return dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
		};

		const showPasswordLoginInJsClient = function() {
			spec.jsClient.showView(managedGuiItem);
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		start();
		return Object.freeze({
			type : "passwordLoginJsClientIntegrator",
			showPasswordLoginInJsClient : showPasswordLoginInJsClient,
			getDependencies : getDependencies,
			getSpec : getSpec
		});
	};
	return cora;
}(CORA));