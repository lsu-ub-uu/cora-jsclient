/*
 * Copyright 2016, 2017, 2023 Olov McKie
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
var CORA = (function(cora) {
	"use strict";
	cora.presentationFactory = function(dependencies) {
		const infoFactory = CORA.infoFactory();
//		const pVarViewFactoryDependencies = {
//			infoFactory: infoFactory
//		};
//		const pVarViewFactory = CORA.genericFactory("pVarView", pVarViewFactoryDependencies);
		const pVarViewFactory = CORA.pVarViewFactory();
		
//		const pNumVarViewFactory = CORA.genericFactory("pNumVarView", pVarViewFactoryDependencies);
		
		const pRepeatingElementFactoryDependencies = {
			infoFactory: infoFactory,
			jsBookkeeper: dependencies.jsBookkeeper
		};
		
		const pRepeatingElementFactory = CORA.genericFactory("pRepeatingElement",
			pRepeatingElementFactoryDependencies);

		const pRecordLinkViewFactoryDependencies = {
			infoFactory: infoFactory
		};
		const pRecordLinkViewFactory = CORA.genericFactory("pRecordLinkView",
			pRecordLinkViewFactoryDependencies);
	
		const pChildRefHandlerFactoryDependencies = {
			metadataProvider: dependencies.providers.metadataProvider,
			recordTypeProvider: dependencies.providers.recordTypeProvider,
			textProvider: dependencies.providers.textProvider,
			pubSub: dependencies.pubSub,
			jsBookkeeper: dependencies.jsBookkeeper,
			uploadManager: dependencies.uploadManager,
			ajaxCallFactory: dependencies.ajaxCallFactory,
			dataDivider: dependencies.dataDivider,

			pRepeatingElementFactory: pRepeatingElementFactory,
			pChildRefHandlerViewFactory: CORA.genericFactory("pChildRefHandlerView", {})
		};
		
		const pChildRefHandlerFactory = CORA.genericFactory("pChildRefHandler",
			pChildRefHandlerFactoryDependencies);

		const pNonRepeatingChildRefHandlerFactoryDependencies = {
			pNonRepeatingChildRefHandlerViewFactory: CORA
				.genericFactory("pNonRepeatingChildRefHandlerView", {}),
			pubSub: dependencies.pubSub,
			providers: dependencies.providers
		};

		const pNonRepeatingChildRefHandlerFactory = CORA
			.genericFactory("pNonRepeatingChildRefHandler",
				pNonRepeatingChildRefHandlerFactoryDependencies);

		const pMapViewFactoryDependencies = {
			infoFactory: infoFactory
		};
		
		const pMapViewFactory = CORA.genericFactory("pMapView", pMapViewFactoryDependencies);

		const pAttributesDependencies = {
			pubSub: dependencies.pubSub,
			pAttributesViewFactory : CORA.genericFactory("pAttributesView")
	};
		
		const pAttributesFactory = CORA.genericFactory("pAttributes", pAttributesDependencies);

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
//			presentationFactory: self,

			pubSub: dependencies.pubSub,
			jsBookkeeper: dependencies.jsBookkeeper,
			uploadManager: dependencies.uploadManager,
			authTokenHolder: dependencies.authTokenHolder,

			pVarViewFactory: pVarViewFactory,
//			pNumVarViewFactory: pNumVarViewFactory,
			pRecordLinkViewFactory: pRecordLinkViewFactory,
			pMapViewFactory: pMapViewFactory,
			pChildRefHandlerFactory: pChildRefHandlerFactory,
			pNonRepeatingChildRefHandlerFactory: pNonRepeatingChildRefHandlerFactory,
			pAttributesFactory: pAttributesFactory
		};
		childDependencies.pParentVarFactory = CORA.genericParentFactory("pParentVar", childDependencies);
	
	
		const factor = function(spec) {

			let specNew = {
				path: spec.path,
				metadataIdUsedInData: spec.metadataIdUsedInData,
				cPresentation: spec.cPresentation,
				cParentPresentation: spec.cParentPresentation
			};

			let type = spec.cPresentation.getData().attributes.type;
			if (type === "pVar") {
				return CORA.pVar(childDependencies, specNew);
			}
			if (type === "pCollVar") {
				return CORA.pCollectionVar(childDependencies, specNew);
			}
			if (type === "pNumVar") {
				return CORA.pNumVar(childDependencies, specNew);
			}
			if (type === "pGroup") {
				if (shouldBePresentedAsMap(spec.cPresentation)) {
					return CORA.pMap(childDependencies, specNew);
				}
				specNew.recordPartPermissionCalculator = spec.recordPartPermissionCalculator;
				return CORA.pGroup(childDependencies, specNew);
			}
			if (type === "pRecordLink") {
				specNew.recordPartPermissionCalculatorFactory = dependencies.recordPartPermissionCalculatorFactory;
				return CORA.pRecordLink(childDependencies, specNew);
			}
			if (type === "pResourceLink") {
				return CORA.pResourceLink(childDependencies, specNew);
			}
			let repeat = spec.cPresentation.getData().attributes.repeat;
			if (repeat === "this") {
				return CORA.pRepeatingContainer(childDependencies, specNew);
			}
			specNew.recordPartPermissionCalculator = spec.recordPartPermissionCalculator;
			return CORA.pSurroundingContainer(childDependencies, specNew);
		};

		const shouldBePresentedAsMap = function(cPresentation) {
			return cPresentation.containsChildWithNameInData("presentAs")
				&& "map" === cPresentation.getFirstAtomicValueByNameInData("presentAs");
		};

		const getDependencies = function() {
			return dependencies;
		};

		const self = Object.freeze({
			type: "presentationFactory",
			getDependencies: getDependencies,
			factor: factor
		});
		
		pChildRefHandlerFactoryDependencies.presentationFactory = self;
		pNonRepeatingChildRefHandlerFactoryDependencies.presentationFactory = self;
		pAttributesDependencies.presentationFactory = self;
		childDependencies.presentationFactory = self;

		return self;
	};
	return cora;
}(CORA));