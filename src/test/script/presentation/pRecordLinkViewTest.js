/*
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

QUnit.module("presentation/pRecordLinkViewTest.js", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.textIdOnclickMethod = {};
		this.defTextIdOnclickMethod = {
			tramas: "trams"
		};
		this.dependencies = {
			infoFactory: CORATEST.infoFactorySpy(),
			presentationFactory: CORATEST.standardFactorySpy("presentationSpy")
		};
		this.spec = {
			presentationId: "somePresentationId",
			mode: "input",
			info: {
				text: "someText",
				defText: "someDefText",
				technicalInfo: [{
					text: "textId: textId",
					onclickMethod: this.textIdOnclickMethod
				}, {
					text: "defTextId: defTextId",
					onclickMethod: this.defTextIdOnclickMethod
				}, {
					text: "metadataId: metadataId"
				}]
			},
			"pRecordLink": CORATEST.pRecordLinkSpy()
		};

		this.getChildrenViewFromView = function(view) {
			return view.childNodes[0];
		}
		this.getButtonViewViewFromView = function(view) {
			return view.childNodes[1];
		}

		this.defaultLastChildPosition = 1;

		this.createFakeSearchHandlerView = function() {
			let fakeSearchHandlerView = document.createElement("SPAN");
			let content = document.createTextNode(JSON
				.stringify("content needed for span to be visible in chrome"));
			fakeSearchHandlerView.appendChild(content);
			return fakeSearchHandlerView;
		}

		this.getPRecordLinkView = function() {
			if (this.pRecordLinkView === undefined) {
				this.pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
			}
			return this.pRecordLinkView;
		};
		this.getView = function() {
			if (this.pRecordLinkView === undefined) {
				this.pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
			}
			return this.pRecordLinkView.getView();
		};
	}
});

QUnit.test("init", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	assert.strictEqual(pRecordLinkView.type, "pRecordLinkView");
});

QUnit.test("testGetDependencies", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	assert.strictEqual(pRecordLinkView.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	assert.strictEqual(pRecordLinkView.getSpec(), this.spec);
});

QUnit.test("testGetView", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();
	assert.strictEqual(view.className, "pRecordLink");
});

QUnit.test("testChildrenViewIsCreatedOnInit", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();
	let childrenView = this.getChildrenViewFromView(view);
	assert.strictEqual(childrenView.className, "childrenView");
});

QUnit.test("testAddChild", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();
	let child = document.createElement("SPAN");
	pRecordLinkView.addChild(child);
	let childrenView = this.getChildrenViewFromView(view);
	assert.strictEqual(childrenView.childNodes[0], child);
});

QUnit.test("testHideAndShowChildrenView", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();
	this.fixture.appendChild(view);
	let child = document.createElement("SPAN");
	let content = document.createTextNode(JSON
		.stringify("content needed for span to be visible in chrome"));
	child.appendChild(content);
	pRecordLinkView.addChild(child);
	let childrenView = this.getChildrenViewFromView(view);
	assert.visible(childrenView);
	pRecordLinkView.hideChildren();
	pRecordLinkView.hideChildren();
	assert.notVisible(childrenView);
	pRecordLinkView.showChildren();
	pRecordLinkView.showChildren();
	assert.visible(childrenView);
});

QUnit.test("testAddLinkedPresentation", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();
	let linkedPresentation = document.createElement("SPAN");
	pRecordLinkView.addLinkedPresentation(linkedPresentation);
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1], linkedPresentation);
});

QUnit.test("testAddSecondLinkedPresentationRemovesFirst", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	let linkedPresentation = document.createElement("SPAN");
	pRecordLinkView.addLinkedPresentation(linkedPresentation);

	let linkedPresentation2 = document.createElement("SPAN");
	pRecordLinkView.addLinkedPresentation(linkedPresentation2);
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1], linkedPresentation2);
});

QUnit.test("testRemoveLinkedPresentationRemovesFirst", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	let linkedPresentation = document.createElement("SPAN");
	pRecordLinkView.addLinkedPresentation(linkedPresentation);

	pRecordLinkView.removeLinkedPresentation();
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1], undefined);
});

QUnit.test("testRemoveNonExistingLinkedPresentationRemovesFirst", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	pRecordLinkView.removeLinkedPresentation();
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1], undefined);
});

QUnit.test("testInfoSpec", function(assert) {
	let expectedSpec = {
		level1: [{
			className: "textView",
			text: "someText"
		}, {
			className: "defTextView",
			text: "someDefText"
		}],
		level2: [{
			className: "technicalView",
			text: "textId: textId",
			onclickMethod: this.textIdOnclickMethod
		}, {
			className: "technicalView",
			text: "defTextId: defTextId",
			onclickMethod: this.defTextIdOnclickMethod
		}, {
			className: "technicalView",
			text: "metadataId: metadataId"
		}],
		insertBefore: {}
	};
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.insertBefore, view.childNodes[0]);
	assert.strictEqual(usedSpec.afterLevelChange, pRecordLinkView.updateClassName);
	assert.strictEqual(usedSpec.level2[0].onclickMethod, this.textIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[1].onclickMethod, this.defTextIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[2].onclickMethod, undefined);
	
	assert.strictEqual(view.childNodes[0].className, "childrenView");

});
QUnit.test("testInfoButtonAddedToView", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();
	assert.strictEqual(this.getButtonViewViewFromView(view).childNodes[this.defaultLastChildPosition - 1].className,
		"infoButtonSpy");
});

QUnit.test("testOpenLinkedRecordAddedToView", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
	pRecordLinkView.showOpenLinkedRecordButton();
	assert.strictEqual(this.getButtonViewViewFromView(view).childNodes.length, 2);
	assert.strictEqual(this.getButtonViewViewFromView(view).childNodes[1].className,
		"iconButton openLinkedRecordButton");

	pRecordLinkView.showOpenLinkedRecordButton();
	assert.strictEqual(this.getButtonViewViewFromView(view).childNodes.length, 2);
	assert.strictEqual(this.getButtonViewViewFromView(view).childNodes[1].className,
		"iconButton openLinkedRecordButton");
});

QUnit.test("testOpenLinkedRecordRemovedFromView", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
	pRecordLinkView.showOpenLinkedRecordButton();
	assert.strictEqual(this.getButtonViewViewFromView(view).childNodes.length, 2);
	let openButton = this.getButtonViewViewFromView(view).childNodes[1];
	assert.strictEqual(openButton.className, "iconButton openLinkedRecordButton");
	pRecordLinkView.hideOpenLinkedRecordButton();
	assert.strictEqual(this.getButtonViewViewFromView(view).childNodes.length, 1);
});

QUnit.test("testOpenLinkedRecordRemovedFromViewWhenNotPresent", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
	pRecordLinkView.hideOpenLinkedRecordButton();
	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
});

QUnit.test("testClearLinkedRecordIdAddedToView",
	function(assert) {
		let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
		let view = pRecordLinkView.getView();

		let onclickMethod = {
			"dummy": "trams"
		};

		assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
		pRecordLinkView.showClearLinkedRecordIdButton(onclickMethod);

		let clearLinkedRecordIdButton = this.getButtonViewViewFromView(view).childNodes[this.defaultLastChildPosition];

		assert.strictEqual(view.childNodes.length, 2);
		assert.strictEqual(clearLinkedRecordIdButton.className,
			"iconButton clearLinkedRecordIdButton");

		pRecordLinkView.showClearLinkedRecordIdButton(onclickMethod);
		assert.strictEqual(view.childNodes.length, 2);
		assert.strictEqual(clearLinkedRecordIdButton.className,
			"iconButton clearLinkedRecordIdButton");
	});

QUnit.test("testClearLinkedRecordIdButtonCall", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();
	let clicked = false;
	let onclickMethod = function() {
		clicked = true
	};
	pRecordLinkView.showClearLinkedRecordIdButton(onclickMethod);
	let clearLinkedRecordIdButton = this.getButtonViewViewFromView(view).childNodes[this.defaultLastChildPosition];

	CORATESTHELPER.simulateOnclick(clearLinkedRecordIdButton);

	assert.strictEqual(clicked, true);
});

QUnit.test("testClearLinkedRecordIdRemovedFromView",
	function(assert) {
		let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
		let view = pRecordLinkView.getView();

		let onclickMethod = {
			"dummy": "trams"
		};

		assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
		pRecordLinkView.showClearLinkedRecordIdButton(onclickMethod);

		let clearLinkedRecordIdButton = this.getButtonViewViewFromView(view).childNodes[this.defaultLastChildPosition];

		assert.strictEqual(this.getButtonViewViewFromView(view).childNodes.length, 2);
		assert.strictEqual(clearLinkedRecordIdButton.className,
			"iconButton clearLinkedRecordIdButton");

		pRecordLinkView.hideClearLinkedRecordIdButton();
		assert.strictEqual(this.getButtonViewViewFromView(view).childNodes.length, 1);

		pRecordLinkView.hideClearLinkedRecordIdButton();
		assert.strictEqual(this.getButtonViewViewFromView(view).childNodes.length, 1);
	});

QUnit.test("testAddChildPresentationClickableLoadInBackground", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	pRecordLinkView.showOpenLinkedRecordButton();
	let view = pRecordLinkView.getView();
	let openButton = this.getButtonViewViewFromView(view).childNodes[this.defaultLastChildPosition];
	assert.strictEqual(openButton.className, "iconButton openLinkedRecordButton");

	CORATESTHELPER.simulateOnclick(openButton, { ctrlKey: true });

	assert.strictEqual(this.spec.pRecordLink.getOpenLinkedRecord(0).loadInBackground, "true");
});

QUnit.test("testAddChildPresentationClickableLoadInForground", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	pRecordLinkView.showOpenLinkedRecordButton();
	let view = pRecordLinkView.getView();
	let openButton = this.getButtonViewViewFromView(view).childNodes[this.defaultLastChildPosition];
	assert.strictEqual(openButton.className, "iconButton openLinkedRecordButton");

	CORATESTHELPER.simulateOnclick(openButton);


	assert.strictEqual(this.spec.pRecordLink.getOpenLinkedRecord(0).loadInBackground, "false");
});

QUnit.test("testInfoSpecNoTechnicalPart", function(assert) {
	this.spec.info.technicalInfo = null;
	let expectedSpec = {
		"level1": [{
			"className": "textView",
			"text": "someText"
		}, {
			"className": "defTextView",
			"text": "someDefText"
		}],
		"insertBefore": {}
	};
	CORA.pRecordLinkView(this.dependencies, this.spec);
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	let usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
});

QUnit.test("testActiveInfoShownInClassName", function(assert) {
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();
	let infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pRecordLink");
	infoSpy.setInfoLevel(0);
	pRecordLinkView.updateClassName();
	assert.strictEqual(view.className, "pRecordLink");
	infoSpy.setInfoLevel(1);
	pRecordLinkView.updateClassName();
	assert.strictEqual(view.className, "pRecordLink infoActive");
	infoSpy.setInfoLevel(0);
	pRecordLinkView.updateClassName();
	assert.strictEqual(view.className, "pRecordLink");
});

QUnit.test("testAddSearchHandlerView", function(assert) {
	let fakeSearchHandlerView = this.createFakeSearchHandlerView();
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	assert.strictEqual(view.className, "pRecordLink");
	pRecordLinkView.addSearchHandlerView(fakeSearchHandlerView);

	assert.strictEqual(view.contains(fakeSearchHandlerView), true);
	assert.strictEqual(view.className, "pRecordLink searchActive");
});

QUnit.test("testHideSearchHandlerView", function(assert) {
	let fakeSearchHandlerView = this.createFakeSearchHandlerView();
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	assert.strictEqual(view.className, "pRecordLink");
	pRecordLinkView.addSearchHandlerView(fakeSearchHandlerView);
	assert.strictEqual(view.contains(fakeSearchHandlerView), true);
	assert.strictEqual(view.className, "pRecordLink searchActive");

	pRecordLinkView.hideSearchHandlerView();

	assert.strictEqual(view.className, "pRecordLink");
	assert.strictEqual(view.contains(fakeSearchHandlerView), false);
	pRecordLinkView.hideSearchHandlerView();
});

QUnit.test("testHideNonExistingSearchHandlerView", function(assert) {
	let fakeSearchHandlerView = this.createFakeSearchHandlerView();
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);

	pRecordLinkView.hideSearchHandlerView();

	let view = pRecordLinkView.getView();
	assert.strictEqual(view.contains(fakeSearchHandlerView), false);
});

QUnit.test("testShowSearchHandlerView", function(assert) {
	let fakeSearchHandlerView = this.createFakeSearchHandlerView();
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	pRecordLinkView.addSearchHandlerView(fakeSearchHandlerView);
	assert.strictEqual(view.contains(fakeSearchHandlerView), true);
	pRecordLinkView.hideSearchHandlerView();

	assert.strictEqual(view.contains(fakeSearchHandlerView), false);

	pRecordLinkView.showSearchHandlerView();

	assert.strictEqual(view.contains(fakeSearchHandlerView), true);
});

QUnit.test("testShowNonExistingSearchHandlerView", function(assert) {
	let fakeSearchHandlerView = this.createFakeSearchHandlerView();
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	let view = pRecordLinkView.getView();

	pRecordLinkView.showSearchHandlerView();
	assert.strictEqual(view.contains(fakeSearchHandlerView), false);
});

QUnit.test("testShowSearchButtonAddedToView", function(assert) {
	let fakeSearchHandlerView = this.createFakeSearchHandlerView();
	let pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);

	pRecordLinkView.addSearchHandlerView(fakeSearchHandlerView);
	let view = pRecordLinkView.getView();

	let showSearchButton = view.childNodes[2].childNodes[1];
	assert.strictEqual(showSearchButton.className, "iconButton showSearchButton");
	assert.strictEqual(view.contains(fakeSearchHandlerView), true);

	CORATESTHELPER.simulateOnclick(showSearchButton);

	assert.strictEqual(view.contains(fakeSearchHandlerView), false);

	CORATESTHELPER.simulateOnclick(showSearchButton);
	assert.strictEqual(view.contains(fakeSearchHandlerView), true);
});

QUnit.test("testAddAttributesView", function(assert) {
	let pRecordLinkView = this.getPRecordLinkView();
	let fakeView = document.createElement("span");
	fakeView.appendChild(document.createTextNode("fake view"));

	pRecordLinkView.addAttributesView(fakeView);
	assert.strictEqual(pRecordLinkView.getView().firstChild, fakeView);
});
