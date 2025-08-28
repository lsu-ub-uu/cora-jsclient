/*
 * Copyright 2016, 2018 Olov McKie
 * Copyright 2016 Uppsala University Library
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

QUnit.assert.stringifyEqual = function(actual, expected, message) {
	QUnit.assert.deepEqual(JSON.stringify(actual), JSON.stringify(expected), message);
};

QUnit.assert.visible = function(domElement, message) {
	QUnit.assert.ok(domElement.offsetHeight > 0, message);
};

QUnit.assert.allVisible = function(domElements, message) {
	domElements.forEach(function(domElement) {
		QUnit.assert.visible(domElement, message)
	});
};

QUnit.assert.notVisible = function(domElement, message) {
	QUnit.assert.ok(domElement.offsetHeight === 0, message);
};

QUnit.assert.allNotVisible = function(domElements, message) {
	domElements.forEach(function(domElement) {
		QUnit.assert.notVisible(domElement, message)
	});
};

QUnit.assert.elementHasClass = function(domElement, className) {
	QUnit.assert.true(domElement.classList.contains(className));
};

QUnit.assert.elementHasNotClass = function(domElement, className) {
	QUnit.assert.false(domElement.classList.contains(className));
};