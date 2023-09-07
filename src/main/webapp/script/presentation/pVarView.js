/*
 * Copyright 2019, 2020 Uppsala University Library
 * Copyright 2016, 2018, 2023 Olov McKie
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
	cora.pVarView = function(dependencies, spec) {
		let out;
		let view;
		let valueView;
		let baseClassName = "pVar " + spec.presentationId;
		let info;
		let state = "ok";

		const start = function() {
			view = CORA.gui.createSpanWithClassName(baseClassName);
			possiblyAddLableTextToView();
			valueView = createValueView();
			view.appendChild(valueView);
			info = createInfo();
			view.appendChild(info.getButton());
		};
		
		const possiblyAddLableTextToView = function() {
			if(spec.label){
				if(modeIsInput()){
					addLabelForInput();
				}else{
					addLabelForOutput();
				}
			}
		};
		
		const addLabelForInput = function(){
			let label = document.createElement("label");
			view.appendChild(label);
			label.appendChild(document.createTextNode(spec.label));
			label.htmlFor = spec.id;
		};

		const addLabelForOutput = function(){
			let label = CORA.gui.createSpanWithClassName("label");
			view.appendChild(label);
			label.appendChild(document.createTextNode(spec.label));
		};
		
		const createValueView = function() {
			if (modeIsInput()) {
				return createInput();
			}
			return createOutput();
		};
		
		const modeIsInput = function(){
			return (spec.mode === "input");
		};

		const createInput = function() {
			valueView = createTextTypeInput();
			valueView.id = spec.id;
			possiblyAddOnkeyupEvent(valueView);
			possiblyAddOnblurEvent(valueView);
			possiblyAddPlaceholderText(valueView);
			return valueView;
		};
		
		const createTextTypeInput = function() {
			let inputNew = document.createElement(getInputTypeFromSpec());
			if (spec.inputFormat === "password") {
				inputNew.setAttribute("type", "password");
			}

			inputNew.setValue = function(value) {
				inputNew.value = value;
			};
			return inputNew;
		};

		const getInputTypeFromSpec = function() {
			if (spec.inputType !== undefined) {
				return spec.inputType;
			}
			return "input";
		};

		const possiblyAddOnkeyupEvent = function(valueViewIn) {
			if (spec.onkeyupFunction !== undefined) {
				valueViewIn.onkeyup = function() {
					spec.onkeyupFunction(valueViewIn.value);
				};
			}
		};

		const possiblyAddOnblurEvent = function(valueViewIn) {
			if (spec.onblurFunction !== undefined) {
				valueViewIn.onblur = function() {
					spec.onblurFunction(valueViewIn.value);
				};
			}
		};

		const possiblyAddPlaceholderText = function(inputNew) {
			if (spec.placeholderText !== undefined) {
				inputNew.placeholder = spec.placeholderText;
			}
		};

		const createOutput = function() {
			if (spec.outputFormat === "image") {
				return createOutputImage();
			} else if (spec.outputFormat === "link") {
				return createOutputLink();
			}
			return createOutputText();
		};

		const createOutputImage = function() {
			let outputNew = document.createElement("img");
			outputNew.setValue = function(value) {
				outputNew.src = value;
			};
			return outputNew;
		};

		const createOutputLink = function() {
			let outputNew = document.createElement("a");
			outputNew.setValue = function(value) {
				outputNew.href = value;
				outputNew.text = value;
			};
			return outputNew;
		};

		const createOutputText = function() {
			let outputNew = CORA.gui.createSpanWithClassName("value");
			outputNew.setValue = function(value) {
				outputNew.textContent = value;
			};
			return outputNew;
		};
		
		const createInfo = function() {
			let infoSpec = {
				appendTo: view,
				afterLevelChange: updateClassName,
				level1: [{
					className: "textView",
					text: spec.info.text
				}, {
					className: "defTextView",
					text: spec.info.defText
				}]
			};
			possiblyAddLevel2Info(infoSpec);
			return dependencies.infoFactory.factor(infoSpec);
		};

		const possiblyAddLevel2Info = function(infoSpec) {
			if (specInfoHasTechnicalInfo()) {
				addLevelTechnicalInfoAsLevel2(infoSpec);
			}
		};

		const specInfoHasTechnicalInfo = function() {
			return spec.info.technicalInfo;
		};

		const addLevelTechnicalInfoAsLevel2 = function(infoSpec) {
			infoSpec.level2 = [];
			spec.info.technicalInfo.forEach(function(techInfo) {
				infoSpec.level2.push(createTechInfoPart(techInfo));
			});
		};

		const createTechInfoPart = function(techInfo) {
			let techInfoPart = {
				className: "technicalView",
				text: techInfo.text
			};

			if (techInfo.onclickMethod !== undefined) {
				techInfoPart.onclickMethod = techInfo.onclickMethod;
			}
			return techInfoPart;
		};

		const updateClassName = function() {
			let className = baseClassName;
			if (stateIndicatesError()) {
				className += " error";
			}
			if (stateIndicatesErrorStillFocused()) {
				className += " errorStillFocused";
			}
			if (infoIsShown()) {
				className += " infoActive";
			}
			view.className = className;
		};

		const stateIndicatesError = function() {
			return state === "error";
		};

		const stateIndicatesErrorStillFocused = function() {
			return state === "errorStillFocused";
		};

		const infoIsShown = function() {
			return info.getInfoLevel() !== 0;
		};

		const getView = function() {
			return view;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const setValue = function(value) {
			valueView.setValue(value);
		};

		const setState = function(stateIn) {
			state = stateIn;
			updateClassName();
		};

		const disable = function() {
			valueView.disabled = true;
		};

		const addAttributesView = function(attributesView) {
			view.insertBefore(attributesView, valueView);
		};

		out = Object.freeze({
			type: "pVarView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			setValue: setValue,
			updateClassName: updateClassName,
			setState: setState,
			disable: disable,
			addAttributesView: addAttributesView
		});
		start();
		return out;
	};
	return cora;
}(CORA));