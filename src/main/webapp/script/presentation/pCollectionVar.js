/*
 * Copyright 2016 Uppsala University Library
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
 */
var CORA = (function(cora) {
	"use strict";
	cora.pCollectionVar = function(dependencies, spec) {
		var path = spec.path;
		var cPresentation = spec.cPresentation;
		var metadataProvider = dependencies.metadataProvider;
		var pubSub = dependencies.pubSub;
		var textProvider = dependencies.textProvider;
		var jsBookkeeper = dependencies.jsBookkeeper;
		var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		var presentationGroup = cPresentation.getFirstChildByNameInData("presentationOf");
		var cPresentationGroup = CORA.coraData(presentationGroup);
		var metadataId = cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		var cMetadataElement = getMetadataById(metadataId);
		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");
		var nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

		var view = createBaseView();
		var originalClassName = view.className;
		var valueView = createValueView();
		view.appendChild(valueView);

		var state = "ok";
		var previousValue = "";
		pubSub.subscribe("setValue", path, undefined, handleMsg);
		pubSub.subscribe("validationError", path, undefined, handleValidationError);

		var textId = getTextId(cMetadataElement, "textId");
		var text = textProvider.getTranslation(textId);

		var defTextId = getTextId(cMetadataElement, "defTextId");
		var defText = textProvider.getTranslation(defTextId);

		var info = createInfo();
		var infoButton = info.getButton();
		view.appendChild(infoButton);

		function createBaseView() {
			return CORA.gui.createSpanWithClassName("pCollVar " + presentationId);
		}
		function createValueView() {
			if (mode === "input") {
				return createInput();
			}
			return createOutput();
		}

		function createInput() {
			return createCollectionInput();
		}

		function createCollectionInput() {
			var inputNew = document.createElement("select");

			if (cPresentation.containsChildWithNameInData("emptyTextId")) {
				var cEmptyTextId = CORA.coraData(cPresentation
						.getFirstChildByNameInData("emptyTextId"));
				var emptyTextId = cEmptyTextId.getFirstAtomicValueByNameInData("linkedRecordId");

				var optionText = textProvider.getTranslation(emptyTextId);
				var emptyTextOption = new Option(optionText, "");
				inputNew.appendChild(emptyTextOption);
				inputNew.value = "";
			}

			var collectionItemReferencesChildren = getCollectionItemReferencesChildren();

			collectionItemReferencesChildren.forEach(function(ref) {
				var option = createOptionForRef(ref);
				inputNew.appendChild(option);
			});
			return inputNew;
		}

		function getCollectionItemReferencesChildren() {
			var cRefCollection = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData("refCollection"));
			var refCollectionId = cRefCollection.getFirstAtomicValueByNameInData("linkedRecordId");
			var cMetadataCollection = getMetadataById(refCollectionId);
			var collectionItemReferences = cMetadataCollection
					.getFirstChildByNameInData("collectionItemReferences");
			return collectionItemReferences.children;
		}

		function createOptionForRef(ref) {
			var cItemRef = CORA.coraData(ref);
			var itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;

			var item = getMetadataById(itemRefId);
			var value = item.getFirstAtomicValueByNameInData("nameInData");

			var cTextIdGroup = CORA.coraData(item.getFirstChildByNameInData("textId"));
			var textIdToTranslate = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");

			var optionText = textProvider.getTranslation(textIdToTranslate);

			return new Option(optionText, value);
		}

		function createOutput() {
			return CORA.gui.createSpanWithClassName("value");
		}

		function createInfo() {
			var infoSpec = {
				"appendTo" : view,
				"afterLevelChange" : updateView,
				"level1" : [ {
					"className" : "textView",
					"text" : text
				}, {
					"className" : "defTextView",
					"text" : defText
				} ],
				"level2" : [ {
					"className" : "textIdView",
					"text" : "textId: " + textId
				}, {
					"className" : "defTextIdView",
					"text" : "defTextId: " + defTextId
				}, {
					"className" : "metadataIdView",
					"text" : "metadataId: " + metadataId
				}, {
					"className" : "technicalView",
					"text" : "nameInData: " + nameInData
				}, {
					"className" : "technicalView",
					"text" : "presentationId: " + presentationId
				} ]
			};
			return CORA.info(infoSpec);
		}

		function getTextId(cMetadataElementIn, textNameInData) {
			var cTextGroup = CORA.coraData(cMetadataElementIn
					.getFirstChildByNameInData(textNameInData));
			return cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getView() {
			return view;
		}

		function setValue(value) {
			state = "ok";
			previousValue = value;
			if (mode === "input") {
				valueView.value = value;
			} else {
				setValueForOutput(value);
			}
		}

		function setValueForOutput(value) {
			setValueForCollectionOutput(value);
		}

		function setValueForCollectionOutput(value) {
			if (value === "") {
				valueView.textContent = "";
			} else {
				setOutputValueFromItemReference(value);
			}
		}

		function findItemReferenceForValue(value) {
			var collectionItemReferencesChildren = getCollectionItemReferencesChildren();
			return collectionItemReferencesChildren.find(function(ref) {
				var cItemRef = CORA.coraData(ref);
				var itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;

				var item = getMetadataById(itemRefId);
				var refValue = item.getFirstAtomicValueByNameInData("nameInData");
				return refValue === value;
			});
		}

		function setOutputValueFromItemReference(value) {
			var itemReference = findItemReferenceForValue(value);
			var cItemRef = CORA.coraData(itemReference);
			var itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;

			var item = getMetadataById(itemRefId);
			var cTextIdGroup = CORA.coraData(item.getFirstChildByNameInData("textId"));
			var textIdToTranslate = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			var outputText = textProvider.getTranslation(textIdToTranslate);
			valueView.textContent = outputText;
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

		function onBlur() {
			updateView();
			if (valueHasChanged()) {
				var data = {
					"data" : valueView.value,
					"path" : path
				};
				jsBookkeeper.setValue(data);
				previousValue = valueView.value;
			}
		}

		function updateView() {
			var className = originalClassName;
			if (state === "error") {
				className += " error";
			}
			if (info.getInfoLevel() !== 0) {
				className += " infoActive";
			}
			view.className = className;
		}

		function valueHasChanged() {
			if (valueView.value !== previousValue) {
				return true;
			}
			return false;
		}

		function getState() {
			return state;
		}

		var out = Object.freeze({
			"type" : "pCollVar",
			getView : getView,
			setValue : setValue,
			handleMsg : handleMsg,
			getText : getText,
			getDefText : getDefText,
			getState : getState,
			onBlur : onBlur,
			handleValidationError : handleValidationError
		});

		view.modelObject = out;
		if (mode === "input") {
			valueView.onblur = onBlur;
		}
		return out;
	};
	return cora;
}(CORA));