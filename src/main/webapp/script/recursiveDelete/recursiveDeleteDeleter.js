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
		
		const deleteElement = function() {
			deleteRecord(viewModel);
		};
		
		const deleteRecord = function(currentModel) {
			view.setDeletingElement(currentModel.elementId);
			callDeleteRecord(currentModel.recordType, currentModel.id, currentModel);
		};

		const callDeleteRecord = function(recordType, id, currentModel) {
			let callSpec = {
				url: `${deleteUrl}${recordType}/${id}`,
				requestMethod: "DELETE",
				loadMethod: deleteRecordCallBack,
				errorMethod: deleteRecordFailedCallBack,
				model: currentModel
			};
			ajaxCallFactory.factor(callSpec);
		}

		const deleteRecordCallBack = function(answer) {
			let currentModel = answer.spec.viewModel;
			view.setDeletedElement(currentModel.elementId);
			deleteAllChildren(currentModel);
		};

		const deleteAllChildren = function(currentModel) {
			deleteSubElement(currentModel.texts);
			deleteSubElement(currentModel.children);
			deleteSubElement(currentModel.attributes);
			deleteSubElement(currentModel.refCollection);
			deleteSubElement(currentModel.collectionItems);
			deleteSubElement(currentModel.presentations);
			deleteSubElement(currentModel.guiElements);
			deleteSubElement(currentModel.elementText);
		};

		const deleteSubElement = function(subElement) {
			if (subElement) {
				for (let childViewModel of subElement) {
					deleteRecord(childViewModel);
				}
			}
		};

		const deleteRecordFailedCallBack = function(answer) {
			let currentModel = answer.spec.model;
			let errorMessage = `${answer.status} : ${answer.response}`;
			view.setDeleteFailedElement(currentModel.elementId, errorMessage);
		};

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		out = Object.freeze({
			type: "recursiveDeleteDeleter",
			setModelAndUrlForDelete: setModelAndUrlForDelete,
			deleteElement: deleteElement,
			onlyForTestGetDependencies: onlyForTestGetDependencies
		});
		start();

		return out;
	};
	return cora;
}(CORA));