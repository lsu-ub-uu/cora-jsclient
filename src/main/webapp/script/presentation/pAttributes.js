/*
 * Copyright 2022, 2024 Uppsala University Library
 * Copyright 2023 Olov McKie
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
	cora.pAttributes = function(dependencies, spec) {
		const metadataProvider = dependencies.metadataProvider;
		let pubSub = dependencies.pubSub;
		let view = dependencies.pAttributesViewFactory.factor();
		let presentationFactory = dependencies.presentationFactory;
		let path = spec.path;
		let mode = spec.mode;
		const toShow = spec.toShow;
		let attributes = [];
		let addedToParent = false;
		let addViewToParent = spec.addViewToParent;
		let cMetadataElement;

		const start = function() {
			subscribeToPubSub();
		};

		const subscribeToPubSub = function() {
			pubSub.subscribe("addAttribute", path, undefined, addAttributePresentation);
		};

		const addAttributePresentation = function(dataFromMsg) {
			addViewToParentOnFirstCall();
			createAndAddAttributePresentation(dataFromMsg);
		};

		const addViewToParentOnFirstCall = function() {
			if (!addedToParent) {
				addViewToParent(view.getView());
				addedToParent = true;
			}
		};

		const createAndAddAttributePresentation = function(dataFromMsg) {
			let showAttribute = shouldAttributeBeShown(dataFromMsg);
			if(showAttribute){
				let attributePVar = createAttributePresentation(dataFromMsg.metadataId);
				attributes.push(attributePVar);
	
				let attributePresentation = {
					view: attributePVar.getView(),
				};
				view.addAttributePresentation(attributePresentation);
			}
		};
		
		const shouldAttributeBeShown = function(dataFromMsg){
			cMetadataElement = getMetadataById(dataFromMsg.metadataId);
			let hasFinalValue = false;
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				hasFinalValue = true;
			}
			return toShow=="all" || (toShow == "selectable" && !hasFinalValue);
		}
		
		const getMetadataById = function(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		};
		
		const createAttributePresentation = function(attributeMetadataId) {
			let cAttributePresentationMetadata = buildAttributePresentationMetadata(
				attributeMetadataId, mode);
			let attributePath = createAttributePath(attributeMetadataId);
			let presentationSpec = {
				path: attributePath,
				metadataIdUsedInData: attributeMetadataId,
				cPresentation: cAttributePresentationMetadata
			};
			return presentationFactory.factor(presentationSpec);
		};

		const buildAttributePresentationMetadata = function(attributeMetadataId, attributeMode) {
			let presentationChildForAttribute = {
				name: "presentation",
				children: [{
					name: "presentationOf",
					children: [{
						name: "linkedRecordId",
						value: attributeMetadataId
					}]
				}, {
					name: "mode",
					value: attributeMode
				}, {
					name: "emptyTextId",
					children: [
						{
							name: "linkedRecordId",
							value: "initialEmptyValueText"
						}]
				}],
				attributes: {
					type: "pCollVar"
				}
			};
			return CORA.coraData(presentationChildForAttribute);
		};

		const createAttributePath = function(metadataId) {
			let pathSpec = {
				metadataIdToAdd: metadataId,
				parentPath: path,
				type: "attribute"
			};
			return CORA.calculatePathForNewElement(pathSpec);
		};

		const getSpec = function() {
			return spec;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const disableExistingAttributes = function() {
			attributes.forEach(
				function(attributePVar) {
					attributePVar.disableVar();
				}
			);
		};

		start();
		return Object.freeze({
			type: "pAttributes",
			getDependencies: getDependencies,
			getSpec: getSpec,
			addAttributePresentation: addAttributePresentation,
			disableExistingAttributes: disableExistingAttributes
		});

	};
	return cora;
}(CORA));