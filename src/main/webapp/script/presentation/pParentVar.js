/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2016, 2017, 2018, 2023, 2024 Olov McKie
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
		const pubSub = dependencies.pubSub;
		const jsBookkeeper = dependencies.jsBookkeeper;
		const path = spec.path;
		const presentationCounter = spec.presentationCounter;
		//console.log("presentationCounter", presentationCounter)

		let cMetadataElement;
		let cPresentation = spec.cPresentation;
		const metadataId = spec.metadataIdUsedInData;
		let presentationId;
		let state = "ok";
		let previousValue = "";
		let pVarView;
		let text;
		let defText;
		let mode;
		let attributesToShow;
		let pAttributes;

		const start = function() {
			cMetadataElement = getMetadataById(metadataId);
			setPresentationIdFromCPresentation();
			mode = getValueFromPresentationOrDefaultTo("mode", "output");
			attributesToShow = getValueFromPresentationOrDefaultTo("attributesToShow", "all");
			let pVarViewSpec = intializePVarViewSpec();
			child.addTypeSpecificInfoToViewSpec(mode, pVarViewSpec);
			pVarView = dependencies.pVarViewFactory.factor(pVarViewSpec);
			subscribeToPubSub();

			possiblyInitPAttributes();
		};

		const setPresentationIdFromCPresentation = function() {
			if (cPresentation.containsChildWithNameInData("recordInfo")) {
				let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
				presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			}
		};

		const getValueFromPresentationOrDefaultTo = function(nameInData, defaultValue) {
			if (cPresentation.containsChildWithNameInData(nameInData)) {
				return cPresentation.getFirstAtomicValueByNameInData(nameInData);
			}
			return defaultValue;
		};

		const intializePVarViewSpec = function() {
			let nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
			let textId = getTextId(cMetadataElement, "textId");
			text = textProvider.getTranslation(textId);
			let defTextId = getTextId(cMetadataElement, "defTextId");
			defText = textProvider.getTranslation(defTextId);

			let pVarViewSpec = {
				className: getClassName(),
				valueViewClassName: path.join("").replaceAll('.', '-'),
				id: "" + presentationCounter,
				mode: mode,
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
						}
					]
				},
				onblurFunction: onBlur,
				onkeyupFunction: onkeyup,
			};
			possiblyAddPresentationInfo(pVarViewSpec);
			possiblyAddPlaceHolderText(pVarViewSpec);
			possiblyAddLabelToViewSpec(pVarViewSpec);

			return pVarViewSpec;
		};

		const getClassName = function() {
			if (presentationId) {
				return "pVar " + child.type + " " + presentationId;
			}
			return "pVar " + child.type;
		};


		const possiblyAddPresentationInfo = function(pVarViewSpec) {
			if (cPresentation.containsChildWithNameInData("recordInfo")) {
				addPresentationInfoWhenNotFakePresentationFromAttributes(pVarViewSpec);
			}
		};

		const addPresentationInfoWhenNotFakePresentationFromAttributes = function(pVarViewSpec) {
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			pVarViewSpec.presentationId = presentationId;
			pVarViewSpec.info.technicalInfo.push({
				text: `presentationId: ${presentationId}`,
				onclickMethod: openPresentationIdRecord
			});
		};

		const possiblyAddPlaceHolderText = function(pVarViewSpec) {
			if (cPresentation.containsChildWithNameInData("emptyTextId")) {
				let emptyTextId = cPresentation.getLinkedRecordIdFromFirstChildLinkWithNameInData("emptyTextId");
				let emptyText = textProvider.getTranslation(emptyTextId);
				pVarViewSpec.placeholderText = emptyText;
			}
		};

		const possiblyAddLabelToViewSpec = function(pVarViewSpec) {
			if (labelShouldBeShown()) {
				addLabelToViewSpec(pVarViewSpec);
			}
		};

		const labelShouldBeShown = function() {
			if (!cPresentation.containsChildWithNameInData("showLabel")) {
				return true;
			}
			return (cPresentation.getFirstAtomicValueByNameInData("showLabel") !== "false");
		};

		const addLabelToViewSpec = function(pVarViewSpec) {
			if (cPresentation.containsChildWithNameInData("specifiedLabelText")) {
				let specifiedLabelTextId = cPresentation.getLinkedRecordIdFromFirstChildLinkWithNameInData("specifiedLabelText");
				let specifiedLabelText = textProvider.getTranslation(specifiedLabelTextId);
				pVarViewSpec.label = specifiedLabelText;
			} else {
				pVarViewSpec.label = text;
			}
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const getTextId = function(cMetadataElementIn, textNameInData) {
			return cMetadataElementIn.getLinkedRecordIdFromFirstChildLinkWithNameInData(textNameInData);
		};

		const subscribeToPubSub = function() {
			pubSub.subscribe("setValue", path, undefined, handleSetValueMsg);
			pubSub.subscribe("validationError", path, undefined, handleValidationError);
			let disablePath = ensureNoRepeatIdInLowestLevelOfPath();
			pubSub.subscribe("disable", disablePath, undefined, disableVar);
		};

		const possiblyInitPAttributes = function() {
			if (hasAttributes()) {
				let pAttributesSpec = {
					addViewToParent: pVarView.addAttributesView,
					path: path,
					mode: mode,
					toShow: attributesToShow
				};
				pAttributes = dependencies.pAttributesFactory.factor(pAttributesSpec);
			}
		};

		const hasAttributes = function() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		};

		const ensureNoRepeatIdInLowestLevelOfPath = function() {
			let pathUtils = CORA.pathUtils();
			return pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
		};

		const getView = function() {
			return pVarView.getView();
		};

		const handleSetValueMsg = function(dataFromMsg) {
			setValue(dataFromMsg);
			updateViewWithCurrentState();
		};

		const setValue = function(dataFromMsg) {
			let value = dataFromMsg.data;
			state = "ok";
			previousValue = value;
			const valueForView = child.transformValueForView(mode, value);
			pVarView.setValue(valueForView);
			//other possible values are startup or user
			let containsData = dataFromMsg.dataOrigin !== "final" && value !== "";
			publishVisibilityChange(value, containsData, false);
		};

		const publishVisibilityChange = function(value, containsData, containsError) {
			let visibility = value === "" && mode === "output" ? "hidden" : "visible";
			let visibilityData = {
				path: [presentationCounter],
				presentationCounter: presentationCounter,
				visibility: visibility,
				containsData: containsData,
				containsError: containsError
			};
			pubSub.publish("visibilityChange", visibilityData);
		};


		const handleValidationError = function() {
			state = "error";
			publishVisibilityChange(previousValue, false, true);
			updateViewWithCurrentState();
		};

		const getText = function() {
			return text;
		};

		const getDefText = function() {
			return defText;
		};

		const onBlur = function(valueFromView) {
			valueFromView = autoFormatEnteredValue(valueFromView);
			pVarView.setValue(valueFromView);
			handleValueFromView(valueFromView, "error");
		};

		const autoFormatEnteredValue = function(valueFromView) {
			if (valueFromView.length === 0) {
				return valueFromView;
			}
			return child.autoFormatEnteredValue(valueFromView);
		};

		const handleValueFromView = function(valueFromView, errorState) {
			if (valueFromView.length === 0 || child.validateTypeSpecificValue(valueFromView)) {
				state = "ok";
			} else {
				state = errorState;
			}
			updateViewWithCurrentState();
			if (state === "ok" && valueHasChanged(valueFromView)) {
				let data = {
					data: valueFromView,
					path: path
				};
				jsBookkeeper.setValue(data);
				previousValue = valueFromView;
			}
		};

		const onkeyup = function(valueFromView) {
			handleValueFromView(valueFromView, "errorStillFocused");
		};

		const updateViewWithCurrentState = function() {
			pVarView.setState(state);
		};

		const valueHasChanged = function(valueFromView) {
			return valueFromView !== previousValue;
		};

		const getState = function() {
			return state;
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
		};

		const openMetadataIdRecord = function(event) {
			const metadataRecord = metadataProvider.getMetadataRecordById(spec.metadataIdUsedInData);
			openLinkedRecordForLink(event, metadataRecord.actionLinks.read);
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

		const disableVar = function() {
			if (hasAttributes()) {
				pAttributes.disableExistingAttributes();
			}
			pVarView.disable();
		};

		const getPresentationCounter = function() {
			return presentationCounter;
		};

		start();
		return Object.freeze({
			type: "pParentVar",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			handleSetValueMsg: handleSetValueMsg,
			getText: getText,
			getDefText: getDefText,
			getState: getState,
			onBlur: onBlur,
			onkeyup: onkeyup,
			handleValidationError: handleValidationError,
			openTextIdRecord: openTextIdRecord,
			openDefTextIdRecord: openDefTextIdRecord,
			openMetadataIdRecord: openMetadataIdRecord,
			openPresentationIdRecord: openPresentationIdRecord,
			openLinkedRecordForLink: openLinkedRecordForLink,
			disableVar: disableVar,
			getPresentationCounter: getPresentationCounter
		});

	};
	return cora;
}(CORA));