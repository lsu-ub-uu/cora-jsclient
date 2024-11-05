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
	cora.definitionViewerText = function(dependencies, spec) {
		const SPACE = " ";
		let out;
		let viewText = "";
		const start = function() {
		};

		const createViewAsText = function(viewModel) {
			createTextForOneLevel({ child: viewModel }, 0);
			return viewText;
		}

		const createTextForOneLevel = function(childReference, indent) {
			for (let i = 0; i < indent; i++) {
   				viewText = viewText.concat("\t")
			}
			
			let child = childReference.child;
			addNameInDataDetails(child);
			if(child.finalValue){
				addFinalValueDetails(child);
			}
			if(child.attributes){
				addAttributeDetails(child);
			}
				addChildReferenceDetails(childReference);
			if (child.children) {
				addChildrenDetails(child, indent);
			}
		};

		let addNameInDataDetails = function (child) {
			viewText = viewText.concat(child.nameInData);
		};

		let addFinalValueDetails = function (child) {
			viewText = viewText.concat(SPACE, `{${child.finalValue}}`);
		};

		const addAttributeDetails = function(child){
			let details = [];
			child.attributes.forEach(function(mAttribute) {
				if(mAttribute.finalValue){
					details.push(` ${mAttribute.nameInData}:{${mAttribute.finalValue}}`);
				}else{
					let items = [];
					mAttribute.collectionItems.forEach(function(collectionItem){
						items.push(collectionItem.nameInData);
					});
					details.push(` ${mAttribute.nameInData}:{${items.join(", ")}}`);
				}
			});
			viewText = viewText.concat(details.join(","));
		};

		const addChildReferenceDetails = function(childReference) {
			viewText = viewText.concat(" (", `${childReference.child.type}`);

			if (childReference.repeatMin) {
				viewText = viewText.concat(", ");
				viewText = viewText.concat(`${childReference.repeatMin}-${childReference.repeatMax}`);
			}
			if (childReference.recordPartConstraint) {
				viewText = viewText.concat(", ");
				viewText = viewText.concat(`${childReference.recordPartConstraint}`);
			}
			if (childReference.collectStorageTerm) {
				viewText = viewText.concat(", ");
				viewText = viewText.concat("S");
			}
			if (childReference.collectPermissionTerm) {
				viewText = viewText.concat(", ");
				viewText = viewText.concat("P");
			}
			if (childReference.collectIndexTerms) {
				viewText = viewText.concat(", ");
				viewText = viewText.concat("I");
			}
			viewText = viewText.concat(")");
		};

		let addChildrenDetails = function (child, indent) {
			child.children.forEach(function (mChild) {
				viewText = viewText.concat("\n");
				createTextForOneLevel(mChild, indent + 1);
			});
		};

		const onlyForTestGetDependencies = function() {
			return dependencies;
		};

		const onlyForTestGetSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "definitionViewerText",
			onlyForTestGetDependencies: onlyForTestGetDependencies,
			onlyForTestGetSpec: onlyForTestGetSpec,
			createViewAsText: createViewAsText
		});
		start();
		return out;
	};
	return cora;
}(CORA));