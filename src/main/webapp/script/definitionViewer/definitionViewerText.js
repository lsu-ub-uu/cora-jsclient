/*
 * Copyright 2024
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
		const COMMA_SPACE = ", ";
		let out;
		let textView = "";
		const start = function() {};

		const createViewAsText = function(viewModel) {
			createTextForOneLevel({ child: viewModel }, 0);
			return textView;
		}

		const createTextForOneLevel = function(childReference, indent) {
			textView = textView.concat("\t".repeat(indent));
			
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
			textView = textView.concat(child.nameInData);
		};

		let addFinalValueDetails = function (child) {
			textView = textView.concat(SPACE, `{${child.finalValue}}`);
		};

		const addAttributeDetails = function(child){
			let details = [];
			child.attributes.forEach(function(mAttribute) {
				if(mAttribute.finalValue){
					details.push(SPACE + `${mAttribute.nameInData}:{${mAttribute.finalValue}}`);
				} else {
					let items = [];
					mAttribute.collectionItems.forEach(function(collectionItem){
						items.push(collectionItem.nameInData);
					});
					details.push(SPACE + `${mAttribute.nameInData}:{${items.join(COMMA_SPACE)}}`);
				}
			});
			textView = textView.concat(details.join(","));
		};

		const addChildReferenceDetails = function(childReference) {
			textView = textView.concat(SPACE, "(");
			
			textView = textView.concat(`${childReference.child.type}`);
			if (childReference.repeatMin) {
				textView = textView.concat(COMMA_SPACE, `${childReference.repeatMin}-${childReference.repeatMax}`);
			}
			if (childReference.recordPartConstraint) {
				textView = textView.concat(COMMA_SPACE, `${childReference.recordPartConstraint}`);
			}
			if (childReference.collectStorageTerm) {
				textView = textView.concat(COMMA_SPACE, "S");
			}
			if (childReference.collectPermissionTerm) {
				textView = textView.concat(COMMA_SPACE, "P");
			}
			if (childReference.collectIndexTerms) {
				textView = textView.concat(COMMA_SPACE, "I");
			}
			textView = textView.concat(")");
		};

		let addChildrenDetails = function (child, indent) {
			child.children.forEach(function (mChild) {
				textView = textView.concat("\n");
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