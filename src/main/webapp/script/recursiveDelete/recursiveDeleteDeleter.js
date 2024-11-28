/*
 * Copyright 2024 Uppsala University Library
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
	cora.recursiveDeleteDeleter = function(dependencies, spec) {
		let out;
		//		let view;
		let ajaxCallFactory = dependencies.ajaxCallFactory;
		let baseRestUrl = spec.baseRestUrl;

		const start = function() {
			//			view = createElementWithTypeClassText("span", "recursiveDelete");
		};

		const startDeleting = function(viewModel) {

			console.log(JSON.stringify(viewModel));
			
			callDelete(viewModel.recordType, viewModel.id);

//			let callSpec = {
//				url: `${baseRestUrl}${viewModel.recordType}/${viewModel.id}`,
//				requestMethod: "DELETE",
//				loadMethod: continueDeletingAllChildren,
//				errorMethod: ""
//			};
//			ajaxCallFactory.factor(callSpec);
		};

		const callDelete = function(recordType, id) {
			let callSpec = {
				url: `${baseRestUrl}${recordType}/${id}`,
				requestMethod: "DELETE",
				loadMethod: continueDeletingAllChildren,
				errorMethod: ""
			};
			ajaxCallFactory.factor(callSpec);
		}

		const continueDeletingAllChildren = function() {

		};

		out = Object.freeze({
			startDeleting: startDeleting
		});
		start();

		return out;
	};
	return cora;
}(CORA));