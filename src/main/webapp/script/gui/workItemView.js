/*
 * Copyright 2016 Olov McKie
 * Copyright 2025 Uppsala University Library
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
	cora.workItemView = function(dependencies, spec) {
		let out;
		let view;
		let topBar;
		let toolHolder;

		const start = function() {
			view = CORA.createSpanWithClassName("workItem " + spec.extraClassName);
		};

		const addToolViewToToolHolder = function(toolView) {
			possiblyAddTopBarAndToolHolder();
			toolHolder.getView().appendChild(toolView);
		};

		const possiblyAddTopBarAndToolHolder = function() {
			if (firstAddedTool()) {
				addTopBarAndToolHolder();
			}
		};

		const firstAddedTool = function() {
			return topBar === undefined;
		};

		const addTopBarAndToolHolder = function() {
			topBar = createTopBarInView();
			toolHolder = createToolHolderAndAppendButtonToTopBar();
		};

		const createTopBarInView = function() {
			let topBarNew = CORA.createSpanWithClassName("topBar");
			view.prepend(topBarNew);

			return topBarNew;
		};

		const createToolHolderAndAppendButtonToTopBar = function() {
			let toolHolderNew = createToolHolderAndAppendToView();
			topBar.appendChild(toolHolderNew.getButton());
			return toolHolderNew;
		};

		const createToolHolderAndAppendToView = function() {
			return dependencies.holderFactory.factor({
				className: "tool",
				insertAfter: topBar
			});
		};

		const getView = function() {
			return view;
		};

		const removeToolViewFromToolHolder = function(toolView) {
			toolView.remove();
		};

		const addViewToView = function(viewToAdd) {
			view.appendChild(viewToAdd);
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "workItemView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			addToolViewToToolHolder: addToolViewToToolHolder,
			removeToolViewFromToolHolder: removeToolViewFromToolHolder,
			addViewToView: addViewToView
		});
		start();
		return out;
	};
	return cora;
}(CORA));