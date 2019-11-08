/*
 * Copyright 2018 Uppsala University Library
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
		var out;
		var view;
		var valueView;
		var baseClassName = "pNumVar " + spec.presentationId;
		var info;
		var state = "ok";
		var level2info = cora.level2info(dependencies, spec);
		var fun={};
		fun.createInput= function() {
			valueView = createTextTypeInput();
			possiblyAddOnkeyupEvent(valueView);
			possiblyAddOnblurEvent(valueView);
			return valueView;
		};
		fun.createOutput = function() {
			return createOutputText();
		};

		var varViewsuper = cora.varViewSuper(fun,dependencies, spec);
		function start() {
			view = CORA.gui.createSpanWithClassName(baseClassName);
			info = createInfo();

			valueView = varViewsuper.createValueView();
			view.appendChild(valueView);
			view.appendChild(info.getButton());
		}
		function createInfo() {
			var infoSpec = {
				"appendTo" : view,
				"afterLevelChange" : updateClassName,
				"level1" : [ {
					"className" : "textView",
					"text" : spec.info.text
				}, {
					"className" : "defTextView",
					"text" : spec.info.defText
				} ]
			};
			level2info.possiblyAddLevel2Info(infoSpec);
			return dependencies.infoFactory.factor(infoSpec);
		}


		function updateClassName() {
			var className = baseClassName;
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
		}

		function stateIndicatesError() {
			return state === "error";
		}
		function stateIndicatesErrorStillFocused() {
			return state === "errorStillFocused";
		}

		function infoIsShown() {
			return info.getInfoLevel() !== 0;
		}

		function possiblyAddOnkeyupEvent(valueViewIn) {
			if (spec.onkeyupFunction !== undefined) {
				valueViewIn.onkeyup = function() {
					spec.onkeyupFunction(valueViewIn.value);
				};
			}
		}

		function possiblyAddOnblurEvent(valueViewIn) {
			if (spec.onblurFunction !== undefined) {
				valueViewIn.onblur = function() {
					spec.onblurFunction(valueViewIn.value);
				};
			}
		}

		function createTextTypeInput() {
			var inputNew = document.createElement("input");
			inputNew.setValue = function(value) {
				inputNew.value = value;
			};
			return inputNew;
		}


		function createOutputText() {
			var outputNew = CORA.gui.createSpanWithClassName("value");
			outputNew.setValue = function(value) {
				outputNew.textContent = value;
			};
			return outputNew;
		}

		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function setValue(value) {
			valueView.setValue(value);
		}

		function setState(stateIn) {
			state = stateIn;
			updateClassName();
		}

		out = Object.freeze({
			"type" : "pNumVarView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			setValue : setValue,
			updateClassName : updateClassName,
			setState : setState
		});
		start();
		return out;
	};
	return cora;
}(CORA));