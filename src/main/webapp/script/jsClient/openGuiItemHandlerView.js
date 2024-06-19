/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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
	cora.openGuiItemHandlerView = function(dependencies, spec) {
		let out;
		let view;
		let header;
		let childrenView;

		const start = function() {
			view = CORA.gui.createSpanWithClassName("openGuiItemHandlerView");

			header = createHeader();
			view.appendChild(header);

			childrenView = CORA.gui.createSpanWithClassName("childrenView");
			view.appendChild(childrenView);
		};

		const createHeader = function() {
			let headerNew = CORA.gui.createSpanWithClassName("header");
			headerNew.onclick = spec.openSearchMethod;
			headerNew.textContent = spec.headerText;
			return headerNew;
		};

		const getView = function() {
			return view;
		};

		const addManagedGuiItem = function(menuView) {
			childrenView.appendChild(menuView);
			view.scrollIntoView();
		};

		const removeManagedGuiItem = function(menuView) {
			if(childrenView.contains(menuView)){
				childrenView.removeChild(menuView);
			}
		};
		
		const moveMenuViewUp = function(menuView){
			if(menuView.previousSibling){
				childrenView.insertBefore(menuView, menuView.previousSibling);
			}
		};
		
		const moveMenuViewDown = function(menuView){
			if(menuView.nextSibling){
				childrenView.insertBefore(menuView, menuView.nextSibling.nextSibling);
			}
		};
		
		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type : "openGuiItemHandlerView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addManagedGuiItem : addManagedGuiItem,
			removeManagedGuiItem : removeManagedGuiItem,
			moveMenuViewUp : moveMenuViewUp,
			moveMenuViewDown : moveMenuViewDown
		});
		start();
		return out;
	};
	return cora;
}(CORA));