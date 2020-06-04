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
		this.metadataProviderSpy = CORATEST.metadataProviderNewSpy();

		this.dependencies = {
			metadataProvider: this.metadataProviderSpy
		};
		this.spec = {
			metadataId: "groupIdOneTextChild",
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
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(calculator.type, "recordPartPermissionCalculator");
});

QUnit.test("testGetDependencies", function(assert) {
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.getSpec(), this.spec);
});

QUnit.test("testInitNoPermissions", function(assert) {
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	
	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), true);
});

QUnit.test("testInitEmptyPermissions", function(assert) {
	this.spec.permissions = {
		write: [],
		read: []
	};
	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), true);
});

QUnit.test("testWriteConstraintsNoPermissions", function(assert) {
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneWriteConstraint);
	this.spec.metadataid = "groupIdOneTextChildWithWriteConstraints";

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), false);
});

QUnit.test("testInitWithWritePermissionsNoConstraints", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData"],
		read: ["textVariableIdNameInData"]
	};

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
});

QUnit.test("testWritePermissionsMatchingConstraints", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData"],
		read: ["textVariableIdNameInData"]
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneWriteConstraint);

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textVariableId");

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(1), "textVariableId");
	
	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 0);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "someId"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
});

QUnit.test("testInitWithTwoWritePermissionsMatchingConstraints", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData", "oneOtherTextVariableIdNameInData"],
		read: ["textVariableIdNameInData", "oneOtherTextVariableIdNameInData"]
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithTwoWriteConstraint);

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 2);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textVariableId");
	assert.strictEqual(fulfilledWriteRecordParts[1], "metadataTextVariable_oneOtherTextVariableId");
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), true);
});

QUnit.test("testInitWithOneWritePermissionsAndTwoConstraints", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData"],
		read: ["textVariableIdNameInData"]
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithTwoWriteConstraint);

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	let callGetMetadataId = this.dependencies.metadataProvider.getFetchedMetadataId(0)
	assert.strictEqual(callGetMetadataId, "groupIdOneTextChild");
	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textVariableId");
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), false);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeId"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
});

QUnit.test("testInitWithTwoWritePermissionsOneConstraint", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData", "oneOtherTextVariableIdNameInData"],
		read: ["textVariableIdNameInData", "oneOtherTextVariableIdNameInData"]
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneWriteConstraint);

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textVariableId");
	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), true);
	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("someType", "someId"), true);
});

QUnit.test("testNoPermissionsReadWriteConstraints", function(assert) {
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneReadWriteConstraint);
	this.spec.metadataid = "groupIdOneTextChildWithWriteConstraints";

	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);

	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), false);
	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("someType", "someId"), true);
});

//
//QUnit.test("testInitWithReadPermissionsNoConstraints", function(assert) {
//	this.spec.permissions = {
//		write: [],
//		read: ["textVariableIdNameInData"]
//	};
//
//	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//
//	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
//	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
//	assert.strictEqual(calculator.getFulfilledReadRecordParts().length, 0);
//
//	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), false);
//	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeId"), false);
//});

//QUnit.test("testInitWithReadPermissionsMatchingConstraints", function(assert) {
//	this.spec.permissions = {
//		write: [],
//		read: ["textVariableIdNameInData"]
//	};
//	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneReadWriteConstraint);
//
//	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//
//	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
//	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
//	assert.strictEqual(fulfilledReadRecordParts.length, 1);
//	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textVariableId");
//	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(1), "textVariableId");
//
//	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
//
//	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
//	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "SomeId"), false);
//	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeId"), false);
//
//});
//
//QUnit.test("testInitWithTwoReadPermissionsMatchingConstraints", function(assert) {
//	this.spec.permissions = {
//		write: [],
//		read: ["textVariableIdNameInData", "oneOtherTextVariableIdNameInData"]
//	};
//	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithTwoReadWriteConstraint);
//
//	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//
//	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
//	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
//	assert.strictEqual(fulfilledReadRecordParts.length, 2);
//	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textVariableId");
//	assert.strictEqual(fulfilledReadRecordParts[1], "metadataTextVariable_oneOtherTextVariableId");
//	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
//
//	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
//	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), true);
//	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeId"), false);
//
//});
//
//QUnit.test("testInitWithOneReadPermissionsAndTwoConstraints", function(assert) {
//	this.spec.permissions = {
//		write: [],
//		read: ["textVariableIdNameInData"]
//	};
//	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithTwoReadWriteConstraint);
//
//	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//
//	let callGetMetadataId = this.dependencies.metadataProvider.getFetchedMetadataId(0)
//	assert.strictEqual(callGetMetadataId, "groupIdOneTextChild");
//	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
//	assert.strictEqual(fulfilledReadRecordParts.length, 1);
//	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textVariableId");
//	assert.strictEqual(calculator.getFulfilledWriteRecordParts().length, 0);
//
//	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
//	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), false);
//	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeId"), false);
//});
//
//QUnit.test("testInitWithOneReadOneWritePermissionMultipleConstraints", function(assert) {
//	this.spec.permissions = {
//		write: ["oneOtherWriteTextVariableIdNameInData"],
//		read: ["oneOtherTextVariableIdNameInData"]
//	};
//	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneWriteAndTwoReadWriteConstraint);
//
//	let calculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
//
//	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
//	let fulfilledReadRecordParts = calculator.getFulfilledReadRecordParts();
//	assert.strictEqual(fulfilledReadRecordParts.length, 1);
//	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_oneOtherTextVariableId");
//	
//	let fulfilledWriteRecordParts = calculator.getFulfilledWriteRecordParts();
//	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
//	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_oneOtherWriteTextVariableId");
//	
//	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), false);
//	assert.strictEqual(calculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), true);
//	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), false);
//	assert.strictEqual(calculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "oneOtherWriteTextVariableId"), true);
//
//});
