/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2016, 2017, 2018, 2023 Olov McKie
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
	cora.pVar = function(dependencies, spec) {
		const metadataProvider = dependencies.metadataProvider;
		const pParentVarFactory = dependencies.pParentVarFactory;
		
		const cPresentation = spec.cPresentation;
		let regEx;
		let pParentVar;

		const start = function() {
			let cMetadataElement = getMetadataById(spec.metadataIdUsedInData);
			regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");
			
			pParentVar = pParentVarFactory.factor(spec, self);
		};
		
		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const addTypeSpecificInfoToViewSpec = function(mode, pVarViewSpec) {
			pVarViewSpec.type = "pTextVar";
			pVarViewSpec.inputType = getValueFromPresentationOrDefaultTo("inputType", "input");
			pVarViewSpec.inputFormat = getValueFromPresentationOrDefaultTo("inputFormat", "text");
			pVarViewSpec.outputFormat = getValueFromPresentationOrDefaultTo("outputFormat", "text");
			
			pVarViewSpec.info.technicalInfo.push({text: `regEx: ${regEx}`});
		};

		const getValueFromPresentationOrDefaultTo = function(nameInData, defaultValue) {
			if (cPresentation.containsChildWithNameInData(nameInData)) {
				return cPresentation.getFirstAtomicValueByNameInData(nameInData);
			}
			return defaultValue;
		};
		
		const validateTypeSpecificValue = function(valueFromView) {
			return new RegExp(regEx).test(valueFromView);
		};
		
		const autoFormatEnteredValue = function(valueFromView){
			return valueFromView;
		};
		
		const transformValueForView = function(mode, valueForView){
			return valueForView;
		};
		
		const getSpec = function() {
			return spec;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const self = {
			addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec,
			validateTypeSpecificValue: validateTypeSpecificValue,
			autoFormatEnteredValue: autoFormatEnteredValue,
			transformValueForView: transformValueForView
		};

		start();
		return Object.freeze({
			type: "pVar",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: pParentVar.getView
		});

	};
	return cora;
}(CORA));