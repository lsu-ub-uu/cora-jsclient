/*
 * Copyright 2016, 2017 Olov McKie
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.ajaxCallFactorySpy = function(spec) {
		let factoredAjaxCalls = [];
		
		const factor = function(ajaxCallSpec) {
			let factoredAjaxCall = CORATEST.ajaxCallSpy({}, ajaxCallSpec);
			factoredAjaxCalls.push(factoredAjaxCall);
			return factoredAjaxCall;
		};

		const getFactored = function(number) {
			return factoredAjaxCalls[number];
		};
		
		const getFactoredAjaxCalls = function(){
			return factoredAjaxCalls.length;
		};

		let out = Object.freeze({
			factor: factor,
			getFactored: getFactored,
			getFactoredAjaxCalls: getFactoredAjaxCalls,
			callCount: factoredAjaxCalls.length
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));
