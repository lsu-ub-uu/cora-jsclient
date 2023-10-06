/*
 * Copyright 2022 Uppsala University Library
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

QUnit.module("presentation/pAttributesViewTest.js", {
	beforeEach: function() {
		this.pAttributesView = CORA.pAttributesView();
		this.dependencies = {
		};
		this.spec = {
		};
	}
});

QUnit.test("init", function(assert) {
	assert.strictEqual(this.pAttributesView.type, "pAttributesView");
});

QUnit.test("getView", function(assert) {
	let view = this.pAttributesView.getView();
	assert.strictEqual(view.nodeName, "SPAN");
	assert.strictEqual(view.className, "attributes");
	assert.strictEqual(view.childNodes.length, 0);
});

QUnit.test("testAddAttributes", function(assert) {
	let view = this.pAttributesView.getView();
	let fakeView = document.createElement("span");
	fakeView.appendChild(document.createTextNode("fake view"));
	let attributePresentation = {
		view: fakeView,
		text: "clearTextAttribute"
	};
	this.pAttributesView.addAttributePresentation(attributePresentation);

	assert.strictEqual(view.children.length, 1);

	assert.strictEqual(view.lastChild, fakeView);
});

QUnit.test("testAddTwoAttributes", function(assert) {
	let view = this.pAttributesView.getView();
	let fakeView = document.createElement("span");
	fakeView.appendChild(document.createTextNode("fake view"));
	let attributePresentation = {
		view: fakeView,
		text: "clearTextAttribute"
	};
	this.pAttributesView.addAttributePresentation(attributePresentation);

	let fakeView2 = document.createElement("span");
	fakeView.appendChild(document.createTextNode("fake view2"));
	let attributePresentation2 = {
		view: fakeView2,
		text: "clearTextAttribute2"
	};
	this.pAttributesView.addAttributePresentation(attributePresentation2);

	assert.strictEqual(view.children.length, 2);
});

