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

		const setModelAndUrlForDelete = function(model, url) {
			deleteUrl = url;
			viewModel = model;
		};

		const deleteElement = function() {
			deleteRecord(viewModel);
		};

		const deleteRecord = function(currentModel) {
			if (currentModel.presentations) {
				let presentations = currentModel.presentations;
				let presentationCalls = [];
				for (let presentation of presentations) {
					presentationCalls.push("deleting")
					view.setDeletingElement(presentation.elementId);
					callDeletePresentation(presentation.recordType, presentation.id, presentation, currentModel, presentationCalls);
				}
			} else {

				view.setDeletingElement(currentModel.elementId);
				callDeleteRecord(currentModel.recordType, currentModel.id, currentModel);
			}
		};

		const callDeletePresentation = function(recordType, id, presentationModel, parentModel, presentationCalls) {
			let callSpec = {
				url: `${deleteUrl}${recordType}/${id}`,
				requestMethod: "DELETE",
				loadMethod: deletePresentationCallBack,
				errorMethod: deletePresentationFailedCallBack,
				presentationModel: presentationModel,
				parentModel: parentModel,
				presentationCalls: presentationCalls
			};
			ajaxCallFactory.factor(callSpec);
		};
		
		const deletePresentationCallBack = function(answer) {
			let presentationCalls = answer.spec.presentationCalls;
			presentationCalls.pop();

			let presentationModel = answer.spec.presentationModel;
			view.setDeletedElement(presentationModel.elementId);

			if (presentationCalls.length === 0) {
				let parentModel = answer.spec.parentModel;
				view.setDeletingElement(parentModel.elementId);
				callDeleteRecord(parentModel.recordType, parentModel.id, parentModel);
			}
		};

		const deleteRecordFailedCallBack = function(answer) {
			let currentModel = answer.spec.model;
			let errorMessage = `${answer.status} : ${answer.response}`;
			view.setDeleteFailedElement(currentModel.elementId, errorMessage);
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
		};

		const deleteRecordCallBack = function(answer) {
			let currentModel = answer.spec.model;
			view.setDeletedElement(currentModel.elementId);
			deleteAllChildren(currentModel);
		};

		const deleteAllChildren = function(currentModel) {
			deleteSubElement(currentModel.texts);
			deleteSubElement(currentModel.children);
			deleteSubElement(currentModel.attributes);
			deleteSubElement(currentModel.refCollection);
			deleteSubElement(currentModel.collectionItems);
			deleteSubElement(currentModel.childPresentations);
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

		const deletePresentationFailedCallBack = function(answer) {
			let currentModel = answer.spec.presentationModel;
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