/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2017, 2023 Olov McKie
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
QUnit.module("presentation/pResourceLinkTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		this.pAttributesFactory = CORATEST.standardFactorySpy("pAttributesSpy");
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		
		this.pParentMultipleChildrenFactory = CORATEST.standardParentFactorySpy("pParentMultipleChildrenSpy");
		
		this.dependencies = {
			authTokenHolder: CORATEST.authTokenHolderSpy(),
			metadataProvider: this.metadataProvider,
			pubSub: this.pubSub,
			textProvider: this.textProvider,
			presentationFactory: this.presentationFactory,
			pAttributesFactory: this.pAttributesFactory,
			jsBookkeeper: this.jsBookkeeper,
			recordTypeProvider: this.recordTypeProvider,
			pChildRefHandlerFactory: CORATEST.standardFactorySpy("pChildRefHandlerSpy"),
			pMultipleChildrenViewFactory: CORATEST.standardFactorySpy("pMultipleChildrenViewSpy"),
			pParentMultipleChildrenFactory: this.pParentMultipleChildrenFactory
		};
		this.presentationId = "masterPResLink";
		this.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(this.presentationId));
		this.spec = {
			"path": ["somePath"],
			"cPresentation": this.cPresentation,
			"cParentPresentation": undefined,
			"dataDivider": "systemX"
		};
		this.setSpecCPresentation = function(metadataId) {
			this.spec.cPresentation = this.getMetadataAsCoraData(metadataId);
		};
		this.getMetadataAsCoraData = function(metadataId) {
			return CORA.coraData(this.dependencies.metadataProvider.getMetadataById(metadataId));
		};
	},
});
/*
{
  "actionLinks": {
    "read": {
      "requestMethod": "GET",
      "rel": "read",
      "url": "http://localhost:38080/systemone/rest/record/binary/binary:176527754137154/master",
      "accept": "image/jpeg"
    }
  },
  "name": "master",
  "mimeType": "image/jpeg"
},
*/
QUnit.test("testInit", function(assert) {
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	
	assert.strictEqual(pResourceLink.type, "pResourceLink");
});

QUnit.test("testInitParentFactoryCalled", function(assert) {
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	
	assert.strictEqual(this.pParentMultipleChildrenFactory.getSpec(0), this.spec);
	let child = this.pParentMultipleChildrenFactory.getChild(0);
	
	assert.strictEqual(child.type, "pResourceLink");
	assert.strictEqual(child.metadataId, "metadataGroupForResourceLinkGroup");
});

QUnit.test("testAddTypeSpecificInfoToView_WhenAddedToParentAsChild", function(assert) {
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	
	let child = this.pParentMultipleChildrenFactory.getChild(0);
	assert.ok(child.addTypeSpecificInfoToViewSpec);
	let spec = {};

	child.addTypeSpecificInfoToViewSpec("input", spec);
	
	assert.strictEqual(spec.type, "pResourceLink");
});

QUnit.test("testGetView", function(assert) {
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	let parent = this.pParentMultipleChildrenFactory.getFactored(0);
	
	assert.strictEqual(pResourceLink.getView, parent.getView);
});

QUnit.test("testGetDependencies", function(assert) {
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	assert.strictEqual(pResourceLink.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	assert.strictEqual(pResourceLink.getSpec(), this.spec);
	assert.equal(this.dependencies.pubSub.getSubscriptions()[0].path[0],"somePath");
	assert.equal(this.dependencies.pubSub.getSubscriptions()[0].path[1],"resourceLinkResLink");
});

QUnit.test("testInitOneChild", function(assert) {
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	let view = pResourceLink.getView();

	assert.deepEqual(view.childNodes.length, 1);

	let image = view.childNodes[0];
	assert.equal(image.nodeName, "IMG");
	assert.equal(image.className, "master");
});

CORATEST.resourceLinkDataFromMessage = {
	"data": {
		"actionLinks": {
			"read": {
				"requestMethod": "GET",
				"rel": "read",
				"url": "http://localhost:38080/systemone/rest/record/binary/binary:5782891133352/master",
				"accept": "application/octet-stream"
			}
		},
		"name": "master",
		"mimeType": "application/octet-stream"
	}
	
};

QUnit.test("testOneChildHandleLinkedResource", function(assert) {
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	let view = pResourceLink.getView();

	assert.deepEqual(view.childNodes.length, 1);

	pResourceLink.handleMsg(CORATEST.resourceLinkDataFromMessage);

	let image = view.childNodes[0];
	assert.equal(image.src, "http://localhost:38080/systemone/rest/record/binary/binary:5782891133352/master"
		+ "?authToken=fitnesseAdminToken");
});

QUnit.test("testOneChildHandleLinkedResourceNoChildReferences", function(assert) {
	this.setSpecCPresentation("masterPResLinkNoChildReferences");
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);

	let view = pResourceLink.getView();

	assert.deepEqual(view.childNodes.length, 1);

	pResourceLink.handleMsg(CORATEST.resourceLinkDataFromMessage);

	let image = view.childNodes[0];
	assert.equal(image.src, "http://localhost:38080/systemone/rest/record/binary/binary:5782891133352/master"
		+ "?authToken=fitnesseAdminToken");

});

QUnit.test("testOneChildMasterPResLinkNoOutputFormat", function(assert) {
	this.setSpecCPresentation("masterPResLinkNoOutputFormat");
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);

	let view = pResourceLink.getView();

	assert.deepEqual(view.childNodes.length, 0);

	pResourceLink.handleMsg(CORATEST.resourceLinkDataFromMessage);

	assert.deepEqual(view.childNodes.length, 0);

});

QUnit.test("testOneChildMasterPResLinkDownloadOutputFormat", function(assert) {
	this.setSpecCPresentation("masterPResLinkDownloadOutputFormat");
	let pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	
	let view = pResourceLink.getView();
	assert.deepEqual(view.childNodes.length, 1);

	pResourceLink.handleMsg(CORATEST.resourceLinkDataFromMessage);

	let link = view.childNodes[0];
	assert.equal(link.nodeName, "A");
	assert.equal(link.href, "http://localhost:38080/systemone/rest/record/binary/binary:5782891133352/master"
		+ "?authToken=fitnesseAdminToken");
	assert.equal(link.textContent, "Ladda ner");
	assert.equal(link.target, "_blank");

});
