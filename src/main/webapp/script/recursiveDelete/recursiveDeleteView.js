/*
 * Copyright 2024 Uppsala University Library
 * Copyright 2023, 2024 Olov McKie
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
	cora.recursiveDeleteView = function(dependencies, spec) {
		let out;
		let elements = [];
		let view;


		const start = function() {
			view = createElementWithTypeClassText("span", "recursiveDelete");
		};

		const getView = function() {
			return view;
		};

		const createViewForViewModel = function(viewModel) {
			//			console.log("viewModel",JSON.stringify(viewModel));
			addPartsToView(viewModel, view);
			return view;
		};

		const updateViewForViewModel = function(viewModel) {
			view.innerHTML = "";
			addPartsToView(viewModel, view);
			return view;
		};

		const addPartsToView = function(viewModel, view) {
			let header = createHeader(viewModel.id);
			view.appendChild(header);

			let metadataHolder = createElementWithTypeClassText("ul", "metadata");
			view.appendChild(metadataHolder);

			let metadataItems = createViewForOneLevel(viewModel);
			metadataHolder.appendChild(metadataItems);

			let legend = createLegend();
			view.appendChild(legend);

			let confirmationMessage = createConfirmationMessage();
			view.appendChild(confirmationMessage);
		};

		const createHeader = function(id) {
			let headerText = `Recursive delete of ${id}`;
			return createElementWithTypeClassText("div", "header", headerText);
		}
		const createLegend = function() {
			let legend = createElementWithTypeClassText("div", "legend", "Legend");
			legend.append(createPresentationLegendItem());
			return legend;
		};

		const createConfirmationMessage = function() {
			let confirmationMessage = createElementWithTypeClassText("div", "confirmationMessage", "Attention");
			//			legend.append(createPresentationLegendItem());
			return confirmationMessage;
		};

		let createPresentationLegendItem = function() {
			return createLegendItemUsingClassNameAndSymbolAndText("presentation", "P", "Presentation");
		};

		const createLegendItemUsingClassNameAndSymbolAndText = function(className, symbol, text) {
			let item = createElementWithTypeClassText("div", "");
			let symbolPart = createElementWithTypeClassText("span", className, symbol);
			item.append(symbolPart);
			let textPart = createElementWithTypeClassText("span", "", text);
			item.append(textPart);
			return item;
		};

		const createElementWithTypeClassText = function(type, className, textContent) {
			let element = document.createElement(type);
			if (className) {
				element.className = className;
			}
			if (textContent) {
				element.textContent = textContent;
			}
			return element;
		};

		const createViewForOneLevel = function(data, label) {
			let li = createElementWithTypeClassText("li");
			let element = createElement(data, label);
			li.append(element);
			li.appendChild(createChildren(data));
			return li;
		};

		const createElement = function(data, label) {
			let element = createSpanForElementContainer(data.elementId, "toBeDeleted");
			if (label) {
				element.append(createLabel(label));
			}
			element.append(createId(data));
			if (data.nameInData) {
				element.append(createNameInData(data));
			}
			if (data.type) {
				element.append(createType(data));
			}
			element.append(createDataDivider(data));
			return element;
		};

		const createSpanForElementContainer = function(elementId, className) {
			let element = document.createElement("span");
			element.id = elementId;
			elements[elementId] = element;
			if (className) {
				element.className = className;
			}
			return element;
		};

		const createLabel = function(label) {
			return createElementWithTypeClassText("span", "labelType", label);
		};

		let createId = function(child) {
			let id = createElementWithTypeClassText("span", "id", child.id);
			id.onclick = function(event) {
				child.methodOpenDefiningRecord(event, child.id);
			};
			return id;
		};

		let createNameInData = function(child) {
			let nameInData = createElementWithTypeClassText("span", "nameInData", `[${child.nameInData}]`);
			nameInData.onclick = function(event) {
				child.methodOpenDefiningRecord(event, child.id);
			};
			return nameInData;
		};

		const createType = function(child) {
			return createElementWithTypeClassText("span", "type", child.type);
		};

		const createDataDivider = function(child) {
			let dataDivider = replaceIfUndefined(child.dataDivider);
			return createElementWithTypeClassText("span", "dataDivider", `(${dataDivider})`);
		};

		const replaceIfUndefined = function(value) {
			if (value === undefined) {
				return "-";
			}
			return value;
		};

		let createChildren = function(child) {
			//TODO: change to ensure create ul
			let ul = document.createElement("ul");
			//			let children;	

			if (child.texts) {
				createAndAppendGroup(ul, child.texts, "text");
			}
			if (child.attributes) {
				createAndAppendGroup(ul, child.attributes, "attribute");
			}
			if (child.refCollection) {
				createAndAppendGroup(ul, child.refCollection, "refCollection");
			}
			if (child.collectionItems) {
				createAndAppendGroup(ul, child.collectionItems, "collectionItems");
			}
			if (child.presentations) {
				createAndAppendGroup(ul, child.presentations, "presentation");
			}
			if (child.guiElements) {
				createAndAppendGroup(ul, child.guiElements, "guiElement");
			}
			if (child.elementText) {
				createAndAppendGroup(ul, child.elementText, "elementText");
			}
			if (child.children) {
				createAndAppendGroup(ul, child.children);
			}
			return ul;
		};

		const createAndAppendGroup = function(ul, listOfChilds, label) {
			listOfChilds.forEach(function(mChild) {
				let nextLevel = createViewForOneLevel(mChild, label);
				ul.appendChild(nextLevel);
			});
		};

		const setDeletingElement = function(id) {
			let element = elements[id];
			element.className = 'deleting';
		};

		const setDeletedElement = function(id) {
			let element = elements[id];
			element.className = 'deleted';
		};

		const setDeleteFailedElement = function(failed) {
			let element = elements[failed.elementId];
			element.className = 'failed';
			let errorElement = createElementWithTypeClassText("span", "errorMessage", failed.errorMessage);
			element.appendChild(errorElement);
		};

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		const onlyForTestGetSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "recursiveDeleteView",
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			onlyForTestGetSpec: onlyForTestGetSpec,
			getView: getView,
			createViewForViewModel: createViewForViewModel,
			updateViewForViewModel: updateViewForViewModel,
			setDeletingElement: setDeletingElement,
			setDeletedElement: setDeletedElement,
			setDeleteFailedElement: setDeleteFailedElement
		});
		start();

		return out;
	};
	return cora;
}(CORA));