/*
 * Copyright 2016, 2017, 2024 Olov McKie
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
	cora.info = function(spec) {
		let infoLevel = cora.info.NONE;
		let button;
		let view;

		const start = function() {
			button = createButton();
		};
		
		const createButton = function() {
			let infoButtonSpec = {
				className : "iconButton infoButton",
				action : {
					method : showInfo
				}
			};
			return CORA.gui.button(infoButtonSpec);
		};

		const getButton = function() {
			return button;
		};

		const getView = function() {
			return view;
		};

		const getInfoLevel = function() {
			return infoLevel;
		};

		const showInfo = function(event) {
			if (infoLevel === cora.info.NONE) {
				createAndAddBaseView();
				createLevelView(spec.level1);
			}
			if (infoLevel === cora.info.TEXT) {
				createLevelView(spec.level2);
			}
			if (infoLevel === cora.info.ALL) {
				resetInfo();
			} else {
				infoLevel++;
			}
			if (spec.afterLevelChange !== undefined) {
				spec.afterLevelChange(event);
			}
		};

		const createAndAddBaseView = function() {
			createBaseView();
			addBaseViewAccordingToSpec();
		};

		const createBaseView = function() {
			view = CORA.gui.createSpanWithClassName("infoView");
		};

		const addBaseViewAccordingToSpec = function() {
			if (spec.appendTo !== undefined) {
				spec.appendTo.appendChild(view);
			}
			if (spec.insertAfter !== undefined) {
				spec.insertAfter.parentNode.insertBefore(view, spec.insertAfter.nextSibling);
			}
			if (spec.insertBefore !== undefined) {
				spec.insertBefore.parentNode.insertBefore(view, spec.insertBefore);
			}
		};

		const createLevelView = function(levelInfos) {
			if (levelInfos !== undefined) {
				levelInfos.forEach(createViewPart);
			}
		};

		const createViewPart = function(info) {
			let viewPart = CORA.gui.createSpanWithClassName(info.className);
			viewPart.innerHTML = info.text;
			addOnClickIfSpecifiedInSpec(info.onclickMethod, viewPart);
			view.appendChild(viewPart);
		};

		const addOnClickIfSpecifiedInSpec = function(onclickMethod, viewPart) {
			if (onclickMethod !== undefined) {
				viewPart.addEventListener('click', (event) => {
					event.stopPropagation();
					onclickMethod(event);
				});
				
				viewPart.className = viewPart.className + " clickable";
			}
		};

		const resetInfo = function() {
			view.parentNode.removeChild(view);
			view = null;
			infoLevel = 0;
		};

		const getSpec = function() {
			return spec;
		};
		
		start();
		
		return Object.freeze({
			type : "info",
			getSpec : getSpec,
			getButton : getButton,
			showInfo : showInfo,
			getView : getView,
			getInfoLevel : getInfoLevel
		});
	};

	cora.info.NONE = 0;
	cora.info.TEXT = 1;
	cora.info.ALL = 2;
	return cora;
}(CORA));