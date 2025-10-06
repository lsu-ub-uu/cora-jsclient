/*
 * Copyright 2016, 2018, 2020 Uppsala University Library
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
	cora.pRepeatingContainer = function(dependencies, spec) {
		const pubSub = dependencies.pubSub;
		let path = spec.path;
		const presentationCounter = spec.presentationCounter;
		let cPresentation = spec.cPresentation;
		let metadataProvider = dependencies.metadataProvider;
		let textProvider = dependencies.textProvider;
		let presentationFactory = dependencies.presentationFactory;
		let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		let presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		let view;

		let presentationVisibilities = {};
		let presentationContainsDatas = {};
		let pRepeatingElementIsVisible;
		let pRepeatingElementContainsData;
		let presentationCounterToUseWhenPublishingCombinedStatus;

		const start = function() {
			view = createBaseView();
		};

		const createBaseView = function() {
			let viewNew = CORA.createSpanWithClassName("pRepeatingContainer " + presentationId);

			let presentationChildren = cPresentation.getFirstChildByNameInData("childReferences").children;

			presentationChildren.forEach(function(presentationChildRef) {
				viewNew.appendChild(createViewForChild(presentationChildRef));
			});
			return viewNew;
		};

		const createViewForChild = function(presentationChildRef) {
			let refId = getRefId(presentationChildRef);
			let cPresentationChild = getMetadataById(refId);
			if (cPresentationChild.getData().name === "text") {
				let text = CORA.createSpanWithClassName("text");
				text.appendChild(document.createTextNode(textProvider.getTranslation(refId)));
				return text;
			}
			let presentationSpec = {
				path: path,
				metadataIdUsedInData: spec.metadataIdUsedInData,
				cPresentation: cPresentationChild
			};
			let presentation = presentationFactory.factor(presentationSpec);
			if (presentationCounterToUseWhenPublishingCombinedStatus === undefined) {
				presentationCounterToUseWhenPublishingCombinedStatus = presentation.getPresentationCounter();
			}
			pubSub.subscribe("visibilityChange", [presentation.getPresentationCounter()],
				undefined, handleMsgToDeterminVisibilityChange);
			return presentation.getView();
		};

		const getRefId = function(presentationChildRef) {
			let cPresentationChildRef = CORA.coraData(presentationChildRef);
			let cRefGroup = CORA.coraData(cPresentationChildRef
				.getFirstChildByNameInData("refGroup"));
			let cRef = CORA.coraData(cRefGroup.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const handleMsgToDeterminVisibilityChange = function(dataFromMsg, msg) {
			presentationVisibilities[dataFromMsg.presentationCounter] = dataFromMsg.visibility;
			presentationContainsDatas[dataFromMsg.presentationCounter] = dataFromMsg.containsData;
			let currentlyVisible = atLeastOneTrackedPresentationIsVisible();
			let visibilityHasChanged = visibilityChanges(currentlyVisible);
			let currentlyContainsData = atLeastOneTrackedPresentationContainsData();
			let containsDataHasChanged = containsDataChanges(currentlyContainsData);

			if (visibilityHasChanged || containsDataHasChanged) {
				publishVisibilityChange(getVisibilityStatus(), currentlyContainsData);
			}
		};

		const atLeastOneTrackedPresentationIsVisible = function() {
			return Object.values(presentationVisibilities).some(v => v === 'visible');
		};

		const atLeastOneTrackedPresentationContainsData = function() {
			return Object.values(presentationContainsDatas).some(v => v === true);
		};

		const getVisibilityStatus = function() {
			if (Object.values(presentationVisibilities).some(v => v === 'visible')) {
				return "visible";
			}
			return "hidden";
		};

		const visibilityChanges = function(currentlyVisible) {
			if (pRepeatingElementIsVisible !== currentlyVisible) {
				pRepeatingElementIsVisible = currentlyVisible;
				return true;
			}
			return false;
		};

		const containsDataChanges = function(currentlyContainsData) {
			if (pRepeatingElementContainsData !== currentlyContainsData) {
				pRepeatingElementContainsData = currentlyContainsData;
				return true;
			}
			return false;
		};

		const publishVisibilityChange = function(currentlyVisible, currentlyContainsData) {
			let visibilityData = {
				path: [presentationCounter],

				presentationCounter: presentationCounterToUseWhenPublishingCombinedStatus,
				visibility: currentlyVisible,
				containsData: currentlyContainsData
			};

			pubSub.publish("visibilityChange", visibilityData);
		};

		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};

		const getView = function() {
			return view;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};


		const getPresentationCounter = function() {
			return presentationCounter;
		};

		start();

		let out = Object.freeze({
			type: "pRepeatingContainer",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			getPresentationCounter: getPresentationCounter,
			handleMsgToDeterminVisibilityChange: handleMsgToDeterminVisibilityChange
		});
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));