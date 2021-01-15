/*
 * Copyright 2017, 2020 Uppsala University Library
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
	cora.recordGui = function(dependencies, spec) {
		let pubSub = dependencies.pubSub;
		let dataHolder = dependencies.dataHolder;
		let jsBookkeeper = dependencies.jsBookkeeper;
		let metadataController;

		const getPresentationHolder = function(presentationId, metadataIdUsedInData) {
			let spec1 = {
				presentationId: presentationId,
				metadataIdUsedInData: metadataIdUsedInData,
				metadataProvider: dependencies.metadataProvider,
				pubSub: pubSub,
				textProvider: dependencies.textProvider,
				jsBookkeeper : jsBookkeeper,
				presentationFactory : dependencies.presentationFactory,
				recordPartPermissionCalculator : spec.recordPartPermissionCalculator
			};
			return dependencies.presentationHolderFactory.factor(spec1);
		};

		const initMetadataControllerStartingGui = function() {
			let specMetadataController = {
				metadataId: spec.metadataId,
				data: spec.data,
				recordPartPermissionCalculator : spec.recordPartPermissionCalculator
			};

			metadataController = dependencies.metadataControllerFactory
					.factor(specMetadataController);
			return metadataController;
		};

		const validateData = function() {
			let validateSpec = {
				metadataId: spec.metadataId,
				data: dependencies.dataHolder.getData(),
				metadataProvider: dependencies.metadataProvider,
				pubSub: dependencies.pubSub,
				recordPartPermissionCalculator: spec.recordPartPermissionCalculator
			};

			let validator = dependencies.metadataValidatorFactory.factor(validateSpec);
			return validator.validate();
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		}

		return Object.freeze({
			type : "recordGui",
			getDependencies : getDependencies,
			getSpec : getSpec,
			pubSub : pubSub,
			dataHolder : dataHolder,
			jsBookkeeper : jsBookkeeper,
			getPresentationHolder : getPresentationHolder,
			initMetadataControllerStartingGui : initMetadataControllerStartingGui,
			validateData : validateData
		});
	};
	return cora;
}(CORA));