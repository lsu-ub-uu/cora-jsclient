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
		let view;
		const start = function() {
		};

		const createViewForViewModel = function(viewModel) {
			view = createElementWithTypeClassText("span", "recursiveDelete");
			addPartsToView(viewModel, view);
			return view;
		};
		
		const updateViewForViewModel = function(viewModel) {
			view.innerHTML = "";
			addPartsToView(viewModel, view);
			return view;
		};
		
		const addPartsToView = function(viewModel, view){
			let header = createElementWithTypeClassText("div", "header",
				 `Recursive delete of ${viewModel.id}`);
			view.appendChild(header);

			let metadata = createElementWithTypeClassText("ul", "metadata");
			view.appendChild(metadata);
			let item = createViewForOneLevel({ child: viewModel });
			metadata.appendChild(item);
			
			let legend = createLegend();
			view.appendChild(legend);
		};

		const createLegend = function(){
			let legend = createElementWithTypeClassText("div", "legend", "Legend");
			legend.append(createPresentationLegendItem());
			return legend;
		};

		let createPresentationLegendItem = function () {
			return createLegendItemUsingClassNameAndSymbolAndText("presentation", "P", "Presentation");
		};

		const createLegendItemUsingClassNameAndSymbolAndText = function (className, symbol, text) {
			let item = createElementWithTypeClassText("div", "");
			let symbolPart = createElementWithTypeClassText("span", className, symbol);
			item.append(symbolPart);
			let textPart = createElementWithTypeClassText("span", "", text);
			item.append(textPart);
			return item;
		};

		const createElementWithTypeClassText = function(type, className, textContent){
			let element = document.createElement(type);
			if(className){
				element.className = className;
			}
			if(textContent){
				element.textContent = textContent;
			}
			return element;
		};

		const createViewForOneLevel = function(childReference, attribute) {
			let child = childReference.child;
			let oneLevel = createElementWithTypeClassText("li");
			if(attribute){
				oneLevel.append(createLabelDetails(attribute));
			}
			oneLevel.append(createIdDetails(child));
			oneLevel.append(createNameInDataDetails(child));
			oneLevel.append(createTypeDetails(child));
			oneLevel.append(createDataDividerDetails(child));
			
			oneLevel.appendChild(createChildrenDetails(child));
			return oneLevel;
		};

		let createIdDetails = function (child) {
			let id = createElementWithTypeClassText("span", "id", child.id);
			id.onclick = function (event) {
				child.methodOpenDefiningRecord(event, child.id);
			};
			return id;
		};
		
		let createNameInDataDetails = function (child) {
			let nameInData = createElementWithTypeClassText("span", "nameInData", `[${child.nameInData}]`);
			nameInData.onclick = function (event) {
				child.methodOpenDefiningRecord(event, child.id);
			};
			return nameInData;
		};

		const createLabelDetails = function(label) {
			let type = createElementWithTypeClassText("span", "labelType", `${label}`);
			return type;
		};
		const createTypeDetails = function(child) {
			let type = createElementWithTypeClassText("span", "type", `${child.type}`);
			return type;
		};
		const createDataDividerDetails = function(child) {
			if (child.dataDivider === undefined){
				child.dataDivider = "-"
			}
			let dataDivider = createElementWithTypeClassText("span", "dataDivider", `(${child.dataDivider})`);
			return dataDivider;
		};

		let createChildrenDetails = function (child) {
			let children = document.createElement("ul");
			
			let text = createText(child.text);
			children.appendChild(text);
			
			let defText = createText(child.defText);
			children.appendChild(defText);
			
			if (child.attributes) {
				createAndAppendGroup(children, child.attributes, "attribute")
			}
			
			if (child.children) {
				createAndAppendGroup(children, child.children)
			}
			return children;
		};
		
		let createAndAppendGroup = function (children, child, attribute) {
			child.forEach(function (mChild) {
					let nextLevel = createViewForOneLevel(mChild, attribute);
					children.appendChild(nextLevel);
			});
		};
		
		const createText = function(text) {
			let li = createElementWithTypeClassText("li");
			li.append(createLabelDetails(text.type));
			li.append(createIdDetails(text));
			li.append(createDataDividerDetails(text));
			return li;
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
			createViewForViewModel: createViewForViewModel,
			updateViewForViewModel: updateViewForViewModel
		});
		start();

		return out;
	};
	return cora;
}(CORA));