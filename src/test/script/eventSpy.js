/*
 * Copyright 2016, 2023 Olov McKie
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
	coraTest.eventSpy = function() {
		let stopPropagationIsCalled = false;
		let preventDefaultIsCalled = false;
		let target;
		let screenY;
		let key;
		let ctrlKey;
		let altKey;
		
		let dataTransfer = function() {
			let format = "";
			let data = "";
			function setData(formatIn, dataIn) {
				format = formatIn;
				data = dataIn;
			}
			function getFormat(){
				return format;
			}
			function getData(){
				return data;
			}
			return {
				setData : setData,
				getFormat : getFormat,
				getData : getData
			};
		}();

		function stopPropagation() {
			stopPropagationIsCalled = true;
		}

		function stopPropagationWasCalled() {
			return stopPropagationIsCalled;
		}

		function preventDefault() {
			return preventDefaultIsCalled = true;
		}

		function preventDefaultWasCalled() {
			return preventDefaultIsCalled;
		}

		return ({
			stopPropagation : stopPropagation,
			stopPropagationWasCalled : stopPropagationWasCalled,
			preventDefault : preventDefault,
			preventDefaultWasCalled : preventDefaultWasCalled,
			target : target,
			screenY : screenY,
			dataTransfer : dataTransfer,
			key : key,
			ctrlKey : ctrlKey,
			altKey : altKey
		});
	};
	return coraTest;
}(CORATEST || {}));