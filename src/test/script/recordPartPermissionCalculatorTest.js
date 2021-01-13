/*
 * Copyright 2020 Uppsala University Library
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

QUnit.module("recordPartPermissionCalculatorTest.js", {
	beforeEach: function() {
		this.metadataProviderSpy = CORATEST.metadataProviderSpyForPermissionCalculator();

		this.dependencies = {
			metadataProvider: this.metadataProviderSpy
		};
		this.metadataProvider = this.dependencies.metadataProvider;
		this.spec = {
			metadataId: "textGroupTopLevel",
			permissions: {
				write: [],
				read: []
			}
		};
	},
	afterEach: function() {
	}
});

QUnit.test("testType", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable"]]));
	
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	
	assert.strictEqual(calculator.type, "recordPartPermissionCalculator");
});

QUnit.test("testGetDependencies", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable"]]));
	
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable"]]));
	
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.getSpec(), this.spec);
});

QUnit.test("testNoPermissions", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable"]]));
	
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), true);
});

QUnit.test("testEmptyPermissions", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable"]]));
	
	this.spec.permissions = {
		write: [],
		read: []
	};
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), true);
});

QUnit.test("testNoPermissionsAndWriteConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "write"]]));
	
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdVariable"), false);
});

QUnit.test("testWithReadWritePermissionsNoConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable"]]));
	this.spec.permissions = {
		write: ["textIdVariableNameInData"],
		read: ["textIdVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
});

QUnit.test("testWritePermissionsMatchingConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "write"]]));
	this.spec.permissions = {
		write: ["textIdVariableNameInData"],
		read: ["textIdVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textIdVariable");

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(1), "textIdVariable");

	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 0);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "someId"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
});

QUnit.test("testWithTwoWritePermissionsMatchingConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "write"], ["metadataTextVariable", "textIdAnotherVariable", "write"]]));
	this.spec.permissions = {
		write: ["textIdVariableNameInData", "textIdAnotherVariableNameInData"],
		read: ["textIdVariableNameInData", "textIdAnotherVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 2);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textIdVariable");
	assert.strictEqual(fulfilledWriteRecordParts[1], "metadataTextVariable_textIdAnotherVariable");
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdAnotherVariable"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdAnotherVariable"), true);
});

QUnit.test("testWithOneWritePermissionsAndTwoConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "write"], ["metadataTextVariable", "textIdAnotherVariable", "write"]]));
	this.spec.permissions = {
		write: ["textIdVariableNameInData"],
		read: ["textIdVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	let callGetMetadataId = this.metadataProvider.getFetchedMetadataId(0)
	assert.strictEqual(callGetMetadataId, "textGroupTopLevel");
	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textIdVariable");
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdAnotherVariable"), false);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeId"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
});

QUnit.test("testWithTwoWritePermissionsOneConstraint", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "write"]]));
	this.spec.permissions = {
		write: ["textIdVariableNameInData", "textIdAnotherVariableNameInData"],
		read: ["textIdVariableNameInData", "textIdAnotherVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textIdVariable");
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdAnotherVariable"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("someType", "someId"), true);
});

QUnit.test("testNoPermissionsReadWriteConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "readWrite"]]));

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), false);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdVariable"), false);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("someType", "someId"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("someType", "someId"), true);
});


QUnit.test("testWithReadPermissionsNoConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable"]]));
	this.spec.permissions = {
		write: [],
		read: ["textIdVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("someType", "someId"), true);
});

QUnit.test("testWithReadPermissionsMatchingConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "readWrite"]]));
	this.spec.permissions = {
		write: [],
		read: ["textIdVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 1);
	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textIdVariable");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(1), "textIdVariable");

	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "aomeId"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("someType", "someId"), true);

});

QUnit.test("testWithTwoReadPermissionsMatchingConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "readWrite"], ["metadataTextVariable", "textIdAnotherVariable", "readWrite"]]));
	this.spec.permissions = {
		write: [],
		read: ["textIdVariableNameInData", "textIdAnotherVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 2);
	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textIdVariable");
	assert.strictEqual(fulfilledReadRecordParts[1], "metadataTextVariable_textIdAnotherVariable");
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdAnotherVariable"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("someType", "someId"), true);

});

QUnit.test("testWithOneReadPermissionsAndTwoConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "readWrite"], ["metadataTextVariable", "textIdAnotherVariable", "readWrite"]]));
	this.spec.permissions = {
		write: [],
		read: ["textIdVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	let callGetMetadataId = this.metadataProvider.getFetchedMetadataId(0)
	assert.strictEqual(callGetMetadataId, "textGroupTopLevel");
	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 1);
	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textIdVariable");
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdAnotherVariable"), false);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("someType", "someId"), true);
});

QUnit.test("testWithOneReadOneWritePermissionMultipleConstraints", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdVariable", "readWrite"], ["metadataTextVariable", "textIdAnotherWriteVariable", "write"], ["metadataTextVariable", "textIdAnotherVariable", "readWrite"]]));
	this.spec.permissions = {
		write: ["textIdAnotherWriteVariableNameInData"],
		read: ["textIdAnotherVariableNameInData", "textIdAnotherWriteVariableNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 1);
	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textIdAnotherVariable");

	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textIdAnotherWriteVariable");

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdVariable"), false);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdAnotherVariable"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdAnotherWriteVariable"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdVariable"), false);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdAnotherWriteVariable"), true);

});

QUnit.test("testNoPermissionsWithOneGroupAndOneAtomicOnSecondLevel", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataGroup", "textGroup"], ["metadataTextVariable", "textIdTopLevel", "readWrite"]]));
	this.metadataProvider.setChildReferences("textGroup", CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdSecondLevel", "write"]]));

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(1), "textGroup");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(2), "textGroup");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(3), "textIdSecondLevel");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(4), "textIdTopLevel");

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdTopLevel"), false);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), true);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdTopLevel"), false);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), false);
});

QUnit.test("testNoPermissionsWithOneGroupAndOneAtomicOnThirdLevel", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataGroup", "textGroup"], ["metadataTextVariable", "textIdTopLevel", "readWrite"]]));
	this.metadataProvider.setChildReferences("textGroup", CORATEST.createJsonForChildReference([["metadataGroup", "textGroupGroup", "write"]]));
	this.metadataProvider.setChildReferences("textGroupGroup", CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdThirdLevel", "write"]]));

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(1), "textGroup");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(2), "textGroup");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(3), "textGroupGroup");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(4), "textGroupGroup");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(5), "textIdThirdLevel");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(6), "textIdTopLevel");

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdTopLevel"), false);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdThirdLevel"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataGroup", "textGroupGroup"), true);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdTopLevel"), false);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdThirdLevel"), false);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataGroup", "textGroupGroup"), false);
});

QUnit.test("testPermissionsWithOneGroupAndOneAtomicOnSecondLevel", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataGroup", "textGroup"], ["metadataTextVariable", "textIdTopLevel", "readWrite"]]));
	this.metadataProvider.setChildReferences("textGroup", CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdSecondLevel", "write"]]));
	this.spec.permissions = {
		read: [],
		write: ["textIdSecondLevelNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdTopLevel"), false);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), true);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdTopLevel"), false);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), true);
});

QUnit.test("testPermissionsWithOneGroupAndOneAtomicOnSecondLevel", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataGroup", "textGroup"], ["metadataTextVariable", "textIdTopLevel", "readWrite"]]));
	this.metadataProvider.setChildReferences("textGroup", CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdSecondLevel", "write"]]));
	this.spec.permissions = {
		read: ["textIdTopLevelNameInData"],
		write: ["textIdTopLevelNameInData", "textIdSecondLevelNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdTopLevel"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), true);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdTopLevel"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), true);
});

QUnit.test("testPermissionsWithOneGroupAndRepeatMaxMoreThanOne", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataGroup", "textGroup", undefined, "2"]]));
	this.metadataProvider.setChildReferences("textGroup", CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdSecondLevel", "write"]]));
	this.spec.permissions = {
		read: [],
		write: []
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), true);
});


QUnit.test("testPermissionsWithOneGroupWithWriteConstrain", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataGroup", "textGroup","write"]]));
	this.metadataProvider.setChildReferences("textGroup", CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdSecondLevel", "write"]]));
	this.spec.permissions = {
		read: [],
		write: ["textIdSecondLevelNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdSecondLevel"), false);
});


QUnit.test("testPermissionsWithOneGroupWithWriteConstraint", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataGroup", "textGroup", "write"]]));
	this.metadataProvider.setChildReferences("textGroup", CORATEST.createJsonForChildReference([["metadataGroup", "textGroupGroup"]]));
	this.metadataProvider.setChildReferences("textGroupGroup", CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdThirdLevel", "write"]]));
	this.spec.permissions = {
		read: [],
		write: ["textIdThirdLevelNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	//Toplevel
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataGroup", "textGroup"), false);
	//Level2
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataGroup", "textGroupGroup"), false);
	//Level3
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdThirdLevel"), false);
});


QUnit.test("testPermissionsGroupHasUnfullfilledReadPermissions", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataGroup", "textGroup", "readWrite"]]));
	this.metadataProvider.setChildReferences("textGroup", CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdSecondLevel"]]));

	this.spec.permissions = {
		read: [],
		write: []
	};
	
	CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(0), "textGroupTopLevel");
	assert.strictEqual(this.metadataProvider.getFetchedMetadataId(1), "textGroup");
	assert.strictEqual(this.metadataProvider.getNumberOfCallsToGetMetadataById(), 2);
});

QUnit.test("testCircularDependencyOnChildReferences", function(assert) {
	this.metadataProvider.setChildReferences(this.spec.metadataId, CORATEST.createJsonForChildReference([["metadataGroup", "textGroupLevel2"]]));
	this.metadataProvider.setChildReferences("textGroupLevel2", CORATEST.createJsonForChildReference([["metadataGroup", "textGroupBranch1Level3"], ["metadataGroup", "textGroupBranch2Level3"]]));
	this.metadataProvider.setChildReferences("textGroupBranch1Level3", CORATEST.createJsonForChildReference([["metadataGroup", "textGroupBranch1Level4"]]));
	this.metadataProvider.setChildReferences("textGroupBranch1Level4", CORATEST.createJsonForChildReference([["metadataGroup", "textGroupBranch1Level5"]]));
	this.metadataProvider.setChildReferences("textGroupBranch1Level5", CORATEST.createJsonForChildReference([["metadataGroup", "textGroupLevel2"]]));
	
	this.metadataProvider.setChildReferences("textGroupBranch2Level3", CORATEST.createJsonForChildReference([["metadataGroup", "textGroupBranch2Level4"]]));
	this.metadataProvider.setChildReferences("textGroupBranch2Level4", CORATEST.createJsonForChildReference([["metadataGroup", "textGroupBranch2Level5"]]));
	this.metadataProvider.setChildReferences("textGroupBranch2Level5", CORATEST.createJsonForChildReference([["metadataTextVariable", "textIdBranch2Level5", "write"]]));

	this.spec.permissions = {
		read: [],
		write: []
	};
	
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textIdBranch2Level5"), false);	
});


