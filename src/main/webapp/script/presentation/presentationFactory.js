/*
 * Copyright 2016, 2017 Olov McKie
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
		let self;

		const factor = function(spec) {
			let path = spec.path;
			let metadataIdUsedInData = spec.metadataIdUsedInData;
			let cPresentation = spec.cPresentation;
			let cParentPresentation = spec.cParentPresentation;

			let infoFactory = CORA.infoFactory();

			let pVarViewFactoryDependencies = {
				"infoFactory": infoFactory
			};
			let pVarViewFactory = CORA.genericFactory("pVarView", pVarViewFactoryDependencies);
			let pNumVarViewFactory = CORA
				.genericFactory("pNumVarView", pVarViewFactoryDependencies);

			let pRepeatingElementFactoryDependencies = {
				"infoFactory": infoFactory,
				"jsBookkeeper": dependencies.jsBookkeeper
			};
			let pRepeatingElementFactory = CORA.genericFactory("pRepeatingElement",
				pRepeatingElementFactoryDependencies);

			let pRecordLinkViewFactoryDependencies = {
				"infoFactory": infoFactory
			};
			let pRecordLinkViewFactory = CORA.genericFactory("pRecordLinkView",
				pRecordLinkViewFactoryDependencies);

			let pChildRefHandlerFactoryDependencies = {
				"metadataProvider": dependencies.providers.metadataProvider,
				"recordTypeProvider": dependencies.providers.recordTypeProvider,
				"textProvider": dependencies.providers.textProvider,
				"pubSub": dependencies.pubSub,
				"presentationFactory": self,
				"jsBookkeeper": dependencies.jsBookkeeper,
				"uploadManager": dependencies.uploadManager,
				"ajaxCallFactory": dependencies.ajaxCallFactory,
				"dataDivider": dependencies.dataDivider,

				"pRepeatingElementFactory": pRepeatingElementFactory,
				"pChildRefHandlerViewFactory": CORA.genericFactory("pChildRefHandlerView", {})
			};
			let pChildRefHandlerFactory = CORA.genericFactory("pChildRefHandler",
				pChildRefHandlerFactoryDependencies);

			let pNonRepeatingChildRefHandlerFactoryDependencies = {
				"presentationFactory": self,
				"pNonRepeatingChildRefHandlerViewFactory": CORA
					.genericFactory("pNonRepeatingChildRefHandlerView", {}),
				pubSub: dependencies.pubSub,
				providers: dependencies.providers
			};

			let pNonRepeatingChildRefHandlerFactory = CORA
				.genericFactory("pNonRepeatingChildRefHandler",
					pNonRepeatingChildRefHandlerFactoryDependencies);

			let pMapViewFactoryDependencies = {
				"infoFactory": infoFactory
			};
			let pMapViewFactory = CORA.genericFactory("pMapView", pMapViewFactoryDependencies);

			let pAttributesDependencies = {
				presentationFactory: self,
				pubSub: dependencies.pubSub,
				view: CORA.pAttributesView()
			};
			let pAttributesFactory = CORA.genericFactory("pAttributes", pAttributesDependencies);
			let childDependencies = {
				"providers": dependencies.providers,
				"clientInstanceProvider": dependencies.providers.clientInstanceProvider,
				"metadataProvider": dependencies.providers.metadataProvider,
				"textProvider": dependencies.providers.textProvider,
				"recordTypeProvider": dependencies.providers.recordTypeProvider,

				"globalFactories": dependencies.globalFactories,
				"xmlHttpRequestFactory": dependencies.xmlHttpRequestFactory,
				"recordGuiFactory": dependencies.recordGuiFactory,
				"ajaxCallFactory": dependencies.ajaxCallFactory,
				"infoFactory": infoFactory,
				"presentationFactory": self,

				"pubSub": dependencies.pubSub,
				"jsBookkeeper": dependencies.jsBookkeeper,
				"uploadManager": dependencies.uploadManager,
				"authTokenHolder": dependencies.authTokenHolder,

				"pVarViewFactory": pVarViewFactory,
				"pNumVarViewFactory": pNumVarViewFactory,
				"pRecordLinkViewFactory": pRecordLinkViewFactory,
				"pMapViewFactory": pMapViewFactory,
				"pChildRefHandlerFactory": pChildRefHandlerFactory,
				"pNonRepeatingChildRefHandlerFactory": pNonRepeatingChildRefHandlerFactory,
				pAttributesFactory: pAttributesFactory
			};
			let specNew = {
				"path": path,
				"metadataIdUsedInData": metadataIdUsedInData,
				"cPresentation": cPresentation,
				"cParentPresentation": cParentPresentation
			};

			let type = cPresentation.getData().attributes.type;
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
				if (shouldBePresentedAsMap(cPresentation)) {
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
			let repeat = cPresentation.getData().attributes.repeat;
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

		let out = Object.freeze({
			"type": "presentationFactory",
			getDependencies: getDependencies,
			factor: factor
		});
		self = out;
		return out;
	};
	return cora;
}(CORA));