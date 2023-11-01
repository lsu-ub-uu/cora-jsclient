/*
 * Copyright 2016, 2018, 2023 Olov McKie
 * Copyright 2019, 2020 Uppsala University Library
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
	cora.pParentMultipleChildrenView = function(dependencies, spec, child) {
		const infoFactory = dependencies.infoFactory;
		let out;
		let view;
		let baseClassName;
		let info;
		let state = "ok";

		const start = function() {
			baseClassName = spec.className;
			view = CORA.gui.createDivWithClassName(baseClassName);
			info = createInfo();
			view.appendChild(info.getButton());
			possiblyAddHeadlineTextToView();
		};
		
		const possiblyAddHeadlineTextToView = function() {
			if(spec.headline){
				addHeadline();
			}
		};
		
		const addHeadline = function(){
			let headline = CORA.gui.createSpanWithClassName("headline");
			view.appendChild(headline);
			headline.appendChild(document.createTextNode(spec.headline));
		};
		
		const createInfo = function() {
			let infoSpec = {
				// "insertAfter" is set to infoButton below
				afterLevelChange: updateClassName,
				level1: [{
					className: "textView",
					text: spec.info.text
				}, {
					className: "defTextView",
					text: spec.info.defText
				}]
			};
			possiblyAddLevel2Info(infoSpec);
			let newInfo = infoFactory.factor(infoSpec);
			infoSpec.insertAfter = newInfo.getButton();
			return newInfo;
		};

		const possiblyAddLevel2Info = function(infoSpec) {
			if (specInfoHasTechnicalInfo()) {
				addLevelTechnicalInfoAsLevel2(infoSpec);
			}
		};

		const specInfoHasTechnicalInfo = function() {
			return spec.info.technicalInfo;
		};

		const addLevelTechnicalInfoAsLevel2 = function(infoSpec) {
			infoSpec.level2 = [];
			spec.info.technicalInfo.forEach(function(techInfo) {
				infoSpec.level2.push(createTechInfoPart(techInfo));
			});
		};

		const createTechInfoPart = function(techInfo) {
			let techInfoPart = {
				className: "technicalView",
				text: techInfo.text
			};

			if (techInfo.onclickMethod !== undefined) {
				techInfoPart.onclickMethod = techInfo.onclickMethod;
			}
			return techInfoPart;
		};

		const updateClassName = function() {
			let className = baseClassName;
			if (stateIndicatesError()) {
				className += " error";
			}
			if (stateIndicatesErrorStillFocused()) {
				className += " errorStillFocused";
			}
			if (infoIsShown()) {
				className += " infoActive";
			}
			view.className = className;
		};

		const stateIndicatesError = function() {
			return state === "error";
		};

		const stateIndicatesErrorStillFocused = function() {
			return state === "errorStillFocused";
		};

		const infoIsShown = function() {
			return info.getInfoLevel() !== 0;
		};

		const getView = function() {
			return view;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const setState = function(stateIn) {
			state = stateIn;
			updateClassName();
		};

		const addAttributesView = function(attributesView) {
			if(spec.headline){
				view.childNodes[1].after(attributesView);
			}else{
				view.childNodes[0].after(attributesView);
			}
		};
		
		const hide = function(element) {
			view.styleOriginal = view.style.display;
			view.style.display = "none";
		};

		const show = function(element) {
			if (view.styleOriginal !== undefined) {
				view.style.display = view.styleOriginal;
			} else {
				view.style.display = "";
			}
		};

		const appendChild = function(child) {
			view.appendChild(child);
		};
		
		out = Object.freeze({
			type: "pParentMultipleChildrenView",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			updateClassName: updateClassName,
			setState: setState,
			addAttributesView: addAttributesView,
			appendChild: appendChild,
			hide: hide,
			show: show
		});
		start();
		return out;
	};
	return cora;
}(CORA));