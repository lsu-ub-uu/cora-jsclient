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
	cora.recursiveDeleteDeleter = function(dependencies) {
		let out;
		let ajaxCallFactory = dependencies.ajaxCallFactory;
		let view = dependencies.view;
		let deleteUrl;
		let viewModel;

		const start = function() {
		};
		
		const setModelAndUrlForDelete = function(model, url){
			deleteUrl = url;
			viewModel = model;
		};
		
		//NEW method: setModelAndUrlForDelete
		const deleteElement = function() {
			deleteRecord(viewModel);
		};
		const deleteRecord = function(currentModel) {
			view.setDeletingElement(currentModel.elementId);
			callDeleteRecord(currentModel.recordType, currentModel.id, currentModel);
		};

		const callDeleteRecord = function(recordType, id, currentViewModel) {
			let callSpec = {
				url: `${deleteUrl}${recordType}/${id}`,
				requestMethod: "DELETE",
				loadMethod: deleteRecordCallBack,
				errorMethod: deleteRecordFailedCallBack,
				viewModel: currentViewModel
			};
			ajaxCallFactory.factor(callSpec);
		}

		const deleteRecordCallBack = function(answer) {
			let currentModel = answer.spec.viewModel;
			view.setDeletedElement(currentModel.elementId);
			deleteAllChildren(currentModel);
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

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		const onlyForTestGetSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "recursiveDeleteDeleter",
			setModelAndUrlForDelete: setModelAndUrlForDelete,
			deleteElement: deleteElement,
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			onlyForTestGetSpec: onlyForTestGetSpec
		});
		start();

		return out;
	};
	return cora;
}(CORA));