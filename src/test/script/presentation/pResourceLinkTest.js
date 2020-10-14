/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2017 Olov McKie
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.attachedPResourceLinkFactory = function(metadataProvider, pubSub, textProvider,
			presentationFactory, jsBookkeeper, recordTypeProvider, fixture) {
		var factor = function(presentationId) {
			var cPresentation = CORA.coraData(metadataProvider.getMetadataById(presentationId));

			var dependencies = {
				"authTokenHolder" : CORATEST.authTokenHolderSpy(),
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"presentationFactory" : presentationFactory,
				"jsBookkeeper" : jsBookkeeper,
				"recordTypeProvider" : recordTypeProvider,
				"pChildRefHandlerFactory" : CORATEST.standardFactorySpy("pChildRefHandlerSpy")
			};
			var spec = {
				"path" : {},
				"cPresentation" : cPresentation,
				"cParentPresentation" : undefined,
				"dataDivider" : "systemX"
			};
			var pResourceLink = CORA.pResourceLink(dependencies, spec);

			var view = pResourceLink.getView();
			fixture.appendChild(view);
			return {
				pResourceLink : pResourceLink,
				fixture : fixture,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				view : view
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("presentation/pResourceLinkTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.presentationFactory = CORATEST.standardFactorySpy("presentationSpy");
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.newAttachedPResourceLink = CORATEST.attachedPResourceLinkFactory(
				this.metadataProvider, this.pubSub, this.textProvider, this.presentationFactory,
				this.jsBookkeeper, this.recordTypeProvider, this.fixture);
				
		this.dependencies = {
			"authTokenHolder" : CORATEST.authTokenHolderSpy(),
			"metadataProvider" : this.metadataProvider,
			"pubSub" : this.pubSub,
			"textProvider" : this.textProvider,
			"presentationFactory" : this.presentationFactory,
			"jsBookkeeper" : this.jsBookkeeper,
			"recordTypeProvider" : this.recordTypeProvider,
			"pChildRefHandlerFactory" : CORATEST.standardFactorySpy("pChildRefHandlerSpy")
		};
		this.presentationId = "masterPResLink";
		this.cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(this.presentationId));
		this.spec = {
			"path" : {},
			"cPresentation" : this.cPresentation,
			"cParentPresentation" : undefined,
			"dataDivider" : "systemX"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testGetDependencies", function(assert) {
	var pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	assert.strictEqual(pResourceLink.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var pResourceLink = CORA.pResourceLink(this.dependencies, this.spec);
	assert.strictEqual(pResourceLink.getSpec(), this.spec);
});

QUnit.test("testInit", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink.factor("masterPResLink");
	assert.strictEqual(attachedPResourceLink.pResourceLink.type, "pResourceLink");
	var view = attachedPResourceLink.view;
	assert.visible(view, "pResourceLink view should be visible");
	var expectedClassName = 'pResourceLink masterPResLink';
	assert.deepEqual(view.className, expectedClassName);

	var subscriptions = this.pubSub.getSubscriptions();
});

QUnit.test("testInitInfo", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink.factor("masterPResLink");
	var view = attachedPResourceLink.view;

	var infoButton = view.childNodes[0];
	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "iconButton infoButton");

	assert.notOk(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(view.className));
	assert.equal(view.childNodes.length, 3);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.equal(view.childNodes.length, 4);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(view.className));

	var infoView = view.childNodes[1];
	assert.equal(infoView.childNodes.length, 2);
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView",
			"metadataGroupForResourceLinkGroupText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"metadataGroupForResourceLinkGroupDefText", assert);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.equal(view.childNodes.length, 4);
	assert.equal(infoView.childNodes.length, 7);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "textIdView",
			"textId: metadataGroupForResourceLinkGroupText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "defTextIdView",
			"defTextId: metadataGroupForResourceLinkGroupDefText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[4], "metadataIdView",
			"metadataId: metadataGroupForResourceLinkGroup", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[5], "technicalView",
			"nameInData: metadataGroupForResourceLinkGroup", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[6], "technicalView",
			"presentationId: masterPResLink", assert);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.equal(view.childNodes.length, 3);
});

QUnit.test("testInitOneChild", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink.factor("masterPResLink");
	var view = attachedPResourceLink.view;

	assert.deepEqual(view.childNodes.length, 3);

	var childRefHandler = view.childNodes[1];
	assert.deepEqual(childRefHandler.className, "pChildRefHandlerSpyView");

	var image = view.childNodes[2];
	assert.equal(image.nodeName, "IMG");
	assert.equal(image.className, "master");

});
CORATEST.resourceLinkDataFromMessage = {
	"data" : {
		"name" : "master",
		"children" : [ {
			"name" : "streamId",
			"value" : "binary:123456789"
		}, {
			"name" : "filename",
			"value" : "adele.png"
		}, {
			"name" : "filesize",
			"value" : "12345"
		}, {
			"name" : "mimeType",
			"value" : "application/png"
		} ],
		"actionLinks" : {
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://localhost:8080/therest/rest/record/image/image:123456/master",
				"accept" : "application/octet-stream"
			}
		}
	}
};

QUnit.test("testOneChildHandleLinkedResource", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink.factor("masterPResLink");
	var view = attachedPResourceLink.view;

	assert.deepEqual(view.childNodes.length, 3);

	var pResourceLink = attachedPResourceLink.pResourceLink;
	pResourceLink.handleMsg(CORATEST.resourceLinkDataFromMessage);

	var image = view.childNodes[2];
	assert.equal(image.src, "http://localhost:8080/therest/rest/record/image/image:123456/master"
			+ "?authToken=fitnesseAdminToken");

});

QUnit.test("testOneChildHandleLinkedResourceNoChildReferences", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink
			.factor("masterPResLinkNoChildReferences");
	var view = attachedPResourceLink.view;

	assert.deepEqual(view.childNodes.length, 2);

	var pResourceLink = attachedPResourceLink.pResourceLink;
	pResourceLink.handleMsg(CORATEST.resourceLinkDataFromMessage);

	var image = view.childNodes[1];
	assert.equal(image.src, "http://localhost:8080/therest/rest/record/image/image:123456/master"
			+ "?authToken=fitnesseAdminToken");

});

QUnit.test("testOneChildMasterPResLinkNoOutputFormat", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink
			.factor("masterPResLinkNoOutputFormat");
	var view = attachedPResourceLink.view;

	assert.deepEqual(view.childNodes.length, 2);

	var pResourceLink = attachedPResourceLink.pResourceLink;
	pResourceLink.handleMsg(CORATEST.resourceLinkDataFromMessage);

	var fileName = view.childNodes[1];
	assert.equal(fileName.className, "pChildRefHandlerSpyView");

});

QUnit.test("testOneChildMasterPResLinkDownloadOutputFormat", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink
			.factor("masterPResLinkDownloadOutputFormat");
	var view = attachedPResourceLink.view;

	assert.deepEqual(view.childNodes.length, 2);

	var pResourceLink = attachedPResourceLink.pResourceLink;
	pResourceLink.handleMsg(CORATEST.resourceLinkDataFromMessage);

	var link = view.childNodes[1];
	assert.equal(link.nodeName, "A");
	assert.equal(link.href, "http://localhost:8080/therest/rest/record/image/image:123456/master"
			+ "?authToken=fitnesseAdminToken");
	assert.equal(link.textContent, "Ladda ner");
	assert.equal(link.target, "_blank");

});
