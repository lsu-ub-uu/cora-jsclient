/*
 * Copyright 2016 Uppsala University Library
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
	coraTest.textProviderRealStub = function() {

		function getTranslation(textId) {
			switch (textId) {
			case "textSystemOneNewPGroupText":
				return "En ny text";
			case "textSystemOnePGroupText":
				return "En text";
			case "recordInfoNewTextPGroupText":
				return "Textid";
			case "recordInfoTextPGroupText":
				return "Textid";
			case "textPartSvPGroupText":
				return "Svenska";
			case "textPartEnPGroupText":
				return "Engelska";
			case "recordTypePGroupText":
				return "Posttyp";
			case "textPartDefaultPGroupText":
				return "Default";
			case "textPartAlternativePGroupText":
				return "Alternativa översättningar";
			case "emptyTextIdTextVarText":
				return "Empty text id??";
			case "presentationOfTextVarText":
				return "Presentation av";
			case "presentationVarIdText":
				return "Id";
			case "inputItemText":
				return "input";
			case "outputItemText":
				return "output";
			case "modeCollectionTextVarText":
				return "Presentationsläge";
			case "initialEmptyValueText":
				return "-- Gör ett val ur listan --";
			case "outputFormatVarText":
				return "Format för output";
			case "textItemText":
				return "text";
			case "imageItemText":
				return "bild";
			case "videoItemText":
				return "video";
			case "soundItemText":
				return "ljud";
			case "downloadItemText":
				return "nedladdning";
			case "presentationGroupIdText":
				return "Id";
			case "presentationChildReferencesGroupText":
				return "Referenser till barn som ska visas i presentationen";
				case "presentationChildReferenceRefText":
				return "Id på barnpresentationen";
			case "presentationChildReferenceMinimizedRefText":
				return "Id på den minimierade barnpresentationen";
			case "refItemText":
				return "presentation";
			case "refMinimizedItemText":
				return "minimierad presentation";
			case "defaultPresentationCollectionText":
					return "Presentation att visa initialt";
			case "theClient_uploadMenuText":
				return "Uploads";	
			case "resourceLinkDownloadText":
				return "Ladda ner";	
			default:
				//console.log("Id(" + textId + ") not found in textProviderRealStub");
//				throw new Error("Id(" + textId + ") not found in textProviderRealStub");
			return "TEXT NOT FOUND";
			}

			return text;
		}

		return Object.freeze({
			getTranslation : getTranslation
		});
	};
	return coraTest;
}(CORATEST || {}));