/*
 * Copyright 2018, 2020 Uppsala University Library
 * Copyright 2016, 2018 Olov McKie
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
	cora.pNumVarView = function(dependencies, spec) {
		let out;
		let view;
		let valueView;
		let baseClassName = "pNumVar " + spec.presentationId;
		let info;
		let state = "ok";

		const start = function() {
			view = CORA.gui.createSpanWithClassName(baseClassName);
			info = createInfo();

			createValueView();
			view.appendChild(valueView);
			view.appendChild(info.getButton());
		};

		const createInfo = function() {
			let infoSpec = {
				"appendTo": view,
				"afterLevelChange": updateClassName,
				"level1": [{
					"className": "textView",
					"text": spec.info.text
				}, {
					"className": "defTextView",
					"text": spec.info.defText
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
				"className": "technicalView",
				"text": techInfo.text
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

		const createValueView = function() {
			if (spec.mode === "input") {
				valueView = createInput();
			} else {
				valueView = createOutput();
			}
		};

		const createInput = function() {
			valueView = createTextTypeInput();
			possiblyAddOnkeyupEvent(valueView);
			possiblyAddOnblurEvent(valueView);
			return valueView;
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

		const createTextTypeInput = function() {
			let inputNew = document.createElement("input");
			inputNew.setValue = function(value) {
				inputNew.value = value;
			};
			return inputNew;
		};

		const createOutput = function() {
			return createOutputText();
		};

		const createOutputText = function() {
			let outputNew = CORA.gui.createSpanWithClassName("value");
			outputNew.setValue = function(value) {
				outputNew.textContent = value;
			};
			return outputNew;
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

		out = Object.freeze({
			"type": "pNumVarView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			setValue: setValue,
			updateClassName: updateClassName,
			setState: setState,
			disable: disable
		});
		start();
		return out;
	};
	return cora;
}(CORA));