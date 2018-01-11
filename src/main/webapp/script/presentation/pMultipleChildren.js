/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
	cora.pMultipleChildren = function(dependencies, spec, my) {
		var path = spec.path;
		var textProvider = dependencies.textProvider;

		var view;
		var originalClassName;
		var cMetadataElement;
		var textId;
		var text;
		var defTextId;
		var defText;
		var info;
		var infoButton;
		var nameInData;
		var mode = "input";

		function init() {
			cMetadataElement = getMetadataById(my.metadataId);
			nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

			var cTextGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData("textId"));
			textId = cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			text = textProvider.getTranslation(textId);

			var cDefTextGroup = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData("defTextId"));
			defTextId = cDefTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			defText = textProvider.getTranslation(defTextId);

			var viewNew = my.createBaseViewHolder();
			view = viewNew;

			info = createInfo();
			infoButton = info.getButton();
			viewNew.appendChild(infoButton);

			if (my.cPresentation.containsChildWithNameInData("mode")) {
				mode = my.cPresentation.getFirstAtomicValueByNameInData("mode");
			}

			if (my.cPresentation.containsChildWithNameInData("childReferences")) {
				var presentationChildren = my.cPresentation
						.getFirstChildByNameInData("childReferences").children;
				presentationChildren.forEach(function(presentationChildRef) {
					viewNew.appendChild(createViewForChild(presentationChildRef));
				});
			}
			originalClassName = view.className;
		}

		function createInfo() {
			var infoSpec = {
				// "insertAfter" is set to infoButton below
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
					"text" : "metadataId: " + my.metadataId
				}, {
					"className" : "technicalView",
					"text" : "nameInData: " + nameInData
				}, {
					"className" : "technicalView",
					"text" : "presentationId: " + getPresentationId()
				} ]
			};
			var newInfo = CORA.info(infoSpec);
			infoSpec.insertAfter = newInfo.getButton();
			return newInfo;
		}

		function updateView() {
			var className = originalClassName;
			if (info.getInfoLevel() !== 0) {
				className += " infoActive";
			}
			view.className = className;
		}

		function createViewForChild(presentationChildRef) {
			var cPresentationChildRef = CORA.coraData(presentationChildRef);
			var cRef;
			if (cPresentationChildRef.containsChildWithNameInData("refGroup")) {
				var cRefGroup = CORA.coraData(cPresentationChildRef
						.getFirstChildByNameInData("refGroup"));
				cRef = CORA.coraData(cRefGroup.getFirstChildByNameInData("ref"));
			} else {
				cRef = CORA.coraData(cPresentationChildRef.getFirstChildByNameInData("ref"));
			}
			var refId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");

			var cPresentationChild = getMetadataById(refId);

			if (childIsText(cPresentationChild)) {
				return createText(refId, cPresentationChildRef);
			}
			if (childIsSurroundingContainer(cPresentationChild)) {
				// console.log(JSON.stringify(cPresentationChild.getData()))
				var pNonRepeatingChildRefHandler = createPNonRepeatingChildRefHandler(cPresentationChild, cPresentationChildRef);
				return pNonRepeatingChildRefHandler.getView();
			}
			return createPChildRefHandler(cPresentationChild, cPresentationChildRef);
		}

		function childIsText(cChild) {
			return cChild.getData().name === "text";
		}

		function createText(presRef, cPresentationChildRef) {
			var textClassName = "text";
			if (cPresentationChildRef.containsChildWithNameInData("textStyle")) {
				textClassName += " "
						+ cPresentationChildRef.getFirstAtomicValueByNameInData("textStyle");
			}
			if (cPresentationChildRef.containsChildWithNameInData("childStyle")) {
				textClassName += " "
						+ cPresentationChildRef.getFirstAtomicValueByNameInData("childStyle");
			}
			var textSpan = CORA.gui.createSpanWithClassName(textClassName);
			textSpan.appendChild(document.createTextNode(textProvider.getTranslation(presRef)));
			return textSpan;
		}

		function childIsSurroundingContainer(cPresentationChild) {
			return "children" === cPresentationChild.getData().attributes.repeat;
		}

		function createPNonRepeatingChildRefHandler(cPresentationChild, cPresentationChildRef) {
			var childSpec = {
				"parentPath" : path,
				"parentMetadataId" : my.metadataId,
				"cPresentation" : cPresentationChild,
				"cParentPresentation" : my.cParentPresentation
			};
			if (childHasAlternativePresentation(cPresentationChildRef)) {
				var cAlternativePresentation = getAlternativePresenation(cPresentationChildRef);
				childSpec.cAlternativePresentation = cAlternativePresentation;
			}

			return dependencies.pNonRepeatingChildRefHandlerFactory.factor(childSpec);
		}

		function createPChildRefHandler(cPresentationChild, cPresentationChildRef) {
			var childRefHandlerSpec = {
				"parentPath" : path,
				"cParentMetadata" : getMetadataById(my.metadataId),
				"cPresentation" : cPresentationChild,
				"cParentPresentation" : my.cParentPresentation,
				"mode" : mode
			};

			if (cPresentationChildRef.containsChildWithNameInData("minNumberOfRepeatingToShow")) {
				childRefHandlerSpec.minNumberOfRepeatingToShow = cPresentationChildRef
						.getFirstAtomicValueByNameInData("minNumberOfRepeatingToShow");
			}

			if (cPresentationChildRef.containsChildWithNameInData("textStyle")) {
				childRefHandlerSpec.textStyle = cPresentationChildRef
						.getFirstAtomicValueByNameInData("textStyle");
			}
			if (cPresentationChildRef.containsChildWithNameInData("childStyle")) {
				childRefHandlerSpec.childStyle = cPresentationChildRef
						.getFirstAtomicValueByNameInData("childStyle");
			}

			if (childHasAlternativePresentation(cPresentationChildRef)) {
				var cAlternativePresentation = getAlternativePresenation(cPresentationChildRef);
				childRefHandlerSpec.cAlternativePresentation = cAlternativePresentation;
			}

			var pChildRefHandler = dependencies.pChildRefHandlerFactory.factor(childRefHandlerSpec);

			return pChildRefHandler.getView();
		}

		function childHasAlternativePresentation(cChildRef) {
			return cChildRef.getNoOfChildrenWithNameInData("refGroup") === 2;
		}

		function getAlternativePresenation(cPresentationChildRef) {
			var cAlternativePresRefGroup = CORA.coraData(cPresentationChildRef
					.getChildByNameInDataAndIndex("refGroup", 1));

			var cAlternativePresRef = CORA.coraData(cAlternativePresRefGroup
					.getFirstChildByNameInData("ref"));
			var alternativePresRefId = cAlternativePresRef
					.getFirstAtomicValueByNameInData("linkedRecordId");
			return getMetadataById(alternativePresRefId);
		}

		function getMetadataById(id) {
			return CORA.coraData(dependencies.metadataProvider.getMetadataById(id));
		}

		function getPresentationId() {
			var recordInfo = my.cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function getView() {
			return view;
		}

		return Object.freeze({
			"type" : "pMultipleChildren",
			getPresentationId : getPresentationId,
			init : init,
			getView : getView
		});
	};
	return cora;
}(CORA));