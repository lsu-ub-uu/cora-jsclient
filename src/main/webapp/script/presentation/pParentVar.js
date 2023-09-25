/*
 * Copyright 2016, 2020 Uppsala University Library
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
	cora.pParentVar = function(dependencies, spec, child) {

		const metadataProvider = dependencies.metadataProvider;
		const textProvider = dependencies.textProvider;
//		const pubSub = dependencies.pubSub;
//		const jsBookkeeper = dependencies.jsBookkeeper;
		let path = spec.path;
		let cMetadataElement;
		let cPresentation = spec.cPresentation;
		let presentationId;
//		let state = "ok";
//		let previousValue = "";
		let pVarView;
		let text;
		let defText;
//		let regEx;
		let mode;
//		let pAttributes;

		const start = function() {
			let pVarViewSpec = intializePVarViewSpec();
			addTypeSpecificInfoToViewSpec(pVarViewSpec);
			pVarView = dependencies.pVarViewFactory.factor(pVarViewSpec);
//			subscribeToPubSub();
//			initPAttributes();
		};

		const intializePVarViewSpec = function() {
			let metadataId = spec.metadataIdUsedInData;
			cMetadataElement = getMetadataById(metadataId);
			mode = cPresentation.getFirstAtomicValueByNameInData("mode");
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			let nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
			let textId = getTextId(cMetadataElement, "textId");
			text = textProvider.getTranslation(textId);
			let defTextId = getTextId(cMetadataElement, "defTextId");
			defText = textProvider.getTranslation(defTextId);

			let pVarViewSpec = {
				id: path.join(""),
				mode: mode,
				presentationId: presentationId,
				info: {
					text: text,
					defText: defText,
					technicalInfo: [
					{
						text: `textId: ${textId}`,
						onclickMethod: openTextIdRecord
					}, {
						text: `defTextId: ${defTextId}`,
						onclickMethod: openDefTextIdRecord
					}, {
						text: `metadataId: ${metadataId}`,
						onclickMethod: openMetadataIdRecord
					}, {
						text: `nameInData: ${nameInData}`,
					}, {
						text: `presentationId: ${presentationId}`,
						onclickMethod: openPresentationIdRecord
					}
					]
				},
//				onblurFunction: onBlur,
//				onkeyupFunction: onkeyup,
			};
			possiblyAddPlaceHolderText(pVarViewSpec);
			possiblyAddLabelToViewSpec(pVarViewSpec);
			
			
			return pVarViewSpec;
		};
		
		const addTypeSpecificInfoToViewSpec = function(pVarViewSpec) {
//			pVarViewSpec.inputType = getInputType();
//			pVarViewSpec.outputFormat = getOutputFormat();
//			pVarViewSpec.inputFormat = getInputFormat();
//			
//			regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");
//			pVarViewSpec.info.technicalInfo.push({text: `regEx: ${regEx}`});
				
		};
//
		const possiblyAddPlaceHolderText = function(pVarViewSpec) {
			if (cPresentation.containsChildWithNameInData("emptyTextId")) {
				let emptyTextId = cPresentation.getLinkedRecordIdFromFirstChildLinkWithNameInData("emptyTextId");
				let emptyText = textProvider.getTranslation(emptyTextId);
				pVarViewSpec.placeholderText = emptyText;
			}
		};

		const possiblyAddLabelToViewSpec = function(pVarViewSpec){
			if(labelShouldBeShown()){
				addLabelToViewSpec(pVarViewSpec);
			}
		};
		
		const labelShouldBeShown = function (){
			if(!cPresentation.containsChildWithNameInData("showLabel")){
				return true;
			}
			return (cPresentation.getFirstAtomicValueByNameInData("showLabel") !== "false");
		};
		
		const addLabelToViewSpec = function(pVarViewSpec){
			if (cPresentation.containsChildWithNameInData("otherLabelText")) {
				let otherLabelTextId = cPresentation.getLinkedRecordIdFromFirstChildLinkWithNameInData("otherLabelText");
				let otherLabelText = textProvider.getTranslation(otherLabelTextId);
				pVarViewSpec.label = otherLabelText;
			}else{
				pVarViewSpec.label = text;
			}
		};
		
		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const getOutputFormat = function() {
//			if (cPresentation.containsChildWithNameInData("outputFormat")) {
//				return cPresentation.getFirstAtomicValueByNameInData("outputFormat");
//			}
			return "text";
		};
//
		const getInputFormat = function() {
			if (cPresentation.containsChildWithNameInData("inputFormat")) {
				return cPresentation.getFirstAtomicValueByNameInData("inputFormat");
			}
			return "text";
		};

		const getTextId = function(cMetadataElementIn, textNameInData) {
			return cMetadataElementIn.getLinkedRecordIdFromFirstChildLinkWithNameInData(textNameInData);
				
		};

		const getInputType = function() {
			if (cPresentation.containsChildWithNameInData("inputType")) {
				return cPresentation.getFirstAtomicValueByNameInData("inputType");
			}
			return "input";
		};
//
//		const subscribeToPubSub = function() {
//			pubSub.subscribe("setValue", path, undefined, handleMsg);
//			pubSub.subscribe("validationError", path, undefined, handleValidationError);
//			let disablePath = ensureNoRepeatIdInLowestLevelOfPath();
//			pubSub.subscribe("disable", disablePath, undefined, disableVar);
//		};
//
//		const initPAttributes = function() {
//			let pAttributesSpec = {
//				addViewToParent: pVarView.addAttributesView,
//				path: path,
//				mode: mode
//			};
//			pAttributes = dependencies.pAttributesFactory.factor(pAttributesSpec);
//		};
//
//
//		const ensureNoRepeatIdInLowestLevelOfPath = function() {
//			let pathUtils = CORA.pathUtils();
//			return pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
//		};
//
//		const getView = function() {
//			return pVarView.getView();
//		};
//
//		const setValue = function(value) {
//			state = "ok";
//			previousValue = value;
//			pVarView.setValue(value);
//		};
//
//		const handleMsg = function(dataFromMsg) {
//			setValue(dataFromMsg.data);
//			updateView();
//		};
//
//		const handleValidationError = function() {
//			state = "error";
//			updateView();
//		};
//
//		const getText = function() {
//			return text;
//		};
//
//		const getDefText = function() {
//			return defText;
//		};
//
//		const getRegEx = function() {
//			return regEx;
//		};
//
//		const onBlur = function(valueFromView) {
//			handleValueFromView(valueFromView, "error");
//		};
//
//		const handleValueFromView = function(valueFromView, errorState) {
//			checkRegEx(valueFromView, errorState);
//			updateView();
//			if (state === "ok" && valueHasChanged(valueFromView)) {
//				let data = {
//					data: valueFromView,
//					path: path
//				};
//				jsBookkeeper.setValue(data);
//				previousValue = valueFromView;
//			}
//		};
//
//		const checkRegEx = function(valueFromView, errorState) {
//			let value = valueFromView;
//			if (value.length === 0 || new RegExp(regEx).test(value)) {
//				state = "ok";
//			} else {
//				state = errorState;
//			}
//		};
//
//		const onkeyup = function(valueFromView) {
//			handleValueFromView(valueFromView, "errorStillFocused");
//		};
//
//		const updateView = function() {
//			pVarView.setState(state);
//		};
//
//		const valueHasChanged = function(valueFromView) {
//			return valueFromView !== previousValue;
//		};
//
//		const getState = function() {
//			return state;
//		};
//
//		const getSpec = function() {
//			return spec;
//		};
//
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
		};

		const openMetadataIdRecord = function(event) {
			openLinkedRecordForLink(event, cPresentation
				.getFirstChildByNameInData("presentationOf").actionLinks.read);
		};

		const openPresentationIdRecord = function(event) {
			let presentationRecord = metadataProvider.getMetadataRecordById(presentationId);
			openLinkedRecordForLink(event, presentationRecord.actionLinks.read);
		};

		const getDependencies = function() {
			return dependencies;
		};
		
		const getSpec = function() {
			return spec;
		};
//
//		
		const disableVar = function() {
//			pAttributes.disableExistingAttributes();
			pVarView.disable();
		};

		start();
		return Object.freeze({
			type: "pParentVar",
			getDependencies: getDependencies,
			getSpec: getSpec,
//			getView: getView,
//			setValue: setValue,
//			handleMsg: handleMsg,
//			getText: getText,
//			getDefText: getDefText,
//			getRegEx: getRegEx,
//			getState: getState,
//			onBlur: onBlur,
//			onkeyup: onkeyup,
//			handleValidationError: handleValidationError,
			openTextIdRecord: openTextIdRecord,
			openDefTextIdRecord: openDefTextIdRecord,
			openMetadataIdRecord: openMetadataIdRecord,
			openPresentationIdRecord: openPresentationIdRecord,
			disableVar: disableVar
		});

	};
	return cora;
}(CORA));