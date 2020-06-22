/*
 * Copyright 2016, 2018, 2020 Uppsala University Library
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
	cora.pNumVar = function(dependencies, spec) {
		let metadataProvider = dependencies.metadataProvider;
		let pubSub = dependencies.pubSub;
		let textProvider = dependencies.textProvider;
		let jsBookkeeper = dependencies.jsBookkeeper;
		let path = spec.path;
		let cPresentation = spec.cPresentation;
		let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		let presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");

		let metadataId = spec.metadataIdUsedInData;

		let cMetadataElement = getMetadataById(metadataId);
		let min = getValueByNameInData("min");
		let max = getValueByNameInData("max");
		let warningMin = getValueByNameInData("warningMin");
		let warningMax = getValueByNameInData("warningMax");
		let numberOfDecimals = getValueByNameInData("numberOfDecimals");
		let mode = cPresentation.getFirstAtomicValueByNameInData("mode");

		let textId = getTextId(cMetadataElement, "textId");
		let text = textProvider.getTranslation(textId);

		let defTextId = getTextId(cMetadataElement, "defTextId");
		let defText = textProvider.getTranslation(defTextId);

		let nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

		let pNumVarViewSpec = {
			"mode" : mode,
			"presentationId" : presentationId,
			"info" : {
				"text" : text,
				"defText" : defText,
				"technicalInfo" : [ {
					"text" : "textId: " + textId,
					onclickMethod : openTextIdRecord
				}, {
					"text" : "defTextId: " + defTextId,
					onclickMethod : openDefTextIdRecord
				}, {
					"text" : "metadataId: " + metadataId,
					onclickMethod : openMetadataIdRecord
				}, {
					"text" : "nameInData: " + nameInData
				}, {
					"text" : "presentationId: " + presentationId
				}, {
					"text" : "min: " + min
				}, {
					"text" : "max: " + max
				}, {
					"text" : "warningMin: " + warningMin
				}, {
					"text" : "warningMax: " + warningMax
				} ]
			},
			"onblurFunction" : onBlur,
			onkeyupFunction : onkeyup
		};

		let pNumVarView = dependencies.pNumVarViewFactory.factor(pNumVarViewSpec);
		let state = "ok";
		let previousValue = "";
		
		const disableNumVar = function(){
			pNumVarView.disable();
		};
		
		pubSub.subscribe("setValue", path, undefined, handleMsg);
		pubSub.subscribe("validationError", path, undefined, handleValidationError);
		
		let topLevelPath = createTopLevelPath();
		pubSub.subscribe("disable", topLevelPath, undefined, disableNumVar);

		function getTextId(cMetadataElementIn, textNameInData) {
			let cTextGroup = CORA.coraData(cMetadataElementIn
					.getFirstChildByNameInData(textNameInData));
			return cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		}
		
		function createTopLevelPath(){
			if(pathHasChildren()){
				let cPath = CORA.coraData(path);
				if (cPath.containsChildWithNameInData("linkedPath")) {
					return createPathWithOnlyTopLevelInformation(cPath);
				}
			}
			
			return path;
		}
		
		function pathHasChildren(){
			return path.children !== undefined;
		}
		
		function createPathWithOnlyTopLevelInformation(cPath){
			let pathNameInData = cPath.getFirstAtomicValueByNameInData("nameInData");
			let newTopLevelPath = {
					"name" : "linkedPath",
					"children": [
						{
							"name": "nameInData",
							"value": pathNameInData
						}]
			};
			if(cPath.containsChildWithNameInData("attributes")){
				let attributes = cPath.getFirstChildByNameInData("attributes");
				newTopLevelPath.children.push(attributes);
			}
			return newTopLevelPath;
		}

		function getView() {
			return pNumVarView.getView();
		}

		function setValue(value) {
			state = "ok";
			previousValue = value;
			pNumVarView.setValue(value);
		}

		function handleMsg(dataFromMsg) {
			setValue(dataFromMsg.data);
			updateView();
		}

		function handleValidationError() {
			state = "error";
			updateView();
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function getText() {
			return text;
		}

		function getDefText() {
			return defText;
		}

		function getMin() {
			return min;
		}

		function getValueByNameInData(nameInData) {
			return cMetadataElement.getFirstAtomicValueByNameInData(nameInData);
		}

		function getMax() {
			return max;
		}

		function getWarningMin() {
			return warningMin;
		}

		function getWarningMax() {
			return warningMax;
		}

		function getNumberOfDecimals() {
			return numberOfDecimals;

		}

		function onBlur(valueFromView) {
			handleValueFromView(valueFromView, "error");
		}

		function handleValueFromView(valueFromView, errorState) {
			if (valueFromView !== "") {
				checkValueBetweenMinAndMaxIfNumber(valueFromView, errorState);
			}
			updateView();
			if (state === "ok" && valueHasChanged(valueFromView)) {
				let data = {
					"data" : valueFromView,
					"path" : path
				};
				jsBookkeeper.setValue(data);
				previousValue = valueFromView;
			}
		}

		function checkValueBetweenMinAndMaxIfNumber(valueFromView, errorState) {
			let validator = CORA.numberVariableValidator({
				"metadataProvider" : metadataProvider,
			});
			let validationAnswer = validator.validateData(valueFromView, cMetadataElement);

			if (validationAnswer) {
				state = "ok";
			} else {
				state = errorState;
			}
		}

		function onkeyup(valueFromView) {
			handleValueFromView(valueFromView, "errorStillFocused");
		}

		function updateView() {
			pNumVarView.setState(state);
		}

		function valueHasChanged(valueFromView) {
			return valueFromView !== previousValue;
		}

		function getState() {
			return state;
		}

		function getSpec() {
			return spec;
		}

		function openLinkedRecordForLink(event, link) {
			let loadInBackground = "false";
			if (event.ctrlKey) {
				loadInBackground = "true";
			}
			let openInfo = {
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

		return Object.freeze({
			"type" : "pNumVar",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			setValue : setValue,
			handleMsg : handleMsg,
			getText : getText,
			getDefText : getDefText,
			getMin : getMin,
			getMax : getMax,
			getWarningMin : getWarningMin,
			getWarningMax : getWarningMax,
			getNumberOfDecimals : getNumberOfDecimals,
			getState : getState,
			onBlur : onBlur,
			onkeyup : onkeyup,
			handleValidationError : handleValidationError,
			openTextIdRecord : openTextIdRecord,
			openDefTextIdRecord : openDefTextIdRecord,
			openMetadataIdRecord : openMetadataIdRecord,
			disableNumVar : disableNumVar
		});
	};
	return cora;
}(CORA));