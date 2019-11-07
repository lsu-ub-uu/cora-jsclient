/*
 * Copyright 2015 Olov McKie
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
	cora.metadataRepeatValidator = function(metadataId, path, data, repeatId, metadataProvider,
			pubSub) {
		var result = {
			"everythingOkBelow" : true,
			"containsValuableData" : false
		};
		var cMetadataElement = getMetadataById(metadataId);

		var spec = {
			path:path,
			cMetadataElement:cMetadataElement,
			repeatId:repeatId
		};

		var dependencies = {metadataProvider:metadataProvider};

		var metaDataRepeater = cora.metaDataRepeat(dependencies, spec);

		validateRepeat();

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function validateRepeat() {
			validateForMetadata();
		}


		function validateForMetadata() {
			var nextLevelPath = metaDataRepeater.createNextLevelPath();
			if (metaDataRepeater.isGroup()) {
				validateMetadataGroup(nextLevelPath);
			} else if (metaDataRepeater.isRecordLink()) {
				validateMetadataRecordLink(nextLevelPath);
			} else {
				validateVariableValue(nextLevelPath);
			}
		}


		function validateMetadataGroup(nextLevelPath) {
			var nextLevelChildReferences = cMetadataElement
					.getFirstChildByNameInData('childReferences');
			nextLevelChildReferences.children.forEach(function(childReference) {
				validateGroupChild(childReference, nextLevelPath);
			});

			if (!result.containsValuableData) {
				result.everythingOkBelow = false;
			}
		}

		function validateGroupChild(childReference, nextLevelPath) {
			validateChild(childReference, nextLevelPath, data);
		}
		function validateChild(childReference, nextLevelPath, childData) {
			var childResult = CORA.metadataChildValidator(childReference, nextLevelPath, childData,
					metadataProvider, pubSub);
			if (!childResult.everythingOkBelow) {
				result.everythingOkBelow = false;
			}
			if (childResult.containsValuableData) {
				result.containsValuableData = true;
			}
			result.validationMessage = {
				"metadataId" : metadataId,
				"path" : nextLevelPath
			};
			result.sendValidationMessages = false;
		}

		function validateMetadataRecordLink(nextLevelPath) {
			validateLinkedRecordId(nextLevelPath);
			possiblyValidateLinkedRepeatId(nextLevelPath);

		}

		function validateLinkedRecordId(nextLevelPath) {
			var recordIdStaticChildReference = createRefWithRef("linkedRecordIdTextVar");
			validateChild(recordIdStaticChildReference, nextLevelPath, data);
		}

		function createRefWithRef(ref) {
			return {
				"name" : "childReference",
				"repeatId" : 1,
				"children" : [ {
					"name" : "ref",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadata"
					}, {
						"name" : "linkedRecordId",
						"value" : ref
					} ]
				}, {
					"name" : "repeatMin",
					"value" : "1"
				}, {
					"name" : "repeatMax",
					"value" : "1"
				} ]
			};
		}

		function possiblyValidateLinkedRepeatId(nextLevelPath) {
			if (isLinkToRepeatingPartOfRecord()) {
				var recordTypeStaticChildReference = createRefWithRef("linkedRepeatIdTextVar");
				validateChild(recordTypeStaticChildReference, nextLevelPath, data);
			}
		}

		function isLinkToRepeatingPartOfRecord() {
			return cMetadataElement.containsChildWithNameInData("linkedPath");
		}

		function validateVariableValue(nextLevelPath) {
			var hasFinalValue = cMetadataElement.containsChildWithNameInData("finalValue");
			if (dataIsValid()) {
				handleValidData(hasFinalValue, result);
			} else {
				handleInvalidData(nextLevelPath);
			}
		}
		function dataIsValid() {
			var type = cMetadataElement.getData().attributes.type;
			if (type === "textVariable") {
				return validateTextVariable();
			}
			if (type === "numberVariable") {
				return validateNumberVariable();
			}
			return validateCollectionVariable();
		}

		function validateTextVariable() {
			var regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");
			return new RegExp(regEx).test(data.value);
		}

		function validateNumberVariable() {
			var validator = CORA.numberVariableValidator({
				"metadataProvider" : metadataProvider,
			});
			return validator.validateData(data.value, cMetadataElement);
		}

		function validateCollectionVariable() {
			var collectionItemReferences = getCollectionItemReferences();
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				var finalValue = cMetadataElement.getFirstAtomicValueByNameInData("finalValue");
				return finalValue === data.value;
			}

			return collectionItemReferences.children.some(isItemDataValue);
		}

		function getCollectionItemReferences() {
			var cRefCollection = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData("refCollection"));

			var refCollectionId = cRefCollection.getFirstAtomicValueByNameInData("linkedRecordId");
			var cItemCollection = getMetadataById(refCollectionId);
			return cItemCollection.getFirstChildByNameInData("collectionItemReferences");
		}

		function isItemDataValue(collectionItemReference) {
			var cItemRef = CORA.coraData(collectionItemReference);
			var itemRefId = cItemRef.getFirstChildByNameInData("linkedRecordId").value;
			var cCollectionItem = getMetadataById(itemRefId);
			var nameInData = cCollectionItem.getFirstAtomicValueByNameInData("nameInData");
			return nameInData === data.value;
		}

		function handleValidData(hasFinalValue, res) {
			if (hasFinalValue) {
				res.containsValuableData = false;
			} else {
				res.containsValuableData = true;
			}
		}

		function handleInvalidData(nextLevelPath) {
			var message = {
				"metadataId" : metadataId,
				"path" : nextLevelPath
			};
			result = {
				"everythingOkBelow" : false,
				"containsValuableData" : false,
				"validationMessage" : message,
				"sendValidationMessages" : true
			};
		}
		return result;
	};
	return cora;
}(CORA));