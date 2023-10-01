/*
 * Copyright 2016, 2018, 2020 Uppsala University Library
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
	cora.pNumVar = function(dependencies, spec) {
		const metadataProvider = dependencies.metadataProvider;
		const pParentVarFactory = dependencies.pParentVarFactory;
		
		let pParentVar;
		let cMetadataElement;
		let min;
		let max;
		let warningMin;
		let warningMax;
		let numberOfDecimals;

		const start = function() {
			cMetadataElement = getMetadataById(spec.metadataIdUsedInData);
			min = cMetadataElement.getFirstAtomicValueByNameInData("min");
			max = cMetadataElement.getFirstAtomicValueByNameInData("max");
			warningMin = cMetadataElement.getFirstAtomicValueByNameInData("warningMin");
			warningMax = cMetadataElement.getFirstAtomicValueByNameInData("warningMax");
			numberOfDecimals = cMetadataElement.getFirstAtomicValueByNameInData("numberOfDecimals");

			pParentVar = pParentVarFactory.factor(spec, self);
		};
		
		const addTypeSpecificInfoToViewSpec = function(mode, pVarViewSpec) {
			pVarViewSpec.type = "pNumVar";
			
			pVarViewSpec.info.technicalInfo.push({text: `min: ${min}`});
			pVarViewSpec.info.technicalInfo.push({text: `max: ${max}`});
			pVarViewSpec.info.technicalInfo.push({text: `warningMin: ${warningMin}`});
			pVarViewSpec.info.technicalInfo.push({text: `warningMax: ${warningMax}`});
			pVarViewSpec.info.technicalInfo.push({text: `numberOfDecimals: ${numberOfDecimals}`});
		};

		const validateTypeSpecificValue = function(valueFromView) {
			return checkValueBetweenMinAndMaxIfNumber(valueFromView);
		};
		
		const checkValueBetweenMinAndMaxIfNumber = function(valueFromView) {
			let validator = CORA.numberVariableValidator();
			return validator.validateData(valueFromView, cMetadataElement);
		};
		
		const autoFormatEnteredValue = function(valueFromView){
			if(numberOfDecimals > 0){
				return autoFormatEnteredValueForDecimals(valueFromView);
			}else {
				return valueFromView;
			}
		};
		
		const autoFormatEnteredValueForDecimals = function(valueFromView){
			let updatedValue = valueFromView.replaceAll(",", ".");
			if(!updatedValue.includes(".")){
				updatedValue+=".";
			}
			let noDec = updatedValue.length-updatedValue.lastIndexOf('.');
			for(let i=noDec; i<=numberOfDecimals; i++){
				updatedValue+="0";
			}
			return updatedValue;
		};
		
		const transformValueForView = function(mode, valueForView){
			return valueForView;
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
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
			type: "pNumVar",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: pParentVar.getView
		});
	};
	return cora;
}(CORA));