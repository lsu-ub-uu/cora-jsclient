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
		this.minimalGroup = {
		attributes: {type: "group"},
			textId: {linkedRecordType: "text"},
			children:[
				{name: "recordInfo",
					children: [
						{name: "id",
						value: "minimalGroupId"}
					]
				},
				{name : "nameInData",
				value : "minimalGroup"},
				{name: "textId",
			    	children: [
						{name: "linkedRecordType",
			          	value: "text"},
			        {name: "linkedRecordId",
			        value: "minimalGroupIdText"}
			      ]
			    },
			    {name: "defTextId",
			    	children: [
			        	{name: "linkedRecordType",
			          	value: "text"},
			        	{name: "linkedRecordId",
			          	value: "minimalGroupIdDefText"}
			      ]
			    }
			]
		};
		this.metadataProvider.addMetadataById("minimalGroupId",this.minimalGroup);
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
	this.metadataProvider.addMetadataById("minimalGroupId", this.minimalGroup);
		
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

QUnit.test("testViewModelOneChild", function(assert) {
	let childReferences = {
      name: "childReferences",
      children: [
        {
          name: "childReference",
          repeatId: "1",
          children: [
            {
              name: "repeatMin",
              value: "1"
            },
            {
              name: "repeatMax",
              value: "10"
            },
            {
              name: "ref",
              children: [
                {
                  name: "linkedRecordType",
                  value: "metadataGroup"
                },
                {
                  name: "linkedRecordId",
                  value: "recordInfoGroup"
                }
              ]
            }
          ]
        }
      ]
    };
	this.minimalGroup.children.push(childReferences);
	this.metadataProvider.addMetadataById("minimalGroupId", this.minimalGroup);
		
	let generatedView = this.definitionViewer.getViewForMetadataGroupId("minimalGroupId");
	
	let viewModel = this.view.getViewModelForCallNo(0);
	let expected = {
		id: "minimalGroupId",
		type: "group",
		nameInData: "minimalGroup",
		text : {sv : "translated_sv_minimalGroupIdText", en : "translated_en_minimalGroupIdText"},
		defText : {sv : "translated_sv_minimalGroupIdDefText", en : "translated_en_minimalGroupIdDefText"},
		children : [{repeatMin: "1", repeatMax: "10", child : {}}] 
	};
	assert.deepEqual(viewModel, expected);
});

