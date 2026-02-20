/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017, 2023 Olov McKie
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
	cora.pGroup = function(dependencies, spec) {
		let parent;

		const start = function() {
			let my = {
				type: "pGroup",
				metadataId: spec.metadataIdUsedInData,
				addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec
			};
			parent = dependencies.pParentMultipleChildrenFactory.factor(spec, my);
		};

		const addTypeSpecificInfoToViewSpec = function(mode, viewSpec) {
			viewSpec.type = "pGroup";
		};
		
		const getSpec = function() {
			return spec;
		};

		const getDependencies = function() {
			return dependencies;
		};

		start();

		return Object.freeze({
			type: "pGroup",
			getSpec: getSpec,
			getDependencies: getDependencies,
			getView: parent.getView,
			getPresentationCounter: parent.getPresentationCounter
		});

	};
	return cora;
}(CORA));