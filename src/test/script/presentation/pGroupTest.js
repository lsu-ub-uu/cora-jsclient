/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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

QUnit.module("pGroupTest.js", {
	beforeEach : function() {
		this.getId = function(cData) {
			var recordInfo = cData.getFirstChildByNameInData("recordInfo");
			var id = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			return id;
		}

		this.fixture = document.getElementById("qunit-fixture");
		this.dependencies = {
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"presentationFactory" : CORATEST.standardFactorySpy("presentationSpy"),
			"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
			"pChildRefHandlerFactory" : CORATEST.standardFactorySpy("pChildRefHandlerSpy")
		};
		this.spec = {
			"metadataIdUsedInData" : "groupIdOneTextChild",
			"path" : {},
			"cPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdOneTextChild")),
			"cParentPresentation" : undefined,
			"dataDivider" : "systemX"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pGroup.type, "pGroup");
	assert.visible(view, "pGroup view should be visible");
	var expectedClassName = 'pGroup pgGroupIdOneTextChild';
	assert.deepEqual(view.className, expectedClassName);
});

QUnit.test("testInitWithPresentationStyle", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextChildWithPresentationStyle"));
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	assert.deepEqual(view.className, 'pGroup frame pgGroupIdOneTextChildWithPresentationStyle');
});

QUnit.test("testSpec", function(assert) {
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pGroup.getSpec(), this.spec);
});

QUnit.test("testDependencies", function(assert) {
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pGroup.getDependencies(), this.dependencies);
});

QUnit.test("testInitInfo", function(assert) {
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	var infoButton = view.childNodes[0];
	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "iconButton infoButton");

	assert.notOk(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(view.className));
	assert.equal(view.childNodes.length, 2);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.equal(view.childNodes.length, 3);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(view.className));

	var infoView = view.childNodes[1];
	assert.equal(infoView.childNodes.length, 2);
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView",
			"groupIdOneTextChildText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"groupIdOneTextChildDefText", assert);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.equal(view.childNodes.length, 3);
	assert.equal(infoView.childNodes.length, 7);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "textIdView",
			"textId: groupIdOneTextChildText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "defTextIdView",
			"defTextId: groupIdOneTextChildDefText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[4], "metadataIdView",
			"metadataId: groupIdOneTextChild", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[5], "technicalView",
			"nameInData: groupIdOneTextChild", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[6], "technicalView",
			"presentationId: pgGroupIdOneTextChild", assert);
	CORATESTHELPER.simulateOnclick(infoButton);
	assert.equal(view.childNodes.length, 2);
});

QUnit.test("testGetInfoShowsMetadataIdUsedInDataIsUsedAndNotPresentationOf", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdOneTextChild2";
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	var infoButton = view.childNodes[0];
	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "iconButton infoButton");

	assert.notOk(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(view.className));
	assert.equal(view.childNodes.length, 2);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.equal(view.childNodes.length, 3);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(view.className));

	var infoView = view.childNodes[1];
	assert.equal(infoView.childNodes.length, 2);
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView",
			"groupIdOneTextChild2Text", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"groupIdOneTextChild2DefText", assert);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.equal(view.childNodes.length, 3);
	assert.equal(infoView.childNodes.length, 7);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "textIdView",
			"textId: groupIdOneTextChild2Text", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "defTextIdView",
			"defTextId: groupIdOneTextChild2DefText", assert);
	// this is the important part: groupIdOneTextChild2
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[4], "metadataIdView",
			"metadataId: groupIdOneTextChild2", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[5], "technicalView",
			"nameInData: groupIdOneTextChild", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[6], "technicalView",
			"presentationId: pgGroupIdOneTextChild", assert);

	CORATESTHELPER.simulateOnclick(infoButton);
	assert.equal(view.childNodes.length, 2);
});

QUnit.test("testInitOneChild", function(assert) {
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.ok(view.childNodes.length === 2, "pgGroupIdOneTextChild, should have two children");

	// var childRefHandler = view.childNodes[1];
	assert.strictEqual(view.childNodes[1].className, "pChildRefHandlerSpyView");

	var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdOneTextChild");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation), "pgGroupIdOneTextChild");
});

QUnit.test("testInitOneTextOneChild", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextOneTextChild"));
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.ok(view.childNodes.length === 3,
			"pgGroupIdOneTextOneTextChild, should have two children");

	var text = view.childNodes[1];
	assert.deepEqual(text.textContent, "En rubrik");

	// var childRefHandler = view.childNodes[2];
	// assert.deepEqual(childRefHandler.className, "pChildRefHandler pVarTextVariableId");

	assert.strictEqual(view.childNodes[2].className, "pChildRefHandlerSpyView");

	var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdOneTextChild");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
	assert
			.strictEqual(this.getId(factoredSpec.cParentPresentation),
					"pgGroupIdOneTextOneTextChild");
});

QUnit.test("testInitOneCollectionChild", function(assert) {
	this.spec.metadataIdUsedInData = "groupWithOneCollectionVarChildGroup";
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("groupWithOneCollectionVarChildPGroup"));
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.ok(view.childNodes.length === 3,
			"pgGroupIdOneTextOneTextChild, should have two children");

	var text = view.childNodes[1];
	assert.deepEqual(text.textContent, "En rubrik");

	// var childRefHandler = view.childNodes[2];
	// assert.deepEqual(childRefHandler.className,
	// "pChildRefHandler userSuppliedIdCollectionVarPCollVar");
	assert.strictEqual(view.childNodes[2].className, "pChildRefHandlerSpyView");

	var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata),
			"groupWithOneCollectionVarChildGroup");
	assert.strictEqual(this.getId(factoredSpec.cPresentation),
			"userSuppliedIdCollectionVarPCollVar");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
			"groupWithOneCollectionVarChildPGroup");
});

QUnit.test("testInitTwoChildren", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdTwoTextChild";
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdTwoTextChild"));
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.ok(view.childNodes.length === 3);

	// var childRefHandler = view.childNodes[1];
	// assert.deepEqual(childRefHandler.className, "pChildRefHandler pVarTextVariableId");
	// var childRefHandler2 = view.childNodes[2];
	// assert.deepEqual(childRefHandler2.className, "pChildRefHandler pVarTextVariableId2");

	assert.strictEqual(view.childNodes[2].className, "pChildRefHandlerSpyView");

	var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdTwoTextChild");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation), "pgGroupIdTwoTextChild");

	var factoredSpec2 = this.dependencies.pChildRefHandlerFactory.getSpec(1);
	assert.deepEqual(factoredSpec2.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec2.cParentMetadata), "groupIdTwoTextChild");
	assert.strictEqual(this.getId(factoredSpec2.cPresentation), "pVarTextVariableId2");
	assert.strictEqual(this.getId(factoredSpec2.cParentPresentation), "pgGroupIdTwoTextChild");

});

QUnit.test("testInitOneChildMinimized",
		function(assert) {
			this.spec.metadataIdUsedInData = "groupIdOneTextChildRepeat1to3";
			this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdOneTextChildMinimized"));
			var pGroup = CORA.pGroup(this.dependencies, this.spec);
			var view = pGroup.getView();
			this.fixture.appendChild(view);

			assert.strictEqual(view.childNodes[1].className, "pChildRefHandlerSpyView");

			var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
			assert.deepEqual(factoredSpec.parentPath, this.spec.path);

			assert.strictEqual(this.getId(factoredSpec.cParentMetadata),
					"groupIdOneTextChildRepeat1to3");
			assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
			assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
					"pgGroupIdOneTextChildMinimized");
			assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation),
					"pVarTextVariableIdOutput");
			assert.strictEqual(factoredSpec.minimizedDefault, undefined);
		});

QUnit.test("testInitOneChildMinimizedDefault", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pgGroupIdOneTextChildMinimizedDefault"));
	var pGroup = CORA.pGroup(this.dependencies, this.spec);
	var view = pGroup.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.childNodes[1].className, "pChildRefHandlerSpyView");

	var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);

	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdOneTextChild");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableIdOutput");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
			"pgGroupIdOneTextChildMinimizedDefault");
	assert.strictEqual(this.getId(factoredSpec.cAlternativePresentation), "pVarTextVariableId");
});
