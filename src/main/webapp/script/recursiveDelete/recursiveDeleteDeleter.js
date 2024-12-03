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
		let ajaxCallFactory = dependencies.ajaxCallFactory;
		let view = dependencies.view;
		let baseRestUrl = spec.baseRestUrl;

		const start = function() {
		};

		const deleteElement = function(viewModel) {
			view.setDeletingElement(viewModel.elementId);
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
			let viewModel = answer.spec.viewModel;
			view.setDeletedElement(viewModel.elementId);
			deleteAllChildren(viewModel);
		};

		const deleteAllChildren = function(currentViewModel) {
			deleteSubElement(currentViewModel.texts);
			deleteSubElement(currentViewModel.children);
			deleteSubElement(currentViewModel.attributes);
			deleteSubElement(currentViewModel.refCollection);
			deleteSubElement(currentViewModel.collectionItems);
			deleteSubElement(currentViewModel.presentations);
			deleteSubElement(currentViewModel.guiElements);
			deleteSubElement(currentViewModel.elementText);
		};

		const deleteSubElement = function(subElement) {
			if (subElement) {
				for (let childViewModel of subElement) {
					deleteElement(childViewModel);
				}
			}
		};

		const deleteRecordFailedCallBack = function(answer) {
			let viewModel = answer.spec.viewModel;
			let errorMessage = `${answer.status} : ${answer.response}`;
			view.setDeleteFailedElement(viewModel.elementId, errorMessage);
		};

		const onlyForTestGetDependencies = function(){
			return dependencies;	
		};
		
		const onlyForTestGetSpec = function(){
			return spec;	
		};
		
		out = Object.freeze({
			type: "recursiveDeleteDeleter",
			deleteElement: deleteElement,
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			onlyForTestGetSpec: onlyForTestGetSpec
		});
		start();

		return out;
	};
	return cora;
}(CORA));