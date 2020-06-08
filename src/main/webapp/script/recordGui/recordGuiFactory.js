/*
 * Copyright 2016, 2017 Uppsala University Library
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
		let metadataProvider = dependencies.providers.metadataProvider;
		let textProvider = dependencies.providers.textProvider;

		let self;

		let factor = function(spec) {
			let metadataId = spec.metadataId;
			let dataDivider = spec.dataDivider;

			let pubSub = CORA.pubSub();

			let specDataHolder = {
				metadataId: metadataId,
				metadataProvider: metadataProvider,
				pubSub: pubSub
			};
			
			let dataHolder = CORA.dataHolder(specDataHolder);

			let specJSBookkeeper = {
				metadataId: metadataId,
				metadataProvider: metadataProvider,
				pubSub: pubSub,
				textProvider: textProvider,
				dataHolder: dataHolder
			};
			
			let depJSBookkeeper = {
				recordTypeProvider: dependencies.providers.recordTypeProvider
			};
			
			let jsBookkeeper = CORA.jsBookkeeper(depJSBookkeeper, specJSBookkeeper);

			let dependenciesPresentationFactory = {
				providers: dependencies.providers,
				globalFactories: dependencies.globalFactories,
				authTokenHolder: dependencies.authTokenHolder,
				pubSub: pubSub,
				jsBookkeeper: jsBookkeeper,
				recordGuiFactory: self,
				dataDivider: dataDivider,
				uploadManager: dependencies.uploadManager,
				ajaxCallFactory: dependencies.ajaxCallFactory
			};

			let dependenciesCF = {
				metadataProvider: metadataProvider,
				recordTypeProvider: dependencies.providers.recordTypeProvider,
				pubSub: pubSub
			};


			let dependenciesMV = {
				metadataProvider: metadataProvider,
				pubSub: pubSub
			};

			let metadataValidatorFactory = CORA.metadataValidatorFactory(dependenciesMV);

			let presentationFactory = CORA.presentationFactory(dependenciesPresentationFactory);

			let dependenciesPHF = {
				metadataProvider: metadataProvider,
				presentationFactory: presentationFactory,
				pubSub: pubSub
			};

			let metadataControllerFactory = CORA.metadataControllerFactory(dependenciesCF);

			let dependenciesRG = {
				metadataProvider: metadataProvider,
				textProvider: textProvider,
				pubSub: pubSub,
				dataHolder: dataHolder,
				jsBookkeeper: jsBookkeeper,
				presentationFactory: presentationFactory,
				metadataControllerFactory: metadataControllerFactory,
				metadataValidatorFactory: metadataValidatorFactory,
				presentationHolderFactory: CORA.presentationHolderFactory(dependenciesPHF)
			};
			return CORA.recordGui(dependenciesRG, spec);
		};

		const getDependencies = function() {
			return dependencies;
		};

		let out = Object.freeze({
			type: "recordGuiFactory",
			factor: factor,
			getDependencies: getDependencies
		});

		self = out;
		return out;
	};
	return cora;
}(CORA));