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
var CORA = (function (cora) {
    "use strict";
    cora.gui.buttonView = function (spec, view) {
        var buttonView = view;
        var button = {};
        var action;

        button.possiblyHandleAction = function() {
            if (spec.action !== undefined) {
                handleAction();
            }
        };

        function handleAction() {
            action = spec.action.method;
        }

        button.possiblyAddOnclickMethod = function(){
            if (specDemandsClick()) {
                button.addOnclickForMethodFromAction();
            }
        };

        function specDemandsClick(){
            return spec.action !== undefined
                && (spec.action.clickable === true || spec.action.clickable === undefined);
        }

        button.addOnclickForMethodFromAction = function(){
            buttonView.addEventListener('click', (event) => {
                event.stopPropagation();
                action(event);
            });
        };

        button.possiblyAddOnkeydownMethod = function() {
            if(specDemandsKeydown()){
                addTabstop();
                addOnkeydownMethod();
            }
        };

        button.getView = function(){
            return buttonView;
        };

        function specDemandsKeydown(){
            return spec.action !== undefined &&
                spec.action.onkeydown !== undefined;
        }

        function addTabstop() {
            buttonView.tabIndex = 0;
        }

        function addOnkeydownMethod(){
            let onkeydownFunction = function(event) {
                if (spec.action.onkeydown.keys.indexOf(event.key) !== -1) {
                    event.stopPropagation();
                    action(event);
                }
            };
            buttonView.addEventListener("keydown", onkeydownFunction);
        }

        function specTextIsDefined() {
            return spec.text !== undefined;
        }

        button.possiblyAddText = function() {
            if(spec.type==="button") {
                if (specTextIsDefined()) {
                    buttonView.textContent = spec.text;
                }
            }else if(spec.type==="inputButton"){
                if (specTextIsDefined()) {
                    buttonView.value = spec.text;
                }
            }
        };

        button.init = function(){
            button.possiblyHandleAction();
            button.possiblyAddOnclickMethod();
            button.possiblyAddOnkeydownMethod();
            button.possiblyAddText();
        };


        return button;

    };


    return cora;
}(CORA));
