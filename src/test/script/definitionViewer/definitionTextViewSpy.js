/*
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
	coraTest.definitionTextViewSpy = function() {

		let viewModels = [];
		let createdViews = [];
		let textCopierMethods = [];

		function createViewForViewModel(viewModel) {
			viewModels.push(viewModel);
			
			let createdView = CORA.gui.createDivWithClassName("fakeFromdefinitionTextViewSpy");
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
		
		const setTextCopierMethod = function(method){
			textCopierMethods.push(method);
		};
		
		const getTextCopierMethods = function(method){
			return textCopierMethods;
		};

		const createViewAsText = function(){
			return "text from definitionTextViewSpy";
		};
		
		return Object.freeze({
			createViewForViewModel : createViewForViewModel,
			getViewModelForCallNo : getViewModelForCallNo,
			getCreatedViewForCallNo : getCreatedViewForCallNo,
			updateViewForViewModel : updateViewForViewModel,
			setTextCopierMethod : setTextCopierMethod,
			getTextCopierMethods : getTextCopierMethods,
			createViewAsText: createViewAsText
		});
	};
	return coraTest;
}(CORATEST || {}));