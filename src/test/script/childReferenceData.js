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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.childReferenceWithOneWriteConstraint = {
		"name": "childReferences",
		"children": [{
			"name": "childReference",
			"repeatId": "0",
			"children": [
				{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					}, {
						"name": "linkedRecordId",
						"value": "textVariableId"
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}, {
					"name": "recordPartConstraint",
					"value": "write"
				}]
		}]
	};
	coraTest.childReferenceWithTwoWriteConstraint = {
		"name": "childReferences",
		"children": [{
			"name": "childReference",
			"repeatId": "0",
			"children": [
				{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					}, {
						"name": "linkedRecordId",
						"value": "textVariableId"
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}, {
					"name": "recordPartConstraint",
					"value": "write"
				}]
		}, {
			"name": "childReference",
			"repeatId": "1",
			"children": [
				{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					}, {
						"name": "linkedRecordId",
						"value": "oneOtherTextVariableId"
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}, {
					"name": "recordPartConstraint",
					"value": "write"
				}]
		}]
	};
	coraTest.childReferenceWithOneReadWriteConstraint = {
		"name": "childReferences",
		"children": [{
			"name": "childReference",
			"repeatId": "0",
			"children": [
				{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					}, {
						"name": "linkedRecordId",
						"value": "textVariableId"
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}, {
					"name": "recordPartConstraint",
					"value": "readWrite"
				}]
		}]
	};
	coraTest.childReferenceWithTwoReadWriteConstraint = {
		"name": "childReferences",
		"children": [{
			"name": "childReference",
			"repeatId": "0",
			"children": [
				{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					}, {
						"name": "linkedRecordId",
						"value": "textVariableId"
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}, {
					"name": "recordPartConstraint",
					"value": "readWrite"
				}]
		}, {
			"name": "childReference",
			"repeatId": "1",
			"children": [
				{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					}, {
						"name": "linkedRecordId",
						"value": "oneOtherTextVariableId"
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}, {
					"name": "recordPartConstraint",
					"value": "readWrite"
				}]
		}]
	};
	coraTest.childReferenceWithOneWriteAndTwoReadWriteConstraint = {
		"name": "childReferences",
		"children": [
			{
				"name": "childReference",
				"repeatId": "0",
				"children": [
					{
						"name": "ref",
						"children": [
							{
								"name": "linkedRecordType",
								"value": "metadataTextVariable"
							},
							{
								"name": "linkedRecordId",
								"value": "textVariableId"
							}
						]
					},
					{
						"name": "repeatMin",
						"value": "1"
					},
					{
						"name": "repeatMax",
						"value": "1"
					},
					{
						"name": "recordPartConstraint",
						"value": "readWrite"
					}
				]
			},
			{
				"name": "childReference",
				"repeatId": "1",
				"children": [
					{
						"name": "ref",
						"children": [
							{
								"name": "linkedRecordType",
								"value": "metadataTextVariable"
							},
							{
								"name": "linkedRecordId",
								"value": "oneOtherWriteTextVariableId"
							}
						]
					},
					{
						"name": "repeatMin",
						"value": "1"
					},
					{
						"name": "repeatMax",
						"value": "1"
					},
					{
						"name": "recordPartConstraint",
						"value": "write"
					}
				]
			},
			{
				"name": "childReference",
				"repeatId": "2",
				"children": [
					{
						"name": "ref",
						"children": [
							{
								"name": "linkedRecordType",
								"value": "metadataTextVariable"
							},
							{
								"name": "linkedRecordId",
								"value": "oneOtherTextVariableId"
							}
						]
					},
					{
						"name": "repeatMin",
						"value": "1"
					},
					{
						"name": "repeatMax",
						"value": "1"
					},
					{
						"name": "recordPartConstraint",
						"value": "readWrite"
					}
				]
			}
		]
	};


	coraTest.childReferenceForTopLevelGroup = {
		"name": "childReferences",
		"children": [
			{
				"name": "childReference",
				"repeatId": "0",
				"children": [
					{
						"name": "ref",
						"children": [{
							"name": "linkedRecordType",
							"value": "metadataGroup"
						}, {
							"name": "linkedRecordId",
							"value": "textGroup"
						}]
					}, {
						"name": "repeatMin",
						"value": "1"
					}, {
						"name": "repeatMax",
						"value": "1"
					}, {
						"name": "recordPartConstraint",
						"value": ""
					}]
			}
			,
			{
				"name": "childReference",
				"repeatId": "2",
				"children": [
					{
						"name": "ref",
						"children": [
							{
								"name": "linkedRecordType",
								"value": "metadataTextVariable"
							},
							{
								"name": "linkedRecordId",
  								"value": "textIdTopLevel"
							}
						]
					},
					{
						"name": "repeatMin",
						"value": "1"
					},
					{
						"name": "repeatMax",
						"value": "1"
					},
					{
						"name": "recordPartConstraint",
						"value": "readWrite"
					}
				]
			}
		]
	};

	coraTest.childReferenceForChildGroup = {
		"name": "childReferences",
		"children": [{
			"name": "childReference",
			"repeatId": "0",
			"children": [
				{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					}, {
						"name": "linkedRecordId",
						"value": "textIdSecondLevel"
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}, {
					"name": "recordPartConstraint",
					"value": "write"
				}]
		}]
	};
	
	coraTest.childReferenceForChildGroupThirdLevel = {
		"name": "childReferences",
		"children": [{
			"name": "childReference",
			"repeatId": "0",
			"children": [
				{
					"name": "ref",
					"children": [{
						"name": "linkedRecordType",
						"value": "metadataGroup"
					}, {
						"name": "linkedRecordId",
						"value": "textGroupGroup"
					}]
				}, {
					"name": "repeatMin",
					"value": "1"
				}, {
					"name": "repeatMax",
					"value": "1"
				}, {
					"name": "recordPartConstraint",
					"value": "write"
				}]
		}]
	};

	return coraTest;
}(CORATEST || {}));