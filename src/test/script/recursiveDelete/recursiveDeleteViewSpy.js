/*
 * Copyright 2024 Uppsala University Library
 * Copyright 2023 Olov McKie
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

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.recursiveDeleteViewSpy = function() {

		let basicViews = [];
		let viewModels = [];
		let createdViews = [];
		let deletingElement = [];
		let deletedElement = [];
		let deleteFailedElement = [];

		const createViewForViewModel = function(viewModel) {
			viewModels.push(viewModel);

			let createdView = CORA.gui.createDivWithClassName("fakeFromRecursiveDeleteViewSpy");
			createdViews.push(createdView);
			return createdView;
		}

		const getView = function() {
			let basicView = CORA.gui.createDivWithClassName("fakeFromRecursiveDeleteViewSpy");
			basicViews.push(basicView);
			return basicView;
		}

		const getViewForCallNo = function(no) {
			return basicViews[no];
		};

		const getViewModelForCallNo = function(no) {
			return viewModels[no];
		};

		const getCreatedViewForCallNo = function(no) {
			return createdViews[no];
		};

		function updateViewForViewModel(viewModel) {
			viewModels.push(viewModel);
		}

		const setDeletingElement = function(elementId) {
			deletingElement.push(elementId);
		}
		const setDeletedElement = function(elementId) {
			deletedElement.push(elementId);

		}
		const setDeleteFailedElement = function(elementId, errorMessage) {
			deleteFailedElement.push({ elementId, errorMessage });
		}
		const getDeletingElement = function(no) {
			return deletingElement[no];
		}
		const getDeletedElement = function(no) {
			return deletedElement[no];

		}
		const getDeleteFailedElement = function(no) {
			return deleteFailedElement[no];
		}

		return Object.freeze({
			createViewForViewModel: createViewForViewModel,
			getView: getView,
			getViewForCallNo: getViewForCallNo,
			getViewModelForCallNo: getViewModelForCallNo,
			getCreatedViewForCallNo: getCreatedViewForCallNo,
			updateViewForViewModel: updateViewForViewModel,
			setDeletingElement: setDeletingElement,
			setDeletedElement: setDeletedElement,
			setDeleteFailedElement: setDeleteFailedElement,
			getDeletingElement: getDeletingElement,
			getDeletedElement: getDeletedElement,
			getDeleteFailedElement: getDeleteFailedElement
		});
	};
	return coraTest;
}(CORATEST || {}));