/*
 * Copyright 2017, 2018 Uppsala University Library
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

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.textProviderSpy = function() {

		var fetchedTextIds = [];
		var fetchedMetadataIds = [];
		var callWhenReloadedMethod;
		var noOfReloads = 0;
		var setCurrentLangs = [];
		
		function getTranslation(textId) {
			fetchedTextIds.push(textId);
			return "translated_" + textId;
		}

		function getFetchedTextIdNo(no) {
			return fetchedTextIds[no];
		}
		function reload(callWhenReloadedMethodIn) {
			noOfReloads++;
			callWhenReloadedMethod = callWhenReloadedMethodIn;
		}
		function getCallWhenReloadedMethod() {
			return callWhenReloadedMethod;
		}
		function callWhenReloadedMethod() {
			callWhenReloadedMethod();
		}
		function getNoOfReloads() {
			return noOfReloads;
		}

		function setCurrentLang(lang) {
			setCurrentLangs.push(lang);
		}

		function getSetCurrentLang(no) {
			return setCurrentLangs[no];
		}
		function getCurrentLang() {
			return setCurrentLangs.slice(-1).pop();
		}

		function getMetadataById(metadataId) {
			fetchedMetadataIds.push(metadataId);
			if(metadataId==="someNonExistingMetadataId"){
				throw new Error("Id(" + metadataId + ") not found in textProvider");
			}
			var fetched = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : metadataId
					}, {
						"name" : "type",
						"value" : "textSystemOne"
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "userid"
						} ]
					} ],
					"name" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "text",
						"value" : "Svenska"
					} ],
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					}
				} ],
				"name" : "text"
			};
			return fetched;
		}

		function getFetchedMetadataIdNo(no) {
			return fetchedMetadataIds[no];
		}
		
		const getLanguages = function(){
			return ["sv", "en"];
		};

		const getAllTranslations = function(textId){
			return {sv : "translated_sv_" + textId, en : "translated_en_" + textId};
		};

		return Object.freeze({
			getTranslation : getTranslation,
			getFetchedTextIdNo : getFetchedTextIdNo,
			reload : reload,
			getCallWhenReloadedMethod : getCallWhenReloadedMethod,
			getNoOfReloads : getNoOfReloads,
			callWhenReloadedMethod : callWhenReloadedMethod,
			setCurrentLang : setCurrentLang,
			getSetCurrentLang : getSetCurrentLang,
			getCurrentLang : getCurrentLang,
			getMetadataById : getMetadataById,
			getFetchedMetadataIdNo : getFetchedMetadataIdNo,
			getLanguages : getLanguages,
			getAllTranslations : getAllTranslations
		});
	};
	return coraTest;
}(CORATEST || {}));