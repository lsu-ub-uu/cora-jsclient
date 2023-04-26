/*
 * Copyright 2016 Olov McKie
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.testSpanWithClassNameOnlyContainsText = function(span, className, text, assert) {
		assert.strictEqual(span.childNodes.length, 1);
		assert.equal(span.nodeName, "SPAN");
		assert.equal(span.className, className);
		assert.equal(span.textContent, text);
	};

	coraTest.assertSpanHasClassName = function(span, className, assert) {
		assert.equal(span.nodeName, "SPAN");
		assert.equal(span.className, className);
	};

	coraTest.assertElementHasTypeClassText = function(element, type, className, textContent, assert) {
		assert.equal(element.nodeName, type);
		if(className){
			assert.equal(element.className, className);
		}
		if(textContent){
			assert.equal(element.textContent, textContent);
		}			
	};

	return coraTest;
}(CORATEST || {}));
