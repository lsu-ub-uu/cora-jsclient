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
			console.log(viewModel);
			let header = createHeader(viewModel.id);
			view.appendChild(header);

			let metadataHolder = createElementWithTypeClassText("ul", "metadata");
			view.appendChild(metadataHolder);
			
			let metadataItems = createViewForOneLevel(viewModel);
			metadataHolder.appendChild(metadataItems);
			
			let legend = createLegend();
			view.appendChild(legend);
		};

		const createHeader = function(id){
			let headerText = `Recursive delete of ${id}`;
			return createElementWithTypeClassText("div", "header", headerText);
		}
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

		const createViewForOneLevel = function(data, label) {
			let oneLevel = createElementWithTypeClassText("li");
			if(label){
				oneLevel.append(createLabel(label));
			}
			oneLevel.append(createId(data));
			oneLevel.append(createNameInData(data));
			oneLevel.append(createType(data));
			oneLevel.append(createDataDivider(data));
			oneLevel.appendChild(createChildren(data));
			return oneLevel;
		};

		const createLabel = function(label) {
			return createElementWithTypeClassText("span", "labelType", `${label}`);
		};

		let createId = function (child) {
			let id = createElementWithTypeClassText("span", "id", child.id);
			id.onclick = function (event) {
				child.methodOpenDefiningRecord(event, child.id);
			};
			return id;
		};
		
		let createNameInData = function (child) {
			let nameInData = createElementWithTypeClassText("span", "nameInData", `[${child.nameInData}]`);
			nameInData.onclick = function (event) {
				child.methodOpenDefiningRecord(event, child.id);
			};
			return nameInData;
		};

		const createType = function(child) {
			return createElementWithTypeClassText("span", "type", `${child.type}`);
		};
		
		const createDataDivider = function(child) {
			let dataDivider = replaceIfUndefined(child.dataDivider);
			return createElementWithTypeClassText("span", "dataDivider", `(${dataDivider})`);
		};
		
		const replaceIfUndefined = function(value) {
			if (value === undefined){
				return "-";
			}
			return value;
		};
		
		let createChildren = function (child) {
			let ul = document.createElement("ul");
			//Start spike
			if (child.texts) {
				createAndAppendGroup(ul, child.texts, "text");
			}
			//End spike
			if(child.text){
				ul.appendChild(createText(child.text));
			}
			if(child.defText){
			 	ul.appendChild(createText(child.defText));
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
			//Start spike
			console.log(child.presentations);
			if (child.presentations) {
				createAndAppendGroup(ul, child.presentations, "presentations");
			}
			//End spike
			if (child.children) {
				createAndAppendGroup(ul, child.children);
			}
			return ul;
		};
		
		const createText = function(text) {
			let li = createElementWithTypeClassText("li");
			li.append(createLabel(text.type));
			li.append(createId(text));
			li.append(createDataDivider(text));
			return li;
		};
		
		let createAndAppendGroup = function (ul, listOfChilds, label) {
			listOfChilds.forEach(function (mChild) {
				let nextLevel = createViewForOneLevel(mChild, label);
				ul.appendChild(nextLevel);
			});
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