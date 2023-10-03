/*
 * Copyright 2018, 2020 Uppsala University Library
 * Copyright 2016, 2018, 2023 Olov McKie
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
	cora.pNumVarView = function(dependencies, spec) {
		const pParentVarViewFactory = dependencies.pParentVarViewFactory;
		let pParentVarView;

		const start = function() {
			pParentVarView = pParentVarViewFactory.factor(spec, self);
		};
		
		const createInputElementWithSetValueFunction = function() {
			let inputNew = document.createElement("input");
			inputNew.setValue = function(value) {
				inputNew.value = value;
			};
			return inputNew;
		};

		const useStandardOutput = function() {
			return true;
		};
		
		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};
		
		const self = {
			createInputElementWithSetValueFunction: createInputElementWithSetValueFunction,
			useStandardOutput: useStandardOutput,
		};
		
		start();
		return Object.freeze({
			type: "pNumVarView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: pParentVarView.getView,
			setValue: pParentVarView.setValue,
			updateClassName: pParentVarView.updateClassName,
			setState: pParentVarView.setState,
			disable: pParentVarView.disable,
			addAttributesView: pParentVarView.addAttributesView,
			hide: pParentVarView.hide,
			show: pParentVarView.show
		});
	};
	return cora;
}(CORA));