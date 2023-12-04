/*
 * Copyright 2016, 2020 Uppsala University Library
 * Copyright 2016, 2020, 2023 Olov McKie
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

QUnit.module("recordHandlerViewTest.js", {
	beforeEach : function() {
        this.fixture = document.getElementById("qunit-fixture");
		this.workItemViewFactory = CORATEST.workItemViewFactorySpy();
		this.dependencies = {
			workItemViewFactory : this.workItemViewFactory,
			holderFactory: CORATEST.standardFactorySpy("holderSpy")
		};
		this.spec = {
			"extraClassName" : "extraClassName2",
			"showDataMethod" : function() {
			},
			"copyDataMethod" : function() {
			},
			"showIncomingLinksMethod" : function() {
			},
			"indexMethod" : function() {
			},
			texts : {
				showDefinitionViewer : "showDefinitionViewer",	
				showDefinitionViewerValidationType : "showDefinitionViewerValidationType",	
				showDefinitionViewerRecordType : "showDefinitionViewerRecordType"	
			}
		};
		this.specWithoutShowIncomingLinks = {
			"extraClassName" : "extraClassName2",
			"showDataMethod" : function() {
			},
			"copyDataMethod" : function() {
			}
		};

		this.getWorkItemViewSpy = function() {
			return this.workItemViewFactory.getFactored(0);
		};
		this.getViewsToolAddedToView = function() {
			return this.getWorkItemViewSpy().getToolViewsAddedToView();
		};
		this.getEditView = function() {
			return this.getWorkItemViewSpy().getViewsAddedToView(0);
		};
		this.getShowView = function() {
			return this.getWorkItemViewSpy().getViewsAddedToView(1);
		};

		this.getButtonView = function() {
			return this.getWorkItemViewSpy().getViewsAddedToView(2);
		};
		this.getIncomingLinksView = function() {
			return this.getWorkItemViewSpy().getViewsAddedToView(3);
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	this.fixture.appendChild(this.recordHandlerView.getView());

	let workItemViewSpy = this.getWorkItemViewSpy();

	let factoredWorkItemViewSpec = workItemViewSpy.getSpec();
	assert.strictEqual(factoredWorkItemViewSpec.extraClassName, "extraClassName2");

	assert.strictEqual(workItemViewSpy.getViewsAddedToView(4), undefined);

	let editView = workItemViewSpy.getViewsAddedToView(0);
	assert.strictEqual(editView.nodeName, "SPAN");
	assert.strictEqual(editView.className, "editView");

	let showView = workItemViewSpy.getViewsAddedToView(1);
	assert.strictEqual(showView.nodeName, "SPAN");
	assert.strictEqual(showView.className, "showView");

	let buttonView = workItemViewSpy.getViewsAddedToView(2);
	assert.strictEqual(buttonView.nodeName, "SPAN");
	assert.strictEqual(buttonView.className, "buttonView");

    let holderFactory = this.dependencies.holderFactory;
    let holder = holderFactory.getFactored(0);
	assert.ok(holder);
	assert.strictEqual(holderFactory.getSpec(0).className, "incomingLinksView");

	let incomingLinksView = workItemViewSpy.getViewsAddedToView(3);
    assert.strictEqual(incomingLinksView, holder.getView());
});

QUnit.test("testGetView", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let workItemViewSpy = this.workItemViewFactory.getFactored(0);
	assert.strictEqual(this.recordHandlerView.getView(), workItemViewSpy.getSpyView());
});

QUnit.test("testInitButtonCreatedForShowDataAsJSON", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let button = this.getViewsToolAddedToView()[0];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, this.spec.showDataMethod);
	assert.strictEqual(button.className, "showData");
	assert.strictEqual(button.value, "Show data as JSON");
});

QUnit.test("testInitButtonCreatedForCopyAsNew", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let button = this.getViewsToolAddedToView()[1];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, this.spec.copyDataMethod);
	assert.strictEqual(button.className, "copyAsNew");
	assert.strictEqual(button.value, "Copy as new");
});

QUnit.test("testAddButtonForReloadData", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let reloadDataMethod= function() {
		//empty method
	};
	this.recordHandlerView.addReloadRecordUsingFunction(reloadDataMethod);
	
	let button = this.getViewsToolAddedToView()[2];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, reloadDataMethod);
	assert.strictEqual(button.className, "reload");
	assert.strictEqual(button.value, "Reload record");
	
	assert.strictEqual(this.getViewsToolAddedToView().length, 3);
	
});

QUnit.test("testAddButtonForReloadDataIsOnlyAddedOnceButUsesNewFunction", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let reloadDataMethod= function() {
		//empty method
	};
	let reloadDataMethod2= function() {
		//empty method
	};
	this.recordHandlerView.addReloadRecordUsingFunction(reloadDataMethod);
	let reloadButton = this.getViewsToolAddedToView()[2];
	assert.strictEqual(reloadButton.onclick, reloadDataMethod);
	this.recordHandlerView.addReloadRecordUsingFunction(reloadDataMethod2);
	assert.strictEqual(reloadButton.onclick, reloadDataMethod2);
	
	let button = this.getViewsToolAddedToView()[3];
	assert.strictEqual(button, undefined);
	assert.strictEqual(this.getViewsToolAddedToView().length, 3);
});


QUnit.test("testAddButtonForDefinitionViewer", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	const openDefinitionViewerDataMethod= function() {
		//empty method
	};
	this.recordHandlerView.addDefinitionViewerOpenFunction(openDefinitionViewerDataMethod);
	
	const button = this.getViewsToolAddedToView()[2];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);
	assert.strictEqual(button.className, "definitionViewer");
	assert.strictEqual(button.value, "showDefinitionViewer");
	assert.strictEqual(this.getViewsToolAddedToView().length, 3);
});

QUnit.test("testAddButtonForDefinitionViewerIsOnlyAddedOnceButUsesNewFunction", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let openDefinitionViewerDataMethod= function() {
		//empty method
	};
	let openDefinitionViewerDataMethod2= function() {
		//empty method
	};
	
	this.recordHandlerView.addDefinitionViewerOpenFunction(openDefinitionViewerDataMethod);
	
	let button = this.getViewsToolAddedToView()[2];
	assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);

	this.recordHandlerView.addDefinitionViewerOpenFunction(openDefinitionViewerDataMethod2);

	assert.strictEqual(button.onclick, openDefinitionViewerDataMethod2);
	let button2 = this.getViewsToolAddedToView()[3];
	assert.strictEqual(button2, undefined);
	assert.strictEqual(this.getViewsToolAddedToView().length, 3);
});

QUnit.test("testAddButtonForDefinitionViewerValidationType", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	const openDefinitionViewerDataMethod= function() {
		//empty method
	};
	this.recordHandlerView.addDefinitionViewerOpenFunctionValidationType(openDefinitionViewerDataMethod);
	
	const button = this.getViewsToolAddedToView()[2];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);
	assert.strictEqual(button.className, "definitionViewer");
	assert.strictEqual(button.value, "showDefinitionViewerValidationType");
	assert.strictEqual(this.getViewsToolAddedToView().length, 3);
});

QUnit.test("testAddButtonForDefinitionViewerValidationType_IsOnlyAddedOnceButUsesNewFunction", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let openDefinitionViewerDataMethod= function() {
		//empty method
	};
	let openDefinitionViewerDataMethod2= function() {
		//empty method
	};
	
	this.recordHandlerView.addDefinitionViewerOpenFunctionValidationType(openDefinitionViewerDataMethod);
	
	let button = this.getViewsToolAddedToView()[2];
	assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);

	this.recordHandlerView.addDefinitionViewerOpenFunctionValidationType(openDefinitionViewerDataMethod2);

	assert.strictEqual(button.onclick, openDefinitionViewerDataMethod2);
	let button2 = this.getViewsToolAddedToView()[3];
	assert.strictEqual(button2, undefined);
	assert.strictEqual(this.getViewsToolAddedToView().length, 3);
});

QUnit.test("testAddButtonForDefinitionViewerRecordType", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	const openDefinitionViewerDataMethod= function() {
		//empty method
	};
	this.recordHandlerView.addDefinitionViewerOpenFunctionRecordType(openDefinitionViewerDataMethod);
	
	const button = this.getViewsToolAddedToView()[2];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);
	assert.strictEqual(button.className, "definitionViewer");
	assert.strictEqual(button.value, "showDefinitionViewerRecordType");
	assert.strictEqual(this.getViewsToolAddedToView().length, 3);
});

QUnit.test("testAddButtonForDefinitionViewerRecordType_IsOnlyAddedOnceButUsesNewFunction", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let openDefinitionViewerDataMethod= function() {
		//empty method
	};
	let openDefinitionViewerDataMethod2= function() {
		//empty method
	};
	
	this.recordHandlerView.addDefinitionViewerOpenFunctionRecordType(openDefinitionViewerDataMethod);
	
	let button = this.getViewsToolAddedToView()[2];
	assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);

	this.recordHandlerView.addDefinitionViewerOpenFunctionRecordType(openDefinitionViewerDataMethod2);

	assert.strictEqual(button.onclick, openDefinitionViewerDataMethod2);
	let button2 = this.getViewsToolAddedToView()[3];
	assert.strictEqual(button2, undefined);
	assert.strictEqual(this.getViewsToolAddedToView().length, 3);
});

QUnit.test("testAddToEditView", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let someView = document.createElement("span");
	this.recordHandlerView.addToEditView(someView);

	assert.strictEqual(this.getEditView().firstChild, someView);
});

QUnit.test("testAddObjectToEditView", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let someObject = {
		"test" : "data"
	};
	this.recordHandlerView.addObjectToEditView(someObject);

	assert.strictEqual(this.getEditView().firstChild.textContent, JSON.stringify(someObject));
});

QUnit.test("addToShow", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let someView = document.createElement("span");
	this.recordHandlerView.addToShowView(someView);

	assert.strictEqual(this.getShowView().firstChild, someView);
});

QUnit.test("addButton", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let onclickMethod = function() {
		//empty method
	};
	this.recordHandlerView.addButton("text", onclickMethod);

	let button = this.getButtonView().childNodes[0];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, onclickMethod);
	assert.strictEqual(button.className, '');
});

QUnit.test("addButtonWithClassName", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let onclickMethod = function() {
		//empty method
	};
	this.recordHandlerView.addButton("text", onclickMethod, "someClass");

	let button = this.getButtonView().childNodes[0];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, onclickMethod);
	assert.strictEqual(button.className, "someClass");
});

QUnit.test("testClearViews", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let recordHandlerView = this.recordHandlerView;

	this.recordHandlerView.addButton("text", undefined);

	let someView = document.createElement("span");
	recordHandlerView.addToEditView(someView);

	let someView2 = document.createElement("span");
	recordHandlerView.addToShowView(someView2);

	assert.strictEqual(this.getEditView().childNodes.length, 1);
	assert.strictEqual(this.getShowView().childNodes.length, 1);
	assert.strictEqual(this.getButtonView().childNodes.length, 1);

	recordHandlerView.clearViews();
	assert.strictEqual(this.getEditView().childNodes.length, 0);
	assert.strictEqual(this.getShowView().childNodes.length, 0);
	assert.strictEqual(this.getButtonView().childNodes.length, 0);
});
QUnit.test("testClearDataViews", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let recordHandlerView = this.recordHandlerView;

	this.recordHandlerView.addButton("text", undefined);

	let someView = document.createElement("span");
	recordHandlerView.addToEditView(someView);

	let someView2 = document.createElement("span");
	recordHandlerView.addToShowView(someView2);

	assert.strictEqual(this.getEditView().childNodes.length, 1);
	assert.strictEqual(this.getShowView().childNodes.length, 1);
	assert.strictEqual(this.getButtonView().childNodes.length, 1);

	recordHandlerView.clearDataViews();
	assert.strictEqual(this.getEditView().childNodes.length, 0);
	assert.strictEqual(this.getShowView().childNodes.length, 0);
	assert.strictEqual(this.getButtonView().childNodes.length, 1);
});

QUnit.test("testAddToIncomingLinksView", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	let someView = document.createElement("span");

	this.recordHandlerView.addToIncomingLinksView(someView);

	assert.strictEqual(this.getIncomingLinksView().firstChild, someView);
});

QUnit.test("testAddDuplicateIncomingLinksView", function(assert) {
    this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
    let someView = document.createElement("span");

    this.recordHandlerView.addToIncomingLinksView(someView);

    assert.strictEqual(this.getIncomingLinksView().firstChild, someView);

    let someOtherView1 = document.createElement("span");
    let someOtherView2 = document.createElement("span");
    let someOtherView3 = document.createElement("span");
    this.recordHandlerView.addToIncomingLinksView(someOtherView1);
    this.recordHandlerView.addToIncomingLinksView(someOtherView2);
    this.recordHandlerView.addToIncomingLinksView(someOtherView3);

    assert.strictEqual(this.getIncomingLinksView().childNodes.length, 1);

});

QUnit.test("testAddShowIncomingLinksButton", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	assert.strictEqual(this.getButtonView().childNodes.length, 0);

	this.recordHandlerView.showShowIncomingLinksButton();

	assert.strictEqual(this.getButtonView().childNodes.length, 1);
	let showIncomingLinksButton = this.getButtonView().childNodes[0];
	assert.strictEqual(showIncomingLinksButton.value, "INCOMING LINKS");
	assert.strictEqual(showIncomingLinksButton.className, "showIncomingLinks");
});

QUnit.test("testIncomingLinksButton", function(assert) {
    let wasCalled = false;
	this.spec.showIncomingLinksMethod = function(){
    	wasCalled = true;
	};
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
    this.recordHandlerView.showShowIncomingLinksButton();
    let showIncomingLinksButton = this.getButtonView().childNodes[0];
    let holderFactory = this.dependencies.holderFactory;
    let holder = holderFactory.getFactored(0);
    assert.strictEqual(holder.getToggleCalled(),0);

    CORATESTHELPER.simulateOnclick(showIncomingLinksButton);
    assert.strictEqual(wasCalled, true);
    assert.strictEqual(holder.getToggleCalled(),1);

    CORATESTHELPER.simulateOnclick(showIncomingLinksButton);
    assert.strictEqual(wasCalled, true);
    assert.strictEqual(holder.getToggleCalled(),2);
});

QUnit.test("testAddShowNoIncomingLinksButton", function(assert) {
	this.recordHandlerView = CORA.recordHandlerView(this.dependencies, this.spec);
	assert.strictEqual(this.getButtonView().childNodes.length, 0);

	this.recordHandlerView.showShowIncomingLinksButton();
	assert.strictEqual(this.getButtonView().childNodes.length, 1);

	this.recordHandlerView.hideShowIncomingLinksButton();
	assert.strictEqual(this.getButtonView().childNodes.length, 0);
});

