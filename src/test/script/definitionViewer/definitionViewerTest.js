/*
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
"use strict";

QUnit.module.only("definitionViewer/definitionViewerTest.js", {
	beforeEach: function() {
		this.metadataProvider = CORATEST.metadataProviderForDefinitionViewerSpy();
		this.textProvider = CORATEST.textProviderSpy();
		this.searchProvider = CORATEST.searchProviderSpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.clientInstanceProvider = CORATEST.clientInstanceProviderSpy();

		this.view = CORATEST.definitionViewerViewSpy()
		
		this.providers = {
			metadataProvider: this.metadataProvider,
			textProvider: this.textProvider,
			searchProvider: this.searchProvider,
			recordTypeProvider: this.recordTypeProvider,
		};

		this.dependencies = {
			view : this.view
		}
		this.spec = {
			someKey : "someValue"
		};
		this.definitionViewer = CORA.definitionViewer(this.providers, this.dependencies, this.spec);
		let toAdd = {
			id: "minimalGroupId",
			type: "group",
			nameInData: "minimalGroup"
//			children : [{repeatMin: "1", repeatMax: "10", refId : "textVar"}] 
		};
		this.metadataProvider.addMetadataByCompactDefinition(toAdd); 
	
	},
	afterEach: function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.strictEqual(this.definitionViewer.type, "definitionViewer");
});

QUnit.test("testOnlyForTestGetProviders", function(assert) {
	assert.strictEqual(this.definitionViewer.onlyForTestGetProviders(), this.providers);
});

QUnit.test("testOnlyForTestGetDependencies", function(assert) {
	assert.strictEqual(this.definitionViewer.onlyForTestGetDependencies(), this.dependencies);
});

QUnit.test("testOnlyForTestGetSpec", function(assert) {
	assert.strictEqual(this.definitionViewer.onlyForTestGetSpec(), this.spec);
});

QUnit.test("testTopLevelMetadataGroupFetchedFromProvider", function(assert) {
	this.definitionViewer.getViewForMetadataGroupId("minimalGroupId");
	
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "minimalGroupId");
});

QUnit.test("testViewerViewIsCalledAndAnswerFromViewReturned", function(assert) {
	let generatedView = this.definitionViewer.getViewForMetadataGroupId("minimalGroupId");
	
	assert.true(this.view.getViewModelForCallNo(0)!=undefined);
	assert.deepEqual(this.view.getCreatedViewForCallNo(0), generatedView);
});

QUnit.test("testViewModel", function(assert) {
//	this.metadataProvider.addMetadataById("minimalGroupId", this.minimalGroup);
		
	let generatedView = this.definitionViewer.getViewForMetadataGroupId("minimalGroupId");
	
	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroup",
		text : {sv : "translated_sv_minimalGroupIdText", en : "translated_en_minimalGroupIdText"},
		defText : {sv : "translated_sv_minimalGroupIdDefText", en : "translated_en_minimalGroupIdDefText"}
	};
	assert.deepEqual(viewModel, expected);
});

//QUnit.test("testViewModelAttributeReferences", function(assert) {
//	let attributeReferences = {
//      name: "attributeReferences",
//      children: [
//        {
//          name: "ref",
//          repeatId: "0",
//          children: [
//            {
//              name: "linkedRecordType",
//              value: "metadataCollectionVariable"
//            },
//            {
//              name: "linkedRecordId",
//              value: "someCollectionVar"
//            }
//          ]
//        },{
//          name: "ref",
//          repeatId: "1",
//          children: [
//            {
//              name: "linkedRecordType",
//              value: "metadataCollectionVariable"
//            },
//            {
//              name: "linkedRecordId",
//              value: "otherCollectionVar"
//            }
//          ]
//        }
//      ]
//    };
//	this.minimalGroup.children.push(attributeReferences);
//	this.metadataProvider.addMetadataById("minimalGroupId", this.minimalGroup);
//		
//	let generatedView = this.definitionViewer.getViewForMetadataGroupId("minimalGroupId");
//	
//	let viewModel = this.view.getViewModelForCallNo(0);
//	let expected = {
//		id: "minimalGroupId",
//		type: "group",
//		nameInData: "minimalGroup",
//		text : {sv : "translated_sv_minimalGroupIdText", en : "translated_en_minimalGroupIdText"}
//	};
//	assert.deepEqual(viewModel, expected);
//});



//{
//              "name": "recordPartConstraint",
//              "value": ""
//            },
//            {
//              "name": "childRefCollectTerm",
//              "children": [
//                {
//                  "name": "linkedRecordType",
//                  "value": "collectStorageTerm"
//                },
//                {
//                  "name": "linkedRecordId",
//                  "value": ""
//                }
//              ],
//              "attributes": {
//                "type": "storage"
//              }
//            },
//            {
//              "name": "childRefCollectTerm",
//              "children": [
//                {
//                  "name": "linkedRecordType",
//                  "value": "collectPermissionTerm"
//                },
//                {
//                  "name": "linkedRecordId",
//                  "value": ""
//                }
//              ],
//              "attributes": {
//                "type": "permission"
//              }
//            },
//            {
//              "name": "childRefCollectTerm",
//              "repeatId": "0",
//              "children": [
//                {
//                  "name": "linkedRecordType",
//                  "value": "collectIndexTerm"
//                },
//                {
//                  "name": "linkedRecordId",
//                  "value": ""
//                }
//              ],
//              "attributes": {
//                "type": "index"
//              }
//            }

QUnit.test("testViewModelOneChild", function(assert) {
	let toAdd = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroup",
		children : [{repeatMin: "1", repeatMax: "10", refId : "textVarId"}] 
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAdd); 
	let toAddTextVar = {
		id: "textVarId",
		type: "textVar",
		nameInData: "textVar" 
	};
	this.metadataProvider.addMetadataByCompactDefinition(toAddTextVar); 
		
	let generatedView = this.definitionViewer.getViewForMetadataGroupId("minimalGroupId");
	
	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroup",
		text : {sv : "translated_sv_minimalGroupIdText", en : "translated_en_minimalGroupIdText"},
		defText : {sv : "translated_sv_minimalGroupIdDefText", en : "translated_en_minimalGroupIdDefText"},
		children : [] 
	};
	let child = {repeatMin: "1", repeatMax: "10", child : {
		id: "textVarId",
		type: "textVar",
		nameInData: "textVar",
		text : {sv : "translated_sv_textVarIdText", en : "translated_en_textVarIdText"},
		defText : {sv : "translated_sv_textVarIdDefText", en : "translated_en_textVarIdDefText"},
	}};
	expected.children.push(child);
	
	assert.deepEqual(viewModel, expected);
});

