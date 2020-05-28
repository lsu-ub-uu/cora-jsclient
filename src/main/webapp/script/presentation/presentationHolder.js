/*
 * Copyright 2016, 2020 Uppsala University Library
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
	cora.presentationHolder = function(spec) {
		let presentationId = spec.presentationId;
		let metadataProvider = spec.metadataProvider;
		let pubSub = spec.pubSub;
		let presentationFactory = spec.presentationFactory;
		let view;

		const start = function() {
			view = createBaseView();
		};
		
		const createBaseView = function() {
			let viewNew = createBaseViewHolder();
			viewNew.appendChild(createViewForTopPGroup());
			return viewNew;
		};

		const createBaseViewHolder = function() {
			return CORA.gui.createDivWithClassName("presentation " + presentationId);
		}

		const createViewForTopPGroup = function() {
			// if no read constraints eller om användaren har rättigheter
			let cPresentation = CORA.coraData(metadataProvider.getMetadataById(presentationId));
			let metadataIdUsedInData = spec.metadataIdUsedInData;
			let presentationSpec = {
				"path" : {},
				"metadataIdUsedInData" : metadataIdUsedInData,
				"cPresentation" : cPresentation
			};
			let presentation = presentationFactory.factor(presentationSpec);
			return presentation.getView();
		}

		const getPresentationId = function() {
			return presentationId;
		}

		const getPubSub = function() {
			return pubSub;
		}

		const getView = function() {
			return view;
		}

		const getSpec = function() {
			return spec;
		}

		start();
		let out = Object.freeze({
			"type" : "presentationHolder",
			getSpec : getSpec,
			getPresentationId : getPresentationId,
			getPubSub : getPubSub,
			getView : getView
		});
		return out;

	};
	return cora;
}(CORA));