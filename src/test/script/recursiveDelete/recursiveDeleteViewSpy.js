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

		var viewModels = [];
		var createdViews = [];

		function createViewForViewModel(viewModel) {
			viewModels.push(viewModel);
			
			let createdView = CORA.gui.createDivWithClassName("fakeFromRecursiveDeleteViewSpy");
			createdViews.push(createdView);
			return createdView;
		}
		
		const getViewModelForCallNo = function(no){
			return viewModels[no];
		};
		
		const getCreatedViewForCallNo = function(no){
			return createdViews[no];
		};
		
		function updateViewForViewModel(viewModel) {
			viewModels.push(viewModel);
		}
		
		return Object.freeze({
			createViewForViewModel : createViewForViewModel,
			getViewModelForCallNo : getViewModelForCallNo,
			getCreatedViewForCallNo : getCreatedViewForCallNo,
			updateViewForViewModel: updateViewForViewModel
		});
	};
	return coraTest;
}(CORATEST || {}));