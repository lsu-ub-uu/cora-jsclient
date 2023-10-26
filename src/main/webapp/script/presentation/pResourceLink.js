/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2017 Olov McKie
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
	cora.pResourceLink = function(dependencies, spec) {
		let cPresentation = spec.cPresentation;

		let parent;
		let hasOutputFormat;
		let resourceView;

		const start = function() {
			initParent();
			hasOutputFormat = presentationHasOutputFormat();
			createResourceViewIfOutputFormatInMetadata();
			subscribeToLinkedResourceMessage();
		};

		const initParent = function() {
			let my = {};
			my.metadataId = "metadataGroupForResourceLinkGroup";
				
			my.cPresentation = cPresentation;
			my.cParentPresentation = cPresentation;
			my.createBaseViewHolder = createBaseViewHolder;
			my.addTypeSpecificInfoToViewSpec = addTypeSpecificInfoToViewSpec;

//			parent = CORA.pParentMultipleChildren(dependencies, spec, my);
//			parent.init();
			parent = dependencies.pParentMultipleChildrenFactory.factor(spec, my);
		};

		const createBaseViewHolder = function(presentationIdIn) {
//			let presentationId = parent.getPresentationId();
			let presentationId = presentationIdIn; 
			return CORA.gui.createDivWithClassName("pResourceLink " + presentationId);
		};

		const addTypeSpecificInfoToViewSpec = function(mode, pVarViewSpec) {
			//TODO: test when factory for parent added
			pVarViewSpec.type = "pResourceLink";
//			pVarViewSpec.inputType = getValueFromPresentationOrDefaultTo("inputType", "input");
//			pVarViewSpec.inputFormat = getValueFromPresentationOrDefaultTo("inputFormat", "text");
//			pVarViewSpec.outputFormat = getValueFromPresentationOrDefaultTo("outputFormat", "text");
//			
//			pVarViewSpec.info.technicalInfo.push({text: `regEx: ${regEx}`});
		};

		const presentationHasOutputFormat = function() {
			return cPresentation.containsChildWithNameInData("outputFormat");
		};

		const createResourceViewIfOutputFormatInMetadata = function() {
			if (hasOutputFormat) {
				createResourceViewFromOutputFormat();
			}
		};

		const createResourceViewFromOutputFormat = function() {
			let outputFormatType = cPresentation.getFirstAtomicValueByNameInData("outputFormat");
			if (outputFormatType === "image") {
				createImage();
			} else {
				createDownload();
			}
			setCommonAttributesOnResourceView();
		};

		const createImage = function() {
			resourceView = document.createElement("img");
		};

		const createDownload = function() {
			resourceView = document.createElement("a");
			resourceView.appendChild(document.createTextNode(dependencies.textProvider
				.getTranslation("resourceLinkDownloadText")));
			resourceView.target = "_blank";
		};

		const setCommonAttributesOnResourceView = function() {
			resourceView.className = "master";
			parent.getView().appendChild(resourceView);
		};

		const setInfoInLinkedResourceView = function(dataFromMsg) {
			if (hasOutputFormat) {
				let url = dataFromMsg.data.actionLinks.read.url;
				resourceView.href = url + "?" + getTokenRequestParameter();
				resourceView.src = url + "?" + getTokenRequestParameter();
			}
		};

		const getTokenRequestParameter = function() {
			let tokenRequestParamenter = "authToken=";
			tokenRequestParamenter += dependencies.authTokenHolder.getCurrentAuthToken();
			return tokenRequestParamenter;
		};

		const subscribeToLinkedResourceMessage = function() {
			const resourceLinkPath = addResourceLinkResLinkToMasterGroupPath();
			dependencies.pubSub.subscribe("linkedResource", resourceLinkPath, undefined, handleMsg);
		};
		
		const addResourceLinkResLinkToMasterGroupPath = function (){
			return spec.path.concat(["resourceLinkResLink"]);
		}

		const handleMsg = function(dataFromMsg) {
			setInfoInLinkedResourceView(dataFromMsg);
		};

		const getView = function() {
			return parent.getView();
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		let out = Object.freeze({
			type: "pResourceLink",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			handleMsg: handleMsg,
			addTypeSpecificInfoToViewSpec: addTypeSpecificInfoToViewSpec
		});
		start();
		return out;
	};
	return cora;
}(CORA));