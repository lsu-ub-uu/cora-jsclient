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
	cora.pChildRefHandler = function(spec) {
		var parentPath = spec.parentPath;
		var cParentMetadata = spec.cParentMetadata;
		var cPresentation = spec.cPresentation;
		var cPresentationMinimized = spec.cPresentationMinimized;
		var minimizedDefault = spec.minimizedDefault;
		var cParentPresentation = spec.cParentPresentation;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var presentationFactory = spec.presentationFactory;

		var presentationId = findPresentationId(cPresentation);
		var metadataId = cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		var cMetadataElement = getMetadataById(metadataId);

		var cParentMetadataChildRef = findParentMetadataChildRef(cParentMetadata);
		var repeatMin = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMin");
		var repeatMax = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMax");
		var isRepeating = calculateIsRepeating();
		var isStaticNoOfChildren = calculateIsStaticNoOfChildren();

		var view = createBaseView();
		var childrenView = createChildrenView();
		view.appendChild(childrenView);
		var buttonView;
		var addButton;
		if (showAddButton()) {
			buttonView = createButtonView();
			view.appendChild(buttonView);
			addButton = createAddButton();
			buttonView.appendChild(addButton);
		}
		var noOfRepeating = 0;

		pubSub.subscribe("add", parentPath, undefined, handleMsg);

		function findPresentationId(cPresentationToSearch) {
			var recordInfo = cPresentationToSearch.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function findParentMetadataChildRef(cMetadata) {
			var parentMetadataChildRef = cMetadata.getFirstChildByNameInData("childReferences").children
					.find(function(metadataChildRef) {
						var cMetadataChildRef = CORA.coraData(metadataChildRef);
						return cMetadataChildRef.getFirstAtomicValueByNameInData("ref") === metadataId;
					});
			return CORA.coraData(parentMetadataChildRef);
		}

		function calculateIsRepeating() {
			if (repeatMax > 1 || repeatMax === "X") {
				return true;
			}
			return false;
		}

		function calculateIsStaticNoOfChildren() {
			if (repeatMax === repeatMin) {
				return true;
			}
			return false;
		}

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pChildRefHandler " + presentationId;

			return viewNew;
		}

		function createChildrenView() {
			var childrenViewNew = document.createElement("span");
			childrenViewNew.className = "childrenView";
			return childrenViewNew;
		}

		function showAddButton() {
			return (isRepeating && !isStaticNoOfChildren) || isZeroToOne();
		}

		function isZeroToOne() {
			if (repeatMin === "0" && repeatMax === "1") {
				return true;
			}
			return false;
		}

		function createButtonView() {
			var buttonViewNew = document.createElement("span");
			buttonViewNew.className = "buttonView";
			return buttonViewNew;
		}

		function createAddButton() {
			var button = document.createElement("input");
			button.type = "button";
			button.value = "ADD";
			return button;
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function getView() {
			return view;
		}

		function handleMsg(dataFromMsg) {
			if (metadataId === dataFromMsg.metadataId) {
				add(dataFromMsg.repeatId);
			}
		}

		function add(repeatId) {
			console.log("Add:"+repeatId);
			var newPath = calculatePathForNewElement(repeatId);
			var repeatingElementSpec = {
				"repeatMin" : repeatMin,
				"repeatMax" : repeatMax,
				"path" : newPath,
				"jsBookkeeper" : spec.jsBookkeeper
			};
			var repeatingElement = CORA.pRepeatingElement(repeatingElementSpec);
			var repeatingElementView = repeatingElement.getView();
			noOfRepeating++;
			childrenView.appendChild(repeatingElementView);

			var presentation = presentationFactory.factor(newPath, cPresentation,
					cParentPresentation);
			repeatingElement.addPresentation(presentation);

			if (cPresentationMinimized !== undefined) {
				var presentationMinimized = presentationFactory.factor(newPath,
						cPresentationMinimized, cParentPresentation);
				console.log("spec.minimizedDefault: "+minimizedDefault)
				repeatingElement.addPresentationMinimized(presentationMinimized,
						minimizedDefault);

			}

			subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView(newPath,
					repeatingElementView);
			updateView();
		}

		function subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView(newPath,
				repeatingElementView) {
			if (showAddButton()) {
				var removeFunction = function() {
					childrenView.removeChild(repeatingElementView);
					childRemoved();
				};
				pubSub.subscribe("remove", newPath, undefined, removeFunction);
			}
		}

		function calculatePathForNewElement(repeatId) {
			var nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
			var attributes = getAttributesForMetadataId(cMetadataElement);
			var pathCopy = JSON.parse(JSON.stringify(parentPath));
			var childPath = createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId,
					attributes);
			if (pathCopy.children === undefined) {
				return childPath;
			}
			var lowestPath = getLowestPath(pathCopy);
			lowestPath.children.push(childPath);
			return pathCopy;
		}

		function createLinkedPathWithNameInDataAndRepeatId(nameInDataForPath, repeatIdForPath,
				attributes) {
			var path = {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : nameInDataForPath
				} ]
			};
			if (repeatIdForPath !== undefined) {
				path.children.push({
					"name" : "repeatId",

					"value" : repeatIdForPath
				});
			}

			if (attributes !== undefined) {
				path.children.push(attributes);
			}
			return path;
		}

		function getLowestPath(path) {
			var cPath = CORA.coraData(path);
			if (cPath.containsChildWithNameInData("linkedPath")) {
				return getLowestPath(cPath.getFirstChildByNameInData("linkedPath"));
			}
			return path;
		}
		function getAttributesForMetadataId(metadataElement) {
			if (metadataElement.containsChildWithNameInData("attributeReferences")) {
				return getAttributesForMetadataElement(metadataElement);
			}
			return undefined;
		}

		function getAttributesForMetadataElement(metadataElement) {
			var attributesOut = createAttributes();
			var attributeReferences = metadataElement
					.getFirstChildByNameInData("attributeReferences");
			var attributeReference;
			for (var i = 0; i < attributeReferences.children.length; i++) {
				attributeReference = attributeReferences.children[i];
				var attribute = getAttributeForAttributeReference(attributeReference, i);
				attributesOut.children.push(attribute);
			}
			return attributesOut;
		}

		function createAttributes() {
			return {
				"name" : "attributes",
				"children" : []
			};
		}

		function getAttributeForAttributeReference(attributeReference, index) {
			var attributeMetadata = getMetadataById(attributeReference.value);
			var attributeNameInData = attributeMetadata
					.getFirstAtomicValueByNameInData("nameInData");
			var finalValue = attributeMetadata.getFirstAtomicValueByNameInData("finalValue");

			return createAttributeWithNameAndValueAndRepeatId(attributeNameInData, finalValue,
					index);

		}

		function createAttributeWithNameAndValueAndRepeatId(attributeName, attributeValue, repeatId) {
			return {
				"name" : "attribute",
				"repeatId" : repeatId || "1",
				"children" : [ {
					"name" : "attributeName",
					"value" : attributeName
				}, {
					"name" : "attributeValue",
					"value" : attributeValue
				} ]
			};
		}
		function childRemoved() {
			noOfRepeating--;
			updateView();
		}

		function updateView() {
			if (showAddButton()) {
				updateButtonViewVisibility();
				updateChildrenRemoveButtonVisibility();
			}
		}

		function updateChildrenRemoveButtonVisibility() {
			var repeatingElements = childrenView.childNodes;
			// can not use Object.keys(repeatingElements) as phantomJs can't
			// handle it
			var length = repeatingElements.length;
			if (minLimitOfChildrenReached()) {
				for (var i = 0; i < length; i++) {
					repeatingElements[i].modelObject.hideRemoveButton();
				}
			} else {
				for (var i2 = 0; i2 < length; i2++) {
					repeatingElements[i2].modelObject.showRemoveButton();
				}
			}
		}

		function minLimitOfChildrenReached() {
			return noOfRepeating === Number(repeatMin);
		}

		function updateButtonViewVisibility() {
			if (maxLimitOfChildrenReached()) {
				hideButtonView();
			} else {
				showButtonView();
			}
		}

		function hideButtonView() {
			buttonView.styleOriginal = buttonView.style.display;
			buttonView.style.display = "none";
		}

		function showButtonView() {
			buttonView.style.display = buttonView.styleOriginal;
		}

		function maxLimitOfChildrenReached() {
			return noOfRepeating === Number(repeatMax);
		}

		function sendAdd() {
			var data = {
				"metadataId" : metadataId,
				"path" : parentPath,
				"childReference" : cParentMetadataChildRef.getData()
			};
			spec.jsBookkeeper.add(data);
		}

		var out = Object.freeze({
			getView : getView,
			add : add,
			handleMsg : handleMsg,
			isRepeating : isRepeating,
			isStaticNoOfChildren : isStaticNoOfChildren,
			sendAdd : sendAdd,
			childRemoved : childRemoved
		});
		view.modelObject = out;
		if (showAddButton()) {
			addButton.onclick = sendAdd;
		}
		return out;
	};
	return cora;
}(CORA));