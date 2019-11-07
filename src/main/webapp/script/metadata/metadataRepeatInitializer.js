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

var CORA = (function (cora) {
    "use strict";
    cora.metadataRepeatInitializer = function (dependencies, spec) {
        var metadataProvider = dependencies.metadataProvider;
        var pubSub = dependencies.pubSub;
        var metadataId = spec.metadataId;
        var path = spec.path;
        var cMetadataElement = getMetadataById(metadataId);
        spec.cMetadataElement = cMetadataElement;


        var metaDataRepeater = cora.metaDataRepeat(dependencies, spec);
        initalizeRepeat();

        function getMetadataById(id) {
            return CORA.coraData(metadataProvider.getMetadataById(id));
        }

        function initalizeRepeat() {
            createAndPublishAddMessage();
            initializeForMetadata();
        }

        function createAndPublishAddMessage() {
            var addMessage = {
                "metadataId": metadataId,
                "path": path,
                "repeatId": spec.repeatId,
                "nameInData": cMetadataElement.getFirstAtomicValueByNameInData("nameInData")
            };
            if (hasAttributes()) {
                addMessage.attributes = collectAttributes();
            }
            pubSub.publish("add", addMessage);
        }

        function hasAttributes() {
            return cMetadataElement.containsChildWithNameInData("attributeReferences");
        }

        function collectAttributes() {
            var collectedAttributes = {};
            var attributeReferences = cMetadataElement.getFirstChildByNameInData("attributeReferences");
            attributeReferences.children.forEach(function (attributeReference) {
                var cAttributeReference = CORA.coraData(attributeReference);
                var refLinkedId = cAttributeReference.getFirstAtomicValueByNameInData("linkedRecordId");
                var cCollectionVariable = metaDataRepeater.getMetadataById(refLinkedId);
                var attributeNameInData = cCollectionVariable.getFirstAtomicValueByNameInData("nameInData");
                var attributeValues = [];
                collectedAttributes[attributeNameInData] = attributeValues;
                attributeValues.push(cCollectionVariable.getFirstAtomicValueByNameInData("finalValue"));
            });
            return collectedAttributes;
        }

        function initializeForMetadata() {
            var nextLevelPath = metaDataRepeater.createNextLevelPath();
            var message = {
                "data": spec.data,
                "path": nextLevelPath
            };
            if (metaDataRepeater.isGroup()) {
                initializeMetadataGroup(nextLevelPath);
            } else if (metaDataRepeater.isRecordLink()) {
                initializeMetadataRecordLink(nextLevelPath);
                pubSub.publish("linkedData", message);
            } else if (isResourceLink()) {
                initializeMetadataResourceLink(nextLevelPath);
                pubSub.publish("linkedResource", message);
            } else {
                possiblyPublishVariableValue(nextLevelPath);
            }
        }


        function isResourceLink() {
            var type = cMetadataElement.getData().attributes.type;
            return type === "resourceLink";
        }


        function initializeMetadataGroup(nextLevelPath) {
            var nextLevelChildReferences = cMetadataElement
                .getFirstChildByNameInData('childReferences');
            nextLevelChildReferences.children.forEach(function (childReference) {
                var initializerSpec = {
                    "childReference": childReference,
                    "path": nextLevelPath,
                    "data": spec.data,
                    "metadataProvider": metadataProvider,
                    "pubSub": pubSub
                };
                CORA.metadataChildInitializer(dependencies, initializerSpec);
            });
        }

        function initializeMetadataRecordLink(nextLevelPath) {
            initializeLinkedRecordType(nextLevelPath);
            initializeLinkedRecordId(nextLevelPath);
            possiblyInitializeLinkedRepeatId(nextLevelPath);
        }

        function initializeLinkedRecordType(nextLevelPath) {
            var recordTypeStaticChildReference = createRefWithRef("linkedRecordTypeTextVar");
            var cRecordTypeGroup = CORA.coraData(cMetadataElement
                .getFirstChildByNameInData("linkedRecordType"));
            var linkedRecordTypeValue = cRecordTypeGroup
                .getFirstAtomicValueByNameInData("linkedRecordId");

            var implementingRecordType = getImplementingRecordType(linkedRecordTypeValue);
            var recordTypeData = {
                "name": cMetadataElement.getFirstAtomicValueByNameInData("nameInData"),
                "children": [{
                    "name": "linkedRecordType",
                    "value": implementingRecordType
                }]
            };
            var initializerSpec = {
                "childReference": recordTypeStaticChildReference,
                "path": nextLevelPath,
                "data": recordTypeData,
                "metadataProvider": metadataProvider,
                "pubSub": pubSub
            };
            CORA.metadataChildInitializer(dependencies, initializerSpec);
        }

        function createRefWithRef(ref) {
            return {
                "name": "childReference",
                "repeatId": 1,
                "children": [{
                    "name": "ref",
                    "children": [{
                        "name": "linkedRecordType",
                        "value": "metadataTextVariable"
                    }, {
                        "name": "linkedRecordId",
                        "value": ref
                    }],
                    "attributes": {
                        "type": "textVariable"
                    }
                }, {
                    "name": "repeatMin",
                    "value": "1"
                }, {
                    "name": "repeatMax",
                    "value": "1"
                }]
            };
        }

        function getImplementingRecordType(linkedRecordTypeValue) {
            var recordTypeDefinition = dependencies.recordTypeProvider.getMetadataByRecordTypeId(linkedRecordTypeValue);
            return getImplementingRecordTypeFromRecordTypeDefinition(recordTypeDefinition, linkedRecordTypeValue);
        }

        function getImplementingRecordTypeFromRecordTypeDefinition(recordTypeDefinition, linkedRecordTypeValue) {
            return recordTypeDefinition.abstract === "false" ? linkedRecordTypeValue : getImplementingRecordTypeFromDataIfExists();
        }

        function getImplementingRecordTypeFromDataIfExists() {
            var implementingRecordType = "";
            if (dataContainsLinkedRecordType()) {
                var recordTypeInData = CORA.coraData(spec.data).getFirstChildByNameInData("linkedRecordType");
                if (recordTypeInData.value !== "") {
                    implementingRecordType = recordTypeInData.value;
                }
            }
            return implementingRecordType;
        }

        function dataContainsLinkedRecordType() {
            return spec.data !== undefined && CORA.coraData(spec.data).containsChildWithNameInData("linkedRecordType");
        }

        function initializeLinkedRecordId(nextLevelPath) {
            var recordIdData = spec.data;
            if (cMetadataElement.containsChildWithNameInData("finalValue")) {
                var finalValue = cMetadataElement.getFirstAtomicValueByNameInData("finalValue");

                recordIdData = {
                    "name": cMetadataElement.getFirstAtomicValueByNameInData("nameInData"),
                    "children": [{
                        "name": "linkedRecordId",
                        "value": finalValue
                    }]
                };
            }

            var recordIdStaticChildReference = createRefWithRef("linkedRecordIdTextVar");
            var initializerSpec = {
                "childReference": recordIdStaticChildReference,
                "path": nextLevelPath,
                "data": recordIdData,
                "metadataProvider": metadataProvider,
                "pubSub": pubSub
            };
            CORA.metadataChildInitializer(dependencies, initializerSpec);
        }

        function possiblyInitializeLinkedRepeatId(nextLevelPath) {
            if (isLinkToRepeatingPartOfRecord()) {
                var recordTypeStaticChildReference = createRefWithRef("linkedRepeatIdTextVar");
                var initializerSpec = {
                    "childReference": recordTypeStaticChildReference,
                    "path": nextLevelPath,
                    "data": spec.data,
                    "metadataProvider": metadataProvider,
                    "pubSub": pubSub
                };
                CORA.metadataChildInitializer(dependencies, initializerSpec);
            }
        }

        function isLinkToRepeatingPartOfRecord() {
            return cMetadataElement.containsChildWithNameInData("linkedPath");
        }


        function initializeMetadataResourceLink(nextLevelPath) {
            var cMetadataGroupForResourceLinkGroup = metaDataRepeater.getMetadataById("metadataGroupForResourceLinkGroup");
            var nextLevelChildReferences = cMetadataGroupForResourceLinkGroup
                .getFirstChildByNameInData('childReferences');
            nextLevelChildReferences.children.forEach(function (childReference) {
                var initializerSpec = {
                    "childReference": childReference,
                    "path": nextLevelPath,
                    "data": spec.data,
                    "metadataProvider": metadataProvider,
                    "pubSub": pubSub
                };
                CORA.metadataChildInitializer(dependencies, initializerSpec);
            });
        }

        function possiblyPublishVariableValue(nextLevelPath) {
            if (cMetadataElement.containsChildWithNameInData("finalValue")) {
                setFinalValue(nextLevelPath);
            } else {
                publishIfDataIsPresent(nextLevelPath);
            }
        }

        function setFinalValue(nextLevelPath) {
            var finalValue = cMetadataElement.getFirstAtomicValueByNameInData("finalValue");
            publishVariableValue(finalValue, nextLevelPath);
        }

        function publishVariableValue(value, nextLevelPath) {
            var message = {
                "data": value,
                "path": nextLevelPath
            };
            pubSub.publish("setValue", message);
        }

        function publishIfDataIsPresent(nextLevelPath) {
            if (spec.data !== undefined) {
                publishVariableValue(spec.data.value, nextLevelPath);
            }
        }
    };
    return cora;
}(CORA));