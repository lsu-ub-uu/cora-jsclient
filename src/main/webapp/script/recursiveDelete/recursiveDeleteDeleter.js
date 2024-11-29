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
		};

		const deleteElement = function(viewModel) {

			//todo: view.setDeletingElement(viewModel.id)
			deleteRecord(viewModel.recordType, viewModel.id, viewModel);
		};

		const deleteRecord = function(recordType, id, currentViewModel) {
			let callSpec = {
				url: `${baseRestUrl}${recordType}/${id}`,
				requestMethod: "DELETE",
				loadMethod: deleteRecordCallBack,
				errorMethod: deleteRecordFailedCallBack,
				viewModel: currentViewModel
			};
			ajaxCallFactory.factor(callSpec);
		}

		const deleteRecordCallBack = function(answer) {
			//TODO: setDeletedElement(answer.spec.viewModel.elementId)

			deleteAllChildren(answer.spec.viewModel);
		};

		const deleteAllChildren = function(currentViewModel) {
			for (let childViewModel of currentViewModel.texts) {
				deleteElement(childViewModel);
			}
			for (let childViewModel of currentViewModel.children) {
				deleteElement(childViewModel);
			}

			//TODO add loops for all Children
			//			"texts": [],
			//			"attributes": [],
			//			"refCollection": [],
			//			"collectionItems": [],
			//			"presentations": [],
			//			"children": [
			//			"guiElement");
			//			"elementText");
		};

		const deleteRecordFailedCallBack = function(answer) {
			//TODO: setDeleteFailedElement(answer.spec.viewModel.elementId, answer.textMessage)
		};

		out = Object.freeze({
			deleteElement: deleteElement,
			deleteRecordCallBack: deleteRecordCallBack,
			deleteRecordFailedCallBack: deleteRecordFailedCallBack
		});
		start();

		return out;
	};
	return cora;
}(CORA));