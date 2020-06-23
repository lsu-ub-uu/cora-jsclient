/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2017 Olov McKie
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
 */var CORA = (function(cora) {
	"use strict";
	cora.pCollectionVar = function(dependencies, spec) {
		let path = spec.path;
		let cPresentation = spec.cPresentation;
		let metadataProvider = dependencies.metadataProvider;
		let pubSub = dependencies.pubSub;
		let textProvider = dependencies.textProvider;
		let jsBookkeeper = dependencies.jsBookkeeper;
		let state = "ok";
		let previousValue = "";
		let cMetadataElement;
		let view;
		let presentationId;
		let mode;
		let nameInData;
		let originalClassName;
		let text;
		let defText;
		let metadataId;
		let valueView;
		let info;

		const start = function() {
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			extractMetadataId();
			cMetadataElement = getMetadataById(metadataId);
			mode = cPresentation.getFirstAtomicValueByNameInData("mode");
			nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
			view = createBaseView();
			originalClassName = view.className;
			valueView = createValueView();
			view.appendChild(valueView);
			info = createInfoSpec();
			let infoButton = info.getButton();
			view.appendChild(infoButton);
			if (mode === "input") {
				valueView.onblur = onBlur;
			}
			subscribeToPubSub();
		};

		const extractMetadataId = function() {
			let presentationGroup = cPresentation.getFirstChildByNameInData("presentationOf");
			let cPresentationGroup = CORA.coraData(presentationGroup);
			metadataId = cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const subscribeToPubSub = function() {
			pubSub.subscribe("setValue", path, undefined, handleMsg);
			pubSub.subscribe("validationError", path, undefined, handleValidationError);
			pubSub.subscribe("disable", createTopLevelPath(), undefined, disableCollectionVar);
		};

		const createInfoSpec = function() {
			let textId = getTextId(cMetadataElement, "textId");
			text = textProvider.getTranslation(textId);

			let defTextId = getTextId(cMetadataElement, "defTextId");
			defText = textProvider.getTranslation(defTextId);

			let infoSpec = {
				appendTo: view,
				afterLevelChange: updateView,
				level1: [{
					className: "textView",
					text: text
				}, {
					className: "defTextView",
					text: defText
				}],
				level2: [{
					className: "textIdView",
					text: "textId: " + textId
				}, {
					className: "defTextIdView",
					text: "defTextId: " + defTextId
				}, {
					className: "metadataIdView",
					text: "metadataId: " + metadataId
				}, {
					className: "technicalView",
					text: "nameInData: " + nameInData
				}, {
					className: "technicalView",
					text: "presentationId: " + presentationId
				}]
			};
			return CORA.info(infoSpec);
		};
		
		const createBaseView = function() {
			return CORA.gui.createSpanWithClassName("pCollVar " + presentationId);
		};

		const createValueView = function() {
			if (mode === "input") {
				return createInput();
			}
			return createOutput();
		};

		const createInput = function() {
			return createCollectionInput();
		};

		const createCollectionInput = function() {
			let inputNew = document.createElement("select");

			if (cPresentation.containsChildWithNameInData("emptyTextId")) {
				let cEmptyTextId = CORA.coraData(cPresentation
					.getFirstChildByNameInData("emptyTextId"));
				let emptyTextId = cEmptyTextId.getFirstAtomicValueByNameInData("linkedRecordId");

				let optionText = textProvider.getTranslation(emptyTextId);
				let emptyTextOption = new Option(optionText, "");
				inputNew.appendChild(emptyTextOption);
				inputNew.value = "";
			}

			let collectionItemReferencesChildren = getCollectionItemReferencesChildren();

			collectionItemReferencesChildren.forEach(function(ref) {
				let option = createOptionForRef(ref);
				inputNew.appendChild(option);
			});
			return inputNew;
		};

		const getCollectionItemReferencesChildren = function() {
			let cRefCollection = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("refCollection"));
			let refCollectionId = cRefCollection.getFirstAtomicValueByNameInData("linkedRecordId");
			let cMetadataCollection = getMetadataById(refCollectionId);
			let collectionItemReferences = cMetadataCollection
				.getFirstChildByNameInData("collectionItemReferences");
			return collectionItemReferences.children;
		};

		const createOptionForRef = function(ref) {
			let cItemRef = CORA.coraData(ref);
			let itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;

			let item = getMetadataById(itemRefId);
			let value = item.getFirstAtomicValueByNameInData("nameInData");

			let cTextIdGroup = CORA.coraData(item.getFirstChildByNameInData("textId"));
			let textIdToTranslate = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");

			let optionText = textProvider.getTranslation(textIdToTranslate);

			return new Option(optionText, value);
		};

		const createOutput = function() {
			return CORA.gui.createSpanWithClassName("value");
		};

		const getTextId = function(cMetadataElementIn, textNameInData) {
			let cTextGroup = CORA.coraData(cMetadataElementIn
				.getFirstChildByNameInData(textNameInData));
			return cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const getView = function() {
			return view;
		};

		const setValue = function(value) {
			state = "ok";
			previousValue = value;
			if (mode === "input") {
				valueView.value = value;
			} else {
				setValueForOutput(value);
			}
		};

		const setValueForOutput = function(value) {
			setValueForCollectionOutput(value);
		};

		const setValueForCollectionOutput = function(value) {
			if (value === "") {
				valueView.textContent = "";
			} else {
				setOutputValueFromItemReference(value);
			}
		};

		const findItemReferenceForValue = function(value) {
			let collectionItemReferencesChildren = getCollectionItemReferencesChildren();
			return collectionItemReferencesChildren.find(function(ref) {
				let cItemRef = CORA.coraData(ref);
				let itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;
				let item = getMetadataById(itemRefId);
				let refValue = item.getFirstAtomicValueByNameInData("nameInData");
				return refValue === value;
			});
		};

		const setOutputValueFromItemReference = function(value) {
			let itemReference = findItemReferenceForValue(value);
			let cItemRef = CORA.coraData(itemReference);
			let itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;
			let item = getMetadataById(itemRefId);
			let cTextIdGroup = CORA.coraData(item.getFirstChildByNameInData("textId"));
			let textIdToTranslate = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			let outputText = textProvider.getTranslation(textIdToTranslate);
			valueView.textContent = outputText;
		};

		const handleMsg = function(dataFromMsg) {
			setValue(dataFromMsg.data);
			updateView();
		};

		const handleValidationError = function() {
			state = "error";
			updateView();
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const createTopLevelPath = function() {
			if (pathHasChildren()) {
				let cPath = CORA.coraData(path);
				return createPathWithOnlyTopLevelInformation(cPath);
			}
			return path;
		};

		const pathHasChildren = function() {
			return path.children !== undefined;
		};

		const createPathWithOnlyTopLevelInformation = function(cPath) {
			let pathNameInData = cPath.getFirstAtomicValueByNameInData("nameInData");
			let newTopLevelPath = {
				name: "linkedPath",
				children: [{
					name: "nameInData",
					value: pathNameInData
				}]
			};
			possiblyAddAttributes(cPath, newTopLevelPath);
			return newTopLevelPath;
		};

		const possiblyAddAttributes = function(cPath, newTopLevelPath) {
			if (cPath.containsChildWithNameInData("attributes")) {
				let attributes = cPath.getFirstChildByNameInData("attributes");
				newTopLevelPath.children.push(attributes);
			}
		};

		const disableCollectionVar = function() {
			valueView.disabled = true;
		};

		const getText = function() {
			return text;
		};

		const getDefText = function() {
			return defText;
		};

		const onBlur = function() {
			updateView();
			if (valueHasChanged()) {
				let data = {
					data: valueView.value,
					path: path
				};
				jsBookkeeper.setValue(data);
				previousValue = valueView.value;
			}
		};

		const updateView = function() {
			let className = originalClassName;
			if (state === "error") {
				className += " error";
			}
			if (info.getInfoLevel() !== 0) {
				className += " infoActive";
			}
			view.className = className;
		};

		const valueHasChanged = function() {
			if (valueView.value !== previousValue) {
				return true;
			}
			return false;
		};

		const getState = function() {
			return state;
		};

		const initializeViewModelObject = function() {
			view.modelObject = out;
		};

		start();

		let out = Object.freeze({
			type: "pCollVar",
			getView: getView,
			setValue: setValue,
			handleMsg: handleMsg,
			getText: getText,
			getDefText: getDefText,
			getState: getState,
			onBlur: onBlur,
			handleValidationError: handleValidationError,
			disableCollectionVar: disableCollectionVar
		});

		initializeViewModelObject();

		return out;
	};
	return cora;
}(CORA));