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
var CORA = (function(cora) {
	"use strict";
	cora.pAttributesView = function() {
		let out;
		let view;

		const start = function() {
			view = CORA.gui.createSpanWithClassName("attributes");
		};

		const getView = function() {
			return view;
		};

		const addAttributePresentation = function(attributePresentation) {
			let attributeContainer = CORA.gui.createSpanWithClassName("attribute");
			view.appendChild(attributeContainer);

			let attributeNameContainer = CORA.gui.createSpanWithClassName("attributeName");
			attributeContainer.appendChild(attributeNameContainer);

			attributeNameContainer.appendChild(document.createTextNode(attributePresentation.text));

			attributeContainer.appendChild(attributePresentation.view);
		};

		out = Object.freeze({
			type: "pAttributesView",
			getView: getView,
			addAttributePresentation: addAttributePresentation
		});
		start();
		return out;
	};
	return cora;
}(CORA));