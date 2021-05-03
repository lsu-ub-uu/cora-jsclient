/*
 * Copyright 2016 Olov McKie
 * Copyright 2021 Uppsala Universitet
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
var CORA = (function(cora) {
	"use strict";
	cora.message = function(spec) {
		let renderHtml;
		let timeout;
		let view;
		let messageText;
		let hideTimeout;
		let hideIfTransitionendNotCalled;

		const start = function() {
			renderHtml = getRenderHtmlFromSpecOrDefault();
			timeout = getTimeoutFromSpecOrDefault();
			view = createView();
			view.appendChild(createRemoveButton());
			messageText = createMessageText();
			view.appendChild(messageText);
			hideTimeout = possiblySetHideTimeout();
		}

		const getRenderHtmlFromSpecOrDefault = function() {
			return spec.renderHtml !== undefined ? spec.renderHtml : true;
		}
		const getTimeoutFromSpecOrDefault = function() {
			return spec.timeout !== undefined ? spec.timeout : spec.type.defaultTimeout;
		}

		const createView = function() {
			return CORA.gui.createDivWithClassName("message " + spec.type.className);
		}

		const createMessageText = function() {
			var textNew = CORA.gui.createSpanWithClassName("messageText");
			if (renderHtml) {
				textNew.innerHTML = spec.message;
			} else {
				textNew.appendChild(document.createTextNode(spec.message));
			}
			return textNew;
		}

		const createRemoveButton = function() {
			var removeFunction = function() {
				view.modelObject.hideWithEffect();
			};
			return CORA.gui.createRemoveButton(removeFunction);
		}

		const possiblySetHideTimeout = function() {
			var hideFunction = function() {
				view.modelObject.hideWithEffect();
			};
			if (timeout > 0) {
				var timeoutToBeCalled = setTimeout(hideFunction, timeout);
			}
			return timeoutToBeCalled;
		}

		const getTimeout = function() {
			return timeout;
		}

		const getView = function() {
			return view;
		}

		const hide = function() {
			clearHideTimeout();
			if (view.parentNode) {
				view.parentNode.removeChild(view);
			}
		}

		const clearHideTimeout = function() {
			window.clearTimeout(hideTimeout);
			window.clearTimeout(hideIfTransitionendNotCalled);
		}

		const hideWithEffect = function() {
			hideIfTransitionendNotCalled = window.setTimeout(function() {
				view.modelObject.hide();
			}, 1000);
			var orgClassName = view.className;
			view.addEventListener("transitionend", function() {
				view.modelObject.hide();
				view.className = orgClassName;
			}, true);
			view.className = view.className + " toBeRemoved";
		}

		start();

		var out = Object.freeze({
			getTimeout: getTimeout,
			getView: getView,
			hide: hide,
			clearHideTimeout: clearHideTimeout,
			hideWithEffect: hideWithEffect
		});
		view.modelObject = out;
		return out;
	};

	cora.message.ERROR = {
		"className": "error",
		"defaultTimeout": 0
	};
	cora.message.WARNING = {
		"className": "warning",
		"defaultTimeout": 10000
	};
	cora.message.INFO = {
		"className": "info",
		"defaultTimeout": 5000
	};
	cora.message.POSITIVE = {
		"className": "positive",
		"defaultTimeout": 3000
	};
	return cora;
}(CORA));

function newFunction(textNew, spec) {
	textNew.appendChild(document.createTextNode(spec.message));
}
