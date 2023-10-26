/*
 * Copyright 2016, 2018, 2023 Olov McKie
 * Copyright 2019, 2020 Uppsala University Library
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
	cora.pParentMultipleChildrenView = function(dependencies, spec, child) {
		const infoFactory = dependencies.infoFactory;
		let out;
		let view;
		let valueView;
		let baseClassName;
		let info;
		let state = "ok";

		const start = function() {
		//		let baseClassName = "pVar " + spec.presentationId;
		//TODO: test spec.className, or move it to getBaseClassName for children that need it
			baseClassName = child.getBaseClassName()+" "+spec.className+" " + spec.presentationId;
			view = CORA.gui.createDivWithClassName(baseClassName);
			info = createInfo();
			view.appendChild(info.getButton());
			possiblyAddLableTextToView();
			valueView = createValueView();
			view.appendChild(valueView);
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
		
		const modeIsInput = function(){
			return (spec.mode === "input");
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

		const createInput = function() {
			valueView = createInputElement();
			valueView.id = spec.id;
			possiblyAddOnkeyupEvent(valueView);
			possiblyAddOnblurEvent(valueView);
			possiblyAddPlaceholderText(valueView);
			return valueView;
		};

		const createInputElement = function() {
			return child.createInputElementWithSetValueFunction();
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
			if(child.useStandardOutput()){
				return createOutputText();
			}
			return child.createOutputWithSetValueFunction();
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
//				appendTo: view,
				// "insertAfter" is set to infoButton below
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
			let newInfo = infoFactory.factor(infoSpec);
			infoSpec.insertAfter = newInfo.getButton();
			return newInfo;
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
		
		const hide = function(element) {
			view.styleOriginal = view.style.display;
			view.style.display = "none";
		};

		const show = function(element) {
			if (view.styleOriginal !== undefined) {
				view.style.display = view.styleOriginal;
			} else {
				view.style.display = "";
			}
		};
		//TODO: test
		const appendChild = function(child) {
			view.appendChild(child);
		};
		out = Object.freeze({
			type: "pParentMultipleChildrenView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			setValue: setValue,
			updateClassName: updateClassName,
			setState: setState,
			disable: disable,
			addAttributesView: addAttributesView,
			appendChild: appendChild,
			hide: hide,
			show: show
		});
		start();
		return out;
	};
	return cora;
}(CORA));