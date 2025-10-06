/*
 * Copyright 2018, 2020 Uppsala University Library
 * Copyright 2018 Olov McKie
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
	cora.pNonRepeatingChildRefHandler = function(dependencies, spec) {
		let view;
		const pubSub = dependencies.pubSub;
		const metadataProvider = dependencies.providers.metadataProvider;
		const parentPresentationCounter = spec.parentPresentationCounter;
		const mode = spec.mode;
		const cPresentation = spec.cPresentation;
		let presentationVisibilities = {};
		let presentationContainsDatas = {};
		let pRepeatingElementIsVisible;
		let pRepeatingElementContainsData;
		let presentationCounterToUseWhenPublishingCombinedStatus;
		let possiblyFake;
		let metadataHelper;
		let notFoundIds = [];

		const start = function() {
			metadataHelper = CORA.metadataHelper({
				metadataProvider: metadataProvider
			});
			if (atLeastOneChildRefFoundInCurrentlyUsedParentMetadata()) {
				continueWithNormalStartup();
			} else {
				possiblyFake = createFakePChildRefHandlerAsWeDoNotHaveMetadataToWorkWith();
			}
		};

		const continueWithNormalStartup = function() {
			createView();
			let factoredPresentation = factorPresentation(cPresentation);
			presentationCounterToUseWhenPublishingCombinedStatus = factoredPresentation.getPresentationCounter();

			view.addChild(factoredPresentation.getView());
			possiblyAddAlternativePresentation();
			view.setHasDataStyle(false);
			if (mode === "input") {
				view.showContent();
			} else {
				view.hideContent();
			}
		};

		const atLeastOneChildRefFoundInCurrentlyUsedParentMetadata = function() {
			let cParentMetadata = CORA.coraData(metadataProvider.getMetadataById(spec.parentMetadataId));
			let presentationsOf = cPresentation.getFirstChildByNameInData("presentationsOf");

			for (const childReference of presentationsOf.children) {
				let cChildReference = CORA.coraData(childReference);
				let childMetadataIdFromPresentation = cChildReference.getFirstAtomicValueByNameInData("linkedRecordId");
				console.log("childMetadataIdFromPresentation", childMetadataIdFromPresentation)
				let cParentMetadataChildRefPart = metadataHelper.getChildRefPartOfMetadata(
					cParentMetadata, childMetadataIdFromPresentation);
				if (cParentMetadataChildRefPart.getData() !== undefined) {
					console.log("found")
					return true;
				}else{
					notFoundIds.push(childMetadataIdFromPresentation);
				}
			}
			console.log("NOT found")
			return false;
		};

		const createFakePChildRefHandlerAsWeDoNotHaveMetadataToWorkWith = function() {
			return {
				getView: function() {
					let spanNew = document.createElement("span");
					spanNew.className = "fakePChildRefHandlerViewAsNoMetadataExistsFor "
						+ notFoundIds.join(" ");
					return spanNew;
				},
				handleMsgToDeterminVisibilityChange: function() { }
			};
		};

		const methodToCallOnContainsDataChange = function(state) {
			if (state) {
				updateViewForData();
			} else {
				updateViewForNoData();
			}
		};

		const createView = function() {
			let viewSpec = {
				presentationId: findPresentationId(cPresentation),
				textStyle: spec.textStyle,
				childStyle: spec.childStyle,
				callOnFirstShowOfPresentation: publishPresentationShown,
				clickableHeadlineText: spec.clickableHeadlineText,
				clickableHeadlineLevel: spec.clickableHeadlineLevel,
				presentationSize: spec.presentationSize
			};
			view = dependencies.pNonRepeatingChildRefHandlerViewFactory.factor(viewSpec);
		};

		const publishPresentationShown = function() {
			pubSub.publish("presentationShown", {
				data: "",
				path: []
			});
		};

		const findPresentationId = function(cPresentation) {
			let recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		};


		const factorPresentation = function(cPresentation) {
			let presentationSpec = {
				path: spec.parentPath,
				metadataIdUsedInData: spec.parentMetadataId,
				cPresentation: cPresentation,
				cParentPresentation: spec.cParentPresentation,
				recordPartPermissionCalculator: spec.recordPartPermissionCalculator
			};
			let presentation = dependencies.presentationFactory.factor(presentationSpec);

			pubSub.subscribe("visibilityChange", [presentation.getPresentationCounter()],
				undefined, handleMsgToDeterminVisibilityChange);
			return presentation;
		};

		const showOrHideViewBaseOnVisibility = function(currentlyVisible) {
			if (currentlyVisible) {
				view.showContent();
			} else {
				view.hideContent();
			}
		};

		const handleMsgToDeterminVisibilityChange = function(dataFromMsg, msg) {
			presentationVisibilities[dataFromMsg.presentationCounter] = dataFromMsg.visibility;
			presentationContainsDatas[dataFromMsg.presentationCounter] = dataFromMsg.containsData;
			let currentlyVisible = atLeastOneTrackedPresentationIsVisible();
			let visibilityHasChanged = visibilityChanges(currentlyVisible);
			let currentlyContainsData = atLeastOneTrackedPresentationContainsData();
			let containsDataHasChanged = containsDataChanges(currentlyContainsData);

			if (visibilityHasChanged && mode === "output") {
				showOrHideViewBaseOnVisibility(currentlyVisible);
			}
			if (visibilityHasChanged || containsDataHasChanged) {
				publishVisibilityChange(getVisibilityStatus(), currentlyContainsData);
			}
			view.setHasDataStyle(currentlyContainsData);
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
				path: [parentPresentationCounter],

				presentationCounter: presentationCounterToUseWhenPublishingCombinedStatus,
				visibility: currentlyVisible,
				containsData: currentlyContainsData
			};

			pubSub.publish("visibilityChange", visibilityData);
		};

		const updateViewForData = function() {
			view.setHasDataStyle(true);
			if (isInOutputMode()) {
				view.showContent();
				publishPresentationShown();
			}
		};

		const isInOutputMode = function() {
			return mode === "output";
		};

		const updateViewForNoData = function() {
			view.setHasDataStyle(false);
			if (isInOutputMode()) {
				view.hideContent();
			}
		};

		const possiblyAddAlternativePresentation = function() {
			if (spec.cAlternativePresentation !== undefined) {
				let factoredAlternativePresentation = factorPresentation(spec.cAlternativePresentation);
				view.addAlternativePresentation(factoredAlternativePresentation.getView());
			}
		};

		const getView = function() {
			return view.getView();
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		let out = Object.freeze({
			type: "pNonRepeatingChildRefHandler",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			publishPresentationShown: publishPresentationShown,
			onlyForTestMethodToCallOnContainsDataChange: methodToCallOnContainsDataChange,
			handleMsgToDeterminVisibilityChange: handleMsgToDeterminVisibilityChange
		});

		start();
		if (undefined !== possiblyFake) {
			return possiblyFake;
		}
		return out;
	};

	return cora;
}(CORA));