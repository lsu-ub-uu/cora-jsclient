/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
 * Copyright 2016, 2017, 2023 Olov McKie
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
	cora.pParentMultipleChildren = function(dependencies, spec, child) {
		const metadataProvider = dependencies.metadataProvider;
		const textProvider = dependencies.textProvider;
		const cPresentation = spec.cPresentation;
		const cParentPresentation = spec.cParentPresentation;
		const path = spec.path;
		const metadataId = child.metadataId;
		
		let presentationId;
		let view;
		let cMetadataElement;
		
		let mode = "input";
		let pAttributes; 

		const start = function() {
			cMetadataElement = getMetadataById(child.metadataId);
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			
			let viewSpec = intializeViewSpec();
			child.addTypeSpecificInfoToViewSpec(mode, viewSpec);
			view = dependencies.pMultipleChildrenViewFactory.factor(viewSpec, child);

			if (cPresentation.containsChildWithNameInData("mode")) {
				mode = cPresentation.getFirstAtomicValueByNameInData("mode");
			}

			if (cPresentation.containsChildWithNameInData("childReferences")) {
				let presentationChildren = cPresentation
					.getFirstChildByNameInData("childReferences").children;
				presentationChildren.forEach(createAndAppendChildForPresentationChildRef);
			}
			if ("pSurroundingContainer" !== child.type) {
				initPAttributes();
			}
		};

		const intializeViewSpec = function() {
			let nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
			let textId = getTextId(cMetadataElement, "textId");
			let text = textProvider.getTranslation(textId);
			let defTextId = getTextId(cMetadataElement, "defTextId");
			let defText = textProvider.getTranslation(defTextId);

			let viewSpec = {
				presentationId: presentationId,
				className: getClassName(),
				id: path.join(""),
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
						}, {
							text: `presentationId: ${presentationId}`,
							onclickMethod: openPresentationIdRecord
						}
					]
				},
//				onblurFunction: onBlur,
//				onkeyupFunction: onkeyup,
			};
//			possiblyAddPlaceHolderText(pVarViewSpec);
//			possiblyAddLabelToViewSpec(pVarViewSpec);
			
			return viewSpec;
		};
		
		const getClassName = function(){
			let possiblePresentationStyle = getPresentationStyle();
			return child.type +" "+possiblePresentationStyle + presentationId;
		};
		
		const getPresentationStyle = function() {
			if (cPresentation.containsChildWithNameInData("presentationStyle")) {
				return cPresentation.getFirstAtomicValueByNameInData("presentationStyle") +" ";
			}
			return "";
		};
		
		const getTextId = function(cMetadataElementIn, textNameInData) {
			return cMetadataElementIn.getLinkedRecordIdFromFirstChildLinkWithNameInData(textNameInData);
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
			childRefHandlerSpec.parentMetadataId = child.metadataId;
			childRefHandlerSpec.recordPartPermissionCalculator = spec.recordPartPermissionCalculator;

			return dependencies.pNonRepeatingChildRefHandlerFactory.factor(childRefHandlerSpec);
		};

		const createChildRefHandlerCommonSpec = function(cPresentationChild, cPresentationChildRef) {
			let childRefHandlerSpec = {
				parentPath: path,
				cPresentation: cPresentationChild,
				cParentPresentation: cParentPresentation,
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
				addViewToParent: view.addAttributesView,
				path: path,
				mode: mode
			};
			pAttributes = dependencies.pAttributesFactory.factor(pAttributesSpec);
		};

		const addAttributesView = function(attributesView) {
			view.insertBefore(attributesView, view.firstChild);
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const getPresentationId = function() {
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
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

		start();
		return Object.freeze({
			type: "pParentMultipleChildren",
			getPresentationId: getPresentationId,
			getView: view.getView,
			addAttributesView: addAttributesView,
			
			openTextIdRecord: openTextIdRecord,
			openDefTextIdRecord: openDefTextIdRecord,
			openMetadataIdRecord: openMetadataIdRecord,
			openPresentationIdRecord: openPresentationIdRecord,
			openLinkedRecordForLink: openLinkedRecordForLink,
		});
	};
	return cora;
}(CORA));