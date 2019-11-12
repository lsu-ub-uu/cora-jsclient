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
        var view = spec.view;
        var valueView;
        var baseClassName = spec.baseClassName;
        var state = "ok";
        var info;
        var level2info = cora.level2info(dependencies, spec);


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
                valueView = spec.createInput();
            } else {
                valueView = spec.createOutput();
            }
            return valueView;
        }



        function getInputTypeFromSpec() {
            if (spec.inputType !== undefined) {
                return spec.inputType;
            }
            return "input";
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

        function setInfo(infoIn){
            info = infoIn;
        }

        function setView(viewIn){
            view = viewIn;
        }


        var out = Object.freeze({
            "type" : "pVarView",
            getDependencies : getDependencies,
            getSpec : getSpec,
            getView : getView,
            setValue : setValue,
            updateClassName : updateClassName,
            setState : setState,
            createValueView:createValueView,
            getInputTypeFromSpec: getInputTypeFromSpec,
            setInfo:setInfo,
            setView:setView
        });

      return out;


    };
    return cora;
}(CORA));