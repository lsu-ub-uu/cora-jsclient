/*
 * Copyright 2016, 2017 Olov McKie
 * Copyright 2016, 2018, 2019, 2020 Uppsala University Library
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
	cora.metadataProvider = function(dependencies, spec) {
		let textProvider = dependencies.textProvider;
		let processedAjaxCalls = 0;
		let metadata = {};
		let NUMBER_OF_AJAX_CALLS = 3;
		const start = function() {
			fetchMetadataListAndThen(processFetchedMetadata);
			fetchPresentationListAndThen(processFetchedMetadata);
			fetchGuiElementListAndThen(processFetchedMetadata);
		};

		const fetchMetadataListAndThen = function(callAfterAnswer) {
			callThroughAjax(spec.metadataListLink, callAfterAnswer);
		};

		const callThroughAjax = function(linkSpec, callAfterAnswer) {
			let ajaxCallSpec = createIndependentCopy(linkSpec);
			ajaxCallSpec.loadMethod = callAfterAnswer;
			ajaxCallSpec.errorMethod = processErrorAnswer;
			dependencies.ajaxCallFactory.factor(ajaxCallSpec);
		};

		const createIndependentCopy = function(someObject) {
			return JSON.parse(JSON.stringify(someObject));
		};

		const processFetchedMetadata = function(answer) {
			createMetadataObjectFromAnswer(answer);
			processedAjaxCalls++;
			possiblyCallWhenReady();
		};

		const processErrorAnswer = function(answer) {
			if (404 === answer.status) {
				processedAjaxCalls++;
				possiblyCallWhenReady();
			}
		};


		const possiblyCallWhenReady = function() {
			if (spec.callWhenReady && processedAjaxCalls === NUMBER_OF_AJAX_CALLS) {
				spec.callWhenReady();
			}
		};

		const createMetadataObjectFromAnswer = function(answer) {
			let data = JSON.parse(answer.responseText).dataList.data;
			data.forEach(function(recordContainer) {
				let recordData = recordContainer.record.data;
				let recordId = getIdFromRecordData(recordData);
				metadata[recordId] = recordContainer.record;
			});
		};

		const getIdFromRecordData = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			let cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};

		const fetchPresentationListAndThen = function(callAfterAnswer) {
			callThroughAjax(spec.presentationListLink, callAfterAnswer);
		};

		const fetchGuiElementListAndThen = function(callAfterAnswer) {
			callThroughAjax(spec.guiElementListLink, callAfterAnswer);
		};

		const getMetadataById = function(metadataId) {
			if (metadata[metadataId] !== undefined) {
				return metadata[metadataId].data;
			}
			return tryToGetMetadataFromTextProvider(metadataId);
		};

		const tryToGetMetadataFromTextProvider = function(metadataId) {
			try {
				return textProvider.getMetadataById(metadataId);
			} catch (error) {
				throw new Error("Id(" + metadataId + ") not found in metadataProvider");
			}
		};

		const getMetadataRecordById = function(metadataId) {
			if (metadata[metadataId] !== undefined) {
				return metadata[metadataId];
			}
			return tryToGetMetadataFromTextProvider(metadataId);
		};
		
		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		let out = Object.freeze({
			type: "metadataProvider",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getMetadataById: getMetadataById,
			getMetadataRecordById: getMetadataRecordById,
			processFetchedMetadata: processFetchedMetadata
		});
		start();
		return out;
	};
	return cora;
}(CORA));