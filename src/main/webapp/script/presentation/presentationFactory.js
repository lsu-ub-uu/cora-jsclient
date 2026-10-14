/*
 * Copyright 2016, 2017, 2023, 2024 Olov McKie
 * Copyright 2016, 2018, 2020 Uppsala University Library
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

import { genericFactory } from "../genericFactory.js";
import { genericParentFactory } from "../genericParentFactory.js";
import { infoFactory as infoFactoryImported } from "../gui/infoFactory.js";
import { pAttributes } from "./pAttributes.js";
import { pAttributesView } from "./pAttributesView.js";
import { pChildRefHandler } from "./pChildRefHandler.js";
import { pChildRefHandlerView } from "./pChildRefHandlerView.js";
import { pCollectionVar } from "./pCollectionVar.js";
import { pGroup } from "./pGroup.js";
import { pMap } from "./pMap.js";
import { pMapView } from "./pMapView.js";
import { pMultipleChildrenViewFactory as pMultipleChildrenViewFactoryImported } from "./pMultipleChildrenViewFactory.js";
import { pNonRepeatingChildRefHandler } from "./pNonRepeatingChildRefHandler.js";
import { pNonRepeatingChildRefHandlerView } from "./pNonRepeatingChildRefHandlerView.js";
import { pNumVar } from "./pNumVar.js";
import { pParentMultipleChildren } from "./pParentMultipleChildren.js";
import { pParentVar } from "./pParentVar.js";
import { pRecordLink } from "./pRecordLink.js";
import { pRecordLinkView } from "./pRecordLinkView.js";
import { pRepeatingContainer } from "./pRepeatingContainer.js";
import { pRepeatingElement } from "./pRepeatingElement.js";
import { pResourceLink } from "./pResourceLink.js";
import { pSurroundingContainer } from "./pSurroundingContainer.js";
import { pVar } from "./pVar.js";
import { pVarViewFactory as pVarViewFactoryImported } from "./pVarViewFactory.js";

export const presentationFactory = function(dependencies, spec) {
		const presentationFactoryCounter = spec.presentationFactoryCounter;
		const infoFactory = infoFactoryImported();
		const pVarViewFactory = pVarViewFactoryImported();
		const pMultipleChildrenViewFactory = pMultipleChildrenViewFactoryImported();

		const pRepeatingElementFactoryDependencies = {
			infoFactory: infoFactory,
			jsBookkeeper: dependencies.jsBookkeeper,
			pubSub: dependencies.pubSub
		};

		const pRepeatingElementFactory = genericFactory(pRepeatingElement,
			pRepeatingElementFactoryDependencies);

		const pRecordLinkViewFactoryDependencies = {
			infoFactory: infoFactory
		};

		const pRecordLinkViewFactory = genericFactory(pRecordLinkView,
			pRecordLinkViewFactoryDependencies);

		const pChildRefHandlerFactoryDependencies = {
			metadataProvider: dependencies.providers.metadataProvider,
			recordTypeProvider: dependencies.providers.recordTypeProvider,
			textProvider: dependencies.providers.textProvider,
			pubSub: dependencies.pubSub,
			jsBookkeeper: dependencies.jsBookkeeper,
			uploadManager: dependencies.uploadManager,
			ajaxCallFactory: dependencies.ajaxCallFactory,
			recordData: dependencies.recordData,

			pRepeatingElementFactory: pRepeatingElementFactory,
			pChildRefHandlerViewFactory: genericFactory(pChildRefHandlerView, {})
		};

		const pChildRefHandlerFactory = genericFactory(pChildRefHandler,
			pChildRefHandlerFactoryDependencies);

		const pNonRepeatingChildRefHandlerFactoryDependencies = {
			pNonRepeatingChildRefHandlerViewFactory: genericFactory(pNonRepeatingChildRefHandlerView, {}),
			pubSub: dependencies.pubSub,
			providers: dependencies.providers
		};

		const pNonRepeatingChildRefHandlerFactory = genericFactory(pNonRepeatingChildRefHandler,
			pNonRepeatingChildRefHandlerFactoryDependencies);

		const pMapViewFactoryDependencies = {
			infoFactory: infoFactory
		};

		const pMapViewFactory = genericFactory(pMapView, pMapViewFactoryDependencies);

		const pAttributesDependencies = {
			metadataProvider: dependencies.providers.metadataProvider,
			pubSub: dependencies.pubSub,
			pAttributesViewFactory: genericFactory(pAttributesView)
		};

		const pAttributesFactory = genericFactory(pAttributes, pAttributesDependencies);

		const childDependencies = {
			providers: dependencies.providers,
			clientInstanceProvider: dependencies.providers.clientInstanceProvider,
			metadataProvider: dependencies.providers.metadataProvider,
			textProvider: dependencies.providers.textProvider,
			recordTypeProvider: dependencies.providers.recordTypeProvider,

			globalFactories: dependencies.globalFactories,
			xmlHttpRequestFactory: dependencies.xmlHttpRequestFactory,
			recordGuiFactory: dependencies.recordGuiFactory,
			ajaxCallFactory: dependencies.ajaxCallFactory,
			infoFactory: infoFactory,

			pubSub: dependencies.pubSub,
			jsBookkeeper: dependencies.jsBookkeeper,
			uploadManager: dependencies.uploadManager,
			authTokenHolder: dependencies.authTokenHolder,

			pVarViewFactory: pVarViewFactory,
			pMultipleChildrenViewFactory: pMultipleChildrenViewFactory,
			pRecordLinkViewFactory: pRecordLinkViewFactory,
			pMapViewFactory: pMapViewFactory,
			pChildRefHandlerFactory: pChildRefHandlerFactory,
			pNonRepeatingChildRefHandlerFactory: pNonRepeatingChildRefHandlerFactory,
			pAttributesFactory: pAttributesFactory
		};
		childDependencies.pParentVarFactory = genericParentFactory(pParentVar, childDependencies);
		childDependencies.pParentMultipleChildrenFactory = genericParentFactory(pParentMultipleChildren, childDependencies);
		let presentationCounter = 0;

		const factor = function(spec) {
			presentationCounter++;
			let specNew = {
				presentationCounter: presentationFactoryCounter + "-" + presentationCounter,
				path: spec.path,
				metadataIdUsedInData: spec.metadataIdUsedInData,
				cPresentation: spec.cPresentation,
				cParentPresentation: spec.cParentPresentation
			};

			let type = spec.cPresentation.getData().attributes.type;
			if (type === "pVar") {
				return pVar(childDependencies, specNew);
			}
			if (type === "pCollVar") {
				return pCollectionVar(childDependencies, specNew);
			}
			if (type === "pNumVar") {
				return pNumVar(childDependencies, specNew);
			}
			if (type === "pGroup") {
				if (shouldBePresentedAsMap(spec.cPresentation)) {
					return pMap(childDependencies, specNew);
				}
				specNew.recordPartPermissionCalculator = spec.recordPartPermissionCalculator;
				return pGroup(childDependencies, specNew);
			}
			if (type === "pRecordLink") {
				specNew.recordPartPermissionCalculatorFactory = dependencies.recordPartPermissionCalculatorFactory;
				return pRecordLink(childDependencies, specNew);
			}
			if (type === "pResourceLink") {
				return pResourceLink(childDependencies, specNew);
			}
			let repeat = spec.cPresentation.getData().attributes.repeat;
			if (repeat === "this") {
				return pRepeatingContainer(childDependencies, specNew);
			}
			specNew.recordPartPermissionCalculator = spec.recordPartPermissionCalculator;
			return pSurroundingContainer(childDependencies, specNew);
		};

		const shouldBePresentedAsMap = function(cPresentation) {
			return cPresentation.containsChildWithNameInData("presentAs")
				&& "map" === cPresentation.getFirstAtomicValueByNameInData("presentAs");
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const self = Object.freeze({
			type: "presentationFactory",
			getDependencies: getDependencies,
			getSpec: getSpec,
			factor: factor
		});

		pChildRefHandlerFactoryDependencies.presentationFactory = self;
		pNonRepeatingChildRefHandlerFactoryDependencies.presentationFactory = self;
		pAttributesDependencies.presentationFactory = self;
		childDependencies.presentationFactory = self;

		return self;
	};

