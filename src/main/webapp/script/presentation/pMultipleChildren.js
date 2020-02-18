/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
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
		let path = spec.path;
		let textProvider = dependencies.textProvider;

		let view;
		let originalClassName;
		let cMetadataElement;
		let textId;
		let text;
		let defTextId;
		let defText;
		let info;
		let infoButton;
		let nameInData;
		let mode = "input";

		const init = function() {
			cMetadataElement = getMetadataById(my.metadataId);
			nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

			let cTextGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData("textId"));
			textId = cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			text = textProvider.getTranslation(textId);

			let cDefTextGroup = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("defTextId"));
			defTextId = cDefTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			defText = textProvider.getTranslation(defTextId);

			view = my.createBaseViewHolder();

			info = createInfo();
			infoButton = info.getButton();
			view.appendChild(infoButton);

			if (my.cPresentation.containsChildWithNameInData("mode")) {
				mode = my.cPresentation.getFirstAtomicValueByNameInData("mode");
			}

			if (my.cPresentation.containsChildWithNameInData("childReferences")) {
				let presentationChildren = my.cPresentation
					.getFirstChildByNameInData("childReferences").children;
				presentationChildren.forEach(
					createAndAppendChildForPresentationChildRef
				);
			}
			originalClassName = view.className;
		};

		const createAndAppendChildForPresentationChildRef = function(presentationChildRef) {
			let childView = createViewForChild(presentationChildRef);
			view.appendChild(childView);
		};

		const createInfo = function() {
			let infoSpec = {
				// "insertAfter" is set to infoButton below
				"afterLevelChange": updateView,
				"level1": [{
					"className": "textView",
					"text": text
				}, {
					"className": "defTextView",
					"text": defText
				}],
				"level2": [{
					"className": "textIdView",
					"text": "textId: " + textId
					// onclickMethod : openTextIdRecord
				}, {
					"className": "defTextIdView",
					"text": "defTextId: " + defTextId
				}, {
					"className": "metadataIdView",
					"text": "metadataId: " + my.metadataId
				}, {
					"className": "technicalView",
					"text": "nameInData: " + nameInData
				}, {
					"className": "technicalView",
					"text": "presentationId: " + getPresentationId()
				}]
			};
			let newInfo = CORA.info(infoSpec);
			infoSpec.insertAfter = newInfo.getButton();
			return newInfo;
		};

		const updateView = function() {
			let className = originalClassName;
			if (info.getInfoLevel() !== 0) {
				className += " infoActive";
			}
			view.className = className;
		};

		const createViewForChild = function(presentationChildRef) {
			let cPresentationChildRef = CORA.coraData(presentationChildRef);
			let cRefGroup = CORA.coraData(cPresentationChildRef
				.getFirstChildByNameInData("refGroup"));
			let cRef = CORA.coraData(cRefGroup.getFirstChildByNameInData("ref"));
			let refId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");

			let cPresentationChild = getMetadataById(refId);

			if (childIsText(cPresentationChild)) {
				return createText(refId, cPresentationChildRef);
			}

			if (childIsGuiElementLink(cPresentationChild)) {
				return createGuiElementLink(cPresentationChild);
			}

			if (childIsSurroundingContainer(cPresentationChild)) {
				let pNonRepeatingChildRefHandler = createPNonRepeatingChildRefHandler(
					cPresentationChild, cPresentationChildRef);
				return pNonRepeatingChildRefHandler.getView();
			}
			return createPChildRefHandler(cPresentationChild, cPresentationChildRef);
		};

		const childIsText = function(cChild) {
			return cChild.getData().name === "text";
		};

		const createText = function(presRef, cPresentationChildRef) {
			let textClassName = "text";
			if (cPresentationChildRef.containsChildWithNameInData("textStyle")) {
				textClassName += " "
					+ cPresentationChildRef.getFirstAtomicValueByNameInData("textStyle");
			}
			if (cPresentationChildRef.containsChildWithNameInData("childStyle")) {
				textClassName += " "
					+ cPresentationChildRef.getFirstAtomicValueByNameInData("childStyle");
			}
			let textSpan = CORA.gui.createSpanWithClassName(textClassName);
			textSpan.appendChild(document.createTextNode(textProvider.getTranslation(presRef)));
			return textSpan;
		};

		const childIsGuiElementLink = function(cChild) {
			return cChild.getData().name === "guiElement";
		};

		const createGuiElementLink = function(cPresentationChild) {
			let link = createLinkElement();

			link.text = getTextForLink(cPresentationChild);
			link.href = cPresentationChild.getFirstAtomicValueByNameInData("url");
			return link;
		};

		const createLinkElement = function() {
			let link = document.createElement("a");
			link.className = "guiElement";
			return link;
		};

		const getTextForLink = function(cPresentationChild) {
			let cElementTextGroup = CORA.coraData(cPresentationChild
				.getFirstChildByNameInData("elementText"));
			let elementTextId = cElementTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			let text = textProvider.getTranslation(elementTextId);
			return text;
		};

		const childIsSurroundingContainer = function(cPresentationChild) {
			return "children" === cPresentationChild.getData().attributes.repeat;
		};

		const createPNonRepeatingChildRefHandler = function(cPresentationChild, cPresentationChildRef) {
			let childRefHandlerSpec = createChildRefHandlerCommonSpec(cPresentationChild, cPresentationChildRef);
			childRefHandlerSpec.parentMetadataId = my.metadataId;
			return dependencies.pNonRepeatingChildRefHandlerFactory.factor(childRefHandlerSpec);
		};

		const createChildRefHandlerCommonSpec = function(cPresentationChild, cPresentationChildRef) {
			let childRefHandlerSpec = {
				parentPath: path,
				cPresentation: cPresentationChild,
				cParentPresentation: my.cParentPresentation,
				mode: mode,
				presentationSize: "bothEqual"
			};
			possiblyAddStyleToSpec(cPresentationChildRef, childRefHandlerSpec);
			possiblyAddAlternativePresentationToSpec(cPresentationChildRef, childRefHandlerSpec);
			possiblyAddAddTextToSpec(cPresentationChildRef, childRefHandlerSpec);
			return childRefHandlerSpec;
		};

		const possiblyAddStyleToSpec = function(cPresentationChildRef, childRefHandlerSpec) {
			if (cPresentationChildRef.containsChildWithNameInData("textStyle")) {
				childRefHandlerSpec.textStyle = cPresentationChildRef
					.getFirstAtomicValueByNameInData("textStyle");
			}
			if (cPresentationChildRef.containsChildWithNameInData("childStyle")) {
				childRefHandlerSpec.childStyle = cPresentationChildRef
					.getFirstAtomicValueByNameInData("childStyle");
			}
		};

		const possiblyAddAlternativePresentationToSpec = function(cPresentationChildRef,
			childRefHandlerSpec) {
			if (childHasAlternativePresentation(cPresentationChildRef)) {
				let cAlternativePresentation = getAlternativePresenation(cPresentationChildRef);
				childRefHandlerSpec.cAlternativePresentation = cAlternativePresentation;
				possiblySetNonDefaultPresentationSize(cPresentationChildRef, childRefHandlerSpec);
			}
		};

		const possiblySetNonDefaultPresentationSize = function(cPresentationChildRef, childRefHandlerSpec) {
			if (cPresentationChildRef.containsChildWithNameInData("presentationSize")) {
				childRefHandlerSpec.presentationSize = cPresentationChildRef.getFirstAtomicValueByNameInData("presentationSize");
			}
		};

		const childHasAlternativePresentation = function(cChildRef) {
			return cChildRef.getNoOfChildrenWithNameInData("refGroup") === 2;
		};

		const possiblyAddAddTextToSpec = function(cPresentationChildRef,
			childRefHandlerSpec) {
			if (cPresentationChildRef.containsChildWithNameInData("addText")) {
				let cTextGroup = CORA.coraData(cPresentationChildRef.getFirstChildByNameInData("addText"));
				let addText = cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
				childRefHandlerSpec.addText = addText;
			}
		};

		const createPChildRefHandler = function(cPresentationChild, cPresentationChildRef) {
			let childRefHandlerSpec = createChildRefHandlerCommonSpec(cPresentationChild, cPresentationChildRef);
			childRefHandlerSpec.cParentMetadata = cMetadataElement;
			if (cPresentationChildRef.containsChildWithNameInData("minNumberOfRepeatingToShow")) {
				childRefHandlerSpec.minNumberOfRepeatingToShow = cPresentationChildRef
					.getFirstAtomicValueByNameInData("minNumberOfRepeatingToShow");
			}
			let pChildRefHandler = dependencies.pChildRefHandlerFactory.factor(childRefHandlerSpec);
			return pChildRefHandler.getView();
		};

		const getAlternativePresenation = function(cPresentationChildRef) {
			let cAlternativePresRefGroup = CORA.coraData(cPresentationChildRef
				.getChildByNameInDataAndIndex("refGroup", 1));

			let cAlternativePresRef = CORA.coraData(cAlternativePresRefGroup
				.getFirstChildByNameInData("ref"));
			let alternativePresRefId = cAlternativePresRef
				.getFirstAtomicValueByNameInData("linkedRecordId");
			return getMetadataById(alternativePresRefId);
		};

		const getMetadataById = function(id) {
			return CORA.coraData(dependencies.metadataProvider.getMetadataById(id));
		};

		const getPresentationId = function() {
			let recordInfo = my.cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		};

		const getView = function() {
			return view;
		};

		return Object.freeze({
			"type": "pMultipleChildren",
			getPresentationId: getPresentationId,
			init: init,
			getView: getView
		});
	};
	return cora;
}(CORA));