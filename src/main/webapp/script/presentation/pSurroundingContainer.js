/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2016, 2017, 2018 Olov McKie
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
	cora.pSurroundingContainer = function(dependencies, specIn) {
		let spec = specIn;
		let cPresentation = spec.cPresentation;
		let cParentPresentation = spec.cParentPresentation;
//		let cParentPresentation = cPresentation;
		let parent;

		const start = function() {
			let my = {
				type: "pSurroundingContainer",
				metadataId: spec.metadataIdUsedInData,
				cPresentation: cPresentation,
				cParentPresentation: cParentPresentation,
				addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec
			};
			my.createBaseViewHolder = createBaseViewHolder;
			parent = CORA.pParentMultipleChildren(dependencies, spec, my);
//			parent.init();
		};

		const createBaseViewHolder = function(presentationIdIn) {
			let presentationStyle = getPresentationStyle();
//			let presentationId = parent.getPresentationId();
			let presentationId = presentationIdIn; 
			return CORA.gui.createSpanWithClassName("pSurroundingContainer " + presentationStyle
				+ presentationId);
		};

		
		const addTypeSpecificInfoToViewSpec = function(mode, pVarViewSpec) {
			//TODO: test when factory for parent added
			pVarViewSpec.type = "container";
//			console.log(pVarViewSpec)
//			console.log(pVarViewSpec.info.text)
			delete pVarViewSpec.info.text;
//			console.log(pVarViewSpec.info.text)
//			delete pVarViewSpec.info.defText;
//			delete pVarViewSpec.info.technicalInfo.metadataId;
//			delete pVarViewSpec.info.technicalInfo.nameInData;
//			pVarViewSpec.inputType = getValueFromPresentationOrDefaultTo("inputType", "input");
//			pVarViewSpec.inputFormat = getValueFromPresentationOrDefaultTo("inputFormat", "text");
//			pVarViewSpec.outputFormat = getValueFromPresentationOrDefaultTo("outputFormat", "text");
//			
//			pVarViewSpec.info.technicalInfo.push({text: `regEx: ${regEx}`});
		};

		const getPresentationStyle = function() {
			if (cPresentation.containsChildWithNameInData("presentationStyle")) {
				return cPresentation.getFirstAtomicValueByNameInData("presentationStyle") + " ";
			}
			return "";
		};

		const getSpec = function() {
			return spec;
		};

		const getDependencies = function() {
			return dependencies;
		};

		start();

		let out = Object.freeze({
			type: "pSurroundingContainer",
			getSpec: getSpec,
			getDependencies: getDependencies,
			getView: parent.getView
		});

		parent.getView().modelObject = out;
		return out;
	};
	return cora;
}(CORA));