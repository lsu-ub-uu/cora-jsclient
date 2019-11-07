/*
 * Copyright 2019 Uppsala University Library
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
    cora.varViewSuper = function(dependencies, spec) {

        var out;
        var view;
        var valueView;
        var baseClassName = "pNumVar " + spec.presentationId;
        var info;
        var state = "ok";

        var viewFoo = cora.viewFoo(dependencies, spec);

        function start() {
            view = CORA.gui.createSpanWithClassName(baseClassName);
            info = createInfo();

            createValueView();
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
            viewFoo.possiblyAddLevel2Info(infoSpec);
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

        function createValueView() {
            if (spec.mode === "input") {
                valueView = createInput();
            } else {
                valueView = createOutput();
            }
        }


        function createInput() {
            valueView = createTextTypeInput();
            possiblyAddOnkeyupEvent(valueView);
            possiblyAddOnblurEvent(valueView);
            return valueView;
        }

        function createTextTypeInput() {
            var inputNew = document.createElement(getInputTypeFromSpec());
            if (spec.inputFormat === "password") {
                inputNew.setAttribute("type", "password");
            }

            inputNew.setValue = function(value) {
                inputNew.value = value;
            };
            return inputNew;
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

        var out = Object.freeze({
            "type" : "pVarView",
            getDependencies : getDependencies,
            getSpec : getSpec,
            getView : getView,
            setValue : setValue,
            updateClassName : updateClassName,
            setState : setState,
            createValueView:createValueView
        });

      return out;


    };
    return cora;
}(CORA));