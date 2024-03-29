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
	cora.presentationHolder = function(dependencies, spec) {
		let presentationId = spec.presentationId;
		let metadataProvider = dependencies.metadataProvider;
		let pubSub = dependencies.pubSub;
		let presentationFactory = dependencies.presentationFactory;
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
		};

		const createViewForTopPGroup = function() {
			let cPresentation = CORA.coraData(metadataProvider.getMetadataById(presentationId));
			let metadataIdUsedInData = spec.metadataIdUsedInData;
			let presentationSpec = {
				"path" : [],
				"metadataIdUsedInData" : metadataIdUsedInData,
				"cPresentation" : cPresentation,
				recordPartPermissionCalculator : spec.recordPartPermissionCalculator
			};

			let presentation = presentationFactory.factor(presentationSpec);
			return presentation.getView();
		};

		const getPresentationId = function() {
			return presentationId;
		};

		const getPubSub = function() {
			return pubSub;
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

		start();
		return Object.freeze({
			"type" : "presentationHolder",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getPresentationId : getPresentationId,
			getPubSub : getPubSub,
			getView : getView
		});

	};
	return cora;
}(CORA));