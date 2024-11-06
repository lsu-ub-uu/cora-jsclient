/*
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
	cora.definitionViewerView = function(dependencies, spec) {
		let out;
		let view;
		let copyToClipboardMethod;
		const start = function() {
		};

		const createViewForViewModel = function(viewModel) {
			view = createElementWithTypeClassText("span", "definitionViewer");
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
				 `Definition of ${viewModel.id}!`);
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
			legend.append(createStorageLegendItem());
			legend.append(createPermissionLegendItem());
			legend.append(createIndexLegendItem());
			legend.append(createFinalValueLegendItem());
			legend.addEventListener("click", (event) =>{
				if (event.altKey) {
					copyToClipboardMethod();
				}
			});
			return legend;
		};
		
		let createStorageLegendItem = function () {
			return createLegendItemUsingClassNameAndSymbolAndText("storage", "S", "Storage");
		};

		let createPermissionLegendItem = function () {
			return createLegendItemUsingClassNameAndSymbolAndText("permission", "P", "Permission");
		};

		let createIndexLegendItem = function () {
			return createLegendItemUsingClassNameAndSymbolAndText("index", "I", "Index");
		};

		let createFinalValueLegendItem = function () {
			return createLegendItemUsingClassNameAndSymbolAndText("finalValue", "{}", "Final value");
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

		const createViewForOneLevel = function(childReference) {
			let child = childReference.child;
			let oneLevel = createElementWithTypeClassText("li");
			oneLevel.append(createNameInDataDetails(child));
			if(child.finalValue){
				oneLevel.append(createFinalValueDetails(child));
			}
			if(child.attributes){
				oneLevel.append(createAttributeDetails(child));
			}
			oneLevel.append(createChildReferenceDetails(childReference));
			if (child.children) {
				oneLevel.appendChild(createChildrenDetails(child));
			}
			return oneLevel;
		};

		let createNameInDataDetails = function (child) {
			let nameInData = createElementWithTypeClassText("span", "nameInData", child.nameInData);
			nameInData.onclick = function (event) {
				child.methodOpenDefiningRecord(event, child.id);
			};
			return nameInData;
		};

		let createFinalValueDetails = function (child) {
			return createElementWithTypeClassText("span", "finalValue", `{${child.finalValue}}`);
		};

		const createAttributeDetails = function(child){
			let details = [];
			child.attributes.forEach(function(mAttribute) {
				if(mAttribute.finalValue){
					details.push(`${mAttribute.nameInData}:{${mAttribute.finalValue}}`);
				}else{
					let items = [];
					mAttribute.collectionItems.forEach(function(collectionItem){
						items.push(collectionItem.nameInData);
					});
					details.push(`${mAttribute.nameInData}:{${items.join(", ")}}`);
				}
			});
			return createElementWithTypeClassText("span", "attributes", details.join(", "));
		};

		const createChildReferenceDetails = function(childReference) {
			let details = createElementWithTypeClassText("span", "details");
			let type = createElementWithTypeClassText("span", "type", `${childReference.child.type}`);
			details.append("(", type);

			if (childReference.repeatMin) {
				details.append(", ");
				let cardinality = createElementWithTypeClassText("span", "cardinality",
					`${childReference.repeatMin}-${childReference.repeatMax}`);
				details.append(cardinality);
			}
			if (childReference.recordPartConstraint) {spec
				details.append(", ");
				let constraint = createElementWithTypeClassText("span", "constraint",
					`${childReference.recordPartConstraint}`);
				details.append(constraint);
			}
			if (childReference.collectStorageTerm) {
				details.append(", ");
				let constraint = createElementWithTypeClassText("span", "storage","S");
				details.append(constraint);
			}
			if (childReference.collectPermissionTerm) {
				details.append(", ");
				let constraint = createElementWithTypeClassText("span", "permission","P");
				details.append(constraint);
			}
			if (childReference.collectIndexTerms) {
				details.append(", ");
				let constraint = createElementWithTypeClassText("span", "index","I");
				details.append(constraint);
			}
			details.append(")");
			return details;
		};

		let createChildrenDetails = function (child) {
			let children = document.createElement("ul");
			child.children.forEach(function (mChild) {
				let nextLevel = createViewForOneLevel(mChild);
				children.appendChild(nextLevel);
			});
			return children;
		};

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		const onlyForTestGetSpec = function() {
			return spec;
		};
		
		const setTextCopierMethod = function(copyToClipboard){
			copyToClipboardMethod = copyToClipboard;
		};

		out = Object.freeze({
			type: "definitionViewerView",
			createViewForViewModel: createViewForViewModel,
			updateViewForViewModel: updateViewForViewModel,
			setTextCopierMethod: setTextCopierMethod,
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			onlyForTestGetSpec: onlyForTestGetSpec
		});
		start();

		return out;
	};
	return cora;
}(CORA));