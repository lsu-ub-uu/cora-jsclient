/*
 * Copyright 2023 Olov McKie
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

		const start = function() {
		};

		const createViewForViewModel = function(viewModel) {
//console.log(viewModel)
			let view = createElementWithTypeClassText("span", "definitionViewer");
			let header = createElementWithTypeClassText("div", "header",
				 `Definition of ${viewModel.id}!`);
			view.appendChild(header);

			let metadata = createElementWithTypeClassText("ul", "metadata");
			view.appendChild(metadata);
			let item = createViewForOneLevel({ child: viewModel });
			metadata.appendChild(item);
			
			let legend = createLegend();
			view.appendChild(legend);
			
			return view;
		};
		
		const createLegend = function(){
			let legend = createElementWithTypeClassText("div", "legend", "Legend");
				
			let storage = createElementWithTypeClassText("div", "");
			legend.append(storage);
			let s = createElementWithTypeClassText("span", "storage","S");
			storage.append(s);
			let sText = createElementWithTypeClassText("span", "","Storage");
			storage.append(sText);
			
			let permission = createElementWithTypeClassText("div", "");
			legend.append(permission);
			let p = createElementWithTypeClassText("span", "permission","P");
			permission.append(p);
			let pText = createElementWithTypeClassText("span", "","Permission");
			permission.append(pText);
			
			let index = createElementWithTypeClassText("div", "");
			legend.append(index);
			let i = createElementWithTypeClassText("span", "index","I");
			index.append(i);
			let iText = createElementWithTypeClassText("span", "","Index");
			index.append(iText);
			
//				let constraint = createElementWithTypeClassText("span", "permission","P");
//				details.append(constraint);
//				let constraint = createElementWithTypeClassText("span", "index","I");
//				details.append(constraint);
			return legend;
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
			let metadataHeader = createElementWithTypeClassText("li");

			let nameInData = createElementWithTypeClassText("span", "nameInData", child.nameInData);
			metadataHeader.append(nameInData);
			nameInData.onclick = function(event){
				child.methodOpenDefiningRecord(event, child.id);
			};

			if(child.finalValue){
				let finalValue = createElementWithTypeClassText("span", "finalValue", `(${child.finalValue})`);
				metadataHeader.append(finalValue);
			}
			
			if(child.attributes){
				const attributeDetails =createAttributeDetails(child);
				metadataHeader.append(attributeDetails);
			}

			const details = createChildReferenceDetails(childReference);
			metadataHeader.append(details);
			if (child.children) {
				let children = document.createElement("ul");
				metadataHeader.appendChild(children);
				child.children.forEach(function(mChild) {
					let nextLevel = createViewForOneLevel(mChild);
					children.appendChild(nextLevel);
				});
			}
			return metadataHeader;
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
			if (childReference.recordPartConstraint) {
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
		
		//			let texts = CORA.gui.createDivWithClassName("texts");
		//			view.appendChild(texts);
		//			let textId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("textId");
		//			let defTextId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("defTextId");
		//			texts.innerHTML = textId +":"+textProvider.getTranslation(textId)+"::"+ defTextId;

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		const onlyForTestGetSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "definitionViewerView",
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			onlyForTestGetSpec: onlyForTestGetSpec,
			createViewForViewModel: createViewForViewModel
		});
		start();

		return out;
	};
	return cora;
}(CORA));