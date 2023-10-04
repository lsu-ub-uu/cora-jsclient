/*
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.pVarViewSpy = function(dependencies, spec) {
		let addedViews = [];
		let addedToolViews = [];
		let showDataF = null;
		let view = document.createElement("span");
		let state;
		let value;
		let disabledCalled = false;
		let presentationAttributeView = [];
		let hideCalled = 0;
		let showCalled = 0;

		const getView = function() {
			return view;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const setValue = function(valueIn) {
			value = valueIn;
		};

		const getValue = function() {
			return value;
		};
		const setState = function(stateIn) {
			state = stateIn;
		};
		const getState = function() {
			return state;
		};
		const callOnblurWithValue = function(valueToSet) {
			spec.onblurFunction(valueToSet);
		};
		const callOnkeyupWithValue = function(valueToSet) {
			spec.onkeyupFunction(valueToSet);
		};
		const disable = function() {
			disabledCalled = true;
		};
		const getDisabledCalled = function() {
			return disabledCalled;
		};
		const addAttributePresentation = function(attributeView) {
			presentationAttributeView.push(attributeView);
		};
		const getAttributePresentation = function(index) {
			return presentationAttributeView[index];
		};

		const addAttributesView = function(attributesView) {
		};
		
		const hide = function(){
			hideCalled++;
		};
		const getHideCalled = function(){
			return hideCalled;
		};
		const show = function(){
			showCalled++;
		};
		const getShowCalled = function(){
			return showCalled
		};

		return Object.freeze({
			"type": "pVarViewSpy",
			getDependencies: getDependencies,
			getView: getView,
			getSpec: getSpec,
			setValue: setValue,
			getValue: getValue,
			setState: setState,
			getState: getState,
			callOnblurWithValue: callOnblurWithValue,
			callOnkeyupWithValue: callOnkeyupWithValue,
			disable: disable,
			getDisabledCalled: getDisabledCalled,
			addAttributePresentation: addAttributePresentation,
			getAttributePresentation: getAttributePresentation,
			addAttributesView: addAttributesView,
			hide: hide,
			getHideCalled: getHideCalled,
			show: show,
			getShowCalled: getShowCalled
			
		});
	};
	return coraTest;
}(CORATEST || {}));
