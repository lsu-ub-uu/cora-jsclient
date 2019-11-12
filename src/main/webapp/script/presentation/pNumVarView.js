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
		spec.baseClassName=baseClassName;
		var info;
		var state = "ok";
		var level2info = cora.level2info(dependencies, spec);

		spec.createInput= function() {
			valueView = createTextTypeInput();
			possiblyAddOnkeyupEvent(valueView);
			possiblyAddOnblurEvent(valueView);
			return valueView;
		};
		spec.createOutput = function() {
			return createOutputText();
		};

		var varViewsuper = cora.varViewSuper(dependencies, spec);
		function start() {
			view = CORA.gui.createSpanWithClassName(baseClassName);
			info = createInfo();

			valueView = varViewsuper.createValueView();

			view.appendChild(valueView);
			view.appendChild(info.getButton());
			varViewsuper.setInfo(info);
			varViewsuper.setView(view);
		}
		function createInfo() {
			var infoSpec = {
				"appendTo" : view,
				"afterLevelChange" : varViewsuper.updateClassName,
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

		out = Object.freeze({
			type : "pNumVarView",
			getDependencies : varViewsuper.getDependencies,
			getSpec : varViewsuper.getSpec,
			getView : varViewsuper.getView,
			setValue : varViewsuper.setValue,
			updateClassName : varViewsuper.updateClassName,
			setState : varViewsuper.setState
		});
		start();
		return out;
	};
	return cora;
}(CORA));