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
	var recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);
	assert.strictEqual(recordPartPermissionCalculator.type, "recordPartPermissionCalculator");
});

QUnit.test("testGetDependencies", function(assert) {
	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(recordPartPermissionCalculator.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(recordPartPermissionCalculator.getSpec(), this.spec);
});

QUnit.test("testInitNoPermissions", function(assert) {
	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), undefined);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), false);
});

QUnit.test("testInitEmptyPermissions", function(assert) {
	this.spec.permissions = {
		write: [],
		read: []
	};
	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), undefined);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), false);
});

QUnit.test("testWriteConstraintsNoPermissions", function(assert) {
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneWriteConstraint);
	this.spec.metadataid = "groupIdOneTextChildWithWriteConstraints";

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), false);
});

QUnit.test("testInitWithWritePermissionsNoConstraints", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData"],
		read: []
	};

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeID"), false);
});

QUnit.test("testInitWithWritePermissionsMatchingConstraints", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData"],
		read: []
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneWriteConstraint);

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	let fulfilledWriteRecordParts = recordPartPermissionCalculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textVariableId");

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(1), "textVariableId");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "SomeId"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeID"), false);
});

QUnit.test("testInitWithTwoWritePermissionsMatchingConstraints", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData", "oneOtherTextVariableIdNameInData"],
		read: []
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithTwoWriteConstraint);

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	let fulfilledWriteRecordParts = recordPartPermissionCalculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 2);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textVariableId");
	assert.strictEqual(fulfilledWriteRecordParts[1], "metadataTextVariable_oneOtherTextVariableId");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), true);

});

QUnit.test("testInitWithOneWritePermissionsAndTwoConstraints", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData"],
		read: []
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithTwoWriteConstraint);

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	let callGetMetadataId = this.dependencies.metadataProvider.getFetchedMetadataId(0)
	assert.strictEqual(callGetMetadataId, "groupIdOneTextChild");
	let fulfilledWriteRecordParts = recordPartPermissionCalculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textVariableId");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeId"), false);

});

QUnit.test("testInitWithTwoWritePermissionsOneConstraints", function(assert) {
	this.spec.permissions = {
		write: ["textVariableIdNameInData", "oneOtherTextVariableIdNameInData"],
		read: []
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneWriteConstraint);

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	let fulfilledWriteRecordParts = recordPartPermissionCalculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_textVariableId");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("SomeType", "SomeId"), false);
});

QUnit.test("testNoPermissionsReadWriteConstraints", function(assert) {
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneReadWriteConstraint);
	this.spec.metadataid = "groupIdOneTextChildWithWriteConstraints";

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);

	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeId"), false);
});

QUnit.test("testInitWithReadPermissionsNoConstraints", function(assert) {
	this.spec.permissions = {
		write: [],
		read: ["textVariableIdNameInData"]
	};

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledReadRecordParts().length, 0);

	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeId"), false);
});

QUnit.test("testInitWithReadPermissionsMatchingConstraints", function(assert) {
	this.spec.permissions = {
		write: [],
		read: ["textVariableIdNameInData"]
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneReadWriteConstraint);

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	let fulfilledReadRecordParts = recordPartPermissionCalculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 1);
	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textVariableId");
	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(1), "textVariableId");

	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);

	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "SomeId"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeId"), false);

});

QUnit.test("testInitWithTwoReadPermissionsMatchingConstraints", function(assert) {
	this.spec.permissions = {
		write: [],
		read: ["textVariableIdNameInData", "oneOtherTextVariableIdNameInData"]
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithTwoReadWriteConstraint);

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	let fulfilledReadRecordParts = recordPartPermissionCalculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 2);
	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textVariableId");
	assert.strictEqual(fulfilledReadRecordParts[1], "metadataTextVariable_oneOtherTextVariableId");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);

	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), true);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeId"), false);

});

QUnit.test("testInitWithOneReadPermissionsAndTwoConstraints", function(assert) {
	this.spec.permissions = {
		write: [],
		read: ["textVariableIdNameInData"]
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithTwoReadWriteConstraint);

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	let callGetMetadataId = this.dependencies.metadataProvider.getFetchedMetadataId(0)
	assert.strictEqual(callGetMetadataId, "groupIdOneTextChild");
	let fulfilledReadRecordParts = recordPartPermissionCalculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 1);
	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_textVariableId");
	assert.strictEqual(recordPartPermissionCalculator.getFulfilledWriteRecordParts().length, 0);

	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), true);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("SomeType", "SomeId"), false);
});

QUnit.test("testInitWithOneReadOneWritePermissionMultipleConstraints", function(assert) {
	this.spec.permissions = {
		write: ["oneOtherWriteTextVariableIdNameInData"],
		read: ["oneOtherTextVariableIdNameInData"]
	};
	this.dependencies.metadataProvider.setChildReferences(CORATEST.childReferenceWithOneWriteAndTwoReadWriteConstraint);

	let recordPartPermissionCalculator = CORA.recordPartPermissionCalculator(this.dependencies, this.spec);

	assert.strictEqual(this.dependencies.metadataProvider.getFetchedMetadataId(0), "groupIdOneTextChild");
	let fulfilledReadRecordParts = recordPartPermissionCalculator.getFulfilledReadRecordParts();
	assert.strictEqual(fulfilledReadRecordParts.length, 1);
	assert.strictEqual(fulfilledReadRecordParts[0], "metadataTextVariable_oneOtherTextVariableId");
	
	let fulfilledWriteRecordParts = recordPartPermissionCalculator.getFulfilledWriteRecordParts();
	assert.strictEqual(fulfilledWriteRecordParts.length, 1);
	assert.strictEqual(fulfilledWriteRecordParts[0], "metadataTextVariable_oneOtherWriteTextVariableId");
	
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "textVariableId"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledReadPermissionsForRecordPart("metadataTextVariable", "oneOtherTextVariableId"), true);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "textVariableId"), false);
	assert.strictEqual(recordPartPermissionCalculator.hasFulfilledWritePermissionsForRecordPart("metadataTextVariable", "oneOtherWriteTextVariableId"), true);

});
