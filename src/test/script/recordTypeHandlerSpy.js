/*
 * Copyright 2017 Uppsala University Library
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
	coraTest.recordTypeHandlerSpy = function(dependencies, spec, spySpec) {
		var getViewCalled = 0;
		var view = CORA.gui.createSpanWithClassName("recordTypeFromRecordTypeHandlerSpy");
		
		function getView() {
			getViewCalled++;
			return view;
		}
		function getGetViewCalled() {
			return getViewCalled;
		}
		
		
		function hasCreateOrListAction(){
			if(spySpec.returnFalseForAnyAction){
				return false;
			}
			return true;
		}
		
		return Object.freeze({
			type : "recordTypeHandlerSpy",
			getView : getView,
			getGetViewCalled : getGetViewCalled,
			hasCreateOrListAction : hasCreateOrListAction
		});
	};
	return coraTest;
}(CORATEST || {}));