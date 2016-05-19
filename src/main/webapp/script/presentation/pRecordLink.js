/*
 * Copyright 2016 Uppsala University Library
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
	cora.pRecordLink = function(spec) {
		var cPresentation = spec.cPresentation;
		var metadataProvider = spec.metadataProvider;
		var textProvider = spec.textProvider;
		var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");

		var metadataId = cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		var cMetadataElement = getMetadataById(metadataId);
		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");
		var hasLinkedRepeatId = cMetadataElement.containsChildWithNameInData("linkedPath");

		var view = createBaseView();
		var valueView = createValueView();
		view.appendChild(valueView);

		spec.pubSub.subscribe("linkedData", spec.path, undefined, handleMsg);

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pRecordLink " + presentationId;
			return viewNew;
		}
		function createValueView() {
			var valueViewNew = document.createElement("span");
			valueViewNew.className = "childrenView";

			var recordTypeViewNew = createChildView("linkedRecordType",
					"linkedRecordTypeOutputPVar");
			valueViewNew.appendChild(recordTypeViewNew);
			if (mode === "input") {
				createAndAddInputs(valueViewNew);
			} else {
				createAndAddOutput(valueViewNew);
			}
			return valueViewNew;
		}

		function handleMsg(dataFromMsg) {
			createLinkedRecordPresentationView(dataFromMsg);
		}

		function createLinkedRecordPresentationView(dataFromMessage) {
			var cData = CORA.coraData(dataFromMessage.data);
			var linkedRecordType = cData.getFirstAtomicValueByNameInData("linkedRecordType");
			if (cPresentation.containsChildWithNameInData("linkedRecordPresentations")) {
				var linkedRecordPresentations = cPresentation
						.getFirstChildByNameInData("linkedRecordPresentations");

				var filter = linkedRecordTypeFilter(linkedRecordType);
				var foundChild = linkedRecordPresentations.children.find(filter);
				if (foundChild !== undefined) {
					var cChildPresentation = CORA.coraData(foundChild);
					var linkedPresentationId = cChildPresentation
							.getFirstAtomicValueByNameInData("presentationId");
					var cLinkedRecordPresentation = getMetadataById(linkedPresentationId);
					var linkedMetadataId = cLinkedRecordPresentation
							.getFirstAtomicValueByNameInData("presentationOf");

					if (undefined !== dataFromMessage.data.actionLinks) {
						var recordViewerSpec = {
							"read" : dataFromMessage.data.actionLinks.read,
							"presentationId" : presentationId,
							"metadataId" : linkedMetadataId,
							"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
							"recordGuiFactory" : spec.recordGuiFactory
						};
						var recordViewer = CORA.recordViewer(recordViewerSpec);
						var recordViewerView = recordViewer.getView();

						view.appendChild(recordViewerView);
					}
				}
			}
		}
		function linkedRecordTypeFilter(recordTypeId) {
			return function(child) {
				var cChild = CORA.coraData(child);
				var linkedRecordType = cChild.getFirstAtomicValueByNameInData("linkedRecordType");
				return linkedRecordType === recordTypeId;
			};
		}

		function createAndAddInputs(valueViewNew) {
			var recordIdPVarId = "linkedRecordIdPVar";
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				recordIdPVarId = "linkedRecordIdOutputPVar";
			}
			var recordIdViewNew = createChildView("linkedRecordId", recordIdPVarId);
			valueViewNew.appendChild(recordIdViewNew);

			if (hasLinkedRepeatId) {
				var repeatIdViewNew = createChildView("linkedRepeatId", "linkedRepeatIdPVar");
				valueViewNew.appendChild(repeatIdViewNew);
			}
		}
		function createChildView(id, presentationIdToFactor) {
			var childViewNew = document.createElement("span");
			childViewNew.className = id + "View";
			childViewNew.appendChild(createText(id + "Text"));

			var childParentPath = calculateNewPath(id + "TextVar");
			var cPresentationChild = CORA.coraData(metadataProvider
					.getMetadataById(presentationIdToFactor));
			var pVar = spec.presentationFactory.factor(childParentPath, cPresentationChild);
			childViewNew.appendChild(pVar.getView());
			return childViewNew;
		}

		function createText(presRef) {
			var text = document.createElement("span");
			text.appendChild(document.createTextNode(textProvider.getTranslation(presRef)));
			text.className = "text";
			return text;
		}

		function calculateNewPath(metadataIdToAdd) {
			var pathSpec = {
				"metadataProvider" : spec.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"parentPath" : spec.path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		}

		function createAndAddOutput(valueViewNew) {
			var recordIdViewNew = createChildView("linkedRecordId", "linkedRecordIdOutputPVar");
			valueViewNew.appendChild(recordIdViewNew);

			if (hasLinkedRepeatId) {
				var repeatIdViewNew = createChildView("linkedRepeatId", "linkedRepeatIdOutputPVar");
				valueViewNew.appendChild(repeatIdViewNew);
			}
		}

		function getView() {
			return view;
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		var out = Object.freeze({
			"type" : "pRecordLink",
			getView : getView,
			handleMsg : handleMsg
		});
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));