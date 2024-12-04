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

		let viewModels = [];
		let deletingElement = [];
		let deletedElement = [];
		let deleteFailedElement = [];
		let deleteMethods = [];
		let view = CORA.gui.createDivWithClassName("fakeFromRecursiveDeleteViewSpy");

		const getView = function() {
			return view;
		};
		
		const createViewForViewModel = function(viewModel) {
			viewModels.push(viewModel);
		};

		const getCreateViewForViewModel = function(no) {
			return viewModels[no];
		};

		const setDeletingElement = function(elementId) {
			deletingElement.push(elementId);
		};

		const setDeletedElement = function(elementId) {
			deletedElement.push(elementId);
		};

		const setDeleteFailedElement = function(elementId, errorMessage) {
			deleteFailedElement.push({ elementId, errorMessage });
		};

		const getDeletingElement = function(no) {
			return deletingElement[no];
		};

		const getDeletedElement = function(no) {
			return deletedElement[no];
		};

		const getDeleteFailedElement = function(no) {
			return deleteFailedElement[no];
		};

		const setDeleteMethod = function(deleteMethod) {
			deleteMethods.push(deleteMethod);
		};

		const getDeleteMethod = function(no) {
			return deleteMethods[no];
		};

		return Object.freeze({
			getView: getView,
			createViewForViewModel: createViewForViewModel,
			getCreateViewForViewModel: getCreateViewForViewModel,
			setDeletingElement: setDeletingElement,
			setDeletedElement: setDeletedElement,
			setDeleteFailedElement: setDeleteFailedElement,
			getDeletingElement: getDeletingElement,
			getDeletedElement: getDeletedElement,
			getDeleteFailedElement: getDeleteFailedElement,
			setDeleteMethod: setDeleteMethod,
			getDeleteMethod: getDeleteMethod
		});
	};
	return coraTest;
}(CORATEST || {}));