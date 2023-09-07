/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016 Olov McKie
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
	coraTest.textProviderStub = function() {

		function getTranslation(textId) {
			switch (textId) {
			case "textVariableIdText":
				return "Exempel textvariabel";
				// "Example text variable"

			case "textVariableIdDefText":
				return "Detta är en exempeldefinition för en textvariabel.";
				// This is an example definition for a text variable.

			case "textVariableId2Text":
				return "Exempel textvariabel";
				// "Example text variable"

			case "textVariableId2DefText":
				return "Detta är en exempeldefinition för en textvariabel.";
				// This is an example definition for a text variable.

			case "textVarText":
				return "Exempel textvar";
				// "Example text variable"

			case "textVarDefText":
				return "Detta är en exempeldefinition för en textvar.";
				// This is an example definition for a text variable.

			case "aHeadlineText":
				return "En rubrik";
				// A headline

			case "yesNoUnknownVarText":
				return "Exempel collectionVariable";

			case "yesNoUnknownVarDefText":
				return "Exempel collectionVariable, är en variabel där man kan välja mellan ja, nej och okänt";

			case "itemYesText":
				return "Ja";

			case "itemNoText":
				return "Nej";

			case "itemUnknownText":
				return "Okänt";

			case "initialEmptyValueText":
				return "-- Gör ett val ur listan --";
				
			case "enterTextHereText":
				return "Skriv din text här";
				
			case "linkedRecordTypeText":
				return "Posttyp";
			case "linkedRecordTypeTextVarText":
				return "Posttyp";
			case "linkedRecordTypeTextVarDefText":
				return "Posttyp";
				
			case "linkedRecordIdText":
				return "PostId";
			case "linkedRecordIdTextVarText":
				return "Postid";	
			case "linkedRecordIdTextVarDefText":
				return "Postid deffinition";	
	
			case "linkedRepeatIdText":
				return "RepeatId";	
			case "linkedRepeatIdTextVarText":
				return "RepeatId";	
			case "linkedRepeatIdTextVarDefText":
				return "RepeatId";	
			case "groupIdOneTextChildText":
				return "groupIdOneTextChildText";	
			case "groupIdOneTextChildDefText":
				return "groupIdOneTextChildDefText";	
			case "groupIdTwoTextChildRepeat1to5Text":
				return "groupIdOneTextChildText";	
			case "groupIdTwoTextChildRepeat1to5DefText":
				return "groupIdOneTextChildDefText";	
			case "groupIdOneTextChildRepeat1to3Text":
				return "groupIdOneTextChildText";	
			case "groupIdOneTextChildRepeat1to3DefText":
				return "groupIdOneTextChildDefText";	
			case "groupIdTwoTextChildText":
				return "groupIdOneTextChildText";	
			case "groupIdTwoTextChildDefText":
				return "groupIdOneTextChildDefText";	
			case "textVarRepeat1to3InGroupOneAttributeText":
				return "textVarRepeat1to3InGroupOneAttributeText";	
			case "textVarRepeat1to3InGroupOneAttributeDefText":
				return "textVarRepeat1to3InGroupOneAttributeDefText";	
			case "groupInGroupOneTextChildText":
				return "groupInGroupOneTextChildText";	
			case "groupInGroupOneTextChildDefText":
				return "groupInGroupOneTextChildDefText";	
			case "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroupText":
				return "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroupText";
			case "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroupDefText":
				return "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroupDefText";
			case "groupId1toXCollectionChildText":
				return "groupId1toXCollectionChildText";
			case "groupId1toXCollectionChildDefText":
				return "groupId1toXCollectionChildDefText";
			case "groupIdOneRecordLinkChildWithPathText":
				return "groupIdOneRecordLinkChildWithPathText";
			case "groupIdOneRecordLinkChildWithPathDefText":
				return "groupIdOneRecordLinkChildWithPathDefText";
				
			case "theClient_uploadMenuText":
				return "Uploads";
			case "theClient_loginMenuText":
				return "Login";
			case "trueItemText":
				return "true";
			case "trueItemDefText":
				return "true";
			case "falseItemText":
				return "false";
			case "falseItemDefText":
				return "false";
			case "userSuppliedIdCollectionVarText":
				return "userSuppliedIdCollectionVarText";
			case "userSuppliedIdCollectionVarDefText":
				return "userSuppliedIdCollectionVarDefText";
			case "groupWithOneCollectionVarChildGroupText":
				return "groupWithOneCollectionVarChildGroupText";	
			case "groupWithOneCollectionVarChildGroupDefText":
				return "groupWithOneCollectionVarChildGroupDefText";	
			case "masterResLinkText":
				return "masterResLinkText";	
			case "masterResLinkDefText":
				return "masterResLinkDefText";	
			case "metadataGroupForResourceLinkGroupText":
				return "metadataGroupForResourceLinkGroupText";	
			case "metadataGroupForResourceLinkGroupDefText":
				return "metadataGroupForResourceLinkGroupDefText";
			case "resourceLinkDownloadText":
				return "Ladda ner";
			case "recordInfoText":
				return "recordInfoText";
			case "recordInfoDefText":
				return "recordInfoDefText";
			case "groupIdOneTextChild2Text":
				return "groupIdOneTextChild2Text";
			case "groupIdOneTextChild2DefText":
				return "groupIdOneTextChild2DefText";
			case "groupIdOneChildOfBinaryRecordLinkChildText":
				return "groupIdOneChildOfBinaryRecordLinkChildText";
			case "groupIdOneChildOfBinaryRecordLinkChildDefText":
				return "groupIdOneChildOfBinaryRecordLinkChildDefText";
			case "myLinkText":
				return "myLinkText";
			case "myLinkDefText":
				return "myLinkDefText";
			case "myPathLinkText":
				return "myPathLinkText";
			case "myPathLinkDefText":
				return "myPathLinkDefText";
			case "myFinalValueLinkText":
				return "myFinalValueLinkText";
			case "myFinalValueLinkDefText":
				return "myFinalValueLinkDefText";
			case "numVariableIdText":
				return "numVariableIdText";
			case "numVariableIdDefText":
				return "numVariableIdDefText";
			case "numVariableWithDecimalsIdText":
				return "numVariableWithDecimalsIdText";
			case "numVariableWithDecimalsIdDefText":
				return "numVariableWithDecimalsIdDefText";
			case "someTextToPresentAsLinkText":
				return "text for: someTextToPresentAsLinkText";
			case "anAttributeText":
				return "Attribute";
			case "anOtherAttributeText":
				return "OtherA";
			case "otherLabelText":
				return "otherLabelText_text";
			default:
				console.log("Id(" + textId + ") not found in stub");
				throw new Error("Id(" + textId + ") not found in stub");
			}

			return text;
		}

		return Object.freeze({
			getTranslation : getTranslation
		});
	};
	return coraTest;
}(CORATEST || {}));