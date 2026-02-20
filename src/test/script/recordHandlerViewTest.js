/*
 * Copyright 2016, 2020, 2025 Uppsala University Library
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

QUnit.module("recordHandlerViewTest.js", hooks => {
	const test = QUnit.test;
	let fixture;
	let workItemViewFactory;
	let dependencies;
	let spec;
	let recordHandlerView;

	hooks.beforeEach(() => {
		fixture = document.getElementById("qunit-fixture");
		workItemViewFactory = CORATEST.workItemViewFactorySpy();
		dependencies = {
			workItemViewFactory: workItemViewFactory,
			holderFactory: CORATEST.standardFactorySpy("holderSpy")
		};
		spec = {
			extraClassName: "extraClassName2",
			showDataMethod: function() {
			},
			copyDataMethod: function() {
			},
			showIncomingLinksMethod: function() {
			},
			indexMethod: function() {
			},
			texts: {
				showDefinitionViewer: "showDefinitionViewer",
				showDefinitionViewerValidationType: "showDefinitionViewerValidationType",
				showDefinitionViewerRecordType: "showDefinitionViewerRecordType",
				showRecursiveDelete: "showRecursiveDelete"
			}
		};
	});

	const getWorkItemViewSpy = function() {
		return workItemViewFactory.getFactored(0);
	};
	const getViewsToolAddedToView = function() {
		return getWorkItemViewSpy().getToolViewsAddedToView();
	};
	const getViewsToolRemovedFromView = function() {
		return getWorkItemViewSpy().getToolViewsRemovedFromView();
	};
	const getEditView = function() {
		return getWorkItemViewSpy().getViewsAddedToView(0);
	};
	const getShowView = function() {
		return getWorkItemViewSpy().getViewsAddedToView(1);
	};

	const getButtonView = function() {
		return getWorkItemViewSpy().getViewsAddedToView(2);
	};
	const getIncomingLinksView = function() {
		return getWorkItemViewSpy().getViewsAddedToView(3);
	};
	hooks.afterEach(() => {
		//no after
	});


	test("init", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		fixture.appendChild(recordHandlerView.getView());

		let workItemViewSpy = getWorkItemViewSpy();

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

		let holderFactory = dependencies.holderFactory;
		let holder = holderFactory.getFactored(0);
		assert.ok(holder);
		assert.strictEqual(holderFactory.getSpec(0).className, "incomingLinksView");

		let incomingLinksView = workItemViewSpy.getViewsAddedToView(3);
		assert.strictEqual(incomingLinksView, holder.getView());
	});

	test("testGetView", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let workItemViewSpy = workItemViewFactory.getFactored(0);
		assert.strictEqual(recordHandlerView.getView(), workItemViewSpy.getSpyView());
	});

	test("testInitButtonCreatedForShowDataAsJSON", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let button = getViewsToolAddedToView()[0];
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, spec.showDataMethod);
		assert.strictEqual(button.className, "showData");
		assert.strictEqual(button.value, "Show data as JSON");
	});

	test("testInitButtonCreatedForCopyAsNew", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let button = getViewsToolAddedToView()[1];
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, spec.copyDataMethod);
		assert.strictEqual(button.className, "copyAsNew");
		assert.strictEqual(button.value, "Copy as new");
	});

	test("testAddButtonForReloadData", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let reloadDataMethod = function() {
			//empty method
		};
		recordHandlerView.addReloadRecordUsingFunction(reloadDataMethod);

		let button = getViewsToolAddedToView()[2];
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, reloadDataMethod);
		assert.strictEqual(button.className, "reload");
		assert.strictEqual(button.value, "Reload record");

		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testAddButtonForReloadDataIsOnlyAddedOnceButUsesNewFunction", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let reloadDataMethod = function() {
			//empty method
		};
		let reloadDataMethod2 = function() {
			//empty method
		};
		recordHandlerView.addReloadRecordUsingFunction(reloadDataMethod);
		let reloadButton = getViewsToolAddedToView()[2];
		assert.strictEqual(reloadButton.onclick, reloadDataMethod);
		recordHandlerView.addReloadRecordUsingFunction(reloadDataMethod2);
		assert.strictEqual(reloadButton.onclick, reloadDataMethod2);

		let button = getViewsToolAddedToView()[3];
		assert.strictEqual(button, undefined);
		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testRemoveButtonForReloadData", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let reloadDataMethod = function() {
			//empty method
		};
		recordHandlerView.addReloadRecordUsingFunction(reloadDataMethod);

		let viewsAddedToView = getViewsToolAddedToView();
		let button = viewsAddedToView[2];
		assert.strictEqual(viewsAddedToView.length, 3);
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, reloadDataMethod);
		assert.strictEqual(button.className, "reload");
		assert.strictEqual(button.value, "Reload record");
		
		recordHandlerView.removeReloadButton();
		assert.strictEqual(getViewsToolRemovedFromView()[0],button);
	});

	test("testAddButtonForDefinitionViewer", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		const openDefinitionViewerDataMethod = function() {
			//empty method
		};
		recordHandlerView.addDefinitionViewerOpenFunction(openDefinitionViewerDataMethod);

		const button = getViewsToolAddedToView()[2];
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);
		assert.strictEqual(button.className, "definitionViewer");
		assert.strictEqual(button.value, "showDefinitionViewer");
		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testAddButtonForDefinitionViewerIsOnlyAddedOnceButUsesNewFunction", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let openDefinitionViewerDataMethod = function() {
			//empty method
		};
		let openDefinitionViewerDataMethod2 = function() {
			//empty method
		};

		recordHandlerView.addDefinitionViewerOpenFunction(openDefinitionViewerDataMethod);

		let button = getViewsToolAddedToView()[2];
		assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);

		recordHandlerView.addDefinitionViewerOpenFunction(openDefinitionViewerDataMethod2);

		assert.strictEqual(button.onclick, openDefinitionViewerDataMethod2);
		let button2 = getViewsToolAddedToView()[3];
		assert.strictEqual(button2, undefined);
		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testAddButtonForDefinitionViewerValidationType", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		const openDefinitionViewerDataMethod = function() {
			//empty method
		};
		recordHandlerView.addDefinitionViewerOpenFunctionValidationType(openDefinitionViewerDataMethod);

		const button = getViewsToolAddedToView()[2];
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);
		assert.strictEqual(button.className, "definitionViewer");
		assert.strictEqual(button.value, "showDefinitionViewerValidationType");
		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testAddButtonForDefinitionViewerValidationType_IsOnlyAddedOnceButUsesNewFunction", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let openDefinitionViewerDataMethod = function() {
			//empty method
		};
		let openDefinitionViewerDataMethod2 = function() {
			//empty method
		};

		recordHandlerView.addDefinitionViewerOpenFunctionValidationType(openDefinitionViewerDataMethod);

		let button = getViewsToolAddedToView()[2];
		assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);

		recordHandlerView.addDefinitionViewerOpenFunctionValidationType(openDefinitionViewerDataMethod2);

		assert.strictEqual(button.onclick, openDefinitionViewerDataMethod2);
		let button2 = getViewsToolAddedToView()[3];
		assert.strictEqual(button2, undefined);
		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testAddButtonForDefinitionViewerRecordType", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		const openDefinitionViewerDataMethod = function() {
			//empty method
		};
		recordHandlerView.addDefinitionViewerOpenFunctionRecordType(openDefinitionViewerDataMethod);

		const button = getViewsToolAddedToView()[2];
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);
		assert.strictEqual(button.className, "definitionViewer");
		assert.strictEqual(button.value, "showDefinitionViewerRecordType");
		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testAddButtonForDefinitionViewerRecordType_IsOnlyAddedOnceButUsesNewFunction", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let openDefinitionViewerDataMethod = function() {
			//empty method
		};
		let openDefinitionViewerDataMethod2 = function() {
			//empty method
		};

		recordHandlerView.addDefinitionViewerOpenFunctionRecordType(openDefinitionViewerDataMethod);

		let button = getViewsToolAddedToView()[2];
		assert.strictEqual(button.onclick, openDefinitionViewerDataMethod);

		recordHandlerView.addDefinitionViewerOpenFunctionRecordType(openDefinitionViewerDataMethod2);

		assert.strictEqual(button.onclick, openDefinitionViewerDataMethod2);
		let button2 = getViewsToolAddedToView()[3];
		assert.strictEqual(button2, undefined);
		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testAddButtonForRecursiveDelete", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		const openRecursiveDeleteMethod = function() {
			//empty method
		};
		recordHandlerView.addRecursiveDeleteOpenFunction(openRecursiveDeleteMethod);

		const button = getViewsToolAddedToView()[2];
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, openRecursiveDeleteMethod);
		assert.strictEqual(button.className, "recursiveDelete");
		assert.strictEqual(button.value, "showRecursiveDelete");
		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testAddButtonForRecursiveDelete_IsOnlyAddedOnceButUsesNewFunction", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let openRecursiveDeleteMethod = function() {
			//empty method
		};
		let openRecursiveDeleteMethod2 = function() {
			//empty method
		};

		recordHandlerView.addRecursiveDeleteOpenFunction(openRecursiveDeleteMethod);

		let button = getViewsToolAddedToView()[2];
		assert.strictEqual(button.onclick, openRecursiveDeleteMethod);

		recordHandlerView.addRecursiveDeleteOpenFunction(openRecursiveDeleteMethod2);

		assert.strictEqual(button.onclick, openRecursiveDeleteMethod2);
		let button2 = getViewsToolAddedToView()[3];
		assert.strictEqual(button2, undefined);
		assert.strictEqual(getViewsToolAddedToView().length, 3);
	});

	test("testAddToEditView", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let someView = document.createElement("span");
		recordHandlerView.addToEditView(someView);

		assert.strictEqual(getEditView().firstChild, someView);
	});

	test("testAddObjectToEditView", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let someObject = {
			test: "data"
		};
		recordHandlerView.addObjectToEditView(someObject);

		assert.strictEqual(getEditView().firstChild.textContent, JSON.stringify(someObject));
	});

	test("addToShow", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let someView = document.createElement("span");
		recordHandlerView.addToShowView(someView);

		assert.strictEqual(getShowView().firstChild, someView);
	});

	test("addButton", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let onclickMethod = function() {
			//empty method
		};
		recordHandlerView.addButton("text", onclickMethod);

		let button = getButtonView().childNodes[0];
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, onclickMethod);
		assert.strictEqual(button.className, '');
	});

	test("addButtonWithClassName", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let onclickMethod = function() {
			//empty method
		};
		recordHandlerView.addButton("text", onclickMethod, "someClass");

		let button = getButtonView().childNodes[0];
		assert.strictEqual(button.nodeName, "INPUT");
		assert.strictEqual(button.type, "button");
		assert.strictEqual(button.onclick, onclickMethod);
		assert.strictEqual(button.className, "someClass");
	});

	test("testClearViews", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);

		recordHandlerView.addButton("text", undefined);

		let someView = document.createElement("span");
		recordHandlerView.addToEditView(someView);

		let someView2 = document.createElement("span");
		recordHandlerView.addToShowView(someView2);

		assert.strictEqual(getEditView().childNodes.length, 1);
		assert.strictEqual(getShowView().childNodes.length, 1);
		assert.strictEqual(getButtonView().childNodes.length, 1);

		recordHandlerView.clearViews();
		assert.strictEqual(getEditView().childNodes.length, 0);
		assert.strictEqual(getShowView().childNodes.length, 0);
		assert.strictEqual(getButtonView().childNodes.length, 0);
	});
	
	test("testClearDataViews", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);

		recordHandlerView.addButton("text", undefined);

		let someView = document.createElement("span");
		recordHandlerView.addToEditView(someView);

		let someView2 = document.createElement("span");
		recordHandlerView.addToShowView(someView2);

		assert.strictEqual(getEditView().childNodes.length, 1);
		assert.strictEqual(getShowView().childNodes.length, 1);
		assert.strictEqual(getButtonView().childNodes.length, 1);

		recordHandlerView.clearDataViews();
		assert.strictEqual(getEditView().childNodes.length, 0);
		assert.strictEqual(getShowView().childNodes.length, 0);
		assert.strictEqual(getButtonView().childNodes.length, 1);
	});

	test("testAddToIncomingLinksView", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let someView = document.createElement("span");

		recordHandlerView.addToIncomingLinksView(someView);

		assert.strictEqual(getIncomingLinksView().firstChild, someView);
	});

	test("testAddDuplicateIncomingLinksView", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		let someView = document.createElement("span");

		recordHandlerView.addToIncomingLinksView(someView);

		assert.strictEqual(getIncomingLinksView().firstChild, someView);

		let someOtherView1 = document.createElement("span");
		let someOtherView2 = document.createElement("span");
		let someOtherView3 = document.createElement("span");
		recordHandlerView.addToIncomingLinksView(someOtherView1);
		recordHandlerView.addToIncomingLinksView(someOtherView2);
		recordHandlerView.addToIncomingLinksView(someOtherView3);

		assert.strictEqual(getIncomingLinksView().childNodes.length, 1);

	});

	test("testAddShowIncomingLinksButton", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		assert.strictEqual(getButtonView().childNodes.length, 0);

		recordHandlerView.showShowIncomingLinksButton();

		assert.strictEqual(getButtonView().childNodes.length, 1);
		let showIncomingLinksButton = getButtonView().childNodes[0];
		assert.strictEqual(showIncomingLinksButton.value, "INCOMING LINKS");
		assert.strictEqual(showIncomingLinksButton.className, "showIncomingLinks");
	});

	test("testIncomingLinksButton", function(assert) {
		let wasCalled = false;
		spec.showIncomingLinksMethod = function() {
			wasCalled = true;
		};
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		recordHandlerView.showShowIncomingLinksButton();
		let showIncomingLinksButton = getButtonView().childNodes[0];
		let holderFactory = dependencies.holderFactory;
		let holder = holderFactory.getFactored(0);
		assert.strictEqual(holder.getToggleCalled(), 0);

		CORATESTHELPER.simulateOnclick(showIncomingLinksButton);
		assert.strictEqual(wasCalled, true);
		assert.strictEqual(holder.getToggleCalled(), 1);

		CORATESTHELPER.simulateOnclick(showIncomingLinksButton);
		assert.strictEqual(wasCalled, true);
		assert.strictEqual(holder.getToggleCalled(), 2);
	});

	test("testAddShowNoIncomingLinksButton", function(assert) {
		recordHandlerView = CORA.recordHandlerView(dependencies, spec);
		assert.strictEqual(getButtonView().childNodes.length, 0);

		recordHandlerView.showShowIncomingLinksButton();
		assert.strictEqual(getButtonView().childNodes.length, 1);

		recordHandlerView.hideShowIncomingLinksButton();
		assert.strictEqual(getButtonView().childNodes.length, 0);
	});
});
