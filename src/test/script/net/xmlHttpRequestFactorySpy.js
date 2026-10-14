/*
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
import CORATEST from "../aCoratestNameSpace.js";

const coraTest = CORATEST;

coraTest.xmlHttpRequestFactorySpy = function(xmlHttpRequestSpyIn) {
		var xmlHttpRequestSpy = xmlHttpRequestSpyIn;
		var factorWasCalled = false;
		function factor() {
			factorWasCalled = true;
			return xmlHttpRequestSpy;
		}
		
		function wasFactorCalled(){
			return factorWasCalled;
		}
		function setXmlHttpRequestSpy(xmlHttpRequestSpyIn){
			factorWasCalled = false;
			xmlHttpRequestSpy = xmlHttpRequestSpyIn;
		}
		var out = Object.freeze({
			factor : factor,
			wasFactorCalled : wasFactorCalled,
			setXmlHttpRequestSpy:setXmlHttpRequestSpy
		});
		return out;
	};

export default CORATEST;
