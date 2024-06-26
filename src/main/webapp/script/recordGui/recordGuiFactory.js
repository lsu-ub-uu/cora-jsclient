/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
 * Copyright 2024 Olov McKie
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
	cora.recordGuiFactory = function(dependencies) {
		const metadataProvider = dependencies.providers.metadataProvider;
		const textProvider = dependencies.providers.textProvider;
		const recordTypeProvider = dependencies.providers.recordTypeProvider;
		let recordGuiCounter = 0;

		let self;

		let factor = function(spec) {
			let metadataId = spec.metadataId;
			let dataDivider = spec.dataDivider;

			let pubSub = CORA.pubSub();

			let specDataHolder = {
				metadataId : metadataId,
				metadataProvider : metadataProvider,
				pubSub : pubSub
			};

			let dataHolder = CORA.dataHolder(specDataHolder);

			let specJSBookkeeper = {
				metadataId : metadataId,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				textProvider : textProvider,
				dataHolder : dataHolder
			};

			let metadataChildAndRepeatInitializerDep = {
				recordTypeProvider : recordTypeProvider,
				metadataProvider : metadataProvider,
				pubSub : pubSub
			};

			let metadataChildAndRepeatInitializerFactory = CORA
					.metadataChildAndRepeatInitializerFactory(metadataChildAndRepeatInitializerDep);

			let depJSBookkeeper = {
				recordTypeProvider : recordTypeProvider,
				metadataChildAndRepeatInitializerFactory : metadataChildAndRepeatInitializerFactory
			};

			let jsBookkeeper = CORA.jsBookkeeper(depJSBookkeeper, specJSBookkeeper);

			let calculatorFactoryDep = {
				metadataProvider : metadataProvider
			};

			let dependenciesPresentationFactory = {
				providers : dependencies.providers,
				globalFactories : dependencies.globalFactories,
				authTokenHolder : dependencies.authTokenHolder,
				pubSub : pubSub,
				jsBookkeeper : jsBookkeeper,
				recordGuiFactory : self,
				dataDivider : dataDivider,
				uploadManager : dependencies.uploadManager,
				ajaxCallFactory : dependencies.ajaxCallFactory,
				recordPartPermissionCalculatorFactory : CORA.genericFactory(
						"recordPartPermissionCalculator", calculatorFactoryDep)
			};

			let dependenciesCF = {
				metadataProvider : metadataProvider,
				recordTypeProvider : recordTypeProvider,
				pubSub : pubSub
			};

			let dependenciesMV = {
				metadataProvider : metadataProvider,
				pubSub : pubSub
			};

			let metadataValidatorFactory = CORA.metadataValidatorFactory(dependenciesMV);
			recordGuiCounter++
			let presentationFactorySpec = {presentationFactoryCounter: recordGuiCounter};
			let presentationFactory = CORA.presentationFactory(dependenciesPresentationFactory,
				presentationFactorySpec);

			let dependenciesPHF = {
				metadataProvider : metadataProvider,
				presentationFactory : presentationFactory,
				pubSub : pubSub
			};

			let metadataControllerFactory = CORA.metadataControllerFactory(dependenciesCF);

			let dependenciesRG = {
				metadataProvider : metadataProvider,
				textProvider : textProvider,
				pubSub : pubSub,
				dataHolder : dataHolder,
				jsBookkeeper : jsBookkeeper,
				presentationFactory : presentationFactory,
				metadataControllerFactory : metadataControllerFactory,
				metadataValidatorFactory : metadataValidatorFactory,
				presentationHolderFactory : CORA.presentationHolderFactory(dependenciesPHF)
			};
			spec.recordPartPermissionCalculator = createRecordPartPermissionCalculator(metadataId, 
				spec.permissions);
			
			return CORA.recordGui(dependenciesRG, spec);
		};
		
		const createRecordPartPermissionCalculator = function(metadataId, permissions) {
			let calculatorSpec = {
				metadataId: metadataId,
				permissions: permissions
			}
			return dependencies.recordPartPermissionCalculatorFactory.factor(calculatorSpec);
		};

		const getDependencies = function() {
			return dependencies;
		};

		let out = Object.freeze({
			type : "recordGuiFactory",
			factor : factor,
			getDependencies : getDependencies
		});

		self = out;
		return out;
	};
	return cora;
}(CORA));