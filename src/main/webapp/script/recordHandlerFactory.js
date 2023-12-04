/*
 * Copyright 2017, 2023 Olov McKie
 * Copyright 2017, 2023 Uppsala University Library
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
	cora.recordHandlerFactory = function(dependencies) {
		let out;
		let indexHandlerDep = {
			ajaxCallFactory: dependencies.ajaxCallFactory
		};
		let calculatorFactoryDep = {
			metadataProvider : dependencies.metadataProvider
		}
		let dep = {
			globalFactories: dependencies.globalFactories,
			recordHandlerViewFactory: CORA.recordHandlerViewFactory(),
			ajaxCallFactory: dependencies.ajaxCallFactory,
			recordGuiFactory: dependencies.recordGuiFactory,
			managedGuiItemFactory: dependencies.managedGuiItemFactory,
			indexHandlerFactory: CORA.genericFactory("indexHandler", indexHandlerDep),
			recordPartPermissionCalculatorFactory: CORA.genericFactory("recordPartPermissionCalculator", calculatorFactoryDep),
			questionFactory: CORA.genericFactory("question", undefined),
			textProvider : dependencies.textProvider
		};
		const factor = function(recordHandlerSpec) {
			dep.recordHandlerFactory = out;
			return CORA.recordHandler(dep, recordHandlerSpec);
		};

		const getDependencies = function() {
			return dependencies;
		};

		out = Object.freeze({
			type: "recordHandlerFactory",
			getDependencies: getDependencies,
			factor: factor
		});
		return out;
	};
	return cora;
}(CORA));