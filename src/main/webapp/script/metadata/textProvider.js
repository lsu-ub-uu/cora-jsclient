/*
 * Copyright 2016, 2017 Olov McKie
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
		var texts = {};
		var currentLang = "sv";
		var metadata = {};
		let languages = [];
		fetchTextListAndThen(processFetchedTextdata);

		function fetchTextListAndThen(callAfterAnswer) {
			callThroughAjax(spec.textListLink, callAfterAnswer);
		}

		function callThroughAjax(linkSpec, callAfterAnswer) {
			var ajaxCallSpec = createIndependentCopy(linkSpec);
			ajaxCallSpec.loadMethod = callAfterAnswer;
			dependencies.ajaxCallFactory.factor(ajaxCallSpec);
		}

		function createIndependentCopy(someObject) {
			return JSON.parse(JSON.stringify(someObject));
		}

		function processFetchedTextdata(answer) {
			createTextObjectFromAnswer(answer);
			if (spec.callWhenReady) {
				spec.callWhenReady();
			}
		}

		function createTextObjectFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			data.forEach(function(recordContainer) {
				createTextObjectFromRecordContainer(recordContainer);
			});
		}

		function createTextObjectFromRecordContainer(recordContainer) {
			var recordData = recordContainer.record.data;
			var recordId = getIdFromRecordData(recordData);

			metadata[recordId] = recordData;

			var cRecordData = CORA.coraData(recordData);
			var textParts = cRecordData.getChildrenByNameInData("textPart");
			textParts.forEach(function(textPart) {
				createTextObjectFromTextPart(recordId, textPart);
			});
		}

		function getIdFromRecordData(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function createTextObjectFromTextPart(recordId, textPart) {
			var lang = textPart.attributes.lang;
			var text = textPart.children[0].value;
			if (texts[lang] === undefined) {
				texts[lang] = [];
				languages.push(lang);
			}
			texts[lang][recordId] = text;
		}

		function getTranslation(textId) {
			if (texts[currentLang][textId] !== undefined) {
				return texts[currentLang][textId];
			}
			return "MISSING TRANSLATION FOR TEXTID:" + textId;
		}

		function setCurrentLang(lang) {
			currentLang = lang;
		}

		function getCurrentLang() {
			return currentLang;
		}

		function getMetadataById(metadataId) {
			if (metadata[metadataId] !== undefined) {
				return metadata[metadataId];
			}
			throw new Error("Id(" + metadataId + ") not found in textProvider");
		}

		const getLanguages = function(){
			return languages;
		};

		const getAllTranslations = function(textId){
			let answer = {};
			languages.forEach(function(lang) {
				if (texts[lang][textId] !== undefined) {
					answer[lang] = texts[lang][textId];
				} else {
					answer[lang] = "MISSING TRANSLATION FOR TEXTID:" + textId;
				}
			});
			return answer;
		};

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		return Object.freeze({
			"type" : "textProvider",
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