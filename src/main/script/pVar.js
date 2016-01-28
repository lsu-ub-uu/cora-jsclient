/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016 Olov McKie
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
	cora.pVar = function(spec) {
		var path = spec.path;
		var cPresentation = spec.cPresentation;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var textProvider = spec.textProvider;
		var jsBookkeeper = spec.jsBookkeeper;

		var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");

		var metadataId = cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		var cMetadataElement = getMetadataById(metadataId);
		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");

		var view = createBaseView();
		var valueView = createValueView(mode);
		view.appendChild(valueView);
		var state = "ok";
		pubSub.subscribe("setValue", path, undefined, handleMsg);

		var textId = cMetadataElement.getFirstAtomicValueByNameInData("textId");
		var text = textProvider.getTranslation(textId);

		var defTextId = cMetadataElement.getFirstAtomicValueByNameInData("defTextId");
		var defText = textProvider.getTranslation(defTextId);

		var regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pVar " + presentationId;
			return viewNew;
		}
		function createValueView(viewMode) {
			if (viewMode === "input") {
				return createInput();
			}
			return createOutput();
		}

		function createInput() {
			var inputNew = document.createElement("input");
			inputNew.type = "text";
			valueView = inputNew;
			return inputNew;
		}

		function createOutput() {
			var outputNew = document.createElement("span");
			valueView = outputNew;
			return outputNew;
		}

		function getView() {
			return view;
		}

		function setValue(value) {
			if (mode === "input") {
				valueView.value = value;
			} else {
				valueView.textContent = value;
			}
		}

		function handleMsg(dataFromMsg) {
			setValue(dataFromMsg.data);
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

		function getRegEx() {
			return regEx;
		}

		function onBlur() {
			checkRegEx();
			updateView();
			if (state === "ok") {
				var data = {
					"data" : valueView.value,
					"path" : path
				};
				jsBookkeeper.setValue(data);
			}
		}
		function checkRegEx() {
			var value = valueView.value;
			if (value.length === 0 || new RegExp(regEx).test(value)) {
				state = "ok";
			} else {
				state = "error";
			}
		}

		function updateView() {
			var className = "";
			if (state === "error") {
				className += "error";
			}
			view.className = className;
		}

		function getState() {
			return state;
		}

		var out = Object.freeze({
			getView : getView,
			setValue : setValue,
			handleMsg : handleMsg,
			getText : getText,
			getDefText : getDefText,
			getRegEx : getRegEx,
			getState : getState,
			onBlur : onBlur
		});
		view.modelObject = out;
		if (mode === "input") {
			valueView.onblur = onBlur;
		}
		return out;
	};
	return cora;
}(CORA || {}));