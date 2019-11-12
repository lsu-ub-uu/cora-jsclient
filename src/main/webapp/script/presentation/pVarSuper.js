/*
 * Copyright 2019, Uppsala University Library
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
    cora.pVarSuper = function(dependencies, spec) {
        var cMetadataElement = spec.cMetadataElement;
        var cPresentation = spec.cPresentation;

        var previousValue ="";
        var stateIn="ok";

        function valueHasChanged(valueFromView) {
            return valueFromView !== previousValue;
        }

        function setPreviousValue(value){
            previousValue = value;
        }


        function getSpec() {
            return spec;
        }

        function openLinkedRecordForLink(event, link) {
            var loadInBackground = "false";
            if (event.ctrlKey) {
                loadInBackground = "true";
            }
            var openInfo = {
                "readLink" : link,
                "loadInBackground" : loadInBackground
            };
            dependencies.clientInstanceProvider.getJsClient().openRecordUsingReadLink(openInfo);
        }

        function openTextIdRecord(event) {
            openLinkedRecordForLink(event,
                cMetadataElement.getFirstChildByNameInData("textId").actionLinks.read);
        }

        function openDefTextIdRecord(event) {
            openLinkedRecordForLink(event,
                cMetadataElement.getFirstChildByNameInData("defTextId").actionLinks.read);
        }

        function openMetadataIdRecord(event) {
            openLinkedRecordForLink(event, cPresentation
                .getFirstChildByNameInData("presentationOf").actionLinks.read);
        }

        function getDependencies() {
            return dependencies;
        }

        function getState(){
            return stateIn;
        }

        function setState(state){
            stateIn = state;
        }

        return {
            getDependencies:getDependencies,
            openTextIdRecord:openTextIdRecord,
            openDefTextIdRecord:openDefTextIdRecord,
            openMetadataIdRecord:openMetadataIdRecord,
            getSpec:getSpec,
            valueHasChanged:valueHasChanged,
            setPreviousValue:setPreviousValue,
            getState:getState,
            setState:setState
        }


    };
    return cora;
}(CORA));