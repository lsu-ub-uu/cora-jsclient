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
		let pAttributes;

		const init = function() {
			cMetadataElement = getMetadataById(my.metadataId);
			nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

			textId = cMetadataElement.getLinkedRecordIdFromFirstChildLinkWithNameInData("textId");
			text = textProvider.getTranslation(textId);

			defTextId = cMetadataElement.getLinkedRecordIdFromFirstChildLinkWithNameInData("defTextId");
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
				presentationChildren.forEach(createAndAppendChildForPresentationChildRef);
			}
			originalClassName = view.className;
			if ("pSurroundingContainer" !== my.type) {
				initPAttributes();
			}
		};

		const createAndAppendChildForPresentationChildRef = function(presentationChildRef) {
			let cPresentationChildRef = CORA.coraData(presentationChildRef);
			let refId = extractRefId(presentationChildRef);

			let cPresentationChild = getMetadataById(refId);
			if (constraintsShouldBeChecked() && presentationHasPresentationOf(cPresentationChild)) {
				handleSingleOrMultiplePresentationOf(cPresentationChild, cPresentationChildRef,
					refId);
			} else {
				let childView = createViewForChild(cPresentationChildRef, cPresentationChild,
					refId, true);
				view.appendChild(childView);
			}
		};

		const extractRefId = function(presentationChildRef) {
			let cPresentationChildRef = CORA.coraData(presentationChildRef);
			let cRefGroup = CORA.coraData(cPresentationChildRef
				.getFirstChildByNameInData("refGroup"));
			return cRefGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("ref");
		};

		const constraintsShouldBeChecked = function() {
			return spec.recordPartPermissionCalculator !== undefined;
		};

		const presentationHasPresentationOf = function(cPresentationChild) {
			return presentationHasMultiplePresentationsOf(cPresentationChild)
				|| presentationHasSinglePresentationOf(cPresentationChild);
		};

		const presentationHasMultiplePresentationsOf = function(cPresentationChild) {
			return cPresentationChild.containsChildWithNameInData("presentationsOf");
		};

		const presentationHasSinglePresentationOf = function(cPresentationChild) {
			return cPresentationChild.containsChildWithNameInData("presentationOf");
		};

		const handleSingleOrMultiplePresentationOf = function(cPresentationChild,
			cPresentationChildRef, refId) {
			if (presentationHasMultiplePresentationsOf(cPresentationChild)) {
				handleMultiplePresentationsOf(cPresentationChildRef, cPresentationChild, refId);
			} else {
				handleSinglePresentationOf(cPresentationChildRef, cPresentationChild, refId);
			}
		};

		const handleMultiplePresentationsOf = function(cPresentationChildRef, cPresentationChild,
			refId) {
			let hasRead = checkReadPermissionForSurroundingContainer(cPresentationChild);
			if (hasRead) {
				let childView = createViewForChild(cPresentationChildRef, cPresentationChild,
					refId);
				view.appendChild(childView);
			}
		};

		const checkReadPermissionForSurroundingContainer = function(cPresentationChild) {
			let presentationsOf = cPresentationChild.getFirstChildByNameInData("presentationsOf");

			for (const childReference of presentationsOf.children) {
				let cContainerChildReference = CORA.coraData(childReference);
				if (checkHasReadPermission(cContainerChildReference)) {
					return true;
				}
			}
			return false;
		};

		const possiblyAppendChildView = function(ref, cPresentationChildRef,
			cPresentationChild, refId) {
			let cRef = CORA.coraData(ref);
			let hasReadPermission = checkHasReadPermission(cRef);

			if (hasReadPermission) {
				let hasWritePermission = checkHasWritePermission(cRef);
				let childView = createViewForChild(cPresentationChildRef, cPresentationChild,
					refId, hasWritePermission);

				view.appendChild(childView);
			}
		};

		const checkHasReadPermission = function(cRef) {
			return spec.recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart(
				cRef);
		};

		const checkHasWritePermission = function(cRef) {
			return spec.recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart(
				cRef);
		};

		const handleSinglePresentationOf = function(cPresentationChildRef, cPresentationChild,
			refId) {
			let presentationOfGroup = cPresentationChild
				.getFirstChildByNameInData("presentationOf");

			possiblyAppendChildView(presentationOfGroup, cPresentationChildRef, cPresentationChild,
				refId);
		};

		const createInfo = function() {
			let infoSpec;
			if ("pSurroundingContainer" == my.type) {
				infoSpec = {
					afterLevelChange: updateView,
					level1: [{
						className: "technicalView",
						text: `presentationId: ${getPresentationId()}`
					}],
					level2: [{
						className: "technicalView",
						text: `presentationId: ${getPresentationId()}`
					}]
				};
			}else{
				infoSpec = {
					// "insertAfter" is set to infoButton below
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
						text: `textId: ${textId}`
						// onclickMethod : openTextIdRecord
					}, {
						className: "defTextIdView",
						text: `defTextId: ${defTextId}`
					}, {
						className: "metadataIdView",
						text: `metadataId: ${my.metadataId}`
					}, {
						className: "technicalView",
						text: `nameInData: ${nameInData}`
					}, {
						className: "technicalView",
						text: `presentationId: ${getPresentationId()}`
					}]
				};
			}
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

		const createViewForChild = function(cPresentationChildRef, cPresentationChild, refId,
			hasWritePermission) {
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
			return createPChildRefHandler(cPresentationChild, cPresentationChildRef,
				hasWritePermission);
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
			let elementTextId = cPresentationChild.getLinkedRecordIdFromFirstChildLinkWithNameInData("elementText");
			return textProvider.getTranslation(elementTextId);
		};

		const childIsSurroundingContainer = function(cPresentationChild) {
			return "children" === cPresentationChild.getData().attributes.repeat;
		};

		const createPNonRepeatingChildRefHandler = function(cPresentationChild,
			cPresentationChildRef) {
			let childRefHandlerSpec = createChildRefHandlerCommonSpec(cPresentationChild,
				cPresentationChildRef);
			childRefHandlerSpec.parentMetadataId = my.metadataId;
			childRefHandlerSpec.recordPartPermissionCalculator = spec.recordPartPermissionCalculator;

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
				let cAlternativePresentation = getAlternativePresentation(cPresentationChildRef);
				childRefHandlerSpec.cAlternativePresentation = cAlternativePresentation;
				possiblySetNonDefaultPresentationSize(cPresentationChildRef, childRefHandlerSpec);
			}
		};

		const possiblySetNonDefaultPresentationSize = function(cPresentationChildRef,
			childRefHandlerSpec) {
			if (cPresentationChildRef.containsChildWithNameInData("presentationSize")) {
				childRefHandlerSpec.presentationSize = cPresentationChildRef
					.getFirstAtomicValueByNameInData("presentationSize");
			}
		};

		const childHasAlternativePresentation = function(cChildRef) {
			return cChildRef.getNoOfChildrenWithNameInData("refGroup") === 2;
		};

		const possiblyAddAddTextToSpec = function(cPresentationChildRef, childRefHandlerSpec) {
			if (cPresentationChildRef.containsChildWithNameInData("addText")) {
				let addText = cPresentationChildRef.getLinkedRecordIdFromFirstChildLinkWithNameInData("addText");
				childRefHandlerSpec.addText = addText;
			}
		};

		const createPChildRefHandler = function(cPresentationChild, cPresentationChildRef,
			hasWritePermission) {
			let childRefHandlerSpec = createPChildRefHandlerSpec(cPresentationChild, cPresentationChildRef,
				hasWritePermission);
			let pChildRefHandler = dependencies.pChildRefHandlerFactory.factor(childRefHandlerSpec);
			return pChildRefHandler.getView();
		};

		const createPChildRefHandlerSpec = function(cPresentationChild, cPresentationChildRef,
			hasWritePermission) {
			let childRefHandlerSpec = createChildRefHandlerCommonSpec(cPresentationChild,
				cPresentationChildRef);
			childRefHandlerSpec.cParentMetadata = cMetadataElement;
			childRefHandlerSpec.hasWritePermissionsForRecordPart = hasWritePermission;
			childRefHandlerSpec.recordPartPermissionCalculator = spec.recordPartPermissionCalculator;
			possiblyAddAddTextToSpec(cPresentationChildRef, childRefHandlerSpec);

			possiblyAddRepatingToShow(childRefHandlerSpec, cPresentationChildRef);
			return childRefHandlerSpec;
		};

		const possiblyAddRepatingToShow = function(childRefHandlerSpec, cPresentationChildRef) {
			if (cPresentationChildRef.containsChildWithNameInData("minNumberOfRepeatingToShow")) {
				childRefHandlerSpec.minNumberOfRepeatingToShow = cPresentationChildRef
					.getFirstAtomicValueByNameInData("minNumberOfRepeatingToShow");
			}
		};

		const getAlternativePresentation = function(cPresentationChildRef) {
			let cAlternativePresRefGroup = CORA.coraData(cPresentationChildRef
				.getChildByNameInDataAndIndex("refGroup", 1));
			let alternativePresRefId = cAlternativePresRefGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("ref");
			return getMetadataById(alternativePresRefId);
		};

		const initPAttributes = function() {
			let pAttributesSpec = {
				addViewToParent: addAttributesView,
				path: path,
				mode: mode
			};
			pAttributes = dependencies.pAttributesFactory.factor(pAttributesSpec);
		};

		const addAttributesView = function(attributesView) {
			view.insertBefore(attributesView, view.firstChild);
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
			type: "pMultipleChildren",
			getPresentationId: getPresentationId,
			init: init,
			getView: getView,
			addAttributesView: addAttributesView
		});
	};
	return cora;
}(CORA));