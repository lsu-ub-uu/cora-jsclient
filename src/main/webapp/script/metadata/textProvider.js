/*
 * Copyright 2016, 2017, 2023 Olov McKie
 * Copyright 2016, 2018 Uppsala University Library
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
	cora.textProvider = function(dependencies, spec) {
		let texts = {};
		let currentLang = "sv";
		let metadata = {};
		let languages = [];
		
		const start = function() {
			fetchTextListAndThen(processFetchedTextdata);
		};
		
		const fetchTextListAndThen = function(callAfterAnswer) {
			callThroughAjax(spec.textListLink, callAfterAnswer);
		};

		const callThroughAjax = function(linkSpec, callAfterAnswer) {
			let ajaxCallSpec = createIndependentCopy(linkSpec);
			ajaxCallSpec.loadMethod = callAfterAnswer;
			dependencies.ajaxCallFactory.factor(ajaxCallSpec);
		};

		const createIndependentCopy = function(someObject) {
			return JSON.parse(JSON.stringify(someObject));
		};

		const processFetchedTextdata = function(answer) {
			createTextObjectFromAnswer(answer);
			if (spec.callWhenReady) {
				spec.callWhenReady();
			}
		};

		const createTextObjectFromAnswer = function(answer) {
			let data = JSON.parse(answer.responseText).dataList.data;
			data.forEach(function(recordContainer) {
				createTextObjectFromRecordContainer(recordContainer);
			});
		};

		const createTextObjectFromRecordContainer = function(recordContainer) {
			let recordData = recordContainer.record.data;
			let recordId = getIdFromRecordData(recordData);

			metadata[recordId] = recordData;

			let cRecordData = CORA.coraData(recordData);
			let textParts = cRecordData.getChildrenByNameInData("textPart");
			textParts.forEach(function(textPart) {
				createTextObjectFromTextPart(recordId, textPart);
			});
		};

		const getIdFromRecordData = function(recordData) {
			let cRecord = CORA.coraData(recordData);
			let cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		};

		const createTextObjectFromTextPart = function(recordId, textPart) {
			let lang = textPart.attributes.lang;
			let text = textPart.children[0].value;
			if (texts[lang] === undefined) {
				texts[lang] = [];
				languages.push(lang);
			}
			texts[lang][recordId] = text;
		};

		const getTranslation = function(textId) {
			return getTranslationForLangAndTextId(currentLang, textId);
		};

		const getTranslationForLangAndTextId = function(lang, textId) {
			if (texts[lang][textId] !== undefined) {
				return texts[lang][textId];
			}
			return `MISSING TRANSLATION FOR TEXTID:${textId}`;
		};

		const setCurrentLang = function(lang) {
			currentLang = lang;
		};

		const getCurrentLang = function() {
			return currentLang;
		};

		const getMetadataById = function(metadataId) {
			if (metadata[metadataId] !== undefined) {
				return metadata[metadataId];
			}
			throw new Error(`Id(${metadataId}) not found in textProvider`);
		};

		const getLanguages = function(){
			return languages;
		};

		const getAllTranslations = function(textId){
			let answer = {};
			languages.forEach(function(lang) {
				answer[lang] = getTranslationForLangAndTextId(lang, textId);
			});
			return answer;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		start();
		return Object.freeze({
			type : "textProvider",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getTranslation : getTranslation,
			processFetchedTextdata : processFetchedTextdata,
			setCurrentLang : setCurrentLang,
			getCurrentLang : getCurrentLang,
			getMetadataById : getMetadataById,
			getLanguages : getLanguages,
			getAllTranslations : getAllTranslations
		});
	};
	return cora;
}(CORA));