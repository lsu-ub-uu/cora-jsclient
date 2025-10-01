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
		let topLevelMetadataIds = [];
		let metadataHelper;
		const metadataProvider = dependencies.providers.metadataProvider;
		const pubSub = dependencies.pubSub;
		const containsDataTrackerFactory = dependencies.containsDataTrackerFactory;
		const parentPresentationCounter = spec.parentPresentationCounter;
				
		const start = function() {

			metadataHelper = CORA.metadataHelper({
				metadataProvider: metadataProvider
			});
			createView();
			calculateHandledTopLevelMetadataIds(spec.cPresentation);
			createContainsDataTracker();
			let factoredPresentation = factorPresentation(spec.cPresentation);
			view.addChild(factoredPresentation.getView());
			possiblyAddAlternativePresentation();
			view.setHasDataStyle(false);
			if (spec.mode === "input") {
				view.showContent();
			} else {
				view.hideContent();
			}
		};
		const createContainsDataTracker = function() {
			let containsDataTrackerSpec = {
				methodToCallOnContainsDataChange: methodToCallOnContainsDataChange,
				topLevelMetadataIds: topLevelMetadataIds,
				path: spec.parentPath
			};
			containsDataTrackerFactory.factor(containsDataTrackerSpec);
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
				presentationId: findPresentationId(spec.cPresentation),
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

		const calculateHandledTopLevelMetadataIds = function(cPresentation) {
			let cParentMetadata = CORA.coraData(metadataProvider.getMetadataById(spec.parentMetadataId));
			let cPresentationsOf = CORA.coraData(cPresentation
				.getFirstChildByNameInData("presentationsOf"));
			let listPresentationOf = cPresentationsOf.getChildrenByNameInData("presentationOf");
			listPresentationOf.forEach(function(child) {
				let cChild = CORA.coraData(child);
				let presentationOfId = cChild.getFirstAtomicValueByNameInData("linkedRecordId");
				let cParentMetadataChildRefPart = metadataHelper.getChildRefPartOfMetadata(
					cParentMetadata, presentationOfId);
				if (cParentMetadataChildRefPart.getData() != undefined) {
					let cRef = CORA.coraData(cParentMetadataChildRefPart.getFirstChildByNameInData("ref"));
					let metadataId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
					topLevelMetadataIds.push(metadataId);
				}
			});
		};

		const factorPresentation = function(cPresentation) {
			let presentationSpec = {
				path: spec.parentPath,
				metadataIdUsedInData: spec.parentMetadataId,
				cPresentation: cPresentation,
				cParentPresentation: spec.cParentPresentation,
				recordPartPermissionCalculator: spec.recordPartPermissionCalculator
			};
			return dependencies.presentationFactory.factor(presentationSpec);
		};

		const updateViewForData = function() {
			view.setHasDataStyle(true);
			if (isInOutputMode()) {
				view.showContent();
				publishPresentationShown();
			}
		};

		const isInOutputMode = function() {
			return spec.mode === "output";
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
			onlyForTestMethodToCallOnContainsDataChange: methodToCallOnContainsDataChange
		});

		start();
		return out;
	};

	return cora;
}(CORA));