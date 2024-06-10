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
	cora.passwordLoginFactory = function(dependencies) {

		const factor = function(spec) {
			let viewDep = {
				textProvider : dependencies.providers.textProvider
			};
			
			let calculatorFactoryDep = {
				metadataProvider : dependencies.metadataProvider
			};
			
			let dep = {
				managedGuiItemFactory : dependencies.globalFactories.managedGuiItemFactory,
				recordGuiFactory : dependencies.globalFactories.recordGuiFactory,
				passwordLoginViewFactory : CORA.passwordLoginViewFactory(viewDep),
//				ajaxCallFactory : dependencies.globalFactories.ajaxCallFactory,
//				"jsClient" : dependencies.providers.clientInstanceProvider.getJsClient()
				recordPartPermissionCalculatorFactory: CORA.genericFactory("recordPartPermissionCalculator"
					, calculatorFactoryDep),
			};
			return CORA.passwordLogin(dep, spec);
		};

		const getDependencies = function() {
			return dependencies;
		};

		return Object.freeze({
			type : "passwordLoginFactory",
			getDependencies : getDependencies,
			factor : factor
		});
	};
	return cora;
}(CORA));