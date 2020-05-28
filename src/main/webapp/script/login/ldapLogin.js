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
		var view;

		function start() {
			view = createView();
			var recordGui = createRecordGui();
			var presentationView = recordGui.getPresentationHolder(spec.presentationId,
					spec.metadataId).getView();
			view.addPresentationToLoginFormHolder(presentationView);
			recordGui.initMetadataControllerStartingGui();
		}

		function createView() {
			return dependencies.ldapLoginViewFactory.factor();
		}

		function createRecordGui() {
			var recordGuiSpec = {
				"metadataId" : spec.metadataId
			};
			return dependencies.recordGuiFactory.factor(recordGuiSpec);
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}

		function getView() {
			return view.getView();
		}

		start();
		return Object.freeze({
			"type" : "ldapLogin",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
		});
	};

	return cora;
}(CORA));