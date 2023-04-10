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
	cora.definitionViewer = function(providers, dependencies, spec) {
		let out;

		const start = function() {
//			let metadataProvider = providers.metadataProvider;
		};
		
		const getView = function(){
//			let metadataProvider = providers.metadataProvider;
//			let dataRecordGroup = metadataProvider.getMetadataById("validationTypeGroup");
			let dataRecordGroup = metadataProvider.getMetadataById("metadataGroupGroup");
			let cDataRecordGroup = CORA.coraData(dataRecordGroup); 
			
			let view = CORA.gui.createSpanWithClassName("definitionViewer");
			let header = CORA.gui.createDivWithClassName("header");
			view.appendChild(header);
			header.innerHTML= "definition viewer!!!";
			
			let oneDef = CORA.gui.createDivWithClassName("stuff");
			view.appendChild(oneDef);

			let type = dataRecordGroup.attributes["type"];

			let nameInData = cDataRecordGroup.getFirstAtomicValueByNameInData("nameInData");

			let recordInfo = cDataRecordGroup.getFirstChildByNameInData("recordInfo");
			let cRecordInfo = CORA.coraData(recordInfo);
			let id = cRecordInfo.getFirstAtomicValueByNameInData("id");
			oneDef.innerHTML = nameInData +":"+type+" (" +id+")";

			if(cDataRecordGroup.containsChildWithNameInData("attributeReferences")){
				let attributes = CORA.gui.createDivWithClassName("attributes");
				view.appendChild(attributes);
				let attributeReferences = cDataRecordGroup.getFirstChildByNameInData("attributeReferences");
				for (let attributeReference of attributeReferences.children){
					let cAttributeReference = CORA.coraData(attributeReference);
					let attribute = CORA.gui.createDivWithClassName("attribute");
					attributes.appendChild(attribute);
					let attributeId = cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
					attribute.innerHTML = attributeId;
				}
			}

			let texts = CORA.gui.createDivWithClassName("texts");
			view.appendChild(texts);
			let textId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("textId");
			let defTextId = cDataRecordGroup.getLinkedRecordIdFromFirstChildLinkWithNameInData("defTextId");
			texts.innerHTML = textId +":"+textProvider.getTranslation(textId)+"::"+ defTextId;
			
			
			let children = CORA.gui.createDivWithClassName("children");
			view.appendChild(children);
			let childReferences = cDataRecordGroup.getFirstChildByNameInData("childReferences");
			for (let childReference of childReferences.children){
				let cChildReference = CORA.coraData(childReference);
				let child = CORA.gui.createDivWithClassName("child");
				children.appendChild(child);
				let ref = cChildReference.getLinkedRecordIdFromFirstChildLinkWithNameInData("ref");
				let repeatMin = cChildReference.getFirstAtomicValueByNameInData("repeatMin");
				let repeatMax = cChildReference.getFirstAtomicValueByNameInData("repeatMax");
				let recordPartConstraint = "noConstraint";
				if(cChildReference.containsChildWithNameInData("recordPartConstraint")){
					recordPartConstraint = cChildReference.getFirstAtomicValueByNameInData("recordPartConstraint");
				}
				child.innerHTML = ref + " ("+repeatMin+" - "+repeatMax+") "+recordPartConstraint;
				
			}
			
//			let raw = CORA.gui.createDivWithClassName("stuff");
//			view.appendChild(raw);
//			raw.innerHTML = JSON.stringify(dataRecordGroup);

						
						
			return view;
		};
		
		const onlyForTestGetProviders = function() {
			return providers;
		};

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		const onlyForTestGetSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "definitionViewer",
			onlyForTestGetProviders: onlyForTestGetProviders,
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			onlyForTestGetSpec: onlyForTestGetSpec,
			getView: getView,
//			showView: showView
		});
		start();

		return out;
	};
	return cora;
}(CORA));