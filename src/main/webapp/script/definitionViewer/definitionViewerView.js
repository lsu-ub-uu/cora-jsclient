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

		const createViewForViewModel = function(viewModel){
			console.log(viewModel)
			let view = CORA.gui.createSpanWithClassName("definitionViewer");
			let header = CORA.gui.createDivWithClassName("header");
			view.appendChild(header);
			header.innerHTML= `Definition of ${viewModel.id}!`;
			
			let metadata = document.createElement("ul");
			metadata.className = "metadata";
			view.appendChild(metadata);
			let item = createViewForOneLevel({child:viewModel});
			metadata.appendChild(item);
			return view;
		};
		
		const createViewForOneLevel = function(childReference) {
			let metadataHeader = document.createElement("li");
			let child = childReference.child;
			metadataHeader.innerHTML= `${child.nameInData} (${createDetails(childReference)})`;
			
			if(child.children){
				let children = document.createElement("ul");
				metadataHeader.appendChild(children);
				child.children.forEach(function(mChild){
					let nextLevel = createViewForOneLevel(mChild);
					children.appendChild(nextLevel);
				});
			}
			return metadataHeader;
		};
		
		const createDetails = function(childReference){
			if(childReference.repeatMin){
				return `${childReference.child.type}, ${childReference.repeatMin}-${childReference.repeatMax}`;
			}
			return `${childReference.child.type}`;
		};
//			let nameInData = CORA.gui.createSpanWithClassName("nameInData");
//			metadataHeader.appendChild(nameInData);
//			nameInData.innerHTML= viewModel.nameInData;
//
//			let details = CORA.gui.createSpanWithClassName("details");
//			metadataHeader.appendChild(details);
//			
//			let type = CORA.gui.createSpanWithClassName("type");
//			details.appendChild(type);
//			type.innerHTML= viewModel.type;
			
//
//			let type = dataRecordGroup.attributes["type"];
//
//
//			let recordInfo = cDataRecordGroup.getFirstChildByNameInData("recordInfo");
//			let cRecordInfo = CORA.coraData(recordInfo);
//			let id = cRecordInfo.getFirstAtomicValueByNameInData("id");
//			oneDef.innerHTML = nameInData +":"+type+" (" +id+")";
//
//			if(cDataRecordGroup.containsChildWithNameInData("attributeReferences")){
//				let attributes = CORA.gui.createDivWithClassName("attributes");
//				view.appendChild(attributes);
//				let attributeReferences = cDataRecordGroup.getFirstChildByNameInData("attributeReferences");
//				for (let attributeReference of attributeReferences.children){
//					let cAttributeReference = CORA.coraData(attributeReference);
//					let attribute = CORA.gui.createDivWithClassName("attribute");
//					attributes.appendChild(attribute);
//					let attributeId = cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
//					attribute.innerHTML = attributeId;
//				}
//			}
//
//			let texts = CORA.gui.createDivWithClassName("texts");
//			view.appendChild(texts);
//			let textId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("textId");
//			let defTextId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("defTextId");
//			texts.innerHTML = textId +":"+textProvider.getTranslation(textId)+"::"+ defTextId;
//			
//			
//			let children = CORA.gui.createDivWithClassName("children");
//			view.appendChild(children);
//			let childReferences = cDataRecordGroup.getFirstChildByNameInData("childReferences");
//			for (let childReference of childReferences.children){
//				let cChildReference = CORA.coraData(childReference);
//				let child = CORA.gui.createDivWithClassName("child");
//				children.appendChild(child);
//				let ref = cChildReference.getLinkedRecordIdFromFirstChildLinkWithNameInData("ref");
//				let repeatMin = cChildReference.getFirstAtomicValueByNameInData("repeatMin");
//				let repeatMax = cChildReference.getFirstAtomicValueByNameInData("repeatMax");
//				let recordPartConstraint = "noConstraint";
//				if(cChildReference.containsChildWithNameInData("recordPartConstraint")){
//					recordPartConstraint = cChildReference.getFirstAtomicValueByNameInData("recordPartConstraint");
//				}
//				child.innerHTML = ref + " ("+repeatMin+" - "+repeatMax+") "+recordPartConstraint;
//				
//			}
		

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
			createViewForViewModel : createViewForViewModel
//			getView: getView,
//			showView: showView
		});
		start();

		return out;
	};
	return cora;
}(CORA));