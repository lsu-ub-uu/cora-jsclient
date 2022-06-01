/*
 * Copyright 2020 Uppsala University Library
 * 
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

QUnit.module("metadata/pathUtilsTest.js", {
});

QUnit.test("testInitPathUtils", function(assert) {
	let pathUtils = CORA.pathUtils();
	assert.strictEqual(pathUtils.type, "pathUtils");
});

QUnit.test("testBlankPath", function(assert) {
	let pathUtils = CORA.pathUtils();
	let path = {};
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.deepEqual(returnedPath, path);
});

QUnit.test("testOneLevelPathNoRepeatId", function(assert) {
	let path = ["textVariableId"];
	let expectedPath = path;
	let pathUtils = CORA.pathUtils();
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.deepEqual(returnedPath, expectedPath);
});

QUnit.test("testOneLevelPathWithRepeatId", function(assert) {
	let path = ["textVariableId.0"];
	let expectedPath = ["textVariableId"];
	let pathUtils = CORA.pathUtils();
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.deepEqual(returnedPath, expectedPath);
});

QUnit.test("testTwoLevelPathNoRepeatId", function(assert) {
	let path = ["recordInfo","dataDivider"];
	let expectedPath = path;
	let pathUtils = CORA.pathUtils();
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.deepEqual(returnedPath, expectedPath);
});

QUnit.test("testTwoLevelPathWithRepeatId", function(assert) {
	let path = ["userRole", "userRole.0"];
	let expectedPath = ["userRole","userRole"];
	let pathUtils = CORA.pathUtils();
	let returnedPath = pathUtils.ensureNoRepeatIdInLowestLevelOfPath(path);
	assert.deepEqual(returnedPath, expectedPath);
});