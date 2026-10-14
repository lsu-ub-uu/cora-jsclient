/*
 * Copyright 2022 Uppsala University Library
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
import CORATEST from "../aCoratestNameSpace.js";

const coraTest = CORATEST;

coraTest.pAttributesViewSpy = function() {
		let view = document.createElement("span");
		let presentationAttributeView = [];
		
		const getView = function() {
			return view;
		};

		const addAttributePresentation = function(attributeView) {
			presentationAttributeView.push(attributeView);
		};
		const getAddedAttributePresentation = function(index) {
			return presentationAttributeView[index];
		};
		
		return Object.freeze({
			"type" : "pAttributesViewSpy",
			getView : getView,
			addAttributePresentation : addAttributePresentation,
			getAddedAttributePresentation : getAddedAttributePresentation
		});
	};

export default CORATEST;
