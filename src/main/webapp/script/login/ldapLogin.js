/*
 * Copyright 2019 Uppsala University Library
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
	cora.ldapLogin = function(dependencies, spec) {
		let view;

		const start = function() {
			view = createView();
			let recordGui = createRecordGui();
			let presentationView = recordGui.getPresentationHolder(spec.presentationId,
					spec.metadataId).getView();
			view.addPresentationToLoginFormHolder(presentationView);
			recordGui.initMetadataControllerStartingGui();
		};

		const createView = function() {
			return dependencies.ldapLoginViewFactory.factor();
		};

		const createRecordGui = function() {
			let recordGuiSpec = {
				metadataId : spec.metadataId
			};
			return dependencies.recordGuiFactory.factor(recordGuiSpec);
		};

		const getDependencies = function() {
			return dependencies;
		}
		const getSpec = function() {
			return spec;
		};

		const getView = function() {
			return view.getView();
		};

		start();
		return Object.freeze({
			type : "ldapLogin",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
		});
	};

	return cora;
}(CORA));