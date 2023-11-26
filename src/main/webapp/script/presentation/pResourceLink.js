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
	cora.pResourceLink = function(dependencies, spec) {
		const metadataProvider = dependencies.metadataProvider;
		const pParentVarFactory = dependencies.pParentVarFactory;
		
		const cPresentation = spec.cPresentation;
		let pParentVar;

		const start = function() {
			pParentVar = pParentVarFactory.factor(spec, self);
		};
		
		const addTypeSpecificInfoToViewSpec = function(mode, pVarViewSpec) {
			pVarViewSpec.type = "pResourceLink";
			pVarViewSpec.outputFormat = getValueFromPresentationOrDefaultTo("outputFormat", "text");
		};

		const getValueFromPresentationOrDefaultTo = function(nameInData, defaultValue) {
			if (cPresentation.containsChildWithNameInData(nameInData)) {
				return cPresentation.getFirstAtomicValueByNameInData(nameInData);
			}
			return defaultValue;
		};
		
		const validateTypeSpecificValue = function(valueFromView) {
			return true;
		};
		
		const autoFormatEnteredValue = function(valueFromView){
			return valueFromView;
		};
		
		const transformValueForView = function(mode, valueForView){
//TODO: what should happen if we have no right to view resource
			console.log(valueForView)
			let url = valueForView.actionLinks.read.url;
			let newValue = url + "?" + getTokenRequestParameter();
			return newValue;
		};
		
		const getTokenRequestParameter = function() {
			let tokenRequestParamenter = "authToken=";
			tokenRequestParamenter += dependencies.authTokenHolder.getCurrentAuthToken();
			return tokenRequestParamenter;
		};
		
		const getSpec = function() {
			return spec;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const self = {
			type: "pResourceLink",
			addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec,
			validateTypeSpecificValue: validateTypeSpecificValue,
			autoFormatEnteredValue: autoFormatEnteredValue,
			transformValueForView: transformValueForView
		};

		start();
		return Object.freeze({
			type: "pResourceLink",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: pParentVar.getView
		});

	};
	return cora;
}(CORA));