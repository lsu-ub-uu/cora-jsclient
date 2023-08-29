/*
 * Copyright 2016, 2018, 2020 Uppsala University Library
 * Copyright 2016, 2017, 2018, 2023 Olov McKie
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
		let textProvider = dependencies.textProvider;
		let pubSub = dependencies.pubSub;
		let jsBookkeeper = dependencies.jsBookkeeper;
		let path = spec.path;
		let cPresentation = spec.cPresentation;
		let presentationId;
		let metadataId = spec.metadataIdUsedInData;
		let state = "ok";
		let previousValue = "";
		let pNumVarView;
		let cMetadataElement;
		let text;
		let defText;
		let min;
		let max;
		let warningMin;
		let warningMax;
		let numberOfDecimals;
		let mode;
		let pAttributes;

		const start = function() {
			initializeGlobalVariables();
			factorPNumVarView();
			subscribeToPubSub();
			initPAttributes();
		};

		const initializeGlobalVariables = function() {
			cMetadataElement = getMetadataById();
			min = getValueByNameInData("min");
			max = getValueByNameInData("max");
			warningMin = getValueByNameInData("warningMin");
			warningMax = getValueByNameInData("warningMax");
			numberOfDecimals = getValueByNameInData("numberOfDecimals");
		};

		const factorPNumVarView = function() {
			let pNumVarViewSpec = initializePNumVarViewSpec();
			possiblyAddPlaceHolderText(textProvider, pNumVarViewSpec);
			pNumVarView = dependencies.pNumVarViewFactory.factor(pNumVarViewSpec);
		};

		const initializePNumVarViewSpec = function() {
			let textProvider = dependencies.textProvider;
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			mode = cPresentation.getFirstAtomicValueByNameInData("mode");
			let nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
			let textId = getTextId(cMetadataElement, "textId");
			text = textProvider.getTranslation(textId);
			let defTextId = getTextId(cMetadataElement, "defTextId");
			defText = textProvider.getTranslation(defTextId);

			return {
				mode: mode,
				presentationId: presentationId,
				info: {
					text: text,
					defText: defText,
					technicalInfo: [{
						text: "textId: " + textId,
						onclickMethod: openTextIdRecord
					}, {
						text: "defTextId: " + defTextId,
						onclickMethod: openDefTextIdRecord
					}, {
						text: "metadataId: " + metadataId,
						onclickMethod: openMetadataIdRecord
					}, {
						text: "nameInData: " + nameInData
					}, {
						text: "presentationId: " + presentationId,
						onclickMethod: openPresentationIdRecord
					}, {
						text: "min: " + min
					}, {
						text: "max: " + max
					}, {
						text: "warningMin: " + warningMin
					}, {
						text: "warningMax: " + warningMax
					}, {
						text: "numberOfDecimals: " + numberOfDecimals
					}]
				},
				onblurFunction: onBlur,
				onkeyupFunction: onkeyup
			};
		};
		
		const possiblyAddPlaceHolderText = function(textProvider, pVarViewSpec) {
			if (cPresentation.containsChildWithNameInData("emptyTextId")) {
				let cEmptyTextId = CORA.coraData(cPresentation
					.getFirstChildByNameInData("emptyTextId"));
				let emptyTextId = cEmptyTextId.getFirstAtomicValueByNameInData("linkedRecordId");
				let emptyText = textProvider.getTranslation(emptyTextId);
				pVarViewSpec.placeholderText = emptyText;
			}
		};

		const subscribeToPubSub = function() {
			pubSub.subscribe("setValue", path, undefined, handleMsg);
			pubSub.subscribe("validationError", path, undefined, handleValidationError);
			let disablePath = ensureNoRepeatIdInLowestLevelOfPath();
			pubSub.subscribe("disable", disablePath, undefined, disableNumVar);
		};

		const initPAttributes = function() {
			let pAttributesSpec = {
				addViewToParent: pNumVarView.addAttributesView,
				path: path,
				mode: mode
			};
			pAttributes = dependencies.pAttributesFactory.factor(pAttributesSpec);
		};

		const disableNumVar = function() {
			pAttributes.disableExistingAttributes();
			pNumVarView.disable();
		};

		const getTextId = function(cMetadataElementIn, textNameInData) {
			let cTextGroup = CORA.coraData(cMetadataElementIn
				.getFirstChildByNameInData(textNameInData));
			return cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const ensureNoRepeatIdInLowestLevelOfPath = function() {
			let pathUtils = CORA.pathUtils();
			return pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
		};

		const getView = function() {
			return pNumVarView.getView();
		};

		const setValue = function(value) {
			state = "ok";
			previousValue = value;
			pNumVarView.setValue(value);
		};

		const handleMsg = function(dataFromMsg) {
			setValue(dataFromMsg.data);
			updateView();
		};

		const handleValidationError = function() {
			state = "error";
			updateView();
		};

		const getMetadataById = function() {
			return CORA.coraData(metadataProvider.getMetadataById(metadataId));
		};

		const getValueByNameInData = function(nameInData) {
			return cMetadataElement.getFirstAtomicValueByNameInData(nameInData);
		};

		const onBlur = function(valueFromView) {
			handleValueFromView(valueFromView, "error");
		};

		const handleValueFromView = function(valueFromView, errorState) {
			if (valueFromView === "") {
				state = "ok";
			} else {
				checkValueBetweenMinAndMaxIfNumber(valueFromView, errorState);
			}
			updateView();
			if (state === "ok" && valueHasChanged(valueFromView)) {
				let data = {
					data: valueFromView,
					path: path
				};
				jsBookkeeper.setValue(data);
				previousValue = valueFromView;
			}
		};

		const checkValueBetweenMinAndMaxIfNumber = function(valueFromView, errorState) {
			let validator = CORA.numberVariableValidator({
				metadataProvider: metadataProvider,
			});
			let validationAnswer = validator.validateData(valueFromView, cMetadataElement);

			if (validationAnswer) {
				state = "ok";
			} else {
				state = errorState;
			}
		};

		const onkeyup = function(valueFromView) {
			handleValueFromView(valueFromView, "errorStillFocused");
		};

		const updateView = function() {
			pNumVarView.setState(state);
		};

		const valueHasChanged = function(valueFromView) {
			return valueFromView !== previousValue;
		};

		const getState = function() {
			return state;
		};

		const getSpec = function() {
			return spec;
		};

		const openLinkedRecordForLink = function(event, link) {
			let loadInBackground = "false";
			if (event.ctrlKey) {
				loadInBackground = "true";
			}
			let openInfo = {
				readLink: link,
				loadInBackground: loadInBackground
			};
			dependencies.clientInstanceProvider.getJsClient().openRecordUsingReadLink(openInfo);
		};

		const openTextIdRecord = function(event) {
			openLinkedRecordForLink(event,
				cMetadataElement.getFirstChildByNameInData("textId").actionLinks.read);
		};

		const openDefTextIdRecord = function(event) {
			openLinkedRecordForLink(event,
				cMetadataElement.getFirstChildByNameInData("defTextId").actionLinks.read);
		}

		const openMetadataIdRecord = function(event) {
			openLinkedRecordForLink(event, cPresentation
				.getFirstChildByNameInData("presentationOf").actionLinks.read);
		}

		const openPresentationIdRecord = function(event) {
			let presentationRecord = metadataProvider.getMetadataRecordById(presentationId);
			openLinkedRecordForLink(event, presentationRecord.actionLinks.read);
		};

		const getDependencies = function() {
			return dependencies;
		};

		start();

		return Object.freeze({
			type: "pNumVar",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			setValue: setValue,
			handleMsg: handleMsg,
			getState: getState,
			onBlur: onBlur,
			onkeyup: onkeyup,
			handleValidationError: handleValidationError,
			openTextIdRecord: openTextIdRecord,
			openDefTextIdRecord: openDefTextIdRecord,
			openMetadataIdRecord: openMetadataIdRecord,
			openPresentationIdRecord: openPresentationIdRecord,
			disableNumVar: disableNumVar
		});
	};
	return cora;
}(CORA));