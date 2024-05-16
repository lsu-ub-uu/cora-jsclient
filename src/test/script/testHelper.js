/*
 * Copyright 2018, 2024 Olov McKie
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
var CORATESTHELPER = (function(coraTestHelper) {
	"use strict";
	coraTestHelper.simulateOnclick = function(object, spec) {
		var event = document.createEvent('Event');
		event.initEvent('click', true, true);
		if (spec !== undefined && spec.ctrlKey) {
			event.ctrlKey = true;
		}
		object.dispatchEvent(event);
	};

	coraTestHelper.simulateKeydown = function(object, keydown) {
		var event = new KeyboardEvent("keydown", {
			"key" : keydown
		});
		object.dispatchEvent(event);
	};

	coraTestHelper.simulateKeyup = function(object, keyup) {
		var event = new KeyboardEvent("keyup", {
			"key" : keyup
		});
		object.dispatchEvent(event);
	};

	coraTestHelper.simulateBlur = function(object) {
		var event = new Event("blur", {
		});
		object.dispatchEvent(event);
	};

	coraTestHelper.simulateFocus = function(element) {
//		var event = new Event("focusin", {
//		});
//		object.dispatchEvent(event);
		 let eventType = "onfocusin" in element ? "focusin" : "focus";
	    let bubbles = "onfocusin" in element;
	    let event;
	
	    if ("createEvent" in document) {
	        event = document.createEvent("Event");
	        event.initEvent(eventType, bubbles, true);
	    }
	    else if ("Event" in window) {
	        event = new Event(eventType, { bubbles: bubbles, cancelable: true });
	    }
	
	    element.focus();
	    element.dispatchEvent(event);
	};

	return coraTestHelper;
}(CORATESTHELPER || {}));